const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
const { NlpManager } = require("node-nlp");

const manager = new NlpManager({ languages: ["en"] });

manager.load();

app.use(cors());
app.use(express.json());

app.use(express.static("./client/build/"));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.post("/msg", async (req, res) => {
  const response = await manager.process("en", req.body.message)
  console.log(req.body.message);
  console.log(response.answer);
  console.log("--------------");
  res.json({type:"text",value:response.answer || null})

});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
