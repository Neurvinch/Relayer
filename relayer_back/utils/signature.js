const {ethers} = require('ethers');

class SignatureUtils {

    static async verifySignature(request, signature , forwarderAddress, chainId) {

        try {
            
         // for building the EIP-712 domain object 
            
            const domain = {
                name: 'RelayerDappForwarder',
                version: '1',
                chainId: chainId,
                verifingContract: forwarderAddress,
            };


            
        } catch (error) {
            
        }
    }
}