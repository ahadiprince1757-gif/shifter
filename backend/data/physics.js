/* =========================================================
   PHYSICS: MOTION & FORCES 
========================================================= */
/* =========================
   1. DISTANCE & DISPLACEMENT
========================= */

add(
  "physics",
  "motion",
  "Displacement & Distance",
  `
  <h2>Distance vs Displacement</h2>

<h3> FOUNDATION UNDERSTANDING</h3>
<p>
When an object moves, we describe its motion using two important physical quantities:
<b>distance</b> and <b>displacement</b>.  
Although they may seem similar, they measure completely different things.
</p>

<div class="keyfact"> KEY IDEA: Distance tells “how much ground is covered”, while displacement tells “how far you are from the start point in a straight line.”</div>

<h3> CLEAR DEFINITIONS</h3>
<ul>
<li><b>Distance</b> → Total length of the path travelled by an object.</li>
<li><b>Displacement</b> → Shortest straight-line distance from the initial position to the final position.</li>
</ul>

<h3> KEY DIFFERENCES (IMPORTANT)</h3>
<ul>
<li>Distance is a <b>scalar quantity</b> (no direction).</li>
<li>Displacement is a <b>vector quantity</b> (has direction).</li>
<li>Distance is always <b>positive</b>.</li>
<li>Displacement can be <b>positive, negative, or zero</b> depending on direction.</li>
<li>Distance is always ≥ displacement (in magnitude).</li>
</ul>

<h3> FORMULA INSIGHT</h3>
<div class="formula">
Distance = Total path travelled<br>
Displacement = Final position − Initial position (straight line, with direction)
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Straight Line Motion (Same Direction)</strong><br><br>

A student walks <b>5 m east</b> and then <b>3 m east</b>.<br><br>

<b>Step 1: Calculate Distance</b><br>
Distance = 5 + 3 = <b>8 m</b><br><br>

<b>Step 2: Calculate Displacement</b><br>
Since both movements are in the same direction:<br>
Displacement = 5 + 3 = <b>8 m east</b><br><br>

<b> Final Answer:</b><br>
Distance = 8 m, Displacement = 8 m east
</div>

<div class="example-box">
<strong> Example 2: Opposite Directions</strong><br><br>

A person walks <b>10 m east</b> then <b>6 m west</b>.<br><br>

<b>Step 1: Distance</b><br>
Distance = 10 + 6 = <b>16 m</b><br><br>

<b>Step 2: Displacement</b><br>
Take east as positive:<br>
Displacement = 10 − 6 = <b>4 m east</b><br><br>

<b> Final Answer:</b><br>
Distance = 16 m, Displacement = 4 m east
</div>

<div class="example-box">
<strong> Example 3: Closed Path (Return to Start)</strong><br><br>

A runner completes one full lap of a <b>400 m track</b>.<br><br>

<b>Step 1: Distance</b><br>
Distance = full path = <b>400 m</b><br><br>

<b>Step 2: Displacement</b><br>
Start position = Final position → no change<br>
Displacement = <b>0 m</b><br><br>

<b> Final Answer:</b><br>
Distance = 400 m, Displacement = 0 m
</div>

<div class="example-box">
<strong> Example 4: Back-and-Forth Motion</strong><br><br>

A person moves <b>12 m north</b> and then <b>12 m south</b>.<br><br>

<b>Step 1: Distance</b><br>
Distance = 12 + 12 = <b>24 m</b><br><br>

<b>Step 2: Displacement</b><br>
Equal opposite movements cancel out:<br>
Displacement = <b>0 m</b><br><br>

<b> Final Answer:</b><br>
Distance = 24 m, Displacement = 0 m
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Distance depends on the path taken.</div>
<div class="keyfact"> Displacement depends only on start and end position.</div>
<div class="keyfact"> Two different paths can give the same displacement but different distances.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking distance and displacement are always equal.</li>
<li>Ignoring direction when calculating displacement.</li>
<li>Forgetting that displacement can be zero even when distance is large.</li>
</ul>
`,
  [
    {
      q: "A person walks 10 m forward and 10 m back. Find distance and displacement.",
      hint: "Distance = total path, Displacement = change in position",
      formula:
        "Distance = total path, Displacement = final position - initial position",
      steps: [
        "Step 1: Forward distance = 10 m",
        "Step 2: Backward distance = 10 m",
        "Step 3: Total distance = 10 + 10 = 20 m",
        "Step 4: Final position = starting point",
        "Step 5: Displacement = 0 m",
      ],
      ans: "Distance = 20 m, Displacement = 0 m",
      final_check: "Returning to start makes displacement zero",
      common_mistakes: [
        "Thinking displacement is also 20 m",
        "Ignoring direction in displacement",
      ],
      explanation:
        "Distance is total path covered, while displacement depends on change in position.",
    },

    {
      q: "Why can displacement be zero but distance not?",
      hint: "starting and ending point",
      ans: "Because distance measures total path travelled, while displacement depends only on initial and final position.",
      explanation:
        "If you return to the starting point, displacement becomes zero but distance still adds up.",
    },
    {
      q: "A car moves 30 m east and then 40 m east. Find distance and displacement.",
      hint: "same direction → add directly",
      formula: "Distance = total path, Displacement = sum (same direction)",
      steps: [
        "Step 1: Distance = 30 + 40 = 70 m",
        "Step 2: Both in same direction (east)",
        "Step 3: Displacement = 70 m east",
      ],
      ans: "Distance = 70 m, Displacement = 70 m east",
      final_check: "Same direction → distance = displacement",
      common_mistakes: ["Subtracting instead of adding", "Ignoring direction"],
      explanation:
        "When motion is in one direction, distance equals displacement.",
    },

    {
      q: "A person walks 15 m north then 5 m south. Find distance and displacement.",
      hint: "opposite directions → subtract",
      formula: "Displacement = difference of opposite directions",
      steps: [
        "Step 1: Distance = 15 + 5 = 20 m",
        "Step 2: Net movement = 15 - 5 = 10 m",
        "Step 3: Direction = north",
      ],
      ans: "Distance = 20 m, Displacement = 10 m north",
      final_check: "Opposite directions reduce displacement",
      common_mistakes: [
        "Adding instead of subtracting displacement",
        "Ignoring direction",
      ],
      explanation: "Displacement depends on net movement, not total path.",
    },

    {
      q: "A car travels 100 m east, then 100 m west. Find distance and displacement.",
      hint: "returns to start",
      formula: "Distance = sum, Displacement = net position",
      steps: [
        "Step 1: Distance = 100 + 100 = 200 m",
        "Step 2: Final position = starting point",
        "Step 3: Displacement = 0 m",
      ],
      ans: "Distance = 200 m, Displacement = 0 m",
      final_check: "Returning cancels displacement",
      common_mistakes: [
        "Thinking displacement = 200 m",
        "Ignoring direction cancellation",
      ],
      explanation: "Opposite equal movements cancel displacement.",
    },

    {
      q: "A person walks 8 m east, then 6 m west. Find displacement.",
      hint: "subtract opposite directions",
      formula: "Displacement = 8 - 6",
      steps: [
        "Step 1: Identify directions → east and west",
        "Step 2: Subtract → 8 - 6 = 2",
        "Step 3: Direction = east",
      ],
      ans: "2 m east",
      final_check: "Direction must be included",
      common_mistakes: ["Adding instead of subtracting", "Ignoring direction"],
      explanation: "Displacement is the net movement considering direction.",
    },
  ],
);

/* =========================
   2. SPEED (IMPROVED)
========================= */

add(
  "physics",
  "motion",
  "Speed",
  `
   <h2>Speed</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Speed tells us how quickly an object is moving from one place to another.
It describes the rate at which <b>distance is covered over time</b>.
</p>

<div class="keyfact"> KEY IDEA: Speed measures “how fast”, not “in what direction”.</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Speed</b> is defined as the distance travelled per unit time.
</p>

<h3> KEY POINTS</h3>
<ul>
<li>Speed = distance ÷ time</li>
<li>Speed is a <b>scalar quantity</b> (has magnitude only, no direction)</li>
<li>SI unit: <b>m/s (metres per second)</b></li>
<li>Other common unit: <b>km/h (kilometres per hour)</b></li>
<li>A higher speed means an object covers more distance in less time</li>
</ul>

<div class="formula">
Speed = Distance / Time
</div>

<h3> IMPORTANT REARRANGED FORMULAS</h3>
<div class="formula">
Distance = Speed × Time<br>
Time = Distance ÷ Speed
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Basic Speed Calculation</strong><br><br>

A car travels <b>100 m</b> in <b>10 s</b>.<br><br>

<b>Step 1: Write formula</b><br>
Speed = Distance ÷ Time<br><br>

<b>Step 2: Substitute values</b><br>
Speed = 100 ÷ 10<br><br>

<b>Step 3: Calculate</b><br>
Speed = <b>10 m/s</b><br><br>

<b> Final Answer:</b> 10 m/s
</div>

<div class="example-box">
<strong> Example 2: Medium Distance Motion</strong><br><br>

A runner covers <b>200 m</b> in <b>20 s</b>.<br><br>

<b>Step 1: Formula</b><br>
Speed = Distance ÷ Time<br><br>

<b>Step 2: Substitute</b><br>
Speed = 200 ÷ 20<br><br>

<b>Step 3: Calculate</b><br>
Speed = <b>10 m/s</b><br><br>

<b> Final Answer:</b> 10 m/s<br><br>

<b> Insight:</b> Even different motions can have the same speed.
</div>

<div class="example-box">
<strong> Example 3: Real-Life Unit (km/h)</strong><br><br>

A cyclist travels <b>60 km</b> in <b>2 hours</b>.<br><br>

<b>Step 1: Formula</b><br>
Speed = Distance ÷ Time<br><br>

<b>Step 2: Substitute</b><br>
Speed = 60 ÷ 2<br><br>

<b>Step 3: Calculate</b><br>
Speed = <b>30 km/h</b><br><br>

<b> Final Answer:</b> 30 km/h<br><br>

<b> Insight:</b> km/h is commonly used for vehicles because it suits long distances.
</div>

<div class="example-box">
<strong> Example 4: Finding Distance</strong><br><br>

A train moves at <b>20 m/s</b> for <b>5 seconds</b>. Find distance travelled.<br><br>

<b>Step 1: Use rearranged formula</b><br>
Distance = Speed × Time<br><br>

<b>Step 2: Substitute values</b><br>
Distance = 20 × 5<br><br>

<b>Step 3: Calculate</b><br>
Distance = <b>100 m</b><br><br>

<b> Final Answer:</b> 100 m
</div>

<div class="example-box">
<strong> Example 5: Finding Time</strong><br><br>

A car travels <b>150 m</b> at a speed of <b>10 m/s</b>. Find time taken.<br><br>

<b>Step 1: Formula</b><br>
Time = Distance ÷ Speed<br><br>

<b>Step 2: Substitute</b><br>
Time = 150 ÷ 10<br><br>

<b>Step 3: Calculate</b><br>
Time = <b>15 s</b><br><br>

<b> Final Answer:</b> 15 seconds
</div>

<h3> KEY INSIGHTS</h3>
<div class="keyfact"> Speed only describes magnitude, not direction.</div>
<div class="keyfact"> Two objects can have the same speed but move differently.</div>
<div class="keyfact"> Speed can change if distance or time changes.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing speed with velocity (velocity includes direction).</li>
<li>Mixing units (m/s vs km/h without conversion).</li>
<li>Using total distance incorrectly in multi-step motion problems.</li>
</ul>
`,
  [
    {
      q: "A runner covers 200 m in 25 s. Find speed.",
      hint: "Use speed = distance ÷ time",
      formula: "v = s / t",
      steps: [
        "Step 1: Identify values → s = 200 m, t = 25 s",
        "Step 2: Substitute → v = 200 ÷ 25",
        "Step 3: Calculate → v = 8 m/s",
      ],
      ans: "8 m/s",
      final_check: "Speed should be in m/s",
      common_mistakes: ["Using wrong formula", "Reversing division order"],
      explanation: "Speed is the rate of covering distance per unit time.",
    },

    {
      q: "A car travels 360 km in 6 hours. Find speed.",
      hint: "distance ÷ time",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 360 km, t = 6 h",
        "Step 2: v = 360 ÷ 6",
        "Step 3: v = 60 km/h",
      ],
      ans: "60 km/h",
      final_check: "Unit must be km/h",
      common_mistakes: ["Mixing km and m incorrectly", "Wrong division setup"],
      explanation:
        "Speed in km/h is calculated using total distance divided by total time.",
    },

    {
      q: "A body moves 500 m in 50 s. Find speed.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 500 m, t = 50 s",
        "Step 2: v = 500 ÷ 50",
        "Step 3: v = 10 m/s",
      ],
      ans: "10 m/s",
      final_check: "Correct unit is m/s",
      common_mistakes: ["Ignoring units", "Incorrect arithmetic"],
      explanation: "Speed measures how fast distance is covered.",
    },

    {
      q: "A cyclist moves 120 km in 4 hours. Find speed.",
      hint: "distance ÷ time",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 120 km, t = 4 h",
        "Step 2: v = 120 ÷ 4",
        "Step 3: v = 30 km/h",
      ],
      ans: "30 km/h",
      final_check: "Unit must be km/h",
      common_mistakes: ["Wrong unit conversion", "Reversing formula"],
      explanation: "Speed is distance divided by time.",
    },

    {
      q: "A car travels 75 m in 5 s. Find speed.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 75 m, t = 5 s",
        "Step 2: v = 75 ÷ 5",
        "Step 3: v = 15 m/s",
      ],
      ans: "15 m/s",
      final_check: "Speed must be positive",
      common_mistakes: [
        "Using multiplication instead of division",
        "Wrong unit interpretation",
      ],
      explanation:
        "Speed is proportional to distance and inversely proportional to time.",
    },

    {
      q: "A train covers 900 m in 30 s. Find speed.",
      hint: "distance ÷ time",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 900 m, t = 30 s",
        "Step 2: v = 900 ÷ 30",
        "Step 3: v = 30 m/s",
      ],
      ans: "30 m/s",
      final_check: "Check correct SI unit",
      common_mistakes: [
        "Wrong division order",
        "Forgetting unit conversion if needed",
      ],
      explanation: "Speed measures how quickly distance is covered.",
    },

    {
      q: "A car covers 1.2 km in 60 s. Find speed in m/s.",
      hint: "convert km to m first",
      formula: "v = s / t",
      steps: [
        "Step 1: Convert 1.2 km → 1200 m",
        "Step 2: t = 60 s",
        "Step 3: v = 1200 ÷ 60",
        "Step 4: v = 20 m/s",
      ],
      ans: "20 m/s",
      Final_check: "Final unit must be m/s",
      common_mistakes: [
        "Forgetting unit conversion",
        "Using km directly with seconds",
      ],
      explanation:
        "Always convert distance into SI units before calculating speed.",
    },
  ],
);
/* =========================
   3. VELOCITY (IMPROVED)
========================= */

add(
  "physics",
  "motion",
  "Velocity",
  `
<h2>Velocity</h2> 
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Velocity describes how fast an object’s <b>displacement changes with time</b>.
It tells both <b>how fast</b> something is moving and <b>in which direction</b>.
</p>

<div class="keyfact"> KEY IDEA: Velocity = speed + direction (it depends on displacement, not distance).</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Velocity</b> is the rate of change of displacement with time.
It is a <b>vector quantity</b> (has magnitude and direction).
</p>

<div class="formula">
v = s / t
</div>

<h3> KEY CONCEPTS</h3>
<ul>
<li>Velocity depends on <b>displacement</b>, not distance</li>
<li>Direction is essential (east, west, north, south)</li>
<li>SI unit: <b>m/s</b></li>
<li>Can be positive, negative, or zero</li>
<li>Zero velocity means no change in position</li>
</ul>

<h3> IMPORTANT TYPES OF VELOCITY</h3>
<ul>
<li><b>Average velocity</b> = total displacement ÷ total time</li>
<li><b>Instantaneous velocity</b> = velocity at a specific moment</li>
</ul>

<div class="formula">
Average velocity = Total displacement / Total time
</div>

<h3> MOTION GRAPHS</h3>

<p><b>Displacement–Time Graph</b></p>


<p><b>Velocity–Time Graph</b></p>


<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Basic Velocity</strong><br><br>

A student walks <b>240 m north</b> in <b>12 s</b>.<br><br>

<b>Step 1: Identify values</b><br>
s = 240 m, t = 12 s<br><br>

<b>Step 2: Formula</b><br>
v = s ÷ t<br><br>

<b>Step 3: Substitute</b><br>
v = 240 ÷ 12<br><br>

<b>Step 4: Calculate</b><br>
v = <b>20 m/s north</b><br><br>

<b> Final Answer:</b> 20 m/s north
</div>

<div class="example-box">
<strong> Example 2: Opposite Directions</strong><br><br>

A person moves <b>150 m east</b> then <b>50 m west</b> in <b>10 s</b>.<br><br>

<b>Step 1: Find displacement</b><br>
Net displacement = 150 − 50 = <b>100 m east</b><br><br>

<b>Step 2: Formula</b><br>
v = s ÷ t<br><br>

<b>Step 3: Substitute</b><br>
v = 100 ÷ 10<br><br>

<b>Step 4: Calculate</b><br>
v = <b>10 m/s east</b><br><br>

<b> Final Answer:</b> 10 m/s east
</div>

<div class="example-box">
<strong> Example 3: Zero Velocity Concept</strong><br><br>

A runner completes a <b>400 m track</b> and returns to the starting point in <b>50 s</b>.<br><br>

<b>Step 1: Understand displacement</b><br>
Start position = End position → displacement = 0 m<br><br>

<b>Step 2: Formula</b><br>
v = s ÷ t<br><br>

<b>Step 3: Substitute</b><br>
v = 0 ÷ 50 = <b>0 m/s</b><br><br>

<b> Final Answer:</b> 0 m/s<br><br>

<b> Insight:</b> You can move a long distance but still have zero velocity.
</div>

<div class="example-box">
<strong> Example 4: Circular Motion Concept</strong><br><br>

A car moves in a circle at constant speed of <b>15 m/s</b>.<br><br>

<b>Step 1: Understand motion</b><br>
Speed remains constant, but direction keeps changing.<br><br>

<b>Step 2: Effect on velocity</b><br>
Since velocity depends on direction, velocity is changing continuously.<br><br>

<b> Final Conclusion:</b> Velocity changes even if speed is constant.
</div>

<h3> KEY INSIGHTS</h3>
<div class="keyfact"> Velocity depends on displacement, not distance.</div>
<div class="keyfact"> Direction is essential in velocity.</div>
<div class="keyfact"> Velocity can be zero even when motion occurs.</div>
<div class="keyfact"> Changing direction means changing velocity.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing velocity with speed</li>
<li>Ignoring direction signs (+ / -)</li>
<li>Using distance instead of displacement</li>
</ul>
`,
  [
    {
      q: "A car travels 150 m in 5 s. Find its velocity.",
      hint: "Use v = distance ÷ time",
      formula: "v = s / t",
      steps: [
        "Step 1: Identify values → s = 150 m, t = 5 s",
        "Step 2: Substitute into formula → v = 150 ÷ 5",
        "Step 3: Calculate → v = 30 m/s",
      ],
      ans: "30 m/s",
      final_check: "Velocity must be in m/s and positive for forward motion",
      common_mistakes: [
        "Confusing velocity with acceleration",
        "Dividing time by distance instead of distance by time",
      ],
      explanation: "Velocity is the rate of change of displacement with time.",
    },

    {
      q: "A runner covers 100 m in 20 s. Find velocity.",
      hint: "Use v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 100 m, t = 20 s",
        "Step 2: v = 100 ÷ 20",
        "Step 3: v = 5 m/s",
      ],
      ans: "5 m/s",
      final_check: "Check unit is m/s",
      common_mistakes: ["Forgetting units", "Incorrect division"],
      explanation:
        "Velocity tells how fast and in what direction an object moves.",
    },

    {
      q: "A body moves with velocity 12 m/s for 8 s. Find distance covered.",
      hint: "Use s = v × t",
      formula: "s = vt",
      steps: [
        "Step 1: v = 12 m/s, t = 8 s",
        "Step 2: s = 12 × 8",
        "Step 3: s = 96 m",
      ],
      ans: "96 m",
      final_check: "Distance should increase with time",
      common_mistakes: [
        "Dividing instead of multiplying",
        "Wrong formula choice",
      ],
      explanation:
        "Distance is product of velocity and time when motion is uniform.",
    },

    {
      q: "A train moves 300 m in 10 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 300 m, t = 10 s",
        "Step 2: v = 300 ÷ 10",
        "Step 3: v = 30 m/s",
      ],
      ans: "30 m/s",
      final_check: "Correct unit is m/s",
      common_mistakes: [
        "Using wrong formula",
        "Mixing up speed and velocity concept",
      ],
      explanation: "Velocity depends on displacement per time.",
    },

    {
      q: "A car covers 240 m in 12 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 240 m, t = 12 s",
        "Step 2: v = 240 ÷ 12",
        "Step 3: v = 20 m/s",
      ],
      ans: "20 m/s",
      final_check: "Velocity should be reasonable for a car",
      common_mistakes: ["Incorrect division", "Forgetting units"],
      explanation: "Velocity shows rate of motion.",
    },

    {
      q: "A cyclist moves 60 m in 6 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 60 m, t = 6 s",
        "Step 2: v = 60 ÷ 6",
        "Step 3: v = 10 m/s",
      ],
      ans: "10 m/s",
      final_check: "Check correct unit m/s",
      common_mistakes: ["Wrong substitution", "Confusing with acceleration"],
      explanation: "Velocity is constant motion over time.",
    },

    {
      q: "A body travels 500 m in 25 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 500 m, t = 25 s",
        "Step 2: v = 500 ÷ 25",
        "Step 3: v = 20 m/s",
      ],
      ans: "20 m/s",
      final_check: "Velocity should be consistent with motion",
      common_mistakes: ["Wrong division", "Ignoring units"],
      explanation: "Velocity is displacement per time.",
    },

    {
      q: "A car moves at 15 m/s for 10 s. Find distance.",
      hint: "s = vt",
      formula: "s = vt",
      steps: [
        "Step 1: v = 15 m/s, t = 10 s",
        "Step 2: s = 15 × 10",
        "Step 3: s = 150 m",
      ],
      ans: "150 m",
      final_check: "Distance increases with time",
      common_mistakes: [
        "Using division instead of multiplication",
        "Confusing velocity and acceleration",
      ],
      explanation: "Distance is product of velocity and time.",
    },

    {
      q: "A runner moves 200 m in 40 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 200 m, t = 40 s",
        "Step 2: v = 200 ÷ 40",
        "Step 3: v = 5 m/s",
      ],
      ans: "5 m/s",
      final_check: "Check unit m/s",
      common_mistakes: ["Wrong substitution", "Arithmetic errors"],
      explanation: "Velocity measures how fast distance is covered.",
    },

    {
      q: "A vehicle covers 360 m in 18 s. Find velocity.",
      hint: "v = s / t",
      formula: "v = s / t",
      steps: [
        "Step 1: s = 360 m, t = 18 s",
        "Step 2: v = 360 ÷ 18",
        "Step 3: v = 20 m/s",
      ],
      ans: "20 m/s",
      final_check: "Velocity must be positive",
      common_mistakes: [
        "Incorrect division",
        "Mixing speed and velocity concepts",
      ],
      explanation: "Velocity is displacement per time.",
    },
  ],
);
/* =========================
   4. ACCELERATION (IMPROVED)
========================= */

