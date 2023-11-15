import { CURRENCIES } from '../helpers/currencies'
import ConvertedCurrencyModel from '../models/Converter'
import { convert } from '../helpers/convert'
import { type MoneyType } from '../global/types'

// could be substituted with a use of a different API for currency symbols
// reason for this service is to fetch in on the frontend and display supported currencies
// by the fixer currency rates API

const getAllCurrencySymbolsAndNames = (): any => {
  return CURRENCIES
}

const convertCurrency = async (Money: MoneyType): Promise<any> => {
  const { amount, from, to } = Money
  const convertedAmount = await convert(Money)
  return await ConvertedCurrencyModel.create({
    originalAmount: amount,
    destAmount: convertedAmount,
    from,
    to
  })
}

const getAllConvertedResults = async (): Promise<any> => {
  return await ConvertedCurrencyModel.find()
}

export { convertCurrency, getAllCurrencySymbolsAndNames, getAllConvertedResults }
