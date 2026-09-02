import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

function Nivelamento() {
  const [etapa, setEtapa] = useState('cadastro');
  const [perguntas, setPerguntas] = useState([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState({});
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');
  const [resultado, setResultado] = useState(null);

  const [candidato, setCandidato] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    city: '',
    studiedBefore: false,
    consent: false
  });

  useEffect(() => {
    async function carregarPerguntas() {
      try {
        const resposta = await fetch(`${API_URL}/api/questions`);

        if (!resposta.ok) {
          throw new Error();
        }

        const dados = await resposta.json();
        setPerguntas(dados);
      } catch {
        setErro(
          'Não foi possível carregar o teste. Verifique se o servidor está ligado.'
        );
      }
    }

    carregarPerguntas();
  }, []);

  function atualizarCampo(evento) {
    const { name, value, type, checked } = evento.target;

    setCandidato((anterior) => ({
      ...anterior,
      [name]: type === 'checkbox' ? checked : value
    }));
  }

  function iniciarTeste(evento) {
    evento.preventDefault();
    setErro('');

    if (!candidato.name.trim()) {
      return setErro('Informe seu nome.');
    }

    if (!candidato.email.trim()) {
      return setErro('Informe seu e-mail.');
    }

    if (!candidato.phone.trim()) {
      return setErro('Informe seu telefone.');
    }

    if (!candidato.consent) {
      return setErro(
        'Você precisa autorizar o uso dos dados para continuar.'
      );
    }

    if (perguntas.length === 0) {
      return setErro('As perguntas ainda não foram carregadas.');
    }

    setEtapa('teste');
  }

  function selecionarResposta(idPergunta, alternativa) {
    setRespostas((anterior) => ({
      ...anterior,
      [idPergunta]: alternativa
    }));
  }

  function proximaQuestao() {
    const pergunta = perguntas[questaoAtual];

    if (!respostas[pergunta.id]) {
      return setErro('Selecione uma resposta antes de continuar.');
    }

    setErro('');

    if (questaoAtual < perguntas.length - 1) {
      setQuestaoAtual((anterior) => anterior + 1);
    }
  }

  function questaoAnterior() {
    setErro('');

    if (questaoAtual > 0) {
      setQuestaoAtual((anterior) => anterior - 1);
    }
  }

  async function finalizarTeste() {
    const pergunta = perguntas[questaoAtual];

    if (!respostas[pergunta.id]) {
      return setErro('Selecione uma resposta.');
    }

    if (Object.keys(respostas).length !== perguntas.length) {
      return setErro('Responda todas as perguntas.');
    }

    try {
      setCarregando(true);
      setErro('');

      const answers = perguntas.map((item) => ({
        questionId: item.id,
        answer: respostas[item.id]
      }));

      const resposta = await fetch(
        `${API_URL}/api/placement`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            candidate: candidato,
            answers
          })
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        throw new Error(
          dados.erro || 'Não foi possível finalizar o teste.'
        );
      }

      setResultado(dados.resultado);
      setEtapa('resultado');
    } catch (erro) {
      setErro(erro.message);
    } finally {
      setCarregando(false);
    }
  }

  if (etapa === 'resultado' && resultado) {
    return (
      <main className="pagina-formulario">
        <div className="resultado-card">
          <span className="tag">Teste concluído</span>

          <h1>Parabéns, {resultado.nome}!</h1>

          <p>Seu nível estimado é</p>

          <div className="resultado-nivel">
            {resultado.nivel}
          </div>

          <h2>{resultado.descricao}</h2>

          <div className="resultado-dados">
            <div>
              <strong>{resultado.acertos}</strong>
              <span>Acertos</span>
            </div>

            <div>
              <strong>{resultado.totalQuestoes}</strong>
              <span>Questões</span>
            </div>

            <div>
              <strong>{resultado.porcentagem}%</strong>
              <span>Desempenho</span>
            </div>
          </div>

          <div className="curso-recomendado">
            <span>Curso recomendado</span>
            <strong>{resultado.cursoRecomendado}</strong>
          </div>

          <p>
            Seus dados foram registrados. A equipe da Speak Up
            poderá entrar em contato para orientar sua matrícula.
          </p>

          <Link to="/" className="botao">
            Voltar ao início
          </Link>
        </div>
      </main>
    );
  }

  if (etapa === 'cadastro') {
    return (
      <main className="pagina-formulario">
        <form
          className="formulario-card"
          onSubmit={iniciarTeste}
        >
          <Link to="/" className="voltar">
            ← Voltar
          </Link>

          <span className="tag">Nivelamento Speak Up</span>

          <h1>Antes de começar...</h1>

          <p>
            Precisamos de algumas informações para registrar seu
            resultado.
          </p>

          {erro && <div className="alerta erro">{erro}</div>}

          <label>
            Nome completo
            <input
              name="name"
              value={candidato.name}
              onChange={atualizarCampo}
              placeholder="Seu nome"
              required
            />
          </label>

          <div className="linha-formulario">
            <label>
              E-mail
              <input
                type="email"
                name="email"
                value={candidato.email}
                onChange={atualizarCampo}
                placeholder="email@exemplo.com"
                required
              />
            </label>

            <label>
              Telefone
              <input
                name="phone"
                value={candidato.phone}
                onChange={atualizarCampo}
                placeholder="(48) 99999-9999"
                required
              />
            </label>
          </div>

          <div className="linha-formulario">
            <label>
              Idade
              <input
                type="number"
                name="age"
                value={candidato.age}
                onChange={atualizarCampo}
                min="5"
                max="120"
              />
            </label>

            <label>
              Cidade
              <input
                name="city"
                value={candidato.city}
                onChange={atualizarCampo}
                placeholder="Sua cidade"
              />
            </label>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              name="studiedBefore"
              checked={candidato.studiedBefore}
              onChange={atualizarCampo}
            />

            Já estudei inglês anteriormente.
          </label>

          <label className="checkbox">
            <input
              type="checkbox"
              name="consent"
              checked={candidato.consent}
              onChange={atualizarCampo}
            />

            Autorizo o uso destes dados para contato relacionado
            ao processo de nivelamento e matrícula.
          </label>

          <button className="botao" type="submit">
            Começar teste
          </button>
        </form>
      </main>
    );
  }

  const pergunta = perguntas[questaoAtual];

  if (!pergunta) {
    return (
      <main className="pagina-central">
        Carregando teste...
      </main>
    );
  }

  const progresso =
    ((questaoAtual + 1) / perguntas.length) * 100;

  return (
    <main className="pagina-formulario">
      <div className="teste-card">
        <div className="teste-topo">
          <span>
            Questão {questaoAtual + 1} de {perguntas.length}
          </span>

          <strong>{Math.round(progresso)}%</strong>
        </div>

        <div className="barra">
          <div style={{ width: `${progresso}%` }} />
        </div>

        <h2>{pergunta.pergunta}</h2>

        {erro && <div className="alerta erro">{erro}</div>}

        <div className="alternativas">
          {pergunta.alternativas.map((alternativa) => (
            <button
              type="button"
              key={alternativa.id}
              className={
                respostas[pergunta.id] === alternativa.id
                  ? 'alternativa selecionada'
                  : 'alternativa'
              }
              onClick={() =>
                selecionarResposta(
                  pergunta.id,
                  alternativa.id
                )
              }
            >
              <strong>{alternativa.id}</strong>
              {alternativa.texto}
            </button>
          ))}
        </div>

        <div className="acoes-teste">
          <button
            className="botao-secundario"
            onClick={questaoAnterior}
            disabled={questaoAtual === 0 || carregando}
          >
            Voltar
          </button>

          {questaoAtual < perguntas.length - 1 ? (
            <button
              className="botao"
              onClick={proximaQuestao}
            >
              Próxima
            </button>
          ) : (
            <button
              className="botao"
              onClick={finalizarTeste}
              disabled={carregando}
            >
              {carregando
                ? 'Calculando resultado...'
                : 'Finalizar teste'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default Nivelamento;