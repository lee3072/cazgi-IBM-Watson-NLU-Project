const express = require('express');
const dotenv = require('dotenv')
dotenv.config()

function getNLUInstance() {
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;
    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1')
    const { IamAuthenticator } = require('ibm-watson/auth')
    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceURL: api_url,
    });
    return naturalLanguageUnderstanding;
}

const app = new express();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {
                document:true
            }   
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(results=>{
        console.log(JSON.stringify(results.result, null, 2))
        return res.send(JSON.stringify(results.result.emotion.document.emotion, null, 2));
    })
    .catch(error=>{
        return res.send(JSON.stringify(error))
    });
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {
                document:true
            }   
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(results=>{
        console.log(JSON.stringify(results.result, null, 2))
        return res.send(JSON.stringify(results.result.sentiment.document.label, null, 2));
    })
    .catch(error=>{
        return res.send(JSON.stringify(error))
    });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {
                document:true
            }   
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(results=>{
        console.log(JSON.stringify(results.result, null, 2))
        return res.send(JSON.stringify(results.result.emotion.document.emotion, null, 2));
    })
    .catch(error=>{
        return res.send(JSON.stringify(error))
    });
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {
                document:true
            }   
        }
    }
    getNLUInstance().analyze(analyzeParams)
    .then(results=>{
        console.log(JSON.stringify(results.result, null, 2))
        return res.send(JSON.stringify(results.result.sentiment.document.label, null, 2));
    })
    .catch(error=>{
        return res.send(JSON.stringify(error))
    });
});

let server = app.listen(8081, () => {
    console.log('Listening', server.address().port)
})

