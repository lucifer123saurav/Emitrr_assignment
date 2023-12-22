import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "../config/keys";
import { auth } from "../providers/auth"

const Container = styled.div`
    font-family: "Arial", sans-serif;
    background-color: #f5f8fa; /* Light gray background */
    color: #000; /* Black text color */
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
`
const QuizContainerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
`;
const QuizCard = styled.div`
  width: 300px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-right: 20px;
`;

const QuizTitle = styled.h3`
  font-size: 20px;
  color: #5296dd;
`;

const QuizDescription = styled.p`
  margin-top: 10px;
`;

const StartQuizLink = styled.a`
  text-decoration: none;
  color: #5296dd;
`;

export const Home = () => {
  const navigate = useNavigate();
  const [userLevel, setUserLevel] = useState(0);
  const [language, setLanguage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth();

        if (!user) {
          navigate("/login");
          return;
        }

        const response = await axios.post(`${config.api}/home`, {}, {
          headers: user.headers,
        });

        const userData = response.data.user;
        setUserLevel(userData.level);
        setLanguage(userData.languagePreference);
      } catch (error) {
        localStorage.removeItem("who");
        alert("Error while signing you in! Please login again");
        navigate("/login");
      }
    };

    fetchData();
  }, []);

  // lock other levels based on user level
  const areIntermediateCardsLocked = userLevel !== "intermediate" && userLevel !== "experienced";
  const isExperiencedCardLocked = userLevel !== 'experienced';

  return (
    <Container>
      <NavBar />
      <QuizContainerWrapper>
        <QuizCard>
          <QuizTitle>Beginner Quiz</QuizTitle>
          <QuizDescription>Test your knowledge at a beginner level.</QuizDescription>
          <StartQuizLink href={`quiz/${language}/beginner`}>Start Quiz</StartQuizLink>
        </QuizCard>
        <QuizCard>
          <QuizTitle>Intermediate Quiz</QuizTitle>
          <QuizDescription>Challenge yourself with intermediate-level questions.</QuizDescription>
          {/* will be locked if score is less than 10*/}
          {areIntermediateCardsLocked ? (
            <p>Locked (You need a score greater than 10 to unlock)</p>
          ) : (
            <StartQuizLink href={`quiz/${language}/intermediate`}>Start Quiz</StartQuizLink>
          )}
        </QuizCard>
        <QuizCard>
          <QuizTitle>Experienced Quiz</QuizTitle>
          <QuizDescription>Prove your expertise with advanced questions.</QuizDescription>
          {/* will be locked if score is less than 20*/}

          {isExperiencedCardLocked ? (
            <p>Locked (You need a score greater than 20 to unlock)</p>
          ) : (
            <StartQuizLink href={`quiz/${language}/experienced`}>Start Quiz</StartQuizLink>
          )}
        </QuizCard>
      </QuizContainerWrapper>
    </Container>
  );
};


