import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { promises as fs } from 'fs';

const courseFile = path.join(path.resolve(), 'data', 'courses.json');

export default class Course {
  constructor(name, price, img) {
    this.name = name;
    this.price = price;
    this.img = img;
  }

  async save(course) {
    try {
      const courses = await Course.getAll();
      const id = uuidv4();
      return await fs.writeFile(
        courseFile,
        JSON.stringify({ ...courses, [id]: course})
      );
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll() {
    return JSON.parse(
      await fs.readFile(courseFile, 'utf8') || "{}"
    );
  }

  static async getCourseById(id) {
    const courses = await Course.getAll();
    console.log(courses, id)
    return courses[id];
  }

  static async update({ name, price, img, id }) {
    try {
      const courses = await Course.getAll();
      courses[id] = { name, price, img };
      await fs.writeFile(
        courseFile,
        JSON.stringify(courses)
      );
    } catch (error) {
      console.log(error);
    }
  }
}