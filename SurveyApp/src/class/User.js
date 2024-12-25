import DbObject from "./DbObject";
import Pagination from "./Pagination";
import supabase from "../db/supabase"
import { getQuestions, sleep, isValidUUID } from "../db/mocks-utils";
import Question from "./Question";

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
        questions = result.data.map(question => {
          console.log('question:', question);
          debugger;
        })
      });

    let call3 = supabase
      .rpc('get_user_friends', {
        input_user_id: _id
      }).then(result => {
        friends = result.data.filter(u => u.disabled == false).map(friend => friend.id)
        blockeds = result.data.filter(u => u.disabled == true).map(blocked => blocked.id)
      });
    
    await Promise.allSettled([ call1, call2, call3 ]);
    if (user){
      user.questions = questions;
      user.friendsId = friends;
      user.blockedsId = blockeds;
    }

    return user;
  }

  static async getQuestionsFromOtherUser(fromUserId, toUserId, count) {
    /* Uso en Survey */
    console.warn(`TO-DO: User.js:getQuestionsForOtherUser fromUser[${fromUserId}] toUser[${toUserId}] count[${count}]`)
    await sleep();
    // toUserId = this.id
    return getQuestions(fromUserId, toUserId);
  }
  
  async getQuestionsForThisUser() {
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:getQuestionsForThisUser user[${this.id}]`)
    await sleep();
    // fromUserId = this.id
    // toUserId = this.id
    return getQuestions(this.id, this.id);
  }

  async addFriend(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:addFriend user[${userId}]`)
    await sleep();
    this.friendsId.push(userId);
  }

  async blockUser(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:block user[${userId}]`)
    await sleep();
    this.blockedsId.push(userId);
  }

  async unblockUser(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:unblock user[${userId}]`)
    await sleep();
    this.blockedsId = this.blockedsId.filter((u) => u != userId);
  }
}