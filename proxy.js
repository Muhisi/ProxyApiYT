const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;
const maximoIP = 10;
require('dotenv').config();
const redis = require('redis');

/*const redisClient = redis.createClient
({
    port: port,         
    host: '120.0.0.1',       
});

redisClient.on('error', (err) => {
    console.log("Error " + err);
  });*/

const hostAPI = 'https://www.googleapis.com'

app.get('/youtube/v3/search', async (req, res) => 
{
    // aplicar control 
    // redirigir request
    // logear datos
    // send response
    /*redisClient.get(`IPControl:${req.ip}`, (err, result) =>
    {
        if(result)
        {
            if(result>maximoIP)
            {
                res.status(403);
                res.send('maximo de request por ip');
                return;
            }
            redisClient.setex(`IPControl:${req.ip}`, 600, result+1);
            console.log(result);
        }
        else
        {
            redisClient.setex(`IPControl:${req.ip}`, 600, 1);
        }
    });*/

    await axios.get(`${hostAPI}${req.originalUrl}&key=${process.env.GOOGLE_KEY}`)
    .then(function (response) 
    {
        res.send(response.data);
    })
    .catch(function (error)
    {
        console.log(error);
        res.status(error.status || 500);
        res.json(error.reason)
    });

    
});

app.listen(port,()=>{console.log('iniciado')});