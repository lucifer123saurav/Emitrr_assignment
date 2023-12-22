import React, { useState } from 'react';
import styled from 'styled-components';
import { Error } from "../components/Error"
import axios from "axios";
import config from "../config/keys"
import { useNavigate } from 'react-router-dom';
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

const ChooseLanguageWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  `;
const LanguageSelect = styled.select`
    width: 70%;
    padding: 10px;
    border: 1px solid #d7d7d7;
    background-color: #ffffff;
    border-radius: 4px;
    color: #000000;
  `;

export const Register = () => {

    const [userData, setuserData] = useState({ username: "", email: "", password: "",languagePreference:"" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
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
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!emailRegex.test(userData.email)) {
            showError("Invalid EmailId");
            return;
        }
        if (!passwordRegex.test(userData.password)) {
            showError("Weak Password");
            return;
        }
        if(userData.languagePreference.length === 0) {
            showError("please select language to learn");
            return;
        }
        setLoading(true);
        axios.post(`${config.api}/register`, userData)
            .then((res) => {
                // localStorage.setItem("who", JSON.stringify(res.data.token));
                navigate("/");
            })
            .catch((err) => {
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
                    <Title>SignUp</Title>
                    <Error error={error} />
                    <Input type="text" name="username" id="username" placeholder="enter username" onChange={handleChange} required />
                    <Input type="email" name="email" id="email" placeholder="enter email" onChange={handleChange} required />
                    <Input type="password" name="password" id="password" placeholder="enter password" onChange={handleChange} required />
                    <ChooseLanguageWrapper>
                        <LanguageSelect name='languagePreference' onChange={handleChange} defaultValue="none">
                            <option value="none" disabled>Choose language to master</option>
                            <option value="english">English</option>
                            <option value="spanish">Spanish</option>
                            <option value="french">French</option>
                            <option value="german">German</option>
                        </LanguageSelect>
                    </ChooseLanguageWrapper>
                    {loading ? (
                        <Button disabled>Loading...</Button>
                    ) : (
                        <Button onClick={submit}>Sign Up</Button>
                    )}
                    <SignUpLink>
                        Already have an account? <SignUpLinkText href="/login">Sign In</SignUpLinkText>
                    </SignUpLink>
                </RegisterForm>
            </RegisterFormWrapper>
        </Wrapper>
    );
};
