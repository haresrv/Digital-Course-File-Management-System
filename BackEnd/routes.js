const AWS = require('aws-sdk');
const uuid = require('uuid');
const express = require('express');

const REST_TABLE = process.env.TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const router = express.Router();


router.post('/adminCreate', (req, res) => {
var {UserPoolId,username,email}=req.body
var params = {
      UserPoolId: "us-east-1_2KUwW6T46", /* required */
      Username: username, /* required */
      DesiredDeliveryMediums: ["EMAIL"],
      ForceAliasCreation: false,
      TemporaryPassword: 'Faculty@amrita2000',
      UserAttributes: [
          { Name: "email", Value: email },
          { Name: "preferred_username", Value: "nick" }
      ] 
    };

var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:"us-east-1"});

cognitoidentityserviceprovider.adminCreateUser(params, function(err, data) {
      if (err) {
        var abc={
            error:{message:err}
                }
        res.json(abc)
      } // an error occurred
      else{  
        var abc={
            data:data,
            error:{message:null}
                }
         res.json(abc);         
        }
      
        
      });
    });


router.get('/uploads', (req, res) => {
    const params = {
        TableName: REST_TABLE
    };
    dynamoDb.scan(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error fetching the uploads' });
        }
        res.json(result.Items);
    });
});

router.post('/getupload', (req, res) => {
    const {uploadid,userid} = req.body;
    console.log(req.body)
    const params = {
        TableName: REST_TABLE,
        Key: {
            "userid":userid,
            "uploadid":uploadid
        }
    };

    console.log(params)
    dynamoDb.get(params, (error, result) => {
        if (error) {
            res.status(400).json({ error: 'Error retrieving upload' });
        }
        else{
            if (result!=null) {
                res.json(result.Item);
            } 
            else {
                res.status(404).json({ error:params });
                }
        }
    });
});




router.post('/uploads', (req, res) => {
    const {userid,attachment,description,type,isprivate,section,prefix} = req.body;
  
    const uploadid = uuid.v4();
    var createdAt = Date.now()
    const params = {
        TableName: REST_TABLE,
        Item: {
            userid,
            uploadid,
            attachment,
            createdAt,
            description,
            type,
            isprivate,
            section,
            prefix
        },
    };
       dynamoDb.put(params, (error) => {
            if(error) 
                {
                    res.status(400).json({ error: 'Error adding to uploads' });  
                }
             else 
                {  
                    res.json("Success");
                }
            });
       
});


router.delete('/track/:id', (req, res) => {
    const id = req.params.id;
    const params = {
        TableName: REST_TABLE,
        Key: {
            id
        }
    };
    dynamoDb.delete(params, (error) => {
        if (error) {
            res.status(400).json({ error: 'Could not delete Plan' });
        }
        res.json({ success: true });
    });
});

router.put('/track', (req, res) => {
    // const id = req.body.id;
    // const name = req.body.name;
    const {id,name,address,open,dist} = req.body;
    const params = {
        TableName: REST_TABLE,
        Key: {
            id
        },
        UpdateExpression: 'set id=:id, name =:name, address=:address, open=:open, dist=:dist',
        ExpressionAttributeValues: { 
            ':id': id,
            ':name': name,
            ':address':address,
            ':open':open,
            ':dist':dist
         }
         
    }
    dynamoDb.update(params, (error, result) => {
        if (error) {
            
        }
        res.json(error);
    })
});
module.exports = router;