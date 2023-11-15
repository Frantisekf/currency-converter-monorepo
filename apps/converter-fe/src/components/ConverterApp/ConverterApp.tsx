import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import ErrorCard from '../ErrorComponent/ErrorCard';
import Loader from '../Loader/Loader';
import { fetchCurrencySymbols, convertCurrency, getAllConversionEntries } from '../../api/client';
import {
  type CurrencySymbolsType,
  type CurrencyOption,
  type ConversionEntry,
  type ConversionApiResponse
} from '@converter-app/shared-types';
import ConversionResultsTable from '../ConversionResultsTable/ConversionResultsTable';
import styled, { css } from 'styled-components';
import { findMostCommonPropertyValue } from '../../utils/helpers';

const Root = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const MainHeader = styled.h1`
  margin-bottom: 4rem;
`;

const ConverterInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
    margin-bottom: 10px;
    vertical-align: middle;
  }

  span {
    text-align: center;
    vertical-align: middle;
    line-height: 40px;
    margin: 0 1rem;
    font-weight: bold;
  }

  button {
    margin-left: 1rem;
    height: 38px;
    &:focus {
      outline: none;
      box-shadow: none;
    }
  }
`;

interface ConversionResultProps {
  show: boolean;
}

const ConversionResult = styled.div<ConversionResultProps>`
  margin-top: 6rem;
  font-weight: bold;
  font-size: 1.5rem;
  ${props => !props.show && css`
    display: none;
  `}
`;

const customStyles = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: (base: any) => ({
    ...base,
    width: '230px',
    minWidth: 'auto',
  }),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  placeholder: (base: any) => ({
    ...base,
    fontSize: '12px',
    color: 'grey',
  }),
};

const ConverterApp: React.FC = () => {
  const [currencySymbols, setCurrencySymbols] = useState<CurrencyOption[]>([]);
  const [amount, setAmount] = useState<string | null>(null);
  const [originCurrency, setOriginCurrency] = useState<string>('');
  const [destCurrency, setDestCurrency] = useState<string>('');
  const [conversionResult, setConversionResult] = useState<string | null>(null);
  const [conversionResultsTable, setConversionResultsTable] = useState<ConversionEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [mostPopularDestCurrency, setMostPopularDestCurrency] = useState<string>('');

  const [error, setError] = useState<any>(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setAmount(event.target.value);
  };

  const handleOriginCurrencyChange = (selectedOption: CurrencyOption | null): void => {
    if (selectedOption != null) {
      setOriginCurrency(selectedOption.value);
    }
  };

  const handleDestCurrencyChange = (selectedOption: CurrencyOption | null): void => {
    if (selectedOption != null) {
      setDestCurrency(selectedOption.value);
    }
  };

  const handleSubmitConversion = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result: ConversionApiResponse = await convertCurrency({
        amount,
        from: originCurrency,
        to: destCurrency
      });
      const data = result.data as ConversionEntry;
      setConversionResult(data.destAmount);
      setAmount(null);
      setOriginCurrency('');
      setDestCurrency('');
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCurrencyOptions = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const result = await fetchCurrencySymbols();
      const options: CurrencyOption[] = (result.data as CurrencySymbolsType[]).map(
        (currency: CurrencySymbolsType) => ({
          label: Object.values(currency)[0],
          value: Object.keys(currency)[0]
        })
      );
      setCurrencySymbols(options);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const populateConversionTable = async (): Promise<void> => {
    try {
      const result = await getAllConversionEntries();
      setConversionResultsTable(result.data as ConversionEntry[]);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    void fetchCurrencyOptions();
  }, []);

  useEffect(() => {
    void populateConversionTable();
  }, [conversionResult]);

  useEffect(() => {
    const mostCommon = findMostCommonPropertyValue(conversionResultsTable, 'to');
    if (typeof mostCommon === 'string') {
      setMostPopularDestCurrency(mostCommon);
    } else {
      setMostPopularDestCurrency('');
    }
  }, [conversionResultsTable]);


  return (
  <>
    {Boolean(error) && <ErrorCard error={error} />}
    <Root>
      <MainHeader>Currency Converter</MainHeader>
      
      <ConverterInput>
        <input
          type="number"
          min="0"
          value={amount ?? ''}
          placeholder="insert amount"
          onChange={handleAmountChange}
        />
        <span>from:</span>
        <Select
          options={currencySymbols}
          value={{ value: originCurrency, label: originCurrency }}
          onChange={handleOriginCurrencyChange}
          isSearchable={true}
          styles={customStyles}
          placeholder="type/select currency"
        />
        <span>to:</span>
        <Select
          value={{ value: destCurrency, label: destCurrency }}
          options={currencySymbols}
          styles={customStyles}
          onChange={handleDestCurrencyChange}
          isSearchable={true}
          placeholder="type/select currency"
        />
        <button onClick={handleSubmitConversion}>
          Convert
        </button>
      </ConverterInput>
      <span>Most popular destination currency: <b>{mostPopularDestCurrency}</b></span>
      <ConversionResult show={conversionResult != null}>
        Conversion result: {conversionResult}
      </ConversionResult>
      {isLoading ? <Loader /> : <ConversionResultsTable conversionEntries={conversionResultsTable} isLoading={false} />}

    </Root>
  </>
  );
};

export default ConverterApp;
