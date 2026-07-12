 /*======================================================
COMPUTER FUNDAMENTALS
=====================================================*/
 add(
  "computer",
  "basics",
  "Data vs Information",
  `<h2>Data vs Information</h2>
<p><b>Data</b> refers to raw, unprocessed facts, while <b>Information</b> is processed data that is meaningful and useful.</p>
<h3>1. Data</h3>
<ul>
<li>Unorganized facts</li>
<li>No meaning on its own</li>
<li>Can be numbers, text, symbols</li>
</ul>
<div class="example-box">
75, 82, 90 → just numbers (data)
</div>
<h3>2. Information</h3>
<ul>
<li>Processed and organized data</li>
<li>Has meaning</li>
<li>Used for decision making</li>
</ul>
<div class="example-box">
Average score = 82% → meaningful (information)
</div>
<h3>3. Differences</h3>
<table>
<tr><th>Feature</th><th>Data</th><th>Information</th></tr>
<tr><td>Meaning</td><td>Raw</td><td>Processed</td></tr>
<tr><td>Use</td><td>Input</td><td>Decision making</td></tr>
</table>
`,
[
  {
    type: "structured",
    q: "What is the difference between data and information?",
    a: "Data is raw facts; information is processed data",
    hint: "Think raw vs meaningful",
    reason: "When data is processed, organized, and given context, it becomes information that can be used for decision-making."
  },
  {
    type: "structured",
    q: "What is data in computing?",
    a: "Raw, unprocessed facts and figures",
    hint: "Think unorganized facts",
    reason: "Data has no meaning on its own until it is processed or interpreted."
  },
  {
    type: "structured",
    q: "What is information in computing?",
    a: "Processed data that is meaningful",
    hint: "Think useful meaning",
    reason: "Information is data that has been processed into a form that is useful for understanding or decision-making."
  },
  {
    type: "structured",
    q: "Why is processing important in data handling?",
    a: "It converts data into meaningful information",
    hint: "Think transformation",
    reason: "Processing organizes raw data so it becomes useful for analysis and decision-making."
  }
]
);
/*===========================================================
Characteristics of Computers
===========================================================*/
add(
  "computer",
  "basics",
  "Characteristics of Computers",
  `<h2>Characteristics of Computers</h2>
<p>Computers have unique features that make them powerful tools.</p>
<h3>Key Characteristics</h3>
<ul>
<li><b>Speed:</b> Performs millions of operations per second</li>
<li><b>Accuracy:</b> Produces correct results if input is correct</li>
<li><b>Diligence:</b> Does not get tired</li>
<li><b>Storage:</b> Can store large amounts of data</li>
<li><b>Automation:</b> Works automatically once programmed</li>
<li><b>Versatility:</b> Can perform many tasks</li>
</ul>
<div class="example-box">
Computer calculates results faster than humans → speed + accuracy
</div>
<div class="keyfact">
 Computers are powerful because they combine speed, accuracy, and storage.
</div>
`,
[
  {
    type: "structured",
    q: "What are three main characteristics of a computer?",
    a: "Speed, accuracy, diligence",
    hint: "Think performance abilities",
    reason: "Computers are designed to process data very fast, produce accurate results, and perform tasks repeatedly without getting tired."
  },
  {
    type: "structured",
    q: "What is meant by computer speed as a characteristic?",
    a: "Ability to process data very quickly",
    hint: "Think fast processing",
    reason: "Computers can perform millions or billions of operations per second."
  },
  {
    type: "structured",
    q: "What does accuracy mean in computer systems?",
    a: "Producing correct results with minimal errors",
    hint: "Think precision",
    reason: "Computers follow instructions exactly as given, reducing human errors."
  },
  {
    type: "structured",
    q: "What is diligence in computers?",
    a: "Ability to work continuously without fatigue",
    hint: "Think endurance",
    reason: "Unlike humans, computers do not get tired and can repeat tasks consistently."
  }
]
);
/*======================================================
Types of Computers
=======================================================*/
add(
  "computer",
  "basics",
  "Types of Computers",
  `<h2>Types of Computers</h2>
<h3> DEEP EXPLANATION</h3>
<p>
Computers are classified based on size, power, and purpose. Each type is designed for specific tasks ranging from simple personal use to highly complex scientific calculations.
</p>
<h3> CLASSIFICATION BY SIZE & POWER</h3>
<ul>
<li><b>Supercomputers</b></li>
<ul>
<li>Most powerful computers</li>
<li>Used in weather forecasting, space research, simulations</li>
<li>Example tasks: climate modeling, nuclear research</li>
</ul>
<li><b>Mainframe Computers</b></li>
<ul>
<li>Handle large-scale processing</li>
<li>Used by banks, governments, large organizations</li>
<li>Support many users at once</li>
</ul>
<li><b>Minicomputers</b></li>
<ul>
<li>Mid-sized systems (less common today)</li>
<li>Used in small organizations</li>
</ul>
<li><b>Microcomputers (Personal Computers)</b></li>
<ul>
<li>Most common type</li>
<li>Examples: desktops, laptops, tablets</li>
<li>Used for everyday tasks</li>
</ul>
<li><b>Embedded Computers</b></li>
<ul>
<li>Built into devices</li>
<li>Examples: washing machines, cars, microwaves</li>
<li>Perform specific functions</li>
</ul>
</ul>
<h3> COMPARISON TABLE</h3>
<pre>
Type           | Power     | Users      | Example Use
------------------------------------------------------
Supercomputer  | Very High | Few        | Weather prediction
Mainframe      | High      | Many       | Banking systems
Microcomputer  | Moderate  | One        | Personal use
Embedded       | Low       | Single use | Appliances
</pre>
<h3> EXAM FOCUS</h3>
<ul>
<li>Differences between supercomputer and mainframe</li>
<li>Examples of embedded systems</li>
<li>Classification based on purpose</li>
</ul>
`,
[
  {
    q: "Which type of computer is used for weather forecasting?",
    hint: "Think highest power",
    answer: "Supercomputer",
    explanation: "Supercomputers perform complex calculations at very high speed"
  },
  {
    q: "Give one example of an embedded computer",
    hint: "Think household devices",
    answer: "Washing machine / microwave",
    explanation: "Embedded computers are built into devices for specific tasks"
  },
  {
    q: "What is the main difference between a mainframe and a microcomputer?",
    hint: "Think users",
    answer: "Mainframes support many users while microcomputers serve one user",
    explanation: "Mainframes are designed for large-scale operations"
  }
]
);
/*================================================
Computer Generations
================================================*/
add(
  "computer",
  "basics",
  "Computer Generations",
  `<h2>Computer Generations (1st → 5th)</h2>
<h3> DEEP EXPLANATION</h3>
<p>
Computer generations refer to the evolution of computer technology over time.
Each generation is defined by major technological advancements.
</p>
<h3> GENERATIONS OVERVIEW</h3>
<h4>1⃣ First Generation (1940s–1950s)</h4>
<ul>
<li>Used vacuum tubes</li>
<li>Very large and expensive</li>
<li>Generated a lot of heat</li>
<li>Example: ENIAC</li>
</ul>
<h4>2⃣ Second Generation (1950s–1960s)</h4>
<ul>
<li>Used transistors</li>
<li>Smaller, faster, more reliable</li>
<li>Less heat produced</li>
</ul>
<h4>3⃣ Third Generation (1960s–1970s)</h4>
<ul>
<li>Used integrated circuits (ICs)</li>
<li>Even smaller and faster</li>
<li>Introduction of operating systems</li>
</ul>
<h4>4⃣ Fourth Generation (1970s–present)</h4>
<ul>
<li>Used microprocessors</li>
<li>Rise of personal computers</li>
<li>Very high speed and efficiency</li>
</ul>
<h4>5⃣ Fifth Generation (present & future)</h4>
<ul>
<li>Artificial Intelligence (AI)</li>
<li>Machine learning and automation</li>
<li>Focus on smart systems</li>
</ul>
<h3> SUMMARY TABLE</h3>
<pre>
Generation | Technology        | Key Feature
------------------------------------------------
1st        | Vacuum tubes      | Large, hot
2nd        | Transistors       | Smaller, faster
3rd        | ICs               | Reliable
4th        | Microprocessors   | Personal computers
5th        | AI                | Intelligent systems
</pre>
<h3> EXAM FOCUS</h3>
<ul>
<li>Key technology in each generation</li>
<li>Differences between generations</li>
<li>Examples (ENIAC, modern AI systems)</li>
</ul>
`,
[
  {
    q: "What technology was used in first-generation computers?",
    hint: "Very old and large",
    answer: "Vacuum tubes",
    explanation: "They were large, consumed much power, and produced heat"
  },
  {
    q: "Which generation introduced microprocessors?",
    hint: "Think modern PCs",
    answer: "Fourth generation",
    explanation: "Microprocessors led to personal computers"
  },
  {
    q: "What is the main feature of fifth-generation computers?",
    hint: "Think intelligence",
    answer: "Artificial Intelligence",
    explanation: "They focus on smart and automated systems"
  }
]
);
/*=====================================================
Number Systems
=====================================================*/

add(
  "computer",
  "basics",
  "Number Systems",
  `<h2>Number Systems</h2>
<p>
  Computers use different number systems to represent and process data efficiently.
  These include decimal, binary, and hexadecimal systems, which can be converted into one another.
</p>
<h3> 1. Decimal (Base 10)</h3>
<ul>
  <li>Uses digits 0–9</li>
  <li>Used in everyday human calculations</li>
  <li>Each digit has a place value based on powers of 10</li>
</ul>
<h3> 2. Binary (Base 2)</h3>
<ul>
  <li>Uses only 0 and 1</li>
  <li>Each digit is called a bit</li>
  <li>Used internally by computers</li>
</ul>
<h3> 3. Hexadecimal (Base 16)</h3>
<ul>
  <li>Uses digits 0–9 and letters A–F</li>
  <li>A = 10, B = 11, C = 12, D = 13, E = 14, F = 15</li>
  <li>Used to simplify long binary numbers</li>
</ul>
<h3> Why Binary is Used</h3>
<ul>
  <li><b>1 = ON</b> (electric signal present)</li>
  <li><b>0 = OFF</b> (no signal)</li>
</ul>
<pre>
Computers use binary because they only understand two states:
ON  → 1
OFF → 0
</pre>
<h3> Number System Conversions</h3>
<h4> Decimal to Binary</h4>
<pre>
Example: 10₁₀ → Binary
10 ÷ 2 = 5 remainder 0
5 ÷ 2  = 2 remainder 1
2 ÷ 2  = 1 remainder 0
1 ÷ 2  = 0 remainder 1
Read from bottom to top:
10₁₀ = 1010₂
</pre>
<h4> Binary to Decimal</h4>
<pre>
Example: 1010₂ → Decimal
(1×2³) + (0×2²) + (1×2¹) + (0×2⁰)
= 8 + 0 + 2 + 0
= 10₁₀
</pre>
<h4> Binary to Hexadecimal</h4>
<pre>
Example: 1010₂ → Hexadecimal
Group into 4 bits:
1010 = A
So, 1010₂ = A₁₆
</pre>
<h4> Hexadecimal to Binary</h4>
<pre>
Example: A₁₆ → Binary
A = 10 in decimal
10 = 1010₂
So, A₁₆ = 1010₂
</pre>
<h3> Exam Focus Areas</h3>
<ul>
  <li>Convert decimal to binary</li>
  <li>Convert binary to decimal</li>
  <li>Convert binary to hexadecimal</li>
  <li>Explain why computers use binary</li>
</ul>
`,
[
  {
  q: "Convert 13₁₀ (decimal) to binary.",
  a: "1101₂",
  hint: "Divide by 2 method",
  reason: "13 ÷ 2 = 6 r1, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1 → read from bottom to top = 1101₂"
},
{
  q: "Convert 1011₂ (binary) to decimal.",
  a: "11₁₀",
  hint: "Use place values (2⁰, 2¹, 2²...)",
  reason: "(1×2³) + (0×2²) + (1×2¹) + (1×2⁰) = 8 + 0 + 2 + 1 = 11₁₀"
},
{
  q: "Convert 25₁₀ (decimal) to binary.",
  a: "11001₂",
  hint: "Divide by 2 repeatedly",
  reason: "25 ÷ 2 = 12 r1, 12 ÷ 2 = 6 r0, 6 ÷ 2 = 3 r0, 3 ÷ 2 = 1 r1, 1 ÷ 2 = 0 r1 → 11001₂"
},
{
  q: "Convert 1110₂ (binary) to decimal.",
  a: "14₁₀",
  hint: "Add powers of 2",
  reason: "(1×2³) + (1×2²) + (1×2¹) + (0×2⁰) = 8 + 4 + 2 + 0 = 14₁₀"
},
{
  q: "Convert 16₁₀ (decimal) to binary.",
  a: "10000₂",
  hint: "Divide by 2 method",
  reason: "16 ÷ 2 = 8 r0, 8 ÷ 2 = 4 r0, 4 ÷ 2 = 2 r0, 2 ÷ 2 = 1 r0, 1 ÷ 2 = 0 r1 → 10000₂"
},
{
  q: "Convert 11001₂ (binary) to decimal.",
  a: "25₁₀",
  hint: "Use place values",
  reason: "(1×2⁴) + (1×2³) + (0×2²) + (0×2¹) + (1×2⁰) = 16 + 8 + 0 + 0 + 1 = 25₁₀"
}
]
/*=============================================================
Data Representation
=============================================================*/
);
add(
  "computer",
  "basics",
  "Data Representation",
  `<h2>Data Representation</h2>
<p>
  Data in computers is stored and processed using binary digits (0s and 1s).
  These binary values form the basis of all data storage and measurement.
</p>
<h3> 1. Units of Data Storage</h3>
<ul>
  <li><b>Bit:</b> Smallest unit of data (0 or 1)</li>
  <li><b>Nibble:</b> 4 bits</li>
  <li><b>Byte:</b> 8 bits</li>
  <li><b>Kilobyte (KB):</b> 1024 Bytes</li>
  <li><b>Megabyte (MB):</b> 1024 KB</li>
  <li><b>Gigabyte (GB):</b> 1024 MB</li>
  <li><b>Terabyte (TB):</b> 1024 GB</li>
</ul>
<h3> 2. Key Formula: Bits Calculation</h3>
<div class="example-box">
  <b>Formula:</b><br><br>
  Number of Bits = Number of Bytes × 8
</div>
<h3> 3. Examples of Bit Calculation</h3>
<pre>
Example 1:
5 Bytes → 5 × 8 = 40 Bits
Example 2:
10 Bytes → 10 × 8 = 80 Bits
Example 3:
2 KB → 2 × 1024 Bytes × 8 = 16384 Bits
</pre>
<h3> 4. Character Encoding</h3>
<h4> ASCII</h4>
<ul>
  <li>Uses numbers to represent characters</li>
  <li>Example: 'A' = 65</li>
</ul>
<h4> Unicode</h4><ul><li>Supports many languages worldwide</li></ul>
<div class="example-box">
   Example:<br>
  'A' = 65 (ASCII)<br>
  Each character is stored using binary inside the computer
</div>
<h3> 5. Relationship Between Units</h3>
<pre>
1 Byte  = 8 Bits
1 KB     = 1024 Bytes
1 MB     = 1024 KB
1 GB     = 1024 MB
1 TB     = 1024 GB
</pre>
<h3> 6. Why Binary is Used</h3>
<ul>
  <li>Computers use ON (1) and OFF (0) signals</li>
  <li>Binary is easy for electronic circuits</li>
  <li>All data is stored as 0s and 1s</li>
</ul>
<div class="keyfact">
 Important Fact: All data in a computer is stored in binary form, and can be measured in bits and bytes.
</div>
<h3> Simple Explanation</h3>
<p>
  Data storage works like building blocks where everything is made from bits.
  Bytes, KB, MB, and GB are just bigger groups of those bits.
</p>
`,
[
  {
  q: "How many bits are in 5 bytes?",
  a: "40 bits",
  hint: "Use multiplication",
  reason: "1 byte = 8 bits, so 5 bytes = 5 × 8 = 40 bits."
},
{
  q: "Convert 3 KB into bytes.",
  a: "3072 bytes",
  hint: "1 KB = 1024 bytes",
  reason: "3 KB = 3 × 1024 = 3072 bytes."
},
{
  q: "How many bytes are in 1024 bits?",
  a: "128 bytes",
  hint: "Divide by 8",
  reason: "1 byte = 8 bits, so 1024 ÷ 8 = 128 bytes."
},
{
  q: "A file size is 2 KB. Convert it into bits.",
  a: "16384 bits",
  hint: "KB → Bytes → Bits",
  reason: "2 KB = 2 × 1024 = 2048 bytes; 2048 × 8 = 16384 bits."
},
{
  q: "Why can 1 byte represent 256 different values?",
  a: "Because it has 8 bits giving 2⁸ combinations",
  hint: "Think binary combinations",
  reason: "Each bit has 2 states (0 or 1), so 8 bits give 2^8 = 256 possible combinations."
},
{
  q: "A text file contains 50 characters. How many bytes are needed to store it?",
  a: "50 bytes",
  hint: "1 character = 1 byte (ASCII)",
  reason: "In ASCII, each character is stored using 1 byte, so 50 characters require 50 bytes."
}
]
);
/*========================================================
COMPUTER ARCHITECTURE
========================================================*/
add(
  "computer",
  "basics",
  "CPU Components",
  `<h2>CPU Components (ALU, CU, Registers)</h2>
<h3> DEEP EXPLANATION</h3>
<p>
The Central Processing Unit (CPU) is the main component of a computer system and is often called the “brain” of the computer.
It interprets and executes instructions, processes data, and controls the operations of all other components.
</p>
<h3> MAIN COMPONENTS OF THE CPU</h3>
<h4>1. Arithmetic Logic Unit (ALU)</h4>
<ul>
  <li>Performs arithmetic operations such as addition, subtraction, multiplication, and division</li>
  <li>Performs logical operations such as AND, OR, NOT, and comparisons</li>
  <li>Handles decision-making processes inside the computer</li>
</ul>
<h4>2. Control Unit (CU)</h4>
<ul>
  <li>Directs and coordinates all activities inside the CPU</li>
  <li>Fetches instructions from memory</li>
  <li>Decodes instructions into signals the CPU can understand</li>
  <li>Controls the flow of data between CPU, memory, and input/output devices</li>
</ul>
<h4>3. Registers</h4>
<ul>
  <li>Very small and fast memory locations inside the CPU</li>
  <li>Store temporary data and instructions during processing</li>
  <li>Examples include:</li>
  <ul>
    <li><b>Accumulator:</b> Stores intermediate results of calculations</li>
    <li><b>Program Counter (PC):</b> Keeps track of the next instruction</li>
    <li><b>Instruction Register (IR):</b> Holds the current instruction being executed</li>
  </ul>
</ul>
<h3> IMPORTANCE OF THE CPU</h3>
<ul>
  <li>Controls all computer operations</li>
  <li>Processes data and instructions</li>
  <li>Coordinates all hardware components</li>
  <li>Ensures programs run correctly</li>
</ul>
`,
[
  {
  q: "A computer is processing a mathematical problem. Which CPU component is mainly responsible for performing the calculations and why?",
  hint: "Think arithmetic unit",
  answer: "ALU (Arithmetic Logic Unit)",
  explanation: "The ALU performs all arithmetic operations such as addition, subtraction, multiplication, and division, which are needed for mathematical processing."
},

{
  q: "During program execution, the CPU needs to know which instruction to execute next. Which register is responsible for this and what does it do?",
  hint: "Think program flow",
  answer: "Program Counter (PC)",
  explanation: "The Program Counter stores the address of the next instruction to be executed, ensuring the CPU follows the correct sequence."
},

{
  q: "A CPU is executing a program step by step. Explain the role of the Control Unit in this process.",
  hint: "Think coordination",
  answer: "It fetches, decodes, and controls execution of instructions",
  explanation: "The Control Unit manages the fetch-decode-execute cycle and ensures all parts of the CPU work together correctly."
},

{
  q: "Why does the CPU use registers instead of main memory during processing?",
  hint: "Think speed difference",
  answer: "Because registers are faster than main memory",
  explanation: "Registers are located inside the CPU and provide very fast temporary storage, improving processing speed."
},

{
  q: "A CPU receives an instruction to add two numbers. Describe how the ALU and Control Unit work together to complete this task.",
  hint: "Think teamwork inside CPU",
  answer: "CU sends instruction to ALU, ALU performs addition",
  explanation: "The Control Unit fetches and decodes the instruction, then directs the ALU to perform the arithmetic operation."
}
]
);
/*===================================
Instruction Cycle (Fetch → Decode → Execute)
===================================*/
add(
  "computer",
  "basics",
  "Instruction Cycle",
  `<h2>Instruction Cycle (Fetch → Decode → Execute)</h2>
<h3> DEEP EXPLANATION</h3>
<p>
The instruction cycle is the repeated process the CPU follows to execute program instructions.
It runs continuously while the computer is powered on, allowing software to function step by step.
</p>

<h3> MAIN STAGES OF THE INSTRUCTION CYCLE</h3>

<h4>1. Fetch</h4>
<ul>
  <li>The CPU retrieves an instruction from main memory (RAM)</li>
  <li>The instruction is stored in the Instruction Register (IR)</li>
  <li>The Program Counter (PC) points to the next instruction</li>
</ul>

<h4>2. Decode</h4>
<ul>
  <li>The Control Unit (CU) interprets the instruction</li>
  <li>It determines what operation is required</li>
  <li>It identifies the data and components needed</li>
</ul>

<h4>3. Execute</h4>
<ul>
  <li>The ALU or other CPU components carry out the instruction</li>
  <li>Results are produced and stored in registers or memory</li>
  <li>Output may be sent to an output device if required</li>
</ul>

<h3> INSTRUCTION CYCLE FLOW</h3>
<pre>
Fetch → Decode → Execute → Fetch → Decode → Execute (repeats continuously)
</pre>

<h3> DETAILED PROCESS INSIDE CPU</h3>
<ul>
  <li>PC sends address to memory</li>
  <li>Instruction is fetched into IR</li>
  <li>CU decodes instruction</li>
  <li>ALU executes operation</li>
  <li>Result stored and PC updates</li>
</ul>

<h3> IMPORTANCE OF THE INSTRUCTION CYCLE</h3>
<ul>
  <li>Enables computers to run programs step by step</li>
  <li>Ensures systematic execution of instructions</li>
  <li>Keeps CPU working continuously and efficiently</li>
</ul>
`,
[
  {
  q: "A CPU retrieves an instruction from memory before anything else happens. Why is this step necessary in the instruction cycle?",
  hint: "Think starting point of processing",
  answer: "Because the CPU must first obtain the instruction to know what to do",
  explanation: "The fetch stage is essential because the CPU cannot execute or decode anything until it retrieves the instruction from memory."
},

{
  q: "During the instruction cycle, the Control Unit interprets an instruction. What is the importance of this step?",
  hint: "Think understanding the instruction",
  answer: "It determines what operation the CPU must perform",
  explanation: "The decode stage allows the Control Unit to translate instructions into signals that direct the CPU's actions."
},

{
  q: "Explain what happens in the execution stage of the instruction cycle.",
  hint: "Think ALU involvement",
  answer: "The CPU performs the required operation on data",
  explanation: "During execution, the ALU or other components carry out the instruction such as calculations or data movement."
},

{
  q: "A student says the instruction cycle ends after execution. Is this correct? Explain your answer.",
  hint: "Think repetition",
  answer: "No, because the cycle repeats continuously",
  explanation: "The instruction cycle is continuous (Fetch → Decode → Execute) and repeats as long as the computer is running."
},

{
  q: "Which CPU components are mainly involved in the instruction cycle and what are their roles?",
  hint: "Think CU, ALU, memory",
  answer: "CU decodes instructions, ALU executes them, memory stores instructions",
  explanation: "The Control Unit handles decoding, the ALU executes operations, and memory provides instructions and data."
}
]
);
/*========================================
Von Neumann Architecture
========================================*/
add(
  "computer",
  "basics",
  "Von Neumann Architecture",
  `<h2>Von Neumann Architecture</h2>
<h3> DEEP EXPLANATION</h3>
<p>
The Von Neumann architecture is a computer design model where both data and instructions are stored in the same main memory.
It forms the basic structure of most modern computers and follows a sequential processing system.
</p>
<h3> MAIN COMPONENTS</h3>
<ul>
  <li><b>CPU:</b> Contains the ALU and Control Unit (executes instructions)</li>
  <li><b>Main Memory (RAM):</b> Stores both data and instructions</li>
  <li><b>Input Devices:</b> Used to enter data into the computer</li>
  <li><b>Output Devices:</b> Display processed results</li>
  <li><b>System Bus:</b> Transfers data and instructions between components</li>
</ul>
<h3> VON NEUMANN STRUCTURE</h3>
<pre>
Input Devices → Memory ↔ CPU → Output Devices
                     ↑
                 System Bus
</pre>

<h3> TYPES OF BUSES AND THEIR PURPOSES</h3>
<h4>1. Data Bus</h4>
<ul>
  <li>Transfers actual data between CPU, memory, and input/output devices</li>
  <li>Usually bidirectional (data can move both ways)</li>
  <li>Width of data bus affects performance (more bits = faster transfer)</li>
</ul>
<h4>2. Address Bus</h4>
<ul>
  <li>Transfers memory addresses from CPU to memory</li>
  <li>Usually unidirectional (CPU → Memory)</li>
  <li>Determines how much memory a system can access</li>
</ul>
<h4>3. Control Bus</h4>
<ul>
  <li>Transfers control signals between CPU and other components</li>
  <li>Includes signals like read, write, interrupt, and clock signals</li>
  <li>Ensures all parts of the system are synchronized</li>
</ul>
<h3> KEY IDEA</h3>
<ul>
  <li>Data and instructions share the same memory</li>
  <li>Instructions are processed one at a time (sequential execution)</li>
  <li>CPU follows the fetch–decode–execute cycle</li>
</ul>
<h3> HOW IT WORKS</h3>
<ol>
  <li>Input data and instructions are stored in memory</li>
  <li>CPU fetches instruction from memory</li>
  <li>Instruction is decoded by Control Unit</li>
  <li>ALU executes the instruction</li>
  <li>Result is stored back in memory or sent to output</li>
</ol>
<h3> LIMITATION: VON NEUMANN BOTTLENECK</h3>
<ul>
  <li>Data and instructions share the same bus/path</li>
  <li>CPU must wait to access memory</li>
  <li>Slows down processing speed</li>
</ul>
<pre>
Problem:
CPU ↔ SAME BUS ↔ MEMORY (data + instructions)
This creates a bottleneck (traffic jam in data flow)
</pre>
<h3> ADVANTAGES</h3>
<ul>
  <li>Simple and easy to design</li>
  <li>Cost-effective</li>
  <li>Flexible program storage (data + instructions together)</li>
</ul>
<h3> SIMPLE EXPLANATION</h3>
<p>
The Von Neumann architecture is like a single road used by both instructions and data, which makes it simple but can cause delays when traffic is heavy.
</p>
`,
[
  {
    type: "structured",
    q: "What are stored in the same memory in Von Neumann architecture?",
    hint: "Think two things stored together",
    answer: "Data and instructions",
    explanation: "In Von Neumann architecture, both program instructions and data share the same memory space, making the system simpler but slower in access."
  },
  {
    type: "structured",
    q: "What is the Von Neumann bottleneck?",
    hint: "Think speed limitation",
    answer: "Delay caused by shared data and instruction path",
    explanation: "It occurs because the CPU uses the same bus to fetch both data and instructions, creating a speed limitation when both are needed at the same time."
  },
  {
    type: "structured",
    q: "Why does the Von Neumann architecture use a single memory system?",
    hint: "Think simplicity",
    answer: "To store both data and instructions in one place",
    explanation: "This design makes the system easier to build but can reduce performance due to shared access."
  },
  {
    type: "structured",
    q: "What is one disadvantage of Von Neumann architecture?",
    hint: "Think performance",
    answer: "Slower processing due to shared bus",
    explanation: "The CPU cannot fetch instructions and data simultaneously efficiently, leading to delays."
  },
  {
    type: "structured",
    q: "What component connects CPU, memory, and input/output devices in Von Neumann architecture?",
    hint: "Think communication path",
    answer: "Bus system",
    explanation: "The bus system carries data, instructions, and control signals between components."
  }
]
);
/*========================================================
COMPUTER BASICS
========================================================*/

