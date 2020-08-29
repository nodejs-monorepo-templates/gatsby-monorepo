import HelloWorld from 'hello-world'

it('matches snapshot', () => {
  expect(HelloWorld({ message: 'hello' })).toMatchSnapshot()
})
