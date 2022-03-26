import express from 'express'

import router from './routes'

const app = express()
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use('/', router)
// app.use((req, res) => {
//     const {} = req.body
//     res.send()
// })

app.listen(3000 , () => {
    console.log('listen on port ' , 3000);
})
export default app