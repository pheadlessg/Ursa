import styled from "styled-components";
import logo from "./logo.png";

const Header = styled.img.attrs({
    src: logo
  })`
    height: ${props => (props.main ? "400px" : "200px")};
    padding: 5em;
    border: none;
    margin: auto;
    display: block;
  `;

const Button = styled.button`
  background: ${props => (props.primary ? "#2EC1E2" : "#11414D")};
  color: ${props => (props.primary ? "#091316" : "#FEFEFE")};
  font-size: 1em;
  padding: 1em;
  border: none;
  border-radius: 3px;
  &:hover {
    opacity: 0.6;
    curson: pointer;
  }
`;








export {Button, Header}