import { handleEdit } from "@/app/lib/actions/course-actions";
import { getCourseById } from "@/app/lib/api";
import { ImagePicker } from "@/app/lib/components/image-picker";
import Image from "next/image";

interface IProps {
  params: { id: number };
}

export default async function Page(props: IProps) {
  const course = await getCourseById(props.params.id);

  return (
    <>
      <h1 className="is-size-4">Edit Course</h1>
      <div className="columns">
        <div className="column is-two-fifths">
          <form className="box my-5" action={handleEdit}>
            <input type="hidden" name="id" value={props.params.id} />
            <div className="field my-4">
              <input
                type="text"
                name="name"
                defaultValue={course.name}
                placeholder="Enter a name"
                className="input is-dark"
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                name="price"
                defaultValue={course.price}
                placeholder="Enter a price"
                className="input is-dark"
              />
            </div>
            <div className="field my-4">
              <input
                type="text"
                name="duration"
                defaultValue={course.duration}
                placeholder="Enter a duration"
                className="input is-dark"
              />
            </div>
            <div className="field my-4">
              <ImagePicker />
              <div>Previous cover:</div>
              <Image
                src={`/${course.cover}`}
                alt="cover"
                width={150}
                height={150}
              />
            </div>
            <div className="field my-4">
              <button className="button is-danger">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
