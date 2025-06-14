const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const UserModel = require('./models/Users')
const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb+srv://kalpanaravi09r:RvToCkAgIxxp327b@cluster0.wvxgz17.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(users => res.json(users))
    .catch(err => res.json(err))
}
)

app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findById({_id:id})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.put('/updateUsers/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id: id}, {name:req.body.name, email:req.body.email, age:req.body.age})
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.delete('/deleteUser/:id', (req,res) => {
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(res => res.json(res))
    .catch(err => res.json(err))
})  

app.post("/createUsers", (req, res) =>{
    UserModel.create(req.body)
    .then(users => res.json(users))
    .catch(users => res.json(err))
})

app.listen(3001, () =>{
    console.log("server is running on port 3001")
})