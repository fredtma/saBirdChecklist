'use strict';
xdescribe('MAIN CONTROLLER -',mainController);

function mainController(){
   var ctrl,scope,online,helper,$rootScope,$q,$httpBackend,$ionicModal,$controller;
   window.uTesting = 9876;

   beforeEach(angular.mock.module('saBirdChecklist.controllers'));
   beforeEach(function(){//insert services and controllers
      angular.mock.module('ionic');
      angular.mock.module('saBirdChecklist.services');
   });
   beforeEach(angular.mock.inject(function(_$httpBackend_, _$rootScope_, _$controller_, _online_, _helper_, _$q_,_$ionicModal_){
      $httpBackend   = _$httpBackend_;
      $rootScope     = _$rootScope_;
      scope          = new $rootScope.$new();
      scope.testing  = true;
      if(!isset(scope.modal))scope.modal = {hide:function(){},remove:function(){}};//fake function to hide modal
      online         = _online_;
      helper         = _helper_;
      $q             = _$q_;
      $ionicModal    = _$ionicModal_;
      $controller    = _$controller_;

      localStorage.removeItem('USER_NAME');
      $httpBackend.when('GET','cera/dashboard.html').respond(200);
      $httpBackend.when('GET','cera/main.html').respond(200);
      //$httpBackend.when('GET',/\.html$/).respond(200);
      spyOn(helper,'loginModal');
      spyOn(helper,'goTo');
      //spyOn(online,'post');
   }));
   beforeEach(function(){
      ctrl = $controller('mainCtrl',{$scope:scope,online:online,helper:helper});
   });

   afterEach(function() {
       //$httpBackend.verifyNoOutstandingExpectation();
       //$httpBackend.verifyNoOutstandingRequest();
   });

   it('TEST: USER NOT LOGIN',function(){

      $rootScope.$digest();
      expect(scope.module.forgot).toBeDefined();
      expect(scope.module.login).toBeDefined();
      expect(scope.module.reg).toBeDefined();
      expect(scope.service.row).toBe(false);
      expect(scope.service.modal).toBeUndefined();
      expect(helper.loginModal).toHaveBeenCalled();
      expect(helper.loginModal).toHaveBeenCalledWith(scope);
      expect(helper.loginModal.calls.count()).toEqual(1);
   });
   it('TEST: FORGOT PASSWORD',function(){

      scope.father.username = 'tshimanga@gmail.com';
      var response = {"rows":[{"email":"tshimanga@gmail.com","username":"ftshimanga"}],"length":1,"source":"generated","mail":{"msg":"Local Password reminder sent to tshimanga@gmail.com","status":true}},
      message = {"militia":"oblitus","u":scope.father.username},forgot;
      $httpBackend.expect('POST','http://demo.xpandit.co.za/aura/i/aliquis',message).respond(response);
      $httpBackend.when('POST','http://demo.xpandit.co.za/aura/i/aliquis',message).respond(response);
      forgot = scope.module.forgot();
      $httpBackend.flush();

      //expect(online.post.calss.count()).toEqual(1);
      expect(scope.service.forgot).toBeTruthy();
      expect(forgot.then).toBeDefined();
      expect(forgot.$$state.value.mail.status).toBeTruthy();
      expect(scope.service.msg).toBe(response.mail.msg);
   });
   describe("SUB MAIN CONTROLLER REGISTRATION --",function(){
      var $idb={};
      beforeEach(function(done){
         scope.module.reg();
         setTimeout(function(){done();},1300);
      });

      it('TEST: USER REGISTERING',function(done){

         scope.service.$idb.then(function(idb){
            $idb = idb;
            iyona.info("PROMISE IDB",'darkblue',$idb);
         }).catch(function(no,event){
            iyona.err("IDB",no,event);
         });
         $rootScope.$digest();
         expect(helper.goTo).toHaveBeenCalledWith('main.profile',{jesua:'new'});
         expect($idb.idb).toBeDefined();
         expect($idb.read).toBeDefined();
         expect($idb.idb.constructor).toBe(IDBDatabase);
         expect($idb.iRequest instanceof IDBOpenDBRequest).toBeTruthy();
         done();
      });
   });
   it('TEST: LOGIN REQUEST',function(){

      var url = sessionStorage.SITE_ALIQUIS+","+sessionStorage.SITE_AURA,u,p,response,row;
      scope.father.username = u = 'fredtma', scope.father.password = p = 'Qwerty12';
      response = {"rows":[{"id":"1","username":"fredtma","name":"Frederick Tshimanga","jesua":"e3183f045ae7acb749c16f18cb410899","level":"super","email":"tshimanga@gmail.com","img":null,"sess":"e7t6bpcoj8nfsa5rpaa3ti7rb1","aditum":[]}],"length":1,"source":"generated"};

      $httpBackend.expect('POST',url,{"u":u,"p":md5(p)}).respond(response);
      $httpBackend.when('POST',url,{"u":u,"p":md5(p)}).respond(response);
      scope.module.login();
      $httpBackend.flush();
      row = impetroUser();

      expect(scope.service.forgot).toBeFalsy();
      expect(row.operarius).toBe(scope.father.username);
      expect(row.avatar).toBeDefined();
      expect(row.jesua.length).toBe(32);
      expect(helper.goTo).toHaveBeenCalled();
   });
}