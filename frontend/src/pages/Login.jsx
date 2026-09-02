import { useState } from 'react';
import {
  Link,
  useNavigate
} from 'react-router-dom';

import { supabase } from '../supabase';

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function entrar(evento) {
    evento.preventDefault();

    try {
      setCarregando(true);
      setErro('');

      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password: senha
        });

      if (error) {
        throw new Error('E-mail ou senha inválidos.');
      }

      navigate('/dashboard');
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="pagina-formulario">
      <form className="login-card" onSubmit={entrar}>
        <Link to="/" className="voltar">
          ← Voltar para o portal
        </Link>

        <div className="logo login-logo">
          Speak<span>Up</span>
        </div>

        <h1>Área da Secretaria</h1>

        <p>
          Entre com sua conta administrativa para acessar os
          candidatos.
        </p>

        {erro && <div className="alerta erro">{erro}</div>}

        <label>
          E-mail
          <input
            type="email"
            value={email}
            onChange={(evento) =>
              setEmail(evento.target.value)
            }
            required
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
            required
          />
        </label>

        <button
          className="botao"
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </main>
  );
}

export default Login;