const { log } = require('console');
const express = require('express')
const app = express();
const port = 8000;
const path = require("path");

// console.log(path.join(__dirname,"../views"));
// console.log(path.join(__dirname,"../data.json"));
// console.log(path.join(__dirname,"../public"));

app.use(express.static(path.join(__dirname,"../public/js")))
app.use(express.static(path.join(__dirname,"../public/css")))
// app.set("view engine","ejs");
app.set("view engine",path.join(__dirname,"../views"));

app.get('/', (req, res) => {
    res.render('home.ejs');
   });


app.get('/ig/:username', (req, res) => {
    let {username} = req.params;
    const instadata = require(path.join(__dirname,"../data.json"));
    const data = instadata[username];
    console.log(data); 
    if(data){
        res.render('instagram.ejs',{ data });
    }else{
        res.render("errorPage.ejs");
    }
   });

// app.get('/ig/:username', (req, res) => {
//     let {username} = req.params;
//     let followers = ["Adam","Shehbaz","Ultimo","inu","muskan"]; 
//     console.log(username); 
//     res.render('instagram.ejs',{username,followers});
//    });


app.get('/dice', (req, res) => {
    let diceVale =  Math.floor(Math.random()*6)+1;
    res.render('dice.ejs',{diceVal:diceVale});
   });

// app.get("/:username/:id",(req,res)=>{
//     console.log(req.params);
//     let {username,id} = req.params;
//     res.send(`welcome to the page of @${username} `);
// })

app.get("/search",(req,res)=>{
    let {q} = req.query;
    if(!q){
    res.send(`<h1>nothing search </h1>`);
    }
    console.log(req.query);
    res.send(`<h1>search result for query @${q}</h1>`);
})
app.get("*",(req,res)=>{
    res.status(404).send(`<h1>Error 404 go to home</h1>`);
})


app.listen(port,()=>{
    console.log(`server is listen on port ${port}`);
})