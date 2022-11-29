import styles from "./../Styles/Soporte/ErrorPage.module.css";
import { RiAlertFill } from "react-icons/ri";

function ErrorPage() {
  return (
    <div className={styles.errorContainer}>
      <RiAlertFill size={"15vw"} color={"red"} />
      <div className={styles.error}>
        Ha ocurrido un error en la página, lo estamos solucionando. Reinicie la
        página y si el problema sigue persistiendo le pedimos paciencia.
      </div>
    </div>
  );
}

export default ErrorPage;
