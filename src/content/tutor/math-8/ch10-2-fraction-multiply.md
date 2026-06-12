---
title: "分式的乘除法"
subject: "math"
grade: "8"
semester: "下"
chapter: 10
lesson: 2
description: "掌握分式乘除法的运算法则，结合因式分解化简"
estimatedMinutes: 15
tags: ["分式", "乘除法", "因式分解", "化简"]
---

## 🏐 热身

排球技术统计：进攻成功率 $\times$ 出手频率 = 总得分贡献率。分式相乘，就是把两个"比率"合并——分子乘分子，分母乘分母，然后化简。

## 🏐 发球

### 乘法法则

$$\frac{a}{b} \cdot \frac{c}{d} = \frac{ac}{bd} \quad (b\neq0, d\neq0)$$

**实际操作：** 先因式分解，约简公因式，再相乘，效率更高。

### 除法法则

$$\frac{a}{b} \div \frac{c}{d} = \frac{a}{b} \cdot \frac{d}{c} = \frac{ad}{bc} \quad (b,c,d\neq0)$$

除以一个分式 = 乘以它的**倒数**。

### 例题一：分式乘法

$$\frac{x^2-1}{x+2} \cdot \frac{x^2+4x+4}{x^2-x} = \frac{(x+1)(x-1)}{x+2} \cdot \frac{(x+2)^2}{x(x-1)}$$

$$= \frac{(x+1)\cancel{(x-1)}}{\cancel{(x+2)}} \cdot \frac{\cancel{(x+2)}^2}{x\cancel{(x-1)}} = \frac{(x+1)(x+2)}{x}$$

### 例题二：分式除法

$$\frac{x^2-4}{x} \div \frac{x-2}{x^2} = \frac{x^2-4}{x} \cdot \frac{x^2}{x-2} = \frac{(x+2)(x-2)}{x} \cdot \frac{x^2}{x-2} = x(x+2)$$

### 例题三（综合）

化简：$\dfrac{x^2+x}{x-1} \cdot \dfrac{x^2-1}{x^2+2x+1} \div \dfrac{x}{x-1}$

$$= \frac{x(x+1)}{x-1} \cdot \frac{(x+1)(x-1)}{(x+1)^2} \cdot \frac{x-1}{x} = x-1$$

## 🏐 扣球

| 错误 | 正确 |
|------|------|
| 乘法前不因式分解直接算 | 先因式分解，约简再乘，避免繁琐 |
| 除法忘记取倒数 | $\div\frac{c}{d}=\times\frac{d}{c}$，分子分母颠倒 |
| 约分时约掉加法项 | 只能约**乘法**形式的公因式 |
| 漏写分母不为0的限制 | 最终结果注明 $x\neq0,1,-1$ 等 |

## 🏆 真题模拟

化简 $\dfrac{x^2-2x+1}{x^2-1} \div \dfrac{x^2-x}{x+1}$。

$$= \frac{(x-1)^2}{(x+1)(x-1)} \cdot \frac{x+1}{x(x-1)} = \frac{(x-1)^2}{(x-1)} \cdot \frac{1}{x(x-1)} = \frac{1}{x}$$

<!--quiz
[
  {"question":"$\\frac{a}{b}\\div\\frac{c}{d}=$","options":["A. $\\frac{ac}{bd}$","B. $\\frac{ad}{bc}$","C. $\\frac{bc}{ad}$","D. $\\frac{a}{b}\\cdot\\frac{c}{d}$"],"answer":1,"explanation":"除以分式等于乘以其倒数：$\\frac{a}{b}\\cdot\\frac{d}{c}=\\frac{ad}{bc}$"},
  {"question":"$\\frac{x^2-9}{x+3}\\cdot\\frac{1}{x-3}=$","options":["A. $\\frac{x+3}{x-3}$","B. 1","C. $x-3$","D. $\\frac{1}{1}$"],"answer":1,"explanation":"$\\frac{(x+3)(x-3)}{x+3}\\cdot\\frac{1}{x-3}=1$"},
  {"question":"$\\frac{2x}{x-1}\\div\\frac{4x^2}{x^2-1}=$","options":["A. $\\frac{x+1}{2x}$","B. $\\frac{x-1}{2x}$","C. $\\frac{2x}{x+1}$","D. $\\frac{x+1}{2}$"],"answer":0,"explanation":"$\\frac{2x}{x-1}\\cdot\\frac{(x+1)(x-1)}{4x^2}=\\frac{2x(x+1)(x-1)}{4x^2(x-1)}=\\frac{x+1}{2x}$"},
  {"question":"化简 $\\frac{x^2+2x}{x^2-4}$","options":["A. $\\frac{x}{x-2}$","B. $\\frac{x+2}{x-2}$","C. $\\frac{x}{x+2}$","D. $\\frac{2x}{x-2}$"],"answer":0,"explanation":"$\\frac{x(x+2)}{(x+2)(x-2)}=\\frac{x}{x-2}$"},
  {"question":"分式乘法最高效的操作顺序是","options":["A. 先相乘再化简","B. 先因式分解约简再相乘","C. 顺序无关","D. 先展开所有括号"],"answer":1,"explanation":"先因式分解各分子分母，约去公因式后再相乘，计算量最小"}
]
-->

<!--cards
[
  {"front":"分式乘法法则","back":"$\\frac{a}{b}\\cdot\\frac{c}{d}=\\frac{ac}{bd}$，实操：先因式分解约简再乘"},
  {"front":"分式除法法则","back":"$\\frac{a}{b}\\div\\frac{c}{d}=\\frac{a}{b}\\cdot\\frac{d}{c}=\\frac{ad}{bc}$，除以分式=乘以倒数"},
  {"front":"分式运算高效技巧","back":"计算前先因式分解所有分子分母，约去公因式，减少计算量"},
  {"front":"$\\frac{x^2-1}{x+1}$ 化简","back":"$=\\frac{(x+1)(x-1)}{x+1}=x-1$（$x\\neq-1$）"},
  {"front":"分式乘除运算的限制条件","back":"所有分母（含除式的分子）不等于0，最终结果要注明"}
]
-->
