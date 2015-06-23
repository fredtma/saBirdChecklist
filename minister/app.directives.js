angular.module('saBirdChecklist.directives',[])
   .directive('mySearch',mySearch);
/*
priority:10, set the order it will be redered
transclude:true// wrap a directive around content. if u want isolated scope 2 contain parent scope values. ng-transclude says where to put the transcluded content.
compile:function(elem,attr){iyona.on('COMPILE',elem,attr); return function(scope,elem,attrs){}},//perform any DOM transformation before link, MUST return a link function
link:function(scope,elem,attrs){console.info('SCOPE',scope.service,elem,attrs);}//more like the initiator
scope:true,//use a child scope tha inherits from parent
scope:{},//use a new isolated scope: good for resuable components
      {variable:'@variable'} or {variable:'@'} one way binding, string only, binding is for passing strings.These strings support `{{}}` expressions for interpolated values.
      {variable:'=variable'} or {variable:'='} two way binding, with complex data
      {functionName:'&amp;'} & calls parent function name
controller:['$scope','$compile','$element','$timeout',listsCtrl]//more like the action taken after creation & calling a service
require: '?ngModel', // get a hold of NgModelController
require: '^nameOfRequiredDirective', // get a hold of an other directive
^ -- Look for the controller on parent elements, not just on the local scope
? -- Don't raise an error if the controller isn't found
*/
function mySearch(){
   return {
      restrict:'AE',
      replace:true,
      scope:false,
      templateUrl:'cera/directives/mySearch.html'
   };
}
