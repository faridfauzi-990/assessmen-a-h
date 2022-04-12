const Joi = require('joi');
const express = require('express');
const app = express(); 
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

let users = [
    {
        id: 1,
        ic:"12312",
        name:"farid",
        email:"farid@yahoo",
        address:"puchong ruvena villa, selangor",
        username:"farid",
        password:"123"
    },
    {
        id: 2,
        ic:"12112",
        name:"paul agada",
        email:"paul@affinhwang.com",
        address:"B-7-3A, Block B West, Menara Pj8, 46050 Petaling Jaya, Selangor",
        username:"paul",
        password:"1234"
    },
    {
        id: 3,
        ic:"13312",
        name:"Danny Tan",
        email:"danny@affinhwang.com",
        address:"Kuala Lumpur",
        username:"danny",
        password:"12345"
    }
]

app.get('/', (req, res) => {
    res.send('Hello World')
});

app.get('/api/users', (req,res) => {
    res.send(users);
});  

app.post('/api/users', (req,res) => {
    //to add
    const {error} = validateCoure(req.body)
    if (error) return res.status(400).send(error.details[0].message); 
     
    let tempMax = Math.max.apply(Math, users.map(function(o) { return o.id; }))
    const newUser ={
        id: tempMax + 1,
        ic: req.body.ic,
        name: req.body.name,
        email:req.body.email,
        address:req.body.address,
        username: req.body.username,
        password: req.body.password
    };
    users.push(newUser);
    res.send(users);
})

app.post('/api/users/edit/:username', (req,res) => {
    //to edit. jadi
    console.log('req 75: '+(req.body.username))
    const {error} = validateCoure(req.body)
    if (error) return res.status(400).send(error.details[0].message); 
    console.log('req 78: '+(req.body))
    for (let i=0; i<users.length; i++ ) {
        if ( (req.params.username) ==  (users[i].username)) {
            // users[i].name = req.body.name;
            // users[i].ic = req.body.ic;
            users[i] = req.body;
            console.log('is edit')
        }
    }
    console.log('req 87: '+(req.body))
    res.send(users);
})

app.put('/api/users/:username', (req,res) => {
    //to edit. macam tak jadi
    let newUser = users.find(c => c.username ===  (req.params.username) );
    if (!newUser)    return res.status(404).send('The user that was given ID is not found');

 
    const {error} = validateCoure(req.body)

    if (error) return res.status(400).send(error.details[0].message); 

    // newUser.name = req.body.name;
    // newUser.ic = req.body.ic;
    newUser = req.body;
    console.log('success edit')
    res.send(newUser)

})

app.delete('/api/users/:username', (req,res) => {
    //TO REMOVE
    const newUser = users.find(c => c.username ===  (req.params.username) );
    if (!newUser) return res.status(404).send('The newUser that was given ID is not found');
 
    const index = users.indexOf(newUser);
    users.splice(index,1);

    res.send(users);
})

app.get('/api/users/:username', (req,res) => {
    //to find specific ID.
    const newUser = users.find(c => c.username ===  (req.params.username) );
    if (!newUser) return res.status(404).send('The newUser that was given ID is not found');
    res.send(users)
})

function validateCoure(newUser) {
    const schema ={
        name: Joi.string().min(3).required(),
        ic: Joi.string().min(3),
        email: Joi.string().min(3),
        username: Joi.string().min(3),
        address: Joi.string().min(3),
        password: Joi.string()
    }
    return Joi.validate(newUser, schema)
} 

// const port = process.env.PORT || 3000;
const port = 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));