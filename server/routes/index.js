import authRouter from './authRouter.js'
import userRouter from './userRouter.js'
import categoryRouter from './categoryRouter.js'
import blogRouter from './blogRouter.js'
import commentRouter from './commentRouter.js'

const routes = [
    authRouter,
    userRouter,
    categoryRouter,
    blogRouter,
    commentRouter
]

export default routes