//models/mongoConfig.js  
//import mongodb
const mongo = require('mongodb').MongoClient;
//import mongodb connection uri
const URI = (process.env.NODE_ENV === 'production') ? process.env.MONGO_URI : process.env.MONG0_LOCAL_URI

//variable for connection object
//let connection: mongo;

//create mongo client instance
const mongoClient = new mongo(URI, { useNewUrlParser: true });


console.log("Connecting to mongodb");
//Create connection
mongoClient.connect().then((response) => {
    console.log('Connection to mongodb established');
    // connection = response;
},
    (err) => {
        console.log('Network error. Check your network connection');
    }
);

//export database connection object
module.exports = mongoClient;