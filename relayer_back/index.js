const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit")
const {ethers} = require("ethers")
const Redis = require("redis")
const Queue = require("bull");
require('dotenv').config();

class RelayerServer{
    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupDatabase();
        this.setupQueue();
        this.setupProvider();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(helmet());
        this.app.use(cors());


        const limiter = rateLimit({
               windowMs: 15 * 60 * 1000,
                max: 100,
                message: 'Too many requests from this IP, please try again later.',
                standardHeaders: true,
                legacyHeaders: false,
        })

        this.app.use('/api/',limiter);
        this.app.use(express.json({limit : '10mb' }))

    };


}