add(
  "physics",
  "motion",
  "Acceleration",
  `
    <h2>Acceleration</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Acceleration describes how quickly an object's velocity changes.
This means an object is accelerating if it is:
<ul>
<li>Speeding up</li>
<li>Slowing down</li>
<li>Changing direction</li>
</ul>
</p>

<div class="keyfact"> KEY IDEA: Acceleration is about CHANGE in velocity, not just motion.</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Acceleration</b> is the rate of change of velocity with respect to time.
</p>

<h3> KEY POINTS</h3>
<ul>
<li>Acceleration = change in velocity ÷ time taken</li>
<li>It is a <b>vector quantity</b> (has magnitude and direction)</li>
<li>SI unit: <b>m/s² (metres per second squared)</b></li>
<li>Positive acceleration → speeding up</li>
<li>Negative acceleration → slowing down (deceleration / retardation)</li>
</ul>

<div class="formula">
Acceleration = (Final velocity − Initial velocity) / Time
</div>

<h3> IMPORTANT REARRANGED FORMULAS</h3>
<div class="formula">
Final velocity = Initial velocity + (Acceleration × Time)<br>
Initial velocity = Final velocity − (Acceleration × Time)<br>
Time = (Final velocity − Initial velocity) ÷ Acceleration
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Basic Acceleration</strong><br><br>

A car increases its speed from <b>0 m/s</b> to <b>20 m/s</b> in <b>5 s</b>.<br><br>

<b>Step 1: Write formula</b><br>
Acceleration = (Final velocity − Initial velocity) ÷ Time<br><br>

<b>Step 2: Substitute values</b><br>
Acceleration = (20 − 0) ÷ 5<br><br>

<b>Step 3: Calculate</b><br>
Acceleration = 20 ÷ 5 = <b>4 m/s²</b><br><br>

<b> Final Answer:</b> 4 m/s²
</div>

<div class="example-box">
<strong> Example 2: Increasing Speed</strong><br><br>

A cyclist speeds up from <b>5 m/s</b> to <b>25 m/s</b> in <b>10 s</b>.<br><br>

<b>Step 1: Formula</b><br>
Acceleration = (v − u) ÷ t<br><br>

<b>Step 2: Substitute</b><br>
Acceleration = (25 − 5) ÷ 10<br><br>

<b>Step 3: Calculate</b><br>
Acceleration = 20 ÷ 10 = <b>2 m/s²</b><br><br>

<b> Final Answer:</b> 2 m/s²
</div>

<div class="example-box">
<strong> Example 3: Deceleration (Slowing Down)</strong><br><br>

A car slows from <b>30 m/s</b> to <b>10 m/s</b> in <b>5 s</b>.<br><br>

<b>Step 1: Formula</b><br>
Acceleration = (v − u) ÷ t<br><br>

<b>Step 2: Substitute</b><br>
Acceleration = (10 − 30) ÷ 5<br><br>

<b>Step 3: Calculate</b><br>
Acceleration = −20 ÷ 5 = <b>−4 m/s²</b><br><br>

<b> Final Answer:</b> −4 m/s²<br><br>

<b> Insight:</b> Negative sign means the object is slowing down.
</div>

<div class="example-box">
<strong> Example 4: Finding Final Velocity</strong><br><br>

A bus starts at <b>10 m/s</b> and accelerates at <b>3 m/s²</b> for <b>6 s</b>.<br><br>

<b>Step 1: Use formula</b><br>
v = u + at<br><br>

<b>Step 2: Substitute</b><br>
v = 10 + (3 × 6)<br><br>

<b>Step 3: Calculate</b><br>
v = 10 + 18 = <b>28 m/s</b><br><br>

<b> Final Answer:</b> 28 m/s
</div>

<div class="example-box">
<strong> Example 5: Finding Time</strong><br><br>

A car increases speed from <b>15 m/s</b> to <b>35 m/s</b> with an acceleration of <b>5 m/s²</b>.<br><br>

<b>Step 1: Formula</b><br>
t = (v − u) ÷ a<br><br>

<b>Step 2: Substitute</b><br>
t = (35 − 15) ÷ 5<br><br>

<b>Step 3: Calculate</b><br>
t = 20 ÷ 5 = <b>4 s</b><br><br>

<b> Final Answer:</b> 4 seconds
</div>

<h3> KEY INSIGHTS</h3>
<div class="keyfact"> Acceleration depends on change in velocity, not just speed.</div>
<div class="keyfact"> Zero acceleration means constant velocity.</div>
<div class="keyfact"> Negative acceleration means slowing down.</div>
<div class="keyfact"> Even direction change means acceleration.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing acceleration with speed.</li>
<li>Ignoring the negative sign in deceleration.</li>
<li>Using speed instead of velocity (direction matters).</li>
</ul>
`,
  [
    {
      q: "A car speeds up from 0 m/s to 20 m/s in 5 s. Find acceleration.",
      hint: "Use a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: Identify values → u = 0 m/s, v = 20 m/s, t = 5 s",
        "Step 2: Substitute into formula → a = (20 - 0) / 5",
        "Step 3: Calculate → a = 4 m/s²",
      ],
      ans: "4 m/s²",
      final_check: "Positive acceleration means speed is increasing",
      common_mistakes: [
        "Reversing subtraction order",
        "Forgetting time division",
      ],
      explanation: "Acceleration measures change in velocity per unit time.",
    },

    {
      q: "A car slows from 30 m/s to 10 m/s in 5 s. Find acceleration.",
      hint: "Use a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 30 m/s, v = 10 m/s, t = 5 s",
        "Step 2: a = (10 - 30) / 5",
        "Step 3: a = -20 / 5",
        "Step 4: a = -4 m/s²",
      ],
      ans: "-4 m/s²",
      final_check: "Negative value shows deceleration",
      common_mistakes: ["Ignoring negative sign", "Swapping u and v"],
      explanation: "Negative acceleration means the object is slowing down.",
    },

    {
      q: "A bike increases speed from 5 m/s to 25 m/s in 10 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 5, v = 25, t = 10",
        "Step 2: a = (25 - 5) / 10",
        "Step 3: a = 20 / 10",
        "Step 4: a = 2 m/s²",
      ],
      ans: "2 m/s²",
      final_check: "Acceleration should be positive",
      common_mistakes: ["Forgetting to subtract velocities", "Wrong division"],
      explanation: "The bike is speeding up uniformly.",
    },

    {
      q: "A train slows from 40 m/s to 20 m/s in 8 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 40, v = 20, t = 8",
        "Step 2: a = (20 - 40) / 8",
        "Step 3: a = -20 / 8",
        "Step 4: a = -2.5 m/s²",
      ],
      ans: "-2.5 m/s²",
      final_check: "Negative value indicates slowing down",
      common_mistakes: ["Ignoring negative sign", "Incorrect subtraction"],
      explanation: "The train is decelerating.",
    },

    {
      q: "A car accelerates from 10 m/s to 30 m/s in 4 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 10, v = 30, t = 4",
        "Step 2: a = (30 - 10) / 4",
        "Step 3: a = 20 / 4",
        "Step 4: a = 5 m/s²",
      ],
      ans: "5 m/s²",
      final_check: "Positive acceleration expected",
      common_mistakes: [
        "Mixing up initial and final velocity",
        "Wrong division",
      ],
      explanation: "Speed increases steadily over time.",
    },

    {
      q: "A body slows from 50 m/s to 10 m/s in 8 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 50, v = 10, t = 8",
        "Step 2: a = (10 - 50) / 8",
        "Step 3: a = -40 / 8",
        "Step 4: a = -5 m/s²",
      ],
      ans: "-5 m/s²",
      final_check: "Strong deceleration indicated",
      common_mistakes: ["Using wrong order in subtraction", "Forgetting sign"],
      explanation: "Large negative acceleration shows rapid slowing.",
    },

    {
      q: "A motorcycle increases speed from 12 m/s to 24 m/s in 6 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 12, v = 24, t = 6",
        "Step 2: a = (24 - 12) / 6",
        "Step 3: a = 12 / 6",
        "Step 4: a = 2 m/s²",
      ],
      ans: "2 m/s²",
      final_check: "Uniform acceleration confirmed",
      common_mistakes: ["Incorrect subtraction", "Wrong time division"],
      explanation: "Acceleration is constant during motion.",
    },

    {
      q: "A bus slows from 60 m/s to 30 m/s in 10 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 60, v = 30, t = 10",
        "Step 2: a = (30 - 60) / 10",
        "Step 3: a = -30 / 10",
        "Step 4: a = -3 m/s²",
      ],
      ans: "-3 m/s²",
      final_check: "Negative shows slowing motion",
      common_mistakes: ["Swapping values", "Ignoring negative sign"],
      explanation: "Bus is decelerating uniformly.",
    },

    {
      type: "calc",
      q: "A car increases speed from 8 m/s to 32 m/s in 12 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 8, v = 32, t = 12",
        "Step 2: a = (32 - 8) / 12",
        "Step 3: a = 24 / 12",
        "Step 4: a = 2 m/s²",
      ],
      ans: "2 m/s²",
      final_check: "Positive uniform acceleration",
      common_mistakes: ["Incorrect subtraction", "Wrong division"],
      explanation: "Speed increases steadily.",
    },

    {
      q: "A train slows from 70 m/s to 40 m/s in 15 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 70, v = 40, t = 15",
        "Step 2: a = (40 - 70) / 15",
        "Step 3: a = -30 / 15",
        "Step 4: a = -2 m/s²",
      ],
      ans: "-2 m/s²",
      final_check: "Deceleration confirmed",
      common_mistakes: ["Wrong order in subtraction", "Sign errors"],
      explanation: "Train slows down steadily.",
    },

    {
      q: "A car goes from 15 m/s to 45 m/s in 6 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 15, v = 45, t = 6",
        "Step 2: a = (45 - 15) / 6",
        "Step 3: a = 30 / 6",
        "Step 4: a = 5 m/s²",
      ],
      ans: "5 m/s²",
      final_check: "High positive acceleration",
      common_mistakes: ["Incorrect subtraction", "Division errors"],
      explanation: "Car gains speed quickly.",
    },

    {
      q: "A vehicle slows from 25 m/s to 5 m/s in 5 s. Find acceleration.",
      hint: "a = (v - u) / t",
      formula: "a = (v - u) / t",
      steps: [
        "Step 1: u = 25, v = 5, t = 5",
        "Step 2: a = (5 - 25) / 5",
        "Step 3: a = -20 / 5",
        "Step 4: a = -4 m/s²",
      ],
      ans: "-4 m/s²",
      final_check: "Strong deceleration",
      common_mistakes: ["Reversing values", "Ignoring negative sign"],
      explanation: "Vehicle is slowing down steadily.",
    },
  ],
);
/* =========================
   5. EQUATIONS OF MOTION 
========================= */

add(
  "physics",
  "motion",
  "Equations of Motion",
  `
    <h2>Equations of Motion</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
The equations of motion describe how objects move when they are accelerating uniformly.
They connect <b>velocity, acceleration, time, and displacement</b>.
</p>

<div class="keyfact"> KEY IDEA: These equations only work when acceleration is constant (uniform acceleration).</div>

<h3> IMPORTANT SYMBOLS</h3>
<ul>
<li><b>u</b> = initial velocity (m/s)</li>
<li><b>v</b> = final velocity (m/s)</li>
<li><b>a</b> = acceleration (m/s²)</li>
<li><b>t</b> = time (s)</li>
<li><b>s</b> = displacement (m)</li>
</ul>

<h3> THE 3 EQUATIONS OF MOTION</h3>

<div class="formula">
1) v = u + at
</div>

<div class="formula">
2) s = ut + ½at²
</div>

<div class="formula">
3) v² = u² + 2as
</div>

<h3> WHY WE NEED THESE EQUATIONS</h3>
<ul>
<li>To find unknown velocity, time, displacement, or acceleration</li>
<li>To solve real-world motion problems (cars, falling objects, rockets)</li>
<li>To analyze motion under constant acceleration</li>
</ul>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Final Velocity</strong><br><br>

A car starts at <b>u = 5 m/s</b> and accelerates at <b>a = 3 m/s²</b> for <b>t = 4 s</b>.<br><br>

<b>Step 1: Use equation</b><br>
v = u + at<br><br>

<b>Step 2: Substitute values</b><br>
v = 5 + (3 × 4)<br><br>

<b>Step 3: Calculate</b><br>
v = 5 + 12 = <b>17 m/s</b><br><br>

<b> Final Answer:</b> 17 m/s
</div>

<div class="example-box">
<strong> Example 2: Displacement (Acceleration Motion)</strong><br><br>

A body starts from rest (u = 0), accelerates at <b>2 m/s²</b> for <b>6 s</b>.<br><br>

<b>Step 1: Use equation</b><br>
s = ut + ½at²<br><br>

<b>Step 2: Substitute</b><br>
s = (0 × 6) + ½(2 × 6²)<br><br>

<b>Step 3: Calculate</b><br>
s = 0 + 1 × 36 = <b>36 m</b><br><br>

<b> Final Answer:</b> 36 m
</div>

<div class="example-box">
<strong> Example 3: Final Velocity (No Time Needed)</strong><br><br>

A car has initial velocity <b>u = 10 m/s</b>, acceleration <b>a = 4 m/s²</b>, and displacement <b>s = 20 m</b>.<br><br>

<b>Step 1: Use equation</b><br>
v² = u² + 2as<br><br>

<b>Step 2: Substitute</b><br>
v² = 10² + 2(4)(20)<br><br>

<b>Step 3: Calculate</b><br>
v² = 100 + 160 = 260<br>
v = √260 ≈ <b>16.1 m/s</b><br><br>

<b> Final Answer:</b> ≈ 16.1 m/s
</div>

<div class="example-box">
<strong> Example 4: Finding Acceleration</strong><br><br>

A train increases speed from <b>u = 15 m/s</b> to <b>v = 35 m/s</b> in <b>5 s</b>.<br><br>

<b>Step 1: Use equation</b><br>
v = u + at<br><br>

<b>Step 2: Rearrange</b><br>
a = (v − u) ÷ t<br><br>

<b>Step 3: Substitute</b><br>
a = (35 − 15) ÷ 5<br><br>

<b>Step 4: Calculate</b><br>
a = 20 ÷ 5 = <b>4 m/s²</b><br><br>

<b> Final Answer:</b> 4 m/s²
</div>

<h3> KEY INSIGHTS</h3>
<div class="keyfact"> Use the correct equation based on known values.</div>
<div class="keyfact"> All equations assume constant acceleration.</div>
<div class="keyfact"> Displacement is NOT the same as distance in these equations.</div>
<div class="keyfact"> Always check units before solving.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Using equations when acceleration is not constant.</li>
<li>Mixing up u and v.</li>
<li>Forgetting to square root in v² equation.</li>
<li>Using distance instead of displacement.</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Think: “SUVAT system” <br>
S = displacement<br>
U = initial velocity<br>
V = final velocity<br>
A = acceleration<br>
T = time
</div>
`,
  [
    {
      q: "A body starts from rest and accelerates at 2 m/s² for 6 s. Find final velocity.",
      hint: "Use v = u + at",
      formula: "v = u + at",
      steps: [
        "Step 1: Identify values → u = 0 m/s, a = 2 m/s², t = 6 s",
        "Step 2: Substitute → v = 0 + (2 × 6)",
        "Step 3: Multiply → v = 12 m/s",
      ],
      ans: "12 m/s",
      final_check: "Velocity increases because acceleration is positive",
      common_mistakes: [
        "Forgetting u = 0 when starting from rest",
        "Incorrect multiplication of a and t",
      ],
      explanation: "Acceleration increases velocity over time from rest.",
    },

    {
      q: "A car moves with u = 5 m/s, a = 3 m/s², t = 4 s. Find final velocity.",
      hint: "Use v = u + at",
      formula: "v = u + at",
      steps: [
        "Step 1: Identify values → u = 5, a = 3, t = 4",
        "Step 2: Multiply → a × t = 12",
        "Step 3: Add → v = 5 + 12 = 17 m/s",
      ],
      ans: "17 m/s",
      final_check: "Final velocity must be greater than initial velocity",
      common_mistakes: [
        "Subtracting instead of adding",
        "Wrong sign for acceleration",
      ],
      explanation: "Acceleration adds to initial velocity over time.",
    },

    {
      q: "A body has u = 20 m/s, a = -2 m/s², t = 5 s. Find final velocity.",
      hint: "Negative acceleration means deceleration",
      formula: "v = u + at",
      steps: [
        "Step 1: u = 20, a = -2, t = 5",
        "Step 2: Multiply → -2 × 5 = -10",
        "Step 3: v = 20 - 10 = 10 m/s",
      ],
      ans: "10 m/s",
      final_check: "Velocity decreases due to negative acceleration",
      common_mistakes: [
        "Ignoring negative sign",
        "Adding instead of subtracting",
      ],
      explanation: "Negative acceleration reduces velocity over time.",
    },

    {
      q: "A body has u = 0 m/s, a = 4 m/s², t = 3 s. Find displacement.",
      hint: "Use s = ut + 1/2 at²",
      formula: "s = ut + 1/2 at²",
      steps: [
        "Step 1: u = 0, a = 4, t = 3",
        "Step 2: ut = 0",
        "Step 3: t² = 9",
        "Step 4: s = 1/2 × 4 × 9",
        "Step 5: s = 2 × 9 = 18 m",
      ],
      ans: "18 m",
      final_check: "Displacement must be positive under acceleration",
      common_mistakes: ["Forgetting to square time", "Using wrong formula"],
      explanation: "Displacement increases as object accelerates from rest.",
    },

    {
      q: "A body moves with u = 8 m/s, a = 2 m/s², t = 5 s. Find displacement.",
      hint: "Use s = ut + 1/2 at²",
      formula: "s = ut + 1/2 at²",
      steps: [
        "Step 1: ut = 8 × 5 = 40",
        "Step 2: t² = 25",
        "Step 3: 1/2 × 2 × 25 = 25",
        "Step 4: s = 40 + 25 = 65 m",
      ],
      ans: "65 m",
      final_check:
        "Total displacement includes initial motion + acceleration effect",
      common_mistakes: ["Ignoring first term ut", "Wrong squaring of time"],
      explanation: "Displacement is total distance covered under acceleration.",
    },

    {
      q: "A body has u = 10 m/s, v = 30 m/s, a = 4 m/s². Find time.",
      hint: "Use v = u + at",
      formula: "t = (v - u) / a",
      steps: [
        "Step 1: v = 30, u = 10, a = 4",
        "Step 2: v - u = 20",
        "Step 3: t = 20 / 4",
        "Step 4: t = 5 s",
      ],
      ans: "5 s",
      final_check: "Time must be positive",
      common_mistakes: [
        "Using wrong rearrangement",
        "Subtracting in wrong order",
      ],
      explanation:
        "Time is found from change in velocity divided by acceleration.",
    },

    {
      q: "A body has u = 4 m/s, v = 20 m/s, s = 24 m. Find acceleration.",
      hint: "Use v² = u² + 2as",
      formula: "v² = u² + 2as",
      steps: [
        "Step 1: 20² = 400",
        "Step 2: 4² = 16",
        "Step 3: 400 = 16 + 2a(24)",
        "Step 4: 400 - 16 = 384",
        "Step 5: 384 = 48a",
        "Step 6: a = 8 m/s²",
      ],
      ans: "8 m/s²",
      final_check: "Acceleration should be positive since velocity increases",
      common_mistakes: [
        "Forgetting squaring velocities",
        "Incorrect rearrangement",
      ],
      explanation:
        "This equation links velocity change with displacement and acceleration.",
    },

    {
      q: "A body has u = 15 m/s, v = 5 m/s, s = 20 m. Find acceleration.",
      hint: "Use v² = u² + 2as",
      formula: "v² = u² + 2as",
      steps: [
        "Step 1: 5² = 25",
        "Step 2: 15² = 225",
        "Step 3: 25 = 225 + 2a(20)",
        "Step 4: 25 - 225 = 40a",
        "Step 5: -200 = 40a",
        "Step 6: a = -5 m/s²",
      ],
      ans: "-5 m/s²",
      final_check: "Negative acceleration shows deceleration",
      common_mistakes: ["Ignoring negative result", "Wrong sign handling"],
      explanation: "Negative acceleration means the object is slowing down.",
    },

    {
      q: "A body starts from rest and travels 50 m in 5 s. Find acceleration.",
      hint: "Use s = ut + 1/2 at²",
      formula: "s = ut + 1/2 at²",
      steps: [
        "Step 1: u = 0, s = 50, t = 5",
        "Step 2: s = 1/2 a t²",
        "Step 3: 50 = 1/2 a × 25",
        "Step 4: 50 = 12.5a",
        "Step 5: a = 4 m/s²",
      ],
      ans: "4 m/s²",
      final_check: "Acceleration must be positive",
      common_mistakes: [
        "Forgetting ut term becomes zero",
        "Incorrect squaring of time",
      ],
      explanation: "Used when initial velocity is zero.",
    },

    {
      q: "A body has u = 6 m/s, a = 2 m/s², t = 8 s. Find final velocity.",
      hint: "Use v = u + at",
      formula: "v = u + at",
      steps: ["Step 1: a × t = 16", "Step 2: v = 6 + 16", "Step 3: v = 22 m/s"],
      ans: "22 m/s",
      final_check: "Velocity increases steadily with time",
      common_mistakes: [
        "Multiplying incorrectly",
        "Forgetting initial velocity",
      ],
      explanation:
        "Final velocity depends on initial velocity plus acceleration effect.",
    },
  ][
    ({
      q: "A car starts from rest and accelerates at 3 m/s² for 5 s. Find final velocity.",
      hint: "Use v = u + at",
      formula: "v = u + at",
      steps: [
        "Step 1: Identify values → u = 0 m/s, a = 3 m/s², t = 5 s",
        "Step 2: Substitute into formula → v = 0 + (3 × 5)",
        "Step 3: Multiply → v = 15 m/s",
      ],
      ans: "15 m/s",
      final_check:
        "Final velocity must be greater than initial velocity since acceleration is positive",
      common_mistakes: [
        "Using wrong formula (e.g. v = at only)",
        "Forgetting initial velocity u",
        "Incorrect multiplication of a and t",
      ],
      explanation:
        "Acceleration increases velocity over time, so final velocity depends on initial velocity plus change due to acceleration.",
    },
    {
      q: "A body moves with u = 10 m/s, a = 2 m/s², t = 4 s. Find displacement.",
      hint: "Use s = ut + 1/2 at²",
      formula: "s = ut + 1/2 at²",
      steps: [
        "Step 1: Identify values → u = 10 m/s, a = 2 m/s², t = 4 s",
        "Step 2: Calculate first term → ut = 10 × 4 = 40",
        "Step 3: Calculate second term → 1/2 × 2 × 4²",
        "Step 4: Square time → 4² = 16",
        "Step 5: Multiply → 1/2 × 2 × 16 = 16",
        "Step 6: Add both terms → 40 + 16 = 56 m",
      ],
      ans: "56 m",
      final_check:
        "Displacement should be larger than ut alone because of acceleration",
      common_mistakes: [
        "Forgetting to square time",
        "Using 1/2 incorrectly",
        "Adding wrong terms",
      ],
      explanation:
        "Displacement under acceleration includes both initial motion and extra distance due to speeding up.",
    },
    {
      q: "When do we use v² = u² + 2as?",
      hint: "no time given",
      ans: "When time is not given in the problem.",
      explanation:
        "This equation is used when you need to relate velocity, acceleration, and displacement without involving time.",
    })
  ],
);
/* =========================
   3. FRICTION
========================= */

add(
  "physics",
  "forces",
  "Friction",
  `
   <h2>Friction</h2>

<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Friction is a force that opposes the relative motion (or attempted motion) between two surfaces in contact.
It always acts along the surface and in the opposite direction of motion.
</p>

<div class="keyfact"> KEY IDEA: Friction is a resisting force — it tries to slow things down or stop motion.</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Friction</b> is the force that opposes motion between two surfaces that are touching each other.
</p>

<h3> KEY POINTS</h3>
<ul>
<li>Friction acts <b>opposite to motion</b></li>
<li>It occurs only when surfaces are in contact</li>
<li>It depends on surface roughness and normal force</li>
<li>It converts kinetic energy into heat</li>
</ul>

<h3> TYPES OF FRICTION</h3>
<ul>
<li><b>Static friction</b> → acts when an object is not moving but trying to move</li>
<li><b>Kinetic (sliding) friction</b> → acts when objects are sliding over each other</li>
<li><b>Rolling friction</b> → acts when objects roll (usually weaker than sliding friction)</li>
<li><b>Fluid friction</b> → resistance through air or water</li>
</ul>

<h3> EVERYDAY EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Walking</strong><br><br>
When you walk, your foot pushes backward on the ground.<br>
Friction between shoe and ground pushes you forward.<br><br>

<b> Result:</b> You move forward without slipping
</div>

<div class="example-box">
<strong> Example 2: Sliding a Book</strong><br><br>
A book sliding on a table slows down and eventually stops.<br><br>

<b>Step 1:</b> You apply force to move it forward<br>
<b>Step 2:</b> Friction acts backward opposing motion<br>
<b>Step 3:</b> Book loses energy and stops<br><br>

<b> Result:</b> Motion reduces due to friction
</div>

<div class="example-box">
<strong> Example 3: Car Braking</strong><br><br>
When a car brakes, tyres grip the road.<br><br>

<b>Step 1:</b> Brake force slows wheels<br>
<b>Step 2:</b> Friction between tyres and road increases resistance<br>
<b>Step 3:</b> Car stops safely<br><br>

<b> Result:</b> Friction is essential for stopping motion
</div>

<div class="example-box">
<strong> Example 4: Ice Surface (Low Friction)</strong><br><br>
A person slips easily on ice.<br><br>

<b>Reason:</b> Ice has very low friction, so there is little resistance to motion.<br><br>

<b> Result:</b> Hard to control movement
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Friction always opposes motion or attempted motion.</div>
<div class="keyfact"> Without friction, walking, driving, and holding objects would be impossible.</div>
<div class="keyfact"> Friction produces heat energy due to resistance.</div>
<div class="keyfact"> Rough surfaces → more friction, smooth surfaces → less friction.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking friction is always useless (it is essential for movement).</li>
<li>Forgetting friction acts opposite to motion.</li>
<li>Assuming smooth surfaces have no friction (they still have some).</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Friction = “Fight against motion” <br>
It always tries to slow things down 
</div>
`,
  [
    {
      q: "What is the role of friction when walking?",
      hint: "grip between surfaces",
      ans: "It provides grip between shoe and ground, preventing slipping and allowing forward movement.",
      explanation:
        "Friction acts opposite to slipping and allows the foot to push against the ground, enabling forward motion.",
    },

    {
      q: "Why do smooth surfaces have less friction?",
      hint: "surface irregularities",
      ans: "Because they have fewer irregularities, so surfaces slide more easily.",
      explanation:
        "Friction is caused by microscopic bumps on surfaces. Smoother surfaces reduce interlocking between these bumps.",
    },

    {
      q: "Is friction always bad? Explain.",
      hint: "useful and harmful effects",
      ans: "No, friction is necessary for walking, braking, writing, and many daily activities.",
      explanation:
        "Friction is both useful (movement control) and harmful (wear and energy loss), depending on the situation.",
    },

    {
      q: "A force of 50 N is applied to move a box, and friction force is 20 N. Find the resultant force.",
      hint: "net force = applied force − friction",
      formula: "F_net = F_applied − F_friction",
      steps: [
        "Step 1: Identify values → applied force = 50 N, friction = 20 N",
        "Step 2: Apply formula → F_net = 50 − 20",
        "Step 3: Calculate → F_net = 30 N",
      ],
      ans: "30 N",
      final_check: "Net force is less than applied force",
      common_mistakes: [
        "Adding friction instead of subtracting",
        "Ignoring direction of friction",
      ],
      explanation: "Friction opposes motion, reducing the effective force.",
    },

    {
      q: "A 10 kg object is pulled with a force of 15 N against friction. Will it move?",
      hint: "compare forces",
      formula: "Motion occurs if F_applied > F_friction",
      steps: [
        "Step 1: Identify applied force = 15 N",
        "Step 2: Compare with friction (assume friction = 15 N threshold)",
        "Step 3: If equal or less → no acceleration",
        "Step 4: Conclusion → object is just about to move or stays at rest",
      ],
      ans: "It will just start to move or remain at rest if equal",
      final_check: "Motion requires net force greater than zero",
      common_mistakes: [
        "Assuming mass determines motion directly",
        "Ignoring friction threshold",
      ],
      explanation: "An object moves only when applied force exceeds friction.",
    },

    {
      q: "A box is pushed with 25 N and friction is 10 N. Find net force and motion direction.",
      hint: "net force = difference",
      formula: "F_net = F_applied − F_friction",
      steps: [
        "Step 1: Applied force = 25 N, friction = 10 N",
        "Step 2: F_net = 25 − 10",
        "Step 3: F_net = 15 N",
        "Step 4: Direction is same as applied force",
      ],
      ans: "15 N forward",
      final_check: "Direction follows larger force",
      common_mistakes: ["Reversing direction", "Adding forces incorrectly"],
      explanation:
        "Net force determines both magnitude and direction of motion.",
    },

    {
      q: "A surface has friction of 6 N. A force of 6 N is applied. What happens?",
      hint: "balanced forces",
      formula: "F_net = F_applied − F_friction",
      steps: [
        "Step 1: Applied = 6 N, friction = 6 N",
        "Step 2: F_net = 6 − 6",
        "Step 3: F_net = 0 N",
        "Step 4: No acceleration occurs",
      ],
      ans: "Object does not accelerate",
      final_check: "Zero net force means equilibrium",
      common_mistakes: [
        "Assuming motion always happens",
        "Ignoring equal forces",
      ],
      explanation: "When forces are balanced, there is no change in motion.",
    },

    {
      q: "A 5 kg object is pushed with 40 N and friction is 15 N. Find acceleration (take g not needed).",
      hint: "F = ma and net force first",
      formula: "F_net = ma",
      steps: [
        "Step 1: Find net force → 40 − 15 = 25 N",
        "Step 2: Use F = ma",
        "Step 3: a = F/m = 25/5",
        "Step 4: a = 5 m/s²",
      ],
      ans: "5 m/s²",
      final_check: "Acceleration must be m/s²",
      common_mistakes: [
        "Forgetting to subtract friction first",
        "Dividing wrong values",
      ],
      explanation:
        "Acceleration depends on net force after friction is considered.",
    },
  ],
);
/* =========================================================
   PHYSICS: FORCES (MASTER UPGRADE)
========================================================= */

