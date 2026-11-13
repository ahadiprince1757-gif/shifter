const fs = require('fs');
const path = require('path');
const env = fs.readFileSync(path.join(__dirname, '../.env'), 'utf8').split('\n').reduce((acc, line) => {
  const [k, ...v] = line.split('=');
  if (k && v.length) acc[k.trim()] = v.join('=').trim();
  return acc;
}, {});

const { createClient } = require(path.join(__dirname, '../node_modules/@supabase/supabase-js'));
const supabase = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY);
const intelligenceService = require(path.join(__dirname, '../services/intelligenceService'));

async function testPipeline() {
  console.log('--- STARTING END-TO-END PIPELINE VERIFICATION ---');

  // 1. Pick an active profile
  const { data: profile, error: pErr } = await supabase.from('profiles').select('id, full_name').limit(1).single();
  if (pErr || !profile) {
    throw new Error('Could not find active profile: ' + (pErr?.message || 'none'));
  }
  const testUserId = profile.id;
  console.log(`Using Profile ID: ${testUserId} (${profile.full_name || 'Anonymous'})`);

  // 2. Query a valid topic and question
  const { data: topicRow } = await supabase.from('topics').select('id, title, chapter_id').limit(1).single();
  const testTopicId = topicRow ? topicRow.id : 41134;
  const testTopicTitle = topicRow ? topicRow.title : 'Number Systems';

  const { data: qRow } = await supabase.from('questions').select('id').limit(1).single();
  const testQuestionId = qRow ? qRow.id : 122940;
  console.log(`Using Topic: ID ${testTopicId} - "${testTopicTitle}" | Question ID: ${testQuestionId}`);

  // 3. Test PIPELINE 1: question_attempts
  console.log('\n[1/4] Testing question_attempts insertion...');
  const attemptPayload = {
    user_id: testUserId,
    question_id: testQuestionId,
    topic_id: testTopicId,
    user_answer: 'Test Answer 42',
    is_correct: true,
    score: 100,
    time_spent_seconds: 12,
    attempted_at: new Date().toISOString()
  };
  const { data: attemptData, error: attemptErr } = await supabase.from('question_attempts').insert(attemptPayload).select();
  if (attemptErr) {
    console.error('FAIL: question_attempts insert error:', attemptErr.message);
  } else {
    console.log('SUCCESS: question_attempts row created! ID:', attemptData[0].id);
  }

  // 4. Test PIPELINE 2: learning_events ingestion
  console.log('\n[2/4] Testing learning_events ingestion...');
  const clientEventId = `e2e_evt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const eventPayload = {
    user_id: testUserId,
    event_type: 'question_correct',
    topic_id: testTopicId,
    client_event_id: clientEventId,
    created_at: new Date().toISOString()
  };
  const { data: eventData, error: eventErr } = await supabase.from('learning_events').insert(eventPayload).select();
  if (eventErr) {
    console.error('FAIL: learning_events insert error:', eventErr.message);
  } else {
    console.log('SUCCESS: learning_events row created! ID:', eventData[0].id, 'client_event_id:', clientEventId);
  }

  // 5. Test PIPELINE 3: intelligence_decisions computation
  console.log('\n[3/4] Testing intelligence_decisions computation...');
  try {
    const decisionResult = await intelligenceService.computeAndRecordDecision(
      supabase,
      testUserId,
      [{
        id: eventData?.[0]?.id || 1,
        client_event_id: clientEventId,
        topic_id: testTopicId,
        topic: testTopicTitle,
        correct: true,
        event_type: 'question_correct',
        created_at: new Date().toISOString()
      }],
      [{ topic_id: testTopicId, topic_title: testTopicTitle, pass_count: 1, fail_count: 0, visit_count: 1 }],
      []
    );
    console.log('SUCCESS: intelligence_decisions calculated and recorded! Decision ID:', decisionResult.decisionId, 'Type:', decisionResult.decisionType);
  } catch (decErr) {
    console.error('FAIL: intelligence_decisions error:', decErr.message);
  }

  // 6. Test PIPELINE 4: progress upsert
  console.log('\n[4/4] Testing progress upsert with resolved numeric topic_id...');
  const progressPayload = {
    user_id: testUserId,
    topic_id: testTopicId,
    topic_title: testTopicTitle,
    completed: true,
    mastery_score: 100,
    confidence_level: 'high',
    mastered: true,
    mastered_at: new Date().toISOString(),
    last_studied_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  const { data: progressData, error: progressErr } = await supabase
    .from('progress')
    .upsert(progressPayload, { onConflict: 'user_id,topic_id' })
    .select();
  if (progressErr) {
    console.error('FAIL: progress upsert error:', progressErr.message);
  } else {
    console.log('SUCCESS: progress row upserted! ID:', progressData[0]?.id || 'OK');
  }

  // 7. Final Table Row Count Summary
  console.log('\n=================================================');
  console.log('FINAL DATABASE PIPELINE VERIFICATION SUMMARY:');
  const tables = ['question_attempts', 'learning_events', 'intelligence_decisions', 'progress'];
  for (const t of tables) {
    const { count, error } = await supabase.from(t).select('*', { count: 'exact', head: true });
    console.log(`  Table [${t}]: ${count} rows ${count > 0 ? '✓ (ACTIVE - NO LONGER CSV PROMPT)' : '✗'}`);
  }
  console.log('=================================================');
}

testPipeline().catch(err => console.error('E2E TEST CRASH:', err));
