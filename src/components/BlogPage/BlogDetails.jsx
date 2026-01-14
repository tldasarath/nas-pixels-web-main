'use client';
import { ModernButton } from "../common/Button/ModernButton";
import { useRouter } from "next/navigation";


const BlogDetails = ({ blog }) => {
    const router = useRouter();
  
  return (
    <article className="min-h-screen py-10 md:py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* LEFT – Image */}
        <div className="rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,255,120,0.3)]">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-[500px] object-cover"
          />
        </div>

        {/* RIGHT – Content */}
        <div className="space-y-6">

          <h2 className="text-3xl md:text-5xl font-bold">
            {blog.title}
          </h2>

          {/* BLOG CONTENT FROM REACT QUILL */}
          <div
            className="prose prose-lg max-w-none
                       prose-p:leading-relaxed
                       prose-ul:list-disc prose-ul:pl-6
                       prose-ol:list-decimal prose-ol:pl-6
                       prose-a:text-green-500 hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />

          {/* <Link
            href="/blogs"
            className="inline-block mt-10 hover:underline"
          >
            ← Back to Blog
          </Link> */}
          <ModernButton text="Back to Blog" onClick={() => router.push("/blogs")} />

        </div>
      </div>
    </article>
  );
};

export default BlogDetails;
