"use client";

import useAxios from "@/hooks/useAxios";
import { Blog } from "@/types/blog";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import AsyncSelect from "react-select/async";

interface BlogOption {
  label: string;
  value: string;
}

export const AutoComplete = () => {
  const router = useRouter();

  const { axiosInstance } = useAxios();

  const getBlogsOptions = async (inputText: string) => {
    const { data } = await axiosInstance.get("/blogs", {
      params: { search: inputText, take: 20 },
    });

    return data?.data.map((blog: Blog) => ({
      label: blog.title,
      value: blog.id,
    }));
  };

  const loadOptions = debounce(
    (inputText: string, callback: (option: BlogOption[]) => void) => {
      getBlogsOptions(inputText).then((option) => callback(option));
    },
    500,
  );

  return (
    <AsyncSelect
      placeholder="Search blog"
      className="mx-auto max-w-[600px]"
      loadOptions={loadOptions}
      onChange={(event) => router.push(`/blogs/${event?.value}`)}
    />
  );
};
