const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel');

const getPeriodTransactions = async (req, res) => {
  const period = req.query.period;

  if (!period) {
    return res.status(404).send({
      error:
        'É necessário informar o parâmetro "period", cujo valor deve estar no formato yyyy-mm',
    });
  }

  try {
    const query = { yearMonth: period };
    const transactions = await TransactionModel.find(query);

    res.status(200).send({ length: transactions.length, transactions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const objectStructure = (objectReq) => {
  const { description, value, category, yearMonthDay, type } = objectReq;
  const dateResult = yearMonthDay.split('-');

  const objectData = {
    description,
    value,
    category,
    type,
    yearMonthDay,
    yearMonth: `${dateResult[0]}-${dateResult[1]}`,
    year: Number(dateResult[0]),
    month: Number(dateResult[1]),
    day: Number(dateResult[2]),
  };
  return objectData;
};

const create = async (req, res) => {
  const data = objectStructure(req.body);
  const newTransaction = new TransactionModel(data);
  try {
    const transaction = await newTransaction.save(newTransaction);
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  const _id = req.query._id;

  if (!_id) {
    return res.status(400).send({
      error: 'É necessário informar o parâmetro "id"',
    });
  }

  const updateData = objectStructure(req.body);
  if (Object.entries(updateData).length === 0) {
    return res.status(400).json({
      message: 'Dados para atualização vazio',
    });
  }

  try {
    const query = { _id };
    const data = await TransactionModel.findByIdAndUpdate(query, updateData, {
      new: true,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  const _id = req.query._id;

  if (!_id) {
    return res.status(400).send({
      error: 'É necessário informar o parâmetro "id"',
    });
  }

  try {
    await TransactionModel.deleteOne({ _id });

    res.status(200).json({ message: 'Dados deletado!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getPeriodTransactions, create, update, remove };