/* =========================
   1. TENSION & WEIGHT
========================= */

add(
  "physics",
  "forces",
  "Tension & Weight",
  `
    <h2>Tension & Weight</h2>

<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Forces can act in different ways. Some act through contact (like ropes), while others act at a distance (like gravity).
Two very important forces in mechanics are <b>tension</b> and <b>weight</b>.
</p>

<div class="keyfact"> KEY IDEA: Weight pulls objects downward due to gravity, while tension pulls along a rope or string.</div>

<h3> CLEAR DEFINITIONS</h3>
<ul>
<li><b>Tension</b> → The pulling force transmitted through a string, rope, or cable when it is stretched.</li>
<li><b>Weight</b> → The force exerted on an object due to gravity.</li>
</ul>

<h3> KEY POINTS</h3>
<ul>
<li>Tension acts <b>along the rope</b>, away from the object being pulled</li>
<li>Weight always acts <b>vertically downward</b></li>
<li>Weight depends on gravitational field strength</li>
<li>Mass stays constant, but weight can change depending on location</li>
<li>SI unit of both forces: <b>Newton (N)</b></li>
</ul>

<h3> FORMULA</h3>
<div class="formula">
Weight (W) = mg<br>
g ≈ 10 m/s² (on Earth)
</div>

<h3> MASS VS WEIGHT (IMPORTANT)</h3>
<ul>
<li>Mass (kg) → amount of matter, constant everywhere</li>
<li>Weight (N) → force due to gravity, changes with location</li>
</ul>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Finding Weight</strong><br><br>

A mass of <b>5 kg</b> is on Earth.<br><br>

<b>Step 1: Write formula</b><br>
W = mg<br><br>

<b>Step 2: Substitute values</b><br>
W = 5 × 10<br><br>

<b>Step 3: Calculate</b><br>
W = <b>50 N</b><br><br>

<b> Final Answer:</b> 50 N
</div>

<div class="example-box">
<strong> Example 2: Hanging Object (Tension)</strong><br><br>

A <b>10 kg</b> object hangs at rest on a rope.<br><br>

<b>Step 1: Find weight</b><br>
W = mg = 10 × 10 = <b>100 N</b><br><br>

<b>Step 2: Understand forces</b><br>
Object is stationary → forces are balanced<br><br>

<b>Step 3: Conclusion</b><br>
Tension = Weight = <b>100 N</b><br><br>

<b> Final Answer:</b> Tension = 100 N
</div>

<div class="example-box">
<strong> Example 3: Weight on Different Planets</strong><br><br>

A <b>2 kg</b> object is taken to the Moon where gravity is weaker.<br><br>

<b>Step 1: On Earth</b><br>
W = 2 × 10 = 20 N<br><br>

<b>Step 2: On Moon</b><br>
Gravity is smaller → weight decreases<br><br>

<b> Final Conclusion:</b> Mass stays 2 kg, but weight becomes smaller
</div>

<div class="example-box">
<strong> Example 4: Understanding Tension Direction</strong><br><br>

A box is pulled upward by a rope.<br><br>

<b>Step 1:</b> Tension acts along the rope upward<br>
<b>Step 2:</b> Weight acts downward due to gravity<br>
<b>Step 3:</b> If box is stationary, tension = weight<br><br>

<b> Key Insight:</b> Tension always pulls, it never pushes.
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Weight depends on gravity, not just mass.</div>
<div class="keyfact"> Tension only exists in strings/ropes under pulling force.</div>
<div class="keyfact"> If an object is at rest, forces are balanced.</div>
<div class="keyfact"> Weight acts downward, tension acts along the rope.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing mass (kg) with weight (N)</li>
<li>Thinking tension pushes instead of pulling</li>
<li>Forgetting that weight changes on different planets</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Weight = “Earth pulling down” ⬇<br>
Tension = “Rope pulling tight” ⬆
</div>
`,
  [
    {
      q: "A mass of 8 kg is hanging on a rope. Find its weight.",
      hint: "Use W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: Identify values → m = 8 kg, g = 10 m/s²",
        "Step 2: Substitute → W = 8 × 10",
        "Step 3: Multiply → W = 80 N",
      ],
      ans: "80 N",
      final_check: "Unit must be Newton (N)",
      common_mistakes: [
        "Forgetting to multiply by g",
        "Confusing mass with weight",
      ],
      explanation: "Weight is the gravitational force acting on a mass.",
    },

    {
      q: "What happens to weight on the Moon?",
      hint: "gravity is weaker",
      ans: "Weight decreases because gravitational field strength is lower.",
      explanation:
        "Mass stays constant, but weight changes because it depends on gravitational field strength.",
    },

    {
      q: "What direction does tension act?",
      hint: "along rope",
      ans: "Along the rope, always pulling away from the object.",
      explanation:
        "Tension is a pulling force transmitted through a string, rope, or cable.",
    },

    {
      q: "A 5 kg object is on Earth. Find its weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 5 kg, g = 10 m/s²",
        "Step 2: W = 5 × 10",
        "Step 3: W = 50 N",
      ],
      ans: "50 N",
      final_check: "Answer must be in Newtons",
      common_mistakes: ["Using kg as final unit", "Forgetting gravity"],
      explanation: "Weight increases directly with mass.",
    },

    {
      q: "A 12 kg object is lifted on Earth. Find its weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 12 kg, g = 10 m/s²",
        "Step 2: W = 12 × 10",
        "Step 3: W = 120 N",
      ],
      ans: "120 N",
      final_check: "Correct unit is Newton (N)",
      common_mistakes: ["Wrong unit conversion", "Incorrect multiplication"],
      explanation: "Weight is the force due to gravity acting on a mass.",
    },

    {
      q: "A 3 kg object is on the Moon where g = 1.6 m/s². Find its weight.",
      hint: "use W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 3 kg, g = 1.6 m/s²",
        "Step 2: W = 3 × 1.6",
        "Step 3: W = 4.8 N",
      ],
      ans: "4.8 N",
      final_check: "Weight is smaller than Earth value",
      common_mistakes: ["Using Earth g value", "Wrong multiplication"],
      explanation: "Weight depends on gravitational field strength.",
    },

    {
      q: "A 6 kg object experiences a force of 60 N. Find acceleration.",
      hint: "Use F = ma",
      formula: "F = ma",
      steps: [
        "Step 1: F = 60 N, m = 6 kg",
        "Step 2: a = F / m",
        "Step 3: a = 60 / 6",
        "Step 4: a = 10 m/s²",
      ],
      ans: "10 m/s²",
      final_check: "Unit must be m/s²",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Wrong formula rearrangement",
      ],
      explanation: "Acceleration depends on force and mass.",
    },

    {
      q: "A 10 kg object has weight 100 N. Find gravitational field strength.",
      hint: "g = W / m",
      formula: "g = W / m",
      steps: [
        "Step 1: W = 100 N, m = 10 kg",
        "Step 2: g = 100 / 10",
        "Step 3: g = 10 m/s²",
      ],
      ans: "10 m/s²",
      final_check: "Correct Earth value",
      common_mistakes: ["Using wrong formula", "Confusing weight with mass"],
      explanation: "Gravitational field strength is weight per unit mass.",
    },

    {
      q: "Why do objects fall towards Earth?",
      hint: "attractive force",
      ans: "Because Earth exerts a gravitational force on all objects.",
      explanation:
        "Gravity pulls all objects with mass toward the center of the Earth.",
    },

    {
      q: "A 2 kg object is taken to a planet where g = 5 m/s². Find its weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 2 kg, g = 5 m/s²",
        "Step 2: W = 2 × 5",
        "Step 3: W = 10 N",
      ],
      ans: "10 N",
      final_check: "Check unit Newton (N)",
      common_mistakes: ["Using Earth gravity", "Incorrect multiplication"],
      explanation: "Weight changes with gravitational field strength.",
    },
  ],
);
/* =========================
   2. CIRCULAR MOTION
========================= */

add(
  "physics",
  "forces",
  "Circular Motion",
  `
   <h2>Circular Motion</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Circular motion happens when an object moves along a circular path.
Even if speed is constant, the object is still accelerating because its <b>direction is continuously changing</b>.
</p>

<div class="keyfact"> KEY IDEA: Circular motion requires a force toward the center called centripetal force.</div>

<h3> KEY CONCEPTS</h3>
<ul>
<li>Circular motion = motion in a circle</li>
<li><b>Centripetal force</b> always acts toward the center</li>
<li>Without centripetal force, the object moves in a straight line (Newton’s 1st law)</li>
<li>Centripetal force can be provided by tension, gravity, friction, or normal reaction</li>
</ul>

<h3> CENTRIPETAL FORCE FORMULA</h3>
<div class="formula">
F = mv² / r
</div>

<ul>
<li>F = centripetal force (N)</li>
<li>m = mass (kg)</li>
<li>v = speed (m/s)</li>
<li>r = radius of circular path (m)</li>
</ul>

<div class="keyfact"> KEY INSIGHT: Higher speed → more force needed. Larger radius → less force needed.</div>

<h3> REAL-LIFE APPLICATIONS</h3>

<div class="example-box">
<strong> Example 1: Car Turning on a Flat Road</strong><br><br>

A car turns around a bend.<br><br>

<b>Step 1:</b> The car wants to move straight due to inertia<br>
<b>Step 2:</b> Friction between tyres and road pulls it inward<br>
<b>Step 3:</b> This friction acts as centripetal force<br><br>

<b> Result:</b> Without friction, the car would skid outward
</div>

<div class="example-box">
<strong> Example 2: Banked Roads (Very Important)</strong><br><br>

Roads are tilted on curves (banked) to help vehicles turn safely.<br><br>

<b>Step 1:</b> Normal reaction force is tilted<br>
<b>Step 2:</b> Part of this force provides centripetal force<br>
<b>Step 3:</b> Less reliance on friction → safer turning<br><br>

<b> Key Insight:</b> Banking reduces risk of skidding at high speeds
</div>

<div class="example-box">
<strong> Example 3: Stone on a String</strong><br><br>

A stone is tied to a string and whirled in a circle.<br><br>

<b>Step 1:</b> The stone wants to fly outward (inertia)<br>
<b>Step 2:</b> Tension in the string pulls it inward<br>
<b>Step 3:</b> Tension = centripetal force<br><br>

<b> Result:</b> If string breaks → stone flies in a straight line
</div>

<div class="example-box">
<strong> Example 4: Swinging a Bucket of Water</strong><br><br>

A bucket of water is swung in a vertical circle.<br><br>

<b>Step 1:</b> At the top, gravity + motion keep water inside<br>
<b>Step 2:</b> If speed is high enough, water does not fall out<br>
<b>Step 3:</b> Centripetal force keeps water moving in a circle<br><br>

<b> Key Insight:</b> Minimum speed is required to prevent falling
</div>

<div class="example-box">
<strong> Example 5: Satellite Orbit</strong><br><br>

A satellite moves around Earth in orbit.<br><br>

<b>Step 1:</b> Gravity pulls satellite toward Earth<br>
<b>Step 2:</b> This gravity provides centripetal force<br>
<b>Step 3:</b> Continuous free-fall creates orbit<br><br>

<b> Result:</b> Satellite stays in circular motion
</div>

<h3> SPEED CONDITIONS (IMPORTANT INSIGHT)</h3>
<ul>
<li>If speed is too low → object falls inward/out of circular path</li>
<li>If speed is too high → object flies outward (no centripetal force enough)</li>
<li>Correct speed → stable circular motion</li>
</ul>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Centripetal force is not a new force — it is provided by real forces.</div>
<div class="keyfact"> Circular motion is accelerated motion even if speed is constant.</div>
<div class="keyfact"> Inertia tries to move objects in straight lines.</div>
<div class="keyfact"> Faster motion requires stronger centripetal force.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking “centrifugal force pushes outward” (it is not a real force)</li>
<li>Confusing speed and velocity in circular motion</li>
<li>Forgetting that direction is constantly changing</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Centripetal = “Center-seeking force” <br>
Without it → object flies straight 
</div>
`,
  [
    {
      q: "What force keeps a car moving in a circular path?",
      hint: "towards centre",
      ans: "Friction provides centripetal force.",
      explanation:
        "Friction between the tyres and the road acts towards the centre of the circle, keeping the car in circular motion.",
    },

    {
      q: "What provides centripetal force for a satellite?",
      hint: "Earth attraction",
      ans: "Gravity.",
      explanation:
        "The gravitational force between Earth and the satellite acts as the centripetal force that keeps it in orbit.",
    },

    {
      q: "Why are roads banked on curves?",
      hint: "safe turning",
      ans: "To reduce reliance on friction and help vehicles turn safely at higher speeds.",
      explanation:
        "Banking provides an additional component of normal reaction force towards the centre, reducing dependence on friction.",
    },

    {
      q: "What happens if a string holding a rotating stone breaks?",
      hint: "inertia",
      ans: "The stone moves in a straight line due to inertia.",
      explanation:
        "When the centripetal force is removed, the stone continues in the direction it was moving at that instant.",
    },

    {
      q: "A car moves in a circle of radius 10 m at a speed of 5 m/s. Find centripetal acceleration.",
      hint: "use a = v²/r",
      formula: "a = v² / r",
      steps: [
        "Step 1: Identify values → v = 5 m/s, r = 10 m",
        "Step 2: Apply formula → a = v² / r",
        "Step 3: Square velocity → 5² = 25",
        "Step 4: Substitute → a = 25 / 10",
        "Step 5: Calculate → a = 2.5 m/s²",
      ],
      ans: "2.5 m/s²",
      explanation:
        "Centripetal acceleration depends on speed and radius of the circular path.",
    },

    {
      q: "A stone of mass 2 kg moves in a circle of radius 4 m at speed 3 m/s. Find centripetal force.",
      hint: "use F = mv²/r",
      formula: "F = mv² / r",
      steps: [
        "Step 1: m = 2 kg, v = 3 m/s, r = 4 m",
        "Step 2: Square velocity → 3² = 9",
        "Step 3: Apply formula → F = (2 × 9) / 4",
        "Step 4: Multiply → F = 18 / 4",
        "Step 5: Final answer → F = 4.5 N",
      ],
      ans: "4.5 N",
      explanation:
        "Centripetal force increases with mass and speed, and decreases with radius.",
    },

    {
      type: "calc",
      q: "A satellite orbits Earth at constant speed. If gravity is 800 N, what force keeps it in orbit?",
      hint: "centripetal = gravity",
      formula: "F_c = F_g",
      steps: [
        "Step 1: Identify forces acting → gravity acts inward",
        "Step 2: Recognize circular motion condition",
        "Step 3: Centripetal force equals gravitational force",
        "Step 4: Therefore F = 800 N",
      ],
      ans: "800 N",
      explanation:
        "For satellites, gravity alone provides the centripetal force.",
    },

    {
      q: "Why does an object in circular motion need a force?",
      hint: "changing direction",
      ans: "Because its direction is constantly changing.",
      explanation:
        "Even if speed is constant, velocity changes due to continuous change in direction, requiring centripetal force.",
    },
  ],
);

/* =========================
   3. GRAVITATION
========================= */

add(
  "physics",
  "forces",
  "Gravitation",
  `
  <h2>Gravitation</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Gravitation is a universal force of attraction between any two objects that have mass.
It is one of the fundamental forces of nature and acts everywhere in the universe.
</p>

<div class="keyfact"> KEY IDEA: Every object with mass attracts every other object with mass.</div>

<h3> KEY CONCEPTS</h3>
<ul>
<li>Gravitational force acts between all masses</li>
<li>It is always attractive (never repulsive)</li>
<li>It acts over long distances (no contact needed)</li>
<li>Stronger when masses are large</li>
<li>Weaker when distance increases</li>
</ul>

<h3> NEWTON’S LAW OF UNIVERSAL GRAVITATION</h3>
<div class="formula">
F = Gm₁m₂ / r²
</div>

<ul>
<li>F = gravitational force (N)</li>
<li>G = gravitational constant</li>
<li>m₁, m₂ = masses</li>
<li>r = distance between centers of masses</li>
</ul>

<h3> NEAR EARTH GRAVITY</h3>
<div class="formula">
g ≈ 10 m/s²
</div>

<ul>
<li>g = gravitational field strength</li>
<li>Used to calculate weight near Earth</li>
</ul>

<div class="formula">
Weight (W) = mg
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Falling Object</strong><br><br>

An object is dropped from rest.<br><br>

<b>Step 1: Identify force</b><br>
Only force acting is gravity<br><br>

<b>Step 2: Acceleration</b><br>
Object accelerates downward at <b>g = 10 m/s²</b><br><br>

<b> Final Answer:</b> It falls with constant acceleration due to gravity
</div>

<div class="example-box">
<strong> Example 2: Weight Calculation</strong><br><br>

A mass of <b>3 kg</b> is on Earth.<br><br>

<b>Step 1: Formula</b><br>
W = mg<br><br>

<b>Step 2: Substitute</b><br>
W = 3 × 10<br><br>

<b>Step 3: Calculate</b><br>
W = <b>30 N</b><br><br>

<b> Final Answer:</b> 30 N
</div>

<div class="example-box">
<strong> Example 3: Distance Effect on Gravity</strong><br><br>

Two objects are moved farther apart.<br><br>

<b>Step 1:</b> Gravitational force depends on distance squared (1/r²)<br>
<b>Step 2:</b> Increasing distance reduces force rapidly<br><br>

<b> Final Insight:</b> Small increase in distance → big decrease in force
</div>

<div class="example-box">
<strong> Example 4: Universal Attraction</strong><br><br>

A book and a table attract each other.<br><br>

<b>Step 1:</b> Both have mass<br>
<b>Step 2:</b> Therefore both exert gravitational force<br>
<b>Step 3:</b> Force is extremely small, so we don’t notice it<br><br>

<b> Key Insight:</b> Gravity exists between all objects, not just planets
</div>

<div class="example-box">
<strong> Example 5: Orbit Concept</strong><br><br>

The Moon orbits Earth.<br><br>

<b>Step 1:</b> Earth pulls Moon via gravity<br>
<b>Step 2:</b> This force provides centripetal force<br>
<b>Step 3:</b> Moon keeps falling around Earth instead of straight into it<br><br>

<b> Final Insight:</b> Orbit = continuous free-fall due to gravity
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Gravity acts between all objects with mass in the universe.</div>
<div class="keyfact"> It is always attractive, never repulsive.</div>
<div class="keyfact"> Weight depends on gravity, mass does not.</div>
<div class="keyfact"> Gravity keeps planets, moons, and satellites in orbit.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking gravity only exists on Earth</li>
<li>Confusing mass (kg) with weight (N)</li>
<li>Forgetting that gravitational force decreases with distance squared</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Gravity = “Invisible pull between all things with mass” ⬇
</div>
`,
  [
    {
      q: "What is the value of g on Earth?",
      hint: "acceleration due to gravity",
      ans: "10 m/s² (approx)",
      explanation:
        "The standard value of gravitational acceleration on Earth is approximately 9.8 m/s², often rounded to 10 m/s² in basic calculations.",
    },

    {
      q: "What happens to gravitational force when distance increases?",
      hint: "inverse square law",
      ans: "It decreases rapidly (inverse square law).",
      explanation:
        "Gravitational force is inversely proportional to the square of the distance between two masses, meaning it becomes weaker as distance increases.",
    },

    {
      q: "Is gravity only on Earth? Explain.",
      hint: "universal force",
      ans: "No, gravity exists between all objects with mass in the universe.",
      explanation:
        "Gravity is a universal force that attracts all objects with mass, not just those on Earth.",
    },

    {
      q: "A mass of 2 kg is acted on by gravity. Find its weight on Earth.",
      hint: "use W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: Identify values → m = 2 kg, g = 10 m/s²",
        "Step 2: Apply formula → W = m × g",
        "Step 3: Substitute → W = 2 × 10",
        "Step 4: Calculate → W = 20 N",
      ],
      ans: "20 N",
      explanation: "Weight is the gravitational force acting on an object.",
    },

    {
      q: "A 5 kg object is on Earth. Find its weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 5 kg, g = 10 m/s²",
        "Step 2: W = 5 × 10",
        "Step 3: W = 50 N",
      ],
      ans: "50 N",
      explanation: "Weight increases with mass.",
    },

    {
      q: "A 3 kg object is taken to the Moon where g = 1.6 m/s². Find weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 3 kg, g = 1.6 m/s²",
        "Step 2: W = 3 × 1.6",
        "Step 3: W = 4.8 N",
      ],
      ans: "4.8 N",
      explanation: "Weight depends on gravitational field strength.",
    },

    {
      q: "A planet has g = 20 m/s². Find weight of a 2 kg object.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: m = 2 kg, g = 20 m/s²",
        "Step 2: W = 2 × 20",
        "Step 3: W = 40 N",
      ],
      ans: "40 N",
      explanation: "Stronger gravity produces greater weight.",
    },

    {
      q: "Why do objects fall towards Earth?",
      hint: "attractive force",
      ans: "Because Earth exerts a gravitational force on all objects.",
      explanation:
        "Gravity pulls all objects with mass towards the center of Earth.",
    },

    {
      q: "What is the difference between mass and weight?",
      hint: "gravity dependence",
      ans: "Mass is constant, weight depends on gravity.",
      explanation:
        "Mass is the amount of matter, while weight is the force due to gravity.",
    },

    {
      q: "A 4 kg object is taken from Earth (g = 10 m/s²) to a planet where g = 5 m/s². Find change in weight.",
      hint: "W = mg",
      formula: "W = mg",
      steps: [
        "Step 1: Earth weight → W₁ = 4 × 10 = 40 N",
        "Step 2: New weight → W₂ = 4 × 5 = 20 N",
        "Step 3: Change in weight → 40 - 20",
        "Step 4: Result → 20 N decrease",
      ],
      ans: "20 N decrease",
      explanation:
        "Weight decreases when gravitational field strength decreases.",
    },
  ],
);
/*======================================================
NEWTONS LAWS OF MOTION
=======================================================*/
add(
  "physics",
  "forces",
  "Newton's Laws of Motion",
  `
  <h2>Newton’s Laws of Motion</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Newton’s Laws explain how and why objects move or stay at rest.
They describe the relationship between force, mass, and motion.
</p>

<div class="keyfact"> KEY IDEA: Motion changes only when a net (resultant) force acts.</div>

<h3> NEWTON’S FIRST LAW (LAW OF INERTIA)</h3>
<p>
An object remains at rest or continues moving in a straight line at constant speed unless acted upon by an external force.
</p>

<ul>
<li>Explains inertia (resistance to change in motion)</li>
<li>No net force → no change in motion</li>
<li>Objects “like” to keep doing what they are doing</li>
</ul>

<div class="example-box">
<strong> Example:</strong> A book on a table stays still until pushed.
</div>

<h3> NEWTON’S SECOND LAW</h3>
<p>
The acceleration of an object depends on the net force acting on it and its mass.
</p>

<div class="formula">
F = ma
</div>

<ul>
<li>F = force (N)</li>
<li>m = mass (kg)</li>
<li>a = acceleration (m/s²)</li>
</ul>

<div class="keyfact"> KEY IDEA: More force → more acceleration. More mass → less acceleration.</div>

<h3> WORKED EXAMPLES (2nd LAW)</h3>

<div class="example-box">
<strong> Example 1:</strong><br><br>

A mass of 5 kg is pushed with a force of 20 N.<br><br>

<b>Step 1:</b> Use formula F = ma<br>
<b>Step 2:</b> Rearrange → a = F / m<br>
<b>Step 3:</b> Substitute → a = 20 / 5<br>
<b>Step 4:</b> Calculate → a = <b>4 m/s²</b><br><br>

<b> Final Answer:</b> 4 m/s²
</div>

<div class="example-box">
<strong> Example 2:</strong><br><br>

A 10 kg object accelerates at 3 m/s².<br><br>

<b>Step 1:</b> F = ma<br>
<b>Step 2:</b> F = 10 × 3<br>
<b>Step 3:</b> F = <b>30 N</b>
</div>

<h3> NEWTON’S THIRD LAW</h3>
<p>
For every action, there is an equal and opposite reaction.
</p>

<ul>
<li>Forces come in pairs</li>
<li>They act on different objects</li>
<li>They are equal in size and opposite in direction</li>
</ul>

<div class="keyfact"> KEY IDEA: Forces always exist in pairs — you cannot have a single force alone.</div>

<h3> WORKED EXAMPLES (3rd LAW)</h3>

<div class="example-box">
<strong> Example 1: Walking</strong><br><br>

Your foot pushes the ground backward (action).<br>
The ground pushes you forward (reaction).<br><br>

<b> Result:</b> You move forward
</div>

<div class="example-box">
<strong> Example 2: Rocket Launch</strong><br><br>

Rocket pushes gases downward (action).<br>
Gases push rocket upward (reaction).<br><br>

<b> Result:</b> Rocket moves up
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Newton’s 1st Law → explains inertia (why objects resist change)</div>
<div class="keyfact"> Newton’s 2nd Law → links force, mass, and acceleration</div>
<div class="keyfact"> Newton’s 3rd Law → explains interaction between objects</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking action and reaction forces act on the same object</li>
<li>Forgetting net force is needed for acceleration</li>
<li>Confusing mass with weight in F = ma problems</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
1st Law → “Stay as you are” <br>
2nd Law → “Force changes motion” <br>
3rd Law → “Every action has a reaction” 
</div>
`,
  [
    {
      q: "State Newton’s First Law of Motion.",
      hint: "inertia",
      ans: "An object remains at rest or in uniform motion unless acted upon by a net external force.",
      explanation:
        "This law is also called the law of inertia because objects resist changes in their state of motion.",
    },

    {
      q: "What is the formula for Newton’s Second Law?",
      hint: "force, mass, acceleration",
      ans: "F = ma",
      explanation:
        "Force is directly proportional to mass and acceleration of an object.",
    },

    {
      q: "Why do rockets move upward?",
      hint: "action-reaction",
      ans: "Because of action-reaction: gases are pushed downward, and the rocket is pushed upward.",
      explanation:
        "Newton’s Third Law explains rocket propulsion through equal and opposite forces.",
    },

    {
      q: "A force of 10N acts on a mass of 2kg. Find acceleration.",
      hint: "use F = ma",
      formula: "a = F / m",
      steps: [
        "Step 1: Write values → F = 10N, m = 2kg",
        "Step 2: Apply formula → a = F/m",
        "Step 3: Substitute → a = 10/2",
        "Step 4: Calculate → a = 5 m/s²",
      ],
      ans: "5 m/s²",
      explanation:
        "Acceleration increases when force increases or mass decreases.",
    },

    {
      q: "A 4kg object accelerates at 3 m/s². Find force.",
      hint: "F = ma",
      formula: "F = ma",
      steps: [
        "Step 1: m = 4kg, a = 3 m/s²",
        "Step 2: Substitute → F = 4 × 3",
        "Step 3: Calculate → F = 12N",
      ],
      ans: "12N",
      explanation: "Force depends on both mass and acceleration.",
    },

    {
      q: "What does Newton’s Third Law state?",
      hint: "action-reaction",
      ans: "For every action, there is an equal and opposite reaction.",
      explanation: "Forces always occur in pairs acting on different objects.",
    },

    {
      q: "A 6kg object is acted on by a 12N force. Find acceleration.",
      hint: "F = ma",
      formula: "a = F / m",
      steps: [
        "Step 1: F = 12N, m = 6kg",
        "Step 2: a = F/m",
        "Step 3: a = 12/6",
        "Step 4: a = 2 m/s²",
      ],
      ans: "2 m/s²",
      explanation: "Acceleration is directly proportional to force.",
    },

    {
      q: "Why do passengers move forward when a bus stops suddenly?",
      hint: "inertia",
      ans: "Because of inertia, their bodies continue moving forward.",
      explanation:
        "The lower part stops with the bus, but the upper body continues moving.",
    },

    {
      q: "A force of 30N produces an acceleration of 5 m/s². Find mass.",
      hint: "rearrange F = ma",
      formula: "m = F / a",
      steps: [
        "Step 1: F = 30N, a = 5 m/s²",
        "Step 2: m = F/a",
        "Step 3: m = 30/5",
        "Step 4: m = 6kg",
      ],
      ans: "6kg",
      explanation: "Mass is resistance to acceleration.",
    },

    {
      q: "What is inertia?",
      hint: "resistance to change",
      ans: "The tendency of an object to resist changes in its state of motion.",
      explanation: "More mass means more inertia.",
    },
  ],
);
/* =========================================================
   PHYSICS: ENERGY (MASTER LEVEL UPGRADE)
========================================================= */
/* =========================
   1. WORK & MACHINES
========================= */

