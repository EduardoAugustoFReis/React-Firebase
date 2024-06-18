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


  >button{
    font-size: 1.4rem;
    margin-top: 1.0rem;
    padding: 1.0rem;
    border-radius: 1.0rem;
    background-color: #3366ff;
    color: #fff;
    border: none;
  }

  >textarea{
    border: 0;
    resize: none;
    border: none;
    margin: 10px 0px;
    border-radius: 8px;
    padding: 8px;
    height: 9.0rem;
    font-size: 1.2rem;
  }

`;

export const Content = styled.div`
  width: 100%;
  max-width: 40.0rem;
  display: flex;
  flex-direction: column;
  background-color: rgba(18,18,18, 0.38);

  padding: 8px;

  p{
    font-size: 1.2rem;
  }

  button{
    border: none;
    padding: 5px;
    border-radius: 10px;
    font-size: 1.2rem;
    margin: 10px 0px;
    margin-left: 5px;
  }

  .btn-delete{
   color: #ffcc23;
   background: transparent;
  }

  .btn-logout{
    position: absolute;
    bottom: 6px;
    left: 4.0rem;
    height: 4.0rem;
    width: 4.0rem;
    border-radius: 50%;
    background-color: #fff;
    color: #000;
    font-weight: bold;
    border: none;
  }

`;