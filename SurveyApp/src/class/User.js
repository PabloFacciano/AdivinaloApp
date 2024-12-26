import DbObject from "./DbObject";
import Pagination from "./Pagination";
import supabase from "../db/supabase"
import { sleep, isValidUUID } from "../db/mocks-utils";
import Question from "./Question";
import QuestionOption from "./QuestionOption";

export default class User extends DbObject {
  constructor(id, name, questions, friendsId, blockedsId, online, languageId, countryId) {
    super(id);
    this.name = name ?? 'Default Name'; // String
    this.questions = questions ?? []; // Array
    this.questionsPagination = new Pagination(1, 1, questions.length);
    this.friendsId = friendsId ?? []; // Array
    this.blockedsId = blockedsId; // Array
    this.online = online; // Boolean
    this.languageId = languageId; // String
    this.countryId = countryId; // String
  }

  get initials() {
    if (!this.name) return;

    // Split the name into an array of words
    const words = this.name.trim().split(/\s+/);
    // Get the first two initials
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');

    return initials;
  }

  static async getFromDatabase(_id, _currentUserId) {
    if (!isValidUUID(_id)) return null;
    if (!isValidUUID(_currentUserId)) return null;

    let user = null, questions = [], friends = [], blockeds = [];

    let call1 = supabase
        .from('appuser')
        .select('id, name, disabled, disabledreason, countryid, languageid')
        .eq('id', _id)
        .then(result => {
          if (result.data.length == 0) return;
          let usr = result.data[0];
          user = new User(usr.id, usr.name, [], [], [], false, usr.languageid, usr.countryid);
        });

    let call2 = supabase
      .rpc('get_answered_questions', {
        param_current_user_id: _currentUserId,
        param_user_id: _id
      }).then(result => {
        questions = mapQuestions(result.data, _currentUserId, _id);
      });

    let call3 = sleep();
    
    if (_currentUserId == _id){
      // if is it the current user, get also friends and blocked users
      call3 = supabase
        .rpc('get_user_friends', {
          input_user_id: _id
        }).then(result => {
          friends = result.data.filter(u => u.disabled == false).map(friend => friend.friend_user_id)
          blockeds = result.data.filter(u => u.disabled == true).map(blocked => blocked.friend_user_id)
        });
    }
    
    await Promise.allSettled([ call1, call2, call3 ]);
    if (user){
      user.questions = questions;
      user.friendsId = friends;
      user.blockedsId = blockeds;
    }

    return user;
  }

  /* Uso en Survey */
  static async getQuestionsFromOtherUser(fromUserId, toUserId, count) {
    let { data: rawQuestions, error } = await supabase
      .rpc('get_unanswered_questions', {
        from_user: fromUserId,
        to_user: toUserId,
        total_questions: count
      });
  
    if (error) {
      console.error("User.js:getQuestionsFromOtherUser -- Error fetching questions:", error);
      return [];
    }
  
    return mapQuestions(rawQuestions, fromUserId, toUserId)
  }
  
  async addFriend(userid){
    let ids = [this.id, userid].sort();
    /* Uso en Profile */
    await supabase
      .from('appuserfriend')
      .upsert({ 
        fromuserid: ids[0],
        touserid: ids[1]
      })
    this.friendsId.push(userid);
  }

  async blockUser(userid){
    let ids = [this.id, userid].sort();
    /* Uso en Profile */
    await supabase
    .from('appuserfriend')
    .upsert({ 
      fromuserid: ids[0],
      touserid: ids[1],
      disabled: true
    })
    this.blockedsId.push(userid);
  }

  async unblockUser(userid){
    let ids = [this.id, userid].sort();
    /* Uso en Profile */
    await supabase
    .from('appuserfriend')
    .upsert({ 
      fromuserid: ids[0],
      touserid: ids[1],
      disabled: false
    })
    this.blockedsId = this.blockedsId.filter((u) => u != userid);
  }
}

function mapQuestions(rawQuestions, fromm, too){
  // Create a map to group options by question ID
  const questionMap = new Map();
    
  rawQuestions.forEach(rawQuestion => {
    // Create a QuestionOption object
    let option = new QuestionOption(rawQuestion.option_id, rawQuestion.option_value);

    // Check if the question already exists in the map
    if (!questionMap.has(rawQuestion.question_id)) {
      // If not, create a new Question object
      let question = new Question(
        rawQuestion.question_id, // Use rawQuestion.question_id for the question ID
        rawQuestion.from_user_id ?? fromm,
        rawQuestion.to_user_id ?? too,
        rawQuestion.question,
        [], // Initialize with an empty options array
        rawQuestion.selected_option,
        rawQuestion.valid_option,
        false
      );
      questionMap.set(rawQuestion.question_id, question);
    }

    // Add the option to the corresponding question's options array
    questionMap.get(rawQuestion.question_id).options.push(option);
  });

  // Convert the map values to an array
  return Array.from(questionMap.values());
}