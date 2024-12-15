
import * as mock from './mocks-utils';

export async function getUserById(userId){
  if (!userId){
    debugger;
  }
  await sleep(2000);
  return mock.newUser(userId);
}

export async function upsertQuestionAnswer(question){
  console.warn("TO-DO: supabase.js:upsertQuestionAnswer")
  await mock.sleep(2000);
}

export async function getQuestionsForUser(toUserId){
  console.warn(`TO-DO: supabase.js:getQuestionsForUser [${toUserId}]`)
  await sleep(2000);
  return mock.getQuestions();
}




