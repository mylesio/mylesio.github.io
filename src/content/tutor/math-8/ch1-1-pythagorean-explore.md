---
title: "探索勾股定理"
subject: "math"
grade: "8"
semester: "上"
chapter: 1
lesson: 1
description: "从面积法出发，发现直角三角形三边的神奇关系"
estimatedMinutes: 15
tags: ["勾股定理", "直角三角形", "面积法"]
---

## 🏐 热身

想象一下排球场的底线——你站在一个角落，队友站在对角。教练喊你跑对角线冲刺，你心里嘀咕：这条对角线到底有多长？

排球场长 18 米、宽 9 米，对角线把场地切成两个直角三角形。如果能找到直角三角形三条边的关系，就能算出这条对角线的长度了。

今天我们就来探索这个 2500 年前就被发现的数学宝藏 💎

## 🏐 发球

### 从正方形面积说起

看这个图：在一个直角三角形的三条边上，分别画正方形。

<img src="/tutor/math-8/pythagorean-squares.svg" alt="勾股定理图解：直角三角形三条边上各画一个正方形" style="max-width:300px;width:100%;display:block;margin:1rem 0;" />

三条边上各画一个正方形，面积分别为 $a^2$（橙色）、$b^2$（绿色）、$c^2$（紫色）。

古人发现了一个惊人的事实：

> **两条直角边上正方形的面积之和 = 斜边上正方形的面积**

用公式写出来就是：

$$a^2 + b^2 = c^2$$

其中 $a$、$b$ 是直角边，$c$ 是斜边（最长的那条边，对着直角）。

这就是**勾股定理**（也叫毕达哥拉斯定理）。古代中国叫"勾三股四弦五"——勾是短直角边，股是长直角边，弦是斜边。

### 验证几组经典数据

**例 1：最经典的 3, 4, 5**

$$3^2 + 4^2 = 9 + 16 = 25 = 5^2 \checkmark$$

**例 2：6, 8, 10**（其实就是 3, 4, 5 各乘以 2）

$$6^2 + 8^2 = 36 + 64 = 100 = 10^2 \checkmark$$

**例 3：5, 12, 13**

$$5^2 + 12^2 = 25 + 144 = 169 = 13^2 \checkmark$$

> 💡 **像 (3,4,5)、(5,12,13)、(8,15,17) 这样满足勾股定理的整数组，叫做"勾股数"。**

### 用面积法证明（拼图法）

拿 4 个完全相同的直角三角形（直角边为 $a$、$b$），拼成一个大正方形：

<img src="/tutor/math-8/pythagorean-proof.svg" alt="勾股定理证明：4个直角三角形拼大正方形" style="max-width:260px;width:100%;display:block;margin:1rem 0;" />

- 大正方形边长 = $a + b$，面积 = $(a+b)^2$
- 中间空出的小正方形边长 = $c$，面积 = $c^2$
- 4 个三角形面积 = $4 \times \frac{1}{2}ab = 2ab$

所以：$(a+b)^2 = c^2 + 2ab$

展开：$a^2 + 2ab + b^2 = c^2 + 2ab$

两边消去 $2ab$：

$$a^2 + b^2 = c^2$$

证毕！✨

### 回到开头的问题

排球场长 18 米、宽 9 米，对角线 $d$ 满足：

$$d^2 = 18^2 + 9^2 = 324 + 81 = 405$$

$$d = \sqrt{405} = 9\sqrt{5} \approx 20.1 \text{ 米}$$

所以教练让你跑的对角线大约是 20 米——比长边还长不少呢 🏃

