import { title, message } from '@scope-name/scoped-hello-world'
import HelloWorld from 'hello-world'
import React from 'react'
import { Helmet } from 'react-helmet'

const Home = () =>
  <>
    <Helmet>
      <meta charSet='UTF-8' />
      <title>{title}</title>
    </Helmet>
    <HelloWorld message={message} />
  </>

export default Home
