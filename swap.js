const axios = require('axios')
const Web3 = require('web3');

const map = new Map();
var symbol = [];
var address = [];

getTokens = async () => {
    await axios.get('https://api.1inch.io/v4.0/56/tokens').then(function (res) {
        // console.log(res.data);
        data = res.data;
        // console.log(Object.keys(data.tokens));
        var i=0;
        var j=0;
        Object.keys(data.tokens).forEach(function (key) {
            symbol[i++] = data.tokens[key].symbol;
            address[j++] = data.tokens[key].address;
        })
        for(let i=0; i<symbol.length; i++) {
            map.set(symbol[i], address[i]);
        }
        // console.log("mapppp",map)
        var firstToken = document.getElementById("firstToken");
        // console.log("firstToken",firstToken);
        for(let i=0;i<symbol.length; i++)
        {
            var newElement = document.createElement("option");
            newElement.textContent = symbol[i];
            newElement.value = symbol[i];
            firstToken.appendChild(newElement);
        }

        var secondToken = document.getElementById("secondToken");
        // console.log("secondToken",secondToken);
        for(let i=0;i<symbol.length; i++)
        {
            var newElement = document.createElement("option");
            newElement.textContent = symbol[i];
            newElement.value = symbol[i];
            secondToken.appendChild(newElement);
        }
    })
}



Quote = async () => {
    var select1 = document.getElementById("firstToken");
    var selected1 = select1.options[select1.selectedIndex].text;

    var select2 = document.getElementById("secondToken");
    var selected2 = select2.options[select2.selectedIndex].text;

    var swapValue = document.getElementById("swapValue");

    const res = await axios.get('https://api.1inch.io/v4.0/56/quote', 
    {
        params: {
            fromTokenAddress : map.get(selected1),
            toTokenAddress : map.get(selected2),
            amount : swapValue.value
        }
    }).then(function (response) {
        console.log(response.data);
    })
}
const quoteButton = document.getElementById("getQuote");
quoteButton.onclick = Quote;


Checkforallowance = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = web3.eth.getAccounts();

    var firsttoken = document.getElementById("firstToken");
    var firsttokendata = firsttoken.options[firsttoken.selectedIndex].text;

    await axios.get('https://api.1inch.io/v4.0/56/approve/allowance', {
        params: {
            tokenAddress : map.get(firsttokendata),
            walletAddress : accounts[0]
        }
    }).then(function (res) {
        console.log(res.data);
    })
}

const Checkforallowancebtn = document.getElementById("checkAllowanceBtn");
Checkforallowancebtn.onclick = Checkforallowance;


ApproveTransfer = async () => {
    var firsttoken = document.getElementById("firstToken");
    var firsttokendata = firsttoken.options[firsttoken.selectedIndex].text;
    var swapValue = document.getElementById("swapValue");

    await axios.get('https://api.1inch.io/v4.0/56/approve/transaction', {
        params : {
            tokenAddress : map.get(firsttokendata),
            amount : swapValue.value
        }
    }).then(function (res) {
        response = res.data;
        console.log(response)
    })

}
const ApproveTransferbtn = document.getElementById("ApproveTransfer");
ApproveTransferbtn.onclick = ApproveTransfer;


swapToken = async () => {
    const web3 = new Web3(window.ethereum);
    const accounts = web3.eth.getAccounts();

    var firsttoken = document.getElementById("firstToken");
    var firsttokendata = firsttoken.options[firsttoken.selectedIndex].text;

    var select2 = document.getElementById("secondToken");
    var selected2 = select2.options[select2.selectedIndex].text;
    
    var swapValue = document.getElementById("swapValue");

    var swapdata;

    await axios.get('https://api.1inch.io/v4.0/56/swap', {
        params : {
            fromTokenAddress : map.get(firsttokendata),
            toTokenAddress : map.get(selected2),
            amount : swapValue.value,
            fromAddress : accounts[0],
            slippage : 1,
            disableEstimate : false,
            allowPartialFill : false
        }
    }).then(function (res) {
        swapdata = res.data.tx;
        console.log(swapdata);
    })
    await web3.eth.sendTransection(swapdata);
}

const swapTokenBtn = document.getElementById("swapBtn");
swapTokenBtn.onclick = swapToken;

getTokens();