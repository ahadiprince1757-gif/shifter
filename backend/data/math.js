/* =========================================================
   MATH DATA FILE - STANDARDIZED SCHEMA
========================================================= */
add(
  "math",
  "numbers",
  "Number Systems",

  `<h2>Number Systems</h2>
<hr>

<h3>DEEP NOTES</h3>

<h4>1. What Is a Number System?</h4>
<p>
A number system is a way of classifying numbers according to their properties.
Different types of numbers form groups, and some groups are contained inside others.
</p>

<p>
The main number types we use here are:
</p>

<ul>
<li><b>Natural Numbers</b></li>
<li><b>Whole Numbers</b></li>
<li><b>Integers</b></li>
</ul>

<hr>

<h4>2. Natural Numbers</h4>

<p>
Natural numbers are the positive counting numbers:
</p>

<pre>
1, 2, 3, 4, 5, 6, ...
</pre>

<p>
They are used when counting from 1 upward.
In this classification, <b>0 is not a natural number</b>.
</p>

<p><b>Examples:</b></p>

<pre>
1, 7, 25, 100
</pre>

<p>
are natural numbers.
</p>

<p>
Numbers such as <b>-3</b>, <b>0</b>, and <b>1/2</b> are not natural numbers.
</p>

<hr>

<h4>3. Whole Numbers</h4>

<p>
Whole numbers are the natural numbers together with zero.
</p>

<pre>
0, 1, 2, 3, 4, 5, ...
</pre>

<p>
The important difference is that <b>whole numbers include 0</b>.
</p>

<p><b>Examples:</b></p>

<pre>
0, 4, 15, 200
</pre>

<hr>

<h4>4. Integers</h4>

<p>
Integers include negative numbers, zero, and positive numbers.
</p>

<pre>
..., -4, -3, -2, -1, 0, 1, 2, 3, 4, ...
</pre>

<p>
Integers do not include fractions or decimals such as
<code>1/2</code> or <code>2.5</code>.
</p>

<p>
The symbol for the set of integers is <b>ℤ</b>.
</p>

<hr>

<h4>5. How the Number Sets Are Related</h4>

<p>
The number sets build upon one another:
</p>

<pre>
Natural Numbers ⊂ Whole Numbers ⊂ Integers
</pre>

<p>
This means every natural number is a whole number, and every whole number is an integer.
</p>

<p><b>For example:</b></p>

<pre>
5 → Natural → Whole → Integer
0 → Whole → Integer
-5 → Integer
</pre>

<p>
However, the reverse is not always true.
For example, <b>-5</b> is an integer but is not a whole number.
</p>

<hr>

<h4>6. Positive, Negative and Zero</h4>

<p>
Numbers greater than zero are <b>positive</b>.
Numbers less than zero are <b>negative</b>.
Zero is <b>neither positive nor negative</b>.
</p>

<pre>
Positive:  1, 2, 3, 4, ...
Zero:      0
Negative: -1, -2, -3, -4, ...
</pre>

<hr>

<h4>7. Comparing Integers</h4>

<p>
When comparing integers, a number farther to the right on the number line is greater.
</p>

<pre>
-5  -4  -3  -2  -1   0   1   2   3   4   5
</pre>

<p>
Therefore:
</p>

<pre>
5 > 2
2 > -1
-1 > -4
-4 > -7
</pre>

<p>
A common mistake is thinking that <b>-7 is greater than -3</b> because 7 is greater than 3.
For negative numbers, the number closer to zero is greater.
</p>

<hr>

<h4>8. Basic Operations with Integers</h4>

<p>
Integers can be added, subtracted, multiplied, and divided.
</p>

<h5>Addition</h5>

<pre>
5 + 3 = 8
-5 + 3 = -2
-5 + (-3) = -8
</pre>

<h5>Subtraction</h5>

<pre>
7 - 4 = 3
4 - 7 = -3
-3 - 2 = -5
</pre>

<h5>Multiplication</h5>

<pre>
4 × 3 = 12
-4 × 3 = -12
-4 × -3 = 12
</pre>

<h5>Division</h5>

<pre>
12 ÷ 3 = 4
-12 ÷ 3 = -4
-12 ÷ -3 = 4
</pre>

<hr>

<h4>9. Sign Rules for Multiplication and Division</h4>

<p>
When multiplying or dividing integers:
</p>

<pre>
Positive × Positive = Positive
Negative × Negative = Positive
Positive × Negative = Negative
Negative × Positive = Negative
</pre>

<p>
The same sign rule applies to division.
</p>

<hr>

<h4>10. Key Ideas to Remember</h4>

<ul>
<li>Natural numbers start at 1.</li>
<li>Whole numbers include 0.</li>
<li>Integers include negative numbers, 0, and positive numbers.</li>
<li>0 is neither positive nor negative.</li>
<li>Every natural number is a whole number.</li>
<li>Every whole number is an integer.</li>
<li>Negative numbers closer to zero are greater.</li>
<li>For multiplication and division, two equal signs give a positive result and two different signs give a negative result.</li>
</ul>
`,

  [
    {
      "q": "Which of the following is a natural number: -3, 0, 4, or 1/2?",
      "hint": "Natural numbers start at 1.",
      "steps": [
        "Step 1: Natural numbers are 1, 2, 3, 4, ...",
        "Step 2: -3 is negative.",
        "Step 3: 0 is not included in this classification.",
        "Step 4: 1/2 is a fraction.",
        "Step 5: 4 belongs to the natural numbers."
      ],
      "ans": "4",
      "why": "Natural numbers are positive counting numbers beginning with 1."
    },
    {
      "q": "Is 0 a natural number, whole number, or integer?",
      "hint": "Remember which sets include zero.",
      "steps": [
        "Step 1: 0 is not a natural number in this classification.",
        "Step 2: Whole numbers include 0.",
        "Step 3: Integers also include 0."
      ],
      "ans": "Whole number and integer",
      "why": "Whole numbers include 0, and integers include negative numbers, zero, and positive numbers."
    },
    {
      "q": "Which type of number is -8?",
      "hint": "Look at its sign.",
      "steps": [
        "Step 1: -8 is less than zero.",
        "Step 2: Negative numbers are not natural or whole numbers.",
        "Step 3: Negative whole-number values belong to the integers."
      ],
      "ans": "Integer",
      "why": "-8 belongs to the set of integers because integers include negative whole-number values."
    },
    {
      "q": "Which is greater: -3 or -7?",
      "hint": "Think about their positions on the number line.",
      "steps": [
        "Step 1: Locate -3 and -7 on the number line.",
        "Step 2: -3 is to the right of -7.",
        "Step 3: A number farther right is greater."
      ],
      "ans": "-3",
      "why": "-3 is closer to zero and is therefore greater than -7."
    },
    {
      "q": "Arrange these integers from smallest to largest: 3, -2, 0, -5, 1.",
      "hint": "Start with the most negative number.",
      "steps": [
        "Step 1: The smallest number is -5.",
        "Step 2: Next is -2.",
        "Step 3: Then comes 0.",
        "Step 4: Then 1.",
        "Step 5: Finally, 3."
      ],
      "ans": "-5, -2, 0, 1, 3",
      "why": "Numbers increase as we move from left to right on the number line."
    },
    {
      "q": "Calculate: -6 + 4",
      "hint": "Start at -6 and move 4 units to the right.",
      "steps": [
        "Step 1: Start with -6.",
        "Step 2: Add 4.",
        "Step 3: -6 + 4 = -2."
      ],
      "ans": "-2",
      "why": "Adding 4 to -6 moves four units toward zero, giving -2."
    },
    {
      "q": "Calculate: 5 - 9",
      "hint": "Subtracting a larger number from a smaller number gives a negative result.",
      "steps": [
        "Step 1: Start with 5.",
        "Step 2: Subtract 9.",
        "Step 3: 5 - 9 = -4."
      ],
      "ans": "-4",
      "why": "5 is 4 less than 9, so 5 - 9 = -4."
    },
    {
      "q": "Calculate: -4 × -3",
      "hint": "Look at the signs.",
      "steps": [
        "Step 1: The numbers have the same sign.",
        "Step 2: Negative × Negative gives Positive.",
        "Step 3: 4 × 3 = 12."
      ],
      "ans": "12",
      "why": "Two negative signs produce a positive result, and 4 × 3 = 12."
    },
    {
      "q": "Calculate: -20 ÷ 5",
      "hint": "Look at the signs before dividing.",
      "steps": [
        "Step 1: Negative ÷ Positive gives Negative.",
        "Step 2: 20 ÷ 5 = 4.",
        "Step 3: Therefore, -20 ÷ 5 = -4."
      ],
      "ans": "-4",
      "why": "Different signs give a negative result, and 20 ÷ 5 = 4."
    },
    {
      "q": "Which statement is correct?",
      "hint": "Think about how the number sets are contained.",
      "steps": [
        "Step 1: Natural numbers are contained in whole numbers.",
        "Step 2: Whole numbers are contained in integers.",
        "Step 3: Therefore, Natural Numbers ⊂ Whole Numbers ⊂ Integers."
      ],
      "ans": "Every natural number is a whole number, and every whole number is an integer.",
      "why": "The natural-number set is contained inside the whole-number set, which is contained inside the integers."
    }
  ]
);
add(
  "math",
  "numbers",
  "BODMAS / Order of Operations",

  `<h2>BODMAS / Order of Operations</h2>
<hr>

<h3>DEEP NOTES</h3>

<h4>1. Why Do We Need an Order?</h4>

<p>
When an expression contains more than one operation, we need a fixed order for performing the operations.
Otherwise, different people could get different answers from the same expression.
</p>

<p>
For example:
</p>

<pre>
6 + 2 × 3
</pre>

<p>
We do not simply calculate from left to right.
Multiplication must be performed before addition.
</p>

<pre>
6 + 2 × 3
= 6 + 6
= 12
</pre>

<hr>

<h4>2. What Does BODMAS Mean?</h4>

<pre>
B → Brackets
O → Orders
D → Division
M → Multiplication
A → Addition
S → Subtraction
</pre>

<p>
BODMAS tells us the priority of operations.
</p>

<p>
The order is:
</p>

<ol>
<li><b>Brackets</b></li>
<li><b>Orders</b> such as powers and roots</li>
<li><b>Division and Multiplication</b></li>
<li><b>Addition and Subtraction</b></li>
</ol>

<hr>

<h4>3. Brackets</h4>

<p>
Operations inside brackets are completed before operations outside the brackets.
</p>

<pre>
(5 + 3) × 2
</pre>

<p>
First calculate the brackets:
</p>

<pre>
(5 + 3) × 2
= 8 × 2
= 16
</pre>

<hr>

<h4>4. Orders</h4>

<p>
Orders include powers, squares, cubes, and roots.
They are performed after brackets and before multiplication, division, addition, or subtraction.
</p>

<p><b>Example:</b></p>

<pre>
3 + 2²
</pre>

<p>
First calculate the order:
</p>

<pre>
2² = 4
</pre>

<p>
Then add:
</p>

<pre>
3 + 4 = 7
</pre>

<hr>

<h4>5. Division and Multiplication</h4>

<p>
Division and multiplication have the <b>same priority</b>.
If both appear in an expression, work from <b>left to right</b>.
</p>

<p><b>Example:</b></p>

<pre>
24 ÷ 3 × 2
</pre>

<p>
Work from left to right:
</p>

<pre>
24 ÷ 3 = 8
8 × 2 = 16
</pre>

<p>
Therefore:
</p>

<pre>
24 ÷ 3 × 2 = 16
</pre>

<p>
Do not automatically perform multiplication before division.
They have equal priority.
</p>

<hr>

<h4>6. Addition and Subtraction</h4>

<p>
Addition and subtraction also have the <b>same priority</b>.
When both appear together, work from <b>left to right</b>.
</p>

<p><b>Example:</b></p>

<pre>
15 - 6 + 2
</pre>

<pre>
15 - 6 = 9
9 + 2 = 11
</pre>

<p>
Therefore:
</p>

<pre>
15 - 6 + 2 = 11
</pre>

<hr>

<h4>7. A Complete BODMAS Example</h4>

<p>Consider:</p>

<pre>
8 + 2 × (5 - 3)²
</pre>

<p><b>Step 1: Brackets</b></p>

<pre>
(5 - 3) = 2
</pre>

<p>So:</p>

<pre>
8 + 2 × 2²
</pre>

<p><b>Step 2: Orders</b></p>

<pre>
2² = 4
</pre>

<p>So:</p>

<pre>
8 + 2 × 4
</pre>

<p><b>Step 3: Multiplication</b></p>

<pre>
2 × 4 = 8
</pre>

<p>So:</p>

<pre>
8 + 8
</pre>

<p><b>Step 4: Addition</b></p>

<pre>
8 + 8 = 16
</pre>

<p>
Therefore:
</p>

<pre>
8 + 2 × (5 - 3)² = 16
</pre>

<hr>

<h4>8. Nested Brackets</h4>

<p>
When brackets appear inside other brackets, solve the innermost brackets first.
</p>

<p><b>Example:</b></p>

<pre>
2 × [3 + (4 - 1)]
</pre>

<p>
First solve the inner bracket:
</p>

<pre>
4 - 1 = 3
</pre>

<p>
Then:
</p>

<pre>
2 × [3 + 3]
= 2 × 6
= 12
</pre>

<hr>

<h4>9. The Left-to-Right Rule</h4>

<p>
BODMAS does not mean that multiplication is always done before division.
It also does not mean that addition is always done before subtraction.
</p>

<p>
Operations with the same priority are performed from <b>left to right</b>.
</p>

<pre>
Division ↔ Multiplication
Addition ↔ Subtraction
</pre>

<p><b>Example:</b></p>

<pre>
18 ÷ 3 × 2
</pre>

<p>
Left to right:
</p>

<pre>
18 ÷ 3 = 6
6 × 2 = 12
</pre>

<p>
Therefore:
</p>

<pre>
18 ÷ 3 × 2 = 12
</pre>

<hr>

<h4>10. Common Mistakes</h4>

<ul>
<li>Doing everything from left to right without considering priority.</li>
<li>Adding before multiplying.</li>
<li>Multiplying before division even when division appears first.</li>
<li>Adding before subtraction even when subtraction appears first.</li>
<li>Ignoring brackets.</li>
<li>Forgetting to calculate powers before multiplication.</li>
</ul>

<hr>

<h4>11. Key Idea</h4>

<p>
BODMAS is a method for deciding <b>which operation comes next</b>.
It does not change the operations themselves.
</p>

<p>
Remember:
</p>

<pre>
Brackets
↓
Orders
↓
Division / Multiplication (left to right)
↓
Addition / Subtraction (left to right)
</pre>
`,

  [
    {
      "q": "Solve: 6 + 2 × 3",
      "hint": "Multiplication comes before addition.",
      "steps": [
        "Step 1: Identify multiplication and addition.",
        "Step 2: Calculate 2 × 3 = 6.",
        "Step 3: Calculate 6 + 6 = 12."
      ],
      "ans": "12",
      "why": "Multiplication has priority over addition, so 2 × 3 is calculated first."
    },
    {
      "q": "Solve: 20 - 12 ÷ 3",
      "hint": "Division comes before subtraction.",
      "steps": [
        "Step 1: Calculate 12 ÷ 3 = 4.",
        "Step 2: Calculate 20 - 4 = 16."
      ],
      "ans": "16",
      "why": "Division is performed before subtraction."
    },
    {
      "q": "Solve: (7 + 5) × 2",
      "hint": "Start with the brackets.",
      "steps": [
        "Step 1: Calculate 7 + 5 = 12.",
        "Step 2: Calculate 12 × 2 = 24."
      ],
      "ans": "24",
      "why": "Brackets are calculated before multiplication."
    },
    {
      "q": "Solve: 3 + 2²",
      "hint": "Calculate the order before addition.",
      "steps": [
        "Step 1: Calculate 2² = 4.",
        "Step 2: Calculate 3 + 4 = 7."
      ],
      "ans": "7",
      "why": "Orders such as powers are calculated before addition."
    },
    {
      "q": "Solve: 24 ÷ 3 × 2",
      "hint": "Division and multiplication have equal priority. Work left to right.",
      "steps": [
        "Step 1: Start from the left: 24 ÷ 3 = 8.",
        "Step 2: Continue left to right: 8 × 2 = 16."
      ],
      "ans": "16",
      "why": "Division and multiplication have equal priority, so they are evaluated from left to right."
    },
    {
      "q": "Solve: 15 - 6 + 2",
      "hint": "Addition and subtraction have equal priority.",
      "steps": [
        "Step 1: Start from the left: 15 - 6 = 9.",
        "Step 2: Continue left to right: 9 + 2 = 11."
      ],
      "ans": "11",
      "why": "Addition and subtraction have equal priority, so they are evaluated from left to right."
    },
    {
      "q": "Solve: 8 + 2 × (5 - 3)²",
      "hint": "Follow the order: brackets, orders, multiplication, addition.",
      "steps": [
        "Step 1: (5 - 3) = 2.",
        "Step 2: 2² = 4.",
        "Step 3: 2 × 4 = 8.",
        "Step 4: 8 + 8 = 16."
      ],
      "ans": "16",
      "why": "The expression follows BODMAS: brackets, orders, multiplication, then addition."
    },
    {
      "q": "Solve: 2 × [3 + (4 - 1)]",
      "hint": "Solve the innermost brackets first.",
      "steps": [
        "Step 1: 4 - 1 = 3.",
        "Step 2: 3 + 3 = 6.",
        "Step 3: 2 × 6 = 12."
      ],
      "ans": "12",
      "why": "Nested brackets are solved from the innermost bracket outward."
    },
    {
      "q": "A student solves 10 + 4 × 2 as (10 + 4) × 2. What did the student do wrong?",
      "hint": "Check which operation should be performed first.",
      "steps": [
        "Step 1: Multiplication has priority over addition.",
        "Step 2: Calculate 4 × 2 = 8.",
        "Step 3: Calculate 10 + 8 = 18."
      ],
      "ans": "The student added before multiplying.",
      "why": "The multiplication must be performed before the addition, so the correct answer is 18."
    },
    {
      "q": "Solve: 18 ÷ 3 × 2",
      "hint": "Do not automatically multiply first.",
      "steps": [
        "Step 1: Division and multiplication have equal priority.",
        "Step 2: Work from left to right: 18 ÷ 3 = 6.",
        "Step 3: 6 × 2 = 12."
      ],
      "ans": "12",
      "why": "Division and multiplication have equal priority and are evaluated from left to right."
    }
  ]
);
add(
  "math",
  "complex_numbers",
  "Imaginary Unit and Basic Complex Numbers",

  `
<h2>Imaginary Unit and Basic Complex Numbers</h2>

<h3>DEEP NOTES</h3>

<h4>1. The Imaginary Unit</h4>

<p>
The imaginary unit is represented by the letter <b>i</b>.
It is defined by the rule:
</p>

<pre>
i² = -1
</pre>

<p>
This means that <b>i</b> is a number whose square is -1.
We also write:
</p>

<pre>
i = √(-1)
</pre>

<p>
The important rule to remember is:
</p>

<pre>
i² = -1
</pre>

<p>
Do not treat <b>i</b> as an ordinary variable. It is a special number defined by this property.
</p>

<hr>

<h4>2. What Is a Complex Number?</h4>

<p>
A complex number has the form:
</p>

<pre>
z = a + bi
</pre>

<p>
where <b>a</b> and <b>b</b> are real numbers and <b>i² = -1</b>.
</p>

<p>
The number has two parts:
</p>

<pre>
z = a + bi
    ↓   ↓
  real imaginary
  part   part
</pre>

<p>
<b>a</b> is called the <b>real part</b>.
</p>

<p>
<b>b</b> is called the <b>imaginary coefficient</b>.
The complete term <b>bi</b> is the imaginary part.
</p>

<p>
For example:
</p>

<pre>
z = 5 + 3i
</pre>

<p>
Real part = <b>5</b>
</p>

<p>
Imaginary part = <b>3i</b>
</p>

<p>
Imaginary coefficient = <b>3</b>
</p>

<hr>

<h4>3. Purely Real and Purely Imaginary Numbers</h4>

<p>
A complex number does not always have to contain both parts.
</p>

<p>
If the imaginary part is zero, the number is purely real.
</p>

<pre>
5 + 0i = 5
</pre>

<p>
If the real part is zero, the number is purely imaginary.
</p>

<pre>
0 + 4i = 4i
</pre>

<p>
Therefore:
</p>

<ul>
<li><b>5</b> is a real number and can also be written as a complex number.</li>
<li><b>4i</b> is a purely imaginary number.</li>
<li><b>5 + 4i</b> has both a real and an imaginary part.</li>
</ul>

<hr>

<h4>4. Simplifying Powers of i</h4>

<p>
Because <b>i² = -1</b>, higher powers of i can be simplified.
</p>

<pre>
i¹ = i

i² = -1

i³ = i² × i
   = -1 × i
   = -i

i⁴ = i² × i²
   = (-1)(-1)
   = 1
</pre>

<p>
After <b>i⁴ = 1</b>, the pattern repeats:
</p>

<pre>
i, -1, -i, 1, i, -1, -i, 1, ...
</pre>

<p>
This repeating pattern makes higher powers of <b>i</b> easier to simplify.
</p>

<hr>

<h4>5. Identifying the Parts of a Complex Number</h4>

<p>
For a complex number:
</p>

<pre>
z = a + bi
</pre>

<p>
remember:
</p>

<pre>
Real part = a
Imaginary part = bi
Imaginary coefficient = b
</pre>

<p>
For example:
</p>

<pre>
z = -7 + 2i
</pre>

<p>
Real part = <b>-7</b>
</p>

<p>
Imaginary part = <b>2i</b>
</p>

<p>
Imaginary coefficient = <b>2</b>
</p>

<hr>

<h4>6. Key Ideas</h4>

<ul>
<li><b>i² = -1</b> is the fundamental rule.</li>
<li>A complex number is written as <b>a + bi</b>.</li>
<li><b>a</b> is the real part.</li>
<li><b>bi</b> is the imaginary part.</li>
<li>The coefficient of <b>i</b> is the imaginary coefficient.</li>
<li>A number can be purely real, purely imaginary, or contain both parts.</li>
<li>Powers of <b>i</b> repeat in a cycle of four.</li>
</ul>
`,

  [
    {
      "q": "What is i² equal to?",
      "hint": "Use the definition of the imaginary unit.",
      "steps": [
        "Step 1: The imaginary unit is defined by i = √(-1).",
        "Step 2: Squaring gives i² = -1."
      ],
      "ans": "-1",
      "why": "The defining property of the imaginary unit is i² = -1."
    },
    {
      "q": "What is the real part of 7 + 4i?",
      "hint": "Look at the number without i.",
      "steps": [
        "Step 1: Compare 7 + 4i with a + bi.",
        "Step 2: The value of a is 7."
      ],
      "ans": "7",
      "why": "In a + bi, a is the real part."
    },
    {
      "q": "What is the imaginary part of 7 + 4i?",
      "hint": "Look for the term containing i.",
      "steps": [
        "Step 1: The term containing i is 4i.",
        "Step 2: Therefore, the imaginary part is 4i."
      ],
      "ans": "4i",
      "why": "The imaginary part is the complete term containing i."
    },
    {
      "q": "What is the imaginary coefficient of -3 + 8i?",
      "hint": "Find the number multiplying i.",
      "steps": [
        "Step 1: Identify the imaginary term: 8i.",
        "Step 2: The coefficient of i is 8."
      ],
      "ans": "8",
      "why": "The coefficient is the number multiplying i."
    },
    {
      "q": "Simplify i³.",
      "hint": "Use i² = -1.",
      "steps": [
        "Step 1: i³ = i² × i.",
        "Step 2: Replace i² with -1.",
        "Step 3: -1 × i = -i."
      ],
      "ans": "-i",
      "why": "i³ = i² × i = -1 × i = -i."
    },
    {
      "q": "Simplify i⁴.",
      "hint": "Use i² twice.",
      "steps": [
        "Step 1: i⁴ = i² × i².",
        "Step 2: Replace each i² with -1.",
        "Step 3: (-1)(-1) = 1."
      ],
      "ans": "1",
      "why": "i⁴ = i² × i² = (-1)(-1) = 1."
    },
    {
      "q": "Is 6i a real number, purely imaginary number, or a complex number with both parts?",
      "hint": "Look at its real part.",
      "steps": [
        "Step 1: Write 6i as 0 + 6i.",
        "Step 2: Its real part is 0.",
        "Step 3: Therefore, it is purely imaginary."
      ],
      "ans": "Purely imaginary number",
      "why": "6i has no real part, so it is purely imaginary."
    },
    {
      "q": "Write 9 as a complex number in the form a + bi.",
      "hint": "A real number can have an imaginary part of zero.",
      "steps": [
        "Step 1: Write 9 as 9 + 0i.",
        "Step 2: Therefore a = 9 and b = 0."
      ],
      "ans": "9 + 0i",
      "why": "Every real number can be written as a complex number with zero imaginary part."
    }
  ]
);


add(
  "math",
  "complex_numbers",
  "Argand Diagram",

  `
<h2>Argand Diagram</h2>

<h3>DEEP NOTES</h3>

<h4>1. What Is an Argand Diagram?</h4>

<p>
An Argand diagram is a coordinate plane used to represent complex numbers.
Instead of writing a complex number only as <b>a + bi</b>, we can represent it as a point.
</p>

<p>
For:
</p>

<pre>
z = a + bi
</pre>

<p>
the corresponding point is:
</p>

<pre>
(a, b)
</pre>

<p>
The real part gives the horizontal coordinate.
The imaginary coefficient gives the vertical coordinate.
</p>

<hr>

<h4>2. The Two Axes</h4>

<pre>
Horizontal axis → Real axis
Vertical axis   → Imaginary axis
</pre>

<p>
The horizontal axis represents the real part.
</p>

<p>
The vertical axis represents the coefficient of the imaginary part.
</p>

<p>
Therefore:
</p>

<pre>
a + bi → (a, b)
</pre>

<p>
Notice that the coordinate uses <b>b</b>, not <b>bi</b>.
</p>

<hr>

<h4>3. Plotting a Complex Number</h4>

<p>
Consider:
</p>

<pre>
z = 3 + 4i
</pre>

<p>
First identify the two parts:
</p>

<pre>
Real part = 3
Imaginary coefficient = 4
</pre>

<p>
Therefore the coordinate is:
</p>

<pre>
(3, 4)
</pre>

<p>
To locate the point, move 3 units along the real axis and 4 units along the imaginary axis.
</p>

<hr>

<h4>4. Negative Coordinates</h4>

<p>
The signs of the real and imaginary parts determine the position of the point.
</p>

<p>
For example:
</p>

<pre>
z = -3 + 2i
</pre>

<p>
The coordinate is:
</p>

<pre>
(-3, 2)
</pre>

<p>
The negative real part places the point to the left of the origin.
The positive imaginary coefficient places it above the real axis.
</p>

<p>
Another example:
</p>

<pre>
z = 4 - 5i
</pre>

<p>
The coordinate is:
</p>

<pre>
(4, -5)
</pre>

<p>
The positive real part places the point to the right.
The negative imaginary coefficient places it below the real axis.
</p>

<hr>

<h4>5. The Origin</h4>

<p>
The complex number:
</p>

<pre>
0 + 0i
</pre>

<p>
corresponds to:
</p>

<pre>
(0, 0)
</pre>

<p>
This is the origin of the Argand diagram.
</p>

<hr>

<h4>6. The Four Regions</h4>

<p>
The signs of the real and imaginary parts determine which region contains the point.
</p>

<pre>
(+,+) → upper right
(-,+) → upper left
(-,-) → lower left
(+,-) → lower right
</pre>

<p>
For example:
</p>

<pre>
2 + 3i  → (2,3)   → upper right

-2 + 3i → (-2,3)  → upper left

-2 - 3i → (-2,-3) → lower left

2 - 3i  → (2,-3)  → lower right
</pre>

<hr>

<h4>7. Key Rule</h4>

<p>
Whenever you are asked to represent:
</p>

<pre>
z = a + bi
</pre>

<p>
simply convert it to:
</p>

<pre>
(a, b)
</pre>

<p>
Then remember:
</p>

<pre>
a → horizontal / real axis
b → vertical / imaginary axis
</pre>
`,

  [
    {
      "q": "Which axis represents the real part?",
      "hint": "Think horizontally.",
      "steps": [
        "Step 1: The real part is a in a + bi.",
        "Step 2: a is plotted horizontally."
      ],
      "ans": "Horizontal axis",
      "why": "The real part is represented on the horizontal axis."
    },
    {
      "q": "Which axis represents the imaginary part?",
      "hint": "Think vertically.",
      "steps": [
        "Step 1: The imaginary coefficient is b in a + bi.",
        "Step 2: b is plotted vertically."
      ],
      "ans": "Vertical axis",
      "why": "The imaginary coefficient is represented on the vertical axis."
    },
    {
      "q": "What point represents z = 2 + 5i?",
      "hint": "Use a + bi → (a,b).",
      "steps": [
        "Step 1: a = 2.",
        "Step 2: b = 5.",
        "Step 3: Therefore the point is (2,5)."
      ],
      "ans": "(2, 5)",
      "why": "A complex number a + bi corresponds to the point (a,b)."
    },
    {
      "q": "What point represents z = -3 + 2i?",
      "hint": "Keep the negative sign.",
      "steps": [
        "Step 1: Real part = -3.",
        "Step 2: Imaginary coefficient = 2.",
        "Step 3: Therefore the point is (-3,2)."
      ],
      "ans": "(-3, 2)",
      "why": "The real part gives the first coordinate and the imaginary coefficient gives the second."
    },
    {
      "q": "What point represents z = 4 - 6i?",
      "hint": "The coefficient of i is -6.",
      "steps": [
        "Step 1: Real part = 4.",
        "Step 2: Imaginary coefficient = -6.",
        "Step 3: Therefore the point is (4,-6)."
      ],
      "ans": "(4, -6)",
      "why": "The minus sign belongs to the imaginary coefficient, giving the second coordinate as -6."
    },
    {
      "q": "Which complex number corresponds to the point (-2, 5)?",
      "hint": "First coordinate is the real part.",
      "steps": [
        "Step 1: The first coordinate gives a = -2.",
        "Step 2: The second coordinate gives b = 5.",
        "Step 3: Write a + bi = -2 + 5i."
      ],
      "ans": "-2 + 5i",
      "why": "The point (a,b) corresponds to the complex number a + bi."
    },
    {
      "q": "In which region is the point (-4,-2)?",
      "hint": "Check the signs of both coordinates.",
      "steps": [
        "Step 1: The real coordinate is negative.",
        "Step 2: The imaginary coordinate is negative.",
        "Step 3: Both negative coordinates place the point in the lower-left region."
      ],
      "ans": "Lower-left region",
      "why": "A point with negative real and negative imaginary coordinates lies in the lower-left region."
    }
  ]
);


add(
  "math",
  "complex_numbers",
  "Operations on Complex Numbers",

  `
<h2>Operations on Complex Numbers</h2>

<h3>DEEP NOTES</h3>

<h4>1. Adding Complex Numbers</h4>

<p>
To add complex numbers, add the real parts together and add the imaginary parts together.
</p>

<p>
For:
</p>

<pre>
(a + bi) + (c + di)
</pre>

<p>
the result is:
</p>

<pre>
(a + c) + (b + d)i
</pre>

<p><b>Example:</b></p>

<pre>
(3 + 2i) + (4 + 5i)

= (3 + 4) + (2 + 5)i

= 7 + 7i
</pre>

<p>
Only like terms are combined:
real terms with real terms, and imaginary terms with imaginary terms.
</p>

<hr>

<h4>2. Subtracting Complex Numbers</h4>

<p>
Subtraction follows the same idea.
Subtract the real parts and subtract the imaginary parts.
</p>

<pre>
(a + bi) - (c + di)
= (a - c) + (b - d)i
</pre>

<p><b>Example:</b></p>

<pre>
(7 + 5i) - (2 + 3i)

= (7 - 2) + (5 - 3)i

= 5 + 2i
</pre>

<hr>

<h4>3. Multiplying Complex Numbers</h4>

<p>
When multiplying complex numbers, use the distributive law.
FOIL can also be used when both numbers have two terms.
</p>

<p>
Consider:
</p>

<pre>
(a + bi)(c + di)
</pre>

<p>
Expand:
</p>

<pre>
ac + adi + bci + bdi²
</pre>

<p>
Now use:
</p>

<pre>
i² = -1
</pre>

<p>
Therefore:
</p>

<pre>
ac + adi + bci - bd
</pre>

<p>
Group the real and imaginary terms:
</p>

<pre>
(ac - bd) + (ad + bc)i
</pre>

<hr>

<h4>4. Multiplication Example</h4>

<p>
Simplify:
</p>

<pre>
(2 + i)(3 + 4i)
</pre>

<p><b>Step 1: Expand.</b></p>

<pre>
2(3) + 2(4i) + i(3) + i(4i)
</pre>

<p>
This gives:
</p>

<pre>
6 + 8i + 3i + 4i²
</pre>

<p><b>Step 2: Replace i² with -1.</b></p>

<pre>
6 + 8i + 3i - 4
</pre>

<p><b>Step 3: Combine like terms.</b></p>

<pre>
(6 - 4) + (8i + 3i)

= 2 + 11i
</pre>

<hr>

<h4>5. The Main Rule for Operations</h4>

<ul>
<li><b>Addition:</b> combine like terms.</li>
<li><b>Subtraction:</b> combine like terms with the correct signs.</li>
<li><b>Multiplication:</b> expand first, then replace i² with -1.</li>
</ul>

<p>
The most important thing during multiplication is not to leave <b>i²</b> in the final answer.
Always simplify it using:
</p>

<pre>
i² = -1
</pre>

<hr>

<h4>6. Standard Form</h4>

<p>
The final answer should normally be written in the form:
</p>

<pre>
a + bi
</pre>

<p>
For example:
</p>

<pre>
3 + 7i
-4 + 2i
5 - 6i
</pre>

<p>
Keep the real part and imaginary part together in this standard form.
</p>
`,

  [
    {
      "q": "Simplify: (3 + 2i) + (4 + 5i)",
      "hint": "Add real parts and imaginary parts separately.",
      "steps": [
        "Step 1: Add real parts: 3 + 4 = 7.",
        "Step 2: Add imaginary parts: 2i + 5i = 7i.",
        "Step 3: Combine: 7 + 7i."
      ],
      "ans": "7 + 7i",
      "why": "Like terms are combined separately: real with real and imaginary with imaginary."
    },
    {
      "q": "Simplify: (7 + 5i) - (2 + 3i)",
      "hint": "Subtract corresponding parts.",
      "steps": [
        "Step 1: 7 - 2 = 5.",
        "Step 2: 5i - 3i = 2i.",
        "Step 3: Combine: 5 + 2i."
      ],
      "ans": "5 + 2i",
      "why": "Subtract the real parts and imaginary parts separately."
    },
    {
      "q": "Simplify: 4i + 7i",
      "hint": "Treat i as the common factor.",
      "steps": [
        "Step 1: Add the coefficients: 4 + 7 = 11.",
        "Step 2: Keep i."
      ],
      "ans": "11i",
      "why": "4i and 7i are like terms, so their coefficients are added."
    },
    {
      "q": "Simplify: (1 + i)(1 + i)",
      "hint": "Expand and use i² = -1.",
      "steps": [
        "Step 1: Expand: 1 + i + i + i².",
        "Step 2: Replace i² with -1.",
        "Step 3: 1 + 2i - 1 = 2i."
      ],
      "ans": "2i",
      "why": "(1+i)² = 1 + 2i + i² = 1 + 2i - 1 = 2i."
    },
    {
      "q": "Simplify: (2 + i)(3 + 4i)",
      "hint": "Expand first, then replace i².",
      "steps": [
        "Step 1: Expand: 6 + 8i + 3i + 4i².",
        "Step 2: Replace i² with -1: 6 + 8i + 3i - 4.",
        "Step 3: Combine real parts: 6 - 4 = 2.",
        "Step 4: Combine imaginary parts: 8i + 3i = 11i."
      ],
      "ans": "2 + 11i",
      "why": "Expansion followed by i² = -1 gives 2 + 11i."
    },
    {
      "q": "Simplify: (5 + 3i) + (-2 + 4i)",
      "hint": "Be careful with the negative real number.",
      "steps": [
        "Step 1: Add real parts: 5 + (-2) = 3.",
        "Step 2: Add imaginary parts: 3i + 4i = 7i.",
        "Step 3: Combine: 3 + 7i."
      ],
      "ans": "3 + 7i",
      "why": "The real and imaginary parts are added separately."
    },
    {
      "q": "Why must i² be replaced with -1 during multiplication?",
      "hint": "Use the definition of i.",
      "steps": [
        "Step 1: By definition, i² = -1.",
        "Step 2: Therefore any i² produced during multiplication can be replaced by -1.",
        "Step 3: This allows the expression to be simplified into standard form."
      ],
      "ans": "Because i² = -1",
      "why": "The identity i² = -1 is the fundamental rule used to simplify products of complex numbers."
    },
    {
      "q": "Simplify: (4 - 2i) - (1 + 3i)",
      "hint": "Distribute the subtraction carefully.",
      "steps": [
        "Step 1: 4 - 2i - 1 - 3i.",
        "Step 2: Combine real parts: 4 - 1 = 3.",
        "Step 3: Combine imaginary parts: -2i - 3i = -5i.",
        "Step 4: Result = 3 - 5i."
      ],
      "ans": "3 - 5i",
      "why": "Subtracting the second complex number changes the signs of both its real and imaginary parts."
    }
  ]
);


add(
  "math",
  "complex_numbers",
  "Polar Form and De Moivre's Theorem",

  `
<h2>Polar Form and De Moivre's Theorem</h2>

<h3>DEEP NOTES</h3>

<h4>1. Polar Form</h4>

<p>
A complex number can be written in two main ways.
</p>

<p><b>Cartesian form:</b></p>

<pre>
z = a + bi
</pre>

<p><b>Polar form:</b></p>

<pre>
z = r(cosθ + i sinθ)
</pre>

<p>
In polar form:
</p>

<ul>
<li><b>r</b> is the modulus or magnitude of the complex number.</li>
<li><b>θ</b> is the argument, or angle measured from the positive real axis.</li>
</ul>

<hr>

<h4>2. Finding the Modulus</h4>

<p>
For:
</p>

<pre>
z = a + bi
</pre>

<p>
the modulus is:
</p>

<pre>
r = √(a² + b²)
</pre>

<p>
This comes from the Pythagorean theorem applied to the real and imaginary components.
</p>

<p><b>Example:</b></p>

<pre>
z = 3 + 4i

r = √(3² + 4²)
  = √(9 + 16)
  = √25
  = 5
</pre>

<hr>

<h4>3. Finding the Argument</h4>

<p>
The argument is the angle θ made by the complex number with the positive real axis.
</p>

<p>
When the position is in the appropriate quadrant:
</p>

<pre>
tanθ = b/a
</pre>

<p>
so:
</p>

<pre>
θ = tan⁻¹(b/a)
</pre>

<p>
The signs of <b>a</b> and <b>b</b> must be considered when determining the correct quadrant.
</p>

<hr>

<h4>4. Example of Polar Form</h4>

<p>
Convert:
</p>

<pre>
z = 3 + 4i
</pre>

<p><b>Step 1: Find r.</b></p>

<pre>
r = √(3² + 4²)
  = 5
</pre>

<p><b>Step 2: Find θ.</b></p>

<pre>
θ = tan⁻¹(4/3)
</pre>

<p>
Therefore:
</p>

<pre>
z = 5(cosθ + i sinθ)
</pre>

<p>
where:
</p>

<pre>
θ = tan⁻¹(4/3)
</pre>

<hr>

<h4>5. De Moivre's Theorem</h4>

<p>
De Moivre's theorem provides a quick way to raise a complex number in polar form to a power.
</p>

<p>
For a complex number of the form:
</p>

<pre>
z = r(cosθ + i sinθ)
</pre>

<p>
the theorem states:
</p>

<pre>
zⁿ = rⁿ[cos(nθ) + i sin(nθ)]
</pre>

<p>
There are two changes:
</p>

<ul>
<li>The modulus <b>r</b> is raised to the power <b>n</b>.</li>
<li>The angle <b>θ</b> is multiplied by <b>n</b>.</li>
</ul>

<hr>

<h4>6. De Moivre Example</h4>

<p>
Evaluate:
</p>

<pre>
(cos30° + i sin30°)²
</pre>

<p>
Here:
</p>

<pre>
r = 1
θ = 30°
n = 2
</pre>

<p>
Using De Moivre's theorem:
</p>

<pre>
= cos(2 × 30°) + i sin(2 × 30°)

= cos60° + i sin60°
</pre>

<p>
Using the exact trigonometric values:
</p>

<pre>
= 1/2 + i√3/2
</pre>

<hr>

<h4>7. Key Pattern</h4>

<p>
For:
</p>

<pre>
z = r(cosθ + i sinθ)
</pre>

<p>
raising z to the power n gives:
</p>

<pre>
zⁿ = rⁿ(cos nθ + i sin nθ)
</pre>

<p>
So remember:
</p>

<pre>
Power n
   ↓
r → rⁿ
θ → nθ
</pre>

<p>
This is the central idea of De Moivre's theorem.
</p>
`,

  [
    {
      "q": "What does r represent in polar form?",
      "hint": "It measures the size of the complex number.",
      "steps": [
        "Step 1: In z = r(cosθ + i sinθ), r is the modulus.",
        "Step 2: The modulus is the magnitude of z."
      ],
      "ans": "Modulus",
      "why": "r represents the modulus or magnitude of the complex number."
    },
    {
      "q": "What does θ represent in polar form?",
      "hint": "Think about direction.",
      "steps": [
        "Step 1: θ is measured from the positive real axis.",
        "Step 2: Therefore θ represents the argument of the complex number."
      ],
      "ans": "Argument",
      "why": "The argument is the angle made by the complex number with the positive real axis."
    },
    {
      "q": "Find the modulus of z = 3 + 4i.",
      "hint": "Use r = √(a² + b²).",
      "steps": [
        "Step 1: a = 3 and b = 4.",
        "Step 2: r = √(3² + 4²).",
        "Step 3: r = √25 = 5."
      ],
      "ans": "5",
      "why": "The modulus is √(a²+b²), so √(3²+4²) = 5."
    },
    {
      "q": "What is the polar form of z = 3 + 4i if θ = tan⁻¹(4/3)?",
      "hint": "Use z = r(cosθ + i sinθ).",
      "steps": [
        "Step 1: The modulus is r = 5.",
        "Step 2: θ = tan⁻¹(4/3).",
        "Step 3: Substitute into the polar formula."
      ],
      "ans": "5(cosθ + i sinθ), where θ = tan⁻¹(4/3)",
      "why": "Polar form is z = r(cosθ+i sinθ), with r = 5 and θ = tan⁻¹(4/3)."
    },
    {
      "q": "State De Moivre's theorem.",
      "hint": "Think about a complex number raised to n.",
      "steps": [
        "Step 1: Start with z = r(cosθ + i sinθ).",
        "Step 2: Raise both sides to power n.",
        "Step 3: Apply De Moivre's theorem."
      ],
      "ans": "zⁿ = rⁿ[cos(nθ) + i sin(nθ)]",
      "why": "De Moivre's theorem raises the modulus to n and multiplies the argument by n."
    },
    {
      "q": "Evaluate (cos45° + i sin45°)².",
      "hint": "Multiply the angle by 2.",
      "steps": [
        "Step 1: 2 × 45° = 90°.",
        "Step 2: cos90° = 0.",
        "Step 3: sin90° = 1.",
        "Step 4: Therefore the result is i."
      ],
      "ans": "i",
      "why": "De Moivre's theorem gives cos90° + i sin90° = i."
    },
    {
      "q": "Evaluate (cos60° + i sin60°)³.",
      "hint": "Multiply 60° by 3.",
      "steps": [
        "Step 1: 3 × 60° = 180°.",
        "Step 2: cos180° = -1.",
        "Step 3: sin180° = 0.",
        "Step 4: Therefore the result is -1."
      ],
      "ans": "-1",
      "why": "De Moivre's theorem gives cos180° + i sin180° = -1."
    },
    {
      "q": "When z = r(cosθ + i sinθ) is raised to power n, what happens to r?",
      "hint": "Look at the modulus in De Moivre's theorem.",
      "steps": [
        "Step 1: De Moivre's theorem gives zⁿ = rⁿ[cos(nθ) + i sin(nθ)].",
        "Step 2: Therefore the modulus changes from r to rⁿ."
      ],
      "ans": "It becomes rⁿ",
      "why": "The modulus is raised to the same power as the complex number."
    },
    {
      "q": "When z = r(cosθ + i sinθ) is raised to power n, what happens to θ?",
      "hint": "Look inside cos and sin.",
      "steps": [
        "Step 1: De Moivre's theorem gives cos(nθ) and sin(nθ).",
        "Step 2: Therefore the angle becomes nθ."
      ],
      "ans": "It is multiplied by n",
      "why": "De Moivre's theorem changes θ to nθ."
    }
  ]
);
add(
  "math",
  "algebra",
  "Algebraic expressions",

  `<h2> Algebraic Expressions</h2>

<p>Algebra uses letters (variables) to represent unknown numbers and helps describe mathematical relationships.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li><b>Variable:</b> A letter (x, y, a) representing an unknown value</li>
<li><b>Constant:</b> A fixed number (e.g. 3, 7, 10)</li>
<li><b>Coefficient:</b> Number multiplying a variable (e.g. 2 in 2x)</li>
<li><b>Expression:</b> Combination of numbers, variables, and operations (+, −, ×, ÷)</li>
<li><b>Important:</b> Expressions do NOT contain an equals sign (=)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Expression = mathematical phrase (no equals sign)
Equation = mathematical sentence (has equals sign)
</pre>
<h3> EXAMPLE BREAKDOWN</h3>
<p>In 2x + 3:</p>
<ul>
<li>2 → coefficient</li>
<li>x → variable</li>
<li>3 → constant</li>
</ul>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Confusing expression with equation</li>
<li> Adding unlike terms incorrectly</li>
<li> Forgetting substitution rules</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Evaluate 2x + 3 when x = 4<br>
Step 1: Substitute → 2(4) + 3<br>
Step 2: Multiply → 8 + 3<br>
Step 3: Add → 11<br>
<b>Answer: 11</b>
</li>
<li>
<b>Example 2:</b> Identify parts of 5y − 7<br>
Step 1: y is variable<br>
Step 2: 5 is coefficient<br>
Step 3: 7 is constant<br>
<b>Answer: Algebraic expression</b>
</li>
<li>
<b>Example 3:</b> Translate “3 more than a number x”<br>
Step 1: number x → x<br>
Step 2: 3 more → +3<br>
<b>Answer: x + 3</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
Expression: 2x + 3
→ x = unknown value
→ 2x = scaled unknown
→ +3 = constant shift
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Finance → calculating unknown costs</li>
<li> Data science → modeling relationships</li>
<li> Programming → symbolic computation</li>
<li> Engineering → formula representation</li>
<li> Shopping → pricing formulas</li>
</ul>
`,

  [
    {
      "q": "Evaluate 3x + 5 when x = 2",
      "hint": "substitute first",
      "steps": [
        "Step 1: Replace x with 2 → 3(2) + 5",
        "Step 2: Multiply → 6 + 5",
        "Step 3: = 11"
      ],
      "ans": "11",
      "why": "Substitution must be done before simplifying"
    },
    {
      "q": "Simplify 2x + 3x",
      "hint": "like terms",
      "steps": [
        "Step 1: 2x + 3x",
        "Step 2: (2 + 3)x",
        "Step 3: = 5x"
      ],
      "ans": "5x",
      "why": "Only like terms can be combined"
    },
    {
      "q": "Identify: 4y + 7",
      "hint": "expression parts",
      "steps": [
        "Step 1: Contains variable y",
        "Step 2: Contains constant 7",
        "Step 3: No equals sign"
      ],
      "ans": "Algebraic expression",
      "why": "It has variables and constants but no equation"
    },
    {
      "q": "Translate: ‘5 less than a number x’",
      "hint": "subtract 5",
      "steps": [
        "Step 1: number x → x",
        "Step 2: 5 less → −5",
        "Step 3: x − 5"
      ],
      "ans": "x - 5",
      "why": "Word phrases convert into algebraic expressions"
    }
  ]
);

add(
  "math",
  "algebra",
  "Simplifying expressions",

  `<h2> Simplifying Expressions</h2>

<p>Simplifying expressions means rewriting them in a shorter and clearer form by combining like terms.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li><b>Like terms:</b> Terms with same variable and exponent (e.g., 2x and 5x)</li>
<li><b>Unlike terms:</b> Different variables (e.g., x and y) cannot be combined</li>
<li>Only coefficients (numbers in front) are added or subtracted</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Combine only like terms:
2x + 3x = 5x
</pre>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Mixing unlike terms (x + y ≠ xy)</li>
<li> Changing variables instead of coefficients</li>
<li> Forgetting to keep remaining terms</li>
</ul>
<h3> STRATEGY</h3>
<ul>
<li>Step 1: Group like terms</li>
<li>Step 2: Add or subtract coefficients</li>
<li>Step 3: Keep unlike terms unchanged</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 2x + 3x<br>
Step 1: Like terms → 2x + 3x<br>
Step 2: Add coefficients → 5x<br>
<b>Answer: 5x</b>
</li>
<li>
<b>Example 2:</b> 4a − 2a<br>
Step 1: Same variable (a)<br>
Step 2: 4 − 2 = 2<br>
<b>Answer: 2a</b>
</li>
<li>
<b>Example 3:</b> x + y + x<br>
Step 1: Group x terms → x + x = 2x<br>
Step 2: Keep y<br>
<b>Answer: 2x + y</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
3x + 4x + y
↓ group like terms
(3x + 4x) + y
↓ simplify
7x + y
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Finance → combining costs or income sources</li>
<li> Data analysis → grouping categories</li>
<li> Programming → simplifying expressions in logic</li>
<li> Engineering → combining measurement terms</li>
<li> Business → aggregating sales or profits</li>
</ul>
`,

  [
    {
      "q": "Simplify 3x + 4x + 2",
      "hint": "group like terms",
      "steps": [
        "Step 1: 3x + 4x = 7x",
        "Step 2: +2 remains unchanged",
        "Step 3: 7x + 2"
      ],
      "ans": "7x + 2",
      "why": "Only like terms can be combined"
    },
    {
      "q": "Simplify 6a - 2a",
      "hint": "subtract coefficients",
      "steps": [
        "Step 1: 6a − 2a",
        "Step 2: (6 − 2)a = 4a"
      ],
      "ans": "4a",
      "why": "Same variable means combine coefficients"
    },
    {
      "q": "Simplify 2x + 3y + 5x",
      "hint": "group x terms",
      "steps": [
        "Step 1: (2x + 5x) + 3y",
        "Step 2: 7x + 3y"
      ],
      "ans": "7x + 3y",
      "why": "Like terms grouped together"
    },
    {
      "q": "Simplify x + 2x + y + 3y",
      "hint": "group both variables",
      "steps": [
        "Step 1: (x + 2x) + (y + 3y)",
        "Step 2: 3x + 4y"
      ],
      "ans": "3x + 4y",
      "why": "Combine each variable separately"
    }
  ]
);

add(
  "math",
  "algebra",
  "Linear equations",

  `<h2> Linear Equations</h2>
<p>A linear equation is a mathematical statement that contains an equals sign and can be solved to find the value of a variable.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>An equation always has an equals sign (=)</li>
<li>The goal is to isolate the variable (usually x)</li>
<li><b>Golden rule:</b> Whatever you do to one side, do to the other side</li>
<li>Use inverse operations: + ↔ −, × ↔ ÷</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Keep both sides of the equation balanced at all times
</pre>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Moving terms without changing both sides</li>
<li> Wrong operation (adding instead of subtracting)</li>
<li> Forgetting to divide after multiplication</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> x + 3 = 7<br>
Step 1: Subtract 3 from both sides → x = 7 − 3<br>
Step 2: x = 4<br>
<b>Answer: 4</b>
</li>
<li>
<b>Example 2:</b> 2x = 8<br>
Step 1: Divide both sides by 2<br>
Step 2: x = 4<br>
<b>Answer: 4</b>
</li>
<li>
<b>Example 3:</b> 3x + 2 = 11<br>
Step 1: Subtract 2 → 3x = 9<br>
Step 2: Divide by 3 → x = 3<br>
<b>Answer: 3</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
3x + 2 = 11
   ↓ subtract 2
3x = 9
   ↓ divide by 3
x = 3
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Budget calculations → finding unknown costs</li>
<li> Data modeling → solving unknown variables</li>
<li> Engineering → balancing equations in design</li>
<li> Programming → solving logical conditions</li>
<li> Shopping → calculating discounts and totals</li>
</ul>
`,

  [
    {
      "q": "Solve x + 5 = 12",
      "hint": "inverse operation",
      "steps": [
        "Step 1: Subtract 5 from both sides",
        "Step 2: x = 12 − 5",
        "Step 3: x = 7"
      ],
      "ans": "7",
      "why": "Maintain balance by doing same operation on both sides"
    },
    {
      "q": "Solve 2x = 10",
      "hint": "divide both sides",
      "steps": [
        "Step 1: Divide both sides by 2",
        "Step 2: x = 5"
      ],
      "ans": "5",
      "why": "Inverse of multiplication is division"
    },
    {
      "q": "Solve 3x + 2 = 11",
      "hint": "remove constant first",
      "steps": [
        "Step 1: 3x = 11 − 2",
        "Step 2: 3x = 9",
        "Step 3: x = 3"
      ],
      "ans": "3",
      "why": "Isolate variable step by step"
    },
    {
      "q": "Solve 4x − 6 = 10",
      "hint": "add 6 first",
      "steps": [
        "Step 1: 4x = 10 + 6",
        "Step 2: 4x = 16",
        "Step 3: x = 4"
      ],
      "ans": "4",
      "why": "Move constants using inverse operations"
    }
  ]
);

add(
  "math",
  "algebra",
  "Substitution",

  `<h2> Substitution</h2>
<p>Substitution means replacing a variable (like x or y) with a given numerical value and then simplifying the expression.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Substitution = replacing letters with numbers</li>
<li>Always replace ALL occurrences of the variable</li>
<li>Follow order of operations: multiplication before addition/subtraction</li>
<li>Be careful with brackets after substitution</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Variable → Number → Simplify expression
</pre>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Forgetting to replace all variables</li>
<li> Ignoring multiplication rules</li>
<li> Wrong order of operations</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> If x = 2, find x + 3<br>
Step 1: Substitute → 2 + 3<br>
Step 2: Simplify → 5<br>
<b>Answer: 5</b>
</li>
<li>
<b>Example 2:</b> If x = 4, find 2x<br>
Step 1: Substitute → 2 × 4<br>
Step 2: Multiply → 8<br>
<b>Answer: 8</b>
</li>
<li>
<b>Example 3:</b> If x = 1, y = 2, find x + y<br>
Step 1: Substitute → 1 + 2<br>
Step 2: Simplify → 3<br>
<b>Answer: 3</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
Expression: 2x + 3
If x = 5:
→ 2(5) + 3
→ 10 + 3
→ 13
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Finance → calculating costs and profits</li>
<li> Data analysis → replacing variables with values</li>
<li> Programming → evaluating expressions</li>
<li> Engineering → formula calculations</li>
<li> Business → forecasting outcomes</li>
</ul>
`,

  [
    {
      "q": "If x = 3, find x + 4",
      "hint": "replace x first",
      "steps": [
        "Step 1: Substitute x = 3",
        "Step 2: 3 + 4",
        "Step 3: = 7"
      ],
      "ans": "7",
      "why": "Substitution replaces variables with numbers"
    },
    {
      "q": "If x = 2, find 2x + 1",
      "hint": "multiply first",
      "steps": [
        "Step 1: Substitute → 2(2) + 1",
        "Step 2: Multiply → 4 + 1",
        "Step 3: = 5"
      ],
      "ans": "5",
      "why": "Follow multiplication before addition"
    },
    {
      "q": "If x = 4, y = 3, find x + y",
      "hint": "replace both variables",
      "steps": [
        "Step 1: Substitute → 4 + 3",
        "Step 2: Simplify",
        "Step 3: = 7"
      ],
      "ans": "7",
      "why": "Both variables must be replaced"
    },
    {
      "q": "If x = 5, find 3x − 2",
      "hint": "multiply then subtract",
      "steps": [
        "Step 1: 3 × 5 = 15",
        "Step 2: 15 − 2",
        "Step 3: = 13"
      ],
      "ans": "13",
      "why": "Substitution followed by order of operations"
    }
  ]
);

add(
  "math",
  "algebra",
  "Expanding brackets",

  `<h2> Expanding Brackets</h2>

<p>Expanding brackets means multiplying the term outside the bracket with every term inside using the distributive law.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Expanding uses the <b>distributive law</b>: a(b + c) = ab + ac</li>
<li>Multiply the outside term by EVERY term inside the bracket</li>
<li>Be careful with signs (+ and −)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
a(b + c) = ab + ac
Multiply everything inside the bracket
</pre>
<h3> COMMON MISTAKE</h3>
<ul>
<li> Only multiplying the first term</li>
<li> Forgetting signs</li>
<li> Skipping a term inside the bracket</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 2(x + 3)<br>
Step 1: 2 × x = 2x<br>
Step 2: 2 × 3 = 6<br>
<b>Answer: 2x + 6</b>
</li>
<li>
<b>Example 2:</b> 3(a + 4)<br>
Step 1: 3 × a = 3a<br>
Step 2: 3 × 4 = 12<br>
<b>Answer: 3a + 12</b>
</li>
<li>
<b>Example 3:</b> 5(x + 2)<br>
Step 1: 5 × x = 5x<br>
Step 2: 5 × 2 = 10<br>
<b>Answer: 5x + 10</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
2(x + 3)
= 2×x + 2×3
= 2x + 6
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Budget calculations (multiplying costs)</li>
<li> Engineering formulas</li>
<li> Data scaling in statistics</li>
<li> Programming logic expansion</li>
<li> Resource distribution problems</li>
</ul>
`,

  [
    {
      "q": "Expand 2(x + 3)",
      "hint": "multiply each term",
      "steps": [
        "Step 1: 2 × x = 2x",
        "Step 2: 2 × 3 = 6",
        "Step 3: Combine → 2x + 6"
      ],
      "ans": "2x + 6",
      "why": "Distributive law multiplies each term inside bracket"
    },
    {
      "q": "Expand 3(a + 2)",
      "hint": "distribute 3",
      "steps": [
        "Step 1: 3 × a = 3a",
        "Step 2: 3 × 2 = 6",
        "Step 3: 3a + 6"
      ],
      "ans": "3a + 6",
      "why": "Each term inside bracket must be multiplied"
    },
    {
      "q": "Expand 4(x + 1)",
      "hint": "multiply each term",
      "steps": [
        "Step 1: 4 × x = 4x",
        "Step 2: 4 × 1 = 4",
        "Step 3: 4x + 4"
      ],
      "ans": "4x + 4",
      "why": "Distributive property applies to all terms"
    },
    {
      "q": "What is the distributive law?",
      "hint": "a(b + c)",
      "steps": [
        "Step 1: Multiply outside term",
        "Step 2: Multiply each inside term",
        "Step 3: Combine results"
      ],
      "ans": "a(b + c) = ab + ac",
      "why": "It ensures correct expansion of brackets"
    }
  ]
);

add(
  "math",
  "geometry",
  "Types of angles",

  `<h2> Types of Angles</h2>
<p>An angle is formed when two lines meet at a common point called a vertex.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Angles are measured in degrees (°)</li>
<li>Angle size depends on how open the two lines are</li>
<li><b>Acute angle:</b> Less than 90° (small opening)</li>
<li><b>Right angle:</b> Exactly 90° (perfect corner, like a square)</li>
<li><b>Obtuse angle:</b> Greater than 90° but less than 180° (wide opening)</li>
<li><b>Straight angle:</b> Exactly 180° (forms a straight line)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Use 90° and 180° as reference points to classify angles
</pre>
<h3> ANGLE CLASSIFICATION GUIDE</h3>
<ul>
<li>0° – 90° → Acute angle</li>
<li>90° → Right angle</li>
<li>90° – 180° → Obtuse angle</li>
<li>180° → Straight angle</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Classify 35°<br>
Step 1: Compare with 90°<br>
Step 2: 35° < 90°<br>
<b>Answer: Acute angle</b>
</li>
<li>
<b>Example 2:</b> Classify 90°<br>
Step 1: Check exact value<br>
Step 2: It equals 90°<br>
<b>Answer: Right angle</b>
</li>
<li>
<b>Example 3:</b> Classify 150°<br>
Step 1: Compare with 90° and 180°<br>
Step 2: 150° lies between them<br>
<b>Answer: Obtuse angle</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
Acute:   < 90°   (small)
Right:   90°     (corner)
Obtuse:  > 90°   (wide)
Straight: 180°   (line)
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Construction → building corners and structures</li>
<li> Navigation → direction and turning angles</li>
<li> Engineering → machine joint movement</li>
<li> Game design → character rotation and motion</li>
<li> Design → architecture and blueprint layouts</li>
</ul>
`,

  [
    {
      "q": "Classify 60°",
      "hint": "Compare with 90°",
      "steps": [
        "Step 1: 60° is less than 90°",
        "Step 2: Therefore it is acute"
      ],
      "ans": "Acute angle",
      "why": "Angles less than 90° are acute"
    },
    {
      "q": "Classify 120°",
      "hint": "Between 90° and 180°",
      "steps": [
        "Step 1: Compare with 90°",
        "Step 2: Compare with 180°",
        "Step 3: Determine range"
      ],
      "ans": "Obtuse angle",
      "why": "Angles between 90° and 180° are obtuse"
    },
    {
      "q": "What is a right angle?",
      "hint": "corner",
      "steps": [
        "Step 1: Identify angle size",
        "Step 2: Check if exactly 90°",
        "Step 3: Define type"
      ],
      "ans": "An angle of exactly 90°",
      "why": "It forms a perfect square corner"
    },
    {
      "q": "What is a straight angle?",
      "hint": "line",
      "steps": [
        "Step 1: Observe full line",
        "Step 2: Measure angle",
        "Step 3: Identify value"
      ],
      "ans": "180°",
      "why": "It forms a straight line"
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",

  `<h2>Triangles</h2>

<p>
A <b>triangle</b> is a polygon with exactly three sides, three vertices,
and three interior angles.
</p>

<h3>1. ANGLE SUM OF A TRIANGLE</h3>

<p>
The three interior angles of every triangle add up to <b>180°</b>.
</p>

<pre>
Angle 1 + Angle 2 + Angle 3 = 180°
</pre>

<p>
If two angles are known, the third angle can be found by subtracting
their sum from 180°.
</p>

<pre>
Missing angle = 180° − sum of known angles
</pre>

<h3>Worked Example</h3>

<p>
A triangle has angles 45°, 65°, and x.
</p>

<pre>
45° + 65° + x = 180°

110° + x = 180°

x = 180° − 110°

x = 70°
</pre>

<p><b>Answer: x = 70°</b></p>

<h3>2. TYPES OF TRIANGLES BY SIDES</h3>

<ul>
<li>
<b>Equilateral:</b> all three sides are equal.
All three angles are 60°.
</li>

<li>
<b>Isosceles:</b> two sides are equal.
The angles opposite those equal sides are also equal.
</li>

<li>
<b>Scalene:</b> all three sides have different lengths.
Its angles are also different.
</li>
</ul>

<h3>3. TYPES OF TRIANGLES BY ANGLES</h3>

<ul>
<li>
<b>Acute triangle:</b> all three angles are less than 90°.
</li>

<li>
<b>Right-angled triangle:</b> one angle is exactly 90°.
</li>

<li>
<b>Obtuse triangle:</b> one angle is greater than 90°.
</li>
</ul>

<h3>IMPORTANT CONNECTION</h3>

<p>
A triangle can be classified in two ways at the same time:
by its <b>sides</b> and by its <b>angles</b>.
</p>

<p>
For example, a triangle can be both <b>isosceles</b> and
<b>right-angled</b>.
</p>

<h3>CHECKING A TRIANGLE</h3>

<p>
If three angles are given, add them. If their sum is not 180°,
they cannot be the interior angles of an ordinary triangle.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Using 360° instead of 180°.</li>
<li>Forgetting to subtract the known angles from 180°.</li>
<li>Confusing an isosceles triangle with an equilateral triangle.</li>
<li>Assuming every triangle with unequal angles has unequal sides without checking the angle-side relationship.</li>
</ul>
`,

  [
    {
      "q": "A triangle has angles 35° and 85°. Find the third angle.",
      "hint": "The angles of a triangle add to 180°.",
      "steps": [
        "Step 1: Add the known angles: 35° + 85° = 120°",
        "Step 2: Subtract from 180°: 180° − 120°",
        "Step 3: The missing angle is 60°"
      ],
      "ans": "60°",
      "why": "The three interior angles of a triangle always add up to 180°."
    },

    {
      "q": "A triangle has angles 90° and 35°. Find the third angle.",
      "hint": "Use the 180° angle-sum rule.",
      "steps": [
        "Step 1: Add the known angles: 90° + 35° = 125°",
        "Step 2: Subtract from 180°: 180° − 125°",
        "Step 3: The missing angle is 55°"
      ],
      "ans": "55°",
      "why": "A triangle containing a 90° angle is right-angled, and its other two angles must add to 90°."
    },

    {
      "q": "What type of triangle has all three sides equal?",
      "hint": "All sides have the same length.",
      "steps": [
        "Step 1: Check the side lengths",
        "Step 2: All three sides are equal",
        "Step 3: Identify the triangle"
      ],
      "ans": "Equilateral triangle",
      "why": "An equilateral triangle has three equal sides and three equal angles of 60°."
    },

    {
      "q": "A triangle has two equal sides. What type of triangle is it?",
      "hint": "Classify it by its sides.",
      "steps": [
        "Step 1: Look at the number of equal sides",
        "Step 2: Two sides are equal",
        "Step 3: Identify the triangle"
      ],
      "ans": "Isosceles triangle",
      "why": "An isosceles triangle has exactly two equal sides."
    },

    {
      "q": "Can a triangle have angles 70°, 60°, and 50°?",
      "hint": "Add the three angles.",
      "steps": [
        "Step 1: Add 70° + 60° + 50°",
        "Step 2: The sum is 180°",
        "Step 3: Therefore the angles can form a triangle"
      ],
      "ans": "Yes",
      "why": "The three angles add up to exactly 180°."
    }
  ]
);


add(
  "math",
  "geometry",
  "Quadrilaterals",

  `<h2>Quadrilaterals</h2>

<p>
A <b>quadrilateral</b> is a polygon with four sides, four vertices,
and four interior angles.
</p>

<h3>1. ANGLE SUM</h3>

<p>
The four interior angles of every quadrilateral add up to <b>360°</b>.
</p>

<pre>
Angle 1 + Angle 2 + Angle 3 + Angle 4 = 360°
</pre>

<p>
Therefore, when three angles are known:
</p>

<pre>
Missing angle = 360° − sum of known angles
</pre>

<h3>Worked Example</h3>

<p>
A quadrilateral has angles 80°, 90°, 110°, and x.
</p>

<pre>
80° + 90° + 110° + x = 360°

280° + x = 360°

x = 360° − 280°

x = 80°
</pre>

<p><b>Answer: x = 80°</b></p>

<h3>2. IMPORTANT TYPES</h3>

<ul>
<li>
<b>Square:</b> four equal sides and four right angles.
</li>

<li>
<b>Rectangle:</b> opposite sides are equal and parallel,
and all four angles are 90°.
</li>

<li>
<b>Rhombus:</b> all four sides are equal and opposite angles are equal.
</li>

<li>
<b>Parallelogram:</b> both pairs of opposite sides are parallel
and equal.
</li>

<li>
<b>Trapezium:</b> has one pair of parallel sides.
</li>
</ul>

<h3>3. SQUARE AND RECTANGLE</h3>

<p>
A square is also a rectangle because it has four right angles
and opposite sides are equal.
</p>

<p>
The additional property of a square is that <b>all four sides are equal</b>.
</p>

<h3>4. PARALLELOGRAM ANGLES</h3>

<p>
In a parallelogram, opposite angles are equal and adjacent angles
add up to 180°.
</p>

<pre>
Opposite angles → equal

Adjacent angles → 180°
</pre>

<h3>Common Mistakes</h3>

<ul>
<li>Using 180° instead of 360° for a quadrilateral.</li>
<li>Assuming every quadrilateral is a square or rectangle.</li>
<li>Thinking a rectangle has four equal sides. That property belongs to a square.</li>
<li>Confusing equal sides with parallel sides.</li>
</ul>
`,

  [
    {
      "q": "A quadrilateral has angles 75°, 85°, 100°, and x. Find x.",
      "hint": "The interior angles of a quadrilateral add to 360°.",
      "steps": [
        "Step 1: Add the known angles: 75° + 85° + 100° = 260°",
        "Step 2: Subtract from 360°: 360° − 260°",
        "Step 3: x = 100°"
      ],
      "ans": "100°",
      "why": "The four interior angles of a quadrilateral always add up to 360°."
    },

    {
      "q": "What is the sum of the interior angles of a quadrilateral?",
      "hint": "A quadrilateral has four sides.",
      "steps": [
        "Step 1: Identify the polygon",
        "Step 2: Use the quadrilateral angle-sum rule",
        "Step 3: State the total"
      ],
      "ans": "360°",
      "why": "Every quadrilateral has an interior angle sum of 360°."
    },

    {
      "q": "A quadrilateral has four equal sides and four right angles. What is it?",
      "hint": "Check both its side and angle properties.",
      "steps": [
        "Step 1: Four equal sides",
        "Step 2: Four right angles",
        "Step 3: Identify the quadrilateral"
      ],
      "ans": "Square",
      "why": "A square has four equal sides and four angles of 90°."
    },

    {
      "q": "A quadrilateral has four right angles and opposite sides equal, but its adjacent sides are not equal. What is it?",
      "hint": "It has four 90° angles but not four equal sides.",
      "steps": [
        "Step 1: Four right angles indicate a rectangle or square",
        "Step 2: The sides are not all equal",
        "Step 3: Therefore it is a rectangle"
      ],
      "ans": "Rectangle",
      "why": "A rectangle has four right angles and equal opposite sides, while a square has four equal sides."
    },

    {
      "q": "In a parallelogram, one angle is 65°. What is the adjacent angle?",
      "hint": "Adjacent angles in a parallelogram add to 180°.",
      "steps": [
        "Step 1: Adjacent angles add to 180°",
        "Step 2: Calculate 180° − 65°",
        "Step 3: The adjacent angle is 115°"
      ],
      "ans": "115°",
      "why": "Adjacent interior angles of a parallelogram are supplementary."
    }
  ]
);
add(
  "math",
  "geometry",
  "Circle Properties",

  `<h2>Circle Properties</h2>

<p>
A circle has a few important measurements that you must be able to
<strong>identify, calculate and use in problems</strong>.
</p>

<h3>1. The Important Parts of a Circle</h3>

<ul>
  <li><b>Centre:</b> the point exactly in the middle of the circle.</li>
  <li><b>Radius (r):</b> the distance from the centre to the circumference.</li>
  <li><b>Diameter (d):</b> the distance across the circle through the centre.</li>
  <li><b>Circumference (C):</b> the distance all the way around the circle.</li>
</ul>

<h3>2. Radius and Diameter</h3>

<p>
The diameter goes across the entire circle, while the radius goes from
the centre to the edge.
</p>

<p>
Therefore, one diameter contains <b>two radii</b>.
</p>

<pre>
d = 2r

r = d ÷ 2
</pre>

<h3>Worked Example 1: Find the Diameter</h3>

<p>
A circle has a radius of <b>7 cm</b>. Find its diameter.
</p>

<p><b>Step 1: Write the formula.</b></p>

<pre>
d = 2r
</pre>

<p><b>Step 2: Substitute the radius.</b></p>

<pre>
d = 2 × 7
</pre>

<p><b>Step 3: Calculate.</b></p>

<pre>
d = 14 cm
</pre>

<p><b>Answer: The diameter is 14 cm.</b></p>

<p>
Notice that the answer is twice the radius:
7 + 7 = 14.
</p>

<h3>Worked Example 2: Find the Radius</h3>

<p>
A circle has a diameter of <b>24 cm</b>. Find its radius.
</p>

<p><b>Step 1: Write the formula.</b></p>

<pre>
r = d ÷ 2
</pre>

<p><b>Step 2: Substitute the diameter.</b></p>

<pre>
r = 24 ÷ 2
</pre>

<p><b>Step 3: Calculate.</b></p>

<pre>
r = 12 cm
</pre>

<p><b>Answer: The radius is 12 cm.</b></p>

<h3>3. Circumference</h3>

<p>
The circumference is the distance around the outside of a circle.
It is the circle's perimeter.
</p>

<p>
There are two useful formulas:
</p>

<pre>
C = 2πr

C = πd
</pre>

<p>
Use whichever formula matches the information given.
</p>

<ul>
  <li>If you are given the <b>radius</b>, use <b>C = 2πr</b>.</li>
  <li>If you are given the <b>diameter</b>, use <b>C = πd</b>.</li>
</ul>

<h3>Using π</h3>

<p>
Unless a question tells you to use a particular value, use:
</p>

<pre>
π ≈ 3.142
</pre>

<p>
Your final answer should normally be given to the required number of
decimal places if the question asks for rounding.
</p>

<h3>Worked Example 3: Circumference from Radius</h3>

<p>
A circular plate has a radius of <b>5 cm</b>. Find its circumference.
Use π = 3.142.
</p>

<p><b>Step 1: Identify what is given.</b></p>

<pre>
r = 5 cm
</pre>

<p>
We know the radius, so use:
</p>

<pre>
C = 2πr
</pre>

<p><b>Step 2: Substitute the values.</b></p>

<pre>
C = 2 × 3.142 × 5
</pre>

<p><b>Step 3: Multiply.</b></p>

<pre>
2 × 3.142 = 6.284

6.284 × 5 = 31.42
</pre>

<p><b>Therefore:</b></p>

<pre>
C = 31.42 cm
</pre>

<p><b>Answer: The circumference is 31.42 cm.</b></p>

<h3>Worked Example 4: Circumference from Diameter</h3>

<p>
A circular wheel has a diameter of <b>20 cm</b>. Find its circumference.
Use π = 3.142.
</p>

<p><b>Step 1: Identify the information given.</b></p>

<pre>
d = 20 cm
</pre>

<p>
The diameter is given, so use:
</p>

<pre>
C = πd
</pre>

<p><b>Step 2: Substitute.</b></p>

<pre>
C = 3.142 × 20
</pre>

<p><b>Step 3: Calculate.</b></p>

<pre>
C = 62.84 cm
</pre>

<p><b>Answer: The circumference is 62.84 cm.</b></p>

<h3>4. Finding a Missing Radius from Circumference</h3>

<p>
Sometimes the radius is not given. Instead, you are given the
circumference.
</p>

<p>
Start with:
</p>

<pre>
C = 2πr
</pre>

<p>
To find r, divide both sides by 2π:
</p>

<pre>
r = C ÷ 2π
</pre>

<h3>Worked Example 5: Find the Radius</h3>

<p>
A circle has a circumference of <b>62.84 cm</b>.
Find its radius. Use π = 3.142.
</p>

<p><b>Step 1: Write the formula.</b></p>

<pre>
r = C ÷ 2π
</pre>

<p><b>Step 2: Substitute.</b></p>

<pre>
r = 62.84 ÷ (2 × 3.142)
</pre>

<p><b>Step 3: Calculate the denominator.</b></p>

<pre>
2 × 3.142 = 6.284
</pre>

<p>So:</p>

<pre>
r = 62.84 ÷ 6.284

r = 10 cm
</pre>

<p><b>Answer: The radius is 10 cm.</b></p>

<h3>5. Finding a Missing Diameter from Circumference</h3>

<p>
If the circumference and diameter formula are:
</p>

<pre>
C = πd
</pre>

<p>
then divide by π to find the diameter:
</p>

<pre>
d = C ÷ π
</pre>

<h3>Worked Example 6: Find the Diameter</h3>

<p>
A circular garden has a circumference of <b>31.42 m</b>.
Find its diameter. Use π = 3.142.
</p>

<p><b>Step 1: Write the formula.</b></p>

<pre>
d = C ÷ π
</pre>

<p><b>Step 2: Substitute.</b></p>

<pre>
d = 31.42 ÷ 3.142
</pre>

<p><b>Step 3: Calculate.</b></p>

<pre>
d = 10 m
</pre>

<p><b>Answer: The diameter is 10 m.</b></p>

<h3>6. Choosing the Correct Formula</h3>

<p>
Before calculating, ask yourself:
<b>"What information have I been given?"</b>
</p>

<ul>
  <li>Given radius → use <b>C = 2πr</b>.</li>
  <li>Given diameter → use <b>C = πd</b>.</li>
  <li>Given circumference and finding radius → use <b>r = C ÷ 2π</b>.</li>
  <li>Given circumference and finding diameter → use <b>d = C ÷ π</b>.</li>
</ul>

<h3>7. Worked Multi-Step Example</h3>

<p>
A circular running track has a radius of <b>14 m</b>.
Find its circumference using π = 22/7.
</p>

<p><b>Step 1: Write the formula.</b></p>

<pre>
C = 2πr
</pre>

<p><b>Step 2: Substitute π = 22/7 and r = 14.</b></p>

<pre>
C = 2 × (22/7) × 14
</pre>

<p><b>Step 3: Simplify 14 ÷ 7.</b></p>

<pre>
C = 2 × 22 × 2
</pre>

<p><b>Step 4: Multiply.</b></p>

<pre>
2 × 22 = 44

44 × 2 = 88
</pre>

<p><b>Answer:</b></p>

<pre>
C = 88 m
</pre>

<p>
The runner travels <b>88 m</b> after completing one full lap.
</p>

<h3>8. Real-Life Application</h3>

<p>
A bicycle wheel has a diameter of <b>70 cm</b>.
Approximately how far does the bicycle travel when the wheel makes
one complete revolution? Use π = 22/7.
</p>

<p><b>Step 1: Understand what one revolution means.</b></p>

<p>
One complete revolution means the wheel has travelled exactly one
circumference.
</p>

<p><b>Step 2: Use the diameter formula.</b></p>

<pre>
C = πd
</pre>

<p><b>Step 3: Substitute.</b></p>

<pre>
C = (22/7) × 70
</pre>

<p><b>Step 4: Simplify.</b></p>

<pre>
70 ÷ 7 = 10

C = 22 × 10
</pre>

<p><b>Step 5: Calculate.</b></p>

<pre>
C = 220 cm
</pre>

<p><b>Answer: The bicycle travels 220 cm per revolution.</b></p>

<p>
Since 100 cm = 1 m:
</p>

<pre>
220 cm = 2.2 m
</pre>

<p>
Therefore, the wheel moves <b>2.2 m</b> for every complete revolution.
</p>

<h3>Common Mistakes</h3>

<ul>
  <li>Using the radius as the diameter.</li>
  <li>Using C = πd when you have actually been given the radius.</li>
  <li>Forgetting that d = 2r.</li>
  <li>Confusing circumference with area.</li>
  <li>Forgetting units in the final answer.</li>
  <li>Rounding too early during calculations.</li>
</ul>

<h3>Quick Check Before You Answer</h3>

<ol>
  <li>What information has been given?</li>
  <li>What am I being asked to find?</li>
  <li>Which formula connects those quantities?</li>
  <li>Have I substituted the values correctly?</li>
  <li>Have I included the correct unit?</li>
</ol>
`,

  [
    {
      "q": "A circle has a radius of 8 cm. Find its diameter.",
      "hint": "The diameter is twice the radius.",
      "steps": [
        "Step 1: Use d = 2r.",
        "Step 2: Substitute r = 8: d = 2 × 8.",
        "Step 3: Calculate: d = 16.",
        "Step 4: Include the unit: 16 cm."
      ],
      "ans": "16 cm",
      "why": "A diameter contains two radii, so d = 2 × 8 = 16 cm."
    },

    {
      "q": "A circle has a diameter of 30 cm. Find its radius.",
      "hint": "The radius is half the diameter.",
      "steps": [
        "Step 1: Use r = d ÷ 2.",
        "Step 2: Substitute d = 30: r = 30 ÷ 2.",
        "Step 3: Calculate: r = 15.",
        "Step 4: Include the unit: 15 cm."
      ],
      "ans": "15 cm",
      "why": "The diameter contains two equal radii, so 30 ÷ 2 = 15 cm."
    },

    {
      "q": "A circle has a radius of 7 cm. Find its circumference using π = 22/7.",
      "hint": "Use C = 2πr.",
      "steps": [
        "Step 1: Write C = 2πr.",
        "Step 2: Substitute π = 22/7 and r = 7: C = 2 × (22/7) × 7.",
        "Step 3: Cancel 7: C = 2 × 22.",
        "Step 4: Calculate: C = 44.",
        "Step 5: Include the unit: 44 cm."
      ],
      "ans": "44 cm",
      "why": "The circumference is C = 2πr. Therefore C = 2 × 22/7 × 7 = 44 cm."
    },

    {
      "q": "A circular plate has a diameter of 14 cm. Find its circumference using π = 22/7.",
      "hint": "Because the diameter is given, use C = πd.",
      "steps": [
        "Step 1: Use C = πd.",
        "Step 2: Substitute π = 22/7 and d = 14.",
        "Step 3: C = (22/7) × 14.",
        "Step 4: 14 ÷ 7 = 2.",
        "Step 5: C = 22 × 2 = 44 cm."
      ],
      "ans": "44 cm",
      "why": "The circumference is π times the diameter, so C = 22/7 × 14 = 44 cm."
    },

    {
      "q": "A circle has a radius of 10 cm. Find its circumference using π = 3.142.",
      "hint": "Use C = 2πr.",
      "steps": [
        "Step 1: Use C = 2πr.",
        "Step 2: Substitute r = 10 and π = 3.142.",
        "Step 3: C = 2 × 3.142 × 10.",
        "Step 4: 2 × 3.142 = 6.284.",
        "Step 5: 6.284 × 10 = 62.84."
      ],
      "ans": "62.84 cm",
      "why": "Using C = 2πr gives C = 2 × 3.142 × 10 = 62.84 cm."
    },

    {
      "q": "A circle has a circumference of 62.84 cm. Find its radius using π = 3.142.",
      "hint": "Rearrange C = 2πr to get r = C ÷ 2π.",
      "steps": [
        "Step 1: Start with C = 2πr.",
        "Step 2: Rearrange: r = C ÷ 2π.",
        "Step 3: Substitute: r = 62.84 ÷ (2 × 3.142).",
        "Step 4: Calculate 2 × 3.142 = 6.284.",
        "Step 5: Calculate 62.84 ÷ 6.284 = 10.",
        "Step 6: The radius is 10 cm."
      ],
      "ans": "10 cm",
      "why": "Dividing the circumference by 2π gives the radius."
    },

    {
      "q": "A circular garden has a diameter of 21 m. Find its circumference using π = 22/7.",
      "hint": "The diameter is already given, so use C = πd.",
      "steps": [
        "Step 1: Use C = πd.",
        "Step 2: Substitute π = 22/7 and d = 21.",
        "Step 3: C = (22/7) × 21.",
        "Step 4: 21 ÷ 7 = 3.",
        "Step 5: C = 22 × 3 = 66 m."
      ],
      "ans": "66 m",
      "why": "The circumference is π times the diameter, giving 66 m."
    },

    {
      "q": "A bicycle wheel has a diameter of 70 cm. How far does it travel in one complete revolution? Use π = 22/7.",
      "hint": "One complete revolution covers one circumference.",
      "steps": [
        "Step 1: One revolution means one circumference.",
        "Step 2: Use C = πd.",
        "Step 3: Substitute: C = (22/7) × 70.",
        "Step 4: 70 ÷ 7 = 10.",
        "Step 5: C = 22 × 10 = 220 cm.",
        "Step 6: Convert to metres: 220 ÷ 100 = 2.2 m."
      ],
      "ans": "2.2 m",
      "why": "One complete revolution covers one circumference, which is 220 cm or 2.2 m."
    },

    {
      "q": "A circular track has a radius of 14 m. A runner completes 3 full laps. How far does the runner travel? Use π = 22/7.",
      "hint": "First find the circumference of one lap, then multiply by 3.",
      "steps": [
        "Step 1: One lap is one circumference.",
        "Step 2: Use C = 2πr.",
        "Step 3: C = 2 × (22/7) × 14.",
        "Step 4: 14 ÷ 7 = 2, so C = 2 × 22 × 2 = 88 m.",
        "Step 5: The runner completes 3 laps, so distance = 3 × 88.",
        "Step 6: 3 × 88 = 264 m."
      ],
      "ans": "264 m",
      "why": "One lap is 88 m, so 3 laps are 3 × 88 = 264 m."
    },

    {
      "q": "A circular field has a circumference of 88 m. Find its radius using π = 22/7.",
      "hint": "Use C = 2πr and rearrange to r = C ÷ 2π.",
      "steps": [
        "Step 1: Start with C = 2πr.",
        "Step 2: Rearrange: r = C ÷ 2π.",
        "Step 3: Substitute: r = 88 ÷ [2 × (22/7)].",
        "Step 4: r = 88 ÷ (44/7).",
        "Step 5: Dividing by 44/7 is the same as multiplying by 7/44.",
        "Step 6: r = 88 × 7/44.",
        "Step 7: 88 ÷ 44 = 2.",
        "Step 8: r = 2 × 7 = 14 m."
      ],
      "ans": "14 m",
      "why": "Rearranging C = 2πr gives r = C ÷ 2π, which gives 14 m."
    },

    {
      "q": "A wheel has a radius of 35 cm. How many complete revolutions are needed for the wheel to travel 220 m? Use π = 22/7.",
      "hint": "Find the distance travelled in one revolution first, then divide the total distance by that distance.",
      "steps": [
        "Step 1: Find the circumference: C = 2πr.",
        "Step 2: C = 2 × (22/7) × 35.",
        "Step 3: 35 ÷ 7 = 5.",
        "Step 4: C = 2 × 22 × 5 = 220 cm.",
        "Step 5: Convert 220 m to centimetres: 220 × 100 = 22,000 cm.",
        "Step 6: Number of revolutions = 22,000 ÷ 220.",
        "Step 7: 22,000 ÷ 220 = 100."
      ],
      "ans": "100 complete revolutions",
      "why": "Each revolution covers 220 cm. Since 220 m = 22,000 cm, the wheel needs 22,000 ÷ 220 = 100 revolutions."
    }
  ]
);
add(
  "math",
  "geometry",
  "Perimeter",

  `<h2>Perimeter</h2>

<p>
The <b>perimeter</b> of a shape is the total distance around its outside boundary.
</p>

<p>
To find the perimeter of a polygon, add the lengths of all its sides.
</p>

<pre>
Perimeter = sum of all outside side lengths
</pre>

<h3>1. RECTANGLE</h3>

<p>
A rectangle has two lengths and two widths.
Therefore:
</p>

<pre>
P = l + w + l + w

P = 2(l + w)
</pre>

<h3>Worked Example</h3>

<p>
A rectangle has length 8 cm and width 3 cm.
</p>

<pre>
P = 2(l + w)

P = 2(8 + 3)

P = 2(11)

P = 22 cm
</pre>

<p><b>Answer: 22 cm</b></p>

<h3>2. SQUARE</h3>

<p>
A square has four equal sides.
Therefore:
</p>

<pre>
P = 4s
</pre>

<p>
where <b>s</b> is the side length.
</p>

<h3>Worked Example</h3>

<p>
A square has a side length of 5 cm.
</p>

<pre>
P = 4 × 5

P = 20 cm
</pre>

<p><b>Answer: 20 cm</b></p>

<h3>3. TRIANGLE</h3>

<p>
The perimeter of a triangle is the sum of its three side lengths.
</p>

<pre>
P = a + b + c
</pre>

<h3>Worked Example</h3>

<p>
A triangle has sides 5 cm, 7 cm, and 9 cm.
</p>

<pre>
P = 5 + 7 + 9

P = 21 cm
</pre>

<p><b>Answer: 21 cm</b></p>

<h3>UNITS</h3>

<p>
Perimeter measures <b>length</b>, so its units are ordinary length units:
cm, m, km, and so on.
</p>

<p>
Do not use square units for perimeter.
</p>

<pre>
Perimeter → cm, m, km

Area → cm², m², km²
</pre>

<h3>Common Mistakes</h3>

<ul>
<li>Multiplying length × width when asked for perimeter.</li>
<li>Forgetting one or more sides.</li>
<li>Using square units such as cm² for perimeter.</li>
<li>Confusing perimeter with area.</li>
</ul>
`,

  [
    {
      "q": "Find the perimeter of a rectangle with length 10 cm and width 4 cm.",
      "hint": "Use P = 2(l + w).",
      "steps": [
        "Step 1: Add length and width: 10 + 4 = 14",
        "Step 2: Multiply by 2: 2 × 14",
        "Step 3: P = 28 cm"
      ],
      "ans": "28 cm",
      "why": "A rectangle has two lengths and two widths."
    },

    {
      "q": "Find the perimeter of a square with side length 7 cm.",
      "hint": "A square has four equal sides.",
      "steps": [
        "Step 1: Use P = 4s",
        "Step 2: Substitute s = 7",
        "Step 3: 4 × 7 = 28 cm"
      ],
      "ans": "28 cm",
      "why": "The perimeter of a square is four times its side length."
    },

    {
      "q": "A triangle has sides 6 cm, 8 cm, and 10 cm. Find its perimeter.",
      "hint": "Add all three sides.",
      "steps": [
        "Step 1: Add 6 + 8 + 10",
        "Step 2: The total is 24",
        "Step 3: Include the length unit"
      ],
      "ans": "24 cm",
      "why": "The perimeter of a triangle is the sum of its three side lengths."
    },

    {
      "q": "Which unit is appropriate for the perimeter of a rectangle?",
      "hint": "Perimeter measures length, not surface.",
      "steps": [
        "Step 1: Identify what perimeter measures",
        "Step 2: It measures length",
        "Step 3: Choose an ordinary length unit"
      ],
      "ans": "cm",
      "why": "Perimeter is a length, so it uses units such as cm or m, not cm² or m²."
    },

    {
      "q": "A rectangle has perimeter 30 cm and length 10 cm. Find its width.",
      "hint": "Use P = 2(l + w).",
      "steps": [
        "Step 1: Substitute into 30 = 2(10 + w)",
        "Step 2: Divide both sides by 2: 15 = 10 + w",
        "Step 3: Subtract 10: w = 5 cm"
      ],
      "ans": "5 cm",
      "why": "The perimeter contains two lengths and two widths."
    }
  ]
);


add(
  "math",
  "geometry",
  "Area",

  `<h2>Area</h2>

<p>
The <b>area</b> of a shape is the amount of two-dimensional space
contained inside its boundary.
</p>

<p>
Area is measured using <b>square units</b>, such as cm², m², or km².
</p>

<h3>1. AREA OF A RECTANGLE</h3>

<pre>
A = length × width

A = lw
</pre>

<h3>Worked Example</h3>

<p>
A rectangle has length 8 cm and width 5 cm.
</p>

<pre>
A = l × w

A = 8 × 5

A = 40 cm²
</pre>

<p><b>Answer: 40 cm²</b></p>

<h3>2. AREA OF A SQUARE</h3>

<p>
A square has equal length and width, so:
</p>

<pre>
A = side × side

A = s²
</pre>

<h3>Worked Example</h3>

<p>
A square has side length 6 cm.
</p>

<pre>
A = 6 × 6

A = 36 cm²
</pre>

<p><b>Answer: 36 cm²</b></p>

<h3>3. AREA OF A TRIANGLE</h3>

<p>
The area of a triangle is half the area of a rectangle
with the same base and perpendicular height.
</p>

<pre>
A = ½ × base × height

A = ½bh
</pre>

<p>
The height must be the <b>perpendicular distance</b> from the base
to the opposite vertex.
</p>

<h3>Worked Example</h3>

<p>
A triangle has base 10 cm and perpendicular height 6 cm.
</p>

<pre>
A = ½ × 10 × 6

A = ½ × 60

A = 30 cm²
</pre>

<p><b>Answer: 30 cm²</b></p>

<h3>4. AREA AND PERIMETER ARE DIFFERENT</h3>

<ul>
<li><b>Area:</b> measures the space inside a shape.</li>
<li><b>Perimeter:</b> measures the distance around a shape.</li>
</ul>

<pre>
Area → square units

Perimeter → ordinary length units
</pre>

<h3>Common Mistakes</h3>

<ul>
<li>Using perimeter instead of area.</li>
<li>Forgetting the ½ in the triangle formula.</li>
<li>Using the wrong height for a triangle.</li>
<li>Writing cm instead of cm² for area.</li>
</ul>
`,

  [
    {
      "q": "Find the area of a rectangle with length 9 cm and width 4 cm.",
      "hint": "Use A = length × width.",
      "steps": [
        "Step 1: Write A = l × w",
        "Step 2: Substitute 9 and 4",
        "Step 3: 9 × 4 = 36 cm²"
      ],
      "ans": "36 cm²",
      "why": "The area of a rectangle is its length multiplied by its width."
    },

    {
      "q": "Find the area of a square with side length 8 cm.",
      "hint": "Multiply the side by itself.",
      "steps": [
        "Step 1: Use A = s²",
        "Step 2: Substitute s = 8",
        "Step 3: 8 × 8 = 64 cm²"
      ],
      "ans": "64 cm²",
      "why": "A square has equal length and width, so its area is side × side."
    },

    {
      "q": "Find the area of a triangle with base 12 cm and perpendicular height 5 cm.",
      "hint": "Use A = ½bh.",
      "steps": [
        "Step 1: Multiply base by height: 12 × 5 = 60",
        "Step 2: Take half: 60 ÷ 2 = 30",
        "Step 3: Include square units"
      ],
      "ans": "30 cm²",
      "why": "The area of a triangle is half the product of its base and perpendicular height."
    },

    {
      "q": "Which measurement uses square units?",
      "hint": "Think about the space inside a shape.",
      "steps": [
        "Step 1: Identify what is being measured",
        "Step 2: Space inside a shape is area",
        "Step 3: Area uses square units"
      ],
      "ans": "Area",
      "why": "Area measures two-dimensional space and is therefore expressed in square units."
    },

    {
      "q": "A rectangle has an area of 48 cm² and a width of 6 cm. Find its length.",
      "hint": "Use A = l × w and rearrange.",
      "steps": [
        "Step 1: Write 48 = l × 6",
        "Step 2: Divide both sides by 6",
        "Step 3: l = 8 cm"
      ],
      "ans": "8 cm",
      "why": "Length can be found by dividing the area by the width."
    }
  ]
);
add(
  "math",
  "linear_programming",
  "Introduction to Linear Programming",

  `<h2>Introduction to Linear Programming</h2>

<p>
<b>Linear programming</b> is a method of finding the maximum or minimum
value of a quantity when there are restrictions on the possible values
of the variables.
</p>

<p>
A linear programming problem has three main parts:
</p>

<ul>
<li><b>Variables</b> — the unknown quantities we are trying to determine.</li>
<li><b>Objective function</b> — the quantity we want to maximize or minimize.</li>
<li><b>Constraints</b> — inequalities that restrict the possible values of the variables.</li>
</ul>

<h3>1. VARIABLES</h3>

<p>
Usually the unknown quantities are represented by <b>x</b> and <b>y</b>.
</p>

<p>
For example, if x represents one quantity and y represents another,
we might have:
</p>

<pre>
x ≥ 0
y ≥ 0
</pre>

<p>
The condition x ≥ 0 means x cannot be negative.
The same applies to y.
</p>

<h3>2. OBJECTIVE FUNCTION</h3>

<p>
The <b>objective function</b> tells us what we want to optimize.
It is usually written as:
</p>

<pre>
Z = ax + by
</pre>

<p>
The problem may ask us to:
</p>

<pre>
Maximize Z

or

Minimize Z
</pre>

<p>
For example:
</p>

<pre>
Maximize Z = 4x + 3y
</pre>

<p>
means that we want the largest possible value of Z while still
obeying all the constraints.
</p>

<h3>3. CONSTRAINTS</h3>

<p>
Constraints are inequalities that restrict x and y.
For example:
</p>

<pre>
x + y ≤ 10
x ≥ 0
y ≥ 0
</pre>

<p>
The first constraint says that x and y together cannot exceed 10.
The other two prevent negative values.
</p>

<h3>4. FEASIBLE SOLUTIONS</h3>

<p>
A point is a <b>feasible solution</b> if it satisfies <b>every constraint</b>.
</p>

<p>
A point that satisfies one constraint but violates another is
<b>not feasible</b>.
</p>

<h3>Complete Structure</h3>

<pre>
Variables
    ↓
Constraints
    ↓
Feasible region
    ↓
Objective function
    ↓
Maximum or minimum value
</pre>

<h3>Worked Example</h3>

<p>
Maximize:
</p>

<pre>
Z = 3x + 2y
</pre>

<p>
subject to:
</p>

<pre>
x + y ≤ 4
x ≥ 0
y ≥ 0
</pre>

<p>
Here:
</p>

<ul>
<li>Variables: x and y</li>
<li>Objective function: Z = 3x + 2y</li>
<li>Objective: maximize Z</li>
<li>Constraints: x + y ≤ 4, x ≥ 0, y ≥ 0</li>
</ul>

<p>
The constraints determine which values of x and y are allowed.
The objective function is then used to find the best feasible solution.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Confusing the objective function with a constraint.</li>
<li>Forgetting the non-negative constraints.</li>
<li>Maximizing the wrong expression.</li>
<li>Choosing a point that does not satisfy every constraint.</li>
</ul>
`,

  [
    {
      "q": "In the linear programming problem Maximize Z = 5x + 2y, what is the objective function?",
      "hint": "The objective function is the expression being maximized or minimized.",
      "steps": [
        "Step 1: Identify what is being maximized",
        "Step 2: The expression is 5x + 2y",
        "Step 3: Write it as Z = 5x + 2y"
      ],
      "ans": "Z = 5x + 2y",
      "why": "The objective function is the quantity that the problem asks us to maximize or minimize."
    },

    {
      "q": "What is the purpose of a constraint in linear programming?",
      "hint": "Think about restrictions.",
      "steps": [
        "Step 1: Identify what a constraint does",
        "Step 2: It restricts possible values of the variables",
        "Step 3: State its purpose"
      ],
      "ans": "It restricts the possible values of the variables.",
      "why": "Constraints define which solutions are allowed."
    },

    {
      "q": "For Maximize Z = 4x + y subject to x + y ≤ 8, identify the objective function.",
      "hint": "Look for the expression after Z.",
      "steps": [
        "Step 1: Locate Z",
        "Step 2: Read the expression attached to Z",
        "Step 3: Identify the objective"
      ],
      "ans": "Z = 4x + y",
      "why": "Z = 4x + y is the quantity being maximized."
    },

    {
      "q": "Is the point (3,2) feasible for x + y ≤ 6, x ≥ 0, y ≥ 0?",
      "hint": "Check every constraint.",
      "steps": [
        "Step 1: Check x + y ≤ 6: 3 + 2 = 5 ≤ 6",
        "Step 2: Check x ≥ 0: 3 ≥ 0",
        "Step 3: Check y ≥ 0: 2 ≥ 0",
        "Step 4: All constraints are satisfied"
      ],
      "ans": "Yes, (3,2) is feasible.",
      "why": "A feasible point must satisfy every constraint."
    },

    {
      "q": "Is the point (5,3) feasible for x + y ≤ 6, x ≥ 0, y ≥ 0?",
      "hint": "Check x + y ≤ 6.",
      "steps": [
        "Step 1: Calculate x + y = 5 + 3 = 8",
        "Step 2: Compare 8 with 6",
        "Step 3: 8 ≤ 6 is false",
        "Step 4: Therefore the point is not feasible"
      ],
      "ans": "No, (5,3) is not feasible.",
      "why": "The point violates the constraint x + y ≤ 6."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Linear Inequality Constraints",

  `<h2>Linear Inequality Constraints</h2>

<p>
A <b>constraint</b> in linear programming is usually written as a
linear inequality. It tells us which values of the variables are allowed.
</p>

<h3>1. THE FOUR INEQUALITY SYMBOLS</h3>

<ul>
<li><b>&lt;</b> means less than</li>
<li><b>≤</b> means less than or equal to</li>
<li><b>&gt;</b> means greater than</li>
<li><b>≥</b> means greater than or equal to</li>
</ul>

<p>
For example:
</p>

<pre>
x + y ≤ 5
</pre>

<p>
means that the sum of x and y can be 5 or anything smaller.
</p>

<h3>2. BOUNDARY LINE</h3>

<p>
To graph an inequality such as:
</p>

<pre>
x + y ≤ 5
</pre>

<p>
first replace the inequality sign with an equality:
</p>

<pre>
x + y = 5
</pre>

<p>
This gives the <b>boundary line</b>.
</p>

<h3>3. FINDING INTERCEPTS</h3>

<p>
For:
</p>

<pre>
x + y = 5
</pre>

<p>
Find the x-intercept by setting y = 0:
</p>

<pre>
x + 0 = 5

x = 5

x-intercept = (5,0)
</pre>

<p>
Find the y-intercept by setting x = 0:
</p>

<pre>
0 + y = 5

y = 5

y-intercept = (0,5)
</pre>

<p>
The line passes through <b>(5,0)</b> and <b>(0,5)</b>.
</p>

<h3>4. WHICH SIDE OF THE LINE?</h3>

<p>
The boundary line alone does not tell us which side satisfies
the inequality.
</p>

<p>
Choose a test point, usually <b>(0,0)</b>, and substitute it into
the original inequality.
</p>

<p>
For:
</p>

<pre>
x + y ≤ 5
</pre>

<p>
test (0,0):
</p>

<pre>
0 + 0 ≤ 5

0 ≤ 5

TRUE
</pre>

<p>
Therefore the side containing (0,0) is the required region.
</p>

<h3>5. SOLID AND BROKEN BOUNDARIES</h3>

<p>
When the boundary is included, use a <b>solid line</b>.
This occurs with:
</p>

<pre>
≤
≥
</pre>

<p>
When the boundary is not included, use a <b>broken/dashed line</b>.
This occurs with:
</p>

<pre>
<
>
</pre>

<h3>Worked Example</h3>

<p>
Graphically describe:
</p>

<pre>
2x + y ≤ 6
x ≥ 0
y ≥ 0
</pre>

<p>
First find the boundary:
</p>

<pre>
2x + y = 6
</pre>

<p>
If y = 0:
</p>

<pre>
2x = 6
x = 3

(3,0)
</pre>

<p>
If x = 0:
</p>

<pre>
y = 6

(0,6)
</pre>

<p>
Test (0,0):
</p>

<pre>
2(0) + 0 ≤ 6

0 ≤ 6

TRUE
</pre>

<p>
Therefore the required region is the side of the line containing
the origin, restricted further by x ≥ 0 and y ≥ 0.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Using the inequality itself as the boundary line instead of first using equality.</li>
<li>Choosing the wrong side of the boundary.</li>
<li>Forgetting to test the original inequality.</li>
<li>Using a dashed boundary for ≤ or ≥.</li>
<li>Forgetting that x ≥ 0 and y ≥ 0 restrict the graph to the first quadrant.</li>
</ul>
`,

  [
    {
      "q": "Find the x-intercept of x + y = 8.",
      "hint": "Set y = 0.",
      "steps": [
        "Step 1: Set y = 0",
        "Step 2: x + 0 = 8",
        "Step 3: x = 8",
        "Step 4: Write the coordinate"
      ],
      "ans": "(8,0)",
      "why": "The x-intercept occurs where y = 0."
    },

    {
      "q": "Find the y-intercept of 2x + y = 10.",
      "hint": "Set x = 0.",
      "steps": [
        "Step 1: Set x = 0",
        "Step 2: 2(0) + y = 10",
        "Step 3: y = 10",
        "Step 4: Write the coordinate"
      ],
      "ans": "(0,10)",
      "why": "The y-intercept occurs where x = 0."
    },

    {
      "q": "Which boundary equation is used to graph 3x + 2y ≤ 12?",
      "hint": "Replace ≤ with =.",
      "steps": [
        "Step 1: Start with 3x + 2y ≤ 12",
        "Step 2: Replace ≤ with =",
        "Step 3: Write the boundary equation"
      ],
      "ans": "3x + 2y = 12",
      "why": "The boundary is obtained by replacing the inequality with equality."
    },

    {
      "q": "Does (0,0) satisfy 2x + y ≤ 7?",
      "hint": "Substitute x = 0 and y = 0.",
      "steps": [
        "Step 1: Substitute x = 0 and y = 0",
        "Step 2: Calculate 2(0) + 0 = 0",
        "Step 3: Check 0 ≤ 7",
        "Step 4: The statement is true"
      ],
      "ans": "Yes",
      "why": "The origin satisfies the inequality."
    },

    {
      "q": "Should the boundary for x + y ≥ 4 be solid or dashed?",
      "hint": "Does ≥ include equality?",
      "steps": [
        "Step 1: Identify the inequality sign",
        "Step 2: ≥ includes equality",
        "Step 3: Use a solid boundary"
      ],
      "ans": "Solid",
      "why": "The boundary x + y = 4 is included when the inequality is ≥."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Feasible Region",

  `<h2>Feasible Region</h2>

<p>
The <b>feasible region</b> is the set of all points that satisfy
<b>all</b> the constraints in a linear programming problem.
</p>

<p>
Think of each constraint as creating a permitted region.
The feasible region is where all those permitted regions overlap.
</p>

<h3>1. WHY IT MATTERS</h3>

<p>
The objective function can only be optimized using feasible points.
A point outside the feasible region is not an allowed solution.
</p>

<h3>Worked Example</h3>

<p>
Find the feasible region for:
</p>

<pre>
x ≥ 0
y ≥ 0
x + y ≤ 4
</pre>

<h3>Step 1: Interpret x ≥ 0</h3>

<p>
x ≥ 0 means we only use points on or to the right of the y-axis.
</p>

<h3>Step 2: Interpret y ≥ 0</h3>

<p>
y ≥ 0 means we only use points on or above the x-axis.
</p>

<p>
Together:
</p>

<pre>
x ≥ 0
y ≥ 0
</pre>

<p>
restrict us to the <b>first quadrant</b>.
</p>

<h3>Step 3: Find the boundary of x + y ≤ 4</h3>

<pre>
x + y = 4
</pre>

<p>
When x = 0:
</p>

<pre>
y = 4

(0,4)
</pre>

<p>
When y = 0:
</p>

<pre>
x = 4

(4,0)
</pre>

<h3>Step 4: Find the common region</h3>

<p>
The required region is the part of the first quadrant satisfying
x + y ≤ 4.
</p>

<p>
Its vertices are:
</p>

<pre>
(0,0)
(4,0)
(0,4)
</pre>

<h3>5. VERTICES</h3>

<p>
A <b>vertex</b> is a corner point of the feasible region.
These points are especially important because a linear objective
function reaches its maximum or minimum at a vertex when an optimum
exists for a bounded feasible region.
</p>

<h3>6. CHECKING WHETHER A POINT IS FEASIBLE</h3>

<p>
To check a point, substitute its x and y values into <b>every constraint</b>.
</p>

<p>
For example, test (2,1):
</p>

<pre>
x + y ≤ 4

2 + 1 ≤ 4

3 ≤ 4  ✓

x ≥ 0 → 2 ≥ 0  ✓

y ≥ 0 → 1 ≥ 0  ✓
</pre>

<p>
Therefore (2,1) is feasible.
</p>

<p>
Now test (3,3):
</p>

<pre>
3 + 3 ≤ 4

6 ≤ 4  ✗
</pre>

<p>
Therefore (3,3) is not feasible.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Calling a point feasible after checking only one constraint.</li>
<li>Forgetting the axes when x ≥ 0 and y ≥ 0 are present.</li>
<li>Including a point outside the common region.</li>
<li>Missing a vertex where two boundaries intersect.</li>
</ul>
`,

  [
    {
      "q": "What is a feasible region?",
      "hint": "Think about all the constraints together.",
      "steps": [
        "Step 1: Consider all constraints",
        "Step 2: Find the region satisfying each one",
        "Step 3: Take their common region"
      ],
      "ans": "The region containing all points that satisfy every constraint.",
      "why": "A feasible solution must satisfy all constraints simultaneously."
    },

    {
      "q": "Find the vertices of x ≥ 0, y ≥ 0, x + y ≤ 6.",
      "hint": "Find the intercepts of x + y = 6 and include the origin.",
      "steps": [
        "Step 1: Boundary is x + y = 6",
        "Step 2: x-intercept = (6,0)",
        "Step 3: y-intercept = (0,6)",
        "Step 4: Include the origin (0,0)"
      ],
      "ans": "(0,0), (6,0), (0,6)",
      "why": "The axes and the constraint line form the three corners of the feasible region."
    },

    {
      "q": "Is (2,3) feasible for x + y ≤ 6, x ≥ 0, y ≥ 0?",
      "hint": "Check all three constraints.",
      "steps": [
        "Step 1: 2 + 3 = 5",
        "Step 2: Check 5 ≤ 6 → true",
        "Step 3: Check 2 ≥ 0 → true",
        "Step 4: Check 3 ≥ 0 → true"
      ],
      "ans": "Yes",
      "why": "The point satisfies every constraint."
    },

    {
      "q": "Is (5,4) feasible for x + y ≤ 6?",
      "hint": "Substitute x = 5 and y = 4.",
      "steps": [
        "Step 1: Calculate x + y = 5 + 4",
        "Step 2: 5 + 4 = 9",
        "Step 3: Check whether 9 ≤ 6",
        "Step 4: The inequality is false"
      ],
      "ans": "No",
      "why": "The point violates the constraint because 9 is greater than 6."
    },

    {
      "q": "Find the vertices of 2x + 3y ≤ 12, x ≥ 0, y ≥ 0.",
      "hint": "Find both intercepts of 2x + 3y = 12.",
      "steps": [
        "Step 1: Set y = 0: 2x = 12, so x = 6",
        "Step 2: x-intercept = (6,0)",
        "Step 3: Set x = 0: 3y = 12, so y = 4",
        "Step 4: y-intercept = (0,4)",
        "Step 5: Include the origin"
      ],
      "ans": "(0,0), (6,0), (0,4)",
      "why": "The axes and the boundary line form the three vertices."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Graphical Method",

  `<h2>Graphical Method</h2>

<p>
The <b>graphical method</b> solves a two-variable linear programming
problem by representing its constraints on a coordinate plane,
finding the feasible region, identifying its vertices, and evaluating
the objective function at those vertices.
</p>

<h3>THE BASIC PROCEDURE</h3>

<pre>
1. Write the constraints
2. Convert each inequality to a boundary equation
3. Find intercepts
4. Draw the boundary lines
5. Determine the feasible region
6. Find its vertices
7. Evaluate the objective function at each vertex
8. Choose the required maximum or minimum
</pre>

<h3>Worked Example</h3>

<p>
Maximize:
</p>

<pre>
Z = x + 2y
</pre>

<p>
subject to:
</p>

<pre>
x + y ≤ 6
x ≥ 0
y ≥ 0
</pre>

<h3>Step 1: Boundary Equation</h3>

<pre>
x + y = 6
</pre>

<h3>Step 2: Find Intercepts</h3>

<p>
Set y = 0:
</p>

<pre>
x = 6

(6,0)
</pre>

<p>
Set x = 0:
</p>

<pre>
y = 6

(0,6)
</pre>

<h3>Step 3: Determine the Feasible Region</h3>

<p>
Because x ≥ 0 and y ≥ 0, only the first quadrant is allowed.
The inequality x + y ≤ 6 selects the region on the origin side
of the line.
</p>

<h3>Step 4: Find Vertices</h3>

<pre>
(0,0)
(6,0)
(0,6)
</pre>

<h3>Step 5: Evaluate Z</h3>

<p>
Use:
</p>

<pre>
Z = x + 2y
</pre>

<p>At (0,0):</p>

<pre>
Z = 0 + 2(0)
Z = 0
</pre>

<p>At (6,0):</p>

<pre>
Z = 6 + 2(0)
Z = 6
</pre>

<p>At (0,6):</p>

<pre>
Z = 0 + 2(6)
Z = 12
</pre>

<h3>Step 6: Select the Maximum</h3>

<pre>
0, 6, 12

Largest = 12
</pre>

<p>
Therefore:
</p>

<pre>
Maximum Z = 12
at (0,6)
</pre>

<h3>WHY THE GRAPHICAL METHOD WORKS</h3>

<p>
The feasible region contains all allowed solutions. For a linear
objective function over a bounded polygonal feasible region, an
optimum occurs at a vertex, so checking the vertices is sufficient.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Finding intercepts incorrectly.</li>
<li>Shading the wrong side of a constraint.</li>
<li>Forgetting the origin when x ≥ 0 and y ≥ 0 apply.</li>
<li>Using points outside the feasible region.</li>
<li>Finding the minimum when the question asks for the maximum.</li>
</ul>
`,

  [
    {
      "q": "Maximize Z = 2x + y subject to x + y ≤ 6, x ≥ 0, y ≥ 0. What is the maximum value?",
      "hint": "Evaluate Z at (0,0), (6,0), and (0,6).",
      "steps": [
        "Step 1: Vertices are (0,0), (6,0), (0,6)",
        "Step 2: Z(0,0) = 0",
        "Step 3: Z(6,0) = 12",
        "Step 4: Z(0,6) = 6",
        "Step 5: Choose the largest value"
      ],
      "ans": "Zmax = 12 at (6,0)",
      "why": "The maximum value of a linear objective over this bounded feasible region occurs at a vertex."
    },

    {
      "q": "What is the first step when using the graphical method for x + y ≤ 5?",
      "hint": "Start with the boundary.",
      "steps": [
        "Step 1: Identify the inequality",
        "Step 2: Replace ≤ with =",
        "Step 3: Write the boundary equation"
      ],
      "ans": "Write x + y = 5.",
      "why": "The equality gives the boundary line that is plotted first."
    },

    {
      "q": "Find the vertices of x + y ≤ 8, x ≥ 0, y ≥ 0.",
      "hint": "Find the two intercepts and include the origin.",
      "steps": [
        "Step 1: Boundary is x + y = 8",
        "Step 2: x-intercept = (8,0)",
        "Step 3: y-intercept = (0,8)",
        "Step 4: Include (0,0)"
      ],
      "ans": "(0,0), (8,0), (0,8)",
      "why": "These are the three corners of the feasible triangular region."
    },

    {
      "q": "Evaluate Z = 3x + 2y at (0,0), (4,0), and (0,5).",
      "hint": "Substitute each point separately.",
      "steps": [
        "Step 1: Z(0,0) = 0",
        "Step 2: Z(4,0) = 3(4) + 2(0) = 12",
        "Step 3: Z(0,5) = 3(0) + 2(5) = 10",
        "Step 4: Compare 0, 12, and 10"
      ],
      "ans": "Maximum value = 12 at (4,0)",
      "why": "The largest objective-function value among the given vertices is 12."
    },

    {
      "q": "For x + y ≤ 4, x ≥ 0, y ≥ 0, which point is NOT feasible: (1,2), (3,1), or (3,3)?",
      "hint": "Add x and y for each point.",
      "steps": [
        "Step 1: (1,2): 1 + 2 = 3 ≤ 4",
        "Step 2: (3,1): 3 + 1 = 4 ≤ 4",
        "Step 3: (3,3): 3 + 3 = 6 > 4",
        "Step 4: Identify the point that violates the constraint"
      ],
      "ans": "(3,3)",
      "why": "(3,3) violates x + y ≤ 4."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Optimization at Corner Points",

  `<h2>Optimization at Corner Points</h2>

<p>
After finding the feasible region, the next task is to determine
which feasible point gives the required maximum or minimum value
of the objective function.
</p>

<h3>1. OBJECTIVE FUNCTION</h3>

<p>
Suppose:
</p>

<pre>
Z = 5x + 3y
</pre>

<p>
This function assigns a value of Z to every possible pair (x,y).
</p>

<p>
For example:
</p>

<pre>
At (2,1):

Z = 5(2) + 3(1)
Z = 10 + 3
Z = 13
</pre>

<h3>2. WHY CHECK CORNER POINTS?</h3>

<p>
For a linear objective function on a bounded polygonal feasible
region, the maximum or minimum occurs at a vertex.
</p>

<p>
Therefore, once the vertices are known, calculate the objective
function at each one and compare the results.
</p>

<h3>Worked Example: Maximum</h3>

<p>
Maximize:
</p>

<pre>
Z = 4x + 3y
</pre>

<p>
Suppose the feasible vertices are:
</p>

<pre>
(0,0), (5,0), (0,4)
</pre>

<p>Evaluate each:</p>

<pre>
Z(0,0) = 4(0) + 3(0)
       = 0

Z(5,0) = 4(5) + 3(0)
       = 20

Z(0,4) = 4(0) + 3(4)
       = 12
</pre>

<p>
The largest value is 20.
</p>

<pre>
Maximum Z = 20
at (5,0)
</pre>

<h3>Worked Example: Minimum</h3>

<p>
Minimize:
</p>

<pre>
C = 2x + 5y
</pre>

<p>
Suppose the feasible vertices are:
</p>

<pre>
(2,4), (6,0), (0,5)
</pre>

<p>Evaluate:</p>

<pre>
C(2,4) = 2(2) + 5(4)
       = 24

C(6,0) = 2(6) + 5(0)
       = 12

C(0,5) = 2(0) + 5(5)
       = 25
</pre>

<p>
The smallest value is 12.
</p>

<pre>
Minimum C = 12
at (6,0)
</pre>

<h3>IMPORTANT</h3>

<p>
Do not choose the point simply because its x-value or y-value
is largest or smallest. You must evaluate the <b>objective function</b>.
</p>

<p>
The best vertex depends on the coefficients in the objective function.
</p>

<h3>Common Mistakes</h3>

<ul>
<li>Choosing a vertex without calculating the objective function.</li>
<li>Finding the largest value when the question asks for the minimum.</li>
<li>Using a point that is not feasible.</li>
<li>Making arithmetic errors during substitution.</li>
<li>Reporting only the value and not the coordinates where it occurs.</li>
</ul>
`,

  [
    {
      "q": "Evaluate Z = 4x + 3y at (2,5).",
      "hint": "Substitute x = 2 and y = 5.",
      "steps": [
        "Step 1: Z = 4(2) + 3(5)",
        "Step 2: 4(2) = 8",
        "Step 3: 3(5) = 15",
        "Step 4: 8 + 15 = 23"
      ],
      "ans": "23",
      "why": "The objective function is evaluated by substituting the coordinates."
    },

    {
      "q": "Evaluate Z = 5x + 2y at (6,1).",
      "hint": "Substitute both coordinates.",
      "steps": [
        "Step 1: Z = 5(6) + 2(1)",
        "Step 2: 5(6) = 30",
        "Step 3: 2(1) = 2",
        "Step 4: 30 + 2 = 32"
      ],
      "ans": "32",
      "why": "Substitution gives the objective-function value at that point."
    },

    {
      "q": "Find the maximum of Z = 3x + 2y at (0,0), (5,0), and (0,4).",
      "hint": "Evaluate Z at all three points.",
      "steps": [
        "Step 1: Z(0,0) = 0",
        "Step 2: Z(5,0) = 15",
        "Step 3: Z(0,4) = 8",
        "Step 4: Compare the values"
      ],
      "ans": "Zmax = 15 at (5,0)",
      "why": "15 is the largest objective-function value among the three vertices."
    },

    {
      "q": "Find the minimum of C = 2x + 3y at (2,4), (5,1), and (1,5).",
      "hint": "Calculate C at each point.",
      "steps": [
        "Step 1: C(2,4) = 4 + 12 = 16",
        "Step 2: C(5,1) = 10 + 3 = 13",
        "Step 3: C(1,5) = 2 + 15 = 17",
        "Step 4: Choose the smallest value"
      ],
      "ans": "Cmin = 13 at (5,1)",
      "why": "13 is the smallest value among the three points."
    },

    {
      "q": "Why must all feasible vertices be checked when optimizing a linear objective?",
      "hint": "Different vertices can produce different objective values.",
      "steps": [
        "Step 1: Identify the objective function",
        "Step 2: Evaluate it at every relevant vertex",
        "Step 3: Compare the resulting values",
        "Step 4: Select the required extreme value"
      ],
      "ans": "Because the maximum or minimum may occur at any feasible vertex.",
      "why": "Checking the vertices ensures that the required optimum is not missed."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Linear Programming Word Problems",

  `<h2>Linear Programming Word Problems</h2>

<p>
Many linear programming questions begin with a situation described
in words. The main mathematical skill is translating the words into
variables, an objective function, and constraints.
</p>

<h3>THE TRANSLATION PROCESS</h3>

<pre>
Words
  ↓
Choose variables
  ↓
Write the objective function
  ↓
Write the constraints
  ↓
Solve the linear programming problem
</pre>

<h3>1. CHOOSE THE VARIABLES</h3>

<p>
First decide what x and y represent.
</p>

<p>
For example:
</p>

<pre>
x = number of type A items
y = number of type B items
</pre>

<p>
Always state what each variable means.
</p>

<h3>2. WRITE THE OBJECTIVE FUNCTION</h3>

<p>
Look for what the question wants to maximize or minimize.
</p>

<p>
Words such as:
</p>

<ul>
<li>maximum</li>
<li>minimum</li>
<li>greatest</li>
<li>least</li>
<li>profit</li>
<li>cost</li>
</ul>

<p>
often indicate the objective.
</p>

<p>
For example, if each A contributes 5 units and each B contributes
3 units:
</p>

<pre>
Z = 5x + 3y
</pre>

<h3>3. TRANSLATE LIMITS INTO CONSTRAINTS</h3>

<p>
Words such as <b>at most</b>, <b>no more than</b>, and
<b>cannot exceed</b> usually indicate ≤.
</p>

<pre>
At most 20

quantity ≤ 20
</pre>

<p>
Words such as <b>at least</b>, <b>not less than</b>, and
<b>minimum of</b> usually indicate ≥.
</p>

<pre>
At least 10

quantity ≥ 10
</pre>

<h3>Worked Example</h3>

<p>
A problem requires two quantities, x and y. Their total cannot
exceed 10. The objective is to maximize:
</p>

<pre>
Z = 4x + 3y
</pre>

<p>
Neither quantity can be negative.
</p>

<h3>Step 1: Variables</h3>

<pre>
x = first quantity
y = second quantity
</pre>

<h3>Step 2: Objective</h3>

<pre>
Maximize Z = 4x + 3y
</pre>

<h3>Step 3: Total Constraint</h3>

<p>
"Cannot exceed 10" means:
</p>

<pre>
x + y ≤ 10
</pre>

<h3>Step 4: Non-Negativity</h3>

<p>
Neither quantity can be negative:
</p>

<pre>
x ≥ 0
y ≥ 0
</pre>

<h3>Complete Mathematical Model</h3>

<pre>
Maximize Z = 4x + 3y

subject to:

x + y ≤ 10
x ≥ 0
y ≥ 0
</pre>

<p>
Once the model has been constructed, the graphical method or another
appropriate linear programming method can be used to solve it.
</p>

<h3>IMPORTANT LANGUAGE</h3>

<table>
<tr>
<th>Words</th>
<th>Mathematical meaning</th>
</tr>

<tr>
<td>at most</td>
<td>≤</td>
</tr>

<tr>
<td>no more than</td>
<td>≤</td>
</tr>

<tr>
<td>cannot exceed</td>
<td>≤</td>
</tr>

<tr>
<td>at least</td>
<td>≥</td>
</tr>

<tr>
<td>no less than</td>
<td>≥</td>
</tr>

<tr>
<td>minimum of</td>
<td>≥</td>
</tr>
</table>

<h3>Common Mistakes</h3>

<ul>
<li>Defining variables without stating what they represent.</li>
<li>Reversing ≤ and ≥.</li>
<li>Forgetting non-negativity constraints.</li>
<li>Confusing the objective function with a constraint.</li>
<li>Trying to solve before correctly translating the words into mathematics.</li>
</ul>
`,

  [
    {
      "q": "Translate 'x cannot exceed 12' into an inequality.",
      "hint": "Cannot exceed means at most.",
      "steps": [
        "Step 1: Identify the phrase 'cannot exceed'",
        "Step 2: This means the value can be 12 or less",
        "Step 3: Write the inequality"
      ],
      "ans": "x ≤ 12",
      "why": "'Cannot exceed' means the value must be less than or equal to 12."
    },

    {
      "q": "Translate 'y must be at least 7' into an inequality.",
      "hint": "At least means the value can equal 7 or be greater.",
      "steps": [
        "Step 1: Identify 'at least'",
        "Step 2: At least 7 means 7 or greater",
        "Step 3: Write the inequality"
      ],
      "ans": "y ≥ 7",
      "why": "'At least' means greater than or equal to."
    },

    {
      "q": "If x represents quantity A and y represents quantity B, and their total cannot exceed 20, write the constraint.",
      "hint": "Add the quantities and use 'cannot exceed'.",
      "steps": [
        "Step 1: Total quantity is x + y",
        "Step 2: Cannot exceed 20 means ≤ 20",
        "Step 3: Write the constraint"
      ],
      "ans": "x + y ≤ 20",
      "why": "The total must be 20 or less."
    },

    {
      "q": "A problem asks you to maximize 6x + 4y. What is the objective function?",
      "hint": "Look for the expression being maximized.",
      "steps": [
        "Step 1: Identify the quantity to maximize",
        "Step 2: It is 6x + 4y",
        "Step 3: Write it using Z"
      ],
      "ans": "Z = 6x + 4y",
      "why": "The objective function is the quantity being optimized."
    },

    {
      "q": "A problem states that x and y cannot be negative. Write the non-negativity constraints.",
      "hint": "Neither variable may be less than zero.",
      "steps": [
        "Step 1: x cannot be negative → x ≥ 0",
        "Step 2: y cannot be negative → y ≥ 0",
        "Step 3: Write both constraints"
      ],
      "ans": "x ≥ 0 and y ≥ 0",
      "why": "Non-negative variables are restricted to zero or positive values."
    }
  ]
);
add(
  "math",
  "fractions",
  "Understanding Fractions",

  `<h2>Understanding Fractions</h2>

<h3>WHAT IS A FRACTION?</h3>

<p>A fraction represents a number using two integers:</p>

<p><b>a/b</b></p>

<ul>
<li><b>a</b> is the numerator.</li>
<li><b>b</b> is the denominator.</li>
<li>The denominator must not be zero.</li>
</ul>

<p>For example:</p>

<p><b>3/5</b></p>

<ul>
<li>5 tells us the whole has been divided into 5 equal parts.</li>
<li>3 tells us that we are considering 3 of those parts.</li>
</ul>

<p><b>Important:</b> The parts must be equal. A fraction is not simply "some parts out of some parts."</p>

<h3>NUMERATOR AND DENOMINATOR</h3>

<p>In <b>7/9</b>:</p>

<ul>
<li>Numerator = 7</li>
<li>Denominator = 9</li>
</ul>

<p>The denominator describes the number of equal parts into which the whole is divided. The numerator tells how many of those parts are being counted.</p>

<h3>PROPER FRACTIONS</h3>

<p>A proper fraction has a numerator smaller than its denominator.</p>

<p>Examples:</p>

<ul>
<li>2/5</li>
<li>3/7</li>
<li>8/11</li>
</ul>

<p>Proper fractions have values between 0 and 1.</p>

<h3>IMPROPER FRACTIONS</h3>

<p>An improper fraction has a numerator greater than or equal to its denominator.</p>

<p>Examples:</p>

<ul>
<li>7/5</li>
<li>9/4</li>
<li>6/6</li>
</ul>

<p>An improper fraction can have a value greater than or equal to 1.</p>

<h3>MIXED NUMBERS</h3>

<p>A mixed number contains a whole number and a proper fraction.</p>

<p>Example:</p>

<p><b>2 1/3</b></p>

<p>This means:</p>

<p><b>2 + 1/3</b></p>

<p>To convert a mixed number to an improper fraction:</p>

<ol>
<li>Multiply the whole number by the denominator.</li>
<li>Add the numerator.</li>
<li>Keep the same denominator.</li>
</ol>

<p>Example:</p>

<p><b>2 1/3</b></p>

<p>2 × 3 = 6</p>
<p>6 + 1 = 7</p>

<p>Therefore:</p>

<p><b>2 1/3 = 7/3</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Confusing numerator and denominator.</li>
<li>Forgetting that the parts represented by the denominator must be equal.</li>
<li>Thinking every fraction is less than 1.</li>
<li>Forgetting that the denominator cannot be zero.</li>
</ul>

<h3>WORKED EXAMPLES</h3>

<p><b>Example 1:</b> Identify the numerator and denominator in 5/8.</p>

<p>Numerator = 5</p>
<p>Denominator = 8</p>

<p><b>Example 2:</b> Is 3/7 proper or improper?</p>

<p>3 &lt; 7, so it is a <b>proper fraction</b>.</p>

<p><b>Example 3:</b> Convert 3 2/5 to an improper fraction.</p>

<p>3 × 5 = 15</p>
<p>15 + 2 = 17</p>

<p><b>Answer: 17/5</b></p>
`,

  [
    {
      "q": "In the fraction 7/12, what is the numerator?",
      "hint": "Look at the top number.",
      "steps": [
        "Step 1: Identify the top number.",
        "Step 2: The top number is 7."
      ],
      "ans": "7",
      "why": "The numerator is the number written above the fraction bar."
    },
    {
      "q": "In the fraction 7/12, what is the denominator?",
      "hint": "Look at the bottom number.",
      "steps": [
        "Step 1: Identify the bottom number.",
        "Step 2: The bottom number is 12."
      ],
      "ans": "12",
      "why": "The denominator is the number written below the fraction bar."
    },
    {
      "q": "Is 5/8 a proper or improper fraction?",
      "hint": "Compare numerator and denominator.",
      "steps": [
        "Step 1: Numerator = 5.",
        "Step 2: Denominator = 8.",
        "Step 3: 5 is smaller than 8."
      ],
      "ans": "Proper fraction",
      "why": "A proper fraction has a numerator smaller than its denominator."
    },
    {
      "q": "Convert 2 3/4 to an improper fraction.",
      "hint": "Multiply the whole number by the denominator first.",
      "steps": [
        "Step 1: 2 × 4 = 8.",
        "Step 2: 8 + 3 = 11.",
        "Step 3: Keep denominator 4.",
        "Step 4: The result is 11/4."
      ],
      "ans": "11/4",
      "why": "A mixed number is converted by multiplying the whole number by the denominator and adding the numerator."
    }
  ]
);


add(
  "math",
  "fractions",
  "Equivalent Fractions and Simplifying",

  `<h2>Equivalent Fractions and Simplifying</h2>

<h3>WHAT ARE EQUIVALENT FRACTIONS?</h3>

<p>Equivalent fractions have <b>different numbers</b> but represent the <b>same value</b>.</p>

<p>For example:</p>

<p><b>1/2 = 2/4 = 3/6 = 4/8</b></p>

<p>The numerator and denominator can both be multiplied or divided by the same non-zero number without changing the value of the fraction.</p>

<h3>CREATING AN EQUIVALENT FRACTION</h3>

<p>Example:</p>

<p><b>3/5</b></p>

<p>Multiply both numerator and denominator by 4:</p>

<p>3 × 4 = 12</p>
<p>5 × 4 = 20</p>

<p>Therefore:</p>

<p><b>3/5 = 12/20</b></p>

<p><b>Important:</b> You must multiply or divide both parts by the same number.</p>

<h3>SIMPLIFYING A FRACTION</h3>

<p>Simplifying means writing a fraction in its simplest form without changing its value.</p>

<p>Example:</p>

<p><b>12/18</b></p>

<p>The greatest common factor of 12 and 18 is 6.</p>

<p>Divide both by 6:</p>

<p>12 ÷ 6 = 2</p>
<p>18 ÷ 6 = 3</p>

<p>Therefore:</p>

<p><b>12/18 = 2/3</b></p>

<h3>HOW TO KNOW WHEN A FRACTION IS FULLY SIMPLIFIED</h3>

<p>A fraction is in simplest form when the numerator and denominator have no common factor greater than 1.</p>

<p>Example:</p>

<p><b>4/9</b> is simplified because 4 and 9 have no common factor greater than 1.</p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Changing only the numerator.</li>
<li>Changing only the denominator.</li>
<li>Multiplying the numerator and dividing the denominator.</li>
<li>Stopping before the fraction is fully simplified.</li>
</ul>

<h3>WORKED EXAMPLES</h3>

<p><b>Example 1:</b> Find an equivalent fraction to 2/3 with denominator 15.</p>

<p>3 × 5 = 15</p>

<p>Therefore multiply the numerator by 5:</p>

<p>2 × 5 = 10</p>

<p><b>Answer: 10/15</b></p>

<p><b>Example 2:</b> Simplify 20/30.</p>

<p>Both numbers are divisible by 10.</p>

<p>20 ÷ 10 = 2</p>
<p>30 ÷ 10 = 3</p>

<p><b>Answer: 2/3</b></p>
`,

  [
    {
      "q": "Find an equivalent fraction to 3/4 with denominator 20.",
      "hint": "4 must become 20.",
      "steps": [
        "Step 1: 4 × 5 = 20.",
        "Step 2: Multiply the numerator by 5.",
        "Step 3: 3 × 5 = 15."
      ],
      "ans": "15/20",
      "why": "Both numerator and denominator must be multiplied by the same factor."
    },
    {
      "q": "Simplify 12/18.",
      "hint": "Find a common factor of 12 and 18.",
      "steps": [
        "Step 1: The greatest common factor is 6.",
        "Step 2: 12 ÷ 6 = 2.",
        "Step 3: 18 ÷ 6 = 3."
      ],
      "ans": "2/3",
      "why": "Dividing numerator and denominator by their greatest common factor gives simplest form."
    },
    {
      "q": "Are 2/3 and 8/12 equivalent?",
      "hint": "Simplify 8/12.",
      "steps": [
        "Step 1: Divide 8 and 12 by 4.",
        "Step 2: 8/12 = 2/3.",
        "Step 3: Therefore the fractions have the same value."
      ],
      "ans": "Yes",
      "why": "Equivalent fractions represent the same value."
    }
  ]
);


add(
  "math",
  "fractions",
  "Comparing Fractions",

  `<h2>Comparing Fractions</h2>

<h3>WHY COMPARISON CAN BE TRICKY</h3>

<p>You cannot always compare fractions by looking only at the numerator or only at the denominator.</p>

<p>The fraction's value depends on <b>both</b>.</p>

<h3>METHOD 1: SAME DENOMINATOR</h3>

<p>If two fractions have the same denominator, compare their numerators.</p>

<p>Example:</p>

<p><b>5/8 and 3/8</b></p>

<p>Both denominators are 8.</p>

<p>Since 5 &gt; 3:</p>

<p><b>5/8 &gt; 3/8</b></p>

<h3>METHOD 2: SAME NUMERATOR</h3>

<p>If two positive fractions have the same numerator, the fraction with the smaller denominator is larger.</p>

<p>Example:</p>

<p><b>1/3 and 1/5</b></p>

<p>A third is larger than a fifth.</p>

<p>Therefore:</p>

<p><b>1/3 &gt; 1/5</b></p>

<h3>METHOD 3: COMMON DENOMINATOR</h3>

<p>Convert the fractions so that they have the same denominator.</p>

<p>Example:</p>

<p><b>2/3 and 3/4</b></p>

<p>A common denominator is 12.</p>

<p>2/3 = 8/12</p>

<p>3/4 = 9/12</p>

<p>Since 9 &gt; 8:</p>

<p><b>3/4 &gt; 2/3</b></p>

<h3>METHOD 4: CROSS-MULTIPLICATION</h3>

<p>For positive fractions:</p>

<p><b>a/b</b> and <b>c/d</b></p>

<p>Compare:</p>

<p><b>a × d</b> and <b>c × b</b></p>

<p>Example:</p>

<p>Compare 3/5 and 4/7.</p>

<p>3 × 7 = 21</p>

<p>4 × 5 = 20</p>

<p>Since 21 &gt; 20:</p>

<p><b>3/5 &gt; 4/7</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Assuming a larger denominator always means a larger fraction.</li>
<li>Comparing only numerators when denominators differ.</li>
<li>Cross-multiplying but comparing the wrong products.</li>
</ul>
`,

  [
    {
      "q": "Which is greater: 5/9 or 2/9?",
      "hint": "The denominators are already equal.",
      "steps": [
        "Step 1: Both denominators are 9.",
        "Step 2: Compare numerators 5 and 2.",
        "Step 3: 5 > 2."
      ],
      "ans": "5/9",
      "why": "With equal positive denominators, the larger numerator gives the larger fraction."
    },
    {
      "q": "Which is greater: 1/3 or 1/7?",
      "hint": "The numerators are equal.",
      "steps": [
        "Step 1: Both numerators are 1.",
        "Step 2: Compare denominators.",
        "Step 3: A third is larger than a seventh."
      ],
      "ans": "1/3",
      "why": "For positive fractions with the same numerator, the smaller denominator gives the larger value."
    },
    {
      "q": "Which is greater: 3/4 or 5/8?",
      "hint": "Use a common denominator.",
      "steps": [
        "Step 1: Convert 3/4 to eighths.",
        "Step 2: 3/4 = 6/8.",
        "Step 3: Compare 6/8 and 5/8.",
        "Step 4: 6/8 is greater."
      ],
      "ans": "3/4",
      "why": "Converting to a common denominator makes comparison direct."
    },
    {
      "q": "Which is greater: 4/7 or 5/9?",
      "hint": "Cross-multiply.",
      "steps": [
        "Step 1: 4 × 9 = 36.",
        "Step 2: 5 × 7 = 35.",
        "Step 3: 36 > 35."
      ],
      "ans": "4/7",
      "why": "Cross-products can be compared when determining which of two positive fractions is larger."
    }
  ]
);


add(
  "math",
  "fractions",
  "Adding and Subtracting Fractions",

  `<h2>Adding and Subtracting Fractions</h2>

<h3>THE MAIN RULE</h3>

<p>Fractions must have a <b>common denominator</b> before their numerators can be added or subtracted.</p>

<p>The denominator tells us the size of the parts. We cannot directly combine parts of different sizes.</p>

<h3>SAME DENOMINATOR</h3>

<p>Example:</p>

<p><b>2/7 + 3/7</b></p>

<p>The denominators are already equal.</p>

<p>Add the numerators:</p>

<p>2 + 3 = 5</p>

<p>Keep the denominator:</p>

<p><b>5/7</b></p>

<p>Notice that we do <b>not</b> add 7 + 7.</p>

<h3>DIFFERENT DENOMINATORS</h3>

<p>Example:</p>

<p><b>1/2 + 1/3</b></p>

<p>The denominators are different, so find their LCM.</p>

<p>LCM(2,3) = 6</p>

<p>Convert each fraction:</p>

<p>1/2 = 3/6</p>

<p>1/3 = 2/6</p>

<p>Now add:</p>

<p>3/6 + 2/6 = 5/6</p>

<h3>SUBTRACTION</h3>

<p>The same rule applies.</p>

<p>Example:</p>

<p><b>5/6 − 1/4</b></p>

<p>LCM of 6 and 4 = 12.</p>

<p>5/6 = 10/12</p>

<p>1/4 = 3/12</p>

<p>Therefore:</p>

<p>10/12 − 3/12 = 7/12</p>

<h3>THE GENERAL PROCEDURE</h3>

<ol>
<li>Find a common denominator.</li>
<li>Rewrite each fraction using that denominator.</li>
<li>Add or subtract the numerators.</li>
<li>Keep the common denominator.</li>
<li>Simplify the answer if possible.</li>
</ol>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Adding denominators.</li>
<li>Changing the denominator without changing the numerator.</li>
<li>Using the wrong LCM.</li>
<li>Forgetting to simplify.</li>
</ul>
`,

  [
    {
      "q": "Calculate 2/5 + 1/5.",
      "hint": "The denominators are already equal.",
      "steps": [
        "Step 1: Add numerators: 2 + 1 = 3.",
        "Step 2: Keep denominator 5.",
        "Step 3: Result = 3/5."
      ],
      "ans": "3/5",
      "why": "When denominators are equal, add only the numerators."
    },
    {
      "q": "Calculate 1/2 + 1/4.",
      "hint": "Change 1/2 into quarters.",
      "steps": [
        "Step 1: LCM of 2 and 4 = 4.",
        "Step 2: 1/2 = 2/4.",
        "Step 3: 2/4 + 1/4 = 3/4."
      ],
      "ans": "3/4",
      "why": "A common denominator is required before adding fractions."
    },
    {
      "q": "Calculate 5/6 - 1/3.",
      "hint": "Convert 1/3 to sixths.",
      "steps": [
        "Step 1: 1/3 = 2/6.",
        "Step 2: 5/6 - 2/6 = 3/6.",
        "Step 3: Simplify 3/6 to 1/2."
      ],
      "ans": "1/2",
      "why": "The fractions are first expressed with the same denominator."
    },
    {
      "q": "Calculate 2/3 + 3/4.",
      "hint": "Use 12 as the common denominator.",
      "steps": [
        "Step 1: 2/3 = 8/12.",
        "Step 2: 3/4 = 9/12.",
        "Step 3: 8/12 + 9/12 = 17/12."
      ],
      "ans": "17/12",
      "why": "The LCM of 3 and 4 is 12."
    }
  ]
);


add(
  "math",
  "fractions",
  "Multiplying Fractions",

  `<h2>Multiplying Fractions</h2>

<h3>THE RULE</h3>

<p>To multiply fractions:</p>

<p><b>Multiply numerator × numerator.</b></p>

<p><b>Multiply denominator × denominator.</b></p>

<p>Unlike addition, the denominators do <b>not</b> need to be equal.</p>

<h3>EXAMPLE 1</h3>

<p><b>2/3 × 4/5</b></p>

<p>Multiply numerators:</p>

<p>2 × 4 = 8</p>

<p>Multiply denominators:</p>

<p>3 × 5 = 15</p>

<p>Therefore:</p>

<p><b>2/3 × 4/5 = 8/15</b></p>

<h3>SIMPLIFYING</h3>

<p>Example:</p>

<p><b>2/3 × 3/4</b></p>

<p>Multiply:</p>

<p>6/12</p>

<p>Simplify:</p>

<p><b>6/12 = 1/2</b></p>

<h3>CANCELLING BEFORE MULTIPLYING</h3>

<p>You can simplify common factors before multiplying.</p>

<p>Example:</p>

<p><b>2/3 × 3/4</b></p>

<p>The 3 in the numerator and the 3 in the denominator cancel.</p>

<p>The 2 and 4 can also be simplified by dividing by 2.</p>

<p>This leaves:</p>

<p><b>1/2</b></p>

<p>This is called <b>cross-cancellation</b>.</p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Adding instead of multiplying.</li>
<li>Trying to find an LCM unnecessarily.</li>
<li>Multiplying correctly but forgetting to simplify.</li>
<li>Cancelling numbers that are not factors.</li>
</ul>
`,

  [
    {
      "q": "Calculate 3/5 × 2/7.",
      "hint": "Multiply straight across.",
      "steps": [
        "Step 1: 3 × 2 = 6.",
        "Step 2: 5 × 7 = 35.",
        "Step 3: Write the result as 6/35."
      ],
      "ans": "6/35",
      "why": "Fractions are multiplied by multiplying corresponding numerators and denominators."
    },
    {
      "q": "Calculate 2/3 × 3/4.",
      "hint": "Multiply and simplify.",
      "steps": [
        "Step 1: 2 × 3 = 6.",
        "Step 2: 3 × 4 = 12.",
        "Step 3: 6/12 = 1/2."
      ],
      "ans": "1/2",
      "why": "The resulting fraction must be simplified."
    },
    {
      "q": "Calculate 4/9 × 3/8.",
      "hint": "Cancel common factors first.",
      "steps": [
        "Step 1: Cancel 4 with 8 to get 1 and 2.",
        "Step 2: Cancel 3 with 9 to get 1 and 3.",
        "Step 3: Multiply 1/3 × 1/2.",
        "Step 4: Result = 1/6."
      ],
      "ans": "1/6",
      "why": "Common factors can be cancelled before multiplication."
    }
  ]
);


add(
  "math",
  "fractions",
  "Dividing Fractions",

  `<h2>Dividing Fractions</h2>

<h3>THE KEY RULE</h3>

<p>To divide by a fraction:</p>

<ol>
<li>Keep the first fraction.</li>
<li>Change division to multiplication.</li>
<li>Take the reciprocal of the second fraction.</li>
</ol>

<p>In short:</p>

<p><b>a/b ÷ c/d = a/b × d/c</b></p>

<h3>WHAT IS A RECIPROCAL?</h3>

<p>The reciprocal of a non-zero fraction is found by swapping the numerator and denominator.</p>

<p>Examples:</p>

<ul>
<li>2/3 → 3/2</li>
<li>5/7 → 7/5</li>
<li>4 → 1/4</li>
</ul>

<h3>WORKED EXAMPLE</h3>

<p><b>1/2 ÷ 1/4</b></p>

<p>Step 1: Keep 1/2.</p>

<p>Step 2: Change ÷ to ×.</p>

<p>Step 3: Flip 1/4 to 4/1.</p>

<p>Therefore:</p>

<p>1/2 × 4/1 = 4/2 = <b>2</b></p>

<h3>WHY DOES THE RECIPROCAL WORK?</h3>

<p>Division asks:</p>

<p><b>How many times does the divisor fit into the number?</b></p>

<p>For example:</p>

<p>1/2 ÷ 1/4 asks how many quarters fit into one half.</p>

<p>Two quarters fit into one half.</p>

<p>Therefore:</p>

<p><b>1/2 ÷ 1/4 = 2</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Flipping the first fraction instead of the second.</li>
<li>Forgetting to change division into multiplication.</li>
<li>Flipping both fractions.</li>
<li>Forgetting to simplify.</li>
</ul>
`,

  [
    {
      "q": "Calculate 3/4 ÷ 1/2.",
      "hint": "Flip the second fraction.",
      "steps": [
        "Step 1: Keep 3/4.",
        "Step 2: Change ÷ to ×.",
        "Step 3: Flip 1/2 to 2/1.",
        "Step 4: 3/4 × 2/1 = 6/4 = 3/2."
      ],
      "ans": "3/2",
      "why": "Dividing by a fraction is equivalent to multiplying by its reciprocal."
    },
    {
      "q": "Calculate 5/6 ÷ 1/3.",
      "hint": "The reciprocal of 1/3 is 3.",
      "steps": [
        "Step 1: 5/6 ÷ 1/3 = 5/6 × 3/1.",
        "Step 2: Multiply to get 15/6.",
        "Step 3: Simplify to 5/2."
      ],
      "ans": "5/2",
      "why": "The second fraction is replaced by its reciprocal."
    },
    {
      "q": "Calculate 2/5 ÷ 2/5.",
      "hint": "A non-zero number divided by itself equals 1.",
      "steps": [
        "Step 1: Flip the second fraction: 5/2.",
        "Step 2: 2/5 × 5/2.",
        "Step 3: Cancel common factors.",
        "Step 4: Result = 1."
      ],
      "ans": "1",
      "why": "Any non-zero number divided by itself equals 1."
    }
  ]
);


add(
  "math",
  "fractions",
  "Decimals and Fractions",

  `<h2>Decimals and Fractions</h2>

<h3>DECIMALS AS FRACTIONS</h3>

<p>A terminating decimal can be written as a fraction whose denominator is a power of 10.</p>

<p>The denominator depends on the number of digits after the decimal point.</p>

<ul>
<li>1 decimal place → denominator 10</li>
<li>2 decimal places → denominator 100</li>
<li>3 decimal places → denominator 1000</li>
</ul>

<h3>EXAMPLE 1: ONE DECIMAL PLACE</h3>

<p>Convert <b>0.6</b> to a fraction.</p>

<p>There is one digit after the decimal point:</p>

<p><b>0.6 = 6/10</b></p>

<p>Simplify:</p>

<p><b>6/10 = 3/5</b></p>

<h3>EXAMPLE 2: TWO DECIMAL PLACES</h3>

<p>Convert <b>0.25</b> to a fraction.</p>

<p>There are two digits after the decimal point:</p>

<p><b>0.25 = 25/100</b></p>

<p>Simplify by 25:</p>

<p><b>25/100 = 1/4</b></p>

<h3>FRACTION TO DECIMAL</h3>

<p>To convert a fraction to a decimal, divide the numerator by the denominator.</p>

<p>Example:</p>

<p><b>3/4</b></p>

<p>3 ÷ 4 = <b>0.75</b></p>

<p>Therefore:</p>

<p><b>3/4 = 0.75</b></p>

<h3>TERMINATING DECIMALS</h3>

<p>A terminating decimal eventually stops.</p>

<p>Examples:</p>

<ul>
<li>0.5</li>
<li>0.25</li>
<li>0.625</li>
<li>1.75</li>
</ul>

<h3>IMPORTANT DISTINCTION</h3>

<p>Not every fraction produces a terminating decimal.</p>

<p>For example:</p>

<p>1/3 = 0.333...</p>

<p>The digits continue repeating. This is a <b>recurring decimal</b>, which is studied separately.</p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Using 10 as the denominator when there are two or three decimal places.</li>
<li>Forgetting to simplify the resulting fraction.</li>
<li>Confusing terminating and recurring decimals.</li>
</ul>
`,

  [
    {
      "q": "Convert 0.6 to a fraction in simplest form.",
      "hint": "Write it over 10.",
      "steps": [
        "Step 1: 0.6 = 6/10.",
        "Step 2: Divide numerator and denominator by 2.",
        "Step 3: 6/10 = 3/5."
      ],
      "ans": "3/5",
      "why": "One decimal place represents tenths."
    },
    {
      "q": "Convert 0.75 to a fraction in simplest form.",
      "hint": "Write it over 100.",
      "steps": [
        "Step 1: 0.75 = 75/100.",
        "Step 2: Divide numerator and denominator by 25.",
        "Step 3: 75/100 = 3/4."
      ],
      "ans": "3/4",
      "why": "Two decimal places represent hundredths."
    },
    {
      "q": "Convert 5/8 to a decimal.",
      "hint": "Divide 5 by 8.",
      "steps": [
        "Step 1: 5 ÷ 8.",
        "Step 2: 5/8 = 0.625."
      ],
      "ans": "0.625",
      "why": "A fraction can be converted to a decimal by dividing numerator by denominator."
    },
    {
      "q": "Convert 7/10 to a decimal.",
      "hint": "The denominator is already 10.",
      "steps": [
        "Step 1: 7/10 represents seven tenths.",
        "Step 2: Seven tenths is written as 0.7."
      ],
      "ans": "0.7",
      "why": "A denominator of 10 corresponds directly to one decimal place."
    }
  ]
);


add(
  "math",
  "fractions",
  "Recurring Decimals",

  `<h2>Recurring Decimals</h2>

<h3>WHAT IS A RECURRING DECIMAL?</h3>

<p>A recurring decimal is a decimal in which one or more digits repeat indefinitely.</p>

<p>Examples:</p>

<ul>
<li>0.333... = 0.3̅</li>
<li>0.666... = 0.6̅</li>
<li>0.121212... = 0.12̅</li>
</ul>

<p>The dots mean that the pattern continues forever.</p>

<h3>FRACTION TO RECURRING DECIMAL</h3>

<p>Divide the numerator by the denominator.</p>

<p>Example:</p>

<p><b>1/3</b></p>

<p>1 ÷ 3 = 0.333...</p>

<p>Therefore:</p>

<p><b>1/3 = 0.333...</b></p>

<h3>CONVERTING A RECURRING DECIMAL TO A FRACTION</h3>

<p>Use algebra to eliminate the repeating part.</p>

<h3>EXAMPLE 1: 0.333...</h3>

<p>Let:</p>

<p><b>x = 0.333...</b></p>

<p>Multiply both sides by 10:</p>

<p><b>10x = 3.333...</b></p>

<p>Subtract the original equation:</p>

<p><b>10x − x = 3.333... − 0.333...</b></p>

<p>The repeating decimals cancel:</p>

<p><b>9x = 3</b></p>

<p>Divide by 9:</p>

<p><b>x = 3/9 = 1/3</b></p>

<h3>EXAMPLE 2: 0.121212...</h3>

<p>The repeating block contains two digits: <b>12</b>.</p>

<p>Let:</p>

<p><b>x = 0.121212...</b></p>

<p>Because two digits repeat, multiply by 100:</p>

<p><b>100x = 12.121212...</b></p>

<p>Subtract x:</p>

<p><b>100x − x = 12</b></p>

<p>Therefore:</p>

<p><b>99x = 12</b></p>

<p>So:</p>

<p><b>x = 12/99 = 4/33</b></p>

<h3>THE PATTERN</h3>

<p>If one digit repeats, multiply by 10.</p>

<p>If two digits repeat, multiply by 100.</p>

<p>If three digits repeat, multiply by 1000.</p>

<p>The goal is always the same: <b>shift the decimal until the repeating parts line up, then subtract.</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Using 10 when two or more digits repeat.</li>
<li>Forgetting to subtract the original equation.</li>
<li>Stopping the decimal instead of treating it as infinite.</li>
<li>Forgetting to simplify the final fraction.</li>
</ul>
`,

  [
    {
      "q": "Convert 0.666... to a fraction.",
      "hint": "Let x = 0.666... and multiply by 10.",
      "steps": [
        "Step 1: x = 0.666...",
        "Step 2: 10x = 6.666...",
        "Step 3: 10x − x = 6.",
        "Step 4: 9x = 6.",
        "Step 5: x = 6/9 = 2/3."
      ],
      "ans": "2/3",
      "why": "Multiplication by 10 shifts a single repeating digit, allowing subtraction to eliminate the repetition."
    },
    {
      "q": "Convert 0.444... to a fraction.",
      "hint": "Use x = 0.444... and multiply by 10.",
      "steps": [
        "Step 1: x = 0.444...",
        "Step 2: 10x = 4.444...",
        "Step 3: 10x − x = 4.",
        "Step 4: 9x = 4.",
        "Step 5: x = 4/9."
      ],
      "ans": "4/9",
      "why": "A single repeating digit is eliminated by subtracting x from 10x."
    },
    {
      "q": "Convert 0.121212... to a fraction.",
      "hint": "Two digits repeat, so use 100.",
      "steps": [
        "Step 1: x = 0.121212...",
        "Step 2: 100x = 12.121212...",
        "Step 3: 100x − x = 12.",
        "Step 4: 99x = 12.",
        "Step 5: x = 12/99 = 4/33."
      ],
      "ans": "4/33",
      "why": "A two-digit repeating block requires multiplication by 100 to align the repeating parts."
    },
    {
      "q": "Convert 0.090909... to a fraction.",
      "hint": "The repeating block is 09.",
      "steps": [
        "Step 1: x = 0.090909...",
        "Step 2: 100x = 9.090909...",
        "Step 3: 100x − x = 9.",
        "Step 4: 99x = 9.",
        "Step 5: x = 9/99 = 1/11."
      ],
      "ans": "1/11",
      "why": "The repeating block has two digits, so multiplying by 100 aligns the repeating portions."
    }
  ]
);
add(
  "math",
  "measurement",
  "Area of Rectangles and Squares",

  `<h2>Area of Rectangles and Squares</h2>

<h3>WHAT IS AREA?</h3>

<p>Area measures the amount of <b>flat surface</b> inside a two-dimensional shape.</p>

<p>Area is measured in <b>square units</b> such as cm², m², or km².</p>

<h3>AREA OF A RECTANGLE</h3>

<p>A rectangle has a length and a width.</p>

<p>The area is:</p>

<p><b>A = l × w</b></p>

<ul>
<li><b>A</b> = area</li>
<li><b>l</b> = length</li>
<li><b>w</b> = width</li>
</ul>

<p>Example:</p>

<p>A rectangle has length 8 cm and width 3 cm.</p>

<p>A = 8 × 3</p>

<p><b>A = 24 cm²</b></p>

<h3>WHY DO WE MULTIPLY?</h3>

<p>Imagine a rectangle divided into equal 1 cm × 1 cm squares.</p>

<p>The length tells us how many squares fit along one direction. The width tells us how many rows of squares there are.</p>

<p>Multiplying the two counts gives the total number of square units.</p>

<p>That is why:</p>

<p><b>Area = length × width</b></p>

<h3>AREA OF A SQUARE</h3>

<p>A square has four equal sides.</p>

<p>Therefore its length and width are the same.</p>

<p>So:</p>

<p><b>A = side × side = side²</b></p>

<p>Example:</p>

<p>A square has side 6 cm.</p>

<p>A = 6 × 6</p>

<p><b>A = 36 cm²</b></p>

<h3>FINDING A MISSING DIMENSION</h3>

<p>If the area and one dimension are known, rearrange the formula.</p>

<p>Since:</p>

<p><b>A = l × w</b></p>

<p>Then:</p>

<p><b>l = A ÷ w</b></p>

<p>and</p>

<p><b>w = A ÷ l</b></p>

<p>Example:</p>

<p>Area = 40 cm² and width = 5 cm.</p>

<p>Length = 40 ÷ 5</p>

<p><b>Length = 8 cm</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Adding length and width instead of multiplying.</li>
<li>Using the perimeter formula instead of the area formula.</li>
<li>Forgetting square units.</li>
<li>Using inconsistent units for the dimensions.</li>
</ul>
`,

  [
    {
      "q": "Find the area of a rectangle with length 8 cm and width 3 cm.",
      "hint": "Use A = l × w.",
      "steps": [
        "Step 1: Write the formula: A = l × w.",
        "Step 2: Substitute l = 8 and w = 3.",
        "Step 3: A = 8 × 3.",
        "Step 4: A = 24."
      ],
      "ans": "24 cm²",
      "why": "The area of a rectangle is found by multiplying its length by its width."
    },
    {
      "q": "Find the area of a square with side 7 cm.",
      "hint": "A = side².",
      "steps": [
        "Step 1: A = side × side.",
        "Step 2: A = 7 × 7.",
        "Step 3: A = 49."
      ],
      "ans": "49 cm²",
      "why": "All sides of a square are equal, so its area is side × side."
    },
    {
      "q": "A rectangle has area 45 cm² and width 5 cm. Find its length.",
      "hint": "Length = area ÷ width.",
      "steps": [
        "Step 1: A = l × w.",
        "Step 2: 45 = l × 5.",
        "Step 3: Divide both sides by 5.",
        "Step 4: l = 9."
      ],
      "ans": "9 cm",
      "why": "The missing length is found by rearranging A = l × w."
    },
    {
      "q": "A rectangle has length 9 cm and width 5 cm. What is its area?",
      "hint": "Multiply 9 by 5.",
      "steps": [
        "Step 1: A = 9 × 5.",
        "Step 2: A = 45."
      ],
      "ans": "45 cm²",
      "why": "Area measures the two-dimensional space inside the rectangle."
    },
    {
      "q": "Which formula gives the area of a rectangle?",
      "hint": "Think about its two dimensions.",
      "steps": [
        "Step 1: A rectangle has length and width.",
        "Step 2: Multiply the two dimensions.",
        "Step 3: A = l × w."
      ],
      "ans": "A = l × w",
      "why": "Rectangle area is length multiplied by width."
    }
  ]
);


add(
  "math",
  "measurement",
  "Area of Triangles",

  `<h2>Area of Triangles</h2>

<h3>THE FORMULA</h3>

<p>The area of a triangle is:</p>

<p><b>A = 1/2 × b × h</b></p>

<ul>
<li><b>A</b> = area</li>
<li><b>b</b> = base</li>
<li><b>h</b> = perpendicular height</li>
</ul>

<h3>WHAT DOES HEIGHT MEAN?</h3>

<p>The height of a triangle is the <b>perpendicular distance</b> from the chosen base to the opposite vertex.</p>

<p>Perpendicular means that the height meets the base at an angle of <b>90°</b>.</p>

<p><b>Important:</b> The height is not necessarily the sloping side of the triangle.</p>

<h3>WHY IS THERE A 1/2?</h3>

<p>A triangle can be paired with another identical triangle to form a parallelogram or rectangle with the same base and perpendicular height.</p>

<p>The triangle therefore has half the area of that corresponding shape.</p>

<p>That gives:</p>

<p><b>A = 1/2 × base × height</b></p>

<h3>WORKED EXAMPLE</h3>

<p>Find the area of a triangle with base 12 cm and perpendicular height 5 cm.</p>

<p>A = 1/2 × 12 × 5</p>

<p>A = 6 × 5</p>

<p><b>A = 30 cm²</b></p>

<h3>FINDING A MISSING DIMENSION</h3>

<p>Starting with:</p>

<p><b>A = 1/2bh</b></p>

<p>Multiply both sides by 2:</p>

<p><b>2A = bh</b></p>

<p>Therefore:</p>

<p><b>h = 2A ÷ b</b></p>

<p>and:</p>

<p><b>b = 2A ÷ h</b></p>

<p>Example:</p>

<p>Area = 40 cm² and base = 10 cm.</p>

<p>h = (2 × 40) ÷ 10</p>

<p>h = 80 ÷ 10</p>

<p><b>h = 8 cm</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Forgetting the factor 1/2.</li>
<li>Using the sloping side as the height.</li>
<li>Using a height that is not perpendicular to the chosen base.</li>
<li>Forgetting square units.</li>
</ul>
`,

  [
    {
      "q": "Find the area of a triangle with base 12 cm and height 4 cm.",
      "hint": "Use A = 1/2 × b × h.",
      "steps": [
        "Step 1: A = 1/2 × 12 × 4.",
        "Step 2: 12 ÷ 2 = 6.",
        "Step 3: 6 × 4 = 24."
      ],
      "ans": "24 cm²",
      "why": "Triangle area is half the product of its base and perpendicular height."
    },
    {
      "q": "A triangle has base 14 cm and height 6 cm. Find its area.",
      "hint": "Multiply the base and height, then divide by 2.",
      "steps": [
        "Step 1: A = 1/2 × 14 × 6.",
        "Step 2: 14 × 6 = 84.",
        "Step 3: 84 ÷ 2 = 42."
      ],
      "ans": "42 cm²",
      "why": "The factor 1/2 is required because a triangle occupies half the corresponding base-height rectangle."
    },
    {
      "q": "A triangle has area 40 cm² and base 10 cm. Find its perpendicular height.",
      "hint": "h = 2A ÷ b.",
      "steps": [
        "Step 1: h = 2A ÷ b.",
        "Step 2: h = (2 × 40) ÷ 10.",
        "Step 3: h = 80 ÷ 10.",
        "Step 4: h = 8."
      ],
      "ans": "8 cm",
      "why": "Rearranging A = 1/2bh gives h = 2A ÷ b."
    },
    {
      "q": "A triangle has area 24 cm² and height 6 cm. Find its base.",
      "hint": "b = 2A ÷ h.",
      "steps": [
        "Step 1: b = 2A ÷ h.",
        "Step 2: b = (2 × 24) ÷ 6.",
        "Step 3: b = 48 ÷ 6.",
        "Step 4: b = 8."
      ],
      "ans": "8 cm",
      "why": "The formula can be rearranged to find an unknown base."
    }
  ]
);


add(
  "math",
  "measurement",
  "Volume of Cubes and Cuboids",

  `<h2>Volume of Cubes and Cuboids</h2>

<h3>WHAT IS VOLUME?</h3>

<p>Volume measures the amount of <b>three-dimensional space</b> occupied by a solid.</p>

<p>Volume is measured in <b>cubic units</b>, such as cm³, m³, or km³.</p>

<h3>VOLUME OF A CUBOID</h3>

<p>A cuboid has three dimensions:</p>

<ul>
<li>length</li>
<li>width</li>
<li>height</li>
</ul>

<p>The formula is:</p>

<p><b>V = l × w × h</b></p>

<p>Example:</p>

<p>A cuboid has dimensions 5 cm, 3 cm and 2 cm.</p>

<p>V = 5 × 3 × 2</p>

<p><b>V = 30 cm³</b></p>

<h3>WHY DO WE MULTIPLY THREE DIMENSIONS?</h3>

<p>Area uses two dimensions because it measures a flat surface.</p>

<p>Volume uses three dimensions because a solid extends in three directions.</p>

<p>Therefore:</p>

<p><b>Length × width</b> gives the area of one layer.</p>

<p>Multiplying that layer by the <b>height</b> gives the total volume.</p>

<h3>VOLUME OF A CUBE</h3>

<p>A cube has all three dimensions equal.</p>

<p>If each side has length s:</p>

<p><b>V = s × s × s = s³</b></p>

<p>Example:</p>

<p>A cube has side 4 cm.</p>

<p>V = 4 × 4 × 4</p>

<p><b>V = 64 cm³</b></p>

<h3>FINDING A MISSING DIMENSION</h3>

<p>From:</p>

<p><b>V = lwh</b></p>

<p>We can rearrange:</p>

<p><b>l = V ÷ (wh)</b></p>

<p><b>w = V ÷ (lh)</b></p>

<p><b>h = V ÷ (lw)</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Using only two dimensions.</li>
<li>Confusing volume with surface area.</li>
<li>Using square units instead of cubic units.</li>
<li>Forgetting that a cube has three equal dimensions.</li>
</ul>
`,

  [
    {
      "q": "Find the volume of a cuboid measuring 8 cm × 3 cm × 2 cm.",
      "hint": "Multiply all three dimensions.",
      "steps": [
        "Step 1: V = l × w × h.",
        "Step 2: V = 8 × 3 × 2.",
        "Step 3: V = 48."
      ],
      "ans": "48 cm³",
      "why": "Cuboid volume is the product of its three dimensions."
    },
    {
      "q": "Find the volume of a cube with side 5 cm.",
      "hint": "V = s³.",
      "steps": [
        "Step 1: V = 5 × 5 × 5.",
        "Step 2: 5 × 5 = 25.",
        "Step 3: 25 × 5 = 125."
      ],
      "ans": "125 cm³",
      "why": "A cube has three equal dimensions, so its volume is side cubed."
    },
    {
      "q": "A cuboid has volume 60 cm³, length 5 cm and width 3 cm. Find its height.",
      "hint": "h = V ÷ (lw).",
      "steps": [
        "Step 1: h = V ÷ (lw).",
        "Step 2: h = 60 ÷ (5 × 3).",
        "Step 3: h = 60 ÷ 15.",
        "Step 4: h = 4."
      ],
      "ans": "4 cm",
      "why": "Rearranging V = lwh gives h = V ÷ (lw)."
    },
    {
      "q": "Which formula gives the volume of a cuboid?",
      "hint": "A cuboid has three dimensions.",
      "steps": [
        "Step 1: Identify the three dimensions.",
        "Step 2: Multiply length, width and height."
      ],
      "ans": "V = l × w × h",
      "why": "Volume of a cuboid is the product of its length, width and height."
    }
  ]
);


add(
  "math",
  "measurement",
  "Surface Area of Cubes and Cuboids",

  `<h2>Surface Area of Cubes and Cuboids</h2>

<h3>WHAT IS SURFACE AREA?</h3>

<p>Surface area is the <b>total area of all the outside faces</b> of a three-dimensional object.</p>

<p>It is measured in <b>square units</b>, such as cm² or m².</p>

<p>Do not confuse surface area with volume:</p>

<ul>
<li><b>Surface area</b> measures outside faces.</li>
<li><b>Volume</b> measures three-dimensional space.</li>
</ul>

<h3>SURFACE AREA OF A CUBE</h3>

<p>A cube has 6 equal square faces.</p>

<p>Area of one face:</p>

<p><b>s²</b></p>

<p>Since there are 6 faces:</p>

<p><b>SA = 6s²</b></p>

<p>Example:</p>

<p>A cube has side 4 cm.</p>

<p>SA = 6 × 4²</p>

<p>SA = 6 × 16</p>

<p><b>SA = 96 cm²</b></p>

<h3>SURFACE AREA OF A CUBOID</h3>

<p>A cuboid has three pairs of equal faces.</p>

<p>The three different face areas are:</p>

<ul>
<li>lw</li>
<li>lh</li>
<li>wh</li>
</ul>

<p>Each occurs twice.</p>

<p>Therefore:</p>

<p><b>SA = 2(lw + lh + wh)</b></p>

<h3>WORKED EXAMPLE</h3>

<p>Find the surface area of a cuboid with length 5 cm, width 3 cm and height 2 cm.</p>

<p>SA = 2(lw + lh + wh)</p>

<p>SA = 2[(5 × 3) + (5 × 2) + (3 × 2)]</p>

<p>SA = 2(15 + 10 + 6)</p>

<p>SA = 2 × 31</p>

<p><b>SA = 62 cm²</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Calculating volume instead of surface area.</li>
<li>Forgetting that opposite faces occur in pairs.</li>
<li>Forgetting the factor 2 in the cuboid formula.</li>
<li>Using cubic units instead of square units.</li>
</ul>
`,

  [
    {
      "q": "Find the surface area of a cube with side 5 cm.",
      "hint": "Use SA = 6s².",
      "steps": [
        "Step 1: SA = 6 × 5².",
        "Step 2: 5² = 25.",
        "Step 3: 6 × 25 = 150."
      ],
      "ans": "150 cm²",
      "why": "A cube has six equal square faces."
    },
    {
      "q": "Find the surface area of a cube with side 3 cm.",
      "hint": "Square the side, then multiply by 6.",
      "steps": [
        "Step 1: 3² = 9.",
        "Step 2: 6 × 9 = 54."
      ],
      "ans": "54 cm²",
      "why": "The six faces of the cube each have area 9 cm²."
    },
    {
      "q": "Find the surface area of a cuboid with length 4 cm, width 3 cm and height 2 cm.",
      "hint": "Use SA = 2(lw + lh + wh).",
      "steps": [
        "Step 1: lw = 4 × 3 = 12.",
        "Step 2: lh = 4 × 2 = 8.",
        "Step 3: wh = 3 × 2 = 6.",
        "Step 4: Add: 12 + 8 + 6 = 26.",
        "Step 5: Multiply by 2: 2 × 26 = 52."
      ],
      "ans": "52 cm²",
      "why": "The three different face areas each occur twice."
    },
    {
      "q": "Which formula gives the surface area of a cuboid?",
      "hint": "There are three pairs of equal faces.",
      "steps": [
        "Step 1: Identify the three face areas: lw, lh and wh.",
        "Step 2: Add them.",
        "Step 3: Multiply by 2."
      ],
      "ans": "2(lw + lh + wh)",
      "why": "A cuboid has two faces of each of its three different dimensions."
    }
  ]
);


add(
  "math",
  "measurement",
  "Measurement Units and Dimensions",

  `<h2>Measurement Units and Dimensions</h2>

<h3>WHY UNITS MATTER</h3>

<p>The numerical answer alone is not enough. The unit tells us <b>what kind of quantity</b> has been measured.</p>

<p>For example:</p>

<ul>
<li>5 cm measures length.</li>
<li>5 cm² measures area.</li>
<li>5 cm³ measures volume.</li>
</ul>

<p>These are different quantities even though the number is the same.</p>

<h3>LENGTH</h3>

<p>Length measures one dimension.</p>

<p>Common units include:</p>

<ul>
<li>mm</li>
<li>cm</li>
<li>m</li>
<li>km</li>
</ul>

<p>Length uses ordinary units such as <b>cm</b> or <b>m</b>.</p>

<h3>AREA</h3>

<p>Area measures two dimensions.</p>

<p>Therefore its units are squared:</p>

<ul>
<li>cm²</li>
<li>m²</li>
<li>km²</li>
</ul>

<p>For example:</p>

<p>4 cm × 3 cm = 12 cm²</p>

<h3>VOLUME</h3>

<p>Volume measures three dimensions.</p>

<p>Therefore its units are cubed:</p>

<ul>
<li>cm³</li>
<li>m³</li>
<li>km³</li>
</ul>

<p>For example:</p>

<p>4 cm × 3 cm × 2 cm = 24 cm³</p>

<h3>AREA VS VOLUME</h3>

<p>Area uses <b>two</b> dimensions:</p>

<p><b>length × width</b></p>

<p>Volume uses <b>three</b> dimensions:</p>

<p><b>length × width × height</b></p>

<h3>CONVERTING SQUARED UNITS</h3>

<p>When converting area units, the conversion factor must also be squared.</p>

<p>For example:</p>

<p>1 m = 100 cm</p>

<p>Therefore:</p>

<p><b>1 m² = 100² cm² = 10,000 cm²</b></p>

<p>It is incorrect to say 1 m² = 100 cm².</p>

<h3>CONVERTING CUBIC UNITS</h3>

<p>When converting volume units, the conversion factor must be cubed.</p>

<p>Since:</p>

<p>1 m = 100 cm</p>

<p>Then:</p>

<p><b>1 m³ = 100³ cm³ = 1,000,000 cm³</b></p>

<h3>COMMON MISTAKES</h3>

<ul>
<li>Writing cm instead of cm² for area.</li>
<li>Writing cm² instead of cm³ for volume.</li>
<li>Using the length conversion factor directly for area.</li>
<li>Using the length conversion factor directly for volume.</li>
<li>Forgetting to make units consistent before calculating.</li>
</ul>
`,

  [
    {
      "q": "What unit should be used for the area of a rectangle measured in centimetres?",
      "hint": "Area uses squared units.",
      "steps": [
        "Step 1: The quantity is area.",
        "Step 2: Area uses square units.",
        "Step 3: Therefore the unit is cm²."
      ],
      "ans": "cm²",
      "why": "Area measures two dimensions, so its units are squared."
    },
    {
      "q": "What unit should be used for the volume of a cuboid measured in centimetres?",
      "hint": "Volume uses three dimensions.",
      "steps": [
        "Step 1: The quantity is volume.",
        "Step 2: Volume uses cubic units.",
        "Step 3: Therefore the unit is cm³."
      ],
      "ans": "cm³",
      "why": "Volume measures three dimensions, so its units are cubed."
    },
    {
      "q": "Convert 1 m² to cm².",
      "hint": "1 m = 100 cm, then square the conversion factor.",
      "steps": [
        "Step 1: 1 m = 100 cm.",
        "Step 2: Square both sides.",
        "Step 3: 1 m² = 100² cm².",
        "Step 4: 100² = 10,000."
      ],
      "ans": "10,000 cm²",
      "why": "Area conversion factors must be squared."
    },
    {
      "q": "Convert 1 m³ to cm³.",
      "hint": "1 m = 100 cm, then cube the conversion factor.",
      "steps": [
        "Step 1: 1 m = 100 cm.",
        "Step 2: Cube both sides.",
        "Step 3: 1 m³ = 100³ cm³.",
        "Step 4: 100³ = 1,000,000."
      ],
      "ans": "1,000,000 cm³",
      "why": "Volume conversion factors must be cubed."
    },
    {
      "q": "Which is larger: 1 m² or 100 cm²?",
      "hint": "Convert 1 m² into cm².",
      "steps": [
        "Step 1: 1 m² = 10,000 cm².",
        "Step 2: Compare 10,000 cm² and 100 cm².",
        "Step 3: 10,000 cm² is larger."
      ],
      "ans": "1 m²",
      "why": "Squared units require the length conversion factor to be squared."
    }
  ]
);
add(
  "math",
  "graphs",
  "Coordinate plane basics",

  `<h2>Coordinate Plane Basics</h2>

<p>The coordinate plane is used to locate points using numbers.</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>The plane has two number lines: X-axis (horizontal) and Y-axis (vertical).</li>
<li>Points are written as (x, y).</li>
<li>X value shows left/right movement.</li>
<li>Y value shows up/down movement.</li>
<li>The center point is called the origin (0,0).</li>
</ul>

<p><b> Key idea:</b> Every point is a location made from two numbers.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Reversing (x, y) as (y, x)</li>
<li>Confusing axis directions</li>
<li>Forgetting origin is (0,0)</li>
<li>Mixing up horizontal and vertical axes</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> Identify origin<br>
Step 1: Locate center point<br>
Step 2: Coordinates are (0,0)<br>
<b>Answer: (0,0)</b>
</li>

<li>
<b>Example 2:</b> Horizontal axis<br>
Step 1: Identify left-right line<br>
Step 2: This is the X-axis<br>
<b>Answer: X-axis</b>
</li>

<li>
<b>Example 3:</b> Vertical axis<br>
Step 1: Identify up-down line<br>
Step 2: This is the Y-axis<br>
<b>Answer: Y-axis</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>GPS and map navigation systems</li>
<li>Computer graphics positioning</li>
<li>Game development movement systems</li>
<li>Engineering design layouts</li>
</ul>
`,

  [
    {
      "q": "Find the distance between points (2,3) and (6,7)",
      "hint": "distance formula",
      "steps": [
        "Step 1: Use d = √((x₂ − x₁)² + (y₂ − y₁)²)",
        "Step 2: Substitute values (6−2) and (7−3)",
        "Step 3: Compute 4² and 4²",
        "Step 4: Add results",
        "Step 5: Take square root"
      ],
      "ans": "√32 = 4√2",
      "why": "Distance between two points is found using Euclidean formula"
    },
    {
      "q": "Find midpoint of (2,4) and (8,10)",
      "hint": "midpoint formula",
      "steps": [
        "Step 1: Use M = ((x₁ + x₂)/2, (y₁ + y₂)/2)",
        "Step 2: Substitute values",
        "Step 3: Compute x-coordinate",
        "Step 4: Compute y-coordinate",
        "Step 5: Form midpoint"
      ],
      "ans": "(5,7)",
      "why": "Midpoint is average of coordinates"
    },
    {
      "q": "Determine the coordinates after moving from (3,5) by +4 in x and −2 in y",
      "hint": "translation",
      "steps": [
        "Step 1: Start at (3,5)",
        "Step 2: Add 4 to x-coordinate",
        "Step 3: Subtract 2 from y-coordinate",
        "Step 4: Write new coordinates"
      ],
      "ans": "(7,3)",
      "why": "Translation shifts points by vector addition"
    },
    {
      "q": "Find slope between points (1,2) and (5,10)",
      "hint": "rise over run",
      "steps": [
        "Step 1: Use m = (y₂ − y₁)/(x₂ − x₁)",
        "Step 2: Substitute values",
        "Step 3: Compute numerator 8",
        "Step 4: Compute denominator 4",
        "Step 5: Simplify fraction"
      ],
      "ans": "2",
      "why": "Slope measures rate of change between two points"
    },
    {
      "q": "Find equation of line passing through (0,0) with slope 3",
      "hint": "y = mx + c",
      "steps": [
        "Step 1: Use y = mx + c",
        "Step 2: Substitute m = 3",
        "Step 3: Use point (0,0) to find c",
        "Step 4: Solve for c",
        "Step 5: Write final equation"
      ],
      "ans": "y = 3x",
      "why": "Line equation is determined by slope and intercept"
    }
  ]
);

add(
  "math",
  "graphs",
  "Plotting points",

  `<h2>Plotting Points</h2>

<p>Plotting means marking a point on the coordinate plane using (x, y).</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Always start from origin (0,0).</li>
<li>Move along X-axis first (left/right).</li>
<li>Then move along Y-axis (up/down).</li>
<li>Positive x → right, negative x → left.</li>
<li>Positive y → up, negative y → down.</li>
</ul>

<p><b> Key idea:</b> X always comes before Y.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Moving Y before X</li>
<li>Mixing negative directions</li>
<li>Plotting wrong quadrant</li>
<li>Confusing (x, y) order</li>
</ul>
<h3> WORKED EXAMPLES (WITH CARTESIAN PLANE)</h3>

<ul>

<li>
<b>Example 1:</b> (2,3)<br>

Step 1: Move 2 units right<br>
Step 2: Move 3 units up<br>

<pre>
          y
          ↑
     4    |
     3    |      ● (2,3)
     2    |     /
     1    |    /
  -------O----------------→ x
     0    |  1  2  3
</pre>

<b>Answer: (2,3)</b>
</li>

<li>
<b>Example 2:</b> (-2,1)<br>

Step 1: Move 2 units left<br>
Step 2: Move 1 unit up<br>

<pre>
          y
          ↑
     3    |
     2    |
     1    |   ● (-2,1)
     0    |
  -------O----------------→ x
        -3  -2  -1
</pre>

<b>Answer: (-2,1)</b>
</li>

<li>
<b>Example 3:</b> (0,4)<br>

Step 1: Stay on Y-axis<br>
Step 2: Move 4 units up<br>

<pre>
          y
          ↑
     5    |
     4    |   ● (0,4)
     3    |
     2    |
     1    |
  -------O----------------→ x
     0
</pre>

<b>Answer: (0,4)</b>
</li>

</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>GPS location mapping</li>
<li>Computer graphics positioning</li>
<li>Game character movement</li>
<li>Engineering design layouts</li>
</ul>
`,

  [
    {
      "q": "Locate the point (3, -2) on a coordinate plane and describe its movement from origin",
      "hint": "x then y movement",
      "steps": [
        "Step 1: Start at origin (0,0)",
        "Step 2: Move +3 units along x-axis",
        "Step 3: Move −2 units along y-axis",
        "Step 4: Mark final position on plane"
      ],
      "ans": "(3, -2)",
      "why": "Coordinates represent horizontal (x) and vertical (y) displacement from origin"
    },
    {
      "q": "Find coordinates after moving 5 units right and 4 units up from origin",
      "hint": "directional movement",
      "steps": [
        "Step 1: Start at (0,0)",
        "Step 2: Move +5 along x-axis",
        "Step 3: Move +4 along y-axis",
        "Step 4: Plot final point"
      ],
      "ans": "(5, 4)",
      "why": "Positive x and y values place the point in the first quadrant"
    },
    {
      "q": "Determine location of point (0, -6) on coordinate plane",
      "hint": "axis identification",
      "steps": [
        "Step 1: Check x = 0",
        "Step 2: Move only along y-axis",
        "Step 3: Locate negative direction",
        "Step 4: Identify axis position"
      ],
      "ans": "On the negative Y-axis",
      "why": "x = 0 means the point lies directly on the y-axis"
    },
    {
      "q": "Determine location of point (4, 0) on coordinate plane",
      "hint": "axis rule",
      "steps": [
        "Step 1: Check y = 0",
        "Step 2: Move only along x-axis",
        "Step 3: Locate positive direction",
        "Step 4: Identify axis position"
      ],
      "ans": "On the positive X-axis",
      "why": "y = 0 means the point lies on the x-axis"
    },
    {
      "q": "Identify the reference starting point for all coordinate plotting",
      "hint": "origin concept",
      "steps": [
        "Step 1: Locate intersection of axes",
        "Step 2: Identify x = 0 and y = 0",
        "Step 3: Mark central reference point"
      ],
      "ans": "(0,0)",
      "why": "All coordinates are measured from the origin"
    }
  ]
);

add(
  "math",
  "graphs",
  "Line graphs",

  `<h2>Line Graphs</h2>

<p>A line graph shows how values change over time or sequence.</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Used to show trends (increase/decrease).</li>
<li>Points are plotted first, then joined with straight lines.</li>
<li>X-axis usually shows time or order.</li>
<li>Y-axis shows values (sales, temperature, etc).</li>
</ul>

<p><b> Key idea:</b> Line graphs show change over time.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Not labeling axes</li>
<li>Skipping scale</li>
<li>Joining wrong points</li>
</ul>
<h3> WORKED EXAMPLES (GRAPH + VISUAL)</h3>

<ul>

<li>
<b>Example 1:</b> Steps to draw a line graph from data points<br>

Step 1: Draw x-axis (horizontal) and y-axis (vertical)<br>
Step 2: Mark equal scale on both axes<br>
Step 3: Plot each coordinate point accurately<br>
Step 4: Connect points in correct order<br>

<pre>
          y
          ↑
     5    |
     4    |        ● (3,4)
     3    |      ● (2,3)
     2    |    ● (1,2)
     1    |  ● (0,1)
  -------O------------------------→ x
     0    1    2    3
</pre>

<b>Answer: A plotted coordinate line graph showing change between points</b>
</li>

<br>

<li>
<b>Example 2:</b> What information does a line graph represent?<br>

Step 1: Observe plotted coordinates<br>
Step 2: Follow direction of connected line<br>
Step 3: Compare rise or fall in values<br>
Step 4: Identify pattern behavior over time or variable change<br>

<pre>
          y
          ↑
     5    |        ●
     4    |      ●
     3    |    ●
     2    |  ●
     1    |●
  -------O------------------------→ x
     0
</pre>

<b>Answer: It represents a pattern or trend in data (increase or decrease)</b>
</li>

<br>

<li>
<b>Example 3:</b> Why are points connected in a graph?<br>

Step 1: Identify separate data values<br>
Step 2: Observe order of values on x-axis<br>
Step 3: Connect points to show continuous change<br>
Step 4: Form a relationship model between variables<br>

<pre>
          y
          ↑
     5    |        ●──────●
     4    |      ●
     3    |    ●
     2    |  ●
     1    |●
  -------O------------------------→ x
     0
</pre>

<b>Answer: To show continuity and relationship between data points</b>
</li>

</ul>
`,

  [
    {
      "q": "Plot a line graph for points (1,2), (2,3), (3,5)",
      "hint": "coordinate plotting",
      "steps": [
        "Step 1: Draw x-axis and y-axis",
        "Step 2: Plot (1,2), (2,3), (3,5)",
        "Step 3: Check correct positions on plane",
        "Step 4: Join points in order with straight lines"
      ],
      "ans": "A rising line graph",
      "why": "Increasing y-values show upward trend"
    },
    {
      "q": "Identify change when graph goes from (1,5) to (3,5)",
      "hint": "constant value",
      "steps": [
        "Step 1: Compare y-values at both points",
        "Step 2: 5 and 5 are equal",
        "Step 3: Determine slope behavior",
        "Step 4: Classify trend"
      ],
      "ans": "No change (constant graph)",
      "why": "Equal y-values form a horizontal line"
    },
    {
      "q": "Determine trend of points (1,4), (2,3), (3,2)",
      "hint": "decreasing pattern",
      "steps": [
        "Step 1: Observe y-values",
        "Step 2: 4 → 3 → 2",
        "Step 3: Check direction of change",
        "Step 4: Classify graph behavior"
      ],
      "ans": "Decreasing trend",
      "why": "Y-values reduce as x increases"
    },
    {
      "q": "Find slope between points (1,1) and (4,7)",
      "hint": "rise over run",
      "steps": [
        "Step 1: Use m = (y₂ − y₁)/(x₂ − x₁)",
        "Step 2: Substitute values",
        "Step 3: Compute 7 − 1 = 6",
        "Step 4: Compute 4 − 1 = 3",
        "Step 5: Simplify fraction"
      ],
      "ans": "2",
      "why": "Slope measures rate of change in a line graph"
    },
    {
      "q": "Find missing point pattern if graph is linear: (1,2), (2,?), (3,6)",
      "hint": "linear pattern",
      "steps": [
        "Step 1: Observe change from 1 to 3 in x",
        "Step 2: Observe change from 2 to 6 in y",
        "Step 3: Determine pattern increase",
        "Step 4: Find middle value"
      ],
      "ans": "(2,4)",
      "why": "Linear graphs have constant rate of change"
    }
  ]
);

add(
  "math",
  "graphs",
  "Gradient",

  `<h2>Gradient (Slope)</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Gradient measures how steep a line is on a graph.
It shows how much the vertical value changes compared to the horizontal change.
</p>
<h3> GRADIENT (SLOPE) — CALCULATION VIEW</h3>

<pre>
Gradient = rise ÷ run
m = (y₂ − y₁) / (x₂ − x₁)
</pre>

<ul>
<li><b>Rise</b> = y₂ − y₁ (vertical change)</li>
<li><b>Run</b> = x₂ − x₁ (horizontal change)</li>
<li><b>Gradient (m)</b> = rate of change of y with respect to x</li>
</ul>

<p><b>Direction rules:</b></p>
<p>
m &gt; 0 → line rises upward<br>
m &lt; 0 → line falls downward<br>
m = 0 → horizontal line<br>
Undefined → vertical line
</p>

<p><b> Key idea:</b> Larger absolute value of m = steeper line</p>

<h3> KEY FACTS (CALCULATION BASED)</h3>
<ul>
<li>Gradient compares change between two points</li>
<li>Uses subtraction of coordinates</li>
<li>Always simplifies to a number or fraction</li>
<li>Same gradient → parallel lines</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using x₂ − x₁ in wrong order</li>
<li>Using y₂ − y₁ incorrectly swapped</li>
<li>Forgetting negative signs</li>
<li>Dividing run by rise instead of rise by run</li>
</ul>

<h3> WORKED EXAMPLES (STEP-BY-STEP CALCULATION)</h3>

<ul>

<li>
<b>Example 1:</b> (2,3) and (6,11)<br>

Step 1: y₂ − y₁ = 11 − 3 = 8<br>
Step 2: x₂ − x₁ = 6 − 2 = 4<br>
Step 3: m = 8 ÷ 4<br>
<b>Answer: m = 2</b>
</li>

<br>

<li>
<b>Example 2:</b> (1,5) and (4,11)<br>

Step 1: y₂ − y₁ = 11 − 5 = 6<br>
Step 2: x₂ − x₁ = 4 − 1 = 3<br>
Step 3: m = 6 ÷ 3<br>
<b>Answer: m = 2</b>
</li>

<br>

<li>
<b>Example 3:</b> (3,10) and (7,2)<br>

Step 1: y₂ − y₁ = 2 − 10 = −8<br>
Step 2: x₂ − x₁ = 7 − 3 = 4<br>
Step 3: m = −8 ÷ 4<br>
<b>Answer: m = −2</b>
</li>

</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Road slope design (hills and ramps)</li>
<li>Building construction angles</li>
<li>Physics: speed vs time graphs</li>
<li>Economics: rate of change in profit</li>
</ul>
`,

  [
    {
      "q": "Find gradient when rise = 12 and run = 3",
      "hint": "m = rise ÷ run",
      "steps": [
        "Step 1: Write m = rise ÷ run",
        "Step 2: Substitute m = 12 ÷ 3",
        "Step 3: Compute division",
        "Step 4: Simplify result"
      ],
      "ans": "4",
      "why": "Gradient measures vertical change per unit horizontal change"
    },
    {
      "q": "Find gradient between points (2,5) and (6,1)",
      "hint": "use coordinate formula",
      "steps": [
        "Step 1: Use m = (y₂ − y₁)/(x₂ − x₁)",
        "Step 2: Substitute values (1 − 5)/(6 − 2)",
        "Step 3: Compute numerator −4",
        "Step 4: Compute denominator 4",
        "Step 5: Simplify fraction"
      ],
      "ans": "-1",
      "why": "Gradient is found using change in y over change in x"
    },
    {
      "q": "Interpret gradient m = -3 in a line",
      "hint": "direction",
      "steps": [
        "Step 1: Identify sign of gradient",
        "Step 2: m < 0 indicates negative slope",
        "Step 3: For each 1 step right, y decreases by 3",
        "Step 4: Describe direction"
      ],
      "ans": "Line decreases steeply",
      "why": "Negative gradient shows downward movement from left to right"
    },
    {
      "q": "Interpret gradient m = 0",
      "hint": "flat line",
      "steps": [
        "Step 1: Check gradient value",
        "Step 2: m = 0 means no vertical change",
        "Step 3: y-value remains constant",
        "Step 4: Describe graph"
      ],
      "ans": "Horizontal line",
      "why": "Zero gradient means constant y-value across x"
    }
  ]
);

add(
  "math",
  "graphs",
  "Applications of graphs",

  `<h2>Applications of Graphs</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Graphs help represent real-world data clearly and quickly.
They transform numbers into visual patterns that are easier to understand.
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Graphs simplify large sets of data</li>
<li>Used in science, business, weather, and population studies</li>
<li>Help in comparing values and identifying trends</li>
<li>Useful for prediction and decision-making</li>
</ul>

<p><b> Key idea:</b> Graphs turn data into visual meaning.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Ignoring axis labels</li>
<li>Misinterpreting upward/downward trends</li>
<li>Confusing bar graphs, line graphs, and pie charts</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1: Weather</b><br>
Step 1: Record daily temperature<br>
Step 2: Plot values over time<br>
Step 3: Observe trend<br>
<b>Answer: Weather pattern becomes visible</b>
</li>

<li>
<b>Example 2: Business</b><br>
Step 1: Collect sales data<br>
Step 2: Plot graph over months<br>
Step 3: Identify increase or decrease<br>
<b>Answer: Sales trend analysis</b>
</li>

<li>
<b>Example 3: Population</b><br>
Step 1: Record yearly population<br>
Step 2: Plot growth graph<br>
Step 3: Analyze increase rate<br>
<b>Answer: Population growth pattern</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Weather forecasting systems</li>
<li>Business performance tracking</li>
<li>Population growth studies</li>
<li>Scientific experiment analysis</li>
</ul>
`,

  [
    {
      "q": "Why are graphs important?",
      "hint": "show data visually",
      "ans": "data visualization",
      "why": "Graphs convert numerical data into visual form, making patterns and trends easier to understand"
    },
    {
      "q": "What do graphs help us identify?",
      "hint": "look at shape of graph",
      "ans": "patterns and trends",
      "why": "Graphs show how data changes over time or categories, revealing hidden patterns"
    },
    {
      "q": "Give one real-life use of graphs",
      "hint": "daily applications",
      "ans": "weather forecasting or business analysis",
      "why": "Graphs are widely used to analyze weather, sales, population, and scientific data"
    }
  ]
);

add(
  "math",
  "ratio",
  "Ratio basics",

  `<h2>Ratio Basics</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A ratio compares two or more quantities of the same type.
It shows how much of one thing exists compared to another.
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>A ratio shows relative size, not actual total value</li>
<li>Written as a : b, where order matters</li>
<li>All quantities must be in the same unit before comparing</li>
<li>Simplify ratios using the highest common factor (HCF)</li>
</ul>

<p><b> Key idea:</b> Ratio is a comparison, not a total amount.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Not converting units before forming ratio</li>
<li>Reversing order of terms (a:b ≠ b:a)</li>
<li>Failing to simplify completely</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> 10:20<br>
Step 1: HCF = 10<br>
Step 2: 10 ÷ 10 : 20 ÷ 10<br>
<b>Answer: 1:2</b>
</li>

<li>
<b>Example 2:</b> 6 apples : 3 apples<br>
Step 1: 6:3<br>
Step 2: Divide by 3<br>
<b>Answer: 2:1</b>
</li>

<li>
<b>Example 3:</b> 15:5<br>
Step 1: HCF = 5<br>
Step 2: 15 ÷ 5 : 5 ÷ 5<br>
<b>Answer: 3:1</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Mixing ingredients in cooking</li>
<li>Map scaling and models</li>
<li>Financial comparisons</li>
<li>Population comparisons in statistics</li>
</ul>
`,

  [
    {
      "q": "Simplify the ratio 24:36",
      "hint": "HCF method",
      "steps": [
        "Step 1: Find HCF of 24 and 36",
        "Step 2: HCF = 12",
        "Step 3: Divide both terms by 12",
        "Step 4: 24 ÷ 12 and 36 ÷ 12",
        "Step 5: Write simplified ratio"
      ],
      "ans": "2:3",
      "why": "Ratios are simplified by dividing both terms by their highest common factor"
    },
    {
      "q": "Divide 60 in the ratio 2:3",
      "hint": "total parts method",
      "steps": [
        "Step 1: Add ratio parts 2 + 3 = 5",
        "Step 2: Divide 60 by 5",
        "Step 3: One part = 12",
        "Step 4: Multiply 2 × 12 and 3 × 12",
        "Step 5: Find each share"
      ],
      "ans": "24 and 36",
      "why": "Total is split according to ratio parts"
    },
    {
      "q": "Find ratio of 45 to 15 in simplest form",
      "hint": "divide both terms",
      "steps": [
        "Step 1: Write ratio 45:15",
        "Step 2: Find HCF = 15",
        "Step 3: Divide both terms by 15",
        "Step 4: Simplify result"
      ],
      "ans": "3:1",
      "why": "Simplification reduces ratio to smallest whole numbers"
    },
    {
      "q": "Check if ratios 4:6 and 2:3 are equivalent",
      "hint": "compare simplified forms",
      "steps": [
        "Step 1: Simplify 4:6",
        "Step 2: Divide both by 2 → 2:3",
        "Step 3: Compare with 2:3",
        "Step 4: Conclude equivalence"
      ],
      "ans": "Yes, they are equivalent",
      "why": "Equivalent ratios reduce to the same simplest form"
    }
  ]
);

add(
  "math",
  "ratio",
  "Dividing in ratio",

  `<h2>Dividing in Ratio</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A quantity is shared into parts according to a given ratio.
Each part of the ratio represents a proportional share of the total.
</p>

<h3> STEP-BY-STEP METHOD</h3>
<ul>
  <li><b>Step 1:</b> Add all parts of the ratio</li>
  <li><b>Step 2:</b> Divide the total by the sum of parts (unit value)</li>
  <li><b>Step 3:</b> Multiply each ratio part by the unit value</li>
</ul>

<p><b> Key idea:</b> Each ratio part represents a share of the total.</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
  <li>Ratios split quantities into proportional parts</li>
  <li>The total must always be preserved</li>
  <li>Each part is scaled using the unit value</li>
  <li>Used in sharing money, resources, and quantities</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
  <li>Forgetting to add ratio parts</li>
  <li>Dividing incorrectly before finding unit value</li>
  <li>Mixing up final shares</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> 50 in 1:1<br>
Step 1: 1 + 1 = 2<br>
Step 2: 50 ÷ 2 = 25<br>
Step 3: 1×25 = 25, 1×25 = 25<br>
<b>Answer: 25 and 25</b>
</li>

<li>
<b>Example 2:</b> 60 in 2:1<br>
Step 1: 2 + 1 = 3<br>
Step 2: 60 ÷ 3 = 20<br>
Step 3: 40 and 20<br>
<b>Answer: 40 and 20</b>
</li>

<li>
<b>Example 3:</b> 90 in 3:2<br>
Step 1: 3 + 2 = 5<br>
Step 2: 90 ÷ 5 = 18<br>
Step 3: 54 and 36<br>
<b>Answer: 54 and 36</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Sharing profits in business partnerships</li>
<li>Dividing inheritance or property</li>
<li>Splitting resources in teamwork</li>
<li>Cooking recipe adjustments</li>
</ul>
`,

  [
    {
      "q": "Divide 120 in the ratio 3:2",
      "hint": "total parts method",
      "steps": [
        "Step 1: Add ratio parts 3 + 2 = 5",
        "Step 2: Divide 120 by 5",
        "Step 3: One part = 24",
        "Step 4: Multiply 3 × 24",
        "Step 5: Multiply 2 × 24",
        "Step 6: Write final split"
      ],
      "ans": "72 and 48",
      "why": "Total is distributed proportionally using ratio parts"
    },
    {
      "q": "Divide 250 in the ratio 5:3",
      "hint": "part value method",
      "steps": [
        "Step 1: Add ratio parts 5 + 3 = 8",
        "Step 2: Divide 250 by 8",
        "Step 3: One part = 31.25",
        "Step 4: Multiply 5 × 31.25",
        "Step 5: Multiply 3 × 31.25",
        "Step 6: Write final values"
      ],
      "ans": "156.25 and 93.75",
      "why": "Each share is proportional to its ratio weight"
    },
    {
      "q": "Check if 40:60 simplifies correctly to 2:3",
      "hint": "simplification check",
      "steps": [
        "Step 1: Write ratio 40:60",
        "Step 2: Find HCF = 20",
        "Step 3: Divide both terms by 20",
        "Step 4: Get simplified form",
        "Step 5: Compare with 2:3"
      ],
      "ans": "Yes, it simplifies to 2:3",
      "why": "Both ratios represent the same proportional relationship"
    },
    {
      "q": "Find value of one part if 84 is divided in ratio 2:5",
      "hint": "total parts method",
      "steps": [
        "Step 1: Add ratio parts 2 + 5 = 7",
        "Step 2: Divide 84 by 7",
        "Step 3: One part = 12",
        "Step 4: Use part value for distribution"
      ],
      "ans": "12",
      "why": "Each unit of ratio is found by dividing total by sum of parts"
    }
  ]
);

add(
  "math",
  "ratio",
  "Proportion",

  `<h2>Proportion</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A proportion shows that two ratios are equal.
It helps us compare quantities and solve missing values.
</p>
<pre>a : b = c : d  →  a/b = c/
</pre>
<p>Using cross multiplication:</p>
<pre>a × d = b × c</pre>
<p><b> Key idea:</b> Proportion means two equal ratios.</p>
<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Proportion compares two equal ratios</li>
<li>Cross multiplication is used to find unknown values</li>
<li>Always simplify final answers</li>
<li>Useful in scaling and comparison problems</li>
</ul>
<h3> COMMON MISTAKES</h3>
<ul>
<li>Mixing up numerator and denominator</li>
<li>Incorrect cross multiplication</li>
<li>Forgetting to simplify final result</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 2:4 = x:8<br>
Step 1: 2 × 8 = 4x<br>
Step 2: 16 = 4x<br>
Step 3: x = 4<br>
<b>Answer: 4</b>
</li>
<li>
<b>Example 2:</b> 3:5 = x:10<br>
Step 1: 3 × 10 = 5x<br>
Step 2: 30 = 5x<br>
Step 3: x = 6<br>
<b>Answer: 6</b>
</li>
<li>
<b>Example 3:</b> 4:6 = 2:x<br>
Step 1: 4x = 12<br>
Step 2: x = 3<br>
<b>Answer: 3</b>
</li>
</ul>
`,

  [
    {
      "q": "Solve for x: 6:9 = x:27",
      "hint": "cross multiplication",
      "steps": [
        "Step 1: Write proportion 6/9 = x/27",
        "Step 2: Cross multiply → 6 × 27 = 9x",
        "Step 3: Compute 162 = 9x",
        "Step 4: Divide both sides by 9",
        "Step 5: Solve for x"
      ],
      "ans": "18",
      "why": "Cross multiplication removes ratios and forms a solvable equation"
    },
    {
      "q": "Solve for x: 8:12 = 20:x",
      "hint": "diagonal multiplication",
      "steps": [
        "Step 1: Write 8/12 = 20/x",
        "Step 2: Cross multiply → 8x = 240",
        "Step 3: Divide both sides by 8",
        "Step 4: Solve for x"
      ],
      "ans": "30",
      "why": "Proportions are solved by equating cross products"
    },
    {
      "q": "Check if 3:5 and 12:20 form a proportion",
      "hint": "simplify ratio",
      "steps": [
        "Step 1: Simplify 12:20 by dividing by 4",
        "Step 2: Get 3:5",
        "Step 3: Compare both ratios",
        "Step 4: Confirm equality"
      ],
      "ans": "Yes, they form a proportion",
      "why": "Equivalent ratios form a valid proportion"
    },
    {
      "q": "What is the value of x in 7/ x = 14/28",
      "hint": "cross multiply",
      "steps": [
        "Step 1: Cross multiply → 7 × 28 = 14x",
        "Step 2: Compute 196 = 14x",
        "Step 3: Divide both sides by 14",
        "Step 4: Solve for x"
      ],
      "ans": "14",
      "why": "Cross multiplication converts proportion into linear equation"
    }
  ]
);

add(
  "math",
  "ratio",
  "Direct proportion",

  `<h2>Direct Proportion</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
In direct proportion, when one quantity increases, the other increases at the same rate.
They maintain a constant ratio.
</p>
<pre>y ∝ x  →  y = kx</pre>
<p><b> Key idea:</b> Same direction change (increase → increase, decrease → decrease)</p>
<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Direct proportion means both variables change together</li>
<li>The ratio y/x is always constant</li>
<li>Find unit value first for easier solving</li>
<li>Used in pricing, speed, and scaling problems</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 2 pens = 10<br>
Step 1: 1 pen = 10 ÷ 2 = 5<br>
Step 2: 4 pens = 5 × 4 = 20<br>
<b>Answer: 20</b>
</li>
<li>
<b>Example 2:</b> 3 kg = 30<br>
Step 1: 1 kg = 10<br>
Step 2: 6 kg = 60<br>
<b>Answer: 60</b>
</li>
<li>
<b>Example 3:</b> 5 items = 25<br>
Step 1: 1 item = 5<br>
Step 2: 10 items = 50<br>
<b>Answer: 50</b>
</li>
</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Shopping cost calculations</li>
<li>Fuel consumption vs distance</li>
<li>Work and wage calculations</li>
<li>Recipe scaling in cooking</li>
</ul>
`,

  [
    {
      "q": "If 6 notebooks cost 90, find the cost of 1 notebook",
      "hint": "unit rate",
      "steps": [
        "Step 1: Write total cost = 90 and quantity = 6",
        "Step 2: Compute 90 ÷ 6",
        "Step 3: Find cost per notebook",
        "Step 4: State unit price"
      ],
      "ans": "15",
      "why": "Unit cost is found by dividing total cost by number of items"
    },
    {
      "q": "Find k if y = kx, when y = 36 and x = 9",
      "hint": "constant of proportionality",
      "steps": [
        "Step 1: Write y = kx",
        "Step 2: Substitute 36 = k × 9",
        "Step 3: Divide both sides by 9",
        "Step 4: Solve for k"
      ],
      "ans": "4",
      "why": "k represents constant ratio between y and x"
    },
    {
      "q": "If y = 5x, find y when x = 7",
      "hint": "substitution",
      "steps": [
        "Step 1: Write equation y = 5x",
        "Step 2: Substitute x = 7",
        "Step 3: Multiply 5 × 7",
        "Step 4: Compute y value"
      ],
      "ans": "35",
      "why": "Direct proportion uses substitution into linear equation"
    },
    {
      "q": "If x doubles in y = 3x, what happens to y when x changes from 4 to 8?",
      "hint": "scaling",
      "steps": [
        "Step 1: Compute y when x = 4 → y = 3 × 4",
        "Step 2: Compute y when x = 8 → y = 3 × 8",
        "Step 3: Compare both results",
        "Step 4: Identify relationship"
      ],
      "ans": "y doubles (from 12 to 24)",
      "why": "In direct proportion, scaling x scales y by same factor"
    }
  ]
);

add(
  "math",
  "ratio",
  "Inverse proportion",

  `<h2>Inverse Proportion</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
In inverse proportion, when one quantity increases, the other decreases.
Their product remains constant.
</p>
<pre>x × y = k (constant)</pre>
<p><b> Key idea:</b> More workers → less time needed.</p>
<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Inverse means opposite movement between variables</li>
<li>Used in work-rate problems, speed-time, and efficiency tasks</li>
<li>If one doubles, the other halves (if perfectly inverse)</li>
<li>Always keep the product constant</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 2 workers = 10 days<br>
Step 1: 2 × 10 = 20<br>
Step 2: 20 ÷ 4 = 5<br>
<b>Answer: 5 days</b>
</li>
<li>
<b>Example 2:</b> 3 workers = 12 days<br>
Step 1: 3 × 12 = 36<br>
Step 2: 36 ÷ 6 = 6<br>
<b>Answer: 6 days</b>
</li>
<li>
<b>Example 3:</b> 4 workers = 8 days<br>
Step 1: 4 × 8 = 32<br>
Step 2: 32 ÷ 8 = 4<br>
<b>Answer: 4 days</b>
</li>
</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Construction work scheduling</li>
<li>Machine efficiency in factories</li>
<li>Speed vs travel time in transport</li>
<li>Teamwork task distribution</li>
</ul>
`,

  [
    {
      "q": "If y is inversely proportional to x and x = 6, y = 12, find k in x × y = k",
      "hint": "constant of inverse proportion",
      "steps": [
        "Step 1: Write k = x × y",
        "Step 2: Substitute values k = 6 × 12",
        "Step 3: Multiply to find k"
      ],
      "ans": "72",
      "why": "In inverse proportion, the product of x and y stays constant"
    },
    {
      "q": "If x = 9 and y = 8 in an inverse proportion, find k",
      "hint": "multiply values",
      "steps": [
        "Step 1: Write k = x × y",
        "Step 2: Substitute k = 9 × 8",
        "Step 3: Compute product"
      ],
      "ans": "72",
      "why": "Inverse proportion means x × y remains constant"
    },
    {
      "q": "If y is inversely proportional to x and x = 3, y = 20, find k",
      "hint": "constant product rule",
      "steps": [
        "Step 1: Use k = x × y",
        "Step 2: Substitute 3 × 20",
        "Step 3: Calculate k"
      ],
      "ans": "60",
      "why": "The product of variables remains unchanged in inverse proportion"
    },
    {
      "q": "If x = 5 and y = 14 in inverse proportion, determine k",
      "hint": "multiply",
      "steps": [
        "Step 1: Write formula k = x × y",
        "Step 2: Substitute values 5 × 14",
        "Step 3: Compute result"
      ],
      "ans": "70",
      "why": "Inverse proportion keeps product of variables constant"
    },
    {
      "q": "If y is inversely proportional to x and x = 2, y = 30, find k",
      "hint": "constant product",
      "steps": [
        "Step 1: Write k = x × y",
        "Step 2: Substitute 2 × 30",
        "Step 3: Multiply to get k"
      ],
      "ans": "60",
      "why": "Inverse proportion is defined by a constant product relationship"
    }
  ]
);

add(
  "math",
  "statistics",
  "Data & frequency tables",

  `<h2>Data & Frequency Tables</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Statistics starts with <b>data</b>. Data is simply information we collect.
Raw data is often messy and difficult to interpret, so we organize it.
One of the simplest tools is a <b>frequency table</b>.
</p>

<p>
A frequency table helps us answer:
<b>"How many times does each value appear?"</b>
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Data</b> = collected information (numbers or categories)</li>
<li><b>Frequency</b> = number of times a value appears</li>
<li><b>Frequency table</b> = organized display of values and their counts</li>
<li>Helps identify patterns, repetition, and trends</li>
<li>Foundation for mean, median, and mode</li>
</ul>

<h3> WORKED EXAMPLE</h3>

<pre>
Data: 2, 3, 3, 4, 4, 4, 5

Step 1: List unique values → 2, 3, 4, 5
Step 2: Count occurrences

Value | Frequency
  2   | 1
  3   | 2
  4   | 3
  5   | 1

Conclusion:
- 4 has the highest frequency
- It is the mode of the data
</pre>

<h3> VISUAL IDEA</h3>
<pre>
2 → █
3 → ██
4 → ███
5 → █
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Survey results analysis</li>
<li>Exam score distribution</li>
<li>Business sales tracking</li>
<li>Population studies</li>
</ul>
`,

  [
    {
      "q": "Find frequency of 7 in data: 7, 2, 7, 5, 7, 1",
      "hint": "count occurrences",
      "steps": [
        "Step 1: Scan the dataset",
        "Step 2: Identify all occurrences of 7",
        "Step 3: Count each appearance",
        "Step 4: Write total frequency"
      ],
      "ans": "3",
      "why": "Frequency is the number of times a value appears in a dataset"
    },
    {
      "q": "Find frequency of 3 in data: 1, 3, 3, 3, 4, 5, 3",
      "hint": "tally method",
      "steps": [
        "Step 1: Go through each value one by one",
        "Step 2: Mark every occurrence of 3",
        "Step 3: Count all marks",
        "Step 4: Record final frequency"
      ],
      "ans": "4",
      "why": "Counting repeated values gives frequency"
    },
    {
      "q": "Find frequency of even numbers in: 2, 4, 5, 6, 8, 9, 2, 4",
      "hint": "filter then count",
      "steps": [
        "Step 1: Identify even numbers (2, 4, 6, 8)",
        "Step 2: List occurrences: 2,4,6,8 in dataset",
        "Step 3: Count total even values",
        "Step 4: Compute frequency"
      ],
      "ans": "6",
      "why": "Frequency can apply to a condition, not just one value"
    },
    {
      "q": "What is the frequency of values greater than 5 in: 3, 6, 7, 2, 9, 5, 8",
      "hint": "condition-based counting",
      "steps": [
        "Step 1: Identify values greater than 5 (6, 7, 9, 8)",
        "Step 2: Count each occurrence",
        "Step 3: Total the count",
        "Step 4: Write final frequency"
      ],
      "ans": "4",
      "why": "Frequency can measure how often a condition is satisfied in data"
    },
    {
      "q": "Find frequency of 10 in data: 1, 2, 3, 4, 5",
      "hint": "absence check",
      "steps": [
        "Step 1: Scan dataset for 10",
        "Step 2: Confirm if it appears",
        "Step 3: Count occurrences",
        "Step 4: Record result"
      ],
      "ans": "0",
      "why": "If a value does not appear, its frequency is zero"
    }
  ]
);

add(
  "math",
  "statistics",
  "Mean",

  `<h2>Mean (Average)</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
The mean is what we call the <b>average</b>.
Imagine sharing items equally among people — that final equal share is the mean.
It represents a balanced value of a dataset.
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Mean = total sum ÷ number of values</li>
<li>Represents a "fair share" value</li>
<li>All values contribute to the final result</li>
<li>Highly affected by extreme values (outliers)</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
Find mean of: 2, 4, 6

Step 1: Sum = 2 + 4 + 6 = 12
Step 2: Count = 3
Step 3: Mean = 12 ÷ 3 = 4
</pre>

<pre>
Example 2:
Find mean of: 5, 5, 10

Step 1: Sum = 20
Step 2: Count = 3
Step 3: Mean = 20 ÷ 3 = 6.67
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Average exam scores in schools</li>
<li>Weather temperature averages</li>
<li>Business profit analysis</li>
<li>Sports performance statistics</li>
</ul>
`,

  [
    {
      "q": "Find mean of 5, 7, 9, 3",
      "hint": "sum ÷ number of values",
      "steps": [
        "Step 1: Add all values 5 + 7 + 9 + 3",
        "Step 2: Compute total sum = 24",
        "Step 3: Count number of values = 4",
        "Step 4: Divide 24 ÷ 4",
        "Step 5: Write final mean"
      ],
      "ans": "6",
      "why": "Mean is total sum divided by number of values"
    },
    {
      "q": "Find mean of 12, 15, 9, 24",
      "hint": "average calculation",
      "steps": [
        "Step 1: Add values 12 + 15 + 9 + 24",
        "Step 2: Compute sum = 60",
        "Step 3: Count values = 4",
        "Step 4: Divide 60 ÷ 4",
        "Step 5: Get mean"
      ],
      "ans": "15",
      "why": "Mean balances all values into a single representative number"
    },
    {
      "q": "A dataset has values 10, 10, 10, 50. Find the mean and explain effect of outlier",
      "hint": "outlier impact",
      "steps": [
        "Step 1: Add values 10 + 10 + 10 + 50",
        "Step 2: Compute sum = 80",
        "Step 3: Divide by 4 values",
        "Step 4: Mean = 20",
        "Step 5: Compare with typical value 10"
      ],
      "ans": "20",
      "why": "A single large value increases the mean significantly"
    },
    {
      "q": "If mean of 4 numbers is 8, what is their total sum?",
      "hint": "reverse formula",
      "steps": [
        "Step 1: Use formula mean = sum ÷ n",
        "Step 2: Rearrange sum = mean × n",
        "Step 3: Substitute sum = 8 × 4",
        "Step 4: Compute result"
      ],
      "ans": "32",
      "why": "Rearranging mean formula gives total sum directly"
    },
    {
      "q": "Find mean of 2, 4, 6, 8, 10",
      "hint": "arithmetic mean",
      "steps": [
        "Step 1: Add all values",
        "Step 2: 2 + 4 + 6 + 8 + 10 = 30",
        "Step 3: Count values = 5",
        "Step 4: Divide 30 ÷ 5",
        "Step 5: Final answer"
      ],
      "ans": "6",
      "why": "Mean represents central value of a balanced dataset"
    }
  ]
);

add(
  "math",
  "statistics",
  "Median",

  `<h2>Median</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
The median is the <b>middle value</b> when data is arranged in order.
It shows the center of the dataset and is not affected by extreme values (outliers).
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Always arrange data in ascending order first</li>
<li>Odd number of values → pick the middle one</li>
<li>Even number of values → average the two middle values</li>
<li>Median is a measure of central tendency</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
Find median of: 7, 1, 3

Step 1: Arrange → 1, 3, 7
Step 2: Middle value = 3

Median = 3
</pre>

<pre>
Example 2:
Find median of: 2, 4, 6, 8

Step 1: Arrange → 2, 4, 6, 8
Step 2: Middle values = 4 and 6
Step 3: Median = (4 + 6) ÷ 2 = 5
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Median income in economics (fair average earnings)</li>
<li>House prices in real estate analysis</li>
<li>Weather data analysis</li>
<li>Performance ranking in exams</li>
</ul>
`,

  [
    {
      "q": "Find the median of 7, 3, 12, 5, 9",
      "hint": "sort first",
      "steps": [
        "Step 1: Arrange numbers in ascending order",
        "Step 2: 3, 5, 7, 9, 12",
        "Step 3: Identify middle position",
        "Step 4: Pick the middle value"
      ],
      "ans": "7",
      "why": "Median is the central value of an ordered dataset"
    },
    {
      "q": "Find the median of 4, 8, 2, 10, 6, 12",
      "hint": "even number of values",
      "steps": [
        "Step 1: Arrange in order",
        "Step 2: 2, 4, 6, 8, 10, 12",
        "Step 3: Identify two middle values",
        "Step 4: Take average of 6 and 8",
        "Step 5: Compute result"
      ],
      "ans": "7",
      "why": "Even datasets use the mean of two middle values"
    },
    {
      "q": "Find median of 15, 3, 9, 21, 11",
      "hint": "ordering method",
      "steps": [
        "Step 1: Sort values",
        "Step 2: 3, 9, 11, 15, 21",
        "Step 3: Locate central value",
        "Step 4: Select median"
      ],
      "ans": "11",
      "why": "Median is the middle number after ordering"
    },
    {
      "q": "Find median of 1, 2, 3, 4",
      "hint": "two middle numbers",
      "steps": [
        "Step 1: Arrange in order",
        "Step 2: Identify middle values 2 and 3",
        "Step 3: Add 2 + 3 = 5",
        "Step 4: Divide by 2",
        "Step 5: Compute median"
      ],
      "ans": "2.5",
      "why": "Median of even dataset is average of middle values"
    }
  ]
);

add(
  "math",
  "statistics",
  "Mode",

  `<h2>Mode</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Mode tells us which value appears the most.
It answers the question: <b>"What is the most common value?"</b>
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Mode = value with highest frequency</li>
<li>A dataset can have one mode, more than one mode, or no mode</li>
<li>Useful for categorical and numerical data</li>
</ul>

<h3> WORKED EXAMPLE</h3>

<pre>
Find mode of: 1, 2, 2, 3

Step 1: Count frequency
1 → 1 time
2 → 2 times
3 → 1 time

Step 2: Highest frequency = 2

Mode = 2
</pre>

<h3> WORKED EXAMPLE 2</h3>

<pre>
Find mode of: 5, 5, 6, 6

Step 1: Count frequency
5 → 2 times
6 → 2 times

Step 2: Two highest equal frequencies

Mode = 5 and 6 (bimodal)
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Most common shoe size in a shop</li>
<li>Popular vote choice in elections</li>
<li>Most frequently sold product</li>
<li>Customer preference analysis</li>
</ul>
`,

  [
    {
      "q": "Find the mode of 6, 3, 6, 2, 6, 3",
      "hint": "count frequency",
      "steps": [
        "Step 1: List each value in the dataset",
        "Step 2: Count occurrences of each number",
        "Step 3: 6 appears 3 times, 3 appears 2 times, 2 appears 1 time",
        "Step 4: Identify highest frequency",
        "Step 5: Select value with highest count"
      ],
      "ans": "6",
      "why": "Mode is the value that appears most frequently"
    },
    {
      "q": "Find the mode of 5, 1, 5, 2, 2, 3",
      "hint": "multiple highest frequencies",
      "steps": [
        "Step 1: Count frequency of each value",
        "Step 2: 5 appears 2 times, 2 appears 2 times",
        "Step 3: Identify highest frequency",
        "Step 4: List all values with same highest count"
      ],
      "ans": "5 and 2",
      "why": "A dataset can have more than one mode if frequencies are equal"
    },
    {
      "q": "Find mode of 8, 9, 10, 11",
      "hint": "no repetition",
      "steps": [
        "Step 1: Count frequency of each value",
        "Step 2: Check if any value repeats",
        "Step 3: Compare frequencies",
        "Step 4: Determine mode"
      ],
      "ans": "No mode",
      "why": "If all values occur only once, there is no mode"
    },
    {
      "q": "Find mode of 12, 12, 15, 15, 18, 18",
      "hint": "equal frequency",
      "steps": [
        "Step 1: Count occurrences",
        "Step 2: 12 = 2 times, 15 = 2 times, 18 = 2 times",
        "Step 3: Identify highest frequency",
        "Step 4: List all modes"
      ],
      "ans": "12, 15, 18",
      "why": "All values share the same highest frequency"
    }
  ]
);

add(
  "math",
  "statistics",
  "Bar graphs",

  `<h2>Bar Graphs</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Bar graphs turn numbers into pictures.
Instead of reading numbers, we <b>see</b> the data.
Each bar represents a category, and its height shows the value.
</p>

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li>Bars represent categories</li>
<li>Height or length shows value</li>
<li>Used for comparison between groups</li>
<li>Easy to interpret at a glance</li>
</ul>

<h3> WORKED EXAMPLE</h3>

<pre>
Fruit Sales:

Apples → 5
Bananas → 8
Mangoes → 3

Step 1: Assign each fruit a bar
Step 2: Set bar height equal to value

Conclusion:
- Bananas highest (8)
- Apples medium (5)
- Mangoes lowest (3)
</pre>

<h3> VISUAL INTERPRETATION IDEA</h3>
<pre>
Bananas  ████████ (8)
Apples   █████     (5)
Mangoes  ███       (3)
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>School performance comparison</li>
<li>Business sales analysis</li>
<li>Weather comparisons (rainfall, temperature)</li>
<li>Survey result visualization</li>
</ul>
`,

  [
    {
      "q": "In a dataset: Apples = 5, Mangoes = 9, Bananas = 3, Grapes = 7. Which category has the highest value?",
      "hint": "compare values",
      "steps": [
        "Step 1: List all values",
        "Step 2: Apples = 5, Mangoes = 9, Bananas = 3, Grapes = 7",
        "Step 3: Compare magnitudes",
        "Step 4: Identify the largest value"
      ],
      "ans": "\nBar Graph (visual representation):\n\nApples   | █████ (5)\nMangoes  | █████████ (9)\nBananas  | ███ (3)\nGrapes   | ███████ (7)\n\nHighest bar = Mangoes (9)\n  ",
      "why": "Bar graphs represent data using height, so the largest value has the tallest bar"
    },
    {
      "q": "In a bar chart, values are 2, 6, 4, 10. Find the difference between highest and lowest bars",
      "hint": "range",
      "steps": [
        "Step 1: Identify highest value = 10",
        "Step 2: Identify lowest value = 2",
        "Step 3: Subtract 10 − 2",
        "Step 4: Compute result"
      ],
      "ans": "\nBar Representation:\n\n2  | ██\n6  | ██████\n4  | ████\n10 | ██████████\n\nRange = 10 − 2 = 8\n  ",
      "why": "Difference between bar heights shows range of data"
    },
    {
      "q": "If a bar represents 12 units and another represents 5 units, how many more units does the first represent?",
      "hint": "subtraction",
      "steps": [
        "Step 1: Identify values 12 and 5",
        "Step 2: Subtract 12 − 5",
        "Step 3: Compute difference",
        "Step 4: Interpret result"
      ],
      "ans": "\nBar Comparison:\n\n12 | ████████████\n5  | █████\n\nDifference = 12 − 5 = 7\n  ",
      "why": "Bar comparison uses difference in heights"
    },
    {
      "q": "If total value in a bar chart is 40 and one category is 15, what is the remaining total?",
      "hint": "total minus part",
      "steps": [
        "Step 1: Identify total = 40",
        "Step 2: Identify part = 15",
        "Step 3: Subtract 40 − 15",
        "Step 4: Compute remaining value"
      ],
      "ans": "\nTotal Bar:\n\n40 | ████████████████████████████████████████\n15 | ███████████████\n\nRemaining = 25\n  ",
      "why": "Bar charts can represent parts of a whole using subtraction"
    },
    {
      "q": "Which statement is true about bar graphs?",
      "hint": "representation",
      "steps": [
        "Step 1: Understand bar height meaning",
        "Step 2: Compare different categories",
        "Step 3: Interpret visual data"
      ],
      "ans": "\nBar Graph Idea:\n\nA  | ███\nB  | ██████\nC  | █████████\n\nBars represent values using height comparison\n  ",
      "why": "Bar graphs convert numbers into visual lengths for comparison"
    }
  ]
);

add(
  "math",
  "probability",
  "Basic probability",

  `<h2>Basic Probability</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Probability measures how likely an event is to occur.
It compares favorable outcomes to total possible outcomes in a sample space.
</p>

<h3> WELL DETAILED NOTES</h3>
<ul>
<li>Probability = favorable outcomes ÷ total outcomes</li>
<li>Values range from 0 (impossible) to 1 (certain)</li>
<li>All outcomes must be equally likely</li>
<li>Always simplify fractions</li>
<li>Careful counting is the most important step</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
A bag contains 2 red balls and 3 blue balls.
P(red)?

Step 1: Total = 2 + 3 = 5
Step 2: Favorable = 2
Step 3: P = 2/5
</pre>

<pre>
Example 2:
A bag contains 3 red balls and 2 blue balls.
P(blue)?

Step 1: Total = 5
Step 2: Favorable = 2
Step 3: P = 2/5
</pre>

<pre>
Example 3:
A bag contains 4 red balls and 1 blue ball.
P(not red)?

Step 1: Total = 5
Step 2: Not red = 1
Step 3: P = 1/5
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Weather forecasting predictions</li>
<li>Insurance risk calculations</li>
<li>Games of chance (lottery, dice)</li>
<li>Decision making under uncertainty</li>
</ul>
`,

  [
    {
      "q": "A bag contains 5 red balls and 3 blue balls. What is the probability of picking a blue ball?",
      "hint": "favorable ÷ total",
      "steps": [
        "Step 1: Identify total number of balls = 5 + 3 = 8",
        "Step 2: Identify favorable outcomes (blue balls) = 3",
        "Step 3: Write probability formula P = favorable / total",
        "Step 4: Substitute P = 3 / 8",
        "Step 5: Simplify if possible"
      ],
      "ans": "3/8",
      "why": "Probability is calculated as favorable outcomes divided by total outcomes"
    },
    {
      "q": "A bag has 6 red balls and 4 blue balls. What is the probability of NOT picking red?",
      "hint": "complement rule",
      "steps": [
        "Step 1: Find total balls = 6 + 4 = 10",
        "Step 2: Identify non-red outcomes = blue balls = 4",
        "Step 3: Write probability P = favorable / total",
        "Step 4: Substitute P = 4 / 10",
        "Step 5: Simplify fraction"
      ],
      "ans": "2/5",
      "why": "Not picking red means selecting from all non-red outcomes"
    },
    {
      "q": "A fair dice is rolled. What is the probability of getting an even number?",
      "hint": "count favorable outcomes",
      "steps": [
        "Step 1: List sample space = {1,2,3,4,5,6}",
        "Step 2: Identify even numbers = {2,4,6}",
        "Step 3: Count favorable outcomes = 3",
        "Step 4: Count total outcomes = 6",
        "Step 5: Compute probability = 3/6"
      ],
      "ans": "1/2",
      "why": "Probability depends on ratio of favorable to total outcomes"
    },
    {
      "q": "What is the probability of getting a number greater than 4 on a fair dice?",
      "hint": "sample space filtering",
      "steps": [
        "Step 1: List outcomes = {1,2,3,4,5,6}",
        "Step 2: Identify numbers > 4 = {5,6}",
        "Step 3: Count favorable outcomes = 2",
        "Step 4: Total outcomes = 6",
        "Step 5: Write probability = 2/6"
      ],
      "ans": "1/3",
      "why": "Probability is favorable outcomes divided by total outcomes"
    },
    {
      "q": "What is the probability range of any event?",
      "hint": "limits",
      "steps": [
        "Step 1: Identify impossible event = 0",
        "Step 2: Identify certain event = 1",
        "Step 3: Understand probability scale",
        "Step 4: Define range"
      ],
      "ans": "0 to 1",
      "why": "Probability values always lie between impossible (0) and certain (1)"
    }
  ]
);

add(
  "math",
  "probability",
  "Dice probability",

  `<h2>Dice Probability</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A fair die has 6 equally likely outcomes: 1, 2, 3, 4, 5, 6.
Each outcome has the same probability.
</p>

<h3> WELL DETAILED NOTES</h3>
<ul>
<li>Total outcomes = 6</li>
<li>Each outcome has probability = 1/6</li>
<li>Group outcomes when required (even, odd, greater than, etc.)</li>
<li>Probability = favorable outcomes / total outcomes</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
A fair die is rolled.
P(getting 4)?

Favorable = 1
Total = 6
P = 1/6
</pre>

<pre>
Example 2:
A fair die is rolled.
P(even number)?

Even = {2,4,6}
Favorable = 3
P = 3/6 = 1/2
</pre>

<pre>
Example 3:
A fair die is rolled.
P(number > 4)?

Numbers = {5,6}
Favorable = 2
P = 2/6 = 1/3
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Board games (Ludo, Monopoly)</li>
<li>Simulation models in gaming</li>
<li>Random sampling in statistics</li>
</ul>
`,

  [
    {
      "q": "A fair die is rolled. What is the probability of getting a number less than 4?",
      "hint": "filter outcomes",
      "steps": [
        "Step 1: Write sample space S = {1,2,3,4,5,6}",
        "Step 2: Identify outcomes < 4 = {1,2,3}",
        "Step 3: Count favorable outcomes = 3",
        "Step 4: Total outcomes = 6",
        "Step 5: Compute probability = 3/6",
        "Step 6: Simplify fraction"
      ],
      "ans": "1/2",
      "why": "Probability is favorable outcomes divided by total outcomes"
    },
    {
      "q": "A fair die is rolled. What is the probability of getting an even number?",
      "hint": "even numbers",
      "steps": [
        "Step 1: Write sample space S = {1,2,3,4,5,6}",
        "Step 2: Identify even outcomes = {2,4,6}",
        "Step 3: Count favorable outcomes = 3",
        "Step 4: Total outcomes = 6",
        "Step 5: Compute probability = 3/6",
        "Step 6: Simplify fraction"
      ],
      "ans": "1/2",
      "why": "Even numbers are half of all outcomes on a fair die"
    },
    {
      "q": "A fair die is rolled. What is the probability of getting a multiple of 3?",
      "hint": "multiples",
      "steps": [
        "Step 1: Write sample space S = {1,2,3,4,5,6}",
        "Step 2: Identify multiples of 3 = {3,6}",
        "Step 3: Count favorable outcomes = 2",
        "Step 4: Total outcomes = 6",
        "Step 5: Compute probability = 2/6",
        "Step 6: Simplify fraction"
      ],
      "ans": "1/3",
      "why": "Probability is based on count of favorable outcomes over total outcomes"
    },
    {
      "q": "A fair die is rolled. What is the probability of getting a number that is not a prime?",
      "hint": "complement",
      "steps": [
        "Step 1: Write sample space S = {1,2,3,4,5,6}",
        "Step 2: Identify primes = {2,3,5}",
        "Step 3: Identify non-primes = {1,4,6}",
        "Step 4: Count favorable outcomes = 3",
        "Step 5: Total outcomes = 6",
        "Step 6: Compute probability = 3/6",
        "Step 7: Simplify fraction"
      ],
      "ans": "1/2",
      "why": "Non-prime outcomes are the complement of prime outcomes"
    },
    {
      "q": "A fair die is rolled. What is the probability of getting 6?",
      "hint": "single outcome",
      "steps": [
        "Step 1: Write sample space S = {1,2,3,4,5,6}",
        "Step 2: Identify favorable outcome = {6}",
        "Step 3: Count favorable outcomes = 1",
        "Step 4: Total outcomes = 6",
        "Step 5: Compute probability = 1/6"
      ],
      "ans": "1/6",
      "why": "Single outcomes have probability 1 over total sample space"
    }
  ]
);

add(
  "math",
  "probability",
  "Coin probability",

  `<h2>Coin Probability</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A coin is one of the simplest probability experiments.
When you toss a fair coin, there are only two possible outcomes:
<b>Head (H)</b> or <b>Tail (T)</b>.
</p>

<p>
Because the coin is fair, both outcomes have an <b>equal chance</b>.
</p>

<h3> WELL DETAILED NOTES</h3>
<ul>
<li>Total possible outcomes = 2 (H, T)</li>
<li>P(Head) = 1/2</li>
<li>P(Tail) = 1/2</li>
<li>Sum of probabilities = 1</li>
<li>Multiple tosses are independent events</li>
</ul>

<h3> DIAGRAM</h3>
<pre>
Sample space:
H | T
</pre>

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
A coin is tossed once.
P(Head)?

Total = 2
Favorable = 1
P(H) = 1/2
</pre>

<pre>
Example 2:
A coin is tossed once.
P(Tail)?

Total = 2
Favorable = 1
P(T) = 1/2
</pre>

<pre>
Example 3:
A coin is tossed twice.
P(HH)?

P(H) × P(H)
= 1/2 × 1/2
= 1/4
</pre>

<pre>
Example 4:
A coin is tossed twice.
P(one head)?

Sample space:
HH, HT, TH, TT

Favorable = HT, TH = 2
Total = 4

P = 2/4 = 1/2
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Decision-making models</li>
<li>Game theory simulations</li>
<li>Random event modeling</li>
</ul>
`,

  [
    {
      "q": "A coin is tossed once. Find the probability of getting a head",
      "hint": "equally likely outcomes",
      "steps": [
        "Step 1: Write sample space S = {H, T}",
        "Step 2: Identify favorable outcome = {H}",
        "Step 3: Count favorable outcomes = 1",
        "Step 4: Count total outcomes = 2",
        "Step 5: Compute probability = 1/2"
      ],
      "ans": "1/2",
      "why": "Probability is favorable outcomes divided by total equally likely outcomes"
    },
    {
      "q": "A coin is tossed twice. Find the probability of getting two heads",
      "hint": "independent events",
      "steps": [
        "Step 1: List sample space = {HH, HT, TH, TT}",
        "Step 2: Identify favorable outcome = {HH}",
        "Step 3: Count favorable outcomes = 1",
        "Step 4: Count total outcomes = 4",
        "Step 5: Compute probability = 1/4"
      ],
      "ans": "1/4",
      "why": "Independent events multiply probabilities: 1/2 × 1/2"
    },
    {
      "q": "A coin is tossed twice. Find the probability of getting exactly one head",
      "hint": "favorable outcomes",
      "steps": [
        "Step 1: List sample space = {HH, HT, TH, TT}",
        "Step 2: Identify outcomes with one head = {HT, TH}",
        "Step 3: Count favorable outcomes = 2",
        "Step 4: Count total outcomes = 4",
        "Step 5: Compute probability = 2/4",
        "Step 6: Simplify fraction"
      ],
      "ans": "1/2",
      "why": "Exactly one head occurs in two of the four equally likely outcomes"
    },
    {
      "q": "What is the probability of getting at least one tail in two coin tosses?",
      "hint": "complement method",
      "steps": [
        "Step 1: List sample space = {HH, HT, TH, TT}",
        "Step 2: Identify complement event = no tails = {HH}",
        "Step 3: Compute P(no tail) = 1/4",
        "Step 4: Use complement rule 1 − P(no tail)",
        "Step 5: Calculate 1 − 1/4"
      ],
      "ans": "3/4",
      "why": "Complement rule simplifies probability of complex events"
    },
    {
      "q": "Why is probability of head in a fair coin 1/2?",
      "hint": "symmetry",
      "steps": [
        "Step 1: Identify outcomes = {H, T}",
        "Step 2: Check fairness (equal likelihood)",
        "Step 3: Assign equal probability to each outcome",
        "Step 4: Divide 1 outcome by 2 total outcomes"
      ],
      "ans": "1/2",
      "why": "A fair coin has symmetric outcomes with equal probability"
    }
  ]
);

add(
  "math",
  "probability",
  "Combined events",

  `<h2>Combined Events</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
When two independent events happen together, we multiply their probabilities.
Independent means one event does NOT affect the other.
</p>

---

<h3> WELL DETAILED NOTES</h3>
<ul>
<li>P(A and B) = P(A) × P(B)</li>
<li>Used only when events are independent</li>
<li>If events are dependent, multiplication is modified (advanced case)</li>
</ul>

---

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
A coin is tossed and a die is rolled.
What is the probability of getting a head and a 4?

Step 1: P(head) = 1/2
Step 2: P(4) = 1/6
Step 3: Multiply → (1/2) × (1/6) = 1/12
Final Answer: 1/12
</pre>

<pre>
Example 2:
A coin is tossed and a die is rolled.
What is the probability of getting a tail and an even number?

Step 1: P(tail) = 1/2
Step 2: Even numbers = {2,4,6} → 3/6 = 1/2
Step 3: Multiply → (1/2) × (1/2) = 1/4
Final Answer: 1/4
</pre>

<pre>
Example 3:
A coin is tossed and a die is rolled.
What is the probability of getting a head and a number greater than 4?

Step 1: P(head) = 1/2
Step 2: Numbers > 4 = {5,6} → 2/6 = 1/3
Step 3: Multiply → (1/2) × (1/3) = 1/6
Final Answer: 1/6
</pre>

---

<h3> DIAGRAM</h3>

<pre>
Event A (coin)     Event B (die)
   1/2  ×            1/6
        ↓
   Combined probability = multiplication
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Gaming systems (multiple random outcomes)</li>
<li>Security systems (independent risk factors)</li>
<li>Quality control in manufacturing</li>
<li>AI random sampling models</li>
</ul>

---
`,

  [
    {
      "q": "A coin is tossed and a die is rolled. Find P(tail and 3)",
      "hint": "independent events multiply",
      "steps": [
        "Step 1: P(tail) = 1/2",
        "Step 2: P(3 on die) = 1/6",
        "Step 3: Multiply 1/2 × 1/6",
        "Step 4: Compute result = 1/12"
      ],
      "ans": "1/12",
      "why": "Coin toss and die roll are independent events"
    },
    {
      "q": "A coin is tossed and a die is rolled. Find P(head and even number)",
      "hint": "find even probability first",
      "steps": [
        "Step 1: P(head) = 1/2",
        "Step 2: Even numbers = {2,4,6} so P(even) = 3/6 = 1/2",
        "Step 3: Multiply 1/2 × 1/2",
        "Step 4: Compute result = 1/4"
      ],
      "ans": "1/4",
      "why": "Independent events are multiplied"
    },
    {
      "q": "A coin is tossed and a die is rolled. Find P(head and number greater than 4)",
      "hint": "identify sample space",
      "steps": [
        "Step 1: P(head) = 1/2",
        "Step 2: Numbers > 4 = {5,6} so P = 2/6 = 1/3",
        "Step 3: Multiply 1/2 × 1/3",
        "Step 4: Compute result = 1/6"
      ],
      "ans": "1/6",
      "why": "Each event is independent so probabilities multiply"
    },
    {
      "q": "A coin is tossed twice. Find P(head on first toss and tail on second toss)",
      "hint": "list outcomes",
      "steps": [
        "Step 1: P(head) = 1/2",
        "Step 2: P(tail) = 1/2",
        "Step 3: Multiply 1/2 × 1/2",
        "Step 4: Compute result = 1/4"
      ],
      "ans": "1/4",
      "why": "Each coin toss is independent"
    },
    {
      "q": "A coin is tossed and a die is rolled. Find P(tail and prime number)",
      "hint": "prime numbers on a die",
      "steps": [
        "Step 1: P(tail) = 1/2",
        "Step 2: Prime numbers = {2,3,5} so P = 3/6 = 1/2",
        "Step 3: Multiply 1/2 × 1/2",
        "Step 4: Compute result = 1/4"
      ],
      "ans": "1/4",
      "why": "Both events are independent"
    },
    {
      "q": "A coin is tossed and a die is rolled. Find P(head and not 6)",
      "hint": "complement on die",
      "steps": [
        "Step 1: P(head) = 1/2",
        "Step 2: P(not 6) = 5/6",
        "Step 3: Multiply 1/2 × 5/6",
        "Step 4: Compute result = 5/12"
      ],
      "ans": "5/12",
      "why": "Independent events multiply probabilities"
    }
  ]
);

add(
  "math",
  "probability",
  "Bayes Theorem",

  `
<h2> Bayes Theorem</h2>
<h3> DEEP NOTES</h3>
<p>
Bayes theorem updates probability based on new information.
It reverses conditional probability: instead of P(B|A), we find P(A|B).
</p>
<pre>
P(A|B) = P(B|A)P(A) / P(B)
</pre>
 It is used when we already have evidence and want to revise beliefs.
<h3> WORKED EXAMPLE (STEP BY STEP)</h3>

<p><b>Question:</b> A disease affects 1% of population. Test is 90% accurate. If a person tests positive, what is probability they are actually sick?</p>
<p><b>Step 1: Define probabilities</b></p>
<pre>
P(D) = 0.01
P(¬D) = 0.99
</pre>

<p><b>Step 2: Test accuracy</b></p>
<pre>
P(+ | D) = 0.9
P(+ | ¬D) = 0.1
</pre>

<p><b>Step 3: Total probability of positive test</b></p>
<pre>
P(+) = (0.9 × 0.01) + (0.1 × 0.99)
     = 0.009 + 0.099
     = 0.108
</pre>

<p><b>Step 4: Apply Bayes theorem</b></p>
<pre>
P(D | +) = (0.9 × 0.01) / 0.108
         = 0.009 / 0.108
</pre>

<p><b>Step 5: Final Answer</b></p>
<pre>
P(D | +) ≈ 0.083 = 8.3%
</pre>
 Even with a positive test, probability is still low due to rarity of disease.
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Medical diagnosis systems (disease testing)</li>
<li>Spam email filtering (spam vs not spam)</li>
<li>Artificial intelligence decision-making</li>
<li>Forensic and legal probability reasoning</li>
</ul>

---
`,

  [
    {
      "q": "A disease affects 1% of a population. A test has 90% accuracy for detecting the disease when it is present. What is P(Disease ∩ Positive)?",
      "hint": "use multiplication rule",
      "steps": [
        "Step 1: P(Disease) = 0.01",
        "Step 2: P(Positive | Disease) = 0.90",
        "Step 3: Apply Bayes building block: P(A ∩ B) = P(A) × P(B|A)",
        "Step 4: Multiply 0.01 × 0.90",
        "Step 5: Compute result = 0.009"
      ],
      "ans": "0.009",
      "why": "Joint probability combines prior probability with likelihood of evidence"
    },
    {
      "q": "A test detects a condition with probability 0.8 if the condition is present. If 5% of people have the condition, find P(Condition ∩ Positive)",
      "hint": "joint probability",
      "steps": [
        "Step 1: P(C) = 0.05",
        "Step 2: P(P+ | C) = 0.8",
        "Step 3: Multiply P(C) × P(P+ | C)",
        "Step 4: 0.05 × 0.8",
        "Step 5: Compute result = 0.04"
      ],
      "ans": "0.04",
      "why": "Bayes framework starts with prior probability then updates using evidence likelihood"
    },
    {
      "q": "In a system, 2% of items are defective. A detector correctly flags defective items 95% of the time. Find probability of defective AND flagged",
      "hint": "conditional probability",
      "steps": [
        "Step 1: P(D) = 0.02",
        "Step 2: P(Flag | D) = 0.95",
        "Step 3: Multiply 0.02 × 0.95",
        "Step 4: Compute result = 0.019"
      ],
      "ans": "0.019",
      "why": "We combine prior defect rate with detection accuracy"
    },
    {
      "q": "A rare condition occurs in 1 out of 200 people. A test detects it with 98% accuracy. Find P(Condition ∩ Positive)",
      "hint": "convert fraction to probability",
      "steps": [
        "Step 1: P(C) = 1/200 = 0.005",
        "Step 2: P(Pos | C) = 0.98",
        "Step 3: Multiply 0.005 × 0.98",
        "Step 4: Compute result = 0.0049"
      ],
      "ans": "0.0049",
      "why": "Rare prior probability is updated using strong evidence likelihood"
    },
    {
      "q": "A spam filter correctly identifies spam emails 85% of the time. If 30% of emails are spam, find P(Spam ∩ Detected)",
      "hint": "multiply probability and accuracy",
      "steps": [
        "Step 1: P(Spam) = 0.30",
        "Step 2: P(Detected | Spam) = 0.85",
        "Step 3: Multiply 0.30 × 0.85",
        "Step 4: Compute result = 0.255"
      ],
      "ans": "0.255",
      "why": "Bayes reasoning combines base rate with detection likelihood"
    }
  ]
);

add(
  "math",
  "probability",
  "Expected Value",

  `
<h2> Expected Value</h2>

<h3> DEEP NOTES</h3>
<p>
Expected value is the long-term average outcome of a random process if it is repeated many times.
It does not guarantee what will happen in a single trial.
</p>
<pre>
E(X) = Σ (x × P(x))
</pre>
 It is a weighted average of all possible outcomes.
<h3> WORKED EXAMPLE (STEP BY STEP)</h3>
<p><b>Question:</b> A game gives: +10 (50%), +0 (50%). Find expected value.</p>
<p><b>Step 1: Identify outcomes and probabilities</b></p>
<pre>
10 with probability 0.5
0 with probability 0.5
</pre>
<p><b>Step 2: Multiply each outcome by probability</b></p>
<pre>
10 × 0.5 = 5
0 × 0.5 = 0
</pre>
<p><b>Step 3: Add results</b></p>
<pre>
E(X) = 5 + 0 = 5
</pre>
<p><b>Final Answer:</b> Expected value = 5</p>
<h3> DIAGRAM</h3>
<pre>
Outcome      Probability      Contribution
Win 10   →      0.5        →      5
Win 0    →      0.5        →      0
---------------------------------------
Expected Value = 5
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Casino games and gambling risk analysis</li>
<li>Insurance premium calculation</li>
<li>Investment profit forecasting</li>
<li>Decision making under uncertainty</li>
</ul>
`,

  [
    {
      "q": "A game gives you 10 if you win with probability 0.3 and 0 if you lose with probability 0.7. Find the expected value",
      "hint": "use E(X) = Σ xP(x)",
      "steps": [
        "Step 1: List outcomes: win = 10, lose = 0",
        "Step 2: Assign probabilities: P(win)=0.3, P(lose)=0.7",
        "Step 3: Multiply outcomes: 10 × 0.3 = 3",
        "Step 4: Multiply loss outcome: 0 × 0.7 = 0",
        "Step 5: Add results: 3 + 0"
      ],
      "ans": "3",
      "why": "Expected value is the weighted average of all possible outcomes"
    },
    {
      "q": "A dice game pays 6 when you roll a 6 and 0 otherwise. Find expected value",
      "hint": "probability of 6 is 1/6",
      "steps": [
        "Step 1: Outcome 6 pays 6, probability = 1/6",
        "Step 2: All other outcomes pay 0, probability = 5/6",
        "Step 3: Compute 6 × 1/6 = 1",
        "Step 4: Compute 0 × 5/6 = 0",
        "Step 5: Add results = 1"
      ],
      "ans": "1",
      "why": "Expected value combines all outcomes weighted by probability"
    },
    {
      "q": "A lottery gives 100 with probability 0.05 and 0 otherwise. Find expected value",
      "hint": "weighted mean",
      "steps": [
        "Step 1: Identify outcomes: 100 and 0",
        "Step 2: Assign probabilities: 0.05 and 0.95",
        "Step 3: Compute 100 × 0.05 = 5",
        "Step 4: Compute 0 × 0.95 = 0",
        "Step 5: Add results"
      ],
      "ans": "5",
      "why": "Expected value represents long-term average winnings"
    }
  ]
);

add(
  "math",
  "probability",
  "Real life probability",

  `
<h2>Real World Applications of Probability</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
Probability is not just theory — it is used in real life to make decisions under uncertainty.
It tells us how likely an event is to happen.
</p>

---

<h3> WELL DETAILED NOTES</h3>
<ul>
<li>Used in weather forecasting to predict rain, storms, or sunshine</li>
<li>Used in insurance to calculate risk of accidents or illness</li>
<li>Used in games and sports predictions (winning chances)</li>
<li>Used in business for decision making under uncertainty</li>
</ul>

---

<h3> WORKED EXAMPLES</h3>

<pre>
Example 1:
Weather forecast says 70% chance of rain.

Step 1: Convert → 70%
Step 2: Interpretation → likely to rain
Step 3: Decision → carry umbrella
</pre>

<pre>
Example 2:
A player has probability 0.8 of scoring a goal.

Step 1: Convert → 0.8 = 80%
Step 2: Interpretation → very high chance
Step 3: Conclusion → strong performer
</pre>

<pre>
Example 3:
Probability of accident is 0.01.

Step 1: Convert → 1%
Step 2: Interpretation → very rare event
Step 3: Conclusion → low risk
</pre>

---

<h3> DIAGRAM</h3>

<pre>
0 ─────────────── 0.5 ─────────────── 1
Impossible        Uncertain          Certain
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Weather forecasting systems</li>
<li>Insurance risk modeling</li>
<li>Sports analytics and predictions</li>
<li>Financial market forecasting</li>
</ul>

---
`,

  [
    {
      "q": "What does probability measure?",
      "hint": "chance",
      "ans": "likelihood of an event happening",
      "why": "Probability tells how likely something is to occur, from 0 (impossible) to 1 (certain)"
    },
    {
      "q": "What does 0.7 probability mean?",
      "hint": "convert to percentage",
      "ans": "70% chance of occurrence",
      "why": "0.7 means 70 out of 100 chances the event will happen"
    },
    {
      "q": "Where is probability used in real life?",
      "hint": "prediction systems",
      "ans": "weather, insurance, sports, business",
      "why": "It helps model uncertainty in real-world decisions"
    },
    {
      "q": "What does probability close to 1 mean?",
      "hint": "almost certain",
      "ans": "very likely event",
      "why": "Values near 1 indicate high chance of happening"
    },
    {
      "q": "What does probability close to 0 mean?",
      "hint": "rare event",
      "ans": "very unlikely event",
      "why": "Values near 0 indicate low chance of happening"
    }
  ]
);
add(
  "math",
  "matrices",
  "Introduction to Matrices",

  `
<h2>Introduction to Matrices</h2>

<p>
A <b>matrix</b> is a rectangular arrangement of numbers.
The numbers are arranged in <b>rows</b> and <b>columns</b>.
</p>

<p>For example:</p>

<pre>
A = [ 3   -2   5 ]
    [ 7    4   1 ]
</pre>

<p>
This matrix has two horizontal rows:
</p>

<pre>
[ 3   -2   5 ]   ← Row 1
[ 7    4   1 ]   ← Row 2
</pre>

<p>
and three vertical columns:
</p>

<pre>
[ 3   -2   5 ]
  ↓    ↓    ↓
  1    2    3
 columns
</pre>

<h3>WHAT IS A ROW?</h3>

<p>
A <b>row</b> is a horizontal line of entries.
</p>

<pre>
[ 3   8   5 ]
</pre>

<p>
The three numbers are in one row.
</p>

<h3>WHAT IS A COLUMN?</h3>

<p>
A <b>column</b> is a vertical line of entries.
</p>

<pre>
[ 3 ]
[ 8 ]
[ 5 ]
</pre>

<p>
The three numbers are in one column.
</p>

<h3>WORKED EXAMPLE 1</h3>

<p>Consider:</p>

<pre>
A = [ 4   7 ]
    [ 2   9 ]
</pre>

<p>
Read across the first horizontal line:
</p>

<pre>
[ 4   7 ]
</pre>

<p>
That is <b>row 1</b>.
</p>

<p>
Read across the second horizontal line:
</p>

<pre>
[ 2   9 ]
</pre>

<p>
That is <b>row 2</b>.
</p>

<p>
Therefore A has <b>2 rows</b>.
</p>

<h3>WORKED EXAMPLE 2</h3>

<p>Consider:</p>

<pre>
B = [ 1   5   8 ]
    [ 3   6   2 ]
    [ 7   4   9 ]
</pre>

<p>
There are three horizontal rows:
</p>

<pre>
Row 1: [1   5   8]

Row 2: [3   6   2]

Row 3: [7   4   9]
</pre>

<p>
Therefore B has <b>3 rows</b>.
</p>

<h3>WORKED EXAMPLE 3</h3>

<p>Consider:</p>

<pre>
C = [ 2   4   6   8 ]
    [ 1   3   5   7 ]
</pre>

<p>
The rows are:
</p>

<pre>
[ 2   4   6   8 ]

[ 1   3   5   7 ]
</pre>

<p>
Therefore C has <b>2 rows</b>.
</p>

<p>
The columns are:
</p>

<pre>
[2]   [4]   [6]   [8]
[1]   [3]   [5]   [7]
</pre>

<p>
Therefore C has <b>4 columns</b>.
</p>

<h3>KEY IDEA</h3>

<p>
A matrix is simply numbers organised in a rectangular pattern.
</p>

<p>
<b>Rows go across.</b>
</p>

<p>
<b>Columns go down.</b>
</p>
`,

  [
    {
      q: "How many rows are in [[4,7,2],[1,5,9]]?",
      hint: "Count the horizontal lines.",
      steps: [
        "First row = [4,7,2]",
        "Second row = [1,5,9]",
        "There are 2 rows."
      ],
      ans: "2",
      why: "Rows are the horizontal lines of entries."
    },
    {
      q: "How many columns are in [[2,4,6],[1,3,5]]?",
      hint: "Count the vertical positions.",
      steps: [
        "Column 1 contains 2 and 1.",
        "Column 2 contains 4 and 3.",
        "Column 3 contains 6 and 5.",
        "There are 3 columns."
      ],
      ans: "3",
      why: "Columns are the vertical lines of entries."
    },
    {
      q: "How many rows and columns are in [[1,2,3],[4,5,6],[7,8,9]]?",
      hint: "Count across and then down.",
      steps: [
        "There are 3 horizontal rows.",
        "There are 3 vertical columns."
      ],
      ans: "3 rows and 3 columns",
      why: "The matrix contains three horizontal rows and three vertical columns."
    },
    {
      q: "Which is a row: [2,5,8] or [[2],[5],[8]]?",
      hint: "A row goes horizontally.",
      steps: [
        "[2,5,8] is horizontal.",
        "Therefore it is a row."
      ],
      ans: "[2,5,8]",
      why: "Rows are written horizontally."
    }
  ]
);


add(
  "math",
  "matrices",
  "Order of a Matrix",

  `
<h2>Order of a Matrix</h2>

<p>
The <b>order</b> of a matrix tells us its size in terms of
<b>rows and columns</b>.
</p>

<p>
We write the order as:
</p>

<p><b>number of rows × number of columns</b></p>

<p>
Remember:
</p>

<p><b>Rows come first. Columns come second.</b></p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
A = [ 3   5   7 ]
    [ 2   4   6 ]
</pre>

<p>
Count the rows:
</p>

<pre>
Row 1: [3   5   7]
Row 2: [2   4   6]
</pre>

<p>
There are <b>2 rows</b>.
</p>

<p>
Now count the columns:
</p>

<pre>
[3] [5] [7]
[2] [4] [6]
</pre>

<p>
There are <b>3 columns</b>.
</p>

<p>
Therefore:
</p>

<p><b>Order = 2 × 3</b></p>

<h3>WORKED EXAMPLE 2</h3>

<pre>
B = [ 1   4 ]
    [ 2   5 ]
    [ 3   6 ]
    [ 7   8 ]
</pre>

<p>
There are 4 rows and 2 columns.
</p>

<p>
Therefore:
</p>

<p><b>Order = 4 × 2</b></p>

<h3>WORKED EXAMPLE 3</h3>

<pre>
C = [ 2   4   6   8 ]
    [ 1   3   5   7 ]
    [ 9   0   2   4 ]
</pre>

<p>
There are 3 rows.
</p>

<p>
There are 4 columns.
</p>

<p>
Therefore:
</p>

<p><b>Order = 3 × 4</b></p>

<h3>NUMBER OF ELEMENTS</h3>

<p>
The order also allows us to find the total number of entries.
</p>

<p>
Multiply:
</p>

<p>
<b>number of rows × number of columns</b>
</p>

<p>For example:</p>

<pre>
3 × 4 = 12
</pre>

<p>
Therefore a 3 × 4 matrix contains <b>12 elements</b>.
</p>

<h3>IMPORTANT</h3>

<p>
Do not reverse the order.
</p>

<p>
A matrix with 2 rows and 5 columns is:
</p>

<p><b>2 × 5</b></p>

<p>
It is not 5 × 2.
</p>
`,

  [
    {
      q: "Find the order of [[4,7,2],[1,5,9]].",
      hint: "Count rows first, then columns.",
      steps: [
        "There are 2 rows.",
        "There are 3 columns.",
        "Order = 2 × 3."
      ],
      ans: "2 × 3",
      why: "The order is written as rows × columns."
    },
    {
      q: "Find the order of [[1,2],[3,4],[5,6],[7,8]].",
      hint: "Count the horizontal rows.",
      steps: [
        "There are 4 rows.",
        "There are 2 columns.",
        "Order = 4 × 2."
      ],
      ans: "4 × 2",
      why: "There are four rows and two columns."
    },
    {
      q: "How many elements are in a 3 × 5 matrix?",
      hint: "Multiply rows by columns.",
      steps: [
        "Rows = 3",
        "Columns = 5",
        "3 × 5 = 15"
      ],
      ans: "15",
      why: "The total number of elements is rows × columns."
    },
    {
      q: "A matrix has 6 rows and 2 columns. What is its order?",
      hint: "Order = rows × columns.",
      steps: [
        "Rows = 6",
        "Columns = 2",
        "Order = 6 × 2"
      ],
      ans: "6 × 2",
      why: "Rows are written first in the order of a matrix."
    }
  ]
);


add(
  "math",
  "matrices",
  "Elements of a Matrix",

  `
<h2>Elements of a Matrix</h2>

<p>
The individual numbers inside a matrix are called
<b>elements</b> or <b>entries</b>.
</p>

<p>
We identify an element using its <b>row</b> and <b>column</b>.
</p>

<h3>THE POSITION RULE</h3>

<p>
For a matrix A, the element in:
</p>

<p>
<b>row i, column j</b>
</p>

<p>
is written as:
</p>

<p><b>a<sub>ij</sub></b></p>

<p>
The first number tells us the <b>row</b>.
</p>

<p>
The second number tells us the <b>column</b>.
</p>

<p>
Think:
</p>

<p><b>row first → column second</b></p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
A = [ 4   7   2 ]
    [ 9   5   6 ]
    [ 1   8   3 ]
</pre>

<p>
Find a<sub>23</sub>.
</p>

<p>
The first number is 2, so go to <b>row 2</b>.
</p>

<pre>
[ 9   5   6 ]
</pre>

<p>
The second number is 3, so take <b>column 3</b>.
</p>

<pre>
[ 9   5   6 ]
          ↑
       column 3
</pre>

<p>
Therefore:</p>

<p><b>a<sub>23</sub> = 6</b></p>

<h3>WORKED EXAMPLE 2</h3>

<p>
Using the same matrix, find a<sub>31</sub>.
</p>

<p>
First go to row 3:
</p>

<pre>
[ 1   8   3 ]
</pre>

<p>
Then go to column 1:
</p>

<pre>
[ 1   8   3 ]
  ↑
column 1
</pre>

<p>
Therefore:
</p>

<p><b>a<sub>31</sub> = 1</b></p>

<h3>WORKED EXAMPLE 3</h3>

<p>
Find a<sub>12</sub>.
</p>

<p>
Go to row 1:
</p>

<pre>
[ 4   7   2 ]
</pre>

<p>
Then column 2:
</p>

<pre>
[ 4   7   2 ]
      ↑
   column 2
</pre>

<p>
Therefore:
</p>

<p><b>a<sub>12</sub> = 7</b></p>

<h3>ANOTHER WAY TO SEE IT</h3>

<pre>
A = [ 4   7   2 ]
    [ 9   5   6 ]
    [ 1   8   3 ]

     ↑
     |
   a₁₁

a₂₃ is the entry in
row 2, column 3.
</pre>

<h3>IMPORTANT</h3>

<p>
Never read a<sub>23</sub> as column 2, row 3.
</p>

<p>
It always means:
</p>

<p><b>row 2, column 3.</b></p>
`,

  [
    {
      q: "Given A=[[4,7,2],[9,5,6],[1,8,3]], find a23.",
      hint: "Go to row 2, then column 3.",
      steps: [
        "Row 2 = [9,5,6]",
        "Column 3 gives 6",
        "Therefore a23=6."
      ],
      ans: "6",
      why: "The first subscript identifies the row and the second identifies the column."
    },
    {
      q: "Given A=[[4,7,2],[9,5,6],[1,8,3]], find a31.",
      hint: "Find row 3, column 1.",
      steps: [
        "Row 3 = [1,8,3]",
        "Column 1 gives 1"
      ],
      ans: "1",
      why: "a31 means row 3, column 1."
    },
    {
      q: "Given A=[[4,7,2],[9,5,6],[1,8,3]], find a12.",
      hint: "Find row 1, column 2.",
      steps: [
        "Row 1 = [4,7,2]",
        "Column 2 gives 7"
      ],
      ans: "7",
      why: "a12 means row 1, column 2."
    },
    {
      q: "Given A=[[2,-1,5],[4,3,7]], find a22.",
      hint: "Go to row 2 and then column 2.",
      steps: [
        "Row 2 = [4,3,7]",
        "Column 2 gives 3"
      ],
      ans: "3",
      why: "The element a22 is found at row 2, column 2."
    }
  ]
);


add(
  "math",
  "matrices",
  "Types of Matrices",

  `
<h2>Types of Matrices</h2>

<p>
Matrices can be classified according to their shape or the arrangement
of their elements.
</p>

<h3>1. ROW MATRIX</h3>

<p>
A matrix with exactly <b>one row</b> is called a row matrix.
</p>

<pre>
A = [ 3   5   7   9 ]
</pre>

<p>
There is one row and four columns.
</p>

<p><b>Order = 1 × 4</b></p>

<h3>2. COLUMN MATRIX</h3>

<p>
A matrix with exactly <b>one column</b> is called a column matrix.
</p>

<pre>
B = [ 3 ]
    [ 5 ]
    [ 7 ]
</pre>

<p>
There are three rows and one column.
</p>

<p><b>Order = 3 × 1</b></p>

<h3>3. SQUARE MATRIX</h3>

<p>
A matrix with the same number of rows and columns is called a
<b>square matrix</b>.
</p>

<pre>
C = [ 2   4 ]
    [ 7   9 ]
</pre>

<p>
There are 2 rows and 2 columns.
</p>

<p><b>Order = 2 × 2</b></p>

<h3>4. ZERO MATRIX</h3>

<p>
A matrix in which every element is zero is called a
<b>zero matrix</b>.
</p>

<pre>
D = [ 0   0 ]
    [ 0   0 ]
</pre>

<h3>5. IDENTITY MATRIX</h3>

<p>
A square matrix with 1s on the main diagonal and 0s everywhere else
is called an <b>identity matrix</b>.
</p>

<pre>
I₂ = [ 1   0 ]
     [ 0   1 ]
</pre>

<p>
The identity matrix is important in matrix multiplication and inverses.
</p>

<h3>6. DIAGONAL MATRIX</h3>

<p>
A square matrix is diagonal when every element outside the main
diagonal is zero.
</p>

<pre>
E = [ 4   0   0 ]
    [ 0   7   0 ]
    [ 0   0   2 ]
</pre>

<h3>7. SCALAR MATRIX</h3>

<p>
A scalar matrix is a diagonal matrix whose main diagonal elements
are all equal.
</p>

<pre>
F = [ 5   0   0 ]
    [ 0   5   0 ]
    [ 0   0   5 ]
</pre>

<h3>8. SYMMETRIC MATRIX</h3>

<p>
A square matrix is symmetric when reflecting its elements across the
main diagonal gives the same matrix.
</p>

<p>
Equivalently:
</p>

<p><b>Aᵀ = A</b></p>

<p>For example:</p>

<pre>
G = [ 2   5 ]
    [ 5   8 ]
</pre>

<p>
The entries on opposite sides of the main diagonal match.
</p>

<h3>HOW TO IDENTIFY THE TYPE</h3>

<p>
Look at the structure rather than memorising the names.
</p>

<pre>
One row          → Row matrix

One column       → Column matrix

Rows = columns   → Square matrix

All entries 0    → Zero matrix

Diagonal 1s,
others 0        → Identity matrix

Off-diagonal
entries 0        → Diagonal matrix

Equal diagonal
entries          → Scalar matrix

Aᵀ = A           → Symmetric matrix
</pre>
`,

  [
    {
      q: "What type of matrix is [[3,5,7]]?",
      hint: "Count the rows.",
      steps: [
        "There is exactly one row.",
        "Therefore it is a row matrix."
      ],
      ans: "Row matrix",
      why: "A row matrix has exactly one row."
    },
    {
      q: "What type of matrix is [[4],[6],[8]]?",
      hint: "Count the columns.",
      steps: [
        "There is exactly one column.",
        "Therefore it is a column matrix."
      ],
      ans: "Column matrix",
      why: "A column matrix has exactly one column."
    },
    {
      q: "What type of matrix is [[2,0],[0,5]]?",
      hint: "Look at the entries away from the main diagonal.",
      steps: [
        "The entries outside the main diagonal are zero.",
        "Therefore it is a diagonal matrix."
      ],
      ans: "Diagonal matrix",
      why: "A diagonal matrix has zeros everywhere outside its main diagonal."
    },
    {
      q: "Is [[1,0],[0,1]] an identity matrix?",
      hint: "Look at the main diagonal and the other entries.",
      steps: [
        "Main diagonal = 1,1",
        "All other entries = 0",
        "Therefore it is an identity matrix."
      ],
      ans: "Yes",
      why: "An identity matrix has 1s on the main diagonal and 0s elsewhere."
    },
    {
      q: "Is [[2,5],[5,8]] symmetric?",
      hint: "Compare the entries on opposite sides of the main diagonal.",
      steps: [
        "Entry above the diagonal = 5",
        "Corresponding entry below the diagonal = 5",
        "They are equal.",
        "Therefore the matrix is symmetric."
      ],
      ans: "Yes",
      why: "A symmetric matrix satisfies Aᵀ=A."
    }
  ]
);


add(
  "math",
  "matrices",
  "Equality of Matrices",

  `
<h2>Equality of Matrices</h2>

<p>
Two matrices are <b>equal</b> when they have:
</p>

<ul>
<li>the same order, and</li>
<li>the same corresponding elements.</li>
</ul>

<h3>THE IDEA</h3>

<p>
Corresponding elements occupy the same position.
</p>

<pre>
A = [ 2   5 ]
    [ 7   9 ]

B = [ 2   5 ]
    [ 7   9 ]
</pre>

<p>
Every corresponding element is equal.
</p>

<p>
Therefore:
</p>

<p><b>A = B</b></p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
[ x   4 ] = [ 7   4 ]
[ 3   y ]   [ 3   9 ]
</pre>

<p>
Compare the first positions:
</p>

<p>
x = 7
</p>

<p>
Compare the last positions:
</p>

<p>
y = 9
</p>

<p>
Therefore:
</p>

<p><b>x = 7, y = 9</b></p>

<h3>WORKED EXAMPLE 2</h3>

<pre>
[ 2   x ] = [ 2   8 ]
[ y   5 ]   [ 6   5 ]
</pre>

<p>
Compare corresponding positions:
</p>

<p>
x = 8
</p>

<p>
y = 6
</p>

<p>
Therefore:
</p>

<p><b>x = 8, y = 6</b></p>

<h3>WORKED EXAMPLE 3</h3>

<pre>
[ 3   4 ] = [ 3   4   5 ]
[ 6   7 ]   [ 6   7   8 ]
</pre>

<p>
The first matrix is 2 × 2.
</p>

<p>
The second matrix is 2 × 3.
</p>

<p>
Their orders are different.
</p>

<p>
Therefore they cannot be equal.
</p>

<h3>KEY RULE</h3>

<p>
For two matrices to be equal:
</p>

<p>
<b>Same order + same corresponding elements.</b>
</p>
`,

  [
    {
      q: "If [[x,4],[3,y]]=[[7,4],[3,9]], find x and y.",
      hint: "Compare corresponding positions.",
      steps: [
        "x corresponds to 7, so x=7",
        "y corresponds to 9, so y=9"
      ],
      ans: "x=7, y=9",
      why: "Equal matrices have equal corresponding elements."
    },
    {
      q: "If [[2,x],[y,5]]=[[2,8],[6,5]], find x and y.",
      hint: "Compare each position.",
      steps: [
        "x=8",
        "y=6"
      ],
      ans: "x=8, y=6",
      why: "Each unknown must equal the element in the same position."
    },
    {
      q: "Can a 2×2 matrix equal a 2×3 matrix?",
      hint: "Compare their orders.",
      steps: [
        "First order = 2×2",
        "Second order = 2×3",
        "The orders are different.",
        "Therefore they cannot be equal."
      ],
      ans: "No",
      why: "Equal matrices must have the same order."
    }
  ]
);


add(
  "math",
  "matrices",
  "Matrix Addition",

  `
<h2>Matrix Addition</h2>

<p>
Matrix addition means adding the <b>corresponding elements</b> of two
matrices.
</p>

<h3>WHEN IS ADDITION POSSIBLE?</h3>

<p>
Two matrices can be added only when they have the
<b>same order</b>.
</p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
A = [ 2   5 ]
    [ 4   7 ]

B = [ 3   1 ]
    [ 6   2 ]
</pre>

<p>
Both matrices are 2 × 2, so addition is possible.
</p>

<p>
Add corresponding elements:
</p>

<pre>
A+B

= [ 2+3    5+1 ]
  [ 4+6    7+2 ]

= [ 5    6 ]
  [10    9 ]
</pre>

<p>
Therefore:</p>

<p><b>A+B = [[5,6],[10,9]]</b></p>

<h3>WORKED EXAMPLE 2</h3>

<pre>
A = [ 5   -2 ]
    [ 3    4 ]

B = [ -1   6 ]
    [ 2    5 ]
</pre>

<p>Then:</p>

<pre>
A+B

= [ 5+(-1)   -2+6 ]
  [ 3+2        4+5 ]

= [ 4   4 ]
  [ 5   9 ]
</pre>

<h3>WORKED EXAMPLE 3</h3>

<pre>
A = [ 1   2   3 ]
    [ 4   5   6 ]

B = [ 7   8   9 ]
    [ 1   2   3 ]
</pre>

<p>
Both matrices are 2 × 3.
</p>

<pre>
A+B

= [ 1+7   2+8   3+9 ]
  [ 4+1   5+2   6+3 ]

= [ 8   10   12 ]
  [ 5    7    9  ]
</pre>

<h3>ADDITION IS NOT POSSIBLE</h3>

<pre>
A = [ 1   2 ]
    [ 3   4 ]

B = [ 5 ]
    [ 6 ]
</pre>

<p>
A is 2 × 2.
</p>

<p>
B is 2 × 1.
</p>

<p>
The orders are different.
</p>

<p>
Therefore <b>A+B is not defined</b>.
</p>

<h3>KEY RULE</h3>

<p>
<b>Same order → add corresponding elements.</b>
</p>
`,

  [
    {
      q: "Find [[2,5],[4,7]] + [[3,1],[6,2]].",
      hint: "Add corresponding elements.",
      steps: [
        "2+3=5",
        "5+1=6",
        "4+6=10",
        "7+2=9"
      ],
      ans: "[[5,6],[10,9]]",
      why: "Matrix addition is performed element by element."
    },
    {
      q: "Find [[5,-2],[3,4]] + [[-1,6],[2,5]].",
      hint: "Remember that adding a negative number is ordinary addition.",
      steps: [
        "5+(-1)=4",
        "-2+6=4",
        "3+2=5",
        "4+5=9"
      ],
      ans: "[[4,4],[5,9]]",
      why: "Corresponding elements are added."
    },
    {
      q: "Can a 2×2 matrix be added to a 2×1 matrix?",
      hint: "Compare the orders.",
      steps: [
        "First matrix = 2×2",
        "Second matrix = 2×1",
        "The orders are different.",
        "Therefore addition is not defined."
      ],
      ans: "No",
      why: "Matrix addition requires both matrices to have the same order."
    }
  ]
);


add(
  "math",
  "matrices",
  "Matrix Subtraction",

  `
<h2>Matrix Subtraction</h2>

<p>
Matrix subtraction means subtracting the
<b>corresponding elements</b> of two matrices.
</p>

<h3>WHEN IS SUBTRACTION POSSIBLE?</h3>

<p>
The two matrices must have the <b>same order</b>.
</p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
A = [ 8   6 ]
    [ 5   9 ]

B = [ 3   2 ]
    [ 1   4 ]
</pre>

<p>Subtract corresponding elements:</p>

<pre>
A-B

= [ 8-3    6-2 ]
  [ 5-1    9-4 ]

= [ 5   4 ]
  [ 4   5 ]
</pre>

<h3>WORKED EXAMPLE 2</h3>

<pre>
A = [ 5   -2 ]
    [ 7    3 ]

B = [ 8    4 ]
    [ 2   -1 ]
</pre>

<pre>
A-B

= [ 5-8     -2-4 ]
  [ 7-2      3-(-1) ]

= [ -3   -6 ]
  [  5    4 ]
</pre>

<h3>WORKED EXAMPLE 3</h3>

<pre>
A = [ 10   8   6 ]
    [  4   2   0 ]

B = [ 3   1   5 ]
    [ 2   4   7 ]
</pre>

<pre>
A-B

= [ 10-3   8-1   6-5 ]
  [  4-2   2-4   0-7 ]

= [ 7   7    1 ]
  [ 2  -2   -7 ]
</pre>

<h3>KEY RULE</h3>

<p>
<b>Same order → subtract corresponding elements.</b>
</p>
`,

  [
    {
      q: "Find [[8,6],[5,9]] - [[3,2],[1,4]].",
      hint: "Subtract corresponding entries.",
      steps: [
        "8-3=5",
        "6-2=4",
        "5-1=4",
        "9-4=5"
      ],
      ans: "[[5,4],[4,5]]",
      why: "Matrix subtraction is performed element by element."
    },
    {
      q: "Find [[5,-2],[7,3]] - [[8,4],[2,-1]].",
      hint: "Be careful when subtracting a negative number.",
      steps: [
        "5-8=-3",
        "-2-4=-6",
        "7-2=5",
        "3-(-1)=4"
      ],
      ans: "[[-3,-6],[5,4]]",
      why: "Corresponding elements are subtracted, including the correct treatment of negative numbers."
    },
    {
      q: "Find [[10,8,6],[4,2,0]] - [[3,1,5],[2,4,7]].",
      hint: "Subtract each corresponding entry.",
      steps: [
        "10-3=7",
        "8-1=7",
        "6-5=1",
        "4-2=2",
        "2-4=-2",
        "0-7=-7"
      ],
      ans: "[[7,7,1],[2,-2,-7]]",
      why: "Every element is subtracted from the corresponding element."
    }
  ]
);


add(
  "math",
  "matrices",
  "Scalar Multiplication",

  `
<h2>Scalar Multiplication</h2>

<p>
A <b>scalar</b> is an ordinary number.
</p>

<p>
Scalar multiplication means multiplying <b>every element</b> of a
matrix by the scalar.
</p>

<h3>WORKED EXAMPLE 1</h3>

<pre>
A = [ 2   -3 ]
    [ 5    4 ]
</pre>

<p>
Find 3A.
</p>

<p>
Multiply every entry by 3:
</p>

<pre>
3A

= [ 3(2)     3(-3) ]
  [ 3(5)      3(4) ]

= [ 6    -9 ]
  [15    12 ]
</pre>

<h3>WORKED EXAMPLE 2</h3>

<pre>
A = [ -2   4 ]
    [  3   5 ]
</pre>

<p>
Find -2A.
</p>

<pre>
-2A

= [ -2(-2)   -2(4) ]
  [ -2(3)    -2(5) ]

= [ 4   -8 ]
  [ -6  -10 ]
</pre>

<p>
Notice that the negative scalar changes the signs of the entries.
</p>

<h3>WORKED EXAMPLE 3</h3>

<pre>
A = [ 6   4   2 ]
    [ 8   10  12 ]
</pre>

<p>
Find 1/2 A.
</p>

<pre>
1/2 A

= [ 1/2(6)   1/2(4)   1/2(2) ]
  [ 1/2(8)   1/2(10)  1/2(12) ]

= [ 3   2   1 ]
  [ 4   5   6 ]
</pre>

<h3>IMPORTANT</h3>

<p>
The scalar multiplies <b>every element</b>.
</p>

<p>
For example, if:
</p>

<pre>
A = [ a   b ]
    [ c   d ]
</pre>

<p>
then:
</p>

<pre>
kA = [ ka   kb ]
     [ kc   kd ]
</pre>
`,

  [
    {
      q: "Find 3[[2,-3],[5,4]].",
      hint: "Multiply every element by 3.",
      steps: [
        "3(2)=6",
        "3(-3)=-9",
        "3(5)=15",
        "3(4)=12"
      ],
      ans: "[[6,-9],[15,12]]",
      why: "Scalar multiplication multiplies every element by the scalar."
    },
    {
      q: "Find -2[[-2,4],[3,5]].",
      hint: "Multiply every entry by -2.",
      steps: [
        "-2(-2)=4",
        "-2(4)=-8",
        "-2(3)=-6",
        "-2(5)=-10"
      ],
      ans: "[[4,-8],[-6,-10]]",
      why: "A negative scalar changes the signs as well as the magnitudes."
    },
    {
      q: "Find 1/2[[6,4,2],[8,10,12]].",
      hint: "Divide every element by 2.",
      steps: [
        "6/2=3, 4/2=2, 2/2=1",
        "8/2=4, 10/2=5, 12/2=6"
      ],
      ans: "[[3,2,1],[4,5,6]]",
      why: "Multiplying by 1/2 is the same as dividing every element by 2."
    }
  ]
);
add(
  "math",
  "matrices",
  "Reflection in the x-axis",

  `
<h2>Reflection in the x-axis</h2>

<p>
A reflection in the <b>x-axis</b> flips a point across the horizontal
x-axis.
</p>

<h3>1. WHAT CHANGES?</h3>

<p>
When a point is reflected in the x-axis, its
<b>x-coordinate stays the same</b>.
</p>

<p>
Its <b>y-coordinate changes sign</b>.
</p>

<p>
Therefore:
</p>

<p><b>(x,y) → (x,-y)</b></p>

<h3>2. TRANSFORMATION MATRIX</h3>

<p>
The matrix for reflection in the x-axis is:
</p>

<pre>
[ 1   0 ]
[ 0  -1 ]
</pre>

<p>
Apply it to:
</p>

<pre>
[ x ]
[ y ]
</pre>

<p>
We get:
</p>

<pre>
[1  0] [x]   [x]
[0 -1] [y] = [-y]
</pre>

<p>
This gives:
</p>

<p><b>(x,y) → (x,-y)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Reflect <b>P(4,7)</b> in the x-axis.
</p>

<pre>
[1   0] [4]   [4]
[0  -1] [7] = [-7]
</pre>

<p>
Therefore:</p>

<p><b>P'(4,-7)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Reflect <b>A(-3,5)</b> in the x-axis.
</p>

<pre>
[1   0] [-3]   [-3]
[0  -1] [ 5] = [-5]
</pre>

<p>
Therefore:</p>

<p><b>A'(-3,-5)</b></p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Reflect <b>B(6,-2)</b> in the x-axis.
</p>

<pre>
[1   0] [ 6]   [ 6]
[0  -1] [-2] = [ 2]
</pre>

<p>
Therefore:</p>

<p><b>B'(6,2)</b></p>

<h3>6. THE PATTERN</h3>

<p>
Look carefully at the examples:
</p>

<pre>
(4,7)   → (4,-7)

(-3,5)  → (-3,-5)

(6,-2)  → (6,2)
</pre>

<p>
The x-coordinate never changes.
</p>

<p>
Only the sign of the y-coordinate changes.
</p>

<p><b>Reflection in x-axis: (x,y) → (x,-y)</b></p>
`,

  [
    {
      q: "Reflect (3,5) in the x-axis.",
      hint: "Change the sign of y only.",
      steps: [
        "x stays 3",
        "y changes from 5 to -5"
      ],
      ans: "(3,-5)",
      why: "Reflection in the x-axis changes the sign of the y-coordinate."
    },
    {
      q: "Reflect (-4,7) in the x-axis.",
      hint: "The x-coordinate stays unchanged.",
      steps: [
        "x stays -4",
        "y changes from 7 to -7"
      ],
      ans: "(-4,-7)",
      why: "Only the y-coordinate changes sign."
    },
    {
      q: "Reflect (6,-3) in the x-axis.",
      hint: "A negative y-coordinate becomes positive.",
      steps: [
        "x stays 6",
        "y changes from -3 to 3"
      ],
      ans: "(6,3)",
      why: "Reflection in the x-axis changes y to -y."
    },
    {
      q: "Use the transformation matrix to reflect (2,-8) in the x-axis.",
      hint: "Use [[1,0],[0,-1]].",
      steps: [
        "First coordinate = 1(2)+0(-8)=2",
        "Second coordinate = 0(2)-1(-8)=8"
      ],
      ans: "(2,8)",
      why: "The x-axis reflection matrix leaves x unchanged and reverses the sign of y."
    }
  ]
);


add(
  "math",
  "matrices",
  "Reflection in the y-axis",

  `
<h2>Reflection in the y-axis</h2>

<p>
A reflection in the <b>y-axis</b> flips a point across the vertical
y-axis.
</p>

<h3>1. WHAT CHANGES?</h3>

<p>
When a point is reflected in the y-axis, its
<b>y-coordinate stays the same</b>.
</p>

<p>
Its <b>x-coordinate changes sign</b>.
</p>

<p>
Therefore:
</p>

<p><b>(x,y) → (-x,y)</b></p>

<h3>2. TRANSFORMATION MATRIX</h3>

<pre>
[-1   0]
[ 0   1]
</pre>

<p>
Applying this matrix gives:
</p>

<pre>
[-1  0] [x]   [-x]
[ 0  1] [y] = [ y]
</pre>

<p>
Therefore:
</p>

<p><b>(x,y) → (-x,y)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Reflect <b>P(5,2)</b> in the y-axis.
</p>

<pre>
[-1   0] [5]   [-5]
[ 0   1] [2] = [ 2]
</pre>

<p>
Therefore:</p>

<p><b>P'(-5,2)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Reflect <b>A(-4,6)</b> in the y-axis.
</p>

<pre>
[-1   0] [-4]   [4]
[ 0   1] [ 6] = [6]
</pre>

<p>
Therefore:</p>

<p><b>A'(4,6)</b></p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Reflect <b>B(3,-7)</b> in the y-axis.
</p>

<pre>
[-1   0] [ 3]   [-3]
[ 0   1] [-7] = [-7]
</pre>

<p>
Therefore:</p>

<p><b>B'(-3,-7)</b></p>

<h3>6. THE PATTERN</h3>

<pre>
(5,2)    → (-5,2)

(-4,6)   → (4,6)

(3,-7)   → (-3,-7)
</pre>

<p>
The y-coordinate stays unchanged.
</p>

<p>
Only the sign of the x-coordinate changes.
</p>

<p><b>Reflection in y-axis: (x,y) → (-x,y)</b></p>
`,

  [
    {
      q: "Reflect (5,2) in the y-axis.",
      hint: "Change the sign of x only.",
      steps: [
        "x changes from 5 to -5",
        "y stays 2"
      ],
      ans: "(-5,2)",
      why: "Reflection in the y-axis changes the sign of the x-coordinate."
    },
    {
      q: "Reflect (-4,6) in the y-axis.",
      hint: "The y-coordinate remains unchanged.",
      steps: [
        "x changes from -4 to 4",
        "y stays 6"
      ],
      ans: "(4,6)",
      why: "Only the x-coordinate changes sign."
    },
    {
      q: "Reflect (3,-7) in the y-axis.",
      hint: "Change x, not y.",
      steps: [
        "x changes from 3 to -3",
        "y stays -7"
      ],
      ans: "(-3,-7)",
      why: "Reflection in the y-axis maps (x,y) to (-x,y)."
    },
    {
      q: "Use the transformation matrix to reflect (-2,5) in the y-axis.",
      hint: "Use [[-1,0],[0,1]].",
      steps: [
        "First coordinate = -1(-2)+0(5)=2",
        "Second coordinate = 0(-2)+1(5)=5"
      ],
      ans: "(2,5)",
      why: "The y-axis reflection matrix reverses x while leaving y unchanged."
    }
  ]
);


add(
  "math",
  "matrices",
  "Reflection in the Line y = x",

  `
<h2>Reflection in the Line y = x</h2>

<p>
A reflection in the line <b>y = x</b> changes the position of a point
by swapping its x- and y-coordinates.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
For a point:
</p>

<pre>
(x,y)
</pre>

<p>
reflection in y = x gives:
</p>

<p><b>(x,y) → (y,x)</b></p>

<p>
The two coordinates simply exchange positions.
</p>

<h3>2. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix is:
</p>

<pre>
[0  1]
[1  0]
</pre>

<p>
Apply it to:
</p>

<pre>
[x]
[y]
</pre>

<pre>
[0  1] [x]   [y]
[1  0] [y] = [x]
</pre>

<p>
Therefore:
</p>

<p><b>(x,y) → (y,x)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Reflect <b>P(3,8)</b> in y = x.
</p>

<pre>
[0  1] [3]   [8]
[1  0] [8] = [3]
</pre>

<p>
Therefore:</p>

<p><b>P'(8,3)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Reflect <b>A(-2,5)</b> in y = x.
</p>

<pre>
[0  1] [-2]   [ 5]
[1  0] [ 5] = [-2]
</pre>

<p>
Therefore:</p>

<p><b>A'(5,-2)</b></p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Reflect <b>B(7,-4)</b> in y = x.
</p>

<pre>
[0  1] [ 7]   [-4]
[1  0] [-4] = [ 7]
</pre>

<p>
Therefore:</p>

<p><b>B'(-4,7)</b></p>

<h3>6. THE PATTERN</h3>

<pre>
(3,8)    → (8,3)

(-2,5)   → (5,-2)

(7,-4)   → (-4,7)
</pre>

<p>
The numbers do not change.
</p>

<p>
They simply <b>swap positions</b>.
</p>

<p><b>Reflection in y = x: (x,y) → (y,x)</b></p>
`,

  [
    {
      q: "Reflect (3,8) in the line y = x.",
      hint: "Swap x and y.",
      steps: [
        "Original point = (3,8)",
        "Swap the coordinates",
        "Image = (8,3)"
      ],
      ans: "(8,3)",
      why: "Reflection in y=x exchanges the x- and y-coordinates."
    },
    {
      q: "Reflect (-2,5) in the line y = x.",
      hint: "Exchange the two coordinates.",
      steps: [
        "Original point = (-2,5)",
        "Swap the coordinates",
        "Image = (5,-2)"
      ],
      ans: "(5,-2)",
      why: "The transformation maps (x,y) to (y,x)."
    },
    {
      q: "Reflect (7,-4) in the line y = x.",
      hint: "Swap the positions of 7 and -4.",
      steps: [
        "Original point = (7,-4)",
        "Swap the coordinates",
        "Image = (-4,7)"
      ],
      ans: "(-4,7)",
      why: "Reflection in y=x swaps the x- and y-coordinates."
    },
    {
      q: "Use the transformation matrix to reflect (6,2) in y=x.",
      hint: "Use [[0,1],[1,0]].",
      steps: [
        "First coordinate = 0(6)+1(2)=2",
        "Second coordinate = 1(6)+0(2)=6"
      ],
      ans: "(2,6)",
      why: "The matrix [[0,1],[1,0]] exchanges the two coordinates."
    }
  ]
);

add(
  "math",
  "vectors",
  "Vector Notation",

  `
<h2> Vector Notation</h2>

<h3> DEEP NOTES</h3>
<p>
A vector is a quantity with BOTH magnitude and direction. It can be represented in multiple equivalent forms.
</p>

<pre>
a = (x, y)
a = xi + yj
</pre>

 i = unit vector in horizontal direction  
 j = unit vector in vertical direction  

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Write (3, 4) in i, j form</p>
<p><b>Step 1:</b> x-component = 3 → 3i</p>
<p><b>Step 2:</b> y-component = 4 → 4j</p>
<p><b>Final Answer:</b> 3i + 4j</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Convert (−2, 5) to i, j form</p>
<p><b>Step 1:</b> x = −2 → −2i</p>
<p><b>Step 2:</b> y = 5 → 5j</p>
<p><b>Final Answer:</b> −2i + 5j</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Convert 7i − 3j into coordinate form</p>
<p><b>Step 1:</b> x-component = 7</p>
<p><b>Step 2:</b> y-component = −3</p>
<p><b>Final Answer:</b> (7, −3)</p>

---

<h3> DIAGRAM</h3>

<pre>
          j ↑
            |
            |     • (x, y)
            |
------------•--------------→ i
          origin
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>GPS navigation directions</li>
<li>Airplane movement tracking</li>
<li>Game character motion (2D/3D)</li>
</ul>

---
`,

  [
    {
      "q": "Convert (-3, 7) into i and j vector form",
      "hint": "split components",
      "steps": [
        "Step 1: Identify x-component = -3",
        "Step 2: Identify y-component = 7",
        "Step 3: Multiply x by i → -3i",
        "Step 4: Multiply y by j → 7j",
        "Step 5: Combine components"
      ],
      "ans": "-3i + 7j",
      "why": "Each coordinate is written along its axis direction"
    },
    {
      "q": "Convert (0, 6) into i and j form",
      "hint": "x is zero",
      "steps": [
        "Step 1: Identify x-component = 0",
        "Step 2: Identify y-component = 6",
        "Step 3: 0i contributes nothing",
        "Step 4: Write remaining j component"
      ],
      "ans": "6j",
      "why": "Zero x-component removes i term"
    },
    {
      "q": "Convert 8i - 5j into coordinate form",
      "hint": "extract components",
      "steps": [
        "Step 1: Identify i coefficient = 8",
        "Step 2: Identify j coefficient = -5",
        "Step 3: Write x = 8",
        "Step 4: Write y = -5",
        "Step 5: Form coordinate pair"
      ],
      "ans": "(8, -5)",
      "why": "i corresponds to x-axis and j corresponds to y-axis"
    },
    {
      "q": "Add vectors (2i + 3j) + (4i - j)",
      "hint": "combine like terms",
      "steps": [
        "Step 1: Group i terms → 2i + 4i",
        "Step 2: Group j terms → 3j - j",
        "Step 3: Add i components → 6i",
        "Step 4: Add j components → 2j"
      ],
      "ans": "6i + 2j",
      "why": "Vector addition is done component-wise"
    },
    {
      "q": "Subtract vectors (7i + 2j) - (3i + 5j)",
      "hint": "distribute minus sign",
      "steps": [
        "Step 1: Expand subtraction → 7i + 2j - 3i - 5j",
        "Step 2: Group i terms → 7i - 3i",
        "Step 3: Group j terms → 2j - 5j",
        "Step 4: Simplify components"
      ],
      "ans": "4i - 3j",
      "why": "Subtraction changes signs of second vector"
    },
    {
      "q": "Find resultant of (5i + 1j) + (-2i + 6j)",
      "hint": "component addition",
      "steps": [
        "Step 1: Add i components → 5 + (-2)",
        "Step 2: Add j components → 1 + 6",
        "Step 3: Simplify each component",
        "Step 4: Write final vector form"
      ],
      "ans": "3i + 7j",
      "why": "Resultant vector is sum of components"
    }
  ]
);

add(
  "math",
  "vectors",
  "Magnitude and Direction",

  `
<h2> Magnitude and Direction</h2>

<h3> DEEP NOTES</h3>
<p>
Magnitude is the length of a vector, while direction shows where the vector is pointing.
</p>

<pre>
|a| = √(x² + y²)
</pre>

 Direction can be found using angle:
<pre>
θ = tan⁻¹(y/x)
</pre>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find magnitude of (3,4)</p>
<p><b>Step 1:</b> Square components → 3² = 9, 4² = 16</p>
<p><b>Step 2:</b> Add → 9 + 16 = 25</p>
<p><b>Step 3:</b> Square root → √25 = 5</p>
<p><b>Final Answer:</b> 5</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find magnitude of (6,8)</p>
<p><b>Step 1:</b> 6² = 36, 8² = 64</p>
<p><b>Step 2:</b> Add → 100</p>
<p><b>Step 3:</b> √100 = 10</p>
<p><b>Final Answer:</b> 10</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Find direction of vector (3,4)</p>
<p><b>Step 1:</b> Use θ = tan⁻¹(y/x)</p>
<p><b>Step 2:</b> θ = tan⁻¹(4/3)</p>
<p><b>Step 3:</b> θ ≈ 53°</p>
<p><b>Final Answer:</b> ≈ 53°</p>

---

<h3> DIAGRAM</h3>

<pre>
      ↑ y
      |
      |   • (x,y)
      |  /
      | /
      |/ θ
------•------------→ x
     origin
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Distance between two GPS points</li>
<li>Speed calculation in physics</li>
<li>Robotics movement length</li>
</ul>

---
`,

  [
    {
      "q": "Find magnitude of vector v = 3i - 4j",
      "hint": "Pythagoras theorem",
      "steps": [
        "Step 1: Identify components: x = 3, y = -4",
        "Step 2: Square each component: 3² = 9, (-4)² = 16",
        "Step 3: Add the squares: 9 + 16 = 25",
        "Step 4: Take square root of sum",
        "Step 5: Final magnitude = √25"
      ],
      "ans": "5 units",
      "why": "Magnitude is the length of vector, calculated using Pythagorean theorem"
    },
    {
      "q": "Find direction angle of vector v = 1i + 1j",
      "hint": "tan inverse",
      "steps": [
        "Step 1: Identify components: x = 1, y = 1",
        "Step 2: Calculate tangent: tan(θ) = y/x = 1/1 = 1",
        "Step 3: Use arctan to find angle",
        "Step 4: θ = tan⁻¹(1)",
        "Step 5: Final angle = 45°"
      ],
      "ans": "45° or π/4 radians",
      "why": "Direction angle shows orientation from positive x-axis"
    },
    {
      "q": "What is magnitude of a vector that goes 3 units right and 4 units down?",
      "hint": "direct Pythagorean application",
      "steps": [
        "Step 1: Interpret \"right\" as +x → 3",
        "Step 2: Interpret \"down\" as -y → -4",
        "Step 3: Square components: 3² = 9, (-4)² = 16",
        "Step 4: Add squared values: 9 + 16 = 25",
        "Step 5: Take square root"
      ],
      "ans": "5 units",
      "why": "Same as Example 1, just phrased differently"
    },
    {
      "q": "Why is magnitude always positive?",
      "hint": "square root property",
      "steps": [
        "Step 1: Recall magnitude formula: √(x² + y²)",
        "Step 2: x² and y² are always ≥ 0",
        "Step 3: Their sum is also ≥ 0",
        "Step 4: Square root of non-negative is always non-negative",
        "Step 5: Therefore magnitude is always positive"
      ],
      "ans": "Because square roots of positive numbers are positive",
      "why": "Mathematical definition ensures magnitude represents length"
    },
    {
      "q": "Find magnitude and direction of vector v = 2i + 2√3 j",
      "hint": "special triangle 1:√3:2",
      "steps": [
        "Step 1: Identify components: x = 2, y = 2√3",
        "Step 2: Square components: 2² = 4, (2√3)² = 12",
        "Step 3: Add: 4 + 12 = 16",
        "Step 4: Take square root: √16 = 4 (magnitude)",
        "Step 5: Calculate angle: tan(θ) = 2√3 / 2 = √3",
        "Step 6: θ = 60° (recognize 30-60-90 triangle)"
      ],
      "ans": "Magnitude = 4, Direction = 60°",
      "why": "Components form a 30-60-90 triangle with sides 2, 2√3, and hypotenuse 4"
    },
    {
      "q": "If magnitude is 5 and direction is 0°, what is vector form?",
      "hint": "cosine and sine",
      "steps": [
        "Step 1: Use formulas: x = |v|cos(θ), y = |v|sin(θ)",
        "Step 2: Substitute values: x = 5cos(0°), y = 5sin(0°)",
        "Step 3: Evaluate trigonometric functions: cos(0°) = 1, sin(0°) = 0",
        "Step 4: Calculate components: x = 5×1 = 5, y = 5×0 = 0",
        "Step 5: Write vector form"
      ],
      "ans": "5i + 0j or 5i",
      "why": "0° direction means vector points purely along positive x-axis"
    }
  ]
);

add(
  "math",
  "vectors",
  "Vector Addition and Subtraction",

  `
<h2> Vector Addition & Subtraction</h2>

<h3> DEEP NOTES</h3>
<p>
Vectors are added or subtracted by combining corresponding components.
</p>

<pre>
a = (x₁, y₁)
b = (x₂, y₂)

a + b = (x₁ + x₂, y₁ + y₂)
a − b = (x₁ − x₂, y₁ − y₂)
</pre>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Add (2,3) + (4,5)</p>
<p><b>Step 1:</b> Add x-components → 2 + 4 = 6</p>
<p><b>Step 2:</b> Add y-components → 3 + 5 = 8</p>
<p><b>Final Answer:</b> (6,8)</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Subtract (7,1) − (2,3)</p>
<p><b>Step 1:</b> Subtract x-components → 7 − 2 = 5</p>
<p><b>Step 2:</b> Subtract y-components → 1 − 3 = −2</p>
<p><b>Final Answer:</b> (5, −2)</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Add (−3,6) + (3,−6)</p>
<p><b>Step 1:</b> x-components → −3 + 3 = 0</p>
<p><b>Step 2:</b> y-components → 6 − 6 = 0</p>
<p><b>Final Answer:</b> (0,0) → zero vector</p>

---

<h3> DIAGRAM</h3>

<pre>
A →→→
      ↘
        A + B (resultant)
      ↗
B →→→
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Wind + airplane direction</li>
<li>Force combination in physics</li>
<li>Navigation systems</li>
</ul>

---
`,

  [
    {
      "q": "Add vectors (3,4) + (1,2)",
      "hint": "add x and y separately",
      "steps": [
        "Step 1: Add x-components: 3 + 1",
        "Step 2: Add y-components: 4 + 2",
        "Step 3: Combine results"
      ],
      "ans": "(4, 6)",
      "why": "Vector addition combines corresponding components"
    },
    {
      "q": "Subtract vectors (6,8) - (2,3)",
      "hint": "subtract components",
      "steps": [
        "Step 1: Subtract x-components: 6 - 2",
        "Step 2: Subtract y-components: 8 - 3",
        "Step 3: Combine results"
      ],
      "ans": "(4, 5)",
      "why": "Subtraction works same way as addition but with minus signs"
    },
    {
      "q": "Find resultant of (2i + 3j) + (4i - 2j)",
      "hint": "group i and j",
      "steps": [
        "Step 1: Combine i terms: 2i + 4i",
        "Step 2: Combine j terms: 3j - 2j",
        "Step 3: Write final vector"
      ],
      "ans": "6i + 1j or 6i + j",
      "why": "Like terms are added together just like regular algebra"
    },
    {
      "q": "Subtract vectors in i,j form: (8i - 3j) - (4i + 5j)",
      "hint": "distribute negative",
      "steps": [
        "Step 1: Expand: 8i - 3j - 4i - 5j",
        "Step 2: Group i terms: 8i - 4i",
        "Step 3: Group j terms: -3j - 5j",
        "Step 4: Simplify"
      ],
      "ans": "4i - 8j",
      "why": "Distributing the subtraction changes signs of second vector"
    },
    {
      "q": "Add three vectors: (1,1) + (2,2) + (3,3)",
      "hint": "add all x, all y",
      "steps": [
        "Step 1: Add all x-components: 1 + 2 + 3",
        "Step 2: Add all y-components: 1 + 2 + 3",
        "Step 3: Combine"
      ],
      "ans": "(6,6)",
      "why": "Can add any number of vectors by summing components"
    },
    {
      "q": "If v = (x,y), what is v - v?",
      "hint": "same vector subtracted from itself",
      "steps": [
        "Step 1: Set up subtraction: (x-x, y-y)",
        "Step 2: Simplify components"
      ],
      "ans": "(0,0)",
      "why": "Any vector subtracted from itself equals zero vector"
    }
  ]
);

add(
  "math",
  "vectors",
  "Dot Product (Scalar Product)",

  `
<h2> Dot Product</h2>

<h3> DEEP NOTES</h3>
<p>
Dot product gives a SCALAR (single number), not a vector.
It measures how much two vectors align with each other.
</p>

<pre>
a · b = x₁x₂ + y₁y₂
</pre>

 If result is:
<ul>
<li>Positive → vectors point in similar direction</li>
<li>Zero → vectors are perpendicular</li>
<li>Negative → vectors point in opposite directions</li>
</ul>

---

<h3> WORKED EXAMPLES (STEP-BY-STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find (1,2) · (3,4)</p>
<p><b>Step 1:</b> Multiply components → (1×3) + (2×4)</p>
<p><b>Step 2:</b> 3 + 8 = 11</p>
<p><b>Final Answer:</b> 11</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find (2,0) · (5,1)</p>
<p><b>Step 1:</b> (2×5) + (0×1)</p>
<p><b>Step 2:</b> 10 + 0 = 10</p>
<p><b>Final Answer:</b> 10</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Are vectors (1,2) and (2,-1) perpendicular?</p>
<p><b>Step 1:</b> Compute dot product</p>
<p>(1×2) + (2×-1) = 2 - 2 = 0</p>
<p><b>Step 2:</b> Dot product = 0</p>
<p><b>Final Answer:</b> Yes, they are perpendicular</p>

---

<h3> DIAGRAM</h3>

<pre>
Vector A →→
Vector B ↗

Dot product measures overlap (projection)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Physics: work done = force × distance</li>
<li>AI: similarity between data points</li>
<li>Graphics: lighting and shading</li>
</ul>

---
`,

  [
    {
      "q": "Find dot product of (2,3) · (4,5)",
      "hint": "multiply corresponding components then add",
      "steps": [
        "Step 1: Multiply x-components: 2 × 4",
        "Step 2: Multiply y-components: 3 × 5",
        "Step 3: Add the products",
        "Step 4: Final result is scalar"
      ],
      "ans": "23",
      "why": "Dot product measures alignment of vectors"
    },
    {
      "q": "Are vectors (1,2) and (-2,1) perpendicular?",
      "hint": "check if dot product is zero",
      "steps": [
        "Step 1: Compute dot product of (1,2) and (-2,1)",
        "Step 2: (1×-2) + (2×1) = -2 + 2 = 0",
        "Step 3: Result is 0, so they're perpendicular"
      ],
      "ans": "Yes",
      "why": "Perpendicular vectors have zero dot product"
    },
    {
      "q": "Calculate dot product for v = 3i - 4j and w = 4i + 3j",
      "hint": "convert to coordinate form first",
      "steps": [
        "Step 1: Convert to coordinate form: v=(3,-4), w=(4,3)",
        "Step 2: Multiply components: (3×4) + (-4×3)",
        "Step 3: 12 - 12 = 0",
        "Step 4: Final result is scalar"
      ],
      "ans": "0",
      "why": "Vectors are perpendicular (opposite directions)"
    },
    {
      "q": "How does dot product change if one vector is doubled?",
      "hint": "multiply both components by 2",
      "steps": [
        "Step 1: Let original be (x,y)",
        "Step 2: New vector is (2x, 2y)",
        "Step 3: Dot product becomes x(2x) + y(2y) = 2(x²+y²)",
        "Step 4: Result is doubled"
      ],
      "ans": "Doubles",
      "why": "Linear property: a(u·v) = (au)·v"
    },
    {
      "q": "Find dot product of zero vector (0,0) with any vector",
      "hint": "multiply by zero",
      "steps": [
        "Step 1: Let vector be (x,y)",
        "Step 2: Dot product is (0×x) + (0×y)",
        "Step 3: 0 + 0 = 0",
        "Step 4: Result is always zero"
      ],
      "ans": "0",
      "why": "Zero vector has no magnitude, so dot product is always zero"
    },
    {
      "q": "If a · b = 0, what is angle between vectors?",
      "hint": "perpendicular condition",
      "steps": [
        "Step 1: Recall dot product formula: |a||b|cos(θ) = 0",
        "Step 2: If |a| and |b| are nonzero, then cos(θ) must be 0",
        "Step 3: cos(θ) = 0 when θ = 90° or 270°",
        "Step 4: These correspond to perpendicular vectors"
      ],
      "ans": "90° (or 270°)",
      "why": "Zero dot product means vectors are perpendicular"
    }
  ]
);

add(
  "math",
  "vectors",
  "Applications of Vectors",

  `
<h2> Applications of Vectors</h2>

<h3> DEEP NOTES</h3>
<p>
Vectors represent quantities that have both magnitude and direction.
They are essential in describing motion, forces, and spatial relationships.
</p>

---

<h3> EXAMPLE SCENARIOS</h3>

<p><b>Example 1:</b> Plane flying north-east with wind effect</p>
<p><b>Example 2:</b> Car moving on sloped road</p>
<p><b>Example 3:</b> Force pushing object diagonally</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why does a plane not move exactly in the direction it points?</p>
<p><b>Step 1:</b> Wind adds another vector</p>
<p><b>Step 2:</b> Combine plane velocity + wind velocity</p>
<p><b>Final Answer:</b> Resultant vector determines actual direction</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> What happens when two forces act on an object?</p>
<p><b>Step 1:</b> Represent forces as vectors</p>
<p><b>Step 2:</b> Add vectors</p>
<p><b>Final Answer:</b> Resultant force determines motion</p>

---

<h3> DIAGRAM</h3>

<pre>
Wind →→→
Plane ↗ movement
Result → diagonal path
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Aviation navigation</li>
<li>Game physics engines</li>
<li>Engineering force systems</li>
</ul>

---
`,

  [
    {
      "q": "How do you add two vectors (2i + 3j) + (4i + 5j)?",
      "hint": "add like components",
      "steps": [
        "Step 1: Group i components → 2i + 4i",
        "Step 2: Group j components → 3j + 5j",
        "Step 3: Add i components → 6i",
        "Step 4: Add j components → 8j",
        "Step 5: Combine results"
      ],
      "ans": "6i + 8j",
      "why": "Vector addition is performed component-wise"
    },
    {
      "q": "How do you subtract vectors (6i + 7j) - (2i + 3j)?",
      "hint": "distribute minus sign",
      "steps": [
        "Step 1: Expand subtraction → 6i + 7j - 2i - 3j",
        "Step 2: Group i components → 6i - 2i",
        "Step 3: Group j components → 7j - 3j",
        "Step 4: Simplify components"
      ],
      "ans": "4i + 4j",
      "why": "Subtraction is done component-wise after distributing minus"
    },
    {
      "q": "Find resultant of vectors (5i + 2j) + (-3i + 6j)",
      "hint": "combine components",
      "steps": [
        "Step 1: Add i components → 5 + (-3)",
        "Step 2: Add j components → 2 + 6",
        "Step 3: Simplify each component",
        "Step 4: Write final vector"
      ],
      "ans": "2i + 8j",
      "why": "Resultant is obtained by adding corresponding components"
    },
    {
      "q": "What is the zero vector in i and j form?",
      "hint": "no magnitude",
      "steps": [
        "Step 1: Identify zero movement in x-direction → 0i",
        "Step 2: Identify zero movement in y-direction → 0j",
        "Step 3: Combine both components"
      ],
      "ans": "0i + 0j",
      "why": "Zero vector has no magnitude or direction"
    },
    {
      "q": "Find the resultant of (3i - 4j) and (-3i + 4j)",
      "hint": "opposites cancel",
      "steps": [
        "Step 1: Add i components → 3 + (-3)",
        "Step 2: Add j components → -4 + 4",
        "Step 3: Simplify both results",
        "Step 4: Write final vector"
      ],
      "ans": "0i + 0j",
      "why": "Opposite vectors cancel each other out completely"
    }
  ]
);

add(
  "math",
  "limits",
  "Concept of Limits",

  `
<h2> Concept of Limits</h2>

<h3> DEEP NOTES</h3>
<p>
A limit describes the value a function approaches as the input approaches a certain point.  
The function does not always have to reach that value.
</p>

<pre>
lim x→a f(x) = L
</pre>

 As x gets closer to a, f(x) gets closer to L.

---

<h3> EXAMPLES (Exam Style)</h3>

<p><b>Example 1:</b> f(x)=x+2, x→3 → 5</p>
<p><b>Example 2:</b> f(x)=x², x→2 → 4</p>
<p><b>Example 3:</b> f(x)=1/x, x→1 → 1</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find lim (x → 3) (x + 2)</p>
<p><b>Step 1:</b> Substitute x = 3</p>
<p><b>Step 2:</b> 3 + 2 = 5</p>
<p><b>Final Answer:</b> 5</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find lim (x → 2) x²</p>
<p><b>Step 1:</b> Substitute x = 2</p>
<p><b>Step 2:</b> 2² = 4</p>
<p><b>Final Answer:</b> 4</p>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Speed of a moving car at a precise instant</li>
<li>Computer simulations (approximations)</li>
<li>Physics: motion prediction before collision</li>
</ul>

---
`,

  [
    {
      "q": "Evaluate lim x→3 of (2x + 1)",
      "hint": "direct substitution",
      "steps": [
        "Step 1: Identify the function f(x) = 2x + 1",
        "Step 2: Substitute x = 3 into the expression",
        "Step 3: Compute 2(3) + 1",
        "Step 4: Simplify result"
      ],
      "ans": "7",
      "why": "Polynomials are continuous, so limit equals direct substitution"
    },
    {
      "q": "Evaluate lim x→5 of (x² - 9)",
      "hint": "substitute directly",
      "steps": [
        "Step 1: Identify expression f(x) = x² - 9",
        "Step 2: Substitute x = 5",
        "Step 3: Compute 5² - 9",
        "Step 4: Simplify result"
      ],
      "ans": "16",
      "why": "Continuous functions allow direct substitution in limits"
    },
    {
      "q": "Find lim x→2 of (3x - 4)",
      "hint": "plug in value",
      "steps": [
        "Step 1: Write function f(x) = 3x - 4",
        "Step 2: Substitute x = 2",
        "Step 3: Compute 3(2) - 4",
        "Step 4: Simplify"
      ],
      "ans": "2",
      "why": "Linear functions are continuous, so limit equals function value"
    },
    {
      "q": "Find lim x→4 of (x² + 2x)",
      "hint": "substitute x",
      "steps": [
        "Step 1: Identify function f(x) = x² + 2x",
        "Step 2: Substitute x = 4",
        "Step 3: Compute 4² + 2(4)",
        "Step 4: Simplify expression"
      ],
      "ans": "24",
      "why": "Polynomials are continuous so direct substitution applies"
    },
    {
      "q": "Evaluate lim x→1 of (5x + 3)",
      "hint": "direct substitution method",
      "steps": [
        "Step 1: Identify function f(x) = 5x + 3",
        "Step 2: Substitute x = 1",
        "Step 3: Compute 5(1) + 3",
        "Step 4: Simplify"
      ],
      "ans": "8",
      "why": "Linear functions are continuous at all points"
    }
  ]
);

add(
  "math",
  "limits",
  "Left-Hand and Right-Hand Limits",

  `
<h2> Left-Hand & Right-Hand Limits</h2>

<h3> DEEP NOTES</h3>
<p>
Limits can be approached from two directions:
</p>

<pre>
lim x→a⁻ f(x) = left-hand limit  
lim x→a⁺ f(x) = right-hand limit
</pre>

 A limit exists only if both sides are equal.
<h3> WORKED EXAMPLES (MATHEMATICAL CALCULATION FORMAT)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Given lim x→a⁻ f(x) = 4 and lim x→a⁺ f(x) = 4, evaluate the limit.</p>
<p><b>Step 1:</b> Let LHL = 4</p>
<p><b>Step 2:</b> Let RHL = 4</p>
<p><b>Step 3:</b> Compare LHL and RHL</p>
<p><b>Step 4:</b> 4 = 4</p>
<p><b>Step 5:</b> Since both sides are equal, limit exists</p>
<p><b>Final Answer:</b> lim x→a f(x) = 4</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> Given lim x→a⁻ f(x) = 2 and lim x→a⁺ f(x) = 5, determine the limit.</p>
<p><b>Step 1:</b> Let LHL = 2</p>
<p><b>Step 2:</b> Let RHL = 5</p>
<p><b>Step 3:</b> Compare values</p>
<p><b>Step 4:</b> 2 ≠ 5</p>
<p><b>Step 5:</b> Since LHL ≠ RHL, limit does not exist</p>
<p><b>Final Answer:</b> Limit does not exist (DNE)</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> A function has a jump: left side = 7, right side = 3. Determine limit behavior.</p>
<p><b>Step 1:</b> LHL = 7</p>
<p><b>Step 2:</b> RHL = 3</p>
<p><b>Step 3:</b> Compare values</p>
<p><b>Step 4:</b> 7 ≠ 3</p>
<p><b>Step 5:</b> No single approaching value exists</p>
<p><b>Final Answer:</b> Limit does not exist due to discontinuity</p>
<h3> DIAGRAM</h3>

<pre>
   3 |      ● (right side)
     |
   5 |  ● (approach point)
     |
   7 |● (left side)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Digital signals (on/off behavior)</li>
<li>Traffic systems switching states</li>
<li>Computer logic transitions</li>
</ul>

---
`,

  [
    {
      "q": "Find lim x→2 of (3x + 1) using one-sided limits",
      "hint": "check both sides",
      "steps": [
        "Step 1: Compute lim x→2⁻ (3x + 1)",
        "Step 2: Substitute x = 2 → 3(2) + 1",
        "Step 3: Compute left-hand limit = 7",
        "Step 4: Compute lim x→2⁺ (3x + 1)",
        "Step 5: Substitute x = 2 → 3(2) + 1 = 7",
        "Step 6: Compare both sides"
      ],
      "ans": "7",
      "why": "Both one-sided limits are equal, so limit exists"
    },
    {
      "q": "Determine if lim x→1 exists for f(x) = {2x if x<1, x+1 if x>1}",
      "hint": "piecewise function",
      "steps": [
        "Step 1: Compute left-hand limit → 2(1) = 2",
        "Step 2: Compute right-hand limit → 1 + 1 = 2",
        "Step 3: Compare LHL and RHL",
        "Step 4: Check equality condition"
      ],
      "ans": "Limit exists and equals 2",
      "why": "Both sides give same approaching value"
    },
    {
      "q": "Find lim x→4 of f(x) = {x² if x<4, 10 if x>4}",
      "hint": "check discontinuity",
      "steps": [
        "Step 1: Compute LHL → 4² = 16",
        "Step 2: Compute RHL → 10",
        "Step 3: Compare 16 and 10",
        "Step 4: Check equality condition"
      ],
      "ans": "Limit does not exist",
      "why": "Left and right limits are not equal"
    },
    {
      "q": "Find lim x→0 of (x² + 5x) using substitution check",
      "hint": "approach from both sides",
      "steps": [
        "Step 1: Compute lim x→0⁻ (x² + 5x)",
        "Step 2: Substitute values close to 0 → result approaches 0",
        "Step 3: Compute lim x→0⁺ (x² + 5x)",
        "Step 4: Substitute values close to 0 → result approaches 0",
        "Step 5: Compare both sides"
      ],
      "ans": "0",
      "why": "Both sides approach same value"
    },
    {
      "q": "Evaluate lim x→3 of (x² - 9)/(x - 3)",
      "hint": "factorization needed",
      "steps": [
        "Step 1: Factor numerator → (x - 3)(x + 3)",
        "Step 2: Simplify expression → cancel (x - 3)",
        "Step 3: New expression becomes (x + 3)",
        "Step 4: Substitute x = 3",
        "Step 5: Compute 3 + 3"
      ],
      "ans": "6",
      "why": "After simplification, direct substitution is possible"
    },
    {
      "q": "Check if lim x→2 exists for f(x) = {x+2 if x<2, 5 if x>2}",
      "hint": "compare LHL and RHL",
      "steps": [
        "Step 1: Compute LHL → 2 + 2 = 4",
        "Step 2: Compute RHL → 5",
        "Step 3: Compare 4 and 5",
        "Step 4: Determine continuity"
      ],
      "ans": "Limit does not exist",
      "why": "Left and right limits are different"
    }
  ]
);

add(
  "math",
  "limits",
  "Indeterminate Forms",

  `
<h2> Indeterminate Forms</h2>

<h3> DEEP NOTES</h3>
<p>
Indeterminate forms occur when direct substitution in limits gives unclear or undefined results.
</p>

<pre>
0/0, ∞/∞, ∞ - ∞
</pre>

 These do not give a final answer directly and require simplification.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> (x² - 4)/(x - 2)</p>
<p><b>Example 2:</b> (x² - 1)/(x - 1)</p>
<p><b>Example 3:</b> complex fraction simplification</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Evaluate lim (x → 2) (x² - 4)/(x - 2)</p>
<p><b>Step 1:</b> Direct substitution → 0/0 (indeterminate)</p>
<p><b>Step 2:</b> Factor numerator</p>
<p>x² - 4 = (x - 2)(x + 2)</p>
<p><b>Step 3:</b> Cancel (x - 2)</p>
<p><b>Step 4:</b> Substitute x = 2</p>
<p><b>Final Answer:</b> 4</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Evaluate lim (x → 1) (x² - 1)/(x - 1)</p>
<p><b>Step 1:</b> Direct substitution → 0/0</p>
<p><b>Step 2:</b> Factor numerator</p>
<p>x² - 1 = (x - 1)(x + 1)</p>
<p><b>Step 3:</b> Cancel (x - 1)</p>
<p><b>Step 4:</b> Substitute x = 1</p>
<p><b>Final Answer:</b> 2</p>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Physics near-zero calculations</li>
<li>Computer numerical stability</li>
<li>Engineering system limits</li>
</ul>

---
`,

  [
    {
      "q": "Evaluate lim (x → 2) (x² - 4)/(x - 2)",
      "hint": "factor and cancel",
      "steps": [
        "Step 1: Substitute x = 2 → (4 - 4)/(0) = 0/0 (indeterminate form)",
        "Step 2: Factor numerator → x² - 4 = (x - 2)(x + 2)",
        "Step 3: Rewrite expression → [(x - 2)(x + 2)] / (x - 2)",
        "Step 4: Cancel common factor (x - 2)",
        "Step 5: Simplify → x + 2",
        "Step 6: Substitute x = 2 → 2 + 2"
      ],
      "ans": "4",
      "why": "Factoring removes the indeterminate form and reveals the simplified function"
    },
    {
      "q": "Evaluate lim (x → 1) (x² - 1)/(x - 1)",
      "hint": "difference of squares",
      "steps": [
        "Step 1: Substitute x = 1 → (1 - 1)/(0) = 0/0",
        "Step 2: Factor numerator → x² - 1 = (x - 1)(x + 1)",
        "Step 3: Rewrite → [(x - 1)(x + 1)] / (x - 1)",
        "Step 4: Cancel (x - 1)",
        "Step 5: Simplify → x + 1",
        "Step 6: Substitute x = 1 → 1 + 1"
      ],
      "ans": "2",
      "why": "The expression simplifies after cancelling the common factor"
    },
    {
      "q": "Evaluate lim (x → 3) (x² - 9)/(x - 3)",
      "hint": "factor quadratic",
      "steps": [
        "Step 1: Substitute x = 3 → (9 - 9)/(0) = 0/0",
        "Step 2: Factor numerator → x² - 9 = (x - 3)(x + 3)",
        "Step 3: Rewrite → [(x - 3)(x + 3)] / (x - 3)",
        "Step 4: Cancel (x - 3)",
        "Step 5: Simplify → x + 3",
        "Step 6: Substitute x = 3 → 3 + 3"
      ],
      "ans": "6",
      "why": "Indeterminate form resolves after factoring and cancellation"
    },
    {
      "q": "Evaluate lim (x → 4) (x² - 16)/(x - 4)",
      "hint": "difference of squares",
      "steps": [
        "Step 1: Substitute x = 4 → (16 - 16)/(0) = 0/0",
        "Step 2: Factor numerator → x² - 16 = (x - 4)(x + 4)",
        "Step 3: Cancel (x - 4)",
        "Step 4: Simplify → x + 4",
        "Step 5: Substitute x = 4 → 4 + 4"
      ],
      "ans": "8",
      "why": "Canceling the common factor removes the indeterminate form"
    },
    {
      "q": "Evaluate lim (x → 5) (x² - 25)/(x - 5)",
      "hint": "factorization",
      "steps": [
        "Step 1: Substitute x = 5 → (25 - 25)/(0) = 0/0",
        "Step 2: Factor numerator → x² - 25 = (x - 5)(x + 5)",
        "Step 3: Cancel (x - 5)",
        "Step 4: Simplify → x + 5",
        "Step 5: Substitute x = 5 → 5 + 5"
      ],
      "ans": "10",
      "why": "Factorization resolves the indeterminate expression"
    }
  ]
);

add(
  "math",
  "limits",
  "One-Sided Limit Problems",

  `
<h2> One-Sided Limits (Advanced)</h2>

<h3> DEEP NOTES</h3>
<p>
One-sided limits describe the value a function approaches from one direction only.
</p>

<pre>
lim (x → a⁻) f(x)  → left-hand limit  
lim (x → a⁺) f(x)  → right-hand limit
</pre>

 If both sides are equal → limit exists  
 If different → discontinuity

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> step function jump</p>
<p><b>Example 2:</b> absolute value function</p>
<p><b>Example 3:</b> piecewise function</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Evaluate one-sided limits of f(x) = |x| at x = 0</p>
<p><b>Step 1:</b> Left side (x → 0⁻) → f(x) = -x → 0</p>
<p><b>Step 2:</b> Right side (x → 0⁺) → f(x) = x → 0</p>
<p><b>Final Answer:</b> both equal → limit exists = 0</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> What happens if left ≠ right?</p>
<p><b>Step 1:</b> Compare both sides</p>
<p><b>Step 2:</b> If values differ → no single limit</p>
<p><b>Final Answer:</b> limit does not exist</p>

---

<h3> DIAGRAM</h3>

<pre>
x → 0
Left side: ●●●
Jump
Right side: ●●●●●
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Computer graphics edge detection</li>
<li>Digital signal switching</li>
<li>Economics sudden price changes</li>
</ul>

---
`,

  [
    {
      "q": "When does lim x→a f(x) exist using one-sided limits?",
      "hint": "compare both sides",
      "steps": [
        "Step 1: Compute lim x→a⁻ f(x)",
        "Step 2: Compute lim x→a⁺ f(x)",
        "Step 3: Let left-hand limit = L",
        "Step 4: Let right-hand limit = R",
        "Step 5: Compare L and R",
        "Step 6: If L = R, limit exists"
      ],
      "ans": "When lim x→a⁻ f(x) = lim x→a⁺ f(x)",
      "why": "A limit exists only when both directional values are equal"
    },
    {
      "q": "Determine whether a limit exists if lim x→2⁻ f(x) = 5 and lim x→2⁺ f(x) = 5",
      "hint": "compare values",
      "steps": [
        "Step 1: Identify left-hand limit = 5",
        "Step 2: Identify right-hand limit = 5",
        "Step 3: Compare both values",
        "Step 4: Check equality condition",
        "Step 5: Conclude result"
      ],
      "ans": "Limit exists and equals 5",
      "why": "Both one-sided limits are equal"
    },
    {
      "q": "Determine limit existence if lim x→3⁻ f(x) = 4 and lim x→3⁺ f(x) = 7",
      "hint": "check discontinuity",
      "steps": [
        "Step 1: Left-hand limit = 4",
        "Step 2: Right-hand limit = 7",
        "Step 3: Compare 4 and 7",
        "Step 4: Identify inequality",
        "Step 5: Conclude limit behavior"
      ],
      "ans": "Limit does not exist",
      "why": "Unequal one-sided limits indicate a jump discontinuity"
    },
    {
      "q": "Find result when lim x→5⁻ f(x) = 10 and lim x→5⁺ f(x) = 10",
      "hint": "equal sides",
      "steps": [
        "Step 1: Left-hand limit = 10",
        "Step 2: Right-hand limit = 10",
        "Step 3: Compare values",
        "Step 4: Confirm equality",
        "Step 5: State final result"
      ],
      "ans": "Limit exists and equals 10",
      "why": "Equal one-sided limits confirm continuity at that point"
    }
  ]
);

add(
  "math",
  "limits",
  "Applications of Limits",

  `
<h2> Applications of Limits</h2>

<h3> DEEP NOTES</h3>
<p>
Limits describe the value a function approaches as the input gets closer to a certain point.  
They are the foundation of differentiation and integration.
</p>

<pre>
lim (x → a) f(x)
</pre>

 Used to define instantaneous change and continuity.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> instantaneous velocity</p>
<p><b>Example 2:</b> population growth prediction</p>
<p><b>Example 3:</b> machine learning gradient estimation</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why is limit used in velocity?</p>
<p><b>Step 1:</b> Average speed = distance/time</p>
<p><b>Step 2:</b> Make time interval very small</p>
<p><b>Step 3:</b> Use limit</p>
<p><b>Final Answer:</b> To find instantaneous velocity</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> What happens as x → 2 in f(x) = x²?</p>
<p><b>Step 1:</b> Substitute value</p>
<p>f(2) = 4</p>
<p><b>Final Answer:</b> limit = 4</p>

---

<h3> DIAGRAM</h3>

<pre>
Distance vs Time curve:
Smooth curve → tangent at a point = limit concept
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Physics motion analysis</li>
<li>AI optimization models</li>
<li>Financial forecasting</li>
</ul>

`,

  [
    {
      "q": "Why are limits important?",
      "hint": "used in derivatives and integrals",
      "ans": "foundation of calculus",
      "why": "Limits define both differentiation and integration, forming the core of calculus."
    },
    {
      "q": "Give one real-world use of limits",
      "hint": "motion",
      "ans": "instantaneous speed",
      "why": "Limits are used to calculate velocity at a specific moment in time."
    },
    {
      "q": "What does lim x→a f(x) mean?",
      "hint": "approaching value",
      "ans": "value f(x) approaches as x nears a",
      "why": "It represents the value a function gets close to near a specific input."
    }
  ]
);

add(
  "math",
  "differentiation",
  "Gradient of a Curve",

  `
<h2> Gradient of a Curve</h2>

<h3> DEEP NOTES</h3>
<p>
The gradient of a curve shows how steep the curve is at a specific point. It is calculated using differentiation and represents the instantaneous rate of change.
</p>

<pre>
dy/dx = gradient at a point
</pre>

 It represents the slope of the tangent at that point.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> y = x² → gradient at x = 2 is 4</p>
<p><b>Example 2:</b> y = x³ → gradient at x = 1 is 3</p>
<p><b>Example 3:</b> y = 2x + 5 → gradient is constant = 2</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find gradient of y = x² at x = 3</p>
<p><b>Step 1:</b> Differentiate</p>
<p>dy/dx = 2x</p>
<p><b>Step 2:</b> Substitute x = 3</p>
<p>dy/dx = 6</p>
<p><b>Final Answer:</b> gradient = 6</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find gradient of y = 5x at any point</p>
<p><b>Step 1:</b> Differentiate</p>
<p>dy/dx = 5</p>
<p><b>Final Answer:</b> gradient is constant = 5</p>

---

<h3> DIAGRAM</h3>

<pre>
      /
     /  ← tangent line (gradient here)
    /
---•---------- curve point
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Road slope measurement</li>
<li>Mountain incline calculation</li>
<li>Engineering design of ramps</li>
</ul>

---
`,

  [
    {
      "q": "Find gradient of curve using dy/dx at a point",
      "hint": "differentiate then substitute",
      "steps": [
        "Step 1: Start with function y = f(x)",
        "Step 2: Differentiate to find dy/dx",
        "Step 3: Substitute the given x-value",
        "Step 4: Compute gradient at that point"
      ],
      "ans": "Value of dy/dx at the given point",
      "why": "Gradient of a curve is found using differentiation at a specific point"
    },
    {
      "q": "Find dy/dx for y = x² and evaluate at x = 3",
      "hint": "power rule",
      "steps": [
        "Step 1: Differentiate y = x² → dy/dx = 2x",
        "Step 2: Substitute x = 3",
        "Step 3: Compute 2 × 3",
        "Step 4: Get final gradient"
      ],
      "ans": "6",
      "why": "Derivative gives slope of tangent at a point"
    },
    {
      "q": "Find gradient of y = 2x + 3",
      "hint": "linear function rule",
      "steps": [
        "Step 1: Identify equation y = mx + c",
        "Step 2: Recognize coefficient of x",
        "Step 3: Extract m value",
        "Step 4: State gradient"
      ],
      "ans": "2",
      "why": "In linear equations, gradient is the coefficient of x"
    },
    {
      "q": "Find dy/dx of y = 3x² at x = 2",
      "hint": "power rule",
      "steps": [
        "Step 1: Differentiate y = 3x² → dy/dx = 6x",
        "Step 2: Substitute x = 2",
        "Step 3: Multiply 6 × 2",
        "Step 4: Compute gradient"
      ],
      "ans": "12",
      "why": "Derivative gives instantaneous rate of change"
    }
  ]
);

add(
  "math",
  "differentiation",
  "Rate of Change",

  `
<h2> Rate of Change</h2>

<h3> DEEP NOTES</h3>
<p>
Rate of change describes how one quantity changes with respect to another. It is the foundation of differentiation.
</p>

<pre>
dy/dx = rate of change
</pre>

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> distance vs time = speed</p>
<p><b>Example 2:</b> y = x² → rate = 2x</p>
<p><b>Example 3:</b> population growth curve</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> If s = t², find rate of change of distance.</p>
<p><b>Step 1:</b> Differentiate</p>
<p>ds/dt = 2t</p>
<p><b>Final Answer:</b> rate = 2t</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find rate of change of y = x² at x = 3</p>
<p><b>Step 1:</b> Differentiate</p>
<p>dy/dx = 2x</p>
<p><b>Step 2:</b> Substitute x = 3</p>
<p>dy/dx = 6</p>
<p><b>Final Answer:</b> 6</p>

---

<h3> DIAGRAM</h3>

<pre>
Time →
Distance curve rising ↑
Slope shows speed
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Speed of cars (physics)</li>
<li>Stock market growth rate</li>
<li>Population increase models</li>
</ul>

---
`,

  [
    {
      "q": "Find rate of change of y with respect to x for y = 3x² at x = 2",
      "hint": "differentiate then substitute",
      "steps": [
        "Step 1: Start with y = 3x²",
        "Step 2: Differentiate → dy/dx = 6x",
        "Step 3: Substitute x = 2",
        "Step 4: Compute 6 × 2",
        "Step 5: Final value of rate of change"
      ],
      "ans": "12",
      "why": "Rate of change is found using differentiation and substitution"
    },
    {
      "q": "Find dy/dx for y = 5x at any point",
      "hint": "linear rule",
      "steps": [
        "Step 1: Identify y = mx form",
        "Step 2: Differentiate → dy/dx = 5",
        "Step 3: Note constant slope",
        "Step 4: State rate of change"
      ],
      "ans": "5",
      "why": "Linear functions have constant rate of change equal to slope"
    },
    {
      "q": "A car travels distance s = 4t². Find speed at t = 3",
      "hint": "differentiate distance",
      "steps": [
        "Step 1: Start with s = 4t²",
        "Step 2: Differentiate → ds/dt = 8t",
        "Step 3: Substitute t = 3",
        "Step 4: Compute 8 × 3",
        "Step 5: Final speed value"
      ],
      "ans": "24",
      "why": "Speed is rate of change of distance with respect to time"
    },
    {
      "q": "Find rate of change of y = x³ at x = 1",
      "hint": "power rule",
      "steps": [
        "Step 1: Differentiate y = x³ → dy/dx = 3x²",
        "Step 2: Substitute x = 1",
        "Step 3: Compute 3 × 1²",
        "Step 4: Final value"
      ],
      "ans": "3",
      "why": "Derivative gives instantaneous rate of change"
    }
  ]
);

add(
  "math",
  "differentiation",
  "Maxima and Minima",

  `
<h2> Maxima and Minima</h2>

<h3> DEEP NOTES</h3>
<p>
Maxima are highest points and minima are lowest points of a curve.  
They occur where the derivative equals zero.
</p>

<pre>
dy/dx = 0 → critical point
</pre>

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> y = x² has minimum at x = 0</p>
<p><b>Example 2:</b> y = −x² has maximum at x = 0</p>
<p><b>Example 3:</b> profit optimization in business models</p>

---

<h3> WORKED EXAMPLES</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find stationary point of y = x²</p>
<p><b>Step 1:</b> dy/dx = 2x</p>
<p><b>Step 2:</b> 2x = 0 → x = 0</p>
<p><b>Final Answer:</b> minimum at x = 0</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find maxima of y = −x²</p>
<p><b>Step 1:</b> dy/dx = −2x</p>
<p><b>Step 2:</b> −2x = 0 → x = 0</p>
<p><b>Final Answer:</b> maximum at x = 0</p>

---
`,

  [
    {
      "q": "Find turning point and determine maximum/minimum for y = -x² + 6x - 5",
      "hint": "differentiate and classify",
      "steps": [
        "Step 1: Differentiate y = -x² + 6x - 5 → dy/dx = -2x + 6",
        "Step 2: Set dy/dx = 0 → -2x + 6 = 0",
        "Step 3: Solve → 2x = 6",
        "Step 4: x = 3",
        "Step 5: Since coefficient of x² is negative, curve opens downward",
        "Step 6: Therefore turning point is a maximum"
      ],
      "ans": "x = 3 (maximum point)",
      "why": "Negative x² means the parabola opens downward, giving a maximum"
    },
    {
      "q": "Find maximum point of y = -2x² + 8x + 1",
      "hint": "dy/dx = 0",
      "steps": [
        "Step 1: Differentiate → dy/dx = -4x + 8",
        "Step 2: Set dy/dx = 0 → -4x + 8 = 0",
        "Step 3: Solve → 4x = 8",
        "Step 4: x = 2",
        "Step 5: Substitute into original function → y = -2(2²) + 8(2) + 1",
        "Step 6: y = -8 + 16 + 1 = 9"
      ],
      "ans": "(2, 9) maximum point",
      "why": "Vertex gives highest value because parabola opens downward"
    },
    {
      "q": "Find minimum point of y = x² + 8x + 12",
      "hint": "complete or differentiate",
      "steps": [
        "Step 1: Differentiate → dy/dx = 2x + 8",
        "Step 2: Set dy/dx = 0 → 2x + 8 = 0",
        "Step 3: Solve → 2x = -8",
        "Step 4: x = -4",
        "Step 5: Substitute into function → y = (-4)² + 8(-4) + 12",
        "Step 6: y = 16 - 32 + 12 = -4"
      ],
      "ans": "(-4, -4) minimum point",
      "why": "Positive x² means parabola opens upward giving a minimum"
    },
    {
      "q": "Find stationary point of y = x² - 10x + 25 and classify it",
      "hint": "perfect square form",
      "steps": [
        "Step 1: Differentiate → dy/dx = 2x - 10",
        "Step 2: Set dy/dx = 0 → 2x - 10 = 0",
        "Step 3: Solve → 2x = 10",
        "Step 4: x = 5",
        "Step 5: Substitute → y = 25 - 50 + 25 = 0",
        "Step 6: Since coefficient of x² is positive, it is a minimum"
      ],
      "ans": "(5, 0) minimum point",
      "why": "Perfect square quadratic always has a minimum vertex"
    },
    {
      "q": "Find maximum value of y = 3x - x²",
      "hint": "rearrange quadratic",
      "steps": [
        "Step 1: Rewrite y = -x² + 3x",
        "Step 2: Differentiate → dy/dx = -2x + 3",
        "Step 3: Set dy/dx = 0 → -2x + 3 = 0",
        "Step 4: Solve → 2x = 3",
        "Step 5: x = 3/2",
        "Step 6: Substitute → y = 3(3/2) - (3/2)²",
        "Step 7: y = 9/2 - 9/4 = 9/4"
      ],
      "ans": "(3/2, 9/4) maximum point",
      "why": "Negative x² ensures a maximum at vertex"
    }
  ]
);

add(
  "math",
  "differentiation",
  "Tangents and Normals",

  `
<h2> Tangents and Normals</h2>

<h3> DEEP NOTES</h3>
<p>
A tangent is a straight line that touches a curve at exactly one point without crossing it locally.
A normal is a line perpendicular to the tangent at the same point.
</p>

<pre>
Slope of tangent = dy/dx  
Slope of normal = -1 / (dy/dx)
</pre>

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> slope of tangent = dy/dx</p>
<p><b>Example 2:</b> slope of normal = -1/(dy/dx)</p>
<p><b>Example 3:</b> curve intersection point analysis</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find slope of tangent to y = x² at x = 2</p>
<p><b>Step 1:</b> Differentiate</p>
<p>dy/dx = 2x</p>
<p><b>Step 2:</b> Substitute x = 2</p>
<p>dy/dx = 4</p>
<p><b>Final Answer:</b> slope of tangent = 4</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find slope of normal when slope of tangent is 3</p>
<p><b>Step 1:</b> Use formula</p>
<p>slope(normal) = -1/3</p>
<p><b>Final Answer:</b> -1/3</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why are tangent and normal perpendicular?</p>
<p><b>Step 1:</b> They intersect at 90°</p>
<p><b>Step 2:</b> Product of slopes = -1</p>
<p><b>Final Answer:</b> Because perpendicular lines satisfy m₁·m₂ = -1</p>

---

<h3> DIAGRAM</h3>

<pre>
      tangent /
             /
   curve •---
                           normal ⟂
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Road design angles</li>
<li>Reflection of light in physics</li>
<li>Engineering stress directions</li>
</ul>

---
`,

  [
    {
      "q": "Find slope of tangent to y = x² at x = 4",
      "hint": "differentiate and substitute",
      "steps": [
        "Step 1: Differentiate y = x² → dy/dx = 2x",
        "Step 2: Substitute x = 4",
        "Step 3: Compute 2 × 4",
        "Step 4: Final slope value"
      ],
      "ans": "8",
      "why": "Derivative gives slope of tangent at a point"
    },
    {
      "q": "If tangent slope is 3, what is slope of normal?",
      "hint": "negative reciprocal",
      "steps": [
        "Step 1: Identify tangent slope m = 3",
        "Step 2: Use formula slope(normal) = -1/m",
        "Step 3: Compute -1/3",
        "Step 4: Final result"
      ],
      "ans": "-1/3",
      "why": "Perpendicular lines have slopes that multiply to -1"
    },
    {
      "q": "Find equation of tangent to y = x² at (2, 4)",
      "hint": "point-slope form",
      "steps": [
        "Step 1: Differentiate to find slope at x = 2",
        "Step 2: dy/dx = 2x → slope = 4",
        "Step 3: Use point (2, 4) and slope 4",
        "Step 4: Equation: y - 4 = 4(x - 2)",
        "Step 5: Simplify → y = 4x - 4"
      ],
      "ans": "y = 4x - 4",
      "why": "Tangent is a straight line touching the curve at a point"
    },
    {
      "q": "Find equation of tangent slope for y = x² at x = 2",
      "hint": "differentiate then substitute",
      "steps": [
        "Step 1: Differentiate y = x² → dy/dx = 2x",
        "Step 2: Substitute x = 2",
        "Step 3: Compute 2 × 2",
        "Step 4: Tangent slope = 4"
      ],
      "ans": "4",
      "why": "Tangent slope is found using derivative at a point"
    },
    {
      "q": "Find equation of normal slope if tangent slope is 3",
      "hint": "negative reciprocal",
      "steps": [
        "Step 1: Identify tangent slope m = 3",
        "Step 2: Apply normal formula = -1/m",
        "Step 3: Substitute values → -1/3",
        "Step 4: Simplify result"
      ],
      "ans": "-1/3",
      "why": "Normal is perpendicular to tangent, so slopes multiply to -1"
    },
    {
      "q": "Find slope of tangent for y = 3x² + 2x at x = 1",
      "hint": "differentiate first",
      "steps": [
        "Step 1: Differentiate y → dy/dx = 6x + 2",
        "Step 2: Substitute x = 1",
        "Step 3: Compute 6(1) + 2",
        "Step 4: Final slope = 8"
      ],
      "ans": "8",
      "why": "Derivative gives slope of tangent at a point"
    },
    {
      "q": "Find normal slope if tangent slope is -5",
      "hint": "negative reciprocal rule",
      "steps": [
        "Step 1: Tangent slope m = -5",
        "Step 2: Apply formula -1/m",
        "Step 3: Compute -1 / (-5)",
        "Step 4: Simplify result"
      ],
      "ans": "1/5",
      "why": "Normal is perpendicular so slope is negative reciprocal"
    },
    {
      "q": "Find equation of tangent to y = x² at point (2, 4)",
      "hint": "first find slope, then use point-slope form",
      "steps": [
        "Step 1: Differentiate y = x² → dy/dx = 2x",
        "Step 2: Substitute x = 2 → slope m = 4",
        "Step 3: Use point (2, 4) in y - y₁ = m(x - x₁)",
        "Step 4: Equation becomes y - 4 = 4(x - 2)",
        "Step 5: Simplify → y = 4x - 4"
      ],
      "ans": "y = 4x - 4",
      "why": "Tangent is a line touching curve at a point; its slope is the derivative value at that point"
    },
    {
      "q": "Find equation of normal to y = x² at (2, 4)",
      "hint": "use perpendicular slope",
      "steps": [
        "Step 1: Slope of tangent at x = 2 is m = 4",
        "Step 2: Normal slope is perpendicular → -1/4",
        "Step 3: Use point (2, 4) in y - y₁ = m(x - x₁)",
        "Step 4: Equation: y - 4 = -1/4(x - 2)",
        "Step 5: Simplify to standard form"
      ],
      "ans": "y = -1/4x + 9/2",
      "why": "Normal is perpendicular to tangent at the same point, hence negative reciprocal slope"
    },
    {
      "q": "Find x-intercept of tangent to y = x² at x = 3",
      "hint": "first find tangent equation",
      "steps": [
        "Step 1: Differentiate y = x² → dy/dx = 2x",
        "Step 2: At x = 3, slope m = 2(3) = 6",
        "Step 3: Point is (3, 3²) = (3, 9)",
        "Step 4: Tangent equation: y - 9 = 6(x - 3)",
        "Step 5: Set y = 0 to find x-intercept → -9 = 6x - 18",
        "Step 6: Solve for x → x = 9/6 = 3/2"
      ],
      "ans": "x = 3/2",
      "why": "The tangent line has a specific slope and passes through the point, allowing its intercepts to be calculated"
    },
    {
      "q": "At what x-value is tangent to y = x² parallel to line y = 4x + 1?",
      "hint": "slopes must be equal",
      "steps": [
        "Step 1: Slope of given line is 4",
        "Step 2: Slope of tangent is derivative dy/dx = 2x",
        "Step 3: Set slopes equal → 2x = 4",
        "Step 4: Solve for x → x = 2"
      ],
      "ans": "x = 2",
      "why": "Parallel lines have equal slopes, so we equate tangent slope to line slope and solve for x"
    },
    {
      "q": "Find the perpendicular distance from origin (0, 0) to tangent of y = x² at x = 4",
      "hint": "find tangent equation first",
      "steps": [
        "Step 1: At x = 4, slope m = 2(4) = 8",
        "Step 2: Point is (4, 4²) = (4, 16)",
        "Step 3: Tangent equation: y - 16 = 8(x - 4) → 8x - y - 16 = 0",
        "Step 4: Use distance formula from point (x₀, y₀) to line Ax + By + C = 0: distance = |Ax₀ + By₀ + C| / sqrt(A² + B²)",
        "Step 5: For origin (0, 0) and line 8x - y - 16 = 0 → distance = |-16| / sqrt(8² + (-1)²)",
        "Step 6: Simplify → distance = 16 / sqrt(65)"
      ],
      "ans": "16/sqrt(65)",
      "why": "Perpendicular distance formula is used to find distance from origin to the calculated tangent line"
    }
  ]
);

add(
  "math",
  "differentiation",
  "Applications of Differentiation",

  `
<h2> Applications of Differentiation</h2>


<h3> DEEP NOTES</h3>
<p>
Differentiation is used to model change in real systems. It tells how fast one quantity changes with respect to another.
</p>

<p>
Geometrically, the derivative represents the slope of a curve at a point.
</p>

<pre>
f'(x) = rate of change
</pre>

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> speed of moving object</p>
<p><b>Example 2:</b> maximizing profit function</p>
<p><b>Example 3:</b> minimizing cost of production</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> A position is given by s(t) = t². Find velocity.</p>
<p><b>Step 1:</b> Differentiate position</p>
<p>v(t) = ds/dt = 2t</p>
<p><b>Step 2:</b> Interpret result</p>
<p>Velocity increases with time</p>
<p><b>Final Answer:</b> v(t) = 2t</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find stationary points of f(x) = x² - 4x</p>
<p><b>Step 1:</b> Differentiate</p>
<p>f'(x) = 2x - 4</p>
<p><b>Step 2:</b> Set derivative to zero</p>
<p>2x - 4 = 0 → x = 2</p>
<p><b>Final Answer:</b> x = 2 is a stationary point</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why is differentiation used in optimization?</p>
<p><b>Step 1:</b> Identify maximum/minimum points</p>
<p><b>Step 2:</b> These occur when slope = 0</p>
<p><b>Final Answer:</b> Because derivatives help locate maxima and minima</p>

---

<h3> DIAGRAM</h3>

<pre>
Curve → slope at each point = change rate
Peak point → slope = 0
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Physics motion equations</li>
<li>AI gradient descent learning</li>
<li>Economics optimization models</li>
</ul>

---
`,

  [
    {
      "q": "Why is differentiation important?",
      "hint": "rate of change",
      "ans": "measures change",
      "why": "It quantifies how one variable changes with respect to another"
    },
    {
      "q": "Give real-life use",
      "hint": "motion or business",
      "ans": "speed or profit optimization",
      "why": "Used in physics for velocity and in economics for maximizing profit"
    },
    {
      "q": "What does f'(x) represent?",
      "hint": "derivative meaning",
      "ans": "rate of change or slope",
      "why": "It represents instantaneous rate of change of a function"
    }
  ]
);

add(
  "math",
  "integration",
  "Area Under a Curve",

  `
<h2> Area Under a Curve</h2>

<h3> DEEP NOTES</h3>
<p>
Integration is used to calculate the area between a curve and the x-axis over a given interval.
For positive functions, this area is directly given by a definite integral.
</p>

<pre>
∫ f(x) dx = area under curve
</pre>

 It is the reverse process of differentiation and accumulates infinitely small slices into a total area.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> ∫ x dx = x²/2</p>
<p><b>Example 2:</b> ∫ x² dx = x³/3</p>
<p><b>Example 3:</b> ∫ 2x dx = x²</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find ∫₀¹ x dx</p>
<p><b>Step 1:</b> Antiderivative of x</p>
<p>x²/2</p>
<p><b>Step 2:</b> Apply limits</p>
<p>(1²/2) - (0²/2)</p>
<p><b>Final Answer:</b> 1/2 (area under curve)</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find ∫₀² x² dx</p>
<p><b>Step 1:</b> Antiderivative</p>
<p>x³/3</p>
<p><b>Step 2:</b> Apply limits</p>
<p>(2³/3) - (0³/3)</p>
<p><b>Final Answer:</b> 8/3</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What does a definite integral represent geometrically?</p>
<p><b>Step 1:</b> It sums infinitely small rectangles under curve</p>
<p><b>Step 2:</b> Total gives enclosed region</p>
<p><b>Final Answer:</b> The area under a curve over an interval</p>

---

<h3> DIAGRAM</h3>

<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 180" width="280" height="180" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
  <defs>
    <pattern id="grid-lp" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22223b" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
    <marker id="arrow-y" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
  </defs>

  <rect width="280" height="180" fill="url(#grid-lp)"/>
  <path d="M 60,140 L 60,110 C 100,60 180,40 220,100 L 220,140 Z" fill="#2ecc71" opacity="0.3"/>
  <line x1="30" y1="140" x2="260" y2="140" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="160" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <path d="M 50,115 C 100,50 180,30 230,115" fill="none" stroke="#2ecc71" stroke-width="2.5"/>
  <line x1="60" y1="140" x2="60" y2="108" stroke="#fff" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="220" y1="140" x2="220" y2="101" stroke="#fff" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="140" y="115" fill="#2ecc71" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">Area Under Curve</text>
  <text x="140" y="127" fill="#2ecc71" font-size="8" font-family="monospace" text-anchor="middle">A = ∫ f(x) dx</text>
  <text x="180" y="45" fill="#fff" font-size="9" font-family="monospace" font-weight="bold">y = f(x)</text>
  <text x="260" y="144" fill="#aaa" font-size="8" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="8" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Calculating land area with curved boundaries</li>
<li>Physics: distance from velocity-time graph</li>
<li>Engineering material distribution</li>
</ul>

---
`,

  [
    {
      "q": "Evaluate ∫ x dx",
      "hint": "power rule integration",
      "steps": [
        "Step 1: Increase power of x by 1 → x¹ becomes x²",
        "Step 2: Divide by new power → x² / 2",
        "Step 3: Add constant of integration C",
        "Step 4: Final expression"
      ],
      "ans": "x²/2 + C",
      "why": "Integration is reverse of differentiation using power rule"
    },
    {
      "q": "Evaluate ∫ x² dx",
      "hint": "increase power",
      "steps": [
        "Step 1: Increase exponent → x² becomes x³",
        "Step 2: Divide by new exponent → x³ / 3",
        "Step 3: Add constant C",
        "Step 4: Write final result"
      ],
      "ans": "x³/3 + C",
      "why": "Power rule: add 1 to exponent then divide"
    },
    {
      "q": "Evaluate definite integral ∫ from 0 to 2 of x dx",
      "hint": "area under curve",
      "steps": [
        "Step 1: Find integral of x → x²/2",
        "Step 2: Substitute upper limit 2 → (2²)/2 = 4/2 = 2",
        "Step 3: Substitute lower limit 0 → 0²/2 = 0",
        "Step 4: Subtract upper - lower → 2 - 0",
        "Step 5: Final answer"
      ],
      "ans": "2",
      "why": "Definite integrals give net area under curve"
    },
    {
      "q": "Evaluate ∫ 3x² dx",
      "hint": "constant multiple rule",
      "steps": [
        "Step 1: Keep constant 3 outside",
        "Step 2: Integrate x² → x³/3",
        "Step 3: Multiply → 3 × (x³/3)",
        "Step 4: Simplify expression",
        "Step 5: Add +C"
      ],
      "ans": "x³ + C",
      "why": "Constant multiples remain unchanged in integration"
    }
  ]
);

add(
  "math",
  "integration",
  "Indefinite Integrals",

  `
<h2> Indefinite Integrals</h2>

<h3> DEEP NOTES</h3>
<p>
Indefinite integrals have NO limits and include a constant C because differentiation removes constants.
</p>

<pre>
∫ f(x) dx = F(x) + C
</pre>

 They represent a FAMILY of functions, not a single value.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> ∫ x dx = x²/2 + C</p>
<p><b>Example 2:</b> ∫ 3x² dx = x³ + C</p>
<p><b>Example 3:</b> ∫ 5 dx = 5x + C</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Evaluate ∫ x dx</p>
<p><b>Step 1:</b> Increase power by 1</p>
<p>x → x²</p>
<p><b>Step 2:</b> Divide by new power</p>
<p>x²/2</p>
<p><b>Step 3:</b> Add constant</p>
<p><b>Final Answer:</b> x²/2 + C</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Evaluate ∫ 3x² dx</p>
<p><b>Step 1:</b> Apply power rule</p>
<p>3x² → x³</p>
<p><b>Step 2:</b> Add constant</p>
<p><b>Final Answer:</b> x³ + C</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why is +C required in integration?</p>
<p><b>Step 1:</b> Differentiation removes constants</p>
<p><b>Step 2:</b> Many functions share same derivative</p>
<p><b>Final Answer:</b> +C represents all possible vertical shifts of the function</p>

---

<h3> DIAGRAM</h3>

<pre>
Family of curves:
Same shape, different vertical shifts (C)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Reconstructing motion from acceleration</li>
<li>Physics energy systems</li>
<li>Economics cumulative growth</li>
</ul>

---
`,

  [
    {
      "q": "Evaluate ∫ x dx",
      "hint": "power rule integration",
      "steps": [
        "Step 1: Increase power of x by 1 → x¹ becomes x²",
        "Step 2: Divide by new power → x² / 2",
        "Step 3: Add constant of integration C",
        "Step 4: Final expression"
      ],
      "ans": "x²/2 + C",
      "why": "Integration is reverse of differentiation using power rule"
    },
    {
      "q": "Evaluate ∫ x² dx",
      "hint": "increase power",
      "steps": [
        "Step 1: Increase exponent → x² becomes x³",
        "Step 2: Divide by new exponent → x³ / 3",
        "Step 3: Add constant C",
        "Step 4: Write final result"
      ],
      "ans": "x³/3 + C",
      "why": "Power rule: add 1 to exponent then divide"
    },
    {
      "q": "Evaluate definite integral ∫ from 0 to 2 of x dx",
      "hint": "area under curve",
      "steps": [
        "Step 1: Find integral of x → x²/2",
        "Step 2: Substitute upper limit 2 → (2²)/2 = 4/2 = 2",
        "Step 3: Substitute lower limit 0 → 0²/2 = 0",
        "Step 4: Subtract upper - lower → 2 - 0",
        "Step 5: Final answer"
      ],
      "ans": "2",
      "why": "Definite integrals give net area under curve"
    },
    {
      "q": "Evaluate ∫ 3x² dx",
      "hint": "constant multiple rule",
      "steps": [
        "Step 1: Keep constant 3 outside",
        "Step 2: Integrate x² → x³/3",
        "Step 3: Multiply → 3 × (x³/3)",
        "Step 4: Simplify expression",
        "Step 5: Add +C"
      ],
      "ans": "x³ + C",
      "why": "Constant multiples remain unchanged in integration"
    },
    {
      "q": "Why does integration represent area under a curve?",
      "hint": "limit of rectangles",
      "steps": [
        "Step 1: Divide area under curve into small rectangles",
        "Step 2: Approximate each rectangle’s area",
        "Step 3: Increase number of rectangles",
        "Step 4: Make width approach zero",
        "Step 5: Sum becomes exact area"
      ],
      "ans": "Sum of infinitely small areas",
      "why": "Integration is the limit of summing thin rectangles"
    }
  ]
);

add(
  "math",
  "integration",
  "Definite Integrals",

  `
<h2> Definite Integrals</h2>

<h3> DEEP NOTES</h3>
<p>
Definite integrals have limits and give a NUMERICAL value representing the total accumulation (often area under a curve).
</p>

<pre>
∫[a to b] f(x) dx
</pre>

 Unlike indefinite integrals, they do NOT include +C because limits remove the constant.

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> ∫₀¹ x dx = 1/2</p>
<p><b>Example 2:</b> ∫₁² x dx = 3/2</p>
<p><b>Example 3:</b> area between curves</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Evaluate ∫₀¹ x dx</p>
<p><b>Step 1:</b> Find antiderivative</p>
<p>∫x dx = x²/2</p>
<p><b>Step 2:</b> Apply limits</p>
<p>(1²/2) - (0²/2)</p>
<p><b>Final Answer:</b> 1/2</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Evaluate ∫₁² x dx</p>
<p><b>Step 1:</b> Antiderivative</p>
<p>x²/2</p>
<p><b>Step 2:</b> Apply limits</p>
<p>(2²/2) - (1²/2)</p>
<p>= (4/2 - 1/2)</p>
<p><b>Final Answer:</b> 3/2</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What does a definite integral represent?</p>
<p><b>Step 1:</b> It accumulates values over an interval</p>
<p><b>Step 2:</b> It measures total area under curve</p>
<p><b>Final Answer:</b> Total accumulated quantity over a range</p>

---

<h3> DIAGRAM</h3>

<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 180" width="280" height="180" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
  <defs>
    <pattern id="grid-lp" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22223b" stroke-width="0.5"/>
    </pattern>
    <marker id="arrow-x" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
    <marker id="arrow-y" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
  </defs>

  <rect width="280" height="180" fill="url(#grid-lp)"/>
  <path d="M 80,140 L 80,105 C 120,60 160,50 200,95 L 200,140 Z" fill="#3498db" opacity="0.3"/>
  <line x1="30" y1="140" x2="260" y2="140" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="160" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <path d="M 50,120 C 100,50 160,30 230,120" fill="none" stroke="#3498db" stroke-width="2.5"/>
  <line x1="80" y1="140" x2="80" y2="103" stroke="#fff" stroke-width="1" stroke-dasharray="3,3"/>
  <line x1="200" y1="140" x2="200" y2="95" stroke="#fff" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="80" y="152" fill="#fff" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">a</text>
  <text x="200" y="152" fill="#fff" font-size="9" text-anchor="middle" font-family="monospace" font-weight="bold">b</text>
  <text x="140" y="115" fill="#3498db" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="middle">Area = ∫ₐᵇ f(x) dx</text>
  <text x="180" y="45" fill="#fff" font-size="9" font-family="monospace" font-weight="bold">y = f(x)</text>
  <text x="260" y="144" fill="#aaa" font-size="8" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="8" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Total distance from velocity graph</li>
<li>Rainfall accumulation over time</li>
<li>Energy consumption calculation</li>
</ul>

---
`,

  [
    {
      "q": "Evaluate definite integral ∫ from 1 to 2 of x dx",
      "hint": "definite integral with limits",
      "steps": [
        "Step 1: Find antiderivative of x → x²/2",
        "Step 2: Substitute upper limit 2 → (2²)/2 = 4/2 = 2",
        "Step 3: Substitute lower limit 1 → (1²)/2 = 1/2",
        "Step 4: Subtract upper limit value from lower limit value",
        "Step 5: Result = 2 - 1/2 = 3/2"
      ],
      "ans": "3/2",
      "why": "Definite integrals calculate net area under a curve between two points"
    },
    {
      "q": "Find area under y = x² from 0 to 3",
      "hint": "use definite integral",
      "steps": [
        "Step 1: Set up integral ∫ from 0 to 3 of x² dx",
        "Step 2: Integrate x² → x³/3",
        "Step 3: Apply limits → (3³/3) - (0³/3)",
        "Step 4: Simplify → 27/3 - 0",
        "Step 5: Final area = 9"
      ],
      "ans": "9",
      "why": "Definite integral of a function over an interval gives the area under that curve"
    },
    {
      "q": "Evaluate ∫ from 0 to 1 of (2x + 1) dx",
      "hint": "integrate term by term",
      "steps": [
        "Step 1: Integrate 2x → x²",
        "Step 2: Integrate 1 → x",
        "Step 3: Combine → x² + x",
        "Step 4: Apply limits [0, 1] → (1² + 1) - (0² + 0)",
        "Step 5: Result = 2 - 0 = 2"
      ],
      "ans": "2",
      "why": "Integrate each term separately and evaluate over the given interval"
    },
    {
      "q": "What is difference between ∫ x dx and ∫₀¹ x dx?",
      "hint": "limits vs no limits",
      "steps": [
        "Step 1: ∫ x dx has no limits",
        "Step 2: Result is family of functions → x²/2 + C",
        "Step 3: ∫₀¹ x dx has limits",
        "Step 4: Result is numerical value → 1/2",
        "Step 5: Compare both results"
      ],
      "ans": "First is indefinite (family of functions), second is definite (numerical value)",
      "why": "Limits define the interval and produce a single value instead of a function"
    }
  ]
);

add(
  "math",
  "integration",
  "Integration as Reverse of Differentiation",

  `
  
<h2> Reverse of Differentiation</h2>

<h3> DEEP NOTES</h3>
<p>
Integration reverses differentiation.
If dy/dx = f(x), then ∫f(x) dx = original function.
</p>

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> derivative x² → integral gives x³/3</p>
<p><b>Example 2:</b> derivative 2x → integral gives x²</p>
<p><b>Example 3:</b> checking correctness of solutions</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find ∫2x dx</p>
<p><b>Step 1:</b> Apply power rule in reverse</p>
<p>∫2x dx = x² + C</p>
<p><b>Step 2:</b> Add constant of integration</p>
<p><b>Final Answer:</b> x² + C</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find ∫3x² dx</p>
<p><b>Step 1:</b> Increase power by 1</p>
<p>3x² → x³</p>
<p><b>Step 2:</b> Divide by new power</p>
<p>∫3x² dx = x³ + C</p>
<p><b>Final Answer:</b> x³ + C</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> If dy/dx = 4x³, find y</p>
<p><b>Step 1:</b> Integrate both sides</p>
<p>y = ∫4x³ dx</p>
<p><b>Step 2:</b> Apply rule</p>
<p>y = x⁴ + C</p>
<p><b>Final Answer:</b> y = x⁴ + C</p>

---

<h3> DIAGRAM</h3>

<pre>
Differentiation ↓
Integration ↑ (reverse process)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Recovering position from velocity</li>
<li>Signal reconstruction in electronics</li>
<li>AI model inversion problems</li>
</ul>

---
`,

  [
    {
      "q": "Find ∫ (2x) dx and verify relationship with differentiation",
      "hint": "reverse of derivative",
      "steps": [
        "Step 1: Recognize 2x as derivative of x²",
        "Step 2: Apply integration rule → increase power of x",
        "Step 3: ∫ 2x dx = x² + C",
        "Step 4: Differentiate result → d/dx(x² + C)",
        "Step 5: Get 2x (original function)"
      ],
      "ans": "x² + C",
      "why": "Integration reverses differentiation"
    },
    {
      "q": "Find function if ∫ f(x) dx = x³/3 + C",
      "hint": "differentiate result",
      "steps": [
        "Step 1: Differentiate both sides",
        "Step 2: d/dx (x³/3 + C)",
        "Step 3: Apply power rule → (3x²)/3",
        "Step 4: Simplify result",
        "Step 5: Get f(x)"
      ],
      "ans": "x²",
      "why": "Differentiation reverses integration"
    },
    {
      "q": "Show that integration adds a constant using ∫ 0 dx",
      "hint": "constant rule",
      "steps": [
        "Step 1: Integrate 0 → ∫ 0 dx",
        "Step 2: Result is constant C",
        "Step 3: Differentiate C",
        "Step 4: d/dx(C) = 0",
        "Step 5: Confirm relationship"
      ],
      "ans": "C",
      "why": "Derivative removes constants, integration restores them"
    },
    {
      "q": "If d/dx (x² + 5) = 2x, find integral of 2x",
      "hint": "inverse process",
      "steps": [
        "Step 1: Recognize 2x as derivative of x²",
        "Step 2: Integrate 2x → x²",
        "Step 3: Add constant C",
        "Step 4: Final expression"
      ],
      "ans": "x² + C",
      "why": "Integration reconstructs original function up to a constant"
    }
  ]
);

add(
  "math",
  "integration",
  "Applications of Integration",

  `
<h2> Applications of Integration</h2>

<h3> DEEP NOTES</h3>
<p>
Integration is used to accumulate small changes into a total result. It is essentially the reverse process of differentiation.
</p>

<pre>
∫ f(x) dx → total accumulation
</pre>
<h3> WORKED EXAMPLES (MATHEMATICAL CALCULATION STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Show why ∫ v(t) dt gives displacement</p>
<p><b>Hint:</b> velocity = rate of change of displacement</p>
<p><b>Steps:</b></p>
<p>Step 1: Let v(t) = ds/dt</p>
<p>Step 2: Multiply both sides by dt → ds = v(t)dt</p>
<p>Step 3: Integrate both sides → ∫ ds = ∫ v(t)dt</p>
<p>Step 4: Left side becomes displacement s(t)</p>
<p>Step 5: Final result → s(t) = ∫ v(t)dt</p>
<p><b>Answer:</b> Integration of velocity gives displacement</p>
<p><b>Explanation:</b> Integration reverses differentiation and accumulates total change</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find area under curve using integration idea</p>
<p><b>Hint:</b> sum of rectangles</p>
<p><b>Steps:</b></p>
<p>Step 1: Divide area into small width Δx</p>
<p>Step 2: Height of each rectangle = f(x)</p>
<p>Step 3: Area of one strip = f(x)Δx</p>
<p>Step 4: Sum all strips → Σ f(x)Δx</p>
<p>Step 5: Take limit as Δx → 0</p>
<p><b>Final expression:</b> ∫ f(x) dx</p>
<p><b>Answer:</b> Integration gives total area</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Show why ∫ F dx gives work done in physics</p>
<p><b>Hint:</b> force × distance</p>
<p><b>Steps:</b></p>
<p>Step 1: Small work done dW = F dx</p>
<p>Step 2: Add all small work contributions</p>
<p>Step 3: ∫ dW = ∫ F dx</p>
<p>Step 4: Total work W = ∫ F dx</p>
<p>Step 5: Result gives accumulated energy transfer</p>
<p><b>Answer:</b> W = ∫ F dx</p>
<p><b>Explanation:</b> Integration sums continuous force over distance</p>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Engineering design (volume of irregular objects)</li>
<li>Physics motion tracking</li>
<li>Economics cumulative profit analysis</li>
</ul>
`,

  [
    {
      "q": "Find ∫ (2x) dx and verify relationship with differentiation",
      "hint": "reverse of derivative",
      "steps": [
        "Step 1: Recognize 2x as derivative of x²",
        "Step 2: Apply integration rule → increase power of x",
        "Step 3: ∫ 2x dx = x² + C",
        "Step 4: Differentiate result → d/dx(x² + C)",
        "Step 5: Get 2x (original function)"
      ],
      "ans": "x² + C",
      "why": "Integration reverses differentiation"
    },
    {
      "q": "Find function if ∫ f(x) dx = x³/3 + C",
      "hint": "differentiate result",
      "steps": [
        "Step 1: Differentiate both sides",
        "Step 2: d/dx (x³/3 + C)",
        "Step 3: Apply power rule → (3x²)/3",
        "Step 4: Simplify result",
        "Step 5: Get f(x)"
      ],
      "ans": "x²",
      "why": "Differentiation reverses integration"
    },
    {
      "q": "Show that integration adds a constant using ∫ 0 dx",
      "hint": "constant rule",
      "steps": [
        "Step 1: Integrate 0 → ∫ 0 dx",
        "Step 2: Result is constant C",
        "Step 3: Differentiate C",
        "Step 4: d/dx(C) = 0",
        "Step 5: Confirm relationship"
      ],
      "ans": "C",
      "why": "Derivative removes constants, integration restores them"
    },
    {
      "q": "If d/dx (x² + 5) = 2x, find integral of 2x",
      "hint": "inverse process",
      "steps": [
        "Step 1: Recognize 2x as derivative of x²",
        "Step 2: Integrate 2x → x²",
        "Step 3: Add constant C",
        "Step 4: Final expression"
      ],
      "ans": "x² + C",
      "why": "Integration reconstructs original function up to a constant"
    }
  ]
);

/* =========================================================
   NUMBER THEORY CHAPTER
========================================================= */

add(
  "math",
  "number_theory",
  "Divisibility Rules",
  `<h2>Divisibility Rules</h2>
<hr>
<h3>DEEP NOTES</h3>
<h4>1. Core Concept</h4>
<p>
Divisibility rules are mental shortcuts that allow you to determine whether a given integer is divisible by another integer without performing long division.
</p>
<ul>
<li><b>Rule for 2:</b> The last digit is even (0, 2, 4, 6, 8).</li>
<li><b>Rule for 3:</b> The sum of all digits is divisible by 3.</li>
<li><b>Rule for 4:</b> The number formed by the last two digits is divisible by 4.</li>
<li><b>Rule for 5:</b> The last digit is 0 or 5.</li>
<li><b>Rule for 6:</b> The number is divisible by both 2 and 3.</li>
<li><b>Rule for 9:</b> The sum of all digits is divisible by 9.</li>
<li><b>Rule for 10:</b> The last digit is 0.</li>
</ul>
<hr>
<h4>2. Key Principle</h4>
<p>
Every integer <i>n</i> can be expressed in base-10 expansion. The properties of powers of 10 modulo <i>d</i> determine the divisibility test for divisor <i>d</i>.
</p>
`,
  [
    {
      q: "Is 4,572 divisible by 3?",
      hint: "Sum the digits",
      steps: [
        "Step 1: Compute sum of digits: 4 + 5 + 7 + 2 = 18",
        "Step 2: Check if 18 is divisible by 3: 18 ÷ 3 = 6 (no remainder)",
        "Step 3: Conclude: 4,572 is divisible by 3"
      ],
      ans: "Yes",
      why: "A number is divisible by 3 if the sum of its digits is divisible by 3 (4 + 5 + 7 + 2 = 18 = 3 × 6)."
    },
    {
      q: "Determine if 3,524 is divisible by 4.",
      hint: "Check last two digits",
      steps: [
        "Step 1: Identify the last two digits: 24",
        "Step 2: Check if 24 is divisible by 4: 24 ÷ 4 = 6",
        "Step 3: Conclude: 3,524 is divisible by 4"
      ],
      ans: "Yes",
      why: "A number is divisible by 4 if the number formed by its last two digits is divisible by 4 (24 ÷ 4 = 6)."
    },
    {
      q: "Is 1,236 divisible by 6?",
      hint: "Check divisibility by both 2 and 3",
      steps: [
        "Step 1: Check divisibility by 2: last digit is 6 (even) → divisible by 2",
        "Step 2: Check divisibility by 3: 1 + 2 + 3 + 6 = 12, and 12 ÷ 3 = 4 → divisible by 3",
        "Step 3: Conclude: Since divisible by both 2 and 3, it is divisible by 6"
      ],
      ans: "Yes",
      why: "Divisibility by 6 requires the number to be even and the sum of its digits to be a multiple of 3."
    },
    {
      q: "Find the smallest single digit x such that 5,3x2 is divisible by 9.",
      hint: "Sum of digits must be a multiple of 9",
      steps: [
        "Step 1: Calculate sum of known digits: 5 + 3 + 2 = 10",
        "Step 2: Set equation: 10 + x = 18 (next multiple of 9)",
        "Step 3: Solve for x: x = 18 - 10 = 8"
      ],
      ans: "8",
      why: "Sum of digits is 5 + 3 + x + 2 = 10 + x. The smallest single digit making this divisible by 9 is x = 8 (sum = 18)."
    }
  ]
);

add(
  "math",
  "number_theory",
  "Modular Arithmetic",
  `<h2>Modular Arithmetic</h2>
<hr>
<h3>DEEP NOTES</h3>
<h4>1. Concept of Clock Arithmetic</h4>
<p>
Modular arithmetic is a system of arithmetic for integers where numbers 'wrap around' upon reaching a certain value, known as the <b>modulus</b>.
</p>
<p>
We write: <code>a ≡ b (mod m)</code> if and only if <i>m</i> divides <code>(a - b)</code>. Equivalently, <code>a</code> and <code>b</code> have the same remainder when divided by <code>m</code>.
</p>
<hr>
<h4>2. Fundamental Properties</h4>
<ul>
<li><b>Addition:</b> (a + b) mod m = [(a mod m) + (b mod m)] mod m</li>
<li><b>Multiplication:</b> (a × b) mod m = [(a mod m) × (b mod m)] mod m</li>
<li><b>Exponentiation:</b> (a^k) mod m = [(a mod m)^k] mod m</li>
</ul>
`,
  [
    {
      q: "Calculate 17 mod 5.",
      hint: "Find remainder when 17 is divided by 5",
      steps: [
        "Step 1: Divide 17 by 5: 17 = 5 × 3 + 2",
        "Step 2: Identify quotient (3) and remainder (2)",
        "Step 3: Conclude: 17 mod 5 = 2"
      ],
      ans: "2",
      why: "17 divided by 5 yields quotient 3 with remainder 2."
    },
    {
      q: "Evaluate (14 + 23) mod 6.",
      hint: "Add then take modulo, or take modulo first",
      steps: [
        "Step 1: 14 mod 6 = 2, and 23 mod 6 = 5",
        "Step 2: Add remainders: 2 + 5 = 7",
        "Step 3: Reduce modulo 6: 7 mod 6 = 1"
      ],
      ans: "1",
      why: "14 + 23 = 37. 37 = 6 × 6 + 1, so 37 mod 6 = 1."
    },
    {
      q: "Find (7 × 8) mod 5.",
      hint: "Multiply then divide by 5",
      steps: [
        "Step 1: Compute product: 7 × 8 = 56",
        "Step 2: Divide 56 by 5: 56 = 5 × 11 + 1",
        "Step 3: Conclude: 56 mod 5 = 1"
      ],
      ans: "1",
      why: "56 divided by 5 gives remainder 1."
    },
    {
      q: "Find 3^4 mod 7.",
      hint: "Compute powers step by step",
      steps: [
        "Step 1: 3^2 = 9 ≡ 2 (mod 7)",
        "Step 2: 3^4 = (3^2)^2 ≡ 2^2 (mod 7)",
        "Step 3: 2^2 = 4 (mod 7)"
      ],
      ans: "4",
      why: "3^4 = 81. 81 = 7 × 11 + 4, so 81 mod 7 = 4."
    }
  ]
);

add(
  "math",
  "number_theory",
  "Prime Numbers",
  `<h2>Prime Numbers</h2>
<hr>
<h3>DEEP NOTES</h3>
<h4>1. Definition</h4>
<p>
A <b>prime number</b> is a whole number greater than 1 whose only positive divisors are 1 and itself. A number greater than 1 that is not prime is called a <b>composite number</b>.
</p>
<p><b>Note:</b> The number 1 is neither prime nor composite.</p>
<hr>
<h4>2. Fundamental Theorem of Arithmetic</h4>
<p>
Every integer greater than 1 either is a prime number itself or can be represented as the product of prime numbers in a way that is unique up to the order of the factors.
</p>
`,
  [
    {
      q: "What is the only even prime number?",
      hint: "Smallest prime",
      steps: [
        "Step 1: Check even numbers: 2, 4, 6, 8...",
        "Step 2: 2 has only divisors 1 and 2 → prime",
        "Step 3: Any even number > 2 is divisible by 2 → composite. ∴ 2 is the only even prime"
      ],
      ans: "2",
      why: "2 is the smallest prime and the only even prime number, because any larger even number is divisible by 2."
    },
    {
      q: "Find the prime factorization of 60.",
      hint: "Break into prime factors",
      steps: [
        "Step 1: 60 = 2 × 30",
        "Step 2: 30 = 2 × 15",
        "Step 3: 15 = 3 × 5",
        "Step 4: Combine prime factors: 2 × 2 × 3 × 5 = 2² × 3 × 5"
      ],
      ans: "2² × 3 × 5",
      why: "60 = 4 × 15 = (2 × 2) × (3 × 5) = 2² × 3 × 5."
    },
    {
      q: "Is 29 a prime or composite number?",
      hint: "Check divisibility by primes ≤ √29 ≈ 5.38 (2, 3, 5)",
      steps: [
        "Step 1: Check primes up to √29: 2, 3, 5",
        "Step 2: 29 is not divisible by 2 (odd), 3 (2+9=11), or 5 (ends in 9)",
        "Step 3: Conclude: 29 has no divisors other than 1 and 29 → Prime"
      ],
      ans: "Prime",
      why: "29 has no divisors other than 1 and itself, making it prime."
    },
    {
      q: "Find the greatest common divisor (GCD) of 24 and 36 using prime factorization.",
      hint: "Take lowest power of common prime factors",
      steps: [
        "Step 1: Prime factorize: 24 = 2³ × 3¹, 36 = 2² × 3²",
        "Step 2: Identify common prime factors: 2 and 3",
        "Step 3: Take minimum powers: 2² × 3¹ = 4 × 3 = 12"
      ],
      ans: "12",
      why: "GCD(24, 36) = 2² × 3 = 12."
    }
  ]
);

add(
  "math",
  "number_theory",
  "Congruence Relations",
  `<h2>Congruence Relations</h2>
<hr>
<h3>DEEP NOTES</h3>
<h4>1. Definition of Congruence</h4>
<p>
Two integers <i>a</i> and <i>b</i> are said to be <b>congruent modulo m</b> (denoted <code>a ≡ b (mod m)</code>) if their difference <code>a - b</code> is an integer multiple of <code>m</code>.
</p>
<hr>
<h4>2. Equivalence Relation Properties</h4>
<ul>
<li><b>Reflexive:</b> a ≡ a (mod m)</li>
<li><b>Symmetric:</b> If a ≡ b (mod m), then b ≡ a (mod m)</li>
<li><b>Transitive:</b> If a ≡ b (mod m) and b ≡ c (mod m), then a ≡ c (mod m)</li>
</ul>
`,
  [
    {
      q: "Solve the linear congruence: 2x ≡ 6 (mod 8) for 0 ≤ x < 8.",
      hint: "Check integers 0 through 7 or divide by gcd",
      steps: [
        "Step 1: Note gcd(2, 8) = 2. Since 2 divides 6, there are 2 incongruent solutions",
        "Step 2: Divide congruence by 2: x ≡ 3 (mod 4)",
        "Step 3: Find values in range 0 ≤ x < 8: x = 3 and x = 3 + 4 = 7"
      ],
      ans: "x = 3, 7",
      why: "2(3) = 6 ≡ 6 (mod 8) and 2(7) = 14 ≡ 6 (mod 8)."
    },
    {
      q: "Is 38 ≡ 14 (mod 8)?",
      hint: "Check if (38 - 14) is divisible by 8",
      steps: [
        "Step 1: Calculate difference: 38 - 14 = 24",
        "Step 2: Check divisibility by 8: 24 ÷ 8 = 3 (exact integer)",
        "Step 3: Conclude: 38 ≡ 14 (mod 8) is True"
      ],
      ans: "Yes",
      why: "38 - 14 = 24, which is a multiple of 8 (8 × 3 = 24)."
    },
    {
      q: "Find the modular inverse of 3 modulo 7.",
      hint: "Find integer x such that 3x ≡ 1 (mod 7)",
      steps: [
        "Step 1: Test multiples of 3 modulo 7: 3(1)=3, 3(2)=6, 3(3)=9 ≡ 2, 3(4)=12",
        "Step 2: 12 mod 7 = 5; next test 3(5) = 15",
        "Step 3: 15 mod 7 = 1 (since 15 = 2 × 7 + 1). ∴ inverse is 5"
      ],
      ans: "5",
      why: "3 × 5 = 15 ≡ 1 (mod 7), so 5 is the modular multiplicative inverse of 3 modulo 7."
    }
  ]
);

add(
  "math",
  "number_theory",
  "Cryptography Basics",
  `<h2>Cryptography Basics</h2>
<hr>
<h3>DEEP NOTES</h3>
<h4>1. Introduction to Cryptography</h4>
<p>
Cryptography is the practice and study of techniques for secure communication in the presence of adversaries. It relies heavily on number theory, modular arithmetic, and one-way mathematical functions.
</p>
<hr>
<h4>2. Symmetric vs Asymmetric Cryptography</h4>
<ul>
<li><b>Symmetric Encryption:</b> Same secret key used for encryption and decryption (e.g., Caesar cipher, AES).</li>
<li><b>Asymmetric (Public Key) Encryption:</b> Uses a public key for encryption and a private key for decryption (e.g., RSA).</li>
</ul>
<hr>
<h4>3. Caesar Cipher</h4>
<p>
A substitution cipher where each letter in the plaintext is shifted by a fixed number of positions <i>k</i> down the alphabet:
<br><code>E(x) = (x + k) mod 26</code>
<br><code>D(x) = (x - k) mod 26</code>
</p>
`,
  [
    {
      q: "Encrypt the letter 'D' using a Caesar cipher with shift k = 3.",
      hint: "D is letter 3 (A=0, B=1, C=2, D=3). Add shift modulo 26",
      steps: [
        "Step 1: Represent 'D' as an integer: A=0, B=1, C=2, D=3",
        "Step 2: Apply shift: E(3) = (3 + 3) mod 26 = 6",
        "Step 3: Convert 6 back to letter: 0=A, 1=B, 2=C, 3=D, 4=E, 5=F, 6=G"
      ],
      ans: "G",
      why: "Shifting 'D' forward by 3 alphabet positions yields 'G'."
    },
    {
      q: "What mathematical branch provides the foundation for RSA public key cryptography?",
      hint: "Study of integers and primes",
      steps: [
        "Step 1: RSA relies on the difficulty of factoring large composite numbers into prime factors",
        "Step 2: It uses Euler's totient theorem and modular arithmetic",
        "Step 3: Conclude: Number Theory"
      ],
      ans: "Number Theory",
      why: "RSA cryptography is based on number theory principles, specifically modular arithmetic and prime factorization."
    },
    {
      q: "Decrypt the letter 'K' with Caesar shift k = 4.",
      hint: "Shift backward by 4 positions",
      steps: [
        "Step 1: Identify alphabet position of 'K': K is the 11th letter (index 10, A=0)",
        "Step 2: Shift backwards by 4: (10 - 4) mod 26 = 6",
        "Step 3: Convert index 6 back to letter: Index 6 corresponds to 'G'"
      ],
      ans: "G",
      why: "Shifting 'K' backward by 4 positions gives 'G' (G, H, I, J, K)."
    }
  ]
);

