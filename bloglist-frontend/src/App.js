import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogDetails from './components/BlogDetails'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const blogFormRef = useRef()

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs.sort(compareLikes)
      setBlogs( blogs )
    })  
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

  const handleDelete = (blogObject) => () => {
    if (window.confirm(`Remove blog ${blogObject.title} ${blogObject.author}`)) {
      blogService
        .deleteBlog(blogObject)
        .then(deletedBlog => {
          setBlogs(blogs.filter(blog => {
            return blog._id !== deletedBlog._id
          }))
          const newMessage = { type: 'success', message: 'blog deleted' }
          setMessage(newMessage)
          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
    }
  }

  const handleLike = (blogObject) => () => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        const updatedBlog = blogs.find(blog => blog._id === returnedBlog._id)
        updatedBlog.likes += 1
        blogs.sort(compareLikes)
        const newMessage = { type: 'success', message: 'blog likes updated' }
        setMessage(newMessage)
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
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

  const newBlogForm = () => {
    console.log('user: ', user);
    return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )}

  const blogDetailsForm = (blog) => (
    <Togglable buttonLabel='show details'>
      <BlogDetails>
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={handleLike(blog)}>like</button></p>
        <p>{blog.user.name}</p>
      </BlogDetails>
    </Togglable>
  )

  const blogForm = () => (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
      {newBlogForm()} 
      {blogs.map(blog =>
        <Blog key={blog._id}>
          <p>{blog.title} {blog.author}</p>
          {blogDetailsForm(blog)}
          { user.username === blog.user.username ?
            <button className='remove' onClick={handleDelete(blog)}>remove</button> :
            <></>
          }
        </Blog>
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