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
  "Introduction & Notation",

  `
<h2> Introduction & Matrix Notation</h2>

<h3> DEEP NOTES</h3>
<p>
A <b>matrix</b> (plural: <i>matrices</i>) is a structured rectangular array of numbers, symbols, or mathematical expressions arranged in horizontal <b>rows</b> and vertical <b>columns</b>, enclosed within brackets \([ \dots ]\) or parentheses \(( \dots )\). Matrices serve as fundamental building blocks in linear algebra, quantum mechanics, computer graphics, multivariable calculus, and machine learning.
</p>

<h4>1. Matrix Dimensions & Order</h4>
<p>
The size or <b>order</b> of a matrix is specified by the number of its rows ($m$) and columns ($n$), expressed as <b>\(m \times n\)</b> (read <i>"m by n"</i>).
</p>
<ul>
  <li>If a matrix \(A\) has \(m\) rows and \(n\) columns, we write \(A \in \mathbb{R}^{m \times n}\).</li>
  <li>The total number of elements in an \(m \times n\) matrix is \(m \cdot n\).</li>
</ul>

<h4>2. Double-Subscript Element Indexing</h4>
<p>
Individual entries within a matrix are identified using double-subscript notation <b>\(a_{ij}\)</b> (or \(A_{(i,j)}\)):
</p>
<pre>
A = [ a₁₁  a₁₂  a₁₃  ...  a₁ₙ ]
    [ a₂₁  a₂₂  a₂₃  ...  a₂ₙ ]
    [  ⋮    ⋮    ⋮    ⋱    ⋮  ]
    [ aₘ₁  aₘ₂  aₘ₃  ...  aₘₙ ]
</pre>
<ul>
  <li><b>\(i\)</b> represents the <b>row index</b> (\(1 \le i \le m\)).</li>
  <li><b>\(j\)</b> represents the <b>column index</b> (\(1 \le j \le n\)).</li>
  <li>For instance, \(a_{23}\) refers to the element located in <i>row 2, column 3</i>.</li>
</ul>

<h4>3. Classification of Matrix Types</h4>
<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Matrix Type</th>
      <th>Mathematical Definition</th>
      <th>Example</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Row Matrix</b></td>
      <td>Matrix with a single row (\(1 \times n\))</td>
      <td>\(\begin{pmatrix} 3 & -1 & 5 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Column Matrix</b></td>
      <td>Matrix with a single column (\(m \times 1\))</td>
      <td>\(\begin{pmatrix} 4 \\ 0 \\ -2 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Square Matrix</b></td>
      <td>Number of rows equals columns (\(m = n\))</td>
      <td>\(\begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}_{2 \times 2}\)</td>
    </tr>
    <tr>
      <td><b>Zero / Null Matrix (\(O\))</b></td>
      <td>All entries are zero (\(a_{ij} = 0\) for all \(i,j\))</td>
      <td>\(\begin{pmatrix} 0 & 0 \\ 0 & 0 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Diagonal Matrix</b></td>
      <td>Square matrix with \(a_{ij} = 0\) for all \(i \neq j\)</td>
      <td>\(\begin{pmatrix} 5 & 0 \\ 0 & -3 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Identity Matrix (\(I_n\))</b></td>
      <td>Diagonal matrix where \(a_{ii} = 1\) and \(a_{ij} = 0\) (\(i \neq j\))</td>
      <td>\(\begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Symmetric Matrix</b></td>
      <td>Square matrix where \(A^T = A\), so \(a_{ij} = a_{ji}\)</td>
      <td>\(\begin{pmatrix} 2 & 7 \\ 7 & 5 \end{pmatrix}\)</td>
    </tr>
    <tr>
      <td><b>Skew-Symmetric</b></td>
      <td>Square matrix where \(A^T = -A\), so \(a_{ij} = -a_{ji}\) and \(a_{ii} = 0\)</td>
      <td>\(\begin{pmatrix} 0 & 4 \\ -4 & 0 \end{pmatrix}\)</td>
    </tr>
  </tbody>
</table>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1: Identifying Matrix Dimensions and Entries</b></p>
<p>Given the matrix \(M = \begin{pmatrix} 7 & -3 & 0 \\ 4 & 9 & 2 \end{pmatrix}\):</p>
<p><b>Step 1: Determine the order of matrix \(M\).</b></p>
<p>\(M\) has 2 horizontal rows and 3 vertical columns. Therefore, the dimension of \(M\) is <b>\(2 \times 3\)</b>.</p>
<p><b>Step 2: Identify specific elements \(m_{12}\), \(m_{21}\), and \(m_{23}\).</b></p>
<ul>
  <li>\(m_{12}\) (Row 1, Col 2) = <b>-3</b></li>
  <li>\(m_{21}\) (Row 2, Col 1) = <b>4</b></li>
  <li>\(m_{23}\) (Row 2, Col 3) = <b>2</b></li>
</ul>
<p><b>Final Answer:</b> Order is \(2 \times 3\); \(m_{12} = -3, m_{21} = 4, m_{23} = 2\).</p>

<br>

<p><b>Example 2: Constructing a Matrix from a Formula</b></p>
<p>Construct a \(2 \times 2\) matrix \(A\) whose entries are defined by \(a_{ij} = 3i - 2j\).</p>
<p><b>Step 1: Compute \(a_{11}\) (\(i=1, j=1\)):</b> \(3(1) - 2(1) = 3 - 2 = 1\)</p>
<p><b>Step 2: Compute \(a_{12}\) (\(i=1, j=2\)):</b> \(3(1) - 2(2) = 3 - 4 = -1\)</p>
<p><b>Step 3: Compute \(a_{21}\) (\(i=2, j=1\)):</b> \(3(2) - 2(1) = 6 - 2 = 4\)</p>
<p><b>Step 4: Compute \(a_{22}\) (\(i=2, j=2\)):</b> \(3(2) - 2(2) = 6 - 4 = 2\)</p>
<p><b>Final Answer:</b> \(A = \begin{pmatrix} 1 & -1 \\ 4 & 2 \end{pmatrix}\)</p>

<br>

<p><b>Example 3: Matrix Classification</b></p>
<p>Classify matrix \(K = \begin{pmatrix} 0 & -5 \\ 5 & 0 \end{pmatrix}\).</p>
<p><b>Step 1: Check diagonal entries.</b> Main diagonal entries are both 0.</p>
<p><b>Step 2: Compare off-diagonal entries \(k_{12}\) and \(k_{21}\).</b> \(k_{12} = -5\) and \(k_{21} = 5 = -k_{12}\).</p>
<p><b>Step 3: Test transpose.</b> \(K^T = \begin{pmatrix} 0 & 5 \\ -5 & 0 \end{pmatrix} = -\begin{pmatrix} 0 & -5 \\ 5 & 0 \end{pmatrix} = -K\).</p>
<p><b>Final Answer:</b> \(K\) is a <b>Skew-Symmetric Matrix</b> of order \(2 \times 2\).</p>

---

<h3> DIAGRAM</h3>

<pre>
       Column 1   Column 2   Column 3
Row 1 [  a₁₁        a₁₂        a₁₃  ]  ← Dimension: 2 × 3
Row 2 [  a₂₁        a₂₂        a₂₃  ]  ← Total Elements: 2 × 3 = 6
         ↑
    Element a₂₁ (Row 2, Column 1)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
  <li><b>Machine Learning & Data Science:</b> Feature matrices in dataset design, where rows correspond to individual observations/samples and columns represent measured variables/features.</li>
  <li><b>Computer Graphics & Game Engines:</b> Representation of 2D/3D vertex positions and transformation grids.</li>
  <li><b>Quantum Physics:</b> Quantum state vectors and density operators in Hilbert space.</li>
</ul>

---
`,
  [
    {
      "q": "What are the dimensions (order) of a matrix with 4 rows and 3 columns, and how many total elements does it contain?",
      "hint": "order is written as m × n and total elements = m × n",
      "steps": [
        "Step 1: Identify number of rows m = 4",
        "Step 2: Identify number of columns n = 3",
        "Step 3: Write dimension in m × n notation → 4 × 3",
        "Step 4: Calculate total elements = 4 × 3 = 12"
      ],
      "ans": "4 × 3 dimension, containing 12 elements",
      "why": "A matrix with m rows and n columns has dimension m × n and holds m × n total entries."
    },
    {
      "q": "Given A = [[5, -2, 9], [1, 4, 8], [3, 0, -7]], find a₂₃ + a₃₁.",
      "hint": "a₂₃ is Row 2 Column 3; a₃₁ is Row 3 Column 1",
      "steps": [
        "Step 1: Locate a₂₃ in Row 2, Column 3 → a₂₃ = 8",
        "Step 2: Locate a₃₁ in Row 3, Column 1 → a₃₁ = 3",
        "Step 3: Add the two values: 8 + 3 = 11"
      ],
      "ans": "11",
      "why": "Element indexing uses a_ij where i is row index and j is column index."
    },
    {
      "q": "Construct a 2 × 2 matrix B where b_ij = i² + 2j.",
      "hint": "evaluate formula for (i,j) ∈ {(1,1),(1,2),(2,1),(2,2)}",
      "steps": [
        "Step 1: b₁₁ = 1² + 2(1) = 1 + 2 = 3",
        "Step 2: b₁₂ = 1² + 2(2) = 1 + 4 = 5",
        "Step 3: b₂₁ = 2² + 2(1) = 4 + 2 = 6",
        "Step 4: b₂₂ = 2² + 2(2) = 4 + 4 = 8",
        "Step 5: Assemble matrix B = [[3, 5], [6, 8]]"
      ],
      "ans": "[[3, 5], [6, 8]]",
      "why": "Matrix entries are calculated by evaluating the algebraic rule b_ij for each row-column index pair."
    },
    {
      "q": "Which type of matrix is square, has 1s on its main diagonal, and 0s everywhere else?",
      "hint": "it acts as the multiplicative identity in matrix algebra",
      "steps": [
        "Step 1: Recall definition of square matrix with a_ii = 1 for all i",
        "Step 2: Verify non-diagonal elements a_ij = 0 (i ≠ j)",
        "Step 3: Identify matrix as the Identity Matrix (I)"
      ],
      "ans": "Identity Matrix",
      "why": "An identity matrix is a diagonal matrix whose main diagonal entries are all equal to 1."
    },
    {
      "q": "Why is a 3 × 1 matrix called a column matrix?",
      "hint": "examine its number of columns",
      "steps": [
        "Step 1: Observe that the matrix has 3 rows",
        "Step 2: Observe that the matrix has only 1 column",
        "Step 3: Any matrix with exactly 1 column is defined as a column matrix (or column vector)"
      ],
      "ans": "It consists of exactly 1 column",
      "why": "A matrix consisting of a single vertical column is termed a column matrix."
    }
  ]
);

