async function testFetchTopic() {
  const sid = "math";
  const cid = "algebra";
  const topic = "Linear equations";

  // Test 1: Direct fetch to Render backend
  const backendUrl = `https://shifter-i49i.onrender.com/api/content/${encodeURIComponent(sid)}/${encodeURIComponent(cid)}/${encodeURIComponent(topic)}`;
  console.log("Fetching from Render:", backendUrl);
  try {
    const res1 = await fetch(backendUrl);
    console.log("Render response status:", res1.status);
    const data1 = await res1.json();
    console.log("Render questions count:", data1.qs?.length, "Notes length:", data1.notes?.length);
  } catch (e) {
    console.error("Render failed:", e);
  }

  // Test 2: Fetch with Origin header (simulate browser from Vercel)
  try {
    const res2 = await fetch(backendUrl, {
      headers: {
        Origin: "https://tixar-iota.vercel.app",
        "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X)"
      }
    });
    console.log("Render with Vercel Origin status:", res2.status);
    console.log("Access-Control-Allow-Origin:", res2.headers.get("access-control-allow-origin"));
  } catch (e) {
    console.error("Render with Origin failed:", e);
  }
}

testFetchTopic().catch(console.error);
