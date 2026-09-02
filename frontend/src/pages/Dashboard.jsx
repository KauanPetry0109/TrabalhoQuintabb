import {
  useEffect,
  useMemo,
  useState
} from 'react';

import { useNavigate } from 'react-router-dom';

import { supabase } from '../supabase';

const API_URL = import.meta.env.VITE_API_URL;

function Dashboard() {
  const navigate = useNavigate();

  const [candidatos, setCandidatos] = useState([]);
  const [busca, setBusca] = useState('');
  const [nivel, setNivel] = useState('');
  const [status, setStatus] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(true);

  async function obterToken() {
    const { data } = await supabase.auth.getSession();

    return data.session?.access_token;
  }

  async function carregarCandidatos() {
    try {
      setCarregando(true);
      setErro('');

      const token = await obterToken();

      if (!token) {
        navigate('/login');
        return;
      }

      const resposta = await fetch(
        `${API_URL}/api/candidates`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (resposta.status === 401) {
        await supabase.auth.signOut();
        navigate('/login');
        return;
      }

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.erro || 'Erro ao carregar candidatos.'
        );
      }

      setCandidatos(dados);
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCandidatos();
  }, []);

  async function mudarStatus(id, novoStatus) {
    try {
      const token = await obterToken();

      const resposta = await fetch(
        `${API_URL}/api/candidates/${id}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            status: novoStatus
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.erro || 'Não foi possível alterar o status.'
        );
      }

      setCandidatos((anteriores) =>
        anteriores.map((candidato) =>
          candidato.id === id
            ? { ...candidato, status: novoStatus }
            : candidato
        )
      );
    } catch (erro) {
      setErro(erro.message);
    }
  }

  async function sair() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  const candidatosFiltrados = useMemo(() => {
    return candidatos.filter((candidato) => {
      const nomeCombina = candidato.name
        .toLowerCase()
        .includes(busca.toLowerCase());

      const nivelCombina =
        !nivel || candidato.level === nivel;

      const statusCombina =
        !status || candidato.status === status;

      return nomeCombina && nivelCombina && statusCombina;
    });
  }, [candidatos, busca, nivel, status]);

  const totalNovos = candidatos.filter(
    (candidato) => candidato.status === 'novo'
  ).length;

  const totalMatriculados = candidatos.filter(
    (candidato) => candidato.status === 'matriculado'
  ).length;

  const totalB1B2 = candidatos.filter(
    (candidato) =>
      candidato.level === 'B1' ||
      candidato.level === 'B2'
  ).length;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="logo">
          Speak<span>Up</span>
        </div>

        <div>
          <button
            className="botao-secundario"
            onClick={carregarCandidatos}
          >
            Atualizar
          </button>

          <button
            className="botao sair"
            onClick={sair}
          >
            Sair
          </button>
        </div>
      </header>

      <main className="dashboard-conteudo">
        <div className="dashboard-titulo">
          <div>
            <span className="tag">Administração</span>
            <h1>Painel da Secretaria</h1>
          </div>
        </div>

        {erro && <div className="alerta erro">{erro}</div>}

        <section className="estatisticas">
          <div className="stat">
            <span>Total de candidatos</span>
            <strong>{candidatos.length}</strong>
          </div>

          <div className="stat">
            <span>Novos</span>
            <strong>{totalNovos}</strong>
          </div>

          <div className="stat">
            <span>B1 ou B2</span>
            <strong>{totalB1B2}</strong>
          </div>

          <div className="stat">
            <span>Matriculados</span>
            <strong>{totalMatriculados}</strong>
          </div>
        </section>

        <section className="painel-tabela">
          <div className="filtros">
            <input
              placeholder="Pesquisar candidato..."
              value={busca}
              onChange={(evento) =>
                setBusca(evento.target.value)
              }
            />

            <select
              value={nivel}
              onChange={(evento) =>
                setNivel(evento.target.value)
              }
            >
              <option value="">Todos os níveis</option>
              <option value="A1">A1</option>
              <option value="A2">A2</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
            </select>

            <select
              value={status}
              onChange={(evento) =>
                setStatus(evento.target.value)
              }
            >
              <option value="">Todos os status</option>
              <option value="novo">Novo</option>
              <option value="contatado">Contatado</option>
              <option value="matriculado">
                Matriculado
              </option>
              <option value="arquivado">
                Arquivado
              </option>
            </select>
          </div>

          {carregando ? (
            <div className="estado-vazio">
              Carregando candidatos...
            </div>
          ) : candidatosFiltrados.length === 0 ? (
            <div className="estado-vazio">
              Nenhum candidato encontrado.
            </div>
          ) : (
            <div className="tabela-container">
              <table>
                <thead>
                  <tr>
                    <th>Candidato</th>
                    <th>Contato</th>
                    <th>Nível</th>
                    <th>Resultado</th>
                    <th>Curso</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>

                <tbody>
                  {candidatosFiltrados.map(
                    (candidato) => (
                      <tr key={candidato.id}>
                        <td>
                          <strong>{candidato.name}</strong>
                          <small>{candidato.city || '-'}</small>
                        </td>

                        <td>
                          {candidato.email}
                          <small>{candidato.phone}</small>
                        </td>

                        <td>
                          <span className="badge-nivel">
                            {candidato.level}
                          </span>
                        </td>

                        <td>
                          {candidato.score}/
                          {candidato.total_questions}
                          <small>
                            {candidato.percentage}%
                          </small>
                        </td>

                        <td>
                          {candidato.recommended_course}
                        </td>

                        <td>
                          <select
                            value={candidato.status}
                            onChange={(evento) =>
                              mudarStatus(
                                candidato.id,
                                evento.target.value
                              )
                            }
                          >
                            <option value="novo">
                              Novo
                            </option>

                            <option value="contatado">
                              Contatado
                            </option>

                            <option value="matriculado">
                              Matriculado
                            </option>

                            <option value="arquivado">
                              Arquivado
                            </option>
                          </select>
                        </td>

                        <td>
                          {new Date(
                            candidato.created_at
                          ).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;