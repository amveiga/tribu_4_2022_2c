import axios from "axios";
import { useState } from "react";
import { MdEdit, MdDelete, MdClose, MdCheck } from "react-icons/md";
import styles from "./../../../Styles/Soporte/Comentarios.module.css";
import ErrorPage from "../ErrorPage";

function Comentario({ comentarioIncluido, coment, id }) {
  const [editSelected, setEditSelected] = useState(false);
  const [comentEdited, setComentEdited] = useState(coment);

  const deleteComent = async (commentId) => {
    await axios
      .delete(
        `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/comments/${commentId}`
      )
      .catch((error) => {
        return <ErrorPage />;
      });
  };

  const updateComent = async (commentId) => {
    axios
      .put(
        `https://fiuba-memo1-api-soporte.azurewebsites.net/api/v1/comments/${commentId}`,
        {
          ticketId: id,
          body: comentEdited,
        }
      )
      .catch((error) => {
        return <ErrorPage />;
      });
  };

  return (
    <div className={styles.comentario} key={comentarioIncluido.id}>
      <div className={styles.comentariosTilte}>
        <div className={styles.info}>
          {editSelected ? (
            <textarea
              type={"text"}
              defaultValue={comentarioIncluido.body}
              className={styles.inputDescription}
              onChange={(event) => setComentEdited(event.target.value)}
            />
          ) : (
            comentarioIncluido.body
          )}
        </div>
        {editSelected ? (
          <div className={styles.finishEdit}>
            <MdClose
              onClick={() => {
                setEditSelected(false);
                setComentEdited(coment);
              }}
              className={styles.icon}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
            />
            <MdCheck
              className={styles.icon}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
              onClick={() => {
                setEditSelected(false);
                updateComent(comentarioIncluido.id);
              }}
            />
          </div>
        ) : (
          <div>
            <MdEdit
              className={styles.icon}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
              onClick={() => setEditSelected(true)}
            />
            <MdDelete
              onClick={() => deleteComent(comentarioIncluido.id)}
              className={styles.icon}
              size={"1.5vw"}
              color={"rgba(0,53,108,1)"}
            />
          </div>
        )}
      </div>
      <div className={styles.footerSection}>
        <div>Emitido: {comentarioIncluido.createdDatetime}</div>
        <div className={styles.marginLeft}>
          Modificado: {comentarioIncluido.lastModifiedDatetime}
        </div>
      </div>
    </div>
  );
}

export default Comentario;
