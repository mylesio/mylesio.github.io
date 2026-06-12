---
title: "勾股定理的应用"
subject: "math"
grade: "8"
semester: "上"
chapter: 1
lesson: 3
description: "在实际问题中灵活运用勾股定理解决距离、路径和工程问题"
estimatedMinutes: 15
tags: ["勾股定理", "应用题", "最短路径", "距离计算"]
---

## 🏐 热身

排球比赛中，你站在后排 5 号位接球，要把球传到前排 2 号位的二传手那里。你离中线 6 米，二传手在网前偏右 4.5 米的位置。这个传球距离到底有多远？

这种"实际距离"问题，就是勾股定理最擅长的战场 🎯

学完前两课的公式和判定，今天来看看它在生活中有多能打。

## 🏐 发球

### 类型一：距离计算

**核心思路：** 在实际情景中找到直角三角形，然后套公式。

**例 1：排球传球距离**

你和二传手的位置关系：

<img src="/tutor/math-8/volleyball-court-positions.svg" alt="排球传球距离示意图" style="max-width:280px;width:100%;display:block;margin:1rem 0;" />

水平距离 4.5 米，垂直距离 6 米（忽略球的高度差），传球距离 $d$：

$$d = \sqrt{4.5^2 + 6^2} = \sqrt{20.25 + 36} = \sqrt{56.25} = 7.5 \text{ 米}$$

**例 2：梯子靠墙问题（经典考题）**

一架 10 米长的梯子斜靠在墙上，梯脚距墙 6 米，梯子顶端能到多高？

<img src="/tutor/math-8/ladder-wall.svg" alt="梯子靠墙示意图" style="max-width:220px;width:100%;display:block;margin:1rem 0;" />

$$h^2 + 6^2 = 10^2$$
$$h^2 = 100 - 36 = 64$$
$$h = 8 \text{ 米}$$

> ⚠️ 如果梯脚向外滑动 2 米（变成 8 米），顶端下滑多少？
> 新高度：$h' = \sqrt{10^2 - 8^2} = \sqrt{36} = 6$ 米
> 下滑了 $8 - 6 = 2$ 米。**脚滑 2 米，顶也滑 2 米？不一定！这里恰好相等。**

### 类型二：最短路径（展开法）

**这是考试拉分题，思路超重要！**

**例 3：蚂蚁爬圆柱**

一只蚂蚁在圆柱形排球柱上（高 2.55 米，周长 0.4 米），从底部 A 点爬到正上方顶部 B 点，走最短路径。求路径长。

**关键操作：把圆柱侧面展开成长方形！**

<img src="/tutor/math-8/cylinder-unroll.svg" alt="圆柱展开示意图" style="max-width:300px;width:100%;display:block;margin:1rem 0;" />

"正上方"意味着 B' 在 A 的正上方偏移半个周长的位置... 不对，正上方就是展开后水平距离为 0（如果绕了整圈）或周长。

实际上，最短路径 = 展开后 A 到 B' 的直线距离：

$$L = \sqrt{2.55^2 + 0.2^2} = \sqrt{6.5025 + 0.04} = \sqrt{6.5425} \approx 2.56 \text{ 米}$$

（绕半圈时水平距离 = 0.2 米）

> 💡 **记住：遇到"表面最短路径"就展开成平面，然后连直线！**

### 类型三：坐标/工程中的应用

**例 4：验证排球场的直角**

施工人员画球场时，需要确认角是直角。方法：从角点沿一条边量 3 米做标记，沿另一条边量 4 米做标记，然后量两个标记之间的距离。如果恰好是 5 米——直角！ ✅

这就是上节课逆定理的工程应用，建筑工人真的在用 👷

### 解题万能三步

1. **画图** — 把实际情景转化成几何图形
2. **找直角** — 确定哪里有直角三角形
3. **列方程** — 用 $a^2 + b^2 = c^2$ 建立等式，解方程

> 🏐 **排球赛场总结：** 场地对角线 ≈ 20.1m，半场对角线 ≈ 10.8m，发球距离（端线到对角）≈ 20.1m。这些数字下次跑位的时候可以感受一下！

