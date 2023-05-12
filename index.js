require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

app.post("/api/shorturl", (req,res)=>{
  console.log(req.get('host'))
  const url = req.body.url;

  if(url.split(":").length != 0){
    if(url.split(":")[0] == "https" || url.split(":")[0] == "http"){
      res.send({
        original_url : req.body.url,
        short_url:  /* req.get('host') +"/api/shorturl/"+ */ Math.floor(Math.random() * 10)
      })
    }else{
      res.send({ error: 'invalid url' });
    }
  }else{
    res.send({ error: 'invalid url' });
  }
})

app.get("/api/shorturl/*", (req,res)=>{
  res.sendFile(process.cwd() + '/views/index.html');
})

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
