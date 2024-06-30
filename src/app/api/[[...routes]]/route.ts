import { Button, Frog } from 'frog'
import { handle } from 'frog/next'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
 
const app = new Frog({
  title: 'Chainstore',
  basePath: '/api'
})
 
devtools(app, { serveStatic })
 
export const GET = handle(app)
export const POST = handle(app)