const { selectAllTopics, selectAllEndpoints } = require("../models/topics.models");

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
  selectAllEndpoints().then((allEndpoints) => {
    res.status(200).send(allEndpoints)
  })
}
