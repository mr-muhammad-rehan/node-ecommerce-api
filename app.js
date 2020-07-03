const express = require('express');
const { json } = require('express');
const app = express();

app.use((req, res, next)=>{
    res.status(200).json({
        mesaage: 'it works'
    });
});

module.exports = app;


