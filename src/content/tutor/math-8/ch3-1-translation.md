---
title: "图形的平移"
subject: "math"
grade: "8"
semester: "上"
chapter: 3
lesson: 1
description: "理解平移的定义与性质，掌握坐标系中的平移作图方法"
estimatedMinutes: 15
tags: ["平移", "变换", "图形运动", "坐标"]
---

## 🏐 热身

上午训练，教练说："全队向前移动3步，保持队形！"

大家齐刷刷往前走——**每个人走的方向和距离完全相同**，队形一点没乱！

这就是数学里的**平移**。图形整体沿某方向移动后，形状、大小、方向……全都不变，只是**位置变了**。

## 🏐 发球

### 平移的定义

把一个图形沿某个方向移动一定的距离，这种图形运动叫做**平移**（Translation）。

两个要素：**方向** + **距离**

### 平移的性质

| 性质 | 说明 |
|------|------|
| **形状大小不变** | 平移后与原图全等 |
| **对应线段平行且相等** | $AA' \parallel BB'$ 且 $AA' = BB'$ |
| **对应点连线平行且相等** | 所有对应点移动方向和距离相同 |

### 坐标系中的平移

将点 $(x, y)$：

| 操作 | 结果 |
|------|------|
| 向右移 $a$ | $(x+a,\ y)$ |
| 向左移 $a$ | $(x-a,\ y)$ |
| 向上移 $b$ | $(x,\ y+b)$ |
| 向下移 $b$ | $(x,\ y-b)$ |

> 💡 口诀：**右上加，左下减**

### 例题1（坐标平移）

点 $A(2, -3)$ 向右移动4个单位，再向上移动5个单位，得到 $A'$ 的坐标？

$$A' = (2+4,\ -3+5) = (6,\ 2)$$

### 例题2（平移作图）

$\triangle ABC$：$A(1,1)$，$B(3,1)$，$C(2,3)$，向左2个单位，向下1个单位，求 $\triangle A'B'C'$。

每个顶点 $x-2$，$y-1$：
- $A(1,1) \to A'(-1, 0)$
- $B(3,1) \to B'(1, 0)$
- $C(2,3) \to C'(0, 2)$

<img src="/tutor/math-8/ch3-translation-example.svg" alt="三角形平移示意图" style="max-width:300px;width:100%;display:block;margin:1rem 0;" />

### 例题3（平移距离计算）

$A(0,0)$，$A'(3,4)$，平移距离是多少？

$$AA' = \sqrt{(3-0)^2 + (4-0)^2} = \sqrt{9+16} = 5$$

## 🏐 扣球

### ❌ 易错区

| 错误 | 正确 |
|------|------|
| "向左移3" 写成 $x+3$ | 向左是 $x-3$，**右上加，左下减** |
| 只移动部分顶点 | 所有顶点必须相同方向、相同距离 |
| 认为平移只能水平/竖直 | 平移可沿任意方向 |

> 💡 **检验方法**：连接所有对应点，若平行且相等，则平移正确！

