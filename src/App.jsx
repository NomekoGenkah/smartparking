import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MartinPage from "./screens/MartinPage";


export default function App() {
  return (
    <BrowserRouter>
      <nav style={{textAlign: 'center', margin:'18px 0'}}>
        <Link to="/" style={{marginRight:12}}>Ingreso/Salida</Link>
        <Link to="/reporte">Reporte Diario</Link>
      </nav>
      <Routes>
        <Route path="/" element={<MartinPage />} />
      </Routes>
    </BrowserRouter>
  );
}
