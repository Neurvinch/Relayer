const express = require('express');
const cors = require('cors');
const helmet = require("helmet");
const rateLimit = require("express-rate-limit")
const {ethers, NonceManager} = require("ethers")
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


    setupDatabase(){
        this.redis = Redis.createClient({
            url: 'redis://localhost:6379'
        });

        this.redis.on('error', (err) => console.log('Redis Client Error', err));
        this.redis.connect();

        // used the ethers nonce manager to craetea anonce to avoid relay attcaks
        this.nonceManger = new NonceManager(this.redis)
    }

    setupQueue() {
        this.txQueue = new Queue('transaction queue','redis://localhost:6379');

        this.txQueue.process('relay', async (job) => await this.processTransaction(job.data));

        this.txQueue.on('completed', (job, result) => console.log(`Transaction completed: ${result.txHash}`))

        this.txQueue.on("failed", (job, err) => {
            console.log(`Transaction failed: ${err.message}`);
        });

    }

    setupProvider() {
        const networkName = 'localhost';
        this.networkConfig = NetworkConfig[networkName];0

        if(!this.networkConfig) {
            throw new Error(`Unsupported network: ${networkName}`);
        }
        this.provider = new ethers.JsonRpcProvider(this.networkConfig.rpcUrl);

        this.relayerWallet = new ethers.Wallet("privateKey",this.provider)


         console.log(` Connected to ${networkName} network`)

         console.log(`Relayer address: ${this.relayerWallet.address}`)
    }
   


}