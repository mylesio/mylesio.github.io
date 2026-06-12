---
title: "实数的运算——根号也能加减乘除"
subject: "math"
grade: "8"
semester: "上"
chapter: 2
lesson: 3
description: "实数的加减乘除运算，化简根号、合并同类根式"
estimatedMinutes: 15
tags: ["实数运算", "根式化简", "同类根式", "中考必考"]
---

## 🏐 热身

训练场地边长是 $\sqrt{3}$ 米，两块这样的场地拼在一起，总长是多少？

$$\sqrt{3} + \sqrt{3} = 2\sqrt{3} \text{ 米}$$

根号也可以加减！今天学实数运算，彻底攻克含根号的计算。

## 🏐 发球

### 化简根式（被开方数不含完全平方因数）

**基本方法：** 把被开方数中的完全平方因数提出根号外。

$$\sqrt{12} = \sqrt{4 \times 3} = 2\sqrt{3}$$

$$\sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$$

$$\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$$

$$\sqrt{75} = \sqrt{25 \times 3} = 5\sqrt{3}$$

> 💡 **技巧**：先把被开方数分解，找出最大的完全平方因数（$4,9,16,25,36\ldots$）

### 合并同类根式（加减）

**同类根式**：根指数相同，被开方数相同的根式。

$$2\sqrt{3} + 5\sqrt{3} = 7\sqrt{3} \qquad 4\sqrt{2} - \sqrt{2} = 3\sqrt{2}$$

> ⚠️ 必须先化简，再判断是否同类！

**例1：** 计算 $\sqrt{12} + \sqrt{27}$

$$= 2\sqrt{3} + 3\sqrt{3} = 5\sqrt{3}$$

**例2：** 计算 $2\sqrt{8} - \sqrt{18} + \sqrt{2}$

$$= 2 \times 2\sqrt{2} - 3\sqrt{2} + \sqrt{2} = 4\sqrt{2} - 3\sqrt{2} + \sqrt{2} = 2\sqrt{2}$$

### 根式的乘除

$$\sqrt{a} \times \sqrt{b} = \sqrt{ab} \quad (a \geq 0,\ b \geq 0)$$

$$\frac{\sqrt{a}}{\sqrt{b}} = \sqrt{\frac{a}{b}} \quad (a \geq 0,\ b > 0)$$

**例3：** 计算 $\sqrt{6} \times \sqrt{2}$

$$\sqrt{6} \times \sqrt{2} = \sqrt{12} = 2\sqrt{3}$$

**例4：** 计算 $2\sqrt{3} \times 3\sqrt{5}$

$$= (2 \times 3)\sqrt{3 \times 5} = 6\sqrt{15}$$

**例5：** 计算 $\dfrac{\sqrt{8}}{\sqrt{2}}$

$$= \sqrt{\frac{8}{2}} = \sqrt{4} = 2$$

### 综合运算（中考题型）

**例6：** 计算 $(\sqrt{3}+\sqrt{2})(\sqrt{3}-\sqrt{2})$

$$= (\sqrt{3})^2 - (\sqrt{2})^2 = 3 - 2 = 1$$

**例7：** 化简 $\dfrac{6}{\sqrt{3}}$（分母有理化）

$$\frac{6}{\sqrt{3}} = \frac{6\sqrt{3}}{\sqrt{3}\times\sqrt{3}} = \frac{6\sqrt{3}}{3} = 2\sqrt{3}$$

> 💡 **分母有理化**：分子分母同乘 $\sqrt{3}$，消去分母的根号。

## 🏐 扣球

### ❌ 易错区

| 错误 | 正确 |
|------|------|
| $\sqrt{4+9} = \sqrt{4}+\sqrt{9}$ | $\sqrt{13} \neq 2+3=5$！根号内不能拆加法 |
| $2\sqrt{3}+3\sqrt{2}$ 可以合并 | **不同类**（被开方数不同），不能合并 |
| $\sqrt{12}$ 已经最简 | $\sqrt{12}=2\sqrt{3}$，要化简到被开方数无完全平方因数 |
| $\sqrt{(-2)^2}=-2$ | $\sqrt{(-2)^2}=\sqrt{4}=2=|-2|$，结果非负 |

