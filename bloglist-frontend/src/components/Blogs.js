import React, { useState, useEffect, useImperativeHandle } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = React.forwardRef((props, ref) => {
  const [blogs, setBlogs] = useState([])

  const compareLikes = (a, b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareLikes)
      setBlogs( blogs )
    })
  }, [])

  const updateLikes = (returnedBlog) => {
    const newBlogs = [...blogs]
    const updatedBlog = newBlogs.find(blog => blog._id === returnedBlog._id)
    updatedBlog.likes += 1
    newBlogs.sort(compareLikes)
    setBlogs(newBlogs)
  }

  const deleteBlog = (deletedBlog) => {
    setBlogs(blogs.filter(blog => {
      return blog._id !== deletedBlog._id
    }))
  }

  const addToBlogList = (returnedBlog) => {
    setBlogs(blogs.concat(returnedBlog).sort(compareLikes))
  }

  useImperativeHandle(ref, () => {
    return {
      addToBlogList
    }
  })

  return (
    <>
      { blogs.map(blog =>
        <Blog
          key={blog._id}
          blog={blog}
          username={props.username}
          updateLikes={updateLikes}
          deleteBlog={deleteBlog}
        />
      )}
    </>
  )
})

Blogs.displayName = 'Blogs'

export default Blogs