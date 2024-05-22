import {db, auth} from "../../firebaseConnection";

import { 
  addDoc,
   collection,
   getDoc,
   doc,
   getDocs,
   updateDoc,
   deleteDoc,
   onSnapshot,
} from "firebase/firestore";

import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { useState, useEffect} from "react";

import { Container, Form } from "./styles";

export function Home(){

  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [idPost, setIdPost] = useState("");

  const [posts, setPosts] = useState([]);

  async function handleAdd(){

    await addDoc(collection(db, "posts"), {
      titulo: title,
      autor: author
    })
    .then(()=>{
      alert("Dados cadastrados com sucesso!");
      setAuthor("");
      setTitle("");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  async function handelFetchPost(){
    /* 
    const docRef = doc(db, "posts", "1234");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setTitle(docSnap.data().titulo)
      setAuthor(docSnap.data().autor)
    } else {
      console.log('não tem documento')
    }
    */

    const postRef = collection(db, "posts");

    await getDocs(postRef)
    .then((snapshot)=>{
      let list = [];
      snapshot.forEach((doc)=> {
        list.push({
          id: doc.id,
          titulo: doc.data().titulo,
          autor: doc.data().autor,
        })
      })

      setPosts(list);

    })
    .catch((error)=>{
      console.log(error);
    })
 
  } 

  async function handleEditPost(){
    const docRef = doc(db, "posts", idPost)

    await updateDoc(docRef, {
      titulo: title,
      autor: author,
    })
    .then(()=>{
      alert("Post atualizado");
      setIdPost("");
      setTitle("");
      setAuthor("");
    })
    .catch((error) =>{
      console.log(error);
    })
  }

  async function handleDeletePost(id){
    const docRef = doc(db, "posts", id);

    await deleteDoc(docRef)
    .then(()=>{
      alert("Post deletado com sucesso!")
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  async function handleSignUp(){
    await createUserWithEmailAndPassword(auth, email, password)
    .then(()=>{
      alert("Usuário cadastrado com sucesso.")
      setEmail("");
      setPassword("");
    })
    .catch((error)=>{

      if(error.code === "auth/weak-password"){
        alert("Senha muito fraca.");
      }else if(error.code === "auth/email-already-in-use"){
        alert("Esse e-mail já existe.");
      }

    })
  }

  async function handleSignIn(){
    await signInWithEmailAndPassword(auth, email, password)
    .then((value)=> {
      alert("Usuário logado com sucesso!");
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      })
      setUser(true);
      setEmail("");
      setPassword("");
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  async function handleLogOut(){
    await signOut(auth)
    .then(()=>{
      alert("Usuário deslogado.")
      setUser(false);
      setUserDetail({});
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  useEffect(()=>{
    async function loadPosts(){
      const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
      
        let postList = [];

        snapshot.forEach((doc)=> {
          postList.push({
            id: doc.id,
            titulo: doc.data().titulo,
            autor: doc.data().autor,
          })
        })
  
        setPosts(postList);
      })
    }

    loadPosts();

  },[]);

  useEffect(()=>{
    async function checkLogin(){
      onAuthStateChanged(auth, (user)=>{
        if(user){ // logado
          setUser(true);
          setUserDetail({
            uid: user.uid,
            email: user.email,
          })
        }else{  
          setUser(false);
          setUserDetail({});
        }
      })
    }

    checkLogin();
  },[])

  return(
    <Container>
      <h1>teste</h1>


      { user && (
        <div>
          <strong>Bem vindo (você está logado) </strong>
          <span>Id: {userDetail.uid} Email: {userDetail.email} </span>
          <button type="button" onClick={handleLogOut}>Sair da conta</button>
        </div>
      )}
     
        <Form>
        <h2>Usuários</h2>
        <label htmlFor="">Email</label>
        <input 
        type="text" 
        placeholder="Digite seu E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />  

        <label htmlFor="">Senha</label>
        <input 
        type="password" 
        placeholder="Digite sua senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        /> 

        <button type="button" onClick={handleSignUp}>Cadastrar usuário</button>
        <button type="button" onClick={handleSignIn}>Fazer login</button>


        <h2>Posts</h2>
        <label htmlFor="">Id do Post: </label>

        <input type="text" 
        placeholder="Digite o id do Post" 
        value={idPost} 
        onChange={(e) => setIdPost(e.target.value)}
        />

        <label htmlFor="">Título: </label>

        <input type="text" 
        placeholder="Digite o título" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="">Autor: </label>

        <input 
        type="text" 
        placeholder="Autor do post" 
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        />

        <button type="button" onClick={handleAdd}>Cadastrar</button>
        <button type="button" onClick={handelFetchPost}>Buscar post</button>
        <button type="button" onClick={handleEditPost}>Atualizar post</button>
      

        </Form>

        <ul>
          {posts.map((post)=>{
            return(
              <li key={post.id}>
                <strong>Id: {post.id} </strong>
                <span>Titulo: {post.titulo} </span>
                <span>Autor: {post.autor} </span>
                <button onClick={() => handleDeletePost(post.id)} >Excluir</button>
              </li>
            )
          })}
        </ul>
      
    </Container>
  )
}