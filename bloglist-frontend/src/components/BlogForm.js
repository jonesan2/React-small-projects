import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState('')

  const handleBlogTitleChange = (event) => {
    setNewBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setNewBlogAuthor(event.target.value)
  }

  const handleBlogURLChange = (event) => {
    setNewBlogURL(event.target.value)
  }

  const handleBlogLikesChange = (event) => {
    setNewBlogLikes(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
      likes: newBlogLikes
    })

    setNewBlogTitle('')
    setNewBlogAuthor('')
    setNewBlogURL('')
    setNewBlogLikes('')
  }

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        <label>Blog Title</label>
        <input
          value={newBlogTitle}
          onChange={handleBlogTitleChange}
        />
      </div>
      <div>
        <label>Blog Author</label>
        <input
          value={newBlogAuthor}
          onChange={handleBlogAuthorChange}
        />
      </div>
      <div>
        <label>Blog URL</label>
        <input
          value={newBlogURL}
          onChange={handleBlogURLChange}
        />
      </div>
      <div>
        <label>Blog Likes</label>
        <input
          value={newBlogLikes}
          onChange={handleBlogLikesChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm