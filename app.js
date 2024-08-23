const express = require ('express');
const app = express();
const hbs = require ('hbs');
const nocache = require("nocache");
const session = require ('express-session');
app.set('view engine', 'hbs');
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static("views"));
const serverUsername = "anshabali";
const serverPassword ="123456";
app.use(nocache());

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized:true,
    cookie:{secure : false}
}));




app.get('/',(req,res)=>{
    if (req.session.user) {
        res.redirect('/home');
    } else {
        res.render("login");
    }
    
});

app.post('/home',(req,res)=>{
    console.log(req.body);
    if (req.body.username===serverUsername&&req.body.password===serverPassword) {
        req.session.user=req.body.username;
        res.redirect('/home');

    } else {
        res.render('login', {error: "Please Enter Valid Data"})
    }
});

app.get('/home', (req, res) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        res.render('home');
    }
});

   app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect('/');
   });

const PORT = process.env.PORT || 3001;

app.listen(PORT,()=>console.log(`server is running on ${PORT}`));