add(
  "computer",
  "basics",
  "Hardware vs software",
  `<h2>Introduction to Computers</h2>
<p>A <strong>computer</strong> is a machine that takes in information (input), processes it, stores it, and produces results (output).</p>
<h2>1. Hardware (Physical Parts)</h2>
<p><strong>Hardware</strong> is anything you can see and touch.</p>
<h3>Main Components</h3>
<ul>
<li><strong>Input Devices:</strong> Used to enter data into the computer</li>
<li><strong>Processing Unit (CPU):</strong> The "brain" of the computer</li>
<li><strong>Output Devices:</strong> Show results</li>
<li><strong>Storage Devices:</strong> Save data</li>
</ul>
<h3>Examples of Hardware</h3>
<ul>
<li>Keyboard (typing)</li>
<li>Mouse (pointing)</li>
<li>Monitor (screen)</li>
<li>CPU/System Unit (processing)</li>
<li>Hard drive / SSD (storage)</li>
<li>Printer (output)</li>
</ul>
<h2>2. Software (Programs)</h2>
<p><strong>Software</strong> tells the hardware what to do.</p>

<h3>Types of Software</h3>
<ul>
<li><strong>System Software:</strong> Controls the computer (Operating System)</li>
<li><strong>Application Software:</strong> Programs used by users (Word, Chrome)</li>
</ul>
<div class="example-box">
Examples:<br>
Windows (OS)<br>
Google Chrome (browser)<br>
Microsoft Word (document program)
</div>
<h2>3. Operating System (OS)</h2>
<p>The <strong>Operating System</strong> is the most important software. It connects the user to the hardware.</p>
<ul>
<li>Manages memory</li>
<li>Controls devices</li>
<li>Runs applications</li>
</ul>
<div class="example-box">
Examples:<br>
Windows<br>
Linux<br>
macOS
</div>
<h2>4. Peripheral Devices</h2>
<p>Peripheral devices are external hardware connected to the computer.</p>
<ul>
<li><strong>Input:</strong> keyboard, mouse, scanner</li>
<li><strong>Output:</strong> monitor, printer, speakers</li>
<li><strong>Storage:</strong> flash drive, external hard disk</li>
</ul>
<h2>5. Liveware (Human Factor)</h2>
<p><strong>Liveware</strong> refers to the human user of the computer.</p>
<ul>
<li>The person operating the computer</li>
<li>Gives instructions</li>
<li>Interprets results</li>
</ul>
<div class="example-box">
Without a user, a computer cannot function meaningfully.
</div>
<h2>How Everything Works Together</h2>
<ul>
<li>User (liveware) gives input</li>
<li>Input devices send data to CPU</li>
<li>CPU processes the data</li>
<li>Results are shown through output devices</li>
<li>Data can be stored for later use</li>
</ul>
<div class="keyfact">
 Key Fact: A computer system = Hardware + Software + Liveware working together.
</div>
`,
[
  {
    q: "What is hardware in a computer system?",
    a: "The physical parts of a computer that you can touch.",
    hint: "Think physical components",
    reason: "Hardware includes all tangible parts like the keyboard, monitor, and CPU."
  },
  {
    q: "What is software in a computer system?",
    a: "Programs that control and operate computer hardware.",
    hint: "Think instructions/programs",
    reason: "Software tells the hardware what to do and how to perform tasks."
  },
  {
    q: "What is the role of an operating system?",
    a: "To manage hardware and run application programs.",
    hint: "Think manager of the computer",
    reason: "The OS controls system resources like memory, CPU, and devices."
  },
  {
    q: "What is liveware in a computer system?",
    a: "The human users of a computer system.",
    hint: "Think people using computers",
    reason: "Liveware refers to humans who operate and interact with computers."
  },
  {
    q: "Name two input devices and two output devices.",
    a: "Input: keyboard, mouse. Output: monitor, printer.",
    hint: "Think devices that send data vs display data",
    reason: "Input devices send data to the computer, output devices display results from the computer."
  }
]
);
/*============================================
Input & Output Devices
============================================*/
add(
  "computer",
  "basics",
  "Input & Output Devices",
  `<h2>Input & Output Devices</h2>
<p>Input devices allow users to <strong>send data to the computer</strong>. Output devices allow the computer to <strong>present results to the user</strong>.</p>
<h2>1. Input Devices</h2>
<ul>
<li><strong>Keyboard:</strong> Types letters, numbers, symbols. Used for typing documents, commands. <em>Advantage:</em> Fast for text input. <em>Disadvantage:</em> Requires literacy/knowledge of layout.</li>
<li><strong>Mouse:</strong> Pointing device to select items. Used for GUI navigation. <em>Advantage:</em> Accurate pointer control. <em>Disadvantage:</em> Needs flat surface.</li>
<li><strong>Touchscreen:</strong> Detects finger/stylus input directly on screen. Used in phones, tablets, ATMs. <em>Advantage:</em> Direct interaction, intuitive. <em>Disadvantage:</em> Can get dirty, less precise for long text.</li>
<li><strong>Stylus:</strong> Pen-like tool for touchscreens. Used in tablets for drawing or handwriting. <em>Advantage:</em> More precise than finger. <em>Disadvantage:</em> Can be lost, needs compatible screen.</li>
<li><strong>Joystick:</strong> Game controller, moves objects in multiple directions. Used in gaming, simulations. <em>Advantage:</em> Easy control in games. <em>Disadvantage:</em> Limited general use.</li>
<li><strong>Voice Input:</strong> Converts spoken words to digital commands. Used in smartphones, voice assistants. <em>Advantage:</em> Hands-free, fast. <em>Disadvantage:</em> Background noise may affect accuracy.</li>
<li><strong>Scanner:</strong> Converts physical documents/images to digital. Used in offices, schools. <em>Advantage:</em> Preserves original document. <em>Disadvantage:</em> Slower than direct typing.</li>
<li><strong>Pinball / Specialized Controllers:</strong> Used in entertainment or arcade systems. <em>Advantage:</em> Engaging interaction. <em>Disadvantage:</em> Limited to niche applications.</li>
</ul>
<div class="example-box">
Typing a report → keyboard input<br>
Drawing a sketch → stylus input<br>
Moving a character in a game → joystick input<br>
Voice commands to phone → voice input
</div>
<h2>2. Output Devices</h2>
<p>Output devices allow the computer to present results to the user.</p>
<h3>Soft Copy Output</h3>
<ul>
<li><strong>Monitor / Screen:</strong> Displays text, images, video. Advantage: Real-time, interactive. Disadvantage: Requires power, cannot be held physically.</li>
<li><strong>Speakers / Headphones:</strong> Produce sound output (music, alerts). Advantage: Hands-free audio feedback. Disadvantage: Affected by noise, not permanent.</li>
<li><strong>Voice Output:</strong> Converts text to speech (TTS). Advantage: Accessibility for visually impaired, hands-free. Disadvantage: Requires quality software, may mispronounce words.</li>
</ul>
<h3>Hard Copy Output</h3>
<ul>
<li><strong>Printers:</strong> Produces permanent copies on paper.</li>
<li><strong>Dot Matrix / Impact Printers:</strong> Strike ink onto paper via pins. Advantage: Cheap, multi-copy printing. Disadvantage: Noisy, low resolution.</li>
<li><strong>Laser Printers:</strong> Use laser beams to print toner. Advantage: High speed, high quality. Disadvantage: Expensive initial cost, toner cartridges.</li>
<li><strong>Inkjet Printers:</strong> Spray tiny ink droplets onto paper. Advantage: High quality, color printing. Disadvantage: Slower than laser, ink expensive.</li>
</ul>
<div class="example-box">
Printing an assignment → hard copy (paper)<br>
Watching video → soft copy (monitor)<br>
Listening to music → soft copy (speakers)
</div>
<h2>3. Advantages and Disadvantages</h2>
<table>
<tr><th>Device Type</th><th>Advantage</th><th>Disadvantage</th></tr>
<tr><td>Keyboard</td><td>Fast text input</td><td>Needs literacy</td></tr>
<tr><td>Mouse</td><td>Accurate pointer control</td><td>Needs flat surface</td></tr>
<tr><td>Touchscreen</td><td>Intuitive, direct interaction</td><td>Less precise for typing</td></tr>
<tr><td>Stylus</td><td>Precision drawing</td><td>Can be lost</td></tr>
<tr><td>Joystick</td><td>Easy control in games</td><td>Limited general use</td></tr>
<tr><td>Voice Input</td><td>Hands-free</td><td>Background noise affects accuracy</td></tr>
<tr><td>Monitor</td><td>Real-time display</td><td>Cannot hold physically</td></tr>
<tr><td>Printer</td><td>Permanent copy</td><td>Costs paper/ink</td></tr>
<tr><td>Speaker</td><td>Audio feedback</td><td>No visual info, affected by noise</td></tr>
</table>
`,
[
  {
    q: "Is a keyboard an input or output device?",
    a: "Input device.",
    hint: "Think: does it send data or display data?",
    reason: "A keyboard sends data (keystrokes) into the computer system."
  },
  {
    q: "Is a monitor an input or output device?",
    a: "Output device.",
    hint: "Think: does it receive or display information?",
    reason: "A monitor displays information from the computer to the user."
  },
  {
    q: "Give two examples of soft copy output.",
    a: "Monitor and speakers.",
    hint: "Think digital output devices",
    reason: "Soft copy output is electronic and not physically printed."
  },
  {
    q: "Give two examples of hard copy output.",
    a: "Printer and photocopier.",
    hint: "Think printed paper output",
    reason: "Hard copy output produces physical documents on paper."
  },
  {
    q: "What is the main disadvantage of voice input?",
    a: "It is affected by background noise.",
    hint: "Think recording environment issues",
    reason: "Noise can interfere with speech recognition accuracy."
  },
  {
    q: "Give one advantage of laser printers over inkjet printers.",
    a: "They are faster and produce higher-quality prints.",
    hint: "Think speed and print quality",
    reason: "Laser printers use toner and laser technology, making them efficient for bulk printing."
  }
]
);
/*============================================
Memory & Storage
============================================*/
add(
  "computer",
  "basics",
  "Memory & Storage",
  `<h2>Memory & Storage</h2>
<p>Computers need memory to <strong>store data and instructions</strong>. There are two main types: <strong>Primary memory</strong> (fast, temporary) and <strong>Secondary storage</strong> (slower, permanent).</p>
<h2>1. Primary Memory (Main Memory)</h2>
<p>Used by the CPU to store data that is being actively used.</p>

<ul>
<li><strong>RAM (Random Access Memory):</strong> Volatile memory; data lost when power is off. Used for active programs and OS. Types: <em>DRAM (Dynamic), SRAM (Static)</em>. Advantage: Fast access. Disadvantage: Temporary.</li>
<li><strong>ROM (Read-Only Memory):</strong> Non-volatile; stores permanent instructions (e.g., BIOS). Cannot be modified easily. Types: PROM, EPROM, EEPROM. Advantage: Permanent. Disadvantage: Cannot change easily.</li>
<li><strong>Cache Memory:</strong> Very fast memory located close to CPU. Stores frequently used data for quick access. Types: L1 (smallest, fastest), L2 (larger, slower than L1), L3 (largest, shared in multi-core CPUs). Advantage: Improves CPU performance. Disadvantage: Expensive, limited size.</li>
<li><strong>Registers:</strong> Smallest, fastest memory inside CPU. Temporarily stores data, instructions, or addresses being processed. Advantage: Immediate access for CPU. Disadvantage: Very limited storage.</li>
</ul>
<h3>Buses in Memory</h3>
<ul>
<li><strong>Data Bus:</strong> Transfers data between CPU and memory.</li>
<li><strong>Address Bus:</strong> Carries memory addresses to read/write locations.</li>
<li><strong>Control Bus:</strong> Sends control signals (read/write operations).</li>
</ul>
<div class="example-box">
CPU accesses RAM → stores active program<br>
Registers hold intermediate calculation results<br>
Cache holds frequently used data to speed CPU
</div>
<h2>2. Secondary Storage</h2>
<p>Used for permanent storage of programs and data. Slower than primary memory but non-volatile.</p>
<h3>Magnetic Storage</h3>
<ul>
<li><strong>Hard Disk Drive (HDD):</strong> Uses magnetic disks to store data. Advantage: High capacity, cheap per GB. Disadvantage: Slower than SSD, sensitive to shocks and magnets.</li>
<li><strong>Magnetic Tape:</strong> Stores large data sequentially. Advantage: Cheap, good for backups. Disadvantage: Slow, sequential access.</li>
<li><strong>Floppy Disk:</strong> Old magnetic storage. Advantage: Portable. Disadvantage: Very low capacity, obsolete.</li>
</ul>
<h3>Solid-State Storage</h3>
<ul>
<li><strong>SSD (Solid-State Drive):</strong> Uses flash memory, no moving parts. Advantage: Fast, durable. Disadvantage: More expensive per GB than HDD.</li>
<li><strong>USB Flash Drive:</strong> Portable flash memory. Advantage: Easy to carry, plug-and-play. Disadvantage: Small capacity, can be lost easily.</li>
</ul>
<h3>Optical Storage</h3>
<ul>
<li><strong>CD-ROM / CD-R / CD-RW:</strong> 700 MB. CD-R: write once. CD-RW: rewriteable. Advantage: Cheap, portable. Disadvantage: Low capacity, slower than HDD/SSD.</li>
<li><strong>DVD / DVD-R / DVD-RW:</strong> 4.7–8.5 GB. Advantage: Larger capacity than CD. Disadvantage: Slower than HDD/SSD.</li>
<li><strong>Blu-Ray Disc:</strong> 25–50 GB. Advantage: High capacity, good for HD video. Disadvantage: Expensive, requires Blu-Ray drive.</li>
</ul>
<h3>Handling & Care of Storage Devices</h3>
<ul>
<li>Keep HDDs away from strong magnets → data can be erased.</li>
<li>Avoid exposing disks (HDD, CDs/DVDs/BDs) to dust, smoke, heat, or scratches.</li>
<li>Use anti-static precautions for RAM or motherboards.</li>
<li>Do not bend or drop flash drives or floppy disks.</li>
<li>Back up critical data to multiple storage types for safety.</li>
</ul>
<div class="example-box">
Saving a document → stored on HDD/SSD<br>
Watching a movie → from DVD/Blu-Ray or SSD<br>
Booting computer → BIOS instructions from ROM
</div>
<div class="keyfact"> Key Fact: Primary memory is fast but volatile; secondary storage is slower but permanent. Proper care ensures long lifespan and data safety.</div>
`,
[
  {
    q: "What type of memory is RAM?",
    a: "Volatile (temporary) memory.",
    hint: "Think temporary storage",
    reason: "RAM loses data when power is turned off, so it is called volatile memory."
  },
  {
    q: "What type of memory is ROM?",
    a: "Non-volatile (permanent) memory.",
    hint: "Think permanent storage",
    reason: "ROM retains data even when the computer is switched off."
  },
  {
    q: "Name two types of cache memory.",
    a: "L1 and L2 (also L3).",
    hint: "Think levels inside CPU",
    reason: "Cache memory is divided into levels based on speed and proximity to the CPU."
  },
  {
    q: "Where are registers located?",
    a: "Inside the CPU.",
    hint: "Think fastest storage in processor",
    reason: "Registers are part of the CPU and provide extremely fast data access."
  },
  {
    q: "What is the difference between HDD and SSD?",
    a: "HDD is cheaper but slower; SSD is faster but more expensive.",
    hint: "Speed vs cost",
    reason: "SSD uses flash memory with no moving parts, making it faster than HDD."
  },
  {
    q: "What is the difference between CD-R and CD-RW?",
    a: "CD-R can be written once, while CD-RW can be rewritten multiple times.",
    hint: "Write once vs reuse",
    reason: "CD-RW supports rewriting, while CD-R only allows one-time recording."
  },
  {
    q: "How should you handle a hard disk drive (HDD)?",
    a: "Avoid magnets, shocks, and dust.",
    hint: "Think physical protection",
    reason: "HDDs have moving parts that can be easily damaged by physical impact or dust."
  }
]
);
/*============================================
Operating System
=============================================*/
add(
  "computer",
  "basics",
  "Operating systems",
  `<h2>Operating System</h2>
<p>An operating system (OS) is a set of system software that manages computer hardware and software resources, serving as an interface between the user and the computer hardware. It allows applications to run, manages memory, schedules tasks, and controls peripheral devices.</p>
<h2>Key Notes and Concepts</h2>
<h3>1. Primary Roles and Goals</h3>
<ul>
<li><strong>Interface:</strong> Acts as an intermediary between the user and computer hardware, making the computer convenient to use.</li>
<li><strong>Resource Manager:</strong> Allocates and manages shared hardware resources such as CPU time, memory, and Input/Output (I/O) devices, ensuring efficient utilization.</li>
<li><strong>Abstraction:</strong> Conceals the complexities of hardware from applications, providing a uniform interface.</li>
<li><strong>Kernel:</strong> The core, essential part of the OS that is always running and manages critical functions.</li>
<li><strong>Shell:</strong> The component that interprets user commands and gets them executed.</li>
</ul>
<h3>2. Core Functions of an Operating System</h3>
<ul>
<li><strong>Process Management:</strong> Manages the execution of applications (processes), including scheduling, creation, termination, and synchronization.</li>
<li><strong>Memory Management:</strong> Tracks and allocates Main Memory (RAM). It decides which processes load into memory and manages virtual memory (using hard disk space as an extension of RAM).</li>
<li><strong>File Management:</strong> Organizes, creates, deletes, and manages files and directories on storage devices.</li>
<li><strong>Device Management:</strong> Uses device drivers to communicate with hardware peripherals (printers, disks, keyboards).</li>
<li><strong>Security and Protection:</strong> Protects data and resources from unauthorized access via authentication (passwords) and isolation of processes.</li>
<li><strong>Error Detection:</strong> Monitors system health and reports errors to prevent system failure.</li>
</ul>
<h3>3. Key OS Concepts and Techniques</h3>
<ul>
<li><strong>System Calls:</strong> The interface between a running program and the OS kernel, allowing user-level programs to request services.</li>
<li><strong>Multitasking/Multiprogramming:</strong> The ability of an OS to switch between tasks quickly, allowing multiple programs to run seemingly at the same time and keeping the CPU busy.</li>
<li><strong>Interrupts:</strong> Signals sent to the CPU by hardware or software to request immediate attention, allowing the OS to react to events.</li>
<li><strong>Deadlock Handling:</strong> Manages situations where two or more processes are stuck waiting for resources held by each other.</li>
<li><strong>Spooling:</strong> Temporarily storing data in a buffer (e.g., for printers) so the CPU can continue other tasks while the slow device works.</li>
<li><strong>Booting:</strong> The process of starting a computer by loading the kernel into memory.</li>
</ul>
<h3>4. Types of Operating Systems</h3>
<ul>
<li><strong>Batch OS:</strong> Jobs with similar needs are grouped (batched) and processed together without user interaction (e.g., payroll).</li>
<li><strong>Time-Sharing (Multitasking) OS:</strong> Allows multiple users to share the system simultaneously by switching between tasks quickly (e.g., Unix, Windows).</li>
<li><strong>Distributed OS:</strong> Manages a group of independent computers and makes them appear as a single system.</li>
<li><strong>Real-Time OS (RTOS):</strong> Used when strict time constraints are required (e.g., robotics, airbag controllers).</li>
<li><strong>Mobile OS:</strong> Designed specifically for smartphones and tablets (e.g., Android, iOS).</li>
</ul>
<h3>5. Common Examples</h3>
<ul>
<li>Windows: Microsoft’s commercial OS for desktops and servers.</li>
<li>Linux: Open-source, Unix-based OS, popular on servers.</li>
<li>macOS: Apple’s desktop OS.</li>
<li>Android/iOS: Dominant mobile operating systems.</li>
</ul>
<h3>6. OS Structure</h3>
<ul>
<li><strong>Monolithic Kernel:</strong> All OS services run in kernel space, high performance but less stable (e.g., Linux).</li>
<li><strong>Microkernel:</strong> Only essential services run in kernel space; others run in user space, increasing stability (e.g., Minix).</li>
<li><strong>Hybrid Kernel:</strong> Combines aspects of both (e.g., Windows NT, macOS).</li>
</ul>
`,
);
/*============================================
File Management
=============================================*/
add(
  "computer",
  "basics",
  "File management",
  `<h2>File Management</h2>
<p>File management is a fundamental concept in computing that involves how an operating system (OS) stores, names, organizes, and manipulates files. In a high school curriculum, this typically covers the hierarchy of storage, file attributes, and common operations.</p>
<h3>1. The File Hierarchy (Folders and Directories)</h3>
<p>Computers use a hierarchical structure (often called a "tree structure") to organize data.</p>
<ul>
<li><strong>Drive:</strong> The top level of storage (e.g., C: drive for a Hard Drive, D: for a USB).</li>
<li><strong>Folders (Directories):</strong> Containers used to group related files together.</li>
<li><strong>Sub-folders:</strong> Folders inside other folders.</li>
<li><strong>Files:</strong> The actual data units (documents, images, programs).</li>
</ul>
<div class="example-box">
Example Path:<br>
C:\\Documents\\School\\ComputerScience\\Notes.docx<br>
"School" is a folder, and "Notes.docx" is the file.
</div>
<h3>2. File Naming and Extensions</h3>
<p>A filename consists of two parts: the name and the extension, separated by a dot.</p>
<ul>
<li><strong>Filename:</strong> A descriptive name (e.g., History_Essay)</li>
<li><strong>Extension:</strong> Indicates the file type and program used to open it</li>
</ul>
<table>
<tr><th>Type</th><th>Extension</th><th>Program Example</th></tr>
<tr><td>Documents</td><td>.docx, .pdf, .txt</td><td>Word, Adobe Reader</td></tr>
<tr><td>Images</td><td>.jpg, .png, .gif</td><td>Photos, Photoshop</td></tr>
<tr><td>Audio</td><td>.mp3, .wav</td><td>Spotify, Media Player</td></tr>
<tr><td>Video</td><td>.mp4, .mov</td><td>VLC, QuickTime</td></tr>
<tr><td>Executables</td><td>.exe, .app</td><td>System Applications</td></tr>
</table>
<h3>3. Basic File Operations</h3>
<ul>
<li><strong>Create:</strong> Making a new file or folder</li>
<li><strong>Save / Save As:</strong> Writing data to storage ("Save As" changes name/type)</li>
<li><strong>Copy:</strong> Duplicate file in another location</li>
<li><strong>Move (Cut/Paste):</strong> Change file location</li>
<li><strong>Rename:</strong> Change filename</li>
<li><strong>Delete:</strong> Send file to Recycle Bin / Trash</li>
</ul>
<h3>4. File Metadata and Attributes</h3>
<p>Files have hidden information called metadata:</p>
<ul>
<li><strong>File Size:</strong> KB, MB, GB</li>
<li><strong>Date Created/Modified</strong></li>
<li><strong>Permissions:</strong> Read, Write, Execute</li>
<li><strong>Status:</strong> Hidden, System, Read-only</li>
</ul>
<h3>5. Storage Best Practices</h3>
<ul>
<li>Use descriptive names (e.g., Bio_Lab_Report_V2)</li>
<li>Organize files into folders</li>
<li>Backup files regularly (Cloud or external drive)</li>
<li>Avoid deep nesting (too many folders inside folders)</li>
</ul>
<h3>6. Compression and Archiving</h3>
<ul>
<li><strong>Compression (.zip, .rar):</strong> Reduces file size</li>
<li><strong>Extracting:</strong> Restores compressed files to original form</li>
</ul>
<div class="example-box">
Example:<br>
Large folder → compressed to .zip → sent via email → extracted by receiver
</div>
<div class="keyfact">
 Key Fact: Good file management makes it easier to find files, saves storage space, and prevents data loss.
</div>
`,
[
  {
    q: "What is a file hierarchy?",
    a: "A tree-like structure used to organize files and folders.",
    hint: "Think folders inside folders",
    reason: "File hierarchy helps organize data in a structured way for easy access and management."
  },
  {
    q: "What is a file extension?",
    a: "A suffix that indicates the file type and the program used to open it.",
    hint: "Think .pdf, .jpg, .docx",
    reason: "File extensions help the operating system identify how to open and process a file."
  },
  {
    q: "What is the difference between copy and move?",
    a: "Copy creates a duplicate of a file, while move transfers it to a new location.",
    hint: "Duplicate vs relocate",
    reason: "Copy keeps the original file, while move removes it from the original location."
  },
  {
    q: "Why do we compress files?",
    a: "To reduce file size for easier storage and faster transfer.",
    hint: "Think making files smaller",
    reason: "Compression saves storage space and speeds up file sharing over networks."
  }
]
);
/*========================================================
INTRODUCTION TO PROGRAMMING
========================================================*/
add(
  "computer",
  "programming",
  "Introduction to Programming",
  `<h2>Introduction to Programming</h2>
<p><strong>Programming</strong> is the process of creating a set of instructions that tells a computer how to perform a specific task.</p>
<div class="example-box">
Think of programming like writing a recipe:<br>
Ingredients → Data<br>
Steps → Code<br>
Final dish → Output
</div>
<h2>1. Essential Programming Terminology</h2>
<ul>
<li><strong>Algorithm:</strong> A step-by-step procedure for solving a problem.</li>
<li><strong>Source Code:</strong> The actual text written by a programmer.</li>
<li><strong>Syntax:</strong> Rules that define how code must be written.</li>
<li><strong>Bug:</strong> An error in a program.</li>
<li><strong>Debugging:</strong> Finding and fixing errors.</li>
<li><strong>Variable:</strong> A container for storing data.</li>
<li><strong>Compiler/Interpreter:</strong> Tools that translate code into machine language (1s and 0s).</li>
</ul>
<h2>2. The Programming Process (SDLC)</h2>
<ul>
<li><strong>Problem Definition:</strong> Understand the problem.</li>
<li><strong>Design:</strong> Plan the solution (flowcharts, pseudocode).</li>
<li><strong>Coding:</strong> Write the program.</li>
<li><strong>Testing:</strong> Find and fix bugs.</li>
<li><strong>Maintenance:</strong> Update and improve the program.</li>
</ul>
<div class="example-box">
Example:<br>
Build a calculator → plan steps → code → test → fix errors
</div>
<h2>3. Categories of Programming Languages</h2>
<h3>Low-Level Languages</h3>
<ul>
<li><strong>Machine Code:</strong> Binary (0s and 1s), very hard for humans.</li>
<li><strong>Assembly Language:</strong> Uses short codes (MOV, ADD).</li>
</ul>
<h3>High-Level Languages (HLL)</h3>
<p>Designed to be easy for humans.</p>
<table>
<tr><th>Language</th><th>Use</th><th>Strength</th></tr>
<tr><td>Python</td><td>AI, Data Science</td><td>Easy for beginners</td></tr>
<tr><td>Java</td><td>Apps, Systems</td><td>Portable</td></tr>
<tr><td>C++</td><td>Games</td><td>Fast</td></tr>
<tr><td>JavaScript</td><td>Web</td><td>Runs in browsers</td></tr>
<tr><td>Swift</td><td>iOS apps</td><td>Optimized for Apple</td></tr>
</table>
<h2>4. Fundamental Logic Structures</h2>
<h3>A. Sequence</h3>
<p>Instructions executed step by step.</p>
<h3>B. Selection (Decision)</h3>
<p>Program chooses based on condition.</p>
<div class="example-box">
IF age ≥ 18 → allow voting<br>
ELSE → deny access
</div>
<h3>C. Iteration (Loop)</h3>
<p>Repeats instructions.</p>
<div class="example-box">
Send 100 emails automatically
</div>
<h2>5. Data Types</h2>
<ul>
<li><strong>Integer:</strong> Whole numbers (5, -42)</li>
<li><strong>Float:</strong> Decimal numbers (3.14)</li>
<li><strong>String:</strong> Text ("Hello")</li>
<li><strong>Boolean:</strong> True/False</li>
</ul>
<h2>6. Interpreted vs Compiled Languages</h2>
<ul>
<li><strong>Compiled:</strong> Entire program translated before running (e.g., C++) → faster</li>
<li><strong>Interpreted:</strong> Runs line-by-line (e.g., Python) → easier debugging</li>
</ul>
<div class="example-box">
C++ → compiled → fast execution<br>
Python → interpreted → easier to debug
</div>
<div class="keyfact">
 Key Fact: Every program you use — from games to mobile apps — follows these same core principles.
</div>
`,
[
 {
  q: "A student writes instructions for a robot to make tea step by step. What concept in programming does this represent and why?",
  a: "Algorithm",
  hint: "Think step-by-step instructions",
  reason: "An algorithm is a clear step-by-step procedure for solving a problem, just like instructions given to a robot."
},

{
  q: "Explain why programming is important in modern technology.",
  a: "It allows computers to perform tasks automatically",
  hint: "Think automation and control",
  reason: "Programming is essential because it enables computers, apps, and systems to function and solve problems without human intervention."
},

{
  q: "A programmer writes code that only runs when a condition is true. Which programming structure is being used?",
  a: "Selection",
  hint: "Think decision making (if/else)",
  reason: "Selection allows programs to make decisions based on conditions using statements like IF and ELSE."
},

{
  q: "A program repeats a task 10 times using a loop. Which programming concept is being applied?",
  a: "Iteration",
  hint: "Think repetition",
  reason: "Iteration allows repetition of instructions using loops such as FOR and WHILE."
},

{
  q: "Why is a compiler faster during program execution compared to an interpreter?",
  a: "Because it translates the whole program at once before execution",
  hint: "Think pre-translation",
  reason: "A compiler translates the entire program into machine code before execution, making runtime faster."
},

{
  q: "Give a real-life example where programming is used and explain its importance.",
  a: "Mobile apps like WhatsApp for communication",
  hint: "Think daily technology use",
  reason: "Programming is used to build apps like WhatsApp, which enable instant communication worldwide."
}
]
);
/*=============================================
Loops & Conditionals
=============================================*/
add(
  "computer",
  "programming",
  "Loops & conditionals",
  `<h2>Loops & Conditionals</h2>
<p><strong>Conditionals:</strong> decision making</p>
<pre>
if x > 5:
  print("Big")
</pre>
<p><strong>Loops:</strong> repetition</p>
<pre>
for i in range(5):
  print(i)
</pre>
<div class="example-box">
Loop prints numbers 0–4
</div>
<h2>Control Structures</h2>
<p>Control structures are the "brain" of any program. They allow the code to make decisions and repeat tasks, moving beyond simple step-by-step execution.</p>
<h2>1. Conditional Statements (Selection)</h2>
<p>Conditionals allow a program to execute specific blocks of code only if a certain condition is met.</p>
<h3>A. The if Statement</h3>
<p>The most basic decision-making statement. If the condition is true, the code runs.</p>
<pre>
age = 20
if age >= 18:
    print("You are an adult.")
</pre>
<h3>B. The if-else Statement</h3>
<p>Provides an alternative path if the condition is false.</p>
<pre>
score = 45
if score >= 50:
    print("Pass")
else:
    print("Fail")
</pre>
<h3>C. The if-elif-else Ladder</h3>
<p>Used when there are more than two possible outcomes.</p>
<pre>
grade = 85
if grade >= 90:
    print("A")
elif grade >= 80:
    print("B")
elif grade >= 70:
    print("C")
else:
    print("D or F")
</pre>
<h3>D. Nested if Statements</h3>
<p>An if statement inside another if for complex conditions.</p>
<pre>
has_ticket = True
has_id = False

if has_ticket:
    if has_id:
        print("Entry allowed.")
    else:
        print("Please show your ID.")
else:
    print("No ticket, no entry.")
</pre>
<h2>2. Loops (Iteration)</h2>
<p>Loops repeat a block of code multiple times.</p>
<h3>A. The for Loop</h3>
<p>Used when you know how many times to repeat.</p>
<pre>
for i in range(5):
    print("Loop number:", i)
</pre>
<h3>B. The while Loop</h3>
<p>Repeats while a condition is true.</p>
<pre>
count = 5
while count > 0:
    print(count)
    count = count - 1
print("Blast off!")
</pre>
<h3>C. Nested Loops</h3>
<p>A loop inside another loop.</p>
<pre>
for row in range(3):
    for col in range(3):
        print("Row", row, "Col", col)
</pre>
<h2>3. Key Loop Controls</h2>
<ul>
<li><strong>break:</strong> Stops the loop immediately</li>
<li><strong>continue:</strong> Skips current iteration</li>
</ul>
<h2>Comparison: Loops vs Conditionals</h2>
<table>
<tr><th>Feature</th><th>Conditionals (if)</th><th>Loops (for/while)</th></tr>
<tr><td>Purpose</td><td>Decision making</td><td>Repetition</td></tr>
<tr><td>Execution</td><td>Runs once</td><td>Runs repeatedly</td></tr>
<tr><td>Keywords</td><td>if, else, elif</td><td>for, while</td></tr>
<tr><td>Example</td><td>Checking password</td><td>Printing multiple pages</td></tr>
</table>
<div class="keyfact">
 Conditionals decide WHAT to do, loops decide HOW MANY TIMES to do it.
</div>
`,
[
  {
  q: "Write a Python program that prints numbers from 1 to 100 using a loop.",
  sample: "for i in range(1, 101):\n    print(i)",
  hint: "Think for loop and range()",
  answer: "Use a for loop from 1 to 100",
  reason: "A loop avoids writing print statements 100 times and automates repetition efficiently."
},

{
  q: "Given this code:\nfor i in range(1, 10):\n    if i == 5:\n        break\n    print(i)\nExplain what it does and what output is produced.",
  sample: "1 2 3 4",
  hint: "Think break stops loop",
  answer: "It prints numbers 1 to 4 then stops at 5",
  reason: "The break statement exits the loop when i equals 5."
},

{
  q: "Write a program that prints numbers from 1 to 10 but skips number 5 using a loop.",
  sample: "for i in range(1, 11):\n    if i == 5:\n        continue\n    print(i)",
  hint: "Think skip one value",
  answer: "Use continue to skip 5",
  reason: "Continue skips the current iteration and moves to the next number."
},

{
  q: "Write a Python program using a while loop to print numbers from 1 to 10.",
  sample: "i = 1\nwhile i <= 10:\n    print(i)\n    i += 1",
  hint: "Think condition-based loop",
  answer: "Use a while loop with counter",
  reason: "While loops run as long as the condition is true."
},

{
  q: "A program repeatedly asks a user for a password until the correct one is entered. Write a simple pseudocode for this.",
  sample: "WHILE password != correct_password:\n    ASK user for password\nPRINT 'Access granted'",
  hint: "Think input validation loop",
  answer: "Use a while loop to repeat until correct input",
  reason: "While loops are used when repetition depends on a condition being satisfied."
}
]
);
/*=============================================
Functions & Methods
=============================================*/
add(
  "computer",
  "programming",
  "Functions & methods",
  `<h2>Functions & Methods</h2>
<p>A function is reusable code.</p>
<pre>
def add(a,b):
  return a+b
</pre>
<div class="example-box">
add(2,3) = 5
</div>
<h2>In programming, functions and methods are blocks of reusable code designed to perform a specific action.</h2>
<p>They help break down complex programs into smaller, manageable, and organized pieces.</p>
<h2>1. What is a Function?</h2>
<p>A function is a self-contained block of code that only runs when it is called. You can pass data, known as parameters, into a function, and it can return data as a result.</p>
<h3>Key Components:</h3>
<ul>
<li><strong>Declaration/Definition:</strong> Creating the function and giving it a name.</li>
<li><strong>Parameters:</strong> Variables listed in the function definition (the "inputs").</li>
<li><strong>Arguments:</strong> The actual values sent to the function when it is called.</li>
<li><strong>Return Statement:</strong> The "output" the function sends back to the main program.</li>
</ul>
<h3>Example in Python:</h3>
<pre>
# Defining the function
def greet_user(name): 
    return "Hello, " + name
# Calling the function
message = greet_user("Alex")
print(message)
</pre>
<h2>2. What is a Method?</h2>
<p>A method is essentially a function that "belongs" to an object or a class. While functions can be called by themselves, a method must be called on a specific object.</p>
<h3>The Difference:</h3>
<ul>
<li><strong>Function:</strong> calculate_area(5, 10) (Independent)</li>
<li><strong>Method:</strong> my_dog.bark() (Dependent on the "dog" object)</li>
</ul>
<h3>Example of a String Method:</h3>
<pre>
text = "hello world"
print(text.upper())
</pre>
<h2>3. Why Use Functions and Methods?</h2>
<ul>
<li><strong>Reusability (DRY):</strong> Write code once and reuse it.</li>
<li><strong>Abstraction:</strong> Use code without knowing internal details.</li>
<li><strong>Organization:</strong> Makes code easier to read and debug.</li>
<li><strong>Modularity:</strong> Allows teamwork in programming.</li>
</ul>
<h2>4. Function Scope (Local vs Global)</h2>
<p>Scope determines where a variable can be used.</p>
<ul>
<li><strong>Local Scope:</strong> Variable inside function.</li>
<li><strong>Global Scope:</strong> Variable outside function.</li>
</ul>
<h3>Example:</h3>
<pre>
x = 10 # Global variable
def my_function():
    y = 5 # Local variable
    print(x)
    print(y)

my_function()
print(y) # ERROR
</pre>
<h2>5. Built-in vs User-Defined Functions</h2>
<ul>
<li><strong>Built-in:</strong> Provided by language (print(), len())</li>
<li><strong>User-defined:</strong> Created by programmer</li>
</ul>
<h2>Summary Table</h2>
<table>
<tr><th>Feature</th><th>Function</th><th>Method</th></tr>
<tr><td>Location</td><td>Independent</td><td>Inside class</td></tr>
<tr><td>Call</td><td>function_name()</td><td>object.method()</td></tr>
<tr><td>Relationship</td><td>No object</td><td>Linked to object</td></tr>
<tr><td>Data</td><td>Uses parameters</td><td>Uses object data</td></tr>
</table>
<div class="keyfact">
 Functions are independent blocks of code, while methods belong to objects.
</div>
`,
[
  {
  q: "What is a function in programming?",
  a: "A reusable block of code that performs a specific task.",
  hint: "Think reusable block of code",
  reason: "Functions help avoid repetition by allowing a block of code to be reused multiple times in a program."
},

{
  q: "What is a method in programming?",
  a: "A function that belongs to an object.",
  hint: "Think object-based function",
  reason: "Methods are functions defined inside classes and are used to perform actions on objects."
},

{
  q: "What is the difference between a parameter and an argument?",
  a: "A parameter is a variable in a function definition, while an argument is the actual value passed to it.",
  hint: "Definition vs actual value",
  reason: "Parameters act as placeholders in a function definition, while arguments are real values supplied during function calls."
},

{
  q: "What is a local variable?",
  a: "A variable defined inside a function and used only within it.",
  hint: "Think inside a function",
  reason: "Local variables exist only during function execution and cannot be accessed outside the function."
},

{
  q: "What is a global variable?",
  a: "A variable defined outside functions and accessible throughout the program.",
  hint: "Think outside all functions",
  reason: "Global variables can be used anywhere in the program, including inside functions."
},

{
  q: "Write a Python function that prints 'Hello World' when called.",
  answer: "def greet():\n    print('Hello World')\n\ngreet()",
  hint: "Think function definition using def",
  reason: "Functions in Python are defined using 'def' and must be called to execute."
},

{
  q: "Write a Python function that takes a name as a parameter and prints a greeting.",
  answer: "def greet(name):\n    print('Hello ' + name)\n\ngreet('John')",
  hint: "Think parameter inside function",
  reason: "Parameters allow functions to accept input and perform customized actions."
}
]
);
/*=========================================
Arrays & Lists
=========================================*/
add(
  "computer",
  "programming",
  "Arrays & lists",
  `<h2>Arrays & Lists</h2>
<p>In programming, we often need to store a collection of similar items (like a list of student names or temperatures). Instead of creating many separate variables, we use <b>Arrays and Lists</b>.</p>
<h3>1. What is an Array?</h3>
<p>An <b>Array</b> is a collection of items stored at contiguous (neighboring) memory locations. It holds a fixed number of items, usually of the same data type.</p>
<ul>
<li><b>Fixed Size:</b> Cannot be changed after creation.</li>
<li><b>Homogeneous:</b> Same data type.</li>
<li><b>Index-Based:</b> Each element has a position.</li>
</ul>
<h3>2. The Concept of Indexing</h3>
<p>Indexing starts at <b>0</b>:</p>
<ul>
<li>First element → index 0</li>
<li>Second element → index 1</li>
<li>Last element → index (n-1)</li>
</ul>
<pre>
prices = [10.50, 20.00, 5.75]
prices[0] = 10.50
prices[2] = 5.75
</pre>
<h3>3. Arrays vs Lists</h3>
<table border="1">
<tr><th>Feature</th><th>Array</th><th>List</th></tr>
<tr><td>Size</td><td>Fixed</td><td>Dynamic</td></tr>
<tr><td>Data Types</td><td>Same type</td><td>Mixed allowed (Python)</td></tr>
<tr><td>Memory</td><td>Efficient</td><td>More flexible</td></tr>
<tr><td>Languages</td><td>C, C++, Java</td><td>Python, JavaScript</td></tr>
</table>
<h3>4. Common Operations</h3>
<ul>
<li><b>Accessing:</b> Get value using index</li>
<li><b>Updating:</b> Change value</li>
<li><b>Appending:</b> Add item (Lists)</li>
<li><b>Traversing:</b> Loop through items</li>
</ul>
<h3>5. Code Examples</h3>
<h4>Python (Lists)</h4>
<pre>
fruits = ["Apple", "Banana", "Cherry"]
fruits.append("Orange")
fruits[1] = "Blueberry"
for x in fruits:
    print(x)
</pre>
<h4>Java (Arrays)</h4>
<pre>
int[] numbers = new int[5];

numbers[0] = 10;
numbers[1] = 20;

System.out.println(numbers[0]);
</pre>
<h3>6. Two-Dimensional (2D) Arrays</h3>
<pre>
grid = [
  [1,2,3],
  [4,5,6],
  [7,8,9]
]

print(grid[1][1])
</pre>
<h3>7. Why Use Arrays/Lists?</h3>
<ul>
<li><b>Efficiency:</b> Fast access using index</li>
<li><b>Group Processing:</b> Handle many items with loops</li>
<li><b>Sorting:</b> Organize data easily</li>
</ul>
<div class="example-box">
numbers = [1,2,3]
numbers[0] = 1
</div>
`,
 [
  {
    q: "What is an array?",
    a: "A fixed-size collection of same-type elements stored in memory.",
    hint: "Think fixed structure and same data type",
    reason: "Arrays store elements in contiguous memory with a fixed size and uniform type for efficiency."
  },
  {
    q: "What is indexing?",
    a: "Accessing elements using positions starting from 0.",
    hint: "Think position numbers in a list",
    reason: "Indexing allows direct access to elements, and most programming languages start counting from 0."
  },
  {
    q: "Difference between array and list?",
    a: "Arrays are fixed size; lists are dynamic.",
    hint: "Think flexibility vs fixed structure",
    reason: "Arrays cannot change size after creation, while lists can grow or shrink dynamically."
  },
  {
    q: "Name 2 operations on lists.",
    a: "Accessing, updating, appending, traversing.",
    hint: "Think actions you can perform on elements",
    reason: "Lists support multiple operations to manipulate and process stored data efficiently."
  },
  {
    q: "What is a 2D array?",
    a: "An array of arrays forming rows and columns.",
    hint: "Think table structure",
    reason: "2D arrays organize data in rows and columns, like a grid or matrix."
  }
]
);
/*==============================================
Debugging
==============================================*/
add(
  "computer",
  "programming",
  "Debugging",
  `<h2>Debugging</h2>
<p>
<b>Debugging</b> is the systematic process of identifying, analyzing, and fixing errors (bugs) in a computer program. It is a core skill in programming and software development.
</p>
<h3> DEBUGGING PROCESS</h3>
<ol>
<li><b>Reproduce the error</b>: Make the bug happen consistently</li>
<li><b>Locate the error</b>: Identify the exact part of the code causing the issue</li>
<li><b>Analyze the cause</b>: Understand why the error occurs</li>
<li><b>Fix and test</b>: Correct the code and verify the solution</li>
</ol>
<h3> TYPES OF ERRORS</h3>
<h4>1. Syntax Errors</h4>
<p>
Errors caused by breaking programming language rules. The program will not run.
</p>
<pre>
if age >= 18
    print("Allowed")  # Missing colon causes error

# Fix
if age >= 18:
    print("Allowed")
</pre>
<h4>2. Runtime Errors</h4>
<p>
Errors that occur while the program is running (often causes crash).
</p>
<pre>
x = 10
y = 0
print(x / y)  # Division by zero error

# Fix
if y != 0:
    print(x / y)
</pre>
<h4>3. Logical Errors</h4>
<p>
The program runs but produces incorrect results.
</p>
<pre>
# Wrong
average = num1 + num2 / 2

# Correct
average = (num1 + num2) / 2
</pre>
<h3> COMMON ERROR TYPES</h3>
<table border="1">
<tr><th>Error</th><th>Cause</th><th>Fix</th></tr>
<tr><td>NameError</td><td>Variable not defined</td><td>Define before use</td></tr>
<tr><td>TypeError</td><td>Wrong data type operation</td><td>Convert types (e.g. str(), int())</td></tr>
<tr><td>IndexError</td><td>Invalid list index</td><td>Check list size</td></tr>
<tr><td>IndentationError</td><td>Wrong spacing</td><td>Fix indentation</td></tr>
</table>
<h3> DEBUGGING TECHNIQUES</h3>
<ul>
<li><b>Print debugging</b>: Use print() to trace values</li>
<li><b>Debugger tools</b>: Breakpoints, step-by-step execution</li>
<li><b>Rubber duck debugging</b>: Explain code to find logic errors</li>
<li><b>Code isolation</b>: Comment out sections to locate errors</li>
</ul>
<pre>
print("DEBUG:", x)
</pre>
<h3> DEBUGGING CHECKLIST</h3>
<ul>
<li>Read error messages carefully</li>
<li>Check spelling and syntax</li>
<li>Verify variable values and types</li>
<li>Simplify the problem</li>
</ul>
<div class="example-box">
Debugging = Systematic process of finding and fixing errors in code
</div>
`,
[
{
  type: "structured",
  q: "What is debugging?",
  a: "Process of finding and fixing errors in code",
  hint: "Think error correction",
  reason: "Debugging ensures a program works correctly by removing bugs."
},
{
  type: "structured",
  q: "Name the three types of programming errors.",
  a: "Syntax errors, runtime errors, logical errors",
  hint: "Think categories of mistakes",
  reason: "These are the main classifications of coding errors."
},
{
  type: "structured",
  q: "What is a syntax error?",
  a: "An error caused by breaking programming language rules",
  hint: "Grammar of code",
  reason: "Syntax errors prevent the program from running."
},
{
  type: "structured",
  q: "What is a runtime error?",
  a: "An error that occurs while the program is executing",
  hint: "Happens during execution",
  reason: "It causes the program to crash while running."
},
{
  type: "structured",
  q: "What is a logical error?",
  a: "An error where the program runs but produces incorrect output",
  hint: "Wrong result but no crash",
  reason: "The logic of the program is incorrect."
},
{
  type: "structured",
  q: "What is print debugging?",
  a: "Using print statements to track variable values and program flow",
  hint: "Tracking values",
  reason: "It helps locate where errors occur in the code."
}
]
);
/*==============================================
Object-Oriented Programming 
==============================================*/
add(
  "computer",
  "programming",
  "Object-Oriented Programming (OOP)",
  `<h2>Object-Oriented Programming (OOP)</h2>
<p>
<b>Object-Oriented Programming (OOP)</b> is a programming paradigm that organizes software around <b>objects</b>, which combine data (attributes) and behavior (methods).
</p>
<h3> REAL-LIFE ANALOGY</h3>
<div class="example-box">
Car → Object<br>
Properties → color, speed<br>
Methods → drive(), brake()
</div>
<h3> CORE PRINCIPLES (PILLARS OF OOP)</h3>
<ul>
<li><b>Encapsulation</b>: Hiding internal data and controlling access</li>
<li><b>Inheritance</b>: Reusing properties from another class</li>
<li><b>Polymorphism</b>: Same method behaves differently in different classes</li>
<li><b>Abstraction</b>: Hiding complex implementation and showing only essentials</li>
</ul>
<h3> BASIC STRUCTURE (PYTHON)</h3>
<pre>
class Car:
    def __init__(self, brand):
        self.brand = brand

    def drive(self):
        print(self.brand + " is moving")

my_car = Car("Toyota")
my_car.drive()
</pre>
<h3> KEY CONCEPTS</h3>
<ul>
<li><b>Class</b>: Blueprint for objects</li>
<li><b>Object</b>: Instance of a class</li>
<li><b>Attributes</b>: Data inside objects</li>
<li><b>Methods</b>: Functions inside classes</li>
</ul>
<h3> WHY OOP IS IMPORTANT</h3>
<ul>
<li>Improves code reusability</li>
<li>Makes programs modular</li>
<li>Easy to maintain and scale</li>
<li>Closer to real-world modeling</li>
</ul>
<div class="keyfact">
 OOP = Objects + Data + Behavior working together
</div>
`,
[
{
type:"structured",
q:"What is Object-Oriented Programming?",
a:"A programming style based on objects containing data and behavior",
hint:"Objects model real-world entities",
reason:"OOP organizes code using objects."
},
{
type:"structured",
q:"What are the four pillars of OOP?",
a:"Encapsulation, Inheritance, Polymorphism, Abstraction",
hint:"E-I-P-A",
reason:"These define how OOP works."
},
{
type:"structured",
q:"What is a class?",
a:"A blueprint for creating objects",
hint:"Template idea",
reason:"Defines structure and behavior."
},
{
type:"structured",
q:"What is an object?",
a:"An instance of a class",
hint:"Real-world entity",
reason:"Created from a class blueprint."
}
]
);
/*=======================================
Classes & Objects
=======================================*/
add(
  "computer",
  "programming",
  "Classes & Objects",
  `<h2>Classes & Objects</h2>
<p>
In Object-Oriented Programming (OOP), a <b>class</b> is a blueprint (template), while an <b>object</b> is a real instance created from that blueprint.
</p>
<h3> KEY IDEA</h3>
<ul>
<li><b>Class</b>: Defines structure (attributes + methods)</li>
<li><b>Object</b>: A real entity created from a class with actual values</li>
</ul>
<h3> PYTHON EXAMPLE</h3>
<pre>
class Student:
    def __init__(self, name):
        self.name = name

student1 = Student("Alex")

print(student1.name)
</pre>
<h3> COMPONENTS</h3>
<ul>
<li><b>Attributes</b>: Variables inside a class (e.g., name)</li>
<li><b>Methods</b>: Functions inside a class</li>
<li><b>Constructor (__init__)</b>: Initializes object values</li>
</ul>
<h3> REAL-WORLD ANALOGY</h3>
<ul>
<li>Class → Blueprint of a house</li>
<li>Object → Actual house built from blueprint</li>
</ul>
<div class="example-box">
Class = Template<br>
Object = Real instance created from template
</div>
`,
[
{
type:"structured",
q:"What is a class?",
a:"A blueprint used to create objects",
hint:"Template idea",
reason:"Defines structure and behavior."
},
{
type:"structured",
q:"What is an object?",
a:"An instance of a class",
hint:"Real thing",
reason:"Created using a class."
},
{
type:"structured",
q:"What is __init__ used for?",
a:"To initialize object attributes",
hint:"Constructor",
reason:"Sets initial values of objects."
},
{
type:"structured",
q:"Give one real-world example of class and object.",
a:"Class = Car, Object = Toyota Corolla",
hint:"Blueprint vs real item",
reason:"Objects are instances of classes."
}
]
);
/*========================================
Inheritance
========================================*/
add(
  "computer",
  "programming",
  "Inheritance",
  `<h2>Inheritance</h2>
<p>
<b>Inheritance</b> is an Object-Oriented Programming (OOP) concept where a new class (child class) acquires properties and methods from an existing class (parent class).
</p>
<h3> KEY IDEA</h3>
<p>
It represents a <b>parent → child relationship</b> and allows code reuse and extension.
</p>
<h3> PYTHON EXAMPLE</h3>
<pre>
class Animal:
    def speak(self):
        print("Animal sound")

class Dog(Animal):   # Dog inherits from Animal
    def bark(self):
        print("Woof!")

d = Dog()
d.speak()  # inherited method
d.bark()   # own method
</pre>
<h3> TYPES OF INHERITANCE</h3>
<ul>
<li><b>Single Inheritance</b>: One parent → one child</li>
<li><b>Multiple Inheritance</b>: One child → multiple parents</li>
<li><b>Multilevel Inheritance</b>: Grandparent → Parent → Child</li>
<li><b>Hierarchical Inheritance</b>: One parent → multiple children</li>
</ul>
<h3> BENEFITS OF INHERITANCE</h3>
<ul>
<li>Code reusability</li>
<li>Reduces repetition</li>
<li>Improves maintainability</li>
<li>Supports hierarchical classification</li>
</ul>
<h3> REAL-WORLD ANALOGY</h3>
<ul>
<li>Animal → Dog, Cat, Bird</li>
<li>Vehicle → Car, Bus, Truck</li>
</ul>
<div class="keyfact">
 Inheritance = Parent class shares features with child classes
</div>
`,
[
{
type:"structured",
q:"What is inheritance?",
a:"A mechanism where a class acquires properties from another class",
hint:"Parent-child relationship",
reason:"Enables code reuse in OOP."
},
{
type:"structured",
q:"What is a child class?",
a:"A class that inherits from another class",
hint:"Derived class",
reason:"It receives properties from parent class."
},
{
type:"structured",
q:"Give one benefit of inheritance.",
a:"Code reuse",
hint:"Avoid repetition",
reason:"Same code does not need to be rewritten."
},
{
type:"structured",
q:"Name one type of inheritance.",
a:"Single inheritance",
hint:"One parent one child",
reason:"Basic inheritance structure."
}
]
);
/*======================================
Encapsulation
======================================*/
add(
  "computer",
  "programming",
  "Encapsulation",
  `<h2>Encapsulation</h2>
<p>
<b>Encapsulation</b> is an Object-Oriented Programming (OOP) concept that involves 
<b>bundling data (variables) and methods (functions)</b> together and restricting direct access to the data.
</p>
<h3> KEY IDEA</h3>
<p>
Data is hidden from outside access and can only be modified through controlled methods.
</p>
<h3> PYTHON EXAMPLE</h3>
<pre>
class Bank:
    def __init__(self):
        self.__balance = 0   # Private variable

    def deposit(self, amount):
        self.__balance += amount

    def get_balance(self):
        return self.__balance
</pre>
<h3> ACCESS MODIFIERS (IMPORTANT)</h3>
<ul>
<li><b>Public</b>: Accessible anywhere</li>
<li><b>Protected (_var)</b>: Should not be accessed directly</li>
<li><b>Private (__var)</b>: Strongly restricted access</li>
</ul>
<h3> WHY ENCAPSULATION?</h3>
<ul>
<li>Protects data from unauthorized access</li>
<li>Prevents accidental modification</li>
<li>Improves code security and reliability</li>
<li>Controls how data is used</li>
</ul>
<h3> REAL-WORLD ANALOGY</h3>
<ul>
<li>ATM Machine → You cannot access money directly</li>
<li>You use methods (deposit/withdraw) instead</li>
</ul>
<div class="example-box">
Encapsulation = Data hiding + Controlled access
</div>
`,
[
{
type:"structured",
q:"What is encapsulation?",
a:"Hiding data and controlling access using methods",
hint:"Data protection",
reason:"Prevents direct access to internal data."
},
{
type:"structured",
q:"What does __ (double underscore) indicate in Python?",
a:"Private variable",
hint:"Access restriction",
reason:"Used to hide data from outside access."
},
{
type:"structured",
q:"Give one benefit of encapsulation.",
a:"Protects data",
hint:"Think security",
reason:"Prevents unauthorized changes."
},
{
type:"structured",
q:"Give a real-life example of encapsulation.",
a:"ATM machine",
hint:"Controlled access",
reason:"Users interact through methods, not internal data."
}
]
);
/*==========================================
Recursion
==========================================*/
add(
  "computer",
  "programming",
  "Recursion",
  `<h2>Recursion</h2>
<p>
<b>Recursion</b> is a programming technique where a function calls itself to solve a problem by breaking it into smaller sub-problems.
</p>
<h3> KEY COMPONENTS</h3>
<ul>
<li><b>Base Case</b>: The stopping condition that ends recursion</li>
<li><b>Recursive Case</b>: The part where the function calls itself</li>
</ul>
<h3> HOW IT WORKS</h3>
<pre>
factorial(3)
= 3 × factorial(2)
= 3 × 2 × factorial(1)
= 3 × 2 × 1
= 6
</pre>
<h3> PYTHON EXAMPLE (FACTORIAL)</h3>
<pre>
def factorial(n):
    if n == 1:   # Base case
        return 1
    return n * factorial(n-1)  # Recursive call
</pre>
<h3> IMPORTANT RULES</h3>
<ul>
<li>Must have a base case (to avoid infinite recursion)</li>
<li>Each call should move toward the base case</li>
<li>Uses stack memory (call stack)</li>
</ul>

---

<h3> RECURSION VS ITERATION</h3>
<pre>
Recursion        | Iteration
-----------------------------
Function calls   | Loops (for/while)
Uses call stack  | Uses variables
Cleaner logic    | More memory efficient
</pre>

---

<h3> REAL-WORLD APPLICATION</h3>
<ul>
<li>Factorial and Fibonacci calculations</li>
<li>Tree and graph traversal</li>
<li>File system navigation</li>
<li>Divide-and-conquer algorithms</li>
</ul>

---

<div class="example-box">
Recursion = Function solving smaller versions of itself
</div>
`,
[
{
type:"structured",
q:"What is recursion?",
a:"A function calling itself to solve a problem",
hint:"Self-calling function",
reason:"Breaks problems into smaller parts."
},
{
type:"structured",
q:"What is a base case?",
a:"The condition that stops recursion",
hint:"Stopping point",
reason:"Prevents infinite loops."
},
{
type:"structured",
q:"What happens if there is no base case?",
a:"Infinite recursion",
hint:"No stopping",
reason:"The function keeps calling itself endlessly."
},
{
type:"structured",
q:"Which memory structure is used in recursion?",
a:"Stack",
hint:"Think function calls",
reason:"Each call is stored in the call stack."
}
]
);
/*==================================================
Stacks
===================================================*/
add(
  "computer",
  "programming",
  "Stacks",
  `<h2>Stacks</h2>



<p>
A <b>stack</b> is a linear data structure that follows the <b>LIFO (Last In, First Out)</b> principle.
The last element added is the first one to be removed.
</p>

---

<h3> KEY OPERATIONS</h3>
<ul>
<li><b>Push</b>: Add element to the top</li>
<li><b>Pop</b>: Remove the top element</li>
<li><b>Peek/Top</b>: View the top element without removing it</li>
<li><b>isEmpty</b>: Check if stack has no elements</li>
</ul>

---

<h3> VISUAL FLOW</h3>
<pre>
Push → [1, 2, 3] → Pop → [1, 2]
            ↑
          Top
</pre>

---

<h3> TYPES OF STACKS</h3>
<ul>
<li><b>Simple Stack</b>: Basic LIFO structure</li>
<li><b>Dynamic Stack</b>: Grows/shrinks in size (using lists/linked lists)</li>
<li><b>Call Stack</b>: Used in function calls (program execution)</li>
</ul>

---

<h3> PYTHON EXAMPLE</h3>
<pre>
stack = []

# Push
stack.append(1)
stack.append(2)

# Pop
stack.pop()

# Peek
print(stack[-1])
</pre>

---

<h3> REAL-WORLD APPLICATION</h3>
<ul>
<li>Undo/Redo operations in apps</li>
<li>Function calls (call stack)</li>
<li>Expression evaluation (e.g., calculators)</li>
<li>Browser history navigation</li>
</ul>

---

<div class="example-box">
Stack = Pile of plates <br>
Last plate added → first removed
</div>
`,
[
{
type:"structured",
q:"What does LIFO stand for?",
a:"Last In First Out",
hint:"Stack order",
reason:"Last element added is removed first."
},
{
type:"structured",
q:"What is push?",
a:"Adding an element to the stack",
hint:"Think insert",
reason:"Elements are added at the top."
},
{
type:"structured",
q:"What is pop?",
a:"Removing the top element",
hint:"Think remove",
reason:"Only the top element can be removed."
},
{
type:"structured",
q:"Give one real-life example of a stack.",
a:"Pile of plates",
hint:"Think stacking",
reason:"Last plate placed is removed first."
}
]
);
/*==================================================
 Queues
 ==================================================*/
