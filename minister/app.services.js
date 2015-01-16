angular.module('saBirdChecklist.services',['ngResource'])
   .service("crud",crud)
   .service("helper",helper)
   .service("online",online);

//############################################################################//
//CRUD                                                                        //
//############################################################################//
crud.$inject = ["online","helper","$stateParams","$timeout","$state","$q"];
function crud(online,helper,$stateParams,$timeout,$state,$q){
   var that=this,$db,$scope,curNode,curMensa,curDisplay,curTitle,nodeName,nodeDisplay,RECORD,consuetudinem={},submitFunction={};
   that.msg=msg;
   that.set=set;
   that.call=sessionStorage.SITE_AURA;
   that.submitFunction = {
      "new":function(){
         $scope.service.Tau = "Alpha";
         $scope.service.title = "New "+curTitle;
         if(typeof $scope.module.alpha==="function")$scope.module.alpha(function(ndx,opt){alpha(ndx,opt);}); else alpha();},
      "old":function(){
         $scope.service.Tau = "deLta";
         $scope.service.title = curTitle;
         if(typeof $scope.module.delta==="function")$scope.module.delta(function(){delta();}); else delta();},
      "rem":function(rem,ndx){
         rem = rem||$stateParams.jesua||$scope.father.jesua||$scope.service.jesua;
         if(typeof $scope.module.omega==="function")$scope.module.omega(function(){omega(rem,ndx);}); else omega(rem,ndx);}
   };

   function alpha(ndx,opt){iyona.info("Creating a new record");
      if(validateForm()===false){$scope.$broadcast("failForm");return false;}
      if(typeof $scope.father.created==="undefined") $scope.father.created = new Date().toISOString(); else if ($scope.father.created==="none") delete $scope.father.created;
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);

      RECORD  = new $db(basilia);
      RECORD.$save(function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server);return false;}
         var notitia = server.notitia;

         //give jesua and service.jesua new value
         iyona.off('stateParams',$stateParams.jesua,ndx,$scope.generations,$scope.father,$state.$current,$state);
         if($scope.generations && isset(ndx) && notitia.iota ) {$scope.generations[ndx].jesua = notitia.iota; }//wen there is an array of form
         else if(notitia.iota) {
            $scope.father.jesua  = notitia.iota;
            $scope.service.jesua = notitia.iota;//used in helper.action(); will change create to update
            $stateParams.jesua   = notitia.iota;
            if(!isset(opt) || (isset(opt) && opt.changeLocation!==false)){
               $state.go($state.$current,{"jesua":notitia.iota},{ location: true, inherit: true, relative: $state.$current, notify: true, reload:false });//change url when creating
            }
         }

         $scope.module.submit = that.submitFunction.old;//change the value of the submit function to delta//used in helper.action()
         setConsuetudinem(server.notitia);
         iyona.msg(server.notitia.msg,false,'balanced');
         $scope.$broadcast("newForm",server.notitia);
      });

   }//end function alpha
   function delta(){iyona.info("Updating a record");

      if(validateForm()===false){$scope.$broadcast("failForm");return false;}
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);
      var jesua   = $stateParams.jesua||$scope.father.jesua||$scope.service.jesua;//check the value of jesua from the scope or the url

      //delete RECORD.notitia;