add(
  "physics",
  "energy",
  "Work",
  `<h2>Work (Advanced + Machines)</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Work is done when a force causes an object to move in the direction of that force.
If there is no movement, then no work is done — even if a large force is applied.
</p>

<div class="keyfact"> KEY IDEA: Work links force and motion — without displacement, work is zero.</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Work</b> is the product of force and displacement in the direction of the force.
It represents energy transfer when a force moves an object.
</p>

<h3> KEY POINTS</h3>
<ul>
<li>Work depends on both force and displacement</li>
<li>If displacement = 0 → work = 0</li>
<li>Work is a scalar quantity</li>
<li>SI unit: Joule (J)</li>
<li>1 Joule = 1 Newton moving an object 1 meter</li>
</ul>

<div class="formula">
Work (W) = Force × Distance<br>
W = F × d
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Basic Work Calculation</strong><br><br>

A force of <b>10 N</b> moves an object <b>5 m</b>.<br><br>

<b>Step 1:</b> Write formula<br>
W = F × d<br><br>

<b>Step 2:</b> Substitute values<br>
W = 10 × 5<br><br>

<b>Step 3:</b> Calculate<br>
W = <b>50 J</b><br><br>

<b> Final Answer:</b> 50 J
</div>

<div class="example-box">
<strong> Example 2: No Work Done</strong><br><br>

A man pushes a wall but it does not move.<br><br>

<b>Step 1:</b> Identify displacement<br>
d = 0 m<br><br>

<b>Step 2:</b> Apply formula<br>
W = F × 0<br><br>

<b> Final Answer:</b> 0 J (no work done)
</div>

<div class="example-box">
<strong> Example 3: Higher Force</strong><br><br>

A force of <b>20 N</b> moves an object <b>3 m</b>.<br><br>

<b>Step 1:</b> Formula<br>
W = F × d<br><br>

<b>Step 2:</b> Substitute<br>
W = 20 × 3<br><br>

<b>Step 3:</b> Calculate<br>
W = <b>60 J</b>
</div>

<h3> MACHINES AND WORK</h3>

<h3> CONCEPT</h3>
<p>
Machines make work easier by reducing the force needed,
but they increase the distance over which the force is applied.
</p>

<div class="keyfact"> KEY IDEA: Machines do NOT reduce work — they only change how it is done.</div>

<div class="formula">
Work Input = Work Output + Energy Lost
</div>

<h3> EFFICIENCY</h3>

<div class="formula">
Efficiency = (Useful Output Work / Input Work) × 100%
</div>

<div class="example-box">
<strong> Example: Efficiency</strong><br><br>

Input work = 200 J<br>
Output work = 150 J<br><br>

Efficiency = (150 ÷ 200) × 100<br>
Efficiency = <b>75%</b>
</div>

<div class="keyfact"> No machine is 100% efficient due to friction and heat loss.</div>

<h3> MACHINES IN REAL LIFE</h3>

<div class="example-box">
<strong> Inclined Plane</strong><br><br>
Lifts objects using a slope.<br>
Reduces force but increases distance.<br><br>

Example: Lifting 10 kg to 2 m<br>
Work = mgh = 10 × 10 × 2 = <b>200 J</b>
</div>

<div class="example-box">
<strong> Pulley</strong><br><br>
Changes direction of force and reduces effort.<br><br>

Example:<br>
Lift 100 N load by 2 m<br>
Work = 100 × 2 = <b>200 J</b>
</div>

<div class="example-box">
<strong> Lever</strong><br><br>
Longer effort arm reduces force needed.<br>
Distance increases to balance energy.
</div>

<div class="example-box">
<strong> Wheel & Axle</strong><br><br>
Large wheel multiplies force at axle for easier movement.
</div>

<div class="example-box">
<strong> Wedge & Screw</strong><br><br>
Convert force into cutting or tightening action.
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Work is only done when force causes movement.</div>
<div class="keyfact"> Machines change force and distance, not total work.</div>
<div class="keyfact"> Energy is always conserved (never created or destroyed).</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking effort always equals work</li>
<li>Forgetting displacement is required</li>
<li>Thinking machines reduce total work (they don’t)</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Work = “Force causes movement” <br>
No movement = No work 
</div>
`,
  [
    {
      q: "A force of 20N moves an object 3m. Find work done.",
      hint: "Use W = F × d",
      formula: "W = Fd",
      steps: [
        "Step 1: Identify values → F = 20 N, d = 3 m",
        "Step 2: Write formula → W = F × d",
        "Step 3: Substitute values → W = 20 × 3",
        "Step 4: Calculate → W = 60 J",
      ],
      ans: "60 J",
      final_check: "Work must be in joules (J)",
      common_mistakes: [
        "Dividing instead of multiplying",
        "Forgetting units (N or m)",
      ],
      explanation:
        "Work is done when a force causes displacement in its direction.",
    },

    {
      q: "Why is no work done when pushing a wall?",
      hint: "no movement",
      ans: "Because there is no displacement, so work done is zero.",
      explanation:
        "Work requires both force and movement in the direction of the force. A wall does not move, so displacement is zero.",
    },

    {
      q: "Do machines reduce total work done? Explain.",
      hint: "energy conservation",
      ans: "No, machines only change force and distance; total work remains the same (ignoring losses).",
      explanation:
        "Machines make work easier by changing force and distance, but they do not reduce total energy required due to conservation of energy.",
    },

    {
      q: "A force of 10N moves an object 6m. Find work done.",
      hint: "W = F × d",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 10 N, d = 6 m",
        "Step 2: W = 10 × 6",
        "Step 3: W = 60 J",
      ],
      ans: "60 J",
      final_check: "Answer in joules",
      common_mistakes: ["Using wrong formula", "Ignoring distance unit"],
      explanation: "Work increases when force or distance increases.",
    },

    {
      q: "A force of 15N moves an object 4m. Find work done.",
      hint: "W = Fd",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 15 N, d = 4 m",
        "Step 2: W = 15 × 4",
        "Step 3: W = 60 J",
      ],
      ans: "60 J",
      final_check: "Correct unit is joules",
      common_mistakes: ["Adding instead of multiplying", "Forgetting formula"],
      explanation: "Work depends directly on force and displacement.",
    },

    {
      q: "A force of 25N moves an object 2m. Find work done.",
      hint: "W = F × d",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 25 N, d = 2 m",
        "Step 2: W = 25 × 2",
        "Step 3: W = 50 J",
      ],
      ans: "50 J",
      final_check: "Check multiplication",
      common_mistakes: ["Wrong operation", "Unit confusion"],
      explanation: "Work increases with force applied.",
    },

    {
      q: "A force of 30N moves an object 5m. Find work done.",
      hint: "W = Fd",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 30 N, d = 5 m",
        "Step 2: W = 30 × 5",
        "Step 3: W = 150 J",
      ],
      ans: "150 J",
      final_check: "Unit must be joules",
      common_mistakes: ["Incorrect multiplication", "Ignoring formula"],
      explanation: "More force or distance means more work done.",
    },

    {
      q: "A force of 40N moves an object 1.5m. Find work done.",
      hint: "W = Fd",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 40 N, d = 1.5 m",
        "Step 2: W = 40 × 1.5",
        "Step 3: W = 60 J",
      ],
      ans: "60 J",
      final_check: "Check decimal multiplication",
      common_mistakes: ["Ignoring decimal values", "Wrong calculation"],
      explanation: "Work can involve decimal distances.",
    },

    {
      q: "A force of 12N moves an object 8m. Find work done.",
      hint: "W = Fd",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 12 N, d = 8 m",
        "Step 2: W = 12 × 8",
        "Step 3: W = 96 J",
      ],
      ans: "96 J",
      final_check: "Correct unit joules",
      common_mistakes: ["Wrong multiplication", "Skipping units"],
      explanation: "Work depends on both force and displacement.",
    },

    {
      q: "A force of 50N moves an object 0.5m. Find work done.",
      hint: "W = Fd",
      formula: "W = Fd",
      steps: [
        "Step 1: F = 50 N, d = 0.5 m",
        "Step 2: W = 50 × 0.5",
        "Step 3: W = 25 J",
      ],
      ans: "25 J",
      final_check: "Check decimal multiplication",
      common_mistakes: ["Ignoring decimal point", "Wrong formula use"],
      explanation: "Even small distances produce work when force is large.",
    },
  ],
);

/* =========================
   2. POWER
========================= */

add(
  "physics",
  "energy",
  "Power",
  `<h2>Power (Advanced)</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Power describes how quickly work is done or how fast energy is transferred.
Two systems can do the same amount of work, but the one that finishes faster has higher power.
</p>

<div class="keyfact"> KEY IDEA: Power measures the RATE of doing work or transferring energy.</div>

<h3> CLEAR DEFINITION</h3>
<p>
<b>Power</b> is the rate of doing work or the rate of energy transfer.
</p>

<h3> KEY POINTS</h3>
<ul>
<li>Power = work ÷ time</li>
<li>Unit: Watt (W)</li>
<li>1 Watt = 1 Joule per second</li>
<li>Higher power → faster energy transfer</li>
<li>Power is a scalar quantity</li>
</ul>

<div class="formula">
P = W / t
</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Basic Power</strong><br><br>

A machine does <b>200 J</b> of work in <b>10 s</b>.<br><br>

<b>Step 1:</b> Formula<br>
P = W ÷ t<br><br>

<b>Step 2:</b> Substitute<br>
P = 200 ÷ 10<br><br>

<b>Step 3:</b> Calculate<br>
P = <b>20 W</b>
</div>

<div class="example-box">
<strong> Example 2: Faster Energy Transfer</strong><br><br>

A machine does <b>500 J</b> in <b>5 s</b>.<br><br>

<b>Step 1:</b> Formula<br>
P = W ÷ t<br><br>

<b>Step 2:</b> Substitute<br>
P = 500 ÷ 5<br><br>

<b>Step 3:</b> Calculate<br>
P = <b>100 W</b>
</div>

<div class="example-box">
<strong> Example 3: Key Insight Comparison</strong><br><br>

Machine A: 200 J in 10 s → 20 W<br>
Machine B: 200 J in 5 s → 40 W<br><br>

<b> Conclusion:</b> Same work, but Machine B is more powerful because it is faster.
</div>

<h3> OTHER POWER FORMULAS</h3>

<div class="formula">
Electrical Power: P = IV
</div>

<ul>
<li>I = current (A)</li>
<li>V = voltage (V)</li>
</ul>

<div class="formula">
Mechanical Power: P = Fv
</div>

<ul>
<li>F = force (N)</li>
<li>v = velocity (m/s)</li>
</ul>

<h3> ELECTRICAL POWER INSIGHT</h3>
<p>
Electrical power shows how fast electrical energy is used or transferred.
</p>

<div class="example-box">
<strong> Example:</strong><br><br>

A device uses 2 A current and 12 V.<br><br>

P = IV = 2 × 12 = <b>24 W</b>
</div>

<h3> POWER TRANSMISSION (VERY IMPORTANT)</h3>

<div class="formula">
Power loss = I²R
</div>

<h3> KEY IDEA</h3>
<p>
Electricity is transmitted over long distances using HIGH VOLTAGE and LOW CURRENT.
</p>

<ul>
<li>High voltage → low current</li>
<li>Low current → less heat loss</li>
<li>Less energy wasted in wires</li>
</ul>

<div class="keyfact"> KEY INSIGHT: Reducing current is the most effective way to reduce energy loss.</div>

<h3> TRANSFORMERS</h3>

<div class="formula">
Vp / Vs = Np / Ns
</div>

<div class="formula">
Power conservation: VpIp = VsIs
</div>

<div class="example-box">
<strong> Example:</strong><br><br>

Np = 100, Ns = 500<br><br>

<b>Step 1:</b> Ns > Np → voltage increases (step-up transformer)<br>
<b>Step 2:</b> Used in power transmission<br><br>

<b> Result:</b> Voltage increases, current decreases
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Power measures how fast energy is used.</div>
<div class="keyfact"> Same work done faster = more power.</div>
<div class="keyfact"> High voltage reduces energy loss in cables.</div>
<div class="keyfact"> Transformers help control voltage for safe transmission.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing power with energy</li>
<li>Thinking power depends only on force or only on work</li>
<li>Forgetting that time is crucial in power calculations</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Power = “How fast energy is used” ⏱<br>
Fast work = high power 
</div>
`,
  [
    {
      q: "A machine uses 500J in 5s. Find power.",
      hint: "Use P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: Identify values → W = 500 J, t = 5 s",
        "Step 2: Write formula → P = W / t",
        "Step 3: Substitute → P = 500 / 5",
        "Step 4: Calculate → P = 100 W",
      ],
      ans: "100 W",
      final_check: "Unit must be watts (W)",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Ignoring time unit",
      ],
      explanation: "Power is the rate of energy transfer per unit time.",
    },

    {
      q: "What is the unit of power?",
      hint: "SI unit",
      ans: "Watt (W)",
      explanation:
        "Power is measured in watts, where 1 watt = 1 joule per second.",
    },

    {
      q: "Why do power companies use high voltage transmission?",
      hint: "reduce energy loss",
      ans: "To reduce current and minimize energy loss (I²R losses).",
      explanation:
        "Higher voltage reduces current, and since power loss in cables depends on I²R, lower current reduces energy wasted as heat.",
    },

    {
      q: "A device uses 1200 J of energy in 6 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 1200 J, t = 6 s",
        "Step 2: P = 1200 / 6",
        "Step 3: P = 200 W",
      ],
      ans: "200 W",
      final_check: "Answer in watts",
      common_mistakes: ["Using wrong formula", "Forgetting division"],
      explanation: "Power measures how quickly energy is used.",
    },

    {
      q: "A motor does 3000 J of work in 10 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 3000 J, t = 10 s",
        "Step 2: P = 3000 / 10",
        "Step 3: P = 300 W",
      ],
      ans: "300 W",
      final_check: "Check units",
      common_mistakes: ["Mixing up work and power", "Incorrect division"],
      explanation: "Power shows energy transfer rate.",
    },

    {
      q: "A bulb uses 600 J in 3 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 600 J, t = 3 s",
        "Step 2: P = 600 / 3",
        "Step 3: P = 200 W",
      ],
      ans: "200 W",
      final_check: "Unit is watts",
      common_mistakes: ["Incorrect division", "Forgetting time unit"],
      explanation: "Electrical devices convert energy per second.",
    },

    {
      q: "A heater uses 4500 J in 15 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 4500 J, t = 15 s",
        "Step 2: P = 4500 / 15",
        "Step 3: P = 300 W",
      ],
      ans: "300 W",
      final_check: "Correct unit is watts",
      common_mistakes: ["Wrong formula application", "Arithmetic errors"],
      explanation: "Power depends on how fast energy is used.",
    },

    {
      q: "A machine uses 9000 J in 30 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 9000 J, t = 30 s",
        "Step 2: P = 9000 / 30",
        "Step 3: P = 300 W",
      ],
      ans: "300 W",
      final_check: "Answer in watts",
      common_mistakes: ["Incorrect division", "Confusing units"],
      explanation: "Power is energy per unit time.",
    },

    {
      q: "A motor transfers 1500 J in 5 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 1500 J, t = 5 s",
        "Step 2: P = 1500 / 5",
        "Step 3: P = 300 W",
      ],
      ans: "300 W",
      final_check: "Check unit",
      common_mistakes: ["Wrong substitution", "Arithmetic mistakes"],
      explanation:
        "Power is directly proportional to energy and inversely to time.",
    },

    {
      q: "A device uses 2400 J in 8 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 2400 J, t = 8 s",
        "Step 2: P = 2400 / 8",
        "Step 3: P = 300 W",
      ],
      ans: "300 W",
      final_check: "Unit is watts",
      common_mistakes: ["Incorrect division", "Ignoring time"],
      explanation: "Power tells how fast energy is used.",
    },

    {
      type: "calc",
      q: "A generator produces 10000 J in 20 s. Find power.",
      hint: "P = W/t",
      formula: "P = W / t",
      steps: [
        "Step 1: W = 10000 J, t = 20 s",
        "Step 2: P = 10000 / 20",
        "Step 3: P = 500 W",
      ],
      ans: "500 W",
      final_check: "Correct unit watts",
      common_mistakes: ["Wrong formula", "Calculation errors"],
      explanation:
        "Generators convert mechanical energy into electrical power.",
    },
  ],
);

/* =========================
   3. ENERGY CONVERSION
========================= */

