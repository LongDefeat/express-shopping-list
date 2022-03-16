const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    // tracks each item by connecting to items array in fakeDb
    items.push(this);
  }
  static findAll() {
    return items;
  }

  // updates a found item with a matching name to data
  static update(name, data) {
    let foundItem = Item.find(name);

    if (foundItem === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  //   Find and return an item with a matching name

  static find(name) {
    const foundItem = items.find((v) => v.name === name);

    if (foundItem === undefined) {
      throw { message: "Not Found", status: 404 };
    }

    return foundItem;
  }

  //   Remove an item with a matching id
  static remove(name) {
    let foundIdx = items.findIndex((v) => v.name === name);

    if (foundIdx === -1) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(foundIdex, 1);
  }
}

module.exports = Item;
