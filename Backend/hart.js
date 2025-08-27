const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const dotenv = require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const uri = process.env.URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();
    console.log("Connected to MongoDB");

    // Database
    const db = client.db("Watermilon");
    const slidersCollection = db.collection("Sliders");
    const productsCollection = db.collection("Products");

    app.get("/sliders", async (req, res) => {
      const sliders = await slidersCollection.find({}).toArray();
      res.send(sliders);
    });
    app.get("/products", async (req, res) => {
      const products = await productsCollection.find({}).toArray();
      res.send(products);
    });

    // Get product by ID
    app.get("/item/:id", async (req, res) => {
      const {id} = req.params;
      const result = await productsCollection.findOne({ _id: new ObjectId(`${id}`) });
      res.send(result);
    });

    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });

  } finally {
    
  }
}
run().catch(console.dir);
