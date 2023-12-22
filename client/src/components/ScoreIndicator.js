import React from 'react';
import styled from 'styled-components';

const ScoreIndicatorWrapper = styled.div`
  position: fixed;
  top: 70px;
  right: 70px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 16px;
  color: #ff6314;
`;

export const ScoreIndicator = ({score}) => {
  return (
    <ScoreIndicatorWrapper>
      <span>Score: {score} </span>
    </ScoreIndicatorWrapper>
  );
};
