---
title: "EyeGlow：MacBook 眼动交互 Agent 助手方案"
description: 用 MacBook 前置摄像头 + 眼球方向 + 刻意眨眼替代鼠标点击，完成 AI Agent 提示词确认交互的设计方案。
date: 2026-04-07
tags: [ai, hci, swift, macos, agent]
lang: zh
---

**问题**：AI Agent 工具（Claude Code 等）需要频繁用户确认，选项间距过小（约 10px），每次确认都是摩擦点。

**目标**：在 MacBook 上开发一个 App，利用前置摄像头捕捉眼球方向（上/下/左/右）+ 刻意眨眼，替代鼠标点击完成 Agent 选项选择。

**核心思路**：不追求精确坐标定位，只需判断方向 + 眨眼确认，配合屏幕边缘 Siri 风格流光作为视觉反馈。

**初步试验田**：Claude Code CLI

---

## 整体架构

```
macOS App (Swift + SwiftUI)
│
├── EyeTracker (MediaPipe / Vision)
│       │
├── Direction Classifier (上/下/左/右)
│       │
└── Action Engine
        │
        ├── EdgeGlow UI（Siri 风格边缘流光）
        └── PTY Proxy（Agent 通信）
```

---

## 眼球方向检测能力

MacBook 前置摄像头 + MediaPipe Face Mesh 虹膜追踪，可靠检测 5 个状态：

| 方向 | 检测难度 | 可靠性 | 说明 |
|---|---|---|---|
| 左/右 | 低 | ⭐⭐⭐⭐⭐ | 虹膜水平偏移量大，最容易检测 |
| 上/下 | 中 | ⭐⭐⭐⭐ | 垂直偏移量比水平小，但仍可靠区分 |
| 眨眼 | 低 | ⭐⭐⭐⭐⭐ | 眼睛开合度变化明显 |
| 正视（居中） | 低 | ⭐⭐⭐⭐⭐ | 作为"空闲态"基准 |

原理：检测虹膜在眼眶内的相对偏移方向——不需要精确坐标。

---

## 视觉交互设计——Siri 风格环绕流光

沿屏幕边缘的柔和渐变光带，持续流动 + 呼吸脉动。五种状态：

**状态 1——待选择**（Agent 弹出选项）
- 整圈均匀暖色流光，缓慢旋转 + 呼吸脉动
- 选项文字以小标签形式浮在光带上

**状态 2——注视方向识别**
- 用户上看 → 上方光带增亮变暖，下方变暗
- 光流向注视方向汇聚

**状态 3——预确认**（持续注视 > 1s）
- 对应方向光带加速脉动 + 光晕扩大
- "充能"效果

**状态 4——眨眼确认**
- 光带从注视方向向中心快速收缩 → 闪烁 → 消散

**状态 5——取消**（回到正视 / 闭眼 > 1s）
- 所有光带恢复均匀亮度，回到待选择态

---

## 选项映射策略

| 眼球方向 | 2 选项模式 | 4 选项模式 | 列表滚动模式 |
|---|---|---|---|
| 上看 | 选项 A | 选项 A | 上一个选项 |
| 下看 | 选项 B | 选项 B | 下一个选项 |
| 左看 | — | 选项 C | 取消/返回 |
| 右看 | — | 选项 D | 更多信息 |
| 正视 | 空闲 | 空闲 | 暂停滚动 |
| 眨眼 | 确认 | 确认 | 确认当前选项 |

---

## 防误触机制

| 策略 | 说明 |
|---|---|
| 注视停留阈值 | 注视某方向 ≥ 1.5s 才进入"待确认"状态 |
| 眨眼确认 | 闭眼 > 300ms 才触发；普通眨眼（< 200ms）忽略 |
| 视觉反馈 | 注视时光带增亮 → 预确认时脉动加速 → 确认后收束 |
| 撤销机制 | 选择后 2s 内快速眨眼两次 = 撤销 |

---

## Agent 选项拦截（PTY 代理）

```
App 启动 → PTY Proxy 包裹 claude-code CLI
→ 监听 stdout，检测到选项模式（如 "[1] xxx [2] xxx"）
→ 拦截 → 弹出眼动选择流光界面
→ 用户眨眼选择 → 将选择结果写回 PTY stdin
```

Swift 核心（AgentProxy）：
```swift
func startCLI() {
    openpty(&masterFD, &slaveFD, nil, nil, nil)
    if fork() == 0 {
        dup2(slaveFD, STDIN_FILENO)
        dup2(slaveFD, STDOUT_FILENO)
        execv("/usr/local/bin/claude", ["claude"])
    } else {
        monitorOutput(fd: masterFD)
    }
}
```

---

## 技术栈

| 模块 | 技术选型 |
|---|---|
| 语言 | Swift |
| UI | SwiftUI |
| 眼动追踪 | MediaPipe Face Mesh（虹膜 Landmark，精度 ~30-50px）或 Apple Vision |
| 摄像头 | AVFoundation (AVCaptureSession) |
| 流光效果 | SwiftUI AngularGradient + blur + 动画 |
| 终端代理 | PTY (posix_openpt / forkpty) |
| Agent 通信 | stdin/stdout 管道 |

MediaPipe 在虹膜 Landmark 精度上胜出（~30-50px vs. Apple Vision ~50-80px），但需要 C++/Python 桥接。Apple Vision 原生 Swift 但虹膜追踪较粗糙。

---

## MVP 开发路径

| 步骤 | 内容 | 预估时间 |
|---|---|---|
| 1 | Python 脚本验证方向检测可靠性 | 半天 |
| 2 | 调阈值，测试不同坐姿/光线稳定性 | 半天 |
| 3 | Swift App 壳 + Siri 风格流光 UI | 1~2 天 |
| 4 | 集成 MediaPipe（Python 子进程或 C++ 桥接） | 1~2 天 |
| 5 | PTY 代理接入 Claude Code | 1~2 天 |
| 6 | 端到端联调 | 1 天 |

**MVP 约一周可跑通核心链路。**

---

## 风险与应对

| 风险 | 应对 |
|---|---|
| 前置摄像头精度不够 | 只需方向判断，不需精确坐标，风险低 |
| 光线变化影响追踪 | MediaPipe 有一定鲁棒性，加环境光检测提示 |
| Agent 输出格式不固定 | 多套正则 + LLM 辅助解析选项文本 |
| 长时间使用眼睛疲劳 | 使用时长提醒，随时切回鼠标/键盘 |

---

## 关键验证点

先跑 Python 验证脚本，重点观察上下看时虹膜的 `v_ratio` 变化幅度——如果上看和下看的差值 > 0.08，方案非常稳。

*项目代号：EyeGlow*
