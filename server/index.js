require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const authRoutes = require('./src/routes/authRoute');
const blogRoutes = require('./src/routes/blogRoute');

const port = process.env.PORT || 5000;
const dbURI = process.env.DB_URI || 'mongodb://localhost:27017/myTestDb';

console.log('@DB', dbURI)

async function connectToMongoDB() {
    const client = new MongoClient(dbURI, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
  
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

      startServer();
    } finally {
      // To force close mongodb connection
      // await client.close();
    }
  }

  function startServer() {
    
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'images');
        },
        filename: (req, file, cb) => {
            cb(null, new Date().getTime() + '-' + file.originalname);
        }
    })
    
    const fileFilter = (req, file, cb) => {
        if( file.mimetype === 'image/png' || 
            file.mimetype === 'image/jpg' || 
            file.mimetype === 'image/jpeg'
        ){
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
    
    app.use(bodyParser.json());
    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
    
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        next();
    })
    
    app.use('/v1/auth', authRoutes);
    app.use('/v1/blog', blogRoutes);
    
    app.use((error, req, res, next) => {
        const status = error.errorStatus || 500;
        const message = error.message;
        const data = error.data;
    
        res.status(status).json(
            {
                message: message,
                data: data
            }   
        );
    })
  
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
  
  connectToMongoDB().catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });