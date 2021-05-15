var mysql = require('mysql')
const express = require('express')
const router = express.Router();
const url = require('url')
const querystring = require('querystring');


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Hackathon'
})

router.get("/:id",(req,res)=>
{
    const query_id = req.params.id;
    if(query_id !="all")
    {
      db.query(`SELECT * FROM user WHERE user_id = "${query_id}"`,(err,data)=>
      {
          if(err) throw err
          res.write(JSON.stringify(data));
          res.end();
      })
    }
    else{
      db.query(`SELECT * FROM user`,(err,data)=>
      {
          if(err) throw err
          res.write(JSON.stringify(data));
          res.end();
    }
      )
  }
}
)

router.post("/",(req,res)=>
{
    const body = req.body;
    db.query(`INSERT INTO user (nickname, sex) VALUES ('${body.nickname}', '${body.sex}')`, (err, results) => {
        if(err) throw err;
        res.end();
    })
})

router.put("/:id", (req, res) => {
    const body = req.body;
    const query_id = req.params.id;
    db.query(`UPDATE user SET sex = '${body.sex}', nickname = '${body.nickname}' WHERE user_id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    });
  })

  router.delete("/:id", (req, res) => {
    const query_id = req.params.id;
    db.query(`DELETE FROM user WHERE user_id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    })
  })
  
  module.exports = router;