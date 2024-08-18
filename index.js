
const express = require('express')
const bodyParser = require('body-parser')
const { validationResult } = require('express-validator')
const repo = require('./repository')
const { validateConfirmPassword } = require('./validator')
const signupTemplet = require(('./signup'))
const mongoose=require("mongoose")
const app = express()

const port = process.env.PORT ||4000
const url=`mongodb+srv://sujathasenthamarai:suji$17yazh@cluster0.oquejho.mongodb.net/login?retryWrites=true&w=majority&appName=Cluster0`;

// The body-parser middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }))



mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{console.log("connected successfully")}).catch((err)=>{
    console.log(err);
  })
  
  // Define a User model
  const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  const User = mongoose.model('User', UserSchema);




// Get route to display HTML form to sign in
app.get('/', (req, res) => {
	res.send(signupTemplet({}))
})

// Post route to handle form submission logic and 
app.post(
	'/',
	[validateConfirmPassword],
	async(req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.send(signupTemplet({ errors }))
	}
	// const { email, password } = req.body
	User.collection.insertOne({email:req.body.email,password: req.body.password})
        .then(()=>{console.log('inserted successsfully');})
        .catch((err)=>{console.error(`connection Problem: ${err}`)});
	res.send(`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body{
            
            background-color:#9c37e3;
        }
    div{
        color:rgb(239, 175, 25);
        text-align: center;
        margin-top: 15%;
        margin-left: 35%;
        margin-right: 35%;
        height: 50px;
        font-weight: bolder;
        font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 25px;
        
    
}

div:hover{
    color:black;

}

button{
    height: 40px;
    width: 125px;
    font-size: 25px;
    border-radius: 15px;
    font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-weight: bolder;
    text-align: center;
    background-color:rgb(47, 129, 44); 
    color: black;
    box-shadow: 2px 2px 2px black;

}

    </style>
</head>
<body>
    <div class="Sign Up">
        <h1>Sign Up Successfully</h1>
        <button type="button" onclick="history.back()">Back </button>



    </div>
</body>
</html>`)
})

// Server setup
app.listen(port, () => {
	console.log(`Server start on port http:localhost/${port}`)
})
