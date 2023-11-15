import { type Request, type Response } from 'express'
import { formatCurrency } from '../helpers/utils'
import { convertCurrency, getAllCurrencySymbolsAndNames, getAllConvertedResults } from '../services/CurrencyService'

const getAllCurrencySymbolsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const currencies = getAllCurrencySymbolsAndNames()
    res.json({ data: currencies, status: 'success' })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const convertCurrencyController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { amount, from, to } = await req.body
    const convertInput = await convertCurrency({ amount, from, to })
    res.json({
      data: {
        originalAmount: formatCurrency(convertInput.originalAmount, from),
        destAmount: formatCurrency(convertInput.destAmount, to),
        from: convertInput.from,
        to: convertInput.to
      },
      status: 'success'
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

const getAllConvertedValuesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const allConvertedValues = await getAllConvertedResults()
    const transformConvertedValuesResponse = allConvertedValues.map((element) => ({
      from: element.from,
      to: element.to,
      originalAmount: formatCurrency(element.originalAmount, element.from),
      destAmount: formatCurrency(element.destAmount, element.to),
      createdAt: element.createdAt
    }))
    res.json({
      data: transformConvertedValuesResponse,
      status: 'success'
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
}

export { getAllCurrencySymbolsController, convertCurrencyController, getAllConvertedValuesController }
