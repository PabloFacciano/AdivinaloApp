
import * as mock from './mocks-utils';

export async function getUserById(userId){
  if (!userId){
    debugger;
  }
  await sleep();
  return mock.newUser(userId);
}

export async function upsertQuestionAnswer(question){
  console.warn("TO-DO: supabase.js:upsertQuestionAnswer")
  await mock.sleep();
}

export async function getQuestionsForUser(toUserId){
  console.warn(`TO-DO: supabase.js:getQuestionsForUser [${toUserId}]`)
  await sleep();
  return mock.getQuestions();
}




