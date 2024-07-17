"use server";

import { createWriteStream } from "fs";
import { addCourse, editCourse, getCourseById, ICourse, InputCourse } from "../api";
import { redirect } from "next/navigation";

export const handleAdd = async (data: FormData) => {
  let photo = data.get("cover") as File;
  const filename = Date.now() + "." + photo.type.split("/").at(-1);
  const stream = createWriteStream("public/images/" + filename);
  const bufferedImage = await photo.arrayBuffer();
  stream.write(Buffer.from(bufferedImage));

  let course: InputCourse = {
    name: data.get("name") as string,
    cover: "images/" + filename,
    price: +(data.get("price") as string),
    duration: +(data.get("duration") as string),
  };
  addCourse(course);
  redirect("/courses");
};

export const handleEdit = async (data: FormData) => {
  let filename: string | null = null;
  let photo = data.get("cover") as File;
  if (photo && photo.size > 0) {
    filename = Date.now() + "." + photo.type.split("/").at(-1);
    const stream = createWriteStream("public/images/" + filename);
    const bufferedImage = await photo.arrayBuffer();
    stream.write(Buffer.from(bufferedImage));
  }
  let existingCourse: ICourse = await getCourseById(data.get("id") as unknown as number);
  let course: ICourse = {
    id: data.get("id") as unknown as number,
    name: data.get("name") as string,
    cover: filename ? "images/" + filename : existingCourse.cover,
    price: +(data.get("price") as string),
    duration: +(data.get("duration") as string),
  };
  editCourse(course);
  redirect("/courses");
};


