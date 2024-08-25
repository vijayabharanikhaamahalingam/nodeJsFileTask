var express = require('express');
var app = express();
const fs = require('node:fs');
const { Readable } = require('stream');
const { finished } = require('stream/promises');
const path = require("path");

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
app.get('/api/fileCreate', (req, res) => {

var date=new Date()
var fileName =date.toString()+".txt"
  var write = fs.writeFile("./myTexts/"+fileName, date.toString(), (err) => {

      if (err) res.status(500).send({ error: err }); 
      res.status(201).send({ message: fileName+' Text File Created Successfully' });
  })
});
app.get('/api/readFile', async(req,res)=>{

const result=[]
await fs.readdir("./myTexts", async(err, files) => {

  
    if(err) {
      res.sendStatus(404).send({"errr": err})
    }
    for (let i = 0; i < files.length; i++) {
      
      const fileVal = await fs.readFileSync("./myTexts/"+files[i])
      var readStream = fs.createReadStream("./myTexts/"+files[i]);
      res.write(fileVal)

    }
    res.end()

});




})