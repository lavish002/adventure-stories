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

app.get('/makecampground', async (_req, res)=> {
    const camp = new Campground({ title: 'My Backyard', description: 'cheap camping'})
    await camp.save();
    
    res.send(camp);
})

app.listen(3000, ()=> {
    console.log('serving on port 3000')
})

 