import Model from "../models/category";
import mongoose from "mongoose";

export function getAll(req, res) {
  Model.find()
    .select("_id name")
    .then((items) => {
      res.status(200).json(items);
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function getOne(req, res) {
  const id = req.params.id;
  Model.findById(id)
    .then((item) => {
      res.status(200).json(item);
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function create(req, res) {
  const newObj = new Model({
    _id: mongoose.Types.ObjectId(),
    name: req.body.name,
  });
  return newObj
    .save()
    .then((item) => {
      res.status(201).json(item);
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function update(req, res) {
  const id = req.params.id;
  const updateObj = req.body;
  Model.updateOne({ _id: id }, { $set: updateObj })
    .exec()
    .then(() => {
      res.status(200).json(updateObj);
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function remove(req, res) {
  const id = req.params.id;
  Model.findByIdAndRemove(id)
    .exec()
    .then(() => {
      res.status(204).json({ success: true });
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}
