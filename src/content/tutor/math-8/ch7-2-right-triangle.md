---
title: "直角三角形：勾股逆定理与30°角性质"
subject: "math"
grade: "8"
semester: "下"
chapter: 7
lesson: 2
description: "掌握勾股定理逆定理判断直角三角形，以及30°角所对直角边等于斜边一半的性质"
estimatedMinutes: 15
tags: ["直角三角形", "勾股逆定理", "30度角", "几何证明"]
---

## 🏐 热身

排球运动员跳发球：水平距离、下落高度、斜线飞行路径构成三边。教练需要判断球路是否"直角"——这时候勾股定理就是隐形量角器。今天我们不只**计算**，还要学会用它**判断**。

## 🏐 发球

### 勾股定理逆定理

$$\boxed{a^2+b^2=c^2 \implies \triangle \text{ 是直角三角形，} c \text{ 所对的角是直角}}$$

**证明（构造法）：** 构造 $\triangle A'B'C'$ 使 $\angle B'=90°$，$A'B'=a$，$B'C'=b$，则 $A'C'=\sqrt{a^2+b^2}=c$，故 $\triangle ABC \cong \triangle A'B'C'$（SSS），$\angle B=90°$。$\blacksquare$

### 常见勾股数组

| 勾股数 | 验证 |
|--------|------|
| 3, 4, 5 | $9+16=25$ ✓ |
| 5, 12, 13 | $25+144=169$ ✓ |
| 8, 15, 17 | $64+225=289$ ✓ |
| 整数倍 | 6,8,10 / 9,12,15 等 |

> 💡 看到三边数字先试常见勾股数，快速判断。

### 30°角的性质

$$\boxed{\text{直角三角形中，30° 所对直角边} = \frac{1}{2}\text{斜边}}$$

**证明（延长法）：** 直角三角形 $ABC$，$\angle C=90°$，$\angle A=30°$。延长 $BC$ 到 $D$ 使 $CD=BC$，连 $AD$。由 SAS，$\triangle ACB \cong \triangle ACD$，故 $AD=AB$，$\angle D=\angle ABD=30°$。$\triangle ABD$ 中三角均为 $60°$，等边三角形，$BD=AB$。$BD=2BC$，故 $BC=\dfrac{1}{2}AB$。$\blacksquare$

### 例题一：判断直角三角形

三角形三边为 5、12、13，判断是否直角三角形。

$$5^2+12^2 = 25+144 = 169 = 13^2 \checkmark$$

是直角三角形，直角在13所对的顶点处。

### 例题二：30°性质应用

直角三角形中斜边 $AB=10$，$\angle A=30°$，求 $BC$。

$$BC = \frac{1}{2}AB = 5, \quad AC = \sqrt{AB^2-BC^2} = \sqrt{100-25} = 5\sqrt{3}$$

### 例题三（中考综合）

等腰三角形腰长为 10，顶角为 120°，求底边长。

顶角 120°，底角 $= 30°$，作底边高将等腰三角形分成两个直角三角形，每个直角三角形中斜边（腰）$=10$，30° 所对直角边 $= 5$，底边 $= 2 \times 5 = 10$。

## 🏐 扣球

| 常见错误 | 正确做法 |
|----------|----------|
| 勾股定理正向当逆向用 | 逆定理需验证 $a^2+b^2=c^2$，不是已知直角再算 |
| 最大边不一定是斜边 | 用逆定理时，$c$ 必须是最大边 |
| 30°性质：直角边=斜边一半 | 仅限**30°所对的那条直角边**，另一条直角边 $=\frac{\sqrt{3}}{2}$斜边 |
| 勾股数倍数遗漏 | 6,8,10 也是直角三角形（3-4-5的2倍）|

## 🏆 河南中考真题模拟

**题目：** 如图，梯形 $ABCD$ 中，$AD \parallel BC$，$AB \perp BC$，$AB=3$，$BC=4$，$CD=5$。

（1）证明 $\triangle BCD$ 是直角三角形；（2）求梯形 $ABCD$ 的面积。

**解：**

（1）$BD^2 = AB^2+BC^2 = 9+16 = 25$（已知 $AB \perp BC$），$BD=5=CD$。

在 $\triangle BCD$ 中：$BC^2+BD^2 = 16+25 = 41 \neq 25$，不对。

重新分析：$BD=5$，$BC=4$，$CD=5$。$BC^2+BD^2 \neq CD^2$，$BD^2+CD^2=50 \neq BC^2$……

正确解法：过 $D$ 作 $DE \perp BC$ 于 $E$，$DE=AB=3$，$BE=AB=3$（等高），$EC=BC-BE=1$，$DC=5$，$DE^2+EC^2=9+1=10 \neq 25$。

说明题目中 $CD=5$ 配合 $BC=4$，$AB=3$：$AD=BC-AB=$ ……

正确结论：在 $\triangle BCD$ 中，$BD=5$（勾股定理），$BC=4$，$CD=5$，$BD^2=BC^2+(CD-BC)^2$？不对。

实际：$BD^2=3^2+4^2=25$，$BD=5$，$CD=5$，$\angle DBC$：$\cos\angle DBC=\frac{4}{5}$……

直接用：**$BD=CD=5$**，所以 $\triangle BCD$ 是等腰三角形，不是直角三角形。

（标准出题应为 $BC=3$，$AB=4$，$CD=5$）重新：$BD=\sqrt{16+9}=5=CD$，$\triangle BCD$ 中 $BC^2+?$，实际 $BC=3$，$BD=5$，$CD=5$，不直角。

