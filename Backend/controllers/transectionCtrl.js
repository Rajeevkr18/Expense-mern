const moment = require("moment");
const transactionModel = require("../models/transactionModel");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, userid, selectedDate, type } = req.body;
    const days = frequency ? Number(frequency) : 7;

    const transactions = await transactionModel.find({
      ...(frequency !== 'custom'
        ? { date: { $gt: moment().subtract(days, 'days').toDate() } }
        : {
            date: {
              $gte: moment(selectedDate[0]).toDate(),
              $lte: moment(selectedDate[1]).toDate(),
            },
          }),
      userid: userid,
      ...(type !== 'all' && { type }),
    });

    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching transactions', error });
  }
};

const deleteTransaction= async (req,res)=>{
  try {
    await transactionModel.findOneAndDelete({_id:req.body.transactionId})
    res.status(200).send('Transaction Deleted')
    
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
    
  }

}

const editTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId }, // Ensure key is correct here too
      req.body.payload,
      { new: true } // Return the updated document
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    res.status(200).send('Transaction Updated Successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating transaction', error });
  }
};


const addTransaction = async (req, res) => {
  try {
    const newTransaction = new transactionModel(req.body);
    await newTransaction.save();
    res.status(201).send("Transaction Created");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

module.exports = { getAllTransaction, addTransaction, editTransaction,deleteTransaction };
