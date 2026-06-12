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
    "question": "下列条件中，能判定四边形 $ABCD$ 是平行四边形的是",
    "options": ["A. $AB=CD$ 且 $AD\\parallel BC$", "B. $AB\\parallel CD$ 且 $AD=BC$", "C. $\\angle A=\\angle B$ 且 $\\angle C=\\angle D$", "D. $AB\\parallel CD$ 且 $AB=CD$"],
    "answer": 3,
    "explanation": "D满足判定方法三：同一组对边平行且相等，可判定为平行四边形。A选项一组相等另一组平行（不同组），可能是梯形；B选项一组平行另一组相等（不同组），可能是等腰梯形；C选项邻角相等不是对角相等，不满足任何方法。"
  },
  {
    "question": "四边形 $ABCD$ 中，对角线 $AC$ 与 $BD$ 交于点 $O$，若 $OA=OC=3$，$OB=5$，$OD=3$，则 $ABCD$",
    "options": ["A. 是平行四边形", "B. 不是平行四边形", "C. 是矩形", "D. 无法判断"],
    "answer": 1,
    "explanation": "对角线互相平分需要 $OA=OC$ 且 $OB=OD$。此处 $OA=OC=3$，但 $OB=5\neq OD=3$，只满足一半条件，不能判定为平行四边形。A错误是只看到 $OA=OC$ 就认为满足条件；C错误是混淆了矩形和平行四边形；D错误是已可明确排除。"
  },
  {
    "question": "以下四组条件，哪一组不能判定四边形 $ABCD$ 是平行四边形？",
    "options": ["A. $AB=CD$，$AD\\parallel BC$", "B. $\\angle A=\\angle C$，$\\angle B=\\angle D$", "C. $OA=OC$，$OB=OD$（$O$ 为对角线交点）", "D. $AB\\parallel CD$，$AB=CD$"],
    "answer": 0,
    "explanation": "A：$AB=CD$（一组对边相等）且 $AD\\parallel BC$（另一组平行），属于不同组的对边，不满足任何判定方法，故A不能判定。B是方法五（两组对角分别相等）；C是方法四（对角线互相平分）；D是方法三（同一组对边平行且相等）。A是最常见陷阱：一组相等、另一组平行，可能是梯形。"
  },
  {
    "question": "如图，$E$、$F$ 分别是 $\\square ABCD$ 对角线 $BD$ 上两点，且 $BE=DF$。则四边形 $AECF$ 是平行四边形，依据是",
    "options": ["A. 两组对角分别相等", "B. 两组对边分别相等", "C. 对角线互相平分", "D. 一组对边平行且相等"],
    "answer": 2,
    "explanation": "设对角线交点为 $O$，$OB=OD$（平行四边形性质），$BE=DF$，所以 $OE=OB-BE=OD-DF=OF$。又 $OA=OC$（平行四边形性质），所以对角线 $AC$ 与 $EF$ 互相平分，由判定方法四，$AECF$ 是平行四边形。A、B、D需要额外计算验证，C（对角线互相平分）可直接由上述推导得出。"
  },
  {
    "question": "在四边形 $ABCD$ 中已知 $AB\\parallel CD$，下列不能与其合并判定为平行四边形的条件是",
    "options": ["A. $AD=BC$", "B. $AB=CD$", "C. $AD\\parallel BC$", "D. $\\angle A=\\angle C$"],
    "answer": 0,
    "explanation": "A：$AB\\parallel CD$ 且 $AD=BC$，一组平行另一组相等（不同组），可能是等腰梯形，不能判定为平行四边形。B：$AB\\parallel CD$ 且 $AB=CD$，满足方法三，可以判定；C：加上另一组平行，满足定义；D：在 $AB\\parallel CD$ 下，$\\angle A=\\angle C$ 等价于两组对角相等，满足方法五。故A不能判定。"
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
