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

router.get("/party/:id",(req,res)=>
{
    const query_id = req.params.id;

      db.query(`SELECT * FROM party WHERE party_id = "${query_id}"`,(err,data)=>
      {
          if(err) throw err
          res.write(JSON.stringify(data));
          res.end();
      })
}
)

// //파티의 현재 멤버
// router.get("/party_members/:id",(req,res)=>
// {
//     const query_id = req.params.id;

//       db.query(`SELECT * FROM party WHERE party_id = "${query_id}"`,(err,data)=>
//       {
//           if(err) throw err
//           res.write(JSON.stringify(data));
//           res.end();
//       })
// }
// )

router.get("/user/:id",(req,res)=>
{
    const query_id = req.params.id;

      db.query(`SELECT * FROM party WHERE user_id = "${query_id}"`,(err,data)=>
      {
          if(err) throw err
          res.write(JSON.stringify(data));
          res.end();
      }) 
}
)

router.post("/:party_id/:user_id",(req,res)=>
{
    const party_id = req.params.party_id;
    const user_id = req.params.user_id;
    db.query(`INSERT INTO user (party_id, user_id) VALUES ('${party_id}', '${user_id}')`, (err, results) => {
        if(err) throw err;
        res.end();
    })
})

// router.put("/:id", (req, res) => {
//     const body = req.body;
//     const query_id = req.params.id;
//     db.query(`UPDATE user SET sex = '${body.sex}', nickname = '${body.nickname}' WHERE user_id=${query_id}`, (err, data) => {
//       if(err) throw err;
//       res.end();
//     });
//   })

  router.delete("/:party_id/:user_id", (req, res) => {
    const party_id = req.params.party_id;
    const user_id = req.params.user_id;
    db.query(`DELETE FROM party WHERE user_id=${user_id} AND party_id=${party_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    })
  })
  
  module.exports = router;