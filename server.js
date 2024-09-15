import express from 'express';
import cors from 'cors';
import { TbdexHttpClient } from '@tbdex/http-client';
import { VerifiableCredential } from '@web5/credentials';
import { v4 as uuidv4 } from 'uuid';
import { customers } from './customers';
import { transactions } from './transactions';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const client = new TbdexHttpClient();

// Initiate a payment with a 2% transaction fee
app.post('/initiate-payment', (req, res) => {
  const { customerId, amount, currency } = req.body;
  const transactionFee = 0.02 * amount;  // 2% fee for this example
  const totalAmount = amount + transactionFee;

  try {
    const transactionId = uuidv4();
    const newTransaction = {
      id: transactionId,
      customerId,
      amount,
      currency,
      fee: transactionFee,
      totalAmount,
      status: 'pending',
      createdAt: new Date(),
    };

    transactions.push(newTransaction);
    res.status(201).json({ message: 'Payment initiated', transactionId, status: newTransaction.status, totalAmount });
  } catch (error) {
    console.error('Error initiating payment:', error);
    res.status(500).json({ message: 'Error initiating payment', error: error.message });
  }
});

// Fetch quotes from multiple PFIs using tbDEX
app.post('/tbdex/request-quotes', async (req, res) => {
  const { amount, fromCurrency, toCurrency } = req.body;

  try {
    const quotes = await Promise.all([
      client.sendRequestForQuote('did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y', { amount, fromCurrency, toCurrency }),
      client.sendRequestForQuote('did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy', { amount, fromCurrency, toCurrency }),
    ]);

    res.status(200).json(quotes);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    res.status(500).json({ message: 'Error fetching quotes', error });
  }
});

// Create Verifiable Credential for a customer
app.post('/create-credential', async (req, res) => {
  const { customerName, customerDID } = req.body;

  try {
    const vc = await VerifiableCredential.create({
      issuer: 'did:example:issuer',
      subject: customerDID,
      credentialSubject: { name: customerName },
    });
    customers.push({ customerName, customerDID, vc });
    res.status(200).json(vc);
  } catch (error) {
    console.error('Error creating Verifiable Credential:', error);
    res.status(500).json({ message: 'Error creating Verifiable Credential', error: error.message });
  }
});

// Submit feedback for a transaction
app.post('/submit-feedback', (req, res) => {
  const { transactionId, rating, comments } = req.body;

  try {
    const transaction = transactions.find(txn => txn.id === transactionId);
    if (transaction) {
      transaction.feedback = { rating, comments };
      res.status(200).json({ message: 'Feedback submitted' });
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ message: 'Error submitting feedback', error });
  }
});

// Get list of all customers
app.get('/customers', (req, res) => {
  res.status(200).json(customers);
});

// Get list of all transactions
app.get('/transactions', (req, res) => {
  res.status(200).json(transactions);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
