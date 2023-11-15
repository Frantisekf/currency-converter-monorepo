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
    amount: string | null
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
  

  export interface ConversionApiResponse {
    data: object;
  }
  
 
  export type CurrencySymbolsType = Record<string, string>;
  
  export interface CurrencyOption {
    label: string;
    value: string;
  }
  
  export interface ConversionEntry {
    id: string;
    originalAmount: string | null;
    from: string;
    to: string;
    destAmount: string | null;
    createdAt: string;
  }
  
  export interface CurrencyTableProps {
    conversionEntries: ConversionEntry[];
    isLoading: boolean;
  }
  