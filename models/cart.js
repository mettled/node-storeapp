import path from 'path';
import { promises as fs } from 'fs';

const cartFile = path.join(path.resolve(), 'data', 'cart.json');

export default class Cart {
  static async add(id, course) {
    try {
      let { courses, count, price } = await Cart.getCart();
      if (courses[id]) {
        count[id] += 1;
      } else {
        courses[id] = course;
        count[id] = 1;
      }
      price += +course.price;

      return await fs.writeFile(
        cartFile,
        JSON.stringify({
          courses, price, count,
        })
      );
    } catch (error) {
      console.log(error);
    }
  }


  static async getCart() {
    return JSON.parse(
      await fs.readFile(cartFile, 'utf8') || '{"courses": {}, "count": {}, "price": 0}'
    );
  }  
}