import styled, { css } from "styled-components";
import media from "./media";

const MainContainer = styled.div`
height: 100vh;
width: 100vw;
// background-color: blue;
${media.phone`
height: 100vh;
width: 100vw;
`}
  ${media.desktop`
padding-left: 10px;
padding-right: 10px;
padding-top: 15px
`}
`;

export default MainContainer;