add(
  "computer",
  "programming",
  "Queues",
  `<h2>Queues</h2>



<p>
A <b>queue</b> is a linear data structure that follows the <b>FIFO (First In, First Out)</b> principle.
The first element added is the first one to be removed.
</p>

---

<h3> KEY OPERATIONS</h3>
<ul>
<li><b>Enqueue</b>: Add element to the rear (end)</li>
<li><b>Dequeue</b>: Remove element from the front</li>
<li><b>Peek/Front</b>: View the first element without removing it</li>
<li><b>isEmpty</b>: Check if queue has no elements</li>
</ul>

---

<h3> VISUAL FLOW</h3>
<pre>
Enqueue → [1, 2, 3] → Dequeue → [2, 3]
</pre>

---

<h3> TYPES OF QUEUES</h3>
<ul>
<li><b>Simple Queue</b>: Basic FIFO structure</li>
<li><b>Circular Queue</b>: End connects to front to reuse space</li>
<li><b>Priority Queue</b>: Elements processed based on priority</li>
<li><b>Deque (Double-ended Queue)</b>: Insert/remove from both ends</li>
</ul>

---

<h3> PYTHON EXAMPLE</h3>
<pre>
from collections import deque

queue = deque()

# Enqueue
queue.append(1)
queue.append(2)

# Dequeue
queue.popleft()

# Peek
print(queue[0])
</pre>

---

<h3> REAL-WORLD APPLICATION</h3>
<ul>
<li>Printer queue (documents printed in order)</li>
<li>CPU task scheduling</li>
<li>Call center systems</li>
<li>Data buffering in streaming</li>
</ul>

---

<div class="example-box">
Queue = Line at a shop <br>
First person in line → first served
</div>
`,
[
{
type:"structured",
q:"What does FIFO stand for?",
a:"First In First Out",
hint:"Queue order",
reason:"First element added is the first removed."
},
{
type:"structured",
q:"What is enqueue?",
a:"Adding an element to the queue",
hint:"Think insert",
reason:"Elements are added at the rear."
},
{
type:"structured",
q:"What is dequeue?",
a:"Removing an element from the queue",
hint:"Think remove",
reason:"Elements are removed from the front."
},
{
type:"structured",
q:"Give one real-life example of a queue.",
a:"Line at a shop",
hint:"Think waiting line",
reason:"People are served in order of arrival."
}
]
);
/*========================================================
SOFTWARE ENGINEERING
========================================================*/
add(
  "computer",
  "software_engineering",
  "Software Development Methodologies",
  `<h2>Software Development Methodologies</h2>



<h3> DEEP EXPLANATION</h3>
<p>
Software development methodologies are structured approaches used to plan, design, develop, test, and maintain software systems.
They guide how teams organize work, manage time, and deliver reliable software.
</p>

---

<h3> 1. WATERFALL MODEL</h3>
<ul>
<li>Linear and sequential approach</li>
<li>Each phase must be completed before moving to the next</li>
<li>Clear structure and documentation</li>
</ul>

<h4> FLOW</h4>
<pre>
Requirements → Design → Implementation → Testing → Deployment → Maintenance
</pre>

<h4> ADVANTAGES</h4>
<ul>
<li>Easy to understand and manage</li>
<li>Clear stages and documentation</li>
</ul>

<h4> LIMITATIONS</h4>
<ul>
<li>Not flexible to changes</li>
<li>Errors discovered late</li>
</ul>

---

<h3> 2. AGILE MODEL</h3>
<ul>
<li>Iterative and flexible approach</li>
<li>Work divided into small cycles called <b>sprints</b></li>
<li>Continuous feedback and improvement</li>
</ul>

<h4> FLOW</h4>
<pre>
Plan → Develop → Test → Review → Improve (repeat)
</pre>

<h4> ADVANTAGES</h4>
<ul>
<li>Highly flexible</li>
<li>Early detection of issues</li>
<li>Customer involvement</li>
</ul>

<h4> LIMITATIONS</h4>
<ul>
<li>Less predictable timeline</li>
<li>Requires strong teamwork</li>
</ul>

---

<h3> 3. SPIRAL MODEL</h3>
<ul>
<li>Combines iterative development with risk analysis</li>
<li>Focuses on identifying and reducing risks early</li>
<li>Development occurs in repeated cycles (spirals)</li>
</ul>

<h4> FLOW</h4>
<pre>
Plan → Risk Analysis → Develop → Test → Repeat
</pre>

<h4> ADVANTAGES</h4>
<ul>
<li>Good for large, complex projects</li>
<li>Early risk detection</li>
</ul>

<h4> LIMITATIONS</h4>
<ul>
<li>Complex and expensive</li>
<li>Requires expertise</li>
</ul>

---

<h3> COMPARISON</h3>
<pre>
Waterfall        | Agile           | Spiral
----------------------------------------------
Linear           | Iterative       | Iterative + Risk
Rigid            | Flexible        | Flexible
Late testing     | Continuous      | Continuous
Low risk focus   | Moderate        | High risk focus
</pre>

---

<h3> REAL-WORLD USE CASES</h3>
<ul>
<li>Waterfall → Government systems (fixed requirements)</li>
<li>Agile → Mobile apps, startups</li>
<li>Spiral → Large banking or safety-critical systems</li>
</ul>

---

<div class="example-box">
Waterfall = Step-by-step <br>
Agile = Flexible cycles <br>
Spiral = Risk-focused cycles
</div>

<div class="keyfact">
 Agile is most used today because it adapts easily to changing requirements.
</div>

---

<h3> EXAM FOCUS</h3>
<ul>
<li>Differences between Agile, Waterfall, and Spiral</li>
<li>Advantages and disadvantages of each</li>
<li>When to use each model</li>
</ul>
`,
[
  {
    type:"structured",
    q:"Which model is most flexible?",
    a:"Agile",
    hint:"Adaptability",
    reason:"It allows continuous changes and feedback."
  },
  {
    type:"structured",
    q:"What is a key disadvantage of Waterfall?",
    a:"Difficult to return to previous stages",
    hint:"Rigid",
    reason:"It follows a strict sequential flow."
  },
  {
    type:"structured",
    q:"Which model focuses on risk analysis?",
    a:"Spiral model",
    hint:"Risk",
    reason:"It identifies and reduces risks early."
  },
  {
    type:"structured",
    q:"What is a sprint in Agile?",
    a:"A short development cycle",
    hint:"Iteration",
    reason:"Work is done in small repeated cycles."
  }
]
);
/*==================================================
Version Control Systems (Git & GitHub)
==================================================*/
add(
  "computer",
  "software_engineering",
  "Version Control Systems",
  `<h2>Version Control Systems (Git & GitHub)</h2>



<h3> DEEP EXPLANATION</h3>
<p>
Version control is a system that tracks and manages changes to files (especially source code) over time.
It allows developers to collaborate, maintain history, and revert to previous versions when errors occur.
</p>

<p>
Without version control, managing large projects and teamwork becomes difficult and error-prone.
</p>

---

<h3> TYPES OF VERSION CONTROL</h3>
<ul>
<li><b>Local VCS:</b> Tracks changes on a single computer</li>
<li><b>Centralized VCS:</b> Uses a central server (e.g., SVN)</li>
<li><b>Distributed VCS:</b> Every user has a full copy (e.g., Git)</li>
</ul>

---

<h3> GIT</h3>
<ul>
<li>Distributed version control system</li>
<li>Tracks file changes locally</li>
<li>Supports branching and merging</li>
<li>Works offline and online</li>
</ul>

<h4> BASIC GIT FLOW</h4>
<pre>
Write Code → Stage (git add) → Commit (git commit) → Repository
</pre>

---

<h3> GITHUB</h3>
<ul>
<li>Cloud-based hosting service for Git repositories</li>
<li>Enables collaboration among developers</li>
<li>Stores and shares code online</li>
<li>Supports features like pull requests and issue tracking</li>
</ul>

---

<h3> KEY TERMS</h3>
<ul>
<li><b>Repository (Repo):</b> Project storage containing code and history</li>
<li><b>Commit:</b> Snapshot of changes saved in the repository</li>
<li><b>Branch:</b> Separate line of development</li>
<li><b>Merge:</b> Combining changes from different branches</li>
<li><b>Clone:</b> Copying a repository to a local machine</li>
<li><b>Pull:</b> Fetching updates from remote repository</li>
<li><b>Push:</b> Sending changes to remote repository</li>
</ul>

---

<h3> REAL-WORLD EXAMPLE</h3>
<ul>
<li>Developer A works on login feature (branch A)</li>
<li>Developer B works on dashboard (branch B)</li>
<li>Both changes are merged into main project</li>
</ul>

---

<h3> COMMON EXAM CONFUSION</h3>
<ul>
<li>Git = tool/software</li>
<li>GitHub = platform/service</li>
<li>Commit ≠ Save (it’s a tracked snapshot)</li>
</ul>

---

<div class="example-box">
Git = Tracks changes locally <br>
GitHub = Stores and shares code online
</div>

<div class="keyfact">
 Version control allows safe collaboration without overwriting each other's work.
</div>

---

<h3> EXAM FOCUS</h3>
<ul>
<li>Difference between Git and GitHub</li>
<li>Meaning of key terms (commit, branch, repo)</li>
<li>Basic Git workflow</li>
<li>Advantages of version control</li>
</ul>
`,
[
  {
    type:"structured",
    q:"What is version control?",
    a:"A system that tracks changes in files over time.",
    hint:"Tracking",
    reason:"It records and manages changes in projects."
  },
  {
    type:"structured",
    q:"What is Git?",
    a:"A distributed version control system.",
    hint:"Tool",
    reason:"It manages code changes locally and across systems."
  },
  {
    type:"structured",
    q:"What is GitHub?",
    a:"A platform for hosting Git repositories online.",
    hint:"Cloud",
    reason:"It enables collaboration and remote storage."
  },
  {
    type:"structured",
    q:"What is a commit?",
    a:"A saved snapshot of changes in a repository.",
    hint:"Snapshot",
    reason:"It records the state of the project at a point in time."
  },
  {
    type:"structured",
    q:"What is a branch?",
    a:"A separate line of development.",
    hint:"Parallel work",
    reason:"It allows working on features independently."
  }
]
);
/*==================================================
Software Testing Types
==================================================*/
add(
  "computer",
  "software_engineering",
  "Software Testing Types",
  `<h2>Software Testing Types</h2>

  


<h3> DEEP EXPLANATION</h3>
<p>
Software testing is the process of evaluating a software system to ensure it works correctly, meets requirements, and is free from defects (bugs).
</p>

<p>
Testing is done in stages, starting from small components to the entire system, ensuring reliability at every level.
</p>

---

<h3> TYPES OF TESTING</h3>

<ul>
<li><b>1. Unit Testing</b></li>
<ul>
<li>Tests individual components or functions</li>
<li>Performed by developers</li>
<li>Focus: smallest parts of the system</li>
</ul>

<li><b>2. Integration Testing</b></li>
<ul>
<li>Tests interaction between combined components</li>
<li>Checks data flow between modules</li>
</ul>

<li><b>3. System Testing</b></li>
<ul>
<li>Tests the complete and integrated system</li>
<li>Ensures system meets specified requirements</li>
</ul>

<li><b>4. User Acceptance Testing (UAT)</b></li>
<ul>
<li>Performed by end users or clients</li>
<li>Verifies system meets real-world needs</li>
<li>Final approval before release</li>
</ul>
</ul>

---

<h3> TESTING FLOW</h3>
<pre>
Unit → Integration → System → UAT
</pre>

---

<h3> REAL-WORLD EXAMPLE</h3>
<ul>
<li>Check login function → Unit testing</li>
<li>Login + database connection → Integration testing</li>
<li>Full application test → System testing</li>
<li>User tries app → UAT</li>
</ul>

---

<h3> COMMON EXAM TRAPS</h3>
<ul>
<li>Unit = smallest part (NOT full system)</li>
<li>UAT = done by users (NOT developers)</li>
<li>Integration = connection between modules</li>
</ul>

---

<div class="example-box">
Unit = Individual parts <br>
Integration = Parts working together <br>
System = Whole system <br>
UAT = User approval
</div>

<div class="keyfact">
 Bugs found early (unit stage) are cheaper to fix than bugs found later (system/UAT).
</div>

---

<h3> EXAM FOCUS</h3>
<ul>
<li>Order of testing stages</li>
<li>Purpose of each testing type</li>
<li>Who performs each test</li>
<li>Differences between stages</li>
</ul>
`,
[
  {
    type:"structured",
    q:"Which testing is done by developers on small components?",
    a:"Unit testing",
    hint:"Smallest level",
    reason:"It focuses on individual functions or modules."
  },
  {
    type:"structured",
    q:"What is integration testing?",
    a:"Testing how different components work together.",
    hint:"Connection",
    reason:"It ensures modules interact correctly."
  },
  {
    type:"structured",
    q:"What is system testing?",
    a:"Testing the complete system as a whole.",
    hint:"Entire system",
    reason:"It verifies overall functionality."
  },
  {
    type:"structured",
    q:"What is the final stage of testing?",
    a:"User Acceptance Testing (UAT)",
    hint:"User involvement",
    reason:"End users confirm the system meets requirements."
  },
  {
    type:"structured",
    q:"Who performs UAT?",
    a:"End users or clients",
    hint:"Not developers",
    reason:"They validate real-world usability."
  }
]
);
/*=================================================
Documentation and Software Maintenance
=================================================*/
add(
  "computer",
  "software_engineering",
  "Documentation and Maintenance",
  `<h2>Documentation and Software Maintenance</h2>

  <h3>

<h3> DEEP EXPLANATION</h3>
<p>
Documentation and maintenance are critical phases of the software development lifecycle (SDLC) that occur after or alongside development.
They ensure that software remains understandable, usable, scalable, and functional over time.
</p>

<p>
Without proper documentation and maintenance, software becomes difficult to update, fix, or use effectively.
</p>

---

<h3> DOCUMENTATION</h3>
<p>
Documentation is the written or visual description of how a software system works and how it should be used or maintained.
</p>

<h4> TYPES OF DOCUMENTATION</h4>
<ul>
<li><b>User Documentation:</b> Guides end-users on how to operate the software (manuals, help guides)</li>
<li><b>Technical Documentation:</b> Describes system design, code structure, and architecture for developers</li>
<li><b>System Documentation:</b> Overall system overview including hardware, software, and processes</li>
</ul>

<h4> IMPORTANCE</h4>
<ul>
<li>Helps users understand how to use the system</li>
<li>Assists developers in maintaining and upgrading software</li>
<li>Improves collaboration in development teams</li>
</ul>

---

<h3> SOFTWARE MAINTENANCE</h3>
<p>
Software maintenance is the process of modifying and updating software after it has been deployed to fix issues, improve performance, or adapt to new requirements.
</p>

<h4> TYPES OF MAINTENANCE</h4>
<ul>
<li><b>Corrective Maintenance:</b> Fixing errors and bugs discovered after release</li>
<li><b>Adaptive Maintenance:</b> Updating software to work in new environments (e.g., OS updates)</li>
<li><b>Perfective Maintenance:</b> Enhancing features and improving performance</li>
<li><b>Preventive Maintenance:</b> Making changes to prevent future problems</li>
</ul>

---

<h3> REAL-WORLD EXAMPLES</h3>
<ul>
<li>Fixing a crash bug → Corrective</li>
<li>Updating app for new Android version → Adaptive</li>
<li>Improving app speed → Perfective</li>
<li>Refactoring code to avoid future bugs → Preventive</li>
</ul>

---

<div class="example-box">
Documentation = Understanding the system <br>
Maintenance = Improving and fixing the system
</div>

<div class="keyfact">
 Most software cost occurs after release due to maintenance, not development.
</div>

---

<h3> EXAM FOCUS</h3>
<ul>
<li>Types of documentation</li>
<li>Four types of maintenance</li>
<li>Differences between maintenance categories</li>
<li>Importance of documentation</li>
</ul>
`,
[
  {
    type:"structured",
    q:"What is software documentation?",
    a:"Written information that explains how software works and how to use it.",
    hint:"Think explanation",
    reason:"It helps users and developers understand the system."
  },
  {
    type:"structured",
    q:"What is user documentation?",
    a:"Instructions that guide users on how to use the software.",
    hint:"End user guide",
    reason:"It focuses on helping users operate the system."
  },
  {
    type:"structured",
    q:"What is corrective maintenance?",
    a:"Fixing software bugs and errors.",
    hint:"Errors",
    reason:"It corrects faults after release."
  },
  {
    type:"structured",
    q:"What is adaptive maintenance?",
    a:"Updating software to work in new environments.",
    hint:"Environment change",
    reason:"It ensures compatibility with new systems."
  },
  {
    type:"structured",
    q:"What is perfective maintenance?",
    a:"Improving performance and adding enhancements.",
    hint:"Improve",
    reason:"It enhances system efficiency and features."
  },
  {
    type:"structured",
    q:"What is preventive maintenance?",
    a:"Making changes to prevent future issues.",
    hint:"Avoid problems",
    reason:"It reduces the risk of future failures."
  }
]
);
/*========================================================
CYBERSECURITY
========================================================*/
add(
  "computer",
  "cybersecurity",
  "Malware and Its Types",
  `<h2>Malware (Malicious Software)</h2>

<h3> DEEP EXPLANATION</h3>
<p>
Malware refers to any software intentionally designed to harm, exploit, or disrupt computer systems, networks, or data.
It can steal information, damage files, spy on users, or take control of systems without permission.
</p>

<p>
Malware spreads through infected files, email attachments, downloads, or network vulnerabilities.
</p>

---

<h3> TYPES OF MALWARE</h3>
<ul>
<li><b>Virus</b>: Attaches to files and spreads when the file is executed</li>
<li><b>Worm</b>: Self-replicates and spreads automatically across networks</li>
<li><b>Trojan Horse</b>: Disguised as legitimate software to trick users</li>
<li><b>Ransomware</b>: Locks or encrypts data and demands payment</li>
<li><b>Spyware</b>: Secretly monitors user activity and collects data</li>
<li><b>Adware</b>: Displays unwanted advertisements</li>
</ul>

---

<h3> REAL EXAMPLES</h3>
<ul>
<li>Opening an infected email attachment → Virus spreads</li>
<li>Network vulnerability exploited → Worm spreads automatically</li>
<li>Fake game download → Trojan installs malware</li>
<li>Files encrypted → Ransomware demands payment</li>
<li>Background tracking → Spyware steals information</li>
</ul>

---

<h3> EFFECTS OF MALWARE</h3>
<ul>
<li>Data loss or corruption</li>
<li>Unauthorized access to systems</li>
<li>Slower computer performance</li>
<li>Financial loss (ransomware, fraud)</li>
<li>Privacy breaches</li>
</ul>

---

<h3> PREVENTION METHODS</h3>
<ul>
<li>Install and update antivirus software</li>
<li>Avoid suspicious downloads and links</li>
<li>Keep operating systems updated</li>
<li>Use firewalls</li>
<li>Scan external devices (USBs)</li>
</ul>

---

<div class="example-box">
Virus = Needs user action <br>
Worm = Spreads automatically <br>
Trojan = Disguised as safe software <br>
Ransomware = Locks data for money
</div>

<div class="keyfact">
 Malware spreads mainly through user mistakes and unsecured systems.
</div>
`,
[
  {
    type:"structured",
    q:"What is malware?",
    a:"Software designed to harm or exploit computer systems.",
    hint:"Think harmful software",
    reason:"It damages or gains unauthorized access to systems."
  },
  {
    type:"structured",
    q:"What is a virus?",
    a:"A malicious program that attaches to files and spreads when executed.",
    hint:"Needs user action",
    reason:"It requires execution of infected files."
  },
  {
    type:"structured",
    q:"Which malware spreads without user action?",
    a:"Worm",
    hint:"Automatic spreading",
    reason:"It replicates itself across networks."
  },
  {
    type:"structured",
    q:"What is a Trojan horse?",
    a:"Malware disguised as legitimate software.",
    hint:"Looks safe",
    reason:"It tricks users into installing it."
  },
  {
    type:"structured",
    q:"What does ransomware do?",
    a:"Locks or encrypts data and demands payment.",
    hint:"Money demand",
    reason:"It restricts access until ransom is paid."
  },
  {
    type:"structured",
    q:"Give one way to prevent malware.",
    a:"Install antivirus software.",
    hint:"Protection",
    reason:"Antivirus detects and removes threats."
  }
]
);
/*==================================================
Phishing and Social Engineering
==================================================*/
add(
  "computer",
  "cybersecurity",
  "Phishing and Social Engineering",
  `<h2>Phishing and Social Engineering</h2>

<h3> DEEP EXPLANATION</h3>
<p>
Phishing and social engineering are cyberattack techniques that exploit human psychology rather than technical weaknesses.
Instead of hacking systems directly, attackers trick users into revealing sensitive information such as passwords, bank details, or personal data.
</p>

<p>
These attacks rely on trust, urgency, fear, or curiosity to manipulate victims.
</p>

---

<h3> TYPES OF ATTACKS</h3>
<ul>
<li><b>Phishing:</b> Fake emails/websites pretending to be legitimate sources</li>
<li><b>Spear Phishing:</b> Targeted phishing aimed at specific individuals</li>
<li><b>Smishing:</b> Phishing via SMS messages</li>
<li><b>Vishing:</b> Voice calls pretending to be trusted organizations</li>
<li><b>Social Engineering:</b> Psychological manipulation to gain access or data</li>
</ul>

---

<h3> REAL EXAMPLES</h3>
<ul>
<li>Email pretending to be a bank asking for login details</li>
<li>Fake website that looks identical to a real login page</li>
<li>Urgent message: "Your account will be locked—click here!"</li>
<li>Phone call pretending to be IT support requesting passwords</li>
</ul>

---

<h3> WARNING SIGNS</h3>
<ul>
<li>Urgent or threatening language</li>
<li>Suspicious links or email addresses</li>
<li>Requests for sensitive information</li>
<li>Poor grammar or unusual formatting</li>
</ul>

---

<h3> PREVENTION METHODS</h3>
<ul>
<li>Verify sender identity before responding</li>
<li>Do not click suspicious links</li>
<li>Use multi-factor authentication (MFA)</li>
<li>Check website URLs carefully</li>
<li>Never share passwords or confidential data</li>
</ul>

---

<div class="example-box">
Phishing = Fake message tricking you <br>
Social Engineering = Manipulating your thinking
</div>

<div class="keyfact">
 Most cyberattacks succeed because of human error, not system weakness.
</div>
`,
[
  {
    type:"structured",
    q:"What is phishing?",
    a:"A method of tricking users into giving personal information using fake messages.",
    hint:"Fake emails/websites",
    reason:"It relies on deception rather than hacking systems."
  },
  {
    type:"structured",
    q:"What is social engineering?",
    a:"Manipulating people to reveal confidential information.",
    hint:"Psychological trick",
    reason:"Targets human behavior instead of technology."
  },
  {
    type:"structured",
    q:"Name one type of phishing.",
    a:"Spear phishing",
    hint:"Targeted attack",
    reason:"It focuses on specific individuals."
  },
  {
    type:"structured",
    q:"Give one warning sign of phishing.",
    a:"Urgent or threatening message.",
    hint:"Pressure",
    reason:"Attackers create panic to force quick decisions."
  },
  {
    type:"structured",
    q:"How can phishing be prevented?",
    a:"Verify sources before clicking links.",
    hint:"Check authenticity",
    reason:"Verification reduces risk of deception."
  }
]
);
/*==================================================
Password Security
==================================================*/
add(
  "computer",
  "cybersecurity",
  "Password Security Practices",
  `<h2>Password Security</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    Passwords are the first line of defense for protecting digital accounts. Weak passwords can be easily guessed,
    cracked, or stolen using automated hacking tools, while strong passwords significantly reduce security risks.
  </p>
  <h3> BEST PRACTICES</h3>
  <ul>
    <li>Use a mix of uppercase, lowercase, numbers, and symbols</li>
    <li>Use long passwords (at least 8–12 characters or more)</li>
    <li>Avoid personal details like names or birthdates</li>
    <li>Do not reuse passwords across different accounts</li>
    <li>Enable Two-Factor Authentication (2FA)</li>
    <li>Change passwords regularly</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li><b>Weak:</b> 123456</li>
    <li><b>Weak:</b> password</li>
    <li><b>Strong:</b> K9!mZ@82xP</li>
    <li><b>Strong:</b> Tr7#bQ91@Lm</li>
  </ul>

  <h3> COMMON PASSWORD ATTACKS</h3>
  <ul>
    <li>Brute force attacks (trying many combinations)</li>
    <li>Phishing (tricking users into revealing passwords)</li>
    <li>Dictionary attacks (using common words)</li>
  </ul>

  <h3> WHAT IS 2FA?</h3>
  <p>
    Two-Factor Authentication (2FA) adds an extra layer of security by requiring a second verification step
    such as an SMS code, email code, or authentication app.
  </p>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    Banks, email providers, and social media platforms require strong passwords and sometimes 2FA to protect user accounts
    and prevent unauthorized access.
  </p>

  <h3> ADVANTAGES</h3>
  <ul>
    <li>Protects personal data</li>
    <li>Reduces risk of hacking</li>
    <li>Improves account security</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>Characteristics of strong passwords</li>
    <li>Meaning of 2FA</li>
    <li>Examples of weak vs strong passwords</li>
  </ul>

  <div class="example-box">
    Strong Password = Hard to guess combination of letters, numbers, and symbols <br>
    2FA = Extra security step beyond password
  </div>
  `,

  [
    {
      q: "What makes a password strong?",
      hint: "Think complexity",
      answer: "A combination of letters, numbers, and symbols",
      explanation: "Complex passwords are harder to guess or crack."
    },
    {
      q: "What is 2FA?",
      hint: "Think extra step",
      answer: "Two-Factor Authentication",
      explanation: "It adds an extra layer of security beyond passwords."
    },
    {
      q: "Why should passwords not be reused?",
      hint: "Think risk",
      answer: "If one account is hacked, others become vulnerable",
      explanation: "Reuse increases risk across multiple accounts."
    },
    {
      q: "Give one example of a weak password.",
      hint: "Think simple",
      answer: "123456 or password",
      explanation: "These are easy to guess."
    },
    {
      q: "Give one example of a strong password.",
      hint: "Think complex",
      answer: "K9!mZ@82xP",
      explanation: "It contains mixed characters making it hard to crack."
    },
    {
      q: "Name one method used in password attacks.",
      hint: "Think hacking method",
      answer: "Brute force attack",
      explanation: "Hackers try many combinations to guess passwords."
    }
  ]
);
/*===================================================
Data Privacy and Backup
===================================================*/
add(
  "computer",
  "cybersecurity",
  "Data Privacy and Backup Strategies",
  `<h2>Data Privacy and Backup</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    Data privacy refers to the protection of personal and sensitive information from unauthorized access, misuse, or exposure.
    Backup strategies involve creating copies of data so it can be restored in case of loss, corruption, or cyberattacks.
  </p>
  <h3> 3-2-1 BACKUP RULE</h3>
  <ul>
    <li><b>3 copies of data</b> (original + 2 backups)</li>
    <li><b>2 different storage types</b> (e.g., hard drive + cloud)</li>
    <li><b>1 off-site backup</b> (stored in a different location)</li>
  </ul>

  <h3> BACKUP METHODS</h3>
  <ul>
    <li>Cloud storage (Google Drive, OneDrive)</li>
    <li>External hard drives</li>
    <li>USB flash drives</li>
    <li>Network backups in organizations</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li>Saving school work on laptop + Google Drive + USB</li>
    <li>Companies backing up databases to cloud servers</li>
    <li>Photographers storing images on multiple drives</li>
  </ul>

  <h3> DATA PRIVACY MEASURES</h3>
  <ul>
    <li>Using strong passwords</li>
    <li>Encryption of sensitive data</li>
    <li>Two-factor authentication (2FA)</li>
    <li>Access control permissions</li>
  </ul>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    Organizations use backup systems and privacy controls to protect customer data, prevent data breaches, and ensure business continuity after system failures or cyberattacks.
  </p>

  <h3> ADVANTAGES</h3>
  <ul>
    <li>Prevents data loss</li>
    <li>Protects sensitive information</li>
    <li>Ensures recovery after attacks or failures</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>3-2-1 backup rule</li>
    <li>Importance of data privacy</li>
    <li>Examples of backup methods</li>
  </ul>

  <div class="example-box">
    Backup = Copy of data for recovery <br>
    Privacy = Protection of sensitive data
  </div>
  `,

  [
    {
      q: "What is data privacy?",
      hint: "Think protection",
      answer: "Protection of personal and sensitive information",
      explanation: "It prevents unauthorized access or misuse of data."
    },
    {
      q: "State the 3-2-1 backup rule.",
      hint: "Think structure",
      answer: "3 copies, 2 storage types, 1 off-site backup",
      explanation: "It ensures data safety and recoverability."
    },
    {
      q: "Give one example of backup method.",
      hint: "Think storage",
      answer: "Cloud storage or external hard drive",
      explanation: "These are used to store copies of data."
    },
    {
      q: "Why is backup important?",
      hint: "Think recovery",
      answer: "To recover lost or damaged data",
      explanation: "It protects against data loss and system failure."
    },
    {
      q: "Give one method of protecting data privacy.",
      hint: "Think security",
      answer: "Using strong passwords",
      explanation: "Passwords prevent unauthorized access."
    },
    {
      q: "What is an off-site backup?",
      hint: "Think location",
      answer: "A backup stored in a different physical location",
      explanation: "It protects data from local disasters."
    }
  ]
);
/*========================================================
INTERNET & WEB TECHNOLOGY
========================================================*/
add(
  "computer",
  "internet_web",
  "Internet vs World Wide Web",
  `<h2>Internet vs World Wide Web (WWW)</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    The Internet and the World Wide Web are closely related but not the same. The Internet is the global
    system of interconnected computers and networks, while the World Wide Web (WWW) is a service that runs
    on top of the Internet and provides access to web pages and websites.
  </p>
  <h3> DIFFERENCE</h3>
  <ul>
    <li><b>Internet:</b> Global network infrastructure (hardware + connections)</li>
    <li><b>WWW:</b> Collection of web pages accessed through browsers</li>
    <li><b>Internet:</b> Includes email, FTP, VoIP, websites</li>
    <li><b>WWW:</b> Only web-based content (web pages)</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li><b>Internet:</b> Sending emails, video calls, file sharing</li>
    <li><b>WWW:</b> Visiting websites like Google, Wikipedia, YouTube</li>
  </ul>

  <h3> RELATIONSHIP</h3>
  <p>
    The WWW is a service that operates on the Internet. Without the Internet, the Web cannot function.
  </p>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    When you use a browser to open websites, you are using the WWW, but the data is transmitted through the Internet infrastructure.
  </p>

  <h3> ADVANTAGES</h3>
  <ul>
    <li>Internet enables global communication</li>
    <li>WWW provides easy access to information</li>
    <li>Together they support education, business, and entertainment</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>Difference between Internet and WWW</li>
    <li>Definition of each</li>
    <li>Examples of Internet services vs Web services</li>
  </ul>

  <div class="example-box">
    Internet = Network infrastructure <br>
    WWW = Websites and web pages
  </div>
  `,

  [
    {
      q: "What is the Internet?",
      hint: "Think global network",
      answer: "A global system of interconnected computers and networks",
      explanation: "It connects devices worldwide for communication and data transfer."
    },
    {
      q: "What is the World Wide Web?",
      hint: "Think websites",
      answer: "A system of interlinked web pages accessed via the Internet",
      explanation: "It is a service that runs on the Internet."
    },
    {
      q: "State one difference between Internet and WWW.",
      hint: "Think structure vs service",
      answer: "Internet is infrastructure, WWW is a service",
      explanation: "The Web depends on the Internet to function."
    },
    {
      q: "Give one example of Internet use.",
      hint: "Think communication",
      answer: "Sending emails or video calls",
      explanation: "These use the Internet but not necessarily the Web."
    },
    {
      q: "Give one example of WWW use.",
      hint: "Think browsing",
      answer: "Visiting websites like Google or Wikipedia",
      explanation: "Websites are part of the World Wide Web."
    },
    {
      q: "Can the WWW work without the Internet?",
      hint: "Think dependency",
      answer: "No",
      explanation: "The Web depends on the Internet to transmit data."
    }
  ]
);
/*==============================================
Web Browsers and Search Engines
==============================================*/
add(
  "computer",
  "internet_web",
  "Web Browsers and Search Engines",
  `<h2>Web Browsers and Search Engines</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    A web browser is a software application used to access, retrieve, and display web pages on the Internet.
    A search engine is an online system that helps users find information by searching indexed web pages.
  </p>
  <h3> DIFFERENCE</h3>
  <ul>
    <li><b>Web Browser:</b> Used to display web pages (e.g., Google Chrome, Mozilla Firefox, Microsoft Edge)</li>
    <li><b>Search Engine:</b> Used to search for information (e.g., Google, Bing, Yahoo)</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li>Using Google Chrome to open YouTube</li>
    <li>Using Google Search to find “photosynthesis notes”</li>
    <li>Using Firefox to browse Wikipedia</li>
  </ul>

  <h3> HOW SEARCH ENGINES WORK</h3>
  <ol>
    <li>User enters a keyword or query</li>
    <li>Search engine scans indexed websites</li>
    <li>It ranks results based on relevance</li>
    <li>Displays a list of links to the user</li>
  </ol>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    Web browsers allow access to online platforms like e-learning systems, while search engines help students and professionals find information quickly for research and learning.
  </p>

  <h3> ADVANTAGES</h3>
  <ul>
    <li>Fast access to information</li>
    <li>Easy navigation of the Internet</li>
    <li>Supports education and research</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>Difference between browser and search engine</li>
    <li>Examples of each</li>
    <li>Functions of search engines</li>
  </ul>

  <div class="example-box">
    Browser = Tool for viewing websites <br>
    Search Engine = Tool for finding websites
  </div>
  `,

  [
    {
      q: "What is a web browser?",
      hint: "Think viewing websites",
      answer: "Software used to access and display web pages",
      explanation: "It interprets and shows website content to users."
    },
    {
      q: "What is a search engine?",
      hint: "Think finding information",
      answer: "A system used to search for information on the Internet",
      explanation: "It helps users locate relevant web pages."
    },
    {
      q: "Give two examples of web browsers.",
      hint: "Think software apps",
      answer: "Google Chrome, Mozilla Firefox",
      explanation: "These are programs used to browse the web."
    },
    {
      q: "Give two examples of search engines.",
      hint: "Think search tools",
      answer: "Google, Bing",
      explanation: "These help users find information online."
    },
    {
      q: "State one difference between a browser and a search engine.",
      hint: "Think function",
      answer: "A browser displays websites, a search engine finds websites",
      explanation: "They perform different roles in accessing the Internet."
    },
    {
      q: "How does a search engine work?",
      hint: "Think steps",
      answer: "It searches indexed pages and returns relevant results",
      explanation: "It matches user queries with stored web data."
    }
  ]
);
/*===========================================
URLs and Domain Names
===========================================*/
add(
  "computer",
  "internet_web",
  "URLs and Domain Names",
  `<h2>URLs and Domain Names</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    A URL (Uniform Resource Locator) is the complete address used to locate resources on the Internet such as web pages,
    images, or files. A domain name is the human-readable name that represents an IP address and makes websites easier to access.
  </p>
  <h3> STRUCTURE OF A URL</h3>
  <ul>
    <li><b>Protocol:</b> http or https (communication rules)</li>
    <li><b>Domain name:</b> Website name (e.g., google.com)</li>
    <li><b>Path:</b> Specific page or resource location</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li>https://www.google.com</li>
    <li>https://example.com/page</li>
    <li>https://www.wikipedia.org/wiki/Internet</li>
  </ul>

  <h3> BREAKDOWN EXAMPLE</h3>
  <div class="example-box">
    https://www.google.com/search<br>
    Protocol → https<br>
    Domain → google.com<br>
    Path → /search
  </div>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    Domain names are used instead of IP addresses because they are easier for humans to remember,
    while computers still use IP addresses internally to locate servers.
  </p>

  <h3> ADVANTAGES OF DOMAIN NAMES</h3>
  <ul>
    <li>Easier to remember than IP addresses</li>
    <li>More user-friendly for navigation</li>
    <li>Can represent brands and organizations</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>Definition of URL</li>
    <li>Parts of a URL</li>
    <li>Meaning of domain name</li>
  </ul>

  <div class="example-box">
    URL = Full web address <br>
    Domain name = Human-friendly website name
  </div>
  `,

  [
    {
      q: "What is a URL?",
      hint: "Think web address",
      answer: "An address used to locate resources on the Internet",
      explanation: "It shows where a webpage or file is located online."
    },
    {
      q: "What is a domain name?",
      hint: "Think website name",
      answer: "A human-readable name representing an IP address",
      explanation: "It replaces numeric IP addresses for easier access."
    },
    {
      q: "Name the three main parts of a URL.",
      hint: "Think structure",
      answer: "Protocol, domain name, path",
      explanation: "These define how and where a resource is accessed."
    },
    {
      q: "Why are domain names used instead of IP addresses?",
      hint: "Think simplicity",
      answer: "They are easier to remember",
      explanation: "Humans prefer words while computers use numbers."
    },
    {
      q: "Give an example of a URL.",
      hint: "Think website link",
      answer: "https://www.google.com",
      explanation: "It is a complete web address."
    },
    {
      q: "What does the protocol in a URL do?",
      hint: "Think communication rule",
      answer: "It defines how data is transferred",
      explanation: "It controls how browsers communicate with servers."
    }
  ]
);
/*=========================================
HTTP vs HTTPS
=========================================*/
add(
  "computer",
  "internet_web",
  "HTTP vs HTTPS",
  `<h2>HTTP vs HTTPS</h2>
  <h3> DEEP EXPLANATION</h3>
  <p>
    HTTP (HyperText Transfer Protocol) is used to transfer web data between a browser and a web server.
    HTTPS is the secure version of HTTP that uses encryption to protect data during transmission.
  </p>
  <h3> DIFFERENCES</h3>
  <ul>
    <li><b>HTTP:</b> Not secure, data sent in plain text</li>
    <li><b>HTTPS:</b> Secure, data is encrypted</li>
    <li><b>HTTP:</b> Uses port 80</li>
    <li><b>HTTPS:</b> Uses port 443</li>
  </ul>

  <h3> EXAMPLES</h3>
  <ul>
    <li>http://example.com → insecure connection</li>
    <li>https://bank.com → secure connection</li>
    <li>https://shopping-site.com → encrypted payment data</li>
  </ul>

  <h3> How HTTPS Works</h3>
  <ul>
    <li>Browser requests a secure connection</li>
    <li>Server sends SSL/TLS certificate</li>
    <li>Data is encrypted before transmission</li>
    <li>Only intended receiver can decrypt it</li>
  </ul>

  <h3> REAL-WORLD APPLICATION</h3>
  <p>
    HTTPS is used in online banking, e-commerce, email services, and any system that handles sensitive data like passwords and payments.
  </p>

  <h3> ADVANTAGES OF HTTPS</h3>
  <ul>
    <li>Protects user data</li>
    <li>Prevents hacking and interception</li>
    <li>Builds trust in websites</li>
    <li>Required for secure transactions</li>
  </ul>

  <h3> EXAM FOCUS</h3>
  <ul>
    <li>Difference between HTTP and HTTPS</li>
    <li>Meaning of encryption</li>
    <li>Importance of secure communication</li>
  </ul>

  <div class="example-box">
    HTTP = Not secure communication <br>
    HTTPS = Secure encrypted communication
  </div>
  `,

  [
    {
      q: "What is HTTP?",
      hint: "Think web communication",
      answer: "A protocol used to transfer web data",
      explanation: "It sends data between browser and server."
    },
    {
      q: "What makes HTTPS different from HTTP?",
      hint: "Think security",
      answer: "HTTPS uses encryption",
      explanation: "It protects data from interception."
    },
    {
      q: "Why is HTTPS important?",
      hint: "Think safety",
      answer: "It protects sensitive information",
      explanation: "It secures online transactions and data."
    },
    {
      q: "Which port does HTTPS use?",
      hint: "Think secure port",
      answer: "Port 443",
      explanation: "HTTPS uses encrypted communication channel."
    },
    {
      q: "Give one example of HTTPS use.",
      hint: "Think banking",
      answer: "Online banking",
      explanation: "Banks use HTTPS to protect user data."
    },
    {
      q: "What does HTTPS stand for?",
      hint: "Think secure protocol",
      answer: "HyperText Transfer Protocol Secure",
      explanation: "It is the secure version of HTTP."
    }
  ]
);
/*=========================================
Cookies and Tracking
=========================================*/
add(
  "computer",
  "internet_web",
  "Cookies and Tracking",
  `<h2>Cookies and Tracking</h2>
  <p>
    Cookies are small text files stored on a user's device by websites. They are used to remember user information
    such as login details, preferences, and browsing activity.
  </p>

  <p>
    Tracking refers to the process of monitoring user activity online, often using cookies or similar technologies.
  </p>
  <h3> Types of Cookies</h3>
  <ul>
    <li><b>Session Cookies:</b> Temporary cookies deleted when the browser is closed</li>
    <li><b>Persistent Cookies:</b> Stored on the device for a longer period</li>
  </ul>

  <h3> How Cookies Work</h3>
  <ul>
    <li>User visits a website</li>
    <li>Website sends a cookie to the browser</li>
    <li>Browser stores the cookie</li>
    <li>Website retrieves it on next visit</li>
  </ul>

  <h3> Examples</h3>
  <ul>
    <li>Keeping a user logged in on a website</li>
    <li>Saving items in an online shopping cart</li>
    <li>Showing personalized ads based on browsing history</li>
  </ul>

  <h3> Real-world Application</h3>
  <p>
    E-commerce websites use cookies to remember shopping cart items, while social media platforms use them to personalize content and ads.
  </p>

  <h3> Advantages of Cookies</h3>
  <ul>
    <li>Improve user experience</li>
    <li>Save login information</li>
    <li>Personalize content</li>
  </ul>

  <h3> Risks of Cookies</h3>
  <ul>
    <li>Privacy concerns</li>
    <li>Tracking user behavior without consent</li>
    <li>Possible misuse of personal data</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Cookies are like a website’s memory — they help it remember who you are and what you like.
  </p>
  `,

  [
    {
      q: "What is a cookie?",
      hint: "Think website memory",
      answer: "A small file stored on a user's device by a website",
      explanation: "It stores user information and preferences."
    },

    {
      q: "What is the difference between session and persistent cookies?",
      hint: "Think time",
      answer: "Session cookies are temporary; persistent cookies are stored long-term",
      explanation: "Session cookies disappear after closing the browser."
    },

    {
      q: "Give one use of cookies",
      hint: "Think login",
      answer: "Remembering login details",
      explanation: "Cookies help improve user experience."
    },

    {
      q: "What is tracking in computing?",
      hint: "Think monitoring",
      answer: "Monitoring user activity online",
      explanation: "It is often done using cookies."
    },

    {
      q: "State one advantage of cookies",
      hint: "Think convenience",
      answer: "They improve user experience",
      explanation: "They save preferences and time."
    },

    {
      q: "State one risk of cookies",
      hint: "Think privacy",
      answer: "Privacy concerns",
      explanation: "Cookies can track user behavior."
    }
  ]
);
/*=========================================
Basic HTML (HyperText Markup Language)
=========================================*/
add(
  "computer",
  "internet_web",
  "Basic HTML",
  `<h2>Basic HTML (HyperText Markup Language)</h2>
  <p>
    HTML is the standard markup language used to create and structure web pages.
    It uses tags to define elements such as headings, paragraphs, images, and links.
  </p>

  <h3> Key Idea</h3>
  <p>
    HTML provides the structure of a web page, while other technologies like CSS and JavaScript add style and interactivity.
  </p>

  <h3> Common HTML Tags</h3>
  <ul>
    <li><b>&lt;html&gt;</b> – Root element of a webpage</li>
    <li><b>&lt;head&gt;</b> – Contains metadata (title, links, etc.)</li>
    <li><b>&lt;body&gt;</b> – Contains visible content</li>
    <li><b>&lt;h1&gt; to &lt;h6&gt;</b> – Headings</li>
    <li><b>&lt;p&gt;</b> – Paragraph text</li>
    <li><b>&lt;a&gt;</b> – Hyperlinks</li>
    <li><b>&lt;img&gt;</b> – Images</li>
  </ul>

  <h3> Example</h3>
  <pre>
&lt;html&gt;
  &lt;head&gt;
    &lt;title&gt;My First Page&lt;/title&gt;
  &lt;/head&gt;

  &lt;body&gt;
    &lt;h1&gt;Hello World&lt;/h1&gt;
    &lt;p&gt;This is my first webpage&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;
  </pre>

  <h3> Real-world Application</h3>
  <p>
    HTML is used by web developers to create websites, online forms, blogs, and web applications.
  </p>

  <h3> Exam Focus</h3>
  <ul>
    <li>Definition of HTML</li>
    <li>Structure of an HTML document</li>
    <li>Functions of basic tags</li>
    <li>Difference between head and body</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    HTML is like the skeleton of a website — it gives structure but not style.
  </p>
  `,

  [
    {
      q: "What is HTML?",
      hint: "Think web pages",
      answer: "A markup language used to create web pages",
      explanation: "It structures content on the web."
    },

    {
      q: "What is the function of the <body> tag?",
      hint: "Think visible content",
      answer: "It contains the visible content of a webpage",
      explanation: "Everything displayed on the page is inside the body."
    },

    {
      q: "What does the <h1> tag represent?",
      hint: "Think heading",
      answer: "Main heading",
      explanation: "It defines the most important heading."
    },

    {
      q: "What is the purpose of the <head> tag?",
      hint: "Think metadata",
      answer: "It contains metadata about the webpage",
      explanation: "It includes title, links, and settings."
    },

    {
      q: "Give one example of HTML use",
      hint: "Think websites",
      answer: "Creating a website",
      explanation: "HTML is used to build web pages."
    },

    {
      q: "What is the role of HTML in web development?",
      hint: "Think structure",
      answer: "It provides structure to web pages",
      explanation: "It defines layout and content."
    }
  ]
);
/*========================================================
DATA & INFORMATION SYSTEMS
========================================================*/
add(
  "computer",
  "data_information_systems",
  "Data vs Information",
  `<h2>Data vs Information</h2>
  <p>
    Data refers to raw, unprocessed facts and figures that have no meaning on their own.
    Information is data that has been processed, organized, and given meaning for decision-making.
  </p>

  <h3> Key Idea</h3>
  <p>
    Data becomes information when it is processed, organized, or analyzed to give meaning.
  </p>

  <h3> Differences Between Data and Information</h3>
  <ul>
    <li><b>Data:</b> Raw facts, unorganized, meaningless on its own</li>
    <li><b>Information:</b> Processed data, meaningful and useful</li>
  </ul>

  <h3> Examples</h3>

  <h4>Data Example</h4>
  <div class="example-box">
    50, 60, 70, 80, 90
  </div>

  <h4>Information Example</h4>
  <div class="example-box">
    Average score = 70<br>
    Highest score = 90<br>
    Performance: Good
  </div>

  <h3> Conversion Process</h3>
  <ul>
    <li>Collect raw data</li>
    <li>Process (calculate, sort, analyze)</li>
    <li>Organize results</li>
    <li>Present meaningful information</li>
  </ul>

  <h3> Real-world Application</h3>
  <p>
    Schools collect student marks (data) and process them into grades and reports (information) used for decision-making.
  </p>

  <h3> Importance</h3>
  <ul>
    <li>Helps in decision-making</li>
    <li>Makes raw facts meaningful</li>
    <li>Improves understanding of situations</li>
    <li>Supports analysis in business and education</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Data is raw material, while information is the finished product after processing.
  </p>
  `,

  [
    {
      q: "What is data?",
      hint: "Think raw facts",
      answer: "Raw, unprocessed facts and figures",
      explanation: "Data has no meaning until it is processed."
    },

    {
      q: "What is information?",
      hint: "Think processed",
      answer: "Processed data that is meaningful",
      explanation: "Information helps in decision-making."
    },

    {
      q: "Give one example of data",
      hint: "Think numbers",
      answer: "50, 60, 70",
      explanation: "These are raw values without meaning."
    },

    {
      q: "Give one example of information",
      hint: "Think analysis",
      answer: "Average score = 60",
      explanation: "It is processed and meaningful."
    },

    {
      q: "How is data converted into information?",
      hint: "Think processing",
      answer: "By processing and analyzing data",
      explanation: "Processing gives data meaning."
    },

    {
      q: "Why is information important?",
      hint: "Think decisions",
      answer: "It helps in decision-making",
      explanation: "It turns raw data into useful knowledge."
    }
  ]
);
/*==========================================
Types of Information Systems
===========================================*/
add(
  "computer",
  "data_information_systems",
  "Types of Information Systems",
  `<h2>Types of Information Systems</h2>

  <p>
    Information systems are organized systems that collect, process, store, and distribute data to support
    operations, management, and decision-making in an organization.
  </p>
  <h3> Types of Information Systems</h3>
  <ul>
    <li><b>1. TPS (Transaction Processing System):</b> Handles daily routine transactions</li>
    <li><b>2. MIS (Management Information System):</b> Provides summarized reports for managers</li>
    <li><b>3. DSS (Decision Support System):</b> Helps managers make complex decisions using data analysis</li>
  </ul>

  <h3> Detailed Explanation</h3>

  <h4>1. Transaction Processing System (TPS)</h4>
  <ul>
    <li>Handles everyday business transactions</li>
    <li>Operates in real-time</li>
    <li>High speed and accuracy required</li>
  </ul>

  <div class="example-box">
    Example: Supermarket billing system, ATM withdrawals, online purchases
  </div>

  <h4>2. Management Information System (MIS)</h4>
  <ul>
    <li>Converts data into reports for managers</li>
    <li>Used for planning and monitoring performance</li>
    <li>Works on summarized data</li>
  </ul>

  <div class="example-box">
    Example: Monthly sales reports, school performance reports
  </div>

  <h4>3. Decision Support System (DSS)</h4>
  <ul>
    <li>Helps in complex decision-making</li>
    <li>Uses models, simulations, and data analysis</li>
    <li>Supports strategic planning</li>
  </ul>

  <div class="example-box">
    Example: Investment analysis systems, weather forecasting systems
  </div>

  <h3> Comparison</h3>
  <ul>
    <li><b>TPS:</b> Handles daily operations</li>
    <li><b>MIS:</b> Produces reports for managers</li>
    <li><b>DSS:</b> Supports decision-making</li>
  </ul>

  <h3> Real-world Application</h3>
  <p>
    Banks use TPS for transactions, MIS for financial reports, and DSS for investment and risk analysis.
  </p>

  <h3> Importance of Information Systems</h3>
  <ul>
    <li>Improves efficiency in organizations</li>
    <li>Supports decision-making</li>
    <li>Reduces human error</li>
    <li>Enhances data management</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Information systems are tools that help organizations collect data, process it, and use it for decisions.
  </p>
  `,

  [
    {
      q: "What is a TPS?",
      hint: "Think daily transactions",
      answer: "A system that handles daily business transactions",
      explanation: "It processes routine operations like sales and payments."
    },

    {
      q: "What is the main function of MIS?",
      hint: "Think reports",
      answer: "To produce reports for management",
      explanation: "It summarizes data for decision-making."
    },

    {
      q: "What is DSS used for?",
      hint: "Think decisions",
      answer: "Helping in complex decision-making",
      explanation: "It analyzes data to support strategic choices."
    },

    {
      q: "Give one example of TPS",
      hint: "Think billing",
      answer: "Supermarket billing system",
      explanation: "It processes customer purchases."
    },

    {
      q: "Give one example of MIS",
      hint: "Think reports",
      answer: "Monthly sales report",
      explanation: "It shows summarized business performance."
    },

    {
      q: "Why are information systems important?",
      hint: "Think efficiency",
      answer: "They improve decision-making and efficiency",
      explanation: "They help organizations manage data effectively."
    }
  ]
);
/*==========================================
Data Lifecycle
==========================================*/
add(
  "computer",
  "data_information_systems",
  "Data Lifecycle",
  `<h2>Data Lifecycle</h2>

  <p>
    The data lifecycle refers to the stages that data passes through from its creation to its final disposal.
    It ensures that data is properly managed, protected, and used efficiently throughout its existence.
  </p>
  <h3> Stages of Data Lifecycle</h3>
  <ul>
    <li><b>1. Collection:</b> Gathering raw data from sources</li>
    <li><b>2. Processing:</b> Organizing and converting data into useful information</li>
    <li><b>3. Storage:</b> Saving data in databases or storage systems</li>
    <li><b>4. Usage:</b> Using data for decision-making and analysis</li>
    <li><b>5. Archiving:</b> Long-term storage of important data</li>
    <li><b>6. Deletion:</b> Removing unnecessary or outdated data</li>
  </ul>

  <h3> Real-life Example</h3>
  <div class="example-box">
    Student marks → Collected during exams → Processed into grades → Stored in school database → Used for reports → Archived → Old records deleted
  </div>

  <h3> Importance of Data Lifecycle</h3>
  <ul>
    <li>Ensures efficient data management</li>
    <li>Improves data security and organization</li>
    <li>Reduces storage costs</li>
    <li>Helps in compliance with data regulations</li>
    <li>Improves decision-making accuracy</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    The data lifecycle is like the life of data — it is created, used, stored, and eventually deleted when no longer needed.
  </p>
  `,

  [
    {
      q: "What is data lifecycle?",
      hint: "Think stages of data",
      answer: "The stages data goes through from creation to deletion",
      explanation: "It describes how data is managed over time."
    },

    {
      q: "What is the first stage of data lifecycle?",
      hint: "Think starting point",
      answer: "Collection",
      explanation: "Data must be gathered before use."
    },

    {
      q: "What happens during processing?",
      hint: "Think organizing",
      answer: "Data is converted into useful information",
      explanation: "Raw data becomes meaningful."
    },

    {
      q: "Why is storage important?",
      hint: "Think saving data",
      answer: "To keep data for future use",
      explanation: "Stored data can be retrieved later."
    },

    {
      q: "What is archiving?",
      hint: "Think long-term storage",
      answer: "Storing data for long-term future use",
      explanation: "It preserves important historical data."
    },

    {
      q: "What is the final stage of data lifecycle?",
      hint: "Think removal",
      answer: "Deletion",
      explanation: "Unneeded data is removed safely."
    }
  ]
);
/*===============================================
Big Data
===============================================*/
add(
  "computer",
  "data_information_systems",
  "Big Data Basics",
  `<h2>Big Data</h2>
  <p>
    Big Data refers to extremely large and complex datasets that cannot be easily stored, processed, or analyzed
    using traditional data processing tools.
  </p>
  <p>
    It is used in modern systems where data is generated continuously from many sources such as social media,
    sensors, and online transactions.
  </p>
  <h3> Characteristics of Big Data (3Vs)</h3>
  <ul>
    <li><b>Volume:</b> Very large amounts of data generated daily</li>
    <li><b>Velocity:</b> High speed at which data is produced and processed</li>
    <li><b>Variety:</b> Different types of data (text, images, videos, sensor data)</li>
  </ul>

  <h3> Additional Vs (Advanced Concept)</h3>
  <ul>
    <li><b>Veracity:</b> Accuracy and reliability of data</li>
    <li><b>Value:</b> Usefulness of data for decision-making</li>
  </ul>

  <h3> Examples of Big Data Sources</h3>
  <ul>
    <li>Social media platforms (Facebook, Instagram, TikTok)</li>
    <li>E-commerce websites (Amazon, Jumia)</li>
    <li>IoT devices (smart sensors, smartwatches)</li>
    <li>Banking transactions</li>
  </ul>

  <h3> Real-world Applications</h3>
  <ul>
    <li>Predicting customer behavior in marketing</li>
    <li>Fraud detection in banking systems</li>
    <li>Traffic prediction in smart cities</li>
    <li>Healthcare data analysis</li>
  </ul>

  <h3> Importance of Big Data</h3>
  <ul>
    <li>Helps organizations make better decisions</li>
    <li>Improves efficiency and performance</li>
    <li>Enables personalized services</li>
    <li>Supports innovation and research</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Big Data is like a massive ocean of information that needs powerful tools to analyze and understand it.
  </p>
  `,

  [
    {
      q: "What is Big Data?",
      hint: "Think huge datasets",
      answer: "Extremely large datasets that are hard to process using traditional tools",
      explanation: "It involves massive amounts of complex data."
    },

    {
      q: "Name the 3Vs of Big Data",
      hint: "Think V words",
      answer: "Volume, Velocity, Variety",
      explanation: "These describe the main characteristics of Big Data."
    },

    {
      q: "Give one example of Big Data source",
      hint: "Think social media",
      answer: "Social media platforms",
      explanation: "They generate huge amounts of user data."
    },

    {
      q: "Give one use of Big Data",
      hint: "Think prediction",
      answer: "Predicting customer behavior",
      explanation: "Businesses analyze data to make decisions."
    },

    {
      q: "What is Velocity in Big Data?",
      hint: "Think speed",
      answer: "The speed at which data is generated and processed",
      explanation: "Data is produced very quickly in real time."
    },

    {
      q: "Why is Big Data important?",
      hint: "Think decisions",
      answer: "It helps in better decision-making and analysis",
      explanation: "It improves efficiency and planning."
    }
  ]
);
/*========================================================
COMPUTER ETHICS & LEGAL ISSUES
========================================================*/
add(
  "computer",
  "ethics_legal",
  "Computer Ethics",
  `<h2>Computer Ethics</h2>
  <p>
    Computer ethics refers to the moral principles and guidelines that govern the responsible use of computers,
    digital systems, and information technology.
  </p>
  <p>
    It helps users decide what is right and wrong when using technology, ensuring fairness, respect, and safety in the digital world.
  </p>
  <h3> Key Principles of Computer Ethics</h3>
  <ul>
    <li><b>Privacy:</b> Respecting personal and confidential information</li>
    <li><b>Integrity:</b> Not altering or destroying data without permission</li>
    <li><b>Responsibility:</b> Using technology in a safe and lawful way</li>
    <li><b>Respect:</b> Avoiding harassment, cyberbullying, or harmful behavior</li>
    <li><b>Legal use:</b> Using licensed software and legal resources</li>
  </ul>

  <h3> Examples of Ethical Behavior</h3>
  <ul>
    <li>Protecting passwords and personal accounts</li>
    <li>Respecting others' digital privacy</li>
    <li>Using licensed software instead of pirated versions</li>
    <li>Citing sources when using online information</li>
  </ul>

  <h3> Examples of Unethical Behavior</h3>
  <ul>
    <li>Hacking into someone’s account</li>
    <li>Sharing private information without consent</li>
    <li>Cyberbullying or online harassment</li>
    <li>Using pirated software</li>
  </ul>

  <h3> Real-world Application</h3>
  <p>
    Schools, workplaces, and governments use Acceptable Use Policies (AUPs) to guide users on ethical behavior when using computer systems.
  </p>

  <h3> Importance of Computer Ethics</h3>
  <ul>
    <li>Promotes safe and responsible technology use</li>
    <li>Protects users from harm and exploitation</li>
    <li>Builds trust in digital systems</li>
    <li>Reduces cybercrime and misuse of technology</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Computer ethics means using technology in a way that is right, fair, and does not harm others.
  </p>
  `,

  [
    {
      q: "What is computer ethics?",
      hint: "Think moral rules",
      answer: "Moral principles guiding the use of computers",
      explanation: "It defines right and wrong behavior in technology use."
    },

    {
      q: "Give one example of ethical computer use.",
      hint: "Think privacy",
      answer: "Respecting others' privacy",
      explanation: "Ethical users protect personal information."
    },

    {
      q: "State one unethical computer behavior.",
      hint: "Think hacking",
      answer: "Hacking into accounts",
      explanation: "It involves unauthorized access."
    },

    {
      q: "Why is computer ethics important?",
      hint: "Think safety",
      answer: "To promote responsible and safe use of technology",
      explanation: "It prevents misuse and harm."
    },

    {
      q: "What is an Acceptable Use Policy (AUP)?",
      hint: "Think rules",
      answer: "Guidelines for proper use of computer systems",
      explanation: "It defines acceptable behavior in organizations."
    },

    {
      q: "Give one principle of computer ethics.",
      hint: "Think respect",
      answer: "Privacy",
      explanation: "Users must respect personal information."
    }
  ]
);
/*===============================================
Cyber Laws
===============================================*/
add(
  "computer",
  "ethics_legal",
  "Cyber Laws",
  `<h2>Cyber Laws</h2>
  <p>
    Cyber laws are legal rules and regulations that govern the use of computers, digital systems, and the Internet.
    They are designed to protect users, data, and systems from cybercrime and misuse.
  </p>
  <p>
    These laws define acceptable behavior online and provide punishment for illegal digital activities.
  </p>
  <h3> Key Idea</h3>
  <p>
    Cyber laws ensure safe, legal, and responsible use of digital technologies and protect individuals and organizations from cybercrime.
  </p>

  <h3> 1. Areas Covered by Cyber Laws</h3>
  <ul>
    <li><b>Cybercrime:</b> Illegal activities such as hacking, phishing, and fraud</li>
    <li><b>Data Protection:</b> Safeguarding personal and sensitive information</li>
    <li><b>Online Transactions:</b> Regulating e-commerce and digital payments</li>
    <li><b>Intellectual Property:</b> Protecting digital content and software</li>
  </ul>

  <h3> 2. Examples of Cyber Laws in Action</h3>
  <ul>
    <li>Punishment for hacking computer systems</li>
    <li>Laws protecting online banking and mobile money transactions</li>
    <li>Regulation of social media use and online communication</li>
    <li>Protection of personal data by organizations</li>
  </ul>

  <h3> 3. Examples of Cybercrime</h3>
  <ul>
    <li>Hacking into computer systems</li>
    <li>Online fraud and phishing scams</li>
    <li>Identity theft</li>
    <li>Spreading malware or viruses</li>
  </ul>

  <h3> 4. Real-world Application</h3>
  <p>
    Governments and legal authorities enforce cyber laws to prosecute cybercriminals and protect individuals,
    businesses, and national security systems.
  </p>

  <h3> 5. Importance of Cyber Laws</h3>
  <ul>
    <li>Protects users from cyber threats</li>
    <li>Ensures secure online transactions</li>
    <li>Prevents misuse of technology</li>
    <li>Maintains trust in digital systems</li>
    <li>Supports law enforcement in digital investigations</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Cyber laws are like traffic rules for the internet — they control behavior and punish misuse.
  </p>
  `,

  [
    {
      q: "What are cyber laws?",
      hint: "Think internet rules",
      answer: "Laws that govern the use of computers and the internet",
      explanation: "They regulate digital behavior and activities."
    },

    {
      q: "Give one example of cybercrime",
      hint: "Think illegal access",
      answer: "Hacking",
      explanation: "It involves unauthorized access to systems."
    },

    {
      q: "Why are cyber laws important?",
      hint: "Think safety",
      answer: "To protect users and data from cybercrime",
      explanation: "They ensure safe use of digital systems."
    },

    {
      q: "Name one area covered by cyber laws",
      hint: "Think data",
      answer: "Data protection",
      explanation: "It protects personal and sensitive information."
    },

    {
      q: "Give one example of cyber law application",
      hint: "Think banking",
      answer: "Protecting online banking transactions",
      explanation: "It ensures secure financial operations."
    },

    {
      q: "What is the role of cyber laws?",
      hint: "Think regulation",
      answer: "To regulate and control digital activities",
      explanation: "They define legal and illegal online behavior."
    }
  ]
);
/*=============================================
Copyright and Piracy
=============================================*/
add(
  "computer",
  "ethics_legal",
  "Copyright and Piracy",
  `<h2>Copyright and Piracy</h2>
  <p>
    Copyright is a legal right that protects the original work of creators such as software, music, books, images, and videos.
    It gives the creator exclusive rights to use, distribute, and sell their work.
  </p>
  <p>
    Piracy is the illegal copying, downloading, or distribution of copyrighted material without permission from the owner.
  </p>
  <h3> Key Idea</h3>
  <p>
    Copyright protects original work, while piracy violates those rights by unauthorized copying or distribution.
  </p>

  <h3> 1. Copyright</h3>
  <ul>
    <li>Legal protection for original creators</li>
    <li>Gives ownership rights over creative work</li>
    <li>Requires permission for use or distribution</li>
  </ul>

  <h3> 2. Piracy</h3>
  <ul>
    <li>Illegal copying or sharing of protected content</li>
    <li>Includes software, music, movies, and books</li>
    <li>Violates intellectual property laws</li>
  </ul>

  <h3> 3. Examples</h3>
  <ul>
    <li><b>Legal:</b> Buying licensed Microsoft Office software</li>
    <li><b>Illegal:</b> Downloading cracked software or pirated movies</li>
  </ul>

  <h3> 4. Real-world Application</h3>
  <p>
    Companies use digital licensing systems and legal protections to prevent unauthorized copying and protect intellectual property.
  </p>

  <h3> 5. Importance of Copyright</h3>
  <ul>
    <li>Protects creators’ rights</li>
    <li>Encourages innovation and creativity</li>
    <li>Ensures fair economic reward for work</li>
    <li>Reduces illegal distribution of content</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Copyright means “this is mine legally,” while piracy means “taking what is not yours without permission.”
  </p>
  `,

  [
    {
      q: "What is copyright?",
      hint: "Think legal ownership",
      answer: "Legal protection for original work",
      explanation: "It gives creators exclusive rights over their work."
    },

    {
      q: "What is piracy?",
      hint: "Think illegal copying",
      answer: "Unauthorized copying or distribution of copyrighted material",
      explanation: "It violates intellectual property laws."
    },

    {
      q: "Give one example of piracy",
      hint: "Think cracked software",
      answer: "Downloading pirated movies or software",
      explanation: "It involves using content without permission."
    },

    {
      q: "State one example of legal use of software",
      hint: "Think licensed",
      answer: "Buying licensed software",
      explanation: "Legal software is purchased with permission."
    },

    {
      q: "Why is copyright important?",
      hint: "Think creators",
      answer: "It protects creators' work and rights",
      explanation: "It ensures fair recognition and reward."
    },

    {
      q: "What is the difference between copyright and piracy?",
      hint: "Think legal vs illegal",
      answer: "Copyright is legal protection; piracy is illegal copying",
      explanation: "One protects work, the other violates it."
    }
  ]
);
/*==========================================
Plagiarism
===========================================*/
add(
  "computer",
  "ethics_legal",
  "Plagiarism",
  `<h2>Plagiarism</h2>
  <p>
    Plagiarism is the act of using another person’s work, ideas, or intellectual property without giving proper credit,
    and presenting it as your own.
  </p>
  <p>
    It is considered academic dishonesty and is punishable in schools, universities, and professional environments.
  </p>
  <h3> Key Idea</h3>
  <p>
    Plagiarism occurs when someone presents another person’s work or ideas as their own without acknowledgment.
  </p>

  <h3> 1. Forms of Plagiarism</h3>
  <ul>
    <li><b>Direct copying:</b> Copying text word-for-word without citation</li>
    <li><b>Paraphrasing without credit:</b> Rewriting someone’s ideas without acknowledgment</li>
    <li><b>Self-plagiarism:</b> Reusing your own previous work without permission</li>
  </ul>

  <h3> 2. Examples of Plagiarism</h3>
  <ul>
    <li>Copying an assignment from the internet and submitting it as your own</li>
    <li>Using a friend’s project without credit</li>
    <li>Copy-pasting content from books or websites without citation</li>
  </ul>

  <h3> 3. How to Avoid Plagiarism</h3>
  <ul>
    <li>Always cite sources used in your work</li>
    <li>Use quotation marks for direct quotes</li>
    <li>Paraphrase properly and acknowledge authors</li>
    <li>Use plagiarism detection tools</li>
  </ul>

  <h3> 4. Real-world Application</h3>
  <p>
    Schools and universities use plagiarism detection software (e.g., Turnitin) to check originality of student work.
  </p>

  <h3> 5. Consequences of Plagiarism</h3>
  <ul>
    <li>Loss of marks or academic penalties</li>
    <li>Disqualification from exams or courses</li>
    <li>Damage to academic reputation</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Plagiarism is like stealing someone’s intellectual work and pretending it is yours.
  </p>
  `,

  [
    {
      q: "What is plagiarism?",
      hint: "Think stealing ideas",
      answer: "Using someone else's work without giving credit",
      explanation: "It is considered academic dishonesty."
    },

    {
      q: "Give one example of plagiarism",
      hint: "Think copying work",
      answer: "Copying text from the internet without citation",
      explanation: "You must always acknowledge sources."
    },

    {
      q: "What is paraphrasing plagiarism?",
      hint: "Think rewriting",
      answer: "Rewriting someone’s ideas without credit",
      explanation: "Even reworded ideas must be cited."
    },

    {
      q: "How can plagiarism be avoided?",
      hint: "Think references",
      answer: "By citing sources properly",
      explanation: "Acknowledging authors prevents plagiarism."
    },

    {
      q: "Give one tool used to detect plagiarism",
      hint: "Think software",
      answer: "Turnitin",
      explanation: "It checks originality of academic work."
    },

    {
      q: "State one consequence of plagiarism",
      hint: "Think punishment",
      answer: "Loss of marks or penalties",
      explanation: "It is treated as academic misconduct."
    }
  ]
);
/*=============================================
Digital Citizenship
=============================================*/
add(
  "computer",
  "ethics_legal",
  "Digital Citizenship",
  `<h2>Digital Citizenship</h2>
  <p>
    Digital citizenship refers to the responsible, safe, and appropriate use of technology and digital platforms
    by individuals in an online environment.
  </p>
  <p>
    It involves understanding how to behave ethically, communicate respectfully, and protect oneself and others online.
  </p>
  <h3> Key Idea</h3>
  <p>
    Digital citizenship is about using technology responsibly while respecting others and protecting personal information.
  </p>

  <h3> 1. Elements of Digital Citizenship</h3>
  <ul>
    <li><b>Digital Etiquette:</b> Proper and respectful behavior online</li>
    <li><b>Online Safety:</b> Protecting personal information and privacy</li>
    <li><b>Responsible Communication:</b> Sharing accurate and respectful information</li>
  </ul>

  <h3> 2. Examples of Good Digital Citizenship</h3>
  <ul>
    <li>Respecting others on social media platforms</li>
    <li>Avoiding cyberbullying or harassment</li>
    <li>Protecting passwords and personal data</li>
    <li>Verifying information before sharing</li>
    <li>Using technology for positive learning purposes</li>
  </ul>

  <h3> 3. Bad Digital Behavior (to Avoid)</h3>
  <ul>
    <li>Cyberbullying or spreading hate</li>
    <li>Sharing false information (fake news)</li>
    <li>Accessing unauthorized systems</li>
    <li>Sharing private information of others</li>
  </ul>

  <h3> 4. Real-world Application</h3>
  <p>
    Schools and organizations teach digital citizenship to ensure users behave responsibly in online platforms,
    especially social media and learning environments.
  </p>

  <h3> 5. Importance of Digital Citizenship</h3>
  <ul>
    <li>Promotes safe internet usage</li>
    <li>Reduces cyberbullying cases</li>
    <li>Protects personal and sensitive data</li>
    <li>Encourages respectful communication</li>
    <li>Builds a positive online community</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Digital citizenship means behaving online the same way you would behave responsibly in real life.
  </p>
  `,

  [
    {
      q: "What is digital citizenship?",
      hint: "Think responsible behavior",
      answer: "Responsible use of technology and online platforms",
      explanation: "It ensures safe and ethical use of digital tools."
    },

    {
      q: "Give one example of good digital citizenship",
      hint: "Think respect online",
      answer: "Respecting others on social media",
      explanation: "It promotes positive online interaction."
    },

    {
      q: "What is digital etiquette?",
      hint: "Think manners online",
      answer: "Proper behavior when using digital platforms",
      explanation: "It ensures respectful communication online."
    },

    {
      q: "Give one bad online behavior",
      hint: "Think harm",
      answer: "Cyberbullying",
      explanation: "It involves harming or insulting others online."
    },

    {
      q: "Why is digital citizenship important?",
      hint: "Think safety",
      answer: "It ensures safe and responsible internet use",
      explanation: "It helps protect users and promote respect online."
    },

    {
      q: "How can users protect themselves online?",
      hint: "Think passwords",
      answer: "By protecting personal information and using strong passwords",
      explanation: "This prevents unauthorized access."
    }
  ]
);
/*========================================================
EMERGING TECHNOLOGIES
========================================================*/
add(
  "computer",
  "emerging_technologies",
  "Artificial Intelligence (AI Basics)",
  `<h2>Artificial Intelligence (AI Basics)</h2>
  <p>
    Artificial Intelligence (AI) is the ability of machines or computer systems to simulate human intelligence processes
    such as learning, reasoning, problem-solving, and decision-making.
  </p>
  <p>
    AI systems analyze data, recognize patterns, and make decisions or predictions without being explicitly programmed for every situation.
  </p>
  <h3> Key Idea</h3>
  <p>
    AI enables machines to think and act like humans by learning from data and improving over time.
  </p>

  <h3> 1. Key Concepts in AI</h3>
  <ul>
    <li><b>Machine Learning:</b> Systems learn from data</li>
    <li><b>Natural Language Processing (NLP):</b> Understanding human language</li>
    <li><b>Computer Vision:</b> Interpreting images and videos</li>
  </ul>

  <h3> 2. Types of AI</h3>

  <h4> Narrow AI</h4>
  <p>
    Designed to perform a specific task only.
  </p>
  <div class="example-box">
    Example: Chatbots, face recognition systems, recommendation engines
  </div>

  <h4> General AI</h4>
  <p>
    Hypothetical AI that can perform any intellectual task like a human.
  </p>
  <div class="example-box">
    Still under research and not yet fully developed
  </div>

  <h3> 3. Examples of AI in Action</h3>
  <pre>
Phone Face Unlock → AI recognizes facial patterns
YouTube/Netflix → AI recommends videos based on behavior
  </pre>

  <h3> 4. Real-world Applications</h3>
  <ul>
    <li>Virtual assistants (Siri, Google Assistant)</li>
    <li>Self-driving cars</li>
    <li>Fraud detection in banking systems</li>
    <li>Medical diagnosis and disease prediction</li>
    <li>Smart recommendation systems</li>
  </ul>

  <h3> 5. Advantages of AI</h3>
  <ul>
    <li>Automates repetitive tasks</li>
    <li>Improves decision-making</li>
    <li>Works faster than humans in data analysis</li>
    <li>Reduces human error</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    AI is like giving computers a “brain” that allows them to learn, think, and make decisions like humans.
  </p>
  `,

  [
    {
      q: "What is Artificial Intelligence?",
      hint: "Think human-like machines",
      answer: "Simulation of human intelligence by machines",
      explanation: "AI allows machines to think, learn, and make decisions."
    },

    {
      q: "What is Narrow AI?",
      hint: "Think specific task",
      answer: "AI designed for a specific task",
      explanation: "It performs one task such as face recognition or chatbots."
    },

    {
      q: "What is Machine Learning in AI?",
      hint: "Think learning from data",
      answer: "A system that learns from data",
      explanation: "It helps AI improve performance automatically."
    },

    {
      q: "Give one application of AI",
      hint: "Think transport or apps",
      answer: "Self-driving cars",
      explanation: "AI enables vehicles to navigate without human drivers."
    },

    {
      q: "What is NLP?",
      hint: "Think language",
      answer: "Natural Language Processing",
      explanation: "It allows machines to understand human language."
    },

    {
      q: "State one advantage of AI",
      hint: "Think efficiency",
      answer: "Reduces human error",
      explanation: "AI systems perform tasks with high accuracy."
    }
  ]
);
/*==========================================
Machine Learning (Introduction)
==========================================*/
add(
  "computer",
  "emerging_technologies",
  "Machine Learning (Introduction)",
  `<h2>Machine Learning (Introduction)</h2>
  <p>
    Machine Learning (ML) is a branch of Artificial Intelligence (AI) that enables systems to learn from data,
    identify patterns, and improve performance without being explicitly programmed.
  </p>
  <p>
    Instead of following fixed rules, ML systems learn from experience and make predictions or decisions based on data.
  </p>
  <h3> Key Idea</h3>
  <p>
    Machine Learning allows computers to learn patterns from data instead of being manually programmed for every task.
  </p>

  <h3> 1. Types of Machine Learning</h3>

  <h4> Supervised Learning</h4>
  <p>
    The system is trained using labeled data (input + correct output).
  </p>
  <div class="example-box">
    Example: Email spam detection (spam / not spam)
  </div>

  <h4> Unsupervised Learning</h4>
  <p>
    The system finds patterns in unlabeled data without given answers.
  </p>
  <div class="example-box">
    Example: Customer grouping in marketing
  </div>

  <h4> Reinforcement Learning</h4>
  <p>
    The system learns through rewards and penalties based on its actions.
  </p>
  <div class="example-box">
    Example: Game-playing AI improving through trial and error
  </div>

  <h3> 2. Example of Machine Learning</h3>
  <pre>
Email System → Learns spam patterns → Automatically filters unwanted emails
  </pre>

  <h3> 3. Real-world Applications</h3>
  <ul>
    <li>Recommendation systems (Netflix, YouTube, TikTok)</li>
    <li>Spam email filtering systems</li>
    <li>Stock market prediction tools</li>
    <li>Speech recognition (voice assistants)</li>
    <li>Self-driving cars</li>
  </ul>

  <h3> 4. AI vs Machine Learning</h3>
  <ul>
    <li><b>AI:</b> Broad field of intelligent machines</li>
    <li><b>ML:</b> Subset of AI that learns from data</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Machine Learning is like teaching a computer by giving it examples instead of writing step-by-step instructions.
  </p>
  `,

  [
    {
      q: "What is machine learning?",
      hint: "Think learning from data",
      answer: "A system that learns from data without explicit programming",
      explanation: "ML systems improve performance by learning patterns from data"
    },

    {
      q: "What is supervised learning?",
      hint: "Think labeled data",
      answer: "Learning using labeled data",
      explanation: "The system is trained using known inputs and outputs"
    },

    {
      q: "What is unsupervised learning?",
      hint: "Think no labels",
      answer: "Learning from unlabeled data",
      explanation: "The system finds hidden patterns without guidance"
    },

    {
      q: "What is reinforcement learning?",
      hint: "Think rewards",
      answer: "Learning through rewards and penalties",
      explanation: "The system improves by trial and error"
    },

    {
      q: "Give one real-world use of ML",
      hint: "Think YouTube or Netflix",
      answer: "Recommendation systems",
      explanation: "ML suggests content based on user behavior"
    },

    {
      q: "Difference between AI and ML?",
      hint: "Think scope",
      answer: "AI is broader; ML is a subset of AI",
      explanation: "ML is one method used to achieve AI"
    }
  ]
);
/*=============================================
Cloud Computing
==============================================*/
add(
  "computer",
  "emerging_technologies",
  "Cloud Computing",
  `<h2>Cloud Computing</h2>
  <p>
    Cloud computing is the delivery of computing services such as storage, servers, databases, networking,
    and software over the internet instead of using local computer hardware.
  </p>
  <p>
    It allows users to access data, applications, and services from anywhere using an internet connection.
  </p>
  <h3> Key Idea</h3>
  <p>
    Cloud computing replaces local storage and processing with internet-based services that can be accessed anytime, anywhere.
  </p>

  <h3> 1. Types of Cloud Services</h3>

  <h4> IaaS (Infrastructure as a Service)</h4>
  <p>
    Provides virtual computing resources such as servers and storage.
  </p>
  <div class="example-box">
    Example: Amazon Web Services (AWS)
  </div>

  <h4> PaaS (Platform as a Service)</h4>
  <p>
    Provides platforms for developers to build and deploy applications.
  </p>
  <div class="example-box">
    Example: Google App Engine
  </div>

  <h4> SaaS (Software as a Service)</h4>
  <p>
    Provides ready-to-use software over the internet.
  </p>
  <div class="example-box">
    Example: Google Drive, Microsoft Office 365
  </div>

  <h3> 2. Example of Cloud Computing</h3>
  <pre>
Google Drive → Stores files online
Dropbox → Allows file access from anywhere
OneDrive → Cloud-based storage system
  </pre>

  <h3> 3. Real-world Applications</h3>
  <ul>
    <li>Online storage services (Google Drive, Dropbox)</li>
    <li>Video streaming (YouTube, Netflix)</li>
    <li>Online collaboration tools (Google Docs, Teams)</li>
    <li>Business data backup systems</li>
    <li>Mobile app cloud syncing</li>
  </ul>

  <h3> 4. Advantages of Cloud Computing</h3>
  <ul>
    <li>Access data from anywhere</li>
    <li>Reduces cost of hardware</li>
    <li>Automatic updates and maintenance</li>
    <li>Scalable storage and services</li>
    <li>Improved collaboration</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Cloud computing is like renting a powerful computer over the internet instead of owning one physically.
  </p>
  `,

  [
    {
      q: "What is cloud computing?",
      hint: "Think internet services",
      answer: "Delivery of computing services over the internet",
      explanation: "It allows users to access data and applications remotely."
    },

    {
      q: "What is SaaS?",
      hint: "Think software online",
      answer: "Software as a Service",
      explanation: "Software is accessed via the internet without installation."
    },

    {
      q: "What is IaaS?",
      hint: "Think infrastructure",
      answer: "Infrastructure as a Service",
      explanation: "Provides virtual computing resources like servers."
    },

    {
      q: "Give one example of cloud storage",
      hint: "Think Google or Microsoft",
      answer: "Google Drive",
      explanation: "It stores files online and allows remote access."
    },

    {
      q: "State one advantage of cloud computing",
      hint: "Think access or cost",
      answer: "Access from anywhere",
      explanation: "Users can access data using any internet-connected device."
    },

    {
      q: "Give one real-life use of cloud computing",
      hint: "Think streaming or storage",
      answer: "Netflix streaming service",
      explanation: "It delivers video content over the internet using cloud systems."
    }
  ]
);
/*=========================================
Internet of Things
=========================================*/
add(
  "computer",
  "emerging_technologies",
  "Internet of Things (IoT)",
  `<h2>Internet of Things (IoT)</h2>
  <p>
    The Internet of Things (IoT) refers to a network of physical devices that are connected to the internet
    and can collect, share, and exchange data automatically.
  </p>
  <p>
    These devices operate with minimal or no human intervention by communicating with each other through the internet.
  </p>
  <h3> Key Idea</h3>
  <p>
    IoT connects everyday objects to the internet, allowing them to collect and exchange data automatically.
  </p>

  <h3> 1. Characteristics of IoT</h3>
  <ul>
    <li><b>Connectivity:</b> Devices are connected to the internet</li>
    <li><b>Automation:</b> Devices perform tasks automatically</li>
    <li><b>Real-time data:</b> Information is collected and processed instantly</li>
    <li><b>Interconnectivity:</b> Devices communicate with each other</li>
  </ul>

  <h3> 2. Example of IoT System</h3>
  <pre>
Smart Home System:
Phone → Controls lights → Adjusts temperature → Manages security system
  </pre>

  <h3> 3. IoT Devices</h3>
  <div class="example-box">
    • Smart thermostats<br>
    • Smart lights<br>
    • Smart watches<br>
    • Security cameras<br>
    • Smart fridges
  </div>

  <h3> 4. Real-world Applications</h3>
  <ul>
    <li>Smart homes (automated lighting and heating)</li>
    <li>Wearable devices (fitness trackers, smartwatches)</li>
    <li>Smart cities (traffic control systems)</li>
    <li>Agriculture (soil moisture sensors)</li>
    <li>Healthcare monitoring systems</li>
  </ul>

  <h3> 5. Benefits of IoT</h3>
  <ul>
    <li>Improves efficiency and automation</li>
    <li>Saves time and reduces human effort</li>
    <li>Enables remote monitoring and control</li>
    <li>Improves decision-making using real-time data</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    IoT is like giving everyday objects the ability to “talk” to each other and work automatically using the internet.
  </p>
  `,

  [
    {
      q: "What is IoT?",
      hint: "Think connected devices",
      answer: "A network of connected physical devices that collect and exchange data",
      explanation: "IoT devices communicate through the internet without human control."
    },

    {
      q: "Give one example of an IoT device",
      hint: "Think smart home",
      answer: "Smart thermostat",
      explanation: "It automatically adjusts room temperature."
    },

    {
      q: "What is a key feature of IoT?",
      hint: "Think connection",
      answer: "Connectivity",
      explanation: "Devices must be connected to the internet to communicate."
    },

    {
      q: "Give one benefit of IoT",
      hint: "Think automation",
      answer: "Automation of tasks",
      explanation: "IoT reduces the need for manual control."
    },

    {
      q: "Give one real-life application of IoT",
      hint: "Think smart city",
      answer: "Smart traffic control systems",
      explanation: "IoT is used to manage traffic flow efficiently."
    },

    {
      q: "How do IoT devices communicate?",
      hint: "Think internet",
      answer: "Through the internet",
      explanation: "IoT devices send and receive data via internet connections."
    }
  ]
);
/*====================================
Blockchain Basics
====================================*/
add(
  "computer",
  "emerging_technologies",
  "Blockchain Basics",
  `<h2>Blockchain Basics</h2>
  <p>
    Blockchain is a distributed digital ledger technology used to record transactions securely across multiple computers
    in a way that makes the records difficult to alter or tamper with.
  </p>
  <p>
    Each record (called a block) is linked to the previous block, forming a continuous chain of data known as a blockchain.
  </p>
  <h3> Key Idea</h3>
  <p>
    Blockchain is a secure system where data is stored in linked blocks across a distributed network, making it nearly impossible to alter.
  </p>
  <h3> 1. How Blockchain Works</h3>
  <pre>
Transaction → Verified by network → Added to a block → Block added to chain → Stored permanently
  </pre>

  <h3> 2. Key Features of Blockchain</h3>
  <ul>
    <li><b>Decentralization:</b> No central authority controls the system</li>
    <li><b>Security:</b> Uses cryptography to protect data</li>
    <li><b>Transparency:</b> All transactions are visible to participants</li>
    <li><b>Immutability:</b> Data cannot be changed once recorded</li>
  </ul>

  <h3> 3. Structure of Blockchain</h3>
  <ul>
    <li><b>Block:</b> Contains transaction data</li>
    <li><b>Chain:</b> Linked sequence of blocks</li>
    <li><b>Nodes:</b> Computers that maintain copies of the blockchain</li>
  </ul>

  <h3> 4. Real-world Applications</h3>
  <ul>
    <li>Cryptocurrencies (Bitcoin, Ethereum)</li>
    <li>Secure financial transactions</li>
    <li>Supply chain tracking (food, goods, medicine)</li>
    <li>Digital identity verification</li>
    <li>Smart contracts</li>
  </ul>

  <h3> 5. Advantages of Blockchain</h3>
  <ul>
    <li>High security and data integrity</li>
    <li>Reduces fraud and corruption</li>
    <li>No need for intermediaries</li>
    <li>Transparent transaction history</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    Blockchain is like a digital notebook shared across many computers where every entry is locked, verified, and cannot be secretly changed.
  </p>
  `,
  [
    {
      q: "What is blockchain?",
      hint: "Think digital ledger",
      answer: "A distributed digital record of transactions",
      explanation: "It stores data securely across many computers in linked blocks."
    },

    {
      q: "What is a block in blockchain?",
      hint: "Think data unit",
      answer: "A unit that stores transaction data",
      explanation: "Each block contains verified transaction information."
    },

    {
      q: "What is immutability?",
      hint: "Think cannot change",
      answer: "Data cannot be altered once recorded",
      explanation: "This ensures data integrity and security."
    },

    {
      q: "Give one real-life use of blockchain",
      hint: "Think crypto",
      answer: "Cryptocurrency like Bitcoin",
      explanation: "Blockchain is the technology behind digital currencies."
    },

    {
      q: "What is decentralization in blockchain?",
      hint: "Think no central control",
      answer: "No single authority controls the system",
      explanation: "Data is stored across many computers."
    },

    {
      q: "Give one advantage of blockchain",
      hint: "Think security",
      answer: "High security of data",
      explanation: "Blockchain protects data using cryptography."
    }
  ]
);
/*========================================================
DATABASES
========================================================*/
/*====================================
Data bases
====================================*/
add(
  "computer",
  "databases",
  "Advanced Databases",
  `<h2>Advanced Databases</h2>

  <p>
    Advanced databases focus on powerful techniques used in real-world systems to manage large and complex data efficiently.
    These include JOIN operations, normalization, indexing, and performance optimization.
  </p>
  <h3> Key Idea</h3>
  <p>
    Advanced database systems are designed to organize data efficiently, reduce duplication, and speed up data retrieval.
  </p>

  <h3> 1. SQL JOINs</h3>
  <p>
    JOIN operations are used to combine data from two or more tables based on related columns.
  </p>

  <h4>INNER JOIN</h4>
  <p>Returns only records that match in both tables.</p>

  <pre>
SELECT Students.Name, Courses.CourseName
FROM Students
INNER JOIN Enrollments ON Students.ID = Enrollments.StudentID
INNER JOIN Courses ON Enrollments.CourseID = Courses.CourseID;
  </pre>

  <h4>LEFT JOIN</h4>
  <p>Returns all records from the left table and matching records from the right table.</p>

  <pre>
SELECT Students.Name, Courses.CourseName
FROM Students
LEFT JOIN Enrollments ON Students.ID = Enrollments.StudentID
LEFT JOIN Courses ON Enrollments.CourseID = Courses.CourseID;
  </pre>

  <h4>RIGHT JOIN</h4>
  <p>Returns all records from the right table and matching records from the left table.</p>

  <h3> 2. Normalization</h3>
  <p>
    Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity.
  </p>

  <h4> Before Normalization</h4>
  <pre>
Student | Course | Instructor
Alex    | Math   | Mr. John
Alex    | Science| Mr. Mike
  </pre>

  <h4> After Normalization</h4>
  <pre>
Students Table
ID | Name

Courses Table
CourseID | CourseName

Enrollments Table
StudentID | CourseID
  </pre>

  <p>
    This removes duplication and improves efficiency.
  </p>

  <h3> 3. Indexing</h3>
  <p>
    An index is a database structure that improves the speed of data retrieval operations.
  </p>

  <pre>
CREATE INDEX idx_name ON Students(Name);
  </pre>

  <p>
    Without an index, the database scans every record. With an index, it quickly locates data.
  </p>

  <h3> 4. Performance Optimization</h3>
  <ul>
    <li><b>Query Optimization:</b> Writing efficient SQL statements</li>
    <li><b>Indexing:</b> Speeds up searching</li>
    <li><b>Efficient Joins:</b> Reduce processing time</li>
    <li><b>Normalization:</b> Reduces redundancy</li>
  </ul>
  <p>
    These tables are connected using relationships and JOIN queries to retrieve data efficiently.
  </p>

  <h3> Summary</h3>
  <div class="example-box">
    JOIN = Combine tables<br>
    Normalization = Remove duplication<br>
    Index = Speed up searching<br>
    Optimization = Improve performance
  </div>

  <h3> Simple Explanation</h3>
  <p>
    Advanced databases are like highly organized libraries where books are sorted, indexed, and connected for fast retrieval.
  </p>
  `,
  [
    {
      q: "What is a JOIN in databases?",
      hint: "Think combining tables",
      a: "A SQL operation used to combine data from multiple tables.",
      reason: "It allows related data to be retrieved together."
    },
    {
      q: "What does INNER JOIN return?",
      hint: "Think matching data",
      a: "Only matching records from both tables.",
      reason: "It excludes non-matching records."
    },
    {
      q: "What is normalization?",
      hint: "Think data organization",
      a: "Organizing data to reduce duplication.",
      reason: "It improves efficiency and data integrity."
    },
    {
      q: "What is the purpose of indexing?",
      hint: "Think speed",
      a: "To speed up data retrieval.",
      reason: "Indexes allow faster searching in databases."
    },
    {
      q: "What problem does normalization solve?",
      hint: "Think duplication",
      a: "Data redundancy.",
      reason: "It prevents repeated data storage."
    },
    {
      q: "Give a real-life example of a database system.",
      hint: "Think social media",
      a: "Facebook or Instagram database.",
      reason: "They use multiple linked tables to store user data."
    }
  ]
);
/*===============================
Tables & records
===============================*/
add(
  "computer",
  "databases",
  "Tables & Records",
  `<h2>Tables & Records</h2>
  <p>
    A database is an organized collection of related data stored electronically and managed by a
    Database Management System (DBMS) such as MySQL or PostgreSQL.
  </p>
  <h3> Key Idea</h3>
  <p>
    Databases store information in structured formats called tables, making data easy to access, update, and manage.
  </p>

  <h3> 1. Components of a Database System</h3>
  <ul>
    <li><b>Hardware:</b> Physical devices such as servers, storage drives, and memory</li>
    <li><b>Software:</b> DBMS like MySQL, Oracle, PostgreSQL</li>
    <li><b>Data:</b> The actual information stored in the system</li>
    <li><b>Procedures:</b> Rules and instructions for managing data</li>
    <li><b>Users:</b> Database administrators and end users</li>
  </ul>

  <h3> 2. Data Organization in Tables</h3>
  <p>
    Data in a database is stored in tables similar to spreadsheets.
  </p>

  <ul>
    <li><b>Table:</b> A collection of related data</li>
    <li><b>Row (Record):</b> A single complete entry (e.g., one student)</li>
    <li><b>Column (Field):</b> A specific type of data (e.g., Name, Age)</li>
  </ul>

  <h4>Example Table</h4>
  <table border="1">
    <tr><th>ID</th><th>Name</th><th>Age</th></tr>
    <tr><td>101</td><td>Alex</td><td>20</td></tr>
    <tr><td>102</td><td>Mary</td><td>22</td></tr>
  </table>

  <h3> 3. Primary Key</h3>
  <p>
    A primary key is a field that uniquely identifies each record in a table.
  </p>
  <ul>
    <li>Must be unique</li>
    <li>Cannot be empty (NULL)</li>
    <li>Used to avoid duplicate records</li>
  </ul>

  <div class="example-box">
    Example: Student ID = Primary Key
  </div>

  <h3> 4. Importance of Databases</h3>
  <ul>
    <li>Organizes large amounts of data efficiently</li>
    <li>Improves data retrieval and storage</li>
    <li>Reduces duplication of data</li>
    <li>Supports fast decision-making</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    A database is like a digital filing cabinet where information is stored in organized tables.
  </p>
  `,

  [
    {
      q: "What is a database?",
      hint: "Think organized data",
      a: "An organized collection of structured data.",
      reason: "It stores information in a structured format for easy access."
    },
    {
      q: "What is a table in a database?",
      hint: "Think spreadsheet",
      a: "A collection of related data arranged in rows and columns.",
      reason: "Tables store structured data in databases."
    },
    {
      q: "What is a record?",
      hint: "Think row",
      a: "A single row in a table.",
      reason: "It represents one complete data entry."
    },
    {
      q: "What is a field?",
      hint: "Think column",
      a: "A column in a table representing a type of data.",
      reason: "Each field stores a specific attribute."
    },
    { q: "What is a primary key?",
      hint: "Think unique ID",
      a: "A unique identifier for each record.",
      reason: "It ensures no duplicate records exist."
    },

    {
      q: "Give one real-life use of databases.",
      hint: "Think school or bank",
      a: "Storing student records in schools.",
      reason: "Databases help manage large structured information efficiently."
    }
  ]
);
/*=============================
SQL (Structured Query Language)
=============================*/
add(
  "computer",
  "databases",
  "SQL Basics",
  `<h2>SQL (Structured Query Language)</h2>
  <p>
    SQL is a standard programming language used to communicate with databases.
    It allows users to create, retrieve, update, and delete data in a database system.
  </p>
  <h3> Key Idea</h3>
  <p>
    SQL is the language that allows humans to communicate with databases and control stored data.
  </p>

  <h3> 1. Basic SQL Query</h3>
  <p>
    The SELECT statement is used to retrieve data from a database table.
  </p>

  <pre>
SELECT * FROM students;
  </pre>

  <p>
    This command retrieves all records from the "students" table.
  </p>

  <h3> 2. Filtering Data</h3>
  <p>
    The WHERE clause is used to filter records based on conditions.
  </p>

  <pre>
SELECT Name FROM students WHERE ID = 101;
  </pre>

  <p>
    This retrieves only the name of the student with ID 101.
  </p>

  <h3> 3. Common SQL Commands</h3>
  <ul>
    <li><b>SELECT:</b> Retrieves data</li>
    <li><b>INSERT:</b> Adds new data</li>
    <li><b>UPDATE:</b> Modifies existing data</li>
    <li><b>DELETE:</b> Removes data</li>
  </ul>

  <h3> 4. SQL Tools</h3>
  <ul>
    <li><b>Direct SQL:</b> Writing commands manually in a query editor</li>
    <li><b>Form-Based Interfaces:</b> Using applications to input data</li>
    <li><b>Database Tools:</b> phpMyAdmin, MySQL Workbench, Microsoft Access</li>
  </ul>

  <h3> 5. Example Queries</h3>
  <pre>
-- Select specific columns
SELECT Name, Age FROM students;

-- Filter records
SELECT * FROM students WHERE Age > 18;

-- Insert data
INSERT INTO students (Name, Age) VALUES ('John', 20);
  </pre>

  <h3> 6. Importance of SQL</h3>
  <ul>
    <li>Used in almost all modern applications</li>
    <li>Handles large volumes of data efficiently</li>
    <li>Essential for web development and backend systems</li>
    <li>Supports data analysis and reporting</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    SQL is like giving instructions to a librarian so they can find, add, or remove books from a library database.
  </p>
  `,

  [
    {
      q: "What is SQL?",
      hint: "Think database language",
      a: "A language used to communicate with databases.",
      reason: "It allows users to manage and manipulate data."
    },
    {
      q: "What does SELECT do?",
      hint: "Think retrieving data",
      a: "It retrieves data from a database.",
      reason: "SELECT is used to fetch records from tables."
    },
    {
      q: "What is the purpose of WHERE?",
      hint: "Think filtering",
      a: "It filters records based on conditions.",
      reason: "It allows selection of specific data."
    },
    {
      q: "Name one SQL tool.",
      hint: "Think software",
      a: "phpMyAdmin or MySQL Workbench.",
      reason: "These tools help manage databases visually or through SQL."
    },
    {
      q: "What does INSERT do?",
      hint: "Think adding data",
      a: "It adds new data into a table.",
      reason: "INSERT is used to create new records."
    },
    {
      q: "Give one real-life use of SQL.",
      hint: "Think school or bank",
      a: "Managing student records in schools.",
      reason: "SQL is used in systems that handle structured data."
    }
  ]
);
/*============================
CRUD Operations
============================*/
add(
  "computer",
  "databases",
  "CRUD Operations",
  `<h2>CRUD Operations</h2>
  <p>
    CRUD represents the four fundamental operations used to manage data in a database system.
    These operations form the basis of all database interactions and backend systems.
  </p>
  <h3> Key Idea</h3>
  <p>
    CRUD is the foundation of database management, controlling how data is created, accessed, modified, and removed.
  </p>
  <h3> 1. Meaning of CRUD</h3>
  <ul>
    <li><b>Create:</b> Adds new records into a database</li>
    <li><b>Read:</b> Retrieves existing data</li>
    <li><b>Update:</b> Modifies existing records</li>
    <li><b>Delete:</b> Removes records from a database</li>
  </ul>
  <h3> 2. CRUD and SQL Mapping</h3>
  <h4>Create (INSERT)</h4>
  <pre>
INSERT INTO Students (ID, Name) VALUES (101, 'Alex');
  </pre>
  <h4>Read (SELECT)</h4>
  <pre>
SELECT Name FROM Students WHERE ID = 101;
  </pre>
  <h4>Update</h4>
  <pre>
UPDATE Students SET Name = 'Alexander' WHERE ID = 101;
  </pre>
  <h4>Delete</h4>
  <pre>
DELETE FROM Students WHERE ID = 101;
  </pre>
  <h3> 3. Database Integrity Rules</h3>
  <ul>
    <li><b>Data Type Validation:</b> Ensures correct data formats are used</li>
    <li><b>Referential Integrity:</b> Maintains relationships between related tables</li>
    <li><b>Primary Key Constraint:</b> Ensures uniqueness of records</li>
  </ul>
  <h3> 4. Importance of CRUD</h3>
  <ul>
    <li>Forms the core of all database operations</li>
    <li>Used in every application that stores data</li>
    <li>Ensures structured and controlled data management</li>
    <li>Supports backend system development</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    CRUD is like managing a notebook: you can write new information, read it, edit it, or erase it when no longer needed.
  </p>
  `,

  [
    {
      q: "What does CRUD stand for?",
      hint: "Think database operations",
      a: "Create, Read, Update, Delete",
      reason: "These are the four basic database operations."
    },
    {
      q: "What does CREATE do?",
      hint: "Think adding data",
      a: "It adds new data to a database.",
      reason: "CREATE is used to insert new records."
    },
    {
      q: "What does READ do?",
      hint: "Think retrieving data",
      a: "It retrieves data from a database.",
      reason: "READ allows users to view stored data."
    },
    {
      q: "Which SQL command is used for UPDATE?",
      hint: "Think modify",
      a: "UPDATE",
      reason: "It changes existing records in a table."
    },
    {
      q: "What does DELETE do?",
      hint: "Think removal",
      a: "It removes data from a database.",
      reason: "DELETE deletes records permanently."
    },
    {
      q: "Give one real-life use of CRUD.",
      hint: "Think school or banking",
      a: "Managing student records in schools.",
      reason: "CRUD operations are used in all database systems."
    }
  ]
);
/*===========================
Relational databases
===========================*/
add(
  "computer",
  "databases",
  "Relational Databases",
  `<h2>Relational Databases</h2>
  <p>
    A relational database is a type of database that stores data in multiple tables that are linked together using relationships.
    This structure reduces duplication and improves data organization and efficiency.
  </p>
  <h3> Key Idea</h3>
  <p>
    Relational databases store data in separate tables and connect them using keys to ensure efficiency and avoid duplication.
  </p>
  <h3> 1. Why Relationships Matter</h3>
  <p>
    Instead of storing all data in one large table, relational databases divide data into smaller tables and link them.
  </p>
  <div class="example-box">
    Students Table → student details<br>
    Courses Table → course details<br>
    Enrollments Table → links students and courses
  </div>
  <h3> 2. Types of Relationships</h3>
  <h4>One-to-One (1:1)</h4>
  <p>One record in a table is linked to one record in another table.</p>
  <div class="example-box">
    Example: One student → One ID card
  </div>
  <h4>One-to-Many (1:M)</h4>
  <p>One record in a table is linked to many records in another table.</p>
  <div class="example-box">
    Example: One teacher → Many students
  </div>
  <h4>Many-to-Many (M∞M)</h4>
  <p>Many records in one table are linked to many records in another table.</p>
  <div class="example-box">
    Example: Students ↔ Courses
  </div>
  <h3> 3. Primary Key</h3>
  <p>
    A primary key is a unique identifier for each record in a table.
  </p>
  <pre>
Students Table
ID | Name
101 | Alex
102 | Jane
  </pre>

  <h3> 4. Foreign Key</h3>
  <p>
    A foreign key is a field in one table that refers to the primary key in another table.
  </p>

  <pre>
Enrollments Table
StudentID | CourseID
101       | 501
  </pre>

  <h3> 5. Example Database Structure</h3>
  <pre>
Students
ID | Name

Courses
CourseID | CourseName

Enrollments
StudentID | CourseID
  </pre>

  <h3> 6. SQL Example (Relationships)</h3>
  <pre>
CREATE TABLE Students (
  ID INT PRIMARY KEY,
  Name VARCHAR(50)
);

CREATE TABLE Courses (
  CourseID INT PRIMARY KEY,
  CourseName VARCHAR(50)
);

CREATE TABLE Enrollments (
  StudentID INT,
  CourseID INT,
  FOREIGN KEY (StudentID) REFERENCES Students(ID),
  FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);
  </pre>

  <h3> 7. Referential Integrity</h3>
  <ul>
    <li>Ensures relationships between tables remain valid</li>
    <li>Prevents invalid foreign key entries</li>
    <li>Stops deletion of linked records</li>
  </ul>

  <h3> 8. Importance of Relational Databases</h3>
  <ul>
    <li>Reduces data duplication</li>
    <li>Improves data accuracy and consistency</li>
    <li>Allows complex queries across multiple tables</li>
    <li>Makes data management scalable</li>
  </ul>

  <h3> Simple Explanation</h3>
  <p>
    A relational database is like a network of linked notebooks where each notebook stores a different type of information, but all are connected.
  </p>
  `,

  [
    {
      q: "What is a relational database?",
      hint: "Think linked tables",
      a: "A database with tables that are related to each other.",
      reason: "It organizes data into connected tables."
    },
    {
      q: "What is a primary key?",
      hint: "Think unique ID",
      a: "A field that uniquely identifies each record.",
      reason: "It ensures no duplicate records exist."
    },
    {
      q: "What is a foreign key?",
      hint: "Think linking field",
      a: "A field that links one table to another.",
      reason: "It connects related tables together."
    },
    {
      q: "Give one type of database relationship.",
      hint: "Think 1:1 or 1:M",
      a: "One-to-many relationship.",
      reason: "One record can be linked to many others."
    },
    {
      q: "Why are relational databases important?",
      hint: "Think efficiency",
      a: "They reduce duplication and improve data organization.",
      reason: "Data is stored in structured linked tables."
    },
    {
      q: "Give a real-life example of relational databases.",
      hint: "Think school system",
      a: "School student-course enrollment system.",
      reason: "Students and courses are stored in separate linked tables."
    }
  ]
);
/*===========================
Transactions & ACID Properties
===========================*/
add(
  "computer",
  "databases",
  "Transactions & ACID Properties",
  `<h2>Transactions & ACID Properties</h2>
  <p>
    A transaction is a sequence of database operations that are executed as a single logical unit of work.
    Either all operations succeed, or none are applied.
  </p>
  <h3> Key Idea</h3>
  <p>
    Transactions ensure that database operations are reliable, consistent, and safe even when errors occur.
  </p>

  <h3> 1. Example of a Transaction</h3>
  <div class="example-box">
    Bank Transfer System:<br>
    Step 1: Deduct money from Account A<br>
    Step 2: Add money to Account B
  </div>

  <p>
    If any step fails, the entire transaction is canceled to prevent data errors.
  </p>

  <h3> 2. ACID Properties</h3>

  <h4> Atomicity</h4>
  <p>
    Ensures that all operations in a transaction succeed together or fail together.
  </p>

  <h4> Consistency</h4>
  <p>
    Ensures the database remains in a valid state before and after the transaction.
  </p>

  <h4> Isolation</h4>
  <p>
    Ensures multiple transactions do not interfere with each other when executed at the same time.
  </p>

  <h4> Durability</h4>
  <p>
    Once a transaction is committed, changes are permanent even after system failure.
  </p>

  <h3> 3. Transaction States</h3>
  <ul>
    <li><b>Begin:</b> Transaction starts</li>
    <li><b>Commit:</b> Saves all changes permanently</li>
    <li><b>Rollback:</b> Cancels changes and restores previous state</li>
  </ul>

  <h3> 4. SQL Transaction Example</h3>

  <pre>
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
  </pre>
  <p>
    If an error occurs before COMMIT, the system can perform a ROLLBACK.
  </p>
  <h3> 5. Importance of Transactions</h3>
  <ul>
    <li>Prevents data corruption</li>
    <li>Ensures accurate financial systems</li>
    <li>Maintains data integrity</li>
    <li>Supports multi-user systems safely</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    A transaction is like a full mission: either everything is completed successfully, or nothing is saved.
  </p>
  `,

  [
    {
      q: "What is a transaction in databases?",
      hint: "Think group of operations",
      a: "A sequence of operations treated as a single unit.",
      reason: "It ensures all operations succeed or fail together."
    },
    {
      q: "What does ACID stand for?",
      hint: "Think reliability rules",
      a: "Atomicity, Consistency, Isolation, Durability",
      reason: "These define reliable database behavior."
    },
    {
      q: "What is atomicity?",
      hint: "Think all or nothing",
      a: "All operations must succeed or all must fail.",
      reason: "Prevents partial updates."
    },
    {
      q: "What does COMMIT do?",
      hint: "Think save",
      a: "It permanently saves changes in a database.",
      reason: "Finalizes a transaction."
    },
    {
      q: "What is rollback?",
      hint: "Think undo",
      a: "It cancels a transaction and restores previous data.",
      reason: "Used when errors occur."
    },
    {
      q: "Give one real-life use of transactions.",
      hint: "Think banking",
      a: "Bank money transfer systems.",
      reason: "Ensures money is not lost or duplicated."
    }
  ]
);
/*===============================
NoSQL Databases (MongoDB Concept)
=================================*/
add(
  "computer",
  "databases",
  "NoSQL Databases (MongoDB Concept)",
  `<h2>NoSQL Databases (MongoDB Concept)</h2>
  <p>
    NoSQL databases are non-relational databases designed to store large volumes of unstructured or semi-structured data.
    They are commonly used in modern applications that require flexibility and high scalability.
  </p>
  <h3> Key Idea</h3>
  <p>
    NoSQL databases are designed for speed, flexibility, and scalability rather than strict table structures.
  </p>
  <h3> 1. Why NoSQL?</h3>
  <ul>
    <li>Handles large-scale and big data systems</li>
    <li>Flexible schema (no fixed table structure)</li>
    <li>High performance for real-time applications</li>
    <li>Suitable for modern web and mobile apps</li>
  </ul>
  <h3> 2. Types of NoSQL Databases</h3>
  <ul>
    <li><b>Document-based:</b> MongoDB (stores JSON-like documents)</li>
    <li><b>Key-value:</b> Redis (stores data as key-value pairs)</li>
    <li><b>Column-based:</b> Cassandra (stores data in columns)</li>
    <li><b>Graph-based:</b> Neo4j (stores relationships between data)</li>
  </ul>
  <h3> 3. MongoDB Structure</h3>
  <ul>
    <li><b>Database:</b> Top-level container</li>
    <li><b>Collection:</b> Group of documents (like a table)</li>
    <li><b>Document:</b> Individual record stored in JSON format</li>
  </ul>
  <h3> 4. Example MongoDB Document</h3>
  <pre>
{
  "name": "Alex",
  "age": 20,
  "course": "Computer Science"
}
  </pre>
  <h3> 5. SQL vs NoSQL Comparison</h3>
  <table>
    <tr>
      <th>Feature</th>
      <th>SQL</th>
      <th>NoSQL</th>
    </tr>
    <tr>
      <td>Structure</td>
      <td>Fixed tables</td>
      <td>Flexible documents</td>
    </tr>
    <tr>
      <td>Schema</td>
      <td>Rigid</td>
      <td>Dynamic</td>
    </tr>
    <tr>
      <td>Scalability</td>
      <td>Vertical scaling</td>
      <td>Horizontal scaling</td>
    </tr>
    <tr>
      <td>Examples</td>
      <td>MySQL, PostgreSQL</td>
      <td>MongoDB, Redis</td>
    </tr>
  </table>
  <h3> 6. Importance of NoSQL</h3>
  <ul>
    <li>Supports big data applications</li>
    <li>Used in social media platforms</li>
    <li>Handles real-time analytics</li>
    <li>Improves performance in large systems</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    NoSQL databases are like flexible digital storage systems that can store different types of data without strict rules.
  </p>
  `,

  [
    {
      q: "What is a NoSQL database?",
      hint: "Think flexible data storage",
      a: "A non-relational database with flexible structure.",
      reason: "It does not use fixed tables like SQL."
    },
    {
      q: "What is MongoDB?",
      hint: "Think documents",
      a: "A document-based NoSQL database.",
      reason: "It stores data in JSON-like documents."
    },
    {
      q: "What is a collection in MongoDB?",
      hint: "Think table",
      a: "A group of related documents.",
      reason: "Similar to a table in SQL databases."
    },
    {
      q: "What is the main difference between SQL and NoSQL?",
      hint: "Think structure",
      a: "SQL uses fixed tables, NoSQL uses flexible structure.",
      reason: "They store and organize data differently."
    },
    {
      q: "Give one advantage of NoSQL databases.",
      hint: "Think speed or flexibility",
      a: "High scalability and flexibility.",
      reason: "It handles large and dynamic data efficiently."
    },
    {
      q: "Give one real-life use of NoSQL.",
      hint: "Think social media",
      a: "Social media platforms like Facebook.",
      reason: "They handle huge, unstructured user data."
    }
  ]
);
/*====================================
BACKUP AND RECOVERY
====================================*/
add(
  "computer",
  "databases",
  "Backup & Recovery Strategies",
  `<h2>Backup & Recovery Strategies</h2>

<p><b>Backup</b> is creating copies of data, while <b>recovery</b> is restoring data after loss or failure.</p>
<h3>1. Why Backup is Important</h3>
<ul>
<li>Prevents data loss</li>
<li>Protects against system failure</li>
<li>Helps recover from cyber attacks</li>
</ul>
<h3>2. Types of Backups</h3>

<h4>Full Backup</h4>
<p>Copies all data.</p>
<h4>Incremental Backup</h4>
<p>Copies only changes since last backup.</p>
<h4>Differential Backup</h4>
<p>Copies changes since last full backup.</p>
<h3>3. Recovery Methods</h3>
<ul>
<li><b>Restore:</b> Recover from backup</li>
<li><b>Point-in-time recovery:</b> Restore to a specific time</li>
</ul>
<h3>4. Backup Strategies</h3>
<ul>
<li>Regular backups (daily/weekly)</li>
<li>Store backups offsite/cloud</li>
<li>Use multiple backup copies</li>
</ul>
<h3>5. The 3-2-1 Rule</h3>
<ul>
<li>3 copies of data</li>
<li>2 different storage types</li>
<li>1 offsite copy</li>
</ul>
<div class="example-box">
Laptop crash → restore from cloud backup → data recovered
</div>

<div class="keyfact">
 Backup + Recovery = Data survival strategy.
</div>
`,
[
{
q:"What is backup?",
a:"Creating copies of data.",
hint:"Save duplicates",
reason:"Prevents data loss."
},
{
q:"What is recovery?",
a:"Restoring lost data.",
hint:"Bring data back",
reason:"Used after failure."
},
{
q:"What is the 3-2-1 rule?",
a:"3 copies, 2 storage types, 1 offsite.",
hint:"Backup strategy rule",
reason:"Ensures maximum data safety."
}
]
);

