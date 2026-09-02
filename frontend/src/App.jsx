import { useEffect, useState } from 'react';
import {
  Navigate,
  Route,
  Routes
} from 'react-router-dom';

import { supabase } from './supabase';

import Inicio from './pages/Inicio';
import Nivelamento from './pages/Nivelamento';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function RotaProtegida({ children }) {
  const [carregando, setCarregando] = useState(true);
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLogado(Boolean(data.session));
      setCarregando(false);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setLogado(Boolean(session));
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (carregando) {
    return <div className="pagina-central">Carregando...</div>;
  }

  if (!logado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />

      <Route
        path="/nivelamento"
        element={<Nivelamento />}
      />

      <Route path="/login" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <RotaProtegida>
            <Dashboard />
          </RotaProtegida>
        }
      />

      <Route
        path="*"
        element={
          <div className="pagina-central">
            <h1>404</h1>
            <p>Página não encontrada.</p>

            <a href="/" className="botao">
              Voltar ao início
            </a>
          </div>
        }
      />
    </Routes>
  );
}

export default App;