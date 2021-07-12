# Supply Chain Exercise

The Supply Chain directory is a truffle project that contains the required
contract, migration and test files. In this exercise you are going to implement
the SupplyChain.sol contract and write some tests in Solidity.

Clone this repo to your local machine.

Follow the comments outlined in SupplyChain.sol (in the contracts directory) to
implement its functions. We have written a set of tests (in javascript) to
determine if your implementation is correct. As an additional challenge, try
writing some Solidity tests in TestSupplyChain.sol.

To test your implementation run `$ truffle test` from the terminal in the project directory. There are 11 pending tests that you must pass to complete this exercise.

```console
$ truffle tst

Compiling your contracts...
===========================
> Compiling ./contracts/Migrations.sol
> Compiling ./contracts/SupplyChain.sol
> Compiling ./test/TestSupplyChain.sol
> Artifacts written to /tmp/test--818087-Jm2qL2fMMUs6
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang



  Contract: SupplyChain
    - should add an item with the provided name and price
    - should emit a LogForSale event when an item is added
    - should allow someone to purchase an item and update state accordingly
    - should error when not enough value is sent when purchasing an item
    - should emit LogSold event when and item is purchased
    - should revert when someone that is not the seller tries to call shipItem()
    - should allow the seller to mark the item as shipped
    - should emit a LogShipped event when an item is shipped
    - should allow the buyer to mark the item as received
    - should revert if an address other than the buyer calls receiveItem()
    - should emit a LogReceived event when an item is received


  0 passing (105ms)
  11 pending

```

## Test Driven Development

This exercise is best completed following some aspects of Test Driven Development (TDD) . This is a methodology where tests are written before code in order to make incremntal changes in program behavior. TDD has many appealing benefits and I encourage you to investigate it further.

Before we get into utilize specific contract bha
The first tests we will use to drive our contract development will be 

To enable a test, remove the `skip` keyword. For example, change
```JavaScript
  it.skip(...
```
to
```JavaScript
  it(...
```

## Instructions



1. uncomment the helper function and implement the global variabls to gt errors
   to go away.
   ```console
    project:/contracts/SupplyChain.sol:138:12: DeclarationError: Undeclared identifier.
    project:/contracts/SupplyChain.sol:131:12: DeclarationError: Undeclared identifier.
        name = items[_sku].name;
               ^---^
    ,project:/contracts/SupplyChain.sol:132:11: DeclarationError: Undeclared identifier.
        sku = items[_sku].sku;
              ^---^
    ,project:/contracts/SupplyChain.sol:133:13: DeclarationError: Undeclared identifier.
        price = items[_sku].price;
                ^---^
    ,project:/contracts/SupplyChain.sol:134:18: DeclarationError: Undeclared identifier.
        state = uint(items[_sku].state);
                     ^---^
    ,project:/contracts/SupplyChain.sol:135:14: DeclarationError: Undeclared identifier.
        seller = items[_sku].seller;
                 ^---^
    ,project:/contracts/SupplyChain.sol:136:13: DeclarationError: Undeclared identifier.
        buyer = items[_sku].buyer;
                ^---^

    Compilation failed. See above.
   ```

If your tests do not pass, modify the contract, recompile, redeploy and retest. Iterate until all of the tests pass.

## A note on testing

Check out the testing files to see how tests are implemented in Javascript. We will go over the details of implementing tests later in the course.
