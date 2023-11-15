export interface DataToConvert {
  originalAmount: string
  destAmount: string
  rate?: string
  from: string
  to: string
  createdAt: {
    type: Date
    default: Date
  }
}

export interface MoneyType {
  amount: number
  from: string
  to: string
}

export interface RatesResponseData {
  success: boolean
  timestamp: number
  base: string
  rates: Record<string, number>
}

export type CurrencyObject = Record<string, string>