<!--quiz
[
  {
    "question": "点 $P(2,-1)$ 先向右移动 $3$ 个单位，再向下移动 $4$ 个单位，得 $P'$ 的坐标为",
    "options": [
      "A. $(5,3)$",
      "B. $(5,-5)$",
      "C. $(-1,-5)$",
      "D. $(-1,3)$"
    ],
    "answer": 1,
    "explanation": "向右3：$x$ 变为 $2+3=5$；向下4：$y$ 变为 $-1-4=-5$。$P'=(5,-5)$，选B。干扰项A(5,3)向下误算为 $y+4$（向上方向搞反）；C(-1,-5)向右误算为 $x-3$（方向搞反）；D(-1,3)两个方向都搞反。"
  },
  {
    "question": "$\\triangle ABC$ 平移后得 $\\triangle A'B'C'$，已知 $A(1,2)$，$A'(-2,5)$，则 $B(3,-1)$ 平移后的坐标 $B'$ 为",
    "options": [
      "A. $(0,2)$",
      "B. $(0,-4)$",
      "C. $(6,2)$",
      "D. $(-1,2)$"
    ],
    "answer": 0,
    "explanation": "平移向量：$x$ 方向 $-2-1=-3$（向左3），$y$ 方向 $5-2=3$（向上3）。$B'=(3-3,-1+3)=(0,2)$，选A。干扰项B(0,-4)向上方向搞反算成向下3；C(6,2)向左方向搞反算成向右3；D(-1,2)$x$ 方向只移了2。",
    "svg": "<svg width=\"225\" height=\"205\" viewBox=\"0 0 225 205\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"10\" y1=\"115\" x2=\"215\" y2=\"115\" stroke=\"#1a1917\" stroke-width=\"1\"/><line x1=\"90\" y1=\"195\" x2=\"90\" y2=\"10\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"216\" y=\"119\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">x</text><text x=\"93\" y=\"10\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">y</text><text x=\"78\" y=\"127\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><polygon points=\"112,71 156,137 134,49\" fill=\"#fef3c7\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><polygon points=\"46,5 90,71 68,27\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/><line x1=\"112\" y1=\"71\" x2=\"46\" y2=\"5\" stroke=\"#aaa\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/><line x1=\"156\" y1=\"137\" x2=\"90\" y2=\"71\" stroke=\"#aaa\" stroke-width=\"1\" stroke-dasharray=\"3,2\"/><text x=\"115\" y=\"67\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#1a1917\">A(1,2)</text><text x=\"159\" y=\"150\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#1a1917\">B(3,-1)</text><text x=\"2\" y=\"1\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#2563eb\">A'(-2,5)</text><text x=\"93\" y=\"67\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#2563eb\">B'(0,2)</text></svg>"
  },
  {
    "question": "平行四边形 $ABCD$ 中，$A(0,0)$，$B(4,0)$，$C(5,2)$，$D(1,2)$。将该图形向右移动 $3$ 个单位，则 $C'$ 的坐标是",
    "options": [
      "A. $(2,2)$",
      "B. $(8,2)$",
      "C. $(5,5)$",
      "D. $(8,5)$"
    ],
    "answer": 1,
    "explanation": "向右移3，$x$ 坐标加3，$y$ 不变。$C(5,2)\\to C'=(5+3,2)=(8,2)$，选B。干扰项A(2,2)是 $x$ 减了3（向左）；C(5,5)是 $y$ 加了3（向上非向右）；D(8,5)是 $x$ 和 $y$ 都加了3（混淆方向）。",
    "svg": "<svg width=\"240\" height=\"175\" viewBox=\"0 0 240 175\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"10\" y1=\"135\" x2=\"235\" y2=\"135\" stroke=\"#1a1917\" stroke-width=\"1\"/><line x1=\"22\" y1=\"165\" x2=\"22\" y2=\"15\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"236\" y=\"139\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">x</text><text x=\"25\" y=\"13\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">y</text><text x=\"10\" y=\"147\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><polygon points=\"22,135 118,135 142,87 46,87\" fill=\"#fef3c7\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><polygon points=\"94,135 190,135 214,87 118,87\" fill=\"#dbeafe\" stroke=\"#2563eb\" stroke-width=\"1.5\" stroke-dasharray=\"5,3\"/><circle cx=\"142\" cy=\"87\" r=\"3.5\" fill=\"#e11d48\"/><circle cx=\"214\" cy=\"87\" r=\"3.5\" fill=\"#2563eb\"/><text x=\"146\" y=\"82\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#e11d48\">C(5,2)</text><text x=\"218\" y=\"82\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#2563eb\">C'(8,2)</text><text x=\"19\" y=\"149\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#555\">A</text><text x=\"120\" y=\"149\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#555\">B</text><text x=\"33\" y=\"91\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#555\">D</text></svg>"
  },
  {
    "question": "$\\triangle ABC$ 经两次平移：先向右移 $2$，再向上移 $3$，最终得 $\\triangle A'B'C'$，若 $A'(5,4)$，则原点 $A$ 的坐标为",
    "options": [
      "A. $(7,7)$",
      "B. $(7,1)$",
      "C. $(3,7)$",
      "D. $(3,1)$"
    ],
    "answer": 3,
    "explanation": "逆推：$A'$ 是由 $A$ 向右2向上3得到的，所以 $A=A'$ 向左2向下3：$A=(5-2,4-3)=(3,1)$，选B。干扰项A(7,7)误加：$(5+2,4+3)$（正向加）；C(3,7)$x$ 减2正确但 $y$ 加3（方向搞反）；D(7,1)$x$ 加2方向搞反但 $y$ 减3正确。"
  },
  {
    "question": "矩形顶点坐标为 $A(1,1)$，$B(4,1)$，$C(4,3)$，$D(1,3)$。将矩形向左移 $1$ 个单位、向上移 $1$ 个单位后，移动后图形与原图形重叠部分的面积为",
    "options": [
      "A. $0$",
      "B. $2$",
      "C. $4$",
      "D. $6$"
    ],
    "answer": 2,
    "explanation": "原矩形：$x\\in[1,4]$（宽3），$y\\in[1,3]$（高2）。向左1后，$x\\in[0,3]$，与原 $x\\in[1,4]$ 重叠区间 $[1,3]$，宽2。向上1后，$y\\in[2,4]$，与原 $y\\in[1,3]$ 重叠区间 $[2,3]$，高1。重叠面积 $=2\\times2=4$，选C。干扰项A(0)误以为完全不重叠；B(2)只算了 $x$ 方向重叠宽2或 $y$ 方向高1，计算了其中一维；D(6)是原矩形完整面积 $3\\times2=6$（完全重叠时才是）。",
    "svg": "<svg width=\"220\" height=\"195\" viewBox=\"0 0 220 195\" xmlns=\"http://www.w3.org/2000/svg\"><line x1=\"10\" y1=\"145\" x2=\"215\" y2=\"145\" stroke=\"#1a1917\" stroke-width=\"1\"/><line x1=\"28\" y1=\"178\" x2=\"28\" y2=\"10\" stroke=\"#1a1917\" stroke-width=\"1\"/><text x=\"216\" y=\"149\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">x</text><text x=\"31\" y=\"10\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">y</text><text x=\"14\" y=\"157\" font-size=\"11\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><rect x=\"60\" y=\"49\" width=\"96\" height=\"64\" fill=\"#fef3c7\" fill-opacity=\"0.8\" stroke=\"#d97706\" stroke-width=\"2\"/><rect x=\"28\" y=\"17\" width=\"96\" height=\"64\" fill=\"#dbeafe\" fill-opacity=\"0.7\" stroke=\"#2563eb\" stroke-width=\"2\" stroke-dasharray=\"5,3\"/><rect x=\"60\" y=\"49\" width=\"64\" height=\"32\" fill=\"#bbf7d0\" fill-opacity=\"0.9\" stroke=\"#16a34a\" stroke-width=\"1.5\"/><text x=\"65\" y=\"85\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#15803d\">重叠=4</text><text x=\"62\" y=\"45\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#d97706\">原矩形</text><text x=\"30\" y=\"13\" font-size=\"10\" font-family=\"sans-serif\" fill=\"#2563eb\">移后</text></svg>"
  }
]

-->

<!--cards
[
  { "front": "平移的两个要素", "back": "**方向** 和 **距离**。平移时每个点沿相同方向移动相同距离" },
  { "front": "坐标平移口诀", "back": "右上加，左下减。向右移 $a$：$x+a$；向左移 $a$：$x-a$；向上移 $b$：$y+b$；向下移 $b$：$y-b$" },
  { "front": "平移后对应点连线的特征", "back": "对应点连线**平行且相等**（同向）。即 $AA' \\parallel BB'$ 且 $AA' = BB'$" },
  { "front": "平移不改变什么？", "back": "只改变位置，不改变：形状、大小（面积/周长）、各线段的方向" },
  { "front": "$A(2,-1)$，$A'(-1,3)$，平移方向和距离？", "back": "向左3，向上4。平移距离 $=\\sqrt{3^2+4^2}=5$" }
]
-->
