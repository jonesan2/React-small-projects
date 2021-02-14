import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const config = {
    headers: { Authorization: token }
  }

  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config) 
  return response.data
}

const update = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }
  }

  const blogObject = {
    likes: Number(updatedBlog.likes) + 1,
    author: updatedBlog.author,
    title: updatedBlog.title,
    url: updatedBlog.url
  }

  const requestUrl = `${baseUrl}/${updatedBlog._id}`

  const response = await axios.put(requestUrl, blogObject, config)
  return response.data
}

const deleteBlog = async (blogObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const requestUrl = `${baseUrl}/${blogObject._id}`
  const response = await axios.delete(requestUrl, config)
  if (response.status === 204) {
    return blogObject
  } else {
    return null
  }
}


const blogs = { getAll, create, update, deleteBlog, setToken }
export default blogs