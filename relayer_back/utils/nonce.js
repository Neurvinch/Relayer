class NonceManager {

    constructor (resdisClient) {

        this.redis = resdisClient;
        this.NONCE_PREFIX = "nonce:";

    }

    async getNonce(address){
         
        try {
            const key = this.NONCE_PREFIX + address.toLowercase();
            

            const nonce = await this.redis.get(key);

            return parseInt(nonce|| '0');
        } catch (error) {
            
                console.error('Get nonce error:', error);
                    return 0;
        }
    }

    async validateAndUpdateNonce(address, expextedNonce) {
        
        try {
            
            
        } catch (error) {
            
        }

    }
}