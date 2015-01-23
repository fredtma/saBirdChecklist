/*
 * web workers function support with minimun cloning of original
 * @todo:version_db
 */

function workerMuneris(data){
   var jesua=data.jesua;
   var procus=data.procus;
   var SITE_MILITIA=data.SITE_MILITIA;
   var SITE_SERVICE=data.SITE_SERVICE;
   var SITE_AURA=data.SITE_AURA;
   var DB_VERSION=data.DB_VERSION;
   var DB_NAME=data.DB_NAME;
   var eternalScope=data.eternalScope;
   var that = this;
   that.aSync=aSync;
   that.callIdb=callIdb;
   that.isset=isset;
   that.deb=deb;
   that.objSearch=objSearch;
   that.post=post;

//============================================================================//
   function aSync(settings){//{method,format,url,params,callback}
      var defaults={"method":"post","format":"json","url":SITE_SERVICE};
      for (var key in defaults) { settings[key] = settings[key]||defaults[key];}
      var xhr=new XMLHttpRequest(),params;//deb("async",settings.method,settings.url);

      xhr.open(settings.method,settings.url,true);
      xhr.withCredentials=true;
      xhr.setRequestHeader('SITE_AURA',SITE_AURA);
      xhr.responseType=settings.format;
      xhr.onreadystatechange=function(e){//deb("Begining...",this.readyState,this.status,this.response,settings);
         if(this.readyState===4 && this.status===200){
            var response=this.response||"{}";//@fix:empty object so as to not cause an error
            if(typeof response==="string"&&settings.format==="json" )response=JSON.parse(response);//wen setting responseType to json does not work
            //else response=JSON.parse(response); //@change: if object is not a string, changes are that it is an object already
            if(typeof settings.callback==="function")settings.callback(response);
         }
      }//xhr.onload=function(e){iyona.on("III",e,this.readyState,this.status,this.response);};

      if(typeof settings.params==="object"){
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");params=JSON.stringify(settings.params);
      }else{
         params=settings.params;xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      };
      if(settings.format==="json"||true){
         xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");//questionable, to be removed?
         xhr.setRequestHeader("Accept","text/html,application/xhtml+xml,application/xml;application/json;q=0.9,*/*;q=0.8");//used in FF
      }
      xhr.onerror=function(e){deb("Check internet connection",e,settings);};
      xhr.send(params);
   }
//============================================================================//
   function callIdb(self) {
      var ver = DB_VERSION||null,x,l,a,b,tbl=[];
      var iRequest=self.indexedDB.open(DB_NAME,parseInt(ver));
      var idb,option=data.option,upgrading=false;
      var that=this;
      that.iWrite = iWrite;

      iRequest.onsuccess=function(e){
         post("Worker iDB Ready");
         deb("Back end iDB Ready");
         idb=idb||e.target.result||iRequest.result;

         //place the addition of data in seperate loop, in order to prevent `transaction running`
         if(upgrading===true && true){
            for(var profile in eternalScope){
               if(profile==='creo') continue;
               tbl.push(profile);}

            aSync({params:{"militia":"impleOmnis","mensa":tbl,"licentia":"Creo Ratio","eternal":{"jesua":{"alpha":jesua},"procus":procus}},callback:callback});
            function callback(e){
               if(e && typeof e.notitia==='undefined'){deb("could not auto update iDB on upgrade",e);return false;}

               var whole = e.notitia,key,single;
               b = tbl.length;
               for(a=0; a<b; a++){
                  var profile = tbl[a];
                  if(!whole[profile]) continue;
                  single = whole[profile];
                  if(single.found===false || !isset(single.rows)){deb("Not Mensa "+profile,single); continue;}
                  l=single.rows.length;
                  console.log("4 Mensa "+profile);
//                  iWrite(key,single.rows,false);}
                  for(x=0;x<l;x++){iWrite(profile,single.rows[x],false,((a+1)===b && (x+1)===l));}
               }//endfor
            }//callback
         }//if upgrading
         setTimeout(function(){console.log("Closing after finish upgrade:: Timer");self.close();post('close');},1000*60*3);
         upgrading=false;
      }
      iRequest.onerror=function(e){deb("Closing worker::Database error code: "+e.target.error.message);self.close();}
      iRequest.onblocked =function(e){deb("Closing worker::Please close all other tabls with that application",e);self.close();}
      iRequest.onupgradeneeded=function(e){post("Upgradding");
         idb=e.target.result||iRequest.result;
         upgrading=true;
         deb("eternalScope",eternalScope,option);
         for(var profile in eternalScope){
            if(option!==true||(typeof option==="object" && option.hasOwnProperty(profile)===false )){deb("skipping",profile); continue;}
            var creation = eternalScope[profile].creation;
            deb("SETTING PROFILE "+profile);
            //if(table==='creo') continue;
            if(idb.objectStoreNames.contains(profile)!==true){//new store creation
               var store=iRequest.result.createObjectStore(profile,{keyPath:"jesua"});
               for(var field in creation){//@note:no need to add store as the store is dynamic.
                  var current=creation[field]; if(field==='jesua' || !isset(current))continue;

                  if(current.unique) store.createIndex('uniq_'+field,field,{unique:true});//keyname,keypath
                  if(current.ndx) store.createIndex(current.ndx,field);
               }//for field in mensa.fields
            }else{//to update the object store's index
               store=(iRequest.transaction)?iRequest.transaction.objectStore(profile):e.currentTarget.transaction.objectStore(profile);
               var x,l=store.indexNames.length;
               if(true){store.clear();}//removing all records from the object store and removing all records in indexes that reference the object store
               //deb("COLUMN",typeof store.indexNames,store.indexNames instanceof Array,store.indexNames,table);
               for(x=0;x<l;x++){if(typeof store.indexNames[x]==='string')store.deleteIndex(store.indexNames[x]);}//remove all indexs

               for(var field in creation){//@note:no need to add store as the store is dynamic.
                  var current=creation[field];//if(field==='jesua')continue;deb("CURRENT",current,field);
                  try{
                     if(current.unique&&!objSearch(store.indexNames,'uniq_'+field)) {store.createIndex('uniq_'+field,field,{unique:true});}
                     if(current.ndx&&!objSearch(store.indexNames,current.ndx)) {store.createIndex(current.ndx,field);}
                  }catch(e){deb("An error occured in creating the index::"+e.message, field,e)}

               }//for field in mensa.fields
            }
            iRequest.transaction.onerror=function(e){deb("A database error code: "+e.target.errorCode,e);}
         }
      }

      function iWrite(_store,_data,_update,_close){
         var crud;
         if(iRequest&&iRequest.readyState!="done"){iRequest.addEventListener("success",function(){ iWrite(_store,_data,_update)},false); return false;}
         else if(iRequest) {idb=iRequest.result;}
         else {
            deb("No iRequest on writting "+_store);
            return false;
         }
         if(idb.objectStoreNames.contains(_store)!==true || !_store){deb("No store iFound");return false;}

         var store=_store,transaction=idb.transaction(store,"readwrite"),request;
         var objectStore=transaction.objectStore(store);
         if(typeof _data!=="object") {deb("No iData");return false;}

//         if(_update===false){var cursor = objectStore.openCursor();if(cursor){objectStore.delete(cursor.primaryKey);cursor.continue;}}//delete all the record
//         if(_update===false){objectStore.clear();}//delete all the record

         if(!_update){request=objectStore.add(_data);crud='inserted';}
         else {request=objectStore.put(_data);crud='updated';}
         request.onsuccess=function(e){
            console.log("Successfully "+crud+" iWrite to "+store);
            if(_close&&false){console.info("CLOSING WORKER."); self.close();}
         }
         request.oncomplete=function(e){deb("Successfully completed iWrite to "+store+"::"+e.target.error.message);}
         request.onerror=function(e){deb("Closing worker::Error while writing to "+store+"::"+e.target.error.message,_data);self.close();}
      }
      return this;
   }
}
//============================================================================//
//FUNCTIONS
//============================================================================//
   /**
    * similar to PHP issset function, it will test if a variable is empty
    * @author fredtma
    * @version 0.8
    * @category variable
    * @return bool
    */
