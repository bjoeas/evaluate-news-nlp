const dotenv = require('dotenv');
dotenv.config();

// console.log(`Your API key is ${process.env.API_KEY}`);
const baseURL = 'https://api.meaningcloud.com/sentiment-2.1';
const apiKey = process.env.API_KEY

// var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

/* Middleware*/
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// app.use(express.static('src/client'))
app.use(express.static('dist'))

console.log(__dirname)

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/meaningCloud', async (req, res) => {

    console.log(req.body);

    // const formdata = new FormData();
    // formdata.append("key", apiKey);
    // formdata.append("url", req.body); // req.body.url
    // formdata.append("lang", "auto");  // 2-letter code, like en es fr ...
    //
    // const requestOptions = {
    //     method: 'POST',
    //     body: formdata,
    //     redirect: 'follow'
    // };

    try {
        // const response = fetch(baseURL, requestOptions)
        const response = await fetch(`${baseURL}?key=${apiKey}&lang=auto&url=${req.body.url}`);

        // console.log(response.status);
        // console.log(response);

        const data = await response.json();

        console.log(data);

        res.send(data);

    } catch (error) {
        console.error(error);
        // TODO: Fehlermeldung im HTML ausgeben!
    }

    // const response = fetch(baseURL, requestOptions)
    //     .then(response => ({
    //         status: response.status,
    //         body: response.json()
    //     }))
    //     .then(({status, body}) => console.log(status, body))
    //     .catch(error => console.log('error', error));
})

// Example MeaningCloud
// const formdata = new FormData();
// formdata.append("key", "YOUR API KEY");
// formdata.append("txt", "YOUR TEXT HERE");
// formdata.append("lang", "TEXT LANGUAGE HERE");  // 2-letter code, like en es fr ...
//
// const requestOptions = {
//     method: 'POST',
//     body: formdata,
//     redirect: 'follow'
// };
//
// const response = fetch("https://api.meaningcloud.com/sentiment-2.1", requestOptions)
//     .then(response => ({
//         status: response.status,
//         body: response.json()
//     }))
//     .then(({ status, body }) => console.log(status, body))
//     .catch(error => console.log('error', error));