import express from "express";

const app = express()

app.use((req, res, next) => {
    console.log(req.method, req.url);
    next()
})

app.get('/', (req, res) => {
    res.send('Hallo Welt')
})

app.get('/cars', (req, res) => {
    res.send('In Cars')
})

app.post('/cars', (req, res) => {
    res.send('Danke für das neue Auto')
})

app.use((req, res) => {
    res.send('Keiner mag dich haben')
})





app.listen(9898, () => console.log('Ich stehe wieder vor der Tür'))