add(
  "physics",
  "energy",
  "Energy Conversion",
  `<h2>Energy Conversion</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Energy cannot be created or destroyed. It can only be transformed from one form into another.
This is known as the <b>principle of conservation of energy</b>.
</p>

<div class="keyfact"> KEY IDEA: Energy changes form, but total energy in a system always stays constant.</div>

<h3> KEY POINTS</h3>
<ul>
<li>Energy is conserved in all processes</li>
<li>It only changes from one form to another</li>
<li>Some energy is often “wasted” as heat or sound</li>
<li>No system is 100% efficient</li>
</ul>

<h3> COMMON ENERGY TRANSFORMATIONS</h3>

<ul>
<li><b>Falling object:</b> Gravitational Potential Energy → Kinetic Energy</li>
<li><b>Car engine:</b> Chemical Energy → Kinetic Energy + Heat Energy</li>
<li><b>Electric bulb:</b> Electrical Energy → Light Energy + Heat Energy</li>
<li><b>Battery:</b> Chemical Energy → Electrical Energy</li>
<li><b>Wind turbine:</b> Kinetic Energy (wind) → Electrical Energy</li>
</ul>

<h3> STEP-BY-STEP EXPLANATIONS</h3>

<div class="example-box">
<strong> Example 1: Falling Object</strong><br><br>

A stone is dropped from a height.<br><br>

<b>Step 1:</b> At the top, it has gravitational potential energy (stored energy)<br>
<b>Step 2:</b> As it falls, height decreases → GPE reduces<br>
<b>Step 3:</b> Speed increases → kinetic energy increases<br><br>

<b> Energy conversion:</b> GPE → KE
</div>

<div class="example-box">
<strong> Example 2: Car Engine</strong><br><br>

A car burns fuel to move.<br><br>

<b>Step 1:</b> Fuel contains chemical energy<br>
<b>Step 2:</b> Engine burns fuel → releases energy<br>
<b>Step 3:</b> Energy turns into motion + heat<br><br>

<b> Energy conversion:</b> Chemical → Kinetic + Heat
</div>

<div class="example-box">
<strong> Example 3: Electric Bulb</strong><br><br>

An electric bulb is switched on.<br><br>

<b>Step 1:</b> Electrical energy flows into bulb<br>
<b>Step 2:</b> Filament heats up<br>
<b>Step 3:</b> Light is produced<br><br>

<b> Energy conversion:</b> Electrical → Light + Heat
</div>

<div class="example-box">
<strong> Example 4: Battery Device</strong><br><br>

A phone battery powers the device.<br><br>

<b>Step 1:</b> Battery stores chemical energy<br>
<b>Step 2:</b> Chemical energy converts to electrical energy<br>
<b>Step 3:</b> Electrical energy powers the phone<br><br>

<b> Energy conversion:</b> Chemical → Electrical
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Energy is never lost, only transformed.</div>
<div class="keyfact"> Some energy is always transferred as heat (wasted energy).</div>
<div class="keyfact"> Falling objects continuously convert energy between forms.</div>
<div class="keyfact"> Real systems are never 100% efficient.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking energy is destroyed (it is only transformed)</li>
<li>Forgetting heat loss in real systems</li>
<li>Confusing energy type changes with energy loss</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Energy = “Shape-shifter” <br>
It never disappears — only changes form
</div>
`,
  [
    {
      q: "What happens to energy when a car moves?",
      hint: "fuel transformation",
      ans: "Chemical energy is converted into kinetic energy and heat.",
      explanation:
        "The fuel in the car contains chemical energy which is released during combustion and transformed into motion (kinetic energy) and heat energy due to engine friction.",
    },

    {
      q: "Is energy ever destroyed?",
      hint: "law of conservation",
      ans: "No, energy is always conserved and only changes form.",
      explanation:
        "According to the law of conservation of energy, energy cannot be created or destroyed, only transformed from one form to another.",
    },

    {
      q: "What energy change happens in a falling object?",
      hint: "height to motion",
      ans: "Gravitational potential energy → kinetic energy",
      explanation:
        "As an object falls, its stored potential energy due to height is converted into kinetic energy as it gains speed.",
    },

    {
      q: "A 2 kg object is lifted to a height of 5 m. Find its potential energy (g = 10 m/s²).",
      hint: "Use PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: Identify values → m = 2 kg, g = 10 m/s², h = 5 m",
        "Step 2: Substitute into formula → PE = 2 × 10 × 5",
        "Step 3: Multiply → PE = 100 J",
      ],
      ans: "100 J",
      final_check: "Energy is in joules (J)",
      common_mistakes: [
        "Forgetting to include gravity (g)",
        "Using wrong height value",
      ],
      explanation:
        "Potential energy depends on mass, height, and gravitational field strength.",
    },

    {
      q: "A 3 kg object moves at 4 m/s. Find kinetic energy.",
      hint: "Use KE = 1/2 mv²",
      formula: "KE = 1/2 mv²",
      steps: [
        "Step 1: m = 3 kg, v = 4 m/s",
        "Step 2: Square velocity → 4² = 16",
        "Step 3: Substitute → KE = 1/2 × 3 × 16",
        "Step 4: Multiply → KE = 24 J",
      ],
      ans: "24 J",
      final_check: "Unit must be joules (J)",
      common_mistakes: [
        "Forgetting to square velocity",
        "Incorrect multiplication",
      ],
      explanation: "Kinetic energy increases with velocity squared.",
    },
    {
      q: "A car engine does 5000 J of work in 10 seconds. Find power.",
      hint: "Use P = W/t",
      formula: "P = W/t",
      steps: [
        "Step 1: W = 5000 J, t = 10 s",
        "Step 2: Substitute → P = 5000 / 10",
        "Step 3: Calculate → P = 500 W",
      ],
      ans: "500 W",
      final_check: "Power is in watts (W)",
      common_mistakes: ["Reversing formula", "Ignoring time unit"],
      explanation: "Power is the rate of energy transfer per second.",
    },

    {
      q: "A 4 kg object is lifted 3 m high. Find potential energy.",
      hint: "PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: m = 4 kg, g = 10 m/s², h = 3 m",
        "Step 2: Substitute → PE = 4 × 10 × 3",
        "Step 3: Multiply → PE = 120 J",
      ],
      ans: "120 J",
      final_check: "Energy in joules",
      common_mistakes: ["Forgetting gravity", "Wrong multiplication order"],
      explanation: "Higher mass or height increases potential energy.",
    },

    {
      q: "A 5 kg object moves at 2 m/s. Find kinetic energy.",
      hint: "KE = 1/2 mv²",
      formula: "KE = 1/2 mv²",
      steps: [
        "Step 1: m = 5 kg, v = 2 m/s",
        "Step 2: v² = 4",
        "Step 3: KE = 1/2 × 5 × 4",
        "Step 4: KE = 10 J",
      ],
      ans: "10 J",
      final_check: "Correct unit is joules",
      common_mistakes: ["Not squaring velocity", "Wrong multiplication"],
      explanation:
        "Even small velocity changes affect kinetic energy significantly.",
    },

    {
      q: "A machine converts 2000 J of energy in 4 s. Find power.",
      hint: "P = W/t",
      formula: "P = W/t",
      steps: [
        "Step 1: W = 2000 J, t = 4 s",
        "Step 2: P = 2000 / 4",
        "Step 3: P = 500 W",
      ],
      ans: "500 W",
      final_check: "Power in watts",
      common_mistakes: ["Confusing work with power", "Incorrect division"],
      explanation: "Power measures how fast energy is used or transferred.",
    },

    {
      q: "A 1 kg object falls from 10 m. Find potential energy before falling.",
      hint: "PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: m = 1 kg, g = 10 m/s², h = 10 m",
        "Step 2: PE = 1 × 10 × 10",
        "Step 3: PE = 100 J",
      ],
      ans: "100 J",
      final_check: "Energy in joules",
      common_mistakes: ["Forgetting height", "Using wrong formula"],
      explanation: "All potential energy becomes kinetic energy during fall.",
    },

    {
      q: "A system has 600 J of energy input and 150 J is lost as heat. Find useful energy output.",
      hint: "useful = input - loss",
      formula: "Useful energy = Input - Loss",
      steps: [
        "Step 1: Input = 600 J",
        "Step 2: Loss = 150 J",
        "Step 3: Useful = 600 - 150",
        "Step 4: Useful = 450 J",
      ],
      ans: "450 J",
      final_check: "Energy conservation applied",
      common_mistakes: [
        "Adding instead of subtracting",
        "Ignoring wasted energy",
      ],
      explanation: "Some energy is always lost, usually as heat or sound.",
    },
  ],
);

/* =========================
   4. CONSERVATION OF ENERGY
========================= */

add(
  "physics",
  "energy",
  "Conservation of Energy",
  `<h2>Conservation of Energy</h2>
<h3> FOUNDATION UNDERSTANDING</h3>
<p>
The law of conservation of energy states that energy cannot be created or destroyed.
It can only change from one form to another, but the total energy in a closed system remains constant.
</p>

<div class="keyfact"> KEY IDEA: Total energy before = Total energy after (always conserved).</div>

<h3> IMPORTANT PRINCIPLE (MECHANICAL ENERGY)</h3>
<p>
In falling objects and many motion systems:
</p>

<div class="formula">
Potential Energy = Kinetic Energy<br>
mgh = ½mv²
</div>

<ul>
<li>m = mass (kg)</li>
<li>g = gravitational field strength (≈ 10 m/s²)</li>
<li>h = height (m)</li>
<li>v = velocity (m/s)</li>
</ul>

<div class="keyfact"> KEY INSIGHT: As height decreases, speed increases — energy is being transferred.</div>

<h3> STEP-BY-STEP WORKED EXAMPLES</h3>

<div class="example-box">
<strong> Example 1: Energy at Height</strong><br><br>

A <b>2 kg</b> object is dropped from a height of <b>10 m</b>.<br><br>

<b>Step 1: Calculate potential energy</b><br>
PE = mgh = 2 × 10 × 10<br><br>

<b>Step 2: Solve</b><br>
PE = <b>200 J</b><br><br>

<b> Interpretation:</b> This is the total energy the object has before falling.
</div>

<div class="example-box">
<strong> Example 2: Energy at Ground</strong><br><br>

At the bottom of the fall:<br><br>

<b>Step 1:</b> Height becomes zero → PE = 0<br>
<b>Step 2:</b> All energy becomes kinetic energy<br>
<b>Step 3:</b> KE = 200 J<br><br>

<b> Final Conclusion:</b> Energy is transferred, not lost
</div>

<div class="example-box">
<strong> Example 3: Partial Height Fall</strong><br><br>

A 2 kg object falls from 5 m.<br><br>

<b>Step 1:</b> Total energy = mgh = 2 × 10 × 5 = <b>100 J</b><br><br>

<b>Step 2:</b> During fall:<br>
PE decreases while KE increases<br><br>

<b> Final Insight:</b> Total energy remains constant at 100 J
</div>

<div class="example-box">
<strong> Example 4: Real-World Losses</strong><br><br>

When an object hits the ground:<br><br>

<b>Step 1:</b> KE does not disappear<br>
<b>Step 2:</b> It converts into heat, sound, and deformation energy<br><br>

<b> Final Insight:</b> Energy is conserved, but becomes less useful
</div>

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Energy is always conserved in a closed system.</div>
<div class="keyfact"> Potential energy transforms into kinetic energy during سقوط (fall).</div>
<div class="keyfact"> Real systems lose usable energy as heat and sound.</div>
<div class="keyfact"> Total energy never decreases — it only changes form.</div>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking energy is lost when motion stops</li>
<li>Forgetting energy converts into heat/sound</li>
<li>Confusing energy loss with energy transformation</li>
</ul>

<h3> MEMORY TRICK</h3>
<div class="keyfact">
Energy = “Never dies, only transforms” <br>
Total in = Total out 
</div>
`,
  [
    {
      type: "calc",
      q: "A 2kg object falls from 5m. Find total energy.",
      ans: "100J",
      sol: "mgh = 2 × 10 × 5 = 100J",
    },
    {
      type: "written",
      q: "What happens to energy when an object hits the ground?",
      ans: "It converts into heat, sound, and deformation energy.",
    },
    {
      type: "written",
      q: "State the law of conservation of energy.",
      ans: "Energy cannot be created or destroyed, only transformed from one form to another.",
    },
  ],
);
add(
  "physics",
  "energy",
  "Kinetic & Potential Energy",
  `<h2>Kinetic & Potential Energy</h2>

<h3> FOUNDATION UNDERSTANDING</h3>
<p>
Energy exists in different forms. Two of the most important forms in mechanics are:
<b>kinetic energy</b> (energy of motion) and <b>potential energy</b> (stored energy due to position).
</p>

<div class="keyfact"> KEY IDEA: Energy is either stored (potential) or moving (kinetic).</div>

---

<h3> KINETIC ENERGY (KE)</h3>

<h3> DEFINITION</h3>
<p>
Kinetic energy is the energy an object has due to its motion.
Any moving object has kinetic energy.
</p>

<div class="formula">
KE = ½mv²
</div>

<ul>
<li>m = mass (kg)</li>
<li>v = velocity (m/s)</li>
<li>KE = kinetic energy (Joules)</li>
</ul>

<div class="keyfact"> KEY INSIGHT: If velocity doubles, kinetic energy becomes 4 times bigger (because of v²).</div>

<h3> WORKED EXAMPLE (KE)</h3>

<div class="example-box">
<strong> Example:</strong> A 2 kg object moves at 3 m/s.<br><br>

<b>Step 1:</b> Write formula<br>
KE = ½mv²<br><br>

<b>Step 2:</b> Substitute values<br>
KE = ½ × 2 × 3²<br><br>

<b>Step 3:</b> Calculate<br>
KE = 1 × 9 = <b>9 J</b><br><br>

<b> Final Answer:</b> 9 Joules
</div>

---

<h3> POTENTIAL ENERGY (PE)</h3>

<h3> DEFINITION</h3>
<p>
Potential energy is stored energy due to position or height in a gravitational field.
</p>

<div class="formula">
PE = mgh
</div>

<ul>
<li>m = mass (kg)</li>
<li>g = gravitational field strength (≈ 10 m/s²)</li>
<li>h = height (m)</li>
<li>PE = potential energy (Joules)</li>
</ul>

<div class="keyfact"> KEY INSIGHT: The higher the object, the more potential energy it stores.</div>

<h3> WORKED EXAMPLE (PE)</h3>

<div class="example-box">
<strong> Example:</strong> A 3 kg object is raised to 4 m height.<br><br>

<b>Step 1:</b> Write formula<br>
PE = mgh<br><br>

<b>Step 2:</b> Substitute values<br>
PE = 3 × 10 × 4<br><br>

<b>Step 3:</b> Calculate<br>
PE = <b>120 J</b><br><br>

<b> Final Answer:</b> 120 Joules
</div>

---

<h3> ENERGY TRANSFORMATION (VERY IMPORTANT)</h3>

<div class="example-box">
<strong> Falling Object</strong><br><br>

At the top:<br>
PE is high, KE is low<br><br>

During fall:<br>
PE decreases → KE increases<br><br>

At bottom:<br>
PE = 0, KE = maximum<br><br>

<b> Key Idea:</b> PE transforms into KE
</div>

---

<h3> IMPORTANT INSIGHTS</h3>
<div class="keyfact"> Kinetic energy depends on speed (v² effect makes it very powerful).</div>
<div class="keyfact"> Potential energy depends on height and mass.</div>
<div class="keyfact"> Energy constantly switches between KE and PE in motion.</div>
<div class="keyfact"> Total mechanical energy = KE + PE (in ideal systems).</div>

---

<h3> COMMON MISTAKES</h3>
<ul>
<li>Thinking only moving objects have energy (false — stored energy also counts)</li>
<li>Forgetting velocity is squared in KE formula</li>
<li>Confusing height direction in PE problems</li>
</ul>

---

<h3> MEMORY TRICK</h3>
<div class="keyfact">
KE = “Energy of movement” ‍<br>
PE = “Energy of position” 
</div>
`,
  [
    {
      q: "A 2 kg object moves at 3 m/s. Find kinetic energy.",
      hint: "Use KE = ½mv²",
      formula: "KE = 1/2 mv²",
      steps: [
        "Step 1: Identify values → m = 2 kg, v = 3 m/s",
        "Step 2: Substitute into formula → KE = 1/2 × 2 × 3²",
        "Step 3: Square velocity → 3² = 9",
        "Step 4: Multiply → KE = 1 × 9",
        "Step 5: Final answer → KE = 9 J",
      ],
      ans: "9 J",
      final_check: "Energy should be in joules (J)",
      common_mistakes: [
        "Forgetting to square velocity",
        "Using mv instead of mv²",
      ],
      explanation: "Kinetic energy depends on mass and the square of velocity.",
    },

    {
      q: "A 3 kg object is raised to a height of 4 m. Find potential energy.",
      hint: "Use PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: Identify values → m = 3 kg, g = 10 m/s², h = 4 m",
        "Step 2: Substitute → PE = 3 × 10 × 4",
        "Step 3: Multiply → PE = 120 J",
      ],
      ans: "120 J",
      final_check: "Unit must be joules (J)",
      common_mistakes: ["Forgetting gravity (g)", "Using wrong height value"],
      explanation: "Potential energy depends on mass, height, and gravity.",
    },

    {
      q: "What happens to potential energy when an object falls?",
      hint: "energy conversion",
      ans: "It is converted into kinetic energy.",
      explanation:
        "As height decreases, potential energy is transformed into motion energy.",
    },

    {
      q: "A 5 kg object moves at 4 m/s. Find kinetic energy.",
      hint: "KE = ½mv²",
      formula: "KE = 1/2 mv²",
      steps: [
        "Step 1: m = 5 kg, v = 4 m/s",
        "Step 2: Substitute → KE = 1/2 × 5 × 4²",
        "Step 3: 4² = 16",
        "Step 4: KE = 2.5 × 16",
        "Step 5: KE = 40 J",
      ],
      ans: "40 J",
      final_check: "Correct unit is joules",
      common_mistakes: [
        "Forgetting square of velocity",
        "Incorrect multiplication",
      ],
      explanation: "Kinetic energy increases with mass and velocity squared.",
    },

    {
      q: "A 2 kg object is lifted to 6 m. Find potential energy.",
      hint: "PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: m = 2 kg, g = 10, h = 6 m",
        "Step 2: Substitute → PE = 2 × 10 × 6",
        "Step 3: Calculate → PE = 120 J",
      ],
      ans: "120 J",
      final_check: "Energy in joules",
      common_mistakes: ["Forgetting gravity", "Wrong multiplication"],
      explanation: "Higher height increases potential energy.",
    },

    {
      q: "A 4 kg object moves at 2 m/s. Find kinetic energy.",
      hint: "KE = ½mv²",
      formula: "KE = 1/2 mv²",
      steps: [
        "Step 1: m = 4 kg, v = 2 m/s",
        "Step 2: Substitute → KE = 1/2 × 4 × 2²",
        "Step 3: 2² = 4",
        "Step 4: KE = 2 × 4",
        "Step 5: KE = 8 J",
      ],
      ans: "8 J",
      final_check: "Check squared velocity",
      common_mistakes: ["Not squaring velocity", "Wrong formula"],
      explanation: "Kinetic energy depends on velocity squared.",
    },
    {
      q: "A 1 kg object is lifted 10 m high. Find potential energy.",
      hint: "PE = mgh",
      formula: "PE = mgh",
      steps: [
        "Step 1: Identify values → m = 1 kg, g = 10 m/s², h = 10 m",
        "Step 2: Substitute into formula → PE = 1 × 10 × 10",
        "Step 3: Multiply → PE = 100 J",
      ],
      ans: "100 J",
      final_check: "Energy must be in joules (J)",
      common_mistakes: [
        "Forgetting to include gravity (g)",
        "Using wrong height value",
        "Multiplying incorrectly",
      ],
      explanation:
        "Potential energy increases with both height and mass because more work is needed to lift an object higher in a gravitational field.",
    },
  ],
);
/* =========================================================
   PHYSICS: WAVES (MASTER UPGRADE)
========================================================= */

/* =========================
   1. WAVE PROPERTIES
========================= */

add(
  "physics",
  "waves",
  "Wave properties",
  `<h2>Wave Properties (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
A wave is a disturbance that transfers <b>energy</b> from one place to another without transferring matter permanently.
Particles in the medium only oscillate (vibrate) around a fixed position.
</p>

<p>
There are two main types of waves:
</p>
<ul>
<li><b>Transverse waves:</b> particles vibrate perpendicular to direction of travel (e.g. water waves, light)</li>
<li><b>Longitudinal waves:</b> particles vibrate parallel to direction of travel (e.g. sound waves)</li>
</ul>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Wavelength (λ):</b> Distance between two consecutive crests or troughs (meters)</li>

<li><b>Amplitude (A):</b> Maximum displacement of a particle from its rest position. It determines the energy of the wave.</li>

<li><b>Frequency (f):</b> Number of complete waves passing a point per second (measured in Hertz, Hz)</li>

<li><b>Time Period (T):</b> Time taken for one complete wave cycle (seconds)</li>

<li><b>Wave Speed (v):</b> Distance travelled by the wave per second (m/s)</li>
</ul>

---

<h3> KEY FORMULAS</h3>

<div class="formula">
v = fλ<br>
f = 1/T<br>
T = 1/f<br>
λ = v/f<br>
λ = vT
</div>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: What is frequency?</b><br>
Frequency is the number of complete waves passing a point in one second. It is measured in Hertz (Hz).
</div>

<div class="example-box">
<b>Q2: What is amplitude?</b><br>
Amplitude is the maximum displacement of particles from the equilibrium position. Higher amplitude = more energy.
</div>

<div class="example-box">
<b>Q3: What is time period?</b><br>
Time period is the time taken for one complete wave cycle. It is the inverse of frequency.
</div>

<div class="example-box">
<b>Q4: How do we find frequency?</b><br>
We use the formula: f = 1/T or f = v/λ depending on given data.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Wave speed = 20 m/s, frequency = 5 Hz<br>
λ = v/f = 20/5 = 4 m
</div>

<div class="example-box">
<b>Example 2:</b><br>
Speed = 10 m/s, period = 2 s<br>
First find frequency: f = 1/T = 1/2 = 0.5 Hz<br>
Then wavelength: λ = v/f = 10/0.5 = 20 m
</div>

<div class="example-box">
<b>Example 3:</b><br>
Frequency = 8 Hz, wavelength = 3 m<br>
Wave speed = v = fλ = 8 × 3 = 24 m/s
</div>

<div class="example-box">
<b>Example 4:</b><br>
Time period = 0.25 s<br>
Frequency = f = 1/T = 1/0.25 = 4 Hz
</div>

<div class="example-box">
<b>Example 5 (Amplitude concept):</b><br>
Wave A has amplitude 2 cm, Wave B has amplitude 5 cm.<br>
Wave B carries more energy because amplitude is higher.
</div>

---

<h3> CONTINUOUS PROBLEM (EXAM STYLE)</h3>

<div class="example-box">
A wave travels along a string with speed 30 m/s. It has a wavelength of 6 m.<br><br>

(a) Find the frequency<br>
(b) Find the time period<br>
(c) Explain what happens if amplitude increases<br><br>

Solution:<br>
(a) f = v/λ = 30/6 = 5 Hz<br>
(b) T = 1/f = 1/5 = 0.2 s<br>
(c) Increasing amplitude increases energy but does NOT change speed, frequency, or wavelength.
</div>

---

<h3> IMPORTANT SUMMARY</h3>
<div class="keyfact">
 Frequency ↑ → wavelength ↓ (if speed is constant)<br>
 Amplitude affects energy only<br>
 Speed depends on medium, not amplitude<br>
 f and T are inversely related
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. A wave has speed 15 m/s and frequency 3 Hz. Find wavelength.<br>
2. A wave has wavelength 4 m and frequency 6 Hz. Find speed.<br>
3. Time period is 0.5 s. Find frequency.<br>
4. A wave has amplitude 10 cm. What does this tell us about its energy?<br>
5. A wave travels 50 m in 10 seconds with frequency 5 Hz. Find wavelength.
</div>

`,
  [
    {
      q: "A wave travels at 15 m/s and has frequency 3 Hz. Find wavelength.",
      hint: "Use v = fλ",
      formula: "λ = v / f",
      steps: [
        "Step 1: Identify values → v = 15 m/s, f = 3 Hz",
        "Step 2: Use formula → λ = v / f",
        "Step 3: Substitute → λ = 15 / 3",
        "Step 4: Calculate → λ = 5 m",
      ],
      ans: "5 m",
      final_check: "Units should be in meters (m)",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Confusing frequency with wavelength",
      ],
      explanation: "Wavelength is found by dividing wave speed by frequency.",
    },

    {
      q: "A wave has wavelength 4 m and frequency 6 Hz. Find wave speed.",
      hint: "Use v = fλ",
      formula: "v = f × λ",
      steps: [
        "Step 1: Identify values → f = 6 Hz, λ = 4 m",
        "Step 2: Use formula → v = f × λ",
        "Step 3: Substitute → v = 6 × 4",
        "Step 4: Calculate → v = 24 m/s",
      ],
      ans: "24 m/s",
      final_check: "Speed should be in m/s",
      common_mistakes: ["Dividing instead of multiplying", "Ignoring units"],
      explanation: "Wave speed is the product of frequency and wavelength.",
    },

    {
      q: "Time period is 0.5 s. Find frequency.",
      hint: "f = 1/T",
      formula: "f = 1 / T",
      steps: [
        "Step 1: Identify time period → T = 0.5 s",
        "Step 2: Use formula → f = 1 / T",
        "Step 3: Substitute → f = 1 / 0.5",
        "Step 4: Calculate → f = 2 Hz",
      ],
      ans: "2 Hz",
      final_check: "Frequency is inverse of time period",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Confusing frequency with time period",
      ],
      explanation: "Frequency is the number of waves per second.",
    },

    {
      q: "A wave has speed 40 m/s and wavelength 8 m. Find frequency.",
      hint: "f = v/λ",
      formula: "f = v / λ",
      steps: [
        "Step 1: Identify values → v = 40 m/s, λ = 8 m",
        "Step 2: Use formula → f = v / λ",
        "Step 3: Substitute → f = 40 / 8",
        "Step 4: Calculate → f = 5 Hz",
      ],
      ans: "5 Hz",
      final_check: "Frequency in Hz",
      common_mistakes: ["Multiplying instead of dividing", "Reversing formula"],
      explanation: "Frequency equals speed divided by wavelength.",
    },

    {
      q: "A wave has frequency 10 Hz and speed 50 m/s. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v / f",
      steps: [
        "Step 1: Identify values → v = 50 m/s, f = 10 Hz",
        "Step 2: Apply formula → λ = v / f",
        "Step 3: Substitute → λ = 50 / 10",
        "Step 4: Calculate → λ = 5 m",
      ],
      ans: "5 m",
      final_check: "Wavelength in meters",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Mixing up variables",
      ],
      explanation: "Wavelength is speed divided by frequency.",
    },

    {
      q: "A wave takes 2 s to complete 1 cycle. Find frequency.",
      hint: "T = 1/f",
      formula: "f = 1 / T",
      steps: [
        "Step 1: Identify time period → T = 2 s",
        "Step 2: Use formula → f = 1 / T",
        "Step 3: Substitute → f = 1 / 2",
        "Step 4: Calculate → f = 0.5 Hz",
      ],
      ans: "0.5 Hz",
      final_check: "Frequency decreases when time period increases",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Confusing period and frequency",
      ],
      explanation: "Frequency is inversely proportional to time period.",
    },

    {
      q: "A wave has wavelength 2 m and speed 12 m/s. Find frequency.",
      hint: "f = v/λ",
      formula: "f = v / λ",
      steps: [
        "Step 1: Identify values → v = 12 m/s, λ = 2 m",
        "Step 2: Apply formula → f = v / λ",
        "Step 3: Substitute → f = 12 / 2",
        "Step 4: Calculate → f = 6 Hz",
      ],
      ans: "6 Hz",
      final_check: "Units in Hz",
      common_mistakes: ["Using wrong formula", "Dividing incorrectly"],
      explanation: "Frequency is found by dividing speed by wavelength.",
    },

    {
      q: "A wave has frequency 50 Hz and wavelength 0.2 m. Find speed.",
      hint: "v = fλ",
      formula: "v = f × λ",
      steps: [
        "Step 1: Identify values → f = 50 Hz, λ = 0.2 m",
        "Step 2: Apply formula → v = f × λ",
        "Step 3: Substitute → v = 50 × 0.2",
        "Step 4: Calculate → v = 10 m/s",
      ],
      ans: "10 m/s",
      final_check: "Speed in m/s",
      common_mistakes: [
        "Dividing instead of multiplying",
        "Ignoring decimal multiplication",
      ],
      explanation: "Wave speed equals frequency times wavelength.",
    },

    {
      q: "A wave travels 100 m in 5 s. Find its speed.",
      hint: "speed = distance/time",
      formula: "v = d / t",
      steps: [
        "Step 1: Identify values → d = 100 m, t = 5 s",
        "Step 2: Use formula → v = d / t",
        "Step 3: Substitute → v = 100 / 5",
        "Step 4: Calculate → v = 20 m/s",
      ],
      ans: "20 m/s",
      final_check: "Units m/s",
      common_mistakes: ["Reversing formula", "Forgetting units"],
      explanation: "Speed is distance divided by time.",
    },

    {
      q: "A wave has speed 30 m/s and frequency 5 Hz. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v / f",
      steps: [
        "Step 1: Identify values → v = 30 m/s, f = 5 Hz",
        "Step 2: Apply formula → λ = v / f",
        "Step 3: Substitute → λ = 30 / 5",
        "Step 4: Calculate → λ = 6 m",
      ],
      ans: "6 m",
      final_check: "Wavelength in meters",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Confusing variables",
      ],
      explanation: "Wavelength equals speed divided by frequency.",
    },
  ],
);

