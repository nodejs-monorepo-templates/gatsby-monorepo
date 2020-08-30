import { title, message } from '@scope-name/scoped-hello-world'

it('title matches snapshot', () => {
  expect(title).toMatchSnapshot()
})

it('message matches snapshot', () => {
  expect(message).toMatchSnapshot()
})
