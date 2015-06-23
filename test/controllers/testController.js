'use strict'

describe('testCtrl',testFunction);

function testFunction(){
   var scope;

   beforeEach(angular.mock.module('saBirdChecklist'));
   beforeEach(angular.mock.inject(function($rootScope, $controller){
      scope = new $rootScope.$new();
      $controller('testCtrl',{$scope:scope});
   }));
   it('should have been saved by Jesus',function(){
      expect(scope.test).toBe('Hello Jesus :-)');
   });
}