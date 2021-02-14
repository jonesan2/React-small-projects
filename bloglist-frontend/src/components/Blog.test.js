import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders title and author only', () => {

  const blogObject = {
    "_id": 1,
    "title": "Australian Open",
    "author": "Pete Sampras",
  }

  const blogElement = render(
    <Blog key={blog._id} className="oneBlog">
      <p className="titleauthor">{blog.title} {blog.author}</p>
      {blogDetailsForm(blog)}
      { user.username === blog.user.username ?
        <button className='remove' onClick={handleDelete(blog)}>remove</button> :
        <></>
      }
    </Blog>

  const dom = render(<App />)
  console.log('dom: ', dom)

  const blogElement = dom.container.querySelector('.oneBlog')
  console.log('blogElement: ', blogElement)
})