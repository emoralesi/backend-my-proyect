import express from 'express'
import cors from 'cors'
import router from './src/route/route.js'

const app = express()
const port = 3500
app.use(cors())

app.use(express.json())
app.use(router)

app.listen(port, () =>{
    console.log('Escuchando en puerto 3500')
})