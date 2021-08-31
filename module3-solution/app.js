(function () {
  'use strict';

  angular.module('NarrowItDownApp' , [])
  .controller('NarrowItDownController' , NarrowItDownController)
  .service('MenuSearchService' , MenuSearchService)
  .directive('foundItems' , FoundItemsDirective)

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      Restrict: 'E',
      scope: {
        items: '<',
        onRemove: '&',
        isValid: '<'
      }
    };
    return ddo;
  }

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService){
    var userSearch = this;

    userSearch.searchTerm = "";
    userSearch.found = [];
    userSearch.valid = true;

    userSearch.search = function () {
      if(searchIsEmpty(userSearch.searchTerm)){
        userSearch.found = [];
        userSearch.valid = false;
        return;
      };

      var searchForItems = MenuSearchService.getMatchedMenuItems(userSearch.searchTerm);

      searchForItems.then(function(result){
        userSearch.found = result;
        userSearch.valid = (result.length > 0);
      })
      .catch(function(error) {
        console.log("This program errored out in MenuSearchService.getMathchedMenuItems");
      });
    };

    userSearch.removeItem = function (index){
      userSearch.found.splice(index, 1);
    };

    function  searchIsEmpty (searchString) {
      return searchString.replace(/\s/g,"").length === 0;
    };
  }
  MenuSearchService.$inject = ['$http']
  function MenuSearchService($http){
     var service = this;

     service.getMatchedMenuItems = function(searchTerm) {

       return $http({
         method: "GET",
         url:"https://davids-restaurant.herokuapp.com/menu_items.json",
       }).then (function (response){

          var foundItems = response.data.menu_items;

          return foundItems.filter( function (item){
            return item.name.toLowerCase().includes(searchTerm.toLowerCase());
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
  }
})();
