/*
 * The worker file to process the DB
 * No window|document|parent
 */
var WORK = self;
importScripts('worker.muneris.js');
self.addEventListener('message',function(e){
   var data=e.data,cnt=0;
   var SITE_SERVICE=data.SITE_SERVICE,SITE_MILITIA=data.SITE_MILITIA;
   var $f = new workerMuneris(data);

   if(isset(data.novum)) {}
   else if (isset(data.novaNotitia)){novaNotitia();}
   else if (isset(data.progredior)) {progredior();}
   else if (isset(data.enkele))     {enkele();}
   else if (isset(data.factum))     {factum();}
   else if (isset(data.onlineSync)) {onlineSync();}
   else if (isset(data.proxime))    {proxime();}


   //=========================================================================//
   function novaNotitia(){
      resetNotitia({users:1,groups:1,ug:1,perm:1,pg:1,pu:1,client:1,contact:1,address:1,dealer:1,salesman:1,ver:1,pages:1,features:1,db:1});
      post('Database reseted.');
   }
   //=========================================================================//
   function progredior(){//progress idb upgreade
      $f.callIdb(self);
   }
   //=========================================================================//
   function enkele(){//single fetch to Idb: militia|mensa|eternal[jesua|procus]
      var iDB = $f.callIdb(self),l,x,a,b,finished,tbl=[];

      if(!data.procus || !data.jesua) {console.log("Closing worker:: No identity");self.close(); return false;}
      if(!data.mensa){ for(var profile in data.eternalScope) tbl.push(profile); data.mensa = tbl;}
      deb("WORKING ENKELE", data.jesua, data.procus,data.mensa);

      $f.aSync({params:{"militia":"impleOmnis","mensa":data.mensa,"eternal":{"jesua":{"alpha":data.jesua},"procus":data.procus}},callback:callback});
      function callback(e){console.dir(e);
         if(typeof e.notitia==="undefined" ){
            deb("Closing worker::could not auto update iDB",e);
            post("Failed to sync iDB on "); self.close(); return false;}

         if(data.mensa instanceof Array===false) data.mensa = [data.mensa];
         b = data.mensa.length;
         for(a=0; a<b; a++){
            var profile = data.mensa[a];
            if(!e.notitia[profile]) continue;
            l=e.notitia[profile].rows.length;
            deb("Worker sync "+profile+' processing '+(a+1)+' of '+b );
            for(x=0;x<l;x++){
               finished=((a+1)===b && (x+1)===l);
               iDB.iWrite(profile,e.notitia[profile].rows[x],true,finished);
               if(finished&&false)post("Sync Done");}
         }//for
         setTimeout(function(){console.log("Closing worker::by timmer"); post('close'); self.close();},1000*60*3);
      }//callback
   }//enkele
   //=========================================================================//
   function factum(){//server event to fetch data || socket
      var serverEvent;
      serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event");
      serverEvent.addEventListener('init',function(ev){
         cnt++;if(cnt>=50){deb("Closing worker"); serverEvent.close();self.close();}
         var results=JSON.parse(ev.data);deb("WK + SERVER EVENT INIT-"+cnt);
         if(!results||"servers" in results===false) {deb("There was an error in bethel's results");return false;}
         var back = {"results":results,"scope":{"servers":null,"online":null,"serverLine":null}};
         var scope=results;
         try{ results=null;
            var row1 = (typeof scope.online.rows[0] !=="undefined")?scope.online.rows[0].count:0,row2 = (typeof scope.online.rows[1] !=="undefined")?scope.online.rows[1].count:0;
            scope.total=parseInt(row1)+parseInt(row2);//total number of server
            scope.down=( (scope.online.length>1)||(scope.online.length==1&&scope.online.rows[0].status=="down") )?true:false;//if there is two row or one with a down status
            scope.msg=(scope.down)?"You have one or more server down<br/>":"There are no Inactive server";
            var n = (scope.online.rows[1])?scope.online.rows[1].count:(scope.online.rows[0])?scope.online.rows[0].count:1;
            scope.downTotal=n;
            if(scope.down){
               scope.msgStatus="You have "+n+" server down";
            }else{scope.msgStatus="All servers are operational.";}
            scope.last=scope.online.rows[0].modified;
            back.scope=scope; self.postMessage(back);
         }catch(e){deb("There was an error in bethel",e.message);}
      });
      serverEvent.onerror=function(ev){deb("Server event error.",ev);}
      self.onclose=function(){serverEvent.close();deb("Closing worker && SSE :: OnClose");}

      if(data.factum==="close"){
         serverEvent.close();
         serverEvent=new EventSource("http://demo.xpandit.co.za/aura/home-event,close");
         deb("Living God, Closing worker && SSE");
         self.close();
      }
   }
   //=========================================================================//
   function proxime(){
      deb("Closing worker && SSE");
      self.close();//serverEvent.close();
   }
   //=========================================================================//
});//evenlistener for message


