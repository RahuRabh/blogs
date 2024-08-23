import axios from "axios";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const getAllBlogs = async () => {
  try {
    const reqUrl = `${backendUrl}/blogs/getAllBlogs`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = async (blogData) => {
  try {
    const reqUrl = `${backendUrl}/blogs/createBlog`;
    const response = await axios.post(reqUrl, blogData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Ensure errors are thrown to be handled in the component
  }
};

export const updateBlog = async (blogId, blogData) => {
  try {
    const reqUrl = `${backendUrl}/blogs/updateBlog/${blogId}`;
    const response = await axios.put(reqUrl, blogData);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Ensure errors are thrown to be handled in the component
  }
};

export const deleteBlog = async (blogId) => {
  try {
    const reqUrl = `${backendUrl}/blogs/deleteBlog/${blogId}`;
    const response = await axios.delete(reqUrl);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error; // Ensure errors are thrown to be handled in the component
  }
};
