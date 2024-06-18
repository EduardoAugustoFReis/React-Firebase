import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Form } from "./styles"

import { auth } from "../../firebaseConnection";
import { createUserWithEmailAndPassword} from "firebase/auth";


export function Register(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e){
    e.preventDefault();

    if(email !== "" && password !== ""){
     await createUserWithEmailAndPassword(auth, email, password)
     .then(() => {
      alert("Usuário cadastrado com sucesso!")
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
      <h1>Cadastre-se</h1>
      <span>Vamos criar sua conta.</span>

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

        <button type="submit">Cadastrar</button>

      </Form>

      <Link to="/">Já possui uma conta? Faça o Login!</Link>
      
    </Container>
  )
}