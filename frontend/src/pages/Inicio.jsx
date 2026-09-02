import { Link } from 'react-router-dom';

function Inicio() {
  return (
    <div>
      <header className="navbar">
        <Link to="/" className="logo">
          Speak<span>Up</span>
        </Link>

        <nav>
          <a href="#inicio">Início</a>
          <a href="#cursos">Cursos</a>
          <a href="#como-funciona">Como funciona</a>

          <Link to="/login" className="link-secretaria">
            Secretaria
          </Link>
        </nav>
      </header>

      <main>
        <section id="inicio" className="hero">
          <div className="hero-conteudo">
            <span className="tag">Teste de nivelamento gratuito</span>

            <h1>
              Descubra o inglês que
              <strong> combina com você.</strong>
            </h1>

            <p>
              Faça nosso teste de nivelamento e descubra qual
              curso da Speak Up combina melhor com seus
              conhecimentos atuais.
            </p>

            <Link to="/nivelamento" className="botao botao-grande">
              Descobrir meu nível
            </Link>
          </div>

          <div className="hero-card">
            <div className="nivel-card">
              <small>Seu próximo nível pode ser</small>
              <strong>B1</strong>
              <span>Intermediário</span>

              <div className="mini-progresso">
                <div />
              </div>
            </div>
          </div>
        </section>

        <section id="cursos" className="secao">
          <div className="titulo-secao">
            <span>Nossos cursos</span>
            <h2>Um caminho para cada nível.</h2>
          </div>

          <div className="grid-cursos">
            <article className="card">
              <span className="nivel">A1</span>
              <h3>Inglês Básico</h3>
              <p>
                Construa vocabulário e aprenda as estruturas
                fundamentais do inglês.
              </p>
            </article>

            <article className="card">
              <span className="nivel">B1</span>
              <h3>Inglês Intermediário</h3>
              <p>
                Amplie sua compreensão, vocabulário e capacidade
                de comunicação.
              </p>
            </article>

            <article className="card">
              <span className="nivel">B2</span>
              <h3>Inglês Avançado</h3>
              <p>
                Desenvolva maior fluência e domine situações
                mais complexas.
              </p>
            </article>

            <article className="card">
              <span className="nivel">Talk</span>
              <h3>Conversação</h3>
              <p>
                Pratique comunicação oral para situações reais
                do dia a dia.
              </p>
            </article>
          </div>
        </section>

        <section
          id="como-funciona"
          className="secao como-funciona"
        >
          <div className="titulo-secao">
            <span>É simples</span>
            <h2>Como funciona?</h2>
          </div>

          <div className="passos">
            <div>
              <strong>01</strong>
              <h3>Informe seus dados</h3>
              <p>
                Preencha suas informações para iniciar.
              </p>
            </div>

            <div>
              <strong>02</strong>
              <h3>Faça o teste</h3>
              <p>
                Responda questões de inglês.
              </p>
            </div>

            <div>
              <strong>03</strong>
              <h3>Descubra seu nível</h3>
              <p>
                Receba seu resultado imediatamente.
              </p>
            </div>

            <div>
              <strong>04</strong>
              <h3>Encontre seu curso</h3>
              <p>
                Veja qual curso recomendamos.
              </p>
            </div>
          </div>
        </section>

        <section className="cta">
          <h2>Pronto para descobrir seu nível?</h2>

          <p>
            O teste leva apenas alguns minutos.
          </p>

          <Link to="/nivelamento" className="botao botao-claro">
            Começar nivelamento
          </Link>
        </section>
      </main>

      <footer>
        <strong>Speak Up</strong>

        <p>Descubra seu nível. Comece a falar.</p>

        <small>
          Projeto acadêmico desenvolvido por Kauan Petry.
        </small>
      </footer>
    </div>
  );
}

export default Inicio;