//      angular.extend(RECORD,basilia);
      RECORD  = new $db(basilia);
      RECORD.$militia(function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server);return false;}
         var notitia = server.notitia;
         setConsuetudinem(server.notitia);
         iyona.msg(notitia.msg,false,'balanced');
         $scope.$broadcast("editForm",server.notitia);
      });
   }//end function delta
   function msg(msg,permanent,clss){
      if(!msg) return;
      iyona.info(msg);
      clss=!isset(clss)||clss===true? "balanced": (clss===false||clss===0)?"assertive":clss;
      clss=permanent!==true?clss+" blink_me":clss;
      $scope.$parent.msg = {"text":msg,"clss":clss};
      if(permanent!==true)$timeout(function(){$scope.$parent.msg=false; },5000);
   };
   function omega(jesua,index){iyona.info("Deleting the record",jesua);

      if(!jesua){iyona.msg("You need to add a new record first.",false,"assertive bold"); return false;}
      RECORD.$delete({"jesua":jesua},function(server){iyona.off("FROM server",server);
         if(online.verify(server)===false)return;
         if(isset(index))$scope.generations.splice(index,1);
         else if($scope.father){//after deleting form clean current form
            $scope.father = {};
            $scope.service.jesua = null;
            $scope.module.submit = that.submitFunction.new;
            $state.go($state.$current,{"jesua":'new'},{ location: true, inherit: true, relative: $state.$current, notify: true, reload:false });//change url when creating
         }
         iyona.msg(server.notitia.msg,false,'balanced');
      });
   }//end function omega
   function set(scope,node,display){
      var deferred=$q.defer(),promise=deferred.promise,jesua;

      $scope      = scope;//set the variable to the private var
      nodeName    = node;
      nodeDisplay = display;
      curNode     = eternalCall(node,display);//retrieve the eternal scope
      if(curNode===false) {iyona.err("The defaultScope was not found"); return false;}
      //curMensa    = curNode.mensa;
      curDisplay  = curNode.display;
      curTitle    = curNode.title;
      $scope.module = isset($scope.module)?$scope.module:{};
      //setup on $scope the module, service, father, child [optional from json setup]
      objMerger($scope,{"father":$scope.father||{},"child":curDisplay.child,"service":{"title":curTitle,"patterns":dynamis.get("EXEMPLAR")},"display":{},"links":curDisplay.links });
      objMerger(consuetudinem,{"child":curDisplay.child,"uProfile":nodeName,"uDisplay":nodeDisplay});

      helper.set(scope,node,display);//set the module on the $scope.module property
      jesua       = $stateParams.jesua||$scope.service.jesua||$scope.father.jesua;
      $db         = online.notitia({"view":"form","call":that.call,"mensa":nodeName,"display":nodeDisplay,"jesua":jesua});

      $scope.module.delete = this.submitFunction.rem;
      //NEW::new creationg
      if($stateParams.jesua==="new") {
         $stateParams.jesua   = null;
         $scope.service.jesua = null;
         $scope.module.submit = this.submitFunction.new;
      }
      //LIST:: listing of all
      else if($stateParams.view==="list" || !isset($stateParams.jesua) ){
         //$stateParams.jesua = null;
         $scope.service.Tau = "sigma";
         sigmaList($stateParams.jesua);
      }
      //SEARCH:: customer search
      else if($stateParams.search && $stateParams.jesua!==null && $stateParams.jesua!==""){
         $db = online.notitia({"view":"form","call":that.call,"mensa":nodeName,"display":nodeDisplay,"jesua":$stateParams.jesua,"fields":$stateParams.field});
         $scope.service.jesua = $stateParams.jesua.length!==32?null:$stateParams.jesua;//new vs old
         $scope.service.Tau   = "sigma";
         $scope.module.submit = $stateParams.jesua.length!==32?this.submitFunction.new:this.submitFunction.old;//new vs old
         sigmaList();
      }
      //EDIT
      else if($stateParams.jesua!==null && $stateParams.jesua!==""){
         $scope.service.jesua = $stateParams.jesua;
         $scope.module.submit = this.submitFunction.old;
         sigma($stateParams.jesua);
      }//end if updating
      deferred.resolve($scope);
      return promise;
   };//end function set
   function setConsuetudinem(notitia){
      var cons;

      if( isset(notitia.consuetudinem)){
         cons=notitia.consuetudinem;
         var $parentSocpe=$scope.$parent||$scope;//if the parent does not exist
         $parentSocpe.licentia=$parentSocpe.licentia||{};
         iyona.off("EXTEND",$scope,cons);
         $parentSocpe.licentia.jesua="licentia";//la cle pour maitre dans la donner iDB
         if(isset(cons.child))     angular.extend($scope.child,cons.child);
         if(isset(cons.links))     angular.extend($scope.links,cons.links);
         if(isset(cons.licentia))  angular.extend($parentSocpe.licentia,cons.licentia);
         return cons;
      } else if(notitia.iota[0]){
         cons = notitia.iota[0];
         if(isset(cons.child_))     angular.extend($scope.child,cons.child_);
         return cons;
      }
      return false;
   }
   function sigma(jesua){ if($db===false) return;

      RECORD = new $db.get({"jesua":jesua},function(server){iyona.info('SERVER',server,typeof server);
         if(online.verify(server)===false) { iyona.err("Failed to verify."); return;}
         var iota = server.notitia.iota[0];
         setConsuetudinem(server.notitia);
         alphaMerge(curDisplay,iota,$scope);

         $scope.$broadcast("readyForm",server.notitia);iyona.on("Selected record server and father");iyona.msg(server.notitia.msg,false,'balanced');
      });
   }//end function sigma: list one item
   function sigmaList(jesua){ if($db===false) return;

      RECORD = new $db.get({"jesua":jesua},function(server){
         if(online.verify(server)===false)return;
         var iota = server.notitia.iota;
         $scope.parent = curDisplay;
         $scope.generations=(server.notitia.iota instanceof Array)?server.notitia.iota:[];
         setConsuetudinem(server.notitia);
         $scope.$broadcast("readyList",server.notitia);iyona.msg(server.notitia.msg,false,true);
      });
   }//end function sigmaList: list more than one item
   function validateForm(){
      if(!isset($scope.formScope)) {iyona.err("Form not Innitialised",$scope); return false;}
      var form = $scope.formScope,dataForm=form.dataForm,msg=null;
      if(dataForm.$dirty===false) msg = " No changes detected on the form";
      if(dataForm.$dirty && dataForm.$valid) return true;

      $scope.service.isValide = 'isNotValide';
      msg = msg||"The form is not valid, verify that all field are correct.";
      iyona.msg(msg,false,false);
      iyona.on("Validation form=",form,'dataForm=',dataForm);
      return false;
   }

}
//############################################################################//
//HELPER                                                                      //
//############################################################################//
//the helper is there to set the name of method that will be used by the $scope
helper.$inject = ["$ionicPopup","$ionicActionSheet","$state","online","$q","$ionicModal"];
function helper($ionicPopup,$ionicActionSheet,$state,online,$q,$ionicModal){
   var curNode,nodeName,nodeDisplay,$scope,that=this;

   that.$db;
   that.action       =action;
   that.addChild     =addChild;
   that.call         =sessionStorage.SITE_AURA;
   that.barscan      =barscan;
   that.enumWalk     =enumWalk;
   that.getPicture   =getPicture;
   that.goTo         =goTo;
   that.initForm     =initForm;
   that.linkOnline   =linkOnline;
   that.linkUpline   =linkUpline;
   that.loginModal   =loginModal;
   that.logoff       =logoff;
   that.reorderItem  =reorderItem;
   that.set          =set;
   that.showMe       =showMe;

   function action(text){

      var title,submitTxt,buttons,custModule;
      title = curNode.display.title;

      if(!$scope.service.jesua){text = text||'Create '; submitTxt = "<i class='icon ion-ios-paper-outline' i></i> "+text+title;}
      else {text=text||'Update ';submitTxt = "<i class='icon ion-ios-compose-outline' i></i> "+text+title;}
      //create default submit and add custom action modules, this includes text & module to be called.
      buttons = [{"text":submitTxt,"type":"submit"}];
      if(curNode.display.action instanceof Array){buttons = buttons.concat(curNode.display.action);}//merge submit btn with the rest of custom btn

      var actionSheet = $ionicActionSheet.show({
         "titleText":"Take Action",
         "buttons":buttons,
         "cancelText":"<i class='icon ion-ios-close-outline' i> Cancel Action",
         "destructiveText":"<i class='icon ion-ios-trash-outline' i> Delete Article",
         "buttonClicked":function(index){
            iyona.off("button clicked is",index);
            switch(index){
               case 0:
                  //_$("#dataForm")[0].submit();
                  $scope.module.submit();//the first btn array is submit
                  break;//note submit is setup to update or create in the crud service.
               default://buttons has all the custome module & text, select the custome module via the index
                  custModule = buttons[index].module;//associate with a custome module
                  iyona.off(custModule,buttons,$scope.module,typeof $scope.module[custModule]);

                  if(typeof $scope.module[custModule]==="function") $scope.module[custModule].call();
                  else if(typeof buttons[index].goto ==="string") $state.go(buttons[index].goto);
                  else if(typeof buttons[index].goto ==="object") $state.go(buttons[index].goto.call,buttons[index].goto.params,{"reload":false});
                  break;
            }actionSheet();
         },
         "cancel":function(){iyona.off("cancel button clicked ");},
         "destructiveButtonClicked":function(){$scope.module.delete(); actionSheet();}
      });
   }
   function addChild(set,newObj){

      $scope.display[set]=false;
      $scope.child.gerund[set]['data'].push(newObj);
   }
   function barscan(){
      if(typeof cordova === "undefined"){
         iyona.info("cordova not setup");
         var result = {"text":"new item","format":"string","cancelled":false};
         $state.go('call.article',{"jesua":"create","field":"barcode","search":result.text});
         return;
      }

      cordova.plugins.barcodeScanner.scan(
         function(result){iyona.on("Result",result);
            $ionicPopup.alert({"title":"Captured Content","template":"Result: "+result.text+"\n"+"Format: "+result.format+"\n"+"Candelled: "+result.cancelled});
            $state.go('call.article',{"jesua":"create","field":"barcode","search":result.text});
         },
         function(err){$ionicPopup.alert("Scanning failed: "+err);}
      );
   }
   function enumWalk(opt,index){
      if(typeof index==="undefined"){
         var selected = $scope.father[opt].alpha? $scope.father[opt].alpha:0;
         selected++;

         if(typeof $scope.father[opt].enum[selected]!=="undefined")$scope.father[opt].alpha=selected;
         else $scope.father[opt].alpha = 0;
      }else if($scope.parent){
         var value = $scope.generations[index][opt]? $scope.generations[index][opt]: 0;
         var selected = typeof value==="string"?$scope.parent.fields[opt].enum.indexOf(value):value;
         selected++;

         if(typeof $scope.parent.fields[opt].enum[selected]!=="undefined")$scope.generations[index][opt]=selected;
         else $scope.generations[index][opt] = $scope.parent.fields[opt].enum[0];
      }
   }
   function getPicture(e,field,ele,filename,ndx){
      //native browser
      if(typeof navigator.camera === "undefined") {
         var file,reader;
         $scope.service.tmp = isset(ndx)?ndx:isset($scope.service.tmp)?$scope.service.tmp:null;//this stores the ndx in a tmp. when calling from a desktop the function is called x2, the 2nd time it does not have ndx, heance why it's stored
         ndx = isset(ndx)?ndx:$scope.service.tmp;

         if(!e || (e.target.type!=='file' && !isset(ele)) ) {iyona.msg("Camera option not available.",false,true); return false;}
         else if(e.target.type!=='file' && isset(ele)){_$(ele)[0].click(); return false;}
         iyona.err("Camera option not available.",e.target,ele);

         file = e.target.files[0];//{name,size,type}
         if(!isset(file)) {iyona.msg("Camera option not available.",false,true); return false;}
         else if(file.type!=='image/jpeg') {iyona.msg("Only Jpeg images are allowed"); return false;}
         else if (file.size >1000000)  {iyona.msg("The selected file is larger than 1MB."); return false;}
         reader = new FileReader();
//         reader.readAsBinaryString(file);//for binary
         reader.readAsDataURL(file);
         reader.onload = function(evt){

            if(!ndx)_$(".captureImg")[0].src = evt.target.result;
            else _$(".img"+ndx)[0].src = evt.target.result;

            $scope.$apply(function(){
               $scope.father[field] = {"alpha":evt.target.result,"icon":filename||file.name,"type":file.type};
               if(isset(ndx)){$scope.generations[ndx][field] = {"alpha":evt.target.result,"icon":filename||file.name,"type":file.type};
                  iyona.on('generation',ndx,$scope.generations[ndx]);}
            });
            iyona.off('event',evt,$scope.father[field],'---',file);
         }
         $scope.formScope.dataForm.$dirty = true;
         return false;
      }
      //mobile camera available
      navigator.camera.getPicture(
         function(img){
            iyona.info("Capturing image",Camera);
            e.target.src = "data:image/jpeg;base64,"+img;
            if (img >1200000)  {iyona.msg("The selected file is larger than 1MB."); return false;}
            $scope.father[field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
            if(isset(ndx))$scope.generations[ndx][field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
            $scope.formScope.dataForm.$dirty = true;
         },
         function(err){$ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){iyona.info("The image was no image captured::"+err);}); },
         {"quality":100,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true,"sourceType":1,"cameraDirection":0});
   }
   function goTo(label,option){$state.go(label,option);}
   function initForm(form,multiple){
      iyona.off("initForm",form,$scope);
      $scope.formScope = form;
      if(isset($scope.$parent.formScope)) {
         $scope.$parent.formScope.push(form);
         //disable it here, bcos not using multiple form
         if(multiple)$scope.formScope = $scope.$parent.formScope[0];//use for multiple form and innitial to the 1st form.
      } else $scope.$parent.formScope = [form];
   }
   /**
    * used to link to gerunds, mother and the father
    * @param {mixed} [isNull] boolean used to alpha|omega, string used to delta
    * @param {object} [fields] the data to be passed, on delta row object
    * @param {string} [mensa] the mensa to set
    * @param {object} [child] the row object, on delta array of keys
    * @param {string} [childKey] on alpha|omega the key used in connection with the father's field jesua
    * @returns {$q@call;defer.promise}
    */
   function linkOnline(isNull,fields,mensa,child,childKey){//used to send direct link 2 online server
      var trans =(isNull===true)?'Alpha': (isNull===false)?'omegA':isNull,//get the transaction from isNull
      data,toDelete={},cnt,key,RECORD,
      deferred=$q.defer(),promise=deferred.promise;

      that.$db = that.$db? that.$db: online.notitia({"view":"link","call":that.call,"mensa":nodeName,"display":nodeDisplay});
      RECORD  = new that.$db();
      data  = {'data':fields,'messenger':{'run_consue':mensa} };
      angular.extend(RECORD,data);

      if(trans==='Alpha'){
         RECORD.$save(function(server){
            iyona.on("SERVER",server,child[childKey],childKey);
            if(isset(server)&&isset(server.links)){child[childKey]=$scope.father.jesua; deferred.resolve('Alpha');}//the refField is linked to the father's Jesua
            else{deferred.reject('FAILED');} });}

      else if(trans==='omegA'){
         for(key in fields){cnt++; toDelete[key]=fields[key]; if(cnt>=2) break;}//delete function will only take the first two fields
         toDelete['run_consue']=mensa;
         RECORD.$delete(toDelete,function(server){
            iyona.on("SERVER",server,child[childKey],childKey);
            if(isset(server)&&isset(server.links)){child[childKey]=null; deferred.resolve('omegA');}//remove ref to the father
            else{deferred.reject('FAILED');} });}
      return promise;
   }
   function linkUpline(fields,mensa,childKey){//used to send direct link 2 online server for delta
      var data,keyName,
      deferred=$q.defer(),promise=deferred.promise;

      //used to check & validate delta
      iyona.on("MAKE",fields, (!isset(fields[childKey[0]]) || !isset(fields[childKey[1]])), !isset(fields.aChanged), fields.aChanged);
      if(!isset(fields.aChanged)) return false;
      if(typeof childKey==="string" && !isset(fields[childKey])) return false;
      if(childKey instanceof Array){
         for(var x=0; x<childKey.length; x++){
            keyName = childKey[x];
            if(!isset(fields[keyName]) || fields[keyName]==="") return false;
      }}

      iyona.on("Maker");
      that.$db = that.$db? that.$db: online.notitia({"view":"link","call":that.call,"mensa":nodeName,"display":nodeDisplay});

      var RECORD  = new that.$db();
      data  = {'data':fields,'messenger':{'run_consue':mensa} };
      angular.extend(RECORD,data);

      RECORD.$militia(function(server){
         iyona.on("SERVER",server);
         if(isset(server)&&isset(server.links)){deferred.resolve('deLta');}//remove ref to the father
         else{deferred.reject('FAILED');}
      });

      return promise;
   }
   function loginModal($scope){
      $ionicModal
      .fromTemplateUrl('cera/login.html',{"scope":$scope,"animation":"slide-in-up","focusFirstInput":true,"backdropClickToClose":false,"hardwareBackButtonClose":false})
      .then(function(modal){
         $scope.modal = modal;
         $scope.modal.show();
      }).catch(function(err,err2){iyona.on('err::',err,err2); });

   }
   function logoff(mainScope){

      $ionicPopup.confirm({"title":"Exit Applicaiton","template":"Are you sure you want to exit?"})
      .then(function(res){
         if(res){
            ionic.Platform.exitApp();
            //dynamis.clear();//session with setting do not remove
            iyona.err("Application is closing.");
            if(!ionic.Platform.isWebView()) {
               dynamis.clear(true);//delete localStorage on webplatform not mobile
               $state.go("main.dashboard",{},{ location: true, inherit: true, relative: $state.$current, notify: true, reload:true });
               loginModal(mainScope);
            }//webview is for mobile
         }
         else {console.info("Not closing");}
      });

   }
   function reorderItem(item,from,to){
    //Move the item in the array
    $scope.generations.splice(from, 1);
    $scope.generations.splice(to, 0, item);

      iyona.on("Ordering",item,from,to);
   }
   function set(scope,node,display){

      $scope      = scope;
      curNode     = eternalCall(node,display);
      nodeName    = node;
      nodeDisplay = display;
      //enable module that have been set in the Node setting
      if(curNode.display.module instanceof Array){
         var x,module,l=curNode.display.module.length;
         for(x=0;x<l;x++){
            module = curNode.display.module[x];
            $scope.module[module] = this[module];
         }//end for array module
      }//end if module array
   }//end func set
   function showMe(opt){//used to display a field on and off
      $scope.display[opt]=true;
   }
}
//############################################################################//
//ONLINE                                                                      //
//############################################################################//
/*
 * online, is used to access the online db
 * @param {function} callback, the call back function for the results
 * @param {string} caller, when using the API to call a report
 * @returns {undefined}
 */
