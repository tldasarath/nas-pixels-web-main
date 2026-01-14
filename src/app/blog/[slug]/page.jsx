import { fetchBlogBySlug } from "@/api/api";
import BlogDetails from "@/components/BlogPage/BlogDetails";
import Herosection from "@/components/TitleBanner/TitleBanner";
import { blogs as dummyBlogs } from "@/data/blogs";

export default async function BlogDetailPage({ params }) {
  const { slug } = await params; // ✅ required in Next 15

  let blog = null;

  const apiResponse = await fetchBlogBySlug(slug);

  if (apiResponse?.success && apiResponse?.data) {
    blog = apiResponse.data;
  }

  if (!blog) {
    blog = dummyBlogs.find((b) => b.slug === slug);
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Blog not found
      </div>
    );
  }

  return (
    <>
      <Herosection title={blog.metaTitle || blog.title} />
      <BlogDetails blog={blog} />
    </>
  );
}
