import styled from "styled-components";
import media from "./media";
import logo from "./logo.png";


const HeaderContainer = styled.div`
  grid-column: 2;
  grid-row: 1;
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
    // ${media.phone`
    // height: ${props => (props.main ? "150px" : "80px")};
    // ;
    // `}
    // ${media.desktop`
    // height: ${props => (props.main ? "250px" : "150px")};
    // `}
  `;

const Content = styled.div`
// background-color: #FFBD19;
display: flex;
text-align: center;
  grid-column: 2;
  grid-row: ${props => (props.main ? '2' : '2 / span 2')};
`;

const Button = styled.button`
  background: ${props => (props.primary ? "#2EC1E2" : "#11414D")};
  color: ${props => (props.primary ? "#091316" : "#FEFEFE")};
  font-size: 1em;
  padding: 1em;
  margin: 30px;
  border: none;
  border-radius: 3px;
  &:hover {
    opacity: 0.9;
    curson: pointer;
    box-shadow: 3px 3px 10px #888888;
  }
`;  

const List = styled.ul`
list-style: none;
margin: 0px;
padding: 0px;
// Scrolling effect in here
`;

const HFive = styled.h5`
margin-bottom: 0px;
`

const ListItem = styled.li`
&:hover {
  curson: pointer;
}
background: #2EC1E2
margin-left: -10px;
margin-top: 3px;
`;


export {Button, Header, Content, HeaderContainer, List, HFive, ListItem}