const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    //we define an enum because we want status to have one of the values mentioned in enum
    enum: ["Not Started", "In Progress", "Completed"],
  },
  clientId: {
    //we define the folowing type because whenever a record is created in a collection/table, it is assigned an underscore id which is called the ObjectId and we relate it to another model, i.e., Client
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
