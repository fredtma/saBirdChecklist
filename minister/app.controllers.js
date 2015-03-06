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

listCtrl.$inject = ['$scope','crud','online'];
function listCtrl($scope, crud, online) {

   $scope.$on("newForm",newForm);
   $scope.$on("readyForm",readyForm);

   $scope.father = {user: impetroUser().operarius};
   crud.set($scope,'album','details').then(afterSet);//crud////aftre crud setting. set the linking functions

   function afterSet(scope){
      scope.module.linkOnlineCtrl =function(isNull,fields,mensa,child,childKey){
         isNull = !isset(isNull)? true: false;
         child[childKey] = (isNull)? $scope.father.jesua: null;//child.list, link the main child data with the father's jesua on link alpha

         var data={};//will be used to store main data and links
         angular.copy($scope.father,data);
         if(!data.links_['linkBird']) data.links_['linkBird'] = {rows:[]};
         addLink();

         scope.module.linkOnline(isNull,fields,mensa,child,childKey,data)
         .then(function(){$scope.father = data; iyona.info("Link complete ");})
         .catch(function(){iyona.msg("Failed to link, an error occured on the server.");});

         function addLink(){
            var tmp;
            if(isNull){//create the new link||gerund in father's
               var newRow={from_list:$scope.father.name, bird:child.name, list:$scope.father.jesua, description:"", location:"", created: new Date().format('isoDateTime'), modified: new Date().format('isoDateTime')};
               if(!isset(data.links_['linkBird'].rows))data.links_['linkBird'].rows = [];//make link an array wen empty

               tmp = objSearch(data.links_['linkBird'].rows,child.name,'bird'); //check if it does not already exist, so that it is not added
                iyona.off("ALPHA",tmp,child,$scope.father.jesua,data.links_['linkBird'].rows);
               if(tmp===false){ data.links_['linkBird'].rows.push(newRow); iyona.off("Added row");}
            }else{
               tmp = objSearch(data.links_['linkBird'].rows,child.name,'bird');
               iyona.off("DELETE",tmp,child,$scope.father.jesua,data.links_['linkBird'].rows);

               if(tmp){data.links_['linkBird'].rows.splice(tmp[1],1); iyona.off("Removed",data.links_['linkBird'].rows);}
               else child[childKey] = $scope.father.jesua;//if not found return the value
            }
         }
      };//linkOnlineCtrl
   }
   function newForm(data,notitia){}
   function readyForm(data,notitia){iyona.off("Form Ready");
      if($scope.father.links_ && !$scope.father.links_.ales)online.$idb.then(function($idb){$idb.read('ales',null).then(function(result){ $scope.father.links_.ales={rows:result}; }); });//wen ales empty fetch from document
      else if(!$scope.father.links_) iyona.info("The links_ property has not been setup.");
   }
};

listsCtrl.$inject = ['$scope','crud','online'];
function listsCtrl($scope, crud, online) {
   //prevent listing all
   online.srchOption = {"where":"ndxAlbumUser","is":impetroUser().operarius}
   crud.set($scope,'album','list');
};

mainCtrl.$inject =['$scope', 'online', 'helper'];
function mainCtrl($scope, online, helper) {
   var row = impetroUser();

   angular.extend($scope,{"module":{},"service":{"attempt":0},"father":{}});

   $scope.logoff        = function(){ helper.logoff($scope);};
   $scope.onlineSync    = onlineSync;
   $scope.module.forgot = callBack;
   $scope.module.login  = login;
   $scope.module.reg    = register;

   //LOGIN CHECK
   if(!row.operarius||false){row=null;helper.loginModal($scope);}
   else {online.principio(row.nominis);/*start DB*/ $scope.profile = {"operarius":row.operarius,"givenname":row.nominis,"position":row.mail,"avatar":row.avatar||"img/default.jpg","jesua":row.jesua};}

   function callBack () {}
   function login(){
      var u,p,aliquis,msg="Please enter the username/password.";

      u=$scope.father.username;p=md5($scope.father.password);//aliquis
      if(!u || !p) {$scope.service.msg = msg; iyona.msg(msg); return false;}
      aliquis = sessionStorage.SITE_ALIQUIS||'http://demo.xpandit.co.za/aura/aliquis';
      aliquis+= ","+sessionStorage.SITE_AURA;
      online.post(aliquis,{"u":u,"p":p},function(server){

         if(server && server.length){
            row=server.rows[0];
            row.procurator=(row['level']==='super')?1:0;
            registerUser(row);//will set the USER_NAME & setting.config()
            online.principio('login');//start and set local db
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
      online.principio('registration');//start and set local db
      helper.goTo('main.profile',{jesua:'new'});
   }

}

profileCtrl.$inject = ['$scope','crud','$state'];
function profileCtrl($scope,crud,$state){
   crud.set($scope,'populus','details');//.then(function(scope){
      $scope.module.alpha=alpha;
      $scope.module.delta=delta;
   //});
   //$scope.exp = "((?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{6,20})";


   $scope.$on("failForm",failForm);
   $scope.$on("newForm",newForm);
   $scope.$on("readyForm",readyForm);

   function alpha(callback){profileCheck();callback.call($scope,null,{changeLocation:false});}
   function delta(callback){profileCheck();callback();}
   function failForm(e,notitia){$scope.father.password="";/* prevent md5 */}
   function newForm(e,notitia){iyona.off("New form",e,notitia,$scope,$scope.$parent);
      if(notitia.transaction==="Alpha") {
         registerUser({"username":$scope.father.email,"aditum":[],"name":$scope.service.name,"jesua":$scope.father.jesua,"procurator":0,"sess":null,"email":$scope.father.email});//will set the USER_NAME & setting.config()
         iyona.msg("Hello and welcome "+$scope.service.name,true);
         _$("#notification").scope().profile = {"operarius":$scope.father.email,"givenname":$scope.service.name,"position":$scope.father.email,"avatar":$scope.father.img||"img/default.jpg","jesua":$scope.father.jesua};
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

