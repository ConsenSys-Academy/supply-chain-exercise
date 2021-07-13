# Supply Chain Exercise

The Supply Chain directory is a truffle project that contains the required
contract, migration and test files. In this exercise you are going to implement
the SupplyChain.sol contract and write some tests in Solidity.

Clone this repo to your local machine.

Follow the comments outlined in SupplyChain.sol (in the contracts directory) to
implement its functions. We have written a set of tests (in javascript) to
determine if your implementation is correct. As an additional challenge, try
writing some Solidity tests in TestSupplyChain.sol.

To test your implementation run `$ truffle test` from the terminal in the
project directory. There are **23 pending tests** that you must pass to complete
this exercise.

## Instructions

Check out the testing files to see how tests are implemented in Javascript. We
will go over the details of implementing tests later in the course.

For each of the items below, you will uncomment the associated JavaScript test
and then modify the Solidity contract to make the test pass.

### State variables

  - [ ] should have an owner
    <details><summary>click for hint</summary>

    The contract should have an owner, which is a an address and also public.
      - remove the `.skip` modifier to enable this test to begin

    ```JavaScript
    it.skip("should have an owner", async () => {
      assert.equal(typeof instance.owner, 'function', "the contract has no owner");
    });

    ```
    </details>

  - [ ] should have an skuCount
    <details><summary>click for hint</summary>

    The contract will keep track of the [sku](https://en.wikipedia.org/wiki/Stock_keeping_unit)s in our supply chain. Each item we sell will have a unique sku number. Lets implment that as a counter, called `skuCounter`

      - remove the `.skip` modifier to enable this test to begin

    ```JavaScript
    it.skip("should have an skuCount", async () => {
      assert.equal(typeof instance.skuCount, 'function', "the contract has no skuCount");
    });
    ```
    </details>

### enum State

  - [ ] should define `ForSale`
  - [ ] should define `Sold`
  - [ ] should define `Shipped`
  - [ ] should define `Received`

### Item struct

  - [ ] should have a `name`
  - [ ] should have a `sku`
  - [ ] should have a `price`
  - [ ] should have a `state`
  - [ ] should have a `seller`
  - [ ] should have a `buyer`

### SupplyChain Logic

  - [ ] should add an item with the provided name and price
  - [ ] should emit a LogForSale event when an item is added
  - [ ] should allow someone to purchase an item and update state accordingly
  - [ ] should error when not enough value is sent when purchasing an item
  - [ ] should emit LogSold event when and item is purchased
  - [ ] should revert when someone that is not the seller tries to call shipItem()
  - [ ] should allow the seller to mark the item as shipped
  - [ ] should emit a LogShipped event when an item is shipped
  - [ ] should allow the buyer to mark the item as received
  - [ ] should revert if an address other than the buyer calls receiveItem()
  - [ ] should emit a LogReceived event when an item is received
