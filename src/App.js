import styles from "./Styles/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Proyectos from "./Pages/Proyectos";
import Soporte from "./Pages/Soporte";
import RecursosHumanos from "./Pages/RecursosHumanos";
import Tareas from "./Pages/RecursosHumanos/Tareas";

function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/recursos-humanos" element={<RecursosHumanos />} />
          <Route path="/recursos-humanos/tareas" element={<Tareas />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
