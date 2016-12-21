import tools from './tools'
import mall from './mall'

const notFound = { path: '*', redirect: '/error/404' } // if not matched any route state, turn to 404 page

export default [
  mall,
  tools,
  notFound
];
