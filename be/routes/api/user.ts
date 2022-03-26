import {Router} from 'express'
import {user as controller} from 'controllers'
import { auth } from 'middleware'
const router = Router()

router.route('/user')
.get(auth,controller.get)
.post(controller.post)
.patch(auth,controller.patch)

router.route('/user/auth')
.post(controller.auth)
export default router