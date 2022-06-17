//imports
import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Cors from 'cors'
import Messages from './models/dbMessages.js'
import Pusher from 'pusher'



//App Config
dotenv.config();
const app = express();
const port = process.env.PORT || 9000
const pusher = new Pusher({
    appId: "1422426",
    key: "4044c6305bfc1c7d6e3c",
    secret: "10385e8e20f50a8f1834",
    cluster: "us2",
    useTLS: true
  });




//middleware
app.use(express.json());
app.use(Cors());


//DB config
//set up connection with database
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("Database connected Successfully!")
        }).catch((err)=>{
            console.log(err);
        })

//API endpoints
// open connection with mongoose
const db = mongoose.connection
db.once("open",  () => {
    console.log("DB connected")
    const msgCollection =  db.collection("messagingmessages")
    const changeStream =  msgCollection.watch()
    changeStream.on('change', change =>{
        console.log(change)
        if(change.operationType === "insert"){
            const messageDetails =   change.fullDocument
            pusher.trigger("messages", "inserted", {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received
            })
        }else{
            console.log('Error triggering Pusher')
        }
    })
})


app.get("/",  (req, res)=> res.status(200).send("hello Buddy"))

app.post('/messages/new',   (req, res) =>{
    const dbMessage =  req.body
    Messages.create(dbMessage, (err, data) => {
        if(err)
        res.status(500).send(err)
        else
        res.status(200).send(data)
    })
})

app.get('/messages/sync',  (req, res) => {
    Messages.find((err,data) =>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.status(201).send(data)
        }
    })
})



//port listener
app.listen(port, () => console.log(`Backend Server is running ....Listening on localhost: ${port}`))