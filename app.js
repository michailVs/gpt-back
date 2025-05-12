import express, { Router } from 'express'
import 'dotenv/config'
import OpenAI from 'openai/index.mjs'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 3002


app.use(cors({
    origin: process.env.BASE_URL
}))
app.use(express.json())

const start = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server has started on ${PORT} port`)
        })
    } catch (err) {
        console.log(err.message)
    }
}
start()

app.get('/', (req, res) => {
    const ip = req.socket.remoteAddress || ''

    return res.json({
        ip,
    })
})


let client = null

const inputKey = (req, res, next) => {
    try {
        const {key} = req.body
        if (!key) {
            return next('Api key введён неверный или отсутсвует')
        }
        client = new OpenAI({
            apiKey: key,
        })
        if (!client) {
            return next('Api error')
        }
        return res.status(200).send({message: 'ok', status: 200})
    } catch (err) {
        return next(err.message)
    }
}

const inputMsg = async (req, res, next) => {
    try {
        const {msg} = req.body
        if (!msg) {
            return next('Please input your request')
        }
        const response = await client.responses.create({
            model: 'gpt-4o-mini',
            input: msg,
        })
        return res.status(200).json(response.output_text)
    } catch (err) {
        return next(err.message)
    }
}

app.post('/apiKey', inputKey)
app.post('/msg', inputMsg)