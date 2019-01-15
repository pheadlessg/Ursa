import { css } from "styled-components";

const sizes = {
  phone: 376,
  desktop: 768
};

function phone(...args) {
  return css`
    @media (max-width: ${sizes.phone}px) {
      ${css(...args)}
    }
  `;
}

function desktop(...args) {
  return css`
    @media (max-width: ${sizes.desktop}px) {
      ${css(...args)}
    }
  `;
}

const media = {
  phone,
  desktop
};

export default media;