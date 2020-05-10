import React, { useReducer } from "react";
import createDataContext from "./createDataContext";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "delete_blogpost":
      return state.filter((BlogPost) => BlogPost.id !== action.payload);
    case "add_blogpost":
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: `Blog Post #${state.length + 1}`,
        },
      ];
    default:
      return state;
  }
};
const addBlogPost = (dispatch) => {
  return () => {
    dispatch({ type: "add_blogpost" });
  };
};

const deleteBlogPost = (dispatch) => {
  return (id) => {
    console.log(id);
    dispatch({ type: "delete_blogpost", payload: id });
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost },
  []
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
