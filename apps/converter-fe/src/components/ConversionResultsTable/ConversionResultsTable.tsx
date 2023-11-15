import React from 'react';
import styled from 'styled-components';
import { type CurrencyTableProps } from '@converter-app/shared-types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ISOStringToDate } from '../../utils/helpers';

const Table = styled.div`
  border-radius: 3px;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 25px;
  margin-top: 40vh;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);

  &:nth-of-type(odd) {
    background-color: #eeeeee;
  }
`;

const HeaderRow = styled(Row)`
  background-color: #95a5a6;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
`;

const Cell = styled.div`
  padding: 8px;
  flex: 1;
`;

const ConversionResultsTable: React.FC<CurrencyTableProps> = ({ conversionEntries, isLoading }) => {
  if (isLoading || conversionEntries.length === 0) {
    return (
      <Table>
        <HeaderRow>
          <Cell>Amount</Cell>
          <Cell>From</Cell>
          <Cell>To</Cell>
          <Cell>Result</Cell>
          <Cell>Timestamp</Cell>
        </HeaderRow>
        <Row>
          <Cell>
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton count={5} />
            </SkeletonTheme>
          </Cell>
        </Row>
      </Table>
    );
  }

  return (
    <Table>
      <HeaderRow>
        <Cell>Amount</Cell>
        <Cell>From</Cell>
        <Cell>To</Cell>
        <Cell>Result</Cell>
        <Cell>Timestamp</Cell>
      </HeaderRow>
      {conversionEntries
        .map((entry) => (
          <Row key={entry.createdAt}>
            <Cell>{entry.originalAmount}</Cell>
            <Cell>{entry.from}</Cell>
            <Cell>{entry.to}</Cell>
            <Cell>{entry.destAmount}</Cell>
            <Cell>{ISOStringToDate(entry.createdAt)}</Cell>
          </Row>
        ))
        .reverse()}
    </Table>
  );
};

export default ConversionResultsTable;
