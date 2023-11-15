import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface ErrorCardProps {
  error: Error | null;
}

const Card = styled.div`
  position: fixed;
  bottom: 50px;
  right: -390px;
  width: 300px;
  height: auto;
  background: #ff6666;
  color: white;
  box-shadow: 0 0 10px rgba(0, 0, 0, .3);
  transition: transform 0.3s ease-out;
  opacity: 98%;
  border-radius: 10px;

  &.show {
    transform: translateX(-400px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  h3 {
    margin: 0;
  }
`;

const CardBody = styled.div`
  padding-left: 1rem;
  padding-bottom: 1rem;

  p {
    margin: 0;
  }
`;

const CloseButton = styled.button`
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: white;
  background-color: transparent;
  border: none;
  outline: none;
`;

const ErrorCard: React.FC<ErrorCardProps> = ({ error }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (error) {
      setShow(true);
    }
  }, [error]);

  const handleClose = (): void => {
    setShow(false);
  };

  return (
    <Card className={show ? 'show' : ''} onAnimationEnd={() => !show && handleClose()}>
      <CardHeader>
        <h3>Error</h3>
        <CloseButton onClick={handleClose}>
          &times;
        </CloseButton>
      </CardHeader>
      <CardBody>
        <p>{error?.message}</p>
      </CardBody>
    </Card>
  );
};

export default ErrorCard;
