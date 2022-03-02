let express = require('express')
const {UserModel, ChatModel} = require('../db/models')
const md5 = require('blueimp-md5')
const { response } = require('express')
let router = express.Router()
const filter='-password -__v'
// const filter={password:0, __v:0}

router.post('/register', async function(req, res) {
    try {
        const {username, password, type} = req.body
        const data = await UserModel.findOne({username})
        if (data){
            return res.json({code:1, msg:'user exists'})
        }
        const val =  await new UserModel({
                    username,
                    type,
                    password:md5(password)
                }).save()
        res.cookie('userid', val._id, {maxAge:1000*60*60*24})
        res.json({
            code:0,
            data:{_id:val._id, username:val.username, type:val.type}
        })
    }catch(err){
        console.log(err);
        res.json({code:1, msg:'server busy... retry later'})
    }
    // //#region 
    // UserModel.findOne({username}, function(err, data) {
    //      if (err){
    //         return res.json({code:1, msg:'server busy... retry later'})
    //      }
    //      if (data){
    //         return res.json({code:1, msg:'user exists'})
    //      }
    // })

    //     new UserModel({
    //         username,
    //         type,
    //         password:md5(password)
    //     }).save()
    //     .then(val => {
    //         let {_id, username, type} = val
    //         res.cookie('userid', _id, {maxAge:1000*60*60*24*7})
    //         res.json({
    //             code:0,
    //             data:{_id, username, type}
    //         })
            
    //     }, err => {
    //         res.json({code:1, msg:'server busy... retry later'})
    //     })
    //     //#endregion
})

router.post('/login', function(req, res) {
    const {username, password} = req.body
    UserModel.findOne({username, password:md5(password)},filter, function(err, data) {
         if (err) {
             return res.json({code:1, msg:'server busy.... retry later'})
         }
         if (data){
            res.cookie('userid', data._id, {maxAge:1000*60*60*24}) 
            return res.json({
                code:0,
                data
            })
         }else {
            return res.json({
                code:1,
                msg: 'wrong username or password'
            })
         }
         
    })
})

router.post('/update', function(req, res) {
    const userid = req.cookies.userid
    if (!userid) {
        return res.json({
            code:1,
            msg:'login first'
        })
    }
    UserModel.findByIdAndUpdate(userid,req.body, function(err, oldUser) {
         if (!oldUser){
             res.clearCookie('userid')
             return res.json({
                 code:1,
                 msg:'login first'
             })
         }
         const {_id, username, type} = oldUser
         res.json({
             code:0,
             data:{...req.body, ...{_id, username, type}}
         })

    })
})

router.get('/user', function(req, res) {
    const userid = req.cookies.userid
    if(!userid){
        return res.json({code:1, msg:'login first'})
    } 
    UserModel.findOne({_id:userid}, filter, function(err, data) {
        if (err){
            return res.json({code:1, msg:'server busy...retry later'})
        }
         return res.json({code:0, data})
    })
})

router.get('/userlist', function(req, res) {
    const {type} = req.query
    UserModel.find({type}, filter, function(err, data) {
        if (err){
            return res.json({code:1, msg:'server busy...retry later'})
        }
         return res.json({code:0, data})
    }) 
})

router.get('/msglist', function(req, res) {
    let users = {}
    const curUser = req.cookies.userid
     UserModel.find({}, filter, function(err, data) {
        if (err){
            return res.json({code:1, msg:'server busy...retry later'})
        }
        users = data.reduce((users, user) => {
             users[user._id] = {username:user.username, avatar:user.avatar}
             return users
        }, {})
     })

     ChatModel.find({})
        .or([{from:curUser}, {to:curUser}])
        .exec(function(err, chatMsgs) {
            res.json({
                code:0,
                data:{users, chatMsgs}
            }) 
        })
})

router.post('/msgread', function(req, res) {
    const {from} = req.body
    const to = req.cookies.userid

    ChatModel.updateMany({from, to, read:false}, {read:true}, function(err, rec) {
         res.json({
             code:0,
             data:rec.modifiedCount
         })
    })

})
module.exports = router