---
title: "三角形的中位线——平行四边形的桥梁"
subject: "math"
grade: "8"
semester: "上"
chapter: 6
lesson: 4
description: "掌握三角形中位线定理，理解梯形中位线公式"
estimatedMinutes: 15
tags: ["中位线定理", "梯形中位线", "中考必考"]
---

## 🏐 热身

排球网中间有一根绳子连接两侧网柱的中点——这根绳子的长度，和球网的长度有什么关系？

数学里也有类似问题：三角形两边的**中点**连起来，这条线段和第三边有什么关系？

今天的答案令人惊喜：**平行，且是一半！**

## 🏐 发球

### 三角形中位线定理

**定义：** 连接三角形两边中点的线段叫做三角形的**中位线**。

**定理：**

$$\boxed{\text{三角形的中位线平行于第三边，且等于第三边的一半}}$$

设 $D$、$E$ 分别是 $\triangle ABC$ 中 $AB$、$AC$ 的中点，则：

$$DE \parallel BC, \quad DE = \frac{1}{2}BC$$

<img src="/tutor/math-8/ch6-midline-theorem.svg" alt="三角形中位线示意图" style="max-width:280px;width:100%;display:block;margin:1rem 0;" />

### 定理证明（延长法）

延长 $DE$ 到 $F$，使 $EF = DE$。

由 $AE = CE$（$E$ 是中点），$\angle AED = \angle CEF$（对顶角），$EF = DE$，得 $\triangle ADE \cong \triangle CFE$（SAS）。

所以 $CF = AD = BD$，$CF \parallel AD$（对应角相等），即 $CF \parallel AB$。

又 $CF = BD$，$CF \parallel BD$，所以 $BCFD$ 是平行四边形。

因此 $DF = BC$，$DF \parallel BC$，即 $DE \parallel BC$，$DE = \frac{1}{2}DF = \frac{1}{2}BC$。$\blacksquare$

### 推论：三条中位线将三角形分成4个全等三角形

三角形三条中位线将原三角形分为 4 个面积相等的小三角形，面积各为原来的 $\frac{1}{4}$。

### 梯形中位线定理

**梯形中位线：** 连接梯形两腰中点的线段。

$$\boxed{m = \frac{a + b}{2}}$$

其中 $a$、$b$ 是梯形的上底和下底，$m$ 是中位线长。

**证明思路：** 延长腰 $AD$ 和 $BC$ 交于点 $P$，转化为三角形中位线问题处理。

### 例题一：中位线长度

$\triangle ABC$ 中，$D$、$E$ 分别是 $AB$、$AC$ 的中点，$BC = 10$，求 $DE$。

$$DE = \frac{1}{2}BC = \frac{1}{2} \times 10 = 5$$

### 例题二：梯形中位线

梯形上底 $a = 6$，下底 $b = 14$，求中位线长。

$$m = \frac{6 + 14}{2} = \frac{20}{2} = 10$$

### 例题三（逆用定理）

$\triangle ABC$ 中，$DE \parallel BC$，$D$ 在 $AB$ 上，$E$ 在 $AC$ 上，且 $DE = \frac{1}{2}BC$，求证 $D$、$E$ 是 $AB$、$AC$ 的中点。

**证：** 由中位线定理的逆定理，平行于第三边且等于其一半的线段，连接的是另外两边的中点，故 $D$、$E$ 分别是 $AB$、$AC$ 的中点。$\blacksquare$

## 🏐 扣球

### 中位线 vs 中线——别混！

| 概念 | 连接位置 | 性质 |
|------|---------|------|
| **中位线** | 两边的中点 | 平行第三边，等于一半 |
| **中线** | 顶点到对边中点 | 三条中线交于一点（重心） |

> ❌ 中位线不是中线！中位线连的是**两边中点**，不经过顶点。

### ❌ 易错区

| 错误 | 正确 |
|------|------|
| 中位线等于第三边 | 中位线 $= \frac{1}{2}$ 第三边 |
| 梯形中位线 $= \frac{a-b}{2}$ | 梯形中位线 $= \frac{a+b}{2}$（是**和**的一半）|
| 任意连两边中点都叫中位线 | 必须是**同一三角形**两边的中点 |

> 🎯 口诀：**中位线，连中点，平行三分之——不对，平行且等一半！**

