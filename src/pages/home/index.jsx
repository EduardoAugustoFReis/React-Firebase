import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./styles"; 

import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
 
export function Home(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault();

    if(email !== "" && password !== ""){

      await signInWithEmailAndPassword(auth, email, password)
      .then(() =>{
        navigate("/admin", {replace: true})
      })
      .catch((error) =>{
        console.log(error);
      }) 

    }else{
      alert("Todos os campos precisam ser preenchidos!");   
    }

  }

  return(
    <Container>
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua agenda de forma fácil.</span>

      <Form onSubmit={handleRegister}>

        <label htmlFor="email">Email</label>
        <input 
        type="text"
        id="email"
        placeholder="Digite seu email" 
        value={email}
        onChange={(e) => setEmail(e.target.value) }
        />

        <label htmlFor="password">Senha</label>
        <input 
        type="password"
        id="password"
        placeholder="Digite sua Senha" 
        value={password}
        onChange={(e) => setPassword(e.target.value) }
        />

        <button type="submit">Acessar</button>

      </Form>

      <Link to="/register">Não possui uma conta? Cadastre-se</Link>

    </Container>
  )
}