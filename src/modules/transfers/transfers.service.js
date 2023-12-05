import Transfer from "./transfers.model.js";

export class TransferModel {
    static async createTransfer(amount, senderId, receiverId){
        return await Transfer.create({
            amount,
            senderId,
            receiverId
        })
    }

    static async findAllTransferById(id){
        return await Transfer.findAll({
            where: {
                senderId: id
            }
        })
    }
}