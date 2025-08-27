const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
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

    app.get("/api/sliders", async (req, res) => {
      const sliders = await slidersCollection.find({}).toArray();
      res.send(sliders);
    });
    app.get("/api/products", async (req, res) => {
      const products = await productsCollection.find({}).toArray();
      res.send(products);
    });
    app.get("/api/products/:id", async (req, res) => {
      const productId = req.params.id;
      const product = await productsCollection.findOne({ "product-id": productId });

      if (!product) {
        return res.status(404).send({ error: "Product not found" });
      }

      res.send(product);
    });

    app.listen(process.env.PORT, () => {
      console.log("Server is running");
    });

  } finally {
    
  }
}
run().catch(console.dir);
