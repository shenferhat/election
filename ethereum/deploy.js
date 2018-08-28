const HDWalletProvider = require('truffle-hdwallet-provider'); // truffle provider
const Web3 = require('web3'); // web3: interact with contracts.
const compiledContract = require('./build/Election.json');

// wallet provider
const provider = new HDWalletProvider(
    'goddess unfair dinosaur repair chunk steel yard million card hidden wise web',
    'https://rinkeby.infura.io/Tx2WduM1PsW8I5jnGjPK'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log('Attempting to deploy from account:', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(compiledContract.interface))
        .deploy({data: '0x'+compiledContract.bytecode})
        //.deploy({data: '0x'+compiledContract.bytecode, arguments:['Hi there!']})
        .send({
            gas: '1000000',
            gasPrice: web3.utils.toWei('20', 'gwei'),
            from: accounts[0]});

        console.log('Contract deployed to',result.options.address); // required for front end
}
deploy(); // func for async use.