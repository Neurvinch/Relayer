class NonceManager {

    constructor (resdisClient) {

        this.redis = resdisClient;
        this.NONCE_PREFIX = "nonce:";

    }

    async getNonce(address){
        
    }
}