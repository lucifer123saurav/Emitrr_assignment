import React from 'react'
import styled from 'styled-components'
import { NavBar } from '../components/NavBar'
import { Leaderboard } from '../components/Leaderboard'

export const Results = ({results,username}) => {

    const Container = styled.div`
    font-family: "Arial", sans-serif;
            background-color: #f5f8fa; /* Light gray background */
            color: #000; /* Black text color */
            display: flex;
            flex-direction: column;
            align-items: center;
            height: 100vh;
            margin: 0;
    `
    return (
        <Container>
            <NavBar/>
            <Leaderboard results={results} username={username}/>
        </Container>
    )
}
