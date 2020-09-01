module.exports = {
  compilers: {
    solc: {
      version: "0.6.12",
    }
  },
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    }
  }
};
