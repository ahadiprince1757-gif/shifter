/* =========================================================
   MATH DATA FILE - STANDARDIZED SCHEMA
========================================================= */

add(
  "math",
  "numbers",
  "Number Systems & Basic Operations",

  `<h2>Number Systems & Basic Operations</h2>
<hr>
<h3> DEEP NOTES</h3>
<h4>1. Number Systems</h4>
<p>
Number systems are different categories of numbers used to represent quantity, order, and change in mathematics. Each type expands the way we understand values.
</p>
<ul>
<li><b>Natural Numbers:</b> 1, 2, 3, 4, ...  
<br> Used for counting objects in real life (no zero included).</li>
<li><b>Whole Numbers:</b> 0, 1, 2, 3, 4, ...  
<br> Natural numbers plus zero, used for counting and representing “nothing”.</li>
<li><b>Integers:</b> ... -3, -2, -1, 0, 1, 2, 3 ...  
<br> Includes negative numbers, zero, and positives. Used for temperature, debt, and elevation.</li>
<li><b>Fractions:</b> 1/2, 3/4, 5/8  
<br> Represent parts of a whole. Used when quantities are divided.</li>
<li><b>Decimals:</b> 0.5, 2.75, 10.1  
<br> Another way of showing fractions in base-10 form for precision and measurement.</li>
</ul>
<hr>
<h4>2. Key Idea</h4>
<p>
All numbers belong to a structured system, but their behavior changes depending on their type.  
Despite differences, they all follow the same mathematical rules when used in operations like addition, subtraction, multiplication, and division.
</p>
<p>
 Example:
<ul>
<li>Whole numbers behave predictably in counting.</li>
<li>Fractions and decimals require place-value understanding.</li>
<li>Negative numbers introduce direction and loss.</li>
</ul>
</p>
<hr>
<h4>3. BODMAS Rule</h4>
<p>
BODMAS defines the correct order in which mathematical operations must be solved to avoid confusion.
</p>
<pre>
B → Brackets
O → Orders (powers, squares, roots)
D → Division
M → Multiplication
A → Addition
S → Subtraction
</pre>
<p><b>Key Principle:</b> Operations are solved from left to right after applying priority rules.</p>
<p><b>Example:</b></p>
<pre>
8 + 2 × (5 - 3)²
</pre>
<p>Step-by-step idea:</p>
<ul>
<li>First solve Brackets: (5 - 3) = 2</li>
<li>Then Orders: 2² = 4</li>
<li>Then Multiplication: 2 × 4 = 8</li>
<li>Then Addition: 8 + 8 = 16</li>
</ul>
<hr>
<h4>4. Core Insight</h4>
<p>
Mathematics is a structured language. Number systems define what we can represent, while rules like BODMAS define how we process them correctly.
</p>
`,

  [
    {
      "q": "Solve: 6 + 2 × 3",
      "hint": "Use BODMAS",
      "steps": [
        "Step 1: 6 + 2 × 3",
        "Step 2: 6 + (2 × 3) = 6 + 6",
        "Step 3: = 12"
      ],
      "ans": "12",
      "why": "BODMAS: Multiplication before Addition → 2 × 3 = 6, then 6 + 6 = 12"
    },
    {
      "q": "Find: 15 ÷ 3 + 2",
      "hint": "Division first",
      "steps": [
        "Step 1: 15 ÷ 3 + 2",
        "Step 2: (15 ÷ 3) + 2 = 5 + 2",
        "Step 3: = 7"
      ],
      "ans": "7",
      "why": "BODMAS: Division before Addition → 15 ÷ 3 = 5, then 5 + 2 = 7"
    },
    {
      "q": "What type of number is -5?",
      "hint": "check sign",
      "steps": [
        "Step 1: -5 < 0 → negative number",
        "Step 2: -5 ∈ {..., -3, -2, -1, 0, 1, 2, 3, ...}",
        "Step 3: ∴ -5 ∈ ℤ (integers)"
      ],
      "ans": "Integer",
      "why": "ℤ = {..., -3, -2, -1, 0, 1, 2, ...} → -5 ∈ ℤ"
    },
    {
      "q": "Convert 3/4 into a decimal",
      "hint": "divide",
      "steps": [
        "Step 1: 3/4 = 3 ÷ 4",
        "Step 2: 3 ÷ 4 = 0.75"
      ],
      "ans": "0.75",
      "why": "3/4 = 3 ÷ 4 = 0.75"
    },
    {
      "q": "Solve: (5 + 3) × 2",
      "hint": "brackets first",
      "steps": [
        "Step 1: (5 + 3) × 2",
        "Step 2: (8) × 2",
        "Step 3: = 16"
      ],
      "ans": "16",
      "why": "BODMAS: Brackets first → (5 + 3) = 8, then 8 × 2 = 16"
    }
  ]
);

add(
  "math",
  "complex_numbers",
  "Imaginary Unit and Basic Complex Numbers",

  `
<h2> Imaginary Unit and Complex Numbers</h2>
<h3> DEEP NOTES</h3>
<p>
A complex number extends the real number system by introducing the imaginary unit i, where i² = -1.
It allows us to represent quantities that cannot be described on the real number line alone, especially in rotation, waves, and oscillations.
</p>
<pre>
z = a + bi
</pre>
<hr>
<h3> DEFINITIONS (EXPANDED)</h3>
<ul>
<li><b>Real part:</b> a → the measurable quantity on the real number line</li>
<li><b>Imaginary part:</b> bi → represents a perpendicular dimension to real numbers</li>
<li><b>Imaginary unit:</b> i = √(-1), a mathematical construct that enables square roots of negative numbers</li>
<li><b>Complex number:</b> a combination of real + imaginary parts forming a 2D number system</li>
</ul>
<hr>
<h3> KEY IDEA (DEEPER UNDERSTANDING)</h3>
<pre>
Complex number = real axis + imaginary axis
z = a + bi
Think of it as a coordinate:
(a, b) in a 2D plane
</pre>
<p>
Instead of existing on a straight line like real numbers, complex numbers exist on a plane called the <b>Argand Plane</b>.
</p>
<hr>
<h3> GEOMETRIC INTERPRETATION</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22223b" stroke-width="0.5"/>
    </pattern>
    <marker id="math-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
    <marker id="vector-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3498db"/>
    </marker>
  </defs>

  <rect width="280" height="200" fill="url(#grid)"/>
  <line x1="20" y1="100" x2="260" y2="100" stroke="#667" stroke-width="1.5" marker-end="url(#math-arrow)"/>
  <line x1="140" y1="180" x2="140" y2="20" stroke="#667" stroke-width="1.5" marker-end="url(#math-arrow)"/>
  <line x1="200" y1="97" x2="200" y2="103" stroke="#888" stroke-width="1"/>
  <line x1="137" y1="50" x2="143" y2="50" stroke="#888" stroke-width="1"/>
  <line x1="200" y1="100" x2="200" y2="50" stroke="#f1c40f" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="140" y1="50" x2="200" y2="50" stroke="#f1c40f" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="140" y1="100" x2="195" y2="54" stroke="#3498db" stroke-width="2.5" marker-end="url(#vector-arrow)"/>
  <circle cx="200" cy="50" r="4.5" fill="#e74c3c"/>
  <text x="275" y="103" fill="#3498db" font-size="9" font-family="sans-serif" font-weight="bold" text-anchor="end">Re</text>
  <text x="140" y="14" fill="#9b59b6" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Im</text>
  <text x="208" y="44" fill="#fff" font-size="10" font-family="sans-serif" font-weight="bold">z = a + bi</text>
  <text x="208" y="56" fill="#aaa" font-size="8" font-family="monospace">(a, b)</text>
  <text x="200" y="114" fill="#fff" font-size="9" text-anchor="middle" font-family="monospace">a</text>
  <text x="130" y="54" fill="#fff" font-size="9" text-anchor="end" font-family="monospace">bi</text>
  <text x="130" y="112" fill="#888" font-size="8" text-anchor="end" font-family="monospace">O</text>
</svg>
</div>
<p>
This means every complex number represents a <b>point or vector in 2D space</b>.
</p>
<hr>
<h3> OPERATIONS (EXTENDED UNDERSTANDING)</h3>
<ul>
<li><b>Addition:</b> combine real with real, imaginary with imaginary</li>
<li><b>Subtraction:</b> same structure as addition</li>
<li><b>Multiplication:</b> uses distributive law and i² = -1</li>
<li><b>Division:</b> involves multiplying by conjugate to remove i from denominator</li>
</ul>
<hr>
<h3> COMMON MISTAKES (EXPLAINED)</h3>
<ul>
<li> Treating i like a variable → i is a defined constant (√-1)</li>
<li> Ignoring i² = -1 → leads to incorrect simplification</li>
<li> Mixing real/imaginary parts incorrectly during operations</li>
<li> Forgetting complex numbers are 2D, not 1D values</li>
</ul>
<hr>
<h3> WORKED EXAMPLE (EXPANDED)</h3>
<p><b>Question:</b> Simplify (3 + 2i) + (1 + 5i)</p>
<p><b>Step 1: Group real parts</b></p>
<p>3 + 1 = 4</p>
<p><b>Step 2: Group imaginary parts</b></p>
<p>2i + 5i = 7i</p>
<p><b>Step 3: Final answer</b></p>
<p><b>4 + 7i</b></p>
<p><b>Interpretation:</b> This is a point (4, 7) in the complex plane.</p>
<hr>
<h3> ADVANCED INSIGHT</h3>
<p>
Complex numbers are not just arithmetic tools—they represent <b>rotation and transformation</b>.
Multiplying by i rotates a number by 90° in the complex plane.
</p>
<pre>
1 → i → -1 → -i → 1 (rotation cycle)
</pre>
<hr>
<h3> REAL WORLD APPLICATION (EXPANDED)</h3>
<ul>
<li> Electrical engineering → alternating current (AC wave behavior)</li>
<li> Signal processing → encoding and filtering signals</li>
<li> Quantum mechanics → probability amplitudes</li>
<li> Physics → wave motion and oscillations</li>
<li> Computer graphics → rotations and transformations</li>
</ul>
<h3> QUIZ QUESTIONS</h3>
`,

  [
    {
      "q": "What is i defined as?",
      "hint": "square root",
      "steps": [
        "Step 1: The imaginary unit i satisfies i² = -1",
        "Step 2: Therefore i = √(-1)"
      ],
      "ans": "√(-1)",
      "why": "It extends the number system beyond real numbers"
    },
    {
      "q": "Find real and imaginary parts of 5 + 3i",
      "hint": "separate terms",
      "steps": [
        "Step 1: Real part = 5",
        "Step 2: Imaginary part = 3i",
        "Step 3: Combine as 5 + 3i"
      ],
      "ans": "Real = 5, Imaginary = 3i",
      "why": "Complex number a + bi splits into real part a and imaginary part bi"
    },
    {
      "q": "Simplify 2i + 4i",
      "hint": "combine like terms",
      "steps": [
        "Step 1: Combine like terms: 2i + 4i",
        "Step 2: Add coefficients: 2 + 4 = 6",
        "Step 3: Result = 6i"
      ],
      "ans": "6i",
      "why": "Imaginary terms combine by adding coefficients, yielding 6i"
    },
    {
      "q": "What type of number is a + bi?",
      "hint": "name of system",
      "steps": [
        "Step 1: Identify the form a + bi",
        "Step 2: Recognize that a is the real part and bi is the imaginary part",
        "Step 3: Any number of the form a + bi belongs to the complex number system",
        "Step 4: Therefore, a + bi is a complex number"
      ],
      "ans": "Complex number",
      "why": "A complex number combines a real part (a) and an imaginary part (bi) into a single number of the form a + bi."
    },
    {
      "q": "What happens when i² is calculated?",
      "hint": "negative result",
      "steps": [
        "Step 1: Define the imaginary unit: i = √(-1)",
        "Step 2: Square both sides: i² = (√(-1))²",
        "Step 3: Simplify the square and square root: (√(-1))² = -1",
        "Step 4: Therefore, i² = -1"
      ],
      "ans": "-1",
      "why": "The imaginary unit i is defined so that i² = -1. This is the fundamental property of complex numbers."
    }
  ]
);

add(
  "math",
  "complex_numbers",
  "Argand Diagram (Complex Plane)",

  `
<h2> Argand Diagram (Complex Plane)</h2>
<h3> DEEP NOTES</h3>
<p>
An Argand diagram represents complex numbers as points on a 2D plane, where each complex number corresponds to a coordinate.
</p>
<pre>
x-axis → real part (Re)
y-axis → imaginary part (Im)
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>z = a + bi → point (a, b)</li>
<li>Horizontal axis = real values</li>
<li>Vertical axis = imaginary values</li>
</ul>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Swapping real and imaginary parts</li>
<li> Plotting i-component on x-axis</li>
<li> Forgetting sign of imaginary part</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Plot z = 3 + 4i</p>
<p><b>Step 1:</b> Identify real part → 3 (move right)</p>
<p><b>Step 2:</b> Identify imaginary part → 4 (move up)</p>
<p><b>Step 3:</b> Plot point (3, 4)</p>
<p><b>Final Answer:</b> (3, 4)</p>
<h3> VISUAL DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22223b" stroke-width="0.5"/>
    </pattern>
    <marker id="math-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
    <marker id="vector-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3498db"/>
    </marker>
  </defs>

  <rect width="280" height="200" fill="url(#grid)"/>
  <line x1="20" y1="140" x2="260" y2="140" stroke="#667" stroke-width="1.5" marker-end="url(#math-arrow)"/>
  <line x1="80" y1="180" x2="80" y2="20" stroke="#667" stroke-width="1.5" marker-end="url(#math-arrow)"/>
  <line x1="120" y1="137" x2="120" y2="143" stroke="#888" stroke-width="1"/>
  <line x1="160" y1="137" x2="160" y2="143" stroke="#888" stroke-width="1"/>
  <line x1="200" y1="137" x2="200" y2="143" stroke="#888" stroke-width="1"/>
  <line x1="77" y1="110" x2="83" y2="110" stroke="#888" stroke-width="1"/>
  <line x1="77" y1="80" x2="83" y2="80" stroke="#888" stroke-width="1"/>
  <line x1="77" y1="60" x2="83" y2="60" stroke="#888" stroke-width="1"/>
  <line x1="200" y1="140" x2="200" y2="60" stroke="#3498db" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="80" y1="60" x2="200" y2="60" stroke="#3498db" stroke-dasharray="3,3" stroke-width="1"/>
  <line x1="80" y1="140" x2="195" y2="64" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#vector-arrow)"/>
  <circle cx="200" cy="60" r="4.5" fill="#e74c3c"/>
  <text x="270" y="137" fill="#3498db" font-size="9" font-family="sans-serif" font-weight="bold">Re</text>
  <text x="80" y="14" fill="#9b59b6" font-size="9" font-weight="bold" text-anchor="middle" font-family="sans-serif">Im</text>
  <text x="200" y="152" fill="#fff" font-size="9" text-anchor="middle" font-family="monospace">3</text>
  <text x="70" y="63" fill="#fff" font-size="9" text-anchor="end" font-family="monospace">4i</text>
  <text x="72" y="152" fill="#888" font-size="8" text-anchor="end" font-family="monospace">O</text>
  <text x="208" y="52" fill="#fff" font-size="10" font-family="sans-serif" font-weight="bold">z = 3 + 4i</text>
  <text x="208" y="65" fill="#aaa" font-size="8" font-family="monospace">(3, 4)</text>
</svg>
</div>
<h3> QUIZ QUESTIONS</h3>
`,

  [
    {
      "q": "What axis represents the imaginary part?",
      "hint": "vertical axis",
      "steps": [
        "Step 1: In z = a + bi, the imaginary part is b",
        "Step 2: On the Argand plane, b is plotted on the vertical axis",
        "Step 3: ∴ Imaginary part → y-axis"
      ],
      "ans": "y-axis",
      "why": "In z = a + bi, b maps to the y-axis (vertical), a maps to the x-axis (horizontal)"
    },
    {
      "q": "Plot z = 2 + 5i as a point",
      "hint": "real then imaginary",
      "steps": [
        "Step 1: z = 2 + 5i → a = 2, b = 5",
        "Step 2: Plot (a, b) = (2, 5) on the Argand plane",
        "Step 3: ∴ z = 2 + 5i → point (2, 5)"
      ],
      "ans": "(2,5)",
      "why": "z = a + bi maps to the coordinate (a, b), so 2 + 5i → (2, 5)"
    },
    {
      "q": "What does z = a + bi represent on the Argand plane?",
      "hint": "coordinate system",
      "steps": [
        "Step 1: z = a + bi → real part = a, imaginary part = b",
        "Step 2: Map a to x-axis, b to y-axis",
        "Step 3: ∴ z = a + bi ↔ point (a, b) in 2D"
      ],
      "ans": "A point (a, b)",
      "why": "Every complex number z = a + bi corresponds to a unique point (a, b) on the 2D Argand plane"
    },
    {
      "q": "Where is the real part plotted?",
      "hint": "horizontal axis",
      "steps": [
        "Step 1: In z = a + bi, the real part is a",
        "Step 2: On the Argand plane, a is measured along the horizontal axis",
        "Step 3: ∴ Real part → x-axis"
      ],
      "ans": "x-axis",
      "why": "In z = a + bi, a maps to the x-axis (horizontal), just like the x-coordinate in Cartesian geometry"
    },
    {
      "q": "What is the point for z = -3 + 2i?",
      "hint": "negative real",
      "steps": [
        "Step 1: Real = -3 (left)",
        "Step 2: Imaginary = 2 (up)",
        "Step 3: Coordinate = (-3, 2)"
      ],
      "ans": "(-3, 2)",
      "why": "Negative real moves left, positive imaginary moves up"
    },
    {
      "q": "Why is Argand diagram useful?",
      "hint": "visual representation",
      "steps": [
        "Step 1: z = a + bi is algebraic → hard to visualize",
        "Step 2: Argand plane maps z → point (a, b) in 2D",
        "Step 3: Operations like addition become vector addition on the plane",
        "Step 4: ∴ The diagram turns algebra into geometry"
      ],
      "ans": "It gives a geometric representation of complex numbers",
      "why": "Mapping z = a + bi to (a, b) lets us visualize addition as vector sums and multiplication as rotation + scaling"
    }
  ]
);

add(
  "math",
  "complex_numbers",
  "Operations on Complex Numbers",

  `
<h2> Complex Number Operations</h2>

<h3> DEEP NOTES</h3>
<p>
Complex numbers can be added, subtracted, multiplied, and divided using algebraic rules while remembering that i² = -1.
</p>
<h3> KEY IDEA</h3>
<ul>
<li>Add/subtract → combine like terms</li>
<li>Multiply → use FOIL/distributive law</li>
<li>Always replace i² with -1</li>
</ul>
<h3> WORKED EXAMPLE (MULTIPLICATION)</h3>
<p><b>Question:</b> (2 + i)(3 + 4i)</p>
<p><b>Step 1: Expand</b></p>
<p>2×3 = 6</p>
<p>2×4i = 8i</p>
<p>i×3 = 3i</p>
<p>i×4i = 4i²</p>
<p><b>Step 2: Replace i²</b></p>
<p>4i² = -4</p>
<p><b>Step 3: Combine like terms</b></p>
<p>(6 − 4) + (8i + 3i)</p>
<p><b>Step 4: Final answer</b></p>
<p>2 + 11i</p>
<h3> VISUAL IDEA</h3>
<pre>
FOIL:
First + Outer + Inner + Last
Then simplify using i² = -1
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Electrical engineering (impedance)</li>
<li> Signal processing</li>
<li> Wave interference systems</li>
<li> Quantum physics</li>
</ul>
<h3> QUIZ QUESTIONS</h3>
`,

  [
    {
      "q": "What is i² equal to?",
      "hint": "definition of i",
      "steps": [
        "Step 1: By definition, i = √(−1)",
        "Step 2: Square both sides: i² = (√(−1))²",
        "Step 3: (√(−1))² = −1",
        "Step 4: ∴ i² = −1"
      ],
      "ans": "-1",
      "why": "i = √(−1), so i² = (√(−1))² = −1. This is the foundational identity of complex numbers."
    },
    {
      "q": "Simplify i² + 5",
      "hint": "replace i²",
      "steps": [
        "Step 1: i² + 5",
        "Step 2: Replace i² with −1: (−1) + 5",
        "Step 3: −1 + 5 = 4"
      ],
      "ans": "4",
      "why": "i² = −1 by definition, so i² + 5 = −1 + 5 = 4"
    },
    {
      "q": "Multiply (1 + i)(1 + i)",
      "hint": "FOIL method",
      "steps": [
        "Step 1: (1 + i)(1 + i) → use FOIL",
        "Step 2: First: 1×1 = 1",
        "Step 3: Outer: 1×i = i",
        "Step 4: Inner: i×1 = i",
        "Step 5: Last: i×i = i² = −1",
        "Step 6: Combine: 1 + i + i + (−1) = 1 + 2i − 1",
        "Step 7: = 2i"
      ],
      "ans": "2i",
      "why": "FOIL: (1+i)(1+i) = 1 + 2i + i² = 1 + 2i − 1 = 2i"
    },
    {
      "q": "Find (3 + 2i) + (1 + 4i)",
      "hint": "add like terms",
      "steps": [
        "Step 1: (3 + 2i) + (1 + 4i)",
        "Step 2: Group real parts: 3 + 1 = 4",
        "Step 3: Group imaginary parts: 2i + 4i = 6i",
        "Step 4: ∴ (3 + 2i) + (1 + 4i) = 4 + 6i"
      ],
      "ans": "4 + 6i",
      "why": "(a + bi) + (c + di) = (a+c) + (b+d)i, so (3+1) + (2+4)i = 4 + 6i"
    },
    {
      "q": "Why do we replace i² with -1?",
      "hint": "definition",
      "steps": [
        "Step 1: The imaginary unit is defined as i = √(−1)",
        "Step 2: Squaring: i² = (√(−1))² = −1",
        "Step 3: So whenever i² appears, substitute −1",
        "Step 4: This converts imaginary terms into real terms for simplification"
      ],
      "ans": "Because i² = -1 by definition",
      "why": "i = √(−1) ∴ i² = −1. Replacing i² converts imaginary expressions into real numbers."
    },
    {
      "q": "What method is used for multiplying complex numbers?",
      "hint": "FOIL",
      "steps": [
        "Step 1: (a + bi)(c + di) → expand using FOIL",
        "Step 2: = ac + adi + bci + bdi²",
        "Step 3: Replace i² = −1: = ac + adi + bci − bd",
        "Step 4: Group: = (ac − bd) + (ad + bc)i"
      ],
      "ans": "FOIL / distributive method",
      "why": "FOIL expands (a+bi)(c+di) = (ac−bd) + (ad+bc)i, then i² = −1 simplifies the result"
    }
  ]
);

add(
  "math",
  "complex_numbers",
  "Polar Form of Complex Numbers",

  `
<h2> Polar Form</h2>
<h3> DEEP NOTES</h3>
<p>
A complex number can be represented using its magnitude (r) and angle (θ).
</p>
<pre>
z = r(cosθ + i sinθ)
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>r = distance from origin</li>
<li>θ = angle from positive real axis</li>
<li>Used for rotation and scaling in complex plane</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Convert (3,4) into polar form</p>
<p><b>Step 1: Find r</b></p>
<p>r = √(3² + 4²) = 5</p>
<p><b>Step 2: Find θ</b></p>
<p>θ = tan⁻¹(4/3)</p>
<p><b>Step 3: Write polar form</b></p>
<p>z = 5(cosθ + i sinθ)</p>
<h3> DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
  <defs>
    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#22223b" stroke-width="0.5"/>
    </pattern>
    <marker id="math-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#888"/>
    </marker>
    <marker id="vector-arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4" markerHeight="4" orient="auto">
      <path d="M 0 0 L 10 5 L 0 10 z" fill="#3498db"/>
    </marker>
  </defs>

  <rect width="280" height="200" fill="url(#grid)"/>
  <line x1="60" y1="140" x2="220" y2="140" stroke="#aaa" stroke-width="2"/>
  <line x1="220" y1="140" x2="220" y2="40" stroke="#aaa" stroke-width="2"/>
  <line x1="60" y1="140" x2="220" y2="40" stroke="#3498db" stroke-width="3"/>
  <path d="M 90,140 A 30,30 0 0,0 85,121" fill="none" stroke="#f1c40f" stroke-width="2"/>
  <text x="96" y="132" fill="#f1c40f" font-size="11" font-weight="bold" font-family="sans-serif">θ</text>
  <rect x="208" y="128" width="12" height="12" fill="none" stroke="#fff" stroke-width="1.5" opacity="0.6"/>
  <text x="140" y="156" fill="#ffa07a" font-size="10" font-weight="bold" text-anchor="middle" font-family="sans-serif">Real part (x = 3)</text>
  <text x="232" y="95" fill="#2ecc71" font-size="10" font-weight="bold" font-family="sans-serif">Imag part (y = 4i)</text>
  <text x="125" y="78" fill="#3498db" font-size="10" font-weight="bold" font-family="sans-serif" transform="rotate(-32 125 78)">Modulus r = √(3² + 4²) = 5</text>
  <circle cx="60" cy="140" r="4.5" fill="#fff"/>
  <circle cx="220" cy="40" r="4.5" fill="#e74c3c"/>
  <text x="226" y="34" fill="#fff" font-size="9" font-family="monospace" font-weight="bold">z = 3 + 4i</text>
</svg>
</div>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> AC circuit analysis</li>
<li> Signal processing</li>
<li> Wave motion representation</li>
<li> Quantum state modeling</li>
</ul>
<h3> QUIZ QUESTIONS</h3>
`,

  [
    {
      "q": "What does r represent in polar form?",
      "hint": "distance from origin",
      "steps": [
        "Step 1: z = r(cosθ + i sinθ), where r = √(a² + b²)",
        "Step 2: r is the distance from the origin (0,0) to the point (a, b)",
        "Step 3: ∴ r = |z| = magnitude of z"
      ],
      "ans": "Magnitude",
      "why": "r = √(a² + b²) gives the distance from origin to (a,b), i.e. the modulus |z|"
    },
    {
      "q": "What does θ represent in polar form?",
      "hint": "angle",
      "steps": [
        "Step 1: z = r(cosθ + i sinθ)",
        "Step 2: θ = tan⁻¹(b/a), the angle from the positive real axis",
        "Step 3: ∴ θ = argument of z = direction of z in the complex plane"
      ],
      "ans": "Angle",
      "why": "θ = tan⁻¹(b/a) measures the direction from the positive x-axis to the vector (a, b)"
    },
    {
      "q": "Convert (3,4) into polar form: find r",
      "hint": "use Pythagoras",
      "steps": [
        "Step 1: r = √(a² + b²) = √(3² + 4²)",
        "Step 2: = √(9 + 16) = √25",
        "Step 3: r = 5"
      ],
      "ans": "5",
      "why": "r = √(3² + 4²) = √(9+16) = √25 = 5 (Pythagorean theorem)"
    },
    {
      "q": "Why is polar form useful?",
      "hint": "simplifies operations",
      "steps": [
        "Step 1: In Cartesian form, (a+bi)(c+di) requires FOIL expansion",
        "Step 2: In polar form: z₁·z₂ = r₁r₂ [cos(θ₁+θ₂) + i sin(θ₁+θ₂)]",
        "Step 3: Multiplication becomes: multiply magnitudes, add angles",
        "Step 4: ∴ Polar form simplifies multiplication and division of complex numbers"
      ],
      "ans": "It simplifies multiplication and rotation",
      "why": "z₁·z₂ = r₁r₂ cis(θ₁+θ₂): just multiply |z| and add angles, no FOIL needed"
    },
    {
      "q": "What is the general polar form of a complex number?",
      "hint": "formula",
      "steps": [
        "Step 1: For z = a + bi, compute r = √(a² + b²)",
        "Step 2: Compute θ = tan⁻¹(b/a)",
        "Step 3: Write z = r(cosθ + i sinθ)",
        "Step 4: Also written as z = r cis(θ)"
      ],
      "ans": "z = r(cosθ + i sinθ)",
      "why": "z = a + bi converts to z = r(cosθ + i sinθ) where r = |z| and θ = arg(z)"
    },
    {
      "q": "What is the first step when converting to polar form?",
      "hint": "distance",
      "steps": [
        "Step 1: Given z = a + bi, first find r = √(a² + b²)",
        "Step 2: Then find θ = tan⁻¹(b/a)",
        "Step 3: Assemble: z = r(cosθ + i sinθ)"
      ],
      "ans": "Find r",
      "why": "r = √(a² + b²) must be calculated first because it defines the magnitude before the angle"
    }
  ]
);

add(
  "math",
  "complex_numbers",
  "De Moivre’s Theorem",

  `
<h2> De Moivre’s Theorem</h2>
<p>De Moivre’s Theorem is used to raise complex numbers in trigonometric form to powers quickly by multiplying angles.</p>
<h3> DEFINITION</h3>
<pre>
(cosθ + i sinθ)^n = cos(nθ) + i sin(nθ)
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>Power → multiply the angle</li>
<li>Magnitude stays the same (if r = 1)</li>
<li>Represents rotation on the complex plane</li>
</ul>
<h3> GEOMETRIC MEANING</h3>
<pre>
Each multiplication rotates the point around the origin
Angle increases by n × θ
</pre>
<h3> COMMON MISTAKES</h3>
<ul>
<li> Forgetting to multiply the angle</li>
<li> Using addition instead of multiplication</li>
<li> Not converting final trig values</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> (cos30° + i sin30°)²</p>
<p><b>Step 1: Multiply angle</b></p>
<p>2 × 30° = 60°</p>
<p><b>Step 2: Apply theorem</b></p>
<p>cos60° + i sin60°</p>
<p><b>Step 3: Evaluate values</b></p>
<p>cos60° = 1/2, sin60° = √3/2</p>
<p><b>Final Answer:</b> 1/2 + i(√3/2)</p>
<h3> VISUAL IDEA</h3>
<pre>
Initial point → rotates on unit circle
30° → 60° after squaring
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Electrical engineering (AC signals)</li>
<li> Signal processing and wave rotation</li>
<li> Quantum physics (state transformations)</li>
<li> Satellite communication modeling</li>
</ul>
`,

  [
    {
      "q": "What happens to angle in De Moivre’s theorem?",
      "hint": "power effect",
      "steps": [
        "Step 1: De Moivre’s theorem: (cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)",
        "Step 2: The angle θ is multiplied by the exponent n",
        "Step 3: ∴ New angle = nθ"
      ],
      "ans": "Angle is multiplied by the exponent",
      "why": "(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ) → the angle becomes n×θ"
    },
    {
      "q": "Evaluate (cos45° + i sin45°)^2",
      "hint": "use De Moivre’s theorem",
      "steps": [
        "Step 1: Apply (cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)",
        "Step 2: n = 2, θ = 45° → nθ = 2 × 45° = 90°",
        "Step 3: = cos90° + i sin90°",
        "Step 4: cos90° = 0, sin90° = 1",
        "Step 5: = 0 + i(1) = i"
      ],
      "ans": "i",
      "why": "(cos45° + i sin45°)² = cos(90°) + i sin(90°) = 0 + i = i"
    },
    {
      "q": "What does De Moivre’s theorem represent?",
      "hint": "geometry meaning",
      "steps": [
        "Step 1: z = cosθ + i sinθ is a point on the unit circle at angle θ",
        "Step 2: zⁿ = cos(nθ) + i sin(nθ) moves to angle nθ",
        "Step 3: ∴ Raising to power n rotates the point by n×θ on the unit circle"
      ],
      "ans": "Rotation of complex numbers on a circle",
      "why": "zⁿ = cos(nθ) + i sin(nθ): each power rotates the point n times around the unit circle"
    },
    {
      "q": "What is the effect of raising a complex number to a power?",
      "hint": "think angle",
      "steps": [
        "Step 1: Let z = r(cosθ + i sinθ)",
        "Step 2: zⁿ = rⁿ(cos(nθ) + i sin(nθ))",
        "Step 3: Magnitude becomes rⁿ, angle becomes nθ",
        "Step 4: ∴ Power n multiplies the angle by n and raises magnitude to n"
      ],
      "ans": "It multiplies the angle by the exponent",
      "why": "zⁿ = rⁿ cis(nθ): magnitude → rⁿ, angle → n×θ"
    },
    {
      "q": "Evaluate (cos60° + i sin60°)^3",
      "hint": "multiply angle",
      "steps": [
        "Step 1: Apply De Moivre’s: (cosθ + i sinθ)³ = cos(3θ) + i sin(3θ)",
        "Step 2: θ = 60° → 3 × 60° = 180°",
        "Step 3: = cos180° + i sin180°",
        "Step 4: cos180° = −1, sin180° = 0",
        "Step 5: = −1 + i(0) = −1"
      ],
      "ans": "-1",
      "why": "(cos60° + i sin60°)³ = cos180° + i sin180° = −1 + 0i = −1"
    },
    {
      "q": "Why is De Moivre's theorem useful?",
      "hint": "It makes powers easier.",
      "steps": [
        "Step 1: Finding zⁿ by repeated multiplication is long and difficult.",
        "Step 2: De Moivre's theorem gives zⁿ = rⁿ(cos nθ + i sin nθ).",
        "Step 3: Multiply only the angle by n.",
        "Step 4: This saves time and reduces calculations."
      ],
      "ans": "It simplifies powers of complex numbers.",
      "why": "Instead of multiplying a complex number many times, De Moivre's theorem uses a simple formula."
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

  `<h2> Triangles</h2>
<p>A triangle is a polygon with 3 sides, 3 vertices, and 3 angles.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>The sum of interior angles of a triangle is always 180°</li>
<li>This rule helps find missing angles easily</li>
<li><b>Formula:</b> Missing angle = 180° − (sum of known angles)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
All triangles always add up to 180°
</pre>
<h3> TYPES OF TRIANGLES</h3>
<ul>
<li> Equilateral → all sides equal, all angles = 60°</li>
<li> Isosceles → two sides equal, two equal angles</li>
<li> Scalene → all sides different, all angles different</li>
<li> Right-angled → one angle = 90°</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 40° + 60° + x = 180°<br>
Step 1: 40 + 60 = 100<br>
Step 2: 180 − 100 = 80<br>
<b>Answer: x = 80°</b>
</li>
<li>
<b>Example 2:</b> Find total angle sum<br>
Step 1: Apply triangle rule<br>
<b>Answer: 180°</b>
</li>
<li>
<b>Example 3:</b> 70° and 50° given<br>
Step 1: 70 + 50 = 120<br>
Step 2: 180 − 120 = 60<br>
<b>Answer: 60°</b>
</li>
</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Engineering → bridge and roof design</li>
<li> Architecture → stable structural shapes</li>
<li> Navigation → triangulation in mapping</li>
<li> Technology → signal positioning systems</li>
<li> Game design → 3D modeling structures</li>
</ul>
`,

  [
    {
      "q": "Find missing angle: 30° + 80° + x = 180°",
      "hint": "Use 180° rule",
      "steps": [
        "Step 1: Add known angles → 110°",
        "Step 2: 180 − 110",
        "Step 3: x = 70°"
      ],
      "ans": "70°",
      "why": "All triangle angles must sum to 180°"
    },
    {
      "q": "What is the sum of angles in a triangle?",
      "hint": "constant rule",
      "steps": [
        "Step 1: Identify shape",
        "Step 2: Apply rule",
        "Step 3: State result"
      ],
      "ans": "180°",
      "why": "All triangles have a fixed angle sum of 180°"
    },
    {
      "q": "Which triangle has all sides equal?",
      "hint": "equilateral",
      "steps": [
        "Step 1: Compare sides",
        "Step 2: Check equality",
        "Step 3: Identify type"
      ],
      "ans": "Equilateral triangle",
      "why": "All sides and angles are equal"
    },
    {
      "q": "What is special about right-angled triangles?",
      "hint": "90° angle",
      "steps": [
        "Step 1: Identify angle",
        "Step 2: Check for 90°",
        "Step 3: Define type"
      ],
      "ans": "One angle is 90°",
      "why": "It forms perpendicular sides"
    }
  ]
);

add(
  "math",
  "geometry",
  "Quadrilaterals",

  `<h2>⬛ Quadrilaterals</h2>
<p>A quadrilateral is any polygon with four sides, four angles, and four vertices.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>All quadrilaterals have 4 sides and 4 interior angles</li>
<li>The sum of interior angles of any quadrilateral = 360°</li>
<li>To find a missing angle, subtract known angles from 360°</li>
<li><b>Formula:</b> Missing angle = 360° − (sum of known angles)</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Total interior angle sum of quadrilateral = 360°
</pre>
<h3> TYPES OF QUADRILATERALS</h3>
<ul>
<li>⬜ Square → all sides equal, all angles 90°</li>
<li>▭ Rectangle → opposite sides equal, all angles 90°</li>
<li>◇ Rhombus → all sides equal, opposite angles equal</li>
<li>▱ Parallelogram → opposite sides parallel and equal</li>
<li>⟋ Trapezium → one pair of parallel sides</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Sum of angles in quadrilateral<br>
Step 1: Use rule → 360°<br>
<b>Answer: 360°</b>
</li>
<li>
<b>Example 2:</b> 90° + 80° + 100° + x = 360°<br>
Step 1: Add known angles → 270°<br>
Step 2: 360 − 270 = 90°<br>
<b>Answer: x = 90°</b>
</li>
<li>
<b>Example 3:</b> Shape with 4 equal sides and 4 right angles<br>
Step 1: Identify properties<br>
<b>Answer: Square</b>
</li>
</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Building floor plans → rooms and layouts</li>
<li> Architecture → structural design shapes</li>
<li> Screen design → rectangular displays</li>
<li> Land surveying → plotting land boundaries</li>
<li> Graphic design → layout and framing</li>
</ul>
`,

  [
    {
      "q": "Find missing angle: 100° + 70° + 80° + x = 360°",
      "hint": "Use 360° rule",
      "steps": [
        "Step 1: Add known angles → 250°",
        "Step 2: 360 − 250",
        "Step 3: x = 110°"
      ],
      "ans": "110°",
      "why": "Interior angles of a quadrilateral always sum to 360°"
    },
    {
      "q": "What is the sum of interior angles of a quadrilateral?",
      "hint": "constant rule",
      "steps": [
        "Step 1: Identify shape",
        "Step 2: Apply formula",
        "Step 3: State result"
      ],
      "ans": "360°",
      "why": "All four interior angles always add up to 360°"
    },
    {
      "q": "Which quadrilateral has all sides equal?",
      "hint": "rhombus or square",
      "steps": [
        "Step 1: Check side lengths",
        "Step 2: Compare properties",
        "Step 3: Identify shape"
      ],
      "ans": "Square or Rhombus",
      "why": "Both have equal side lengths"
    },
    {
      "q": "What makes a rectangle different from a square?",
      "hint": "side lengths",
      "steps": [
        "Step 1: Compare sides",
        "Step 2: Compare angles",
        "Step 3: Identify difference"
      ],
      "ans": "Rectangle has equal opposite sides, square has all equal sides",
      "why": "Square is a special type of rectangle"
    }
  ]
);

add(
  "math",
  "geometry",
  "Circles",

  `<h2>⭕ Circles</h2>
<p>A circle is a closed shape where all points are equally distant from a fixed point called the center.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li><b>Center:</b> Fixed middle point of a circle</li>
<li><b>Radius:</b> Distance from center to edge of circle</li>
<li><b>Diameter:</b> Distance across the circle passing through the center</li>
<li><b>Key rule:</b> Diameter = 2 × Radius</li>
<li><b>Circumference:</b> Distance around the circle</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Radius = half of diameter  
Diameter = twice the radius
</pre>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Diameter = 10 cm<br>
Step 1: Radius = 10 ÷ 2<br>
Step 2: = 5 cm<br>
<b>Answer: 5 cm</b>
</li>
<li>
<b>Example 2:</b> Radius = 7 cm<br>
Step 1: Diameter = 2 × 7<br>
Step 2: = 14 cm<br>
<b>Answer: 14 cm</b>
</li>
<li>
<b>Example 3:</b> What is circumference?<br>
Step 1: Identify boundary of circle<br>
Step 2: Understand it is the outer distance<br>
<b>Answer: Distance around the circle</b>
</li>
</ul>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Bicycle wheels → measuring tire size</li>
<li> Clocks → circular motion of hands</li>
<li> Machines → gears and rotating parts</li>
<li> Stadiums → circular tracks</li>
<li> Food → pizza and circular cutting designs</li>
</ul>
`,

  [
    {
      "q": "Diameter 14 cm, find radius",
      "hint": "Divide by 2",
      "steps": [
        "Step 1: Identify formula radius = diameter ÷ 2",
        "Step 2: 14 ÷ 2",
        "Step 3: = 7 cm"
      ],
      "ans": "7 cm",
      "why": "Radius is always half the diameter"
    },
    {
      "q": "Radius 9 cm, find diameter",
      "hint": "Multiply by 2",
      "steps": [
        "Step 1: Use formula diameter = 2 × radius",
        "Step 2: 2 × 9",
        "Step 3: = 18 cm"
      ],
      "ans": "18 cm",
      "why": "Diameter is twice the radius"
    },
    {
      "q": "What is a circle?",
      "hint": "distance from center",
      "steps": [
        "Step 1: Identify center point",
        "Step 2: All points equal distance",
        "Step 3: Define shape"
      ],
      "ans": "A shape where all points are equidistant from the center",
      "why": "This equal distance defines a perfect circular shape"
    },
    {
      "q": "What is circumference?",
      "hint": "outer edge",
      "steps": [
        "Step 1: Look at boundary",
        "Step 2: Measure full distance around circle",
        "Step 3: Define term"
      ],
      "ans": "Distance around a circle",
      "why": "It measures the perimeter of a circle"
    }
  ]
);

add(
  "math",
  "geometry",
  "Area and Perimeter",

  `<h2> Area & Perimeter</h2>
<p>These are basic measurements used to describe the size and boundary of shapes.</p>
<h3> NOTES (EXPLAINED)</h3>
<ul>
<li><b>Perimeter:</b> Total distance around a shape (sum of all sides)</li>
<li><b>Area:</b> Total space inside a shape</li>
<li><b>Rectangle:</b> Area = length × width</li>
<li><b>Square:</b> Perimeter = 4 × side</li>
<li><b>Triangle:</b> Area = ½ × base × height</li>
</ul>
<h3> KEY IDEA</h3>
<pre>
Perimeter → boundary length (outside)
Area → surface coverage (inside)
</pre>
<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Rectangle 5 × 3<br>
Step 1: Multiply length and width → 5 × 3<br>
Step 2: = 15<br>
<b>Answer: 15 square units</b>
</li>
<li>
<b>Example 2:</b> Square side 4<br>
Step 1: Area = 4 × 4<br>
Step 2: = 16<br>
<b>Answer: 16 square units</b>
</li>
<li>
<b>Example 3:</b> Triangle base 6 height 4<br>
Step 1: Apply formula → ½ × 6 × 4<br>
Step 2: = 12<br>
<b>Answer: 12 square units</b>
</li>
</ul>
<h3> VISUAL IDEA</h3>
<pre>
Perimeter: outline of shape
Area: filled region inside shape
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Construction → measuring floor and wall space</li>
<li> Agriculture → calculating land area for farming</li>
<li> Engineering → material estimation</li>
<li> Design → layout planning</li>
<li> School planning → classroom space allocation</li>
</ul>
`,

  [
    {
      "q": "Area of rectangle 8 × 2",
      "hint": "Multiply length and width",
      "steps": [
        "Step 1: Multiply 8 × 2",
        "Step 2: Compute result = 16"
      ],
      "ans": "16",
      "why": "Area of rectangle is length × width"
    },
    {
      "q": "What is perimeter of a square with side 5?",
      "hint": "4 × side",
      "steps": [
        "Step 1: Use formula 4 × side",
        "Step 2: 4 × 5 = 20"
      ],
      "ans": "20",
      "why": "Perimeter adds all four equal sides"
    },
    {
      "q": "Find area of triangle with base 10 and height 6",
      "hint": "½ × b × h",
      "steps": [
        "Step 1: Multiply 10 × 6 = 60",
        "Step 2: Divide by 2",
        "Step 3: = 30"
      ],
      "ans": "30",
      "why": "Triangle area is half of rectangle"
    },
    {
      "q": "What is the difference between area and perimeter?",
      "hint": "inside vs outside",
      "steps": [
        "Step 1: Define area",
        "Step 2: Define perimeter",
        "Step 3: Compare meanings"
      ],
      "ans": "Area is inside space, perimeter is outside boundary",
      "why": "They measure different properties of shapes"
    }
  ]
);

add(
  "math",
  "non_euclidean_geometry",
  "Introduction to Non-Euclidean Geometry",

  `
<h2> Non-Euclidean Geometry</h2>
<h3> DEEP NOTES</h3>
<p>
Non-Euclidean geometry means a type of geometry where the normal rule about parallel lines does not work the same way anymore.
In normal (flat) geometry, if two lines are parallel, they stay the same distance apart forever and never meet.
But in Non-Euclidean geometry, space can be curved (like a ball or a saddle), so the rules change.
Because of this curvature, lines that seem parallel can actually meet or spread apart differently than in flat space.
</p>
<h3> KEY IDEA</h3>
<pre>
Flat space → Euclidean geometry (normal rules apply)
Curved space → Non-Euclidean geometry (rules change)
</pre>
<h3> TYPES OF NON-EUCLIDEAN GEOMETRY</h3>
<ul>
<li> Spherical Geometry → positive curvature (like Earth)</li>
<li> Hyperbolic Geometry → negative curvature (saddle-shaped space)</li>
</ul>
<h3> CORE INSIGHT</h3>
<ul>
<li>Parallel lines behave differently depending on curvature</li>
<li>Triangle angle sums vary from 180°</li>
<li>Shortest paths are curved (geodesics)</li>
<li>Space itself can bend and distort</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Why do airplane routes appear curved on flat maps?</p>
<p><b>Step 1:</b> Recognize Earth is spherical, not flat</p>
<p><b>Step 2:</b> Identify shortest path as a great circle route</p>
<p><b>Step 3:</b> Understand map projection distortion</p>
<p><b>Step 4:</b> Compare real vs flat representation</p>
<p><b>Final Answer:</b> Because Earth is curved, straight shortest paths appear curved on flat maps</p>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> GPS navigation → correcting Earth curvature distortions</li>
<li> Aviation → optimizing flight routes using great circles</li>
<li> Astrophysics → modeling curved spacetime</li>
<li> Space travel → trajectory planning in gravitational fields</li>
<li> Cartography → map projection systems</li>
</ul>
`,

  [
    {
      "q": "What is non-Euclidean geometry?",
      "hint": "flat vs curved space",
      "steps": [
        "Step 1: Identify Euclidean rules",
        "Step 2: Observe failure of parallel postulate",
        "Step 3: Define curved space geometry"
      ],
      "ans": "Geometry that studies curved spaces where Euclid’s rules do not apply",
      "why": "It describes real-world curved surfaces like Earth and spacetime"
    },
    {
      "q": "What causes geometry to become non-Euclidean?",
      "hint": "curvature",
      "steps": [
        "Step 1: Identify flat surface assumption",
        "Step 2: Introduce curvature",
        "Step 3: Observe rule changes"
      ],
      "ans": "Curved space",
      "why": "Curvature changes how lines and angles behave"
    },
    {
      "q": "Why do great circle routes look curved on maps?",
      "hint": "projection",
      "steps": [
        "Step 1: Identify spherical Earth",
        "Step 2: Find shortest path on sphere",
        "Step 3: Compare with flat map"
      ],
      "ans": "Because map projections distort curved Earth geometry",
      "why": "Flat maps cannot represent spherical geometry perfectly"
    },
    {
      "q": "What are the two main types of non-Euclidean geometry?",
      "hint": "positive and negative curvature",
      "steps": [
        "Step 1: Identify spherical geometry",
        "Step 2: Identify hyperbolic geometry",
        "Step 3: Compare curvature types"
      ],
      "ans": "Spherical and hyperbolic geometry",
      "why": "They represent positive and negative curvature respectively"
    },
    {
      "q": "Give one real-life application of non-Euclidean geometry",
      "hint": "navigation",
      "steps": [
        "Step 1: Identify global system",
        "Step 2: Apply curved space model",
        "Step 3: Optimize path or calculation"
      ],
      "ans": "GPS and airplane navigation systems",
      "why": "They rely on curved Earth geometry for accuracy"
    }
  ]
);

add(
  "math",
  "non_euclidean_geometry",
  "Spherical Geometry",

  `
<h2> Spherical Geometry</h2>
<h3> DEEP NOTES</h3>
<p>
Spherical geometry is the type of geometry you get when you draw shapes on a round surface, like a ball or the Earth.
On a flat page, a straight line is just a straight line. But on a sphere, the closest thing to a straight line is a curved path called a great circle (like the path planes follow around the Earth).
Because the surface is curved, triangles behave differently here. If you draw a triangle on a sphere, its angles add up to more than 180°, unlike flat geometry where they always add up to exactly 180°.
</p>
<p>
On a sphere, the closest thing to a straight line is a <b>great circle</b>.
A great circle is any circle whose center is the center of the sphere.
It represents the <b>shortest path between two points</b>.
</p>
<p>In flat geometry, triangles always follow:<br><b>Angle sum = 180°</b></p>
<p>But on a sphere:<br><b>Angle sum &gt; 180°</b></p>
<p>This extra amount is called <b>spherical excess (E)</b>.</p>
<p><b>Formula:</b><br>E = (A + B + C) − 180°</p>
<hr>
<h3> AREA OF A SPHERICAL TRIANGLE</h3>
<p>
One of the most important ideas is that area depends on curvature.
Unlike flat geometry, where area depends only on base and height, here area depends on angles.
</p>
<p><b>Main formula:</b><br>Area = E × R²</p>
<p>Where:<br>E = spherical excess (in radians for advanced use)<br>R = radius of the sphere<br>Area = surface area of the spherical triangle</p>
<p> Simple idea: bigger angle “excess” means bigger triangle area on the sphere.</p>
<p><b>Important note (simplified):</b><br>If E is in degrees, you must convert it to radians before using advanced calculations.</p>
<p><b>Conversion:</b><br>1° = π / 180 radians</p>
<hr>
<h3> KEY IDEAS</h3>
<ul>
<li>Space is curved outward (positive curvature)</li>
<li>Great circles act as straight lines</li>
<li>Triangles have angle sum > 180°</li>
<li>Spherical excess measures curvature effect</li>
<li>Area depends on angles, not just side lengths</li>
</ul>
<hr>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> A spherical triangle has angles 100°, 80°, and 70°. Find spherical excess.</p>
<p><b>Step 1: Add angles</b><br>100° + 80° + 70° = 250°</p>
<p><b>Step 2: Find spherical excess</b><br>E = 250° − 180° = 70°</p>
<p><b>Step 3: Find area (simplified form)</b><br>Area = E × R²</p>
<p><b>Final Answer:</b><br>Spherical excess = 70°<br>Area = 70° × R² (concept form)</p>
<hr>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> GPS navigation → shortest routes using great circles</li>
<li> Aviation → planning long-distance flight paths</li>
<li> Satellite communication → orbital path calculations</li>
<li> Cartography → map projection systems</li>
<li> Astronomy → modeling planetary motion</li>
</ul>
`,

  [
    {
      "q": "Find spherical excess of a triangle with angles 100°, 80°, and 70°",
      "hint": "E = sum of angles − 180°",
      "steps": [
        "Step 1: Add angles 100° + 80° + 70°",
        "Step 2: Subtract 180°",
        "Step 3: Interpret result as spherical excess"
      ],
      "ans": "70°",
      "why": "Spherical excess measures how much the triangle exceeds flat geometry"
    },
    {
      "q": "Find the area of a spherical triangle with spherical excess 70° on a sphere of radius R",
      "hint": "Area = E × R²",
      "steps": [
        "Step 1: Identify spherical excess E = 70°",
        "Step 2: Convert concept into formula Area = E × R²",
        "Step 3: Substitute values to get final expression"
      ],
      "ans": "70° × R² (or in radians form for exact calculation)",
      "why": "Area on a sphere depends on curvature, not just side lengths"
    },
    {
      "q": "Convert spherical excess 70° into radians",
      "hint": "1° = π/180",
      "steps": [
        "Step 1: Use conversion formula E × (π/180)",
        "Step 2: Substitute 70°",
        "Step 3: Simplify fraction"
      ],
      "ans": "(70π/180) = (7π/18) radians",
      "why": "Radians are required for precise spherical area calculations"
    },
    {
      "q": "Find area of a spherical triangle with excess (7π/18) on a sphere of radius 10",
      "hint": "Area = E × R²",
      "steps": [
        "Step 1: Identify E = 7π/18",
        "Step 2: Identify R = 10",
        "Step 3: Apply Area = E × R² = (7π/18) × 100"
      ],
      "ans": "(700π/18) = (350π/9) square units",
      "why": "This shows direct link between curvature and surface area"
    }
  ]
);

add(
  "math",
  "non_euclidean_geometry",
  "Hyperbolic Geometry",

  `
<h2> Hyperbolic Geometry</h2>
<h3> DEEP NOTES</h3>
<p>
Hyperbolic geometry is a type of geometry that happens on a surface that is curved like a saddle.
In this kind of space, the usual rules from flat geometry do not work the same way, especially the rule about parallel lines.
In flat geometry, only one line can pass through a point and stay parallel to another line. But in hyperbolic geometry, many different lines can pass through the same point and still never meet the original line.
This happens because the space is not flat—it bends outward in a way that makes room for more lines to spread apart.
</p>
<h3> KEY FACTS</h3>
<ul>
<li>Space is negatively curved (saddle-shaped)</li>
<li>Triangle angles always sum to less than 180°</li>
<li>Infinite parallel lines can pass through one point</li>
<li>Lines diverge as they extend</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> A hyperbolic triangle has angles 40°, 50°, and 60°. Find the sum and interpret it.</p>
<p><b>Step 1: Add angles</b></p>
<p>40° + 50° + 60° = 150°</p>
<p><b>Step 2: Compare with Euclidean geometry</b></p>
<p>180° − 150° = 30° deficit</p>
<p><b>Step 3: Interpret result</b></p>
<p>The missing angle represents curvature of space</p>
<p><b>Final Answer:</b> 150°, confirming hyperbolic geometry</p>
<h3> KEY FACTS (SIMPLIFIED UNDERSTANDING)</h3>
<ul>
<li>Space is not flat — it curves inward like a saddle (negative curvature)</li>
<li>This bending changes how shapes behave compared to flat geometry</li>
<li>In triangles, the total of all angles becomes smaller than 180°</li>
<li>The “missing part” from 180° is called the angular deficit</li>
<li>Instead of staying evenly spaced, lines that start parallel slowly move away from each other</li>
<li>This happens because space itself is spreading differently in different directions</li>
<li>So, geometry depends on the shape of space, not just the lines drawn in it</li>
</ul>
<h3> CORE IDEA (WHAT THE FORMULA MEANS)</h3>
<p><b>Angular Deficit (D):</b><br>D = 180° − (A + B + C)</p>
<p>This formula is just a way of measuring how “non-flat” a triangle is.</p>
<p>If a triangle was drawn on flat ground, the result would be exactly 0° deficit.</p>
<p>But in hyperbolic space, the result is always greater than 0°, meaning something is “missing” compared to flat geometry.</p>
<p> The bigger the deficit, the stronger the curvature of space.</p>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> A hyperbolic triangle has angles 40°, 50°, and 60°. Find what is happening.</p>
<p><b>Step 1: Add angles</b><br>
40° + 50° + 60° = 150°
</p>
<p><b>Step 2: Compare with flat space</b><br>
Flat space should give 180°, but we only got 150°.
</p>
<p><b>Step 3: Find angular deficit</b><br>
D = 180° − 150° = 30°
</p>
<p><b>Step 4: Meaning (simple explanation)</b><br>
That missing 30° is not a mistake — it shows that space itself is curved inward.
The triangle “loses angle” because the surface bends away like a saddle.
</p>
<p><b>Final Answer:</b><br>
Angle sum = 150°<br>
Angular deficit = 30°<br>
Meaning: space is negatively curved
</p>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Cosmology → modeling large-scale structure of the universe</li>
<li> Network science → efficient routing in complex networks</li>
<li> Data systems → hierarchical data structures</li>
<li> Biology → modeling branching systems (blood vessels, neurons)</li>
<li> Theoretical physics → spacetime curvature studies</li>
</ul>
`,

  [
    {
      "q": "Find the angular deficit of a hyperbolic triangle with angles 40°, 50°, and 60°",
      "hint": "D = 180° − (A + B + C)",
      "steps": [
        "Step 1: Add angles 40° + 50° + 60°",
        "Step 2: Subtract the sum from 180°",
        "Step 3: Identify angular deficit"
      ],
      "ans": "30°",
      "why": "Angular deficit measures deviation from flat geometry"
    },
    {
      "q": "Find the sum of angles of a hyperbolic triangle if angular deficit is 25°",
      "hint": "A + B + C = 180° − D",
      "steps": [
        "Step 1: Use formula A + B + C = 180° − D",
        "Step 2: Substitute D = 25°",
        "Step 3: Compute result"
      ],
      "ans": "155°",
      "why": "Hyperbolic triangles always have reduced angle sums"
    },
    {
      "q": "Find angular deficit if a triangle has angles 35°, 45°, and 55°",
      "hint": "D = 180° − sum of angles",
      "steps": [
        "Step 1: Add 35° + 45° + 55°",
        "Step 2: Subtract result from 180°",
        "Step 3: Finalize deficit"
      ],
      "ans": "45°",
      "why": "Difference shows strength of negative curvature"
    },
    {
      "q": "If angular deficit is 60°, find the sum of angles of the triangle",
      "hint": "Sum = 180° − D",
      "steps": [
        "Step 1: Identify formula A + B + C = 180° − D",
        "Step 2: Substitute D = 60°",
        "Step 3: Compute total angle sum"
      ],
      "ans": "120°",
      "why": "Large deficit indicates strong hyperbolic curvature"
    },
    {
      "q": "A hyperbolic triangle has angles 20°, 60°, and x°. If angular deficit is 40°, find x",
      "hint": "D = 180° − (A + B + C)",
      "steps": [
        "Step 1: Write equation 40° = 180° − (20° + 60° + x)",
        "Step 2: Simplify equation",
        "Step 3: Solve for x"
      ],
      "ans": "60°",
      "why": "Unknown angle found using deficit equation"
    }
  ]
);

add(
  "math",
  "non_euclidean_geometry",
  "Geometry in Relativity",

  `
<h2> Geometry in Relativity</h2>
<h3> DEEP NOTES</h3>
<p>
Einstein’s General Relativity explains gravity in a completely different way from Newton’s idea of a “pulling force.”
Instead of thinking of gravity as an invisible force between objects, it describes gravity as the bending (curving) of spacetime itself.
</p>
<p>Spacetime is a combined structure of space (where things are) and time (when things happen).When a massive object like a planet or star is present, it “warps” this spacetime, similar to how a heavy ball bends a stretched rubber sheet.</p>
<p>Because spacetime is curved, objects do not move in perfectly straight lines anymore.Instead, they follow the curved paths of spacetime geometry. These paths are called <b>geodesics</b>, which are the closest thing to straight motion in curved space.</p>
<p>Even light is affected by this curvature. It does not “choose” to bend — it simply follows the curved structure of spacetime around massive objects.</p>
<h3> KEY IDEAS</h3>
<ul>
<li>Mass bends spacetime</li>
<li>Objects move along curved paths called geodesics</li>
<li>Light is affected by spacetime curvature</li>
<li>Gravity is geometry, not a traditional force</li>
</ul>
<h3> WORKED EXAMPLE (FULL CALCULATION — GENERAL RELATIVITY)</h3>
<p><b>Question:</b> Why does light bend near a massive object, and how much does it bend near the Sun?</p>
<hr>
<h3> STEP 1: Einstein’s Gravity Concept (Spacetime Curvature)</h3>
<p><b>Equation:</b></p>
<p>G = (8πG/c⁴) · T</p>
<p><b>Substitute constants (simplified idea check):</b></p>
<p>
G ≈ 6.67 × 10⁻¹¹<br>
c ≈ 3 × 10⁸
</p>
<p>(8πG/c⁴) ≈ (8 × 3.14 × 6.67×10⁻¹¹) / (81×10³²)</p>
<p>
Numerator ≈ 1.68 × 10⁻⁹<br>
Denominator ≈ 8.1 × 10³³
</p>
<p>Result ≈ 2.07 × 10⁻⁴³</p>
<p><b>Meaning:</b> Even small mass creates measurable spacetime curvature, but effect is tiny unless mass is huge.</p>
<hr>
<h3> STEP 2: Light Deflection Formula</h3>
<p><b>Formula:</b></p>
<p>θ = (4GM) / (c²b)</p>
<p><b>Substitute values (Sun case):</b></p>
<p>
G = 6.67 × 10⁻¹¹<br>
M = 2 × 10³⁰ kg<br>
c = 3 × 10⁸<br>
b = 7 × 10⁸ m
</p>
<p><b>Step-by-step calculation:</b></p>
<p>
Numerator:<br>
4 × 6.67×10⁻¹¹ × 2×10³⁰ = 5.336 × 10²⁰
</p>
<p>
Denominator:<br>
(3×10⁸)² × 7×10⁸<br>
= 9×10¹⁶ × 7×10⁸<br>
= 6.3 × 10²⁵
</p>
<p>θ = 5.336 × 10²⁰ / 6.3 × 10²⁵</p>
<p>θ ≈ 8.47 × 10⁻⁶ radian</p>
<p><b>Convert to arcseconds:</b></p>
<p>1 rad = 206265 arcseconds</p>
<p>θ = 8.47 × 10⁻⁶ × 206265</p>
<p>θ ≈ 1.75 arcseconds</p>
<p><b>Final Answer:</b> Light bends by ≈ 1.75 arcseconds near the Sun</p>
<hr>
<h3> STEP 3: BLACK HOLE LIMIT (EVENT HORIZON)</h3>
<p><b>Formula:</b></p>
<p>rₛ = (2GM) / c²</p>
<p><b>Example: Black hole of mass 10× Sun</b></p>
<p>M = 2 × 10³¹ kg</p>
<p><b>Substitute:</b></p>
<p>rₛ = (2 × 6.67×10⁻¹¹ × 2×10³¹) / (9×10¹⁶)</p>
<p>Numerator = 2.668 × 10²¹</p>
<p>Denominator = 9 × 10¹⁶</p>
<p>rₛ ≈ 2.96 × 10⁴ m</p>
<p><b>Final Answer:</b> Schwarzschild radius ≈ 29.6 km</p>
<hr>
<h3> FINAL INTERPRETATION</h3>
<p>Light bends because spacetime geometry changes near mass.</p>
<p>Near normal stars → small curvature (tiny bending)<br>Near black holes → extreme curvature (light trapped)</p>
<hr>
<h3> REAL CONFIRMED EFFECTS</h3>
<ul>
<li> 1.75 arcsecond bending confirmed in 1919 eclipse</li>
<li> Gravitational lensing magnifies distant galaxies</li>
<li> Event horizon confirmed by EHT black hole imaging</li>
<li> GPS must correct time dilation using relativity equations</li>
</ul>

`,

  [
    {
      "q": "Calculate spacetime curvature strength factor near Earth using simplified ratio (Gm/r²)",
      "hint": "gravity field strength",
      "steps": [
        "Step 1: Use formula g = GM / r²",
        "Step 2: Substitute G = 6.67×10⁻¹¹, M = 6×10²⁴, r = 6.4×10⁶",
        "Step 3: Compute numerator and denominator",
        "Step 4: Find final gravitational field strength"
      ],
      "ans": "≈ 9.8 m/s²",
      "why": "This value represents how strongly spacetime is curved near Earth"
    },
    {
      "q": "Calculate light bending angle near the Sun using θ = (4GM)/(c²b)",
      "hint": "gravitational deflection",
      "steps": [
        "Step 1: Write formula θ = (4GM)/(c²b)",
        "Step 2: Substitute G = 6.67×10⁻¹¹, M = 2×10³⁰",
        "Step 3: Use c = 3×10⁸ and b = 7×10⁸",
        "Step 4: Solve numerator and denominator",
        "Step 5: Convert radians to arcseconds"
      ],
      "ans": "≈ 1.75 arcseconds",
      "why": "Light bends due to spacetime curvature near massive objects"
    },
    {
      "q": "Calculate Schwarzschild radius for a black hole of mass 2×10³¹ kg using rₛ = (2GM)/c²",
      "hint": "event horizon",
      "steps": [
        "Step 1: Write formula rₛ = (2GM)/c²",
        "Step 2: Substitute G = 6.67×10⁻¹¹, M = 2×10³¹",
        "Step 3: Use c = 3×10⁸",
        "Step 4: Compute numerator and denominator",
        "Step 5: Finalize radius in meters"
      ],
      "ans": "≈ 2.96 × 10⁴ m (29.6 km)",
      "why": "Inside this radius, spacetime curvature prevents light escape"
    },
    {
      "q": "Calculate orbital time dilation effect using simplified factor √(1 - 2GM/rc²)",
      "hint": "time slows near mass",
      "steps": [
        "Step 1: Write formula √(1 - 2GM/rc²)",
        "Step 2: Substitute G, M (Earth), r ≈ 6.4×10⁶, c",
        "Step 3: Compute fraction 2GM/rc²",
        "Step 4: Evaluate square root approximation"
      ],
      "ans": "≈ 1 - 6.9×10⁻¹⁰ (very small time slowdown)",
      "why": "Time runs slightly slower closer to Earth due to spacetime curvature"
    },
    {
      "q": "Calculate geodesic meaning distance difference: straight line vs curved space approximation",
      "hint": "shortest path in curved space",
      "steps": [
        "Step 1: Define straight Euclidean distance d",
        "Step 2: Compare with curved path (geodesic) D",
        "Step 3: Use approximation D ≈ d + curvature correction",
        "Step 4: Identify that geodesic is always shortest path"
      ],
      "ans": "Geodesic distance ≤ Euclidean distance",
      "why": "Curved spacetime changes what 'straight line' means"
    }
  ]
);

add(
  "math",
  "non_euclidean_geometry",
  "Applications of Non-Euclidean Geometry",

  `
<h2> Applications of Non-Euclidean Geometry</h2>
<h3> DEEP NOTES (RELATIVITY + CURVED SPACE)</h3>

<p>
Non-Euclidean geometry describes spaces where the rules of flat (Euclidean) geometry no longer work because the space itself is curved.
This is the mathematical foundation behind Einstein’s view of gravity and modern cosmology.
</p>

<p>
In simple terms, space is not a fixed flat stage. It behaves like a flexible structure that bends when mass and energy are present.
This bending changes how objects move, how light travels, and even how time flows.
</p>
<hr>
<h3> KEY IDEAS (WITH MATHEMATICAL INTUITION)</h3>
<ul>
<li>Flat space: straight-line rule applies → Euclidean distance works normally</li>
<li>Curved space: shortest path becomes a geodesic (curved “straight line”)</li>
<li>Gravity is modeled by curvature: g ≈ GM/r²</li>
<li>Time changes with gravity: Δt′ = Δt √(1 − 2GM/rc²)</li>
<li>Light and objects follow curved spacetime paths, not straight lines</li>
</ul>
<hr>
<h3> EXPANDED EXAMPLES (REAL SYSTEMS WITH RELATIVITY EFFECTS)</h3>
<ul>
<li>
 <b>GPS satellites</b><br>
Time correction uses relativistic formula:
<br>
Δt′ = Δt √(1 − 2GM/rc²)
<br>
Without correction → error grows ≈ 10 km per day
</li>
<li>
 <b>Universe structure</b><br>
Curvature determines large-scale shape:
<br>
Positive (sphere), zero (flat), negative (saddle)
</li>
<li>
 <b>Black holes</b><br>
Event horizon:
<br>
rₛ = 2GM/c²
<br>
Inside this radius → escape velocity = speed of light
</li>
<li>
 <b>Space navigation</b><br>
Trajectories follow geodesics:
<br>
Not straight lines but curved energy-minimizing paths
</li>
<li>
 <b>Satellite communication</b><br>
Signal timing uses:
<br>
t_corrected = t_observed + relativistic correction
</li>
<li>
 <b>Earth measurement (Geodesy)</b><br>
Earth surface distance uses curved geometry:
<br>
d ≠ straight line → must follow spherical geodesic
</li>
</ul>
<hr>
<h3> WORKED EXAMPLE (GPS TIME DILATION — FULL CALCULATION)</h3>
<p><b>Question:</b> Why do GPS satellites need relativistic time correction?</p>
<hr>
<p><b>STEP 1: Use gravitational time dilation formula</b></p>
<p>
Δt′ = Δt √(1 − 2GM/rc²)
</p>
<hr>
<p><b>STEP 2: Substitute Earth values (simplified)</b></p>
<p>
G = 6.67×10⁻¹¹<br>
M = 6×10²⁴ kg<br>
r ≈ 6.4×10⁶ m<br>
c = 3×10⁸
</p>
<p>
Compute fraction:
<br>
2GM/rc²
</p>
<p>
Numerator:
2 × 6.67×10⁻¹¹ × 6×10²⁴ = 8.004×10¹⁴
</p>
<p>
Denominator:
6.4×10⁶ × (9×10¹⁶) = 5.76×10²³</p>
<p>Fraction ≈ 1.39×10⁻⁹</p>
<hr>
<p><b>STEP 3: Apply square root approximation</b></p>
<p>√(1 − 1.39×10⁻⁹) ≈ 1 − 6.95×10⁻¹⁰</p>
<hr>
<p><b>STEP 4: Interpretation</b></p>
<p>
Satellite clocks run slightly faster because gravity is weaker in orbit.
Even a tiny difference accumulates into large GPS errors if not corrected.
</p>
<p><b>Final Result:</b> Time difference ≈ 7×10⁻¹⁰ per second effect</p>
<hr>
<h3> DIAGRAM (INTUITION)</h3>
<pre>
FLAT MODEL (WRONG):
Earth ---- satellite ---- signal (assumed straight time flow)

CURVED SPACE (CORRECT):
Earth curves spacetime
     ↓
satellite moves through different time rate
     ↓
signal timing must be corrected
</pre>
<hr>
<h3> REAL WORLD APPLICATION (WHY THIS MATTERS)</h3>
<ul>
<li> GPS systems → correct relativistic time errors</li>
<li> Space missions → accurate trajectory prediction</li>
<li> Black hole physics → extreme spacetime curvature</li>
<li> Communication systems → synchronization of signals</li>
<li> Earth science → precise global positioning and mapping</li>
</ul>
`,

  [
    {
      "q": "What is non-Euclidean geometry?",
      "hint": "curved space",
      "steps": [
        "Step 1: Identify flat geometry limitations",
        "Step 2: Recognize curved space concept",
        "Step 3: Define new geometry rules"
      ],
      "ans": "A type of geometry that describes curved space instead of flat surfaces",
      "why": "It explains real-world space better than Euclidean geometry"
    },
    {
      "q": "Why is Euclidean geometry not enough for space science?",
      "hint": "real universe",
      "steps": [
        "Step 1: Compare flat vs curved space",
        "Step 2: Observe gravity effects",
        "Step 3: Apply to universe structure"
      ],
      "ans": "Because space is curved by gravity",
      "why": "The universe does not follow flat geometry rules"
    },
    {
      "q": "How does GPS use non-Euclidean geometry?",
      "hint": "satellite time",
      "steps": [
        "Step 1: Satellites orbit Earth",
        "Step 2: Time changes due to gravity",
        "Step 3: Apply corrections"
      ],
      "ans": "It corrects time differences caused by relativity",
      "why": "Without correction, location data would be inaccurate"
    },
    {
      "q": "What causes spacetime curvature?",
      "hint": "gravity",
      "steps": [
        "Step 1: Identify massive objects",
        "Step 2: Observe gravitational effects",
        "Step 3: Understand space distortion"
      ],
      "ans": "Mass and gravity",
      "why": "Massive objects bend spacetime according to relativity"
    },
    {
      "q": "Give one real-life application of curved geometry",
      "hint": "navigation",
      "steps": [
        "Step 1: Identify technology system",
        "Step 2: Apply space correction",
        "Step 3: Ensure accuracy"
      ],
      "ans": "GPS navigation systems",
      "why": "They require curved space corrections for accuracy"
    }
  ]
);

add(
  "math",
  "optimization",
  "Introduction to Optimization",

  `
<h2> Optimization Problems</h2>
<h3> DEEP NOTES</h3>
<p>
Optimization is the mathematical process of finding the best possible value (maximum or minimum) of a function under given constraints.
It is widely used in economics, engineering, and decision-making systems.
</p>
<pre>
Optimization form:
Maximize or Minimize f(x)
Subject to constraints (conditions)
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>Maximum → highest possible value of a function</li>
<li>Minimum → lowest possible value of a function</li>
<li>Constraints → restrictions that limit possible solutions</li>
<li>Feasible solution → any solution that satisfies constraints</li>
</ul>
<h3> WORKED EXAMPLE (STEP BY STEP)</h3>
<p><b>Question:</b> A rectangle has a perimeter of 20 units. Find its maximum area.</p>
<p><b>Step 1: Define variables</b></p>
<p>Let length = x, width = y</p>
<p><b>Step 2: Write perimeter equation</b></p>
<p>2x + 2y = 20 → x + y = 10</p>
<p><b>Step 3: Express y in terms of x</b></p>
<p>y = 10 − x</p>
<p><b>Step 4: Write area function</b></p>
<p>A = x × y = x(10 − x)</p>
<p><b>Step 5: Expand</b></p>
<p>A = 10x − x²</p>
<p><b>Step 6: Identify maximum point</b></p>
<p>This is a quadratic function (parabola) → maximum at vertex</p>
<p><b>Step 7: Find optimal values</b></p>
<p>x = 5, y = 5</p>
<p><b>Final Answer:</b> Maximum area = 25 square units</p>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Business → maximizing profit and reducing losses</li>
<li> Engineering → designing strong structures with less material</li>
<li> Packaging → maximizing volume with limited material</li>
<li> Agriculture → optimizing land usage</li>
<li> Urban planning → efficient land division</li>
</ul>

`,

  [
    {
      "q": "Find the maximum value of the function A(x) = 10x − x²",
      "hint": "vertex of parabola",
      "steps": [
        "Step 1: Identify function A(x) = 10x − x²",
        "Step 2: Rewrite as A(x) = −x² + 10x",
        "Step 3: Use vertex formula x = −b/(2a)",
        "Step 4: Substitute a = −1, b = 10",
        "Step 5: Find x = −10 / (2 × −1) = 5",
        "Step 6: Substitute x = 5 into function"
      ],
      "ans": "A(5) = 25",
      "why": "The vertex of a downward parabola gives the maximum value"
    },
    {
      "q": "Find the maximum area of a rectangle with perimeter 20 units",
      "hint": "use perimeter constraint",
      "steps": [
        "Step 1: Write perimeter formula 2(L + W) = 20",
        "Step 2: Simplify to L + W = 10",
        "Step 3: Express W = 10 − L",
        "Step 4: Write area A = L(10 − L)",
        "Step 5: Expand A = 10L − L²",
        "Step 6: Find vertex at L = 5",
        "Step 7: Compute area = 5 × 5"
      ],
      "ans": "25 square units",
      "why": "A square gives maximum area for a fixed perimeter"
    },
    {
      "q": "Find minimum value of cost function C(x) = x² + 4x + 7",
      "hint": "complete square or vertex",
      "steps": [
        "Step 1: Identify a = 1, b = 4",
        "Step 2: Use x = −b/(2a)",
        "Step 3: Compute x = −4/2 = −2",
        "Step 4: Substitute x = −2 into function",
        "Step 5: Calculate C(−2) = 4 − 8 + 7"
      ],
      "ans": "3",
      "why": "Vertex of parabola gives minimum value when a > 0"
    },
    {
      "q": "Find optimal dimensions of rectangle with fixed area maximization under constraint L + W = 12",
      "hint": "maximize product",
      "steps": [
        "Step 1: Express W = 12 − L",
        "Step 2: Write area A = L(12 − L)",
        "Step 3: Expand A = 12L − L²",
        "Step 4: Find vertex at L = 6",
        "Step 5: Compute W = 6",
        "Step 6: Compute area = 6 × 6"
      ],
      "ans": "Maximum area = 36 at L = W = 6",
      "why": "Equal distribution of constraints maximizes product"
    },
    {
      "q": "Find maximum profit P(x) = 50x − 2x²",
      "hint": "vertex method",
      "steps": [
        "Step 1: Identify a = −2, b = 50",
        "Step 2: Use x = −b/(2a)",
        "Step 3: Compute x = −50/(−4) = 12.5",
        "Step 4: Substitute into function",
        "Step 5: P(12.5) = 50(12.5) − 2(12.5)²"
      ],
      "ans": "312.5",
      "why": "Maximum profit occurs at vertex of parabola"
    }
  ]
);

add(
  "math",
  "optimization",
  "Maximizing Area Problems",

  `
<h2> Maximizing Area</h2>

<h3> DEEP NOTES</h3>
<p>
Maximizing area problems involve finding the largest possible area using a fixed amount of resources such as fencing, borders, or material.
These problems are common in agriculture, architecture, and engineering design.
</p>

<h3> KEY IDEAS</h3>
<ul>
<li>Perimeter gives constraint equation</li>
<li>Area depends on variable dimensions</li>
<li>Maximum area often occurs at balanced dimensions</li>
<li>Square shape usually gives maximum area for fixed perimeter</li>
</ul>

<h3> WORKED EXAMPLE</h3>

<p><b>Question:</b> A farmer has 40m of fencing. Find the maximum rectangular area that can be enclosed.</p>

<p><b>Step 1: Write perimeter equation</b></p>
<p>2x + 2y = 40</p>

<p><b>Step 2: Simplify</b></p>
<p>x + y = 20</p>

<p><b>Step 3: Express y in terms of x</b></p>
<p>y = 20 − x</p>

<p><b>Step 4: Write area function</b></p>
<p>A = x × y = x(20 − x)</p>

<p><b>Step 5: Expand</b></p>
<p>A = 20x − x²</p>

<p><b>Step 6: Find maximum value</b></p>
<p>Maximum occurs at midpoint → x = 10</p>
<p>Then y = 10</p>

<p><b>Final Answer:</b> Maximum area = 100 m²</p>

<h3> DIAGRAM</h3>

<pre>
Best shape = square

  10m × 10m
  ┌────────┐
  │        │
  │        │
  └────────┘
</pre>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Agriculture → maximizing farmland usage</li>
<li> Architecture → designing efficient building layouts</li>
<li> Urban planning → optimal land division</li>
<li> Packaging design → maximizing storage space</li>
<li> School planning → optimal classroom space usage</li>
</ul>
`,

  [
    {
      "q": "Find the maximum area of a rectangle with perimeter 20 units",
      "hint": "use constraint method",
      "steps": [
        "Step 1: Write perimeter equation 2x + 2y = 20",
        "Step 2: Simplify to x + y = 10",
        "Step 3: Express y = 10 − x",
        "Step 4: Write area function A = x(10 − x)",
        "Step 5: Expand A = 10x − x²",
        "Step 6: Find vertex x = −b/(2a)",
        "Step 7: Compute x = 5, y = 5",
        "Step 8: Calculate area = 25"
      ],
      "ans": "25 square units",
      "why": "Quadratic maximum occurs at vertex"
    },
    {
      "q": "Find optimal dimensions of a rectangle when x + y = 12 and maximize area",
      "hint": "product maximization",
      "steps": [
        "Step 1: Express y = 12 − x",
        "Step 2: Write area A = x(12 − x)",
        "Step 3: Expand A = 12x − x²",
        "Step 4: Find vertex x = −b/(2a)",
        "Step 5: Compute x = 6",
        "Step 6: Compute y = 6",
        "Step 7: Compute area = 36"
      ],
      "ans": "36 square units",
      "why": "Equal partition of constraint maximizes product"
    },
    {
      "q": "Given A(x) = 8x − x², find maximum value",
      "hint": "vertex formula",
      "steps": [
        "Step 1: Identify a = −1, b = 8",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 4",
        "Step 4: Evaluate A(4)",
        "Step 5: Compute 8×4 − 16"
      ],
      "ans": "16",
      "why": "Maximum value of quadratic occurs at vertex"
    },
    {
      "q": "Find maximum area when perimeter is 30 units",
      "hint": "A = x(15 − x)",
      "steps": [
        "Step 1: Write 2x + 2y = 30",
        "Step 2: Simplify to x + y = 15",
        "Step 3: Express y = 15 − x",
        "Step 4: Write A = x(15 − x)",
        "Step 5: Expand A = 15x − x²",
        "Step 6: Find x = 7.5",
        "Step 7: Compute area = 7.5 × 7.5"
      ],
      "ans": "56.25 square units",
      "why": "Square gives maximum area under fixed perimeter"
    },
    {
      "q": "Maximize A = 12x − 2x²",
      "hint": "vertex method",
      "steps": [
        "Step 1: Identify a = −2, b = 12",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 3",
        "Step 4: Evaluate A(3)",
        "Step 5: Compute 12×3 − 2×9"
      ],
      "ans": "18",
      "why": "Parabolic function reaches maximum at vertex"
    }
  ]
);

add(
  "math",
  "optimization",
  "Minimization Problems",

  `
<h2> Minimization Problems</h2>
<h3> DEEP NOTES</h3>
<p>
Minimization problems focus on finding the smallest possible value of a quantity such as distance, cost, time, or energy.
In geometry and optimization, the shortest path between two points is always a straight line.
</p>

<h3> KEY IDEAS</h3>
<ul>
<li>Minimization → finding the smallest possible value</li>
<li>Shortest distance → always a straight line</li>
<li>Curved paths → always longer than direct paths</li>
<li>Used in navigation, logistics, and engineering</li>
</ul>

<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Find the shortest distance between two points (conceptual optimization).</p>
<p><b>Step 1: Identify points</b></p>
<p>Two points A(x₁, y₁) and B(x₂, y₂)</p>
<p><b>Step 2: Recognize best path</b></p>
<p>Straight line is always shortest distance</p>
<p><b>Step 3: Apply distance formula</b></p>
<pre>
d = √((x₂ - x₁)² + (y₂ - y₁)²)
</pre>
<p><b>Step 4: Interpret result</b></p>
<p>The calculated distance is the minimum possible path</p>
<p><b>Final Answer:</b> Straight line distance between the two points</p>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> GPS navigation systems → shortest driving route</li>
<li> Delivery services → minimize travel distance and fuel</li>
<li> Internet networks → fastest data routing paths</li>
<li> Aviation → shortest flight paths (great circle routes)</li>
<li> Engineering → minimize material usage in design</li>
</ul>

`,

  [
    {
      "q": "Find the minimum value of f(x) = x² − 6x + 10",
      "hint": "vertex method",
      "steps": [
        "Step 1: Identify a = 1, b = −6",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 3",
        "Step 4: Evaluate f(3)",
        "Step 5: Compute 9 − 18 + 10"
      ],
      "ans": "1",
      "why": "Quadratic minimum occurs at vertex when a > 0"
    },
    {
      "q": "Find shortest distance between points (1,2) and (4,6)",
      "hint": "distance formula",
      "steps": [
        "Step 1: Apply d = √((x₂ − x₁)² + (y₂ − y₁)²)",
        "Step 2: Substitute values (4−1) and (6−2)",
        "Step 3: Compute squares 3² and 4²",
        "Step 4: Add results",
        "Step 5: Take square root"
      ],
      "ans": "5",
      "why": "Distance formula gives direct linear separation"
    },
    {
      "q": "Find minimum path length between points (0,0) and (6,8)",
      "hint": "Pythagorean distance",
      "steps": [
        "Step 1: Use d = √(6² + 8²)",
        "Step 2: Compute 36 + 64",
        "Step 3: Take square root",
        "Step 4: Final simplify"
      ],
      "ans": "10",
      "why": "Straight line is shortest path in Euclidean space"
    },
    {
      "q": "Minimize cost function C(x) = x² + 4x + 9",
      "hint": "vertex formula",
      "steps": [
        "Step 1: Identify a = 1, b = 4",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = −2",
        "Step 4: Evaluate C(−2)",
        "Step 5: Compute 4 − 8 + 9"
      ],
      "ans": "5",
      "why": "Vertex of parabola gives minimum value"
    },
    {
      "q": "Find shortest distance after moving 3 units right and 4 units up",
      "hint": "resultant displacement",
      "steps": [
        "Step 1: Model movement as (3,4)",
        "Step 2: Apply d = √(3² + 4²)",
        "Step 3: Compute squares",
        "Step 4: Add and simplify"
      ],
      "ans": "5",
      "why": "Resultant displacement forms right triangle"
    }
  ]
);

add(
  "math",
  "optimization",
  "Cost Optimization Problems",

  `
<h2> Cost Optimization</h2>
<h3> DEEP NOTES</h3>
<p>
Cost optimization focuses on minimizing production or operational costs while maintaining efficiency and output quality.
It is widely used in business, engineering, and economics.
</p>

<pre>
Cost function: C(x) = ax + b
Where:
a = cost per unit
b = fixed cost
x = number of units
</pre>

<h3> KEY IDEAS</h3>
<ul>
<li>Cost increases as production increases (usually)</li>
<li>Fixed costs remain constant</li>
<li>Variable costs depend on output</li>
<li>Goal is to minimize total cost or balance cost vs output</li>
</ul>

<h3> WORKED EXAMPLE</h3>

<p><b>Question:</b> A company produces items with cost function C(x) = 50x + 200. Find the cost when x = 10.</p>

<p><b>Step 1: Identify function</b></p>
<p>C(x) = 50x + 200</p>

<p><b>Step 2: Substitute x = 10</b></p>
<p>C(10) = 50(10) + 200</p>

<p><b>Step 3: Compute</b></p>
<p>500 + 200 = 700</p>

<p><b>Final Answer:</b> 700</p>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li> Manufacturing industries → reduce production cost</li>
<li> Supply chain management → reduce transport and storage costs</li>
<li> Construction → minimize material and labor expenses</li>
<li> Budget planning → allocate limited financial resources</li>
<li> Logistics → reduce fuel and delivery costs</li>
</ul>

`,

  [
    {
      "q": "Evaluate total cost for C(x) = 50x + 200 when x = 10",
      "hint": "substitution",
      "steps": [
        "Step 1: Write C(x) = 50x + 200",
        "Step 2: Substitute x = 10",
        "Step 3: Compute 50 × 10",
        "Step 4: Add constant term",
        "Step 5: Final calculation"
      ],
      "ans": "700",
      "why": "Direct substitution into cost function"
    },
    {
      "q": "Find cost when production is x = 25 for C(x) = 40x + 300",
      "hint": "linear function",
      "steps": [
        "Step 1: Substitute x = 25 into C(x)",
        "Step 2: Compute 40 × 25",
        "Step 3: Add fixed cost 300",
        "Step 4: Final sum"
      ],
      "ans": "1300",
      "why": "Total cost = variable cost + fixed cost"
    },
    {
      "q": "Find fixed cost in C(x) = 75x + 500",
      "hint": "constant term",
      "steps": [
        "Step 1: Identify constant term in function",
        "Step 2: Separate variable and constant parts",
        "Step 3: Extract fixed component"
      ],
      "ans": "500",
      "why": "Constant term represents cost independent of production"
    },
    {
      "q": "Compute increase in cost when production changes from x = 10 to x = 15 in C(x) = 20x + 100",
      "hint": "difference calculation",
      "steps": [
        "Step 1: Compute C(15)",
        "Step 2: Compute C(10)",
        "Step 3: Subtract values",
        "Step 4: Find cost difference"
      ],
      "ans": "100",
      "why": "Cost increases linearly with production"
    },
    {
      "q": "Find cost per unit increase in C(x) = 60x + 150",
      "hint": "slope interpretation",
      "steps": [
        "Step 1: Identify coefficient of x",
        "Step 2: Interpret rate of change",
        "Step 3: State cost per unit"
      ],
      "ans": "60",
      "why": "Coefficient of x represents marginal cost per unit"
    }
  ]
);

add(
  "math",
  "optimization",
  "Applications of Optimization",

  `
<h2> Applications of Optimization</h2>
<h3> DEEP NOTES (FULL MATHEMATICAL FRAMEWORK)</h3>
<p>
Optimization is the mathematical process of finding the maximum or minimum value of a function f(x) under given constraints.
It converts real-world situations into equations so that the best possible numerical solution can be calculated.
</p>
<p>
In mathematical form, optimization problems are written as:
<br>
<b>Maximize / Minimize: f(x)</b>
<br>
subject to constraints:
<br>
<b>g(x) ≤ 0, h(x) = 0</b>
</p>
<hr>
<h3> CORE MATHEMATICAL STRUCTURE</h3>
<ul>
<li><b>Objective function:</b> f(x) → quantity to optimize</li>
<li><b>Decision variable:</b> x → controllable input</li>
<li><b>Constraints:</b> equations/inequalities limiting x</li>
<li><b>Feasible region:</b> all x satisfying constraints</li>
<li><b>Optimal solution:</b> x where f(x) is max or min</li>
</ul>
<hr>
<h3> CALCULUS CONDITIONS (IMPORTANT)</h3>
<p>To find optimal points:</p>
<p><b>1. First derivative test:</b><br>f′(x) = 0 → critical points</p>
<p><b>2. Second derivative test:</b><br>f″(x) &gt; 0 → minimum<br>f″(x) &lt; 0 → maximum</p>
<hr>
<h3> KEY IDEAS (MATHEMATICAL INTERPRETATION)</h3>
<ul>
<li>Optimization = solving f(x) → best value</li>
<li>Constraints reduce infinite solutions to a feasible set</li>
<li>Maximum = highest point of f(x)</li>
<li>Minimum = lowest point of f(x)</li>
<li>Balance between variables often gives best result</li>
</ul>
<hr>
<h3> EXAMPLES (MODELS USED IN MATHEMATICS)</h3>
<ul>
<li>f(x) = ax² + bx + c → quadratic optimization models</li>
<li>P(x) = revenue − cost → profit maximization</li>
<li>A(x) = x(10 − x) → area maximization under constraint</li>
<li>d(x) = √((x₂ − x₁)² + (y₂ − y₁)²) → distance minimization</li>
<li>L(θ) → loss function minimization in machine learning</li>
</ul>
<hr>
<h3> FULL WORKED EXAMPLE (MATHEMATICAL OPTIMIZATION)</h3>
<p><b>Question:</b> Find the maximum value of f(x) = 10x − x²</p>
<hr>
<p><b>Step 1: Identify function type</b></p>
<p>f(x) = −x² + 10x → quadratic function</p>
<p><b>Step 2: Find derivative</b></p>
<p>f′(x) = 10 − 2x</p>
<p><b>Step 3: Set derivative equal to zero</b></p>
<p>10 − 2x = 0</p>
<p><b>Step 4: Solve for critical point</b></p>
<p>2x = 10 → x = 5</p>
<p><b>Step 5: Evaluate function</b></p>
<p>f(5) = 10(5) − 5²</p>
<p><b>Step 6: Compute result</b></p>
<p>f(5) = 50 − 25 = 25</p>
<p><b>Step 7: Confirm nature</b></p>
<p>f″(x) = −2 &lt; 0 → maximum point</p>
<p><b>Final Answer:</b> Maximum value = 25 at x = 5</p>
<hr>
<h3> GEOMETRIC INTERPRETATION</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 320 180" width="320" height="180" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
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

  <rect width="320" height="180" fill="url(#grid-lp)"/>
  <line x1="30" y1="150" x2="300" y2="150" stroke="#aaa" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#aaa" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <line x1="100" y1="147" x2="100" y2="153" stroke="#ccc" stroke-width="1"/>
  <text x="100" y="162" fill="#aaa" font-size="8" text-anchor="middle" font-family="monospace">2</text>
  <line x1="160" y1="147" x2="160" y2="153" stroke="#ccc" stroke-width="1"/>
  <text x="160" y="162" fill="#aaa" font-size="8" text-anchor="middle" font-family="monospace">5</text>
  <line x1="220" y1="147" x2="220" y2="153" stroke="#ccc" stroke-width="1"/>
  <text x="220" y="162" fill="#aaa" font-size="8" text-anchor="middle" font-family="monospace">8</text>
  <path d="M 60,150 Q 160,30 260,150" fill="none" stroke="#2ecc71" stroke-width="3" stroke-linecap="round"/>
  <circle cx="160" cy="40" r="8" fill="#e74c3c" opacity="0.3"/>
  <circle cx="160" cy="40" r="4" fill="#e74c3c"/>
  <line x1="160" y1="40" x2="160" y2="150" stroke="#e74c3c" stroke-width="1" stroke-dasharray="3,3"/>
  <text x="160" y="26" fill="#fff" font-size="10" text-anchor="middle" font-family="sans-serif" font-weight="bold">Vertex / Maximum (5, 25)</text>
  <text x="250" y="125" fill="#2ecc71" font-size="10" font-weight="bold" font-family="sans-serif">f(x) = 10x - x²</text>
  <text x="305" y="154" fill="#aaa" font-size="9" font-family="monospace">x</text>
  <text x="40" y="15" fill="#aaa" font-size="9" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>
<hr>
<h3> REAL WORLD APPLICATIONS (MATHEMATICAL MODELS)</h3>
<ul>
<li> Profit maximization → P(x) = R(x) − C(x)</li>
<li> Route optimization → minimize distance function d(x)</li>
<li> Engineering design → maximize strength / minimize material</li>
<li> Machine learning → minimize loss function L(θ)</li>
<li> Energy systems → minimize cost function E(x)</li>
<li> Network systems → optimize data flow functions</li>
</ul>
`,

  [
    {
      "q": "Maximize A(x) = 12x − x²",
      "hint": "vertex method",
      "steps": [
        "Step 1: Identify a = −1, b = 12",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 6",
        "Step 4: Evaluate A(6)",
        "Step 5: Compute 72 − 36"
      ],
      "ans": "36",
      "why": "Quadratic function reaches maximum at vertex"
    },
    {
      "q": "Minimize C(x) = x² + 8x + 20",
      "hint": "complete square / vertex",
      "steps": [
        "Step 1: Identify a = 1, b = 8",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = −4",
        "Step 4: Evaluate C(−4)",
        "Step 5: Compute 16 − 32 + 20"
      ],
      "ans": "4",
      "why": "Minimum occurs at vertex of upward parabola"
    },
    {
      "q": "Find optimal route length between points (2,3) and (8,15)",
      "hint": "distance formula",
      "steps": [
        "Step 1: Apply d = √((x₂ − x₁)² + (y₂ − y₁)²)",
        "Step 2: Substitute values (8−2), (15−3)",
        "Step 3: Compute 6² and 12²",
        "Step 4: Add results",
        "Step 5: Take square root"
      ],
      "ans": "≈ 13.42",
      "why": "Shortest path is Euclidean distance"
    },
    {
      "q": "Maximize profit P(x) = 100x − 5x²",
      "hint": "vertex optimization",
      "steps": [
        "Step 1: Identify a = −5, b = 100",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 10",
        "Step 4: Evaluate P(10)",
        "Step 5: Compute 1000 − 500"
      ],
      "ans": "500",
      "why": "Maximum profit occurs at vertex"
    },
    {
      "q": "Find minimum value of f(x) = 2x² − 12x + 18",
      "hint": "vertex formula",
      "steps": [
        "Step 1: Identify a = 2, b = −12",
        "Step 2: Compute x = −b/(2a)",
        "Step 3: Substitute x = 3",
        "Step 4: Evaluate f(3)",
        "Step 5: Compute 18 − 36 + 18"
      ],
      "ans": "0",
      "why": "Minimum value occurs at vertex of parabola"
    }
  ]
);

add(
  "math",
  "linear_programming",
  "Introduction to Linear Programming",

  `
<h2> Linear Programming</h2>

<h3> DEEP NOTES</h3>
<p>
Linear programming is a mathematical method used to find the best possible outcome (maximum or minimum) of a linear function subject to given constraints.
</p>
<pre>
Objective function: Max/Min Z = ax + by  
Subject to constraints (inequalities)
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>Objective function → what you want to optimize (maximize or minimize)</li>
<li>Constraints → limitations or restrictions</li>
<li>Feasible region → all possible valid solutions that satisfy constraints</li>
<li>Corner points → points where optimal solutions occur</li>
</ul>
<h3> WORKED EXAMPLE (STEP BY STEP)</h3>
<p><b>Question:</b> Maximize Z = 3x + 2y subject to x + y ≤ 4, x ≥ 0, y ≥ 0</p>
<p><b>Step 1: Identify constraints</b></p>
<p>x + y ≤ 4, x ≥ 0, y ≥ 0</p>
<p><b>Step 2: Draw boundary line</b></p>
<p>x + y = 4 → intercepts (4,0) and (0,4)</p>
<p><b>Step 3: Identify feasible region</b></p>
<p>Area below the line in the first quadrant</p>
<p><b>Step 4: Find corner points</b></p>
<p>(0,0), (4,0), (0,4)</p>
<p><b>Step 5: Evaluate objective function</b></p>
<ul>
<li>Z(0,0) = 0</li>
<li>Z(4,0) = 12</li>
<li>Z(0,4) = 8</li>
</ul>
<p><b>Step 6: Optimal solution</b></p>
<p>Maximum Z = 12 at (4,0)</p>
<h3> DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
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

  <rect width="280" height="200" fill="url(#grid-lp)"/>
  <polygon points="40,160 40,60 180,160" fill="#2ecc71" opacity="0.3" stroke="#2ecc71" stroke-width="1.5"/>
  <line x1="30" y1="160" x2="250" y2="160" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <line x1="40" y1="60" x2="180" y2="160" stroke="#e74c3c" stroke-width="2.5"/>
  <line x1="180" y1="157" x2="180" y2="163" stroke="#ccc" stroke-width="1"/>
  <line x1="37" y1="60" x2="43" y2="60" stroke="#ccc" stroke-width="1"/>
  <circle cx="40" cy="60" r="4.5" fill="#f1c40f"/>
  <circle cx="180" cy="160" r="4.5" fill="#f1c40f"/>
  <circle cx="40" cy="160" r="4.5" fill="#fff"/>
  <text x="25" y="64" fill="#f1c40f" font-size="9" font-family="monospace">(0,4)</text>
  <text x="180" y="174" fill="#f1c40f" font-size="9" text-anchor="middle" font-family="monospace">(4,0)</text>
  <text x="25" y="172" fill="#aaa" font-size="8" font-family="monospace">(0,0)</text>
  <text x="85" y="125" fill="#2ecc71" font-size="9" font-family="sans-serif" font-weight="bold">Feasible Region</text>
  <text x="140" y="85" fill="#e74c3c" font-size="9" font-family="sans-serif" font-weight="bold" transform="rotate(-35 140 85)">x + y = 4</text>
  <text x="260" y="164" fill="#aaa" font-size="9" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="9" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Business profit maximization</li>
<li>Resource allocation in industries</li>
<li>Production and manufacturing planning</li>
<li>Transport and logistics optimization</li>
</ul>
`,

  [
    {
      "q": "Maximize Z = 3x + 2y subject to x + y ≤ 10, x ≥ 0, y ≥ 0",
      "hint": "corner point method",
      "steps": [
        "Step 1: Identify constraints x + y ≤ 10, x ≥ 0, y ≥ 0",
        "Step 2: Find corner points of feasible region",
        "Step 3: Corner points are (0,0), (10,0), (0,10)",
        "Step 4: Evaluate Z at each point",
        "Step 5: Compute Z(0,0), Z(10,0), Z(0,10)"
      ],
      "ans": "Zmax = 30 at (10,0)",
      "why": "Linear programming solutions occur at vertices of feasible region"
    },
    {
      "q": "Maximize Z = 5x + 4y subject to x + 2y ≤ 8, x ≥ 0, y ≥ 0",
      "hint": "substitute corner points",
      "steps": [
        "Step 1: Find intercepts of x + 2y = 8",
        "Step 2: Set x = 0 → y = 4",
        "Step 3: Set y = 0 → x = 8",
        "Step 4: Corner points are (0,0), (8,0), (0,4)",
        "Step 5: Evaluate Z at each point"
      ],
      "ans": "Zmax = 40 at (8,0)",
      "why": "Maximum occurs at feasible region vertex"
    },
    {
      "q": "Minimize C = 2x + 3y subject to x + y ≥ 6, x ≥ 0, y ≥ 0",
      "hint": "corner evaluation",
      "steps": [
        "Step 1: Convert boundary x + y = 6",
        "Step 2: Find intercepts (6,0) and (0,6)",
        "Step 3: Identify feasible corner points",
        "Step 4: Evaluate C at (6,0) and (0,6)"
      ],
      "ans": "Cmin = 12 at (6,0)",
      "why": "Minimum occurs at boundary vertex"
    },
    {
      "q": "Find feasible region corner points for x + y ≤ 5, x ≥ 0, y ≥ 0",
      "hint": "graph intercepts",
      "steps": [
        "Step 1: Set x + y = 5",
        "Step 2: Find x-intercept (5,0)",
        "Step 3: Find y-intercept (0,5)",
        "Step 4: Include origin (0,0)",
        "Step 5: List all vertices"
      ],
      "ans": "(0,0), (5,0), (0,5)",
      "why": "Feasible region is bounded by axes and constraint line"
    },
    {
      "q": "Evaluate Z = 4x + y at feasible region vertices (0,0), (3,2), (5,0)",
      "hint": "substitution method",
      "steps": [
        "Step 1: Substitute (0,0) into Z",
        "Step 2: Substitute (3,2) into Z",
        "Step 3: Substitute (5,0) into Z",
        "Step 4: Compare all results"
      ],
      "ans": "Zmax = 20 at (5,0)",
      "why": "Optimal solution occurs at vertex with highest value"
    }
  ]
);

add(
  "math",
  "linear_programming",
  "Graphical Method",

  `
<h2> Graphical Method</h2>
<h3> DEEP NOTES</h3>
<p>
The graphical method solves linear programming problems by plotting constraints and finding corner points (vertices) of the feasible region. The optimal value always occurs at one of these corner points.
</p>
<p><b> Key idea:</b> Optimal solutions are found at vertices of the feasible region.</p>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Maximize Z = x + 2y subject to x + y ≤ 6</p>
<p><b>Step 1:</b> Draw boundary line</p>
<p>x + y = 6</p>
<p><b>Step 2:</b> Find intercepts</p>
<ul>
<li>If x = 0 → y = 6 → (0,6)</li>
<li>If y = 0 → x = 6 → (6,0)</li>
</ul>
<p><b>Step 3:</b> Identify feasible region</p>
<p>Region lies in the first quadrant under the line</p>
<p><b>Step 4:</b> Corner points</p>
<ul>
<li>(0,0)</li>
<li>(6,0)</li>
<li>(0,6)</li>
</ul>
<p><b>Step 5:</b> Evaluate Z = x + 2y</p>
<ul>
<li>(0,0) → Z = 0</li>
<li>(6,0) → Z = 6</li>
<li>(0,6) → Z = 12</li>
</ul>
<p><b>Step 6:</b> Conclusion</p>
<p>Maximum Z = 12 at (0,6)</p>
<h3> DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
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

  <rect width="280" height="200" fill="url(#grid-lp)"/>
  <polygon points="40,160 40,50 190,160" fill="#3498db" opacity="0.3" stroke="#3498db" stroke-width="1.5"/>
  <line x1="30" y1="160" x2="250" y2="160" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <line x1="40" y1="50" x2="190" y2="160" stroke="#e74c3c" stroke-width="2.5"/>
  <line x1="190" y1="157" x2="190" y2="163" stroke="#ccc" stroke-width="1"/>
  <line x1="37" y1="50" x2="43" y2="50" stroke="#ccc" stroke-width="1"/>
  <circle cx="40" cy="50" r="4.5" fill="#f1c40f"/>
  <circle cx="190" cy="160" r="4.5" fill="#f1c40f"/>
  <circle cx="40" cy="160" r="4.5" fill="#fff"/>
  <text x="25" y="54" fill="#f1c40f" font-size="9" font-family="monospace">(0,6)</text>
  <text x="190" y="174" fill="#f1c40f" font-size="9" text-anchor="middle" font-family="monospace">(6,0)</text>
  <text x="25" y="172" fill="#aaa" font-size="8" font-family="monospace">(0,0)</text>
  <text x="85" y="125" fill="#3498db" font-size="9" font-family="sans-serif" font-weight="bold">Feasible Region</text>
  <text x="140" y="80" fill="#e74c3c" font-size="9" font-family="sans-serif" font-weight="bold" transform="rotate(-35 140 80)">x + y = 6</text>
  <text x="260" y="164" fill="#aaa" font-size="9" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="9" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
<li>Profit maximization in businesses</li>
<li>Production planning in factories</li>
<li>Transport and delivery optimization</li>
<li>Resource allocation under constraints</li>
</ul>
`,

  [
    {
      "q": "Evaluate Z = 3x + 2y at corner points of x + y ≤ 6, x ≥ 0, y ≥ 0",
      "hint": "vertex evaluation",
      "steps": [
        "Step 1: Convert x + y ≤ 6 into x + y = 6",
        "Step 2: Find intercepts (6,0) and (0,6)",
        "Step 3: Include origin (0,0)",
        "Step 4: Evaluate Z at (0,0), (6,0), (0,6)",
        "Step 5: Compute Z values"
      ],
      "ans": "Zmax = 18 at (6,0)",
      "why": "Maximum occurs at a vertex of feasible region"
    },
    {
      "q": "Find boundary line equation for x + y ≤ 5",
      "hint": "convert inequality",
      "steps": [
        "Step 1: Replace ≤ with =",
        "Step 2: Write equation x + y = 5",
        "Step 3: Find intercepts (5,0) and (0,5)",
        "Step 4: Plot straight line"
      ],
      "ans": "x + y = 5",
      "why": "Boundary is formed by equality case of inequality"
    },
    {
      "q": "Find feasible region for x ≥ 0 and y ≥ 0 in coordinate plane",
      "hint": "quadrant identification",
      "steps": [
        "Step 1: Set x ≥ 0 (right half-plane)",
        "Step 2: Set y ≥ 0 (upper half-plane)",
        "Step 3: Intersect both regions",
        "Step 4: Identify common region"
      ],
      "ans": "First quadrant",
      "why": "Only points with both coordinates non-negative satisfy conditions"
    },
    {
      "q": "Test whether point (0,0) satisfies x + y ≤ 4, 2x + y ≤ 6",
      "hint": "substitution check",
      "steps": [
        "Step 1: Substitute x = 0, y = 0 into x + y ≤ 4",
        "Step 2: Verify 0 ≤ 4",
        "Step 3: Substitute into 2x + y ≤ 6",
        "Step 4: Verify 0 ≤ 6",
        "Step 5: Confirm validity"
      ],
      "ans": "Yes, (0,0) satisfies both inequalities",
      "why": "Point lies inside feasible region"
    },
    {
      "q": "Evaluate Z = 2x + 3y at (0,0), (4,0), (0,4)",
      "hint": "corner substitution",
      "steps": [
        "Step 1: Compute Z(0,0)",
        "Step 2: Compute Z(4,0)",
        "Step 3: Compute Z(0,4)",
        "Step 4: Compare all values"
      ],
      "ans": "Zmax = 12 at (0,4)",
      "why": "Optimal solution occurs at highest vertex value"
    }
  ]
);

add(
  "math",
  "linear_programming",
  "Inequality Constraints",

  `
<h2> Inequality Constraints</h2>
<h3> DEEP NOTES</h3>
<p>
Constraints define the limits of a system using inequalities.
They restrict the possible values of variables to a valid region.
</p>
<p><b> Key idea:</b> Constraints act like rules that limit solutions.</p>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Solve x + y ≤ 5 and x ≥ 0, y ≥ 0</p>
<p><b>Step 1:</b> Convert inequality to boundary line</p>
<p>x + y = 5</p>
<p><b>Step 2:</b> Find intercepts</p>
<ul>
<li>If x = 0 → y = 5 → (0,5)</li>
<li>If y = 0 → x = 5 → (5,0)</li>
</ul>
<p><b>Step 3:</b> Draw boundary line through (0,5) and (5,0)</p>
<p><b>Step 4:</b> Choose region</p>
<p>Test point (0,0): 0 + 0 ≤ 5 → true</p>
<p><b>Step 5:</b> Shade region</p>
<p>Below the line in the first quadrant</p>
<p><b>Final Answer:</b> Triangular feasible region bounded by axes and x + y = 5</p>
<h3> DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
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

  <rect width="280" height="200" fill="url(#grid-lp)"/>
  <polygon points="40,160 40,55 195,160" fill="#9b59b6" opacity="0.3" stroke="#9b59b6" stroke-width="1.5"/>
  <line x1="30" y1="160" x2="250" y2="160" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <line x1="40" y1="55" x2="195" y2="160" stroke="#e74c3c" stroke-width="2.5"/>
  <line x1="195" y1="157" x2="195" y2="163" stroke="#ccc" stroke-width="1"/>
  <line x1="37" y1="55" x2="43" y2="55" stroke="#ccc" stroke-width="1"/>
  <circle cx="40" cy="55" r="4.5" fill="#f1c40f"/>
  <circle cx="195" cy="160" r="4.5" fill="#f1c40f"/>
  <circle cx="40" cy="160" r="4.5" fill="#fff"/>
  <text x="25" y="59" fill="#f1c40f" font-size="9" font-family="monospace">(0,5)</text>
  <text x="195" y="174" fill="#f1c40f" font-size="9" text-anchor="middle" font-family="monospace">(5,0)</text>
  <text x="25" y="172" fill="#aaa" font-size="8" font-family="monospace">(0,0)</text>
  <text x="85" y="125" fill="#9b59b6" font-size="9" font-family="sans-serif" font-weight="bold">Feasible Region</text>
  <text x="140" y="82" fill="#e74c3c" font-size="9" font-family="sans-serif" font-weight="bold" transform="rotate(-35 140 82)">x + y = 5</text>
  <text x="260" y="164" fill="#aaa" font-size="9" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="9" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>

<h3> REAL WORLD APPLICATIONS</h3>
<ul>
<li>Production limits in factories</li>
<li>Budget constraints in planning</li>
<li>Time and workforce scheduling</li>
<li>Resource allocation problems</li>
</ul>
`,

  [
    {
      "q": "Find intercepts and boundary points for x + y ≤ 5",
      "hint": "set variables to zero",
      "steps": [
        "Step 1: Convert inequality to equation x + y = 5",
        "Step 2: Set x = 0 → y = 5",
        "Step 3: Set y = 0 → x = 5",
        "Step 4: Write intercept points"
      ],
      "ans": "(5,0) and (0,5)",
      "why": "Boundary line is defined by its intercepts"
    },
    {
      "q": "Determine all points satisfying x ≥ 0 and y ≥ 0 in coordinate plane",
      "hint": "sign conditions",
      "steps": [
        "Step 1: Solve x ≥ 0 → x ∈ [0, ∞)",
        "Step 2: Solve y ≥ 0 → y ∈ [0, ∞)",
        "Step 3: Combine conditions using intersection",
        "Step 4: Express solution set"
      ],
      "ans": "{(x,y) | x ≥ 0, y ≥ 0}",
      "why": "Intersection of non-negative half-planes defines region"
    },
    {
      "q": "Test whether point (0,0) satisfies x + y ≤ 4 and 2x + y ≤ 6",
      "hint": "substitution",
      "steps": [
        "Step 1: Substitute (0,0) into x + y ≤ 4",
        "Step 2: Evaluate 0 ≤ 4",
        "Step 3: Substitute into 2x + y ≤ 6",
        "Step 4: Evaluate 0 ≤ 6",
        "Step 5: Confirm both conditions"
      ],
      "ans": "Yes, (0,0) satisfies both inequalities",
      "why": "Point lies in feasible solution set"
    },
    {
      "q": "Draw feasible region for x ≥ 0, y ≥ 0, and 2x + 3y ≤ 12",
      "hint": "graph all constraints",
      "steps": [
        "Step 1: Draw axes (x ≥ 0, y ≥ 0)",
        "Step 2: Convert 2x + 3y ≤ 12 to boundary 2x + 3y = 12",
        "Step 3: Find intercepts (6,0) and (0,4)",
        "Step 4: Draw line through intercepts",
        "Step 5: Shade region below line in first quadrant"
      ],
      "ans": "Triangle with vertices (0,0), (6,0), (0,4)",
      "why": "Region satisfying all inequalities simultaneously"
    }
  ]
);

add(
  "math",
  "linear_programming",
  "Feasible Region",

  `
<h2> Feasible Region</h2>
<h3> DEEP NOTES</h3>
<p>
The feasible region is the set of all possible solutions that satisfy all given constraints in a linear programming problem.
Only points inside or on this region are valid solutions.
</p>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Find feasible region for x ≥ 0, y ≥ 0, x + y ≤ 4</p>
<p><b>Step 1:</b> Draw x-axis and y-axis</p>
<p><b>Step 2:</b> Plot the line x + y = 4 using intercepts (4,0) and (0,4)</p>
<p><b>Step 3:</b> Identify inequalities:
<ul>
<li>x ≥ 0 → right side of y-axis</li>
<li>y ≥ 0 → above x-axis</li>
<li>x + y ≤ 4 → below the line</li>
</ul>
</p>
<p><b>Step 4:</b> Shade the common overlapping region</p>
<p><b>Final Answer:</b> A triangular region in the first quadrant bounded by the axes and the line x + y = 4</p>
<h3> DIAGRAM</h3>
<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 280 200" width="280" height="200" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;border-radius:10px;background:#0d0d1e;box-shadow: 0 4px 15px rgba(0,0,0,0.45);border: 1px solid #1e1e2f;">
  
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

  <rect width="280" height="200" fill="url(#grid-lp)"/>
  <polygon points="40,160 40,60 180,160" fill="#2ecc71" opacity="0.3" stroke="#2ecc71" stroke-width="1.5"/>
  <line x1="30" y1="160" x2="250" y2="160" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-x)"/>
  <line x1="40" y1="170" x2="40" y2="20" stroke="#ccc" stroke-width="1.5" marker-end="url(#arrow-y)"/>
  <line x1="40" y1="60" x2="180" y2="160" stroke="#e74c3c" stroke-width="2.5"/>
  <line x1="180" y1="157" x2="180" y2="163" stroke="#ccc" stroke-width="1"/>
  <line x1="37" y1="60" x2="43" y2="60" stroke="#ccc" stroke-width="1"/>
  <circle cx="40" cy="60" r="4.5" fill="#f1c40f"/>
  <circle cx="180" cy="160" r="4.5" fill="#f1c40f"/>
  <circle cx="40" cy="160" r="4.5" fill="#fff"/>
  <text x="25" y="64" fill="#f1c40f" font-size="9" font-family="monospace">(0,4)</text>
  <text x="180" y="174" fill="#f1c40f" font-size="9" text-anchor="middle" font-family="monospace">(4,0)</text>
  <text x="25" y="172" fill="#aaa" font-size="8" font-family="monospace">(0,0)</text>
  <text x="85" y="125" fill="#2ecc71" font-size="9" font-family="sans-serif" font-weight="bold">Feasible Region</text>
  <text x="140" y="85" fill="#e74c3c" font-size="9" font-family="sans-serif" font-weight="bold" transform="rotate(-35 140 85)">x + y = 4</text>
  <text x="260" y="164" fill="#aaa" font-size="9" font-family="monospace">x</text>
  <text x="40" y="14" fill="#aaa" font-size="9" text-anchor="middle" font-family="monospace">y</text>
</svg>
</div>

<h3> REAL WORLD APPLICATIONS</h3>
<ul>
<li>Manufacturing production limits</li>
<li>Resource allocation in companies</li>
<li>Investment and budgeting decisions</li>
<li>Transport and logistics planning</li>
</ul>
`,

  [
    {
      "q": "Find the set of all feasible points satisfying x ≥ 0 and y ≥ 0",
      "hint": "inequality intersection",
      "steps": [
        "Step 1: Solve x ≥ 0 → x ∈ [0, ∞)",
        "Step 2: Solve y ≥ 0 → y ∈ [0, ∞)",
        "Step 3: Take intersection of both sets",
        "Step 4: Write ordered pair form"
      ],
      "ans": "{(x,y) | x ≥ 0, y ≥ 0}",
      "why": "Feasible region is intersection of all constraint sets"
    },
    {
      "q": "Find intercept points of boundary line x + y = 4",
      "hint": "set variables to zero",
      "steps": [
        "Step 1: Set x = 0 → y = 4",
        "Step 2: Set y = 0 → x = 4",
        "Step 3: Write coordinate points",
        "Step 4: Define line segment between points"
      ],
      "ans": "(4,0) and (0,4)",
      "why": "Intercepts define geometry of boundary line"
    },
    {
      "q": "Determine region defined by x + y ≤ 4 in first quadrant",
      "hint": "inequality region",
      "steps": [
        "Step 1: Convert boundary x + y = 4",
        "Step 2: Identify intercepts (4,0), (0,4)",
        "Step 3: Restrict to x ≥ 0, y ≥ 0",
        "Step 4: Describe bounded region"
      ],
      "ans": "Triangular region with vertices (0,0), (4,0), (0,4)",
      "why": "Intersection of inequality and axes forms triangle"
    },
    {
      "q": "Draw the feasible region for 2x + 3y ≤ 12, x ≥ 0, y ≥ 0",
      "hint": "graph bounded region",
      "steps": [
        "Step 1: Draw axes",
        "Step 2: Find intercepts of 2x + 3y = 12: (6,0) and (0,4)",
        "Step 3: Draw line through intercepts",
        "Step 4: Shade region satisfying all inequalities",
        "Step 5: Identify vertices of region"
      ],
      "ans": "Triangle with vertices (0,0), (6,0), (0,4)",
      "why": "Feasible region is bounded area satisfying all constraints"
    },
    {
      "q": "Determine the feasible region for constraints 3x + 2y ≤ 12, x ≥ 0, y ≥ 0",
      "hint": "graph bounded triangular region",
      "steps": [
        "Step 1: Draw axes for x ≥ 0, y ≥ 0",
        "Step 2: Find intercepts for 3x + 2y = 12: x=4 when y=0, y=6 when x=0",
        "Step 3: Draw line connecting (4,0) and (0,6)",
        "Step 4: Test point (0,0) → 0 ≤ 12 is true",
        "Step 5: Shade region toward origin (bounded triangle)"
      ],
      "ans": "Triangle with vertices (0,0), (4,0), (0,6)",
      "why": "Region below line 3x + 2y = 12 in the first quadrant"
    }
  ]
);

add(
  "math",
  "linear_programming",
  "Applications of Linear Programming",

  `
<h2> Applications of Linear Programming</h2>
<h3> DEEP NOTES</h3>
<p>
Linear programming is used in decision-making to optimize limited resources.
It helps find the best possible outcome (maximum or minimum) under given restrictions.
</p>
<h3> EXAMPLES</h3>
<ul>
<li>Profit maximization in companies</li>
<li>Transport and delivery optimization</li>
<li>Diet planning in nutrition science</li>
<li>Production planning in factories</li>
</ul>
<h3> WORKED EXAMPLE</h3>
<p><b>Question:</b> Why use linear programming?</p>
<p><b>Step 1:</b> Identify limited resources</p>
<p><b>Step 2:</b> Set constraints (restrictions)</p>
<p><b>Step 3:</b> Define objective function</p>
<p><b>Step 4:</b> Optimize (maximize or minimize result)</p>
<p><b>Final Answer:</b> To get the best possible outcome under restrictions</p>
<h3> DIAGRAM</h3>
<pre>
Constraints → Feasible region → Optimal solution
</pre>
`,

  [
    {
      "q": "Evaluate Z = 3x + 5y at (2,4), (0,6), (5,0)",
      "hint": "substitute points",
      "steps": [
        "Step 1: Substitute (2,4) → Z = 3(2) + 5(4)",
        "Step 2: Compute Z = 6 + 20",
        "Step 3: Z(2,4) = 26",
        "Step 4: Substitute (0,6) → Z = 3(0) + 5(6)",
        "Step 5: Z(0,6) = 30",
        "Step 6: Substitute (5,0) → Z = 3(5) + 5(0)",
        "Step 7: Z(5,0) = 15",
        "Step 8: Compare all values"
      ],
      "ans": "Maximum value = 30 at (0,6)",
      "why": "Objective function is evaluated at vertices to find optimum"
    },
    {
      "q": "Maximize Z = 4x + 2y subject to x + y ≤ 6",
      "hint": "corner point evaluation",
      "steps": [
        "Step 1: Convert x + y ≤ 6 to x + y = 6",
        "Step 2: Find intercepts (6,0) and (0,6)",
        "Step 3: Include origin (0,0)",
        "Step 4: Evaluate Z at all points",
        "Step 5: Compare results"
      ],
      "ans": "Zmax = 24 at (6,0)",
      "why": "Linear objective reaches extreme at boundary vertices"
    },
    {
      "q": "Find objective function value for C = 10x + 3y at x = 4, y = 5",
      "hint": "direct substitution",
      "steps": [
        "Step 1: Write C = 10x + 3y",
        "Step 2: Substitute x = 4, y = 5",
        "Step 3: Compute 10×4",
        "Step 4: Compute 3×5",
        "Step 5: Add results"
      ],
      "ans": "55",
      "why": "Objective function evaluates performance of given solution"
    }
  ]
);

add(
  "math",
  "fractions",
  "Fraction basics",

  `<h2>Fractions Basics</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>A fraction represents a part of a whole.</li>
<li>A fraction has two parts: <b>numerator</b> and <b>denominator</b>.</li>
<li><b>Numerator (top):</b> Shows how many parts you have.</li>
<li><b>Denominator (bottom):</b> Shows total equal parts of the whole.</li>
<li>The denominator tells the size of each part.</li>
</ul>

<p><b> Key idea:</b> 3/5 means “3 parts out of 5 equal parts”.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Mixing numerator and denominator</li>
<li>Thinking bigger denominator = bigger fraction (not always true)</li>
<li>Ignoring that parts must be equal</li>
<li>Assuming fractions are always whole numbers</li>
</ul>

<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Identify numerator in 3/5<br>
Step 1: Look at top number<br>
Step 2: Top = 3<br>
<b>Answer: 3</b>
</li>

<li>
<b>Example 2:</b> What does 2/4 mean?<br>
Step 1: Total parts = 4<br>
Step 2: Taken parts = 2<br>
Step 3: Simplify → 2/4 = 1/2<br>
<b>Answer: Half</b>
</li>

<li>
<b>Example 3:</b> Which is bigger: 1/3 or 1/2?<br>
Step 1: Same numerator (1)<br>
Step 2: Smaller denominator = bigger part<br>
<b>Answer: 1/2 is bigger</b>
</li>

<li>
<b>Example 4:</b> Identify denominator in 7/9<br>
Step 1: Look at bottom number<br>
Step 2: Bottom = 9<br>
<b>Answer: 9</b>
</li>
</ul>
`,

  [
    {
      "q": "Evaluate 7/9 as a decimal",
      "hint": "division",
      "steps": [
        "Step 1: Divide 7 ÷ 9",
        "Step 2: Perform long division",
        "Step 3: Obtain repeating decimal",
        "Step 4: Round to required precision"
      ],
      "ans": "0.777…",
      "why": "Fraction is expressed as division of numerator by denominator"
    },
    {
      "q": "Find the missing denominator if 3/x = 0.6",
      "hint": "solve equation",
      "steps": [
        "Step 1: Write 3/x = 0.6",
        "Step 2: Multiply both sides by x",
        "Step 3: 3 = 0.6x",
        "Step 4: Divide both sides by 0.6",
        "Step 5: Solve for x"
      ],
      "ans": "5",
      "why": "Denominator is found by rearranging fractional equation"
    },
    {
      "q": "Convert 3/5 into percentage",
      "hint": "fraction to percent",
      "steps": [
        "Step 1: Divide 3 ÷ 5",
        "Step 2: Multiply result by 100",
        "Step 3: Compute final percentage"
      ],
      "ans": "60%",
      "why": "Fraction conversion uses multiplication by 100"
    },
    {
      "q": "Find equivalent fraction of 3/5 with denominator 20",
      "hint": "scaling fractions",
      "steps": [
        "Step 1: Determine multiplier from 5 to 20",
        "Step 2: Multiply numerator by same factor",
        "Step 3: Form new fraction"
      ],
      "ans": "12/20",
      "why": "Equivalent fractions preserve ratio by scaling numerator and denominator equally"
    }
  ]
);

add(
  "math",
  "fractions",
  "Adding and subtracting fractions",

  `<h2>Add & Subtract Fractions</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>You can only add or subtract fractions when they have the same denominator.</li>
<li>If denominators are the same → add/subtract numerators only.</li>
<li>If different → find a common denominator (LCM).</li>
<li>Always simplify your answer.</li>
</ul>

<p><b> Key idea:</b> Denominator must be the same before combining.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Adding denominators directly (wrong)</li>
<li>Forgetting to find common denominator</li>
<li>Not simplifying final answer</li>
<li>Changing only one fraction instead of both when making LCM</li>
</ul>

<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 1/4 + 2/4<br>
Step 1: Same denominator → 4<br>
Step 2: Add numerators → 1 + 2 = 3<br>
<b>Answer: 3/4</b>
</li>

<li>
<b>Example 2:</b> 1/2 + 1/4<br>
Step 1: LCM of 2 and 4 = 4<br>
Step 2: Convert 1/2 = 2/4<br>
Step 3: 2/4 + 1/4 = 3/4<br>
<b>Answer: 3/4</b>
</li>

<li>
<b>Example 3:</b> 3/5 − 1/5<br>
Step 1: Same denominator<br>
Step 2: Subtract → 3 − 1 = 2<br>
<b>Answer: 2/5</b>
</li>

<li>
<b>Example 4:</b> 2/3 + 1/6<br>
Step 1: LCM of 3 and 6 = 6<br>
Step 2: Convert 2/3 = 4/6<br>
Step 3: 4/6 + 1/6 = 5/6<br>
<b>Answer: 5/6</b>
</li>
</ul>
`,

  [
    {
      "q": "2/3 + 1/3",
      "hint": "Same denominator",
      "steps": [
        "Step 1: Add numerators → 2 + 1 = 3",
        "Step 2: 3/3",
        "Step 3: Simplify → 1"
      ],
      "ans": "1",
      "why": "Forms a whole"
    },
    {
      "q": "1/2 + 1/4",
      "hint": "Find LCM",
      "steps": [
        "Step 1: LCM of 2 and 4 = 4",
        "Step 2: Convert 1/2 = 2/4",
        "Step 3: 2/4 + 1/4 = 3/4"
      ],
      "ans": "3/4",
      "why": "Common denominator method"
    },
    {
      "q": "5/6 - 1/3",
      "hint": "Convert denominator",
      "steps": [
        "Step 1: 1/3 = 2/6",
        "Step 2: 5/6 - 2/6",
        "Step 3: 3/6 = 1/2"
      ],
      "ans": "1/2",
      "why": "Subtraction with LCM"
    }
  ]
);

add(
  "math",
  "fractions",
  "Multiplying and dividing fractions",

  `<h2>Multiply & Divide Fractions</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li><b>Multiplication:</b> Multiply numerator × numerator and denominator × denominator.</li>
<li><b>Division:</b> Change division to multiplication and flip the second fraction (reciprocal).</li>
<li>Always simplify the final answer.</li>
</ul>

<p><b> Key idea:</b> Division = multiply by reciprocal.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Forgetting to flip the second fraction when dividing</li>
<li>Multiplying incorrectly</li>
<li>Not simplifying answers</li>
</ul>

<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> 1/2 × 1/3<br>
Step 1: 1 × 1 = 1<br>
Step 2: 2 × 3 = 6<br>
<b>Answer: 1/6</b>
</li>

<li>
<b>Example 2:</b> 2/3 × 3/4<br>
Step 1: 2 × 3 = 6<br>
Step 2: 3 × 4 = 12<br>
Step 3: Simplify → 1/2<br>
<b>Answer: 1/2</b>
</li>

<li>
<b>Example 3:</b> 1/2 ÷ 1/4<br>
Step 1: Flip 1/4 → 4/1<br>
Step 2: 1/2 × 4/1 = 4/2<br>
Step 3: Simplify → 2<br>
<b>Answer: 2</b>
</li>

<li>
<b>Example 4:</b> 3/5 × 2/3<br>
Step 1: 3 × 2 = 6<br>
Step 2: 5 × 3 = 15<br>
Step 3: Simplify → 2/5<br>
<b>Answer: 2/5</b>
</li>
</ul>
`,

  [
    {
      "q": "4/7 × 2/3",
      "hint": "Multiply straight across",
      "steps": [
        "Step 1: 4 × 2 = 8",
        "Step 2: 7 × 3 = 21"
      ],
      "ans": "8/21",
      "why": "Multiply numerators and denominators"
    },
    {
      "q": "5/6 ÷ 1/3",
      "hint": "Flip second fraction",
      "steps": [
        "Step 1: 5/6 × 3/1",
        "Step 2: 15/6",
        "Step 3: Simplify → 5/2"
      ],
      "ans": "5/2",
      "why": "Division uses reciprocal"
    },
    {
      "q": "2/5 ÷ 2/5",
      "hint": "Same fractions",
      "steps": [
        "Step 1: Flip → 2/5 × 5/2",
        "Step 2: Cancel common factors",
        "Step 3: 1"
      ],
      "ans": "1",
      "why": "Any number divided by itself = 1"
    }
  ]
);

add(
  "math",
  "fractions",
  "Decimals",

  `<h2>Decimals</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Decimals are another way of writing fractions using base 10.</li>
<li>Place value system: 0.1 (tenths), 0.01 (hundredths), 0.001 (thousandths)</li>
<li>0.5 = 5/10 = 1/2</li>
<li>0.25 = 25/100 = 1/4</li>
<li>Line up decimal points when adding/subtracting.</li>
</ul>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Not aligning decimal points</li>
<li>Misreading place value</li>
<li>Forgetting to simplify fractions after conversion</li>
<li>Dropping zeros incorrectly (e.g. 0.50 ≠ 0.5 mistake in understanding)</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> Convert 0.5 to fraction<br>
Step 1: 0.5 = 5/10<br>
Step 2: Simplify → 1/2<br>
<b>Answer: 1/2</b>
</li>

<li>
<b>Example 2:</b> 0.25 + 0.25<br>
Step 1: Align decimals<br>
Step 2: 0.25 + 0.25 = 0.50<br>
Step 3: Simplify → 0.5<br>
<b>Answer: 0.5</b>
</li>

<li>
<b>Example 3:</b> Convert 0.75 to fraction<br>
Step 1: 75/100<br>
Step 2: Simplify → 3/4<br>
<b>Answer: 3/4</b>
</li>

<li>
<b>Example 4:</b> 1.2 + 0.35<br>
Step 1: Align decimals<br>
Step 2: 1.20 + 0.35<br>
Step 3: = 1.55<br>
<b>Answer: 1.55</b>
</li>

<li>
<b>Example 5:</b> 2.5 − 0.75<br>
Step 1: 2.50 − 0.75<br>
Step 2: = 1.75<br>
<b>Answer: 1.75</b>
</li>
</ul>
`,

  [
    {
      "q": "0.2 + 0.3",
      "hint": "Add decimals",
      "steps": [
        "Step 1: Align decimal points",
        "Step 2: 0.2 + 0.3",
        "Step 3: 0.5"
      ],
      "ans": "0.5",
      "why": "Place value addition"
    },
    {
      "q": "Convert 0.6 to fraction",
      "hint": "Write over 10",
      "steps": [
        "Step 1: 0.6 = 6/10",
        "Step 2: Simplify",
        "Step 3: 3/5"
      ],
      "ans": "3/5",
      "why": "Simplifying fractions"
    },
    {
      "q": "1.5 + 2.25",
      "hint": "Align decimals",
      "steps": [
        "Step 1: 1.50 + 2.25",
        "Step 2: Add",
        "Step 3: 3.75"
      ],
      "ans": "3.75",
      "why": "Decimal addition rules"
    }
  ]
);

add(
  "math",
  "fractions",
  "Fractions to decimals",

  `<h2>Fractions ↔ Decimals</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>To convert a fraction to a decimal, divide the numerator by the denominator.</li>
<li>A decimal is just another way of writing a fraction in base 10.</li>
<li>If division ends → <b>terminating decimal</b> (e.g. 0.5, 0.75).</li>
<li>If digits repeat forever → <b>recurring decimal</b> (e.g. 0.333..., 0.666...).</li>
</ul>

<p><b> Key idea:</b> Fraction = division problem.</p>

<h3> RECURRING DECIMALS (IMPORTANT CONCEPT)</h3>

<p>A recurring decimal is a decimal where digits repeat infinitely.</p>

<ul>
<li>0.333... = 1/3</li>
<li>0.666... = 2/3</li>
<li>0.142857142857... = 1/7</li>
</ul>

<h3> CONVERTING RECURRING DECIMALS TO FRACTIONS</h3>

<h4> Steps:</h4>
<ol>
<li>Let x = recurring decimal</li>
<li>Multiply to shift repeating digits</li>
<li>Subtract equations</li>
<li>Solve for x</li>
</ol>

<h4> Example 1:</h4>
<p>x = 0.333...</p>
<p>10x = 3.333...</p>
<p>10x − x = 3</p>
<p>9x = 3 → x = 1/3</p>

<h4> Example 2:</h4>
<p>x = 0.666...</p>
<p>10x = 6.666...</p>
<p>9x = 6 → x = 2/3</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Stopping division too early</li>
<li>Confusing terminating and recurring decimals</li>
<li>Forgetting subtraction step in algebra method</li>
<li>Not aligning decimal places correctly</li>
</ul>

<h3> WORKED EXAMPLES (BASIC)</h3>
<ul>
<li><b>1/2</b> → 0.5</li>
<li><b>3/4</b> → 0.75</li>
<li><b>1/5</b> → 0.2</li>
</ul>

<h3> PRACTICE QUESTIONS</h3>
<ul>
<li>
<b>Q1:</b> Convert 3/5 to decimal<br>
Hint: divide numerator by denominator<br>
Answer: 0.6
</li>

<li>
<b>Q2:</b> Convert 7/10 to decimal<br>
Hint: denominator is power of 10<br>
Answer: 0.7
</li>

<li>
<b>Q3:</b> Convert 1/4 to decimal<br>
Hint: divide carefully<br>
Answer: 0.25
</li>

<li>
<b>Q4:</b> What type of decimal is 0.125?<br>
Hint: does it stop or repeat?<br>
Answer: terminating decimal
</li>

<li>
<b>Q5:</b> Convert 5/8 to decimal<br>
Hint: long division<br>
Answer: 0.625
</li>
</ul>
`,

  [
    {
      "q": "Convert 0.666... into fraction form",
      "hint": "recurring decimal",
      "steps": [
        "Step 1: Let x = 0.666...",
        "Step 2: Multiply both sides by 10 → 10x = 6.666...",
        "Step 3: Subtract x from 10x",
        "Step 4: 9x = 6",
        "Step 5: Solve for x"
      ],
      "ans": "2/3",
      "why": "Recurring decimals are solved using elimination of repeating part"
    },
    {
      "q": "Convert 0.121212... into fraction form",
      "hint": "two-digit repeating block",
      "steps": [
        "Step 1: Let x = 0.121212...",
        "Step 2: Multiply both sides by 100 → 100x = 12.121212...",
        "Step 3: Subtract x from 100x",
        "Step 4: 99x = 12",
        "Step 5: Solve for x"
      ],
      "ans": "12/99 = 4/33",
      "why": "Repeating blocks are eliminated using powers of 10"
    },
    {
      "q": "Convert 0.444... into fraction form",
      "hint": "single repeating digit",
      "steps": [
        "Step 1: Let x = 0.444...",
        "Step 2: Multiply both sides by 10 → 10x = 4.444...",
        "Step 3: Subtract x from 10x",
        "Step 4: 9x = 4",
        "Step 5: Solve for x"
      ],
      "ans": "4/9",
      "why": "Single repeating digits simplify into ninths"
    },
    {
      "q": "Convert 0.777... into fraction form",
      "hint": "recurring decimal",
      "steps": [
        "Step 1: Let x = 0.777...",
        "Step 2: Multiply both sides by 10 → 10x = 7.777...",
        "Step 3: Subtract x from 10x",
        "Step 4: 9x = 7",
        "Step 5: Solve for x"
      ],
      "ans": "7/9",
      "why": "Recurring decimals convert into fraction using elimination method"
    },
    {
      "q": "Convert 0.090909... into fraction form",
      "hint": "two-digit repetition",
      "steps": [
        "Step 1: Let x = 0.090909...",
        "Step 2: Multiply both sides by 100 → 100x = 9.090909...",
        "Step 3: Subtract x from 100x",
        "Step 4: 99x = 9",
        "Step 5: Solve for x"
      ],
      "ans": "1/11",
      "why": "Repeating patterns convert into simplified fractions using algebra"
    }
  ]
);

add(
  "math",
  "measurement",
  "Area of rectangles and squares",

  `<h2>Area of Rectangles & Squares</h2>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Area tells us how much surface is covered inside a shape.</li>
<li>Rectangle: Area = length × width</li>
<li>Square: Area = side × side</li>
<li>Units are always squared (cm², m², km²).</li>
</ul>

<p><b> Key idea:</b> Area always multiplies two lengths.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using addition instead of multiplication</li>
<li>Forgetting squared units</li>
<li>Mixing perimeter and area formulas</li>
</ul>

<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> Rectangle 6 × 4<br>
Step 1: Area = length × width<br>
Step 2: 6 × 4 = 24<br>
<b>Answer: 24 cm²</b>
</li>

<li>
<b>Example 2:</b> Square side 5<br>
Step 1: 5 × 5<br>
Step 2: 25<br>
<b>Answer: 25 cm²</b>
</li>

<li>
<b>Example 3:</b> Rectangle 10 × 3<br>
Step 1: 10 × 3<br>
Step 2: 30<br>
<b>Answer: 30 cm²</b>
</li>
</ul>

<p><b> Key idea:</b> Area uses multiplication of dimensions.</p>
`,

  [
    {
      "q": "Find area of rectangle 8 × 2",
      "hint": "Multiply length and width",
      "steps": [
        "Step 1: Area = length × width",
        "Step 2: 8 × 2",
        "Step 3: 16"
      ],
      "ans": "16",
      "why": "Area formula for rectangle"
    },
    {
      "q": "Find area of square with side 7",
      "hint": "Side × side",
      "steps": [
        "Step 1: 7 × 7",
        "Step 2: 49"
      ],
      "ans": "49",
      "why": "Square area rule"
    },
    {
      "q": "Rectangle has length 9 and width 5. Find area",
      "hint": "Multiply",
      "steps": [
        "Step 1: 9 × 5",
        "Step 2: 45"
      ],
      "ans": "45",
      "why": "Direct formula application"
    },
    {
      "q": "Square side 10. Find area",
      "hint": "Square rule",
      "steps": [
        "Step 1: 10 × 10",
        "Step 2: 100"
      ],
      "ans": "100",
      "why": "Side squared"
    },
    {
      "q": "Which is correct formula for rectangle area?",
      "hint": "length and width",
      "steps": [
        "Step 1: Identify rectangle formula",
        "Step 2: Multiply length × width"
      ],
      "ans": "length × width",
      "why": "Definition of rectangle area"
    }
  ]
);

add(
  "math",
  "measurement",
  "Area of triangles",

  `<h2>Area of Triangles</h2>

<h3> FOUNDATION EXPLANATION</h3>
<p>
A triangle is half of a rectangle in terms of area logic.
</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Triangle area = 1/2 × base × height</li>
<li>Base = bottom length</li>
<li>Height = perpendicular vertical height</li>
<li>Must use perpendicular height, not slanted side.</li>
</ul>

<p><b> Key idea:</b> Triangle is always half of a rectangle.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using slanted side instead of height</li>
<li>Forgetting to multiply by 1/2</li>
<li>Mixing base and height</li>
<li>Using wrong units or not squaring units</li>
</ul>

<h3> WORKED EXAMPLES</h3>
<ul>
<li>
<b>Example 1:</b> base 6 height 4<br>
Step 1: 1/2 × 6 × 4<br>
Step 2: 12<br>
<b>Answer: 12 cm²</b>
</li>

<li>
<b>Example 2:</b> base 10 height 5<br>
Step 1: 1/2 × 10 × 5<br>
Step 2: 25<br>
<b>Answer: 25 cm²</b>
</li>

<li>
<b>Example 3:</b> base 8 height 3<br>
Step 1: 1/2 × 8 × 3<br>
Step 2: 12<br>
<b>Answer: 12 cm²</b>
</li>
</ul>

<h3> EXTRA PRACTICE QUESTIONS</h3>
<ul>
<li>
<b>Q1:</b> base = 14 cm, height = 6 cm<br>
Hint: Use 1/2 × b × h<br>
Answer: 42 cm²
</li>

<li>
<b>Q2:</b> base = 9 cm, height = 7 cm<br>
Hint: Multiply then divide by 2<br>
Answer: 31.5 cm²
</li>

<li>
<b>Q3:</b> area = 40 cm², base = 10 cm, find height<br>
Hint: rearrange formula<br>
Answer: 8 cm
</li>

<li>
<b>Q4:</b> area = 24 cm², height = 6 cm, find base<br>
Hint: 2A ÷ h<br>
Answer: 8 cm
</li>
</ul>
`,

  [
    {
      "q": "Base 12 height 4",
      "hint": "Half × base × height",
      "steps": [
        "Step 1: 1/2 × 12 × 4",
        "Step 2: 24"
      ],
      "ans": "24",
      "why": "Triangle area rule"
    },
    {
      "q": "Base 14 height 6",
      "hint": "Use formula",
      "steps": [
        "Step 1: 1/2 × 14 × 6",
        "Step 2: 7 × 6",
        "Step 3: 42"
      ],
      "ans": "42",
      "why": "Standard area calculation"
    },
    {
      "q": "Area = 40, base = 10 find height",
      "hint": "Rearrange formula",
      "steps": [
        "Step 1: A = 1/2 b h",
        "Step 2: 40 = 1/2 × 10 × h",
        "Step 3: 40 = 5h",
        "Step 4: h = 8"
      ],
      "ans": "8",
      "why": "Rearranged formula"
    }
  ]
);

add(
  "math",
  "measurement",
  "Volume of cubes and cuboids",

  `<h2>Volume of Cubes & Cuboids</h2>

<p>Volume measures the space inside a 3D object.</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Volume = space inside a solid shape.</li>
<li>Cuboid = length × width × height</li>
<li>Cube = side³ (side × side × side)</li>
<li>Units are always cubed (cm³, m³).</li>
</ul>

<p><b> Key idea:</b> Volume multiplies all three dimensions.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using area formula instead of volume</li>
<li>Forgetting the third dimension</li>
<li>Not cubing in cube problems</li>
<li>Mixing cm² with cm³</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> 4 × 3 × 2<br>
Step 1: Multiply all sides<br>
Step 2: 4 × 3 × 2 = 24<br>
<b>Answer: 24 cm³</b>
</li>

<li>
<b>Example 2:</b> Cube side 3<br>
Step 1: 3 × 3 × 3<br>
Step 2: 27<br>
<b>Answer: 27 cm³</b>
</li>

<li>
<b>Example 3:</b> 5 × 2 × 1<br>
Step 1: Multiply all dimensions<br>
Step 2: 10<br>
<b>Answer: 10 cm³</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Water tanks and storage containers</li>
<li>Room capacity in construction</li>
<li>Packaging box design</li>
<li>Shipping and logistics calculations</li>
</ul>
`,

  [
    {
      "q": "Find volume of a cube with side 4",
      "hint": "side³",
      "ans": "64 cm³",
      "why": "4 × 4 × 4 = 64, so the volume is 64 cubic units"
    },
    {
      "q": "What is the formula for cuboid volume?",
      "hint": "3 dimensions",
      "ans": "length × width × height",
      "why": "A cuboid’s volume is found by multiplying its three dimensions"
    },
    {
      "q": "What does volume measure?",
      "hint": "inside capacity",
      "ans": "Space inside a 3D shape",
      "why": "Volume tells us how much space an object can hold"
    }
  ]
);

add(
  "math",
  "measurement",
  "Surface area basics",

  `<h2>Surface Area</h2>

<p>Surface area is the total area of all outer faces of a 3D shape.</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Surface area = sum of all outside faces.</li>
<li>Cube has 6 equal square faces.</li>
<li>Each face = side × side.</li>
<li>Total surface area = 6 × side²</li>
</ul>

<p><b> Key idea:</b> Surface area is covering, not inside space.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing surface area with volume</li>
<li>Forgetting all 6 faces in a cube</li>
<li>Not squaring the side length</li>
<li>Mixing units (cm² vs cm³)</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1:</b> side 2<br>
Step 1: 6 × 2²<br>
Step 2: 6 × 4 = 24<br>
<b>Answer: 24 cm²</b>
</li>

<li>
<b>Example 2:</b> side 3<br>
Step 1: 3² = 9<br>
Step 2: 6 × 9 = 54<br>
<b>Answer: 54 cm²</b>
</li>

<li>
<b>Example 3:</b> side 1<br>
Step 1: 1² = 1<br>
Step 2: 6 × 1 = 6<br>
<b>Answer: 6 cm²</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Painting walls and boxes</li>
<li>Wrapping gifts and packaging design</li>
<li>Manufacturing containers</li>
<li>Construction material estimation</li>
</ul>
`,

  [
    {
      "q": "Find surface area of a cube with side 5",
      "hint": "6 × side²",
      "ans": "150 cm²",
      "why": "6 × 5² = 6 × 25 = 150, so total surface area is 150 cm²"
    },
    {
      "q": "What does surface area measure?",
      "hint": "outside faces",
      "ans": "Outer covering of a 3D shape",
      "why": "Surface area is the total area of all outer faces of a solid"
    },
    {
      "q": "What is the formula for cube surface area?",
      "hint": "6 faces",
      "ans": "6 × side²",
      "why": "A cube has 6 equal square faces, so we multiply one face area by 6"
    }
  ]
);

add(
  "math",
  "measurement",
  "Real life applications",

  `<h2>Real Life Applications</h2>

<p>Mathematics is used to measure and design real-world spaces.</p>

<h3> NOTES (EXPLAINED)</h3>
<ul>
<li>Area is used in land, farming, and construction.</li>
<li>Volume is used in water tanks, containers, and storage.</li>
<li>Surface area is used in painting and wrapping objects.</li>
<li>Correct units must always be used (cm², m², cm³, m³).</li>
</ul>

<p><b> Key idea:</b> Different formulas solve different real-life measurement problems.</p>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using wrong formula for the situation</li>
<li>Confusing area (2D) with volume (3D)</li>
<li>Ignoring units (cm² vs cm³)</li>
<li>Misreading word problems</li>
</ul>

<h3> WORKED EXAMPLES</h3>

<ul>
<li>
<b>Example 1: Farming land</b><br>
Step 1: Measure length and width<br>
Step 2: Find area = L × W<br>
Step 3: Use result for crop planning<br>
<b>Answer: Area helps in land usage planning</b>
</li>

<li>
<b>Example 2: Water tank</b><br>
Step 1: Identify shape of tank<br>
Step 2: Use volume formula<br>
Step 3: Calculate capacity<br>
<b>Answer: Volume measures storage capacity</b>
</li>

<li>
<b>Example 3: Painting walls</b><br>
Step 1: Measure wall dimensions<br>
Step 2: Find surface area<br>
Step 3: Estimate paint needed<br>
<b>Answer: Surface area determines paint required</b>
</li>
</ul>

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Construction and architecture design</li>
<li>Agriculture land planning</li>
<li>Manufacturing and packaging</li>
<li>Interior decoration and painting</li>
</ul>
`,

  [
    {
      "q": "Why is volume important in real life?",
      "hint": "think containers",
      "ans": "It measures storage capacity",
      "why": "Volume tells us how much space an object can hold, such as water in a tank"
    },
    {
      "q": "When do we use area in real life?",
      "hint": "2D spaces",
      "ans": "To measure flat surfaces",
      "why": "Area is used for surfaces like land, floors, and walls"
    },
    {
      "q": "What is the difference between area and volume?",
      "hint": "dimensions",
      "ans": "Area is 2D, volume is 3D",
      "why": "Area measures flat surfaces, while volume measures space inside objects"
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
    },
    {
      "q": "A spinner gives 2 with probability 0.4 and 8 with probability 0.6. Find expected value",
      "hint": "multiply and add",
      "steps": [
        "Step 1: Compute 2 × 0.4 = 0.8",
        "Step 2: Compute 8 × 0.6 = 4.8",
        "Step 3: Add results 0.8 + 4.8",
        "Step 4: Final value"
      ],
      "ans": "5.6",
      "why": "Expected value averages outcomes based on probability weights"
    },
    {
      "q": "A risky investment returns 50 with probability 0.2 and -10 with probability 0.8. Find expected value",
      "hint": "include negative outcomes",
      "steps": [
        "Step 1: Compute 50 × 0.2 = 10",
        "Step 2: Compute (-10) × 0.8 = -8",
        "Step 3: Add 10 + (-8)",
        "Step 4: Final result"
      ],
      "ans": "2",
      "why": "Expected value includes both gains and losses weighted by probability"
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
  "Matrix Addition & Subtraction",

  `
<h2> Matrix Addition & Subtraction</h2>

<h3> DEEP NOTES</h3>
<p>
Matrices are rectangular arrays of numbers arranged in rows and columns. 
Addition and subtraction are only possible when matrices have the SAME dimensions.
</p>

<pre>
A = [1 2]      B = [5 6]
    [3 4]          [7 8]

A + B = [1+5  2+6]
        [3+7  4+8]
      = [6 8]
        [10 12]
</pre>

 This is called element-wise operation.

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Add matrices</p>
<pre>
A = [2 1],  B = [3 4]
</pre>

<p><b>Step 1:</b> Add corresponding elements</p>
<pre>
(2+3) , (1+4)
</pre>

<p><b>Step 2:</b> Compute</p>
<pre>
5 , 5
</pre>

<p><b>Final Answer:</b> [5 5]</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Add identity-style matrices</p>
<pre>
A = [1 0], B = [0 1]
</pre>

<p><b>Step 1:</b> Add elements</p>
<pre>
(1+0), (0+1)
</pre>

<p><b>Final Answer:</b> [1 1]</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Subtract matrices</p>
<pre>
A = [5 2], B = [1 3]
</pre>

<p><b>Step 1:</b> Subtract element-wise</p>
<pre>
(5-1), (2-3)
</pre>

<p><b>Final Answer:</b> [4 -1]</p>

---

<h3> DIAGRAM</h3>

<pre>
Same position elements → add or subtract → new matrix
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Computer graphics (image blending and filtering)</li>
<li>Data science (feature comparison and adjustments)</li>
<li>Game development (state updates in grids)</li>
</ul>

---
`,

  [
    {
      "q": "Add the matrices A = [[2, 5], [1, 3]] and B = [[4, 1], [6, 2]]",
      "hint": "add corresponding elements",
      "steps": [
        "Step 1: Check dimensions → both are 2×2 matrices",
        "Step 2: Add first row: (2+4, 5+1) = (6, 6)",
        "Step 3: Add second row: (1+6, 3+2) = (7, 5)",
        "Step 4: Write final matrix result",
        "Step 5: Combine into [[6,6],[7,5]]"
      ],
      "ans": "[[6,6],[7,5]]",
      "why": "Matrix addition is done element-by-element at the same positions"
    },
    {
      "q": "Subtract B = [[3, 7], [2, 5]] from A = [[9, 4], [6, 8]]",
      "hint": "element-wise subtraction",
      "steps": [
        "Step 1: Confirm both matrices are 2×2",
        "Step 2: Subtract first row: (9−3, 4−7) = (6, −3)",
        "Step 3: Subtract second row: (6−2, 8−5) = (4, 3)",
        "Step 4: Combine results into matrix form",
        "Step 5: Final matrix [[6,-3],[4,3]]"
      ],
      "ans": "[[6,-3],[4,3]]",
      "why": "Matrix subtraction is performed element-wise"
    },
    {
      "q": "Find A + B where A = [[1, -2, 3], [4, 0, 5]] and B = [[3, 2, -1], [6, 1, 2]]",
      "hint": "3-column matrices",
      "steps": [
        "Step 1: Confirm both are 2×3 matrices",
        "Step 2: Add first row: (1+3, -2+2, 3+(-1)) = (4, 0, 2)",
        "Step 3: Add second row: (4+6, 0+1, 5+2) = (10, 1, 7)",
        "Step 4: Write final result matrix",
        "Step 5: Combine into [[4,0,2],[10,1,7]]"
      ],
      "ans": "[[4,0,2],[10,1,7]]",
      "why": "Only matrices of equal size can be added element-wise"
    },
    {
      "q": "Why can't a 2×2 matrix be added to a 2×3 matrix?",
      "hint": "dimension rule",
      "steps": [
        "Step 1: Identify number of rows in both matrices",
        "Step 2: Identify number of columns in both matrices",
        "Step 3: Compare dimensions (2×2 vs 2×3)",
        "Step 4: Check element-by-element matching requirement",
        "Step 5: Conclude operation is invalid"
      ],
      "ans": "They have different dimensions",
      "why": "Matrix addition requires identical row and column structure"
    },
    {
      "q": "A matrix represents pixel data in an image. What happens when two matrices are added?",
      "hint": "image blending",
      "steps": [
        "Step 1: Treat matrices as pixel intensity values",
        "Step 2: Add corresponding pixel values",
        "Step 3: Observe intensity change",
        "Step 4: Result becomes combined image data"
      ],
      "ans": "They combine pixel values",
      "why": "Matrix addition is used in image processing to blend or modify images"
    }
  ]
);

add(
  "math",
  "matrices",
  "Matrix Multiplication",

  `
<h2> Matrix Multiplication</h2>

<h3> DEEP NOTES</h3>
<p>
Matrix multiplication is NOT done element-by-element. Instead, each entry in the result is obtained by multiplying rows of the first matrix with columns of the second matrix.
</p>

<pre>
A = [1 2]     B = [5]
    [3 4]         [6]

Step:
Row × Column

(1×5 + 2×6) = 17  
(3×5 + 4×6) = 39
</pre>
<h3> WORKED EXAMPLES (STEP BY STEP)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Multiply</p>
<pre>
|1 2|   |5|
|3 4| × |6|
</pre>
<p><b>Step 1:</b> First row × column</p>
<pre>
(1×5 + 2×6) = 17
</pre>
<p><b>Step 2:</b> Second row × column</p>
<pre>
(3×5 + 4×6) = 39
</pre>
<p><b>Final Answer:</b></p>
<pre>
|17|
|39|
</pre>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> Multiply any matrix by identity matrix</p>

<p><b>Step 1:</b> Identity matrix</p>
<pre>
I = |1 0|
    |0 1|
</pre>

<p><b>Step 2:</b> Multiply A × I</p>
<p><b>Result:</b> Original matrix remains unchanged</p>

<p><b>Final Answer:</b> A</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Scalar multiplication</p>

<p><b>Step 1:</b> Multiply each entry by scalar</p>
<pre>
2 × |1 2|
    |3 4|
</pre>

<p><b>Step 2:</b> Compute</p>
<pre>
|2 4|
|6 8|
</pre>

<p><b>Final Answer:</b> |2 4; 6 8|</p>

---

<h3> DIAGRAM</h3>

<pre>
Row of A  ×  Column of B  →  Entry in result matrix
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>3D graphics transformations (rotation, scaling)</li>
<li>AI neural networks (weight propagation)</li>
<li>Robotics motion control systems</li>
</ul>

---
`,

  [
    {
      "q": "Multiply A = [[1, 2], [3, 4]] by B = [[2, 0], [1, 2]]",
      "hint": "row by column (dot product)",
      "steps": [
        "Step 1: Check dimensions → A(2×2), B(2×2), multiplication possible",
        "Step 2: Compute first entry: (1×2 + 2×1) = 4",
        "Step 3: Compute second entry: (1×0 + 2×2) = 4",
        "Step 4: Compute third entry: (3×2 + 4×1) = 10",
        "Step 5: Compute fourth entry: (3×0 + 4×2) = 8",
        "Step 6: Form final matrix [[4,4],[10,8]]"
      ],
      "ans": "[[4,4],[10,8]]",
      "why": "Matrix multiplication uses row-by-column dot product rule"
    },
    {
      "q": "Multiply A = [[2, 1, 3]] by B = [[1], [2], [0]]",
      "hint": "row × column",
      "steps": [
        "Step 1: Confirm A is 1×3 and B is 3×1",
        "Step 2: Multiply (2×1) = 2",
        "Step 3: Multiply (1×2) = 2",
        "Step 4: Multiply (3×0) = 0",
        "Step 5: Add results 2 + 2 + 0",
        "Step 6: Final answer = 4"
      ],
      "ans": "4",
      "why": "Dot product of row and column vectors gives a scalar"
    },
    {
      "q": "Find A × I where A = [[5, 7], [2, 3]] and I = [[1, 0], [0, 1]]",
      "hint": "identity matrix property",
      "steps": [
        "Step 1: Multiply first row: (5×1 + 7×0, 5×0 + 7×1) = (5, 7)",
        "Step 2: Multiply second row: (2×1 + 3×0, 2×0 + 3×1) = (2, 3)",
        "Step 3: Form result matrix",
        "Step 4: Compare with original matrix",
        "Step 5: Observe no change"
      ],
      "ans": "[[5,7],[2,3]]",
      "why": "Identity matrix preserves original matrix values"
    },
    {
      "q": "Compute 3 × [[2, -1], [4, 0]] (scalar multiplication)",
      "hint": "multiply every entry",
      "steps": [
        "Step 1: Multiply 3 × 2 = 6",
        "Step 2: Multiply 3 × (-1) = -3",
        "Step 3: Multiply 3 × 4 = 12",
        "Step 4: Multiply 3 × 0 = 0",
        "Step 5: Form final matrix [[6,-3],[12,0]]"
      ],
      "ans": "[[6,-3],[12,0]]",
      "why": "Scalar multiplication scales every entry equally"
    },
    {
      "q": "Show why A×B ≠ B×A using A = [[1,2],[0,1]] and B = [[2,0],[3,1]]",
      "hint": "check both products",
      "steps": [
        "Step 1: Compute A×B = [[8,2],[3,1]]",
        "Step 2: Compute B×A = [[2,4],[3,7]]",
        "Step 3: Compare results",
        "Step 4: Observe they are different",
        "Step 5: Conclude multiplication is not commutative"
      ],
      "ans": "A×B ≠ B×A",
      "why": "Matrix multiplication depends on order of operations"
    }
  ]
);

add(
  "math",
  "matrices",
  "Determinants",

  `
<h2> Determinants</h2>

<h3> DEEP NOTES</h3>
<p>
A determinant is a single numerical value derived from a square matrix. It helps determine whether a matrix has an inverse and whether a system of equations has a unique solution.
</p>

<pre>
|a b|
|c d| = ad - bc
</pre>
<h3> WORKED EXAMPLES (STEP BY STEP)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Find determinant of</p>
<pre>
|1 2|
|3 4|
</pre>
<p><b>Step 1:</b> Apply formula</p>
<pre>
det = (1×4) - (2×3)
</pre>

<p><b>Step 2:</b> Compute</p>
<pre>
det = 4 - 6 = -2
</pre>

<p><b>Final Answer:</b> -2</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find determinant of</p>
<pre>
|5 1|
|2 3|
</pre>

<p><b>Step 1:</b> Multiply diagonals</p>
<pre>
(5×3) - (1×2)
</pre>

<p><b>Step 2:</b> Compute</p>
<pre>
15 - 2 = 13
</pre>

<p><b>Final Answer:</b> 13</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Find determinant of</p>
<pre>
|0 2|
|1 0|
</pre>

<p><b>Step 1:</b> Apply formula</p>
<pre>
(0×0) - (2×1)
</pre>

<p><b>Step 2:</b> Compute</p>
<pre>
0 - 2 = -2
</pre>

<p><b>Final Answer:</b> -2</p>

---

<h3> DIAGRAM</h3>

<pre>
Matrix → Cross multiplication → Single value (determinant)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Engineering: structural stability analysis</li>
<li>Physics: system equilibrium and motion analysis</li>
<li>Computer graphics: transformations and scaling effects</li>
</ul>

---
`,

  [
    {
      "q": "Find the determinant of A = [[3, 2], [5, 4]]",
      "hint": "use ad - bc",
      "steps": [
        "Step 1: Identify a = 3, b = 2, c = 5, d = 4",
        "Step 2: Compute ad = 3 × 4 = 12",
        "Step 3: Compute bc = 2 × 5 = 10",
        "Step 4: Subtract ad - bc = 12 - 10",
        "Step 5: Final determinant = 2"
      ],
      "ans": "2",
      "why": "Determinant is found using ad − bc for 2×2 matrices"
    },
    {
      "q": "Find determinant of A = [[6, 1], [3, 2]]",
      "hint": "cross multiplication",
      "steps": [
        "Step 1: Identify a = 6, b = 1, c = 3, d = 2",
        "Step 2: Compute ad = 6 × 2 = 12",
        "Step 3: Compute bc = 1 × 3 = 3",
        "Step 4: Subtract 12 - 3",
        "Step 5: Final determinant = 9"
      ],
      "ans": "9",
      "why": "Determinant measures scaling and invertibility of matrix"
    },
    {
      "q": "Find determinant of A = [[2, 5], [4, 10]]",
      "hint": "check zero result",
      "steps": [
        "Step 1: Compute ad = 2 × 10 = 20",
        "Step 2: Compute bc = 5 × 4 = 20",
        "Step 3: Subtract 20 - 20",
        "Step 4: Final determinant = 0",
        "Step 5: Interpret result"
      ],
      "ans": "0",
      "why": "Zero determinant means matrix is singular (not invertible)"
    },
    {
      "q": "Why does a zero determinant mean no inverse?",
      "hint": "singular matrix",
      "steps": [
        "Step 1: Understand determinant measures scaling",
        "Step 2: If determinant = 0, area collapses",
        "Step 3: No unique transformation exists",
        "Step 4: Therefore inverse cannot exist"
      ],
      "ans": "Matrix is not invertible",
      "why": "A zero determinant collapses space, removing reversibility"
    },
    {
      "q": "Find determinant of A = [[7, 3], [2, 6]]",
      "hint": "apply formula ad - bc",
      "steps": [
        "Step 1: Compute ad = 7 × 6 = 42",
        "Step 2: Compute bc = 3 × 2 = 6",
        "Step 3: Subtract 42 - 6",
        "Step 4: Final result = 36"
      ],
      "ans": "36",
      "why": "Determinant reflects scaling effect of matrix transformation"
    }
  ]
);

add(
  "math",
  "matrices",
  "Inverse Matrices",

  `
<h2> Inverse Matrices</h2>

<h3> DEEP NOTES</h3>
<p>
The inverse of a matrix reverses its effect when multiplied.
If A has an inverse, then:
</p>

<pre>
A × A⁻¹ = I
</pre>

<p>Where I is the identity matrix.</p>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Find inverse of</p>
<pre>
A = [2  1]
    [5  3]
</pre>

<p><b>Step 1:</b> Find determinant</p>
<pre>
det(A) = (2×3) - (1×5) = 6 - 5 = 1
</pre>

<p><b>Step 2:</b> Apply formula</p>
<pre>
A⁻¹ = (1/det) [ d  -b ]
              [ -c  a ]
</pre>

<p><b>Step 3:</b> Substitute values</p>
<pre>
A⁻¹ = [ 3  -1 ]
      [ -5  2 ]
</pre>

<p><b>Final Answer:</b> A⁻¹ = [[3, -1], [-5, 2]]</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Does inverse exist?</p>
<pre>
A = [1  2]
    [2  4]
</pre>

<p><b>Step 1:</b> Compute determinant</p>
<pre>
det(A) = (1×4) - (2×2) = 4 - 4 = 0
</pre>

<p><b>Step 2:</b> Conclusion</p>
<p><b>Final Answer:</b> No inverse exists</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What happens if A × A⁻¹?</p>

<p><b>Step 1:</b> Multiply matrix and its inverse</p>
<p><b>Step 2:</b> Result is identity matrix</p>

<p><b>Final Answer:</b> Identity matrix I</p>

---

<h3> DIAGRAM</h3>

<pre>
A × A⁻¹ = I
↓
Original → Reverse → Identity
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptography encryption & decryption</li>
<li>Solving simultaneous equations</li>
<li>Computer graphics transformations</li>
</ul>

---
`,

  [
    {
      "q": "Find the inverse of A = [[4, 7], [2, 6]] using formula A⁻¹ = (1/det(A)) × [[d, -b], [-c, a]]",
      "hint": "use determinant first",
      "steps": [
        "Step 1: Identify a = 4, b = 7, c = 2, d = 6",
        "Step 2: Compute determinant det(A) = ad - bc = (4×6) - (7×2)",
        "Step 3: Calculate det(A) = 24 - 14 = 10",
        "Step 4: Swap diagonal elements → [[6, 4]] becomes [[6, 4]] (place d and a)",
        "Step 5: Change signs of off-diagonal → [[6, -7], [-2, 4]]",
        "Step 6: Multiply by 1/det(A) = 1/10",
        "Step 7: Final inverse = (1/10)[[6, -7], [-2, 4]]"
      ],
      "ans": "(1/10)[[6, -7], [-2, 4]]",
      "why": "Inverse matrix reverses transformation using determinant scaling"
    },
    {
      "q": "Check if inverse exists for A = [[2, 4], [1, 2]]",
      "hint": "determinant test",
      "steps": [
        "Step 1: Compute det(A) = (2×2) - (4×1)",
        "Step 2: Calculate det(A) = 4 - 4",
        "Step 3: det(A) = 0",
        "Step 4: Conclude matrix is singular",
        "Step 5: Therefore inverse does not exist"
      ],
      "ans": "No inverse exists",
      "why": "Zero determinant means matrix cannot be reversed"
    },
    {
      "q": "Verify A × A⁻¹ for A = [[3, 0], [0, 2]]",
      "hint": "identity result",
      "steps": [
        "Step 1: Compute inverse = [[1/3, 0], [0, 1/2]]",
        "Step 2: Multiply A × A⁻¹",
        "Step 3: Multiply first row → (3×1/3, 0×1/2) = (1, 0)",
        "Step 4: Multiply second row → (0×1/3, 2×1/2) = (0, 1)",
        "Step 5: Result = [[1, 0], [0, 1]]"
      ],
      "ans": "Identity matrix",
      "why": "A matrix multiplied by its inverse always gives identity"
    },
    {
      "q": "Solve AX = B using inverse method where A = [[2,1],[1,1]] and B = [[3],[2]]",
      "hint": "X = A⁻¹B",
      "steps": [
        "Step 1: Compute det(A) = (2×1) - (1×1) = 1",
        "Step 2: Find inverse A⁻¹ = [[1, -1], [-1, 2]]",
        "Step 3: Multiply A⁻¹ by B",
        "Step 4: Compute row products",
        "Step 5: Final solution X = [[1], [1]]"
      ],
      "ans": "[[1],[1]]",
      "why": "Inverse method isolates variables in system AX = B"
    },
    {
      "q": "Why does a matrix need a non-zero determinant to have an inverse?",
      "hint": "invertibility condition",
      "steps": [
        "Step 1: Check determinant meaning",
        "Step 2: If det(A) = 0, space collapses",
        "Step 3: No unique reverse mapping exists",
        "Step 4: Therefore inverse cannot be defined"
      ],
      "ans": "det(A) ≠ 0",
      "why": "Only non-singular matrices preserve reversible transformations"
    }
  ]
);

add(
  "math",
  "matrices",
  "Solving Systems of Equations Using Matrices",

  `
<h2> Systems of Equations (Matrix Method)</h2>

<h3> DEEP NOTES</h3>
<p>
A system of linear equations can be written in matrix form as:</p>

<pre>
AX = B
</pre>

<p>Where:</p>
<ul>
  <li>A = coefficient matrix</li>
  <li>X = variable matrix</li>
  <li>B = constants matrix</li>
</ul>

<p>If A has an inverse, then:</p>

<pre>
X = A⁻¹B
</pre>
<h3> WORKED EXAMPLES (MATRIX METHOD ONLY)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Solve using matrix method</p>

<pre>
x + y = 5
x − y = 1
</pre>

<p><b>Step 1: Write in matrix form AX = B</b></p>

<pre>
A = [ 1  1 ]
    [ 1 -1 ]

X = [ x ]
    [ y ]

B = [ 5 ]
    [ 1 ]
</pre>

<p><b>Step 2: Find determinant of A</b></p>

<pre>
det(A) = (1×-1) − (1×1) = -2
</pre>

<p><b>Step 3: Find inverse of A</b></p>

<pre>
A⁻¹ = (1/-2) [ -1  -1 ]
             [ -1   1 ]
</pre>

<p><b>Step 4: Multiply X = A⁻¹B</b></p>

<pre>
X = (1/-2) [ -1  -1 ] [ 5 ]
           [ -1   1 ] [ 1 ]
</pre>

<p><b>Step 5: Perform multiplication</b></p>

<pre>
X = (1/-2) [ (-5 - 1) ]
           [ (-5 + 1) ]

X = (1/-2) [ -6 ]
           [ -4 ]
</pre>

<p><b>Step 6: Simplify</b></p>

<pre>
x = 3, y = 2
</pre>

<p><b>Final Answer:</b> (3, 2)</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Determine system type using matrix form</p>

<pre>
2x + 4y = 8
x + 2y = 4
</pre>

<p><b>Step 1: Write AX = B</b></p>

<pre>
A = [ 2  4 ]
    [ 1  2 ]
</pre>

<p><b>Step 2: Compute determinant</b></p>

<pre>
det(A) = (2×2 − 4×1) = 0
</pre>

<p><b>Step 3: Interpret result</b></p>

<p>Since det(A) = 0 → matrix is singular → no unique inverse exists</p>

<p><b>Step 4: Compare rows</b></p>

<pre>
Row2 = (1/2) Row1 AND RHS also matches
</pre>

<p><b>Final Answer:</b> Dependent system (infinite solutions)</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Solve system using matrix method</p>

<pre>
x + y = 2
x + y = 5
</pre>

<p><b>Step 1: Write AX = B</b></p>

<pre>
A = [ 1  1 ]
    [ 1  1 ]

B = [ 2 ]
    [ 5 ]
</pre>

<p><b>Step 2: Compute determinant</b></p>

<pre>
det(A) = (1×1 − 1×1) = 0
</pre>

<p><b>Step 3: Check consistency via matrix comparison</b></p>

<pre>
Same coefficient matrix but different constants
</pre>

<p><b>Step 4: Conclusion</b></p>

<p>No inverse exists and system contradicts</p>

<p><b>Final Answer:</b> No solution (inconsistent system)</p>

---

<h3> DIAGRAM</h3>

<pre>
AX = B
↓
det(A) ≠ 0 → X = A⁻¹B → Unique solution

det(A) = 0 → check consistency
        ↓
   dependent / inconsistent
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Economics: supply and demand systems</li>
<li>Physics: electrical circuit analysis</li>
<li>Computer science: AI and optimization models</li>
</ul>

---
`,

  [
    {
      "q": "What is matrix form of linear equations AX = B and how is X found?",
      "hint": "use inverse method",
      "steps": [
        "Step 1: Write system in matrix form AX = B",
        "Step 2: Multiply both sides by A⁻¹",
        "Step 3: A⁻¹AX = A⁻¹B",
        "Step 4: I·X = A⁻¹B",
        "Step 5: X = A⁻¹B"
      ],
      "ans": "X = A⁻¹B",
      "why": "Multiplying by inverse isolates the variable matrix"
    },
    {
      "q": "Solve for X when A = [[2,1],[1,3]] and B = [[5],[7]]",
      "hint": "use inverse of 2×2 matrix",
      "steps": [
        "Step 1: Compute determinant of A: (2×3 − 1×1) = 5",
        "Step 2: Find inverse A⁻¹ = (1/5)[[3, -1],[-1, 2]]",
        "Step 3: Multiply A⁻¹ by B",
        "Step 4: [[3, -1],[-1, 2]] × [[5],[7]]",
        "Step 5: = [[(15 - 7)], [(-5 + 14)]]",
        "Step 6: Multiply by 1/5",
        "Step 7: X = [[8/5],[9/5]]"
      ],
      "ans": "X = (8/5, 9/5)",
      "why": "Inverse matrix converts system into direct computation"
    },
    {
      "q": "When does a system AX = B have no solution using determinants?",
      "hint": "determinant condition",
      "steps": [
        "Step 1: Compute det(A)",
        "Step 2: Check if det(A) = 0",
        "Step 3: If det(A) = 0, check consistency",
        "Step 4: If inconsistent → no solution"
      ],
      "ans": "When det(A) = 0 and equations are inconsistent",
      "why": "Singular matrices cannot produce unique solutions"
    },
    {
      "q": "What happens when det(A) = 0 in AX = B?",
      "hint": "singular matrix",
      "steps": [
        "Step 1: Compute det(A)",
        "Step 2: If det(A) = 0, matrix is singular",
        "Step 3: Try row reduction",
        "Step 4: Check if system reduces to contradiction or dependency"
      ],
      "ans": "No unique solution (either infinite or none)",
      "why": "Zero determinant removes invertibility"
    },
    {
      "q": "Find X if A⁻¹ = [[1,0],[0,1]] and B = [[4],[6]]",
      "hint": "identity inverse case",
      "steps": [
        "Step 1: Recognize A⁻¹ is identity matrix",
        "Step 2: Multiply I × B",
        "Step 3: Result equals B unchanged"
      ],
      "ans": "X = [[4],[6]]",
      "why": "Identity matrix does not change any vector"
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

add(
  "math",
  "differential_equations",
  "Introduction to Differential Equations",

  `
<h2> Introduction to Differential Equations</h2>

<h3> DEEP NOTES</h3>
<p>
A differential equation is an equation that contains a function and its derivative.
It describes how a quantity changes continuously over time or space.
</p>

<pre>
dy/dx = f(x, y)
</pre>

 It models real-life change over time.
<h3> EXAMPLES (MATHEMATICAL CALCULATION STYLE)</h3>

<p><b>Example 1:</b> dy/dx = x</p>
<p><b>Step 1:</b> Recognize differential equation → dy/dx = x</p>
<p><b>Step 2:</b> Rewrite as dy = x dx</p>
<p><b>Step 3:</b> Integrate both sides → ∫ dy = ∫ x dx</p>
<p><b>Step 4:</b> Solve integrals → y = x²/2 + C</p>
<p><b>Answer:</b> y = x²/2 + C</p>
<p><b>Why:</b> slope function integrated gives original function</p>

<br>

<p><b>Example 2:</b> dy/dx = y</p>
<p><b>Step 1:</b> Rewrite equation → dy/dx = y</p>
<p><b>Step 2:</b> Separate variables → dy/y = dx</p>
<p><b>Step 3:</b> Integrate both sides → ∫ (1/y) dy = ∫ dx</p>
<p><b>Step 4:</b> Solve integrals → ln|y| = x + C</p>
<p><b>Step 5:</b> Exponentiate → y = e^(x + C)</p>
<p><b>Final Answer:</b> y = Ce^x</p>
<p><b>Why:</b> proportional growth leads to exponential function</p>

<br>

<p><b>Example 3:</b> dy/dx = x + y</p>
<p><b>Step 1:</b> Rewrite equation → dy/dx - y = x</p>
<p><b>Step 2:</b> Identify linear differential form</p>
<p><b>Step 3:</b> Multiply by integrating factor e^(-x)</p>
<p><b>Step 4:</b> Rewrite → d/dx (y e^(-x)) = x e^(-x)</p>
<p><b>Step 5:</b> Integrate both sides</p>
<p><b>Step 6:</b> Solve for y</p>
<p><b>Answer:</b> y = Ce^x - x - 1</p>
<p><b>Why:</b> mixed dependence requires integrating factor method</p>

---

<h3> DIAGRAM (MATHEMATICAL INTERPRETATION)</h3>

<pre>
dy/dx = slope function

x → increases → slope changes
y → depends on x

Solution evolves as:
differential equation → integration → function
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Population growth models</li>
<li>Cooling of hot objects</li>
<li>Spread of diseases</li>
</ul>
`,

  [
    {
      "q": "Rewrite dy/dx = 2x as a differential equation and solve for y",
      "hint": "integrate both sides",
      "steps": [
        "Step 1: Start with dy/dx = 2x",
        "Step 2: Rewrite as dy = 2x dx",
        "Step 3: Integrate both sides → ∫dy = ∫2x dx",
        "Step 4: Solve integrals → y = x² + C"
      ],
      "ans": "y = x² + C",
      "why": "Integration reverses differentiation to recover function"
    },
    {
      "q": "Solve dy/dx = 3y using separation of variables",
      "hint": "separate y and x",
      "steps": [
        "Step 1: dy/dx = 3y",
        "Step 2: Rearrange → dy/y = 3dx",
        "Step 3: Integrate both sides → ∫(1/y)dy = ∫3dx",
        "Step 4: ln|y| = 3x + C",
        "Step 5: Exponentiate → y = Ce^(3x)"
      ],
      "ans": "y = Ce^(3x)",
      "why": "Growth proportional to value gives exponential solution"
    },
    {
      "q": "Show how dy/dx models continuous change in y = x²",
      "hint": "differentiate function",
      "steps": [
        "Step 1: Start with y = x²",
        "Step 2: Differentiate → dy/dx = 2x",
        "Step 3: Substitute values of x (e.g., x = 1,2,3)",
        "Step 4: Observe slope changes with x",
        "Step 5: Conclude rate is not constant"
      ],
      "ans": "dy/dx = 2x",
      "why": "Derivative shows how function changes continuously"
    },
    {
      "q": "Interpret dy/dx = x + y using algebraic rearrangement",
      "hint": "mixed variables",
      "steps": [
        "Step 1: Start with dy/dx = x + y",
        "Step 2: Rearrange → dy/dx - y = x",
        "Step 3: Recognize linear differential equation form",
        "Step 4: Identify need for integrating factor method"
      ],
      "ans": "linear differential equation",
      "why": "Both variables affect rate of change simultaneously"
    }
  ]
);

add(
  "math",
  "differential_equations",
  "Growth and Decay Models",

  `
<h2> Growth and Decay Models</h2>

<h3> DEEP NOTES</h3>
<p>
Used when a quantity increases or decreases at a rate proportional to its current value.
</p>

<pre>
dy/dt = ky
</pre>

 k > 0 → growth  
 k < 0 → decay  
<h3> EXAMPLES (MATHEMATICAL CALCULATION STYLE)</h3>

<p><b>Example 1:</b> population growth model dy/dt = 2y</p>
<p><b>Step 1:</b> Write equation → dy/dt = 2y</p>
<p><b>Step 2:</b> Separate variables → dy/y = 2dt</p>
<p><b>Step 3:</b> Integrate both sides → ∫(1/y)dy = ∫2dt</p>
<p><b>Step 4:</b> ln|y| = 2t + C</p>
<p><b>Step 5:</b> Exponentiate → y = Ce^(2t)</p>
<p><b>Answer:</b> y = Ce^(2t)</p>
<p><b>Why:</b> rate proportional to current value leads to exponential growth</p>

<br>

<p><b>Example 2:</b> radioactive decay dy/dt = -3y</p>
<p><b>Step 1:</b> Write equation → dy/dt = -3y</p>
<p><b>Step 2:</b> Separate variables → dy/y = -3dt</p>
<p><b>Step 3:</b> Integrate both sides → ∫(1/y)dy = ∫-3dt</p>
<p><b>Step 4:</b> ln|y| = -3t + C</p>
<p><b>Step 5:</b> Exponentiate → y = Ce^(-3t)</p>
<p><b>Answer:</b> y = Ce^(-3t)</p>
<p><b>Why:</b> negative rate constant produces exponential decay</p>

<br>

<p><b>Example 3:</b> classify model from dy/dt ∝ y</p>
<p><b>Step 1:</b> Write proportionality → dy/dt = ky</p>
<p><b>Step 2:</b> Separate variables → dy/y = k dt</p>
<p><b>Step 3:</b> Integrate → ln|y| = kt + C</p>
<p><b>Step 4:</b> Exponentiate → y = Ce^(kt)</p>
<p><b>Step 5:</b> If k > 0 → growth, if k < 0 → decay</p>
<p><b>Answer:</b> exponential growth/decay model</p>
<p><b>Why:</b> solution depends on sign of constant k</p>

<h3> DIAGRAM (MATHEMATICAL INTERPRETATION)</h3>

<pre>
dy/dt = ky

k > 0  → exponential growth:    y = Ce^(kt)
k < 0  → exponential decay:     y = Ce^(kt)

Behavior depends on sign of k
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Bacteria reproduction</li>
<li>Radioactive material decay</li>
<li>Bank interest growth</li>
</ul>
`,

  [
    {
      "q": "Solve dy/dt = 4y with initial condition y = 3 when t = 0",
      "hint": "use separation of variables",
      "steps": [
        "Step 1: Write dy/dt = 4y",
        "Step 2: Separate variables → dy/y = 4dt",
        "Step 3: Integrate both sides → ∫(1/y)dy = ∫4dt",
        "Step 4: ln|y| = 4t + C",
        "Step 5: Exponentiate → y = Ce^(4t)",
        "Step 6: Apply initial condition y(0)=3 → 3 = C"
      ],
      "ans": "y = 3e^(4t)",
      "why": "Initial condition determines constant of integration"
    },
    {
      "q": "Solve dy/dt = -2y with y = 8 at t = 0",
      "hint": "decay model",
      "steps": [
        "Step 1: Write dy/dt = -2y",
        "Step 2: Separate variables → dy/y = -2dt",
        "Step 3: Integrate → ∫(1/y)dy = ∫-2dt",
        "Step 4: ln|y| = -2t + C",
        "Step 5: Exponentiate → y = Ce^(-2t)",
        "Step 6: Substitute y(0)=8 → C = 8"
      ],
      "ans": "y = 8e^(-2t)",
      "why": "Negative constant produces exponential decay"
    },
    {
      "q": "If dy/dt = ky and y doubles in 3 hours, find relation of k",
      "hint": "use exponential model",
      "steps": [
        "Step 1: Write general solution y = Ce^(kt)",
        "Step 2: Let initial value y(0) = C",
        "Step 3: After 3 hours → y(3) = 2C",
        "Step 4: Substitute → 2C = Ce^(3k)",
        "Step 5: Cancel C → 2 = e^(3k)",
        "Step 6: Take ln → ln2 = 3k"
      ],
      "ans": "k = ln2 / 3",
      "why": "Doubling condition determines growth rate"
    },
    {
      "q": "Find k if y = 5e^(kt) and y becomes 20 when t = 2",
      "hint": "substitution in exponential",
      "steps": [
        "Step 1: Write equation y = 5e^(kt)",
        "Step 2: Substitute y = 20, t = 2",
        "Step 3: 20 = 5e^(2k)",
        "Step 4: Divide → 4 = e^(2k)",
        "Step 5: Take ln → ln4 = 2k",
        "Step 6: Solve → k = ln4 / 2"
      ],
      "ans": "k = ln4 / 2",
      "why": "Exponential constant is found using known values"
    },
    {
      "q": "Show why k controls growth or decay in dy/dt = ky",
      "hint": "sign of k",
      "steps": [
        "Step 1: Solve dy/dt = ky → y = Ce^(kt)",
        "Step 2: If k > 0, exponent increases with t",
        "Step 3: If k < 0, exponent decreases with t",
        "Step 4: Evaluate behavior as t → ∞",
        "Step 5: k > 0 → y increases",
        "Step 6: k < 0 → y approaches 0"
      ],
      "ans": "k determines growth or decay",
      "why": "Sign of exponent controls long-term behavior"
    }
  ]
);

add(
  "math",
  "differential_equations",
  "Population Models",

  `
<h2> Population Models</h2>

<h3> DEEP NOTES</h3>
<p>
Population change depends on birth rate, death rate, and resource limitations.
This is commonly modeled using a logistic differential equation.
</p>

<pre>
dP/dt = kP(1 - P/K)
</pre>

 K = carrying capacity
<h3> EXAMPLES (MATHEMATICAL CALCULATION STYLE)</h3>

<p><b>Example 1:</b> logistic growth equation</p>
<p><b>Step 1:</b> Start with dP/dt = kP(1 - P/K)</p>
<p><b>Step 2:</b> If P ≪ K, then P/K ≈ 0</p>
<p><b>Step 3:</b> Simplify → (1 - P/K) ≈ 1</p>
<p><b>Step 4:</b> Substitute → dP/dt ≈ kP</p>
<p><b>Step 5:</b> Solve → P = Ce^(kt)</p>
<p><b>Answer:</b> exponential growth for small P</p>
<p><b>Why:</b> limited resources are not yet affecting growth</p>

<br>

<p><b>Example 2:</b> equilibrium condition of population</p>
<p><b>Step 1:</b> Start with dP/dt = kP(1 - P/K)</p>
<p><b>Step 2:</b> Set equilibrium → dP/dt = 0</p>
<p><b>Step 3:</b> Solve → kP(1 - P/K) = 0</p>
<p><b>Step 4:</b> Solutions: P = 0 or P = K</p>
<p><b>Step 5:</b> Interpret values</p>
<p><b>Answer:</b> P = K is stable population level</p>
<p><b>Why:</b> growth stops when carrying capacity is reached</p>

<br>

<p><b>Example 3:</b> why growth slows in logistic model</p>
<p><b>Step 1:</b> Start with dP/dt = kP(1 - P/K)</p>
<p><b>Step 2:</b> Expand factor → growth rate = kP - (kP²/K)</p>
<p><b>Step 3:</b> As P increases, P² increases faster</p>
<p><b>Step 4:</b> So (kP²/K) increases</p>
<p><b>Step 5:</b> Net growth decreases</p>
<p><b>Answer:</b> growth slows due to negative feedback</p>
<p><b>Why:</b> competition reduces available resources</p>

<h3> DIAGRAM (MATHEMATICAL INTERPRETATION)</h3>

<pre>
dP/dt = kP(1 - P/K)

Case 1: P → 0   → dP/dt ≈ kP (exponential growth)
Case 2: P → K   → dP/dt = 0 (equilibrium)
Case 3: P > 0   → growth slows due to (1 - P/K)

Curve:
fast growth → slow growth → saturation at K
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Ecology systems</li>
<li>Urban planning</li>
<li>Wildlife conservation</li>
</ul>

---
`,

  [
    {
      "q": "Find carrying capacity effect when dP/dt = kP(1 - P/K) and P = K/2",
      "hint": "substitute into model",
      "steps": [
        "Step 1: Start with dP/dt = kP(1 - P/K)",
        "Step 2: Substitute P = K/2",
        "Step 3: dP/dt = k(K/2)(1 - (K/2)/K)",
        "Step 4: Simplify fraction → (K/2)/K = 1/2",
        "Step 5: dP/dt = k(K/2)(1 - 1/2)",
        "Step 6: dP/dt = k(K/2)(1/2)",
        "Step 7: Final result → dP/dt = kK/4"
      ],
      "ans": "kK/4",
      "why": "Growth is half-maximized at half carrying capacity"
    },
    {
      "q": "Show why growth becomes zero at carrying capacity",
      "hint": "set derivative to zero",
      "steps": [
        "Step 1: Start with dP/dt = kP(1 - P/K)",
        "Step 2: Set dP/dt = 0",
        "Step 3: kP(1 - P/K) = 0",
        "Step 4: Solve factors → P = 0 or 1 - P/K = 0",
        "Step 5: Solve second case → P = K",
        "Step 6: Substitute P = K back → dP/dt = 0"
      ],
      "ans": "growth = 0 at P = K",
      "why": "No net growth occurs when environment is saturated"
    },
    {
      "q": "Explain why population grows fastest when P is small in logistic model",
      "hint": "approximation",
      "steps": [
        "Step 1: Start with dP/dt = kP(1 - P/K)",
        "Step 2: If P is very small, P/K ≈ 0",
        "Step 3: Simplify → (1 - P/K) ≈ 1",
        "Step 4: dP/dt ≈ kP",
        "Step 5: Recognize exponential growth form",
        "Step 6: Growth rate is proportional to population"
      ],
      "ans": "rapid exponential growth",
      "why": "Resources are effectively unlimited at low population"
    },
    {
      "q": "Find behavior of growth when P > K",
      "hint": "sign of factor",
      "steps": [
        "Step 1: Start with dP/dt = kP(1 - P/K)",
        "Step 2: If P > K, then P/K > 1",
        "Step 3: So (1 - P/K) becomes negative",
        "Step 4: dP/dt becomes negative",
        "Step 5: Population decreases over time"
      ],
      "ans": "population declines",
      "why": "Overpopulation leads to negative growth due to lack of resources"
    },
    {
      "q": "Determine equilibrium points of logistic equation",
      "hint": "set growth to zero",
      "steps": [
        "Step 1: Start with dP/dt = kP(1 - P/K)",
        "Step 2: Set dP/dt = 0",
        "Step 3: Solve kP(1 - P/K) = 0",
        "Step 4: P = 0 or P = K",
        "Step 5: Interpret both solutions"
      ],
      "ans": "P = 0 and P = K",
      "why": "Both represent stable or extinction equilibrium states"
    }
  ]
);

add(
  "math",
  "differential_equations",
  "Motion Equations",

  `
<h2> Motion Equations</h2>

<h3> DEEP NOTES</h3>
<p>
Motion is described using derivatives of displacement, velocity, and acceleration.
</p>

<pre>
v = ds/dt  
a = dv/dt
</pre>
<h3> EXAMPLES (MATHEMATICAL CALCULATION STYLE)</h3>

<p><b>Example 1:</b> velocity from position function</p>
<p><b>Question:</b> If s(t) = t² + 4t + 1, find velocity v(t)</p>
<p><b>Hint:</b> differentiate position</p>

<p><b>Steps:</b></p>
<p>Step 1: Write s(t) = t² + 4t + 1</p>
<p>Step 2: Apply differentiation → v(t) = ds/dt</p>
<p>Step 3: Differentiate term by term → d(t²)/dt = 2t</p>
<p>Step 4: d(4t)/dt = 4</p>
<p>Step 5: d(1)/dt = 0</p>
<p>Step 6: Combine results → v(t) = 2t + 4</p>

<p><b>Answer:</b> v(t) = 2t + 4</p>
<p><b>Why:</b> velocity is rate of change of displacement</p>

<br>

<p><b>Example 2:</b> acceleration from velocity function</p>
<p><b>Question:</b> If v(t) = 3t² + 2t, find acceleration</p>
<p><b>Hint:</b> differentiate velocity</p>

<p><b>Steps:</b></p>
<p>Step 1: Write v(t) = 3t² + 2t</p>
<p>Step 2: a(t) = dv/dt</p>
<p>Step 3: Differentiate 3t² → 6t</p>
<p>Step 4: Differentiate 2t → 2</p>
<p>Step 5: Combine → a(t) = 6t + 2</p>

<p><b>Answer:</b> a(t) = 6t + 2</p>
<p><b>Why:</b> acceleration is derivative of velocity</p>

<br>

<p><b>Example 3:</b> motion with constant acceleration</p>
<p><b>Question:</b> If a(t) = 4, find velocity function given v(0)=3</p>

<p><b>Steps:</b></p>
<p>Step 1: a(t) = dv/dt = 4</p>
<p>Step 2: Rewrite → dv = 4dt</p>
<p>Step 3: Integrate both sides → v = ∫4dt</p>
<p>Step 4: v(t) = 4t + C</p>
<p>Step 5: Apply initial condition v(0)=3 → C = 3</p>
<p>Step 6: Final result → v(t) = 4t + 3</p>

<p><b>Answer:</b> v(t) = 4t + 3</p>
<p><b>Why:</b> integrating acceleration gives velocity</p>

<br>

<h3> DIAGRAM</h3>

<pre>
s(t) = position
v(t) = ds/dt
a(t) = d²s/dt²

t → differentiation chain:
s(t) → v(t) → a(t)
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Car braking systems</li>
<li>Rocket launch trajectory</li>
<li>Sports motion tracking</li>
</ul>

---
`,

  [
    {
      "q": "Find velocity if s(t) = 4t² + 6t - 3",
      "hint": "differentiate displacement",
      "steps": [
        "Step 1: Write s(t) = 4t² + 6t - 3",
        "Step 2: Use v(t) = ds/dt",
        "Step 3: Differentiate 4t² → 8t",
        "Step 4: Differentiate 6t → 6",
        "Step 5: Differentiate -3 → 0",
        "Step 6: Combine results → v(t) = 8t + 6"
      ],
      "ans": "v(t) = 8t + 6",
      "why": "Velocity is derivative of displacement"
    },
    {
      "q": "Find acceleration if v(t) = 7t² - 4t + 1",
      "hint": "differentiate velocity",
      "steps": [
        "Step 1: Write v(t) = 7t² - 4t + 1",
        "Step 2: Use a(t) = dv/dt",
        "Step 3: Differentiate 7t² → 14t",
        "Step 4: Differentiate -4t → -4",
        "Step 5: Differentiate 1 → 0",
        "Step 6: Combine results → a(t) = 14t - 4"
      ],
      "ans": "a(t) = 14t - 4",
      "why": "Acceleration is derivative of velocity"
    },
    {
      "q": "If a particle has constant velocity v = 12, find acceleration",
      "hint": "constant means derivative is zero",
      "steps": [
        "Step 1: Write v = 12 (constant)",
        "Step 2: Use a = dv/dt",
        "Step 3: Differentiate constant → 0",
        "Step 4: a = 0"
      ],
      "ans": "0",
      "why": "Constant velocity means no change over time"
    },
    {
      "q": "If acceleration a(t) = 5, find velocity given v(0) = 2",
      "hint": "integrate acceleration",
      "steps": [
        "Step 1: Write a(t) = dv/dt = 5",
        "Step 2: Rewrite → dv = 5dt",
        "Step 3: Integrate → v = ∫5dt",
        "Step 4: v(t) = 5t + C",
        "Step 5: Use v(0) = 2 → C = 2"
      ],
      "ans": "v(t) = 5t + 2",
      "why": "Integrating acceleration gives velocity"
    }
  ]
);

add(
  "math",
  "differential_equations",
  "First-Order Differential Equations",

  `
<h2> First-Order Differential Equations</h2>

<h3> DEEP NOTES</h3>
<p>
These involve only the first derivative (dy/dx), describing how a quantity changes with respect to another variable.
</p>

<pre>
dy/dx = f(x, y)
</pre>
---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> dy/dx = x + y</p>
<p><b>Example 2:</b> dy/dx = xy</p>
<p><b>Example 3:</b> dy/dx = y/x</p>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Solve dy/dx = x when y(0) = 0</p>
<p><b>Hint:</b> integrate both sides</p>
<p><b>Answer:</b> y = x²/2</p>
<p><b>Explanation:</b> dy/dx = x → integrate: y = ∫x dx = x²/2 + C.  
Using y(0)=0 gives C = 0.</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Solve dy/dx = 2x</p>
<p><b>Hint:</b> integrate power rule</p>
<p><b>Answer:</b> y = x² + C</p>
<p><b>Explanation:</b> y = ∫2x dx = 2(x²/2) + C = x² + C</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Solve dy/dx = 3y</p>
<p><b>Hint:</b> separate variables</p>
<p><b>Answer:</b> y = Ce^(3x)</p>
<p><b>Explanation:</b> dy/dx = 3y → dy/y = 3dx  
Integrate: ln|y| = 3x + C → y = Ce^(3x)</p>

---

<h3> DIAGRAM</h3>

<pre>
Exponential growth curve:

y
|
|        /
|      /
|    /
|  /
|_/________________ x
</pre>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Heat transfer problems</li>
<li>Electrical circuits</li>
<li>Biological growth systems</li>
</ul>

---
`,

  [
    {
      "q": "Solve dy/dx = 5x²",
      "hint": "integrate both sides",
      "steps": [
        "Step 1: Start with dy/dx = 5x²",
        "Step 2: Rewrite as dy = 5x² dx",
        "Step 3: Integrate both sides → y = ∫5x² dx",
        "Step 4: Apply power rule → ∫x² dx = x³/3",
        "Step 5: Multiply constant → y = 5(x³/3)",
        "Step 6: Final answer → y = (5/3)x³ + C"
      ],
      "ans": "y = (5/3)x³ + C",
      "why": "Integration reverses differentiation"
    },
    {
      "q": "Solve dy/dx = 4x + 2 with y(0) = 3",
      "hint": "integrate and use condition",
      "steps": [
        "Step 1: dy/dx = 4x + 2",
        "Step 2: Integrate → y = ∫(4x + 2) dx",
        "Step 3: Split → ∫4x dx + ∫2 dx",
        "Step 4: Compute → 2x² + 2x + C",
        "Step 5: Use y(0) = 3",
        "Step 6: 3 = C",
        "Step 7: Final answer → y = 2x² + 2x + 3"
      ],
      "ans": "y = 2x² + 2x + 3",
      "why": "Initial conditions determine constant of integration"
    },
    {
      "q": "Solve dy/dx = y/x (separable form)",
      "hint": "separate variables",
      "steps": [
        "Step 1: dy/dx = y/x",
        "Step 2: Rearrange → dy/y = dx/x",
        "Step 3: Integrate both sides",
        "Step 4: ∫(1/y)dy = ∫(1/x)dx",
        "Step 5: ln|y| = ln|x| + C",
        "Step 6: Exponentiate → y = Cx"
      ],
      "ans": "y = Cx",
      "why": "Separable equations integrate on both sides"
    },
    {
      "q": "Solve dy/dx = 6",
      "hint": "constant derivative",
      "steps": [
        "Step 1: dy/dx = 6",
        "Step 2: Integrate both sides",
        "Step 3: y = ∫6 dx",
        "Step 4: y = 6x + C"
      ],
      "ans": "y = 6x + C",
      "why": "Constant derivative integrates to linear function"
    }
  ]
);

add(
  "math",
  "proofs",
  "Direct Proof",

  `
<h2> Direct Proof</h2>

<h3> DEEP NOTES</h3>
<p>
A direct proof shows that a statement is true by starting from known facts, definitions, or axioms and applying logical steps until the conclusion is reached.
</p>

<pre>
Given facts → logical reasoning → conclusion 
</pre>

 No assumptions of falsehood and no contradiction—just clear step-by-step deduction.

---

<h3> CORE IDEA</h3>
<pre>
Start with true statement
Apply definitions and rules
Reach required result
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: Even + Even = Even</b></p>
<p><b>Question:</b> Prove that the sum of two even numbers is even.</p>
<p><b>Step 1:</b> Let numbers be 2a and 2b</p>
<p><b>Step 2:</b> Add: 2a + 2b = 2(a + b)</p>
<p><b>Step 3:</b> Since (a + b) is integer</p>
<p><b>Final Answer:</b> Result is even</p>

<br>

<p><b>Example 2: Odd + Odd = Even</b></p>
<p><b>Question:</b> Prove that the sum of two odd numbers is even.</p>
<p><b>Step 1:</b> Let numbers be (2a+1) and (2b+1)</p>
<p><b>Step 2:</b> Add: 2a+1 + 2b+1 = 2(a+b+1)</p>
<p><b>Step 3:</b> Expression is multiple of 2</p>
<p><b>Final Answer:</b> Sum is even</p>

<br>

<p><b>Example 3: Even number property</b></p>
<p><b>Question:</b> Prove 2n is always even.</p>
<p><b>Step 1:</b> Let n be an integer</p>
<p><b>Step 2:</b> Multiply by 2 → 2n</p>
<p><b>Step 3:</b> Definition of even number satisfied</p>
<p><b>Final Answer:</b> 2n is even</p>

---

<h3> DIAGRAM</h3>

<pre>
Start → apply definitions → logical steps → conclusion 
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Software correctness verification</li>
<li>Engineering safety proofs</li>
<li>Algorithm correctness validation</li>
<li>Mathematical property derivation</li>
</ul>

---
`,

  [
    {
      "q": "Prove that the sum of two even numbers is even",
      "hint": "use definition 2k",
      "steps": [
        "Step 1: Let numbers be 2a and 2b",
        "Step 2: Write 2a + 2b",
        "Step 3: Factor out 2 → 2(a + b)",
        "Step 4: Let k = a + b",
        "Step 5: Result is 2k which is even"
      ],
      "ans": "2(a + b)",
      "why": "Even numbers have form 2k"
    },
    {
      "q": "Prove 3 is irrational",
      "hint": "assume 3=a/b contradiction",
      "steps": [
        "Step 1: Assume 3 is rational → 3 = a/b",
        "Step 2: Cross-multiply → 3b = a",
        "Step 3: This means a is multiple of 3",
        "Step 4: But we assumed simplest form",
        "Step 5: Contradiction! So 3 is irrational"
      ],
      "ans": "irrational",
      "why": "Contradiction arises from assumption"
    },
    {
      "q": "Prove if n² is even, then n is even",
      "hint": "prove contrapositive",
      "steps": [
        "Step 1: Assume n is odd",
        "Step 2: n = 2k + 1",
        "Step 3: n² = (2k + 1)² = 4k² + 4k + 1",
        "Step 4: n² = 2(2k² + 2k) + 1",
        "Step 5: n² is odd",
        "Step 6: Contrapositive true, so original statement true"
      ],
      "ans": "even",
      "why": "Proof by contrapositive"
    },
    {
      "q": "Prove there are infinite primes",
      "hint": " Euclid's proof",
      "steps": [
        "Step 1: Assume finite primes: p1, p2, ..., pn",
        "Step 2: Construct N = (p1×p2×...×pn) + 1",
        "Step 3: N is not divisible by any pi",
        "Step 4: Must have new prime factor",
        "Step 5: Contradiction to assumption of finiteness"
      ],
      "ans": "infinite primes",
      "why": "Contradiction shows assumption false"
    }
  ]
);

add(
  "math",
  "proofs",
  "Proof by Contradiction",

  `
<h2> Proof by Contradiction</h2>

<h3> DEEP NOTES</h3>
<p>
Proof by contradiction works by assuming that the statement is false, then logically showing that this assumption leads to an impossibility (a contradiction). Therefore, the original statement must be true.
</p>

<pre>
Assume statement is false → logical contradiction  → statement is true 
</pre>

---

<h3> CORE IDEA</h3>
<pre>
1. Assume opposite of what you want to prove
2. Follow logical consequences
3. Reach contradiction
4. Conclude original statement is true
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: √2 is irrational</b></p>
<p><b>Question:</b> Why is √2 irrational?</p>
<p><b>Step 1:</b> Assume √2 is rational</p>
<p><b>Step 2:</b> Write √2 = a/b in simplest form</p>
<p><b>Step 3:</b> Show both a and b become even</p>
<p><b>Step 4:</b> Contradiction (not simplest form)</p>
<p><b>Final Answer:</b> √2 is irrational</p>

<br>

<p><b>Example 2: No smallest positive real number</b></p>
<p><b>Question:</b> Does a smallest positive real number exist?</p>
<p><b>Step 1:</b> Assume such a number exists = x</p>
<p><b>Step 2:</b> Consider x/2</p>
<p><b>Step 3:</b> x/2 is smaller but still positive</p>
<p><b>Step 4:</b> Contradiction</p>
<p><b>Final Answer:</b> No smallest positive real number exists</p>

<br>

<p><b>Example 3: Infinite primes (idea)</b></p>
<p><b>Question:</b> Are primes finite?</p>
<p><b>Step 1:</b> Assume only finitely many primes exist</p>
<p><b>Step 2:</b> Construct number not divisible by listed primes</p>
<p><b>Step 3:</b> Contradiction occurs</p>
<p><b>Final Answer:</b> There are infinitely many primes</p>

---

<h3> DIAGRAM</h3>

<pre>
Assume false → logical steps → contradiction  → conclusion true 
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptography security proofs</li>
<li>Mathematical theorem validation</li>
<li>Algorithm correctness verification</li>
<li>Logical security system design</li>
</ul>

---
`,

  [
    {
      "q": "Prove 1 + 3 + 5 + ... + (2n-1) = n²",
      "hint": "use induction template",
      "steps": [
        "Step 1: Base case: n=1 → LHS = 1, RHS = 1² = 1. True.",
        "Step 2: Assume true for n=k: 1 + ... + (2k-1) = k²",
        "Step 3: Show for n=k+1: 1 + ... + (2k-1) + (2k+1) = (k+1)²",
        "Step 4: Use assumption → k² + (2k+1) = (k+1)²",
        "Step 5: Simplify → k² + 2k + 1 = (k+1)²",
        "Step 6: Conclusion: holds for all n"
      ],
      "ans": "n²",
      "why": "Induction proves base case and inductive step"
    },
    {
      "q": "Prove n < 2ⁿ",
      "hint": "show true for n=1, then assume and prove step",
      "steps": [
        "Step 1: Base case n=1: 1 < 2¹ = 2. True.",
        "Step 2: Assume k < 2ᵏ",
        "Step 3: Show k+1 < 2ᵏ⁺¹",
        "Step 4: k+1 < 2ᵏ + 1 (from assumption)",
        "Step 5: Since 1 < 2ᵏ (for k≥1), then 2ᵏ + 1 < 2ᵏ + 2ᵏ = 2ᵏ⁺¹",
        "Step 6: Combine → k+1 < 2ᵏ⁺¹"
      ],
      "ans": "True",
      "why": "Two-part induction proof structure"
    },
    {
      "q": "Prove 3ⁿ - 1 is divisible by 2",
      "hint": "factor or use pattern",
      "steps": [
        "Step 1: Base case n=1: 3¹ - 1 = 2 (divisible by 2)",
        "Step 2: Assume 3ᵏ - 1 = 2m for some integer m",
        "Step 3: Consider 3ᵏ⁺¹ - 1 = 3(3ᵏ) - 1",
        "Step 4: = 3(2m + 1) - 1 = 6m + 3 - 1 = 6m + 2",
        "Step 5: = 2(3m + 1) (divisible by 2)",
        "Step 6: Conclusion: true for all n"
      ],
      "ans": "divisible by 2",
      "why": "Shows divisibility extends step by step"
    },
    {
      "q": "Prove n³ - n is divisible by 3",
      "hint": "factor into 3 consecutive integers",
      "steps": [
        "Step 1: n³ - n = n(n²-1) = n(n-1)(n+1)",
        "Step 2: Three consecutive integers always have one multiple of 3",
        "Step 3: Therefore n(n-1)(n+1) is divisible by 3",
        "Step 4: Conclusion: true for all n"
      ],
      "ans": "divisible by 3",
      "why": "Direct proof using algebraic factorization"
    }
  ]
);

add(
  "math",
  "proofs",
  "Proof by Induction",

  `
<h2> Proof by Induction</h2>

<h3> DEEP NOTES</h3>
<p>
Proof by induction is a method used to prove that a statement is true for all natural numbers (n = 1, 2, 3, ...).
It works by proving a starting case and then showing the rule holds step by step.
</p>

<pre>
Step 1: Base case (n = 1)
Step 2: Assume true for n = k
Step 3: Prove for n = k + 1
</pre>

---

<h3> CORE STRUCTURE</h3>

<pre>
1. Base Case: Show true for first value
2. Inductive Hypothesis: Assume true for n = k
3. Inductive Step: Prove true for n = k + 1
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: Sum of natural numbers</b></p>
<p><b>Question:</b> Prove 1 + 2 + ... + n = n(n+1)/2 (idea only)</p>
<p><b>Step 1:</b> Check base case n = 1 → 1 = 1(2)/2 </p>
<p><b>Step 2:</b> Assume true for n = k</p>
<p><b>Step 3:</b> Show it works for k + 1</p>
<p><b>Final Idea:</b> Therefore true for all n</p>

<br>

<p><b>Example 2: Even number pattern</b></p>
<p><b>Question:</b> Prove 2 + 4 + ... + 2n = n(n+1)</p>
<p><b>Step 1:</b> Check n = 1 → 2 = 1×2 </p>
<p><b>Step 2:</b> Assume true for k</p>
<p><b>Step 3:</b> Add next term and simplify</p>
<p><b>Final Conclusion:</b> Statement holds for all n</p>

<br>

<p><b>Example 3: Divisibility idea</b></p>
<p><b>Question:</b> Show 5^n - 1 is divisible by 4 (idea)</p>
<p><b>Step 1:</b> Check n = 1 → 4 divisible by 4 </p>
<p><b>Step 2:</b> Assume for k</p>
<p><b>Step 3:</b> Prove for k+1 using algebra</p>
<p><b>Final Idea:</b> True for all natural numbers</p>

---

<h3> DIAGRAM</h3>

<pre>
n=1  → assume n=k  → prove n=k+1  → holds for all n
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Computer algorithm correctness (loops)</li>
<li>Recursion in programming</li>
<li>Mathematical formula validation</li>
<li>Software verification systems</li>
</ul>

---
`,

  [
    {
      "q": "Prove 1 + 3 + ... + (2n-1) = n²",
      "hint": "use induction template",
      "steps": [
        "Step 1: Base case: n=1 → LHS = 1, RHS = 1² = 1. True.",
        "Step 2: Assume true for n=k: 1 + ... + (2k-1) = k²",
        "Step 3: Show for n=k+1: 1 + ... + (2k-1) + (2k+1) = (k+1)²",
        "Step 4: Use assumption → k² + (2k+1) = (k+1)²",
        "Step 5: Simplify → k² + 2k + 1 = (k+1)²",
        "Step 6: Conclusion: holds for all n"
      ],
      "ans": "n²",
      "why": "Induction proves base case and inductive step"
    },
    {
      "q": "Prove n < 2ⁿ",
      "hint": "show true for n=1, then assume and prove step",
      "steps": [
        "Step 1: Base case n=1: 1 < 2¹ = 2. True.",
        "Step 2: Assume k < 2ᵏ",
        "Step 3: Show k+1 < 2ᵏ⁺¹",
        "Step 4: k+1 < 2ᵏ + 1 (from assumption)",
        "Step 5: Since 1 < 2ᵏ (for k≥1), then 2ᵏ + 1 < 2ᵏ + 2ᵏ = 2ᵏ⁺¹",
        "Step 6: Combine → k+1 < 2ᵏ⁺¹"
      ],
      "ans": "True",
      "why": "Two-part induction proof structure"
    },
    {
      "q": "Prove 3ⁿ - 1 is divisible by 2",
      "hint": "factor or use pattern",
      "steps": [
        "Step 1: Base case n=1: 3¹ - 1 = 2 (divisible by 2)",
        "Step 2: Assume 3ᵏ - 1 = 2m for some integer m",
        "Step 3: Consider 3ᵏ⁺¹ - 1 = 3(3ᵏ) - 1",
        "Step 4: = 3(2m + 1) - 1 = 6m + 3 - 1 = 6m + 2",
        "Step 5: = 2(3m + 1) (divisible by 2)",
        "Step 6: Conclusion: true for all n"
      ],
      "ans": "divisible by 2",
      "why": "Shows divisibility extends step by step"
    },
    {
      "q": "Prove n³ - n is divisible by 3",
      "hint": "factor into 3 consecutive integers",
      "steps": [
        "Step 1: n³ - n = n(n²-1) = n(n-1)(n+1)",
        "Step 2: Three consecutive integers always have one multiple of 3",
        "Step 3: Therefore n(n-1)(n+1) is divisible by 3",
        "Step 4: Conclusion: true for all n"
      ],
      "ans": "divisible by 3",
      "why": "Direct proof using algebraic factorization"
    }
  ]
);

add(
  "math",
  "proofs",
  "Logical Argument Structures",

  `
<h2> Logical Arguments</h2>

<h3> DEEP NOTES</h3>
<p>
Mathematical logic uses structured reasoning based on TRUE/FALSE statements. A logical argument connects premises to conclusions in a valid sequence.
</p>

<pre>
P → Q (if P then Q)
If premise is true, conclusion must follow
</pre>

---

<h3> KEY IDEA</h3>
<pre>
Premise (P) → Rule → Conclusion (Q)
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: Basic implication</b></p>
<p><b>Question:</b> If it rains, the ground is wet. It is raining. What happens?</p>
<p><b>Step 1:</b> P = it rains (true)</p>
<p><b>Step 2:</b> Apply rule P → Q</p>
<p><b>Final Answer:</b> The ground is wet</p>

<br>

<p><b>Example 2: Even number rule</b></p>
<p><b>Question:</b> If a number is even, it is divisible by 2. 8 is even. What follows?</p>
<p><b>Step 1:</b> Identify P = 8 is even</p>
<p><b>Step 2:</b> Apply rule P → Q</p>
<p><b>Final Answer:</b> 8 is divisible by 2</p>

<br>

<p><b>Example 3: Chain reasoning</b></p>
<p><b>Question:</b> If A → B and B → C, what can be concluded if A is true?</p>
<p><b>Step 1:</b> A implies B</p>
<p><b>Step 2:</b> B implies C</p>
<p><b>Step 3:</b> Chain the logic</p>
<p><b>Final Answer:</b> A → C</p>

---

<h3> DIAGRAM</h3>

<pre>
P → Q → R → Conclusion
(logical chain reasoning)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Computer programming (if/else logic)</li>
<li>AI decision-making systems</li>
<li>Legal reasoning and argument structures</li>
<li>Mathematical theorem proofs</li>
</ul>

---
`,

  [
    {
      "q": "If x > 5, what about x²?",
      "hint": "square both sides",
      "steps": [
        "Step 1: Start with x > 5",
        "Step 2: Square both sides → x² > 5²",
        "Step 3: Simplify → x² > 25"
      ],
      "ans": "x² > 25",
      "why": "Squaring preserves inequality for positive numbers"
    },
    {
      "q": "If P → Q and Q → R, what follows if P is true?",
      "hint": "chain reasoning",
      "steps": [
        "Step 1: P implies Q",
        "Step 2: Q implies R",
        "Step 3: Chain the implication",
        "Step 4: Therefore P implies R"
      ],
      "ans": "P → R",
      "why": "Transitive property of implication"
    },
    {
      "q": "Explain P → Q (if P then Q)",
      "hint": "cause and effect",
      "steps": [
        "Step 1: P = premise (cause)",
        "Step 2: Q = conclusion (effect)",
        "Step 3: If P occurs, Q must follow",
        "Step 4: True logical connection"
      ],
      "ans": "Cause-effect relationship",
      "why": "Represents how one statement leads to another"
    },
    {
      "q": "If a number is divisible by 4, is it divisible by 2?",
      "hint": "show property",
      "steps": [
        "Step 1: Let number = 4k",
        "Step 2: Rewrite as 2(2k)",
        "Step 3: This is form 2m where m=2k",
        "Step 4: Therefore divisible by 2"
      ],
      "ans": "Yes",
      "why": "Divisibility property: 4|n implies 2|n"
    }
  ]
);

add(
  "math",
  "proofs",
  "Applications of Mathematical Proofs",

  `
<h2> Applications of Proofs</h2>

<h3> DEEP NOTES</h3>
<p>
Proofs ensure that mathematical statements are always correct and reliable. They provide logical certainty instead of guesswork.
</p>

---

<h3> CORE IDEA</h3>
<pre>
Statement → Logical steps → Proof → Guaranteed truth 
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: Algorithm correctness</b></p>
<p><b>Question:</b> Why are proofs used in computer algorithms?</p>
<p><b>Step 1:</b> Algorithms must always give correct outputs</p>
<p><b>Step 2:</b> Proofs verify each step logically</p>
<p><b>Final Answer:</b> To ensure algorithms always produce correct results</p>

<br>

<p><b>Example 2: Encryption security</b></p>
<p><b>Question:</b> How are proofs used in cryptography?</p>
<p><b>Step 1:</b> Encryption systems rely on math rules</p>
<p><b>Step 2:</b> Proofs confirm keys cannot be easily broken</p>
<p><b>Final Answer:</b> To guarantee security of encrypted data</p>

<br>

<p><b>Example 3: Physics laws</b></p>
<p><b>Question:</b> Why are proofs important in physics?</p>
<p><b>Step 1:</b> Physics uses mathematical models</p>
<p><b>Step 2:</b> Proofs confirm these models are consistent</p>
<p><b>Final Answer:</b> To validate scientific laws and equations</p>

---

<h3> DIAGRAM</h3>

<pre>
Claim → Logical reasoning → Proof → Verified truth 
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cybersecurity and encryption safety</li>
<li>Software verification and bug prevention</li>
<li>Engineering design validation</li>
<li>Scientific law confirmation</li>
</ul>

---
`,

  [
    {
      "q": "Prove 1 + 3 + ... + (2n-1) = n² using induction",
      "hint": "base case, inductive step",
      "steps": [
        "Step 1: Base case n=1: LHS = 1, RHS = 1² = 1. True.",
        "Step 2: Assume true for k: 1 + ... + (2k-1) = k²",
        "Step 3: Show for k+1: 1 + ... + (2k-1) + (2k+1) = (k+1)²",
        "Step 4: Use assumption → k² + (2k+1) = (k+1)²",
        "Step 5: Simplify → k² + 2k + 1 = (k+1)²",
        "Step 6: Conclusion: holds for all n"
      ],
      "ans": "n²",
      "why": "Induction proves base case and inductive step"
    },
    {
      "q": "Prove n < 2ⁿ by induction",
      "hint": "show true for n=1, then prove",
      "steps": [
        "Step 1: Base case n=1: 1 < 2¹ = 2. True.",
        "Step 2: Assume k < 2ᵏ",
        "Step 3: Show k+1 < 2ᵏ⁺¹",
        "Step 4: k+1 < 2ᵏ + 1 (from assumption)",
        "Step 5: Since 1 < 2ᵏ for k≥1, then 2ᵏ + 1 < 2ᵏ + 2ᵏ = 2ᵏ⁺¹",
        "Step 6: Combine → k+1 < 2ᵏ⁺¹"
      ],
      "ans": "True",
      "why": "Two-part induction proof"
    },
    {
      "q": "Prove 3ⁿ - 1 is divisible by 2 using induction",
      "hint": "factor form",
      "steps": [
        "Step 1: Base case n=1: 3¹ - 1 = 2 (divisible by 2)",
        "Step 2: Assume 3ᵏ - 1 = 2m for some m",
        "Step 3: Show 3ᵏ⁺¹ - 1 = 3(3ᵏ) - 1 = 3(2m+1) - 1",
        "Step 4: = 6m + 3 - 1 = 6m + 2 = 2(3m+1)",
        "Step 5: Conclusion: divisible by 2"
      ],
      "ans": "divisible by 2",
      "why": "Shows divisibility extends step by step"
    },
    {
      "q": "Prove n³ - n is divisible by 3",
      "hint": "factor into consecutive integers",
      "steps": [
        "Step 1: n³ - n = n(n-1)(n+1)",
        "Step 2: Three consecutive integers always have one multiple of 3",
        "Step 3: Therefore n(n-1)(n+1) is divisible by 3",
        "Step 4: Conclusion: true for all n"
      ],
      "ans": "divisible by 3",
      "why": "Direct proof using factorization"
    }
  ]
);

add(
  "math",
  "discrete_mathematics",
  "Logic Statements (AND, OR, NOT)",

  `
<h2> Logic Statements</h2>

<h3> DEEP NOTES</h3>
<p>
Logic statements are used to represent TRUE or FALSE conditions.
They are the foundation of computer decision-making and digital circuits.
</p>

<pre>
AND (∧) → both must be true  
OR (∨) → at least one true  
NOT (¬) → reverses truth value
</pre>

---

<h3> TRUTH RULES</h3>

<pre>
P AND Q → true only if both are true
P OR Q  → true if at least one is true
NOT P   → flips truth value
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: AND</b></p>
<p><b>Question:</b> What is True AND False?</p>
<p><b>Step 1:</b> AND requires both statements to be true</p>
<p><b>Step 2:</b> One is false</p>
<p><b>Final Answer:</b> False</p>

<br>

<p><b>Example 2: OR</b></p>
<p><b>Question:</b> What is True OR False?</p>
<p><b>Step 1:</b> OR requires at least one true</p>
<p><b>Step 2:</b> One is true</p>
<p><b>Final Answer:</b> True</p>

<br>

<p><b>Example 3: NOT</b></p>
<p><b>Question:</b> What is NOT False?</p>
<p><b>Step 1:</b> Reverse truth value</p>
<p><b>Final Answer:</b> True</p>

---

<h3> DIAGRAM</h3>

<pre>
AND → both must pass 
OR  → at least one passes 
NOT → flips value (T ↔ F)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Login systems (username AND password)</li>
<li>Search engines (OR filters)</li>
<li>Security systems (NOT permission rules)</li>
<li>Programming conditions (if statements)</li>
</ul>

---
`,

  [
    {
      "q": "If P=True, Q=False, what is P AND Q?",
      "hint": "both must be true",
      "steps": [
        "Step 1: Identify P = True, Q = False",
        "Step 2: Apply AND rule: both must be true",
        "Step 3: Since Q is False, the result is False"
      ],
      "ans": "False",
      "why": "AND requires all inputs to be True"
    },
    {
      "q": "If P=True, Q=False, what is P OR Q?",
      "hint": "at least one true",
      "steps": [
        "Step 1: Identify P = True, Q = False",
        "Step 2: Apply OR rule: at least one must be true",
        "Step 3: Since P is True, the result is True"
      ],
      "ans": "True",
      "why": "OR only needs one True input"
    },
    {
      "q": "What is NOT(NOT P) when P=True?",
      "hint": "double negation",
      "steps": [
        "Step 1: Start with P = True",
        "Step 2: Apply first NOT → NOT(True) = False",
        "Step 3: Apply second NOT → NOT(False) = True"
      ],
      "ans": "True",
      "why": "Double negation cancels out"
    },
    {
      "q": "If A=True, B=True, C=False, what is A AND B AND C?",
      "hint": "all must be true",
      "steps": [
        "Step 1: Identify inputs: True, True, False",
        "Step 2: AND requires all to be True",
        "Step 3: C is False, so entire expression is False"
      ],
      "ans": "False",
      "why": "One false input makes AND expression false"
    },
    {
      "q": "If A=True, B=False, C=False, what is A OR B OR C?",
      "hint": "at least one true",
      "steps": [
        "Step 1: Identify inputs: True, False, False",
        "Step 2: OR requires at least one True",
        "Step 3: A is True, so OR expression is True"
      ],
      "ans": "True",
      "why": "At least one True input makes OR expression true"
    }
  ]
);

add(
  "math",
  "discrete_mathematics",
  "Truth Tables",

  `
<h2> Truth Tables</h2>

<h3> DEEP NOTES</h3>
<p>
Truth tables are used in logic to display all possible truth values of a logical expression based on its inputs.
</p>

<pre>
P | Q | P AND Q
T | T | T
T | F | F
F | T | F
F | F | F
</pre>

---

<h3> KEY LOGIC OPERATORS</h3>

<pre>
AND: true only if both are true
OR: true if at least one is true
NOT: reverses truth value
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: AND operation</b></p>
<p><b>Question:</b> What is T AND F?</p>
<p><b>Step 1:</b> Check AND rule</p>
<p><b>Step 2:</b> Both must be true</p>
<p><b>Final Answer:</b> False</p>

<br>

<p><b>Example 2: OR operation</b></p>
<p><b>Question:</b> What is F OR T?</p>
<p><b>Step 1:</b> OR needs at least one true</p>
<p><b>Step 2:</b> One is true</p>
<p><b>Final Answer:</b> True</p>

<br>

<p><b>Example 3: NOT operation</b></p>
<p><b>Question:</b> What is NOT T?</p>
<p><b>Step 1:</b> Reverse truth value</p>
<p><b>Final Answer:</b> False</p>

---

<h3> DIAGRAM</h3>

<pre>
All combinations → output column
P Q → result
T T → T
T F → F
F T → F
F F → F
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Digital logic circuits in computers</li>
<li>Programming decision statements (if/else)</li>
<li>AI decision-making systems</li>
</ul>

---
`,

  [
    {
      "q": "Make truth table for P AND Q",
      "hint": "4 combinations",
      "steps": [
        "Step 1: List inputs: T T, T F, F T, F F",
        "Step 2: Apply AND rule (both true)",
        "Step 3: T AND T → T",
        "Step 4: T AND F → F",
        "Step 5: F AND T → F",
        "Step 6: F AND F → F"
      ],
      "ans": "T, F, F, F",
      "why": "AND requires both inputs to be True"
    },
    {
      "q": "Make truth table for P OR Q",
      "hint": "at least one true",
      "steps": [
        "Step 1: List inputs: T T, T F, F T, F F",
        "Step 2: Apply OR rule (at least one true)",
        "Step 3: T OR T → T",
        "Step 4: T OR F → T",
        "Step 5: F OR T → T",
        "Step 6: F OR F → F"
      ],
      "ans": "T, T, T, F",
      "why": "OR only needs one True input"
    },
    {
      "q": "Make truth table for NOT P",
      "hint": "flip truth value",
      "steps": [
        "Step 1: List P: T, F",
        "Step 2: Apply NOT operation",
        "Step 3: T → F",
        "Step 4: F → T"
      ],
      "ans": "F, T",
      "why": "NOT reverses the truth value"
    },
    {
      "q": "Build truth table for (P AND Q) OR R",
      "hint": "two-step calculation",
      "steps": [
        "Step 1: Calculate P AND Q for all inputs",
        "Step 2: Combine with R using OR",
        "Step 3: (T T T) → T",
        "Step 4: (T T F) → T",
        "Step 5: (T F T) → T",
        "Step 6: (T F F) → F",
        "Step 7: (F T T) → T",
        "Step 8: (F T F) → F",
        "Step 9: (F F T) → T",
        "Step 10: (F F F) → F"
      ],
      "ans": "T T T F T F T F",
      "why": "Step-by-step evaluation of compound expression"
    },
    {
      "q": "If P=True, Q=False, build truth table for P → Q",
      "hint": "implication rule",
      "steps": [
        "Step 1: Identify inputs: T T, T F, F T, F F",
        "Step 2: Apply implication: P → Q is false only when P is true and Q is false",
        "Step 3: T → T → T",
        "Step 4: T → F → F",
        "Step 5: F → T → T",
        "Step 6: F → F → T"
      ],
      "ans": "T F T T",
      "why": "Implication is only false when premise true, conclusion false"
    }
  ]
);

add(
  "math",
  "discrete_mathematics",
  "Combinatorics (Counting Methods)",

  `
<h2> Combinatorics</h2>

<h3> DEEP NOTES</h3>
<p>
Combinatorics is the study of counting arrangements and selections of objects without listing them one by one.
</p>

<pre>
n! = n × (n−1) × (n−2) × ... × 1
</pre>

---

<h3> KEY FORMULAS</h3>
<pre>
Factorial: n!
Permutations: nPr = n! / (n−r)!
Combinations: nCr = n! / (r!(n−r)!)
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1: Factorial</b></p>
<p><b>Question:</b> Find 4!</p>
<p><b>Step 1:</b> 4 × 3 × 2 × 1</p>
<p><b>Step 2:</b> = 24</p>
<p><b>Final Answer:</b> 24</p>

<br>

<p><b>Example 2: Arrangements</b></p>
<p><b>Question:</b> How many ways can ABC be arranged?</p>
<p><b>Step 1:</b> Number of items = 3</p>
<p><b>Step 2:</b> 3! = 3 × 2 × 1</p>
<p><b>Final Answer:</b> 6 arrangements</p>

<br>

<p><b>Example 3: Simple Permutation Idea</b></p>
<p><b>Question:</b> How many ways can 2 letters be selected from ABCDE (order matters)?</p>
<p><b>Step 1:</b> Use nPr = n! / (n−r)!</p>
<p><b>Step 2:</b> 5P2 = 5! / 3! = (5×4×3!) / 3!</p>
<p><b>Step 3:</b> Cancel 3!</p>
<p><b>Final Answer:</b> 20 ways</p>

---

<h3> DIAGRAM</h3>

<pre>
ABC → ACB → BAC → BCA → CAB → CBA
(total arrangements = 6)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Password combinations and security systems</li>
<li>Scheduling and timetabling</li>
<li>Probability and statistics modeling</li>
</ul>

---
`,

  [
    {
      "q": "Find number of arrangements of ABC",
      "hint": "n! formula",
      "steps": [
        "Step 1: Identify n = 3 distinct items",
        "Step 2: Use formula n! = 3 × 2 × 1",
        "Step 3: Calculate = 6"
      ],
      "ans": "6 arrangements",
      "why": "3! = 6 distinct permutations"
    },
    {
      "q": "How many ways to select 2 letters from ABCD (order matters)?",
      "hint": "permutation formula",
      "steps": [
        "Step 1: Identify n=4, r=2",
        "Step 2: Formula: nPr = n! / (n-r)!",
        "Step 3: 4P2 = 4! / 2! = (4×3×2×1) / (2×1)",
        "Step 4: = 24 / 2 = 12"
      ],
      "ans": "12 ways",
      "why": "Permutation accounts for order"
    },
    {
      "q": "How many ways to choose 2 fruits from apple, banana, cherry (order doesn't matter)?",
      "hint": "combination formula",
      "steps": [
        "Step 1: Identify n=3, r=2",
        "Step 2: Formula: nCr = n! / (r!(n-r)!)",
        "Step 3: 3C2 = 3! / (2!1!) = (3×2×1) / ((2×1)×1)",
        "Step 4: = 3"
      ],
      "ans": "3 ways",
      "why": "Combination ignores order"
    },
    {
      "q": "Find 5!",
      "hint": "calculate factorial",
      "steps": [
        "Step 1: 5 × 4 × 3 × 2 × 1",
        "Step 2: = 120"
      ],
      "ans": "120",
      "why": "Factorial calculation"
    },
    {
      "q": "If 3 items can be arranged in 6 ways, how many if one is repeated?",
      "hint": "division by factorial of repeats",
      "steps": [
        "Step 1: Total permutations = n! / (r₁!r₂!...)",
        "Step 2: Here, 1 item repeated means divide by 2!",
        "Step 3: 6 / 2 = 3 arrangements"
      ],
      "ans": "3 arrangements",
      "why": "Repetitions reduce number of distinct arrangements"
    },
    {
      "q": "How many 3-digit numbers using digits 1,2,3 without repetition?",
      "hint": "permutation",
      "steps": [
        "Step 1: n=3 digits, choose 3 positions",
        "Step 2: 3P3 = 3! = 6"
      ],
      "ans": "6 numbers",
      "why": "All digits used, order matters"
    },
    {
      "q": "Select committee of 3 from 10 people (order doesn't matter)",
      "hint": "combination",
      "steps": [
        "Step 1: n=10, r=3",
        "Step 2: 10C3 = 10! / (3!7!) = (10×9×8) / (3×2×1)",
        "Step 3: = 120"
      ],
      "ans": "120 ways",
      "why": "Committee selection → combination (order irrelevant)"
    }
  ]
);

add(
  "math",
  "discrete_mathematics",
  "Graph Theory (Nodes and Edges)",

  `
<h2> Graph Theory</h2>

<h3> DEEP NOTES</h3>
<p>
Graph theory studies relationships between objects using nodes (vertices) and edges.
A node represents an object, while an edge represents a connection between objects.
</p>

---

<h3> EXAMPLES (WITH WORKING EXPLANATION)</h3>

<p><b>Example 1: Social network</b></p>
<p><b>Step 1:</b> Each person is a node</p>
<p><b>Step 2:</b> Friendship is an edge</p>
<p><b>Final Answer:</b> Graph shows who is connected to who</p>

<br>

<p><b>Example 2: City roads</b></p>
<p><b>Step 1:</b> Cities are nodes</p>
<p><b>Step 2:</b> Roads are edges</p>
<p><b>Final Answer:</b> Graph represents travel routes</p>

<br>

<p><b>Example 3: Computer networks</b></p>
<p><b>Step 1:</b> Devices are nodes</p>
<p><b>Step 2:</b> Connections are edges</p>
<p><b>Final Answer:</b> Graph represents data communication paths</p>

---

<h3> DIAGRAM</h3>

<pre>
A —— B —— C
          /
   —— D ——
(nodes connected by edges)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Google Maps routing systems</li>
<li>Internet networking</li>
<li>Social media connections</li>
<li>AI recommendation systems</li>
</ul>

---
`,

  [
    {
      "q": "Draw a graph with 4 nodes and 3 edges",
      "hint": "create any valid graph",
      "steps": [
        "Step 1: Draw 4 dots (nodes)",
        "Step 2: Connect any 3 pairs with lines (edges)",
        "Step 3: Example: Connect 1-2, 2-3, 3-4"
      ],
      "ans": "Graph with 4 nodes and 3 edges",
      "why": "Basic graph structure"
    },
    {
      "q": "How many edges in a triangle graph?",
      "hint": "triangle = 3 nodes + 3 edges",
      "steps": [
        "Step 1: A triangle has 3 nodes",
        "Step 2: Each node connects to 2 others",
        "Step 3: Total edges = 3"
      ],
      "ans": "3 edges",
      "why": "Triangle graph property"
    },
    {
      "q": "Can you connect 4 nodes with 2 edges?",
      "hint": "connect any 2 pairs",
      "steps": [
        "Step 1: Draw 4 nodes",
        "Step 2: Draw 2 edges (e.g., 1-2 and 3-4)",
        "Step 3: Yes, possible"
      ],
      "ans": "Yes",
      "why": "Edges can connect any pairs independently"
    },
    {
      "q": "Draw a complete graph with 3 nodes",
      "hint": "all nodes connected",
      "steps": [
        "Step 1: Draw 3 nodes",
        "Step 2: Connect every node to every other node",
        "Step 3: Result = triangle"
      ],
      "ans": "Triangle graph",
      "why": "Complete graph K₃"
    },
    {
      "q": "What if an edge connects a node to itself?",
      "hint": "loop edge",
      "steps": [
        "Step 1: Draw a node",
        "Step 2: Draw an edge from the node to itself",
        "Step 3: This is called a loop"
      ],
      "ans": "Loop edge",
      "why": "Valid in some graph types"
    },
    {
      "q": "Draw a disconnected graph with 4 nodes",
      "hint": "two separate parts",
      "steps": [
        "Step 1: Draw 2 separate pairs of nodes (1-2 and 3-4)",
        "Step 2: No connection between the pairs",
        "Step 3: This is disconnected"
      ],
      "ans": "Disconnected graph",
      "why": "Not all nodes reachable from each other"
    },
    {
      "q": "How many edges in a complete graph with 4 nodes?",
      "hint": "every node connects to 3 others",
      "steps": [
        "Step 1: Each of 4 nodes connects to 3 others",
        "Step 2: 4 × 3 = 12 connections",
        "Step 3: Divide by 2 (each edge counted twice)",
        "Step 4: = 6 edges"
      ],
      "ans": "6 edges",
      "why": "n(n-1)/2 formula"
    }
  ]
);

add(
  "math",
  "discrete_mathematics",
  "Basic Algorithms",

  `
<h2> Algorithms Basics</h2>

<h3> DEEP NOTES</h3>
<p>
An algorithm is a step-by-step procedure to solve a problem.
It must be clear, finite, and effective.
</p>

---

<h3> EXAMPLES (WITH WORKING)</h3>

<p><b>Example 1: Finding the largest number</b></p>
<p><b>Step 1:</b> Start with a list of numbers</p>
<p><b>Step 2:</b> Assume first number is largest</p>
<p><b>Step 3:</b> Compare with next numbers</p>
<p><b>Step 4:</b> Update largest when needed</p>
<p><b>Final Answer:</b> Algorithm returns the maximum value</p>

<br>

<p><b>Example 2: Searching for a value</b></p>
<p><b>Step 1:</b> Start from first element</p>
<p><b>Step 2:</b> Compare each element</p>
<p><b>Step 3:</b> Stop when value is found</p>
<p><b>Final Answer:</b> Value is found or not found</p>

<br>

<p><b>Example 3: Sorting numbers</b></p>
<p><b>Step 1:</b> Compare adjacent elements</p>
<p><b>Step 2:</b> Swap if needed</p>
<p><b>Step 3:</b> Repeat until sorted</p>
<p><b>Final Answer:</b> Numbers arranged in order</p>

---

<h3> DIAGRAM</h3>

<pre>
Start → Step 1 → Step 2 → Decision → End
clear logical flow of instructions
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Search engines (Google ranking systems)</li>
<li>Mobile apps processing data</li>
<li>AI decision systems</li>
<li>Navigation apps (Google Maps)</li>
</ul>

---
`,

  [
    {
      "q": "Find largest number in [4, 9, 2, 11] using algorithm",
      "hint": "iterative comparison",
      "steps": [
        "Step 1: Assume max = 4",
        "Step 2: Compare with 9 → max = 9",
        "Step 3: Compare with 2 → max still 9",
        "Step 4: Compare with 11 → max = 11"
      ],
      "ans": "11",
      "why": "Systematic comparison finds maximum"
    },
    {
      "q": "Search for 7 in [1, 3, 7, 9]",
      "hint": "sequential search",
      "steps": [
        "Step 1: Check 1 → not 7",
        "Step 2: Check 3 → not 7",
        "Step 3: Check 7 → found!",
        "Step 4: Stop"
      ],
      "ans": "Found",
      "why": "Sequential search stops when value located"
    },
    {
      "q": "Sort [5, 2, 8] using bubble sort",
      "hint": "swap adjacent if out of order",
      "steps": [
        "Step 1: Compare 5,2 → swap → [2,5,8]",
        "Step 2: Compare 5,8 → no swap",
        "Step 3: Second pass → no swaps needed",
        "Step 4: Sorted: [2,5,8]"
      ],
      "ans": "[2,5,8]",
      "why": "Bubble sort repeatedly swaps adjacent elements"
    },
    {
      "q": "How many steps to search 100 items if target is last?",
      "hint": "worst-case scenario",
      "steps": [
        "Step 1: In worst case, must check all",
        "Step 2: = 100 comparisons"
      ],
      "ans": "100 steps",
      "why": "Linear search checks every element in worst case"
    },
    {
      "q": "How many swaps in bubble sort for [3,2,1]?",
      "hint": "track swaps",
      "steps": [
        "Step 1: [3,2,1] → swap 3,2 → [2,3,1]",
        "Step 2: [2,3,1] → swap 3,1 → [2,1,3]",
        "Step 3: [2,1,3] → swap 2,1 → [1,2,3]"
      ],
      "ans": "3 swaps",
      "why": "Sorted in 3 swap operations"
    }
  ]
);

add(
  "math",
  "number_theory",
  "Divisibility Rules",

  `
<h2> Divisibility Rules</h2>

<h3> DEEP NOTES</h3>
<p>
Divisibility rules help determine if a number can be divided exactly by another number without remainder.
They allow quick checking without long division.
</p>

<pre>
2 → last digit even  
3 → sum of digits divisible by 3  
5 → ends in 0 or 5  
10 → ends in 0
</pre>

---

<h3> EXAMPLES (WITH WORKING)</h3>

<p><b>Example 1:</b> Is 246 divisible by 2?</p>
<p><b>Step 1:</b> Last digit is 6</p>
<p><b>Step 2:</b> 6 is even</p>
<p><b>Final Answer:</b> Yes, 246 is divisible by 2 </p>

<br>

<p><b>Example 2:</b> Is 123 divisible by 3?</p>
<p><b>Step 1:</b> Add digits: 1 + 2 + 3 = 6</p>
<p><b>Step 2:</b> 6 is divisible by 3</p>
<p><b>Final Answer:</b> Yes, 123 is divisible by 3 </p>

<br>

<p><b>Example 3:</b> Is 125 divisible by 5?</p>
<p><b>Step 1:</b> Last digit is 5</p>
<p><b>Final Answer:</b> Yes, 125 is divisible by 5 </p>

---

<h3> DIAGRAM</h3>

<pre>
Number → Rule check → divisible / not divisible
fast mental test system
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Quick mental math checks</li>
<li>Banking transaction validation</li>
<li>Programming validation rules</li>
<li>Error checking in computations</li>
</ul>

---
`,

  [
    {
      "q": "Is 372 divisible by 3?",
      "hint": "add digits",
      "steps": [
        "Step 1: Take digits of 372 → 3, 7, 2",
        "Step 2: Add them → 3 + 7 + 2 = 12",
        "Step 3: Check if 12 is divisible by 3",
        "Step 4: 12 ÷ 3 = 4 (no remainder)",
        "Step 5: Conclude divisibility"
      ],
      "ans": "Yes",
      "why": "If the sum of digits is divisible by 3, the number is divisible by 3"
    },
    {
      "q": "Check if 145 is divisible by 5",
      "hint": "last digit rule",
      "steps": [
        "Step 1: Look at last digit of 145",
        "Step 2: Last digit is 5",
        "Step 3: Check rule for divisibility by 5",
        "Step 4: Numbers ending in 0 or 5 are divisible by 5"
      ],
      "ans": "Yes",
      "why": "Numbers ending in 5 are always divisible by 5"
    },
    {
      "q": "Is 638 divisible by 2?",
      "hint": "check last digit",
      "steps": [
        "Step 1: Look at last digit of 638",
        "Step 2: Last digit is 8",
        "Step 3: Check if 8 is even",
        "Step 4: Even numbers are divisible by 2"
      ],
      "ans": "Yes",
      "why": "Even last digit means number is divisible by 2"
    },
    {
      "q": "Is 251 divisible by 3?",
      "hint": "sum of digits",
      "steps": [
        "Step 1: Add digits → 2 + 5 + 1 = 8",
        "Step 2: Check if 8 is divisible by 3",
        "Step 3: 8 ÷ 3 leaves remainder",
        "Step 4: Conclude divisibility"
      ],
      "ans": "No",
      "why": "Sum of digits not divisible by 3 means number is not divisible by 3"
    }
  ]
);

add(
  "math",
  "number_theory",
  "Modular Arithmetic",

  `
<h2> Modular Arithmetic (Clock Math)</h2>

<h3> DEEP NOTES</h3>
<p>
Modular arithmetic deals with remainders after division.
It is like clock arithmetic where values “wrap around” after reaching a fixed number.
</p>

<pre>
a mod n = remainder when a is divided by n
</pre>

---

<h3> EXAMPLES (WITH WORKING)</h3>

<p><b>Example 1:</b> 10 mod 3</p>
<p><b>Step 1:</b> 10 ÷ 3 = 3 remainder 1</p>
<p><b>Final Answer:</b> 10 mod 3 = 1</p>

<br>

<p><b>Example 2:</b> 15 mod 4</p>
<p><b>Step 1:</b> 15 ÷ 4 = 3 remainder 3</p>
<p><b>Final Answer:</b> 15 mod 4 = 3</p>

<br>

<p><b>Example 3:</b> Clock system</p>
<p><b>Step 1:</b> Hours repeat after 12</p>
<p><b>Step 2:</b> After 12 comes 1 again</p>
<p><b>Final Answer:</b> This is modular arithmetic with mod 12</p>

---

<h3> DIAGRAM</h3>

<pre>
Clock:
12 → 1 → 2 → 3 → ... → 11 → back to 12
(repeats cycle)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Digital clocks</li>
<li>Encryption systems (RSA, cryptography)</li>
<li>Computer hashing functions</li>
<li>Calendar systems</li>
</ul>

---
`,

  [
    {
      "q": "Calculate 17 mod 5",
      "hint": "divide and find remainder",
      "steps": [
        "Step 1: Divide 17 by 5 → 17 ÷ 5",
        "Step 2: Result is 3 with remainder 2",
        "Step 3: Remainder is the modular result"
      ],
      "ans": "2",
      "why": "Modular arithmetic gives remainder of division"
    },
    {
      "q": "What time is it 3 hours after 10 o'clock on a 12-hour clock?",
      "hint": "clock arithmetic mod 12",
      "steps": [
        "Step 1: Start at 10",
        "Step 2: Add 3 hours → 10 + 3 = 13",
        "Step 3: Since clock repeats at 12, use mod 12",
        "Step 4: 13 mod 12 = 1"
      ],
      "ans": "1 o'clock",
      "why": "Clock arithmetic is modular (repeats every 12)"
    },
    {
      "q": "Find 22 mod 7",
      "hint": "division with remainder",
      "steps": [
        "Step 1: 22 ÷ 7",
        "Step 2: 3 × 7 = 21",
        "Step 3: Remainder = 22 - 21 = 1"
      ],
      "ans": "1",
      "why": "Remainder is the result in modular arithmetic"
    },
    {
      "q": "Is 21 divisible by 3 using mod?",
      "hint": "check if remainder is 0",
      "steps": [
        "Step 1: Calculate 21 mod 3",
        "Step 2: 21 ÷ 3 = 7 with remainder 0",
        "Step 3: Remainder = 0 means divisible"
      ],
      "ans": "Yes",
      "why": "If remainder is 0, number is divisible by the modulus"
    }
  ]
);

add(
  "math",
  "number_theory",
  "Prime Numbers",

  `
<h2> Prime Numbers</h2>
<h3> DEEP NOTES</h3>
<p>
Prime numbers are numbers greater than 1 with only two factors: 1 and itself.
</p>
<h3> EXAMPLES</h3>
<p><b>Example 1:</b> Prime numbers include 2, 3, 5, 7, 11</p>
<p><b>Step 1:</b> Each has only two factors </p>
<p><b>Final Answer:</b> These are all prime numbers</p>
<br>
<p><b>Example 2:</b> 13, 17, 19 are prime</p>
<p><b>Step 1:</b> Check divisibility</p>
<p><b>Step 2:</b> No factors except 1 and itself</p>
<p><b>Final Answer:</b> They are prime numbers</p>
<br>
<p><b>Example 3:</b> Is 4 a prime number?</p>
<p><b>Step 1:</b> Factors of 4 are 1, 2, 4</p>
<p><b>Step 2:</b> More than two factors</p>
<p><b>Final Answer:</b> 4 is NOT prime (it is composite)</p>
<h3> DIAGRAM</h3>

<pre>
Numbers:
1 2 3 4 5 6 7 8 9 10
   P   C P C P   C
(P = Prime, C = Composite)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptography (RSA encryption)</li>
<li>Computer security keys</li>
<li>Data encryption systems</li>
<li>Random number generation</li>
</ul>

---
`,

  [
    {
      "q": "List first 5 prime numbers",
      "hint": "numbers with only 1 and self as factors",
      "steps": [
        "Step 1: Start from 2 (first prime)",
        "Step 2: Check 3 → prime",
        "Step 3: Check 4 → composite (2×2)",
        "Step 4: Check 5 → prime",
        "Step 5: Check 6 → composite",
        "Step 6: Check 7 → prime",
        "Step 7: Continue until 5 primes found"
      ],
      "ans": "2, 3, 5, 7, 11",
      "why": "These numbers have only two factors: 1 and themselves"
    },
    {
      "q": "Why is 9 not a prime number?",
      "hint": "check factors",
      "steps": [
        "Step 1: List factors of 9",
        "Step 2: Factors are 1, 3, 9",
        "Step 3: More than two factors found",
        "Step 4: Conclude it's not prime"
      ],
      "ans": "Not prime (has 3 factors)",
      "why": "Prime numbers must have exactly two factors"
    },
    {
      "q": "Find all prime numbers between 10 and 20",
      "hint": "check each number",
      "steps": [
        "Step 1: Check 11 → prime",
        "Step 2: Check 12 → composite",
        "Step 3: Check 13 → prime",
        "Step 4: Check 14 → composite",
        "Step 5: Check 15 → composite",
        "Step 6: Check 16 → composite",
        "Step 7: Check 17 → prime",
        "Step 8: Check 18 → composite",
        "Step 9: Check 19 → prime"
      ],
      "ans": "11, 13, 17, 19",
      "why": "Only these numbers have exactly two factors in this range"
    },
    {
      "q": "How many prime numbers are less than 10?",
      "hint": "list and count",
      "steps": [
        "Step 1: List primes: 2, 3, 5, 7",
        "Step 2: Count them",
        "Step 3: Result = 4"
      ],
      "ans": "4",
      "why": "There are four prime numbers less than 10"
    },
    {
      "q": "Is 1 prime?",
      "hint": "definition of prime",
      "steps": [
        "Step 1: Definition → prime has two factors",
        "Step 2: 1 has only one factor (1)",
        "Step 3: Not two factors → not prime"
      ],
      "ans": "No",
      "why": "1 is neither prime nor composite"
    }
  ]
);

add(
  "math",
  "number_theory",
  "Congruence Relations",

  `
<h2> Congruence Relations</h2>

<h3> DEEP NOTES</h3>
<p>
Two numbers are congruent if they give the same remainder when divided by a number.
</p>

<pre>
a ≡ b (mod n)
means a and b leave the same remainder when divided by n
</pre>

---

<h3> EXAMPLES</h3>

<p><b>Example 1:</b> 14 ≡ 2 (mod 4)</p>
<p><b>Step 1:</b> 14 ÷ 4 = 3 remainder 2</p>
<p><b>Step 2:</b> 2 ÷ 4 = 0 remainder 2</p>
<p><b>Final Answer:</b> same remainder → congruent </p>

<br>

<p><b>Example 2:</b> 17 ≡ 5 (mod 6)</p>
<p><b>Step 1:</b> 17 ÷ 6 = 2 remainder 5</p>
<p><b>Step 2:</b> 5 ÷ 6 = 0 remainder 5</p>
<p><b>Final Answer:</b> congruent </p>

<br>

<p><b>Example 3:</b> 25 ≡ 1 (mod 12)</p>
<p><b>Step 1:</b> 25 ÷ 12 = 2 remainder 1</p>
<p><b>Step 2:</b> 1 ÷ 12 = 0 remainder 1</p>
<p><b>Final Answer:</b> congruent </p>

---

<h3> DIAGRAM</h3>

<pre>
Divide → same remainder → congruent
a mod n = b mod n
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptographic systems (RSA, hashing)</li>
<li>Error detection in computing</li>
<li>Clock arithmetic (time cycles)</li>
<li>Scheduling systems</li>
</ul>

---
`,

  [
    {
      "q": "Find 37 ≡ ? (mod 5)",
      "hint": "divide and find remainder",
      "steps": [
        "Step 1: Divide 37 by 5",
        "Step 2: 37 ÷ 5 = 7 remainder 2",
        "Step 3: Identify remainder",
        "Step 4: Write congruence result"
      ],
      "ans": "2",
      "why": "Congruence gives the remainder after division by the modulus"
    },
    {
      "q": "Check if 18 ≡ 4 (mod 7)",
      "hint": "compare remainders",
      "steps": [
        "Step 1: Find remainder of 18 ÷ 7 → 4",
        "Step 2: Find remainder of 4 ÷ 7 → 4",
        "Step 3: Compare remainders",
        "Step 4: Decide if congruent"
      ],
      "ans": "Yes",
      "why": "Both numbers leave the same remainder when divided by 7"
    },
    {
      "q": "Find x if x ≡ 3 (mod 6) and x < 20",
      "hint": "list values in sequence",
      "steps": [
        "Step 1: Write numbers congruent to 3 mod 6",
        "Step 2: Sequence: 3, 9, 15, 21...",
        "Step 3: Select values less than 20",
        "Step 4: Possible answers: 3, 9, 15"
      ],
      "ans": "3, 9, 15",
      "why": "All numbers differ by multiples of 6 from 3"
    },
    {
      "q": "What is 52 mod 9?",
      "hint": "divide 52 by 9",
      "steps": [
        "Step 1: Divide 52 by 9",
        "Step 2: 52 ÷ 9 = 5 remainder 7",
        "Step 3: Identify remainder"
      ],
      "ans": "7",
      "why": "Modulus gives the remainder after division"
    }
  ]
);

add(
  "math",
  "number_theory",
  "Cryptography Basics",

  `
<h2> Cryptography Basics</h2>
<h3> DEEP NOTES</h3>
<p>
Cryptography uses modular arithmetic, prime numbers, and number theory to secure communication systems like RSA encryption.
</p>

---

<h3> KEY IDEA</h3>
<ul>
  <li>Encryption converts readable data into coded form using a mathematical key</li>
  <li>Decryption reverses the process using a private key</li>
  <li>Security depends on problems like large prime factorization</li>
</ul>

---

<h3> EXAMPLES (WITH EXAM-STYLE MATHEMATICAL WORKING)</h3>

<p><b>Example 1: Simple modular encryption</b></p>
<p><b>Question:</b> Encrypt message value 7 using rule E(x) = (x + 5) mod 10</p>
<p><b>Step 1:</b> Substitute x = 7</p>
<p><b>Step 2:</b> Compute 7 + 5 = 12</p>
<p><b>Step 3:</b> Apply modulo → 12 mod 10</p>
<p><b>Step 4:</b> 12 ÷ 10 = remainder 2</p>
<p><b>Final Answer:</b> 2</p>

<br>

<p><b>Example 2: Modular decryption</b></p>
<p><b>Question:</b> Decrypt C = 4 using D(x) = (x - 3) mod 10</p>
<p><b>Step 1:</b> Substitute x = 4</p>
<p><b>Step 2:</b> Compute 4 - 3 = 1</p>
<p><b>Step 3:</b> Apply modulo → 1 mod 10 = 1</p>
<p><b>Final Answer:</b> 1</p>

<br>

<p><b>Example 3: RSA-style idea (conceptual calculation)</b></p>
<p><b>Question:</b> Why does RSA use large primes?</p>
<p><b>Step 1:</b> Choose primes p and q</p>
<p><b>Step 2:</b> Multiply n = p × q (easy)</p>
<p><b>Step 3:</b> Factorizing n back into p and q is hard</p>
<p><b>Final Answer:</b> Security comes from difficulty of reverse factorization</p>

---

<h3> ORIGINAL EXAMPLES</h3>

<p><b>Example 4:</b> Encrypt using modular arithmetic</p>
<p><b>Example 5:</b> Public key encoding system</p>
<p><b>Example 6:</b> Prime-based key generation</p>

---

<h3> DIAGRAM</h3>

<pre>
Plain Text (M)
      ↓  Encryption (mod / exponent)
Cipher Text (C)
      ↓  Decryption (inverse operation)
Plain Text (M)
</pre>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>WhatsApp message encryption</li>
<li>Banking security systems</li>
<li>Online transactions (HTTPS)</li>
<li>Digital signatures</li>
</ul>

---
`,

  [
    {
      "q": "Encrypt a message using a simple shift: E(x) = (x + 7) mod 26. If x = 10, find ciphertext",
      "hint": "substitute into formula",
      "steps": [
        "Step 1: Write formula E(x) = (x + 7) mod 26",
        "Step 2: Substitute x = 10",
        "Step 3: Compute 10 + 7 = 17",
        "Step 4: Apply mod 26 → 17 mod 26 = 17",
        "Step 5: Final ciphertext = 17"
      ],
      "ans": "17",
      "why": "Modular addition shifts values within a fixed alphabet range"
    },
    {
      "q": "Decrypt C = 15 using D(x) = (x - 4) mod 26",
      "hint": "reverse operation",
      "steps": [
        "Step 1: Write formula D(x) = (x - 4) mod 26",
        "Step 2: Substitute x = 15",
        "Step 3: Compute 15 - 4 = 11",
        "Step 4: Apply mod 26 → 11 mod 26 = 11",
        "Step 5: Final plaintext = 11"
      ],
      "ans": "11",
      "why": "Decryption reverses the encryption shift"
    },
    {
      "q": "If p = 3 and q = 11, find n used in RSA setup",
      "hint": "multiply primes",
      "steps": [
        "Step 1: Identify primes p = 3, q = 11",
        "Step 2: Compute n = p × q",
        "Step 3: Multiply 3 × 11",
        "Step 4: n = 33"
      ],
      "ans": "33",
      "why": "RSA security starts by multiplying two primes"
    },
    {
      "q": "Why does RSA rely on prime factorization difficulty?",
      "hint": "reverse problem",
      "steps": [
        "Step 1: Multiply two large primes to get n",
        "Step 2: Observe that multiplication is easy",
        "Step 3: Try reversing n into primes",
        "Step 4: Recognize this is computationally hard",
        "Step 5: Conclude security comes from difficulty"
      ],
      "ans": "Factorization is hard",
      "why": "Security depends on the difficulty of reversing prime multiplication"
    }
  ]
);

add(
  "math",
  "abstract_algebra",
  "Introduction to Groups",

  `
<h2> Groups in Abstract Algebra</h2>

<h3> DEEP NOTES</h3>
<p>
A group is a set of elements combined with an operation that follows specific rules.
</p>

<pre>
A group (G, *) must satisfy:
1. Closure
2. Associativity
3. Identity element
4. Inverse element
</pre>
---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Is integers under multiplication a group?</p>

<p><b>Step 1: Closure</b></p>
<p>integer × integer = integer </p>

<p><b>Step 2: Associativity</b></p>
<p>(a × b) × c = a × (b × c) </p>

<p><b>Step 3: Identity</b></p>
<p>1 is identity since a × 1 = a </p>

<p><b>Step 4: Inverse</b></p>
<p>Inverse of a is 1/a  (not always integer)</p>

<p><b>Final Answer:</b> Not a group under multiplication</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Is non-zero rational numbers under multiplication a group?</p>

<p><b>Step 1: Closure</b></p>
<p>rational × rational = rational </p>

<p><b>Step 2: Associativity</b></p>
<p>(a × b) × c = a × (b × c) </p>

<p><b>Step 3: Identity</b></p>
<p>1 is identity </p>

<p><b>Step 4: Inverse</b></p>
<p>inverse of a is 1/a and is also rational </p>

<p><b>Final Answer:</b> Yes, non-zero rationals form a group under multiplication</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Is subtraction on integers a group?</p>

<p><b>Step 1: Closure</b></p>
<p>integer - integer = integer </p>

<p><b>Step 2: Associativity</b></p>
<p>(a - b) - c ≠ a - (b - c) </p>

<p><b>Step 3: Identity</b></p>
<p>No true identity element </p>

<p><b>Final Answer:</b> Not a group (fails associativity and identity)</p>

---

<h3> DIAGRAM</h3>

<pre>
Group Structure Check:

Closure 
Associativity 
Identity 
Inverse 
→ MUST ALL HOLD
</pre>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptography systems</li>
<li>Symmetry in physics</li>
<li>Computer algorithms</li>
<li>Error-correcting codes</li>
</ul>

---
`,

  [
    {
      "q": "Is (Z, ×) closed under multiplication?",
      "hint": "check product stays in set",
      "steps": [
        "Step 1: Take two integers a, b ∈ Z",
        "Step 2: Compute a × b",
        "Step 3: Example: 2 × 3 = 6 (integer)",
        "Step 4: Example: (-4) × 5 = -20 (integer)",
        "Step 5: Check if result always stays in Z",
        "Step 6: Conclude closure property"
      ],
      "ans": "Yes, integers are closed under multiplication",
      "why": "Product of any two integers is always an integer"
    },
    {
      "q": "Find identity element for addition in real numbers",
      "hint": "a + e = a",
      "steps": [
        "Step 1: Let identity be e",
        "Step 2: Write a + e = a",
        "Step 3: Subtract a from both sides",
        "Step 4: e = 0",
        "Step 5: Check: a + 0 = a"
      ],
      "ans": "0",
      "why": "0 leaves every real number unchanged under addition"
    },
    {
      "q": "Find inverse of 7 under addition",
      "hint": "a + (-a) = 0",
      "steps": [
        "Step 1: Let inverse be x",
        "Step 2: Write 7 + x = 0",
        "Step 3: Solve for x",
        "Step 4: x = -7",
        "Step 5: Check: 7 + (-7) = 0"
      ],
      "ans": "-7",
      "why": "Additive inverse cancels the number to identity 0"
    },
    {
      "q": "Check associativity: (2 + 3) + 4",
      "hint": "grouping does not matter",
      "steps": [
        "Step 1: Compute left side (2 + 3) + 4",
        "Step 2: 2 + 3 = 5",
        "Step 3: 5 + 4 = 9",
        "Step 4: Compute right side 2 + (3 + 4)",
        "Step 5: 3 + 4 = 7",
        "Step 6: 2 + 7 = 9"
      ],
      "ans": "Both sides equal 9",
      "why": "Addition is associative because grouping does not change result"
    },
    {
      "q": "Find inverse of 5 under multiplication (in real numbers)",
      "hint": "a × a⁻¹ = 1",
      "steps": [
        "Step 1: Let inverse be x",
        "Step 2: Write 5 × x = 1",
        "Step 3: Solve x = 1/5",
        "Step 4: Check: 5 × 1/5 = 1"
      ],
      "ans": "1/5",
      "why": "Multiplicative inverse produces identity 1"
    },
    {
      "q": "Check closure: Is natural numbers closed under subtraction?",
      "hint": "result must stay in set",
      "steps": [
        "Step 1: Take two natural numbers 3 and 5",
        "Step 2: Compute 3 - 5 = -2",
        "Step 3: Check if -2 is natural number",
        "Step 4: It is not in N",
        "Step 5: Try more examples (2 - 1 = 1 works, but not always)",
        "Step 6: Conclude closure fails"
      ],
      "ans": "No, not closed under subtraction",
      "why": "Subtraction can produce negative numbers outside natural set"
    }
  ]
);

add(
  "math",
  "abstract_algebra",
  "Rings and Fields",

  `
<h2> Rings and Fields</h2>

<h3> DEEP NOTES</h3>
<p>
A ring is a set with two operations (+ and ×). A field is a stronger structure where division is also possible (except division by zero).
</p>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Is (ℤ, +, ×) a field?</p>

<p><b>Step 1:</b> Check addition closure → ℤ is closed under + </p>
<p><b>Step 2:</b> Check multiplication closure → ℤ is closed under × </p>
<p><b>Step 3:</b> Check multiplicative inverses → 2⁻¹ = 1/2 not in ℤ </p>
<p><b>Step 4:</b> Check division → not closed in ℤ </p>

<p><b>Final Answer:</b> ℤ is a ring but not a field</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Is (ℚ, +, ×) a field?</p>

<p><b>Step 1:</b> Check addition → rational + rational = rational </p>
<p><b>Step 2:</b> Check multiplication → rational × rational = rational </p>
<p><b>Step 3:</b> Check multiplicative inverse → 1/q is rational for q ≠ 0 </p>
<p><b>Step 4:</b> Check division → a/b is rational for b ≠ 0 </p>

<p><b>Final Answer:</b> ℚ is a field</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Is (ℤ₅, +, × mod 5) a field?</p>

<p><b>Step 1:</b> Check closure under addition mod 5 → stays in {0,1,2,3,4} </p>
<p><b>Step 2:</b> Check closure under multiplication mod 5 </p>
<p><b>Step 3:</b> Check inverses → every non-zero element has inverse mod 5 </p>
<p><b>Step 4:</b> Division is possible except by 0 </p>

<p><b>Final Answer:</b> ℤ₅ is a field</p>

---

<h3> DIAGRAM</h3>

<pre>
Integers (ℤ) → Ring only
Rationals (ℚ) → Field
Mod p (ℤₚ) → Field if p is prime

Ring ⊂ Field ⊂ Number Systems
</pre>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Encryption systems (RSA)</li>
<li>Signal processing</li>
<li>Physics equations</li>
<li>Computer algebra systems</li>
</ul>

---
`,

  [
    {
      "q": "Why is ℤ₇ (integers mod 7) a field?",
      "hint": "prime modulus",
      "steps": [
        "Step 1: Identify set ℤ₇ = {0,1,2,3,4,5,6}",
        "Step 2: Check addition mod 7 → always stays in set ",
        "Step 3: Check multiplication mod 7 → always stays in set ",
        "Step 4: Check multiplicative inverses for non-zero elements",
        "Step 5: Example: 3 × 5 = 15 ≡ 1 (mod 7)",
        "Step 6: Every non-zero element has an inverse "
      ],
      "ans": "ℤ₇ is a field",
      "why": "When modulus is prime, every non-zero element has a multiplicative inverse"
    },
    {
      "q": "Why is ℤ₆ not a field?",
      "hint": "check inverses",
      "steps": [
        "Step 1: Consider ℤ₆ = {0,1,2,3,4,5}",
        "Step 2: Check multiplication mod 6",
        "Step 3: Try to find inverse of 2",
        "Step 4: 2 × 3 = 6 ≡ 0 (mod 6), not 1",
        "Step 5: So 2 has no inverse",
        "Step 6: Conclude not all elements have inverses"
      ],
      "ans": "ℤ₆ is not a field",
      "why": "Non-prime modulus leads to missing multiplicative inverses"
    },
    {
      "q": "Give an example showing why fields allow division",
      "hint": "inverse existence",
      "steps": [
        "Step 1: Take a non-zero element, e.g. 4 in ℚ",
        "Step 2: Find inverse → 1/4",
        "Step 3: Multiply 4 × 1/4 = 1",
        "Step 4: This shows division is possible",
        "Step 5: Repeat for any non-zero rational number"
      ],
      "ans": "Division works in ℚ because every non-zero element has an inverse",
      "why": "Fields guarantee existence of multiplicative inverses for all non-zero elements"
    },
    {
      "q": "What condition ensures a ring becomes a field?",
      "hint": "invertibility",
      "steps": [
        "Step 1: Start with a ring (addition + multiplication)",
        "Step 2: Check existence of multiplicative identity",
        "Step 3: Ensure every non-zero element has an inverse",
        "Step 4: Verify division is always possible (except 0)",
        "Step 5: If all hold, structure is a field"
      ],
      "ans": "Every non-zero element must have a multiplicative inverse",
      "why": "This property upgrades a ring into a field"
    }
  ]
);

add(
  "math",
  "abstract_algebra",
  "Symmetry Structures",

  `
<h2> Symmetry in Algebra</h2>
<h3> DEEP NOTES</h3>
<p>
Symmetry transformations (rotation, reflection, translation) form mathematical structures called groups because they preserve structure while changing position.
</p>

<pre>
Object → Transformation → Same Structure (Invariant)
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Does a rectangle have rotational symmetry?</p>

<p><b>Step 1:</b> Rotate rectangle by 180°</p>
<p><b>Step 2:</b> Shape matches original position</p>
<p><b>Step 3:</b> Check if unchanged after rotation</p>

<p><b>Final Answer:</b> Yes, a rectangle has 180° rotational symmetry</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> How many lines of symmetry does a square have?</p>

<p><b>Step 1:</b> Check vertical line through center</p>
<p><b>Step 2:</b> Check horizontal line through center</p>
<p><b>Step 3:</b> Check diagonal lines</p>
<p><b>Step 4:</b> Count all valid symmetry lines</p>

<p><b>Final Answer:</b> 4 lines of symmetry</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What happens to a circle under rotation?</p>

<p><b>Step 1:</b> Rotate circle by any angle</p>
<p><b>Step 2:</b> Compare shape before and after</p>
<p><b>Step 3:</b> Observe no visible change</p>

<p><b>Final Answer:</b> Circle has infinite rotational symmetry</p>

---

<h3> DIAGRAM</h3>

<pre>
Square symmetry:

   ↻ 90°
 ┌─────┐
 │    │  → unchanged
 └─────┘

Axes:
  | vertical line
  — horizontal line
   diagonal lines
</pre>

---
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Crystallography and mineral structures</li>
<li>Molecular chemistry bonding</li>
<li>Computer graphics and animation design</li>
</ul>

---
`,

  [
    {
      "q": "How many lines of symmetry does a regular hexagon have?",
      "hint": "count axes through vertices and edges",
      "steps": [
        "Step 1: Identify shape → regular hexagon",
        "Step 2: Count lines through opposite vertices",
        "Step 3: Count lines through midpoints of opposite sides",
        "Step 4: Add all valid symmetry axes",
        "Step 5: Total = 6 lines of symmetry"
      ],
      "ans": "6",
      "why": "A regular hexagon is highly symmetric with equal rotational and reflectional structure"
    },
    {
      "q": "What is the order of rotational symmetry of a regular pentagon?",
      "hint": "360° divided by steps",
      "steps": [
        "Step 1: Total rotation = 360°",
        "Step 2: Divide by smallest angle that maps onto itself",
        "Step 3: For pentagon, angle = 72°",
        "Step 4: 360 ÷ 72 = 5",
        "Step 5: Count valid rotations"
      ],
      "ans": "5",
      "why": "A regular pentagon maps onto itself 5 times in a full rotation"
    },
    {
      "q": "Does a scalene triangle have symmetry?",
      "hint": "check equal sides",
      "steps": [
        "Step 1: Identify triangle type → scalene",
        "Step 2: Check side lengths → all unequal",
        "Step 3: Try reflection symmetry → fails",
        "Step 4: Try rotational symmetry → fails",
        "Step 5: Conclude no symmetry exists"
      ],
      "ans": "No symmetry",
      "why": "Scalene triangles lack equal sides or angles, so no invariance exists"
    },
    {
      "q": "Why do symmetries form a group in mathematics?",
      "hint": "closure under composition",
      "steps": [
        "Step 1: Take two symmetry operations",
        "Step 2: Apply one after another (composition)",
        "Step 3: Result is still a symmetry",
        "Step 4: Identity transformation exists",
        "Step 5: Every symmetry has an inverse",
        "Step 6: Conclude group structure is formed"
      ],
      "ans": "Because symmetries are closed under composition and have identity and inverses",
      "why": "All group axioms are satisfied by symmetry transformations"
    }
  ]
);

add(
  "math",
  "abstract_algebra",
  "Group Operations",

  `
<h2> Group Operations</h2>

<h3> DEEP NOTES</h3>
<p>
A group operation is a rule that combines two elements of a set to produce another element in the same set. For a structure to be a group, it must satisfy closure, associativity, identity, and inverses.
</p>

<pre>
a * b → element in same set G
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> If a * b = a + b on integers, check closure.</p>

<p><b>Step 1:</b> Take any integers a, b</p>
<p><b>Step 2:</b> a + b is always an integer</p>

<p><b>Final Answer:</b> Closure holds because sum of integers is an integer</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Find identity element for a * b = a + b</p>

<p><b>Step 1:</b> Let identity be e</p>
<p><b>Step 2:</b> a + e = a</p>
<p><b>Step 3:</b> e = 0</p>

<p><b>Final Answer:</b> Identity element is 0</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Does every integer have an inverse under a * b = a + b?</p>

<p><b>Step 1:</b> Inverse means a + x = 0</p>
<p><b>Step 2:</b> x = -a exists for all integers</p>

<p><b>Final Answer:</b> Yes, every integer has an inverse (-a)</p>

---

<h3> DIAGRAM</h3>

<pre>
a * b = a + b → result ∈ Z (closed system)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Cryptographic key operations</li>
<li>Computer algebra systems</li>
<li>Error-correcting codes</li>
</ul>

---
`,

  [
    {
      "q": "Check closure: Is the set of even integers closed under addition?",
      "hint": "add two even numbers",
      "steps": [
        "Step 1: Let two even integers be 2a and 2b",
        "Step 2: Add them → 2a + 2b",
        "Step 3: Factor → 2(a + b)",
        "Step 4: Since (a + b) is integer, result is even",
        "Step 5: Result stays in the same set"
      ],
      "ans": "Yes, even integers are closed under addition",
      "why": "Sum of two even numbers is always even"
    },
    {
      "q": "Find identity element for multiplication in real numbers",
      "hint": "a × e = a",
      "steps": [
        "Step 1: Let identity be e",
        "Step 2: Write equation a × e = a",
        "Step 3: Divide both sides by a (a ≠ 0)",
        "Step 4: e = 1",
        "Step 5: Check: a × 1 = a"
      ],
      "ans": "1",
      "why": "1 leaves every real number unchanged under multiplication"
    },
    {
      "q": "Find inverse of 8 under multiplication",
      "hint": "a × a⁻¹ = 1",
      "steps": [
        "Step 1: Let inverse be x",
        "Step 2: Write 8 × x = 1",
        "Step 3: Solve x = 1/8",
        "Step 4: Verify: 8 × 1/8 = 1"
      ],
      "ans": "1/8",
      "why": "Multiplicative inverse produces identity element 1"
    },
    {
      "q": "Is closure satisfied for subtraction in integers?",
      "hint": "check result set",
      "steps": [
        "Step 1: Take two integers, e.g. 3 and 7",
        "Step 2: Compute 3 - 7 = -4",
        "Step 3: Check if -4 is integer",
        "Step 4: Try general form a - b = integer",
        "Step 5: Conclude result stays in integers"
      ],
      "ans": "Yes, integers are closed under subtraction",
      "why": "Subtracting integers always produces an integer"
    }
  ]
);

add(
  "math",
  "abstract_algebra",
  "Applications of Abstract Algebra",

  `
<h2> Applications of Abstract Algebra</h2>

<h3> DEEP NOTES</h3>
<p>
Abstract algebra studies mathematical structures such as groups, rings, and fields. It focuses on how operations behave rather than just numerical values, making it essential in modern computing, physics, and cryptography.
</p>

<pre>
Groups → Rings → Fields → Applied Systems (Cryptography, Physics, Computing)
</pre>

---

<h3> EXAMPLES</h3>
<ul>
<li>RSA encryption and public-key cryptography</li>
<li>Symmetry groups in quantum physics</li>
<li>Error-correcting codes in computer science</li>
</ul>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why is abstract algebra important in cryptography?</p>

<p><b>Step 1:</b> Cryptography relies on mathematical structure</p>
<p><b>Step 2:</b> Groups and fields define secure operations</p>

<p><b>Final Answer:</b> It provides the mathematical structure used in encryption systems like RSA</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Give one real-life application of group theory.</p>

<p><b>Step 1:</b> Identify symmetry systems</p>
<p><b>Step 2:</b> Physics and molecular structures use symmetry</p>

<p><b>Final Answer:</b> Quantum physics symmetry and particle behavior</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why does abstract algebra focus on structure instead of numbers?</p>

<p><b>Step 1:</b> Numbers vary across problems</p>
<p><b>Step 2:</b> Structures remain consistent across systems</p>

<p><b>Final Answer:</b> Because it generalizes patterns that apply across many mathematical systems</p>

---

<h3> DIAGRAM</h3>

<pre>
Groups → Rings → Fields → Cryptography → Computing & Physics
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Secure communication systems (RSA, ECC)</li>
<li>Quantum mechanics symmetry modeling</li>
<li>Computer algorithms and error correction</li>
</ul>

---
`,

  [
    {
      "q": "Check if (ℤ, +) forms a group under addition",
      "hint": "verify 4 group properties",
      "steps": [
        "Step 1: Closure → a + b is always an integer ",
        "Step 2: Associativity → (a + b) + c = a + (b + c) ",
        "Step 3: Identity → 0 satisfies a + 0 = a ",
        "Step 4: Inverse → for every a, inverse is -a ",
        "Step 5: All group axioms satisfied"
      ],
      "ans": "Yes, (ℤ, +) is a group",
      "why": "All four group properties (closure, associativity, identity, inverse) hold"
    },
    {
      "q": "Check if (ℤ, ×) forms a group under multiplication",
      "hint": "look for inverse property",
      "steps": [
        "Step 1: Closure → integer × integer = integer ",
        "Step 2: Associativity → multiplication is associative ",
        "Step 3: Identity → 1 satisfies a × 1 = a ",
        "Step 4: Inverse → 1/a is not always integer ",
        "Step 5: Conclude structure fails group condition"
      ],
      "ans": "No, (ℤ, ×) is not a group",
      "why": "Not every element has a multiplicative inverse in integers"
    },
    {
      "q": "Why is abstract algebra used in cryptography systems?",
      "hint": "structure + security",
      "steps": [
        "Step 1: Identify need for secure communication",
        "Step 2: Use groups and modular arithmetic",
        "Step 3: Apply hard problems like factoring primes",
        "Step 4: Encode data using algebraic structures",
        "Step 5: Decode only with valid keys"
      ],
      "ans": "Because it provides secure mathematical structures for encryption",
      "why": "Group and field structures support encryption algorithms like RSA"
    },
    {
      "q": "Check if rational numbers (ℚ) form a field",
      "hint": "verify division property",
      "steps": [
        "Step 1: Check closure under addition ",
        "Step 2: Check closure under multiplication ",
        "Step 3: Check additive inverse exists ",
        "Step 4: Check multiplicative inverse exists for all non-zero numbers ",
        "Step 5: Division is possible (except by 0)"
      ],
      "ans": "Yes, ℚ is a field",
      "why": "All field properties including inverses are satisfied"
    }
  ]
);

add(
  "math",
  "cryptography",
  "Introduction to Cryptography",

  `
<h2> Cryptography Basics</h2>

<h3> DEEP NOTES</h3>
<p>
Cryptography is the science of securing information using mathematical techniques so that only authorized users can read it. It is the foundation of digital security systems.
</p>

<pre>
Plaintext → Encryption → Ciphertext → Decryption → Plaintext
</pre>

---

<h3> KEY IDEA</h3>
<ul>
<li><b>Encryption:</b> converting readable data into hidden form</li>
<li><b>Decryption:</b> converting hidden data back to readable form</li>
<li><b>Key:</b> secret value used to lock and unlock data</li>
</ul>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why do we need encryption in communication?</p>

<p><b>Step 1:</b> Data travels over insecure networks</p>
<p><b>Step 2:</b> Attackers can intercept messages</p>
<p><b>Step 3:</b> Encryption hides the meaning</p>

<p><b>Final Answer:</b> To protect data from unauthorized access during transmission</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Differentiate between encryption and decryption.</p>

<p><b>Step 1:</b> Identify process directions</p>
<p><b>Step 2:</b> Encryption = hiding, Decryption = revealing</p>

<p><b>Final Answer:</b> Encryption hides data while decryption restores it to readable form</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What role does a key play in cryptography?</p>

<p><b>Step 1:</b> Encryption needs a secret value</p>
<p><b>Step 2:</b> Decryption uses same or related key</p>

<p><b>Final Answer:</b> A key is used to encrypt and decrypt information securely</p>

---

<h3> DIAGRAM</h3>

<pre>
User A →  Encryption → Internet →  Decryption → User B
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Online banking systems</li>
<li>Secure messaging apps (WhatsApp, Telegram)</li>
<li>Email and password protection</li>
</ul>

---
`,

  [
    {
      "q": "What is encryption?",
      "hint": "hiding data",
      "ans": "converting data into unreadable form",
      "why": "protects sensitive information"
    },
    {
      "q": "What is the purpose of a cryptographic key?",
      "hint": "lock and unlock",
      "ans": "to encrypt and decrypt data securely",
      "why": "ensures only authorized access"
    },
    {
      "q": "Why is cryptography important in modern systems?",
      "hint": "security",
      "ans": "it protects communication and data from unauthorized access",
      "why": "ensures confidentiality and data safety"
    }
  ]
);

add(
  "math",
  "cryptography",
  "Modular Arithmetic in Encryption",

  `
<h2> Modular Arithmetic in Cryptography</h2>

<h3> DEEP NOTES</h3>
<p>
Cryptography uses modular arithmetic because it creates repeating (cyclic) number systems that are difficult to reverse without the key. It keeps numbers within a fixed range, which is essential for encryption algorithms.
</p>

<pre>
(a + b) mod n
(a × b) mod n
a^k mod n
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Compute 7 × 8 mod 5</p>

<p><b>Step 1:</b> Multiply</p>
<p>7 × 8 = 56</p>

<p><b>Step 2:</b> Divide by 5</p>
<p>56 ÷ 5 = 11 remainder 1</p>

<p><b>Step 3:</b> Take remainder</p>
<p><b>Final Answer:</b> 1</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Compute (15 + 9) mod 7</p>

<p><b>Step 1:</b> Add</p>
<p>15 + 9 = 24</p>

<p><b>Step 2:</b> Divide by 7</p>
<p>24 ÷ 7 = 3 remainder 3</p>

<p><b>Final Answer:</b> 3</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why is modular arithmetic used in cryptography?</p>

<p><b>Step 1:</b> Encryption produces large numbers</p>
<p><b>Step 2:</b> Mod keeps values within a fixed range</p>

<p><b>Final Answer:</b> To control number size and create cyclic patterns that are hard to reverse</p>

---

<h3> DIAGRAM</h3>

<pre>
Cycle mod 5:
0 → 1 → 2 → 3 → 4 → 0 → repeat
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>RSA encryption system</li>
<li>Hashing functions</li>
<li>Digital signatures</li>
<li>Computer security protocols</li>
</ul>

---
`,

  [
    {
      "q": "What does mod mean?",
      "hint": "remainder",
      "ans": "remainder after division",
      "why": "used to keep values within a fixed range"
    },
    {
      "q": "Why is modular arithmetic important in cryptography?",
      "hint": "cyclic system",
      "ans": "it keeps values within a fixed range and enables secure encryption systems",
      "why": "prevents overflow and supports encryption cycles"
    },
    {
      "q": "Give one operation used in modular arithmetic.",
      "hint": "addition or multiplication",
      "ans": "(a + b) mod n or (a × b) mod n",
      "why": "basic operations used in cryptographic algorithms"
    }
  ]
);

add(
  "math",
  "cryptography",
  "RSA Encryption System",

  `
<h2> RSA Encryption System</h2>

<h3> DEEP NOTES</h3>
<p>
RSA is a public-key cryptography system based on the difficulty of factoring large prime numbers. It uses two keys: a public key for encryption and a private key for decryption.
</p>

<pre>
Plaintext → Encrypt (Public Key) → Ciphertext → Decrypt (Private Key) → Plaintext
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Simple RSA encryption: p = 3, q = 11, e = 3, M = 4. Find ciphertext.</p>

<p><b>Step 1:</b> Compute n = p × q = 3 × 11 = 33</p>
<p><b>Step 2:</b> Apply formula C = M^e mod n</p>

<pre>
C = 4^3 mod 33
C = 64 mod 33
C = 31
</pre>

<p><b>Final Answer:</b> Ciphertext = 31</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Why are large primes used in RSA?</p>

<p><b>Step 1:</b> Encryption depends on factorization</p>
<p><b>Step 2:</b> Large numbers are hard to factor</p>
<p><b>Final Answer:</b> To make decryption without the private key extremely difficult</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> What does modular arithmetic do in RSA?</p>

<p><b>Step 1:</b> After exponentiation, numbers become large</p>
<p><b>Step 2:</b> Modulus keeps results within range</p>
<p><b>Final Answer:</b> It ensures results stay within a fixed number system</p>

---

<h3> DIAGRAM</h3>

<pre>
Plaintext (M)
   ↓ encryption (M^e mod n)
Ciphertext (C)
   ↓ decryption
Plaintext recovered
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Secure web browsing (HTTPS)</li>
<li>Banking and online transactions</li>
<li>Digital signatures and authentication</li>
</ul>

---
`,

  [
    {
      "q": "What is RSA based on?",
      "hint": "prime numbers",
      "ans": "large prime factorization",
      "why": "security depends on difficulty of factoring large numbers"
    },
    {
      "q": "What are the two keys in RSA?",
      "hint": "public and private",
      "ans": "public key and private key",
      "why": "one encrypts and the other decrypts"
    },
    {
      "q": "Why is modular arithmetic used in RSA?",
      "hint": "large numbers",
      "ans": "to keep results within a fixed range",
      "why": "prevents values from becoming too large during computation"
    }
  ]
);

add(
  "math",
  "cryptography",
  "Hashing Functions",

  `
<h2> Hashing Functions</h2>

<h3> DEEP NOTES</h3>
<p>
Hashing converts data into a fixed-size value (hash) using a mathematical function. It is a one-way process, meaning the original input cannot be recovered from the output.
</p>

<pre>
Data → Hash Function → Fixed-size Hash Output
</pre>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why is hashing called a one-way function?</p>
<p><b>Step 1:</b> Data is converted using a mathematical function</p>
<p><b>Step 2:</b> Output loses original structure</p>
<p><b>Step 3:</b> Original input cannot be reconstructed</p>
<p><b>Final Answer:</b> Because it is impossible to reverse the hash back to the original data</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Give two uses of hashing in computing.</p>
<p><b>Step 1:</b> Identify security systems</p>
<p><b>Step 2:</b> Identify verification systems</p>
<p><b>Final Answer:</b> Password storage and data integrity checking</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why is hashing used instead of storing plain passwords?</p>
<p><b>Step 1:</b> Plain passwords can be stolen easily</p>
<p><b>Step 2:</b> Hashing converts them into unreadable values</p>
<p><b>Final Answer:</b> To protect user passwords from being exposed directly</p>

---

<h3> DIAGRAM</h3>

<pre>
Password → Hash Function → 9f3a2c7d... (fixed output)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Password storage systems</li>
<li>Blockchain transaction verification</li>
<li>File integrity checking (virus detection, downloads)</li>
</ul>

---
`,

  [
    {
      "q": "What is a simple hash of a number using mod 10?",
      "hint": "remainder operation",
      "steps": [
        "Step 1: Take a number, e.g. 347",
        "Step 2: Apply hash function h(x) = x mod 10",
        "Step 3: Compute 347 ÷ 10 = 34 remainder 7",
        "Step 4: Extract remainder",
        "Step 5: Final hash value = 7"
      ],
      "ans": "7",
      "why": "Modular arithmetic reduces data into fixed-size outputs"
    },
    {
      "q": "If two inputs have same hash, what is it called?",
      "hint": "collision",
      "steps": [
        "Step 1: Take two inputs x and y",
        "Step 2: Compute h(x) and h(y)",
        "Step 3: Compare outputs",
        "Step 4: If h(x) = h(y), identify event",
        "Step 5: Recognize collision condition"
      ],
      "ans": "hash collision",
      "why": "Different inputs producing same hash value is called a collision"
    },
    {
      "q": "Why is hashing useful in password systems?",
      "hint": "security comparison",
      "steps": [
        "Step 1: User creates password",
        "Step 2: System applies hash function",
        "Step 3: Store only hashed value, not original password",
        "Step 4: On login, input is hashed again",
        "Step 5: Compare hashes instead of raw password"
      ],
      "ans": "Because it stores passwords securely without revealing original data",
      "why": "Hashing ensures original password is never directly stored"
    },
    {
      "q": "What happens if hashing is reversed?",
      "hint": "one-way function",
      "steps": [
        "Step 1: Hash function compresses input",
        "Step 2: Original data structure is lost",
        "Step 3: Multiple inputs can map to same output",
        "Step 4: No unique reverse mapping exists",
        "Step 5: Therefore reversal is impossible"
      ],
      "ans": "It cannot be reversed",
      "why": "Hash functions are designed as one-way functions"
    }
  ]
);

add(
  "math",
  "cryptography",
  "Applications of Cryptography",

  `
<h2> Applications</h2>

<h3> DEEP NOTES</h3>
<p>
Cryptography protects digital communication and financial systems by converting readable data into secure formats that only authorized users can access.
</p>

<pre>
Plain Text → Encryption → Cipher Text → Decryption → Plain Text
</pre>

---

<h3> EXAMPLES</h3>
<ul>
<li>Online banking security</li>
<li>Secure messaging apps (e.g., WhatsApp encryption)</li>
<li>Blockchain and cryptocurrency systems</li>
</ul>

---

<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>

<p><b>Example 1</b></p>
<p><b>Question:</b> Why is cryptography important in online banking?</p>
<p><b>Step 1:</b> Banking data is transmitted over the internet</p>
<p><b>Step 2:</b> Hackers may try to intercept it</p>
<p><b>Step 3:</b> Encryption protects sensitive information</p>
<p><b>Final Answer:</b> It secures financial transactions and prevents unauthorized access</p>

<br>

<p><b>Example 2</b></p>
<p><b>Question:</b> Give two uses of cryptography in daily life.</p>
<p><b>Step 1:</b> Identify communication systems</p>
<p><b>Step 2:</b> Identify security systems</p>
<p><b>Final Answer:</b> Secure messaging apps and online banking</p>

<br>

<p><b>Example 3</b></p>
<p><b>Question:</b> Why is encryption necessary before sending data online?</p>
<p><b>Step 1:</b> Data can be intercepted during transmission</p>
<p><b>Step 2:</b> Encryption converts it into unreadable form</p>
<p><b>Final Answer:</b> To prevent unauthorized users from reading the data</p>

---

<h3> DIAGRAM</h3>

<pre>
User → Encryption → Internet → Decryption → Receiver
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Online banking systems</li>
<li>Secure communication platforms</li>
<li>Cryptocurrency transactions (Bitcoin, blockchain)</li>
</ul>

---
`,

  [
    {
      "q": "How does public key encryption work step-by-step?",
      "hint": "two-key process",
      "steps": [
        "Step 1: Receiver generates a key pair (public key + private key)",
        "Step 2: Public key is shared openly",
        "Step 3: Sender encrypts message using receiver’s public key",
        "Step 4: Encrypted message is sent through insecure channel",
        "Step 5: Receiver decrypts message using private key"
      ],
      "ans": "Message is encrypted with public key and decrypted with private key",
      "why": "Only the private key can reverse encryption done by the public key"
    },
    {
      "q": "Why can't the public key decrypt a message?",
      "hint": "asymmetric system",
      "steps": [
        "Step 1: Public key is used only for encryption",
        "Step 2: Private key is mathematically linked but not identical",
        "Step 3: Encryption transforms data using public key function",
        "Step 4: Reverse operation requires private key only",
        "Step 5: Public key cannot invert the process"
      ],
      "ans": "Because only the private key can decrypt the message",
      "why": "Asymmetric cryptography separates encryption and decryption roles"
    },
    {
      "q": "What happens if someone intercepts a public key message?",
      "hint": "security property",
      "steps": [
        "Step 1: Attacker intercepts encrypted message",
        "Step 2: They also know public key (it is public)",
        "Step 3: Try to decrypt message using public key",
        "Step 4: Encryption cannot be reversed without private key",
        "Step 5: Message remains secure"
      ],
      "ans": "They cannot read the message",
      "why": "Security relies on private key being secret"
    },
    {
      "q": "Why is cryptography important in online banking?",
      "hint": "protect transactions",
      "steps": [
        "Step 1: Financial data is sent over networks",
        "Step 2: Data is encrypted before transmission",
        "Step 3: Only bank server can decrypt it",
        "Step 4: Prevents attackers from reading data",
        "Step 5: Ensures secure transactions"
      ],
      "ans": "To protect financial data and transactions",
      "why": "Cryptography ensures confidentiality and integrity of sensitive information"
    }
  ]
);

add(
  "math",
  "game_theory",
  "Introduction to Game Theory",

  `
<h2> Game Theory Basics</h2>

<h3> DEEP NOTES</h3>
<p>
Game theory studies strategic interactions where the outcome of one person depends on the choices of others.
It is used to analyze competition, cooperation, and decision-making.
</p>
<pre>Players → Strategies → Payoffs → Outcome</pre>
<h3> KEY TERMS</h3>
<ul>
<li><b>Player:</b> decision maker</li>
<li><b>Strategy:</b> possible choice or action</li>
<li><b>Payoff:</b> result (gain or loss)</li>
</ul>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> In a payoff matrix, A has choices (6,3) or (2,5). Which should A choose?</p>
<p><b>Step 1:</b> Identify A’s payoffs</p>
<p>A1 = 6, A2 = 2</p>
<p><b>Step 2:</b> Compare values</p>
<p>6 > 2</p>
<p><b>Step 3:</b> Choose highest payoff</p>
<p><b>Final Answer:</b> Choose (6,3)</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> If Player B’s payoffs are 4 and 9, which strategy is optimal?</p>
<p><b>Step 1:</b> List payoffs</p>
<p>B1 = 4, B2 = 9</p>
<p><b>Step 2:</b> Compare values</p>
<p>9 > 4</p>
<p><b>Step 3:</b> Select maximum payoff</p>
<p><b>Final Answer:</b> Strategy with payoff 9</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> Find total payoff if both players choose (3,7) and (5,2)</p>
<p><b>Step 1:</b> Identify payoffs</p>
<p>Player A = 3 + 5</p>
<p>Player B = 7 + 2</p>
<p><b>Step 2:</b> Compute totals</p>
<p>A = 8, B = 9</p>
<p><b>Step 3:</b> Compare outcomes</p>
<p><b>Final Answer:</b> B has higher total payoff (9)</p>
<h3> DIAGRAM</h3>
<pre>
Payoff Matrix:

        B1     B2
A1     (6,3)  (2,5)
A2     (4,1)  (8,9)

→ Players choose highest payoff
→ Strategy interaction decides outcome
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Business competition</li>
<li>AI decision systems</li>
<li>Political negotiations</li>
</ul>

---
`,

  [
    {
      "q": "In a simple payoff game, choose strategy A or B: A = (5,2), B = (3,4). Which is better for Player 1?",
      "hint": "compare first values",
      "steps": [
        "Step 1: Identify payoffs for Player 1",
        "Step 2: Strategy A gives 5",
        "Step 3: Strategy B gives 3",
        "Step 4: Compare 5 vs 3",
        "Step 5: Choose higher payoff"
      ],
      "ans": "Strategy A",
      "why": "Player 1 maximizes payoff by choosing the higher value"
    },
    {
      "q": "Find Nash equilibrium in a coordination game",
      "hint": "best response match",
      "steps": [
        "Step 1: List strategies for both players",
        "Step 2: Check best response of Player 1",
        "Step 3: Check best response of Player 2",
        "Step 4: Find where both strategies match best responses",
        "Step 5: Identify stable outcome"
      ],
      "ans": "Mutual best response strategy pair",
      "why": "Nash equilibrium occurs when no player benefits from changing strategy alone"
    },
    {
      "q": "If Player A chooses between (2,10) and (8,3), what is rational choice for A?",
      "hint": "maximize payoff",
      "steps": [
        "Step 1: Extract Player A payoffs",
        "Step 2: First option gives 2",
        "Step 3: Second option gives 8",
        "Step 4: Compare 2 vs 8",
        "Step 5: Choose maximum payoff"
      ],
      "ans": "Choose (8,3)",
      "why": "Rational choice maximizes individual payoff"
    },
    {
      "q": "Why is game theory important in economics?",
      "hint": "strategic decisions",
      "steps": [
        "Step 1: Identify multiple decision makers",
        "Step 2: Each player affects others' outcomes",
        "Step 3: Model interactions mathematically",
        "Step 4: Predict optimal strategies",
        "Step 5: Apply to markets and competition"
      ],
      "ans": "It predicts optimal strategies in competitive environments",
      "why": "Game theory models strategic interdependence between rational agents"
    }
  ]
);

add(
  "math",
  "game_theory",
  "Payoff Matrices",

  `
<h2> Payoff Matrix</h2>

<h3> DEEP NOTES</h3>
<p>
A payoff matrix shows all possible outcomes for players based on the strategies they choose.
Each cell represents the result (payoff) for each player.
</p>
<h3> EXAMPLE MATRIX</h3>
<pre>
          B
        L     R
A   L (3,2) (1,4)
    R (0,0) (5,1)
</pre>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> What is the payoff when A chooses L and B chooses R?</p>
<p><b>Step 1:</b> Locate row A = L</p>
<p><b>Step 2:</b> Locate column B = R</p>
<p><b>Step 3:</b> Read the cell value</p>
<p><b>Final Answer:</b> (1,4)</p>
<p><b>Meaning:</b> A gets 1, B gets 4</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> What is the payoff when both A and B choose L?</p>
<p><b>Step 1:</b> Locate (L, L) cell</p>
<p><b>Step 2:</b> Read values</p>
<p><b>Final Answer:</b> (3,2)</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> Which outcome gives A the highest payoff?</p>
<p><b>Step 1:</b> Compare A’s values: 3, 1, 0, 5</p>
<p><b>Step 2:</b> Identify maximum value</p>
<p><b>Final Answer:</b> A gets highest payoff (5) at (R, R)</p>
<h3> DIAGRAM</h3>
<pre>
Matrix = strategic outcome grid
Each cell = (A payoff, B payoff)
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Business pricing competition</li>
<li>Military decision planning</li>
<li>AI multi-agent systems</li>
</ul>

---
`,

  [
    {
      "q": "In a payoff matrix, Player A chooses between (7,2) and (4,6). Which choice maximizes A’s payoff?",
      "hint": "compare first values only",
      "steps": [
        "Step 1: Identify Player A’s payoffs in each option",
        "Step 2: Option 1 gives A = 7",
        "Step 3: Option 2 gives A = 4",
        "Step 4: Compare 7 and 4",
        "Step 5: Choose the higher payoff"
      ],
      "ans": "Choose (7,2)",
      "why": "Player A maximizes gain by selecting the highest payoff value"
    },
    {
      "q": "If Player B’s payoffs are 3, 8, and 5, which strategy is best?",
      "hint": "maximize payoff",
      "steps": [
        "Step 1: List B’s payoffs: 3, 8, 5",
        "Step 2: Compare values",
        "Step 3: Identify maximum value",
        "Step 4: 8 is highest among all",
        "Step 5: Select strategy with payoff 8"
      ],
      "ans": "Strategy with payoff 8",
      "why": "Rational choice selects the maximum payoff"
    },
    {
      "q": "In a game cell (6,4), what does the ordered pair represent?",
      "hint": "first vs second player",
      "steps": [
        "Step 1: Identify structure (A, B)",
        "Step 2: First value = Player A payoff = 6",
        "Step 3: Second value = Player B payoff = 4",
        "Step 4: Interpret both outcomes together",
        "Step 5: Represent simultaneous result"
      ],
      "ans": "A gets 6 and B gets 4",
      "why": "Each cell shows outcomes for both players at once"
    },
    {
      "q": "If Player A gets (2,9) vs (8,1), what is total payoff comparison?",
      "hint": "add values",
      "steps": [
        "Step 1: Compute total for first option → 2 + 9 = 11",
        "Step 2: Compute total for second option → 8 + 1 = 9",
        "Step 3: Compare 11 and 9",
        "Step 4: Identify larger total",
        "Step 5: Choose better overall outcome"
      ],
      "ans": "First option (2,9)",
      "why": "Higher combined payoff indicates better outcome in total welfare sense"
    }
  ]
);

add(
  "math",
  "game_theory",
  "Nash Equilibrium",

  `
<h2> Nash Equilibrium</h2>
<h3> DEEP NOTES</h3>
<p>
A Nash equilibrium occurs when no player can improve their payoff by changing strategy alone, assuming the other players keep their strategies unchanged.
</p>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Find the Nash equilibrium in the payoff matrix:</p>
<pre>
          B
        L        R
A   L  (2,2)   (0,3)
    R  (3,0)   (1,1)
</pre>
<p><b>Step 1:</b> Find best response for Player A (row player)</p>
<ul>
  <li>If B chooses L → A compares 2 vs 3 → chooses R (3 > 2)</li>
  <li>If B chooses R → A compares 0 vs 1 → chooses R (1 > 0)</li>
</ul>
<p><b>Step 2:</b> Find best response for Player B (column player)</p>
<ul>
  <li>If A chooses L → B compares 2 vs 3 → chooses R (3 > 2)</li>
  <li>If A chooses R → B compares 0 vs 1 → chooses R (1 > 0)</li>
</ul>
<p><b>Step 3:</b> Identify mutual best responses</p>
<ul>
  <li>A always prefers R</li>
  <li>B always prefers R</li>
  <li>So intersection occurs at (R, R)</li>
</ul>
<p><b>Step 4:</b> Check stability</p>
<ul>
  <li>If A deviates from R → payoff decreases (1 → 0 or 3 → 2)</li>
  <li>If B deviates from R → payoff decreases (1 → 0 or 3 → 2)</li>
</ul>
<p><b>Final Answer:</b> Nash equilibrium = (R, R) with payoff (1,1)</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> Verify whether (L, L) is a Nash equilibrium in the same matrix.</p>
<p><b>Step 1:</b> Assume (L, L) gives payoff (2,2)</p>
<p><b>Step 2:</b> Check Player A deviation</p>
<ul>
  <li>If B plays L, A can switch to R and get 3 instead of 2</li>
  <li>So A has incentive to deviate </li>
</ul>
<p><b>Step 3:</b> Check Player B deviation</p>
<ul>
  <li>If A plays L, B can switch to R and get 3 instead of 2</li>
  <li>So B also has incentive to deviate </li>
</ul>
<p><b>Final Answer:</b> (L, L) is NOT a Nash equilibrium</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> Why does Nash equilibrium not always give maximum total payoff?</p
<p><b>Step 1:</b> Compare total payoffs in matrix</p>
<ul>
  <li>(L, L) → 2 + 2 = 4</li>
  <li>(L, R) → 0 + 3 = 3</li>
  <li>(R, L) → 3 + 0 = 3</li>
  <li>(R, R) → 1 + 1 = 2</li>
</ul>
<p><b>Step 2:</b> Identify maximum total payoff</p>
<ul>
  <li>Highest total = 4 at (L, L)</li>
</ul>
<p><b>Step 3:</b> Compare with Nash equilibrium</p>
<ul>
  <li>Nash equilibrium is (R, R), not (L, L)</li>
</ul>
<p><b>Final Answer:</b> Nash equilibrium is about stability, not total maximum payoff</p>
<br>
<h3> DIAGRAM</h3>
<pre>
Best response arrows:
A → chooses best row
B → chooses best column
Only intersection of best responses = equilibrium point
(R, R)
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Market price stability</li>
<li>Political strategy modeling</li>
<li>AI multi-agent systems</li>
</ul>

---
`,

  [
    {
      "q": "Find Nash equilibrium in a simple payoff matrix: (2,2), (0,3), (3,0), (1,1). Which outcome is stable?",
      "hint": "check best responses step by step",
      "steps": [
        "Step 1: List all outcomes: (2,2), (0,3), (3,0), (1,1)",
        "Step 2: For Player A, compare first values: 2, 0, 3, 1 → best is 3",
        "Step 3: For Player B, compare second values: 2, 3, 0, 1 → best is 3",
        "Step 4: Identify where both players are best responding",
        "Step 5: Check intersection of best responses",
        "Step 6: Only (0,3) is best for B but not A; (3,0) best for A but not B",
        "Step 7: (2,2) is the closest mutual best response consistency"
      ],
      "ans": "(2,2)",
      "why": "Nash equilibrium occurs where neither player can improve unilaterally"
    },
    {
      "q": "In a 2-player game, A chooses between 5 or 1, B chooses between 4 or 2. Find stable outcome assuming best response behavior",
      "hint": "maximize individually",
      "steps": [
        "Step 1: Player A compares 5 vs 1 → chooses 5",
        "Step 2: Player B compares 4 vs 2 → chooses 4",
        "Step 3: Combine best responses",
        "Step 4: Outcome becomes (5,4)",
        "Step 5: Check if deviation improves payoff",
        "Step 6: Neither player benefits from changing alone"
      ],
      "ans": "(5,4)",
      "why": "Both players are already playing their best responses"
    },
    {
      "q": "Why can Nash equilibrium fail to give the highest total payoff?",
      "hint": "individual vs collective",
      "steps": [
        "Step 1: Each player maximizes personal payoff",
        "Step 2: Compare individual vs total outcome",
        "Step 3: Note that best individual choices may conflict",
        "Step 4: Compute example totals",
        "Step 5: Observe that global maximum may differ from equilibrium"
      ],
      "ans": "Because players act individually, not cooperatively",
      "why": "Nash equilibrium is about stability, not total optimization"
    },
    {
      "q": "Check if (A chooses 3, B chooses 3) is a Nash equilibrium given best responses match",
      "hint": "no unilateral gain",
      "steps": [
        "Step 1: Assume outcome (3,3)",
        "Step 2: Check A’s deviation → any better than 3? No",
        "Step 3: Check B’s deviation → any better than 3? No",
        "Step 4: Both players satisfied with current choice",
        "Step 5: Confirm stability condition"
      ],
      "ans": "Yes, it is a Nash equilibrium",
      "why": "Neither player benefits from changing strategy alone"
    }
  ]
);

add(
  "math",
  "game_theory",
  "Dominant Strategies",

  `
<h2> Dominant Strategy</h2>

<h3> DEEP NOTES</h3>
<p>
A dominant strategy is a strategy that gives a player the best payoff no matter what the other player chooses.
</p>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Find the dominant strategy for Player A:</p>

<pre>
          B
        L        R
A   L  (2,1)   (1,0)
    R  (3,2)   (4,1)
</pre>
<p><b>Step 1:</b> Compare A’s payoffs when B chooses L</p>
<p>A gets 2 (L) vs 3 (R) → 3 > 2 so R is better</p>
<p><b>Step 2:</b> Compare A’s payoffs when B chooses R</p>
<p>A gets 1 (L) vs 4 (R) → 4 > 1 so R is better</p>
<p><b>Step 3:</b> Check consistency</p>
<p>R is better in BOTH cases</p>
<p><b>Final Answer:</b> R is a dominant strategy for Player A</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> Does Player B have a dominant strategy?</p>
<p><b>Step 1:</b> Compare B’s payoffs when A chooses L</p>
<p>B gets 1 (L) vs 0 (R) → L is better</p>
<p><b>Step 2:</b> Compare B’s payoffs when A chooses R</p>
<p>B gets 2 (L) vs 1 (R) → L is better</p>
<p><b>Step 3:</b> Check consistency</p>
<p>L is better in BOTH cases</p>
<p><b>Final Answer:</b> L is a dominant strategy for Player B</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> What is the outcome when both players use dominant strategies?</p>
<p><b>Step 1:</b> Player A chooses R (dominant)</p>
<p><b>Step 2:</b> Player B chooses L (dominant)</p>
<p><b>Step 3:</b> Combine strategies</p>
<pre>
Outcome = (R, L)
Payoff = (3,2)
</pre>
<p><b>Step 4:</b> Check stability</p>
<p>No player can improve payoff by switching alone</p>
<p><b>Final Answer:</b> (R, L) is the dominant strategy outcome</p>
<h3> DIAGRAM</h3>
<pre>
Best strategy arrows:
A: R dominates L → always choose R
B: L dominates R → always choose L
Result → (R, L)
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Business pricing decisions</li>
<li>Military strategy planning</li>
<li>AI decision optimization systems</li>
</ul>

---
`,

  [
    {
      "q": "In a payoff matrix, Player A has choices L and R. If A gets (5,1) from L and (6,2) from R depending on B’s actions, does A have a dominant strategy?",
      "hint": "compare A’s payoffs across all cases",
      "steps": [
        "Step 1: List A’s payoffs when B chooses first option",
        "Step 2: Compare L vs R → L gives 5, R gives 6 → R is better",
        "Step 3: List A’s payoffs when B chooses second option",
        "Step 4: Compare L vs R → L gives 1, R gives 2 → R is better",
        "Step 5: Check consistency across all scenarios",
        "Step 6: Since R is always higher, it is dominant"
      ],
      "ans": "Yes, R is a dominant strategy",
      "why": "A dominant strategy gives a higher payoff in every possible case"
    },
    {
      "q": "Player B receives payoffs (3,4) if L is chosen and (7,2) if R is chosen. Does B have a dominant strategy?",
      "hint": "check each row case",
      "steps": [
        "Step 1: If A chooses L, compare B’s payoffs: 3 vs 4 → R is better",
        "Step 2: If A chooses R, compare B’s payoffs: 7 vs 2 → L is better",
        "Step 3: Compare results across both scenarios",
        "Step 4: B prefers R in one case and L in another",
        "Step 5: No single consistent best choice exists"
      ],
      "ans": "No dominant strategy",
      "why": "A dominant strategy must be best in all cases, which is not satisfied"
    },
    {
      "q": "Why is a dominant strategy useful in decision-making?",
      "hint": "no need to predict opponent",
      "steps": [
        "Step 1: Identify that payoff comparison is independent of opponent strategy",
        "Step 2: Player evaluates all possible opponent actions",
        "Step 3: Select strategy that always gives highest payoff",
        "Step 4: No need for prediction or complex analysis",
        "Step 5: Decision becomes simplified and stable"
      ],
      "ans": "It simplifies decision-making",
      "why": "Players can choose optimal strategy without forecasting others"
    },
    {
      "q": "Can a game have no dominant strategy equilibrium? Explain using reasoning steps.",
      "hint": "check consistency failure",
      "steps": [
        "Step 1: Consider a game where best responses change with opponent’s choice",
        "Step 2: Compare payoffs across different scenarios",
        "Step 3: Observe that no single strategy is always best",
        "Step 4: Identify dependency on opponent’s move",
        "Step 5: Conclude absence of dominance"
      ],
      "ans": "Yes, many games have no dominant strategy equilibrium",
      "why": "Dominance requires consistent superiority across all cases, which may not exist"
    }
  ]
);

add(
  "math",
  "game_theory",
  "Applications of Game Theory",

  `
<h2> Applications</h2>

<h3> DEEP NOTES</h3>
<p>
Game theory explains decision-making in competitive environments.
It studies how individuals or groups choose strategies when outcomes depend on others’ choices.
</p>
<h3> EXAMPLES</h3>
<ul>
<li>Business pricing wars</li>
<li>AI reinforcement learning</li>
<li>Political voting systems</li>
</ul>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> Find the optimal pricing strategy using a simple payoff comparison:</p>
<pre>
Firm A prices: High (H), Low (L)
Firm B prices: High (H), Low (L)
Payoffs:
(H,H) → (4,4)
(H,L) → (1,6)
(L,H) → (6,1)
(L,L) → (3,3)
</pre>
<p><b>Step 1:</b> Compare Firm A payoffs</p>
<ul>
  <li>If B chooses H → A gets 4 (H) vs 6 (L) → L is better</li>
  <li>If B chooses L → A gets 1 (H) vs 3 (L) → L is better</li>
</ul>
<p><b>Step 2:</b> Compare Firm B payoffs</p>
<ul>
  <li>If A chooses H → B gets 4 (H) vs 6 (L) → L is better</li>
  <li>If A chooses L → B gets 1 (H) vs 3 (L) → L is better</li>
</ul>
<p><b>Step 3:</b> Identify equilibrium</p>
<ul>
  <li>Both firms choose L as best response</li>
</ul>
<p><b>Final Answer:</b> Nash equilibrium = (L, L)</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> How does reinforcement learning connect to game theory mathematically?</p>
<p><b>Step 1:</b> Define reward function R(s,a)</p>
<p><b>Step 2:</b> Agent selects action maximizing expected payoff</p>
<p><b>Step 3:</b> Update rule improves strategy over time</p>
<p><b>Final Answer:</b> AI learns optimal strategy by maximizing expected utility in repeated games</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> Predict stable voting outcome using payoff logic:</p>
<pre>
Candidate strategies: Policy A, Policy B
Voters prefer:
A → 60 votes
B → 40 votes
</pre>
<p><b>Step 1:</b> Compare total support</p>
<p>A = 60, B = 40</p>
<p><b>Step 2:</b> Identify dominant choice</p>
<p>A receives higher payoff (votes)</p>
<p><b>Final Answer:</b> Policy A is the stable winning strategy</p>
<h3> DIAGRAM</h3>
<pre>
Strategic interaction flow:
Players → choices → payoff calculation → best response → equilibrium
</pre>
<h3> REAL WORLD APPLICATION</h3>
<ul>
<li>Business competition strategies</li>
<li>AI decision systems</li>
<li>Economic and political modeling</li>
</ul>

---
`,

  [
    {
      "q": "In a game, Player A chooses between strategies S1 and S2. Payoffs depend on Player B’s choice. If A gets (2,5) from S1 and (4,3) from S2 across B’s two possible actions, find A’s best response.",
      "hint": "compare payoffs in each scenario",
      "steps": [
        "Step 1: List A’s payoffs when B chooses first action: S1 = 2, S2 = 4",
        "Step 2: Compare values: 4 > 2 so S2 is better",
        "Step 3: List A’s payoffs when B chooses second action: S1 = 5, S2 = 3",
        "Step 4: Compare values: 5 > 3 so S1 is better",
        "Step 5: Identify best response changes with B’s action",
        "Step 6: Conclude no single dominant strategy for A"
      ],
      "ans": "Best response depends on B’s action",
      "why": "A best response is conditional, not fixed across all opponent choices"
    },
    {
      "q": "Two firms compete. Payoff matrix gives Firm A profits as (10,2) for strategy X and (6,6) for strategy Y depending on market response. Which strategy is safer (maximin idea)?",
      "hint": "choose worst-case payoff",
      "steps": [
        "Step 1: Identify worst-case for X → min(10,2) = 2",
        "Step 2: Identify worst-case for Y → min(6,6) = 6",
        "Step 3: Compare worst-case outcomes: 2 vs 6",
        "Step 4: Choose strategy with higher minimum payoff"
      ],
      "ans": "Strategy Y",
      "why": "Maximin strategy maximizes the worst-case payoff"
    },
    {
      "q": "Why does payoff depend on opponent strategy in game theory?",
      "hint": "interdependence",
      "steps": [
        "Step 1: Identify that players act simultaneously or sequentially",
        "Step 2: Each player’s choice affects outcomes of others",
        "Step 3: Payoff is computed at intersection of strategies",
        "Step 4: Recognize interdependent decision structure",
        "Step 5: Conclude payoff is not isolated but relational"
      ],
      "ans": "Because outcomes depend on all players’ choices",
      "why": "Game theory models interdependent decisions rather than isolated actions"
    }
  ]
);

add(
  "math",
  "fractals_chaos_theory",
  "Introduction to Fractals",

  `
<h2> Fractals</h2>

<h3> DEEP NOTES</h3>
<p>
A fractal is a shape that repeats its pattern at different scales (self-similarity).
Even when you zoom in, the structure looks similar.
</p>
<pre>
Self-similarity = same pattern at different scales
</pre>
<h3> KEY IDEA</h3>
<ul>
<li>Infinite detail</li>
<li>Repeating structure</li>
<li>Generated by simple rules</li>
</ul>
<h3> WORKED EXAMPLES (3 EXAM-STYLE)</h3>
<p><b>Example 1</b></p>
<p><b>Question:</b> A fractal starts with a line segment of length 1. Each step replaces every segment with 4 segments, each 1/3 the length. Find total length after 2 iterations.</p>
<p><b>Step 1:</b> Initial length = 1</p>
<p><b>Step 2:</b> After 1st iteration:</p>
<p>Number of segments = 4</p>
<p>Each length = 1/3</p>
<p>Total length = 4 × (1/3) = 4/3</p>
<p><b>Step 3:</b> After 2nd iteration:</p>
<p>Each of 4 segments becomes 4 more segments → total = 16 segments</p>
<p>Each length = 1/9</p>
<p>Total length = 16 × (1/9) = 16/9</p>
<p><b>Final Answer:</b> 16/9</p>
<br>
<p><b>Example 2</b></p>
<p><b>Question:</b> A fractal square is divided into 9 smaller squares. 1 square is removed each step. If original area = 1, find area after 2 steps.</p>
<p><b>Step 1:</b> Initial area = 1</p>
<p><b>Step 2:</b> After 1st step:</p>
<p>Remove 1/9 → remaining = 8/9</p>
<p><b>Step 3:</b> After 2nd step:</p>
<p>Each remaining square is subdivided again → keep 8/9 of previous area</p>
<p>New area = (8/9) × (8/9) = 64/81</p>
<p><b>Final Answer:</b> 64/81</p>
<br>
<p><b>Example 3</b></p>
<p><b>Question:</b> Why does fractal dimension not behave like normal geometry?</p>
<p><b>Step 1:</b> Normal shapes have integer dimensions (1D, 2D, 3D)</p>
<p><b>Step 2:</b> Fractals scale unevenly at different levels</p>
<p><b>Step 3:</b> Detail increases infinitely with zoom</p>
<p><b>Final Answer:</b> Because fractals have scaling complexity that produces non-integer (fractional) dimensions</p>
<h3> DIAGRAM</h3>
<pre>
Iteration 1 → simple shape
Iteration 2 → repeated branching
Iteration 3 → more detailed repetition
→ infinite self-similarity
</pre>
<h3> REAL WORLD APPLICATION (MATHEMATICAL VIEW)</h3>
<ul>
<li>Fractal dimension in coastlines (length increases with scale)</li>
<li>Iterative functions like z = z² + c</li>
<li>Recursive geometric construction rules</li>
<li>Nature patterns (trees, rivers)</li>
<li>Computer graphics</li>
<li>Medical imaging (lungs, blood vessels)</li>
</ul>

---
`,

  [
    {
      "q": "A fractal line starts with length 2. Each step replaces every segment with 3 segments, each half the length. Find total length after 2 iterations.",
      "hint": "track number of segments and scaling",
      "steps": [
        "Step 1: Initial length = 2",
        "Step 2: After 1st iteration: 3 segments, each length = 1 → total length = 3 × 1 = 3",
        "Step 3: After 2nd iteration: each of 3 segments becomes 3 segments → total segments = 9",
        "Step 4: Each segment length = 1/2",
        "Step 5: Total length = 9 × (1/2) = 9/2"
      ],
      "ans": "9/2",
      "why": "Fractal construction increases segments while scaling lengths, changing total measure each iteration"
    },
    {
      "q": "A fractal square keeps 1/4 of its area removed at each step. If initial area is 1, find area after 3 steps.",
      "hint": "multiply remaining fraction repeatedly",
      "steps": [
        "Step 1: Initial area = 1",
        "Step 2: After 1st step → remaining = 3/4",
        "Step 3: After 2nd step → (3/4) × (3/4) = 9/16",
        "Step 4: After 3rd step → (9/16) × (3/4) = 27/64"
      ],
      "ans": "27/64",
      "why": "Each iteration scales the remaining area multiplicatively"
    },
    {
      "q": "Why do fractals often produce infinite perimeter in finite area structures?",
      "hint": "increasing detail with scaling",
      "steps": [
        "Step 1: Each iteration adds more boundary detail",
        "Step 2: Segment length decreases but number increases faster",
        "Step 3: Total boundary length grows without bound",
        "Step 4: Area converges while perimeter diverges"
      ],
      "ans": "Infinite perimeter with finite area",
      "why": "Self-similar iteration increases boundary complexity at every scale"
    }
  ]
);

add(
  "math",
  "fractals_chaos_theory",
  "Mandelbrot Set",

  `
<h2> Mandelbrot Set</h2>

<h3> DEEP NOTES</h3>
<p>
The Mandelbrot set is a famous fractal formed by repeatedly applying a simple mathematical rule:
</p>
<pre>
z = z² + c
</pre>
<p>
Each point is tested by iteration. Some values remain bounded (stable), while others grow infinitely (diverge).
The boundary between these regions creates infinitely complex patterns.
</p>
<pre>
Stable values  → stay bounded  
Diverging values  → grow without limit
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Generated using simple iterative equations</li>
  <li>Produces infinite boundary detail when zoomed in</li>
  <li>Combines fractals and chaos concepts</li>
</ul>
<h3> WORKED EXAMPLES (MATHEMATICAL / ITERATION FORM)</h3>
<h4> Example 1: Escape condition (Mandelbrot iteration)</h4>
<p><b>Question:</b> For z₀ = 0 and c = 2, determine whether the point belongs to the Mandelbrot set using zₙ₊₁ = zₙ² + c.</p>
<p><b>Step 1:</b> Start with z₀ = 0</p>
<p><b>Step 2:</b> Compute iterations:</p>
<p>z₁ = 0² + 2 = 2</p>
<p>z₂ = 2² + 2 = 6</p>
<p>z₃ = 6² + 2 = 38</p>
<p><b>Step 3:</b> Observe behavior</p>
<p>Values grow without bound (diverge)</p>
<p><b>Final Answer:</b> c = 2 is NOT in the Mandelbrot set</p>
<h4> Example 2: Bounded orbit test</h4>
<p><b>Question:</b> For z₀ = 0 and c = 0.25, check boundedness for first iterations using zₙ₊₁ = zₙ² + c.</p>
<p><b>Step 1:</b> z₀ = 0</p>
<p><b>Step 2:</b> Compute:</p>
<p>z₁ = 0² + 0.25 = 0.25</p>
<p>z₂ = (0.25)² + 0.25 = 0.0625 + 0.25 = 0.3125</p>
<p>z₃ = (0.3125)² + 0.25 ≈ 0.0977 + 0.25 = 0.3477</p>
<p><b>Step 3:</b> Check growth</p>
<p>Values remain small and do not diverge</p>
<p><b>Final Answer:</b> Likely bounded (suggests membership in Mandelbrot set region)</p>
<h4> Example 3: Why boundary is fractal</h4>
<p><b>Question:</b> Why does the Mandelbrot boundary have infinite complexity?</p>
<p><b>Step 1:</b> Each point depends on infinite iterations</p>
<p><b>Step 2:</b> Small changes in c drastically change divergence behavior</p>
<p><b>Step 3:</b> Boundary separates convergence and divergence regions</p>
<p><b>Final Answer:</b> Because iterative feedback creates infinitely detailed separation between stable and unstable points</p>
<h3> DIAGRAM</h3>

<pre>
c values →
| bounded (inside set) | boundary | diverges |
        infinite zoom reveals new structure

Zoom → more patterns → infinite detail
 boundary never ends
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Computer-generated art and graphics</li>
  <li>Simulation of natural fractal structures</li>
  <li>Complex system modeling</li>
  <li>Signal and image processing</li>
</ul>

`,

  [
    {
      "q": "For c = 1, test whether it belongs to the Mandelbrot set using zₙ₊₁ = zₙ² + c starting from z₀ = 0.",
      "hint": "compute iterations and check divergence",
      "steps": [
        "Step 1: Start with z₀ = 0",
        "Step 2: Compute z₁ = 0² + 1 = 1",
        "Step 3: Compute z₂ = 1² + 1 = 2",
        "Step 4: Compute z₃ = 2² + 1 = 5",
        "Step 5: Compute z₄ = 5² + 1 = 26",
        "Step 6: Observe that values increase rapidly"
      ],
      "ans": "c = 1 is NOT in the Mandelbrot set",
      "why": "The sequence diverges to infinity, so the point is not bounded"
    },
    {
      "q": "For c = 0.2, test boundedness for first iterations of zₙ₊₁ = zₙ² + c starting from z₀ = 0.",
      "hint": "check growth pattern",
      "steps": [
        "Step 1: z₀ = 0",
        "Step 2: z₁ = 0² + 0.2 = 0.2",
        "Step 3: z₂ = (0.2)² + 0.2 = 0.04 + 0.2 = 0.24",
        "Step 4: z₃ = (0.24)² + 0.2 = 0.0576 + 0.2 = 0.2576",
        "Step 5: Values remain small and stable"
      ],
      "ans": "Likely in Mandelbrot set region (bounded behavior)",
      "why": "The iteration does not diverge, indicating stability"
    },
    {
      "q": "Why does the Mandelbrot set boundary contain infinite detail?",
      "hint": "small changes cause big effects",
      "steps": [
        "Step 1: Each point depends on repeated iteration",
        "Step 2: Slight changes in c change long-term behavior",
        "Step 3: Some points converge while nearby ones diverge",
        "Step 4: This creates a highly sensitive boundary",
        "Step 5: Zooming reveals new structures endlessly"
      ],
      "ans": "Because the boundary is infinitely sensitive and self-similar",
      "why": "Iterative systems amplify small differences, creating infinite fractal complexity"
    }
  ]
);

add(
  "math",
  "fractals_chaos_theory",
  "Chaos Theory",

  `
<h2> Chaos Theory</h2>

<h3> DEEP NOTES</h3>
<p>
Chaos theory is the study of systems that follow deterministic rules but show highly unpredictable behavior because they are extremely sensitive to initial conditions.
Even very small differences at the start can lead to completely different outcomes over time.
</p>
<pre>
Small change → amplified over time → large unpredictable outcome
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Chaotic systems are not random; they are deterministic</li>
  <li>They are extremely sensitive to initial conditions</li>
  <li>Long-term prediction becomes unreliable</li>
</ul>
<h3> WORKED EXAMPLES (MATHEMATICAL / CHAOS THEORY)</h3>
<h4> Example 1: Logistic map sensitivity</h4>
<p><b>Question:</b> For xₙ₊₁ = 3.2xₙ(1 − xₙ), compare two initial values x₀ = 0.50 and x₀ = 0.51 after one step.</p>
<p><b>Step 1:</b> Compute for x₀ = 0.50</p>
<p>x₁ = 3.2(0.5)(1 − 0.5) = 3.2(0.5)(0.5) = 0.8</p>
<p><b>Step 2:</b> Compute for x₀ = 0.51</p>
<p>x₁ = 3.2(0.51)(1 − 0.51) = 3.2(0.51)(0.49)</p>
<p>x₁ = 3.2(0.2499) = 0.79968</p>
<p><b>Step 3:</b> Compare results</p>
<p>0.80000 vs 0.79968 (small difference at first step)</p>
<p><b>Final Answer:</b> Small differences in initial conditions already begin to diverge</p>
<h4> Example 2: Growth of error in prediction</h4>
<p><b>Question:</b> If an error starts at 0.001 and doubles every step, what is the error after 5 steps?</p>
<p><b>Step 1:</b> Initial error = 0.001</p>
<p><b>Step 2:</b> After 1 step: 0.002</p>
<p><b>Step 3:</b> After 2 steps: 0.004</p>
<p><b>Step 4:</b> After 3 steps: 0.008</p>
<p><b>Step 5:</b> After 4 steps: 0.016</p>
<p><b>Step 6:</b> After 5 steps: 0.032</p>
<p><b>Final Answer:</b> 0.032</p>
<h4> Example 3: Why chaos is unpredictable</h4>
<p><b>Question:</b> Why does the equation xₙ₊₁ = rxₙ(1 − xₙ) become unpredictable for large r?</p>
<p><b>Step 1:</b> For large r, small changes in xₙ are amplified</p>
<p><b>Step 2:</b> Iteration compounds these changes repeatedly</p>
<p><b>Step 3:</b> System does not settle to a fixed pattern</p>
<p><b>Final Answer:</b> Because repeated nonlinear feedback amplifies small differences into unpredictable outcomes</p>
<h3> DIAGRAM</h3>
<pre>
x₀ = 0.50 → 0.8 → ...
x₀ = 0.51 → 0.79968 → ...
tiny difference → large divergence over time
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Weather forecasting systems</li>
  <li>Stock market behavior prediction</li>
  <li>Population growth modeling</li>
  <li>Engineering dynamic systems</li>
</ul>

`,

  [
    {
      "q": "For the system xₙ₊₁ = 2xₙ(1 − xₙ), compare x₀ = 0.40 and x₀ = 0.41 after one iteration.",
      "hint": "compute both and compare",
      "steps": [
        "Step 1: Use xₙ₊₁ = 2xₙ(1 − xₙ)",
        "Step 2: For x₀ = 0.40 → x₁ = 2(0.40)(1 − 0.40)",
        "Step 3: x₁ = 2(0.40)(0.60) = 0.48",
        "Step 4: For x₀ = 0.41 → x₁ = 2(0.41)(1 − 0.41)",
        "Step 5: x₁ = 2(0.41)(0.59) = 2(0.2419) = 0.4838",
        "Step 6: Compare results: 0.48 vs 0.4838"
      ],
      "ans": "Small initial difference (0.01) produces a growing difference after iteration",
      "why": "This shows sensitivity to initial conditions, a key property of chaos"
    },
    {
      "q": "For xₙ₊₁ = 3xₙ(1 − xₙ), compute one step for x₀ = 0.2 and x₀ = 0.21 and compare.",
      "hint": "logistic iteration",
      "steps": [
        "Step 1: Apply formula xₙ₊₁ = 3xₙ(1 − xₙ)",
        "Step 2: For x₀ = 0.2 → x₁ = 3(0.2)(0.8)",
        "Step 3: x₁ = 3(0.16) = 0.48",
        "Step 4: For x₀ = 0.21 → x₁ = 3(0.21)(0.79)",
        "Step 5: x₁ = 3(0.1659) = 0.4977",
        "Step 6: Compare results: 0.48 vs 0.4977"
      ],
      "ans": "A small difference in input leads to a noticeable change in output",
      "why": "Nonlinear feedback amplifies tiny initial differences"
    },
    {
      "q": "Why are chaotic systems deterministic but unpredictable?",
      "hint": "rules vs outcomes",
      "steps": [
        "Step 1: Chaotic systems follow fixed mathematical rules",
        "Step 2: No randomness is added in the equations",
        "Step 3: However, repeated iteration amplifies tiny errors",
        "Step 4: Measurement cannot be perfectly exact in real life",
        "Step 5: Therefore long-term prediction becomes unreliable"
      ],
      "ans": "They are deterministic but practically unpredictable due to error amplification",
      "why": "Even exact rules produce unpredictable behavior when sensitivity to initial conditions is high"
    }
  ]
);

add(
  "math",
  "fractals_chaos_theory",
  "Butterfly Effect",

  `
<h2> Butterfly Effect</h2>
<h3> DEEP NOTES</h3>
<p>
The butterfly effect describes how very small changes in the initial conditions of a system can lead to extremely large and unpredictable outcomes over time.
It is a key idea in chaos theory and explains why some systems are difficult to predict.
</p>
<pre>
Small change → amplified over time → large effect
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Small causes can lead to large consequences</li>
  <li>Systems must be highly sensitive to initial conditions</li>
  <li>Long-term prediction becomes difficult</li>
</ul>
<h3> WORKED EXAMPLES (MATHEMATICAL – BUTTERFLY EFFECT)</h3>
<h4> Example 1: Exponential sensitivity model</h4>
<p><b>Question:</b> A system follows Δx(t) = Δx₀ · 2ᵗ. If Δx₀ = 0.01, find Δx after 4 steps.</p>
<p><b>Step 1:</b> Write formula</p>
<p>Δx(t) = Δx₀ · 2ᵗ</p>
<p><b>Step 2:</b> Substitute values</p>
<p>Δx(4) = 0.01 · 2⁴</p>
<p><b>Step 3:</b> Compute power</p>
<p>2⁴ = 16</p>
<p><b>Step 4:</b> Multiply</p>
<p>Δx(4) = 0.01 × 16 = 0.16</p>
<p><b>Final Answer:</b> 0.16</p>
<h4> Example 2: Small difference amplification</h4>
<p><b>Question:</b> Two systems start at x₀ = 1.00 and x₀ = 1.01 and grow by xₙ₊₁ = 1.5xₙ. Compare after 3 steps.</p>
<p><b>Step 1:</b> Use exponential growth formula</p>
<p>xₙ = x₀ · 1.5ⁿ</p>
<p><b>Step 2:</b> For x₀ = 1.00</p>
<p>x₃ = 1.00 · 1.5³ = 3.375</p>
<p><b>Step 3:</b> For x₀ = 1.01</p>
<p>x₃ = 1.01 · 3.375 = 3.40875</p>
<p><b>Step 4:</b> Compare results</p>
<p>Difference = 3.40875 − 3.375 = 0.03375</p>
<p><b>Final Answer:</b> Small initial difference becomes amplified over time</p>
<h4> Example 3: Error growth in prediction</h4>
<p><b>Question:</b> An initial measurement error is 0.005 and increases by 20% each step. Find error after 5 steps.</p>
<p><b>Step 1:</b> Growth model</p>
<p>Eₙ = E₀(1.2)ⁿ</p>
<p><b>Step 2:</b> Substitute values</p>
<p>E₅ = 0.005 × (1.2)⁵</p>
<p><b>Step 3:</b> Compute power</p>
<p>(1.2)⁵ ≈ 2.48832</p>
<p><b>Step 4:</b> Multiply</p>
<p>E₅ ≈ 0.005 × 2.48832 = 0.0124416</p>
<p><b>Final Answer:</b> ≈ 0.01244</p>
<h3> DIAGRAM</h3>
<pre>
Small change (0.01)
        ↓
  exponential growth
        ↓
Large difference over time
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Climate and weather prediction</li>
  <li>Economic forecasting</li>
  <li>Artificial intelligence systems</li>
  <li>Population and ecological modeling</li>
</ul>
`,

  [
    {
      "q": "A system follows xₙ₊₁ = 2xₙ. If x₀ = 0.5, find x₃.",
      "hint": "repeated doubling",
      "steps": [
        "Step 1: Start with x₀ = 0.5",
        "Step 2: Apply rule x₁ = 2x₀ = 2 × 0.5 = 1",
        "Step 3: x₂ = 2x₁ = 2 × 1 = 2",
        "Step 4: x₃ = 2x₂ = 2 × 2 = 4"
      ],
      "ans": "4",
      "why": "Each step doubles the previous value, showing exponential growth"
    },
    {
      "q": "Compare the output after two steps for x₀ = 0.1 and x₀ = 0.11 in the system xₙ₊₁ = 1.5xₙ.",
      "hint": "calculate both and compare",
      "steps": [
        "Step 1: Use xₙ₊₁ = 1.5xₙ",
        "Step 2: For x₀ = 0.1 → x₁ = 1.5(0.1) = 0.15 → x₂ = 1.5(0.15) = 0.225",
        "Step 3: For x₀ = 0.11 → x₁ = 1.5(0.11) = 0.165 → x₂ = 1.5(0.165) = 0.2475",
        "Step 4: Compare: 0.225 vs 0.2475"
      ],
      "ans": "Small initial difference (0.01) produces larger difference (0.0225)",
      "why": "Exponential growth amplifies initial differences over time"
    },
    {
      "q": "In a chaotic system, why can small measurement errors lead to completely different outcomes?",
      "hint": "sensitivity to initial conditions",
      "steps": [
        "Step 1: Chaotic systems have high sensitivity",
        "Step 2: Tiny errors get multiplied repeatedly",
        "Step 3: Error grows exponentially with each iteration",
        "Step 4: Over time, predicted path diverges completely"
      ],
      "ans": "Because tiny errors are amplified exponentially through repeated nonlinear feedback",
      "why": "This extreme sensitivity makes long-term prediction impossible"
    },
    {
      "q": "Two initial values are x₀ = 10 and x₀ = 10.01 in a system xₙ₊₁ = 1.1xₙ. Find difference after 2 steps.",
      "hint": "track both sequences",
      "steps": [
        "Step 1: First system → 10 × 1.1 = 11, then 11 × 1.1 = 12.1",
        "Step 2: Second system → 10.01 × 1.1 = 11.011, then 11.011 × 1.1 = 12.1121",
        "Step 3: Compute difference → 12.1121 − 12.1 = 0.0121"
      ],
      "ans": "0.0121",
      "why": "Small initial differences grow over iterations, showing sensitivity"
    },
    {
      "q": "A prediction error starts at 0.002 and increases by factor 3 each step. Find error after 4 steps.",
      "hint": "exponential error growth",
      "steps": [
        "Step 1: Use formula Eₙ = E₀ × 3ⁿ",
        "Step 2: Substitute values → E₄ = 0.002 × 3⁴",
        "Step 3: Compute power → 3⁴ = 81",
        "Step 4: Multiply → 0.002 × 81 = 0.162"
      ],
      "ans": "0.162",
      "why": "Errors grow exponentially in chaotic systems, making long-term prediction difficult"
    }
  ]
);

add(
  "math",
  "fractals_chaos_theory",
  "Applications of Fractals and Chaos",

  `
<h2> Applications of Fractals and Chaos</h2>
<h3> DEEP NOTES</h3>
<p>
Chaos theory studies systems that follow precise mathematical rules but behave in ways that appear random due to extreme sensitivity to initial conditions.
Fractals describe patterns that repeat at different scales, creating complex structures from simple rules.
</p>
<pre>
Simple rules → complex behavior
Small change → large effect
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Chaotic systems are deterministic, not truly random</li>
  <li>Fractals show self-similarity at different scales</li>
  <li>Small differences in input can drastically change output</li>
</ul>
<h3> WORKED EXAMPLES (MATHEMATICAL / CHAOS & FRACTALS)</h3>
<h4> Example 1: Logistic Growth (Chaotic System)</h4>
<p><b>Question:</b> For xₙ₊₁ = 3.2xₙ(1 − xₙ), find x₁ and x₂ if x₀ = 0.5</p>
<p><b>Step 1:</b> Substitute x₀ into formula</p>
<p>x₁ = 3.2 × 0.5 × (1 − 0.5)</p>
<p>x₁ = 3.2 × 0.5 × 0.5 = 0.8</p>
<p><b>Step 2:</b> Compute next iteration</p>
<p>x₂ = 3.2 × 0.8 × (1 − 0.8)</p>
<p>x₂ = 3.2 × 0.8 × 0.2 = 0.512</p>
<p><b>Final Answer:</b> x₁ = 0.8, x₂ = 0.512</p>
<br>
<h4> Example 2: Sensitivity in Iteration</h4>
<p><b>Question:</b> Two values x₀ = 0.30 and x₀ = 0.31 follow xₙ₊₁ = 4xₙ(1 − xₙ). Compare x₁</p>
<p><b>Step 1:</b> First system</p>
<p>x₁ = 4 × 0.30 × (1 − 0.30)</p>
<p>x₁ = 4 × 0.30 × 0.70 = 0.84</p>
<p><b>Step 2:</b> Second system</p>
<p>x₁ = 4 × 0.31 × (1 − 0.31)</p>
<p>x₁ = 4 × 0.31 × 0.69 = 0.8556</p>
<p><b>Step 3:</b> Difference</p>
<p>0.8556 − 0.84 = 0.0156</p>
<p><b>Final Answer:</b> Small initial difference produces noticeable change</p>
<br>
<h4> Example 3: Fractal Scaling (Self-Similarity Rule)</h4>
<p><b>Question:</b> A fractal line doubles its segments each iteration. If S₀ = 1, find S₁, S₂, S₃</p>
<p><b>Step 1:</b> Apply rule Sₙ₊₁ = 2Sₙ</p>
<p>S₁ = 2 × 1 = 2</p>
<p><b>Step 2:</b> Next iteration</p>
<p>S₂ = 2 × 2 = 4</p>
<p><b>Step 3:</b> Next iteration</p>
<p>S₃ = 2 × 4 = 8</p>
<p><b>Final Answer:</b> S₁ = 2, S₂ = 4, S₃ = 8</p>
<br>
<h3> DIAGRAM</h3>
<pre>
Iteration rule → repeated application → complex structure
Logistic map:
x → x(1 − x) → nonlinear feedback → chaos
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Weather forecasting systems</li>
  <li>Stock market analysis</li>
  <li>Biological growth patterns (trees, lungs, veins)</li>
  <li>Computer graphics and natural modeling</li>
</ul>
`,

  [
    {
      "q": "What is a simple example showing chaos from a formula?",
      "hint": "iteration + feedback",
      "steps": [
        "Step 1: Use a nonlinear recurrence such as xₙ₊₁ = 3.9xₙ(1 − xₙ)",
        "Step 2: Choose initial value x₀ = 0.4",
        "Step 3: Compute x₁ = 3.9 × 0.4 × 0.6 = 0.936",
        "Step 4: Compute x₂ = 3.9 × 0.936 × (1 − 0.936) = 3.9 × 0.936 × 0.064 = 0.233",
        "Step 5: Observe rapid change in values despite simple rule"
      ],
      "ans": "Nonlinear iteration produces rapidly changing values",
      "why": "Feedback systems amplify small changes leading to chaotic behavior"
    },
    {
      "q": "Show sensitivity to initial conditions using two close values",
      "hint": "compare iterations",
      "steps": [
        "Step 1: Define function xₙ₊₁ = 4xₙ(1 − xₙ)",
        "Step 2: Start with x₀ = 0.50 → x₁ = 4 × 0.5 × 0.5 = 1.0",
        "Step 3: Start with x₀ = 0.51 → x₁ = 4 × 0.51 × 0.49 = 0.9996",
        "Step 4: After next iteration values diverge significantly",
        "Step 5: Small initial difference grows over time"
      ],
      "ans": "Small changes in start lead to large differences later",
      "why": "This demonstrates exponential divergence in chaotic systems"
    },
    {
      "q": "Generate a simple fractal pattern numerically",
      "hint": "repeated scaling",
      "steps": [
        "Step 1: Start with S₀ = 1",
        "Step 2: Apply rule Sₙ₊₁ = 3Sₙ",
        "Step 3: Compute S₁ = 3 × 1 = 3",
        "Step 4: Compute S₂ = 3 × 3 = 9",
        "Step 5: Compute S₃ = 3 × 9 = 27"
      ],
      "ans": "1, 3, 9, 27",
      "why": "Repeated scaling rules create self-similar structure at all levels"
    }
  ]
);

add(
  "math",
  "topology",
  "Introduction to Topology",

  `
<h2> Introduction to Topology</h2>
<h3> DEEP NOTES</h3>
<p>
Topology is a branch of mathematics that studies properties of shapes that remain unchanged under continuous deformation such as stretching, bending, or twisting, without tearing or cutting.
It focuses on structure and connectivity rather than measurements like length, angle, or area.
</p>
<pre>
Allowed  → stretch, bend, twist
Not allowed  → tear, cut, glue
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Size and angles are ignored</li>
  <li>Only connectivity and structure matter</li>
  <li>Shapes are equivalent if they can deform into each other continuously</li>
</ul>
<h3> WORKED EXAMPLES (MATHEMATICAL TOPOLOGY)</h3>
<h4> Example 1: Euler Characteristic of a Shape</h4>
<p><b>Question:</b> Find the Euler characteristic of a cube.</p>
<p><b>Step 1:</b> Identify vertices (V)</p>
<p>V = 8</p>
<p><b>Step 2:</b> Identify edges (E)</p>
<p>E = 12</p>
<p><b>Step 3:</b> Identify faces (F)</p>
<p>F = 6</p>
<p><b>Step 4:</b> Apply formula</p>
<p>χ = V − E + F</p>
<p>χ = 8 − 12 + 6</p>
<p>χ = 2</p>
<p><b>Final Answer:</b> χ = 2</p>
<h4> Example 2: Compare Topological Surfaces</h4>
<p><b>Question:</b> Are a sphere and cube topologically equivalent?</p>
<p><b>Step 1:</b> Compute Euler characteristic of cube</p>
<p>χ = 8 − 12 + 6 = 2</p>
<p><b>Step 2:</b> Known result for sphere</p>
<p>χ = 2</p>
<p><b>Step 3:</b> Compare invariants</p>
<p>Both have same Euler characteristic</p>
<p><b>Final Answer:</b> Yes, they are topologically equivalent</p>
<h4> Example 3: Torus (Donut Shape)</h4>
<p><b>Question:</b> What is the Euler characteristic of a torus?</p>
<p><b>Step 1:</b> Use known topological formula</p>
<p>χ = V − E + F for torus structure</p>
<p><b>Step 2:</b> Standard result</p>
<p>χ = 0</p>
<p><b>Step 3:</b> Compare with sphere</p>
<p>Sphere = 2, Torus = 0</p>
<p><b>Final Answer:</b> They are NOT topologically equivalent</p>
<h3> DIAGRAM</h3>
<pre>
Sphere (χ = 2)  ≈  Cube (χ = 2)
Torus (χ = 0)   ≠  Sphere (χ = 2)
Invariant → Euler characteristic
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Robotics path planning</li>
  <li>Computer graphics and animation</li>
  <li>Physics and spacetime modeling</li>
  <li>Network and connectivity analysis</li>
</ul>
`,

  [
    {
      "q": "Find Euler characteristic of a square (treated as a graph).",
      "hint": "use V − E + F",
      "steps": [
        "Step 1: Identify vertices (V) = 4 corners of the square",
        "Step 2: Identify edges (E) = 4 sides",
        "Step 3: Identify faces (F) = 1 interior region",
        "Step 4: Apply Euler formula χ = V − E + F",
        "Step 5: Substitute values χ = 4 − 4 + 1",
        "Step 6: Compute χ = 1"
      ],
      "ans": "χ = 1",
      "why": "Euler characteristic measures topological structure, not shape size"
    },
    {
      "q": "Compare topology of a triangle and a circle (as graphs)",
      "hint": "count structure, not shape",
      "steps": [
        "Step 1: Triangle has V = 3, E = 3, F = 1",
        "Step 2: Compute χ = 3 − 3 + 1 = 1",
        "Step 3: Circle boundary can be modeled as V = 1 loop, E = 1 loop",
        "Step 4: Compute χ = 1 − 1 + 1 = 1 (same invariant idea)",
        "Step 5: Compare Euler characteristics",
        "Step 6: Both give same topological invariant value"
      ],
      "ans": "They share the same Euler characteristic (χ = 1)",
      "why": "Topology compares invariants, not geometric shape"
    },
    {
      "q": "Determine if two shapes are topologically equivalent: stretched square → circle",
      "hint": "continuous deformation",
      "steps": [
        "Step 1: Start with a square shape",
        "Step 2: Apply continuous deformation (stretching only)",
        "Step 3: No tearing or cutting is allowed",
        "Step 4: Check connectivity is preserved",
        "Step 5: Confirm number of holes is unchanged (0 holes)",
        "Step 6: Conclude equivalence based on preserved topology"
      ],
      "ans": "Yes, they are topologically equivalent",
      "why": "Topology preserves connectivity under continuous deformation"
    }
  ]
);

add(
  "math",
  "topology",
  "Topological Deformation",

  `
<h2> Topological Deformation</h2>

<h3> DEEP NOTES</h3>
<p>
Deformation in topology refers to changing the shape of an object continuously without tearing, cutting, or gluing.
The focus is on preserving structure rather than exact geometry.
</p>
<pre>
Allowed  → stretch, bend, twist
Not allowed  → tear, cut, glue
</pre>
<h3> WORKED EXAMPLES (MATHEMATICAL TOPOLOGY + DEFORMATION)</h3>
<h4> Example 1: Euler Characteristic Check (Cube Deformation)</h4>
<p><b>Question:</b> A cube is continuously deformed into a sphere. Does the Euler characteristic change?</p>
<p><b>Step 1:</b> Compute Euler characteristic of cube</p>
<p>V = 8, E = 12, F = 6</p>
<p>χ = 8 − 12 + 6 = 2</p>
<p><b>Step 2:</b> Known invariant for sphere</p>
<p>χ = 2</p>
<p><b>Step 3:</b> Compare before and after deformation</p>
<p>Both values remain the same</p>
<p><b>Final Answer:</b> No, Euler characteristic does not change under continuous deformation</p>
<h4> Example 2: Genus (Hole Counting)</h4>
<p><b>Question:</b> How many holes does a torus have, and what does it imply?</p>
<p><b>Step 1:</b> Identify structure of torus (donut shape)</p>
<p>It has 1 hole</p>
<p><b>Step 2:</b> Use genus concept</p>
<p>Genus g = number of holes = 1</p>
<p><b>Step 3:</b> Compare with sphere</p>
<p>Sphere has g = 0</p>
<p><b>Final Answer:</b> Torus has 1 hole, so it is not equivalent to a sphere</p>
<h4> Example 3: Valid vs Invalid Deformation</h4>
<p><b>Question:</b> Is stretching a rubber sheet with a hole a valid topological deformation?</p>
<p><b>Step 1:</b> Observe transformation</p>
<p>Sheet is stretched without tearing</p>
<p><b>Step 2:</b> Check hole structure</p>
<p>Number of holes remains unchanged</p>
<p><b>Step 3:</b> Apply topology rule</p>
<p>No cutting or gluing occurs</p>
<p><b>Final Answer:</b> Yes, it is a valid continuous deformation</p>
<h3> DIAGRAM</h3>
<pre>
Cube (χ=2) → Stretch → Sphere (χ=2)
Torus (g=1) ≠ Sphere (g=0)
Topology invariants remain unchanged under deformation
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>3D modeling and animation</li>
  <li>Material science and elasticity</li>
  <li>Biological membrane modeling</li>
  <li>Computer graphics transformations</li>
</ul>
`,

  [
    {
      "q": "Find the genus of a sphere and determine if it can be transformed into a torus without cutting.",
      "hint": "think holes and deformation rules",
      "steps": [
        "Step 1: Identify the genus of a sphere → it has 0 holes (g = 0)",
        "Step 2: Identify the genus of a torus → it has 1 hole (g = 1)",
        "Step 3: Compare genus values (0 vs 1)",
        "Step 4: Apply topology rule: genus must remain unchanged under deformation",
        "Step 5: Check allowed operations (only stretching allowed, no cutting or gluing)",
        "Step 6: Conclude transformation is impossible under topological rules"
      ],
      "ans": "No, a sphere cannot be transformed into a torus without cutting or gluing",
      "why": "Genus is a topological invariant and cannot change under continuous deformation"
    },
    {
      "q": "Determine whether a cylinder is topologically equivalent to a circle",
      "hint": "check connectivity and holes",
      "steps": [
        "Step 1: Identify cylinder structure → 1 surface with 2 circular boundaries",
        "Step 2: Identify circle structure → 1 closed loop",
        "Step 3: Compare topology → cylinder has boundary edges, circle does not",
        "Step 4: Check deformation rules → no cutting or gluing allowed",
        "Step 5: Evaluate invariants (holes and boundaries differ)",
        "Step 6: Conclude they are not equivalent in topology"
      ],
      "ans": "No, a cylinder is not topologically equivalent to a circle",
      "why": "They differ in boundary structure and cannot be matched via continuous deformation"
    },
    {
      "q": "Is bending a sheet of paper without tearing a valid topological deformation?",
      "hint": "think allowed operations",
      "steps": [
        "Step 1: Observe transformation → paper is bent smoothly",
        "Step 2: Check if cutting occurs → no cutting or tearing",
        "Step 3: Check if gluing occurs → none applied",
        "Step 4: Verify continuity → surface remains connected",
        "Step 5: Apply definition of deformation → continuous change only",
        "Step 6: Conclude validity of transformation"
      ],
      "ans": "Yes, it is a valid topological deformation",
      "why": "Topology allows only continuous transformations that preserve structure"
    }
  ]
);

add(
  "math",
  "topology",
  "Connectedness",

  `
<h2> Connectedness</h2>
<h3> DEEP NOTES</h3>
<p>
A space is connected if it exists as a single whole piece without separation, gaps, or isolated parts.
In topology, connectedness focuses on whether points are all part of one unified structure.
</p>
<pre>
Connected  → one piece (no gaps)
Disconnected  → separated parts
</pre>
<h3> WORKED EXAMPLES (WITH MATHEMATICAL CONNECTION)</h3>
<h4> Example 4: Connected Graph Check</h4>
<p><b>Question:</b> Is the graph with edges {(1,2), (2,3), (3,4)} connected?</p>
<p><b>Step 1:</b> List vertices → {1, 2, 3, 4}</p>
<p><b>Step 2:</b> Check path between any two nodes</p>
<p>1 → 2 → 3 → 4 exists</p>
<p><b>Step 3:</b> All nodes are reachable from any starting node</p>
<p><b>Final Answer:</b> Yes, the graph is connected</p>
<h4> Example 5: Disconnected Graph Using Components</h4>
<p><b>Question:</b> Is the graph with edges {(1,2), (3,4)} connected?</p>
<p><b>Step 1:</b> Split into components</p>
<p>Component 1: {1,2}</p>
<p>Component 2: {3,4}</p>
<p><b>Step 2:</b> Check connectivity between components</p>
<p>No edge connects the two sets</p>
<p><b>Final Answer:</b> No, the graph is disconnected</p>
<h4> Example 6: Connectedness via Adjacency Matrix</h4>
<p><b>Question:</b> Determine if the graph is connected:</p>
<pre>
A = [
  [0,1,0],
  [1,0,1],
  [0,1,0]
]
</pre>
<p><b>Step 1:</b> Interpret matrix connections</p>
<p>1 connects to 2</p>
<p>2 connects to 1 and 3</p>
<p><b>Step 2:</b> Check reachability</p>
<p>1 → 2 → 3 path exists</p>
<p><b>Step 3:</b> All nodes reachable</p>
<p><b>Final Answer:</b> Graph is connected</p>
<h4> DIAGRAM</h4>
<pre>
Connected:        1—2—3—4
Disconnected:     1—2   3—4
Matrix form shows reachability paths
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Internet and communication networks</li>
  <li>Transport and road systems</li>
  <li>Social network structures</li>
  <li>Computer network topology</li>
</ul>
`,

  [
    {
      "q": "Is a graph with all vertices isolated considered connected?",
      "hint": "check path between nodes",
      "steps": [
        "Step 1: Identify vertices → multiple nodes exist",
        "Step 2: Check edges → no edges connect any vertices",
        "Step 3: Test connectivity → no path exists between any two nodes",
        "Step 4: Apply definition → a connected graph requires a path between every pair of vertices",
        "Step 5: Compare condition → requirement is not satisfied"
      ],
      "ans": "No, it is not connected",
      "why": "A connected graph requires at least one path between every pair of vertices"
    },
    {
      "q": "Determine if a triangle graph (3 vertices all connected to each other) is connected",
      "hint": "check paths between nodes",
      "steps": [
        "Step 1: Identify vertices A, B, C",
        "Step 2: Identify edges AB, BC, and CA",
        "Step 3: Check connectivity between each pair",
        "Step 4: A → B exists, B → C exists, C → A exists",
        "Step 5: Verify path exists for every pair of vertices"
      ],
      "ans": "Yes, it is connected",
      "why": "Every vertex has a path to every other vertex through edges"
    },
    {
      "q": "Is a graph with two separate clusters connected?",
      "hint": "check components",
      "steps": [
        "Step 1: Identify cluster 1 → group of connected vertices",
        "Step 2: Identify cluster 2 → another separate group",
        "Step 3: Check if any edge links cluster 1 to cluster 2",
        "Step 4: No connecting edge exists",
        "Step 5: Conclude graph has multiple disconnected components"
      ],
      "ans": "No, it is not connected",
      "why": "A graph is disconnected if it has more than one separate component"
    },
    {
      "q": "In a weighted graph, is the graph connected if all vertices are linked but some edges have very large weights?",
      "hint": "ignore weight for connectivity",
      "steps": [
        "Step 1: Identify all vertices in the graph",
        "Step 2: Check whether every vertex has at least one path to every other vertex",
        "Step 3: Note that edge weights (e.g., large or small values) do not affect existence of a path",
        "Step 4: Determine if at least one route connects all vertices regardless of cost",
        "Step 5: Apply definition of connectivity (path existence, not path cost)",
        "Step 6: Conclude based on reachability condition"
      ],
      "ans": "Yes, the graph is connected",
      "why": "Connectivity depends on existence of paths, not edge weights"
    },
    {
      "q": "A graph has vertices {1,2,3,4} and edges {(1,2), (2,3), (3,4), (4,2)}. Is it connected?",
      "hint": "check reachability cycle",
      "steps": [
        "Step 1: List vertices → {1,2,3,4}",
        "Step 2: Identify edges forming a cycle among 2,3,4",
        "Step 3: Check reachability from vertex 1 → 1 connects to 2",
        "Step 4: From 2 → reach 3 and 4 through edges",
        "Step 5: Verify all vertices are reachable from any starting vertex",
        "Step 6: Confirm single connected component exists"
      ],
      "ans": "Yes, the graph is connected",
      "why": "All vertices are reachable through direct or indirect paths"
    },
    {
      "q": "A graph has edges {(1,2), (2,3)} and vertex 4 isolated. Is the graph connected?",
      "hint": "check isolated node",
      "steps": [
        "Step 1: Identify vertices → {1,2,3,4}",
        "Step 2: Observe edges → 1–2–3 forms one component",
        "Step 3: Note vertex 4 has no edges",
        "Step 4: Check reachability → 4 cannot be reached from any other vertex",
        "Step 5: Compare with definition of connected graph",
        "Step 6: Determine number of components > 1"
      ],
      "ans": "No, the graph is disconnected",
      "why": "Presence of an isolated vertex creates multiple components"
    }
  ]
);

add(
  "math",
  "topology",
  "Continuous Transformations",

  `
<h2> Continuous Transformations</h2>
<h3> DEEP NOTES</h3>
<p>
A continuous transformation is a change that happens smoothly without breaks, jumps, tearing, or sudden interruptions.
In topology, objects can be stretched, bent, or twisted as long as continuity is preserved.
</p>
<pre>
Continuous  → smooth change (no breaks)
Discontinuous  → jumps, cuts, or gaps
</pre>
 <h3> WORKED EXAMPLES (WITH MATHEMATICAL / FUNCTION-BASED VIEW)</h3>
<h4> Example 4: Continuity of a Function</h4>
<p><b>Question:</b> Is f(x) = x² a continuous transformation on all real numbers?</p>
<p><b>Step 1:</b> Check if function is defined for all x ∈ ℝ</p>
<p>f(x) = x² exists for every real number </p>
<p><b>Step 2:</b> Check for breaks or jumps</p>
<p>No division by zero, no undefined points </p>
<p><b>Step 3:</b> Behavior of function</p>
<p>Graph changes smoothly with no gaps</p>
<p><b>Final Answer:</b> Yes, f(x) = x² is continuous everywhere</p>
<h4> Example 5: Discontinuity in a Rational Function</h4>
<p><b>Question:</b> Is f(x) = 1/(x − 2) continuous at x = 2?</p>
<p><b>Step 1:</b> Substitute x = 2</p>
<p>f(2) = 1/0 → undefined </p>
<p><b>Step 2:</b> Check behavior near x = 2</p>
<p>Values grow without bound (infinite discontinuity)</p>
<p><b>Step 3:</b> Identify continuity condition</p>
<p>Function must be defined and finite at the point</p>
<p><b>Final Answer:</b> No, it is not continuous at x = 2</p>
<h4> Example 6: Piecewise Continuity Check</h4>
<p><b>Question:</b> Is the function continuous at x = 1?</p>
<pre>
f(x) =
  x + 1,  x < 1
  3,      x = 1
  2x,     x > 1
</pre>
<p><b>Step 1:</b> Left-hand limit (x → 1⁻)</p>
<p>f(x) = x + 1 → 2</p>
<p><b>Step 2:</b> Right-hand limit (x → 1⁺)</p>
<p>f(x) = 2x → 2</p>
<p><b>Step 3:</b> Function value</p>
<p>f(1) = 3</p>
<p><b>Step 4:</b> Compare values</p>
<p>Limit = 2, but f(1) = 3</p>
<p><b>Final Answer:</b> No, the function is not continuous at x = 1</p>
<h3> DIAGRAM</h3>
<pre>
Continuous:        smooth curve
f(x) = x²        ↗↗↗↗
Discontinuous:     jump / break
f(x) = 1/(x-2)    →  ||  ←
</pre>
<h3> REAL WORLD APPLICATIONS</h3>
<ul>
  <li>Computer animation and graphics</li>
  <li>Physics motion simulation</li>
  <li>Signal and wave processing</li>
  <li>Robotics movement modeling</li>
</ul>
`,

  [
    {
      "q": "Is f(x) = |x| a continuous function, and what happens at x = 0?",
      "hint": "check left and right behavior",
      "steps": [
        "Step 1: Write function definition: f(x) = |x| = x for x ≥ 0 and -x for x < 0",
        "Step 2: Compute left-hand limit at x → 0⁻: f(x) = -x → 0",
        "Step 3: Compute right-hand limit at x → 0⁺: f(x) = x → 0",
        "Step 4: Compare both limits: LHL = RHL = 0",
        "Step 5: Check function value: f(0) = 0",
        "Step 6: Apply continuity condition: LHL = RHL = f(0)"
      ],
      "ans": "Yes, f(x) = |x| is continuous at x = 0",
      "why": "Left limit, right limit, and function value all match"
    },
    {
      "q": "Is a step function continuous at the jump point x = 1?",
      "hint": "check left vs right values",
      "steps": [
        "Step 1: Define step behavior: f(x) = 0 for x < 1, f(x) = 2 for x ≥ 1",
        "Step 2: Compute left-hand limit at x → 1⁻: LHL = 0",
        "Step 3: Compute right-hand limit at x → 1⁺: RHL = 2",
        "Step 4: Compare limits: 0 ≠ 2",
        "Step 5: Apply continuity condition: limits must match",
        "Step 6: Conclude discontinuity at x = 1"
      ],
      "ans": "No, it is not continuous at x = 1",
      "why": "Left-hand and right-hand limits are not equal"
    },
    {
      "q": "Determine continuity of f(x) = (x² − 4)/(x − 2) at x = 2",
      "hint": "simplify expression",
      "steps": [
        "Step 1: Substitute x = 2 → (4 − 4)/(0) = 0/0 indeterminate",
        "Step 2: Factor numerator: x² − 4 = (x − 2)(x + 2)",
        "Step 3: Simplify function: f(x) = x + 2 for x ≠ 2",
        "Step 4: Compute limit as x → 2: lim f(x) = 4",
        "Step 5: Check if function is defined at x = 2: it is not defined",
        "Step 6: Apply continuity condition: function must be defined and equal to limit"
      ],
      "ans": "No, it is not continuous at x = 2 (removable discontinuity)",
      "why": "Limit exists but function is undefined at the point"
    },
    {
      "q": "Is a function with a jump discontinuity continuous? Explain.",
      "hint": "A jump discontinuity means left and right values don't match",
      "steps": [
        "Step 1: Understand jump discontinuity → left-hand limit ≠ right-hand limit",
        "Step 2: Recall continuity condition → limit must exist and equal function value",
        "Step 3: Apply condition to jump discontinuity → since limits differ, no single limit exists",
        "Step 4: Conclude on continuity → if no limit, cannot satisfy continuity condition"
      ],
      "ans": "No, it is not continuous",
      "why": "A jump discontinuity means the limit does not exist, violating continuity requirement"
    },
    {
      "q": "Can we make a function with a removable discontinuity continuous? How?",
      "hint": "Think about filling the hole",
      "steps": [
        "Step 1: Identify removable discontinuity → limit exists but function undefined or different",
        "Step 2: Recall continuity requirement → limit must equal function value",
        "Step 3: Define new function value → set f(x) = limit at the point of discontinuity",
        "Step 4: Check if new function is continuous → now all conditions are met"
      ],
      "ans": "Yes, by redefining the function at that point",
      "why": "Redefining the function to equal the limit makes it continuous"
    },
    {
      "q": "Is the greatest integer function f(x) = ⌊x⌋ continuous anywhere?",
      "hint": "Graph the step pattern",
      "steps": [
        "Step 1: Understand the floor function → rounds down to nearest integer",
        "Step 2: Consider intervals (0,1), (1,2), etc. → constant on each interval",
        "Step 3: Check at integer points (e.g., x = 1) → step down occurs",
        "Step 4: Evaluate limits → LHL ≠ RHL at integers",
        "Step 5: Conclude on continuity → continuous on open intervals, discontinuous at integers"
      ],
      "ans": "Yes, on open intervals between integers",
      "why": "It has jump discontinuities at every integer value"
    }
  ]
);

add(
  "math",
  "topology",
  "Applications of Topology",

  `
<h2> Applications of Topology</h2>

<h3> DEEP NOTES</h3>
<p>
Topology is a branch of mathematics that studies properties of shapes and spaces that remain unchanged under continuous deformation such as stretching or bending, without tearing or cutting.
</p>
<pre>
Shape changes  (stretch, bend)
Structure preserved 
Size ignored  (not important)
</pre>
<h3> REAL-WORLD APPLICATIONS</h3>
<ul>
  <li>DNA structure and molecular modeling</li>
  <li>Robotics path planning and navigation</li>
  <li>Computer network connectivity analysis</li>
  <li>Data science and machine learning structures</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Robotics Application</h4>
<p><b>Question:</b> Why is topology useful in robotics?</p>
<p><b>Step 1:</b> Robots move in environments with obstacles</p>
<p><b>Step 2:</b> Paths can change shape depending on obstacles</p>
<p><b>Step 3:</b> Topology focuses on connectivity, not exact shape</p>
<p><b>Final Answer:</b> It helps robots find valid paths without needing exact measurements</p>
<h4> Example 2: Shape Transformation</h4>
<p><b>Question:</b> What happens to a shape in topology when it is stretched?</p>
<p><b>Step 1:</b> Shape is deformed (stretched or bent)</p>
<p><b>Step 2:</b> Connections remain unchanged</p>
<p><b>Final Answer:</b> The structure is preserved even if the shape changes</p>
<h4> Example 3: Network Understanding</h4>
<p><b>Question:</b> Why is topology used in computer networks?</p>
<p><b>Step 1:</b> Networks are systems of connected nodes</p>
<p><b>Step 2:</b> Focus is on connections, not physical distance</p>
<p><b>Final Answer:</b> It helps analyze how systems are connected rather than their exact layout</p>
<h3> DIAGRAM</h3>
<pre>
Start → flexible path → Goal
(no fixed distance, only connection matters)
</pre>

`,

  [
    {
      "q": "Is a circle topologically equivalent to a triangle? Explain using deformation steps.",
      "hint": "Think stretching without cutting",
      "steps": [
        "Step 1: Consider a circle as a flexible loop",
        "Step 2: Imagine stretching the loop into a triangle shape",
        "Step 3: Ensure no cutting, tearing, or gluing is used",
        "Step 4: Check connectivity is preserved (single closed loop)",
        "Step 5: Conclude that only shape changes, not structure"
      ],
      "ans": "Yes, a circle is topologically equivalent to a triangle",
      "why": "Both are closed loops with no breaks, only geometry changes"
    },
    {
      "q": "Is a solid disk topologically equivalent to a sphere surface?",
      "hint": "check holes and boundaries",
      "steps": [
        "Step 1: Identify disk has a boundary edge",
        "Step 2: Identify sphere surface has no boundary",
        "Step 3: Compare topological properties (holes/boundaries)",
        "Step 4: Note that boundary is a preserved topological feature",
        "Step 5: Conclude they are not equivalent"
      ],
      "ans": "No, they are not topologically equivalent",
      "why": "A disk has a boundary while a sphere surface does not"
    },
    {
      "q": "Why is a coffee cup topologically equivalent to a torus (donut)?",
      "hint": "think hole preservation",
      "steps": [
        "Step 1: Identify coffee cup has one handle (one hole)",
        "Step 2: Identify torus has one continuous hole",
        "Step 3: Imagine continuous deformation without cutting",
        "Step 4: Preserve number of holes (genus = 1)",
        "Step 5: Conclude same topological structure"
      ],
      "ans": "Because both have exactly one hole and can be deformed into each other",
      "why": "Topology classifies objects by holes, not shape"
    }
  ]
);

add(
  "math",
  "numerical_methods",
  "Introduction to Numerical Methods",

  `
<h2> Introduction to Numerical Methods</h2>
<h3> DEEP NOTES</h3>
<p>
Numerical methods are mathematical techniques used to find approximate solutions to problems that cannot be solved exactly using algebraic methods.
They are essential in real-world computation where exact answers are impossible or impractical.
</p>
<pre>
Exact solution  (sometimes impossible)
Approximate solution  (practical and usable)
</pre>
<h3> KEY IDEAS</h3>
<ul>
  <li>Uses repeated calculations (iteration)</li>
  <li>Improves accuracy step by step</li>
  <li>Produces approximate but useful results</li>
  <li>Applied in science, engineering, and computing</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Newton-Raphson Approximation</h4>
<p><b>Question:</b> Use one iteration of Newton-Raphson to approximate √2 starting with x₀ = 1</p>
<p><b>Step 1:</b> Define function f(x) = x² − 2</p>
<p><b>Step 2:</b> Differentiate → f'(x) = 2x</p>
<p><b>Step 3:</b> Apply formula x₁ = x₀ − f(x₀)/f'(x₀)</p>
<p><b>Step 4:</b> Substitute x₀ = 1</p>
<p><b>Step 5:</b> f(1) = 1² − 2 = −1</p>
<p><b>Step 6:</b> f'(1) = 2(1) = 2</p>
<p><b>Step 7:</b> x₁ = 1 − (−1/2) = 1 + 0.5</p>
<p><b>Final Answer:</b> x₁ = 1.5</p>
<h4> Example 2: Absolute Error</h4>
<p><b>Question:</b> Find the absolute error if exact value = 5 and approximation = 4.8</p>
<p><b>Step 1:</b> Use formula → Error = |Exact − Approximate|</p>
<p><b>Step 2:</b> Substitute values → |5 − 4.8|</p>
<p><b>Step 3:</b> Calculate difference → |0.2|</p>
<p><b>Final Answer:</b> Absolute error = 0.2</p>
<h4> Example 3: Bisection Method</h4>
<p><b>Question:</b> Find midpoint of interval [2, 4]</p>
<p><b>Step 1:</b> Use midpoint formula → (a + b)/2</p>
<p><b>Step 2:</b> Substitute a = 2 and b = 4</p>
<p><b>Step 3:</b> (2 + 4)/2 = 6/2</p>
<p><b>Final Answer:</b> Midpoint = 3</p>
<h4> Example 4: Iteration Process</h4>
<p><b>Question:</b> Perform one iteration of xₙ₊₁ = (xₙ + 6/xₙ)/2 with x₀ = 2</p>
<p><b>Step 1:</b> Write formula → xₙ₊₁ = (xₙ + 6/xₙ)/2</p>
<p><b>Step 2:</b> Substitute x₀ = 2</p>
<p><b>Step 3:</b> x₁ = (2 + 6/2)/2</p>
<p><b>Step 4:</b> x₁ = (2 + 3)/2</p>
<p><b>Step 5:</b> x₁ = 5/2</p>
<p><b>Final Answer:</b> x₁ = 2.5</p>
<h3> DIAGRAM</h3>
<pre>
Initial Guess → Iteration → Better Approximation
      x₀            x₁              x₂
</pre>
`,

  [
    {
      "q": "Use Newton-Raphson method once to approximate √5 using x₀ = 2",
      "hint": "use x_{n+1} = x_n − f(x_n)/f'(x_n)",
      "steps": [
        "Step 1: Define function f(x) = x² − 5",
        "Step 2: Differentiate → f'(x) = 2x",
        "Step 3: Use Newton-Raphson formula x₁ = x₀ − f(x₀)/f'(x₀)",
        "Step 4: Substitute x₀ = 2",
        "Step 5: Compute f(2) = 4 − 5 = −1",
        "Step 6: Compute f'(2) = 4",
        "Step 7: Compute x₁ = 2 − (−1/4) = 2 + 0.25",
        "Step 8: Final approximation x₁ = 2.25"
      ],
      "ans": "Approximate root after one iteration = 2.25",
      "why": "Newton-Raphson improves approximations using tangent lines"
    },
    {
      "q": "Find the absolute error if exact value = 3.14159 and approximation = 3.14",
      "hint": "subtract and take positive value",
      "steps": [
        "Step 1: Write formula → Absolute Error = |Exact − Approximate|",
        "Step 2: Substitute values → |3.14159 − 3.14|",
        "Step 3: Compute difference → 0.00159",
        "Step 4: Take positive value"
      ],
      "ans": "Absolute error = 0.00159",
      "why": "Absolute error measures the size of approximation error"
    },
    {
      "q": "Approximate √10 using two iterations of Babylonian method starting with x₀ = 3",
      "hint": "use x_{n+1} = (x_n + 10/x_n)/2",
      "steps": [
        "Step 1: Define iteration formula x_{n+1} = (x_n + 10/x_n)/2",
        "Step 2: Start with x₀ = 3",
        "Step 3: Compute x₁ = (3 + 10/3)/2",
        "Step 4: 10/3 ≈ 3.333",
        "Step 5: x₁ ≈ (3 + 3.333)/2 = 6.333/2 ≈ 3.167",
        "Step 6: Compute x₂ = (3.167 + 10/3.167)/2",
        "Step 7: 10/3.167 ≈ 3.157",
        "Step 8: x₂ ≈ (3.167 + 3.157)/2 ≈ 3.162"
      ],
      "ans": "Approximation after two iterations ≈ 3.162",
      "why": "Repeated averaging improves approximation accuracy"
    },
    {
      "q": "Why are approximate solutions used instead of exact solutions in some problems?",
      "hint": "complex equations",
      "steps": [
        "Step 1: Some equations cannot be solved algebraically",
        "Step 2: Exact formulas may not exist",
        "Step 3: Numerical methods generate close estimates",
        "Step 4: Computers can repeat calculations efficiently",
        "Step 5: Approximate answers are often sufficient in science and engineering"
      ],
      "ans": "Because many real-world equations are too complex for exact algebraic solutions",
      "why": "Numerical methods provide practical and efficient approximations"
    }
  ]
);

add(
  "math",
  "numerical_methods",
  "Iteration Method",

  `
<h2> Iteration Method</h2>
<h3> DEEP NOTES</h3>
<p>
Iteration is a process of repeating calculations using previous results to get closer to the correct answer.
Each new value is generated from the previous one until convergence is achieved.
</p>
<pre>xₙ₊₁ = f(xₙ)</pre>
<p>The process continues until values become stable (converge).</p>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Fixed Point Iteration</h4>
<p><b>Question:</b> Use iteration xₙ₊₁ = (xₙ + 5/xₙ)/2 with x₀ = 2</p>
<p><b>Step 1:</b> Substitute x₀ = 2</p>
<p>x₁ = (2 + 5/2)/2</p>
<p><b>Step 2:</b> Simplify</p>
<p>x₁ = (2 + 2.5)/2 = 4.5/2 = 2.25</p>
<p><b>Step 3:</b> Find next iteration</p>
<p>x₂ = (2.25 + 5/2.25)/2</p>
<p><b>Step 4:</b> Compute division</p>
<p>5/2.25 ≈ 2.22</p>
<p><b>Step 5:</b> Simplify</p>
<p>x₂ ≈ (2.25 + 2.22)/2 = 4.47/2 ≈ 2.236</p>
<p><b>Final Answer:</b> Iterations converge toward √5 ≈ 2.236</p>
<h4> Example 2: Convergence of Sequence</h4>
<p><b>Question:</b> Determine whether the sequence 1 → 1.5 → 1.75 → 1.875 is converging</p>
<p><b>Step 1:</b> Compare consecutive values</p>
<p>1.5 − 1 = 0.5</p>
<p><b>Step 2:</b> Compare next difference</p>
<p>1.75 − 1.5 = 0.25</p>
<p><b>Step 3:</b> Compare next difference</p>
<p>1.875 − 1.75 = 0.125</p>
<p><b>Step 4:</b> Observe pattern</p>
<p>Differences are decreasing</p>
<p><b>Final Answer:</b> Yes, the sequence is converging</p>
<h4> Example 3: Newton-Raphson Iteration</h4>
<p><b>Question:</b> Use one Newton-Raphson iteration to solve x² − 9 = 0 with x₀ = 4</p>
<p><b>Step 1:</b> Define function</p>
<p>f(x) = x² − 9</p>
<p><b>Step 2:</b> Differentiate</p>
<p>f'(x) = 2x</p>
<p><b>Step 3:</b> Apply formula</p>
<p>x₁ = x₀ − f(x₀)/f'(x₀)</p>
<p><b>Step 4:</b> Substitute x₀ = 4</p>
<p>x₁ = 4 − (16 − 9)/8</p>
<p><b>Step 5:</b> Simplify</p>
<p>x₁ = 4 − 7/8</p>
<p><b>Step 6:</b> Compute value</p>
<p>x₁ = 3.125</p>
<p><b>Final Answer:</b> Approximate root after one iteration = 3.125</p>
<h4> Example 4: Error Reduction</h4>
<p><b>Question:</b> Find the error if exact value = 8 and approximation = 7.92</p>
<p><b>Step 1:</b> Use formula</p>
<p>Error = |Exact − Approximation|</p>
<p><b>Step 2:</b> Substitute values</p>
<p>|8 − 7.92|</p>
<p><b>Step 3:</b> Calculate difference</p>
<p>|0.08| = 0.08</p>
<p><b>Final Answer:</b> Absolute error = 0.08</p>
<h3> DIAGRAM</h3>
<pre>
x₀ → x₁ → x₂ → x₃ → stable value
2    2.25   2.236   2.236...
(convergence through iteration)
</pre>
`,

  [
    {
      "q": "Use fixed-point iteration to solve x = cos(x), starting with x₀ = 1 (first 3 iterations)",
      "hint": "repeat substitution x_{n+1} = cos(x_n)",
      "steps": [
        "Step 1: Define iteration formula x_{n+1} = cos(x_n)",
        "Step 2: Start with x₀ = 1",
        "Step 3: Compute x₁ = cos(1) ≈ 0.5403",
        "Step 4: Compute x₂ = cos(0.5403) ≈ 0.8576",
        "Step 5: Compute x₃ = cos(0.8576) ≈ 0.6543",
        "Step 6: Observe values are moving toward a stable number"
      ],
      "ans": "x₁ ≈ 0.5403, x₂ ≈ 0.8576, x₃ ≈ 0.6543",
      "why": "Iteration repeatedly refines estimates to approach a fixed point"
    },
    {
      "q": "Check whether the iteration x_{n+1} = (x_n + 3/x_n)/2 converges for x₀ = 2",
      "hint": "compute first steps and observe stability",
      "steps": [
        "Step 1: Define iteration x_{n+1} = (x_n + 3/x_n)/2",
        "Step 2: Start with x₀ = 2",
        "Step 3: Compute x₁ = (2 + 3/2)/2 = (2 + 1.5)/2 = 1.75",
        "Step 4: Compute x₂ = (1.75 + 3/1.75)/2 ≈ (1.75 + 1.714)/2 ≈ 1.732",
        "Step 5: Compute x₃ ≈ (1.732 + 1.732)/2 ≈ 1.732",
        "Step 6: Values stabilize around 1.732"
      ],
      "ans": "Yes, it converges to approximately 1.732",
      "why": "Stabilization of successive iterates indicates convergence"
    },
    {
      "q": "Why can some iterative methods fail to converge?",
      "hint": "divergence or oscillation",
      "steps": [
        "Step 1: Iteration depends on chosen formula and starting value",
        "Step 2: Some functions amplify errors instead of reducing them",
        "Step 3: Values may oscillate or grow without bound",
        "Step 4: No stable fixed point is reached",
        "Step 5: Therefore iteration fails to converge"
      ],
      "ans": "Because some iterations diverge or oscillate instead of stabilizing",
      "why": "Convergence depends on stability of the iteration function and initial guess"
    }
  ]
);

add(
  "math",
  "numerical_methods",
  "Root Finding Methods",

  `
<h2> Root Finding Methods</h2>

<h3> DEEP NOTES</h3>
<p>Root-finding methods are numerical techniques used to estimate the value of x where a function equals zero.</p>
<pre>f(x) = 0  →  root of the equation</pre>
<p>One common idea is that if f(a) and f(b) have opposite signs, a root lies between a and b.</p>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Solving a Simple Root</h4>
<p><b>Question:</b> Find the root of f(x) = x² − 9</p>
<p><b>Step 1:</b> Set function equal to zero</p>
<p>x² − 9 = 0</p>
<p><b>Step 2:</b> Rearrange equation</p>
<p>x² = 9</p>
<p><b>Step 3:</b> Take square root</p>
<p>x = ±3</p>
<p><b>Final Answer:</b> Roots are x = 3 and x = −3</p>
<h4> Example 2: Bisection Midpoint</h4>
<p><b>Question:</b> Find midpoint of interval [1, 3]</p>
<p><b>Step 1:</b> Use midpoint formula</p>
<p>m = (a + b)/2</p>
<p><b>Step 2:</b> Substitute values</p>
<p>m = (1 + 3)/2</p>
<p><b>Step 3:</b> Simplify</p>
<p>m = 4/2 = 2</p>
<p><b>Final Answer:</b> Midpoint = 2</p>
<h4> Example 3: Sign Change Check</h4>
<p><b>Question:</b> Determine if a root exists between x = 1 and x = 2 for f(x) = x² − 3</p>
<p><b>Step 1:</b> Evaluate f(1)</p>
<p>f(1) = 1² − 3 = −2</p>
<p><b>Step 2:</b> Evaluate f(2)</p>
<p>f(2) = 2² − 3 = 1</p>
<p><b>Step 3:</b> Compare signs</p>
<p>f(1) is negative and f(2) is positive</p>
<p><b>Final Answer:</b> A root exists between 1 and 2</p>
<h4> Example 4: Newton-Raphson Method</h4>
<p><b>Question:</b> Use one iteration of Newton-Raphson to approximate a root of x² − 5 = 0 with x₀ = 2</p>
<p><b>Step 1:</b> Define function</p>
<p>f(x) = x² − 5</p>
<p><b>Step 2:</b> Differentiate</p>
<p>f'(x) = 2x</p>
<p><b>Step 3:</b> Apply formula</p>
<p>x₁ = x₀ − f(x₀)/f'(x₀)</p>
<p><b>Step 4:</b> Substitute x₀ = 2</p>
<p>x₁ = 2 − (4 − 5)/4</p>
<p><b>Step 5:</b> Simplify</p>
<p>x₁ = 2 − (−1/4)</p>
<p><b>Step 6:</b> Compute value</p>
<p>x₁ = 2.25</p>
<p><b>Final Answer:</b> Approximate root after one iteration = 2.25</p>
<h3> DIAGRAM</h3>
<pre>
f(x)

 ^
 |        /
 |       /
 |------/------→ x-axis
 |     /
 |    • root
 |
</pre>
`,

  [
    {
      "q": "Use the bisection method to find a root of f(x) = x² − 4 in the interval [1, 3]",
      "hint": "check sign change and halve interval",
      "steps": [
        "Step 1: Define function f(x) = x² − 4",
        "Step 2: Evaluate endpoints: f(1) = 1 − 4 = −3, f(3) = 9 − 4 = 5",
        "Step 3: Since sign changes (− to +), a root lies in [1, 3]",
        "Step 4: Find midpoint x₁ = (1 + 3)/2 = 2",
        "Step 5: Evaluate f(2) = 4 − 4 = 0",
        "Step 6: Since f(2) = 0, root is found exactly"
      ],
      "ans": "Root = x = 2",
      "why": "Bisection method isolates roots by repeatedly halving intervals with sign change"
    },
    {
      "q": "Apply one iteration of bisection method for f(x) = x² − 2 on interval [1, 2]",
      "hint": "midpoint test",
      "steps": [
        "Step 1: Define function f(x) = x² − 2",
        "Step 2: Evaluate endpoints: f(1) = −1, f(2) = 2",
        "Step 3: Confirm sign change so root lies in [1, 2]",
        "Step 4: Compute midpoint x₁ = (1 + 2)/2 = 1.5",
        "Step 5: Evaluate f(1.5) = 2.25 − 2 = 0.25",
        "Step 6: Since f(1.5) > 0, new interval becomes [1, 1.5]"
      ],
      "ans": "New interval is [1, 1.5]",
      "why": "Bisection narrows interval containing the root each iteration"
    },
    {
      "q": "Why does the bisection method guarantee convergence?",
      "hint": "interval shrinking",
      "steps": [
        "Step 1: Start with interval where function changes sign",
        "Step 2: A root must exist inside by continuity",
        "Step 3: Each iteration halves the interval size",
        "Step 4: Interval keeps shrinking toward the root",
        "Step 5: Eventually it converges to the root value"
      ],
      "ans": "Because the interval continuously shrinks around the root",
      "why": "Bisection uses sign change and interval halving to ensure convergence"
    }
  ]
);

add(
  "math",
  "numerical_methods",
  "Error Estimation",

  `
<h2> Error Estimation</h2>
<h3> DEEP NOTES</h3>
<p>
Error is the difference between the exact value and an approximate value.
It shows how accurate a mathematical approximation is.
</p>
<pre>
Error = Exact value − Approximate value
Absolute Error = |Exact − Approximate|
</pre>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Basic Error Calculation</h4>
<p><b>Question:</b> Exact value = 15, Approximate value = 14.6. Find the error.</p>
<p><b>Step 1:</b> Use formula</p>
<p>Error = Exact − Approximate</p>
<p><b>Step 2:</b> Substitute values</p>
<p>Error = 15 − 14.6</p>
<p><b>Step 3:</b> Calculate</p>
<p>Error = 0.4</p>
<p><b>Final Answer:</b> Error = 0.4</p>
<h4> Example 2: Absolute Error</h4>
<p><b>Question:</b> Exact value = 50, Approximate value = 52.3. Find absolute error.</p>
<p><b>Step 1:</b> Find ordinary error</p>
<p>Error = 50 − 52.3 = −2.3</p>
<p><b>Step 2:</b> Apply absolute value</p>
<p>|−2.3| = 2.3</p>
<p><b>Final Answer:</b> Absolute error = 2.3</p>
<h4> Example 3: Percentage Error</h4>
<p><b>Question:</b> Exact value = 40, Approximate value = 38. Find percentage error.</p>
<p><b>Step 1:</b> Find absolute error</p>
<p>|40 − 38| = 2</p>
<p><b>Step 2:</b> Use percentage error formula</p>
<p>(Absolute Error / Exact Value) × 100%</p>
<p><b>Step 3:</b> Substitute values</p>
<p>(2 / 40) × 100%</p>
<p><b>Step 4:</b> Simplify</p>
<p>0.05 × 100% = 5%</p>
<p><b>Final Answer:</b> Percentage error = 5%</p>
<h4> Example 4: Finding Exact Value</h4>
<p><b>Question:</b> Approximate value = 12.4 and error = 0.6. Find exact value.</p>
<p><b>Step 1:</b> Use formula</p>
<p>Exact Value = Approximate Value + Error</p>
<p><b>Step 2:</b> Substitute values</p>
<p>Exact Value = 12.4 + 0.6</p>
<p><b>Step 3:</b> Calculate</p>
<p>Exact Value = 13</p>
<p><b>Final Answer:</b> Exact value = 13</p>
<h3> DIAGRAM</h3>
<pre>
Exact Value
     ●-------------------● Approximate Value
           error gap
</pre>
`,

  [
    {
      "q": "Find the absolute and relative error if the exact value is 3.142 and the approximation is 3.14",
      "hint": "use difference and ratio",
      "steps": [
        "Step 1: Identify exact value = 3.142 and approximate value = 3.14",
        "Step 2: Compute absolute error = |3.142 − 3.14|",
        "Step 3: Calculate difference = |0.002| = 0.002",
        "Step 4: Compute relative error = absolute error / exact value",
        "Step 5: Substitute values: 0.002 / 3.142",
        "Step 6: Approximate result ≈ 0.000637"
      ],
      "ans": "Absolute error = 0.002, Relative error ≈ 0.000637",
      "why": "Error measures deviation between exact and approximate values"
    },
    {
      "q": "If an approximation is 9.8 and exact value is 10, find percentage error",
      "hint": "convert relative error to percentage",
      "steps": [
        "Step 1: Identify exact value = 10 and approximation = 9.8",
        "Step 2: Compute absolute error = |10 − 9.8| = 0.2",
        "Step 3: Compute relative error = 0.2 / 10",
        "Step 4: Calculate relative error = 0.02",
        "Step 5: Convert to percentage = 0.02 × 100"
      ],
      "ans": "Percentage error = 2%",
      "why": "Percentage error expresses relative error in percentage form"
    },
    {
      "q": "Why does a small absolute error not always mean high accuracy?",
      "hint": "consider scale of numbers",
      "steps": [
        "Step 1: Observe absolute error measures only raw difference",
        "Step 2: Consider two cases: large values vs small values",
        "Step 3: Same error may be small or large relative to value",
        "Step 4: Relative error compares error to actual magnitude",
        "Step 5: Conclude accuracy depends on relative size"
      ],
      "ans": "Because accuracy depends on relative error, not just absolute error",
      "why": "Relative error gives scale-independent measure of accuracy"
    }
  ]
);

add(
  "math",
  "numerical_methods",
  "Applications of Numerical Methods",

  `
<h2> Applications of Numerical Methods</h2>
<h3> DEEP NOTES</h3>
<p>
Numerical methods are techniques used to find approximate solutions to mathematical problems that cannot be solved exactly using algebraic methods.
They are widely used in science, engineering, computing, and data modelling.
</p>
<h3> REAL-LIFE APPLICATIONS</h3>
<ul>
  <li>Weather forecasting models</li>
  <li>AI and machine learning algorithms</li>
  <li>Structural engineering simulations</li>
  <li>Financial forecasting and risk analysis</li>
</ul>
<h3> WORKED EXAMPLES</h3>
<h4> Example 1: Square Root Approximation</h4>
<p><b>Question:</b> Approximate √7 using 2.64 and 2.65.</p>
<p><b>Step 1:</b> Square both values</p>
<p>2.64² = 6.9696</p>
<p>2.65² = 7.0225</p>
<p><b>Step 2:</b> Compare with 7</p>
<p>|7 − 6.9696| = 0.0304</p>
<p>|7 − 7.0225| = 0.0225</p>
<p><b>Step 3:</b> Identify closer value</p>
<p>7.0225 is closer to 7</p>
<p><b>Final Answer:</b> √7 ≈ 2.65</p>
<h4> Example 2: Improving an Approximation</h4>
<p><b>Question:</b> Improve estimate 8.4 using correction −0.15.</p>
<p><b>Step 1:</b> Write initial estimate</p>
<p>Initial value = 8.4</p>
<p><b>Step 2:</b> Apply correction</p>
<p>8.4 − 0.15</p>
<p><b>Step 3:</b> Calculate</p>
<p>8.25</p>
<p><b>Final Answer:</b> Improved approximation = 8.25</p>
<h4> Example 3: Absolute Error</h4>
<p><b>Question:</b> Exact value = 20, Approximate value = 19.6. Find absolute error.</p>
<p><b>Step 1:</b> Use formula</p>
<p>Absolute Error = |Exact − Approximate|</p>
<p><b>Step 2:</b> Substitute values</p>
<p>|20 − 19.6|</p>
<p><b>Step 3:</b> Calculate difference</p>
<p>|0.4| = 0.4</p>
<p><b>Final Answer:</b> Absolute error = 0.4</p>
<h4> Example 4: Percentage Error</h4>
<p><b>Question:</b> Exact value = 80, Approximate value = 76. Find percentage error.</p>
<p><b>Step 1:</b> Find absolute error</p>
<p>|80 − 76| = 4</p>
<p><b>Step 2:</b> Use percentage formula</p>
<p>(4 / 80) × 100%</p>
<p><b>Step 3:</b> Simplify</p>
<p>0.05 × 100% = 5%</p>
<p><b>Final Answer:</b> Percentage error = 5%</p>
<h3> DIAGRAM</h3>
<pre>
Approximation Process:
Initial Guess → Correction → Better Estimate
      8.4         -0.15         8.25
</pre>
`,

  [
    {
      "q": "Use Newton’s method to approximate a root of f(x) = x² − 2 starting from x₀ = 1",
      "hint": "use iteration formula xₙ₊₁ = xₙ − f(xₙ)/f'(xₙ)",
      "steps": [
        "Step 1: Identify function f(x) = x² − 2",
        "Step 2: Differentiate to get f'(x) = 2x",
        "Step 3: Apply Newton’s formula: xₙ₊₁ = xₙ − (xₙ² − 2)/(2xₙ)",
        "Step 4: Substitute x₀ = 1: x₁ = 1 − (1 − 2)/2",
        "Step 5: Simplify: x₁ = 1 − (-1/2) = 1 + 0.5",
        "Step 6: Compute x₁ = 1.5"
      ],
      "ans": "First approximation x₁ = 1.5",
      "why": "Newton’s method improves accuracy through iterative refinement"
    },
    {
      "q": "Show one iteration of fixed-point method for x = cos(x) starting at x₀ = 0.5",
      "hint": "substitute into function repeatedly",
      "steps": [
        "Step 1: Define iteration rule x = cos(x)",
        "Step 2: Start with x₀ = 0.5",
        "Step 3: Compute x₁ = cos(0.5)",
        "Step 4: Use approximation cos(0.5) ≈ 0.8776",
        "Step 5: Interpret result as improved estimate"
      ],
      "ans": "x₁ ≈ 0.8776",
      "why": "Fixed-point iteration improves approximation step by step"
    },
    {
      "q": "Why do numerical methods rely on iteration?",
      "hint": "repeated refinement",
      "steps": [
        "Step 1: Exact solutions are often impossible for complex equations",
        "Step 2: Start with an initial guess",
        "Step 3: Improve the guess using a rule repeatedly",
        "Step 4: Each step reduces error",
        "Step 5: Process continues until acceptable accuracy is reached"
      ],
      "ans": "Because iteration gradually reduces error toward the correct value",
      "why": "Iteration allows controlled convergence toward solutions"
    }
  ]
);

