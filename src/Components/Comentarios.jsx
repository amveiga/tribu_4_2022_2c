import styles from "./../Styles/Soporte/Comentarios.module.css";
import { AiOutlineComment } from "react-icons/ai";
import { IoSend } from "react-icons/io5";
import { useState } from "react";
import ComentariosJSON from "./../Data/Comentarios.json";

function Comentarios({ id }) {
  const [comentarioSelected, setComentarioSelected] = useState(false);

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
      </div>
      {comentarioSelected && (
        <div className={styles.showComentario}>
          <div className={styles.coments}>
            {ComentariosJSON.filter(
              (comentario) => comentario.idTicket === id
            ).map((comentarioIncluido) => {
              return (
                <div className={styles.comentario} key={comentarioIncluido.id}>
                  {comentarioIncluido.Comentario}
                </div>
              );
            })}
          </div>
          <div className={styles.sendContainer}>
            <textarea
              type={"text"}
              placeholder={"Ingrese su comentario"}
              className={styles.send}
              rows={2}
            />
            <IoSend
              cursor={"pointer"}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Comentarios;
