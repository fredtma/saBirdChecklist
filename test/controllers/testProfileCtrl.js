'use strict';
describe('PROFILE CONTROLLER -',mainController);

function mainController(){
   var jesua,list,ctrl,scope,$stateParams,$rootScope,$q,$httpBackend,$controller,crud,$state,online,$idb;
   window.uTesting = 9876;

   beforeEach(angular.mock.module('saBirdChecklist.controllers'));
   beforeEach(function(){//insert services and controllers
      angular.mock.module('ionic');
      angular.mock.module('saBirdChecklist.services');
   });
   beforeEach(function(done){iyona.info('alpha');
      angular.mock.inject(function(_$httpBackend_, _$rootScope_, _$controller_, _crud_, _$state_, _$q_, _$stateParams_,_online_){
         iyona.info('starts');
         $httpBackend   = _$httpBackend_;
         $rootScope     = _$rootScope_;
         $controller    = _$controller_;
         crud           = _crud_;
         $state         = _$state_;
         $q             = _$q_;
         $stateParams   = _$stateParams_;
         online         = _online_;
         scope          = $rootScope.$new();
         scope.testing  = true;
         if(jesua) $idb = online.principio('registration');//start the DB
         else $idb = online.principio('user');//start the DB
   //      spyOn(online,'principio');
         setTimeout(function(){done();iyona.info('GENESIS','blue');},500);
      })
   });
   beforeEach(function(done){iyona.info('one');

      $stateParams.jesua = jesua? jesua:'new';
      $stateParams.list = list? list:'';

      ctrl = function(){$controller('profileCtrl',{$scope:scope,crud:crud,$state:$state});}
      ctrl();
      var dataForm = {dataForm:{$dirty: true, $valid:true}};
      scope.formScope = dataForm;
      //spyOn(crud,'set');
      setTimeout(function(){done(); iyona.info("DEMAND1","blue",this);},500);
   });


   describe("SUB: CREATE - ",function(){
      beforeEach(function(){iyona.info('two');
         //ctrl();
         $idb.then(function(db){ db.idb.transaction('populus','readwrite').objectStore('populus').clear(); });
         //setTimeout(function(){done(); iyona.info("DEMAND1 Create","blue",this);},200);
      });
      it("TEST: PROFILE START",function(done){iyona.info("CREATE1","blue");

         localStorage.removeItem('USER_NAME');
         var conf = dynamis.get("SITE_CONFIG");
         var eternal = dynamis.get("eternal",true);

         expect(conf.formValidation).toBeTruthy();
         expect(conf.Worker).toBeTruthy();
         expect(typeof eternal).toBe("object");
         expect(scope.module.action).toBeDefined();
         expect(scope.module.alpha).toBeDefined();
         expect(typeof scope.module.delta).toBe('function');
         expect(typeof scope.module.initForm).toBe('function');
         expect(scope.service.patterns.pass1 instanceof Array).toBeTruthy();
         expect(scope.service.patterns.pass1[0]).toBe("((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})");
         done();
      });
      it("TEST: PROFILE CREATION",function(done){iyona.info("CREATE2","blue");

         scope.service.year = 1980; scope.service.month = 12; scope.service.day = 27;scope.service.name = "Frederick Tshimanga";
         scope.father = {"id":"1","username":"fredtma","name":"Frederick Tshimanga","password":"Qwerty12","level":"super","email":"tshimanga@gmail.com","img":{"alpha":"image","type":"image/jpeg","icon":"profile.jpg"} };
         scope.module.submit();

         setTimeout(function(){
            $rootScope.$digest();
            jesua = scope.father.jesua;
            sessionStorage.jesua = jesua;
            expect(scope.father.created).toBeDefined();
            expect(dynamis.get("quaerere").eternal).toBeDefined();
            expect(scope.father.blossom.length).toEqual(32);
            expect(scope.father.dob).toBe('1980-12-27');
            registerUser(scope.father,false);
            done();
         },800);
      });
   });

   describe("SUB: UPDATE - ",function(){
      var user;
      beforeEach(function(){iyona.info('Three');
         //ctrl();
         user = impetroUser();
         //setTimeout(function(){iyona.info("DEMAND2 ","blue"); done();},500);
      });
      afterEach(function(){
         //$rootScope.$digest();
     });
      it("TEST: PROFILE UPDATE",function(done){ iyona.info("UPDATE1","blue");

         //scope.service.year = 1989; scope.service.month = 10; scope.service.day = 14;scope.service.name = "Miriam Tshimanga";
         //scope.father = {"id":"1","username":"fredtma","password":"Qwerty12","level":"super","email":"tshimanga@gmail.com","img":{"alpha":"image","type":"image/jpeg","icon":"profile.jpg"} };
         //scope.module.submit();
iyona.on("SCOPE",scope.service,scope.father,scope.service.promise);

         scope.service.promise.then(function(server){iyona.on("THREE",server);
            $rootScope.$digest();
            expect(scope.service.jesua).toEqual(jesua);
            expect(scope.father.jesua).toEqual(jesua);
            expect(scope.father.dob).toBe('1980-12-27');
            expect(typeof scope.module.delta).toBe("function");
         });
         $rootScope.$digest();
         setTimeout(function(){
            iyona.on('THREE-SCOPES',scope.father,scope.father.dob);
            expect(scope.service.jesua).toEqual(jesua);
            expect(scope.father.jesua).toEqual(jesua);
            expect(scope.father.dob).toBe('1980-12-27');
            expect(typeof scope.module.delta).toBe("function");
            done();
         },1000);

         //expect(scope.service.Tau).toEqual("sigma");
         //expect(crud.set).toHaveBeenCalled();
         //expect(crud.set).toHaveBeenCalledWith(scope,'populus','details');
      });
   });

}