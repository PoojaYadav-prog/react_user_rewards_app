Pre-requisites : Visual studio Code with ReactJs version 18.3. Download source code and and run commands 
"npm install"
"npm run start" in terminal.
 
Run the project as ReactJs app.
Execute command "npx json-server --watch transactions.json --port 4000". To start json server.

Response :   {
      "customerId": 10,
      "customerName": "James Brown",
      "transactions": [
        {
          "transactionId": 100,
          "purchaseAmount": 120,
          "dateOfTransaction": "01/04/2024"
        },
        {
          "transactionId": 101,
          "purchaseAmount": 100,
          "dateOfTransaction": "01/05/2024"
        }
      ]
    }
 
This shows customer with customerId, customerName and transactions details.
 
Points calculation logic : A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent over $50 in each transaction (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).
 
Applicatiom is built using ReactJs with json server request.
 
