require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const session = require('express-session');
const uuid= require("uuid");


const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.static('public'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Client Ui endpoints
app.get('/login', (req,res)=>{
    return res.render('login')
})

app.get('/addclass',(req,res)=>{
    return res.render('addclass');
})

app.get('/listclasses', (req,res)=>{
    return res.render('classes')
})

// Api endpoints
app.get('/', async (req,res)=>{
    res.json("Bumps can take request now!");
});

app.get('/classes', async (req,res)=>{
    const {username, password} = req.session;
    if(!username || !password){
        return res.json({
            "error": true,
            "message": "Forbidden!"
        })
    }
    const config = {
        auth: {
            username: req.session.username,
            password: req.session.password
          },
        headers: {
            'Accept-Encoding': 'application/json',
        }
    }

    try {
        const response = await axios.get(process.env.API_BASE_URL,config);
        res.json(response.data);
    }catch(error){
        console.log(error.message)
    }
})


app.post('/login', async (req,res)=>{
    const {username, password} = req.body;

    const config = {
        auth: {
            username: username,
            password: password
          },
        headers: {
            'Accept-Encoding': 'application/json',
        }
    }

    try {
        const response = await axios.get(process.env.API_BASE_URL,config);

        req.session.username = username
        req.session.password = password
        return res.json({
                "error": false,
                "message": "Authenticated",
        })
        
    }catch(error){
        if(typeof error.response != 'undefined' && error.response.status == 401){
            return res.json({
                "error": true,
                "message": "Check your email or pasword",
            })
        }else{
            console.log(error.message);
        }
        
    }
})

app.post('/addclass',async (req,res) => {
    const { description,start, end, max_participants, record_class }= req.body;

    const {username, password} = req.session;
    if(!username || !password){
        return res.json({
            "error": true,
            "message": "Forbidden!"
        })
    }
    const config = {
        auth: {
            username: req.session.username,
            password: req.session.password
          },
        headers: {
            'Accept-Encoding': 'application/json',
        }
    }

    const data = {
        "description":  description,
        "start": start,
        "end": end,
        "max_participants": max_participants,
        "record_class": record_class,
        "room_token": uuid.v4()
    }

    try {
        const response = await axios.post(process.env.API_BASE_URL,data,config);
        if(response.data){
            return res.json({
                "error": false,
                "message": "Class is successfully created"
            })
        }
    }catch(error){
        console.log(error.message)
    }

});

app.get('/logout', async (req,res)=>{
    try{
        const success = await req.session.destroy()
        return res.json({
            "error": false,
            "message": "Logout successful"
        })
    }catch(error){
        console.log(error.message)
    }
    
})


app.listen(PORT,()=>{
    console.log(`Server started running at port ${PORT}`);
})