/* =========================
   2. SOUND WAVES
========================= */

add(
  "physics",
  "waves",
  "Sound waves",
  `<h2>Sound Waves (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
Sound is a form of energy produced by vibrating objects. It travels through a medium (solid, liquid, or gas) as a <b>longitudinal wave</b>.
</p>

<p>
In sound waves, particles of the medium vibrate back and forth in the same direction as the wave travels, forming:
</p>
<ul>
<li><b>Compressions:</b> regions where particles are close together (high pressure)</li>
<li><b>Rarefactions:</b> regions where particles are spread out (low pressure)</li>
</ul>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Sound is a longitudinal wave</b></li>
<li>It requires a medium (solid, liquid, or gas) to travel</li>
<li>It cannot travel in a vacuum because there are no particles to vibrate</li>
<li>Speed of sound depends on the medium:
    <ul>
        <li>Fastest in solids</li>
        <li>Slower in liquids</li>
        <li>Slowest in gases</li>
    </ul>
</li>
<li>Sound energy is transferred through vibrations, not matter movement</li>
</ul>

---

<h3> KEY CONCEPTS</h3>

<div class="example-box">
<b>Compression:</b> High-pressure region where particles are crowded together
</div>

<div class="example-box">
<b>Rarefaction:</b> Low-pressure region where particles are spread apart
</div>

<div class="example-box">
<b>Frequency:</b> Determines pitch (high frequency = high pitch sound)
</div>

<div class="example-box">
<b>Amplitude:</b> Determines loudness (higher amplitude = louder sound)
</div>

---

<h3> IMPORTANT FORMULA</h3>

<div class="formula">
v = fλ
</div>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: Why is sound a longitudinal wave?</b><br>
Because particles vibrate parallel to the direction of wave travel.
</div>

<div class="example-box">
<b>Q2: Why can't sound travel in space?</b><br>
Because space is a vacuum and has no particles to transmit vibrations.
</div>

<div class="example-box">
<b>Q3: What affects loudness?</b><br>
Amplitude of the wave.
</div>

<div class="example-box">
<b>Q4: What affects pitch?</b><br>
Frequency of the wave.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
A speaker vibrates → it pushes air particles → compressions and rarefactions form → sound travels through air.
</div>

<div class="example-box">
<b>Example 2:</b><br>
Thunder is heard after lightning because light travels faster than sound.
</div>

<div class="example-box">
<b>Example 3:</b><br>
An echo occurs when sound waves reflect off a hard surface like a wall or cliff.
</div>

<div class="example-box">
<b>Example 4 (Calculation):</b><br>
Frequency = 50 Hz, wavelength = 6 m<br>
Speed = v = fλ = 50 × 6 = 300 m/s
</div>

<div class="example-box">
<b>Example 5 (Time delay concept):</b><br>
If sound takes 2 seconds to reach a wall and 2 seconds to return, echo delay = 4 seconds total.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A sound wave travels through air with a frequency of 120 Hz and wavelength of 2.5 m.<br><br>

(a) Find the speed of sound<br>
(b) Explain what happens if the sound enters a solid<br>
(c) State what determines the loudness of the sound<br><br>

Solution:<br>
(a) v = fλ = 120 × 2.5 = 300 m/s<br>
(b) Sound travels faster in solids because particles are closer together<br>
(c) Loudness depends on amplitude
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Sound needs a medium to travel<br>
 No medium = no sound (space is silent)<br>
 Frequency → pitch<br>
 Amplitude → loudness<br>
 Speed depends on medium, not frequency
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. Why is sound faster in solids than gases?<br>
2. What is the difference between compression and rarefaction?<br>
3. A wave has frequency 200 Hz and wavelength 1.5 m. Find speed.<br>
4. What happens to sound in a vacuum?<br>
5. Explain how echo is formed.
</div>

`,
  [
    {
      q: "A sound wave has frequency 200 Hz and wavelength 1.5 m. Find speed.",
      hint: "Use v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: Identify values → f = 200 Hz, λ = 1.5 m",
        "Step 2: Apply formula → v = fλ",
        "Step 3: Substitute → v = 200 × 1.5",
        "Step 4: Calculate → v = 300 m/s",
      ],
      ans: "300 m/s",
      final_check: "Correct unit is m/s",
      common_mistakes: [
        "Using wrong formula",
        "Forgetting to multiply correctly",
      ],
      explanation:
        "Speed of sound is found by multiplying frequency and wavelength.",
    },

    {
      q: "A sound wave has frequency 100 Hz and wavelength 2 m. Find speed.",
      hint: "v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: f = 100 Hz, λ = 2 m",
        "Step 2: v = fλ",
        "Step 3: v = 100 × 2",
        "Step 4: v = 200 m/s",
      ],
      ans: "200 m/s",
      final_check: "Units correctly in m/s",
      common_mistakes: ["Swapping formula terms", "Incorrect multiplication"],
      explanation: "Wave speed depends on both frequency and wavelength.",
    },

    {
      q: "A sound wave travels at 340 m/s and has frequency 170 Hz. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v/f",
      steps: [
        "Step 1: v = 340 m/s, f = 170 Hz",
        "Step 2: λ = v/f",
        "Step 3: λ = 340/170",
        "Step 4: λ = 2 m",
      ],
      ans: "2 m",
      final_check: "Correct unit is meters",
      common_mistakes: ["Using wrong rearrangement", "Dividing incorrectly"],
      explanation: "Wavelength is speed divided by frequency.",
    },

    {
      q: "A sound wave has wavelength 0.5 m and speed 150 m/s. Find frequency.",
      hint: "f = v/λ",
      formula: "f = v/λ",
      steps: [
        "Step 1: v = 150 m/s, λ = 0.5 m",
        "Step 2: f = v/λ",
        "Step 3: f = 150/0.5",
        "Step 4: f = 300 Hz",
      ],
      ans: "300 Hz",
      final_check: "Frequency is in Hz",
      common_mistakes: ["Wrong division", "Using λ = f/v"],
      explanation: "Frequency is calculated by dividing speed by wavelength.",
    },

    {
      q: "Why can't sound travel in space?",
      hint: "no particles",
      ans: "Because there is no medium for sound waves to travel through.",
      explanation:
        "Sound needs particles to vibrate, but space is a vacuum with no particles.",
    },

    {
      q: "What determines loudness of sound?",
      hint: "wave height",
      ans: "Amplitude",
      explanation:
        "Greater amplitude means louder sound, lower amplitude means softer sound.",
    },

    {
      q: "What determines pitch of sound?",
      hint: "frequency",
      ans: "Frequency",
      explanation:
        "High frequency produces high pitch sound and low frequency produces low pitch.",
    },

    {
      q: "What is a sound wave?",
      hint: "vibration",
      ans: "A sound wave is a mechanical wave produced by vibrations of particles.",
      explanation:
        "Sound waves travel through air, liquids, or solids by particle vibration.",
    },

    {
      q: "What type of wave is sound?",
      hint: "mechanical",
      ans: "A mechanical wave",
      explanation:
        "Sound requires a medium to travel, so it is a mechanical wave.",
    },

    {
      q: "A sound wave has frequency 50 Hz and speed 340 m/s. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v/f",
      steps: [
        "Step 1: v = 340 m/s, f = 50 Hz",
        "Step 2: λ = v/f",
        "Step 3: λ = 340/50",
        "Step 4: λ = 6.8 m",
      ],
      ans: "6.8 m",
      final_check: "Correct unit is meters",
      common_mistakes: [
        "Multiplying instead of dividing",
        "Wrong formula usage",
      ],
      explanation: "Wavelength depends on speed and frequency.",
    },

    {
      q: "What is echo?",
      hint: "reflection of sound",
      ans: "Echo is the reflection of sound waves.",
      explanation:
        "Sound reflects off surfaces and returns to the listener after a delay.",
    },

    {
      q: "Why is sound faster in solids than in air?",
      hint: "particle spacing",
      ans: "Because particles are closer together in solids.",
      explanation:
        "Closer particles transfer vibrations faster in solids than in gases.",
    },
  ],
);

/* =========================
   3. LIGHT WAVES
========================= */

add(
  "physics",
  "waves",
  "Light waves",
  `<h2>Light Waves (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
Light is a form of electromagnetic radiation that travels in waves. It does not require a medium and can travel through a vacuum such as space.
</p>

<p>
Unlike sound, light is a wave of electric and magnetic fields oscillating perpendicular to each other and to the direction of travel.
</p>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Light is a transverse wave</b></li>
<li>It is an electromagnetic wave (no particles required)</li>
<li>It can travel through vacuum (space)</li>
<li>Speed of light in vacuum = <b>3 × 10⁸ m/s</b></li>
<li>Light travels in straight lines in a uniform medium</li>
</ul>

---

<h3> KEY PHENOMENA OF LIGHT</h3>

<div class="example-box">
<b>Reflection:</b> Bouncing back of light from a surface (e.g., mirror)
</div>

<div class="example-box">
<b>Refraction:</b> Bending of light when it moves from one medium to another
</div>

<div class="example-box">
<b>Dispersion:</b> Splitting of white light into different colors (rainbow formation)
</div>

<div class="example-box">
<b>Absorption:</b> When light energy is taken in by a material
</div>

---

<h3> IMPORTANT FACTS</h3>

<ul>
<li>Light does NOT need a medium to travel</li>
<li>Light is the fastest known form of energy transfer</li>
<li>Speed in air ≈ speed in vacuum (very close)</li>
<li>Speed decreases in denser materials like glass or water</li>
</ul>

---

<h3> FORMULA</h3>

<div class="formula">
v = fλ
</div>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: Why can light travel in space?</b><br>
Because it is an electromagnetic wave and does not require a medium.
</div>

<div class="example-box">
<b>Q2: Why does light bend when entering glass?</b><br>
Because its speed changes when moving from air to a denser medium.
</div>

<div class="example-box">
<b>Q3: What causes a rainbow?</b><br>
Dispersion of light through water droplets.
</div>

<div class="example-box">
<b>Q4: Is light faster than sound?</b><br>
Yes, light travels much faster than sound.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Sunlight reaches Earth through space.<br>
Explanation: Space is a vacuum, but light can travel without a medium.
</div>

<div class="example-box">
<b>Example 2:</b><br>
Light passes from air into water and bends.<br>
This is called refraction due to change in speed.
</div>

<div class="example-box">
<b>Example 3:</b><br>
A rainbow appears after rain.<br>
Water droplets act as prisms that disperse light into colors.
</div>

<div class="example-box">
<b>Example 4 (Calculation):</b><br>
Frequency = 6 × 10¹⁴ Hz, wavelength = 5 × 10⁻⁷ m<br>
Speed = v = fλ = 3 × 10⁸ m/s
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A light wave travels in vacuum with frequency 5 × 10¹⁴ Hz.<br><br>

(a) Find its wavelength<br>
(b) State whether light needs a medium<br>
(c) Explain why light slows down in glass<br><br>

Solution:<br>
(a) λ = v/f = (3 × 10⁸) / (5 × 10¹⁴) = 6 × 10⁻⁷ m<br>
(b) No, light does not need a medium<br>
(c) Light slows down because it interacts with particles in glass
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Light is an electromagnetic wave<br>
 It travels fastest in vacuum<br>
 It slows down in denser media<br>
 It carries energy without needing matter<br>
 It is responsible for vision
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. Why is light called a transverse wave?<br>
2. What happens when light enters glass?<br>
3. Calculate speed if f = 4 × 10¹⁴ Hz and λ = 7.5 × 10⁻⁷ m<br>
4. What causes dispersion of light?<br>
5. Why is space dark despite sunlight?
</div>

`,
  [
    {
      q: "A light wave has frequency 4 × 10^14 Hz and wavelength 7.5 × 10^-7 m. Find speed.",
      hint: "Use v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: Identify values → f = 4 × 10^14 Hz, λ = 7.5 × 10^-7 m",
        "Step 2: Write formula → v = fλ",
        "Step 3: Substitute → v = (4 × 10^14)(7.5 × 10^-7)",
        "Step 4: Multiply numbers → 4 × 7.5 = 30",
        "Step 5: Add powers → 10^14 × 10^-7 = 10^7",
        "Step 6: Final result → v = 3 × 10^8 m/s",
      ],
      ans: "3 × 10^8 m/s",
      final_check: "Matches speed of light in vacuum",
      common_mistakes: [
        "Adding instead of multiplying frequency and wavelength",
        "Incorrect power of 10 rules",
      ],
      explanation: "Wave speed is the product of frequency and wavelength.",
    },

    {
      q: "A wave has frequency 2 × 10^6 Hz and wavelength 0.15 m. Find speed.",
      hint: "v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: f = 2 × 10^6 Hz, λ = 0.15 m",
        "Step 2: v = fλ",
        "Step 3: v = (2 × 10^6) × 0.15",
        "Step 4: 2 × 0.15 = 0.3",
        "Step 5: v = 0.3 × 10^6",
        "Step 6: v = 3 × 10^5 m/s",
      ],
      ans: "3 × 10^5 m/s",
      final_check: "Correct unit is m/s",
      common_mistakes: [
        "Ignoring decimal multiplication",
        "Wrong exponent handling",
      ],
      explanation:
        "Speed is directly proportional to frequency and wavelength.",
    },

    {
      q: "A wave travels at 340 m/s and has frequency 170 Hz. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v/f",
      steps: [
        "Step 1: Identify values → v = 340 m/s, f = 170 Hz",
        "Step 2: Write formula → λ = v/f",
        "Step 3: Substitute → λ = 340/170",
        "Step 4: Calculate → λ = 2 m",
      ],
      ans: "2 m",
      final_check: "Wavelength is reasonable for sound wave",
      common_mistakes: [
        "Using v = fλ instead of rearranging",
        "Dividing incorrectly",
      ],
      explanation: "Wavelength is found by dividing speed by frequency.",
    },

    {
      q: "A wave has wavelength 0.5 m and speed 200 m/s. Find frequency.",
      hint: "f = v/λ",
      formula: "f = v/λ",
      steps: [
        "Step 1: v = 200 m/s, λ = 0.5 m",
        "Step 2: f = v/λ",
        "Step 3: f = 200/0.5",
        "Step 4: f = 400 Hz",
      ],
      ans: "400 Hz",
      final_check: "Frequency has unit Hz",
      common_mistakes: [
        "Using wrong rearrangement",
        "Confusing wavelength with speed",
      ],
      explanation: "Frequency is speed divided by wavelength.",
    },

    {
      q: "A wave has frequency 5 × 10^5 Hz and speed 1 × 10^8 m/s. Find wavelength.",
      hint: "λ = v/f",
      formula: "λ = v/f",
      steps: [
        "Step 1: v = 1 × 10^8, f = 5 × 10^5",
        "Step 2: λ = v/f",
        "Step 3: λ = (1 × 10^8) / (5 × 10^5)",
        "Step 4: 1/5 = 0.2",
        "Step 5: 10^8 / 10^5 = 10^3",
        "Step 6: λ = 0.2 × 10^3 = 200 m",
      ],
      ans: "200 m",
      final_check: "Large wavelength expected for low frequency",
      common_mistakes: [
        "Subtracting exponents incorrectly",
        "Dividing coefficients wrongly",
      ],
      explanation: "Wavelength increases when frequency decreases.",
    },

    {
      q: "A wave has wavelength 3 m and frequency 50 Hz. Find speed.",
      hint: "v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: f = 50 Hz, λ = 3 m",
        "Step 2: v = fλ",
        "Step 3: v = 50 × 3",
        "Step 4: v = 150 m/s",
      ],
      ans: "150 m/s",
      final_check: "Unit is correct (m/s)",
      common_mistakes: ["Using wrong formula", "Forgetting multiplication"],
      explanation: "Wave speed is product of frequency and wavelength.",
    },
    {
      q: "A light wave has frequency 6 × 10^14 Hz and wavelength 5 × 10^-7 m. Find speed.",
      hint: "v = fλ",
      formula: "v = fλ",
      steps: [
        "Step 1: f = 6 × 10^14, λ = 5 × 10^-7",
        "Step 2: v = fλ",
        "Step 3: Multiply → 6 × 5 = 30",
        "Step 4: Add powers → 10^14 × 10^-7 = 10^7",
        "Step 5: v = 3 × 10^8 m/s",
      ],
      ans: "3 × 10^8 m/s",
      final_check: "Speed of light confirmed",
      common_mistakes: ["Wrong exponent handling", "Misplacing decimal point"],
      explanation: "Light speed in vacuum is constant.",
    },
    {
      q: "A wave travels 600 m in 3 seconds. Find its speed.",
      hint: "v = d/t",
      formula: "v = d/t",
      steps: [
        "Step 1: d = 600 m, t = 3 s",
        "Step 2: v = d/t",
        "Step 3: v = 600/3",
        "Step 4: v = 200 m/s",
      ],
      ans: "200 m/s",
      final_check: "Speed has correct unit m/s",
      common_mistakes: ["Reversing formula", "Ignoring division"],
      explanation: "Speed is distance divided by time.",
    },
    {
      q: "A wave has speed 300 m/s and wavelength 0.6 m. Find frequency.",
      hint: "f = v/λ",
      formula: "f = v/λ",
      steps: [
        "Step 1: v = 300 m/s, λ = 0.6 m",
        "Step 2: f = v/λ",
        "Step 3: f = 300/0.6",
        "Step 4: f = 500 Hz",
      ],
      ans: "500 Hz",
      final_check: "Frequency unit is Hz",
      common_mistakes: ["Dividing incorrectly", "Using wrong formula"],
      explanation: "Frequency depends on speed and wavelength.",
    },

    {
      q: "Why can light travel in space?",
      hint: "no medium required",
      ans: "Because light is an electromagnetic wave that does not need a medium.",
      explanation:
        "Unlike sound, light can travel through a vacuum because it does not rely on particles.",
    },
  ],
);
/* =========================
   4. REFLECTION & REFRACTION
========================= */

add(
  "physics",
  "waves",
  "Reflection & refraction",
  `<h2>Reflection & Refraction (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
When waves (light or sound) meet a boundary between two media, they interact in different ways depending on the surface and medium change.
</p>

<p>
They may either bounce back into the same medium or change direction as they enter a new medium due to a change in speed.
</p>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Reflection:</b> The bouncing back of a wave when it hits a surface.</li>
<li><b>Refraction:</b> The bending of a wave when it passes from one medium to another due to change in speed.</li>
<li>Reflection occurs on smooth or hard surfaces like mirrors and walls.</li>
<li>Refraction occurs when waves pass between media such as air, water, and glass.</li>
</ul>

---

<h3> LAWS OF REFLECTION</h3>

<div class="example-box">
1. The angle of incidence is equal to the angle of reflection (i = r)
</div>

<div class="example-box">
2. The incident ray, reflected ray, and normal all lie in the same plane
</div>

---

<h3> KEY CONCEPT</h3>

<div class="example-box">
Refraction happens because the <b>speed of a wave changes</b> when it enters a different medium.
</div>

---

<h3> REAL-LIFE APPLICATIONS</h3>

<ul>
<li>Mirrors use reflection to form images</li>
<li>Eyeglasses use refraction to correct vision</li>
<li>Swimming pools look shallower due to refraction</li>
<li>Mirages in deserts are caused by refraction of light in hot air layers</li>
</ul>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: Why does light reflect from a mirror?</b><br>
Because the smooth surface causes waves to bounce back regularly.
</div>

<div class="example-box">
<b>Q2: Why does a straw look bent in water?</b><br>
Because light changes speed when moving from air to water.
</div>

<div class="example-box">
<b>Q3: What causes refraction?</b><br>
Change in wave speed when entering a different medium.
</div>

<div class="example-box">
<b>Q4: Does reflection change speed of light?</b><br>
No, reflection occurs in the same medium so speed remains constant.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Light hits a mirror at 30°.<br>
Angle of reflection = 30° (by law of reflection)
</div>

<div class="example-box">
<b>Example 2:</b><br>
A spoon in water appears bent.<br>
Explanation: light bends as it moves from water to air.
</div>

<div class="example-box">
<b>Example 3:</b><br>
Swimming pool appears shallow.<br>
Explanation: light rays bend away from normal when leaving water.
</div>

<div class="example-box">
<b>Example 4:</b><br>
Light enters glass from air and slows down.<br>
This causes it to bend towards the normal.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A ray of light strikes a plane mirror at an angle of 45°.<br><br>

(a) State the angle of reflection<br>
(b) Name the law used<br>
(c) Explain why refraction occurs in water<br><br>

Solution:<br>
(a) 45°<br>
(b) Law of reflection (i = r)<br>
(c) Refraction occurs due to change in speed of light when entering water
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Reflection = bouncing back of waves<br>
 Refraction = bending due to speed change<br>
 i = r in reflection<br>
 Refraction depends on medium density<br>
 Light bends towards normal in denser medium
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. State the laws of reflection<br>
2. Why does light bend when entering glass?<br>
3. A ray hits a mirror at 60°. Find angle of reflection<br>
4. Give two real-life examples of refraction<br>
5. Explain why a stick in water looks bent
</div>

`,
  [
    {
      q: "Why does light bend in water?",
      hint: "change of medium",
      ans: "Because its speed changes when entering a different medium.",
      explanation:
        "When light passes from air into water, its speed decreases, causing it to change direction (refraction).",
    },

    {
      q: "A ray of light hits a mirror at 60°. Find angle of reflection.",
      hint: "law of reflection",
      formula: "i = r",
      steps: [
        "Step 1: Identify angle of incidence → i = 60°",
        "Step 2: Use law of reflection → i = r",
        "Step 3: Substitute values → r = 60°",
      ],
      ans: "60°",
      final_check: "Angle of incidence equals angle of reflection",
      common_mistakes: [
        "Confusing incidence with reflection angle",
        "Using wrong formula",
      ],
      explanation:
        "The law of reflection states that the angle of incidence equals the angle of reflection.",
    },
    {
      q: "A light ray strikes a mirror at 30°. Calculate the angle of reflection.",
      hint: "law of reflection",
      formula: "i = r",
      steps: [
        "Step 1: Identify angle of incidence → i = 30°",
        "Step 2: Apply law of reflection → i = r",
        "Step 3: Substitute values → r = 30°",
      ],
      ans: "30°",
      final_check: "Reflection angle equals incidence angle",
      common_mistakes: [
        "Doubling the angle",
        "Confusing normal line with mirror surface",
      ],
      explanation:
        "Reflection follows the law i = r, meaning angles are equal.",
    },

    {
      q: "A ray hits a mirror at 45°. What is the angle between the incident ray and reflected ray?",
      hint: "sum of angles",
      formula: "Angle between rays = i + r",
      steps: [
        "Step 1: Identify incidence angle → i = 45°",
        "Step 2: Reflection angle → r = 45°",
        "Step 3: Add angles → 45° + 45°",
        "Step 4: Result = 90°",
      ],
      ans: "90°",
      final_check: "Angle between incident and reflected rays is 2i",
      common_mistakes: [
        "Using only one angle",
        "Subtracting instead of adding",
      ],
      explanation:
        "The angle between incident and reflected rays equals twice the angle of incidence.",
    },
    {
      q: "A light ray travels from air into glass and slows down. What happens to its direction?",
      hint: "refraction effect",
      formula: "n1 sin i = n2 sin r (conceptual)",
      steps: [
        "Step 1: Light enters denser medium (air → glass)",
        "Step 2: Speed decreases",
        "Step 3: Ray bends towards the normal",
        "Step 4: New direction is closer to normal line",
      ],
      ans: "It bends towards the normal",
      final_check: "Denser medium causes bending towards normal",
      common_mistakes: [
        "Thinking it bends away from normal",
        "Ignoring speed change concept",
      ],
      explanation:
        "When light enters a denser medium, it slows down and bends towards the normal line.",
    },
  ][
    ({
      q: "Why does light bend in water?",
      hint: "change of medium",
      ans: "Because its speed changes when entering a different medium.",
      explanation:
        "When light passes from air into water, its speed decreases, causing it to change direction (refraction).",
    },
    {
      q: "A ray of light hits a mirror at 60°. Find the angle of reflection.",
      hint: "law of reflection",
      formula: "i = r",
      steps: [
        "Step 1: Identify angle of incidence → i = 60°",
        "Step 2: Apply law of reflection → i = r",
        "Step 3: Substitute values → r = 60°",
      ],
      ans: "60°",
      final_check: "Angle of incidence equals angle of reflection",
      common_mistakes: [
        "Confusing incidence with reflection angle",
        "Using wrong reference line",
      ],
      explanation:
        "The law of reflection states that angle of incidence equals angle of reflection.",
    },
    {
      q: "A ray of light strikes a plane mirror at 35°. Calculate the angle of reflection.",
      hint: "i = r",
      formula: "i = r",
      steps: [
        "Step 1: Given angle of incidence → i = 35°",
        "Step 2: Apply law of reflection → r = i",
        "Step 3: Substitute → r = 35°",
      ],
      ans: "35°",
      final_check: "Angles must always be equal in reflection",
      common_mistakes: [
        "Doubling the angle",
        "Measuring from mirror surface instead of normal",
      ],
      explanation: "Reflection obeys i = r at all times.",
    },
    {
      q: "A light ray is incident on a mirror at 40°. Find the angle between the incident ray and reflected ray.",
      hint: "geometry of reflection",
      formula: "Angle between rays = 2i",
      steps: [
        "Step 1: Identify incidence angle → i = 40°",
        "Step 2: Use relation → angle between rays = 2i",
        "Step 3: Substitute → 2 × 40°",
        "Step 4: Calculate → 80°",
      ],
      ans: "80°",
      final_check: "Angle between rays is always double incidence angle",
      common_mistakes: ["Adding i and r incorrectly", "Using only one angle"],
      explanation:
        "The geometry of reflection gives angle between incident and reflected rays as 2i.",
    },
    {
      q: "A ray passes from air into glass. Refractive index of glass is 1.5. If angle of incidence is 30°, calculate angle of refraction.",
      hint: "Snell’s law",
      formula: "n1 sin i = n2 sin r",
      steps: [
        "Step 1: Identify values → n1 = 1 (air), n2 = 1.5, i = 30°",
        "Step 2: Apply Snell’s law → 1 × sin30° = 1.5 × sin r",
        "Step 3: Substitute → 0.5 = 1.5 sin r",
        "Step 4: Solve → sin r = 0.333",
        "Step 5: Find r → r ≈ 19.5°",
      ],
      ans: "19.5°",
      final_check: "Angle of refraction is smaller in denser medium",
      common_mistakes: [
        "Reversing formula",
        "Forgetting sine values",
        "Incorrect calculator mode (degrees vs radians)",
      ],
      explanation:
        "Snell’s law relates angles of incidence and refraction using refractive indices.",
    },
    {
      q: "A ray enters glass (n = 1.5) from air at 45°. Find angle of refraction.",
      hint: "Snell’s law",
      formula: "n1 sin i = n2 sin r",
      steps: [
        "Step 1: n1 = 1, n2 = 1.5, i = 45°",
        "Step 2: Apply formula → sin r = (1 × sin45°)/1.5",
        "Step 3: sin45° = 0.707",
        "Step 4: sin r = 0.707/1.5 = 0.471",
        "Step 5: r ≈ 28.1°",
      ],
      ans: "28.1°",
      final_check: "Refraction angle is smaller than incidence angle",
      common_mistakes: [
        "Using wrong sine value",
        "Not dividing correctly by refractive index",
      ],
      explanation:
        "Light bends towards the normal when entering a denser medium.",
    })
  ],
);

