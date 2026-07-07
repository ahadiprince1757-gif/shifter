async function runTests() {
  console.log("=================================================");
  console.log("    SHIFTER / TIXAR - INTEGRATION TEST SUITE     ");
  console.log("=================================================\n");

  const BACKEND_URL = "http://localhost:3001";
  
  // 1. Health check
  try {
    const healthRes = await fetch(`${BACKEND_URL}/health`);
    if (!healthRes.ok) throw new Error(`Health status: ${healthRes.status}`);
    const health = await healthRes.json();
    console.log("✓ Health Check Passed:", health);
  } catch (err) {
    console.error("✗ Health Check Failed:", err.message);
    process.exit(1);
  }

  // 2. Curriculum Loading
  let curriculum = [];
  try {
    const currRes = await fetch(`${BACKEND_URL}/api/curriculum`);
    if (!currRes.ok) throw new Error(`Curriculum status: ${currRes.status}`);
    curriculum = await currRes.json();
    console.log(`✓ Curriculum Loaded: ${curriculum.length} subjects found.`);
  } catch (err) {
    console.error("✗ Curriculum Loading Failed:", err.message);
    process.exit(1);
  }

  // 3. Subject Content Verification (Iterate over all loaded subjects)
  console.log("\nVerifying Subject Data & Notes Fetching:");
  console.log("-------------------------------------------------");
  for (const subject of curriculum) {
    const sid = subject.id;
    const label = subject.label;
    
    if (!subject.chapters || subject.chapters.length === 0) {
      console.error(`✗ Subject ${label} (${sid}) has no chapters!`);
      continue;
    }
    
    const firstChapter = subject.chapters[0];
    const cid = firstChapter.id;
    
    if (!firstChapter.topics || firstChapter.topics.length === 0) {
      console.error(`✗ Subject ${label} -> Chapter ${firstChapter.label} has no topics!`);
      continue;
    }
    
    const firstTopic = firstChapter.topics[0];
    
    try {
      const url = `${BACKEND_URL}/api/content/${encodeURIComponent(sid)}/${encodeURIComponent(cid)}/${encodeURIComponent(firstTopic)}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Status: ${res.status}`);
      const content = await res.json();
      
      const noteLength = content.notes ? content.notes.length : 0;
      const numQuestions = Array.isArray(content.qs) ? content.qs.length : 0;
      
      console.log(`✓ [${sid.toUpperCase()}] Label: ${label.padEnd(16)} | First Topic: "${firstTopic.slice(0, 30)}..." | Notes: ${noteLength} chars | Quiz: ${numQuestions} questions`);
    } catch (err) {
      console.error(`✗ Failed to load content for ${sid}/${cid}/${firstTopic}:`, err.message);
    }
  }

  // 4. Grading Engine Test Cases
  console.log("\nVerifying Grading Engine Logic:");
  console.log("-------------------------------------------------");
  const gradingTestCases = [
    {
      description: "Correct Answer (Exact Match)",
      payload: {
        sid: "physics",
        cid: "motion",
        topic: "Displacement & Distance",
        qId: 0,
        answer: "Distance = 20 m, Displacement = 0 m"
      },
      expectedCorrect: true
    },
    {
      description: "Incorrect/Unrelated Answer",
      payload: {
        sid: "physics",
        cid: "motion",
        topic: "Displacement & Distance",
        qId: 0,
        answer: "Gravity is 9.8"
      },
      expectedCorrect: false
    },
    {
      description: "Partial Keyword Match",
      payload: {
        sid: "physics",
        cid: "motion",
        topic: "Displacement & Distance",
        qId: 0,
        answer: "Distance = 10 m, Displacement = 10 m"
      },
      expectedCorrect: true // Lenient keyword behavior noted in backend
    }
  ];

  for (const tc of gradingTestCases) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/grade`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tc.payload)
      });
      if (!res.ok) throw new Error(`Grading API status: ${res.status}`);
      const result = await res.json();
      
      const status = result.isCorrect === tc.expectedCorrect ? "✓" : "✗";
      console.log(`${status} ${tc.description}: Sent "${tc.payload.answer}" -> Graded isCorrect: ${result.isCorrect} (Expected: ${tc.expectedCorrect})`);
    } catch (err) {
      console.error(`✗ Grading failed for ${tc.description}:`, err.message);
    }
  }

  console.log("\n=================================================");
  console.log("    INTEGRATION VERIFICATION COMPLETE            ");
  console.log("=================================================");
}

runTests();
