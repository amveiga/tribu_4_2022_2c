import styles from "./Styles/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Proyectos from "./Pages/Proyectos";
import Soporte from "./Pages/Soporte";
import RecursosHumanos from "./Pages/RecursosHumanos";
import Tareas from "./Pages/RecursosHumanos/Tareas";
import CargaHorasAdministrativas from "./Pages/RecursosHumanos/CargarAdministrativas";
import CargaHorasGuardia from "./Pages/RecursosHumanos/CargarGuardia";
import CargaHorasIncidencias from "./Pages/RecursosHumanos/CargarIncidencias";
import CargaHorasLicencias from "./Pages/RecursosHumanos/CargarLicencias";
import CargaHorasTareas from "./Pages/RecursosHumanos/CargarTareas";
import ReportesTrabajador from "./Pages/RecursosHumanos/GenerarReportesTrabajador";
import ReportesProyecto from "./Pages/RecursosHumanos/GenerarReportesProyecto";

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
          <Route path="/recursos-humanos/GenerarReportesTrabajador" element={<ReportesTrabajador />} />
          <Route path="/recursos-humanos/GenerarReportesProyecto" element={<ReportesProyecto />} />
          <Route path="/recursos-humanos/tareas" element={<Tareas />} />
          <Route path="/recursos-humanos/tareas/cargar-administrativas" element={<CargaHorasAdministrativas />} />
          <Route path="/recursos-humanos/tareas/cargar-guardias" element={<CargaHorasGuardia />} />
          <Route path="/recursos-humanos/tareas/cargar-incidencias" element={<CargaHorasIncidencias />} />
          <Route path="/recursos-humanos/tareas/cargar-licencias" element={<CargaHorasLicencias />} />
          <Route path="/recursos-humanos/tareas/cargar-tareas" element={<CargaHorasTareas />} />
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
