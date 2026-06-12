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
  {"question":"计算 $\dfrac{x^2-4}{x^2+x}\cdot\dfrac{x^2+2x+1}{x^2-x-2}$，化简结果是","options":["A. $\dfrac{x+2}{x}$","B. $\dfrac{x-2}{x}$","C. $\dfrac{x+1}{x}$","D. $\dfrac{(x+2)(x+1)}{x(x-2)}$"],"answer":0,"explanation":"分解：$x^2-4=(x+2)(x-2)$，$x^2+x=x(x+1)$，$x^2+2x+1=(x+1)^2$，$x^2-x-2=(x-2)(x+1)$。约简后：$\dfrac{(x+2)\cancel{(x-2)}}{x\cancel{(x+1)}}\cdot\dfrac{\cancel{(x+1)}^2}{\cancel{(x-2)}\cancel{(x+1)}}=\dfrac{x+2}{x}$。干扰项B：符号算反；干扰项C：约分时多消了 $(x+2)$；干扰项D：未约分。选 A。"},
  {"question":"计算 $\dfrac{x^2-2x+1}{x^2-1}\div\dfrac{x-1}{x+1}$，化简结果是","options":["A. $\dfrac{x-1}{x+1}$","B. $x-1$","C. $\dfrac{(x-1)^2}{x+1}$","D. $1$"],"answer":3,"explanation":"除法变乘倒数：$\dfrac{(x-1)^2}{(x+1)(x-1)}\cdot\dfrac{x+1}{x-1}=\dfrac{(x-1)^2(x+1)}{(x+1)(x-1)(x-1)}=1$（$x\neq\pm1$）。干扰项A：除法未取倒数；干扰项B：约分时漏掉了 $(x+1)$；干扰项C：中间步骤未继续化简。选 D。"},
  {"question":"计算 $\dfrac{a^2-ab}{a^2-b^2}\div\dfrac{a}{a+b}$，化简结果是","options":["A. $1$","B. $\dfrac{a-b}{a}$","C. $\dfrac{a}{a+b}$","D. $\dfrac{b}{a+b}$"],"answer":0,"explanation":"$\dfrac{a(a-b)}{(a+b)(a-b)}\cdot\dfrac{a+b}{a}=\dfrac{a(a-b)(a+b)}{(a+b)(a-b)\cdot a}=1$。干扰项B：忘记取倒数；干扰项C：约分不彻底；干扰项D：分子分母搞混。选 A。"},
  {"question":"化简 $\dfrac{x^2-x}{x^2-1}\div\dfrac{x}{x+1}$ 后代入 $x=\sqrt{3}+1$，结果是","options":["A. $2$","B. $\sqrt{3}$","C. $\sqrt{3}+1$","D. $1$"],"answer":3,"explanation":"化简：$\dfrac{x(x-1)}{(x+1)(x-1)}\cdot\dfrac{x+1}{x}=1$（约去 $x$、$(x-1)$、$(x+1)$）。代入任意合法 $x$ 结果均为 $1$，选 D。干扰项A/B/C：未化简直接代入，计算繁琐且可能出错。"},
  {"question":"计算 $\dfrac{x^2+3x+2}{x^2-1}\cdot\dfrac{x-1}{x+2}$，化简结果是","options":["A. $\dfrac{x+2}{x-1}$","B. $1$","C. $\dfrac{x-1}{x+2}$","D. $x+1$"],"answer":1,"explanation":"$x^2+3x+2=(x+1)(x+2)$，$x^2-1=(x+1)(x-1)$；$\dfrac{(x+1)(x+2)}{(x+1)(x-1)}\cdot\dfrac{x-1}{x+2}=\dfrac{(x+1)(x+2)(x-1)}{(x+1)(x-1)(x+2)}=1$。干扰项A：约分后分子分母搞反；干扰项C：部分约分；干扰项D：中间步骤计算错误。选 B。"}
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
