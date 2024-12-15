import DbObject from "./DbObject";
import Pagination from "./Pagination";
import { getQuestions, sleep, newUser } from "../db/mocks-utils";

export default class User extends DbObject {
  constructor(id, name, questions, friendsId, blockedsId) {
    super(id);
    this.name = name ?? '<<Default Name>>'; // String
    this.questions = questions ?? []; // Array
    this.questionsPagination = new Pagination(1, 1, questions.length);
    this.friendsId = friendsId ?? []; // Array
    this.blockedsId = blockedsId; // Array
  }

  get initials() {
    // Split the name into an array of words
    const words = this.name.trim().split(/\s+/);
    // Get the first two initials
    const initials = words.slice(0, 2).map(word => word.charAt(0).toUpperCase()).join('');

    return initials;
  }

  static async getFromDatabase(id) {
    console.warn(`TO-DO: User.js:getFromDatabase user[${id}]`)
    await sleep(2000);
    return newUser(id, 'Mock User');
  }

  static async getQuestionsFromOtherUser(fromUserId, toUserId, count) {
    /* Uso en Survey */
    console.warn(`TO-DO: User.js:getQuestionsForOtherUser fromUser[${fromUserId}] toUser[${toUserId}] count[${count}]`)
    await sleep(2000);
    // toUserId = this.id
    return getQuestions(fromUserId, toUserId);
  }
  
  async getQuestionsForThisUser() {
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:getQuestionsForThisUser user[${this.id}]`)
    await sleep(2000);
    // fromUserId = this.id
    // toUserId = this.id
    return getQuestions(this.id, this.id);
  }

  async addFriend(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:addFriend user[${userId}]`)
    await sleep(2000);
    this.friendsId.push(userId);
  }

  async blockUser(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:block user[${userId}]`)
    await sleep(2000);
    this.blockedsId.push(userId);
  }

  async unblockUser(userId){
    /* Uso en Profile */
    console.warn(`TO-DO: User.js:unblock user[${userId}]`)
    await sleep(2000);
    this.blockedsId = this.blockedsId.filter((u) => u != userId);
  }
}