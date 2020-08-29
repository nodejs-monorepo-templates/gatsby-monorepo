import React from 'react'
import { Helmet } from 'react-helmet'
import HelloWorld from 'hello-world'
import { message } from '@scope-name/scoped-hello-world'

const Home = () => <>
  <Helmet>
    <meta charSet='UTF-8' />
    <title>Hello, World!!</title>
  </Helmet>
  <HelloWorld message={message} />
</>

export default Home
