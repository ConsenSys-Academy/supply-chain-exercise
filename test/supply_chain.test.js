let BN = web3.utils.BN;
let SupplyChain = artifacts.require("SupplyChain");
let { catchRevert } = require("./exceptionsHelpers.js");
const { items: ItemStruct, isDefined, isPayable, isType } = require("./ast-helper");

contract("SupplyChain", function (accounts) {
  const [_owner, alice, bob] = accounts;
  const emptyAddress = "0x0000000000000000000000000000000000000000";

  const price = "1000";
  const excessAmount = "2000";
  const name = "book";

  let instance;

  beforeEach(async () => {
    instance = await SupplyChain.new();
  });

  describe("Variables", () => {
    it("should have an owner", async () => {
      assert.equal(typeof instance.owner, 'function', "the contract has no owner");
    });

    it("should have an skuCount", async () => {
      assert.equal(typeof instance.skuCount, 'function', "the contract has no skuCount");
    });

    describe("enum State", () => {
      let enumState;
      before(() => {
        enumState = SupplyChain.enums.State;
        assert(
          enumState,
          "The contract should define an Enum called State"
        );
      });

      it("should define `ForSale`", () => {
        assert(
          enumState.hasOwnProperty('ForSale'),
          "The enum does not have a `ForSale` value"
        );
      });

      it("should define `Sold`", () => {
        assert(
          enumState.hasOwnProperty('Sold'),
          "The enum does not have a `Sold` value"
        );
      });

      it("should define `Shipped`", () => {
        assert(
          enumState.hasOwnProperty('Shipped'),
          "The enum does not have a `Shipped` value"
        );
      });

      it("should define `Received`", () => {
        assert(
          enumState.hasOwnProperty('Received'),
          "The enum does not have a `Received` value"
        );
      });
    })

    describe("Item struct", () => {
      let subjectStruct;

      before(() => {
        subjectStruct = ItemStruct(SupplyChain);
        assert(
          subjectStruct !== null, 
          "The contract should define an `Item Struct`"
        );
      });

      it("should have a `name`", () => {
        assert(
          isDefined(subjectStruct)("name"), 
          "Struct Item should have a `name` member"
        );
        assert(
          isType(subjectStruct)("name")("string"), 
          "`name` should be of type `string`"
        );
      });

      it("should have a `sku`", () => {
        assert(
          isDefined(subjectStruct)("sku"), 
          "Struct Item should have a `sku` member"
        );
        assert(
          isType(subjectStruct)("sku")("uint"), 
          "`sku` should be of type `uint`"
        );
      });

      it("should have a `price`", () => {
        assert(
          isDefined(subjectStruct)("price"), 
          "Struct Item should have a `price` member"
        );
        assert(
          isType(subjectStruct)("price")("uint"), 
          "`price` should be of type `uint`"
        );
      });

      it("should have a `state`", () => {
        assert(
          isDefined(subjectStruct)("state"), 
          "Struct Item should have a `state` member"
        );
        assert(
          isType(subjectStruct)("state")("State"), 
          "`state` should be of type `State`"
        );
      });

      it("should have a `seller`", () => {
        assert(
          isDefined(subjectStruct)("seller"), 
          "Struct Item should have a `seller` member"
        );
        assert(
          isType(subjectStruct)("seller")("address"), 
          "`seller` should be of type `address`"
        );
        assert(
          isPayable(subjectStruct)("seller"), 
          "`seller` should be payable"
        );
      });

      it("should have a `buyer`", () => {
        assert(
          isDefined(subjectStruct)("buyer"), 
          "Struct Item should have a `buyer` member"
        );
        assert(
          isType(subjectStruct)("buyer")("address"), 
          "`buyer` should be of type `address`"
        );
        assert(
          isPayable(subjectStruct)("buyer"), 
          "`buyer` should be payable"
        );
      });
    });
  });

  describe("Use cases", () => {
    it("should add an item with the provided name and price", async () => {
      await instance.addItem(name, price, { from: alice });

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[0],
        name,
        "the name of the last added item does not match the expected value",
      );
      assert.equal(
        result[2].toString(10),
        price,
        "the price of the last added item does not match the expected value",
      );
      assert.equal(
        result[3].toString(10),
        SupplyChain.State.ForSale,
        'the state of the item should be "For Sale"',
      );
      assert.equal(
        result[4],
        alice,
        "the address adding the item should be listed as the seller",
      );
      assert.equal(
        result[5],
        emptyAddress,
        "the buyer address should be set to 0 when an item is added",
      );
    });

    it("should emit a LogForSale event when an item is added", async () => {
      let eventEmitted = false;
      const tx = await instance.addItem(name, price, { from: alice });

      if (tx.logs[0].event == "LogForSale") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding an item should emit a For Sale event",
      );
    });

    it("should allow someone to purchase an item and update state accordingly", async () => {
      await instance.addItem(name, price, { from: alice });
      var aliceBalanceBefore = await web3.eth.getBalance(alice);
      var bobBalanceBefore = await web3.eth.getBalance(bob);

      await instance.buyItem(0, { from: bob, value: excessAmount });

      var aliceBalanceAfter = await web3.eth.getBalance(alice);
      var bobBalanceAfter = await web3.eth.getBalance(bob);

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Sold,
        'the state of the item should be "Sold"',
      );

      assert.equal(
        result[5],
        bob,
        "the buyer address should be set bob when he purchases an item",
      );

      assert.equal(
        new BN(aliceBalanceAfter).toString(),
        new BN(aliceBalanceBefore).add(new BN(price)).toString(),
        "alice's balance should be increased by the price of the item",
      );

      assert.isBelow(
        Number(bobBalanceAfter),
        Number(new BN(bobBalanceBefore).sub(new BN(price))),
        "bob's balance should be reduced by more than the price of the item (including gas costs)",
      );
    });

    it("should error when not enough value is sent when purchasing an item", async () => {
      await instance.addItem(name, price, { from: alice });
      await catchRevert(instance.buyItem(0, { from: bob, value: 1 }));
    });

    it("should emit LogSold event when and item is purchased", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      const tx = await instance.buyItem(0, { from: bob, value: excessAmount });

      if (tx.logs[0].event == "LogSold") {
        eventEmitted = true;
      }

      assert.equal(eventEmitted, true, "adding an item should emit a Sold event");
    });

    it("should revert when someone that is not the seller tries to call shipItem()", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: price });
      await catchRevert(instance.shipItem(0, { from: bob }));
    });

    it("should allow the seller to mark the item as shipped", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Shipped,
        'the state of the item should be "Shipped"',
      );
    });

    it("should emit a LogShipped event when an item is shipped", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      const tx = await instance.shipItem(0, { from: alice });

      if (tx.logs[0].event == "LogShipped") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding an item should emit a Shipped event",
      );
    });

    it("should allow the buyer to mark the item as received", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });
      await instance.receiveItem(0, { from: bob });

      const result = await instance.fetchItem.call(0);

      assert.equal(
        result[3].toString(10),
        SupplyChain.State.Received,
        'the state of the item should be "Received"',
      );
    });

    it("should revert if an address other than the buyer calls receiveItem()", async () => {
      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });

      await catchRevert(instance.receiveItem(0, { from: alice }));
    });

    it("should emit a LogReceived event when an item is received", async () => {
      var eventEmitted = false;

      await instance.addItem(name, price, { from: alice });
      await instance.buyItem(0, { from: bob, value: excessAmount });
      await instance.shipItem(0, { from: alice });
      const tx = await instance.receiveItem(0, { from: bob });

      if (tx.logs[0].event == "LogReceived") {
        eventEmitted = true;
      }

      assert.equal(
        eventEmitted,
        true,
        "adding an item should emit a Shipped event",
      );
    });

  });

});
