# Assignment 2
## Homework Assignment #2 of the Pirple Node.js Master Class

This is the second of several homework assignments you'll receive in this course. In order to receive your certificate of completion (at the end of this course) you must complete all the assignments and receive a passing grade.

Functional requirements

You are building the API for a pizza-delivery company.

1. New users can be created, their information can be edited, and they can be deleted. We should store their name, email address, and street address.

2. Users can log in and log out by creating or destroying a token.

3. When a user is logged in, they should be able to GET all the possible menu items (these items can be hardcoded into the system

4. A logged-in user should be able to fill a shopping cart with menu items

5. A logged-in user should be able to create an order. You should integrate with the Sandbox of Stripe.com to accept their payment. Note: Use the stripe sandbox for your testing. Follow this link and click on the "tokens" tab to see the fake tokens you can use server-side to confirm the integration is working: https://stripe.com/docs/testing#cards

6. When an order is placed, you should email the user a receipt. 

Non functional requirements:

- Implementation in Node.js
- No npm modules can be used

Stories:
- ~~Setup environment~~
- ~~Create an user service~~
- ~~Create an token service~~
- ~~Create a menuitem service~~
- ~~Create a shopping cart service~~
- Create an order service that integrates with stripe
- Integrate with Stripe.com for payments
- Integrate with mailgun for emailing receipts.
