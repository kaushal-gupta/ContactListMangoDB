const express = require('express');
const path =require('path');
const port = 8000;

const db = require('./config/mongoose');

const Contact = require('./model/contact');
//Creating the server
const app = express();

app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());


app.use(express.static('assets'))

//middleWare-1
// app.use(function(req,res,next){
//     console.log('middleWare 1');
//     next();

// })


// //middleWare-2
// app.use(function(req,res,next){
//     console.log('middleWare 2');
//     next();
// })  


var contactList =[
    {
        name:'Kaushal',
        phone:8860393547,
    },
    {
        name:'Sumit',
        phone:09002022,
    },
    {
        name:'Rohit',
        phone:828288292,
    }
]
app.get('/',function(req,res){
   

    Contact.find({},function(err,Contacts){
        if(err){
            console.log('Error in fetching the Contact from db');
            return;
        }
        return res.render('home',{
            title:'Contact List',
            heading:'Contact List',
            contact_list:Contacts
        });
    })


    
})

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone,
    // })

    Contact.create({
        name:req.body.name,
        phone:req.body.phone
    },function(err,newContact){
        if(err){
            console.log(err);
            return;
        }
        console.log('*****',newContact);
        res.redirect('back');
    });
    
})

app.get('/delete-contact/',function(req,res){
    // contactList=contactList.filter((item)=>item.phone!=req.query.phone)

    let id= req.query.id;
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('Error occured while deleting a contact');
            return ;
        }

        res.redirect('back');
    })

})

app.get('/profile',function(req,res){
    return res.render('profile',{
        title:'profile',
        para:'I am profile'
    });
})

app.listen(port,function(err){
    if(err){
        console.log('error',err);
    }
    console.log('Express server is running on port ',port);
})

