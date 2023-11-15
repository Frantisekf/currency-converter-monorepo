/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { type Router } from 'express'
import { requireJsonContent, validateInput, inputToConvertSchema } from '../middleware/validation'

import {
  getAllCurrencySymbolsController,
  convertCurrencyController,
  getAllConvertedValuesController
} from '../controllers/CurrencyController'

const router: Router = express.Router()

router.get('/symbols', getAllCurrencySymbolsController)
router.post('/convert', requireJsonContent, validateInput(inputToConvertSchema), convertCurrencyController)
router.get('/get-all-converted-results', getAllConvertedValuesController)

export default router
