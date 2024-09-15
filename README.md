# Bee Payment Processor

## Table of Contents
- [Overview](#overview)
- [What is Bee?](#what-is-bee)
- [Features](#features)
- [Problem Bee Solves](#problem-bee-solves)
- [Solution Implementation Overview](#solution-implementation-overview)
  - [Design Considerations](#design-considerations)
  - [Tech Stack and PFIs](#tech-stack-and-pfis)
  - [Setup Guide](#setup-guide)
  - [Submodule Setup (bee-dashboard)](#submodule-setup-bee-dashboard)
- [Bee Payment API Documentation](#bee-payment-api-documentation)
  - [1. Customer Registration (Verifiable Credentials)](#1-customer-registration-verifiable-credentials)
  - [2. Request Payment Quotes](#2-request-payment-quotes)
  - [3. Initiate Payment](#3-initiate-payment)
  - [4. Submit Feedback](#4-submit-feedback)
  - [5. Fetch Customers](#5-fetch-customers)
  - [6. Fetch Transactions](#6-fetch-transactions)
- [Limitations and Future Development](#limitations-and-future-development)

---

## Overview

Bee is a modern, Web5-based payment processor built to help businesses integrate decentralized financial services into their checkout systems. By leveraging the **tbDEX protocol**, Bee allows businesses to process payments, generate verifiable credentials, and connect with various liquidity providers (PFIs) to offer the best currency exchange rates for their customers.

---

## What is Bee?

**Bee** is a payment processing platform that facilitates payments across multiple currencies while using decentralized identifiers (DIDs) and Verifiable Credentials (VCs) to ensure secure, decentralized customer management. It integrates with **tbDEX** to connect businesses with multiple participating financial institutions (PFIs), offering the most competitive exchange rates for their customers. 

### Features
- **Multiple PFI Support**: Fetch real-time quotes from various PFIs and allow businesses to select the best offer.
- **Verifiable Credential Management**: Issue and manage VCs to securely store customer information.
- **Transaction Fee Handling**: Apply a customizable fee on every transaction (2% by default).
- **Customer Satisfaction Tracking**: Collect feedback from customers after transactions to improve service quality.

---

## Problem Bee Solves

Traditional payment processors often involve complex setups, centralized data storage, and limited options for cross-currency transactions. Bee aims to solve this by offering a **decentralized** and **interoperable** solution, allowing businesses to:
- Choose from multiple financial institutions (PFIs) to get the best deal for their customers.
- Manage customer identities securely through **DIDs** and **VCs**, ensuring privacy and security.
- Offer seamless cross-border payments without the need for complex multi-currency accounts.

---

## Solution Implementation Overview

### Design Considerations
Bee was designed to address key concerns for decentralized financial applications:
- **Profitability**: A small transaction fee (default of 2%) ensures the platform's sustainability.
- **Optionality**: Businesses can choose between multiple PFIs to get the most favorable exchange rate for their transactions.
- **Customer Management**: Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs) ensure secure and scalable customer identity management.
- **Customer Satisfaction**: Feedback is collected after each transaction, helping businesses assess customer satisfaction with the process and PFIs.

### Tech Stack and PFIs
- **Backend**: Node.js with Express
- **Frontend**: React.js (Chakra UI for styling)
- **tbDEX SDK**: For connecting with PFIs and fetching exchange quotes
- **DID and VC Management**: Via Web5 APIs
- **Liquidity Providers (PFIs)**:
  1. **AquaFinance Capital**
     - DID: `did:dht:3fkz5ssfxbriwks3iy5nwys3q5kyx64ettp9wfn1yfekfkiguj1y`
  2. **Flowback Financial**
     - DID: `did:dht:zkp5gbsqgzn69b3y5dtt5nnpjtdq6sxyukpzo68npsf79bmtb9zy`

### Setup Guide

1. **Clone the repository**:

   \```
   git clone https://github.com/your-repo/bee-payment-processor.git
   \```

2. **Navigate to the project folder**:

   \```
   cd bee-payment-processor
   \```

3. **Install dependencies**:

   \```
   npm install
   \```

4. **Run the backend server**:

   \```
   node server.js
   \```

### Submodule Setup (bee-dashboard)

The `bee-dashboard` is a **submodule** that provides the frontend interface for testing and showcasing how the Bee payment processor can be integrated into business applications.

#### To set up the submodule:

1. **Initialize the submodule**:

   \```
   git submodule init
   \```

2. **Update the submodule**:

   \```
   git submodule update
   \```

3. **Navigate to the `bee-dashboard` folder**:

   \```
   cd bee-dashboard
   \```

4. **Install dependencies**:

   \```
   npm install
   \```

5. **Run the dashboard locally**:

   \```
   npm start
   \```

### Testing with `bee-dashboard`

Use the `bee-dashboard` to test how the integration with the Bee payment processor would work for businesses. It provides a simple interface for:
- Viewing customers
- Initiating payments
- Tracking transactions
- Submitting feedback

---

## Bee Payment API Documentation

### 1. Customer Registration (Verifiable Credentials)

**Endpoint**: `POST /create-credential`

**Description**: Creates a Verifiable Credential for a customer.

**Request**:
\```json
{
  "customerName": "John Doe",
  "customerDID": "did:example:123456789"
}
\```

**Response**:
\```json
{
  "vc": { ... }  // Verifiable Credential object
}
\```

### 2. Request Payment Quotes

**Endpoint**: `POST /tbdex/request-quotes`

**Description**: Fetches quotes from multiple PFIs for a currency exchange transaction.

**Request**:
\```json
{
  "amount": 100,
  "fromCurrency": "USD",
  "toCurrency": "KES"
}
\```

**Response**:
\```json
[
  {
    "pfi": "AquaFinance Capital",
    "amount": 100,
    "exchangeRate": "1.1",
    "toCurrency": "KES"
  },
  {
    "pfi": "Flowback Financial",
    "amount": 100,
    "exchangeRate": "1.05",
    "toCurrency": "KES"
  }
]
\```

### 3. Initiate Payment

**Endpoint**: `POST /initiate-payment`

**Description**: Initiates a payment and applies a 2% transaction fee.

**Request**:
\```json
{
  "customerId": "cust1",
  "amount": 100,
  "currency": "USD"
}
\```

**Response**:
\```json
{
  "transactionId": "txn1",
  "totalAmount": 102,
  "status": "pending"
}
\```

### 4. Submit Feedback

**Endpoint**: `POST /submit-feedback`

**Description**: Allows customers to submit feedback after a transaction.

**Request**:
\```json
{
  "transactionId": "txn1",
  "rating": 5,
  "comments": "Great service!"
}
\```

**Response**:
\```json
{
  "message": "Feedback submitted"
}
\```

### 5. Fetch Customers

**Endpoint**: `GET /customers`

**Description**: Fetches a list of all registered customers.

**Response**:
\```json
[
  {
    "id": "cust1",
    "name": "John Doe",
    "email": "john@example.com",
    "customerDID": "did:example:123456789"
  },
  {
    "id": "cust2",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "customerDID": "did:example:987654321"
  }
]
\```

### 6. Fetch Transactions

**Endpoint**: `GET /transactions`

**Description**: Fetches a list of all transactions.

**Response**:
\```json
[
  {
    "id": "txn1",
    "customerId": "cust1",
    "amount": 100,
    "totalAmount": 102,
    "status": "completed"
  },
  {
    "id": "txn2",
    "customerId": "cust2",
    "amount": 200,
    "totalAmount": 204,
    "status": "pending"
  }
]
\```

---

## Limitations and Future Development

### Current Limitations:
1. **Sandbox Environment**: The integration with PFIs is currently done in a sandbox environment with no real currency exchange.
2. **Verifiable Credential Issuer**: Verifiable credentials rely on the mock identity verification endpoint for customer registration, which needs to be upgraded in a production environment.
3. **In-Memory Data Storage**: Both customer and transaction data are stored in-memory,
