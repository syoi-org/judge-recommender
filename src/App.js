import React from 'react';
import {
  Container,
  Image,
  Menu
} from 'semantic-ui-react'
import logo from './logo.png';
import Recommender from './Recommender';
// import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <>
      <Menu fixed="top">
        <Menu.Item style={{
          paddingTop: "0",
          paddingBottom: "0"
        }}>
          <Image src={logo} style={{ height: "35px" }} />
        </Menu.Item>
        <Menu.Item>Judge Recommender</Menu.Item>
      </Menu>

      <Container style={{
        paddingTop: "50px"
      }}>
        <Recommender />
      </Container>
    </>
  );
}

export default App;
