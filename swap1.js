const Web3 = require('web3')
const axios = require('axios')
require('dotenv').config()

const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

const web3 = new Web3(RPC_URL)
const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY)

async function swapper(){
    try{
        // const response = await axios.get(`https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE&toTokenAddress=0x8f3cf7ad23cd3cadbd9735aff958023239c6a063&amount=1000000000000000000&fromAddress=${wallet.address}&slippage=0.1&disableEstimate=true`)
        const response = await axios.get(`https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress=${fromTokenAddress}&toTokenAddress=${toTokenAddress}&amount=${amount}&fromAddress=${wallet.address}&slippage=0.1&disableEstimate=true`)

        if(response.data){
            data = response.data
            data.tx.gas = 1000000
            tx = await web3.eth.sendTransaction(data.tx)
            if(tx.status){
                console.log("Swap Successfull! :)")
            }
            console.log(response.data.tx)
        }
    }catch(err){
        console.log("swapper encountered an error below")
        console.log(err)
    }

}
async function main(){
//     fromTokenAddress="0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
// toTokenAddress="0x8f3cf7ad23cd3cadbd9735aff958023239c6a063"
// amount="1000000000000000000"

// fromTokenAddress="0xf287D97B6345bad3D88856b26Fb7c0ab3F2C7976" //matik
// toTokenAddress="0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063"  //dai or HTC
// amount="1000000"

// fromTokenAddress="0x340f412860dA7b7823df372a2b59Ff78b7ae6abc" 
// toTokenAddress="0x27F8D03b3a2196956ED754baDc28D73be8830A6e"  
// amount="1000000"


fromTokenAddress="0x340f412860dA7b7823df372a2b59Ff78b7ae6abc" 
toTokenAddress="0x6fb54Ffe60386aC33b722be13d2549dd87BF63AF"  
amount="1000000"

//  0xA086f5a93077f22c7E75f453e15593a9E0b5b585
// 0xe695EbE070b2AB322F0A1531d1dBc722FD8EAa5A
    await swapper()
}

main()