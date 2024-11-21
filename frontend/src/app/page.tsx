import { BlogHeader } from "@/components/blog/blog-header";
import { BlogPosts } from "@/components/blog/blog-posts";

export default function Home() {
  return (
    <>
      <div className="max-w-3xl mx-auto px-4">
        <BlogHeader/>
        <BlogPosts/>
      </div>
    </>
  );
}
