import mongoose from 'mongoose'
import { type DataToConvert } from '../global/types'
import { Decimal128 } from 'mongodb'
const Schema = mongoose.Schema

const convertedCurrency = new Schema<DataToConvert>({
  originalAmount: Decimal128,
  destAmount: Decimal128,
  from: String,
  to: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const ConvertedCurrencyModel = mongoose.model('convertedCurrency', convertedCurrency)

export default ConvertedCurrencyModel
