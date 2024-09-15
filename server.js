const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

let customers = [];
let transactions = [];

// Customer Registration
app.post('/customers', (req, res) => {
  const { name, email, did } = req.body;
  const customer = { id: uuidv4(), name, email, did };
  customers.push(customer);
  res.status(201).json(customer);
});

// Payment Creation
app.post('/payments', (req, res) => {
  const { customerId, amount } = req.body;
  const transaction = { id: uuidv4(), customerId, amount, status: 'pending' };
  transactions.push(transaction);
  res.status(201).json(transaction);
});

// Payment Status
app.get('/payments/:id/status', (req, res) => {
  const { id } = req.params;
  const transaction = transactions.find(t => t.id === id);
  if (transaction) {
    res.status(200).json({ status: transaction.status });
  } else {
    res.status(404).json({ message: 'Transaction not found' });
  }
});

// Fetch Customer List
app.get('/customers', (req, res) => {
  res.status(200).json(customers);
});

// Fetch Transaction List
app.get('/transactions', (req, res) => {
  res.status(200).json(transactions);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
