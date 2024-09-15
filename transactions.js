export const transactions = [
    {
      id: 'txn1',
      customerId: 'cust1',
      amount: 100,
      currency: 'USD',
      fee: 2,  
      totalAmount: 102,
      status: 'completed',
      createdAt: new Date(),
      feedback: {
        rating: 5,
        comments: 'Great service!'
      }
    },
    {
      id: 'txn2',
      customerId: 'cust2',
      amount: 200,
      currency: 'USD',
      fee: 4,  
      totalAmount: 204,
      status: 'pending',
      createdAt: new Date(),
      feedback: null
    }
  ];
  