> 🎯 **化简步骤**：①分解被开方数 ②提完全平方因数出根号 ③合并同类根式

<!--quiz
[
  {
    "question": "化简 $\\sqrt{48}$ 的结果是",
    "options": ["A. $4\\sqrt{3}$", "B. $6\\sqrt{2}$", "C. $2\\sqrt{12}$", "D. $3\\sqrt{4}$"],
    "answer": 0,
    "explanation": "$\\sqrt{48}=\\sqrt{16\\times3}=4\\sqrt{3}$"
  },
  {
    "question": "计算 $\\sqrt{3}+\\sqrt{12}$ 的结果是",
    "options": ["A. $\\sqrt{15}$", "B. $3\\sqrt{3}$", "C. $4\\sqrt{3}$", "D. $2\\sqrt{3}$"],
    "answer": 1,
    "explanation": "$\\sqrt{12}=2\\sqrt{3}$，所以 $\\sqrt{3}+\\sqrt{12}=\\sqrt{3}+2\\sqrt{3}=3\\sqrt{3}$"
  },
  {
    "question": "计算 $\\sqrt{5} \\times \\sqrt{20}$ 的结果是",
    "options": ["A. $5\\sqrt{4}$", "B. $10$", "C. $2\\sqrt{5}$", "D. $\\sqrt{100}$（答案选B）"],
    "answer": 1,
    "explanation": "$\\sqrt{5}\\times\\sqrt{20}=\\sqrt{100}=10$"
  },
  {
    "question": "$\\dfrac{4}{\\sqrt{2}}$ 化简后等于",
    "options": ["A. $2\\sqrt{2}$", "B. $4\\sqrt{2}$", "C. $\\sqrt{8}$", "D. $2$"],
    "answer": 0,
    "explanation": "$\\frac{4}{\\sqrt{2}}=\\frac{4\\sqrt{2}}{2}=2\\sqrt{2}$（分母有理化）"
  },
  {
    "question": "计算 $(\\sqrt{5}+\\sqrt{3})(\\sqrt{5}-\\sqrt{3})$ 的结果是",
    "options": ["A. $2$", "B. $\\sqrt{2}$", "C. $4$", "D. $8$"],
    "answer": 0,
    "explanation": "平方差公式：$(\\sqrt{5})^2-(\\sqrt{3})^2=5-3=2$"
  }
]
-->

<!--cards
[
  { "front": "根式化简步骤", "back": "①分解被开方数，找最大完全平方因数 ②提出根号外 ③结果中被开方数无完全平方因数。例：$\\sqrt{72}=\\sqrt{36\\times2}=6\\sqrt{2}$" },
  { "front": "同类根式的合并", "back": "根指数相同且被开方数相同才能合并。先化简再合并！例：$\\sqrt{8}+\\sqrt{2}=2\\sqrt{2}+\\sqrt{2}=3\\sqrt{2}$" },
  { "front": "根式乘法公式", "back": "$\\sqrt{a}\\times\\sqrt{b}=\\sqrt{ab}$（$a,b\\geq0$）。例：$\\sqrt{3}\\times\\sqrt{12}=\\sqrt{36}=6$" },
  { "front": "分母有理化", "back": "分子分母同乘分母的根式，消去分母根号。例：$\\frac{6}{\\sqrt{3}}=\\frac{6\\sqrt{3}}{3}=2\\sqrt{3}$" },
  { "front": "常见错误：根号内加法不能拆", "back": "$\\sqrt{a+b}\\neq\\sqrt{a}+\\sqrt{b}$！例：$\\sqrt{9+16}=\\sqrt{25}=5\\neq3+4=7$" }
]
-->
