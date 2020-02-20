//fill details in line 20 -- 25 and in line 64 and line 118
const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');


const app=express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(cors());

app.get('*',(req,res)=>{
  res.json('OK');
})


app.post('/',(req,res)=>{

const {id,completed,lectures,remarks,topic} = req.body;
for (var key in req.body) {
  if (req.body.hasOwnProperty(key)) {
    item = req.body[key];
    console.log(item);
  }
}
});

app.listen(3001,()=>{
  console.log("Port 3001");
})

