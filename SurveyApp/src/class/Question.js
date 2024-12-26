import DbObject from "./DbObject";
import supabase from "../db/supabase"

export default class Question extends DbObject{
  constructor(id, fromUserId, toUserId, question, options, selectedOption, validOption, readOnly) {
    super(id);
    this.fromUserId = fromUserId; // User.id
    this.toUserId = toUserId; // User.id
    this.question = question ?? '<<Default Question>>'; // String
    this.options = options; // Array of QuestionOption.js
    this.selectedOption = selectedOption; // QuestionOption.js:id
    this.validOption = validOption; // QuestionOption.js:id
    this.readOnly = readOnly;
  }

  async saveAnswer(fromUserId, toUserId, optionId){
    if (this.readOnly) return;
    if (fromUserId != toUserId && this.selectedOption != null) return; // Si está respondiendo para otra persona, no puede cambiar su respuesta
    if (this.selectedOption == optionId) return; // No reemplazar por el mismo valor

    let success = true;
    try {
      this.db.saving = true;
      this.selectedOption = optionId;
      if (fromUserId == toUserId){
        this.validOption = optionId;
      }
      if (fromUserId != toUserId){
        this.readOnly = true;
      }

      await supabase
        .from('appuseranswer')
        .upsert({ 
          questionid: this.id,
          questionoptionid: optionId,
          fromuserid: fromUserId,
          touserid: toUserId
        }, { 
          onConflict: 'fromuserid,touserid,questionid'
        },
          false // merge duplicates
        ).select();

    } catch (error) {
      success = false;
      console.error('Question.js -- Error saving questionAnswer: ', error);
    } finally {
      this.db.saving = false;
    }
    return success;
  }
}