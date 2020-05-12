import React, { useReducer } from "react";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "edit_blogpost":
      return state.map((blogPost) => {
        if (blogPost.id === action.payload.id) {
          return action.payload;
        } else return blogPost;
      });
    case "delete_blogpost":
      return state.filter((BlogPost) => BlogPost.id !== action.payload);
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: action.payload.title,
          content: action.payload.content,
        },
      ];
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return (title, content, callback) => {
    // console.log(title);
    // console.log(content);
    dispatch({ type: "add_blogpost", payload: { title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    // console.log(id);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

const editBlogPost = (dispatch) => {
  return (id, title, content, callback) => {
    dispatch({ type: "edit_blogpost", payload: { id, title, content } });
    if (callback) {
      callback();
    }
  };
};
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: "TEST TITLE", content: "TEST CONTENT", id: 1 }]
);

// import React, {useState} from 'react';

// const BlogContext = React.createContext();

// export const BlogProvider = ({children}) => {
//     const [blogPosts, setBlogPosts]= useState([]);

//     const addBlogPost=()=>{
//         setBlogPosts([...blogPosts, {title:`Blog Post #${blogPosts.length+1}`}]);
//     }

//     return <BlogContext.Provider value={{data: blogPosts, addBlogPost: addBlogPost}}>{children}</BlogContext.Provider>;
// };

// export default BlogContext;
