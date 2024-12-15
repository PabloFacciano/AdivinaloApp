import User from '../class/User'
import Question from '../class/Question'
import QuestionOption from '../class/QuestionOption'


function random(min, max){
  return Math.floor(Math. random()*max) + min;
}
function sleep(delay) {
  if (!delay) delay = random(1000,3000);
  return new Promise((resolve) => setTimeout(resolve, delay))
}

function getQuestions(fromUserId, toUserId){

  const NO_SELECTED_OPTION = null;
  const NO_VALID_OPTION = null;
  const NOT_READ_ONLY = false;

  let questions = [
    new Question(
      random(100000,1000000),
      fromUserId,
      toUserId,
      '¿Cuántos años tienes?',
      [
        new QuestionOption(1, '18-24'),
        new QuestionOption(2, '25-34'),
        new QuestionOption(3, '35-44'),
        new QuestionOption(4, '45 o más')
      ],
      NO_SELECTED_OPTION,
      NO_VALID_OPTION,
      NOT_READ_ONLY
    ),
    new Question(
      random(100000,1000000),
      fromUserId,
      toUserId,
      '¿Mascota favorita?',
      [
        new QuestionOption(1, 'Gato'),
        new QuestionOption(2, 'Perro'),
        new QuestionOption(3, 'Pececito'),
        new QuestionOption(4, 'No me gustan las mascotas')
      ],
      NO_SELECTED_OPTION,
      1,
      NOT_READ_ONLY
    ),
    new Question(
      random(100000,1000000),
      fromUserId,
      toUserId,
      '¿Donde irías de vacaciones?',
      [
        new QuestionOption(1, 'España'),
        new QuestionOption(2, 'Estados Unidos'),
        new QuestionOption(3, 'Prefiero destinos nacionales'),
        new QuestionOption(4, 'Prefiero no viajar')
      ],
      NO_SELECTED_OPTION,
      2,
      NOT_READ_ONLY
    )
  ];
  return questions;
}

function newUser(id, name){

  const NO_FRIENDS = [];
  const NO_BLOCKED = [];
  const ONLINE = random(0,10) >= 5;

  return new User(
    id,
    `${name} #${id}`,
    getQuestions(id,id),
    [
      random(100000,1000000),
      random(100000,1000000),
      random(100000,1000000),
      random(100000,1000000),
      random(100000,1000000)
    ],
    [
      random(100000,1000000),
      random(100000,1000000),
      random(100000,1000000)
    ],
    ONLINE
  );
}


export {
  random,
  sleep,
  newUser,
  getQuestions
}