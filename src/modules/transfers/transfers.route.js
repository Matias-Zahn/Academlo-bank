import express from 'express'
import { createTransfer } from './transfers.controllers.js'

export const router= express.Router()

router.post('/', createTransfer)