import styled, { css } from "styled-components";
import media from "./media";

const MainContainer = styled.div`
@import url("https://fonts.googleapis.com/css?family=Montserrat");
font-family: 'Montserrat', sans-serif;
  height: 100%;
  width: 100%;
  color: #11414D;
  background: rgb(254,254,254);
background: radial-gradient(circle, rgba(254,254,254,1) 0%, rgba(227,225,226,1) 34%, rgba(218,220,219,1) 100%);
  display: grid;
  grid-template-rows: 2fr 4fr 2fr 0.5fr;
  grid-template-columns: 1fr 2fr 1fr;

  // ${media.phone`
  //   height: 100vh;
  //   width: 100vw;
  // `}
  // ${media.desktop`
  //   padding-left: 10px;
  //   padding-right: 10px;
  //   padding-top: 15px;
  // `}
`;

export default MainContainer;
