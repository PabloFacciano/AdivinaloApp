import DbObject from "./DbObject";

export default class QuestionOption extends DbObject {
  constructor(id, value) {
    super(id);
    this.value = value; // String
  }
}