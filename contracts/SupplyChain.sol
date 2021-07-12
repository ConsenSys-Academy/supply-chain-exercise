// SPDX-License-Identifier: MIT
pragma solidity >=0.5.16 <0.9.0;

contract SupplyChain {

  // add a variable called owner
  //
  // <code goes here...>

  // add a variable called skuCount to track the most recent sku #
  //
  // <code goes here...>

  // add a public mapping called `items`, that maps a uint to an Item
  //
  // <code goes here...>

  // create an enum called State with 4 states:
  //   ForSale, Sold, Shipped, Received
  // (declaring them in this order is important for testing)
  //
  // <code goes here...>

  // Create a struct named Item.
  // Here, add a name, sku, price, state, seller, and buyer
  // We've left you to figure out what the appropriate types are,
  // if you need help you can ask around :)
  // Be sure to add "payable" to addresses that will be handling value transfer
  //
  // <code goes here...>
  
  // Create 4 events with the same name as each possible State (see above)
  // Prefix each event with "Log" for clarity, so the forSale event will be
  // called "LogForSale" Each event should accept one argument, the sku 
  //
  // <code goes here...>

  // Create a modifer, `isOwner` that checks if the msg.sender is the owner of
  // the contract
  // <code goes here...>

  modifier verifyCaller (address _address) { 
    // require (msg.sender == _address); 
    _;
  }

  modifier paidEnough(uint _price) { 
    // require(msg.value >= _price); 
    _;
  }

  modifier checkValue(uint _sku) {
    //refund them after pay for item (why it is before, _ checks for logic before func)
    _;
    // uint _price = items[_sku].price;
    // uint amountToRefund = msg.value - _price;
    // items[_sku].buyer.transfer(amountToRefund);
  }

  // For each of the following modifiers, use what you learned about modifiers
  // to give them functionality. For example, the forSale modifier should
  // require that the item with the given sku has the state ForSale. Note that
  // the uninitialized Item.State is 0, which is also the index of the ForSale
  // value, so checking that Item.State == ForSale is not sufficient to check
  // that an Item is for sale. Hint: What item properties will be non-zero when
  // an Item has been added?

  // modifier forSale
  // modifier sold(uint _sku) 
  // modifier shipped(uint _sku) 
  // modifier received(uint _sku) 

  constructor() public {
    // 1. Set the owner to the transaction sender
    // 2. Initialize the sku count to 0. Question, is this necessary?
  }

  function addItem(string memory _name, uint _price) public returns (bool) {
    // 1. Create a new item and put in array
    // 2. Increment the skuCount by one
    // 3. Emit the appropriate event
    // 4. return true

    // hint:
    // items[skuCount] = Item({
    //  name: _name, 
    //  sku: skuCount, 
    //  price: _price, 
    //  state: State.ForSale, 
    //  seller: msg.sender, 
    //  buyer: address(0)
    //});
    //
    //skuCount = skuCount + 1;
    // emit LogForSale(skuCount);
    // return true;
  }

  // Implement this buyItem function. 
  // 1. it should be payable in order to receive refunds
  // 2. this should transfer money to the seller, 
  // 3. set the buyer as the person who called this transaction, 
  // 4. set the state to Sold. 
  // 5. this function should use 3 modifiers to check 
  //    - if the item is for sale, 
  //    - if the buyer paid enough, 
  //    - check the value after the function is called to make 
  //      sure the buyer is refunded any excess ether sent. 
  // 6. call the event associated with this function!
  function buyItem(uint sku) public {}

  // 1. Add modifiers to check:
  //    - the item is sold already 
  //    - the person calling this function is the seller. 
  // 2. Change the state of the item to shipped. 
  // 3. call the event associated with this function!
  function shipItem(uint sku) public {}

  // 1. Add modifiers to check 
  //    - the item is shipped already 
  //    - the person calling this function is the buyer. 
  // 2. Change the state of the item to received. 
  // 3. Call the event associated with this function!
  function receiveItem(uint sku) public {}

  // Uncomment the following code block. it is needed to run tests
  /* function fetchItem(uint _sku) public view */ 
  /*   returns (string memory name, uint sku, uint price, uint state, address seller, address buyer) */ 
  /* { */
  /*   name = items[_sku].name; */
  /*   sku = items[_sku].sku; */
  /*   price = items[_sku].price; */
  /*   state = uint(items[_sku].state); */
  /*   seller = items[_sku].seller; */
  /*   buyer = items[_sku].buyer; */
  /*   return (name, sku, price, state, seller, buyer); */
  /* } */
}