/* =========================
   5. DIFFRACTION & INTERFERENCE
========================= */

add(
  "physics",
  "waves",
  "Diffraction & Interference",
  `<h2>Diffraction & Interference (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
Waves do not always travel in straight lines only. They can spread out, bend around obstacles, and interact with other waves when they meet.
</p>

<p>
These behaviors help explain many real-life wave effects such as sound bending around corners and patterns formed by overlapping waves.
</p>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Diffraction:</b> The spreading of waves when they pass through a narrow gap or around an obstacle.</li>
<li>Diffraction is more noticeable when the gap is similar in size to the wavelength.</li>
<li>Smaller gap → greater spreading</li>
<li><b>Interference:</b> The meeting and superposition of two or more waves.</li>
</ul>

---

<h3> TYPES OF INTERFERENCE</h3>

<div class="example-box">
<b>Constructive Interference:</b> When waves meet in phase and combine to form a larger amplitude (louder/stronger wave).
</div>

<div class="example-box">
<b>Destructive Interference:</b> When waves meet out of phase and cancel each other partially or completely.
</div>

---

<h3> KEY CONDITIONS</h3>

<ul>
<li>Diffraction is strongest when gap size ≈ wavelength</li>
<li>Constructive interference occurs when crest meets crest or trough meets trough</li>
<li>Destructive interference occurs when crest meets trough</li>
</ul>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: Why does sound bend around corners?</b><br>
Because sound waves undergo diffraction.
</div>

<div class="example-box">
<b>Q2: What is interference?</b><br>
It is the combination of two or more waves meeting at the same point.
</div>

<div class="example-box">
<b>Q3: What causes loud and quiet spots in a room?</b><br>
Interference between sound waves.
</div>

<div class="example-box">
<b>Q4: What happens in destructive interference?</b><br>
Waves cancel each other reducing amplitude.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Sound from a radio is heard even behind a wall.<br>
Explanation: Sound diffracts around the obstacle.
</div>

<div class="example-box">
<b>Example 2:</b><br>
Water waves pass through a narrow opening and spread out.<br>
This is diffraction because the gap is small.
</div>

<div class="example-box">
<b>Example 3:</b><br>
Two speakers produce loud and quiet regions in a hall.<br>
This is due to interference of sound waves.
</div>

<div class="example-box">
<b>Example 4:</b><br>
Noise-cancelling headphones produce sound waves that cancel unwanted noise.<br>
This is destructive interference.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
Two sound waves meet at a point in a room.<br>
One wave has a crest and the other has a trough of equal amplitude.<br><br>

(a) What type of interference occurs?<br>
(b) What is the result of this interaction?<br>
(c) Give one real-life application of this effect<br><br>

Solution:<br>
(a) Destructive interference<br>
(b) Waves cancel each other producing reduced or zero sound<br>
(c) Noise-cancelling headphones
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Diffraction = bending/spreading of waves<br>
 Interference = overlap of waves<br>
 Constructive = louder/stronger wave<br>
 Destructive = weaker or cancelled wave<br>
 Wave behavior depends on wavelength and obstacles
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. Define diffraction<br>
2. What condition increases diffraction?<br>
3. Explain constructive interference<br>
4. Why do we hear sound behind walls?<br>
5. Give two examples of interference in real life
</div>

`,
  [
    {
      q: "Why does sound bend around corners?",
      hint: "wave spreading",
      steps: [
        "Step 1: Identify wave type → sound is a wave",
        "Step 2: Waves can bend when passing obstacles",
        "Step 3: This bending is called diffraction",
        "Step 4: Apply concept → sound spreads around corners",
      ],
      ans: "Because of diffraction",
      final_check: "Occurs when wavelength is comparable to obstacle size",
      common_mistakes: [
        "Confusing diffraction with reflection",
        "Thinking only light waves diffract",
      ],
      explanation:
        "Diffraction is the spreading of waves when they pass around obstacles or through gaps.",
    },
    {
      q: "What happens in destructive interference?",
      hint: "opposite phases",
      steps: [
        "Step 1: Two waves meet",
        "Step 2: One crest meets a trough",
        "Step 3: They cancel each other partially or fully",
        "Step 4: Resulting amplitude decreases",
      ],
      ans: "Waves cancel each other",
      final_check: "Amplitude becomes smaller or zero",
      common_mistakes: [
        "Thinking energy is destroyed",
        "Confusing with constructive interference",
      ],
      explanation:
        "Destructive interference occurs when waves meet out of phase and reduce total amplitude.",
    },
    {
      q: "If two identical waves meet crest to crest, what happens?",
      hint: "same phase",
      formula: "Resultant amplitude = A + A = 2A",
      steps: [
        "Step 1: Identify phase → crest meets crest",
        "Step 2: Waves are in phase",
        "Step 3: Add amplitudes",
        "Step 4: Result = increased amplitude",
      ],
      ans: "Constructive interference (amplitude increases)",
      final_check: "Amplitude doubles if waves are identical",
      common_mistakes: ["Thinking waves cancel", "Ignoring phase condition"],
      explanation:
        "Constructive interference occurs when waves combine in phase, increasing total amplitude.",
    },
  ][
    ({
      q: "Two identical waves each have amplitude 3 cm. They meet crest to crest. Find resultant amplitude.",
      hint: "Use constructive interference (add amplitudes)",
      formula: "A_result = A1 + A2",
      steps: [
        "Step 1: Identify amplitudes → A1 = 3 cm, A2 = 3 cm",
        "Step 2: Waves meet crest to crest → constructive interference",
        "Step 3: Apply formula → A_result = A1 + A2",
        "Step 4: Substitute → A_result = 3 + 3",
        "Step 5: Calculate → A_result = 6 cm",
      ],
      ans: "6 cm",
      final_check: "Amplitude increases because waves are in phase",
      common_mistakes: [
        "Subtracting amplitudes instead of adding",
        "Ignoring phase condition (crest to crest)",
      ],
      explanation:
        "Constructive interference increases amplitude when waves meet in phase.",
    },
    {
      q: "Two waves of amplitude 5 cm and 3 cm meet crest to trough. Find resultant amplitude.",
      hint: "Use destructive interference (subtract amplitudes)",
      formula: "A_result = A1 - A2",
      steps: [
        "Step 1: Identify amplitudes → A1 = 5 cm, A2 = 3 cm",
        "Step 2: Crest meets trough → destructive interference",
        "Step 3: Apply formula → A_result = A1 - A2",
        "Step 4: Substitute → A_result = 5 - 3",
        "Step 5: Calculate → A_result = 2 cm",
      ],
      ans: "2 cm",
      final_check: "Amplitude decreases but does not become negative",
      common_mistakes: [
        "Adding instead of subtracting",
        "Forgetting sign change due to phase difference",
      ],
      explanation:
        "Destructive interference reduces amplitude when waves are out of phase.",
    },
    {
      q: "A wave travels 340 m in 2 seconds. Find its speed.",
      hint: "Use speed = distance ÷ time",
      formula: "v = d / t",
      steps: [
        "Step 1: Identify values → d = 340 m, t = 2 s",
        "Step 2: Write formula → v = d / t",
        "Step 3: Substitute → v = 340 / 2",
        "Step 4: Calculate → v = 170 m/s",
      ],
      ans: "170 m/s",
      final_check: "Unit is m/s which is correct for speed",
      common_mistakes: ["Reversing formula (t/d)", "Forgetting units"],
      explanation: "Wave speed is distance covered per unit time.",
    })
  ],
);
/* =========================================================
   PHYSICS: ELECTRICITY & MAGNETISM (MASTER UPGRADE)
========================================================= */
/* =========================
   1. CURRENT & VOLTAGE
========================= */

add(
  "physics",
  "em",
  "Current & Voltage",
  `<h2>Current & Voltage (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
Electric current and voltage are fundamental concepts in electricity. They explain how electric charges move and what causes them to move in a circuit.
</p>

<p>
Electricity is caused by the movement of tiny charged particles called <b>electrons</b> through a conductor such as a metal wire.
</p>

---

<h3> WELL EXPLAINED NOTES</h3>
<ul>
<li><b>Electric Current (I):</b> The rate of flow of electric charge through a conductor.</li>
<li><b>Voltage (V):</b> The electrical energy supplied per unit charge to move electrons in a circuit.</li>
<li>Current flows from higher potential to lower potential in a circuit.</li>
<li>Electrons actually flow in the opposite direction (from negative to positive terminal).</li>
<li>Unit of current = Ampere (A)</li>
<li>Unit of voltage = Volt (V)</li>
</ul>

---

<h3> KEY IDEA</h3>

<div class="example-box">
Voltage is the "push" that drives electric charges, while current is the actual flow of charges.
</div>

---

<h3> FORMULA</h3>

<div class="formula">
I = Q / t
</div>

Where:
<ul>
<li>I = current (A)</li>
<li>Q = charge (Coulombs)</li>
<li>t = time (seconds)</li>
</ul>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: What is electric current?</b><br>
It is the rate at which electric charge flows in a circuit.
</div>

<div class="example-box">
<b>Q2: What is voltage?</b><br>
It is the energy supplied per unit charge to move electrons.
</div>

<div class="example-box">
<b>Q3: What causes current to flow?</b><br>
A difference in voltage (potential difference).
</div>

<div class="example-box">
<b>Q4: What is the difference between current and voltage?</b><br>
Current is flow of charge, voltage is energy that causes the flow.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Charge = 10C, Time = 2s<br>
I = Q/t = 10/2 = 5A
</div>

<div class="example-box">
<b>Example 2:</b><br>
Charge = 20C, Time = 4s<br>
I = 20/4 = 5A
</div>

<div class="example-box">
<b>Example 3:</b><br>
Charge = 30C, Time = 6s<br>
I = 30/6 = 5A
</div>

<div class="example-box">
<b>Example 4 (Conceptual):</b><br>
If voltage increases in a circuit (resistance constant), current increases because more energy is supplied to move electrons.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A charge of 24C flows through a wire in 6 seconds.<br><br>

(a) Calculate the current<br>
(b) Define voltage<br>
(c) Explain what happens to current if voltage increases<br><br>

Solution:<br>
(a) I = Q/t = 24/6 = 4A<br>
(b) Voltage is energy supplied per unit charge<br>
(c) Current increases because more energy is available to push electrons
</div>

---

<h3> COMMON MISTAKES</h3>

<div class="keyfact">
 Confusing current with voltage<br>
 Thinking electrons flow in direction of current<br>
 Assuming high voltage always means high current (depends on resistance)
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Current = flow of charge<br>
 Voltage = energy per charge<br>
 Voltage is the cause, current is the effect<br>
 I = Q/t is the main formula<br>
 Higher voltage increases potential for current flow
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. Define electric current<br>
2. What is the unit of voltage?<br>
3. A charge of 18C flows in 3s. Find current.<br>
4. Explain the role of voltage in a circuit<br>
5. What is the difference between current and voltage?
</div>

`,
  [
    {
      q: "A charge of 18C flows in 3s. Find current.",
      hint: "Use I = Q / t",
      formula: "I = Q / t",
      steps: [
        "Step 1: Identify values → Q = 18C, t = 3s",
        "Step 2: Write formula → I = Q / t",
        "Step 3: Substitute values → I = 18 / 3",
        "Step 4: Calculate → I = 6A",
      ],
      ans: "6A",
      final_check: "Unit is amperes (A), which is correct for current",
      common_mistakes: [
        "Using I = t / Q instead of Q / t",
        "Forgetting units (C and s)",
        "Incorrect division",
      ],
      explanation: "Current is the rate of flow of charge per unit time.",
    },
    {
      q: "Find current if V = 12V and R = 3Ω",
      hint: "Use Ohm’s Law I = V / R",
      formula: "I = V / R",
      steps: [
        "Step 1: Identify values → V = 12V, R = 3Ω",
        "Step 2: Write formula → I = V / R",
        "Step 3: Substitute values → I = 12 / 3",
        "Step 4: Calculate → I = 4A",
      ],
      ans: "4A",
      final_check: "Current decreases when resistance increases",
      common_mistakes: [
        "Swapping formula to R / V",
        "Ignoring Ohm’s Law conditions",
        "Wrong unit for resistance",
      ],
      explanation: "Current depends on voltage and resistance in a circuit.",
    },
  ],
);

/* =========================
   2. SERIES & PARALLEL CIRCUITS
========================= */

add(
  "physics",
  "em",
  "Series & Parallel Circuits",
  `<h2>Series & Parallel Circuits (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
Electric circuits can be connected in different ways. The arrangement of components affects how current and voltage behave in the circuit.
</p>

<p>
The two main types of circuits are series circuits and parallel circuits.
</p>

---

<h3> SERIES CIRCUITS</h3>

<ul>
<li>Components are connected end-to-end in a single path</li>
<li>Current is the same at all points in the circuit</li>
<li>Voltage is shared between components</li>
<li>If one component breaks, the whole circuit stops working</li>
</ul>



<div class="example-box">
<b>Key Idea:</b> One path for current flow only
</div>

---

<h3> PARALLEL CIRCUITS</h3>

<ul>
<li>Components are connected in separate branches</li>
<li>Voltage across each branch is the same</li>
<li>Current splits between branches</li>
<li>If one component fails, others still work</li>
</ul>



<div class="example-box">
<b>Key Idea:</b> Multiple paths for current flow
</div>

---

<h3> COMPARISON SUMMARY</h3>

<ul>
<li><b>Series:</b> same current, shared voltage, one path</li>
<li><b>Parallel:</b> same voltage, split current, multiple paths</li>
</ul>

---

<h3> REAL-LIFE APPLICATIONS</h3>

<div class="example-box">
Series: Old Christmas lights (if one fails, all go off)
</div>

<div class="example-box">
Parallel: Household wiring (each appliance works independently)
</div>

<div class="example-box">
Parallel: Car electrical systems
</div>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: Why is current the same in a series circuit?</b><br>
Because there is only one path for charge flow.
</div>

<div class="example-box">
<b>Q2: Why do parallel circuits work independently?</b><br>
Because each branch has its own path for current.
</div>

<div class="example-box">
<b>Q3: What happens if one bulb breaks in series?</b><br>
The entire circuit stops working.
</div>

<div class="example-box">
<b>Q4: What happens to current in a parallel circuit?</b><br>
It splits between branches.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Two bulbs in series share a battery.<br>
Each bulb receives less voltage → bulbs are dimmer.
</div>

<div class="example-box">
<b>Example 2:</b><br>
Two bulbs in parallel each receive full voltage.<br>
Both bulbs shine brightly.
</div>

<div class="example-box">
<b>Example 3:</b><br>
House wiring uses parallel circuits so that turning off one device does not affect others.
</div>

<div class="example-box">
<b>Example 4 (Current behavior):</b><br>
In a parallel circuit, total current = sum of currents in each branch.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A circuit has two bulbs connected in series to a battery.<br><br>

(a) What happens if one bulb breaks?<br>
(b) State one disadvantage of series circuits<br>
(c) Why are household circuits connected in parallel?<br><br>

Solution:<br>
(a) The whole circuit stops working<br>
(b) Voltage is shared making bulbs dimmer<br>
(c) So each appliance works independently
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Series = one path, same current, shared voltage<br>
 Parallel = many paths, same voltage, split current<br>
 Homes use parallel circuits<br>
 Failure in series stops everything<br>
 Parallel circuits are more reliable
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. Define series circuit<br>
2. Define parallel circuit<br>
3. Why do bulbs glow brighter in parallel?<br>
4. What happens when one component fails in series?<br>
5. State two advantages of parallel circuits
</div>

`,
  [
    {
      q: "In a parallel circuit, branch currents are 2A, 3A and 5A. Find total current.",
      hint: "Add all branch currents",
      ans: "10A",
      sol: "I(total) = 2 + 3 + 5 = 10A",
      explanation:
        "In parallel circuits, total current is the sum of currents in all branches.",
    },
    {
      q: "A series circuit has a current of 3A. What is the current through each resistor?",
      hint: "Series = same current everywhere",
      ans: "3A",
      sol: "I1 = I2 = I3 = 3A",
      explanation:
        "In a series circuit, current is the same at all points because there is only one path.",
    },
    {
      q: "A voltage of 12V is applied across a resistor of 4Ω. Find the current.",
      hint: "Use Ohm’s Law: I = V / R",
      ans: "3A",
      sol: "I = 12 / 4 = 3A",
      explanation:
        "Ohm’s Law states that current equals voltage divided by resistance.",
    },
    {
      q: "Find resistance if voltage is 20V and current is 5A.",
      hint: "Use R = V / I",
      ans: "4Ω",
      sol: "R = 20 / 5 = 4Ω",
      explanation: "Resistance is found by dividing voltage by current.",
    },
    {
      q: "A circuit has two branches carrying 1.5A and 2.5A. Find total current.",
      hint: "Sum branch currents",
      ans: "4A",
      sol: "1.5 + 2.5 = 4A",
      explanation:
        "Total current in a parallel circuit is the sum of all branch currents.",
    },
    {
      q: "If a 9V battery pushes 3A through a circuit, find resistance.",
      hint: "R = V / I",
      ans: "3Ω",
      sol: "R = 9 / 3 = 3Ω",
      explanation: "Divide voltage by current to get resistance.",
    },
    {
      q: "In a parallel circuit, total current is 8A. If one branch is 3A, find the other branch current.",
      hint: "Subtract known current",
      ans: "5A",
      sol: "8 - 3 = 5A",
      explanation:
        "Total current equals sum of branch currents, so subtract to find missing value.",
    },
    {
      q: "A resistor has 6Ω resistance and current of 2A. Find voltage.",
      hint: "Use V = IR",
      ans: "12V",
      sol: "V = 2 × 6 = 12V",
      explanation: "Voltage equals current multiplied by resistance.",
    },
    {
      q: "Two identical bulbs in series each carry 1.5A. What is total current?",
      hint: "Series current rule",
      ans: "1.5A",
      sol: "Same current flows in series circuit",
      explanation:
        "In series circuits, current is constant throughout the circuit.",
    },

    {
      q: "A circuit has 3 parallel branches carrying 2A, 2A and 6A. Find total current.",
      hint: "Add all values",
      ans: "10A",
      sol: "2 + 2 + 6 = 10A",
      explanation:
        "Total current in parallel circuits is the sum of branch currents.",
    },
  ],
);

/* =========================
   3. MAGNETIC FIELDS
========================= */

