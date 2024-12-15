export default class DbObject {
  constructor(id) {
    this.id = id;
    this.db = {
      loading: false,
      saving: false,
      error: null
    }
  }
}