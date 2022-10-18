const fetch = require('node-fetch-commonjs');
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require("dotenv").config();
const path = require('path');

// import fetch from "node-fetch";
// import express from "express";
// import mongoose from "mongoose";
// import bodyparser from "body-parser";
// import {} from 'dotenv/config'
// import path from "path";

const app = express();

mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Error connecting to MongoDB', err))

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json());

app.use(express.static('public'))
app.use('/assets', express.static(__dirname + '/public/assets'))

// set

app.set('views', './views')
app.set('view engine', 'ejs');

//routers

app.get('/', async(req, res) => {

    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>{
                console.log(json)
                res.render('index',{ trikoo : json});
            })

})

//Listen 

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
})