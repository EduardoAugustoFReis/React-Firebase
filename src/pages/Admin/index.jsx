import { useEffect, useState } from "react";
import { Container, Form, Content } from "./styles";

import { auth, db } from "../../firebaseConnection";
import { signOut } from "firebase/auth";

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export function Admin() {
  const [tarefaInput, setTarefaInput] = useState("");
  const [user, setUser] = useState({});
  const [tarefas, setTarefas] = useState([]);
  const [editTarefa, setEditTarefa] = useState({});

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser");
      setUser(JSON.parse(userDetail));

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas");
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid));
        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              tarefa: doc.data().tarefa,
              userUid: doc.data().userUid
            });
          });
          console.log(lista);
          setTarefas(lista);
        });

        return () => unsub();
      }
    }

    loadTarefas();
  }, []);

  async function handleRegister(e) {
    e.preventDefault();

    if (tarefaInput === "") {
      alert("Digite sua tarefa");
      return;
    }

    if(editTarefa?.id ){
      handleUpdateTarefa();
      return; 
    }

    await addDoc(collection(db, "tarefas"), {
      tarefa: tarefaInput,
      created: new Date(),
      userUid: user?.uid,
    })
      .then(() => {
        alert("Tarefa registrada com sucesso");
        setTarefaInput("");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function handleLogout() {
    await signOut(auth);
  }

  async function deletarTarefa(id){
    const docRef = doc(db, "tarefas", id)

    await deleteDoc(docRef);
  }

  async function editarTarefa(tarefa){
    setTarefaInput(tarefa.tarefa);
    setEditTarefa(tarefa);
  }

  async function handleUpdateTarefa(){
    const docRef = doc(db, "tarefas",  editTarefa?.id)

    await updateDoc(docRef, {
      tarefa: tarefaInput,
    })
    .then(() => {
      alert("Tarefa atualizada");
      setTarefaInput("");
      setEditTarefa({});
    })
    .catch((error) => {
      console.log(error);
      setTarefaInput("");
      setEditTarefa({});
    })
  }

  return (
    <Container>
      <h1>Minhas tarefas</h1>

      <Form onSubmit={handleRegister}>
        <textarea
          placeholder="Digite sua tarefa..."
          value={tarefaInput}
          onChange={(e) => setTarefaInput(e.target.value)}
        />

        {Object.keys(editTarefa).length > 0 ? (
        <button type="submit" style={ {backgroundColor: "#6add39"} }>Atualizar tarefa</button>
        ) : ( 
          <button type="submit">Registrar tarefa</button>
        )}

      </Form>

      <Content>
        {tarefas.map((tarefa) => (
          <article key={tarefa.id}>
            <p>{tarefa.tarefa}</p>
            <div>
              <button onClick={ () => editarTarefa(tarefa) }>Editar</button>
              <button onClick={ () => deletarTarefa(tarefa.id) } className="btn-delete">Concluir</button>
            </div>
          </article>
        ))}

        <button className="btn-logout" onClick={handleLogout}>Sair</button>
      </Content>
    </Container>
  );
}
