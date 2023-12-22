import React from 'react';
import styled from 'styled-components';

const QuestionPaletteWrapper = styled.div`
  position: fixed;
  top: 70px;
  left: 20px;
  width: 200px;
  height:80px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  padding: 10px;
  font-size: 16px;
`;

const Legend = styled.p`
  color: #5296dd;
`;


const QuestionPalette = (props) => {
  return (
    <QuestionPaletteWrapper>
      <Legend>Total: {props.totalQuestions + props.totalAnswered}</Legend>
      <Legend>Answered: {props.totalAnswered}</Legend>
    </QuestionPaletteWrapper>
  );
};

export default QuestionPalette;
