import React from 'react'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'
import blogService from '../services/blogs'

const handleDelete = (blogObject, deleteBlog) => () => {
  if (window.confirm(`Remove blog ${blogObject.title} ${blogObject.author}`)) {
    blogService
      .deleteBlog(blogObject)
      .then(deleteBlog)
  }
}

const blogDetailsForm = (blog, updateLikes) => (
  <Togglable buttonLabel='show details'>
    <BlogDetails
      blog={blog}
      updateLikes={updateLikes}
    />
  </Togglable>
)

const Blog = ({ blog, username, updateLikes, deleteBlog }) => {
  return (
    <div className="blog">
      <p className="titleauthor">{blog.title} {blog.author}</p>
      {blogDetailsForm(blog, updateLikes)}
      { username === blog.user.username ?
        <button className='remove' onClick={handleDelete(blog, deleteBlog)}>remove</button> :
        <></>
      }
    </div>
  )
}

export default Blog
