'use strict';
angular.module('saBirdChecklist.services',['ngResource'])
   .service("crud",crud)
   .service("helper",helper)
   .service("online",online);

//############################################################################//
//CRUD                                                                        //
//############################################################################//
crud.$inject = ["online","helper","$stateParams","$timeout","$state","$q"];
function crud(online,helper,$stateParams,$timeout,$state,$q){
   var that=this,$db,$scope,curNode,curDisplay,curTitle,nodeName,nodeDisplay,RECORD,params,consuetudinem={},submitFunction={};
   that.msg=msg;
   that.set=set;
   that.call=sessionStorage.SITE_AURA;

   function alpha(ndx,opt){iyona.info("Starting to create a new record");

      if(validateForm()===false){$scope.$broadcast("failForm");return false;}
      if(typeof $scope.father.created==="undefined") $scope.father.created = new Date().toISOString(); else if ($scope.father.created==="none") delete $scope.father.created;
      var basilia = setQuaerere(nodeName,$scope.father,$scope.service.Tau,consuetudinem);

//      RECORD  = typeof $db==='function'? new $db(basilia): new $db;
      if(dynamis.get('SITE_CONFIG').Worker) basilia.payload=params; ///when worker is on merge with default params
      RECORD  = new $db(basilia);
      RECORD.$save(function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server);online.offlineStorage(basilia,params.mensa,'Alpha');return false;}
         var notitia = server.notitia;

         //give jesua and service.jesua new value
         iyona.off('OVER HERE',opt,server,$stateParams.jesua,ndx,$scope.generations,$scope.father,$state.$current,$state,$scope);
         if($scope.generations && isset(ndx) && notitia.iota ) {$scope.generations[ndx].jesua = notitia.iota; }//wen there is an array of form
         else if(notitia.iota) {//IOTA set and change location
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

      if(dynamis.get('SITE_CONFIG').Worker) basilia.payload=params; ///when worker is on merge with default params
      RECORD  = new $db(basilia);
      RECORD.$militia(function(server){
         if(online.verify(server)===false){$scope.$broadcast("failForm",server); online.offlineStorage(basilia,params.mensa,'deLta');return false;}
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
   function omega(jesua,index){iyona.info("Deleting the record::"+jesua);

      if(!jesua){iyona.msg("You need to add a new record first.",false,"assertive bold"); return false;}
      RECORD.$delete({"jesua":jesua},function(server){iyona.off("FROM server",server);
         if(online.verify(server)===false){ online.offlineStorage(params,params.mensa,'omega'); return false;}
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
      $scope.display= {};
      $scope.module = {};
      $scope.father = isset($scope.father)?$scope.father:{};
      $scope.service= {"title":curTitle,"patterns":dynamis.get("EXEMPLAR")};
      if(curDisplay.links_) $scope.father.links_ = curDisplay.links_;
      if(curDisplay.child_) $scope.father.child_ = curDisplay.child_;

      objMerger(consuetudinem,{"child":curDisplay.child,"uProfile":nodeName,"uDisplay":nodeDisplay});

      helper.set($scope,node,display);//set the module on the $scope.module property
      jesua       = isset($stateParams.jesua)&&$stateParams.jesua!=="new"? $stateParams.jesua||$scope.service.jesua||$scope.father.jesua: $scope.service.jesua||$scope.father.jesua;
      params      = {"view":"form","call":that.call,"mensa":nodeName,"display":nodeDisplay,"jesua":jesua};
      $db         = online.notitia(params);

      //SETUP SUMIT
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

      $scope.module.delete = that.submitFunction.rem;
      iyona.off("$stateParams",$stateParams);
      //NEW::new creationg
      if($stateParams.jesua==="new") {
         $stateParams.jesua   = null;
         $scope.service.jesua = null;
         $scope.module.submit = that.submitFunction.new;
         $scope.$broadcast("clearForm",true);//event for a new form.
      }
      //LIST:: listing of all
      else if($stateParams.view==="list" || !isset($stateParams.jesua) ){
         //Using view=list mean listing specific users document, hence if no user = display all. this prevents that.
         if($stateParams.view && !$stateParams.jesua) $stateParams.jesua = impetroUser().operarius||'none';
         $scope.service.Tau = "sigma";
         sigmaList($stateParams.jesua);
      }
      //SEARCH:: customer search
      else if($stateParams.search && $stateParams.jesua!==null && $stateParams.jesua!==""){
         $db = online.notitia({"view":"form","call":that.call,"mensa":nodeName,"display":nodeDisplay,"jesua":$stateParams.jesua,"fields":$stateParams.field});
         $scope.service.jesua = $stateParams.jesua.length!==32?null:$stateParams.jesua;//new vs old
         $scope.service.Tau   = "sigma";
         $scope.module.submit = $stateParams.jesua.length!==32?that.submitFunction.new:that.submitFunction.old;//new vs old
         sigmaList();
      }
      //EDIT
      else if(isset($stateParams.jesua) ){
         $scope.service.jesua = $stateParams.jesua;
         $scope.module.submit = that.submitFunction.old;
         sigma($stateParams.jesua);
      }//end if updating
      deferred.resolve($scope);
      return promise;
   };//end function set
   function setConsuetudinem(notitia){
      var cons;

      if( isset(notitia.consuetudinem)){//@remove
         cons=notitia.consuetudinem;
         var $parentSocpe=$scope.$parent||$scope;//if the parent does not exist
         $parentSocpe.licentia=$parentSocpe.licentia||{};
         iyona.off("EXTEND",$scope,cons);
         $parentSocpe.licentia.jesua="licentia";//la cle pour maitre dans la donner iDB
         if(isset(cons.child))     angular.extend($scope.child,cons.child);
         if(isset(cons.links))     angular.extend($scope.links,cons.links);
         if(isset(cons.licentia))  angular.extend($parentSocpe.licentia,cons.licentia);
         return cons;
      } else if(notitia.iota[0] && false){ ///wen using Idb do not link consuetudinem
         cons = notitia.iota[0];
         if(isset(cons.child_))     angular.extend($scope.child,cons.child_);
         if(isset(cons.links_))     angular.extend($scope.links,cons.links_);
         return cons;
      }
      return false;
   }
   function sigma(jesua){ if($db===false) return;
      var deferred = $q.defer(); $scope.service.promise = deferred.promise;

      RECORD = new $db.get({"jesua":jesua},function(server){
         if(online.verify(server)===false) { iyona.err("Failed to verify."); return;}
         var iota = server.notitia.iota[0];
         setConsuetudinem(server.notitia);
         alphaMerge(curDisplay,iota,$scope);
         iyona.on('sigma',server,typeof server,iota,$scope.father,curDisplay);
         deferred.resolve(server);
         $scope.$broadcast("readyForm",server.notitia);iyona.off("Selected record server and father");iyona.msg(server.notitia.msg,false,'balanced');
      });
   }//end function sigma: list one item
   function sigmaList(jesua){ if($db===false) return;

      RECORD = new $db.get(function(server){iyona.off('sigmaList',server,typeof server);
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
   that.gps          =gps;
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

      if(!$scope.service.jesua){text = text||'Create '; submitTxt = "<i class='icon ion-ios-paper-outline'></i> "+text+title;}
      else {text=text||'Update ';submitTxt = "<i class='icon ion-ios-compose-outline'></i> "+text+title;}
      //create default submit and add custom action modules, this includes text & module to be called.
      buttons = [{"text":submitTxt,"type":"submit"}];
      if(curNode.display.action instanceof Array){buttons = buttons.concat(curNode.display.action);}//merge submit btn with the rest of custom btn

      var actionSheet = $ionicActionSheet.show({
         "titleText":"Take Action",
         "buttons":buttons,
         "cancelText":"<i class='icon ion-ios-close-outline'></i> Cancel Action",
         "destructiveText":"<i class='icon ion-ios-trash-outline'></i> Delete Article",
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
   /**
    * support to take a picture from a browser or native device
    * @param {type} <var>e</var> the event variable, if browser will contain the field type
    * @param {type} <var>field</var> the field that will be part of the main data fields (father)
    * @param {type} <var>ele</var> the ID of the input file element, in a browser it is passed twice
    * @param {type} <var>filename</var> the name of the file that will appear on the
    * @param {type} <var>ndx</var> when workin on multiple row, an index is the identifier
    * @returns {Boolean}
    */
   function getPicture(e,field,ele,filename,ndx){
      //native browser
      if(typeof navigator.camera === "undefined") {
         var file,reader;
         $scope.service.ndx = isset(ndx)? ndx: isset($scope.service.ndx)? $scope.service.ndx: null;//this stores the ndx in a tmp. when calling from a desktop the function is called x2, the 2nd time it does not have ndx, heance why it's stored
         ndx = $scope.service.ndx;

         if(!e || (e.target.type!=='file' && !isset(ele)) ) {iyona.msg("Camera option not available.",false,true); return false;}
         else if(e.target.type!=='file' && isset(ele)){_$(ele)[0].click(); return false;}//wen in a browser function will run twice. ele will be passed and clicked
         iyona.info("Loading browsing image...",'blue');

         file = e.target.files[0];//{name,size,type} take the first file
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
               if(isset(ndx)){$scope.generations[ndx][field] = {"alpha":evt.target.result,"icon":filename||file.name,"type":file.type};}
            });
            iyona.on('event',evt,$scope.father[field],'---',file);
         }
         $scope.formScope.dataForm.$dirty = true;
         return false;
      }
      var option = {"quality":90,"destinationType":Camera.DestinationType.DATA_URL,"correctOrientation":true,"mediaType":Camera.MediaType.PICTURE,"sourceType":Camera.PictureSourceType.CAMERA,"cameraDirection":Camera.Direction.FRONT,"encodingType":Camera.EncodingType.JPEG};
      //mobile camera available
      navigator.camera.getPicture(successImg,failImg,option);
      function successImg (img){
         iyona.on("Capturing image",'purple',e);
         img = "data:image/jpeg;base64,"+img;
         if(typeof e.target.src!=="undefined")e.target.src = img;
         else{
            if(!ndx)_$(".captureImg")[0].src = img;
            else _$(".img"+ndx)[0].src = img;
         }
         if (img >1200000)  {iyona.msg("The selected file is larger than 1MB."); return false;}
         $scope.father[field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
         if(isset(ndx))$scope.generations[ndx][field] = {"alpha":img,"icon":filename||"image.jpg","type":"image/jpeg"};
         $scope.formScope.dataForm.$dirty = true;
      }
      function failImg(err){
         $ionicPopup.alert({"title":"Image Capture","template":"Could not capture the image::"+err}).then(function(){iyona.info("The image was not captured::"+err);});
      }
   }
   function goTo(label,option){$state.go(label,option);}
   /**
    * gets the gps location and returns the object via a promis
    * @param {object} opt {enableHighAccuracy,maximumAge,timeout}
    * @returns {$q@call;defer.promise} {latitude, longitude, altitude, accuracy, altitudeAccuracy, heading, spedd, timestamp}
    */
   function gps(opt){
      var deferred=$q.defer(),promise=deferred.promise;
      opt = opt||{enableHighAccuracy: true,maximumAge:1000*60*10};
      if(typeof navigator.geolocation!="undefined"){
         navigator.geolocation.getCurrentPosition(function(position){var pos = position.coords;pos.timestamp=position.timestamp; deferred.resolve(pos);},locationError,opt);//@location: lib.muneris.js
      } else {
         iyona.msg("This device does not support GPS location");
         deferred.reject(false);
      }
      return promise;
   }
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
   function linkOnline(isNull,fields,run_consue,child,childKey,data){//used to send direct link 2 online server
      var trans =(isNull===true)?'Alpha': (isNull===false)?'omegA':isNull,//get the transaction from isNull
      result={},toDelete={},cnt,key,RECORD,payload,linkedChild,node,isOnline=sessionStorage.SITE_ONLINE==="true"?1:0,
      deferred=$q.defer(),promise=deferred.promise;

      payload        = {"view":"link","call":that.call,"mensa":nodeName,"display":nodeDisplay};//payload is deleted
      that.$db       = online.notitia(payload,true);//initialise the $resource for online
      //result.eternal = data;
      //result.payload = payload;//no longer needed bcos we are sending via an online $resource
      result.data    = fields;
      result.messenger= {'run_consue':run_consue};
      RECORD  = new that.$db(result);

      if(trans==='Alpha'){
         online.$idb.then(function($idb){//options:links_ (finds the node),tau (the transaction), vita (the combined key)
            node = data.links_[run_consue]['rows'];
            linkedChild = node[node.length-1];//get the last value of the link, which is the new one
            $idb.write(payload.mensa,data,true,{'links_':run_consue,'tau':'Alpha','linkedChild':linkedChild,'vita':child.name+'-'+$scope.father.jesua}).then(function(){
               if(isOnline)RECORD.$save(saveCall);//create an online $resource then delete
               else deferred.resolve('Alpha');
            }).catch(function(){deferred.reject('FAILED');});
         });//RECORD.$militia(saveCall)
      }
      else if(trans==='omegA'){
         //write update localy 1st then delete online with online $rescouce
         for(key in fields){cnt++; toDelete[key]=fields[key]; if(cnt>=2) break;}//delete function will only take the first two fields
         toDelete['run_consue']=run_consue;iyona.off("toDelete",toDelete,payload);
         online.$idb.then(function($idb){//@note: omega will be stored offline
            linkedChild = {}; angular.copy(toDelete,linkedChild); linkedChild.modified=new Date().format('isoDateTime');
            $idb.write(payload.mensa,data,true,{'links_':run_consue,'tau':'omegA','linkedChild':linkedChild,'vita':child.name+'-'+$scope.father.jesua}).then(function(){
               if(isOnline)RECORD.$delete(toDelete,deleCall);//create an online $resource then delete
               else deferred.resolve('omegA');
            }).catch(function(){deferred.reject('FAILED');});;
         });//RECORD.$delete(toDelete,deleCall);//old way
      }
      function saveCall(server){
         iyona.off("SERVER",server,child[childKey],childKey);
         if(isset(server)&&isset(server.links_)){child[childKey]=$scope.father.jesua; deferred.resolve('Alpha');}//the refField is linked to the father's Jesua
         else{deferred.reject('FAILED');} }

      function deleCall(server){
            iyona.off("SERVER",server,child[childKey],childKey);
            if(isset(server)&&isset(server.links_)){child[childKey]=null; deferred.resolve('omegA');}//remove ref to the father
            else{deferred.reject('FAILED');} }
      return promise;
   }
   /**
    * automatically update data via blur & change
    * @param {object} child, all the childs fields
    * @param {string} mensa, the related mensa
    * @param {array} required, list of array to check for required fields
    * @returns {Boolean|$q@call;defer.promise}
    */
   function linkUpline(child,run_consue,required){//used to send direct link 2 online server for delta
      var keyName,payload,result={},RECORD,isOnline=sessionStorage.SITE_ONLINE==="true"?1:0,
      deferred=$q.defer(),promise=deferred.promise;

      //used to check & validate delta
      iyona.off("MAKE",child, (!isset(child[required[0]]) || !isset(child[required[1]])), !isset(child.aChanged), child.aChanged);
      if(!isset(child.aChanged)) return false;//no changed occured
      if(typeof required==="string" && !isset(child[required])) return false;//only one key and it has not changed
      if(required instanceof Array){//multiple key and if one is missing return false
         for(var x=0; x<required.length; x++){
            keyName = required[x];
            if(!isset(child[keyName]) || child[keyName]==="") return false;
      }}

      payload        = {"view":"link","call":that.call,"mensa":nodeName,"display":nodeDisplay};
      that.$db       = online.notitia(payload,true);
//      result.eternal = $scope.father;
//      result.payload = payload;
      child.modified = new Date().format('isoDateTime');
      result.data    = child;
      result.messenger= {'run_consue':run_consue};
      RECORD  = new that.$db(result);

      online.$idb.then(function($idb){//options:links_ (finds the node),tau (the transaction), vita (the combined key)
         $idb.write(payload.mensa,$scope.father,true,{'links_':run_consue,'tau':'deLta','linkedChild':child,'vita':child.bird+'-'+$scope.father.jesua}).then(function(){
            if(isOnline)RECORD.$militia(modCall);//create an online $resource then delete
         });
      });//RECORD.$militia(saveCall)
      function modCall(server){
         iyona.on("SERVER",server);
         if(isset(server)&&isset(server.links_)){deferred.resolve('deLta');child.aChanged=null;}//remove aChanged in order not to have continous delta
         else{deferred.reject('FAILED');}
      };

      return promise;
   }
   function loginModal($scope,cb){
      var option = typeof cb ==="function"? cb: {"scope":$scope,"animation":"slide-in-up","focusFirstInput":true,"backdropClickToClose":false,"hardwareBackButtonClose":false};
      return $ionicModal.fromTemplateUrl('cera/login.html',option).then(function(modal){
         $scope.modal = modal;
         $scope.modal.show();
         return modal;
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
               $state.go("main.dashboard",{},{ location: true, inherit: true, relative: $state.$current, notify: true, reload:true });//location:replace url, inherit: inherit url parameters,reload:do transition, notify: notify $stateChange
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
   that.isConnected;
   that.srchOption=null;

   that.offlineStorage  = offlineStorage;
   that.post            = post;
   that.principio       = principio;
   that.verify          = verify;//general function used to verify the server received data.

   that.notitia = function (params,useOnline){
      var view = ":call,:view,:jesua,:mensa,:display", inner=that.notitia,service,RECORD;
      params = params||{}; useOnline=useOnline||false;
      var queryLoad = isset(params.payload)? params.payload:params;//payload appears when iDB is enabled
      delete params.payload;//remove from params cause it used to be stored in idb
      service = $resource(dynamis.get("SITE_API")+view, queryLoad, {"militia": {"method": "PUT", isArray: false, "cache": true, "responseType": "json", "withCredentials": true}});

      inner.$delete=remove;
      inner.get=get;
      inner.$militia=militia;
      inner.query=query;
      inner.remove=remove;
      inner.$save=save;

      //@todo: check connection mobile & desktop
      that.isConnected = checkConnection();
      if ( (that.isConnected && dynamis.get("SITE_CONFIG").Worker===false) || useOnline) {//ONLINE
         return service;
      }else if (dynamis.get("SITE_CONFIG").Worker===true){//INDEXEDDB
         return inner;
      }else{//NONE
         iyona.msg("You are currently offline", false, "danger bold");
         isViewLoading = {"display": "none"};
         return false;
      }//07a0a72ac76417dc0be22cfa1e748a82//637856b94dd4d8a86c2afab8567ec6f0

      function get(jesua,callback){

         that.$idb.then(function($idb){//read after idb is read

            if(typeof jesua ==="object") jesua = jesua.jesua||jesua.alpha;//if object get jesua otherwise jesua is from the func argument
            else if (typeof jesua ==="function"){callback=jesua; jesua=that.srchOption;}

            $idb.read(params.mensa,jesua,null,innerCall).catch(function(msg,data,e){iyona.msg("There was an error displaying the data",[msg,data,e]);});
            function innerCall(result){
               var server={"notitia":{"iota":result,"msg":"Displaying local result"}};
               callback(server,result);
               that.srchOption = null; //reset search so that it does not affect other states
               iyona.off("FROM IDB DOCUMENT",server);
            }
         });
         return inner;
      }
      function militia(callback){

         that.$idb.then(function($idb){
            angular.extend(params.eternal,{"modified":new Date().format('isoDateTime')});

            $idb.write(params.mensa||queryLoad.mensa,params.eternal,true,null,innerCall);
            function innerCall(e){
               var dataLoad={};angular.copy(params,dataLoad);//copy to dataLoad, bcos idb needs the full spec of eternal but the server does not
               if(dataLoad.eternal.links_)dataLoad.eternal.links_={};//reduce load
               RECORD = new service(dataLoad);
               if (that.isConnected) RECORD.$militia(callback);
               else{
                  var server = {"notitia":{"iota":params.eternal.jesua,"transaction":"deLta","msg":"Successfully updated"}}//['notitia'=>["msg"=>$msg,"iota"=>$iota,"trnsc"=>$trnsc,"quaerere"=>$sql,"consuetudinem"=>$custom,"transaction"=>$this->transaction,"idem"=>$this->idem]];
                  callback(server);
               }
            }
         }).catch(function(arr){iyona.msg("There was an error capturing the data",[msg,data,e]);iyona.on(arr)});
         return inner;
      }
      function query(){}
      function remove(jesua,callback){//@jesua can be either obj or {jesua:jesua}

         that.$idb.then(function($idb){
            if(typeof jesua ==="object") jesua = jesua.jesua||jesua;//if object get jesua otherwise jesua is from the func argument
            $idb.rem(params.mensa,jesua,innerCall);
            function innerCall(e){
               if (that.isConnected)service.delete({"jesua":jesua},callback);//@jesua can be either obj or {jesua:jesua}
               else {
                  var server = {"notitia":{"iota":jesua,"transaction":"omegA","msg":"Successfully deleted"}};//['notitia'=>["msg"=>$msg,"iota"=>$iota,"trnsc"=>$trnsc,"quaerere"=>$sql,"consuetudinem"=>$custom,"transaction"=>$this->transaction,"idem"=>$this->idem]];
                  callback(server);
               }}
         }).catch(function(arr){iyona.msg("There was an error removing the data");iyona.on(arr);});
      }
      function save(callback){

         that.$idb.then(function($idb){
            var jesua = jesuaNew(params.mensa),newDate=new Date().format('isoDateTime');
            angular.extend(params.eternal,{"created":newDate,"modified":newDate,"jesua":jesua,"blossom":jesua });

            $idb.write(params.mensa||queryLoad.mensa,params.eternal,false,null,innerCall).catch(function(arr){iyona.msg("There was an error saving the data");iyona.on(arr);});
            function innerCall(e){
               var dataLoad={};angular.copy(params,dataLoad);//copy to dataLoad, bcos idb needs the full spec of eternal but the server does not
               if(dataLoad.eternal.links_)dataLoad.eternal.links_={};//reduce loading sub child
               RECORD = new service(dataLoad);//now create a $resource for online save
               if (that.isConnected) RECORD.$save(callback);
               else{
                  //message from server
                  //['notitia'=>["msg"=>$msg,"iota"=>$iota,"trnsc"=>$trnsc,"quaerere"=>$sql,"consuetudinem"=>$custom,"transaction"=>$this->transaction,"idem"=>$this->idem]];
                  var server = {"notitia":{"iota":jesua,"transaction":"Alpha","msg":"Successfully saved data"}};
                  callback(server);
               }
            }
         });
         return inner;
      }

   };//endufntion notitia
   /**
    * function can be used in two manner. Storing wen an onlne error occured
    * storing wen offline
    * @param {object} basilia, the data to store offline for sync.
    * @param {string} store, nale of the profile to store in
    * @param {string} tau, the transaction to be used
    * @param {object} options, omega|tau|links_ data for delete,transaction 4 sql, the rn_consue on the server
    * @returns {undefined}
    */
   function offlineStorage(basilia,store,tau,options){
      if(store==='caecus' || that.isConnected===true) return false;//prevent infinite loop of write.
      var tmp=basilia.rows||basilia,
      quaerere={
         "created":new Date().format('isoDateTime'),
         "document": {},
         "jesua":tau+'-'+basilia.jesua,
         "store":store,
         "trans":tau,
         "vita":basilia.jesua||basilia.vita};
      for(var key in tmp) quaerere.document[key]=tmp[key];//copy document
      if((options && options.links_ && basilia.links_[options.links_])){
         quaerere.document = options.linkedChild||basilia.links_[options.links_];
         quaerere.jesua    = (options.vita)? options.tau+'-'+options.vita: options.tau+'-'+basilia.jesua;
         quaerere.store    = options.links_;
         quaerere.trans    = options.tau;
      }

      if(quaerere.document.links_)quaerere.document.links_={};//remove links in order to save space
      that.$idb.then(function($idb){iyona.off("CHECK",quaerere,basilia,options); $idb.write('caecus',quaerere,true); });

      iyona.off("CONNECTION CHECKing",that.isConnected);

   }
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
   function principio(from){//kick start the storage system, used upon login or application start
      return that.$idb = setIndexeddb(from);//{1}run it on 1st time ::[PROMISE]
   }
   function setIndexeddb(from){iyona.info("Running "+(dynamis.get("SITE_CONFIG").Worker?"locally":"online")+" with connection="+checkConnection()+" and initiated from "+from||'unknown','black');
      var $idb       = {}, def = $q.defer();
      $idb.rem       = iErase;
      $idb.read      = iRead;
      $idb.write     = iWrite;
      $idb.idb       = null;

      if(dynamis.get('SITE_CONFIG').deleteWorker || false)indexedDB.deleteDatabase(sessionStorage.DB_NAME);
      else{
         callWorker({"progredior":true,"option":true,"from":from},function(data){//{3}. Check for upgrade
            if(data==="Upgradding") {}
            else if(data==="Worker iDB Ready"){
               $idb.IDBReady  = true;
               $idb.iRequest  = indexedDB.open(sessionStorage.DB_NAME);
               $idb.iRequest.onsuccess =function(e){$idb.idb=$idb.iResult||e.target.result||$idb.iRequest.result;def.resolve($idb); iyona.info("Front End iDB Ready",'forestgreen');}
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
         }
         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.err("iErase No store iFound: "+_store);deferred.reject(_store);}

         var store=_store,transaction=this.idb.transaction(store,"readwrite");
         var objectStore=transaction.objectStore(store);
         var request=objectStore.delete(_index);
         request.onsuccess=function(e){
            iyona.info("Successfully iErased record "+_index+".");
            that.offlineStorage({"jesua":_index},_store,'omega');
            if(_callback)_callback(e);
            deferred.resolve(e);};
         request.onerror=function(e){iyona.err("failed to deleted record.",e);deferred.reject([request.error,store,e]);};
         return promise;
      }
      //=========================================================================//
      function iRead(_store,_index,_passVar,_callback){
         var deferred = $q.defer(),promise=deferred.promise,isCursor=false,using={},result=[];

         if(!$idb.iRequest) {
            iyona.err("No iRequest on reading "+_store,_store);
            //if it does not start create function to iStart()
            //document.addEventListener("IDBReady",function(e){iyona.on("On IDB ready IamReading",e.detail.success);$idb.iRead(_store,_index,_callback,_passVar);});
            deferred.reject(false);
         }

         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.err("iRead No store iFound: "+_store);deferred.reject(_store);}

         var store=_store,transaction=$idb.idb.transaction(store,"readonly"),request;
         var objectStore=transaction.objectStore(store),ndx=null,order='next',keyRange=null;

         if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("where")){ndx=objectStore.index(_index.where);using.where=_index.where;}//GET NDX NAME
         if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("order")){order=(_index.order.search(/desc/i)!==-1||_index.order.search(/prev/i)!==-1)? 'prev': 'next';using.order=_index.order;}

         if(_index!==null&&(typeof _index==="number"||typeof _index==="string"))             {request=objectStore.get(_index);using.get=_index;//FOR PK
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("top"))     {isCursor=true;keyRange=IDBKeyRange.lowerBound(_index.top); request=ndx.openCursor(keyRange,order);using.top=_index.top;//limit top
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("bot"))     {isCursor=true;keyRange=IDBKeyRange.upperBound(_index.bot); request=ndx.openCursor(keyRange,order);using.bot=_index.bot;//limit bottome
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("between")) {isCursor=true;keyRange=IDBKeyRange.bound(_index.between[0],_index.between[1],true,true); request=ndx.openCursor(keyRange,order);using.between=_index.between;//between
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("equals"))  {request=ndx.get(_index.is);using.is=_index.is;//FIRST GET INDEX:: where field1=value
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("is"))      {isCursor=true;request=ndx.openCursor(_index.is,order);using.is=_index.is;//FIRST GET INDEX:: where field1=value
         }else if(_index!==null&&angular.isArray(_index))                                    {isCursor=true;request=objectStore.openCursor(_index);using.array=_index;//where field1=value1 and field2=value2
         }else if(_index!==null&&typeof _index==="object"&&_index.hasOwnProperty("like"))    {keyRange=IDBKeyRange.bound(_index.like,_index.like+'\uffff'); request=ndx.openCursor(keyRange,'prev');using.like=_index.like;//where like...
         }else if(ndx){request=ndx.openCursor(keyRange,order); using.ndx=_index;
         }else{
            var creation = dynamis.get('eternal',true)[store].creation,
                  field= Object.keys(creation)[0],
                  node = creation[field],
                  indexOrder = (node.unique)? 'uniq_'+field: node.ndx;
                  iyona.off("INDEX",creation,field,node,indexOrder);
            request=objectStore.index(indexOrder).openCursor(null,order);isCursor=true;using.all=_index;
         }

         request.onsuccess=function(e){
            var cursor = e.target.result;
            iyona.off('CURSOR',isCursor,_index,cursor,e);
            if(cursor && isset(cursor.value)){
               result.push(cursor.value);
               cursor.continue();
            }else if(cursor){
               result.push(cursor);
            }
         }//e.target.result
         //request.oncomplete=function(e){iyona.on("Successfully iRead to "+store,using,e);}
         transaction.oncomplete=function(e){
            iyona.info("Successfully iRead transaction "+_index+" to "+store,using);
            if(typeof _callback ==='function')_callback(result,isCursor,_passVar);
            deferred.resolve(result,isCursor,_passVar);
         }
         request.onerror=function(e){iyona.err("Error while writing to "+store+"::"+request.error,e); deferred.reject([request.error,store,e]);}
         return promise;
      }
      //=========================================================================//
      /*
       * @check : worker.muneris.js @twin
       */
      function iWrite(_store,_data,_update,_options,_callback){
         var crud;
         var deferred = $q.defer(),promise=deferred.promise;

         if(!$idb.iRequest) {
            iyona.err("No iRequest on writting "+_store);
            //document.addEventListener("IDBReady",function(e){iyona.on("On IDBready Iam Writting",e.detail.success);$idb.iWrite(_store,_data,_update);});
            deferred.reject(false);
         }
         $idb.idb=$idb.iRequest.result;
         if($idb.idb.objectStoreNames.contains(_store)!==true){iyona.err("write No store iFound: "+_store);deferred.reject(_store);}

         var store=_store,transaction=$idb.idb.transaction(store,"readwrite"),request;
         var objectStore=transaction.objectStore(store);
         if(typeof _data!=="object") {iyona.err("No iData",_data);deferred.reject(_data);}

         if(!_update){request=objectStore.add(_data);crud='Alpha';}
         else {request=objectStore.put(_data);crud='deLta';}
         request.onsuccess=function(e){
            if(_options && _options.display===false); else iyona.info("Successfully "+crud+" write to "+store,_data);
            that.offlineStorage(_data,_store,crud,_options);
            if(typeof _callback ==='function')_callback(e);
            deferred.resolve(e);};
         //transaction.oncomplete=function(e){iyona.on("Successfully completed write transaction to "+store+"::",e);};
         request.onerror=function(e){iyona.err("Error while writing to "+store+"::"+e.target.error.message,_data);deferred.reject([e.target.error.message,store,_data,e]);};
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

