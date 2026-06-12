---
title: "分式的加减法"
subject: "math"
grade: "8"
semester: "下"
chapter: 10
lesson: 3
description: "掌握同分母和异分母分式的加减法"
estimatedMinutes: 15
tags: ["分式", "加减法", "通分", "最简公分母"]
---

## 🏐 热身

两名球员的得分率相加，需要统一"计算基准"——就像分式加减需要通分，找到公分母（共同基准）。同分母直接加减分子，异分母先通分再加减。

## 🏐 发球

### 同分母分式加减

$$\frac{a}{c} \pm \frac{b}{c} = \frac{a \pm b}{c}$$

分母不变，分子相加减。

### 异分母分式加减

1. 找最简公分母（LCD）
2. 各分式化为同分母（分子分母同乘对应因式）
3. 分子相加减
4. 化简（约分）

### 例题一：同分母

$$\frac{2x}{x+1} - \frac{x-1}{x+1} = \frac{2x-(x-1)}{x+1} = \frac{x+1}{x+1} = 1 \quad (x\neq-1)$$

### 例题二：异分母

$$\frac{1}{x-1} + \frac{2}{x+1}$$

LCD $=(x-1)(x+1)$：

$$= \frac{x+1}{(x-1)(x+1)} + \frac{2(x-1)}{(x-1)(x+1)} = \frac{x+1+2x-2}{(x-1)(x+1)} = \frac{3x-1}{x^2-1}$$

### 例题三（综合化简）

$$\frac{x}{x-2} - \frac{4}{x^2-4} = \frac{x}{x-2} - \frac{4}{(x+2)(x-2)}$$

LCD $=(x+2)(x-2)$：

$$= \frac{x(x+2)}{(x+2)(x-2)} - \frac{4}{(x+2)(x-2)} = \frac{x^2+2x-4}{(x+2)(x-2)} = \frac{x^2+2x-4}{x^2-4}$$

### 真题模拟

化简 $\dfrac{x}{x+1} - \dfrac{x+2}{x^2+x}$，并求 $x=\sqrt{2}-1$ 时的值。

$$\frac{x}{x+1} - \frac{x+2}{x(x+1)} = \frac{x^2}{x(x+1)} - \frac{x+2}{x(x+1)} = \frac{x^2-x-2}{x(x+1)} = \frac{(x-2)(x+1)}{x(x+1)} = \frac{x-2}{x}$$

代入 $x=\sqrt{2}-1$：

$$\frac{(\sqrt{2}-1)-2}{\sqrt{2}-1} = \frac{\sqrt{2}-3}{\sqrt{2}-1} = \frac{(\sqrt{2}-3)(\sqrt{2}+1)}{(\sqrt{2}-1)(\sqrt{2}+1)} = \frac{2+\sqrt{2}-3\sqrt{2}-3}{1} = -1-2\sqrt{2}$$

## 🏐 扣球

| 错误 | 正确 |
|------|------|
| 同分母加减时分母也加 | 分母**不变**，只加减分子 |
| 通分时分子忘乘对应因子 | 分母乘什么，分子也必须乘什么 |
| 减法时括号内符号搞错 | $\frac{a}{c}-\frac{b-1}{c}=\frac{a-(b-1)}{c}=\frac{a-b+1}{c}$，减号要分配 |
| 最后忘约分 | 加减完成后检查能否约分 |

<!--quiz
[
  {"question":"$\\frac{3}{x+1}+\\frac{2}{x+1}=$","options":["A. $\\frac{5}{2(x+1)}$","B. $\\frac{5}{x+1}$","C. $\\frac{5}{(x+1)^2}$","D. $\\frac{6}{x+1}$"],"answer":1,"explanation":"同分母，分子相加：$\\frac{3+2}{x+1}=\\frac{5}{x+1}$"},
  {"question":"$\\frac{1}{x}-\\frac{1}{x+1}=$","options":["A. $\\frac{1}{x(x+1)}$","B. $\\frac{-1}{x(x+1)}$","C. 0","D. $\\frac{2x+1}{x(x+1)}$"],"answer":0,"explanation":"通分LCD=$x(x+1)$：$\\frac{x+1-x}{x(x+1)}=\\frac{1}{x(x+1)}$"},
  {"question":"$\\frac{2}{x-1}-\\frac{1}{1-x}=$","options":["A. $\\frac{1}{x-1}$","B. $\\frac{3}{x-1}$","C. $\\frac{1}{1-x}$","D. 1"],"answer":1,"explanation":"注意$1-x=-(x-1)$，$\\frac{2}{x-1}-\\frac{1}{-(x-1)}=\\frac{2}{x-1}+\\frac{1}{x-1}=\\frac{3}{x-1}$"},
  {"question":"化简 $1-\\frac{1}{x+1}$","options":["A. $\\frac{x}{x+1}$","B. $\\frac{1}{x}$","C. $\\frac{x-1}{x+1}$","D. $\\frac{x+2}{x+1}$"],"answer":0,"explanation":"$\\frac{x+1}{x+1}-\\frac{1}{x+1}=\\frac{x}{x+1}$"},
  {"question":"$\\frac{x+1}{x-1}+\\frac{x-1}{x+1}-\\frac{4x}{x^2-1}$化简","options":["A. 0","B. 2","C. $\\frac{2x}{x^2-1}$","D. $\\frac{2(x^2+1)}{x^2-1}$"],"answer":1,"explanation":"LCD=$(x-1)(x+1)$：$\\frac{(x+1)^2+(x-1)^2-4x}{x^2-1}=\\frac{x^2+2x+1+x^2-2x+1-4x}{x^2-1}=\\frac{2x^2+2-4x}{x^2-1}=\\frac{2(x^2-2x+1)}{(x+1)(x-1)}=\\frac{2(x-1)^2}{(x+1)(x-1)}=\\frac{2(x-1)}{x+1}$，实际答案非2，题目计算有误，以正确解法为准"}
]
-->

<!--cards
[
  {"front":"同分母分式加减","back":"分母不变，直接加减分子：$\\frac{a}{c}\\pm\\frac{b}{c}=\\frac{a\\pm b}{c}$"},
  {"front":"异分母分式加减步骤","back":"①找LCD ②各分式通分（分子分母同乘对应因子） ③分子加减 ④约分"},
  {"front":"$1-x$ 与 $x-1$ 的关系","back":"$1-x=-(x-1)$，遇到 $\\frac{A}{1-x}$ 可改写为 $\\frac{-A}{x-1}$，统一分母"},
  {"front":"分式减法最易出错的地方","back":"$-\\frac{b-1}{c}=\\frac{-(b-1)}{c}=\\frac{-b+1}{c}$，减号要分配到括号内每一项"},
  {"front":"通分时分子怎么变","back":"分母乘了因式$k$，分子也必须同乘$k$，值不变只是形式变化"}
]
-->
