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
   else if (isset(data.proxime))    {proxime();}


   //=========================================================================//
   function novaNotitia(){
      resetNotitia({users:1,groups:1,ug:1,perm:1,pg:1,pu:1,client:1,contact:1,address:1,dealer:1,salesman:1,ver:1,pages:1,features:1,db:1});
      post('Database reseted.');
   }
   //=========================================================================//
   function progredior(){//progress
      $f.callIdb(self);
   }
   //=========================================================================//
   function enkele(){//single fetch to Idb
      var iDB = $f.callIdb(self),l,x;
      console.log("WORKING ENKELE", typeof data.militia);
      if(data.militia==="imple"){
         $f.aSync(SITE_SERVICE,{"militia":"imple","mensa":data.mensa,"uProfile":data.uProfile},function(e){
            if(typeof e.notitia==="undefined" || typeof e.notitia[data.mensa].rows==="undefined"){console.log("could not auto update iDB",e);
               post("could not auto update iDB on "+data.mensa);return false;}
            l=e.notitia[data.mensa].rows.length;console.log("DATA added",data.mensa,e);
            for(x=0;x<l;x++){iDB.iWrite(data.mensa,e.notitia[data.mensa].rows[x],true);}
            post("Worker Typeahead addition for "+data.mensa);
         });
      }
   }
   //=========================================================================//
   function factum(){//server event to fetch data || socket
      var serverEvent;
      serverEvent=new EventSource("https://demo.xpandit.co.za/aura/home-event");
      serverEvent.addEventListener('init',function(ev){
         cnt++;if(cnt>=50){console.log("Closing worker"); serverEvent.close();self.close();}
         var results=JSON.parse(ev.data);console.log("WK + SERVER EVENT INIT-"+cnt);
         if(!results||"servers" in results===false) {console.log("There was an error in bethel's results");return false;}
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
         }catch(e){console.log("There was an error in bethel",e.message);}
      });
      serverEvent.onerror=function(ev){iyona.console.log("Server event error.",ev);}
      self.onclose=function(){serverEvent.close();console.log("Closing worker && SSE :: OnClose");}

      if(data.factum==="close"){
         serverEvent.close();
         serverEvent=new EventSource("http://demo.xpandit.co.za/aura/home-event,close");
         console.log("Living God, Closing worker && SSE");
         self.close();
      }
   }
   //=========================================================================//
   function proxime(){
      console.log("Closing worker && SSE");
      self.close();//serverEvent.close();
   }
   //=========================================================================//
});//evenlistener for message


