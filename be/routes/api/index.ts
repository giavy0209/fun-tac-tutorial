import {Router} from 'express'
import fs from 'fs'
import path from 'path'
const router = Router()
const prefix = path.basename(__dirname)
const files = fs.readdirSync(__dirname)

files.filter(file => file !== 'index.ts')
.forEach(file => {
    const _router = require(path.join(__dirname , file)).default
    router.use(`/${prefix}`,_router)
})




export default router