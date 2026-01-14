import axiosPublic from "@/lib/axiosPublic";


/**
 * Normalize API errors
 */
const handleApiError = (error, fallbackMessage) => {
  const status = error?.response?.status;
  const message =
    error?.response?.data?.message ||
    error?.message ||
    fallbackMessage;

  return {
    success: false,
    status,
    message,
  };
};

/**
 * Fetch all projects (public)
 */
export const fetchProjects = async () => {
  try {
    const response = await axiosPublic.get("/projects");

    return {
      success: true,
      data: response.data?.data ?? [],
    };
  } catch (error) {
    console.error("fetchProjects error:", error);

    return handleApiError(
      error,
      "Unable to load projects at the moment"
    );
  }
};

/**
 * Fetch single project by ID (public)
 */
export const fetchProjectById = async (id) => {
  if (!id) {
    return {
      success: false,
      message: "Project ID is required",
    };
  }

  try {
    const response = await axiosPublic.get(`/projects/${id}`);

    return {
      success: true,
      data: response.data?.data ?? null,
    };
  } catch (error) {
    console.error("fetchProjectById error:", error);

    return handleApiError(
      error,
      "Unable to load project details"
    );
  }
};

/**
 * Fetch all blogs (public)
 * GET /get-blogs
 */
export const fetchBlogs = async () => {
  try {
    const response = await axiosPublic.get("/blogs/get-blogs");

    return {
      success: true,
      data: response.data?.data ?? [],
    };
  } catch (error) {
    console.error("fetchBlogs error:", error);

    return handleApiError(
      error,
      "Unable to load blogs at the moment"
    );
  }
};

/**
 * Fetch single blog by URL slug
 * GET /get-blog/:slug
 * @param {string} slug - The URL value from blog.url field
 */
export const fetchBlogBySlug = async (slug) => {
  if (!slug) {
    console.warn("⚠️ fetchBlogBySlug: No slug provided");
    return { success: false, data: null };
  }

  try {
    console.log("🔍 Fetching blog with URL:", slug);
    
    const response = await axiosPublic.get(
      `/blogs/get-blog/${slug}` // slug matches the 'url' field
    );

    console.log("✅ Blog API response:", response.data);

    return {
      success: true,
      data: response.data?.data ?? null,
    };
  } catch (error) {
    console.error("❌ fetchBlogBySlug error:", error.response?.data || error.message);
    return { 
      success: false, 
      data: null,
      error: error.message 
    };
  }
};