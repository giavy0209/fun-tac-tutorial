import {Router} from 'express'
import path from 'path'
import fs from 'fs'
const router = Router()

const files = fs.readdirSync(__dirname)
console.log(files);

files.filter(file => file !== 'index.ts')
.forEach(file => {
    const _router = require(path.join(__dirname , file)).default
    router.use(`/`,_router)
})

export default router