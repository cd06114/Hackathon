const express = require('express');
// 앞서 정의한 router를 ipmort 합니다.
const postRouter = require('./Hackathon_post.js');
const userRouter = require('./Hackathon_user.js');
const partyRouter = require('./Hackathon_party.js');


const app = express();
app.use(express.json());

// app에 bookRouter를 등록합니다.
app.use("/post", postRouter);
app.use("/user", userRouter);
app.use("/party", partyRouter);

app.get("", (req, res) => {
  res.send("Hello Express!");
})

app.listen(8080, () => console.log("Server is listening on 8080 port..."));