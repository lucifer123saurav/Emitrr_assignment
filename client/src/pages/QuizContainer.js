import React, { useEffect, useState,useMemo } from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import {Results} from "./Results"
import config from '../config/keys';
import axios from 'axios';
import { ScoreIndicator } from '../components/ScoreIndicator';
import { useParams, useNavigate } from 'react-router-dom';
import QuestionPalette from '../components/QuestionPalette';
import { auth } from '../providers/auth';

const QuizContainerWrapper = styled.div`
  width: 800px;
  height: fit-content;
  margin-top: 10px;
  margin-left: 12%;
  margin-right: 16%;
  padding: 20px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`

const Container = styled.div`
  font-family: 'Arial', sans-serif;
  background-color: #f5f8fa;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
`;
const Title = styled.h2`
  font-size: 24px;
  color: #5296dd;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const Label = styled.label`
  display: block;
  margin: 5px 0;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const SubmitButton = styled.button`
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

const QuizContainer = () => {
  const { languagePreference, level } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [user, setUser] = useState("");
  const [totalAnswered,setTotalAnswered] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState({});
  const [results, setResults] = useState([]);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      const token = auth();
      if (!token) navigate('/login');

      const whoResponse = await axios.post(`${config.api}/who`, {}, { headers: token.headers });

      const user = whoResponse.data.user;
      setUser(user.username);
      if (user.languagePreference !== languagePreference) {
        alert("This language doesn't belong to your choice!");
        navigate('/');
      }

      const canAccessIntermediate = user.level !== "intermediate";
      const canAccessExperienced = user.level !== 'experienced';
      if (level === 'intermediate' && canAccessIntermediate) {
        alert('You are not eligible for this level!');
        navigate('/');
      }

      if (level === 'experienced' && canAccessExperienced) {
        alert('You are not eligible for this level!');
        navigate('/');
      }

      // Fetch questions based on user preferences
      const quizResponse = await axios.post(`${config.api}/question/${languagePreference}/${level}`, {}, { headers: user.headers });
      if(quizResponse.data.questions.length == 0) {
        alert("No questions found for this language and level");
        navigate("/");
      }
      const quizData = quizResponse.data.questions;
      setQuestions(quizData);
      setTotalQuestions(quizData.length);
    } catch (err) {
      alert('Internal server error!');
      navigate('/');
    }
  };
  const handleAnswerSubmit = async () => {
    if(currentAnswer === "") {
      alert("Please select a value");
      return;
    }
    setLoading(true);
    // Fetch next questions
    if (totalQuestions >= 2) {
      const response = await axios.post(`${config.api}/question/nextQuestion`, { currentQuestion, currentAnswer, questions });
      setQuestions(response.data.questions);
      setTotalQuestions(response.data.questions.length);
      setTotalAnswered(totalAnswered+1);
      if (response.data.correctOrNot)
        setScore(score + currentQuestion.score);
      setCurrentAnswer("");
    }
    // the end of the quiz or submit user answers
    else {
      let data={};
      if (currentQuestion.details[2] === currentAnswer) {
        const newScore = score + currentQuestion.score;
        data.score = score+currentQuestion.score;
        setScore(newScore);
      }else
        data.score = score;
      data.user = user;
      data.language = languagePreference;
      data.level = level;
      const response = await axios.post(`${config.api}/question/score`, data);
      setResults(response.data.results);
      setShowResults(true);
      alert('End of the quiz. Submit user answers here.');
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // update questions and set currentQuestion
  useEffect(() => {
    if (totalQuestions > 0) {
      setCurrentQuestion(questions[0]);
      setLoading(false);
    }
  }, [questions, totalQuestions]);

  const ShowQuestions = () => {
    return (
      <QuizContainerWrapper>
        <Title>{currentQuestion.title}</Title>
        <Options>
          {currentQuestion.options.map((option, index) => (
            <Label key={index}>
              <RadioInput
                type="radio"
                name="quiz-option"
                value={option}
                onClick={(e) => setCurrentAnswer(e.target.value)}
              />
              {option}
            </Label>
          ))}
        </Options>
        <SubmitButton onClick={handleAnswerSubmit}>Submit Answer</SubmitButton>
      </QuizContainerWrapper>
    );
  }

  return (
    <>
    {
      showResults ? (<Results  results={results} username={user} />) : (
        <Container>
        <NavBar />
        <ScoreIndicator score={score} />
        <QuestionPalette totalAnswered={totalAnswered} totalQuestions={totalQuestions} />
        {
          loading ? (<p>loading</p>) : (ShowQuestions())
        }
      </Container>
      )
    }
      </>
  );
};

export default QuizContainer;