function isset() {
   var a=arguments,l=a.length,i=0;
   if (l===0) {return false;}//end if
   while (i!=l) {if (a[i]===null || typeof(a[i])==='undefined') {return false;} else {i++;}}
   return true;
}//end function
//============================================================================//
function deb(){
   var l=arguments.length,variable,line,tmp;
   var isMobile=false;if(navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/));isMobile=true;
   if(!isMobile) {console.dir(arguments); return false;}

   var isChrome = navigator.userAgent.indexOf("Chrome") !== -1;
   if(isChrome||false){
      var stack = new Error().stack,n=isMobile? 2: isChrome?3:2;
      var file = stack.split("\n")[n].split("/");
      line = '('+file[file.length-1]+')';}
   else{return '';}

   for(var x=0;x<l;x++){
      variable=arguments[x];
      if (typeof variable==="function") variable=encodeURI(variable.toString());
      else if (typeof variable==="undefined"||variable===null){ variable="<null>";}
      else if (variable instanceof Array) {tmp='[';for (var a=0; a<variable.length; a++) tmp+=variable[a]+", "; variable=tmp.slice(0,-2)+']';}
      else if (typeof variable==="object"){tmp='{';for (var index in variable) tmp+=index+': '+variable[index]+", "; variable=tmp.slice(0,-2)+'}';}
      console.log("["+x+"]"+JSON.stringify(variable));}console.log("==============================================================="+line);
}
function post(){
   var l=arguments.length,variable;
   for(var x=0;x<l;x++){
      variable =typeof arguments[x]==="function"? encodeURI(arguments[x].toString()): arguments[x];
      variable = typeof variable==="string"? variable: JSON.stringify(variable);
      WORK.postMessage(variable);}
}

//============================================================================//
   /**
 * use prototype to add a function that searches an object value
 * @author fredtma
 * @version 2.3
 * @category search, object
 * @param array </var>value</var> the value to search in the object
 * @return bool
 */
function objSearch(ele,value){
   var key,l,found=false,obj;
   if(ele instanceof Array){
      l=ele.length;
      for(key=0;key<l;key++){obj=ele[key];
         if(typeof obj==='object' )found=objSearch(obj,value);
         if(found!==false) return [found,key];
         if(typeof obj==="string"&&obj.indexOf(value)!==-1 ) return [ele,key];
      }
   }
    for(key in ele ) {obj=ele[key];
        if(typeof obj==='object' )found=objSearch(obj,value);
        if(found!==false) return [found,key];
        if(typeof obj==="string"&&obj.indexOf(value)!==-1 ) return [ele,key];
    }
    return false;
}