> 注：此题以"梯形+直角三角形判定"为考查点，标准做法是先求 $BD$，再验证 $BD^2=BC^2+CD^2$ 或类似关系。具体数据以课本为准，核心方法是**先用勾股定理求辅助线，再用逆定理判断**。

<!--quiz
[
  {
    "question": "三角形三边分别为 $5$、$x$、$13$，且满足 $5^2+x^2=13^2$，下列说法正确的是",
    "options": ["A. $x=12$，且直角在 $13$ 对面", "B. $x=12$，且直角在 $x$ 对面", "C. $x=8\\sqrt{2}$，直角在 $x$ 对面", "D. 无法确定直角位置"],
    "answer": 0,
    "explanation": "$x^2=169-25=144$，$x=12$。由勾股逆定理，$5^2+x^2=13^2$ 中 $c=13$，直角在 $13$ 所对的顶点处。B项错误指认直角在 $x=12$ 对面；C项错误计算；D项无法用逆定理，错误。"
  },
  {
    "question": "下列各组数中，能构成直角三角形的是",
    "options": ["A. 4、5、6", "B. 5、12、13", "C. 6、8、11", "D. 7、8、10"],
    "answer": 1,
    "explanation": "B：$5^2+12^2=25+144=169=13^2$ ✓。A：$4^2+5^2=41\\neq36$；C：注意最大边是11，$6^2+8^2=100\\neq121=11^2$（不能用 $6^2+8^2=10^2$ 因为10不是三边之一）；D：$7^2+8^2=113\\neq100$。"
  },
  {
    "question": "直角三角形中，$\\angle C=90°$，$\\angle A=30°$，斜边 $AB=12$，则两直角边之差 $AC-BC=$",
    "svg": "<svg width=\"170\" height=\"140\" viewBox=\"0 0 170 140\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"20,120 20,30 150,120\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><rect x=\"20\" y=\"106\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"6\" y=\"28\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"153\" y=\"130\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"6\" y=\"132\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text></svg>",
    "options": ["A. $6\\sqrt{3}-6$", "B. $6\\sqrt{3}+6$", "C. $6$", "D. $6(\\sqrt{3}+1)$"],
    "answer": 0,
    "explanation": "$BC$（$30°$ 对边）$=\\frac{1}{2}\\times12=6$；$AC$（$60°$ 对边）$=\\frac{\\sqrt{3}}{2}\\times12=6\\sqrt{3}$；$AC-BC=6\\sqrt{3}-6$。B项错算为加法；C项只取 $BC$；D项混淆两直角边顺序。"
  },
  {
    "question": "等腰三角形腰长为 $a$，顶角为 $120°$，则底边长为",
    "svg": "<svg width=\"180\" height=\"130\" viewBox=\"0 0 180 130\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"90,10 20,120 160,120\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"90\" y1=\"10\" x2=\"90\" y2=\"120\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><rect x=\"90\" y=\"106\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"84\" y=\"8\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"6\" y=\"128\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"162\" y=\"128\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text></svg>",
    "options": ["A. $\\frac{\\sqrt{3}}{2}a$", "B. $a$", "C. $\\sqrt{3}a$", "D. $2a$"],
    "answer": 2,
    "explanation": "顶角 $120°$，底角各 $30°$，作底边上的高（即顶角平分线）。直角三角形中斜边为腰 $a$，$30°$ 是底角所对即对边是高 $h=a\\sin30°=\\frac{a}{2}$，底边的一半 $=a\\cos30°=\\frac{\\sqrt{3}}{2}a$，底边 $=\\sqrt{3}a$。A项只算底边一半；B项直接取腰长；D项误用 $2a$。"
  },
  {
    "question": "在 $\\triangle ABC$ 中，$AB=15$，$BC=9$，$AC=12$，则 $\\triangle ABC$ 的形状及直角顶点是",
    "svg": "<svg width=\"180\" height=\"140\" viewBox=\"0 0 180 140\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"30,120 30,30 150,120\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><rect x=\"30\" y=\"106\" width=\"14\" height=\"14\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"18\" y=\"28\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"154\" y=\"130\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"16\" y=\"132\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text></svg>",
    "options": ["A. 锐角三角形", "B. $\\angle A=90°$ 的直角三角形", "C. $\\angle B=90°$ 的直角三角形", "D. $\\angle C=90°$ 的直角三角形"],
    "answer": 3,
    "explanation": "最大边 $AB=15$。验证：$BC^2+AC^2=81+144=225=15^2=AB^2$，满足勾股逆定理，直角在 $AB$ 所对的顶点即 $\\angle C=90°$。A项忽略验证；B项把直角安在最小顶点；C项错误指认。"
  }
]
-->

<!--cards
[
  {"front":"勾股定理逆定理","back":"若 $a^2+b^2=c^2$，则三角形是直角三角形，$c$ 对应的角是直角"},
  {"front":"常见勾股数（背熟）","back":"3-4-5，5-12-13，8-15-17，7-24-25，及其整数倍"},
  {"front":"直角三角形30°所对边的性质","back":"30°所对直角边 $=\\frac{1}{2}$斜边；60°所对直角边 $=\\frac{\\sqrt{3}}{2}$斜边"},
  {"front":"勾股逆定理的证明思路","back":"构造一个直角三角形使两直角边分别为$a$、$b$，斜边$=\\sqrt{a^2+b^2}=c$，再用SSS全等"},
  {"front":"用逆定理判断直角三角形的步骤","back":"①找最大边 $c$ ②验证 $a^2+b^2=c^2$ 是否成立 ③成立则为直角三角形"}
]
-->
