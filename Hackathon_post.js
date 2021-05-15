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

router.get("/:category",(req,res)=>
{
    const query_category = req.params.category;
    if(query_category !="all")
    {
      db.query(`SELECT * FROM post WHERE category = "${query_category}"`,(err,data)=>
      {
          if(err) throw err
          res.write(JSON.stringify(data));
          res.end();
      })
    }
    else{
      db.query(`SELECT * FROM post`,(err,data)=>
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
    db.query(`INSERT INTO post (user_id, title, content, category, start_time, end_time, total_member, curr_member,place) VALUES ('${body.user_id}','${body.title}','${body.content}','${body.category}','${body.start_time}','${body.end_time}','${body.total_member}','${body.curr_member}','${body.place}')`, (err, results) => {
        if(err) throw err;
        res.end();
    })
})

router.put("/:id", (req, res) => {
    const body = req.body;
    const query_id = req.params.id;
    db.query(`UPDATE post SET user_id = '${body.user_id}',title = '${body.title}',content = '${body.content}',category = '${body.category}',start_time = '${body.start_time}',end_time = '${body.end_time}',total_member = '${body.total_member}',curr_member = '${body.curr_member}',place ='${body.place}' WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    });
  })

  router.delete("/:id", (req, res) => {
    const query_id = req.params.id;
    db.query(`DELETE FROM post WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    })
  })
  
  module.exports = router;