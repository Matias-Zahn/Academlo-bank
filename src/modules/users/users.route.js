import express from 'express'
import { getHistory, login, singup } from './users.controllers.js'

export const router= express.Router()

router.post('/singup', singup)
router.post('/login', login)

router.get('/:id/history', getHistory)