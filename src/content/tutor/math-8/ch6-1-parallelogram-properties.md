---
title: "平行四边形的性质——对称之美"
subject: "math"
grade: "8"
semester: "上"
chapter: 6
lesson: 1
description: "掌握平行四边形对边、对角、对角线三大性质"
estimatedMinutes: 15
tags: ["平行四边形", "性质", "中考必考"]
---

## 🏐 热身

排球场地是矩形——矩形是特殊的平行四边形。今天聊更"歪"的版本：普通平行四边形。

**定义：** 两组对边分别平行的四边形叫做**平行四边形**，记作 $\square ABCD$。

<img src="/tutor/math-8/ch6-parallelogram-basic.svg" alt="平行四边形ABCD" style="max-width:280px;width:100%;display:block;margin:1rem 0;" />

$AB \parallel CD$，$AD \parallel BC$。它有哪些神奇性质？

## 🏐 发球

### 性质一：对边相等

$$\boxed{AB = CD, \quad AD = BC}$$

**证明思路：** 连对角线 $AC$，由两组平行关系得 $\triangle ABC \cong \triangle CDA$（ASA），对应边相等。

### 性质二：对角相等，邻角互补

$$\boxed{\angle A = \angle C, \quad \angle B = \angle D, \quad \angle A + \angle B = 180°}$$

> 💡 口诀：**对角相等，邻角互补，好兄弟一起出现！**

### 性质三：对角线互相平分

设对角线 $AC$ 与 $BD$ 交于点 $O$：

$$\boxed{OA = OC, \quad OB = OD}$$

**证明：** $AB \parallel CD$ → $\angle OAB = \angle OCD$，$\angle OBA = \angle ODC$，又 $AB = CD$（性质一），所以 $\triangle AOB \cong \triangle COD$（ASA）。

### 例题一：角度计算

在 $\square ABCD$ 中，$\angle A = 70°$，求其余三个角。

$$\angle C = \angle A = 70°$$
$$\angle B = 180° - 70° = 110°$$
$$\angle D = \angle B = 110°$$

### 例题二：线段计算

对角线 $AC=12$，$BD=8$，交于 $O$，求 $OA$、$OB$。

$$OA = \frac{1}{2}AC = 6, \qquad OB = \frac{1}{2}BD = 4$$

## 🏐 扣球

### ❌ 超级易错！

| 性质 | 平行四边形 | 矩形 |
|------|-----------|------|
| 对角线互相平分 | ✅ | ✅ |
| 对角线**相等** | ❌ | ✅ |

> 普通平行四边形的对角线：**互相平分，但不一定相等！**

口诀：**对边等，对角等，对角线互相平分**——三大性质全掌握！

<!--quiz
[
  {
    "question": "在 $\\square ABCD$ 中，$\\angle A = 60°$，则 $\\angle B$ 等于",
    "options": ["A. 60°", "B. 90°", "C. 120°", "D. 150°"],
    "answer": 2,
    "explanation": "相邻两角互补：$\\angle B = 180° - 60° = 120°$"
  },
  {
    "question": "在 $\\square ABCD$ 中，$AB = 5$，$BC = 3$，则 $CD$ 等于",
    "options": ["A. 3", "B. 5", "C. 8", "D. 无法确定"],
    "answer": 1,
    "explanation": "对边相等，$CD = AB = 5$"
  },
  {
    "question": "对角线 $AC$ 与 $BD$ 交于 $O$，已知 $OA = 4$，则 $AC$ 等于",
    "options": ["A. 2", "B. 4", "C. 8", "D. 16"],
    "answer": 2,
    "explanation": "对角线互相平分，$OA = OC = 4$，$AC = 8$"
  },
  {
    "question": "下列说法正确的是",
    "options": ["A. 平行四边形对角线相等", "B. 平行四边形对角线互相垂直", "C. 平行四边形对角线互相平分", "D. 平行四边形对角线互相垂直平分"],
    "answer": 2,
    "explanation": "平行四边形只具有对角线互相平分的性质，相等是矩形才有的，垂直是菱形才有的"
  },
  {
    "question": "在 $\\square ABCD$ 中，$\\angle A : \\angle B = 1 : 2$，则 $\\angle A$ 等于",
    "options": ["A. 45°", "B. 60°", "C. 90°", "D. 120°"],
    "answer": 1,
    "explanation": "$\\angle A + \\angle B = 180°$，设 $\\angle A = x$，$2x = 180°$，$x = 60°$"
  }
]
-->

<!--cards
[
  { "front": "平行四边形的对边关系", "back": "两组对边分别相等：$AB=CD$，$AD=BC$" },
  { "front": "平行四边形的对角关系", "back": "对角相等：$\\angle A=\\angle C$，$\\angle B=\\angle D$；邻角互补：$\\angle A+\\angle B=180°$" },
  { "front": "平行四边形对角线的性质", "back": "互相平分：设交点$O$，则$OA=OC$，$OB=OD$。注意：不一定相等！" },
  { "front": "平行四边形 vs 矩形的对角线区别", "back": "平行四边形：对角线互相平分（不一定相等）；矩形：对角线互相平分**且相等**" },
  { "front": "三大性质口诀", "back": "对边等，对角等，对角线互相平分；邻角互补180°，别忘了这条规律！" }
]
-->