<!--quiz
[
  {
    "question": "等腰三角形的腰长为 $10$，底边长为 $12$，则该三角形的面积为",
    "options": [
      "A. $48$",
      "B. $60$",
      "C. $72$",
      "D. $96$"
    ],
    "answer": 0,
    "explanation": "作底边上的高，将等腰三角形分为两个全等直角三角形。腰为斜边10，底边一半为6，由勾股定理 $h=\\sqrt{10^2-6^2}=\\sqrt{64}=8$。面积 $=\\frac{1}{2}\\times12\\times8=48$，选A。干扰项B(60)误用腰长为高 $\\frac{1}{2}\\times12\\times10=60$；C(72)是12×6不除以2；D(96)是12×8不除以2。",
    "svg": "<svg width=\"200\" height=\"160\" viewBox=\"0 0 200 160\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"100,15 20,135 180,135\" fill=\"#f5f5f3\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"100\" y1=\"15\" x2=\"100\" y2=\"135\" stroke=\"#1a1917\" stroke-width=\"1.2\" stroke-dasharray=\"4,3\"/><rect x=\"100\" y=\"127\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><text x=\"100\" y=\"10\" text-anchor=\"middle\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"12\" y=\"148\" text-anchor=\"middle\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"188\" y=\"148\" text-anchor=\"middle\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"113\" y=\"80\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#555\">h</text><text x=\"143\" y=\"148\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#555\">6</text><text x=\"50\" y=\"148\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#555\">6</text></svg>"
  },
  {
    "question": "正方形 $ABCD$ 的边长为 $a$，$E$ 是 $BC$ 的中点，则 $AE$ 的长为",
    "options": [
      "A. $\\dfrac{\\sqrt{3}}{2}a$",
      "B. $\\dfrac{\\sqrt{5}}{2}a$",
      "C. $\\dfrac{3}{2}a$",
      "D. $\\sqrt{5}a$"
    ],
    "answer": 1,
    "explanation": "在直角三角形 $ABE$ 中，$AB=a$，$BE=\\frac{a}{2}$（$E$是$BC$中点）。$AE^2=a^2+\\frac{a^2}{4}=\\frac{5a^2}{4}$，$AE=\\frac{\\sqrt{5}}{2}a$，选B。干扰项A混淆等边三角形高的公式 $\\frac{\\sqrt{3}}{2}a$；C是直接将 $AB+BE=a+\\frac{a}{2}=\\frac{3}{2}a$（不能直接加边）；D漏了分母2，写成 $\\sqrt{a^2+a^2}=\\sqrt{2}a$（又搞错了变成了D）。",
    "svg": "<svg width=\"190\" height=\"170\" viewBox=\"0 0 190 170\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"40\" y=\"20\" width=\"110\" height=\"110\" fill=\"#f5f5f3\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"150\" cy=\"75\" r=\"3\" fill=\"#1a1917\"/><line x1=\"40\" y1=\"20\" x2=\"150\" y2=\"75\" stroke=\"#1a1917\" stroke-width=\"1.8\" stroke-dasharray=\"5,3\"/><text x=\"28\" y=\"18\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"153\" y=\"18\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"153\" y=\"140\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"28\" y=\"140\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"155\" y=\"79\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text><text x=\"75\" y=\"55\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#555\">AE</text></svg>"
  },
  {
    "question": "已知 $a+b=7$，$a-b=1$（$a$、$b$ 为直角三角形的两条直角边），则斜边 $c$ 的长为",
    "options": [
      "A. $\\sqrt{53}$",
      "B. $\\sqrt{50}$",
      "C. $\\sqrt{37}$",
      "D. $5$"
    ],
    "answer": 3,
    "explanation": "由 $a+b=7$，$a-b=1$ 解得 $a=4$，$b=3$。$c=\\sqrt{4^2+3^2}=\\sqrt{25}=5$，选A。干扰项B($\\sqrt{50}$)误将 $a+b=7$ 和 $a-b=1$ 当两直角边：$c=\\sqrt{7^2+1^2}=\\sqrt{50}$；C($\\sqrt{37}$)是错误地用 $\\sqrt{a^2+(a-b)^2}=\\sqrt{16+21}$（乱代）；D($\\sqrt{53}$)是用 $a=4,b=\\sqrt{37-16}$ 等错误运算。"
  },
  {
    "question": "在 $\\triangle ABC$ 中，$\\angle C=90°$，$AC=\\sqrt{3}$，$BC=1$，$D$ 是斜边 $AB$ 的中点，则 $CD$ 的长为",
    "options": [
      "A. $\\dfrac{\\sqrt{7}}{2}$",
      "B. $\\sqrt{2}$",
      "C. $1$",
      "D. $\\dfrac{\\sqrt{3}}{2}$"
    ],
    "answer": 2,
    "explanation": "斜边 $AB=\\sqrt{(\\sqrt{3})^2+1^2}=2$，直角三角形斜边上的中线等于斜边的一半：$CD=\\frac{AB}{2}=1$，选A。干扰项B($\\sqrt{2}$)误用勾股定理把 $CD$ 当成某条边 $\\sqrt{(\\frac{\\sqrt{3}}{2})^2+(\\frac{1}{2})^2}$ 等错算；C($\\frac{\\sqrt{7}}{2}$)错误应用中线长公式代入；D($\\frac{\\sqrt{3}}{2}$)是把 $AC$ 的一半当答案。",
    "svg": "<svg width=\"200\" height=\"165\" viewBox=\"0 0 200 165\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"30,135 30,25 165,135\" fill=\"#f5f5f3\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><rect x=\"30\" y=\"127\" width=\"8\" height=\"8\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.2\"/><circle cx=\"97\" cy=\"80\" r=\"3\" fill=\"#1a1917\"/><line x1=\"30\" y1=\"135\" x2=\"97\" y2=\"80\" stroke=\"#1a1917\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/><text x=\"18\" y=\"24\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"168\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"16\" y=\"148\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"99\" y=\"74\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"42\" y=\"120\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#555\">CD=AB/2</text></svg>"
  },
  {
    "question": "正方形 $ABCD$ 对角线交于 $O$，$AB=6$，则 $OA$ 的长为",
    "options": [
      "A. $3$",
      "B. $3\\sqrt{2}$",
      "C. $6\\sqrt{2}$",
      "D. $9$"
    ],
    "answer": 1,
    "explanation": "正方形对角线 $AC=\\sqrt{AB^2+BC^2}=\\sqrt{36+36}=6\\sqrt{2}$，$O$ 是中点，$OA=\\frac{6\\sqrt{2}}{2}=3\\sqrt{2}$，选B。干扰项A(3)误认为 $OA=\\frac{AB}{2}=3$；C($6\\sqrt{2}$)求出 $AC$ 忘了除以2；D(9)错误计算 $OA=AB+\\frac{AB}{2}$。",
    "svg": "<svg width=\"180\" height=\"175\" viewBox=\"0 0 180 175\" xmlns=\"http://www.w3.org/2000/svg\"><rect x=\"30\" y=\"20\" width=\"120\" height=\"120\" fill=\"#f5f5f3\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"30\" y1=\"20\" x2=\"150\" y2=\"140\" stroke=\"#1a1917\" stroke-width=\"1.2\" stroke-dasharray=\"5,3\"/><line x1=\"150\" y1=\"20\" x2=\"30\" y2=\"140\" stroke=\"#1a1917\" stroke-width=\"1.2\" stroke-dasharray=\"5,3\"/><circle cx=\"90\" cy=\"80\" r=\"3\" fill=\"#1a1917\"/><text x=\"18\" y=\"18\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"153\" y=\"18\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"153\" y=\"153\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"18\" y=\"153\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"93\" y=\"77\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><text x=\"90\" y=\"165\" text-anchor=\"middle\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#888\">AB=6</text></svg>"
  }
]

-->

<!--cards
[
  { "front": "勾股定理公式", "back": "a² + b² = c²（a、b 为直角边，c 为斜边）" },
  { "front": "什么是勾股数？", "back": "满足 a² + b² = c² 的三个正整数，如 (3,4,5)、(5,12,13)、(8,15,17)" },
  { "front": "勾股定理的适用条件", "back": "必须是直角三角形！普通三角形不能直接用。" },
  { "front": "已知两直角边求斜边", "back": "c = $\sqrt{a² + b²}$" },
  { "front": "已知斜边和一直角边求另一边", "back": "a = $\sqrt{c² - b²}$" }
]
-->
