const mockResponse = {
    data: {
        results: [
            {
                customerId: 10,
                customerName: "James Brown",
                transactions: [
                  {
                    transactionId: 100,
                    purchaseAmount: 120,
                    dateOfTransaction: "01/04/2024"
                  },
                  {
                    transactionId: 101,
                    purchaseAmount: 100,
                    dateOfTransaction: "01/05/2024"
                  }
                ],
                id: "b211"
              },

        ]
    }
}


export default {
    get: jest.fn().mockResolvedValue(mockResponse)
}