import React from 'react'

export interface Props {
  readonly message: string
}

const wrapperStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  height: '100%',
  padding: '0px',
  margin: '0px',
}

const headingStyle: React.CSSProperties = {
  textAlign: 'center',
  verticalAlign: 'middle',
  fontFamily: 'sans-serif',
  display: 'block',
  width: '100%',
  height: '100%',
}

export default function HelloWorld(props: Props) {
  return <main style={wrapperStyle}>
    <h1 style={headingStyle}>{props.message}</h1>
  </main>
}
