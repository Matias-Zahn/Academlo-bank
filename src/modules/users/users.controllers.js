import { TransferModel } from '../transfers/transfers.service.js';
import { UserService } from './users.service.js';

export const singup = async (req, res) => {
  try {
    const { name, password } = req.body;

    const accountNumber = Math.floor(Math.random() * 900000) + 100000;

    const user = await UserService.singUp({ name, accountNumber, password });

    return res.status(201).json({
      message: "The account was created successfully",
      user
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

export const login = async (req, res) => {
  try {
    const { accountNumber, password } = req.body;

    const user = await UserService.login({ accountNumber, password });

    if (!user)
      return res.status(404).json({
        status: 'error',
        message: `User with accountNumber: ${accountNumber} not found`,
      });

    return res.status(201).json({
      message: 'Login succesfully',
      user,
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

export const getHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const userHistory = await TransferModel.findAllTransferById(id);

    if (!userHistory)
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });


    if (userHistory.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: `The user ${id} has no transfer history.`,
      });
    }

    return res.status(201).json(userHistory);

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      status: 'fail',
      message: 'internal server error',
      error,
    });
  }
};
