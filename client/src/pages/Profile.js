// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavBar } from '../components/NavBar';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import config from "../config/keys";
import { auth } from "../providers/auth"

const ProfileContainer = styled.div`
  width: 800px;
  padding: 20px;
  background-color: #f5f8fa;
  border-radius: 8px;
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
const Title = styled.h2`
  font-size: 24px;
  color: #5296dd;
`;

const UserProfileWrapper = styled.div`
  text-align: left;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-weight: bold;
`;

const UserText = styled.p`
  margin: 10px 0;
`;

const ProgressWrapper = styled.div`
  font-size: 18px;
  margin-top: 20px;
`;

const ProgressBar = styled.div`
  background-color: #5296dd;
  height: 10px;
  border-radius: 5px;
`;

const ProgressBarInner = styled.div`
  background-color: #ff6314;
  height: 100%;
  border-radius: 5px;
  width: ${({ progress }) => progress};
`;

const UpdateLanguageWrapper = styled.div`
  margin-top: 20px;
`;

const UpdateLanguageLabel = styled.label`
  font-weight: bold;
`;

const LanguageSelect = styled.select`
  padding: 10px;
  font-size: 16px;
  margin-left:4px;
  margin-right:6px;
`;

const UpdateButton = styled.button`
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

const ResetButton = styled.button`
  margin-top:4px;
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

const languages = ["hindi", "english"];

export const Profile = () => {

  const navigate = useNavigate();

  const [userLanguage, setUserLanguage] = useState("");
  const [userData, setUserData] = useState({ username: "", email: "", progress: "" ,languagePreference:"", level: ""});
  useEffect(() => {
    try {
      const user = auth();
      if (!user) navigate("/login");

      axios.post(`${config.api}/profile`, {}, { headers: user.headers })
        .then((res) => {
          const user = res.data.user;
          setUserLanguage(user.languagePreference);
          const progress = (user.score / 30) * 100; // counting progress in percentage
          setUserData({ username: user.username, email: user.email, progress: `${progress}`,languagePreference:user.languagePreference, level:user.level });
        })
        .catch((err) => {
          console.log(err.response);
        });
    } catch (error) {
      alert("Error while signing you in! Please login again");
      navigate("/login");
    }
  }, []);

  const resetData = async() => {
    try {
      let data = {username:userData.username};
      await axios.post(`${config.api}/resetData`, data);
      setUserData({...userData, progress:"0"});
    } catch (error) {
      alert("failed to clear!try again later");
    }
  }
  const submit = async() => {
    if(userLanguage === userData.languagePreference){
      alert("select a new language to update!");
      return;
    }
    let data = {language:userLanguage, username:userData.username};
    try {
      const res = await axios.post(`${config.api}/updateLanguage`, data);
      setUserLanguage(userLanguage); // reset the language to re render component;
      if(res.data.previousResults) {
        setUserData({...userData, progress:`${res.data.previousResults.score}`, languagePreference:userLanguage});
        window.location.reload();
      }else{
        setUserData({...userData, progress:"0", languagePreference:userLanguage});
        alert("language updated!");
      }
    } catch (error) {
      alert("Failed to updtae language! try again later")
    }
  }
  return (
    <Container>
      <NavBar />
      <ProfileContainer>
        <Title>User Profile</Title>
        <UserProfileWrapper>
          <Label>Name:</Label>
          <UserText>{userData.username}</UserText>
          <Label>Email:</Label>
          <UserText>{userData.email}</UserText>
          <Label>Progress of {userData.languagePreference} in current level:</Label>  
          <ProgressWrapper>
            <ProgressBar>
              <ProgressBarInner progress={userData.progress + '%'} ></ProgressBarInner>
            </ProgressBar>
            <UserText>{Math.floor(userData.progress)}% completed</UserText>
          </ProgressWrapper>
        </UserProfileWrapper>
        <UpdateLanguageWrapper>
          <UpdateLanguageLabel>Language Preference:</UpdateLanguageLabel>
          <LanguageSelect onChange={(e) => setUserLanguage(e.target.value)}>
            {languages.map((language) => (
              <option key={language} value={language} selected={language === userLanguage}>
                {language}
              </option>
            ))}
          </LanguageSelect>
          <UpdateButton onClick={submit}>Update Language Preference</UpdateButton>
        </UpdateLanguageWrapper>
        <ResetButton onClick={resetData}>Reset your data</ResetButton>
      </ProfileContainer>
    </Container>
  );
};
