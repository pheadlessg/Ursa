import styled from 'styled-components';
import React from "react";

import {Button} from "../../GlobalStyle"


const Welcome = styled.div`
background-color: red;
`;

const HomeScreen = (
    <Welcome>
        <Button as="a" href="/createelection/" primary>
      Start New Election
        </Button>
        <Button as="a" href="/list/">
        Vote
        </Button>
    </Welcome>
)

export default HomeScreen;