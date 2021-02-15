import React from 'react'
import blogService from '../services/blogs'

const BlogDetails = ({ blog, updateLikes }) => {
  const handleLike = (blogObject, updateLikes) => () => {
    blogService
      .update(blogObject)
      .then(updateLikes)
  }

  return (
    <div>
      <p className="urlClass">{blog.url}</p>
      <p>likes {blog.likes} <button onClick={handleLike(blog, updateLikes)}>like</button></p>
      <p>{blog.user.name}</p>
    </div>
  )
}

export default BlogDetails