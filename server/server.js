const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const connectionString = "mongodb://127.0.0.1:27017/";

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
async function retrieve() {
  const client = new MongoClient(connectionString);
  try {
    const database = client.db("chota_bheem_duniya");
    const characters = database.collection("characters");
    const chota_bheem_characters = await characters.find({}).toArray();
    return chota_bheem_characters;
  } catch {
    
  }
  finally {
    client.close();
  } 
}

app.get("/getCharacters", (req, res) => {
  retrieve()
    .then(val => res.send(val))
    .catch(console.dir)
});

app.listen(4000, () => {
  console.log("Server started successfully");
});
