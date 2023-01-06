//require the libarary
const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/contact_list_db');

//acquire the connection to check if it is successful
const db = mongoose.connection;

//on error
db.on('error',console.error.bind(console,'connection error:'))

// up and running
db.on('open',function(){
    console.log('Successfully connected to the database')
})

console.log(db)