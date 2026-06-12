---
title: "平行四边形的判定——5种方法全掌握"
subject: "math"
grade: "8"
semester: "上"
chapter: 6
lesson: 2
description: "掌握平行四边形的5种判定方法，重点掌握方法三的陷阱"
estimatedMinutes: 15
tags: ["平行四边形", "判定", "中考必考"]
---

## 🏐 热身

你是一名几何侦探，面前有一个四边形，要判断它是不是平行四边形。光凭眼睛看不算数，要有**证据**！

今天学5种"破案"方法，每一种都是确凿证据！

## 🏐 发球

### 5种判定方法

**方法一：定义法**
两组对边分别平行 → 是平行四边形
$$AB \parallel CD \text{ 且 } AD \parallel BC$$

**方法二：两组对边分别相等**
$$AB = CD \text{ 且 } AD = BC \implies \square ABCD$$

**方法三：一组对边平行且相等（⚠️ 高频考点）**
$$AB \parallel CD \text{ 且 } AB = CD \implies \square ABCD$$

**方法四：对角线互相平分**
$$OA = OC \text{ 且 } OB = OD \implies \square ABCD$$

**方法五：两组对角分别相等**
$$\angle A = \angle C \text{ 且 } \angle B = \angle D \implies \square ABCD$$

### 汇总表

| 方法 | 判定条件 | 关键词 |
|------|---------|--------|
| ① | 两组对边分别**平行** | 定义法 |
| ② | 两组对边分别**相等** | 对边等 |
| ③ | 一组对边**平行且相等** | 二合一（缺一不可！）|
| ④ | 对角线**互相平分** | 中点相交 |
| ⑤ | 两组对角**分别相等** | 对角等 |

### 例题

已知 $O$ 是对角线交点，$OA = OC = 3$，$OB = OD = 4$，证明 $ABCD$ 是平行四边形。

**证：** 由 $OA=OC$，$OB=OD$，对角线 $AC$ 与 $BD$ 互相平分，由判定方法四，$ABCD$ 是平行四边形。$\blacksquare$

## 🏐 扣球

### ❌ 方法三的致命陷阱

> **"一组对边平行且相等"——平行和相等，缺一不可！**

| 条件 | 结论 |
|------|------|
| 仅 $AB \parallel CD$ | 可能是梯形，不是平行四边形 |
| 仅 $AD = BC$ | 可能是等腰梯形，不是平行四边形 |
| $AB \parallel CD$ **且** $AB = CD$ | ✅ 一定是平行四边形 |

> 💡 梯形：有且只有一组对边平行；等腰梯形：两腰相等但不平行。方法三必须**同一组对边**同时满足两个条件！

<!--quiz
[
  {
    "question": "下列哪个条件能判定四边形 $ABCD$ 是平行四边形",
    "options": ["A. $AB = CD$", "B. $AB \\parallel CD$", "C. $AB \\parallel CD$ 且 $AB = CD$", "D. $\\angle A = \\angle B$"],
    "answer": 2,
    "explanation": "单独平行或相等都不够，必须同一组对边同时平行且相等"
  },
  {
    "question": "对角线交于 $O$，$OA = OC$，$OB = OD$，则该四边形是",
    "options": ["A. 梯形", "B. 平行四边形", "C. 矩形", "D. 菱形"],
    "answer": 1,
    "explanation": "对角线互相平分是方法四，判定为平行四边形"
  },
  {
    "question": "用两组对边分别相等来判定平行四边形，需要满足几个等式",
    "options": ["A. 1个", "B. 2个", "C. 3个", "D. 4个"],
    "answer": 1,
    "explanation": "需要 $AB=CD$ 且 $AD=BC$，共2个等式"
  },
  {
    "question": "$\\angle A = \\angle C = 80°$，$\\angle B = \\angle D = 100°$，则该四边形是",
    "options": ["A. 不是平行四边形", "B. 平行四边形", "C. 无法判断", "D. 菱形"],
    "answer": 1,
    "explanation": "两组对角分别相等，由方法五判定为平行四边形"
  },
  {
    "question": "梯形有一组对边平行，为什么不是平行四边形",
    "options": ["A. 梯形没有对称轴", "B. 梯形只有一组对边平行，另一组不平行", "C. 梯形对角线不相等", "D. 梯形角度不等"],
    "answer": 1,
    "explanation": "平行四边形要求两组对边分别平行，梯形只满足一组，所以不是平行四边形"
  }
]
-->

<!--cards
[
  { "front": "判定方法一（定义法）", "back": "两组对边分别平行：$AB\\parallel CD$ 且 $AD\\parallel BC$" },
  { "front": "判定方法三（最易出错）", "back": "一组对边**平行且相等**：$AB\\parallel CD$ 且 $AB=CD$。必须同一组，两个条件缺一不可！" },
  { "front": "判定方法四", "back": "对角线互相平分：$OA=OC$ 且 $OB=OD$（$O$ 为交点）" },
  { "front": "梯形 vs 平行四边形区别", "back": "梯形：只有一组对边平行；平行四边形：两组对边都平行。只有一组平行≠平行四边形！" },
  { "front": "5种判定方法哪个最易错？", "back": "方法三：一组对边平行且相等。容易只用平行或只用相等，导致结论错误" }
]
-->
