export default class Pagination {
  // 1-based pagination
  constructor(current, size, max) {
    this.current = current ?? 1; // current page
    this.size = size ?? 1; // page size
    this.max = max; // max items
  }

  getItemsByPagination(arr) {  
    if (!arr || arr.length == 0) return [];
    this.max = arr.length;

    let start = this.current * this.size;
    let end = this.current + this.size - 1;
    if (end > this.max) end = this.max;

    let items = [];
    for (let i = start; i <= end; i++) {
      items.push(arr[i-1]);
    }
    return items;
  }

  get showBackButton() {
    return this.current > this.size;
  }

  get showNextButton() {
    return this.current < this.max;
  }

  previousPage(){    
    if (!this.showBackButton) return false;
    this.current -= this.size;
    return true;
  }
  nextPage(){    
    if (!this.showNextButton) return false;
    this.current += this.size;
    return true;
  }
}