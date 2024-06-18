import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body{
    font-size: 62.5%;
    background-color: #15171a;
    color: #fff;
  }

  button, a{
    cursor: pointer;
    text-decoration: none;

  }

  button:hover{
    transition: 300ms ease-in-out;
    transform: scale(1.1);
  }

  a:hover{
    text-decoration: underline;
  }

`;
