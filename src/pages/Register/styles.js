import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1{
    font-size: 2.8rem;
  }

  span{
    font-size: 1.8rem;
  }

  a{
    margin-top: 10px;
    font-size: 1.4rem;
    color: #b4b8bb;
  }
`;

export const Form = styled.form`
  width: 40.0rem;
  display: flex;
  flex-direction: column;
  padding: 10px;
 
  >label{
    font-size: 1.4rem;
    padding: 1.0rem 0px;
  }

  >input{
    font-size: 1.2rem;
    padding: 1.2rem;
    border-radius: 1.0rem;
    border: none;
  }

  >button{
    font-size: 1.4rem;
    margin-top: 1.0rem;
    padding: 1.0rem;
    border-radius: 1.0rem;
    background-color: #3366ff;
    color: #fff;
    border: none;
  }

  >text-area{
    border: 0;
    height: 90px;
    resize: none;
    border: none;
    margin: 10px 0px;
    border-radius: 8px;
  }

`;