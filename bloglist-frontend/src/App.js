import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogTitle, setNewBlogTitle] = useState('')
  const [newBlogAuthor, setNewBlogAuthor] = useState('')
  const [newBlogURL, setNewBlogURL] = useState('')
  const [newBlogLikes, setNewBlogLikes] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      const error = { type: 'error', message: 'wrong credentials' }
      console.log(exception)
      setUsername('')
      setPassword('')
      setMessage(error)
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.removeItem('loggedBloglistappUser')
    blogService.setToken('')
    setUser(null)
    setUsername('')
    setPassword('')
  }

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
    const blogObject = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
      likes: newBlogLikes
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlogTitle('')
        setNewBlogAuthor('')
        setNewBlogURL('')
        setNewBlogLikes('')
        const newMessage = { type: 'success', message: 'new blog added successfully' }
        setMessage(newMessage)
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
      .catch((exception) => {
        const error = { type: 'error', message: `${exception}` }
        setMessage(error)
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification message={message} />
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
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
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      { user === null ?
        loginForm() :
        blogForm()
      }
    </div>
  )
}

export default App