add(
  "physics",
  "em",
  "Magnetic fields",
  `<h2>Magnetic Fields & Magnetism (Full Explanation)</h2>
<h3> FOUNDATION EXPLANATION</h3>
<p>
A magnetic field is the region around a magnet or current-carrying conductor where magnetic forces can be experienced.
It is invisible but can be represented using magnetic field lines.
</p>

---
<h3> MAGNETIC FIELD LINES</h3>

<ul>
<li>Field lines show the direction of magnetic force</li>
<li>They flow from <b>North pole → South pole</b> outside the magnet</li>
<li>Inside the magnet, they flow from South → North</li>
<li>Closer field lines = stronger magnetic field</li>
<li>Field lines never cross each other</li>
</ul>

---

<h3> MAGNETIC DOMAINS (DIPOLES)</h3>

<p>
Magnetic materials contain tiny regions called <b>domains</b>.
Each domain acts like a small magnet (dipole).
</p>

<div class="example-box">
<b>Unmagnetised material:</b> domains are randomly arranged → no overall magnetism
</div>

<div class="example-box">
<b>Magnetised material:</b> domains are aligned in one direction → strong magnet
</div>

---

<h3> HOW TO MAGNETISE OBJECTS (3 METHODS)</h3>

<div class="example-box">
<b>1. Stroking Method:</b><br>
Rub a magnet repeatedly in one direction along a material (like iron).
</div>

<div class="example-box">
<b>2. Electrical Method:</b><br>
Pass electric current through a coil (solenoid) around a metal core.
</div>

<div class="example-box">
<b>3. Induction Method:</b><br>
Place a magnetic material near a strong magnet → it becomes temporarily magnetised.
</div>

---

<h3> DEMAGNETISATION (LOSS OF MAGNETISM)</h3>

<ul>
<li>Heating the magnet</li>
<li>Hammering or dropping it</li>
<li>Applying alternating current (AC)</li>
</ul>

<div class="example-box">
<b>Prevention:</b> Avoid heat, shock, and strong opposing magnetic fields
</div>

---

<h3> POLARITY TESTING</h3>

<div class="example-box">
A known pole of a magnet is brought near an unknown pole.
If repulsion occurs → same pole is identified.
</div>

<div class="example-box">
<b>Key rule:</b> Like poles repel, unlike poles attract
</div>

---

<h3> WHY ATTRACTION IS NOT A RELIABLE TEST</h3>

<div class="example-box">
Attraction is NOT a valid test for polarity because both poles (N and S) attract an unknown pole.
Only repulsion confirms the same type of pole.
</div>

---

<h3> CONCEPT CLARITY QUESTIONS</h3>

<div class="example-box">
<b>Q1: What do magnetic field lines show?</b><br>
They show direction and strength of magnetic force.
</div>

<div class="example-box">
<b>Q2: What are magnetic domains?</b><br>
Tiny regions in a material that behave like small magnets.
</div>

<div class="example-box">
<b>Q3: Why does stroking magnetise a material?</b><br>
It aligns the domains in one direction.
</div>

<div class="example-box">
<b>Q4: Why is attraction not enough to test polarity?</b><br>
Because both poles attract, so it is not conclusive.
</div>

---

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
Iron filings around a magnet arrange in curved patterns → showing field lines.
</div>

<div class="example-box">
<b>Example 2:</b><br>
A steel bar is stroked with a magnet → domains align → bar becomes magnetised.
</div>

<div class="example-box">
<b>Example 3:</b><br>
A magnet dropped repeatedly loses strength → demagnetisation due to disturbance of domains.
</div>

<div class="example-box">
<b>Example 4:</b><br>
A compass needle aligns with Earth's magnetic field → showing Earth acts like a giant magnet.
</div>

---

<h3> CONTINUOUS EXAM-STYLE QUESTION</h3>

<div class="example-box">
A steel rod is magnetised using a bar magnet.<br><br>

(a) Explain how magnetisation occurs<br>
(b) What happens to domains in the process?<br>
(c) Why is repulsion used to test polarity?<br><br>

Solution:<br>
(a) Stroking aligns magnetic domains in one direction<br>
(b) Domains become ordered and point the same way<br>
(c) Because attraction occurs for both poles, but repulsion confirms same pole
</div>

---

<h3> KEY FACTS</h3>

<div class="keyfact">
 Magnetic field is invisible but real<br>
 Field lines go N → S outside magnet<br>
 Magnetism depends on domain alignment<br>
 Repulsion is the ONLY sure test of polarity<br>
 Heat, shock, and AC destroy magnetism
</div>

---

<h3> PRACTICE QUESTIONS</h3>

<div class="example-box">
1. What are magnetic domains?<br>
2. State 3 methods of magnetisation<br>
3. Why does heating destroy magnetism?<br>
4. Why is repulsion a better test than attraction?<br>
5. Describe how stroking produces a magnet
</div>

`,
  [
    {
      type: "written",
      q: "What is a magnetic field?",
      hint: "region of influence",
      ans: "A region around a magnet or current-carrying conductor where magnetic forces can be experienced.",
      explanation:
        "Magnetic fields are invisible but can be detected through their effects on materials like iron or compass needles.",
    },

    {
      type: "written",
      q: "What do magnetic field lines show?",
      hint: "direction + strength",
      ans: "They show the direction and strength of a magnetic field.",
      explanation:
        "Closer field lines indicate a stronger magnetic field, and the direction shows how a north pole would move.",
    },

    {
      type: "written",
      q: "In which direction do magnetic field lines flow outside a magnet?",
      hint: "N to S",
      ans: "From North pole to South pole.",
      explanation:
        "Outside the magnet, field lines always go from North to South, and inside they return from South to North.",
    },

    {
      type: "written",
      q: "What are magnetic domains?",
      hint: "tiny magnets",
      ans: "Small regions inside a material that behave like tiny magnets.",
      explanation:
        "Each domain acts like a dipole, and their alignment determines whether a material is magnetised.",
    },

    {
      type: "written",
      q: "Why is a material unmagnetised?",
      hint: "random orientation",
      ans: "Because its magnetic domains are randomly arranged.",
      explanation:
        "Randomly arranged domains cancel each other’s magnetic effects, resulting in no overall magnetism.",
    },

    {
      type: "written",
      q: "What happens to magnetic domains when a material is magnetised?",
      hint: "alignment",
      ans: "They align in the same direction.",
      explanation:
        "Aligned domains reinforce each other, producing a strong net magnetic field.",
    },

    {
      type: "written",
      q: "Why is repulsion the only sure test for polarity?",
      hint: "attraction is not enough",
      ans: "Because attraction can occur with both poles, but repulsion only occurs between like poles.",
      explanation:
        "Only repulsion confirms that two poles are the same type (N–N or S–S).",
    },

    {
      type: "written",
      q: "What causes demagnetisation?",
      hint: "heat, shock, AC",
      ans: "Heat, hammering, or alternating current.",
      explanation:
        "These disturb the alignment of magnetic domains, reducing or removing magnetism.",
    },

    {
      type: "written",
      q: "Why does a compass needle align north-south?",
      hint: "Earth is a magnet",
      ans: "Because Earth has a magnetic field.",
      explanation:
        "The compass aligns with Earth’s magnetic field, showing that Earth behaves like a giant magnet.",
    },

    {
      type: "written",
      q: "How does stroking magnetise a material?",
      hint: "domain alignment",
      ans: "It aligns magnetic domains in one direction.",
      explanation:
        "Repeated stroking forces domains to line up, creating a net magnetic field.",
    },
  ],
);
/* =========================
   4. ELECTROMAGNETISM
========================= */
add(
  "physics",
  "em",
  "Electromagnetism",
  `<h2> Electromagnetism (Full Structured Master Notes)</h2>
<h3> WELL ARRANGED NOTES</h3>

<p>
Electromagnetism is the study of the relationship between electricity and magnetism. 
Whenever electric current flows through a conductor, it produces a magnetic field around it.
</p>

<p>
This discovery shows that electricity and magnetism are connected and form a single force called electromagnetism.
</p>

<h4> MAGNETIC FIELD AROUND A WIRE</h4>
<ul>
<li>A straight wire carrying current produces circular magnetic field lines</li>
<li>The direction is determined by the right-hand grip rule</li>
<li>Reversing current reverses magnetic field direction</li>
</ul>

<h4> SOLENOID (COIL OF WIRE)</h4>
<ul>
<li>A solenoid is a long coil of wire</li>
<li>It produces a strong and uniform magnetic field inside</li>
<li>It behaves like a bar magnet with north and south poles</li>
</ul>

<h4> ELECTROMAGNET</h4>
<ul>
<li>An electromagnet is a temporary magnet created using electric current</li>
<li>It becomes magnetic only when current flows</li>
<li>It uses a soft iron core to increase strength</li>
</ul>

<h4> FACTORS AFFECTING STRENGTH</h4>
<ul>
<li>Current: more current → stronger field</li>
<li>Number of turns: more turns → stronger field</li>
<li>Core material: soft iron increases strength</li>
</ul>

---

<h3> WORKED EXAMPLES (STEP BY STEP)</h3>

<h4> Example 1: Wire magnetic field</h4>
<ul>
<li>Step 1: Current flows in straight wire</li>
<li>Step 2: Magnetic field forms around wire</li>
<li>Step 3: Field lines are circular</li>
</ul>
<p><b>Answer:</b> A circular magnetic field is produced around the wire.</p>

<h4> Example 2: Solenoid strength</h4>
<ul>
<li>Step 1: Coil has many turns</li>
<li>Step 2: Fields from each turn combine</li>
<li>Step 3: Strong magnetic field forms</li>
</ul>
<p><b>Answer:</b> A solenoid produces a stronger magnetic field than a single wire.</p>

<h4> Example 3: Electromagnet in crane</h4>
<ul>
<li>Step 1: Current is switched on</li>
<li>Step 2: Magnet attracts iron scrap</li>
<li>Step 3: Current is switched off</li>
<li>Step 4: Scrap is released</li>
</ul>
<p><b>Answer:</b> The electromagnet can pick and release metals using current control.</p>

---

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing electromagnets with permanent magnets</li>
<li>Thinking magnetism exists without current in electromagnets</li>
<li>Forgetting that field direction depends on current direction</li>
<li>Assuming one wire is stronger than a coil (it is weaker)</li>
</ul>

---

<h3> REAL WORLD APPLICATIONS</h3>
<ul>
<li>Electric cranes in scrapyards</li>
<li>Electric bells and buzzers</li>
<li>Speakers and headphones</li>
<li>Electric motors</li>
<li>Magnetic relays in circuits</li>
</ul>

<h3> WORKED CALCULATION-STYLE QUESTIONS</h3>

<h4> Example 1</h4>
<p>A coil has 10 turns. If turns are increased to 20, what happens?</p>
<ul>
<li>Step 1: Compare turns</li>
<li>Step 2: 20 > 10</li>
<li>Step 3: Magnetic field increases</li>
</ul>
<p><b>Answer:</b> Magnetic field becomes stronger.</p>

<h4> Example 2</h4>
<p>Current in a coil is increased from 2A to 4A.</p>
<ul>
<li>Step 1: Current doubles</li>
<li>Step 2: Magnetic field depends on current</li>
<li>Step 3: Field strength increases</li>
</ul>
<p><b>Answer:</b> Magnetic field increases.</p>

---

<h3> KEY FACTS</h3>
<ul>
<li>Electric current produces magnetism</li>
<li>Magnetism disappears when current stops</li>
<li>Coils strengthen magnetic fields</li>
<li>Soft iron increases electromagnet strength</li>
<li>Electromagnets are controllable</li>
</ul>
`,
  [
    {
      type: "written",
      q: "What is electromagnetism?",
      hint: "electricity + magnetism",
      ans: "Electromagnetism is the relationship between electric current and magnetic fields.",
      explanation:
        "Electric current produces a magnetic field around a conductor, showing the link between electricity and magnetism.",
    },

    {
      type: "written",
      q: "What happens when current flows in a wire?",
      hint: "magnetic field forms",
      ans: "A magnetic field is produced around the wire.",
      explanation:
        "Moving electric charges (current) generate a magnetic field around the conductor.",
    },

    {
      type: "written",
      q: "Why is a solenoid stronger than a straight wire?",
      hint: "many loops",
      ans: "Because magnetic fields from each coil turn combine.",
      explanation:
        "Each loop produces a magnetic field and they add together, making the overall field stronger.",
    },

    {
      type: "written",
      q: "How do you increase the strength of an electromagnet?",
      hint: "current, turns, core",
      ans: "Increase current, increase number of coil turns, and use a soft iron core.",
      explanation:
        "All these factors increase the strength of the magnetic field produced.",
    },

    {
      type: "written",
      q: "What is the role of a soft iron core in an electromagnet?",
      hint: "magnetic enhancement",
      ans: "It increases the strength of the magnetic field.",
      explanation:
        "Soft iron becomes magnetized easily and concentrates magnetic field lines.",
    },

    {
      type: "written",
      q: "Why does reversing current reverse magnetic field direction?",
      hint: "direction of charge flow",
      ans: "Because magnetic field direction depends on current direction.",
      explanation:
        "Changing current direction changes the motion of charges, reversing the field.",
    },

    {
      type: "written",
      q: "What is produced around a current-carrying conductor?",
      hint: "invisible force field",
      ans: "A magnetic field.",
      explanation:
        "Electric current generates a circular magnetic field around the conductor.",
    },

    {
      type: "written",
      q: "Why do electromagnets stop working when current is switched off?",
      hint: "temporary magnet",
      ans: "Because the magnetic field depends on electric current.",
      explanation:
        "Without current, moving charges stop, so the magnetic field disappears.",
    },
  ],
);
/*==============================================
Ohm's laws
==============================================*/
add(
  "physics",
  "em",
  "Ohm’s Law",
  `<h2> Ohm’s Law</h2>
<hr>

<h3> WELL ARRANGED NOTES</h3>

<h4> Definition</h4>
<p>
Ohm’s Law states that the current flowing through a conductor is directly proportional to the potential difference across it, provided temperature and physical conditions remain constant.
</p>

<h4> Main Law</h4>
<div class="formula">
V = IR
</div>

<ul>
<li>V = Voltage (V)</li>
<li>I = Current (A)</li>
<li>R = Resistance (Ω)</li>
</ul>

<h4> Key Idea</h4>
<ul>
<li>Increase voltage → current increases</li>
<li>Increase resistance → current decreases</li>
</ul>

<h4> Physical Meaning</h4>
<p>
Voltage pushes current, while resistance opposes it.
</p>

<hr>

<h3> WORKED EXAMPLES</h3>

<div class="example-box">
<b>Example 1:</b><br>
V = 12V, I = 3A<br><br>
Step 1: Use V = IR<br>
Step 2: R = V/I<br>
Step 3: R = 12/3<br>
<b>Answer: 4 Ω</b>
</div>

<div class="example-box">
<b>Example 2:</b><br>
V = 10V, R = 5Ω<br><br>
Step 1: Use V = IR<br>
Step 2: I = V/R<br>
Step 3: I = 10/5<br>
<b>Answer: 2 A</b>
</div>

<div class="example-box">
<b>Example 3:</b><br>
I = 4A, R = 2Ω<br><br>
Step 1: Use V = IR<br>
Step 2: V = 4 × 2<br>
<b>Answer: 8 V</b>
</div>

<hr>

<h3> COMMON MISTAKES</h3>
<ul>
<li>Confusing current (I) with voltage (V)</li>
<li>Using wrong formula rearrangement</li>
<li>Forgetting units (Ω, A, V)</li>
<li>Assuming all materials obey Ohm’s Law</li>
<li>Ignoring temperature effect</li>
</ul>

<hr>

<h3> REAL WORLD APPLICATIONS</h3>
<ul>
<li>Electric heaters (control current using resistance)</li>
<li>House wiring safety design</li>
<li>Fuses and circuit breakers</li>
<li>Electronic devices (resistor circuits)</li>
</ul>

<hr>

<h3> QUESTIONS (WITH HINTS, ANSWERS & EXPLANATIONS)</h3>

<div class="example-box">
<b>Q1:</b> What is Ohm’s Law?<br>
<b>Hint:</b> relationship between V and I<br>
<b>Answer:</b> Current is directly proportional to voltage at constant temperature<br>
<b>Explanation:</b> Increasing voltage increases current if resistance is constant
</div>

<div class="example-box">
<b>Q2:</b> A voltage of 20V produces a current of 5A. Find resistance.<br>
<b>Hint:</b> use V = IR<br>
<b>Step:</b> R = V/I = 20/5<br>
<b>Answer:</b> 4 Ω<br>
<b>Explanation:</b> Resistance is opposition to current flow
</div>

<div class="example-box">
<b>Q3:</b> What happens if resistance increases?<br>
<b>Hint:</b> think current<br>
<b>Answer:</b> Current decreases<br>
<b>Explanation:</b> Higher resistance reduces flow of electrons
</div>

<div class="example-box">
<b>Q4:</b> Why is temperature important in Ohm’s Law?<br>
<b>Hint:</b> particle movement<br>
<b>Answer:</b> Because resistance changes with temperature<br>
<b>Explanation:</b> Higher temperature increases vibration of atoms, increasing resistance
</div>

<hr>

<h3> V–I GRAPH INSIGHT</h3>
<ul>
<li>Straight line → Ohmic conductor</li>
<li>Gradient = resistance</li>
<li>Curved line → non-ohmic material</li>
</ul>

<hr>

<h3> KEY FACTS</h3>
<ul>
<li>V = IR is the core formula</li>
<li>Resistance opposes current flow</li>
<li>Current depends on voltage and resistance</li>
<li>Ohmic materials have constant resistance</li>
</ul>
`,
  [
    {
      type: "calc",
      q: "A voltage of 20V produces a current of 5A. Find resistance.",
      ans: "4Ω",
      sol: "R = V/I = 20/5 = 4Ω",
    },
    {
      type: "calc",
      q: "Find current if V = 12V and R = 3Ω",
      ans: "4A",
      sol: "I = V/R = 12/3 = 4A",
    },
    {
      type: "written",
      q: "State Ohm’s Law",
      ans: "Current is directly proportional to voltage at constant temperature",
    },
  ],
);
/* =========================================================
   PHYSICS MODULE: FLUIDS + MODERN PHYSICS (ADVANCED)
========================================================= */

/* =========================
   1. FLUIDS
========================= */
add(
  "physics",
  "fluids",
  "Fluids",
  `<h2> Fluids</h2>
<h3> WELL DETAILED NOTES</h3>
<p>
Fluids are substances that can flow and take the shape of their container. They include both liquids and gases.
Unlike solids, fluids do not have a fixed shape because their particles are free to move past each other.
</p>

<p>
Fluids are essential in everyday life: air is a gas fluid, water is a liquid fluid, and even blood is considered a fluid in the human body.
</p>

<h3> KEY CONCEPTS OF FLUIDS</h3>
<ul>
<li><b>Density (ρ):</b> Mass per unit volume (ρ = m/V)</li>
<li><b>Pressure (P):</b> Force per unit area (P = F/A)</li>
<li><b>Upthrust:</b> Upward force exerted by a fluid on a body</li>
<li><b>Buoyancy:</b> Ability of a fluid to support floating objects</li>
<li><b>Viscosity:</b> Resistance of a fluid to flow (honey has high viscosity)</li>
</ul>

<h3> IMPORTANT FORMULAS</h3>


<ul>
<li>ρ = density (kg/m³)</li>
<li>g = gravitational field strength (9.8 m/s²)</li>
<li>h = height of fluid column (m)</li>
</ul>

<h3> FLUID PRESSURE IDEA</h3>


<h3> FLOW DIAGRAM</h3>


<h3> WORKED OUT CALCULATIONS</h3>

<h4>Example 1: Pressure in a fluid</h4>
<p>Calculate pressure at a depth of 5 m in water (ρ = 1000 kg/m³, g = 9.8 m/s²).</p>



<p><b>Answer:</b> 49,000 Pa</p>

<h4>Example 2: Density calculation</h4>
<p>A substance has mass 2 kg and volume 0.5 m³. Find density.</p>



<p><b>Answer:</b> 4 kg/m³</p>

<h4>Example 3: Pressure from force</h4>
<p>A force of 200 N acts on an area of 4 m². Find pressure.</p>



<p><b>Answer:</b> 50 Pa</p>

<h3> ARCHIMEDES’ PRINCIPLE (BASIC IDEA)</h3>
<ul>
<li>When an object is placed in a fluid, it experiences an upward force</li>
<li>This force is equal to the weight of fluid displaced</li>
</ul>

<h3> REAL-LIFE APPLICATIONS</h3>
<ul>
<li>Ships floating in water (buoyancy)</li>
<li>Hydraulic systems (brakes, lifts)</li>
<li>Blood circulation in the human body</li>
<li>Aircraft lift due to air pressure differences</li>
<li>Swimming and diving physics</li>
</ul>
`,
  [
    {
      q: "Why do ships float on water?",
      steps: [
        "Step 1: Identify upthrust",
        "Step 2: Compare weight and buoyant force",
        "Step 3: Determine floating condition",
      ],
      ans: "Ships float because water provides enough upthrust to balance their weight",
      why: "Upthrust supports heavy objects",
    },
  ],
  [
    {
      q: "A force of 200N acts on an area of 4m². Calculate pressure.",
      hint: "Pressure = Force ÷ Area",
      steps: [
        "Step 1: Write formula P = F / A",
        "Step 2: Substitute values 200 ÷ 4",
        "Step 3: Solve",
      ],
      ans: "50 Pa",
      why: "Pressure is force per unit area",
    },
  ],
);

/* =========================
   2. MODERN PHYSICS
========================= */
add(
  "physics",
  "modern_physics",
  "Modern Physics",
  `<h2> Modern Physics</h2>
<h3> WELL DETAILED NOTES</h3>
<p>
Modern physics is the branch of physics that studies matter and energy at atomic and subatomic levels.
It emerged when classical physics could not explain phenomena such as blackbody radiation, atomic spectra, and radioactivity.
</p>

<p>
It focuses on the internal structure of atoms, the nucleus, and how energy is released or absorbed in very small systems.
</p>

<h3> KEY AREAS OF MODERN PHYSICS</h3>
<ul>
<li><b>Atomic structure:</b> electrons, nucleus, energy levels</li>
<li><b>Radioactivity:</b> spontaneous emission of radiation from unstable nuclei</li>
<li><b>Nuclear reactions:</b> changes in the nucleus (fission and fusion)</li>
<li><b>Quantum physics:</b> energy is quantized (comes in packets)</li>
</ul>

<h3> ATOMIC MODEL FLOW</h3>


<h3> TYPES OF RADIATION</h3>
<ul>
<li><b>Alpha (α):</b> helium nucleus, low penetration, stopped by paper</li>
<li><b>Beta (β):</b> fast electrons, medium penetration</li>
<li><b>Gamma (γ):</b> electromagnetic waves, very high penetration</li>
</ul>

<h3> NUCLEAR REACTIONS</h3>

<h4> Nuclear Fission</h4>
<ul>
<li>Heavy nucleus splits into smaller nuclei</li>
<li>Releases large amount of energy</li>
<li>Used in nuclear power plants</li>
</ul>



<h4> Nuclear Fusion</h4>
<ul>
<li>Two light nuclei combine</li>
<li>Produces even more energy than fission</li>
<li>Occurs in the sun and stars</li>
</ul>



<h3> WORKED EXAMPLES</h3>

<h4>Example 1: Identify radiation type</h4>
<p>A radiation is stopped by paper but strongly ionizing. What is it?</p>



<p><b>Answer:</b> Alpha radiation</p>

<h4>Example 2: Compare fission and fusion</h4>


<p><b>Answer:</b> Fission splits atoms, fusion joins atoms</p>

<h3> REAL-LIFE APPLICATIONS</h3>
<ul>
<li>Nuclear power plants (electricity generation)</li>
<li>Medical imaging (X-rays, PET scans)</li>
<li>Cancer radiotherapy</li>
<li>Energy production in stars (fusion)</li>
<li>Smoke detectors (radioactive sources)</li>
</ul>
`,
  [
    {
      q: "What is radioactivity?",
      steps: [
        "Step 1: Identify unstable nucleus",
        "Step 2: Check emission of particles",
        "Step 3: Define process",
      ],
      ans: "Radioactivity is the spontaneous emission of radiation from an unstable nucleus",
      why: "Unstable atoms release energy to become stable",
    },
  ],
  [
    {
      q: "Name two applications of modern physics",
      hint: "think medicine and energy",
      steps: ["Step 1: Identify medical use", "Step 2: Identify energy use"],
      ans: "X-ray imaging and nuclear power generation",
      why: "Both rely on atomic and nuclear processes",
    },
  ],
);

/* =========================
   3. CATHODE RAYS & CRT
========================= */
add(
  "physics",
  "cathode_rays",
  "Cathode Rays and Cathode Ray Tube",
  `<h2> Cathode Rays & Cathode Ray Tube (CRT)</h2>
<h3> WELL DETAILED NOTES</h3>
<p>
Cathode rays are streams of high-speed electrons emitted from the cathode (negative electrode) in a vacuum tube when a high voltage is applied.
They travel in straight lines toward the anode (positive electrode).
</p>

<p>
Because they are made of electrons, cathode rays carry a negative charge and can be influenced by electric and magnetic fields.
</p>

<p>
In a Cathode Ray Tube (CRT), electrons are accelerated through a potential difference, gaining kinetic energy which allows them to produce visible light when they strike a fluorescent screen.
</p>

<h3> PRODUCTION OF CATHODE RAYS</h3>
<ul>
<li>A high voltage (potential difference) is applied across electrodes in a vacuum tube</li>
<li>The cathode emits electrons</li>
<li>Electrons are accelerated towards the anode</li>
<li>A narrow beam of electrons (cathode ray beam) is formed</li>
</ul>

<h3> KEY PHYSICS RELATIONSHIPS</h3>
<ul>
<li>Electric potential energy converts to kinetic energy</li>
<li>Energy gained by electron: E = eV</li>
<li>Kinetic energy: KE = ½mv²</li>
</ul>

<h3> IMPORTANT FORMULAS</h3>


<ul>
<li>e = charge of electron = 1.6 × 10⁻¹⁹ C</li>
<li>V = potential difference (volts)</li>
<li>m = mass of electron = 9.11 × 10⁻³¹ kg</li>
</ul>

<h3> CATHODE RAY TUBE STRUCTURE</h3>


<h3> WORKED OUT CALCULATIONS</h3>

<h4>Example 1: Energy gained by an electron</h4>
<p>An electron is accelerated through a potential difference of 200 V. Find the energy gained.</p>



<p><b>Answer:</b> 3.2 × 10⁻¹⁷ J</p>

<h4>Example 2: Speed of electron</h4>
<p>An electron is accelerated through 100 V. Calculate its speed.</p>



<p><b>Answer:</b> 5.9 × 10⁶ m/s</p>

<h3> KEY OBSERVATIONS</h3>
<ul>
<li>Beam is visible when it hits fluorescent screen</li>
<li>Beam bends in electric field (towards positive plate)</li>
<li>Beam bends in magnetic field</li>
<li>Higher voltage → faster electrons</li>
</ul>

<h3> EXAMPLE CONCEPT QUESTIONS</h3>

<h4>Why does increasing voltage increase electron speed?</h4>
<ul>
<li>Step 1: Voltage increases energy (E = eV)</li>
<li>Step 2: More energy becomes kinetic energy</li>
<li>Step 3: Higher KE means higher speed</li>
</ul>

<p><b>Answer:</b> Because increasing potential difference increases kinetic energy of electrons, making them move faster.</p>

<h3> REAL-LIFE APPLICATIONS</h3>
<ul>
<li>Old CRT televisions</li>
<li>Computer monitors</li>
<li>Oscilloscopes</li>
<li>Electron beam experiments</li>
</ul>
`,
  [
    {
      q: "What are cathode rays?",
      steps: [
        "Step 1: Identify source (cathode)",
        "Step 2: Identify nature (electrons)",
        "Step 3: Define motion",
      ],
      ans: "Cathode rays are streams of electrons moving from the cathode to the anode in a vacuum tube",
      why: "They are fundamental particles in electric discharge",
    },
  ],
  [
    {
      q: "Why are cathode rays deflected in electric fields?",
      hint: "charge property",
      steps: [
        "Step 1: Identify charge of rays",
        "Step 2: Apply electric field interaction",
        "Step 3: Explain deflection",
      ],
      ans: "Because cathode rays are negatively charged electrons",
      why: "Charged particles respond to electric fields",
    },
  ],
);

/* =========================
   4. PHOTOELECTRIC EMISSION
========================= */
add(
  "physics",
  "photoelectric_emission",
  "Photoelectric Emission",
  `<h2> Photoelectric Emission</h2>
<h3> WELL DETAILED NOTES</h3>
<p>
Photoelectric emission is the emission of electrons from a metal surface when electromagnetic radiation (light) of sufficiently high frequency strikes it.
These emitted electrons are called <b>photoelectrons</b>.
</p>
<p>
This phenomenon provided strong evidence that light behaves as particles called <b>photons</b>, each carrying discrete energy.
</p>
<h3> KEY CONCEPTS</h3>
<ul>
<li><b>Photon:</b> A packet of light energy</li>
<li><b>Work function (φ):</b> Minimum energy required to remove an electron from a metal surface</li>
<li><b>Threshold frequency (f₀):</b> Minimum frequency required to cause emission</li>
<li><b>Intensity:</b> Affects number of emitted electrons, not their energy</li>
</ul>
<h3> EINSTEIN’S PHOTOELECTRIC EQUATION</h3>

<ul>
<li>E = photon energy</li>
<li>h = Planck’s constant (6.63 × 10⁻³⁴ J·s)</li>
<li>f = frequency of light</li>
<li>φ = work function</li>
<li>KE(max) = maximum kinetic energy of emitted electrons</li>
</ul>
<h3> CONDITIONS FOR EMISSION</h3>
<ul>
<li>Light frequency must be ≥ threshold frequency</li>
<li>If f < f₀ → no electrons emitted, no matter how intense the light is</li>
</ul>
<h3> PROCESS DIAGRAM</h3>

<h3> WORKED EXAMPLES</h3>
<h4>Example 1: Photon Energy</h4>
<p>Calculate energy of a photon of frequency 5 × 10¹⁴ Hz</p>

<p><b>Answer:</b> 3.315 × 10⁻¹⁹ J</p>
<h4>Example 2: Photoelectron Kinetic Energy</h4>
<p>A metal has work function 2.0 × 10⁻¹⁹ J. Light of energy 5.0 × 10⁻¹⁹ J is incident. Find KE(max).</p>

<p><b>Answer:</b> 3.0 × 10⁻¹⁹ J</p>
<h3> REAL-LIFE APPLICATIONS</h3>
<ul>
<li>Solar panels (conversion of light to electricity)</li>
<li>Automatic door sensors</li>
<li>Camera light detectors</li>
<li>Night vision devices</li>
</ul>
`,
  [
    {
      q: "What is photoelectric emission?",
      steps: [
        "Step 1: Identify light source",
        "Step 2: Identify electron emission",
        "Step 3: Define process",
      ],
      ans: "Photoelectric emission is the emission of electrons from a metal surface when light of sufficient frequency falls on it",
      why: "Light transfers energy to electrons",
    },
  ],
  [
    {
      q: "What is threshold frequency?",
      steps: [
        "Step 1: Identify minimum energy requirement",
        "Step 2: Link to electron emission",
        "Step 3: Define concept",
      ],
      ans: "Threshold frequency is the minimum frequency of light required to eject electrons from a metal surface",
      why: "Below this frequency, no emission occurs",
    },
  ],
);
