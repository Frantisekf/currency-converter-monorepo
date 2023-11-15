import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid rgba(0, 0, 0, 0.2);
  border-top-color: #007bff;
  animation: ${spin} 0.8s linear infinite;
`;

const Loader: React.FC = () => {
  return <StyledLoader />;
};

export default Loader;