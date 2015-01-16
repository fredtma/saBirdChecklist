angular.module('saBirdChecklist.controllers', [])
.controller('birdsCtrl',birdsCtrl)
.controller('dashboardCtrl',dashboardCtrl)
.controller('listCtrl',listCtrl)
.controller('listsCtrl',listsCtrl)
.controller('mainCtrl',mainCtrl)
.controller('profileCtrl',profileCtrl);

birdsCtrl.$inject = ['$scope','crud'];
function birdsCtrl($scope,crud){
   crud.set($scope,'ales','list');
}

dashboardCtrl.$inject  = ['$scope'];
function dashboardCtrl($scope) {
  $scope;
}

listCtrl.$inject = ['$scope','crud'];
function listCtrl($scope, crud) {

   $scope.father = {user: impetroUser().operarius};
   crud.set($scope,'album','details').then(function(scope){
      scope.module.linkOnlineCtrl =function(isNull,fields,mensa,child,childKey){
         scope.module.linkOnline(isNull,fields,mensa,child,childKey)
            .then(function(answer){
               if(answer==="Alpha"){//after successful alpha link
                  var newRow={jesua:child.jesua,name:child.name,bird:child.name,list:$scope.father.jesua,description:"",location:"",created: new Date().format('isoDateTime')};
                  if(!isset($scope.links['linkBird'].rows))$scope.links['linkBird'].rows = [];
                  $scope.links['linkBird'].rows.push(newRow);
               }
               else if(answer==="omegA"){
                  var tmp = objSearch($scope.links['linkBird'].rows,child.jesua); iyona.on("DELETE",tmp,$scope.links['linkBird'].rows);
                  $scope.links['linkBird'].rows.splice(tmp[1],1);//remove the linkBird
               }
            })
            .catch(function(){iyona.msg("Failed to link, an error occured on the server.");});
      };//linkOnlineCtrl
   });//crud
};

listsCtrl.$inject = ['$scope','crud'];
function listsCtrl($scope, crud) {
   crud.set($scope,'album','list');
};

mainCtrl.$inject =['$scope', 'online', 'helper'];
function mainCtrl($scope, online, helper) {
   var row = impetroUser();
   if(ionic.Platform.isWebView() && isset(navigator.splashscreen)) navigator.splashscreen.hide();
   angular.extend($scope,{"module":{},"service":{"attempt":0},"father":{}});

   $scope.logoff        = function(){helper.logoff($scope);}
   $scope.module.forgot = callBack;
   $scope.module.login  = login;
   $scope.module.reg    = register;

   if(!row.operarius||false){row=null;helper.loginModal($scope);}
   else {$scope.profile = {"operarius":row.operarius,"givenname":row.nominis,"position":row.mail,"avatar":row.avatar||"img/default.jpg","jesua":row.jesua};}

   function callBack () {}
   function login(){
      var u,p,aliquis,msg="Please enter the username/password.";iyona.on("LOGIN");

      u=$scope.father.username;p=md5($scope.father.password);//aliquis
      if(!u || !p) {$scope.service.msg = msg; iyona.msg(msg); return false;}
      aliquis = sessionStorage.SITE_ALIQUIS||'http://demo.xpandit.co.za/aura/aliquis';
      aliquis+= ","+sessionStorage.SITE_AURA;
      online.post(aliquis,{"u":u,"p":p},function(server){

         if(server && server.length){
            row=server.rows[0];
            row.procurator=(row['level']==='super')?1:0;
            registerUser(row);//will set the USER_NAME & setting.config()
            online.principio();//start and set local db
            $scope.modal.remove(); helper.goTo('main.dashboard');
            $scope.profile = {"operarius":row.username,"givenname":row.name,"position":row.email,"avatar":row.img||"img/default.jpg","jesua":row.jesua};
            //@todo:change login details.
         }else{
            $scope.service.attempt++;$scope.service.msg = msg = 'Failed login.Fill in your email address & click on forgot password';
            iyona.msg(msg,false," danger bold");iyona.on("Failed login",server);
         }
      });//fetch callback
   };
   function register(){
      $scope.modal.hide();
      helper.goTo('main.profile',{jesua:'new'});
   }

}

profileCtrl.$inject = ['$scope','crud','$state','online'];
function profileCtrl($scope,crud,$state,online){
   crud.set($scope,'populus','details');
   $scope.exp = "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})";

   $scope.module.alpha=alpha;
   $scope.module.delta=delta;
   $scope.$on("failForm",failForm);
   $scope.$on("newForm",newForm);
   $scope.$on("readyForm",readyForm);

   function alpha(callback){profileCheck();callback.call($scope,null,{changeLocation:false});}
   function delta(callback){profileCheck();callback();}
   function failForm(data,notitia){$scope.father.password="";/* prevent md5 */}
   function newForm(data,notitia){
      if(notitia.transaction==="Alpha") {
         registerUser({"username":$scope.father.email,"aditum":[],"name":$scope.service.name,"jesua":$scope.father.jesua,"procurator":0,"sess":null,"email":$scope.father.email});//will set the USER_NAME & setting.config()
         online.principio();//start and set local db
         iyona.msg("Hello and welcome "+$scope.service.name,true);
         $scope.$parent.profile = {"givenname":$scope.service.name,"position":$scope.father.email,"avatar":$scope.father.img||"img/default.jpg","jesua":$scope.father.jesua.alpha};
         $state.go("main.dashboard");
      }
   }
   function profileCheck(){
      if(isset($scope.service.name)){var name = $scope.service.name.split(" ");
      $scope.father.firstname = name[0];$scope.father.lastname  = name[1]||name[0];
      $scope.father.dob = $scope.service.year+'-'+$scope.service.month+'-'+$scope.service.day;}
      if(!$scope.father.jesua && $scope.father.password)$scope.father.password = md5($scope.father.password);//sulment les nouveaux mot de pass
   };
   function readyForm(data,notitia){
      if(typeof notitia.iota!=="undefined" && notitia.iota instanceof Array) {
         var dob = notitia.iota[0].dob;
         if(dob){
            dob = dob.split("-")||[];
            if(dob.length>2){ $scope.service.year=dob[0];$scope.service.month=dob[1];$scope.service.day=dob[2];
         }}
         $scope.service.name = notitia.iota[0].firstname+' '+notitia.iota[0].lastname;
      }
      else iyona.info("Could not set name",data,notitia);
      iyona.off("READY",$scope.service);
   }
}

