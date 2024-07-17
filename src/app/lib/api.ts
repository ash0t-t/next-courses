import Database from "better-sqlite3";

const db = new Database("courses.db");

export interface ICourse {
  id: number;
  price: number;
  duration: number;
  name: string;
  cover: string;
}

export type InputCourse = Omit<ICourse, "id">;

export const getAllCourses = (): ICourse[] => {
  return db.prepare("SELECT * FROM courses").all() as ICourse[];
};

export const addCourse = (course: InputCourse) => {
  db.prepare(`
    INSERT INTO courses(name, price, duration, cover)
    VALUES(@name, @price, @duration, @cover)
  `).run(course);
};

export const getCourseById = (id: number):ICourse => {
  return db.prepare("SELECT * FROM courses where id = ?").get(id) as unknown as ICourse;
};

export const editCourse = (course: ICourse) => {
  db.prepare(`
    UPDATE courses
    set cover = ?, name = ?, price = ?, duration = ?
    WHERE id = ?
  `).run(course.cover, course.name, course.price, course.duration, course.id);
};

