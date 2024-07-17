import Image from "next/image";
import { getCourseById, ICourse } from "@/app/lib/api";
import { Course } from "../../course";

interface IProps {
  params: { id: number };
}

export default async function Page(props: IProps) {
  const course: ICourse = await getCourseById(props.params.id);

  return (
    <>
      <p className="is-size-2">Hello! Course No. {props.params.id}</p>
      {
        <Course key={course.id} course={course}/>
      }
    </>
  );
}
