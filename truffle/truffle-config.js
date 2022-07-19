
const HDWalletProvider = require('@truffle/hdwallet-provider');
require('dotenv').config();

module.exports = {

  contracts_build_directory: "../client/src/contracts",

  networks: {
     development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
     },

     ropsten:{
      provider : function() { return new HDWalletProvider({mnemonic:{phrase:`${process.env.MNEMONIC}`}, providerOrUrl:`https://ropsten.infura.io/v3/${process.env.INFURA_ID}`})},
      network_id:3,
     },
/*
    ropsten: {
      provider: () => new HDWalletProvider('dove balance bargain cave recall verb pause innocent unusual boost vacuum dance', 'https://ropsten.infura.io/v3/75eefb9868c74cccb605c888eafaa629'),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
*/

  },

  // Set default mocha options here, use special reporters, etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.15",      // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
        optimizer: {
          enabled: false,
          runs: 200
        },
      //  evmVersion: "byzantium"
       }
    }
  },

};
