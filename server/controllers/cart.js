import Model from "../models/cart";
import mongoose from "mongoose";

export function getAll(req, res) {
  let option = {};

  if (req.query.date && req.query.date !== "") {
    let date = new Date(req.query.date);
    option = {
      ...option,
      dateTime: {
        $gte: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
        $lte: new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1),
      },
    };
  }

  if (req.query.completed && req.query.completed !== "") {
    option = {
      ...option,
      completed: req.query.completed,
    };
  }

  Model.find(option)
    .sort([["dateTime", -1]])
    .select("_id dateTime tableId tableName totalAmount completed items")
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
    tableId: req.body.tableId,
    tableName: req.body.tableName,
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

//cart item functions
export function createCartItem(req, res) {
  const id = req.params.id;
  const newCartItem = {
    _id: mongoose.Types.ObjectId(),
    cartId: req.body.cartId,
    foodId: req.body.foodId,
    foodName: req.body.foodName,
    quantity: req.body.quantity,
    price: req.body.price,
    amount: parseInt(req.body.quantity) * parseInt(req.body.price),
  };
  Model.findById(id)
    .then((cart) => {
      Model.updateOne(
        { _id: id },
        {
          $set: {
            totalAmount:
              parseInt(cart.totalAmount) +
              parseInt(req.body.quantity) * parseInt(req.body.price),
          },
          $push: {
            items: newCartItem,
          },
        }
      )
        .exec()
        .then(() => {
          res.status(201).json(newCartItem);
        })
        .catch((e) => {
          res.status(500).json({
            error: e.message,
          });
        });
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function updateCartItem(req, res) {
  const id = req.params.id;
  const itemId = req.params.itemId;
  Model.findById(id)
    .then((cart) => {
      const item = cart.items.id(itemId);
      item.quantity = req.body.quantity;
      item.amount = parseInt(item.price) * parseInt(req.body.quantity);

      let totalAmount = 0;
      cart.items.forEach((item, ind) => {
        totalAmount += parseInt(item.amount);
      });
      cart.totalAmount = totalAmount;
      cart
        .save()
        .then(() => {
          res.status(200).json(item);
        })
        .catch((e) => {
          res.status(500).json({
            error: e.message,
          });
        });
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}

export function removeCartItem(req, res) {
  const id = req.params.id;
  const itemId = req.params.itemId;
  Model.findById(id)
    .then((cart) => {
      cart.items.id(itemId).remove();
      cart
        .save()
        .then(() => {
          res.status(204).json({
            success: true,
          });
        })
        .catch((e) => {
          res.status(500).json({
            error: e.message,
          });
        });
    })
    .catch((e) => {
      res.status(500).json({
        error: e.message,
      });
    });
}
