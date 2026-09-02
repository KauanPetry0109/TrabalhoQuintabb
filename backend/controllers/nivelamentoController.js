const database = require('../config/database');
const perguntas = require('../perguntas');

function calcularNivel(porcentagem) {
  if (porcentagem <= 30) {
    return {
      nivel: 'A1',
      descricao: 'Iniciante',
      curso: 'Inglês Básico'
    };
  }

  if (porcentagem <= 50) {
    return {
      nivel: 'A2',
      descricao: 'Básico',
      curso: 'Inglês Básico'
    };
  }

  if (porcentagem <= 75) {
    return {
      nivel: 'B1',
      descricao: 'Intermediário',
      curso: 'Inglês Intermediário'
    };
  }

  return {
    nivel: 'B2',
    descricao: 'Intermediário Avançado',
    curso: 'Inglês Avançado / Conversação'
  };
}

function validarCandidato(candidato) {
  if (!candidato) {
    return 'Dados do candidato não foram enviados.';
  }

  if (!candidato.name || candidato.name.trim().length < 2) {
    return 'Informe um nome válido.';
  }

  if (!candidato.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidato.email)) {
    return 'Informe um e-mail válido.';
  }

  if (!candidato.phone || candidato.phone.trim().length < 8) {
    return 'Informe um telefone válido.';
  }

  if (candidato.age !== undefined && candidato.age !== null) {
    const idade = Number(candidato.age);

    if (!Number.isInteger(idade) || idade < 5 || idade > 120) {
      return 'Informe uma idade válida.';
    }
  }

  if (candidato.consent !== true) {
    return 'É necessário autorizar o uso dos dados para continuar.';
  }

  return null;
}

async function fazerNivelamento(req, res) {
  try {
    const { candidate, answers } = req.body;

    const erroCandidato = validarCandidato(candidate);

    if (erroCandidato) {
      return res.status(400).json({
        erro: erroCandidato
      });
    }

    if (!Array.isArray(answers)) {
      return res.status(400).json({
        erro: 'As respostas não foram enviadas corretamente.'
      });
    }

    if (answers.length !== perguntas.length) {
      return res.status(400).json({
        erro: `É necessário responder todas as ${perguntas.length} perguntas.`
      });
    }

    let acertos = 0;

    for (const pergunta of perguntas) {
      const resposta = answers.find(
        (item) => Number(item.questionId) === pergunta.id
      );

      if (!resposta) {
        return res.status(400).json({
          erro: `A pergunta ${pergunta.id} não foi respondida.`
        });
      }

      const alternativaExiste = pergunta.alternativas.some(
        (alternativa) => alternativa.id === resposta.answer
      );

      if (!alternativaExiste) {
        return res.status(400).json({
          erro: `Resposta inválida para a pergunta ${pergunta.id}.`
        });
      }

      if (resposta.answer === pergunta.resposta) {
        acertos++;
      }
    }

    const totalQuestoes = perguntas.length;
    const porcentagem = Number(
      ((acertos / totalQuestoes) * 100).toFixed(2)
    );

    const resultadoNivel = calcularNivel(porcentagem);

    const novoCandidato = {
      name: candidate.name.trim(),
      email: candidate.email.trim().toLowerCase(),
      phone: candidate.phone.trim(),
      age:
        candidate.age === '' ||
        candidate.age === undefined ||
        candidate.age === null
          ? null
          : Number(candidate.age),
      city: candidate.city?.trim() || null,
      studied_before: Boolean(candidate.studiedBefore),
      score: acertos,
      total_questions: totalQuestoes,
      percentage: porcentagem,
      level: resultadoNivel.nivel,
      recommended_course: resultadoNivel.curso,
      consent: true
    };

    const { data, error } = await database
      .from('candidates')
      .insert(novoCandidato)
      .select()
      .single();

    if (error) {
      console.error('Erro ao salvar candidato:', error.message);

      return res.status(500).json({
        erro: 'Não foi possível registrar o resultado no banco de dados.'
      });
    }

    return res.status(201).json({
      mensagem: 'Nivelamento concluído com sucesso.',
      resultado: {
        candidatoId: data.id,
        nome: data.name,
        acertos,
        totalQuestoes,
        porcentagem,
        nivel: resultadoNivel.nivel,
        descricao: resultadoNivel.descricao,
        cursoRecomendado: resultadoNivel.curso
      }
    });
  } catch (erro) {
    console.error('Erro no nivelamento:', erro);

    return res.status(500).json({
      erro: 'Ocorreu um erro inesperado ao processar o nivelamento.'
    });
  }
}

module.exports = {
  fazerNivelamento
};