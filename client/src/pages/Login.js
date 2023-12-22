import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom"
import { Error } from '../components/Error';
import config from "../config/keys"
import axios from "axios";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #ffffff;
  color: #000000;
`;

const RegisterFormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RegisterForm = styled.div`
  width: 380px;
  padding: 26px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  color: #5296dd;
  margin-bottom: 12px;
`;

const Input = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 16px;
  border: 1px solid #d7d7d7;
  background-color: #ffffff;
  border-radius: 4px;
  color: #000000;
`;

const Button = styled.button`
  background-color: #ff6314;
  color: #ffffff;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #e0550d;
  }
`;

const SignUpLink = styled.p`
  text-align: center;
  margin-top: 10px;
  font-weight: 100;
`;

const SignUpLinkText = styled.a`
  text-decoration: none;
  color: #5296dd;
`;

export const Login = () => {
  const [userData, setuserData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const who = localStorage.getItem("who");
    if (who)
      navigate("/");
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  }

  const showError = (errorMessage) => {
    setError(errorMessage);
    setTimeout(() => {
      setError("");
    }, 3000);
  }
  const submit = (e) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    
    if (!emailRegex.test(userData.email)) { // no need to query the db if email is Invalid
      showError("Invalid EmailId");
      return;
    }
    setLoading(true);
    axios.post(`${config.api}/login`, userData)
      .then((res) =>{
        localStorage.setItem("who", JSON.stringify(res.data.token));
        navigate("/");

      })
      .catch((err) =>{
        showError(err.response.data.error);
      })
      .finally(() => {
        setLoading(false);
      })

  }

  return (
    <Wrapper>
      <RegisterFormWrapper>
        <RegisterForm>
          <Title>Sign In</Title>
          <Error error={error} />
          <Input type="email" name="email" id="email" placeholder="enter email" onChange={handleChange} required />
          <Input type="text" name="password" id="password" placeholder="enter password" onChange={handleChange} required />
          <Input type="text" name="username" id="username" placeholder="enter" onChange={handleChange} required />
          {
            loading ? (
              <Button disabled>Loading...</Button>
              ) : (
              <Button onClick={submit}>Sign In</Button>
              )
            }
          <SignUpLink>
            Don't have an account? <SignUpLinkText href="/register">Sign up</SignUpLinkText>
          </SignUpLink>
        </RegisterForm>
      </RegisterFormWrapper>
    </Wrapper>
  );
};
