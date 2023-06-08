import express from 'express'

import commentCtrl from '../controllers/commentCtrl.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/comment', auth, commentCtrl.createComment)

router.get('/comments/blog/:id', commentCtrl.getComments)

router.post('/reply_comment', auth, commentCtrl.replyComment)

router.patch('/comment/:id', auth, commentCtrl.updateComment)

router.delete('/comment/:id', auth, commentCtrl.deleteComment)

export default router;