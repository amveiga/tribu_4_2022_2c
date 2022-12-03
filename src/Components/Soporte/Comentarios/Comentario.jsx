import { useState } from "react";
import { MdEdit, MdDelete, MdClose, MdCheck } from "react-icons/md";
import { DeleteComentario, UpdateComentario } from "../../../Utils/SoporteApi";
import styles from "./../../../Styles/Soporte/Comentarios.module.css";

function Comentario({ comentarioIncluido, coment, id, setUpdateComentarios }) {
  const [editSelected, setEditSelected] = useState(false);
  const [comentEdited, setComentEdited] = useState(coment);

  const deleteComentario = async (commentId) => {
    await DeleteComentario(commentId);
    setUpdateComentarios(true);
  };

  const updateComent = async (commentId) => {
    var body = {
      ticketId: id,
      body: comentEdited,
    };
    await UpdateComentario(commentId, body);
    setUpdateComentarios(true);
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
              onClick={() => deleteComentario(comentarioIncluido.id)}
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
