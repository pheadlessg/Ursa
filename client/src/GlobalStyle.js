import styled from "styled-components";
import media from "./media";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import loading from "./loading.gif";



const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => (props.main ? '#11414D' : '#efefef')};
`;

const HeaderContainer = styled.div`
  grid-column: 2;
  grid-row: 1;
`;

const Container = styled.div`
margin: auto;
margin-top: 50px;
`;

const Header = styled.img.attrs({
  src: logo
})`
    padding-top: 3vh;
    padding-bottom: 3vh;
    border: none;
    margin: auto;
    grid-column: 2;
    grid-row: 1;
    display: block;
    height: ${props => (props.main ? "250px" : "150px")};
  `;

const Content = styled.div`
  // background-color: #ffbd19;
  display: flex;
  text-align: center;
  grid-column: 2;
  grid-row: ${props => (props.main ? "2" : "2 / span 2")};
`;

const Button = styled.button`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
  font-family: "Montserrat", sans-serif;
  background: ${props => (props.primary ? "#2EC1E2" : "#11414D")};
  color: ${props => (props.primary ? "#091316" : "#FEFEFE")};
  font-size: 1em;
  padding: 1em;
  margin: 5px;
  border: none;
  border-radius: 8px;
  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;
const Img = styled.img.attrs({
  src: loading
})`
margin-top: 150px;
margin: auto;
height: 200px;
z-index: 10;
`
const LoadingScreen = styled.div`
  margin: auto;
  z-index: 9;
  background: ${props => (props.main ? "radial-gradient(circle, rgba(254,254,254,1) 0%, rgba(227,225,226,1) 34%, rgba(218,220,219,1) 100%)" : "")};
  opacity: ${props => (props.main ? "1" : "0.5")};
  display: flex;
  height: 100vh;
  width: 100vw;
`;

const WideButton = styled.button`
background-color: #2EC1E2;
opacity: 0.7;
  width: 400px;
  border: none;
  border-radius: 8px;
  font-size: 1em;
  padding: 1em;
  margin: 5px;
  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 15px;
  padding: 0px;
  // Scrolling effect in here
`;

const HFive = styled.h5`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,800");
  margin-bottom: 0px;
  text-align: center;
`;

const smallLabel = styled.body`
  @import url("https://fonts.googleapis.com/css?family=Montserrat:700");
  font-size: 0.5em;
  margin: 0px;
  padding: 0px;
`;

const ListItem = styled.li`
  border-radius: 8px;
  padding: 5px;
  &:hover {
    cursor: pointer;
  }
  @import url("https://fonts.googleapis.com/css?family=Montserrat");
  background: #2ec1e2;
  margin-left: -10px;
  margin-top: 3px;
`;

export {
  Button,
  LoadingScreen,
  Header,
  Container,
  Content,
  HeaderContainer,
  List,
  Img,
  HFive,
  ListItem,
  WideButton,
  smallLabel, 
  StyledLink
};
