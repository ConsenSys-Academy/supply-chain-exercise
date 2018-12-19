/*

Solidity compiler version 0.4.25 is secified as Truffle v5.0 comes with compiler version 0.5.
Feel free to use Solidity version 0.5

*/

module.exports = {
  compilers: {
    solc: '0.4.25'
  },  
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
