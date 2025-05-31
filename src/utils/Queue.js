class Queue {
    constructor() {
      this.items = [];
    }
  
    enqueue(element) {
      this.items.push(element); // Add to end
    }
  
    dequeue() {
      if (this.isEmpty()) return null;
      return this.items.shift(); // Remove from front
    }
  
    front() {
      return this.items[0];
    }
  
    isEmpty() {
      return this.items.length === 0;
    }
  
    size() {
      return this.items.length;
    }
  
    getItems() {
      return [...this.items]; // Return a copy
    }
  }
  
  module.exports = Queue;
  