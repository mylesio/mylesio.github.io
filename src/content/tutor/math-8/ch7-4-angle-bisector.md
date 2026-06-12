---
title: "角平分线的性质与判定"
subject: "math"
grade: "8"
semester: "下"
chapter: 7
lesson: 4
description: "掌握角平分线的性质（到两边等距）和判定定理，理解内切圆与内心"
estimatedMinutes: 15
tags: ["角平分线", "等距", "内心", "几何证明"]
---

## 🏐 热身

排球主攻手站在进攻区域的"最优位置"——到两侧边线距离相等，这样无论往哪个方向扣球，角度都最均衡。这个"最优位置"恰好就在进攻区域角平分线上的某点！

## 🏐 发球

### 性质定理

$$\boxed{\text{角平分线上的点到角两边的距离相等}}$$

**证明：** $P$ 在 $\angle AOB$ 的平分线上，$PC \perp OA$，$PD \perp OB$。在 $\triangle POC$ 与 $\triangle POD$ 中：$\angle POC=\angle POD$（平分线），$\angle PCO=\angle PDO=90°$，$OP=OP$，由 AAS 得全等，故 $PC=PD$。$\blacksquare$

### 判定定理

$$\boxed{\text{到角两边距离相等的点在角平分线上（角内部）}}$$

### 推论：内心

三角形三条角平分线交于一点（**内心**），内心到三边距离相等（即内切圆圆心）。

### 例题一

$\angle AOB=60°$，$P$ 在角平分线上，$P$ 到 $OA$ 的距离为 3，求 $P$ 到 $OB$ 的距离。

由性质定理，$P$ 到 $OA$ = $P$ 到 $OB$ = **3**。

### 例题二

$\triangle ABC$ 中，$PA$、$PB$、$PC$ 是三条角平分线，$P$ 到 $AB$ 的距离为 2，求 $P$ 到 $BC$、$CA$ 的距离。

内心到三边距离相等，均为 **2**。

### 例题三（中考综合）

如图，$\angle MON$ 中，$P$ 是角内一点，$PD \perp OM$，$PE \perp ON$，$PD=PE=2$，$OP=\sqrt{13}$。

（1）求证 $P$ 在 $\angle MON$ 的角平分线上；（2）求 $D$、$E$ 到 $O$ 的距离。

（1）$PD=PE$，$PD \perp OM$，$PE \perp ON$，由角平分线判定定理，$P$ 在 $\angle MON$ 角平分线上。$\blacksquare$

（2）$OD=\sqrt{OP^2-PD^2}=\sqrt{13-4}=3$。同理 $OE=3$。

## 🏐 扣球

| 常见错误 | 正确做法 |
|----------|----------|
| 距离用斜线而非垂线段 | 点到直线的距离是**垂线段**长度 |
| 判定定理忘写"角内部"条件 | 须在角内部且到两边等距，才能判定在角平分线上 |
| 内心与外心混淆 | 内心：角平分线交点，到三边等距；外心：垂直平分线交点，到三顶点等距 |
| 角平分线性质用于延长线 | 性质适用于角的**内部**，延长线方向不适用 |

## 🏆 河南中考真题模拟

**题目：** $\triangle ABC$ 中，$\angle ABC$ 的平分线与 $\angle ACB$ 的平分线交于点 $I$，$\angle BAC=70°$。求 $\angle BIC$。

**解：**

设 $\angle ABC=2\beta$，$\angle ACB=2\gamma$。

$\angle BAC+\angle ABC+\angle ACB=180°$ → $70°+2\beta+2\gamma=180°$ → $\beta+\gamma=55°$

在 $\triangle BIC$ 中：$\angle IBC=\beta$，$\angle ICB=\gamma$，

$$\angle BIC = 180°-\beta-\gamma = 180°-55° = \boxed{125°}$$

**规律：** $\angle BIC = 90°+\dfrac{1}{2}\angle BAC$，这是**内心角**的中考公式，务必记住！

