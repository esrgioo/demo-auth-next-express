"use client";

import FormInput from "@/components/FormInput";
import FormTextarea from "@/components/FormTextarea";
import RichTextEditor from "@/components/RichTextEditor";
import useCreateblog from "@/hooks/api/blog/useCreateblog";
import { useFormik } from "formik";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { CreateBlogSchema } from "./schemas/CreateBlogSchema";

const WritePage = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      category: "",
      description: "",
      content: "",
      thumbnail: null,
    },
    validationSchema: CreateBlogSchema,
    onSubmit: async (values) => {
      await createBlog(values);
    },
  });

  const [selectedImage, setSelectedImage] = useState<string>("");
  const thumbnailRef = useRef<HTMLInputElement>(null);

  const onChangeThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length) {
      formik.setFieldValue("thumbnail", files[0]);
      setSelectedImage(URL.createObjectURL(files[0]));
    }
  };

  const removeSelectedImage = () => {
    formik.setFieldValue("thumbnail", null);
    setSelectedImage("");
    if (thumbnailRef.current) {
      thumbnailRef.current.value = "";
    }
  };

  const { mutateAsync: createBlog, isPending } = useCreateblog();

  return (
    <main className="container mx-auto px-4">
      <div className="mx-auto max-w-5xl">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <FormInput
            name="title"
            label="Title"
            type="text"
            placeholder="Blog Title"
            value={formik.values.title}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.title && !!formik.errors.title}
            error={formik.errors.title}
          />
          <FormInput
            name="category"
            label="Category"
            type="text"
            placeholder="Blog Category"
            value={formik.values.category}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={!!formik.touched.category && !!formik.errors.category}
            error={formik.errors.category}
          />
          <FormTextarea
            name="description"
            label="Description"
            placeholder="Blog Description"
            value={formik.values.description}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            isError={
              !!formik.touched.description && !!formik.errors.description
            }
            error={formik.errors.description}
          />
          <RichTextEditor
            label="Content"
            onChange={(html: string) => formik.setFieldValue("content", html)}
            isError={Boolean(formik.errors.content)}
            value={formik.values.content}
          />
          {selectedImage ? (
            <>
              <div className="relative h-[150px] w-[200px]">
                <Image src={selectedImage} alt="Blog thumbnail" fill />
              </div>
              <button onClick={removeSelectedImage}>remove</button>
            </>
          ) : null}

          <div className="flex flex-col space-y-1.5">
            <label>Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              ref={thumbnailRef}
              onChange={onChangeThumbnail}
            />
          </div>

          <div className="flex justify-end">
            <button
              className="my-7 rounded-md bg-slate-300 p-4"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Loading..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default WritePage;
