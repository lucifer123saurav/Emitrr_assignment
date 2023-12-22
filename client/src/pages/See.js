// src/components/QuizResults.js
import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';

const Container = styled.div`
    font-family: "Arial", sans-serif;
    background-color: #f5f8fa;
    color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
`
const QuizResultsContainer = styled.div`
  width: 800px;
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

const QuestionsContainer = styled.div`
  text-align: left;
  height: 300px;
  overflow: auto;
  margin-top: 20px;
`;

const Question = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  &.correct {
    border-color: #00ff00;
  }

  &.incorrect {
    border-color: #ff0000;
  }
`;

const QuestionDetail = styled.p`
  margin: 10px 0;
`;

export const See = () => {
  return (
    <Container>
        <NavBar/>
    <QuizResultsContainer>
      <Title>Incorrectly Answered Questions</Title>
      <QuestionsContainer>
        <Question className="incorrect">
          <QuestionDetail>
            <strong>Question 1:</strong> Lorem ipsum dolor sit amet?
          </QuestionDetail>
          <QuestionDetail>
            <strong>Your Answer:</strong> Option 2
          </QuestionDetail>
          <QuestionDetail>
            <strong>Correct Answer:</strong> Option 3
          </QuestionDetail>
        </Question>

        <Question className="incorrect">
          <QuestionDetail>
            <strong>Question 1:</strong> Lorem ipsum dolor sit amet?
          </QuestionDetail>
          <QuestionDetail>
            <strong>Your Answer:</strong> Option 2
          </QuestionDetail>
          <QuestionDetail>
            <strong>Correct Answer:</strong> Option 3
          </QuestionDetail>
        </Question>

        <Question className="incorrect">
          <QuestionDetail>
            <strong>Question 1:</strong> Lorem ipsum dolor sit amet?
          </QuestionDetail>
          <QuestionDetail>
            <strong>Your Answer:</strong> Option 2
          </QuestionDetail>
          <QuestionDetail>
            <strong>Correct Answer:</strong> Option 3
          </QuestionDetail>
        </Question>

        <Question className="correct">
          <QuestionDetail>
            <strong>Question 2:</strong> Consectetur adipiscing elit?
          </QuestionDetail>
          <QuestionDetail>
            <strong>Your Answer:</strong> Option 1
          </QuestionDetail>
          <QuestionDetail>
            <strong>Correct Answer:</strong> Option 1
          </QuestionDetail>
        </Question>
        {/* Add more questions and their details as needed */}
      </QuestionsContainer>
    </QuizResultsContainer>
    </Container>
  );
};
