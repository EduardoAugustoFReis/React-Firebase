import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;

`;

export const Form = styled.form`
  width: 500px;
  display: flex;
  flex-direction: column;

  padding: 10px;
 
  >label{
    font-size: 20px;
    padding: 10px 0px;
  }

  >input{
    font-size: 16px;
    padding: 6px;

  }

  >button{
    font-size: 20px;
    margin-top: 10px;
  }

`;