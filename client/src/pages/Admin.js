// src/components/AdminPanel.js
import React from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';

const AdminContainer = styled.div`
  width: 800px;
  padding: 20px;
  background-color: #f5f8fa;
  border-radius: 8px;
  margin-top:80px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

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

// const Title = styled.h2`
//   font-size: 24px;
//   color: #5296dd;
// `;

const QuestionList = styled.div`
  text-align: left;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const QuestionItem = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #f5f8fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.h3`
  font-size: 18px;
`;

const QuestionText = styled.p`
  margin: 10px 0;
`;

const EditButton = styled.button`
  background-color: #ff6314;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0550d;
  }
`;

export const Admin = () => {
  return (
    <Container>
        <NavBar/>
    <AdminContainer>
      {/* <Title>Question Management</Title> */}
      <QuestionList>
        <QuestionItem>
          <QuestionTitle>Question 1:</QuestionTitle>
          <QuestionText>Lorem ipsum dolor sit amet?</QuestionText>
          <QuestionText>Option 1: Answer 1</QuestionText>
          <QuestionText>Option 2: Answer 2</QuestionText>
          <QuestionText>Option 3: Answer 3</QuestionText>
          <QuestionText>Option 4: Answer 4</QuestionText>
          <EditButton>Edit</EditButton>
        </QuestionItem>
        <QuestionItem>
          <QuestionTitle>Question 2:</QuestionTitle>
          <QuestionText>Consectetur adipiscing elit?</QuestionText>
          <QuestionText>Option 1: Answer 1</QuestionText>
          <QuestionText>Option 2: Answer 2</QuestionText>
          <QuestionText>Option 3: Answer 3</QuestionText>
          <QuestionText>Option 4: Answer 4</QuestionText>
          <EditButton>Edit</EditButton>
        </QuestionItem>
        {/* Add more questions and their details as needed */}
      </QuestionList>
    </AdminContainer>
    </Container>
  );
};
