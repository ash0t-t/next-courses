import Image from "next/image";
import styles from "../page.module.css";
import { getAllCourses } from "../lib/api";
import { Course } from "./course";

export default function Home() {
  const result = getAllCourses();
  return <main className={styles.main}>
    {
      result.map((course) => (
        <Course key={course.id} course={course} />
      ))
    }
  </main>;
}
