/**
 * @important _id, the id of the document
 * @important _rev, the revision of the document
 * @important _deleted, set the document to true for it to be deleted
 * @important _attachments, for inline document saved with an attachement
 * @param {string} name, db name
 * @param {boolean} change, whether to notify changes on db
 * @returns {notitia.self|notitia}
 */
function notitia(name,change){
   var self=this;
   change=change||false;
   name = name||sessionStorage.DB_NAME;

   self.add       =add;//create record with new id
   self.allDocs   =allDocs;//batch fetch
   self.bulkDocs  =bulkDocs;//batch update,create,delete generates id if not presents
   self.db        =db;//return $db object
   self.del       =del;//delete the db
   self.changes   =changes;//delete the db
   self.get       =get;//fetches the record
   self.getAttach =getAttachement;//get attachement data
   self.incipio   =incipio;//start the db
   self.put       =put;//updates a record
   self.putAttach =putAttachment;//updates a record
   self.query     =query;//retrieves a view
   self.rem       =rem;//removes a record
   self.remAttach =remAttachement;//removes a record
   self.replicate =replicate;//replicate a db from source to target
   self.sync      =sync;//Sync data from src to target and target to src. This is a convenience method for bidirectional data replication.
   self.update    =update;
   self.incipio();
   if(change)self.changes({include_docs:true,live:true})
           .on('change',function(changes){ console.log("CHANGES",changes);})
           .on('uptodate',function(res){ console.log("LIVE CHANGES", res);})
           .on('complete',function(res){ console.log("COMPLETED CHANGES", res);})
           .on('error',function(err){ console.log('ERROR ON CHANGES',err);});

   ///doc, [options], [callback]
   function add(doc, options, callback) {return self.post(doc, options, callback);}
   ///options.{include_docs,startkey,endkey,inclusive_end,limit,skip,descending,key,keys}
   function allDocs(options,callback){}
   ///_deleted:true to delete
   function bulkDocs(docs, options, callback) {return self.$db.bulkDocs(docs,options,callback);}
   function db(){return self.$db;}
   function del(){self.$db.destroy(name,function(err,info){console.info("Removed DB::"+sessionStorage.DB_NAME,err,info);});}
   ///options.{include_docs,descending,filter,doc_ids,since,live,limit,style,view,returnDocs,batch_size}
   function changes(options){ return self.changes(options);}
   ///docId, [options {rec,revs,revs_info,open_revs,conflicts,attachements,local_seq,ajax}], [callback]
   function get(docId,options,callback){return self.$db.get(docId,options,callback);}
   ///docId, attachmentId, [options], [callback]
   function getAttachement(docId,attachementId,options,callback){ return self.$db.getAttachement(docId,attachementId,options,callback);}
   function incipio(){self.$db = new PouchDB(name,{adapter:'idb'});}
   ///db.put(doc, [docId], [docRev], [options], [callback])
   function put(doc,docId,docRev,options,callback){ return self.$db(doc,docId,docRev,options,callback);}
   ///docId, attachmentId, rev, attachment, type, [callback]
   function putAttachment(docId,attachementId,rev,attachement,type,callback){ return self.$db(docId,attachementId,rev,attachement,type,callback);}
   function query(fun,options,callback){return self.$db.query(fun,options,callback);};
   function rem(doc,options,callback){ return self.$db(doc,options,callback);}
   function remAttachement(docId,attachementId,rev,callback){ return self.$db(docId,attachementId,rev,callback);}
   function replicate(source,target,options){options=options||{};options.batch_size=5; return self.$db.replicate(source,target,options);}
   function sync(source,target,options){
      options=options||{};options.batch_size=5;
      return self.$db.sync(source,target,options)
         .on('change',function(info){ console.info("Sync changed",info);})
         .on('complete',function(info){ console.info("Sync complete",info);})
         .on('uptodate',function(info){ console.info("Sync live update",info);})
         .on('error',function(info){ console.error("Sync error",info);})
   }
   function update(){}
   return self;
}
//(function(name){
   var name = 'testingDB';
   var notitia = notitia(name);
   //notitia.$db.put({name:'Albertine',surname:'Mulombo'},'Names','2',{}).then(function(err,res){ console.log("Result",err,res); });
   //console.log('called',name,$db);
//})('testingDB');