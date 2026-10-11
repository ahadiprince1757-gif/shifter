
/* =========================================================
   BATCH 1 — FORCE, MOTION AND MECHANICS
   10 screens | 5 diagnostic questions per screen
   ========================================================= */


/* ---------------------------------------------------------
   SCREEN 1: MEANING OF FORCE
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Meaning of Force",
  `
  <h2>Meaning of Force</h2>

  <h3>Foundation Understanding</h3>
  <p>A <b>force</b> is a push or pull arising from an interaction between objects. A force can change an object's state of motion, its direction of movement, or its shape.</p>

  <div class="keyfact">
    KEY IDEA: A force can change motion or deform an object. An object does not have to move whenever a force acts on it.
  </div>

  <h3>What Can a Force Do?</h3>
  <ul>
    <li>Start an object moving.</li>
    <li>Stop a moving object.</li>
    <li>Increase or decrease its speed.</li>
    <li>Change its direction of motion.</li>
    <li>Change its shape or size.</li>
  </ul>

  <h3>Force as a Vector Quantity</h3>
  <p>Force is a <b>vector quantity</b> because both its magnitude and direction matter. A force of 10 N east is different from a force of 10 N west.</p>

  <h3>Unit and Measurement</h3>
  <p>The SI unit of force is the <b>newton (N)</b>. A force can be measured using a calibrated spring balance or force meter.</p>

  <div class="formula">
    1 N = 1 kg m/s²
  </div>
  <p>This means that a net force of 1 N produces an acceleration of 1 m/s² in a mass of 1 kg.</p>

  <h3>Representing a Force</h3>
  <p>A force can be represented by an arrow. The arrow points in the direction of the force, while its length can represent the force's magnitude using a chosen scale.</p>

  <h3>Worked Example 1: Changing Motion</h3>
  <div class="example-box">
    A stationary football is kicked and begins moving.

    <br/><br/><b>Step 1:</b> Identify the initial state. The football is stationary.

    <br/><br/><b>Step 2:</b> Identify the interaction. The player's foot exerts a force on the football.

    <br/><br/><b>Step 3:</b> Identify the effect. The football changes from rest to motion.

    <br/><br/><b>Answer:</b> The force changes the football's state of motion.
  </div>

  <h3>Worked Example 2: Changing Shape</h3>
  <div class="example-box">
    A student squeezes a soft sponge.

    <br/><br/><b>Step 1:</b> The student's hands exert forces on the sponge.

    <br/><br/><b>Step 2:</b> The sponge changes shape under the applied forces.

    <br/><br/><b>Answer:</b> The force deforms the sponge.
  </div>

  <h3>Important Distinction</h3>
  <p>A force can act without producing a change in motion. For example, a book resting on a table experiences gravity downward and an upward supporting force from the table. These forces balance, so the book remains at rest.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Assuming every force must make an object move.</li>
    <li>Thinking force has magnitude but no direction.</li>
    <li>Confusing the unit of force (newton) with the unit of mass (kilogram).</li>
  </ul>
  `,
  [
    {
      q: "What is a force?",
      hint: "Think of an interaction involving a push or pull.",
      ans: "A force is a push or pull arising from an interaction between objects.",
      explanation: "Forces can change motion or deform objects."
    },
    {
      q: "State three possible effects of a force.",
      hint: "Consider speed, direction and shape.",
      ans: "A force can change speed, change direction, or change an object's shape.",
      explanation: "These are distinct effects; a force need not produce all of them."
    },
    {
      q: "What is the SI unit of force?",
      hint: "It is named after a scientist.",
      ans: "The newton (N).",
      explanation: "Force is measured in newtons, not kilograms."
    },
    {
      q: "Why is force described as a vector quantity?",
      hint: "What two pieces of information describe a force?",
      ans: "Because force has both magnitude and direction.",
      explanation: "Equal forces in opposite directions have different vector directions."
    },
    {
      q: "A student pushes a heavy wall, but it does not move. Does this prove that no force was applied?",
      hint: "Separate the presence of a force from the resulting motion.",
      ans: "No. The student applies a force, but the wall does not move because the forces and constraints prevent a change in its motion.",
      explanation: "A force can act without producing motion when the overall conditions prevent movement."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 2: TYPES OF FORCES
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Types of Forces",
  `
  <h2>Types of Forces</h2>

  <h3>Foundation Understanding</h3>
  <p>Different interactions produce different forces. Recognising the type of force helps explain why an object falls, moves through water, stretches a spring, or slows down.</p>

  <div class="keyfact">
    KEY IDEA: Identify a force by the physical interaction or effect that produces it, not merely by the object experiencing it.
  </div>

  <h3>Important Types of Force</h3>
  <ul>
    <li><b>Gravitational force:</b> attraction between objects with mass. Near Earth, it pulls objects toward Earth's centre.</li>
    <li><b>Friction:</b> a force that opposes relative motion or attempted motion between surfaces in contact.</li>
    <li><b>Air resistance:</b> a force exerted by air that opposes an object's motion relative to the air.</li>
    <li><b>Tension:</b> a pulling force transmitted through a taut string, rope or cable.</li>
    <li><b>Normal contact force:</b> the supporting force exerted by a surface, perpendicular to that surface.</li>
    <li><b>Upthrust:</b> the upward force exerted by a fluid on an immersed or floating object.</li>
    <li><b>Elastic or spring force:</b> a restoring force produced when an elastic object is stretched or compressed.</li>
    <li><b>Magnetic force:</b> a force associated with magnets and magnetic fields.</li>
    <li><b>Electrostatic force:</b> attraction or repulsion between electrically charged objects.</li>
  </ul>

  <h3>Worked Example 1: A Hanging Bucket</h3>
  <div class="example-box">
    A bucket hangs motionless from a rope.

    <br/><br/><b>Step 1:</b> Earth attracts the bucket downward. This is gravitational force.

    <br/><br/><b>Step 2:</b> The taut rope pulls the bucket upward. This is tension.

    <br/><br/><b>Step 3:</b> Since the bucket remains at rest, the upward and downward forces balance.

    <br/><br/><b>Answer:</b> The forces are gravity and tension.
  </div>

  <h3>Worked Example 2: A Moving Bicycle</h3>
  <div class="example-box">
    A bicycle slows down when its rider stops pedalling.

    <br/><br/><b>Step 1:</b> Identify the change: the bicycle's speed decreases.

    <br/><br/><b>Step 2:</b> Identify forces opposing its motion: friction and air resistance.

    <br/><br/><b>Answer:</b> Friction and air resistance contribute to slowing the bicycle.
  </div>

  <h3>How to Identify a Force</h3>
  <ul>
    <li>Ask what interaction produces it.</li>
    <li>Determine the direction in which it acts.</li>
    <li>Distinguish the force from the motion it may cause.</li>
  </ul>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Calling every upward force upthrust, even when it is a solid surface supporting an object.</li>
    <li>Confusing tension in a rope with the force of gravity.</li>
    <li>Assuming friction always opposes an object's overall direction of travel; it opposes relative slipping or its tendency.</li>
  </ul>
  `,
  [
    {
      q: "What force pulls an unsupported object toward Earth?",
      hint: "It acts because Earth and the object have mass.",
      ans: "Gravitational force.",
      explanation: "Earth's gravity attracts the object toward Earth's centre."
    },
    {
      q: "What force is transmitted through a taut rope supporting a hanging bucket?",
      hint: "It is a pulling force in the rope.",
      ans: "Tension.",
      explanation: "A taut rope transmits tension along its length."
    },
    {
      q: "Name the force exerted perpendicular to a table by a book resting on it.",
      hint: "It is the table's supporting contact force.",
      ans: "Normal contact force.",
      explanation: "The normal force acts perpendicular to the contact surface."
    },
    {
      q: "Which two forces commonly oppose a moving bicycle through contact with surfaces and movement through air?",
      hint: "One acts between surfaces; the other is exerted by air.",
      ans: "Friction and air resistance.",
      explanation: "Both can oppose the bicycle's motion relative to its surroundings."
    },
    {
      q: "A magnet attracts an iron nail without touching it. What type of force is responsible?",
      hint: "Identify the interaction produced by the magnet.",
      ans: "Magnetic force.",
      explanation: "Magnetic forces can act across a gap."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 3: CONTACT AND NON-CONTACT FORCES
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Contact and Non-contact Forces",
  `
  <h2>Contact and Non-contact Forces</h2>

  <h3>Foundation Understanding</h3>
  <p>Forces can be classified according to whether the interacting objects must physically touch to exert the force.</p>

  <div class="keyfact">
    KEY IDEA: Contact forces require physical contact between interacting objects. Non-contact forces can act across a gap.
  </div>

  <h3>1. Contact Forces</h3>
  <p>A contact force occurs when interacting objects physically touch. Examples include:</p>
  <ul>
    <li><b>Friction:</b> acts between contacting surfaces.</li>
    <li><b>Normal force:</b> a surface supports an object touching it.</li>
    <li><b>Tension:</b> a taut rope or string pulls an attached object.</li>
    <li><b>Air resistance:</b> air interacts with an object moving relative to it.</li>
    <li><b>Upthrust:</b> a liquid or gas exerts a force on an object in contact with the fluid.</li>
    <li><b>Spring force:</b> an elastic spring exerts a force through contact with an attached object.</li>
  </ul>

  <h3>2. Non-contact Forces</h3>
  <p>A non-contact force acts without direct physical contact between the objects producing and experiencing the force.</p>
  <ul>
    <li><b>Gravitational force:</b> Earth attracts a falling stone.</li>
    <li><b>Magnetic force:</b> a magnet attracts a suitable magnetic material across a gap.</li>
    <li><b>Electrostatic force:</b> charged objects attract or repel one another across a gap.</li>
  </ul>

  <h3>Worked Example 1: A Falling Stone</h3>
  <div class="example-box">
    A stone falls toward the ground.

    <br/><br/><b>Step 1:</b> Identify the force pulling the stone toward Earth: gravity.

    <br/><br/><b>Step 2:</b> The stone does not need to touch Earth for gravity to act.

    <br/><br/><b>Answer:</b> Gravity is a non-contact force.
  </div>

  <h3>Worked Example 2: A Box on a Floor</h3>
  <div class="example-box">
    A box rests on a floor.

    <br/><br/><b>Step 1:</b> The floor physically touches the box.

    <br/><br/><b>Step 2:</b> The floor exerts a supporting force on the box.

    <br/><br/><b>Answer:</b> The normal contact force is a contact force.
  </div>

  <h3>Worked Example 3: A Charged Comb</h3>
  <div class="example-box">
    A charged comb attracts small pieces of paper without touching them.

    <br/><br/><b>Step 1:</b> There is a gap between the comb and paper.

    <br/><br/><b>Step 2:</b> The attraction is electrostatic.

    <br/><br/><b>Answer:</b> The electrostatic force is non-contact.
  </div>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Thinking gravity requires an object to touch Earth.</li>
    <li>Classifying a force by whether the object is moving rather than whether contact is required.</li>
    <li>Assuming all forces are contact forces because they produce observable effects.</li>
  </ul>
  `,
  [
    {
      q: "Classify gravitational force as contact or non-contact.",
      hint: "Does gravity require the objects to touch?",
      ans: "Non-contact force.",
      explanation: "Gravity acts between objects with mass even when separated."
    },
    {
      q: "A table supports a book resting on it. Is the table's normal force a contact or non-contact force?",
      hint: "Consider whether the table touches the book.",
      ans: "Contact force.",
      explanation: "The supporting force is exerted through direct contact."
    },
    {
      q: "A magnet attracts an iron nail across a small gap. Classify the force.",
      hint: "The nail and magnet are not touching.",
      ans: "Non-contact magnetic force.",
      explanation: "Magnetic interactions can act across a gap."
    },
    {
      q: "Why is air resistance classified as a contact force?",
      hint: "Think about the interaction between air particles and the object.",
      ans: "Air particles interact with the object's surface.",
      explanation: "The force arises from interactions between the air and the object."
    },
    {
      q: "A charged ruler attracts a nearby charged object without touching it. Which category describes the electrostatic force?",
      hint: "Focus on whether direct contact is required.",
      ans: "Non-contact force.",
      explanation: "Electrostatic forces can act between separated charged objects."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 4: EFFECTS OF FORCE
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Effects of Force",
  `
  <h2>Effects of Force</h2>

  <h3>Foundation Understanding</h3>
  <p>A force can change how an object moves or change its shape. The effect depends on the forces acting, the object's properties, and the circumstances of the interaction.</p>

  <div class="keyfact">
    KEY IDEA: Look for a change in speed, direction, or shape. A force may also help maintain a constrained situation without changing the object's motion.
  </div>

  <h3>Effect 1: Starting or Stopping Motion</h3>
  <p>A force can set a stationary object in motion or bring a moving object to rest. For example, kicking a stationary ball starts it moving.</p>

  <h3>Effect 2: Changing Speed</h3>
  <p>A force in the direction of motion can increase speed when it produces a net force in that direction. A net force opposing motion can reduce speed.</p>

  <h3>Effect 3: Changing Direction</h3>
  <p>A force can change an object's direction even when its speed remains constant. For example, a force toward the centre of a circular path continually changes the direction of an object moving around that path.</p>

  <h3>Effect 4: Deformation</h3>
  <p><b>Deformation</b> is a change in shape or size. Stretching a spring, compressing a sponge, and bending a ruler are examples.</p>
  <ul>
    <li><b>Elastic deformation:</b> the object returns to its original shape when the deforming force is removed, provided its elastic limit has not been exceeded.</li>
    <li><b>Plastic deformation:</b> some permanent change remains after the force is removed.</li>
  </ul>

  <h3>Worked Example 1: A Moving Ball</h3>
  <div class="example-box">
    A player kicks a moving ball, causing it to travel in a different direction.

    <br/><br/><b>Step 1:</b> Compare the direction before and after the kick.

    <br/><br/><b>Step 2:</b> The direction changes because the kick exerts a force.

    <br/><br/><b>Answer:</b> The force changes the ball's direction of motion.
  </div>

  <h3>Worked Example 2: Stretching a Spring</h3>
  <div class="example-box">
    A spring extends when a load is attached.

    <br/><br/><b>Step 1:</b> The load exerts a pulling force on the spring.

    <br/><br/><b>Step 2:</b> The spring's length increases.

    <br/><br/><b>Step 3:</b> If it returns to its original length after unloading, the deformation was elastic.

    <br/><br/><b>Answer:</b> The force deforms the spring.
  </div>

  <h3>Important Distinction</h3>
  <p>Do not confuse a force with its effect. A force is an interaction; a change in motion or shape is a possible consequence. An object's motion changes when the forces acting on it do not balance.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Assuming a force can change speed but cannot change direction.</li>
    <li>Assuming all deformation is permanent.</li>
    <li>Assuming an object's motion must change whenever any single force acts.</li>
  </ul>
  `,
  [
    {
      q: "A stationary ball is kicked and starts moving. What effect of force is demonstrated?",
      hint: "Compare the ball's state before and after the kick.",
      ans: "The force starts the ball moving.",
      explanation: "The force changes the ball from rest to motion."
    },
    {
      q: "A moving car slows when its brakes are applied. What effect does the braking force produce?",
      hint: "Compare the car's initial and final speeds.",
      ans: "It decreases the car's speed.",
      explanation: "A net force opposing the motion reduces the car's speed."
    },
    {
      q: "Can a force change direction without changing speed?",
      hint: "Think about motion along a circular path.",
      ans: "Yes. A force can change the direction while the speed remains constant.",
      explanation: "Velocity includes direction, so a directional change is a change in motion."
    },
    {
      q: "A spring returns to its original length after a load is removed. What type of deformation occurred?",
      hint: "The original shape is recovered.",
      ans: "Elastic deformation.",
      explanation: "Elastic deformation is recoverable when the elastic limit has not been exceeded."
    },
    {
      q: "A force is removed from a bent metal strip, but it remains bent. What type of deformation is demonstrated?",
      hint: "The shape does not return to its original state.",
      ans: "Plastic deformation.",
      explanation: "Plastic deformation leaves a permanent change in shape."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 5: RESULTANT FORCE
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Resultant Force",
  `
  <h2>Resultant Force</h2>

  <h3>Foundation Understanding</h3>
  <p>An object may experience several forces at the same time. The <b>resultant force</b> is the single force that has the same overall effect on the object's motion as all the forces acting together.</p>

  <div class="keyfact">
    KEY IDEA: Forces in the same direction add. Forces in opposite directions subtract, and the resultant points in the direction of the larger force.
  </div>

  <h3>Forces in the Same Direction</h3>
  <p>When forces act along the same straight line in the same direction, their magnitudes add.</p>
  <div class="formula">
    Resultant force = F₁ + F₂
  </div>

  <h3>Worked Example 1: Same Direction</h3>
  <div class="example-box">
    Two students push a trolley to the right with forces of 12 N and 8 N.

    <br/><br/><b>Step 1:</b> Both forces act to the right.

    <br/><br/><b>Step 2:</b> Add their magnitudes: 12 + 8 = 20 N.

    <br/><br/><b>Answer:</b> Resultant force = 20 N to the right.
  </div>

  <h3>Forces in Opposite Directions</h3>
  <p>When two forces act along the same straight line in opposite directions, subtract the smaller magnitude from the larger magnitude.</p>
  <div class="formula">
    Resultant magnitude = Larger force − Smaller force
  </div>

  <h3>Worked Example 2: Opposite Directions</h3>
  <div class="example-box">
    A box is pulled rightward with 18 N and leftward with 11 N.

    <br/><br/><b>Step 1:</b> The forces oppose one another.

    <br/><br/><b>Step 2:</b> Calculate the difference: 18 − 11 = 7 N.

    <br/><br/><b>Step 3:</b> The larger force acts to the right.

    <br/><br/><b>Answer:</b> Resultant force = 7 N to the right.
  </div>

  <h3>Worked Example 3: More Than Two Forces</h3>
  <div class="example-box">
    Three horizontal forces act on a trolley: 15 N right, 9 N left and 4 N left.

    <br/><br/><b>Step 1:</b> Add rightward forces: 15 N.

    <br/><br/><b>Step 2:</b> Add leftward forces: 9 + 4 = 13 N.

    <br/><br/><b>Step 3:</b> Find the difference: 15 − 13 = 2 N.

    <br/><br/><b>Step 4:</b> The larger total is rightward.

    <br/><br/><b>Answer:</b> Resultant force = 2 N to the right.
  </div>

  <h3>Choosing a Positive Direction</h3>
  <p>You can choose right as positive and left as negative. Then add the signed forces algebraically. A positive result means rightward; a negative result means leftward. The choice of positive direction is arbitrary, but it must remain consistent.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Adding forces that act in opposite directions.</li>
    <li>Giving a magnitude without identifying the resultant's direction when direction is required.</li>
    <li>Confusing the resultant force with just one of the forces acting.</li>
  </ul>
  `,
  [
    {
      q: "Two forces of 7 N and 5 N act to the right. Find the resultant force.",
      hint: "Forces in the same direction add.",
      steps: ["Add the forces: 7 + 5 = 12 N.", "Keep the common direction."],
      ans: "12 N to the right.",
      explanation: "Same-direction forces reinforce each other."
    },
    {
      q: "A box experiences 20 N to the left and 13 N to the right. Find the resultant force.",
      hint: "Subtract the smaller magnitude from the larger.",
      steps: ["Calculate 20 − 13 = 7 N.", "The larger force is leftward."],
      ans: "7 N to the left.",
      explanation: "The resultant follows the direction of the larger opposing force."
    },
    {
      q: "Two equal forces of 9 N act in opposite directions along the same line. Find the resultant.",
      hint: "Subtract the equal magnitudes.",
      ans: "0 N.",
      explanation: "The forces cancel because they are equal and opposite."
    },
    {
      q: "Forces of 14 N right, 6 N left and 3 N left act on an object. Find the resultant.",
      hint: "Add the forces in each direction first.",
      steps: ["Leftward total = 6 + 3 = 9 N.", "Difference = 14 − 9 = 5 N.", "The larger total is rightward."],
      ans: "5 N to the right.",
      explanation: "Combining forces by direction avoids sign errors."
    },
    {
      q: "A learner says the resultant of 4 N right and 10 N left is 14 N left. Identify the error and correct the answer.",
      hint: "Opposite forces do not add their magnitudes.",
      steps: ["Subtract: 10 − 4 = 6 N.", "Choose the direction of the larger force: left."],
      ans: "The learner added opposite forces. The correct resultant is 6 N to the left.",
      explanation: "Opposing forces partially cancel rather than reinforce."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 6: BALANCED AND UNBALANCED FORCES
   Subject: physics | Category: force
   --------------------------------------------------------- */

add(
  "physics",
  "force",
  "Balanced and Unbalanced Forces",
  `
  <h2>Balanced and Unbalanced Forces</h2>

  <h3>Foundation Understanding</h3>
  <p>Whether forces are balanced depends on their combined effect, not simply on how many forces act on an object.</p>

  <div class="keyfact">
    KEY IDEA: Balanced forces have a zero resultant. Unbalanced forces have a non-zero resultant.
  </div>

  <h3>Balanced Forces</h3>
  <p>Forces are balanced when their vector sum is zero. The object's velocity does not change because of those forces.</p>
  <ul>
    <li>A stationary book can remain at rest.</li>
    <li>A moving object can continue in a straight line at constant speed.</li>
    <li>Forces can be balanced even when several forces act simultaneously.</li>
  </ul>

  <h3>Unbalanced Forces</h3>
  <p>Forces are unbalanced when their resultant is not zero. The object's velocity changes: it accelerates, which may mean speeding up, slowing down or changing direction.</p>

  <h3>Worked Example 1: A Book on a Table</h3>
  <div class="example-box">
    A book experiences 5 N downward due to gravity and 5 N upward from the table.

    <br/><br/><b>Step 1:</b> Identify opposite forces: 5 N up and 5 N down.

    <br/><br/><b>Step 2:</b> Find the resultant: 5 − 5 = 0 N.

    <br/><br/><b>Answer:</b> The vertical forces are balanced. The book remains at rest.
  </div>

  <h3>Worked Example 2: A Pulled Trolley</h3>
  <div class="example-box">
    A trolley experiences 16 N forward and 10 N backward.

    <br/><br/><b>Step 1:</b> Find the resultant: 16 − 10 = 6 N.

    <br/><br/><b>Step 2:</b> The resultant is forward and is not zero.

    <br/><br/><b>Answer:</b> The forces are unbalanced. The trolley accelerates forward.
  </div>

  <h3>Rest Is Not the Same as Balanced</h3>
  <p>An object at rest is not necessarily free of forces. A table supports a resting book while gravity pulls it downward. Likewise, a moving object does not automatically have unbalanced forces: constant-velocity motion is possible with zero resultant force.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Thinking balanced forces mean no forces act.</li>
    <li>Thinking a moving object must have an unbalanced force in its direction of motion.</li>
    <li>Thinking an unbalanced force always makes an object speed up; it can also slow or redirect it.</li>
  </ul>
  `,
  [
    {
      q: "An object experiences 12 N upward and 12 N downward. Are these forces balanced?",
      hint: "Calculate the resultant.",
      ans: "Yes. The resultant is 0 N.",
      explanation: "Equal and opposite forces cancel."
    },
    {
      q: "A trolley experiences 25 N right and 9 N left. Are the forces balanced?",
      hint: "Find the difference between opposing forces.",
      steps: ["25 − 9 = 16 N.", "The resultant is not zero."],
      ans: "No. The forces are unbalanced; the resultant is 16 N right.",
      explanation: "A non-zero resultant means the velocity changes."
    },
    {
      q: "A car moves straight at constant speed. What is the resultant force on it?",
      hint: "Its velocity is unchanged.",
      ans: "The resultant force is zero.",
      explanation: "Constant velocity means zero acceleration and therefore zero resultant force."
    },
    {
      q: "A stationary box has balanced forces acting on it. Does this mean that no forces act on the box?",
      hint: "Consider gravity and the floor's supporting force.",
      ans: "No. Forces can act and cancel, giving a zero resultant.",
      explanation: "Balanced forces are present but their vector sum is zero."
    },
    {
      q: "An object moves right but experiences a non-zero resultant force to the left. What happens to its velocity?",
      hint: "A force opposite to the motion changes the motion.",
      ans: "Its acceleration is to the left, so its rightward velocity decreases initially.",
      explanation: "The direction of acceleration is the direction of the resultant force, not necessarily the direction of travel."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 7: DESCRIBING POSITION AND MOTION
   Subject: physics | Category: motion
   --------------------------------------------------------- */

add(
  "physics",
  "motion",
  "Describing Position and Motion",
  `
  <h2>Describing Position and Motion</h2>

  <h3>Foundation Understanding</h3>
  <p>To describe where an object is and whether it moves, we compare its position with a chosen reference point or reference frame.</p>

  <div class="keyfact">
    KEY IDEA: Motion is a change in position relative to a reference point over time.
  </div>

  <h3>Position and Reference Points</h3>
  <p><b>Position</b> describes an object's location relative to a reference. For example, saying that a student is 4 m east of a classroom door gives a location and a direction relative to the door.</p>

  <h3>Describing Position in One Dimension</h3>
  <p>Choose an origin and a positive direction. If the door is at position 0 m and east is positive, a student 4 m east is at +4 m. A student 3 m west is at −3 m.</p>

  <div class="formula">
    Position = signed location relative to a chosen origin
  </div>

  <h3>Motion and Rest</h3>
  <ul>
    <li>An object is in motion relative to a reference when its position changes over time.</li>
    <li>An object is at rest relative to a reference when its position remains unchanged over time.</li>
  </ul>

  <h3>Motion Is Relative</h3>
  <p>A passenger sitting in a moving bus is at rest relative to the bus but moving relative to a person standing beside the road. Neither description is necessarily wrong: the reference frames differ.</p>

  <h3>Worked Example 1: Position on a Straight Road</h3>
  <div class="example-box">
    A signpost is the origin. A cyclist is 7 m west of it. East is positive.

    <br/><br/><b>Step 1:</b> Identify the origin: the signpost at 0 m.

    <br/><br/><b>Step 2:</b> West is opposite to the chosen positive direction.

    <br/><br/><b>Step 3:</b> Assign a negative position.

    <br/><br/><b>Answer:</b> The cyclist's position is −7 m.
  </div>

  <h3>Worked Example 2: Relative Motion</h3>
  <div class="example-box">
    A passenger sits in a bus travelling along a straight road.

    <br/><br/><b>Step 1:</b> Relative to the seat, the passenger's position does not change.

    <br/><br/><b>Step 2:</b> Relative to a stationary roadside tree, the passenger's position changes.

    <br/><br/><b>Answer:</b> The passenger is at rest relative to the bus and moving relative to the tree.
  </div>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Describing position without stating or implying a reference point.</li>
    <li>Assuming position must always be positive.</li>
    <li>Assuming motion or rest is identical for every observer.</li>
  </ul>
  `,
  [
    {
      q: "What must change for an object to be moving relative to a chosen reference?",
      hint: "Compare its location at different times.",
      ans: "Its position relative to that reference must change over time.",
      explanation: "Motion is defined by change in position relative to a reference."
    },
    {
      q: "East is positive and a lamp is 6 m west of the origin. What is its position?",
      hint: "West is opposite to the positive direction.",
      ans: "−6 m.",
      explanation: "A signed position is negative on the side opposite the chosen positive direction."
    },
    {
      q: "A passenger sits still in a moving bus. Is the passenger moving?",
      hint: "Specify the reference frame.",
      ans: "The passenger is at rest relative to the bus but moving relative to the road.",
      explanation: "Motion depends on the reference used."
    },
    {
      q: "What is a reference point used for when describing motion?",
      hint: "It provides a basis for comparing location.",
      ans: "It provides a fixed or specified location against which an object's position and changes in position are described.",
      explanation: "Without a reference, a location or motion description may be ambiguous."
    },
    {
      q: "A stationary object remains 3 m north of a post throughout an observation. Is it moving relative to the post?",
      hint: "Its position does not change.",
      ans: "No. It is at rest relative to the post.",
      explanation: "Its position relative to the chosen reference remains constant."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 8: DISTANCE AND DISPLACEMENT
   Subject: physics | Category: motion
   --------------------------------------------------------- */

add(
  "physics",
  "motion",
  "Distance and Displacement",
  `
  <h2>Distance and Displacement</h2>

  <h3>Foundation Understanding</h3>
  <p>Distance and displacement both describe movement, but they answer different questions. Distance describes the total path travelled; displacement describes the net change in position.</p>

  <div class="keyfact">
    KEY IDEA: Distance depends on the entire route. Displacement depends only on the initial and final positions and includes direction.
  </div>

  <h3>Clear Definitions</h3>
  <ul>
    <li><b>Distance:</b> the total length of the path travelled.</li>
    <li><b>Displacement:</b> the change in position from the starting point to the ending point, expressed with direction.</li>
  </ul>

  <h3>Key Differences</h3>
  <ul>
    <li>Distance is a scalar; displacement is a vector.</li>
    <li>Distance is never negative.</li>
    <li>Displacement can be positive, negative or zero in a one-dimensional coordinate system, depending on the chosen positive direction.</li>
    <li>The magnitude of displacement cannot exceed the distance travelled.</li>
    <li>Distance and displacement are equal in magnitude when the object moves along a straight line without reversing direction.</li>
  </ul>

  <div class="formula">
    Distance = total path length
    <br/>
    Displacement = final position − initial position
  </div>

  <h3>Worked Example 1: Same Direction</h3>
  <div class="example-box">
    A learner walks 5 m east and then 3 m east.

    <br/><br/><b>Step 1 — Distance:</b> Add the path lengths: 5 + 3 = 8 m.

    <br/><br/><b>Step 2 — Displacement:</b> Both movements are eastward: 5 + 3 = 8 m east.

    <br/><br/><b>Answer:</b> Distance = 8 m; displacement = 8 m east.
  </div>

  <h3>Worked Example 2: Opposite Directions</h3>
  <div class="example-box">
    A person walks 10 m east, then 6 m west.

    <br/><br/><b>Step 1 — Distance:</b> 10 + 6 = 16 m.

    <br/><br/><b>Step 2 — Displacement:</b> Take east as positive. Net change = +10 − 6 = +4 m.

    <br/><br/><b>Answer:</b> Distance = 16 m; displacement = 4 m east.
  </div>

  <h3>Worked Example 3: Returning to the Start</h3>
  <div class="example-box">
    A runner completes one full lap of a 400 m track and finishes at the starting point.

    <br/><br/><b>Step 1 — Distance:</b> One complete lap is 400 m.

    <br/><br/><b>Step 2 — Displacement:</b> Final position equals initial position, so the change in position is zero.

    <br/><br/><b>Answer:</b> Distance = 400 m; displacement = 0 m.
  </div>

  <h3>Important Insights</h3>
  <ul>
    <li>Returning to the start does not erase the distance travelled.</li>
    <li>Different paths can have the same displacement but different distances.</li>
    <li>Always include direction when a displacement answer requires it.</li>
  </ul>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Adding every movement to calculate displacement.</li>
    <li>Subtracting movements when calculating distance.</li>
    <li>Thinking zero displacement means no movement occurred.</li>
  </ul>
  `,
  [
    {
      q: "A person walks 10 m forward and 10 m back to the starting point. Find distance and displacement.",
      hint: "Add path lengths, then compare the initial and final positions.",
      formula: "Distance = total path; displacement = final position − initial position",
      steps: ["Distance = 10 + 10 = 20 m.", "The person returns to the starting point.", "Displacement = 0 m."],
      ans: "Distance = 20 m; displacement = 0 m.",
      explanation: "Distance counts the whole path, while displacement measures net change in position."
    },
    {
      q: "A car travels 30 m east and then 40 m east. Find distance and displacement.",
      hint: "Both movements have the same direction.",
      steps: ["Distance = 30 + 40 = 70 m.", "Net displacement = 70 m east."],
      ans: "Distance = 70 m; displacement = 70 m east.",
      explanation: "With straight-line movement in one direction, distance equals the magnitude of displacement."
    },
    {
      q: "A person walks 15 m north and then 5 m south. Find distance and displacement.",
      hint: "Add for distance; subtract opposing movements for displacement.",
      steps: ["Distance = 15 + 5 = 20 m.", "Net movement = 15 − 5 = 10 m.", "The remaining displacement is northward."],
      ans: "Distance = 20 m; displacement = 10 m north.",
      explanation: "Displacement represents the net change in position."
    },
    {
      q: "A car travels 100 m east and then 100 m west. Find distance and displacement.",
      hint: "Check whether the final position matches the starting position.",
      steps: ["Distance = 100 + 100 = 200 m.", "The car returns to its starting point.", "Displacement = 0 m."],
      ans: "Distance = 200 m; displacement = 0 m.",
      explanation: "Equal opposite movements cancel the displacement, not the distance."
    },
    {
      q: "A person walks 8 m east and then 6 m west. What is the displacement?",
      hint: "Subtract the smaller opposite movement and retain the direction of the larger movement.",
      steps: ["Net magnitude = 8 − 6 = 2 m.", "The larger movement was eastward."],
      ans: "2 m east.",
      explanation: "Displacement depends on the net change in position and its direction."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 9: SPEED
   Subject: physics | Category: motion
   --------------------------------------------------------- */

add(
  "physics",
  "motion",
  "Speed",
  `
  <h2>Speed</h2>

  <h3>Foundation Understanding</h3>
  <p><b>Speed</b> describes how quickly an object covers distance. It tells us the distance travelled per unit of time, without specifying direction.</p>

  <div class="keyfact">
    KEY IDEA: Speed tells how fast an object moves, not which direction it moves.
  </div>

  <h3>Formula for Average Speed</h3>
  <div class="formula">
    Average speed = total distance travelled ÷ total time taken
    <br/><br/>
    v = d / t
  </div>
  <ul>
    <li><b>v</b> = average speed</li>
    <li><b>d</b> = total distance travelled</li>
    <li><b>t</b> = total elapsed time</li>
  </ul>

  <p>In SI units, distance is measured in metres (m), time in seconds (s), and speed in metres per second (m/s).</p>

  <h3>Rearranging the Formula</h3>
  <div class="formula">
    Speed = distance / time
    <br/>
    Distance = speed × time
    <br/>
    Time = distance / speed
  </div>

  <h3>Worked Example 1: Calculating Speed</h3>
  <div class="example-box">
    A runner covers 100 m in 20 s. Calculate the average speed.

    <br/><br/><b>Step 1:</b> Identify the known values: distance = 100 m; time = 20 s.

    <br/><br/><b>Step 2:</b> Use average speed = distance ÷ time.

    <br/><br/><b>Step 3:</b> Speed = 100 ÷ 20 = 5 m/s.

    <br/><br/><b>Answer:</b> Average speed = 5 m/s.
  </div>

  <h3>Worked Example 2: Calculating Distance</h3>
  <div class="example-box">
    A car travels at an average speed of 12 m/s for 8 s. Find the distance travelled.

    <br/><br/><b>Step 1:</b> Speed = 12 m/s; time = 8 s.

    <br/><br/><b>Step 2:</b> Distance = speed × time.

    <br/><br/><b>Step 3:</b> Distance = 12 × 8 = 96 m.

    <br/><br/><b>Answer:</b> Distance = 96 m.
  </div>

  <h3>Average Speed Is Not Always the Usual Speed</h3>
  <p>Average speed uses the entire journey's distance and elapsed time, including stops. It is not generally found by taking the simple average of speeds unless the conditions justify that method.</p>

  <h3>Worked Example 3: A Journey with a Stop</h3>
  <div class="example-box">
    A learner walks 60 m in 30 s, rests for 10 s, and then walks another 40 m in 20 s.

    <br/><br/><b>Step 1:</b> Total distance = 60 + 40 = 100 m.

    <br/><br/><b>Step 2:</b> Total elapsed time = 30 + 10 + 20 = 60 s.

    <br/><br/><b>Step 3:</b> Average speed = 100 ÷ 60 ≈ 1.67 m/s.

    <br/><br/><b>Answer:</b> Average speed ≈ 1.67 m/s.
  </div>

  <h3>Unit Conversion</h3>
  <p>To convert km/h to m/s, multiply by 5/18. To convert m/s to km/h, multiply by 18/5.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Using displacement instead of total distance when calculating average speed.</li>
    <li>Forgetting to include stops in the total elapsed time.</li>
    <li>Writing speed in m instead of m/s.</li>
  </ul>
  `,
  [
    {
      q: "A cyclist travels 150 m in 30 s. Calculate the average speed.",
      hint: "Average speed = distance ÷ time.",
      formula: "v = d / t",
      steps: ["Substitute d = 150 m and t = 30 s.", "v = 150 ÷ 30 = 5 m/s."],
      ans: "5 m/s.",
      explanation: "Average speed is the total distance divided by the total elapsed time."
    },
    {
      q: "A vehicle travels at 8 m/s for 12 s. How far does it travel?",
      hint: "Rearrange the speed formula.",
      formula: "d = v × t",
      steps: ["d = 8 × 12.", "d = 96 m."],
      ans: "96 m.",
      explanation: "Multiplying speed by time gives distance for the stated average speed."
    },
    {
      q: "A student covers 200 m in 50 s. A learner calculates 50 ÷ 200 = 0.25 m/s. Identify the error and calculate the correct speed.",
      hint: "Divide distance by time, not time by distance.",
      steps: ["Use v = d / t.", "v = 200 ÷ 50 = 4 m/s."],
      ans: "The division was reversed. The correct average speed is 4 m/s.",
      explanation: "The speed formula requires distance divided by time."
    },
    {
      q: "A runner travels 100 m in 20 s, rests for 10 s, and then travels another 100 m in 20 s. Calculate the average speed for the whole journey.",
      hint: "Include the rest period in elapsed time.",
      formula: "Average speed = total distance / total elapsed time",
      steps: ["Total distance = 100 + 100 = 200 m.", "Total time = 20 + 10 + 20 = 50 s.", "Average speed = 200 ÷ 50 = 4 m/s."],
      ans: "4 m/s.",
      explanation: "Average speed includes the full elapsed time, including the stop."
    },
    {
      q: "Convert 72 km/h to m/s.",
      hint: "Multiply km/h by 5/18.",
      steps: ["72 × 5/18 = 4 × 5.", "The result is 20 m/s."],
      ans: "20 m/s.",
      explanation: "The conversion factor from km/h to m/s is 5/18."
    }
  ]
);


/* ---------------------------------------------------------
   SCREEN 10: VELOCITY
   Subject: physics | Category: motion
   --------------------------------------------------------- */

add(
  "physics",
  "motion",
  "Velocity",
  `
  <h2>Velocity</h2>

  <h3>Foundation Understanding</h3>
  <p><b>Velocity</b> describes the rate of change of position. Unlike speed, velocity includes direction. Two objects can have the same speed but different velocities if they travel in different directions.</p>

  <div class="keyfact">
    KEY IDEA: Speed describes how fast. Velocity describes how fast and in which direction.
  </div>

  <h3>Average Velocity</h3>
  <div class="formula">
    Average velocity = displacement ÷ elapsed time
    <br/><br/>
    v = Δx / Δt
  </div>
  <ul>
    <li><b>Δx</b> = final position minus initial position.</li>
    <li><b>Δt</b> = elapsed time.</li>
    <li>The SI unit is metres per second (m/s).</li>
  </ul>

  <h3>Velocity in One Dimension</h3>
  <p>Choose a positive direction and use it consistently. If east is positive, eastward velocity is positive and westward velocity is negative.</p>

  <h3>Worked Example 1: Eastward Motion</h3>
  <div class="example-box">
    A student moves 60 m east in 12 s without reversing direction.

    <br/><br/><b>Step 1:</b> Displacement = 60 m east.

    <br/><br/><b>Step 2:</b> Average velocity = displacement ÷ time = 60 ÷ 12 = 5 m/s east.

    <br/><br/><b>Answer:</b> Average velocity = 5 m/s east.
  </div>

  <h3>Worked Example 2: Returning Partway</h3>
  <div class="example-box">
    A person walks 20 m east and then 8 m west in a total of 14 s.

    <br/><br/><b>Step 1:</b> Take east as positive.

    <br/><br/><b>Step 2:</b> Displacement = +20 − 8 = +12 m.

    <br/><br/><b>Step 3:</b> Average velocity = 12 ÷ 14 ≈ 0.86 m/s.

    <br/><br/><b>Answer:</b> Average velocity ≈ 0.86 m/s east.
  </div>

  <h3>Worked Example 3: A Round Trip</h3>
  <div class="example-box">
    A runner completes a lap and returns to the starting point in 80 s.

    <br/><br/><b>Step 1:</b> The runner has travelled a non-zero distance.

    <br/><br/><b>Step 2:</b> Initial and final positions are the same, so displacement = 0 m.

    <br/><br/><b>Step 3:</b> Average velocity = 0 ÷ 80 = 0 m/s.

    <br/><br/><b>Answer:</b> Average velocity = 0 m/s.
  </div>

  <h3>Speed and Velocity Compared</h3>
  <ul>
    <li>Speed is a scalar; velocity is a vector.</li>
    <li>Average speed uses total distance; average velocity uses displacement.</li>
    <li>Average speed is non-negative; signed velocity can be positive, negative or zero in one dimension.</li>
    <li>Average speed and the magnitude of average velocity are equal only when the total distance equals the magnitude of displacement.</li>
  </ul>

  <h3>Important Insight</h3>
  <p>An object can move throughout a journey yet have zero average velocity if it finishes at its starting position. This does not mean its speed was zero throughout the journey.</p>

  <h3>Common Misconceptions</h3>
  <ul>
    <li>Using total distance instead of displacement to calculate average velocity.</li>
    <li>Giving velocity without direction or a consistent sign convention.</li>
    <li>Thinking zero average velocity means that no movement occurred.</li>
  </ul>
  `,
  [
    {
      q: "A cyclist has a displacement of 90 m east over 15 s. Calculate average velocity.",
      hint: "Average velocity = displacement ÷ elapsed time.",
      formula: "v = Δx / Δt",
      steps: ["v = 90 ÷ 15 = 6 m/s.", "Include the displacement direction."],
      ans: "6 m/s east.",
      explanation: "Average velocity uses displacement and elapsed time."
    },
    {
      q: "A person walks 25 m east and then 10 m west in 7 s. Take east as positive. Calculate average velocity.",
      hint: "Calculate net displacement first.",
      steps: ["Displacement = +25 − 10 = +15 m.", "Average velocity = 15 ÷ 7 ≈ 2.14 m/s.", "The positive sign means east."],
      ans: "Approximately 2.14 m/s east.",
      explanation: "Opposite movements subtract when calculating net displacement."
    },
    {
      q: "A runner returns to the starting point after 50 s. What is the runner's average velocity for the complete journey?",
      hint: "Compare initial and final positions.",
      steps: ["Displacement = 0 m.", "Average velocity = 0 ÷ 50 = 0 m/s."],
      ans: "0 m/s.",
      explanation: "Average velocity is zero when total displacement is zero, even if distance travelled is not zero."
    },
    {
      q: "A car travels at 12 m/s east while another travels at 12 m/s west. Do they have the same velocity?",
      hint: "Velocity includes direction.",
      ans: "No. Their speeds are equal, but their velocities have opposite directions.",
      explanation: "Equal speed alone does not establish equal velocity."
    },
    {
      q: "A learner calculates average velocity by dividing total distance by elapsed time. What is the error?",
      hint: "Identify which quantity belongs in the velocity formula.",
      ans: "Average velocity must be calculated using displacement divided by elapsed time, not total distance.",
      explanation: "Using total distance calculates average speed instead."
    }
  ]
);
add(
  "physics",
  "force",
  "Types of Forces",
  `
  <h2>Types of Forces</h2>
  <p>A force is a push or pull caused by an interaction between objects. Different forces arise from different physical interactions.</p>

  <h3>Important forces</h3>
  <ul>
    <li><b>Gravitational force:</b> attraction between objects with mass. Earth's gravity pulls objects towards its centre.</li>
    <li><b>Friction:</b> a force that opposes relative motion or attempted motion between surfaces in contact.</li>
    <li><b>Normal reaction:</b> a support force exerted perpendicular to a surface.</li>
    <li><b>Tension:</b> a pulling force transmitted through a taut string, rope or cable.</li>
    <li><b>Air resistance:</b> a force that opposes an object's motion through air.</li>
    <li><b>Upthrust:</b> an upward force exerted by a fluid on an immersed object.</li>
    <li><b>Elastic or spring force:</b> a restoring force produced when an elastic object is stretched or compressed.</li>
    <li><b>Magnetic force:</b> attraction or repulsion involving magnets and magnetic materials.</li>
    <li><b>Electrostatic force:</b> attraction or repulsion between electric charges.</li>
  </ul>

  <div class="keyfact"><b>Key idea:</b> Identify a force by asking what interaction produces it and what object exerts it.</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: A book resting on a table</b><br>
    The Earth exerts gravitational force downward. The table exerts a normal reaction upward.
  </div>
  <div class="example-box">
    <b>Example 2: A bucket lifted by a rope</b><br>
    The rope exerts tension upward. Gravity acts downward.
  </div>
  <div class="example-box">
    <b>Example 3: A moving bicycle slowing down</b><br>
    Friction and air resistance oppose the bicycle's motion.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Calling every force friction.</li>
    <li>Confusing the object experiencing a force with the object exerting it.</li>
    <li>Assuming gravity acts only when an object is falling.</li>
  </ul>
  `,
  [
    {
      q: "Which force pulls a dropped stone towards Earth?",
      hint: "Identify the force caused by Earth's mass.",
      ans: "Gravitational force",
      explanation: "Earth attracts the stone through gravity, whether the stone is falling or resting."
    },
    {
      q: "A bucket is suspended by a taut rope. What force does the rope exert on the bucket?",
      hint: "A taut rope pulls along its length.",
      ans: "Tension",
      explanation: "Tension is the pulling force transmitted through a taut rope or string."
    },
    {
      q: "A box slides across a rough floor. Which force opposes its sliding?",
      hint: "Consider the interaction between the touching surfaces.",
      ans: "Friction",
      explanation: "Friction acts between surfaces and opposes relative sliding or attempted sliding."
    },
    {
      q: "What upward force does water exert on an object immersed in it?",
      hint: "This force helps objects float.",
      ans: "Upthrust",
      explanation: "Upthrust is the upward force exerted by a fluid on an immersed object."
    },
    {
      q: "A charged ruler attracts small pieces of paper. Which type of force is involved?",
      hint: "Think about electric charge.",
      ans: "Electrostatic force",
      explanation: "Charged objects can exert electrostatic forces on other charged or polarised objects."
    }
  ]
);
add(
  "physics",
  "force",
  "Contact and Non-contact Forces",
  `
  <h2>Contact and Non-contact Forces</h2>
  <p>Forces can be classified according to whether the interacting objects must touch one another.</p>

  <h3>Contact forces</h3>
  <p>A contact force acts when objects are physically touching, or when an intervening material transmits the force.</p>
  <ul>
    <li>Friction between a tyre and a road.</li>
    <li>Normal reaction from a table supporting a book.</li>
    <li>Tension transmitted through a taut rope.</li>
    <li>Air resistance acting on a moving object.</li>
    <li>Upthrust exerted by water.</li>
  </ul>

  <h3>Non-contact forces</h3>
  <p>A non-contact force acts without the objects physically touching.</p>
  <ul>
    <li>Gravitational force between Earth and a falling object.</li>
    <li>Magnetic force between magnets.</li>
    <li>Electrostatic force between electric charges.</li>
  </ul>

  <div class="keyfact"><b>Classification test:</b> Ask whether physical contact or a contacting medium is required for the force to act.</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: A magnet attracts an iron nail.</b><br>
    The magnet and nail need not touch for the magnetic force to act. It is a non-contact force.
  </div>
  <div class="example-box">
    <b>Example 2: A hand pushes a trolley.</b><br>
    The hand touches the trolley. The applied push is a contact force.
  </div>
  <div class="example-box">
    <b>Example 3: A parachutist falls through air.</b><br>
    Air resistance is a contact force because air particles interact with the parachutist and parachute.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Assuming gravity requires objects to touch.</li>
    <li>Calling air resistance a non-contact force simply because air is difficult to see.</li>
    <li>Assuming a force stops acting whenever objects are not visibly touching.</li>
  </ul>
  `,
  [
    {
      q: "Classify the gravitational force between Earth and a satellite orbiting Earth.",
      hint: "Does the satellite need to touch Earth?",
      ans: "Non-contact force",
      explanation: "Gravity acts across the space between Earth and the satellite."
    },
    {
      q: "A student pushes a desk with a hand. Is the applied force a contact or non-contact force?",
      hint: "Check whether the hand touches the desk.",
      ans: "Contact force",
      explanation: "The hand must touch the desk to exert this push."
    },
    {
      q: "Is magnetic attraction between two separated magnets a contact force?",
      hint: "The magnets can attract before touching.",
      ans: "No. It is a non-contact force.",
      explanation: "Magnetic forces can act across a gap."
    },
    {
      q: "Classify air resistance acting on a moving car.",
      hint: "Consider the interaction between the car and air particles.",
      ans: "Contact force",
      explanation: "Air particles interact with the car's surface, producing drag."
    },
    {
      q: "A book rests on a table. Is the table's normal reaction a contact or non-contact force?",
      hint: "The force comes from the supporting surface.",
      ans: "Contact force",
      explanation: "The normal reaction is exerted by the table where it contacts the book."
    }
  ]
);
add(
  "physics",
  "force",
  "Effects of Force",
  `
  <h2>Effects of Force</h2>
  <p>A force can change an object's motion or deform it. The result depends on the object's existing motion, the magnitude and direction of the force, and the other forces acting on it.</p>

  <h3>Main effects</h3>
  <ul>
    <li><b>Start motion:</b> a stationary trolley can begin moving when pushed.</li>
    <li><b>Stop motion:</b> braking can bring a moving bicycle to rest.</li>
    <li><b>Change speed:</b> a force may speed an object up or slow it down.</li>
    <li><b>Change direction:</b> a force can turn a moving ball.</li>
    <li><b>Change shape or size:</b> squeezing a sponge compresses it; stretching a spring lengthens it.</li>
  </ul>

  <div class="keyfact"><b>Important:</b> A force does not always change an object's motion. If the forces balance, the object may remain at rest or continue at constant velocity.</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Kicking a stationary football</b><br>
    The applied force changes the ball from rest to motion.
  </div>
  <div class="example-box">
    <b>Example 2: A moving car brakes</b><br>
    The braking force opposes the car's motion, reducing its speed.
  </div>
  <div class="example-box">
    <b>Example 3: Squeezing modelling clay</b><br>
    The applied force changes the clay's shape.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Claiming that force always makes an object move faster.</li>
    <li>Ignoring changes in direction.</li>
    <li>Assuming a stationary object has no forces acting on it.</li>
  </ul>
  `,
  [
    {
      q: "A stationary football begins moving after being kicked. What effect of force is demonstrated?",
      hint: "Compare the ball's motion before and after the kick.",
      ans: "The force starts the ball moving.",
      explanation: "The applied force changes the ball from rest to motion."
    },
    {
      q: "A moving bicycle slows down when its brakes are applied. What change does the force produce?",
      hint: "Look at the change in speed.",
      ans: "It reduces the bicycle's speed.",
      explanation: "The braking force opposes the bicycle's motion."
    },
    {
      q: "A tennis ball changes direction after being hit by a racket. Which effect of force is shown?",
      hint: "The ball was already moving.",
      ans: "A change in direction",
      explanation: "A force can alter the direction of motion, even if the object was already moving."
    },
    {
      q: "A spring becomes longer when a load is attached. What effect of force is shown?",
      hint: "Consider the spring's shape and length.",
      ans: "Deformation or change in length",
      explanation: "The load exerts a force that stretches the spring."
    },
    {
      q: "A book rests motionless on a table. Does this prove that no forces act on it?",
      hint: "Consider gravity and the table's support.",
      ans: "No. Gravity acts downward and the table's normal reaction acts upward.",
      explanation: "The forces can balance, so the book remains at rest."
    }
  ]
);
add(
  "physics",
  "force",
  "Resultant Force",
  `
  <h2>Resultant Force</h2>
  <p>The <b>resultant force</b> is the single force that has the same overall effect on an object's motion as all the forces acting together.</p>

  <h3>Forces in the same direction</h3>
  <p>Add their magnitudes when they act along the same straight line in the same direction.</p>
  <div class="formula">Resultant force = F₁ + F₂</div>

  <h3>Forces in opposite directions</h3>
  <p>Subtract the smaller magnitude from the larger. The resultant acts in the direction of the larger force.</p>
  <div class="formula">Resultant force magnitude = larger force − smaller force</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Same direction</b><br>
    Two people push a trolley to the right with 12 N and 8 N.<br>
    Resultant = 12 + 8 = <b>20 N to the right</b>.
  </div>
  <div class="example-box">
    <b>Example 2: Opposite directions</b><br>
    A box experiences 25 N to the right and 9 N to the left.<br>
    Resultant magnitude = 25 − 9 = 16 N.<br>
    Direction = right, because 25 N is larger.<br>
    <b>Resultant = 16 N to the right</b>.
  </div>
  <div class="example-box">
    <b>Example 3: Equal opposing forces</b><br>
    A box experiences 10 N to the left and 10 N to the right.<br>
    Resultant = 10 − 10 = <b>0 N</b>.
  </div>

  <h3>Sign convention</h3>
  <p>For one-dimensional calculations, choose one direction as positive. For example, right may be positive and left negative. Add the signed forces algebraically.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Adding forces that act in opposite directions without considering direction.</li>
    <li>Giving a direction opposite to the larger force.</li>
    <li>Writing a resultant force without its unit, newtons (N).</li>
  </ul>
  `,
  [
    {
      q: "Two forces of 7 N and 11 N act to the right. Find the resultant force.",
      hint: "Forces in the same direction add.",
      formula: "R = F₁ + F₂",
      steps: ["Step 1: Identify both forces as rightward.", "Step 2: Add: 7 + 11 = 18.", "Step 3: Include the direction and unit."],
      ans: "18 N to the right",
      explanation: "Forces acting along the same line in the same direction add."
    },
    {
      q: "A box experiences 20 N to the right and 6 N to the left. Find the resultant force.",
      hint: "Subtract the smaller opposing force from the larger.",
      steps: ["Step 1: Calculate 20 − 6 = 14 N.", "Step 2: The 20 N force is larger.", "Step 3: The resultant acts to the right."],
      ans: "14 N to the right",
      explanation: "Opposing forces subtract, and the resultant points in the direction of the larger force."
    },
    {
      q: "Forces of 15 N left and 15 N right act on an object. What is the resultant force?",
      hint: "Equal forces in opposite directions cancel.",
      ans: "0 N",
      explanation: "The forces cancel because they have equal magnitudes and opposite directions."
    },
    {
      q: "A cart is pulled with 30 N east and 12 N west. Find the resultant force.",
      hint: "Subtract and keep the direction of the stronger force.",
      steps: ["Step 1: 30 − 12 = 18 N.", "Step 2: East is the direction of the larger force."],
      ans: "18 N east",
      explanation: "The eastward pull is greater by 18 N."
    },
    {
      q: "A student pushes a box with 9 N right while another pushes it with 14 N left. Find the resultant force.",
      hint: "The leftward force is larger.",
      steps: ["Step 1: 14 − 9 = 5 N.", "Step 2: The larger force acts left."],
      ans: "5 N to the left",
      explanation: "The resultant points in the direction of the larger opposing force."
    }
  ]
);
add(
  "physics",
  "force",
  "Balanced and Unbalanced Forces",
  `
  <h2>Balanced and Unbalanced Forces</h2>
  <p>Whether forces are balanced depends on their resultant, not on whether forces are present.</p>

  <h3>Balanced forces</h3>
  <p>Forces are balanced when their vector sum is zero. The resultant force is zero.</p>
  <ul>
    <li>An object at rest remains at rest if the resultant stays zero.</li>
    <li>An object already moving continues at constant velocity if the resultant stays zero.</li>
  </ul>

  <h3>Unbalanced forces</h3>
  <p>Forces are unbalanced when their resultant is not zero. The object's velocity changes: its speed, direction, or both may change.</p>

  <div class="keyfact"><b>Critical distinction:</b> Zero resultant force means zero acceleration, not necessarily zero velocity.</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: A hanging lamp</b><br>
    Tension acts upward with 40 N and weight acts downward with 40 N.<br>
    Resultant = 40 − 40 = 0 N.<br>
    The forces are balanced.
  </div>
  <div class="example-box">
    <b>Example 2: A trolley starts accelerating</b><br>
    A 15 N push acts right and friction acts left with 5 N.<br>
    Resultant = 15 − 5 = 10 N right.<br>
    The forces are unbalanced.
  </div>
  <div class="example-box">
    <b>Example 3: A car moving at constant velocity</b><br>
    If the forward driving force equals the total opposing force, the resultant is zero and the car's velocity remains constant.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Assuming balanced forces mean an object must be stationary.</li>
    <li>Assuming a moving object must have a resultant force in its direction of motion.</li>
    <li>Confusing the presence of forces with a non-zero resultant.</li>
  </ul>
  `,
  [
    {
      q: "A stationary object has a 12 N upward force and a 12 N downward force. Are the forces balanced?",
      hint: "Calculate the resultant.",
      ans: "Yes. The resultant force is 0 N.",
      explanation: "Equal and opposite forces cancel."
    },
    {
      q: "A car moves in a straight line at constant velocity. What is its resultant force?",
      hint: "Constant velocity means no change in velocity.",
      ans: "0 N",
      explanation: "Zero acceleration corresponds to zero resultant force."
    },
    {
      q: "A box experiences 18 N right and 7 N left. Are the forces balanced?",
      hint: "Calculate the net force.",
      steps: ["Step 1: 18 − 7 = 11 N.", "Step 2: The resultant is not zero."],
      ans: "No. The forces are unbalanced; the resultant is 11 N right.",
      explanation: "A non-zero resultant means the forces are unbalanced."
    },
    {
      q: "Can an object move while the forces on it are balanced?",
      hint: "Think about constant velocity.",
      ans: "Yes. It can move at constant velocity.",
      explanation: "Balanced forces prevent acceleration, not motion itself."
    },
    {
      q: "A moving ball changes direction after being struck. Were its forces balanced during the change?",
      hint: "A change in velocity means acceleration.",
      ans: "No. The resultant force was non-zero during the change.",
      explanation: "Changing direction is a change in velocity and therefore requires acceleration."
    }
  ]
);
add(
  "physics",
  "motion",
  "Describing Position and Motion",
  `
  <h2>Describing Position and Motion</h2>
  <p>To describe where an object is or whether it is moving, we compare its position with a chosen reference point or observer.</p>

  <h3>Position</h3>
  <p>Position specifies an object's location relative to a reference point. In a straight-line problem, a position can be described using a distance and a direction from the origin.</p>

  <h3>Rest and motion</h3>
  <ul>
    <li><b>At rest:</b> the object's position relative to the chosen reference point does not change with time.</li>
    <li><b>In motion:</b> the object's position relative to that reference point changes with time.</li>
  </ul>

  <h3>Motion is relative</h3>
  <p>An object can be at rest relative to one observer and moving relative to another. Always identify the reference point before deciding whether an object is moving.</p>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: A passenger on a bus</b><br>
    The passenger is at rest relative to the seat but moving relative to a person standing beside the road.
  </div>
  <div class="example-box">
    <b>Example 2: A student walks east from a school gate</b><br>
    If the gate is the reference point, the student's position changes as the student walks east.
  </div>
  <div class="example-box">
    <b>Example 3: A parked car</b><br>
    The car is at rest relative to the road if its position relative to the road does not change.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Describing motion without specifying what it is relative to.</li>
    <li>Confusing position with the total distance travelled.</li>
    <li>Assuming that a passenger sitting inside a moving vehicle is at rest relative to every observer.</li>
  </ul>
  `,
  [
    {
      q: "A passenger sits still on a bus travelling along a road. Is the passenger moving relative to the bus?",
      hint: "Use the bus as the reference point.",
      ans: "No. The passenger is at rest relative to the bus.",
      explanation: "The passenger's position relative to the bus does not change."
    },
    {
      q: "The same passenger is observed by someone standing beside the road. Is the passenger moving relative to that observer?",
      hint: "Use the roadside observer as the reference point.",
      ans: "Yes. The passenger moves with the bus relative to the road.",
      explanation: "The passenger's position relative to the roadside observer changes."
    },
    {
      q: "What is a reference point used for when describing motion?",
      hint: "It provides the location against which position is compared.",
      ans: "It provides a fixed location or observer against which an object's position is compared.",
      explanation: "Motion is identified by changes in position relative to a reference."
    },
    {
      q: "A car remains in the same parking space for ten minutes. Is it moving relative to the parking space?",
      hint: "Check whether its position changes relative to that space.",
      ans: "No. It is at rest relative to the parking space.",
      explanation: "Its position relative to the chosen reference remains unchanged."
    },
    {
      q: "Why can one object be described as at rest by one observer and moving by another?",
      hint: "Observers can use different reference points.",
      ans: "Because motion depends on the reference point used.",
      explanation: "An object's position may stay constant relative to one reference while changing relative to another."
    }
  ]
);
add(
  "physics",
  "motion",
  "Distance and Displacement",
  `
  <h2>Distance and Displacement</h2>
  <p>Distance and displacement describe different aspects of a journey.</p>

  <h3>Definitions</h3>
  <ul>
    <li><b>Distance:</b> the total length of the path travelled. It is a scalar and has magnitude only.</li>
    <li><b>Displacement:</b> the change from initial position to final position. It is a vector and includes direction.</li>
  </ul>

  <div class="keyfact"><b>Key idea:</b> Distance depends on the path travelled. Displacement depends on the initial and final positions.</div>

  <h3>One-dimensional calculations</h3>
  <p>Choose a positive direction. Add the lengths of all journey segments to find distance. For displacement, add signed movements: movements in the positive direction are positive and movements in the opposite direction are negative.</p>
  <div class="formula">Displacement = final position − initial position</div>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Same direction</b><br>
    A learner walks 5 m east, then 3 m east.<br>
    Distance = 5 + 3 = 8 m.<br>
    Displacement = 8 m east.
  </div>
  <div class="example-box">
    <b>Example 2: Opposite directions</b><br>
    A learner walks 10 m east, then 6 m west.<br>
    Distance = 10 + 6 = 16 m.<br>
    Displacement = 10 − 6 = 4 m east.
  </div>
  <div class="example-box">
    <b>Example 3: Returning to the start</b><br>
    A runner completes one 400 m lap and returns to the starting point.<br>
    Distance = 400 m.<br>
    Displacement = 0 m.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Subtracting journey segments when calculating distance.</li>
    <li>Adding opposite-direction movements when calculating displacement.</li>
    <li>Giving displacement without a direction when direction is required.</li>
  </ul>
  `,
  [
    {
      q: "A person walks 10 m forward and 10 m back to the starting point. Find the distance and displacement.",
      hint: "Add path lengths for distance; compare the start and finish for displacement.",
      steps: ["Step 1: Distance = 10 + 10 = 20 m.", "Step 2: The final position equals the initial position.", "Step 3: Displacement = 0 m."],
      ans: "Distance = 20 m; displacement = 0 m",
      explanation: "Returning to the start gives zero displacement but does not erase the distance travelled."
    },
    {
      q: "A car moves 30 m east and then 40 m east. Find its distance and displacement.",
      hint: "Both segments are in the same direction.",
      steps: ["Step 1: Distance = 30 + 40 = 70 m.", "Step 2: Net movement = 70 m east."],
      ans: "Distance = 70 m; displacement = 70 m east",
      explanation: "When motion is in one direction along a straight line, distance equals the magnitude of displacement."
    },
    {
      q: "A learner walks 15 m north and then 5 m south. Find distance and displacement.",
      hint: "Add for distance; subtract opposing movements for displacement.",
      steps: ["Step 1: Distance = 15 + 5 = 20 m.", "Step 2: Net movement = 15 − 5 = 10 m.", "Step 3: The larger movement was north."],
      ans: "Distance = 20 m; displacement = 10 m north",
      explanation: "The learner finishes 10 m north of the starting point."
    },
    {
      q: "A runner completes a 200 m lap and finishes at the exact starting point. What is the displacement?",
      hint: "Compare final and initial positions.",
      ans: "0 m",
      explanation: "Displacement is zero because the final position is the same as the initial position."
    },
    {
      q: "A person walks 8 m east and then 6 m west. Find the displacement.",
      hint: "Take east as positive.",
      steps: ["Step 1: Eastward movement = +8 m.", "Step 2: Westward movement = −6 m.", "Step 3: Displacement = +8 − 6 = +2 m."],
      ans: "2 m east",
      explanation: "The net movement is 2 m east of the starting point."
    }
  ]
);
add(
  "physics",
  "motion",
  "Speed",
  `
  <h2>Speed</h2>
  <p>Speed describes how quickly an object covers distance. It tells us the distance travelled per unit time, without specifying direction.</p>

  <h3>Formula</h3>
  <div class="formula">Average speed = total distance travelled ÷ total time taken</div>

  <p>The SI unit of speed is metres per second (m/s). Kilometres per hour (km/h) is also commonly used.</p>

  <h3>Unit conversion</h3>
  <ul>
    <li>To convert km/h to m/s, divide by 3.6.</li>
    <li>To convert m/s to km/h, multiply by 3.6.</li>
  </ul>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Calculating average speed</b><br>
    A cyclist travels 120 m in 20 s.<br>
    Speed = distance ÷ time = 120 ÷ 20 = <b>6 m/s</b>.
  </div>
  <div class="example-box">
    <b>Example 2: Finding distance</b><br>
    A car travels at 15 m/s for 8 s.<br>
    Distance = speed × time = 15 × 8 = <b>120 m</b>.
  </div>
  <div class="example-box">
    <b>Example 3: Converting units</b><br>
    Convert 72 km/h to m/s.<br>
    72 ÷ 3.6 = <b>20 m/s</b>.
  </div>

  <h3>Important distinction</h3>
  <p>Average speed uses the total distance and total elapsed time. It is not necessarily the arithmetic mean of the speeds at different moments.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Dividing time by distance instead of distance by time.</li>
    <li>Using minutes with a distance in metres without converting time to seconds when m/s is required.</li>
    <li>Giving a speed without a unit.</li>
  </ul>
  `,
  [
    {
      q: "A cyclist travels 150 m in 30 s. Calculate the average speed.",
      hint: "Average speed = distance ÷ time.",
      formula: "v = d ÷ t",
      steps: ["Step 1: Distance = 150 m.", "Step 2: Time = 30 s.", "Step 3: Speed = 150 ÷ 30 = 5 m/s."],
      ans: "5 m/s",
      explanation: "Dividing distance by time gives the distance covered per second."
    },
    {
      q: "A vehicle travels at 12 m/s for 10 s. How far does it travel?",
      hint: "Rearrange speed = distance ÷ time.",
      formula: "d = v × t",
      steps: ["Step 1: Speed = 12 m/s.", "Step 2: Time = 10 s.", "Step 3: Distance = 12 × 10 = 120 m."],
      ans: "120 m",
      explanation: "Distance equals speed multiplied by elapsed time for the stated constant speed."
    },
    {
      q: "Convert 36 km/h to m/s.",
      hint: "Divide km/h by 3.6.",
      steps: ["Step 1: 36 ÷ 3.6 = 10.", "Step 2: Write the unit m/s."],
      ans: "10 m/s",
      explanation: "One kilometre per hour is equivalent to 1/3.6 metres per second."
    },
    {
      q: "A student walks 600 m in 5 minutes. Calculate the average speed in m/s.",
      hint: "Convert minutes to seconds first.",
      steps: ["Step 1: Time = 5 × 60 = 300 s.", "Step 2: Speed = 600 ÷ 300 = 2 m/s."],
      ans: "2 m/s",
      explanation: "Using seconds gives speed in metres per second."
    },
    {
      q: "A journey covers 100 m in 20 s, then 100 m in 40 s. Find the average speed for the whole journey.",
      hint: "Use total distance divided by total time.",
      steps: ["Step 1: Total distance = 100 + 100 = 200 m.", "Step 2: Total time = 20 + 40 = 60 s.", "Step 3: Average speed = 200 ÷ 60 ≈ 3.33 m/s."],
      ans: "Approximately 3.33 m/s",
      explanation: "Average speed for a whole journey must use the total distance and total time."
    }
  ]
);
add(
  "physics",
  "motion",
  "Velocity",
  `
  <h2>Velocity</h2>
  <p>Velocity describes the rate at which displacement changes with time. Unlike speed, velocity includes direction.</p>

  <h3>Average velocity</h3>
  <div class="formula">Average velocity = displacement ÷ elapsed time</div>
  <p>The SI unit is metres per second (m/s). In straight-line motion, a chosen positive direction gives positive velocity; motion in the opposite direction gives negative velocity.</p>

  <h3>Speed and velocity</h3>
  <ul>
    <li>Speed is based on distance and has no direction.</li>
    <li>Velocity is based on displacement and includes direction.</li>
    <li>Average speed is total distance divided by total time.</li>
    <li>Average velocity is total displacement divided by total time.</li>
  </ul>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Straight-line motion</b><br>
    A student moves 60 m east in 10 s.<br>
    Average velocity = 60 ÷ 10 = <b>6 m/s east</b>.
  </div>
  <div class="example-box">
    <b>Example 2: Opposite direction</b><br>
    Take east as positive. A student moves 20 m west in 5 s.<br>
    Displacement = −20 m.<br>
    Average velocity = −20 ÷ 5 = <b>−4 m/s</b>, meaning 4 m/s west.
  </div>
  <div class="example-box">
    <b>Example 3: Returning to the start</b><br>
    A runner completes a lap in 80 s and finishes where they started.<br>
    Displacement = 0 m.<br>
    Average velocity = 0 ÷ 80 = <b>0 m/s</b>, even though the runner travelled a non-zero distance.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using distance instead of displacement to calculate average velocity.</li>
    <li>Leaving out direction or the sign convention in a one-dimensional problem.</li>
    <li>Assuming zero average velocity means the object never moved.</li>
  </ul>
  `,
  [
    {
      q: "A student moves 80 m north in 20 s. Calculate average velocity.",
      hint: "Use displacement ÷ time and include direction.",
      formula: "v̄ = displacement ÷ time",
      steps: ["Step 1: Displacement = 80 m north.", "Step 2: Time = 20 s.", "Step 3: Average velocity = 80 ÷ 20 = 4 m/s north."],
      ans: "4 m/s north",
      explanation: "Velocity is displacement per unit time and includes direction."
    },
    {
      q: "Take east as positive. An object moves 30 m west in 6 s. Find its average velocity.",
      hint: "Westward displacement is negative under this convention.",
      steps: ["Step 1: Displacement = −30 m.", "Step 2: Time = 6 s.", "Step 3: Velocity = −30 ÷ 6 = −5 m/s."],
      ans: "−5 m/s, or 5 m/s west",
      explanation: "The negative sign indicates movement opposite to the chosen positive direction."
    },
    {
      q: "A runner completes a lap and returns to the starting point in 50 s. Find the average velocity.",
      hint: "What is the total displacement?",
      steps: ["Step 1: Final position equals initial position.", "Step 2: Displacement = 0 m.", "Step 3: Average velocity = 0 ÷ 50 = 0 m/s."],
      ans: "0 m/s",
      explanation: "Average velocity depends on net displacement, which is zero for a completed lap."
    },
    {
      q: "What is the main difference between speed and velocity?",
      hint: "Consider whether direction is included.",
      ans: "Speed is a scalar based on distance; velocity is a vector based on displacement and includes direction.",
      explanation: "Velocity contains directional information that speed does not."
    },
    {
      q: "An object has an average velocity of 3 m/s east for 4 s. Find its displacement.",
      hint: "Displacement = average velocity × time.",
      steps: ["Step 1: Velocity = 3 m/s east.", "Step 2: Time = 4 s.", "Step 3: Displacement = 3 × 4 = 12 m east."],
      ans: "12 m east",
      explanation: "Multiplying average velocity by elapsed time gives the net displacement."
    }
  ]
);
add(
  "physics",
  "motion",
  "Acceleration",
  `
  <h2>Acceleration</h2>
  <p>Acceleration is the rate of change of velocity with time. An object accelerates whenever its velocity changes in magnitude, direction, or both.</p>

  <h3>Average acceleration</h3>
  <div class="formula">a = (final velocity − initial velocity) ÷ time taken</div>
  <p>In symbols: a = (v − u) / t, where u is initial velocity, v is final velocity and t is elapsed time.</p>

  <p>The SI unit is metres per second squared (m/s²). Acceleration has direction, so signs depend on the chosen positive direction.</p>

  <h3>Interpreting acceleration</h3>
  <ul>
    <li>Positive acceleration means velocity changes in the positive direction under the chosen sign convention.</li>
    <li>Negative acceleration means acceleration points in the negative direction.</li>
    <li>Negative acceleration does not always mean slowing down. The object may be moving in the negative direction and speeding up.</li>
    <li>An object moving at constant velocity has zero acceleration.</li>
  </ul>

  <h3>Worked examples</h3>
  <div class="example-box">
    <b>Example 1: Speeding up in the positive direction</b><br>
    A car's velocity increases from 5 m/s to 17 m/s in 4 s.<br>
    a = (17 − 5) ÷ 4 = 12 ÷ 4 = <b>3 m/s²</b>.
  </div>
  <div class="example-box">
    <b>Example 2: Slowing down while moving forward</b><br>
    A car moving east at 20 m/s slows to 8 m/s in 3 s. Take east as positive.<br>
    a = (8 − 20) ÷ 3 = −12 ÷ 3 = <b>−4 m/s²</b>.<br>
    The negative sign shows acceleration westward, opposite to the car's motion.
  </div>
  <div class="example-box">
    <b>Example 3: Constant velocity</b><br>
    A train's velocity remains 12 m/s east for 10 s.<br>
    Change in velocity = 12 − 12 = 0 m/s.<br>
    Acceleration = 0 ÷ 10 = <b>0 m/s²</b>.
  </div>

  <h3>Common mistakes</h3>
  <ul>
    <li>Dividing velocity by time without subtracting the initial velocity.</li>
    <li>Using distance instead of change in velocity.</li>
    <li>Assuming a negative acceleration always means the object is slowing down.</li>
    <li>Using m/s instead of m/s² for acceleration.</li>
  </ul>
  `,
  [
    {
      q: "A car's velocity changes from 4 m/s to 16 m/s in 3 s. Calculate its average acceleration.",
      hint: "Subtract initial velocity from final velocity, then divide by time.",
      formula: "a = (v − u) ÷ t",
      steps: ["Step 1: u = 4 m/s and v = 16 m/s.", "Step 2: Change in velocity = 16 − 4 = 12 m/s.", "Step 3: Acceleration = 12 ÷ 3 = 4 m/s²."],
      ans: "4 m/s²",
      explanation: "The velocity increases by 12 m/s over 3 seconds."
    },
    {
      q: "A bicycle slows from 12 m/s to 6 m/s in 2 s. Take its original direction as positive. Calculate acceleration.",
      hint: "Final velocity is less than initial velocity.",
      steps: ["Step 1: Change in velocity = 6 − 12 = −6 m/s.", "Step 2: Acceleration = −6 ÷ 2 = −3 m/s²."],
      ans: "−3 m/s²",
      explanation: "The negative acceleration points opposite to the chosen positive direction."
    },
    {
      q: "An object moves at a constant velocity of 7 m/s for 5 s. What is its acceleration?",
      hint: "Constant velocity means no change in velocity.",
      steps: ["Step 1: Change in velocity = 7 − 7 = 0 m/s.", "Step 2: Acceleration = 0 ÷ 5 = 0 m/s²."],
      ans: "0 m/s²",
      explanation: "Acceleration is zero when velocity does not change."
    },
    {
      q: "A vehicle starts from rest and reaches 10 m/s in 5 s. Find its average acceleration.",
      hint: "Starting from rest means initial velocity is zero.",
      steps: ["Step 1: u = 0 m/s and v = 10 m/s.", "Step 2: Change in velocity = 10 − 0 = 10 m/s.", "Step 3: Acceleration = 10 ÷ 5 = 2 m/s²."],
      ans: "2 m/s²",
      explanation: "The velocity increases by 10 m/s over 5 seconds."
    },
    {
      q: "Can an object have negative acceleration while moving in the negative direction and speeding up?",
      hint: "Compare the direction of velocity with the direction of acceleration.",
      ans: "Yes. If velocity and acceleration are both negative, the object speeds up in the negative direction.",
      explanation: "Acceleration's sign indicates its direction, not by itself whether speed increases or decreases."
    }
  ]
);
// ============================================================
// TIXAR PHYSICS — BATCH 3
// Force, Motion and Mechanics
// Screens 21–30 in the hierarchy
// Learning loop: Test → Identify → Repair → Retest → Remember
// ============================================================

add(
  "physics",
  "equations_of_linear_motion",
  "Solving Motion Problems",
  `
  <h2>Solving Motion Problems</h2>

  <p>Motion problems often provide several quantities and ask you to calculate one missing quantity. The reliable method is to identify the known values, choose an equation that connects them, substitute carefully, and check the answer.</p>

  <h3>The problem-solving method</h3>
  <ol>
    <li><strong>Read:</strong> Identify what the question asks you to find.</li>
    <li><strong>List:</strong> Write down the known quantities with their symbols and units.</li>
    <li><strong>Convert:</strong> Change units when necessary.</li>
    <li><strong>Choose:</strong> Select an equation that connects the known quantities to the unknown.</li>
    <li><strong>Calculate:</strong> Substitute values and solve.</li>
    <li><strong>Check:</strong> Confirm the units and whether the result is physically reasonable.</li>
  </ol>

  <p>For motion with constant acceleration, the common symbols are:</p>
  <ul>
    <li><strong>u:</strong> initial velocity, in m/s</li>
    <li><strong>v:</strong> final velocity, in m/s</li>
    <li><strong>a:</strong> acceleration, in m/s²</li>
    <li><strong>t:</strong> time, in seconds</li>
    <li><strong>s:</strong> displacement, in metres</li>
  </ul>

  <h3>Worked example 1: Finding final velocity</h3>
  <p>A cyclist travelling at 4 m/s accelerates uniformly at 2 m/s² for 3 seconds. Find the final velocity.</p>
  <p><strong>Step 1 — Identify the values:</strong> u = 4 m/s, a = 2 m/s², t = 3 s.</p>
  <p><strong>Step 2 — Choose the equation:</strong> v = u + at.</p>
  <p><strong>Step 3 — Substitute:</strong> v = 4 + (2 × 3).</p>
  <p><strong>Step 4 — Calculate:</strong> v = 4 + 6 = 10 m/s.</p>
  <p><strong>Answer:</strong> The final velocity is 10 m/s.</p>

  <h3>Worked example 2: Finding displacement</h3>
  <p>A vehicle starts from rest and accelerates uniformly at 3 m/s² for 4 seconds. Find its displacement.</p>
  <p>Known values: u = 0 m/s, a = 3 m/s², t = 4 s.</p>
  <p>Use s = ut + ½at².</p>
  <p>s = (0 × 4) + ½ × 3 × 4².</p>
  <p>s = 0 + 1.5 × 16 = 24 m.</p>
  <p><strong>Answer:</strong> The displacement is 24 m.</p>

  <h3>Worked example 3: Converting units first</h3>
  <p>A car travels at a constant speed of 72 km/h for 10 seconds. Find the distance travelled.</p>
  <p>Convert the speed: 72 ÷ 3.6 = 20 m/s.</p>
  <p>Use distance = speed × time.</p>
  <p>Distance = 20 × 10 = 200 m.</p>
  <p><strong>Answer:</strong> The car travels 200 m.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using a constant-acceleration equation when acceleration is not constant.</li>
    <li>Mixing km/h with m/s without converting.</li>
    <li>Using final velocity where initial velocity is required.</li>
    <li>Forgetting to square the time in an equation containing t².</li>
    <li>Giving a numerical answer without a unit.</li>
  </ul>
  `,
  [
    {
      q: "A runner has an initial velocity of 5 m/s and accelerates uniformly at 2 m/s² for 4 s. What is the final velocity?",
      hint: "Use the initial velocity, acceleration and time.",
      formula: "v = u + at",
      steps: [
        "Write u = 5 m/s, a = 2 m/s² and t = 4 s.",
        "Substitute into v = u + at.",
        "v = 5 + (2 × 4) = 13 m/s."
      ],
      ans: "13 m/s",
      final_check: "The velocity increases by 8 m/s, from 5 m/s to 13 m/s.",
      common_mistakes: ["Multiplying u by t", "Adding acceleration without multiplying by time"],
      explanation: "Uniform acceleration changes velocity by at = 2 × 4 = 8 m/s."
    },
    {
      q: "A bicycle starts from rest and accelerates uniformly at 2 m/s² for 5 s. Calculate its displacement.",
      hint: "Since it starts from rest, u = 0. Use an equation involving u, a and t.",
      formula: "s = ut + ½at²",
      steps: [
        "u = 0 m/s, a = 2 m/s², t = 5 s.",
        "s = (0 × 5) + ½ × 2 × 5².",
        "s = 25 m."
      ],
      ans: "25 m",
      final_check: "The result has units of metres, which is a unit of displacement.",
      common_mistakes: ["Using t instead of t²", "Treating the initial velocity as non-zero"],
      explanation: "The displacement from rest under constant acceleration is half the acceleration multiplied by time squared."
    },
    {
      q: "A vehicle travels at 54 km/h for 20 s at constant speed. How far does it travel?",
      hint: "Convert km/h to m/s by dividing by 3.6.",
      formula: "distance = speed × time",
      steps: [
        "Convert 54 km/h: 54 ÷ 3.6 = 15 m/s.",
        "Distance = 15 × 20.",
        "Distance = 300 m."
      ],
      ans: "300 m",
      final_check: "Speed is in m/s and time is in seconds, so the distance is in metres.",
      common_mistakes: ["Using 54 directly with seconds", "Dividing distance by time instead of multiplying"],
      explanation: "At constant speed, distance equals speed multiplied by elapsed time."
    },
    {
      q: "A car slows uniformly from 20 m/s to 8 m/s in 4 s. Calculate its acceleration.",
      hint: "Acceleration is the change in velocity divided by time.",
      formula: "a = (v - u) / t",
      steps: [
        "u = 20 m/s, v = 8 m/s, t = 4 s.",
        "a = (8 - 20) ÷ 4.",
        "a = -12 ÷ 4 = -3 m/s²."
      ],
      ans: "-3 m/s²",
      final_check: "The negative sign indicates acceleration opposite to the chosen positive direction.",
      common_mistakes: ["Subtracting final velocity from initial velocity in the wrong order", "Reporting only the magnitude"],
      explanation: "Velocity decreases by 12 m/s over 4 seconds, giving an acceleration of -3 m/s²."
    },
    {
      q: "A body starts from rest and accelerates uniformly at 4 m/s² until its velocity reaches 12 m/s. Find its displacement during this interval.",
      hint: "Time is not given. Choose an equation that does not contain time.",
      formula: "v² = u² + 2as",
      steps: [
        "u = 0 m/s, v = 12 m/s and a = 4 m/s².",
        "12² = 0² + 2 × 4 × s.",
        "144 = 8s.",
        "s = 18 m."
      ],
      ans: "18 m",
      final_check: "The units are metres and the displacement is positive in the direction of motion.",
      common_mistakes: ["Taking 12 as the initial velocity", "Forgetting to square v"],
      explanation: "The equation v² = u² + 2as links velocity, acceleration and displacement without requiring time."
    }
  ]
);

add(
  "physics",
  "motion_graphs",
  "Distance–Time Graphs",
  `
  <h2>Distance–Time Graphs</h2>

  <p>A distance–time graph shows how the total distance travelled changes with time. Time is normally placed on the horizontal axis, and distance on the vertical axis.</p>

  <h3>Reading the graph</h3>
  <ul>
    <li><strong>Horizontal axis:</strong> time, usually in seconds.</li>
    <li><strong>Vertical axis:</strong> distance, usually in metres.</li>
    <li><strong>Gradient:</strong> speed.</li>
    <li><strong>Horizontal line:</strong> the object is stationary because its distance from the starting point is not increasing.</li>
    <li><strong>Straight rising line:</strong> constant speed.</li>
    <li><strong>Steeper rising line:</strong> greater speed.</li>
  </ul>

  <p>The gradient is calculated using two points on the line:</p>
  <p><strong>Speed = change in distance ÷ change in time</strong></p>
  <p>In symbols: speed = (d₂ − d₁) ÷ (t₂ − t₁).</p>

  <h3>Worked example 1: Finding speed from a graph</h3>
  <p>A straight section of a distance–time graph goes from (0 s, 0 m) to (5 s, 20 m). Find the speed.</p>
  <p>Change in distance = 20 − 0 = 20 m.</p>
  <p>Change in time = 5 − 0 = 5 s.</p>
  <p>Speed = 20 ÷ 5 = 4 m/s.</p>
  <p><strong>Answer:</strong> 4 m/s.</p>

  <h3>Worked example 2: Recognising rest</h3>
  <p>Between 6 s and 10 s, a distance–time graph remains horizontal at 30 m.</p>
  <p>The distance does not change during this interval.</p>
  <p>Speed = (30 − 30) ÷ (10 − 6) = 0 ÷ 4 = 0 m/s.</p>
  <p><strong>Answer:</strong> The object is stationary for 4 seconds.</p>

  <h3>Worked example 3: Comparing two objects</h3>
  <p>Object A travels 12 m in 3 s. Object B travels 20 m in 5 s. Compare their speeds.</p>
  <p>Speed of A = 12 ÷ 3 = 4 m/s.</p>
  <p>Speed of B = 20 ÷ 5 = 4 m/s.</p>
  <p><strong>Answer:</strong> They have equal speeds, so their straight graph sections have equal gradients.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Reading the height of the graph as the speed.</li>
    <li>Calculating distance divided by time using the wrong interval.</li>
    <li>Assuming a horizontal distance–time line means constant motion rather than rest.</li>
    <li>Confusing a steeper gradient with a greater distance at that instant.</li>
  </ul>
  `,
  [
    {
      q: "A distance–time graph rises from 0 m at 0 s to 24 m at 6 s in a straight line. What is the speed?",
      hint: "Calculate the gradient by dividing the change in distance by the change in time.",
      formula: "speed = change in distance / change in time",
      steps: [
        "Change in distance = 24 − 0 = 24 m.",
        "Change in time = 6 − 0 = 6 s.",
        "Speed = 24 ÷ 6 = 4 m/s."
      ],
      ans: "4 m/s",
      final_check: "A straight line has a constant gradient, so the speed is constant.",
      common_mistakes: ["Dividing time by distance", "Reading 24 m as the speed"],
      explanation: "The gradient of a distance–time graph represents speed."
    },
    {
      q: "A distance–time graph is horizontal at 15 m from 2 s to 7 s. What is the speed during this interval?",
      hint: "The distance does not change. Find the change in distance first.",
      formula: "speed = change in distance / change in time",
      steps: [
        "Change in distance = 15 − 15 = 0 m.",
        "Change in time = 7 − 2 = 5 s.",
        "Speed = 0 ÷ 5 = 0 m/s."
      ],
      ans: "0 m/s",
      final_check: "No change in distance means the object is stationary.",
      common_mistakes: ["Using 15 m as the distance travelled during the interval", "Calling the object moving at constant speed"],
      explanation: "The horizontal line shows that the distance reading stays the same as time passes."
    },
    {
      q: "A straight distance–time graph passes through (2 s, 8 m) and (5 s, 20 m). Find the speed.",
      hint: "Use differences between the two points, not just one point.",
      formula: "speed = (d₂ - d₁) / (t₂ - t₁)",
      steps: [
        "Change in distance = 20 − 8 = 12 m.",
        "Change in time = 5 − 2 = 3 s.",
        "Speed = 12 ÷ 3 = 4 m/s."
      ],
      ans: "4 m/s",
      final_check: "The units are metres per second.",
      common_mistakes: ["Using 20 ÷ 5 without checking the selected interval", "Subtracting time from distance"],
      explanation: "The gradient is the change in vertical value divided by the change in horizontal value."
    },
    {
      q: "Two straight distance–time lines start at the origin. Line A reaches 10 m at 5 s. Line B reaches 18 m at 6 s. Which object is faster?",
      hint: "Calculate each line's gradient.",
      formula: "speed = distance / time",
      steps: [
        "Speed A = 10 ÷ 5 = 2 m/s.",
        "Speed B = 18 ÷ 6 = 3 m/s.",
        "Since 3 m/s is greater than 2 m/s, B is faster."
      ],
      ans: "Object B",
      final_check: "The steeper line belongs to the faster object.",
      common_mistakes: ["Choosing the object with the shorter travel time without considering distance", "Comparing only the final distances"],
      explanation: "Speed depends on both distance travelled and the time taken."
    },
    {
      q: "A distance–time graph rises in a straight line from 5 m at 2 s to 17 m at 6 s. What is the speed?",
      hint: "Subtract the starting values from the ending values.",
      formula: "speed = (d₂ - d₁) / (t₂ - t₁)",
      steps: [
        "Change in distance = 17 − 5 = 12 m.",
        "Change in time = 6 − 2 = 4 s.",
        "Speed = 12 ÷ 4 = 3 m/s."
      ],
      ans: "3 m/s",
      final_check: "Using the changes gives the gradient of the selected graph section.",
      common_mistakes: ["Calculating 17 ÷ 6", "Using 5 m as the distance travelled during the interval"],
      explanation: "For a graph section, speed is the change in distance divided by the elapsed time."
    }
  ]
);

add(
  "physics",
  "motion_graphs",
  "Displacement–Time Graphs",
  `
  <h2>Displacement–Time Graphs</h2>

  <p>A displacement–time graph shows an object's displacement from a chosen origin at different times. Unlike distance, displacement includes direction through its positive or negative sign.</p>

  <h3>What the gradient tells you</h3>
  <p><strong>Gradient of a displacement–time graph = velocity.</strong></p>
  <p>Average velocity = change in displacement ÷ change in time.</p>

  <ul>
    <li><strong>Positive gradient:</strong> positive velocity in the chosen direction.</li>
    <li><strong>Negative gradient:</strong> motion in the opposite direction.</li>
    <li><strong>Zero gradient:</strong> the object is stationary during that interval.</li>
    <li><strong>Straight sloping line:</strong> constant velocity.</li>
    <li><strong>Changing gradient:</strong> changing velocity.</li>
  </ul>

  <p>The graph's vertical position gives displacement, not velocity. Velocity is obtained from its gradient.</p>

  <h3>Worked example 1: Positive velocity</h3>
  <p>An object's displacement changes from 2 m at 1 s to 14 m at 4 s.</p>
  <p>Change in displacement = 14 − 2 = 12 m.</p>
  <p>Change in time = 4 − 1 = 3 s.</p>
  <p>Velocity = 12 ÷ 3 = +4 m/s.</p>
  <p><strong>Answer:</strong> +4 m/s.</p>

  <h3>Worked example 2: Negative velocity</h3>
  <p>An object moves from displacement +12 m at 2 s to +3 m at 5 s.</p>
  <p>Change in displacement = 3 − 12 = −9 m.</p>
  <p>Change in time = 5 − 2 = 3 s.</p>
  <p>Velocity = −9 ÷ 3 = −3 m/s.</p>
  <p><strong>Answer:</strong> −3 m/s. The object moves in the negative direction.</p>

  <h3>Worked example 3: Stationary interval</h3>
  <p>The displacement remains −4 m from 3 s to 8 s.</p>
  <p>Velocity = [−4 − (−4)] ÷ (8 − 3) = 0 ÷ 5 = 0 m/s.</p>
  <p><strong>Answer:</strong> The object is stationary at a displacement of −4 m during this interval.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the vertical displacement value as velocity.</li>
    <li>Ignoring the negative sign when displacement decreases.</li>
    <li>Confusing negative displacement with negative speed.</li>
    <li>Assuming a negative gradient means the object is slowing down. It indicates negative velocity; speed depends on the magnitude of velocity.</li>
  </ul>
  `,
  [
    {
      q: "Displacement changes from 0 m at 0 s to 15 m at 5 s along a straight line. What is the velocity?",
      hint: "Calculate the gradient of the displacement–time graph.",
      formula: "velocity = change in displacement / change in time",
      steps: [
        "Change in displacement = 15 − 0 = 15 m.",
        "Change in time = 5 − 0 = 5 s.",
        "Velocity = 15 ÷ 5 = +3 m/s."
      ],
      ans: "+3 m/s",
      final_check: "The positive gradient indicates motion in the positive direction.",
      common_mistakes: ["Using 15 m as the velocity", "Leaving out the time interval"],
      explanation: "Velocity is the gradient of a displacement–time graph."
    },
    {
      q: "An object's displacement changes from +10 m at 2 s to +2 m at 6 s. Calculate its average velocity.",
      hint: "The change in displacement may be negative.",
      formula: "average velocity = (s₂ - s₁) / (t₂ - t₁)",
      steps: [
        "Change in displacement = 2 − 10 = −8 m.",
        "Change in time = 6 − 2 = 4 s.",
        "Average velocity = −8 ÷ 4 = −2 m/s."
      ],
      ans: "-2 m/s",
      final_check: "The negative sign represents motion in the negative direction.",
      common_mistakes: ["Using 10 − 2 instead of 2 − 10", "Reporting +2 m/s"],
      explanation: "The displacement decreases by 8 m over 4 s, so the average velocity is negative."
    },
    {
      q: "A displacement–time graph is horizontal at −6 m between 4 s and 9 s. What is the velocity?",
      hint: "Calculate the change in displacement.",
      formula: "velocity = change in displacement / change in time",
      steps: [
        "Change in displacement = −6 − (−6) = 0 m.",
        "Change in time = 9 − 4 = 5 s.",
        "Velocity = 0 ÷ 5 = 0 m/s."
      ],
      ans: "0 m/s",
      final_check: "The object remains at the same position relative to the origin.",
      common_mistakes: ["Calling the velocity −6 m/s", "Assuming negative displacement means movement"],
      explanation: "The graph is horizontal, so its gradient and the velocity are zero."
    },
    {
      q: "Which graph feature indicates constant negative velocity on a displacement–time graph?",
      hint: "Constant velocity requires a constant gradient; negative velocity requires a negative gradient.",
      steps: [
        "A straight line has a constant gradient.",
        "A line sloping downward as time increases has a negative gradient.",
        "Therefore, a straight downward-sloping line indicates constant negative velocity."
      ],
      ans: "A straight line with a negative gradient",
      final_check: "The line must be straight and slope downward from left to right.",
      common_mistakes: ["Choosing a horizontal line", "Choosing any curved downward section"],
      explanation: "A straight line gives constant velocity, and its negative gradient gives the direction."
    },
    {
      q: "A displacement–time graph passes through (1 s, −2 m) and (5 s, +10 m) on a straight section. Find the velocity.",
      hint: "Subtract the initial displacement, including its sign, from the final displacement.",
      formula: "velocity = (s₂ - s₁) / (t₂ - t₁)",
      steps: [
        "Change in displacement = 10 − (−2) = 12 m.",
        "Change in time = 5 − 1 = 4 s.",
        "Velocity = 12 ÷ 4 = +3 m/s."
      ],
      ans: "+3 m/s",
      final_check: "Subtracting a negative value is equivalent to adding its magnitude.",
      common_mistakes: ["Calculating 10 − 2", "Forgetting to include the starting time"],
      explanation: "The displacement increases by 12 m in 4 s, giving a positive velocity of 3 m/s."
    }
  ]
);

add(
  "physics",
  "motion_graphs",
  "Speed–Time Graphs",
  `
  <h2>Speed–Time Graphs</h2>

  <p>A speed–time graph shows how an object's speed changes with time. Time is placed on the horizontal axis and speed on the vertical axis.</p>

  <h3>Two important features</h3>
  <ul>
    <li><strong>Gradient:</strong> the rate of change of speed. For motion along a fixed direction without reversal, this gives the magnitude of acceleration.</li>
    <li><strong>Area under the graph:</strong> distance travelled, because speed is never negative.</li>
  </ul>

  <p>For a straight graph section, gradient = change in speed ÷ change in time.</p>
  <p>For a rectangular area, distance = base × height = time × speed.</p>
  <p>For a triangular area, distance = ½ × base × height.</p>

  <h3>Worked example 1: Distance at constant speed</h3>
  <p>A vehicle travels at 6 m/s for 5 s. The speed–time graph is a horizontal line at 6 m/s.</p>
  <p>Area = 5 × 6 = 30 m.</p>
  <p><strong>Answer:</strong> 30 m travelled.</p>

  <h3>Worked example 2: Distance while accelerating from rest</h3>
  <p>A body increases speed uniformly from 0 to 8 m/s over 4 s.</p>
  <p>The area under the graph is a triangle.</p>
  <p>Distance = ½ × base × height.</p>
  <p>Distance = ½ × 4 × 8 = 16 m.</p>
  <p><strong>Answer:</strong> 16 m.</p>

  <h3>Worked example 3: Finding the rate of change of speed</h3>
  <p>Speed increases from 3 m/s to 15 m/s in 4 s.</p>
  <p>Gradient = (15 − 3) ÷ 4 = 12 ÷ 4 = 3 m/s².</p>
  <p><strong>Answer:</strong> The speed increases at 3 m/s².</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the gradient to calculate distance.</li>
    <li>Using the area under the graph to calculate acceleration.</li>
    <li>Forgetting the factor ½ for a triangular area.</li>
    <li>Using the final speed alone as the distance travelled.</li>
  </ul>
  `,
  [
    {
      q: "A vehicle travels at a constant speed of 7 m/s for 6 s. Find the distance represented by the area under its speed–time graph.",
      hint: "The area is a rectangle.",
      formula: "distance = speed × time",
      steps: [
        "Rectangle height = 7 m/s.",
        "Rectangle base = 6 s.",
        "Distance = 7 × 6 = 42 m."
      ],
      ans: "42 m",
      final_check: "The units (m/s) × s simplify to metres.",
      common_mistakes: ["Adding speed and time", "Using the graph's gradient as distance"],
      explanation: "The area under a speed–time graph gives the distance travelled."
    },
    {
      q: "A body accelerates uniformly from 0 m/s to 10 m/s in 4 s. Calculate the distance travelled.",
      hint: "The area under the graph is triangular.",
      formula: "distance = ½ × base × height",
      steps: [
        "Base = 4 s and height = 10 m/s.",
        "Distance = ½ × 4 × 10.",
        "Distance = 20 m."
      ],
      ans: "20 m",
      final_check: "The triangle's area gives the distance travelled during acceleration.",
      common_mistakes: ["Calculating 4 × 10 without halving", "Using the final speed as the distance"],
      explanation: "The triangular area represents the accumulated distance as speed rises from zero."
    },
    {
      q: "Speed increases from 4 m/s to 16 m/s over 3 s. Find the gradient of the speed–time graph.",
      hint: "Gradient is the change in speed divided by the elapsed time.",
      formula: "gradient = (v₂ - v₁) / time",
      steps: [
        "Change in speed = 16 − 4 = 12 m/s.",
        "Elapsed time = 3 s.",
        "Gradient = 12 ÷ 3 = 4 m/s²."
      ],
      ans: "4 m/s²",
      final_check: "The gradient's unit is (m/s)/s = m/s².",
      common_mistakes: ["Dividing 16 by 4", "Giving the answer in m/s"],
      explanation: "The graph gradient measures how quickly speed changes."
    },
    {
      q: "A speed–time graph is horizontal at 5 m/s from 2 s to 8 s. How far does the object travel during this interval?",
      hint: "Use the width of this interval, not the total time shown on the clock.",
      formula: "distance = speed × elapsed time",
      steps: [
        "Elapsed time = 8 − 2 = 6 s.",
        "Distance = 5 × 6.",
        "Distance = 30 m."
      ],
      ans: "30 m",
      final_check: "Only the six-second interval is counted.",
      common_mistakes: ["Multiplying by 8 s", "Assuming a horizontal graph means the object is stationary"],
      explanation: "A horizontal speed–time line means constant speed, not zero speed."
    },
    {
      q: "A body slows uniformly from 12 m/s to 0 m/s over 6 s. What distance does it travel before stopping?",
      hint: "The area under the graph is a triangle with base 6 s and height 12 m/s.",
      formula: "distance = ½ × base × height",
      steps: [
        "Base = 6 s and height = 12 m/s.",
        "Distance = ½ × 6 × 12.",
        "Distance = 36 m."
      ],
      ans: "36 m",
      final_check: "The object still travels while its speed decreases to zero.",
      common_mistakes: ["Assuming slowing down means zero distance", "Using 12 × 6 without accounting for the changing speed"],
      explanation: "The triangular area gives the total distance travelled while slowing uniformly."
    }
  ]
);

add(
  "physics",
  "motion_graphs",
  "Velocity–Time Graphs",
  `
  <h2>Velocity–Time Graphs</h2>

  <p>A velocity–time graph shows how velocity changes with time. Velocity includes direction, so it can be positive, zero or negative.</p>

  <h3>Gradient gives acceleration</h3>
  <p><strong>Acceleration = change in velocity ÷ change in time.</strong></p>
  <ul>
    <li>Positive gradient: positive acceleration.</li>
    <li>Negative gradient: negative acceleration.</li>
    <li>Zero gradient: constant velocity.</li>
  </ul>

  <h3>Signed area gives displacement</h3>
  <p>The area between the velocity–time graph and the time axis represents displacement. Area above the time axis is positive; area below it is negative. Add the signed areas to find total displacement.</p>
  <p>Total distance is different: add the magnitudes of the areas above and below the axis.</p>

  <h3>Worked example 1: Acceleration</h3>
  <p>Velocity changes from 2 m/s to 14 m/s over 4 s.</p>
  <p>Acceleration = (14 − 2) ÷ 4 = 12 ÷ 4 = 3 m/s².</p>
  <p><strong>Answer:</strong> +3 m/s².</p>

  <h3>Worked example 2: Displacement during constant velocity</h3>
  <p>An object has a constant velocity of 5 m/s for 6 s.</p>
  <p>Displacement = area = 5 × 6 = 30 m.</p>
  <p><strong>Answer:</strong> +30 m.</p>

  <h3>Worked example 3: Negative displacement</h3>
  <p>An object moves at −4 m/s for 3 s.</p>
  <p>Displacement = velocity × time = −4 × 3 = −12 m.</p>
  <p><strong>Answer:</strong> −12 m. The distance travelled is 12 m.</p>

  <h3>Worked example 4: Changing velocity</h3>
  <p>Velocity rises uniformly from 0 to 8 m/s over 4 s.</p>
  <p>Displacement = triangular area = ½ × 4 × 8 = 16 m.</p>
  <p><strong>Answer:</strong> +16 m.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the graph's height to calculate acceleration.</li>
    <li>Ignoring negative areas when calculating displacement.</li>
    <li>Confusing total distance with displacement.</li>
    <li>Assuming a negative velocity automatically means negative acceleration.</li>
  </ul>
  `,
  [
    {
      q: "Velocity increases from 3 m/s to 15 m/s in 4 s. Calculate the acceleration.",
      hint: "Find the change in velocity and divide by time.",
      formula: "a = (v - u) / t",
      steps: [
        "Change in velocity = 15 − 3 = 12 m/s.",
        "Time = 4 s.",
        "Acceleration = 12 ÷ 4 = +3 m/s²."
      ],
      ans: "+3 m/s²",
      final_check: "The velocity is increasing in the positive direction.",
      common_mistakes: ["Dividing the final velocity by the initial velocity", "Giving the answer in m/s"],
      explanation: "Acceleration is the gradient of a velocity–time graph."
    },
    {
      q: "A body has a constant velocity of −6 m/s for 5 s. Calculate its displacement.",
      hint: "Multiply velocity by time and preserve the sign.",
      formula: "displacement = velocity × time",
      steps: [
        "Velocity = −6 m/s and time = 5 s.",
        "Displacement = −6 × 5.",
        "Displacement = −30 m."
      ],
      ans: "-30 m",
      final_check: "The negative sign shows displacement in the negative direction.",
      common_mistakes: ["Reporting +30 m", "Confusing displacement with distance"],
      explanation: "The signed area below the time axis represents negative displacement."
    },
    {
      q: "Velocity increases uniformly from 0 to 12 m/s in 6 s. Find the displacement.",
      hint: "Calculate the triangular area under the velocity–time graph.",
      formula: "displacement = ½ × base × height",
      steps: [
        "Base = 6 s and height = 12 m/s.",
        "Displacement = ½ × 6 × 12.",
        "Displacement = +36 m."
      ],
      ans: "+36 m",
      final_check: "The graph lies above the time axis, so the displacement is positive.",
      common_mistakes: ["Using the gradient instead of the area", "Forgetting to halve the triangular area"],
      explanation: "The signed area under a velocity–time graph gives displacement."
    },
    {
      q: "An object moves at +5 m/s for 4 s, then at −2 m/s for 3 s. What is its total displacement?",
      hint: "Calculate each interval's signed displacement, then add them.",
      formula: "total displacement = sum of signed areas",
      steps: [
        "First interval: +5 × 4 = +20 m.",
        "Second interval: −2 × 3 = −6 m.",
        "Total displacement = 20 − 6 = +14 m."
      ],
      ans: "+14 m",
      final_check: "The net displacement is positive because the positive displacement is larger.",
      common_mistakes: ["Adding 20 m and 6 m as if both were positive", "Reporting total distance instead"],
      explanation: "Displacement includes direction, so the second interval contributes a negative value."
    },
    {
      q: "A velocity–time graph is horizontal at +7 m/s from 1 s to 5 s. What is the acceleration during this interval?",
      hint: "A horizontal line has zero gradient.",
      formula: "a = change in velocity / change in time",
      steps: [
        "Initial velocity = +7 m/s.",
        "Final velocity = +7 m/s.",
        "Acceleration = (7 − 7) ÷ (5 − 1) = 0 m/s²."
      ],
      ans: "0 m/s²",
      final_check: "The velocity is constant during the interval.",
      common_mistakes: ["Calling acceleration 7 m/s²", "Assuming the object must be at rest"],
      explanation: "Constant velocity means zero acceleration, even when the object is moving."
    }
  ]
);

add(
  "physics",
  "motion_graphs",
  "Interpreting Motion Graphs",
  `
  <h2>Interpreting Motion Graphs</h2>

  <p>Interpreting a motion graph means identifying the motion represented by each section, calculating quantities from the correct graph feature, and distinguishing what the graph shows from what it does not show.</p>

  <h3>Identify the graph first</h3>
  <ul>
    <li><strong>Distance–time:</strong> gradient gives speed; horizontal sections show rest.</li>
    <li><strong>Displacement–time:</strong> gradient gives velocity; negative gradients show motion in the negative direction.</li>
    <li><strong>Speed–time:</strong> gradient gives the rate of change of speed; area gives distance.</li>
    <li><strong>Velocity–time:</strong> gradient gives acceleration; signed area gives displacement.</li>
  </ul>

  <h3>Read sections in order</h3>
  <ol>
    <li>Check the axis labels and units.</li>
    <li>Identify the time interval being discussed.</li>
    <li>Determine whether the graph is rising, falling, horizontal or curved.</li>
    <li>Choose the relevant feature: gradient, area or vertical value.</li>
    <li>Calculate using the correct interval and state the unit.</li>
  </ol>

  <h3>Worked example 1: Distance–time interpretation</h3>
  <p>A distance–time graph rises from 0 m to 12 m during the first 3 s, then remains at 12 m until 5 s.</p>
  <p>First section: speed = 12 ÷ 3 = 4 m/s.</p>
  <p>Second section: distance is unchanged, so speed = 0 m/s.</p>
  <p><strong>Conclusion:</strong> The object moves at constant speed for 3 s and then rests for 2 s.</p>

  <h3>Worked example 2: Velocity–time interpretation</h3>
  <p>A velocity–time graph shows +4 m/s from 0 to 3 s and −2 m/s from 3 to 5 s.</p>
  <p>First displacement = +4 × 3 = +12 m.</p>
  <p>Second displacement = −2 × 2 = −4 m.</p>
  <p>Total displacement = 12 − 4 = +8 m.</p>
  <p>Total distance = 12 + 4 = 16 m.</p>
  <p><strong>Conclusion:</strong> The object travels 16 m, but its net displacement is +8 m.</p>

  <h3>Worked example 3: Identifying acceleration</h3>
  <p>A velocity–time graph rises in a straight line from 2 m/s at 1 s to 10 m/s at 5 s.</p>
  <p>Acceleration = (10 − 2) ÷ (5 − 1) = 8 ÷ 4 = 2 m/s².</p>
  <p><strong>Conclusion:</strong> The object has constant positive acceleration of 2 m/s² during this section.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the same calculation for every type of motion graph.</li>
    <li>Confusing a falling graph with a stationary object.</li>
    <li>Ignoring axis labels and units.</li>
    <li>Calling total distance and displacement the same quantity.</li>
    <li>Assuming a curved line always means the object is speeding up; inspect the gradient over time.</li>
  </ul>
  `,
  [
    {
      q: "A distance–time graph rises from 0 m to 18 m during the first 6 s, then stays horizontal from 6 s to 9 s. How long is the object stationary?",
      hint: "Find the duration of the horizontal section.",
      steps: [
        "The horizontal section starts at 6 s.",
        "It ends at 9 s.",
        "Duration = 9 − 6 = 3 s."
      ],
      ans: "3 s",
      final_check: "A horizontal distance–time section represents zero speed.",
      common_mistakes: ["Answering 9 s", "Calculating the speed of the first section"],
      explanation: "The object is stationary for the duration of the horizontal section."
    },
    {
      q: "A velocity–time graph shows +3 m/s for 4 s, followed by −3 m/s for 2 s. Find the total displacement.",
      hint: "Treat each interval's area as signed.",
      formula: "displacement = velocity × time for each constant-velocity section",
      steps: [
        "First displacement = +3 × 4 = +12 m.",
        "Second displacement = −3 × 2 = −6 m.",
        "Total displacement = 12 − 6 = +6 m."
      ],
      ans: "+6 m",
      final_check: "The positive interval lasts longer, so the net displacement is positive.",
      common_mistakes: ["Adding both distances as positive", "Using only the last interval"],
      explanation: "Total displacement is the algebraic sum of the signed areas under the velocity–time graph."
    },
    {
      q: "Which quantity is found from the gradient of a velocity–time graph?",
      hint: "Think about what change in velocity per unit time measures.",
      steps: [
        "The gradient is change in vertical value divided by change in horizontal value.",
        "For a velocity–time graph, this is change in velocity divided by time.",
        "That quantity is acceleration."
      ],
      ans: "Acceleration",
      final_check: "Its SI unit is m/s².",
      common_mistakes: ["Choosing displacement", "Choosing distance"],
      explanation: "Acceleration is the gradient of a velocity–time graph."
    },
    {
      q: "A speed–time graph shows a constant speed of 8 m/s for 5 s. Which calculation gives the distance travelled?",
      hint: "Use the area of the rectangle under the speed–time graph.",
      formula: "distance = speed × time",
      steps: [
        "The graph section forms a rectangle.",
        "Area = 8 × 5.",
        "Distance = 40 m."
      ],
      ans: "40 m",
      final_check: "The area has units of metres.",
      common_mistakes: ["Using 8 ÷ 5", "Using the graph's gradient"],
      explanation: "For a speed–time graph, the area under the graph represents distance travelled."
    },
    {
      q: "A displacement–time graph slopes downward in a straight line as time increases. What does this indicate?",
      hint: "The gradient is constant and negative.",
      steps: [
        "A straight line indicates a constant gradient.",
        "A downward slope means the gradient is negative.",
        "The gradient represents velocity."
      ],
      ans: "Constant negative velocity",
      final_check: "A negative gradient indicates motion in the negative direction, not necessarily slowing down.",
      common_mistakes: ["Calling the object stationary", "Assuming it must be decelerating"],
      explanation: "The slope of a displacement–time graph gives velocity; a straight negative slope gives constant negative velocity."
    }
  ]
);

add(
  "equations_of_linear_motion",
  "Uniform Motion",
  `
  <h2>Uniform Motion</h2>

  <p>Uniform motion occurs when an object moves with constant velocity. Its speed and direction remain unchanged, so its acceleration is zero.</p>

  <p>If an object moves in a straight line at constant speed, the distance travelled is:</p>
  <p><strong>distance = speed × time</strong></p>

  <p>For constant velocity, displacement is:</p>
  <p><strong>displacement = velocity × time</strong></p>

  <p>Distance is a scalar quantity and cannot be negative. Displacement includes direction and may be positive, negative or zero.</p>

  <h3>Worked example 1: Distance at constant speed</h3>
  <p>A bus travels at a constant speed of 15 m/s for 12 s. Find the distance travelled.</p>
  <p>Distance = speed × time.</p>
  <p>Distance = 15 × 12 = 180 m.</p>
  <p><strong>Answer:</strong> 180 m.</p>

  <h3>Worked example 2: Finding time</h3>
  <p>A student walks 600 m at a constant speed of 2 m/s. Find the time taken.</p>
  <p>Time = distance ÷ speed.</p>
  <p>Time = 600 ÷ 2 = 300 s.</p>
  <p><strong>Answer:</strong> 300 s, or 5 minutes.</p>

  <h3>Worked example 3: Constant velocity with direction</h3>
  <p>A trolley moves at a constant velocity of −3 m/s for 4 s. Find its displacement.</p>
  <p>Displacement = velocity × time.</p>
  <p>Displacement = −3 × 4 = −12 m.</p>
  <p><strong>Answer:</strong> −12 m.</p>

  <h3>Recognising uniform motion</h3>
  <ul>
    <li>A straight distance–time graph with constant positive gradient indicates constant speed.</li>
    <li>A straight displacement–time graph with constant gradient indicates constant velocity.</li>
    <li>A velocity–time graph that is horizontal indicates constant velocity and zero acceleration.</li>
  </ul>

  <h3>Common mistakes</h3>
  <ul>
    <li>Assuming constant speed always means constant velocity; direction must also stay the same.</li>
    <li>Using distance when the question asks for displacement.</li>
    <li>Mixing hours with seconds without converting units.</li>
    <li>Assuming uniform motion means the object is stationary.</li>
  </ul>
  `,
  [
    {
      q: "A train moves at a constant speed of 20 m/s for 15 s. Find the distance travelled.",
      hint: "Multiply speed by time.",
      formula: "distance = speed × time",
      steps: [
        "Speed = 20 m/s and time = 15 s.",
        "Distance = 20 × 15.",
        "Distance = 300 m."
      ],
      ans: "300 m",
      final_check: "The unit is metres.",
      common_mistakes: ["Dividing speed by time", "Using 15 as the speed"],
      explanation: "At constant speed, the distance travelled equals speed multiplied by time."
    },
    {
      q: "A cyclist covers 450 m at a constant speed of 5 m/s. Calculate the time taken.",
      hint: "Rearrange distance = speed × time to make time the subject.",
      formula: "time = distance / speed",
      steps: [
        "Distance = 450 m and speed = 5 m/s.",
        "Time = 450 ÷ 5.",
        "Time = 90 s."
      ],
      ans: "90 s",
      final_check: "Distance divided by speed gives seconds.",
      common_mistakes: ["Multiplying 450 by 5", "Giving the answer in metres"],
      explanation: "The time taken is the distance divided by the constant speed."
    },
    {
      q: "An object moves at a constant velocity of −4 m/s for 7 s. What is its displacement?",
      hint: "Keep the negative sign when multiplying velocity by time.",
      formula: "displacement = velocity × time",
      steps: [
        "Velocity = −4 m/s and time = 7 s.",
        "Displacement = −4 × 7.",
        "Displacement = −28 m."
      ],
      ans: "-28 m",
      final_check: "The negative sign indicates displacement in the negative direction.",
      common_mistakes: ["Reporting +28 m", "Calling displacement distance"],
      explanation: "Constant velocity multiplied by time gives signed displacement."
    },
    {
      q: "Which condition must remain unchanged for an object to have uniform velocity?",
      hint: "Velocity describes both how fast and in which direction an object moves.",
      steps: [
        "Velocity includes speed and direction.",
        "Uniform velocity means velocity remains constant.",
        "Therefore, both speed and direction must remain unchanged."
      ],
      ans: "Both speed and direction",
      final_check: "An object moving around a circle at constant speed does not have constant velocity because its direction changes.",
      common_mistakes: ["Choosing speed alone", "Choosing direction alone"],
      explanation: "A change in either speed or direction changes velocity."
    },
    {
      q: "A vehicle moves at a constant speed of 72 km/h for 25 s. Find the distance travelled in metres.",
      hint: "Convert the speed to m/s before multiplying by time.",
      formula: "speed in m/s = speed in km/h ÷ 3.6",
      steps: [
        "Convert speed: 72 ÷ 3.6 = 20 m/s.",
        "Distance = 20 × 25.",
        "Distance = 500 m."
      ],
      ans: "500 m",
      final_check: "Using m/s and seconds gives distance in metres.",
      common_mistakes: ["Multiplying 72 by 25 directly", "Dividing by 25"],
      explanation: "Convert the speed to compatible units before applying distance = speed × time."
    }
  ]
);

add(
  "equations_of_linear_motion",
  "Uniform Acceleration",
  `
  <h2>Uniform Acceleration</h2>

  <p>Uniform acceleration means velocity changes by equal amounts in equal time intervals. Acceleration is constant in magnitude and direction throughout the interval.</p>

  <p>Acceleration is calculated using:</p>
  <p><strong>a = (v − u) ÷ t</strong></p>
  <ul>
    <li><strong>u:</strong> initial velocity</li>
    <li><strong>v:</strong> final velocity</li>
    <li><strong>t:</strong> elapsed time</li>
    <li><strong>a:</strong> constant acceleration</li>
  </ul>

  <p>Rearranging gives the first equation of linear motion:</p>
  <p><strong>v = u + at</strong></p>

  <p>Positive acceleration means velocity changes in the positive direction under the chosen sign convention. Negative acceleration means acceleration points in the negative direction. Whether an object speeds up or slows down depends on the relationship between velocity and acceleration.</p>

  <h3>Worked example 1: Speeding up</h3>
  <p>A car increases its velocity from 6 m/s to 18 m/s in 4 s. Find its acceleration.</p>
  <p>a = (v − u) ÷ t.</p>
  <p>a = (18 − 6) ÷ 4 = 12 ÷ 4 = 3 m/s².</p>
  <p><strong>Answer:</strong> +3 m/s².</p>

  <h3>Worked example 2: Slowing down</h3>
  <p>A bicycle moving at 12 m/s slows uniformly to 4 m/s in 2 s.</p>
  <p>a = (4 − 12) ÷ 2 = −8 ÷ 2 = −4 m/s².</p>
  <p><strong>Answer:</strong> −4 m/s².</p>

  <h3>Worked example 3: Finding final velocity</h3>
  <p>A trolley starts at 3 m/s and accelerates uniformly at 2 m/s² for 5 s.</p>
  <p>v = u + at.</p>
  <p>v = 3 + (2 × 5) = 13 m/s.</p>
  <p><strong>Answer:</strong> 13 m/s.</p>

  <h3>Worked example 4: Velocity in the negative direction</h3>
  <p>An object has initial velocity −10 m/s and acceleration +2 m/s² for 3 s.</p>
  <p>v = −10 + (2 × 3) = −4 m/s.</p>
  <p><strong>Answer:</strong> −4 m/s. The object is still moving in the negative direction, but its velocity is becoming less negative.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using u − v instead of v − u.</li>
    <li>Assuming every negative acceleration means slowing down.</li>
    <li>Using the equations of linear motion when acceleration is changing.</li>
    <li>Confusing acceleration in m/s² with velocity in m/s.</li>
  </ul>
  `,
  [
    {
      q: "A car increases its velocity from 4 m/s to 16 m/s in 3 s. Calculate its uniform acceleration.",
      hint: "Subtract initial velocity from final velocity, then divide by time.",
      formula: "a = (v - u) / t",
      steps: [
        "u = 4 m/s, v = 16 m/s and t = 3 s.",
        "a = (16 − 4) ÷ 3.",
        "a = 12 ÷ 3 = +4 m/s²."
      ],
      ans: "+4 m/s²",
      final_check: "Velocity increases in the positive direction.",
      common_mistakes: ["Dividing 16 by 4", "Using the unit m/s"],
      explanation: "Acceleration measures the change in velocity per second."
    },
    {
      q: "A bus slows uniformly from 25 m/s to 10 m/s in 5 s. Find its acceleration.",
      hint: "Final velocity is smaller than initial velocity, so the result will be negative if forward is positive.",
      formula: "a = (v - u) / t",
      steps: [
        "u = 25 m/s, v = 10 m/s and t = 5 s.",
        "a = (10 − 25) ÷ 5.",
        "a = −15 ÷ 5 = −3 m/s²."
      ],
      ans: "-3 m/s²",
      final_check: "The negative sign is consistent with a decrease in forward velocity.",
      common_mistakes: ["Reversing the subtraction", "Reporting +3 m/s²"],
      explanation: "The velocity changes by −15 m/s over 5 seconds."
    },
    {
      q: "A body starts at 2 m/s and accelerates uniformly at 3 m/s² for 4 s. Find its final velocity.",
      hint: "Use the equation that connects initial velocity, acceleration, time and final velocity.",
      formula: "v = u + at",
      steps: [
        "u = 2 m/s, a = 3 m/s² and t = 4 s.",
        "v = 2 + (3 × 4).",
        "v = 14 m/s."
      ],
      ans: "14 m/s",
      final_check: "The velocity increases by 12 m/s from its initial value.",
      common_mistakes: ["Multiplying u by t", "Adding acceleration only once"],
      explanation: "The velocity change is at = 3 × 4 = 12 m/s."
    },
    {
      q: "An object moves at −12 m/s with an acceleration of +3 m/s² for 2 s. What is its final velocity?",
      hint: "Use signed values in v = u + at.",
      formula: "v = u + at",
      steps: [
        "u = −12 m/s, a = +3 m/s² and t = 2 s.",
        "v = −12 + (3 × 2).",
        "v = −12 + 6 = −6 m/s."
      ],
      ans: "-6 m/s",
      final_check: "The final velocity remains negative, so the object still moves in the negative direction.",
      common_mistakes: ["Changing the initial velocity to positive", "Adding 12 and 6"],
      explanation: "Positive acceleration makes the negative velocity less negative during this interval."
    },
    {
      q: "What condition must be satisfied before using the standard equations of linear motion involving u, v, a, s and t?",
      hint: "These equations assume a particular behaviour of acceleration.",
      steps: [
        "The equations relate initial velocity, final velocity, displacement, time and acceleration.",
        "Their standard form assumes acceleration is constant.",
        "The quantities must also use consistent units and signed directions."
      ],
      ans: "Acceleration must be constant",
      final_check: "If acceleration varies, these equations cannot generally be applied directly over the whole interval.",
      common_mistakes: ["Assuming any motion can use SUVAT", "Ignoring units and direction"],
      explanation: "The standard SUVAT equations are derived for motion with constant acceleration."
    }
  ]
);

add(
  "equations_of_linear_motion",
  "Selecting the Correct Motion Equation",
  `
  <h2>Selecting the Correct Motion Equation</h2>

  <p>The SUVAT equations describe straight-line motion with constant acceleration. The most efficient way to choose an equation is to identify the known quantities, the unknown quantity, and the quantity that is missing.</p>

  <h3>The five equations</h3>
  <ul>
    <li><strong>v = u + at</strong></li>
    <li><strong>s = ½(u + v)t</strong></li>
    <li><strong>s = ut + ½at²</strong></li>
    <li><strong>v² = u² + 2as</strong></li>
    <li><strong>s = vt − ½at²</strong></li>
  </ul>

  <h3>What the symbols mean</h3>
  <ul>
    <li><strong>u:</strong> initial velocity (m/s)</li>
    <li><strong>v:</strong> final velocity (m/s)</li>
    <li><strong>a:</strong> constant acceleration (m/s²)</li>
    <li><strong>t:</strong> time (s)</li>
    <li><strong>s:</strong> displacement (m)</li>
  </ul>

  <h3>Choosing by the missing quantity</h3>
  <ul>
    <li>Missing v, with u, a and t known: use v = u + at.</li>
    <li>Missing s, with u, a and t known: use s = ut + ½at².</li>
    <li>Missing s, with u, v and t known: use s = ½(u + v)t.</li>
    <li>Missing s, with u, v and a known but no time: use v² = u² + 2as.</li>
    <li>Missing s, with v, a and t known: use s = vt − ½at².</li>
  </ul>

  <p>Do not select an equation just because it looks familiar. First confirm that the question describes constant acceleration and that the equation contains the known quantities and the unknown.</p>

  <h3>Worked example 1: Time is given</h3>
  <p>A body starts at 5 m/s and accelerates uniformly at 2 m/s² for 4 s. Find its final velocity.</p>
  <p>Known: u, a and t. Unknown: v.</p>
  <p>Choose v = u + at.</p>
  <p>v = 5 + (2 × 4) = 13 m/s.</p>

  <h3>Worked example 2: Time is not given</h3>
  <p>A vehicle changes velocity from 4 m/s to 12 m/s at a constant acceleration of 2 m/s². Find its displacement.</p>
  <p>Known: u, v and a. Unknown: s. Time is not given.</p>
  <p>Choose v² = u² + 2as.</p>
  <p>12² = 4² + 2 × 2 × s.</p>
  <p>144 = 16 + 4s.</p>
  <p>128 = 4s, so s = 32 m.</p>

  <h3>Worked example 3: Initial and final velocities are known</h3>
  <p>A vehicle accelerates uniformly from 6 m/s to 14 m/s over 5 s. Find the displacement.</p>
  <p>Known: u, v and t. Unknown: s.</p>
  <p>Choose s = ½(u + v)t.</p>
  <p>s = ½(6 + 14) × 5.</p>
  <p>s = 10 × 5 = 50 m.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using SUVAT when acceleration is not constant.</li>
    <li>Confusing displacement s with speed or distance.</li>
    <li>Choosing an equation that contains another unknown quantity.</li>
    <li>Forgetting to square velocities in v² = u² + 2as.</li>
    <li>Ignoring the sign of velocity or acceleration.</li>
  </ul>
  `,
  [
    {
      q: "A body has u = 6 m/s, a = 2 m/s² and t = 5 s. Which equation directly finds its final velocity?",
      hint: "Choose the equation containing u, a and t but not displacement.",
      formula: "v = u + at",
      steps: [
        "Known quantities are u, a and t.",
        "The required quantity is v.",
        "Use v = u + at."
      ],
      ans: "v = u + at",
      final_check: "The equation uses all three known values and the required unknown.",
      common_mistakes: ["Choosing an equation that requires displacement", "Using v² = u² + 2as when s is unknown"],
      explanation: "This equation directly connects initial velocity, acceleration, elapsed time and final velocity."
    },
    {
      q: "A vehicle has u = 3 m/s, v = 15 m/s and a = 3 m/s². Which equation finds displacement without first calculating time?",
      hint: "Choose an equation containing u, v, a and s but no t.",
      formula: "v² = u² + 2as",
      steps: [
        "Known quantities are u, v and a.",
        "Time is not supplied and need not be found.",
        "Use v² = u² + 2as."
      ],
      ans: "v² = u² + 2as",
      final_check: "This equation contains no time variable.",
      common_mistakes: ["Choosing s = ½(u + v)t", "Choosing an equation that still requires time"],
      explanation: "The equation links velocity, acceleration and displacement directly."
    },
    {
      q: "A body has u = 4 m/s, a = 2 m/s² and t = 3 s. Which equation directly finds displacement?",
      hint: "Look for the equation containing initial velocity, acceleration and time.",
      formula: "s = ut + ½at²",
      steps: [
        "Known quantities are u, a and t.",
        "The required quantity is displacement s.",
        "Choose s = ut + ½at²."
      ],
      ans: "s = ut + ½at²",
      final_check: "The equation uses the known values without requiring final velocity.",
      common_mistakes: ["Using v = u + at when displacement is required", "Forgetting t²"],
      explanation: "This equation calculates displacement from initial velocity, constant acceleration and time."
    },
    {
      q: "A vehicle has u = 8 m/s, v = 20 m/s and t = 4 s. Which equation directly finds displacement?",
      hint: "The initial velocity, final velocity and time are all known.",
      formula: "s = ½(u + v)t",
      steps: [
        "Known quantities are u, v and t.",
        "The required quantity is s.",
        "Choose s = ½(u + v)t."
      ],
      ans: "s = ½(u + v)t",
      final_check: "This equation uses the average of initial and final velocities for constant acceleration.",
      common_mistakes: ["Using s = ut + ½at² when acceleration is not given", "Forgetting the factor ½"],
      explanation: "For constant acceleration, average velocity equals half the sum of the initial and final velocities."
    },
    {
      q: "A body has final velocity v = 10 m/s, acceleration a = 2 m/s² and time t = 3 s. Which equation finds displacement without needing initial velocity?",
      hint: "Choose the equation involving final velocity, acceleration, time and displacement.",
      formula: "s = vt − ½at²",
      steps: [
        "Known quantities are v, a and t.",
        "Initial velocity u is not supplied.",
        "Use s = vt − ½at²."
      ],
      ans: "s = vt − ½at²",
      final_check: "The selected equation does not contain u.",
      common_mistakes: ["Choosing s = ut + ½at²", "Changing the minus sign to a plus sign"],
      explanation: "This form calculates displacement using final velocity, constant acceleration and elapsed time."
    }
  ]
);
// ============================================================
// TIXAR PHYSICS — BATCH 4
// Force, Motion and Mechanics
// Screens: Free Fall → Calculating Density
// Learning loop: Test → Identify → Repair → Retest → Remember
// ============================================================

add(
  "physics",
  "equations_of_linear_motion",
  "Free Fall",
  `
  <h2>Free Fall</h2>

  <p>Free fall is motion in which gravity is the only force acting on an object. Near Earth's surface, the acceleration due to gravity is approximately 9.8 m/s² downward. Some school problems use 10 m/s² when instructed to do so.</p>

  <p>When air resistance is negligible, all objects in the same gravitational field have the same acceleration due to gravity, regardless of their masses.</p>

  <h3>Important ideas</h3>
  <ul>
    <li>An object released from rest has initial velocity u = 0.</li>
    <li>Gravity accelerates a falling object downward.</li>
    <li>If upward is chosen as positive, gravitational acceleration is negative: a = −g.</li>
    <li>If downward is chosen as positive, gravitational acceleration is positive: a = +g.</li>
    <li>Use equations of linear motion because acceleration is approximately constant near Earth's surface.</li>
  </ul>

  <h3>Worked example 1: Speed after falling</h3>
  <p>A stone is released from rest and falls for 3 s. Take g = 10 m/s² and ignore air resistance. Find its velocity after 3 s, taking downward as positive.</p>
  <p>u = 0, a = +10 m/s², t = 3 s.</p>
  <p>v = u + at.</p>
  <p>v = 0 + (10 × 3) = +30 m/s.</p>
  <p><strong>Answer:</strong> 30 m/s downward.</p>

  <h3>Worked example 2: Distance fallen</h3>
  <p>A ball is released from rest and falls for 2 s. Take g = 10 m/s².</p>
  <p>s = ut + ½at².</p>
  <p>s = (0 × 2) + ½ × 10 × 2².</p>
  <p>s = 5 × 4 = 20 m.</p>
  <p><strong>Answer:</strong> 20 m downward.</p>

  <h3>Worked example 3: Object thrown vertically upward</h3>
  <p>A ball is thrown vertically upward at 20 m/s. Take upward as positive and g = 10 m/s². Find the time taken to reach its highest point.</p>
  <p>At the highest point, the instantaneous velocity is v = 0 m/s.</p>
  <p>u = +20 m/s, a = −10 m/s².</p>
  <p>v = u + at.</p>
  <p>0 = 20 − 10t.</p>
  <p>10t = 20, so t = 2 s.</p>
  <p><strong>Answer:</strong> 2 s.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the wrong sign for gravitational acceleration.</li>
    <li>Assuming an object at its highest point has zero acceleration. Its velocity is momentarily zero, but gravity still acts.</li>
    <li>Claiming heavier objects fall faster in a vacuum.</li>
    <li>Forgetting that air resistance can change the motion of real falling objects.</li>
  </ul>
  `,
  [
    {
      q: "A stone is released from rest and falls freely for 4 s. Take g = 10 m/s² and downward as positive. What is its final velocity?",
      hint: "Use v = u + at. The stone starts from rest.",
      formula: "v = u + at",
      steps: [
        "u = 0 m/s, a = +10 m/s², t = 4 s.",
        "v = 0 + (10 × 4).",
        "v = +40 m/s."
      ],
      ans: "40 m/s downward",
      final_check: "The positive sign indicates downward motion under the chosen convention.",
      common_mistakes: ["Using 4 m/s as the initial velocity", "Multiplying by time twice"],
      explanation: "Gravity changes the velocity by 10 m/s each second when air resistance is ignored."
    },
    {
      q: "A ball is dropped from rest and falls for 3 s. Take g = 10 m/s². How far does it fall?",
      hint: "Use the displacement equation with initial velocity zero.",
      formula: "s = ut + ½at²",
      steps: [
        "u = 0, a = 10 m/s², t = 3 s.",
        "s = 0 + ½ × 10 × 3².",
        "s = 5 × 9 = 45 m."
      ],
      ans: "45 m",
      final_check: "The distance fallen is positive and measured in metres.",
      common_mistakes: ["Using t instead of t²", "Calculating 10 × 3 only"],
      explanation: "For an object released from rest, the distance fallen under constant gravity is ½gt²."
    },
    {
      q: "A ball is thrown vertically upward at 30 m/s. Take upward as positive and g = 10 m/s². How long does it take to reach the highest point?",
      hint: "At the highest point, the instantaneous vertical velocity is zero.",
      formula: "v = u + at",
      steps: [
        "u = +30 m/s, v = 0 m/s and a = −10 m/s².",
        "0 = 30 − 10t.",
        "10t = 30, so t = 3 s."
      ],
      ans: "3 s",
      final_check: "The time is positive, and the velocity has decreased to zero.",
      common_mistakes: ["Using positive acceleration while upward is positive", "Assuming acceleration is zero at the highest point"],
      explanation: "Gravity acts downward throughout the flight, slowing the upward motion until the velocity is momentarily zero."
    },
    {
      q: "Ignoring air resistance, what is the acceleration of a freely falling object near Earth's surface when g = 9.8 m/s²?",
      hint: "Free fall means gravity is the only force acting.",
      steps: [
        "Gravity produces acceleration g near Earth's surface.",
        "The magnitude is 9.8 m/s².",
        "Its direction is downward."
      ],
      ans: "9.8 m/s² downward",
      final_check: "The direction can be represented by a negative sign if upward is defined as positive.",
      common_mistakes: ["Saying the acceleration depends on mass", "Confusing acceleration with speed"],
      explanation: "In free fall, gravitational acceleration is the same for all objects at the same location when air resistance is negligible."
    },
    {
      q: "At the highest point of a ball thrown vertically upward, what are its instantaneous velocity and acceleration, taking upward as positive and ignoring air resistance?",
      hint: "Separate the momentary velocity from the continuing effect of gravity.",
      steps: [
        "At the highest point, the ball momentarily stops moving upward.",
        "Its instantaneous velocity is 0 m/s.",
        "Gravity still acts downward, so acceleration is −g."
      ],
      ans: "Velocity = 0 m/s; acceleration = −g",
      final_check: "Zero velocity does not mean zero acceleration.",
      common_mistakes: ["Saying both velocity and acceleration are zero", "Saying gravity stops at the highest point"],
      explanation: "The velocity is momentarily zero at the turning point, but gravity continues to accelerate the ball downward."
    }
  ]
);

add(
  "newtons_laws_of_motion",
  "Newton’s First Law",
  `
  <h2>Newton’s First Law</h2>

  <p>Newton's first law states that an object remains at rest or continues moving with constant velocity in a straight line unless acted on by a non-zero resultant external force.</p>

  <p>This law describes inertia: objects resist changes to their state of motion.</p>

  <h3>Resultant force and motion</h3>
  <ul>
    <li>If the resultant force is zero, acceleration is zero.</li>
    <li>An object at rest remains at rest if the resultant force stays zero.</li>
    <li>An object already moving continues at constant velocity if the resultant force stays zero.</li>
    <li>A non-zero resultant force causes acceleration, changing velocity.</li>
  </ul>

  <p>Zero resultant force does not mean that no forces act. Several forces may act and balance one another.</p>

  <h3>Worked example 1: Balanced forces</h3>
  <p>A box is pushed to the right with 20 N while friction acts to the left with 20 N.</p>
  <p>Resultant force = 20 − 20 = 0 N.</p>
  <p>Therefore, acceleration is zero. The box may remain at rest or continue at constant velocity, depending on its initial state.</p>

  <h3>Worked example 2: A moving vehicle</h3>
  <p>A vehicle moves in a straight line at constant velocity. Its driving force is 1,500 N forward.</p>
  <p>For the velocity to remain constant, the total opposing force must also be 1,500 N.</p>
  <p>Resultant force = 1,500 − 1,500 = 0 N.</p>
  <p><strong>Conclusion:</strong> Constant velocity is consistent with zero resultant force.</p>

  <h3>Worked example 3: Why passengers move forward</h3>
  <p>A moving bus brakes suddenly. Passengers tend to move forward relative to the bus because their bodies tend to maintain their previous motion. A seat belt supplies a force that changes the passengers' motion with the bus.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Thinking a moving object must always have a forward resultant force.</li>
    <li>Thinking zero resultant force means zero velocity.</li>
    <li>Confusing balanced forces with the absence of forces.</li>
    <li>Forgetting that a change in direction is also a change in velocity.</li>
  </ul>
  `,
  [
    {
      q: "A box is pushed rightward with 12 N while friction acts leftward with 12 N. What is the resultant horizontal force?",
      hint: "Opposing forces are subtracted.",
      formula: "resultant force = force right − force left",
      steps: [
        "Rightward force = 12 N.",
        "Leftward force = 12 N.",
        "Resultant force = 12 − 12 = 0 N."
      ],
      ans: "0 N",
      final_check: "The two forces are equal and opposite.",
      common_mistakes: ["Adding the two magnitudes", "Assuming the push must produce acceleration"],
      explanation: "Equal forces in opposite directions balance, giving zero resultant force."
    },
    {
      q: "A spacecraft is travelling through deep space with negligible external forces. What happens to its velocity if the resultant force remains zero?",
      hint: "Apply Newton's first law to an object already moving.",
      steps: [
        "The spacecraft is already moving.",
        "The resultant force is zero.",
        "Its velocity remains constant in magnitude and direction."
      ],
      ans: "It continues at constant velocity",
      final_check: "A continuous forward force is not required to maintain constant velocity in this ideal situation.",
      common_mistakes: ["Saying it must eventually stop", "Saying it must accelerate without a resultant force"],
      explanation: "Newton's first law says that zero resultant force means zero acceleration."
    },
    {
      q: "A book rests on a table. Does this prove that no forces act on the book?",
      hint: "Consider the book's weight and the upward support force.",
      steps: [
        "Gravity pulls the book downward.",
        "The table exerts an upward support force.",
        "The forces balance, so the resultant force is zero."
      ],
      ans: "No; the forces balance",
      final_check: "The book can have forces acting on it while remaining at rest.",
      common_mistakes: ["Saying the book has no weight", "Ignoring the table's support force"],
      explanation: "Rest can occur when all forces balance to give zero resultant force."
    },
    {
      q: "Why does a passenger tend to move forward when a moving bus stops suddenly?",
      hint: "Think about the tendency of a body to maintain its existing motion.",
      steps: [
        "Before braking, the passenger is moving with the bus.",
        "The bus slows quickly.",
        "The passenger's body tends to maintain its previous motion until another force changes it."
      ],
      ans: "Because of inertia",
      final_check: "A seat belt provides a force that helps change the passenger's motion safely.",
      common_mistakes: ["Saying a forward force suddenly appears", "Confusing inertia with acceleration"],
      explanation: "Inertia is the tendency of an object to resist changes in its state of motion."
    },
    {
      q: "An object moves in a straight line at constant velocity. What is its acceleration?",
      hint: "Acceleration measures change in velocity per unit time.",
      steps: [
        "The velocity does not change.",
        "Change in velocity is zero.",
        "Acceleration is therefore zero."
      ],
      ans: "0 m/s²",
      final_check: "Constant velocity means both speed and direction remain unchanged.",
      common_mistakes: ["Saying acceleration equals velocity", "Assuming every moving object accelerates"],
      explanation: "With no change in velocity, acceleration is zero."
    }
  ]
);

add(
  "newtons_laws_of_motion",
  "Newton’s Second Law",
  `
  <h2>Newton’s Second Law</h2>

  <p>Newton's second law relates the resultant force on an object to its mass and acceleration. For constant mass, the resultant force equals mass multiplied by acceleration.</p>

  <p><strong>F = ma</strong></p>

  <ul>
    <li><strong>F:</strong> resultant force, in newtons (N)</li>
    <li><strong>m:</strong> mass, in kilograms (kg)</li>
    <li><strong>a:</strong> acceleration, in metres per second squared (m/s²)</li>
  </ul>

  <p>One newton is the resultant force that gives a mass of 1 kg an acceleration of 1 m/s².</p>

  <h3>Rearranging the equation</h3>
  <ul>
    <li>Force: F = ma</li>
    <li>Mass: m = F ÷ a</li>
    <li>Acceleration: a = F ÷ m</li>
  </ul>

  <h3>Worked example 1: Finding force</h3>
  <p>A 4 kg trolley accelerates at 3 m/s². Find the resultant force.</p>
  <p>F = ma = 4 × 3 = 12 N.</p>
  <p><strong>Answer:</strong> 12 N in the direction of acceleration.</p>

  <h3>Worked example 2: Finding acceleration</h3>
  <p>A resultant force of 20 N acts on a 5 kg object.</p>
  <p>a = F ÷ m = 20 ÷ 5 = 4 m/s².</p>
  <p><strong>Answer:</strong> 4 m/s².</p>

  <h3>Worked example 3: Finding mass</h3>
  <p>A resultant force of 18 N gives an object an acceleration of 6 m/s².</p>
  <p>m = F ÷ a = 18 ÷ 6 = 3 kg.</p>
  <p><strong>Answer:</strong> 3 kg.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using mass in grams without converting to kilograms.</li>
    <li>Using one force instead of the resultant force.</li>
    <li>Multiplying when the required rearrangement involves division.</li>
    <li>Writing the force unit as kg or m/s².</li>
  </ul>
  `,
  [
    {
      q: "A 6 kg object accelerates at 2 m/s². Find the resultant force.",
      hint: "Multiply mass by acceleration.",
      formula: "F = ma",
      steps: [
        "m = 6 kg and a = 2 m/s².",
        "F = 6 × 2.",
        "F = 12 N."
      ],
      ans: "12 N",
      final_check: "kg × m/s² is equivalent to a newton.",
      common_mistakes: ["Dividing mass by acceleration", "Using kg as the force unit"],
      explanation: "Newton's second law gives resultant force as mass multiplied by acceleration."
    },
    {
      q: "A resultant force of 35 N acts on a 7 kg trolley. Calculate its acceleration.",
      hint: "Rearrange F = ma to make acceleration the subject.",
      formula: "a = F / m",
      steps: [
        "F = 35 N and m = 7 kg.",
        "a = 35 ÷ 7.",
        "a = 5 m/s²."
      ],
      ans: "5 m/s²",
      final_check: "A greater resultant force produces greater acceleration for the same mass.",
      common_mistakes: ["Multiplying force by mass", "Giving the answer in newtons"],
      explanation: "Acceleration is the resultant force divided by mass."
    },
    {
      q: "A force of 24 N produces an acceleration of 3 m/s². Find the mass of the object.",
      hint: "Rearrange F = ma to find mass.",
      formula: "m = F / a",
      steps: [
        "F = 24 N and a = 3 m/s².",
        "m = 24 ÷ 3.",
        "m = 8 kg."
      ],
      ans: "8 kg",
      final_check: "The mass unit is kilograms.",
      common_mistakes: ["Multiplying 24 by 3", "Giving the mass in newtons"],
      explanation: "Mass equals resultant force divided by acceleration."
    },
    {
      q: "Two objects have the same mass. Object A experiences a resultant force of 10 N and object B experiences 30 N. How do their accelerations compare?",
      hint: "Use a = F/m and keep the mass the same for both objects.",
      formula: "a = F / m",
      steps: [
        "For the same mass, acceleration is directly proportional to resultant force.",
        "Object B experiences three times the force.",
        "Object B therefore has three times the acceleration of object A."
      ],
      ans: "Object B's acceleration is three times Object A's",
      final_check: "This comparison assumes both objects have the same mass.",
      common_mistakes: ["Saying their accelerations are equal", "Comparing force without considering mass"],
      explanation: "For constant mass, tripling the resultant force triples the acceleration."
    },
    {
      q: "A 2,000 g object accelerates at 4 m/s². What is the resultant force?",
      hint: "Convert the mass from grams to kilograms first.",
      formula: "F = ma",
      steps: [
        "Convert 2,000 g to 2 kg.",
        "F = 2 × 4.",
        "F = 8 N."
      ],
      ans: "8 N",
      final_check: "The mass must be in kilograms when using SI units.",
      common_mistakes: ["Using 2,000 directly in F = ma", "Converting grams to milligrams"],
      explanation: "2,000 g equals 2 kg, so the resultant force is 8 N."
    }
  ]
);

add(
  "newtons_laws_of_motion",
  "Newton’s Third Law",
  `
  <h2>Newton’s Third Law</h2>

  <p>Newton's third law states that when one object exerts a force on another object, the second object simultaneously exerts a force equal in magnitude and opposite in direction on the first object.</p>

  <p>These forces are often described as an action–reaction pair, but neither force happens first. They act on different objects.</p>

  <h3>Recognising a force pair</h3>
  <ul>
    <li>The two forces are equal in magnitude.</li>
    <li>They act in opposite directions.</li>
    <li>They act on different objects.</li>
    <li>They belong to the same interaction.</li>
  </ul>

  <h3>Worked example 1: Pushing a wall</h3>
  <p>A person pushes a wall with a force of 50 N to the right.</p>
  <p>The wall exerts a force of 50 N to the left on the person.</p>
  <p><strong>Important:</strong> The forces do not cancel on one object because one acts on the wall and the other acts on the person.</p>

  <h3>Worked example 2: Walking</h3>
  <p>A person's foot pushes the ground backward. The ground exerts a forward frictional force on the foot. This forward force helps the person move forward.</p>

  <h3>Worked example 3: A swimmer</h3>
  <p>A swimmer pushes water backward. The water pushes the swimmer forward with an equal and opposite force.</p>

  <h3>Why force pairs do not cancel each other</h3>
  <p>To calculate the resultant force on an object, include only the forces acting on that object. The reaction force acts on the other object, so it is not included in the first object's force total.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Claiming that action and reaction forces act on the same object.</li>
    <li>Claiming one force occurs before the other.</li>
    <li>Thinking the forces must always produce equal accelerations. Different masses can have different accelerations.</li>
    <li>Confusing a third-law pair with two balanced forces acting on one object.</li>
  </ul>
  `,
  [
    {
      q: "A person pushes a wall with a force of 80 N. What force does the wall exert on the person?",
      hint: "Apply Newton's third law: equal magnitude, opposite direction, different objects.",
      steps: [
        "The person exerts 80 N on the wall.",
        "The wall exerts an equal force on the person.",
        "The force on the person acts in the opposite direction."
      ],
      ans: "80 N in the opposite direction",
      final_check: "The two forces act on different objects.",
      common_mistakes: ["Saying the wall exerts no force", "Saying the wall exerts a smaller force"],
      explanation: "The forces in a third-law pair are equal in magnitude and opposite in direction."
    },
    {
      q: "When a swimmer pushes water backward, what force helps the swimmer move forward?",
      hint: "Identify the force exerted by the water on the swimmer.",
      steps: [
        "The swimmer pushes the water backward.",
        "The water exerts an equal and opposite force on the swimmer.",
        "That force acts forward."
      ],
      ans: "The forward force exerted by the water on the swimmer",
      final_check: "The force pair acts on the water and swimmer separately.",
      common_mistakes: ["Saying the swimmer pulls themselves forward without an interaction", "Saying both forces act on the water"],
      explanation: "The water's reaction force pushes the swimmer forward."
    },
    {
      q: "Why do the action and reaction forces in Newton's third law not cancel each other on one object?",
      hint: "Ask which object each force acts on.",
      steps: [
        "The action force acts on one object.",
        "The reaction force acts on the other object.",
        "They cannot be added together as forces acting on the same object."
      ],
      ans: "They act on different objects",
      final_check: "Only forces acting on the chosen object are included in its resultant force.",
      common_mistakes: ["Saying the forces are unequal", "Saying one force happens later"],
      explanation: "Third-law forces are equal and opposite but act on different bodies."
    },
    {
      q: "A book presses downward on a table with a force of 15 N. What is the Newton's third-law partner of this force?",
      hint: "The partner must act on the other object in the interaction.",
      steps: [
        "The book exerts a downward force on the table.",
        "The table exerts an equal force on the book.",
        "That force is upward and has magnitude 15 N."
      ],
      ans: "The table exerts an upward force of 15 N on the book",
      final_check: "This third-law partner is distinct from the table's support force description when identifying forces on the book; the interaction pair is book-on-table and table-on-book.",
      common_mistakes: ["Choosing the book's weight as the reaction pair", "Choosing another downward force on the table"],
      explanation: "The reaction to the book's force on the table is the table's force on the book."
    },
    {
      q: "A small boat pushes water backward with a force of 200 N. The water pushes the boat forward with what magnitude of force?",
      hint: "Newton's third law says the forces in the pair have equal magnitudes.",
      steps: [
        "The boat exerts 200 N on the water.",
        "The water exerts an equal force on the boat.",
        "The force on the boat is forward."
      ],
      ans: "200 N forward",
      final_check: "The magnitudes match; the directions are opposite.",
      common_mistakes: ["Choosing zero because the boat is on water", "Doubling the force to 400 N"],
      explanation: "The water's force on the boat equals the boat's force on the water in magnitude."
    }
  ]
);

add(
  "newtons_laws_of_motion",
  "Mass and Inertia",
  `
  <h2>Mass and Inertia</h2>

  <p>Mass is a measure of the amount of matter in an object and, in mechanics, of its resistance to acceleration. Its SI unit is the kilogram (kg).</p>

  <p><strong>Inertia</strong> is the tendency of an object to resist changes in its state of rest or uniform straight-line motion. Greater mass means greater inertia.</p>

  <h3>How mass affects motion</h3>
  <p>Newton's second law is F = ma. Rearranging gives a = F/m.</p>
  <p>For the same resultant force, an object with greater mass has less acceleration. An object with smaller mass has greater acceleration.</p>

  <h3>Worked example 1: Comparing acceleration</h3>
  <p>A 2 kg object and an 8 kg object each experience a resultant force of 16 N.</p>
  <p>For the 2 kg object: a = 16 ÷ 2 = 8 m/s².</p>
  <p>For the 8 kg object: a = 16 ÷ 8 = 2 m/s².</p>
  <p><strong>Conclusion:</strong> The 2 kg object accelerates four times as much as the 8 kg object.</p>

  <h3>Worked example 2: Inertia in a bus</h3>
  <p>When a bus starts moving suddenly, passengers may appear to lean backward relative to the bus. Their bodies tend to remain in their previous state of rest while the bus accelerates forward.</p>

  <h3>Worked example 3: Increasing mass</h3>
  <p>If the same net force acts on an object whose mass doubles, its acceleration halves because a = F/m.</p>

  <h3>Mass is not weight</h3>
  <p>Mass is measured in kilograms and does not depend on location. Weight is the gravitational force on an object and is measured in newtons.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using kilograms as a unit of weight.</li>
    <li>Thinking that a large mass must always move slowly; mass alone does not specify velocity.</li>
    <li>Confusing inertia with a force.</li>
    <li>Assuming mass changes simply because an object moves to the Moon.</li>
  </ul>
  `,
  [
    {
      q: "Which object has greater inertia: a 3 kg object or a 12 kg object?",
      hint: "Inertia increases with mass.",
      steps: [
        "Compare the masses: 3 kg and 12 kg.",
        "The 12 kg object has greater mass.",
        "Therefore, it has greater inertia."
      ],
      ans: "The 12 kg object",
      final_check: "The conclusion compares inertia, not the objects' current speeds.",
      common_mistakes: ["Choosing the faster object without being given speeds", "Confusing inertia with weight"],
      explanation: "Mass measures an object's resistance to changes in motion."
    },
    {
      q: "A resultant force of 20 N acts on a 4 kg object. What is its acceleration?",
      hint: "Use Newton's second law.",
      formula: "a = F / m",
      steps: [
        "F = 20 N and m = 4 kg.",
        "a = 20 ÷ 4.",
        "a = 5 m/s²."
      ],
      ans: "5 m/s²",
      final_check: "Acceleration is measured in m/s².",
      common_mistakes: ["Multiplying force by mass", "Giving the answer in newtons"],
      explanation: "Acceleration equals resultant force divided by mass."
    },
    {
      q: "Two objects experience the same resultant force. Object A has a mass of 2 kg and Object B has a mass of 6 kg. How does their acceleration compare?",
      hint: "Acceleration is inversely proportional to mass when force is the same.",
      formula: "a = F / m",
      steps: [
        "Both objects have the same resultant force F.",
        "Object B has three times the mass of Object A.",
        "Object B's acceleration is one-third of Object A's acceleration."
      ],
      ans: "Object A's acceleration is three times Object B's",
      final_check: "This comparison holds because the resultant force is the same.",
      common_mistakes: ["Saying Object B accelerates three times as much", "Ignoring the equal-force condition"],
      explanation: "For the same force, acceleration decreases as mass increases."
    },
    {
      q: "What is inertia?",
      hint: "Think of how an object responds when its motion is about to change.",
      steps: [
        "Objects tend to maintain their state of rest or uniform straight-line motion.",
        "This resistance to a change in motion is called inertia."
      ],
      ans: "The tendency to resist changes in the state of motion",
      final_check: "Inertia is not itself a force.",
      common_mistakes: ["Defining inertia as movement", "Calling it a type of friction"],
      explanation: "Inertia describes an object's resistance to a change in velocity."
    },
    {
      q: "An object's mass is 5 kg on Earth. Ignoring any loss of material, what is its mass on the Moon?",
      hint: "Distinguish mass from the gravitational force called weight.",
      steps: [
        "Mass is a property of the object's matter.",
        "Moving to the Moon changes the gravitational field strength, not the object's mass.",
        "The mass remains 5 kg."
      ],
      ans: "5 kg",
      final_check: "Its weight would be smaller on the Moon, but its mass remains unchanged.",
      common_mistakes: ["Changing the mass because gravity is weaker", "Giving the answer in newtons"],
      explanation: "Mass does not depend on the local gravitational field."
    }
  ]
);

add(
  "newtons_laws_of_motion",
  "Force, Mass and Acceleration Calculations",
  `
  <h2>Force, Mass and Acceleration Calculations</h2>

  <p>Problems involving force, mass and acceleration are solved using Newton's second law. The force in the equation must be the <strong>resultant force</strong>, not automatically the largest force or the applied force alone.</p>

  <p><strong>F = ma</strong></p>

  <h3>When forces act in opposite directions</h3>
  <p>Choose a positive direction. Add forces acting in that direction and subtract forces acting in the opposite direction. The result is the signed resultant force.</p>

  <h3>Worked example 1: Opposing forces</h3>
  <p>A 5 kg trolley is pulled rightward with 30 N. Friction acts leftward with 10 N. Find the acceleration.</p>
  <p>Resultant force = 30 − 10 = 20 N rightward.</p>
  <p>a = F/m = 20/5 = 4 m/s².</p>
  <p><strong>Answer:</strong> 4 m/s² rightward.</p>

  <h3>Worked example 2: Equal opposing forces</h3>
  <p>A 10 kg box is pushed rightward with 40 N. Friction acts leftward with 40 N.</p>
  <p>Resultant force = 40 − 40 = 0 N.</p>
  <p>a = 0/10 = 0 m/s².</p>
  <p><strong>Answer:</strong> Zero acceleration.</p>

  <h3>Worked example 3: Finding the applied force</h3>
  <p>A 4 kg object accelerates rightward at 3 m/s² while friction acts leftward with 5 N. Find the applied rightward force.</p>
  <p>Required resultant force = ma = 4 × 3 = 12 N rightward.</p>
  <p>Applied force − 5 = 12.</p>
  <p>Applied force = 17 N.</p>
  <p><strong>Answer:</strong> 17 N rightward.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the applied force directly when opposing forces are present.</li>
    <li>Adding forces that act in opposite directions.</li>
    <li>Forgetting that acceleration points in the direction of the resultant force.</li>
    <li>Using grams instead of kilograms.</li>
  </ul>
  `,
  [
    {
      q: "A 4 kg trolley experiences a 28 N force to the right and a 12 N force to the left. Find its acceleration.",
      hint: "Calculate the resultant force before using F = ma.",
      formula: "a = resultant force / mass",
      steps: [
        "Resultant force = 28 − 12 = 16 N to the right.",
        "a = 16 ÷ 4.",
        "a = 4 m/s² to the right."
      ],
      ans: "4 m/s² to the right",
      final_check: "The acceleration direction matches the resultant force.",
      common_mistakes: ["Using 28 N as the resultant force", "Adding 28 N and 12 N"],
      explanation: "The opposing forces give a resultant of 16 N, which accelerates the 4 kg trolley at 4 m/s²."
    },
    {
      q: "A 6 kg box is pushed rightward with 18 N while friction acts leftward with 18 N. What is its acceleration?",
      hint: "Find the net force first.",
      formula: "a = F / m",
      steps: [
        "Resultant force = 18 − 18 = 0 N.",
        "a = 0 ÷ 6.",
        "a = 0 m/s²."
      ],
      ans: "0 m/s²",
      final_check: "Balanced horizontal forces produce zero horizontal acceleration.",
      common_mistakes: ["Dividing 18 N by 6 kg without finding the resultant", "Assuming the box must be moving"],
      explanation: "The forces cancel, so the horizontal resultant force is zero."
    },
    {
      q: "A 3 kg object accelerates at 5 m/s². Friction opposes the motion with a force of 4 N. What applied force is required in the direction of motion?",
      hint: "Find the required resultant force first, then account for friction.",
      formula: "applied force − friction = ma",
      steps: [
        "Required resultant force = ma = 3 × 5 = 15 N.",
        "Let the applied force be F.",
        "F − 4 = 15, so F = 19 N."
      ],
      ans: "19 N",
      final_check: "After subtracting 4 N of friction, the remaining force is 15 N.",
      common_mistakes: ["Answering 15 N without accounting for friction", "Subtracting friction from the required resultant a second time"],
      explanation: "The applied force must overcome friction and still provide a 15 N resultant force."
    },
    {
      q: "A 2,500 g object experiences a resultant force of 10 N. Calculate its acceleration.",
      hint: "Convert the mass to kilograms before using Newton's second law.",
      formula: "a = F / m",
      steps: [
        "2,500 g = 2.5 kg.",
        "a = 10 ÷ 2.5.",
        "a = 4 m/s²."
      ],
      ans: "4 m/s²",
      final_check: "The calculation uses SI units.",
      common_mistakes: ["Using 2,500 kg", "Dividing mass by force"],
      explanation: "Acceleration is resultant force divided by mass in kilograms."
    },
    {
      q: "A 5 kg object accelerates at 2 m/s² to the left. Taking left as the positive direction, what is the resultant force?",
      hint: "The acceleration is in the positive direction under the convention given.",
      formula: "F = ma",
      steps: [
        "m = 5 kg and a = +2 m/s².",
        "F = 5 × 2.",
        "F = +10 N in the chosen positive direction, which is left."
      ],
      ans: "10 N to the left",
      final_check: "The resultant force has the same direction as the acceleration.",
      common_mistakes: ["Changing the direction because left is usually drawn as negative", "Giving the answer in m/s²"],
      explanation: "The chosen sign convention defines left as positive, so the resultant force is positive and leftward."
    }
  ]
);

add(
  "mass_weight_and_density",
  "Mass and Weight",
  `
  <h2>Mass and Weight</h2>

  <p>Mass is the amount of matter in an object and a measure of its resistance to acceleration. Its SI unit is the kilogram (kg).</p>

  <p>Weight is the gravitational force acting on an object. Its SI unit is the newton (N).</p>

  <p><strong>Weight = mass × gravitational field strength</strong></p>
  <p><strong>W = mg</strong></p>

  <ul>
    <li><strong>W:</strong> weight in newtons (N)</li>
    <li><strong>m:</strong> mass in kilograms (kg)</li>
    <li><strong>g:</strong> gravitational field strength in N/kg</li>
  </ul>

  <p>Near Earth's surface, g is approximately 9.8 N/kg, although some school calculations use 10 N/kg when specified.</p>

  <h3>Key differences</h3>
  <ul>
    <li>Mass is measured in kilograms; weight is measured in newtons.</li>
    <li>Mass remains the same when an object moves between locations, provided no material is lost or gained.</li>
    <li>Weight changes when gravitational field strength changes.</li>
    <li>Weight acts toward the centre of the attracting body.</li>
  </ul>

  <h3>Worked example 1: Finding weight</h3>
  <p>A student has a mass of 50 kg. Take g = 10 N/kg. Find the student's weight.</p>
  <p>W = mg = 50 × 10 = 500 N.</p>
  <p><strong>Answer:</strong> 500 N.</p>

  <h3>Worked example 2: Finding mass from weight</h3>
  <p>An object weighs 120 N where g = 10 N/kg. Find its mass.</p>
  <p>m = W/g = 120 ÷ 10 = 12 kg.</p>
  <p><strong>Answer:</strong> 12 kg.</p>

  <h3>Worked example 3: Weight on the Moon</h3>
  <p>An object has a mass of 6 kg on Earth. If the Moon's gravitational field strength is 1.6 N/kg, find its weight on the Moon.</p>
  <p>W = mg = 6 × 1.6 = 9.6 N.</p>
  <p><strong>Answer:</strong> 9.6 N. Its mass remains 6 kg.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Writing weight in kilograms.</li>
    <li>Using W = m/g instead of W = mg.</li>
    <li>Assuming mass changes on the Moon.</li>
    <li>Using a value of g without checking the question's instructions.</li>
  </ul>
  `,
  [
    {
      q: "Find the weight of a 7 kg object where g = 10 N/kg.",
      hint: "Multiply mass by gravitational field strength.",
      formula: "W = mg",
      steps: [
        "m = 7 kg and g = 10 N/kg.",
        "W = 7 × 10.",
        "W = 70 N."
      ],
      ans: "70 N",
      final_check: "Weight is a force, so its unit is newtons.",
      common_mistakes: ["Answering 70 kg", "Dividing mass by g"],
      explanation: "Weight equals mass multiplied by gravitational field strength."
    },
    {
      q: "An object weighs 250 N where g = 10 N/kg. What is its mass?",
      hint: "Rearrange W = mg to make m the subject.",
      formula: "m = W / g",
      steps: [
        "W = 250 N and g = 10 N/kg.",
        "m = 250 ÷ 10.",
        "m = 25 kg."
      ],
      ans: "25 kg",
      final_check: "Mass is measured in kilograms.",
      common_mistakes: ["Multiplying 250 by 10", "Giving the answer in newtons"],
      explanation: "Mass is the weight divided by gravitational field strength."
    },
    {
      q: "An astronaut has a mass of 80 kg on Earth. What is the astronaut's mass on the Moon, assuming no material is lost or gained?",
      hint: "Mass is independent of local gravitational field strength.",
      steps: [
        "Mass measures the object's matter and inertia.",
        "The location changes gravitational field strength, not mass.",
        "The astronaut's mass remains 80 kg."
      ],
      ans: "80 kg",
      final_check: "The astronaut's weight would be smaller on the Moon.",
      common_mistakes: ["Reducing the mass by the ratio of Earth's and Moon's gravity", "Giving the mass in newtons"],
      explanation: "Mass remains constant when the object moves to a different gravitational field."
    },
    {
      q: "Calculate the weight of a 12 kg object where g = 9.8 N/kg.",
      hint: "Use the gravitational field strength given in the question.",
      formula: "W = mg",
      steps: [
        "m = 12 kg and g = 9.8 N/kg.",
        "W = 12 × 9.8.",
        "W = 117.6 N."
      ],
      ans: "117.6 N",
      final_check: "Use 9.8 N/kg rather than 10 N/kg because the question specifies 9.8.",
      common_mistakes: ["Rounding without being asked", "Using g as 9.8 m/s"],
      explanation: "Weight is the product of mass and gravitational field strength."
    },
    {
      q: "Which quantity is measured in newtons: mass or weight?",
      hint: "One is a gravitational force; the other is measured in kilograms.",
      steps: [
        "Mass is measured in kilograms.",
        "Weight is a gravitational force.",
        "Force is measured in newtons."
      ],
      ans: "Weight",
      final_check: "The SI unit of weight is N.",
      common_mistakes: ["Choosing mass", "Confusing newtons with kilograms"],
      explanation: "Weight is a force, while mass is measured in kilograms."
    }
  ]
);

add(
  "mass_weight_and_density",
  "Gravitational Field Strength",
  `
  <h2>Gravitational Field Strength</h2>

  <p>Gravitational field strength at a location is the gravitational force acting per unit mass on an object placed there.</p>

  <p><strong>g = W ÷ m</strong></p>

  <ul>
    <li><strong>g:</strong> gravitational field strength, in N/kg</li>
    <li><strong>W:</strong> weight, in N</li>
    <li><strong>m:</strong> mass, in kg</li>
  </ul>

  <p>Near Earth's surface, gravitational field strength is approximately 9.8 N/kg. Its value varies with location and is smaller at the Moon's surface.</p>

  <p>Gravitational field strength in N/kg has the same numerical value as gravitational acceleration in m/s² at the same location, because 1 N = 1 kg·m/s².</p>

  <h3>Worked example 1: Finding field strength</h3>
  <p>An object of mass 5 kg has a weight of 49 N. Calculate the gravitational field strength.</p>
  <p>g = W/m = 49 ÷ 5 = 9.8 N/kg.</p>
  <p><strong>Answer:</strong> 9.8 N/kg.</p>

  <h3>Worked example 2: Comparing weight on two planets</h3>
  <p>A 10 kg object is on a planet where g = 4 N/kg.</p>
  <p>W = mg = 10 × 4 = 40 N.</p>
  <p><strong>Answer:</strong> 40 N.</p>

  <h3>Worked example 3: Finding mass</h3>
  <p>An object weighs 80 N in a gravitational field of 8 N/kg.</p>
  <p>m = W/g = 80 ÷ 8 = 10 kg.</p>
  <p><strong>Answer:</strong> 10 kg.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using mass divided by weight instead of weight divided by mass.</li>
    <li>Writing N/kg as the unit of mass.</li>
    <li>Assuming gravitational field strength is identical everywhere.</li>
    <li>Confusing gravitational field strength with the object's mass.</li>
  </ul>
  `,
  [
    {
      q: "An object has a mass of 4 kg and a weight of 39.2 N. Find the gravitational field strength.",
      hint: "Divide weight by mass.",
      formula: "g = W / m",
      steps: [
        "W = 39.2 N and m = 4 kg.",
        "g = 39.2 ÷ 4.",
        "g = 9.8 N/kg."
      ],
      ans: "9.8 N/kg",
      final_check: "The unit is newtons per kilogram.",
      common_mistakes: ["Multiplying weight by mass", "Writing the unit as kg"],
      explanation: "Gravitational field strength is the weight per unit mass."
    },
    {
      q: "Find the weight of a 15 kg object in a gravitational field of 4 N/kg.",
      hint: "Use the relationship between weight, mass and field strength.",
      formula: "W = mg",
      steps: [
        "m = 15 kg and g = 4 N/kg.",
        "W = 15 × 4.",
        "W = 60 N."
      ],
      ans: "60 N",
      final_check: "The weight is expressed in newtons.",
      common_mistakes: ["Dividing 15 by 4", "Giving the answer in N/kg"],
      explanation: "Weight is mass multiplied by gravitational field strength."
    },
    {
      q: "An object weighs 36 N in a field where g = 6 N/kg. Find its mass.",
      hint: "Rearrange W = mg.",
      formula: "m = W / g",
      steps: [
        "W = 36 N and g = 6 N/kg.",
        "m = 36 ÷ 6.",
        "m = 6 kg."
      ],
      ans: "6 kg",
      final_check: "The answer is a mass, so it is measured in kilograms.",
      common_mistakes: ["Multiplying 36 by 6", "Using newtons as the mass unit"],
      explanation: "Mass equals weight divided by gravitational field strength."
    },
    {
      q: "Why does the weight of an object change when it is moved from Earth to the Moon, while its mass remains unchanged?",
      hint: "Compare the meaning of mass with the meaning of weight.",
      steps: [
        "Mass is a measure of matter and inertia.",
        "Weight is gravitational force, W = mg.",
        "The Moon has a different gravitational field strength, so weight changes but mass does not."
      ],
      ans: "The Moon has a different gravitational field strength",
      final_check: "Weight depends on g; mass does not.",
      common_mistakes: ["Saying the object loses matter", "Claiming mass and weight are interchangeable"],
      explanation: "Changing the gravitational field changes the gravitational force on the object without changing its mass."
    },
    {
      q: "An object has a mass of 2 kg and a weight of 19.6 N. What is its gravitational field strength?",
      hint: "Calculate weight per unit mass.",
      formula: "g = W / m",
      steps: [
        "W = 19.6 N and m = 2 kg.",
        "g = 19.6 ÷ 2.",
        "g = 9.8 N/kg."
      ],
      ans: "9.8 N/kg",
      final_check: "The result matches the approximate gravitational field strength near Earth's surface.",
      common_mistakes: ["Dividing mass by weight", "Reporting 9.8 N"],
      explanation: "The gravitational field strength is found by dividing weight by mass."
    }
  ]
);

add(
  "mass_weight_and_density",
  "Calculating Weight",
  `
  <h2>Calculating Weight</h2>

  <p>Weight is the gravitational force acting on an object. Calculate it by multiplying the object's mass by the gravitational field strength at its location.</p>

  <p><strong>W = mg</strong></p>

  <p>Before calculating:</p>
  <ol>
    <li>Identify the object's mass in kilograms.</li>
    <li>Identify the gravitational field strength in N/kg.</li>
    <li>Multiply the values.</li>
    <li>State the answer in newtons.</li>
  </ol>

  <h3>Worked example 1: Standard calculation</h3>
  <p>Find the weight of a 3.5 kg object where g = 10 N/kg.</p>
  <p>W = 3.5 × 10 = 35 N.</p>
  <p><strong>Answer:</strong> 35 N.</p>

  <h3>Worked example 2: Decimal field strength</h3>
  <p>Calculate the weight of a 7.5 kg object where g = 9.8 N/kg.</p>
  <p>W = 7.5 × 9.8 = 73.5 N.</p>
  <p><strong>Answer:</strong> 73.5 N.</p>

  <h3>Worked example 3: Mass given in grams</h3>
  <p>A sample has a mass of 800 g. Find its weight where g = 10 N/kg.</p>
  <p>Convert mass: 800 ÷ 1,000 = 0.8 kg.</p>
  <p>W = 0.8 × 10 = 8 N.</p>
  <p><strong>Answer:</strong> 8 N.</p>

  <h3>Worked example 4: Comparing locations</h3>
  <p>A 5 kg object is on Earth where g = 9.8 N/kg and then on a planet where g = 3 N/kg.</p>
  <p>Earth weight = 5 × 9.8 = 49 N.</p>
  <p>Other planet's weight = 5 × 3 = 15 N.</p>
  <p>The mass remains 5 kg at both locations.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Using the wrong value of g.</li>
    <li>Multiplying a mass in grams directly by g in N/kg.</li>
    <li>Reporting weight in kilograms.</li>
    <li>Assuming weight stays constant at every location.</li>
  </ul>
  `,
  [
    {
      q: "Calculate the weight of a 9 kg object where g = 10 N/kg.",
      hint: "Multiply mass by gravitational field strength.",
      formula: "W = mg",
      steps: [
        "m = 9 kg and g = 10 N/kg.",
        "W = 9 × 10.",
        "W = 90 N."
      ],
      ans: "90 N",
      final_check: "Weight is measured in newtons.",
      common_mistakes: ["Answering 90 kg", "Dividing mass by g"],
      explanation: "Weight equals mass multiplied by gravitational field strength."
    },
    {
      q: "A 2.5 kg object is on Earth where g = 9.8 N/kg. Find its weight.",
      hint: "Use the exact field strength given.",
      formula: "W = mg",
      steps: [
        "m = 2.5 kg and g = 9.8 N/kg.",
        "W = 2.5 × 9.8.",
        "W = 24.5 N."
      ],
      ans: "24.5 N",
      final_check: "The answer is expressed in newtons.",
      common_mistakes: ["Using 10 N/kg when 9.8 is specified", "Rounding the answer unnecessarily"],
      explanation: "Multiplying 2.5 kg by 9.8 N/kg gives 24.5 N."
    },
    {
      q: "A parcel has a mass of 600 g. Calculate its weight where g = 10 N/kg.",
      hint: "Convert grams to kilograms before multiplying.",
      formula: "W = mg",
      steps: [
        "Convert 600 g to kilograms: 600 ÷ 1,000 = 0.6 kg.",
        "W = 0.6 × 10.",
        "W = 6 N."
      ],
      ans: "6 N",
      final_check: "The mass was converted to kilograms before applying W = mg.",
      common_mistakes: ["Using 600 as the mass in kilograms", "Answering 6 kg"],
      explanation: "A mass of 600 g is 0.6 kg, which weighs 6 N at 10 N/kg."
    },
    {
      q: "An object weighs 147 N where g = 9.8 N/kg. What is its mass?",
      hint: "Rearrange W = mg to find m.",
      formula: "m = W / g",
      steps: [
        "W = 147 N and g = 9.8 N/kg.",
        "m = 147 ÷ 9.8.",
        "m = 15 kg."
      ],
      ans: "15 kg",
      final_check: "The answer is a mass in kilograms.",
      common_mistakes: ["Multiplying 147 by 9.8", "Reporting weight instead of mass"],
      explanation: "Mass is obtained by dividing weight by gravitational field strength."
    },
    {
      q: "A 4 kg object is moved from a location where g = 10 N/kg to one where g = 2 N/kg. What is its weight at the second location?",
      hint: "Use the gravitational field strength at the second location.",
      formula: "W = mg",
      steps: [
        "Mass = 4 kg.",
        "Second-location field strength = 2 N/kg.",
        "W = 4 × 2 = 8 N."
      ],
      ans: "8 N",
      final_check: "Only the gravitational field strength changes; the mass remains 4 kg.",
      common_mistakes: ["Using the original field strength", "Changing the mass"],
      explanation: "Weight depends on the local gravitational field strength."
    }
  ]
);

add(
  "mass_weight_and_density",
  "Density",
  `
  <h2>Density</h2>

  <p>Density is the mass per unit volume of a substance. It describes how much mass is contained in a given volume.</p>

  <p><strong>Density = mass ÷ volume</strong></p>
  <p><strong>ρ = m/V</strong></p>

  <ul>
    <li><strong>ρ:</strong> density</li>
    <li><strong>m:</strong> mass</li>
    <li><strong>V:</strong> volume</li>
  </ul>

  <p>The SI unit of density is kg/m³. Another commonly used unit is g/cm³.</p>

  <p>Density is a property of the material under specified conditions. For a uniform sample of the same material, increasing the amount increases both mass and volume in the same proportion, so density remains unchanged.</p>

  <h3>Worked example 1: Calculating density</h3>
  <p>A metal block has a mass of 600 kg and a volume of 0.2 m³. Calculate its density.</p>
  <p>ρ = m/V = 600 ÷ 0.2 = 3,000 kg/m³.</p>
  <p><strong>Answer:</strong> 3,000 kg/m³.</p>

  <h3>Worked example 2: Using grams and cubic centimetres</h3>
  <p>A sample has a mass of 180 g and a volume of 60 cm³.</p>
  <p>Density = 180 ÷ 60 = 3 g/cm³.</p>
  <p><strong>Answer:</strong> 3 g/cm³.</p>

  <h3>Worked example 3: Comparing equal volumes</h3>
  <p>Two blocks each have a volume of 2 m³. Block A has a mass of 10 kg, while Block B has a mass of 18 kg.</p>
  <p>Density of A = 10 ÷ 2 = 5 kg/m³.</p>
  <p>Density of B = 18 ÷ 2 = 9 kg/m³.</p>
  <p><strong>Conclusion:</strong> Block B has the greater density.</p>

  <h3>Common mistakes</h3>
  <ul>
    <li>Multiplying mass by volume instead of dividing.</li>
    <li>Mixing units such as kg and cm³ without conversion.</li>
    <li>Writing density in kg or m³ instead of kg/m³.</li>
    <li>Assuming a larger object must have a greater density.</li>
  </ul>
  `,
  [
    {
      q: "A substance has a mass of 240 kg and a volume of 0.08 m³. Calculate its density.",
      hint: "Divide mass by volume.",
      formula: "ρ = m / V",
      steps: [
        "m = 240 kg and V = 0.08 m³.",
        "ρ = 240 ÷ 0.08.",
        "ρ = 3,000 kg/m³."
      ],
      ans: "3,000 kg/m³",
      final_check: "The unit is kilograms per cubic metre.",
      common_mistakes: ["Multiplying mass by volume", "Dividing 0.08 by 240"],
      explanation: "Density is the mass contained in each unit of volume."
    },
    {
      q: "A sample has a mass of 150 g and a volume of 50 cm³. What is its density?",
      hint: "Keep the mass and volume units consistent.",
      formula: "density = mass / volume",
      steps: [
        "Mass = 150 g and volume = 50 cm³.",
        "Density = 150 ÷ 50.",
        "Density = 3 g/cm³."
      ],
      ans: "3 g/cm³",
      final_check: "The units are grams per cubic centimetre.",
      common_mistakes: ["Answering 3 g", "Converting only one of the two quantities unnecessarily"],
      explanation: "Dividing grams by cubic centimetres gives density in g/cm³."
    },
    {
      q: "An object has a density of 8 kg/m³ and a volume of 3 m³. Find its mass.",
      hint: "Rearrange ρ = m/V to make mass the subject.",
      formula: "m = ρV",
      steps: [
        "ρ = 8 kg/m³ and V = 3 m³.",
        "m = 8 × 3.",
        "m = 24 kg."
      ],
      ans: "24 kg",
      final_check: "Density multiplied by volume gives mass.",
      common_mistakes: ["Dividing density by volume", "Giving the answer in kg/m³"],
      explanation: "Mass is the product of density and volume."
    },
    {
      q: "Two blocks have equal volumes. Block A has a mass of 4 kg and Block B has a mass of 7 kg. Which block has the greater density?",
      hint: "Density is mass divided by volume. The volumes are equal.",
      steps: [
        "Both blocks have the same volume.",
        "Block B has the greater mass.",
        "For equal volume, the block with greater mass has greater density."
      ],
      ans: "Block B",
      final_check: "This conclusion depends on the volumes being equal.",
      common_mistakes: ["Choosing the lighter block", "Claiming density cannot be compared without numerical volumes"],
      explanation: "With equal volumes, density increases with mass."
    },
    {
      q: "A material has a mass of 2 kg and a volume of 0.0005 m³. Calculate its density.",
      hint: "Divide the mass by the volume, keeping track of the decimal places.",
      formula: "ρ = m / V",
      steps: [
        "m = 2 kg and V = 0.0005 m³.",
        "ρ = 2 ÷ 0.0005.",
        "ρ = 4,000 kg/m³."
      ],
      ans: "4,000 kg/m³",
      final_check: "A small volume containing 2 kg can have a high density.",
      common_mistakes: ["Calculating 2 × 0.0005", "Misplacing the decimal point"],
      explanation: "Dividing by 0.0005 gives 4,000 kg/m³."
    }
  ]
);
// ============================================================
// PHYSICS — BATCH 5
// Calculating Density → Atmospheric Pressure
// ============================================================

add(
  "physics",
  "mass_weight_and_density",
  "Calculating Density",
  `
  <h2>Calculating Density</h2>
  <p>Density tells us how much mass is contained in a given volume. To calculate density, divide mass by volume.</p>

  <h3>Formula</h3>
  <p><strong>Density = Mass ÷ Volume</strong></p>
  <p>\\(\\rho = \\frac{m}{V}\\)</p>
  <ul>
    <li>\\(\\rho\\) = density</li>
    <li>\\(m\\) = mass</li>
    <li>\\(V\\) = volume</li>
  </ul>
  <p>The SI unit of density is kg/m³. Another common unit is g/cm³.</p>

  <h3>Worked example 1: Find density</h3>
  <p>A block has a mass of 600 g and a volume of 200 cm³. Find its density.</p>
  <ol>
    <li>Write the formula: density = mass ÷ volume.</li>
    <li>Substitute: density = 600 ÷ 200.</li>
    <li>Calculate: density = 3 g/cm³.</li>
  </ol>

  <h3>Worked example 2: Find mass</h3>
  <p>A liquid has a density of 800 kg/m³ and a volume of 0.02 m³.</p>
  <p>Rearrange the formula: mass = density × volume.</p>
  <p>Mass = 800 × 0.02 = <strong>16 kg</strong>.</p>

  <h3>Worked example 3: Find volume</h3>
  <p>An object has a mass of 2 kg and a density of 500 kg/m³.</p>
  <p>Volume = mass ÷ density = 2 ÷ 500 = <strong>0.004 m³</strong>.</p>

  <h3>Unit conversion</h3>
  <p>Before substituting values, make sure the units are compatible. Remember:</p>
  <p><strong>1 g/cm³ = 1000 kg/m³</strong></p>
  <p>For example, 2.7 g/cm³ = 2700 kg/m³.</p>

  <h3>Common mistake</h3>
  <p>Do not multiply mass by volume when calculating density. Divide mass by volume, and include the correct unit in your answer.</p>
  `,
  [
    {
      q: "A stone has a mass of 240 g and a volume of 80 cm³. Calculate its density.",
      hint: "Density = mass ÷ volume.",
      formula: "ρ = m/V",
      steps: [
        "Write the formula: ρ = m/V.",
        "Substitute: ρ = 240/80.",
        "Divide: ρ = 3 g/cm³."
      ],
      ans: "3 g/cm³",
      final_check: "Mass divided by volume gives 240 ÷ 80 = 3.",
      common_mistakes: ["Multiplying mass by volume.", "Leaving out the density unit."],
      explanation: "Density measures mass per unit volume."
    },
    {
      q: "A material has a density of 4 g/cm³ and a volume of 15 cm³. Find its mass.",
      hint: "Rearrange density = mass ÷ volume to make mass the subject.",
      formula: "m = ρV",
      steps: [
        "Start with ρ = m/V.",
        "Multiply both sides by V: m = ρV.",
        "Substitute: m = 4 × 15 = 60 g."
      ],
      ans: "60 g",
      final_check: "60 g ÷ 15 cm³ = 4 g/cm³.",
      common_mistakes: ["Dividing density by volume.", "Using an incompatible unit."],
      explanation: "Mass equals density multiplied by volume."
    },
    {
      q: "An object has a mass of 12 kg and a density of 3000 kg/m³. Calculate its volume.",
      hint: "Volume = mass ÷ density.",
      formula: "V = m/ρ",
      steps: [
        "Write V = m/ρ.",
        "Substitute: V = 12/3000.",
        "Calculate: V = 0.004 m³."
      ],
      ans: "0.004 m³",
      final_check: "3000 × 0.004 = 12 kg.",
      common_mistakes: ["Multiplying mass by density.", "Writing m³ as the mass unit."],
      explanation: "Volume is obtained by dividing mass by density."
    },
    {
      q: "Convert 2.5 g/cm³ into kg/m³.",
      hint: "Multiply a density in g/cm³ by 1000 to convert it to kg/m³.",
      formula: "1 g/cm³ = 1000 kg/m³",
      steps: [
        "Write the conversion factor: 1 g/cm³ = 1000 kg/m³.",
        "Multiply 2.5 by 1000.",
        "The density is 2500 kg/m³."
      ],
      ans: "2500 kg/m³",
      final_check: "2.5 × 1000 = 2500.",
      common_mistakes: ["Dividing by 1000.", "Changing the number without changing the unit."],
      explanation: "The conversion factor between these density units is 1000."
    },
    {
      q: "A liquid has a mass of 900 g and a volume of 1.5 cm³. Calculate its density.",
      hint: "Use mass divided by volume and retain the units.",
      formula: "ρ = m/V",
      steps: [
        "Write ρ = m/V.",
        "Substitute: ρ = 900/1.5.",
        "Calculate: ρ = 600 g/cm³."
      ],
      ans: "600 g/cm³",
      final_check: "600 × 1.5 = 900 g.",
      common_mistakes: ["Reversing mass and volume.", "Rounding before completing the calculation."],
      explanation: "The stated values give a density of 600 g/cm³. Always check that the supplied measurements are realistic."
    }
  ]
);

add(
  "physics",
  "mass_weight_and_density",
  "Relative Density",
  `
  <h2>Relative Density</h2>
  <p>Relative density compares the density of a substance with the density of water. It tells us how dense the substance is compared with water.</p>

  <h3>Formula</h3>
  <p><strong>Relative density = Density of substance ÷ Density of water</strong></p>
  <p>\\(\\text{Relative density} = \\frac{\\rho_s}{\\rho_w}\\)</p>
  <p>For school calculations, the density of water is commonly taken as 1000 kg/m³ or 1 g/cm³.</p>

  <h3>Worked example 1</h3>
  <p>A liquid has a density of 800 kg/m³. Calculate its relative density.</p>
  <ol>
    <li>Relative density = 800 ÷ 1000.</li>
    <li>Relative density = <strong>0.8</strong>.</li>
  </ol>

  <h3>Worked example 2</h3>
  <p>A solid has a density of 2.7 g/cm³.</p>
  <p>Relative density = 2.7 ÷ 1 = <strong>2.7</strong>.</p>

  <h3>Important properties</h3>
  <ul>
    <li>Relative density has no unit because it is a ratio of two densities.</li>
    <li>Convert densities into compatible units before dividing.</li>
    <li>A substance less dense than water may float in water; one more dense than water may sink, depending on the object's overall density and conditions.</li>
  </ul>

  <h3>Common mistake</h3>
  <p>Do not attach kg/m³ or g/cm³ to relative density. Those are units of density, not relative density.</p>
  `,
  [
    {
      q: "A liquid has a density of 700 kg/m³. Calculate its relative density.",
      hint: "Divide by the density of water, 1000 kg/m³.",
      formula: "RD = ρs/ρw",
      steps: [
        "Write RD = density of liquid ÷ density of water.",
        "Substitute: RD = 700/1000.",
        "Calculate: RD = 0.7."
      ],
      ans: "0.7",
      final_check: "The same density units cancel, leaving no unit.",
      common_mistakes: ["Multiplying by 1000.", "Adding kg/m³ to the answer."],
      explanation: "Relative density compares a substance with water."
    },
    {
      q: "A solid has a density of 3.2 g/cm³. Find its relative density.",
      hint: "Use water's density as 1 g/cm³.",
      formula: "RD = ρs/ρw",
      steps: [
        "Write RD = 3.2 ÷ 1.",
        "Calculate the ratio.",
        "Relative density = 3.2."
      ],
      ans: "3.2",
      final_check: "The answer is a number without a unit.",
      common_mistakes: ["Writing 3.2 g/cm³ as the relative density.", "Dividing by 1000 while the given density is in g/cm³."],
      explanation: "The densities are already expressed in the same unit."
    },
    {
      q: "A substance has a relative density of 0.6. What is its density in kg/m³?",
      hint: "Density of substance = relative density × density of water.",
      formula: "ρs = RD × ρw",
      steps: [
        "Write ρs = RD × ρw.",
        "Substitute: ρs = 0.6 × 1000.",
        "Calculate: ρs = 600 kg/m³."
      ],
      ans: "600 kg/m³",
      final_check: "600 ÷ 1000 = 0.6.",
      common_mistakes: ["Dividing the relative density by 1000.", "Giving the density without a unit."],
      explanation: "Multiplying relative density by water's density gives the substance's density."
    },
    {
      q: "A substance has a density of 1200 kg/m³. Is its relative density greater than or less than 1?",
      hint: "Compare 1200 kg/m³ with water's 1000 kg/m³.",
      formula: "RD = ρs/1000",
      steps: [
        "Compare the densities: 1200 is greater than 1000.",
        "Calculate RD = 1200/1000.",
        "RD = 1.2, which is greater than 1."
      ],
      ans: "Greater than 1 (RD = 1.2)",
      final_check: "A substance denser than water has relative density greater than 1.",
      common_mistakes: ["Comparing the number without checking units.", "Assuming every substance has relative density below 1."],
      explanation: "The substance is 1.2 times as dense as water."
    },
    {
      q: "Oil has a density of 0.8 g/cm³. Calculate its relative density using water's density of 1 g/cm³.",
      hint: "Divide the oil's density by water's density.",
      formula: "RD = ρoil/ρwater",
      steps: [
        "Write RD = 0.8/1.",
        "Divide 0.8 by 1.",
        "Relative density = 0.8."
      ],
      ans: "0.8",
      final_check: "The units cancel because both densities use g/cm³.",
      common_mistakes: ["Giving the answer as 0.8 g/cm³.", "Using water's density in a different unit."],
      explanation: "The oil is less dense than water, so its relative density is below 1."
    }
  ]
);

add(
  "physics",
  "friction_and_resistance",
  "Causes of Friction",
  `
  <h2>Causes of Friction</h2>
  <p>Friction is a force that opposes relative sliding, or the tendency of relative sliding, between surfaces in contact.</p>

  <h3>Why friction occurs</h3>
  <ul>
    <li><strong>Surface irregularities:</strong> even surfaces that look smooth have tiny irregularities. These can interlock when pressed together.</li>
    <li><strong>Adhesion:</strong> microscopic attractions between contacting surfaces can resist sliding.</li>
    <li><strong>Force pressing surfaces together:</strong> pressing surfaces together more strongly often increases the frictional force, depending on the materials and conditions.</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>A box is pushed across a rough floor. The floor exerts a frictional force on the box opposite to its sliding relative to the floor.</p>

  <h3>Worked example 2</h3>
  <p>A heavy crate is harder to slide than a similar lighter crate on the same floor. One reason is that the heavier crate presses the surfaces together more strongly.</p>

  <h3>Worked example 3</h3>
  <p>A polished surface may offer less friction than a rough surface under comparable conditions. However, friction also depends on the materials and the condition of the surfaces; roughness alone does not determine every case.</p>

  <h3>Common mistake</h3>
  <p>Friction does not always point opposite to an object's overall motion. It opposes relative slipping at the contact surface. For example, friction between the ground and a walking foot can push the person forward.</p>
  `,
  [
    {
      q: "What is the main role of friction between two surfaces that are sliding relative to each other?",
      hint: "Think about how friction affects the sliding.",
      steps: [
        "Identify the relative sliding between the surfaces.",
        "Friction acts to oppose that relative sliding."
      ],
      ans: "It opposes relative sliding between the surfaces.",
      final_check: "Friction resists relative motion or the tendency for it to occur.",
      common_mistakes: ["Saying friction always increases speed.", "Saying friction only occurs on visibly rough surfaces."],
      explanation: "Friction is a contact force that resists relative sliding."
    },
    {
      q: "Why can tiny irregularities on two surfaces contribute to friction?",
      hint: "Consider what happens when the surfaces are pressed together.",
      steps: [
        "Surfaces have microscopic irregularities.",
        "These irregularities can interlock or resist movement.",
        "Sliding then requires a force to overcome that resistance."
      ],
      ans: "The microscopic irregularities can interlock and resist sliding.",
      final_check: "The irregularities need not be visible to the naked eye.",
      common_mistakes: ["Assuming only large bumps cause friction.", "Claiming all friction comes from visible roughness."],
      explanation: "Microscopic surface structure contributes to resistance between contacting materials."
    },
    {
      q: "A person presses two contacting surfaces together more strongly. What commonly happens to the friction between them?",
      hint: "Think about how strongly the surfaces are pressed together.",
      steps: [
        "The pressing force increases.",
        "The contact interactions usually become stronger.",
        "The frictional force that can be supported commonly increases."
      ],
      ans: "The frictional force commonly increases.",
      final_check: "This is a general trend for many dry surfaces, not an absolute rule for every material.",
      common_mistakes: ["Claiming friction always decreases with greater pressing force.", "Ignoring the surfaces and conditions."],
      explanation: "The normal contact force often affects the frictional force."
    },
    {
      q: "Can two surfaces that look smooth still produce friction?",
      hint: "Think about the microscopic scale.",
      steps: [
        "Visible smoothness does not mean perfectly flat surfaces.",
        "Microscopic irregularities and adhesion can still resist sliding.",
        "Therefore, friction can still occur."
      ],
      ans: "Yes, because microscopic irregularities and adhesion can cause friction.",
      final_check: "Friction does not require large, visible bumps.",
      common_mistakes: ["Assuming smooth-looking surfaces have zero friction.", "Confusing smoothness with the complete absence of contact forces."],
      explanation: "Friction can occur even between polished surfaces."
    },
    {
      q: "A person walks forward without slipping. In which direction can friction from the ground act on the person's foot during the push-off?",
      hint: "Friction opposes slipping, not necessarily the person's overall motion.",
      steps: [
        "The foot pushes backward against the ground.",
        "The ground exerts a forward frictional force on the foot if it does not slip backward.",
        "That forward force helps propel the person."
      ],
      ans: "Forward",
      final_check: "The ground's friction can help a person move forward without slipping.",
      common_mistakes: ["Saying friction must always point backward because the person moves forward.", "Ignoring the direction of possible slipping at the contact."],
      explanation: "Friction opposes relative slipping at the foot-ground contact; it can propel a walker forward."
    }
  ]
);

add(
  "physics",
  "friction_and_resistance",
  "Effects of Friction",
  `
  <h2>Effects of Friction</h2>
  <p>Friction affects movement whenever contacting surfaces resist relative sliding. Its effects can be useful or unwanted.</p>

  <h3>Effect 1: It opposes sliding</h3>
  <p>A box sliding across a floor slows down if the frictional force is not balanced by another forward force.</p>

  <h3>Effect 2: It produces heating</h3>
  <p>When surfaces rub together, some mechanical energy is transferred into internal energy, warming the surfaces.</p>

  <h3>Effect 3: It causes wear</h3>
  <p>Repeated rubbing can gradually remove material from tyres, shoe soles, machine parts and other surfaces.</p>

  <h3>Effect 4: It provides grip</h3>
  <p>Friction between shoes and the ground helps walking. Friction between tyres and the road helps vehicles accelerate, turn and brake.</p>

  <h3>Worked example 1</h3>
  <p>A bicycle brake presses a pad against the wheel's braking surface. Friction transfers kinetic energy mainly into thermal energy, slowing the bicycle.</p>

  <h3>Worked example 2</h3>
  <p>Rubbing your hands together warms them because friction converts some mechanical energy into internal energy.</p>

  <h3>Common mistake</h3>
  <p>Do not conclude that friction is always harmful. Without sufficient friction, walking, gripping and effective braking would be difficult or impossible.</p>
  `,
  [
    {
      q: "A sliding box slows down on a rough floor when no forward force balances friction. What effect of friction explains this?",
      hint: "Consider the direction of friction relative to the sliding.",
      steps: [
        "The box is sliding across the floor.",
        "Friction acts opposite to the relative sliding.",
        "The unbalanced force reduces the box's speed."
      ],
      ans: "Friction opposes sliding and slows the box.",
      final_check: "An unbalanced opposing force causes deceleration.",
      common_mistakes: ["Saying friction always speeds objects up.", "Ignoring other forces acting on the box."],
      explanation: "Friction can reduce the kinetic energy of a moving object."
    },
    {
      q: "Why do your hands become warmer when you rub them together?",
      hint: "Think about energy transfer during friction.",
      steps: [
        "The hands move against each other.",
        "Friction acts at the contacting surfaces.",
        "Some mechanical energy becomes internal energy, warming the hands."
      ],
      ans: "Friction converts some mechanical energy into internal energy.",
      final_check: "The warming is an effect of energy transfer due to friction.",
      common_mistakes: ["Saying friction creates energy from nothing.", "Saying the heat must come from the surroundings alone."],
      explanation: "Friction transfers energy into the internal energy of the contacting surfaces."
    },
    {
      q: "What can happen to shoe soles after repeated use on rough ground?",
      hint: "Consider the effect of repeated rubbing.",
      steps: [
        "The soles repeatedly contact the ground.",
        "Friction acts during movement.",
        "The material gradually wears away."
      ],
      ans: "The shoe soles can wear down.",
      final_check: "Repeated friction can remove material from surfaces.",
      common_mistakes: ["Assuming friction only changes speed.", "Confusing wear with melting in every case."],
      explanation: "Friction can gradually damage or remove material from contacting surfaces."
    },
    {
      q: "Why is friction between tyres and the road important when a vehicle brakes?",
      hint: "Consider how the tyre interacts with the road surface.",
      steps: [
        "The tyre must interact with the road without excessive slipping.",
        "Friction allows the road to exert a braking force on the tyre.",
        "That force helps reduce the vehicle's speed."
      ],
      ans: "It provides grip so the vehicle can slow down.",
      final_check: "Insufficient tyre-road friction can make braking less effective.",
      common_mistakes: ["Claiming friction is always undesirable.", "Confusing tyre-road grip with air resistance."],
      explanation: "Tyre-road friction is important for effective braking and control."
    },
    {
      q: "Name two unwanted effects of friction in moving machinery.",
      hint: "Think about temperature and the condition of machine parts.",
      steps: [
        "Friction can transfer mechanical energy into internal energy.",
        "It can also wear contacting surfaces.",
        "Therefore, heating and wear are two unwanted effects."
      ],
      ans: "Heating and wear",
      final_check: "Both can reduce efficiency or damage machine parts.",
      common_mistakes: ["Naming only slowing down when the question asks for two effects.", "Claiming all friction is unwanted."],
      explanation: "Friction can waste useful mechanical energy and wear machine components."
    }
  ]
);

add(
  "physics",
  "friction_and_resistance",
  "Advantages and Disadvantages of Friction",
  `
  <h2>Advantages and Disadvantages of Friction</h2>
  <p>Friction is useful when grip or controlled slowing is needed. It is disadvantageous when it causes unwanted energy transfer, wear or resistance.</p>

  <h3>Advantages</h3>
  <ul>
    <li><strong>Walking:</strong> friction between shoes and the ground helps prevent slipping.</li>
    <li><strong>Braking:</strong> friction helps vehicles and bicycles slow down.</li>
    <li><strong>Grip:</strong> friction helps hands hold objects and tools.</li>
    <li><strong>Writing:</strong> friction between a pencil and paper allows graphite to mark the paper.</li>
  </ul>

  <h3>Disadvantages</h3>
  <ul>
    <li><strong>Wear:</strong> rubbing can damage surfaces and machine components.</li>
    <li><strong>Heating:</strong> some mechanical energy is transferred into internal energy.</li>
    <li><strong>Reduced efficiency:</strong> machines may require extra energy to overcome unwanted friction.</li>
    <li><strong>Resistance:</strong> friction can oppose movement where sliding is intended.</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>For a car's brakes, friction is an advantage because it helps the car stop.</p>

  <h3>Worked example 2</h3>
  <p>Inside a poorly lubricated engine, unwanted friction can cause heating and wear. Lubrication can reduce this problem.</p>

  <h3>Worked example 3</h3>
  <p>When walking on an icy surface, available friction may be too small for a secure grip, increasing the risk of slipping.</p>

  <h3>Common mistake</h3>
  <p>Whether friction is an advantage depends on the task. The same force that helps brakes work can waste energy inside a machine.</p>
  `,
  [
    {
      q: "Why is friction between shoes and the ground an advantage when walking?",
      hint: "Think about what would happen if your feet slipped backward.",
      steps: [
        "Walking requires the feet to push against the ground.",
        "Friction helps prevent unwanted slipping.",
        "The ground can exert a useful force on the feet."
      ],
      ans: "It provides grip and helps prevent slipping.",
      final_check: "Friction enables controlled contact between the foot and ground.",
      common_mistakes: ["Calling friction harmful in every situation.", "Saying walking requires no friction."],
      explanation: "Foot-ground friction is important for safe walking."
    },
    {
      q: "Give one disadvantage of friction in a machine.",
      hint: "Think about energy and machine parts.",
      steps: [
        "Moving machine parts can rub against one another.",
        "Friction can cause heating or wear.",
        "Either is a disadvantage when unwanted."
      ],
      ans: "It causes unwanted heating or wear.",
      final_check: "Accept either heating or wear as one disadvantage.",
      common_mistakes: ["Giving an advantage instead of a disadvantage.", "Saying friction always stops a machine immediately."],
      explanation: "Unwanted friction can waste energy and damage components."
    },
    {
      q: "Why is friction useful in a bicycle's braking system?",
      hint: "What does the braking system need to do to the bicycle's motion?",
      steps: [
        "The brake pad contacts the braking surface.",
        "Friction opposes the relative motion at the braking contact.",
        "Energy is transferred and the bicycle slows down."
      ],
      ans: "It helps slow down or stop the bicycle.",
      final_check: "Braking relies on controlled friction.",
      common_mistakes: ["Saying brakes work by eliminating all friction.", "Confusing braking friction with air resistance."],
      explanation: "Friction provides the force needed for effective braking."
    },
    {
      q: "A machine wastes energy because its moving parts rub together. Is friction acting as an advantage or a disadvantage in this situation?",
      hint: "Focus on whether the friction helps the intended task.",
      steps: [
        "The machine is losing useful mechanical energy.",
        "The rubbing is unwanted.",
        "Therefore, friction is a disadvantage in this situation."
      ],
      ans: "A disadvantage",
      final_check: "The classification depends on the machine's purpose and the effect of the friction.",
      common_mistakes: ["Classifying all friction as an advantage.", "Ignoring the stated energy loss."],
      explanation: "Unwanted friction reduces the useful output of a machine."
    },
    {
      q: "Why can friction be both an advantage and a disadvantage?",
      hint: "Compare walking with rubbing machine parts.",
      steps: [
        "Friction provides useful grip for walking and braking.",
        "It can also cause wear, heating and energy loss in machinery.",
        "Its value depends on whether the effect is useful or unwanted."
      ],
      ans: "It provides useful grip but can also cause unwanted heating, wear and energy loss.",
      final_check: "The same physical effect can be useful in one situation and harmful in another.",
      common_mistakes: ["Claiming friction has only one type of effect.", "Ignoring the purpose of the activity."],
      explanation: "Friction's usefulness depends on the context."
    }
  ]
);

add(
  "physics",
  "friction_and_resistance",
  "Reducing and Increasing Friction",
  `
  <h2>Reducing and Increasing Friction</h2>
  <p>Friction is reduced when less resistance is needed, and increased when more grip is required. The correct method depends on the task and the surfaces involved.</p>

  <h3>Methods of reducing friction</h3>
  <ul>
    <li><strong>Lubrication:</strong> oil or grease separates contacting surfaces and reduces direct rubbing.</li>
    <li><strong>Ball bearings:</strong> rolling elements allow parts to move with less sliding friction.</li>
    <li><strong>Rollers or wheels:</strong> rolling can replace sliding and often reduces resistance.</li>
    <li><strong>Streamlining:</strong> a suitable shape reduces fluid resistance when moving through air or water.</li>
  </ul>

  <h3>Methods of increasing friction</h3>
  <ul>
    <li><strong>Treads:</strong> tyre treads help maintain grip and channel water away under suitable conditions.</li>
    <li><strong>Rough or high-grip surfaces:</strong> suitable surface materials can improve traction.</li>
    <li><strong>Brake pads:</strong> materials are selected to provide useful friction during braking.</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>Oil is placed between moving machine parts to reduce direct contact and unwanted friction.</p>

  <h3>Worked example 2</h3>
  <p>Ball bearings in a wheel reduce resistance by allowing rolling rather than extensive sliding at the bearing surfaces.</p>

  <h3>Worked example 3</h3>
  <p>Tyres are designed to provide grip on roads. Tread design is especially important when road conditions involve water or loose material.</p>

  <h3>Common mistake</h3>
  <p>Streamlining reduces fluid resistance, not every type of friction. Lubricants are also not suitable for every contact, especially where a high-grip surface is needed.</p>
  `,
  [
    {
      q: "Why is oil applied between moving parts of a machine?",
      hint: "Think about direct rubbing between the surfaces.",
      steps: [
        "Moving parts can rub against one another.",
        "Oil forms a lubricating layer between the surfaces.",
        "This reduces direct rubbing and unwanted friction."
      ],
      ans: "To reduce unwanted friction between moving parts.",
      final_check: "Lubrication can also reduce wear and heating.",
      common_mistakes: ["Saying oil is used to increase friction in machine bearings.", "Claiming oil removes every force between the parts."],
      explanation: "Lubricants reduce friction by separating surfaces and changing their contact conditions."
    },
    {
      q: "How can ball bearings reduce resistance in a rotating wheel?",
      hint: "Compare rolling with sliding.",
      steps: [
        "Without suitable bearings, surfaces may slide against each other.",
        "Ball bearings allow rolling at the bearing contact.",
        "Rolling often reduces resistance compared with sliding."
      ],
      ans: "They allow rolling instead of extensive sliding.",
      final_check: "Ball bearings reduce resistance but do not eliminate every energy loss.",
      common_mistakes: ["Saying ball bearings work by increasing sliding friction.", "Claiming a rotating wheel experiences no resistance."],
      explanation: "Rolling elements reduce friction in many rotating mechanisms."
    },
    {
      q: "Which feature of a tyre can help maintain grip and channel water away on a wet road?",
      hint: "Look at the patterned surface of the tyre.",
      steps: [
        "Tyres have patterned grooves.",
        "The grooves help manage water at the contact area.",
        "Suitable tread design can help maintain grip in wet conditions."
      ],
      ans: "Tyre tread",
      final_check: "Grip also depends on tyre condition, speed, road surface and water depth.",
      common_mistakes: ["Claiming tread guarantees grip in every condition.", "Confusing tyre tread with lubrication."],
      explanation: "Tread patterns help tyres interact with road surfaces, especially in wet conditions."
    },
    {
      q: "Why are streamlined shapes used for objects moving quickly through air?",
      hint: "Air is a fluid that resists movement through it.",
      steps: [
        "An object moving through air experiences air resistance.",
        "A suitable streamlined shape reduces the disturbance and drag.",
        "Less force may be needed to maintain its motion at a given speed."
      ],
      ans: "To reduce air resistance.",
      final_check: "Streamlining reduces drag; it does not remove all resistance.",
      common_mistakes: ["Saying streamlining lubricates a solid contact.", "Claiming air resistance becomes zero."],
      explanation: "Streamlining reduces the resistance from moving through a fluid."
    },
    {
      q: "A person needs more grip when walking on a slippery surface. Should the contact be made more slippery or more grippy?",
      hint: "The goal is to prevent unwanted slipping.",
      steps: [
        "Identify the goal: prevent slipping.",
        "Preventing slipping requires sufficient friction.",
        "A suitable high-grip sole or surface can help increase traction."
      ],
      ans: "More grippy",
      final_check: "A suitable high-grip material can improve traction under appropriate conditions.",
      common_mistakes: ["Suggesting lubrication where grip is needed.", "Assuming any rough material guarantees safe grip."],
      explanation: "Increasing useful friction helps prevent unwanted slipping."
    }
  ]
);

add(
  "physics",
  "friction_and_resistance",
  "Air Resistance and Terminal Velocity",
  `
  <h2>Air Resistance and Terminal Velocity</h2>
  <p>Air resistance, also called drag, is a force exerted by air on an object moving through it. It acts opposite to the object's motion relative to the air.</p>

  <h3>How air resistance changes</h3>
  <p>For many ordinary objects, air resistance increases as speed through the air increases. The exact relationship depends on the object's shape, size and flow conditions.</p>

  <h3>Worked example 1: A falling object</h3>
  <ol>
    <li>At the start of a fall, the object's weight acts downward.</li>
    <li>If air resistance is initially small, the object accelerates downward.</li>
    <li>As its speed increases, air resistance increases upward.</li>
    <li>The resultant downward force becomes smaller, so the acceleration decreases.</li>
  </ol>

  <h3>Terminal velocity</h3>
  <p>Terminal velocity is reached when the upward forces of air resistance and buoyancy balance the object's weight downward. The resultant force is then zero, so the object continues falling at a constant velocity.</p>

  <h3>Worked example 2</h3>
  <p>A falling object has weight 20 N downward and air resistance 20 N upward. If buoyancy is negligible, the resultant force is zero. The object has no acceleration at that instant and, if these forces remain balanced, falls at constant velocity.</p>

  <h3>Worked example 3: A parachute</h3>
  <p>Opening a parachute greatly increases the area interacting with the air. Drag increases, slowing the fall until a new, lower terminal speed can be reached.</p>

  <h3>Common mistake</h3>
  <p>At terminal velocity, the object's velocity is not zero. Its acceleration is zero because the resultant force is zero.</p>
  `,
  [
    {
      q: "In which direction does air resistance act on an object moving downward through still air?",
      hint: "Drag opposes motion relative to the air.",
      steps: [
        "The object moves downward relative to the air.",
        "Air resistance opposes that motion.",
        "Therefore, the drag force acts upward."
      ],
      ans: "Upward",
      final_check: "The force opposes the object's motion through the air.",
      common_mistakes: ["Saying air resistance acts downward on a falling object.", "Confusing air resistance with weight."],
      explanation: "Drag acts opposite to motion relative to the surrounding fluid."
    },
    {
      q: "A falling object has weight 30 N downward and air resistance 10 N upward. Ignore buoyancy. Calculate the resultant force.",
      hint: "Subtract the upward force from the downward force.",
      formula: "Resultant force = weight − air resistance",
      steps: [
        "Weight acts downward: 30 N.",
        "Air resistance acts upward: 10 N.",
        "Resultant force = 30 − 10 = 20 N downward."
      ],
      ans: "20 N downward",
      final_check: "The larger force determines the direction of the resultant.",
      common_mistakes: ["Adding opposite forces as if they act in the same direction.", "Giving the answer without a direction."],
      explanation: "The forces are opposite, so subtract their magnitudes."
    },
    {
      q: "A falling object reaches terminal velocity. What is its acceleration?",
      hint: "At terminal velocity, the resultant force is zero.",
      steps: [
        "The object's weight is balanced by the upward forces.",
        "The resultant force is zero.",
        "By Newton's second law, acceleration is zero."
      ],
      ans: "0 m/s²",
      final_check: "Zero acceleration means velocity is constant, not necessarily zero.",
      common_mistakes: ["Saying terminal velocity means the object stops.", "Confusing velocity with acceleration."],
      explanation: "Balanced forces produce zero acceleration."
    },
    {
      q: "Why does air resistance on a falling object commonly increase as it speeds up?",
      hint: "Think about how fast the object moves relative to the air.",
      steps: [
        "The object's speed through the air increases.",
        "The interaction with the surrounding air becomes stronger.",
        "Drag commonly increases with speed."
      ],
      ans: "Because drag commonly increases with speed through the air.",
      final_check: "The exact relationship depends on shape and flow conditions.",
      common_mistakes: ["Claiming drag is always constant.", "Claiming drag always decreases as speed increases."],
      explanation: "Increasing drag reduces the resultant force and can lead to terminal velocity."
    },
    {
      q: "Why does opening a parachute reduce a falling person's speed?",
      hint: "Consider what happens to the area interacting with the air.",
      steps: [
        "The parachute opens and greatly increases the area exposed to airflow.",
        "Air resistance increases sharply.",
        "The upward drag can exceed weight temporarily, causing the person to slow down."
      ],
      ans: "It increases air resistance, which slows the fall.",
      final_check: "The person may later reach a lower terminal velocity.",
      common_mistakes: ["Saying the parachute reduces air resistance.", "Saying the person must stop permanently."],
      explanation: "A parachute increases drag, reducing the speed of descent."
    }
  ]
);

add(
  "physics",
  "pressure_in_solids",
  "Pressure in Solids",
  `
  <h2>Pressure in Solids</h2>
  <p>Pressure is the normal force acting per unit area of a surface. For a force distributed uniformly over a flat area, pressure is calculated by dividing the perpendicular force by the area.</p>

  <h3>Formula</h3>
  <p><strong>Pressure = Force ÷ Area</strong></p>
  <p>\\(P = \\frac{F}{A}\\)</p>
  <ul>
    <li>\\(P\\) = pressure, measured in pascals (Pa)</li>
    <li>\\(F\\) = force perpendicular to the surface, measured in newtons (N)</li>
    <li>\\(A\\) = area, measured in square metres (m²)</li>
  </ul>
  <p><strong>1 Pa = 1 N/m²</strong></p>

  <h3>Worked example 1: Calculate pressure</h3>
  <p>A force of 100 N acts perpendicularly on an area of 2 m².</p>
  <ol>
    <li>Write P = F/A.</li>
    <li>Substitute P = 100/2.</li>
    <li>Pressure = <strong>50 Pa</strong>.</li>
  </ol>

  <h3>Worked example 2: Smaller area</h3>
  <p>The same 100 N force acts over 0.5 m².</p>
  <p>Pressure = 100/0.5 = <strong>200 Pa</strong>.</p>
  <p>The smaller area produces a greater pressure when the force is unchanged.</p>

  <h3>Worked example 3: Find force</h3>
  <p>If pressure is 400 Pa and area is 0.2 m², then F = PA = 400 × 0.2 = <strong>80 N</strong>.</p>

  <h3>Common mistake</h3>
  <p>Convert the area to m² before calculating pressure in pascals. Also, use the force component perpendicular to the surface.</p>
  `,
  [
    {
      q: "A perpendicular force of 60 N acts on an area of 3 m². Calculate the pressure.",
      hint: "Pressure = force ÷ area.",
      formula: "P = F/A",
      steps: [
        "Write P = F/A.",
        "Substitute P = 60/3.",
        "Calculate P = 20 Pa."
      ],
      ans: "20 Pa",
      final_check: "60 N ÷ 3 m² = 20 N/m² = 20 Pa.",
      common_mistakes: ["Multiplying force by area.", "Writing newtons as the pressure unit."],
      explanation: "Pressure is force per unit area."
    },
    {
      q: "A force of 120 N acts over an area of 0.4 m². Find the pressure.",
      hint: "Divide 120 by 0.4.",
      formula: "P = F/A",
      steps: [
        "Write P = F/A.",
        "Substitute P = 120/0.4.",
        "Calculate P = 300 Pa."
      ],
      ans: "300 Pa",
      final_check: "300 × 0.4 = 120 N.",
      common_mistakes: ["Treating 0.4 as 4.", "Multiplying instead of dividing."],
      explanation: "A force spread over 0.4 m² produces a pressure of 300 Pa."
    },
    {
      q: "A pressure of 500 Pa acts over an area of 0.2 m². Calculate the perpendicular force.",
      hint: "Rearrange P = F/A to make F the subject.",
      formula: "F = PA",
      steps: [
        "Start with P = F/A.",
        "Multiply both sides by A: F = PA.",
        "Substitute F = 500 × 0.2 = 100 N."
      ],
      ans: "100 N",
      final_check: "100 N ÷ 0.2 m² = 500 Pa.",
      common_mistakes: ["Dividing pressure by area.", "Giving the answer in pascals."],
      explanation: "Force equals pressure multiplied by area."
    },
    {
      q: "The same force acts on two surfaces. Surface A has area 0.1 m² and surface B has area 0.5 m². Which surface experiences greater pressure?",
      hint: "For the same force, compare the areas.",
      steps: [
        "Use P = F/A.",
        "The force is the same for both surfaces.",
        "The smaller area produces the greater pressure, so surface A has greater pressure."
      ],
      ans: "Surface A",
      final_check: "For a fixed force, pressure increases as area decreases.",
      common_mistakes: ["Choosing the larger area.", "Assuming pressure is independent of area."],
      explanation: "Pressure is inversely proportional to area when the force is fixed."
    },
    {
      q: "Convert an area of 200 cm² into m² before using it in a pressure calculation.",
      hint: "1 m² = 10,000 cm².",
      steps: [
        "Use 1 m² = 10,000 cm².",
        "Calculate 200 ÷ 10,000.",
        "Area = 0.02 m²."
      ],
      ans: "0.02 m²",
      final_check: "0.02 × 10,000 = 200 cm².",
      common_mistakes: ["Dividing by 100 instead of 10,000.", "Leaving the area in cm² when using force in newtons and pressure in pascals."],
      explanation: "Pressure in pascals uses area in square metres."
    }
  ]
);

add(
  "physics",
  "pressure_in_liquids",
  "Pressure in Liquids",
  `
  <h2>Pressure in Liquids</h2>
  <p>A liquid exerts pressure because of the weight of the liquid above a point. In a liquid at rest, pressure increases with depth and with the liquid's density.</p>

  <h3>Pressure due to a liquid column</h3>
  <p>For a liquid of uniform density, the gauge pressure at depth h is:</p>
  <p>\\(p = \\rho gh\\)</p>
  <ul>
    <li>\\(p\\) = gauge pressure in pascals (Pa)</li>
    <li>\\(\\rho\\) = liquid density in kg/m³</li>
    <li>\\(g\\) = gravitational field strength in N/kg</li>
    <li>\\(h\\) = depth below the liquid surface in metres</li>
  </ul>
  <p>In school calculations, use the value of g given in the question. If none is given, 10 N/kg is often used for convenient approximations.</p>

  <h3>Worked example 1</h3>
  <p>Find the gauge pressure 2 m below the surface of water. Take density = 1000 kg/m³ and g = 10 N/kg.</p>
  <ol>
    <li>Write p = ρgh.</li>
    <li>Substitute p = 1000 × 10 × 2.</li>
    <li>Gauge pressure = <strong>20,000 Pa</strong>.</li>
  </ol>

  <h3>Worked example 2: Greater depth</h3>
  <p>At 4 m depth in the same water, p = 1000 × 10 × 4 = 40,000 Pa. Doubling the depth doubles the gauge pressure.</p>

  <h3>Worked example 3: Different density</h3>
  <p>At the same depth and gravitational field strength, a denser liquid produces a greater gauge pressure because p is proportional to density.</p>

  <h3>Important distinction</h3>
  <p>The formula p = ρgh gives gauge pressure due to the liquid column. Absolute pressure also includes atmospheric pressure at the surface.</p>

  <h3>Common mistake</h3>
  <p>Use depth below the liquid surface, not the container's total height unless the point is at the bottom and the liquid fills that height.</p>
  `,
  [
    {
      q: "Calculate the gauge pressure 3 m below the surface of water. Take ρ = 1000 kg/m³ and g = 10 N/kg.",
      hint: "Use p = ρgh.",
      formula: "p = ρgh",
      steps: [
        "Write p = ρgh.",
        "Substitute p = 1000 × 10 × 3.",
        "Calculate p = 30,000 Pa."
      ],
      ans: "30,000 Pa",
      final_check: "The units kg/m³ × N/kg × m reduce to pascals.",
      common_mistakes: ["Using the depth in centimetres without conversion.", "Adding atmospheric pressure when only gauge pressure is requested."],
      explanation: "Gauge pressure increases with depth in a liquid of uniform density."
    },
    {
      q: "A point is 2 m below the surface of a liquid of density 800 kg/m³. Take g = 10 N/kg. Calculate the gauge pressure.",
      hint: "Multiply density, gravitational field strength and depth.",
      formula: "p = ρgh",
      steps: [
        "Write p = ρgh.",
        "Substitute p = 800 × 10 × 2.",
        "Calculate p = 16,000 Pa."
      ],
      ans: "16,000 Pa",
      final_check: "800 × 10 × 2 = 16,000.",
      common_mistakes: ["Using water's density instead of the given liquid's density.", "Dividing by depth."],
      explanation: "The pressure depends on the actual liquid density."
    },
    {
      q: "Water produces a gauge pressure of 20,000 Pa at a certain depth. If g = 10 N/kg and water density is 1000 kg/m³, find the depth.",
      hint: "Rearrange p = ρgh to make h the subject.",
      formula: "h = p/(ρg)",
      steps: [
        "Start with p = ρgh.",
        "Rearrange: h = p/(ρg).",
        "Substitute: h = 20,000/(1000 × 10) = 2 m."
      ],
      ans: "2 m",
      final_check: "1000 × 10 × 2 = 20,000 Pa.",
      common_mistakes: ["Multiplying pressure by density.", "Reporting the depth in pascals."],
      explanation: "Depth can be found by dividing gauge pressure by density times gravitational field strength."
    },
    {
      q: "At the same depth, which produces greater gauge pressure: a liquid of density 1200 kg/m³ or one of density 900 kg/m³?",
      hint: "In p = ρgh, depth and g are the same for both liquids.",
      formula: "p = ρgh",
      steps: [
        "Compare the densities: 1200 kg/m³ is greater than 900 kg/m³.",
        "The depth and g are unchanged.",
        "The liquid with density 1200 kg/m³ produces greater gauge pressure."
      ],
      ans: "The liquid of density 1200 kg/m³",
      final_check: "At fixed depth and g, gauge pressure is proportional to density.",
      common_mistakes: ["Choosing the less dense liquid.", "Assuming pressure depends only on container shape."],
      explanation: "A denser liquid produces greater pressure at the same depth."
    },
    {
      q: "Why is the gauge pressure at the bottom of a deep tank greater than near the surface?",
      hint: "Consider the weight of liquid above each point.",
      steps: [
        "There is more liquid above the deeper point.",
        "The weight of that liquid produces greater pressure.",
        "Therefore, gauge pressure increases with depth."
      ],
      ans: "Because more liquid lies above the deeper point, producing greater pressure.",
      final_check: "For a uniform liquid at rest, gauge pressure follows p = ρgh.",
      common_mistakes: ["Saying pressure depends only on the tank's width.", "Saying pressure decreases with depth."],
      explanation: "Liquid pressure depends on density, gravitational field strength and depth."
    }
  ]
);

add(
  "physics",
  "atmospheric_pressure",
  "Atmospheric Pressure",
  `
  <h2>Atmospheric Pressure</h2>
  <p>Atmospheric pressure is the pressure exerted by the air around Earth. Air has mass, and gravity gives the atmosphere weight. Air molecules also collide with surfaces, contributing to pressure.</p>

  <h3>What causes atmospheric pressure?</h3>
  <p>The air above a surface contributes to the pressure at that location. Atmospheric pressure acts in all directions, not only downward.</p>

  <h3>Worked example 1: A drinking straw</h3>
  <ol>
    <li>When you suck air from the straw, the pressure inside your mouth and the straw becomes lower.</li>
    <li>Atmospheric pressure on the drink's surface is then greater than the pressure in the straw.</li>
    <li>The pressure difference pushes the liquid up the straw.</li>
  </ol>

  <h3>Worked example 2: A suction cup</h3>
  <p>Pressing a suction cup against a smooth surface removes some air from the space beneath it. The higher outside atmospheric pressure can then press the cup against the surface. A good seal is important.</p>

  <h3>Worked example 3: Altitude</h3>
  <p>Atmospheric pressure generally decreases as altitude increases because less air lies above a higher location.</p>

  <h3>Measuring atmospheric pressure</h3>
  <p>A barometer is an instrument used to measure atmospheric pressure. A mercury barometer balances atmospheric pressure against the pressure due to a column of mercury.</p>

  <h3>Common mistake</h3>
  <p>Atmospheric pressure is not caused only by wind. It exists even when the air appears still, and it acts in all directions.</p>
  `,
  [
    {
      q: "What is atmospheric pressure?",
      hint: "Think about the air surrounding Earth and the pressure it exerts.",
      steps: [
        "Air surrounds Earth and has mass.",
        "Air molecules interact with surfaces, and the atmosphere has weight under gravity.",
        "The resulting pressure is called atmospheric pressure."
      ],
      ans: "The pressure exerted by the surrounding atmosphere.",
      final_check: "Atmospheric pressure exists even when there is no noticeable wind.",
      common_mistakes: ["Defining it as wind speed.", "Saying it acts only downward."],
      explanation: "Atmospheric pressure is exerted by the air surrounding Earth."
    },
    {
      q: "Why can liquid rise through a drinking straw when a person sucks air from it?",
      hint: "Compare the pressure inside the straw with the atmospheric pressure on the drink.",
      steps: [
        "Sucking lowers the pressure inside the straw.",
        "Atmospheric pressure acts on the liquid surface in the cup.",
        "The pressure difference pushes liquid up the straw."
      ],
      ans: "Atmospheric pressure on the drink pushes liquid up the lower-pressure straw.",
      final_check: "The pressure difference, not suction as a pulling force on the liquid, explains the rise.",
      common_mistakes: ["Saying the liquid rises because atmospheric pressure disappears.", "Saying the straw itself creates liquid."],
      explanation: "Liquids move in response to pressure differences."
    },
    {
      q: "What generally happens to atmospheric pressure as altitude increases?",
      hint: "Think about how much air lies above a high location.",
      steps: [
        "At higher altitude, less atmosphere lies above the location.",
        "The air column generally contributes less pressure.",
        "Atmospheric pressure generally decreases."
      ],
      ans: "It decreases.",
      final_check: "This is the general trend in the atmosphere.",
      common_mistakes: ["Saying pressure always increases with altitude.", "Confusing atmospheric pressure with temperature."],
      explanation: "There is generally less air above a location at higher altitude."
    },
    {
      q: "Which instrument is used to measure atmospheric pressure?",
      hint: "It is used in weather observations.",
      steps: [
        "Identify the physical quantity: atmospheric pressure.",
        "The instrument designed to measure it is a barometer."
      ],
      ans: "A barometer",
      final_check: "A barometer measures pressure, not temperature.",
      common_mistakes: ["Answering thermometer.", "Answering anemometer, which measures wind speed."],
      explanation: "Barometers are used to measure atmospheric pressure."
    },
    {
      q: "Why can atmospheric pressure hold a properly sealed suction cup against a smooth surface?",
      hint: "Compare the pressure outside the cup with the pressure beneath it.",
      steps: [
        "The seal allows pressure beneath the cup to be lower than outside pressure.",
        "Atmospheric pressure acts on the outside of the cup.",
        "The pressure difference presses the cup against the surface."
      ],
      ans: "Higher atmospheric pressure outside presses the cup against the surface.",
      final_check: "The seal matters; if air leaks in, the pressure difference is reduced.",
      common_mistakes: ["Saying the cup permanently removes atmospheric pressure.", "Ignoring the need for a seal."],
      explanation: "A pressure difference can produce a net force holding the cup in place."
    }
  ]
);
// ============================================================
// PHYSICS — BATCH 6
// Pressure Applications → Mechanical Properties of Materials
// ============================================================

add(
  "physics",
  "pressure_in_liquids",
  "Applications of Liquid Pressure",
  `
  <h2>Applications of Liquid Pressure</h2>
  <p>Liquid pressure increases with depth. This principle explains why dams are designed with thicker bases, why water can emerge forcefully from a low hole in a tank, and why divers experience greater pressure at greater depths.</p>

  <h3>Worked example 1: Holes in a water tank</h3>
  <p>Imagine a tank with holes at different heights. Water from a lower hole generally emerges faster because the pressure due to the water above that hole is greater.</p>

  <h3>Worked example 2: Dam walls</h3>
  <p>The bottom of a dam experiences greater water pressure than the top. A dam is therefore often made thicker near its base to withstand the greater pressure and resulting forces.</p>

  <h3>Worked example 3: Divers</h3>
  <p>As a diver moves deeper into water, the gauge pressure increases according to p = ρgh. This is why depth matters when planning safe dives.</p>

  <h3>Key relationship</h3>
  <p>For a liquid of uniform density at rest, pressure at a point depends on the liquid's density, gravitational field strength and depth below the surface. It does not directly depend on the shape of the container.</p>

  <h3>Common mistake</h3>
  <p>Do not confuse pressure with total force. Pressure is force per unit area. The total force on a surface depends on pressure and the area over which it acts.</p>
  `,
  [
    {
      q: "A tank has two small holes, one near the surface and one much lower down. Why does water generally emerge faster from the lower hole?",
      hint: "Compare the pressure at the two depths.",
      formula: "p = ρgh",
      steps: [
        "The lower hole is at a greater depth.",
        "Greater depth gives greater gauge pressure in the water.",
        "The larger pressure difference can make the water emerge faster."
      ],
      ans: "The water pressure is greater at the lower hole.",
      final_check: "For the same liquid, gauge pressure increases with depth.",
      common_mistakes: ["Saying pressure is greatest near the surface.", "Assuming the tank's width determines the pressure at a given depth."],
      explanation: "Liquid pressure depends on depth, density and gravitational field strength."
    },
    {
      q: "Why is a dam wall often thicker at the bottom than at the top?",
      hint: "Think about the pressure exerted by deeper water.",
      steps: [
        "Water pressure increases with depth.",
        "The lower part of the wall experiences greater water pressure.",
        "A thicker base helps the dam withstand the resulting forces."
      ],
      ans: "The water pressure is greater at the bottom.",
      final_check: "The design must account for the forces created by the water pressure.",
      common_mistakes: ["Saying water pressure decreases with depth.", "Claiming the wall is thicker because water is denser at the bottom in an ordinary stationary tank."],
      explanation: "A dam must withstand the increasing pressure with depth."
    },
    {
      q: "A diver moves from 2 m depth to 5 m depth in the same water. Does the gauge pressure increase or decrease?",
      hint: "Compare the two depths in p = ρgh.",
      formula: "p = ρgh",
      steps: [
        "The liquid density and gravitational field strength remain the same.",
        "Depth increases from 2 m to 5 m.",
        "Gauge pressure therefore increases."
      ],
      ans: "It increases.",
      final_check: "At a greater depth in the same liquid, gauge pressure is greater.",
      common_mistakes: ["Saying pressure decreases because the diver is farther from the surface.", "Confusing gauge pressure with atmospheric pressure alone."],
      explanation: "Liquid pressure increases with depth."
    },
    {
      q: "Does liquid pressure at a fixed depth in a uniform liquid depend directly on the shape of the container?",
      hint: "Use the variables in the liquid-pressure formula.",
      formula: "p = ρgh",
      steps: [
        "The formula includes density, gravitational field strength and depth.",
        "Container shape is not one of these variables.",
        "Therefore, pressure at the same depth is independent of container shape under the same conditions."
      ],
      ans: "No.",
      final_check: "The liquid must be at rest and have the same density and depth conditions.",
      common_mistakes: ["Assuming a wider container automatically has greater pressure at the same depth.", "Confusing pressure with the total force on the container walls."],
      explanation: "Pressure at a point in a stationary liquid depends on depth, density and g."
    },
    {
      q: "A uniform liquid has density 1000 kg/m³. Taking g = 10 N/kg, calculate the gauge pressure at 4 m depth.",
      hint: "Substitute the density, gravitational field strength and depth into p = ρgh.",
      formula: "p = ρgh",
      steps: [
        "Write p = ρgh.",
        "Substitute p = 1000 × 10 × 4.",
        "Calculate p = 40,000 Pa."
      ],
      ans: "40,000 Pa",
      final_check: "1000 × 10 × 4 = 40,000 Pa.",
      common_mistakes: ["Using 4 cm instead of 4 m.", "Adding atmospheric pressure when gauge pressure is requested."],
      explanation: "The gauge pressure is 40,000 Pa at the stated depth."
    }
  ]
);

add(
  "physics",
  "pressure_in_liquids",
  "Pressure Acts in All Directions",
  `
  <h2>Pressure Acts in All Directions</h2>
  <p>A liquid at rest exerts pressure in all directions. At a given point in a stationary liquid, the pressure has the same magnitude in every direction.</p>

  <h3>Worked example 1: A hole in the side of a container</h3>
  <p>Water flows sideways from a hole in a tank because the water exerts pressure on the side wall. Liquid pressure is not limited to downward forces.</p>

  <h3>Worked example 2: A submerged object</h3>
  <p>Water presses on the top, bottom and sides of an immersed object. The pressure is greater at the bottom than at the top when those surfaces are at different depths.</p>

  <h3>Worked example 3: Pressure differences</h3>
  <p>Although pressure acts in all directions at a point, pressure can differ between two points at different depths. The difference can create a resultant force.</p>

  <h3>Important distinction</h3>
  <p>Pressure is a scalar quantity: it has magnitude but no single direction of its own. The force exerted by pressure on a surface acts perpendicular to that surface.</p>

  <h3>Common mistake</h3>
  <p>Do not say that liquid pressure acts only downward. The weight of the liquid contributes to the pressure, but the liquid also exerts pressure sideways and upward.</p>
  `,
  [
    {
      q: "In which directions does a stationary liquid exert pressure at a point?",
      hint: "Pressure is not restricted to the direction of gravity.",
      steps: [
        "A liquid presses on surfaces around it.",
        "At a point in a stationary liquid, pressure acts with equal magnitude in every direction.",
        "Therefore, it is not only downward."
      ],
      ans: "In all directions.",
      final_check: "At a point in a liquid at rest, pressure has the same magnitude in every direction.",
      common_mistakes: ["Saying pressure acts only downward.", "Confusing pressure with the direction of the liquid's weight."],
      explanation: "Liquid pressure acts in all directions."
    },
    {
      q: "Why does water flow sideways from a hole in the side of a filled tank?",
      hint: "Consider the force exerted by the water on the tank wall.",
      steps: [
        "The water exerts pressure on the side wall.",
        "At the hole, the wall no longer blocks the water.",
        "The water can flow outward through the opening."
      ],
      ans: "The water exerts pressure on the side of the tank.",
      final_check: "Sideways flow shows that liquid pressure is not only downward.",
      common_mistakes: ["Saying water pressure acts only vertically.", "Claiming the water flows sideways only because of gravity."],
      explanation: "A liquid exerts pressure on the sides of its container."
    },
    {
      q: "At a point in a stationary liquid, how does pressure magnitude compare in different directions?",
      hint: "Use the property of pressure in a fluid at rest.",
      steps: [
        "Consider a single point in the stationary liquid.",
        "Pressure at that point is isotropic.",
        "Its magnitude is equal in every direction."
      ],
      ans: "It is equal in every direction.",
      final_check: "Pressure can still be greater at a deeper point than at a shallower point.",
      common_mistakes: ["Saying sideways pressure is always zero.", "Confusing equality at one point with equality at all depths."],
      explanation: "Pressure in a fluid at rest is equal in every direction at a given point."
    },
    {
      q: "What is the direction of the pressure force exerted by a fluid on a flat wall?",
      hint: "Think about the angle between the force and the surface.",
      steps: [
        "Fluid pressure acts normally on a surface.",
        "Normal means perpendicular.",
        "Therefore, the pressure force is perpendicular to the wall."
      ],
      ans: "Perpendicular to the wall.",
      final_check: "Pressure force on a surface acts at 90° to that surface.",
      common_mistakes: ["Saying pressure force acts parallel to the wall.", "Confusing pressure with fluid flow direction."],
      explanation: "Pressure produces a normal force on the surface."
    },
    {
      q: "The bottom of a submerged object is deeper than its top. Why can the water exert a greater pressure on the bottom?",
      hint: "Compare the depths of the two surfaces.",
      steps: [
        "The bottom is at greater depth.",
        "Liquid pressure increases with depth.",
        "The pressure at the bottom is therefore greater."
      ],
      ans: "The bottom is deeper, where liquid pressure is greater.",
      final_check: "For a uniform liquid, p = ρgh describes the change in gauge pressure with depth.",
      common_mistakes: ["Saying pressure is equal at all depths.", "Assuming pressure acts only downward."],
      explanation: "Pressure is equal in all directions at a point, but its magnitude changes with depth."
    }
  ]
);

add(
  "physics",
  "pressure_in_gases",
  "Pressure in Gases",
  `
  <h2>Pressure in Gases</h2>
  <p>A gas consists of particles moving randomly. Gas pressure is caused by these particles colliding with the walls of their container and exerting forces on them.</p>

  <h3>Worked example 1: Air in a tyre</h3>
  <p>Air particles collide with the inside walls of a tyre. These collisions produce pressure on the tyre's inner surface.</p>

  <h3>Worked example 2: Compressing a gas</h3>
  <p>If a gas is compressed into a smaller volume while its temperature remains constant and the amount of gas stays fixed, its pressure increases. The particles have less space and collide with the walls more frequently.</p>

  <h3>Worked example 3: Heating a gas in a sealed container</h3>
  <p>When a gas in a rigid sealed container is heated, its particles have greater average kinetic energy. Their collisions with the walls become more forceful, so the pressure increases if the volume remains constant.</p>

  <h3>Key conditions</h3>
  <ul>
    <li>Compression effects depend on temperature and the amount of gas.</li>
    <li>Heating increases pressure when the gas is in a fixed-volume container.</li>
    <li>If a container can expand, its volume may change instead of pressure rising as much.</li>
  </ul>

  <h3>Common mistake</h3>
  <p>Gas particles do not need to be pushed continuously in one direction to produce pressure. Their random motion and collisions create pressure in all directions.</p>
  `,
  [
    {
      q: "What causes gas pressure inside a sealed container?",
      hint: "Think about how moving gas particles interact with the container walls.",
      steps: [
        "Gas particles move randomly.",
        "They collide with the container walls.",
        "The collisions exert forces on the walls, producing pressure."
      ],
      ans: "Collisions of gas particles with the container walls.",
      final_check: "Pressure results from particle collisions and force per unit area.",
      common_mistakes: ["Saying gas pressure is caused only by gravity.", "Claiming gas particles are stationary."],
      explanation: "Randomly moving particles collide with the walls and exert pressure."
    },
    {
      q: "A fixed amount of gas is compressed at constant temperature. What happens to its pressure?",
      hint: "The gas occupies a smaller volume while temperature stays constant.",
      steps: [
        "The gas volume decreases.",
        "The particles have less space in which to move.",
        "Collisions with the container walls become more frequent, so pressure increases."
      ],
      ans: "The pressure increases.",
      final_check: "This relationship applies to a fixed amount of gas at constant temperature.",
      common_mistakes: ["Saying pressure decreases when volume decreases.", "Ignoring the constant-temperature condition."],
      explanation: "For a fixed amount of gas at constant temperature, pressure increases as volume decreases."
    },
    {
      q: "A sealed rigid container of gas is heated. What happens to the gas pressure?",
      hint: "The volume cannot increase, but the particles gain kinetic energy.",
      steps: [
        "Heating increases the particles' average kinetic energy.",
        "The particles collide with the walls more forcefully.",
        "With the volume fixed, the pressure increases."
      ],
      ans: "The pressure increases.",
      final_check: "The conclusion assumes the sealed container remains rigid and the amount of gas is unchanged.",
      common_mistakes: ["Saying the pressure must decrease when temperature rises.", "Ignoring the fixed volume."],
      explanation: "Heating a gas in a rigid container increases its pressure."
    },
    {
      q: "Why does gas pressure act on the walls in different directions?",
      hint: "Consider the directions in which gas particles move.",
      steps: [
        "Gas particles move randomly in many directions.",
        "They collide with different parts of the container walls.",
        "These collisions produce pressure in all directions."
      ],
      ans: "Because gas particles move randomly and collide with the walls in different directions.",
      final_check: "The random motion of particles explains pressure in all directions.",
      common_mistakes: ["Saying all gas particles move upward.", "Confusing pressure with a single particle's direction of motion."],
      explanation: "Random particle motion produces pressure in all directions."
    },
    {
      q: "What happens to the pressure of a fixed amount of gas if its volume decreases while temperature remains constant?",
      hint: "Use the inverse pressure-volume relationship.",
      steps: [
        "Temperature and amount of gas remain constant.",
        "Volume decreases.",
        "Pressure increases."
      ],
      ans: "Pressure increases.",
      final_check: "At constant temperature, pressure is inversely proportional to volume for a fixed amount of gas.",
      common_mistakes: ["Saying pressure and volume both decrease.", "Applying the relationship without its stated conditions."],
      explanation: "A smaller volume leads to more frequent wall collisions under the stated conditions."
    }
  ]
);

add(
  "physics",
  "pressure_in_gases",
  "Pressure and Volume of a Gas",
  `
  <h2>Pressure and Volume of a Gas</h2>
  <p>For a fixed amount of gas at constant temperature, pressure is inversely proportional to volume. This relationship is known as Boyle's law.</p>

  <h3>Formula</h3>
  <p>\\(P_1V_1 = P_2V_2\\)</p>
  <p>Here, P₁ and V₁ are the initial pressure and volume, while P₂ and V₂ are the final pressure and volume.</p>

  <h3>Worked example 1</h3>
  <p>A gas occupies 600 cm³ at a pressure of 100 kPa. It is compressed to 300 cm³ at constant temperature. Find the final pressure.</p>
  <ol>
    <li>Write P₁V₁ = P₂V₂.</li>
    <li>Substitute: 100 × 600 = P₂ × 300.</li>
    <li>P₂ = (100 × 600) ÷ 300 = <strong>200 kPa</strong>.</li>
  </ol>

  <h3>Worked example 2</h3>
  <p>A gas at 150 kPa occupies 400 cm³. Its pressure changes to 100 kPa at constant temperature.</p>
  <p>V₂ = P₁V₁ ÷ P₂ = (150 × 400) ÷ 100 = <strong>600 cm³</strong>.</p>

  <h3>Interpretation</h3>
  <p>Halving the volume doubles the pressure, provided temperature and amount of gas remain constant.</p>

  <h3>Common mistake</h3>
  <p>Do not use Boyle's law without checking the conditions. Pressure units must be consistent, and volume units must be consistent across the two states.</p>
  `,
  [
    {
      q: "A gas has volume 400 cm³ at 100 kPa. What is its pressure when compressed to 200 cm³ at constant temperature?",
      hint: "Use P₁V₁ = P₂V₂.",
      formula: "P₂ = P₁V₁/V₂",
      steps: [
        "Write P₁V₁ = P₂V₂.",
        "Substitute: 100 × 400 = P₂ × 200.",
        "P₂ = 40,000/200 = 200 kPa."
      ],
      ans: "200 kPa",
      final_check: "Halving the volume doubles the pressure at constant temperature.",
      common_mistakes: ["Dividing the initial pressure by the volume ratio incorrectly.", "Changing the volume unit in only one state."],
      explanation: "Boyle's law describes the inverse relationship between pressure and volume."
    },
    {
      q: "A gas at 120 kPa occupies 500 cm³. Find its volume at 200 kPa if temperature remains constant.",
      hint: "Rearrange P₁V₁ = P₂V₂ to find V₂.",
      formula: "V₂ = P₁V₁/P₂",
      steps: [
        "Write V₂ = P₁V₁/P₂.",
        "Substitute: V₂ = (120 × 500)/200.",
        "Calculate V₂ = 300 cm³."
      ],
      ans: "300 cm³",
      final_check: "The higher pressure corresponds to the smaller volume.",
      common_mistakes: ["Multiplying the initial volume by the pressure ratio in the wrong order.", "Reporting pressure units for volume."],
      explanation: "At constant temperature, increasing pressure decreases volume."
    },
    {
      q: "A gas occupies 250 cm³ at 80 kPa. Its volume becomes 500 cm³ at constant temperature. Calculate the final pressure.",
      hint: "The volume doubles, so consider the inverse pressure-volume relationship.",
      formula: "P₂ = P₁V₁/V₂",
      steps: [
        "Write P₂ = P₁V₁/V₂.",
        "Substitute: P₂ = (80 × 250)/500.",
        "Calculate P₂ = 40 kPa."
      ],
      ans: "40 kPa",
      final_check: "Doubling the volume halves the pressure under Boyle's law conditions.",
      common_mistakes: ["Doubling the pressure when volume doubles.", "Ignoring constant temperature."],
      explanation: "Pressure and volume are inversely proportional for a fixed amount of gas at constant temperature."
    },
    {
      q: "Which two conditions must remain constant when applying Boyle's law to a fixed sample of gas?",
      hint: "Boyle's law describes pressure-volume changes under specified conditions.",
      steps: [
        "The sample's temperature must remain constant.",
        "The amount of gas must remain fixed.",
        "Under these conditions, P₁V₁ = P₂V₂ applies."
      ],
      ans: "Temperature and amount of gas",
      final_check: "The gas sample must not leak or gain additional gas.",
      common_mistakes: ["Saying volume must remain constant.", "Leaving out the temperature condition."],
      explanation: "Boyle's law relates pressure and volume at constant temperature for a fixed amount of gas."
    },
    {
      q: "At constant temperature, the pressure of a fixed amount of gas increases from 50 kPa to 150 kPa. If its initial volume is 900 cm³, calculate its final volume.",
      hint: "Use V₂ = P₁V₁/P₂.",
      formula: "V₂ = P₁V₁/P₂",
      steps: [
        "Write V₂ = P₁V₁/P₂.",
        "Substitute V₂ = (50 × 900)/150.",
        "Calculate V₂ = 300 cm³."
      ],
      ans: "300 cm³",
      final_check: "Tripling the pressure reduces the volume to one-third under Boyle's law conditions.",
      common_mistakes: ["Multiplying 900 by 3.", "Using initial pressure in the denominator instead of final pressure."],
      explanation: "Pressure rises by a factor of three, so volume falls by a factor of three."
    }
  ]
);

add(
  "mechanical_properties_of_materials",
  "mechanical_properties_of_materials",
  "Elasticity and Plasticity",
  `
  <h2>Elasticity and Plasticity</h2>
  <p>When a force deforms a material, the material may return to its original shape when the force is removed, or it may remain permanently deformed.</p>

  <h3>Elastic deformation</h3>
  <p>A material undergoes elastic deformation when it returns to its original shape and dimensions after the deforming force is removed, provided it has not been damaged or taken beyond its elastic limit.</p>

  <h3>Plastic deformation</h3>
  <p>A material undergoes plastic deformation when some deformation remains after the force is removed.</p>

  <h3>Worked example 1: Spring</h3>
  <p>A spring is stretched slightly and returns to its original length when the load is removed. This is elastic behaviour.</p>

  <h3>Worked example 2: Bent wire</h3>
  <p>A wire is bent and stays bent after the force is removed. It has undergone plastic deformation.</p>

  <h3>Worked example 3: Elastic limit</h3>
  <p>If a spring is stretched too far, it may not return to its original length. The force has taken it beyond its elastic limit.</p>

  <h3>Common mistake</h3>
  <p>Elasticity does not mean that a material must be soft or stretch easily. It describes recovery after the deforming force is removed.</p>
  `,
  [
    {
      q: "A spring returns to its original length after a small load is removed. What type of deformation has it undergone?",
      hint: "Think about whether the spring recovers its original shape.",
      steps: [
        "The spring changes length while loaded.",
        "The load is removed.",
        "The spring returns to its original length, showing elastic deformation."
      ],
      ans: "Elastic deformation",
      final_check: "Elastic behaviour involves recovery after the force is removed.",
      common_mistakes: ["Calling all stretching plastic deformation.", "Assuming elastic means the spring cannot change shape under load."],
      explanation: "An elastic material returns to its original shape when the deforming force is removed within the elastic range."
    },
    {
      q: "A piece of metal remains bent after the force that bent it is removed. What type of deformation has occurred?",
      hint: "Check whether the original shape returns.",
      steps: [
        "The metal is bent by a force.",
        "The force is removed.",
        "The metal remains bent, indicating permanent deformation."
      ],
      ans: "Plastic deformation",
      final_check: "Plastic deformation leaves a lasting change in shape.",
      common_mistakes: ["Calling it elastic because the metal was initially bent by a force.", "Ignoring the shape after the force is removed."],
      explanation: "Plastic deformation is not fully reversed when the force is removed."
    },
    {
      q: "Does elasticity mean a material must be soft?",
      hint: "Focus on recovery, not how much force is needed to deform the material.",
      steps: [
        "Elasticity describes whether a material recovers its original shape.",
        "Softness describes how easily a material may be deformed.",
        "These properties are not the same."
      ],
      ans: "No. Elasticity describes recovery of shape, not softness.",
      final_check: "A material can be stiff and still behave elastically.",
      common_mistakes: ["Equating elasticity with softness.", "Equating stiffness with permanent deformation."],
      explanation: "Elasticity and stiffness are different mechanical properties."
    },
    {
      q: "What may happen to a spring if it is stretched beyond its elastic limit?",
      hint: "Consider whether it can recover its original length.",
      steps: [
        "The spring is stretched too far.",
        "Its deformation may no longer be fully reversible.",
        "It may remain permanently extended or become damaged."
      ],
      ans: "It may fail to return to its original length.",
      final_check: "The exact result depends on the material and how far it is stretched.",
      common_mistakes: ["Claiming it must always break.", "Saying it will always return perfectly."],
      explanation: "Beyond the elastic limit, permanent deformation may occur."
    },
    {
      q: "A material is stretched and remains longer after the load is removed. Is the remaining extension elastic or plastic?",
      hint: "Focus on what remains after unloading.",
      steps: [
        "The load is removed.",
        "The material does not fully recover its original length.",
        "The remaining deformation is plastic."
      ],
      ans: "Plastic deformation",
      final_check: "A permanent change in dimensions indicates plastic deformation.",
      common_mistakes: ["Calling the whole process elastic because the material stretched.", "Ignoring the remaining extension."],
      explanation: "Plastic deformation is the part of deformation that remains after unloading."
    }
  ]
);

add(
  "mechanical_properties_of_materials",
  "mechanical_properties_of_materials",
  "Hooke's Law",
  `
  <h2>Hooke's Law</h2>
  <p>For a suitable elastic spring, extension is directly proportional to the applied force, provided the elastic limit is not exceeded. This relationship is known as Hooke's law.</p>

  <h3>Formula</h3>
  <p>\\(F = ke\\)</p>
  <ul>
    <li>\\(F\\) = applied force in newtons (N)</li>
    <li>\\(k\\) = spring constant in N/m</li>
    <li>\\(e\\) = extension in metres (m)</li>
  </ul>

  <h3>Worked example 1: Calculate force</h3>
  <p>A spring has a spring constant of 200 N/m and an extension of 0.05 m.</p>
  <ol>
    <li>Write F = ke.</li>
    <li>Substitute F = 200 × 0.05.</li>
    <li>Force = <strong>10 N</strong>.</li>
  </ol>

  <h3>Worked example 2: Calculate extension</h3>
  <p>A force of 12 N acts on a spring with k = 300 N/m.</p>
  <p>Extension = F/k = 12/300 = <strong>0.04 m</strong>.</p>

  <h3>Worked example 3: Calculate spring constant</h3>
  <p>A force of 15 N produces an extension of 0.03 m.</p>
  <p>k = F/e = 15/0.03 = <strong>500 N/m</strong>.</p>

  <h3>Common mistake</h3>
  <p>Extension is the increase in length, not the spring's total length. Convert centimetres to metres when using a spring constant in N/m.</p>
  `,
  [
    {
      q: "A spring has a spring constant of 100 N/m and is extended by 0.08 m. Calculate the applied force.",
      hint: "Use F = ke.",
      formula: "F = ke",
      steps: [
        "Write F = ke.",
        "Substitute F = 100 × 0.08.",
        "Calculate F = 8 N."
      ],
      ans: "8 N",
      final_check: "100 N/m × 0.08 m = 8 N.",
      common_mistakes: ["Dividing k by extension.", "Using centimetres as metres without converting."],
      explanation: "Within the elastic range, force equals spring constant multiplied by extension."
    },
    {
      q: "A spring extends by 0.04 m when a force of 20 N is applied. Calculate its spring constant.",
      hint: "Rearrange F = ke to make k the subject.",
      formula: "k = F/e",
      steps: [
        "Write k = F/e.",
        "Substitute k = 20/0.04.",
        "Calculate k = 500 N/m."
      ],
      ans: "500 N/m",
      final_check: "500 × 0.04 = 20 N.",
      common_mistakes: ["Multiplying force by extension.", "Giving the spring constant in newtons."],
      explanation: "The spring constant measures force required per unit extension."
    },
    {
      q: "A spring has a spring constant of 250 N/m. What extension results from a force of 5 N?",
      hint: "Use e = F/k.",
      formula: "e = F/k",
      steps: [
        "Write e = F/k.",
        "Substitute e = 5/250.",
        "Calculate e = 0.02 m."
      ],
      ans: "0.02 m",
      final_check: "250 N/m × 0.02 m = 5 N.",
      common_mistakes: ["Multiplying force by spring constant.", "Reporting the extension in N/m."],
      explanation: "Extension equals force divided by spring constant."
    },
    {
      q: "A spring extends by 3 cm under a force of 6 N. Calculate its spring constant in N/m.",
      hint: "Convert 3 cm to metres before calculating k = F/e.",
      formula: "k = F/e",
      steps: [
        "Convert 3 cm to 0.03 m.",
        "Write k = F/e = 6/0.03.",
        "Calculate k = 200 N/m."
      ],
      ans: "200 N/m",
      final_check: "200 N/m × 0.03 m = 6 N.",
      common_mistakes: ["Using 3 as the extension in metres.", "Forgetting the unit N/m."],
      explanation: "Consistent SI units are needed for the spring constant in N/m."
    },
    {
      q: "A spring's extension doubles while it remains within the range where Hooke's law applies. What happens to the applied force?",
      hint: "Force and extension are directly proportional under Hooke's law.",
      formula: "F = ke",
      steps: [
        "The spring constant remains unchanged.",
        "Hooke's law states F = ke.",
        "Doubling extension doubles the force."
      ],
      ans: "The force doubles.",
      final_check: "This applies while the spring remains within its Hooke's-law range.",
      common_mistakes: ["Saying force stays constant.", "Applying the proportionality beyond the elastic range."],
      explanation: "For a constant spring constant, force is directly proportional to extension."
    }
  ]
);

add(
  "mechanical_properties_of_materials",
  "mechanical_properties_of_materials",
  "Stress and Strain",
  `
  <h2>Stress and Strain</h2>
  <p>Stress and strain describe how a material responds when forces deform it.</p>

  <h3>Stress</h3>
  <p>Stress is the applied force per unit cross-sectional area.</p>
  <p>\\(\\text{Stress} = \\frac{F}{A}\\)</p>
  <p>Its SI unit is the pascal (Pa), equivalent to N/m².</p>

  <h3>Strain</h3>
  <p>For a stretched wire or rod, tensile strain is extension divided by original length.</p>
  <p>\\(\\text{Strain} = \\frac{\\text{extension}}{\\text{original length}}\\)</p>
  <p>Strain is a ratio and has no unit.</p>

  <h3>Worked example 1: Stress</h3>
  <p>A force of 100 N acts on a cross-sectional area of 0.002 m².</p>
  <p>Stress = 100 ÷ 0.002 = <strong>50,000 Pa</strong>.</p>

  <h3>Worked example 2: Strain</h3>
  <p>A wire originally 2 m long extends by 0.004 m.</p>
  <p>Strain = 0.004 ÷ 2 = <strong>0.002</strong>.</p>

  <h3>Worked example 3: Interpret strain</h3>
  <p>A strain of 0.01 means the extension is 0.01 times the original length, or 1% of that length.</p>

  <h3>Common mistake</h3>
  <p>Stress has units, but strain does not. Always use the original length in the strain formula, not the stretched length.</p>
  `,
  [
    {
      q: "A force of 200 N acts on a cross-sectional area of 0.004 m². Calculate the stress.",
      hint: "Stress = force ÷ cross-sectional area.",
      formula: "Stress = F/A",
      steps: [
        "Write stress = F/A.",
        "Substitute stress = 200/0.004.",
        "Calculate stress = 50,000 Pa."
      ],
      ans: "50,000 Pa",
      final_check: "N divided by m² gives Pa.",
      common_mistakes: ["Multiplying force by area.", "Giving stress in metres."],
      explanation: "Stress is force per unit cross-sectional area."
    },
    {
      q: "A wire of original length 1.5 m extends by 0.003 m. Calculate the tensile strain.",
      hint: "Divide extension by original length.",
      formula: "Strain = extension/original length",
      steps: [
        "Write strain = extension/original length.",
        "Substitute strain = 0.003/1.5.",
        "Calculate strain = 0.002."
      ],
      ans: "0.002",
      final_check: "Strain has no unit because metres cancel.",
      common_mistakes: ["Dividing original length by extension.", "Adding a unit such as metres to strain."],
      explanation: "Strain measures extension relative to the original length."
    },
    {
      q: "A wire has an original length of 2 m and a tensile strain of 0.005. Calculate its extension.",
      hint: "Extension = strain × original length.",
      formula: "Extension = strain × original length",
      steps: [
        "Rearrange strain = extension/original length.",
        "Extension = strain × original length.",
        "Extension = 0.005 × 2 = 0.01 m."
      ],
      ans: "0.01 m",
      final_check: "0.01 m divided by 2 m equals 0.005.",
      common_mistakes: ["Dividing strain by original length.", "Reporting strain as the extension."],
      explanation: "Multiplying strain by original length gives the extension."
    },
    {
      q: "A force of 60 N produces a stress of 30,000 Pa in a wire. Calculate the cross-sectional area.",
      hint: "Rearrange stress = force ÷ area.",
      formula: "A = F/stress",
      steps: [
        "Write stress = F/A.",
        "Rearrange: A = F/stress.",
        "Substitute A = 60/30,000 = 0.002 m²."
      ],
      ans: "0.002 m²",
      final_check: "60 N ÷ 0.002 m² = 30,000 Pa.",
      common_mistakes: ["Multiplying force by stress.", "Giving area in pascals."],
      explanation: "Area is found by dividing force by stress."
    },
    {
      q: "A wire's original length is 4 m and its extension is 0.02 m. Calculate the strain.",
      hint: "Use extension divided by original length.",
      formula: "Strain = extension/original length",
      steps: [
        "Write strain = extension/original length.",
        "Substitute strain = 0.02/4.",
        "Calculate strain = 0.005."
      ],
      ans: "0.005",
      final_check: "The strain is dimensionless.",
      common_mistakes: ["Using the final length instead of the original length.", "Adding metres to the strain."],
      explanation: "Strain is the fractional change in length."
    }
  ]
);

add(
  "mechanical_properties_of_materials",
  "mechanical_properties_of_materials",
  "Young's Modulus",
  `
  <h2>Young's Modulus</h2>
  <p>Young's modulus describes the stiffness of a material under tensile or compressive loading within its elastic range. It is the ratio of stress to strain.</p>

  <h3>Formula</h3>
  <p>\\(E = \\frac{\\text{stress}}{\\text{strain}}\\)</p>
  <p>Since strain has no unit, Young's modulus has the same unit as stress: pascals (Pa).</p>

  <h3>Worked example 1</h3>
  <p>A wire experiences a stress of 4 × 10⁷ Pa and a strain of 0.002.</p>
  <ol>
    <li>Write E = stress ÷ strain.</li>
    <li>Substitute E = (4 × 10⁷) ÷ 0.002.</li>
    <li>E = <strong>2 × 10¹⁰ Pa</strong>.</li>
  </ol>

  <h3>Worked example 2: Compare materials</h3>
  <p>For the same tensile stress, a material with a greater Young's modulus has a smaller strain in the linear elastic range. It is stiffer under those conditions.</p>

  <h3>Worked example 3: Find stress</h3>
  <p>If E = 2 × 10¹¹ Pa and strain = 0.001, stress = E × strain = 2 × 10⁸ Pa.</p>

  <h3>Common mistake</h3>
  <p>Young's modulus is not the same as force or extension. It is a material property determined from stress and strain, and the simple relationship is used in the linear elastic range.</p>
  `,
  [
    {
      q: "A material has stress 6 × 10⁷ Pa and strain 0.003. Calculate Young's modulus.",
      hint: "Young's modulus = stress ÷ strain.",
      formula: "E = stress/strain",
      steps: [
        "Write E = stress/strain.",
        "Substitute E = (6 × 10⁷)/0.003.",
        "Calculate E = 2 × 10¹⁰ Pa."
      ],
      ans: "2 × 10¹⁰ Pa",
      final_check: "6 × 10⁷ ÷ 0.003 = 2 × 10¹⁰.",
      common_mistakes: ["Multiplying stress by strain.", "Giving Young's modulus in metres."],
      explanation: "Young's modulus is the ratio of stress to strain."
    },
    {
      q: "A material has Young's modulus 2 × 10¹¹ Pa and strain 0.002. Calculate the stress.",
      hint: "Rearrange E = stress ÷ strain.",
      formula: "Stress = E × strain",
      steps: [
        "Write stress = E × strain.",
        "Substitute stress = (2 × 10¹¹) × 0.002.",
        "Calculate stress = 4 × 10⁸ Pa."
      ],
      ans: "4 × 10⁸ Pa",
      final_check: "Stress divided by strain gives 2 × 10¹¹ Pa.",
      common_mistakes: ["Dividing Young's modulus by strain.", "Forgetting powers of ten."],
      explanation: "Stress equals Young's modulus multiplied by strain."
    },
    {
      q: "Two materials experience the same tensile stress. Material A has a greater Young's modulus than material B. Which has the smaller strain in the linear elastic range?",
      hint: "For a fixed stress, strain = stress ÷ Young's modulus.",
      formula: "Strain = stress/E",
      steps: [
        "Both materials experience the same stress.",
        "Strain is stress divided by Young's modulus.",
        "The larger modulus gives the smaller strain, so material A has smaller strain."
      ],
      ans: "Material A",
      final_check: "A greater Young's modulus indicates greater stiffness under these conditions.",
      common_mistakes: ["Saying the greater modulus produces greater strain at the same stress.", "Ignoring the same-stress condition."],
      explanation: "For a fixed stress, strain decreases as Young's modulus increases."
    },
    {
      q: "A wire has stress 1.5 × 10⁸ Pa and Young's modulus 5 × 10¹⁰ Pa. Calculate the strain.",
      hint: "Strain = stress ÷ Young's modulus.",
      formula: "Strain = stress/E",
      steps: [
        "Write strain = stress/E.",
        "Substitute (1.5 × 10⁸)/(5 × 10¹⁰).",
        "Calculate strain = 0.003."
      ],
      ans: "0.003",
      final_check: "5 × 10¹⁰ × 0.003 = 1.5 × 10⁸ Pa.",
      common_mistakes: ["Reversing stress and Young's modulus.", "Giving strain in pascals."],
      explanation: "Strain is dimensionless and equals stress divided by Young's modulus in the linear elastic range."
    },
    {
      q: "What does a high Young's modulus indicate about a material in the linear elastic range?",
      hint: "Compare how much two materials deform under the same stress.",
      steps: [
        "Young's modulus is stress divided by strain.",
        "A larger modulus means less strain for a given stress.",
        "Therefore, the material is stiffer under those conditions."
      ],
      ans: "It is relatively stiff and undergoes less strain for a given stress.",
      final_check: "Young's modulus describes stiffness, not necessarily strength or toughness.",
      common_mistakes: ["Equating stiffness with breaking strength.", "Claiming a high modulus means a material cannot break."],
      explanation: "Young's modulus measures the elastic stiffness of a material."
    }
  ]
);
// ============================================================
// PHYSICS — BATCH 7
// Moments and Equilibrium → Work, Energy and Power
// ============================================================

add(
  "moments_and_equilibrium",
  "moments_and_equilibrium",
  "Moment of a Force",
  `
  <h2>Moment of a Force</h2>
  <p>The moment of a force is its turning effect about a pivot or fixed point. It depends on the size of the force and the perpendicular distance from the pivot to the force's line of action.</p>

  <h3>Formula</h3>
  <p><strong>Moment = Force × perpendicular distance</strong></p>
  <p>\\(M = Fd\\)</p>
  <ul>
    <li>Moment, M, is measured in newton metres (N m).</li>
    <li>Force, F, is measured in newtons (N).</li>
    <li>Perpendicular distance, d, is measured in metres (m).</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>A force of 20 N acts perpendicularly at a distance of 0.5 m from a pivot.</p>
  <ol>
    <li>Write M = Fd.</li>
    <li>Substitute M = 20 × 0.5.</li>
    <li>Moment = <strong>10 N m</strong>.</li>
  </ol>

  <h3>Worked example 2</h3>
  <p>A 30 N force acts 0.2 m from a pivot.</p>
  <p>Moment = 30 × 0.2 = <strong>6 N m</strong>.</p>

  <h3>Worked example 3: Find the force</h3>
  <p>A moment of 12 N m is produced at a perpendicular distance of 0.4 m.</p>
  <p>Force = moment ÷ distance = 12 ÷ 0.4 = <strong>30 N</strong>.</p>

  <h3>Common mistake</h3>
  <p>Use the perpendicular distance from the pivot to the force's line of action, not necessarily the full length of the object.</p>
  `,
  [
    {
      q: "A force of 15 N acts perpendicularly 0.4 m from a pivot. Calculate its moment.",
      hint: "Moment = force × perpendicular distance.",
      formula: "M = Fd",
      steps: [
        "Write M = Fd.",
        "Substitute M = 15 × 0.4.",
        "Calculate M = 6 N m."
      ],
      ans: "6 N m",
      final_check: "15 × 0.4 = 6.",
      common_mistakes: ["Dividing force by distance.", "Giving the answer in newtons only."],
      explanation: "The moment measures the turning effect of the force about the pivot."
    },
    {
      q: "A force of 40 N produces a moment of 20 N m. Find the perpendicular distance from the pivot.",
      hint: "Distance = moment ÷ force.",
      formula: "d = M/F",
      steps: [
        "Start with M = Fd.",
        "Rearrange to d = M/F.",
        "Substitute d = 20/40 = 0.5 m."
      ],
      ans: "0.5 m",
      final_check: "40 × 0.5 = 20 N m.",
      common_mistakes: ["Multiplying moment by force.", "Giving distance in N m."],
      explanation: "Rearranging the moment formula gives the perpendicular distance."
    },
    {
      q: "A 25 N force acts perpendicularly 0.8 m from a pivot. Calculate the moment.",
      hint: "Multiply the force by the perpendicular distance.",
      formula: "M = Fd",
      steps: [
        "Write M = Fd.",
        "Substitute M = 25 × 0.8.",
        "Calculate M = 20 N m."
      ],
      ans: "20 N m",
      final_check: "The moment increases when either the force or its perpendicular distance increases.",
      common_mistakes: ["Using 25 ÷ 0.8.", "Confusing distance with area."],
      explanation: "A larger force or lever arm produces a greater moment."
    },
    {
      q: "A moment of 18 N m acts at a perpendicular distance of 0.6 m. Calculate the force.",
      hint: "Force = moment ÷ distance.",
      formula: "F = M/d",
      steps: [
        "Write F = M/d.",
        "Substitute F = 18/0.6.",
        "Calculate F = 30 N."
      ],
      ans: "30 N",
      final_check: "30 × 0.6 = 18 N m.",
      common_mistakes: ["Multiplying moment by distance.", "Giving the answer in metres."],
      explanation: "The force is found by dividing the moment by the perpendicular distance."
    },
    {
      q: "Two equal perpendicular forces act separately on the same pivot. Force A acts 0.2 m away and force B acts 0.5 m away. Which produces the larger moment?",
      hint: "The forces are equal, so compare their perpendicular distances.",
      formula: "M = Fd",
      steps: [
        "The forces have equal magnitude.",
        "Moment is proportional to perpendicular distance for a fixed force.",
        "Force B acts farther from the pivot and produces the larger moment."
      ],
      ans: "Force B",
      final_check: "The larger perpendicular distance produces the larger moment for equal forces.",
      common_mistakes: ["Choosing the force nearer the pivot.", "Ignoring that the force magnitudes are equal."],
      explanation: "Moment depends on force and perpendicular distance."
    }
  ]
);

add(
  "moments_and_equilibrium",
  "moments_and_equilibrium",
  "Clockwise and Anticlockwise Moments",
  `
  <h2>Clockwise and Anticlockwise Moments</h2>
  <p>A force can turn an object clockwise or anticlockwise about a pivot. The turning direction depends on where the force acts and the direction in which it pushes or pulls.</p>

  <h3>Identifying turning direction</h3>
  <ul>
    <li><strong>Clockwise:</strong> the object tends to rotate in the direction of clock hands.</li>
    <li><strong>Anticlockwise:</strong> the object tends to rotate opposite to clock hands.</li>
  </ul>

  <h3>Worked example 1: A seesaw</h3>
  <p>A child sitting to the left of a central pivot pushes the left end downward. The seesaw tends to turn anticlockwise.</p>

  <h3>Worked example 2: A door</h3>
  <p>Pushing a door away from its hinges makes it turn about the hinge line. The hinges act as the pivot axis.</p>

  <h3>Worked example 3: Reversing the force</h3>
  <p>At the same point on a lever, reversing the direction of the force reverses the turning tendency.</p>

  <h3>Common mistake</h3>
  <p>Do not determine the turning direction from the force's position alone. You must consider both the position relative to the pivot and the direction of the force.</p>
  `,
  [
    {
      q: "A horizontal seesaw has a pivot at its centre. A downward force acts on its left end. Which way does the seesaw tend to turn?",
      hint: "Imagine the left end moving downward and the right end moving upward.",
      steps: [
        "The pivot is at the centre.",
        "The left end is pushed downward.",
        "The seesaw tends to turn anticlockwise."
      ],
      ans: "Anticlockwise",
      final_check: "The turning direction is judged about the pivot.",
      common_mistakes: ["Calling every downward force clockwise.", "Ignoring which side of the pivot the force acts on."],
      explanation: "A downward force on the left side of a central pivot produces an anticlockwise moment."
    },
    {
      q: "A downward force acts on the right end of a horizontal lever whose pivot is at the centre. What is its turning direction?",
      hint: "Imagine the right end moving down and the left end moving up.",
      steps: [
        "The force acts to the right of the pivot.",
        "It pushes the right end downward.",
        "The lever tends to turn clockwise."
      ],
      ans: "Clockwise",
      final_check: "A downward force on the right side produces a clockwise turning tendency.",
      common_mistakes: ["Using the same turning direction as a force on the left side.", "Ignoring the force direction."],
      explanation: "The position and direction of the force determine the turning sense."
    },
    {
      q: "A force produces a clockwise moment about a pivot. If the force direction is reversed at the same point, what happens to the turning direction?",
      hint: "Reversing the force reverses its turning tendency.",
      steps: [
        "The point of application stays the same.",
        "The force direction is reversed.",
        "The moment's turning direction reverses."
      ],
      ans: "It becomes anticlockwise.",
      final_check: "The magnitude may remain the same if the force magnitude and perpendicular distance remain unchanged.",
      common_mistakes: ["Saying the direction cannot change because the position is fixed.", "Assuming the moment must become zero."],
      explanation: "Reversing a force at the same lever arm reverses its turning effect."
    },
    {
      q: "What acts as the pivot axis of an ordinary hinged door?",
      hint: "Identify the line about which the door rotates.",
      steps: [
        "The door rotates when it opens or closes.",
        "Its rotation occurs about the hinge line.",
        "Therefore, the hinge line is the pivot axis."
      ],
      ans: "The hinge line",
      final_check: "The pivot is the axis about which rotation occurs.",
      common_mistakes: ["Calling the handle the pivot.", "Confusing the point where the force is applied with the pivot."],
      explanation: "A door rotates about its hinges."
    },
    {
      q: "Why is a force's position relative to the pivot important when determining its moment?",
      hint: "Consider the perpendicular distance in M = Fd.",
      steps: [
        "Moment depends on force and perpendicular distance.",
        "Changing the position can change that distance.",
        "Therefore, the same force can produce different moments at different positions."
      ],
      ans: "Because the perpendicular distance from the pivot affects the moment.",
      final_check: "For a fixed force, a larger perpendicular distance produces a larger moment.",
      common_mistakes: ["Saying only force magnitude matters.", "Using the object's total length regardless of where the force acts."],
      explanation: "The moment depends on the force's lever arm about the pivot."
    }
  ]
);

add(
  "moments_and_equilibrium",
  "moments_and_equilibrium",
  "Principle of Moments",
  `
  <h2>Principle of Moments</h2>
  <p>For a body in rotational equilibrium, the total clockwise moment about a pivot equals the total anticlockwise moment about that pivot.</p>

  <h3>Relationship</h3>
  <p><strong>Sum of clockwise moments = Sum of anticlockwise moments</strong></p>

  <h3>Worked example 1</h3>
  <p>A 20 N force acts 0.5 m to the left of a pivot. What force acting 0.25 m to the right would balance it, assuming the forces produce opposite turning directions?</p>
  <ol>
    <li>Left moment = 20 × 0.5 = 10 N m.</li>
    <li>For balance, the right moment must be 10 N m.</li>
    <li>Force × 0.25 = 10.</li>
    <li>Force = <strong>40 N</strong>.</li>
  </ol>

  <h3>Worked example 2</h3>
  <p>A clockwise moment is 12 N m and the anticlockwise moment is 12 N m. The net moment is zero, so there is no resultant turning effect.</p>

  <h3>Worked example 3</h3>
  <p>If the clockwise moment is 15 N m and the anticlockwise moment is 9 N m, the resultant moment is 6 N m clockwise.</p>

  <h3>Common mistake</h3>
  <p>Equal moments establish rotational balance about the chosen pivot. Full mechanical equilibrium also requires the resultant force to be zero.</p>
  `,
  [
    {
      q: "A clockwise moment of 18 N m acts on a balanced lever. What must the total anticlockwise moment be?",
      hint: "Apply the principle of moments.",
      steps: [
        "A balanced lever is in rotational equilibrium.",
        "Clockwise and anticlockwise moments are equal.",
        "The anticlockwise moment must be 18 N m."
      ],
      ans: "18 N m",
      final_check: "Equal opposing moments give zero resultant moment.",
      common_mistakes: ["Adding the moments to find the balancing value.", "Assuming the balancing moment is zero."],
      explanation: "For rotational equilibrium, total clockwise moment equals total anticlockwise moment."
    },
    {
      q: "A 10 N force acts 0.4 m from a pivot. What force at 0.2 m on the opposite side balances the moments?",
      hint: "Calculate the first moment, then divide it by the second distance.",
      formula: "F₁d₁ = F₂d₂",
      steps: [
        "First moment = 10 × 0.4 = 4 N m.",
        "For balance, F₂ × 0.2 = 4.",
        "F₂ = 4/0.2 = 20 N."
      ],
      ans: "20 N",
      final_check: "20 × 0.2 = 4 N m.",
      common_mistakes: ["Using the same force despite the different distances.", "Multiplying the first moment by 0.2."],
      explanation: "A shorter lever arm needs a greater force to produce the same moment."
    },
    {
      q: "The clockwise moment is 25 N m and the anticlockwise moment is 17 N m. Find the resultant moment.",
      hint: "Subtract the smaller opposing moment from the larger.",
      steps: [
        "Clockwise moment = 25 N m.",
        "Anticlockwise moment = 17 N m.",
        "Resultant = 25 − 17 = 8 N m clockwise."
      ],
      ans: "8 N m clockwise",
      final_check: "The larger moment determines the resultant direction.",
      common_mistakes: ["Adding opposing moments.", "Giving the magnitude without its direction."],
      explanation: "Opposing moments subtract when finding the resultant turning effect."
    },
    {
      q: "A 30 N force acts 0.6 m from a pivot. Calculate the moment that an opposing force must produce to balance it.",
      hint: "Find the moment first, then use the principle of moments.",
      formula: "M = Fd",
      steps: [
        "Calculate the moment: 30 × 0.6 = 18 N m.",
        "A balanced lever needs an equal opposing moment.",
        "The opposing moment must be 18 N m."
      ],
      ans: "18 N m",
      final_check: "Equal opposite moments give zero net moment.",
      common_mistakes: ["Giving 30 N as the balancing moment.", "Forgetting to multiply force by distance."],
      explanation: "The principle of moments requires equal opposing moments for rotational equilibrium."
    },
    {
      q: "A lever has equal clockwise and anticlockwise moments. What is its resultant moment?",
      hint: "Opposing moments cancel when their magnitudes are equal.",
      steps: [
        "Identify the two moments as opposite in turning direction.",
        "Their magnitudes are equal.",
        "Subtracting one from the other gives zero."
      ],
      ans: "0 N m",
      final_check: "Zero resultant moment means no net turning effect.",
      common_mistakes: ["Adding both magnitudes.", "Assuming zero resultant moment always proves zero resultant force."],
      explanation: "Equal opposing moments cancel."
    }
  ]
);

add(
  "moments_and_equilibrium",
  "moments_and_equilibrium",
  "Centre of Gravity",
  `
  <h2>Centre of Gravity</h2>
  <p>The centre of gravity of a body is the point through which the resultant gravitational force on the body acts. In a uniform gravitational field, it coincides with the centre of mass.</p>

  <h3>Worked example 1: A uniform ruler</h3>
  <p>For a uniform ruler of the same material and cross-section throughout, the centre of gravity is at its midpoint when the gravitational field is uniform.</p>

  <h3>Worked example 2: An irregular flat object</h3>
  <p>The centre of gravity of a freely suspended irregular lamina can be located by suspending it from different points and drawing vertical lines using a plumb line. The lines intersect at the centre of gravity.</p>

  <h3>Worked example 3: A loaded object</h3>
  <p>Adding a load to one side of an object can shift its centre of gravity toward the added mass.</p>

  <h3>Why it matters</h3>
  <p>The position of the centre of gravity affects balance and stability. An object is less likely to topple when the vertical line through its centre of gravity remains within its base of support.</p>

  <h3>Common mistake</h3>
  <p>The centre of gravity does not have to be inside the material itself. For example, a ring's centre of gravity can lie in its empty central space.</p>
  `,
  [
    {
      q: "Where is the centre of gravity of a uniform ruler in a uniform gravitational field?",
      hint: "A uniform ruler has its mass evenly distributed along its length.",
      steps: [
        "The ruler is uniform along its length.",
        "Its mass is symmetrically distributed.",
        "The centre of gravity is at the midpoint."
      ],
      ans: "At the midpoint",
      final_check: "This assumes the ruler is uniform and the gravitational field is uniform.",
      common_mistakes: ["Choosing one end of the ruler.", "Applying the midpoint rule to every irregular object."],
      explanation: "A uniform ruler's centre of gravity lies at its geometric centre."
    },
    {
      q: "What instrument can be used to mark the vertical line when locating the centre of gravity of a suspended irregular lamina?",
      hint: "It indicates the vertical direction using a hanging weight.",
      steps: [
        "Suspend the lamina freely.",
        "Hang a weighted string beside it.",
        "The string identifies the vertical line."
      ],
      ans: "A plumb line",
      final_check: "Repeating the process from another suspension point helps locate the intersection.",
      common_mistakes: ["Using a thermometer.", "Assuming one suspension line alone always identifies the exact point."],
      explanation: "A plumb line identifies the vertical direction through the suspension point."
    },
    {
      q: "What happens to an object's centre of gravity when a substantial mass is added to one side?",
      hint: "Think about where the mass distribution becomes greater.",
      steps: [
        "The added mass changes the object's mass distribution.",
        "The combined centre of gravity shifts toward the added mass.",
        "The exact shift depends on the positions and masses involved."
      ],
      ans: "It shifts toward the added mass.",
      final_check: "The shift depends on the size and position of the added mass.",
      common_mistakes: ["Saying the centre of gravity always stays at the geometric centre.", "Assuming the shift is independent of where the mass is added."],
      explanation: "The centre of gravity depends on the distribution of weight."
    },
    {
      q: "Must the centre of gravity always lie inside the material of an object?",
      hint: "Consider a ring or a hollow frame.",
      steps: [
        "The centre of gravity is a point describing the resultant weight.",
        "A ring can have a symmetric mass distribution around an empty centre.",
        "Its centre of gravity can lie in the empty space."
      ],
      ans: "No.",
      final_check: "A centre of gravity can lie in empty space within or outside the material.",
      common_mistakes: ["Assuming the point must contain material.", "Confusing centre of gravity with a physical component."],
      explanation: "The centre of gravity is a reference point for the body's weight, not necessarily a point made of material."
    },
    {
      q: "Why is the centre of gravity important when considering whether an object will topple?",
      hint: "Consider the vertical line through the centre of gravity and the object's base.",
      steps: [
        "The object's weight acts through its centre of gravity.",
        "If the vertical line through that point falls outside the base of support, the weight can produce a toppling moment.",
        "Therefore, the centre of gravity's position affects stability."
      ],
      ans: "Its position determines how the weight can produce a toppling moment relative to the base.",
      final_check: "The base of support and any other contact forces also matter.",
      common_mistakes: ["Saying the centre of gravity has no effect on stability.", "Claiming an object always topples whenever its centre of gravity is high."],
      explanation: "Stability depends partly on the centre of gravity's position relative to the base of support."
    }
  ]
);

add(
  "moments_and_equilibrium",
  "moments_and_equilibrium",
  "Stability of Objects",
  `
  <h2>Stability of Objects</h2>
  <p>Stability describes how well an object resists toppling when disturbed. Two important factors are the height of its centre of gravity and the width of its base of support.</p>

  <h3>Factors that increase stability</h3>
  <ul>
    <li>A lower centre of gravity.</li>
    <li>A wider base of support.</li>
    <li>A mass distribution that keeps the vertical line through the centre of gravity within the base when slightly tilted.</li>
  </ul>

  <h3>Worked example 1: A wide-based vehicle</h3>
  <p>A vehicle with a wider base of support is generally more resistant to toppling than an otherwise similar vehicle with a narrow base.</p>

  <h3>Worked example 2: Lowering a load</h3>
  <p>Carrying a heavy load lower can lower the combined centre of gravity, often improving stability.</p>

  <h3>Worked example 3: Toppling condition</h3>
  <p>When an object tilts enough that the vertical line through its centre of gravity falls outside its base of support, its weight can create a moment that makes it topple.</p>

  <h3>Common mistake</h3>
  <p>A low centre of gravity improves stability, but it does not guarantee that an object can never topple. Base width, tilt and external forces also matter.</p>
  `,
  [
    {
      q: "Which is generally more stable: an otherwise similar object with a low centre of gravity or one with a high centre of gravity?",
      hint: "Consider how far the object must tilt before its weight produces a toppling moment.",
      steps: [
        "A lower centre of gravity generally requires a larger tilt before its vertical line leaves the base.",
        "This makes toppling less likely under comparable conditions.",
        "Therefore, the lower-centre-of-gravity object is generally more stable."
      ],
      ans: "The object with a low centre of gravity.",
      final_check: "Other conditions, including base width, must be comparable.",
      common_mistakes: ["Choosing the high centre of gravity.", "Ignoring the base of support."],
      explanation: "A low centre of gravity generally increases stability."
    },
    {
      q: "How does widening an object's base of support generally affect its stability?",
      hint: "A wider base allows a larger range of tilt before the weight's line of action leaves it.",
      steps: [
        "The base of support becomes wider.",
        "The vertical line through the centre of gravity can remain within the base through a greater range of tilt.",
        "The object is generally more resistant to toppling."
      ],
      ans: "It generally increases stability.",
      final_check: "This comparison assumes other relevant factors remain similar.",
      common_mistakes: ["Saying a wider base always makes an object impossible to topple.", "Confusing base width with mass alone."],
      explanation: "A wider base increases the range over which the weight can act within the support area."
    },
    {
      q: "What can happen when the vertical line through an object's centre of gravity falls outside its base of support?",
      hint: "Consider the turning effect of the object's weight.",
      steps: [
        "The weight acts vertically through the centre of gravity.",
        "Its line of action lies outside the support base.",
        "The weight can create a toppling moment."
      ],
      ans: "The object may topple.",
      final_check: "The exact motion depends on the contact forces and surrounding conditions.",
      common_mistakes: ["Saying the object always returns to its original position.", "Ignoring the weight's line of action."],
      explanation: "A weight line outside the base can create a turning effect that causes toppling."
    },
    {
      q: "Why can carrying a heavy load close to the ground improve stability?",
      hint: "Consider the position of the combined centre of gravity.",
      steps: [
        "The load contributes to the combined centre of gravity.",
        "Placing it lower tends to lower the combined centre of gravity.",
        "A lower centre of gravity generally improves stability."
      ],
      ans: "It lowers the combined centre of gravity.",
      final_check: "The improvement depends on the load's mass and position.",
      common_mistakes: ["Saying the load changes the base width.", "Claiming stability depends only on total mass."],
      explanation: "Lowering the centre of gravity generally makes toppling less likely."
    },
    {
      q: "Does a low centre of gravity guarantee that an object can never topple?",
      hint: "Consider other factors affecting stability.",
      steps: [
        "A low centre of gravity generally improves stability.",
        "However, a narrow base or a large external force can still cause toppling.",
        "Therefore, it is not an absolute guarantee."
      ],
      ans: "No.",
      final_check: "Stability depends on centre of gravity, base of support and the disturbance.",
      common_mistakes: ["Treating low centre of gravity as an absolute guarantee.", "Ignoring the object's base."],
      explanation: "A low centre of gravity helps but does not eliminate all possible toppling."
    }
  ]
);

add(
  "work_energy_power",
  "work_energy_power",
  "Work Done by a Force",
  `
  <h2>Work Done by a Force</h2>
  <p>In physics, work is done when a force causes displacement. For a constant force acting in the same direction as the displacement, work done is the force multiplied by the distance moved.</p>

  <h3>Formula</h3>
  <p>\\(W = Fs\\)</p>
  <ul>
    <li>W = work done, measured in joules (J)</li>
    <li>F = force in newtons (N)</li>
    <li>s = displacement in metres (m), along the force's direction</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>A force of 10 N moves a box 3 m in the direction of the force.</p>
  <p>Work done = 10 × 3 = <strong>30 J</strong>.</p>

  <h3>Worked example 2</h3>
  <p>A force of 50 N moves an object 0.2 m in the force's direction.</p>
  <p>Work done = 50 × 0.2 = <strong>10 J</strong>.</p>

  <h3>Worked example 3: No displacement</h3>
  <p>A person holds a stationary bag. Although the person applies an upward force, the bag has no displacement. The mechanical work done by that force on the stationary bag is zero.</p>

  <h3>Common mistake</h3>
  <p>In physics, feeling tired does not by itself mean that mechanical work has been done on an object. There must be displacement in the direction of the force, or a force component along the displacement.</p>
  `,
  [
    {
      q: "A 12 N force moves a box 4 m in the direction of the force. Calculate the work done.",
      hint: "Work = force × distance moved in the force's direction.",
      formula: "W = Fs",
      steps: [
        "Write W = Fs.",
        "Substitute W = 12 × 4.",
        "Calculate W = 48 J."
      ],
      ans: "48 J",
      final_check: "12 N × 4 m = 48 N m = 48 J.",
      common_mistakes: ["Dividing force by distance.", "Giving the answer in newtons."],
      explanation: "Work done equals force multiplied by displacement in the force's direction."
    },
    {
      q: "A force of 80 N moves an object 0.5 m in the force's direction. Find the work done.",
      hint: "Multiply 80 by 0.5.",
      formula: "W = Fs",
      steps: [
        "Write W = Fs.",
        "Substitute W = 80 × 0.5.",
        "Calculate W = 40 J."
      ],
      ans: "40 J",
      final_check: "80 × 0.5 = 40.",
      common_mistakes: ["Treating 0.5 m as 5 m.", "Writing the answer in watts."],
      explanation: "Work is measured in joules."
    },
    {
      q: "A force of 25 N does 100 J of work while moving an object in the force's direction. Find the distance moved.",
      hint: "Distance = work ÷ force.",
      formula: "s = W/F",
      steps: [
        "Start with W = Fs.",
        "Rearrange to s = W/F.",
        "Substitute s = 100/25 = 4 m."
      ],
      ans: "4 m",
      final_check: "25 × 4 = 100 J.",
      common_mistakes: ["Multiplying work by force.", "Giving distance in joules."],
      explanation: "Rearranging W = Fs gives the displacement for a constant force along the displacement."
    },
    {
      q: "A person holds a bag stationary for 20 seconds. What is the mechanical work done by the person's supporting force on the bag?",
      hint: "Check whether the bag has any displacement.",
      steps: [
        "The supporting force acts upward.",
        "The bag remains stationary, so its displacement is zero.",
        "Work done on the bag by that force is zero."
      ],
      ans: "0 J",
      final_check: "W = Fs, and s = 0.",
      common_mistakes: ["Calculating force × time.", "Assuming effort alone means mechanical work is done on the bag."],
      explanation: "No displacement means zero mechanical work by the supporting force on the bag."
    },
    {
      q: "A 15 N force moves an object 2 m in the same direction as the force. Calculate the work done.",
      hint: "Use W = Fs.",
      formula: "W = Fs",
      steps: [
        "Write W = Fs.",
        "Substitute W = 15 × 2.",
        "Calculate W = 30 J."
      ],
      ans: "30 J",
      final_check: "The force and displacement are in the same direction.",
      common_mistakes: ["Using the wrong unit for work.", "Adding force and distance instead of multiplying."],
      explanation: "Work done is the product of force and displacement along the force's direction."
    }
  ]
);

add(
  "work_energy_power",
  "work_energy_power",
  "Gravitational Potential Energy",
  `
  <h2>Gravitational Potential Energy</h2>
  <p>Gravitational potential energy is energy associated with an object's position in a gravitational field. Near Earth's surface, the change in gravitational potential energy can be calculated using mass, gravitational field strength and vertical height change.</p>

  <h3>Formula</h3>
  <p>\\(\\Delta E_p = mg\\Delta h\\)</p>
  <ul>
    <li>m = mass in kilograms (kg)</li>
    <li>g = gravitational field strength in N/kg</li>
    <li>Δh = vertical height change in metres (m)</li>
    <li>ΔEp = change in gravitational potential energy in joules (J)</li>
  </ul>

  <h3>Worked example 1</h3>
  <p>A 2 kg object is lifted vertically by 3 m. Take g = 10 N/kg.</p>
  <ol>
    <li>Write ΔEp = mgΔh.</li>
    <li>Substitute ΔEp = 2 × 10 × 3.</li>
    <li>Change in potential energy = <strong>60 J</strong>.</li>
  </ol>

  <h3>Worked example 2</h3>
  <p>A 5 kg object is raised by 2 m where g = 9.8 N/kg.</p>
  <p>ΔEp = 5 × 9.8 × 2 = <strong>98 J</strong>.</p>

  <h3>Worked example 3: Find height change</h3>
  <p>A 4 kg object gains 80 J of gravitational potential energy. If g = 10 N/kg, Δh = 80 ÷ (4 × 10) = <strong>2 m</strong>.</p>

  <h3>Common mistake</h3>
  <p>Use vertical height change, not the distance travelled along a sloping path. The formula gives the change in gravitational potential energy near Earth's surface.</p>
  `,
  [
    {
      q: "A 3 kg object is lifted 4 m vertically. Take g = 10 N/kg. Calculate its gain in gravitational potential energy.",
      hint: "Use ΔEp = mgΔh.",
      formula: "ΔEp = mgΔh",
      steps: [
        "Write ΔEp = mgΔh.",
        "Substitute ΔEp = 3 × 10 × 4.",
        "Calculate ΔEp = 120 J."
      ],
      ans: "120 J",
      final_check: "3 × 10 × 4 = 120.",
      common_mistakes: ["Using horizontal distance instead of vertical height change.", "Giving energy in newtons."],
      explanation: "Lifting the object increases its gravitational potential energy."
    },
    {
      q: "A 6 kg object gains 300 J of gravitational potential energy. Take g = 10 N/kg. How far vertically is it lifted?",
      hint: "Rearrange ΔEp = mgΔh.",
      formula: "Δh = ΔEp/(mg)",
      steps: [
        "Write Δh = ΔEp/(mg).",
        "Substitute Δh = 300/(6 × 10).",
        "Calculate Δh = 5 m."
      ],
      ans: "5 m",
      final_check: "6 × 10 × 5 = 300 J.",
      common_mistakes: ["Multiplying energy by mass.", "Giving the height in joules."],
      explanation: "Height change equals energy change divided by mass times gravitational field strength."
    },
    {
      q: "Calculate the gain in gravitational potential energy of a 2.5 kg object lifted 2 m where g = 10 N/kg.",
      hint: "Multiply mass, gravitational field strength and vertical height change.",
      formula: "ΔEp = mgΔh",
      steps: [
        "Write ΔEp = mgΔh.",
        "Substitute ΔEp = 2.5 × 10 × 2.",
        "Calculate ΔEp = 50 J."
      ],
      ans: "50 J",
      final_check: "2.5 × 10 × 2 = 50.",
      common_mistakes: ["Using 2.5 g instead of 2.5 kg.", "Confusing potential energy with power."],
      explanation: "The object's potential energy increases by 50 J."
    },
    {
      q: "An object of mass 4 kg is raised by 3 m. Take g = 9.8 N/kg. Calculate the increase in gravitational potential energy.",
      hint: "Use ΔEp = mgΔh with g = 9.8 N/kg.",
      formula: "ΔEp = mgΔh",
      steps: [
        "Write ΔEp = mgΔh.",
        "Substitute ΔEp = 4 × 9.8 × 3.",
        "Calculate ΔEp = 117.6 J."
      ],
      ans: "117.6 J",
      final_check: "4 × 9.8 × 3 = 117.6.",
      common_mistakes: ["Automatically using g = 10 when the question specifies 9.8.", "Using mass in grams."],
      explanation: "Use the gravitational field strength supplied in the question."
    },
    {
      q: "Which measurement is required in ΔEp = mgΔh: the total distance along the path or the vertical height change?",
      hint: "Gravitational potential energy depends on how much higher or lower the object ends up.",
      steps: [
        "Identify the energy change being calculated.",
        "Gravitational potential energy depends on vertical position.",
        "Use the vertical height change."
      ],
      ans: "The vertical height change",
      final_check: "A longer sloping path does not necessarily mean a greater height change.",
      common_mistakes: ["Using the full path length.", "Using horizontal displacement."],
      explanation: "Near Earth's surface, gravitational potential energy change depends on vertical height change."
    }
  ]
);

add(
  "physics",
  "work_energy_power",
  "Kinetic Energy",
  `<h2>Kinetic Energy</h2>
  <p>Kinetic energy is the energy an object possesses because it is moving.</p>
  <p><strong>Formula:</strong> KE = 1/2 × m × v²</p>
  <ul>
    <li>KE = kinetic energy in joules (J)</li>
    <li>m = mass in kilograms (kg)</li>
    <li>v = speed in metres per second (m/s)</li>
  </ul>
  <h3>Worked example</h3>
  <p>A 4 kg object moves at 3 m/s. Calculate its kinetic energy.</p>
  <ol>
    <li>Write the formula: KE = 1/2 × m × v².</li>
    <li>Substitute: KE = 1/2 × 4 × 3².</li>
    <li>Square the speed: 3² = 9.</li>
    <li>Calculate: KE = 2 × 9 = 18 J.</li>
  </ol>
  <p><strong>Answer: 18 J.</strong></p>
  <h3>Important relationship</h3>
  <p>At constant mass, doubling speed makes kinetic energy four times greater because speed is squared. Doubling mass at constant speed doubles kinetic energy.</p>`,
  [
    {
      q: "Calculate the kinetic energy of a 2 kg object moving at 4 m/s.",
      hint: "Use KE = 1/2 × m × v².",
      formula: "KE = 1/2 × m × v²",
      steps: ["Write KE = 1/2 × m × v².", "Substitute m = 2 and v = 4.", "KE = 1/2 × 2 × 4² = 16 J."],
      ans: "16 J",
      final_check: "The speed is squared before multiplying by half the mass.",
      common_mistakes: ["Using 4 instead of 4².", "Leaving the answer without a unit."],
      explanation: "KE = 1/2 × 2 × 16 = 16 J."
    },
    {
      q: "A 5 kg object moves at 2 m/s. Find its kinetic energy.",
      hint: "Square 2, then multiply by half of 5.",
      formula: "KE = 1/2 × m × v²",
      steps: ["KE = 1/2 × 5 × 2².", "2² = 4.", "KE = 2.5 × 4 = 10 J."],
      ans: "10 J",
      final_check: "The result is measured in joules.",
      common_mistakes: ["Multiplying by speed without squaring it."],
      explanation: "KE = 1/2 × 5 × 4 = 10 J."
    },
    {
      q: "A 3 kg object has a speed of 6 m/s. Calculate its kinetic energy.",
      hint: "Calculate 6² first.",
      formula: "KE = 1/2 × m × v²",
      steps: ["KE = 1/2 × 3 × 6².", "6² = 36.", "KE = 1.5 × 36 = 54 J."],
      ans: "54 J",
      final_check: "Check that the speed was squared.",
      common_mistakes: ["Writing 1/2 × 3 × 6 = 9 J."],
      explanation: "The squared speed is 36, giving KE = 54 J."
    },
    {
      q: "An object of mass 4 kg moves at 5 m/s. What is its kinetic energy?",
      hint: "Half the mass is 2 kg; multiply this by 5².",
      formula: "KE = 1/2 × m × v²",
      steps: ["KE = 1/2 × 4 × 5².", "5² = 25.", "KE = 2 × 25 = 50 J."],
      ans: "50 J",
      final_check: "The answer should be in joules.",
      common_mistakes: ["Calculating 5² as 10."],
      explanation: "KE = 2 × 25 = 50 J."
    },
    {
      q: "A moving object's speed doubles while its mass remains constant. By what factor does its kinetic energy change?",
      hint: "Compare v² with (2v)².",
      formula: "KE is proportional to v²",
      steps: ["Original dependence is v².", "New dependence is (2v)² = 4v².", "The kinetic energy becomes four times the original."],
      ans: "4 times",
      final_check: "Doubling speed does not merely double kinetic energy.",
      common_mistakes: ["Answering 2 times because the speed doubled."],
      explanation: "Kinetic energy depends on the square of speed."
    }
  ]
);

add(
  "physics",
  "work_energy_power",
  "Conservation of Energy",
  `<h2>Conservation of Energy</h2>
  <p>The principle of conservation of energy states that energy cannot be created or destroyed. It can only be transferred or transformed from one form to another.</p>
  <h3>Example: a falling object</h3>
  <ol>
    <li>At a height, the object has gravitational potential energy.</li>
    <li>As it falls, gravitational potential energy decreases.</li>
    <li>Its kinetic energy increases as its speed increases.</li>
    <li>Ignoring air resistance, the decrease in potential energy equals the increase in kinetic energy.</li>
  </ol>
  <h3>Energy in real systems</h3>
  <p>When friction or air resistance acts, some mechanical energy is transferred to the surroundings, often as thermal energy and sound. The total energy is still conserved.</p>
  <p><strong>Key idea:</strong> Energy is transferred or transformed, not destroyed.</p>`,
  [
    {
      q: "State the principle of conservation of energy.",
      hint: "Think about whether energy can be created or destroyed.",
      steps: ["Identify what happens to total energy.", "Distinguish transformation from destruction."],
      ans: "Energy cannot be created or destroyed; it can only be transferred or transformed.",
      final_check: "The principle applies to all energy transformations.",
      common_mistakes: ["Saying energy disappears when it is no longer useful."],
      explanation: "Energy may change form or move to the surroundings, but it is conserved."
    },
    {
      q: "Describe the main energy transformation when an object falls freely, ignoring air resistance.",
      hint: "Compare energy at the top and during the fall.",
      steps: ["At the top, gravitational potential energy is present.", "As the object falls, potential energy decreases.", "Kinetic energy increases."],
      ans: "Gravitational potential energy is converted into kinetic energy.",
      final_check: "The object's speed increases as it falls.",
      common_mistakes: ["Claiming that potential energy is destroyed."],
      explanation: "The energy changes form as the object loses height."
    },
    {
      q: "A moving object slows down because of friction. Where does some of its kinetic energy go?",
      hint: "Consider the surfaces in contact.",
      steps: ["Friction opposes motion.", "Mechanical energy is transferred to the objects and surroundings.", "The energy commonly increases thermal energy and may produce sound."],
      ans: "It is transferred mainly into thermal energy and sometimes sound.",
      final_check: "The energy has not been destroyed.",
      common_mistakes: ["Saying friction destroys energy."],
      explanation: "Friction transfers mechanical energy into other forms."
    },
    {
      q: "In an ideal falling-object system with no air resistance, what happens to the total of gravitational potential energy and kinetic energy?",
      hint: "Add the two forms of mechanical energy.",
      steps: ["Potential energy decreases.", "Kinetic energy increases by the same amount.", "Their sum remains constant."],
      ans: "The total mechanical energy remains constant.",
      final_check: "This assumes no energy is transferred to the surroundings.",
      common_mistakes: ["Claiming both forms must remain individually constant."],
      explanation: "Energy changes form, while the total mechanical energy stays constant under the stated conditions."
    },
    {
      q: "A machine receives 100 J of energy and transfers 30 J to its surroundings as heat. How much useful energy remains in the output?",
      hint: "Subtract the energy transferred away from the useful output.",
      steps: ["Input energy = 100 J.", "Energy transferred to surroundings = 30 J.", "Useful output = 100 − 30 = 70 J."],
      ans: "70 J",
      final_check: "The total energy is still accounted for: 70 J useful and 30 J transferred away.",
      common_mistakes: ["Saying the missing 30 J has been destroyed."],
      explanation: "The energy balance is 100 J = 70 J + 30 J."
    }
  ]
);

add(
  "physics",
  "work_energy_power",
  "Power",
  `<h2>Power</h2>
  <p>Power is the rate at which work is done or energy is transferred.</p>
  <p><strong>Formula:</strong> P = W/t, where W is work done in joules and t is time in seconds.</p>
  <p>Power can also be calculated using P = E/t when E is the energy transferred.</p>
  <p><strong>Unit:</strong> watt (W). One watt equals one joule per second.</p>
  <h3>Worked example</h3>
  <p>A motor does 600 J of work in 20 s.</p>
  <ol>
    <li>Write P = W/t.</li>
    <li>Substitute: P = 600/20.</li>
    <li>Calculate: P = 30 W.</li>
  </ol>
  <p><strong>Answer: 30 W.</strong></p>
  <p>Doing the same amount of work in less time requires greater power.</p>`,
  [
    {
      q: "A machine does 200 J of work in 10 s. Calculate its power.",
      hint: "Divide work done by time.",
      formula: "P = W/t",
      steps: ["P = 200/10.", "P = 20 W."],
      ans: "20 W",
      final_check: "Power is measured in watts.",
      common_mistakes: ["Multiplying work by time."],
      explanation: "P = 200 J ÷ 10 s = 20 W."
    },
    {
      q: "A motor transfers 900 J of energy in 30 s. Find its power.",
      hint: "Use energy transferred divided by time.",
      formula: "P = E/t",
      steps: ["P = 900/30.", "P = 30 W."],
      ans: "30 W",
      final_check: "One watt is one joule per second.",
      common_mistakes: ["Using minutes when the time is already in seconds."],
      explanation: "P = 900 J ÷ 30 s = 30 W."
    },
    {
      q: "A device has a power output of 50 W for 4 s. How much energy does it transfer?",
      hint: "Rearrange P = E/t to make E the subject.",
      formula: "E = P × t",
      steps: ["E = P × t.", "E = 50 × 4.", "E = 200 J."],
      ans: "200 J",
      final_check: "Multiply power by time to obtain energy.",
      common_mistakes: ["Dividing power by time."],
      explanation: "E = 50 J/s × 4 s = 200 J."
    },
    {
      q: "Two students each do 600 J of work. One takes 10 s and the other takes 20 s. Find each student's power.",
      hint: "Calculate 600 divided by each student's time.",
      formula: "P = W/t",
      steps: ["First student: 600/10 = 60 W.", "Second student: 600/20 = 30 W."],
      ans: "60 W and 30 W, respectively",
      final_check: "The student who takes less time has greater power.",
      common_mistakes: ["Assuming equal work means equal power regardless of time."],
      explanation: "Power depends on both the work done and the time taken."
    },
    {
      q: "A pump transfers 2,400 J in 2 minutes. Calculate its average power in watts.",
      hint: "Convert 2 minutes into seconds first.",
      formula: "P = E/t",
      steps: ["Convert time: 2 × 60 = 120 s.", "P = 2400/120.", "P = 20 W."],
      ans: "20 W",
      final_check: "Use seconds when calculating power in watts from joules.",
      common_mistakes: ["Dividing by 2 instead of 120."],
      explanation: "P = 2400 J ÷ 120 s = 20 W."
    }
  ]
);

add(
  "physics",
  "work_energy_power",
  "Efficiency",
  `<h2>Efficiency</h2>
  <p>Efficiency measures the fraction of the input energy or power that becomes useful output.</p>
  <p><strong>Efficiency (%) = (useful output energy ÷ total input energy) × 100%</strong></p>
  <p>The same relationship applies to useful output power divided by input power.</p>
  <h3>Worked example</h3>
  <p>A device receives 500 J and provides 350 J of useful energy.</p>
  <ol>
    <li>Efficiency = (useful output ÷ input) × 100%.</li>
    <li>Efficiency = (350 ÷ 500) × 100%.</li>
    <li>Efficiency = 70%.</li>
  </ol>
  <p><strong>Answer: 70%.</strong></p>
  <p>For an ordinary energy-converting device, efficiency cannot exceed 100%. Some input energy is often transferred to the surroundings in less useful forms.</p>`,
  [
    {
      q: "A device receives 400 J and produces 300 J of useful energy. Calculate its efficiency.",
      hint: "Divide useful output by total input, then multiply by 100%.",
      formula: "Efficiency = (useful output/input) × 100%",
      steps: ["Efficiency = (300/400) × 100%.", "Efficiency = 0.75 × 100%.", "Efficiency = 75%."],
      ans: "75%",
      final_check: "Useful output is the numerator.",
      common_mistakes: ["Dividing input by useful output."],
      explanation: "300 J out of 400 J is 75%."
    },
    {
      q: "A machine receives 800 J and transfers 600 J usefully. Find the efficiency.",
      hint: "Calculate 600 ÷ 800 × 100%.",
      formula: "Efficiency = (useful output/input) × 100%",
      steps: ["Efficiency = (600/800) × 100%.", "Efficiency = 75%."],
      ans: "75%",
      final_check: "Efficiency is expressed as a percentage.",
      common_mistakes: ["Writing 0.75% instead of 75%."],
      explanation: "The decimal ratio 0.75 corresponds to 75%."
    },
    {
      q: "A motor receives 1,000 W of input power and gives 700 W of useful output power. Calculate its efficiency.",
      hint: "Use output power divided by input power.",
      formula: "Efficiency = (useful output power/input power) × 100%",
      steps: ["Efficiency = (700/1000) × 100%.", "Efficiency = 70%."],
      ans: "70%",
      final_check: "Both quantities are powers, so their ratio is dimensionless.",
      common_mistakes: ["Subtracting the powers and calling the difference the efficiency."],
      explanation: "The useful output is 70% of the input power."
    },
    {
      q: "A device is 80% efficient and receives 250 J of energy. Calculate its useful output energy.",
      hint: "Convert 80% to 0.80 and multiply by the input.",
      formula: "Useful output = efficiency × input",
      steps: ["Convert 80% to 0.80.", "Useful output = 0.80 × 250.", "Useful output = 200 J."],
      ans: "200 J",
      final_check: "The useful output cannot exceed the input.",
      common_mistakes: ["Multiplying by 80 instead of 0.80."],
      explanation: "80% of 250 J is 200 J."
    },
    {
      q: "A machine receives 500 J but gives 350 J of useful output. How much energy is transferred in other forms?",
      hint: "Subtract useful output energy from input energy.",
      formula: "Other energy transfers = input − useful output",
      steps: ["Other transfers = 500 − 350.", "Other transfers = 150 J."],
      ans: "150 J",
      final_check: "This energy may become heat, sound, or other non-useful output.",
      common_mistakes: ["Claiming the energy has been destroyed."],
      explanation: "The input energy is accounted for as 350 J useful output and 150 J transferred in other forms."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Simple Machines",
  `<h2>Simple Machines</h2>
  <p>A simple machine makes a task easier by changing the size or direction of a force, or the distance over which the force acts.</p>
  <p>Common simple machines include levers, pulleys, inclined planes, and wheel-and-axle systems.</p>
  <h3>Examples</h3>
  <ul>
    <li><strong>Lever:</strong> a crowbar can help lift a heavy load.</li>
    <li><strong>Pulley:</strong> a fixed pulley can change the direction in which a person pulls.</li>
    <li><strong>Inclined plane:</strong> a ramp allows a load to be raised using a smaller force over a longer distance.</li>
    <li><strong>Wheel and axle:</strong> a handle attached to an axle can help turn a mechanism.</li>
  </ul>
  <h3>Work and machines</h3>
  <p>A machine does not create energy. In an ideal machine, input work equals output work. In a real machine, the input work is greater than the useful output because of friction and other energy transfers.</p>`,
  [
    {
      q: "What is the main purpose of a simple machine?",
      hint: "Consider how a machine changes the force or its direction.",
      steps: ["Identify the task a machine helps perform.", "Consider force magnitude, direction, and distance."],
      ans: "To make work easier by changing the size or direction of a force, or the distance over which it acts.",
      final_check: "A machine does not create energy.",
      common_mistakes: ["Saying a machine creates energy or always reduces total work."],
      explanation: "Simple machines alter how force is applied to perform a task."
    },
    {
      q: "Which simple machine is commonly used as a ramp to move a load to a higher level?",
      hint: "It is a flat surface set at an angle.",
      steps: ["Identify the surface that slopes upward.", "Match it to the simple machine."],
      ans: "Inclined plane",
      final_check: "The ramp increases the distance over which the load is raised.",
      common_mistakes: ["Calling every ramp a lever."],
      explanation: "An inclined plane can reduce the force needed by increasing the distance over which it acts."
    },
    {
      q: "A fixed pulley is used to lift a bucket. What is one important advantage of the pulley?",
      hint: "Think about the direction of the effort.",
      steps: ["The load moves upward.", "The person can pull downward.", "The pulley changes the direction of the applied force."],
      ans: "It changes the direction of the applied force.",
      final_check: "An ideal fixed pulley does not multiply the force.",
      common_mistakes: ["Claiming that every pulley reduces the effort force."],
      explanation: "A single fixed pulley mainly changes the direction of the force."
    },
    {
      q: "In an ideal machine, the input work is 120 J. What is the output work?",
      hint: "There are no energy losses in an ideal machine.",
      formula: "Input work = output work",
      steps: ["Ideal machines have 100% efficiency.", "Output work equals input work.", "Output work = 120 J."],
      ans: "120 J",
      final_check: "This equality assumes an ideal machine.",
      common_mistakes: ["Subtracting an assumed friction loss in an ideal machine."],
      explanation: "Without losses, the work supplied equals the work delivered."
    },
    {
      q: "Why is the input work usually greater than the useful output work in a real machine?",
      hint: "Consider friction between moving surfaces.",
      steps: ["Friction acts during motion.", "Some energy is transferred to the surroundings.", "Less input energy remains as useful output work."],
      ans: "Because friction and other losses transfer some energy into less useful forms.",
      final_check: "Total energy is still conserved.",
      common_mistakes: ["Saying energy is destroyed by the machine."],
      explanation: "A real machine cannot convert all input energy into useful output work."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Mechanical Advantage",
  `<h2>Mechanical Advantage</h2>
  <p>Mechanical advantage (MA) compares the load force a machine moves with the effort force applied to it.</p>
  <p><strong>MA = Load ÷ Effort</strong></p>
  <p>Load and effort must be measured in the same units, usually newtons (N). Mechanical advantage has no unit because it is a ratio.</p>
  <h3>Worked example</h3>
  <p>A lever lifts a load of 600 N using an effort of 150 N.</p>
  <ol>
    <li>MA = Load ÷ Effort.</li>
    <li>MA = 600 ÷ 150.</li>
    <li>MA = 4.</li>
  </ol>
  <p><strong>Answer: MA = 4.</strong> The load force is four times the effort force.</p>
  <p>Mechanical advantage does not tell us by itself whether a machine is efficient.</p>`,
  [
    {
      q: "A machine lifts a load of 400 N with an effort of 100 N. Find its mechanical advantage.",
      hint: "Divide the load by the effort.",
      formula: "MA = Load/Effort",
      steps: ["MA = 400/100.", "MA = 4."],
      ans: "4",
      final_check: "Mechanical advantage has no unit.",
      common_mistakes: ["Dividing effort by load."],
      explanation: "400 N divided by 100 N gives a mechanical advantage of 4."
    },
    {
      q: "A lever lifts 900 N using an effort of 300 N. Calculate its mechanical advantage.",
      hint: "Use MA = load ÷ effort.",
      formula: "MA = Load/Effort",
      steps: ["MA = 900/300.", "MA = 3."],
      ans: "3",
      final_check: "Both forces must be in the same unit.",
      common_mistakes: ["Giving the answer as 3 N."],
      explanation: "The force units cancel, so MA = 3 without a unit."
    },
    {
      q: "A machine has a mechanical advantage of 5 and an effort of 40 N. Find the load.",
      hint: "Rearrange MA = load ÷ effort.",
      formula: "Load = MA × Effort",
      steps: ["Load = 5 × 40 N.", "Load = 200 N."],
      ans: "200 N",
      final_check: "Multiply effort by mechanical advantage.",
      common_mistakes: ["Dividing effort by mechanical advantage."],
      explanation: "A mechanical advantage of 5 means the load is five times the effort."
    },
    {
      q: "A machine lifts a load of 720 N and has a mechanical advantage of 6. Calculate the effort.",
      hint: "Rearrange the formula to make effort the subject.",
      formula: "Effort = Load/MA",
      steps: ["Effort = 720/6.", "Effort = 120 N."],
      ans: "120 N",
      final_check: "The effort is smaller than the load in this example.",
      common_mistakes: ["Multiplying 720 by 6."],
      explanation: "Effort = load divided by mechanical advantage."
    },
    {
      q: "A machine uses an effort of 80 N to move a load of 80 N. Find its mechanical advantage.",
      hint: "Divide 80 by 80.",
      formula: "MA = Load/Effort",
      steps: ["MA = 80/80.", "MA = 1."],
      ans: "1",
      final_check: "Equal load and effort give a mechanical advantage of one.",
      common_mistakes: ["Answering zero because the forces are equal."],
      explanation: "MA = 1 means the load force equals the effort force."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Velocity Ratio",
  `<h2>Velocity Ratio</h2>
  <p>Velocity ratio (VR) compares the distance moved by the effort with the distance moved by the load during the same operation.</p>
  <p><strong>VR = Distance moved by effort ÷ Distance moved by load</strong></p>
  <p>Use distances measured in the same units. Velocity ratio has no unit.</p>
  <h3>Worked example</h3>
  <p>The effort moves 2 m while the load rises 0.5 m.</p>
  <ol>
    <li>VR = distance moved by effort ÷ distance moved by load.</li>
    <li>VR = 2 ÷ 0.5.</li>
    <li>VR = 4.</li>
  </ol>
  <p><strong>Answer: VR = 4.</strong></p>
  <p>A high velocity ratio means the effort moves a greater distance than the load.</p>`,
  [
    {
      q: "The effort moves 3 m while the load moves 1 m. Find the velocity ratio.",
      hint: "Divide the effort distance by the load distance.",
      formula: "VR = effort distance/load distance",
      steps: ["VR = 3/1.", "VR = 3."],
      ans: "3",
      final_check: "The effort distance goes in the numerator.",
      common_mistakes: ["Reversing the distances."],
      explanation: "The effort moves three times as far as the load."
    },
    {
      q: "In a machine, the effort moves 4 m and the load moves 0.8 m. Calculate VR.",
      hint: "Calculate 4 ÷ 0.8.",
      formula: "VR = effort distance/load distance",
      steps: ["VR = 4/0.8.", "VR = 5."],
      ans: "5",
      final_check: "The ratio has no unit.",
      common_mistakes: ["Treating 0.8 as 8."],
      explanation: "4 divided by 0.8 equals 5."
    },
    {
      q: "A machine has a velocity ratio of 6. The load moves 0.5 m. How far does the effort move?",
      hint: "Effort distance = VR × load distance.",
      formula: "Effort distance = VR × load distance",
      steps: ["Effort distance = 6 × 0.5 m.", "Effort distance = 3 m."],
      ans: "3 m",
      final_check: "The effort moves farther than the load for this ratio.",
      common_mistakes: ["Dividing the load distance by VR."],
      explanation: "6 × 0.5 m = 3 m."
    },
    {
      q: "The effort moves 2.4 m and the load moves 0.6 m. Find the velocity ratio.",
      hint: "Divide 2.4 by 0.6.",
      formula: "VR = effort distance/load distance",
      steps: ["VR = 2.4/0.6.", "VR = 4."],
      ans: "4",
      final_check: "The units of distance cancel.",
      common_mistakes: ["Adding the two distances."],
      explanation: "The effort moves four times as far as the load."
    },
    {
      q: "A machine has VR = 8. If the effort moves 4 m, how far does the load move?",
      hint: "Load distance = effort distance ÷ VR.",
      formula: "Load distance = effort distance/VR",
      steps: ["Load distance = 4/8.", "Load distance = 0.5 m."],
      ans: "0.5 m",
      final_check: "A velocity ratio of 8 means the effort distance is eight times the load distance.",
      common_mistakes: ["Multiplying 4 m by 8."],
      explanation: "4 m divided by 8 gives a load distance of 0.5 m."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Mechanical Advantage and Velocity Ratio",
  `<h2>Mechanical Advantage and Velocity Ratio</h2>
  <p>Mechanical advantage compares forces; velocity ratio compares distances moved.</p>
  <ul>
    <li><strong>MA = Load ÷ Effort</strong></li>
    <li><strong>VR = Distance moved by effort ÷ Distance moved by load</strong></li>
  </ul>
  <p>For an ideal machine, MA = VR because input work equals output work.</p>
  <p>For an ordinary real machine, friction and other losses mean that MA is generally less than VR.</p>
  <h3>Worked example</h3>
  <p>A machine has MA = 3 and VR = 5.</p>
  <ol>
    <li>Compare MA with VR.</li>
    <li>MA is smaller than VR.</li>
    <li>This is consistent with a real machine that has energy losses.</li>
  </ol>
  <p>Do not confuse the two ratios: MA uses forces; VR uses distances.</p>`,
  [
    {
      q: "Which quantity compares load force with effort force?",
      hint: "One ratio uses forces, not distances.",
      steps: ["Identify the ratio defined as load divided by effort."],
      ans: "Mechanical advantage",
      final_check: "MA = load ÷ effort.",
      common_mistakes: ["Calling this velocity ratio."],
      explanation: "Mechanical advantage compares the forces."
    },
    {
      q: "Which quantity compares the distance moved by effort with the distance moved by load?",
      hint: "This ratio is based on movement distances.",
      steps: ["Identify the ratio defined using two distances."],
      ans: "Velocity ratio",
      final_check: "VR = effort distance ÷ load distance.",
      common_mistakes: ["Using the load and effort forces."],
      explanation: "Velocity ratio compares distances moved."
    },
    {
      q: "An ideal machine has VR = 4. What is its mechanical advantage?",
      hint: "In an ideal machine, the two ratios are equal.",
      formula: "MA = VR for an ideal machine",
      steps: ["VR = 4.", "For an ideal machine, MA = VR.", "MA = 4."],
      ans: "4",
      final_check: "This answer assumes an ideal machine.",
      common_mistakes: ["Assuming this equality applies exactly to every real machine."],
      explanation: "Ideal machines have no energy losses, so MA equals VR."
    },
    {
      q: "A real machine has MA = 2 and VR = 4. Which ratio is greater?",
      hint: "Compare the numerical values 2 and 4.",
      steps: ["MA = 2.", "VR = 4.", "VR is greater than MA."],
      ans: "Velocity ratio",
      final_check: "MA is usually lower than VR in a real machine because of losses.",
      common_mistakes: ["Assuming mechanical advantage must always be greater."],
      explanation: "The two ratios describe different things, and real-machine losses typically make MA smaller than VR."
    },
    {
      q: "A machine has a load of 300 N, an effort of 100 N, an effort distance of 2 m and a load distance of 0.5 m. Calculate MA and VR.",
      hint: "Calculate each ratio separately using its own formula.",
      formula: "MA = Load/Effort; VR = effort distance/load distance",
      steps: ["MA = 300/100 = 3.", "VR = 2/0.5 = 4."],
      ans: "MA = 3; VR = 4",
      final_check: "The machine's VR exceeds its MA, consistent with a real machine with losses.",
      common_mistakes: ["Mixing force values with distance values."],
      explanation: "MA uses forces, while VR uses distances."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Efficiency of Machines",
  `<h2>Efficiency of Machines</h2>
  <p>Machine efficiency is the percentage of input work converted into useful output work.</p>
  <p><strong>Efficiency (%) = (MA ÷ VR) × 100%</strong></p>
  <p>This formula is equivalent to useful output work divided by input work, multiplied by 100%, when the relevant forces and distances are used consistently.</p>
  <h3>Worked example</h3>
  <p>A machine has MA = 3 and VR = 4.</p>
  <ol>
    <li>Efficiency = (MA ÷ VR) × 100%.</li>
    <li>Efficiency = (3 ÷ 4) × 100%.</li>
    <li>Efficiency = 75%.</li>
  </ol>
  <p><strong>Answer: 75%.</strong></p>
  <p>For an ordinary machine, efficiency is below 100% because some input energy is transferred to the surroundings rather than becoming useful output.</p>`,
  [
    {
      q: "A machine has MA = 2 and VR = 4. Calculate its efficiency.",
      hint: "Divide MA by VR and multiply by 100%.",
      formula: "Efficiency = (MA/VR) × 100%",
      steps: ["Efficiency = (2/4) × 100%.", "Efficiency = 50%."],
      ans: "50%",
      final_check: "MA goes in the numerator.",
      common_mistakes: ["Calculating VR ÷ MA."],
      explanation: "2 divided by 4 is 0.5, equivalent to 50%."
    },
    {
      q: "A machine has MA = 4 and VR = 5. Find its efficiency.",
      hint: "Calculate 4 ÷ 5 × 100%.",
      formula: "Efficiency = (MA/VR) × 100%",
      steps: ["Efficiency = (4/5) × 100%.", "Efficiency = 80%."],
      ans: "80%",
      final_check: "A percentage should be between 0% and 100% for an ordinary machine.",
      common_mistakes: ["Writing 0.8% instead of 80%."],
      explanation: "The ratio 0.8 is equal to 80%."
    },
    {
      q: "A machine has MA = 3 and an efficiency of 60%. Calculate its velocity ratio.",
      hint: "Rearrange efficiency = MA/VR × 100%.",
      formula: "VR = MA × 100/efficiency (%)",
      steps: ["60 = (3/VR) × 100.", "VR = 3 × 100/60.", "VR = 5."],
      ans: "5",
      final_check: "The velocity ratio is dimensionless.",
      common_mistakes: ["Multiplying 3 by 0.60 without rearranging correctly."],
      explanation: "VR = 300/60 = 5."
    },
    {
      q: "A machine has VR = 8 and efficiency = 75%. Calculate its mechanical advantage.",
      hint: "Rearrange efficiency = MA/VR × 100%.",
      formula: "MA = (efficiency (%) × VR)/100",
      steps: ["MA = (75 × 8)/100.", "MA = 600/100.", "MA = 6."],
      ans: "6",
      final_check: "For this real machine, MA is less than VR.",
      common_mistakes: ["Using efficiency as 75 rather than 0.75 without accounting for the percentage formula."],
      explanation: "MA = 0.75 × 8 = 6."
    },
    {
      q: "Why is a real machine usually less than 100% efficient?",
      hint: "Think about friction and energy transferred to the surroundings.",
      steps: ["A machine receives input energy.", "Friction and other effects transfer some energy into less useful forms.", "Useful output is therefore less than input."],
      ans: "Some input energy is transferred into less useful forms, such as heat and sound.",
      final_check: "The total energy is conserved even when efficiency is below 100%.",
      common_mistakes: ["Saying that the energy is destroyed."],
      explanation: "Efficiency measures useful output, not the total amount of energy accounted for."
    }
  ]
);

add(
  "physics",
  "simple_machines",
  "Work Input and Work Output",
  `<h2>Work Input and Work Output</h2>
  <p>Work input is the work done by the effort on a machine. Work output is the useful work done by the machine on the load.</p>
  <p>When force acts in the same direction as movement:</p>
  <ul>
    <li><strong>Work input = effort × distance moved by effort</strong></li>
    <li><strong>Work output = load × distance moved by load</strong></li>
  </ul>
  <p>Use force in newtons (N) and distance in metres (m). Work is measured in joules (J).</p>
  <h3>Worked example</h3>
  <p>An effort of 50 N moves 3 m while lifting a load of 200 N through 0.5 m.</p>
  <ol>
    <li>Input work = 50 × 3 = 150 J.</li>
    <li>Output work = 200 × 0.5 = 100 J.</li>
    <li>The difference is 50 J, transferred into other forms.</li>
  </ol>
  <p><strong>Answer:</strong> input work = 150 J; useful output work = 100 J.</p>
  <p>In an ideal machine, input work equals output work. In a real machine, input work is usually greater than useful output work.</p>`,
  [
    {
      q: "An effort of 40 N moves 5 m. Calculate the work input.",
      hint: "Multiply effort by the distance it moves.",
      formula: "Work input = effort × effort distance",
      steps: ["Work input = 40 × 5.", "Work input = 200 J."],
      ans: "200 J",
      final_check: "Use newtons multiplied by metres.",
      common_mistakes: ["Dividing force by distance."],
      explanation: "40 N × 5 m = 200 J."
    },
    {
      q: "A load of 300 N rises through 0.4 m. Calculate the useful work output.",
      hint: "Multiply the load force by the distance the load moves.",
      formula: "Work output = load × load distance",
      steps: ["Work output = 300 × 0.4.", "Work output = 120 J."],
      ans: "120 J",
      final_check: "The load distance must be expressed in metres.",
      common_mistakes: ["Using the distance moved by the effort."],
      explanation: "300 N × 0.4 m = 120 J."
    },
    {
      q: "A machine receives 500 J of work input and delivers 350 J of useful output work. How much work is not delivered as useful output?",
      hint: "Subtract useful output from input.",
      formula: "Difference = input work − useful output work",
      steps: ["Difference = 500 − 350.", "Difference = 150 J."],
      ans: "150 J",
      final_check: "This energy is transferred into other forms rather than destroyed.",
      common_mistakes: ["Subtracting input from output."],
      explanation: "500 J − 350 J = 150 J."
    },
    {
      q: "An ideal machine receives 250 J of work input. Calculate its work output.",
      hint: "An ideal machine has no energy losses.",
      formula: "Input work = output work",
      steps: ["For an ideal machine, input work equals output work.", "Output work = 250 J."],
      ans: "250 J",
      final_check: "The equality assumes ideal conditions.",
      common_mistakes: ["Subtracting an assumed friction loss."],
      explanation: "An ideal machine transfers all its input work into useful output work."
    },
    {
      q: "A machine has an effort of 60 N moving 4 m and lifts a load of 160 N by 1 m. Calculate the input work, output work and efficiency.",
      hint: "Calculate both work values, then divide output by input and multiply by 100%.",
      formula: "Input = effort × effort distance; output = load × load distance; efficiency = output/input × 100%",
      steps: ["Input work = 60 × 4 = 240 J.", "Output work = 160 × 1 = 160 J.", "Efficiency = (160/240) × 100% ≈ 66.7%."],
      ans: "Input = 240 J; output = 160 J; efficiency ≈ 66.7%",
      final_check: "Useful output work is less than input work, as expected for a real machine.",
      common_mistakes: ["Using the effort distance to calculate output work.", "Forgetting to multiply the ratio by 100%."],
      explanation: "Efficiency = 160 ÷ 240 × 100% ≈ 66.7%."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Meaning of Pressure",
  `<h2>Meaning of Pressure</h2>
  <p>Pressure is the normal force acting per unit area of a surface.</p>
  <p><strong>Formula:</strong> P = F/A</p>
  <ul>
    <li>P = pressure in pascals (Pa)</li>
    <li>F = perpendicular force in newtons (N)</li>
    <li>A = area in square metres (m²)</li>
  </ul>
  <p>One pascal is one newton per square metre: 1 Pa = 1 N/m².</p>
  <h3>Worked example</h3>
  <p>A force of 100 N acts normally on an area of 5 m².</p>
  <ol>
    <li>P = F/A.</li>
    <li>P = 100/5.</li>
    <li>P = 20 Pa.</li>
  </ol>
  <p><strong>Answer: 20 Pa.</strong></p>
  <p>For the same force, a smaller contact area produces greater pressure.</p>`,
  [
    {
      q: "A force of 60 N acts normally on an area of 3 m². Calculate the pressure.",
      hint: "Divide force by area.",
      formula: "P = F/A",
      steps: ["P = 60/3.", "P = 20 Pa."],
      ans: "20 Pa",
      final_check: "Pressure is measured in pascals.",
      common_mistakes: ["Multiplying force by area."],
      explanation: "Pressure equals 60 N divided by 3 m²."
    },
    {
      q: "A force of 200 N acts on an area of 4 m². Find the pressure.",
      hint: "Use P = F/A.",
      formula: "P = F/A",
      steps: ["P = 200/4.", "P = 50 Pa."],
      ans: "50 Pa",
      final_check: "The force is divided by the area.",
      common_mistakes: ["Dividing area by force."],
      explanation: "200 N ÷ 4 m² = 50 Pa."
    },
    {
      q: "A pressure of 80 Pa acts over an area of 2 m². Calculate the normal force.",
      hint: "Rearrange P = F/A to make F the subject.",
      formula: "F = P × A",
      steps: ["F = 80 × 2.", "F = 160 N."],
      ans: "160 N",
      final_check: "Pressure multiplied by area gives force.",
      common_mistakes: ["Dividing pressure by area."],
      explanation: "F = 80 Pa × 2 m² = 160 N."
    },
    {
      q: "A force of 150 N produces a pressure of 50 Pa. Find the area.",
      hint: "Rearrange P = F/A.",
      formula: "A = F/P",
      steps: ["A = 150/50.", "A = 3 m²."],
      ans: "3 m²",
      final_check: "Area is expressed in square metres.",
      common_mistakes: ["Multiplying force by pressure."],
      explanation: "A = 150 N ÷ 50 Pa = 3 m²."
    },
    {
      q: "The same force acts on two surfaces. Surface X has half the area of surface Y. How does the pressure on X compare with that on Y?",
      hint: "Pressure is inversely proportional to area when force is constant.",
      formula: "P = F/A",
      steps: ["Let the area of Y be A.", "The area of X is A/2.", "Pressure on X is F/(A/2) = 2F/A."],
      ans: "The pressure on X is twice the pressure on Y.",
      final_check: "This comparison assumes the same perpendicular force.",
      common_mistakes: ["Claiming the smaller area gives lower pressure."],
      explanation: "Halving the area doubles pressure when force remains constant."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Pressure in Solids",
  `<h2>Pressure in Solids</h2>
  <p>A solid object exerts pressure on a surface when it applies a force perpendicular to the surface.</p>
  <p><strong>Pressure = perpendicular force ÷ contact area.</strong></p>
  <p>For an object resting on a horizontal surface, the force may be its weight, provided no other vertical forces change the normal force.</p>
  <h3>Everyday applications</h3>
  <ul>
    <li>A sharp knife has a small cutting area, producing high pressure for a given force.</li>
    <li>Wide tyres spread a vehicle's weight over a larger area, reducing pressure on soft ground.</li>
    <li>Wide foundations spread a building's load over a larger area.</li>
  </ul>
  <p>Changing the contact area changes pressure even if the force stays the same.</p>`,
  [
    {
      q: "Why does a sharp knife cut more easily than a blunt knife when the same force is applied?",
      hint: "Compare the contact areas of the two edges.",
      steps: ["A sharp edge has a smaller contact area.", "Pressure equals force divided by area.", "The smaller area produces greater pressure."],
      ans: "Its smaller contact area produces greater pressure.",
      final_check: "The comparison assumes the same applied force.",
      common_mistakes: ["Saying the sharp knife necessarily applies a greater force."],
      explanation: "A smaller area concentrates the applied force."
    },
    {
      q: "A force of 500 N acts on a contact area of 0.25 m². Calculate the pressure.",
      hint: "Divide 500 by 0.25.",
      formula: "P = F/A",
      steps: ["P = 500/0.25.", "P = 2,000 Pa."],
      ans: "2,000 Pa",
      final_check: "Dividing by a fraction smaller than one gives a result greater than 500.",
      common_mistakes: ["Calculating 500 × 0.25."],
      explanation: "500 N ÷ 0.25 m² = 2,000 Pa."
    },
    {
      q: "A 600 N object rests on a horizontal floor over an area of 2 m². Find the pressure it exerts.",
      hint: "Use the object's weight as the perpendicular force.",
      formula: "P = F/A",
      steps: ["P = 600/2.", "P = 300 Pa."],
      ans: "300 Pa",
      final_check: "The stated weight is the force acting on the floor.",
      common_mistakes: ["Using the area as the numerator."],
      explanation: "Pressure = 600 N ÷ 2 m² = 300 Pa."
    },
    {
      q: "A person stands on one foot rather than two. If the person's weight stays constant and the contact area halves, what happens to the pressure?",
      hint: "Use the inverse relationship between pressure and area.",
      formula: "P = F/A",
      steps: ["The weight remains constant.", "The contact area becomes half.", "Pressure doubles."],
      ans: "The pressure doubles.",
      final_check: "Assume the area on one foot is half the combined area of both feet.",
      common_mistakes: ["Saying pressure halves because there is one foot."],
      explanation: "The same weight acting on half the area produces twice the pressure."
    },
    {
      q: "Why are building foundations made wide?",
      hint: "Consider the pressure exerted on the ground.",
      steps: ["The building has a downward load.", "A wider foundation increases contact area.", "The pressure on the ground decreases for the same load."],
      ans: "To spread the load over a larger area and reduce pressure on the ground.",
      final_check: "The load is spread rather than eliminated.",
      common_mistakes: ["Claiming a wide foundation reduces the building's weight."],
      explanation: "Pressure decreases when area increases while force remains constant."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Pressure in Liquids",
  `<h2>Pressure in Liquids</h2>
  <p>A liquid exerts pressure because of the weight of the liquid above a point. In a stationary liquid of uniform density, pressure increases with depth.</p>
  <p><strong>Liquid pressure:</strong> p = ρgh</p>
  <ul>
    <li>ρ = liquid density in kg/m³</li>
    <li>g = gravitational field strength in N/kg</li>
    <li>h = depth below the liquid surface in metres</li>
  </ul>
  <p>The formula gives the pressure due to the liquid alone. It does not include atmospheric pressure.</p>
  <h3>Worked example</h3>
  <p>Water has density 1,000 kg/m³. Take g = 10 N/kg. Find the liquid pressure at a depth of 2 m.</p>
  <ol>
    <li>p = ρgh.</li>
    <li>p = 1,000 × 10 × 2.</li>
    <li>p = 20,000 Pa.</li>
  </ol>
  <p><strong>Answer: 20,000 Pa.</strong></p>`,
  [
    {
      q: "Calculate the liquid pressure at a depth of 3 m in water of density 1,000 kg/m³. Take g = 10 N/kg.",
      hint: "Substitute density, gravitational field strength and depth into p = ρgh.",
      formula: "p = ρgh",
      steps: ["p = 1,000 × 10 × 3.", "p = 30,000 Pa."],
      ans: "30,000 Pa",
      final_check: "Convert depth to metres before substituting.",
      common_mistakes: ["Forgetting to multiply by depth."],
      explanation: "Liquid pressure = 1,000 × 10 × 3 = 30,000 Pa."
    },
    {
      q: "A liquid has density 800 kg/m³. Find the pressure at 2 m depth using g = 10 N/kg.",
      hint: "Use p = ρgh.",
      formula: "p = ρgh",
      steps: ["p = 800 × 10 × 2.", "p = 16,000 Pa."],
      ans: "16,000 Pa",
      final_check: "Use the given liquid density, not water's density.",
      common_mistakes: ["Substituting 1,000 kg/m³ for the stated density."],
      explanation: "p = 800 × 10 × 2 = 16,000 Pa."
    },
    {
      q: "Water pressure due to the liquid alone is 40,000 Pa. Find the depth, taking water density as 1,000 kg/m³ and g = 10 N/kg.",
      hint: "Rearrange p = ρgh to make h the subject.",
      formula: "h = p/(ρg)",
      steps: ["h = 40,000/(1,000 × 10).", "h = 4 m."],
      ans: "4 m",
      final_check: "Depth is measured in metres.",
      common_mistakes: ["Multiplying pressure by density and g."],
      explanation: "h = 40,000 ÷ 10,000 = 4 m."
    },
    {
      q: "At a depth of 1.5 m in water, calculate the liquid pressure using ρ = 1,000 kg/m³ and g = 10 N/kg.",
      hint: "Multiply 1,000 by 10 and then by 1.5.",
      formula: "p = ρgh",
      steps: ["p = 1,000 × 10 × 1.5.", "p = 15,000 Pa."],
      ans: "15,000 Pa",
      final_check: "The result is pressure due to water only.",
      common_mistakes: ["Using 15 instead of 15,000."],
      explanation: "p = 15,000 Pa."
    },
    {
      q: "At the same depth, compare the liquid pressure in water of density 1,000 kg/m³ and oil of density 800 kg/m³.",
      hint: "Pressure is proportional to density when depth and g are constant.",
      formula: "p = ρgh",
      steps: ["Both liquids have the same depth.", "Water has density 1,000 kg/m³; oil has density 800 kg/m³.", "Water pressure is 1,000/800 = 1.25 times the oil pressure."],
      ans: "Water pressure is 1.25 times the oil pressure.",
      final_check: "The comparison assumes the same gravitational field strength and depth.",
      common_mistakes: ["Assuming the two liquids exert equal pressure at the same depth."],
      explanation: "The denser liquid produces greater pressure at the same depth."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Factors Affecting Liquid Pressure",
  `<h2>Factors Affecting Liquid Pressure</h2>
  <p>For a stationary liquid, the pressure due to the liquid is given by p = ρgh.</p>
  <p>Therefore, liquid pressure depends on:</p>
  <ul>
    <li><strong>Depth (h):</strong> greater depth gives greater pressure.</li>
    <li><strong>Density (ρ):</strong> a denser liquid gives greater pressure at the same depth.</li>
    <li><strong>Gravitational field strength (g):</strong> greater g gives greater pressure for the same liquid and depth.</li>
  </ul>
  <p>At the same depth in the same stationary liquid, pressure is the same regardless of the container's shape. The formula gives gauge pressure due to the liquid, excluding atmospheric pressure.</p>`,
  [
    {
      q: "What happens to liquid pressure when depth doubles, while density and g remain constant?",
      hint: "Pressure is directly proportional to depth.",
      formula: "p = ρgh",
      steps: ["Density remains constant.", "g remains constant.", "Doubling h doubles p."],
      ans: "The liquid pressure doubles.",
      final_check: "This concerns pressure due to the liquid alone.",
      common_mistakes: ["Saying pressure remains constant at every depth."],
      explanation: "Pressure is directly proportional to depth."
    },
    {
      q: "Two liquids have densities 900 kg/m³ and 1,200 kg/m³. At equal depths, which exerts greater pressure?",
      hint: "Compare their densities.",
      steps: ["Depth and g are equal.", "Pressure is proportional to density.", "1,200 kg/m³ is greater than 900 kg/m³."],
      ans: "The liquid with density 1,200 kg/m³.",
      final_check: "The liquids must be compared at the same depth.",
      common_mistakes: ["Choosing the less dense liquid."],
      explanation: "The denser liquid produces greater pressure at equal depth."
    },
    {
      q: "Does liquid pressure at a given depth in a stationary liquid depend on the shape of the container?",
      hint: "Consider the variables in p = ρgh.",
      steps: ["The formula includes density, gravitational field strength and depth.", "Container shape is not in the formula.", "At equal depth in the same liquid, the pressure is equal."],
      ans: "No. It depends on density, gravitational field strength and depth, not container shape.",
      final_check: "This applies to a stationary liquid under the stated conditions.",
      common_mistakes: ["Assuming a wider container always gives lower pressure at the same depth."],
      explanation: "Pressure depends on the height and density of the liquid column, not the container's shape."
    },
    {
      q: "A liquid's density doubles while depth and gravitational field strength remain unchanged. What happens to the liquid pressure?",
      hint: "Pressure is directly proportional to density.",
      formula: "p = ρgh",
      steps: ["Density becomes 2ρ.", "New pressure = 2ρgh.", "New pressure is twice the original."],
      ans: "The pressure doubles.",
      final_check: "The depth and g are unchanged.",
      common_mistakes: ["Saying pressure halves when density doubles."],
      explanation: "Doubling density doubles liquid pressure at the same depth."
    },
    {
      q: "Why is pressure greater near the bottom of a deep pool than near its surface?",
      hint: "Compare the amount of liquid above each point.",
      steps: ["More liquid lies above the deeper point.", "The liquid column exerts greater pressure at greater depth.", "Therefore, pressure is greater near the bottom."],
      ans: "Because liquid pressure increases with depth.",
      final_check: "This is due to the weight of the liquid above the point.",
      common_mistakes: ["Claiming the pool's water pressure is the same at every depth."],
      explanation: "Greater depth means a taller column of liquid above the point."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Atmospheric Pressure",
  `<h2>Atmospheric Pressure</h2>
  <p>Atmospheric pressure is the pressure exerted by the weight and motion of air in the atmosphere. Air pressure acts in all directions.</p>
  <p>Near sea level, standard atmospheric pressure is approximately 101,325 Pa, often rounded to 101,000 Pa or 1.01 × 10⁵ Pa.</p>
  <h3>How atmospheric pressure changes</h3>
  <p>Atmospheric pressure generally decreases with increasing altitude because less air lies above a point at higher altitude.</p>
  <h3>Everyday examples</h3>
  <ul>
    <li>A drinking straw works because sucking lowers the pressure inside the straw, allowing atmospheric pressure on the drink's surface to push liquid up.</li>
    <li>A suction cup holds when the pressure difference presses it against a surface.</li>
    <li>A barometer is used to measure atmospheric pressure.</li>
  </ul>
  <p>Atmospheric pressure is real even though we do not normally feel it as a net force, because pressures around our bodies are largely balanced.</p>`,
  [
    {
      q: "What is atmospheric pressure?",
      hint: "Think about the air surrounding Earth.",
      steps: ["Air has mass and exerts pressure.", "The atmosphere exerts pressure on surfaces and objects."],
      ans: "The pressure exerted by the atmosphere.",
      final_check: "Air pressure acts in all directions.",
      common_mistakes: ["Claiming only liquids exert pressure."],
      explanation: "Air exerts pressure because it is a gas with mass and moving particles."
    },
    {
      q: "What is the approximate standard atmospheric pressure near sea level?",
      hint: "Recall the standard value in pascals.",
      steps: ["Standard atmospheric pressure is about 101,325 Pa.", "It is often rounded to 101,000 Pa."],
      ans: "Approximately 101,325 Pa",
      final_check: "The exact local value changes with weather and altitude.",
      common_mistakes: ["Giving 101 Pa instead of about 101,000 Pa."],
      explanation: "Standard atmospheric pressure is approximately 1.013 × 10⁵ Pa."
    },
    {
      q: "Why does atmospheric pressure generally decrease as altitude increases?",
      hint: "Compare how much air lies above points at different heights.",
      steps: ["At greater altitude, less atmosphere lies above the point.", "The weight of the overlying air is smaller.", "Atmospheric pressure generally decreases."],
      ans: "There is less overlying air exerting pressure.",
      final_check: "Weather conditions can also affect the actual pressure.",
      common_mistakes: ["Claiming that gravity stops acting at high altitude."],
      explanation: "Atmospheric pressure generally falls with height because the overlying air column becomes smaller."
    },
    {
      q: "How does a drinking straw allow liquid to rise into the mouth?",
      hint: "Think about pressure inside the straw and pressure on the drink's surface.",
      steps: ["Sucking lowers pressure inside the straw.", "Atmospheric pressure acts on the liquid surface in the cup.", "The pressure difference pushes liquid up the straw."],
      ans: "Lowering the pressure in the straw allows atmospheric pressure to push the liquid upward.",
      final_check: "The drink is not simply pulled upward by a vacuum.",
      common_mistakes: ["Saying suction alone lifts the drink without a pressure difference."],
      explanation: "The pressure difference between the liquid surface and the straw drives the liquid upward."
    },
    {
      q: "Which instrument is used to measure atmospheric pressure?",
      hint: "It is commonly used in weather observations.",
      steps: ["Identify the instrument for measuring atmospheric pressure."],
      ans: "Barometer",
      final_check: "A thermometer measures temperature, not atmospheric pressure.",
      common_mistakes: ["Confusing a barometer with a thermometer."],
      explanation: "A barometer measures atmospheric pressure."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Pressure Differences",
  `<h2>Pressure Differences</h2>
  <p>A pressure difference is the difference between pressure at two locations. A fluid tends to move from a region of higher pressure towards a region of lower pressure when a path is available.</p>
  <p><strong>Pressure difference:</strong> Δp = p₁ − p₂, where p₁ is the higher pressure and p₂ is the lower pressure.</p>
  <p>A pressure difference can produce a net force on an object or drive fluid flow.</p>
  <h3>Worked example</h3>
  <p>Pressure on one side of a surface is 120,000 Pa and pressure on the other side is 100,000 Pa.</p>
  <ol>
    <li>Δp = 120,000 − 100,000.</li>
    <li>Δp = 20,000 Pa.</li>
  </ol>
  <p><strong>Answer: 20,000 Pa.</strong></p>
  <p>When pressure is equal on both sides, the pressures do not produce a net force across the surface.</p>`,
  [
    {
      q: "The pressure on one side of a surface is 90,000 Pa and on the other side is 70,000 Pa. Find the pressure difference.",
      hint: "Subtract the lower pressure from the higher pressure.",
      formula: "Δp = p₁ − p₂",
      steps: ["Δp = 90,000 − 70,000.", "Δp = 20,000 Pa."],
      ans: "20,000 Pa",
      final_check: "The pressure difference is positive when defined from higher to lower pressure.",
      common_mistakes: ["Adding the pressures."],
      explanation: "90,000 Pa − 70,000 Pa = 20,000 Pa."
    },
    {
      q: "The pressure is 150,000 Pa inside a container and 100,000 Pa outside. What is the inside-to-outside pressure difference?",
      hint: "Subtract outside pressure from inside pressure.",
      formula: "Δp = p_inside − p_outside",
      steps: ["Δp = 150,000 − 100,000.", "Δp = 50,000 Pa."],
      ans: "50,000 Pa",
      final_check: "The inside pressure is higher.",
      common_mistakes: ["Subtracting in the opposite order without stating the sign convention."],
      explanation: "The pressure inside exceeds the outside pressure by 50,000 Pa."
    },
    {
      q: "Pressure is equal on both sides of a flat surface. What is the net force due to these pressures across the surface?",
      hint: "Equal pressures act in opposite directions across the surface.",
      steps: ["The pressures have equal magnitude.", "Their effects across the surface balance.", "The net force due to the pressure difference is zero."],
      ans: "Zero",
      final_check: "This is the net force due to the pressure difference alone.",
      common_mistakes: ["Claiming that each pressure is individually zero."],
      explanation: "Equal opposing pressure effects produce no net force across the surface."
    },
    {
      q: "Why does air flow through an opening from a high-pressure region to a low-pressure region?",
      hint: "Consider the net effect of the pressure forces.",
      steps: ["Pressure is greater on one side.", "The pressure difference creates a net force on the air.", "The air tends to move towards the lower-pressure region."],
      ans: "The pressure difference drives the air from higher towards lower pressure.",
      final_check: "Actual flow also depends on the available path and other conditions.",
      common_mistakes: ["Saying air always moves from low to high pressure spontaneously."],
      explanation: "A pressure gradient can drive fluid motion."
    },
    {
      q: "A pressure difference of 25,000 Pa acts across an area of 0.02 m². Calculate the net force due to this pressure difference.",
      hint: "Rearrange pressure = force ÷ area.",
      formula: "F = Δp × A",
      steps: ["F = 25,000 × 0.02.", "F = 500 N."],
      ans: "500 N",
      final_check: "Use the pressure difference, not either pressure alone.",
      common_mistakes: ["Dividing pressure difference by area."],
      explanation: "Net force = 25,000 Pa × 0.02 m² = 500 N."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Upthrust",
  `<h2>Upthrust</h2>
  <p>Upthrust is the upward force a fluid exerts on an object partly or fully immersed in it.</p>
  <p>In a liquid, pressure increases with depth. The bottom of an immersed object is generally at a greater depth than its top, so the upward pressure force on the bottom can exceed the downward pressure force on the top. The result is an upward force.</p>
  <h3>Archimedes' principle</h3>
  <p>The upthrust on an immersed object equals the weight of the fluid displaced by the object.</p>
  <p><strong>Upthrust = weight of displaced fluid</strong></p>
  <p>For a uniform gravitational field, the weight of displaced fluid is its mass multiplied by g.</p>
  <p>Upthrust acts upward, opposing the object's weight, but it does not always equal the object's weight.</p>`,
  [
    {
      q: "What is upthrust?",
      hint: "It is the force a fluid exerts on an immersed object.",
      steps: ["Identify the force exerted by the surrounding fluid.", "State its direction."],
      ans: "The upward force exerted by a fluid on an immersed object.",
      final_check: "Upthrust acts upward.",
      common_mistakes: ["Calling upthrust the object's weight."],
      explanation: "Upthrust is the buoyant force exerted by a fluid."
    },
    {
      q: "State Archimedes' principle.",
      hint: "Relate the upthrust to the displaced fluid.",
      steps: ["Identify the upward force on the immersed object.", "Compare it with the weight of the fluid displaced."],
      ans: "An immersed object experiences an upthrust equal to the weight of the fluid it displaces.",
      final_check: "The principle applies to objects partly or fully immersed in a fluid.",
      common_mistakes: ["Saying upthrust always equals the object's own weight."],
      explanation: "Upthrust depends on the weight of displaced fluid."
    },
    {
      q: "An object displaces 2 kg of water. Take g = 10 N/kg. Calculate the upthrust.",
      hint: "Find the weight of the displaced water.",
      formula: "Upthrust = mass of displaced fluid × g",
      steps: ["Upthrust = 2 × 10.", "Upthrust = 20 N."],
      ans: "20 N",
      final_check: "Upthrust is measured in newtons.",
      common_mistakes: ["Giving the answer as 2 N."],
      explanation: "The displaced water weighs 20 N, so the upthrust is 20 N."
    },
    {
      q: "Why is the pressure force on the bottom of an immersed object often greater than the pressure force on its top?",
      hint: "Compare the depths of the object's top and bottom.",
      steps: ["Liquid pressure increases with depth.", "The bottom is deeper than the top.", "The upward force on the bottom can exceed the downward force on the top."],
      ans: "The bottom is at greater depth, where liquid pressure is higher.",
      final_check: "The pressure difference contributes to the upward resultant force.",
      common_mistakes: ["Claiming liquid pressure is equal at all depths."],
      explanation: "The pressure difference between the lower and upper surfaces produces upthrust."
    },
    {
      q: "An object displaces 0.5 kg of a liquid. Take g = 10 N/kg. What is the upthrust?",
      hint: "Upthrust equals the weight of the displaced liquid.",
      formula: "U = mg",
      steps: ["U = 0.5 × 10.", "U = 5 N."],
      ans: "5 N",
      final_check: "The displaced liquid's mass is used, not automatically the object's mass.",
      common_mistakes: ["Using the mass of the object instead of the displaced fluid."],
      explanation: "The weight of 0.5 kg of displaced liquid is 5 N."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Floating and Sinking",
  `<h2>Floating and Sinking</h2>
  <p>Whether an object rises, sinks or floats depends on its weight and the upthrust acting on it.</p>
  <ul>
    <li><strong>Upthrust greater than weight:</strong> the object accelerates upward.</li>
    <li><strong>Weight greater than upthrust:</strong> the object accelerates downward.</li>
    <li><strong>Upthrust equal to weight:</strong> the vertical forces balance; the object can remain at rest or move at constant vertical velocity.</li>
  </ul>
  <p>A floating object at rest has upthrust equal to its weight. It displaces enough fluid for the weight of that displaced fluid to equal the object's weight.</p>
  <p>Average density helps explain flotation: an object whose average density is less than the fluid's density can float, depending on its shape and whether it can take in the fluid.</p>`,
  [
    {
      q: "An object weighs 30 N and experiences an upthrust of 20 N. What is the resultant vertical force?",
      hint: "Subtract the upward force from the downward weight.",
      formula: "Resultant force downward = weight − upthrust",
      steps: ["Weight = 30 N downward.", "Upthrust = 20 N upward.", "Resultant = 30 − 20 = 10 N downward."],
      ans: "10 N downward",
      final_check: "The greater force is the weight.",
      common_mistakes: ["Adding the forces without considering direction."],
      explanation: "The downward weight exceeds the upward upthrust by 10 N."
    },
    {
      q: "An object weighs 15 N and experiences an upthrust of 15 N. What is the resultant vertical force?",
      hint: "The two forces are equal and opposite.",
      formula: "Resultant force = weight − upthrust",
      steps: ["Weight = 15 N downward.", "Upthrust = 15 N upward.", "Resultant vertical force = 0 N."],
      ans: "0 N",
      final_check: "Zero resultant force means no vertical acceleration.",
      common_mistakes: ["Saying the object must be moving upward."],
      explanation: "Equal opposing forces balance; the object may be at rest or move at constant velocity."
    },
    {
      q: "A floating object is at rest on water. How does its upthrust compare with its weight?",
      hint: "The vertical forces must balance.",
      steps: ["The object is at rest.", "Its vertical acceleration is zero.", "Upthrust equals weight."],
      ans: "Upthrust equals its weight.",
      final_check: "This assumes no other vertical forces act on the object.",
      common_mistakes: ["Claiming that a floating object has greater upthrust than weight."],
      explanation: "A floating object at rest is in vertical equilibrium."
    },
    {
      q: "An object has an average density of 700 kg/m³ and is placed in water of density 1,000 kg/m³. Can it float under suitable conditions?",
      hint: "Compare the object's average density with the fluid density.",
      steps: ["Object density = 700 kg/m³.", "Water density = 1,000 kg/m³.", "The object's average density is lower than water's."],
      ans: "Yes, it can float under suitable conditions.",
      final_check: "This density comparison assumes the object does not fill with water or otherwise change its average density.",
      common_mistakes: ["Assuming every object sinks regardless of its average density."],
      explanation: "An object with lower average density than the fluid can displace enough fluid to support its weight."
    },
    {
      q: "An object has a weight of 50 N and an upthrust of 65 N while immersed. What is the resultant force and its direction?",
      hint: "Compare the upward upthrust with the downward weight.",
      formula: "Resultant upward force = upthrust − weight",
      steps: ["Upthrust = 65 N upward.", "Weight = 50 N downward.", "Resultant = 65 − 50 = 15 N upward."],
      ans: "15 N upward",
      final_check: "The object accelerates upward if no other forces change the result.",
      common_mistakes: ["Subtracting the larger force from the smaller without stating direction."],
      explanation: "The upthrust exceeds the weight by 15 N."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Applications of Upthrust",
  `<h2>Applications of Upthrust</h2>
  <p>Upthrust explains why ships can float, why balloons filled with a suitable gas rise in air, and how hydrometers can be used to compare liquid densities.</p>
  <h3>Ships</h3>
  <p>A ship's hollow hull makes its overall average density lower than that of the water it displaces. It sinks until the upthrust balances its weight.</p>
  <h3>Hydrometers</h3>
  <p>A hydrometer floats at a depth determined by the balance between its weight and the upthrust. In a denser liquid, it generally needs to displace less liquid volume, so it floats higher.</p>
  <h3>Balloons</h3>
  <p>A balloon rises when the upthrust from the surrounding air exceeds the total downward weight of the balloon and its contents.</p>
  <p>In every case, the key principle is a balance between weight and upthrust, along with the density of the surrounding fluid.</p>`,
  [
    {
      q: "Why can a large steel ship float even though steel is denser than water?",
      hint: "Consider the average density of the entire ship, including the air inside its hull.",
      steps: ["The ship has a hollow hull containing air.", "Its overall average density can be less than that of water.", "It displaces enough water for upthrust to balance its weight."],
      ans: "Its hollow shape gives it a sufficiently low average density and lets it displace enough water to balance its weight.",
      final_check: "The steel itself is denser than water, but the whole ship is not solid steel.",
      common_mistakes: ["Claiming steel itself becomes less dense than water."],
      explanation: "A ship floats because the upthrust from displaced water can balance its total weight."
    },
    {
      q: "A hydrometer is placed in two liquids. In which liquid will it generally float higher: the denser liquid or the less dense liquid?",
      hint: "A denser liquid provides the required upthrust with less displaced volume.",
      steps: ["The hydrometer's weight stays constant.", "A denser liquid provides greater upthrust per unit displaced volume.", "Less volume needs to be displaced, so the hydrometer floats higher."],
      ans: "The denser liquid.",
      final_check: "This assumes the same hydrometer is used in both liquids.",
      common_mistakes: ["Claiming it must sink deeper in the denser liquid."],
      explanation: "The hydrometer displaces less volume in a denser liquid to balance its weight."
    },
    {
      q: "What condition must be met for a balloon to rise in air?",
      hint: "Compare the upward buoyant force with the total downward weight.",
      steps: ["Air exerts an upward buoyant force.", "The balloon and contents have a total weight.", "For upward acceleration, upthrust must exceed total weight."],
      ans: "The upthrust must exceed the total weight of the balloon and its contents.",
      final_check: "If the forces are equal, there is no upward acceleration.",
      common_mistakes: ["Saying the balloon rises simply because it contains gas."],
      explanation: "The net upward force determines whether the balloon accelerates upward."
    },
    {
      q: "A floating boat displaces water weighing 4,000 N. What is the boat's weight if it is floating at rest?",
      hint: "Use Archimedes' principle and the balance of forces.",
      steps: ["Upthrust equals the weight of displaced water = 4,000 N.", "At rest, the boat's weight equals the upthrust.", "Boat weight = 4,000 N."],
      ans: "4,000 N",
      final_check: "The boat is assumed to be floating at rest.",
      common_mistakes: ["Using the mass of the water as if it were a force."],
      explanation: "A floating boat at rest has weight equal to the upthrust."
    },
    {
      q: "Why does a hydrometer generally sink deeper in a less dense liquid?",
      hint: "The less dense liquid provides less upthrust per unit volume displaced.",
      steps: ["The hydrometer's weight is unchanged.", "A less dense liquid provides less upthrust for the same displaced volume.", "More liquid volume must be displaced, so the hydrometer sinks deeper."],
      ans: "It must displace a greater volume of the less dense liquid to balance its weight.",
      final_check: "The hydrometer is assumed to be floating in equilibrium.",
      common_mistakes: ["Saying the hydrometer's weight increases in the less dense liquid."],
      explanation: "The greater displaced volume compensates for the lower density of the liquid."
    }
  ]
);

add(
  "pressure",
  "pressure",
  "Pressure in Gases",
  `<h2>Pressure in Gases</h2>
  <p>A gas consists of particles moving randomly. Gas pressure arises from collisions of these particles with the walls of their container.</p>
  <p>When particles collide with a wall, they exert force on it. The combined effect of many collisions produces measurable pressure.</p>
  <h3>Changing gas pressure</h3>
  <ul>
    <li>Increasing temperature in a sealed rigid container increases particle speeds and usually increases pressure.</li>
    <li>Reducing the volume of a fixed amount of gas at constant temperature increases pressure.</li>
    <li>Adding more gas particles to a fixed volume at constant temperature generally increases pressure.</li>
  </ul>
  <p>These comparisons assume the other stated conditions remain constant. Gas pressure acts in all directions.</p>`,
  [
    {
      q: "What causes the pressure exerted by a gas on the walls of its container?",
      hint: "Think about what moving particles do when they hit a wall.",
      steps: ["Gas particles move randomly.", "They collide with the container walls.", "Their collisions exert force on the walls."],
      ans: "Collisions of moving gas particles with the container walls.",
      final_check: "Pressure is the force per unit area due to these collisions.",
      common_mistakes: ["Claiming gas pressure is caused only by the weight of the gas."],
      explanation: "The impacts of gas particles on the walls produce gas pressure."
    },
    {
      q: "What generally happens to the pressure of a fixed amount of gas when it is heated in a sealed rigid container?",
      hint: "The container volume stays constant while particle temperature rises.",
      steps: ["Heating increases the particles' average kinetic energy.", "Particles move faster on average.", "Collisions transfer momentum more strongly, increasing pressure."],
      ans: "The pressure increases.",
      final_check: "The container is rigid and sealed, so volume and amount of gas stay constant.",
      common_mistakes: ["Saying pressure decreases because the gas becomes hotter."],
      explanation: "At constant volume, increasing gas temperature increases pressure."
    },
    {
      q: "What happens to gas pressure when a fixed amount of gas is compressed at constant temperature?",
      hint: "The gas occupies a smaller volume.",
      steps: ["The gas volume decreases.", "Particles collide with the walls more frequently per unit area.", "Pressure increases."],
      ans: "The pressure increases.",
      final_check: "This comparison assumes constant temperature and amount of gas.",
      common_mistakes: ["Saying pressure decreases because there is less space."],
      explanation: "Compressing a gas at constant temperature raises its pressure."
    },
    {
      q: "Why does gas pressure act in all directions?",
      hint: "Consider the random motion of gas particles.",
      steps: ["Particles move randomly in different directions.", "They collide with walls of different orientations.", "The collisions exert pressure in all directions."],
      ans: "Gas particles move randomly and collide with surfaces in all directions.",
      final_check: "Gas pressure is not restricted to downward direction.",
      common_mistakes: ["Claiming gas pressure acts only downward because gases have mass."],
      explanation: "Random particle motion produces pressure on every wall of the container."
    },
    {
      q: "A sealed rigid container holds gas at constant volume. If the gas is cooled, what generally happens to its pressure?",
      hint: "Cooling reduces the particles' average kinetic energy.",
      steps: ["Cooling reduces average particle kinetic energy.", "Particles move more slowly on average.", "Pressure decreases."],
      ans: "The pressure decreases.",
      final_check: "Assume the gas remains in the same state and its amount and volume are unchanged.",
      common_mistakes: ["Saying pressure rises because particles become closer without a volume change."],
      explanation: "At fixed volume, lower gas temperature generally means lower pressure."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Elasticity",
  `<h2>Elasticity</h2>
  <p>Elasticity is the ability of a material to return to its original shape and dimensions after the deforming force is removed, provided the material has not been stretched beyond its elastic limit.</p>
  <p>A deforming force can stretch, compress, bend or twist an object.</p>
  <h3>Examples</h3>
  <ul>
    <li>A spring returns towards its original length after a small stretching force is removed.</li>
    <li>A rubber band returns towards its original shape when stretched within its elastic range.</li>
    <li>A metal wire can behave elastically under sufficiently small loads.</li>
  </ul>
  <p>Elasticity does not mean a material cannot change shape. It means the material can recover its original shape when the force is removed, within the elastic range.</p>`,
  [
    {
      q: "What is elasticity?",
      hint: "Consider what happens after a deforming force is removed.",
      steps: ["A force changes an object's shape or dimensions.", "The force is removed.", "An elastic material returns to its original shape and dimensions within its elastic range."],
      ans: "The ability of a material to return to its original shape and dimensions after a deforming force is removed, within its elastic range.",
      final_check: "The material must not have been deformed beyond its elastic limit.",
      common_mistakes: ["Defining elasticity as the ability to stretch only."],
      explanation: "An elastic material recovers its original shape when the deforming force is removed, provided its elastic limit has not been exceeded."
    },
    {
      q: "A spring is stretched slightly and returns to its original length when released. What property does it demonstrate?",
      hint: "It recovers its original length.",
      steps: ["The spring is deformed by a force.", "The force is removed.", "The spring returns to its original length."],
      ans: "Elasticity",
      final_check: "The spring has recovered its original dimensions.",
      common_mistakes: ["Calling this plastic deformation."],
      explanation: "Returning to the original length after removing the force demonstrates elastic behaviour."
    },
    {
      q: "Does an elastic material have to be rigid and incapable of changing shape?",
      hint: "Distinguish temporary deformation from permanent deformation.",
      steps: ["A force can deform an elastic material.", "The material can recover after the force is removed.", "Therefore, elasticity does not mean rigidity."],
      ans: "No. It can change shape temporarily and recover when the force is removed.",
      final_check: "Recovery must occur within the material's elastic range.",
      common_mistakes: ["Assuming elastic materials cannot stretch or bend."],
      explanation: "Elasticity describes recovery after deformation, not resistance to all deformation."
    },
    {
      q: "A metal wire is stretched beyond its elastic limit and remains longer after the load is removed. Has it shown complete elastic recovery?",
      hint: "Compare its final length with its original length.",
      steps: ["The load is removed.", "The wire remains longer than before.", "It has undergone permanent deformation."],
      ans: "No. It has undergone permanent deformation.",
      final_check: "Some elastic recovery may still have occurred, but it did not return fully to its original length.",
      common_mistakes: ["Claiming that every material always returns completely to its original shape."],
      explanation: "Beyond the elastic limit, a material may not recover its original dimensions."
    },
    {
      q: "A student says, 'A material is elastic because it can be stretched.' What important part of the definition is missing?",
      hint: "Think about what happens after stretching stops.",
      steps: ["Stretching is a form of deformation.", "Elasticity requires recovery after the force is removed.", "The material must return to its original dimensions within its elastic range."],
      ans: "It must return to its original shape and dimensions when the force is removed, within its elastic range.",
      final_check: "Stretching alone does not prove elasticity.",
      common_mistakes: ["Treating stretching and elasticity as identical properties."],
      explanation: "The defining feature of elasticity is recovery after the deforming force is removed."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Extension and Compression",
  `<h2>Extension and Compression</h2>
  <p>Extension is the increase in length of an object when a stretching force acts on it.</p>
  <p><strong>Extension = stretched length − original length</strong></p>
  <p>Compression is a decrease in length or a reduction in size caused by a compressive force.</p>
  <h3>Worked example</h3>
  <p>A spring has an original length of 12 cm. Its stretched length is 17 cm.</p>
  <ol>
    <li>Extension = stretched length − original length.</li>
    <li>Extension = 17 − 12.</li>
    <li>Extension = 5 cm = 0.05 m.</li>
  </ol>
  <p><strong>Answer: 5 cm or 0.05 m.</strong></p>
  <p>When using SI units in calculations, convert centimetres to metres where required. One centimetre equals 0.01 m.</p>`,
  [
    {
      q: "A spring's original length is 8 cm and its stretched length is 13 cm. Find its extension.",
      hint: "Subtract the original length from the stretched length.",
      formula: "Extension = stretched length − original length",
      steps: ["Extension = 13 − 8.", "Extension = 5 cm."],
      ans: "5 cm",
      final_check: "Extension is the increase in length, not the final length.",
      common_mistakes: ["Giving 13 cm as the extension."],
      explanation: "13 cm − 8 cm = 5 cm."
    },
    {
      q: "A wire increases in length from 1.20 m to 1.27 m. Calculate its extension.",
      hint: "Subtract 1.20 m from 1.27 m.",
      formula: "Extension = stretched length − original length",
      steps: ["Extension = 1.27 − 1.20.", "Extension = 0.07 m."],
      ans: "0.07 m",
      final_check: "Keep both lengths in metres.",
      common_mistakes: ["Writing 0.7 m instead of 0.07 m."],
      explanation: "The increase in length is 0.07 m."
    },
    {
      q: "A spring has an original length of 0.25 m and an extension of 0.08 m. Find its stretched length.",
      hint: "Rearrange the extension formula.",
      formula: "Stretched length = original length + extension",
      steps: ["Stretched length = 0.25 + 0.08.", "Stretched length = 0.33 m."],
      ans: "0.33 m",
      final_check: "The stretched length must be greater than the original length.",
      common_mistakes: ["Subtracting extension from original length."],
      explanation: "0.25 m + 0.08 m = 0.33 m."
    },
    {
      q: "A compressed object decreases in length from 20 cm to 16 cm. By how much has its length decreased?",
      hint: "Subtract the final length from the original length.",
      formula: "Decrease in length = original length − final length",
      steps: ["Decrease = 20 − 16.", "Decrease = 4 cm."],
      ans: "4 cm",
      final_check: "A decrease is positive when calculated as original minus final length.",
      common_mistakes: ["Using final length minus original length without explaining the negative sign."],
      explanation: "The object is 4 cm shorter than it was originally."
    },
    {
      q: "A spring stretches by 6 cm. Express this extension in metres.",
      hint: "Multiply centimetres by 0.01 to convert to metres.",
      formula: "1 cm = 0.01 m",
      steps: ["6 cm = 6 × 0.01 m.", "Extension = 0.06 m."],
      ans: "0.06 m",
      final_check: "Six centimetres is less than one metre.",
      common_mistakes: ["Writing 0.6 m or 6 m."],
      explanation: "6 × 0.01 = 0.06 m."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Hooke's Law",
  `<h2>Hooke's Law</h2>
  <p>Hooke's law states that, for a spring or suitable elastic material, extension is directly proportional to the applied force, provided the limit of proportionality has not been exceeded.</p>
  <p><strong>F ∝ x</strong></p>
  <p>For a spring obeying Hooke's law:</p>
  <p><strong>F = kx</strong></p>
  <ul>
    <li>F = applied force in newtons (N)</li>
    <li>k = spring constant in newtons per metre (N/m)</li>
    <li>x = extension in metres (m)</li>
  </ul>
  <h3>Worked example</h3>
  <p>A spring extends by 0.04 m when a force of 8 N is applied. Calculate its spring constant.</p>
  <ol>
    <li>k = F/x.</li>
    <li>k = 8/0.04.</li>
    <li>k = 200 N/m.</li>
  </ol>
  <p><strong>Answer: 200 N/m.</strong></p>
  <p>Hooke's law does not apply indefinitely. Beyond the limit of proportionality, extension is no longer directly proportional to force.</p>`,
  [
    {
      q: "State Hooke's law.",
      hint: "Describe the relationship between applied force and extension.",
      steps: ["Identify the two quantities: force and extension.", "State their relationship.", "Include the condition under which it holds."],
      ans: "Extension is directly proportional to applied force, provided the limit of proportionality is not exceeded.",
      final_check: "The condition is essential to the law.",
      common_mistakes: ["Saying extension is always proportional to force for any load."],
      explanation: "Hooke's law applies only while the force-extension relationship remains proportional."
    },
    {
      q: "A spring has a spring constant of 100 N/m. Find the force required to extend it by 0.03 m within its proportional range.",
      hint: "Use F = kx.",
      formula: "F = kx",
      steps: ["F = 100 × 0.03.", "F = 3 N."],
      ans: "3 N",
      final_check: "The extension must be in metres.",
      common_mistakes: ["Dividing k by extension."],
      explanation: "F = 100 N/m × 0.03 m = 3 N."
    },
    {
      q: "A force of 12 N produces an extension of 0.06 m. Calculate the spring constant.",
      hint: "Rearrange F = kx to make k the subject.",
      formula: "k = F/x",
      steps: ["k = 12/0.06.", "k = 200 N/m."],
      ans: "200 N/m",
      final_check: "Spring constant is measured in N/m.",
      common_mistakes: ["Giving the answer in newtons instead of N/m."],
      explanation: "12 ÷ 0.06 = 200 N/m."
    },
    {
      q: "A spring extends by 0.02 m under a force of 4 N. Assuming Hooke's law applies, what extension would a force of 10 N produce?",
      hint: "Extension is proportional to force, so compare the force ratio.",
      formula: "F₁/x₁ = F₂/x₂",
      steps: ["Force ratio = 10/4 = 2.5.", "New extension = 0.02 × 2.5.", "New extension = 0.05 m."],
      ans: "0.05 m",
      final_check: "Assume the spring remains within its proportional range.",
      common_mistakes: ["Adding the force increase directly to the extension."],
      explanation: "The force increases by a factor of 2.5, so the extension also increases by that factor."
    },
    {
      q: "What happens to the direct proportional relationship in Hooke's law when the limit of proportionality is exceeded?",
      hint: "Consider whether a graph of force against extension remains a straight line through the origin.",
      steps: ["Hooke's law requires direct proportionality.", "Beyond the limit of proportionality, that relationship no longer holds.", "Extension is no longer directly proportional to force."],
      ans: "Extension is no longer directly proportional to force.",
      final_check: "This does not necessarily mean the material has already broken.",
      common_mistakes: ["Confusing the limit of proportionality with the breaking point."],
      explanation: "The material may continue to extend, but force and extension no longer follow Hooke's law."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Spring Constant",
  `<h2>Spring Constant</h2>
  <p>The spring constant, k, measures the force needed per unit extension of a spring while it obeys Hooke's law.</p>
  <p><strong>k = F/x</strong></p>
  <p>Its SI unit is the newton per metre (N/m).</p>
  <p>A larger spring constant means a stiffer spring: more force is required to produce the same extension.</p>
  <h3>Worked example</h3>
  <p>A force of 15 N produces an extension of 0.05 m.</p>
  <ol>
    <li>k = F/x.</li>
    <li>k = 15/0.05.</li>
    <li>k = 300 N/m.</li>
  </ol>
  <p><strong>Answer: 300 N/m.</strong></p>
  <p>Compare spring constants using the same units and within the range where the springs obey Hooke's law.</p>`,
  [
    {
      q: "A spring extends by 0.04 m when a force of 8 N is applied. Calculate its spring constant.",
      hint: "Divide force by extension.",
      formula: "k = F/x",
      steps: ["k = 8/0.04.", "k = 200 N/m."],
      ans: "200 N/m",
      final_check: "The extension must be expressed in metres.",
      common_mistakes: ["Using extension divided by force."],
      explanation: "The spring constant is 200 N/m."
    },
    {
      q: "A spring has k = 500 N/m. What force produces an extension of 0.02 m?",
      hint: "Multiply spring constant by extension.",
      formula: "F = kx",
      steps: ["F = 500 × 0.02.", "F = 10 N."],
      ans: "10 N",
      final_check: "N/m multiplied by m gives N.",
      common_mistakes: ["Dividing 500 by 0.02."],
      explanation: "F = 500 N/m × 0.02 m = 10 N."
    },
    {
      q: "Spring A has a spring constant of 100 N/m and spring B has 300 N/m. Which is stiffer?",
      hint: "A stiffer spring has a larger spring constant.",
      steps: ["Compare kA = 100 N/m with kB = 300 N/m.", "300 N/m is larger.", "Spring B is stiffer."],
      ans: "Spring B",
      final_check: "This comparison assumes both springs are being considered in their proportional ranges.",
      common_mistakes: ["Choosing the spring with the smaller spring constant."],
      explanation: "Spring B requires more force for the same extension."
    },
    {
      q: "A spring with k = 250 N/m is stretched by 0.08 m. Find the applied force, assuming Hooke's law applies.",
      hint: "Use F = kx.",
      formula: "F = kx",
      steps: ["F = 250 × 0.08.", "F = 20 N."],
      ans: "20 N",
      final_check: "Use the extension, not the total length.",
      common_mistakes: ["Multiplying by a length that includes the spring's original length."],
      explanation: "The force is 20 N."
    },
    {
      q: "A force of 6 N extends a spring by 3 cm. Calculate its spring constant in N/m.",
      hint: "Convert 3 cm to 0.03 m before dividing.",
      formula: "k = F/x",
      steps: ["Convert 3 cm = 0.03 m.", "k = 6/0.03.", "k = 200 N/m."],
      ans: "200 N/m",
      final_check: "Using centimetres directly would give the wrong SI unit.",
      common_mistakes: ["Calculating 6/3 and reporting 2 N/m."],
      explanation: "k = 6 N ÷ 0.03 m = 200 N/m."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Force–Extension Graphs",
  `<h2>Force–Extension Graphs</h2>
  <p>A force–extension graph shows how the extension of a material changes as the applied force increases.</p>
  <p>For a spring obeying Hooke's law, a graph of force F on the vertical axis against extension x on the horizontal axis is a straight line through the origin.</p>
  <p><strong>Gradient = change in force ÷ change in extension</strong></p>
  <p>For a Hookean spring, this gradient equals the spring constant k.</p>
  <h3>Worked example</h3>
  <p>Force increases from 2 N to 10 N while extension increases from 0.01 m to 0.05 m.</p>
  <ol>
    <li>Change in force = 10 − 2 = 8 N.</li>
    <li>Change in extension = 0.05 − 0.01 = 0.04 m.</li>
    <li>Gradient = 8/0.04 = 200 N/m.</li>
  </ol>
  <p><strong>Answer: 200 N/m.</strong></p>
  <p>Always check which quantity is plotted on each axis before calculating the gradient.</p>`,
  [
    {
      q: "On a graph with force on the vertical axis and extension on the horizontal axis, what does the gradient represent for a Hookean spring?",
      hint: "Gradient is vertical change divided by horizontal change.",
      formula: "Gradient = change in force/change in extension",
      steps: ["Vertical axis represents force.", "Horizontal axis represents extension.", "Gradient is force divided by extension, which equals k."],
      ans: "The spring constant",
      final_check: "The unit is N/m.",
      common_mistakes: ["Using extension divided by force for this axis arrangement."],
      explanation: "The gradient of a force-against-extension graph is k for a spring obeying Hooke's law."
    },
    {
      q: "A force–extension graph passes through the origin and is a straight line. What does this show about the spring over the measured range?",
      hint: "Think about direct proportionality.",
      steps: ["A straight line through the origin indicates proportionality.", "Force is directly proportional to extension.", "The spring obeys Hooke's law over that range."],
      ans: "Force is directly proportional to extension over the measured range.",
      final_check: "This conclusion applies to the measured range only.",
      common_mistakes: ["Assuming Hooke's law holds at every possible force."],
      explanation: "A straight line through the origin indicates a constant force-to-extension ratio."
    },
    {
      q: "On a force–extension graph, force changes from 4 N to 12 N while extension changes from 0.02 m to 0.06 m. Calculate the gradient.",
      hint: "Use changes in force and extension, not just one endpoint.",
      formula: "Gradient = ΔF/Δx",
      steps: ["ΔF = 12 − 4 = 8 N.", "Δx = 0.06 − 0.02 = 0.04 m.", "Gradient = 8/0.04 = 200 N/m."],
      ans: "200 N/m",
      final_check: "The units are N/m.",
      common_mistakes: ["Using 12/0.06 without considering the given changes."],
      explanation: "The gradient is 8 N divided by 0.04 m, giving 200 N/m."
    },
    {
      q: "Two force–extension graphs are straight lines through the origin. Spring A has a steeper gradient than spring B. Which spring has the larger spring constant?",
      hint: "For force on the vertical axis, gradient equals k.",
      steps: ["The gradient of each graph equals its spring constant.", "A's gradient is steeper.", "Spring A has the larger k."],
      ans: "Spring A",
      final_check: "Both graphs must use the same axis scales and variable arrangement for a direct visual comparison.",
      common_mistakes: ["Claiming the less steep line represents the stiffer spring."],
      explanation: "A larger gradient means a larger spring constant and a stiffer spring."
    },
    {
      q: "A graph has extension on the vertical axis and force on the horizontal axis. What does its gradient represent?",
      hint: "Reverse the usual axis arrangement.",
      formula: "Gradient = change in extension/change in force",
      steps: ["Vertical axis is extension.", "Horizontal axis is force.", "Gradient = extension/force = 1/k for a Hookean spring."],
      ans: "The reciprocal of the spring constant, 1/k.",
      final_check: "The unit is m/N.",
      common_mistakes: ["Saying the gradient is k regardless of the axes."],
      explanation: "Changing the axes reverses the ratio, so the gradient becomes 1/k."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Limit of Proportionality",
  `<h2>Limit of Proportionality</h2>
  <p>The limit of proportionality is the point beyond which extension is no longer directly proportional to the applied force.</p>
  <p>Before this limit, a force–extension graph for a Hookean spring is a straight line through the origin. Beyond it, the graph no longer follows that straight-line relationship.</p>
  <p>The limit of proportionality is not necessarily the same as the elastic limit.</p>
  <ul>
    <li><strong>Limit of proportionality:</strong> direct proportionality between force and extension ends.</li>
    <li><strong>Elastic limit:</strong> the material can no longer fully recover its original dimensions after the force is removed.</li>
  </ul>
  <p>A material may stop obeying Hooke's law but still recover its original shape when unloaded.</p>`,
  [
    {
      q: "What is the limit of proportionality?",
      hint: "It marks the end of the direct force–extension relationship.",
      steps: ["Before the limit, force is proportional to extension.", "At and beyond the limit, that proportional relationship ceases to hold."],
      ans: "The point beyond which extension is no longer directly proportional to applied force.",
      final_check: "It does not automatically mean the material has permanently deformed.",
      common_mistakes: ["Defining it as the point where a material breaks."],
      explanation: "The limit of proportionality marks the end of Hooke's law behaviour."
    },
    {
      q: "A spring's force–extension graph stops being a straight line. What does this indicate about Hooke's law?",
      hint: "Hooke's law predicts direct proportionality.",
      steps: ["A straight line through the origin represents proportionality.", "The graph curves away from that line.", "Force is no longer directly proportional to extension."],
      ans: "The spring has passed the limit of proportionality.",
      final_check: "The spring may still be elastic beyond this point.",
      common_mistakes: ["Assuming it must already have broken."],
      explanation: "A curved force–extension graph indicates that the force-to-extension ratio is no longer constant."
    },
    {
      q: "Is the limit of proportionality necessarily the same as the elastic limit?",
      hint: "One concerns proportionality; the other concerns recovery.",
      steps: ["The limit of proportionality concerns the force–extension relationship.", "The elastic limit concerns whether original dimensions are recovered.", "These describe different properties."],
      ans: "No. They are different limits and are not necessarily at the same point.",
      final_check: "Do not use the terms interchangeably.",
      common_mistakes: ["Treating both limits as the breaking point."],
      explanation: "A material may stop obeying Hooke's law before it loses the ability to recover fully."
    },
    {
      q: "A material is stretched beyond its limit of proportionality but returns to its original length when unloaded. Is this possible?",
      hint: "Consider whether non-proportional behaviour always causes permanent deformation.",
      steps: ["Beyond the limit of proportionality, force and extension are no longer proportional.", "The material may still be within its elastic limit.", "It can therefore recover when unloaded."],
      ans: "Yes. It can be non-proportional but still elastic.",
      final_check: "The material must remain within its elastic limit.",
      common_mistakes: ["Assuming that any curved graph means permanent deformation."],
      explanation: "The loss of direct proportionality does not by itself mean the material has been permanently deformed."
    },
    {
      q: "What does a straight-line force–extension graph through the origin indicate before the limit of proportionality?",
      hint: "Identify the relationship between force and extension.",
      steps: ["The gradient is constant.", "The ratio of force to extension is constant.", "Force is directly proportional to extension."],
      ans: "Force is directly proportional to extension.",
      final_check: "This is the Hooke's law region.",
      common_mistakes: ["Saying force is inversely proportional to extension."],
      explanation: "A constant gradient through the origin shows direct proportionality."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Elastic and Plastic Deformation",
  `<h2>Elastic and Plastic Deformation</h2>
  <p>Deformation is a change in an object's shape or dimensions caused by a force.</p>
  <p><strong>Elastic deformation:</strong> the object returns to its original dimensions when the force is removed.</p>
  <p><strong>Plastic deformation:</strong> some change remains after the force is removed.</p>
  <h3>Examples</h3>
  <ul>
    <li>A spring stretched within its elastic range shows elastic deformation.</li>
    <li>A metal wire that remains longer after being stretched beyond its elastic limit shows plastic deformation.</li>
    <li>If a material is overloaded, it may eventually fracture.</li>
  </ul>
  <p>Plastic deformation is not the same as breaking. A material can undergo permanent deformation without separating into pieces.</p>`,
  [
    {
      q: "What is elastic deformation?",
      hint: "Consider what happens when the force is removed.",
      steps: ["The force changes the object's dimensions.", "The force is removed.", "The object returns to its original dimensions."],
      ans: "A change in shape or dimensions that is recovered when the force is removed.",
      final_check: "Recovery occurs within the material's elastic range.",
      common_mistakes: ["Defining elastic deformation as a permanent change."],
      explanation: "Elastic deformation is recoverable deformation."
    },
    {
      q: "What is plastic deformation?",
      hint: "Check whether the object fully recovers after unloading.",
      steps: ["A force changes the object's dimensions.", "The force is removed.", "Some deformation remains."],
      ans: "Deformation that leaves a permanent change after the force is removed.",
      final_check: "Plastic deformation does not necessarily mean the object has broken.",
      common_mistakes: ["Confusing permanent deformation with fracture."],
      explanation: "Plastic deformation is not fully recovered after the load is removed."
    },
    {
      q: "A wire is stretched and remains longer after the load is removed. What kind of deformation has occurred?",
      hint: "The wire has not returned to its original length.",
      steps: ["The load is removed.", "The wire remains longer.", "The deformation is permanent."],
      ans: "Plastic deformation",
      final_check: "Some elastic recovery may also have occurred.",
      common_mistakes: ["Calling all stretching elastic."],
      explanation: "The remaining increase in length indicates plastic deformation."
    },
    {
      q: "A spring returns to its original length after a small load is removed. What kind of deformation did it undergo?",
      hint: "The spring fully recovered.",
      steps: ["The spring was stretched.", "The load was removed.", "The spring returned to its original length."],
      ans: "Elastic deformation",
      final_check: "The spring remained within its elastic range.",
      common_mistakes: ["Calling the deformation plastic because the spring's length changed temporarily."],
      explanation: "The spring fully recovered its original length."
    },
    {
      q: "A metal object is permanently bent but remains in one piece. Which statement is correct?",
      hint: "Distinguish permanent shape change from breaking.",
      steps: ["The object has not returned to its original shape.", "The change remains after the force is removed.", "The object has undergone plastic deformation but has not necessarily fractured."],
      ans: "It has undergone plastic deformation without necessarily breaking.",
      final_check: "Fracture means the material cracks or separates.",
      common_mistakes: ["Assuming every permanent bend is a fracture."],
      explanation: "Permanent deformation and fracture are different forms of material behaviour."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Stress",
  `<h2>Stress</h2>
  <p>Stress is the force acting per unit cross-sectional area inside a material under load. For a uniform tensile or compressive force acting normally on a cross-section:</p>
  <p><strong>Stress = force ÷ cross-sectional area</strong></p>
  <p><strong>σ = F/A</strong></p>
  <ul>
    <li>σ = stress in pascals (Pa)</li>
    <li>F = force in newtons (N)</li>
    <li>A = cross-sectional area in square metres (m²)</li>
  </ul>
  <p>Stress describes how concentrated the force is within the material. One pascal equals one newton per square metre.</p>
  <h3>Worked example</h3>
  <p>A wire carries a tensile force of 200 N and has a cross-sectional area of 0.001 m².</p>
  <ol>
    <li>σ = F/A.</li>
    <li>σ = 200/0.001.</li>
    <li>σ = 200,000 Pa.</li>
  </ol>
  <p><strong>Answer: 200,000 Pa.</strong></p>`,
  [
    {
      q: "A force of 100 N acts on a cross-sectional area of 0.005 m². Calculate the stress.",
      hint: "Divide force by cross-sectional area.",
      formula: "σ = F/A",
      steps: ["σ = 100/0.005.", "σ = 20,000 Pa."],
      ans: "20,000 Pa",
      final_check: "Area must be in square metres.",
      common_mistakes: ["Multiplying force by area."],
      explanation: "Stress = 100 N ÷ 0.005 m² = 20,000 Pa."
    },
    {
      q: "A wire experiences a stress of 50,000 Pa across an area of 0.002 m². Calculate the force.",
      hint: "Rearrange stress = force ÷ area.",
      formula: "F = σA",
      steps: ["F = 50,000 × 0.002.", "F = 100 N."],
      ans: "100 N",
      final_check: "Pa multiplied by m² gives N.",
      common_mistakes: ["Dividing stress by area."],
      explanation: "F = 50,000 Pa × 0.002 m² = 100 N."
    },
    {
      q: "A force of 300 N produces a stress of 150,000 Pa. Find the cross-sectional area.",
      hint: "Rearrange σ = F/A to make A the subject.",
      formula: "A = F/σ",
      steps: ["A = 300/150,000.", "A = 0.002 m²."],
      ans: "0.002 m²",
      final_check: "The area is expressed in square metres.",
      common_mistakes: ["Multiplying the force by the stress."],
      explanation: "A = 300 N ÷ 150,000 Pa = 0.002 m²."
    },
    {
      q: "The same tensile force acts on two wires. Wire A has half the cross-sectional area of wire B. How does stress in A compare with stress in B?",
      hint: "Stress is inversely proportional to area for a constant force.",
      formula: "σ = F/A",
      steps: ["The force is the same in both wires.", "Wire A has half the area.", "Its stress is twice the stress in wire B."],
      ans: "Stress in wire A is twice that in wire B.",
      final_check: "Assume the same force acts normally on both cross-sections.",
      common_mistakes: ["Claiming the smaller wire has lower stress."],
      explanation: "The same force concentrated over half the area produces twice the stress."
    },
    {
      q: "A tensile force of 2,000 N acts on a wire of cross-sectional area 4 × 10⁻⁴ m². Calculate the stress.",
      hint: "Divide 2,000 by 0.0004.",
      formula: "σ = F/A",
      steps: ["σ = 2,000/(4 × 10⁻⁴).", "σ = 5,000,000 Pa.", "σ = 5 × 10⁶ Pa."],
      ans: "5 × 10⁶ Pa",
      final_check: "A very small area can produce a large stress.",
      common_mistakes: ["Reading 4 × 10⁻⁴ as 0.004."],
      explanation: "2,000 ÷ 0.0004 = 5,000,000 Pa."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Strain",
  `<h2>Strain</h2>
  <p>Strain measures the fractional change in length of a material when a force deforms it.</p>
  <p><strong>Strain = extension ÷ original length</strong></p>
  <p><strong>ε = x/L</strong></p>
  <ul>
    <li>ε = strain</li>
    <li>x = extension in metres</li>
    <li>L = original length in metres</li>
  </ul>
  <p>Strain has no unit because it is a ratio of two lengths measured in the same unit.</p>
  <h3>Worked example</h3>
  <p>A wire of original length 2 m extends by 0.004 m.</p>
  <ol>
    <li>Strain = extension ÷ original length.</li>
    <li>Strain = 0.004/2.</li>
    <li>Strain = 0.002.</li>
  </ol>
  <p><strong>Answer: 0.002, with no unit.</strong></p>`,
  [
    {
      q: "A wire of original length 2 m extends by 0.01 m. Calculate its strain.",
      hint: "Divide extension by original length.",
      formula: "ε = x/L",
      steps: ["ε = 0.01/2.", "ε = 0.005."],
      ans: "0.005",
      final_check: "Strain has no unit.",
      common_mistakes: ["Dividing original length by extension."],
      explanation: "Strain = 0.01 m ÷ 2 m = 0.005."
    },
    {
      q: "A wire is 0.5 m long and has a strain of 0.004. Find its extension.",
      hint: "Rearrange strain = extension ÷ original length.",
      formula: "Extension = strain × original length",
      steps: ["x = 0.004 × 0.5.", "x = 0.002 m."],
      ans: "0.002 m",
      final_check: "The extension is much smaller than the original length.",
      common_mistakes: ["Dividing the original length by strain."],
      explanation: "x = 0.004 × 0.5 m = 0.002 m."
    },
    {
      q: "A wire of original length 4 m extends by 2 cm. Calculate the strain.",
      hint: "Convert 2 cm to metres before dividing.",
      formula: "ε = x/L",
      steps: ["2 cm = 0.02 m.", "ε = 0.02/4.", "ε = 0.005."],
      ans: "0.005",
      final_check: "Use the same unit for extension and original length.",
      common_mistakes: ["Dividing 2 by 4 while mixing centimetres and metres."],
      explanation: "Strain = 0.02 m ÷ 4 m = 0.005."
    },
    {
      q: "A 1.5 m wire extends by 0.003 m. Find its strain.",
      hint: "Calculate 0.003 divided by 1.5.",
      formula: "ε = x/L",
      steps: ["ε = 0.003/1.5.", "ε = 0.002."],
      ans: "0.002",
      final_check: "Write strain without a unit.",
      common_mistakes: ["Writing the answer in metres."],
      explanation: "Strain is the ratio 0.003/1.5 = 0.002."
    },
    {
      q: "Why does strain have no unit?",
      hint: "Look at the units in the strain formula.",
      steps: ["Strain = extension/original length.", "Both quantities are lengths.", "Their units cancel when divided."],
      ans: "Because it is a ratio of two lengths measured in the same unit, so the units cancel.",
      final_check: "Strain may be expressed as a decimal or percentage, but the basic ratio is dimensionless.",
      common_mistakes: ["Giving strain the unit metre."],
      explanation: "Dividing one length by another length produces a dimensionless ratio."
    }
  ]
);

add(
  "physics",
  "mechanical_properties_of_materials",
  "Young's Modulus",
  `<h2>Young's Modulus</h2>
  <p>Young's modulus measures the stiffness of a material under tensile or compressive stress, within the range where stress is directly proportional to strain.</p>
  <p><strong>Young's modulus = stress ÷ strain</strong></p>
  <p><strong>E = σ/ε</strong></p>
  <p>Stress is measured in pascals (Pa), while strain has no unit. Therefore, Young's modulus is measured in pascals (Pa).</p>
  <h3>Worked example</h3>
  <p>A material experiences stress of 4 × 10⁶ Pa and strain of 0.002.</p>
  <ol>
    <li>E = stress ÷ strain.</li>
    <li>E = (4 × 10⁶)/0.002.</li>
    <li>E = 2 × 10⁹ Pa.</li>
  </ol>
  <p><strong>Answer: 2 × 10⁹ Pa.</strong></p>
  <p>A material with a larger Young's modulus is generally stiffer under comparable conditions: more stress is required to produce the same strain in the proportional region.</p>`,
  [
    {
      q: "A material has stress of 2 × 10⁶ Pa and strain of 0.001. Calculate Young's modulus.",
      hint: "Divide stress by strain.",
      formula: "E = stress/strain",
      steps: ["E = (2 × 10⁶)/0.001.", "E = 2 × 10⁹ Pa."],
      ans: "2 × 10⁹ Pa",
      final_check: "Young's modulus has the same unit as stress because strain is dimensionless.",
      common_mistakes: ["Multiplying stress by strain."],
      explanation: "2 × 10⁶ ÷ 0.001 = 2 × 10⁹ Pa."
    },
    {
      q: "A material has Young's modulus 5 × 10⁹ Pa and strain 0.002. Calculate the stress.",
      hint: "Rearrange E = stress ÷ strain.",
      formula: "Stress = E × strain",
      steps: ["Stress = 5 × 10⁹ × 0.002.", "Stress = 1 × 10⁷ Pa."],
      ans: "1 × 10⁷ Pa",
      final_check: "The result is measured in pascals.",
      common_mistakes: ["Dividing Young's modulus by strain."],
      explanation: "Stress = 5 × 10⁹ Pa × 0.002 = 1 × 10⁷ Pa."
    },
    {
      q: "A material has stress of 9 × 10⁶ Pa and Young's modulus of 3 × 10⁹ Pa. Find the strain.",
      hint: "Rearrange E = stress ÷ strain.",
      formula: "Strain = stress/Young's modulus",
      steps: ["Strain = (9 × 10⁶)/(3 × 10⁹).", "Strain = 3 × 10⁻³.", "Strain = 0.003."],
      ans: "0.003",
      final_check: "Strain has no unit.",
      common_mistakes: ["Reversing stress and Young's modulus."],
      explanation: "9 × 10⁶ ÷ 3 × 10⁹ = 0.003."
    },
    {
      q: "Material A has Young's modulus 2 × 10¹¹ Pa, while material B has 7 × 10¹⁰ Pa. Which is stiffer in the proportional region?",
      hint: "Compare their Young's moduli.",
      steps: ["A has E = 2 × 10¹¹ Pa.", "B has E = 7 × 10¹⁰ Pa.", "A has the greater Young's modulus."],
      ans: "Material A",
      final_check: "This compares stiffness under the same type of loading and within the proportional region.",
      common_mistakes: ["Choosing the smaller Young's modulus as the stiffer material."],
      explanation: "A larger Young's modulus means more stress is needed to produce the same strain."
    },
    {
      q: "Why is Young's modulus calculated only in the range where stress is directly proportional to strain?",
      hint: "Consider the meaning of a constant ratio.",
      steps: ["Young's modulus is stress divided by strain.", "In the proportional region, the ratio is constant.", "Outside that region, the ratio may change with the applied load."],
      ans: "Because the stress-to-strain ratio is constant in the proportional region, giving a consistent value of Young's modulus.",
      final_check: "The definition and interpretation depend on the material's behaviour under the stated conditions.",
      common_mistakes: ["Assuming stress and strain remain proportional at any load."],
      explanation: "A constant stress-to-strain ratio defines the linear elastic behaviour used to determine Young's modulus."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Temperature",
  `<h2>Temperature</h2>
  <p>Temperature is a measure of how hot or cold an object is. At the particle level, the Kelvin temperature of a substance is related to the average kinetic energy of its particles in random motion.</p>
  <p>Temperature is measured in degrees Celsius (°C) or kelvin (K).</p>
  <p><strong>Temperature conversion:</strong> T(K) = t(°C) + 273.15</p>
  <p>For many school calculations, 273 is used as an approximation.</p>
  <h3>Worked example</h3>
  <p>Convert 27°C to kelvin.</p>
  <ol>
    <li>T = 27 + 273.15.</li>
    <li>T = 300.15 K.</li>
  </ol>
  <p><strong>Answer: 300.15 K, approximately 300 K.</strong></p>
  <p>Temperature is different from heat: temperature describes thermal state, while heat is energy transferred because of a temperature difference.</p>`,
  [
    {
      q: "Convert 25°C to kelvin using 273 as the approximation.",
      hint: "Add 273 to the Celsius temperature.",
      formula: "T(K) = t(°C) + 273",
      steps: ["T = 25 + 273.", "T = 298 K."],
      ans: "298 K",
      final_check: "Kelvin is written as K, not °K.",
      common_mistakes: ["Subtracting 273 when converting Celsius to kelvin."],
      explanation: "25°C is approximately 298 K."
    },
    {
      q: "Convert 310 K to degrees Celsius using 273 as the approximation.",
      hint: "Reverse the conversion by subtracting 273.",
      formula: "t(°C) = T(K) − 273",
      steps: ["t = 310 − 273.", "t = 37°C."],
      ans: "37°C",
      final_check: "The answer is expressed in degrees Celsius.",
      common_mistakes: ["Adding 273 instead of subtracting it."],
      explanation: "310 K is approximately 37°C."
    },
    {
      q: "What is the SI unit of thermodynamic temperature?",
      hint: "It is not the degree Celsius.",
      steps: ["Identify the SI base unit for temperature.", "The unit is the kelvin."],
      ans: "Kelvin (K)",
      final_check: "Write K without a degree symbol.",
      common_mistakes: ["Writing °K."],
      explanation: "The kelvin is the SI base unit of thermodynamic temperature."
    },
    {
      q: "Explain the difference between temperature and heat.",
      hint: "One describes a state; the other is energy being transferred.",
      steps: ["Temperature describes how hot or cold something is.", "Heat is energy transferred due to a temperature difference."],
      ans: "Temperature describes the thermal state of an object, while heat is energy transferred because of a temperature difference.",
      final_check: "Heat is energy in transfer, not simply a substance stored inside an object.",
      common_mistakes: ["Treating heat and temperature as interchangeable quantities."],
      explanation: "An object has a temperature; heat describes energy transfer between objects or systems."
    },
    {
      q: "A classroom is at 20°C. Express this temperature in kelvin using the more precise conversion.",
      hint: "Add 273.15.",
      formula: "T(K) = t(°C) + 273.15",
      steps: ["T = 20 + 273.15.", "T = 293.15 K."],
      ans: "293.15 K",
      final_check: "The kelvin temperature is higher numerically than the Celsius temperature.",
      common_mistakes: ["Writing 293.15°C."],
      explanation: "20°C corresponds to 293.15 K."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Thermal Expansion",
  `<h2>Thermal Expansion</h2>
  <p>Thermal expansion is the increase in a material's dimensions when its temperature rises, usually because its particles vibrate more strongly or move farther apart on average.</p>
  <p>Solids can expand in length, area and volume. Liquids and gases also expand when heated under suitable conditions.</p>
  <h3>Examples</h3>
  <ul>
    <li>Bridges use expansion joints to accommodate temperature changes.</li>
    <li>Gaps are left between some railway rails or track sections to manage expansion.</li>
    <li>Overhead wires may sag more in hot weather because their length increases.</li>
  </ul>
  <p>When a material cools, it generally contracts. Different materials expand by different amounts for the same temperature rise.</p>`,
  [
    {
      q: "What is thermal expansion?",
      hint: "Think about what usually happens to a material's dimensions when heated.",
      steps: ["Heating changes particle motion and spacing.", "The material's dimensions generally increase.", "This is thermal expansion."],
      ans: "The increase in a material's dimensions when its temperature rises.",
      final_check: "The amount of expansion depends on the material and temperature change.",
      common_mistakes: ["Saying every material expands by exactly the same amount."],
      explanation: "Most materials expand when heated and contract when cooled."
    },
    {
      q: "Why are expansion joints provided in many bridges?",
      hint: "Consider what happens to bridge materials on hot days.",
      steps: ["Bridge materials heat up and expand.", "Without room for expansion, large stresses can develop.", "Joints allow the structure to accommodate dimensional changes."],
      ans: "To allow thermal expansion and contraction while reducing damaging stresses.",
      final_check: "The joints accommodate movement rather than prevent expansion.",
      common_mistakes: ["Claiming the joints stop the bridge from heating up."],
      explanation: "Expansion joints provide space for temperature-related changes in length."
    },
    {
      q: "What generally happens to the length of a metal rod when it is cooled?",
      hint: "Cooling is usually the reverse of thermal expansion.",
      steps: ["The rod loses thermal energy.", "Its temperature decreases.", "Its length generally decreases."],
      ans: "It contracts and becomes shorter.",
      final_check: "This describes ordinary behaviour over a suitable temperature range.",
      common_mistakes: ["Saying cooling causes expansion in ordinary circumstances."],
      explanation: "Most solids contract as their temperature decreases."
    },
    {
      q: "Two rods of equal original length receive the same temperature rise. Must they expand by equal amounts?",
      hint: "Consider whether different materials have identical expansion properties.",
      steps: ["Expansion depends on the material's properties.", "Different materials can have different expansion coefficients.", "Their expansions need not be equal."],
      ans: "No. They may expand by different amounts because their materials differ.",
      final_check: "Equal initial lengths and temperature changes do not guarantee equal expansion.",
      common_mistakes: ["Assuming all solids expand equally."],
      explanation: "The coefficient of expansion varies between materials."
    },
    {
      q: "Why can an overhead metal wire sag more on a hot day?",
      hint: "Relate the temperature rise to the wire's length.",
      steps: ["The wire becomes warmer.", "The wire expands and its length increases.", "With its supports fixed, the extra length can increase sag."],
      ans: "The wire expands when heated, increasing its length and allowing it to sag more.",
      final_check: "The supports and arrangement of the wire affect the amount of sag.",
      common_mistakes: ["Saying the wire sags because its mass increases."],
      explanation: "Thermal expansion increases the length of the wire."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Linear Expansion of Solids",
  `<h2>Linear Expansion of Solids</h2>
  <p>Linear expansion is the change in length of a solid when its temperature changes.</p>
  <p>For a solid that expands uniformly over a suitable temperature range:</p>
  <p><strong>ΔL = αL₀ΔT</strong></p>
  <ul>
    <li>ΔL = change in length, in metres (m)</li>
    <li>α = coefficient of linear expansion, in K⁻¹ or °C⁻¹</li>
    <li>L₀ = original length, in metres (m)</li>
    <li>ΔT = temperature change, in K or °C</li>
  </ul>
  <h3>Worked example</h3>
  <p>A 2 m rod has α = 1.2 × 10⁻⁵ K⁻¹ and is heated by 50 K.</p>
  <ol>
    <li>ΔL = αL₀ΔT.</li>
    <li>ΔL = (1.2 × 10⁻⁵) × 2 × 50.</li>
    <li>ΔL = 0.0012 m = 1.2 mm.</li>
  </ol>
  <p><strong>Answer: 1.2 mm.</strong></p>`,
  [
    {
      q: "A 3 m rod has a linear expansion coefficient of 1 × 10⁻⁵ K⁻¹. Its temperature rises by 20 K. Calculate its increase in length.",
      hint: "Use ΔL = αL₀ΔT.",
      formula: "ΔL = αL₀ΔT",
      steps: ["ΔL = (1 × 10⁻⁵) × 3 × 20.", "ΔL = 0.0006 m.", "Convert: 0.0006 m = 0.6 mm."],
      ans: "0.0006 m or 0.6 mm",
      final_check: "The increase in length is much smaller than the original length.",
      common_mistakes: ["Forgetting the power of ten in the coefficient."],
      explanation: "Substitution gives a length increase of 6 × 10⁻⁴ m."
    },
    {
      q: "A 5 m metal rod expands by 0.002 m when heated by 40 K. Calculate its coefficient of linear expansion.",
      hint: "Rearrange the equation to make α the subject.",
      formula: "α = ΔL/(L₀ΔT)",
      steps: ["α = 0.002/(5 × 40).", "α = 0.002/200.", "α = 1 × 10⁻⁵ K⁻¹."],
      ans: "1 × 10⁻⁵ K⁻¹",
      final_check: "The coefficient has units of inverse temperature.",
      common_mistakes: ["Multiplying by original length and temperature change instead of dividing."],
      explanation: "The coefficient is 0.002 ÷ 200 = 0.00001 K⁻¹."
    },
    {
      q: "A rod is 4 m long. Its coefficient of linear expansion is 2 × 10⁻⁵ K⁻¹. Find its length increase for a 25 K temperature rise.",
      hint: "Multiply the coefficient, original length and temperature change.",
      formula: "ΔL = αL₀ΔT",
      steps: ["ΔL = (2 × 10⁻⁵) × 4 × 25.", "ΔL = 0.002 m.", "0.002 m = 2 mm."],
      ans: "0.002 m or 2 mm",
      final_check: "Use the original length, not the final length.",
      common_mistakes: ["Reporting 0.02 m."],
      explanation: "The rod length increases by 2 mm."
    },
    {
      q: "A rod's temperature rises from 15°C to 65°C. What temperature change should be used in the linear expansion equation?",
      hint: "Subtract the initial temperature from the final temperature.",
      formula: "ΔT = T₂ − T₁",
      steps: ["ΔT = 65 − 15.", "ΔT = 50°C, equivalent to a 50 K temperature change."],
      ans: "50°C or 50 K",
      final_check: "A temperature difference has the same numerical value in Celsius and kelvin.",
      common_mistakes: ["Adding the two temperatures."],
      explanation: "The temperature rises by 50 degrees."
    },
    {
      q: "Two rods have equal original lengths and the same temperature rise. Rod A has twice the coefficient of linear expansion of rod B. Compare their length increases.",
      hint: "In ΔL = αL₀ΔT, only α differs.",
      formula: "ΔL = αL₀ΔT",
      steps: ["Both rods have equal L₀.", "Both have equal ΔT.", "Rod A has twice α, so it has twice the expansion."],
      ans: "Rod A expands by twice as much as rod B.",
      final_check: "Assume the linear expansion model applies to both rods.",
      common_mistakes: ["Claiming both rods expand equally because their lengths match."],
      explanation: "Expansion is directly proportional to the coefficient when initial length and temperature change are fixed."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Heat Capacity",
  `<h2>Heat Capacity</h2>
  <p>Heat capacity is the energy required to raise the temperature of an entire object by one kelvin.</p>
  <p><strong>C = Q/ΔT</strong></p>
  <ul>
    <li>C = heat capacity, in J/K</li>
    <li>Q = energy transferred as heat, in joules (J)</li>
    <li>ΔT = temperature change, in K</li>
  </ul>
  <p>Heat capacity depends on the object's material and its mass. A large object made from a given material generally has a greater heat capacity than a smaller object made from the same material.</p>
  <h3>Worked example</h3>
  <p>An object absorbs 6,000 J and its temperature rises by 20 K.</p>
  <ol>
    <li>C = Q/ΔT.</li>
    <li>C = 6,000/20.</li>
    <li>C = 300 J/K.</li>
  </ol>
  <p><strong>Answer: 300 J/K.</strong></p>`,
  [
    {
      q: "An object absorbs 2,400 J and its temperature rises by 12 K. Calculate its heat capacity.",
      hint: "Divide energy transferred by temperature change.",
      formula: "C = Q/ΔT",
      steps: ["C = 2,400/12.", "C = 200 J/K."],
      ans: "200 J/K",
      final_check: "Heat capacity is measured in joules per kelvin.",
      common_mistakes: ["Multiplying energy by temperature change."],
      explanation: "2,400 J ÷ 12 K = 200 J/K."
    },
    {
      q: "An object has heat capacity 500 J/K. How much energy is required to raise its temperature by 8 K?",
      hint: "Rearrange C = Q/ΔT.",
      formula: "Q = CΔT",
      steps: ["Q = 500 × 8.", "Q = 4,000 J."],
      ans: "4,000 J",
      final_check: "J/K multiplied by K gives J.",
      common_mistakes: ["Dividing heat capacity by temperature change."],
      explanation: "The required energy is 4,000 J."
    },
    {
      q: "An object receives 9,000 J and has a heat capacity of 300 J/K. Find its temperature rise.",
      hint: "Rearrange the equation to make ΔT the subject.",
      formula: "ΔT = Q/C",
      steps: ["ΔT = 9,000/300.", "ΔT = 30 K."],
      ans: "30 K",
      final_check: "This is a temperature change, not an absolute temperature.",
      common_mistakes: ["Giving the answer in joules."],
      explanation: "9,000 J ÷ 300 J/K = 30 K."
    },
    {
      q: "Which requires more energy for the same temperature rise: an object with heat capacity 100 J/K or one with heat capacity 400 J/K?",
      hint: "For a fixed temperature rise, energy equals heat capacity multiplied by the rise.",
      formula: "Q = CΔT",
      steps: ["Both objects have the same ΔT.", "The second object's heat capacity is four times greater.", "It needs four times as much energy for that rise."],
      ans: "The object with heat capacity 400 J/K.",
      final_check: "Assume comparable conditions and the stated heat capacities remain applicable.",
      common_mistakes: ["Choosing the smaller heat capacity."],
      explanation: "At equal temperature change, energy transferred is proportional to heat capacity."
    },
    {
      q: "What is the SI unit of heat capacity?",
      hint: "Heat capacity is energy divided by temperature change.",
      steps: ["Energy is measured in joules.", "Temperature change is measured in kelvin.", "The unit is J/K."],
      ans: "J/K",
      final_check: "This is different from specific heat capacity, measured in J/(kg·K).",
      common_mistakes: ["Giving the unit J/(kg·K), which is for specific heat capacity."],
      explanation: "Heat capacity applies to the entire object; specific heat capacity applies per unit mass."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Specific Heat Capacity",
  `<h2>Specific Heat Capacity</h2>
  <p>Specific heat capacity is the energy required to raise the temperature of 1 kg of a substance by 1 K, without a change of state.</p>
  <p><strong>Q = mcΔT</strong></p>
  <ul>
    <li>Q = energy transferred, in J</li>
    <li>m = mass, in kg</li>
    <li>c = specific heat capacity, in J/(kg·K)</li>
    <li>ΔT = temperature change, in K or °C</li>
  </ul>
  <h3>Worked example</h3>
  <p>Calculate the energy needed to heat 2 kg of water by 10 K, using c = 4,200 J/(kg·K).</p>
  <ol>
    <li>Q = mcΔT.</li>
    <li>Q = 2 × 4,200 × 10.</li>
    <li>Q = 84,000 J.</li>
  </ol>
  <p><strong>Answer: 84,000 J.</strong></p>
  <p>Specific heat capacity is a property of the substance. It is not the same as the heat capacity of an entire object.</p>`,
  [
    {
      q: "Calculate the energy required to heat 0.5 kg of a substance with specific heat capacity 800 J/(kg·K) by 20 K.",
      hint: "Use Q = mcΔT.",
      formula: "Q = mcΔT",
      steps: ["Q = 0.5 × 800 × 20.", "Q = 8,000 J."],
      ans: "8,000 J",
      final_check: "Use mass in kilograms.",
      common_mistakes: ["Using 50 instead of 0.5 kg."],
      explanation: "The energy required is 8,000 J."
    },
    {
      q: "A 2 kg object absorbs 12,000 J and its temperature rises by 10 K. Calculate its specific heat capacity.",
      hint: "Rearrange Q = mcΔT.",
      formula: "c = Q/(mΔT)",
      steps: ["c = 12,000/(2 × 10).", "c = 12,000/20.", "c = 600 J/(kg·K)."],
      ans: "600 J/(kg·K)",
      final_check: "Specific heat capacity includes a per-kilogram unit.",
      common_mistakes: ["Dividing by mass but forgetting the temperature change."],
      explanation: "12,000 ÷ 20 = 600 J/(kg·K)."
    },
    {
      q: "How much energy is needed to raise 3 kg of a substance with c = 500 J/(kg·K) by 4 K?",
      hint: "Multiply mass, specific heat capacity and temperature change.",
      formula: "Q = mcΔT",
      steps: ["Q = 3 × 500 × 4.", "Q = 6,000 J."],
      ans: "6,000 J",
      final_check: "The answer is energy, measured in joules.",
      common_mistakes: ["Adding the three values instead of multiplying."],
      explanation: "3 × 500 × 4 = 6,000 J."
    },
    {
      q: "A 1.5 kg sample receives 18,000 J. Its specific heat capacity is 600 J/(kg·K). Find its temperature rise.",
      hint: "Rearrange the equation to make ΔT the subject.",
      formula: "ΔT = Q/(mc)",
      steps: ["ΔT = 18,000/(1.5 × 600).", "ΔT = 18,000/900.", "ΔT = 20 K."],
      ans: "20 K",
      final_check: "The result is a temperature change.",
      common_mistakes: ["Dividing by the mass alone."],
      explanation: "18,000 ÷ 900 = 20 K."
    },
    {
      q: "Two equal masses receive the same energy. Material A has a lower specific heat capacity than material B. Which has the larger temperature rise, assuming no change of state or energy losses?",
      hint: "Rearrange Q = mcΔT to compare the temperature changes.",
      formula: "ΔT = Q/(mc)",
      steps: ["Q and m are equal for both materials.", "Temperature rise is inversely proportional to c.", "Material A has the lower c, so it has the larger temperature rise."],
      ans: "Material A",
      final_check: "The comparison assumes both receive the same energy and remain in the same state.",
      common_mistakes: ["Assuming a larger specific heat capacity produces a larger temperature rise for equal energy."],
      explanation: "A lower specific heat capacity means less energy is needed per kilogram per degree."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Heat Transfer by Conduction",
  `<h2>Heat Transfer by Conduction</h2>
  <p>Conduction is the transfer of thermal energy through a material without the material as a whole moving from place to place.</p>
  <p>In solids, vibrating particles transfer energy to neighbouring particles. In metals, mobile electrons also transfer energy efficiently.</p>
  <h3>Examples</h3>
  <ul>
    <li>A metal spoon becomes warm when one end is placed in hot water.</li>
    <li>A metal cooking pot transfers energy from its hot base to its contents.</li>
  </ul>
  <p>Metals are generally good thermal conductors. Materials such as wood, plastic and trapped air are comparatively poor conductors and are often used as insulators.</p>`,
  [
    {
      q: "What is conduction?",
      hint: "Energy moves through a material without bulk movement of the material.",
      steps: ["Thermal energy passes through a substance.", "The substance does not move as a whole from one place to another.", "This transfer is conduction."],
      ans: "The transfer of thermal energy through a material without bulk movement of the material.",
      final_check: "Conduction can occur in solids and also in stationary fluids.",
      common_mistakes: ["Defining conduction as movement of hot fluid."],
      explanation: "Conduction transfers energy through interactions between particles and, in metals, mobile electrons."
    },
    {
      q: "Why does a metal spoon become hot when one end is left in hot water?",
      hint: "Think about energy travelling through the metal.",
      steps: ["The end in hot water gains thermal energy.", "Energy is transferred through the metal by conduction.", "The handle becomes warmer."],
      ans: "Thermal energy travels through the spoon by conduction.",
      final_check: "The spoon does not need to move as a whole for energy to transfer.",
      common_mistakes: ["Saying the metal itself flows along the spoon."],
      explanation: "Particles and mobile electrons help transfer thermal energy through the metal."
    },
    {
      q: "Why are metal cooking pots usually good at transferring heat?",
      hint: "Consider metals' thermal conductivity.",
      steps: ["Metals generally conduct thermal energy well.", "Energy passes through the pot's metal body.", "The contents can then be heated."],
      ans: "Metals are generally good thermal conductors.",
      final_check: "The handle may use an insulating material to reduce heat transfer to the hand.",
      common_mistakes: ["Claiming all parts of a cooking pot must be metal."],
      explanation: "Metals transfer thermal energy efficiently, in part because of mobile electrons."
    },
    {
      q: "Why is wood often used for the handle of a cooking utensil?",
      hint: "A handle should reduce heat transfer to the user's hand.",
      steps: ["Wood is a relatively poor conductor of heat.", "It transfers thermal energy more slowly than many metals.", "The handle is less likely to become hot quickly."],
      ans: "Wood is a poor thermal conductor, so it reduces heat transfer to the hand.",
      final_check: "A wooden handle can still become hot after prolonged heating.",
      common_mistakes: ["Saying wood cannot become hot."],
      explanation: "Insulating materials slow the transfer of thermal energy."
    },
    {
      q: "What additional mechanism makes metals particularly good thermal conductors compared with many non-metallic solids?",
      hint: "Think about charged particles that can move through a metal.",
      steps: ["Metals contain mobile electrons.", "These electrons carry energy through the material.", "They improve thermal conduction."],
      ans: "Mobile electrons transfer thermal energy efficiently through the metal.",
      final_check: "Particle vibrations also contribute to conduction.",
      common_mistakes: ["Claiming metals conduct heat only through bulk movement."],
      explanation: "Mobile electrons provide an efficient additional mechanism for energy transfer in metals."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Heat Transfer by Convection",
  `<h2>Heat Transfer by Convection</h2>
  <p>Convection is the transfer of thermal energy by the bulk movement of a fluid, such as a liquid or gas.</p>
  <p>When a region of fluid is heated, it often expands and becomes less dense than the surrounding cooler fluid. The warmer fluid rises while cooler, denser fluid moves in to replace it. This circulation can form a convection current.</p>
  <h3>Example: heating water</h3>
  <ol>
    <li>Water near the heat source warms.</li>
    <li>It expands and becomes less dense than nearby cooler water.</li>
    <li>The warmer water rises and cooler water moves down towards the heat source.</li>
    <li>The circulating water transfers thermal energy around the container.</li>
  </ol>
  <p>Convection occurs in fluids, not through bulk circulation of a solid.</p>`,
  [
    {
      q: "What is convection?",
      hint: "Identify the type of matter that moves to carry energy.",
      steps: ["A fluid gains thermal energy.", "The fluid moves in bulk.", "This movement transfers thermal energy."],
      ans: "The transfer of thermal energy by the bulk movement of a fluid.",
      final_check: "Fluids include liquids and gases.",
      common_mistakes: ["Defining convection as energy transfer without any fluid movement."],
      explanation: "Convection carries energy as warmer and cooler fluid regions move."
    },
    {
      q: "Why does warmer water usually rise above cooler water in a heated container?",
      hint: "Consider how heating affects volume and density.",
      steps: ["The water warms and expands.", "Its density decreases relative to the cooler water.", "The warmer, less dense water rises under gravity."],
      ans: "It expands and becomes less dense than the surrounding cooler water.",
      final_check: "This describes ordinary convection in a fluid heated from below.",
      common_mistakes: ["Saying warmer water rises simply because it is lighter in mass for the same volume without explaining density."],
      explanation: "Density differences in a gravitational field drive the circulation."
    },
    {
      q: "What is a convection current?",
      hint: "Think about a repeated circulation of warmer and cooler fluid.",
      steps: ["Warmer fluid rises.", "Cooler fluid moves into the space left behind and may sink.", "The fluid circulates in a continuing pattern."],
      ans: "A circulating movement of fluid caused by temperature-related density differences.",
      final_check: "The current transfers thermal energy through the fluid.",
      common_mistakes: ["Confusing a convection current with conduction through a stationary solid."],
      explanation: "Convection currents form when density differences cause fluid to circulate."
    },
    {
      q: "Can convection transfer thermal energy through a solid metal rod by bulk movement of the metal?",
      hint: "Convection requires a fluid.",
      steps: ["A metal rod is a solid.", "Convection requires bulk movement of a fluid.", "Energy travels through the stationary rod mainly by conduction."],
      ans: "No. Convection requires a fluid; conduction transfers energy through the solid rod.",
      final_check: "A fluid surrounding the rod could still transfer energy by convection.",
      common_mistakes: ["Calling every form of heat transfer convection."],
      explanation: "Convection currents occur in liquids and gases, not within a stationary solid."
    },
    {
      q: "In a room heated by a radiator, why can warm air rise and cooler air move towards the radiator?",
      hint: "Apply the density explanation for air.",
      steps: ["Air near the radiator warms and expands.", "Its density decreases.", "It rises while cooler, denser air moves in to replace it."],
      ans: "Warm, less dense air rises and cooler, denser air moves towards the radiator, creating convection currents.",
      final_check: "This circulation helps distribute thermal energy around the room.",
      common_mistakes: ["Saying warm air rises because heat itself has a direction of travel."],
      explanation: "Density differences drive the movement of air that carries thermal energy."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Heat Transfer by Radiation",
  `<h2>Heat Transfer by Radiation</h2>
  <p>Thermal radiation is the transfer of energy by electromagnetic waves, mainly infrared radiation at everyday temperatures.</p>
  <p>Radiation does not require a material medium, so energy from the Sun can travel through the vacuum of space to Earth.</p>
  <h3>Surface properties</h3>
  <ul>
    <li>Dull, dark surfaces are generally good absorbers and emitters of thermal radiation.</li>
    <li>Shiny, light-coloured surfaces are generally poorer absorbers and emitters, and good reflectors.</li>
  </ul>
  <p>All objects above absolute zero emit thermal radiation. The net energy transfer by radiation depends on the object's temperature relative to its surroundings.</p>`,
  [
    {
      q: "What is thermal radiation?",
      hint: "It transfers energy through electromagnetic waves.",
      steps: ["A warm object emits electromagnetic radiation.", "The radiation carries energy away from the object.", "No material medium is required."],
      ans: "The transfer of thermal energy by electromagnetic waves.",
      final_check: "Infrared radiation is important in everyday thermal transfer.",
      common_mistakes: ["Claiming radiation requires air or another material medium."],
      explanation: "Radiation can transfer energy through a vacuum."
    },
    {
      q: "How does energy from the Sun travel through space to Earth?",
      hint: "Space is nearly a vacuum.",
      steps: ["There is no continuous material medium between the Sun and Earth.", "Electromagnetic waves can travel through a vacuum.", "Solar energy reaches Earth by radiation."],
      ans: "By thermal radiation, carried by electromagnetic waves.",
      final_check: "Conduction and convection cannot carry energy through the vacuum of space in the same way.",
      common_mistakes: ["Saying the energy travels from the Sun to Earth by convection through space."],
      explanation: "Electromagnetic radiation can travel without a material medium."
    },
    {
      q: "Which generally emits thermal radiation more effectively: a dull black surface or a shiny polished surface at the same temperature?",
      hint: "Consider the emissive properties of surface finishes.",
      steps: ["Dull black surfaces are generally good emitters.", "Shiny polished surfaces are generally poorer emitters.", "The dull black surface emits more effectively."],
      ans: "The dull black surface.",
      final_check: "This is a general comparison for otherwise similar surfaces at the same temperature.",
      common_mistakes: ["Assuming shiny surfaces are always the best emitters."],
      explanation: "Dull dark surfaces generally have higher emissivity than shiny polished surfaces."
    },
    {
      q: "Why are the outer surfaces of many vacuum flasks shiny?",
      hint: "The flask is designed to reduce heat transfer.",
      steps: ["Shiny surfaces reflect much thermal radiation.", "They are relatively poor absorbers and emitters.", "They reduce radiative heat transfer."],
      ans: "Shiny surfaces reduce heat transfer by reflecting thermal radiation and emitting less effectively.",
      final_check: "A vacuum also reduces conduction and convection between the flask's walls.",
      common_mistakes: ["Claiming the shiny surface alone prevents all heat transfer."],
      explanation: "Vacuum flasks use several design features to reduce energy transfer by different mechanisms."
    },
    {
      q: "Do objects at room temperature emit thermal radiation?",
      hint: "Consider whether all objects above absolute zero emit radiation.",
      steps: ["Room-temperature objects are above absolute zero.", "Objects above absolute zero emit electromagnetic radiation.", "Therefore, room-temperature objects emit thermal radiation."],
      ans: "Yes. Objects at room temperature emit thermal radiation, mainly infrared.",
      final_check: "The amount and spectrum of radiation depend on temperature and surface properties.",
      common_mistakes: ["Thinking only visibly hot or glowing objects radiate energy."],
      explanation: "Radiation is emitted even when an object is not visibly glowing."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Comparing Conduction, Convection and Radiation",
  `<h2>Comparing Conduction, Convection and Radiation</h2>
  <p>Thermal energy can be transferred by conduction, convection and radiation. Different situations may involve more than one method at the same time.</p>
  <ul>
    <li><strong>Conduction:</strong> energy transfer through interactions within matter; mobile electrons also help in metals.</li>
    <li><strong>Convection:</strong> energy transfer by bulk movement of a liquid or gas.</li>
    <li><strong>Radiation:</strong> energy transfer by electromagnetic waves; a material medium is not required.</li>
  </ul>
  <h3>Worked examples</h3>
  <ul>
    <li>A metal spoon warming from its immersed end: conduction.</li>
    <li>Water circulating as it heats in a pot: convection.</li>
    <li>Energy travelling from the Sun to Earth: radiation.</li>
  </ul>
  <p>In a hot cooking pot, conduction through the metal and convection in the liquid can occur together, while radiation may also transfer energy from hot surfaces.</p>`,
  [
    {
      q: "A metal spoon becomes hot along its handle when one end is placed in hot tea. Which is the main transfer mechanism along the solid spoon?",
      hint: "The metal does not flow from one end to the other.",
      steps: ["The spoon is a solid.", "Thermal energy travels through its material.", "The mechanism is conduction."],
      ans: "Conduction",
      final_check: "Convection can occur in the tea, but not by bulk movement of the spoon.",
      common_mistakes: ["Calling the transfer along the metal convection."],
      explanation: "Conduction transfers energy through the metal spoon."
    },
    {
      q: "Warm water rises and cooler water sinks in a heated container. Which transfer mechanism is involved?",
      hint: "Look for bulk movement of a fluid.",
      steps: ["Water is a liquid.", "Different-density regions move.", "The circulation transfers energy by convection."],
      ans: "Convection",
      final_check: "The fluid's movement is the key feature.",
      common_mistakes: ["Calling the circulation radiation."],
      explanation: "Convection transfers thermal energy through the movement of fluid."
    },
    {
      q: "Which mechanism allows thermal energy from the Sun to cross the vacuum of space?",
      hint: "Which method does not require a material medium?",
      steps: ["Space is nearly a vacuum.", "Radiation travels as electromagnetic waves.", "Solar energy reaches Earth by radiation."],
      ans: "Radiation",
      final_check: "The energy can travel through a vacuum.",
      common_mistakes: ["Choosing conduction or convection."],
      explanation: "Thermal radiation does not require a material medium."
    },
    {
      q: "A pot of water is heated on a stove. Name the main mechanism transferring energy through the metal base and the mechanism circulating energy through the water.",
      hint: "Distinguish transfer through a solid from movement within a liquid.",
      steps: ["Energy travels through the metal base by conduction.", "Water near the base warms and moves.", "Energy circulates through the water by convection."],
      ans: "Conduction through the metal base; convection through the water.",
      final_check: "Radiation may also contribute to heating surfaces.",
      common_mistakes: ["Using one mechanism to describe both the metal and circulating water."],
      explanation: "Different parts of the same heating system can transfer energy by different mechanisms."
    },
    {
      q: "Which statement correctly distinguishes radiation from conduction and convection?",
      hint: "Focus on whether a material medium is necessary.",
      steps: ["Conduction occurs through matter.", "Convection involves bulk movement of a fluid.", "Radiation can travel through a vacuum."],
      ans: "Radiation can transfer energy through a vacuum without a material medium.",
      final_check: "Radiation can also travel through matter.",
      common_mistakes: ["Saying radiation only occurs in a vacuum."],
      explanation: "A vacuum is not required for radiation, but it can pass through one."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Change of State",
  `<h2>Change of State</h2>
  <p>A change of state occurs when a substance changes between solid, liquid and gas.</p>
  <ul>
    <li><strong>Melting:</strong> solid to liquid.</li>
    <li><strong>Freezing:</strong> liquid to solid.</li>
    <li><strong>Vaporisation:</strong> liquid to gas, including boiling and evaporation.</li>
    <li><strong>Condensation:</strong> gas to liquid.</li>
    <li><strong>Sublimation:</strong> solid directly to gas.</li>
    <li><strong>Deposition:</strong> gas directly to solid.</li>
  </ul>
  <p>For a pure substance undergoing a change of state at a fixed pressure, the temperature remains constant during the phase change. Energy supplied or removed changes the arrangement and separation of particles rather than increasing or decreasing the temperature during that stage.</p>
  <p>Evaporation can occur at temperatures below the boiling point; boiling occurs throughout the liquid at its boiling point for the given pressure.</p>`,
  [
    {
      q: "What is melting?",
      hint: "Identify the change from a solid.",
      steps: ["The substance starts as a solid.", "It absorbs energy under suitable conditions.", "It changes into a liquid."],
      ans: "The change of state from solid to liquid.",
      final_check: "Melting is the reverse of freezing.",
      common_mistakes: ["Confusing melting with evaporation."],
      explanation: "Melting changes a solid into a liquid."
    },
    {
      q: "What is condensation?",
      hint: "Think about water droplets forming from water vapour.",
      steps: ["A substance starts as a gas.", "It loses energy under suitable conditions.", "It changes into a liquid."],
      ans: "The change of state from gas to liquid.",
      final_check: "Condensation is the reverse of vaporisation.",
      common_mistakes: ["Calling gas-to-liquid change freezing."],
      explanation: "Condensation forms a liquid from a gas."
    },
    {
      q: "What is the difference between boiling and evaporation?",
      hint: "Consider where the process occurs and the temperature condition.",
      steps: ["Evaporation occurs at the surface and can occur below the boiling point.", "Boiling occurs throughout the liquid when it reaches its boiling point for the given pressure."],
      ans: "Evaporation occurs at the surface and can happen below the boiling point; boiling occurs throughout the liquid at its boiling point.",
      final_check: "Both are forms of vaporisation.",
      common_mistakes: ["Saying evaporation only occurs at the boiling point."],
      explanation: "Evaporation and boiling are different processes by which a liquid becomes a gas."
    },
    {
      q: "What is sublimation?",
      hint: "The substance skips the liquid state.",
      steps: ["The substance begins as a solid.", "It changes directly into a gas.", "This process is sublimation."],
      ans: "The direct change from solid to gas.",
      final_check: "The reverse process is deposition.",
      common_mistakes: ["Describing sublimation as solid-to-liquid change."],
      explanation: "Sublimation bypasses the liquid state."
    },
    {
      q: "During the melting of a pure substance at fixed pressure, why can its temperature remain constant even though energy is supplied?",
      hint: "Consider what the supplied energy does during the phase change.",
      steps: ["The substance is changing state.", "The supplied energy changes particle arrangement and separation.", "It does not raise the temperature during the phase-change stage."],
      ans: "The energy is used for the change of state rather than increasing the substance's temperature during that stage.",
      final_check: "This describes a pure substance at fixed pressure during the phase change.",
      common_mistakes: ["Assuming any energy supplied must immediately raise temperature."],
      explanation: "During melting, energy changes the substance's internal arrangement while temperature remains constant until melting is complete."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Latent Heat",
  `<h2>Latent Heat</h2>
  <p>Latent heat is the energy transferred to or from a substance during a change of state without a change in temperature, provided the change occurs at constant pressure for a pure substance.</p>
  <p>During melting, energy supplied helps particles overcome some of the attractive forces holding them in fixed positions. During boiling, energy supplied helps particles separate sufficiently to form a gas.</p>
  <p>During freezing and condensation, energy is released to the surroundings as particles form a more condensed state.</p>
  <h3>Worked example</h3>
  <p>Ice at its melting point receives energy and melts while remaining at the same temperature. The energy is used for the change of state rather than raising the temperature during melting.</p>
  <p><strong>Key distinction:</strong> sensible heating changes temperature; latent heating changes state without changing temperature during the phase change.</p>`,
  [
    {
      q: "What is latent heat?",
      hint: "Think about energy transfer during a change of state.",
      steps: ["A substance undergoes a change of state.", "Energy is transferred to or from it.", "During the phase change, its temperature remains constant under the stated conditions."],
      ans: "Energy transferred during a change of state without a temperature change.",
      final_check: "This definition applies to the phase-change stage, not necessarily before or after it.",
      common_mistakes: ["Defining latent heat as energy that always raises temperature."],
      explanation: "Latent energy changes the state of a substance rather than its temperature during the phase change."
    },
    {
      q: "Ice melts at its melting point while energy continues to be supplied. Why does its temperature remain constant during melting?",
      hint: "Consider what the energy is doing to the particles.",
      steps: ["The ice is changing from solid to liquid.", "Energy helps change the particles' arrangement and overcome attractive forces.", "The temperature remains constant until melting is complete, for a pure substance at fixed pressure."],
      ans: "The supplied energy is used for the change of state rather than raising the temperature during melting.",
      final_check: "Once all the ice has melted, further energy can raise the liquid water's temperature.",
      common_mistakes: ["Assuming that temperature must rise whenever energy is supplied."],
      explanation: "During melting, energy changes the substance's internal arrangement."
    },
    {
      q: "What happens to energy when water freezes at its freezing point?",
      hint: "Compare freezing with melting.",
      steps: ["Liquid water changes into a solid.", "Particles form a more ordered structure.", "Energy is released to the surroundings during freezing."],
      ans: "Energy is released to the surroundings as the water freezes.",
      final_check: "Freezing is the reverse of melting.",
      common_mistakes: ["Saying freezing requires the substance to absorb latent heat from its surroundings."],
      explanation: "During freezing, the substance releases energy associated with the change of state."
    },
    {
      q: "Explain the difference between sensible heating and latent heating.",
      hint: "Compare what happens to temperature and state.",
      steps: ["Sensible heating changes a substance's temperature without a change of state.", "Latent heating transfers energy during a change of state.", "During the phase change, the temperature remains constant under the stated conditions."],
      ans: "Sensible heating changes temperature; latent heating changes state without changing temperature during the phase change.",
      final_check: "A substance can undergo sensible heating before or after latent heating.",
      common_mistakes: ["Claiming latent heating always increases temperature."],
      explanation: "The two terms distinguish temperature change from energy transfer during a phase change."
    },
    {
      q: "A pure substance is boiling at a fixed pressure. What happens to its temperature while liquid and vapour coexist during boiling?",
      hint: "Think about the temperature behaviour during a phase change.",
      steps: ["The liquid is changing into gas.", "Energy supplied supports vaporisation.", "The temperature remains constant during the boiling stage at fixed pressure."],
      ans: "Its temperature remains constant during boiling at that pressure.",
      final_check: "The boiling temperature can change if the pressure changes.",
      common_mistakes: ["Assuming the temperature must rise continuously throughout boiling."],
      explanation: "Energy supplied during the phase change is used for vaporisation."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Specific Latent Heat",
  `<h2>Specific Latent Heat</h2>
  <p>Specific latent heat is the energy required to change the state of 1 kg of a substance without changing its temperature.</p>
  <p><strong>Q = mL</strong></p>
  <ul>
    <li>Q = energy transferred, in joules (J)</li>
    <li>m = mass, in kilograms (kg)</li>
    <li>L = specific latent heat, in J/kg</li>
  </ul>
  <p>Specific latent heat depends on the substance and the type of change of state. The specific latent heat of fusion concerns melting or freezing; the specific latent heat of vaporisation concerns boiling or condensation.</p>
  <h3>Worked example</h3>
  <p>A 0.4 kg sample has a specific latent heat of 200,000 J/kg for a particular phase change.</p>
  <ol>
    <li>Q = mL.</li>
    <li>Q = 0.4 × 200,000.</li>
    <li>Q = 80,000 J.</li>
  </ol>
  <p><strong>Answer: 80,000 J.</strong></p>`,
  [
    {
      q: "Define specific latent heat.",
      hint: "Include energy, unit mass and no temperature change.",
      steps: ["Consider 1 kg of a substance.", "Change its state without changing its temperature.", "The required energy is its specific latent heat for that change."],
      ans: "The energy required to change the state of 1 kg of a substance without changing its temperature.",
      final_check: "Its SI unit is J/kg.",
      common_mistakes: ["Leaving out the unit mass of 1 kg."],
      explanation: "Specific latent heat measures energy per kilogram for a particular change of state."
    },
    {
      q: "Calculate the energy needed to change the state of 2 kg of a substance with specific latent heat 150,000 J/kg.",
      hint: "Use Q = mL.",
      formula: "Q = mL",
      steps: ["Q = 2 × 150,000.", "Q = 300,000 J."],
      ans: "300,000 J",
      final_check: "Kilograms multiplied by joules per kilogram gives joules.",
      common_mistakes: ["Dividing by the mass instead of multiplying."],
      explanation: "The energy required is 300,000 J."
    },
    {
      q: "A 0.25 kg sample requires 50,000 J for a change of state. Calculate its specific latent heat.",
      hint: "Rearrange Q = mL to make L the subject.",
      formula: "L = Q/m",
      steps: ["L = 50,000/0.25.", "L = 200,000 J/kg."],
      ans: "200,000 J/kg",
      final_check: "Specific latent heat is energy per kilogram.",
      common_mistakes: ["Multiplying energy by mass."],
      explanation: "50,000 ÷ 0.25 = 200,000 J/kg."
    },
    {
      q: "A material has specific latent heat 80,000 J/kg. How much energy is required to change the state of 0.75 kg?",
      hint: "Multiply the mass by the specific latent heat.",
      formula: "Q = mL",
      steps: ["Q = 0.75 × 80,000.", "Q = 60,000 J."],
      ans: "60,000 J",
      final_check: "The result is an amount of energy.",
      common_mistakes: ["Treating 0.75 kg as 75 kg."],
      explanation: "The energy required is 60,000 J."
    },
    {
      q: "What is the SI unit of specific latent heat?",
      hint: "Specific latent heat is energy divided by mass.",
      steps: ["Energy is measured in joules.", "Mass is measured in kilograms.", "The unit is joules per kilogram."],
      ans: "J/kg",
      final_check: "Do not confuse this with specific heat capacity, measured in J/(kg·K).",
      common_mistakes: ["Giving the unit J/K."],
      explanation: "Specific latent heat measures the energy required per kilogram for a phase change."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Specific Latent Heat of Fusion",
  `<h2>Specific Latent Heat of Fusion</h2>
  <p>The specific latent heat of fusion is the energy required to change 1 kg of a solid into a liquid at its melting point without a temperature change.</p>
  <p>The same magnitude of energy per kilogram is released when that substance freezes at the same pressure.</p>
  <p><strong>Q = mLᶠ</strong></p>
  <p>Here, Lᶠ represents the specific latent heat of fusion.</p>
  <h3>Worked example</h3>
  <p>Use Lᶠ = 334,000 J/kg for ice near its normal melting point. Calculate the energy needed to melt 0.2 kg of ice already at 0°C.</p>
  <ol>
    <li>Q = mLᶠ.</li>
    <li>Q = 0.2 × 334,000.</li>
    <li>Q = 66,800 J.</li>
  </ol>
  <p><strong>Answer: 66,800 J.</strong></p>
  <p>This calculation assumes the ice is already at its melting point. If the ice starts colder, energy is also needed to warm it to that point.</p>`,
  [
    {
      q: "What does the specific latent heat of fusion describe?",
      hint: "Fusion refers to melting.",
      steps: ["Start with 1 kg of solid at its melting point.", "Change it into liquid without a temperature change.", "Measure the required energy."],
      ans: "The energy required to melt 1 kg of a solid at its melting point without changing its temperature.",
      final_check: "Its unit is J/kg.",
      common_mistakes: ["Confusing fusion with vaporisation."],
      explanation: "Specific latent heat of fusion concerns the solid-to-liquid change of state."
    },
    {
      q: "Calculate the energy needed to melt 0.5 kg of ice at 0°C. Use Lᶠ = 334,000 J/kg.",
      hint: "The ice is already at its melting point, so use Q = mLᶠ.",
      formula: "Q = mLᶠ",
      steps: ["Q = 0.5 × 334,000.", "Q = 167,000 J."],
      ans: "167,000 J",
      final_check: "This calculation covers melting only, not warming the resulting water.",
      common_mistakes: ["Adding a sensible-heating term when no temperature rise is specified."],
      explanation: "Half a kilogram of ice requires 167,000 J to melt at 0°C using the stated value."
    },
    {
      q: "How much ice at 0°C can be melted by 66,800 J? Use Lᶠ = 334,000 J/kg.",
      hint: "Rearrange Q = mLᶠ to make mass the subject.",
      formula: "m = Q/Lᶠ",
      steps: ["m = 66,800/334,000.", "m = 0.2 kg."],
      ans: "0.2 kg",
      final_check: "The mass is 200 g.",
      common_mistakes: ["Multiplying energy by latent heat."],
      explanation: "66,800 ÷ 334,000 = 0.2 kg."
    },
    {
      q: "How much energy is released when 0.3 kg of water freezes at its freezing point? Use Lᶠ = 334,000 J/kg.",
      hint: "The magnitude of the energy per kilogram is the same for freezing and melting.",
      formula: "Q = mLᶠ",
      steps: ["Q = 0.3 × 334,000.", "Q = 100,200 J.", "This energy is released to the surroundings."],
      ans: "100,200 J released",
      final_check: "State the direction of energy transfer as well as its magnitude.",
      common_mistakes: ["Saying the freezing water absorbs the latent energy."],
      explanation: "Freezing releases 100,200 J under the stated conditions."
    },
    {
      q: "Ice starts at −10°C and must become water at 0°C. Is Q = mLᶠ alone enough to calculate all the energy needed?",
      hint: "Before melting, the ice must reach its melting point.",
      steps: ["The ice first warms from −10°C to 0°C.", "That requires sensible heat, Q₁ = mcΔT.", "Melting then requires latent heat, Q₂ = mLᶠ.", "Total energy is Q₁ + Q₂."],
      ans: "No. Energy is needed to warm the ice to 0°C and then to melt it.",
      final_check: "Use the specific heat capacity of ice for the warming stage if a numerical calculation is required.",
      common_mistakes: ["Using the latent heat equation for the temperature-rise stage."],
      explanation: "A complete calculation includes both sensible heating and the latent heat of fusion."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Specific Latent Heat of Vaporisation",
  `<h2>Specific Latent Heat of Vaporisation</h2>
  <p>The specific latent heat of vaporisation is the energy required to change 1 kg of a liquid into gas at its boiling point without changing its temperature.</p>
  <p>For the reverse process, condensation, the same magnitude of energy per kilogram is released at the corresponding saturation temperature and pressure.</p>
  <p><strong>Q = mLᵥ</strong></p>
  <p>Here, Lᵥ is the specific latent heat of vaporisation.</p>
  <h3>Worked example</h3>
  <p>Use Lᵥ = 2.26 × 10⁶ J/kg for water at its normal boiling point. Find the energy needed to vaporise 0.1 kg of water already at 100°C.</p>
  <ol>
    <li>Q = mLᵥ.</li>
    <li>Q = 0.1 × 2.26 × 10⁶.</li>
    <li>Q = 226,000 J.</li>
  </ol>
  <p><strong>Answer: 226,000 J.</strong></p>
  <p>The calculation assumes the water is already at its boiling point and does not include heating it to 100°C.</p>`,
  [
    {
      q: "Define specific latent heat of vaporisation.",
      hint: "Think about changing liquid into gas at the boiling point.",
      steps: ["Start with 1 kg of liquid at its boiling point.", "Change it into gas without changing temperature.", "Measure the energy required."],
      ans: "The energy required to change 1 kg of liquid into gas at its boiling point without changing its temperature.",
      final_check: "The unit is J/kg.",
      common_mistakes: ["Defining it as the energy required to heat a liquid by 1°C."],
      explanation: "Specific latent heat of vaporisation concerns the liquid-to-gas phase change."
    },
    {
      q: "Calculate the energy required to vaporise 0.2 kg of water at 100°C. Use Lᵥ = 2.26 × 10⁶ J/kg.",
      hint: "Use Q = mLᵥ.",
      formula: "Q = mLᵥ",
      steps: ["Q = 0.2 × 2.26 × 10⁶.", "Q = 0.452 × 10⁶ J.", "Q = 452,000 J."],
      ans: "452,000 J",
      final_check: "This is energy for vaporisation only.",
      common_mistakes: ["Using 2.26 × 10⁵ instead of 2.26 × 10⁶."],
      explanation: "0.2 kg of water requires 452,000 J to vaporise at the stated conditions."
    },
    {
      q: "A sample needs 678,000 J to vaporise completely at its boiling point. If Lᵥ = 2.26 × 10⁶ J/kg, calculate its mass.",
      hint: "Divide energy by specific latent heat.",
      formula: "m = Q/Lᵥ",
      steps: ["m = 678,000/(2.26 × 10⁶).", "m = 0.3 kg."],
      ans: "0.3 kg",
      final_check: "The mass is 300 g.",
      common_mistakes: ["Multiplying energy by latent heat."],
      explanation: "678,000 ÷ 2,260,000 = 0.3 kg."
    },
    {
      q: "What energy is released when 0.05 kg of steam condenses at the corresponding saturation temperature? Use Lᵥ = 2.26 × 10⁶ J/kg.",
      hint: "Condensation releases the same magnitude of latent energy per kilogram.",
      formula: "Q = mLᵥ",
      steps: ["Q = 0.05 × 2.26 × 10⁶.", "Q = 113,000 J.", "The energy is released to the surroundings."],
      ans: "113,000 J released",
      final_check: "Indicate that energy leaves the condensing steam.",
      common_mistakes: ["Saying condensation requires the steam to absorb latent energy."],
      explanation: "Condensing 0.05 kg of steam releases 113,000 J under the stated conditions."
    },
    {
      q: "Why can steam at 100°C cause more severe burns than water at 100°C when comparable amounts contact the skin?",
      hint: "Consider the energy released when steam condenses.",
      steps: ["Steam can condense on cooler skin.", "Condensation releases latent heat.", "That additional energy can transfer to the skin."],
      ans: "Steam releases latent heat when it condenses, transferring additional energy to the skin.",
      final_check: "Actual injury also depends on contact time, amount, pressure and other conditions.",
      common_mistakes: ["Claiming steam must have a higher temperature than boiling water to cause greater burns."],
      explanation: "Condensation can release substantial latent energy in addition to energy transferred as the steam cools."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Heating Curves",
  `<h2>Heating Curves</h2>
  <p>A heating curve shows how a substance's temperature changes as energy is supplied over time or as cumulative energy input increases.</p>
  <p>For a pure substance heated at constant pressure, a typical heating curve has:</p>
  <ul>
    <li><strong>Sloping sections:</strong> the substance remains in one state and its temperature rises.</li>
    <li><strong>Flat sections:</strong> the substance changes state at constant temperature; supplied energy provides latent heat.</li>
  </ul>
  <p>For ice initially below 0°C, a typical curve shows ice warming, melting at about 0°C, liquid water warming, boiling at about 100°C at normal atmospheric pressure, and steam warming if heating continues.</p>
  <h3>Worked interpretation</h3>
  <p>If a graph is flat while energy continues to enter a pure substance, the substance may be undergoing a phase change. The plateau's length depends on the energy needed for that change and the rate of energy supply.</p>`,
  [
    {
      q: "On a heating curve for a pure substance at constant pressure, what does a sloping section generally indicate?",
      hint: "Look for a section where temperature changes.",
      steps: ["The substance remains in one state during the section.", "Energy supplied changes its temperature.", "The graph slopes upward."],
      ans: "The substance is heating within one state and its temperature is increasing.",
      final_check: "This describes an ordinary heating section without a phase change.",
      common_mistakes: ["Saying every sloping section represents melting or boiling."],
      explanation: "Sloping sections show temperature changes within a state."
    },
    {
      q: "What does a flat section of a heating curve represent for a pure substance at constant pressure?",
      hint: "The temperature is not rising despite energy input.",
      steps: ["Energy continues to be supplied.", "The temperature remains constant.", "The substance is undergoing a change of state."],
      ans: "A phase change at constant temperature.",
      final_check: "Energy is being used for the phase change.",
      common_mistakes: ["Assuming no energy enters the substance during the flat section."],
      explanation: "The supplied energy changes the state rather than raising the temperature during the plateau."
    },
    {
      q: "Ice at −10°C is heated at normal atmospheric pressure. What is the first change shown on a typical heating curve?",
      hint: "The ice starts below its melting point.",
      steps: ["The sample begins as solid ice at −10°C.", "Energy raises the ice's temperature.", "The temperature rises towards 0°C before melting begins."],
      ans: "The ice warms from −10°C towards 0°C.",
      final_check: "The initial stage is sensible heating of solid ice.",
      common_mistakes: ["Saying the ice immediately boils or melts at −10°C."],
      explanation: "The ice must reach its melting point before melting begins under these conditions."
    },
    {
      q: "On a typical heating curve for water at normal atmospheric pressure, what happens after the liquid water has warmed to 100°C and boiling begins?",
      hint: "Consider the boiling plateau.",
      steps: ["Water reaches its boiling point.", "Liquid changes into steam.", "Temperature remains approximately 100°C while boiling continues."],
      ans: "The temperature remains approximately 100°C during boiling until the liquid has vaporised.",
      final_check: "This assumes pure water at normal atmospheric pressure.",
      common_mistakes: ["Claiming the temperature rises continuously while the water boils."],
      explanation: "Energy supplied during boiling provides latent heat of vaporisation."
    },
    {
      q: "Two heating curves show flat sections at the same phase-change temperature, but one plateau lasts longer when both samples receive energy at the same constant rate. What can the longer plateau indicate?",
      hint: "At a constant input rate, a longer time means more energy supplied.",
      steps: ["Energy supplied equals power multiplied by time.", "A longer plateau at the same power means more energy is supplied during the phase change.", "This can indicate a larger sample mass or a larger total latent-energy requirement."],
      ans: "The longer plateau indicates more energy is required for the phase change, potentially because of greater mass or greater specific latent heat.",
      final_check: "A firm comparison requires knowing the heating power and the samples' masses and substances.",
      common_mistakes: ["Concluding that the plateau must indicate a higher temperature."],
      explanation: "At constant power, plateau duration reflects the energy needed for the phase change."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Cooling Curves",
  `<h2>Cooling Curves</h2>
  <p>A cooling curve shows how the temperature of a substance changes as it loses energy to its surroundings.</p>
  <p>For a pure substance at constant pressure, a typical curve has:</p>
  <ul>
    <li><strong>Sloping sections:</strong> the substance cools within a single state.</li>
    <li><strong>Flat sections:</strong> a phase change occurs at constant temperature, such as freezing or condensation.</li>
  </ul>
  <p>During freezing, a pure substance releases latent heat while the liquid changes into a solid. During condensation, gas releases latent heat as it changes into liquid.</p>
  <h3>Worked interpretation</h3>
  <p>If liquid water cools to its freezing point, its temperature falls. While it freezes at constant pressure, the temperature stays approximately constant until the phase change is complete. After freezing, the solid can cool further.</p>`,
  [
    {
      q: "What does a downward-sloping section of a cooling curve generally show?",
      hint: "Check how temperature changes with time.",
      steps: ["The substance is losing energy.", "Its temperature falls.", "It is cooling within one state."],
      ans: "The substance is cooling within a single state and its temperature is decreasing.",
      final_check: "A phase change may occur on a flat section instead.",
      common_mistakes: ["Assuming all cooling occurs at constant temperature."],
      explanation: "Sloping sections indicate a temperature decrease."
    },
    {
      q: "Why can a pure substance's cooling curve become flat while the substance freezes?",
      hint: "Consider the energy released during freezing.",
      steps: ["The substance reaches its freezing point.", "It releases latent heat as liquid becomes solid.", "Its temperature stays constant until freezing is complete under the stated conditions."],
      ans: "Latent heat is released during freezing while the temperature remains constant.",
      final_check: "The substance continues losing energy even while the graph is flat.",
      common_mistakes: ["Interpreting a flat line as proof that no energy is transferred."],
      explanation: "Energy leaves the substance as latent heat during the phase change."
    },
    {
      q: "Steam condenses to liquid water at its saturation temperature. Is latent heat absorbed or released by the steam?",
      hint: "Condensation is the reverse of vaporisation.",
      steps: ["Gas changes to liquid.", "Particles form a more condensed state.", "Energy is released to the surroundings."],
      ans: "Latent heat is released.",
      final_check: "The released energy may warm nearby surfaces or air.",
      common_mistakes: ["Saying condensation absorbs the same latent energy that vaporisation requires."],
      explanation: "Condensation releases latent energy."
    },
    {
      q: "A sample has finished freezing and continues to lose energy. What generally happens to its temperature next?",
      hint: "The phase change is complete.",
      steps: ["The sample is now entirely solid.", "Further energy loss cools the solid.", "Its temperature falls."],
      ans: "Its temperature decreases as the solid cools.",
      final_check: "This assumes no other phase change or unusual behaviour begins.",
      common_mistakes: ["Claiming the solid must stay at the freezing point indefinitely."],
      explanation: "Once freezing is complete, further cooling reduces the solid's temperature."
    },
    {
      q: "Two equal masses of the same pure substance freeze under the same pressure. If one releases more total latent energy, what should you check first?",
      hint: "Use the relationship between energy, mass and specific latent heat.",
      formula: "Q = mL",
      steps: ["For the same substance and phase change, L is the same.", "For complete freezing, Q is proportional to m.", "Check whether the masses or the amount that actually froze are different."],
      ans: "Check the masses and whether both samples froze completely; equal masses of the same substance undergoing the same complete phase change should release equal latent energy.",
      final_check: "The conclusion assumes the same substance, pressure conditions and complete phase change.",
      common_mistakes: ["Claiming the same amount of the same substance must release different latent energy without another difference."],
      explanation: "For a given phase change, Q = mL determines the energy released."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Evaporation",
  `<h2>Evaporation</h2>
  <p>Evaporation is the change from liquid to gas that occurs at the surface of a liquid. It can occur at temperatures below the boiling point.</p>
  <p>Some particles at the liquid surface have enough energy to escape into the surrounding gas. The particles that escape carry energy away, so the remaining liquid may cool if energy is not replaced from its surroundings.</p>
  <h3>Examples</h3>
  <ul>
    <li>Wet clothes dry as water evaporates.</li>
    <li>Sweat evaporates from skin and can cool the body.</li>
    <li>Water in an open container gradually disappears over time.</li>
  </ul>
  <p>Evaporation differs from boiling: evaporation occurs at the surface and can happen below the boiling point, while boiling occurs throughout the liquid at its boiling point for the given pressure.</p>`,
  [
    {
      q: "What is evaporation?",
      hint: "It occurs at the surface of a liquid.",
      steps: ["Some surface particles gain or already have enough energy.", "They escape from the liquid into the gas state.", "This is evaporation."],
      ans: "The change of a liquid into gas at its surface, which can occur below the boiling point.",
      final_check: "Evaporation does not require the liquid to boil.",
      common_mistakes: ["Defining evaporation as a process that only occurs at 100°C."],
      explanation: "Evaporation occurs at the surface across a range of temperatures."
    },
    {
      q: "Why can evaporation cool the liquid that remains?",
      hint: "What happens to energy when the faster, higher-energy particles escape?",
      steps: ["Some higher-energy particles escape from the surface.", "They carry energy away.", "The remaining liquid has lower average particle kinetic energy if energy is not replaced, so its temperature can fall."],
      ans: "Escaping particles carry energy away, which can lower the average kinetic energy and temperature of the remaining liquid.",
      final_check: "Cooling depends on the energy balance with the surroundings.",
      common_mistakes: ["Claiming evaporation always raises the liquid's temperature."],
      explanation: "Evaporation can remove energy from the remaining liquid."
    },
    {
      q: "Why can sweat help cool a person on a warm day?",
      hint: "Consider the energy needed for water to evaporate.",
      steps: ["Sweat is liquid water on the skin.", "Evaporation requires energy.", "Energy is taken from the skin and nearby surroundings, producing cooling."],
      ans: "Evaporating sweat takes energy from the skin, helping cool the body.",
      final_check: "Cooling is less effective when the air is very humid because evaporation slows.",
      common_mistakes: ["Saying sweat cools only because it is wet."],
      explanation: "The latent heat needed for evaporation can be drawn from the skin."
    },
    {
      q: "A puddle dries on a day when the air temperature is below the boiling point of water. How is this possible?",
      hint: "Does evaporation require boiling?",
      steps: ["Evaporation occurs at the liquid surface.", "Some water molecules escape into the air below the boiling point.", "Over time, enough water evaporates for the puddle to dry."],
      ans: "Evaporation occurs below the boiling point, so water can gradually escape into the air.",
      final_check: "Drying rate depends on factors such as temperature, airflow and humidity.",
      common_mistakes: ["Assuming all liquid-to-gas change requires boiling."],
      explanation: "Surface evaporation occurs at temperatures below boiling."
    },
    {
      q: "How does evaporation differ from boiling?",
      hint: "Compare where each process occurs and its temperature condition.",
      steps: ["Evaporation occurs at the surface and can occur below the boiling point.", "Boiling occurs throughout the liquid at the boiling point for a given pressure."],
      ans: "Evaporation occurs at the surface at a range of temperatures; boiling occurs throughout the liquid at its boiling point.",
      final_check: "Both processes change liquid into gas.",
      common_mistakes: ["Saying evaporation and boiling are identical processes."],
      explanation: "The processes differ in where they occur and the conditions required."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Factors Affecting Evaporation",
  `<h2>Factors Affecting Evaporation</h2>
  <p>The rate of evaporation depends on conditions at the liquid surface and in the surrounding air.</p>
  <ul>
    <li><strong>Temperature:</strong> a higher liquid temperature generally increases evaporation rate because more particles can escape.</li>
    <li><strong>Surface area:</strong> a larger exposed surface generally allows more particles to escape at once.</li>
    <li><strong>Air movement:</strong> moving air carries away vapour near the surface, often increasing evaporation.</li>
    <li><strong>Humidity:</strong> lower relative humidity generally increases evaporation because the air is less saturated with water vapour.</li>
    <li><strong>Nature of the liquid:</strong> different liquids evaporate at different rates because their particles experience different intermolecular attractions and have different volatilities.</li>
  </ul>
  <h3>Worked comparison</h3>
  <p>Water spread over a wide tray usually evaporates faster than the same amount of water in a narrow container under the same temperature, airflow and humidity, because more surface is exposed.</p>`,
  [
    {
      q: "Why does water generally evaporate faster at a higher temperature?",
      hint: "Consider the energy distribution of liquid particles.",
      steps: ["Heating increases the particles' average kinetic energy.", "A greater fraction can escape from the surface.", "The evaporation rate generally increases."],
      ans: "More particles have enough energy to escape from the liquid surface.",
      final_check: "Assume other conditions remain comparable.",
      common_mistakes: ["Saying the liquid must reach its boiling point before evaporation increases."],
      explanation: "Higher temperature generally increases the rate of evaporation."
    },
    {
      q: "Why does the same amount of water usually evaporate faster from a wide shallow tray than from a narrow deep container?",
      hint: "Compare the exposed liquid surface areas.",
      steps: ["The tray exposes a larger liquid surface.", "More particles can escape at the same time.", "The evaporation rate generally increases."],
      ans: "The wide tray has a larger exposed surface area.",
      final_check: "This comparison assumes similar temperature, airflow and humidity.",
      common_mistakes: ["Confusing exposed surface area with the total volume of water."],
      explanation: "A larger exposed surface generally increases evaporation rate."
    },
    {
      q: "How does moving air over a wet surface generally affect evaporation?",
      hint: "Think about what happens to water vapour near the surface.",
      steps: ["Evaporated water vapour accumulates near a still surface.", "Moving air carries some vapour away.", "Evaporation can continue more rapidly."],
      ans: "Moving air generally increases evaporation by carrying vapour away from the surface.",
      final_check: "The effect depends on the air's temperature and humidity too.",
      common_mistakes: ["Claiming wind always increases evaporation regardless of conditions."],
      explanation: "Air movement often reduces the build-up of vapour immediately above the liquid."
    },
    {
      q: "Why do wet clothes often dry more slowly on a humid day?",
      hint: "Compare the amount of water vapour already in the air.",
      steps: ["Humid air already contains a high amount of water vapour relative to its capacity.", "The difference that drives evaporation is smaller.", "Water generally evaporates more slowly."],
      ans: "High humidity generally reduces the rate of evaporation.",
      final_check: "Airflow and temperature can also affect drying time.",
      common_mistakes: ["Claiming humidity always makes evaporation faster."],
      explanation: "When the surrounding air is humid, it generally accepts additional water vapour less readily."
    },
    {
      q: "A student wants to test how surface area affects evaporation. Which procedure gives the fairest comparison?",
      hint: "Change only the variable being tested.",
      steps: ["Use equal amounts of the same liquid.", "Place them in containers with different exposed surface areas.", "Keep temperature, airflow and humidity as similar as possible.", "Measure the amount evaporated over the same time."],
      ans: "Use equal amounts of the same liquid, vary exposed surface area only, control other conditions and compare evaporation over the same time.",
      final_check: "A fair test changes one independent variable while controlling others.",
      common_mistakes: ["Changing surface area and temperature at the same time."],
      explanation: "Controlling other variables helps isolate the effect of surface area."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Boiling Point and Pressure",
  `<h2>Boiling Point and Pressure</h2>
  <p>A liquid boils when bubbles of vapour can form and grow throughout the liquid. This occurs when the liquid's vapour pressure reaches the external pressure acting on it.</p>
  <p>For water, the normal boiling point is approximately 100°C at standard atmospheric pressure.</p>
  <ul>
    <li><strong>Lower external pressure:</strong> the boiling point generally decreases.</li>
    <li><strong>Higher external pressure:</strong> the boiling point generally increases.</li>
  </ul>
  <h3>Applications</h3>
  <ul>
    <li>At high altitude, atmospheric pressure is lower, so water boils below 100°C.</li>
    <li>A pressure cooker raises the pressure inside, allowing water and steam to reach a temperature above 100°C.</li>
  </ul>
  <p>Boiling point depends on pressure, so 100°C is not the boiling point of water under every condition.</p>`,
  [
    {
      q: "What condition must be met for a liquid to boil?",
      hint: "Compare vapour pressure with the pressure surrounding the liquid.",
      steps: ["The liquid has a vapour pressure at its current temperature.", "Boiling can occur when that vapour pressure reaches the external pressure.", "Vapour bubbles can then form throughout the liquid."],
      ans: "The liquid's vapour pressure reaches the external pressure, allowing vapour bubbles to form throughout the liquid.",
      final_check: "This explains why boiling point depends on external pressure.",
      common_mistakes: ["Defining boiling as evaporation only from the surface."],
      explanation: "Boiling involves vapour bubbles forming within the liquid as well as at its surface."
    },
    {
      q: "Why does water boil at a temperature below 100°C at high altitude?",
      hint: "Atmospheric pressure is lower at high altitude.",
      steps: ["External atmospheric pressure is lower.", "The water's vapour pressure reaches that lower pressure at a lower temperature.", "The boiling point decreases."],
      ans: "Lower atmospheric pressure allows water to boil at a lower temperature.",
      final_check: "The exact boiling temperature depends on the local pressure.",
      common_mistakes: ["Saying high altitude automatically makes water hotter."],
      explanation: "A lower external pressure lowers water's boiling point."
    },
    {
      q: "Why can food cook at a higher temperature in a pressure cooker?",
      hint: "Consider how the cooker changes the pressure above the water.",
      steps: ["The cooker increases the pressure inside.", "Water's boiling point rises with pressure.", "Water and steam can become hotter than 100°C under suitable conditions."],
      ans: "Higher pressure raises the boiling point of water, allowing cooking at a higher temperature.",
      final_check: "The cooker must be operated according to its safety instructions.",
      common_mistakes: ["Claiming pressure lowers the boiling point in a pressure cooker."],
      explanation: "The raised boiling point allows a higher cooking temperature."
    },
    {
      q: "At standard atmospheric pressure, what is the approximate normal boiling point of pure water?",
      hint: "Recall the usual school reference value.",
      steps: ["Identify the standard atmospheric pressure condition.", "The normal boiling point of water is approximately 100°C."],
      ans: "100°C",
      final_check: "This value assumes standard atmospheric pressure.",
      common_mistakes: ["Treating 100°C as universal regardless of pressure."],
      explanation: "Water's normal boiling point is approximately 100°C at standard atmospheric pressure."
    },
    {
      q: "Two identical open containers hold water at the same temperature. One is at a lower external pressure. Which water sample generally has the lower boiling point?",
      hint: "Use the relationship between external pressure and boiling point.",
      steps: ["Boiling occurs when vapour pressure reaches external pressure.", "The lower-pressure sample reaches that condition at a lower temperature.", "Its boiling point is lower."],
      ans: "The sample under lower external pressure.",
      final_check: "Assume both samples are the same liquid and other relevant conditions are comparable.",
      common_mistakes: ["Choosing the higher-pressure sample."],
      explanation: "Lower external pressure generally lowers a liquid's boiling point."
    }
  ]
);

add(
  "physics",
  "temperature_and_thermal_physics",
  "Thermal Insulation",
  `<h2>Thermal Insulation</h2>
  <p>Thermal insulation reduces the rate at which thermal energy transfers between a system and its surroundings. It does not necessarily stop all energy transfer.</p>
  <p>Good insulation may reduce conduction, convection, radiation or a combination of these mechanisms.</p>
  <h3>Examples</h3>
  <ul>
    <li>Trapped air in foam or fibreglass reduces conduction and suppresses convection when the air is held in small spaces.</li>
    <li>Shiny surfaces reduce radiative heat transfer by reflecting much of the incident thermal radiation.</li>
    <li>Double-glazed windows trap a layer of air or gas between panes, reducing heat transfer.</li>
    <li>Vacuum flasks use a vacuum between walls to greatly reduce conduction and convection through that gap.</li>
  </ul>
  <p>Insulation can keep a hot object warm or a cold object cool by slowing energy transfer. It does not create heat or cold.</p>`,
  [
    {
      q: "What is the purpose of thermal insulation?",
      hint: "Think about the rate of energy transfer between an object and its surroundings.",
      steps: ["Thermal energy tends to transfer when there is a temperature difference.", "Insulating materials or designs reduce one or more transfer mechanisms.", "Energy transfer occurs more slowly."],
      ans: "To reduce the rate of thermal energy transfer between a system and its surroundings.",
      final_check: "Insulation reduces transfer; it does not necessarily eliminate it.",
      common_mistakes: ["Claiming insulation creates heat or completely stops all energy transfer."],
      explanation: "Thermal insulation slows energy transfer."
    },
    {
      q: "Why is trapped air useful in many insulating materials?",
      hint: "Compare still air with a metal conductor.",
      steps: ["Air is a poor thermal conductor compared with metals.", "Small trapped spaces restrict bulk movement of air.", "Conduction and convection are reduced."],
      ans: "Air is a poor conductor, and trapping it in small spaces limits convection.",
      final_check: "Air movement through large gaps can increase heat transfer.",
      common_mistakes: ["Saying air is always an effective insulator even when it circulates freely."],
      explanation: "Insulation works well when it reduces both conduction and fluid movement."
    },
    {
      q: "How do shiny surfaces help reduce thermal energy transfer in a vacuum flask?",
      hint: "Consider how they interact with infrared radiation.",
      steps: ["Shiny surfaces reflect much incident thermal radiation.", "They are relatively poor absorbers and emitters.", "Radiative heat transfer is reduced."],
      ans: "They reflect thermal radiation and reduce absorption and emission.",
      final_check: "Shiny surfaces address radiation; the vacuum addresses conduction and convection across the gap.",
      common_mistakes: ["Claiming shiny surfaces remove the need for a vacuum."],
      explanation: "Vacuum flasks combine different features to reduce different transfer mechanisms."
    },
    {
      q: "Why does a vacuum between the walls of a vacuum flask reduce heat transfer?",
      hint: "Which transfer mechanisms require matter?",
      steps: ["A vacuum contains very little matter.", "Conduction through the gap is greatly reduced.", "Convection cannot occur across the gap without a fluid."],
      ans: "The vacuum greatly reduces conduction and prevents convection across the gap.",
      final_check: "Radiation can still cross a vacuum, so reflective surfaces are also useful.",
      common_mistakes: ["Claiming a vacuum prevents thermal radiation."],
      explanation: "Radiation does not require a material medium, but conduction and convection depend on matter."
    },
    {
      q: "A flask keeps hot tea warm for longer. Does this mean the flask produces heat?",
      hint: "Distinguish producing energy from reducing energy loss.",
      steps: ["The tea is hotter than its surroundings.", "Thermal energy tends to leave the tea.", "The flask slows that transfer."],
      ans: "No. The flask slows thermal energy transfer from the tea to the surroundings.",
      final_check: "Over time, some energy transfer still usually occurs.",
      common_mistakes: ["Saying insulation creates heat or makes cold disappear."],
      explanation: "Insulation helps preserve the tea's thermal energy by reducing the rate of energy transfer."
    }
  ]
);
add(
  "physics",
  "force_motion_and_mechanics",
  "Motion Calculations",
  `<h2>Motion Calculations</h2>
<p>Speed describes how much distance an object covers per unit time.</p>
<p><strong>Speed = Distance ÷ Time</strong></p>
<p>Rearranging gives:</p>
<ul>
<li>Distance = Speed × Time</li>
<li>Time = Distance ÷ Speed</li>
</ul>
<p>Use consistent units. Convert minutes to seconds when speed is in m/s. Convert kilometres to metres when required.</p>
<h3>Worked example</h3>
<p>A cyclist travels 150 m in 30 s.</p>
<p>Speed = 150 ÷ 30 = 5 m/s.</p>
<p><strong>Check:</strong> 5 m/s × 30 s = 150 m.</p>`,
  [
    {
      q: "A runner covers 100 m in 20 s. Calculate the average speed.",
      hint: "Speed = distance ÷ time.",
      steps: ["Write speed = distance ÷ time.", "Substitute: 100 ÷ 20.", "Calculate the result."],
      ans: "5 m/s",
      why: "The runner covers 5 metres every second on average."
    },
    {
      q: "A car travels at 12 m/s for 15 s. Calculate the distance travelled.",
      hint: "Distance = speed × time.",
      steps: ["Write distance = speed × time.", "Substitute: 12 × 15.", "Calculate the distance."],
      ans: "180 m",
      why: "The car travels 12 metres each second for 15 seconds."
    },
    {
      q: "A bus travels 240 m at an average speed of 8 m/s. Calculate the time taken.",
      hint: "Time = distance ÷ speed.",
      steps: ["Write time = distance ÷ speed.", "Substitute: 240 ÷ 8.", "Calculate the time."],
      ans: "30 s",
      why: "At 8 m/s, the bus covers 240 m in 30 seconds."
    },
    {
      q: "A student walks 600 m in 5 minutes. Calculate the average speed in m/s.",
      hint: "Convert 5 minutes into seconds first.",
      steps: ["Convert time: 5 × 60 = 300 s.", "Speed = 600 ÷ 300.", "State the answer in m/s."],
      ans: "2 m/s",
      why: "Using 5 as the time without converting minutes would give the wrong unit and value."
    },
    {
      q: "An object travels at 4 m/s for 2 minutes. Calculate the distance travelled.",
      hint: "Convert minutes into seconds.",
      steps: ["Convert time: 2 × 60 = 120 s.", "Distance = 4 × 120.", "Check the unit is metres."],
      ans: "480 m",
      why: "Distance is speed multiplied by time in seconds."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Distance–Time Graphs",
  `<h2>Distance–Time Graphs</h2>
<p>A distance–time graph shows how the distance travelled changes with time.</p>
<ul>
<li>Time is normally on the horizontal axis.</li>
<li>Distance is normally on the vertical axis.</li>
<li>A horizontal line means the object is stationary.</li>
<li>A straight rising line means constant speed.</li>
<li>A steeper rising line represents greater speed.</li>
</ul>
<h3>Worked example</h3>
<p>An object's distance increases from 0 m to 60 m in 10 s.</p>
<p>Speed = gradient = change in distance ÷ change in time.</p>
<p>Speed = 60 ÷ 10 = 6 m/s.</p>
<p>Always read the axis scale before calculating a gradient.</p>`,
  [
    {
      q: "A distance–time graph rises from 0 m at 0 s to 40 m at 8 s. Calculate the speed.",
      hint: "Find the gradient.",
      steps: ["Change in distance = 40 m.", "Change in time = 8 s.", "Speed = 40 ÷ 8."],
      ans: "5 m/s",
      why: "The gradient of a distance–time graph gives speed."
    },
    {
      q: "What does a horizontal line on a distance–time graph mean?",
      hint: "The distance is not changing.",
      steps: ["Read the line across time.", "Notice that distance stays constant.", "Relate constant distance to motion."],
      ans: "The object is stationary.",
      why: "If distance does not change, the object is not travelling farther from its starting reference."
    },
    {
      q: "Two straight rising lines start at the origin. Line A is steeper than line B. Which object is faster?",
      hint: "Compare the gradients.",
      steps: ["Speed is the graph gradient.", "A steeper line has a larger gradient.", "Compare the speeds."],
      ans: "Object A",
      why: "A larger distance–time gradient means more distance covered per second."
    },
    {
      q: "An object moves from 10 m at 2 s to 50 m at 10 s. Calculate its speed during this interval.",
      hint: "Use changes, not just the final readings.",
      steps: ["Change in distance = 50 − 10 = 40 m.", "Change in time = 10 − 2 = 8 s.", "Speed = 40 ÷ 8."],
      ans: "5 m/s",
      why: "The gradient is calculated from the difference between the two points."
    },
    {
      q: "Why should you read the graph's axis scale before finding speed?",
      hint: "Consider what each grid square represents.",
      steps: ["Identify the values on both axes.", "Determine the actual distance and time changes.", "Calculate using those values."],
      ans: "Because each grid square may represent more than one unit, and the actual changes determine the gradient.",
      why: "Counting squares without checking the scale can produce an incorrect speed."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Displacement–Time Graphs",
  `<h2>Displacement–Time Graphs</h2>
<p>A displacement–time graph shows displacement from a reference point as time passes. Displacement includes direction.</p>
<ul>
<li>The gradient gives velocity.</li>
<li>A positive gradient indicates positive velocity.</li>
<li>A negative gradient indicates motion in the negative direction.</li>
<li>A horizontal line indicates zero velocity.</li>
</ul>
<h3>Worked example</h3>
<p>Displacement changes from 2 m to 18 m in 4 s.</p>
<p>Velocity = change in displacement ÷ time taken.</p>
<p>Velocity = (18 − 2) ÷ 4 = 4 m/s.</p>
<p>The sign of velocity depends on the chosen positive direction.</p>`,
  [
    {
      q: "Displacement changes from 0 m to 24 m in 6 s. Calculate the velocity.",
      hint: "Velocity = change in displacement ÷ time.",
      steps: ["Change in displacement = 24 − 0 = 24 m.", "Time interval = 6 s.", "Velocity = 24 ÷ 6."],
      ans: "4 m/s",
      why: "The displacement increases by 4 m each second."
    },
    {
      q: "Displacement changes from 20 m to 5 m in 3 s. Calculate the average velocity.",
      hint: "Subtract the initial displacement from the final displacement.",
      steps: ["Change = 5 − 20 = −15 m.", "Divide by 3 s.", "Keep the negative sign."],
      ans: "−5 m/s",
      why: "The negative sign indicates motion in the negative direction."
    },
    {
      q: "A displacement–time graph is horizontal for 7 s. What is the velocity during this interval?",
      hint: "The displacement is constant.",
      steps: ["Change in displacement = 0 m.", "Velocity = change in displacement ÷ time.", "Calculate 0 ÷ 7."],
      ans: "0 m/s",
      why: "No change in displacement means zero velocity."
    },
    {
      q: "A graph's gradient is −3 m/s. What does the negative sign indicate?",
      hint: "Think about direction, not speed size.",
      steps: ["Identify the quantity represented by the gradient.", "Interpret the negative sign using the chosen direction."],
      ans: "The object moves in the negative direction at 3 m/s.",
      why: "A negative gradient represents negative velocity."
    },
    {
      q: "Displacement changes from −4 m to 8 m in 4 s. Calculate the average velocity.",
      hint: "Calculate final displacement minus initial displacement.",
      steps: ["Change = 8 − (−4) = 12 m.", "Divide by 4 s.", "State the velocity."],
      ans: "3 m/s",
      why: "Subtracting a negative initial displacement increases the displacement change."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Speed–Time Graphs",
  `<h2>Speed–Time Graphs</h2>
<p>A speed–time graph shows how an object's speed changes with time.</p>
<ul>
<li>The gradient gives the rate of change of speed.</li>
<li>A horizontal line means constant speed.</li>
<li>A rising line means increasing speed.</li>
<li>The area under the graph represents distance travelled.</li>
</ul>
<h3>Worked example</h3>
<p>Speed rises uniformly from 0 m/s to 10 m/s in 5 s.</p>
<p>Rate of change of speed = (10 − 0) ÷ 5 = 2 m/s².</p>
<p>Distance = area of triangle = ½ × 5 × 10 = 25 m.</p>`,
  [
    {
      q: "Speed increases from 2 m/s to 14 m/s in 4 s. Calculate the rate of change of speed.",
      hint: "Find the gradient.",
      steps: ["Change in speed = 14 − 2 = 12 m/s.", "Time = 4 s.", "Rate = 12 ÷ 4."],
      ans: "3 m/s²",
      why: "The speed increases by 3 m/s each second on average."
    },
    {
      q: "A speed–time graph is horizontal at 8 m/s for 6 s. Calculate the distance travelled.",
      hint: "Use the rectangular area under the graph.",
      steps: ["Distance = speed × time.", "Substitute 8 × 6.", "State the distance."],
      ans: "48 m",
      why: "The area under a constant-speed graph is speed multiplied by time."
    },
    {
      q: "Speed rises uniformly from 0 to 12 m/s in 4 s. Calculate the distance travelled.",
      hint: "The area is a triangle.",
      steps: ["Distance = ½ × base × height.", "Base = 4 s and height = 12 m/s.", "Calculate ½ × 4 × 12."],
      ans: "24 m",
      why: "Distance is the area under the speed–time graph."
    },
    {
      q: "Speed falls uniformly from 10 m/s to 4 m/s in 3 s. Calculate the rate of change of speed.",
      hint: "Final speed minus initial speed, divided by time.",
      steps: ["Change = 4 − 10 = −6 m/s.", "Divide by 3 s.", "Interpret the negative result."],
      ans: "−2 m/s²",
      why: "The negative rate indicates that the speed is decreasing."
    },
    {
      q: "What does the area under a speed–time graph represent?",
      hint: "Combine the units of the axes.",
      steps: ["Area uses speed multiplied by time.", "The units are (m/s) × s.", "Simplify the units."],
      ans: "Distance travelled",
      why: "Multiplying m/s by s gives metres."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Velocity–Time Graphs",
  `<h2>Velocity–Time Graphs</h2>
<p>A velocity–time graph shows how velocity changes with time, including direction.</p>
<ul>
<li>Gradient = acceleration.</li>
<li>Area between the graph and the time axis gives displacement, using signed area.</li>
<li>A graph above the axis represents positive velocity.</li>
<li>A graph below the axis represents negative velocity.</li>
</ul>
<h3>Worked example</h3>
<p>Velocity increases from 4 m/s to 16 m/s in 6 s.</p>
<p>Acceleration = (16 − 4) ÷ 6 = 2 m/s².</p>
<p>For uniform velocity of 5 m/s over 4 s, displacement = 5 × 4 = 20 m.</p>`,
  [
    {
      q: "Velocity changes from 3 m/s to 15 m/s in 4 s. Calculate acceleration.",
      hint: "Acceleration = change in velocity ÷ time.",
      steps: ["Change = 15 − 3 = 12 m/s.", "Divide by 4 s.", "State the acceleration."],
      ans: "3 m/s²",
      why: "The velocity increases by 3 m/s each second."
    },
    {
      q: "An object moves at a constant velocity of −6 m/s for 5 s. Calculate its displacement.",
      hint: "Displacement = velocity × time.",
      steps: ["Multiply −6 by 5.", "Keep the negative sign.", "State the displacement."],
      ans: "−30 m",
      why: "The negative sign indicates displacement in the negative direction."
    },
    {
      q: "Velocity decreases from 12 m/s to 0 m/s in 3 s. Calculate acceleration.",
      hint: "Use final velocity minus initial velocity.",
      steps: ["Change = 0 − 12 = −12 m/s.", "Divide by 3 s.", "Interpret the sign."],
      ans: "−4 m/s²",
      why: "The velocity decreases at 4 m/s each second."
    },
    {
      q: "A velocity–time graph has a horizontal line at 7 m/s. What is the acceleration?",
      hint: "Velocity does not change.",
      steps: ["Change in velocity = 0.", "Acceleration = change in velocity ÷ time.", "Evaluate the ratio."],
      ans: "0 m/s²",
      why: "Constant velocity means zero acceleration."
    },
    {
      q: "Velocity is −4 m/s for 3 s. What is the displacement?",
      hint: "Use signed velocity.",
      steps: ["Displacement = velocity × time.", "Calculate −4 × 3.", "Include the direction indicated by the sign."],
      ans: "−12 m",
      why: "Signed velocity gives signed displacement."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Interpreting Motion Graphs",
  `<h2>Interpreting Motion Graphs</h2>
<p>First identify the graph type and read its axes. Then interpret its gradient or area.</p>
<ul>
<li>Distance–time gradient: speed.</li>
<li>Displacement–time gradient: velocity.</li>
<li>Velocity–time gradient: acceleration.</li>
<li>Area under a velocity–time graph: displacement.</li>
<li>Area under a speed–time graph: distance.</li>
</ul>
<h3>Worked example</h3>
<p>A velocity–time graph shows velocity rising uniformly from 0 to 8 m/s over 4 s.</p>
<p>Acceleration = 8 ÷ 4 = 2 m/s².</p>
<p>Displacement = ½ × 4 × 8 = 16 m.</p>
<p>Do not confuse the gradient with the area: they answer different questions.</p>`,
  [
    {
      q: "Which quantity is found from the gradient of a velocity–time graph?",
      hint: "A gradient compares change in vertical quantity with change in time.",
      steps: ["Identify the vertical axis as velocity.", "Calculate change in velocity divided by time.", "Name the physical quantity."],
      ans: "Acceleration",
      why: "Acceleration is the rate of change of velocity."
    },
    {
      q: "A velocity–time graph stays at 5 m/s for 8 s. Calculate the displacement.",
      hint: "Use the rectangular area.",
      steps: ["Displacement = velocity × time.", "Calculate 5 × 8.", "State the result."],
      ans: "40 m",
      why: "The constant positive velocity gives a rectangular area of 40 m."
    },
    {
      q: "A distance–time graph has a steeper gradient during the second interval. What does this tell you?",
      hint: "Relate gradient to speed.",
      steps: ["Gradient of distance–time graph gives speed.", "Compare the gradients.", "Interpret the larger gradient."],
      ans: "The object is moving faster during the second interval.",
      why: "It covers more distance per unit time."
    },
    {
      q: "A velocity–time graph lies below the time axis. What does this indicate?",
      hint: "Check the sign of velocity.",
      steps: ["Read the vertical-axis values.", "Notice that velocity is negative.", "Relate the sign to direction."],
      ans: "The object is moving in the negative direction.",
      why: "Negative velocity indicates direction relative to the chosen positive direction."
    },
    {
      q: "A velocity–time graph rises from 2 m/s to 10 m/s in 4 s. Calculate both acceleration and displacement, assuming uniform acceleration.",
      hint: "Use the gradient for acceleration and the trapezium area for displacement.",
      steps: ["Acceleration = (10 − 2) ÷ 4 = 2 m/s².", "Displacement = average velocity × time.", "Average velocity = (2 + 10) ÷ 2 = 6 m/s; displacement = 6 × 4."],
      ans: "Acceleration = 2 m/s²; displacement = 24 m",
      why: "The gradient gives acceleration, while the area under the graph gives displacement."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Uniform Motion",
  `<h2>Uniform Motion</h2>
<p>Uniform motion means an object covers equal distances in equal time intervals along a straight line. Its velocity is constant.</p>
<p>For uniform motion:</p>
<ul>
<li>Acceleration is zero.</li>
<li>Distance = speed × time when speed is constant.</li>
<li>A distance–time graph is a straight line with constant gradient.</li>
<li>A velocity–time graph is horizontal.</li>
</ul>
<h3>Worked example</h3>
<p>A train travels at a constant 20 m/s for 12 s.</p>
<p>Distance = 20 × 12 = 240 m.</p>
<p>Because velocity is constant, acceleration is 0 m/s².</p>`,
  [
    {
      q: "A vehicle travels at a constant 15 m/s for 10 s. Calculate the distance.",
      hint: "Distance = speed × time.",
      steps: ["Substitute 15 m/s and 10 s.", "Calculate 15 × 10.", "State the distance."],
      ans: "150 m",
      why: "Constant speed allows direct use of distance = speed × time."
    },
    {
      q: "What is the acceleration of an object moving with constant velocity?",
      hint: "Acceleration measures change in velocity.",
      steps: ["Constant velocity does not change.", "Change in velocity is zero.", "Divide by elapsed time."],
      ans: "0 m/s²",
      why: "There is no change in velocity."
    },
    {
      q: "An object travels 360 m in 30 s at constant speed. Calculate its speed.",
      hint: "Speed = distance ÷ time.",
      steps: ["Write 360 ÷ 30.", "Calculate the quotient.", "Include m/s."],
      ans: "12 m/s",
      why: "The object covers 12 metres per second."
    },
    {
      q: "What does a straight line with constant gradient on a distance–time graph indicate?",
      hint: "The gradient represents speed.",
      steps: ["A constant gradient means the same speed.", "The distance increases evenly with time.", "Name the motion."],
      ans: "Constant speed",
      why: "Equal gradients indicate equal distance covered per unit time."
    },
    {
      q: "A cyclist travels at 6 m/s for 2 minutes. Calculate the distance in metres.",
      hint: "Convert minutes to seconds.",
      steps: ["Time = 2 × 60 = 120 s.", "Distance = 6 × 120.", "State the answer in metres."],
      ans: "720 m",
      why: "The time must be in seconds when speed is in m/s."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Uniform Acceleration",
  `<h2>Uniform Acceleration</h2>
<p>Uniform acceleration means velocity changes by equal amounts in equal time intervals.</p>
<p>For straight-line motion with constant acceleration:</p>
<p><strong>v = u + at</strong></p>
<ul>
<li><strong>u</strong>: initial velocity (m/s)</li>
<li><strong>v</strong>: final velocity (m/s)</li>
<li><strong>a</strong>: acceleration (m/s²)</li>
<li><strong>t</strong>: time (s)</li>
</ul>
<h3>Worked example</h3>
<p>An object starts at 2 m/s and accelerates at 3 m/s² for 4 s.</p>
<p>v = u + at = 2 + (3 × 4) = 14 m/s.</p>
<p>Choose a positive direction and use signs consistently.</p>`,
  [
    {
      q: "An object starts at 0 m/s and accelerates at 2 m/s² for 5 s. Find its final velocity.",
      hint: "Use v = u + at.",
      steps: ["u = 0, a = 2, t = 5.", "v = 0 + (2 × 5).", "Calculate the final velocity."],
      ans: "10 m/s",
      why: "The velocity increases by 2 m/s each second."
    },
    {
      q: "A car's velocity increases from 4 m/s to 16 m/s in 6 s. Find its uniform acceleration.",
      hint: "a = (v − u) ÷ t.",
      steps: ["Change in velocity = 16 − 4 = 12 m/s.", "Divide by 6 s.", "State the acceleration."],
      ans: "2 m/s²",
      why: "Acceleration is the change in velocity per second."
    },
    {
      q: "A vehicle moving at 20 m/s slows with acceleration −4 m/s² for 3 s. Find its final velocity.",
      hint: "Keep the negative acceleration.",
      steps: ["Use v = u + at.", "v = 20 + (−4 × 3).", "Evaluate the expression."],
      ans: "8 m/s",
      why: "The negative acceleration reduces the velocity by 12 m/s."
    },
    {
      q: "A body starts at 5 m/s and reaches 17 m/s with uniform acceleration of 3 m/s². Find the time taken.",
      hint: "Rearrange v = u + at to find t.",
      steps: ["t = (v − u) ÷ a.", "t = (17 − 5) ÷ 3.", "Calculate the time."],
      ans: "4 s",
      why: "The velocity changes by 12 m/s at 3 m/s each second."
    },
    {
      q: "An object has initial velocity 12 m/s and final velocity 12 m/s after 4 s. Find its average acceleration.",
      hint: "Calculate the change in velocity.",
      steps: ["Change = 12 − 12 = 0 m/s.", "Acceleration = 0 ÷ 4.", "State the result."],
      ans: "0 m/s²",
      why: "There is no change in velocity over the interval."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Selecting the Correct Motion Equation",
  `<h2>Selecting the Correct Motion Equation</h2>
<p>For straight-line motion with constant acceleration, use the equation that contains the quantities given and the quantity required.</p>
<ul>
<li>v = u + at</li>
<li>s = ut + ½at²</li>
<li>v² = u² + 2as</li>
<li>s = ½(u + v)t</li>
</ul>
<p>Here, s is displacement, u is initial velocity, v is final velocity, a is acceleration, and t is time.</p>
<h3>Worked example</h3>
<p>A body starts from rest and accelerates at 2 m/s² for 5 s. Find displacement.</p>
<p>Known: u = 0, a = 2, t = 5. Unknown: s.</p>
<p>Choose s = ut + ½at² because it uses u, a and t.</p>
<p>s = 0 × 5 + ½ × 2 × 25 = 25 m.</p>`,
  [
    {
      q: "You know initial velocity, acceleration and time. Which equation directly gives final velocity?",
      hint: "Choose the equation containing u, a, t and v.",
      steps: ["List the known quantities.", "Identify the unknown as v.", "Select the equation that connects them directly."],
      ans: "v = u + at",
      why: "This equation relates final velocity to initial velocity, acceleration and time."
    },
    {
      q: "You know u, a and t and need displacement. Which equation is most direct?",
      hint: "Look for an equation with s, u, a and t but not v.",
      steps: ["List the known quantities.", "Identify displacement as the unknown.", "Choose the equation that uses only known values and s."],
      ans: "s = ut + ½at²",
      why: "This equation calculates displacement without needing final velocity."
    },
    {
      q: "You know u, v and a but not time. Which equation can find displacement?",
      hint: "Choose an equation without t.",
      steps: ["List u, v and a.", "Exclude equations requiring time.", "Select the equation containing s."],
      ans: "v² = u² + 2as",
      why: "Rearranging this equation gives s = (v² − u²) ÷ 2a."
    },
    {
      q: "A problem gives initial velocity, final velocity and time. Which equation finds displacement directly?",
      hint: "Use average velocity for constant acceleration.",
      steps: ["For uniform acceleration, average velocity = (u + v) ÷ 2.", "Multiply average velocity by time.", "Write the corresponding equation."],
      ans: "s = ½(u + v)t",
      why: "The equation uses average velocity multiplied by elapsed time."
    },
    {
      q: "Why must you check whether acceleration is constant before using these equations?",
      hint: "Consider the assumption behind the equations.",
      steps: ["Identify the motion equations' condition.", "Consider whether acceleration may change.", "Explain why the condition matters."],
      ans: "These equations assume constant acceleration; if acceleration changes, they may not give the correct result.",
      why: "The equations are derived for motion with uniform acceleration."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Solving Motion Problems",
  `<h2>Solving Motion Problems</h2>
<p>Use a consistent process for motion calculations:</p>
<ol>
<li>Write down the known quantities and the unknown.</li>
<li>Convert units where necessary.</li>
<li>Choose a suitable equation for the motion.</li>
<li>Substitute values with their signs and units.</li>
<li>Calculate and check whether the answer is physically reasonable.</li>
</ol>
<h3>Worked example</h3>
<p>A car starts at 4 m/s and accelerates uniformly at 2 m/s² for 3 s. Find its displacement.</p>
<p>Known: u = 4 m/s, a = 2 m/s², t = 3 s.</p>
<p>s = ut + ½at² = (4 × 3) + (½ × 2 × 9) = 12 + 9 = 21 m.</p>
<p>Check: the average velocity is (4 + 10) ÷ 2 = 7 m/s; 7 × 3 = 21 m.</p>`,
  [
    {
      q: "A car starts at 3 m/s and accelerates at 2 m/s² for 4 s. Calculate its final velocity.",
      hint: "Use v = u + at.",
      steps: ["u = 3, a = 2, t = 4.", "v = 3 + (2 × 4).", "Calculate and include units."],
      ans: "11 m/s",
      why: "The velocity increases by 8 m/s from its initial 3 m/s."
    },
    {
      q: "A body starts from rest and accelerates at 3 m/s² for 4 s. Calculate its displacement.",
      hint: "Use s = ut + ½at².",
      steps: ["u = 0, a = 3, t = 4.", "s = 0 × 4 + ½ × 3 × 4².", "Evaluate the expression."],
      ans: "24 m",
      why: "The body starts from rest, so the ut term is zero."
    },
    {
      q: "A vehicle slows from 18 m/s to 6 m/s in 4 s. Calculate its acceleration.",
      hint: "Acceleration = (v − u) ÷ t.",
      steps: ["u = 18 m/s and v = 6 m/s.", "a = (6 − 18) ÷ 4.", "Interpret the sign."],
      ans: "−3 m/s²",
      why: "The negative acceleration shows that velocity decreases in the chosen positive direction."
    },
    {
      q: "An object moving at 5 m/s accelerates uniformly at 2 m/s² through a displacement of 12 m. Find its final speed.",
      hint: "Use v² = u² + 2as.",
      steps: ["v² = 5² + 2 × 2 × 12.", "v² = 25 + 48 = 73.", "Take the positive square root for final speed."],
      ans: "√73 m/s, approximately 8.54 m/s",
      why: "The equation avoids needing to know the time."
    },
    {
      q: "A student calculates displacement using s = ut + ½at² but substitutes time in minutes while velocity is in m/s. What should be corrected?",
      hint: "Check whether the units are consistent.",
      steps: ["The velocity is expressed per second.", "Convert the time to seconds.", "Then substitute into the equation."],
      ans: "Convert time to seconds before substituting.",
      why: "Using inconsistent units produces an incorrect displacement."
    }
  ]
);
add(
  "physics",
  "force_motion_and_mechanics",
  "Free Fall",
  `<h2>Free Fall</h2>
<p>Free fall is motion in which gravity is the only force acting on an object. Air resistance is neglected.</p>
<p>Near Earth's surface, gravitational acceleration is approximately <strong>9.8 m/s²</strong>, often approximated as <strong>10 m/s²</strong> in school calculations when instructed.</p>
<ul>
<li>An object released from rest has initial velocity u = 0.</li>
<li>When upward is positive, gravitational acceleration is negative.</li>
<li>When downward is positive, gravitational acceleration is positive.</li>
</ul>
<h3>Worked example</h3>
<p>A stone is released from rest and falls for 2 s. Take g = 10 m/s².</p>
<p>Using v = u + at:</p>
<p>v = 0 + (10 × 2) = 20 m/s downward.</p>
<p>Using s = ut + ½at²:</p>
<p>s = 0 + ½ × 10 × 2² = 20 m downward.</p>`,
  [
    {
      q: "A stone is released from rest. Taking g = 10 m/s², calculate its speed after 3 s of free fall.",
      hint: "Use v = u + gt with u = 0.",
      steps: ["u = 0, g = 10 m/s², t = 3 s.", "v = 0 + 10 × 3.", "State the speed."],
      ans: "30 m/s",
      why: "Its speed increases by 10 m/s each second under the stated approximation."
    },
    {
      q: "An object falls from rest for 2 s. Take g = 10 m/s². Calculate the distance fallen.",
      hint: "Use s = ut + ½gt².",
      steps: ["u = 0 and t = 2 s.", "s = ½ × 10 × 2².", "Evaluate the expression."],
      ans: "20 m",
      why: "The object starts from rest, so the initial-velocity term is zero."
    },
    {
      q: "A ball is thrown vertically upward. If upward is positive, what is its acceleration near Earth's surface? Take g = 10 m/s².",
      hint: "Gravity acts downward throughout the motion.",
      steps: ["Identify the positive direction as upward.", "Gravity points in the negative direction.", "Apply the sign to g."],
      ans: "−10 m/s²",
      why: "Gravity remains downward even while the ball is moving upward."
    },
    {
      q: "Two objects of different masses fall freely in a vacuum from the same height. Which has the greater gravitational acceleration near Earth?",
      hint: "There is no air resistance in a vacuum.",
      steps: ["Identify the only force as gravity.", "Recall free-fall acceleration near Earth.", "Compare the accelerations."],
      ans: "Neither; they have the same gravitational acceleration.",
      why: "In a vacuum, objects near Earth accelerate equally under gravity regardless of mass."
    },
    {
      q: "A stone is released from rest and falls freely for 4 s. Take g = 10 m/s². Calculate its final velocity, taking downward as positive.",
      hint: "Use v = u + gt.",
      steps: ["u = 0, g = +10 m/s², t = 4 s.", "v = 0 + 10 × 4.", "Include the direction."],
      ans: "+40 m/s",
      why: "The positive result means the stone is moving downward under the chosen sign convention."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's First Law of Motion",
  `<h2>Newton's First Law of Motion</h2>
<p>An object remains at rest or continues moving with constant velocity in a straight line unless acted on by a resultant external force.</p>
<p>This is also called the law of inertia.</p>
<ul>
<li>Zero resultant force means zero acceleration.</li>
<li>An object at rest does not need a continuous resultant force to remain at rest.</li>
<li>An object moving at constant velocity does not need a resultant force to keep it moving at that velocity.</li>
</ul>
<h3>Worked example</h3>
<p>A trolley moves in a straight line at a constant 4 m/s. If the resultant force remains zero, its velocity stays at 4 m/s.</p>
<p>There is no acceleration because the resultant force is zero.</p>`,
  [
    {
      q: "A book rests on a horizontal table. What is the resultant force on it if it remains at rest?",
      hint: "Consider the book's vertical forces.",
      steps: ["The weight acts downward.", "The table's normal reaction acts upward.", "At rest without acceleration, these forces balance."],
      ans: "0 N",
      why: "The upward reaction balances the downward weight."
    },
    {
      q: "A trolley moves in a straight line at constant velocity. What is its acceleration?",
      hint: "Velocity is not changing.",
      steps: ["Identify the velocity as constant.", "Find the change in velocity.", "Relate the change to acceleration."],
      ans: "0 m/s²",
      why: "Acceleration is the rate of change of velocity."
    },
    {
      q: "Why does a passenger tend to move forward when a moving bus stops suddenly?",
      hint: "Think about the passenger's existing motion.",
      steps: ["Before the stop, the passenger moves with the bus.", "The bus slows rapidly.", "The passenger's body tends to maintain its motion."],
      ans: "Inertia causes the passenger's body to tend to continue moving forward.",
      why: "The body resists a change in its state of motion."
    },
    {
      q: "A box is pushed with 20 N to the right and experiences 20 N of friction to the left. What is the resultant horizontal force?",
      hint: "Opposite forces subtract.",
      steps: ["Choose right as positive.", "Resultant force = 20 − 20.", "State the result."],
      ans: "0 N",
      why: "The two horizontal forces balance."
    },
    {
      q: "A spacecraft is moving through deep space with its engines off. If the resultant force is zero, what happens to its velocity?",
      hint: "Apply Newton's first law.",
      steps: ["The resultant force is zero.", "Therefore, acceleration is zero.", "Describe the velocity."],
      ans: "It continues at constant velocity in a straight line.",
      why: "A continuing resultant force is not required to maintain constant velocity."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's Second Law of Motion",
  `<h2>Newton's Second Law of Motion</h2>
<p>The resultant force on an object equals the rate of change of its momentum. For constant mass, this gives:</p>
<p><strong>F = ma</strong></p>
<ul>
<li>F = resultant force in newtons (N)</li>
<li>m = mass in kilograms (kg)</li>
<li>a = acceleration in m/s²</li>
</ul>
<h3>Worked example</h3>
<p>A 4 kg object accelerates at 3 m/s².</p>
<p>F = ma = 4 × 3 = 12 N.</p>
<p>Use the resultant force, not just one force acting on the object.</p>`,
  [
    {
      q: "A 5 kg object accelerates at 2 m/s². Calculate the resultant force.",
      hint: "Use F = ma.",
      steps: ["Write F = ma.", "Substitute 5 × 2.", "Include newtons."],
      ans: "10 N",
      why: "Force equals mass multiplied by acceleration."
    },
    {
      q: "A resultant force of 24 N acts on a 6 kg object. Calculate its acceleration.",
      hint: "Rearrange F = ma.",
      steps: ["a = F ÷ m.", "a = 24 ÷ 6.", "State the acceleration."],
      ans: "4 m/s²",
      why: "Acceleration is resultant force divided by mass."
    },
    {
      q: "A 3 kg object accelerates at 5 m/s². Calculate the resultant force.",
      hint: "Multiply mass by acceleration.",
      steps: ["F = ma.", "F = 3 × 5.", "State the force."],
      ans: "15 N",
      why: "The SI units kg·m/s² are equivalent to a newton."
    },
    {
      q: "A 10 kg trolley experiences a resultant force of 15 N. Calculate its acceleration.",
      hint: "Divide the resultant force by mass.",
      steps: ["a = F ÷ m.", "a = 15 ÷ 10.", "Include m/s²."],
      ans: "1.5 m/s²",
      why: "A given force produces less acceleration when the mass is greater."
    },
    {
      q: "A 2 kg object has zero acceleration. What is its resultant force?",
      hint: "Use F = ma.",
      steps: ["Mass = 2 kg and acceleration = 0 m/s².", "F = 2 × 0.", "State the result."],
      ans: "0 N",
      why: "Zero acceleration means zero resultant force for this constant-mass object."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's Third Law of Motion",
  `<h2>Newton's Third Law of Motion</h2>
<p>When object A exerts a force on object B, object B simultaneously exerts a force of equal magnitude and opposite direction on object A.</p>
<p>The action and reaction forces:</p>
<ul>
<li>Have equal magnitudes and opposite directions.</li>
<li>Act on different objects.</li>
<li>Are the same type of force.</li>
<li>Exist simultaneously.</li>
</ul>
<h3>Worked example</h3>
<p>A swimmer pushes water backward. The water exerts a forward force on the swimmer.</p>
<p>The forces are equal in magnitude and opposite in direction, but act on different objects.</p>`,
  [
    {
      q: "A person pushes a wall with a force of 50 N. What force does the wall exert on the person?",
      hint: "Use Newton's third law.",
      steps: ["Identify the force exerted on the wall.", "Apply the equal-and-opposite rule.", "Identify the force acting on the person."],
      ans: "50 N in the opposite direction",
      why: "The wall and person exert equal and opposite forces on each other."
    },
    {
      q: "A swimmer pushes water backward. In which direction does the water's force on the swimmer act?",
      hint: "The reaction force opposes the swimmer's force on the water.",
      steps: ["The swimmer exerts a backward force on the water.", "The water exerts an opposite force on the swimmer.", "State the direction."],
      ans: "Forward",
      why: "The forward reaction force helps propel the swimmer."
    },
    {
      q: "Why do action and reaction forces not cancel each other on a single object?",
      hint: "Identify the object on which each force acts.",
      steps: ["Identify the first force and its object.", "Identify the reaction force and its object.", "Compare the objects."],
      ans: "They act on different objects.",
      why: "Forces cancel as a resultant only when they act on the same object."
    },
    {
      q: "A hammer exerts a force of 100 N on a nail. What is the magnitude of the force exerted by the nail on the hammer?",
      hint: "The force pair has equal magnitude.",
      steps: ["Identify the hammer's force on the nail.", "Apply Newton's third law.", "Give the reaction force's magnitude."],
      ans: "100 N",
      why: "The nail exerts an equal-magnitude force on the hammer in the opposite direction."
    },
    {
      q: "A book presses down on a table. Which object experiences the reaction force to the book's downward force on the table?",
      hint: "The reaction must act on the other member of the interaction.",
      steps: ["Identify the book's force on the table.", "Find the equal and opposite force.", "Name the object on which it acts."],
      ans: "The book experiences an upward force from the table.",
      why: "The table pushes upward on the book while the book pushes downward on the table."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Mass and Inertia",
  `<h2>Mass and Inertia</h2>
<p>Inertia is the tendency of an object to resist a change in its state of rest or motion.</p>
<p>Mass is a measure of an object's inertia.</p>
<ul>
<li>Mass is measured in kilograms (kg).</li>
<li>Greater mass means greater inertia.</li>
<li>Mass does not depend on location.</li>
<li>Weight is a gravitational force and can change with gravitational field strength.</li>
</ul>
<h3>Worked example</h3>
<p>A 10 kg trolley has more inertia than a 2 kg trolley. A greater resultant force is required to give the 10 kg trolley the same acceleration.</p>
<p>From F = ma, for the same acceleration, force increases with mass.</p>`,
  [
    {
      q: "Which has greater inertia: a 12 kg cart or a 4 kg cart?",
      hint: "Compare their masses.",
      steps: ["Identify the two masses.", "Recall that mass measures inertia.", "Compare the values."],
      ans: "The 12 kg cart",
      why: "Greater mass means greater inertia."
    },
    {
      q: "What is the SI unit of mass?",
      hint: "It is not the newton.",
      steps: ["Identify mass as a quantity.", "Recall its SI unit.", "Distinguish it from the unit of weight."],
      ans: "Kilogram (kg)",
      why: "The newton is the unit of force, including weight."
    },
    {
      q: "An object is moved from Earth to the Moon. What happens to its mass?",
      hint: "Mass is different from weight.",
      steps: ["Recall that mass measures inertia.", "Consider whether the object's amount of matter changes.", "Distinguish mass from gravitational force."],
      ans: "Its mass remains the same.",
      why: "Changing location changes gravitational field strength, not the object's mass."
    },
    {
      q: "Why is a heavily loaded trolley harder to accelerate than an empty trolley under the same resultant force?",
      hint: "Use F = ma.",
      steps: ["The loaded trolley has greater mass.", "Rearrange to a = F ÷ m.", "Compare acceleration for the same force."],
      ans: "Its greater mass gives it greater inertia and a smaller acceleration.",
      why: "For a fixed resultant force, acceleration decreases as mass increases."
    },
    {
      q: "A 5 kg object is on Earth and then on the Moon. Which quantity changes because gravity is weaker on the Moon: mass or weight?",
      hint: "Weight depends on gravitational field strength.",
      steps: ["Mass is measured in kilograms and stays constant.", "Weight = mass × gravitational field strength.", "Identify the changing quantity."],
      ans: "Weight",
      why: "The gravitational field strength is lower on the Moon, so the object's weight is lower."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Force, Mass and Acceleration Calculations",
  `<h2>Force, Mass and Acceleration Calculations</h2>
<p>For an object of constant mass:</p>
<p><strong>F = ma</strong></p>
<p>Rearrange depending on the unknown:</p>
<ul>
<li>Force: F = ma</li>
<li>Mass: m = F ÷ a</li>
<li>Acceleration: a = F ÷ m</li>
</ul>
<p>F must be the resultant force acting on the object.</p>
<h3>Worked example</h3>
<p>A resultant force of 18 N gives an object an acceleration of 3 m/s².</p>
<p>m = F ÷ a = 18 ÷ 3 = 6 kg.</p>
<p>Check: 6 × 3 = 18 N.</p>`,
  [
    {
      q: "A resultant force of 35 N acts on a 7 kg object. Calculate acceleration.",
      hint: "a = F ÷ m.",
      steps: ["a = 35 ÷ 7.", "Calculate the quotient.", "State the unit."],
      ans: "5 m/s²",
      why: "Acceleration is the resultant force divided by mass."
    },
    {
      q: "An object accelerates at 4 m/s² under a resultant force of 28 N. Calculate its mass.",
      hint: "m = F ÷ a.",
      steps: ["m = 28 ÷ 4.", "Calculate the mass.", "Include kilograms."],
      ans: "7 kg",
      why: "Mass is force divided by acceleration."
    },
    {
      q: "A 6 kg object accelerates at 1.5 m/s². Find the resultant force.",
      hint: "F = ma.",
      steps: ["F = 6 × 1.5.", "Calculate the product.", "Include newtons."],
      ans: "9 N",
      why: "Force is proportional to mass and acceleration."
    },
    {
      q: "A 10 kg object experiences a 50 N force to the right and a 20 N force to the left. Calculate its acceleration.",
      hint: "Find the resultant force first.",
      steps: ["Resultant force = 50 − 20 = 30 N to the right.", "a = F ÷ m = 30 ÷ 10.", "State the magnitude and direction."],
      ans: "3 m/s² to the right",
      why: "Newton's second law uses the resultant, not the individual 50 N force."
    },
    {
      q: "A 4 kg object experiences a resultant force of 0 N. What is its acceleration?",
      hint: "Use a = F ÷ m.",
      steps: ["a = 0 ÷ 4.", "Evaluate the expression.", "State the result."],
      ans: "0 m/s²",
      why: "A zero resultant force gives zero acceleration."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Mass and Weight",
  `<h2>Mass and Weight</h2>
<p>Mass measures inertia and is measured in kilograms (kg). Weight is the gravitational force acting on an object and is measured in newtons (N).</p>
<p><strong>Weight: W = mg</strong></p>
<ul>
<li>W = weight in N</li>
<li>m = mass in kg</li>
<li>g = gravitational field strength in N/kg (numerically equal to m/s²)</li>
</ul>
<h3>Worked example</h3>
<p>A 6 kg object is in a gravitational field of 10 N/kg.</p>
<p>W = mg = 6 × 10 = 60 N.</p>
<p>Mass stays the same when location changes, but weight changes with gravitational field strength.</p>`,
  [
    {
      q: "Calculate the weight of a 5 kg object where g = 10 N/kg.",
      hint: "Use W = mg.",
      steps: ["W = 5 × 10.", "Calculate the product.", "State the unit."],
      ans: "50 N",
      why: "Weight is mass multiplied by gravitational field strength."
    },
    {
      q: "An object has weight 80 N where g = 10 N/kg. Calculate its mass.",
      hint: "Rearrange W = mg.",
      steps: ["m = W ÷ g.", "m = 80 ÷ 10.", "State the mass in kilograms."],
      ans: "8 kg",
      why: "Mass is weight divided by gravitational field strength."
    },
    {
      q: "A 3 kg object is on the Moon, where g = 1.6 N/kg. Calculate its weight.",
      hint: "Use the Moon's gravitational field strength.",
      steps: ["W = mg.", "W = 3 × 1.6.", "State the result in newtons."],
      ans: "4.8 N",
      why: "Weight depends on local gravitational field strength."
    },
    {
      q: "An object has a mass of 2 kg on Earth and on the Moon. What is its mass on the Moon?",
      hint: "Mass does not depend on gravitational field strength.",
      steps: ["Identify the given mass.", "Recall the meaning of mass.", "State the mass at the new location."],
      ans: "2 kg",
      why: "Its mass remains constant when it is moved to another location."
    },
    {
      q: "A 10 kg object weighs 98 N. Calculate the gravitational field strength.",
      hint: "g = W ÷ m.",
      steps: ["g = 98 ÷ 10.", "Calculate the result.", "State N/kg."],
      ans: "9.8 N/kg",
      why: "Gravitational field strength is weight per unit mass."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Gravitational Field Strength",
  `<h2>Gravitational Field Strength</h2>
<p>Gravitational field strength at a location is the gravitational force acting per unit mass on an object placed there.</p>
<p><strong>g = W ÷ m</strong></p>
<p>Its SI unit is N/kg. Near Earth's surface, g is approximately 9.8 N/kg, often rounded to 10 N/kg when a question instructs you to use that value.</p>
<h3>Worked example</h3>
<p>A 4 kg object has a weight of 39.2 N.</p>
<p>g = W ÷ m = 39.2 ÷ 4 = 9.8 N/kg.</p>
<p>Do not confuse gravitational field strength with the object's mass.</p>`,
  [
    {
      q: "A 5 kg object weighs 50 N. Calculate gravitational field strength.",
      hint: "g = W ÷ m.",
      steps: ["g = 50 ÷ 5.", "Calculate the quotient.", "State the unit."],
      ans: "10 N/kg",
      why: "Field strength is gravitational force per unit mass."
    },
    {
      q: "A 2 kg object has a weight of 19.6 N. Calculate g.",
      hint: "Divide weight by mass.",
      steps: ["g = 19.6 ÷ 2.", "Calculate the value.", "Include N/kg."],
      ans: "9.8 N/kg",
      why: "The result gives the gravitational force on each kilogram."
    },
    {
      q: "What does a gravitational field strength of 8 N/kg mean?",
      hint: "Interpret the phrase 'per unit mass'.",
      steps: ["Read N/kg as newtons per kilogram.", "Consider a mass of 1 kg.", "State the gravitational force on it."],
      ans: "A 1 kg mass experiences a gravitational force of 8 N.",
      why: "Field strength is force per kilogram."
    },
    {
      q: "A 10 kg object is in a field of 3 N/kg. Calculate its weight.",
      hint: "W = mg.",
      steps: ["W = 10 × 3.", "Calculate the product.", "State the force in newtons."],
      ans: "30 N",
      why: "Weight is mass multiplied by field strength."
    },
    {
      q: "An object's mass is 6 kg on Earth and on the Moon. Why can its weight differ?",
      hint: "Compare the local values of g.",
      steps: ["Weight = mg.", "The mass remains 6 kg.", "The gravitational field strength differs by location."],
      ans: "Because gravitational field strength differs between Earth and the Moon.",
      why: "Weight changes with g even when mass stays constant."
    }
  ]
);
add(
  "physics",
  "force_motion_and_mechanics",
  "Calculating Weight",
  `<h2>Calculating Weight</h2>
<p>Weight is the gravitational force acting on an object.</p>
<p><strong>W = mg</strong></p>
<ul>
<li>W = weight in newtons (N)</li>
<li>m = mass in kilograms (kg)</li>
<li>g = gravitational field strength in N/kg</li>
</ul>
<h3>Worked example</h3>
<p>Calculate the weight of a 7 kg object where g = 10 N/kg.</p>
<p>W = 7 × 10 = 70 N.</p>
<p>Always use mass in kilograms and the gravitational field strength specified in the question.</p>`,
  [
    {
      q: "Calculate the weight of a 4 kg object where g = 10 N/kg.",
      hint: "Use W = mg.",
      steps: ["W = 4 × 10.", "Multiply the mass by the field strength.", "State the answer in newtons."],
      ans: "40 N",
      why: "Weight is the gravitational force on the object."
    },
    {
      q: "A body has a mass of 12 kg. Calculate its weight where g = 9.8 N/kg.",
      hint: "Multiply mass by 9.8.",
      steps: ["W = mg.", "W = 12 × 9.8.", "Calculate the product."],
      ans: "117.6 N",
      why: "The question specifies a gravitational field strength of 9.8 N/kg."
    },
    {
      q: "An object weighs 60 N where g = 10 N/kg. Calculate its mass.",
      hint: "Rearrange W = mg.",
      steps: ["m = W ÷ g.", "m = 60 ÷ 10.", "Include kilograms."],
      ans: "6 kg",
      why: "Mass is weight divided by gravitational field strength."
    },
    {
      q: "A 2 kg object is on the Moon, where g = 1.6 N/kg. Calculate its weight.",
      hint: "Use the Moon's field strength, not Earth's.",
      steps: ["W = mg.", "W = 2 × 1.6.", "State the result in newtons."],
      ans: "3.2 N",
      why: "The object's weight depends on the local gravitational field strength."
    },
    {
      q: "A student calculates the weight of a 500 g object using W = 500 × 10. What should be corrected?",
      hint: "The formula requires mass in kilograms.",
      steps: ["Convert 500 g to kilograms.", "500 g = 0.5 kg.", "Calculate W = 0.5 × 10."],
      ans: "The mass must be converted to 0.5 kg; the weight is 5 N.",
      why: "Using grams directly in W = mg gives an incorrect result."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Density",
  `<h2>Density</h2>
<p>Density is mass per unit volume.</p>
<p><strong>Density = Mass ÷ Volume</strong></p>
<p>Common units are kg/m³ and g/cm³. The mass and volume units must be compatible.</p>
<h3>Worked example</h3>
<p>A block has mass 600 g and volume 200 cm³.</p>
<p>Density = 600 ÷ 200 = 3 g/cm³.</p>
<p>Density describes how much mass is contained in a given volume.</p>`,
  [
    {
      q: "A block has mass 300 g and volume 100 cm³. Calculate its density.",
      hint: "Density = mass ÷ volume.",
      steps: ["Write density = 300 ÷ 100.", "Calculate the quotient.", "Include g/cm³."],
      ans: "3 g/cm³",
      why: "Each cubic centimetre contains 3 g of mass."
    },
    {
      q: "An object has mass 2 kg and volume 0.5 m³. Calculate its density.",
      hint: "Keep the units in kg and m³.",
      steps: ["Density = mass ÷ volume.", "Density = 2 ÷ 0.5.", "State kg/m³."],
      ans: "4 kg/m³",
      why: "Density is the mass divided by the volume occupied."
    },
    {
      q: "A material has density 8 g/cm³ and volume 5 cm³. Calculate its mass.",
      hint: "Rearrange density = mass ÷ volume.",
      steps: ["Mass = density × volume.", "Mass = 8 × 5.", "Include grams."],
      ans: "40 g",
      why: "Mass equals density multiplied by volume."
    },
    {
      q: "A liquid has mass 900 g and density 1.5 g/cm³. Calculate its volume.",
      hint: "Volume = mass ÷ density.",
      steps: ["Volume = 900 ÷ 1.5.", "Calculate the quotient.", "State cm³."],
      ans: "600 cm³",
      why: "Dividing mass by density gives the volume."
    },
    {
      q: "Two blocks have equal volumes. Block A has mass 200 g and block B has mass 500 g. Which has greater density?",
      hint: "Compare mass when volume is the same.",
      steps: ["Density = mass ÷ volume.", "Both blocks have the same volume.", "The block with greater mass has greater density."],
      ans: "Block B",
      why: "For equal volumes, the greater mass corresponds to the greater density."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Calculating Density",
  `<h2>Calculating Density</h2>
<p>Use <strong>ρ = m/V</strong>, where ρ is density, m is mass and V is volume.</p>
<p>Rearrange the formula according to the unknown:</p>
<ul>
<li>Density: ρ = m/V</li>
<li>Mass: m = ρV</li>
<li>Volume: V = m/ρ</li>
</ul>
<p>For a regularly shaped solid, volume can be calculated from its dimensions. For an irregular solid, volume can be found by liquid displacement when appropriate.</p>
<h3>Worked example</h3>
<p>A metal block has mass 540 g and volume 60 cm³.</p>
<p>ρ = 540 ÷ 60 = 9 g/cm³.</p>`,
  [
    {
      q: "A stone has mass 240 g and volume 80 cm³. Calculate its density.",
      hint: "Divide mass by volume.",
      steps: ["ρ = m/V.", "ρ = 240 ÷ 80.", "State the unit."],
      ans: "3 g/cm³",
      why: "Density is mass per unit volume."
    },
    {
      q: "A cube has side length 2 cm and mass 64 g. Calculate its density.",
      hint: "First calculate the cube's volume.",
      steps: ["Volume = side³ = 2 × 2 × 2 = 8 cm³.", "Density = 64 ÷ 8.", "State g/cm³."],
      ans: "8 g/cm³",
      why: "The density calculation requires the cube's full volume, not just one side."
    },
    {
      q: "A liquid has density 2 g/cm³ and volume 35 cm³. Find its mass.",
      hint: "Mass = density × volume.",
      steps: ["m = ρV.", "m = 2 × 35.", "State the mass."],
      ans: "70 g",
      why: "Multiplying density by volume gives mass."
    },
    {
      q: "A solid has mass 150 g and density 3 g/cm³. Calculate its volume.",
      hint: "V = m/ρ.",
      steps: ["V = 150 ÷ 3.", "Calculate the quotient.", "Include cm³."],
      ans: "50 cm³",
      why: "Volume equals mass divided by density."
    },
    {
      q: "An irregular stone raises the water level in a measuring cylinder from 40 cm³ to 65 cm³. Its mass is 75 g. Calculate its density.",
      hint: "The increase in water volume equals the stone's volume if it is fully submerged and does not absorb water.",
      steps: ["Volume = 65 − 40 = 25 cm³.", "Density = 75 ÷ 25.", "State the result."],
      ans: "3 g/cm³",
      why: "Liquid displacement measures the volume of the submerged irregular solid."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Relative Density",
  `<h2>Relative Density</h2>
<p>Relative density compares the density of a substance with the density of water at the same reference conditions.</p>
<p><strong>Relative density = Density of substance ÷ Density of water</strong></p>
<p>Relative density has no unit because it is a ratio of two densities expressed in compatible units.</p>
<p>For many school calculations, the density of water is taken as 1 g/cm³ or 1000 kg/m³.</p>
<h3>Worked example</h3>
<p>A liquid has density 0.8 g/cm³.</p>
<p>Relative density = 0.8 ÷ 1 = 0.8.</p>`,
  [
    {
      q: "A liquid has density 2 g/cm³. Calculate its relative density using water density 1 g/cm³.",
      hint: "Divide the substance's density by water's density.",
      steps: ["Relative density = 2 ÷ 1.", "Calculate the ratio.", "Do not attach a unit."],
      ans: "2",
      why: "Relative density is a ratio and has no unit."
    },
    {
      q: "A substance has density 800 kg/m³. Take water density as 1000 kg/m³. Find its relative density.",
      hint: "Use the same density units in numerator and denominator.",
      steps: ["Relative density = 800 ÷ 1000.", "Calculate the ratio.", "State it without a unit."],
      ans: "0.8",
      why: "The substance has 0.8 times the density of water."
    },
    {
      q: "A solid has relative density 7 and volume 10 cm³. Take water density as 1 g/cm³. Calculate the solid's mass.",
      hint: "First convert relative density into density.",
      steps: ["Density = 7 × 1 = 7 g/cm³.", "Mass = density × volume.", "Mass = 7 × 10."],
      ans: "70 g",
      why: "Relative density 7 corresponds to a density of 7 g/cm³ under the stated reference."
    },
    {
      q: "A liquid has relative density 0.75. What is its density in kg/m³ if water density is 1000 kg/m³?",
      hint: "Density = relative density × water density.",
      steps: ["Density = 0.75 × 1000.", "Calculate the product.", "State kg/m³."],
      ans: "750 kg/m³",
      why: "Relative density gives the ratio of the substance's density to water's density."
    },
    {
      q: "A student writes the relative density of a substance as 1.4 g/cm³. What is wrong?",
      hint: "Check whether a ratio has a unit.",
      steps: ["Relative density is density divided by density.", "The units cancel.", "Remove the unit."],
      ans: "Relative density is dimensionless, so it should be written as 1.4 without a unit.",
      why: "A ratio of compatible density units has no remaining unit."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Causes of Friction",
  `<h2>Causes of Friction</h2>
<p>Friction is a force that opposes relative motion, or the tendency of relative motion, between surfaces in contact.</p>
<p>Friction occurs because contacting surfaces have microscopic irregularities and because the surfaces can interact at their contact points.</p>
<ul>
<li>Roughness can increase resistance to sliding.</li>
<li>The force pressing surfaces together can affect friction.</li>
<li>Lubricants can reduce direct contact between surfaces.</li>
</ul>
<h3>Worked example</h3>
<p>A box is pushed across a rough floor. The floor exerts a frictional force opposite the box's sliding direction.</p>
<p>If the box is pushed to the right, kinetic friction acts to the left.</p>`,
  [
    {
      q: "A box slides to the right across a rough floor. In which direction does kinetic friction act?",
      hint: "Friction opposes relative sliding.",
      steps: ["Identify the sliding direction.", "Apply the opposing-force rule.", "State the friction direction."],
      ans: "To the left",
      why: "Kinetic friction opposes the relative sliding of the surfaces."
    },
    {
      q: "Why can a rough surface produce greater friction than a smooth surface?",
      hint: "Think about microscopic surface irregularities and contact.",
      steps: ["Surfaces have microscopic features.", "These features interact during sliding.", "Relate the interactions to resistance."],
      ans: "Microscopic irregularities and surface interactions can increase resistance to sliding.",
      why: "Friction depends partly on the nature of the contacting surfaces."
    },
    {
      q: "A person pushes a stationary heavy box, but it does not move. What type of friction can oppose the attempted motion?",
      hint: "The surfaces have not begun sliding.",
      steps: ["The box remains stationary.", "Relative sliding has not started.", "Identify the friction involved."],
      ans: "Static friction",
      why: "Static friction opposes the tendency for surfaces to begin moving relative to one another."
    },
    {
      q: "Why can applying oil to a moving machine part reduce friction?",
      hint: "Consider what the lubricant does between surfaces.",
      steps: ["Oil forms a lubricating layer.", "The layer reduces direct contact between surface irregularities.", "Relate this to friction."],
      ans: "Oil reduces direct contact between surfaces and can reduce friction.",
      why: "Lubrication reduces resistance and can also limit wear."
    },
    {
      q: "A box is pushed harder against a floor. What generally happens to the maximum static friction if the surfaces remain unchanged?",
      hint: "Consider the normal contact force.",
      steps: ["A harder downward push increases the normal force.", "Maximum static friction depends on normal force.", "State the general effect."],
      ans: "The maximum static friction generally increases.",
      why: "For the same surfaces, maximum static friction is approximately proportional to the normal force."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Effects of Friction",
  `<h2>Effects of Friction</h2>
<p>Friction can be useful or undesirable depending on the situation.</p>
<h3>Useful effects</h3>
<ul>
<li>It allows shoes to grip the ground when walking.</li>
<li>It helps vehicle tyres grip the road.</li>
<li>It enables brakes to slow vehicles.</li>
</ul>
<h3>Undesirable effects</h3>
<ul>
<li>It causes wear of contacting surfaces.</li>
<li>It can produce unwanted heating.</li>
<li>It wastes some useful mechanical energy through dissipation.</li>
</ul>
<h3>Worked example</h3>
<p>Car brakes use friction to reduce the car's kinetic energy. Some of that energy is transferred to thermal energy in the brakes and surrounding materials.</p>`,
  [
    {
      q: "Why is friction between shoes and the ground useful when walking?",
      hint: "Think about preventing the foot from slipping.",
      steps: ["The foot pushes against the ground.", "Friction provides grip.", "Explain how grip helps walking."],
      ans: "It provides grip and helps prevent slipping.",
      why: "Friction enables the foot to push against the ground without sliding uncontrollably."
    },
    {
      q: "State one undesirable effect of friction in a machine.",
      hint: "Consider energy transfer and surface contact.",
      steps: ["Identify the moving contacting parts.", "Consider what friction transfers or changes.", "Give one effect."],
      ans: "It can cause wear or unwanted heating.",
      why: "Friction can damage surfaces and transfer mechanical energy into thermal energy."
    },
    {
      q: "How does friction help a car stop when its brakes are applied?",
      hint: "The brakes oppose wheel motion.",
      steps: ["Brakes create frictional forces.", "These forces oppose motion.", "Kinetic energy is transferred to other forms."],
      ans: "Friction slows the wheels and transfers kinetic energy mainly into thermal energy.",
      why: "Braking friction reduces the vehicle's kinetic energy."
    },
    {
      q: "Why can friction between moving machine parts reduce efficiency?",
      hint: "Not all input energy becomes useful output.",
      steps: ["The machine receives energy.", "Friction transfers some energy to unwanted heating and sound.", "Compare useful output with input."],
      ans: "Some input energy is dissipated rather than transferred into useful output.",
      why: "Energy dissipated by friction reduces the fraction available for useful work."
    },
    {
      q: "A person cannot walk easily on a very slippery surface. Which useful effect of friction is missing?",
      hint: "Walking requires a force against the ground without slipping.",
      steps: ["Identify the lack of grip.", "Relate grip to friction.", "Explain the difficulty walking."],
      ans: "There is insufficient friction to provide grip.",
      why: "Without enough friction, the foot slides instead of pushing effectively against the ground."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Advantages and Disadvantages of Friction",
  `<h2>Advantages and Disadvantages of Friction</h2>
<p>Whether friction is helpful depends on the task.</p>
<table>
<tr><th>Advantages</th><th>Disadvantages</th></tr>
<tr><td>Enables walking and gripping</td><td>Causes wear</td></tr>
<tr><td>Allows braking</td><td>Produces unwanted heat</td></tr>
<tr><td>Helps writing with a pencil</td><td>Can reduce machine efficiency</td></tr>
</table>
<p>Friction should be increased where grip is needed and reduced where unwanted resistance causes problems.</p>
<h3>Worked example</h3>
<p>Tyre tread helps provide grip on the road, while lubricating oil reduces friction between moving engine parts.</p>`,
  [
    {
      q: "Give one advantage of friction when writing with a pencil.",
      hint: "Consider the contact between the pencil and paper.",
      steps: ["The pencil tip contacts the paper.", "Friction helps material transfer to the paper.", "State the advantage."],
      ans: "Friction helps the pencil leave marks on the paper.",
      why: "Contact and friction allow graphite to be deposited on the paper."
    },
    {
      q: "Give one disadvantage of friction between moving engine parts.",
      hint: "Think about energy loss or surface damage.",
      steps: ["The parts rub against each other.", "Friction can produce heat and wear.", "State one disadvantage."],
      ans: "It causes wear or unwanted heating and reduces efficiency.",
      why: "Friction can dissipate useful mechanical energy and damage surfaces."
    },
    {
      q: "Why is friction between a vehicle's tyres and the road an advantage?",
      hint: "Think about starting, steering and stopping.",
      steps: ["Tyres contact the road.", "Friction provides grip.", "Explain its effect on vehicle control."],
      ans: "It provides grip for acceleration, steering and braking.",
      why: "Without sufficient friction, tyres may slide and control is reduced."
    },
    {
      q: "Why is friction between a moving shaft and its bearing often undesirable?",
      hint: "Consider heating and wear.",
      steps: ["The surfaces move relative to each other.", "Friction opposes their motion.", "Identify the unwanted results."],
      ans: "It can cause wear, heating and energy dissipation.",
      why: "These effects can damage the machine and reduce efficiency."
    },
    {
      q: "A designer adds a rough grip to a tool handle. Is the intended effect to increase or decrease friction?",
      hint: "The handle should not slip from the user's hand.",
      steps: ["Identify the need for grip.", "Grip depends on friction.", "Choose the required change."],
      ans: "Increase friction",
      why: "Greater grip helps prevent the handle from slipping."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Reducing and Increasing Friction",
  `<h2>Reducing and Increasing Friction</h2>
<p>Friction can be controlled according to the purpose of the device.</p>
<h3>Ways to reduce friction</h3>
<ul>
<li>Lubricate surfaces with oil or grease.</li>
<li>Use rollers or ball bearings to replace sliding with rolling.</li>
<li>Smooth suitable contacting surfaces.</li>
</ul>
<h3>Ways to increase friction</h3>
<ul>
<li>Use rough or patterned surfaces where grip is needed.</li>
<li>Use tyre tread and suitable shoe soles.</li>
<li>Apply brakes to create frictional resistance.</li>
</ul>
<h3>Worked example</h3>
<p>Ball bearings in a wheel reduce resistance by allowing rolling between surfaces instead of direct sliding.</p>`,
  [
    {
      q: "Which method is commonly used to reduce friction between moving engine parts?",
      hint: "Think of a substance placed between the surfaces.",
      steps: ["Identify the contacting moving parts.", "Consider a lubricant.", "Name a suitable method."],
      ans: "Lubrication with oil or grease",
      why: "Lubricants reduce direct contact and resistance between moving surfaces."
    },
    {
      q: "Why are ball bearings used in wheels?",
      hint: "They change the type of motion between surfaces.",
      steps: ["Identify the relative motion of the parts.", "Ball bearings allow rolling.", "Relate rolling to resistance."],
      ans: "They reduce friction by replacing much sliding contact with rolling contact.",
      why: "Rolling resistance is generally lower than sliding friction in this application."
    },
    {
      q: "Why do vehicle tyres have tread patterns?",
      hint: "Consider grip, especially on wet roads.",
      steps: ["Tyres need road grip.", "Tread patterns help channel water and maintain contact.", "Explain the intended benefit."],
      ans: "They help maintain grip and reduce the risk of slipping, particularly on wet surfaces.",
      why: "Tread helps water escape from the contact area and supports traction."
    },
    {
      q: "A tool handle is too slippery. Suggest one way to increase friction.",
      hint: "Change the surface where the hand grips.",
      steps: ["Identify the need for better grip.", "Choose a rougher or higher-grip surface.", "Give a practical example."],
      ans: "Add a rough rubber grip or textured surface.",
      why: "A suitable textured surface can increase grip and reduce slipping."
    },
    {
      q: "Why is smoothing every surface not always the best way to manage friction?",
      hint: "Some applications require grip.",
      steps: ["Identify a surface that needs traction.", "Consider what happens if friction is too low.", "Explain why surface design depends on purpose."],
      ans: "Some surfaces, such as tyres and shoe soles, need sufficient friction for grip.",
      why: "Reducing friction is useful in machines but can be dangerous where traction is required."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Air Resistance and Terminal Velocity",
  `<h2>Air Resistance and Terminal Velocity</h2>
<p>Air resistance is a force that opposes an object's motion relative to air. It depends on factors including speed, shape and exposed area.</p>
<p>When an object falls:</p>
<ol>
<li>At first, its weight acts downward and air resistance is small.</li>
<li>As its speed increases, air resistance generally increases.</li>
<li>The resultant downward force decreases.</li>
<li>When air resistance equals weight, the resultant force becomes zero.</li>
</ol>
<p><strong>Terminal velocity</strong> is the constant velocity reached when the resultant force is zero.</p>
<h3>Worked example</h3>
<p>A falling object has weight 40 N downward and air resistance 40 N upward.</p>
<p>Resultant force = 40 − 40 = 0 N.</p>
<p>Its acceleration is zero. If it is already moving, it continues at constant velocity: terminal velocity.</p>`,
  [
    {
      q: "A falling object has weight 60 N downward and air resistance 15 N upward. Calculate the resultant force.",
      hint: "Take downward as positive and subtract the opposing forces.",
      steps: ["Weight = +60 N.", "Air resistance = −15 N.", "Resultant force = 60 − 15."],
      ans: "45 N downward",
      why: "Weight is greater than air resistance, so the resultant force is downward."
    },
    {
      q: "A falling object reaches terminal velocity. How do weight and air resistance compare?",
      hint: "Terminal velocity means no acceleration.",
      steps: ["At terminal velocity, acceleration is zero.", "Resultant force is therefore zero.", "Compare the downward and upward forces."],
      ans: "Air resistance equals weight in magnitude and acts in the opposite direction.",
      why: "Balanced forces produce zero resultant force."
    },
    {
      q: "Why does air resistance usually increase as a falling object's speed increases?",
      hint: "Consider how quickly the object moves through the air.",
      steps: ["The object moves faster through the air.", "The interaction with air becomes stronger.", "Relate this to the resistive force."],
      ans: "The faster motion generally produces a greater resistive force from the air.",
      why: "Air resistance depends on speed and the object's shape and exposed area."
    },
    {
      q: "A parachutist opens a parachute. Explain why the parachutist slows down initially.",
      hint: "The parachute greatly increases exposed area.",
      steps: ["Opening the parachute increases air resistance.", "Air resistance becomes greater than weight for a period.", "The resultant force acts upward while the parachutist moves downward."],
      ans: "The increased air resistance creates an upward resultant force, causing downward motion to slow.",
      why: "A force opposite the direction of motion reduces speed."
    },
    {
      q: "A falling object has weight 50 N and air resistance 50 N. If it is already moving downward, what happens to its speed?",
      hint: "Calculate the resultant force first.",
      steps: ["Resultant force = 50 − 50 = 0 N.", "Zero resultant force means zero acceleration.", "Describe its velocity."],
      ans: "It continues downward at constant speed.",
      why: "Balanced forces mean no acceleration, not necessarily that the object is stationary."
    }
  ]
);
add(
  "physics",
  "pressure",
  "Pressure and Force",
  `<h2>What is pressure?</h2>
  <p><b>Pressure</b> is the normal force acting per unit area of a surface.</p>
  <p>Formula: <b>P = F/A</b></p>
  <ul>
    <li>P = pressure in pascals (Pa)</li>
    <li>F = perpendicular force in newtons (N)</li>
    <li>A = area in square metres (m²)</li>
  </ul>
  <p>One pascal is one newton per square metre: 1 Pa = 1 N/m².</p>
  <h3>Worked example</h3>
  <p>A force of 60 N acts normally on an area of 3 m².</p>
  <p>P = F/A = 60/3 = <b>20 Pa</b>.</p>
  <p><b>Key idea:</b> Pressure depends on both the force and the area over which it acts.</p>`,
  [
    {
      q: "What is pressure?",
      hint: "Think of force acting over a surface.",
      steps: ["Pressure is the normal force per unit area.", "Write P = F/A."],
      ans: "Normal force per unit area",
      why: "Pressure describes how concentrated a force is over a surface."
    },
    {
      q: "A force of 40 N acts normally on an area of 2 m². Calculate the pressure.",
      hint: "Divide force by area.",
      steps: ["P = F/A", "P = 40/2", "P = 20 Pa"],
      ans: "20 Pa",
      why: "Pressure is force divided by the area over which the force acts."
    },
    {
      q: "What is the SI unit of pressure?",
      hint: "It is equivalent to one newton per square metre.",
      steps: ["P = F/A", "The SI unit is N/m², called the pascal."],
      ans: "Pascal (Pa)",
      why: "One pascal equals one newton per square metre."
    },
    {
      q: "A student says pressure is measured in newtons. What is the error?",
      hint: "Newtons measure force, not force per unit area.",
      steps: ["Force is measured in newtons.", "Pressure is force divided by area.", "Pressure is measured in pascals."],
      ans: "Pressure is measured in pascals, not newtons.",
      why: "The newton measures force; the pascal measures pressure."
    },
    {
      q: "A force of 100 N acts normally on an area of 5 m². Calculate the pressure.",
      hint: "Use P = F/A.",
      steps: ["P = 100/5", "P = 20 Pa"],
      ans: "20 Pa",
      why: "Dividing the force by the area gives the pressure."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Calculating Pressure in Solids",
  `<h2>How area affects pressure</h2>
  <p>For a solid surface, pressure is calculated using:</p>
  <p><b>P = F/A</b></p>
  <p>For the same force, a smaller contact area produces greater pressure. A larger contact area produces lower pressure.</p>
  <h3>Worked example</h3>
  <p>A block exerts a force of 120 N over an area of 0.04 m².</p>
  <p>P = 120/0.04 = <b>3,000 Pa</b>.</p>
  <p><b>Watch the units:</b> area must be in m². Convert cm² to m² before substituting.</p>
  <p>Example: 20 cm² = 20 ÷ 10,000 = 0.002 m².</p>`,
  [
    {
      q: "A force of 80 N acts on an area of 4 m². Find the pressure.",
      hint: "Divide the force by the area.",
      steps: ["P = F/A", "P = 80/4", "P = 20 Pa"],
      ans: "20 Pa",
      why: "Pressure equals force divided by contact area."
    },
    {
      q: "The same force acts on two surfaces. Which has greater pressure?",
      hint: "Compare their contact areas.",
      steps: ["Use P = F/A.", "When F stays constant, decreasing A increases P."],
      ans: "The surface with the smaller contact area",
      why: "The same force is concentrated over a smaller area."
    },
    {
      q: "Convert 30 cm² to m².",
      hint: "1 m² = 10,000 cm².",
      steps: ["30 cm² ÷ 10,000", "= 0.003 m²"],
      ans: "0.003 m²",
      why: "Area conversion requires dividing square centimetres by 10,000."
    },
    {
      q: "A force of 200 N acts on 0.05 m². Calculate the pressure.",
      hint: "Use P = F/A.",
      steps: ["P = 200/0.05", "P = 4,000 Pa"],
      ans: "4,000 Pa",
      why: "Dividing by 0.05 is equivalent to multiplying by 20."
    },
    {
      q: "Why does a sharp knife cut more easily than a blunt knife when the applied force is the same?",
      hint: "Think about the contact area at the edge.",
      steps: ["A sharp edge has a smaller contact area.", "The same force acts over that smaller area.", "The pressure is therefore greater."],
      ans: "Its smaller contact area produces greater pressure.",
      why: "Greater pressure helps the edge penetrate the material."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Pressure in Liquids",
  `<h2>Pressure beneath a liquid surface</h2>
  <p>A liquid exerts pressure on the bottom and sides of its container. Liquid pressure acts in all directions and increases with depth.</p>
  <p>At the same depth in the same stationary liquid, pressure is equal at different points.</p>
  <h3>Why does pressure increase with depth?</h3>
  <p>A deeper point has a taller column of liquid above it. The weight of that liquid produces greater pressure.</p>
  <h3>Example</h3>
  <p>Water emerging from a lower hole in a container generally travels farther than water from a higher hole because the pressure is greater at the lower hole.</p>
  <p><b>Important:</b> Liquid pressure depends on depth and liquid density, not simply on the total volume of liquid in the container.</p>`,
  [
    {
      q: "In which direction does liquid pressure act?",
      hint: "Consider the bottom and sides of a container.",
      steps: ["A liquid presses on the bottom.", "It also presses on the sides.", "Pressure acts in all directions."],
      ans: "In all directions",
      why: "Liquids exert pressure on every surface in contact with them."
    },
    {
      q: "At which point is the pressure greater: 20 cm or 80 cm below the surface of the same stationary liquid?",
      hint: "Compare the depths.",
      steps: ["80 cm is deeper than 20 cm.", "Greater depth means greater liquid pressure."],
      ans: "80 cm below the surface",
      why: "The deeper point supports a taller column of liquid."
    },
    {
      q: "Two points are at the same depth in the same stationary liquid. How do their pressures compare?",
      hint: "Depth and liquid density are equal.",
      steps: ["Both points have the same depth.", "They are in the same liquid.", "Their liquid pressures are equal."],
      ans: "Their pressures are equal.",
      why: "At the same depth, liquid pressure is the same under these conditions."
    },
    {
      q: "Does a wider container automatically produce greater pressure at the same depth?",
      hint: "Think about what determines liquid pressure.",
      steps: ["Liquid pressure depends on density, gravity and depth.", "Container width is not in the pressure equation."],
      ans: "No",
      why: "For the same liquid and depth, container width does not change the pressure."
    },
    {
      q: "Why does water usually emerge farther from a lower hole in a water-filled tank?",
      hint: "Compare the pressure at the two holes.",
      steps: ["The lower hole is at greater depth.", "Pressure is greater there.", "Water therefore emerges with a greater driving pressure."],
      ans: "Pressure is greater at the lower hole.",
      why: "The increasing pressure with depth pushes water out more strongly."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Factors Affecting Pressure in Liquids",
  `<h2>Three factors</h2>
  <p>For a liquid at rest, the pressure due to the liquid depends on:</p>
  <ol>
    <li><b>Depth (h):</b> greater depth gives greater pressure.</li>
    <li><b>Density (ρ):</b> a denser liquid gives greater pressure at the same depth.</li>
    <li><b>Gravitational field strength (g):</b> stronger gravity gives greater pressure.</li>
  </ol>
  <p>The relationship is <b>P = ρgh</b>.</p>
  <h3>Compare two situations</h3>
  <p>If the liquid and gravity remain the same, doubling the depth doubles the liquid pressure.</p>
  <p>If the depth and gravity remain the same, doubling the liquid density doubles the liquid pressure.</p>
  <p><b>Remember:</b> this equation gives pressure due to the liquid, not the total pressure including atmospheric pressure.</p>`,
  [
    {
      q: "Name the three factors determining pressure due to a stationary liquid.",
      hint: "Look at the symbols in P = ρgh.",
      steps: ["ρ represents liquid density.", "g represents gravitational field strength.", "h represents depth."],
      ans: "Liquid density, gravitational field strength and depth",
      why: "All three quantities appear in P = ρgh."
    },
    {
      q: "What happens to liquid pressure if depth doubles while everything else stays constant?",
      hint: "Pressure is directly proportional to depth.",
      steps: ["P = ρgh.", "If h doubles, ρgh doubles."],
      ans: "It doubles.",
      why: "Pressure is directly proportional to depth."
    },
    {
      q: "Two liquids have different densities but the same depth and gravitational field strength. Which produces greater pressure?",
      hint: "Compare their densities.",
      steps: ["P = ρgh.", "With g and h equal, the denser liquid produces greater pressure."],
      ans: "The denser liquid",
      why: "Pressure is directly proportional to liquid density."
    },
    {
      q: "If gravitational field strength were halved, what would happen to liquid pressure at the same depth and density?",
      hint: "Treat g as the changing factor in P = ρgh.",
      steps: ["P = ρgh.", "Halving g halves P when ρ and h stay constant."],
      ans: "The pressure would be halved.",
      why: "Pressure is directly proportional to gravitational field strength."
    },
    {
      q: "A learner claims that the volume of water alone determines the pressure at the bottom of a tank. Is this correct?",
      hint: "Use the liquid-pressure equation.",
      steps: ["P = ρgh.", "The equation contains density, gravity and depth.", "Volume alone does not determine the pressure."],
      ans: "No; density, depth and gravity determine the liquid pressure.",
      why: "Different container shapes can hold different volumes at the same liquid depth."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Calculating Pressure in Liquids",
  `<h2>Using P = ρgh</h2>
  <p>Use this equation to calculate pressure due to a liquid:</p>
  <p><b>P = ρgh</b></p>
  <ul>
    <li>P = pressure in pascals (Pa)</li>
    <li>ρ = density in kg/m³</li>
    <li>g = gravitational field strength in N/kg</li>
    <li>h = depth in metres (m)</li>
  </ul>
  <h3>Worked example</h3>
  <p>Calculate the pressure 2 m below the surface of water. Take ρ = 1,000 kg/m³ and g = 10 N/kg.</p>
  <p>P = 1,000 × 10 × 2</p>
  <p><b>P = 20,000 Pa</b></p>
  <p><b>Common error:</b> using centimetres instead of metres, or using density in g/cm³ without converting it to kg/m³.</p>`,
  [
    {
      q: "Calculate the pressure 3 m below water. Use ρ = 1,000 kg/m³ and g = 10 N/kg.",
      hint: "Substitute all three values into P = ρgh.",
      steps: ["P = ρgh", "P = 1,000 × 10 × 3", "P = 30,000 Pa"],
      ans: "30,000 Pa",
      why: "The product of density, gravitational field strength and depth gives pressure."
    },
    {
      q: "A liquid has density 800 kg/m³. Find the pressure at a depth of 5 m if g = 10 N/kg.",
      hint: "Use the density given, not water's density.",
      steps: ["P = ρgh", "P = 800 × 10 × 5", "P = 40,000 Pa"],
      ans: "40,000 Pa",
      why: "The calculation uses the actual density of the liquid."
    },
    {
      q: "Convert 60 cm to metres before using the liquid-pressure equation.",
      hint: "Divide centimetres by 100.",
      steps: ["60 ÷ 100 = 0.60 m"],
      ans: "0.60 m",
      why: "The depth must be in metres when using SI units."
    },
    {
      q: "Water has density 1,000 kg/m³. Calculate the pressure at 0.5 m depth using g = 10 N/kg.",
      hint: "Be careful with the decimal depth.",
      steps: ["P = 1,000 × 10 × 0.5", "P = 5,000 Pa"],
      ans: "5,000 Pa",
      why: "Half a metre produces half the pressure of one metre under the same conditions."
    },
    {
      q: "A learner calculates liquid pressure using P = ρg/h. What is wrong?",
      hint: "Recall the relationship between pressure and depth.",
      steps: ["The correct equation is P = ρgh.", "Depth multiplies density and gravity; it does not divide them."],
      ans: "The correct equation is P = ρgh.",
      why: "Liquid pressure increases with depth, so dividing by depth would predict the wrong relationship."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Transmission of Pressure in Fluids",
  `<h2>Pressure transmission</h2>
  <p>When pressure is applied to an enclosed fluid, the pressure change is transmitted throughout the fluid and to the walls of its container. This is the principle associated with <b>Pascal's law</b>.</p>
  <p>Liquids are commonly used in hydraulic systems because they are difficult to compress.</p>
  <h3>Example: an enclosed liquid</h3>
  <p>Pressing a piston into a sealed liquid increases the pressure. That pressure change is transmitted through the liquid to another piston.</p>
  <p><b>Do not confuse:</b> transmission of an applied pressure change with the natural increase in liquid pressure at greater depth. They are related to pressure but describe different effects.</p>`,
  [
    {
      q: "State the principle of pressure transmission in an enclosed fluid.",
      hint: "What happens to an applied pressure change?",
      steps: ["Pressure is applied to the enclosed fluid.", "The pressure change is transmitted throughout the fluid."],
      ans: "An applied pressure change is transmitted throughout an enclosed fluid.",
      why: "This is the principle used in hydraulic devices."
    },
    {
      q: "Why are liquids useful in hydraulic systems?",
      hint: "Consider how much their volume changes under pressure.",
      steps: ["Liquids are difficult to compress.", "They can transmit an applied pressure change through the system."],
      ans: "They are difficult to compress and transmit pressure.",
      why: "This helps the pressure applied at one piston act through the enclosed liquid."
    },
    {
      q: "A sealed liquid system has an applied pressure change of 500 Pa. What pressure change is transmitted through the fluid under ideal conditions?",
      hint: "Pressure change is transmitted, not multiplied just because it travels.",
      steps: ["The applied pressure change is 500 Pa.", "The same pressure change is transmitted through the enclosed fluid."],
      ans: "500 Pa",
      why: "The pressure change is transmitted throughout the fluid."
    },
    {
      q: "Does Pascal's law mean pressure in a stationary liquid is always the same at every depth?",
      hint: "Think about the effect of gravity.",
      steps: ["An applied pressure change is transmitted through the fluid.", "Hydrostatic pressure still increases with depth."],
      ans: "No",
      why: "Pressure transmission does not remove the depth-dependent pressure caused by gravity."
    },
    {
      q: "A force is applied to a piston connected to an enclosed liquid. Why can another piston respond?",
      hint: "What travels through the enclosed fluid?",
      steps: ["The first piston creates a pressure change.", "The change is transmitted through the liquid.", "The fluid exerts pressure on the second piston."],
      ans: "The applied pressure change is transmitted through the liquid.",
      why: "This is the basis of hydraulic operation."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Hydraulic Machines",
  `<h2>How hydraulic machines work</h2>
  <p>Hydraulic machines use pressure transmission in an enclosed liquid. Examples include hydraulic brakes and hydraulic lifts.</p>
  <p>For ideal pistons at the same transmitted pressure:</p>
  <p><b>P = F₁/A₁ = F₂/A₂</b></p>
  <p>Therefore, <b>F₂ = F₁ × A₂/A₁</b>.</p>
  <h3>Worked example</h3>
  <p>A small piston has an area of 0.01 m² and receives a force of 50 N. The larger piston has an area of 0.1 m².</p>
  <p>P = 50 ÷ 0.01 = 5,000 Pa.</p>
  <p>F₂ = 5,000 × 0.1 = <b>500 N</b>.</p>
  <p>The larger piston can produce a larger force, but in an ideal system it moves a shorter distance. Energy is not created.</p>`,
  [
    {
      q: "A hydraulic system has piston areas of 0.02 m² and 0.10 m². If the input force is 40 N, calculate the ideal output force.",
      hint: "Use F₂ = F₁ × A₂/A₁.",
      steps: ["F₂ = 40 × (0.10/0.02)", "F₂ = 40 × 5", "F₂ = 200 N"],
      ans: "200 N",
      why: "The output piston has five times the area, so the ideal output force is five times greater."
    },
    {
      q: "Why can a hydraulic lift raise a heavy vehicle with a smaller input force?",
      hint: "Compare the piston areas.",
      steps: ["The pressure change is transmitted through the liquid.", "The output piston has a larger area.", "The same pressure acting on a larger area produces a larger force."],
      ans: "The output piston has a larger area.",
      why: "Force equals pressure multiplied by area."
    },
    {
      q: "An input force of 20 N acts on a piston of area 0.005 m². Calculate the pressure produced.",
      hint: "Use P = F/A.",
      steps: ["P = 20/0.005", "P = 4,000 Pa"],
      ans: "4,000 Pa",
      why: "The input force divided by the piston area gives the pressure."
    },
    {
      q: "If the input and output piston areas are equal, what is the ideal output force for an input force of 75 N?",
      hint: "Equal areas mean equal force at equal pressure.",
      steps: ["F₂/A₂ = F₁/A₁.", "If A₂ = A₁, then F₂ = F₁.", "F₂ = 75 N."],
      ans: "75 N",
      why: "With equal piston areas, the ideal forces are equal."
    },
    {
      q: "Does a hydraulic lift create energy when it multiplies force?",
      hint: "Consider the distance moved by each piston.",
      steps: ["The output force can be larger.", "The output piston moves a shorter distance in an ideal system.", "The system does not create energy."],
      ans: "No",
      why: "The force advantage is balanced by a distance disadvantage in an ideal machine."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Atmospheric Pressure",
  `<h2>Pressure from the atmosphere</h2>
  <p>The atmosphere is the layer of gases surrounding Earth. Air has mass, and its weight produces <b>atmospheric pressure</b>.</p>
  <p>Air molecules also collide with surfaces, exerting pressure. Atmospheric pressure acts in all directions.</p>
  <p>Near sea level, standard atmospheric pressure is approximately <b>101,325 Pa</b>, often rounded to 101,000 Pa.</p>
  <h3>Evidence for atmospheric pressure</h3>
  <ul>
    <li>A suction cup can stick to a smooth surface when pressure beneath it is reduced.</li>
    <li>A drinking straw works because pressure differences move the liquid.</li>
    <li>Atmospheric pressure generally decreases as altitude increases.</li>
  </ul>
  <p><b>Important:</b> Atmospheric pressure acts on us from all directions; we do not get crushed because internal pressures in our bodies largely balance the external pressure.</p>`,
  [
    {
      q: "What causes atmospheric pressure?",
      hint: "Think about the air above Earth's surface.",
      steps: ["Air has mass.", "The atmosphere has weight due to gravity.", "Air molecules also collide with surfaces."],
      ans: "The weight of the atmosphere and collisions of air molecules with surfaces",
      why: "Both the atmosphere's weight and molecular collisions contribute to atmospheric pressure."
    },
    {
      q: "What is the approximate standard atmospheric pressure near sea level?",
      hint: "Give the commonly used value in pascals.",
      steps: ["Standard atmospheric pressure is approximately 101,325 Pa.", "It is often rounded to 101,000 Pa."],
      ans: "Approximately 101,000 Pa",
      why: "This is the standard reference value near sea level."
    },
    {
      q: "How does atmospheric pressure generally change as altitude increases?",
      hint: "There is less air above you at higher altitude.",
      steps: ["At higher altitude, less atmosphere lies above a location.", "The weight of the air column is lower.", "Atmospheric pressure generally decreases."],
      ans: "It decreases.",
      why: "The overlying air column becomes smaller with increasing altitude."
    },
    {
      q: "Why can a drinking straw draw liquid upwards when a person sucks on it?",
      hint: "Sucking changes the pressure inside the straw.",
      steps: ["Sucking lowers the pressure inside the straw.", "Atmospheric pressure acts on the liquid surface.", "The pressure difference pushes liquid up the straw."],
      ans: "Atmospheric pressure pushes liquid up because the pressure inside the straw is lower.",
      why: "The pressure difference, rather than a pulling force exerted by the mouth on the liquid, moves it up."
    },
    {
      q: "Does atmospheric pressure act only downwards?",
      hint: "Air surrounds objects.",
      steps: ["Air surrounds objects on all sides.", "Its pressure acts in all directions."],
      ans: "No; it acts in all directions.",
      why: "Atmospheric pressure is not limited to a downward direction."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Measuring Atmospheric Pressure with a Barometer",
  `<h2>The barometer</h2>
  <p>A <b>barometer</b> measures atmospheric pressure. A mercury barometer uses a column of mercury supported by atmospheric pressure acting on mercury in a reservoir.</p>
  <p>At standard atmospheric pressure, the mercury column is approximately 760 mm high.</p>
  <p>The pressure represented by a liquid column can be calculated using:</p>
  <p><b>P = ρgh</b></p>
  <h3>Worked example</h3>
  <p>For mercury, take ρ = 13,600 kg/m³, g = 10 N/kg and h = 0.76 m.</p>
  <p>P = 13,600 × 10 × 0.76</p>
  <p>P = <b>103,360 Pa</b>.</p>
  <p>This is close to standard atmospheric pressure; using g = 9.81 N/kg gives a value closer to 101,000 Pa.</p>
  <p><b>Remember:</b> a barometer measures atmospheric pressure. A pressure gauge commonly measures pressure relative to the surrounding atmosphere.</p>`,
  [
    {
      q: "What does a barometer measure?",
      hint: "It measures pressure from the surrounding air.",
      steps: ["The atmosphere exerts pressure.", "A barometer measures that atmospheric pressure."],
      ans: "Atmospheric pressure",
      why: "Barometers are designed to measure the pressure exerted by the atmosphere."
    },
    {
      q: "Convert a mercury column height of 760 mm into metres.",
      hint: "1,000 mm = 1 m.",
      steps: ["760 ÷ 1,000 = 0.760 m"],
      ans: "0.760 m",
      why: "The height must be in metres when using SI units."
    },
    {
      q: "Calculate the pressure represented by a 0.5 m column of a liquid with density 1,200 kg/m³. Take g = 10 N/kg.",
      hint: "Use P = ρgh.",
      steps: ["P = 1,200 × 10 × 0.5", "P = 6,000 Pa"],
      ans: "6,000 Pa",
      why: "The pressure represented by a liquid column is its density multiplied by gravity and height."
    },
    {
      q: "What happens to the height of a mercury barometer column when atmospheric pressure increases?",
      hint: "Atmospheric pressure supports the column.",
      steps: ["Greater atmospheric pressure acts on the reservoir.", "It can support a taller mercury column."],
      ans: "The column height increases.",
      why: "A greater pressure can support a taller column of mercury."
    },
    {
      q: "Why must 760 mm be converted to 0.760 m before substituting into P = ρgh?",
      hint: "Check the SI unit for height.",
      steps: ["The equation uses SI units.", "Height should be in metres.", "760 mm equals 0.760 m."],
      ans: "Because the height must be expressed in metres.",
      why: "Using inconsistent units leads to an incorrect numerical result."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Pressure Gauges and Siphons",
  `<h2>Pressure gauges</h2>
  <p>A pressure gauge measures the pressure of a gas or liquid in a system. Many common gauges indicate pressure relative to atmospheric pressure.</p>
  <p>A Bourdon gauge uses a curved metal tube that changes shape slightly when the pressure inside it changes. A mechanism moves a pointer over a scale.</p>
  <h2>Siphons</h2>
  <p>A siphon is a tube that transfers liquid from a higher reservoir to a lower level, provided the tube is primed and the arrangement is suitable.</p>
  <p>Gravity and pressure differences maintain the flow. Atmospheric pressure can be important in ordinary siphon operation, but the explanation is not simply that air 'sucks' the liquid through.</p>
  <p><b>Keep the devices distinct:</b> a gauge measures pressure; a siphon transfers liquid between levels.</p>`,
  [
    {
      q: "What is the purpose of a pressure gauge?",
      hint: "Think about what quantity it indicates.",
      steps: ["A gauge responds to pressure in a system.", "It indicates the pressure on its scale."],
      ans: "To measure pressure in a system",
      why: "Pressure gauges are used to monitor gas or liquid pressure."
    },
    {
      q: "How does a Bourdon gauge indicate pressure?",
      hint: "Consider what happens to its curved tube.",
      steps: ["Pressure changes the shape of the curved metal tube.", "A mechanism transfers this movement to a pointer.", "The pointer indicates pressure on a scale."],
      ans: "Pressure changes a curved tube's shape, moving a pointer.",
      why: "The tube's small movement is converted into a readable indication."
    },
    {
      q: "What is a siphon used for?",
      hint: "It transfers liquid between different levels.",
      steps: ["The tube is filled or primed with liquid.", "The outlet is placed below the liquid surface in the source.", "The arrangement allows liquid to flow to the lower level."],
      ans: "To transfer liquid from a higher reservoir to a lower level",
      why: "A siphon uses a continuous liquid column and a suitable height difference to maintain flow."
    },
    {
      q: "A student says a pressure gauge and a siphon do the same job. Identify the error.",
      hint: "One measures; the other transfers.",
      steps: ["A pressure gauge measures pressure.", "A siphon transfers liquid."],
      ans: "A gauge measures pressure, while a siphon transfers liquid.",
      why: "The two devices have different functions."
    },
    {
      q: "Why must a conventional siphon tube be primed before it can operate properly?",
      hint: "Think about whether the tube contains a continuous liquid column.",
      steps: ["Priming fills the tube with liquid.", "This establishes the continuous liquid column needed for the siphon to operate."],
      ans: "To establish a continuous column of liquid",
      why: "Air gaps can interrupt the ordinary siphon action."
    }
  ]
);
add(
  "physics",
  "pressure",
  "The U-Tube Manometer",
  `<h2>Measuring pressure difference</h2>
  <p>A U-tube manometer contains a liquid in a U-shaped tube. One side may be connected to a gas container while the other is open to the atmosphere.</p>
  <p>A difference in pressure causes the liquid levels in the two arms to differ.</p>
  <p>For a simple manometer containing the same liquid in both arms, the pressure difference is:</p>
  <p><b>ΔP = ρgh</b></p>
  <ul>
    <li>ρ = density of the manometer liquid in kg/m³</li>
    <li>g = gravitational field strength in N/kg</li>
    <li>h = vertical difference between the liquid levels in metres</li>
  </ul>
  <h3>Worked example</h3>
  <p>Mercury has density 13,600 kg/m³. The level difference is 0.10 m. Take g = 10 N/kg.</p>
  <p>ΔP = 13,600 × 10 × 0.10 = <b>13,600 Pa</b>.</p>
  <p><b>Important:</b> use the vertical height difference, not the length of the tube.</p>`,
  [
    {
      q: "What does a simple U-tube manometer measure?",
      hint: "It compares pressure on the two sides.",
      steps: ["Different pressures can produce different liquid levels.", "The level difference indicates the pressure difference."],
      ans: "Pressure difference",
      why: "A manometer compares the pressure applied to its two sides."
    },
    {
      q: "A mercury manometer has a level difference of 0.20 m. Calculate the pressure difference using ρ = 13,600 kg/m³ and g = 10 N/kg.",
      hint: "Use ΔP = ρgh.",
      steps: ["ΔP = 13,600 × 10 × 0.20", "ΔP = 27,200 Pa"],
      ans: "27,200 Pa",
      why: "The pressure difference is determined by the density and vertical height difference."
    },
    {
      q: "A water manometer has a level difference of 0.30 m. Calculate the pressure difference using ρ = 1,000 kg/m³ and g = 10 N/kg.",
      hint: "Convert the given height directly in metres.",
      steps: ["ΔP = 1,000 × 10 × 0.30", "ΔP = 3,000 Pa"],
      ans: "3,000 Pa",
      why: "The liquid column's pressure difference is ρgh."
    },
    {
      q: "Why must the vertical level difference be used instead of the total length of the U-tube?",
      hint: "Pressure depends on vertical depth.",
      steps: ["The liquid's weight depends on its vertical height.", "The tube's curved length does not determine the hydrostatic pressure difference."],
      ans: "Because the pressure difference depends on vertical height.",
      why: "Only the vertical height difference enters the equation ΔP = ρgh."
    },
    {
      q: "If the same manometer liquid is used and the height difference doubles, what happens to the pressure difference?",
      hint: "Pressure difference is proportional to h.",
      steps: ["ΔP = ρgh.", "If h doubles while ρ and g remain constant, ΔP doubles."],
      ans: "It doubles.",
      why: "Pressure difference is directly proportional to the vertical height difference."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Interpreting Manometer Readings",
  `<h2>Which pressure is greater?</h2>
  <p>In a simple U-tube manometer containing the same liquid in both arms, the side with the lower liquid level is generally the side with the greater applied pressure.</p>
  <p>The greater pressure pushes the manometer liquid down on its side and raises the liquid on the other side.</p>
  <h3>Worked example</h3>
  <p>A gas container is connected to one arm of a mercury manometer. The mercury is lower on the gas side by 0.05 m.</p>
  <p>This indicates that the gas pressure exceeds atmospheric pressure by:</p>
  <p>ΔP = ρgh = 13,600 × 10 × 0.05 = <b>6,800 Pa</b>.</p>
  <p>If atmospheric pressure is 100,000 Pa, then the gas's absolute pressure is 100,000 + 6,800 = <b>106,800 Pa</b>.</p>
  <p><b>Distinguish:</b> gauge pressure is measured relative to atmospheric pressure; absolute pressure is measured relative to a vacuum.</p>`,
  [
    {
      q: "In a simple open-ended U-tube manometer, the liquid level is lower on the gas-connected side. Which pressure is greater?",
      hint: "The greater pressure pushes the liquid down on its side.",
      steps: ["The liquid is pushed down on the gas-connected side.", "The gas pressure is greater than atmospheric pressure."],
      ans: "The gas pressure",
      why: "The gas pushes the manometer liquid down in its arm."
    },
    {
      q: "A mercury manometer shows a height difference of 0.04 m. Calculate the pressure difference using ρ = 13,600 kg/m³ and g = 10 N/kg.",
      hint: "Use ΔP = ρgh.",
      steps: ["ΔP = 13,600 × 10 × 0.04", "ΔP = 5,440 Pa"],
      ans: "5,440 Pa",
      why: "The level difference gives the pressure difference."
    },
    {
      q: "A gas has a gauge pressure of 8,000 Pa. If atmospheric pressure is 100,000 Pa, find its absolute pressure.",
      hint: "Absolute pressure equals atmospheric pressure plus gauge pressure.",
      steps: ["Absolute pressure = 100,000 + 8,000", "= 108,000 Pa"],
      ans: "108,000 Pa",
      why: "Gauge pressure is the amount above atmospheric pressure."
    },
    {
      q: "A gas has an absolute pressure of 95,000 Pa while atmospheric pressure is 100,000 Pa. Calculate its gauge pressure.",
      hint: "Subtract atmospheric pressure from absolute pressure.",
      steps: ["Gauge pressure = absolute pressure − atmospheric pressure", "= 95,000 − 100,000", "= −5,000 Pa"],
      ans: "−5,000 Pa",
      why: "A negative gauge pressure means the gas pressure is below atmospheric pressure."
    },
    {
      q: "A learner adds atmospheric pressure to an absolute pressure to find gauge pressure. What is the mistake?",
      hint: "Rearrange the relationship between the three pressures.",
      steps: ["Absolute pressure = atmospheric pressure + gauge pressure.", "Therefore gauge pressure = absolute pressure − atmospheric pressure."],
      ans: "Atmospheric pressure should be subtracted from absolute pressure.",
      why: "Adding atmospheric pressure to absolute pressure counts the atmospheric contribution twice."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Hydraulic Braking Systems",
  `<h2>How hydraulic brakes work</h2>
  <p>Hydraulic brakes use pressure transmission through an enclosed liquid to apply braking force at the wheels.</p>
  <ol>
    <li>The driver presses the brake pedal.</li>
    <li>The pedal operates a master-cylinder piston.</li>
    <li>The piston increases pressure in the brake fluid.</li>
    <li>The pressure is transmitted through the fluid to the wheel mechanisms.</li>
    <li>The brake pads or shoes press against rotating parts, producing friction that slows the vehicle.</li>
  </ol>
  <h3>Properties of brake fluid</h3>
  <p>Brake fluid should transmit pressure effectively, have a suitable boiling point and be compatible with the system's seals and materials.</p>
  <p>Air in the brake lines is undesirable because it is compressible and can make the pedal feel spongy.</p>
  <p><b>Key distinction:</b> the fluid transmits pressure; friction at the braking surfaces slows the vehicle.</p>`,
  [
    {
      q: "What principle allows pressure from the brake pedal to be transmitted through brake fluid?",
      hint: "Recall the behaviour of pressure in an enclosed fluid.",
      steps: ["The master cylinder increases fluid pressure.", "The pressure change is transmitted through the enclosed fluid."],
      ans: "Pascal's principle",
      why: "Pressure applied to an enclosed fluid is transmitted throughout the fluid."
    },
    {
      q: "What actually produces the force that slows a vehicle at the brake pads?",
      hint: "Think about the contact between the brake pads and the rotating disc.",
      steps: ["Hydraulic pressure moves the braking components.", "The pads press against the rotating disc.", "Friction opposes the disc's motion."],
      ans: "Friction between the brake pads and the rotating disc",
      why: "Hydraulic pressure operates the brakes, while friction provides the braking effect."
    },
    {
      q: "Why is air in hydraulic brake lines a problem?",
      hint: "Compare the compressibility of air and liquid.",
      steps: ["Air is readily compressed.", "Some pedal movement compresses the air instead of efficiently transmitting pressure."],
      ans: "Air is compressible and can make braking less effective.",
      why: "Trapped air makes the hydraulic response less direct."
    },
    {
      q: "A brake-fluid system transmits a pressure change of 2,000 Pa to a piston with area 0.01 m². Calculate the force on that piston.",
      hint: "Rearrange P = F/A.",
      steps: ["F = PA", "F = 2,000 × 0.01", "F = 20 N"],
      ans: "20 N",
      why: "The force on a piston equals the pressure multiplied by its area."
    },
    {
      q: "Why must brake fluid be compatible with the seals in a braking system?",
      hint: "Consider leakage and deterioration.",
      steps: ["Incompatible fluid can damage seals.", "Damaged seals can allow fluid to leak.", "Leaks can compromise braking."],
      ans: "To prevent seal damage and fluid leaks",
      why: "The braking system needs sound seals to maintain hydraulic pressure."
    }
  ]
);

add(
  "physics",
  "pressure",
  "The Bicycle Pump",
  `<h2>How a bicycle pump works</h2>
  <p>A simple hand pump compresses air and forces it into a tyre through a valve.</p>
  <ol>
    <li>When the piston is pulled back, the pump chamber expands and its pressure falls.</li>
    <li>Air enters the chamber through an inlet valve.</li>
    <li>When the piston is pushed down, the air is compressed.</li>
    <li>When the chamber pressure exceeds the tyre pressure sufficiently, the outlet valve allows air into the tyre.</li>
  </ol>
  <p>The valves control the direction of air flow.</p>
  <p><b>Important:</b> the pump raises the air pressure by compressing air and forcing more air into the tyre. The pump does not work by making the air disappear.</p>`,
  [
    {
      q: "What happens to the air pressure inside the pump chamber when the piston is pushed down?",
      hint: "The chamber volume decreases.",
      steps: ["The piston compresses the air.", "The air occupies a smaller volume.", "Its pressure increases."],
      ans: "The pressure increases.",
      why: "Compressing the air in the chamber raises its pressure."
    },
    {
      q: "What is the function of the inlet valve in a bicycle pump?",
      hint: "Consider the air entering the chamber.",
      steps: ["The pump chamber expands as the piston is pulled back.", "The inlet valve allows air to enter the chamber."],
      ans: "It allows air to enter the pump chamber.",
      why: "The inlet valve permits air intake during the return stroke."
    },
    {
      q: "Why does the pump's outlet valve open during the compression stroke?",
      hint: "Compare chamber pressure with tyre pressure.",
      steps: ["Pushing the piston raises chamber pressure.", "Air flows into the tyre when the chamber pressure is sufficiently greater than tyre pressure and the valve opens."],
      ans: "Because the chamber pressure becomes greater than the tyre pressure.",
      why: "Air flows from the higher-pressure chamber into the tyre."
    },
    {
      q: "A pump compresses air but the outlet valve does not open. Will air enter the tyre?",
      hint: "The air needs a path into the tyre.",
      steps: ["Compression can raise the chamber pressure.", "A closed outlet valve blocks the flow into the tyre."],
      ans: "No",
      why: "The outlet valve must allow air to pass into the tyre."
    },
    {
      q: "What is the main function of the valves in a bicycle pump?",
      hint: "Think about preventing air from moving in the wrong direction.",
      steps: ["The inlet valve allows air into the chamber.", "The outlet valve allows air toward the tyre.", "Together they control the direction of flow."],
      ans: "To control the direction of air flow",
      why: "The valves help the pump draw in air and then deliver it to the tyre."
    }
  ]
);

add(
  "physics",
  "pressure",
  "The Syringe",
  `<h2>Using pressure differences</h2>
  <p>A syringe can draw liquid in or expel liquid by changing the pressure inside its barrel.</p>
  <h3>Drawing liquid in</h3>
  <ol>
    <li>Place the nozzle in the liquid.</li>
    <li>Pull the plunger back.</li>
    <li>The volume inside the syringe increases and its pressure falls.</li>
    <li>The pressure on the liquid outside is greater, so liquid enters through the nozzle.</li>
  </ol>
  <h3>Expelling liquid</h3>
  <p>Pushing the plunger decreases the volume and increases the pressure inside the syringe. If the nozzle is open, the liquid can be forced out.</p>
  <p><b>Key idea:</b> the pressure difference causes the flow. The plunger changes the pressure inside the syringe.</p>`,
  [
    {
      q: "Why does liquid enter a syringe when its plunger is pulled back with the nozzle immersed?",
      hint: "Pulling back increases the barrel volume.",
      steps: ["The volume increases.", "The pressure inside falls.", "The greater outside pressure pushes liquid into the syringe."],
      ans: "The pressure inside the syringe falls, so outside pressure pushes liquid in.",
      why: "Liquid moves because of the pressure difference."
    },
    {
      q: "What happens to the pressure inside a syringe when the plunger is pushed inward and the nozzle is blocked?",
      hint: "The trapped fluid has less space.",
      steps: ["The plunger reduces the available volume.", "The trapped contents resist compression.", "The pressure increases."],
      ans: "It increases.",
      why: "Pushing against trapped contents raises the internal pressure."
    },
    {
      q: "A syringe has the same pressure inside and outside. What pressure difference is available to drive liquid through its nozzle?",
      hint: "Subtract the two pressures.",
      steps: ["Pressure difference = outside pressure − inside pressure.", "If the pressures are equal, the difference is zero."],
      ans: "Zero",
      why: "Equal pressures provide no pressure difference to drive flow."
    },
    {
      q: "Why might a syringe with an airtight, blocked nozzle resist movement when its plunger is pushed?",
      hint: "Consider what happens to the trapped contents.",
      steps: ["The blocked nozzle prevents contents from escaping.", "Pushing the plunger raises the internal pressure.", "That pressure opposes further movement."],
      ans: "The internal pressure rises and resists the plunger.",
      why: "The trapped contents cannot readily leave the closed syringe."
    },
    {
      q: "A learner says the plunger pulls liquid directly into the syringe. Improve the explanation.",
      hint: "Explain the pressure change instead.",
      steps: ["Pulling the plunger increases the internal volume.", "The internal pressure falls.", "The greater external pressure pushes liquid into the syringe."],
      ans: "Pulling the plunger lowers internal pressure, allowing outside pressure to push liquid in.",
      why: "The pressure difference, rather than a direct pulling action on the liquid, drives the flow."
    }
  ]
);

add(
  "physics",
  "pressure",
  "The Drinking Straw",
  `<h2>Why liquid rises in a straw</h2>
  <p>A drinking straw works through a pressure difference.</p>
  <ol>
    <li>Before drinking, the pressure on the liquid surface in the cup is approximately atmospheric pressure.</li>
    <li>When a person sucks, the pressure inside the mouth and straw is reduced.</li>
    <li>The pressure acting on the liquid surface in the cup is now greater than the pressure inside the straw.</li>
    <li>This pressure difference pushes liquid up the straw.</li>
  </ol>
  <p><b>Important:</b> sucking lowers the pressure inside the straw; atmospheric pressure helps push the liquid upwards.</p>
  <p>If the straw has a hole that allows air to enter, the pressure difference may not be maintained, making it difficult to draw up the liquid.</p>`,
  [
    {
      q: "What causes liquid to rise through a drinking straw?",
      hint: "Compare the pressure inside the straw with the pressure on the liquid surface.",
      steps: ["Sucking lowers pressure inside the straw.", "The pressure on the liquid surface is greater.", "The pressure difference pushes liquid upwards."],
      ans: "A pressure difference between the liquid surface and the inside of the straw",
      why: "The higher external pressure pushes liquid into the lower-pressure straw."
    },
    {
      q: "What happens to the pressure inside the straw when a person sucks?",
      hint: "The action lowers the pressure in the mouth and straw.",
      steps: ["Sucking removes some air from the region.", "The pressure inside the straw falls."],
      ans: "It decreases.",
      why: "The lower internal pressure enables the outside pressure to push liquid upwards."
    },
    {
      q: "Why can a hole in the side of a straw make drinking difficult?",
      hint: "Air can enter through the hole.",
      steps: ["Air enters through the hole.", "The pressure inside the straw may no longer fall sufficiently.", "The pressure difference becomes too small to raise liquid effectively."],
      ans: "The hole can prevent a sufficient pressure difference from forming.",
      why: "A pressure difference is needed to move the liquid upwards."
    },
    {
      q: "Does a drinking straw work because atmospheric pressure disappears when you suck?",
      hint: "Atmospheric pressure remains on the liquid surface.",
      steps: ["Atmospheric pressure continues to act on the liquid surface.", "Sucking lowers pressure inside the straw.", "The difference in pressure moves the liquid."],
      ans: "No",
      why: "Atmospheric pressure remains present and helps push liquid up the straw."
    },
    {
      q: "The pressure on the cup's liquid surface is 100,000 Pa and pressure inside the straw is 98,000 Pa. What is the pressure difference?",
      hint: "Subtract the smaller pressure from the larger pressure.",
      steps: ["ΔP = 100,000 − 98,000", "ΔP = 2,000 Pa"],
      ans: "2,000 Pa",
      why: "The pressure difference is the difference between the two pressures."
    }
  ]
);

add(
  "physics",
  "pressure",
  "The Force Pump",
  `<h2>How a force pump works</h2>
  <p>A force pump uses a piston and valves to move liquid, often water, against a pressure difference or to a higher level.</p>
  <p>In a common reciprocating force pump:</p>
  <ol>
    <li>During the intake stroke, the piston moves to draw liquid into the cylinder through an inlet valve.</li>
    <li>During the delivery stroke, the piston pushes the liquid and increases its pressure.</li>
    <li>The inlet valve closes to prevent backward flow.</li>
    <li>The outlet valve opens when the liquid pressure is sufficient to push liquid into the delivery pipe.</li>
  </ol>
  <p>The valves help maintain one-way flow.</p>
  <p><b>Remember:</b> the exact arrangement varies by pump design, but the basic principle is that a moving piston changes pressure and valves control flow direction.</p>`,
  [
    {
      q: "What is the main purpose of a force pump?",
      hint: "Think about moving liquid under pressure.",
      steps: ["The piston increases the liquid pressure.", "The pressurised liquid is forced into the delivery pipe."],
      ans: "To move liquid by increasing its pressure",
      why: "A force pump can deliver liquid against a pressure difference."
    },
    {
      q: "What happens to the inlet valve during the delivery stroke in a typical force pump?",
      hint: "The liquid must not flow backwards.",
      steps: ["The piston pushes liquid forward.", "The inlet valve closes to prevent backward flow."],
      ans: "It closes.",
      why: "Closing the inlet valve directs the liquid toward the delivery outlet."
    },
    {
      q: "Why does the outlet valve open during the delivery stroke?",
      hint: "The liquid must have enough pressure to move into the delivery pipe.",
      steps: ["The piston increases the pressure of the liquid.", "When the pressure is sufficient, the outlet valve opens.", "Liquid enters the delivery pipe."],
      ans: "The liquid pressure becomes sufficient to open it and drive flow.",
      why: "The valve permits delivery when the pressure condition is met."
    },
    {
      q: "What would happen if both valves allowed unrestricted flow in both directions?",
      hint: "Think about the intended direction of the liquid.",
      steps: ["The liquid could flow backwards during a stroke.", "The pump would struggle to maintain one-way delivery."],
      ans: "Backward flow would reduce or disrupt pumping.",
      why: "Valves help direct liquid through the pump in the intended direction."
    },
    {
      q: "A pump applies a pressure of 5,000 Pa to a piston of area 0.02 m². Calculate the force on the piston.",
      hint: "Use F = PA.",
      steps: ["F = 5,000 × 0.02", "F = 100 N"],
      ans: "100 N",
      why: "The force exerted by pressure on a surface equals pressure multiplied by area."
    }
  ]
);

add(
  "physics",
  "pressure",
  "The Lift Pump",
  `<h2>How a lift pump raises water</h2>
  <p>A conventional lift pump raises water from a well by creating a region of lower pressure above the water. Atmospheric pressure acting on the water surface then pushes water up the pump pipe.</p>
  <p>In a typical hand-operated lift pump:</p>
  <ol>
    <li>Moving the handle raises the piston and changes the pressure in the cylinder.</li>
    <li>The valves open or close to control the flow of water.</li>
    <li>Atmospheric pressure helps push water up the pipe into the pump.</li>
    <li>Repeated strokes move water upward and out through the spout.</li>
  </ol>
  <p><b>Important limit:</b> a simple suction lift pump cannot raise water from an arbitrarily great depth. Atmospheric pressure limits the theoretical lift, and real pumps have a lower practical limit.</p>
  <p>Do not confuse a lift pump with a force pump: the typical lift pump relies on atmospheric pressure to push water into a low-pressure region, while a force pump can deliver liquid under increased pressure.</p>`,
  [
    {
      q: "What helps push water up the pipe in a conventional lift pump?",
      hint: "Consider the pressure acting on the water surface in the well.",
      steps: ["The pump reduces pressure above the water.", "Atmospheric pressure acts on the water surface.", "The pressure difference pushes water up the pipe."],
      ans: "Atmospheric pressure",
      why: "Atmospheric pressure pushes water toward the lower-pressure region in the pump."
    },
    {
      q: "Why can a simple suction lift pump not raise water from an unlimited depth?",
      hint: "The pump relies on atmospheric pressure.",
      steps: ["Atmospheric pressure can support only a limited water column.", "As the required lift increases, the pressure difference becomes insufficient.", "The pump has a maximum practical suction lift."],
      ans: "Atmospheric pressure can support only a limited height of water.",
      why: "The pump cannot create an unlimited pressure difference by suction."
    },
    {
      q: "What is the role of valves in a lift pump?",
      hint: "They help water move in the intended direction.",
      steps: ["The valves open and close during the pump strokes.", "They control water flow and reduce backward movement."],
      ans: "To control flow direction and reduce backflow",
      why: "The valve sequence enables repeated strokes to raise water."
    },
    {
      q: "A student says water rises in a lift pump because the piston directly pulls the water from the well. What is the better explanation?",
      hint: "Use pressure rather than a direct pulling force on the entire water column.",
      steps: ["The pump lowers pressure above the water.", "Atmospheric pressure acts on the well's water surface.", "The pressure difference pushes water up the pipe."],
      ans: "Atmospheric pressure pushes water into the lower-pressure pump pipe.",
      why: "The pressure difference explains the water's upward movement."
    },
    {
      q: "What is the main difference between a simple lift pump and a force pump?",
      hint: "Compare how each moves liquid.",
      steps: ["A simple lift pump relies on atmospheric pressure to push water into a low-pressure region.", "A force pump uses a piston to increase liquid pressure and deliver it."],
      ans: "A lift pump relies on atmospheric pressure for suction, while a force pump raises liquid pressure for delivery.",
      why: "Their operating mechanisms differ in how pressure is used to move liquid."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Demonstrating Atmospheric Pressure",
  `<h2>Evidence that atmospheric pressure exists</h2>
  <p>Atmospheric pressure is not visible directly, but its effects can be demonstrated.</p>
  <h3>Experiment: inverted water-filled container</h3>
  <p>A simple demonstration uses a rigid cup or container, water, and a flat sheet of stiff card.</p>
  <ol>
    <li>Fill the container with water.</li>
    <li>Place the card over its opening and hold it firmly.</li>
    <li>Carefully invert the container.</li>
    <li>Release the card while keeping the setup steady.</li>
  </ol>
  <p>Under suitable conditions, the card may remain in place because the pressure difference helps support it. Surface tension and the seal at the rim also matter.</p>
  <p>Other demonstrations include suction cups and the collapse of a container when its internal pressure is reduced.</p>
  <p><b>Safety:</b> perform demonstrations over a basin and use a lightweight container. Do not use hot or fragile vessels.</p>`,
  [
    {
      q: "What is the purpose of an experiment demonstrating atmospheric pressure?",
      hint: "It provides observable evidence of air pressure.",
      steps: ["Air exerts pressure.", "A demonstration shows an effect caused by that pressure."],
      ans: "To show that the atmosphere exerts pressure",
      why: "The experiment makes the effects of atmospheric pressure observable."
    },
    {
      q: "Why can a card remain beneath an inverted water-filled container under suitable conditions?",
      hint: "Consider pressure outside and inside the container.",
      steps: ["The pressure difference acts on the card.", "Atmospheric pressure outside can help support it.", "A good seal and surface tension also help prevent leakage."],
      ans: "A pressure difference, together with a suitable seal, helps hold the card in place.",
      why: "The card is not supported by atmospheric pressure alone in every possible setup; sealing and surface effects matter."
    },
    {
      q: "What may happen when the pressure inside a suitable container is greatly reduced while the outside atmospheric pressure remains high?",
      hint: "Compare the forces caused by the two pressures.",
      steps: ["The outside pressure becomes much greater than the inside pressure.", "The pressure difference creates a net inward force.", "The container may collapse if it is not strong enough."],
      ans: "The container may collapse inward.",
      why: "The external atmospheric pressure can exceed the container's ability to resist the net force."
    },
    {
      q: "Why should a demonstration with an inverted water container be performed over a basin?",
      hint: "Think about what could go wrong.",
      steps: ["The seal may fail.", "Water may spill.", "A basin helps contain the water."],
      ans: "To contain spilled water if the seal fails",
      why: "The demonstration may not work perfectly every time."
    },
    {
      q: "A learner claims that a suction cup sticks only because the cup pulls the wall toward itself. Explain the role of pressure.",
      hint: "Think about the pressure inside the cup.",
      steps: ["Pressing the cup against a smooth surface reduces the air trapped beneath it.", "The pressure outside is greater than the pressure inside.", "The pressure difference presses the cup against the surface."],
      ans: "The greater outside atmospheric pressure presses the suction cup against the surface.",
      why: "A pressure difference is central to suction-cup attachment."
    }
  ]
);

add(
  "physics",
  "pressure",
  "Pressure in Gases",
  `<h2>How gases exert pressure</h2>
  <p>Gas particles move randomly and collide with the walls of their container. These collisions exert forces on the walls. The force per unit area is the gas pressure.</p>
  <p>For a gas confined in a container, pressure can change when the gas is compressed, heated or cooled, depending on which other conditions are kept constant.</p>
  <h3>Example: compressing air</h3>
  <p>If air in a sealed syringe is compressed by pushing the plunger inward, its volume decreases and its pressure generally increases, provided the gas temperature is approximately constant.</p>
  <p><b>Do not confuse:</b> pressure in a gas is caused by particle collisions with surfaces. Atmospheric pressure is the pressure exerted by the air around us, including the effect of the weight of the atmosphere.</p>`,
  [
    {
      q: "What causes a gas to exert pressure on the walls of its container?",
      hint: "Think about moving gas particles.",
      steps: ["Gas particles move randomly.", "They collide with the container walls.", "The collisions exert forces on the walls."],
      ans: "Collisions of gas particles with the container walls",
      why: "The force produced by many particle collisions creates gas pressure."
    },
    {
      q: "What generally happens to the pressure of a sealed gas when its volume decreases at approximately constant temperature?",
      hint: "The same gas occupies a smaller space.",
      steps: ["The gas is compressed.", "Particles collide with the walls more frequently per unit volume.", "The pressure generally increases."],
      ans: "The pressure increases.",
      why: "Compression of a fixed amount of gas at approximately constant temperature raises its pressure."
    },
    {
      q: "Why does gas pressure act on all walls of a closed container?",
      hint: "Consider the directions of particle motion.",
      steps: ["Gas particles move randomly in all directions.", "They collide with all the container walls.", "Pressure is exerted on each wall."],
      ans: "Gas particles move randomly and collide with walls in all directions.",
      why: "Random motion means collisions occur against all surfaces."
    },
    {
      q: "A learner says gas pressure is caused only by the weight of the gas. What is the more complete explanation?",
      hint: "Think about the microscopic explanation.",
      steps: ["Gas particles move randomly.", "Their collisions with surfaces exert forces.", "The resulting force per unit area is gas pressure."],
      ans: "Gas pressure results from particle collisions with surfaces.",
      why: "The particle-collision model explains pressure in a confined gas."
    },
    {
      q: "Air is compressed in a sealed syringe while its temperature remains approximately constant. Which two quantities change?",
      hint: "Consider the plunger's movement and the pressure response.",
      steps: ["Pushing the plunger inward reduces the gas volume.", "The gas pressure increases."],
      ans: "Volume decreases and pressure increases.",
      why: "Compressing the gas at approximately constant temperature increases its pressure."
    }
  ]
);
add(
  "physics",
  "force_motion_and_mechanics",
  "Free Fall",
  `<h2>What is free fall?</h2>
  <p><b>Free fall</b> is motion in which gravity is the only force acting on an object.</p>
  <p>Near Earth's surface, an object in free fall accelerates downward because of gravity.</p>
  <p>When air resistance is negligible, objects of different masses fall with the same acceleration from the same height.</p>
  <h3>Worked example</h3>
  <p>A stone is dropped from rest. Ignore air resistance. What happens to its speed as it falls?</p>
  <p>Gravity accelerates the stone downward, so its speed increases as it falls.</p>
  <p><b>Important distinction:</b> an object moving downward is not necessarily in free fall. If air resistance or another force acts significantly, gravity is not the only force acting.</p>`,
  [
    {
      q: "What is free fall?",
      hint: "Consider which force acts on the object.",
      steps: ["Free fall occurs when gravity is the only force acting.", "Air resistance is neglected in the ideal model."],
      ans: "Motion under the action of gravity alone",
      why: "Free fall describes motion when gravity is the only acting force."
    },
    {
      q: "A stone is dropped and air resistance is negligible. What happens to its speed as it falls?",
      hint: "Gravity produces downward acceleration.",
      steps: ["Gravity accelerates the stone downward.", "Its downward speed increases during the fall."],
      ans: "Its speed increases.",
      why: "A freely falling stone accelerates due to gravity."
    },
    {
      q: "Two objects of different masses are dropped together in a vacuum from the same height. Which reaches the ground first?",
      hint: "There is no air resistance.",
      steps: ["Both objects experience gravitational acceleration.", "In a vacuum, their accelerations are equal.", "They reach the ground together if released together."],
      ans: "They reach the ground together.",
      why: "Without air resistance, mass does not determine the free-fall acceleration."
    },
    {
      q: "Is a parachutist moving downward at constant speed necessarily in free fall?",
      hint: "Consider the force exerted by the air.",
      steps: ["Air resistance acts upward.", "Gravity acts downward.", "Gravity is not the only force acting."],
      ans: "No",
      why: "A parachutist experiences air resistance, so the motion is not free fall in the strict sense."
    },
    {
      q: "A ball is released from rest and falls freely. What is its initial speed?",
      hint: "Released from rest means it starts without motion.",
      steps: ["The ball is released from rest.", "Its initial speed is zero."],
      ans: "0 m/s",
      why: "An object released from rest has zero initial speed."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Acceleration Due to Gravity",
  `<h2>The value of g</h2>
  <p>Near Earth's surface, freely falling objects accelerate downward at approximately <b>9.8 m/s²</b>. In many school calculations, use <b>g = 10 m/s²</b> when instructed.</p>
  <p>Acceleration describes the change in velocity per unit time.</p>
  <p><b>a = (v − u)/t</b></p>
  <ul>
    <li>u = initial velocity</li>
    <li>v = final velocity</li>
    <li>t = time taken</li>
  </ul>
  <h3>Worked example</h3>
  <p>An object starts from rest and falls freely for 3 s. Take g = 10 m/s².</p>
  <p>v = u + gt</p>
  <p>v = 0 + 10 × 3 = <b>30 m/s downward</b>.</p>
  <p><b>Watch the units:</b> acceleration is measured in m/s², not m/s.</p>`,
  [
    {
      q: "What is the approximate acceleration due to gravity near Earth's surface?",
      hint: "Use the standard school value.",
      steps: ["The approximate value is 9.8 m/s².", "Some school calculations use 10 m/s²."],
      ans: "Approximately 9.8 m/s²",
      why: "The local gravitational acceleration near Earth's surface is about 9.8 m/s²."
    },
    {
      q: "An object starts from rest and falls for 2 s. Find its final speed using g = 10 m/s².",
      hint: "Use v = u + gt.",
      steps: ["u = 0 m/s, g = 10 m/s², t = 2 s.", "v = 0 + 10 × 2.", "v = 20 m/s downward."],
      ans: "20 m/s downward",
      why: "The speed increases by 10 m/s each second under the stated approximation."
    },
    {
      q: "A falling object's speed increases from 5 m/s to 25 m/s in 2 s. Calculate its acceleration.",
      hint: "Use a = (v − u)/t.",
      steps: ["a = (25 − 5)/2", "a = 20/2", "a = 10 m/s²"],
      ans: "10 m/s²",
      why: "Acceleration is the change in velocity divided by time."
    },
    {
      q: "Which is the correct unit for acceleration?",
      hint: "Acceleration is the change in velocity per second.",
      steps: ["Velocity is measured in m/s.", "Divide a change in velocity by seconds.", "The unit is m/s²."],
      ans: "m/s²",
      why: "Acceleration measures velocity change per unit time."
    },
    {
      q: "A learner writes g = 10 m/s. What is wrong?",
      hint: "Check whether g is a speed or an acceleration.",
      steps: ["g represents gravitational acceleration.", "Acceleration is measured in m/s², not m/s."],
      ans: "The correct unit is m/s².",
      why: "m/s is a velocity unit; m/s² is an acceleration unit."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's First Law of Motion",
  `<h2>The law of inertia</h2>
  <p>Newton's first law states that an object remains at rest or continues moving with constant velocity in a straight line unless acted on by a resultant external force.</p>
  <p>The key phrase is <b>resultant force</b>. Several forces can act on an object and still balance one another.</p>
  <h3>Worked example</h3>
  <p>A book rests on a table. Its weight acts downward, while the table's support force acts upward. If these forces balance, the resultant force is zero and the book remains at rest.</p>
  <p>An object does not need a continuous resultant force to maintain constant velocity. A resultant force is needed to change its velocity.</p>`,
  [
    {
      q: "State Newton's first law of motion.",
      hint: "Think about what happens when the resultant force is zero.",
      steps: ["If the resultant external force is zero, velocity does not change.", "An object stays at rest or moves with constant velocity in a straight line."],
      ans: "An object remains at rest or moves with constant velocity unless acted on by a resultant external force.",
      why: "The law describes the behaviour of objects when the resultant force is zero."
    },
    {
      q: "A stationary book has balanced forces acting on it. What is its resultant force?",
      hint: "Balanced forces cancel.",
      steps: ["The upward support force balances the downward weight.", "The resultant force is zero."],
      ans: "0 N",
      why: "Equal and opposite forces have a zero resultant."
    },
    {
      q: "A trolley moves in a straight line at constant velocity. What is its resultant force?",
      hint: "Its velocity is not changing.",
      steps: ["Constant velocity means zero acceleration.", "The resultant force is zero."],
      ans: "0 N",
      why: "A non-zero resultant force would cause acceleration."
    },
    {
      q: "Does a moving object always need a resultant force in the direction of motion to keep moving?",
      hint: "Recall the first law.",
      steps: ["The first law allows motion at constant velocity with zero resultant force.", "A resultant force is needed to change velocity."],
      ans: "No",
      why: "An object can continue moving at constant velocity without a resultant force."
    },
    {
      q: "A ball slows down while rolling across a rough floor. Why does this not contradict Newton's first law?",
      hint: "Identify a force that opposes the motion.",
      steps: ["Friction acts opposite the motion.", "The forces are not balanced in the direction of motion.", "The ball slows down."],
      ans: "Friction creates a resultant force opposite the motion.",
      why: "The first law applies when the resultant force is zero."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's Second Law of Motion",
  `<h2>Force, mass and acceleration</h2>
  <p>Newton's second law relates the resultant force on an object to its mass and acceleration.</p>
  <p>For a constant mass:</p>
  <p><b>F = ma</b></p>
  <ul>
    <li>F = resultant force in newtons (N)</li>
    <li>m = mass in kilograms (kg)</li>
    <li>a = acceleration in m/s²</li>
  </ul>
  <h3>Worked example</h3>
  <p>A 4 kg trolley accelerates at 3 m/s².</p>
  <p>F = ma = 4 × 3 = <b>12 N</b>.</p>
  <p><b>Remember:</b> use the resultant force, not automatically one of the individual forces acting on the object.</p>`,
  [
    {
      q: "State the formula relating resultant force, mass and acceleration.",
      hint: "Multiply mass by acceleration.",
      steps: ["Identify mass m and acceleration a.", "Use F = ma."],
      ans: "F = ma",
      why: "Newton's second law relates resultant force to mass and acceleration."
    },
    {
      q: "A 5 kg object accelerates at 2 m/s². Calculate the resultant force.",
      hint: "Use F = ma.",
      steps: ["F = 5 × 2", "F = 10 N"],
      ans: "10 N",
      why: "Multiplying mass by acceleration gives resultant force."
    },
    {
      q: "A resultant force of 24 N acts on a 6 kg object. Calculate its acceleration.",
      hint: "Rearrange F = ma to find a.",
      steps: ["a = F/m", "a = 24/6", "a = 4 m/s²"],
      ans: "4 m/s²",
      why: "Acceleration equals resultant force divided by mass."
    },
    {
      q: "A force of 15 N produces an acceleration of 3 m/s². Find the object's mass.",
      hint: "Rearrange F = ma.",
      steps: ["m = F/a", "m = 15/3", "m = 5 kg"],
      ans: "5 kg",
      why: "Mass equals resultant force divided by acceleration."
    },
    {
      q: "A learner uses the largest individual force in F = ma even though other forces oppose it. What should the learner use?",
      hint: "Find the overall effect of all the forces.",
      steps: ["Determine the direction of each force.", "Combine the forces to find the resultant.", "Use the resultant force in F = ma."],
      ans: "The resultant force",
      why: "Newton's second law uses the net force acting on the object."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Calculating Acceleration from Resultant Force",
  `<h2>Find the net force first</h2>
  <p>When forces act in opposite directions, subtract the smaller force from the larger force to find the resultant force.</p>
  <p>Then use <b>a = F/m</b>.</p>
  <h3>Worked example</h3>
  <p>A 4 kg trolley is pulled to the right by 20 N. Friction acts to the left with a force of 8 N.</p>
  <p>Resultant force = 20 − 8 = 12 N to the right.</p>
  <p>Acceleration = 12 ÷ 4 = <b>3 m/s² to the right</b>.</p>
  <p><b>Common error:</b> using 20 N as the resultant force while ignoring friction.</p>`,
  [
    {
      q: "A 10 N force acts rightward and a 4 N force acts leftward on a 2 kg object. Find its acceleration.",
      hint: "Find the resultant force before using a = F/m.",
      steps: ["Resultant force = 10 − 4 = 6 N rightward.", "a = 6/2", "a = 3 m/s² rightward."],
      ans: "3 m/s² rightward",
      why: "Acceleration follows the direction of the resultant force."
    },
    {
      q: "Two opposite forces of 15 N and 15 N act on a 5 kg object. Find its acceleration.",
      hint: "Equal opposite forces cancel.",
      steps: ["Resultant force = 15 − 15 = 0 N.", "a = F/m = 0/5 = 0 m/s²."],
      ans: "0 m/s²",
      why: "A zero resultant force produces zero acceleration."
    },
    {
      q: "A 3 kg box experiences 18 N east and 6 N west. Calculate its acceleration.",
      hint: "Subtract the opposing forces.",
      steps: ["Resultant force = 18 − 6 = 12 N east.", "a = 12/3", "a = 4 m/s² east."],
      ans: "4 m/s² east",
      why: "The net force is 12 N eastward."
    },
    {
      q: "A 6 kg trolley accelerates at 2 m/s² to the left. What is the resultant force?",
      hint: "Use F = ma and keep the direction.",
      steps: ["F = 6 × 2", "F = 12 N leftward."],
      ans: "12 N leftward",
      why: "The resultant force has the same direction as the acceleration."
    },
    {
      q: "A 5 kg object is pulled with 30 N to the right while friction is 10 N to the left. A learner calculates acceleration as 30/5. What is the error?",
      hint: "The pulling force is not the resultant force.",
      steps: ["Resultant force = 30 − 10 = 20 N right.", "a = 20/5 = 4 m/s² right."],
      ans: "The learner ignored friction; the correct acceleration is 4 m/s² rightward.",
      why: "All forces must be combined before applying Newton's second law."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Calculating Force and Mass",
  `<h2>Rearranging Newton's second law</h2>
  <p>From <b>F = ma</b>, two useful forms are:</p>
  <p><b>m = F/a</b></p>
  <p><b>a = F/m</b></p>
  <p>Use these relationships when the force, mass or acceleration is unknown.</p>
  <h3>Worked example</h3>
  <p>A resultant force of 36 N produces an acceleration of 4 m/s².</p>
  <p>m = F/a = 36/4 = <b>9 kg</b>.</p>
  <p>Check the units: N divided by m/s² gives kg.</p>`,
  [
    {
      q: "A force of 50 N produces an acceleration of 5 m/s². Find the mass.",
      hint: "Use m = F/a.",
      steps: ["m = 50/5", "m = 10 kg"],
      ans: "10 kg",
      why: "Mass is resultant force divided by acceleration."
    },
    {
      q: "A 7 kg object accelerates at 3 m/s². Calculate the resultant force.",
      hint: "Use F = ma.",
      steps: ["F = 7 × 3", "F = 21 N"],
      ans: "21 N",
      why: "Force is the product of mass and acceleration."
    },
    {
      q: "A resultant force of 48 N acts on a 12 kg object. Find its acceleration.",
      hint: "Use a = F/m.",
      steps: ["a = 48/12", "a = 4 m/s²"],
      ans: "4 m/s²",
      why: "Acceleration is resultant force divided by mass."
    },
    {
      q: "A 2 kg object accelerates at 6 m/s². What force is acting on it as a resultant?",
      hint: "Multiply mass by acceleration.",
      steps: ["F = 2 × 6", "F = 12 N"],
      ans: "12 N",
      why: "The resultant force equals mass multiplied by acceleration."
    },
    {
      q: "A student calculates mass by multiplying force by acceleration. Correct the method.",
      hint: "Rearrange F = ma to isolate mass.",
      steps: ["Start with F = ma.", "Divide both sides by a.", "m = F/a."],
      ans: "Mass = force divided by acceleration",
      why: "Dividing by acceleration isolates mass in the equation."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Newton's Third Law of Motion",
  `<h2>Action and reaction</h2>
  <p>Newton's third law states that when one object exerts a force on another object, the second object simultaneously exerts an equal-sized force in the opposite direction on the first object.</p>
  <p>The two forces:</p>
  <ul>
    <li>have equal magnitudes;</li>
    <li>act in opposite directions;</li>
    <li>act on different objects;</li>
    <li>occur at the same time.</li>
  </ul>
  <h3>Worked example</h3>
  <p>When you push a wall, you exert a force on the wall. The wall exerts an equal and opposite force on you.</p>
  <p><b>Key idea:</b> action and reaction forces do not cancel each other on a single object because they act on different objects.</p>`,
  [
    {
      q: "State Newton's third law of motion.",
      hint: "Consider the forces between two interacting objects.",
      steps: ["Object A exerts a force on object B.", "Object B exerts an equal and opposite force on object A."],
      ans: "Interacting objects exert equal and opposite forces on each other.",
      why: "The forces occur together and act on different objects."
    },
    {
      q: "A swimmer pushes water backward. In which direction does the water exert a force on the swimmer?",
      hint: "The reaction force is opposite to the swimmer's force on the water.",
      steps: ["The swimmer pushes water backward.", "The water exerts an opposite force on the swimmer.", "The force on the swimmer is forward."],
      ans: "Forward",
      why: "The forward reaction force helps propel the swimmer."
    },
    {
      q: "A person pushes a wall with 40 N. What force does the wall exert on the person?",
      hint: "Use Newton's third law.",
      steps: ["The person exerts 40 N on the wall.", "The wall exerts an equal force in the opposite direction."],
      ans: "40 N in the opposite direction",
      why: "The interaction forces have equal magnitudes and opposite directions."
    },
    {
      q: "Why do action and reaction forces not cancel on the same object?",
      hint: "Identify where each force acts.",
      steps: ["The action force acts on one object.", "The reaction force acts on the other object.", "They therefore act on different objects."],
      ans: "They act on different objects.",
      why: "Only forces acting on the same object can cancel in its force balance."
    },
    {
      q: "A learner says a horse cannot pull a cart because the cart pulls the horse backward with an equal force. What is wrong with this reasoning?",
      hint: "Consider the forces acting on the horse and the cart separately.",
      steps: ["The horse pulls the cart.", "The cart pulls the horse in the opposite direction.", "These forces act on different objects; other external forces determine the motion of the horse-cart system."],
      ans: "The forces act on different objects and do not automatically cancel on the whole system.",
      why: "Newton's third law does not prevent motion; the system's external forces determine its acceleration."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Action-Reaction Force Pairs",
  `<h2>Recognising a force pair</h2>
  <p>To identify a Newton's third-law pair, name both interacting objects and the force each exerts on the other.</p>
  <h3>Example: a book on a table</h3>
  <ul>
    <li>The book pushes downward on the table.</li>
    <li>The table pushes upward on the book.</li>
  </ul>
  <p>These are an action-reaction pair. However, the upward support force and the book's downward weight are <b>not</b> a third-law pair: both act on the book.</p>
  <p>The reaction to Earth's gravitational force on the book is the book's gravitational force on Earth.</p>
  <p><b>Diagnostic rule:</b> if both forces act on the same object, they are not a Newton's third-law pair.</p>`,
  [
    {
      q: "A book pushes down on a table. What is the reaction force?",
      hint: "Name the force exerted by the table on the book.",
      steps: ["The book exerts a downward force on the table.", "The table exerts an equal upward force on the book."],
      ans: "The table pushes upward on the book.",
      why: "The two contact forces act on different objects."
    },
    {
      q: "Are a book's weight and the table's upward support force a Newton's third-law pair?",
      hint: "Check whether both forces act on the same object.",
      steps: ["The book's weight acts on the book.", "The support force also acts on the book.", "They are not a third-law pair."],
      ans: "No",
      why: "Third-law forces act on different objects."
    },
    {
      q: "Earth pulls a falling stone downward. What is the corresponding reaction force?",
      hint: "Reverse the two interacting objects.",
      steps: ["Earth exerts a gravitational force on the stone.", "The stone exerts an equal and opposite gravitational force on Earth."],
      ans: "The stone pulls Earth toward itself gravitationally.",
      why: "Gravitational forces occur between both interacting bodies."
    },
    {
      q: "A swimmer pushes water backward with 25 N. State the force exerted by the water on the swimmer.",
      hint: "Equal magnitude, opposite direction.",
      steps: ["The swimmer's force is 25 N backward on the water.", "The water's reaction is 25 N forward on the swimmer."],
      ans: "25 N forward",
      why: "The reaction force is equal in magnitude and opposite in direction."
    },
    {
      q: "Two students say that the action and reaction forces cancel because they are equal and opposite. What question should you ask to check their claim?",
      hint: "Consider the objects on which the forces act.",
      steps: ["Identify the object receiving the first force.", "Identify the object receiving the second force.", "If the objects differ, the forces do not cancel on one object's force balance."],
      ans: "Do the two forces act on the same object?",
      why: "The objects involved determine whether forces can cancel in a single-object force balance."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Mass and Inertia",
  `<h2>What is inertia?</h2>
  <p><b>Inertia</b> is the tendency of an object to resist a change in its state of rest or motion.</p>
  <p>Mass is a measure of an object's inertia. An object with greater mass is harder to accelerate or decelerate by the same resultant force.</p>
  <h3>Worked comparison</h3>
  <p>A 2 kg trolley and a 10 kg trolley experience the same resultant force of 20 N.</p>
  <p>For the 2 kg trolley: a = 20/2 = 10 m/s².</p>
  <p>For the 10 kg trolley: a = 20/10 = 2 m/s².</p>
  <p>The more massive trolley has less acceleration because it has greater inertia.</p>
  <p><b>Do not confuse:</b> mass is measured in kilograms; weight is a force measured in newtons.</p>`,
  [
    {
      q: "What is inertia?",
      hint: "It describes resistance to a change in motion.",
      steps: ["An object tends to maintain its state of rest or motion.", "Resistance to a change in that state is called inertia."],
      ans: "The tendency to resist a change in motion",
      why: "Inertia explains why changing an object's velocity requires a resultant force."
    },
    {
      q: "Which has greater inertia: a 2 kg object or a 10 kg object?",
      hint: "Compare their masses.",
      steps: ["Mass measures inertia.", "10 kg is greater than 2 kg."],
      ans: "The 10 kg object",
      why: "The object with greater mass has greater inertia."
    },
    {
      q: "A 4 kg object experiences a resultant force of 12 N. Calculate its acceleration.",
      hint: "Use a = F/m.",
      steps: ["a = 12/4", "a = 3 m/s²"],
      ans: "3 m/s²",
      why: "Acceleration equals resultant force divided by mass."
    },
    {
      q: "Two objects experience the same resultant force. Why does the object with greater mass have a smaller acceleration?",
      hint: "Use Newton's second law.",
      steps: ["a = F/m.", "The force is the same for both objects.", "A greater mass gives a smaller value of F/m."],
      ans: "Greater mass produces smaller acceleration for the same resultant force.",
      why: "Mass measures resistance to acceleration."
    },
    {
      q: "Is inertia a force?",
      hint: "Think about whether inertia is an interaction or a property.",
      steps: ["Inertia describes an object's resistance to changes in motion.", "It is a property associated with mass, not a separate force."],
      ans: "No",
      why: "Inertia is a property of matter, not an additional force acting on an object."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Inertia and Safety",
  `<h2>Inertia in everyday life</h2>
  <p>Inertia helps explain everyday events involving sudden changes in motion.</p>
  <ul>
    <li><b>Braking:</b> when a vehicle stops suddenly, passengers tend to continue moving forward.</li>
    <li><b>Starting:</b> when a bus accelerates forward, passengers may appear to lean backward relative to the bus.</li>
    <li><b>Seat belts:</b> they help restrain occupants during rapid deceleration.</li>
  </ul>
  <h3>Worked explanation</h3>
  <p>A moving car brakes suddenly. The car's speed decreases, but a passenger's body tends to continue moving forward. A seat belt exerts a force that helps slow the passenger with the car.</p>
  <p><b>Key idea:</b> inertia is not an extra forward force. It is the tendency of the body to resist the change in its motion.</p>`,
  [
    {
      q: "Why does a passenger tend to move forward when a moving car stops suddenly?",
      hint: "The passenger's body was moving before the car stopped.",
      steps: ["The car decelerates rapidly.", "The passenger's body tends to maintain its previous motion.", "The passenger moves forward relative to the car."],
      ans: "Inertia makes the body tend to continue its previous motion.",
      why: "The body resists the sudden change in velocity."
    },
    {
      q: "How does a seat belt help during sudden braking?",
      hint: "It restrains the passenger.",
      steps: ["The passenger tends to continue moving forward.", "The seat belt exerts a force on the passenger.", "That force helps decelerate the passenger with the vehicle."],
      ans: "It exerts a force that restrains and slows the passenger.",
      why: "The seat belt reduces the risk of the passenger continuing forward unchecked."
    },
    {
      q: "Why might a standing passenger lean backward relative to a bus when it accelerates forward?",
      hint: "Consider the passenger's initial state of rest.",
      steps: ["The bus begins moving forward.", "The passenger's body tends to remain at rest.", "Relative to the bus, the passenger appears to lean backward."],
      ans: "The body resists the change from rest due to inertia.",
      why: "Inertia resists the change in motion as the bus accelerates."
    },
    {
      q: "Is inertia itself the forward force that moves a passenger during braking?",
      hint: "Inertia is a property, not an interaction force.",
      steps: ["Inertia is resistance to a change in motion.", "It is not a separate force.", "The passenger's motion changes when external forces act."],
      ans: "No",
      why: "Inertia describes the tendency to maintain motion; it is not a force."
    },
    {
      q: "Two vehicles travel at the same speed and brake similarly. Why may occupants in the heavier vehicle still need effective restraints?",
      hint: "Consider what happens to moving occupants when the vehicle slows.",
      steps: ["Occupants have inertia because they have mass.", "When the vehicle decelerates, their bodies tend to continue moving.", "Restraints provide forces to slow them safely."],
      ans: "Their bodies still have inertia and need forces to slow them with the vehicle.",
      why: "Seat belts help restrain occupants during changes in vehicle motion."
    }
  ]
);
add(
  "physics",
  "force_motion_and_mechanics",
  "Resultant Force in the Same Direction",
  `<h2>Forces acting in the same direction</h2>
  <p>When forces act on the same object in the same direction, their magnitudes are added to find the resultant force.</p>
  <p><b>R = F₁ + F₂</b></p>
  <h3>Worked example</h3>
  <p>Two people push a trolley forward with forces of 30 N and 20 N.</p>
  <p>R = 30 + 20 = <b>50 N forward</b>.</p>
  <p>If the object has mass 10 kg, its acceleration is:</p>
  <p>a = R/m = 50/10 = <b>5 m/s² forward</b>.</p>
  <p><b>Remember:</b> add forces only after confirming that they act in the same direction.</p>`,
  [
    {
      q: "Two people push a box to the right with forces of 15 N and 25 N. Find the resultant force.",
      hint: "Both forces act in the same direction.",
      steps: ["R = 15 + 25", "R = 40 N to the right."],
      ans: "40 N to the right",
      why: "Forces in the same direction add together."
    },
    {
      q: "Two forces of 12 N and 18 N act eastward. Calculate their resultant.",
      hint: "Add the two forces.",
      steps: ["R = 12 + 18", "R = 30 N eastward."],
      ans: "30 N eastward",
      why: "Both forces act eastward."
    },
    {
      q: "A 6 kg trolley experiences a resultant force of 24 N eastward. Find its acceleration.",
      hint: "Use a = R/m.",
      steps: ["a = 24/6", "a = 4 m/s² eastward."],
      ans: "4 m/s² eastward",
      why: "Acceleration equals resultant force divided by mass."
    },
    {
      q: "Three forces of 5 N, 7 N and 8 N act in the same direction. Find their resultant.",
      hint: "Add all three magnitudes.",
      steps: ["R = 5 + 7 + 8", "R = 20 N."],
      ans: "20 N in their common direction",
      why: "All three forces contribute to the same direction of resultant force."
    },
    {
      q: "A learner subtracts two forces of 10 N and 20 N that both act forward. Identify the error.",
      hint: "Check whether the forces oppose one another.",
      steps: ["Both forces act forward.", "Forces in the same direction are added.", "R = 10 + 20 = 30 N forward."],
      ans: "The forces should be added, giving 30 N forward.",
      why: "Subtraction is used when forces act in opposite directions."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Resultant Force in Opposite Directions",
  `<h2>Opposing forces</h2>
  <p>When two forces act in opposite directions along the same straight line, subtract the smaller magnitude from the larger.</p>
  <p><b>Resultant magnitude = larger force − smaller force</b></p>
  <p>The resultant acts in the direction of the larger force.</p>
  <h3>Worked example</h3>
  <p>A rope is pulled eastward with 70 N and westward with 45 N.</p>
  <p>R = 70 − 45 = <b>25 N eastward</b>.</p>
  <p>If both forces were equal, the resultant would be zero.</p>
  <p><b>Check:</b> state both the magnitude and direction of the resultant.</p>`,
  [
    {
      q: "A box is pulled rightward by 40 N and leftward by 15 N. Find the resultant.",
      hint: "Subtract the smaller opposing force.",
      steps: ["R = 40 − 15", "R = 25 N rightward."],
      ans: "25 N rightward",
      why: "The larger force acts to the right."
    },
    {
      q: "A cart experiences 60 N eastward and 60 N westward. Find the resultant.",
      hint: "Equal opposite forces cancel.",
      steps: ["R = 60 − 60", "R = 0 N."],
      ans: "0 N",
      why: "Equal forces in opposite directions cancel."
    },
    {
      q: "A 5 kg object experiences a net force of 15 N northward. Calculate its acceleration.",
      hint: "Use a = R/m.",
      steps: ["a = 15/5", "a = 3 m/s² northward."],
      ans: "3 m/s² northward",
      why: "The acceleration is in the direction of the resultant force."
    },
    {
      q: "A tug-of-war team pulls with 500 N leftward while the opposing team pulls with 650 N rightward. Find the resultant.",
      hint: "Subtract and follow the larger force.",
      steps: ["R = 650 − 500", "R = 150 N rightward."],
      ans: "150 N rightward",
      why: "The rightward force is larger by 150 N."
    },
    {
      q: "A learner calculates 30 N − 50 N = 20 N rightward when the 50 N force acts rightward and the 30 N force acts leftward. Correct the answer.",
      hint: "The direction must match the larger force.",
      steps: ["Magnitude = 50 − 30 = 20 N.", "The larger force acts rightward."],
      ans: "20 N rightward",
      why: "The magnitude is correct, and the direction follows the 50 N force."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "The Normal Reaction Force",
  `<h2>Support from a surface</h2>
  <p>The <b>normal reaction</b> is the contact force a surface exerts on an object. It acts perpendicular to the contact surface.</p>
  <p>For a stationary object on a horizontal surface with no other vertical forces, the normal reaction balances the object's weight.</p>
  <p><b>R = mg</b> in that specific situation.</p>
  <h3>Worked example</h3>
  <p>A 4 kg box rests on a horizontal floor. Take g = 10 N/kg.</p>
  <p>Weight = mg = 4 × 10 = 40 N downward.</p>
  <p>Since the box is vertically balanced, the normal reaction is <b>40 N upward</b>.</p>
  <p><b>Important:</b> the normal reaction is not always equal to weight. Other forces or acceleration can change its value.</p>`,
  [
    {
      q: "What is the normal reaction force?",
      hint: "It is a contact force from a surface.",
      steps: ["A surface is in contact with an object.", "The surface exerts a force perpendicular to itself."],
      ans: "A contact force perpendicular to the surface",
      why: "The normal reaction is the surface's perpendicular contact force."
    },
    {
      q: "A 3 kg box rests on a horizontal floor. Find its weight using g = 10 N/kg.",
      hint: "Use W = mg.",
      steps: ["W = 3 × 10", "W = 30 N downward."],
      ans: "30 N downward",
      why: "Weight is mass multiplied by gravitational field strength."
    },
    {
      q: "A stationary 5 kg box rests on a horizontal floor with no other vertical forces. Find the normal reaction using g = 10 N/kg.",
      hint: "Vertical forces are balanced.",
      steps: ["Weight = 5 × 10 = 50 N downward.", "The normal reaction balances the weight.", "Normal reaction = 50 N upward."],
      ans: "50 N upward",
      why: "The box has no vertical acceleration, so the vertical forces balance."
    },
    {
      q: "A book rests on a level table. In which direction does the table's normal reaction act on the book?",
      hint: "The reaction is perpendicular to the table.",
      steps: ["The table is horizontal.", "The perpendicular direction is vertical.", "The reaction acts upward on the book."],
      ans: "Vertically upward",
      why: "The normal reaction acts perpendicular to the contact surface."
    },
    {
      q: "A learner claims the normal reaction is always equal to an object's weight. Is this correct?",
      hint: "Think about a box being pushed downward or an object accelerating vertically.",
      steps: ["Equality applies when the vertical forces balance in the stated simple situation.", "Additional vertical forces or vertical acceleration can change the normal reaction."],
      ans: "No",
      why: "The normal reaction depends on the full force situation, not weight alone."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Tension in a String",
  `<h2>What is tension?</h2>
  <p><b>Tension</b> is the pulling force transmitted through a taut string, rope or cable.</p>
  <p>Tension acts along the string and pulls on the objects attached to its ends.</p>
  <h3>Worked example: a hanging mass</h3>
  <p>A 2 kg mass hangs at rest from a light vertical string. Take g = 10 N/kg.</p>
  <p>Weight = mg = 2 × 10 = 20 N downward.</p>
  <p>Because the mass is at rest, the upward tension balances the weight:</p>
  <p><b>T = 20 N</b>.</p>
  <p><b>Important:</b> tension does not always equal weight. That equality applies here because the mass is stationary and the only forces are tension and weight.</p>`,
  [
    {
      q: "What is tension?",
      hint: "Think of the force transmitted by a taut rope.",
      steps: ["A taut string or rope transmits a pulling force.", "This force is called tension."],
      ans: "A pulling force transmitted through a taut string, rope or cable",
      why: "Tension acts along the length of the taut connector."
    },
    {
      q: "A 4 kg mass hangs at rest from a string. Calculate the tension using g = 10 N/kg.",
      hint: "The tension balances the weight.",
      steps: ["Weight = 4 × 10 = 40 N.", "The mass is stationary.", "Tension = 40 N upward."],
      ans: "40 N",
      why: "The upward tension balances the downward weight."
    },
    {
      q: "In which direction does a vertical string pull a mass hanging from it?",
      hint: "Tension pulls along the string.",
      steps: ["The string is vertical.", "Tension acts along the string.", "The string pulls the mass upward."],
      ans: "Upward",
      why: "A string can pull but does not push the hanging mass upward."
    },
    {
      q: "A 3 kg mass hangs at rest. Take g = 10 N/kg. What is the resultant force on the mass?",
      hint: "The mass is not accelerating.",
      steps: ["Weight = 30 N downward.", "Tension = 30 N upward.", "Resultant force = 0 N."],
      ans: "0 N",
      why: "The upward and downward forces balance."
    },
    {
      q: "A learner says tension must equal weight whenever an object hangs from a string. What condition is missing?",
      hint: "Compare a stationary mass with an accelerating one.",
      steps: ["For a stationary hanging mass with no other forces, tension equals weight.", "If the mass accelerates, the forces need not balance."],
      ans: "The object must have zero acceleration and no other relevant forces.",
      why: "Tension equals weight only under the appropriate force-balance conditions."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Drawing Force Diagrams",
  `<h2>Representing forces</h2>
  <p>A force diagram represents the forces acting on one chosen object using arrows.</p>
  <ul>
    <li>The arrow direction shows the force direction.</li>
    <li>The arrow length can represent the force magnitude when drawn to scale.</li>
    <li>Label each arrow with the force name or value.</li>
  </ul>
  <h3>Worked example: a box on a floor</h3>
  <p>A box rests on a horizontal floor.</p>
  <ul>
    <li>Weight acts downward.</li>
    <li>Normal reaction acts upward.</li>
  </ul>
  <p>If the box is stationary and no other vertical forces act, the two forces are equal in magnitude.</p>
  <p><b>Rule:</b> draw only forces acting on the chosen object. Do not draw the force it exerts on another object as if that force acted on the chosen object.</p>`,
  [
    {
      q: "What does an arrow represent in a force diagram?",
      hint: "Think about direction and magnitude.",
      steps: ["The arrow points in the force direction.", "Its length can represent magnitude when drawn to scale."],
      ans: "A force's direction and, when drawn to scale, its magnitude",
      why: "Force diagrams use arrows to represent forces."
    },
    {
      q: "Which forces act on a book resting on a horizontal table, ignoring other effects?",
      hint: "Consider gravity and the surface.",
      steps: ["Earth exerts weight downward.", "The table exerts a normal reaction upward."],
      ans: "Weight downward and normal reaction upward",
      why: "These are the two main forces acting on the resting book."
    },
    {
      q: "A stationary book has weight 12 N. What should the normal reaction arrow represent?",
      hint: "The vertical forces balance.",
      steps: ["Weight is 12 N downward.", "The normal reaction is 12 N upward.", "The arrows should be equal in length on a consistent scale."],
      ans: "A 12 N upward force",
      why: "The book has zero vertical acceleration."
    },
    {
      q: "When drawing a force diagram for a book, should you include the book's downward force on the table?",
      hint: "The diagram is for the book only.",
      steps: ["The book exerts a force on the table.", "That force acts on the table, not on the book.", "Do not include it in the book's force diagram."],
      ans: "No",
      why: "A force diagram includes forces acting on the chosen object."
    },
    {
      q: "A box is pulled rightward while friction acts leftward. Which forces should appear in a complete basic force diagram on a level floor?",
      hint: "Include contact, gravitational and applied forces.",
      steps: ["Weight acts downward.", "Normal reaction acts upward.", "The applied pull acts rightward.", "Friction acts leftward."],
      ans: "Weight, normal reaction, applied pull and friction",
      why: "The diagram must show all relevant forces acting on the box."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Forces on an Object in an Elevator",
  `<h2>Apparent weight in a lift</h2>
  <p>A person standing on a scale in an elevator experiences weight downward and a normal reaction upward. The scale reading is the normal reaction.</p>
  <p>When the elevator is stationary or moving at constant velocity, the forces balance:</p>
  <p><b>R = mg</b></p>
  <p>If the elevator accelerates upward, the normal reaction is greater than weight. If it accelerates downward, the normal reaction is less than weight.</p>
  <h3>Worked example</h3>
  <p>A 50 kg person stands in an elevator accelerating upward at 2 m/s². Take g = 10 m/s².</p>
  <p>R − mg = ma</p>
  <p>R = m(g + a) = 50(10 + 2) = <b>600 N</b>.</p>
  <p>This is an application of Newton's second law, not a change in the person's mass.</p>`,
  [
    {
      q: "A 60 kg person stands in a stationary elevator. Calculate the scale reading using g = 10 N/kg.",
      hint: "The normal reaction balances the weight.",
      steps: ["Weight = 60 × 10 = 600 N.", "The elevator is stationary.", "Scale reading = 600 N."],
      ans: "600 N",
      why: "With no vertical acceleration, the normal reaction equals the person's weight."
    },
    {
      q: "A 50 kg person accelerates upward at 2 m/s². Calculate the normal reaction using g = 10 m/s².",
      hint: "Use R − mg = ma.",
      steps: ["R = m(g + a)", "R = 50(10 + 2)", "R = 600 N"],
      ans: "600 N",
      why: "The upward resultant force is R − mg = ma."
    },
    {
      q: "A 40 kg person accelerates downward at 2 m/s². Calculate the normal reaction using g = 10 m/s².",
      hint: "For downward acceleration, mg − R = ma.",
      steps: ["R = m(g − a)", "R = 40(10 − 2)", "R = 320 N"],
      ans: "320 N",
      why: "The downward resultant force is the weight minus the normal reaction."
    },
    {
      q: "An elevator moves upward at constant velocity. How does the scale reading compare with the person's weight?",
      hint: "Constant velocity means zero acceleration.",
      steps: ["Acceleration is zero.", "The vertical forces balance.", "The normal reaction equals weight."],
      ans: "It equals the person's weight.",
      why: "The direction of motion does not determine the scale reading; acceleration does."
    },
    {
      q: "Does a person's mass increase when an elevator accelerates upward?",
      hint: "Distinguish mass from scale reading.",
      steps: ["Mass is a measure of inertia.", "The scale reading changes because the normal reaction changes.", "The person's mass remains the same."],
      ans: "No",
      why: "Apparent weight can change without a change in mass."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Braking Force and Deceleration",
  `<h2>Force during braking</h2>
  <p>When brakes slow a moving vehicle, the resultant force acts opposite its direction of motion. The vehicle therefore decelerates.</p>
  <p>Using Newton's second law, the magnitude of the resultant force is:</p>
  <p><b>F = ma</b></p>
  <p>Here, use the magnitude of the deceleration when calculating the magnitude of the braking force.</p>
  <h3>Worked example</h3>
  <p>A 1,000 kg car slows at 3 m/s² on a level road. Assume the stated deceleration is caused by the resultant braking force.</p>
  <p>F = ma = 1,000 × 3 = <b>3,000 N</b>, opposite the motion.</p>
  <p><b>Distinguish:</b> deceleration is acceleration opposite the current velocity; it is not a separate kind of force.</p>`,
  [
    {
      q: "A 1,200 kg car decelerates at 2 m/s². Calculate the magnitude of its resultant braking force.",
      hint: "Use F = ma with the deceleration magnitude.",
      steps: ["F = 1,200 × 2", "F = 2,400 N"],
      ans: "2,400 N",
      why: "The resultant force magnitude equals mass multiplied by acceleration magnitude."
    },
    {
      q: "In which direction does the resultant force act when a car moving forward slows down on a straight, level road?",
      hint: "The force produces acceleration opposite the motion.",
      steps: ["The car's velocity is forward.", "Its acceleration is backward while slowing down.", "The resultant force is backward."],
      ans: "Opposite the direction of motion",
      why: "The resultant force has the direction of the acceleration."
    },
    {
      q: "A 500 kg cart experiences a resultant force of 1,000 N opposite its motion. Find the acceleration magnitude.",
      hint: "Use a = F/m.",
      steps: ["a = 1,000/500", "a = 2 m/s²"],
      ans: "2 m/s²",
      why: "The acceleration magnitude is the force magnitude divided by mass."
    },
    {
      q: "A car is moving forward but its acceleration is backward. Is it speeding up or slowing down?",
      hint: "Compare the directions of velocity and acceleration.",
      steps: ["Velocity is forward.", "Acceleration is backward.", "The speed decreases."],
      ans: "Slowing down",
      why: "Acceleration opposite the velocity reduces the speed."
    },
    {
      q: "A learner says that a car must have a forward resultant force because it is moving forward. What is wrong?",
      hint: "Motion direction and force direction are not always the same.",
      steps: ["A moving car can have a backward resultant force while braking.", "The resultant force follows acceleration, not necessarily velocity."],
      ans: "The resultant force follows acceleration, not simply the direction of motion.",
      why: "An object may move forward while accelerating backward."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Force and Change in Momentum",
  `<h2>Momentum</h2>
  <p>Momentum is the product of an object's mass and velocity.</p>
  <p><b>p = mv</b></p>
  <ul>
    <li>p = momentum in kg m/s</li>
    <li>m = mass in kg</li>
    <li>v = velocity in m/s</li>
  </ul>
  <p>A resultant force changes an object's momentum. For constant mass and a constant force, Newton's second law can be expressed as:</p>
  <p><b>F = (change in momentum)/(time taken)</b></p>
  <h3>Worked example</h3>
  <p>A 2 kg trolley moves at 3 m/s eastward.</p>
  <p>p = mv = 2 × 3 = <b>6 kg m/s eastward</b>.</p>
  <p><b>Note:</b> velocity has direction, so momentum also has direction.</p>`,
  [
    {
      q: "Define momentum.",
      hint: "Multiply mass by velocity.",
      steps: ["Identify mass m and velocity v.", "Use p = mv."],
      ans: "The product of mass and velocity",
      why: "Momentum depends on both mass and velocity."
    },
    {
      q: "Calculate the momentum of a 4 kg object moving at 5 m/s eastward.",
      hint: "Use p = mv.",
      steps: ["p = 4 × 5", "p = 20 kg m/s eastward."],
      ans: "20 kg m/s eastward",
      why: "Momentum is mass multiplied by velocity."
    },
    {
      q: "A 3 kg object moves at 2 m/s westward. Calculate its momentum magnitude.",
      hint: "Multiply mass by speed for the magnitude.",
      steps: ["p = 3 × 2", "Momentum magnitude = 6 kg m/s."],
      ans: "6 kg m/s",
      why: "The magnitude is the product of mass and speed."
    },
    {
      q: "What happens to an object's momentum if its mass stays constant and its velocity doubles?",
      hint: "Use p = mv.",
      steps: ["p = mv.", "If v doubles while m stays constant, p doubles."],
      ans: "Its momentum doubles.",
      why: "Momentum is directly proportional to velocity at constant mass."
    },
    {
      q: "What is the SI unit of momentum?",
      hint: "Multiply kilograms by metres per second.",
      steps: ["p = mv.", "Unit = kg × m/s.", "Unit = kg m/s."],
      ans: "kg m/s",
      why: "Momentum is measured in kilogram metres per second."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Impulse and Impact Forces",
  `<h2>What is impulse?</h2>
  <p>Impulse is the change in momentum produced by a force acting over a time interval.</p>
  <p>For a constant resultant force:</p>
  <p><b>Impulse = F × t = change in momentum</b></p>
  <p>The SI unit is N s, equivalent to kg m/s.</p>
  <h3>Worked example</h3>
  <p>A resultant force of 20 N acts on a ball for 0.5 s.</p>
  <p>Impulse = 20 × 0.5 = <b>10 N s</b>.</p>
  <p>This means the ball's momentum changes by 10 kg m/s in the direction of the resultant force.</p>
  <p><b>Safety application:</b> airbags and padded surfaces increase the time over which a person's momentum changes, reducing the average force for the same change in momentum.</p>`,
  [
    {
      q: "Define impulse.",
      hint: "Relate force to the time it acts.",
      steps: ["Impulse equals resultant force multiplied by time.", "It is also equal to the change in momentum."],
      ans: "The change in momentum, equal to resultant force multiplied by time for a constant force",
      why: "Impulse links the force acting over a time interval to momentum change."
    },
    {
      q: "A force of 30 N acts for 0.2 s. Calculate the impulse.",
      hint: "Use impulse = F × t.",
      steps: ["Impulse = 30 × 0.2", "Impulse = 6 N s"],
      ans: "6 N s",
      why: "Impulse is force multiplied by the time interval."
    },
    {
      q: "What is the unit of impulse?",
      hint: "Multiply newtons by seconds.",
      steps: ["Impulse = force × time.", "Unit = N s."],
      ans: "N s",
      why: "A newton-second is equivalent to kg m/s."
    },
    {
      q: "Why can an airbag reduce the average force on a passenger during a collision?",
      hint: "For the same momentum change, consider the collision time.",
      steps: ["The passenger's momentum must change.", "The airbag increases the time over which that change occurs.", "Average force = change in momentum ÷ time, so it is reduced."],
      ans: "It increases the collision time, reducing the average force.",
      why: "A longer stopping time reduces average force for the same momentum change."
    },
    {
      q: "A ball's momentum changes by 12 kg m/s in 0.4 s. Calculate the average resultant force magnitude.",
      hint: "Use average force = change in momentum ÷ time.",
      steps: ["F = 12/0.4", "F = 30 N"],
      ans: "30 N",
      why: "Average resultant force is the momentum change divided by the time taken."
    }
  ]
);

add(
  "physics",
  "force_motion_and_mechanics",
  "Conservation of Momentum",
  `<h2>Momentum in an isolated system</h2>
  <p>The principle of conservation of momentum states that the total momentum of a system remains constant when the resultant external force on the system is zero.</p>
  <p>For two objects moving along one straight line:</p>
  <p><b>Total momentum before interaction = total momentum after interaction</b></p>
  <h3>Worked example</h3>
  <p>A 2 kg trolley moves at 4 m/s and collides with a stationary 2 kg trolley. They stick together.</p>
  <p>Initial momentum = (2 × 4) + (2 × 0) = 8 kg m/s.</p>
  <p>Combined mass = 2 + 2 = 4 kg.</p>
  <p>Final velocity = 8/4 = <b>2 m/s</b> in the original direction.</p>
  <p><b>Important:</b> momentum is conserved for the system when external forces have negligible resultant impulse during the interaction.</p>`,
  [
    {
      q: "State the principle of conservation of momentum.",
      hint: "Consider an isolated system.",
      steps: ["The resultant external force is zero or its impulse is negligible.", "Total momentum remains constant."],
      ans: "Total momentum remains constant in an isolated system.",
      why: "Internal interactions do not change the system's total momentum."
    },
    {
      q: "A 2 kg trolley moves at 3 m/s. A second 1 kg trolley is stationary. They stick together. Find their final velocity.",
      hint: "Conserve total momentum.",
      steps: ["Initial momentum = (2 × 3) + (1 × 0) = 6 kg m/s.", "Combined mass = 3 kg.", "Final velocity = 6/3 = 2 m/s."],
      ans: "2 m/s in the original direction",
      why: "The combined trolley's momentum must equal the initial total momentum."
    },
    {
      q: "A 1 kg object moves east at 6 m/s. Calculate its initial momentum.",
      hint: "Use p = mv.",
      steps: ["p = 1 × 6", "p = 6 kg m/s eastward."],
      ans: "6 kg m/s eastward",
      why: "Momentum is mass multiplied by velocity."
    },
    {
      q: "Why must directions be considered when applying momentum conservation to objects moving along a line?",
      hint: "Momentum is a vector quantity.",
      steps: ["Momentum has magnitude and direction.", "Opposite directions must be assigned opposite signs.", "The signed momenta are added to find the total."],
      ans: "Because momentum has direction.",
      why: "Ignoring direction can give the wrong total momentum."
    },
    {
      q: "A learner says momentum is always conserved for a single object, even when a strong external force acts. What is wrong?",
      hint: "The conservation principle applies to a system under specific conditions.",
      steps: ["An external force can change an object's momentum.", "Momentum conservation applies when the system's resultant external impulse is zero or negligible."],
      ans: "External forces can change momentum; the system conditions must be checked.",
      why: "Momentum conservation is not an unconditional rule for every object."
    }
  ]
);
add(
  "physics",
  "work_energy_power_machines",
  "Kinetic Energy",
  `<h2>Energy of a moving object</h2>
  <p>Kinetic energy is the energy an object possesses because it is moving.</p>
  <p><b>KE = ½mv²</b></p>
  <ul>
    <li>KE = kinetic energy in joules (J)</li>
    <li>m = mass in kilograms (kg)</li>
    <li>v = speed in metres per second (m/s)</li>
  </ul>
  <h3>Worked example</h3>
  <p>A 4 kg object moves at 3 m/s.</p>
  <p>KE = ½ × 4 × 3²</p>
  <p>KE = 2 × 9 = <b>18 J</b>.</p>
  <p><b>Common mistake:</b> square the speed before multiplying by half the mass.</p>`,
  [
    {
      q: "Calculate the kinetic energy of a 2 kg object moving at 4 m/s.",
      hint: "Use KE = ½mv².",
      steps: ["KE = ½ × 2 × 4²", "KE = 1 × 16", "KE = 16 J"],
      ans: "16 J",
      why: "Kinetic energy depends on mass and the square of speed."
    },
    {
      q: "A 5 kg object moves at 2 m/s. Find its kinetic energy.",
      hint: "Square 2 before multiplying.",
      steps: ["KE = ½ × 5 × 2²", "KE = 2.5 × 4", "KE = 10 J"],
      ans: "10 J",
      why: "Half the mass multiplied by speed squared gives kinetic energy."
    },
    {
      q: "A 1,000 kg car moves at 10 m/s. Calculate its kinetic energy.",
      hint: "Substitute the mass and speed into the formula.",
      steps: ["KE = ½ × 1000 × 10²", "KE = 500 × 100", "KE = 50,000 J"],
      ans: "50,000 J",
      why: "The speed must be squared before the multiplication."
    },
    {
      q: "What happens to kinetic energy if speed doubles while mass remains constant?",
      hint: "Compare v² with (2v)².",
      steps: ["Original KE is proportional to v².", "New KE is proportional to (2v)² = 4v²."],
      ans: "It becomes four times as large.",
      why: "Kinetic energy is proportional to the square of speed."
    },
    {
      q: "A learner calculates KE = ½ × 4 × 3 = 6 J for a 4 kg object moving at 3 m/s. Identify the error and give the correct answer.",
      hint: "Check whether the speed was squared.",
      steps: ["Use KE = ½mv².", "KE = ½ × 4 × 3².", "KE = 2 × 9 = 18 J."],
      ans: "The speed was not squared; the correct kinetic energy is 18 J.",
      why: "The formula contains v², not v."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Elastic Potential Energy",
  `<h2>Energy stored by deformation</h2>
  <p>An elastic object can store elastic potential energy when it is stretched or compressed, provided it behaves elastically.</p>
  <p>For a spring obeying Hooke's law:</p>
  <p><b>E = ½Fx = ½kx²</b></p>
  <ul>
    <li>E = elastic potential energy in joules</li>
    <li>F = final force in newtons</li>
    <li>x = extension or compression in metres</li>
    <li>k = spring constant in N/m</li>
  </ul>
  <h3>Worked example</h3>
  <p>A spring has a spring constant of 200 N/m and is extended by 0.1 m.</p>
  <p>E = ½ × 200 × 0.1²</p>
  <p>E = 100 × 0.01 = <b>1 J</b>.</p>
  <p>This formula applies while the spring follows Hooke's law.</p>`,
  [
    {
      q: "A spring has k = 100 N/m and is extended by 0.2 m. Calculate its stored elastic energy.",
      hint: "Use E = ½kx².",
      steps: ["E = ½ × 100 × 0.2²", "E = 50 × 0.04", "E = 2 J"],
      ans: "2 J",
      why: "Elastic energy depends on the square of the extension."
    },
    {
      q: "A spring is stretched by 0.05 m by a force of 20 N. Calculate its elastic potential energy, assuming Hooke's law applies.",
      hint: "Use E = ½Fx.",
      steps: ["E = ½ × 20 × 0.05", "E = 10 × 0.05", "E = 0.5 J"],
      ans: "0.5 J",
      why: "For a spring obeying Hooke's law, stored energy is half the final force multiplied by extension."
    },
    {
      q: "What is the SI unit of elastic potential energy?",
      hint: "Energy has the same SI unit regardless of its form.",
      steps: ["Elastic potential energy is a form of energy.", "The SI unit of energy is the joule."],
      ans: "Joule (J)",
      why: "All forms of energy are measured in joules."
    },
    {
      q: "If the extension of a Hooke's-law spring doubles, what happens to its elastic potential energy?",
      hint: "The formula contains x².",
      steps: ["Original energy is proportional to x².", "New energy is proportional to (2x)² = 4x²."],
      ans: "It becomes four times as large.",
      why: "Spring energy is proportional to the square of extension."
    },
    {
      q: "A learner uses E = kx to calculate spring energy. What is wrong?",
      hint: "Check the formula and the units.",
      steps: ["kx is the force for a Hooke's-law spring.", "Energy is E = ½kx².", "The extension must be squared and the factor ½ included."],
      ans: "The correct formula is E = ½kx².",
      why: "The expression kx gives force, not stored energy."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Conservation of Energy",
  `<h2>Energy cannot be created or destroyed</h2>
  <p>The principle of conservation of energy states that energy cannot be created or destroyed; it can only be transferred or transformed from one form to another.</p>
  <p>In an isolated system, the total energy remains constant.</p>
  <h3>Worked example: a falling object</h3>
  <p>A ball is held above the ground. It has gravitational potential energy because of its position.</p>
  <ul>
    <li>Before falling: most of the relevant mechanical energy is gravitational potential energy.</li>
    <li>During the fall: gravitational potential energy decreases while kinetic energy increases.</li>
    <li>If air resistance is negligible: the loss in gravitational potential energy equals the gain in kinetic energy.</li>
  </ul>
  <p><b>Important:</b> when friction or air resistance acts, some mechanical energy is transferred to thermal energy and sound. Total energy is still conserved.</p>`,
  [
    {
      q: "State the principle of conservation of energy.",
      hint: "Consider the total energy of a system.",
      steps: ["Energy may change form or be transferred.", "Energy is not created or destroyed.", "The total energy of an isolated system remains constant."],
      ans: "Energy cannot be created or destroyed; it can only be transferred or transformed.",
      why: "The total energy of an isolated system remains constant."
    },
    {
      q: "What happens to a falling object's gravitational potential energy as it moves downward?",
      hint: "Consider its height above the ground.",
      steps: ["Its height decreases.", "Its gravitational potential energy decreases."],
      ans: "It decreases.",
      why: "Gravitational potential energy decreases as height decreases."
    },
    {
      q: "A falling object loses 50 J of gravitational potential energy. If air resistance is negligible, how much kinetic energy does it gain?",
      hint: "Mechanical energy is conserved when non-conservative effects are negligible.",
      steps: ["Loss in potential energy = gain in kinetic energy.", "Kinetic energy gained = 50 J."],
      ans: "50 J",
      why: "The decrease in gravitational potential energy becomes kinetic energy."
    },
    {
      q: "When a bicycle brakes, some of its kinetic energy becomes thermal energy. Has energy been destroyed?",
      hint: "Distinguish mechanical energy from total energy.",
      steps: ["Braking transfers energy to the brakes, tyres and surroundings.", "Some energy becomes thermal energy.", "Total energy is conserved."],
      ans: "No.",
      why: "Energy changes form rather than being destroyed."
    },
    {
      q: "A learner says that a moving object must keep all its kinetic energy when it stops. Correct the statement.",
      hint: "Consider what can happen during stopping.",
      steps: ["The object's kinetic energy decreases to zero when it stops.", "That energy is transferred to other forms, such as thermal energy and sound."],
      ans: "Its kinetic energy is transferred to other forms as it stops.",
      why: "The object's kinetic energy can change while total energy remains conserved."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Energy Transformations",
  `<h2>Changing from one form to another</h2>
  <p>An energy transformation occurs when energy changes from one form to another.</p>
  <h3>Examples</h3>
  <ul>
    <li>Electric lamp: electrical energy → light and thermal energy.</li>
    <li>Electric motor: electrical energy → kinetic energy and thermal energy.</li>
    <li>Battery-powered torch: chemical energy → electrical energy → light and thermal energy.</li>
    <li>Falling object: gravitational potential energy → kinetic energy.</li>
  </ul>
  <h3>Worked example</h3>
  <p>In an electric fan, electrical energy is transferred mainly into the kinetic energy of the rotating blades, with some energy becoming sound and thermal energy.</p>
  <p><b>Remember:</b> identify the input energy and the useful output, then account for other outputs where relevant.</p>`,
  [
    {
      q: "Identify the main energy transformation in an electric motor.",
      hint: "Consider what the motor does.",
      steps: ["The motor receives electrical energy.", "Its rotating parts gain kinetic energy."],
      ans: "Electrical energy to kinetic energy",
      why: "An electric motor uses electrical energy to produce motion."
    },
    {
      q: "What energy transformation occurs as a ball falls?",
      hint: "Its height decreases and its speed increases.",
      steps: ["Gravitational potential energy decreases.", "Kinetic energy increases."],
      ans: "Gravitational potential energy to kinetic energy",
      why: "The ball gains kinetic energy as it falls."
    },
    {
      q: "Name two forms of energy produced by an electric lamp.",
      hint: "One is the intended output.",
      steps: ["The lamp produces light.", "It also transfers energy as thermal energy."],
      ans: "Light energy and thermal energy",
      why: "Not all electrical input becomes useful light."
    },
    {
      q: "Describe the energy transformations in a battery-powered torch.",
      hint: "Start with the energy stored in the battery.",
      steps: ["Chemical energy in the battery is transferred to electrical energy.", "The lamp converts electrical energy into light and thermal energy."],
      ans: "Chemical → electrical → light and thermal energy",
      why: "Energy is transferred through the circuit and transformed in the lamp."
    },
    {
      q: "A learner claims that a fan converts all its electrical energy into motion. Why is this inaccurate?",
      hint: "Consider sound and heating.",
      steps: ["The blades gain kinetic energy.", "The motor also produces sound and thermal energy.", "Therefore, not all input energy becomes useful motion."],
      ans: "Some energy is also transferred as sound and thermal energy.",
      why: "Real devices have other energy outputs besides the useful one."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Power",
  `<h2>Rate of doing work</h2>
  <p>Power is the rate at which work is done or energy is transferred.</p>
  <p><b>P = W/t</b></p>
  <p>Power can also be calculated from energy transferred:</p>
  <p><b>P = E/t</b></p>
  <ul>
    <li>P = power in watts (W)</li>
    <li>W = work done in joules (J)</li>
    <li>E = energy transferred in joules (J)</li>
    <li>t = time in seconds (s)</li>
  </ul>
  <h3>Worked example</h3>
  <p>A machine does 600 J of work in 20 s.</p>
  <p>P = W/t = 600/20 = <b>30 W</b>.</p>
  <p><b>Distinguish:</b> work tells you how much energy is transferred; power tells you how quickly it is transferred.</p>`,
  [
    {
      q: "A machine does 200 J of work in 10 s. Calculate its power.",
      hint: "Use P = W/t.",
      steps: ["P = 200/10", "P = 20 W"],
      ans: "20 W",
      why: "Power is work done divided by time taken."
    },
    {
      q: "A motor transfers 1,500 J of energy in 5 s. Find its power.",
      hint: "Use P = E/t.",
      steps: ["P = 1500/5", "P = 300 W"],
      ans: "300 W",
      why: "Power is the rate of energy transfer."
    },
    {
      q: "A worker does 600 J of work in 30 s. Calculate the average power.",
      hint: "Divide work by time.",
      steps: ["P = 600/30", "P = 20 W"],
      ans: "20 W",
      why: "Average power is total work divided by total time."
    },
    {
      q: "Two machines do the same amount of work. One takes less time. Which has greater average power?",
      hint: "Compare P = W/t.",
      steps: ["The work done is equal.", "The machine taking less time has the smaller denominator.", "Its average power is greater."],
      ans: "The machine that takes less time",
      why: "For equal work, less time means greater average power."
    },
    {
      q: "A learner calculates power by multiplying work done by time. Correct the method.",
      hint: "Check the units of power.",
      steps: ["Power is work divided by time.", "Use P = W/t.", "The unit is J/s, equivalent to W."],
      ans: "Divide work done by time: P = W/t.",
      why: "Multiplying joules by seconds does not give the unit of power."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Efficiency",
  `<h2>Useful output compared with input</h2>
  <p>Efficiency describes what fraction of the input energy or work becomes useful output energy or work.</p>
  <p><b>Efficiency = (useful output energy ÷ input energy) × 100%</b></p>
  <p>The same ratio can be used with useful output work and input work when comparing work.</p>
  <h3>Worked example</h3>
  <p>A machine receives 500 J of energy and transfers 350 J as useful output energy.</p>
  <p>Efficiency = (350/500) × 100%</p>
  <p>Efficiency = <b>70%</b>.</p>
  <p>The remaining 150 J is transferred into other forms, such as thermal energy or sound.</p>
  <p><b>Important:</b> for a real machine, efficiency is less than 100% when some input energy is not converted into the defined useful output.</p>`,
  [
    {
      q: "A machine receives 400 J and produces 300 J of useful output energy. Calculate its efficiency.",
      hint: "Divide useful output by input, then multiply by 100%.",
      steps: ["Efficiency = (300/400) × 100%", "Efficiency = 75%"],
      ans: "75%",
      why: "Efficiency is the useful output divided by the input, expressed as a percentage."
    },
    {
      q: "A machine receives 800 J of input energy and has an efficiency of 50%. Find its useful output energy.",
      hint: "50% is 0.5 as a decimal.",
      steps: ["Useful output = 0.5 × 800", "Useful output = 400 J"],
      ans: "400 J",
      why: "Useful output equals efficiency as a fraction multiplied by input energy."
    },
    {
      q: "A machine receives 600 J and provides 450 J of useful output energy. How much energy is transferred to other forms?",
      hint: "Subtract useful output from input.",
      steps: ["Other energy transfers = 600 − 450", "Other energy transfers = 150 J"],
      ans: "150 J",
      why: "The difference between input and useful output is transferred to other forms."
    },
    {
      q: "Why is the efficiency of a real machine usually below 100%?",
      hint: "Consider friction, heating and sound.",
      steps: ["Some input energy is transferred into unwanted forms.", "Less than all the input becomes the defined useful output."],
      ans: "Some energy is transferred into unwanted forms such as heat and sound.",
      why: "The useful output is smaller than the total input."
    },
    {
      q: "A learner calculates efficiency as input energy divided by useful output energy. Correct the formula.",
      hint: "The ratio must not exceed 100% for an ordinary real machine with a defined useful output.",
      steps: ["Divide useful output by input.", "Multiply by 100%.", "Efficiency = (useful output/input) × 100%."],
      ans: "Efficiency = (useful output energy ÷ input energy) × 100%.",
      why: "Reversing the ratio gives the wrong efficiency."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Mechanical Advantage",
  `<h2>Force multiplication</h2>
  <p>Mechanical advantage (MA) compares the load moved by a machine with the effort applied.</p>
  <p><b>MA = load force ÷ effort force</b></p>
  <p>Mechanical advantage has no unit because it is a ratio of two forces.</p>
  <h3>Worked example</h3>
  <p>A machine lifts a load of 600 N using an effort of 150 N.</p>
  <p>MA = 600/150 = <b>4</b>.</p>
  <p>The machine's mechanical advantage is 4: the load force is four times the effort force.</p>
  <p><b>Important:</b> mechanical advantage does not by itself tell you the machine's efficiency.</p>`,
  [
    {
      q: "A machine lifts a 500 N load using a 100 N effort. Calculate its mechanical advantage.",
      hint: "Use MA = load/effort.",
      steps: ["MA = 500/100", "MA = 5"],
      ans: "5",
      why: "Mechanical advantage is the load divided by the effort."
    },
    {
      q: "A machine has a mechanical advantage of 3 and the effort is 40 N. Calculate the load.",
      hint: "Rearrange MA = load/effort.",
      steps: ["Load = MA × effort", "Load = 3 × 40", "Load = 120 N"],
      ans: "120 N",
      why: "Multiply mechanical advantage by effort to find the load."
    },
    {
      q: "A machine lifts a 900 N load with an effort of 300 N. Find its mechanical advantage.",
      hint: "Divide the load by the effort.",
      steps: ["MA = 900/300", "MA = 3"],
      ans: "3",
      why: "The load is three times the applied effort."
    },
    {
      q: "What is the unit of mechanical advantage?",
      hint: "It is a ratio of two forces measured in the same unit.",
      steps: ["MA = load force/effort force.", "The force units cancel."],
      ans: "No unit",
      why: "Mechanical advantage is dimensionless."
    },
    {
      q: "A learner claims that a machine with MA = 4 must be 100% efficient. Is the claim correct?",
      hint: "Compare force ratio with useful output energy and input energy.",
      steps: ["MA measures the ratio of load to effort.", "Efficiency compares useful output with input.", "These are different quantities."],
      ans: "No",
      why: "Mechanical advantage alone does not determine efficiency."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Velocity Ratio",
  `<h2>Distance moved by effort and load</h2>
  <p>Velocity ratio (VR) compares the distance moved by the effort with the distance moved by the load in the same time interval.</p>
  <p><b>VR = distance moved by effort ÷ distance moved by load</b></p>
  <p>For a simple ideal machine, this ratio describes the relationship between the input and output distances. It has no unit.</p>
  <h3>Worked example</h3>
  <p>The effort moves 2 m while the load rises 0.5 m.</p>
  <p>VR = 2/0.5 = <b>4</b>.</p>
  <p>The effort travels four times as far as the load.</p>
  <p><b>Do not confuse:</b> velocity ratio compares distances; mechanical advantage compares forces.</p>`,
  [
    {
      q: "The effort moves 3 m and the load moves 1 m. Calculate the velocity ratio.",
      hint: "Use VR = effort distance/load distance.",
      steps: ["VR = 3/1", "VR = 3"],
      ans: "3",
      why: "The effort moves three times the distance of the load."
    },
    {
      q: "The effort moves 4 m while the load moves 0.8 m. Find the velocity ratio.",
      hint: "Divide 4 by 0.8.",
      steps: ["VR = 4/0.8", "VR = 5"],
      ans: "5",
      why: "Velocity ratio is the effort distance divided by the load distance."
    },
    {
      q: "A machine has VR = 6 and the load moves 0.5 m. How far does the effort move?",
      hint: "Effort distance = VR × load distance.",
      steps: ["Effort distance = 6 × 0.5", "Effort distance = 3 m"],
      ans: "3 m",
      why: "Rearranging the velocity-ratio formula gives the effort distance."
    },
    {
      q: "What is the unit of velocity ratio?",
      hint: "Both quantities are distances.",
      steps: ["VR is distance divided by distance.", "Metres cancel."],
      ans: "No unit",
      why: "Velocity ratio is a dimensionless ratio."
    },
    {
      q: "A learner uses the load force divided by effort force to calculate velocity ratio. Which quantity have they calculated instead?",
      hint: "Recall the two definitions.",
      steps: ["Load force/effort force is mechanical advantage.", "Velocity ratio uses effort distance/load distance."],
      ans: "Mechanical advantage",
      why: "Mechanical advantage compares forces, whereas velocity ratio compares distances."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Efficiency of a Machine Using MA and VR",
  `<h2>Connecting mechanical advantage and velocity ratio</h2>
  <p>For a machine, efficiency can be calculated using mechanical advantage and velocity ratio:</p>
  <p><b>Efficiency = (MA/VR) × 100%</b></p>
  <p>Here:</p>
  <ul>
    <li>MA = load force ÷ effort force</li>
    <li>VR = effort distance ÷ load distance</li>
  </ul>
  <h3>Worked example</h3>
  <p>A machine has MA = 3 and VR = 4.</p>
  <p>Efficiency = (3/4) × 100% = <b>75%</b>.</p>
  <p>For an ordinary real machine, MA is typically less than VR because some input energy is dissipated into unwanted forms.</p>
  <p><b>Check:</b> calculate MA and VR from the correct quantities before applying the efficiency formula.</p>`,
  [
    {
      q: "A machine has MA = 4 and VR = 5. Calculate its efficiency.",
      hint: "Use efficiency = (MA/VR) × 100%.",
      steps: ["Efficiency = (4/5) × 100%", "Efficiency = 80%"],
      ans: "80%",
      why: "Mechanical advantage divided by velocity ratio gives efficiency as a fraction."
    },
    {
      q: "A machine has MA = 2 and VR = 4. Find its efficiency.",
      hint: "Divide 2 by 4, then convert to a percentage.",
      steps: ["Efficiency = (2/4) × 100%", "Efficiency = 50%"],
      ans: "50%",
      why: "The useful force ratio is half the velocity ratio."
    },
    {
      q: "A machine has an efficiency of 60% and VR = 5. Find its mechanical advantage.",
      hint: "Convert the percentage to a fraction and rearrange.",
      steps: ["0.60 = MA/5", "MA = 0.60 × 5", "MA = 3"],
      ans: "3",
      why: "MA equals efficiency as a fraction multiplied by VR."
    },
    {
      q: "A machine has MA = 3 and VR = 3. Calculate its efficiency.",
      hint: "Use the ratio MA/VR.",
      steps: ["Efficiency = (3/3) × 100%", "Efficiency = 100%"],
      ans: "100%",
      why: "Equal MA and VR give an efficiency of 100% in the formula."
    },
    {
      q: "A learner calculates efficiency as VR/MA × 100%. What is the correct formula?",
      hint: "The efficiency of an ordinary real machine should not exceed 100%.",
      steps: ["Use mechanical advantage in the numerator.", "Use velocity ratio in the denominator.", "Efficiency = (MA/VR) × 100%."],
      ans: "Efficiency = (MA/VR) × 100%.",
      why: "Reversing the ratio incorrectly makes efficiency too large when VR exceeds MA."
    }
  ]
);

add(
  "physics",
  "work_energy_power_machines",
  "Levers and Their Turning Effect",
  `<h2>How a lever works</h2>
  <p>A lever is a rigid bar that turns about a fixed point called the fulcrum or pivot.</p>
  <ul>
    <li>Fulcrum: the pivot about which the lever turns.</li>
    <li>Effort: the force applied to the lever.</li>
    <li>Load: the force or resistance the lever moves.</li>
    <li>Effort arm: perpendicular distance from the pivot to the effort's line of action.</li>
    <li>Load arm: perpendicular distance from the pivot to the load's line of action.</li>
  </ul>
  <p>For a lever in equilibrium, the principle of moments gives:</p>
  <p><b>Effort × effort arm = load × load arm</b></p>
  <h3>Worked example</h3>
  <p>A 200 N load acts 0.2 m from the pivot. The effort acts 0.8 m from the pivot.</p>
  <p>Effort × 0.8 = 200 × 0.2</p>
  <p>Effort = 40/0.8 = <b>50 N</b>.</p>
  <p>This calculation assumes the lever is in equilibrium and the distances are measured perpendicular to the forces.</p>`,
  [
    {
      q: "What is the fulcrum of a lever?",
      hint: "It is the point about which the bar turns.",
      steps: ["A lever turns about a fixed point.", "That point is the fulcrum or pivot."],
      ans: "The pivot about which the lever turns",
      why: "The fulcrum is the turning point of the lever."
    },
    {
      q: "A 100 N load acts 0.3 m from the pivot. The effort acts 0.6 m from the pivot. Calculate the effort needed for equilibrium.",
      hint: "Effort × effort arm = load × load arm.",
      steps: ["E × 0.6 = 100 × 0.3", "E × 0.6 = 30", "E = 30/0.6 = 50 N"],
      ans: "50 N",
      why: "The clockwise and anticlockwise moments must balance."
    },
    {
      q: "A 60 N effort acts 0.5 m from the pivot. What load can it balance at 0.2 m from the pivot?",
      hint: "Equate effort moment and load moment.",
      steps: ["60 × 0.5 = L × 0.2", "30 = 0.2L", "L = 150 N"],
      ans: "150 N",
      why: "A longer effort arm can balance a larger load at a shorter load arm."
    },
    {
      q: "What is the effort arm of a lever?",
      hint: "Measure from the pivot to the effort's line of action.",
      steps: ["Identify the pivot.", "Identify the effort's line of action.", "Measure the perpendicular distance between them."],
      ans: "The perpendicular distance from the pivot to the effort's line of action",
      why: "The moment of a force depends on its perpendicular distance from the pivot."
    },
    {
      q: "A learner uses the full length of a slanted lever as the effort arm even though the effort is not perpendicular to it. What should they use?",
      hint: "Moments use perpendicular distance.",
      steps: ["Identify the line of action of the effort.", "Measure the shortest perpendicular distance from the pivot to that line."],
      ans: "The perpendicular distance from the pivot to the effort's line of action",
      why: "The moment is force multiplied by perpendicular distance, not automatically the bar's length."
    }
  ]
);
add(
  "physics",
  "moments_and_equilibrium",
  "Calculating an Unknown Distance Using Moments",
  `<h2>Finding the distance from a pivot</h2>
  <p>The moment of a force is calculated using:</p>
  <p><b>Moment = force × perpendicular distance from pivot</b></p>
  <p>For a balanced object, clockwise moments equal anticlockwise moments.</p>
  <h3>Worked example</h3>
  <p>A 40 N force acts 0.5 m to the left of a pivot. A 20 N force acts to the right at an unknown distance d. The beam is balanced.</p>
  <p>40 × 0.5 = 20 × d</p>
  <p>20 = 20d</p>
  <p>d = 20/20 = <b>1 m</b>.</p>
  <p><b>Check:</b> both moments must be equal for rotational equilibrium.</p>`,
  [
    {
      q: "A 30 N force acts 2 m from a pivot. What distance from the pivot must a 20 N force act at to balance it?",
      hint: "Equate the two moments.",
      steps: ["30 × 2 = 20 × d", "60 = 20d", "d = 3 m"],
      ans: "3 m",
      why: "The smaller force needs a longer distance to produce the same moment."
    },
    {
      q: "A 50 N force acts 0.4 m from a pivot. Find the distance at which a 10 N force must act to balance it.",
      hint: "Use force × distance on each side.",
      steps: ["50 × 0.4 = 10 × d", "20 = 10d", "d = 2 m"],
      ans: "2 m",
      why: "Both moments must equal 20 N m."
    },
    {
      q: "A 12 N force acts 0.5 m from a pivot. A 6 N force balances it on the opposite side. Find the distance of the 6 N force.",
      hint: "Calculate the first moment, then divide by 6 N.",
      steps: ["Moment = 12 × 0.5 = 6 N m", "6 × d = 6", "d = 1 m"],
      ans: "1 m",
      why: "The 6 N force must produce a moment of 6 N m."
    },
    {
      q: "A 25 N force acts 0.8 m from a pivot. A balancing force of 10 N acts on the opposite side. Calculate its distance.",
      hint: "Set the moments equal.",
      steps: ["25 × 0.8 = 10 × d", "20 = 10d", "d = 2 m"],
      ans: "2 m",
      why: "The balancing force must produce a moment of 20 N m."
    },
    {
      q: "A learner divides 40 N by 0.5 m to calculate the moment. What should the learner do instead?",
      hint: "Recall the moment formula.",
      steps: ["Moment = force × perpendicular distance.", "Moment = 40 × 0.5 = 20 N m."],
      ans: "Multiply the force by the perpendicular distance.",
      why: "Moment is the product of force and perpendicular distance."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Finding an Unknown Force Using Moments",
  `<h2>Finding a balancing force</h2>
  <p>If a beam is balanced, the total clockwise moment equals the total anticlockwise moment.</p>
  <p><b>Clockwise moment = anticlockwise moment</b></p>
  <h3>Worked example</h3>
  <p>A 60 N load acts 0.4 m from a pivot. An effort acts 1.2 m from the pivot on the opposite side.</p>
  <p>60 × 0.4 = F × 1.2</p>
  <p>24 = 1.2F</p>
  <p>F = 24/1.2 = <b>20 N</b>.</p>
  <p>The effort is smaller because it acts farther from the pivot.</p>`,
  [
    {
      q: "A 40 N load acts 0.5 m from a pivot. The effort acts 2 m away. Find the effort needed for balance.",
      hint: "Equate the moments.",
      steps: ["40 × 0.5 = F × 2", "20 = 2F", "F = 10 N"],
      ans: "10 N",
      why: "The effort's longer arm means less force is needed."
    },
    {
      q: "A 100 N load acts 0.3 m from a pivot. An effort acts 1.5 m from the pivot. Calculate the balancing effort.",
      hint: "Load × load arm = effort × effort arm.",
      steps: ["100 × 0.3 = F × 1.5", "30 = 1.5F", "F = 20 N"],
      ans: "20 N",
      why: "Both moments equal 30 N m."
    },
    {
      q: "A 25 N force acts 0.8 m from a pivot. A balancing force acts 0.4 m away on the opposite side. Find the force.",
      hint: "Find the moment first.",
      steps: ["25 × 0.8 = F × 0.4", "20 = 0.4F", "F = 50 N"],
      ans: "50 N",
      why: "A shorter arm requires a greater force to produce the same moment."
    },
    {
      q: "A 15 N effort acts 2 m from a pivot. A load acts 0.5 m from the pivot. Find the load for equilibrium.",
      hint: "Equate effort moment and load moment.",
      steps: ["15 × 2 = L × 0.5", "30 = 0.5L", "L = 60 N"],
      ans: "60 N",
      why: "The effort produces a moment of 30 N m, which the load must match."
    },
    {
      q: "A learner calculates the balancing force by dividing the load by the effort-arm distance without using the load moment. What is missing?",
      hint: "Both sides of the pivot must be considered.",
      steps: ["Calculate the load moment: load × load arm.", "Equate it to effort × effort arm.", "Rearrange to find the unknown effort."],
      ans: "The load moment must be calculated and equated to the effort moment.",
      why: "The balancing force depends on both the load and its distance from the pivot."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Moments from Several Forces",
  `<h2>More than one force on each side</h2>
  <p>When several forces act on a beam, calculate each moment about the same pivot.</p>
  <p>For equilibrium:</p>
  <p><b>Total clockwise moments = total anticlockwise moments</b></p>
  <h3>Worked example</h3>
  <p>Two downward forces of 10 N and 20 N act on the left of a pivot at distances 1 m and 2 m respectively. A force F acts downward on the right, 2 m from the pivot.</p>
  <p>Clockwise moment = F × 2</p>
  <p>Anticlockwise moment = (10 × 1) + (20 × 2) = 50 N m</p>
  <p>For balance: 2F = 50, so <b>F = 25 N</b>.</p>
  <p>The direction assigned as clockwise or anticlockwise depends on the force's position and direction relative to the pivot.</p>`,
  [
    {
      q: "Two forces produce clockwise moments of 12 N m and 8 N m. What total anticlockwise moment is required for equilibrium?",
      hint: "The totals must balance.",
      steps: ["Total clockwise moment = 12 + 8 = 20 N m.", "Required anticlockwise moment = 20 N m."],
      ans: "20 N m",
      why: "Equilibrium requires equal total clockwise and anticlockwise moments."
    },
    {
      q: "Clockwise moments total 45 N m. Two anticlockwise moments are 15 N m and 10 N m. What additional anticlockwise moment is needed?",
      hint: "Add known moments, then find the difference.",
      steps: ["Known anticlockwise total = 15 + 10 = 25 N m.", "Additional moment = 45 − 25 = 20 N m."],
      ans: "20 N m",
      why: "The anticlockwise total must reach 45 N m."
    },
    {
      q: "A 10 N force and a 15 N force act clockwise at perpendicular distances of 2 m and 1 m. Calculate the total clockwise moment.",
      hint: "Calculate each moment separately.",
      steps: ["First moment = 10 × 2 = 20 N m.", "Second moment = 15 × 1 = 15 N m.", "Total = 35 N m clockwise."],
      ans: "35 N m clockwise",
      why: "Moments acting in the same rotational direction are added."
    },
    {
      q: "The clockwise moment is 30 N m and the anticlockwise moment is 18 N m. What is the net moment?",
      hint: "Subtract the smaller total from the larger.",
      steps: ["Net moment = 30 − 18 = 12 N m.", "The clockwise moment is larger."],
      ans: "12 N m clockwise",
      why: "The resultant turning effect follows the larger moment."
    },
    {
      q: "Why should all moments be calculated about the same pivot when checking equilibrium?",
      hint: "The moment depends on distance from the pivot.",
      steps: ["Moment depends on perpendicular distance from the chosen pivot.", "Using different pivots would mix different distances and turning effects."],
      ans: "Because each moment must be measured about the same pivot for a valid comparison.",
      why: "The principle compares moments about one common pivot."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Equilibrium of a Beam",
  `<h2>When a beam remains balanced</h2>
  <p>For a beam to remain in static equilibrium, its forces must balance and its total turning effect must be zero.</p>
  <ul>
    <li>The resultant force must be zero.</li>
    <li>The resultant moment about a pivot must be zero.</li>
  </ul>
  <p>A beam can have zero resultant moment but still accelerate in a straight line if its forces do not balance.</p>
  <h3>Worked example</h3>
  <p>A beam is at rest on a support. Its total clockwise moment is 24 N m and its total anticlockwise moment is 24 N m.</p>
  <p>Net moment = 24 − 24 = <b>0 N m</b>.</p>
  <p>If its forces also balance, it remains in static equilibrium.</p>`,
  [
    {
      q: "What two conditions must be satisfied for static equilibrium?",
      hint: "Consider translation and rotation.",
      steps: ["Resultant force = 0.", "Resultant moment = 0."],
      ans: "Zero resultant force and zero resultant moment",
      why: "Both linear and rotational acceleration must be zero."
    },
    {
      q: "A beam has clockwise moments of 16 N m and anticlockwise moments of 16 N m. Find the net moment.",
      hint: "Subtract the opposing totals.",
      steps: ["Net moment = 16 − 16", "Net moment = 0 N m"],
      ans: "0 N m",
      why: "The clockwise and anticlockwise moments cancel."
    },
    {
      q: "A beam has zero resultant moment, but a non-zero resultant force. Is it in static equilibrium?",
      hint: "Check both equilibrium conditions.",
      steps: ["The moment condition is satisfied.", "The force condition is not satisfied.", "Therefore, static equilibrium is not satisfied."],
      ans: "No",
      why: "Static equilibrium requires both zero resultant force and zero resultant moment."
    },
    {
      q: "A stationary beam has balanced forces but unequal clockwise and anticlockwise moments. What does this tell you?",
      hint: "Consider whether it can remain rotationally balanced.",
      steps: ["The resultant force is zero.", "The resultant moment is not zero.", "The beam is not in rotational equilibrium."],
      ans: "It is not in static equilibrium.",
      why: "Unequal moments create a resultant turning effect."
    },
    {
      q: "A learner checks only the forces when deciding whether a beam is in equilibrium. What else must be checked?",
      hint: "A beam can rotate as well as move.",
      steps: ["Calculate total clockwise moments.", "Calculate total anticlockwise moments.", "Confirm that the totals are equal."],
      ans: "The resultant moment must also be zero.",
      why: "Balanced forces alone do not guarantee rotational equilibrium."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Centre of Gravity and Balance",
  `<h2>Where an object's weight acts</h2>
  <p>The centre of gravity is the point through which the resultant gravitational force on an object acts.</p>
  <p>For many ordinary objects in a uniform gravitational field, the centre of gravity is at or near the centre of mass.</p>
  <h3>Worked example</h3>
  <p>Consider a uniform metre rule supported at its midpoint. Its weight acts through its centre of gravity, near the 50 cm mark.</p>
  <p>When the support is directly below this point and no other turning effects act, the rule can balance.</p>
  <p><b>Remember:</b> the centre of gravity depends on how mass is distributed, not just on an object's outer shape.</p>`,
  [
    {
      q: "Define the centre of gravity.",
      hint: "Consider the resultant gravitational force.",
      steps: ["Gravity acts on every part of an object.", "The combined effect can be represented as acting through one point."],
      ans: "The point through which the resultant gravitational force acts",
      why: "The centre of gravity represents the overall effect of gravity on the object."
    },
    {
      q: "Where is the centre of gravity of a uniform metre rule usually located?",
      hint: "Consider its uniform mass distribution.",
      steps: ["The rule has uniform mass distribution.", "Its centre of gravity is at the midpoint.", "The midpoint is the 50 cm mark."],
      ans: "At approximately the 50 cm mark",
      why: "For a uniform rule, the centre of gravity lies at its geometric centre."
    },
    {
      q: "Why might the centre of gravity of an irregular object not be at its geometric centre?",
      hint: "Consider how its mass is distributed.",
      steps: ["The object may have uneven mass distribution.", "The resultant gravitational force depends on that distribution."],
      ans: "Because its mass may be unevenly distributed",
      why: "The centre of gravity depends on mass distribution, not simply shape."
    },
    {
      q: "What force acts through an object's centre of gravity?",
      hint: "Think of the object's total gravitational effect.",
      steps: ["Gravity acts on the object's parts.", "The resultant gravitational force is represented as acting through the centre of gravity."],
      ans: "The resultant gravitational force, or weight",
      why: "Weight acts through the centre of gravity."
    },
    {
      q: "A learner says every object has its centre of gravity exactly at its geometric centre. Is this correct?",
      hint: "Compare a uniform block with an irregular object.",
      steps: ["A uniform, symmetrical object may have its centre of gravity at its geometric centre.", "Uneven mass distribution can shift the centre of gravity."],
      ans: "No",
      why: "The centre of gravity depends on the distribution of mass."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "The Line of Action of Weight",
  `<h2>Using the centre of gravity to predict balance</h2>
  <p>The line of action of weight is the vertical line passing through an object's centre of gravity.</p>
  <p>For an object resting on a level base to remain stable, the vertical line through its centre of gravity must fall within its base of support.</p>
  <h3>Worked example</h3>
  <p>A rectangular block stands on a broad, level base. Its centre of gravity is above the middle of the base.</p>
  <p>The vertical line through the centre of gravity falls within the base, so the weight does not create a toppling moment about the edge.</p>
  <p>If the block tilts so that this line falls outside the base, the weight can create a turning effect that topples it.</p>`,
  [
    {
      q: "What is the line of action of an object's weight?",
      hint: "It passes through the centre of gravity.",
      steps: ["Weight acts vertically downward.", "Its line of action is the vertical line through the centre of gravity."],
      ans: "The vertical line through the centre of gravity",
      why: "The line of action shows the direction and path along which weight acts."
    },
    {
      q: "For a resting object to be stable, where should the vertical line through its centre of gravity fall?",
      hint: "Consider the base of support.",
      steps: ["Identify the object's supporting base.", "Check where the vertical line through the centre of gravity meets the ground.", "For stability, it should fall within the base."],
      ans: "Within the base of support",
      why: "This prevents the object's weight from producing a toppling moment about the edge."
    },
    {
      q: "A block tilts until its centre-of-gravity line falls outside its base. What is likely to happen?",
      hint: "Consider the turning effect of weight.",
      steps: ["The weight's line of action lies outside the base.", "Weight creates a turning effect about the base edge.", "The block tends to topple."],
      ans: "It tends to topple.",
      why: "The weight now produces a turning effect that increases the tilt."
    },
    {
      q: "Does a low centre of gravity alone guarantee stability if the support base is extremely narrow?",
      hint: "Consider both height and base width.",
      steps: ["A low centre of gravity generally helps stability.", "The support base also matters.", "A narrow base can still make an object easy to topple."],
      ans: "No",
      why: "Stability depends on both the centre of gravity and the base of support."
    },
    {
      q: "A learner checks only the height of an object's centre of gravity to decide whether it will topple. What else must be checked?",
      hint: "Look at the support under the object.",
      steps: ["Locate the base of support.", "Check whether the vertical line through the centre of gravity remains within it."],
      ans: "Whether the centre-of-gravity line falls within the base of support",
      why: "The base determines whether the line of action of weight supports or topples the object."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Increasing the Stability of an Object",
  `<h2>Making objects harder to topple</h2>
  <p>Two common ways to increase an object's stability are:</p>
  <ul>
    <li>Lower its centre of gravity.</li>
    <li>Increase the width of its base of support.</li>
  </ul>
  <h3>Worked example</h3>
  <p>A tall cabinet is more likely to topple than a shorter, broader cabinet with a lower centre of gravity and a wider base.</p>
  <p>Lowering the centre of gravity makes the vertical line through it less likely to move outside the base when the cabinet tilts slightly.</p>
  <p>Widening the base gives the line of action more room to move before reaching an edge.</p>
  <p><b>Application:</b> wide wheelbases and low centres of gravity help vehicles resist toppling.</p>`,
  [
    {
      q: "State two ways of increasing an object's stability.",
      hint: "Consider its centre of gravity and base.",
      steps: ["Lower the centre of gravity.", "Increase the width of the base of support."],
      ans: "Lower the centre of gravity and widen the base",
      why: "Both changes make toppling less likely."
    },
    {
      q: "Why does widening an object's base generally increase stability?",
      hint: "Consider how far the centre-of-gravity line can move before reaching an edge.",
      steps: ["A wider base provides a larger support area.", "The centre-of-gravity line can move farther before leaving the base."],
      ans: "It allows greater tilt before the line of action falls outside the base.",
      why: "A wider base increases the range over which the object can remain supported."
    },
    {
      q: "Why are heavy objects often placed low in a vehicle?",
      hint: "Consider the centre of gravity.",
      steps: ["Placing mass low lowers the vehicle's centre of gravity.", "A lower centre of gravity generally improves stability."],
      ans: "To lower the centre of gravity and reduce the risk of toppling",
      why: "A lower centre of gravity helps keep the weight's line of action within the support base."
    },
    {
      q: "Two objects have the same base width. One has a lower centre of gravity. Which is generally more stable?",
      hint: "Compare how the centre-of-gravity line shifts when tilted.",
      steps: ["The lower centre of gravity shifts less horizontally for a small tilt.", "Its line of action is less likely to leave the base."],
      ans: "The object with the lower centre of gravity",
      why: "A lower centre of gravity generally increases resistance to toppling."
    },
    {
      q: "A learner wants to improve a narrow-based model's stability but cannot change its height. What useful change could they make?",
      hint: "Consider the support base.",
      steps: ["Keep the height unchanged.", "Increase the width of the supporting base."],
      ans: "Widen the base of support",
      why: "A wider base improves stability even if the height stays the same."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Toppling and the Turning Effect of Weight",
  `<h2>Why an object topples</h2>
  <p>An object may topple when it tilts far enough that the vertical line through its centre of gravity falls outside its base of support.</p>
  <p>At that point, the weight produces a moment about the edge of the base that tends to increase the tilt.</p>
  <h3>Worked example</h3>
  <p>A box is slowly tilted about its lower edge.</p>
  <ul>
    <li>While the weight's line of action falls within the base, the box can remain supported.</li>
    <li>When the line reaches the edge, the box is at the limiting condition for toppling.</li>
    <li>When the line falls outside the base, the weight creates a toppling moment.</li>
  </ul>
  <p><b>Key distinction:</b> toppling is a rotational effect; sliding is motion along the surface and involves different conditions.</p>`,
  [
    {
      q: "What condition signals that an object is at the limiting point of toppling?",
      hint: "Check the line of action of its weight.",
      steps: ["Locate the base edge about which it may rotate.", "At the limiting condition, the vertical line through the centre of gravity reaches that edge."],
      ans: "The weight's line of action reaches the edge of the base",
      why: "Beyond this point, the weight produces a toppling moment."
    },
    {
      q: "What causes the weight of an object to produce a toppling moment?",
      hint: "Consider where the line of action falls relative to the base.",
      steps: ["The centre-of-gravity line falls outside the base.", "The weight then has a perpendicular distance from the pivoting edge.", "Weight produces a moment about that edge."],
      ans: "The weight's line of action falls outside the base of support",
      why: "A non-zero perpendicular distance from the pivoting edge creates a moment."
    },
    {
      q: "Is sliding the same as toppling?",
      hint: "Compare translation with rotation.",
      steps: ["Sliding is movement along the surface.", "Toppling is rotation about an edge or contact point."],
      ans: "No",
      why: "Sliding and toppling are different types of motion."
    },
    {
      q: "A box is tilted, but its weight's line of action remains within its base. What does this suggest?",
      hint: "The weight has not yet created a toppling moment about the base edge in the stated way.",
      steps: ["The line of action remains within the support base.", "The weight does not yet produce the toppling moment described for the line outside the base."],
      ans: "The box has not reached the toppling condition.",
      why: "Toppling occurs when the line of action moves beyond the supporting base."
    },
    {
      q: "A learner says an object topples because its centre of gravity physically moves outside the object. Correct the statement.",
      hint: "The important comparison is with the base of support.",
      steps: ["The centre of gravity need not leave the object's material shape.", "Its vertical line of action must move outside the base of support for the toppling condition described."],
      ans: "Toppling depends on the line of action of weight falling outside the base of support.",
      why: "The object's support geometry, not whether its centre of gravity lies outside its body, determines the toppling condition."
    }
  ]
);

add(
  "physics",
  "moments_and_equilibrium",
  "Applying Moments to Everyday Tools",
  `<h2>Turning effects in tools</h2>
  <p>Tools such as spanners, door handles and bottle openers use turning effects to make tasks easier.</p>
  <p>The moment of a force is:</p>
  <p><b>Moment = force × perpendicular distance from pivot</b></p>
  <h3>Worked example</h3>
  <p>A spanner applies a turning force of 40 N at a perpendicular distance of 0.25 m from a nut.</p>
  <p>Moment = 40 × 0.25 = <b>10 N m</b>.</p>
  <p>A longer spanner can produce a larger moment for the same applied force, provided the force acts in the same effective direction.</p>
  <p><b>Important:</b> the pivot is the point or axis about which the object turns.</p>`,
  [
    {
      q: "A force of 25 N acts perpendicularly at the end of a spanner 0.2 m long. Calculate the moment about the nut.",
      hint: "Multiply force by perpendicular distance.",
      steps: ["Moment = 25 × 0.2", "Moment = 5 N m"],
      ans: "5 N m",
      why: "The force acts perpendicularly at a distance of 0.2 m from the pivot."
    },
    {
      q: "A 30 N force acts at a perpendicular distance of 0.4 m from a door hinge. Calculate its moment about the hinge.",
      hint: "Use moment = force × distance.",
      steps: ["Moment = 30 × 0.4", "Moment = 12 N m"],
      ans: "12 N m",
      why: "The hinge is the pivot and the given distance is perpendicular."
    },
    {
      q: "Why is a longer spanner usually more effective at loosening a tight nut?",
      hint: "Assume the applied force is unchanged.",
      steps: ["A longer spanner increases the perpendicular distance from the pivot.", "Moment = force × distance.", "The turning effect increases."],
      ans: "It produces a larger moment for the same force.",
      why: "Increasing the moment arm increases the turning effect."
    },
    {
      q: "A 50 N force produces a moment of 15 N m. Find the perpendicular distance from the pivot.",
      hint: "Distance = moment/force.",
      steps: ["d = 15/50", "d = 0.3 m"],
      ans: "0.3 m",
      why: "Rearranging moment = force × distance gives distance = moment/force."
    },
    {
      q: "A learner uses the length of a handle as the moment arm even though the force acts at an angle. What distance should be used?",
      hint: "Moments depend on the perpendicular distance.",
      steps: ["Identify the force's line of action.", "Measure the perpendicular distance from the pivot to that line."],
      ans: "The perpendicular distance from the pivot to the force's line of action",
      why: "The perpendicular distance, not necessarily the handle's full length, determines the moment."
    }
  ]
);
/* =========================================================
   PHYSICS: MOTION & FORCES 
========================================================= */
/* =========================
   1. DISTANCE & DISPLACEMENT
========================= */

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
<pre>
s
|      /
|     /
|    /
|   /
|  /
+------------ t
Slope = Velocity
</pre>

<p><b>Velocity–Time Graph</b></p>
<pre>
v
|      /
|     /
|    /
|   /
|  /
+------------ t

Slope = Acceleration  
Area = Displacement
</pre>

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
    {
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
    },
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
    q: "A 2kg object falls from 5m. Find total energy.",
    ans: "100J",
    sol: "mgh = 2 × 10 × 5 = 100J",
    steps: [
      "Step 1: Identify the given values: mass (m) = 2kg, height (h) = 5m, and gravitational acceleration (g) ≈ 10m/s².",
      "Step 2: Recall the formula for gravitational potential energy: PE = m × g × h.",
      "Step 3: Substitute the known values into the equation: PE = 2 × 10 × 5.",
      "Step 4: Calculate the final value to find the total mechanical energy: 100 Joules (100J)."
    ]
  },

  {
    q: "A 5kg object is lifted to a height of 8m. Calculate its potential energy.",
    ans: "400J",
    sol: "PE = mgh = 5 × 10 × 8 = 400J",
    steps: [
      "Step 1: Identify the values: m = 5kg, h = 8m, g = 10m/s².",
      "Step 2: Recall the formula PE = m × g × h.",
      "Step 3: Substitute the values: PE = 5 × 10 × 8.",
      "Step 4: Calculate the answer: 400 Joules."
    ]
  },

  {
    q: "A 4kg object moves at 6m/s. Find its kinetic energy.",
    ans: "72J",
    sol: "KE = ½mv² = ½ × 4 × 6² = 72J",
    steps: [
      "Step 1: Identify the mass (4kg) and velocity (6m/s).",
      "Step 2: Recall the formula KE = ½mv².",
      "Step 3: Square the velocity: 6² = 36.",
      "Step 4: Calculate: ½ × 4 × 36 = 72J."
    ]
  },

  {
    q: "A car of mass 1000kg travels at 20m/s. Calculate its kinetic energy.",
    ans: "200000J",
    sol: "KE = ½ × 1000 × 20² = 200000J",
    steps: [
      "Step 1: Identify m = 1000kg and v = 20m/s.",
      "Step 2: Recall KE = ½mv².",
      "Step 3: Square the speed: 20² = 400.",
      "Step 4: Calculate: ½ × 1000 × 400 = 200000J."
    ]
  },

  {
    q: "A 10N force moves an object through 6m. Calculate the work done.",
    ans: "60J",
    sol: "Work = Force × Distance = 10 × 6 = 60J",
    steps: [
      "Step 1: Identify force = 10N and distance = 6m.",
      "Step 2: Recall the formula Work = Force × Distance.",
      "Step 3: Substitute the values: 10 × 6.",
      "Step 4: Calculate the work done: 60J."
    ]
  },

  {
    q: "A machine does 500J of work in 10 seconds. Calculate its power.",
    ans: "50W",
    sol: "Power = Work ÷ Time = 500 ÷ 10 = 50W",
    steps: [
      "Step 1: Identify work = 500J and time = 10s.",
      "Step 2: Recall the formula Power = Work ÷ Time.",
      "Step 3: Substitute the values into the formula.",
      "Step 4: Divide 500 by 10 to obtain 50W."
    ]
  },

  {
    q: "A 3kg object is raised 15m above the ground. Find its potential energy.",
    ans: "450J",
    sol: "PE = 3 × 10 × 15 = 450J",
    steps: [
      "Step 1: Identify m = 3kg, h = 15m, g = 10m/s².",
      "Step 2: Recall PE = mgh.",
      "Step 3: Substitute: 3 × 10 × 15.",
      "Step 4: Calculate: 450J."
    ]
  },

  {
    q: "A 6kg object moves with a speed of 5m/s. Find its kinetic energy.",
    ans: "75J",
    sol: "KE = ½ × 6 × 5² = 75J",
    steps: [
      "Step 1: Identify mass and velocity.",
      "Step 2: Recall KE = ½mv².",
      "Step 3: Square the velocity: 5² = 25.",
      "Step 4: Calculate: ½ × 6 × 25 = 75J."
    ]
  },

  {
    q: "A 50N force pushes a box for 12m. Calculate the work done.",
    ans: "600J",
    sol: "Work = 50 × 12 = 600J",
    steps: [
      "Step 1: Identify force = 50N and distance = 12m.",
      "Step 2: Recall Work = Force × Distance.",
      "Step 3: Multiply the given values.",
      "Step 4: The work done is 600J."
    ]
  },

  {
    q: "A motor produces 2400J of work in 60 seconds. Find its power.",
    ans: "40W",
    sol: "Power = 2400 ÷ 60 = 40W",
    steps: [
      "Step 1: Identify work = 2400J and time = 60s.",
      "Step 2: Recall Power = Work ÷ Time.",
      "Step 3: Substitute the values.",
      "Step 4: Divide 2400 by 60 to get 40W."
    ]
  },

  {
    q: "A 7kg object is placed 9m above the ground. Calculate its potential energy.",
    ans: "630J",
    sol: "PE = 7 × 10 × 9 = 630J",
    steps: [
      "Step 1: Identify m = 7kg, h = 9m.",
      "Step 2: Recall PE = mgh.",
      "Step 3: Substitute the values using g = 10m/s².",
      "Step 4: Calculate 630J."
    ]
  },

  {
    q: "A cyclist and bicycle have a combined mass of 80kg and move at 10m/s. Calculate the kinetic energy.",
    ans: "4000J",
    sol: "KE = ½ × 80 × 10² = 4000J",
    steps: [
      "Step 1: Identify mass = 80kg and velocity = 10m/s.",
      "Step 2: Recall KE = ½mv².",
      "Step 3: Square the velocity: 10² = 100.",
      "Step 4: Calculate: ½ × 80 × 100 = 4000J."
    ]
  },

  {
    q: "A crane lifts a 200kg load by 5m. Calculate the gain in potential energy.",
    ans: "10000J",
    sol: "PE = 200 × 10 × 5 = 10000J",
    steps: [
      "Step 1: Identify m = 200kg and h = 5m.",
      "Step 2: Recall PE = mgh.",
      "Step 3: Substitute the values.",
      "Step 4: Calculate the gain in potential energy: 10000J."
    ]
  },

  {
    q: "A machine uses 1500J of energy in 30 seconds. Find its power output.",
    ans: "50W",
    sol: "Power = 1500 ÷ 30 = 50W",
    steps: [
      "Step 1: Identify work = 1500J and time = 30s.",
      "Step 2: Recall Power = Work ÷ Time.",
      "Step 3: Substitute the values.",
      "Step 4: Divide 1500 by 30 to get 50W."
    ]
  },

  {
    q: "A 12N force moves an object 15m. Calculate the work done.",
    ans: "180J",
    sol: "Work = 12 × 15 = 180J",
    steps: [
      "Step 1: Identify force = 12N and distance = 15m.",
      "Step 2: Recall Work = Force × Distance.",
      "Step 3: Substitute the values.",
      "Step 4: Calculate: 180J."
    ]
  }
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
  ,
    {
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
    }
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
  ,
    {
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
      explanation:
        "Wave speed is distance covered per unit time.",
    }
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
    q: "Find current if V = 12V and R = 3Ω.",
    hint: "Use Ohm's Law I = V / R",
    formula: "I = V / R",
    steps: [
      "Step 1: Identify values → V = 12V, R = 3Ω",
      "Step 2: Write formula → I = V / R",
      "Step 3: Substitute values → I = 12 / 3",
      "Step 4: Calculate → I = 4A",
    ],
    ans: "4A",
    final_check: "Current decreases when resistance increases.",
    common_mistakes: [
      "Using R / V instead of V / R",
      "Ignoring units",
      "Dividing incorrectly",
    ],
    explanation: "Ohm's Law relates voltage, current, and resistance.",
  },

  {
    q: "Find the resistance if V = 24V and I = 6A.",
    hint: "Use R = V / I",
    formula: "R = V / I",
    steps: [
      "Step 1: Identify values → V = 24V, I = 6A",
      "Step 2: Write formula → R = V / I",
      "Step 3: Substitute values → R = 24 / 6",
      "Step 4: Calculate → R = 4Ω",
    ],
    ans: "4Ω",
    final_check: "Resistance is measured in ohms (Ω).",
    common_mistakes: [
      "Using I / V instead of V / I",
      "Forgetting the Ω unit",
      "Calculation errors",
    ],
    explanation: "Resistance opposes the flow of electric current.",
  },

  {
    q: "Find the voltage if I = 5A and R = 8Ω.",
    hint: "Use V = IR",
    formula: "V = IR",
    steps: [
      "Step 1: Identify values → I = 5A, R = 8Ω",
      "Step 2: Write formula → V = IR",
      "Step 3: Substitute values → V = 5 × 8",
      "Step 4: Calculate → V = 40V",
    ],
    ans: "40V",
    final_check: "Voltage is measured in volts (V).",
    common_mistakes: [
      "Adding instead of multiplying",
      "Using the wrong formula",
      "Incorrect units",
    ],
    explanation: "Voltage is the electrical energy supplied per unit charge.",
  },

  {
    q: "A charge of 60C flows in 12s. Find the current.",
    hint: "Use I = Q / t",
    formula: "I = Q / t",
    steps: [
      "Step 1: Identify values → Q = 60C, t = 12s",
      "Step 2: Write formula → I = Q / t",
      "Step 3: Substitute values → I = 60 / 12",
      "Step 4: Calculate → I = 5A",
    ],
    ans: "5A",
    final_check: "Current is measured in amperes (A).",
    common_mistakes: [
      "Dividing incorrectly",
      "Using the wrong formula",
      "Leaving out units",
    ],
    explanation: "Current tells us how much charge passes a point each second.",
  },

  {
    q: "A bulb uses 120W at 240V. Find the current.",
    hint: "Use P = VI",
    formula: "I = P / V",
    steps: [
      "Step 1: Identify values → P = 120W, V = 240V",
      "Step 2: Rearrange formula → I = P / V",
      "Step 3: Substitute values → I = 120 / 240",
      "Step 4: Calculate → I = 0.5A",
    ],
    ans: "0.5A",
    final_check: "Current should be less than 1A for these values.",
    common_mistakes: [
      "Using V / P instead of P / V",
      "Ignoring decimal answers",
      "Using the wrong formula",
    ],
    explanation: "Power equals voltage multiplied by current.",
  },

  {
    q: "A circuit has V = 18V and I = 3A. Find the power.",
    hint: "Use P = VI",
    formula: "P = VI",
    steps: [
      "Step 1: Identify values → V = 18V, I = 3A",
      "Step 2: Write formula → P = VI",
      "Step 3: Substitute values → P = 18 × 3",
      "Step 4: Calculate → P = 54W",
    ],
    ans: "54W",
    final_check: "Power is measured in watts (W).",
    common_mistakes: [
      "Adding V and I",
      "Using division instead of multiplication",
      "Wrong unit",
    ],
    explanation: "Electrical power is the rate at which electrical energy is used.",
  },

  {
    q: "An appliance uses 1000J of energy in 50s. Find the power.",
    hint: "Use P = E / t",
    formula: "P = E / t",
    steps: [
      "Step 1: Identify values → E = 1000J, t = 50s",
      "Step 2: Write formula → P = E / t",
      "Step 3: Substitute values → P = 1000 / 50",
      "Step 4: Calculate → P = 20W",
    ],
    ans: "20W",
    final_check: "Power is measured in watts (W).",
    common_mistakes: [
      "Using t / E",
      "Calculation mistakes",
      "Wrong units",
    ],
    explanation: "Power measures how quickly energy is transferred.",
  },

  {
    q: "A resistor of 5Ω carries a current of 4A. Find the voltage.",
    hint: "Use V = IR",
    formula: "V = IR",
    steps: [
      "Step 1: Identify values → I = 4A, R = 5Ω",
      "Step 2: Write formula → V = IR",
      "Step 3: Substitute values → V = 4 × 5",
      "Step 4: Calculate → V = 20V",
    ],
    ans: "20V",
    final_check: "Voltage is measured in volts.",
    common_mistakes: [
      "Adding instead of multiplying",
      "Using R / I",
      "Ignoring units",
    ],
    explanation: "Voltage across a resistor depends on current and resistance.",
  },

  {
    q: "Find the resistance if V = 30V and I = 5A.",
    hint: "Use R = V / I",
    formula: "R = V / I",
    steps: [
      "Step 1: Identify values → V = 30V, I = 5A",
      "Step 2: Write formula → R = V / I",
      "Step 3: Substitute values → R = 30 / 5",
      "Step 4: Calculate → R = 6Ω",
    ],
    ans: "6Ω",
    final_check: "Resistance is measured in ohms (Ω).",
    common_mistakes: [
      "Using I / V",
      "Incorrect division",
      "Leaving out Ω",
    ],
    explanation: "Resistance determines how much a material opposes current flow.",
  },

  {
    q: "A battery supplies 48V to a 12Ω resistor. Find the current.",
    hint: "Use I = V / R",
    formula: "I = V / R",
    steps: [
      "Step 1: Identify values → V = 48V, R = 12Ω",
      "Step 2: Write formula → I = V / R",
      "Step 3: Substitute values → I = 48 / 12",
      "Step 4: Calculate → I = 4A",
    ],
    ans: "4A",
    final_check: "Current is measured in amperes.",
    common_mistakes: [
      "Using multiplication instead of division",
      "Using the wrong formula",
      "Ignoring units",
    ],
    explanation: "Current increases when voltage increases or resistance decreases.",
  }
]
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

<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 400 100" width="400" height="100" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;background:#12122a;border-radius:8px;">
  <!-- Wire top -->
  <line x1="40" y1="30" x2="380" y2="30" stroke="#7cfc00" stroke-width="2"/>
  <!-- Wire bottom -->
  <line x1="40" y1="70" x2="380" y2="70" stroke="#7cfc00" stroke-width="2"/>
  <!-- Battery left side -->
  <line x1="40" y1="30" x2="40" y2="70" stroke="#7cfc00" stroke-width="2"/>
  <line x1="30" y1="38" x2="50" y2="38" stroke="#f39c12" stroke-width="3"/>
  <line x1="35" y1="45" x2="45" y2="45" stroke="#f39c12" stroke-width="1.5"/>
  <text x="20" y="60" fill="#f39c12" font-size="10" font-family="sans-serif">+</text>
  <text x="42" y="60" fill="#f39c12" font-size="10" font-family="sans-serif">-</text>
  <text x="25" y="88" fill="#aaa" font-size="9" font-family="sans-serif">Battery</text>
  <!-- R1 -->
  <rect x="90" y="22" width="60" height="16" fill="#1a3a6a" stroke="#3498db" stroke-width="1.5" rx="3"/>
  <text x="120" y="34" fill="#3498db" font-size="11" text-anchor="middle" font-family="monospace">R1</text>
  <!-- R2 -->
  <rect x="180" y="22" width="60" height="16" fill="#1a3a6a" stroke="#3498db" stroke-width="1.5" rx="3"/>
  <text x="210" y="34" fill="#3498db" font-size="11" text-anchor="middle" font-family="monospace">R2</text>
  <!-- R3 -->
  <rect x="270" y="22" width="60" height="16" fill="#1a3a6a" stroke="#3498db" stroke-width="1.5" rx="3"/>
  <text x="300" y="34" fill="#3498db" font-size="11" text-anchor="middle" font-family="monospace">R3</text>
  <!-- Right close -->
  <line x1="380" y1="30" x2="380" y2="70" stroke="#7cfc00" stroke-width="2"/>
  <!-- Title -->
  <text x="200" y="90" fill="#aaa" font-size="10" text-anchor="middle" font-family="sans-serif">SERIES CIRCUIT — One path for current</text>
</svg>
</div>

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

<div style="text-align:center;margin:1rem 0;">
<svg viewBox="0 0 380 160" width="380" height="160" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto;background:#12122a;border-radius:8px;">
  <!-- Battery -->
  <line x1="40" y1="20" x2="40" y2="140" stroke="#7cfc00" stroke-width="2"/>
  <line x1="28" y1="60" x2="52" y2="60" stroke="#f39c12" stroke-width="3"/>
  <line x1="33" y1="72" x2="47" y2="72" stroke="#f39c12" stroke-width="1.5"/>
  <text x="18" y="68" fill="#f39c12" font-size="10" font-family="sans-serif">+</text>
  <text x="44" y="82" fill="#f39c12" font-size="10" font-family="sans-serif">-</text>
  <text x="18" y="150" fill="#aaa" font-size="9" font-family="sans-serif">Battery</text>
  <!-- Top bus wire -->
  <line x1="40" y1="20" x2="340" y2="20" stroke="#7cfc00" stroke-width="2"/>
  <!-- Bottom bus wire -->
  <line x1="40" y1="140" x2="340" y2="140" stroke="#7cfc00" stroke-width="2"/>
  <!-- Right close -->
  <line x1="340" y1="20" x2="340" y2="140" stroke="#7cfc00" stroke-width="2"/>
  <!-- Branch R1 -->
  <line x1="120" y1="20" x2="120" y2="45" stroke="#7cfc00" stroke-width="1.5"/>
  <rect x="98" y="45" width="44" height="18" fill="#1a3a6a" stroke="#e74c3c" stroke-width="1.5" rx="3"/>
  <text x="120" y="58" fill="#e74c3c" font-size="11" text-anchor="middle" font-family="monospace">R1</text>
  <line x1="120" y1="63" x2="120" y2="140" stroke="#7cfc00" stroke-width="1.5"/>
  <!-- Branch R2 -->
  <line x1="200" y1="20" x2="200" y2="61" stroke="#7cfc00" stroke-width="1.5"/>
  <rect x="178" y="61" width="44" height="18" fill="#1a3a6a" stroke="#9b59b6" stroke-width="1.5" rx="3"/>
  <text x="200" y="74" fill="#9b59b6" font-size="11" text-anchor="middle" font-family="monospace">R2</text>
  <line x1="200" y1="79" x2="200" y2="140" stroke="#7cfc00" stroke-width="1.5"/>
  <!-- Branch R3 -->
  <line x1="280" y1="20" x2="280" y2="77" stroke="#7cfc00" stroke-width="1.5"/>
  <rect x="258" y="77" width="44" height="18" fill="#1a3a6a" stroke="#f39c12" stroke-width="1.5" rx="3"/>
  <text x="280" y="90" fill="#f39c12" font-size="11" text-anchor="middle" font-family="monospace">R3</text>
  <line x1="280" y1="95" x2="280" y2="140" stroke="#7cfc00" stroke-width="1.5"/>
  <!-- Title -->
  <text x="190" y="158" fill="#aaa" font-size="10" text-anchor="middle" font-family="sans-serif">PARALLEL CIRCUIT — Multiple paths for current</text>
</svg>
</div>

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
    q: "A voltage of 20V produces a current of 5A. Find the resistance.",
    ans: "4Ω",
    sol: "R = V / I = 20 / 5 = 4Ω",
    steps: [
      "Step 1: Identify the given values: V = 20V and I = 5A.",
      "Step 2: Recall Ohm's Law for resistance: R = V / I.",
      "Step 3: Substitute the values: R = 20 / 5.",
      "Step 4: Calculate: R = 4Ω."
    ]
  },

  {
    type: "calc",
    q: "Find the current if V = 12V and R = 3Ω.",
    ans: "4A",
    sol: "I = V / R = 12 / 3 = 4A",
    steps: [
      "Step 1: Identify the given values: V = 12V and R = 3Ω.",
      "Step 2: Recall the formula: I = V / R.",
      "Step 3: Substitute the values: I = 12 / 3.",
      "Step 4: Calculate: I = 4A."
    ]
  },

  {
    type: "written",
    q: "State Ohm's Law.",
    ans: "Current is directly proportional to voltage provided the temperature remains constant."
  },

  {
    type: "calc",
    q: "A battery supplies 24V to a resistor of 6Ω. Find the current.",
    ans: "4A",
    sol: "I = V / R = 24 / 6 = 4A",
    steps: [
      "Step 1: Identify V = 24V and R = 6Ω.",
      "Step 2: Use the formula I = V / R.",
      "Step 3: Substitute the values: I = 24 / 6.",
      "Step 4: Calculate: I = 4A."
    ]
  },

  {
    type: "calc",
    q: "A current of 2A flows through a resistor of 10Ω. Find the voltage.",
    ans: "20V",
    sol: "V = IR = 2 × 10 = 20V",
    steps: [
      "Step 1: Identify I = 2A and R = 10Ω.",
      "Step 2: Recall the formula: V = IR.",
      "Step 3: Substitute the values: V = 2 × 10.",
      "Step 4: Calculate: V = 20V."
    ]
  },

  {
    type: "calc",
    q: "A resistor has a voltage of 18V and a current of 3A. Find its resistance.",
    ans: "6Ω",
    sol: "R = V / I = 18 / 3 = 6Ω",
    steps: [
      "Step 1: Identify V = 18V and I = 3A.",
      "Step 2: Recall the formula: R = V / I.",
      "Step 3: Substitute the values: R = 18 / 3.",
      "Step 4: Calculate: R = 6Ω."
    ]
  },

  {
    type: "calc",
    q: "A charge of 40C passes through a conductor in 8 seconds. Find the current.",
    ans: "5A",
    sol: "I = Q / t = 40 / 8 = 5A",
    steps: [
      "Step 1: Identify Q = 40C and t = 8s.",
      "Step 2: Recall the formula: I = Q / t.",
      "Step 3: Substitute the values: I = 40 / 8.",
      "Step 4: Calculate: I = 5A."
    ]
  },

  {
    type: "calc",
    q: "A charge of 72C flows for 9 seconds. Calculate the current.",
    ans: "8A",
    sol: "I = Q / t = 72 / 9 = 8A",
    steps: [
      "Step 1: Identify Q = 72C and t = 9s.",
      "Step 2: Recall the formula: I = Q / t.",
      "Step 3: Substitute the values: I = 72 / 9.",
      "Step 4: Calculate: I = 8A."
    ]
  },

  {
    type: "calc",
    q: "A current of 5A flows for 12 seconds. Find the charge transferred.",
    ans: "60C",
    sol: "Q = It = 5 × 12 = 60C",
    steps: [
      "Step 1: Identify I = 5A and t = 12s.",
      "Step 2: Recall the formula: Q = It.",
      "Step 3: Substitute the values: Q = 5 × 12.",
      "Step 4: Calculate: Q = 60C."
    ]
  },

  {
    type: "calc",
    q: "A current of 3A flows for 15 seconds. Calculate the charge.",
    ans: "45C",
    sol: "Q = It = 3 × 15 = 45C",
    steps: [
      "Step 1: Identify I = 3A and t = 15s.",
      "Step 2: Recall the formula: Q = It.",
      "Step 3: Substitute the values: Q = 3 × 15.",
      "Step 4: Calculate: Q = 45C."
    ]
  },

  {
    type: "calc",
    q: "An electric heater operates at 240V and draws a current of 5A. Find the power.",
    ans: "1200W",
    sol: "P = VI = 240 × 5 = 1200W",
    steps: [
      "Step 1: Identify V = 240V and I = 5A.",
      "Step 2: Recall the formula: P = VI.",
      "Step 3: Substitute the values: P = 240 × 5.",
      "Step 4: Calculate: P = 1200W."
    ]
  },

  {
    type: "calc",
    q: "A bulb operates at 12V and draws 2A. Calculate its power.",
    ans: "24W",
    sol: "P = VI = 12 × 2 = 24W",
    steps: [
      "Step 1: Identify V = 12V and I = 2A.",
      "Step 2: Recall the formula: P = VI.",
      "Step 3: Substitute the values: P = 12 × 2.",
      "Step 4: Calculate: P = 24W."
    ]
  },

  {
    type: "calc",
    q: "A motor uses 600W from a 200V supply. Find the current.",
    ans: "3A",
    sol: "I = P / V = 600 / 200 = 3A",
    steps: [
      "Step 1: Identify P = 600W and V = 200V.",
      "Step 2: Rearrange the power formula: I = P / V.",
      "Step 3: Substitute the values: I = 600 / 200.",
      "Step 4: Calculate: I = 3A."
    ]
  },

  {
    type: "calc",
    q: "An appliance consumes 1000W on a 250V supply. Find the current.",
    ans: "4A",
    sol: "I = P / V = 1000 / 250 = 4A",
    steps: [
      "Step 1: Identify P = 1000W and V = 250V.",
      "Step 2: Use the formula: I = P / V.",
      "Step 3: Substitute the values: I = 1000 / 250.",
      "Step 4: Calculate: I = 4A."
    ]
  },

  {
    type: "calc",
    q: "A resistor carries a current of 8A when connected to a 40V supply. Find the resistance.",
    ans: "5Ω",
    sol: "R = V / I = 40 / 8 = 5Ω",
    steps: [
      "Step 1: Identify V = 40V and I = 8A.",
      "Step 2: Recall the formula: R = V / I.",
      "Step 3: Substitute the values: R = 40 / 8.",
      "Step 4: Calculate: R = 5Ω."
    ]
  },

  {
    type: "written",
    q: "What is electric current?",
    ans: "Electric current is the rate of flow of electric charge through a conductor."
  },

  {
    type: "written",
    q: "State the SI unit of electric current.",
    ans: "The SI unit of electric current is the ampere (A)."
  },

  {
    type: "written",
    q: "State the SI unit of resistance.",
    ans: "The SI unit of resistance is the ohm (Ω)."
  },

  {
    type: "written",
    q: "State the SI unit of voltage.",
    ans: "The SI unit of voltage is the volt (V)."
  },

  {
    type: "written",
    q: "What instrument is used to measure electric current?",
    ans: "An ammeter is used to measure electric current."
  }
]
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
<pre>
Density: ρ = m / V
Pressure: P = F / A
Fluid pressure: P = ρgh
</pre>

<ul>
<li>ρ = density (kg/m³)</li>
<li>g = gravitational field strength (9.8 m/s²)</li>
<li>h = height of fluid column (m)</li>
</ul>

<h3> FLUID PRESSURE IDEA</h3>
<pre>
More depth (h) → More pressure (P)
More density (ρ) → More pressure (P)
</pre>

<h3> FLOW DIAGRAM</h3>
<pre>
Force → Pressure → Fluid motion → Buoyancy effects
</pre>

<h3> WORKED OUT CALCULATIONS</h3>

<h4>Example 1: Pressure in a fluid</h4>
<p>Calculate pressure at a depth of 5 m in water (ρ = 1000 kg/m³, g = 9.8 m/s²).</p>

<pre>
Step 1: Use formula P = ρgh

Step 2: Substitute values
P = 1000 × 9.8 × 5

Step 3: Multiply
P = 49000 Pa
</pre>

<p><b>Answer:</b> 49,000 Pa</p>

<h4>Example 2: Density calculation</h4>
<p>A substance has mass 2 kg and volume 0.5 m³. Find density.</p>

<pre>
Step 1: Use ρ = m / V

Step 2: Substitute values
ρ = 2 / 0.5

Step 3: Calculate
ρ = 4 kg/m³
</pre>

<p><b>Answer:</b> 4 kg/m³</p>

<h4>Example 3: Pressure from force</h4>
<p>A force of 200 N acts on an area of 4 m². Find pressure.</p>

<pre>
Step 1: Use P = F / A

Step 2: Substitute values
P = 200 / 4

Step 3: Calculate
P = 50 Pa
</pre>

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
      "Step 1: Recall that water exerts an upward force called upthrust (buoyant force).",
      "Step 2: Compare the ship's weight with the upthrust acting on it.",
      "Step 3: When the upthrust equals the weight of the ship, the ship floats.",
      "Step 4: The large hollow shape of a ship displaces enough water to produce sufficient upthrust."
    ],
    ans: "Ships float because water provides enough upthrust to balance their weight.",
    why: "A floating object remains in equilibrium when the buoyant force equals its weight."
  },
  {
    q: "Why does a stone sink in water?",
    steps: [
      "Step 1: Identify the weight of the stone acting downward.",
      "Step 2: Identify the upthrust provided by the water acting upward.",
      "Step 3: Compare the two forces.",
      "Step 4: Since the stone's weight is greater than the upthrust, it sinks."
    ],
    ans: "A stone sinks because its weight is greater than the upthrust acting on it.",
    why: "Objects sink when the downward force exceeds the buoyant force."
  },
  {
    q: "State Archimedes' Principle.",
    steps: [
      "Step 1: Consider an object immersed in a fluid.",
      "Step 2: The object displaces some of the fluid.",
      "Step 3: The displaced fluid has weight.",
      "Step 4: The upthrust equals the weight of the displaced fluid."
    ],
    ans: "A body wholly or partially immersed in a fluid experiences an upthrust equal to the weight of the fluid displaced.",
    why: "This principle explains floating and sinking."
  },
  {
    q: "Why is it easier to swim in seawater than in fresh water?",
    steps: [
      "Step 1: Compare the densities of seawater and fresh water.",
      "Step 2: Note that seawater is denser because of dissolved salts.",
      "Step 3: Denser water produces a greater upthrust.",
      "Step 4: Greater upthrust makes floating easier."
    ],
    ans: "Seawater is denser and provides greater upthrust than fresh water.",
    why: "Greater density increases the buoyant force."
  },
  {
    q: "A force of 200N acts on an area of 4m². Calculate the pressure.",
    hint: "Pressure = Force ÷ Area",
    steps: [
      "Step 1: Identify the values: Force = 200N and Area = 4m².",
      "Step 2: Write the formula: P = F ÷ A.",
      "Step 3: Substitute the values: P = 200 ÷ 4.",
      "Step 4: Calculate: P = 50 Pa."
    ],
    ans: "50 Pa",
    why: "Pressure is the force acting per unit area."
  },
  {
    q: "A force of 150N acts on an area of 3m². Find the pressure.",
    hint: "Use P = F ÷ A",
    steps: [
      "Step 1: Identify Force = 150N and Area = 3m².",
      "Step 2: Write the formula P = F ÷ A.",
      "Step 3: Substitute: P = 150 ÷ 3.",
      "Step 4: Calculate: P = 50 Pa."
    ],
    ans: "50 Pa",
    why: "Pressure increases when force increases or area decreases."
  },
  {
    q: "A pressure of 80Pa acts over an area of 5m². Calculate the force.",
    hint: "Force = Pressure × Area",
    steps: [
      "Step 1: Identify Pressure = 80Pa and Area = 5m².",
      "Step 2: Write the formula: F = PA.",
      "Step 3: Substitute: F = 80 × 5.",
      "Step 4: Calculate: F = 400N."
    ],
    ans: "400 N",
    why: "Force equals pressure multiplied by area."
  },
  {
    q: "A pressure of 300Pa is produced by a force of 600N. Find the area.",
    hint: "Area = Force ÷ Pressure",
    steps: [
      "Step 1: Identify Force = 600N and Pressure = 300Pa.",
      "Step 2: Rearrange the formula: A = F ÷ P.",
      "Step 3: Substitute: A = 600 ÷ 300.",
      "Step 4: Calculate: A = 2m²."
    ],
    ans: "2 m²",
    why: "Area is obtained by dividing force by pressure."
  },
  {
    q: "A force of 900N acts on an area of 9m². Calculate the pressure.",
    hint: "Use P = F ÷ A",
    steps: [
      "Step 1: Identify Force = 900N and Area = 9m².",
      "Step 2: Write the formula P = F ÷ A.",
      "Step 3: Substitute: P = 900 ÷ 9.",
      "Step 4: Calculate: P = 100 Pa."
    ],
    ans: "100 Pa",
    why: "Pressure is directly proportional to force and inversely proportional to area."
  },
  {
    q: "A pressure of 250Pa acts over an area of 8m². Find the force.",
    hint: "Use F = PA",
    steps: [
      "Step 1: Identify Pressure = 250Pa and Area = 8m².",
      "Step 2: Write the formula F = PA.",
      "Step 3: Substitute: F = 250 × 8.",
      "Step 4: Calculate: F = 2000N."
    ],
    ans: "2000 N",
    why: "Increasing either pressure or area increases the force."
  },
  {
    q: "A force of 360N acts on an area of 12m². Find the pressure.",
    hint: "Use P = F ÷ A",
    steps: [
      "Step 1: Identify Force = 360N and Area = 12m².",
      "Step 2: Write the formula P = F ÷ A.",
      "Step 3: Substitute: P = 360 ÷ 12.",
      "Step 4: Calculate: P = 30 Pa."
    ],
    ans: "30 Pa",
    why: "Pressure is measured in pascals (Pa)."
  }
]
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
<pre>
Atom
 ↓
Nucleus (protons + neutrons)
 ↓
Unstable nucleus
 ↓
Radiation emitted (α, β, γ)
 ↓
More stable atom
</pre>

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

<pre>
U-235 → Ba + Kr + Energy + Neutrons
</pre>

<h4> Nuclear Fusion</h4>
<ul>
<li>Two light nuclei combine</li>
<li>Produces even more energy than fission</li>
<li>Occurs in the sun and stars</li>
</ul>

<pre>
H + H → He + Energy
</pre>

<h3> WORKED EXAMPLES</h3>

<h4>Example 1: Identify radiation type</h4>
<p>A radiation is stopped by paper but strongly ionizing. What is it?</p>

<pre>
Step 1: Check penetration → low
Step 2: Check ionization → high
Step 3: Match properties
</pre>

<p><b>Answer:</b> Alpha radiation</p>

<h4>Example 2: Compare fission and fusion</h4>
<pre>
Step 1: Fission = splitting of heavy nucleus
Step 2: Fusion = combining light nuclei
Step 3: Both release energy
</pre>

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
      "Step 1: Recall that some atomic nuclei are unstable.",
      "Step 2: An unstable nucleus emits radiation without any external influence.",
      "Step 3: This emission may include alpha particles, beta particles, or gamma rays.",
      "Step 4: The process continues until the nucleus becomes more stable."
    ],
    ans: "Radioactivity is the spontaneous emission of radiation from an unstable nucleus.",
    why: "Unstable nuclei lose excess energy by emitting radiation to become more stable."
  },
  {
    q: "What is an alpha particle?",
    steps: [
      "Step 1: Recall the three common types of radioactive emissions.",
      "Step 2: Identify that an alpha particle contains protons and neutrons.",
      "Step 3: State its composition.",
      "Step 4: Give the definition."
    ],
    ans: "An alpha particle is a helium nucleus containing two protons and two neutrons.",
    why: "Alpha particles are emitted by heavy unstable nuclei."
  },
  {
    q: "What is a beta particle?",
    steps: [
      "Step 1: Recall radioactive emissions.",
      "Step 2: Identify the beta particle as a fast-moving electron.",
      "Step 3: State that it is emitted from the nucleus.",
      "Step 4: Give the definition."
    ],
    ans: "A beta particle is a high-speed electron emitted from the nucleus of a radioactive atom.",
    why: "Beta decay helps unstable nuclei achieve greater stability."
  },
  {
    q: "What are gamma rays?",
    steps: [
      "Step 1: Recall that gamma rays are a type of radiation.",
      "Step 2: Identify that they are electromagnetic waves.",
      "Step 3: Note that they have no mass and no charge.",
      "Step 4: State the definition."
    ],
    ans: "Gamma rays are high-energy electromagnetic waves emitted from radioactive nuclei.",
    why: "Gamma rays carry excess energy away from unstable nuclei."
  },
  {
    q: "State one property of alpha particles.",
    steps: [
      "Step 1: Recall the characteristics of alpha particles.",
      "Step 2: Identify one property.",
      "Step 3: State the property clearly."
    ],
    ans: "Alpha particles have a positive charge of +2.",
    why: "They contain two positively charged protons."
  },
  {
    q: "Why are gamma rays more penetrating than alpha particles?",
    steps: [
      "Step 1: Compare the masses of alpha particles and gamma rays.",
      "Step 2: Recall that gamma rays have no mass or charge.",
      "Step 3: Less interaction with matter allows deeper penetration.",
      "Step 4: State the conclusion."
    ],
    ans: "Gamma rays are more penetrating because they have no mass and no charge.",
    why: "They interact less with matter than charged particles."
  },
  {
    q: "Name two applications of modern physics.",
    hint: "Think medicine and energy.",
    steps: [
      "Step 1: Identify one medical application.",
      "Step 2: Identify one energy application.",
      "Step 3: State both applications."
    ],
    ans: "X-ray imaging and nuclear power generation.",
    why: "Both rely on atomic and nuclear physics."
  },
  {
    q: "State one medical application of radioactivity.",
    hint: "Think hospitals.",
    steps: [
      "Step 1: Recall how radiation is used in medicine.",
      "Step 2: Identify one example.",
      "Step 3: State the application."
    ],
    ans: "Cancer treatment using radiotherapy.",
    why: "Radiation destroys cancer cells."
  },
  {
    q: "State one industrial application of radioactivity.",
    hint: "Think manufacturing.",
    steps: [
      "Step 1: Recall industrial uses of radiation.",
      "Step 2: Identify one example.",
      "Step 3: State the application."
    ],
    ans: "Checking the thickness of paper or metal sheets.",
    why: "Radiation helps monitor product quality."
  },
  {
    q: "State one agricultural application of radioactivity.",
    hint: "Think crops.",
    steps: [
      "Step 1: Recall how radiation is used in agriculture.",
      "Step 2: Identify one use.",
      "Step 3: State the application."
    ],
    ans: "Producing improved crop varieties through mutation breeding.",
    why: "Radiation can produce useful genetic variations."
  },
  {
    q: "State one disadvantage of radioactivity.",
    hint: "Think health effects.",
    steps: [
      "Step 1: Recall the harmful effects of radiation.",
      "Step 2: Identify one effect.",
      "Step 3: State the disadvantage."
    ],
    ans: "Exposure to radiation can cause cancer.",
    why: "Ionising radiation damages body cells and DNA."
  },
  {
    q: "Why must radioactive materials be handled carefully?",
    hint: "Think safety.",
    steps: [
      "Step 1: Recall that radiation can damage living tissue.",
      "Step 2: Consider long-term exposure effects.",
      "Step 3: State why safety precautions are necessary."
    ],
    ans: "They emit harmful radiation that can damage living cells and tissues.",
    why: "Proper handling reduces exposure and protects human health."
  }
]
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
<pre>
Energy gained by electron:
E = eV

Kinetic energy:
KE = ½mv²

Therefore:
eV = ½mv²
</pre>

<ul>
<li>e = charge of electron = 1.6 × 10⁻¹⁹ C</li>
<li>V = potential difference (volts)</li>
<li>m = mass of electron = 9.11 × 10⁻³¹ kg</li>
</ul>

<h3> CATHODE RAY TUBE STRUCTURE</h3>
<figure class="topic-img-container">
  <img src="/images/cathode_ray_tube.png" alt="Cathode Ray Tube Schematic Diagram" class="topic-img" />
  <figcaption>Schematic of a Cathode Ray Tube showing electron emission from cathode, anode acceleration, deflection plates, and glowing fluorescent screen.</figcaption>
</figure>

<h3> WORKED OUT CALCULATIONS</h3>

<h4>Example 1: Energy gained by an electron</h4>
<p>An electron is accelerated through a potential difference of 200 V. Find the energy gained.</p>

<pre>
Step 1: Use formula E = eV

Step 2: Substitute values
E = (1.6 × 10⁻¹⁹) × 200

Step 3: Multiply
E = 3.2 × 10⁻¹⁷ J
</pre>

<p><b>Answer:</b> 3.2 × 10⁻¹⁷ J</p>

<h4>Example 2: Speed of electron</h4>
<p>An electron is accelerated through 100 V. Calculate its speed.</p>

<pre>
Step 1: Use eV = ½mv²

Step 2: Substitute values
(1.6 × 10⁻¹⁹ × 100) = ½ × (9.11 × 10⁻³¹) × v²

Step 3: Solve energy
1.6 × 10⁻¹⁷ = 4.555 × 10⁻³¹ v²

Step 4: Rearrange
v² = (1.6 × 10⁻¹⁷) / (4.555 × 10⁻³¹)

Step 5: Calculate
v² ≈ 3.51 × 10¹³

Step 6: Square root
v ≈ 5.9 × 10⁶ m/s
</pre>

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
      "Step 1: Recall that a cathode ray tube contains a cathode and an anode in a vacuum.",
      "Step 2: Electrons are emitted from the cathode when a high voltage is applied.",
      "Step 3: The electrons travel across the vacuum toward the anode.",
      "Step 4: These moving electrons are called cathode rays."
    ],
    ans: "Cathode rays are streams of electrons moving from the cathode to the anode in a vacuum tube.",
    why: "Cathode rays consist of negatively charged electrons."
  },
  {
    q: "State two properties of cathode rays.",
    steps: [
      "Step 1: Recall the characteristics of cathode rays.",
      "Step 2: Identify that they travel in straight lines.",
      "Step 3: Identify that they are negatively charged.",
      "Step 4: State both properties."
    ],
    ans: "They travel in straight lines and are negatively charged.",
    why: "These properties were demonstrated using cathode ray tubes."
  },
  {
    q: "Why do cathode rays produce shadows?",
    steps: [
      "Step 1: Recall that cathode rays travel in straight lines.",
      "Step 2: Place an object in their path.",
      "Step 3: The object blocks the rays.",
      "Step 4: A shadow forms behind the object."
    ],
    ans: "Because cathode rays travel in straight lines and are blocked by solid objects.",
    why: "Straight-line motion causes shadow formation."
  },
  {
    q: "Why do cathode rays cause fluorescence?",
    steps: [
      "Step 1: Cathode rays strike a fluorescent material.",
      "Step 2: The electrons transfer energy to the material.",
      "Step 3: The material emits visible light.",
      "Step 4: The screen glows."
    ],
    ans: "They transfer energy to fluorescent materials, causing them to emit light.",
    why: "The kinetic energy of electrons is converted into light energy."
  },
  {
    q: "Why can cathode rays turn a light paddle wheel?",
    steps: [
      "Step 1: Recall that cathode rays are streams of particles.",
      "Step 2: The particles strike the paddle wheel.",
      "Step 3: They transfer momentum to the wheel.",
      "Step 4: The wheel rotates."
    ],
    ans: "Because cathode rays have mass and momentum that can push the paddle wheel.",
    why: "This demonstrates that cathode rays are particles."
  },
  {
    q: "Why are cathode rays deflected in electric fields?",
    hint: "Think about their charge.",
    steps: [
      "Step 1: Recall that cathode rays are electrons.",
      "Step 2: Electrons have a negative charge.",
      "Step 3: Electric fields exert forces on charged particles.",
      "Step 4: Therefore, cathode rays are deflected toward the positive plate."
    ],
    ans: "Because cathode rays are negatively charged electrons.",
    why: "Charged particles experience forces in electric fields."
  },
  {
    q: "Why are cathode rays deflected by magnetic fields?",
    hint: "Think about moving charges.",
    steps: [
      "Step 1: Recall that cathode rays are moving electrons.",
      "Step 2: Moving charges experience magnetic forces.",
      "Step 3: The magnetic field changes their direction.",
      "Step 4: The rays are deflected."
    ],
    ans: "Because moving electrons experience a force in a magnetic field.",
    why: "Magnetic fields affect moving charged particles."
  },
  {
    q: "What happens when cathode rays strike a metal target?",
    hint: "Think X-rays.",
    steps: [
      "Step 1: Cathode rays move at very high speed.",
      "Step 2: They collide with the metal target.",
      "Step 3: They lose energy suddenly.",
      "Step 4: X-rays are produced."
    ],
    ans: "X-rays are produced when cathode rays strike a metal target.",
    why: "Rapid deceleration of electrons produces X-rays."
  },
  {
    q: "Why is a vacuum needed in a cathode ray tube?",
    hint: "Think collisions.",
    steps: [
      "Step 1: Recall that air contains many particles.",
      "Step 2: Electrons would collide with air molecules.",
      "Step 3: These collisions would reduce their energy.",
      "Step 4: A vacuum allows electrons to travel freely."
    ],
    ans: "A vacuum prevents electrons from colliding with air molecules.",
    why: "The rays can travel efficiently only in a vacuum."
  },
  {
    q: "How do cathode rays demonstrate that electrons are particles?",
    hint: "Think mass and momentum.",
    steps: [
      "Step 1: Observe that cathode rays can move a light paddle wheel.",
      "Step 2: Only particles with mass can transfer momentum.",
      "Step 3: The wheel rotates after being struck.",
      "Step 4: Therefore, cathode rays are particles."
    ],
    ans: "They move a light paddle wheel, showing that they have mass and momentum.",
    why: "Objects with mass behave as particles."
  }
]
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
<pre>
E = hf
KE(max) = hf − φ
</pre>
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
<figure class="topic-img-container">
  <img src="/images/photoelectric_effect_diagram.png" alt="Photoelectric Effect Diagram" class="topic-img" />
  <figcaption>Illustration of Photoelectric Emission: Light photons striking a metal surface, work function barrier (φ), and emitted photoelectrons.</figcaption>
</figure>
<h3> WORKED EXAMPLES</h3>
<h4>Example 1: Photon Energy</h4>
<p>Calculate energy of a photon of frequency 5 × 10¹⁴ Hz</p>
<pre>
E = hf
E = 6.63 × 10⁻³⁴ × 5 × 10¹⁴
E = 3.315 × 10⁻¹⁹ J
</pre>
<p><b>Answer:</b> 3.315 × 10⁻¹⁹ J</p>
<h4>Example 2: Photoelectron Kinetic Energy</h4>
<p>A metal has work function 2.0 × 10⁻¹⁹ J. Light of energy 5.0 × 10⁻¹⁹ J is incident. Find KE(max).</p>
<pre>
KE = hf − φ
KE = 5.0 × 10⁻¹⁹ − 2.0 × 10⁻¹⁹
KE = 3.0 × 10⁻¹⁹ J
</pre>
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
      "Step 1: Identify incident radiation (light of sufficient frequency).",
      "Step 2: Identify the surface (metal surface).",
      "Step 3: State the emission of electrons (photoelectrons)."
    ],
    ans: "Photoelectric emission is the ejection of electrons from a metal surface when light of sufficient frequency strikes it.",
    why: "Photons transfer their energy to electrons in the metal, causing them to escape if energy exceeds work function."
  },
  {
    q: "Define threshold frequency (f₀) in photoelectric effect.",
    steps: [
      "Step 1: Consider the frequency of incident radiation.",
      "Step 2: Define the minimum boundary required for emission.",
      "Step 3: Explain that light below this frequency causes no electron ejection regardless of intensity."
    ],
    ans: "Threshold frequency is the minimum frequency of light required to emit photoelectrons from a given metal surface.",
    why: "If light frequency is below threshold frequency, individual photon energy is less than the work function."
  },
  {
    q: "Define the work function (φ) of a metal.",
    steps: [
      "Step 1: Consider the binding energy of electrons in a metal.",
      "Step 2: Define the minimum energy required.",
      "Step 3: State that it is the minimum energy needed to free an electron from the metal surface."
    ],
    ans: "Work function is the minimum energy required to liberate an electron from a metal surface.",
    why: "Electrons are bound to metal atoms and require a specific threshold energy to escape."
  },
  {
    q: "State Einstein's photoelectric equation.",
    hint: "Think energy of photon = work function + max kinetic energy.",
    steps: [
      "Step 1: Write photon energy (hf).",
      "Step 2: Equate to work function (φ) plus maximum kinetic energy (KEmax).",
      "Step 3: State equation: hf = φ + KEmax or KEmax = hf - φ."
    ],
    ans: "hf = φ + KEmax (or KEmax = hf - φ)",
    why: "Incident photon energy (hf) is used to overcome work function (φ) and any remaining energy becomes kinetic energy of photoelectron."
  },
  {
    q: "What effect does increasing the intensity of incident light have on photoelectric emission?",
    hint: "Think number of photons vs energy per photon.",
    steps: [
      "Step 1: Understand that higher intensity means more photons per second.",
      "Step 2: State that each photon interacts with one electron.",
      "Step 3: Conclude that more photoelectrons are emitted per second (photocurrent), but max kinetic energy stays constant."
    ],
    ans: "Increasing intensity increases the number of emitted photoelectrons per second (photocurrent), but does not change their maximum kinetic energy.",
    why: "Intensity determines the photon flux, while light frequency determines individual photon energy."
  },
  {
    q: "Why does light below threshold frequency fail to emit electrons even if intensity is increased?",
    steps: [
      "Step 1: Recognize that one photon interacts with one electron.",
      "Step 2: Note that if individual photon energy (hf) < work function (φ), no energy accumulates.",
      "Step 3: Conclude that increasing intensity only supplies more low-energy photons."
    ],
    ans: "Because individual photon energy depends on frequency; if hf < φ, single photons cannot liberate electrons, no matter how many strike the surface.",
    why: "Photoelectric absorption is a one-to-one photon-electron interaction."
  },
  {
    q: "Calculate the energy of a photon of light with frequency 6.0 × 10¹⁴ Hz. (Planck's constant h = 6.63 × 10⁻³⁴ J·s)",
    hint: "Use E = hf",
    steps: [
      "Step 1: Identify h = 6.63 × 10⁻³⁴ J·s and f = 6.0 × 10¹⁴ Hz.",
      "Step 2: Apply formula E = h × f.",
      "Step 3: Substitute: E = (6.63 × 10⁻³⁴) × (6.0 × 10¹⁴).",
      "Step 4: Calculate: E = 3.978 × 10⁻¹⁹ J."
    ],
    ans: "3.978 × 10⁻¹⁹ J",
    why: "Photon energy is directly proportional to frequency via Planck's constant."
  },
  {
    q: "A metal has a work function of 2.5 × 10⁻¹⁹ J. If incident light delivers photon energy of 4.2 × 10⁻¹⁹ J, find the maximum kinetic energy of the emitted photoelectrons.",
    hint: "Use KEmax = hf - φ",
    steps: [
      "Step 1: Identify photon energy E = hf = 4.2 × 10⁻¹⁹ J.",
      "Step 2: Identify work function φ = 2.5 × 10⁻¹⁹ J.",
      "Step 3: Apply KEmax = hf - φ.",
      "Step 4: Calculate KEmax = (4.2 × 10⁻¹⁹) - (2.5 × 10⁻¹⁹) = 1.7 × 10⁻¹⁹ J."
    ],
    ans: "1.7 × 10⁻¹⁹ J",
    why: "The excess energy above the work function becomes the maximum kinetic energy of the emitted photoelectron."
  },
  {
    q: "What is stopping potential in the photoelectric effect?",
    steps: [
      "Step 1: Define opposing electric potential applied to anode.",
      "Step 2: State the minimum retarding potential that stops the fastest photoelectrons.",
      "Step 3: Relate to maximum kinetic energy (eVs = KEmax)."
    ],
    ans: "Stopping potential is the minimum negative potential applied to the collector plate that completely stops the flow of photoelectrons (reduces photocurrent to zero).",
    why: "At stopping potential, work done against electric field equals maximum kinetic energy of photoelectrons (eVs = KEmax)."
  },
  {
    q: "State two practical applications of photoelectric emission.",
    steps: [
      "Step 1: Identify technology utilizing light detection.",
      "Step 2: Give solar cells / solar panels.",
      "Step 3: Give light sensors in cameras or automatic doors."
    ],
    ans: "Solar panels (photovoltaic cells) and light sensors in automatic doors and digital cameras.",
    why: "These devices convert incident light energy directly into electrical signals using photoelectric principles."
  }
],
);
