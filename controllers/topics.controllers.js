const { selectAllTopics } = require("../models/topics.models");
const fs = require('fs/promises')



exports.getAllTopics = (req, res, next) => {
  selectAllTopics()
    .then((topics) => {
      res.status(200).json({ topics });
    })
    .catch((err) => {
      next(err);
    });

};

exports.getAllEndpoints = (req, res) => {
  return fs.readFile('endpoints.json', 'utf-8')
    .then((data) => {
      const allEndpoints = JSON.parse(data);
      res.status(200).send(allEndpoints)
  })
}