add(
  "math",
  "matrices",
  "Basic Matrix Operations",

  `
<h2> Basic Matrix Operations</h2>

<h3> DEEP NOTES</h3>
<p>
Matrix arithmetic extends traditional algebraic operations into multi-dimensional grids. Understanding matrix equality, addition, subtraction, and scalar multiplication provides the foundation for matrix algebra.
</p>

<h4>1. Equality of Matrices</h4>
<p>
Two matrices \(A\) and \(B\) are defined as <b>equal</b> (\(A = B\)) if and only if they satisfy two strict criteria:
</p>
<ol>
  <li><b>Identical Dimensions:</b> \(A\) and \(B\) must have the exact same order \(m \times n\).</li>
  <li><b>Identical Elements:</b> Every corresponding pair of entries must be equal, i.e., \(a_{ij} = b_{ij}\) for all \(1 \le i \le m\) and \(1 \le j \le n\).</li>
</ol>

<h4>2. Matrix Addition & Subtraction</h4>
<p>
Matrix addition and subtraction are <b>element-wise operations</b>.
</p>
<ul>
  <li><b>Requirement:</b> Matrices MUST have identical dimensions (\(m \times n\)). Addition or subtraction of matrices with differing orders is <b>undefined</b>.</li>
  <li>If \(A, B \in \mathbb{R}^{m \times n}\), then \(C = A \pm B\) is an \(m \times n\) matrix where:
    \[c_{ij} = a_{ij} \pm b_{ij}\]
  </li>
</ul>

<h5>Algebraic Properties of Matrix Addition:</h5>
<ul>
  <li><b>Commutative Law:</b> \(A + B = B + A\)</li>
  <li><b>Associative Law:</b> \((A + B) + C = A + (B + C)\)</li>
  <li><b>Additive Identity:</b> \(A + O = A\) (where \(O\) is the zero matrix of matching order)</li>
  <li><b>Additive Inverse:</b> \(A + (-A) = O\)</li>
</ul>

<h4>3. Scalar Multiplication</h4>
<p>
Multiplying a matrix \(A\) by a real number scalar \(k \in \mathbb{R}\) scales <b>every single entry</b> in \(A\) by \(k\):
\[(k A)_{ij} = k \cdot a_{ij}\]
</p>
<pre>
k × [ a₁₁  a₁₂ ] = [ k·a₁₁  k·a₁₂ ]
    [ a₂₁  a₂₂ ]   [ k·a₂₁  k·a₂₂ ]
</pre>

<h5>Properties of Scalar Multiplication:</h5>
<ul>
  <li>\(k(A + B) = kA + kB\) (Distributive over matrix addition)</li>
  <li>\((k + m)A = kA + mA\) (Distributive over scalar addition)</li>
  <li>\(k(mA) = (km)A\) (Associative property)</li>
  <li>\(1 \cdot A = A\) and \((-1) \cdot A = -A\)</li>
</ul>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1: Solving a Matrix Equation for Unknowns</b></p>
<p>Find the values of \(x\) and \(y\) given that \(\begin{pmatrix} 2x + 1 & 4 \\ 7 & y - 3 \end{pmatrix} = \begin{pmatrix} 9 & 4 \\ 7 & 5 \end{pmatrix}\).</p>
<p><b>Step 1: Set corresponding elements equal.</b></p>
<ul>
  <li>Element (1,1): \(2x + 1 = 9\)</li>
  <li>Element (2,2): \(y - 3 = 5\)</li>
</ul>
<p><b>Step 2: Solve for \(x\).</b></p>
<p>\(2x = 9 - 1 \implies 2x = 8 \implies x = 4\)</p>
<p><b>Step 3: Solve for \(y\).</b></p>
<p>\(y = 5 + 3 \implies y = 8\)</p>
<p><b>Final Answer:</b> \(x = 4, y = 8\)</p>

<br>

<p><b>Example 2: Matrix Linear Combination</b></p>
<p>Given \(A = \begin{pmatrix} 3 & -1 \\ 2 & 5 \end{pmatrix}\) and \(B = \begin{pmatrix} 1 & 4 \\ -3 & 2 \end{pmatrix}\), compute \(3A - 2B\).</p>
<p><b>Step 1: Calculate scalar product \(3A\).</b></p>
<p>\(3A = 3 \begin{pmatrix} 3 & -1 \\ 2 & 5 \end{pmatrix} = \begin{pmatrix} 9 & -3 \\ 6 & 15 \end{pmatrix}\)</p>
<p><b>Step 2: Calculate scalar product \(2B\).</b></p>
<p>\(2B = 2 \begin{pmatrix} 1 & 4 \\ -3 & 2 \end{pmatrix} = \begin{pmatrix} 2 & 8 \\ -6 & 4 \end{pmatrix}\)</p>
<p><b>Step 3: Subtract \(2B\) from \(3A\) element-by-element.</b></p>
<p>\(3A - 2B = \begin{pmatrix} 9 - 2 & -3 - 8 \\ 6 - (-6) & 15 - 4 \end{pmatrix} = \begin{pmatrix} 7 & -11 \\ 12 & 11 \end{pmatrix}\)</p>
<p><b>Final Answer:</b> \(\begin{pmatrix} 7 & -11 \\ 12 & 11 \end{pmatrix}\)</p>

<br>

<p><b>Example 3: Invalid Operation Analysis</b></p>
<p>Can matrix \(P = \begin{pmatrix} 1 & 2 \\ 3 & 4 \end{pmatrix}\) be added to matrix \(Q = \begin{pmatrix} 5 & 6 & 7 \\ 8 & 9 & 10 \end{pmatrix}\)? Explain.</p>
<p><b>Step 1: Check order of \(P\).</b> \(P\) has order \(2 \times 2\).</p>
<p><b>Step 2: Check order of \(Q\).</b> \(Q\) has order \(2 \times 3\).</p>
<p><b>Step 3: Compare orders.</b> \(2 \times 2 \neq 2 \times 3\). Dimensions do not match.</p>
<p><b>Final Answer:</b> No. Matrix addition is undefined because \(P\) and \(Q\) have different dimensions.</p>

---

<h3> DIAGRAM</h3>

<pre>
Scalar Multiplication:                Element-wise Matrix Addition:
      [ 1  2 ]   [ 3×1  3×2 ]             [ a  b ]   [ e  f ]   [ a+e  b+f ]
  3 × [ 4  5 ] = [ 3×4  3×5 ]             [ c  d ] + [ g  h ] = [ c+g  d+h ]
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
  <li><b>Digital Image Processing:</b> Adjusting image brightness by scalar multiplying the pixel intensity matrix; image compositing/blending by adding image matrices.</li>
  <li><b>Financial Portfolio Management:</b> Summing quarterly revenue matrices across regional branches.</li>
  <li><b>Physics & Structural Mechanics:</b> Superposition of forces in multi-degree-of-freedom structural grids.</li>
</ul>

---
`,
  [
    {
      "q": "If A = [[4, 1], [-2, 3]] and B = [[1, 5], [6, -1]], find A + B.",
      "hint": "add corresponding elements at matching row and column positions",
      "steps": [
        "Step 1: Verify dimensions → both are 2 × 2 matrices",
        "Step 2: First row: (4+1, 1+5) = (5, 6)",
        "Step 3: Second row: (-2+6, 3+(-1)) = (4, 2)",
        "Step 4: Combine into matrix [[5, 6], [4, 2]]"
      ],
      "ans": "[[5, 6], [4, 2]]",
      "why": "Matrix addition is performed by adding corresponding entries of equal-dimensional matrices."
    },
    {
      "q": "Find 4 × [[2, -3], [0, 5]].",
      "hint": "multiply every entry inside the matrix by scalar 4",
      "steps": [
        "Step 1: Multiply row 1 entries: 4 × 2 = 8, 4 × (-3) = -12",
        "Step 2: Multiply row 2 entries: 4 × 0 = 0, 4 × 5 = 20",
        "Step 3: Combine into matrix [[8, -12], [0, 20]]"
      ],
      "ans": "[[8, -12], [0, 20]]",
      "why": "Scalar multiplication scales every individual element of the matrix by the scalar factor."
    },
    {
      "q": "Solve for matrix X in the matrix equation 2X + A = B, where A = [[1, 4], [2, 0]] and B = [[5, 10], [6, 8]].",
      "hint": "isolate X: 2X = B - A, so X = (1/2)(B - A)",
      "steps": [
        "Step 1: Subtract A from B: B - A = [[5-1, 10-4], [6-2, 8-0]] = [[4, 6], [4, 8]]",
        "Step 2: Divide each element by 2 (multiply by 1/2): X = (1/2)[[4, 6], [4, 8]]",
        "Step 3: Calculate X = [[2, 3], [2, 4]]"
      ],
      "ans": "[[2, 3], [2, 4]]",
      "why": "Matrix linear equations follow standard algebraic isolation rules, applying element-wise operations."
    },
    {
      "q": "Why is the matrix operation [[1, 2], [3, 4]] - [[5, 6]] invalid?",
      "hint": "compare matrix dimensions",
      "steps": [
        "Step 1: Determine order of first matrix → 2 × 2",
        "Step 2: Determine order of second matrix → 1 × 2",
        "Step 3: Check matching condition → 2 × 2 ≠ 1 × 2",
        "Step 4: Conclude operation is undefined"
      ],
      "ans": "The matrices have different dimensions",
      "why": "Matrix subtraction requires both matrices to possess identical row and column dimensions."
    },
    {
      "q": "Given matrix M, what is the result of M + (-1)M?",
      "hint": "apply distributive property M - M",
      "steps": [
        "Step 1: Recognize (-1)M = -M (the additive inverse)",
        "Step 2: Perform M + (-M) = M - M",
        "Step 3: Every entry m_ij - m_ij = 0",
        "Step 4: The result is the Zero Matrix (O)"
      ],
      "ans": "Zero Matrix (O)",
      "why": "Adding a matrix to its additive inverse yields the zero matrix of matching dimension."
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
Matrix multiplication is a foundational operation in linear algebra that differs fundamentally from element-wise multiplication. Instead of multiplying matching entries, matrix multiplication computes row-column dot products.
</p>

<h4>1. Compatibility & Dimension Condition</h4>
<p>
The product matrix \(C = AB\) is <b>defined if and only if</b> the number of columns in the first matrix \(A\) equals the number of rows in the second matrix \(B\).
</p>
<pre>
Matrix A (m × n)   ×   Matrix B (n × p)   =   Matrix C (m × p)
           └─── Inner Dimensions ───┘
                    MUST MATCH!
</pre>
<ul>
  <li>If \(A\) is of size \(m \times n\) and \(B\) is of size \(n \times p\), the resulting product \(C = AB\) has size <b>\(m \times p\)</b>.</li>
  <li>If inner dimensions do not match (\(n_A \neq m_B\)), the multiplication is <b>undefined</b>.</li>
</ul>

<h4>2. Row-by-Column Computation (Dot Product Mechanic)</h4>
<p>
The entry \(c_{ij}\) in row \(i\) and column \(j\) of product matrix \(C = AB\) is calculated by taking the <b>dot product</b> of row \(i\) of matrix \(A\) and column \(j\) of matrix \(B\):
\[c_{ij} = \sum_{k=1}^{n} a_{ik} b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \dots + a_{in}b_{nj}\]
</p>

<p>For \(2 \times 2\) matrix multiplication:</p>
<pre>
[ a  b ] × [ e  f ] = [ (ae + bg)  (af + bh) ]
[ c  d ]   [ g  h ]   [ (ce + dg)  (cf + dh) ]
</pre>

<h4>3. Fundamental Algebraic Properties</h4>
<ul>
  <li><b>Non-Commutative (CRITICAL):</b> In general, \(AB \neq BA\). Matrix order CANNOT be swapped!</li>
  <li><b>Associative Law:</b> \((AB)C = A(BC)\)</li>
  <li><b>Distributive Law:</b> \(A(B + C) = AB + AC\) and \((A + B)C = AC + BC\)</li>
  <li><b>Identity Element Property:</b> \(A I_n = A\) and \(I_m A = A\) (where \(I\) is matching identity matrix)</li>
  <li><b>Zero Matrix Property:</b> \(A O = O\) and \(O A = O\)</li>
</ul>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1: Multiplying 2 × 2 Matrices</b></p>
<p>Given \(A = \begin{pmatrix} 2 & 3 \\ 1 & 4 \end{pmatrix}\) and \(B = \begin{pmatrix} 5 & 1 \\ 0 & 2 \end{pmatrix}\), compute \(AB\).</p>
<p><b>Step 1: Verify compatibility.</b> \(A\) is \(2 \times 2\), \(B\) is \(2 \times 2\). Inner dimensions match (2 = 2). Result is \(2 \times 2\).</p>
<p><b>Step 2: Compute \(c_{11}\) (Row 1 of A · Col 1 of B).</b></p>
<p>\(c_{11} = (2 \times 5) + (3 \times 0) = 10 + 0 = 10\)</p>
<p><b>Step 3: Compute \(c_{12}\) (Row 1 of A · Col 2 of B).</b></p>
<p>\(c_{12} = (2 \times 1) + (3 \times 2) = 2 + 6 = 8\)</p>
<p><b>Step 4: Compute \(c_{21}\) (Row 2 of A · Col 1 of B).</b></p>
<p>\(c_{21} = (1 \times 5) + (4 \times 0) = 5 + 0 = 5\)</p>
<p><b>Step 5: Compute \(c_{22}\) (Row 2 of A · Col 2 of B).</b></p>
<p>\(c_{22} = (1 \times 1) + (4 \times 2) = 1 + 8 = 9\)</p>
<p><b>Final Answer:</b> \(AB = \begin{pmatrix} 10 & 8 \\ 5 & 9 \end{pmatrix}\)</p>

<br>

<p><b>Example 2: Demonstrating Non-Commutativity (\(AB \neq BA\))</b></p>
<p>Using \(A = \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}\) and \(B = \begin{pmatrix} 2 & 0 \\ 3 & 1 \end{pmatrix}\), compute \(BA\) and compare with \(AB = \begin{pmatrix} 8 & 2 \\ 3 & 1 \end{pmatrix}\).</p>
<p><b>Step 1: Compute \(BA = \begin{pmatrix} 2 & 0 \\ 3 & 1 \end{pmatrix} \begin{pmatrix} 1 & 2 \\ 0 & 1 \end{pmatrix}\).</b></p>
<ul>
  <li>Row 1 · Col 1: \((2 \times 1) + (0 \times 0) = 2\)</li>
  <li>Row 1 · Col 2: \((2 \times 2) + (0 \times 1) = 4\)</li>
  <li>Row 2 · Col 1: \((3 \times 1) + (1 \times 0) = 3\)</li>
  <li>Row 2 · Col 2: \((3 \times 2) + (1 \times 1) = 6 + 1 = 7\)</li>
</ul>
<p><b>Step 2: Form \(BA\).</b> \(BA = \begin{pmatrix} 2 & 4 \\ 3 & 7 \end{pmatrix}\).</p>
<p><b>Step 3: Compare \(AB\) and \(BA\).</b> \(\begin{pmatrix} 8 & 2 \\ 3 & 1 \end{pmatrix} \neq \begin{pmatrix} 2 & 4 \\ 3 & 7 \end{pmatrix}\).</p>
<p><b>Final Answer:</b> \(BA = \begin{pmatrix} 2 & 4 \\ 3 & 7 \end{pmatrix}\); confirms \(AB \neq BA\).</p>

<br>

<p><b>Example 3: Row Vector by Column Vector Multiplication</b></p>
<p>Compute \(R \cdot C\) where \(R = \begin{pmatrix} 3 & -2 & 4 \end{pmatrix}\) and \(C = \begin{pmatrix} 1 \\ 5 \\ 2 \end{pmatrix}\).</p>
<p><b>Step 1: Check dimensions.</b> \(R\) is \(1 \times 3\), \(C\) is \(3 \times 1\). Inner dimensions match (3 = 3). Product is \(1 \times 1\) scalar.</p>
<p><b>Step 2: Compute dot product.</b></p>
<p>\(R \cdot C = (3 \times 1) + (-2 \times 5) + (4 \times 2) = 3 - 10 + 8 = 1\)</p>
<p><b>Final Answer:</b> \(\begin{pmatrix} 1 \end{pmatrix}\) or scalar \(1\).</p>

---

<h3> DIAGRAM</h3>

<pre>
        Row 1 of A [  a₁₁   a₁₂  ]  ×  Column 1 of B [ b₁₁ ]
                                                      [ b₂₁ ]
        ─────────────────────────────────────────────────────
        Result entry c₁₁ = (a₁₁ × b₁₁) + (a₁₂ × b₂₁)
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
  <li><b>3D Computer Graphics Pipelines:</b> Concatenating transformation matrices (Translation × Rotation × Scaling) into a single projection matrix.</li>
  <li><b>Artificial Intelligence & Deep Learning:</b> Neural network forward propagation layers (\(Y = \text{activation}(W X + B)\)).</li>
  <li><b>Markov Chain Analysis:</b> Predicting state probability distributions across time transitions.</li>
</ul>

---
`,
  [
    {
      "q": "If matrix A is of order 3 × 2 and matrix B is of order 2 × 4, what is the order of the product matrix AB?",
      "hint": "check inner dimension match and outer dimension result (m × p)",
      "steps": [
        "Step 1: Identify dimensions: A(3 × 2), B(2 × 4)",
        "Step 2: Compare inner dimensions → 2 = 2 (multiplication valid)",
        "Step 3: Extract outer dimensions → 3 and 4",
        "Step 4: Conclude product matrix AB has dimension 3 × 4"
      ],
      "ans": "3 × 4",
      "why": "Multiplying an m × n matrix by an n × p matrix yields a product matrix of dimension m × p."
    },
    {
      "q": "Multiply A = [[1, 2], [3, 4]] by B = [[2, 0], [1, 3]].",
      "hint": "compute dot product of each row of A with each column of B",
      "steps": [
        "Step 1: c₁₁ = (1×2) + (2×1) = 2 + 2 = 4",
        "Step 2: c₁₂ = (1×0) + (2×3) = 0 + 6 = 6",
        "Step 3: c₂₁ = (3×2) + (4×1) = 6 + 4 = 10",
        "Step 4: c₂₂ = (3×0) + (4×3) = 0 + 12 = 12",
        "Step 5: Form matrix [[4, 6], [10, 12]]"
      ],
      "ans": "[[4, 6], [10, 12]]",
      "why": "Matrix multiplication computes row-by-column dot products across all index pairs."
    },
    {
      "q": "Multiply row vector R = [[2, -1, 4]] by column vector C = [[3], [5], [1]].",
      "hint": "compute (1×3) × (3×1) resulting in a single scalar (1×1)",
      "steps": [
        "Step 1: Multiply corresponding entries: 2×3 = 6, (-1)×5 = -5, 4×1 = 4",
        "Step 2: Sum results: 6 + (-5) + 4 = 5",
        "Step 3: Write result as 1 × 1 matrix [[5]] or scalar 5"
      ],
      "ans": "5",
      "why": "The dot product of a row vector and column vector yields a single scalar value."
    },
    {
      "q": "Why is matrix multiplication AB generally not equal to BA?",
      "hint": "matrix multiplication depends on row-column orientation order",
      "steps": [
        "Step 1: Observe that swapping matrix order changes row-column pairing",
        "Step 2: Dimensions of AB and BA may not even be identical",
        "Step 3: Conclude matrix multiplication is non-commutative"
      ],
      "ans": "Matrix multiplication is non-commutative (order matters)",
      "why": "Unlike real number multiplication, matrix multiplication order dictates row-column combinations, making AB ≠ BA in general."
    },
    {
      "q": "Given matrix M, what is the result of multiplying M by the Identity Matrix I of matching size?",
      "hint": "identity matrix acts as multiplicative identity",
      "steps": [
        "Step 1: Recall identity property M × I = M",
        "Step 2: Every row dot product with identity columns preserves original row entries",
        "Step 3: Result equals M unchanged"
      ],
      "ans": "Matrix M unchanged",
      "why": "Multiplying any matrix by the identity matrix leaves the original matrix unchanged."
    }
  ]
);

add(
  "math",
  "matrices",
  "Determinants & Inverses (2x2)",

  `
<h2> Determinants & Inverses (2×2)</h2>

<h3> DEEP NOTES</h3>
<p>
The determinant and inverse matrix are powerful scalar and structural metrics used to analyze transformational properties, invertibility, and linear systems.
</p>

<h4>1. Matrix Transpose (\(A^T\))</h4>
<p>
The <b>transpose</b> of a matrix \(A\), denoted \(A^T\) (or \(A'\)), is formed by interchanging its rows and columns:
\[(A^T)_{ij} = a_{ji}\]
</p>
<pre>
If A = [ a  b ]  then  Aᵀ = [ a  c ]
       [ c  d ]             [ b  d ]
</pre>
<h5>Properties of Transpose:</h5>
<ul>
  <li>\((A^T)^T = A\)</li>
  <li>\((A + B)^T = A^T + B^T\)</li>
  <li>\((kA)^T = k A^T\)</li>
  <li><b>\((AB)^T = B^T A^T\)</b> (Reverse Order Rule!)</li>
</ul>

<h4>2. Determinant of a 2 × 2 Matrix</h4>
<p>
The <b>determinant</b> of a square matrix \(A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}\) is a single scalar numerical value, denoted \(\det(A)\) or \(|A|\), calculated as:
\[\det(A) = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = ad - bc\]
</p>
<ul>
  <li><b>Geometric Interpretation:</b> The determinant represents the area scaling factor of the transformation mapped by matrix \(A\).</li>
</ul>

<h4>3. Singularity & Invertibility Criteria</h4>
<table border="1" cellpadding="8" style="border-collapse: collapse; width: 100%;">
  <thead>
    <tr style="background-color: #f2f2f2;">
      <th>Condition</th>
      <th>Classification</th>
      <th>Invertibility</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>\(\det(A) \neq 0\)</b></td>
      <td><b>Non-Singular (Regular) Matrix</b></td>
      <td>Inverse \(A^{-1}\) <b>EXISTS</b></td>
    </tr>
    <tr>
      <td><b>\(\det(A) = 0\)</b></td>
      <td><b>Singular Matrix</b></td>
      <td>Inverse \(A^{-1}\) <b>DOES NOT EXIST</b></td>
    </tr>
  </tbody>
</table>

<h4>4. Inverse of a 2 × 2 Matrix (\(A^{-1}\))</h4>
<p>
The <b>inverse matrix</b> \(A^{-1}\) is the unique matrix satisfying:
\[A A^{-1} = A^{-1} A = I_2\]
</p>
<p>For a non-singular \(2 \times 2\) matrix \(A = \begin{pmatrix} a & b \\ c & d \end{pmatrix}\) (where \(\det(A) = ad - bc \neq 0\)):</p>
<p>
\[A^{-1} = \frac{1}{\det(A)} \text{adj}(A) = \frac{1}{ad - bc} \begin{pmatrix} d & -b \\ -c & a \end{pmatrix}\]
</p>
<ul>
  <li><b>Adjugate Method Mechanic:</b> Swap main diagonal entries (\(a \leftrightarrow d\)) and negate off-diagonal entries (\(b \to -b, c \to -c\)). Then scale by \(\frac{1}{\det(A)}\).</li>
</ul>

<h5>Properties of Matrix Inverses:</h5>
<ul>
  <li>\((A^{-1})^{-1} = A\)</li>
  <li><b>\((AB)^{-1} = B^{-1}A^{-1}\)</b> (Socks-and-Shoes Reverse Order Rule)</li>
  <li>\(\det(A^{-1}) = \frac{1}{\det(A)}\)</li>
</ul>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<p><b>Example 1: Transpose and Determinant Calculation</b></p>
<p>Given \(A = \begin{pmatrix} 4 & -2 \\ 5 & 3 \end{pmatrix}\), find \(A^T\) and \(\det(A)\).</p>
<p><b>Step 1: Compute transpose \(A^T\).</b> Swap rows and columns.</p>
<p>\(A^T = \begin{pmatrix} 4 & 5 \\ -2 & 3 \end{pmatrix}\)</p>
<p><b>Step 2: Calculate determinant \(\det(A) = ad - bc\).</b></p>
<p>\(a = 4, b = -2, c = 5, d = 3\)</p>
<p>\(\det(A) = (4 \times 3) - (-2 \times 5) = 12 - (-10) = 12 + 10 = 22\)</p>
<p><b>Final Answer:</b> \(A^T = \begin{pmatrix} 4 & 5 \\ -2 & 3 \end{pmatrix}\); \(\det(A) = 22\).</p>

<br>

<p><b>Example 2: Finding Inverse of a 2 × 2 Matrix</b></p>
<p>Find the inverse of \(A = \begin{pmatrix} 3 & 5 \\ 1 & 2 \end{pmatrix}\) and verify \(A A^{-1} = I_2\).</p>
<p><b>Step 1: Calculate \(\det(A)\).</b></p>
<p>\(\det(A) = (3 \times 2) - (5 \times 1) = 6 - 5 = 1\)</p>
<p>Since \(\det(A) = 1 \neq 0\), \(A\) is non-singular and inverse exists.</p>
<p><b>Step 2: Construct adjugate matrix.</b></p>
<p>Swap diagonal (3 and 2): \(\begin{pmatrix} 2 & \cdot \\ \cdot & 3 \end{pmatrix}\). Negate off-diagonal (5 and 1): \(\begin{pmatrix} 2 & -5 \\ -1 & 3 \end{pmatrix}\).</p>
<p><b>Step 3: Multiply by \(\frac{1}{\det(A)}\).</b></p>
<p>\(A^{-1} = \frac{1}{1} \begin{pmatrix} 2 & -5 \\ -1 & 3 \end{pmatrix} = \begin{pmatrix} 2 & -5 \\ -1 & 3 \end{pmatrix}\)</p>
<p><b>Step 4: Verify \(A A^{-1}\).</b></p>
<p>\(A A^{-1} = \begin{pmatrix} 3 & 5 \\ 1 & 2 \end{pmatrix} \begin{pmatrix} 2 & -5 \\ -1 & 3 \end{pmatrix} = \begin{pmatrix} 6-5 & -15+15 \\ 2-2 & -5+6 \end{pmatrix} = \begin{pmatrix} 1 & 0 \\ 0 & 1 \end{pmatrix} = I_2\).</p>
<p><b>Final Answer:</b> \(A^{-1} = \begin{pmatrix} 2 & -5 \\ -1 & 3 \end{pmatrix}\)</p>

<br>

<p><b>Example 3: Singularity Condition Test</b></p>
<p>Find the value of \(k\) for which matrix \(M = \begin{pmatrix} k & 6 \\ 2 & 3 \end{pmatrix}\) is singular.</p>
<p><b>Step 1: State singularity condition.</b> Matrix is singular when \(\det(M) = 0\).</p>
<p><b>Step 2: Calculate \(\det(M)\).</b></p>
<p>\(\det(M) = (k \times 3) - (6 \times 2) = 3k - 12\)</p>
<p><b>Step 3: Set \(\det(M) = 0\) and solve for \(k\).</b></p>
<p>\(3k - 12 = 0 \implies 3k = 12 \implies k = 4\)</p>
<p><b>Final Answer:</b> \(k = 4\)</p>

---

<h3> DIAGRAM</h3>

<pre>
  Original Matrix A = [ a  b ]       Formula for Inverse:
                      [ c  d ]
                                     A⁻¹ =  1/(ad - bc) × [  d  -b ]
  Determinant = (a × d) - (b × c)                         [ -c   a ]
</pre>

---

<h3> REAL WORLD APPLICATION</h3>
<ul>
  <li><b>Cryptography & Encryption:</b> The Hill Cipher encryption scheme relies on matrix multiplication with an key matrix, while decryption requires computing its inverse modulo 26.</li>
  <li><b>Computer Vision & Robotics:</b> Inverse kinematics and frame orientation reversibility.</li>
  <li><b>Econometrics:</b> Reversing structural linear transformations in input-output systems.</li>
</ul>

---
`,
  [
    {
      "q": "Calculate the determinant of matrix A = [[6, 4], [2, 5]].",
      "hint": "apply formula det(A) = ad - bc",
      "steps": [
        "Step 1: Identify a = 6, b = 4, c = 2, d = 5",
        "Step 2: Compute ad = 6 × 5 = 30",
        "Step 3: Compute bc = 4 × 2 = 8",
        "Step 4: Subtract 30 - 8 = 22"
      ],
      "ans": "22",
      "why": "Determinant of a 2 × 2 matrix is computed via ad - bc."
    },
    {
      "q": "Find the transpose of matrix B = [[1, 7], [-3, 9]].",
      "hint": "interchange rows into columns",
      "steps": [
        "Step 1: Row 1 [1, 7] becomes Column 1 [1; -3]",
        "Step 2: Row 2 [-3, 9] becomes Column 2 [7; 9]",
        "Step 3: Form transpose matrix [[1, -3], [7, 9]]"
      ],
      "ans": "[[1, -3], [7, 9]]",
      "why": "Transposing a matrix swaps its row and column indices (a_ij → a_ji)."
    },
    {
      "q": "Find the inverse of matrix A = [[4, 7], [1, 2]].",
      "hint": "det = ad - bc; inverse = (1/det)[[d, -b], [-c, a]]",
      "steps": [
        "Step 1: Compute det(A) = (4×2) - (7×1) = 8 - 7 = 1",
        "Step 2: Swap main diagonal: d=2, a=4",
        "Step 3: Negate off-diagonal: -b=-7, -c=-1",
        "Step 4: Inverse = (1/1)[[2, -7], [-1, 4]] = [[2, -7], [-1, 4]]"
      ],
      "ans": "[[2, -7], [-1, 4]]",
      "why": "The inverse of a 2×2 matrix uses the scaled adjugate formula A⁻¹ = (1/det)[[d,-b],[-c,a]]."
    },
    {
      "q": "For what value of x is the matrix [[x, 8], [2, 4]] singular?",
      "hint": "set determinant ad - bc = 0",
      "steps": [
        "Step 1: Set up determinant equation: (x × 4) - (8 × 2) = 0",
        "Step 2: Simplify: 4x - 16 = 0",
        "Step 3: Solve for x: 4x = 16 → x = 4"
      ],
      "ans": "4",
      "why": "A matrix is singular if and only if its determinant equals zero."
    },
    {
      "q": "If det(A) = 5, what is the determinant of A⁻¹?",
      "hint": "apply det(A⁻¹) = 1 / det(A)",
      "steps": [
        "Step 1: Recall property det(A⁻¹) = 1 / det(A)",
        "Step 2: Substitute det(A) = 5 → 1/5 = 0.2"
      ],
      "ans": "1/5 (or 0.2)",
      "why": "The determinant of an inverse matrix equals the reciprocal of the original determinant."
    }
  ]
);

add(
  "math",
  "matrices",
  "Application to Linear Equations",

  `
<h2> Application to Linear Equations</h2>

<h3> DEEP NOTES</h3>
<p>
One of the most practical applications of matrix algebra is solving systems of simultaneous linear equations. Expressing linear systems in matrix form enables systematic solution algorithms via matrix inverses and Gaussian elimination.
</p>

<h4>1. Matrix Representation of Linear Systems (\(AX = B\))</h4>
<p>
Consider a system of two linear equations in two variables (\(x\) and \(y\)):
</p>
\[\begin{cases} a_{11}x + a_{12}y = b_1 \\ a_{21}x + a_{22}y = b_2 \end{cases}\]

<p>This system can be written compactly in matrix form <b>\(AX = B\)</b>:</p>
\[\begin{pmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{pmatrix} \begin{pmatrix} x \\ y \end{pmatrix} = \begin{pmatrix} b_1 \\ b_2 \end{pmatrix}\]
<p>Where:</p>
<ul>

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
