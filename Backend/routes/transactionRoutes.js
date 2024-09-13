const express = require('express');
const { 
    addTransaction,
     getAllTransaction, 
     editTransaction ,
     deleteTransaction} = require('../controllers/transectionCtrl');

const router = express.Router();

// Add transaction
router.post('/add-transection', addTransaction);

// Edit transaction
router.post('/edit-transection', editTransaction);
// delete transaction
router.post('/delete-transection', deleteTransaction);

// Get all transactions
router.post('/get-transection', getAllTransaction);

module.exports = router;
