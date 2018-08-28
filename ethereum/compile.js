const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); // improved version of fs

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // delete build folder

const contractPath = path.resolve(__dirname, 'contracts', 'Election.sol');
const source = fs.readFileSync(contractPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // create build directory

for(let contract in output){
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':','')+'.json'),
        output[contract]
    );
}