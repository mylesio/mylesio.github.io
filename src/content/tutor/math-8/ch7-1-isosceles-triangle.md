---
title: "等腰三角形的性质与判定"
subject: "math"
grade: "8"
semester: "下"
chapter: 7
lesson: 1
description: "掌握等腰三角形两底角相等、三线合一性质，以及等角对等边的判定定理"
estimatedMinutes: 15
tags: ["等腰三角形", "三线合一", "等角对等边", "几何证明"]
---

## 🏐 热身

排球场网左右完全对称——这种**对称性**让裁判能公平判断压线球。等腰三角形就是几何里的"对称球网"：两腰相等，带来一系列漂亮的对称性质。

## 🏐 发球

### 基本概念

$\triangle ABC$ 中 $AB = AC$：腰为 $AB$、$AC$，底边 $BC$，顶角 $\angle A$，底角 $\angle B$、$\angle C$。

### 性质一：等边对等角

$$\boxed{AB = AC \implies \angle B = \angle C}$$

**证明：** 作 $AD$ 平分 $\angle BAC$，$D$ 在 $BC$ 上。$AB=AC$，$\angle BAD=\angle CAD$，$AD=AD$ → $\triangle ABD \cong \triangle ACD$（SAS） → $\angle B = \angle C$。$\blacksquare$

### 性质二：三线合一

等腰三角形顶角的**平分线**、底边上的**中线**、底边上的**高**互相重合。

> ⚠️ 三线合一仅限等腰三角形！一般三角形不具备。

### 判定定理：等角对等边

$$\boxed{\angle B = \angle C \implies AB = AC}$$

### 例题一

$\triangle ABC$ 中 $AB=AC$，$\angle A=40°$，求 $\angle B$、$\angle C$。

$$\angle B = \angle C = \frac{180°-40°}{2} = 70°$$

### 例题二

$AB=AC$，$D$ 是 $BC$ 中点，证明 $AD \perp BC$。

**证：** 由三线合一，$D$ 是底边中点且 $AD$ 是底边中线，同时也是底边上的高，故 $AD \perp BC$。$\blacksquare$

### 例题三（中考常考类型）

$\triangle ABC$ 中 $AB=AC$，$\angle ABC=40°$，$D$ 在 $BC$ 上且 $AD$ 平分 $\angle BAC$。求 $\angle ADB$。

$$\angle BAC = 180°-40°-40° = 100°，\quad \angle BAD = 50°$$
$$\angle ADB = 180°-40°-50° = 90°$$

即 $AD \perp BC$，再次印证三线合一。

## 🏐 扣球

| 常见错误 | 正确做法 |
|----------|----------|
| 三线合一用于一般三角形 | 仅等腰三角形的顶角一侧有此性质 |
| $\angle B=\angle C$ 推出 $BC=AC$ | 应推出 $AB=AC$（等角对**对边**） |
| 全等中忘写"公共边" | SAS/ASA 必须列三个条件，公共边不能省 |
| 等腰底角 $\angle B$ 对边误认为 $AB$ | $\angle B$ 对边是 $AC$，$\angle C$ 对边是 $AB$ |

## 🏆 河南中考真题模拟

**题目：** $\triangle ABC$ 中，$AB=AC$，$\angle BAC=100°$，$D$ 是 $BC$ 上一点，$\angle DAC=30°$。

（1）求 $\angle ADB$ 的度数；（2）证明 $AB = BD$。

**解：**

$\angle ABC = \angle ACB = \dfrac{180°-100°}{2} = 40°$

在 $\triangle ADC$ 中：$\angle ACD=40°$，$\angle DAC=30°$，

$$\angle ADC = 180°-40°-30° = 110° \implies \angle ADB = 70°$$

在 $\triangle ABD$ 中：$\angle ABD=40°$，$\angle ADB=70°$，

$$\angle BAD = 180°-40°-70° = 70° = \angle ADB$$

故 $\triangle ABD$ 等腰，$AB = BD$。$\blacksquare$

<!--quiz
[
  {"question":"等腰 $\\triangle ABC$ 中 $AB=AC$，$\\angle A=50°$，则 $\\angle B=$","options":["A. 50°","B. 65°","C. 80°","D. 130°"],"answer":1,"explanation":"底角 $=(180°-50°)/2=65°$"},
  {"question":"下列说法正确的是","options":["A. 等腰三角形三条高重合","B. 等腰三角形顶角平分线即底边中线","C. 任意三角形三线合一","D. 等腰三角形底角之和等于顶角"],"answer":1,"explanation":"三线合一：顶角平分线=底边中线=底边高，仅限等腰三角形"},
  {"question":"$\\triangle ABC$ 中 $\\angle B=\\angle C=70°$，则","options":["A. $AB=BC$","B. $AC=BC$","C. $AB=AC$","D. 三边相等"],"answer":2,"explanation":"等角对等边：$\\angle B=\\angle C$，各自对边相等，故 $AB=AC$"},
  {"question":"等腰三角形 $AB=AC=5$，底边 $BC=6$，底边上的高 $AD=$","options":["A. 3","B. 4","C. 5","D. $\\sqrt{11}$"],"answer":1,"explanation":"三线合一，$D$ 是 $BC$ 中点，$BD=3$，$AD=\\sqrt{25-9}=4$"},
  {"question":"$\\triangle ABC$ 中 $AB=AC$，$D$ 在 $BC$ 上，$\\angle BAD=\\angle C$，则 $\\triangle ABD$ 中","options":["A. $AD=BD$","B. $AB=BD$","C. $AD=AB$","D. 无法判断"],"answer":0,"explanation":"$\\angle BAD=\\angle C=\\angle ABD$，故 $\\triangle ABD$ 等腰，$AD=BD$"}
]
-->

<!--cards
[
  {"front":"等腰三角形等边对等角定理","back":"$AB=AC \\Rightarrow \\angle B=\\angle C$，证明用顶角平分线构造 SAS 全等"},
  {"front":"什么是三线合一？","back":"等腰三角形顶角的平分线、底边中线、底边上的高三线重合（仅等腰三角形）"},
  {"front":"等角对等边：$\\angle B=\\angle C$，哪两边相等？","back":"$\\angle B$ 对边 $AC$，$\\angle C$ 对边 $AB$，故 $AB=AC$"},
  {"front":"等腰三角形顶角为 $\\alpha$，底角是多少？","back":"底角 $=\\dfrac{180°-\\alpha}{2}$"},
  {"front":"证明等腰三角形性质最常用的辅助线","back":"作顶角平分线，将等腰三角形分成两个全等三角形（SAS）"}
]
-->
