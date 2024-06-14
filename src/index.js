// ajsrinivas@bitgo.com
const express = require('express')
const app = express()
const port = 3000
var bodyParser = require('body-parser')
app.use( bodyParser.json() );  
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 




const notifcationsMap = {}


// LIST
app.get('/notifications', (req, res) => {
    res.json(notifcationsMap)
  })
  

app.post('/notifications', (req, res) => {
    const len = Object.keys(notifcationsMap).length
    const {name,cp,v} = req.body
    const obj = {
        name:name,
        cp:cp,
        v:v,
        createdAt: "",
        updatedAt:"",
        createdBy:"admin-user",
        updatedBy:"admin-user",
        emails:[],
        status:"pending",
        isActive:true
    }
    console.log("parms",name,cp,v)
    console.log("req",req.body)

    notifcationsMap[len+1] = obj
    res.json({
        id:len+1
    })
})

app.patch('/notifications/:id', (req, res) => {
    const {id} = req.params
    if(notifcationsMap[id]['isActive']){
        const {name,cp,v} = req.body
        if(name){
            notifcationsMap[id]['name'] = name
        }
        if(cp){
            notifcationsMap[id]['cp'] = cp
        }
        if(v){
            notifcationsMap[id]['v'] = v
        }
        res.sendStatus(200);
        return
    }
    res.sendStatus(404)
})

app.delete('/notifications/:id', (req, res) => {
    const {id} = req.params
    if(notifcationsMap[id] && notifcationsMap[id]['isActive']){
        notifcationsMap[id]['isActive'] =  false
        res.sendStatus(200);
        return
    }
    res.sendStatus(404)
})
/**
 * Send notification
 */
app.get('/send-notifs/:id', (req, res) => {
    console.log("this is the id",req.params.id)
    const {id} = req.params
    const {emails} = req.body
    if(notifcationsMap[id] && notifcationsMap[id]['isActive']){
        notifcationsMap[id]['emails'] =  emails
        notifcationsMap[id]['status'] = "sent"
        res.sendStatus(200);
    }else{
        res.sendStatus(404)
    }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//TODO
//  implement dir structure 
// 

/**
 * implement dir structure 
 * add baseurl
 * testcases
 * Schema validation
 * API validations
 * 
 * 
 */