const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/Campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: false,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("database connected");
});

const app = express(); 


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) 


app.get('/', (_req, res)=> {
    res.render('home')
})

app.get('/campgrounds', async(req, res)=> {
    const campgrounds = await Campground.find({});
    res.render('campgrounds/index', {campgrounds})
})

app.get('/campgrounds/:id', async (req, res) =>{
    const campground = await Campground.findById(req.params.id)
    res.render('campgrounds/show', {campground});
})

app.listen(3000, ()=> {
    console.log('serving on port 3000')
})

 