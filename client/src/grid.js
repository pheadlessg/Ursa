import styled, { css } from "styled-components";
import media from "./media";

const MainContainer = styled.div`
@import url("https://fonts.googleapis.com/css?family=Montserrat");
font-family: 'Montserrat Alternates', sans-serif;
  height: 100%;
  width: 100%;
  background-color: #C3D4DB;
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
