import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from "axios";
import { useNavigate } from "react-router-dom"
import config from "../config/keys";
import { auth } from "../providers/auth";

const AdminContainer = styled.div`
  width: 800px;
  padding: 20px;
  background-color: #f5f8fa;
  margin-top:50px;
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
const PublishForm = styled.div`
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

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  width: 100%;
  margin-bottom: 10px;
`;

const TextArea = styled.textarea`
  width: 100%;
`;

const PublishButton = styled.button`
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

export const PublishQuestion = () => {
    const navigate = useNavigate();

    useEffect(() => {
        try {
            const user = auth();
            if (!user)
                navigate("/login")
            axios.post(`${config.api}/who`, {}, { headers: user.headers })
                .then((res) => {
                    if (!res.data.user.isAdmin) {
                        alert("You can't access this web page");
                        navigate("/");
                    }
                })
                .catch((err) => {
                    ("Internal server error!");
                    navigate("/");
                })
        } catch (error) {
            alert("error while signing you! please login again");
        }

    }, [])
    const initialFormData = {
        question: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        score: '',
        rightOption: '',
        level: '',
        language: '',
    };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const submit = (e) => {
        if (formData.question.length === 0) {
            alert("Please enter a question")
            return;
        }
        if (formData.option1.length === 0 || formData.option2.length === 0) { // two options are mandatory
            alert("first two options are mandatory")
            return;
        }
        if (formData.language.length === 0 || formData.level.length === 0 || formData.rightOption.length === 0) {
            alert("select all below options")
            return;
        }
        if (formData.score.length === 0) {
            alert("please select score!");
            return;
        }
        const options = [formData.option1, formData.option2];
        if (formData.option3.length > 0) {
            options.push(formData.option3);
        }
        if (formData.option4.length > 0) {
            options.push(formData.option4);
        }

        if (!options.includes(formData[formData.rightOption])) {
            alert("rightOption must belong to one of the options.");
            return;
        }
        const who = localStorage.getItem("who");  // fetching the jwt auth token
        const token = JSON.parse(who);
        let data = {};
        data.token = token;
        const headers = {
            'Authorization': `Bearer ${data.token}`,
            'Content-Type': 'application/json'
        };
        formData.rightOption = formData[formData.rightOption];
        const valideData = {};
        Object.keys(formData).forEach((key) => {    // passing only filled data
            if (formData[key].trim() !== "")
                valideData[key] = formData[key];
        })
        axios.post(`${config.api}/question/add`, valideData, { headers })
            .then((res) => {
                alert("Quesion submitted");
                setFormData(initialFormData);
                window.location.reload();
            })

            .catch((err) => {
                alert(err.response.data.error)
            })
    }
    return (
        <Container>
            <AdminContainer>
                <PublishForm>
                    <Label htmlFor="question">Question:</Label>
                    <TextArea id="question" name="question" rows="4" onChange={handleChange} required />

                    <Label htmlFor="option1">Option 1:</Label>
                    <Input type="text" id="option1" name="option1" onChange={handleChange} required />

                    <Label htmlFor="option2">Option 2:</Label>
                    <Input type="text" id="option2" name="option2" onChange={handleChange} required />

                    <Label htmlFor="option3">Option 3:</Label>
                    <Input type="text" id="option3" name="option3" onChange={handleChange} />

                    <Label htmlFor="option4">Option 4:</Label>
                    <Input type="text" id="option4" name="option4" onChange={handleChange} />

                    <Label htmlFor="score">Choose Score</Label>
                    <Select id="score" name="score" onChange={handleChange} defaultValue="none">
                        <option value="none" disabled>---</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Select>

                    <Label htmlFor="rightOption">Select right option:</Label>
                    <Select id="rightOption" name="rightOption" onChange={handleChange} defaultValue="none">
                        <option value="none" disabled>---</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        <option value="option4">Option 4</option>
                    </Select>

                    <Label htmlFor="level">Level:</Label>
                    <Select id="level" name="level" onChange={handleChange} defaultValue="none">
                        <option value="none" disabled>---</option>
                        <option value="beginner">Beginner</option>
                        <option value="intermediate">Intermediate</option>
                        <option value="experienced">Experienced</option>
                    </Select>

                    <Label htmlFor="language">Language:</Label>
                    <Select id="language" name="language" onChange={handleChange} defaultValue="none">
                        <option value="none" disabled>---</option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                    </Select>

                    <PublishButton type="submit" onClick={submit}>Publish Question</PublishButton>
                </PublishForm>
            </AdminContainer>
        </Container>
    );
};
