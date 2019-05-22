/*

The public version of the file used for testing can be found here: https://gist.github.com/ConsenSys-Academy/7d59ba6ebe581c1ffcc981469e226c6e

This test file has been updated for Truffle version 5.0. If your tests are failing, make sure that you are
using Truffle version 5.0. You can check this by running "truffle version"  in the terminal. If version 5 is not
installed, you can uninstall the existing version with `npm uninstall -g truffle` and install the latest version (5.0)
with `npm install -g truffle`.

*/
let BN = web3.utils.BN
let SupplyChain = artifacts.require('SupplyChain')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('SupplyChain', function(accounts) {

    const owner = accounts[0]
    const alice = accounts[1]
    const bob = accounts[2]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    const price = "1000"
    const excessAmount = "2000"
    const name = "book"

    let instance

    beforeEach(async () => {
        instance = await SupplyChain.new()
    })

    it("should add an item with the provided name and price", async() => {
        const tx = await instance.addItem(name, price, {from: alice})
                
        const result = await instance.fetchItem.call(0)

        assert.equal(result[0], name, 'the name of the last added item does not match the expected value')
        assert.equal(result[2].toString(10), price, 'the price of the last added item does not match the expected value')
        assert.equal(result[3].toString(10), 0, 'the state of the item should be "For Sale", which should be declared first in the State Enum')
        assert.equal(result[4], alice, 'the address adding the item should be listed as the seller')
        assert.equal(result[5], emptyAddress, 'the buyer address should be set to 0 when an item is added')
    })

    it("should emit a LogForSale event when an item is added", async()=> {
        let eventEmitted = false
        const tx = await instance.addItem(name, price, {from: alice})
        
        if (tx.logs[0].event == "LogForSale") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding an item should emit a For Sale event')
    })

    it("should allow someone to purchase an item and update state accordingly", async() => {

        await instance.addItem(name, price, {from: alice})
        var aliceBalanceBefore = await web3.eth.getBalance(alice)
        var bobBalanceBefore = await web3.eth.getBalance(bob)

        await instance.buyItem(0, {from: bob, value: excessAmount})

        var aliceBalanceAfter = await web3.eth.getBalance(alice)
        var bobBalanceAfter = await web3.eth.getBalance(bob)

        const result = await instance.fetchItem.call(0)

        assert.equal(result[3].toString(10), 1, 'the state of the item should be "Sold", which should be declared second in the State Enum')
        assert.equal(result[5], bob, 'the buyer address should be set bob when he purchases an item')
        assert.equal(new BN(aliceBalanceAfter).toString(), new BN(aliceBalanceBefore).add(new BN(price)).toString(), "alice's balance should be increased by the price of the item")
        assert.isBelow(Number(bobBalanceAfter), Number(new BN(bobBalanceBefore).sub(new BN(price))), "bob's balance should be reduced by more than the price of the item (including gas costs)")
    })

    it("should error when not enough value is sent when purchasing an item", async()=>{
        await instance.addItem(name, price, {from: alice})
        await catchRevert(instance.buyItem(0, {from: bob, value: 1}))
    })

    it("should emit LogSold event when and item is purchased", async()=>{
        var eventEmitted = false

        await instance.addItem(name, price, {from: alice})
        const tx = await instance.buyItem(0, {from: bob, value: excessAmount})

        if (tx.logs[0].event == "LogSold") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding an item should emit a Sold event')
    })

    it("should revert when someone that is not the seller tries to call shipItem()", async()=>{
        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: price})
        await catchRevert(instance.shipItem(0, {from: bob}))
    })

    it("should allow the seller to mark the item as shipped", async() => {

        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: excessAmount})
        await instance.shipItem(0, {from: alice})
	
        const result = await instance.fetchItem.call(0)

        assert.equal(result[3].toString(10), 2, 'the state of the item should be "Shipped", which should be declared third in the State Enum')
    })

    it("should emit a LogShipped event when an item is shipped", async() => {
        var eventEmitted = false

        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: excessAmount})
        const tx = await instance.shipItem(0, {from: alice})

        if (tx.logs[0].event == "LogShipped") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
    })

    it("should allow the buyer to mark the item as received", async() => {
        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: excessAmount})
        await instance.shipItem(0, {from: alice})
        await instance.receiveItem(0, {from: bob})
	
        const result = await instance.fetchItem.call(0)

        assert.equal(result[3].toString(10), 3, 'the state of the item should be "Received", which should be declared fourth in the State Enum')
    })

    it("should revert if an address other than the buyer calls receiveItem()", async() =>{
        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: excessAmount})
        await instance.shipItem(0, {from: alice})
        
        await catchRevert(instance.receiveItem(0, {from: alice}))
    })

    it("should emit a LogReceived event when an item is received", async() => {
        var eventEmitted = false

        await instance.addItem(name, price, {from: alice})
        await instance.buyItem(0, {from: bob, value: excessAmount})
        await instance.shipItem(0, {from: alice})
        const tx = await instance.receiveItem(0, {from: bob})
        
        if (tx.logs[0].event == "LogReceived") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
    })

})
