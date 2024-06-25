# Reward Program
A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.

A customer receives 2 points for every dollar spent over $100 in each transaction, plus 1 point for every dollar spent between $50 and $100 in each transaction. (e.g. a $120 purchase = 2x$20 + 1x$50 = 90 points).

This project calculates rewards of customers monthly based and total, Given a record of every transaction during a three month period.

Pre-requisites : Visual studio Code with ReactJs version 18.3. Download source code and and run commands

### `npm install`

### `npm start` in terminal.

Run the app in the development mode.\
Open [https://localhost:3000] to view it in your browser.

# To start json server.

Execute command

### `npx json-server --watch transactions.json --port 4000`

Response : {
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

### npm test
Launches the test runner in the interactive watch mode.

### npm run build
Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!
