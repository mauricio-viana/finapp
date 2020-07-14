const express = require('express');
const transactionRouter = express.Router();
const {
  getPeriodTransactions,
  create,
  update,
  remove,
} = require('../services/transactionService');

transactionRouter
  .route('/')
  .get(getPeriodTransactions)
  .post(create)
  .put(update)
  .delete(remove);

module.exports = transactionRouter;