/*=============================
Uses of networks
=============================*/
add(
  "computer",
  "networking",
  "Why Networks are Used",
  `<h2>Why Networks are Used</h2>
  <p>
    Computer networks are used to connect devices so that they can share resources, communicate,
    and exchange data efficiently.
  </p>
  <h3> Key Idea</h3>
  <p>
    Networks allow computers to work together, making systems faster, cheaper, and more efficient.
  </p>
  <h3> Reasons for Using Networks</h3>
  <ul>
    <li><b>Resource Sharing:</b> Multiple users can share printers, software, and storage devices</li>
    <li><b>Data Sharing:</b> Files and databases can be accessed by many users</li>
    <li><b>Communication:</b> Enables email, video calls, and instant messaging</li>
    <li><b>Cost Efficiency:</b> Reduces cost by sharing hardware and software</li>
    <li><b>Backup & Reliability:</b> Central storage allows easy data backup and recovery</li>
  </ul>

  <h3> Importance of Networking</h3>
  <ul>
    <li>Improves teamwork and collaboration</li>
    <li>Increases efficiency in organizations</li>
    <li>Reduces duplication of resources</li>
    <li>Supports global communication systems</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    Networks are like teamwork systems where many computers share tools and information instead of working alone.
  </p>
  `,

  [
    {
      q: "Why are computer networks used?",
      hint: "Think sharing and communication",
      a: "For sharing resources and communication.",
      reason: "Networks allow devices to work together efficiently."
    },
    {
      q: "Give one example of resource sharing.",
      hint: "Think printer or files",
      a: "Sharing a printer in a school lab.",
      reason: "Many users can use one device through a network."
    },
    {
      q: "What is data sharing in networks?",
      hint: "Think files",
      a: "Exchanging files and information between users.",
      reason: "Networks allow easy access to shared data."
    },
    {
      q: "State one advantage of communication in networks.",
      hint: "Think speed",
      a: "It allows fast communication.",
      reason: "People can send messages instantly over networks."
    },
    {
      q: "What is one benefit of central storage?",
      hint: "Think backup",
      a: "Easy backup and recovery of data.",
      reason: "Central systems make data management more efficient."
    },
    {
      q: "Give one real-life use of networks.",
      hint: "Think office or school",
      a: "Employees sharing company files.",
      reason: "Networks improve collaboration in organizations."
    }
  ]
);
/*=============================
LAN, MAN, WAN, PAN comparison
==============================*/
add(
  "computer",
  "networking",
  "LAN, MAN, WAN, PAN Comparison",
  `<h2>LAN, MAN, WAN, PAN Comparison</h2>
  <p>
    Computer networks are classified based on their geographical coverage and size.
    Each type serves different communication needs depending on distance and scale.
  </p>
  <h3> Key Idea</h3>
  <p>
    Networks are classified by how far devices are spread—from personal devices (PAN) to global networks (WAN).
  </p>
  <h3> Types of Networks</h3>
  <ul>
    <li><b>PAN (Personal Area Network):</b> Very small network for personal devices like Bluetooth connections</li>
    <li><b>LAN (Local Area Network):</b> Covers a small area like a school, office, or home</li>
    <li><b>MAN (Metropolitan Area Network):</b> Covers a city or large town</li>
    <li><b>WAN (Wide Area Network):</b> Covers large geographical areas including countries and continents</li>
  </ul>
  <h3> Comparison Summary</h3>
  <table>
    <tr>
      <th>Type</th>
      <th>Coverage</th>
      <th>Example</th>
    </tr>
    <tr>
      <td>PAN</td>
      <td>Very small (personal)</td>
      <td>Bluetooth between phone and headset</td>
    </tr>
    <tr>
      <td>LAN</td>
      <td>Small area</td>
      <td>School computer lab</td>
    </tr>
    <tr>
      <td>MAN</td>
      <td>City/town</td>
      <td>City internet network</td>
    </tr>
    <tr>
      <td>WAN</td>
      <td>Global</td>
      <td>Internet</td>
    </tr>
  </table>
  <h3> Importance of Network Types</h3>
  <ul>
    <li>Helps organize communication systems</li>
    <li>Improves data sharing efficiency</li>
    <li>Determines network cost and design</li>
    <li>Supports different levels of connectivity</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    These networks are like circles of communication: PAN is your personal circle,
    LAN is your building, MAN is your city, and WAN is the whole world.
  </p>
  `,

  [
    {
      q: "What is PAN?",
      hint: "Think personal devices",
      a: "A small network for personal devices.",
      reason: "It connects devices like phones and headphones."
    },
    {
      q: "Which network covers the largest area?",
      hint: "Think global",
      a: "WAN",
      reason: "WAN covers countries and continents."
    },
    {
      q: "Give one example of LAN.",
      hint: "Think school",
      a: "School computer lab network.",
      reason: "LAN covers a small local area like schools or offices."
    },
    {
      q: "What does MAN stand for?",
      hint: "Think city network",
      a: "Metropolitan Area Network",
      reason: "It covers a city or large town."
    },
    {
      q: "What is the best example of WAN?",
      hint: "Think internet",
      a: "The Internet",
      reason: "WAN connects computers globally."
    },
    {
      q: "Arrange PAN, LAN, WAN in order of size.",
      hint: "Think smallest to largest",
      a: "PAN → LAN → MAN → WAN",
      reason: "Networks are classified from personal to global scale."
    }
  ]
);
/*=============================
Network Topologies
==============================*/
add(
  "computer",
  "networking",
  "Network Topologies",
  `<h2>Network Topologies</h2>
  <p>
    Network topology refers to the physical or logical arrangement of computers and devices in a network.
    It shows how devices are connected and how data flows between them.
  </p>
  <h3> Key Idea</h3>
  <p>
    Network topology determines how computers are arranged and how they communicate in a network.
  </p>
  <h3> Types of Network Topologies</h3>
  <h3>1. Bus Topology</h3>
  <ul>
    <li>All devices are connected to a single backbone cable</li>
    <li>Data travels in both directions along the cable</li>
    <li>Easy to install but performance reduces with many devices</li>
  </ul>
  <h3>2. Star Topology</h3>
  <ul>
    <li>All devices connect to a central device (hub or switch)</li>
    <li>Most commonly used in schools and offices</li>
    <li>If one device fails, others are not affected</li>
  </ul>
  <h3>3. Ring Topology</h3>
  <ul>
    <li>Devices are connected in a circular format</li>
    <li>Data travels in one direction or both directions</li>
    <li>A failure in one device can affect the entire network</li>
  </ul>
  <h3>4. Mesh Topology</h3>
  <ul>
    <li>Every device is connected to every other device</li>
    <li>Highly reliable and fault-tolerant</li>
    <li>Expensive and complex to install</li>
  </ul>
  <h3> Comparison Summary</h3>
  <ul>
    <li><b>Bus:</b> Simple but slow with many users</li>
    <li><b>Star:</b> Reliable and most commonly used</li>
    <li><b>Ring:</b> Moderate performance but less fault-tolerant</li>
    <li><b>Mesh:</b> Most reliable but expensive</li>
  </ul>
  <h3> Advantages of Topologies</h3>
  <ul>
    <li>Help organize network structure</li>
    <li>Improve communication efficiency</li>
    <li>Allow easy troubleshooting depending on type</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    Network topology is like the layout of a city showing how roads (connections) link buildings (computers).
  </p>
  `,

  [
    {
      q: "What is network topology?",
      hint: "Think arrangement of computers",
      answer: "The arrangement of computers in a network.",
      reason: "It shows how devices are connected and communicate."
    },
    {
      q: "Which topology uses a central device?",
      hint: "Think star shape",
      answer: "Star topology",
      reason: "All devices connect to a central hub or switch."
    },
    {
      q: "Which topology is most reliable?",
      hint: "Think full connection",
      answer: "Mesh topology",
      reason: "Every device is connected to every other device."
    },
    {
      q: "Give one disadvantage of bus topology.",
      hint: "Think performance",
      answer: "It becomes slow when many devices are connected.",
      reason: "All devices share a single backbone cable."
    },
    {
      q: "Where is star topology commonly used?",
      hint: "Think education",
      answer: "Schools and offices",
      reason: "It is easy to manage and reliable."
    },
    {
      q: "Give a real-life example of mesh topology use.",
      hint: "Think critical systems",
      answer: "Military communication networks",
      reason: "Mesh provides high reliability and fault tolerance."
    }
  ]
);
/*=============================
Transmission media
==============================*/
add(
  "computer",
  "networking",
  "Transmission Media",
  `<h2>Transmission Media</h2>
  <p>
    Transmission media refers to the physical or wireless pathways through which data is transmitted
    from one device to another in a network.
  </p>
  <h3> Key Idea</h3>
  <p>
    Transmission media are the communication channels that allow data to travel between devices either through cables or wireless signals.
  </p>
  <h3> Types of Transmission Media</h3>
  <h3>1. Guided (Wired) Media</h3>
  <p>Data is transmitted through physical cables.</p>
  <ul>
    <li><b>Twisted Pair Cable:</b> Common in telephone and Ethernet networks</li>
    <li><b>Coaxial Cable:</b> Used in cable TV and broadband</li>
    <li><b>Fiber Optic Cable:</b> Fastest transmission, uses light signals</li>
  </ul>
  <h3>2. Unguided (Wireless) Media</h3>
  <p>Data is transmitted through air without cables.</p>
  <ul>
    <li><b>Radio Waves:</b> Used in Wi-Fi, Bluetooth, mobile phones</li>
    <li><b>Microwaves:</b> Require line-of-sight communication</li>
    <li><b>Satellites:</b> Provide global communication coverage</li>
  </ul>
  <h3> Comparison</h3>
  <ul>
    <li><b>Wired:</b> More stable, faster, but less flexible</li>
    <li><b>Wireless:</b> Flexible and mobile, but may suffer interference</li>
  </ul>
  <h3> Importance of Transmission Media</h3>
  <ul>
    <li>Enables data communication between devices</li>
    <li>Supports internet connectivity</li>
    <li>Allows sharing of resources</li>
    <li>Enables global communication systems</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    Transmission media are like roads or invisible air paths that allow data to travel between computers.
  </p>
  `,

  [
    {
      q: "What is transmission media?",
      hint: "Think data path",
      a: "A medium used to transmit data between devices.",
      reason: "It provides the channel for data communication."
    },
    {
      q: "Give two types of transmission media.",
      hint: "Think wired and wireless",
      a: "Guided (wired) and unguided (wireless)",
      reason: "Transmission media are classified based on whether they use cables or not."
    },
    {
      q: "What is the fastest transmission medium?",
      hint: "Think fiber",
      a: "Fiber optic cable",
      reason: "It uses light signals which travel very fast."
    },
    {
      q: "What type of waves does Wi-Fi use?",
      hint: "Think wireless signals",
      a: "Radio waves",
      reason: "Wi-Fi communicates using electromagnetic radio waves."
    },
    {
      q: "State one advantage of wireless transmission.",
      hint: "Think mobility",
      a: "It allows mobility and flexibility.",
      reason: "Users can connect without physical cables."
    },
    {
      q: "Give one real-life example of fiber optic use.",
      hint: "Think internet providers",
      a: "Internet service providers use fiber optic cables.",
      reason: "They provide high-speed internet connections."
    }
  ]
);
/*=============================
IP Addressing
=============================*/
add(
  "computer",
  "networking",
  "IP Addressing",
  `<h2>IP Addressing</h2>
  <p>
    An IP (Internet Protocol) address is a unique numerical label assigned to each device connected to a network.
    It allows devices to identify and communicate with each other.
  </p>
  <h3> Key Idea</h3>
  <p>
    An IP address is like a digital home address that allows data to reach the correct device on a network.
  </p>

  <h3> Structure of IPv4</h3>
  <p>
    IPv4 is a 32-bit address divided into four parts called octets. Each octet is separated by a dot.
  </p>

  <div class="example-box">
    Example: 192.168.1.1
  </div>

  <ul>
    <li>Each part is called an <b>octet</b></li>
    <li>Each octet ranges from 0 to 255</li>
    <li>Total = 4 octets = 32 bits</li>
  </ul>

  <h3> Binary Representation</h3>
  <p>
    Each octet is made up of 8 binary digits (bits).
  </p>

  <pre>
192 → 11000000
168 → 10101000
1   → 00000001
1   → 00000001
  </pre>

  <h3> Types of IP Addresses</h3>
  <ul>
    <li><b>Private IP:</b> Used inside local networks (e.g., home Wi-Fi, school lab)</li>
    <li><b>Public IP:</b> Used on the internet and assigned by ISP</li>
  </ul>

  <h3> Static vs Dynamic IP</h3>
  <ul>
    <li><b>Static IP:</b> Does not change over time</li>
    <li><b>Dynamic IP:</b> Changes automatically using DHCP</li>
  </ul>

  <h3> Importance of IP Addressing</h3>
  <ul>
    <li>Identifies devices on a network</li>
    <li>Ensures correct data delivery</li>
    <li>Enables internet communication</li>
    <li>Supports network organization</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    An IP address is like a house number for a device so that data knows exactly where to go.
  </p>
  `,

  [
    {
      q: "What is an IP address?",
      hint: "Think device identity",
      a: "A unique identifier for a device on a network.",
      reason: "It allows devices to communicate correctly over a network."
    },
    {
      q: "How many bits make up IPv4?",
      hint: "Think total structure",
      a: "32 bits.",
      reason: "IPv4 is divided into four 8-bit sections (octets)."
    },
    {
      q: "What is an octet?",
      hint: "Think IP sections",
      a: "A group of 8 bits in an IP address.",
      reason: "Each IPv4 address has four octets."
    },
    {
      q: "Give one difference between public and private IP.",
      hint: "Think usage location",
      a: "Private IP is used in local networks, public IP is used on the internet.",
      reason: "Private IPs are internal while public IPs are external."
    },
    {
      q: "What is a static IP?",
      hint: "Think fixed address",
      a: "An IP address that does not change.",
      reason: "It remains constant unless manually changed."
    },
    {
      q: "Give a real-life example of IP usage.",
      hint: "Think Wi-Fi or internet",
      a: "A phone connected to Wi-Fi using a private IP.",
      reason: "Devices on local networks are assigned private IPs."
    }
  ]
);
/*=============================
DNS (Domain Name System)
=============================*/
add(
  "computer",
  "networking",
  "DNS (Domain Name System)",
  `<h2>DNS (Domain Name System)</h2>
  <p>
    DNS (Domain Name System) is a system that translates human-readable domain names
    (like google.com) into machine-readable IP addresses that computers use to identify each other on a network.
  </p>
  <h3> Key Idea</h3>
  <p>
    DNS acts like the internet’s phonebook by converting easy-to-remember names into IP addresses that computers understand.
  </p>

  <h3> Why DNS is Needed</h3>
  <p>
    Computers communicate using numbers (IP addresses), but humans prefer names.
    DNS bridges this gap.
  </p>

  <div class="example-box">
    google.com → 142.250.190.78<br>
    facebook.com → 157.240.229.35
  </div>

  <h3> How DNS Works (Step-by-Step)</h3>
  <ol>
    <li>User types a website name in the browser</li>
    <li>The request is sent to a DNS server</li>
    <li>The DNS server looks up the matching IP address</li>
    <li>The IP address is sent back to the browser</li>
    <li>The browser connects to the website server</li>
  </ol>

  <h3> Key Components</h3>
  <ul>
    <li><b>Domain Name:</b> Human-friendly website name (e.g., google.com)</li>
    <li><b>IP Address:</b> Numerical address used by computers</li>
    <li><b>DNS Server:</b> Stores and manages domain-to-IP mappings</li>
  </ul>

  <h3> Importance of DNS</h3>
  <ul>
    <li>Makes internet easier to use</li>
    <li>Eliminates need to memorize IP addresses</li>
    <li>Speeds up website access</li>
    <li>Supports global internet communication</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    DNS is like a contact list in your phone: you type a name, and it finds the number automatically.
  </p>
  `,

  [
    {
      q: "What is DNS?",
      hint: "Think internet phonebook",
      a: "A system that converts domain names into IP addresses.",
      reason: "Computers use IP addresses while humans use names."
    },
    {
      q: "Why is DNS important?",
      hint: "Think user convenience",
      a: "It allows users to use website names instead of IP addresses.",
      reason: "Names are easier to remember than numbers."
    },
    {
      q: "What does a DNS server do?",
      hint: "Think lookup system",
      a: "It stores and provides domain name to IP address mappings.",
      reason: "It helps translate names into computer-readable addresses."
    },
    {
      q: "Give one example of a domain name.",
      hint: "Think websites",
      a: "google.com",
      reason: "Domain names represent websites on the internet."
    },
    {
      q: "What happens after DNS finds an IP address?",
      hint: "Think connection step",
      a: "The browser connects to the website server.",
      reason: "The IP address is used to reach the correct server."
    },
    {
      q: "Give a real-life analogy of DNS.",
      hint: "Think contacts or phonebook",
      a: "A phone contact list.",
      reason: "Names are used to find numbers easily."
    }
  ]
);
/*=====================================
Client server Model
=====================================*/
add(
  "computer",
  "networking",
  "Client-Server Model",
  `<h2>Client-Server Model</h2>
  <p>
    The client-server model is a network structure where computers are divided into two roles:
    clients that request services and servers that provide those services.
  </p>
  <h3> Key Idea</h3>
  <p>
    In a client-server network, one central system (server) provides resources while other computers (clients)
    request and use those resources.
  </p>

  <h3> Components</h3>
  <ul>
    <li><b>Client:</b> A device or program that requests services (e.g., web browser)</li>
    <li><b>Server:</b> A powerful computer that provides services, data, or resources</li>
  </ul>

  <h3> How It Works</h3>
  <ol>
    <li>The client sends a request (e.g., opening a website)</li>
    <li>The server receives and processes the request</li>
    <li>The server sends back the required response/data</li>
  </ol>

  <h3> Example</h3>
  <div class="example-box">
    • A web browser (client) requests a webpage<br>
    • The web server processes the request<br>
    • The server sends the webpage back to the browser
  </div>

  <h3> Advantages of Client-Server Model</h3>
  <ul>
    <li>Centralized control of data and resources</li>
    <li>Improved security and data protection</li>
    <li>Easier backup and maintenance</li>
    <li>Efficient resource sharing</li>
  </ul>

  <h3> Disadvantages</h3>
  <ul>
    <li>Expensive to set up and maintain</li>
    <li>Depends heavily on the server (if it fails, network stops)</li>
    <li>Requires skilled administration</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    The client-server model is like ordering food in a restaurant:
    you (client) request, and the kitchen (server) prepares and serves your order.
  </p>
  `,

  [
    {
  q: "A student uses a web browser to access Google Search. Identify the client and the server in this interaction.",
  hint: "Think request and response system",
  a: "Client: the web browser/computer; Server: Google servers",
  reason: "In a client-server model, the client sends a request while the server processes and responds with data."
},

{
  q: "A school uses a centralized system to store student records. Explain why this is a client-server network and give one advantage.",
  hint: "Think central storage",
  a: "Because data is stored on a central server; advantage: easy data management",
  reason: "Client-server networks store and manage data centrally, making it easier to control and secure information."
},

{
  q: "A server becomes overloaded and stops responding to requests from users. Explain the impact on the network.",
  hint: "Think service failure",
  a: "Users cannot access services or data",
  reason: "In a client-server network, clients depend on the server, so failure disrupts all services."
},

{
  q: "A student logs into an online learning platform. Explain the role of the client and server during login.",
  hint: "Think authentication process",
  a: "Client sends login details; server verifies and grants access",
  reason: "The client submits credentials and the server checks them before allowing access."
},

{
  q: "State one difference between a client and a server in a network.",
  hint: "Think request vs service",
  a: "A client requests services while a server provides services.",
  reason: "Clients initiate communication, while servers respond and manage resources."
},

{
  q: "Give a real-life example of a client-server system and explain it.",
  hint: "Think websites or apps",
  a: "Online banking; users request services from a bank server",
  reason: "In online banking, users (clients) interact with a central server that processes transactions and provides data securely."
}
  ]
);
/*==================================
Peer-to-peer Networks
==================================*/
add(
  "computer",
  "networking",
  "Peer-to-Peer Networks",
  `<h2>Peer-to-Peer (P2P) Networks</h2>
  <p>
    A peer-to-peer (P2P) network is a type of network where all computers are equal.
    Each computer (node) can act as both a client (requesting data) and a server (providing data).
  </p>
  <h3> Key Idea</h3>
  <p>
    In a peer-to-peer network, there is no central server; all computers share resources directly with each other.
  </p>

  <h3> Characteristics of P2P Networks</h3>
  <ul>
    <li>No central server controlling the network</li>
    <li>All computers have equal status</li>
    <li>Each device can share files and resources</li>
    <li>Simple to install and manage</li>
  </ul>

  <h3> Example of P2P Network</h3>
  <div class="example-box">
    • Sharing files directly between two computers using a USB network connection or LAN without a server
  </div>

  <h3> Advantages of P2P Networks</h3>
  <ul>
    <li>Easy to set up</li>
    <li>Low installation cost</li>
    <li>No need for a dedicated server</li>
    <li>Useful for small networks</li>
  </ul>

  <h3> Disadvantages of P2P Networks</h3>
  <ul>
    <li>Less secure compared to client-server networks</li>
    <li>Difficult to manage in large networks</li>
    <li>No central backup system</li>
    <li>Performance may slow down with many users</li>
  </ul>

  <h3> Comparison: P2P vs Client-Server</h3>
  <table>
    <tr>
      <th>Feature</th>
      <th>P2P Network</th>
      <th>Client-Server Network</th>
    </tr>
    <tr>
      <td>Control</td>
      <td>Decentralized</td>
      <td>Centralized</td>
    </tr>
    <tr>
      <td>Security</td>
      <td>Lower</td>
      <td>Higher</td>
    </tr>
    <tr>
      <td>Cost</td>
      <td>Low</td>
      <td>High</td>
    </tr>
    <tr>
      <td>Setup</td>
      <td>Simple</td>
      <td>Complex</td>
    </tr>
  </table>
  <h3> Simple Explanation</h3>
  <p>
    A peer-to-peer network is like a group of friends sharing things directly with each other
    without a boss controlling everything.
  </p>
  `,
  [
    {
  q: "A small office shares files directly between computers without using a central server. Identify the type of network being used and give one characteristic.",
  hint: "Think no central control",
  a: "Peer-to-peer (P2P) network; no central server",
  reason: "In a P2P network, all computers act as equals and share resources directly without a dedicated server."
},

{
  q: "A school decides to use a P2P network instead of a client-server system to reduce costs. State one advantage and one disadvantage of this decision.",
  hint: "Think cost vs security",
  a: "Advantage: low cost; Disadvantage: less secure",
  reason: "P2P networks are cheap to set up but lack centralized security and control."
},

{
  q: "In a P2P network, one computer is infected with a virus. Explain how this can affect other computers in the network.",
  hint: "Think direct sharing",
  a: "The virus can spread to other computers",
  reason: "Since devices share files directly, malware can easily spread across the network."
},

{
  q: "A student uses Bluetooth to send files to another phone. Explain why this is considered a P2P connection.",
  hint: "Think direct device communication",
  a: "Because devices communicate directly without a central server",
  reason: "P2P networks allow devices to exchange data directly without intermediaries."
},

{
  q: "Compare P2P and client-server networks in terms of control and security.",
  hint: "Think centralized vs decentralized",
  a: "P2P has no central control and is less secure, client-server has central control and is more secure.",
  reason: "Client-server networks manage security centrally, while P2P networks distribute control across devices."
}
  ]
);
/*==================================
Network Troubleshooting Basics
===================================*/
add(
  "computer",
  "networking",
  "Network Troubleshooting Basics",
  `<h2>Network Troubleshooting Basics</h2>
  <p>
  Troubleshooting is the systematic process of identifying, diagnosing, and fixing problems in a computer network
  to ensure it operates efficiently and reliably.
</p>
<h3> Key Idea</h3>
<p>
  Network troubleshooting helps users detect, isolate, and resolve issues so that communication,
  devices, and internet services continue to function properly.
</p>
<h3> Common Network Problems</h3>
<ul>
  <li>No internet connection</li>
  <li>Slow network performance</li>
  <li>Device failing to connect to Wi-Fi or LAN</li>
  <li>Incorrect IP configuration</li>
  <li>DNS errors (website not loading)</li>
  <li>Intermittent connection drops</li>
</ul>
<h3> Basic Troubleshooting Steps</h3>
<ol>
  <li>Check physical connections (cables, routers, switches)</li>
  <li>Restart network devices (router, modem, computer)</li>
  <li>Verify network settings and IP configuration</li>
  <li>Test connectivity using tools like ping</li>
  <li>Check firewall or antivirus settings</li>
  <li>Reconnect to the network or Wi-Fi</li>
  <li>Update or reinstall network drivers</li>
</ol>
<h3> Troubleshooting Tools</h3>
<pre>
 Ping        → Tests if a device is reachable on a network
 Traceroute  → Shows the path data takes to reach a destination
 IPConfig     → Displays IP address and network configuration
 DNS Lookup   → Checks domain name resolution
</pre>
<h3> Advanced Troubleshooting Techniques</h3>
<ul>
  <li>Checking bandwidth usage to detect congestion</li>
  <li>Using network analyzers to monitor traffic</li>
  <li>Testing with different devices to isolate faults</li>
  <li>Changing DNS servers to fix browsing issues</li>
</ul>
<h3> Importance of Troubleshooting</h3>
<ul>
  <li>Restores network connectivity quickly</li>
  <li>Reduces downtime in communication and work</li>
  <li>Helps identify faulty hardware or software</li>
  <li>Improves overall network performance</li>
  <li>Saves time and repair costs</li>
</ul>
<h3> Real-Life Example</h3>
<p>
  When a school computer lab loses internet access, technicians may restart the router, check cables,
  and use the ping command to identify where the connection is failing.
</p>
<h3> Simple Explanation</h3>
<p>
  Troubleshooting is like being a network doctor who diagnoses and fixes problems when computers,
  networks, or internet connections stop working properly.
</p>
  `,
  [
    {
  q: "A school computer lab has no internet connection, but all cables are properly connected. Suggest two troubleshooting steps the technician should take next.",
  hint: "Think restart and settings check",
  a: "Restart the router and check IP configuration",
  reason: "Restarting devices clears temporary faults, and IP configuration ensures the network is correctly set up for internet access."
},
{
  q: "A user can access websites using IP addresses but not domain names like google.com. Identify the likely problem and suggest a solution.",
  hint: "Think DNS issue",
  a: "DNS problem; change or configure DNS settings",
  reason: "DNS translates domain names into IP addresses. If it fails, users can only access sites using IP addresses."
},
{
  q: "A network is very slow when many students are online at the same time. Identify the possible cause and explain it.",
  hint: "Think bandwidth usage",
  a: "Low bandwidth or network congestion",
  reason: "Bandwidth is shared among users. When many devices use it at once, performance slows down."
},
{
  q: "A technician uses the ping command and receives 'Request Timed Out'. What does this indicate?",
  hint: "Think connectivity failure",
  a: "The device is not reachable on the network",
  reason: "A timeout means the destination device is not responding, indicating a connection problem."
},
{
  q: "A computer cannot connect to Wi-Fi but other devices are working fine. Suggest one possible cause and solution.",
  hint: "Think device-specific issue",
  a: "Incorrect Wi-Fi settings or disabled network adapter; reconnect or enable adapter",
  reason: "The issue is likely on the individual device, not the entire network."
},
{
  q: "A technician suspects a firewall is blocking internet access. Explain how firewall settings could affect network troubleshooting.",
  hint: "Think security blocking traffic",
  a: "Firewall may block network traffic preventing access",
  reason: "Firewalls control incoming and outgoing traffic, and incorrect settings can block valid connections."
}
  ]
);
/*===============================
Data communication
===============================*/
add(
  "computer",
  "networking",
  "Data Communication Concepts",
  `<h2>Data Communication Concepts</h2>
  <p>
  Data communication refers to the exchange of digital data between two or more devices
  through a transmission medium such as cables, fiber optics, or wireless signals.
</p>
<h3> Key Idea</h3>
<p>
  Data communication is the process of sending and receiving digital information between devices
  using agreed rules (protocols) and communication technologies.
</p>
<h3> Key Components of Data Communication</h3>
<pre>
 Sender          → Device that sends data
 Receiver        → Device that receives data
 Message         → The data being transmitted (text, images, video, etc.)
 Transmission Medium → Path used to carry data (cables or wireless signals)
 Protocol        → Rules that control data communication
</pre>
<h3> Key Concepts</h3>
<pre>
 Bandwidth   → Amount of data transmitted per second (speed of connection)
 Protocols   → Rules that ensure proper communication between devices (e.g., TCP/IP, HTTP)
 Modem       → Converts digital signals for transmission over communication lines
 Router      → Directs data between different networks
</pre>
<h3> Explanation of Concepts</h3>
<ul>
  <li><b>Bandwidth:</b> Determines how much data can be transferred in a given time (higher bandwidth = faster communication)</li>
  <li><b>Protocols:</b> Set rules that ensure devices understand each other during communication</li>
  <li><b>Modem:</b> Converts digital signals to analog and back to enable internet connection</li>
  <li><b>Router:</b> Directs data packets between networks such as home and the internet</li>
</ul>
<h3> Modes of Data Communication</h3>
<ul>
  <li><b>Simplex:</b> Data flows in one direction only (e.g., TV broadcast)</li>
  <li><b>Half Duplex:</b> Data flows in both directions, but one at a time (e.g., walkie-talkie)</li>
  <li><b>Full Duplex:</b> Data flows in both directions simultaneously (e.g., phone call)</li>
</ul>
<h3> Importance of Data Communication</h3>
<ul>
  <li>Enables internet communication and connectivity</li>
  <li>Allows sharing of files and information globally</li>
  <li>Supports online learning, banking, and business operations</li>
  <li>Improves speed and efficiency of communication</li>
</ul>
<h3> Real-Life Example</h3>
<p>
  When you send a WhatsApp message, your phone acts as the sender, the internet is the transmission medium,
  and the recipient’s phone is the receiver. Protocols ensure the message is delivered correctly.
</p>
<h3> Simple Explanation</h3>
<p>
  Data communication is like a digital conversation between devices where messages are sent,
  received, and understood using rules (protocols) and speed (bandwidth).
</p>
  `,
  [
    {
  q: "A student sends a video file from their phone to a friend using WhatsApp. Identify the sender, receiver, and transmission medium in this communication process.",
  hint: "Think who sends, who receives, and what carries data",
  answer: "Sender: student’s phone, Receiver: friend’s phone, Transmission medium: internet",
  explanation: "In data communication, the sender produces the data, the receiver gets it, and the internet acts as the medium carrying the data between devices."
},

{
  q: "A network is very slow when many students are downloading files at the same time. Explain what bandwidth means in this situation and why the network slows down.",
  hint: "Think data capacity",
  answer: "Bandwidth is the amount of data that can be transmitted per second. The network slows because bandwidth is limited.",
  explanation: "Bandwidth is the capacity of a network. When too many users share it, the available speed per user reduces, causing slow communication."
},

{
  q: "A web browser uses HTTP when accessing a website. Explain what a protocol is and why it is needed.",
  hint: "Think communication rules",
  answer: "A protocol is a set of rules for data communication. It ensures devices understand each other.",
  explanation: "Protocols like HTTP and TCP/IP define how data is formatted, transmitted, and received so communication between devices is possible."
},

{
  q: "A modem is used in a home internet connection. Explain why a modem is necessary for communication between a computer and the internet.",
  hint: "Think signal conversion",
  answer: "It converts digital signals into a form suitable for transmission and back again.",
  explanation: "Computers use digital signals, but transmission lines may use analog signals, so a modem is needed to convert between them."
},

{
  q: "A school uses video conferencing for lessons. Identify two benefits of data communication in this situation.",
  hint: "Think learning and distance",
  answer: "Remote learning and real-time communication.",
  explanation: "Data communication allows students and teachers to interact in real time and learn from different locations."
},

{
  q: "A student uploads an assignment to Google Classroom. Explain how data communication makes this possible.",
  hint: "Think internet process",
  answer: "Data is sent from the student’s device to the server over the internet using protocols.",
  explanation: "Data communication systems transmit the file using protocols and network devices, allowing it to reach the online classroom platform."
}
  ]
);
/*==========================
Networking Security
===========================*/
add(
  "computer",
  "networking",
  "Network Security",
  `<h2>Network Security</h2>
  <p>
  Network security refers to the protection of computer networks, systems, and data
  from unauthorized access, damage, theft, or cyber attacks such as hacking, malware, sniffing, and spoofing.
</p>

<h3> Key Idea</h3>
<p>
  Network security ensures that only authorized users can access systems and data,
  while preventing, detecting, and responding to cyber threats.
</p>
<h3> Types of Network Security Threats</h3>
<pre>
 Malware       → Harmful software (viruses, worms, ransomware)
 Phishing      → Fake messages that trick users into revealing information
‍ Hacking       → Unauthorized access to systems or data
 Eavesdropping → Interception of network data during transmission
 Sniffing      → Capturing and monitoring network data packets secretly
 Spoofing      → Pretending to be a trusted device or user to gain access
 Denial of Service (DoS) → Overloading a system to make it unavailable
</pre>
<h3> Methods of Network Security</h3>
<pre>
 Firewall        → Blocks unauthorized access to a network
 Encryption      → Converts data into unreadable code
 Authentication  → Verifies user identity (passwords, biometrics, 2FA)
 Antivirus       → Detects and removes malicious software
 Access Control  → Restricts user permissions and privileges
 Monitoring      → Tracks network activity for suspicious behavior
</pre>
<h3> Explanation of Key Methods</h3>
<ul>
  <li><b>Firewall:</b> Filters incoming and outgoing network traffic to block threats</li>
  <li><b>Encryption:</b> Converts data into a secret code that can only be read with a key</li>
  <li><b>Authentication:</b> Confirms user identity before granting access</li>
  <li><b>Antivirus:</b> Scans and removes malicious programs from a computer</li>
  <li><b>Access Control:</b> Limits what users can access in a network system</li>
</ul>
<h3> Sniffing vs Spoofing</h3>
<ul>  <li><b>Sniffing:</b> Secretly capturing and analyzing data traveling across a network without permission</li>
  <li><b>Spoofing:</b> Pretending to be a trusted device, user, or website to trick systems into granting access</li>
</ul>
<h3> Importance of Network Security</h3>
<ul>
  <li>Protects sensitive and confidential information</li>
  <li>Prevents hacking, sniffing, and spoofing attacks</li>
  <li>Ensures privacy of users and organizations</li>
  <li>Maintains system reliability and trust</li>
  <li>Protects financial and personal data</li>
</ul>
<h3> Simple Explanation</h3>
<p>
  Network security is like a smart security system that uses locks, guards, and cameras
  to stop intruders, detect spies, and prevent people from pretending to be someone else.
</p>
  `,
  [
    {
  q: "A school computer lab notices that hackers are secretly capturing data being sent between computers on the network. Identify this type of attack and suggest one way to prevent it.",
  hint: "Think secret data capture",
  answer: "Sniffing. It can be prevented using encryption.",
  explanation: "Sniffing is the unauthorized capture of data packets. Encryption protects data by making it unreadable to attackers."
},

{
  q: "A user receives a fake email that looks like it is from their bank asking for a password. Identify this attack type and explain its danger.",
  hint: "Think pretending to be trusted source",
  answer: "Spoofing. It can lead to theft of personal information.",
  explanation: "Spoofing involves pretending to be a trusted source to trick users into revealing sensitive information like passwords or bank details."
},

{
  q: "A company wants to ensure that only authorized employees can access its internal network. State two security methods they can use.",
  hint: "Think login and protection tools",
  answer: "Authentication and firewall.",
  explanation: "Authentication verifies user identity while a firewall blocks unauthorized access to the network."
},

{
  q: "A student logs into a school system using a password and a code sent to their phone. What is this security method called and why is it important?",
  hint: "Think double security check",
  answer: "Two-factor authentication (2FA). It improves security by requiring two forms of verification.",
  explanation: "2FA adds an extra layer of security by requiring both a password and a second verification method."
},

{
  q: "A hacker tries to gain access to a network by pretending to be a trusted computer. Identify this attack and suggest one prevention method.",
  hint: "Think identity pretending",
  answer: "Spoofing. It can be prevented using authentication and secure network protocols.",
  explanation: "Spoofing is when an attacker impersonates a trusted device. Authentication helps verify real users and devices."
},

{
  q: "State one difference between sniffing and spoofing.",
  hint: "Think spying vs pretending",
  answer: "Sniffing is capturing data, spoofing is pretending to be a trusted user.",
  explanation: "Sniffing involves secretly monitoring network traffic, while spoofing involves impersonating a trusted source."
}
  ]
);
/*=========================
Networking Hardware
==========================*/
add(
  "computer",
  "networking",
  "Networking Hardware",
  `<h2>Networking Hardware</h2>
  <p>
  Networking hardware refers to physical devices used to connect computers together
  so that they can communicate and share resources such as files, printers, and internet access.
</p>
<h3> Key Idea</h3>
<p>
  Networking hardware acts as the communication bridge between computers,
  controlling how data is sent, received, and directed across a network efficiently and securely.
</p>
<h3> Types of Networking Hardware</h3>
<pre>
 NIC (Network Interface Card) → Connects a computer to a network
 Hub                         → Sends data to all connected devices
 Switch                      → Sends data only to the correct device
 Router                      → Connects different networks and provides internet access
 Bridge                      → Connects two similar networks and filters traffic
 Brouter                     → Combines the functions of a bridge and a router
 Access Point               → Allows wireless devices to connect to a network
 Modem                       → Converts signals for internet communication
</pre>
<h3> Functions of Networking Devices</h3>
<ul>
  <li><b>NIC:</b> Allows a computer to connect to a network and communicate with other devices</li>
  <li><b>Hub:</b> Broadcasts data to all connected devices (simple but inefficient)</li>
  <li><b>Switch:</b> Sends data only to the intended device using MAC addresses (efficient)</li>
  <li><b>Router:</b> Connects different networks and directs data between them (e.g., LAN to internet)</li>
  <li><b>Bridge:</b> Connects two separate but similar networks and reduces traffic by filtering data</li>
  <li><b>Brouter:</b> Combines the functions of a bridge and a router; routes some data and bridges others</li>
  <li><b>Modem:</b> Converts digital signals to allow internet communication</li>
  <li><b>Access Point:</b> Provides wireless connectivity for Wi-Fi devices</li>
</ul>
<h3> Key Differences</h3>
<ul>
  <li><b>Hub:</b> Sends data to all devices (no filtering)</li>
  <li><b>Switch:</b> Sends data only to the correct device (uses MAC address)</li>
  <li><b>Bridge:</b> Connects two LANs and filters traffic between them</li>
  <li><b>Router:</b> Connects different networks and routes data using IP addresses</li>
  <li><b>Brouter:</b> Works as both a bridge and a router depending on the data type</li>
</ul>
<h3> Advantages of Networking Hardware</h3>
<ul>
  <li>Enables sharing of files and resources</li>
  <li>Allows multiple devices to access the internet</li>
  <li>Improves communication between computers</li>
  <li>Reduces cost through shared hardware like printers</li>
</ul>
<h3> Simple Explanation</h3>
<p>
  Networking hardware is like a system of roads and traffic controllers that helps computers
  send, receive, and manage information across different networks efficiently.
</p>
  `,
  [
    {
  q: "A school computer lab has 20 computers connected together. The network keeps slowing down because every device receives all data packets. Identify the device being used and suggest a better alternative.",
  hint: "Think hub vs switch",
  answer: "The device is a hub. It should be replaced with a switch.",
  explanation: "A hub broadcasts data to all connected devices, causing network congestion. A switch sends data only to the intended device, making the network faster and more efficient."
},
{
  q: "A company wants to connect two separate LAN networks in different buildings and control traffic between them. Which device is most suitable and why?",
  hint: "Think bridge or router",
  answer: "A router is most suitable because it connects different networks and manages data traffic.",
  explanation: "Routers connect multiple networks and direct data using IP addresses, making them ideal for linking different LANs across buildings."
},
{
  q: "A network administrator wants to connect two similar LAN networks and reduce unnecessary traffic between them. Which device should be used?",
  hint: "Think bridge function",
  answer: "A bridge should be used.",
  explanation: "A bridge connects two similar networks and filters data traffic, reducing congestion by forwarding only relevant data."
},
{
  q: "In a computer lab, students cannot access the internet but can communicate within the local network. Identify the most likely faulty device.",
  hint: "Think internet connection device",
  answer: "The router or modem may be faulty.",
  explanation: "The router or modem is responsible for connecting the LAN to the internet, so failure prevents internet access while local communication still works."
},
{
  q: "A technician installs a device that converts digital signals into a form suitable for transmission over telephone lines. Identify the device.",
  hint: "Think internet signal conversion",
  answer: "A modem",
  explanation: "A modem converts digital signals into analog signals and vice versa for internet communication over telephone or cable lines."
},
{
  q: "A network device uses MAC addresses to send data only to the correct computer. Identify the device and explain its advantage over a hub.",
  hint: "Think switch",
  answer: "It is a switch. It is more efficient because it sends data only to the intended device.",
  explanation: "Switches reduce network traffic by directing data only to the correct destination using MAC addresses, unlike hubs which broadcast to all devices."
}
  ]
);
/*=========================
Word processing
=========================*/
add(
  "computer",
  "office",
  "Word Processing",
  `<h2>Word Processing </h2>
 <p>
  Word processing refers to the use of computer software to create, edit, format, store,
  and print text-based documents such as letters, reports, CVs, essays, and official documents.
</p>
<h3> Key Idea</h3>
<p>
  Word processing software allows users to produce well-structured and professional documents quickly,
  with the ability to edit, correct, and improve content easily without rewriting everything.
</p>
<h3> Examples of Word Processing Software</h3>
<pre>
 Microsoft Word        → Most widely used word processor
 Google Docs          → Online collaborative document editor
 LibreOffice Writer   → Free offline word processing software
 WPS Writer           → Lightweight and easy-to-use word processor
</pre>
<h3> Key Features of Word Processing</h3>
<ul>
  <li>Typing, editing, and deleting text</li>
  <li>Text formatting (bold, italics, underline, font size, color)</li>
  <li>Page layout control (margins, orientation, spacing)</li>
  <li>Spell check and grammar correction tools</li>
  <li>Insertion of images, tables, shapes, and charts</li>
  <li>Find and replace text</li>
  <li>Saving and exporting files (DOCX, PDF, TXT)</li>
  <li>Printing documents professionally</li>
</ul>
<h3> Keyboard Shortcuts in Word Processing</h3>
<pre>
Ctrl + C   → Copy selected text
Ctrl + V   → Paste copied text
Ctrl + X   → Cut selected text
Ctrl + Z   → Undo last action
Ctrl + Y   → Redo last action
Ctrl + B   → Make text Bold
Ctrl + I   → Make text Italic
Ctrl + U   → Underline text
Ctrl + A   → Select all text in the document
Ctrl + S   → Save the document
Ctrl + P   → Print document
Ctrl + F   → Find a word or phrase in the document
Ctrl + H   → Find and replace text
Ctrl + N   → Create a new document
Ctrl + O   → Open an existing document
Ctrl + L   → Align text to the left
Ctrl + E   → Center align text
Ctrl + R   → Align text to the right
Ctrl + J   → Justify text (align both sides)
</pre>
<h3> Advanced Features</h3>
<ul>
  <li>Track changes for editing review</li>
  <li>Comments for collaboration</li>
  <li>Templates for CVs, letters, and reports</li>
  <li>Auto-save and cloud storage integration</li>
  <li>Mail merge for sending bulk personalized documents</li>
</ul>

<h3> Advantages of Word Processing</h3>
<ul>
  <li>Saves time compared to handwriting</li>
  <li>Allows easy editing without rewriting the whole document</li>
  <li>Produces neat, professional, and readable documents</li>
  <li>Enables easy sharing via email or cloud storage</li>
  <li>Reduces paper usage through digital storage</li>
</ul>

<h3> Disadvantages</h3>
<ul>
  <li>Requires electricity and a computer/device</li>
  <li>Can be affected by software crashes or data loss</li>
  <li>Requires basic computer skills to use effectively</li>
  <li>May lead to over-reliance on auto-correction tools</li>
</ul>

<h3> Simple Explanation</h3>
<p>
  Word processing is like a powerful digital typewriter that allows you to write, edit, format,
  and improve documents easily and professionally using a computer.
</p>
  `,

  [
  {
    q: "A student is typing an essay using Microsoft Word. Explain what is meant by word processing.",
    hint: "Think creating and editing documents",
    answer: "It is the use of software to create and edit documents.",
    explanation: "Word processing involves using computer software to type, edit, format, and print text-based documents efficiently."
  },

  {
    q: "Give two examples of word processing software used in schools and offices.",
    hint: "Think Microsoft and online tools",
    answer: "Microsoft Word and Google Docs",
    explanation: "These are popular applications used to create, edit, and format documents electronically."
  },

  {
    q: "A teacher asks students to submit typed work instead of handwritten work. State two advantages of using word processing over handwriting.",
    hint: "Think editing and neatness",
    answer: "Easy editing and neat presentation",
    explanation: "Word processing allows users to correct mistakes easily and produce clean, professional-looking documents."
  },

  {
    q: "A student uses spell check while typing a document. State the purpose of spell check in word processing.",
    hint: "Think error correction",
    answer: "It detects and corrects spelling mistakes.",
    explanation: "Spell check helps users identify and correct spelling errors automatically, improving document quality."
  },

  {
    q: "A student creates a CV using a word processor. Give two reasons why word processing is suitable for this task.",
    hint: "Think formatting and professionalism",
    answer: "It allows formatting and easy editing.",
    explanation: "Word processors help users design structured documents like CVs with proper formatting, alignment, and quick edits."
  },

  {
    q: "A document is edited many times before final submission. Explain why word processing is better than handwriting for repeated editing.",
    hint: "Think rewriting effort",
    answer: "It allows easy changes without rewriting the whole document.",
    explanation: "Word processing saves time because users can modify text, move content, and correct errors without starting over."
  }
  ]
);
/*=======================================================
Spreadsheets
=======================================================*/
add(
  "computer",
  "office",
  "Spreadsheets",
  `<h2>Spreadsheets</h2>
  <p>
  Spreadsheets are application programs used to organize, store, and analyze data
  in rows and columns. They also allow automatic calculations using formulas and functions.
</p>
<h3> Key Idea</h3>
<p>
  A spreadsheet is like a digital worksheet where data is arranged in rows and columns,
  and calculations are performed automatically using formulas.
</p>
<h3> Examples of Spreadsheet Software</h3>
<pre>
 Microsoft Excel   → Most popular spreadsheet program
 Google Sheets     → Online spreadsheet application
 LibreOffice Calc  → Free spreadsheet software
 Apple Numbers     → Spreadsheet for Apple devices
</pre>
<h3> Structure of a Spreadsheet</h3>
<pre>
        A        B        C
     ┌────────┬────────┬────────┐
1    │ Name   │ Marks  │ Grade  │
     ├────────┼────────┼────────┤
2    │ John   │ 85     │ A      │
     ├────────┼────────┼────────┤
3    │ Mary   │ 72     │ B      │
     └────────┴────────┴────────┘

Rows    → Horizontal lines (1,2,3...)
Columns → Vertical lines (A,B,C...)
Cells   → Intersection of row and column (A1, B2...)
</pre>
<h3> Explanation of Spreadsheet Parts</h3>
<ul>
  <li><b>Rows:</b> Horizontal sections identified by numbers</li>
  <li><b>Columns:</b> Vertical sections identified by letters</li>
  <li><b>Cells:</b> Boxes where data is entered</li>
  <li><b>Cell Address:</b> Name of a cell formed using column letter and row number (e.g., B3)</li>
  <li><b>Formula Bar:</b> Area used to enter or edit formulas</li>
  <li><b>Worksheet:</b> One page inside a spreadsheet file</li>
</ul>
<h3> Data Types in Spreadsheets</h3>
<pre>
Text     → Names or words
Numbers  → Values used in calculations
Dates    → Calendar dates
Formulas → Instructions for calculations
</pre>
<h3> Key Features</h3>
<ul>
  <li>Organizing data into tables</li>
  <li>Automatic calculations using formulas</li>
  <li>Sorting data alphabetically or numerically</li>
  <li>Filtering important information</li>
  <li>Creating charts and graphs</li>
  <li>Data analysis and reporting tools</li>
</ul>
<h3> Important Formulas</h3>
<pre>
=SUM(A1:A10)         → Adds values in a range
=AVERAGE(A1:A10)     → Calculates the mean
=MAX(A1:A10)         → Finds highest value
=MIN(A1:A10)         → Finds lowest value
=COUNT(A1:A10)       → Counts numeric entries
=COUNTA(A1:A10)      → Counts all non-empty cells
=COUNTBLANK(A1:A10)  → Counts empty cells
=IF(A1>50,"Pass","Fail") → Logical decision test
=IFS(A1>80,"A",A1>60,"B",A1>40,"C") → Multiple conditions
=SUMIF(A1:A10,">50") → Adds values greater than 50
=COUNTIF(A1:A10,">50") → Counts values greater than 50
=AVERAGEIF(A1:A10,">50") → Average of values above condition
</pre>
<h3> Formula Example</h3>
<pre>
A        B
----------------
1  Math      80
2  English   70
3  Science   90
Formula:
=SUM(B1:B3)
Result:
240
</pre>
<h3> Uses of Spreadsheets</h3>
<ul>
  <li>Keeping school marks and records</li>
  <li>Business accounting and budgeting</li>
  <li>Creating timetables and schedules</li>
  <li>Data analysis and reporting</li>
  <li>Inventory and stock management</li>
</ul>
<h3> Advantages</h3>
<ul>
  <li>Saves time by automating calculations</li>
  <li>Reduces human errors in mathematics</li>
  <li>Makes data analysis easier</li>
  <li>Helps in decision making using charts</li>
  <li>Stores large amounts of information neatly</li>
</ul>
<h3> Disadvantages</h3>
<ul>
  <li>Incorrect formulas can produce wrong results</li>
  <li>Large spreadsheets may become difficult to manage</li>
  <li>Requires computer knowledge to use advanced features</li>
  <li>Data can be lost if not saved properly</li>
</ul>
<h3> Simple Explanation</h3>
<p>
  A spreadsheet is like a smart digital table that stores information
  and performs calculations automatically when data is entered.
</p>
`,
[
  
    { 
        question: `A school uses a spreadsheet to track student performance.

             A       B      C      D      E       F        G
        1    Name   Math   Eng    Sci    Total   Average  Grade
        2     Ali    60     70     80
        3     Beth   40     50     45
        4     Caren  80     90     85
        5    David  30     40     35

      a) Write a formula to calculate the Total for Ali in E2. (1 mk)
      b) Write a formula to calculate the Average for Ali in F2. (2 mks)
      c) Use an IF function in G2:
      - "A" if Average ≥ 75
      - "B" if Average ≥ 60
      - "C" if Average ≥ 50
      - "D" otherwise (4 mks)
      d) Write a formula to find the highest total score. (2 mks)
      e) Explain how to copy formulas correctly down the column without errors. (2 mks)`,

  answer: `
      a) =SUM(B2:D2)
      b) =AVERAGE(B2:D2)
      c) =IF(F2>=75,"A",IF(F2>=60,"B",IF(F2>=50,"C","D")))
      d) =MAX(E2:E5)
      e) Use relative cell referencing so formulas adjust automatically when dragged down.`
    },

    {
      question: `A business tracks monthly sales:

      A        B        C        D        E
    1 Product Jan      Feb      Mar      Total
    2 Rice    1200     1500     1300
    3 Beans   800      900      1000
    4 Sugar   1500     1600     1700

    a) Write a formula to calculate Total sales for Rice in E2. (1 mk)
    b) Write a formula to calculate average monthly sales for Beans. (2 mks)
    c) Write a formula to find the minimum sales in March. (2 mks)
    d) Use SUMIF to calculate total sales in January above 1000. (3 mks)
    e) State one real-life use of this spreadsheet. (1 mk)`,

      answer: `
      a) =SUM(B2:D2)
      b) =AVERAGE(B3:D3)
      c) =MIN(D2:D4)
      d) =SUMIF(B2:B4,">1000")
      e) Sales tracking and business analysis`
    },

    {
      question: `A teacher is analyzing student grades:

             A       B       C       D       E
      1     Name   Test1   Test2   Test3   Final
      2     John   55      60      65
      3     Mary   80      75      90
      4     Peter  40      45      50

    a) Write a formula to calculate Final average for John in E2. (1 mk)
    b) Use IF to assign "Pass" if average ≥ 50 else "Fail". (2 mks)
    c) Write a formula to count how many students scored above 60 in Test1. (2 mks)
    d) Write a formula to calculate average score of Test2. (2 mks)
    e) What function is used to count only numeric values? (1 mk)`,

      answer: `
      a) =AVERAGE(B2:D2)
      b) =IF(E2>=50,"Pass","Fail")
      c) =COUNTIF(B2:B4,">60")
      d) =AVERAGE(C2:C4)
      e) COUNT`
    },

    {
      question: `A shop tracks inventory:

            A        B        C        D
      1     Item    Stock    Sold     Remaining
      2     Pen     100      30
      3     Book    200      50
      4     Ruler   150      20

      a) Write a formula to calculate Remaining stock for Pen in D2. (2 mks)
      b) Write a formula to calculate total stock of all items. (2 mks)
      c) Write a formula to find item with maximum stock. (2 mks)
      d) Explain why spreadsheets are useful in inventory management. (2 mks)`,

      answer: `
      a) =B2-C2
      b) =SUM(B2:B4)
      c) =MAX(B2:B4)
      d) They help track stock automatically and reduce errors`
    },

    {
      question: `A school wants to calculate grades with weighting:

            A       B        C        D        E
      1     Name   Exam 50% Coursework 50% Final
      2     Ali    70      80
      3     Beth   60      50
      4     John   90      85

      a) Write a formula to calculate Final score for Ali in E2. (2 mks)
      b) Write a formula using weighted average (50% Exam, 50% Coursework). (3 mks)
      c) Use IF to assign:
      - ≥ 80 = "Excellent"
      - ≥ 60 = "Good"
      - Otherwise = "Improve" (3 mks)
      d) What type of chart would best show student performance? (1 mk)
      e) Explain why weighted averages are used. (2 mks)`,

      answer: `
      a) =(B2+C2)/2
      b) =B2*0.5 + C2*0.5
      c) =IF(E2>=80,"Excellent",IF(E2>=60,"Good","Improve"))
      d) Bar chart
      e) They give different importance to assessments`
    }
  ]
);
/*=======================================================
Presentations
=======================================================*/
add(
  "computer",
  "office",
  "Presentations",
  `<h2>Presentations</h2>
  <p>
    Presentation software is used to display information in an organized way using slides.
    It helps users communicate ideas visually using text, images, audio, and video.
  </p>
  <h3> Key Idea</h3>
  <p>
    Presentations are used to communicate information clearly to an audience using visual slides
    instead of long written documents.
  </p>
  <h3> Examples of Presentation Software</h3>
  <div class="example-box">
    1. Microsoft PowerPoint – most popular slide software<br>
    2. Google Slides – online presentation tool<br>
    3. LibreOffice Impress – free presentation software<br>
    4. Canva – design-based presentation tool
  </div>
  <h3> Key Features of Presentation Software</h3>
  <ul>
    <li>Creation of multiple slides</li>
    <li>Insertion of text, images, audio, and video</li>
    <li>Slide transitions and animations</li>
    <li>Pre-designed templates and themes</li>
    <li>Presenter notes and slideshow mode</li>
  </ul>
  <h3> Advantages</h3>
  <ul>
    <li>Makes information easier to understand</li>
    <li>Improves audience engagement</li>
    <li>Helps organize ideas clearly</li>
    <li>Supports visual learning</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    Presentation software is like a digital flipbook where each page (slide) shows a piece of information
    to help explain a topic clearly.
  </p>
  `,

  [
    {
      q: "What is presentation software?",
      hint: "Think slides and communication",
      answer: "Software used to display information using slides.",
      explanation: "It allows users to organize and show information visually using slides instead of long text."
    },
    {
      q: "Give two examples of presentation software.",
      hint: "Think PowerPoint alternatives",
      answer: "Microsoft PowerPoint and Google Slides",
      explanation: "These are the most commonly used tools for creating presentations."
    },
    {
      q: "What is the main purpose of presentations?",
      hint: "Think communication",
      answer: "To present information clearly to an audience.",
      explanation: "Presentations help explain ideas using visual slides."
    },
    {
      q: "State one feature of presentation software.",
      hint: "Think animations or slides",
      answer: "Animations and transitions",
      explanation: "These features make slides more interactive and engaging."
    },
    {
      q: "Give one real-life use of presentations.",
      hint: "Think school or business",
      answer: "Presenting a school project in class",
      explanation: "Students use presentation software to explain their work visually."
    },
    {
      q: "Why are presentations better than plain text documents?",
      hint: "Think visuals",
      answer: "They are more visual and easier to understand.",
      explanation: "Slides use images, charts, and structure to make information clearer."
    }
  ]
);
/*=======================================================
Email & Communication
=======================================================*/
add(
  "computer",
  "office",
  "Email & Communication ",
  `<h2>Email & Communication</h2>
  <p>
  Email is a method of sending digital messages over the internet.
  It is one of the most common forms of electronic communication used in education,
  business, and personal life.
</p>
<h3> Key Idea</h3>
<p>
  Email allows users to send and receive messages instantly over the internet,
  including text, images, documents, videos, and links.
</p>
<h3> Examples of Email Services</h3>
<pre>
 Gmail       → Google email service
 Outlook     → Microsoft email service
 Yahoo Mail  → Yahoo communication service
 ProtonMail  → Secure encrypted email service
</pre>
<h3> Features of Email</h3>
<ul>
  <li>Send and receive messages instantly</li>
  <li>Attach files such as documents, images, and videos</li>
  <li>Send emails to multiple recipients using CC and BCC</li>
  <li>Spam and junk mail filtering</li>
  <li>Organizing emails into folders and labels</li>
  <li>Access emails from phones, tablets, and computers</li>
</ul>
<h3> Structure of an Email Address</h3>
<pre>
student@gmail.com
│       │      │
│       │      └── Domain Extension (.com)
│       └───────── Domain Name (gmail)
└──────────────── Username (student)

@  → At symbol used to separate the username and domain
</pre>
<h3> Explanation of Parts</h3>
<ul>
  <li><b>Username:</b> The unique name of the email owner</li>
  <li><b>@ Symbol:</b> Separates the username from the mail service provider</li>
  <li><b>Domain Name:</b> The email service provider such as Gmail or Yahoo</li>
  <li><b>Domain Extension:</b> The ending of the domain such as .com, .org, or .edu</li>
</ul>
<h3> Common Domain Extensions</h3>
<pre>
.com  → Commercial organizations
.org  → Organizations
.edu  → Educational institutions
.gov  → Government institutions
.net  → Network services
</pre>
<h3> Structure of an Email</h3>
<ul>
  <li><b>To:</b> Recipient's email address</li>
  <li><b>CC:</b> Sends a copy to another recipient</li>
  <li><b>BCC:</b> Sends a hidden copy to another recipient</li>
  <li><b>Subject:</b> The topic of the message</li>
  <li><b>Body:</b> The main message content</li>
  <li><b>Attachments:</b> Files added to the email</li>
</ul>
<h3> Advantages of Email</h3>
<ul>
  <li>Fast communication across the world</li>
  <li>Low cost compared to traditional mail</li>
  <li>Allows sending files easily</li>
  <li>Can be accessed anytime and anywhere</li>
  <li>Easy storage and searching of messages</li>
</ul>
<h3> Disadvantages of Email</h3>
<ul>
  <li>Spam or unwanted emails may occur</li>
  <li>Requires internet access</li>
  <li>Viruses can be spread through attachments</li>
  <li>Emails can be ignored or misunderstood</li>
</ul>
<h3> Simple Explanation</h3>
<p>
  Email is like a digital letter sent through the internet instead of paper and post offices.
  It allows people to communicate quickly from anywhere in the world.
</p>
  `,

  [
  {
    q: "A teacher receives an email with the subject 'Homework Submission'. Explain why the subject line is important before opening the email.",
    hint: "Think preview of message content",
    answer: "It shows the topic of the email before opening it.",
    explanation: "The subject line helps the recipient quickly understand the purpose of the email and decide whether to open it or prioritize it."
  },

  {
    q: "A student sends an email to three teachers using To, CC, and BCC. Explain the difference between CC and BCC.",
    hint: "Think visibility of recipients",
    answer: "CC shows all recipients, BCC hides recipients from each other.",
    explanation: "CC (Carbon Copy) allows everyone to see who received the email, while BCC (Blind Carbon Copy) hides recipient addresses for privacy."
  },

  {
    q: "An email fails to send because the address student@school is invalid. Explain what is missing in the email address.",
    hint: "Think domain extension",
    answer: "The domain extension (e.g. .com, .edu) is missing.",
    explanation: "A valid email must include a username, @ symbol, domain name, and a domain extension such as .com or .edu."
  },

  {
    q: "A student attaches a file named assignment.pdf to an email. Explain what an email attachment is.",
    hint: "Think files sent with message",
    answer: "A file sent together with an email message.",
    explanation: "Attachments allow users to send documents, images, videos, or other files along with the email message."
  },

  {
    q: "A teacher marks an email as spam. Explain what spam emails are.",
    hint: "Think unwanted messages",
    answer: "Unwanted or junk emails.",
    explanation: "Spam emails are unwanted messages often sent in bulk, usually advertising or suspicious content."
  },

  {
    q: "A student accidentally sends an email to the wrong address. Suggest one possible consequence.",
    hint: "Think privacy or wrong recipient",
    answer: "Sensitive information may be sent to the wrong person.",
    explanation: "Sending emails to the wrong recipient can lead to privacy issues or sharing of incorrect information."
  }
  ]
);
/*=======================================================
Collaboration Tools
=======================================================*/
add(
  "computer",
  "office",
  "Collaboration Tools (Full Course)",
  `<h2>Collaboration Tools</h2>
  <p>
    Collaboration tools are digital software applications that allow two or more people to work together
    on tasks, projects, or communication in real time or asynchronously (not at the same time).
    They are widely used in schools, businesses, and remote teams.
  </p>
  <h3> Key Idea</h3>
  <p>
    The main purpose of collaboration tools is to improve teamwork by allowing users to share files,
    communicate instantly, edit documents together, and manage tasks efficiently.
  </p>
  <h3> Examples of Collaboration Tools</h3>
  <div class="example-box">
    1. Google Docs – real-time document editing<br>
    2. Google Drive – cloud file storage and sharing<br>
    3. Zoom – video conferencing and meetings<br>
    4. Microsoft Teams – chat, meetings, and teamwork platform<br>
    5. Slack – team messaging and communication
  </div>
  <h3> Features of Collaboration Tools</h3>
  <ul>
    <li>Real-time editing of documents</li>
    <li>Video and audio conferencing</li>
    <li>File sharing and cloud storage</li>
    <li>Instant messaging and group chats</li>
    <li>Task assignment and project tracking</li>
  </ul>
  <h3> Advantages</h3>
  <ul>
    <li>Improves teamwork and communication</li>
    <li>Saves time and increases productivity</li>
    <li>Allows remote work from anywhere</li>
    <li>Reduces need for physical meetings</li>
  </ul>
  <h3> Simple Explanation</h3>
  <p>
    Imagine a group of students writing one essay together at the same time even if they are in different homes.
    That is what collaboration tools make possible.
  </p>
  `,

  [
    {
      q: "What are collaboration tools?",
      hint: "Think about teamwork and software",
      answer: "They are software that help people work together online.",
      explanation: "Collaboration tools connect people so they can share work, communicate, and complete tasks together."
    },

    {
      q: "Give two examples of collaboration tools.",
      hint: "Think of apps used for documents or meetings",
      answer: "Google Docs and Zoom",
      explanation: "Google Docs is used for editing documents together while Zoom is used for video meetings."
    },

    {
      q: "What is the main purpose of collaboration tools?",
      hint: "Think about teamwork benefits",
      answer: "To improve teamwork and communication",
      explanation: "They help people work together efficiently even when they are far apart."
    },

    {
      q: "State one advantage of collaboration tools.",
      hint: "Think about time or distance",
      answer: "They allow remote work from anywhere",
      explanation: "Users can collaborate even if they are not in the same physical location."
    },

    {
      q: "What tool is commonly used for video meetings?",
      hint: "Think of online classes or meetings",
      answer: "Zoom",
      explanation: "Zoom allows people to meet through video calls over the internet."
    },

    {
      q: "How do collaboration tools help students?",
      hint: "Think group work",
      answer: "They allow students to work on assignments together online",
      explanation: "Students can edit documents, share ideas, and complete group tasks even when apart."
    }
  ]
);