<!--quiz
[
  {
    "question": "$\triangle ABC$ 中，$D$、$E$ 分别是 $AB$、$AC$ 的中点，$BC=10$。点 $F$ 在 $DE$ 上且 $BF\perp DE$。若 $BF=6$，则 $\triangle BDE$ 的面积为",
    "svg": "<svg width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"90,10 20,140 160,140\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"55\" y1=\"75\" x2=\"125\" y2=\"75\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"55\" cy=\"75\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"125\" cy=\"75\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"20\" y1=\"140\" x2=\"80\" y2=\"75\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><text x=\"84\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"162\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"40\" y=\"72\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"128\" y=\"72\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text></svg>",
    "options": ["A. 15", "B. 30", "C. 20", "D. 25"],
    "answer": 0,
    "explanation": "中位线定理：$DE=\frac{1}{2}BC=5$，底为 $DE=5$，高为 $BF=6$，面积 $=\frac{1}{2}\times5\times6=15$。B项错用 $BC=10$ 为底；C项错算为 $\frac{1}{2}\times10\times4$；D项错算为 $5\times5$。"
  },
  {
    "question": "梯形 $ABCD$ 中，$AD\parallel BC$，$M$、$N$ 分别是 $AB$、$CD$ 的中点，$MN=9$，$BC=14$，则 $AD=$",
    "svg": "<svg width=\"200\" height=\"130\" viewBox=\"0 0 200 130\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"50,110 30,30 140,30 170,110\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"40\" cy=\"70\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"155\" cy=\"70\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"40\" y1=\"70\" x2=\"155\" y2=\"70\" stroke=\"#1a1917\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/><text x=\"38\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"18\" y=\"28\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"140\" y=\"28\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"168\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"22\" y=\"66\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">M</text><text x=\"158\" y=\"66\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">N</text></svg>",
    "options": ["A. 2", "B. 4", "C. 5", "D. 23"],
    "answer": 1,
    "explanation": "梯形中位线公式：$MN=\frac{AD+BC}{2}$，故 $9=\frac{AD+14}{2}$，$AD=18-14=4$。A项错用 $MN=\frac{BC-AD}{2}$；C项错误配算；D项直接相加不除以2。"
  },
  {
    "question": "$\triangle ABC$ 中，$D$、$E$、$F$ 分别是 $AB$、$BC$、$CA$ 的中点，$AB=8$，$BC=10$，$CA=6$，则 $\triangle DEF$ 的周长为",
    "svg": "<svg width=\"180\" height=\"150\" viewBox=\"0 0 180 150\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"90,10 20,140 160,140\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><polygon points=\"55,75 90,140 125,75\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/><circle cx=\"55\" cy=\"75\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"125\" cy=\"75\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"90\" cy=\"140\" r=\"2.5\" fill=\"#1a1917\"/><text x=\"84\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"162\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"38\" y=\"72\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"87\" y=\"152\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text><text x=\"128\" y=\"72\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">F</text></svg>",
    "options": ["A. 6", "B. 12", "C. 24", "D. 8"],
    "answer": 1,
    "explanation": "$DE=\frac{1}{2}CA=3$，$EF=\frac{1}{2}AB=4$，$FD=\frac{1}{2}BC=5$，周长 $=3+4+5=12$。A项只算一条中位线；C项不取一半；D项只用 $AB$ 中位线乘三。"
  },
  {
    "question": "$\triangle ABC$ 中，$M$ 是 $BC$ 中点，$D$ 是 $AM$ 中点，连 $BD$ 并延长交 $AC$ 于点 $E$。已知 $AE=3$，则 $AC=$",
    "svg": "<svg width=\"190\" height=\"155\" viewBox=\"0 0 190 155\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"80,10 20,145 170,145\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"95\" cy=\"145\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"87.5\" cy=\"77.5\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"127\" cy=\"72\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"80\" y1=\"10\" x2=\"95\" y2=\"145\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><line x1=\"20\" y1=\"145\" x2=\"127\" y2=\"72\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><text x=\"74\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"152\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"172\" y=\"152\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"97\" y=\"152\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">M</text><text x=\"76\" y=\"76\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"130\" y=\"70\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text></svg>",
    "options": ["A. 6", "B. 9", "C. 12", "D. 4.5"],
    "answer": 1,
    "explanation": "过 $C$ 作 $CF\parallel BE$ 交 $AM$ 延长线于 $F$。在 $\triangle AMC$ 中，$M$ 为 $BC$ 中点推出 $\triangle$ 中 $E$ 是 $AC$ 的三等分点，$AE=\frac{1}{3}AC$，故 $AC=3\times3=9$。A项误认为 $AE=\frac{1}{2}AC$；C项误认为 $AE=\frac{1}{4}AC$；D项将 $AE$ 和 $EC$ 弄反。"
  },
  {
    "question": "已知梯形上底 $a=3$，中位线 $m=8$，则下底 $b=$",
    "options": ["A. 11", "B. 13", "C. 5.5", "D. 16"],
    "answer": 1,
    "explanation": "$m=\frac{a+b}{2}$，故 $8=\frac{3+b}{2}$，$b=16-3=13$。A项错用 $b=m+a=11$；C项错算 $b=m\div2-a$；D项错用 $b=2m=16$。"
  }
]
-->

<!--cards
[
  { "front": "三角形中位线定理", "back": "连接两边中点的线段平行于第三边，且等于第三边的一半：$DE\\parallel BC$，$DE=\\frac{1}{2}BC$" },
  { "front": "梯形中位线公式", "back": "$m = \\frac{a+b}{2}$（上底加下底除以2），注意是**和**的一半，不是差！" },
  { "front": "中位线的证明思路", "back": "延长中位线到等长点，构造平行四边形，利用平行四边形判定方法三证明" },
  { "front": "中位线 vs 中线", "back": "中位线：连两边**中点**，平行第三边；中线：**顶点**到对边中点，三线交于重心" },
  { "front": "三条中位线的推论", "back": "三条中位线将三角形分成4个全等的小三角形，每个面积$=\\frac{1}{4}$原三角形面积" }
]
-->
