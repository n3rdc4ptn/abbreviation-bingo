export class BingoGame<T> {
  public notPicked: T[];
  public picked: T[];

  constructor(array: T[]) {
    this.notPicked = array;
    this.picked = [];
  }

  /**
   * This method returns a random element from the array
   * @returns a random element from the array
   */
  public roll(): T {
    let index = Math.floor(Math.random() * this.notPicked.length);

    let element = this.notPicked[index];

    // add element to the picked and removes it form the notPicked
    this.picked.push(this.notPicked[index]);
    // remove element from notPicked
    this.notPicked.splice(index, 1);

    return element;
  }

  /**
   * This method reverts the last roll
   */
  public back() {
    let element = this.picked.pop();
    if (element) {
      this.notPicked.push(element);
    }
  }
}
