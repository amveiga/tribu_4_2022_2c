import styles from "./Styles/App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Header from "./Components/Header";
import Proyectos from "./Pages/Proyectos";
import Soporte from "./Pages/Soporte";
import RecursosHumanos from "./Pages/RecursosHumanos";
import Tareas from "./Pages/RecursosHumanos/Tareas";
import CargaHoras from "./Pages/RecursosHumanos/CargarHoras";
import ReportesTrabajador from "./Pages/RecursosHumanos/GenerarReportesTrabajador";
import ReportesProyecto from "./Pages/RecursosHumanos/GenerarReportesProyecto";
import ReporteTickets from "./Components/Soporte/Reportes/ReporteTickets";
import PageNotFound from "./Pages/PageNotFound";
import ProyectoPrueba from "./Pages/ProyectoPrueba";
import Tarea from "./Pages/Tarea"
function App() {
  return (
    <BrowserRouter>
      <div className={styles.appContainer}>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/proyectos" element={<Proyectos />}/>
            <Route path="/proyectos/:id" element={<ProyectoPrueba />}/>
          
          <Route path="/soporte" element={<Soporte />} />
          <Route path="/soporte/reporteTickets" element={<ReporteTickets />} />
          <Route path="/recursos-humanos" element={<RecursosHumanos />} />
          <Route path="/tarea">
            <Route path=":id" element={<Tarea/>} />
          </Route>
          <Route path="/recursos-humanos/GenerarReportesTrabajador" element={<ReportesTrabajador />} />
          <Route path="/recursos-humanos/GenerarReportesProyecto" element={<ReportesProyecto />} />
          <Route path="/recursos-humanos/:empleadoId/tareas" element={<Tareas />} />
          <Route path="/recursos-humanos/:empleadoId/tareas/cargar-horas" element={<CargaHoras />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
