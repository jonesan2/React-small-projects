import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

test('renders title and author only', () => {

  const blogObject = {
    _id: 1,
    title: 'Australian Open',
    author: 'Pete Sampras',
    url: 'ao.com',
    likes: 8,
    user: {
      username: 'tmiller'
    }
  }

  const username = 'tmiller'

  const updateLikes = () => {}
  const deleteBlog = () => {}

  const renderedBlog = render(
    <Blog
      blog={blogObject}
      username={username}
      updateLikes={updateLikes}
      deleteBlog={deleteBlog}
    />
  )

  const blogElement = renderedBlog.container.querySelector('.blogClass')

  expect(blogElement).toHaveTextContent(
    'Australian Open Pete Sampras'
  )

  const showElement = renderedBlog.container.querySelector('.showClass')
  // console.log('showElement: ', showElement)
  // expect(showElement).toHaveProperty('style', 'display: none')
  const hideElement = renderedBlog.container.querySelector('.hideClass')
  // expect(hideElement).toHaveProperty('style', 'display: none')
  const newElement = renderedBlog.getByText('Australian Open Pete Sampras')
  expect(newElement).toBeDefined()
  const newElement2 = renderedBlog.queryByText('ao.com')
  // expect(newElement2).toBeNull()
  //  'Pete Sampras'
  // )
  // expect(renderedBlog.container).toHaveTextContent(
  //   'Pete Sampras'
  // )
  // expect(element).toBeDefined()

  // const urlP = blogElement.container.querySelector('.urlClass')
  // expect(urlP).not.toBeDefined()
})