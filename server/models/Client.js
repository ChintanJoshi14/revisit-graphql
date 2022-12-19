//This file is a Modal file for client schema.
//A modal in mongoose is basically a wrapper on the mongoose schema.
//schema defines the structure of a document (and fields that are in our DB table or collection).
// A modal provides an interface to the DB for creating, querying, updating and deleting records.

const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

module.exports = mongoose.model("Client", ClientSchema);