online.$inject = ["$resource","$http","$q"];
function online($resource,$http,$q) {
   var that=this;
   var isViewLoading={"width": "100%", "display": "block"};
   var indexedDB  = window.indexedDB||window.webkitIndexedDB||window.mozIndexedDB||window.msIndexedDB;
   var IDBKeyRange= window.IDBKeyRange||window.webkitIDBKeyRange||window.msIDBKeyRange;
   this.responseType=this.responseType||"json";//async calls

   that.$idb      = setIndexeddb();//{1}run it on 1st time ::[PROMISE]
   that.principio = principio;
   that.notitia   = notitia;//{2}setup the API
   that.post      = post;
   that.verify    = verify;//general function used to verify the server received data.

   function notitia(params){

      var view = ":call,:view,:jesua,:mensa,:display",params = params||{}, notitia=this,
      service = $resource(dynamis.get("SITE_API")+view, params, {"militia": {"method": "PUT", isArray: false, "cache": true, "responseType": "json", "withCredentials": true}});
      notitia.$delete=remove;
      notitia.get=get;
      notitia.$militia=militia;
      notitia.query=query;
      notitia.remove=remove;
      notitia.$save=save;

      //@todo: check connection mobile & desktop
      if (checkConnection() && dynamis.get("SITE_CONFIG").Worker===false) {//ONLINE
         return service;
      }else if (dynamis.get("SITE_CONFIG").Worker===true){//INDEXEDDB
         return notitia;
      }else{//NONE
         iyona.msg("You are currently offline", false, "danger bold");
         isViewLoading = {"display": "none"};
         return false;
      }

      function get(jesua,callback){
         that.$idb.then(function($idb){//read after idb is read
            $idb.read(params.mensa,jesua).then(function(e,isCursor){
               var cursor = e.target.result,server={"notitia":{"iota":[]}};
               iyona.off('cursor',cursor,jesua,params,$idb.iRequest,e);

               if(isCursor){//with multiple row
                  if(cursor){
                     iyona.off('MULTY CURSOR',cursor.value,cursor);
                     server.notitia.iota.push(cursor.value);//use alphaMerge() if alpha, enum
                     cursor.continue();
                  }else{ callback(server);}
               }else if(isset(cursor)){//single read
                  iyona.off('SINGLE CURSOR',cursor.value);
                  server.notitia.iota[0] = cursor.value;//use alphaMerge() if alpha, enum
                  callback(server);
               }else{
                  iyona.msg("System is not available, please try again.");
               }
            });
         });
      }
      function militia(){}
      function query(){}
      function save(){}
      function remove(){}

   }//endufntion notitia
   function post(url,params,callback){

      var deferred=$q.defer(),promise=deferred.promise,msg;
      if(!checkConnection()){iyona.msg("Your device is currently Offline.",false,false); return false;}//@todo

      $http.post(url,params,{"responseType":this.responseType,"cache":true,"headers":{"Content-Type":"application/x-www-form-urlencoded"},"withCredentials":true})
      .success(function(server){
         isViewLoading = {"display":"none"};
         if(typeof callback==='function')callback(server);
         else deferred.resolve(server);
      })
      .error(function(data,status,headers,config){
         isViewLoading = {"display":"none"};
         msg="There was an error in handling the transaction";
         iyona.msg(msg,true,'danger bold');
         if(data&&"err" in data){iyona.msg(data.err,true,"danger",true);msg=data.err;}
         deferred.reject({'msg':msg,'data':data,'status':status,'headers':headers,'config':config});
         iyona.on(data,status,headers,config,config.url);
      });
      return promise;
   }
   function principio(){//kick start the storage system, used upon login or application start
      //@todo://
   }
   function setIndexeddb(){
      var $idb       = {}, def = $q.defer();
      $idb.rem       = iErase;
      $idb.read      = iRead;
      $idb.write     = iWrite;
      $idb.idb       = null;

      if(dynamis.get('SITE_CONFIG').deleteWorker || false)indexedDB.deleteDatabase(sessionStorage.DB_NAME);
      else{
         callWorker({"progredior":true,"option":true},function(data){//{3}. Check for upgrade
            if(data==="Upgradding") {}
            else if(data==="Worker iDB Ready"){
               $idb.IDBReady  = true;
               $idb.iRequest  = indexedDB.open(sessionStorage.DB_NAME);
               $idb.iRequest.onsuccess =function(e){$idb.idb=$idb.iResult||e.target.result||$idb.iRequest.result;def.resolve($idb); iyona.on("Front End iDB Ready");}
               $idb.iRequest.onerror   =function(e){iyona.err("Database error code: "+e.target.error.message, e); def.reject(false,e);}
               $idb.iRequest.onblocked =function(e){iyona.on("Please close all other tabls with that application",true); def.reject(false,e);}
            }
            iyona.info("AS A WORKER::"+data);
         });
      }
      //=========================================================================//
      function iErase(_store,_index,_callback){
         var deferred = $q.defer(),promise=deferred.promise;
         if(!$idb.iRequest) {
            iyona.err("No iRequest");
            //document.addEventListener("IDBReady",function(e){iyona.on("On IDB ready IamDeleting",e.detail.success);$idb.iErase(_store,_index,_callback);});
            deferred.reject(false);
            return promise;
         }
         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.err("iErase No store iFound: "+_store);return false;}

         var store=_store||"users",transaction=this.idb.transaction(store,"readwrite");
         var objectStore=transaction.objectStore(store);
         var request=objectStore.delete(_index);
         request.onsuccess=function(e){iyona.on("Successfully iErased record.");if(_callback)_callback(e);deferred.resolve(e);}
         request.onerror=function(e){iyona.err("failed to deleted record.",e);deferred.reject(request.error,store,e);}
         return promise;
      }
      //=========================================================================//
      function iRead(_store,_index,_callback,_passVar){
         var deferred = $q.defer(),promise=deferred.promise,cursor=false;

         if(!$idb.iRequest) {
            iyona.err("No iRequest on reading "+_store,_store);
            //if it does not start create function to iStart()
            //document.addEventListener("IDBReady",function(e){iyona.on("On IDB ready IamReading",e.detail.success);$idb.iRead(_store,_index,_callback,_passVar);});
            deferred.reject(false);
            return promise;
         }

         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.err("iRead No store iFound: "+_store);return false;}

         var store=_store,transaction=$idb.idb.transaction(store),request;
         var objectStore=transaction.objectStore(store),ndx=null,order,keyRange=null;

         if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("where")){ndx=objectStore.index(_index.where);}
         if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("order"))order=(_index.order.search(/desc/i)!==-1||_index.order.search(/prev/i)!==-1)? 'prev': 'next';

         if(_index!==null&&(typeof _index==="number"||typeof _index==="string"))             {request=objectStore.get(_index);//for the pk
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("top"))     {keyRange=IDBKeyRange.lowerBound(_index.top); request=ndx.openCursor(keyRange,order);//limit top
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("bot"))     {keyRange=IDBKeyRange.upperBound(_index.bot); request=ndx.openCursor(keyRange,order);//limit bottome
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("between")) {keyRange=IDBKeyRange.bound(_index.between[0],_index.between[1],true,true); request=ndx.openCursor(keyRange,order);//between
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("is"))      {request=ndx.get(_index.is);iyona.deb("IS",_index.is);//where field1=value
         }else if(_index!==null&&angular.isArray(_index))                                    {request=objectStore.openCursor(_index);cursor=true;//where field1=value1 and field2=value2
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("like"))    {keyRange=IDBKeyRange.bound(_index.like,_index.like+'\uffff'); request=ndx.openCursor(keyRange,'prev');//where like...
         }else if(ndx){request=ndx.openCursor(keyRange,order);
         }else{request=objectStore.openCursor();cursor=true;}

         request.onsuccess=function(e){if(_callback)_callback(e,cursor,_passVar); deferred.resolve(e,cursor,_passVar);}//e.target.result
         request.oncomplete=function(e){iyona.on("Successfully iRead  addeding to "+store,e);}
         request.onerror=function(e){iyona.err("Error while writing to "+store+"::"+request.error,e); deferred.reject(request.error,store,e);}
         return promise;
      }
      //=========================================================================//
      /*
       * @check : worker.muneris.js @twin
       */
      function iWrite(_store,_data,_update,_display){
         var crud;
         var deferred = $q.defer(),promise=deferred.promise;

         if(!$idb.iRequest) {
            iyona.err("No iRequest on writting "+_store);
            //document.addEventListener("IDBReady",function(e){iyona.on("On IDBready Iam Writting",e.detail.success);$idb.iWrite(_store,_data,_update);});
            deferred.reject(false);
            return promise;
         }
         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.on("write No store iFound: "+_store);return false;}

         var store=_store,transaction=$idb.idb.transaction(store,"readwrite"),request;
         var objectStore=transaction.objectStore(store);
         if(typeof _data!=="object") {iyona.err("No iData");return false;}

         if(!_update){request=objectStore.add(_data);crud='inserted';}
         else {request=objectStore.put(_data);crud='updated';}
         request.onsuccess=function(e){if(_display!==false)iyona.on("Successfully "+crud+" write to "+store);deferred.resolve(e);}
         request.oncomplete=function(e){iyona.on("Successfully completed write to "+store+"::"+e.target.error.message);}
         request.onerror=function(e){iyona.err("Error while writing to "+store+"::"+e.target.error.message,_data);deferred.reject(e.target.error.message,store,_data,e);}
         return promise;
      }
      return def.promise;
   }
   function verify(server){

      isViewLoading = {"display": "none"};
      if (server.notitia && (typeof server.notitia.sql !== "undefined" || typeof server.notitia.quaerre !== "undefined")) iyona.info("QUAERRE", server.notitia.sql || server.notitia.quaerre);
      if (server.notitia && server.notitia.idem !== 0) {//cookie
         var u = dynamis.get("USER_NAME", true) || {};
         u.cons = server.notitia.idem;
         dynamis.set("USER_NAME", u, true);
      }//pour maitre un autre biscuit
      if(isset(server.notitia) && isset(server.notitia.err)) { iyona.err(server.notitia.err,server.notitia.msg); iyona.msg(server.notitia.msg,true,false); return false;}
      else if(isset(server.notitia) && isset(server.notitia.iota)) return server;
      else {iyona.msg('An Online error occure and the transaction did not go through',false,true);return false;}
   }//end verify
}

