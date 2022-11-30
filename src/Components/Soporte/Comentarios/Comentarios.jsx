import styles from "./../../../Styles/Soporte/Comentarios.module.css";
import { AiOutlineComment } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
// import ErrorPage from "./../ErrorPage";
import Comentario from "./Comentario";

function Comentarios({ comentarios, id }) {
  const [comentarioSelected, setComentarioSelected] = useState(false);
  const [coment, setComent] = useState("");

  const sendComent = async () => {
    await axios.post(
      "https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/comments",
      {
        ticketId: id,
        body: coment,
      }
    );
  };

  const deleteComents = async () => {
    await axios.delete(
      `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/comments/ticket-id/${id}`
    );
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => setComentarioSelected(!comentarioSelected)}
        className={
          comentarioSelected
            ? styles.comentariosContainer + " " + styles.selected
            : styles.comentariosContainer
        }
      >
        <div className={styles.title}>Comentarios</div>
        <AiOutlineComment size={"1.5vw"} color={"white"} />
        {comentarioSelected && (
          <div
            onClick={() => deleteComents()}
            className={
              comentarios.length === 0 ? styles.escondido : styles.eliminar
            }
          >
            Eliminar comentarios
          </div>
        )}
      </div>
      {comentarioSelected && (
        <div className={styles.showComentario}>
          {comentarios.length === 0 ? (
            <div className={styles.noComents}>No hay comentarios</div>
          ) : (
            <div className={styles.coments}>
              {comentarios.map((comentarioIncluido) => {
                return (
                  <Comentario
                    key={comentarioIncluido.id}
                    id={id}
                    coment={coment}
                    comentarioIncluido={comentarioIncluido}
                  />
                );
              })}
            </div>
          )}
          <div className={styles.sendContainer}>
            <textarea
              type={"text"}
              placeholder={"Ingrese su comentario"}
              className={styles.send}
              value={coment}
              rows={2}
              onChange={(event) => setComent(event.target.value)}
            />
            <IoSend
              cursor={"pointer"}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
              onClick={() => {
                sendComent();
                setComent("");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Comentarios;
