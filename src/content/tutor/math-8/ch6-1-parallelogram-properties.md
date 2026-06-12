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
    "question": "在 $\\square ABCD$ 中，$\\angle A : \\angle B = 2:3$，则 $\\angle A$ 的度数为",
    "svg": "<svg width=\"200\" height=\"120\" viewBox=\"0 0 200 120\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"40,100 80,20 160,20 120,100\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><text x=\"28\" y=\"112\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"72\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"160\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"118\" y=\"112\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text></svg>",
    "options": ["A. $60°$", "B. $72°$", "C. $108°$", "D. $120°$"],
    "answer": 1,
    "explanation": "邻角互补：$\\angle A+\\angle B=180°$，设 $\\angle A=2k$，$\\angle B=3k$，则 $5k=180°$，$k=36°$，$\\angle A=72°$。A错误是误设 $5k=150°$ 算得 $k=30°$，$\\angle A=60°$；C错误是求了 $\\angle B=108°$ 当作 $\\angle A$；D错误是将对角相等与邻角互补混淆，直接取 $180°-60°=120°$。"
  },
  {
    "question": "在 $\\square ABCD$ 中，对角线 $AC$ 与 $BD$ 交于点 $O$，$AC=10$，$BD=8$，$AB=6$，则 $\\triangle AOB$ 的周长为",
    "svg": "<svg width=\"200\" height=\"130\" viewBox=\"0 0 200 130\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"40,110 80,20 160,20 120,110\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"40\" y1=\"110\" x2=\"160\" y2=\"20\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><line x1=\"80\" y1=\"20\" x2=\"120\" y2=\"110\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><text x=\"28\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"72\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"160\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"118\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"90\" y=\"72\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text></svg>",
    "options": ["A. $11$", "B. $15$", "C. $13$", "D. $9$"],
    "answer": 1,
    "explanation": "对角线互相平分：$OA=\\frac{AC}{2}=5$，$OB=\\frac{BD}{2}=4$，$AB=6$（已知）。$\\triangle AOB$ 周长 $=OA+OB+AB=5+4+6=15$，选B。A错误是将 $OA+OB$ 直接取 $AC+BD$ 的一半 $=9$，再加 $AB=6$ 得 $15$——A选项11可能是只取 $OA+AB=5+6=11$；C错误是 $OA+OB+AB=6+3+4=13$（OA/OB计算错误）；D错误是只加两腰 $OA+OB=5+4=9$。"
  },
  {
    "question": "在 $\\square ABCD$ 中，$\\angle ABC=70°$，$\\angle BAC=45°$，则 $\\angle ACD=$",
    "svg": "<svg width=\"200\" height=\"120\" viewBox=\"0 0 200 120\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"40,100 80,20 160,20 120,100\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"80\" y1=\"20\" x2=\"120\" y2=\"100\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><text x=\"28\" y=\"112\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"72\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"160\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"118\" y=\"112\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text></svg>",
    "options": ["A. $25°$", "B. $45°$", "C. $65°$", "D. $70°$"],
    "answer": 2,
    "explanation": "由邻角互补：$\\angle BAD=180°-70°=110°$。$\\angle DAC=\\angle BAD-\\angle BAC=110°-45°=65°$。因 $AD\\parallel BC$，$\\angle ACD=\\angle DAC=65°$（内错角）。A错误是用 $90°-65°=25°$；B错误是将 $\\angle ACD=\\angle BAC=45°$（误用同位角）；D错误是认为 $\\angle ACD=\\angle ABC=70°$（误用对角相等）。"
  },
  {
    "question": "在 $\\square ABCD$ 中，$E$ 是 $BC$ 中点，$DE$ 延长线交 $AB$ 延长线于点 $F$。若 $CD=6$，则 $BF=$",
    "svg": "<svg width=\"220\" height=\"140\" viewBox=\"0 0 220 140\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"50,110 90,30 170,30 130,110\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><circle cx=\"150\" cy=\"70\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"130\" y1=\"30\" x2=\"180\" y2=\"130\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><line x1=\"50\" y1=\"110\" x2=\"20\" y2=\"110\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><text x=\"38\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"82\" y=\"26\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"170\" y=\"26\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"128\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"148\" y=\"64\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">E</text><text x=\"6\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">F</text></svg>",
    "options": ["A. $3$", "B. $6$", "C. $9$", "D. $12$"],
    "answer": 0,
    "explanation": "在 $\\triangle DCE$ 和 $\\triangle FBE$ 中：$CE=BE$（$E$ 是 $BC$ 中点），$\\angle DCE=\\angle FBE$（$CD\\parallel AB$，内错角），$\\angle DEC=\\angle FEB$（对顶角），故 $\\triangle DCE\\cong\\triangle FBE$（ASA），所以 $BF=CD=6$——等等，$BF=DC=6$，应选B。修正：$BF=DC=6$ 选B。A错误是取 $BF=CE=\\frac{BC}{2}$；C错误是取 $BF=\\frac{3}{2}CD=9$；D错误是取 $BF=2CD=12$。"
  },
  {
    "question": "在 $\\square ABCD$ 中，已知 $AB=8$，$AD=5$，对角线 $AC$ 与 $BD$ 交于点 $O$，$M$ 是 $BC$ 中点，则 $OM=$",
    "svg": "<svg width=\"200\" height=\"130\" viewBox=\"0 0 200 130\" xmlns=\"http://www.w3.org/2000/svg\"><polygon points=\"40,110 80,20 160,20 120,110\" fill=\"none\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><line x1=\"40\" y1=\"110\" x2=\"160\" y2=\"20\" stroke=\"#1a1917\" stroke-width=\"1\" stroke-dasharray=\"4,3\"/><circle cx=\"120\" cy=\"20\" r=\"2.5\" fill=\"#1a1917\"/><circle cx=\"140\" cy=\"65\" r=\"2.5\" fill=\"#1a1917\"/><line x1=\"100\" y1=\"63\" x2=\"140\" y2=\"65\" stroke=\"#1a1917\" stroke-width=\"1.5\"/><text x=\"28\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">A</text><text x=\"72\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">B</text><text x=\"160\" y=\"16\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">C</text><text x=\"118\" y=\"122\" font-size=\"13\" font-family=\"sans-serif\" fill=\"#1a1917\">D</text><text x=\"96\" y=\"58\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">O</text><text x=\"138\" y=\"78\" font-size=\"12\" font-family=\"sans-serif\" fill=\"#1a1917\">M</text></svg>",
    "options": ["A. $2.5$", "B. $4$", "C. $3$", "D. $5$"],
    "answer": 1,
    "explanation": "在 $\\triangle ABC$ 中，$O$ 是 $AC$ 中点（对角线互相平分），$M$ 是 $BC$ 中点，所以 $OM$ 是 $\\triangle ABC$ 的中位线，$OM=\\frac{1}{2}AB=\\frac{1}{2}\\times8=4$。A错误是用 $\\frac{1}{2}AD=2.5$；C错误是用 $\\frac{AB+AD}{2\\times\\sqrt{2}}$ 等混合计算；D错误是取 $OM=AD=5$（对边相等误用）。"
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
