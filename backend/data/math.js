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
  "Polygons",
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
  "Calculus",
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

