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
  "Angle properties",
  "Classifying Angles",

  `<h2>Classifying Angles</h2>

<p>An angle measures the turn between two rays meeting at a vertex.
We classify an angle by comparing its size with 90° and 180°.</p>

<pre>
Acute:       0° < angle < 90°
Right:       angle = 90°
Obtuse:      90° < angle < 180°
Straight:    angle = 180°
</pre>

<h3>Worked Example 1: Classify 38°</h3>

<p>Step 1: Compare 38° with 90°.</p>
<pre>38° < 90°</pre>

<p>Step 2: An angle greater than 0° but less than 90° is acute.</p>
<p><b>Answer: Acute angle.</b></p>

<h3>Worked Example 2: Classify 90°</h3>

<p>90° is exactly a right angle.</p>
<p><b>Answer: Right angle.</b></p>

<h3>Worked Example 3: Classify 147°</h3>

<pre>
90° < 147° < 180°
</pre>

<p>The angle is larger than 90° but smaller than 180°.</p>
<p><b>Answer: Obtuse angle.</b></p>

<h3>Worked Example 4: Classify 180°</h3>

<p>An angle of 180° forms a straight line.</p>
<p><b>Answer: Straight angle.</b></p>`,

  [
    {
      q: "Classify an angle of 24°.",
      hint: "Compare it with 90°.",
      steps: [
        "24° is less than 90°.",
        "An angle between 0° and 90° is acute."
      ],
      ans: "Acute",
      why: "An acute angle is greater than 0° but less than 90°."
    },
    {
      q: "Classify an angle of 112°.",
      hint: "Is it between 90° and 180°?",
      steps: [
        "90° < 112° < 180°.",
        "An angle between 90° and 180° is obtuse."
      ],
      ans: "Obtuse",
      why: "An obtuse angle is larger than a right angle but smaller than a straight angle."
    },
    {
      q: "An angle measures exactly 90°. What type is it?",
      hint: "Think of a quarter-turn.",
      steps: [
        "The angle measures exactly 90°.",
        "Therefore, it is a right angle."
      ],
      ans: "Right angle",
      why: "A right angle measures exactly 90°."
    },
    {
      q: "Can an angle of 180° be acute?",
      hint: "An acute angle must be smaller than 90°.",
      steps: [
        "An acute angle is less than 90°.",
        "180° is a straight angle.",
        "Therefore, it cannot be acute."
      ],
      ans: "No; it is a straight angle.",
      why: "Angle classification depends on the measured size."
    }
  ]
);


add(
  "math",
  "geometry",
  "Angle properties",
  "Angles on a Straight Line",

  `<h2>Angles on a Straight Line</h2>

<p>Angles that lie next to each other on a straight line add up to
<b>180°</b>.</p>

<pre>
x + known angle = 180°

x = 180° - known angle
</pre>

<h3>Worked Example 1</h3>

<p>Two adjacent angles are 64° and x°. Find x.</p>

<pre>
64° + x = 180°

x = 180° - 64°

x = 116°
</pre>

<p><b>Answer: x = 116°.</b></p>

<h3>Worked Example 2</h3>

<p>The angles are 3x° and 60°. Find x.</p>

<pre>
3x + 60 = 180

3x = 180 - 60

3x = 120

x = 120 / 3

x = 40
</pre>

<p>The angle represented by 3x is 3 × 40° = 120°.</p>

<h3>Worked Example 3</h3>

<p>Three adjacent angles on a straight line are 35°, 82° and x°.</p>

<pre>
35° + 82° + x = 180°

117° + x = 180°

x = 180° - 117°

x = 63°
</pre>

<p><b>Answer: x = 63°.</b></p>`,

  [
    {
      q: "Two adjacent angles on a straight line are 127° and x°. Find x.",
      hint: "Their sum is 180°.",
      steps: [
        "127° + x = 180°",
        "x = 180° - 127°",
        "x = 53°."
      ],
      ans: "53°",
      why: "Angles forming a straight line total 180°."
    },
    {
      q: "Angles 2x° and 70° lie on a straight line. Find x.",
      hint: "Write 2x + 70 = 180.",
      steps: [
        "2x + 70 = 180",
        "2x = 110",
        "x = 110 / 2",
        "x = 55."
      ],
      ans: "55",
      why: "Use the straight-line angle sum to form an equation."
    },
    {
      q: "Three angles on a straight line are 42°, 91° and x°. Find x.",
      hint: "Add the known angles, then subtract from 180°.",
      steps: [
        "42° + 91° = 133°",
        "133° + x = 180°",
        "x = 180° - 133°",
        "x = 47°."
      ],
      ans: "47°",
      why: "All adjacent angles forming the straight angle sum to 180°."
    }
  ]
);


add(
  "math",
  "geometry",
  "Angle properties",
  "Angles Around a Point",

  `<h2>Angles Around a Point</h2>

<p>All angles making one complete turn around a point add up to
<b>360°</b>.</p>

<pre>
Missing angle = 360° - sum of known angles
</pre>

<h3>Worked Example 1</h3>

<p>Angles around a point are 80°, 110° and x°.</p>

<pre>
80° + 110° + x = 360°

190° + x = 360°

x = 360° - 190°

x = 170°
</pre>

<h3>Worked Example 2</h3>

<p>Four equal angles meet at a point. Find each angle.</p>

<pre>
Total = 360°

Each angle = 360° / 4

Each angle = 90°
</pre>

<h3>Worked Example 3</h3>

<p>Angles x°, 2x° and 90° meet at a point.</p>

<pre>
x + 2x + 90 = 360

3x + 90 = 360

3x = 270

x = 90°
</pre>

<p><b>Answer: x = 90°.</b></p>`,

  [
    {
      q: "Angles around a point are 75°, 125° and x°. Find x.",
      hint: "A complete turn is 360°.",
      steps: [
        "75° + 125° = 200°",
        "x = 360° - 200°",
        "x = 160°."
      ],
      ans: "160°",
      why: "Angles around a point make one complete turn of 360°."
    },
    {
      q: "Five equal angles meet at a point. Find each angle.",
      hint: "Divide 360° equally among five angles.",
      steps: [
        "Total angle = 360°",
        "Each angle = 360° / 5",
        "Each angle = 72°."
      ],
      ans: "72°",
      why: "Equal angles share the complete turn equally."
    },
    {
      q: "Angles x°, 2x°, 3x° and 60° meet at a point. Find x.",
      hint: "Their sum is 360°.",
      steps: [
        "x + 2x + 3x + 60 = 360",
        "6x + 60 = 360",
        "6x = 300",
        "x = 50."
      ],
      ans: "50",
      why: "Use the 360° total to form an equation."
    }
  ]
);


add(
  "math",
  "geometry",
  "Angle properties",
  "Vertically Opposite Angles",

  `<h2>Vertically Opposite Angles</h2>

<p>When two straight lines cross, the angles directly opposite each
other are equal.</p>

<h3>Worked Example 1</h3>

<p>Two lines cross. One angle is 48°. Find the angle directly opposite it.</p>

<pre>
Opposite angle = 48°
</pre>

<p><b>Answer: 48°.</b></p>

<h3>Worked Example 2</h3>

<p>Opposite angles are (3x + 10)° and 70°. Find x.</p>

<p>Since vertically opposite angles are equal:</p>

<pre>
3x + 10 = 70

3x = 70 - 10

3x = 60

x = 20
</pre>

<h3>Worked Example 3</h3>

<p>One angle at an intersection is 132°. Find the opposite angle and
the smaller adjacent angle.</p>

<pre>
Opposite angle = 132°

Adjacent angle = 180° - 132°

Adjacent angle = 48°
</pre>

<p><b>Opposite angle: 132°; adjacent angle: 48°.</b></p>`,

  [
    {
      q: "Two straight lines cross. One angle is 83°. Find the vertically opposite angle.",
      hint: "Opposite angles formed by intersecting lines are equal.",
      steps: [
        "The given angle is 83°.",
        "The opposite angle equals it.",
        "Answer = 83°."
      ],
      ans: "83°",
      why: "Vertically opposite angles are equal."
    },
    {
      q: "Opposite angles are (5x - 8)° and 72°. Find x.",
      hint: "Set the two angle expressions equal.",
      steps: [
        "5x - 8 = 72",
        "5x = 80",
        "x = 16."
      ],
      ans: "16",
      why: "Equal vertically opposite angles give an equation."
    },
    {
      q: "An angle at an intersection is 121°. Find the smaller adjacent angle.",
      hint: "Adjacent angles on a straight line total 180°.",
      steps: [
        "Adjacent angle = 180° - 121°",
        "Adjacent angle = 59°."
      ],
      ans: "59°",
      why: "The adjacent angle and 121° form a straight angle."
    }
  ]
);


add(
  "math",
  "geometry",
  "Angle properties",
  "Parallel Lines and a Transversal",

  `<h2>Parallel Lines and a Transversal</h2>

<p>A transversal is a line that crosses two other lines. When those
two lines are parallel, three important angle relationships apply.</p>

<ul>
<li><b>Corresponding angles:</b> equal.</li>
<li><b>Alternate interior angles:</b> equal.</li>
<li><b>Co-interior angles:</b> add up to 180°.</li>
</ul>

<h3>Worked Example 1: Corresponding Angles</h3>

<p>One corresponding angle is 68°.</p>

<pre>
Other corresponding angle = 68°
</pre>

<h3>Worked Example 2: Alternate Interior Angles</h3>

<p>One alternate interior angle is 113°.</p>

<pre>
Other alternate interior angle = 113°
</pre>

<h3>Worked Example 3: Co-interior Angles</h3>

<p>One co-interior angle is 72°. Find the other.</p>

<pre>
72° + x = 180°

x = 180° - 72°

x = 108°
</pre>

<p><b>Important:</b> These relationships apply when the two lines
are parallel.</p>`,

  [
    {
      q: "Two parallel lines are crossed by a transversal. A corresponding angle is 74°. Find its partner.",
      hint: "Corresponding angles are equal for parallel lines.",
      steps: [
        "The lines are parallel.",
        "Corresponding angles are equal.",
        "The required angle is 74°."
      ],
      ans: "74°",
      why: "Corresponding angles are equal when the lines are parallel."
    },
    {
      q: "One alternate interior angle is 126°. Find the other alternate interior angle.",
      hint: "Alternate interior angles are equal.",
      steps: [
        "The lines are parallel.",
        "Alternate interior angles are equal.",
        "The required angle is 126°."
      ],
      ans: "126°",
      why: "The alternate interior angle rule applies to parallel lines."
    },
    {
      q: "Co-interior angles are (2x + 10)° and 110°. Find x.",
      hint: "Co-interior angles add up to 180°.",
      steps: [
        "2x + 10 + 110 = 180",
        "2x + 120 = 180",
        "2x = 60",
        "x = 30."
      ],
      ans: "30",
      why: "Co-interior angles on parallel lines are supplementary."
    },
    {
      q: "A co-interior angle is 97°. Find the other angle.",
      hint: "Subtract 97° from 180°.",
      steps: [
        "Other angle = 180° - 97°",
        "Other angle = 83°."
      ],
      ans: "83°",
      why: "The two co-interior angles add up to 180°."
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",
  "Triangle Angle Sum",

  `<h2>Triangle Angle Sum</h2>

<p><b>One concept:</b> The three interior angles of every triangle add up to 180°.</p>

<h3>Why does this matter?</h3>
<p>If we know two interior angles of a triangle, we can calculate the third angle without measuring it.</p>

<p><b>Rule:</b></p>
<p style="text-align:center;font-size:1.2em;"><b>A + B + C = 180°</b></p>

<h3>Worked Example 1: Find the missing angle</h3>
<p>A triangle has angles 50°, 60° and x°.</p>

<p><b>Step 1:</b> Write the triangle angle sum.</p>
<p>50° + 60° + x = 180°</p>

<p><b>Step 2:</b> Add the known angles.</p>
<p>110° + x = 180°</p>

<p><b>Step 3:</b> Subtract 110° from both sides.</p>
<p>x = 180° - 110°</p>

<p><b>Answer: x = 70°.</b></p>

<h3>Worked Example 2: Find an angle when the other angles are different</h3>
<p>A triangle has angles 35° and 85°. Find the third angle.</p>

<p><b>Step 1:</b> Add the known angles.</p>
<p>35° + 85° = 120°</p>

<p><b>Step 2:</b> Subtract their sum from 180°.</p>
<p>x = 180° - 120°</p>

<p><b>Answer: x = 60°.</b></p>

<h3>Worked Example 3: Find an angle containing an unknown</h3>
<p>The angles of a triangle are x°, (x + 20)° and 60°. Find x.</p>

<p><b>Step 1:</b> Add the three angles.</p>
<p>x + (x + 20) + 60 = 180</p>

<p><b>Step 2:</b> Remove the brackets and collect like terms.</p>
<p>2x + 80 = 180</p>

<p><b>Step 3:</b> Subtract 80 from both sides.</p>
<p>2x = 100</p>

<p><b>Step 4:</b> Divide both sides by 2.</p>
<p>x = 50°</p>

<p>The angles are 50°, 70° and 60°. Check: 50 + 70 + 60 = 180°.</p>

<h3>Common mistake</h3>
<p>Do not subtract only one known angle when two angles are given. First add all known angles, then subtract their total from 180°.</p>`,

  [
    {
      q: "A triangle has angles 45°, 65° and x°. Find x.",
      hint: "Add 45° and 65°, then subtract their sum from 180°.",
      steps: [
        "The interior angles of a triangle add up to 180°.",
        "45° + 65° + x = 180°.",
        "110° + x = 180°.",
        "x = 180° - 110° = 70°."
      ],
      ans: "70°",
      why: "The missing angle is the difference between 180° and the sum of the two known angles."
    },
    {
      q: "Two angles of a triangle are 28° and 92°. Calculate the third angle.",
      hint: "Find 28° + 92° first.",
      steps: [
        "Add the known angles: 28° + 92° = 120°.",
        "Subtract their sum from 180°.",
        "x = 180° - 120° = 60°."
      ],
      ans: "60°",
      why: "The three interior angles must total exactly 180°."
    },
    {
      q: "The angles of a triangle are x°, 2x° and 30°. Find x.",
      hint: "Form the equation x + 2x + 30 = 180.",
      steps: [
        "Write the angle-sum equation: x + 2x + 30 = 180.",
        "Collect like terms: 3x + 30 = 180.",
        "Subtract 30: 3x = 150.",
        "Divide by 3: x = 50°."
      ],
      ans: "50°",
      why: "The equation represents all three angles. Substituting x = 50° gives 50°, 100° and 30°, which total 180°."
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",
  "Isosceles Triangle Base Angles",

  `<h2>Isosceles Triangle Base Angles</h2>

<p><b>One concept:</b> The two angles opposite the equal sides of an isosceles triangle are equal.</p>

<h3>Recognising the information</h3>
<p>An isosceles triangle has at least two equal sides. The angles opposite those sides are equal too.</p>

<p>If the two base angles are x° each, and the top angle is A°, then:</p>
<p><b>x + x + A = 180°</b></p>

<h3>Worked Example 1: Find the base angles</h3>
<p>An isosceles triangle has a top angle of 40°. Find each base angle.</p>

<p><b>Step 1:</b> Subtract the top angle from 180°.</p>
<p>180° - 40° = 140°</p>

<p><b>Step 2:</b> The two base angles are equal, so divide 140° by 2.</p>
<p>140° ÷ 2 = 70°</p>

<p><b>Answer:</b> Each base angle is 70°.</p>

<h3>Worked Example 2: Find the top angle</h3>
<p>The base angles are each 65°. Find the top angle.</p>

<p><b>Step 1:</b> Add the equal base angles.</p>
<p>65° + 65° = 130°</p>

<p><b>Step 2:</b> Subtract from 180°.</p>
<p>180° - 130° = 50°</p>

<p><b>Answer:</b> The top angle is 50°.</p>

<h3>Worked Example 3: Find an unknown angle</h3>
<p>An isosceles triangle has angles x°, x° and (x + 30)°. Find x.</p>

<p><b>Step 1:</b> Use the angle sum.</p>
<p>x + x + (x + 30) = 180</p>

<p><b>Step 2:</b> Collect like terms.</p>
<p>3x + 30 = 180</p>

<p><b>Step 3:</b> Subtract 30 and divide by 3.</p>
<p>3x = 150</p>
<p>x = 50°</p>

<p><b>Check:</b> The angles are 50°, 50° and 80°. Their sum is 180°.</p>

<h3>Common mistake</h3>
<p>Do not divide the top angle by 2. Divide the remaining angle sum by 2 because the two base angles are equal.</p>`,

  [
    {
      q: "An isosceles triangle has a top angle of 36°. Find each base angle.",
      hint: "Subtract 36° from 180°, then divide the result by 2.",
      steps: [
        "The two base angles share the remaining angle sum.",
        "180° - 36° = 144°.",
        "144° ÷ 2 = 72°.",
        "Each base angle is 72°."
      ],
      ans: "72°",
      why: "The base angles are equal and together they must total 144°."
    },
    {
      q: "Each base angle of an isosceles triangle is 48°. Find its top angle.",
      hint: "Add the base angles before subtracting from 180°.",
      steps: [
        "Add the base angles: 48° + 48° = 96°.",
        "Subtract from 180°: 180° - 96° = 84°."
      ],
      ans: "84°",
      why: "The top angle is the remaining part of the triangle's 180° angle sum."
    },
    {
      q: "An isosceles triangle has angles x°, x° and 4x°. Find x.",
      hint: "Write x + x + 4x = 180.",
      steps: [
        "Combine the angles: x + x + 4x = 180.",
        "Simplify: 6x = 180.",
        "Divide by 6: x = 30°.",
        "The angles are 30°, 30° and 120°."
      ],
      ans: "30°",
      why: "The two equal base angles are both 30°, while the third angle is four times x."
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",
  "Exterior Angle of a Triangle",

  `<h2>Exterior Angle of a Triangle</h2>

<p><b>One concept:</b> An exterior angle of a triangle equals the sum of the two opposite interior angles.</p>

<p><b>Rule:</b></p>
<p style="text-align:center;"><b>Exterior angle = opposite interior angle 1 + opposite interior angle 2</b></p>

<h3>Worked Example 1: Find the exterior angle</h3>
<p>The two opposite interior angles are 45° and 65°.</p>

<p><b>Step 1:</b> Add them.</p>
<p>45° + 65° = 110°</p>

<p><b>Answer:</b> The exterior angle is 110°.</p>

<h3>Worked Example 2: Find a missing interior angle</h3>
<p>An exterior angle is 125°. One opposite interior angle is 50°. Find the other opposite interior angle.</p>

<p><b>Step 1:</b> Let the missing angle be x°.</p>
<p>125° = 50° + x</p>

<p><b>Step 2:</b> Subtract 50° from both sides.</p>
<p>x = 125° - 50°</p>

<p><b>Answer:</b> x = 75°.</p>

<h3>Worked Example 3: Use the straight-line relationship</h3>
<p>An exterior angle is 140°. Find the interior angle directly next to it.</p>

<p><b>Step 1:</b> These two angles form a straight line.</p>
<p>Interior angle + 140° = 180°</p>

<p><b>Step 2:</b> Subtract 140°.</p>
<p>Interior angle = 180° - 140° = 40°</p>

<p><b>Answer:</b> 40°.</p>

<h3>Important distinction</h3>
<p>The exterior angle equals the sum of the two <b>opposite</b> interior angles. The interior angle next to it is supplementary to the exterior angle: the two add up to 180°.</p>`,

  [
    {
      q: "The two opposite interior angles of a triangle are 38° and 72°. Find the exterior angle.",
      hint: "Add the two opposite interior angles.",
      steps: [
        "Use the exterior angle rule.",
        "Exterior angle = 38° + 72°.",
        "Exterior angle = 110°."
      ],
      ans: "110°",
      why: "An exterior angle equals the sum of the two opposite interior angles."
    },
    {
      q: "An exterior angle is 132°. One opposite interior angle is 57°. Find the other opposite interior angle.",
      hint: "Subtract 57° from 132°.",
      steps: [
        "Let the missing angle be x.",
        "132° = 57° + x.",
        "x = 132° - 57°.",
        "x = 75°."
      ],
      ans: "75°",
      why: "The two opposite interior angles together equal the exterior angle."
    },
    {
      q: "An exterior angle of a triangle is 118°. Calculate the interior angle next to it.",
      hint: "The two adjacent angles on a straight line add up to 180°.",
      steps: [
        "Let the adjacent interior angle be x.",
        "x + 118° = 180°.",
        "x = 180° - 118°.",
        "x = 62°."
      ],
      ans: "62°",
      why: "The adjacent interior and exterior angles form a straight line, so they add up to 180°."
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",
  "Classifying Triangles by Sides",

  `<h2>Classifying Triangles by Their Sides</h2>

<p><b>One concept:</b> Classify a triangle by comparing the lengths of its three sides.</p>

<h3>Three classifications</h3>
<ul>
<li><b>Equilateral:</b> all three sides are equal.</li>
<li><b>Isosceles:</b> exactly two sides are equal in this classification scheme.</li>
<li><b>Scalene:</b> all three sides have different lengths.</li>
</ul>

<h3>Worked Example 1: All sides equal</h3>
<p>A triangle has sides 5 cm, 5 cm and 5 cm.</p>

<p><b>Step 1:</b> Compare the side lengths.</p>
<p>5 = 5 = 5</p>

<p><b>Conclusion:</b> All three sides are equal, so the triangle is equilateral.</p>

<h3>Worked Example 2: Two sides equal</h3>
<p>A triangle has sides 7 cm, 7 cm and 4 cm.</p>

<p><b>Step 1:</b> Compare the lengths.</p>
<p>Two sides are 7 cm, while the third is 4 cm.</p>

<p><b>Conclusion:</b> Exactly two sides are equal, so it is isosceles.</p>

<h3>Worked Example 3: All sides different</h3>
<p>A triangle has sides 4 cm, 6 cm and 7 cm.</p>

<p><b>Step 1:</b> Compare the lengths.</p>
<p>4 ≠ 6, 6 ≠ 7 and 4 ≠ 7.</p>

<p><b>Conclusion:</b> All sides differ, so the triangle is scalene.</p>

<h3>Important check: Can these lengths form a triangle?</h3>
<p>The sum of any two sides must be greater than the third side.</p>
<p>For sides 4 cm, 6 cm and 7 cm:</p>
<ul>
<li>4 + 6 = 10, which is greater than 7.</li>
<li>4 + 7 = 11, which is greater than 6.</li>
<li>6 + 7 = 13, which is greater than 4.</li>
</ul>
<p>All three conditions hold, so these lengths can form a triangle.</p>`,

  [
    {
      q: "A triangle has sides 9 cm, 9 cm and 9 cm. Classify it by its sides.",
      hint: "Check whether all three lengths are equal.",
      steps: [
        "Compare the three side lengths.",
        "All three sides are 9 cm.",
        "Therefore, the triangle is equilateral."
      ],
      ans: "Equilateral",
      why: "An equilateral triangle has three equal sides."
    },
    {
      q: "A triangle has sides 8 cm, 8 cm and 5 cm. Classify it by its sides.",
      hint: "Count how many sides have the same length.",
      steps: [
        "Two sides are 8 cm.",
        "The third side is 5 cm.",
        "Exactly two sides are equal, so it is isosceles."
      ],
      ans: "Isosceles",
      why: "An isosceles triangle has two equal sides."
    },
    {
      q: "A learner says a triangle with sides 3 cm, 4 cm and 8 cm is scalene. Is the learner correct?",
      hint: "Before classifying, check whether the lengths can form a triangle.",
      steps: [
        "Add the two shorter sides: 3 + 4 = 7.",
        "Compare this sum with the longest side, 8.",
        "Since 7 is not greater than 8, the triangle inequality fails.",
        "These lengths cannot form a triangle, so classifying them as a scalene triangle is incorrect."
      ],
      ans: "No. These lengths cannot form a triangle.",
      why: "Having three different lengths is not enough. The sum of the two shorter sides must be greater than the longest side."
    }
  ]
);
add(
  "math",
  "geometry",
  "Quadrilaterals",
  "Quadrilateral Interior Angle Sum",

  `<h2>Quadrilateral Interior Angle Sum</h2>

<p><b>One concept:</b> The four interior angles of a quadrilateral add up to 360°.</p>

<p><b>Rule:</b></p>
<p style="text-align:center;font-size:1.2em;"><b>A + B + C + D = 360°</b></p>

<h3>Why is the total 360°?</h3>
<p>A diagonal can divide a quadrilateral into two triangles.</p>
<p>Each triangle has an angle sum of 180°.</p>
<p>Therefore, 180° + 180° = 360°.</p>

<h3>Worked Example 1: Find one missing angle</h3>
<p>A quadrilateral has angles 80°, 90°, 100° and x°.</p>

<p><b>Step 1:</b> Add the known angles.</p>
<p>80° + 90° + 100° = 270°</p>

<p><b>Step 2:</b> Subtract from 360°.</p>
<p>x = 360° - 270° = 90°</p>

<p><b>Answer:</b> 90°.</p>

<h3>Worked Example 2: Find an angle with a different set of values</h3>
<p>Three angles of a quadrilateral are 75°, 85° and 110°. Find the fourth angle.</p>

<p><b>Step 1:</b> Add the known angles.</p>
<p>75° + 85° + 110° = 270°</p>

<p><b>Step 2:</b> Calculate the remaining angle.</p>
<p>360° - 270° = 90°</p>

<p><b>Answer:</b> 90°.</p>

<h3>Worked Example 3: Find x algebraically</h3>
<p>The angles of a quadrilateral are x°, (x + 10)°, 2x° and 90°. Find x.</p>

<p><b>Step 1:</b> Add the four angles.</p>
<p>x + (x + 10) + 2x + 90 = 360</p>

<p><b>Step 2:</b> Collect like terms.</p>
<p>4x + 100 = 360</p>

<p><b>Step 3:</b> Subtract 100.</p>
<p>4x = 260</p>

<p><b>Step 4:</b> Divide by 4.</p>
<p>x = 65°</p>

<p><b>Check:</b> The angles are 65°, 75°, 130° and 90°. Their sum is 360°.</p>

<h3>Common mistake</h3>
<p>Do not use 180° for a quadrilateral. Its four interior angles add up to 360°.</p>`,

  [
    {
      q: "Three angles of a quadrilateral are 70°, 110° and 95°. Find the fourth angle.",
      hint: "Add the three known angles and subtract from 360°.",
      steps: [
        "Add the known angles: 70° + 110° + 95° = 275°.",
        "Subtract from 360°: 360° - 275° = 85°."
      ],
      ans: "85°",
      why: "The four interior angles of a quadrilateral total 360°."
    },
    {
      q: "A quadrilateral has angles 90°, 90°, 90° and x°. Find x.",
      hint: "Three right angles total 270°.",
      steps: [
        "Add the known angles: 90° + 90° + 90° = 270°.",
        "Subtract from 360°: x = 360° - 270°.",
        "Therefore, x = 90°."
      ],
      ans: "90°",
      why: "The missing angle must complete the quadrilateral's 360° total."
    },
    {
      q: "The angles of a quadrilateral are x°, 2x°, 3x° and 60°. Find x.",
      hint: "Form the equation x + 2x + 3x + 60 = 360.",
      steps: [
        "Add the angles: x + 2x + 3x + 60 = 360.",
        "Collect like terms: 6x + 60 = 360.",
        "Subtract 60: 6x = 300.",
        "Divide by 6: x = 50°."
      ],
      ans: "50°",
      why: "The four angles must total 360°. Substitution gives 50°, 100°, 150° and 60°, which total 360°."
    }
  ]
);
add(
  "math",
  "geometry",
  "Quadrilaterals",
  "Parallelogram",
  "Parallelogram: Opposite Sides Are Equal",

  `<h2>Opposite Sides of a Parallelogram</h2>

<p><b>One concept:</b> In a parallelogram, opposite sides have equal lengths.</p>

<p>If ABCD is a parallelogram:</p>
<ul>
<li>AB = CD</li>
<li>BC = AD</li>
</ul>

<p>Opposite sides are across from each other, not next to each other.</p>

<h3>Worked Example 1: Find a missing side</h3>
<p>ABCD is a parallelogram. AB = 12 cm and CD = x cm. Find x.</p>
<p><b>Step 1:</b> AB and CD are opposite sides.</p>
<p><b>Step 2:</b> Opposite sides are equal, so AB = CD.</p>
<p>12 = x</p>
<p><b>Answer: x = 12 cm.</b></p>

<h3>Worked Example 2: Find an unknown expression</h3>
<p>The opposite sides of a parallelogram are labelled (3x + 2) cm and 17 cm. Find x.</p>
<p><b>Step 1:</b> Set the opposite sides equal.</p>
<p>3x + 2 = 17</p>
<p><b>Step 2:</b> Subtract 2 from both sides.</p>
<p>3x = 15</p>
<p><b>Step 3:</b> Divide by 3.</p>
<p>x = 5</p>
<p><b>Check:</b> 3(5) + 2 = 17 cm.</p>

<h3>Worked Example 3: Find the perimeter</h3>
<p>A parallelogram has adjacent sides of 8 cm and 5 cm. Find its perimeter.</p>
<p><b>Step 1:</b> Opposite sides equal the adjacent sides respectively.</p>
<p>The four sides are 8 cm, 5 cm, 8 cm and 5 cm.</p>
<p><b>Step 2:</b> Add all four sides.</p>
<p>8 + 5 + 8 + 5 = 26 cm.</p>
<p><b>Answer: 26 cm.</b></p>

<h3>Common mistake</h3>
<p>Opposite sides are equal; adjacent sides are not necessarily equal. Do not assume all four sides have the same length.</p>`,

  [
    {
      q: "A parallelogram has AB = 14 cm. If CD is opposite AB, find CD.",
      hint: "Opposite sides of a parallelogram are equal.",
      steps: [
        "AB and CD are opposite sides.",
        "Therefore, AB = CD.",
        "CD = 14 cm."
      ],
      ans: "14 cm",
      why: "Opposite sides of a parallelogram have equal lengths."
    },
    {
      q: "Opposite sides of a parallelogram are (4x - 3) cm and 21 cm. Find x.",
      hint: "Set 4x - 3 equal to 21.",
      steps: [
        "Set the opposite sides equal: 4x - 3 = 21.",
        "Add 3 to both sides: 4x = 24.",
        "Divide both sides by 4: x = 6."
      ],
      ans: "6",
      why: "The two expressions describe opposite sides, which must have equal lengths."
    },
    {
      q: "A parallelogram has adjacent sides of 11 cm and 7 cm. A learner says every side must be 11 cm. Explain the error and calculate the perimeter.",
      hint: "Only opposite sides must be equal. Add all four sides.",
      steps: [
        "The side lengths are 11 cm, 7 cm, 11 cm and 7 cm.",
        "The sides of length 11 cm are opposite each other.",
        "The sides of length 7 cm are also opposite each other.",
        "Perimeter = 11 + 7 + 11 + 7 = 36 cm."
      ],
      ans: "The learner is incorrect; perimeter = 36 cm.",
      why: "A parallelogram has equal opposite sides, not necessarily four equal sides."
    }
  ]
);
add(
  "math",
  "geometry",
  "Quadrilaterals",
  "Parallelogram",
  "Parallelogram: Opposite Angles Are Equal",

  `<h2>Opposite Angles of a Parallelogram</h2>

<p><b>One concept:</b> Opposite angles in a parallelogram are equal.</p>

<p>For parallelogram ABCD:</p>
<ul>
<li>Angle A = angle C</li>
<li>Angle B = angle D</li>
</ul>

<h3>Worked Example 1: Find an opposite angle</h3>
<p>Angle A = 68°. Find angle C.</p>
<p><b>Step 1:</b> A and C are opposite angles.</p>
<p><b>Step 2:</b> Opposite angles are equal.</p>
<p>Angle C = 68°.</p>

<h3>Worked Example 2: Find an unknown</h3>
<p>Opposite angles are labelled (3x + 10)° and 100°. Find x.</p>
<p><b>Step 1:</b> Set the opposite angles equal.</p>
<p>3x + 10 = 100</p>
<p><b>Step 2:</b> Subtract 10.</p>
<p>3x = 90</p>
<p><b>Step 3:</b> Divide by 3.</p>
<p>x = 30</p>
<p><b>Check:</b> 3(30) + 10 = 100°.</p>

<h3>Worked Example 3: Find all four angles</h3>
<p>One angle of a parallelogram is 75°. Find all its interior angles.</p>
<p><b>Step 1:</b> The opposite angle is equal to it.</p>
<p>Opposite angle = 75°.</p>
<p><b>Step 2:</b> Each adjacent angle adds to 180° with the 75° angle.</p>
<p>180° - 75° = 105°.</p>
<p><b>Step 3:</b> The other adjacent angle is also 105°.</p>
<p><b>Answer:</b> 75°, 105°, 75°, 105°.</p>

<h3>Common mistake</h3>
<p>Opposite angles are equal. Adjacent angles generally are not equal; they add up to 180°.</p>`,

  [
    {
      q: "One angle of a parallelogram is 112°. Find its opposite angle.",
      hint: "Opposite angles are equal.",
      steps: [
        "Identify the angle opposite 112°.",
        "Opposite angles are equal.",
        "The missing angle is 112°."
      ],
      ans: "112°",
      why: "Opposite angles of a parallelogram have equal measures."
    },
    {
      q: "Opposite angles are (5x - 20)° and 80°. Find x.",
      hint: "Set 5x - 20 equal to 80.",
      steps: [
        "Write 5x - 20 = 80.",
        "Add 20 to both sides: 5x = 100.",
        "Divide by 5: x = 20."
      ],
      ans: "20",
      why: "The angles are opposite, so their expressions must have equal values."
    },
    {
      q: "A parallelogram has one angle of 64°. Find the other three angles.",
      hint: "The opposite angle equals 64°. Each adjacent angle is 180° - 64°.",
      steps: [
        "The opposite angle is 64°.",
        "Calculate each adjacent angle: 180° - 64° = 116°.",
        "The four angles are 64°, 116°, 64° and 116°."
      ],
      ans: "116°, 64°, 116°",
      why: "Opposite angles are equal, while adjacent angles are supplementary."
    }
  ]
);
add(
  "math",
  "geometry",
  "Quadrilaterals",
  "Parallelogram",
  "Parallelogram: Adjacent Angles",

  `<h2>Adjacent Angles in a Parallelogram</h2>

<p><b>One concept:</b> Adjacent interior angles of a parallelogram add up to 180°.</p>

<p><b>Rule:</b></p>
<p>Adjacent angle 1 + adjacent angle 2 = 180°</p>

<h3>Worked Example 1: Find a missing angle</h3>
<p>Two adjacent angles are 70° and x°. Find x.</p>
<p><b>Step 1:</b> Write their sum.</p>
<p>70° + x = 180°</p>
<p><b>Step 2:</b> Subtract 70°.</p>
<p>x = 180° - 70° = 110°.</p>

<h3>Worked Example 2: Solve an expression</h3>
<p>Two adjacent angles are (2x + 10)° and 90°. Find x.</p>
<p><b>Step 1:</b> Set their sum to 180°.</p>
<p>2x + 10 + 90 = 180</p>
<p><b>Step 2:</b> Simplify.</p>
<p>2x + 100 = 180</p>
<p><b>Step 3:</b> Subtract 100.</p>
<p>2x = 80</p>
<p><b>Step 4:</b> Divide by 2.</p>
<p>x = 40</p>

<h3>Worked Example 3: Compare two adjacent angles</h3>
<p>Two adjacent angles are in the ratio 2:3. Find the angles.</p>
<p><b>Step 1:</b> Represent the angles as 2x and 3x.</p>
<p><b>Step 2:</b> Their sum is 180°.</p>
<p>2x + 3x = 180</p>
<p>5x = 180</p>
<p>x = 36</p>
<p><b>Step 3:</b> Calculate each angle.</p>
<p>2x = 72° and 3x = 108°.</p>
<p><b>Answer:</b> 72° and 108°.</p>

<h3>Common mistake</h3>
<p>Do not set adjacent angles equal unless additional information proves they are equal. Their general relationship is that their sum is 180°.</p>`,

  [
    {
      q: "One angle of a parallelogram is 83°. Find an adjacent angle.",
      hint: "Subtract 83° from 180°.",
      steps: [
        "Adjacent angles add to 180°.",
        "83° + x = 180°.",
        "x = 180° - 83° = 97°."
      ],
      ans: "97°",
      why: "The adjacent angle must complete the 180° total."
    },
    {
      q: "Adjacent angles are (4x + 5)° and 95°. Find x.",
      hint: "Their sum is 180°.",
      steps: [
        "Write 4x + 5 + 95 = 180.",
        "Simplify: 4x + 100 = 180.",
        "Subtract 100: 4x = 80.",
        "Divide by 4: x = 20."
      ],
      ans: "20",
      why: "Adjacent angles in a parallelogram are supplementary."
    },
    {
      q: "Two adjacent angles of a parallelogram are in the ratio 4:5. Find both angles.",
      hint: "Represent the angles as 4x and 5x and use their 180° sum.",
      steps: [
        "Let the angles be 4x and 5x.",
        "4x + 5x = 180.",
        "9x = 180, so x = 20.",
        "The angles are 4(20) = 80° and 5(20) = 100°."
      ],
      ans: "80° and 100°",
      why: "The ratio gives the relative sizes, and the supplementary-angle rule supplies their total."
    }
  ]
);
add(
  "math",
  "geometry",
  "Circles",
  "Circle: Radius and Diameter",

  `<h2>Radius and Diameter of a Circle</h2>

<p><b>One concept:</b> The diameter is twice the radius.</p>

<p><b>Rules:</b></p>
<ul>
<li>Diameter = 2 × radius</li>
<li>Radius = diameter ÷ 2</li>
</ul>

<p>The <b>radius</b> is the distance from the centre of the circle to its circumference. The <b>diameter</b> is a straight line across the circle through its centre, joining two points on the circumference.</p>

<h3>Worked Example 1: Find the diameter</h3>
<p>A circle has radius 6 cm. Find its diameter.</p>
<p><b>Step 1:</b> Use diameter = 2 × radius.</p>
<p>Diameter = 2 × 6</p>
<p><b>Answer: 12 cm.</b></p>

<h3>Worked Example 2: Find the radius</h3>
<p>A circle has diameter 18 cm. Find its radius.</p>
<p><b>Step 1:</b> Divide the diameter by 2.</p>
<p>Radius = 18 ÷ 2 = 9 cm.</p>

<h3>Worked Example 3: Find the diameter from an expression</h3>
<p>The radius of a circle is (x + 3) cm and its diameter is 20 cm. Find x.</p>
<p><b>Step 1:</b> The radius is half the diameter.</p>
<p>Radius = 20 ÷ 2 = 10 cm.</p>
<p><b>Step 2:</b> Form an equation.</p>
<p>x + 3 = 10</p>
<p><b>Step 3:</b> Subtract 3.</p>
<p>x = 7</p>

<h3>Common mistake</h3>
<p>Do not confuse radius and diameter. The diameter goes all the way across the circle through its centre; the radius goes only from the centre to the circumference.</p>`,

  [
    {
      q: "A circle has radius 7 cm. Calculate its diameter.",
      hint: "Multiply the radius by 2.",
      steps: [
        "Diameter = 2 × radius.",
        "Diameter = 2 × 7.",
        "Diameter = 14 cm."
      ],
      ans: "14 cm",
      why: "A diameter consists of two radii placed end to end through the centre."
    },
    {
      q: "The diameter of a circle is 26 cm. Find its radius.",
      hint: "Divide the diameter by 2.",
      steps: [
        "Radius = diameter ÷ 2.",
        "Radius = 26 ÷ 2.",
        "Radius = 13 cm."
      ],
      ans: "13 cm",
      why: "The radius is half the diameter."
    },
    {
      q: "A learner says a circle with radius 8 cm has diameter 8 cm. Identify the error and give the correct diameter.",
      hint: "The learner has treated the radius and diameter as the same length.",
      steps: [
        "The radius is 8 cm.",
        "Diameter = 2 × radius.",
        "Diameter = 2 × 8 = 16 cm.",
        "The learner forgot that the diameter is twice the radius."
      ],
      ans: "The correct diameter is 16 cm.",
      why: "The diameter passes through the centre and spans two radii."
    }
  ]
);
add(
  "math",
  "geometry",
  "Circles",
  "Circumference of a Circle",

  `<h2>Circumference of a Circle</h2>

<p><b>One concept:</b> Circumference is the distance around a circle.</p>

<p>Use either formula:</p>
<ul>
<li><b>C = 2πr</b>, when the radius is known.</li>
<li><b>C = πd</b>, when the diameter is known.</li>
</ul>

<p>Here, π is approximately 3.142. Unless a question specifies otherwise, leave answers in terms of π or use 3.142 and state the approximation.</p>

<h3>Worked Example 1: Radius given</h3>
<p>A circle has radius 7 cm. Find its circumference in terms of π.</p>
<p><b>Step 1:</b> Choose C = 2πr because the radius is given.</p>
<p><b>Step 2:</b> Substitute r = 7.</p>
<p>C = 2 × π × 7</p>
<p><b>Answer: C = 14π cm.</b></p>

<h3>Worked Example 2: Diameter given</h3>
<p>A circle has diameter 10 cm. Find its circumference in terms of π.</p>
<p><b>Step 1:</b> Choose C = πd.</p>
<p><b>Step 2:</b> Substitute d = 10.</p>
<p>C = π × 10</p>
<p><b>Answer: C = 10π cm, approximately 31.42 cm.</b></p>

<h3>Worked Example 3: Find the radius from the circumference</h3>
<p>A circle has circumference 20π cm. Find its radius.</p>
<p><b>Step 1:</b> Use C = 2πr.</p>
<p>20π = 2πr</p>
<p><b>Step 2:</b> Divide both sides by 2π.</p>
<p>r = 20π ÷ 2π = 10 cm.</p>
<p><b>Answer: 10 cm.</b></p>

<h3>Common mistake</h3>
<p>Circumference measures distance around the circle, so the answer uses units such as cm or m, not square units such as cm².</p>`,

  [
    {
      q: "A circle has radius 5 cm. Find its circumference in terms of π.",
      hint: "Use C = 2πr.",
      steps: [
        "Use C = 2πr.",
        "Substitute r = 5.",
        "C = 2 × π × 5 = 10π cm."
      ],
      ans: "10π cm",
      why: "The radius formula multiplies the radius by 2π."
    },
    {
      q: "A circle has diameter 14 m. Find its circumference in terms of π.",
      hint: "Use C = πd because the diameter is given.",
      steps: [
        "Use C = πd.",
        "Substitute d = 14.",
        "C = 14π m."
      ],
      ans: "14π m",
      why: "The circumference equals π multiplied by the diameter."
    },
    {
      q: "A learner calculates the circumference of a circle with radius 4 cm as 16π cm². Identify the error and give the correct answer.",
      hint: "Check both the formula and the unit.",
      steps: [
        "Use C = 2πr.",
        "Substitute r = 4: C = 2 × π × 4.",
        "C = 8π cm.",
        "Circumference is a length, so the unit is cm, not cm²."
      ],
      ans: "8π cm",
      why: "The learner used an incorrect calculation and a square unit. Circumference is a one-dimensional length."
    }
  ]
);
add(
  "math",
  "geometry",
  "Circles",
  "Area of a Circle",

  `<h2>Area of a Circle</h2>

<p><b>One concept:</b> The area of a circle is the amount of space inside the circle.</p>

<p><b>Formula:</b></p>

<p>A = πr²</p>

<p>Here:</p>

<ul>
<li><b>A</b> = area of the circle</li>
<li><b>π</b> = pi, approximately 3.142</li>
<li><b>r</b> = radius of the circle</li>
</ul>

<p>The radius is the distance from the <b>centre of the circle</b> to its edge.</p>

<p>The radius is <b>squared</b>, so you multiply the radius by itself:</p>

<p>r² = r × r</p>

<h3>Worked Example 1: Find the area</h3>

<p>A circle has a radius of 7 cm. Find its area. Use π = 22/7.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = πr²</p>

<p><b>Step 2:</b> Substitute r = 7.</p>

<p>A = 22/7 × 7²</p>

<p><b>Step 3:</b> Square the radius.</p>

<p>7² = 49</p>

<p>Therefore:</p>

<p>A = 22/7 × 49</p>

<p><b>Step 4:</b> Simplify.</p>

<p>A = 22 × 7</p>

<p><b>Step 5:</b> Calculate.</p>

<p><b>A = 154 cm²</b></p>

<h3>Worked Example 2: Using π = 3.142</h3>

<p>A circular garden has a radius of 5 m. Find its area. Use π = 3.142.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = πr²</p>

<p><b>Step 2:</b> Substitute.</p>

<p>A = 3.142 × 5²</p>

<p><b>Step 3:</b> Square the radius.</p>

<p>5² = 25</p>

<p>Therefore:</p>

<p>A = 3.142 × 25</p>

<p><b>Step 4:</b> Multiply.</p>

<p><b>A = 78.55 m²</b></p>

<h3>Worked Example 3: Find the radius</h3>

<p>A circle has an area of 154 cm². Find its radius. Use π = 22/7.</p>

<p><b>Step 1:</b> Start with the formula.</p>

<p>A = πr²</p>

<p><b>Step 2:</b> Substitute the known values.</p>

<p>154 = 22/7 × r²</p>

<p><b>Step 3:</b> Multiply both sides by 7.</p>

<p>154 × 7 = 22r²</p>

<p>1078 = 22r²</p>

<p><b>Step 4:</b> Divide by 22.</p>

<p>r² = 1078 ÷ 22</p>

<p>r² = 49</p>

<p><b>Step 5:</b> Find the square root.</p>

<p>r = √49</p>

<p><b>r = 7 cm</b></p>

<h3>Important distinction</h3>

<p>If the question gives the <b>diameter</b> instead of the radius, the diameter must first be converted to a radius:</p>

<p><b>radius = diameter ÷ 2</b></p>

<p>For example, if the diameter is 10 cm:</p>

<p>r = 10 ÷ 2 = 5 cm</p>

<p>Then use r = 5 cm in A = πr².</p>

<h3>Common mistakes</h3>

<p><b>Mistake 1:</b> Using the diameter directly in A = πr².</p>

<p>The formula requires the <b>radius</b>.</p>

<p><b>Mistake 2:</b> Forgetting to square the radius.</p>

<p>For r = 6:</p>

<p>r² = 6 × 6 = 36, not 12.</p>

<p><b>Mistake 3:</b> Giving the answer in units instead of square units.</p>

<p>Area is measured in units such as cm², m² or km².</p>`,

  [
    {
      q: "A circle has a radius of 6 cm. Find its area. Use π = 3.142.",
      hint: "Use A = πr² and remember to square the radius.",
      steps: [
        "A = πr².",
        "A = 3.142 × 6².",
        "6² = 36.",
        "A = 3.142 × 36.",
        "A = 113.112 cm²."
      ],
      ans: "113.112 cm²",
      why: "The area of a circle is found by multiplying π by the square of its radius."
    },
    {
      q: "A circle has a diameter of 14 cm. Find its area. Use π = 22/7.",
      hint: "Find the radius first.",
      steps: [
        "Radius = diameter ÷ 2.",
        "r = 14 ÷ 2 = 7 cm.",
        "A = πr².",
        "A = 22/7 × 7².",
        "A = 22/7 × 49.",
        "A = 154 cm²."
      ],
      ans: "154 cm²",
      why: "The area formula requires the radius, so the diameter must first be divided by 2."
    },
    {
      q: "A circle has a radius of 8 m. Find its area using π = 3.142.",
      hint: "Square 8 before multiplying by π.",
      steps: [
        "A = πr².",
        "A = 3.142 × 8².",
        "8² = 64.",
        "A = 3.142 × 64.",
        "A = 201.088 m²."
      ],
      ans: "201.088 m²",
      why: "The radius is squared before multiplying by π."
    },
    {
      q: "A learner says that the area of a circle with radius 5 cm is 31.42 cm². Identify the error and calculate the correct area using π = 3.142.",
      hint: "Check whether the radius was squared.",
      steps: [
        "A = πr².",
        "A = 3.142 × 5².",
        "5² = 25.",
        "A = 3.142 × 25.",
        "A = 78.55 cm²."
      ],
      ans: "78.55 cm²",
      why: "The learner multiplied π by 5 instead of multiplying π by 5²."
    }
  ]
);
add(
  "math",
  "geometry",
  "Perimeter",
  "Perimeter of a Rectangle",

  `<h2>Perimeter of a Rectangle</h2>

<p><b>One concept:</b> Perimeter is the total distance around a shape.</p>

<p>A rectangle has two equal lengths and two equal widths.</p>

<p><b>Formula:</b> P = 2l + 2w = 2(l + w)</p>

<h3>Worked Example 1: Find the perimeter</h3>
<p>A rectangle is 8 cm long and 3 cm wide.</p>
<p><b>Step 1:</b> Write the formula.</p>
<p>P = 2(l + w)</p>
<p><b>Step 2:</b> Substitute the measurements.</p>
<p>P = 2(8 + 3)</p>
<p><b>Step 3:</b> Calculate.</p>
<p>P = 2 × 11 = 22 cm.</p>

<h3>Worked Example 2: Find a missing width</h3>
<p>A rectangle has perimeter 30 cm and length 9 cm. Find its width.</p>
<p><b>Step 1:</b> Use P = 2(l + w).</p>
<p>30 = 2(9 + w)</p>
<p><b>Step 2:</b> Divide both sides by 2.</p>
<p>15 = 9 + w</p>
<p><b>Step 3:</b> Subtract 9.</p>
<p>w = 6 cm.</p>

<h3>Worked Example 3: Find the perimeter from an algebraic width</h3>
<p>A rectangle has length 10 cm and width (x + 2) cm. If x = 4, find its perimeter.</p>
<p><b>Step 1:</b> Calculate the width.</p>
<p>w = 4 + 2 = 6 cm.</p>
<p><b>Step 2:</b> Substitute into the perimeter formula.</p>
<p>P = 2(10 + 6)</p>
<p>P = 2 × 16 = 32 cm.</p>

<h3>Common mistake</h3>
<p>Perimeter is measured in ordinary units such as cm or m. Do not use cm², because that is a unit of area.</p>`,

  [
    {
      q: "A rectangle has length 12 cm and width 5 cm. Find its perimeter.",
      hint: "Use P = 2(l + w).",
      steps: [
        "Write P = 2(l + w).",
        "Substitute: P = 2(12 + 5).",
        "P = 2 × 17 = 34 cm."
      ],
      ans: "34 cm",
      why: "The formula adds the length and width and doubles their sum to include all four sides."
    },
    {
      q: "A rectangle has perimeter 40 m and length 13 m. Find its width.",
      hint: "Start with 40 = 2(13 + w).",
      steps: [
        "40 = 2(13 + w).",
        "Divide by 2: 20 = 13 + w.",
        "Subtract 13: w = 7 m."
      ],
      ans: "7 m",
      why: "Half the perimeter equals one length plus one width."
    },
    {
      q: "A learner calculates the perimeter of a 7 cm by 4 cm rectangle as 28 cm. Explain the mistake and give the correct perimeter.",
      hint: "Check whether the learner multiplied the dimensions instead of adding all four sides.",
      steps: [
        "Multiplying 7 × 4 gives 28, which is the area in cm².",
        "Perimeter = 2(7 + 4).",
        "Perimeter = 2 × 11 = 22 cm."
      ],
      ans: "22 cm",
      why: "Perimeter adds boundary lengths; multiplying length by width calculates area."
    }
  ]
);
add(
  "math",
  "geometry",
  "Perimeter",
  "Perimeter of a Square",

  `<h2>Perimeter of a Square</h2>

<p><b>One concept:</b> All four sides of a square are equal.</p>

<p><b>Formula:</b> P = 4s, where s is the side length.</p>

<h3>Worked Example 1: Find the perimeter</h3>
<p>A square has side length 6 cm.</p>
<p><b>Step 1:</b> Use P = 4s.</p>
<p><b>Step 2:</b> Substitute s = 6.</p>
<p>P = 4 × 6 = 24 cm.</p>

<h3>Worked Example 2: Find the side length</h3>
<p>A square has perimeter 36 cm. Find its side length.</p>
<p><b>Step 1:</b> Start with P = 4s.</p>
<p>36 = 4s</p>
<p><b>Step 2:</b> Divide both sides by 4.</p>
<p>s = 36 ÷ 4 = 9 cm.</p>

<h3>Worked Example 3: Find an unknown side</h3>
<p>A square has side length (2x + 1) cm and perimeter 28 cm. Find x.</p>
<p><b>Step 1:</b> Find one side by dividing the perimeter by 4.</p>
<p>28 ÷ 4 = 7 cm.</p>
<p><b>Step 2:</b> Set the side expression equal to 7.</p>
<p>2x + 1 = 7</p>
<p><b>Step 3:</b> Subtract 1, then divide by 2.</p>
<p>2x = 6</p>
<p>x = 3.</p>

<h3>Common mistake</h3>
<p>Do not multiply the side by itself when finding perimeter. The expression s × s is used for the area of a square, not its perimeter.</p>`,

  [
    {
      q: "A square has sides of 11 cm. Find its perimeter.",
      hint: "Multiply one side by 4.",
      steps: [
        "P = 4s.",
        "P = 4 × 11.",
        "P = 44 cm."
      ],
      ans: "44 cm",
      why: "A square has four equal sides."
    },
    {
      q: "The perimeter of a square is 52 m. Find the length of one side.",
      hint: "Divide the perimeter by 4.",
      steps: [
        "P = 4s.",
        "52 = 4s.",
        "s = 52 ÷ 4 = 13 m."
      ],
      ans: "13 m",
      why: "The total perimeter is shared equally among the four sides."
    },
    {
      q: "A learner says a square with side 8 cm has perimeter 64 cm. Identify the error and calculate the correct perimeter.",
      hint: "Compare 4 × side with side × side.",
      steps: [
        "The learner calculated 8 × 8 = 64, which is the area in cm².",
        "Perimeter = 4 × 8.",
        "Perimeter = 32 cm."
      ],
      ans: "32 cm",
      why: "Perimeter uses four times the side length; squaring the side gives area."
    }
  ]
);
add(
  "math",
  "geometry",
  "Perimeter",
  "Perimeter of a Triangle",

  `<h2>Perimeter of a Triangle</h2>

<p><b>One concept:</b> The perimeter of a triangle is the sum of its three side lengths.</p>

<p><b>Formula:</b> P = a + b + c</p>

<h3>Worked Example 1: Three known sides</h3>
<p>A triangle has sides 5 cm, 7 cm and 9 cm.</p>
<p><b>Step 1:</b> Add all three sides.</p>
<p>P = 5 + 7 + 9</p>
<p><b>Step 2:</b> Calculate.</p>
<p><b>Answer: 21 cm.</b></p>

<h3>Worked Example 2: Find a missing side</h3>
<p>A triangle has perimeter 25 cm. Two sides are 8 cm and 10 cm. Find the third side.</p>
<p><b>Step 1:</b> Let the missing side be x.</p>
<p>8 + 10 + x = 25</p>
<p><b>Step 2:</b> Add the known sides.</p>
<p>18 + x = 25</p>
<p><b>Step 3:</b> Subtract 18.</p>
<p>x = 7 cm.</p>

<h3>Worked Example 3: An equilateral triangle</h3>
<p>An equilateral triangle has perimeter 42 cm. Find each side.</p>
<p><b>Step 1:</b> Its three sides are equal.</p>
<p>3s = 42</p>
<p><b>Step 2:</b> Divide by 3.</p>
<p>s = 14 cm.</p>

<h3>Common mistake</h3>
<p>Do not assume a triangle has equal sides unless the question says so or gives enough information to establish it.</p>`,

  [
    {
      q: "A triangle has sides 6 cm, 8 cm and 11 cm. Find its perimeter.",
      hint: "Add all three side lengths.",
      steps: [
        "P = 6 + 8 + 11.",
        "P = 25 cm."
      ],
      ans: "25 cm",
      why: "The perimeter is the total distance around the triangle."
    },
    {
      q: "A triangle has perimeter 31 cm. Two sides measure 9 cm and 13 cm. Find the third side.",
      hint: "Subtract the two known sides from the perimeter.",
      steps: [
        "Let the missing side be x.",
        "9 + 13 + x = 31.",
        "22 + x = 31.",
        "x = 9 cm."
      ],
      ans: "9 cm",
      why: "The missing side is the total perimeter minus the two known sides."
    },
    {
      q: "An equilateral triangle has perimeter 57 cm. A learner says each side is 19 cm². Correct the answer and explain the unit.",
      hint: "Divide by 3, and remember that side length is a distance.",
      steps: [
        "All three sides are equal.",
        "Side length = 57 ÷ 3 = 19.",
        "The correct side length is 19 cm, not 19 cm².",
        "Centimetres measure length; square centimetres measure area."
      ],
      ans: "19 cm",
      why: "Dividing the perimeter by three gives one side, which is a length."
    }
  ]
);
add(
  "math",
  "geometry",
  "Area",
  "Area of a Rectangle",

  `<h2>Area of a Rectangle</h2>

<p><b>One concept:</b> Area measures the surface covered inside a shape.</p>

<p><b>Formula:</b> A = length × width</p>

<p>Area uses square units, such as cm² or m², because it measures a two-dimensional surface.</p>

<h3>Worked Example 1: Find the area</h3>
<p>A rectangle has length 9 cm and width 4 cm.</p>
<p><b>Step 1:</b> Write the formula.</p>
<p>A = l × w</p>
<p><b>Step 2:</b> Substitute the measurements.</p>
<p>A = 9 × 4</p>
<p><b>Answer: 36 cm².</b></p>

<h3>Worked Example 2: Find the missing width</h3>
<p>A rectangle has area 72 cm² and length 12 cm. Find its width.</p>
<p><b>Step 1:</b> Use A = l × w.</p>
<p>72 = 12 × w</p>
<p><b>Step 2:</b> Divide both sides by 12.</p>
<p>w = 72 ÷ 12 = 6 cm.</p>

<h3>Worked Example 3: Find area with an unknown</h3>
<p>A rectangle has length (x + 2) cm and width 5 cm. If x = 6, find its area.</p>
<p><b>Step 1:</b> Calculate the length.</p>
<p>Length = 6 + 2 = 8 cm.</p>
<p><b>Step 2:</b> Multiply length by width.</p>
<p>A = 8 × 5</p>
<p><b>Answer: 40 cm².</b></p>

<h3>Common mistake</h3>
<p>Do not add the length and width to calculate area. Adding dimensions is associated with perimeter; area requires multiplication.</p>`,

  [
    {
      q: "A rectangle is 13 m long and 4 m wide. Find its area.",
      hint: "Multiply length by width.",
      steps: [
        "A = l × w.",
        "A = 13 × 4.",
        "A = 52 m²."
      ],
      ans: "52 m²",
      why: "The rectangle's surface is measured by multiplying its length by its width."
    },
    {
      q: "A rectangle has area 96 cm² and width 8 cm. Find its length.",
      hint: "Divide the area by the width.",
      steps: [
        "A = l × w.",
        "96 = l × 8.",
        "l = 96 ÷ 8.",
        "l = 12 cm."
      ],
      ans: "12 cm",
      why: "Dividing area by one dimension gives the other dimension."
    },
    {
      q: "A learner finds the area of a rectangle measuring 10 cm by 6 cm as 32 cm². Identify the likely mistake and calculate the correct area.",
      hint: "Check whether the learner added the dimensions.",
      steps: [
        "Adding the dimensions gives 10 + 6 = 16, not 32.",
        "Area must be calculated by multiplication.",
        "A = 10 × 6.",
        "A = 60 cm²."
      ],
      ans: "60 cm²",
      why: "The area formula is length multiplied by width, not their sum."
    }
  ]
);
add(
  "math",
  "geometry",
  "Area",
  "Area of a Square",

  `<h2>Area of a Square</h2>

<p><b>One concept:</b> The area of a square is its side length multiplied by itself.</p>

<p><b>Formula:</b> A = s² = s × s</p>

<h3>Worked Example 1: Find the area</h3>
<p>A square has side length 7 cm.</p>
<p><b>Step 1:</b> Use A = s × s.</p>
<p>A = 7 × 7</p>
<p><b>Answer: 49 cm².</b></p>

<h3>Worked Example 2: Find the side from the area</h3>
<p>A square has area 81 m². Find its side length.</p>
<p><b>Step 1:</b> Find the number that multiplied by itself gives 81.</p>
<p>9 × 9 = 81.</p>
<p><b>Step 2:</b> Take the positive square root.</p>
<p>s = √81 = 9 m.</p>

<h3>Worked Example 3: Find the area from an expression</h3>
<p>A square has side length (x + 1) cm. If x = 5, find the area.</p>
<p><b>Step 1:</b> Calculate the side.</p>
<p>s = 5 + 1 = 6 cm.</p>
<p><b>Step 2:</b> Square the side length.</p>
<p>A = 6 × 6 = 36 cm².</p>

<h3>Common mistake</h3>
<p>Do not confuse side length with area. If the side is 7 cm, the area is 49 cm², not 7 cm² or 28 cm².</p>`,

  [
    {
      q: "A square has side length 12 cm. Find its area.",
      hint: "Multiply 12 by 12.",
      steps: [
        "A = s².",
        "A = 12 × 12.",
        "A = 144 cm²."
      ],
      ans: "144 cm²",
      why: "The area of a square is its side length multiplied by itself."
    },
    {
      q: "A square has area 121 cm². Find its side length.",
      hint: "Find the positive square root of 121.",
      steps: [
        "A = s².",
        "121 = s².",
        "s = √121 = 11 cm."
      ],
      ans: "11 cm",
      why: "The side length is the positive number whose square equals the area."
    },
    {
      q: "A learner says a square with side 9 m has area 36 m² because 4 × 9 = 36. Explain the error and calculate the correct area.",
      hint: "The learner used the perimeter calculation instead of the area formula.",
      steps: [
        "4 × 9 calculates the perimeter, which is 36 m.",
        "Area = side × side.",
        "Area = 9 × 9 = 81 m²."
      ],
      ans: "81 m²",
      why: "Area squares the side length; multiplying by four calculates the perimeter."
    }
  ]
);
add(
  "math",
  "geometry",
  "Area",
  "Area of a Triangle",

  `<h2>Area of a Triangle</h2>

<p><b>One concept:</b> The area of a triangle is half the product of its base and perpendicular height.</p>

<p><b>Formula:</b> A = ½ × base × perpendicular height</p>

<p>The perpendicular height meets the base at 90°. It is not necessarily the length of a sloping side.</p>

<h3>Worked Example 1: Find the area</h3>
<p>A triangle has base 10 cm and perpendicular height 6 cm.</p>
<p><b>Step 1:</b> Write the formula.</p>
<p>A = ½ × b × h</p>
<p><b>Step 2:</b> Substitute.</p>
<p>A = ½ × 10 × 6</p>
<p><b>Step 3:</b> Multiply, then take half.</p>
<p>A = ½ × 60 = 30 cm².</p>

<h3>Worked Example 2: Find the height</h3>
<p>A triangle has area 42 cm² and base 12 cm. Find its perpendicular height.</p>
<p><b>Step 1:</b> Substitute into the formula.</p>
<p>42 = ½ × 12 × h</p>
<p><b>Step 2:</b> Simplify.</p>
<p>42 = 6h</p>
<p><b>Step 3:</b> Divide by 6.</p>
<p>h = 42 ÷ 6 = 7 cm.</p>

<h3>Worked Example 3: Find the base</h3>
<p>A triangle has area 35 m² and perpendicular height 10 m. Find its base.</p>
<p><b>Step 1:</b> Write the equation.</p>
<p>35 = ½ × b × 10</p>
<p><b>Step 2:</b> Simplify.</p>
<p>35 = 5b</p>
<p><b>Step 3:</b> Divide by 5.</p>
<p>b = 7 m.</p>

<h3>Common mistake</h3>
<p>Do not forget the ½. Multiplying base by height without dividing by 2 gives the area of a rectangle with those dimensions, not the triangle.</p>`,

  [
    {
      q: "A triangle has base 14 cm and perpendicular height 8 cm. Find its area.",
      hint: "Multiply 14 by 8, then divide by 2.",
      steps: [
        "A = ½ × b × h.",
        "A = ½ × 14 × 8.",
        "A = ½ × 112 = 56 cm²."
      ],
      ans: "56 cm²",
      why: "The triangle occupies half the area of a rectangle with the same base and perpendicular height."
    },
    {
      q: "A triangle has area 54 m² and base 12 m. Find its perpendicular height.",
      hint: "Start with 54 = ½ × 12 × h.",
      steps: [
        "54 = ½ × 12 × h.",
        "Simplify: 54 = 6h.",
        "Divide by 6: h = 9 m."
      ],
      ans: "9 m",
      why: "Rearranging the area formula gives height = 2 × area ÷ base."
    },
    {
      q: "A learner calculates the area of a triangle with base 9 cm and perpendicular height 4 cm as 36 cm². Identify the error and calculate the correct area.",
      hint: "The learner multiplied base by height but forgot to take half.",
      steps: [
        "Multiply base by height: 9 × 4 = 36.",
        "Take half: 36 ÷ 2 = 18.",
        "The correct area is 18 cm²."
      ],
      ans: "18 cm²",
      why: "The area formula includes the factor ½."
    }
  ]
);
add(
  "math",
  "geometry",
  "Area",
  "Area of a Parallelogram",

  `<h2>Area of a Parallelogram</h2>

<p><b>One concept:</b> The area of a parallelogram is the product of its base and perpendicular height.</p>

<p><b>Formula:</b> A = base × perpendicular height</p>

<p>The perpendicular height is the shortest distance from the base to the opposite parallel side. It meets the base at 90°.</p>

<p>The sloping side is <b>not</b> the perpendicular height unless it happens to meet the base at 90°.</p>

<h3>Why does the formula work?</h3>

<p>A parallelogram can be rearranged into a rectangle with the same base and perpendicular height.</p>

<p>Since the area of a rectangle is:</p>

<p><b>Area = length × width</b></p>

<p>the area of the parallelogram is:</p>

<p><b>A = base × perpendicular height</b></p>

<h3>Worked Example 1: Find the area</h3>

<p>A parallelogram has a base of 12 cm and a perpendicular height of 7 cm. Find its area.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = b × h</p>

<p><b>Step 2:</b> Substitute the values.</p>

<p>A = 12 × 7</p>

<p><b>Step 3:</b> Calculate.</p>

<p>A = 84 cm²</p>

<h3>Worked Example 2: Find the height</h3>

<p>A parallelogram has an area of 96 m² and a base of 12 m. Find its perpendicular height.</p>

<p><b>Step 1:</b> Start with the formula.</p>

<p>A = b × h</p>

<p><b>Step 2:</b> Substitute the known values.</p>

<p>96 = 12 × h</p>

<p><b>Step 3:</b> Divide both sides by 12.</p>

<p>h = 96 ÷ 12</p>

<p><b>Step 4:</b> Calculate.</p>

<p>h = 8 m</p>

<h3>Worked Example 3: Find the base</h3>

<p>A parallelogram has an area of 135 cm² and a perpendicular height of 9 cm. Find its base.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = b × h</p>

<p><b>Step 2:</b> Substitute.</p>

<p>135 = b × 9</p>

<p><b>Step 3:</b> Divide both sides by 9.</p>

<p>b = 135 ÷ 9</p>

<p><b>Step 4:</b> Calculate.</p>

<p>b = 15 cm</p>

<h3>Common mistake</h3>

<p>Do not use the sloping side as the height unless it is perpendicular to the base.</p>

<p>For example, if the base is 10 cm and the sloping side is 8 cm, you cannot automatically use 8 cm as the height.</p>`,

  [
    {
      q: "A parallelogram has a base of 15 cm and a perpendicular height of 6 cm. Find its area.",
      hint: "Use A = base × perpendicular height.",
      steps: [
        "A = b × h.",
        "A = 15 × 6.",
        "A = 90 cm²."
      ],
      ans: "90 cm²",
      why: "The area of a parallelogram is found by multiplying its base by its perpendicular height."
    },
    {
      q: "A parallelogram has an area of 72 m² and a base of 9 m. Find its perpendicular height.",
      hint: "Start with 72 = 9 × h.",
      steps: [
        "A = b × h.",
        "72 = 9 × h.",
        "h = 72 ÷ 9.",
        "h = 8 m."
      ],
      ans: "8 m",
      why: "When the area and base are known, divide the area by the base to find the perpendicular height."
    },
    {
      q: "A parallelogram has an area of 120 cm² and a perpendicular height of 8 cm. Find its base.",
      hint: "Start with 120 = b × 8.",
      steps: [
        "A = b × h.",
        "120 = b × 8.",
        "b = 120 ÷ 8.",
        "b = 15 cm."
      ],
      ans: "15 cm",
      why: "When the area and perpendicular height are known, divide the area by the height to find the base."
    },
    {
      q: "A learner uses the sloping side of a parallelogram as its height. Explain why this can give the wrong area.",
      hint: "Think about what the word perpendicular means.",
      steps: [
        "The height must meet the base at 90°.",
        "A sloping side may not meet the base at 90°.",
        "Therefore, the sloping side cannot automatically be used as the height.",
        "The perpendicular height must be used."
      ],
      ans: "The height must be perpendicular to the base.",
      why: "The formula A = base × height requires the perpendicular height, not simply any side length."
    }
  ]
);
add(
  "math",
  "geometry",
  "Area",
  "Area of a Trapezium",

  `<h2>Area of a Trapezium</h2>

<p><b>One concept:</b> The area of a trapezium is half the sum of its two parallel sides multiplied by its perpendicular height.</p>

<p><b>Formula:</b></p>

<p>A = ½ × (a + b) × h</p>

<p>Here, <b>a</b> and <b>b</b> are the lengths of the two parallel sides, and <b>h</b> is the perpendicular height.</p>

<p>The two parallel sides are sometimes called the <b>parallel sides</b> or <b>bases</b>.</p>

<p>The height must meet the parallel sides at <b>90°</b>.</p>

<h3>Why does the formula work?</h3>

<p>The expression <b>½ × (a + b)</b> finds the average length of the two parallel sides.</p>

<p>Multiplying that average by the perpendicular height gives the area.</p>

<h3>Worked Example 1: Find the area</h3>

<p>A trapezium has parallel sides of 8 cm and 14 cm. Its perpendicular height is 5 cm. Find its area.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = ½ × (a + b) × h</p>

<p><b>Step 2:</b> Substitute the values.</p>

<p>A = ½ × (8 + 14) × 5</p>

<p><b>Step 3:</b> Add the parallel sides.</p>

<p>A = ½ × 22 × 5</p>

<p><b>Step 4:</b> Multiply.</p>

<p>A = 11 × 5</p>

<p><b>Step 5:</b> Calculate.</p>

<p><b>A = 55 cm²</b></p>

<h3>Worked Example 2: Find the height</h3>

<p>A trapezium has parallel sides of 10 m and 16 m. Its area is 104 m². Find its perpendicular height.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = ½ × (a + b) × h</p>

<p><b>Step 2:</b> Substitute the known values.</p>

<p>104 = ½ × (10 + 16) × h</p>

<p><b>Step 3:</b> Add the parallel sides.</p>

<p>104 = ½ × 26 × h</p>

<p>104 = 13h</p>

<p><b>Step 4:</b> Divide both sides by 13.</p>

<p>h = 104 ÷ 13</p>

<p><b>h = 8 m</b></p>

<h3>Worked Example 3: Find a parallel side</h3>

<p>A trapezium has an area of 90 cm². One parallel side is 8 cm and the perpendicular height is 6 cm. Find the other parallel side.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>A = ½ × (a + b) × h</p>

<p><b>Step 2:</b> Substitute the known values.</p>

<p>90 = ½ × (8 + b) × 6</p>

<p><b>Step 3:</b> Simplify.</p>

<p>90 = 3(8 + b)</p>

<p><b>Step 4:</b> Divide by 3.</p>

<p>30 = 8 + b</p>

<p><b>Step 5:</b> Subtract 8 from both sides.</p>

<p>b = 22 cm</p>

<p><b>Answer: 22 cm</b></p>

<h3>Common mistake</h3>

<p>Do not add all four sides.</p>

<p>Only the <b>two parallel sides</b> are added in the formula.</p>

<p>Also, do not use a sloping side as the height unless it is perpendicular to the parallel sides.</p>`,

  [
    {
      q: "A trapezium has parallel sides of 7 cm and 13 cm and a perpendicular height of 6 cm. Find its area.",
      hint: "Add the two parallel sides first, then multiply by half the height.",
      steps: [
        "A = ½ × (a + b) × h.",
        "A = ½ × (7 + 13) × 6.",
        "A = ½ × 20 × 6.",
        "A = 10 × 6.",
        "A = 60 cm²."
      ],
      ans: "60 cm²",
      why: "The area is half the sum of the two parallel sides multiplied by the perpendicular height."
    },
    {
      q: "A trapezium has parallel sides of 12 m and 18 m and an area of 150 m². Find its perpendicular height.",
      hint: "Substitute into 150 = ½ × (12 + 18) × h.",
      steps: [
        "150 = ½ × (12 + 18) × h.",
        "150 = ½ × 30 × h.",
        "150 = 15h.",
        "h = 150 ÷ 15.",
        "h = 10 m."
      ],
      ans: "10 m",
      why: "After adding the parallel sides and taking half, divide the area by that value to find the height."
    },
    {
      q: "A trapezium has parallel sides of 9 cm and 15 cm and a perpendicular height of 8 cm. A learner calculates its area as 192 cm². Identify the error and find the correct area.",
      hint: "Check whether the learner added the parallel sides and then multiplied by the height without taking half.",
      steps: [
        "A = ½ × (9 + 15) × 8.",
        "A = ½ × 24 × 8.",
        "A = 12 × 8.",
        "A = 96 cm²."
      ],
      ans: "96 cm²",
      why: "The learner forgot the factor ½. Without taking half, the result is twice the correct area."
    },
    {
      q: "A trapezium has parallel sides of 10 cm and 20 cm and a perpendicular height of 7 cm. Find its area.",
      hint: "Use A = ½ × (a + b) × h.",
      steps: [
        "A = ½ × (10 + 20) × 7.",
        "A = ½ × 30 × 7.",
        "A = 15 × 7.",
        "A = 105 cm²."
      ],
      ans: "105 cm²",
      why: "The average of the parallel sides is 15 cm, and 15 × 7 gives the area."
    }
  ]
);
add(
  "math",
  "geometry",
  "Triangles",
  "Pythagoras' Theorem",

  `<h2>Pythagoras' Theorem</h2>

<p><b>One concept:</b> In a right-angled triangle, the square of the hypotenuse equals the sum of the squares of the other two sides.</p>

<p><b>Formula:</b></p>

<p>c² = a² + b²</p>

<p>Here, <b>c</b> is the <b>hypotenuse</b>.</p>

<p>The hypotenuse is always the side <b>opposite the 90° angle</b>.</p>

<p>It is also the <b>longest side</b> of a right-angled triangle.</p>

<h3>What does the formula mean?</h3>

<p>Suppose the two shorter sides are 3 cm and 4 cm.</p>

<p>The theorem says:</p>

<p>c² = 3² + 4²</p>

<p>c² = 9 + 16</p>

<p>c² = 25</p>

<p>Therefore:</p>

<p>c = √25 = 5 cm</p>

<p>So a right-angled triangle with sides 3 cm, 4 cm and 5 cm satisfies Pythagoras' theorem.</p>

<h3>Worked Example 1: Find the hypotenuse</h3>

<p>A right-angled triangle has two shorter sides of 6 cm and 8 cm. Find the hypotenuse.</p>

<p><b>Step 1:</b> Write Pythagoras' theorem.</p>

<p>c² = a² + b²</p>

<p><b>Step 2:</b> Substitute the known sides.</p>

<p>c² = 6² + 8²</p>

<p><b>Step 3:</b> Square the numbers.</p>

<p>c² = 36 + 64</p>

<p><b>Step 4:</b> Add.</p>

<p>c² = 100</p>

<p><b>Step 5:</b> Take the square root.</p>

<p>c = √100</p>

<p><b>c = 10 cm</b></p>

<h3>Worked Example 2: Find a shorter side</h3>

<p>A right-angled triangle has a hypotenuse of 13 m and one shorter side of 5 m. Find the other shorter side.</p>

<p><b>Step 1:</b> Write the formula.</p>

<p>c² = a² + b²</p>

<p><b>Step 2:</b> Substitute the known values.</p>

<p>13² = 5² + b²</p>

<p><b>Step 3:</b> Square the known numbers.</p>

<p>169 = 25 + b²</p>

<p><b>Step 4:</b> Subtract 25 from both sides.</p>

<p>169 - 25 = b²</p>

<p>144 = b²</p>

<p><b>Step 5:</b> Take the square root.</p>

<p>b = √144</p>

<p><b>b = 12 m</b></p>

<h3>Worked Example 3: Identify the hypotenuse first</h3>

<p>A right-angled triangle has sides of 9 cm, 12 cm and 15 cm. Show that Pythagoras' theorem is satisfied.</p>

<p><b>Step 1:</b> Identify the hypotenuse.</p>

<p>The longest side is 15 cm, so c = 15.</p>

<p><b>Step 2:</b> Square the hypotenuse.</p>

<p>c² = 15² = 225</p>

<p><b>Step 3:</b> Square the other two sides.</p>

<p>9² + 12² = 81 + 144</p>

<p>9² + 12² = 225</p>

<p><b>Step 4:</b> Compare both sides.</p>

<p>15² = 9² + 12²</p>

<p>225 = 225</p>

<p>Therefore, Pythagoras' theorem is satisfied.</p>

<h3>Common mistakes</h3>

<p><b>Mistake 1:</b> Choosing the longest side without checking that the triangle is right-angled.</p>

<p>Pythagoras' theorem applies specifically to <b>right-angled triangles</b>.</p>

<p><b>Mistake 2:</b> Forgetting to take the square root at the end.</p>

<p>If c² = 100, then c = √100 = 10, not 100.</p>

<p><b>Mistake 3:</b> Subtracting when finding the hypotenuse.</p>

<p>When finding the hypotenuse:</p>

<p>c² = a² + b²</p>

<p>When finding a shorter side:</p>

<p>a² = c² - b²</p>`,

  [
    {
      q: "A right-angled triangle has shorter sides of 9 cm and 12 cm. Find the hypotenuse.",
      hint: "Use c² = 9² + 12².",
      steps: [
        "c² = 9² + 12².",
        "c² = 81 + 144.",
        "c² = 225.",
        "c = √225.",
        "c = 15 cm."
      ],
      ans: "15 cm",
      why: "The hypotenuse is found by adding the squares of the two shorter sides and then taking the square root."
    },
    {
      q: "A right-angled triangle has a hypotenuse of 17 m and one shorter side of 8 m. Find the other shorter side.",
      hint: "Use b² = c² - a².",
      steps: [
        "17² = 8² + b².",
        "289 = 64 + b².",
        "289 - 64 = b².",
        "225 = b².",
        "b = √225.",
        "b = 15 m."
      ],
      ans: "15 m",
      why: "When finding a shorter side, subtract the square of the known shorter side from the square of the hypotenuse."
    },
    {
      q: "A learner uses 10² = 6² - 8² to find the hypotenuse of a triangle with shorter sides 6 cm and 8 cm. Identify the error and find the correct hypotenuse.",
      hint: "When finding the hypotenuse, the two shorter-side squares are added.",
      steps: [
        "The hypotenuse is found using c² = a² + b².",
        "c² = 6² + 8².",
        "c² = 36 + 64.",
        "c² = 100.",
        "c = √100.",
        "c = 10 cm."
      ],
      ans: "10 cm",
      why: "The learner subtracted the squares. To find the hypotenuse, the squares of the two shorter sides must be added."
    },
    {
      q: "The sides of a triangle are 7 cm, 24 cm and 25 cm. The triangle is right-angled. Verify Pythagoras' theorem.",
      hint: "The longest side is the hypotenuse.",
      steps: [
        "The hypotenuse is 25 cm.",
        "25² = 625.",
        "7² + 24² = 49 + 576.",
        "7² + 24² = 625.",
        "Therefore, 25² = 7² + 24²."
      ],
      ans: "Pythagoras' theorem is satisfied.",
      why: "The square of the hypotenuse equals the sum of the squares of the two shorter sides."
    }
  ]
);
add(
  "math",
  "geometry",
  "polygons",
  "Interior Angle Sum of Polygons",

  `<h2>Interior Angle Sum of Polygons</h2>

<p><b>One concept:</b> The sum of the interior angles of a polygon depends on the number of sides it has.</p>

<p><b>Formula:</b></p>

<p><b>Sum of interior angles = (n − 2) × 180°</b></p>

<p>Here, <b>n</b> is the number of sides of the polygon.</p>

<h3>Why does the formula work?</h3>

<p>A polygon can be divided into triangles by drawing diagonals from one vertex.</p>

<p>A polygon with <b>n</b> sides can be divided into:</p>

<p><b>n − 2 triangles</b></p>

<p>Every triangle has an angle sum of 180°.</p>

<p>Therefore:</p>

<p><b>Interior angle sum = (n − 2) × 180°</b></p>

<h3>Worked Example 1: Find the angle sum of a pentagon</h3>

<p>A pentagon has 5 sides. Find the sum of its interior angles.</p>

<p><b>Step 1:</b> Identify the number of sides.</p>

<p>n = 5</p>

<p><b>Step 2:</b> Use the formula.</p>

<p>Sum = (n − 2) × 180°</p>

<p><b>Step 3:</b> Substitute n = 5.</p>

<p>Sum = (5 − 2) × 180°</p>

<p><b>Step 4:</b> Simplify.</p>

<p>Sum = 3 × 180°</p>

<p><b>Step 5:</b> Calculate.</p>

<p><b>Sum = 540°</b></p>

<h3>Worked Example 2: Find the angle sum of a hexagon</h3>

<p>A hexagon has 6 sides. Find the sum of its interior angles.</p>

<p><b>Step 1:</b> Identify n.</p>

<p>n = 6</p>

<p><b>Step 2:</b> Substitute into the formula.</p>

<p>Sum = (6 − 2) × 180°</p>

<p><b>Step 3:</b> Simplify.</p>

<p>Sum = 4 × 180°</p>

<p><b>Step 4:</b> Calculate.</p>

<p><b>Sum = 720°</b></p>

<h3>Worked Example 3: Find the number of sides</h3>

<p>A polygon has an interior angle sum of 900°. How many sides does it have?</p>

<p><b>Step 1:</b> Start with the formula.</p>

<p>900° = (n − 2) × 180°</p>

<p><b>Step 2:</b> Divide both sides by 180°.</p>

<p>900 ÷ 180 = n − 2</p>

<p>5 = n − 2</p>

<p><b>Step 3:</b> Add 2 to both sides.</p>

<p>n = 7</p>

<p><b>Answer: The polygon has 7 sides.</b></p>

<h3>Useful values</h3>

<p><b>Triangle:</b> (3 − 2) × 180° = 180°</p>

<p><b>Quadrilateral:</b> (4 − 2) × 180° = 360°</p>

<p><b>Pentagon:</b> (5 − 2) × 180° = 540°</p>

<p><b>Hexagon:</b> (6 − 2) × 180° = 720°</p>

<p><b>Heptagon:</b> (7 − 2) × 180° = 900°</p>

<h3>Common mistake</h3>

<p>Do not use <b>n × 180°</b>.</p>

<p>The correct formula is:</p>

<p><b>(n − 2) × 180°</b></p>

<p>For example, a pentagon does not have an interior angle sum of 5 × 180°.</p>

<p>It has:</p>

<p>(5 − 2) × 180° = 540°</p>`,

  [
    {
      q: "Find the sum of the interior angles of an octagon.",
      hint: "An octagon has 8 sides. Use (n − 2) × 180°.",
      steps: [
        "n = 8.",
        "Sum = (8 − 2) × 180°.",
        "Sum = 6 × 180°.",
        "Sum = 1080°."
      ],
      ans: "1080°",
      why: "An octagon can be divided into 6 triangles, and each triangle has an angle sum of 180°."
    },
    {
      q: "A polygon has 10 sides. Find the sum of its interior angles.",
      hint: "Substitute n = 10 into (n − 2) × 180°.",
      steps: [
        "n = 10.",
        "Sum = (10 − 2) × 180°.",
        "Sum = 8 × 180°.",
        "Sum = 1440°."
      ],
      ans: "1440°",
      why: "A 10-sided polygon can be divided into 8 triangles."
    },
    {
      q: "A polygon has an interior angle sum of 1260°. How many sides does it have?",
      hint: "Start with 1260 = (n − 2) × 180.",
      steps: [
        "1260 = (n − 2) × 180.",
        "1260 ÷ 180 = n − 2.",
        "7 = n − 2.",
        "n = 9."
      ],
      ans: "9 sides",
      why: "A polygon with 9 sides has 7 triangles, giving an interior angle sum of 7 × 180° = 1260°."
    },
    {
      q: "A learner says that the interior angle sum of a hexagon is 1080°. Identify the error and find the correct answer.",
      hint: "Check the number of triangles formed using n − 2.",
      steps: [
        "A hexagon has 6 sides.",
        "Number of triangles = 6 − 2 = 4.",
        "Interior angle sum = 4 × 180°.",
        "Interior angle sum = 720°."
      ],
      ans: "720°",
      why: "The learner did not use the correct number of triangles. A hexagon forms 4 triangles, not 6."
    }
  ]
);
add(
  "math",
  "geometry",
  "polygons",
  "Exterior Angles of a Polygon",

  `<h2>Exterior Angles of a Polygon</h2>

<p><b>One concept:</b> The sum of one exterior angle at each vertex of any polygon is always 360°.</p>

<p><b>Rule:</b></p>

<p><b>Sum of exterior angles = 360°</b></p>

<p>This rule works for every polygon, regardless of the number of sides.</p>

<h3>What is an exterior angle?</h3>

<p>An exterior angle is formed when one side of a polygon is extended beyond a vertex.</p>

<p>The exterior angle and the interior angle at the same vertex form a straight line.</p>

<p>Therefore:</p>

<p><b>Interior angle + exterior angle = 180°</b></p>

<h3>Why is the exterior angle sum 360°?</h3>

<p>Imagine walking around the outside of a polygon.</p>

<p>At every vertex, you turn through an exterior angle.</p>

<p>After going all the way around the polygon, you have made one complete turn.</p>

<p>One complete turn is:</p>

<p><b>360°</b></p>

<p>Therefore, the exterior angles add up to 360°.</p>

<h3>Worked Example 1: Find a missing exterior angle</h3>

<p>A polygon has exterior angles of 80°, 100°, 70° and 60°. Find the fifth exterior angle.</p>

<p><b>Step 1:</b> The exterior angles must add up to 360°.</p>

<p>Sum = 360°</p>

<p><b>Step 2:</b> Add the known angles.</p>

<p>80° + 100° + 70° + 60° = 310°</p>

<p><b>Step 3:</b> Subtract from 360°.</p>

<p>Missing angle = 360° − 310°</p>

<p><b>Missing angle = 50°</b></p>

<h3>Worked Example 2: Find each exterior angle of a regular polygon</h3>

<p>A regular hexagon has 6 equal exterior angles. Find each exterior angle.</p>

<p><b>Step 1:</b> The exterior angles add up to 360°.</p>

<p><b>Step 2:</b> Because the hexagon is regular, all 6 exterior angles are equal.</p>

<p>Each exterior angle = 360° ÷ 6</p>

<p><b>Step 3:</b> Calculate.</p>

<p><b>Each exterior angle = 60°</b></p>

<h3>Worked Example 3: Find the number of sides</h3>

<p>A regular polygon has an exterior angle of 45°. Find the number of sides.</p>

<p><b>Step 1:</b> The exterior angles add up to 360°.</p>

<p><b>Step 2:</b> Because the polygon is regular, all exterior angles are equal.</p>

<p>Number of sides = 360° ÷ exterior angle</p>

<p><b>Step 3:</b> Substitute 45°.</p>

<p>n = 360° ÷ 45°</p>

<p><b>n = 8</b></p>

<p>Therefore, the polygon has <b>8 sides</b>.</p>

<h3>Important relationship</h3>

<p>At the same vertex, the interior and exterior angles form a straight line.</p>

<p>Therefore:</p>

<p><b>Interior angle + exterior angle = 180°</b></p>

<p>For example, if an interior angle is 120°:</p>

<p>Exterior angle = 180° − 120°</p>

<p><b>Exterior angle = 60°</b></p>

<h3>Common mistakes</h3>

<p><b>Mistake 1:</b> Using 180° as the total exterior-angle sum.</p>

<p>The total exterior-angle sum is <b>360°</b>.</p>

<p><b>Mistake 2:</b> Dividing 180° by the number of sides to find each exterior angle.</p>

<p>For a regular polygon:</p>

<p><b>Each exterior angle = 360° ÷ n</b></p>

<p><b>Mistake 3:</b> Assuming every polygon has equal exterior angles.</p>

<p>Only a <b>regular polygon</b> has equal exterior angles.</p>`,

  [
    {
      q: "The exterior angles of a polygon are 90°, 80°, 70° and 60°. Find the fifth exterior angle.",
      hint: "All exterior angles together add to 360°.",
      steps: [
        "Total exterior angle sum = 360°.",
        "90° + 80° + 70° + 60° = 300°.",
        "Missing angle = 360° − 300°.",
        "Missing angle = 60°."
      ],
      ans: "60°",
      why: "The exterior angles of a polygon make one complete turn, which is 360°."
    },
    {
      q: "Find each exterior angle of a regular pentagon.",
      hint: "Divide 360° by the number of sides.",
      steps: [
        "A pentagon has 5 sides.",
        "Each exterior angle = 360° ÷ 5.",
        "Each exterior angle = 72°."
      ],
      ans: "72°",
      why: "A regular polygon has equal exterior angles, and together they total 360°."
    },
    {
      q: "Each exterior angle of a regular polygon is 30°. How many sides does the polygon have?",
      hint: "Use n = 360° ÷ exterior angle.",
      steps: [
        "n = 360° ÷ 30°.",
        "n = 12."
      ],
      ans: "12 sides",
      why: "There are 360° in one complete turn, so 30° exterior angles require 12 equal turns."
    },
    {
      q: "A regular polygon has an interior angle of 135°. Find each exterior angle.",
      hint: "Interior angle + exterior angle = 180°.",
      steps: [
        "Interior angle + exterior angle = 180°.",
        "135° + exterior angle = 180°.",
        "Exterior angle = 180° − 135°.",
        "Exterior angle = 45°."
      ],
      ans: "45°",
      why: "The interior and exterior angles at the same vertex form a straight line."
    },
    {
      q: "A learner says that each exterior angle of a regular hexagon is 30°. Identify the error and find the correct angle.",
      hint: "A hexagon has 6 equal exterior angles whose total is 360°.",
      steps: [
        "A hexagon has 6 sides.",
        "Each exterior angle = 360° ÷ 6.",
        "Each exterior angle = 60°.",
        "The learner used 180° ÷ 6 instead of 360° ÷ 6."
      ],
      ans: "60°",
      why: "The sum of the exterior angles is 360°, not 180°."
    }
  ]
);
add(
  "math",
  "linear_programming",
  "Meaning of a Variable in Linear Programming",

  `<h2>Meaning of a Variable in Linear Programming</h2>

<p>
A <b>variable</b> represents an unknown quantity that can change.
In linear programming, variables usually represent quantities that
we need to determine.
</p>

<p>
We commonly use letters such as <b>x</b> and <b>y</b> to represent
these unknown quantities.
</p>

<h3>Example 1</h3>

<p>
A shop sells two types of bags. Let:
</p>

<pre>
x = number of small bags
y = number of large bags
</pre>

<p>
Here, <b>x</b> and <b>y</b> are variables because their values are
not known yet.
</p>

<h3>Example 2</h3>

<p>
A farmer keeps chickens and goats. Let:
</p>

<pre>
x = number of chickens
y = number of goats
</pre>

<p>
The variables represent the quantities we want to determine.
</p>

<h3>Example 3</h3>

<p>
A school produces desks and chairs. Let:
</p>

<pre>
x = number of desks produced
y = number of chairs produced
</pre>

<p>
The values of x and y can change depending on the available
resources and the requirements of the problem.
</p>

<h3>Important</h3>

<p>
Always state what each variable represents before using it.
Writing only <b>x</b> and <b>y</b> without defining them makes the
mathematical model unclear.
</p>

<p>
<b>Key idea:</b> A variable represents an unknown quantity whose
value we are trying to determine.
</p>
`,

  [
    {
      "q": "In a problem, x represents the number of books sold. What does x represent?",
      "hint": "Look at the meaning given to x.",
      "steps": [
        "Step 1: Read what x represents.",
        "Step 2: x represents the number of books sold."
      ],
      "ans": "The number of books sold.",
      "why": "A variable represents the quantity assigned to it."
    },

    {
      "q": "A farmer produces maize and beans. If x represents maize bags and y represents bean bags, what do the variables represent?",
      "hint": "Read the definitions of x and y.",
      "steps": [
        "Step 1: x represents maize bags.",
        "Step 2: y represents bean bags.",
        "Step 3: Therefore x and y represent the two quantities being considered."
      ],
      "ans": "x represents maize bags and y represents bean bags.",
      "why": "Variables are symbols used to represent unknown quantities."
    },

    {
      "q": "A business sells pens and books. Choose suitable variables and state what they represent.",
      "hint": "Use x and y.",
      "steps": [
        "Step 1: Let x represent the number of pens.",
        "Step 2: Let y represent the number of books.",
        "Step 3: State both definitions clearly."
      ],
      "ans": "x = number of pens; y = number of books.",
      "why": "Variables must be connected to the quantities they represent."
    },

    {
      "q": "Why should variables be defined before solving a linear programming problem?",
      "hint": "Think about what x and y need to mean.",
      "steps": [
        "Step 1: A variable is only a symbol.",
        "Step 2: Its definition gives the symbol meaning.",
        "Step 3: Therefore the variables must be defined clearly."
      ],
      "ans": "To make clear what each unknown quantity represents.",
      "why": "A mathematical model cannot be interpreted correctly if its variables have no defined meaning."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Identifying Variables from a Problem",

  `<h2>Identifying Variables from a Problem</h2>

<p>
In a word problem, the first task is to identify the quantities that
are unknown and need to be determined.
These quantities become the <b>variables</b>.
</p>

<p>
A good variable definition tells us exactly what is being counted or
measured.
</p>

<h3>Example 1</h3>

<p>
A bakery makes cakes and bread. The number of cakes and loaves of
bread produced is unknown.
</p>

<pre>
x = number of cakes
y = number of loaves of bread
</pre>

<h3>Example 2</h3>

<p>
A farmer keeps cows and goats. The numbers of cows and goats are
unknown.
</p>

<pre>
x = number of cows
y = number of goats
</pre>

<h3>Example 3</h3>

<p>
A company produces tables and chairs.
</p>

<pre>
x = number of tables produced
y = number of chairs produced
</pre>

<p>
Notice that the variables describe the <b>quantities being decided</b>.
They are not the prices, profits, or available resources unless the
problem specifically makes those quantities unknown.
</p>

<h3>Key Rule</h3>

<p>
Ask:
</p>

<pre>
"What quantities do I need to find?"
</pre>

<p>
Those quantities are the natural candidates for the variables.
</p>
`,

  [
    {
      "q": "A factory produces shirts and trousers. What two variables could represent the quantities produced?",
      "hint": "The variables should represent the two products.",
      "steps": [
        "Step 1: Identify the first unknown quantity: shirts.",
        "Step 2: Identify the second unknown quantity: trousers.",
        "Step 3: Assign variables."
      ],
      "ans": "x = number of shirts; y = number of trousers.",
      "why": "The variables represent the quantities whose values need to be determined."
    },

    {
      "q": "A farmer grows maize and beans. Let x represent maize. What should y represent?",
      "hint": "Look at the other quantity.",
      "steps": [
        "Step 1: The first quantity is maize.",
        "Step 2: The second quantity is beans.",
        "Step 3: Therefore y represents beans."
      ],
      "ans": "y represents the amount or number of beans.",
      "why": "Each variable should represent one of the unknown quantities."
    },

    {
      "q": "A shop sells phones and laptops. If x is the number of phones, choose a suitable meaning for y.",
      "hint": "Use the second product.",
      "steps": [
        "Step 1: x already represents phones.",
        "Step 2: The other quantity is laptops.",
        "Step 3: Let y represent laptops."
      ],
      "ans": "y = number of laptops.",
      "why": "The variables should represent the quantities being decided."
    },

    {
      "q": "A school wants to determine how many desks and chairs to make. What should the variables represent?",
      "hint": "Identify the two unknown quantities.",
      "steps": [
        "Step 1: Identify the desk quantity.",
        "Step 2: Identify the chair quantity.",
        "Step 3: Assign one variable to each."
      ],
      "ans": "One variable represents the number of desks and the other represents the number of chairs.",
      "why": "Variables represent the unknown quantities in the problem."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Non-Negativity Constraints",

  `<h2>Non-Negativity Constraints</h2>

<p>
When a variable represents a quantity such as the number of products,
people, animals, or hours, it normally cannot be negative.
</p>

<p>
This is expressed using a <b>non-negativity constraint</b>.
</p>

<pre>
x ≥ 0
y ≥ 0
</pre>

<p>
These statements mean that x and y can be zero or positive, but not
negative.
</p>

<h3>Example 1</h3>

<p>
If x represents the number of desks produced:
</p>

<pre>
x ≥ 0
</pre>

<p>
We cannot produce −3 desks.
</p>

<h3>Example 2</h3>

<p>
If y represents the number of workers assigned to a task:
</p>

<pre>
y ≥ 0
</pre>

<p>
A negative number of workers has no physical meaning.
</p>

<h3>Example 3</h3>

<p>
If x represents chairs and y represents tables:
</p>

<pre>
x ≥ 0
y ≥ 0
</pre>

<p>
Both quantities must be zero or greater.
</p>

<h3>Important</h3>

<p>
The condition <b>x ≥ 0</b> does not mean that x must be positive.
Zero is allowed.
</p>

<pre>
x = 0 ✓
x = 4 ✓
x = 10 ✓
x = -2 ✗
</pre>

<p>
<b>Key idea:</b> Quantities that cannot be negative are represented
using non-negativity constraints such as x ≥ 0 and y ≥ 0.
</p>
`,

  [
    {
      "q": "If x represents the number of tables produced, write its non-negativity constraint.",
      "hint": "The number of tables cannot be negative.",
      "steps": [
        "Step 1: x represents a quantity.",
        "Step 2: The quantity cannot be negative.",
        "Step 3: Write x ≥ 0."
      ],
      "ans": "x ≥ 0",
      "why": "A physical quantity represented by x cannot be negative."
    },

    {
      "q": "Write the non-negativity constraints for x and y.",
      "hint": "Both variables cannot be negative.",
      "steps": [
        "Step 1: x cannot be negative → x ≥ 0.",
        "Step 2: y cannot be negative → y ≥ 0.",
        "Step 3: Write both constraints."
      ],
      "ans": "x ≥ 0 and y ≥ 0",
      "why": "Both variables represent non-negative quantities."
    },

    {
      "q": "Is x = -3 allowed if x represents the number of products made?",
      "hint": "Check x ≥ 0.",
      "steps": [
        "Step 1: The constraint is x ≥ 0.",
        "Step 2: Substitute x = -3.",
        "Step 3: -3 ≥ 0 is false."
      ],
      "ans": "No.",
      "why": "A negative quantity violates the non-negativity constraint."
    },

    {
      "q": "Is x = 0 allowed under x ≥ 0?",
      "hint": "Does ≥ include equality?",
      "steps": [
        "Step 1: The constraint is x ≥ 0.",
        "Step 2: Substitute x = 0.",
        "Step 3: 0 ≥ 0 is true."
      ],
      "ans": "Yes.",
      "why": "The symbol ≥ includes equality, so zero is allowed."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Meaning of an Objective Function",

  `<h2>Meaning of an Objective Function</h2>

<p>
The <b>objective function</b> is the mathematical expression that
tells us what quantity we want to <b>maximize</b> or <b>minimize</b>.
</p>

<p>
It is commonly written using <b>Z</b>.
</p>

<pre>
Z = ax + by
</pre>

<p>
The values of x and y determine the value of Z.
</p>

<h3>Example 1</h3>

<pre>
Z = 5x + 3y
</pre>

<p>
If the question says "maximize profit", then this expression represents
the profit being maximized.
</p>

<h3>Example 2</h3>

<pre>
C = 4x + 2y
</pre>

<p>
If C represents cost and the problem asks for the minimum cost, then
C is the objective function.
</p>

<h3>Example 3</h3>

<pre>
Z = 8x + 5y
</pre>

<p>
If Z represents total revenue and the problem asks for the greatest
possible revenue, then Z is the objective function.
</p>

<h3>Recognizing It</h3>

<p>
Look for the quantity the problem wants to make as large or as small
as possible.
</p>

<pre>
maximize → largest possible value

minimize → smallest possible value
</pre>

<p>
<b>Key idea:</b> The objective function is what we are trying to
optimize.
</p>
`,

  [
    {
      "q": "In Maximize Z = 6x + 4y, what is the objective function?",
      "hint": "Find the expression being maximized.",
      "steps": [
        "Step 1: Identify the quantity being maximized.",
        "Step 2: It is Z.",
        "Step 3: Therefore the objective function is Z = 6x + 4y."
      ],
      "ans": "Z = 6x + 4y",
      "why": "The objective function is the expression being maximized."
    },

    {
      "q": "In Minimize C = 3x + 7y, what is the objective function?",
      "hint": "Find the expression being minimized.",
      "steps": [
        "Step 1: Identify the quantity being minimized.",
        "Step 2: It is C.",
        "Step 3: Therefore the objective function is C = 3x + 7y."
      ],
      "ans": "C = 3x + 7y",
      "why": "The objective function is the quantity being optimized."
    },

    {
      "q": "What does the objective function tell us?",
      "hint": "Think about maximize and minimize.",
      "steps": [
        "Step 1: Identify the role of the objective.",
        "Step 2: It gives the quantity being optimized.",
        "Step 3: The quantity is maximized or minimized."
      ],
      "ans": "It tells us what quantity is to be maximized or minimized.",
      "why": "The objective function defines the goal of the linear programming problem."
    },

    {
      "q": "A company wants to maximize profit P = 10x + 6y. What is being optimized?",
      "hint": "Look at what P represents.",
      "steps": [
        "Step 1: P represents profit.",
        "Step 2: The problem says maximize.",
        "Step 3: Therefore profit is being maximized."
      ],
      "ans": "Profit.",
      "why": "The objective function represents the quantity that the problem wants to optimize."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Identifying the Objective Function",

  `<h2>Identifying the Objective Function</h2>

<p>
To identify the objective function, look for the quantity that the
problem asks you to <b>maximize</b> or <b>minimize</b>.
</p>

<p>
The wording of the question is important.
</p>

<h3>Example 1</h3>

<p>
A company wants to obtain the greatest profit:
</p>

<pre>
Profit = 8x + 5y
</pre>

<p>
Therefore:
</p>

<pre>
Maximize P = 8x + 5y
</pre>

<p>
The objective function is:
</p>

<pre>
P = 8x + 5y
</pre>

<h3>Example 2</h3>

<p>
A manufacturer wants the lowest production cost:
</p>

<pre>
Cost = 6x + 4y
</pre>

<p>
Therefore:
</p>

<pre>
Minimize C = 6x + 4y
</pre>

<p>
The objective function is:
</p>

<pre>
C = 6x + 4y
</pre>

<h3>Example 3</h3>

<p>
A farmer wants to maximize the total income:
</p>

<pre>
Income = 12x + 9y
</pre>

<p>
Therefore:
</p>

<pre>
Maximize I = 12x + 9y
</pre>

<h3>Key Question</h3>

<p>
When reading a word problem, ask:
</p>

<pre>
"What does the problem want me to make
as large as possible or as small as possible?"
</pre>

<p>
That quantity forms the objective function.
</p>
`,

  [
    {
      "q": "A business wants to maximize profit P = 7x + 4y. Identify the objective function.",
      "hint": "Profit is the quantity being maximized.",
      "steps": [
        "Step 1: Identify the quantity being optimized: profit.",
        "Step 2: Profit is P = 7x + 4y.",
        "Step 3: Write the objective function."
      ],
      "ans": "P = 7x + 4y",
      "why": "Profit is the quantity being maximized."
    },

    {
      "q": "A factory wants to minimize cost C = 9x + 2y. What is the objective function?",
      "hint": "Look at the quantity being minimized.",
      "steps": [
        "Step 1: Identify the quantity: cost.",
        "Step 2: Cost is C = 9x + 2y.",
        "Step 3: This is the objective function."
      ],
      "ans": "C = 9x + 2y",
      "why": "Cost is the quantity being minimized."
    },

    {
      "q": "A farmer wants the greatest possible income I = 15x + 10y. Is I = 15x + 10y the objective function?",
      "hint": "Is income being optimized?",
      "steps": [
        "Step 1: I represents income.",
        "Step 2: The problem asks for the greatest income.",
        "Step 3: Therefore I is the objective function."
      ],
      "ans": "Yes.",
      "why": "The objective function represents the quantity being maximized or minimized."
    },

    {
      "q": "A problem gives x + y ≤ 20 and asks for maximum profit P = 5x + 3y. Which expression is the objective function?",
      "hint": "One expression is a restriction and the other is the quantity being maximized.",
      "steps": [
        "Step 1: x + y ≤ 20 is a restriction.",
        "Step 2: P = 5x + 3y represents profit.",
        "Step 3: Profit is being maximized.",
        "Step 4: Therefore P = 5x + 3y is the objective function."
      ],
      "ans": "P = 5x + 3y",
      "why": "The objective function is the quantity being optimized, while x + y ≤ 20 is a constraint."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Maximization",

  `<h2>Maximization</h2>

<p>
<b>Maximization</b> means finding the largest possible value of a
quantity while satisfying all the required restrictions.
</p>

<p>
In linear programming, the quantity being maximized is represented by
the objective function.
</p>

<h3>Example 1</h3>

<pre>
Z = 4x + 3y
</pre>

<p>
If the problem says:
</p>

<pre>
Maximize Z
</pre>

<p>
our goal is to find the feasible values of x and y that produce the
largest possible value of Z.
</p>

<h3>Example 2</h3>

<p>
Suppose the possible values of Z at three allowed points are:
</p>

<pre>
Point A: Z = 10
Point B: Z = 16
Point C: Z = 13
</pre>

<p>
Compare the values:
</p>

<pre>
10, 16, 13
</pre>

<p>
The largest value is 16.
</p>

<pre>
Maximum Z = 16
</pre>

<h3>Example 3</h3>

<p>
Suppose:
</p>

<pre>
Z = 5x + 2y
</pre>

<p>
At three feasible points:
</p>

<pre>
(1,2): Z = 5(1) + 2(2) = 9

(2,3): Z = 5(2) + 2(3) = 16

(4,1): Z = 5(4) + 2(1) = 22
</pre>

<p>
The largest value is 22.
</p>

<pre>
Maximum Z = 22 at (4,1)
</pre>

<p>
<b>Key idea:</b> Maximization means selecting the largest objective
value among the allowed solutions.
</p>
`,

  [
    {
      "q": "What does maximize mean?",
      "hint": "Think about size.",
      "steps": [
        "Step 1: Maximization asks for an extreme value.",
        "Step 2: The required value must be the largest."
      ],
      "ans": "Find the largest possible value.",
      "why": "To maximize means to make a quantity as large as possible."
    },

    {
      "q": "Which is the maximum of 7, 12, and 9?",
      "hint": "Choose the largest number.",
      "steps": [
        "Step 1: Compare 7 and 12.",
        "Step 2: 12 is larger than 7.",
        "Step 3: Compare 12 and 9.",
        "Step 4: 12 is the largest."
      ],
      "ans": "12",
      "why": "The maximum is the largest value."
    },

    {
      "q": "If Z has values 14, 21, and 18 at three feasible points, what is the maximum value?",
      "hint": "Choose the largest value.",
      "steps": [
        "Step 1: Compare 14, 21, and 18.",
        "Step 2: 21 is the largest."
      ],
      "ans": "21",
      "why": "Maximization requires the largest feasible objective value."
    },

    {
      "q": "For Z = 3x + 2y, Z = 20 at one feasible point and Z = 17 at another. Which point gives the larger objective value?",
      "hint": "Compare 20 and 17.",
      "steps": [
        "Step 1: Compare the objective values.",
        "Step 2: 20 > 17.",
        "Step 3: Therefore the point with Z = 20 gives the larger value."
      ],
      "ans": "The point where Z = 20.",
      "why": "A maximum requires the largest objective-function value."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Minimization",

  `<h2>Minimization</h2>

<p>
<b>Minimization</b> means finding the smallest possible value of a
quantity while satisfying all the required restrictions.
</p>

<p>
The quantity being minimized is represented by the objective function.
</p>

<h3>Example 1</h3>

<pre>
C = 6x + 4y
</pre>

<p>
If the problem says:
</p>

<pre>
Minimize C
</pre>

<p>
our goal is to find the feasible values of x and y that produce the
smallest possible value of C.
</p>

<h3>Example 2</h3>

<p>
Suppose the possible values of C are:
</p>

<pre>
C = 15
C = 9
C = 12
</pre>

<p>
The smallest value is:
</p>

<pre>
Minimum C = 9
</pre>

<h3>Example 3</h3>

<p>
Suppose:
</p>

<pre>
C = 4x + 3y
</pre>

<p>
At three feasible points:
</p>

<pre>
(1,2): C = 4(1) + 3(2) = 10

(2,1): C = 4(2) + 3(1) = 11

(3,2): C = 4(3) + 3(2) = 18
</pre>

<p>
The smallest value is 10.
</p>

<pre>
Minimum C = 10 at (1,2)
</pre>

<p>
<b>Key idea:</b> Minimization means selecting the smallest objective
value among the allowed solutions.
</p>
`,

  [
    {
      "q": "What does minimize mean?",
      "hint": "Think about size.",
      "steps": [
        "Step 1: Minimization asks for an extreme value.",
        "Step 2: The required value must be the smallest."
      ],
      "ans": "Find the smallest possible value.",
      "why": "To minimize means to make a quantity as small as possible."
    },

    {
      "q": "Which is the minimum of 8, 5, and 11?",
      "hint": "Choose the smallest number.",
      "steps": [
        "Step 1: Compare 8, 5, and 11.",
        "Step 2: 5 is smaller than both 8 and 11."
      ],
      "ans": "5",
      "why": "The minimum is the smallest value."
    },

    {
      "q": "If C has values 18, 7, and 12 at three feasible points, what is the minimum?",
      "hint": "Choose the smallest value.",
      "steps": [
        "Step 1: Compare 18, 7, and 12.",
        "Step 2: 7 is the smallest."
      ],
      "ans": "7",
      "why": "Minimization requires the smallest feasible objective value."
    },

    {
      "q": "For C = 2x + 5y, one feasible point gives C = 14 and another gives C = 19. Which gives the smaller objective value?",
      "hint": "Compare 14 and 19.",
      "steps": [
        "Step 1: Compare the objective values.",
        "Step 2: 14 < 19.",
        "Step 3: Therefore the point giving C = 14 has the smaller value."
      ],
      "ans": "The point where C = 14.",
      "why": "A minimum requires the smallest objective-function value."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Meaning of a Constraint",

  `<h2>Meaning of a Constraint</h2>

<p>
A <b>constraint</b> is a mathematical restriction on the values that
the variables are allowed to take.
</p>

<p>
Constraints describe the limits imposed by the situation.
They are usually written as inequalities.
</p>

<h3>Example 1</h3>

<pre>
x + y ≤ 20
</pre>

<p>
This means the combined value of x and y cannot be greater than 20.
</p>

<p>
For example:
</p>

<pre>
x = 8, y = 10

8 + 10 = 18 ≤ 20 ✓
</pre>

<h3>Example 2</h3>

<pre>
2x + y ≤ 12
</pre>

<p>
The weighted combination 2x + y cannot exceed 12.
</p>

<p>
For example:
</p>

<pre>
x = 4, y = 3

2(4) + 3 = 11 ≤ 12 ✓
</pre>

<h3>Example 3</h3>

<pre>
x ≥ 5
</pre>

<p>
This constraint requires x to be at least 5.
Therefore values such as 5, 6, and 10 are allowed, while 4 is not.
</p>

<h3>Important Distinction</h3>

<p>
The <b>objective function</b> tells us what we want to optimize.
A <b>constraint</b> tells us what we are allowed to do.
</p>

<pre>
Objective → What we want
Constraint → What is allowed
</pre>

<p>
<b>Key idea:</b> A constraint limits the possible values of the
variables.
</p>
`,

  [
    {
      "q": "What is the purpose of a constraint?",
      "hint": "Think about restrictions.",
      "steps": [
        "Step 1: Identify what a constraint does.",
        "Step 2: It restricts possible variable values."
      ],
      "ans": "It restricts the possible values of the variables.",
      "why": "Constraints describe the limits that solutions must obey."
    },

    {
      "q": "Does x + y ≤ 10 restrict the possible values of x and y?",
      "hint": "Ask whether every pair of values is allowed.",
      "steps": [
        "Step 1: The inequality requires x + y to be at most 10.",
        "Step 2: Therefore some pairs are allowed and others are not."
      ],
      "ans": "Yes.",
      "why": "A constraint limits which variable values are permitted."
    },

    {
      "q": "Is (4,3) allowed by x + y ≤ 10?",
      "hint": "Substitute the values.",
      "steps": [
        "Step 1: Calculate x + y = 4 + 3.",
        "Step 2: 4 + 3 = 7.",
        "Step 3: Check 7 ≤ 10.",
        "Step 4: The inequality is true."
      ],
      "ans": "Yes.",
      "why": "The point satisfies the constraint."
    },

    {
      "q": "Is (8,5) allowed by x + y ≤ 10?",
      "hint": "Calculate x + y.",
      "steps": [
        "Step 1: Calculate 8 + 5 = 13.",
        "Step 2: Check 13 ≤ 10.",
        "Step 3: The inequality is false."
      ],
      "ans": "No.",
      "why": "The point violates the constraint."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Translating 'At Most' into an Inequality",

  `<h2>Translating "At Most" into an Inequality</h2>

<p>
The phrase <b>"at most"</b> means that a quantity cannot be greater
than a stated value.
</p>

<p>
Therefore:
</p>

<pre>
at most N  →  ≤ N
</pre>

<p>
The value N itself is allowed.
</p>

<h3>Example 1</h3>

<p>
x is at most 10.
</p>

<pre>
x ≤ 10
</pre>

<p>
This allows 10 and values below 10.
</p>

<h3>Example 2</h3>

<p>
The total number of products is at most 50.
If x and y represent two types of products:
</p>

<pre>
x + y ≤ 50
</pre>

<h3>Example 3</h3>

<p>
A worker can spend at most 8 hours on two activities.
If x and y are the hours spent:
</p>

<pre>
x + y ≤ 8
</pre>

<h3>Important</h3>

<p>
"At most" includes the limiting value.
</p>

<pre>
at most 10

10 is allowed ✓
11 is not allowed ✗
</pre>

<p>
<b>Key idea:</b> "At most" translates to <b>less than or equal to
(≤)</b>.
</p>
`,

  [
    {
      "q": "Translate 'x is at most 15' into an inequality.",
      "hint": "At most means the value cannot exceed 15.",
      "steps": [
        "Step 1: Identify 'at most'.",
        "Step 2: Use ≤.",
        "Step 3: Write x ≤ 15."
      ],
      "ans": "x ≤ 15",
      "why": "'At most' means less than or equal to."
    },

    {
      "q": "Translate 'the total of x and y is at most 20'.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total: x + y.",
        "Step 2: 'At most 20' means ≤ 20.",
        "Step 3: Combine them."
      ],
      "ans": "x + y ≤ 20",
      "why": "The total cannot exceed 20."
    },

    {
      "q": "Is x = 10 allowed if x is at most 10?",
      "hint": "Does ≤ include equality?",
      "steps": [
        "Step 1: Write the condition x ≤ 10.",
        "Step 2: Test x = 10.",
        "Step 3: 10 ≤ 10 is true."
      ],
      "ans": "Yes.",
      "why": "'At most' includes the limiting value."
    },

    {
      "q": "Which inequality correctly represents 'y is at most 7': y < 7 or y ≤ 7?",
      "hint": "The value 7 itself should be allowed.",
      "steps": [
        "Step 1: 'At most 7' includes 7.",
        "Step 2: ≤ includes 7.",
        "Step 3: Therefore y ≤ 7."
      ],
      "ans": "y ≤ 7",
      "why": "'At most' means less than or equal to, not strictly less than."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Translating 'At Least' into an Inequality",

  `<h2>Translating "At Least" into an Inequality</h2>

<p>
The phrase <b>"at least"</b> means that a quantity cannot be smaller
than a stated value.
</p>

<p>
Therefore:
</p>

<pre>
at least N  →  ≥ N
</pre>

<p>
The value N itself is allowed.
</p>

<h3>Example 1</h3>

<p>
x is at least 5.
</p>

<pre>
x ≥ 5
</pre>

<p>
This allows 5 and values greater than 5.
</p>

<h3>Example 2</h3>

<p>
A company must produce at least 100 units.
If x represents the number of units:
</p>

<pre>
x ≥ 100
</pre>

<h3>Example 3</h3>

<p>
A school requires at least 30 students in two groups.
If x and y are the numbers of students:
</p>

<pre>
x + y ≥ 30
</pre>

<h3>Important</h3>

<p>
"At least" includes the limiting value.
</p>

<pre>
at least 10

10 is allowed ✓
9 is not allowed ✗
</pre>

<p>
<b>Key idea:</b> "At least" translates to <b>greater than or equal to
(≥)</b>.
</p>
`,

  [
    {
      "q": "Translate 'x is at least 12' into an inequality.",
      "hint": "At least means the value cannot be below 12.",
      "steps": [
        "Step 1: Identify 'at least'.",
        "Step 2: Use ≥.",
        "Step 3: Write x ≥ 12."
      ],
      "ans": "x ≥ 12",
      "why": "'At least' means greater than or equal to."
    },

    {
      "q": "Translate 'the total of x and y is at least 25'.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total: x + y.",
        "Step 2: 'At least 25' means ≥ 25.",
        "Step 3: Combine them."
      ],
      "ans": "x + y ≥ 25",
      "why": "The total must be 25 or greater."
    },

    {
      "q": "Is x = 8 allowed if x is at least 8?",
      "hint": "Does ≥ include equality?",
      "steps": [
        "Step 1: Write x ≥ 8.",
        "Step 2: Test x = 8.",
        "Step 3: 8 ≥ 8 is true."
      ],
      "ans": "Yes.",
      "why": "'At least' includes the limiting value."
    },

    {
      "q": "Which inequality represents 'y is at least 6': y > 6 or y ≥ 6?",
      "hint": "The value 6 itself should be allowed.",
      "steps": [
        "Step 1: 'At least 6' includes 6.",
        "Step 2: ≥ includes equality.",
        "Step 3: Therefore y ≥ 6."
      ],
      "ans": "y ≥ 6",
      "why": "'At least' means greater than or equal to, not strictly greater than."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Translating 'Cannot Exceed' into an Inequality",

  `<h2>Translating "Cannot Exceed" into an Inequality</h2>

<p>
The phrase <b>"cannot exceed"</b> means that a quantity must not be
greater than a stated value.
</p>

<p>
Therefore:
</p>

<pre>
cannot exceed N  →  ≤ N
</pre>

<p>
The limiting value N is allowed.
</p>

<h3>Example 1</h3>

<p>
x cannot exceed 20.
</p>

<pre>
x ≤ 20
</pre>

<h3>Example 2</h3>

<p>
The total number of items cannot exceed 100.
If x and y represent two types of items:
</p>

<pre>
x + y ≤ 100
</pre>

<h3>Example 3</h3>

<p>
The total time cannot exceed 12 hours.
If x and y are two time periods:
</p>

<pre>
x + y ≤ 12
</pre>

<h3>Check the Meaning</h3>

<p>
If:
</p>

<pre>
x ≤ 20
</pre>

<p>
then:
</p>

<pre>
x = 20 ✓
x = 19 ✓
x = 21 ✗
</pre>

<p>
The phrase "cannot exceed" is therefore another way of saying
"less than or equal to."
</p>

<p>
<b>Key idea:</b> "Cannot exceed" translates to <b>≤</b>.
</p>
`,

  [
    {
      "q": "Translate 'x cannot exceed 30' into an inequality.",
      "hint": "Cannot exceed means the value cannot be greater than 30.",
      "steps": [
        "Step 1: Identify 'cannot exceed'.",
        "Step 2: Use ≤.",
        "Step 3: Write x ≤ 30."
      ],
      "ans": "x ≤ 30",
      "why": "'Cannot exceed' means less than or equal to."
    },

    {
      "q": "Translate 'the total of x and y cannot exceed 40'.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total: x + y.",
        "Step 2: Cannot exceed 40 means ≤ 40.",
        "Step 3: Write the complete inequality."
      ],
      "ans": "x + y ≤ 40",
      "why": "The total cannot be greater than 40."
    },

    {
      "q": "Is x = 25 allowed if x cannot exceed 25?",
      "hint": "Test x ≤ 25.",
      "steps": [
        "Step 1: Write x ≤ 25.",
        "Step 2: Substitute x = 25.",
        "Step 3: 25 ≤ 25 is true."
      ],
      "ans": "Yes.",
      "why": "The limiting value is included."
    },

    {
      "q": "A truck can carry a maximum of 500 kg. If x is the load, write the constraint.",
      "hint": "Maximum of 500 means the load cannot exceed 500.",
      "steps": [
        "Step 1: Identify the maximum load: 500 kg.",
        "Step 2: Maximum means the load cannot exceed 500.",
        "Step 3: Write x ≤ 500."
      ],
      "ans": "x ≤ 500",
      "why": "The load must be 500 kg or less."
    }
  ]
);
add(
  "math",
  "linear_programming",
  "Translating 'No More Than' into an Inequality",

  `<h2>Translating "No More Than" into an Inequality</h2>

<p>
The phrase <b>"no more than"</b> means that a quantity cannot be
greater than a stated value.
</p>

<p>
Therefore:
</p>

<pre>
no more than N  →  ≤ N
</pre>

<p>
The limiting value is included.
</p>

<h3>Example 1</h3>

<p>
x is no more than 15.
</p>

<pre>
x ≤ 15
</pre>

<h3>Example 2</h3>

<p>
A factory can produce no more than 200 items.
If x represents the number of items:
</p>

<pre>
x ≤ 200
</pre>

<h3>Example 3</h3>

<p>
The total number of products is no more than 50.
If x and y represent two types of products:
</p>

<pre>
x + y ≤ 50
</pre>

<h3>Check the Meaning</h3>

<pre>
x ≤ 20

x = 20 ✓
x = 18 ✓
x = 21 ✗
</pre>

<p>
<b>Key idea:</b> "No more than" means <b>less than or equal to
(≤)</b>.
</p>
`,

  [
    {
      "q": "Translate 'x is no more than 12' into an inequality.",
      "hint": "No more than means the value cannot be greater than 12.",
      "steps": [
        "Step 1: Identify 'no more than'.",
        "Step 2: Use ≤.",
        "Step 3: Write x ≤ 12."
      ],
      "ans": "x ≤ 12",
      "why": "'No more than' means less than or equal to."
    },

    {
      "q": "Translate 'y is no more than 30' into an inequality.",
      "hint": "The value cannot exceed 30.",
      "steps": [
        "Step 1: Identify the limiting value: 30.",
        "Step 2: 'No more than' means ≤.",
        "Step 3: Write the inequality."
      ],
      "ans": "y ≤ 30",
      "why": "The value can be 30 or any value below 30."
    },

    {
      "q": "The total of x and y is no more than 100. Write the constraint.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total as x + y.",
        "Step 2: 'No more than 100' means ≤ 100.",
        "Step 3: Combine them."
      ],
      "ans": "x + y ≤ 100",
      "why": "The total cannot be greater than 100."
    },

    {
      "q": "Is x = 25 allowed if x is no more than 25?",
      "hint": "Test x ≤ 25.",
      "steps": [
        "Step 1: Write x ≤ 25.",
        "Step 2: Substitute x = 25.",
        "Step 3: 25 ≤ 25 is true."
      ],
      "ans": "Yes.",
      "why": "'No more than' includes the limiting value."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Translating 'Not Less Than' into an Inequality",

  `<h2>Translating "Not Less Than" into an Inequality</h2>

<p>
The phrase <b>"not less than"</b> means that a quantity cannot be
smaller than a stated value.
</p>

<p>
Therefore:
</p>

<pre>
not less than N  →  ≥ N
</pre>

<h3>Example 1</h3>

<p>
x is not less than 8.
</p>

<pre>
x ≥ 8
</pre>

<h3>Example 2</h3>

<p>
A company must produce not less than 100 units.
If x represents the number of units:
</p>

<pre>
x ≥ 100
</pre>

<h3>Example 3</h3>

<p>
The total number of students is not less than 40.
If x and y represent two groups:
</p>

<pre>
x + y ≥ 40
</pre>

<h3>Check the Meaning</h3>

<pre>
x ≥ 10

x = 10 ✓
x = 12 ✓
x = 9 ✗
</pre>

<p>
<b>Key idea:</b> "Not less than" means <b>greater than or equal to
(≥)</b>.
</p>
`,

  [
    {
      "q": "Translate 'x is not less than 15' into an inequality.",
      "hint": "The value cannot be below 15.",
      "steps": [
        "Step 1: Identify 'not less than'.",
        "Step 2: Use ≥.",
        "Step 3: Write x ≥ 15."
      ],
      "ans": "x ≥ 15",
      "why": "'Not less than' means greater than or equal to."
    },

    {
      "q": "Translate 'y is not less than 6' into an inequality.",
      "hint": "Think of 6 or greater.",
      "steps": [
        "Step 1: 'Not less than 6' means 6 or greater.",
        "Step 2: Use ≥.",
        "Step 3: Write y ≥ 6."
      ],
      "ans": "y ≥ 6",
      "why": "The value cannot be below 6."
    },

    {
      "q": "The total of x and y is not less than 50. Write the constraint.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total: x + y.",
        "Step 2: 'Not less than 50' means ≥ 50.",
        "Step 3: Write the complete inequality."
      ],
      "ans": "x + y ≥ 50",
      "why": "The total must be 50 or greater."
    },

    {
      "q": "Is x = 9 allowed if x is not less than 10?",
      "hint": "Test x ≥ 10.",
      "steps": [
        "Step 1: Write x ≥ 10.",
        "Step 2: Substitute x = 9.",
        "Step 3: 9 ≥ 10 is false."
      ],
      "ans": "No.",
      "why": "9 is less than the required minimum of 10."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Translating 'Minimum of' into an Inequality",

  `<h2>Translating "Minimum of" into an Inequality</h2>

<p>
In a constraint, the phrase <b>"a minimum of N"</b> means that the
quantity must be at least N.
</p>

<p>
Therefore:
</p>

<pre>
minimum of N  →  ≥ N
</pre>

<h3>Example 1</h3>

<p>
A factory must produce a minimum of 20 units.
If x represents the number of units:
</p>

<pre>
x ≥ 20
</pre>

<h3>Example 2</h3>

<p>
A school requires a minimum of 50 students in two groups.
If x and y represent the numbers of students:
</p>

<pre>
x + y ≥ 50
</pre>

<h3>Example 3</h3>

<p>
A farmer must keep a minimum of 30 animals.
If x represents the number of animals:
</p>

<pre>
x ≥ 30
</pre>

<h3>Important</h3>

<p>
The minimum value itself is allowed.
</p>

<pre>
x ≥ 30

x = 30 ✓
x = 35 ✓
x = 29 ✗
</pre>

<p>
<b>Key idea:</b> A minimum requirement translates to
<b>greater than or equal to (≥)</b>.
</p>
`,

  [
    {
      "q": "Translate 'a minimum of 10 units' into an inequality if x represents the units.",
      "hint": "Minimum means at least.",
      "steps": [
        "Step 1: Identify the minimum value: 10.",
        "Step 2: Minimum means ≥.",
        "Step 3: Write x ≥ 10."
      ],
      "ans": "x ≥ 10",
      "why": "A minimum of 10 means 10 or more."
    },

    {
      "q": "A business must make a minimum of 100 products. If x is the number of products, write the constraint.",
      "hint": "The number must be 100 or greater.",
      "steps": [
        "Step 1: Identify the minimum: 100.",
        "Step 2: Use ≥.",
        "Step 3: Write x ≥ 100."
      ],
      "ans": "x ≥ 100",
      "why": "The number of products cannot be below 100."
    },

    {
      "q": "The total number of items must be a minimum of 40. If x and y are two types of items, write the constraint.",
      "hint": "The total is x + y.",
      "steps": [
        "Step 1: Write the total: x + y.",
        "Step 2: A minimum of 40 means ≥ 40.",
        "Step 3: Write x + y ≥ 40."
      ],
      "ans": "x + y ≥ 40",
      "why": "The total must be at least 40."
    },

    {
      "q": "Is x = 25 allowed if x must be a minimum of 25?",
      "hint": "Check whether 25 ≥ 25 is true.",
      "steps": [
        "Step 1: Write x ≥ 25.",
        "Step 2: Test x = 25.",
        "Step 3: 25 ≥ 25 is true."
      ],
      "ans": "Yes.",
      "why": "The minimum value itself is included."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Converting an Inequality to Its Boundary Equation",

  `<h2>Converting an Inequality to Its Boundary Equation</h2>

<p>
When graphing a linear inequality, the <b>boundary</b> is the line
that separates the allowed region from the rest of the plane.
</p>

<p>
To obtain the boundary equation, replace the inequality symbol with
an <b>equal sign</b>.
</p>

<pre>
≤  →  =
≥  →  =
<  →  =
>  →  =
</pre>

<h3>Example 1</h3>

<pre>
x + y ≤ 6
</pre>

<p>
Replace ≤ with =:
</p>

<pre>
x + y = 6
</pre>

<h3>Example 2</h3>

<pre>
2x + y ≥ 8
</pre>

<p>
Replace ≥ with =:
</p>

<pre>
2x + y = 8
</pre>

<h3>Example 3</h3>

<pre>
3x + 4y < 12
</pre>

<p>
Replace < with =:
</p>

<pre>
3x + 4y = 12
</pre>

<h3>Important</h3>

<p>
The boundary equation is used to draw the line.
The original inequality is still needed later to determine which side
of the line satisfies the condition.
</p>

<p>
<b>Key idea:</b> Replace the inequality sign with <b>=</b> to obtain
the boundary equation.
</p>
`,

  [
    {
      "q": "Find the boundary equation of x + y ≤ 10.",
      "hint": "Replace ≤ with =.",
      "steps": [
        "Step 1: Start with x + y ≤ 10.",
        "Step 2: Replace ≤ with =.",
        "Step 3: Write the boundary."
      ],
      "ans": "x + y = 10",
      "why": "The boundary is obtained by replacing the inequality with equality."
    },

    {
      "q": "Find the boundary equation of 2x + 3y ≥ 12.",
      "hint": "Replace ≥ with =.",
      "steps": [
        "Step 1: Start with 2x + 3y ≥ 12.",
        "Step 2: Replace ≥ with =.",
        "Step 3: Write 2x + 3y = 12."
      ],
      "ans": "2x + 3y = 12",
      "why": "The equality gives the boundary line."
    },

    {
      "q": "Find the boundary equation of 5x - y < 20.",
      "hint": "Only change the inequality symbol.",
      "steps": [
        "Step 1: Start with 5x - y < 20.",
        "Step 2: Replace < with =.",
        "Step 3: Write the boundary equation."
      ],
      "ans": "5x - y = 20",
      "why": "The boundary is found by replacing the inequality with equality."
    },

    {
      "q": "Why do we use an equality when finding the boundary of an inequality?",
      "hint": "Think about the line separating the regions.",
      "steps": [
        "Step 1: A boundary is a line.",
        "Step 2: A line can be represented by an equation.",
        "Step 3: Therefore replace the inequality with equality."
      ],
      "ans": "Because the equality gives the line forming the boundary.",
      "why": "The boundary consists of points where the two sides meet."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Finding the x-Intercept of a Boundary",

  `<h2>Finding the x-Intercept of a Boundary</h2>

<p>
The <b>x-intercept</b> is the point where a graph crosses the
x-axis.
</p>

<p>
Every point on the x-axis has:
</p>

<pre>
y = 0
</pre>

<p>
Therefore, to find the x-intercept of a boundary equation:
</p>

<pre>
1. Set y = 0.
2. Solve for x.
3. Write the coordinate (x,0).
</pre>

<h3>Example 1</h3>

<pre>
x + y = 6
</pre>

<p>
Set y = 0:
</p>

<pre>
x + 0 = 6
x = 6
</pre>

<p>
Therefore:
</p>

<pre>
x-intercept = (6,0)
</pre>

<h3>Example 2</h3>

<pre>
2x + y = 10
</pre>

<p>
Set y = 0:
</p>

<pre>
2x + 0 = 10
2x = 10
x = 5
</pre>

<pre>
x-intercept = (5,0)
</pre>

<h3>Example 3</h3>

<pre>
3x + 2y = 12
</pre>

<p>
Set y = 0:
</p>

<pre>
3x + 2(0) = 12
3x = 12
x = 4
</pre>

<pre>
x-intercept = (4,0)
</pre>

<p>
<b>Key idea:</b> To find the x-intercept, set <b>y = 0</b>.
</p>
`,

  [
    {
      "q": "Find the x-intercept of x + y = 8.",
      "hint": "Set y = 0.",
      "steps": [
        "Step 1: Set y = 0.",
        "Step 2: x + 0 = 8.",
        "Step 3: x = 8.",
        "Step 4: Write (8,0)."
      ],
      "ans": "(8,0)",
      "why": "The x-axis has y = 0."
    },

    {
      "q": "Find the x-intercept of 2x + y = 14.",
      "hint": "Set y = 0.",
      "steps": [
        "Step 1: Set y = 0.",
        "Step 2: 2x = 14.",
        "Step 3: x = 7.",
        "Step 4: Write (7,0)."
      ],
      "ans": "(7,0)",
      "why": "Setting y = 0 locates the point where the line crosses the x-axis."
    },

    {
      "q": "Find the x-intercept of 4x + 3y = 20.",
      "hint": "Set y = 0.",
      "steps": [
        "Step 1: Set y = 0.",
        "Step 2: 4x + 0 = 20.",
        "Step 3: 4x = 20.",
        "Step 4: x = 5.",
        "Step 5: Write (5,0)."
      ],
      "ans": "(5,0)",
      "why": "The x-intercept occurs where y equals zero."
    },

    {
      "q": "Why do we set y = 0 when finding the x-intercept?",
      "hint": "What is true about every point on the x-axis?",
      "steps": [
        "Step 1: The x-intercept lies on the x-axis.",
        "Step 2: Every point on the x-axis has y = 0.",
        "Step 3: Therefore set y = 0."
      ],
      "ans": "Because every point on the x-axis has y = 0.",
      "why": "Setting y to zero locates the point where the line meets the x-axis."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Finding the y-Intercept of a Boundary",

  `<h2>Finding the y-Intercept of a Boundary</h2>

<p>
The <b>y-intercept</b> is the point where a graph crosses the
y-axis.
</p>

<p>
Every point on the y-axis has:
</p>

<pre>
x = 0
</pre>

<p>
Therefore, to find the y-intercept:
</p>

<pre>
1. Set x = 0.
2. Solve for y.
3. Write the coordinate (0,y).
</pre>

<h3>Example 1</h3>

<pre>
x + y = 6
</pre>

<p>
Set x = 0:
</p>

<pre>
0 + y = 6
y = 6
</pre>

<pre>
y-intercept = (0,6)
</pre>

<h3>Example 2</h3>

<pre>
2x + y = 10
</pre>

<p>
Set x = 0:
</p>

<pre>
2(0) + y = 10
y = 10
</pre>

<pre>
y-intercept = (0,10)
</pre>

<h3>Example 3</h3>

<pre>
3x + 2y = 12
</pre>

<p>
Set x = 0:
</p>

<pre>
3(0) + 2y = 12
2y = 12
y = 6
</pre>

<pre>
y-intercept = (0,6)
</pre>

<p>
<b>Key idea:</b> To find the y-intercept, set <b>x = 0</b>.
</p>
`,

  [
    {
      "q": "Find the y-intercept of x + y = 8.",
      "hint": "Set x = 0.",
      "steps": [
        "Step 1: Set x = 0.",
        "Step 2: 0 + y = 8.",
        "Step 3: y = 8.",
        "Step 4: Write (0,8)."
      ],
      "ans": "(0,8)",
      "why": "The y-axis has x = 0."
    },

    {
      "q": "Find the y-intercept of 2x + y = 14.",
      "hint": "Set x = 0.",
      "steps": [
        "Step 1: Set x = 0.",
        "Step 2: 0 + y = 14.",
        "Step 3: y = 14.",
        "Step 4: Write (0,14)."
      ],
      "ans": "(0,14)",
      "why": "Setting x = 0 locates the point where the line crosses the y-axis."
    },

    {
      "q": "Find the y-intercept of 4x + 3y = 20.",
      "hint": "Set x = 0.",
      "steps": [
        "Step 1: Set x = 0.",
        "Step 2: 3y = 20.",
        "Step 3: y = 20/3.",
        "Step 4: Write the coordinate."
      ],
      "ans": "(0,20/3)",
      "why": "The y-intercept occurs where x equals zero."
    },

    {
      "q": "Why do we set x = 0 when finding the y-intercept?",
      "hint": "What is true about every point on the y-axis?",
      "steps": [
        "Step 1: The y-intercept lies on the y-axis.",
        "Step 2: Every point on the y-axis has x = 0.",
        "Step 3: Therefore set x = 0."
      ],
      "ans": "Because every point on the y-axis has x = 0.",
      "why": "Setting x to zero locates the point where the line meets the y-axis."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Finding Both Intercepts of a Boundary",

  `<h2>Finding Both Intercepts of a Boundary</h2>

<p>
A straight-line boundary can be plotted using its <b>x-intercept</b>
and <b>y-intercept</b>.
</p>

<p>
Remember:
</p>

<pre>
x-intercept → set y = 0

y-intercept → set x = 0
</pre>

<h3>Example 1</h3>

<pre>
x + y = 8
</pre>

<p>
Find the x-intercept:</p>

<pre>
y = 0

x = 8

(8,0)
</pre>

<p>
Find the y-intercept:</p>

<pre>
x = 0

y = 8

(0,8)
</pre>

<p>
The line therefore passes through:
</p>

<pre>
(8,0) and (0,8)
</pre>

<h3>Example 2</h3>

<pre>
2x + y = 12
</pre>

<p>
x-intercept:</p>

<pre>
y = 0

2x = 12
x = 6

(6,0)
</pre>

<p>
y-intercept:</p>

<pre>
x = 0

y = 12

(0,12)
</pre>

<h3>Example 3</h3>

<pre>
3x + 2y = 12
</pre>

<p>
x-intercept:</p>

<pre>
y = 0

3x = 12
x = 4

(4,0)
</pre>

<p>
y-intercept:</p>

<pre>
x = 0

2y = 12
y = 6

(0,6)
</pre>

<p>
The two intercepts give two points through which the boundary line
passes.
</p>

<p>
<b>Key idea:</b> Set one variable to zero at a time to find the two
intercepts.
</p>
`,

  [
    {
      "q": "Find both intercepts of x + y = 10.",
      "hint": "Set y = 0 for the x-intercept and x = 0 for the y-intercept.",
      "steps": [
        "Step 1: Set y = 0 → x = 10 → (10,0).",
        "Step 2: Set x = 0 → y = 10 → (0,10)."
      ],
      "ans": "x-intercept = (10,0); y-intercept = (0,10)",
      "why": "Each intercept is found by setting the other coordinate to zero."
    },

    {
      "q": "Find both intercepts of 2x + y = 8.",
      "hint": "Use y = 0 and x = 0.",
      "steps": [
        "Step 1: y = 0 → 2x = 8 → x = 4 → (4,0).",
        "Step 2: x = 0 → y = 8 → (0,8)."
      ],
      "ans": "x-intercept = (4,0); y-intercept = (0,8)",
      "why": "The two intercepts provide two points on the boundary."
    },

    {
      "q": "Find both intercepts of 3x + 2y = 12.",
      "hint": "Set each variable to zero separately.",
      "steps": [
        "Step 1: Set y = 0: 3x = 12, so x = 4.",
        "Step 2: x-intercept = (4,0).",
        "Step 3: Set x = 0: 2y = 12, so y = 6.",
        "Step 4: y-intercept = (0,6)."
      ],
      "ans": "x-intercept = (4,0); y-intercept = (0,6)",
      "why": "The intercept method gives the two points needed to plot the boundary."
    },

    {
      "q": "For 5x + y = 15, which value should be set to zero to find the x-intercept?",
      "hint": "Think about the x-axis.",
      "steps": [
        "Step 1: The x-intercept lies on the x-axis.",
        "Step 2: On the x-axis, y = 0."
      ],
      "ans": "Set y = 0.",
      "why": "Every point on the x-axis has y-coordinate zero."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Testing a Point in a Linear Inequality",

  `<h2>Testing a Point in a Linear Inequality</h2>

<p>
A point can be tested to determine whether it satisfies a linear
inequality.
</p>

<p>
The method is simple:
</p>

<pre>
1. Take the coordinates of the point.
2. Substitute them into the inequality.
3. Calculate both sides.
4. Decide whether the inequality is true or false.
</pre>

<h3>Example 1</h3>

<p>
Test (2,3) in:
</p>

<pre>
x + y ≤ 7
</pre>

<p>
Substitute x = 2 and y = 3:
</p>

<pre>
2 + 3 ≤ 7
5 ≤ 7
TRUE
</pre>

<p>
Therefore (2,3) satisfies the inequality.
</p>

<h3>Example 2</h3>

<p>
Test (5,4) in:
</p>

<pre>
x + y ≤ 7
</pre>

<pre>
5 + 4 ≤ 7
9 ≤ 7
FALSE
</pre>

<p>
Therefore (5,4) does not satisfy the inequality.
</p>

<h3>Example 3</h3>

<p>
Test (3,2) in:
</p>

<pre>
2x + y ≥ 8
</pre>

<pre>
2(3) + 2 ≥ 8
6 + 2 ≥ 8
8 ≥ 8
TRUE
</pre>

<p>
Therefore (3,2) satisfies the inequality.
</p>

<p>
<b>Key idea:</b> Substitute the coordinates into the original
inequality and check whether the statement is true.
</p>
`,

  [
    {
      "q": "Does (2,4) satisfy x + y ≤ 7?",
      "hint": "Substitute x = 2 and y = 4.",
      "steps": [
        "Step 1: 2 + 4 = 6.",
        "Step 2: Check 6 ≤ 7.",
        "Step 3: The statement is true."
      ],
      "ans": "Yes.",
      "why": "The point satisfies the inequality."
    },

    {
      "q": "Does (4,5) satisfy x + y ≤ 7?",
      "hint": "Calculate 4 + 5.",
      "steps": [
        "Step 1: 4 + 5 = 9.",
        "Step 2: Check 9 ≤ 7.",
        "Step 3: The statement is false."
      ],
      "ans": "No.",
      "why": "The point does not satisfy the inequality."
    },

    {
      "q": "Does (2,3) satisfy 2x + y ≥ 7?",
      "hint": "Substitute x = 2 and y = 3.",
      "steps": [
        "Step 1: 2(2) + 3 = 4 + 3.",
        "Step 2: 4 + 3 = 7.",
        "Step 3: Check 7 ≥ 7.",
        "Step 4: The statement is true."
      ],
      "ans": "Yes.",
      "why": "The point satisfies the inequality, including its boundary."
    },

    {
      "q": "Does (1,2) satisfy 3x + y > 6?",
      "hint": "Substitute the coordinates.",
      "steps": [
        "Step 1: 3(1) + 2 = 5.",
        "Step 2: Check 5 > 6.",
        "Step 3: The statement is false."
      ],
      "ans": "No.",
      "why": "The point gives 5, which is not greater than 6."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Solid and Dashed Boundary Lines",

  `<h2>Solid and Dashed Boundary Lines</h2>

<p>
When graphing an inequality, the boundary line may be included or
excluded.
</p>

<p>
The type of boundary tells us whether points on the boundary are
allowed.
</p>

<h3>Solid Boundary</h3>

<p>
Use a <b>solid line</b> when the inequality includes equality:
</p>

<pre>
≤
≥
</pre>

<p>
For example:
</p>

<pre>
x + y ≤ 6
</pre>

<p>
The boundary is:
</p>

<pre>
x + y = 6
</pre>

<p>
Because equality is included, the boundary is solid.
</p>

<h3>Dashed Boundary</h3>

<p>
Use a <b>dashed line</b> when the inequality does not include
equality:
</p>

<pre>
<
>
</pre>

<p>
For example:
</p>

<pre>
x + y < 6
</pre>

<p>
The boundary is:
</p>

<pre>
x + y = 6
</pre>

<p>
But points exactly on the line are not included, so the boundary is
dashed.
</p>

<h3>Example 1</h3>

<pre>
2x + y ≥ 8

→ solid boundary
</pre>

<h3>Example 2</h3>

<pre>
2x + y ≤ 8

→ solid boundary
</pre>

<h3>Example 3</h3>

<pre>
2x + y > 8

→ dashed boundary
</pre>

<p>
<b>Key idea:</b>
</p>

<pre>
≤ or ≥ → solid

< or > → dashed
</pre>
`,

  [
    {
      "q": "Should x + y ≤ 5 have a solid or dashed boundary?",
      "hint": "Does ≤ include equality?",
      "steps": [
        "Step 1: Identify the symbol ≤.",
        "Step 2: ≤ includes equality.",
        "Step 3: Use a solid boundary."
      ],
      "ans": "Solid.",
      "why": "The boundary is included when the inequality contains equality."
    },

    {
      "q": "Should 2x + y > 7 have a solid or dashed boundary?",
      "hint": "Does > include equality?",
      "steps": [
        "Step 1: Identify >.",
        "Step 2: > does not include equality.",
        "Step 3: Use a dashed boundary."
      ],
      "ans": "Dashed.",
      "why": "Points exactly on the boundary are excluded."
    },

    {
      "q": "Should 3x - y ≥ 4 have a solid or dashed boundary?",
      "hint": "Look at ≥.",
      "steps": [
        "Step 1: Identify ≥.",
        "Step 2: ≥ includes equality.",
        "Step 3: Use a solid line."
      ],
      "ans": "Solid.",
      "why": "The boundary is included."
    },

    {
      "q": "Why is the boundary dashed for x + y < 10?",
      "hint": "Check whether equality is allowed.",
      "steps": [
        "Step 1: The boundary is x + y = 10.",
        "Step 2: The original inequality is x + y < 10.",
        "Step 3: Equality is not included.",
        "Step 4: Therefore the boundary is dashed."
      ],
      "ans": "Because points on x + y = 10 are not included.",
      "why": "A strict inequality excludes its boundary."
    }
  ]
);
// ============================================================
// LINEAR PROGRAMMING — BATCH 3
// ONE SCREEN = ONE CONCEPT
// ============================================================


add(
  "math",
  "linear_programming",
  "Intersection of Two Boundary Lines",

  `<h2>Intersection of Two Boundary Lines</h2>

<p><b>One concept:</b> The intersection of two boundary lines is the point where the two lines meet.</p>

<p>In linear programming, this point is important because it can form a <b>corner point (vertex)</b> of the feasible region.</p>

<h3>Example 1</h3>

<p>Consider:</p>

<pre>
x + y = 6
x - y = 2
</pre>

<p>The two equations describe two lines.</p>

<p>At their intersection, the same values of <b>x</b> and <b>y</b> satisfy both equations.</p>

<p>Add the equations:</p>

<pre>
x + y = 6
x - y = 2
---------
2x = 8

x = 4
</pre>

<p>Substitute x = 4:</p>

<pre>
4 + y = 6
y = 2
</pre>

<p>Therefore, the lines intersect at:</p>

<p><b>(4, 2)</b></p>

<h3>Example 2</h3>

<pre>
x + y = 10
x - y = 4
</pre>

<p>Add:</p>

<pre>
2x = 14
x = 7
</pre>

<p>Then:</p>

<pre>
7 + y = 10
y = 3
</pre>

<p>Intersection = <b>(7, 3)</b>.</p>

<h3>Example 3</h3>

<pre>
2x + y = 9
x + y = 6
</pre>

<p>Subtract the second equation from the first:</p>

<pre>
(2x + y) - (x + y) = 9 - 6

x = 3
</pre>

<p>Substitute:</p>

<pre>
3 + y = 6
y = 3
</pre>

<p>Intersection = <b>(3, 3)</b>.</p>`,

  [
    {
      q: "Find the intersection of x + y = 8 and x - y = 2.",
      hint: "Add the two equations to eliminate y.",
      steps: [
        "x + y = 8",
        "x - y = 2",
        "Adding gives 2x = 10.",
        "Therefore x = 5.",
        "Substitute into x + y = 8: 5 + y = 8.",
        "Therefore y = 3."
      ],
      ans: "(5, 3)",
      why: "The intersection must satisfy both equations."
    },
    {
      q: "Find the intersection of 2x + y = 11 and x + y = 7.",
      hint: "Subtract the second equation from the first.",
      steps: [
        "2x + y = 11",
        "x + y = 7",
        "Subtracting gives x = 4.",
        "Substitute: 4 + y = 7.",
        "Therefore y = 3."
      ],
      ans: "(4, 3)",
      why: "Both boundary equations are satisfied by x = 4 and y = 3."
    },
    {
      q: "Find the intersection of x + y = 12 and x - y = 4.",
      hint: "Add the equations.",
      steps: [
        "2x = 16",
        "x = 8",
        "8 + y = 12",
        "y = 4"
      ],
      ans: "(8, 4)",
      why: "The point (8, 4) lies on both boundary lines."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Substitution Method for Finding an Intersection",

  `<h2>Substitution Method</h2>

<p><b>One concept:</b> Substitution finds the intersection of two equations by expressing one variable in terms of the other and replacing it in the second equation.</p>

<h3>Example 1</h3>

<pre>
y = x + 1
2x + y = 7
</pre>

<p>Since y = x + 1, replace y in the second equation:</p>

<pre>
2x + (x + 1) = 7

3x + 1 = 7

3x = 6

x = 2
</pre>

<p>Now substitute x = 2:</p>

<pre>
y = 2 + 1
y = 3
</pre>

<p>Intersection = <b>(2, 3)</b>.</p>

<h3>Example 2</h3>

<pre>
y = 2x
x + y = 9
</pre>

<p>Replace y with 2x:</p>

<pre>
x + 2x = 9

3x = 9

x = 3
</pre>

<p>Therefore:</p>

<pre>
y = 2(3)
y = 6
</pre>

<p>Intersection = <b>(3, 6)</b>.</p>

<h3>Example 3</h3>

<pre>
x = y + 2
x + 2y = 8
</pre>

<p>Replace x with y + 2:</p>

<pre>
(y + 2) + 2y = 8

3y + 2 = 8

3y = 6

y = 2
</pre>

<p>Therefore:</p>

<pre>
x = 2 + 2
x = 4
</pre>

<p>Intersection = <b>(4, 2)</b>.</p>`,

  [
    {
      q: "Use substitution to solve y = x + 2 and x + y = 8.",
      hint: "Replace y in the second equation with x + 2.",
      steps: [
        "x + (x + 2) = 8",
        "2x + 2 = 8",
        "2x = 6",
        "x = 3",
        "y = 3 + 2 = 5"
      ],
      ans: "(3, 5)",
      why: "Substitution produces values satisfying both equations."
    },
    {
      q: "Use substitution to solve y = 3x and x + y = 12.",
      hint: "Replace y with 3x.",
      steps: [
        "x + 3x = 12",
        "4x = 12",
        "x = 3",
        "y = 3(3) = 9"
      ],
      ans: "(3, 9)",
      why: "The point satisfies both original equations."
    },
    {
      q: "Use substitution to solve x = y + 1 and x + y = 9.",
      hint: "Replace x with y + 1.",
      steps: [
        "(y + 1) + y = 9",
        "2y + 1 = 9",
        "2y = 8",
        "y = 4",
        "x = 4 + 1 = 5"
      ],
      ans: "(5, 4)",
      why: "Substitution gives the unique pair satisfying both equations."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Elimination Method for Finding an Intersection",

  `<h2>Elimination Method</h2>

<p><b>One concept:</b> Elimination finds the intersection by adding or subtracting equations so that one variable disappears.</p>

<h3>Example 1</h3>

<pre>
x + y = 9
x - y = 3
</pre>

<p>Add the equations:</p>

<pre>
2x = 12

x = 6
</pre>

<p>Substitute into the first equation:</p>

<pre>
6 + y = 9

y = 3
</pre>

<p>Intersection = <b>(6, 3)</b>.</p>

<h3>Example 2</h3>

<pre>
2x + y = 10
2x - y = 4
</pre>

<p>Add:</p>

<pre>
4x = 14

x = 3.5
</pre>

<p>Then:</p>

<pre>
2(3.5) + y = 10
7 + y = 10
y = 3
</pre>

<p>Intersection = <b>(3.5, 3)</b>.</p>

<h3>Example 3</h3>

<pre>
3x + 2y = 16
3x - 2y = 8
</pre>

<p>Add:</p>

<pre>
6x = 24

x = 4
</pre>

<p>Then:</p>

<pre>
3(4) + 2y = 16

12 + 2y = 16

2y = 4

y = 2
</pre>

<p>Intersection = <b>(4, 2)</b>.</p>`,

  [
    {
      q: "Use elimination to solve x + y = 11 and x - y = 5.",
      hint: "Add the equations.",
      steps: [
        "2x = 16",
        "x = 8",
        "8 + y = 11",
        "y = 3"
      ],
      ans: "(8, 3)",
      why: "Adding eliminates y."
    },
    {
      q: "Use elimination to solve 2x + y = 13 and 2x - y = 5.",
      hint: "Add the equations.",
      steps: [
        "4x = 18",
        "x = 4.5",
        "2(4.5) + y = 13",
        "9 + y = 13",
        "y = 4"
      ],
      ans: "(4.5, 4)",
      why: "The y terms cancel when the equations are added."
    },
    {
      q: "Use elimination to solve 4x + 3y = 18 and 4x - 3y = 6.",
      hint: "Add the equations.",
      steps: [
        "8x = 24",
        "x = 3",
        "12 + 3y = 18",
        "3y = 6",
        "y = 2"
      ],
      ans: "(3, 2)",
      why: "Adding eliminates y and leaves one equation in x."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "A Vertex Is an Intersection Point",

  `<h2>A Vertex Is an Intersection Point</h2>

<p><b>One concept:</b> A vertex of a feasible region can occur where two boundary lines meet.</p>

<p>A vertex is therefore found by locating the intersection of the relevant boundary lines.</p>

<h3>Example 1</h3>

<p>Suppose two boundaries are:</p>

<pre>
x + y = 8
x = 2
</pre>

<p>Substitute x = 2:</p>

<pre>
2 + y = 8
y = 6
</pre>

<p>So the vertex formed by these two boundaries is:</p>

<p><b>(2, 6)</b></p>

<h3>Example 2</h3>

<pre>
2x + y = 10
x + y = 7
</pre>

<p>Subtract:</p>

<pre>
x = 3
</pre>

<p>Then:</p>

<pre>
3 + y = 7
y = 4
</pre>

<p>The intersection vertex is <b>(3, 4)</b>.</p>

<h3>Example 3</h3>

<pre>
x + 2y = 12
x = 4
</pre>

<p>Substitute:</p>

<pre>
4 + 2y = 12
2y = 8
y = 4
</pre>

<p>The vertex is <b>(4, 4)</b>.</p>`,

  [
    {
      q: "The boundaries x + y = 9 and x = 3 meet at which point?",
      hint: "Put x = 3 into x + y = 9.",
      steps: [
        "3 + y = 9",
        "y = 6"
      ],
      ans: "(3, 6)",
      why: "The point satisfies both boundary equations."
    },
    {
      q: "The boundaries 2x + y = 12 and x + y = 8 meet at which point?",
      hint: "Subtract the second equation from the first.",
      steps: [
        "2x + y - x - y = 12 - 8",
        "x = 4",
        "4 + y = 8",
        "y = 4"
      ],
      ans: "(4, 4)",
      why: "Their common point is the vertex formed by the two boundaries."
    },
    {
      q: "The boundaries x + 2y = 14 and x = 6 meet at which point?",
      hint: "Substitute x = 6.",
      steps: [
        "6 + 2y = 14",
        "2y = 8",
        "y = 4"
      ],
      ans: "(6, 4)",
      why: "The point lies on both boundaries."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Checking Whether an Intersection Is Feasible",

  `<h2>Checking Whether an Intersection Is Feasible</h2>

<p><b>One concept:</b> An intersection point is feasible only if it satisfies <b>all</b> the constraints.</p>

<p>Finding the intersection is not enough. We must substitute the point into each inequality.</p>

<h3>Example 1</h3>

<p>Consider:</p>

<pre>
x + y ≤ 8
x ≥ 2
y ≥ 1
</pre>

<p>Suppose the candidate point is <b>(3, 4)</b>.</p>

<p>Check each constraint:</p>

<pre>
3 + 4 ≤ 8
7 ≤ 8 ✓

3 ≥ 2 ✓

4 ≥ 1 ✓
</pre>

<p>All constraints are satisfied.</p>

<p>Therefore <b>(3, 4) is feasible</b>.</p>

<h3>Example 2</h3>

<p>Consider:</p>

<pre>
x + y ≤ 10
x ≥ 4
y ≥ 2
</pre>

<p>Test <b>(3, 5)</b>:</p>

<pre>
3 + 5 ≤ 10 ✓

3 ≥ 4 ✗
</pre>

<p>One constraint fails.</p>

<p>Therefore <b>(3, 5) is not feasible</b>.</p>

<h3>Example 3</h3>

<p>Consider:</p>

<pre>
2x + y ≤ 12
x ≥ 1
y ≥ 3
</pre>

<p>Test <b>(4, 4)</b>:</p>

<pre>
2(4) + 4 ≤ 12
12 ≤ 12 ✓

4 ≥ 1 ✓

4 ≥ 3 ✓
</pre>

<p>The point is feasible.</p>`,

  [
    {
      q: "Is (3,4) feasible for x + y ≤ 9, x ≥ 2, y ≥ 1?",
      hint: "Check all three constraints.",
      steps: [
        "3 + 4 = 7, and 7 ≤ 9.",
        "3 ≥ 2.",
        "4 ≥ 1.",
        "All constraints are satisfied."
      ],
      ans: "Yes",
      why: "A feasible point must satisfy every constraint."
    },
    {
      q: "Is (2,6) feasible for x + y ≤ 7, x ≥ 1, y ≥ 2?",
      hint: "Start with x + y ≤ 7.",
      steps: [
        "2 + 6 = 8.",
        "8 ≤ 7 is false.",
        "Therefore the point fails a constraint."
      ],
      ans: "No",
      why: "Failing even one constraint makes a point infeasible."
    },
    {
      q: "Is (5,3) feasible for 2x + y ≤ 13, x ≥ 2, y ≥ 1?",
      hint: "Evaluate 2x + y first.",
      steps: [
        "2(5) + 3 = 13.",
        "13 ≤ 13 ✓.",
        "5 ≥ 2 ✓.",
        "3 ≥ 1 ✓."
      ],
      ans: "Yes",
      why: "The point satisfies every constraint."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Objective Function Value at a Point",

  `<h2>Objective Function Value at a Point</h2>

<p><b>One concept:</b> To find the value of an objective function at a point, substitute the point's x- and y-values into the objective function.</p>

<h3>Example 1</h3>

<p>Let:</p>

<pre>
P = 3x + 2y
</pre>

<p>Find P at (4, 5).</p>

<pre>
P = 3(4) + 2(5)

P = 12 + 10

P = 22
</pre>

<p>Therefore, the objective value is <b>22</b>.</p>

<h3>Example 2</h3>

<pre>
C = 5x + 4y
</pre>

<p>At (2, 6):</p>

<pre>
C = 5(2) + 4(6)

C = 10 + 24

C = 34
</pre>

<h3>Example 3</h3>

<pre>
P = 7x + 3y
</pre>

<p>At (5, 2):</p>

<pre>
P = 7(5) + 3(2)

P = 35 + 6

P = 41
</pre>`,

  [
    {
      q: "Find P = 4x + 3y at (2,5).",
      hint: "Replace x with 2 and y with 5.",
      steps: [
        "P = 4(2) + 3(5)",
        "P = 8 + 15",
        "P = 23"
      ],
      ans: "23",
      why: "The objective value is obtained by direct substitution."
    },
    {
      q: "Find C = 6x + 2y at (3,4).",
      hint: "Substitute x = 3 and y = 4.",
      steps: [
        "C = 6(3) + 2(4)",
        "C = 18 + 8",
        "C = 26"
      ],
      ans: "26",
      why: "The coordinates determine the value of the objective function."
    },
    {
      q: "Find P = 5x + 7y at (4,3).",
      hint: "Calculate 5(4) + 7(3).",
      steps: [
        "P = 5(4) + 7(3)",
        "P = 20 + 21",
        "P = 41"
      ],
      ans: "41",
      why: "Substituting the coordinates gives the objective value."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Comparing Objective Values",

  `<h2>Comparing Objective Values</h2>

<p><b>One concept:</b> To compare two candidate points, calculate the objective function at each point and compare the resulting numbers.</p>

<h3>Example 1</h3>

<p>Let:</p>

<pre>
P = 4x + 3y
</pre>

<p>Compare A(2, 4) and B(5, 1).</p>

<p>At A:</p>

<pre>
P = 4(2) + 3(4)
P = 8 + 12
P = 20
</pre>

<p>At B:</p>

<pre>
P = 4(5) + 3(1)
P = 20 + 3
P = 23
</pre>

<p>The objective value at B is greater.</p>

<h3>Example 2</h3>

<pre>
C = 2x + 5y
</pre>

<p>At A(3,2):</p>

<pre>
C = 2(3) + 5(2)
C = 16
</pre>

<p>At B(1,5):</p>

<pre>
C = 2(1) + 5(5)
C = 27
</pre>

<p>The values are 16 and 27.</p>

<h3>Example 3</h3>

<pre>
P = 6x + y
</pre>

<p>At A(2,3):</p>

<pre>
P = 12 + 3 = 15
</pre>

<p>At B(1,8):</p>

<pre>
P = 6 + 8 = 14
</pre>

<p>The values are 15 and 14.</p>`,

  [
    {
      q: "For P = 3x + 4y, which point has the greater objective value: A(2,3) or B(4,1)?",
      hint: "Calculate P at both points.",
      steps: [
        "At A: P = 3(2) + 4(3) = 6 + 12 = 18.",
        "At B: P = 3(4) + 4(1) = 12 + 4 = 16.",
        "18 is greater than 16."
      ],
      ans: "A(2,3)",
      why: "A gives the larger objective value."
    },
    {
      q: "For P = 5x + 2y, compare A(2,5) and B(3,2).",
      hint: "Find both objective values.",
      steps: [
        "A: P = 5(2) + 2(5) = 20.",
        "B: P = 5(3) + 2(2) = 19.",
        "20 is greater than 19."
      ],
      ans: "A(2,5)",
      why: "The objective value at A is larger."
    },
    {
      q: "For C = 2x + 3y, compare A(4,1) and B(1,4).",
      hint: "Substitute both coordinate pairs.",
      steps: [
        "A: C = 2(4) + 3(1) = 11.",
        "B: C = 2(1) + 3(4) = 14.",
        "14 is greater than 11."
      ],
      ans: "B(1,4)",
      why: "B produces the larger objective value."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Maximum Objective Value",

  `<h2>Maximum Objective Value</h2>

<p><b>One concept:</b> A maximum occurs when the objective function has its greatest value among the feasible candidate points being considered.</p>

<h3>Example 1</h3>

<p>Suppose the feasible vertices are:</p>

<pre>
A(0,0)
B(4,0)
C(4,3)
D(0,5)
</pre>

<p>Let:</p>

<pre>
P = 3x + 2y
</pre>

<p>Calculate:</p>

<pre>
A: P = 0

B: P = 3(4) + 2(0) = 12

C: P = 3(4) + 2(3) = 18

D: P = 3(0) + 2(5) = 10
</pre>

<p>The greatest value is <b>18</b>.</p>

<h3>Example 2</h3>

<pre>
P = 5x + y
</pre>

<p>For points A(0,0), B(2,4), C(5,1):</p>

<pre>
A: 0
B: 5(2) + 4 = 14
C: 5(5) + 1 = 26
</pre>

<p>The greatest value is <b>26</b>.</p>

<h3>Example 3</h3>

<pre>
P = 2x + 6y
</pre>

<p>For A(1,1), B(5,1), C(2,4):</p>

<pre>
A: 2 + 6 = 8
B: 10 + 6 = 16
C: 4 + 24 = 28
</pre>

<p>The greatest value is <b>28</b>.</p>`,

  [
    {
      q: "For P = 2x + 3y, which point gives the greatest value: A(1,2), B(4,1), C(2,4)?",
      hint: "Calculate P at all three points.",
      steps: [
        "A: 2(1) + 3(2) = 8.",
        "B: 2(4) + 3(1) = 11.",
        "C: 2(2) + 3(4) = 16.",
        "The greatest value is 16."
      ],
      ans: "C(2,4), with maximum value 16",
      why: "The maximum is the greatest objective value among the candidates."
    },
    {
      q: "For P = 4x + y, compare A(3,2), B(1,8), and C(5,1).",
      hint: "Evaluate P at each point.",
      steps: [
        "A: 4(3) + 2 = 14.",
        "B: 4(1) + 8 = 12.",
        "C: 4(5) + 1 = 21.",
        "21 is greatest."
      ],
      ans: "C(5,1), with maximum value 21",
      why: "C gives the largest objective value."
    },
    {
      q: "For P = 3x + 5y, find the maximum among A(2,1), B(1,5), and C(4,2).",
      hint: "Evaluate all three.",
      steps: [
        "A: 3(2) + 5(1) = 11.",
        "B: 3(1) + 5(5) = 28.",
        "C: 3(4) + 5(2) = 22.",
        "28 is greatest."
      ],
      ans: "B(1,5), with maximum value 28",
      why: "The maximum is the greatest of the three objective values."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Minimum Objective Value",

  `<h2>Minimum Objective Value</h2>

<p><b>One concept:</b> A minimum occurs when the objective function has its smallest value among the feasible candidate points being considered.</p>

<h3>Example 1</h3>

<p>Let:</p>

<pre>
C = 4x + 3y
</pre>

<p>Consider:</p>

<pre>
A(1,4)
B(3,2)
C(5,1)
</pre>

<p>Evaluate:</p>

<pre>
A: 4(1) + 3(4) = 16

B: 4(3) + 3(2) = 18

C: 4(5) + 3(1) = 23
</pre>

<p>The smallest value is <b>16</b>.</p>

<h3>Example 2</h3>

<pre>
C = 2x + 5y
</pre>

<pre>
A(2,2): 2(2) + 5(2) = 14

B(4,1): 2(4) + 5(1) = 13

C(1,4): 2(1) + 5(4) = 22
</pre>

<p>The minimum value is <b>13</b>.</p>

<h3>Example 3</h3>

<pre>
C = 6x + 2y
</pre>

<pre>
A(1,3): 6 + 6 = 12

B(2,2): 12 + 4 = 16

C(4,1): 24 + 2 = 26
</pre>

<p>The minimum value is <b>12</b>.</p>`,

  [
    {
      q: "For C = 3x + 2y, which point gives the smallest value: A(1,4), B(3,2), C(2,5)?",
      hint: "Calculate C at all three points.",
      steps: [
        "A: 3(1) + 2(4) = 11.",
        "B: 3(3) + 2(2) = 13.",
        "C: 3(2) + 2(5) = 16.",
        "11 is smallest."
      ],
      ans: "A(1,4), with minimum value 11",
      why: "The minimum is the smallest objective value."
    },
    {
      q: "For C = 5x + 2y, find the minimum among A(2,3), B(1,4), and C(3,1).",
      hint: "Evaluate C at each point.",
      steps: [
        "A: 5(2) + 2(3) = 16.",
        "B: 5(1) + 2(4) = 13.",
        "C: 5(3) + 2(1) = 17.",
        "13 is smallest."
      ],
      ans: "B(1,4), with minimum value 13",
      why: "B gives the smallest objective value."
    },
    {
      q: "For C = 4x + 3y, compare A(1,5), B(2,2), and C(4,1).",
      hint: "Calculate all three values.",
      steps: [
        "A: 4 + 15 = 19.",
        "B: 8 + 6 = 14.",
        "C: 16 + 3 = 19.",
        "14 is smallest."
      ],
      ans: "B(2,2), with minimum value 14",
      why: "The smallest objective value occurs at B."
    }
  ]
);


add(
  "math",
  "linear_programming",
  "Optimal Solution Coordinates",

  `<h2>Optimal Solution Coordinates</h2>

<p><b>One concept:</b> The optimal solution includes both the coordinates of the point and the corresponding optimum value of the objective function.</p>

<h3>Example 1</h3>

<p>Suppose:</p>

<pre>
P = 4x + 3y
</pre>

<p>After evaluating the candidate points, suppose the largest value occurs at:</p>

<pre>
(5, 2)
</pre>

<p>Calculate:</p>

<pre>
P = 4(5) + 3(2)
P = 20 + 6
P = 26
</pre>

<p>The optimal solution is:</p>

<p><b>x = 5, y = 2, maximum P = 26.</b></p>

<h3>Example 2</h3>

<pre>
C = 3x + 5y
</pre>

<p>Suppose the smallest value occurs at:</p>

<pre>
(2, 4)
</pre>

<p>Then:</p>

<pre>
C = 3(2) + 5(4)
C = 6 + 20
C = 26
</pre>

<p>The minimum cost is <b>26</b>, occurring at <b>(2,4)</b>.</p>

<h3>What to report</h3>

<p>A complete answer should identify:</p>

<ol>
<li>The values of x and y.</li>
<li>Whether the objective is a maximum or minimum.</li>
<li>The corresponding objective value.</li>
</ol>`,

  [
    {
      q: "If P = 5x + 2y is maximized at (4,3), what is the optimal solution?",
      hint: "Calculate P at (4,3).",
      steps: [
        "P = 5(4) + 2(3)",
        "P = 20 + 6",
        "P = 26"
      ],
      ans: "x = 4, y = 3, maximum P = 26",
      why: "An optimal solution states both the coordinates and the optimum objective value."
    },
    {
      q: "If C = 4x + 3y is minimized at (2,5), find the minimum cost.",
      hint: "Substitute x = 2 and y = 5.",
      steps: [
        "C = 4(2) + 3(5)",
        "C = 8 + 15",
        "C = 23"
      ],
      ans: "x = 2, y = 5, minimum C = 23",
      why: "The coordinates identify where the optimum occurs, while substitution gives its value."
    },
    {
      q: "A maximum profit occurs at (6,2) for P = 3x + 4y. Find the maximum profit value.",
      hint: "Evaluate 3x + 4y at (6,2).",
      steps: [
        "P = 3(6) + 4(2)",
        "P = 18 + 8",
        "P = 26"
      ],
      ans: "x = 6, y = 2, maximum P = 26",
      why: "The optimal solution reports both the production coordinates and the maximum objective value."
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
  "Sample Space",

  `
<h2>Sample Space</h2>

<p><b>One concept:</b> Identify and write every possible outcome of a probability experiment.</p>

<h3>What is a sample space?</h3>

<p>
A <b>sample space</b> is the complete list of all possible outcomes of an experiment.
</p>

<p>
We usually represent the sample space using the symbol:
</p>

<p>
\\[
\\boxed{S}
\\]
</p>

<h3>Example 1: Tossing a Coin</h3>

<p>A coin is tossed once.</p>

<p>The only possible outcomes are:</p>

<p>
\\[
H,T
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{S=\\{H,T\\}}
\\]
</p>

<p>There are no other possible outcomes for one toss.</p>

<h3>Example 2: Rolling a Die</h3>

<p>A standard six-sided die is rolled once.</p>

<p>The possible outcomes are:</p>

<p>
\\[
1,2,3,4,5,6
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{S=\\{1,2,3,4,5,6\\}}
\\]
</p>

<h3>Example 3: Tossing a Coin Twice</h3>

<p>A coin is tossed twice.</p>

<p>We must consider what happens on the <b>first toss</b> and the <b>second toss</b>.</p>

<p>Start with H on the first toss:</p>

<p>
\\[
HH,HT
\\]
</p>

<p>Start with T on the first toss:</p>

<p>
\\[
TH,TT
\\]
</p>

<p>Therefore the complete sample space is:</p>

<p>
\\[
\\boxed{S=\\{HH,HT,TH,TT\\}}
\\]
</p>

<h3>Example 4: Choosing a Letter</h3>

<p>A card contains the letters:</p>

<p>
\\[
A,B,C,D
\\]
</p>

<p>One letter is selected.</p>

<p>The possible outcomes are:</p>

<p>
\\[
\\boxed{S=\\{A,B,C,D\\}}
\\]
</p>

<h3>Example 5: Choosing a Number</h3>

<p>A number is randomly selected from 1 to 5.</p>

<p>The possible outcomes are:</p>

<p>
\\[
\\boxed{S=\\{1,2,3,4,5\\}}
\\]
</p>

<h3>The Important Skill</h3>

<p>
Before calculating any probability, first ask:
</p>

<p>
<b>"What are all the possible outcomes?"</b>
</p>

<p>
Writing the complete list of possible outcomes gives the <b>sample space</b>.
</p>

<p>
Do not leave out an outcome and do not add an outcome that cannot happen.
</p>
`,

  [
    {
      q: "A coin is tossed once. Write the sample space.",
      hint: "List every possible result of one coin toss.",
      steps: [
        "A coin can land on Head or Tail.",
        "Therefore the complete set of outcomes is {H,T}."
      ],
      ans: "S = {H,T}",
      why: "A sample space contains every possible outcome of the experiment."
    },

    {
      q: "A standard die is rolled once. Write the sample space.",
      hint: "A standard die has six faces.",
      steps: [
        "The possible numbers are 1, 2, 3, 4, 5 and 6.",
        "Therefore S = {1,2,3,4,5,6}."
      ],
      ans: "S = {1,2,3,4,5,6}",
      why: "These are all the outcomes that can occur when the die is rolled once."
    },

    {
      q: "A coin is tossed twice. Write the complete sample space.",
      hint: "Consider both the first and second toss.",
      steps: [
        "If the first toss is H, the outcomes are HH and HT.",
        "If the first toss is T, the outcomes are TH and TT.",
        "Therefore S = {HH,HT,TH,TT}."
      ],
      ans: "S = {HH,HT,TH,TT}",
      why: "Each outcome records the result of both tosses."
    },

    {
      q: "A card is chosen from cards numbered 2, 4, 6 and 8. Write the sample space.",
      hint: "List every number that can actually be selected.",
      steps: [
        "The cards available are 2, 4, 6 and 8.",
        "Therefore S = {2,4,6,8}."
      ],
      ans: "S = {2,4,6,8}",
      why: "The sample space contains exactly the outcomes available in the experiment."
    },

    {
      q: "A student randomly chooses one of three colours: red, blue or green. Write the sample space.",
      hint: "List all three possible choices.",
      steps: [
        "The possible choices are red, blue and green.",
        "Therefore S = {red, blue, green}."
      ],
      ans: "S = {red, blue, green}",
      why: "Every possible choice must appear in the sample space."
    }
  ]
);
// ============================================================
// SCREEN 2 — COUNTING OUTCOMES IN A SAMPLE SPACE
// ============================================================

add(
  "math",
  "probability",
  "Counting the Number of Outcomes in a Sample Space",

  `
<h2>Counting the Number of Outcomes in a Sample Space</h2>

<p><b>One concept:</b> Count how many outcomes are contained in a sample space.</p>

<p>
If a sample space is:
</p>

<p>
\\[
S=\\{H,T\\}
\\]
</p>

<p>there are two outcomes.</p>

<p>We can write:</p>

<p>
\\[
\\boxed{n(S)=2}
\\]
</p>

<p>
The symbol <b>n(S)</b> means "the number of outcomes in the sample space".
</p>

<h3>Example 1</h3>

<p>For:</p>

<p>
\\[
S=\\{H,T\\}
\\]
</p>

<p>Count the outcomes:</p>

<p>
\\[
H,T
\\]
</p>

<p>There are 2.</p>

<p>
\\[
\\boxed{n(S)=2}
\\]
</p>

<h3>Example 2</h3>

<p>A die has sample space:</p>

<p>
\\[
S=\\{1,2,3,4,5,6\\}
\\]
</p>

<p>Count them:</p>

<p>
\\[
1,2,3,4,5,6
\\]
</p>

<p>There are 6 outcomes.</p>

<p>
\\[
\\boxed{n(S)=6}
\\]
</p>

<h3>Example 3</h3>

<p>Two coin tosses have:</p>

<p>
\\[
S=\\{HH,HT,TH,TT\\}
\\]
</p>

<p>Count the outcomes:</p>

<p>
\\[
HH,HT,TH,TT
\\]
</p>

<p>There are 4 outcomes.</p>

<p>
\\[
\\boxed{n(S)=4}
\\]
</p>

<h3>Example 4</h3>

<p>A box contains cards numbered 2, 4, 6, 8 and 10.</p>

<p>The sample space is:</p>

<p>
\\[
S=\\{2,4,6,8,10\\}
\\]
</p>

<p>There are 5 possible outcomes.</p>

<p>
\\[
\\boxed{n(S)=5}
\\]
</p>

<h3>Example 5</h3>

<p>A student chooses one colour from:</p>

<p>
\\[
S=\\{Red,Blue,Green,Yellow\\}
\\]
</p>

<p>There are 4 possible outcomes.</p>

<p>
\\[
\\boxed{n(S)=4}
\\]
</p>

<p><b>Key idea:</b> Do not calculate probability yet. At this stage, only count the possible outcomes.</p>
`,

  [
    {
      q: "Given S = {H,T}, find n(S).",
      hint: "Count the outcomes in the set.",
      steps: [
        "The outcomes are H and T.",
        "There are 2 outcomes.",
        "Therefore n(S) = 2."
      ],
      ans: "n(S) = 2",
      why: "The sample space contains two possible outcomes."
    },

    {
      q: "Given S = {1,2,3,4,5,6}, find n(S).",
      hint: "Count the numbers.",
      steps: [
        "There are six numbers in the set.",
        "Therefore n(S) = 6."
      ],
      ans: "n(S) = 6",
      why: "The six numbers represent six possible outcomes."
    },

    {
      q: "Given S = {HH,HT,TH,TT}, find n(S).",
      hint: "Count each two-letter outcome.",
      steps: [
        "The outcomes are HH, HT, TH and TT.",
        "There are 4 outcomes.",
        "Therefore n(S) = 4."
      ],
      ans: "n(S) = 4",
      why: "Each listed result is one possible outcome."
    },

    {
      q: "A box contains cards numbered 3, 5, 7 and 9. Find n(S).",
      hint: "Count the cards.",
      steps: [
        "The possible outcomes are 3, 5, 7 and 9.",
        "There are 4 outcomes."
      ],
      ans: "n(S) = 4",
      why: "There are four possible cards that can be selected."
    }
  ]
);


// ============================================================
// SCREEN 3 — IDENTIFYING FAVOURABLE OUTCOMES
// ============================================================

add(
  "math",
  "probability",
  "Identifying Favourable Outcomes",

  `
<h2>Identifying Favourable Outcomes</h2>

<p><b>One concept:</b> Identify the outcomes that satisfy a stated condition.</p>

<p>
A <b>favourable outcome</b> is an outcome that satisfies the event we are interested in.
</p>

<h3>Example 1</h3>

<p>A die is rolled.</p>

<p>We want an even number.</p>

<p>The sample space is:</p>

<p>
\\[
S=\\{1,2,3,4,5,6\\}
\\]
</p>

<p>The even outcomes are:</p>

<p>
\\[
2,4,6
\\]
</p>

<p>Therefore the favourable outcomes are:</p>

<p>
\\[
\\boxed{\\{2,4,6\\}}
\\]
</p>

<h3>Example 2</h3>

<p>A card is selected from:</p>

<p>
\\[
S=\\{1,2,3,4,5\\}
\\]
</p>

<p>We want a number greater than 3.</p>

<p>Check each outcome:</p>

<p>
\\[
1\\not>3
\\]
</p>

<p>
\\[
2\\not>3
\\]
</p>

<p>
\\[
3\\not>3
\\]
</p>

<p>
\\[
4>3
\\]
</p>

<p>
\\[
5>3
\\]
</p>

<p>Therefore the favourable outcomes are:</p>

<p>
\\[
\\boxed{\\{4,5\\}}
\\]
</p>

<h3>Example 3</h3>

<p>A letter is selected from:</p>

<p>
\\[
S=\\{A,B,C,D,E\\}
\\]
</p>

<p>We want a vowel.</p>

<p>The vowels in the sample space are:</p>

<p>
\\[
A,E
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{\\{A,E\\}}
\\]
</p>

<h3>Important</h3>

<p>
The favourable outcomes are not necessarily all the outcomes.
</p>

<p>
They are only the outcomes that satisfy the condition in the question.
</p>
`,

  [
    {
      q: "A die is rolled. Identify the favourable outcomes for getting an odd number.",
      hint: "Which numbers from 1 to 6 are odd?",
      steps: [
        "The odd numbers are 1, 3 and 5.",
        "Therefore the favourable outcomes are {1,3,5}."
      ],
      ans: "{1,3,5}",
      why: "These are the outcomes that satisfy the condition of being odd."
    },

    {
      q: "A number is selected from {1,2,3,4,5}. Identify the favourable outcomes for getting a number less than 3.",
      hint: "Check which numbers are smaller than 3.",
      steps: [
        "1 is less than 3.",
        "2 is less than 3.",
        "3, 4 and 5 are not less than 3.",
        "Therefore the favourable outcomes are {1,2}."
      ],
      ans: "{1,2}",
      why: "Only 1 and 2 satisfy the condition."
    },

    {
      q: "A letter is selected from {A,B,C,D,E}. Identify the favourable outcomes for selecting a consonant.",
      hint: "A and E are vowels.",
      steps: [
        "A and E are vowels.",
        "B, C and D are consonants.",
        "Therefore the favourable outcomes are {B,C,D}."
      ],
      ans: "{B,C,D}",
      why: "These letters satisfy the condition of being consonants."
    }
  ]
);


// ============================================================
// SCREEN 4 — CALCULATING PROBABILITY FROM COUNTS
// ============================================================

add(
  "math",
  "probability",
  "Calculating Probability from Counts",

  `
<h2>Calculating Probability from Counts</h2>

<p><b>One concept:</b> Calculate probability by comparing favourable outcomes with total possible outcomes.</p>

<p>
For equally likely outcomes:
</p>

<p>
\\[
\\boxed{P(A)=\\frac{n(A)}{n(S)}}
\\]
</p>

<p>where:</p>

<ul>
<li><b>n(A)</b> = number of favourable outcomes</li>
<li><b>n(S)</b> = total number of possible outcomes</li>
</ul>

<h3>Example 1</h3>

<p>A die is rolled. Find the probability of getting a 4.</p>

<p>Total outcomes:</p>

<p>
\\[
n(S)=6
\\]
</p>

<p>Favourable outcomes:</p>

<p>
\\[
n(A)=1
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A)=\\frac{1}{6}
\\]
</p>

<p>
\\[
\\boxed{P(4)=\\frac16}
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled. Find the probability of getting an even number.</p>

<p>Favourable outcomes:</p>

<p>
\\[
\\{2,4,6\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
n(A)=3
\\]
</p>

<p>The die has 6 possible outcomes:</p>

<p>
\\[
n(S)=6
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A)=\\frac{3}{6}
\\]
</p>

<h3>Example 3</h3>

<p>A card is selected from {1,2,3,4,5}.</p>

<p>Find the probability of selecting a number greater than 3.</p>

<p>Favourable outcomes:</p>

<p>
\\[
\\{4,5\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
n(A)=2
\\]
</p>

<p>Total outcomes:</p>

<p>
\\[
n(S)=5
\\]
</p>

<p>Hence:</p>

<p>
\\[
P(A)=\\frac25
\\]
</p>

<p>
\\[
\\boxed{P(A)=\\frac25}
\\]
</p>
`,

  [
    {
      q: "A die is rolled. Find the probability of getting a 2.",
      hint: "There is one favourable outcome and six total outcomes.",
      steps: [
        "There are 6 possible outcomes.",
        "Only 2 is favourable.",
        "Therefore P(2) = 1/6."
      ],
      ans: "1/6",
      why: "Probability compares favourable outcomes with total outcomes."
    },

    {
      q: "A die is rolled. Find the probability of getting an odd number.",
      hint: "The odd outcomes are 1, 3 and 5.",
      steps: [
        "There are 3 favourable outcomes.",
        "There are 6 total outcomes.",
        "P(odd) = 3/6."
      ],
      ans: "3/6",
      why: "Three of the six equally likely outcomes are odd."
    },

    {
      q: "A number is selected from {1,2,3,4,5}. Find the probability of selecting 5.",
      hint: "How many favourable outcomes are there?",
      steps: [
        "There are 5 total outcomes.",
        "Only 5 is favourable.",
        "P(5) = 1/5."
      ],
      ans: "1/5",
      why: "One of the five possible outcomes is 5."
    }
  ]
);


// ============================================================
// SCREEN 5 — WRITING PROBABILITY AS A FRACTION
// ============================================================

add(
  "math",
  "probability",
  "Writing Probability as a Fraction",

  `
<h2>Writing Probability as a Fraction</h2>

<p><b>One concept:</b> Express a probability as a fraction.</p>

<p>
Probability can be written as a fraction:
</p>

<p>
\\[
P(A)=\\frac{\\text{favourable outcomes}}{\\text{total outcomes}}
\\]
</p>

<h3>Example 1</h3>

<p>A die is rolled and the probability of getting a 3 is:</p>

<p>
\\[
P(3)=\\frac16
\\]
</p>

<p>The numerator 1 represents the one favourable outcome: 3.</p>

<p>The denominator 6 represents all six possible outcomes.</p>

<h3>Example 2</h3>

<p>A die is rolled and an even number is required.</p>

<p>Favourable outcomes:</p>

<p>
\\[
2,4,6
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(\\text{even})=\\frac36
\\]
</p>

<h3>Example 3</h3>

<p>A bag contains 8 cards numbered 1 to 8.</p>

<p>Find the probability of selecting 7.</p>

<p>There is one favourable outcome.</p>

<p>There are 8 total outcomes.</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(7)=\\frac18}
\\]
</p>

<h3>What the fraction means</h3>

<p>
The numerator tells us <b>how many outcomes we want</b>.
</p>

<p>
The denominator tells us <b>how many outcomes are possible altogether</b>.
</p>
`,

  [
    {
      q: "A die is rolled. Write the probability of getting 6 as a fraction.",
      hint: "There is one favourable outcome out of six.",
      steps: [
        "Favourable outcomes = 1.",
        "Total outcomes = 6.",
        "Therefore P(6) = 1/6."
      ],
      ans: "1/6",
      why: "The fraction has favourable outcomes on top and total outcomes below."
    },

    {
      q: "A die is rolled. Write the probability of getting an even number as a fraction.",
      hint: "There are three even outcomes.",
      steps: [
        "The even outcomes are 2, 4 and 6.",
        "There are 3 favourable outcomes.",
        "There are 6 total outcomes.",
        "Therefore P(even) = 3/6."
      ],
      ans: "3/6",
      why: "Three of the six possible outcomes are even."
    },

    {
      q: "A card numbered 1 to 10 is selected. Write the probability of selecting 4.",
      hint: "Only one card is numbered 4.",
      steps: [
        "There is 1 favourable outcome.",
        "There are 10 possible cards.",
        "Therefore P(4) = 1/10."
      ],
      ans: "1/10",
      why: "One favourable card exists among ten possible cards."
    }
  ]
);


// ============================================================
// SCREEN 6 — SIMPLIFYING A PROBABILITY FRACTION
// ============================================================

add(
  "math",
  "probability",
  "Simplifying a Probability Fraction",

  `
<h2>Simplifying a Probability Fraction</h2>

<p><b>One concept:</b> Simplify a probability fraction by dividing the numerator and denominator by their common factor.</p>

<h3>Example 1</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac36
\\]
</p>

<p>Both 3 and 6 can be divided by 3.</p>

<p>
\\[
\\frac36=\\frac{3\\div3}{6\\div3}
\\]
</p>

<p>
\\[
=\\frac12
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(A)=\\frac12}
\\]
</p>

<h3>Example 2</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac{4}{8}
\\]
</p>

<p>Divide both numbers by 4:</p>

<p>
\\[
\\frac{4}{8}=\\frac{4\\div4}{8\\div4}
\\]
</p>

<p>
\\[
=\\frac12
\\]
</p>

<h3>Example 3</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac{6}{10}
\\]
</p>

<p>Both numbers can be divided by 2:</p>

<p>
\\[
\\frac{6}{10}=\\frac{6\\div2}{10\\div2}
\\]
</p>

<p>
\\[
=\\frac35
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{\\frac{6}{10}=\\frac35}
\\]
</p>

<h3>Important</h3>

<p>
Simplifying does not change the probability.
</p>

<p>
For example:
</p>

<p>
\\[
\\frac36=\\frac12
\\]
</p>

<p>They represent the same probability.</p>
`,

  [
    {
      q: "Simplify 3/6.",
      hint: "Divide both numbers by 3.",
      steps: [
        "3 ÷ 3 = 1.",
        "6 ÷ 3 = 2.",
        "Therefore 3/6 = 1/2."
      ],
      ans: "1/2",
      why: "The numerator and denominator were divided by the same common factor."
    },

    {
      q: "Simplify 4/8.",
      hint: "Divide both numbers by 4.",
      steps: [
        "4 ÷ 4 = 1.",
        "8 ÷ 4 = 2.",
        "Therefore 4/8 = 1/2."
      ],
      ans: "1/2",
      why: "Dividing both parts of a fraction by the same non-zero number gives an equivalent fraction."
    },

    {
      q: "Simplify 6/10.",
      hint: "Both numbers are divisible by 2.",
      steps: [
        "6 ÷ 2 = 3.",
        "10 ÷ 2 = 5.",
        "Therefore 6/10 = 3/5."
      ],
      ans: "3/5",
      why: "3/5 is the simplified form of 6/10."
    }
  ]
);


// ============================================================
// SCREEN 7 — PROBABILITY BETWEEN 0 AND 1
// ============================================================

add(
  "math",
  "probability",
  "Probability Between 0 and 1",

  `
<h2>Probability Between 0 and 1</h2>

<p><b>One concept:</b> Understand that probability has a value from 0 to 1.</p>

<p>
For any event A:
</p>

<p>
\\[
\\boxed{0\\leq P(A)\\leq1}
\\]
</p>

<h3>Example 1</h3>

<p>Consider:</p>

<p>
\\[
P(A)=\\frac12
\\]
</p>

<p>Since:</p>

<p>
\\[
0<\\frac12<1
\\]
</p>

<p>this is a possible probability.</p>

<h3>Example 2</h3>

<p>Consider:</p>

<p>
\\[
P(A)=\\frac34
\\]
</p>

<p>Since:</p>

<p>
\\[
0<\\frac34<1
\\]
</p>

<p>this can be a probability.</p>

<h3>Example 3</h3>

<p>Consider:</p>

<p>
\\[
P(A)=1
\\]
</p>

<p>This is also allowed because:</p>

<p>
\\[
0\\leq1\\leq1
\\]
</p>

<h3>Example 4</h3>

<p>Consider:</p>

<p>
\\[
P(A)=-0.2
\\]
</p>

<p>This cannot be a probability because it is less than 0.</p>

<h3>Example 5</h3>

<p>Consider:</p>

<p>
\\[
P(A)=1.4
\\]
</p>

<p>This cannot be a probability because it is greater than 1.</p>

<h3>Rule</h3>

<p>
Every probability must satisfy:
</p>

<p>
\\[
\\boxed{0\\leq P(A)\\leq1}
\\]
</p>
`,

  [
    {
      q: "Can 0.6 be a probability?",
      hint: "Check whether it is between 0 and 1.",
      steps: [
        "0 < 0.6 < 1.",
        "Therefore 0.6 can be a probability."
      ],
      ans: "Yes",
      why: "It lies between 0 and 1."
    },

    {
      q: "Can -0.4 be a probability?",
      hint: "A probability cannot be less than 0.",
      steps: [
        "-0.4 is less than 0.",
        "Therefore it cannot be a probability."
      ],
      ans: "No",
      why: "Probabilities cannot be negative."
    },

    {
      q: "Can 1.2 be a probability?",
      hint: "Compare it with 1.",
      steps: [
        "1.2 is greater than 1.",
        "Therefore it cannot be a probability."
      ],
      ans: "No",
      why: "A probability cannot be greater than 1."
    }
  ]
);


// ============================================================
// SCREEN 8 — IMPOSSIBLE EVENT
// ============================================================

add(
  "math",
  "probability",
  "Probability of an Impossible Event",

  `
<h2>Probability of an Impossible Event</h2>

<p><b>One concept:</b> Recognise an event that cannot happen.</p>

<p>
An <b>impossible event</b> is an event that has no possible favourable outcome.
</p>

<p>
Its probability is:
</p>

<p>
\\[
\\boxed{P(A)=0}
\\]
</p>

<h3>Example 1</h3>

<p>A standard die is rolled.</p>

<p>Find the probability of getting 8.</p>

<p>The sample space is:</p>

<p>
\\[
\\{1,2,3,4,5,6\\}
\\]
</p>

<p>8 is not in the sample space.</p>

<p>Therefore there are zero favourable outcomes.</p>

<p>
\\[
P(8)=\\frac06
\\]
</p>

<p>
\\[
\\boxed{P(8)=0}
\\]
</p>

<h3>Example 2</h3>

<p>A coin is tossed once.</p>

<p>Find the probability of getting both Head and Tail on the same single toss.</p>

<p>A single toss produces only one result.</p>

<p>It cannot produce both H and T at the same time.</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(\\text{both H and T})=0}
\\]
</p>

<h3>Example 3</h3>

<p>A card is selected from:</p>

<p>
\\[
\\{2,4,6,8\\}
\\]
</p>

<p>Find the probability of selecting 5.</p>

<p>5 is not available.</p>

<p>Therefore:</p>

<p>
\\[
P(5)=\\frac04=0
\\]
</p>

<h3>Key idea</h3>

<p>
No favourable outcomes means probability 0.
</p>
`,

  [
    {
      q: "A die is rolled. What is the probability of getting 9?",
      hint: "Is 9 a possible result on a standard die?",
      steps: [
        "A standard die has outcomes 1 to 6.",
        "9 is not possible.",
        "Therefore P(9) = 0."
      ],
      ans: "0",
      why: "There are no favourable outcomes."
    },

    {
      q: "A card is selected from {1,2,3,4}. What is the probability of selecting 7?",
      hint: "Check whether 7 is in the sample space.",
      steps: [
        "The available cards are 1, 2, 3 and 4.",
        "7 is not available.",
        "Therefore the probability is 0."
      ],
      ans: "0",
      why: "Selecting 7 is impossible in this experiment."
    },

    {
      q: "A coin is tossed once. What is the probability of getting three Heads?",
      hint: "How many results can one toss produce?",
      steps: [
        "One toss produces only one result.",
        "Three Heads cannot occur in one toss.",
        "Therefore the probability is 0."
      ],
      ans: "0",
      why: "The event cannot happen in the stated experiment."
    }
  ]
);


// ============================================================
// SCREEN 9 — CERTAIN EVENT
// ============================================================

add(
  "math",
  "probability",
  "Probability of a Certain Event",

  `
<h2>Probability of a Certain Event</h2>

<p><b>One concept:</b> Recognise an event that must happen.</p>

<p>
A <b>certain event</b> is an event that is guaranteed to happen.
</p>

<p>
Its probability is:
</p>

<p>
\\[
\\boxed{P(A)=1}
\\]
</p>

<h3>Example 1</h3>

<p>A standard die is rolled.</p>

<p>Find the probability of getting a number from 1 to 6.</p>

<p>The sample space is:</p>

<p>
\\[
\\{1,2,3,4,5,6\\}
\\]
</p>

<p>Every possible outcome satisfies the condition.</p>

<p>Therefore:</p>

<p>
\\[
P(1\\text{ to }6)=\\frac66
\\]
</p>

<p>
\\[
\\boxed{P(1\\text{ to }6)=1}
\\]
</p>

<h3>Example 2</h3>

<p>A card is selected from:</p>

<p>
\\[
\\{2,4,6,8\\}
\\]
</p>

<p>Find the probability of selecting an even number.</p>

<p>Every card is even.</p>

<p>Therefore:</p>

<p>
\\[
P(\\text{even})=\\frac44=1
\\]
</p>

<h3>Example 3</h3>

<p>A bag contains only red balls.</p>

<p>One ball is selected.</p>

<p>It must be red.</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(\\text{red})=1}
\\]
</p>

<h3>Key idea</h3>

<p>
If every possible outcome satisfies the condition, the probability is 1.
</p>
`,

  [
    {
      q: "A die is rolled. What is the probability of getting a number from 1 to 6?",
      hint: "Can a standard die produce anything outside 1 to 6?",
      steps: [
        "Every possible die outcome is from 1 to 6.",
        "Therefore all 6 outcomes are favourable.",
        "P = 6/6 = 1."
      ],
      ans: "1",
      why: "The event is certain to happen."
    },

    {
      q: "A card is selected from {2,4,6,8}. What is the probability of getting an even number?",
      hint: "Look at every card.",
      steps: [
        "2, 4, 6 and 8 are all even.",
        "There are 4 favourable outcomes out of 4.",
        "P = 4/4 = 1."
      ],
      ans: "1",
      why: "Every possible outcome is even."
    },

    {
      q: "A bag contains only blue balls. One ball is selected. What is the probability that it is blue?",
      hint: "Can any other colour be selected?",
      steps: [
        "Every ball in the bag is blue.",
        "Therefore the selected ball must be blue.",
        "The probability is 1."
      ],
      ans: "1",
      why: "The event is guaranteed."
    }
  ]
);


// ============================================================
// SCREEN 10 — COMPLEMENT OF AN EVENT
// ============================================================

add(
  "math",
  "probability",
  "Complement of an Event",

  `
<h2>Complement of an Event</h2>

<p><b>One concept:</b> Identify the outcomes where an event does not happen.</p>

<p>
The <b>complement</b> of an event A means:
</p>

<p>
<b>"A does not happen."</b>
</p>

<p>
The complement is commonly written as:
</p>

<p>
\\[
\\boxed{A'}
\\]
</p>

<h3>Example 1</h3>

<p>A die is rolled.</p>

<p>Let A be the event "getting an even number".</p>

<p>The even outcomes are:</p>

<p>
\\[
A=\\{2,4,6\\}
\\]
</p>

<p>The outcomes where A does not happen are the odd numbers:</p>

<p>
\\[
\\boxed{A'=\\{1,3,5\\}}
\\]
</p>

<h3>Example 2</h3>

<p>A number is selected from:</p>

<p>
\\[
\\{1,2,3,4,5\\}
\\]
</p>

<p>Let A be "selecting a number greater than 3".</p>

<p>Then:</p>

<p>
\\[
A=\\{4,5\\}
\\]
</p>

<p>The outcomes where A does not happen are:</p>

<p>
\\[
\\boxed{A'=\\{1,2,3\\}}
\\]
</p>

<h3>Example 3</h3>

<p>A letter is selected from:</p>

<p>
\\[
\\{A,B,C,D,E\\}
\\]
</p>

<p>Let A be "selecting a vowel".</p>

<p>The vowels are:</p>

<p>
\\[
A=\\{A,E\\}
\\]
</p>

<p>The complement is:</p>

<p>
\\[
\\boxed{A'=\\{B,C,D\\}}
\\]
</p>

<h3>Key idea</h3>

<p>
The complement contains every outcome in the sample space that is <b>not</b> in the event.
</p>
`,

  [
    {
      q: "A die is rolled. A = getting an even number. Find A'.",
      hint: "A' contains the outcomes that are not even.",
      steps: [
        "Even outcomes are 2, 4 and 6.",
        "The remaining outcomes are 1, 3 and 5.",
        "Therefore A' = {1,3,5}."
      ],
      ans: "A' = {1,3,5}",
      why: "The complement contains outcomes where the original event does not occur."
    },

    {
      q: "A number is selected from {1,2,3,4,5}. A = selecting a number less than 3. Find A'.",
      hint: "First identify the numbers less than 3.",
      steps: [
        "A = {1,2}.",
        "The remaining outcomes are 3, 4 and 5.",
        "Therefore A' = {3,4,5}."
      ],
      ans: "A' = {3,4,5}",
      why: "These are exactly the outcomes where A does not occur."
    },

    {
      q: "A letter is selected from {A,B,C,D,E}. A = selecting a vowel. Find A'.",
      hint: "The vowels are A and E.",
      steps: [
        "A = {A,E}.",
        "The remaining letters are B, C and D.",
        "Therefore A' = {B,C,D}."
      ],
      ans: "A' = {B,C,D}",
      why: "The complement contains the non-vowel outcomes."
    }
  ]
);


// ============================================================
// SCREEN 11 — COMPLEMENT PROBABILITY
// ============================================================

add(
  "math",
  "probability",
  "Probability of the Complement of an Event",

  `
<h2>Probability of the Complement of an Event</h2>

<p><b>One concept:</b> Find the probability that an event does not happen.</p>

<p>
If A is an event and A' is its complement, then:
</p>

<p>
\\[
\\boxed{P(A')=1-P(A)}
\\]
</p>

<h3>Example 1</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac12
\\]
</p>

<p>We want the probability that A does not happen.</p>

<p>Use:</p>

<p>
\\[
P(A')=1-P(A)
\\]
</p>

<p>Substitute:</p>

<p>
\\[
P(A')=1-\\frac12
\\]
</p>

<p>
\\[
=\\frac22-\\frac12
\\]
</p>

<p>
\\[
\\boxed{P(A')=\\frac12}
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled.</p>

<p>Find the probability of <b>not</b> getting an even number.</p>

<p>The probability of getting an even number is:</p>

<p>
\\[
P(\\text{even})=\\frac36=\\frac12
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(\\text{not even})=1-\\frac12
\\]
</p>

<p>
\\[
\\boxed{P(\\text{not even})=\\frac12}
\\]
</p>

<h3>Example 3</h3>

<p>A card is selected from 1 to 5.</p>

<p>Let A be selecting a number greater than 3.</p>

<p>There are two favourable outcomes:</p>

<p>
\\[
P(A)=\\frac25
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A')=1-\\frac25
\\]
</p>

<p>
\\[
=\\frac55-\\frac25
\\]
</p>

<p>
\\[
\\boxed{P(A')=\\frac35}
\\]
</p>

<h3>Why this works</h3>

<p>
Either A happens or A does not happen.
</p>

<p>
Together they account for every possible outcome.
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(A)+P(A')=1}
\\]
</p>
`,

  [
    {
      q: "If P(A) = 1/4, find P(A').",
      hint: "Use P(A') = 1 - P(A).",
      steps: [
        "P(A') = 1 - 1/4.",
        "Write 1 as 4/4.",
        "4/4 - 1/4 = 3/4."
      ],
      ans: "3/4",
      why: "The event and its complement together have probability 1."
    },

    {
      q: "If P(A) = 0.7, find P(A').",
      hint: "Subtract 0.7 from 1.",
      steps: [
        "P(A') = 1 - 0.7.",
        "1 - 0.7 = 0.3."
      ],
      ans: "0.3",
      why: "The probability of A and the probability of A not happening must add to 1."
    },

    {
      q: "A die is rolled. Find the probability of not getting a 6.",
      hint: "First find P(6).",
      steps: [
        "P(6) = 1/6.",
        "P(not 6) = 1 - 1/6.",
        "1 = 6/6.",
        "6/6 - 1/6 = 5/6."
      ],
      ans: "5/6",
      why: "Five of the six possible outcomes are not 6."
    }
  ]
);
// ============================================================
// SCREEN 12 — SINGLE-OUTCOME PROBABILITY WITH A DIE
// ============================================================

add(
  "math",
  "probability",
  "Single-Outcome Probability with a Die",

  `
<h2>Single-Outcome Probability with a Die</h2>

<p><b>One concept:</b> Find the probability of one specified number appearing on a fair die.</p>

<p>
A standard die has six equally likely outcomes:
</p>

<p>
\\[
S=\\{1,2,3,4,5,6\\}
\\]
</p>

<p>
If we want one particular number, there is exactly <b>1 favourable outcome</b>.
</p>

<h3>Example 1: Getting 1</h3>

<p>There are 6 possible outcomes.</p>

<p>Only 1 is favourable.</p>

<p>
\\[
P(1)=\\frac{1}{6}
\\]
</p>

<h3>Example 2: Getting 4</h3>

<p>Again, only one outcome is favourable.</p>

<p>
\\[
P(4)=\\frac{1}{6}
\\]
</p>

<h3>Example 3: Getting 6</h3>

<p>There is one favourable outcome: 6.</p>

<p>There are six possible outcomes.</p>

<p>
\\[
P(6)=\\frac16
\\]
</p>

<h3>Important Observation</h3>

<p>
For a fair six-sided die, every individual number has the same probability.
</p>

<p>
\\[
\\boxed{
P(1)=P(2)=P(3)=P(4)=P(5)=P(6)=\\frac16
}
\\]
</p>

<p>
The important skill here is recognising that a single specified number represents <b>one favourable outcome</b>.
</p>
`,

  [
    {
      q: "A fair die is rolled. Find P(2).",
      hint: "There are six possible outcomes and only one is 2.",
      steps: [
        "There are 6 possible outcomes.",
        "Only one outcome is 2.",
        "Therefore P(2) = 1/6."
      ],
      ans: "1/6",
      why: "One specified number is one favourable outcome out of six."
    },

    {
      q: "A fair die is rolled. Find P(5).",
      hint: "Count the favourable outcome and total outcomes.",
      steps: [
        "The die has 6 possible outcomes.",
        "Only 5 is favourable.",
        "Therefore P(5) = 1/6."
      ],
      ans: "1/6",
      why: "Each individual face of a fair die has equal probability."
    },

    {
      q: "A fair die is rolled. Find P(3).",
      hint: "How many outcomes are favourable?",
      steps: [
        "There are 6 total outcomes.",
        "Only 3 is favourable.",
        "Therefore P(3) = 1/6."
      ],
      ans: "1/6",
      why: "The specified number represents one favourable outcome."
    }
  ]
);


// ============================================================
// SCREEN 13 — PROBABILITY OF A CATEGORY OF OUTCOMES
// ============================================================

add(
  "math",
  "probability",
  "Probability of a Category of Outcomes",

  `
<h2>Probability of a Category of Outcomes</h2>

<p><b>One concept:</b> Find the probability of an event containing several favourable outcomes.</p>

<p>
Sometimes an event is not one outcome. It can contain several outcomes.
</p>

<h3>Example 1: Even Number</h3>

<p>A die is rolled.</p>

<p>The event "getting an even number" contains:</p>

<p>
\\[
\\{2,4,6\\}
\\]
</p>

<p>There are 3 favourable outcomes.</p>

<p>There are 6 total outcomes.</p>

<p>Therefore:</p>

<p>
\\[
P(\\text{even})=\\frac36
\\]
</p>

<p>
\\[
\\boxed{P(\\text{even})=\\frac12}
\\]
</p>

<h3>Example 2: Number Greater Than 4</h3>

<p>The outcomes greater than 4 are:</p>

<p>
\\[
\\{5,6\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(>4)=\\frac26
\\]
</p>

<p>
\\[
\\boxed{P(>4)=\\frac13}
\\]
</p>

<h3>Example 3: Number Less Than 5</h3>

<p>The favourable outcomes are:</p>

<p>
\\[
\\{1,2,3,4\\}
\\]
</p>

<p>There are 4 favourable outcomes.</p>

<p>Therefore:</p>

<p>
\\[
P(<5)=\\frac46
\\]
</p>

<p>
\\[
\\boxed{P(<5)=\\frac23}
\\]
</p>

<h3>The Action</h3>

<p>
When an event contains several outcomes:
</p>

<p>
<b>1. List the outcomes that satisfy the condition.</b>
</p>

<p>
<b>2. Count them.</b>
</p>

<p>
<b>3. Compare that count with the total number of outcomes.</b>
</p>
`,

  [
    {
      q: "A die is rolled. Find the probability of getting an odd number.",
      hint: "List the odd numbers first.",
      steps: [
        "The odd outcomes are 1, 3 and 5.",
        "There are 3 favourable outcomes.",
        "There are 6 total outcomes.",
        "P(odd) = 3/6 = 1/2."
      ],
      ans: "1/2",
      why: "Three of the six possible outcomes are odd."
    },

    {
      q: "A die is rolled. Find the probability of getting a number greater than 3.",
      hint: "Which numbers are greater than 3?",
      steps: [
        "The favourable outcomes are 4, 5 and 6.",
        "There are 3 favourable outcomes.",
        "There are 6 total outcomes.",
        "P(>3) = 3/6 = 1/2."
      ],
      ans: "1/2",
      why: "Three outcomes satisfy the condition."
    },

    {
      q: "A die is rolled. Find the probability of getting a number less than 3.",
      hint: "List the numbers below 3.",
      steps: [
        "The favourable outcomes are 1 and 2.",
        "There are 2 favourable outcomes.",
        "There are 6 total outcomes.",
        "P(<3) = 2/6 = 1/3."
      ],
      ans: "1/3",
      why: "Only 1 and 2 satisfy the condition."
    }
  ]
);


// ============================================================
// SCREEN 14 — PROBABILITY FROM A TWO-COLOUR BAG
// ============================================================

add(
  "math",
  "probability",
  "Probability from a Two-Colour Bag",

  `
<h2>Probability from a Two-Colour Bag</h2>

<p><b>One concept:</b> Find the probability of selecting a colour from a bag.</p>

<h3>Example 1</h3>

<p>A bag contains:</p>

<p>
\\[
3\\text{ red balls and }2\\text{ blue balls}
\\]
</p>

<p>Total balls:</p>

<p>
\\[
3+2=5
\\]
</p>

<p>Probability of selecting red:</p>

<p>
\\[
P(R)=\\frac{3}{5}
\\]
</p>

<p>Probability of selecting blue:</p>

<p>
\\[
P(B)=\\frac25
\\]
</p>

<h3>Example 2</h3>

<p>A bag contains 7 green balls and 3 yellow balls.</p>

<p>Total:</p>

<p>
\\[
7+3=10
\\]
</p>

<p>Probability of green:</p>

<p>
\\[
P(G)=\\frac7{10}
\\]
</p>

<p>Probability of yellow:</p>

<p>
\\[
P(Y)=\\frac3{10}
\\]
</p>

<h3>Example 3</h3>

<p>A bag contains 4 red balls and 6 blue balls.</p>

<p>Total:</p>

<p>
\\[
4+6=10
\\]
</p>

<p>Probability of red:</p>

<p>
\\[
P(R)=\\frac4{10}=\\frac25
\\]
</p>

<p>Probability of blue:</p>

<p>
\\[
P(B)=\\frac6{10}=\\frac35
\\]
</p>

<h3>Key Action</h3>

<p>
For one selection:
</p>

<p>
\\[
\\boxed{
P(\\text{colour})=
\\frac{\\text{number of balls of that colour}}
{\\text{total number of balls}}
}
\\]
</p>
`,

  [
    {
      q: "A bag contains 4 red balls and 6 blue balls. Find P(red).",
      hint: "First find the total number of balls.",
      steps: [
        "Total = 4 + 6 = 10.",
        "There are 4 red balls.",
        "P(red) = 4/10 = 2/5."
      ],
      ans: "2/5",
      why: "Four of the ten possible selections are red."
    },

    {
      q: "A bag contains 2 green balls and 8 yellow balls. Find P(green).",
      hint: "There are 10 balls altogether.",
      steps: [
        "Total = 2 + 8 = 10.",
        "There are 2 green balls.",
        "P(green) = 2/10 = 1/5."
      ],
      ans: "1/5",
      why: "Two of the ten possible selections are green."
    },

    {
      q: "A bag contains 5 red balls and 5 blue balls. Find P(blue).",
      hint: "Find the total first.",
      steps: [
        "Total = 5 + 5 = 10.",
        "There are 5 blue balls.",
        "P(blue) = 5/10 = 1/2."
      ],
      ans: "1/2",
      why: "Five of the ten balls are blue."
    }
  ]
);


// ============================================================
// SCREEN 15 — PROBABILITY FROM A TABLE
// ============================================================

add(
  "math",
  "probability",
  "Probability from a Table",

  `
<h2>Probability from a Table</h2>

<p><b>One concept:</b> Read the number of favourable outcomes from a frequency table and calculate probability.</p>

<h3>Example</h3>

<p>A class records the favourite fruit of 20 students.</p>

<table border="1" cellpadding="8">
<tr>
<th>Fruit</th>
<th>Number of Students</th>
</tr>
<tr>
<td>Apple</td>
<td>8</td>
</tr>
<tr>
<td>Banana</td>
<td>5</td>
</tr>
<tr>
<td>Orange</td>
<td>4</td>
</tr>
<tr>
<td>Mango</td>
<td>3</td>
</tr>
</table>

<p>The total number of students is:</p>

<p>
\\[
8+5+4+3=20
\\]
</p>

<h3>Example 1: Apple</h3>

<p>There are 8 students who chose apple.</p>

<p>
\\[
P(Apple)=\\frac8{20}
\\]
</p>

<p>
\\[
\\boxed{P(Apple)=\\frac25}
\\]
</p>

<h3>Example 2: Mango</h3>

<p>There are 3 students who chose mango.</p>

<p>
\\[
P(Mango)=\\frac3{20}
\\]
</p>

<h3>Example 3: Banana</h3>

<p>There are 5 students who chose banana.</p>

<p>
\\[
P(Banana)=\\frac5{20}
\\]
</p>

<p>
\\[
\\boxed{P(Banana)=\\frac14}
\\]
</p>

<h3>Key Action</h3>

<p>
Read the frequency for the required category and divide it by the total frequency.
</p>
`,

  [
    {
      q: "A table shows 12 students chose football, 8 chose basketball and 5 chose volleyball. Find the probability that a randomly selected student chose football.",
      hint: "Add all students first.",
      steps: [
        "Total = 12 + 8 + 5 = 25.",
        "Football has 12 students.",
        "P(football) = 12/25."
      ],
      ans: "12/25",
      why: "The favourable frequency is 12 and the total frequency is 25."
    },

    {
      q: "A table shows 7 students chose tea, 5 chose juice and 8 chose water. Find P(juice).",
      hint: "Find the total number of students.",
      steps: [
        "Total = 7 + 5 + 8 = 20.",
        "Juice has frequency 5.",
        "P(juice) = 5/20 = 1/4."
      ],
      ans: "1/4",
      why: "Five of the twenty students chose juice."
    },

    {
      q: "A table contains frequencies 6, 9 and 5. Find the probability of selecting an outcome from the category with frequency 9.",
      hint: "Add the three frequencies.",
      steps: [
        "Total = 6 + 9 + 5 = 20.",
        "The required category has 9 outcomes.",
        "P = 9/20."
      ],
      ans: "9/20",
      why: "The favourable frequency is 9 out of a total frequency of 20."
    }
  ]
);


// ============================================================
// SCREEN 16 — PROBABILITY FROM A DIAGRAM
// ============================================================

add(
  "math",
  "probability",
  "Probability from a Diagram",

  `
<h2>Probability from a Diagram</h2>

<p><b>One concept:</b> Extract the number of favourable objects from a visual diagram and use it to calculate probability.</p>

<p>
A diagram can represent physical objects such as balls, shapes or counters.
</p>

<h3>Example</h3>

<p>Imagine a box represented by these counters:</p>

<p>
Red: ● ● ● ●
</p>

<p>
Blue: ● ● ●
</p>

<p>
Green: ● ●
</p>

<p>Count all counters:</p>

<p>
\\[
4+3+2=9
\\]
</p>

<h3>Example 1: Red</h3>

<p>There are 4 red counters.</p>

<p>
\\[
P(Red)=\\frac49
\\]
</p>

<h3>Example 2: Blue</h3>

<p>There are 3 blue counters.</p>

<p>
\\[
P(Blue)=\\frac39
\\]
</p>

<p>
\\[
\\boxed{P(Blue)=\\frac13}
\\]
</p>

<h3>Example 3: Green</h3>

<p>There are 2 green counters.</p>

<p>
\\[
P(Green)=\\frac29
\\]
</p>

<h3>Key Action</h3>

<p>
Do not estimate from the picture.
</p>

<p>
<b>Count the favourable objects and count all the objects.</b>
</p>

<p>Then:</p>

<p>
\\[
P(A)=\\frac{\\text{favourable objects}}
{\\text{all objects}}
\\]
</p>
`,

  [
    {
      q: "A diagram represents 5 red counters and 3 blue counters. Find P(red).",
      hint: "Count all counters.",
      steps: [
        "Total = 5 + 3 = 8.",
        "Red counters = 5.",
        "P(red) = 5/8."
      ],
      ans: "5/8",
      why: "Five of the eight counters are red."
    },

    {
      q: "A diagram represents 2 green, 4 yellow and 4 black counters. Find P(yellow).",
      hint: "Add all counters.",
      steps: [
        "Total = 2 + 4 + 4 = 10.",
        "Yellow counters = 4.",
        "P(yellow) = 4/10 = 2/5."
      ],
      ans: "2/5",
      why: "Four of the ten counters are yellow."
    },

    {
      q: "A diagram contains 3 circles, 2 squares and 5 triangles. Find P(triangle).",
      hint: "Find the total number of shapes.",
      steps: [
        "Total = 3 + 2 + 5 = 10.",
        "Triangles = 5.",
        "P(triangle) = 5/10 = 1/2."
      ],
      ans: "1/2",
      why: "Five of the ten shapes are triangles."
    }
  ]
);


// ============================================================
// SCREEN 17 — EXPERIMENTAL PROBABILITY
// ============================================================

add(
  "math",
  "probability",
  "Experimental Probability",

  `
<h2>Experimental Probability</h2>

<p><b>One concept:</b> Calculate probability from results actually observed in an experiment.</p>

<p>
Experimental probability uses what happened when an experiment was performed.
</p>

<p>
The formula is:
</p>

<p>
\\[
\\boxed{
P(A)=
\\frac{\\text{number of times A occurred}}
{\\text{total number of trials}}
}
\\]
</p>

<h3>Example 1</h3>

<p>A coin is tossed 20 times.</p>

<p>Heads occurs 11 times.</p>

<p>Therefore:</p>

<p>
\\[
P(Heads)=\\frac{11}{20}
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled 30 times.</p>

<p>The number 6 appears 7 times.</p>

<p>Therefore:</p>

<p>
\\[
P(6)=\\frac7{30}
\\]
</p>

<h3>Example 3</h3>

<p>A spinner is spun 50 times.</p>

<p>Red occurs 18 times.</p>

<p>Therefore:</p>

<p>
\\[
P(Red)=\\frac{18}{50}
\\]
</p>

<p>Simplify:</p>

<p>
\\[
\\frac{18}{50}=\\frac9{25}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(Red)=\\frac9{25}}
\\]
</p>

<h3>Important</h3>

<p>
Experimental probability comes from <b>observed results</b>, not from simply listing all theoretical outcomes.
</p>
`,

  [
    {
      q: "A coin is tossed 40 times and Heads occurs 22 times. Find the experimental probability of Heads.",
      hint: "Use occurrences ÷ trials.",
      steps: [
        "Heads occurred 22 times.",
        "There were 40 trials.",
        "P(Heads) = 22/40.",
        "Simplify: 22/40 = 11/20."
      ],
      ans: "11/20",
      why: "Experimental probability uses observed frequency divided by total trials."
    },

    {
      q: "A die is rolled 50 times and 3 appears 9 times. Find the experimental probability of getting 3.",
      hint: "Use 9 occurrences out of 50 trials.",
      steps: [
        "Number 3 occurred 9 times.",
        "Total trials = 50.",
        "P(3) = 9/50."
      ],
      ans: "9/50",
      why: "Nine of the fifty observed rolls produced 3."
    },

    {
      q: "A spinner is spun 20 times and blue occurs 6 times. Find the experimental probability of blue.",
      hint: "Divide occurrences by total trials.",
      steps: [
        "Blue occurred 6 times.",
        "Total trials = 20.",
        "P(blue) = 6/20.",
        "Simplify to 3/10."
      ],
      ans: "3/10",
      why: "Six out of twenty observed spins were blue."
    }
  ]
);


// ============================================================
// SCREEN 18 — THEORETICAL VS EXPERIMENTAL PROBABILITY
// ============================================================

add(
  "math",
  "probability",
  "Theoretical and Experimental Probability",

  `
<h2>Theoretical and Experimental Probability</h2>

<p><b>One concept:</b> Distinguish between probability calculated from possible outcomes and probability calculated from observed results.</p>

<h3>Theoretical Probability</h3>

<p>
Theoretical probability is calculated from the possible outcomes of an experiment.
</p>

<p>
For a fair die:
</p>

<p>
\\[
P(6)=\\frac16
\\]
</p>

<p>
This is based on the six possible outcomes, not on an actual experiment.
</p>

<h3>Experimental Probability</h3>

<p>
Experimental probability is calculated from actual results.
</p>

<p>
Suppose a die is rolled 60 times and 6 appears 8 times.
</p>

<p>
Then:
</p>

<p>
\\[
P(6)=\\frac8{60}=\\frac2{15}
\\]
</p>

<h3>Compare Them</h3>

<p>Theoretical:</p>

<p>
\\[
\\frac16
\\]
</p>

<p>Experimental:</p>

<p>
\\[
\\frac2{15}
\\]
</p>

<p>
They are different because the experiment produced a particular set of results.
</p>

<h3>Important</h3>

<p>
<b>Theoretical:</b> What should be expected from the model.</p>

<p>
<b>Experimental:</b> What was actually observed.
</p>
`,

  [
    {
      q: "A fair die is rolled 30 times and 4 appears 7 times. Is 1/6 theoretical or experimental probability?",
      hint: "Was it calculated from possible outcomes or observed results?",
      steps: [
        "The result came from actually rolling the die.",
        "Therefore it is experimental probability."
      ],
      ans: "Experimental probability",
      why: "It is based on observed results from an experiment."
    },

    {
      q: "For a fair die, P(2) = 1/6 before any rolls are made. Is this theoretical or experimental?",
      hint: "Was an experiment already performed?",
      steps: [
        "The value comes from the six equally likely faces.",
        "It does not depend on observed rolls.",
        "Therefore it is theoretical probability."
      ],
      ans: "Theoretical probability",
      why: "It is calculated from the possible outcomes."
    },

    {
      q: "A coin is tossed 100 times and Heads occurs 54 times. Find the experimental probability of Heads.",
      hint: "Use observed Heads ÷ total tosses.",
      steps: [
        "Heads occurred 54 times.",
        "There were 100 tosses.",
        "Experimental probability = 54/100 = 27/50."
      ],
      ans: "27/50",
      why: "The probability is based on the actual experiment."
    }
  ]
);


// ============================================================
// SCREEN 19 — EXPECTED FREQUENCY
// ============================================================

add(
  "math",
  "probability",
  "Expected Frequency",

  `
<h2>Expected Frequency</h2>

<p><b>One concept:</b> Use probability to estimate how many times an event should occur in a given number of trials.</p>

<p>
The expected frequency is found using:
</p>

<p>
\\[
\\boxed{
\\text{Expected frequency}
=
\\text{probability}\\times\\text{number of trials}
}
\\]
</p>

<h3>Example 1</h3>

<p>A fair coin is tossed 100 times.</p>

<p>The probability of Heads is:</p>

<p>
\\[
P(H)=\\frac12
\\]
</p>

<p>Expected number of Heads:</p>

<p>
\\[
\\frac12\\times100
\\]
</p>

<p>
\\[
=50
\\]
</p>

<p>
\\[
\\boxed{50}
\\]
</p>

<h3>Example 2</h3>

<p>A fair die is rolled 60 times.</p>

<p>The probability of getting a 6 is:</p>

<p>
\\[
P(6)=\\frac16
\\]
</p>

<p>Expected number of sixes:</p>

<p>
\\[
\\frac16\\times60
\\]
</p>

<p>
\\[
=10
\\]
</p>

<p>
\\[
\\boxed{10}
\\]
</p>

<h3>Example 3</h3>

<p>A spinner has probability:</p>

<p>
\\[
P(Red)=\\frac25
\\]
</p>

<p>It is spun 100 times.</p>

<p>Expected red results:</p>

<p>
\\[
\\frac25\\times100
\\]
</p>

<p>
=40
</p>

<p>
\\[
\\boxed{40}
\\]
</p>

<h3>Important</h3>

<p>
Expected frequency is a prediction based on probability. It does not guarantee that the exact number will occur.
</p>
`,

  [
    {
      q: "A fair coin is tossed 80 times. Find the expected number of Heads.",
      hint: "P(Heads) = 1/2.",
      steps: [
        "Expected frequency = probability × trials.",
        "Expected Heads = 1/2 × 80.",
        "Expected Heads = 40."
      ],
      ans: "40",
      why: "Half of 80 is 40."
    },

    {
      q: "A fair die is rolled 120 times. Find the expected number of 5s.",
      hint: "P(5) = 1/6.",
      steps: [
        "Expected frequency = 1/6 × 120.",
        "120 ÷ 6 = 20.",
        "Expected number of 5s = 20."
      ],
      ans: "20",
      why: "Each individual face has probability 1/6."
    },

    {
      q: "An event has probability 3/10. It is repeated 200 times. Find the expected frequency.",
      hint: "Multiply 3/10 by 200.",
      steps: [
        "Expected frequency = 3/10 × 200.",
        "200 ÷ 10 = 20.",
        "20 × 3 = 60."
      ],
      ans: "60",
      why: "The probability predicts about 60 occurrences in 200 trials."
    }
  ]
);


// ============================================================
// SCREEN 20 — PROBABILITY OF A OR B
// ============================================================

add(
  "math",
  "probability",
  "Probability of A or B",

  `
<h2>Probability of A or B</h2>

<p><b>One concept:</b> Understand that "A or B" means the outcome belongs to at least one of the two events.</p>

<p>
The word <b>or</b> means we include outcomes satisfying A, outcomes satisfying B, or both.
</p>

<h3>Example 1</h3>

<p>A die is rolled.</p>

<p>Let:</p>

<p>
\\[
A=\\{1,2\\}
\\]
</p>

<p>and:</p>

<p>
\\[
B=\\{5,6\\}
\\]
</p>

<p>For "A or B", combine the outcomes:</p>

<p>
\\[
\\{1,2,5,6\\}
\\]
</p>

<p>There are 4 favourable outcomes.</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ or }B)=\\frac46=\\frac23
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled.</p>

<p>Let A = getting 1.</p>

<p>Let B = getting 6.</p>

<p>For A or B:</p>

<p>
\\[
\\{1,6\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ or }B)=\\frac26=\\frac13
\\]
</p>

<h3>Example 3</h3>

<p>A number is selected from:</p>

<p>
\\[
\\{1,2,3,4,5\\}
\\]
</p>

<p>Let A = number less than 3:</p>

<p>
\\[
A=\\{1,2\\}
\\]
</p>

<p>Let B = number greater than 4:</p>

<p>
\\[
B=\\{5\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
A\\text{ or }B=\\{1,2,5\\}
\\]
</p>

<p>So:</p>

<p>
\\[
P(A\\text{ or }B)=\\frac35
\\]
</p>

<h3>Key Action</h3>

<p>
For now, focus only on what <b>"or"</b> means:
</p>

<p>
<b>Include outcomes belonging to A or B.</b>
</p>
`,

  [
    {
      q: "A die is rolled. A = {1} and B = {6}. List the outcomes for A or B.",
      hint: "Include both 1 and 6.",
      steps: [
        "A contains 1.",
        "B contains 6.",
        "Therefore A or B = {1,6}."
      ],
      ans: "{1,6}",
      why: "An outcome is included if it belongs to A or B."
    },

    {
      q: "A number is selected from {1,2,3,4,5}. A = {1,2} and B = {4,5}. Find A or B.",
      hint: "Combine the two sets.",
      steps: [
        "A contains 1 and 2.",
        "B contains 4 and 5.",
        "Therefore A or B = {1,2,4,5}."
      ],
      ans: "{1,2,4,5}",
      why: "All outcomes belonging to either event are included."
    },

    {
      q: "A die is rolled. A = {2,4} and B = {5}. Find P(A or B).",
      hint: "First count the outcomes in A or B.",
      steps: [
        "A or B = {2,4,5}.",
        "There are 3 favourable outcomes.",
        "There are 6 total outcomes.",
        "P(A or B) = 3/6 = 1/2."
      ],
      ans: "1/2",
      why: "Three die outcomes satisfy at least one of the two events."
    }
  ]
);


// ============================================================
// SCREEN 21 — MUTUALLY EXCLUSIVE EVENTS
// ============================================================

add(
  "math",
  "probability",
  "Mutually Exclusive Events",

  `
<h2>Mutually Exclusive Events</h2>

<p><b>One concept:</b> Identify two events that cannot happen at the same time.</p>

<p>
Two events are <b>mutually exclusive</b> if they have no outcome in common.
</p>

<h3>Example 1</h3>

<p>A die is rolled.</p>

<p>Let:</p>

<p>
\\[
A=\\{1,2\\}
\\]
</p>

<p>and:</p>

<p>
\\[
B=\\{5,6\\}
\\]
</p>

<p>There is no common outcome.</p>

<p>
\\[
A\\cap B=\\varnothing
\\]
</p>

<p>Therefore A and B are mutually exclusive.</p>

<h3>Example 2</h3>

<p>A die is rolled.</p>

<p>Let A = getting an even number:</p>

<p>
\\[
A=\\{2,4,6\\}
\\]
</p>

<p>Let B = getting an odd number:</p>

<p>
\\[
B=\\{1,3,5\\}
\\]
</p>

<p>No number is both even and odd.</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{A\\text{ and }B\\text{ are mutually exclusive}}
\\]
</p>

<h3>Example 3</h3>

<p>A card is selected from:</p>

<p>
\\[
\\{1,2,3,4,5\\}
\\]
</p>

<p>Let A = selecting 1.</p>

<p>Let B = selecting 3.</p>

<p>You cannot select both 1 and 3 in one selection.</p>

<p>Therefore A and B are mutually exclusive.</p>

<h3>Counterexample</h3>

<p>Consider:</p>

<p>
\\[
A=\\{1,2,3\\}
\\]
</p>

<p>and:</p>

<p>
\\[
B=\\{3,4,5\\}
\\]
</p>

<p>Both contain 3.</p>

<p>Therefore they are <b>not</b> mutually exclusive.</p>

<h3>Key Test</h3>

<p>
Ask:
</p>

<p>
<b>"Can one outcome belong to both events?"</b>
</p>

<p>
If no, the events are mutually exclusive.
</p>
`,

  [
    {
      q: "A die is rolled. A = {1,2} and B = {5,6}. Are A and B mutually exclusive?",
      hint: "Look for a common outcome.",
      steps: [
        "A contains 1 and 2.",
        "B contains 5 and 6.",
        "There is no common outcome.",
        "Therefore they are mutually exclusive."
      ],
      ans: "Yes",
      why: "The two events cannot occur at the same time."
    },

    {
      q: "A die is rolled. A = {2,4,6} and B = {1,3,5}. Are they mutually exclusive?",
      hint: "Can a number be both even and odd?",
      steps: [
        "A contains the even outcomes.",
        "B contains the odd outcomes.",
        "There is no common outcome.",
        "Therefore they are mutually exclusive."
      ],
      ans: "Yes",
      why: "No die outcome is both even and odd."
    },

    {
      q: "A die is rolled. A = {1,2,3} and B = {3,4,5}. Are they mutually exclusive?",
      hint: "Check whether the two sets share an outcome.",
      steps: [
        "A contains 3.",
        "B also contains 3.",
        "Therefore the events have a common outcome.",
        "They are not mutually exclusive."
      ],
      ans: "No",
      why: "The outcome 3 can belong to both events."
    }
  ]
);
// ============================================================
// SCREEN 22 — ADDITION RULE FOR MUTUALLY EXCLUSIVE EVENTS
// ============================================================

add(
  "math",
  "probability",
  "Addition Rule for Mutually Exclusive Events",

  `
<h2>Addition Rule for Mutually Exclusive Events</h2>

<p><b>One concept:</b> Add the probabilities of two mutually exclusive events.</p>

<p>
If A and B are mutually exclusive, they cannot happen at the same time.
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{P(A\\text{ or }B)=P(A)+P(B)}
\\]
</p>

<h3>Example 1</h3>

<p>A die is rolled.</p>

<p>Let A = getting 1.</p>

<p>Let B = getting 6.</p>

<p>These events are mutually exclusive.</p>

<p>
\\[
P(A)=\\frac16
\\]
</p>

<p>
\\[
P(B)=\\frac16
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ or }B)
=
\\frac16+\\frac16
\\]
</p>

<p>
\\[
=\\frac26
\\]
</p>

<p>
\\[
\\boxed{P(A\\text{ or }B)=\\frac13}
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled.</p>

<p>Let A = getting 2.</p>

<p>Let B = getting 4.</p>

<p>
\\[
P(A)=\\frac16
\\]
</p>

<p>
\\[
P(B)=\\frac16
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ or }B)
=
\\frac16+\\frac16
=
\\frac13
\\]
</p>

<h3>Example 3</h3>

<p>A bag contains 3 red balls and 7 blue balls.</p>

<p>One ball is selected.</p>

<p>Let A = red.</p>

<p>Let B = blue.</p>

<p>These events cannot happen together.</p>

<p>
\\[
P(A)=\\frac3{10}
\\]
</p>

<p>
\\[
P(B)=\\frac7{10}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ or }B)
=
\\frac3{10}+\\frac7{10}
=
1
\\]
</p>

<h3>Key Rule</h3>

<p>
Only use this simple addition rule when the events are <b>mutually exclusive</b>.
</p>
`,

  [
    {
      q: "A die is rolled. Find the probability of getting 1 or 5.",
      hint: "The two outcomes cannot happen on the same roll.",
      steps: [
        "P(1) = 1/6.",
        "P(5) = 1/6.",
        "P(1 or 5) = 1/6 + 1/6.",
        "Therefore P(1 or 5) = 1/3."
      ],
      ans: "1/3",
      why: "The events are mutually exclusive, so their probabilities are added."
    },

    {
      q: "A bag contains 4 red balls and 6 blue balls. Find P(red or blue).",
      hint: "A single ball cannot be both red and blue.",
      steps: [
        "P(red) = 4/10.",
        "P(blue) = 6/10.",
        "P(red or blue) = 4/10 + 6/10.",
        "Therefore P(red or blue) = 1."
      ],
      ans: "1",
      why: "Every ball is either red or blue."
    },

    {
      q: "A die is rolled. P(A) = 2/6 and P(B) = 1/6. A and B are mutually exclusive. Find P(A or B).",
      hint: "Add the two probabilities.",
      steps: [
        "P(A or B) = P(A) + P(B).",
        "P(A or B) = 2/6 + 1/6.",
        "P(A or B) = 3/6.",
        "P(A or B) = 1/2."
      ],
      ans: "1/2",
      why: "Mutually exclusive probabilities can be added directly."
    }
  ]
);


// ============================================================
// SCREEN 23 — PROBABILITY OF A AND B
// ============================================================

add(
  "math",
  "probability",
  "Probability of A and B",

  `
<h2>Probability of A and B</h2>

<p><b>One concept:</b> Understand that "A and B" requires both conditions to occur.</p>

<p>
The word <b>and</b> means that both events must happen.
</p>

<h3>Example 1</h3>

<p>A coin is tossed twice.</p>

<p>Let A = getting Head on the first toss.</p>

<p>Let B = getting Head on the second toss.</p>

<p>For A and B to happen:</p>

<p>
\\[
HH
\\]
</p>

<p>Only HH satisfies both conditions.</p>

<p>The sample space is:</p>

<p>
\\[
\\{HH,HT,TH,TT\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ and }B)=\\frac14
\\]
</p>

<h3>Example 2</h3>

<p>A die is rolled.</p>

<p>Let A = getting an even number.</p>

<p>Let B = getting a number greater than 4.</p>

<p>A:</p>

<p>
\\[
\\{2,4,6\\}
\\]
</p>

<p>B:</p>

<p>
\\[
\\{5,6\\}
\\]
</p>

<p>The outcome satisfying both is:</p>

<p>
\\[
\\{6\\}
\\]
</p>

<p>Therefore the event "A and B" contains only 6.</p>

<h3>Example 3</h3>

<p>A number is selected from 1 to 10.</p>

<p>Let A = an even number.</p>

<p>Let B = a number greater than 7.</p>

<p>A:</p>

<p>
\\[
\\{2,4,6,8,10\\}
\\]
</p>

<p>B:</p>

<p>
\\[
\\{8,9,10\\}
\\]
</p>

<p>Both conditions are satisfied by:</p>

<p>
\\[
\\{8,10\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\text{ and }B)=\\frac2{10}=\\frac15
\\]
</p>

<h3>Key Action</h3>

<p>
For <b>AND</b>, find the outcomes that satisfy <b>both conditions simultaneously</b>.
</p>
`,

  [
    {
      q: "A number is selected from 1 to 6. A = even and B = greater than 4. Find A and B.",
      hint: "Find numbers that are both even and greater than 4.",
      steps: [
        "Even numbers are 2, 4 and 6.",
        "Numbers greater than 4 are 5 and 6.",
        "The common outcome is 6.",
        "Therefore A and B = {6}."
      ],
      ans: "{6}",
      why: "The outcome must satisfy both conditions."
    },

    {
      q: "A number is selected from 1 to 10. A = multiple of 2 and B = greater than 7. Find A and B.",
      hint: "List the even numbers greater than 7.",
      steps: [
        "Even numbers greater than 7 are 8 and 10.",
        "Therefore A and B = {8,10}."
      ],
      ans: "{8,10}",
      why: "Both conditions are satisfied by 8 and 10."
    },

    {
      q: "A coin is tossed twice. What outcome represents Head on both tosses?",
      hint: "Both tosses must be H.",
      steps: [
        "The first toss must be H.",
        "The second toss must also be H.",
        "Therefore the outcome is HH."
      ],
      ans: "HH",
      why: "Both conditions must happen."
    }
  ]
);


// ============================================================
// SCREEN 24 — INDEPENDENT EVENTS
// ============================================================

add(
  "math",
  "probability",
  "Independent Events",

  `
<h2>Independent Events</h2>

<p><b>One concept:</b> Recognise events where the occurrence of one event does not change the probability of the other.</p>

<p>
Two events are <b>independent</b> when the result of one does not affect the result of the other.
</p>

<h3>Example 1: Two Coin Tosses</h3>

<p>A coin is tossed twice.</p>

<p>The first toss does not change the coin.</p>

<p>Therefore the result of the first toss does not affect the probabilities on the second toss.</p>

<p>For example:</p>

<p>
\\[
P(H\\text{ on first})=\\frac12
\\]
</p>

<p>and:</p>

<p>
\\[
P(H\\text{ on second})=\\frac12
\\]
</p>

<p>The events are independent.</p>

<h3>Example 2: Die Rolls</h3>

<p>A die is rolled twice.</p>

<p>Suppose the first roll is 2.</p>

<p>The die is rolled again.</p>

<p>The probability of getting 6 on the second roll is still:</p>

<p>
\\[
\\frac16
\\]
</p>

<p>The first roll did not change the second roll.</p>

<p>Therefore the rolls are independent.</p>

<h3>Example 3: Two Separate Coins</h3>

<p>One coin is tossed and another separate coin is tossed.</p>

<p>The result of the first coin does not change the second coin.</p>

<p>Therefore the events are independent.</p>

<h3>Contrast</h3>

<p>
Suppose a ball is taken from a bag and <b>not replaced</b>.
</p>

<p>
The number of balls remaining changes.
</p>

<p>
Therefore the probability on the next selection can change.
</p>

<p>
That situation is not independent.
</p>

<h3>Key Test</h3>

<p>
Ask:
</p>

<p>
<b>"Does the first event change the probability of the second event?"</b>
</p>

<p>
If it does not, the events are independent.
</p>
`,

  [
    {
      q: "A coin is tossed twice. Are the two tosses independent?",
      hint: "Does the first toss change the second toss?",
      steps: [
        "The first result does not change the coin.",
        "The second toss still has the same probabilities.",
        "Therefore the tosses are independent."
      ],
      ans: "Yes",
      why: "The first toss does not affect the second toss."
    },

    {
      q: "A die is rolled twice. Does getting 6 on the first roll change the probability of getting 6 on the second roll?",
      hint: "The die is reset naturally after each roll.",
      steps: [
        "The first roll does not change the die.",
        "The second roll still has six possible outcomes.",
        "Therefore the probability remains 1/6."
      ],
      ans: "No",
      why: "The two rolls are independent."
    },

    {
      q: "A ball is removed from a bag and not replaced. Does the first selection potentially change the probability of the second selection?",
      hint: "Think about how many balls remain.",
      steps: [
        "One ball is removed.",
        "The contents of the bag change.",
        "Therefore the probability of the second selection can change."
      ],
      ans: "Yes",
      why: "Removing the first ball changes the experiment."
    }
  ]
);


// ============================================================
// SCREEN 25 — MULTIPLICATION RULE FOR INDEPENDENT EVENTS
// ============================================================

add(
  "math",
  "probability",
  "Multiplication Rule for Independent Events",

  `
<h2>Multiplication Rule for Independent Events</h2>

<p><b>One concept:</b> Multiply probabilities when independent events must both happen.</p>

<p>
For independent events A and B:
</p>

<p>
\\[
\\boxed{
P(A\\text{ and }B)=P(A)\\times P(B)
}
\\]
</p>

<h3>Example 1: Two Heads</h3>

<p>A fair coin is tossed twice.</p>

<p>Probability of Head on the first toss:</p>

<p>
\\[
\\frac12
\\]
</p>

<p>Probability of Head on the second toss:</p>

<p>
\\[
\\frac12
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(HH)=\\frac12\\times\\frac12
\\]
</p>

<p>
\\[
\\boxed{P(HH)=\\frac14}
\\]
</p>

<h3>Example 2: Two Sixes</h3>

<p>A die is rolled twice.</p>

<p>Probability of 6 on each roll:</p>

<p>
\\[
\\frac16
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(6\\text{ and }6)
=
\\frac16\\times\\frac16
\\]
</p>

<p>
\\[
\\boxed{\\frac1{36}}
\\]
</p>

<h3>Example 3: Head then Tail</h3>

<p>A fair coin is tossed twice.</p>

<p>
\\[
P(H)=\\frac12
\\]
</p>

<p>
\\[
P(T)=\\frac12
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(H\\text{ then }T)
=
\\frac12\\times\\frac12
\\]
</p>

<p>
\\[
\\boxed{\\frac14}
\\]
</p>

<h3>Key Action</h3>

<p>
If independent events must <b>both</b> occur, multiply their probabilities.
</p>
`,

  [
    {
      q: "A fair coin is tossed twice. Find P(HH).",
      hint: "Multiply the probability of Head on each toss.",
      steps: [
        "P(H) = 1/2 on the first toss.",
        "P(H) = 1/2 on the second toss.",
        "P(HH) = 1/2 × 1/2 = 1/4."
      ],
      ans: "1/4",
      why: "The tosses are independent and both Heads must occur."
    },

    {
      q: "A die is rolled twice. Find the probability of getting 3 on both rolls.",
      hint: "Each 3 has probability 1/6.",
      steps: [
        "P(3) = 1/6 on the first roll.",
        "P(3) = 1/6 on the second roll.",
        "Multiply: 1/6 × 1/6 = 1/36."
      ],
      ans: "1/36",
      why: "The two rolls are independent."
    },

    {
      q: "A fair coin is tossed twice. Find P(HT).",
      hint: "Multiply P(H) by P(T).",
      steps: [
        "P(H) = 1/2.",
        "P(T) = 1/2.",
        "P(HT) = 1/2 × 1/2 = 1/4."
      ],
      ans: "1/4",
      why: "Both independent events must happen in the specified order."
    }
  ]
);


// ============================================================
// SCREEN 26 — TWO-STAGE EXPERIMENTS
// ============================================================

add(
  "math",
  "probability",
  "Two-Stage Experiments",

  `
<h2>Two-Stage Experiments</h2>

<p><b>One concept:</b> Identify the two stages of a probability experiment.</p>

<p>
A <b>two-stage experiment</b> is an experiment performed in two steps.
</p>

<h3>Example 1: Two Coin Tosses</h3>

<p>The experiment has two stages:</p>

<p>
<b>Stage 1:</b> Toss the coin.
</p>

<p>
<b>Stage 2:</b> Toss the coin again.
</p>

<p>The possible outcomes are:</p>

<p>
\\[
HH,HT,TH,TT
\\]
</p>

<h3>Example 2: Coin and Die</h3>

<p>Suppose a coin is tossed and then a die is rolled.</p>

<p>Stage 1:</p>

<p>
\\[
H\\text{ or }T
\\]
</p>

<p>Stage 2:</p>

<p>
\\[
1,2,3,4,5,6
\\]
</p>

<p>Each first-stage result can be followed by each second-stage result.</p>

<p>For example:</p>

<p>
\\[
H1,H2,H3,H4,H5,H6
\\]
</p>

<p>and:</p>

<p>
\\[
T1,T2,T3,T4,T5,T6
\\]
</p>

<h3>Example 3: Selecting Two Items</h3>

<p>A ball is selected from a bag, then another ball is selected.</p>

<p>Stage 1:</p>

<p>
First selection
</p>

<p>Stage 2:</p>

<p>
Second selection
</p>

<p>
Whether the second stage has the same probabilities as the first depends on whether the first item is replaced.
</p>

<h3>Key Action</h3>

<p>
Before solving a multi-step probability problem, identify:
</p>

<p>
<b>What happens first?</b>
</p>

<p>
<b>What happens second?</b>
</p>
`,

  [
    {
      q: "A coin is tossed twice. Identify the two stages.",
      hint: "Think about what happens first and second.",
      steps: [
        "Stage 1 is the first toss.",
        "Stage 2 is the second toss."
      ],
      ans: "First toss, then second toss",
      why: "The experiment consists of two consecutive actions."
    },

    {
      q: "A die is rolled and then a coin is tossed. What is Stage 1?",
      hint: "Which action happens first?",
      steps: [
        "The die is rolled first.",
        "Therefore the die roll is Stage 1."
      ],
      ans: "Rolling the die",
      why: "Stage 1 is the first action in the experiment."
    },

    {
      q: "A coin is tossed and then a die is rolled. What is Stage 2?",
      hint: "Which action happens second?",
      steps: [
        "The coin is tossed first.",
        "The die is rolled second.",
        "Therefore the die roll is Stage 2."
      ],
      ans: "Rolling the die",
      why: "Stage 2 is the second action."
    }
  ]
);


// ============================================================
// SCREEN 27 — TREE DIAGRAMS
// ============================================================

add(
  "math",
  "probability",
  "Tree Diagrams",

  `
<h2>Tree Diagrams</h2>

<p><b>One concept:</b> Represent the possible outcomes of a multi-stage experiment using branches.</p>

<p>
A <b>tree diagram</b> shows each possible result at each stage of an experiment.
</p>

<h3>Example: Two Coin Tosses</h3>

<p>First toss:</p>

<p>
\\[
H\\quad T
\\]
</p>

<p>From H, the second toss can be H or T:</p>

<p>
\\[
HH\\quad HT
\\]
</p>

<p>From T, the second toss can also be H or T:</p>

<p>
\\[
TH\\quad TT
\\]
</p>

<p>The four final outcomes are:</p>

<p>
\\[
\\boxed{HH,HT,TH,TT}
\\]
</p>

<h3>Example 2: Coin Then Die</h3>

<p>The first stage has two branches:</p>

<p>
\\[
H,T
\\]
</p>

<p>Each branch then has six possible die results:</p>

<p>
\\[
1,2,3,4,5,6
\\]
</p>

<p>The H branch gives:</p>

<p>
\\[
H1,H2,H3,H4,H5,H6
\\]
</p>

<p>The T branch gives:</p>

<p>
\\[
T1,T2,T3,T4,T5,T6
\\]
</p>

<p>There are:</p>

<p>
\\[
2\\times6=12
\\]
</p>

<p>final outcomes.</p>

<h3>Key Action</h3>

<p>
At each stage, draw a branch for every possible result.
</p>

<p>
Each complete path from the beginning to the end represents one final outcome.
</p>
`,

  [
    {
      q: "A coin is tossed twice. How many final branches/outcomes does the tree diagram have?",
      hint: "Each toss has 2 possible results.",
      steps: [
        "The first toss has 2 possibilities.",
        "Each possibility leads to 2 second-stage possibilities.",
        "Therefore there are 2 × 2 = 4 final outcomes."
      ],
      ans: "4",
      why: "The four paths are HH, HT, TH and TT."
    },

    {
      q: "A coin is tossed and then a die is rolled. How many final outcomes are there?",
      hint: "Multiply the number of first-stage outcomes by second-stage outcomes.",
      steps: [
        "The coin has 2 outcomes.",
        "The die has 6 outcomes.",
        "Total = 2 × 6 = 12."
      ],
      ans: "12",
      why: "Each coin result can be followed by each of the six die results."
    },

    {
      q: "A die is rolled twice. How many final outcomes would a complete tree diagram contain?",
      hint: "Each stage has 6 possibilities.",
      steps: [
        "First roll = 6 possibilities.",
        "Second roll = 6 possibilities.",
        "Total = 6 × 6 = 36."
      ],
      ans: "36",
      why: "Every first-roll outcome can be followed by every second-roll outcome."
    }
  ]
);


// ============================================================
// SCREEN 28 — WITH REPLACEMENT
// ============================================================

add(
  "math",
  "probability",
  "Sampling With Replacement",

  `
<h2>Sampling With Replacement</h2>

<p><b>One concept:</b> Understand that replacing an item keeps the contents of the collection unchanged.</p>

<p>
When an item is selected and then <b>returned</b> before the next selection, the experiment is called <b>with replacement</b>.
</p>

<h3>Example 1</h3>

<p>A bag contains:</p>

<p>
\\[
3\\text{ red balls and }2\\text{ blue balls}
\\]
</p>

<p>Total:</p>

<p>
\\[
5
\\]
</p>

<p>A red ball is selected.</p>

<p>It is returned to the bag.</p>

<p>The bag again contains:</p>

<p>
\\[
3\\text{ red and }2\\text{ blue}
\\]
</p>

<p>The total is still:</p>

<p>
\\[
5
\\]
</p>

<h3>Example 2</h3>

<p>A bag contains 4 green and 6 yellow balls.</p>

<p>A green ball is selected and replaced.</p>

<p>Before the second selection:</p>

<p>
\\[
4\\text{ green},6\\text{ yellow}
\\]
</p>

<p>The total is still 10.</p>

<h3>Example 3</h3>

<p>A card numbered 1 to 5 is selected.</p>

<p>The card is returned before another selection.</p>

<p>The same five cards are available again.</p>

<p>Therefore the contents have not changed.</p>

<h3>Key Idea</h3>

<p>
<b>With replacement:</b> select → return → select again.
</p>

<p>
The collection returns to its original composition before the next selection.
</p>
`,

  [
    {
      q: "A red ball is selected from a bag and returned before another selection. Is this with replacement?",
      hint: "Was the item returned?",
      steps: [
        "The ball was selected.",
        "The ball was returned.",
        "Therefore this is sampling with replacement."
      ],
      ans: "Yes",
      why: "The selected item is put back before the next selection."
    },

    {
      q: "A bag contains 5 red and 3 blue balls. A red ball is replaced after selection. How many balls are in the bag before the second selection?",
      hint: "The selected ball was returned.",
      steps: [
        "Initially there are 5 + 3 = 8 balls.",
        "The red ball is returned.",
        "Therefore 8 balls remain."
      ],
      ans: "8",
      why: "Replacement restores the original total."
    },

    {
      q: "A card is selected and returned before another card is selected. Does the first selection remove a card permanently?",
      hint: "What does replacement mean?",
      steps: [
        "The card is returned.",
        "Therefore it is available again.",
        "No card is permanently removed."
      ],
      ans: "No",
      why: "With replacement restores the selected item."
    }
  ]
);


// ============================================================
// SCREEN 29 — WITHOUT REPLACEMENT
// ============================================================

add(
  "math",
  "probability",
  "Sampling Without Replacement",

  `
<h2>Sampling Without Replacement</h2>

<p><b>One concept:</b> Understand that an item is not returned after selection.</p>

<p>
When an item is selected and <b>not returned</b>, the experiment is called <b>without replacement</b>.
</p>

<h3>Example 1</h3>

<p>A bag contains:</p>

<p>
\\[
3\\text{ red balls and }2\\text{ blue balls}
\\]
</p>

<p>Total:</p>

<p>
\\[
5
\\]
</p>

<p>A red ball is selected and not returned.</p>

<p>The bag now contains:</p>

<p>
\\[
2\\text{ red and }2\\text{ blue}
\\]
</p>

<p>Total:</p>

<p>
\\[
4
\\]
</p>

<h3>Example 2</h3>

<p>A bag contains 4 green and 6 yellow balls.</p>

<p>A green ball is selected and not replaced.</p>

<p>Before:</p>

<p>
\\[
4G+6Y=10
\\]
</p>

<p>After removing green:</p>

<p>
\\[
3G+6Y=9
\\]
</p>

<p>The contents have changed.</p>

<h3>Example 3</h3>

<p>There are 5 cards numbered 1 to 5.</p>

<p>Card 3 is selected and not returned.</p>

<p>The cards remaining are:</p>

<p>
\\[
\\{1,2,4,5\\}
\\]
</p>

<p>There are now 4 cards instead of 5.</p>

<h3>Key Idea</h3>

<p>
<b>Without replacement:</b> select → keep it out → select again.
</p>

<p>
The number and composition of available items changes.
</p>
`,

  [
    {
      q: "A blue ball is selected and kept out of the bag. Is this with or without replacement?",
      hint: "Was the ball returned?",
      steps: [
        "The ball was kept out.",
        "Therefore it was not returned.",
        "This is without replacement."
      ],
      ans: "Without replacement",
      why: "The selected item is not returned."
    },

    {
      q: "A bag has 4 red and 6 blue balls. One red ball is removed without replacement. How many balls remain?",
      hint: "Start with 10 balls and remove 1.",
      steps: [
        "Total initially = 4 + 6 = 10.",
        "One ball is removed.",
        "10 - 1 = 9."
      ],
      ans: "9",
      why: "Without replacement reduces the total number of available items."
    },

    {
      q: "Five cards are available. One is selected and not returned. How many cards remain?",
      hint: "Remove one from five.",
      steps: [
        "There are 5 cards initially.",
        "One card is removed.",
        "5 - 1 = 4."
      ],
      ans: "4",
      why: "The selected card is no longer available."
    }
  ]
);


// ============================================================
// SCREEN 30 — DEPENDENT EVENTS
// ============================================================

add(
  "math",
  "probability",
  "Dependent Events",

  `
<h2>Dependent Events</h2>

<p><b>One concept:</b> Recognise when the first event changes the probability of the second event.</p>

<p>
Two events are <b>dependent</b> when the result of one event affects the probability of the other.
</p>

<h3>Example 1</h3>

<p>A bag contains 3 red balls and 2 blue balls.</p>

<p>A red ball is selected <b>without replacement</b>.</p>

<p>Before the first selection:</p>

<p>
\\[
3R+2B=5
\\]
</p>

<p>After a red ball is removed:</p>

<p>
\\[
2R+2B=4
\\]
</p>

<p>The probability of red has changed.</p>

<p>Before:</p>

<p>
\\[
P(R)=\\frac35
\\]
</p>

<p>After a red ball is removed:</p>

<p>
\\[
P(R)=\\frac24=\\frac12
\\]
</p>

<p>Therefore the events are dependent.</p>

<h3>Example 2</h3>

<p>A bag contains 5 green balls and 5 yellow balls.</p>

<p>A green ball is removed and not replaced.</p>

<p>Initially:</p>

<p>
\\[
P(G)=\\frac5{10}=\\frac12
\\]
</p>

<p>After removal:</p>

<p>
\\[
P(G)=\\frac49
\\]
</p>

<p>The probability changed.</p>

<p>Therefore the selections are dependent.</p>

<h3>Example 3</h3>

<p>A card is selected from a deck and kept out.</p>

<p>Another card is then selected.</p>

<p>The number of available cards has changed.</p>

<p>Therefore the second selection depends on the first.</p>

<h3>Key Test</h3>

<p>
Ask:
</p>

<p>
<b>"Did the first event change the probability of the second?"</b>
</p>

<p>
If yes, the events are dependent.
</p>
`,

  [
    {
      q: "A bag has 4 red and 6 blue balls. A red ball is removed without replacement. Are the first and second selections dependent?",
      hint: "Does removing the red ball change the bag?",
      steps: [
        "The first red ball is removed.",
        "The contents of the bag change.",
        "Therefore the probability on the second selection changes.",
        "The events are dependent."
      ],
      ans: "Yes",
      why: "The first selection changes the conditions for the second."
    },

    {
      q: "A card is selected and not returned. Is the next card selection dependent on the first selection?",
      hint: "Does the number of cards remain the same?",
      steps: [
        "The first card is removed.",
        "The number of available cards decreases.",
        "Therefore the second selection is affected."
      ],
      ans: "Yes",
      why: "Without replacement changes the sample for the next selection."
    },

    {
      q: "A bag contains 3 red and 2 blue balls. One red ball is removed without replacement. Find the probability of red on the second selection.",
      hint: "After removing one red, how many red and total balls remain?",
      steps: [
        "Initially there are 3 red and 2 blue.",
        "One red is removed.",
        "Red remaining = 2.",
        "Total remaining = 4.",
        "Therefore P(red on second selection) = 2/4 = 1/2."
      ],
      ans: "1/2",
      why: "The first selection changed the contents of the bag."
    }
  ]
);


// ============================================================
// SCREEN 31 — CONDITIONAL PROBABILITY
// ============================================================

add(
  "math",
  "probability",
  "Conditional Probability",

  `
<h2>Conditional Probability</h2>

<p><b>One concept:</b> Find the probability of an event when we already know that another event has happened.</p>

<p>
< b>Conditional probability</b> means finding a probability under a condition.
</p>

<p>
We write:
</p>

<p>
\\[
\\boxed{P(A\\mid B)}
\\]
</p>

<p>
This means:
</p>

<p>
<b>"The probability of A given that B has happened."</b>
</p>

<h3>Example 1</h3>

<p>A bag contains 3 red balls and 2 blue balls.</p>

<p>Suppose we are told that the first ball selected was red and it was not replaced.</p>

<p>Originally:</p>

<p>
\\[
3R+2B=5
\\]
</p>

<p>After a red ball is removed:</p>

<p>
\\[
2R+2B=4
\\]
</p>

<p>Now find the probability that the second ball is red.</p>

<p>Given that a red ball has already been removed:</p>

<p>
\\[
P(R\\mid R\\text{ first})=\\frac24
\\]
</p>

<p>
\\[
\\boxed{P(R\\mid R\\text{ first})=\\frac12}
\\]
</p>

<h3>Example 2</h3>

<p>There are 5 boys and 7 girls in a group.</p>

<p>Suppose we are told that the selected student is from the group of girls.</p>

<p>Among the girls, there are 7 possible students.</p>

<p>If 3 of those girls wear glasses, then:</p>

<p>
\\[
P(\\text{glasses}\\mid\\text{girl})
=
\\frac37
\\]
</p>

<h3>Example 3</h3>

<p>A class contains 10 students who play football and 6 of these students are boys.</p>

<p>If we already know that the selected student plays football, then the relevant group is the football players.</p>

<p>The conditional probability of selecting a boy is:</p>

<p>
\\[
P(\\text{boy}\\mid\\text{football})
=
\\frac6{10}
=
\\frac35
\\]
</p>

<h3>Key Action</h3>

<p>
The condition tells you which group to work inside.
</p>

<p>
Instead of using the whole original sample, restrict your attention to the group described by the condition.
</p>
`,

  [
    {
      q: "A class has 8 boys and 12 girls. Among the girls, 4 wear glasses. Find P(glasses | girl).",
      hint: "The condition says the student is a girl, so use the 12 girls as the relevant group.",
      steps: [
        "The condition restricts us to the girls.",
        "There are 12 girls.",
        "4 girls wear glasses.",
        "P(glasses | girl) = 4/12 = 1/3."
      ],
      ans: "1/3",
      why: "Conditional probability uses the group specified by the condition."
    },

    {
      q: "A group contains 5 boys and 7 girls. Three of the boys wear glasses. Find P(glasses | boy).",
      hint: "Work only within the boys.",
      steps: [
        "The condition says the person is a boy.",
        "There are 5 boys.",
        "3 boys wear glasses.",
        "P(glasses | boy) = 3/5."
      ],
      ans: "3/5",
      why: "The relevant sample is the group of boys."
    },

    {
      q: "A bag contains 3 red and 2 blue balls. A red ball is removed without replacement. Find the probability that the second ball is blue, given that the first was red.",
      hint: "After removing one red, what remains?",
      steps: [
        "Initially there are 3 red and 2 blue.",
        "One red is removed.",
        "There are now 2 red and 2 blue balls.",
        "There are 4 balls remaining.",
        "P(blue | first was red) = 2/4 = 1/2."
      ],
      ans: "1/2",
      why: "The known first result changes the group of possible outcomes for the second selection."
    }
  ]
);// ============================================================
// PROBABILITY — BATCH 5
// SCREENS 32–41
// ============================================================


// ------------------------------------------------------------
// SCREEN 32 — TWO-WAY TABLES
// ONE ACTION: READ A VALUE FROM A TWO-WAY TABLE
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Reading a Two-Way Table",

  `
<h2>Reading a Two-Way Table</h2>

<p><b>One concept:</b> Read information from a table where two categories are compared.</p>

<h3>Example 1</h3>

<p>A class records whether students are boys or girls and whether they play football.</p>

<table border="1" cellpadding="8">
<tr>
  <th></th>
  <th>Football</th>
  <th>No Football</th>
  <th>Total</th>
</tr>
<tr>
  <th>Boys</th>
  <td>12</td>
  <td>8</td>
  <td>20</td>
</tr>
<tr>
  <th>Girls</th>
  <td>6</td>
  <td>14</td>
  <td>20</td>
</tr>
<tr>
  <th>Total</th>
  <td>18</td>
  <td>22</td>
  <td>40</td>
</tr>
</table>

<p>How many boys play football?</p>

<p>Find the row <b>Boys</b> and the column <b>Football</b>.</p>

<p>
\\[
\\boxed{12}
\\]
</p>

<h3>Example 2</h3>

<p>How many girls do not play football?</p>

<p>Find the row <b>Girls</b> and the column <b>No Football</b>.</p>

<p>
\\[
\\boxed{14}
\\]
</p>

<h3>Example 3</h3>

<p>How many students play football altogether?</p>

<p>Look at the total under the Football column.</p>

<p>
\\[
\\boxed{18}
\\]
</p>

<h3>The Skill</h3>

<p>
To read a two-way table:
</p>

<ol>
<li>Find the correct row.</li>
<li>Find the correct column.</li>
<li>Read the number where they meet.</li>
</ol>
`,

  [
    {
      q: "How many boys play football?",
      hint: "Use the Boys row and Football column.",
      steps: [
        "Find the Boys row.",
        "Move to the Football column.",
        "The value is 12."
      ],
      ans: "12",
      why: "The intersection of the Boys row and Football column contains 12."
    },

    {
      q: "How many girls do not play football?",
      hint: "Find the Girls row and No Football column.",
      steps: [
        "Find the Girls row.",
        "Move to the No Football column.",
        "The value is 14."
      ],
      ans: "14",
      why: "The table shows that 14 girls do not play football."
    },

    {
      q: "How many students play football altogether?",
      hint: "Look at the Football column total.",
      steps: [
        "Find the Football column.",
        "Look at its total.",
        "The total is 18."
      ],
      ans: "18",
      why: "The Football column total represents all students who play football."
    },

    {
      q: "How many boys are there altogether?",
      hint: "Look at the Boys row total.",
      steps: [
        "Find the Boys row.",
        "Look at the Total column.",
        "The value is 20."
      ],
      ans: "20",
      why: "The row total represents all boys in the class."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 33 — CONDITIONAL PROBABILITY FROM A TWO-WAY TABLE
// ONE ACTION: CALCULATE P(A|B)
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Conditional Probability from a Two-Way Table",

  `
<h2>Conditional Probability from a Two-Way Table</h2>

<p><b>One concept:</b> Calculate the probability of one event when we already know that another condition is true.</p>

<p>The notation is:</p>

<p>
\\[
\\boxed{P(A|B)}
\\]
</p>

<p>This means:</p>

<p>
<b>Probability of A given that B has happened.</b>
</p>

<h3>Example 1</h3>

<table border="1" cellpadding="8">
<tr>
  <th></th>
  <th>Football</th>
  <th>No Football</th>
  <th>Total</th>
</tr>
<tr>
  <th>Boys</th>
  <td>12</td>
  <td>8</td>
  <td>20</td>
</tr>
<tr>
  <th>Girls</th>
  <td>6</td>
  <td>14</td>
  <td>20</td>
</tr>
<tr>
  <th>Total</th>
  <td>18</td>
  <td>22</td>
  <td>40</td>
</tr>
</table>

<p>Find the probability that a student plays football, given that the student is a boy.</p>

<p>We are told the student is a <b>boy</b>.</p>

<p>Therefore, we only consider the 20 boys.</p>

<p>Of those 20 boys, 12 play football.</p>

<p>Therefore:</p>

<p>
\\[
P(\\text{Football}|\\text{Boy})
=
\\frac{12}{20}
\\]
</p>

<p>Simplify:</p>

<p>
\\[
\\frac{12}{20}=\\frac{3}{5}
\\]
</p>

<p>
\\[
\\boxed{P(\\text{Football}|\\text{Boy})=\\frac35}
\\]
</p>

<h3>Example 2</h3>

<p>Find the probability that a student is a girl, given that the student plays football.</p>

<p>There are 18 football players.</p>

<p>Of them, 6 are girls.</p>

<p>
\\[
P(\\text{Girl}|\\text{Football})
=
\\frac{6}{18}
=
\\frac13
\\]
</p>

<p>
\\[
\\boxed{\\frac13}
\\]
</p>

<h3>Example 3</h3>

<p>Find the probability that a student does not play football, given that the student is a girl.</p>

<p>There are 20 girls.</p>

<p>14 girls do not play football.</p>

<p>
\\[
P(\\text{No Football}|\\text{Girl})
=
\\frac{14}{20}
=
\\frac{7}{10}
\\]
</p>

<p>
\\[
\\boxed{\\frac7{10}}
\\]
</p>

<h3>The Key Idea</h3>

<p>
The condition tells you which group becomes the <b>new total</b>.
</p>

<p>
For example:
</p>

<p>
<b>Given that the student is a boy</b>
</p>

<p>
means the denominator is the number of boys.
</p>
`,

  [
    {
      q: "Using the table, find P(Football | Boy).",
      hint: "Once you know the student is a boy, use the total number of boys.",
      steps: [
        "There are 20 boys.",
        "12 boys play football.",
        "P(Football | Boy) = 12/20.",
        "12/20 = 3/5."
      ],
      ans: "3/5",
      why: "The condition Boy restricts the possible students to the 20 boys."
    },

    {
      q: "Find P(Girl | Football).",
      hint: "The student is already known to play football.",
      steps: [
        "There are 18 football players.",
        "6 football players are girls.",
        "P(Girl | Football) = 6/18.",
        "6/18 = 1/3."
      ],
      ans: "1/3",
      why: "The denominator must be the number of football players because Football is the given condition."
    },

    {
      q: "Find P(No Football | Girl).",
      hint: "The denominator is the number of girls.",
      steps: [
        "There are 20 girls.",
        "14 girls do not play football.",
        "P(No Football | Girl) = 14/20.",
        "14/20 = 7/10."
      ],
      ans: "7/10",
      why: "The condition Girl restricts the sample to the 20 girls."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 34 — VENN DIAGRAMS
// ONE ACTION: PLACE/IDENTIFY EVENTS IN REGIONS
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Venn Diagrams",

  `
<h2>Venn Diagrams</h2>

<p><b>One concept:</b> Represent events as regions inside circles.</p>

<p>A Venn diagram uses circles to represent sets or events.</p>

<h3>Example 1</h3>

<p>Suppose:</p>

<p>
\\[
A=\\{1,2,3\\}
\\]
</p>

<p>and</p>

<p>
\\[
B=\\{3,4,5\\}
\\]
</p>

<p>The numbers belonging to A are placed inside circle A.</p>

<p>The numbers belonging to B are placed inside circle B.</p>

<p>The number 3 belongs to both sets, so it goes in the region where the circles overlap.</p>

<h3>Example 2</h3>

<p>Suppose:</p>

<p>
\\[
A=\\{2,4,6\\}
\\]
</p>

<p>and</p>

<p>
\\[
B=\\{1,3,5\\}
\\]
</p>

<p>There are no common numbers.</p>

<p>Therefore the circles do not need an overlapping member.</p>

<h3>Example 3</h3>

<p>Let:</p>

<p>
\\[
A=\\{1,2,3,4\\}
\\]
</p>

<p>and:</p>

<p>
\\[
B=\\{3,4,5,6\\}
\\]
</p>

<p>The common values are:</p>

<p>
\\[
3,4
\\]
</p>

<p>So 3 and 4 belong in the overlapping part of the two circles.</p>

<h3>The Important Idea</h3>

<p>
A number that belongs to <b>both</b> events goes in the overlapping region.
</p>

<p>
A number belonging to only one event goes in that event's own region.
</p>
`,

  [
    {
      q: "A = {1,2,3} and B = {3,4,5}. Which number belongs to both events?",
      hint: "Find the value appearing in both sets.",
      steps: [
        "A contains 1, 2 and 3.",
        "B contains 3, 4 and 5.",
        "The common value is 3."
      ],
      ans: "3",
      why: "3 appears in both sets, so it belongs in the overlapping region."
    },

    {
      q: "A = {2,4,6} and B = {1,3,5}. Which numbers belong only to A?",
      hint: "Look for values in A that are not in B.",
      steps: [
        "A contains 2, 4 and 6.",
        "None of these values appears in B.",
        "Therefore all three belong only to A."
      ],
      ans: "{2,4,6}",
      why: "None of the elements of A is shared with B."
    },

    {
      q: "A = {1,2,3,4} and B = {3,4,5,6}. Which values belong in the overlapping region?",
      hint: "Find values appearing in both sets.",
      steps: [
        "A contains 1, 2, 3 and 4.",
        "B contains 3, 4, 5 and 6.",
        "The common values are 3 and 4."
      ],
      ans: "{3,4}",
      why: "The overlap contains elements belonging to both events."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 35 — INTERSECTION OF TWO EVENTS
// ONE ACTION: IDENTIFY A ∩ B
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Intersection of Two Events",

  `
<h2>Intersection of Two Events</h2>

<p><b>One concept:</b> Identify the outcomes that belong to both events.</p>

<p>The intersection of A and B is written:</p>

<p>
\\[
\\boxed{A\\cap B}
\\]
</p>

<p>It means:</p>

<p>
<b>A and B at the same time.</b>
</p>

<h3>Example 1</h3>

<p>Let:</p>

<p>
\\[
A=\\{1,2,3,4\\}
\\]
</p>

<p>
\\[
B=\\{3,4,5,6\\}
\\]
</p>

<p>The common values are 3 and 4.</p>

<p>Therefore:</p>

<p>
\\[
A\\cap B=\\{3,4\\}
\\]
</p>

<h3>Example 2</h3>

<p>On a die:</p>

<p>
A = even numbers
</p>

<p>
\\[
A=\\{2,4,6\\}
\\]
</p>

<p>and:</p>

<p>
B = numbers greater than 3
</p>

<p>
\\[
B=\\{4,5,6\\}
\\]
</p>

<p>The values satisfying both conditions are 4 and 6.</p>

<p>
\\[
\\boxed{A\\cap B=\\{4,6\\}}
\\]
</p>

<h3>Example 3</h3>

<p>Numbers from 1 to 10:</p>

<p>
A = multiples of 2
</p>

<p>
\\[
A=\\{2,4,6,8,10\\}
\\]
</p>

<p>
B = numbers greater than 7
</p>

<p>
\\[
B=\\{8,9,10\\}
\\]
</p>

<p>Common values:</p>

<p>
\\[
\\boxed{A\\cap B=\\{8,10\\}}
\\]
</p>

<h3>Key Question</h3>

<p>
Whenever you see:
</p>

<p>
\\[
A\\cap B
\\]
</p>

<p>ask:</p>

<p>
<b>"Which outcomes satisfy A AND B?"</b>
</p>
`,

  [
    {
      q: "A = {1,2,3,4} and B = {3,4,5,6}. Find A ∩ B.",
      hint: "Find the values appearing in both sets.",
      steps: [
        "Compare the two sets.",
        "3 appears in both.",
        "4 appears in both.",
        "Therefore A ∩ B = {3,4}."
      ],
      ans: "{3,4}",
      why: "The intersection contains only outcomes common to both events."
    },

    {
      q: "A = {2,4,6} and B = {4,5,6}. Find A ∩ B.",
      hint: "Which numbers occur in both sets?",
      steps: [
        "4 occurs in A and B.",
        "6 occurs in A and B.",
        "Therefore A ∩ B = {4,6}."
      ],
      ans: "{4,6}",
      why: "Both 4 and 6 satisfy both event conditions."
    },

    {
      q: "A = {2,4,6,8,10} and B = {8,9,10}. Find A ∩ B.",
      hint: "Find the common values.",
      steps: [
        "8 occurs in both sets.",
        "10 occurs in both sets.",
        "Therefore A ∩ B = {8,10}."
      ],
      ans: "{8,10}",
      why: "The intersection contains the outcomes shared by A and B."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 36 — GENERAL ADDITION RULE
// ONE ACTION: CALCULATE P(A OR B) FOR OVERLAPPING EVENTS
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "General Addition Rule",

  `
<h2>General Addition Rule</h2>

<p><b>One concept:</b> Calculate the probability of A or B when the events can overlap.</p>

<p>When A and B overlap:</p>

<p>
\\[
\\boxed{
P(A\\cup B)
=
P(A)+P(B)-P(A\\cap B)
}
\\]
</p>

<p>We subtract the intersection because it was counted twice.</p>

<h3>Example 1: A Die</h3>

<p>Let A be an even number:</p>

<p>
\\[
A=\\{2,4,6\\}
\\]
</p>

<p>Let B be greater than 3:</p>

<p>
\\[
B=\\{4,5,6\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A)=\\frac36
\\]
</p>

<p>
\\[
P(B)=\\frac36
\\]
</p>

<p>The intersection is:</p>

<p>
\\[
A\\cap B=\\{4,6\\}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(A\\cap B)=\\frac26
\\]
</p>

<p>Apply the rule:</p>

<p>
\\[
P(A\\cup B)
=
\\frac36+\\frac36-\\frac26
\\]
</p>

<p>
\\[
=\\frac46
\\]
</p>

<p>
\\[
\\boxed{P(A\\cup B)=\\frac23}
\\]
</p>

<h3>Example 2</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac12
\\]
</p>

<p>
\\[
P(B)=\\frac25
\\]
</p>

<p>
\\[
P(A\\cap B)=\\frac15
\\]
</p>

<p>Then:</p>

<p>
\\[
P(A\\cup B)
=
\\frac12+\\frac25-\\frac15
\\]
</p>

<p>
\\[
=\\frac12+\\frac15
\\]
</p>

<p>
\\[
=\\frac5{10}+\\frac2{10}
\\]
</p>

<p>
\\[
\\boxed{\\frac7{10}}
\\]
</p>

<h3>Why subtract?</h3>

<p>
The overlapping outcomes are included in both P(A) and P(B).
</p>

<p>
Without subtracting the overlap, those outcomes would be counted twice.
</p>
`,

  [
    {
      q: "A = {2,4,6} and B = {4,5,6} on a fair die. Find P(A ∪ B).",
      hint: "Use P(A ∪ B) = P(A) + P(B) - P(A ∩ B).",
      steps: [
        "P(A) = 3/6.",
        "P(B) = 3/6.",
        "A ∩ B = {4,6}, so P(A ∩ B) = 2/6.",
        "P(A ∪ B) = 3/6 + 3/6 - 2/6.",
        "P(A ∪ B) = 4/6 = 2/3."
      ],
      ans: "2/3",
      why: "The two events overlap, so their intersection must be subtracted once."
    },

    {
      q: "P(A) = 1/2, P(B) = 2/5 and P(A ∩ B) = 1/5. Find P(A ∪ B).",
      hint: "Substitute directly into the general addition rule.",
      steps: [
        "P(A ∪ B) = 1/2 + 2/5 - 1/5.",
        "2/5 - 1/5 = 1/5.",
        "Therefore P(A ∪ B) = 1/2 + 1/5.",
        "1/2 = 5/10 and 1/5 = 2/10.",
        "Therefore P(A ∪ B) = 7/10."
      ],
      ans: "7/10",
      why: "The intersection is subtracted to avoid counting the overlap twice."
    },

    {
      q: "P(A) = 3/4, P(B) = 1/2 and P(A ∩ B) = 1/4. Find P(A ∪ B).",
      hint: "Use the general addition rule.",
      steps: [
        "P(A ∪ B) = 3/4 + 1/2 - 1/4.",
        "1/2 = 2/4.",
        "Therefore P(A ∪ B) = 3/4 + 2/4 - 1/4.",
        "P(A ∪ B) = 4/4.",
        "Therefore P(A ∪ B) = 1."
      ],
      ans: "1",
      why: "Together the two events cover the entire sample space."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 37 — EXPECTED VALUE
// ONE ACTION: CALCULATE E(X)
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Expected Value",

  `
<h2>Expected Value</h2>

<p><b>One concept:</b> Calculate the long-run average outcome of a probability experiment.</p>

<p>Expected value is written as:</p>

<p>
\\[
\\boxed{E(X)}
\\]
</p>

<p>For possible values x with probabilities P(x):</p>

<p>
\\[
\\boxed{E(X)=\\sum xP(x)}
\\]
</p>

<p>This means:</p>

<p>
<b>Multiply each outcome by its probability, then add.</b>
</p>

<h3>Example 1</h3>

<p>A game gives:</p>

<ul>
<li>KSh 0 with probability 1/2</li>
<li>KSh 10 with probability 1/2</li>
</ul>

<p>Therefore:</p>

<p>
\\[
E(X)
=
0\\left(\\frac12\\right)
+
10\\left(\\frac12\\right)
\\]
</p>

<p>
\\[
=0+5
\\]
</p>

<p>
\\[
\\boxed{E(X)=5}
\\]
</p>

<h3>Example 2</h3>

<p>A game gives:</p>

<ul>
<li>0 points with probability 1/4</li>
<li>4 points with probability 3/4</li>
</ul>

<p>Therefore:</p>

<p>
\\[
E(X)
=
0\\left(\\frac14\\right)
+
4\\left(\\frac34\\right)
\\]
</p>

<p>
\\[
=0+3
\\]
</p>

<p>
\\[
\\boxed{E(X)=3}
\\]
</p>

<h3>Example 3</h3>

<p>A fair die is rolled.</p>

<p>The possible values are 1, 2, 3, 4, 5 and 6.</p>

<p>Each has probability 1/6.</p>

<p>Therefore:</p>

<p>
\\[
E(X)
=
1\\left(\\frac16\\right)
+2\\left(\\frac16\\right)
+3\\left(\\frac16\\right)
+4\\left(\\frac16\\right)
+5\\left(\\frac16\\right)
+6\\left(\\frac16\\right)
\\]
</p>

<p>
\\[
=
\\frac{1+2+3+4+5+6}{6}
\\]
</p>

<p>
\\[
=\\frac{21}{6}
\\]
</p>

<p>
\\[
\\boxed{E(X)=3.5}
\\]
</p>

<p>
Expected value does not have to be one of the actual outcomes.
</p>
`,

  [
    {
      q: "A game pays KSh 0 with probability 1/2 and KSh 10 with probability 1/2. Find the expected value.",
      hint: "Multiply each amount by its probability and add.",
      steps: [
        "E(X) = 0(1/2) + 10(1/2).",
        "0(1/2) = 0.",
        "10(1/2) = 5.",
        "E(X) = 5."
      ],
      ans: "5",
      why: "Expected value is the probability-weighted average of the possible outcomes."
    },

    {
      q: "A game gives 0 points with probability 1/4 and 4 points with probability 3/4. Find E(X).",
      hint: "Use E(X) = ΣxP(x).",
      steps: [
        "E(X) = 0(1/4) + 4(3/4).",
        "0(1/4) = 0.",
        "4(3/4) = 3.",
        "Therefore E(X) = 3."
      ],
      ans: "3",
      why: "Each outcome contributes its value multiplied by its probability."
    },

    {
      q: "A fair die is rolled. Find the expected value.",
      hint: "Add 1 through 6 and divide by 6.",
      steps: [
        "Each outcome has probability 1/6.",
        "E(X) = (1+2+3+4+5+6)/6.",
        "The sum is 21.",
        "21/6 = 3.5."
      ],
      ans: "3.5",
      why: "The expected value of a fair die is the probability-weighted average of all six outcomes."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 38 — EXPECTED VALUE FROM A TABLE
// ONE ACTION: CALCULATE E(X) USING TABLE VALUES
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Expected Value from a Table",

  `
<h2>Expected Value from a Probability Table</h2>

<p><b>One concept:</b> Calculate expected value when outcomes and probabilities are given in a table.</p>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>0</td>
  <td>0.2</td>
</tr>
<tr>
  <td>5</td>
  <td>0.5</td>
</tr>
<tr>
  <td>10</td>
  <td>0.3</td>
</tr>
</table>

<h3>Example 1</h3>

<p>Use:</p>

<p>
\\[
E(X)=\\sum xP(x)
\\]
</p>

<p>Multiply each value by its probability:</p>

<p>
\\[
0(0.2)=0
\\]
</p>

<p>
\\[
5(0.5)=2.5
\\]
</p>

<p>
\\[
10(0.3)=3
\\]
</p>

<p>Add:</p>

<p>
\\[
E(X)=0+2.5+3
\\]
</p>

<p>
\\[
\\boxed{E(X)=5.5}
\\]
</p>

<h3>Example 2</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>2</td>
  <td>0.4</td>
</tr>
<tr>
  <td>4</td>
  <td>0.3</td>
</tr>
<tr>
  <td>8</td>
  <td>0.3</td>
</tr>
</table>

<p>Multiply:</p>

<p>
\\[
2(0.4)=0.8
\\]
</p>

<p>
\\[
4(0.3)=1.2
\\]
</p>

<p>
\\[
8(0.3)=2.4
\\]
</p>

<p>Add:</p>

<p>
\\[
E(X)=0.8+1.2+2.4
\\]
</p>

<p>
\\[
\\boxed{E(X)=4.4}
\\]
</p>

<h3>Example 3</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>1</td>
  <td>0.5</td>
</tr>
<tr>
  <td>3</td>
  <td>0.3</td>
</tr>
<tr>
  <td>6</td>
  <td>0.2</td>
</tr>
</table>

<p>Therefore:</p>

<p>
\\[
E(X)
=
1(0.5)+3(0.3)+6(0.2)
\\]
</p>

<p>
\\[
=0.5+0.9+1.2
\\]
</p>

<p>
\\[
\\boxed{E(X)=2.6}
\\]
</p>

<h3>The Procedure</h3>

<ol>
<li>Take each outcome.</li>
<li>Multiply it by its probability.</li>
<li>Add all the products.</li>
</ol>
`,

  [
    {
      q: "Using X = 0,5,10 with probabilities 0.2,0.5,0.3, find E(X).",
      hint: "Multiply each X by its probability.",
      steps: [
        "0 × 0.2 = 0.",
        "5 × 0.5 = 2.5.",
        "10 × 0.3 = 3.",
        "Add: 0 + 2.5 + 3 = 5.5."
      ],
      ans: "5.5",
      why: "Expected value is found by adding all xP(x) products."
    },

    {
      q: "X takes values 2,4,8 with probabilities 0.4,0.3,0.3. Find E(X).",
      hint: "Calculate 2(0.4) + 4(0.3) + 8(0.3).",
      steps: [
        "2(0.4) = 0.8.",
        "4(0.3) = 1.2.",
        "8(0.3) = 2.4.",
        "Add: 0.8 + 1.2 + 2.4 = 4.4."
      ],
      ans: "4.4",
      why: "Each possible outcome is weighted by how likely it is."
    },

    {
      q: "X takes values 1,3,6 with probabilities 0.5,0.3,0.2. Find E(X).",
      hint: "Multiply and add.",
      steps: [
        "1(0.5) = 0.5.",
        "3(0.3) = 0.9.",
        "6(0.2) = 1.2.",
        "Add: 0.5 + 0.9 + 1.2 = 2.6."
      ],
      ans: "2.6",
      why: "The expected value is the sum of the probability-weighted outcomes."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 39 — PROBABILITY DISTRIBUTION
// ONE ACTION: READ A DISTRIBUTION
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Probability Distribution",

  `
<h2>Probability Distribution</h2>

<p><b>One concept:</b> Understand a table that assigns a probability to every possible value of a random variable.</p>

<p>A probability distribution shows:</p>

<ul>
<li>each possible value of X</li>
<li>the probability of each value</li>
</ul>

<h3>Example 1</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>1</td>
  <td>0.2</td>
</tr>
<tr>
  <td>2</td>
  <td>0.5</td>
</tr>
<tr>
  <td>3</td>
  <td>0.3</td>
</tr>
</table>

<p>This means:</p>

<p>
\\[
P(X=1)=0.2
\\]
</p>

<p>
\\[
P(X=2)=0.5
\\]
</p>

<p>
\\[
P(X=3)=0.3
\\]
</p>

<h3>Example 2</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>0</td>
  <td>0.4</td>
</tr>
<tr>
  <td>1</td>
  <td>0.4</td>
</tr>
<tr>
  <td>2</td>
  <td>0.2</td>
</tr>
</table>

<p>The probability of X = 2 is:</p>

<p>
\\[
\\boxed{P(X=2)=0.2}
\\]
</p>

<h3>Example 3</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>10</td>
  <td>0.1</td>
</tr>
<tr>
  <td>20</td>
  <td>0.6</td>
</tr>
<tr>
  <td>30</td>
  <td>0.3</td>
</tr>
</table>

<p>The probability that X is 20 is:</p>

<p>
\\[
\\boxed{P(X=20)=0.6}
\\]
</p>

<h3>The Key Idea</h3>

<p>
A probability distribution connects every possible outcome with its probability.
</p>

<p>
It answers the question:
</p>

<p>
<b>"How likely is each possible value of X?"</b>
</p>
`,

  [
    {
      q: "In the distribution X = 1,2,3 with probabilities 0.2,0.5,0.3, find P(X=2).",
      hint: "Find the row where X = 2.",
      steps: [
        "Locate X = 2.",
        "Its probability is 0.5."
      ],
      ans: "0.5",
      why: "The probability distribution assigns 0.5 to the outcome X = 2."
    },

    {
      q: "In the distribution X = 0,1,2 with probabilities 0.4,0.4,0.2, find P(X=0).",
      hint: "Read the probability beside X = 0.",
      steps: [
        "Locate X = 0.",
        "Its probability is 0.4."
      ],
      ans: "0.4",
      why: "The table states that X = 0 has probability 0.4."
    },

    {
      q: "In the distribution X = 10,20,30 with probabilities 0.1,0.6,0.3, find P(X=30).",
      hint: "Find the probability paired with 30.",
      steps: [
        "Locate X = 30.",
        "Its probability is 0.3."
      ],
      ans: "0.3",
      why: "The probability paired with X = 30 is 0.3."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 40 — CHECKING A PROBABILITY DISTRIBUTION
// ONE ACTION: TEST WHETHER A TABLE CAN BE A DISTRIBUTION
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Checking a Probability Distribution",

  `
<h2>Checking a Probability Distribution</h2>

<p><b>One concept:</b> Determine whether a table satisfies the rules for a probability distribution.</p>

<p>A valid probability distribution must satisfy two conditions:</p>

<p><b>Condition 1:</b> Every probability must be between 0 and 1.</p>

<p>
\\[
0\\leq P(X)\\leq1
\\]
</p>

<p><b>Condition 2:</b> All probabilities must add to 1.</p>

<p>
\\[
\\sum P(X)=1
\\]
</p>

<h3>Example 1</h3>

<table border="1" cellpadding="8">
<tr>
  <th>X</th>
  <th>P(X)</th>
</tr>
<tr>
  <td>1</td>
  <td>0.2</td>
</tr>
<tr>
  <td>2</td>
  <td>0.5</td>
</tr>
<tr>
  <td>3</td>
  <td>0.3</td>
</tr>
</table>

<p>Check the probabilities:</p>

<p>
\\[
0.2+0.5+0.3=1
\\]
</p>

<p>All probabilities are between 0 and 1.</p>

<p>Therefore this is a valid distribution.</p>

<h3>Example 2</h3>

<p>Probabilities:</p>

<p>
\\[
0.3,0.4,0.5
\\]
</p>

<p>Add them:</p>

<p>
\\[
0.3+0.4+0.5=1.2
\\]
</p>

<p>Since:</p>

<p>
\\[
1.2\\neq1
\\]
</p>

<p>It is <b>not</b> a valid probability distribution.</p>

<h3>Example 3</h3>

<p>Probabilities:</p>

<p>
\\[
0.2,0.5,-0.3,0.6
\\]
</p>

<p>The value:</p>

<p>
\\[
-0.3
\\]
</p>

<p>is less than 0.</p>

<p>Therefore it cannot be a probability.</p>

<p>So the table is not a valid probability distribution.</p>

<h3>The Two Checks</h3>

<ol>
<li>Check every probability is between 0 and 1.</li>
<li>Check that all probabilities add to 1.</li>
</ol>
`,

  [
    {
      q: "Are 0.2, 0.5 and 0.3 valid probabilities for a probability distribution?",
      hint: "Add them.",
      steps: [
        "0.2 + 0.5 + 0.3 = 1.",
        "Each value is between 0 and 1.",
        "Therefore the distribution is valid."
      ],
      ans: "Yes",
      why: "All probabilities are valid and their total is exactly 1."
    },

    {
      q: "Are 0.3, 0.4 and 0.5 a valid probability distribution?",
      hint: "Check their total.",
      steps: [
        "0.3 + 0.4 + 0.5 = 1.2.",
        "A probability distribution must total 1.",
        "Therefore it is not valid."
      ],
      ans: "No",
      why: "The probabilities add to 1.2 instead of 1."
    },

    {
      q: "Are 0.2, 0.5, -0.3 and 0.6 a valid probability distribution?",
      hint: "Check whether every probability is at least 0.",
      steps: [
        "A probability cannot be negative.",
        "-0.3 is less than 0.",
        "Therefore the distribution is invalid."
      ],
      ans: "No",
      why: "Every probability must lie between 0 and 1."
    }
  ]
);


// ------------------------------------------------------------
// SCREEN 41 — FINDING A MISSING PROBABILITY
// ONE ACTION: USE THE TOTAL OF 1
// ------------------------------------------------------------

add(
  "math",
  "probability",
  "Finding a Missing Probability",

  `
<h2>Finding a Missing Probability</h2>

<p><b>One concept:</b> Find an unknown probability when the other probabilities are known.</p>

<p>The probabilities in a complete distribution must add to 1.</p>

<p>
\\[
\\boxed{\\sum P(X)=1}
\\]
</p>

<h3>Example 1</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=0.2
\\]
</p>

<p>
\\[
P(B)=0.5
\\]
</p>

<p>
\\[
P(C)=?
\\]
</p>

<p>All probabilities must total 1.</p>

<p>Therefore:</p>

<p>
\\[
0.2+0.5+P(C)=1
\\]
</p>

<p>Add the known probabilities:</p>

<p>
\\[
0.7+P(C)=1
\\]
</p>

<p>Subtract 0.7:</p>

<p>
\\[
P(C)=1-0.7
\\]
</p>

<p>
\\[
\\boxed{P(C)=0.3}
\\]
</p>

<h3>Example 2</h3>

<p>Suppose:</p>

<p>
\\[
P(A)=\\frac14
\\]
</p>

<p>
\\[
P(B)=\\frac12
\\]
</p>

<p>
\\[
P(C)=?
\\]
</p>

<p>Since the total is 1:</p>

<p>
\\[
\\frac14+\\frac12+P(C)=1
\\]
</p>

<p>Convert to quarters:</p>

<p>
\\[
\\frac14+\\frac24+P(C)=\\frac44
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(C)=\\frac44-\\frac34
\\]
</p>

<p>
\\[
\\boxed{P(C)=\\frac14}
\\]
</p>

<h3>Example 3</h3>

<p>A probability distribution has:</p>

<p>
\\[
P(X=1)=0.1
\\]
</p>

<p>
\\[
P(X=2)=0.2
\\]
</p>

<p>
\\[
P(X=3)=0.4
\\]
</p>

<p>
\\[
P(X=4)=?
\\]
</p>

<p>Set the total equal to 1:</p>

<p>
\\[
0.1+0.2+0.4+P(X=4)=1
\\]
</p>

<p>Add:</p>

<p>
\\[
0.7+P(X=4)=1
\\]
</p>

<p>Therefore:</p>

<p>
\\[
P(X=4)=1-0.7
\\]
</p>

<p>
\\[
\\boxed{P(X=4)=0.3}
\\]
</p>

<h3>The Rule</h3>

<p>
To find a missing probability:
</p>

<p>
\\[
\\boxed{
\\text{Missing probability}
=
1-\\text{sum of known probabilities}
}
\\]
</p>
`,

  [
    {
      q: "P(A)=0.2 and P(B)=0.5. Find P(C).",
      hint: "All probabilities must add to 1.",
      steps: [
        "0.2 + 0.5 + P(C) = 1.",
        "0.7 + P(C) = 1.",
        "P(C) = 1 - 0.7.",
        "P(C) = 0.3."
      ],
      ans: "0.3",
      why: "The probabilities in a complete distribution must add to 1."
    },

    {
      q: "P(A)=1/4 and P(B)=1/2. Find P(C).",
      hint: "Convert 1/2 into quarters.",
      steps: [
        "1/2 = 2/4.",
        "Known total = 1/4 + 2/4 = 3/4.",
        "P(C) = 1 - 3/4.",
        "P(C) = 1/4."
      ],
      ans: "1/4",
      why: "The missing probability must make the total equal to 1."
    },

    {
      q: "A distribution has probabilities 0.1, 0.2, 0.4 and P(X=4). Find P(X=4).",
      hint: "Add the three known probabilities first.",
      steps: [
        "0.1 + 0.2 + 0.4 = 0.7.",
        "The complete total must be 1.",
        "P(X=4) = 1 - 0.7.",
        "P(X=4) = 0.3."
      ],
      ans: "0.3",
      why: "The missing probability is whatever amount is needed to make the total probability 1."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix 1",
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
  "Matrix 1",
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
  "Matrix 1",
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
  "Matrix 1",
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
  "Matrix 1",
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
  "Matrix Arithemetic",
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
  "Matrix Arithemetic",
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
  "Matrix Arithemetic",
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
  "Matrix of transformation",
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
  "Matrix of transformation",
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
  "Matrix of transformation",
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
  "matrices",
  "Matrix of transformation",
  "Rotation Through 90 Degrees Anticlockwise",

  `
<h2>Rotation Through 90° Anticlockwise</h2>

<p>
A <b>rotation</b> turns a point around a fixed centre.
In this screen, the centre of rotation is the origin, O(0,0),
and the point turns through <b>90° anticlockwise</b>.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
When a point rotates through 90° anticlockwise about the origin,
its coordinates change according to this rule:
</p>

<p><b>(x,y) → (-y,x)</b></p>

<p>
Notice what happens:
</p>

<ul>
<li>The old y-coordinate moves to the first position.</li>
<li>The old x-coordinate moves to the second position.</li>
<li>The old y-coordinate becomes negative.</li>
</ul>

<h3>2. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix for a 90° anticlockwise rotation is:
</p>

<pre>
[ 0  -1]
[ 1   0]
</pre>

<p>
To transform a point (x,y), multiply the matrix by its
coordinate column:
</p>

<pre>
[ 0  -1] [x]   [-y]
[ 1   0] [y] = [ x]
</pre>

<p>
The first coordinate is:
</p>

<p><b>0x + (-1)y = -y</b></p>

<p>
The second coordinate is:
</p>

<p><b>1x + 0y = x</b></p>

<p>
Therefore, the transformation is:
</p>

<p><b>(x,y) → (-y,x)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Rotate P(3,2) through 90° anticlockwise about the origin.
</p>

<p>Step 1: Write the original coordinates.</p>

<pre>
P = (3,2)
</pre>

<p>Step 2: Apply the rule (x,y) → (-y,x).</p>

<pre>
(x,y) → (-y,x)

(3,2) → (-2,3)
</pre>

<p>Step 3: State the image.</p>

<p><b>P' = (-2,3)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Rotate A(-4,5) through 90° anticlockwise about the origin.
</p>

<p>Step 1: Identify x and y.</p>

<pre>
x = -4
y = 5
</pre>

<p>Step 2: Apply the rule.</p>

<pre>
(x,y) → (-y,x)

(-4,5) → (-5,-4)
</pre>

<p>Step 3: State the image.</p>

<p><b>A' = (-5,-4)</b></p>

<p>
Remember that the new first coordinate is the negative of the
old y-coordinate. The old y-coordinate is 5, so the new one is -5.
</p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Rotate B(2,-6) through 90° anticlockwise about the origin.
</p>

<p>Step 1: Identify the coordinates.</p>

<pre>
x = 2
y = -6
</pre>

<p>Step 2: Apply the rule.</p>

<pre>
(x,y) → (-y,x)

(2,-6) → (6,2)
</pre>

<p>Step 3: State the image.</p>

<p><b>B' = (6,2)</b></p>

<p>
Because the original y-coordinate was -6, its negative is
-(-6) = 6.
</p>

<h3>6. THE PATTERN</h3>

<pre>
(3,2)    → (-2,3)

(-4,5)   → (-5,-4)

(2,-6)   → (6,2)
</pre>

<p>
For every point, the same rule applies:
</p>

<p><b>90° anticlockwise: (x,y) → (-y,x)</b></p>

<p>
The centre must be the origin for this rule to apply directly.
</p>
`,

  [
    {
      q: "Rotate (3,2) through 90° anticlockwise about the origin.",
      hint: "Use (x,y) → (-y,x).",
      steps: [
        "Original point = (3,2)",
        "The new first coordinate is -y = -2",
        "The new second coordinate is x = 3",
        "Image = (-2,3)"
      ],
      ans: "(-2,3)",
      why: "A 90° anticlockwise rotation maps (x,y) to (-y,x)."
    },
    {
      q: "Rotate (-4,5) through 90° anticlockwise about the origin.",
      hint: "Negate the old y-coordinate, then use the old x-coordinate.",
      steps: [
        "Original point = (-4,5)",
        "New first coordinate = -5",
        "New second coordinate = -4",
        "Image = (-5,-4)"
      ],
      ans: "(-5,-4)",
      why: "The new coordinates are (-y,x), so (-4,5) becomes (-5,-4)."
    },
    {
      q: "Rotate (2,-6) through 90° anticlockwise about the origin.",
      hint: "Remember that -(-6) = 6.",
      steps: [
        "Original point = (2,-6)",
        "New first coordinate = -(-6) = 6",
        "New second coordinate = 2",
        "Image = (6,2)"
      ],
      ans: "(6,2)",
      why: "Negating the original y-coordinate changes -6 to 6, while x remains the second coordinate."
    },
    {
      q: "Use the transformation matrix to rotate (4,3) through 90° anticlockwise.",
      hint: "Multiply [[0,-1],[1,0]] by [4,3].",
      steps: [
        "First coordinate = 0(4) - 1(3) = -3",
        "Second coordinate = 1(4) + 0(3) = 4",
        "Image = (-3,4)"
      ],
      ans: "(-3,4)",
      why: "The matrix [[0,-1],[1,0]] produces the coordinates (-y,x)."
    },
    {
      q: "A point Q has image Q' = (-7,3) after a 90° anticlockwise rotation about the origin. Find the original point Q.",
      hint: "If (x,y) → (-y,x), compare each coordinate of the image.",
      steps: [
        "The image is (-y,x) = (-7,3)",
        "-y = -7, so y = 7",
        "x = 3",
        "Original point Q = (3,7)"
      ],
      ans: "(3,7)",
      why: "The second image coordinate gives x = 3, while the first gives y = 7."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotation Through 90 Degrees Clockwise",

  `
<h2>Rotation Through 90° Clockwise</h2>

<p>
A <b>rotation</b> turns a point around a fixed centre.
In this screen, the centre is the origin O(0,0), and the point
turns through <b>90° clockwise</b>.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
A 90° clockwise rotation changes the coordinates according to:
</p>

<p><b>(x,y) → (y,-x)</b></p>

<p>
This means:
</p>

<ul>
<li>The old y-coordinate becomes the new first coordinate.</li>
<li>The old x-coordinate becomes the new second coordinate.</li>
<li>The old x-coordinate changes sign.</li>
</ul>

<h3>2. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix for a 90° clockwise rotation is:
</p>

<pre>
[ 0   1]
[-1   0]
</pre>

<p>
Write the original point as a column vector:
</p>

<pre>
[x]
[y]
</pre>

<p>Multiply the matrix by the column vector:</p>

<pre>
[ 0   1] [x]   [ y]
[-1   0] [y] = [-x]
</pre>

<p>The first coordinate is:</p>

<p><b>0x + 1y = y</b></p>

<p>The second coordinate is:</p>

<p><b>-1x + 0y = -x</b></p>

<p>Therefore:</p>

<p><b>(x,y) → (y,-x)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Rotate P(3,2) through 90° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the original coordinates.</p>

<pre>
x = 3
y = 2
</pre>

<p><b>Step 2:</b> Apply the rule (x,y) → (y,-x).</p>

<pre>
(3,2) → (2,-3)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>P' = (2,-3)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Rotate A(-4,5) through 90° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = -4
y = 5
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (y,-x)

(-4,5) → (5,4)
</pre>

<p>
The new second coordinate is -(-4) = 4.
</p>

<p><b>Step 3:</b> State the image.</p>

<p><b>A' = (5,4)</b></p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Rotate B(2,-6) through 90° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = 2
y = -6
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (y,-x)

(2,-6) → (-6,-2)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>B' = (-6,-2)</b></p>

<h3>6. THE PATTERN</h3>

<pre>
(3,2)    → (2,-3)

(-4,5)   → (5,4)

(2,-6)   → (-6,-2)
</pre>

<p>
Notice that the first coordinate becomes the negative of the
original x-coordinate in the second position, while the original
y-coordinate moves to the first position.
</p>

<p><b>90° clockwise: (x,y) → (y,-x)</b></p>

<p>
This rule applies directly when the centre of rotation is the origin.
</p>
`,

  [
    {
      q: "Rotate (3,2) through 90° clockwise about the origin.",
      hint: "Use (x,y) → (y,-x).",
      steps: [
        "Original point = (3,2)",
        "New first coordinate = y = 2",
        "New second coordinate = -x = -3",
        "Image = (2,-3)"
      ],
      ans: "(2,-3)",
      why: "A 90° clockwise rotation maps (x,y) to (y,-x)."
    },
    {
      q: "Rotate (-4,5) through 90° clockwise about the origin.",
      hint: "Keep y first and change the sign of x.",
      steps: [
        "Original point = (-4,5)",
        "New first coordinate = 5",
        "New second coordinate = -(-4) = 4",
        "Image = (5,4)"
      ],
      ans: "(5,4)",
      why: "The old y-coordinate becomes the first coordinate, and the negative of the old x-coordinate becomes the second."
    },
    {
      q: "Rotate (2,-6) through 90° clockwise about the origin.",
      hint: "The new coordinates are (y,-x).",
      steps: [
        "Original point = (2,-6)",
        "New first coordinate = -6",
        "New second coordinate = -2",
        "Image = (-6,-2)"
      ],
      ans: "(-6,-2)",
      why: "Substituting x = 2 and y = -6 into (y,-x) gives (-6,-2)."
    },
    {
      q: "Use the transformation matrix to rotate (4,3) through 90° clockwise about the origin.",
      hint: "Use [[0,1],[-1,0]].",
      steps: [
        "First coordinate = 0(4) + 1(3) = 3",
        "Second coordinate = -1(4) + 0(3) = -4",
        "Image = (3,-4)"
      ],
      ans: "(3,-4)",
      why: "Matrix multiplication gives (y,-x)."
    },
    {
      q: "A point Q has image Q' = (7,-3) after a 90° clockwise rotation about the origin. Find the original point Q.",
      hint: "The image coordinates are (y,-x).",
      steps: [
        "Compare (y,-x) with (7,-3)",
        "y = 7",
        "-x = -3, so x = 3",
        "Original point Q = (3,7)"
      ],
      ans: "(3,7)",
      why: "The first image coordinate gives y = 7, and the second gives x = 3."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotation Through 180 Degrees",

  `
<h2>Rotation Through 180° About the Origin</h2>

<p>
A <b>180° rotation</b> turns a point halfway around the origin.
The centre of rotation is O(0,0).
</p>

<h3>1. THE MAIN RULE</h3>

<p>
When a point rotates through 180° about the origin,
both coordinates change sign.
</p>

<p><b>(x,y) → (-x,-y)</b></p>

<p>
This means:
</p>

<ul>
<li>The x-coordinate changes sign.</li>
<li>The y-coordinate changes sign.</li>
<li>The order of the coordinates stays the same.</li>
</ul>

<p>
For example:
</p>

<pre>
(3,2) → (-3,-2)
</pre>

<p>
The 3 becomes -3, and the 2 becomes -2.
</p>

<h3>2. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix for a 180° rotation is:
</p>

<pre>
[-1   0]
[ 0  -1]
</pre>

<p>
Write the point as a column vector:
</p>

<pre>
[x]
[y]
</pre>

<p>Multiply the matrix by the column vector:</p>

<pre>
[-1   0] [x]   [-x]
[ 0  -1] [y] = [-y]
</pre>

<p>The first coordinate is:</p>

<p><b>-1x + 0y = -x</b></p>

<p>The second coordinate is:</p>

<p><b>0x + (-1)y = -y</b></p>

<p>Therefore, the transformation is:</p>

<p><b>(x,y) → (-x,-y)</b></p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Rotate P(3,2) through 180° about the origin.
</p>

<p><b>Step 1:</b> Write the original coordinates.</p>

<pre>
x = 3
y = 2
</pre>

<p><b>Step 2:</b> Change the sign of each coordinate.</p>

<pre>
x = 3  → -3
y = 2  → -2
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>P' = (-3,-2)</b></p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Rotate A(-4,5) through 180° about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = -4
y = 5
</pre>

<p><b>Step 2:</b> Change both signs.</p>

<pre>
-4 → 4
 5 → -5
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>A' = (4,-5)</b></p>

<p>
Remember: changing a negative number's sign makes it positive.
</p>

<h3>5. WORKED EXAMPLE 3</h3>

<p>
Rotate B(-2,-6) through 180° about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = -2
y = -6
</pre>

<p><b>Step 2:</b> Change both signs.</p>

<pre>
-2 → 2
-6 → 6
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>B' = (2,6)</b></p>

<h3>6. THE PATTERN</h3>

<pre>
( 3, 2) → (-3,-2)

(-4, 5) → ( 4,-5)

(-2,-6) → ( 2, 6)
</pre>

<p>
The coordinates stay in the same order, but both signs change.
</p>

<p><b>180° rotation: (x,y) → (-x,-y)</b></p>

<p>
This rule applies directly when the centre of rotation is the origin.
</p>
`,

  [
    {
      q: "Rotate (3,2) through 180° about the origin.",
      hint: "Change the signs of both coordinates.",
      steps: [
        "Original point = (3,2)",
        "Change 3 to -3",
        "Change 2 to -2",
        "Image = (-3,-2)"
      ],
      ans: "(-3,-2)",
      why: "A 180° rotation about the origin maps (x,y) to (-x,-y)."
    },
    {
      q: "Rotate (-4,5) through 180° about the origin.",
      hint: "A negative x-coordinate becomes positive, and a positive y-coordinate becomes negative.",
      steps: [
        "Original point = (-4,5)",
        "-4 becomes 4",
        "5 becomes -5",
        "Image = (4,-5)"
      ],
      ans: "(4,-5)",
      why: "Both coordinates change sign, giving (-x,-y)."
    },
    {
      q: "Rotate (-2,-6) through 180° about the origin.",
      hint: "Change both negative coordinates to positive.",
      steps: [
        "Original point = (-2,-6)",
        "-2 becomes 2",
        "-6 becomes 6",
        "Image = (2,6)"
      ],
      ans: "(2,6)",
      why: "Negating each original coordinate gives (-(-2),-(-6)) = (2,6)."
    },
    {
      q: "Use the transformation matrix to rotate (4,-3) through 180° about the origin.",
      hint: "Use [[-1,0],[0,-1]].",
      steps: [
        "First coordinate = -1(4) + 0(-3) = -4",
        "Second coordinate = 0(4) + (-1)(-3) = 3",
        "Image = (-4,3)"
      ],
      ans: "(-4,3)",
      why: "Matrix multiplication produces (-x,-y)."
    },
    {
      q: "A point P has image P' = (-7,4) after a 180° rotation about the origin. Find the original point P.",
      hint: "Change both image coordinates' signs to recover the original point.",
      steps: [
        "Image = (-x,-y) = (-7,4)",
        "-x = -7, so x = 7",
        "-y = 4, so y = -4",
        "Original point P = (7,-4)"
      ],
      ans: "(7,-4)",
      why: "A 180° rotation reverses both coordinate signs. Applying the same sign reversal again recovers the original point."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotation Through 270 Degrees Anticlockwise",

  `
<h2>Rotation Through 270° Anticlockwise</h2>

<p>
A <b>270° anticlockwise rotation</b> turns a point through
three-quarters of a complete turn about the origin O(0,0).
</p>

<h3>1. UNDERSTANDING THE ROTATION</h3>

<p>
A complete turn is 360°. Therefore:
</p>

<pre>
360° - 270° = 90°
</pre>

<p>
Turning 270° anticlockwise gives the same final position as
turning 90° clockwise.
</p>

<p>
We can therefore use the coordinate rule for a 90° clockwise rotation.
</p>

<h3>2. THE MAIN RULE</h3>

<p>
The coordinate rule is:
</p>

<p><b>(x,y) → (y,-x)</b></p>

<p>
This means:
</p>

<ul>
<li>The original y-coordinate becomes the first coordinate.</li>
<li>The original x-coordinate becomes the second coordinate.</li>
<li>The original x-coordinate changes sign.</li>
</ul>

<p>For example:</p>

<pre>
(3,2) → (2,-3)
</pre>

<h3>3. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix for a 270° anticlockwise rotation is:
</p>

<pre>
[ 0   1]
[-1   0]
</pre>

<p>
Write the original point as a column vector:
</p>

<pre>
[x]
[y]
</pre>

<p>Multiply the matrix by the vector:</p>

<pre>
[ 0   1] [x]   [ y]
[-1   0] [y] = [-x]
</pre>

<p>The first coordinate is:</p>

<p><b>0x + 1y = y</b></p>

<p>The second coordinate is:</p>

<p><b>-1x + 0y = -x</b></p>

<p>Therefore:</p>

<p><b>(x,y) → (y,-x)</b></p>

<h3>4. WORKED EXAMPLE 1</h3>

<p>
Rotate P(3,2) through 270° anticlockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = 3
y = 2
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (y,-x)

(3,2) → (2,-3)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>P' = (2,-3)</b></p>

<h3>5. WORKED EXAMPLE 2</h3>

<p>
Rotate A(-4,5) through 270° anticlockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = -4
y = 5
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (y,-x)

(-4,5) → (5,4)
</pre>

<p>
The new second coordinate is -(-4) = 4.
</p>

<p><b>Step 3:</b> State the image.</p>

<p><b>A' = (5,4)</b></p>

<h3>6. WORKED EXAMPLE 3</h3>

<p>
Rotate B(2,-6) through 270° anticlockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = 2
y = -6
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (y,-x)

(2,-6) → (-6,-2)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>B' = (-6,-2)</b></p>

<h3>7. THE PATTERN</h3>

<pre>
( 3, 2) → ( 2,-3)

(-4, 5) → ( 5, 4)

( 2,-6) → (-6,-2)
</pre>

<p>
A 270° anticlockwise rotation has the same final result as a
90° clockwise rotation.
</p>

<p><b>270° anticlockwise: (x,y) → (y,-x)</b></p>

<p>
This rule applies directly when the centre of rotation is the origin.
</p>
`,

  [
    {
      q: "Rotate (3,2) through 270° anticlockwise about the origin.",
      hint: "Use (x,y) → (y,-x).",
      steps: [
        "Original point = (3,2)",
        "New first coordinate = y = 2",
        "New second coordinate = -x = -3",
        "Image = (2,-3)"
      ],
      ans: "(2,-3)",
      why: "A 270° anticlockwise rotation is equivalent to a 90° clockwise rotation."
    },
    {
      q: "Rotate (-4,5) through 270° anticlockwise about the origin.",
      hint: "Place y first and use -x for the second coordinate.",
      steps: [
        "Original point = (-4,5)",
        "New first coordinate = 5",
        "New second coordinate = -(-4) = 4",
        "Image = (5,4)"
      ],
      ans: "(5,4)",
      why: "The coordinate rule is (x,y) → (y,-x)."
    },
    {
      q: "Rotate (2,-6) through 270° anticlockwise about the origin.",
      hint: "The original y-coordinate is negative.",
      steps: [
        "Original point = (2,-6)",
        "New first coordinate = -6",
        "New second coordinate = -2",
        "Image = (-6,-2)"
      ],
      ans: "(-6,-2)",
      why: "Substituting x = 2 and y = -6 into (y,-x) gives (-6,-2)."
    },
    {
      q: "Use the transformation matrix to rotate (4,3) through 270° anticlockwise.",
      hint: "Multiply [[0,1],[-1,0]] by [4,3].",
      steps: [
        "First coordinate = 0(4) + 1(3) = 3",
        "Second coordinate = -1(4) + 0(3) = -4",
        "Image = (3,-4)"
      ],
      ans: "(3,-4)",
      why: "The transformation matrix produces (y,-x), the rule for a 270° anticlockwise rotation."
    },
    {
      q: "A point Q has image Q' = (6,-2) after a 270° anticlockwise rotation about the origin. Find Q.",
      hint: "The image coordinates are (y,-x).",
      steps: [
        "Compare (y,-x) with (6,-2)",
        "y = 6",
        "-x = -2, so x = 2",
        "Original point Q = (2,6)"
      ],
      ans: "(2,6)",
      why: "Reversing the coordinate rule (x,y) → (y,-x) gives the original point (2,6)."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotation Through 270 Degrees Clockwise",

  `
<h2>Rotation Through 270° Clockwise</h2>

<p>
A <b>270° clockwise rotation</b> turns a point through
three-quarters of a complete turn about the origin O(0,0).
</p>

<h3>1. UNDERSTANDING THE ROTATION</h3>

<p>
A complete turn is 360°. Therefore:
</p>

<pre>
360° - 270° = 90°
</pre>

<p>
Turning 270° clockwise gives the same final position as
turning 90° anticlockwise.
</p>

<p>
We can therefore use the coordinate rule for a 90° anticlockwise rotation.
</p>

<h3>2. THE MAIN RULE</h3>

<p>
The coordinate rule is:
</p>

<p><b>(x,y) → (-y,x)</b></p>

<p>This means:</p>

<ul>
<li>The original y-coordinate becomes the first coordinate and changes sign.</li>
<li>The original x-coordinate becomes the second coordinate.</li>
</ul>

<p>For example:</p>

<pre>
(3,2) → (-2,3)
</pre>

<h3>3. TRANSFORMATION MATRIX</h3>

<p>
The transformation matrix for a 270° clockwise rotation is:
</p>

<pre>
[ 0  -1]
[ 1   0]
</pre>

<p>
Write the original point as a column vector:
</p>

<pre>
[x]
[y]
</pre>

<p>Multiply the matrix by the vector:</p>

<pre>
[ 0  -1] [x]   [-y]
[ 1   0] [y] = [ x]
</pre>

<p>The first coordinate is:</p>

<p><b>0x + (-1)y = -y</b></p>

<p>The second coordinate is:</p>

<p><b>1x + 0y = x</b></p>

<p>Therefore:</p>

<p><b>(x,y) → (-y,x)</b></p>

<h3>4. WORKED EXAMPLE 1</h3>

<p>
Rotate P(3,2) through 270° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = 3
y = 2
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (-y,x)

(3,2) → (-2,3)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>P' = (-2,3)</b></p>

<h3>5. WORKED EXAMPLE 2</h3>

<p>
Rotate A(-4,5) through 270° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = -4
y = 5
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (-y,x)

(-4,5) → (-5,-4)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>A' = (-5,-4)</b></p>

<h3>6. WORKED EXAMPLE 3</h3>

<p>
Rotate B(2,-6) through 270° clockwise about the origin.
</p>

<p><b>Step 1:</b> Identify the coordinates.</p>

<pre>
x = 2
y = -6
</pre>

<p><b>Step 2:</b> Apply the rule.</p>

<pre>
(x,y) → (-y,x)

(2,-6) → (6,2)
</pre>

<p><b>Step 3:</b> State the image.</p>

<p><b>B' = (6,2)</b></p>

<h3>7. THE PATTERN</h3>

<pre>
( 3, 2) → (-2, 3)

(-4, 5) → (-5,-4)

( 2,-6) → ( 6, 2)
</pre>

<p>
A 270° clockwise rotation has the same final result as a
90° anticlockwise rotation.
</p>

<p><b>270° clockwise: (x,y) → (-y,x)</b></p>

<p>
This rule applies directly when the centre of rotation is the origin.
</p>
`,

  [
    {
      q: "Rotate (3,2) through 270° clockwise about the origin.",
      hint: "Use (x,y) → (-y,x).",
      steps: [
        "Original point = (3,2)",
        "New first coordinate = -y = -2",
        "New second coordinate = x = 3",
        "Image = (-2,3)"
      ],
      ans: "(-2,3)",
      why: "A 270° clockwise rotation is equivalent to a 90° anticlockwise rotation."
    },
    {
      q: "Rotate (-4,5) through 270° clockwise about the origin.",
      hint: "Change the sign of y, then place x second.",
      steps: [
        "Original point = (-4,5)",
        "New first coordinate = -5",
        "New second coordinate = -4",
        "Image = (-5,-4)"
      ],
      ans: "(-5,-4)",
      why: "The coordinate rule is (x,y) → (-y,x)."
    },
    {
      q: "Rotate (2,-6) through 270° clockwise about the origin.",
      hint: "Remember that -(-6) = 6.",
      steps: [
        "Original point = (2,-6)",
        "New first coordinate = -(-6) = 6",
        "New second coordinate = 2",
        "Image = (6,2)"
      ],
      ans: "(6,2)",
      why: "Substituting x = 2 and y = -6 into (-y,x) gives (6,2)."
    },
    {
      q: "Use the transformation matrix to rotate (4,3) through 270° clockwise.",
      hint: "Multiply [[0,-1],[1,0]] by [4,3].",
      steps: [
        "First coordinate = 0(4) - 1(3) = -3",
        "Second coordinate = 1(4) + 0(3) = 4",
        "Image = (-3,4)"
      ],
      ans: "(-3,4)",
      why: "The transformation matrix produces (-y,x), the rule for a 270° clockwise rotation."
    },
    {
      q: "A point Q has image Q' = (-6,2) after a 270° clockwise rotation about the origin. Find Q.",
      hint: "The image coordinates are (-y,x).",
      steps: [
        "Compare (-y,x) with (-6,2)",
        "-y = -6, so y = 6",
        "x = 2",
        "Original point Q = (2,6)"
      ],
      ans: "(2,6)",
      why: "Reversing the transformation (x,y) → (-y,x) gives the original point (2,6)."
    }
  ]
);
add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotating a Triangle Using a Transformation Matrix",

  `
<h2>Rotating a Triangle Using a Transformation Matrix</h2>

<p>
A transformation is applied to <b>every vertex</b> of a shape.
The same transformation matrix must be used for every point.
</p>

<p>
In this example, we will rotate a triangle through
<b>90° anticlockwise about the origin</b>.
</p>

<h3>1. THE TRANSFORMATION MATRIX</h3>

<p>
For a 90° anticlockwise rotation, the matrix is:
</p>

<pre>
[ 0  -1]
[ 1   0]
</pre>

<p>
Therefore:
</p>

<pre>
(x,y) → (-y,x)
</pre>

<h3>2. THE TRIANGLE</h3>

<p>
Consider triangle ABC with vertices:
</p>

<pre>
A(2,1)
B(5,1)
C(2,4)
</pre>

<p>
We must rotate <b>each vertex</b>.
</p>

<p>
We do not rotate the whole triangle using only one point.
Instead, we transform A, B and C separately.
</p>

<h3>3. TRANSFORMING A</h3>

<p>
A = (2,1)
</p>

<p>
Apply:
</p>

<pre>
(x,y) → (-y,x)

(2,1) → (-1,2)
</pre>

<p>
Therefore:
</p>

<p><b>A' = (-1,2)</b></p>

<h3>4. TRANSFORMING B</h3>

<p>
B = (5,1)
</p>

<p>
Apply the same rule:
</p>

<pre>
(x,y) → (-y,x)

(5,1) → (-1,5)
</pre>

<p>
Therefore:
</p>

<p><b>B' = (-1,5)</b></p>

<h3>5. TRANSFORMING C</h3>

<p>
C = (2,4)
</p>

<p>
Apply the same rule:
</p>

<pre>
(x,y) → (-y,x)

(2,4) → (-4,2)
</pre>

<p>
Therefore:
</p>

<p><b>C' = (-4,2)</b></p>

<h3>6. THE TRANSFORMED TRIANGLE</h3>

<pre>
Original        Image

A(2,1)    →     A'(-1,2)

B(5,1)    →     B'(-1,5)

C(2,4)    →     C'(-4,2)
</pre>

<p>
The three transformed points form the image triangle
<b>A'B'C'</b>.
</p>

<h3>7. USING THE MATRIX DIRECTLY</h3>

<p>
We can also transform each vertex using matrix multiplication.
</p>

<p>For A(2,1):</p>

<pre>
[ 0  -1] [2]   [-1]
[ 1   0] [1] = [ 2]
</pre>

<p>Therefore:</p>

<p><b>A' = (-1,2)</b></p>

<p>For B(5,1):</p>

<pre>
[ 0  -1] [5]   [-1]
[ 1   0] [1] = [ 5]
</pre>

<p>Therefore:</p>

<p><b>B' = (-1,5)</b></p>

<p>For C(2,4):</p>

<pre>
[ 0  -1] [2]   [-4]
[ 1   0] [4] = [ 2]
</pre>

<p>Therefore:</p>

<p><b>C' = (-4,2)</b></p>

<h3>8. THE IMPORTANT IDEA</h3>

<p>
When transforming a shape:
</p>

<ol>
<li>List every vertex.</li>
<li>Apply the same transformation to each vertex.</li>
<li>Write the new coordinates.</li>
<li>Join the transformed vertices in the same order.</li>
</ol>

<p>
For a 90° anticlockwise rotation:
</p>

<p><b>(x,y) → (-y,x)</b></p>

<p>
The rule is applied to <b>every vertex</b>.
`,
  [
    {
      q: "Triangle ABC has vertices A(2,1), B(5,1) and C(2,4). Rotate the triangle 90° anticlockwise about the origin. Find A'.",
      hint: "Use (x,y) → (-y,x).",
      steps: [
        "A = (2,1)",
        "Apply the rule: (x,y) → (-y,x)",
        "(2,1) → (-1,2)"
      ],
      ans: "(-1,2)",
      why: "A 90° anticlockwise rotation maps (x,y) to (-y,x)."
    },
    {
      q: "Using the same triangle, find B' after a 90° anticlockwise rotation.",
      hint: "Apply the same rule to B(5,1).",
      steps: [
        "B = (5,1)",
        "Apply the rule: (x,y) → (-y,x)",
        "(5,1) → (-1,5)"
      ],
      ans: "(-1,5)",
      why: "Every vertex of the shape must undergo the same transformation."
    },
    {
      q: "Using the same triangle, find C' after a 90° anticlockwise rotation.",
      hint: "Apply (x,y) → (-y,x) to C(2,4).",
      steps: [
        "C = (2,4)",
        "New first coordinate = -4",
        "New second coordinate = 2",
        "C' = (-4,2)"
      ],
      ans: "(-4,2)",
      why: "The same transformation matrix must be applied to every vertex."
    },
    {
      q: "A triangle has vertices P(1,2), Q(4,2) and R(1,5). Rotate it 90° anticlockwise about the origin. Find P', Q' and R'.",
      hint: "Transform each vertex separately using (x,y) → (-y,x).",
      steps: [
        "P(1,2) → (-2,1)",
        "Q(4,2) → (-2,4)",
        "R(1,5) → (-5,1)"
      ],
      ans: "P'(-2,1), Q'(-2,4), R'(-5,1)",
      why: "A transformation of a shape is found by transforming each of its vertices."
    }
  ]
);

add(
  "math",
  "matrices",
  "Matrix of transformation",
  "Rotation About a Point Other Than the Origin",

  `
<h2>Rotation About a Point Other Than the Origin</h2>

<p>
The rotation rules we have used so far work directly when the
centre of rotation is the <b>origin O(0,0)</b>.
</p>

<p>
But a point can also be rotated about another centre, such as
<b>C(1,1)</b>.
</p>

<p>
When the centre is not the origin, we use three steps:
</p>

<ol>
<li>Move the centre to the origin.</li>
<li>Perform the rotation.</li>
<li>Move everything back.</li>
</ol>

<h3>1. THE THREE-STEP METHOD</h3>

<p>
Suppose we want to rotate point P about centre C.
</p>

<p>
For a 90° anticlockwise rotation:
</p>

<pre>
1. Translate the centre to the origin.

2. Use:
   (x,y) → (-y,x)

3. Translate the point back to the original centre.
</pre>

<p>
The important idea is that the rotation itself is still performed
around the origin.
We first change the position of the coordinates so that the
chosen centre becomes the origin.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Rotate <b>P(3,1)</b> through 90° anticlockwise about
<b>C(1,1)</b>.
</p>

<p><b>Step 1: Move the centre to the origin.</b></p>

<p>
Subtract the centre coordinates from P:
</p>

<pre>
P = (3,1)
C = (1,1)

(3-1, 1-1)
= (2,0)
</pre>

<p>
So relative to the centre C, the point is:
</p>

<p><b>(2,0)</b></p>

<p><b>Step 2: Rotate 90° anticlockwise.</b></p>

<p>
Use:
</p>

<pre>
(x,y) → (-y,x)
</pre>

<pre>
(2,0) → (0,2)
</pre>

<p><b>Step 3: Move the point back.</b></p>

<p>
Add the centre coordinates:
</p>

<pre>
(0+1, 2+1)
= (1,3)
</pre>

<p>
Therefore:
</p>

<p><b>P' = (1,3)</b></p>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Rotate <b>A(4,3)</b> through 90° anticlockwise about
<b>C(2,1)</b>.
</p>

<p><b>Step 1: Move the centre to the origin.</b></p>

<pre>
A = (4,3)
C = (2,1)

(4-2, 3-1)
= (2,2)
</pre>

<p><b>Step 2: Rotate 90° anticlockwise.</b></p>

<pre>
(x,y) → (-y,x)

(2,2) → (-2,2)
</pre>

<p><b>Step 3: Move the point back.</b></p>

<pre>
(-2+2, 2+1)
= (0,3)
</pre>

<p>
Therefore:
</p>

<p><b>A' = (0,3)</b></p>

<h3>4. WORKED EXAMPLE 3</h3>

<p>
Rotate <b>B(2,5)</b> through 90° anticlockwise about
<b>C(2,2)</b>.
</p>

<p><b>Step 1: Move the centre to the origin.</b></p>

<pre>
B = (2,5)
C = (2,2)

(2-2, 5-2)
= (0,3)
</pre>

<p><b>Step 2: Rotate 90° anticlockwise.</b></p>

<pre>
(0,3) → (-3,0)
</pre>

<p><b>Step 3: Move the point back.</b></p>

<pre>
(-3+2, 0+2)
= (-1,2)
</pre>

<p>
Therefore:
</p>

<p><b>B' = (-1,2)</b></p>

<h3>5. THE METHOD TO REMEMBER</h3>

<pre>
ROTATE ABOUT A NON-ORIGIN CENTRE

        ↓

Subtract the centre

        ↓

Rotate about the origin

        ↓

Add the centre back
</pre>

<p>
For a 90° anticlockwise rotation, the middle step is:
</p>

<p><b>(x,y) → (-y,x)</b></p>

<p>
The centre is not rotated.
It remains fixed throughout the transformation.
</p>
`,

  [
    {
      q: "Rotate P(3,1) through 90° anticlockwise about C(1,1).",
      hint: "Subtract the centre, rotate, then add the centre back.",
      steps: [
        "Move relative to the centre: (3-1, 1-1) = (2,0)",
        "Rotate 90° anticlockwise: (2,0) → (0,2)",
        "Move back: (0+1, 2+1) = (1,3)"
      ],
      ans: "(1,3)",
      why: "When rotating about a non-origin centre, first translate the centre to the origin, rotate, then translate back."
    },
    {
      q: "Rotate A(4,3) through 90° anticlockwise about C(2,1).",
      hint: "First find the coordinates of A relative to C.",
      steps: [
        "Relative position: (4-2, 3-1) = (2,2)",
        "Rotate: (2,2) → (-2,2)",
        "Move back: (-2+2, 2+1) = (0,3)"
      ],
      ans: "(0,3)",
      why: "The rotation is performed around the chosen centre after temporarily moving that centre to the origin."
    },
    {
      q: "Rotate B(2,5) through 90° anticlockwise about C(2,2).",
      hint: "Subtract (2,2), rotate, then add (2,2).",
      steps: [
        "Relative position: (2-2, 5-2) = (0,3)",
        "Rotate: (0,3) → (-3,0)",
        "Move back: (-3+2, 0+2) = (-1,2)"
      ],
      ans: "(-1,2)",
      why: "The point is rotated relative to the centre and then returned to the original coordinate system."
    },
    {
      q: "A point P(5,2) is rotated 90° anticlockwise about C(2,2). Find P'.",
      hint: "Find P's position relative to C before rotating.",
      steps: [
        "Relative position: (5-2, 2-2) = (3,0)",
        "Rotate: (3,0) → (0,3)",
        "Move back: (0+2, 3+2) = (2,5)"
      ],
      ans: "(2,5)",
      why: "The point is 3 units to the right of the centre, so after a 90° anticlockwise rotation it is 3 units above the centre."
    },
    {
      q: "Why can we not directly use (x,y) → (-y,x) when the centre of rotation is C(2,1)?",
      hint: "Ask yourself what point the rule assumes is the centre.",
      steps: [
        "The rule (x,y) → (-y,x) assumes the centre is the origin",
        "C(2,1) is not the origin",
        "The point must first be expressed relative to C",
        "After rotating, the centre must be added back"
      ],
      ans: "Because the rule (x,y) → (-y,x) rotates about the origin.",
      why: "A standard 2×2 rotation matrix acts about the origin. A different centre requires translation before and after the rotation."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector From One Point to Another",

  `
<h2>Vector From One Point to Another</h2>

<p>
A vector can describe the movement from one point to another.
</p>

<p>
If a point moves from <b>A</b> to <b>B</b>, the vector is written:
</p>

<p><b>\\vec{AB}</b></p>

<p>
The important idea is:
</p>

<p><b>Vector = final position − initial position</b></p>

<h3>1. THE MAIN RULE</h3>

<p>
Suppose:
</p>

<pre>
A(x₁,y₁)
B(x₂,y₂)
</pre>

<p>
Then the vector from A to B is:
</p>

<pre>
→       (x₂ - x₁)
AB  =
        (y₂ - y₁)
</pre>

<p>
So we subtract the coordinates of the starting point
from the coordinates of the finishing point.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find the vector <b>AB</b> if:
</p>

<pre>
A(2,3)
B(7,5)
</pre>

<p><b>Step 1:</b> Subtract the x-coordinates.</p>

<pre>
7 - 2 = 5
</pre>

<p><b>Step 2:</b> Subtract the y-coordinates.</p>

<pre>
5 - 3 = 2
</pre>

<p><b>Step 3:</b> Combine the components.</p>

<pre>
→
AB = (5,2)
</pre>

<p>
Therefore:
</p>

<p><b>AB = 5i + 2j</b></p>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Find the vector <b>PQ</b> if:
</p>

<pre>
P(-3,4)
Q(2,-1)
</pre>

<p><b>Step 1:</b> Subtract the x-coordinates.</p>

<pre>
2 - (-3) = 5
</pre>

<p><b>Step 2:</b> Subtract the y-coordinates.</p>

<pre>
-1 - 4 = -5
</pre>

<p><b>Step 3:</b> Write the vector.</p>

<pre>
→
PQ = (5,-5)
</pre>

<p>
Therefore:
</p>

<p><b>PQ = 5i - 5j</b></p>

<h3>4. WORKED EXAMPLE 3</h3>

<p>
Find the vector <b>CD</b> if:
</p>

<pre>
C(6,-2)
D(1,4)
</pre>

<p><b>Step 1:</b> Subtract the x-coordinates.</p>

<pre>
1 - 6 = -5
</pre>

<p><b>Step 2:</b> Subtract the y-coordinates.</p>

<pre>
4 - (-2) = 6
</pre>

<p><b>Step 3:</b> Write the vector.</p>

<pre>
→
CD = (-5,6)
</pre>

<p>
Therefore:
</p>

<p><b>CD = -5i + 6j</b></p>

<h3>5. THE DIRECTION MATTERS</h3>

<p>
The order of the letters tells us the direction.
</p>

<p>
For example, if:
</p>

<pre>
A(2,3)
B(7,5)
</pre>

<p>
then:
</p>

<pre>
→
AB = (5,2)
</pre>

<p>
But if we move in the opposite direction:
</p>

<pre>
→
BA = (2-7, 3-5)
   = (-5,-2)
</pre>

<p>
Therefore:
</p>

<p><b>BA = -AB</b></p>

<p>
Changing the direction changes the signs of both components.
</p>

<h3>6. THE RULE TO REMEMBER</h3>

<pre>
       FINAL POINT
            -
      STARTING POINT
            =
          VECTOR
</pre>

<p>
Therefore, if:
</p>

<pre>
A(x₁,y₁)
B(x₂,y₂)
</pre>

<p>
then:
</p>

<p><b>AB = (x₂-x₁, y₂-y₁)</b></p>

<p>
The first point is always the <b>starting point</b>.
The second point is always the <b>finishing point</b>.
</p>
`,

  [
    {
      q: "Find the vector AB if A(2,3) and B(7,5).",
      hint: "Final point minus starting point.",
      steps: [
        "Starting point A = (2,3)",
        "Final point B = (7,5)",
        "Subtract x-coordinates: 7 - 2 = 5",
        "Subtract y-coordinates: 5 - 3 = 2",
        "Therefore AB = (5,2)"
      ],
      ans: "(5,2)",
      why: "The vector from A to B is found by subtracting the coordinates of A from the coordinates of B."
    },
    {
      q: "Find the vector PQ if P(-3,4) and Q(2,-1).",
      hint: "Subtract P from Q.",
      steps: [
        "Starting point P = (-3,4)",
        "Final point Q = (2,-1)",
        "x-component: 2 - (-3) = 5",
        "y-component: -1 - 4 = -5",
        "Therefore PQ = (5,-5)"
      ],
      ans: "(5,-5)",
      why: "Vector PQ describes the movement from P to Q."
    },
    {
      q: "Find the vector CD if C(6,-2) and D(1,4).",
      hint: "Use final point minus starting point.",
      steps: [
        "Starting point C = (6,-2)",
        "Final point D = (1,4)",
        "x-component: 1 - 6 = -5",
        "y-component: 4 - (-2) = 6",
        "Therefore CD = (-5,6)"
      ],
      ans: "(-5,6)",
      why: "Subtracting the starting coordinates from the final coordinates gives the vector."
    },
    {
      q: "If A(2,3) and B(7,5), find BA.",
      hint: "BA moves from B back to A.",
      steps: [
        "Starting point B = (7,5)",
        "Final point A = (2,3)",
        "x-component: 2 - 7 = -5",
        "y-component: 3 - 5 = -2",
        "Therefore BA = (-5,-2)"
      ],
      ans: "(-5,-2)",
      why: "Reversing the direction of a vector changes the signs of both components."
    },
    {
      q: "If AB = (4,-3), what is BA?",
      hint: "The reverse vector is the negative of the original.",
      steps: [
        "AB = (4,-3)",
        "Reverse the direction",
        "Change both signs",
        "BA = (-4,3)"
      ],
      ans: "(-4,3)",
      why: "BA = -AB, so reversing a vector changes the signs of both components."
    },
    {
      q: "A point A is (1,2). A vector AB is (5,3). Find the coordinates of B.",
      hint: "Move from A by the vector AB.",
      steps: [
        "Start at A = (1,2)",
        "Add the x-component: 1 + 5 = 6",
        "Add the y-component: 2 + 3 = 5",
        "Therefore B = (6,5)"
      ],
      ans: "(6,5)",
      why: "The vector tells us how far and in which direction to move from A to reach B."
    }
  ]
);
add(
  "math",
  "vectors",
  "Equal Vectors",

  `
<h2>Equal Vectors</h2>

<p>
Two vectors are <b>equal</b> when they have the same
<b>magnitude</b> and the same <b>direction</b>.
</p>

<p>
They do <b>not</b> have to start from the same point.
</p>

<h3>1. THE MAIN IDEA</h3>

<p>
Suppose:
</p>

<pre>
→        (4,2)
a   =
</pre>

<p>
and
</p>

<pre>
→        (4,2)
b   =
</pre>

<p>
The two vectors are equal because their corresponding
components are the same.
</p>

<pre>
4 = 4
2 = 2
</pre>

<p>
Therefore:
</p>

<pre>
→   →
a = b
</pre>

<h3>2. HOW TO CHECK IF TWO VECTORS ARE EQUAL</h3>

<p>
Compare their corresponding components.
</p>

<pre>
(x₁,y₁) = (x₂,y₂)
</pre>

<p>
For the vectors to be equal:
</p>

<pre>
x₁ = x₂

y₁ = y₂
</pre>

<p>
Both components must match.
</p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Determine whether the following vectors are equal:
</p>

<pre>
→        (5,3)
a   =

→        (5,3)
b   =
</pre>

<p><b>Step 1:</b> Compare the x-components.</p>

<pre>
5 = 5
</pre>

<p><b>Step 2:</b> Compare the y-components.</p>

<pre>
3 = 3
</pre>

<p>
Both components are equal.
</p>

<pre>
→   →
a = b
</pre>

<p>
Therefore, the vectors are equal.
</p>

<h3>4. WORKED EXAMPLE 2: USING POINTS</h3>

<p>
Given:
</p>

<pre>
A(1,2)
B(5,4)

C(-2,3)
D(2,5)
</pre>

<p>
Determine whether <b>AB</b> and <b>CD</b> are equal.
</p>

<p><b>Step 1: Find AB.</b></p>

<pre>
AB = B - A

   = (5,4) - (1,2)

   = (5-1, 4-2)

   = (4,2)
</pre>

<p><b>Step 2: Find CD.</b></p>

<pre>
CD = D - C

   = (2,5) - (-2,3)

   = (2+2, 5-3)

   = (4,2)
</pre>

<p><b>Step 3: Compare.</b></p>

<pre>
AB = (4,2)

CD = (4,2)
</pre>

<p>
Therefore:
</p>

<pre>
→   →
AB = CD
</pre>

<p>
The two directed line segments represent the same vector,
even though they start at different points.
</p>

<h3>5. WORKED EXAMPLE 3: SAME LENGTH DOES NOT ALWAYS MEAN EQUAL</h3>

<p>
Consider:
</p>

<pre>
→        (3,4)
a   =

→        (-3,-4)
b   =
</pre>

<p>
The components have the same sizes, but their signs are different.
</p>

<pre>
a = (3,4)

b = (-3,-4)
</pre>

<p>
The second vector points in the opposite direction.
</p>

<p>
Therefore:
</p>

<pre>
→   →
a ≠ b
</pre>

<p>
So two vectors can have the same magnitude but still
be different vectors if their directions are different.
</p>

<h3>6. FINDING AN UNKNOWN USING EQUAL VECTORS</h3>

<p>
Suppose:
</p>

<pre>
→        (6,y)
a   =

→        (6,4)
b   =
</pre>

<p>
If <b>a = b</b>, corresponding components must be equal.
</p>

<pre>
y = 4
</pre>

<p>
Therefore:
</p>

<pre>
→        (6,4)
a   =
</pre>

<h3>7. THE KEY RULE</h3>

<pre>
Two vectors are equal
if and only if
their corresponding components are equal.

(x₁,y₁) = (x₂,y₂)

when:

x₁ = x₂
and
y₁ = y₂
</pre>

<p>
<b>Remember:</b> The starting point does not determine whether
two vectors are equal. Their magnitude and direction do.
</p>
`,

  [
    {
      q: "Determine whether the vectors a = (4,7) and b = (4,7) are equal.",
      hint: "Compare the x-components and then the y-components.",
      steps: [
        "Compare the x-components: 4 = 4.",
        "Compare the y-components: 7 = 7.",
        "Both components are equal.",
        "Therefore, a = b."
      ],
      ans: "Yes, the vectors are equal.",
      why: "Equal vectors must have identical corresponding components."
    },

    {
      q: "Determine whether a = (3,-5) and b = (-3,5) are equal.",
      hint: "Look carefully at the signs of both components.",
      steps: [
        "Compare the x-components: 3 ≠ -3.",
        "The corresponding components are not equal.",
        "Therefore, the vectors are not equal."
      ],
      ans: "No, a ≠ b.",
      why: "The vectors point in opposite directions."
    },

    {
      q: "A(2,1), B(7,4), C(-3,5), and D(2,8). Determine whether AB and CD are equal.",
      hint: "Find both vectors first.",
      steps: [
        "AB = B - A = (7-2, 4-1) = (5,3).",
        "CD = D - C = (2-(-3), 8-5) = (5,3).",
        "Both vectors have the same components.",
        "Therefore, AB = CD."
      ],
      ans: "AB = CD = (5,3).",
      why: "Although the vectors start at different points, they have the same magnitude and direction."
    },

    {
      q: "Given a = (8,x) and b = (8,6), find x if a = b.",
      hint: "Equal vectors have equal corresponding components.",
      steps: [
        "Compare the first components: 8 = 8.",
        "Compare the second components: x = 6.",
        "Therefore, x = 6."
      ],
      ans: "x = 6",
      why: "The corresponding components of equal vectors must be equal."
    },

    {
      q: "A(1,4), B(6,9), and C(3,2). Point D is such that AB = CD. Find D.",
      hint: "First find AB, then add that vector to C.",
      steps: [
        "AB = B - A = (6-1, 9-4) = (5,5).",
        "Since AB = CD, CD = (5,5).",
        "Start at C(3,2) and move by (5,5).",
        "D = (3+5, 2+5).",
        "D = (8,7)."
      ],
      ans: "D = (8,7)",
      why: "The vector CD must have exactly the same components as AB."
    }
  ]
);
add(
  "math",
  "vectors",
  "Opposite Vectors",

  `
<h2>Opposite Vectors</h2>

<p>
Two vectors are <b>opposite vectors</b> when they have the
same magnitude but point in exactly opposite directions.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
To find the opposite of a vector, change the sign of
<b>every component</b>.
</p>

<pre>
→        (x,y)
a   =

→        (-x,-y)
-a  =
</pre>

<p>
For example:
</p>

<pre>
→        (4,3)
a   =

→        (-4,-3)
-a  =
</pre>

<p>
The direction has been reversed.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find the opposite of:
</p>

<pre>
→
a = (5,2)
</pre>

<p><b>Step 1:</b> Change the sign of the x-component.</p>

<pre>
5 → -5
</pre>

<p><b>Step 2:</b> Change the sign of the y-component.</p>

<pre>
2 → -2
</pre>

<p>
Therefore:
</p>

<pre>
→        (5,2)
a   =

→         (-5,-2)
-a  =
</pre>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Find the opposite of:
</p>

<pre>
→
b = (-7,4)
</pre>

<p>
Change both signs:
</p>

<pre>
-7 → 7
4  → -4
</pre>

<p>
Therefore:
</p>

<pre>
→         (-7,4)
b   =

→         (7,-4)
-b  =
</pre>

<h3>4. WORKED EXAMPLE 3: USING POINTS</h3>

<p>
Suppose:
</p>

<pre>
A(2,3)
B(8,6)
</pre>

<p>
Find the opposite of vector <b>AB</b>.
</p>

<p><b>Step 1: Find AB.</b></p>

<pre>
AB = B - A

   = (8,6) - (2,3)

   = (6,3)
</pre>

<p><b>Step 2: Change both signs.</b></p>

<pre>
(6,3) → (-6,-3)
</pre>

<p>
Therefore:
</p>

<pre>
→
-AB = (-6,-3)
</pre>

<p>
Notice that the opposite vector is exactly what we get
when we reverse the direction:
</p>

<pre>
→         (6,3)
AB   =

→         (-6,-3)
BA   =
</pre>

<p>
Therefore:
</p>

<pre>
→     → 
BA = -AB
</pre>

<h3>5. WHY THE SIGNS CHANGE</h3>

<p>
Consider the vector:
</p>

<pre>
→
a = (4,2)
</pre>

<p>
It means:
</p>

<pre>
4 units horizontally
2 units vertically
</pre>

<p>
Its opposite vector is:
</p>

<pre>
→
-a = (-4,-2)
</pre>

<p>
This means:
</p>

<pre>
4 units in the opposite horizontal direction
2 units in the opposite vertical direction
</pre>

<p>
So changing both signs reverses the direction.
</p>

<h3>6. A VERY IMPORTANT RESULT</h3>

<p>
A vector and its opposite cancel each other.
</p>

<pre>
→   → 
a + (-a) = (0,0)
</pre>

<p>
For example:
</p>

<pre>
(5,3) + (-5,-3)

= (5-5, 3-3)

= (0,0)
</pre>

<p>
The result is the <b>zero vector</b>.
</p>

<h3>7. THE KEY RULE</h3>

<pre>
Opposite of:

(x,y)

is:

(-x,-y)
</pre>

<p>
<b>Remember:</b> To reverse a vector, change the sign of
every component.
</p>
`,

  [
    {
      q: "Find the opposite of the vector a = (6,4).",
      hint: "Change the sign of both components.",
      steps: [
        "Change 6 to -6.",
        "Change 4 to -4.",
        "Therefore, -a = (-6,-4)."
      ],
      ans: "-a = (-6,-4)",
      why: "The opposite vector has the same magnitude but the opposite direction."
    },

    {
      q: "Find the opposite of b = (-3,7).",
      hint: "Change both signs.",
      steps: [
        "Change -3 to 3.",
        "Change 7 to -7.",
        "Therefore, -b = (3,-7)."
      ],
      ans: "-b = (3,-7)",
      why: "Both components must change sign when the direction is reversed."
    },

    {
      q: "Given a = (8,-5), find a + (-a).",
      hint: "First find -a.",
      steps: [
        "a = (8,-5).",
        "-a = (-8,5).",
        "Add the components: (8,-5) + (-8,5).",
        "x-component: 8 + (-8) = 0.",
        "y-component: -5 + 5 = 0.",
        "Therefore, a + (-a) = (0,0)."
      ],
      ans: "(0,0)",
      why: "A vector and its opposite cancel each other."
    },

    {
      q: "A(2,1) and B(9,5). Find the opposite of AB.",
      hint: "First find AB using final point minus initial point.",
      steps: [
        "AB = B - A.",
        "AB = (9-2, 5-1).",
        "AB = (7,4).",
        "Change both signs.",
        "-AB = (-7,-4)."
      ],
      ans: "-AB = (-7,-4)",
      why: "Reversing the direction of AB changes both component signs."
    },

    {
      q: "If -a = (4,-6), find a.",
      hint: "The opposite of the opposite gives the original vector.",
      steps: [
        "The vector opposite to (4,-6) is (-4,6).",
        "Therefore, a = (-4,6)."
      ],
      ans: "a = (-4,6)",
      why: "Taking the opposite twice returns the original vector."
    }
  ]
);
add(
  "math",
  "vectors",
  "Scalar Multiplication of a Vector",

  `
<h2>Scalar Multiplication of a Vector</h2>

<p>
A <b>scalar</b> is an ordinary number.
</p>

<p>
When a vector is multiplied by a scalar, the scalar multiplies
<b>every component</b> of the vector.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
If:
</p>

<pre>
→        (x,y)
a   =
</pre>

<p>
then:
</p>

<pre>
→
ka = (kx, ky)
</pre>

<p>
where <b>k</b> is the scalar.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find:
</p>

<pre>
3(2,4)
</pre>

<p><b>Step 1:</b> Multiply the x-component by 3.</p>

<pre>
3 × 2 = 6
</pre>

<p><b>Step 2:</b> Multiply the y-component by 3.</p>

<pre>
3 × 4 = 12
</pre>

<p><b>Step 3:</b> Write the new vector.</p>

<pre>
3(2,4) = (6,12)
</pre>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Find:
</p>

<pre>
-2(3,-5)
</pre>

<p><b>Step 1:</b> Multiply the first component.</p>

<pre>
-2 × 3 = -6
</pre>

<p><b>Step 2:</b> Multiply the second component.</p>

<pre>
-2 × (-5) = 10
</pre>

<p><b>Step 3:</b> Combine the components.</p>

<pre>
-2(3,-5) = (-6,10)
</pre>

<p>
Notice that the negative scalar changes the direction
of the vector as well as its size.
</p>

<h3>4. WORKED EXAMPLE 3</h3>

<p>
Given:
</p>

<pre>
→        (4,-3)
a   =
</pre>

<p>
Find <b>5a</b>.
</p>

<p><b>Step 1:</b></p>

<pre>
5 × 4 = 20
</pre>

<p><b>Step 2:</b></p>

<pre>
5 × (-3) = -15
</pre>

<p><b>Step 3:</b></p>

<pre>
5a = (20,-15)
</pre>

<h3>5. WHAT HAPPENS WHEN THE SCALAR IS NEGATIVE?</h3>

<p>
Consider:
</p>

<pre>
→        (2,3)
a   =
</pre>

<p>
Multiply by <b>-1</b>:
</p>

<pre>
-a = -1(2,3)

   = (-2,-3)
</pre>

<p>
This produces the <b>opposite vector</b>.
</p>

<p>
So:
</p>

<pre>
-a = (-2,-3)
</pre>

<p>
A negative scalar reverses the direction.
</p>

<h3>6. WHAT HAPPENS WHEN THE SCALAR IS ZERO?</h3>

<p>
If:
</p>

<pre>
→        (4,7)
a   =
</pre>

<p>
then:
</p>

<pre>
0a = 0(4,7)

   = (0,0)
</pre>

<p>
The result is the <b>zero vector</b>.
</p>

<h3>7. WHAT HAPPENS WHEN THE SCALAR IS BETWEEN 0 AND 1?</h3>

<p>
Consider:
</p>

<pre>
→        (8,6)
a   =
</pre>

<p>
Multiply by <b>1/2</b>:
</p>

<pre>
1/2 a = 1/2(8,6)

      = (4,3)
</pre>

<p>
The direction stays the same, but the vector becomes
shorter.
</p>

<h3>8. SCALAR MULTIPLICATION IN i AND j FORM</h3>

<p>
Suppose:
</p>

<pre>
→
a = 3i + 4j
</pre>

<p>
Find <b>2a</b>.
</p>

<pre>
2a = 2(3i + 4j)

   = 6i + 8j
</pre>

<p>
The scalar multiplies the coefficient of both <b>i</b> and <b>j</b>.
</p>

<h3>9. THE KEY RULE</h3>

<pre>
k(x,y) = (kx,ky)
</pre>

<p>
<b>Positive scalar:</b> same direction.
</p>

<p>
<b>Negative scalar:</b> opposite direction.
</p>

<p>
<b>Scalar between 0 and 1:</b> same direction, shorter vector.
</p>

<p>
<b>Scalar greater than 1:</b> same direction, longer vector.
</p>

<p>
<b>Zero scalar:</b> zero vector.
</p>
`,

  [
    {
      q: "Find 4(3,2).",
      hint: "Multiply both components by 4.",
      steps: [
        "4 × 3 = 12.",
        "4 × 2 = 8.",
        "Therefore, 4(3,2) = (12,8)."
      ],
      ans: "(12,8)",
      why: "A scalar multiplies every component of the vector."
    },

    {
      q: "Find -3(2,-4).",
      hint: "Multiply -3 by each component.",
      steps: [
        "-3 × 2 = -6.",
        "-3 × (-4) = 12.",
        "Therefore, -3(2,-4) = (-6,12)."
      ],
      ans: "(-6,12)",
      why: "The negative scalar changes the direction as well as scaling the vector."
    },

    {
      q: "Given a = (6,-8), find 1/2 a.",
      hint: "Multiply each component by 1/2.",
      steps: [
        "1/2 × 6 = 3.",
        "1/2 × (-8) = -4.",
        "Therefore, 1/2 a = (3,-4)."
      ],
      ans: "(3,-4)",
      why: "Multiplying by a scalar between 0 and 1 keeps the direction but reduces the size."
    },

    {
      q: "Given a = (-2,5), find -a.",
      hint: "Multiply the vector by -1.",
      steps: [
        "-1 × (-2) = 2.",
        "-1 × 5 = -5.",
        "Therefore, -a = (2,-5)."
      ],
      ans: "(2,-5)",
      why: "Multiplying by -1 gives the opposite vector."
    },

    {
      q: "Given a = (7,-3), find 0a.",
      hint: "Multiply both components by zero.",
      steps: [
        "0 × 7 = 0.",
        "0 × (-3) = 0.",
        "Therefore, 0a = (0,0)."
      ],
      ans: "(0,0)",
      why: "Multiplying any vector by zero produces the zero vector."
    },

    {
      q: "Given a = 2i - 5j, find 3a.",
      hint: "Multiply both coefficients by 3.",
      steps: [
        "3 × 2 = 6.",
        "3 × (-5) = -15.",
        "Therefore, 3a = 6i - 15j."
      ],
      ans: "6i - 15j",
      why: "Scalar multiplication applies to both vector components."
    }
  ]
);
add(
  "math",
  "vectors",
  "Parallel Vectors",

  `
<h2>Parallel Vectors</h2>

<p>
Two vectors are <b>parallel</b> when they act in the same direction
or in exactly opposite directions.
</p>

<p>
The key test is:
</p>

<pre>
→     →
b = ka
</pre>

<p>
where <b>k</b> is a scalar.
</p>

<p>
In other words, one vector must be a multiple of the other.
</p>

<h3>1. SAME DIRECTION</h3>

<p>
Consider:
</p>

<pre>
→        (2,3)
a   =

→        (6,9)
b   =
</pre>

<p>
Check whether <b>b</b> is a multiple of <b>a</b>.
</p>

<pre>
3(2,3)

= (6,9)
</pre>

<p>
Therefore:
</p>

<pre>
→     →
b = 3a
</pre>

<p>
So <b>a</b> and <b>b</b> are parallel and point in
the same direction.
</p>

<h3>2. OPPOSITE DIRECTIONS</h3>

<p>
Consider:
</p>

<pre>
→        (4,-2)
a   =

→        (-8,4)
b   =
</pre>

<p>
Multiply <b>a</b> by -2:
</p>

<pre>
-2(4,-2)

= (-8,4)
</pre>

<p>
Therefore:
</p>

<pre>
→      →
b = -2a
</pre>

<p>
The vectors are parallel, but they point in opposite directions.
</p>

<h3>3. WORKED EXAMPLE 1</h3>

<p>
Determine whether:
</p>

<pre>
→        (3,5)
a   =

→        (9,15)
b   =
</pre>

<p>
are parallel.
</p>

<p><b>Step 1:</b> Compare the x-components.</p>

<pre>
9 ÷ 3 = 3
</pre>

<p><b>Step 2:</b> Compare the y-components.</p>

<pre>
15 ÷ 5 = 3
</pre>

<p>
The same multiplier is obtained:
</p>

<pre>
3 = 3
</pre>

<p>
Therefore:
</p>

<pre>
→     →
b = 3a
</pre>

<p>
So the vectors are parallel.
</p>

<h3>4. WORKED EXAMPLE 2</h3>

<p>
Determine whether:
</p>

<pre>
→        (4,6)
a   =

→        (10,15)
b   =
</pre>

<p>
are parallel.
</p>

<p><b>Step 1:</b> Compare the x-components.</p>

<pre>
10 ÷ 4 = 2.5
</pre>

<p><b>Step 2:</b> Compare the y-components.</p>

<pre>
15 ÷ 6 = 2.5
</pre>

<p>
The multipliers are the same.
</p>

<pre>
b = 2.5a
</pre>

<p>
Therefore, the vectors are parallel.
</p>

<h3>5. WORKED EXAMPLE 3: NOT PARALLEL</h3>

<p>
Determine whether:
</p>

<pre>
→        (2,3)
a   =

→        (8,10)
b   =
</pre>

<p>
are parallel.
</p>

<p><b>Step 1:</b> Compare the x-components.</p>

<pre>
8 ÷ 2 = 4
</pre>

<p><b>Step 2:</b> Compare the y-components.</p>

<pre>
10 ÷ 3 ≈ 3.33
</pre>

<p>
The multipliers are different:
</p>

<pre>
4 ≠ 3.33
</pre>

<p>
Therefore, there is no single scalar that changes
<b>a</b> into <b>b</b>.
</p>

<p>
So the vectors are <b>not parallel</b>.
</p>

<h3>6. FINDING AN UNKNOWN VALUE</h3>

<p>
Suppose:
</p>

<pre>
→        (4,6)
a   =

→        (x,15)
b   =
</pre>

<p>
If <b>a</b> and <b>b</b> are parallel, the same multiplier
must work for both components.
</p>

<p>
From the y-components:
</p>

<pre>
15 ÷ 6 = 2.5
</pre>

<p>
Therefore:
</p>

<pre>
x = 2.5 × 4

x = 10
</pre>

<p>
So:
</p>

<pre>
→        (10,15)
b   =
</pre>

<p>
and:
</p>

<pre>
b = 2.5a
</pre>

<h3>7. PARALLEL VECTORS FROM POINTS</h3>

<p>
Suppose:
</p>

<pre>
A(1,2)
B(5,5)

C(3,1)
D(11,7)
</pre>

<p>
Find AB and CD.
</p>

<p><b>Step 1: Find AB.</b></p>

<pre>
AB = (5-1, 5-2)

   = (4,3)
</pre>

<p><b>Step 2: Find CD.</b></p>

<pre>
CD = (11-3, 7-1)

   = (8,6)
</pre>

<p><b>Step 3: Compare.</b></p>

<pre>
(8,6) = 2(4,3)
</pre>

<p>
Therefore:
</p>

<pre>
→     →
CD = 2AB
</pre>

<p>
So <b>AB</b> and <b>CD</b> are parallel.
</p>

<h3>8. THE KEY TEST</h3>

<pre>
Two vectors are parallel
if one is a scalar multiple
of the other.

→     →
b = ka
</pre>

<p>
<b>k &gt; 0:</b> same direction.
</p>

<p>
<b>k &lt; 0:</b> opposite directions.
</p>

<p>
<b>No single k:</b> not parallel.
</p>
`,

  [
    {
      q: "Determine whether a = (2,5) and b = (6,15) are parallel.",
      hint: "Find the multiplier from both components.",
      steps: [
        "6 ÷ 2 = 3.",
        "15 ÷ 5 = 3.",
        "The same multiplier works for both components.",
        "Therefore, b = 3a.",
        "The vectors are parallel."
      ],
      ans: "Yes, the vectors are parallel.",
      why: "One vector is 3 times the other."
    },

    {
      q: "Determine whether a = (3,4) and b = (-6,-8) are parallel.",
      hint: "Check whether the same negative multiplier works for both components.",
      steps: [
        "-6 ÷ 3 = -2.",
        "-8 ÷ 4 = -2.",
        "The same multiplier works for both components.",
        "Therefore, b = -2a.",
        "The vectors are parallel but point in opposite directions."
      ],
      ans: "Yes, they are parallel.",
      why: "A negative scalar multiple produces a vector in the opposite direction."
    },

    {
      q: "Determine whether a = (4,7) and b = (12,20) are parallel.",
      hint: "Compare 12 ÷ 4 with 20 ÷ 7.",
      steps: [
        "12 ÷ 4 = 3.",
        "20 ÷ 7 ≈ 2.86.",
        "The multipliers are not equal.",
        "Therefore, there is no single scalar relating the two vectors."
      ],
      ans: "No, the vectors are not parallel.",
      why: "Parallel vectors must have the same scalar multiplier for every component."
    },

    {
      q: "Given a = (5,2) and b = (x,6), find x if a and b are parallel.",
      hint: "Use the y-components to find the multiplier.",
      steps: [
        "6 ÷ 2 = 3.",
        "Therefore, b = 3a.",
        "x = 3 × 5.",
        "x = 15."
      ],
      ans: "x = 15",
      why: "The same scalar must multiply both components."
    },

    {
      q: "A(2,1), B(6,4), C(3,5), and D(11,11). Determine whether AB and CD are parallel.",
      hint: "Find both vectors first.",
      steps: [
        "AB = (6-2, 4-1) = (4,3).",
        "CD = (11-3, 11-5) = (8,6).",
        "CD = 2(4,3).",
        "Therefore, CD = 2AB.",
        "So AB and CD are parallel."
      ],
      ans: "Yes, AB and CD are parallel.",
      why: "CD is a scalar multiple of AB."
    },

    {
      q: "If b = -3a and a = (2,-4), find b.",
      hint: "Multiply every component of a by -3.",
      steps: [
        "b = -3(2,-4).",
        "-3 × 2 = -6.",
        "-3 × (-4) = 12.",
        "Therefore, b = (-6,12)."
      ],
      ans: "b = (-6,12)",
      why: "A negative scalar multiple produces a parallel vector in the opposite direction."
    }
  ]
);
add(
  "math",
  "vectors",
  "Position Vector",

  `
<h2>Position Vector</h2>

<p>
A <b>position vector</b> describes the position of a point
relative to the origin.
</p>

<p>
The origin is:
</p>

<pre>
O(0,0)
</pre>

<p>
If a point is:
</p>

<pre>
A(x,y)
</pre>

<p>
then its position vector is:
</p>

<pre>
→        (x)
OA  =
         (y)
</pre>

<p>
or, in <b>i and j</b> form:
</p>

<pre>
→
OA = xi + yj
</pre>

<h3>1. THE MAIN IDEA</h3>

<p>
The position vector starts at the origin and ends at
the point being described.
</p>

<pre>
O(0,0) ─────────→ A(x,y)
             →
             OA
</pre>

<p>
So the coordinates of the point become the components
of its position vector.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find the position vector of:
</p>

<pre>
A(4,7)
</pre>

<p>
The point is 4 units horizontally and 7 units vertically
from the origin.
</p>

<pre>
→
OA = (4,7)
</pre>

<p>
In i and j form:
</p>

<pre>
→
OA = 4i + 7j
</pre>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Find the position vector of:
</p>

<pre>
B(-3,5)
</pre>

<p>
The x-coordinate is -3 and the y-coordinate is 5.
</p>

<pre>
→
OB = (-3,5)
</pre>

<p>
Therefore:
</p>

<pre>
→
OB = -3i + 5j
</pre>

<p>
The negative x-component means that B lies to the
left of the origin.
</p>

<h3>4. WORKED EXAMPLE 3</h3>

<p>
Find the coordinates of point C if:
</p>

<pre>
→
OC = (6,-4)
</pre>

<p>
The components of the position vector are simply the
coordinates of the point.
</p>

<pre>
x = 6
y = -4
</pre>

<p>
Therefore:
</p>

<pre>
C(6,-4)
</pre>

<h3>5. POSITION VECTOR AND A VECTOR BETWEEN TWO POINTS</h3>

<p>
Suppose:
</p>

<pre>
A(2,3)
B(7,8)
</pre>

<p>
Their position vectors are:
</p>

<pre>
→        (2,3)
OA  =

→        (7,8)
OB  =
</pre>

<p>
To find <b>AB</b>, subtract the position vector of A
from the position vector of B.
</p>

<pre>
→     →     →
AB = OB - OA
</pre>

<p>
Substitute:
</p>

<pre>
AB = (7,8) - (2,3)

   = (5,5)
</pre>

<p>
Therefore:
</p>

<pre>
→
AB = (5,5)
</pre>

<p>
This gives the important relationship:
</p>

<pre>
→     →     →
AB = OB - OA
</pre>

<p>
So:
</p>

<p>
<b>Vector from A to B = position vector of B − position vector of A.</b>
</p>

<h3>6. POSITION VECTOR IN i AND j FORM</h3>

<p>
Suppose:
</p>

<pre>
→
OA = 3i - 2j
</pre>

<p>
The coefficient of <b>i</b> gives the x-coordinate.
The coefficient of <b>j</b> gives the y-coordinate.
</p>

<pre>
x = 3
y = -2
</pre>

<p>
Therefore:
</p>

<pre>
A(3,-2)
</pre>

<h3>7. A COMMON MISTAKE</h3>

<p>
Do not confuse a <b>position vector</b> with a vector
between two arbitrary points.
</p>

<p>
For example:
</p>

<pre>
A(2,3)
B(7,5)
</pre>

<p>
Position vector of A:
</p>

<pre>
→
OA = (2,3)
</pre>

<p>
Position vector of B:
</p>

<pre>
→
OB = (7,5)
</pre>

<p>
But:
</p>

<pre>
→
AB = (5,2)
</pre>

<p>
They are different vectors because they describe different
movements.
</p>

<h3>8. THE KEY RULE</h3>

<pre>
Point:
A(x,y)

Position vector:
→
OA = (x,y)

or:

→
OA = xi + yj
</pre>

<p>
And for two points:
</p>

<pre>
→     →     →
AB = OB - OA
</pre>

<p>
<b>Remember:</b> A position vector always starts at the origin.
</p>
`,

  [
    {
      q: "Find the position vector of A(5,3).",
      hint: "The coordinates of the point become the components of its position vector.",
      steps: [
        "A has x-coordinate 5.",
        "A has y-coordinate 3.",
        "Therefore, OA = (5,3)."
      ],
      ans: "OA = (5,3)",
      why: "A position vector gives the coordinates of a point relative to the origin."
    },

    {
      q: "Find the position vector of B(-4,6) in i and j form.",
      hint: "The x-coordinate multiplies i and the y-coordinate multiplies j.",
      steps: [
        "The x-coordinate is -4.",
        "The y-coordinate is 6.",
        "Therefore, OB = -4i + 6j."
      ],
      ans: "OB = -4i + 6j",
      why: "The position vector components are the point's x- and y-coordinates."
    },

    {
      q: "The position vector of C is OC = (7,-2). Find the coordinates of C.",
      hint: "Read the x- and y-components directly.",
      steps: [
        "The x-component is 7.",
        "The y-component is -2.",
        "Therefore, C = (7,-2)."
      ],
      ans: "C(7,-2)",
      why: "The components of a position vector are the coordinates of its endpoint."
    },

    {
      q: "A(2,4) and B(9,7). Find AB using their position vectors.",
      hint: "Use AB = OB - OA.",
      steps: [
        "OA = (2,4).",
        "OB = (9,7).",
        "AB = OB - OA.",
        "AB = (9,7) - (2,4).",
        "AB = (7,3)."
      ],
      ans: "AB = (7,3)",
      why: "The vector from A to B is found by subtracting A's position vector from B's."
    },

    {
      q: "Given OA = 4i + 3j and OB = 9i + 8j, find AB.",
      hint: "Use AB = OB - OA and subtract corresponding components.",
      steps: [
        "AB = OB - OA.",
        "AB = (9,8) - (4,3).",
        "AB = (9-4, 8-3).",
        "AB = (5,5).",
        "Therefore, AB = 5i + 5j."
      ],
      ans: "AB = 5i + 5j",
      why: "Subtracting the two position vectors gives the displacement from A to B."
    },

    {
      q: "Point P has position vector OP = -6i + 2j. In which quadrant is P?",
      hint: "Convert the position vector into coordinates first.",
      steps: [
        "OP = (-6,2).",
        "The x-coordinate is negative.",
        "The y-coordinate is positive.",
        "A point with x negative and y positive lies in Quadrant II."
      ],
      ans: "P lies in Quadrant II.",
      why: "Quadrant II contains points with negative x-coordinates and positive y-coordinates."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Addition",

  `
<h2>Vector Addition</h2>

<p>
Vector addition combines two vectors to produce a
<b>resultant vector</b>.
</p>

<p>
When vectors are written in component form, add
corresponding components.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
If:
</p>

<pre>
→        (x₁,y₁)
a   =

→        (x₂,y₂)
b   =
</pre>

<p>
then:
</p>

<pre>
→   →
a + b = (x₁+x₂, y₁+y₂)
</pre>

<p>
So:
</p>

<pre>
x-component + x-component

y-component + y-component
</pre>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find:
</p>

<pre>
(3,2) + (4,5)
</pre>

<p><b>Step 1:</b> Add the x-components.</p>

<pre>
3 + 4 = 7
</pre>

<p><b>Step 2:</b> Add the y-components.</p>

<pre>
2 + 5 = 7
</pre>

<p><b>Step 3:</b> Write the resultant vector.</p>

<pre>
(3,2) + (4,5) = (7,7)
</pre>

<h3>3. WORKED EXAMPLE 2: NEGATIVE COMPONENTS</h3>

<p>
Find:
</p>

<pre>
(6,-3) + (-2,5)
</pre>

<p><b>Step 1:</b> Add the x-components.</p>

<pre>
6 + (-2) = 4
</pre>

<p><b>Step 2:</b> Add the y-components.</p>

<pre>
-3 + 5 = 2
</pre>

<p>
Therefore:
</p>

<pre>
(6,-3) + (-2,5) = (4,2)
</pre>

<h3>4. WORKED EXAMPLE 3: i AND j FORM</h3>

<p>
Given:
</p>

<pre>
→
a = 3i + 4j

→
b = 5i - 2j
</pre>

<p>
Find <b>a + b</b>.
</p>

<p><b>Step 1:</b> Add the i-components.</p>

<pre>
3i + 5i = 8i
</pre>

<p><b>Step 2:</b> Add the j-components.</p>

<pre>
4j + (-2j) = 2j
</pre>

<p><b>Step 3:</b> Combine them.</p>

<pre>
→   →
a + b = 8i + 2j
</pre>

<p>
Therefore:
</p>

<pre>
→   →
a + b = (8,2)
</pre>

<h3>5. VECTOR ADDITION AS MOVEMENT</h3>

<p>
Suppose a student walks:
</p>

<pre>
4 m east
</pre>

<p>
and then:
</p>

<pre>
3 m north
</pre>

<p>
Represent these movements as:
</p>

<pre>
→        (4,0)
a   =

→        (0,3)
b   =
</pre>

<p>
The total displacement is:
</p>

<pre>
a + b

= (4,0) + (0,3)

= (4,3)
</pre>

<p>
So the student's final displacement from the starting
point is represented by <b>(4,3)</b>.
</p>

<h3>6. ADDING THREE VECTORS</h3>

<p>
The same rule applies when there are three or more vectors.
</p>

<p>
Find:
</p>

<pre>
(2,3) + (4,-1) + (-3,5)
</pre>

<p><b>Step 1:</b> Add the x-components.</p>

<pre>
2 + 4 + (-3) = 3
</pre>

<p><b>Step 2:</b> Add the y-components.</p>

<pre>
3 + (-1) + 5 = 7
</pre>

<p>
Therefore:
</p>

<pre>
(2,3) + (4,-1) + (-3,5)

= (3,7)
</pre>

<h3>7. A USEFUL CHECK</h3>

<p>
When adding vectors, never mix the x-component of one
vector with the y-component of another.
</p>

<p>
Always work in pairs:
</p>

<pre>
x + x

y + y
</pre>

<p>
For example:
</p>

<pre>
(5,2) + (3,7)

x: 5 + 3 = 8

y: 2 + 7 = 9

answer: (8,9)
</pre>

<h3>8. THE KEY RULE</h3>

<pre>
→        (x₁,y₁)
a   =

→        (x₂,y₂)
b   =

→   →
a + b = (x₁+x₂, y₁+y₂)
</pre>

<p>
<b>Remember:</b> Add corresponding components.
</p>
`,

  [
    {
      q: "Find (4,3) + (2,5).",
      hint: "Add the x-components together and the y-components together.",
      steps: [
        "x-components: 4 + 2 = 6.",
        "y-components: 3 + 5 = 8.",
        "Therefore, (4,3) + (2,5) = (6,8)."
      ],
      ans: "(6,8)",
      why: "Vector addition is performed component by component."
    },

    {
      q: "Find (7,-2) + (-3,6).",
      hint: "Be careful with the negative signs.",
      steps: [
        "x-components: 7 + (-3) = 4.",
        "y-components: -2 + 6 = 4.",
        "Therefore, the resultant is (4,4)."
      ],
      ans: "(4,4)",
      why: "Each component is added to the corresponding component of the other vector."
    },

    {
      q: "Given a = 5i + 2j and b = -3i + 4j, find a + b.",
      hint: "Combine the i terms and then the j terms.",
      steps: [
        "i-components: 5i + (-3i) = 2i.",
        "j-components: 2j + 4j = 6j.",
        "Therefore, a + b = 2i + 6j."
      ],
      ans: "2i + 6j",
      why: "Like components of vectors are added together."
    },

    {
      q: "A person walks 5 m east and then 2 m west. Represent the total displacement as a vector.",
      hint: "Take east as positive and west as negative.",
      steps: [
        "5 m east = (5,0).",
        "2 m west = (-2,0).",
        "Add the vectors: (5,0) + (-2,0).",
        "5 + (-2) = 3.",
        "Therefore, the displacement is (3,0)."
      ],
      ans: "(3,0), meaning 3 m east.",
      why: "Opposite movements along the same direction axis partially cancel."
    },

    {
      q: "Find (2,4) + (3,-2) + (-1,5).",
      hint: "Add all x-components separately from all y-components.",
      steps: [
        "x-components: 2 + 3 + (-1) = 4.",
        "y-components: 4 + (-2) + 5 = 7.",
        "Therefore, the resultant vector is (4,7)."
      ],
      ans: "(4,7)",
      why: "Every corresponding component is added to obtain the resultant."
    },

    {
      q: "Two vectors are a = (6,2) and b = (-6,-2). Find a + b and explain what the result means.",
      hint: "Notice the relationship between the two vectors.",
      steps: [
        "Add the x-components: 6 + (-6) = 0.",
        "Add the y-components: 2 + (-2) = 0.",
        "Therefore, a + b = (0,0).",
        "The two vectors are opposites and cancel each other."
      ],
      ans: "(0,0)",
      why: "A vector and its opposite produce the zero vector when added."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Subtraction",

  `
<h2>Vector Subtraction</h2>

<p>
Vector subtraction finds the difference between two vectors.
</p>

<p>
The important idea is:
</p>

<pre>
→   →     →     →
a - b = a + (-b)
</pre>

<p>
So subtracting a vector is the same as
<b>adding its opposite</b>.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
If:
</p>

<pre>
→        (x₁,y₁)
a   =

→        (x₂,y₂)
b   =
</pre>

<p>
then:
</p>

<pre>
→   → 
a - b = (x₁-x₂, y₁-y₂)
</pre>

<p>
Subtract corresponding components.
</p>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find:
</p>

<pre>
(7,5) - (3,2)
</pre>

<p><b>Step 1:</b> Subtract the x-components.</p>

<pre>
7 - 3 = 4
</pre>

<p><b>Step 2:</b> Subtract the y-components.</p>

<pre>
5 - 2 = 3
</pre>

<p>
Therefore:
</p>

<pre>
(7,5) - (3,2) = (4,3)
</pre>

<h3>3. WORKED EXAMPLE 2: NEGATIVE COMPONENTS</h3>

<p>
Find:
</p>

<pre>
(4,-3) - (-2,5)
</pre>

<p><b>Step 1:</b> Subtract the x-components.</p>

<pre>
4 - (-2)

= 4 + 2

= 6
</pre>

<p><b>Step 2:</b> Subtract the y-components.</p>

<pre>
-3 - 5

= -8
</pre>

<p>
Therefore:
</p>

<pre>
(4,-3) - (-2,5)

= (6,-8)
</pre>

<h3>4. WORKED EXAMPLE 3: USING THE OPPOSITE VECTOR</h3>

<p>
Find:
</p>

<pre>
(6,4) - (2,7)
</pre>

<p>
Instead of subtracting directly, find the opposite
of <b>(2,7)</b>.
</p>

<pre>
-(2,7) = (-2,-7)
</pre>

<p>
Now add:
</p>

<pre>
(6,4) + (-2,-7)

= (4,-3)
</pre>

<p>
Therefore:
</p>

<pre>
(6,4) - (2,7) = (4,-3)
</pre>

<p>
This confirms:
</p>

<pre>
→   →     →     →
a - b = a + (-b)
</pre>

<h3>5. WORKED EXAMPLE 4: i AND j FORM</h3>

<p>
Given:
</p>

<pre>
→
a = 7i + 3j

→
b = 2i - 5j
</pre>

<p>
Find <b>a - b</b>.
</p>

<p><b>Step 1:</b> Subtract the i-components.</p>

<pre>
7i - 2i = 5i
</pre>

<p><b>Step 2:</b> Subtract the j-components.</p>

<pre>
3j - (-5j)

= 3j + 5j

= 8j
</pre>

<p>
Therefore:
</p>

<pre>
→   →
a - b = 5i + 8j
</pre>

<h3>6. VECTOR SUBTRACTION USING POINTS</h3>

<p>
Suppose:
</p>

<pre>
A(2,3)
B(8,7)
</pre>

<p>
Find <b>AB</b>.
</p>

<p>
The vector from A to B is:
</p>

<pre>
→     →     →
AB = OB - OA
</pre>

<p>
Substitute:
</p>

<pre>
AB = (8,7) - (2,3)

   = (8-2, 7-3)

   = (6,4)
</pre>

<p>
Therefore:
</p>

<pre>
→
AB = (6,4)
</pre>

<p>
This shows why the rule for a vector from one point
to another is <b>final position − initial position</b>.
</p>

<h3>7. ORDER MATTERS</h3>

<p>
Vector subtraction is <b>not</b> interchangeable.
</p>

<p>
For example:
</p>

<pre>
a = (5,3)
b = (2,1)
</pre>

<p>
Then:
</p>

<pre>
a - b

= (5,3) - (2,1)

= (3,2)
</pre>

<p>
But:
</p>

<pre>
b - a

= (2,1) - (5,3)

= (-3,-2)
</pre>

<p>
Therefore:
</p>

<pre>
a - b ≠ b - a
</pre>

<p>
In fact:
</p>

<pre>
→     →
b - a = -(a - b)
</pre>

<p>
Reversing the order reverses the direction of the result.
</p>

<h3>8. THE KEY RULE</h3>

<pre>
→   → 
a - b

= (x₁-x₂, y₁-y₂)
</pre>

<p>
or:
</p>

<pre>
→   →     →     →
a - b = a + (-b)
</pre>

<p>
<b>Remember:</b> Subtract corresponding components,
and be especially careful when subtracting negative numbers.
</p>
`,

  [
    {
      q: "Find (8,6) - (3,2).",
      hint: "Subtract the corresponding components.",
      steps: [
        "x-component: 8 - 3 = 5.",
        "y-component: 6 - 2 = 4.",
        "Therefore, (8,6) - (3,2) = (5,4)."
      ],
      ans: "(5,4)",
      why: "Vector subtraction is performed component by component."
    },

    {
      q: "Find (5,-2) - (-3,4).",
      hint: "Remember that subtracting a negative number becomes addition.",
      steps: [
        "x-component: 5 - (-3) = 8.",
        "y-component: -2 - 4 = -6.",
        "Therefore, the result is (8,-6)."
      ],
      ans: "(8,-6)",
      why: "Subtracting -3 is the same as adding 3."
    },

    {
      q: "Given a = 6i + 4j and b = 2i - 3j, find a - b.",
      hint: "Subtract the i-components and the j-components separately.",
      steps: [
        "i-components: 6 - 2 = 4.",
        "j-components: 4 - (-3) = 7.",
        "Therefore, a - b = 4i + 7j."
      ],
      ans: "4i + 7j",
      why: "Corresponding vector components are subtracted."
    },

    {
      q: "Given a = (7,4) and b = (2,1), find both a - b and b - a.",
      hint: "Do not assume subtraction works the same way in reverse order.",
      steps: [
        "a - b = (7-2, 4-1) = (5,3).",
        "b - a = (2-7, 1-4) = (-5,-3).",
        "The two answers are opposites."
      ],
      ans: "a - b = (5,3), and b - a = (-5,-3).",
      why: "Changing the order of vector subtraction reverses the direction of the result."
    },

    {
      q: "A(3,2) and B(9,8). Find AB using vector subtraction.",
      hint: "Use AB = OB - OA.",
      steps: [
        "OA = (3,2).",
        "OB = (9,8).",
        "AB = OB - OA.",
        "AB = (9-3, 8-2).",
        "AB = (6,6)."
      ],
      ans: "AB = (6,6)",
      why: "The displacement from A to B is found by subtracting the initial position from the final position."
    },

    {
      q: "If a = (4,7) and a - b = (1,3), find b.",
      hint: "Rearrange the vector equation or use b = a - (a-b).",
      steps: [
        "a - b = (1,3).",
        "Therefore, b = a - (1,3).",
        "b = (4,7) - (1,3).",
        "b = (3,4)."
      ],
      ans: "b = (3,4)",
      why: "The missing vector can be found by rearranging the vector subtraction equation."
    }
  ]
);
add(
  "math",
  "vectors",
  "Magnitude of a Vector",

  `
<h2>Magnitude of a Vector</h2>

<p>
The <b>magnitude</b> of a vector is its size or length.
</p>

<p>
If:
</p>

<pre>
→
a = (x,y)
</pre>

<p>
then its magnitude is written:
</p>

<pre>
→
|a| = √(x² + y²)
</pre>

<p>
This comes from the <b>Pythagorean theorem</b>.
</p>

<h3>1. WHY THE FORMULA WORKS</h3>

<p>
Suppose a vector is:
</p>

<pre>
→
a = (3,4)
</pre>

<p>
The vector moves:
</p>

<pre>
3 units horizontally
4 units vertically
</pre>

<p>
These form a right-angled triangle.
The vector itself is the hypotenuse.
</p>

<pre>
       4
       |
       |\
       | \
       |  \  |a|
       |   \
       |____\
          3
</pre>

<p>
Using Pythagoras:
</p>

<pre>
|a|² = 3² + 4²

|a|² = 9 + 16

|a|² = 25

|a| = √25

|a| = 5
</pre>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find the magnitude of:
</p>

<pre>
→
a = (6,8)
</pre>

<p><b>Step 1:</b> Use the formula.</p>

<pre>
|a| = √(x² + y²)
</pre>

<p><b>Step 2:</b> Substitute.</p>

<pre>
|a| = √(6² + 8²)
</pre>

<p><b>Step 3:</b> Square the components.</p>

<pre>
= √(36 + 64)
</pre>

<p><b>Step 4:</b> Add.</p>

<pre>
= √100
</pre>

<p><b>Step 5:</b> Take the square root.</p>

<pre>
|a| = 10
</pre>

<h3>3. WORKED EXAMPLE 2: NEGATIVE COMPONENTS</h3>

<p>
Find the magnitude of:
</p>

<pre>
→
b = (-5,12)
</pre>

<p>
Substitute into the formula:
</p>

<pre>
|b| = √((-5)² + 12²)

     = √(25 + 144)

     = √169

     = 13
</pre>

<p>
Therefore:
</p>

<pre>
|b| = 13
</pre>

<p>
Notice that the negative sign disappears when the
component is squared.
</p>

<h3>4. WORKED EXAMPLE 3: A VECTOR BETWEEN TWO POINTS</h3>

<p>
Find the distance between:
</p>

<pre>
A(2,3)
B(8,11)
</pre>

<p>
First find vector AB.
</p>

<pre>
AB = B - A

   = (8-2, 11-3)

   = (6,8)
</pre>

<p>
The distance from A to B is the magnitude of AB.
</p>

<pre>
|AB| = √(6² + 8²)

     = √(36 + 64)

     = √100

     = 10
</pre>

<p>
Therefore, the distance between A and B is:
</p>

<pre>
10 units
</pre>

<h3>5. WORKED EXAMPLE 4: WHEN THE ANSWER IS NOT A WHOLE NUMBER</h3>

<p>
Find the magnitude of:
</p>

<pre>
→
c = (2,3)
</pre>

<p>
Substitute:
</p>

<pre>
|c| = √(2² + 3²)

     = √(4 + 9)

     = √13
</pre>

<p>
So the exact answer is:
</p>

<pre>
|c| = √13
</pre>

<p>
If a decimal answer is required:
</p>

<pre>
√13 ≈ 3.61
</pre>

<h3>6. MAGNITUDE IS NEVER NEGATIVE</h3>

<p>
Magnitude represents a length.
A length cannot be negative.
</p>

<p>
For example:
</p>

<pre>
→        (-6,-8)
a   =

|a| = √((-6)² + (-8)²)

    = √(36 + 64)

    = √100

    = 10
</pre>

<p>
The vector has negative components, but its magnitude
is still positive.
</p>

<h3>7. THE KEY RULE</h3>

<pre>
For:

→
a = (x,y)

Magnitude:

→
|a| = √(x² + y²)
</pre>

<p>
For a vector between two points:
</p>

<pre>
A(x₁,y₁)
B(x₂,y₂)

→
AB = (x₂-x₁, y₂-y₁)

Therefore:

|AB| = √[(x₂-x₁)² + (y₂-y₁)²]
</pre>

<p>
<b>Remember:</b> Find the components first, square them,
add them, then take the square root.
</p>
`,

  [
    {
      q: "Find the magnitude of a = (3,4).",
      hint: "Use |a| = √(x²+y²).",
      steps: [
        "|a| = √(3² + 4²).",
        "|a| = √(9 + 16).",
        "|a| = √25.",
        "|a| = 5."
      ],
      ans: "5",
      why: "The magnitude is the length of the vector."
    },

    {
      q: "Find the magnitude of b = (-8,6).",
      hint: "Remember to square the negative component.",
      steps: [
        "|b| = √((-8)² + 6²).",
        "|b| = √(64 + 36).",
        "|b| = √100.",
        "|b| = 10."
      ],
      ans: "10",
      why: "Squaring removes the effect of the negative sign, because magnitude measures length."
    },

    {
      q: "Find the magnitude of c = (5,12).",
      hint: "Apply the Pythagorean relationship.",
      steps: [
        "|c| = √(5² + 12²).",
        "|c| = √(25 + 144).",
        "|c| = √169.",
        "|c| = 13."
      ],
      ans: "13",
      why: "The magnitude is the hypotenuse of the right triangle formed by the vector components."
    },

    {
      q: "Find the distance between A(1,2) and B(7,10).",
      hint: "First find AB, then find its magnitude.",
      steps: [
        "AB = (7-1, 10-2).",
        "AB = (6,8).",
        "|AB| = √(6² + 8²).",
        "|AB| = √100.",
        "|AB| = 10."
      ],
      ans: "10 units",
      why: "The distance between two points is the magnitude of the vector joining them."
    },

    {
      q: "Find the magnitude of a = (2,3), giving the exact answer.",
      hint: "Do not round the square root unless asked.",
      steps: [
        "|a| = √(2² + 3²).",
        "|a| = √(4 + 9).",
        "|a| = √13."
      ],
      ans: "√13",
      why: "√13 is the exact magnitude; a decimal approximation is only needed if requested."
    },

    {
      q: "A vector has magnitude 5 and one component is 3. If the other component is positive, find the other component.",
      hint: "Use |a|² = x² + y².",
      steps: [
        "Let the unknown component be y.",
        "5² = 3² + y².",
        "25 = 9 + y².",
        "y² = 16.",
        "y = 4 because the question says the component is positive."
      ],
      ans: "4",
      why: "The magnitude formula can also be rearranged to find an unknown component."
    }
  ]
);
add(
  "math",
  "vectors",
  "Unit Vector",

  `
<h2>Unit Vector</h2>

<p>
A <b>unit vector</b> is a vector whose magnitude is exactly
<b>1</b>.
</p>

<pre>
|unit vector| = 1
</pre>

<p>
A unit vector is useful when we want to describe
<b>direction without changing the size of the direction vector</b>.
</p>

<h3>1. THE MAIN RULE</h3>

<p>
Suppose:
</p>

<pre>
→
a = (x,y)
</pre>

<p>
First find its magnitude:
</p>

<pre>
→
|a| = √(x²+y²)
</pre>

<p>
Then the unit vector in the direction of <b>a</b> is:
</p>

<pre>
→
a
──────
|a|
</pre>

<p>
Therefore:
</p>

<pre>
Unit vector = vector ÷ magnitude
</pre>

<h3>2. WORKED EXAMPLE 1</h3>

<p>
Find the unit vector in the direction of:
</p>

<pre>
→
a = (3,4)
</pre>

<p><b>Step 1: Find the magnitude.</b></p>

<pre>
|a| = √(3²+4²)

    = √(9+16)

    = √25

    = 5
</pre>

<p><b>Step 2: Divide the vector by its magnitude.</b></p>

<pre>
Unit vector = (3,4)/5
</pre>

<p><b>Step 3: Divide each component by 5.</b></p>

<pre>
Unit vector = (3/5,4/5)
</pre>

<p>
Therefore:
</p>

<pre>
→
(3/5,4/5)
</pre>

<p>
Check its magnitude:
</p>

<pre>
√[(3/5)²+(4/5)²]

= √(9/25+16/25)

= √(25/25)

= √1

= 1
</pre>

<h3>3. WORKED EXAMPLE 2</h3>

<p>
Find the unit vector in the direction of:
</p>

<pre>
→
b = (6,8)
</pre>

<p><b>Step 1: Find the magnitude.</b></p>

<pre>
|b| = √(6²+8²)

    = √(36+64)

    = √100

    = 10
</pre>

<p><b>Step 2: Divide by the magnitude.</b></p>

<pre>
Unit vector = (6,8)/10
</pre>

<p><b>Step 3: Simplify.</b></p>

<pre>
Unit vector = (3/5,4/5)
</pre>

<p>
Notice something important:
</p>

<pre>
(3,4) → (3/5,4/5)

(6,8) → (3/5,4/5)
</pre>

<p>
Both vectors point in the same direction, so they have
the same unit vector.
</p>

<h3>4. WORKED EXAMPLE 3: NEGATIVE COMPONENTS</h3>

<p>
Find the unit vector in the direction of:
</p>

<pre>
→
c = (-5,12)
</pre>

<p><b>Step 1: Find the magnitude.</b></p>

<pre>
|c| = √[(-5)²+12²]

    = √(25+144)

    = √169

    = 13
</pre>

<p><b>Step 2: Divide each component by 13.</b></p>

<pre>
Unit vector = (-5/13,12/13)
</pre>

<p>
The negative sign remains because the unit vector must
point in the same direction as the original vector.
</p>

<h3>5. UNIT VECTORS i AND j</h3>

<p>
The standard unit vectors along the coordinate axes are:
</p>

<pre>
i = (1,0)

j = (0,1)
</pre>

<p>
Their magnitudes are:
</p>

<pre>
|i| = √(1²+0²)
   = 1

|j| = √(0²+1²)
   = 1
</pre>

<p>
Therefore, both <b>i</b> and <b>j</b> are unit vectors.
</p>

<h3>6. WRITING A VECTOR USING ITS UNIT VECTOR</h3>

<p>
Suppose:
</p>

<pre>
→
a = (3,4)
</pre>

<p>
Its magnitude is 5 and its unit vector is:
</p>

<pre>
(3/5,4/5)
</pre>

<p>
Therefore:
</p>

<pre>
→
a = 5(3/5,4/5)
</pre>

<p>
This means:
</p>

<pre>
Vector = magnitude × unit vector
</pre>

<p>
So:
</p>

<pre>
→
a = |a| × unit vector
</pre>

<h3>7. THE KEY RULE</h3>

<pre>
For a non-zero vector:

→
a

Unit vector = ────
              |a|

where:

→
|a| = √(x²+y²)
</pre>

<p>
<b>Remember:</b> To turn a vector into a unit vector,
divide every component by the vector's magnitude.
</p>
`,

  [
    {
      q: "Find the unit vector in the direction of a = (3,4).",
      hint: "First find the magnitude of a.",
      steps: [
        "|a| = √(3²+4²) = 5.",
        "Divide each component by 5.",
        "Unit vector = (3/5,4/5)."
      ],
      ans: "(3/5,4/5)",
      why: "Dividing a vector by its magnitude gives a vector of magnitude 1 in the same direction."
    },

    {
      q: "Find the unit vector in the direction of b = (5,12).",
      hint: "Find √(5²+12²) first.",
      steps: [
        "|b| = √(25+144).",
        "|b| = √169 = 13.",
        "Divide both components by 13.",
        "Unit vector = (5/13,12/13)."
      ],
      ans: "(5/13,12/13)",
      why: "The vector is divided by its magnitude."
    },

    {
      q: "Find the unit vector in the direction of c = (-8,6).",
      hint: "The negative sign must remain on the x-component.",
      steps: [
        "|c| = √[(-8)²+6²].",
        "|c| = √(64+36) = 10.",
        "Divide each component by 10.",
        "Unit vector = (-8/10,6/10).",
        "Simplify to (-4/5,3/5)."
      ],
      ans: "(-4/5,3/5)",
      why: "The unit vector keeps the original direction, including the negative x-component."
    },

    {
      q: "Find the magnitude of the vector (6/10,8/10). Is it a unit vector?",
      hint: "A unit vector must have magnitude exactly 1.",
      steps: [
        "|a| = √[(6/10)²+(8/10)²].",
        "|a| = √(36/100+64/100).",
        "|a| = √(100/100).",
        "|a| = √1 = 1."
      ],
      ans: "Its magnitude is 1, so it is a unit vector.",
      why: "A vector is a unit vector precisely when its magnitude is 1."
    },

    {
      q: "Find the unit vector in the direction of a = 4i + 3j.",
      hint: "Treat 4i + 3j as the vector (4,3).",
      steps: [
        "|a| = √(4²+3²).",
        "|a| = √25 = 5.",
        "Divide each component by 5.",
        "Unit vector = (4/5,3/5).",
        "Therefore, the unit vector is 4/5 i + 3/5 j."
      ],
      ans: "4/5 i + 3/5 j",
      why: "The vector is divided by its magnitude while keeping its direction."
    },

    {
      q: "A vector has magnitude 10 and points in the direction of (6,8). Find the vector itself.",
      hint: "First find the unit vector in the direction of (6,8), then multiply it by 10.",
      steps: [
        "The magnitude of (6,8) is 10.",
        "Therefore its unit vector is (6/10,8/10) = (3/5,4/5).",
        "Multiply the unit vector by the required magnitude 10.",
        "10(3/5,4/5) = (6,8)."
      ],
      ans: "(6,8)",
      why: "A vector can be reconstructed by multiplying its unit direction vector by its magnitude."
    }
  ]
);
add(
  "math",
  "vectors",
  "Midpoint Using Vectors",

  `
<h2>Midpoint Using Vectors</h2>

<p>
The <b>midpoint</b> of a line segment is the point exactly halfway between its two endpoints.
</p>

<p>
If the position vectors of A and B are
<b>a</b> and <b>b</b>, then the position vector of their midpoint M is:
</p>

<p style="text-align:center;">
<b>OM = (a + b) / 2</b>
</p>

<p>
In coordinates, if
<b>A(x₁, y₁)</b> and <b>B(x₂, y₂)</b>, then:
</p>

<p style="text-align:center;">
<b>M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</b>
</p>

<h3>Example 1: Midpoint of Two Points</h3>

<p>
Find the midpoint of A(2, 4) and B(8, 10).
</p>

<p>
Step 1: Add the x-coordinates:
</p>

<p>
2 + 8 = 10
</p>

<p>
Step 2: Add the y-coordinates:
</p>

<p>
4 + 10 = 14
</p>

<p>
Step 3: Divide both by 2:
</p>

<p>
M = (10/2, 14/2)
</p>

<p>
<b>M = (5, 7)</b>
</p>

<h3>Example 2: Negative Coordinates</h3>

<p>
Find the midpoint of P(-6, 4) and Q(2, -8).
</p>

<p>
Step 1:
</p>

<p>
x-coordinate = (-6 + 2)/2 = -4/2 = -2
</p>

<p>
Step 2:
</p>

<p>
y-coordinate = (4 + (-8))/2 = -4/2 = -2
</p>

<p>
Therefore:
</p>

<p>
<b>M = (-2, -2)</b>
</p>

<h3>Example 3: Using Position Vectors</h3>

<p>
Suppose:
</p>

<p>
<b>OA = 4i + 2j</b>
</p>

<p>
and
</p>

<p>
<b>OB = 10i + 8j</b>
</p>

<p>
The midpoint M has position vector:
</p>

<p>
OM = (OA + OB)/2
</p>

<p>
OM = ((4i + 2j) + (10i + 8j))/2
</p>

<p>
OM = (14i + 10j)/2
</p>

<p>
<b>OM = 7i + 5j</b>
</p>

<h3>Example 4: Finding an Unknown Endpoint</h3>

<p>
The midpoint of A(2, 5) and B(x, 9) is M(6, 7).
Find x.
</p>

<p>
Use the x-coordinate of the midpoint:
</p>

<p>
6 = (2 + x)/2
</p>

<p>
Multiply both sides by 2:
</p>

<p>
12 = 2 + x
</p>

<p>
Therefore:
</p>

<p>
<b>x = 10</b>
</p>

<p>
So B = <b>(10, 9)</b>.
</p>

<h3>Example 5: Finding the Missing Point</h3>

<p>
A(3, -2) and B are endpoints of a line.
The midpoint is M(7, 4).
Find B.
</p>

<p>
For the x-coordinate:
</p>

<p>
7 = (3 + x)/2
</p>

<p>
14 = 3 + x
</p>

<p>
<b>x = 11</b>
</p>

<p>
For the y-coordinate:
</p>

<p>
4 = (-2 + y)/2
</p>

<p>
8 = -2 + y
</p>

<p>
<b>y = 10</b>
</p>

<p>
Therefore:
</p>

<p>
<b>B = (11, 10)</b>
</p>

<h3>Key Rule</h3>

<p>
To find the midpoint, <b>add corresponding coordinates and divide by 2</b>.
</p>

<p style="text-align:center;">
<b>M = ((x₁ + x₂)/2, (y₁ + y₂)/2)</b>
</p>
`,

  [
    {
      q: "Find the midpoint of A(4, 6) and B(10, 14).",
      hint: "Add the corresponding coordinates, then divide each by 2.",
      steps: [
        "x = (4 + 10)/2 = 14/2 = 7",
        "y = (6 + 14)/2 = 20/2 = 10",
        "Therefore M = (7, 10)."
      ],
      ans: "(7, 10)",
      why: "The midpoint is halfway between the two endpoints, so each coordinate is the average of the corresponding endpoint coordinates."
    },

    {
      q: "Find the midpoint of P(-4, 8) and Q(6, -2).",
      hint: "Be careful with the negative signs.",
      steps: [
        "x = (-4 + 6)/2 = 2/2 = 1",
        "y = (8 + (-2))/2 = 6/2 = 3",
        "Therefore M = (1, 3)."
      ],
      ans: "(1, 3)",
      why: "The midpoint coordinates are the averages of the corresponding coordinates."
    },

    {
      q: "The position vectors of A and B are 2i + 6j and 8i + 10j respectively. Find the position vector of their midpoint.",
      hint: "Use OM = (OA + OB)/2.",
      steps: [
        "OM = ((2i + 6j) + (8i + 10j))/2",
        "OM = (10i + 16j)/2",
        "OM = 5i + 8j"
      ],
      ans: "5i + 8j",
      why: "The midpoint position vector is the average of the two endpoint position vectors."
    },

    {
      q: "The midpoint of A(4, 3) and B(x, 9) is M(7, 6). Find x.",
      hint: "Use the x-coordinate equation.",
      steps: [
        "7 = (4 + x)/2",
        "14 = 4 + x",
        "x = 10"
      ],
      ans: "10",
      why: "The midpoint's x-coordinate is the average of the two endpoint x-coordinates."
    },

    {
      q: "A(2, -5) and B are endpoints of a line segment. Its midpoint is M(8, 3). Find B.",
      hint: "Find the missing x-coordinate and y-coordinate separately.",
      steps: [
        "8 = (2 + x)/2, so 16 = 2 + x, giving x = 14.",
        "3 = (-5 + y)/2, so 6 = -5 + y, giving y = 11.",
        "Therefore B = (14, 11)."
      ],
      ans: "(14, 11)",
      why: "The midpoint must be halfway between A and B in both the horizontal and vertical directions."
    },

    {
      q: "The position vectors of A and B are 6i - 4j and -2i + 8j. Find the position vector of their midpoint.",
      hint: "Add the vectors first, then divide every component by 2.",
      steps: [
        "OM = ((6i - 4j) + (-2i + 8j))/2",
        "OM = (4i + 4j)/2",
        "OM = 2i + 2j"
      ],
      ans: "2i + 2j",
      why: "The midpoint vector is the average of the two position vectors."
    }
  ]
);
add(
  "math",
  "vectors",
  "Section Formula Using Vectors",

  `
<h2>Dividing a Line Segment in a Given Ratio</h2>

<p>
A point can divide a line segment into two parts in a specified ratio.
</p>

<p>
If A and B have position vectors <b>a</b> and <b>b</b>, and point P divides AB internally in the ratio:
</p>

<p style="text-align:center;">
<b>AP : PB = m : n</b>
</p>

<p>
then the position vector of P is:
</p>

<p style="text-align:center;">
<b>OP = (n a + m b)/(m + n)</b>
</p>

<p>
Notice that the coefficient of A is <b>n</b>, while the coefficient of B is <b>m</b>.
</p>

<h3>Example 1: Ratio 1 : 2</h3>

<p>
A = (2, 3), B = (8, 9).
Find P if:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<p>
Use:
</p>

<p>
P = (2A + 1B)/(1 + 2)
</p>

<p>
P = (2(2,3) + (8,9))/3
</p>

<p>
P = ((4,6) + (8,9))/3
</p>

<p>
P = (12,15)/3
</p>

<p>
<b>P = (4,5)</b>
</p>

<h3>Example 2: Ratio 2 : 1</h3>

<p>
A = (1, 2), B = (10, 8).
Find P if:
</p>

<p>
<b>AP : PB = 2 : 1</b>
</p>

<p>
P = (1A + 2B)/(2 + 1)
</p>

<p>
P = ((1,2) + 2(10,8))/3
</p>

<p>
P = ((1,2) + (20,16))/3
</p>

<p>
P = (21,18)/3
</p>

<p>
<b>P = (7,6)</b>
</p>

<p>
Because P is closer to B, its coordinates are pulled more toward B.
</p>

<h3>Example 3: Using Position Vectors</h3>

<p>
Suppose:
</p>

<p>
OA = 3i + 2j
</p>

<p>
OB = 9i + 8j
</p>

<p>
P divides AB in the ratio:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<p>
Therefore:
</p>

<p>
OP = (2OA + OB)/3
</p>

<p>
OP = (2(3i + 2j) + (9i + 8j))/3
</p>

<p>
OP = (6i + 4j + 9i + 8j)/3
</p>

<p>
OP = (15i + 12j)/3
</p>

<p>
<b>OP = 5i + 4j</b>
</p>

<h3>Example 4: Finding a Point That Divides a Line</h3>

<p>
A = (-2, 4) and B = (7, -5).
Find P if:
</p>

<p>
<b>AP : PB = 2 : 1</b>
</p>

<p>
P = (1A + 2B)/3
</p>

<p>
P = ((-2,4) + 2(7,-5))/3
</p>

<p>
P = ((-2,4) + (14,-10))/3
</p>

<p>
P = (12,-6)/3
</p>

<p>
<b>P = (4,-2)</b>
</p>

<h3>Example 5: Checking the Ratio</h3>

<p>
A = (0,0), B = (12,6), and P = (4,2).
</p>

<p>
Find the ratio AP : PB.
</p>

<p>
First find AP:
</p>

<p>
AP = (4,2) - (0,0) = (4,2)
</p>

<p>
Then find PB:
</p>

<p>
PB = (12,6) - (4,2) = (8,4)
</p>

<p>
Since:
</p>

<p>
(8,4) = 2(4,2)
</p>

<p>
PB is twice AP.
</p>

<p>
Therefore:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<h3>Key Rule</h3>

<p>
For:
</p>

<p style="text-align:center;">
<b>AP : PB = m : n</b>
</p>

<p>
the point P is:
</p>

<p style="text-align:center;">
<b>P = (nA + mB)/(m + n)</b>
</p>

<p>
The same formula works with coordinates or position vectors.
</p>
`,

  [
    {
      q: "A(2, 4) and B(8, 10). Find P if AP : PB = 1 : 2.",
      hint: "Use P = (2A + B)/3.",
      steps: [
        "P = (2(2,4) + (8,10))/3",
        "P = ((4,8) + (8,10))/3",
        "P = (12,18)/3",
        "P = (4,6)"
      ],
      ans: "(4,6)",
      why: "The ratio 1:2 means P is one-third of the way from A toward B."
    },

    {
      q: "A(-3, 2) and B(9, 8). Find P if AP : PB = 2 : 1.",
      hint: "Use P = (A + 2B)/3.",
      steps: [
        "P = ((-3,2) + 2(9,8))/3",
        "P = ((-3,2) + (18,16))/3",
        "P = (15,18)/3",
        "P = (5,6)"
      ],
      ans: "(5,6)",
      why: "For the ratio 2:1, P is closer to B, so B receives the larger weight."
    },

    {
      q: "OA = 2i + 5j and OB = 8i + 11j. Find OP if AP : PB = 1 : 2.",
      hint: "Use OP = (2OA + OB)/3.",
      steps: [
        "OP = (2(2i + 5j) + (8i + 11j))/3",
        "OP = (4i + 10j + 8i + 11j)/3",
        "OP = (12i + 21j)/3",
        "OP = 4i + 7j"
      ],
      ans: "4i + 7j",
      why: "The position vector of the dividing point is the weighted average of the two endpoint position vectors."
    },

    {
      q: "A(1, 3) and B(11, 13). A point P divides AB in the ratio AP : PB = 3 : 2. Find P.",
      hint: "Use P = (2A + 3B)/5.",
      steps: [
        "P = (2(1,3) + 3(11,13))/5",
        "P = ((2,6) + (33,39))/5",
        "P = (35,45)/5",
        "P = (7,9)"
      ],
      ans: "(7,9)",
      why: "The ratio 3:2 places P three-fifths of the way from A to B."
    },

    {
      q: "A(0,0), B(15,10), and P(6,4). What ratio does P divide AB in?",
      hint: "Compare AP with PB.",
      steps: [
        "AP = (6,4) - (0,0) = (6,4)",
        "PB = (15,10) - (6,4) = (9,6)",
        "PB = (3/2)AP",
        "Therefore AP : PB = 2 : 3"
      ],
      ans: "2 : 3",
      why: "The second section is 1.5 times the first, so the lengths are in the ratio 2:3."
    },

    {
      q: "A(2, -1) and B(12, 9). Find P if AP : PB = 3 : 1.",
      hint: "Use P = (A + 3B)/4.",
      steps: [
        "P = ((2,-1) + 3(12,9))/4",
        "P = ((2,-1) + (36,27))/4",
        "P = (38,26)/4",
        "P = (19/2, 13/2)"
      ],
      ans: "(19/2, 13/2)",
      why: "A ratio of 3:1 places P three-quarters of the way from A toward B."
    }
  ]
);
add(
  "math",
  "vectors",
  "Section Formula Using Vectors",

  `
<h2>Dividing a Line Segment in a Given Ratio</h2>

<p>
A point can divide a line segment into two parts in a specified ratio.
</p>

<p>
If A and B have position vectors <b>a</b> and <b>b</b>, and point P divides AB internally in the ratio:
</p>

<p style="text-align:center;">
<b>AP : PB = m : n</b>
</p>

<p>
then the position vector of P is:
</p>

<p style="text-align:center;">
<b>OP = (n a + m b)/(m + n)</b>
</p>

<p>
Notice that the coefficient of A is <b>n</b>, while the coefficient of B is <b>m</b>.
</p>

<h3>Example 1: Ratio 1 : 2</h3>

<p>
A = (2, 3), B = (8, 9).
Find P if:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<p>
Use:
</p>

<p>
P = (2A + 1B)/(1 + 2)
</p>

<p>
P = (2(2,3) + (8,9))/3
</p>

<p>
P = ((4,6) + (8,9))/3
</p>

<p>
P = (12,15)/3
</p>

<p>
<b>P = (4,5)</b>
</p>

<h3>Example 2: Ratio 2 : 1</h3>

<p>
A = (1, 2), B = (10, 8).
Find P if:
</p>

<p>
<b>AP : PB = 2 : 1</b>
</p>

<p>
P = (1A + 2B)/(2 + 1)
</p>

<p>
P = ((1,2) + 2(10,8))/3
</p>

<p>
P = ((1,2) + (20,16))/3
</p>

<p>
P = (21,18)/3
</p>

<p>
<b>P = (7,6)</b>
</p>

<p>
Because P is closer to B, its coordinates are pulled more toward B.
</p>

<h3>Example 3: Using Position Vectors</h3>

<p>
Suppose:
</p>

<p>
OA = 3i + 2j
</p>

<p>
OB = 9i + 8j
</p>

<p>
P divides AB in the ratio:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<p>
Therefore:
</p>

<p>
OP = (2OA + OB)/3
</p>

<p>
OP = (2(3i + 2j) + (9i + 8j))/3
</p>

<p>
OP = (6i + 4j + 9i + 8j)/3
</p>

<p>
OP = (15i + 12j)/3
</p>

<p>
<b>OP = 5i + 4j</b>
</p>

<h3>Example 4: Finding a Point That Divides a Line</h3>

<p>
A = (-2, 4) and B = (7, -5).
Find P if:
</p>

<p>
<b>AP : PB = 2 : 1</b>
</p>

<p>
P = (1A + 2B)/3
</p>

<p>
P = ((-2,4) + 2(7,-5))/3
</p>

<p>
P = ((-2,4) + (14,-10))/3
</p>

<p>
P = (12,-6)/3
</p>

<p>
<b>P = (4,-2)</b>
</p>

<h3>Example 5: Checking the Ratio</h3>

<p>
A = (0,0), B = (12,6), and P = (4,2).
</p>

<p>
Find the ratio AP : PB.
</p>

<p>
First find AP:
</p>

<p>
AP = (4,2) - (0,0) = (4,2)
</p>

<p>
Then find PB:
</p>

<p>
PB = (12,6) - (4,2) = (8,4)
</p>

<p>
Since:
</p>

<p>
(8,4) = 2(4,2)
</p>

<p>
PB is twice AP.
</p>

<p>
Therefore:
</p>

<p>
<b>AP : PB = 1 : 2</b>
</p>

<h3>Key Rule</h3>

<p>
For:
</p>

<p style="text-align:center;">
<b>AP : PB = m : n</b>
</p>

<p>
the point P is:
</p>

<p style="text-align:center;">
<b>P = (nA + mB)/(m + n)</b>
</p>

<p>
The same formula works with coordinates or position vectors.
</p>
`,

  [
    {
      q: "A(2, 4) and B(8, 10). Find P if AP : PB = 1 : 2.",
      hint: "Use P = (2A + B)/3.",
      steps: [
        "P = (2(2,4) + (8,10))/3",
        "P = ((4,8) + (8,10))/3",
        "P = (12,18)/3",
        "P = (4,6)"
      ],
      ans: "(4,6)",
      why: "The ratio 1:2 means P is one-third of the way from A toward B."
    },

    {
      q: "A(-3, 2) and B(9, 8). Find P if AP : PB = 2 : 1.",
      hint: "Use P = (A + 2B)/3.",
      steps: [
        "P = ((-3,2) + 2(9,8))/3",
        "P = ((-3,2) + (18,16))/3",
        "P = (15,18)/3",
        "P = (5,6)"
      ],
      ans: "(5,6)",
      why: "For the ratio 2:1, P is closer to B, so B receives the larger weight."
    },

    {
      q: "OA = 2i + 5j and OB = 8i + 11j. Find OP if AP : PB = 1 : 2.",
      hint: "Use OP = (2OA + OB)/3.",
      steps: [
        "OP = (2(2i + 5j) + (8i + 11j))/3",
        "OP = (4i + 10j + 8i + 11j)/3",
        "OP = (12i + 21j)/3",
        "OP = 4i + 7j"
      ],
      ans: "4i + 7j",
      why: "The position vector of the dividing point is the weighted average of the two endpoint position vectors."
    },

    {
      q: "A(1, 3) and B(11, 13). A point P divides AB in the ratio AP : PB = 3 : 2. Find P.",
      hint: "Use P = (2A + 3B)/5.",
      steps: [
        "P = (2(1,3) + 3(11,13))/5",
        "P = ((2,6) + (33,39))/5",
        "P = (35,45)/5",
        "P = (7,9)"
      ],
      ans: "(7,9)",
      why: "The ratio 3:2 places P three-fifths of the way from A to B."
    },

    {
      q: "A(0,0), B(15,10), and P(6,4). What ratio does P divide AB in?",
      hint: "Compare AP with PB.",
      steps: [
        "AP = (6,4) - (0,0) = (6,4)",
        "PB = (15,10) - (6,4) = (9,6)",
        "PB = (3/2)AP",
        "Therefore AP : PB = 2 : 3"
      ],
      ans: "2 : 3",
      why: "The second section is 1.5 times the first, so the lengths are in the ratio 2:3."
    },

    {
      q: "A(2, -1) and B(12, 9). Find P if AP : PB = 3 : 1.",
      hint: "Use P = (A + 3B)/4.",
      steps: [
        "P = ((2,-1) + 3(12,9))/4",
        "P = ((2,-1) + (36,27))/4",
        "P = (38,26)/4",
        "P = (19/2, 13/2)"
      ],
      ans: "(19/2, 13/2)",
      why: "A ratio of 3:1 places P three-quarters of the way from A toward B."
    }
  ]
);
add(
  "math",
  "vectors",
  "Finding an Unknown Using Vector Equations",

  `
<h2>Finding an Unknown Using Vector Equations</h2>

<p>
A vector equation can contain an unknown number or unknown vector.
We can find the unknown by comparing corresponding components.
</p>

<p>
The key idea is:
</p>

<p style="text-align:center;">
<b>Equal vectors have equal corresponding components.</b>
</p>

<h3>Example 1: One Unknown Component</h3>

<p>
Given:
</p>

<p style="text-align:center;">
(3, x) + (5, 4) = (8, 10)
</p>

<p>
Add the vectors:
</p>

<p style="text-align:center;">
(3 + 5, x + 4) = (8, 10)
</p>

<p>
Compare the y-components:
</p>

<p>
x + 4 = 10
</p>

<p>
x = 6
</p>

<p>
<b>Therefore x = 6.</b>
</p>

<h3>Example 2: Unknown in a Subtraction</h3>

<p>
Given:
</p>

<p style="text-align:center;">
(x, 7) - (2, 3) = (5, 4)
</p>

<p>
Subtract the vectors:
</p>

<p style="text-align:center;">
(x - 2, 7 - 3) = (5, 4)
</p>

<p>
Compare the x-components:
</p>

<p>
x - 2 = 5
</p>

<p>
x = 7
</p>

<p>
Check the y-component:
</p>

<p>
7 - 3 = 4
</p>

<p>
The equation is correct.
</p>

<h3>Example 3: Unknown Vector</h3>

<p>
Given:
</p>

<p style="text-align:center;">
a + (4, -2) = (10, 5)
</p>

<p>
We want to find a.
</p>

<p>
Subtract (4, -2) from both sides:
</p>

<p style="text-align:center;">
a = (10,5) - (4,-2)
</p>

<p>
Calculate each component:
</p>

<p>
a = (10 - 4, 5 - (-2))
</p>

<p>
a = (6, 7)
</p>

<p>
<b>a = (6,7)</b>
</p>

<h3>Example 4: Unknown Scalar</h3>

<p>
Given:
</p>

<p style="text-align:center;">
k(2,3) = (8,12)
</p>

<p>
Multiply:
</p>

<p style="text-align:center;">
(2k, 3k) = (8,12)
</p>

<p>
Using the first component:
</p>

<p>
2k = 8
</p>

<p>
k = 4
</p>

<p>
Check the second component:
</p>

<p>
3(4) = 12
</p>

<p>
So:
</p>

<p>
<b>k = 4</b>
</p>

<h3>Example 5: Unknowns in Both Components</h3>

<p>
Given:
</p>

<p style="text-align:center;">
(x, y) + (3, -4) = (9, 6)
</p>

<p>
Compare the x-components:
</p>

<p>
x + 3 = 9
</p>

<p>
<b>x = 6</b>
</p>

<p>
Compare the y-components:
</p>

<p>
y - 4 = 6
</p>

<p>
<b>y = 10</b>
</p>

<p>
Therefore:
</p>

<p>
<b>(x,y) = (6,10)</b>
</p>

<h3>Example 6: Vector Equation in i and j Form</h3>

<p>
Given:
</p>

<p style="text-align:center;">
(2x + 1)i + (y - 3)j = 7i + 5j
</p>

<p>
Equal vectors have equal components.
</p>

<p>
Compare the i-components:
</p>

<p>
2x + 1 = 7
</p>

<p>
2x = 6
</p>

<p>
<b>x = 3</b>
</p>

<p>
Compare the j-components:
</p>

<p>
y - 3 = 5
</p>

<p>
<b>y = 8</b>
</p>

<p>
Therefore:
</p>

<p>
<b>x = 3 and y = 8.</b>
</p>

<h3>Key Rule</h3>

<p>
When two vectors are equal:
</p>

<p style="text-align:center;">
<b>(a,b) = (c,d)</b>
</p>

<p>
then:
</p>

<p style="text-align:center;">
<b>a = c</b>
</p>

<p style="text-align:center;">
<b>b = d</b>
</p>

<p>
So, to solve a vector equation, compare the horizontal components separately from the vertical components.
</p>
`,

  [
    {
      q: "(4, x) + (3, 5) = (7, 12). Find x.",
      hint: "Compare the y-components.",
      steps: [
        "x + 5 = 12",
        "x = 7"
      ],
      ans: "7",
      why: "Equal vectors must have equal corresponding components."
    },

    {
      q: "(x, 8) - (3, 2) = (5, 6). Find x.",
      hint: "Compare the x-components.",
      steps: [
        "x - 3 = 5",
        "x = 8"
      ],
      ans: "8",
      why: "The horizontal components must be equal."
    },

    {
      q: "a + (5, -3) = (12, 4). Find vector a.",
      hint: "Subtract (5, -3) from (12, 4).",
      steps: [
        "a = (12,4) - (5,-3)",
        "a = (12 - 5, 4 - (-3))",
        "a = (7,7)"
      ],
      ans: "(7,7)",
      why: "The unknown vector is what remains after removing the known vector from the resultant."
    },

    {
      q: "k(3, 4) = (15, 20). Find k.",
      hint: "Compare either component.",
      steps: [
        "3k = 15",
        "k = 5",
        "Check: 4(5) = 20"
      ],
      ans: "5",
      why: "Scalar multiplication multiplies every component by the same scalar."
    },

    {
      q: "(x, y) + (4, -2) = (11, 7). Find x and y.",
      hint: "Compare the two components separately.",
      steps: [
        "x + 4 = 11, so x = 7",
        "y - 2 = 7, so y = 9"
      ],
      ans: "x = 7, y = 9",
      why: "The horizontal and vertical components form two separate equations."
    },

    {
      q: "(2x - 1)i + (y + 4)j = 9i + 10j. Find x and y.",
      hint: "Compare the coefficients of i and j.",
      steps: [
        "2x - 1 = 9",
        "2x = 10",
        "x = 5",
        "y + 4 = 10",
        "y = 6"
      ],
      ans: "x = 5, y = 6",
      why: "Equal vectors written in i and j form have equal coefficients of i and equal coefficients of j."
    }
  ]
);
add(
  "math",
  "vectors",
  "Geometric Vector Problems",

  `
<h2>Geometric Vector Problems</h2>

<p>
Vectors can describe the sides and movements inside geometric figures.
The main skill here is to use known vectors to find an unknown side or diagonal.
</p>

<h3>Example 1: Triangle</h3>

<p>
Suppose a triangle has points A, B and C.
</p>

<p>
Given:
</p>

<p style="text-align:center;">
<b>AB = (5,2)</b>
</p>

<p style="text-align:center;">
<b>AC = (8,6)</b>
</p>

<p>
Find BC.
</p>

<p>
Traveling from B to C is the same as:
</p>

<p>
B → A → C
</p>

<p>
Therefore:
</p>

<p>
BC = BA + AC
</p>

<p>
Since:
</p>

<p>
BA = -AB = (-5,-2)
</p>

<p>
Then:
</p>

<p>
BC = (-5,-2) + (8,6)
</p>

<p>
BC = (3,4)
</p>

<p>
<b>BC = (3,4)</b>
</p>

<h3>Example 2: Parallelogram</h3>

<p>
In parallelogram ABCD, suppose:
</p>

<p style="text-align:center;">
<b>AB = (6,2)</b>
</p>

<p style="text-align:center;">
<b>AD = (3,5)</b>
</p>

<p>
Opposite sides of a parallelogram are equal and parallel.
Therefore:
</p>

<p>
<b>DC = AB = (6,2)</b>
</p>

<p>
and:
</p>

<p>
<b>BC = AD = (3,5)</b>
</p>

<p>
To find the diagonal AC:
</p>

<p>
AC = AB + BC
</p>

<p>
AC = (6,2) + (3,5)
</p>

<p>
<b>AC = (9,7)</b>
</p>

<h3>Example 3: Finding a Missing Side of a Triangle</h3>

<p>
In triangle ABC:
</p>

<p>
<b>AB = (4,7)</b>
</p>

<p>
<b>BC = (6,-2)</b>
</p>

<p>
Find AC.
</p>

<p>
First find the vector from A to C:
</p>

<p>
AC = AB + BC
</p>

<p>
AC = (4,7) + (6,-2)
</p>

<p>
AC = (10,5)
</p>

<p>
Therefore:
</p>

<p>
<b>AC = (10,5)</b>
</p>

<h3>Example 4: A Closed Triangle</h3>

<p>
Suppose:
</p>

<p>
<b>AB = (7,3)</b>
</p>

<p>
<b>BC = (-2,5)</b>
</p>

<p>
Find CA.
</p>

<p>
A complete trip around a triangle returns to the starting point.
Therefore:
</p>

<p style="text-align:center;">
<b>AB + BC + CA = (0,0)</b>
</p>

<p>
Substitute the known vectors:
</p>

<p>
(7,3) + (-2,5) + CA = (0,0)
</p>

<p>
First add the known vectors:
</p>

<p>
(7,3) + (-2,5) = (5,8)
</p>

<p>
Therefore:
</p>

<p>
(5,8) + CA = (0,0)
</p>

<p>
CA = (-5,-8)
</p>

<p>
<b>CA = (-5,-8)</b>
</p>

<h3>Example 5: Finding a Vertex of a Parallelogram</h3>

<p>
Three vertices of a parallelogram are:
</p>

<p>
A(1,2), B(6,4), and D(3,7).
</p>

<p>
Find C.
</p>

<p>
The two sides from A are:
</p>

<p>
AB = (6,4) - (1,2)
</p>

<p>
AB = (5,2)
</p>

<p>
AD = (3,7) - (1,2)
</p>

<p>
AD = (2,5)
</p>

<p>
Since:
</p>

<p>
AC = AB + AD
</p>

<p>
AC = (5,2) + (2,5)
</p>

<p>
AC = (7,7)
</p>

<p>
Starting from A:
</p>

<p>
C = A + AC
</p>

<p>
C = (1,2) + (7,7)
</p>

<p>
<b>C = (8,9)</b>
</p>

<h3>Key Idea</h3>

<p>
For geometric vector problems, think about the <b>route</b> between two points.
</p>

<p>
If:
</p>

<p>
A → B → C
</p>

<p>
then:
</p>

<p style="text-align:center;">
<b>AC = AB + BC</b>
</p>

<p>
If a path goes in the opposite direction, reverse the vector:
</p>

<p style="text-align:center;">
<b>BA = -AB</b>
</p>

<p>
For a closed triangle:
</p>

<p style="text-align:center;">
<b>AB + BC + CA = (0,0)</b>
</p>
`,

  [
    {
      q: "In a triangle, AB = (4,3) and BC = (5,-1). Find AC.",
      hint: "Travel from A to C through B.",
      steps: [
        "AC = AB + BC",
        "AC = (4,3) + (5,-1)",
        "AC = (9,2)"
      ],
      ans: "(9,2)",
      why: "Going from A to C can be done by going from A to B and then from B to C."
    },

    {
      q: "In a triangle, AB = (6,4) and AC = (10,7). Find BC.",
      hint: "Use BC = BA + AC and remember that BA = -AB.",
      steps: [
        "BA = (-6,-4)",
        "BC = BA + AC",
        "BC = (-6,-4) + (10,7)",
        "BC = (4,3)"
      ],
      ans: "(4,3)",
      why: "The route from B to C can be made by going from B to A and then A to C."
    },

    {
      q: "In a triangle, AB = (8,5) and BC = (-3,2). Find CA.",
      hint: "Use AB + BC + CA = (0,0).",
      steps: [
        "AB + BC = (8,5) + (-3,2)",
        "AB + BC = (5,7)",
        "(5,7) + CA = (0,0)",
        "CA = (-5,-7)"
      ],
      ans: "(-5,-7)",
      why: "The three vectors around a closed triangle must add to the zero vector."
    },

    {
      q: "In parallelogram ABCD, AB = (7,3) and AD = (2,6). Find AC.",
      hint: "The diagonal AC is the sum of the two adjacent sides.",
      steps: [
        "AC = AB + AD",
        "AC = (7,3) + (2,6)",
        "AC = (9,9)"
      ],
      ans: "(9,9)",
      why: "To travel from A to C, travel along AB and then parallel to AD."
    },

    {
      q: "A(2,1), B(7,4), and D(5,8) are three vertices of a parallelogram ABCD. Find C.",
      hint: "Find AB and AD, then use AC = AB + AD.",
      steps: [
        "AB = (7,4) - (2,1) = (5,3)",
        "AD = (5,8) - (2,1) = (3,7)",
        "AC = (5,3) + (3,7) = (8,10)",
        "C = A + AC = (2,1) + (8,10)",
        "C = (10,11)"
      ],
      ans: "(10,11)",
      why: "In a parallelogram, the diagonal from A is formed by adding the two adjacent side vectors."
    },

    {
      q: "A person moves 6 km east and then 8 km north. Represent the total displacement as a vector and find its magnitude.",
      hint: "East is positive x and north is positive y.",
      steps: [
        "East movement = (6,0)",
        "North movement = (0,8)",
        "Resultant = (6,0) + (0,8) = (6,8)",
        "Magnitude = √(6² + 8²)",
        "Magnitude = √100 = 10 km"
      ],
      ans: "Displacement = (6,8), magnitude = 10 km",
      why: "The two movements combine to form one resultant displacement vector."
    }
  ]
);
add(
  "math",
  "vectors",
  "Resultant Vector",

  `
<h2>Resultant Vector</h2>

<p>
When two or more vectors act together, they can be replaced by one vector that has the same overall effect.
</p>

<p>
This single vector is called the <b>resultant vector</b>.
</p>

<p>
For vectors <b>a</b> and <b>b</b>:
</p>

<p style="text-align:center;">
<b>Resultant = a + b</b>
</p>

<p>
Add the corresponding components.
</p>

<h3>Example 1: Two Simple Vectors</h3>

<p>
Suppose a person moves:
</p>

<p>
<b>4 km east</b> and then <b>3 km north</b>.
</p>

<p>
Represent east as the positive x-direction and north as the positive y-direction.
</p>

<p>
First movement:
</p>

<p>
(4,0)
</p>

<p>
Second movement:
</p>

<p>
(0,3)
</p>

<p>
Resultant:
</p>

<p>
(4,0) + (0,3)
</p>

<p>
= (4,3)
</p>

<p>
Therefore the resultant displacement is:
</p>

<p>
<b>(4,3) km</b>
</p>

<h3>Example 2: Vectors in the Same Direction</h3>

<p>
A force of 5 N acts east and another force of 7 N acts east.
</p>

<p>
Represent them as:
</p>

<p>
(5,0) and (7,0)
</p>

<p>
Resultant:
</p>

<p>
(5,0) + (7,0)
</p>

<p>
= (12,0)
</p>

<p>
Therefore:
</p>

<p>
<b>Resultant = 12 N east</b>
</p>

<h3>Example 3: Opposite Directions</h3>

<p>
A force of 10 N acts east while a force of 6 N acts west.
</p>

<p>
Take east as positive.
</p>

<p>
East force:
</p>

<p>
(10,0)
</p>

<p>
West force:
</p>

<p>
(-6,0)
</p>

<p>
Resultant:
</p>

<p>
(10,0) + (-6,0)
</p>

<p>
= (4,0)
</p>

<p>
Therefore:
</p>

<p>
<b>Resultant = 4 N east</b>
</p>

<h3>Example 4: Two-Dimensional Forces</h3>

<p>
A force of 6 N acts east and a force of 8 N acts north.
</p>

<p>
Write the forces as vectors:
</p>

<p>
F₁ = (6,0)
</p>

<p>
F₂ = (0,8)
</p>

<p>
Add them:
</p>

<p>
R = (6,0) + (0,8)
</p>

<p>
R = (6,8)
</p>

<p>
The resultant vector is:
</p>

<p>
<b>R = (6,8) N</b>
</p>

<p>
Its magnitude is:
</p>

<p>
|R| = √(6² + 8²)
</p>

<p>
|R| = √(36 + 64)
</p>

<p>
|R| = √100
</p>

<p>
<b>|R| = 10 N</b>
</p>

<h3>Example 5: Three Vectors</h3>

<p>
Three movements are:
</p>

<p>
a = (3,4)
</p>

<p>
b = (-2,1)
</p>

<p>
c = (5,-3)
</p>

<p>
Find the resultant.
</p>

<p>
R = a + b + c
</p>

<p>
R = (3,4) + (-2,1) + (5,-3)
</p>

<p>
Add the x-components:
</p>

<p>
3 - 2 + 5 = 6
</p>

<p>
Add the y-components:
</p>

<p>
4 + 1 - 3 = 2
</p>

<p>
Therefore:
</p>

<p>
<b>R = (6,2)</b>
</p>

<h3>Example 6: Resultant That Becomes Zero</h3>

<p>
Suppose:
</p>

<p>
a = (7,4)
</p>

<p>
b = (-7,-4)
</p>

<p>
Then:
</p>

<p>
R = a + b
</p>

<p>
R = (7,4) + (-7,-4)
</p>

<p>
R = (0,0)
</p>

<p>
Therefore:
</p>

<p>
<b>R = (0,0)</b>
</p>

<p>
The vectors completely cancel each other.
</p>

<h3>Key Rule</h3>

<p>
To find a resultant vector:
</p>

<ol>
<li>Write each vector in component form.</li>
<li>Add all x-components.</li>
<li>Add all y-components.</li>
<li>Write the two results as one vector.</li>
</ol>

<p style="text-align:center;">
<b>R = (Σx, Σy)</b>
</p>
`,

  [
    {
      q: "Find the resultant of (3,4) and (5,2).",
      hint: "Add the x-components and y-components separately.",
      steps: [
        "x-component: 3 + 5 = 8",
        "y-component: 4 + 2 = 6",
        "Resultant = (8,6)"
      ],
      ans: "(8,6)",
      why: "A resultant is found by adding corresponding vector components."
    },

    {
      q: "A force of 12 N acts east and another force of 7 N acts west. Find the resultant force.",
      hint: "Take east as positive.",
      steps: [
        "East force = (12,0)",
        "West force = (-7,0)",
        "Resultant = (12,0) + (-7,0)",
        "Resultant = (5,0)"
      ],
      ans: "5 N east",
      why: "Opposing forces subtract because they act in opposite directions."
    },

    {
      q: "A person walks 5 km east and 12 km north. Find the resultant displacement vector and its magnitude.",
      hint: "First find the vector, then use the magnitude formula.",
      steps: [
        "East movement = (5,0)",
        "North movement = (0,12)",
        "Resultant = (5,12)",
        "Magnitude = √(5² + 12²)",
        "Magnitude = √169 = 13 km"
      ],
      ans: "Resultant = (5,12), magnitude = 13 km",
      why: "The two perpendicular movements combine into one resultant displacement."
    },

    {
      q: "Find the resultant of (4,-2), (-3,5), and (6,1).",
      hint: "Add all three x-components and all three y-components.",
      steps: [
        "x = 4 - 3 + 6 = 7",
        "y = -2 + 5 + 1 = 4",
        "Resultant = (7,4)"
      ],
      ans: "(7,4)",
      why: "Each component of the resultant is the sum of the corresponding components of all the vectors."
    },

    {
      q: "Two forces are represented by (8,6) and (-8,-6). Find their resultant.",
      hint: "Add the two vectors directly.",
      steps: [
        "R = (8,6) + (-8,-6)",
        "R = (8 - 8, 6 - 6)",
        "R = (0,0)"
      ],
      ans: "(0,0)",
      why: "The two vectors are opposites, so they completely cancel."
    },

    {
      q: "A boat moves with displacement (9,4) km and is then pushed by a current with displacement (-2,3) km. Find the total displacement.",
      hint: "Add the two displacement vectors.",
      steps: [
        "R = (9,4) + (-2,3)",
        "x = 9 - 2 = 7",
        "y = 4 + 3 = 7",
        "R = (7,7) km"
      ],
      ans: "(7,7) km",
      why: "The total displacement is obtained by adding the displacement vectors."
    }
  ]
);
add(
  "math",
  "vectors",
  "Direction of a Vector",

  `
<h2>Direction of a Vector</h2>

<p>
The <b>direction</b> of a vector tells us the angle the vector makes with the positive x-axis.
</p>

<p>
For a vector:
</p>

<p style="text-align:center;">
<b>a = (x,y)</b>
</p>

<p>
the direction angle θ is found from:
</p>

<p style="text-align:center;">
<b>tan θ = y/x</b>
</p>

<p>
Therefore:
</p>

<p style="text-align:center;">
<b>θ = tan⁻¹(y/x)</b>
</p>

<p>
The signs of x and y are important because they tell us which quadrant the vector lies in.
</p>

<h3>Example 1: Vector in the First Quadrant</h3>

<p>
Find the direction of:
</p>

<p>
<b>a = (3,4)</b>
</p>

<p>
Both components are positive, so the vector is in the first quadrant.
</p>

<p>
Use:
</p>

<p>
θ = tan⁻¹(4/3)
</p>

<p>
θ ≈ 53.13°
</p>

<p>
Therefore:
</p>

<p>
<b>Direction = 53.13°</b>
</p>

<h3>Example 2: Vector in the Second Quadrant</h3>

<p>
Find the direction of:
</p>

<p>
<b>a = (-3,4)</b>
</p>

<p>
The x-component is negative and the y-component is positive.
Therefore, the vector lies in the second quadrant.
</p>

<p>
First find the reference angle:
</p>

<p>
α = tan⁻¹(4/3)
</p>

<p>
α ≈ 53.13°
</p>

<p>
For the second quadrant:
</p>

<p>
θ = 180° - 53.13°
</p>

<p>
<b>θ ≈ 126.87°</b>
</p>

<h3>Example 3: Vector in the Third Quadrant</h3>

<p>
Find the direction of:
</p>

<p>
<b>a = (-5,-5)</b>
</p>

<p>
Both components are negative, so the vector lies in the third quadrant.
</p>

<p>
Find the reference angle:
</p>

<p>
α = tan⁻¹(5/5)
</p>

<p>
α = 45°
</p>

<p>
For the third quadrant:
</p>

<p>
θ = 180° + 45°
</p>

<p>
<b>θ = 225°</b>
</p>

<h3>Example 4: Vector in the Fourth Quadrant</h3>

<p>
Find the direction of:
</p>

<p>
<b>a = (4,-3)</b>
</p>

<p>
The x-component is positive and the y-component is negative.
Therefore, the vector lies in the fourth quadrant.
</p>

<p>
Find the reference angle:
</p>

<p>
α = tan⁻¹(3/4)
</p>

<p>
α ≈ 36.87°
</p>

<p>
For the fourth quadrant:
</p>

<p>
θ = 360° - 36.87°
</p>

<p>
<b>θ ≈ 323.13°</b>
</p>

<h3>Example 5: Horizontal Vector</h3>

<p>
Consider:
</p>

<p>
<b>a = (6,0)</b>
</p>

<p>
The vector points directly along the positive x-axis.
</p>

<p>
Therefore:
</p>

<p>
<b>θ = 0°</b>
</p>

<p>
If the vector is:
</p>

<p>
<b>a = (-6,0)</b>
</p>

<p>
it points along the negative x-axis:
</p>

<p>
<b>θ = 180°</b>
</p>

<h3>Example 6: Vertical Vector</h3>

<p>
Consider:
</p>

<p>
<b>a = (0,5)</b>
</p>

<p>
The vector points directly upward.
</p>

<p>
Therefore:
</p>

<p>
<b>θ = 90°</b>
</p>

<p>
If:
</p>

<p>
<b>a = (0,-5)</b>
</p>

<p>
the vector points downward:
</p>

<p>
<b>θ = 270°</b>
</p>

<h3>Direction Checklist</h3>

<ol>
<li>Look at the signs of x and y.</li>
<li>Identify the quadrant.</li>
<li>Find the reference angle using tan⁻¹(|y|/|x|).</li>
<li>Adjust the angle according to the quadrant.</li>
</ol>

<table>
<tr>
<th>Quadrant</th>
<th>Signs</th>
<th>Direction</th>
</tr>
<tr>
<td>I</td>
<td>+,+</td>
<td>θ = α</td>
</tr>
<tr>
<td>II</td>
<td>-,+</td>
<td>θ = 180° - α</td>
</tr>
<tr>
<td>III</td>
<td>-,-</td>
<td>θ = 180° + α</td>
</tr>
<tr>
<td>IV</td>
<td>+,-</td>
<td>θ = 360° - α</td>
</tr>
</table>

<p>
The direction angle is normally measured <b>anticlockwise from the positive x-axis</b>.
</p>
`,

  [
    {
      q: "Find the direction of the vector (3,4), measured anticlockwise from the positive x-axis.",
      hint: "Both components are positive, so the vector is in Quadrant I.",
      steps: [
        "θ = tan⁻¹(4/3)",
        "θ ≈ 53.13°"
      ],
      ans: "53.13°",
      why: "The vector lies in the first quadrant, so the reference angle is already the direction angle."
    },

    {
      q: "Find the direction of (-3,4).",
      hint: "The vector is in Quadrant II.",
      steps: [
        "Reference angle = tan⁻¹(4/3) ≈ 53.13°",
        "θ = 180° - 53.13°",
        "θ ≈ 126.87°"
      ],
      ans: "126.87°",
      why: "A negative x-component and positive y-component place the vector in Quadrant II."
    },

    {
      q: "Find the direction of (-5,-5).",
      hint: "Both components are negative, so use Quadrant III.",
      steps: [
        "Reference angle = tan⁻¹(5/5) = 45°",
        "θ = 180° + 45°",
        "θ = 225°"
      ],
      ans: "225°",
      why: "The vector lies in Quadrant III, so the reference angle is added to 180°."
    },

    {
      q: "Find the direction of (4,-3).",
      hint: "The vector is in Quadrant IV.",
      steps: [
        "Reference angle = tan⁻¹(3/4) ≈ 36.87°",
        "θ = 360° - 36.87°",
        "θ ≈ 323.13°"
      ],
      ans: "323.13°",
      why: "A positive x-component and negative y-component place the vector in Quadrant IV."
    },

    {
      q: "What is the direction of the vector (-7,0)?",
      hint: "It lies directly on the negative x-axis.",
      steps: [
        "The vector points directly left.",
        "The negative x-axis corresponds to 180°."
      ],
      ans: "180°",
      why: "A vector pointing along the negative x-axis has a direction of 180°."
    },

    {
      q: "What is the direction of the vector (0,-8)?",
      hint: "It points directly downward.",
      steps: [
        "The vector lies on the negative y-axis.",
        "The negative y-axis corresponds to 270°."
      ],
      ans: "270°",
      why: "A downward vector has a direction angle of 270° measured anticlockwise from the positive x-axis."
    }
  ]
);
add(
  "math",
  "vectors",
  "Scalar Product of Vectors",

  `
<h2>Scalar Product of Vectors</h2>

<p>
The <b>scalar product</b>, also called the <b>dot product</b>, combines two vectors to give a single number.
</p>

<p>
For:
</p>

<p style="text-align:center;">
<b>a = (x₁,y₁)</b>
</p>

<p style="text-align:center;">
<b>b = (x₂,y₂)</b>
</p>

<p>
the scalar product is:
</p>

<p style="text-align:center;">
<b>a · b = x₁x₂ + y₁y₂</b>
</p>

<p>
The symbol <b>·</b> means dot product.
</p>

<h3>Example 1: Basic Dot Product</h3>

<p>
Find the scalar product of:
</p>

<p>
<b>a = (3,4)</b>
</p>

<p>
<b>b = (2,5)</b>
</p>

<p>
Use:
</p>

<p>
a · b = (3)(2) + (4)(5)
</p>

<p>
= 6 + 20
</p>

<p>
<b>a · b = 26</b>
</p>

<h3>Example 2: Negative Components</h3>

<p>
Find:
</p>

<p>
<b>a · b</b>
</p>

<p>
where:
</p>

<p>
a = (-2,5)
</p>

<p>
b = (4,-3)
</p>

<p>
Multiply corresponding components:
</p>

<p>
a · b = (-2)(4) + (5)(-3)
</p>

<p>
= -8 - 15
</p>

<p>
<b>a · b = -23</b>
</p>

<h3>Example 3: Dot Product Equal to Zero</h3>

<p>
Consider:
</p>

<p>
a = (2,3)
</p>

<p>
b = (3,-2)
</p>

<p>
Find a · b.
</p>

<p>
a · b = (2)(3) + (3)(-2)
</p>

<p>
= 6 - 6
</p>

<p>
<b>a · b = 0</b>
</p>

<p>
When the scalar product of two non-zero vectors is zero, the vectors are <b>perpendicular</b>.
</p>

<p>
Therefore:
</p>

<p>
<b>(2,3) is perpendicular to (3,-2).</b>
</p>

<h3>Example 4: Checking Whether Two Vectors Are Perpendicular</h3>

<p>
Determine whether:
</p>

<p>
a = (4,6)
</p>

<p>
b = (3,-2)
</p>

<p>
are perpendicular.
</p>

<p>
Calculate the dot product:
</p>

<p>
a · b = (4)(3) + (6)(-2)
</p>

<p>
= 12 - 12
</p>

<p>
= 0
</p>

<p>
Therefore:
</p>

<p>
<b>a ⟂ b</b>
</p>

<p>
The vectors are perpendicular.
</p>

<h3>Example 5: Showing That Vectors Are Not Perpendicular</h3>

<p>
Consider:
</p>

<p>
a = (2,5)
</p>

<p>
b = (3,4)
</p>

<p>
Calculate:
</p>

<p>
a · b = (2)(3) + (5)(4)
</p>

<p>
= 6 + 20
</p>

<p>
= 26
</p>

<p>
Since:
</p>

<p>
<b>26 ≠ 0</b>
</p>

<p>
the vectors are <b>not perpendicular</b>.
</p>

<h3>Example 6: Finding an Unknown</h3>

<p>
Find x if:
</p>

<p>
(2,x) · (3,4) = 14
</p>

<p>
Apply the dot product:
</p>

<p>
(2)(3) + (x)(4) = 14
</p>

<p>
6 + 4x = 14
</p>

<p>
4x = 8
</p>

<p>
<b>x = 2</b>
</p>

<p>
Check:
</p>

<p>
(2,2) · (3,4)
</p>

<p>
= 6 + 8
</p>

<p>
= 14
</p>

<h3>Dot Product and the Angle Between Vectors</h3>

<p>
The scalar product can also be related to the angle θ between two vectors:
</p>

<p style="text-align:center;">
<b>a · b = |a||b|cosθ</b>
</p>

<p>
Therefore:
</p>

<p style="text-align:center;">
<b>cosθ = (a · b)/(|a||b|)</b>
</p>

<p>
For perpendicular vectors:
</p>

<p>
θ = 90°
</p>

<p>
and:
</p>

<p>
cos90° = 0
</p>

<p>
so:
</p>

<p>
<b>a · b = 0</b>
</p>

<h3>Key Rule</h3>

<p>
For two-dimensional vectors:
</p>

<p style="text-align:center;">
<b>(x₁,y₁) · (x₂,y₂) = x₁x₂ + y₁y₂</b>
</p>

<p>
Remember: the dot product produces a <b>scalar</b>, not another vector.
</p>
`,

  [
    {
      q: "Find the scalar product of (4,3) and (2,5).",
      hint: "Multiply corresponding components and add.",
      steps: [
        "(4,3) · (2,5) = (4)(2) + (3)(5)",
        "= 8 + 15",
        "= 23"
      ],
      ans: "23",
      why: "The scalar product is found by multiplying corresponding components and adding the results."
    },

    {
      q: "Find the scalar product of (-3,4) and (2,-5).",
      hint: "Keep the negative signs when multiplying.",
      steps: [
        "(-3,4) · (2,-5) = (-3)(2) + (4)(-5)",
        "= -6 - 20",
        "= -26"
      ],
      ans: "-26",
      why: "The signs of the component products determine the sign of the final scalar product."
    },

    {
      q: "Determine whether (3,4) and (4,-3) are perpendicular.",
      hint: "Calculate their dot product.",
      steps: [
        "(3,4) · (4,-3) = (3)(4) + (4)(-3)",
        "= 12 - 12",
        "= 0"
      ],
      ans: "Yes, they are perpendicular.",
      why: "Two non-zero vectors are perpendicular when their scalar product is zero."
    },

    {
      q: "Determine whether (2,5) and (4,3) are perpendicular.",
      hint: "A perpendicular pair must have a dot product of zero.",
      steps: [
        "(2,5) · (4,3) = (2)(4) + (5)(3)",
        "= 8 + 15",
        "= 23",
        "Since 23 is not zero, the vectors are not perpendicular."
      ],
      ans: "No, they are not perpendicular.",
      why: "Their scalar product is not zero."
    },

    {
      q: "Find x if (x,3) · (2,4) = 20.",
      hint: "Form an equation using the dot product formula.",
      steps: [
        "(x)(2) + (3)(4) = 20",
        "2x + 12 = 20",
        "2x = 8",
        "x = 4"
      ],
      ans: "4",
      why: "The unknown component can be found by turning the scalar-product equation into an ordinary algebraic equation."
    },

    {
      q: "Find the angle between a = (1,0) and b = (0,1).",
      hint: "First calculate the dot product, then use a · b = |a||b|cosθ.",
      steps: [
        "a · b = (1)(0) + (0)(1) = 0",
        "|a| = 1 and |b| = 1",
        "0 = (1)(1)cosθ",
        "cosθ = 0",
        "θ = 90°"
      ],
      ans: "90°",
      why: "The horizontal and vertical unit vectors are perpendicular."
    }
  ]
);
add(
  "math",
  "vectors",
  "Proving Points Are Collinear Using Vectors",

  `
<h2>Proving Points Are Collinear Using Vectors</h2>

<p>
Points are <b>collinear</b> if they lie on the same straight line.
</p>

<p>
We can use vectors to test this.
</p>

<p>
If two vectors lie along the same straight line, one must be a scalar multiple of the other.
</p>

<p>
Therefore, to prove that A, B and C are collinear, we can show that:
</p>

<p style="text-align:center;">
<b>AB = kBC</b>
</p>

<p>
for some scalar <b>k</b>.
</p>

<h3>Example 1: Simple Collinearity</h3>

<p>
Show that A(1,2), B(3,4) and C(5,6) are collinear.
</p>

<p>
Find AB:
</p>

<p>
AB = B - A
</p>

<p>
AB = (3,4) - (1,2)
</p>

<p>
<b>AB = (2,2)</b>
</p>

<p>
Now find BC:
</p>

<p>
BC = C - B
</p>

<p>
BC = (5,6) - (3,4)
</p>

<p>
<b>BC = (2,2)</b>
</p>

<p>
Therefore:
</p>

<p>
AB = BC
</p>

<p>
The vectors have the same direction.
</p>

<p>
Therefore:
</p>

<p>
<b>A, B and C are collinear.</b>
</p>

<h3>Example 2: One Vector Is a Multiple of the Other</h3>

<p>
Show that A(2,1), B(5,3) and C(11,7) are collinear.
</p>

<p>
Find AB:
</p>

<p>
AB = (5,3) - (2,1)
</p>

<p>
AB = (3,2)
</p>

<p>
Find BC:
</p>

<p>
BC = (11,7) - (5,3)
</p>

<p>
BC = (6,4)
</p>

<p>
Compare:
</p>

<p>
BC = 2(3,2)
</p>

<p>
Therefore:
</p>

<p>
<b>BC = 2AB</b>
</p>

<p>
Since one vector is a scalar multiple of the other, they have the same direction.
</p>

<p>
Therefore:
</p>

<p>
<b>A, B and C are collinear.</b>
</p>

<h3>Example 3: Opposite Directions</h3>

<p>
Show that A(1,4), B(4,6) and C(-2,2) are collinear.
</p>

<p>
Find AB:
</p>

<p>
AB = (4,6) - (1,4)
</p>

<p>
AB = (3,2)
</p>

<p>
Find BC:
</p>

<p>
BC = (-2,2) - (4,6)
</p>

<p>
BC = (-6,-4)
</p>

<p>
Compare:
</p>

<p>
BC = -2(3,2)
</p>

<p>
Therefore:
</p>

<p>
<b>BC = -2AB</b>
</p>

<p>
The negative scalar means the vectors point in opposite directions, but they are still parallel.
</p>

<p>
Therefore:
</p>

<p>
<b>A, B and C are collinear.</b>
</p>

<h3>Example 4: Showing Points Are Not Collinear</h3>

<p>
Determine whether A(1,2), B(4,5) and C(7,9) are collinear.
</p>

<p>
Find AB:
</p>

<p>
AB = (4,5) - (1,2)
</p>

<p>
AB = (3,3)
</p>

<p>
Find BC:
</p>

<p>
BC = (7,9) - (4,5)
</p>

<p>
BC = (3,4)
</p>

<p>
Check whether one is a scalar multiple of the other.
</p>

<p>
For the x-components:
</p>

<p>
3/3 = 1
</p>

<p>
For the y-components:
</p>

<p>
4/3 ≠ 1
</p>

<p>
The same scalar cannot multiply both components.
</p>

<p>
Therefore:
</p>

<p>
<b>AB and BC are not parallel.</b>
</p>

<p>
Hence:
</p>

<p>
<b>A, B and C are not collinear.</b>
</p>

<h3>Example 5: Finding an Unknown Coordinate</h3>

<p>
Find x if A(1,2), B(4,5) and C(x,8) are collinear.
</p>

<p>
First find AB:
</p>

<p>
AB = (4,5) - (1,2)
</p>

<p>
AB = (3,3)
</p>

<p>
Find BC:
</p>

<p>
BC = (x,8) - (4,5)
</p>

<p>
BC = (x-4,3)
</p>

<p>
Because the points are collinear, BC must be a scalar multiple of AB.
</p>

<p>
The y-component of AB is 3 and the y-component of BC is 3.
Therefore the scalar is:
</p>

<p>
k = 3/3 = 1
</p>

<p>
So:
</p>

<p>
x - 4 = 1(3)
</p>

<p>
x - 4 = 3
</p>

<p>
<b>x = 7</b>
</p>

<h3>Key Rule</h3>

<p>
To test whether A, B and C are collinear:
</p>

<ol>
<li>Find AB.</li>
<li>Find BC.</li>
<li>Check whether one vector is a scalar multiple of the other.</li>
</ol>

<p style="text-align:center;">
<b>BC = kAB</b>
</p>

<p>
If such a scalar <b>k</b> exists, the three points are collinear.
</p>
`,

  [
    {
      q: "Show that A(1,1), B(3,4) and C(5,7) are collinear.",
      hint: "Find AB and BC and compare them.",
      steps: [
        "AB = (3,4) - (1,1) = (2,3)",
        "BC = (5,7) - (3,4) = (2,3)",
        "Therefore AB = BC.",
        "Hence A, B and C are collinear."
      ],
      ans: "They are collinear.",
      why: "AB and BC are equal vectors, so they have the same direction."
    },

    {
      q: "Determine whether A(2,3), B(6,5) and C(14,9) are collinear.",
      hint: "Check whether BC is a scalar multiple of AB.",
      steps: [
        "AB = (6,5) - (2,3) = (4,2)",
        "BC = (14,9) - (6,5) = (8,4)",
        "BC = 2(4,2)",
        "Therefore BC = 2AB.",
        "Hence the points are collinear."
      ],
      ans: "They are collinear.",
      why: "One vector is twice the other, so the two vectors are parallel."
    },

    {
      q: "Determine whether A(0,0), B(2,3) and C(4,7) are collinear.",
      hint: "Find AB and BC.",
      steps: [
        "AB = (2,3) - (0,0) = (2,3)",
        "BC = (4,7) - (2,3) = (2,4)",
        "2/2 = 1, but 4/3 ≠ 1",
        "Therefore BC is not a scalar multiple of AB."
      ],
      ans: "They are not collinear.",
      why: "The two vectors do not have the same direction."
    },

    {
      q: "Show that A(3,5), B(7,8) and C(1,2) are collinear.",
      hint: "The vectors may point in opposite directions.",
      steps: [
        "AB = (7,8) - (3,5) = (4,3)",
        "BC = (1,2) - (7,8) = (-6,-6)",
        "BC is not a scalar multiple of AB.",
        "Therefore the points are not collinear."
      ],
      ans: "They are not collinear.",
      why: "Although both components of BC are negative, the required scalar would have to be -6/4 and -6/3 at the same time, which is impossible."
    },

    {
      q: "Find x if A(1,2), B(4,5) and C(x,8) are collinear.",
      hint: "Find AB and BC, then compare corresponding components.",
      steps: [
        "AB = (4,5) - (1,2) = (3,3)",
        "BC = (x,8) - (4,5) = (x-4,3)",
        "Since the y-components are both 3, the scalar is 1.",
        "x - 4 = 3",
        "x = 7"
      ],
      ans: "x = 7",
      why: "For the points to be collinear, BC must have the same direction as AB."
    },

    {
      q: "Find y if A(2,1), B(5,3) and C(11,y) are collinear.",
      hint: "First find AB, then express BC as a multiple of AB.",
      steps: [
        "AB = (5,3) - (2,1) = (3,2)",
        "BC = (11,y) - (5,3) = (6,y-3)",
        "The x-component shows the scalar is 6/3 = 2.",
        "Therefore y - 3 = 2(2) = 4",
        "y = 7"
      ],
      ans: "y = 7",
      why: "The second vector must be twice the first vector for the three points to lie on one straight line."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Equation of a Line",

  `
<h2>Vector Equation of a Line</h2>

<p>
A straight line can be described using a <b>position vector</b> and a <b>direction vector</b>.
</p>

<p>
If a line passes through a point A with position vector <b>a</b>, and has direction vector <b>d</b>, then every point P on the line has position vector:
</p>

<p style="text-align:center;">
<b>r = a + λd</b>
</p>

<p>
Here:
</p>

<ul>
<li><b>r</b> is the position vector of any point P on the line.</li>
<li><b>a</b> is the position vector of a known point on the line.</li>
<li><b>d</b> is the direction vector of the line.</li>
<li><b>λ</b> is a scalar that tells us how far we move along the line.</li>
</ul>

<h3>Example 1: Writing a Vector Equation</h3>

<p>
A line passes through A(2,3) and has direction vector:
</p>

<p>
<b>d = (4,5)</b>
</p>

<p>
The position vector of A is:
</p>

<p>
<b>a = (2,3)</b>
</p>

<p>
Therefore:
</p>

<p>
r = a + λd
</p>

<p>
<b>r = (2,3) + λ(4,5)</b>
</p>

<h3>Example 2: Finding Points on the Line</h3>

<p>
The line is:
</p>

<p>
<b>r = (1,2) + λ(3,4)</b>
</p>

<p>
Find the point when λ = 2.
</p>

<p>
Substitute λ = 2:
</p>

<p>
r = (1,2) + 2(3,4)
</p>

<p>
r = (1,2) + (6,8)
</p>

<p>
<b>r = (7,10)</b>
</p>

<p>
Therefore, (7,10) lies on the line.
</p>

<h3>Example 3: Finding Another Point</h3>

<p>
Given:
</p>

<p>
<b>r = (5,1) + λ(-2,3)</b>
</p>

<p>
Find the point when λ = 3.
</p>

<p>
r = (5,1) + 3(-2,3)
</p>

<p>
r = (5,1) + (-6,9)
</p>

<p>
<b>r = (-1,10)</b>
</p>

<p>
So the point is:
</p>

<p>
<b>(-1,10)</b>
</p>

<h3>Example 4: Finding the Direction Vector From Two Points</h3>

<p>
A line passes through:
</p>

<p>
A(2,4)
</p>

<p>
and:
</p>

<p>
B(8,10)
</p>

<p>
The direction vector can be found using:
</p>

<p>
AB = B - A
</p>

<p>
AB = (8,10) - (2,4)
</p>

<p>
<b>AB = (6,6)</b>
</p>

<p>
Therefore one vector equation of the line is:
</p>

<p>
<b>r = (2,4) + λ(6,6)</b>
</p>

<p>
We could also use any non-zero scalar multiple of (6,6), such as (1,1), as a direction vector.
</p>

<p>
So an equivalent equation is:
</p>

<p>
<b>r = (2,4) + λ(1,1)</b>
</p>

<h3>Example 5: Checking Whether a Point Lies on a Line</h3>

<p>
The line is:
</p>

<p>
<b>r = (2,1) + λ(3,4)</b>
</p>

<p>
Determine whether P(11,13) lies on the line.
</p>

<p>
We need:
</p>

<p>
(11,13) = (2,1) + λ(3,4)
</p>

<p>
Compare the x-components:
</p>

<p>
11 = 2 + 3λ
</p>

<p>
9 = 3λ
</p>

<p>
<b>λ = 3</b>
</p>

<p>
Check the y-component:
</p>

<p>
1 + 4(3) = 13
</p>

<p>
The y-coordinate is also correct.
</p>

<p>
Therefore:
</p>

<p>
<b>P(11,13) lies on the line.</b>
</p>

<h3>Example 6: Showing a Point Is Not on a Line</h3>

<p>
The line is:
</p>

<p>
<b>r = (1,2) + λ(2,3)</b>
</p>

<p>
Test P(7,10).
</p>

<p>
Using the x-coordinate:
</p>

<p>
7 = 1 + 2λ
</p>

<p>
6 = 2λ
</p>

<p>
λ = 3
</p>

<p>
Now check the y-coordinate:
</p>

<p>
2 + 3(3) = 11
</p>

<p>
But P has y-coordinate 10.
</p>

<p>
Therefore:
</p>

<p>
<b>P(7,10) does not lie on the line.</b>
</p>

<h3>Key Rule</h3>

<p>
The vector equation of a straight line is:
</p>

<p style="text-align:center;">
<b>r = a + λd</b>
</p>

<p>
Think of it as:
</p>

<p style="text-align:center;">
<b>starting point + amount of movement × direction</b>
</p>

<p>
Changing λ moves you to different points on the same straight line.
</p>
`,

  [
    {
      q: "Write the vector equation of the line passing through A(3,2) with direction vector (4,1).",
      hint: "Use r = a + λd.",
      steps: [
        "Position vector of A = (3,2)",
        "Direction vector = (4,1)",
        "r = (3,2) + λ(4,1)"
      ],
      ans: "r = (3,2) + λ(4,1)",
      why: "A line is determined by a point on the line and a direction vector."
    },

    {
      q: "For r = (2,5) + λ(3,-1), find the point when λ = 4.",
      hint: "Substitute λ = 4.",
      steps: [
        "r = (2,5) + 4(3,-1)",
        "r = (2,5) + (12,-4)",
        "r = (14,1)"
      ],
      ans: "(14,1)",
      why: "The scalar λ tells us how many times the direction vector is added to the starting point."
    },

    {
      q: "A line passes through A(1,3) and B(6,9). Find a direction vector and write the vector equation of the line.",
      hint: "Find AB = B - A.",
      steps: [
        "AB = (6,9) - (1,3)",
        "AB = (5,6)",
        "A position vector = (1,3)",
        "Therefore r = (1,3) + λ(5,6)"
      ],
      ans: "Direction vector = (5,6); r = (1,3) + λ(5,6)",
      why: "The vector from one known point to another gives a direction vector for the line."
    },

    {
      q: "Determine whether P(8,9) lies on r = (2,1) + λ(2,2).",
      hint: "Find λ from one component and check the other.",
      steps: [
        "8 = 2 + 2λ",
        "6 = 2λ",
        "λ = 3",
        "Check y: 1 + 2(3) = 7",
        "But P has y = 9."
      ],
      ans: "No, P(8,9) does not lie on the line.",
      why: "The same value of λ must satisfy both coordinate equations."
    },

    {
      q: "Determine whether P(14,17) lies on r = (2,5) + λ(4,3).",
      hint: "Find λ using the x-coordinate, then check the y-coordinate.",
      steps: [
        "14 = 2 + 4λ",
        "12 = 4λ",
        "λ = 3",
        "Check y: 5 + 3(3) = 14",
        "The given y-coordinate is 17."
      ],
      ans: "No, P(14,17) does not lie on the line.",
      why: "Although the x-coordinate gives λ = 3, that value does not produce the required y-coordinate."
    },

    {
      q: "Find the point on r = (4,-2) + λ(2,5) when λ = -2.",
      hint: "Multiply the direction vector by -2.",
      steps: [
        "r = (4,-2) + (-2)(2,5)",
        "r = (4,-2) + (-4,-10)",
        "r = (0,-12)"
      ],
      ans: "(0,-12)",
      why: "A negative value of λ moves in the opposite direction along the same straight line."
    }
  ]
);
add(
  "math",
  "vectors",
  "Intersection of Two Vector Lines",

  `
<h2>Intersection of Two Vector Lines</h2>

<p><b>One concept:</b> Find the point where two vector equations of lines meet by making their coordinates equal.</p>

<p>Suppose two lines are:</p>

<p>
<b>Line 1:</b> 
\\[
\\mathbf r=\\mathbf a+\\lambda\\mathbf d
\\]
</p>

<p>
<b>Line 2:</b>
\\[
\\mathbf r=\\mathbf b+\\mu\\mathbf e
\\]
</p>

<p>
At their intersection, both equations describe the <b>same point</b>.
Therefore, their x-coordinates are equal and their y-coordinates are equal.
</p>

<h3>Example 1: Basic Intersection</h3>

<p>Find the intersection of:</p>

<p>
\\[
\\mathbf r=(1,2)+\\lambda(2,1)
\\]
</p>

<p>and</p>

<p>
\\[
\\mathbf r=(7,5)+\\mu(-1,1)
\\]
</p>

<p><b>Step 1: Write each line in coordinate form.</b></p>

<p>Line 1:</p>

<p>
\\[
(x,y)=(1+2\\lambda,\\ 2+\\lambda)
\\]
</p>

<p>Line 2:</p>

<p>
\\[
(x,y)=(7-\\mu,\\ 5+\\mu)
\\]
</p>

<p><b>Step 2: Equate the x-coordinates.</b></p>

<p>
\\[
1+2\\lambda=7-\\mu
\\]
</p>

<p>Therefore:</p>

<p>
\\[
2\\lambda+\\mu=6
\\]
</p>

<p><b>Step 3: Equate the y-coordinates.</b></p>

<p>
\\[
2+\\lambda=5+\\mu
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\lambda-\\mu=3
\\]
</p>

<p><b>Step 4: Solve the two equations.</b></p>

<p>
\\[
2\\lambda+\\mu=6
\\]
</p>

<p>
\\[
\\lambda-\\mu=3
\\]
</p>

<p>Add them:</p>

<p>
\\[
3\\lambda=9
\\]</p>

<p>
\\[
\\lambda=3
\\]
</p>

<p>Substitute into:</p>

<p>
\\[
\\lambda-\\mu=3
\\]
</p>

<p>
\\[
3-\\mu=3
\\]</p>

<p>
\\[
\\mu=0
\\]
</p>

<p><b>Step 5: Find the intersection point.</b></p>

<p>Use Line 1:</p>

<p>
\\[
(x,y)=(1+2(3),\\ 2+3)
\\]</p>

<p>
\\[
(x,y)=(7,5)
\\]
</p>

<p><b>Intersection = (7,5)</b></p>

<h3>Example 2: Intersection with Negative Values</h3>

<p>Find the intersection of:</p>

<p>
\\[
\\mathbf r=(4,-1)+\\lambda(-2,3)
\\]
</p>

<p>and</p>

<p>
\\[
\\mathbf r=(-2,8)+\\mu(1,-1)
\\]
</p>

<p><b>Step 1: Convert to coordinates.</b></p>

<p>First line:</p>

<p>
\\[
(x,y)=(4-2\\lambda,\\ -1+3\\lambda)
\\]
</p>

<p>Second line:</p>

<p>
\\[
(x,y)=(-2+\\mu,\\ 8-\\mu)
\\]
</p>

<p><b>Step 2: Equate x-coordinates.</b></p>

<p>
\\[
4-2\\lambda=-2+\\mu
\\]
</p>

<p>
\\[
2\\lambda+\\mu=6
\\]
</p>

<p><b>Step 3: Equate y-coordinates.</b></p>

<p>
\\[
-1+3\\lambda=8-\\mu
\\]
</p>

<p>
\\[
3\\lambda+\\mu=9
\\]
</p>

<p><b>Step 4: Subtract the equations.</b></p>

<p>
\\[
(3\\lambda+\\mu)-(2\\lambda+\\mu)=9-6
\\]
</p>

<p>
\\[
\\lambda=3
\\]
</p>

<p>Substitute:</p>

<p>
\\[
2(3)+\\mu=6
\\]</p>

<p>
\\[
\\mu=0
\\]
</p>

<p><b>Step 5: Find the point.</b></p>

<p>
\\[
(x,y)=(4-2(3),\\ -1+3(3))
\\]</p>

<p>
\\[
(x,y)=(-2,8)
\\]
</p>

<p><b>Intersection = (-2,8)</b></p>

<h3>Example 3: Finding the Parameters First</h3>

<p>Two lines are:</p>

<p>
\\[
\\mathbf r=(2,1)+\\lambda(3,2)
\\]
</p>

<p>and</p>

<p>
\\[
\\mathbf r=(11,7)+\\mu(-1,-1)
\\]
</p>

<p>At the intersection:</p>

<p>
\\[
(2+3\\lambda,\\ 1+2\\lambda)
=
(11-\\mu,\\ 7-\\mu)
\\]
</p>

<p>Equate x:</p>

<p>
\\[
2+3\\lambda=11-\\mu
\\]
</p>

<p>
\\[
3\\lambda+\\mu=9
\\]
</p>

<p>Equate y:</p>

<p>
\\[
1+2\\lambda=7-\\mu
\\]
</p>

<p>
\\[
2\\lambda+\\mu=6
\\]
</p>

<p>Subtract:</p>

<p>
\\[
(3\\lambda+\\mu)-(2\\lambda+\\mu)=9-6
\\]</p>

<p>
\\[
\\lambda=3
\\]
</p>

<p>Then:</p>

<p>
\\[
2(3)+\\mu=6
\\]</p>

<p>
\\[
\\mu=0
\\]
</p>

<p>Therefore:</p>

<p>
\\[
(x,y)=(2+3(3),\\ 1+2(3))
\\]</p>

<p>
\\[
(x,y)=(11,7)
\\]
</p>

<p><b>Intersection = (11,7)</b></p>

<h3>Example 4: Checking Whether a Given Point Is the Intersection</h3>

<p>Consider:</p>

<p>
\\[
\\mathbf r=(1,2)+\\lambda(2,1)
\\]
</p>

<p>and</p>

<p>
\\[
\\mathbf r=(7,5)+\\mu(-1,1)
\\]
</p>

<p>Suppose we claim that <b>(7,5)</b> is their intersection.</p>

<p>For Line 1:</p>

<p>
\\[
(7,5)=(1,2)+\\lambda(2,1)
\\]
</p>

<p>From the x-coordinate:</p>

<p>
\\[
7=1+2\\lambda
\\]</p>

<p>
\\[
\\lambda=3
\\]
</p>

<p>Check the y-coordinate:</p>

<p>
\\[
5=2+3
\\]
</p>

<p>This is true.</p>

<p>For Line 2:</p>

<p>
\\[
(7,5)=(7,5)+\\mu(-1,1)
\\]
</p>

<p>This happens when:</p>

<p>
\\[
\\mu=0
\\]
</p>

<p>Therefore <b>(7,5)</b> lies on both lines, so it is their intersection.</p>

<h3>Key Idea</h3>

<p>
At an intersection, the two vector equations describe <b>one identical point</b>.
So:
</p>

<p>
\\[
\\boxed{\\text{Equate x-coordinates and y-coordinates, then solve for the parameters.}}
\\]
</p>
`,

  [
    {
      q: "Find the intersection of r = (1,1) + λ(2,1) and r = (7,4) + μ(-1,0).",
      hint: "Write both equations as (x,y), then equate x and y.",
      steps: [
        "Line 1: (x,y) = (1+2λ, 1+λ).",
        "Line 2: (x,y) = (7-μ, 4).",
        "Equate y: 1+λ = 4, so λ = 3.",
        "Equate x: 1+2(3) = 7-μ.",
        "7 = 7-μ, so μ = 0.",
        "The intersection is (7,4)."
      ],
      ans: "(7,4)",
      why: "At the intersection, both vector equations must produce exactly the same coordinates."
    },

    {
      q: "Find the intersection of r = (2,3) + λ(1,2) and r = (8,15) + μ(-2,-1).",
      hint: "Equate the x-components and y-components separately.",
      steps: [
        "x: 2+λ = 8-2μ, so λ+2μ=6.",
        "y: 3+2λ = 15-μ, so 2λ+μ=12.",
        "From the first equation, λ = 6-2μ.",
        "Substitute: 2(6-2μ)+μ=12.",
        "12-4μ+μ=12.",
        "-3μ=0, so μ=0.",
        "Therefore λ=6.",
        "Use the first line: (x,y)=(2+6, 3+12)=(8,15)."
      ],
      ans: "(8,15)",
      why: "The parameter values identify the same point on both lines."
    },

    {
      q: "Two lines are r = (3,2) + λ(2,3) and r = (13,17) + μ(-1,-2). Find their intersection.",
      hint: "Set the x-components equal and then the y-components equal.",
      steps: [
        "x: 3+2λ = 13-μ, so 2λ+μ=10.",
        "y: 2+3λ = 17-2μ, so 3λ+2μ=15.",
        "From the first equation, μ=10-2λ.",
        "Substitute: 3λ+2(10-2λ)=15.",
        "3λ+20-4λ=15.",
        "-λ=-5, so λ=5.",
        "μ=10-2(5)=0.",
        "Intersection: (3+2(5), 2+3(5))=(13,17)."
      ],
      ans: "(13,17)",
      why: "Both equations produce the same coordinates when λ=5 and μ=0."
    },

    {
      q: "Does the point (5,7) lie on both lines r = (1,1) + λ(2,3) and r = (5,7) + μ(1,1)?",
      hint: "First check whether (5,7) can be produced by the first line.",
      steps: [
        "For the first line, 5=1+2λ.",
        "Therefore 2λ=4 and λ=2.",
        "Check the y-coordinate: 1+3(2)=7.",
        "So (5,7) lies on the first line.",
        "For the second line, μ=0 gives (5,7).",
        "Therefore the point lies on both lines."
      ],
      ans: "Yes, (5,7) is the intersection.",
      why: "A point is the intersection when it lies on both lines."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Proof of the Midpoint Theorem",

  `
<h2>Vector Proof of the Midpoint Theorem</h2>

<p><b>One concept:</b> Use vectors to prove that the line joining the midpoints of two sides of a triangle is parallel to the third side and half its length.</p>

<h3>The Triangle</h3>

<p>Consider triangle ABC.</p>

<p>Let:</p>

<ul>
<li>D be the midpoint of AB.</li>
<li>E be the midpoint of AC.</li>
</ul>

<p>We want to prove that:</p>

<p>
\\[
DE \\parallel BC
\\]
</p>

<p>and</p>

<p>
\\[
|DE|=\\frac12|BC|
\\]
</p>

<h3>Step 1: Represent the Points</h3>

<p>Take A as the origin.</p>

<p>Let:</p>

<p>
\\[
\\vec{AB}=\\mathbf b
\\]
</p>

<p>and</p>

<p>
\\[
\\vec{AC}=\\mathbf c
\\]
</p>

<p>Therefore:</p>

<p>
\\[
B=\\mathbf b
\\]
</p>

<p>and</p>

<p>
\\[
C=\\mathbf c
\\]
</p>

<h3>Step 2: Find the Position Vector of D</h3>

<p>D is the midpoint of AB.</p>

<p>Therefore D is halfway from A to B:</p>

<p>
\\[
\\vec{AD}=\\frac12\\vec{AB}
\\]
</p>

<p>Since:</p>

<p>
\\[
\\vec{AB}=\\mathbf b
\\]
</p>

<p>we get:</p>

<p>
\\[
\\boxed{\\vec{AD}=\\frac12\\mathbf b}
\\]
</p>

<h3>Step 3: Find the Position Vector of E</h3>

<p>E is the midpoint of AC.</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AE}=\\frac12\\vec{AC}
\\]
</p>

<p>Since:</p>

<p>
\\[
\\vec{AC}=\\mathbf c
\\]
</p>

<p>we get:</p>

<p>
\\[
\\boxed{\\vec{AE}=\\frac12\\mathbf c}
\\]
</p>

<h3>Step 4: Find DE</h3>

<p>The vector from D to E is:</p>

<p>
\\[
\\vec{DE}=\\vec{AE}-\\vec{AD}
\\]
</p>

<p>Substitute:</p>

<p>
\\[
\\vec{DE}
=
\\frac12\\mathbf c-\\frac12\\mathbf b
\\]
</p>

<p>Factor out \\(\\frac12\\):</p>

<p>
\\[
\\vec{DE}
=
\\frac12(\\mathbf c-\\mathbf b)
\\]
</p>

<h3>Step 5: Find BC</h3>

<p>The vector from B to C is:</p>

<p>
\\[
\\vec{BC}=\\vec{AC}-\\vec{AB}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{BC}=\\mathbf c-\\mathbf b
\\]
</p>

<h3>Step 6: Compare DE and BC</h3>

<p>We found:</p>

<p>
\\[
\\vec{DE}=\\frac12(\\mathbf c-\\mathbf b)
\\]
</p>

<p>and:</p>

<p>
\\[
\\vec{BC}=\\mathbf c-\\mathbf b
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{\\vec{DE}=\\frac12\\vec{BC}}
\\]
</p>

<p>Since DE is a scalar multiple of BC, the two vectors are parallel.</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{DE\\parallel BC}
\\]
</p>

<p>And because DE is half of BC:</p>

<p>
\\[
\\boxed{|DE|=\\frac12|BC|}
\\]
</p>

<h3>Numerical Example</h3>

<p>Let:</p>

<p>
\\[
A=(0,0),\\quad B=(8,2),\\quad C=(4,10)
\\]
</p>

<p>D is the midpoint of AB:</p>

<p>
\\[
D=
\\left(
\\frac{0+8}{2},
\\frac{0+2}{2}
\\right)
\\]
</p>

<p>
\\[
D=(4,1)
\\]
</p>

<p>E is the midpoint of AC:</p>

<p>
\\[
E=
\\left(
\\frac{0+4}{2},
\\frac{0+10}{2}
\\right)
\\]
</p>

<p>
\\[
E=(2,5)
\\]
</p>

<p>Now find DE:</p>

<p>
\\[
\\vec{DE}=E-D
\\]
</p>

<p>
\\[
=(2-4,5-1)
\\]
</p>

<p>
\\[
\\boxed{\\vec{DE}=(-2,4)}
\\]
</p>

<p>Now find BC:</p>

<p>
\\[
\\vec{BC}=C-B
\\]
</p>

<p>
\\[
=(4-8,10-2)
\\]
</p>

<p>
\\[
\\boxed{\\vec{BC}=(-4,8)}
\\]
</p>

<p>Compare:</p>

<p>
\\[
(-2,4)=\\frac12(-4,8)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{\\vec{DE}=\\frac12\\vec{BC}}
\\]
</p>

<p>So DE is parallel to BC and has half its length.</p>

<h3>What the Proof Shows</h3>

<p>For any triangle, if D and E are the midpoints of two sides, then:</p>

<p>
\\[
\\boxed{\\vec{DE}=\\frac12\\vec{BC}}
\\]
</p>

<p>This single vector relationship proves both facts:</p>

<ul>
<li>DE is parallel to BC.</li>
<li>DE is half the length of BC.</li>
</ul>
`,

  [
    {
      q: "In triangle ABC, D and E are the midpoints of AB and AC. If AB = b and AC = c, express DE in terms of b and c.",
      hint: "First find AD and AE, then use DE = AE - AD.",
      steps: [
        "Since D is the midpoint of AB, AD = 1/2 b.",
        "Since E is the midpoint of AC, AE = 1/2 c.",
        "DE = AE - AD.",
        "DE = 1/2 c - 1/2 b.",
        "Therefore DE = 1/2(c-b)."
      ],
      ans: "DE = 1/2(c-b)",
      why: "The vector from D to E is obtained by subtracting the position vector of D from that of E."
    },

    {
      q: "If BC = (10,-6), find the vector DE when D and E are the midpoints of AB and AC.",
      hint: "The midpoint theorem gives DE = 1/2 BC.",
      steps: [
        "Use DE = 1/2 BC.",
        "DE = 1/2(10,-6).",
        "Multiply each component by 1/2.",
        "DE = (5,-3)."
      ],
      ans: "DE = (5,-3)",
      why: "The vector joining the two midpoints is half the vector of the third side."
    },

    {
      q: "A=(0,0), B=(6,4), and C=(10,8). D and E are the midpoints of AB and AC. Find DE and BC, then verify the midpoint theorem.",
      hint: "Find D and E first, then subtract coordinates.",
      steps: [
        "D = ((0+6)/2, (0+4)/2) = (3,2).",
        "E = ((0+10)/2, (0+8)/2) = (5,4).",
        "DE = (5-3,4-2) = (2,2).",
        "BC = (10-6,8-4) = (4,4).",
        "Therefore DE = 1/2 BC."
      ],
      ans: "DE=(2,2) and BC=(4,4), so DE=1/2 BC.",
      why: "Because DE is exactly half of BC, the two vectors are parallel and DE has half the length of BC."
    },

    {
      q: "If DE = 1/2 BC, what does this tell you about the direction of DE compared with BC?",
      hint: "A positive scalar multiple preserves direction.",
      steps: [
        "DE = 1/2 BC.",
        "The scalar 1/2 is positive.",
        "A positive scalar multiple gives a vector in the same direction.",
        "Therefore DE and BC are parallel and point in the same direction."
      ],
      ans: "DE is parallel to BC and has the same direction.",
      why: "A positive scalar multiple changes magnitude but does not reverse direction."
    },

    {
      q: "Why does DE = 1/2 BC prove that DE is parallel to BC?",
      hint: "Recall the condition for two vectors to be parallel.",
      steps: [
        "Two vectors are parallel if one is a scalar multiple of the other.",
        "DE = 1/2 BC.",
        "Therefore DE is a scalar multiple of BC.",
        "Hence DE is parallel to BC."
      ],
      ans: "Because DE is a scalar multiple of BC.",
      why: "Parallel vectors have the same or opposite direction, which occurs when one is a scalar multiple of the other."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Proof of a Parallelogram",

  `
<h2>Vector Proof of a Parallelogram</h2>

<p><b>One concept:</b> Use vectors to prove that the diagonals of a parallelogram bisect each other.</p>

<h3>Set Up the Parallelogram</h3>

<p>Consider parallelogram ABCD.</p>

<p>Take A as the origin.</p>

<p>Let:</p>

<p>
\\[
\\vec{AB}=\\mathbf b
\\]
</p>

<p>and</p>

<p>
\\[
\\vec{AD}=\\mathbf d
\\]
</p>

<p>Because opposite sides of a parallelogram are equal and parallel:</p>

<p>
\\[
\\vec{BC}=\\mathbf d
\\]
</p>

<p>Therefore the position vector of C is:</p>

<p>
\\[
\\vec{AC}=\\vec{AB}+\\vec{BC}
\\]
</p>

<p>
\\[
\\boxed{\\vec{AC}=\\mathbf b+\\mathbf d}
\\]
</p>

<h3>Find the Midpoint of AC</h3>

<p>Let M be the midpoint of AC.</p>

<p>The position vector of M is the average of the position vectors of A and C:</p>

<p>
\\[
\\vec{AM}
=
\\frac{\\vec{AA}+\\vec{AC}}{2}
\\]
</p>

<p>Since A is the origin:</p>

<p>
\\[
\\vec{AA}=\\mathbf 0
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AM}
=
\\frac{\\mathbf 0+(\\mathbf b+\\mathbf d)}{2}
\\]
</p>

<p>
\\[
\\boxed{\\vec{AM}=\\frac12(\\mathbf b+\\mathbf d)}
\\]
</p>

<h3>Find the Midpoint of BD</h3>

<p>Let N be the midpoint of BD.</p>

<p>The position vectors of B and D are:</p>

<p>
\\[
\\vec{AB}=\\mathbf b
\\]
</p>

<p>and</p>

<p>
\\[
\\vec{AD}=\\mathbf d
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AN}
=
\\frac{\\mathbf b+\\mathbf d}{2}
\\]
</p>

<p>So:</p>

<p>
\\[
\\boxed{\\vec{AN}=\\frac12(\\mathbf b+\\mathbf d)}
\\]
</p>

<h3>Compare the Two Midpoints</h3>

<p>We found:</p>

<p>
\\[
\\vec{AM}=\\frac12(\\mathbf b+\\mathbf d)
\\]
</p>

<p>and:</p>

<p>
\\[
\\vec{AN}=\\frac12(\\mathbf b+\\mathbf d)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{\\vec{AM}=\\vec{AN}}
\\]
</p>

<p>So M and N are the same point.</p>

<p>Therefore the diagonals AC and BD have the same midpoint.</p>

<p>Hence:</p>

<p>
\\[
\\boxed{\\text{The diagonals of a parallelogram bisect each other.}}
\\]
</p>

<h3>Numerical Example</h3>

<p>Consider parallelogram ABCD:</p>

<p>
\\[
A=(0,0),\\quad B=(8,2),\\quad D=(4,6)
\\]
</p>

<p>First find C.</p>

<p>Since:</p>

<p>
\\[
\\vec{AC}=\\vec{AB}+\\vec{AD}
\\]
</p>

<p>we have:</p>

<p>
\\[
\\vec{AB}=(8,2)
\\]
</p>

<p>and:</p>

<p>
\\[
\\vec{AD}=(4,6)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
C=(8,2)+(4,6)
\\]
</p>

<p>
\\[
\boxed{C=(12,8)}
\\]
</p>

<h3>Midpoint of AC</h3>

<p>
\\[
M=
\\left(
\\frac{0+12}{2},
\\frac{0+8}{2}
\\right)
\\]
</p>

<p>
\\[
\boxed{M=(6,4)}
\\]
</p>

<h3>Midpoint of BD</h3>

<p>
\\[
N=
\\left(
\\frac{8+4}{2},
\\frac{2+6}{2}
\\right)
\\]
</p>

<p>
\\[
\boxed{N=(6,4)}
\\]
</p>

<p>Since:</p>

<p>
\\[
M=N=(6,4)
\\]
</p>

<p>the diagonals bisect each other.</p>

<h3>Key Result</h3>

<p>For parallelogram ABCD:</p>

<p>
\\[
\\boxed{\\text{Midpoint of AC}=\\text{Midpoint of BD}}
\\]
</p>

<p>This is the vector proof that the diagonals of a parallelogram bisect each other.</p>
`,

  [
    {
      q: "In parallelogram ABCD, A is the origin, AB=b and AD=d. Find the position vector of C.",
      hint: "Move from A to B and then from B to C.",
      steps: [
        "AB = b.",
        "Because ABCD is a parallelogram, BC = AD = d.",
        "AC = AB + BC.",
        "Therefore AC = b + d."
      ],
      ans: "AC = b + d",
      why: "The diagonal AC is the sum of the two adjacent side vectors AB and AD."
    },

    {
      q: "A=(0,0), B=(6,2), and D=(4,8) are three vertices of parallelogram ABCD. Find C.",
      hint: "Use AC = AB + AD.",
      steps: [
        "AB = (6,2).",
        "AD = (4,8).",
        "AC = (6,2) + (4,8).",
        "AC = (10,10).",
        "Since A is (0,0), C=(10,10)."
      ],
      ans: "C=(10,10)",
      why: "The fourth vertex is obtained by adding the two adjacent side vectors."
    },

    {
      q: "For the parallelogram above, find the midpoint of AC and the midpoint of BD.",
      hint: "Use the midpoint formula for each diagonal.",
      steps: [
        "A=(0,0), C=(10,10).",
        "Midpoint of AC = ((0+10)/2,(0+10)/2) = (5,5).",
        "B=(6,2), D=(4,8).",
        "Midpoint of BD = ((6+4)/2,(2+8)/2) = (5,5)."
      ],
      ans: "Both diagonals have midpoint (5,5).",
      why: "Having the same midpoint means the diagonals bisect each other."
    },

    {
      q: "A parallelogram has A=(2,1), B=(8,5), and D=(5,7). Find C.",
      hint: "C = B + D - A.",
      steps: [
        "AB = B-A = (8-2,5-1) = (6,4).",
        "AD = D-A = (5-2,7-1) = (3,6).",
        "AC = AB + AD = (6,4)+(3,6) = (9,10).",
        "Starting from A=(2,1), add AC: C=(11,11)."
      ],
      ans: "C=(11,11)",
      why: "The two adjacent side vectors from A determine the fourth vertex."
    },

    {
      q: "What vector relationship proves that the diagonals of a parallelogram bisect each other?",
      hint: "Compare the position vectors of their midpoints.",
      steps: [
        "Let M be the midpoint of AC.",
        "Let N be the midpoint of BD.",
        "Both midpoints have position vector 1/2(b+d) when A is the origin.",
        "Therefore AM=AN.",
        "Hence M and N are the same point."
      ],
      ans: "The two diagonals have the same midpoint.",
      why: "If both diagonals have the same midpoint, each diagonal divides the other into two equal parts."
    }
  ]
);
add(
  "math",
  "vectors",
  "Finding the Fourth Vertex of a Parallelogram",

  `
<h2>Finding the Fourth Vertex of a Parallelogram</h2>

<p><b>One concept:</b> Find a missing vertex of a parallelogram when the other three vertices are known.</p>

<h3>The Key Relationship</h3>

<p>Consider parallelogram ABCD, where A, B, C, D are in order.</p>

<p>The opposite sides are equal and parallel:</p>

<p>
\\[
\\vec{AB}=\\vec{DC}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
B-A=C-D
\\]
</p>

<p>Rearrange to find D:</p>

<p>
\\[
\\boxed{D=A+C-B}
\\]
</p>

<p>Similarly, if B is the missing vertex:</p>

<p>
\\[
\\boxed{B=A+C-D}
\\]
</p>

<h3>Example 1: Find D</h3>

<p>Given:</p>

<p>
\\[
A=(1,2),\\quad B=(5,4),\\quad C=(9,8)
\\]
</p>

<p>Find D.</p>

<p>Use:</p>

<p>
\\[
D=A+C-B
\\]
</p>

<p>Substitute:</p>

<p>
\\[
D=(1,2)+(9,8)-(5,4)
\\]
</p>

<p>Add A and C:</p>

<p>
\\[
(1,2)+(9,8)=(10,10)
\\]
</p>

<p>Subtract B:</p>

<p>
\\[
(10,10)-(5,4)=(5,6)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{D=(5,6)}
\\]
</p>

<h3>Check Using Vectors</h3>

<p>Find AB:</p>

<p>
\\[
\\vec{AB}=B-A
\\]
</p>

<p>
\\[
=(5-1,4-2)
\\]
</p>

<p>
\\[
\\vec{AB}=(4,2)
\\]
</p>

<p>Find DC:</p>

<p>
\\[
\\vec{DC}=C-D
\\]
</p>

<p>
\\[
=(9-5,8-6)
\\]
</p>

<p>
\\[
\\vec{DC}=(4,2)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AB}=\\vec{DC}
\\]
</p>

<p>The answer is correct.</p>

<h3>Example 2: Find B</h3>

<p>Given:</p>

<p>
\\[
A=(2,1),\\quad C=(8,7),\\quad D=(4,5)
\\]
</p>

<p>Find B.</p>

<p>Use:</p>

<p>
\\[
B=A+C-D
\\]
</p>

<p>Substitute:</p>

<p>
\\[
B=(2,1)+(8,7)-(4,5)
\\]
</p>

<p>Add:</p>

<p>
\\[
(2,1)+(8,7)=(10,8)
\\]
</p>

<p>Subtract:</p>

<p>
\\[
(10,8)-(4,5)=(6,3)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{B=(6,3)}
\\]
</p>

<h3>Example 3: Negative Coordinates</h3>

<p>Given:</p>

<p>
\\[
A=(-2,3),\\quad B=(4,-1),\\quad C=(7,5)
\\]
</p>

<p>Find D.</p>

<p>Use:</p>

<p>
\\[
D=A+C-B
\\]
</p>

<p>Substitute:</p>

<p>
\\[
D=(-2,3)+(7,5)-(4,-1)
\\]
</p>

<p>First add A and C:</p>

<p>
\\[
(-2,3)+(7,5)=(5,8)
\\]
</p>

<p>Now subtract B:</p>

<p>
\\[
(5,8)-(4,-1)
\\]
</p>

<p>Remember that subtracting a negative means adding:</p>

<p>
\\[
=(5-4,8-(-1))
\\]
</p>

<p>
\\[
=(1,9)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\boxed{D=(1,9)}
\\]
</p>

<h3>Example 4: Find a Missing Vertex Using a Vector Route</h3>

<p>Given:</p>

<p>
\\[
A=(3,2),\\quad B=(7,5),\\quad C=(10,11)
\\]
</p>

<p>Find D.</p>

<p>First find the vector from B to C:</p>

<p>
\\[
\\vec{BC}=C-B
\\]
</p>

<p>
\\[
=(10-7,11-5)
\\]
</p>

<p>
\\[
\\vec{BC}=(3,6)
\\]
</p>

<p>In a parallelogram:</p>

<p>
\\[
\\vec{AD}=\\vec{BC}
\\]
</p>

<p>Therefore:</p>

<p>
\\[
D=A+\\vec{BC}
\\]
</p>

<p>
\\[
D=(3,2)+(3,6)
\\]
</p>

<p>
\\[
\\boxed{D=(6,8)}
\\]
</p>

<h3>The Rule to Remember</h3>

<p>For vertices written in order A → B → C → D:</p>

<p>
\\[
\\boxed{D=A+C-B}
\\]
</p>

<p>The important idea is not memorising the formula. Think of the movement:</p>

<p>
\\[
A\\rightarrow B
\\]
</p>

<p>must be the same as:</p>

<p>
\\[
D\\rightarrow C
\\]
</p>

<p>So:</p>

<p>
\\[
\\boxed{\\vec{AB}=\\vec{DC}}
\\]
</p>

<p>That relationship allows the missing vertex to be found.</p>
`,

  [
    {
      q: "A=(2,3), B=(6,5), and C=(10,9) are consecutive vertices of a parallelogram. Find D.",
      hint: "Use D=A+C-B.",
      steps: [
        "D = A+C-B.",
        "D = (2,3)+(10,9)-(6,5).",
        "(2,3)+(10,9)=(12,12).",
        "(12,12)-(6,5)=(6,7)."
      ],
      ans: "D=(6,7)",
      why: "The fourth vertex must make AB equal and parallel to DC."
    },

    {
      q: "A=(1,4), C=(9,10), and D=(3,6) are three consecutive vertices of a parallelogram. Find B.",
      hint: "For B as the missing vertex, use B=A+C-D.",
      steps: [
        "B = A+C-D.",
        "B = (1,4)+(9,10)-(3,6).",
        "(1,4)+(9,10)=(10,14).",
        "(10,14)-(3,6)=(7,8)."
      ],
      ans: "B=(7,8)",
      why: "The missing vertex must make the opposite sides equal and parallel."
    },

    {
      q: "A=(-3,2), B=(4,6), and C=(8,-1) are consecutive vertices of a parallelogram. Find D.",
      hint: "Carefully handle the negative coordinates.",
      steps: [
        "D=A+C-B.",
        "D=(-3,2)+(8,-1)-(4,6).",
        "(-3,2)+(8,-1)=(5,1).",
        "(5,1)-(4,6)=(1,-5)."
      ],
      ans: "D=(1,-5)",
      why: "The coordinate calculation gives the only fourth vertex consistent with the parallelogram's opposite sides."
    },

    {
      q: "A=(2,1), B=(7,4), and C=(11,9). Find D and verify your answer using vectors.",
      hint: "After finding D, compare AB with DC.",
      steps: [
        "D=A+C-B.",
        "D=(2,1)+(11,9)-(7,4).",
        "D=(13,10)-(7,4)=(6,6).",
        "AB=B-A=(7-2,4-1)=(5,3).",
        "DC=C-D=(11-6,9-6)=(5,3).",
        "Therefore AB=DC."
      ],
      ans: "D=(6,6), and AB=DC=(5,3).",
      why: "Equal opposite side vectors confirm that the four points form the required parallelogram."
    },

    {
      q: "Why does D=A+C-B work when A, B, C are consecutive vertices of a parallelogram?",
      hint: "Start with the opposite-side vector relationship.",
      steps: [
        "In a parallelogram, AB=DC.",
        "Therefore B-A=C-D.",
        "Rearrange: D=A+C-B.",
        "So the formula comes directly from equal opposite side vectors."
      ],
      ans: "It follows from AB=DC.",
      why: "The formula is derived from the defining vector relationship between opposite sides."
    }
  ]
);
add(
  "math",
  "vectors",
  "Vector Proof of Collinearity",

  `
<h2>Vector Proof of Collinearity</h2>

<p><b>One concept:</b> Prove that three points lie on the same straight line by showing that the vectors between them are scalar multiples.</p>

<h3>The Main Idea</h3>

<p>Suppose we have three points A, B and C.</p>

<p>Find:</p>

<p>
\\[
\\vec{AB}=B-A
\\]
</p>

<p>and:</p>

<p>
\\[
\\vec{AC}=C-A
\\]
</p>

<p>If one vector is a scalar multiple of the other, then they have the same direction or opposite directions.</p>

<p>Therefore the three points lie on the same straight line.</p>

<p>The test is:</p>

<p>
\\[
\\boxed{\\vec{AC}=k\\vec{AB}}
\\]
</p>

<p>for some scalar k.</p>

<h3>Example 1: Prove Three Points Are Collinear</h3>

<p>Given:</p>

<p>
\\[
A=(1,2),\\quad B=(4,6),\\quad C=(7,10)
\\]
</p>

<p>Find AB:</p>

<p>
\\[
\\vec{AB}=B-A
\\]
</p>

<p>
\\[
=(4-1,6-2)
\\]
</p>

<p>
\\[
\\vec{AB}=(3,4)
\\]
</p>

<p>Find AC:</p>

<p>
\\[
\\vec{AC}=C-A
\\]
</p>

<p>
\\[
=(7-1,10-2)
\\]
</p>

<p>
\\[
\\vec{AC}=(6,8)
\\]
</p>

<p>Compare:</p>

<p>
\\[
(6,8)=2(3,4)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AC}=2\\vec{AB}
\\]
</p>

<p>Since one vector is a scalar multiple of the other:</p>

<p>
\\[
\\boxed{A,B,C\\text{ are collinear}}
\\]
</p>

<h3>Example 2: Prove Points Are Not Collinear</h3>

<p>Given:</p>

<p>
\\[
A=(2,1),\\quad B=(5,5),\\quad C=(8,6)
\\]
</p>

<p>Find AB:</p>

<p>
\\[
\\vec{AB}=(5-2,5-1)
\\]
</p>

<p>
\\[
\\vec{AB}=(3,4)
\\]
</p>

<p>Find AC:</p>

<p>
\\[
\\vec{AC}=(8-2,6-1)
\\]
</p>

<p>
\\[
\\vec{AC}=(6,5)
\\]
</p>

<p>Check whether AC is a scalar multiple of AB.</p>

<p>If:</p>

<p>
\\[
(6,5)=k(3,4)
\\]
</p>

<p>the first component gives:</p>

<p>
\\[
6=3k
\\]</p>

<p>
\\[
k=2
\\]
</p>

<p>But the second component would require:</p>

<p>
\\[
5=4(2)=8
\\]
</p>

<p>This is false.</p>

<p>Therefore the vectors are not scalar multiples.</p>

<p>Hence:</p>

<p>
\\[
\\boxed{A,B,C\\text{ are not collinear}}
\\]
</p>

<h3>Example 3: Find the Unknown Coordinate</h3>

<p>Point A is:</p>

<p>
\\[
A=(1,2)
\\]
</p>

<p>Point B is:</p>

<p>
\\[
B=(4,6)
\\]
</p>

<p>Point C is:</p>

<p>
\\[
C=(7,y)
\\]
</p>

<p>Find y if A, B and C are collinear.</p>

<p>First find AB:</p>

<p>
\\[
\\vec{AB}=(4-1,6-2)
\\]
</p>

<p>
\\[
\\vec{AB}=(3,4)
\\]
</p>

<p>Find AC:</p>

<p>
\\[
\\vec{AC}=(7-1,y-2)
\\]
</p>

<p>
\\[
\\vec{AC}=(6,y-2)
\\]
</p>

<p>Because the points are collinear, AC must be a multiple of AB.</p>

<p>The x-component tells us:</p>

<p>
\\[
6=2(3)
\\]
</p>

<p>Therefore the same multiplier must be 2 for the y-component:</p>

<p>
\\[
y-2=2(4)
\\]
</p>

<p>
\\[
y-2=8
\\]
</p>

<p>
\\[
\\boxed{y=10}
\\]
</p>

<h3>Example 4: Using a Different Starting Point</h3>

<p>Given:</p>

<p>
\\[
A=(8,7),\\quad B=(2,1),\\quad C=(-4,-5)
\\]
</p>

<p>Find AB:</p>

<p>
\\[
\\vec{AB}=(2-8,1-7)
\\]
</p>

<p>
\\[
\\vec{AB}=(-6,-6)
\\]
</p>

<p>Find BC:</p>

<p>
\\[
\\vec{BC}=(-4-2,-5-1)
\\]
</p>

<p>
\\[
\\vec{BC}=(-6,-6)
\\]
</p>

<p>Therefore:</p>

<p>
\\[
\\vec{AB}=\\vec{BC}
\\]
</p>

<p>The two vectors have the same direction.</p>

<p>Hence:</p>

<p>
\\[
\\boxed{A,B,C\\text{ are collinear}}
\\]
</p>

<h3>Important Distinction</h3>

<p>Do not confuse <b>equal vectors</b> with <b>parallel vectors</b>.</p>

<p>For collinearity, the vectors only need to be scalar multiples:</p>

<p>
\\[
\\boxed{\\vec{AC}=k\\vec{AB}}
\\]
</p>

<p>The scalar can be positive or negative.</p>

<p>For example:</p>

<p>
\\[
\\vec{AC}=-2\\vec{AB}
\\]
</p>

<p>still means the vectors are parallel, so the points are collinear.</p>

<h3>Final Test</h3>

<p>To prove A, B and C are collinear:</p>

<p>
\\[
\\boxed{
\\text{Find two vectors connecting the points and show one is a scalar multiple of the other.}
}
\\]
</p>
`,

  [
    {
      q: "Prove that A=(2,3), B=(5,7), and C=(8,11) are collinear.",
      hint: "Find AB and AC and compare them.",
      steps: [
        "AB=(5-2,7-3)=(3,4).",
        "AC=(8-2,11-3)=(6,8).",
        "AC=2AB.",
        "Therefore A, B and C are collinear."
      ],
      ans: "A, B and C are collinear.",
      why: "AC is a scalar multiple of AB."
    },

    {
      q: "Determine whether A=(1,2), B=(4,8), and C=(7,13) are collinear.",
      hint: "Compare AB and AC.",
      steps: [
        "AB=(4-1,8-2)=(3,6).",
        "AC=(7-1,13-2)=(6,11).",
        "If they were collinear, AC would have to be k(3,6).",
        "The x-components give k=2.",
        "But 2(6)=12, not 11.",
        "Therefore the vectors are not scalar multiples."
      ],
      ans: "They are not collinear.",
      why: "The two vectors do not have the same direction."
    },

    {
      q: "A=(2,1), B=(5,5), and C=(8,y). Find y if the three points are collinear.",
      hint: "Find AB first, then make AC a scalar multiple of AB.",
      steps: [
        "AB=(5-2,5-1)=(3,4).",
        "AC=(8-2,y-1)=(6,y-1).",
        "Since 6=2(3), the scalar multiple is 2.",
        "Therefore y-1=2(4)=8.",
        "y=9."
      ],
      ans: "y=9",
      why: "The value y makes AC exactly twice AB."
    },

    {
      q: "If AB=(4,-3) and AC=(-8,6), are A, B and C collinear?",
      hint: "Check whether AC is a scalar multiple of AB.",
      steps: [
        "Compare AC with AB.",
        "(-8,6)=-2(4,-3).",
        "Therefore AC is a scalar multiple of AB.",
        "Hence the points are collinear."
      ],
      ans: "Yes, A, B and C are collinear.",
      why: "A negative scalar multiple means the vectors are parallel but point in opposite directions."
    },

    {
      q: "What condition involving two vectors can be used to prove that three points are collinear?",
      hint: "Think about parallel vectors.",
      steps: [
        "Take two vectors connecting the three points.",
        "If one vector equals a scalar multiple of the other, they are parallel.",
        "Therefore the points lie on one straight line."
      ],
      ans: "One connecting vector must be a scalar multiple of the other.",
      why: "Scalar multiples of a vector have the same or opposite direction."
    }
  ]
);

add(
  "math",
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
  "Calculus",
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
