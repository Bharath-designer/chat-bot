const { NlpManager } = require("node-nlp");
const manager = new NlpManager({ languages: ["en"] });
const fs = require("fs");
const files = fs.readdirSync("./intents");
for (const file of files) {
  let data = fs.readFileSync(`./intents/${file}`);
  data = JSON.parse(data);
  for (const intent of data.intents) {
    for (const pattern of intent.patterns) {
      manager.addDocument("en", pattern, intent.tag);
    }
    
    for (const response of intent.responses) {
      manager.addAnswer("en",  intent.tag,response);
    }
  }
}

async function train_save() {
  await manager.train();
  manager.save();
}

train_save();
