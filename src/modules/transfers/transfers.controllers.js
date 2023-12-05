import { UserService } from '../users/users.service.js';
import { TransferModel } from './transfers.service.js';

export const createTransfer = async (req, res) => {
  try {
    const { amount, accountNumberReceptor, accountNumberSender } = req.body;

    const findSenderAccountPromise = await UserService.findOne(accountNumberSender);
    const findReceiverAccountPromise = await UserService.findOne(accountNumberReceptor);

    const [SenderAccount,ReceiverAccount ] = await Promise.all([findSenderAccountPromise, findReceiverAccountPromise])

    if (!SenderAccount)
      return res.status(404).json({
        status: 'error',
        message: `Sender account does not exist, please create account`,
      });

    if (!ReceiverAccount)
      return res.status(404).json({
        status: 'error',
        message: `Recipient account does not exist`,
      });


    if (amount > SenderAccount.amount) {
        return res.status(400).json({
            status: 'error',
            message: 'Insufficient balance'
        })
    }

    const newSenderBalance= SenderAccount.amount - amount
    const newRecipientBalance= ReceiverAccount.amount + amount

    const senderUpdatePromise =  UserService.updateBalance(SenderAccount, newSenderBalance) 
    const recipientUpdatePromise =  UserService.updateBalance(ReceiverAccount, newRecipientBalance) 
    const registerTransferPromise =  TransferModel.createTransfer(amount, SenderAccount.id, ReceiverAccount.id);

    const [sender] =await Promise.all([senderUpdatePromise, recipientUpdatePromise, registerTransferPromise])  


    return res.status(201).json({
      message: 'Transfer succesfully',
      amount: amount,
      total_available: sender.amount
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
