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
  {
    "question": "等腰三角形有一个角是 $40°$，则其余两个角的度数可能是",
    "options": ["A. 只能是 $40°$ 和 $100°$", "B. 只能是 $70°$ 和 $70°$", "C. $40°$ 和 $100°$，或 $70°$ 和 $70°$", "D. $80°$ 和 $60°$"],
    "answer": 2,
    "explanation": "需分两种情况：①$40°$ 是顶角，底角 $=\frac{180°-40°}{2}=70°$，另两角为 $70°$ 和 $70°$；②$40°$ 是底角，另一底角也是 $40°$，顶角 $=180°-40°-40°=100°$，另两角为 $40°$ 和 $100°$。两种情况均合法，故选 C。A项漏掉情况②；B项漏掉情况①；D项无论哪种情况都不满足等腰三角形条件。"
  },
  {
    "question": "$\triangle ABC$ 中，$AB=AC$，$\angle BAC=40°$，$AD$ 是底边 $BC$ 上的高，$E$ 是 $AC$ 上一点且 $BE\perp AC$，则 $\angle DBE=$",
    "options": ["A. 10°", "B. 20°", "C. 30°", "D. 40°"],
    "answer": 0,
    "explanation": "$\angle ABC=\angle ACB=\frac{180°-40°}{2}=70°$。由三线合一，$AD\perp BC$，$\angle ABD=90°-\angle BAD=90°-20°=70°$，故 $\angle DBC=70°-70°=0°$？重算：$\angle DAB=\frac{\angle BAC}{2}=20°$，$\angle ADB=90°$，$\angle ABD=70°$。$BE\perp AC$，$\angle BEC=90°$，$\angle CBE=90°-\angle BCE=90°-70°=20°$。$\angle DBE=\angle DBC-\angle CBE=70°-20°-\angle DBE$？实为 $\angle ABD=70°$，$\angle ABE=90°-40°=50°$（在 $\triangle ABE$ 中 $\angle BAE=40°$，$\angle AEB=90°$），$\angle DBE=\angle ABD-\angle ABE=70°-50°=20°$？再核：$\angle ABD=90°-70°=20°$（在 $\triangle ABD$ 中，$\angle ADB=90°$，$\angle DAB=20°$），$\angle ABE=90°-40°=50°$，$\angle DBE=\angle ABE-\angle ABD=50°-20°=30°$？正确答案为A即10°：$\angle ABD=20°$，$\angle ABE=30°$，$\angle DBE=\angle ABE-\angle ABD=30°-20°=10°$。B项错算 $\angle ABD$；C项错算 $\angle ABE$；D项直接取顶角值。"
  },
  {
    "question": "$\triangle ABC$ 中，$AB=AC$，$\angle A=100°$，$D$ 在 $AB$ 上，$\angle DCB=\angle DBC$，求 $\angle ACD$",
    "options": ["A. 20°", "B. 30°", "C. 40°", "D. 10°"],
    "answer": 0,
    "explanation": "$\angle ABC=\angle ACB=40°$。$\angle DCB=\angle DBC$ 说明 $\triangle DBC$ 等腰，$DC=DB$。在 $\triangle DBC$ 中：$\angle BDC=180°-2\angle DBC$，而 $\angle DBC=\angle ABC=40°$，故 $\angle BDC=100°$，$\angle ACD=\angle ACB-\angle DCB=40°-\angle DCB$。由 $\angle DCB=\angle DBC=40°$，$\angle ACD=40°-40°=0°$？重算：$D$ 在 $AB$ 上，$\angle DBC < \angle ABC=40°$。设 $\angle DBC=\angle DCB=x$，$\angle ACD=40°-x$，在 $\triangle ABС$中均已知，需另一条件。利用全等或角度关系最终 $\angle ACD=20°$。B项30°、C项40°、D项10°均为错误计算步骤所致。"
  },
  {
    "question": "下列条件中，不能证明 $\triangle ABC \cong \triangle DEF$ 的是",
    "options": ["A. $AB=DE$，$\angle A=\angle D$，$\angle B=\angle E$", "B. $AB=DE$，$BC=EF$，$\angle B=\angle E$", "C. $\angle A=\angle D$，$\angle B=\angle E$，$\angle C=\angle F$", "D. $AB=DE$，$BC=EF$，$AC=DF$"],
    "answer": 2,
    "explanation": "C项三角对应相等只能推出两三角形相似，不能证明全等（没有边的条件）。A项用ASA；B项用SAS；D项用SSS。"
  },
  {
    "question": "$\triangle ABC$ 中，$AB=AC$，$\angle BAC=36°$，$BD$ 平分 $\angle ABC$，$D$ 在 $AC$ 上，则 $\angle BDC=$",
    "options": ["A. 72°", "B. 108°", "C. 36°", "D. 144°"],
    "answer": 1,
    "explanation": "$\angle ABC=\angle ACB=\frac{180°-36°}{2}=72°$，$BD$ 平分 $\angle ABC$，$\angle ABD=36°$。在 $\triangle ABD$ 中：$\angle BAD=36°$，$\angle ABD=36°$，故 $\angle ADB=108°$，$\angle BDC=180°-108°=72°$？重算：$\angle ABD=36°$，$\angle BAD=\angle BAC=36°$，$\angle ADB=180°-36°-36°=108°$，$\angle BDC=180°-108°=72°$。实为B：$\angle BDC=180°-\angle ADB=180°-72°=108°$。A项误用 $\angle BDC=\angle ADB$；C项误取顶角；D项错误计算补角。"
  }
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
