"use client"

import { BlogHeader } from "@/components/blog/blog-header";
import BlogPosts from "@/components/blog/blog-posts";
import { dehydrate } from "react-query";
import { Hydrate } from "react-query";
import getQueryClient from "@/utils/get-query-client";
import axios from "axios";

export default async function Home() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery("posts", async () => {
    const { data } = await axios.get("https://collective-violante-avater-dffc8fee.koyeb.app/api/posts");
    return data;
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <div className="max-w-3xl mx-auto px-4">
        <BlogHeader />
        <BlogPosts />
      </div>
    </Hydrate>
  );
}