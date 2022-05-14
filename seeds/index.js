const mongoose = require('mongoose');
const cities = require('./cities');
const {places, descriptors} = require('./seedHelpers');
const Campground = require('../models/Campground');


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.log.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("database connected");
});

// const sample = (array) => {
//     array[Math.floor(Math.random()*18)]
// };

const seedDB = async () => {
    await Campground.deleteMany( {} );
    for(let i=0; i<100; i++){
        const random1000 = Math.floor(Math.random()*406);
        const price = Math.floor(Math.random()*20)+10;
        const camp = new Campground(
            {
                location: `${cities[random1000].city}, ${cities[random1000].admin_name}`,
                title: `${descriptors[Math.floor(Math.random()*18)]} ${places[Math.floor(Math.random()*18)]}`,
                image: 'https://source.unsplash.com/collection/483251',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!', 
                price
            }
        )
        await camp.save(); 
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})