<!--quiz
[
  {
    "question": "一架梯子长 $10$ 米，斜靠在墙上，梯脚距墙 $6$ 米。若梯脚向外滑动 $2$ 米，则梯顶下滑了",
    "options": [
      "A. $2$ 米",
      "B. $1$ 米",
      "C. $3$ 米",
      "D. $4$ 米"
    ],
    "answer": 0,
    "explanation": "初始：梯顶高 $h_1=\\sqrt{10^2-6^2}=\\sqrt{64}=8$ 米。滑后梯脚距墙 $8$ 米，梯顶 $h_2=\\sqrt{10^2-8^2}=\\sqrt{36}=6$ 米，下滑 $8-6=2$ 米，选A。干扰项B(1)认为脚滑2顶只滑1（非比例关系）；C(3)是猜测；D(4)认为脚滑多少顶就滑多少（脚滑2米≠顶滑2米）。",
    "svg": "<svg width=\"175\" height=\"185\" viewBox=\"0 0 175 185\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"30\" y1=\"20\" x2=\"30\" y2=\"165\" stroke=\"#1a1917\" stroke-width=\"3\"/><line x1=\"25\" y1=\"165\" x2=\"160\" y2=\"165\" stroke=\"#1a1917\" stroke-width=\"3\"/><line x1=\"30\" y1=\"55\" x2=\"130\" y2=\"165\" stroke=\"#d97706\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><rect x=\"30\" y=\"157\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><text x=\"5\" y=\"113\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">h</text><text x=\"72\" y=\"180\" text-anchor=\"middle\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">6m</text><text x=\"95\" y=\"103\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#d97706\">10m</text></svg>"
  },
  {
    "question": "一根竹竿在离地 $3$ 米处折断，竹顶落在距竹根 $4$ 米处，这根竹竿原高为",
    "options": [
      "A. $7$ 米",
      "B. $8$ 米",
      "C. $9$ 米",
      "D. $5$ 米"
    ],
    "answer": 1,
    "explanation": "折断部分为斜边：$\\sqrt{3^2+4^2}=5$ 米，原高 $=$ 未折部分 $+$ 折断部分 $=3+5=8$ 米，选B。干扰项A(7)直接将底边当折断部分：$3+4=7$；C(9)误算斜边为6：$3+6=9$；D(5)把折断部分5当成总高。",
    "svg": "<svg width=\"185\" height=\"185\" viewBox=\"0 0 185 185\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"20\" y1=\"175\" x2=\"175\" y2=\"175\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"60\" y1=\"175\" x2=\"60\" y2=\"110\" stroke=\"#16a34a\" stroke-width=\"2.5\" stroke-linecap=\"round\"/><line x1=\"60\" y1=\"110\" x2=\"120\" y2=\"175\" stroke=\"#16a34a\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/><rect x=\"60\" y=\"167\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><text x=\"44\" y=\"145\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">3m</text><text x=\"83\" y=\"180\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">4m</text><text x=\"96\" y=\"132\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">5m</text><text x=\"55\" y=\"185\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#888\">根</text></svg>"
  },
  {
    "question": "圆柱高 $4$ cm，底面周长 $6$ cm，蚂蚁从底面 $A$ 点出发，绕圆柱爬半圈到达顶面正对面 $B$ 点，最短路径长为",
    "options": [
      "A. $10$ cm",
      "B. $\\sqrt{52}$ cm",
      "C. $7$ cm",
      "D. $5$ cm"
    ],
    "answer": 3,
    "explanation": "将圆柱侧面展开成矩形：高4 cm，宽为半个底面周长 $=6\\div2=3$ cm。最短路径为矩形对角线：$\\sqrt{4^2+3^2}=\\sqrt{25}=5$ cm，选A。干扰项B($\\sqrt{52}$)误用整个周长：$\\sqrt{4^2+6^2}=\\sqrt{52}$；C(7)直接相加 $4+3=7$（没走最短直线）；D(10)误用整周长或其他错误。",
    "svg": "<svg width=\"205\" height=\"160\" viewBox=\"0 0 205 160\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"25\" y=\"15\" width=\"150\" height=\"120\" fill=\"#eff6ff\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"25\" y1=\"135\" x2=\"175\" y2=\"15\" stroke=\"#e11d48\" stroke-width=\"2\" stroke-dasharray=\"6,3\"/><text x=\"18\" y=\"12\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"168\" y=\"12\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">B'</text><text x=\"18\" y=\"148\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"100\" y=\"155\" text-anchor=\"middle\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#555\">半周长=3 cm</text><text x=\"180\" y=\"80\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">4</text><text x=\"87\" y=\"82\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#e11d48\">5</text></svg>"
  },
  {
    "question": "长方形的长为 $8$ m、宽为 $6$ m，沿对角线走，比沿两边走少走",
    "options": [
      "A. $2$ m",
      "B. $4$ m",
      "C. $3$ m",
      "D. $1$ m"
    ],
    "answer": 1,
    "explanation": "对角线 $=\\sqrt{8^2+6^2}=\\sqrt{100}=10$ m，沿两边 $=8+6=14$ m，少走 $14-10=4$ m，选B。干扰项A(2)误算对角线为12：$14-12=2$；C(3)误算对角线为11；D(1)是猜测。",
    "svg": "<svg width=\"215\" height=\"160\" viewBox=\"0 0 215 160\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"20\" y=\"20\" width=\"175\" height=\"115\" fill=\"#f5f5f3\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"20\" y1=\"135\" x2=\"195\" y2=\"20\" stroke=\"#2563eb\" stroke-width=\"1.8\" stroke-dasharray=\"6,3\"/><rect x=\"20\" y=\"127\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><text x=\"107\" y=\"153\" text-anchor=\"middle\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">8 m</text><text x=\"3\" y=\"82\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">6m</text><text x=\"97\" y=\"86\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#2563eb\">10m</text></svg>"
  },
  {
    "question": "小明向正东走 $6$ km 到 $B$，再向正北走 $8$ km 到 $C$，则 $C$ 到出发点 $A$ 的直线距离为",
    "options": [
      "A. $14$ km",
      "B. $\\sqrt{28}$ km",
      "C. $10$ km",
      "D. $2\\sqrt{5}$ km"
    ],
    "answer": 2,
    "explanation": "正东与正北方向垂直，形成直角三角形，$CA=\\sqrt{6^2+8^2}=\\sqrt{100}=10$ km，选B。干扰项A(14)直接相加 $6+8$（路程之和不等于直线距离）；C($\\sqrt{28}$)误算 $\\sqrt{6^2-8^2+...}$ 或乱凑；D($2\\sqrt{5}=\\sqrt{20}$)是数据用错。",
    "svg": "<svg width=\"200\" height=\"195\" viewBox=\"0 0 200 195\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"25\" y1=\"168\" x2=\"185\" y2=\"168\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><line x1=\"30\" y1=\"170\" x2=\"30\" y2=\"20\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><line x1=\"30\" y1=\"168\" x2=\"145\" y2=\"168\" stroke=\"#1a1917\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"145\" y1=\"168\" x2=\"145\" y2=\"43\" stroke=\"#1a1917\" stroke-width=\"2.2\" stroke-linecap=\"round\"/><line x1=\"30\" y1=\"168\" x2=\"145\" y2=\"43\" stroke=\"#e11d48\" stroke-width=\"1.8\" stroke-dasharray=\"6,3\"/><rect x=\"137\" y=\"160\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><circle cx=\"30\" cy=\"168\" r=\"3\" fill=\"#1a1917\"/><circle cx=\"145\" cy=\"168\" r=\"3\" fill=\"#1a1917\"/><circle cx=\"145\" cy=\"43\" r=\"3\" fill=\"#1a1917\"/><text x=\"18\" y=\"180\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"147\" y=\"182\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"147\" y=\"40\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"80\" y=\"183\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">东 6km</text><text x=\"150\" y=\"110\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">北 8km</text><text x=\"60\" y=\"100\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#e11d48\">10km</text><text x=\"186\" y=\"172\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#888\">东</text><text x=\"33\" y=\"18\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#888\">北</text></svg>"
  }
]

-->

<!--cards
[
  { "front": "勾股定理应用三步法", "back": "① 画图 → ② 找直角三角形 → ③ 列方程 a²+b²=c² 求解" },
  { "front": "最短路径问题怎么做？", "back": "把曲面（圆柱/圆锥）展开成平面，最短路径 = 展开图上的直线段" },
  { "front": "梯子靠墙模型", "back": "梯子=斜边 c，墙高=a，地面距离=b，满足 a²+b²=c²" },
  { "front": "工地验直角方法", "back": "量出 3m、4m，检查斜边是否等于 5m（3-4-5 勾股数）" },
  { "front": "折断树木问题", "back": "树高 = 未断部分 + 断裂部分（断裂部分是斜边，需用勾股定理计算）" }
]
-->
