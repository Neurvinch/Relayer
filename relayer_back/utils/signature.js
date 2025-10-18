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

            const types = {
                ForwardRequest : [
                    {name: 'from', type: 'address'},
                      { name: 'to', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    {name: 'gas', type:'uint256' },
                    {name: 'nonce', type: 'uint256' },
                    {name: 'deadline', type: 'uint256' },
                    {name: 'data', type: 'bytes' },

                ]
            };

            const digest = ethers.TypedDataEncoder.hash(domain, types, request);

            const recoverdSigner= ethers.recoverAddress(digest, signature);


            return recoverdSigner.toLowerCase() === request.from.toLowerCase();


            
        } catch (error) {
             console.error('Signature verification error:', error);
                return false;
        }
    }

    static async createSignature(request, privatekey, forwarderAddress, chainId){

        const wallet = new ethers.Wallet(privatekey)

        const domain = {
            name: 'RelayerDAppForwarder',
            version: '1',
            chainId: chainId,
            verifyingContract: forwarderAddress
        };


        const types= {
              ForwardRequest: [
                { name: 'from', type: 'address' },
                { name: 'to', type: 'address' },
                { name: 'value', type: 'uint256' },
                { name: 'gas', type: 'uint256' },
                { name: 'nonce', type: 'uint256' },
                { name: 'deadline', type: 'uint48' },
                { name: 'data', type: 'bytes' }
                ]
        };

        return await 
    }
}