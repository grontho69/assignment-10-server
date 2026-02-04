const express = require('express')
const cors = require('cors')

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});



const uri = "mongodb+srv://assignment-10:RcEa1TXP7h9TJrA5@cluster0.pxios99.mongodb.net/?appName=Cluster0";


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const verifyToken = async (req, res, next) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return res.status(401).send({error:'Unauthorized access'})
  }

  const token = authorization.split(' ')[1];
 try {
   await admin.auth().verifyIdToken(token) 
     next()
 } catch (error) {
  res.status(401).send({error:'Unauthorized access'})
 }



}


async function run() {
  try {
   
    await client.connect();

const db = client.db('assignment-10')
    const issuesCollection = db.collection('issues')

    const contributionsCollection = db.collection('contributions');
    


    //get issues


     app.get('/issues', async (req, res) => {
     const result = await issuesCollection.find().toArray()
     res.send(result)
    })

    app.get('/issues/:id',verifyToken ,async (req, res) => {
      const{ id }= req.params
   
      const result = await issuesCollection.findOne({_id:new ObjectId(id)})
      res.send({
        success: true,
        result
      })
})

  app.post('/issues', async (req, res) => {
      const data = req.body
      console.log(data)
      const result = await issuesCollection.insertOne(data)
      res.send({
        success: true,
        result
       })
    })
  
   app.get('/my-issues',verifyToken, async (req, res) => {
      const email = req.query.email
      const result = await issuesCollection.find({ email: email }).toArray()
      res.send(result)
      
})

      //recent issue
    
    app.get('/recent-issues', async (req, res) => {
      const result = await issuesCollection.find().sort({date :-1}).limit(6).toArray()
      res.send(result)
    })
   
 app.get('/contributions', async (req, res) => {
    const { issueId } = req.query;
    if (!issueId) return res.send([]);

    const result = await contributionsCollection
      .find({ issueId })
      .sort({ createdAt: -1 })
      .toArray();

    res.send(result);
 });
    
    app.post('/contributions', async (req, res) => {
  const data = {
    ...req.body,
    amount: Number(req.body.amount),
    createdAt: new Date()
  };

  const result = await contributionsCollection.insertOne(data);
  res.send({ _id: result.insertedId, ...data });
});

 


    
    
   

    
  



  
  
  await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
  
  //  await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
