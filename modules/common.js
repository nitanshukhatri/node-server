

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var roles={
    superAdmin:'superAdmin',
    admin:'admin'
}

var notAuthorisedError={
    message:"Not Authorised"
}

var sendMessage=function(msg){
    return {
        message:msg
    }
}
var convertToObjectID=function(id){
    return mongoose.Schema.Types.ObjectId(id)
}
function roleAdminOrSuperAdmin(myrole){
    if(myrole==roles.admin || myrole==roles.superAdmin){
      return true
    }
  }

 function canCreate(req,type,brand){
     return new Promise((resolve,reject)=>{
        if(roleAdminOrSuperAdmin(req.user.role)){
            req.body.company_id=req.user.company_id
            brand.findOne({_id:req.body.brand_id,company_id:req.user.company_id},function(err,brand){
                if(err) { reject(err) }
                if(brand){
                type.findOne({brand_id:req.body.brand_id,company_id:req.user.company_id,name:req.body.name},function(err,typeFound){
                  if(err) { reject(err) }
                  if(typeFound){
                    reject('Found')
                  }else{
                    resolve()
                }
              })
            }else{
                reject('Brand Not Found')
            }
          })
        }   
          else{
             reject(notAuthorisedError)
          }
     })

 } 
module.exports={
    roles,
    notAuthorisedError,
    sendMessage,
    convertToObjectID,
    roleAdminOrSuperAdmin,
    canCreate
}