<!--quiz
[
  {
    "question": "$\\triangle ABC$ 中，$\\angle BAC=70°$，$I$ 是内心，则 $\\angle BIC=$",
    "svg": "<svg width=\"175\" height=\"155\" viewBox=\"0 0 175 155\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"87,10 20,140 155,140\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"87\" cy=\"100\" r=\"3\" fill=\"#1a1917\"/><line x1=\"87\" y1=\"10\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><line x1=\"20\" y1=\"140\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><line x1=\"155\" y1=\"140\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><text x=\"80\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"150\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"158\" y=\"150\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"91\" y=\"98\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">I</text></svg>",
    "options": ["A. 110°", "B. 125°", "C. 140°", "D. 105°"],
    "answer": 1,
    "explanation": "内心角公式：$\\angle BIC=90°+\\frac{1}{2}\\angle BAC=90°+35°=125°$。A项误用 $\\angle BIC=90°+\\frac{1}{2}(\\angle B+\\angle C)$（实际 $\\angle B+\\angle C=110°$，一半55°，90°+55°=145°，也不等于A）；A项实为直接 $180°-70°=110°$，忽略了除以2；C项误算 $180°-40°=140°$；D项误算 $90°+\\frac{1}{4}\\angle BAC$。"
  },
  {
    "question": "$\\angle MON=60°$，$P$ 在角内部，$PD\\perp OM$ 于 $D$，$PE\\perp ON$ 于 $E$，$PD=PE=3$，$OP=2\\sqrt{3}$。则 $OD=$",
    "svg": "<svg width=\"175\" height=\"155\" viewBox=\"0 0 175 155\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"20\" y1=\"140\" x2=\"165\" y2=\"140\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"20\" y1=\"140\" x2=\"120\" y2=\"20\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"20\" y1=\"140\" x2=\"155\" y2=\"75\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><circle cx=\"105\" cy=\"90\" r=\"3\" fill=\"#1a1917\"/><circle cx=\"82\" cy=\"140\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"127\" cy=\"71\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"82\" y1=\"140\" x2=\"105\" y2=\"90\" stroke=\"#1a1917\" stroke-width=\"1\"/><line x1=\"127\" y1=\"71\" x2=\"105\" y2=\"90\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"8\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><text x=\"116\" y=\"18\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">M</text><text x=\"158\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">N</text><text x=\"109\" y=\"88\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">P</text><text x=\"70\" y=\"136\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"130\" y=\"68\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text></svg>",
    "options": ["A. $\\sqrt{3}$", "B. 3", "C. $2\\sqrt{3}$", "D. $\\sqrt{21}$"],
    "answer": 1,
    "explanation": "$PD=PE$ 且 $P$ 在角内部，故 $P$ 在 $\\angle MON$ 的角平分线上，$\\angle POD=30°$。$\\triangle OPD$ 中 $\\angle PDO=90°$，$OP=2\\sqrt{3}$，$PD=3$，$OD=\\sqrt{OP^2-PD^2}=\\sqrt{12-9}=\\sqrt{3}$。B项直接取 $PD$ 值；C项取 $OP$ 值；D项错用 $\\sqrt{OP^2+PD^2}$。"
  },
  {
    "question": "以下哪组条件**不能**判定点 $P$ 在 $\\angle AOB$ 的角平分线上",
    "options": ["A. $P$ 在角内部，且 $P$ 到 $OA$、$OB$ 的距离相等", "B. $P$ 在角内部，$PC\\perp OA$，$PD\\perp OB$，$PC=PD$", "C. $\\angle AOP=\\angle BOP$", "D. $P$ 到 $OA$、$OB$ 的距离相等（$P$ 在角外部）"],
    "answer": 3,
    "explanation": "判定定理要求：在角**内部**且到两边距离相等。D项 $P$ 在角外部，到两边所在直线距离相等的点在角平分线的**延长线**上，不在角平分线上，故不能判定在角平分线上。A、B两项均为角内部等距，满足判定定理；C项直接是角平分线定义。"
  },
  {
    "question": "$\\triangle ABC$ 内心为 $I$，$\\angle BIC=130°$，则 $\\angle BAC=$",
    "svg": "<svg width=\"175\" height=\"155\" viewBox=\"0 0 175 155\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"87,10 20,140 155,140\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"87\" cy=\"100\" r=\"3\" fill=\"#1a1917\"/><line x1=\"87\" y1=\"10\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><line x1=\"20\" y1=\"140\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><line x1=\"155\" y1=\"140\" x2=\"87\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"3,3\"/><text x=\"80\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"150\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"158\" y=\"150\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"91\" y=\"98\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">I</text></svg>",
    "options": ["A. 65°", "B. 80°", "C. 100°", "D. 50°"],
    "answer": 1,
    "explanation": "由内心角公式 $\\angle BIC=90°+\\frac{1}{2}\\angle BAC$，得 $130°=90°+\\frac{1}{2}\\angle BAC$，$\\frac{1}{2}\\angle BAC=40°$，$\\angle BAC=80°$。A项错算为 $\\angle BAC=\\angle BIC\\div2$；C项错算 $\\angle BAC=2\\times(\\angle BIC-90°)\\times2$；D项错算 $\\angle BAC=\\angle BIC-80°$。"
  },
  {
    "question": "三角形的内心和外心的区别，下列说法正确的是",
    "options": ["A. 内心是三条垂直平分线的交点，到三边距离相等", "B. 外心是三条角平分线的交点，到三顶点距离相等", "C. 内心到三顶点距离相等，外心到三边距离相等", "D. 内心是三条角平分线的交点，到三边距离相等；外心是三条垂直平分线的交点，到三顶点距离相等"],
    "answer": 3,
    "explanation": "内心：三条角平分线的交点，到三边（而非三顶点）距离相等（内切圆圆心）；外心：三条边的垂直平分线的交点，到三顶点（而非三边）距离相等（外接圆圆心）。A项混淆内外心定义；B项同样混淆；C项将内外心的等距对象互换。"
  }
]
-->

<!--cards
[
  {"front":"角平分线性质定理","back":"角平分线上的点到角两边（所在直线）距离相等"},
  {"front":"角平分线判定定理","back":"角内部的点到角两边距离相等，则该点在角平分线上"},
  {"front":"三角形内心","back":"三条角平分线的交点，到三边距离相等（内切圆圆心）"},
  {"front":"内心角公式（中考必备）","back":"$\\angle BIC = 90° + \\dfrac{1}{2}\\angle BAC$"},
  {"front":"内心 vs 外心","back":"内心：角平分线交点，到三**边**等距；外心：垂直平分线交点，到三**顶点**等距"}
]
-->
