let mongo = require('mongodb');

let email=require('./email');

module.exports={
    addnotification(db, notification,callback)
    {
        db.collection('notifications').insertOne(notification,(err,result)=>{

            //to=notification.email;

            //emailsss
            subject='';
            
            message='';

            if(notification.type==='PROJECTCREATED')
            {
                subject='Project Created';
                message='Hey '+notification.project.projectmanagername+', you are now Project manager of '+notification.project.projectname+'. ';
            }

            
            if(notification.type==='PROJECTUPDATED')
            {
                subject='Project Updated';
             message='You have to complete this project within 3 months.You must use ASP.NET as front end and MongoDB as backend.If any query please contact us';
            }
            
            if(notification.type==='TASKASSIGNMENT')
            {
                subject='Task Assigned';
                message=notification.project.projectmanagername+ ' , has assigned you to tasks.';
            }
            if(notification.type==='TASKUPDATED')
            {
                subject='Task Updated';
            }
              
            db.collection('user').findOne({_id:new mongo.ObjectId(notification.userid)},(err,user)=>{

            email(user.email,subject,message);
        });

            if(callback) callback(err,result);
        });
    },

    getUser(db,userid,callback)
    {
        db.collection('user').findOne({_id:new mongo.ObjectId(userid)},(err,user)=>
        {
            callback(user);
        });
    }
};