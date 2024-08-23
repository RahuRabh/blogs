import React, { createContext, useState, useContext, useEffect } from 'react';
import { getAllBlogs } from "../apis/blog"; // API call only

const BlogContext = createContext();

export const useBlog = () => useContext(BlogContext);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const data = await getAllBlogs();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const refetchBlogs = async () => {
    await fetchAllBlogs();
  };

  const getAllBlogData = () => blogs.flatMap(entry => entry.blogs);
  const getBlogById = (blogId) => blogs.flatMap(entry => entry.blogs).find(blog => blog._id === blogId);
  const getBlogsByUserId = (userId) => blogs
    .filter(entry => entry.userId === userId)
    .flatMap(entry => entry.blogs.map(blog => ({
      ...blog,
      parentId: entry._id // Include the parent ID here
    })));  

  return (
    <BlogContext.Provider
      value={{
        blogs,
        loading,
        getAllBlogData,
        getBlogById,
        getBlogsByUserId,
        refetchBlogs
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};
