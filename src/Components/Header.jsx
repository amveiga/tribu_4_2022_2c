import styles from "./../Styles/Header.module.css";
import logoPSA from "./../Assets/PSA.png";
import sections from "./../Data/Sections.json";
import ListButton from "./ListButton";

function Header() {
  return (
    <div className={styles.headerContainer}>
      <a href="/" className={styles.logo}>
        <img src={logoPSA} width={"100%"} height={"100%"} alt="PSA" />
      </a>
      <ul className={styles.headerList}>
        {sections.map((section) => {
          return <ListButton section={section} />;
        })}
      </ul>
    </div>
  );
}

export default Header;
