
const express = require('express')

const bodyParser = require('body-parser')

const {MongoClient} = require('mongodb')

const cors= require('cors')


const app = express()


const PORT = 5000

const uri = 'mongodb+srv://madara_uchiha:madara_uchiha@cluster0.mabn2pc.mongodb.net/cli '
const client = new MongoClient(uri,{ useUnifiedTopology:true})

app.use(bodyParser.json())

app.use(cors())

app.post('/command', async function(req,res){

 const{command,collection,document} = req.body
 try{
    await client.connect();
     const db = client.db('Database_name')
     const col = db.collection(collection);

   // check between insert and find
   if(command ==='insert'){
    const docs = JSON.parse(document);
    await col.insertOne(docs)
    res.status(200).send('Document successfully inserted.')
   }
   else if(command==='find') {
       const doc_find = await col.find({}).toArray();
       res.status(200).send(doc_find);
   }
   else{
    res.status(400).send('Invalid Command')
   }


 }catch(e){
    console.error(e)
    res.status(500).send('Error while connecting to database')
 } 

 finally {
    await client.close();
 }

} )


app.listen(PORT, function(){
    console.log(`Server is running on PORT ${PORT}`)
})