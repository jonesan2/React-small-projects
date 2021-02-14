import React, { useState, useEffect, useImperativeHandle } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'

const Blogs = React.forwardRef((props, ref) => {
  const [blogs, setBlogs] = useState([])

  const compareLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareLikes)
      setBlogs( blogs )
    })
  }, [])

  const addToBlogList = (returnedBlog) => {
    setBlogs(blogs.concat(returnedBlog))
  }

  useImperativeHandle(ref, () => {
    return {
      addToBlogList
    }
  })

  const handleLike = (blogObject) => () => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        const newBlogs = [...blogs]
        const updatedBlog = newBlogs.find(blog => blog._id === returnedBlog._id)
        updatedBlog.likes += 1
        newBlogs.sort(compareLikes)
        setBlogs(newBlogs)
      })
  }

  const handleDelete = (blogObject) => () => {
    if (window.confirm(`Remove blog ${blogObject.title} ${blogObject.author}`)) {
      blogService
        .deleteBlog(blogObject)
        .then(deletedBlog => {
          setBlogs(blogs.filter(blog => {
            return blog._id !== deletedBlog._id
          }))
        })
    }
  }

  const blogDetailsForm = (blog) => (
    <Togglable buttonLabel='show details'>
      <BlogDetails>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
      </BlogDetails>
    </Togglable>
  )

  return (
    <>
      { blogs.map(blog =>
        <Blog key={blog._id}>
          <p className="titleauthor">{blog.title} {blog.author}</p>
          {blogDetailsForm(blog)}
          { props.username === blog.user.username ?
            <button className='remove' onClick={handleDelete(blog)}>remove</button> :
            <></>
          }
        </Blog>
      )}
    </>
  )
})

Blogs.displayName = 'Blogs'

export default Blogs