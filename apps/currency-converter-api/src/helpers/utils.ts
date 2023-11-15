import { type Decimal128 } from 'mongodb'

export const formatCurrency = (amount: Decimal128, currencyCode: string): any => {
  const parsedAmount = parseFloat(amount.toString())
  const formatter = new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: currencyCode
  })

  return formatter.format(parsedAmount)
}
