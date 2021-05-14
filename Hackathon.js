var mysql = require('mysql')
const express = require('express')
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'Hackathon'
})

const app = express()
app.use(express.json())

app.get('/:category/:sex',(req,res)=>
{
    const query_sex = req.params.sex;
    const query_category = req.params.category;
    let ret_data;
    if(query_sex)
    {
    db.query(`SELECT * FROM post WHERE sex = "${query_sex}"`,(err,data)=>
    {
        if(err) throw err
        res.write(JSON.stringify(data));
        ret_data=data;
        res.end();
    })
}
})

app.post("/:id",(req,res)=>
{
    const body = req.body;
    const query_id = req.params.id;
    if(query_id)
    db.query(`INSERT INTO post (sex, user_id, title, content, category, time, total_member, curr_member) VALUES ('${body.sex}', '${body.user_id}','${body.title}','${body.content}','${body.category}','${body.time}','${body.total_member}','${body.curr_member}')`, (err, results) => {
        if(err) throw err;
        res.end();
    })
})

app.put("/:id", (req, res) => {
    const body = req.body;
    const query_id = req.params.id;
    db.query(`UPDATE post SET sex = '${body.sex}', user_id = '${body.user_id}',title = '${body.title}',content = '${body.content}',category = '${body.category}',time = '${body.time}',total_member = '${body.total_member}',curr_member = '${body.curr_member}' WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    });
  })

  app.delete("/:id", (req, res) => {
    const query_id = req.params.id;
    db.query(`DELETE FROM post WHERE id=${query_id}`, (err, data) => {
      if(err) throw err;
      res.end();
    })
  })
  

app.listen(8080,()=> {
    console.log("Server is running on 8080 port.")
})
