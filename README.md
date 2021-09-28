# Supply Chain Exercise

The Supply Chain directory is a truffle project that contains the required
contract, migration and test files. In this exercise you are going to implement
the SupplyChain.sol contract and write some tests in Solidity.

## Instructions

Clone this repo to your local machine.

Follow the comments outlined in SupplyChain.sol (in the contracts directory) to
implement its functions. We have written a set of tests (in javascript) to
determine if your implementation is correct. As an additional challenge, try
writing some Solidity tests in TestSupplyChain.sol.

To test your implementation run `$ truffle test` from the terminal in the
project directory. There are **23 pending tests** that you must pass to complete
this exercise.

Similar to the Simple Bank Exercise, check out the test file to see the tests that define the behavior of the
SupplyChain smart contract. 

<!-- Notice the tests are in `it` blocks and have a
`skip` modifier, which disables the test. To enable the test, remove the
`.skip` modifier. Tests can have two modifiers: `skip` which skips the test,
and `only` which runs only that test. But what if more than one test have the
`only` modifier you may ask? Well only those test marked such will be executed. -->

### State variables

  - [ ] should have an owner
    <details><summary>:book:</summary>

    The contract should have an owner, of type address that is public.
    **hint:** define a public variable `owner` of type address

    </details>

  - [ ] should have an skuCount
    <details><summary>:book:</summary>

    The contract will keep track of the
    [sku](https://en.wikipedia.org/wiki/Stock_keeping_unit)s in our supply
    chain. Each item for sale will have a unique sku number. 

    **hint**: define a public variable called `skuCounter` of type uint

    </details>

### enum State

Items can exist in our Supply chain domain in a few states. In Solidity an
`enum` can be used to represent these different states. Remove the `skip`
annotation from the enum tests to proceed.

  - [ ] should define `ForSale` for when an item is put on sale
  - [ ] should define `Sold` for when an item has been purchased
  - [ ] should define `Shipped` for when an item has been shippd to the buyer
  - [ ] should define `Received` for when the shipped item has been received by the buyer

### Item struct

How do we describe an item in our supply chain? It is a union of properties:
`name`, `sku`, `price`, `state`, `seller` and `buyer`. We can use a Solidity
`struct` to model this Item. Remove the `skip` annotation from the `Item
struct` tests and proceed.

  - [ ] should have a `name`
  - [ ] should have a `sku`
  - [ ] should have a `price`
  - [ ] should have a `state`
  - [ ] should have a `seller`
  - [ ] should have a `buyer`

### SupplyChain Use cases

**NOTE** Before proceeding, you should un-comment the  `fetchItem` function in the contract. This function is necessary to validate the remaining tests.

  - [ ] should add an item with the provided name and price
    <details><summary>:book:</summary>
    use case: As a seller, I want to add an item for sale. I should 
    </details>
  - [ ] should emit a LogForSale event when an item is added
    <details><summary>:book:</summary>
    use case: Whenever an item is added (placed for sale), the contract should
    emit a `LogForSale` event
    </details>
  - [ ] should allow someone to purchase an item and update state accordingly
    <details><summary>:book:</summary>
    use case: As a buyer, I want to purchase an item that is for sale.
    </details>
 - [ ] should error when not enough value is sent when purchasing an item
    <details><summary>:book:</summary>
    use case: A buyer will be notified when they do not have enough funds for the purchase
    </details>
  - [ ] should emit LogSold event when and item is purchased
    <details><summary>:book:</summary>
    use case: Whenever an item is bought (sold), the contract should emit a "LogSold" event
    </details>
  - [ ] should revert when someone that is not the seller tries to call shipItem()
    <details><summary>:book:</summary>
    use case: As a seller, only I can ship a bought item
    </details>
  - [ ] should allow the seller to mark the item as shipped
    <details><summary>:book:</summary>
    use case : Whenever an item is shipped, the seller should be able to mark the item as shipped
    </details>
  - [ ] should emit a LogShipped event when an item is shipped
    <details><summary>:book:</summary>
    use case: Whenever the item is shipped, the contract should emit a "LogShipped" event
    </details>
  - [ ] should allow the buyer to mark the item as received
    <details><summary>:book:</summary>
    use case: Whenever an item is recieved, the buyer should be able to mark the item as received
    </details>
  - [ ] should revert if an address other than the buyer calls receiveItem()
    <details><summary>:book:</summary>
    use case: As a buyer, only I can mark the item as received
    </details>
  - [ ] should emit a LogReceived event when an item is received
    <details><summary>:book:</summary>
    use case: Whenever an item is received, the contract should emit a "LogReceived" event
    </details>
