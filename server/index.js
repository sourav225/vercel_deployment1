const express = require("express");
const mongoose = require("mongoose");
const todo = require("./models/Todopat");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors({
  origin:["https://vercel-deployment1-client.vercel.app"],
  methods:["GET","PUT","POST","DELETE"],
  credentials:true
}));
const PORT = 3550;

mongoose.connect("mongodb+srv://souravlayekjsr100:Sourav@123@cluster0.yhf674r.mongodb.net/Project?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/display", async (req, res) => {
  const result = await todo.find();
  res.json(result);
});

app.post("/addtotask", async (req, res) => {
  const tobeinserted = req.body.tobedone;

  const result = await todo.create({ task: tobeinserted, mark: "Uncomplete" });
  res.status(202).json({ res: "Success" });
});

app.delete("/tododelete", async (req, res) => {
  const todel = req.body.tobedelete;
  const result = await todo.deleteOne({ task: todel });
  res.status(202).json({ res: "Success" });
});

app.put("/tobeedited", async (req, res) => {
  const tosearch = req.body.tobeedit;
  const toset = req.body.input;
  const result = await todo.findOneAndUpdate(
    { task: tosearch }, // Search criteria
    { task: toset }, // Update operation
    { new: true } // Options: Return the updated document
  );
  res.status(202).json({ res: "Success" });
});
app.put("/checkmark", async (req, res) => {
  const tomark = req.body.check;
  const tosearch = req.body.task;
  const result = await todo.findOneAndUpdate({ task: tosearch }, { mark: tomark }, { new: true });
  res.status(202).json({ res: "Success" });
});
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
