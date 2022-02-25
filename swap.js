// const Web3 = require('web3')
// const axios = require('axios')
// require('dotenv').config()
// // https://docs.1inch.io/docs/aggregation-protocol/api/swagger
// const RPC_URL = process.env.RPC_URL
// const PRIVATE_KEY = process.env.PRIVATE_KEY

// const web3 = new Web3(RPC_URL)
// const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY)
// // console.log("Hi",wallet.address)
// const swapper = async () => {
//     console.log("Hi",wallet.address)
//     console.log(fromTokenAddress.value)
//     try{
//        const response = await axios.get(`https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress=${fromTokenAddress.value}&toTokenAddress=${toTokenAddress.value}&amount=${amount.value}&fromAddress=${wallet.address}&slippage=0.1&disableEstimate=true`)
//         if(response.data){
//             data = response.data
//             data.tx.gas = 100000
//             tx = await web3.eth.sendTransaction(data.tx)
//             console.log(tx)
//             if(tx.status){
//                 console.log("Swap Successfull! :)")
//             }
//         }
//         console.log(response.data.tx)
//     }catch(err){
//         console.log("swapper encountered an error below")
//         console.log(err)
//     }

// }
// var fromTokenAddress = document.getElementById("fromAddress");
// var toTokenAddress = document.getElementById("toTokenAddress");
// var amount = document.getElementById("amount");
// var btnsendAmount = document.getElementById("btnsendAmount");
// btnsendAmount.onclick = swapper;


// // fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
// // toTokenAddress=0x8f3cf7ad23cd3cadbd9735aff958023239c6a063
// // amount=1000000000000000000

// //  0xA086f5a93077f22c7E75f453e15593a9E0b5b585
// // 0xe695EbE070b2AB322F0A1531d1dBc722FD8EAa5A

// const Web3 = require('web3')
import { get } from 'axios'
// import 
require('dotenv').config()
// https://docs.1inch.io/docs/aggregation-protocol/api/swagger
const RPC_URL = process.env.RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY

// const web3 = new Web3(RPC_URL)
// const wallet = web3.eth.accounts.wallet.add(PRIVATE_KEY)
// console.log("Hi",wallet.address)
const swapper = async () => {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        console.log("Connected");
        // var account0;
        // web3.eth.getAccounts().then(function(result){
        //   account0 = result[0];
        // })
        const accounts = await web3.eth.getAccounts();
        // const accounts = await web3.eth.requestAccounts().then(console.log);
        const chainId = await web3.eth.net.getId();
    // console.log("Hi",wallet.address)
    console.log("Hi",accounts[0])
    console.log("Hi",chainId)
    console.log(fromTokenAddress.value)
    try{
       const response = await get(`https://api.1inch.exchange/v3.0/137/swap?fromTokenAddress=${fromTokenAddress.value}&toTokenAddress=${toTokenAddress.value}&amount=${amount.value}&fromAddress=${accounts[0]}&slippage=0.1&disableEstimate=true`)
       console.log("Ressssss:-",response) 
       if(response.data){
            data = response.data
            data.tx.gas = 100000
            tx = await web3.eth.sendTransaction(data.tx)
            console.log(tx)
            if(tx.status){
                console.log("Swap Successfull! :)")
            }
        }
        console.log(response.data.tx)
    }catch(err){
        console.log("swapper encountered an error below")
        console.log(err)
    }
}
else {
    alert("Metamask not found");
  }

}
var fromTokenAddress = document.getElementById("fromAddress");
var toTokenAddress = document.getElementById("toTokenAddress");
var amount = document.getElementById("amount");
var btnsendAmount = document.getElementById("btnsendAmount");
btnsendAmount.onclick = swapper;


// fromTokenAddress=0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE
// toTokenAddress=0x8f3cf7ad23cd3cadbd9735aff958023239c6a063
// amount=1000000000000000000

//  0xA086f5a93077f22c7E75f453e15593a9E0b5b585
// 0xe695EbE070b2AB322F0A1531d1dBc722FD8EAa5A


// 0xe695EbE070b2AB322F0A1531d1dBc722FD8EAa5A
// 0xDac79abc8F21462768BAe7Bb0251B7c14bba7c83