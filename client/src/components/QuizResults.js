// src/components/QuizResults.js
import React from 'react';
import styled from 'styled-components';

const QuizResultsContainer = styled.div`
  width: 800px;
  height: fit-content;
  margin-top: 52px;
  padding: 20px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 24px;
  color: #5296dd;
`;

const Result = styled.p`
  font-size: 20px;
  margin-top: 20px;
`;

const Feedback = styled.p`
  font-size: 16px;
  margin-top: 10px;
`;

export const QuizResults = () => {
  return (
    <QuizResultsContainer>
      <Title>Quiz Results</Title>
      <Result>You scored 80% on the quiz.</Result>
      <Feedback>Great job! You're doing well.</Feedback>
    </QuizResultsContainer>
  );
};

