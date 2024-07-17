"use client";
import Image from "next/image";
import Link from "next/link";
import { ICourse } from "../lib/api";

interface Props {
  course: ICourse;
}

export const Course = ({ course }: Props) => {
  return (
    <>
      <Link href={`/courses/details/${course.id}`}>
        <div key={course.id}>
          <Image
            src={`/${course.cover}`}
            alt="cover"
            width={150}
            height={150}
          />
          <p>{course.name}</p>
          <p>{course.price} AMD</p>
          <p>{course.duration} months</p>
        </div>
      </Link>
      <Link href={`/courses/edit/${course.id}`}>
        <button>Edit</button>
      </Link>
      <br></br>
    </>
  );
};
