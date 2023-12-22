import React,{useEffect, useState} from 'react';
import styled from 'styled-components';

const LeaderboardContainer = styled.div`
  width: 800px;
  height: 278px;
  background-color: #f5f8fa;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  margin-top: 20px;
  padding: 16px;
  overflow: auto;
`;

const LeaderboardTitle = styled.h3`
  font-size: 20px;
  color: #5296dd;
`;

const LeaderboardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: left;
`;

const TableHeader = styled.th`
  padding: 8px 16px;
  background-color: #5296dd;
  color: #fff;
`;

const TableRow = styled.tr`
  background-color: ${({ even }) => (even ? '#ddd' : 'transparent')};
  font-weight: ${({ user }) => (user ? 'bold' : 'normal')}; // Set font-weight to bold for user rows
`;

const TableData = styled.td`
  padding: 8px 16px;
`;

export const Leaderboard = ({results, username}) => {

  const [showResults, setShowResults] = useState();
  useEffect(() => {
    setShowResults(results);
  }, [results])
  
  return (
    <LeaderboardContainer>
      <LeaderboardTitle>Leaderboard</LeaderboardTitle>
      <LeaderboardTable>

        <thead>
          <TableRow even>
            <TableHeader>Rank</TableHeader>
            <TableHeader>Name</TableHeader>
            <TableHeader>Score</TableHeader>
          </TableRow>
        </thead>
       {
        showResults === undefined ? (
          <p>loading...</p>
        ) : (
        <tbody>
          {showResults.map((user, index) => (
            <TableRow even={index % 2 === 0} key={index} user={username === user.username }>
              <TableData>{index+1}</TableData>
              <TableData>Player {user.username}</TableData>
              <TableData>{user.score}</TableData>
            </TableRow>
          ))}
        </tbody>
        )
       }
      </LeaderboardTable>
    </LeaderboardContainer>
  );
};

