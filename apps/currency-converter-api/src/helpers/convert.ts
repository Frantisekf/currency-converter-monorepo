import fetch from 'node-fetch'
import { type RatesResponseData } from '@converter-app/shared-types'
import { type MoneyType } from '@converter-app/shared-types'
import baseLogger from './baseLogger'


const FIXER_API_KEY = String(process.env.FIXER_API_KEY)

// type guard function for the rates fetch call
const isRatesResponseData = (data: unknown): data is RatesResponseData => {
  const ratesData = data as RatesResponseData
  return (
    ratesData.success !== undefined &&
    ratesData.timestamp !== undefined &&
    ratesData.base !== undefined &&
    ratesData.rates !== undefined
  )
}

// better option would be to store in cents / smallest possible value and calculate from that fro precision
export const convert = async (Money: MoneyType): Promise<any> => {
  const { amount, from, to } = Money
  const options = {
    headers: {
      apikey: FIXER_API_KEY
    }
  }

  try {
    // rates API result should be cached and should not run on every request (e.g. but only once per day)
    // this may result in inaccurate values as rates are constantly moving
    // TODO rework to store daily rates in the db
    const getRates = await fetch(`${process.env.FIXER_BASE_URL}/latest?base=${from}&symbols=${to}`, options)
    const ratesData = await getRates.json()
    if (!isRatesResponseData(ratesData)) {
      throw new Error('Failed to get conversion rate.')
    }

    const rate = ratesData.rates[to]
    const convertedResult = parseFloat(amount) * rate
    const roundedResult = Math.round(convertedResult * 100) / 100 // Round to 2 decimal places
    return roundedResult
  } catch (error) {
    baseLogger.error(error)
    throw new Error('Failed to convert.')
  }
}
