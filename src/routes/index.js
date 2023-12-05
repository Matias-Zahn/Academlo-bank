import express from 'express'
import {router as userRoutes} from '../modules/users/users.route.js'
import {router as transfersRoute} from '../modules/transfers/transfers.route.js'

export const router = express.Router()

router.use('/users', userRoutes )
router.use('/transfer', transfersRoute )

