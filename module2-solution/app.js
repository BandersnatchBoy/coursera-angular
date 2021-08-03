(function () {
  'use strict';

  angular.module('ShoppingListCheckOff' , [])
  .controller('ToBuyController' , ToBuyController)
  .controller('AlreadyBoughtController' , AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var shoppingList = this;

    shoppingList.items = ShoppingListCheckOffService.getItemsToBuy();

    shoppingList.buyItem = function(itemIndex){
      ShoppingListCheckOffService.buyItem(itemIndex);
    };
  };

  AlreadyBoughtController.$inject ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bagList = this;

    bagList.items = ShoppingListCheckOffService.bagItem();
  };

  function ShoppingListCheckOffService(){
    var service = this;

    var itemsToBuy = [
      {name: "apples", quantity: "6"},
      {name:"bananas" , quantity: "4"},
      {name: "yogurt" , quantity: "14"},
      {name:"donuts" , quantity: "12"},
      {name: "eggs" , quantity: "16"}];

    var boughtItems = [];

    service.getItemsToBuy = function () {
      return itemsToBuy;
    };
    service.buyItem = function (itemIndex) {
      var removedItem = itemsToBuy.splice(itemIndex, 1);
      boughtItems.push(removedItem[0]);
    };
    service.bagItem = function () {
      return boughtItems;
    }
  };
})();
