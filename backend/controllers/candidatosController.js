const database = require('../config/database');

const statusPermitidos = [
  'novo',
  'contatado',
  'matriculado',
  'arquivado'
];

async function listarCandidatos(req, res) {
  try {
    const { data, error } = await database
      .from('candidates')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Erro ao buscar candidatos:', error.message);

      return res.status(500).json({
        erro: 'Não foi possível carregar os candidatos.'
      });
    }

    return res.json(data);
  } catch (erro) {
    console.error('Erro ao listar candidatos:', erro);

    return res.status(500).json({
      erro: 'Erro inesperado ao carregar os candidatos.'
    });
  }
}

async function alterarStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        erro: 'Status inválido.'
      });
    }

    const { data, error } = await database
      .from('candidates')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Erro ao alterar status:', error.message);

      return res.status(500).json({
        erro: 'Não foi possível alterar o status do candidato.'
      });
    }

    if (!data) {
      return res.status(404).json({
        erro: 'Candidato não encontrado.'
      });
    }

    return res.json({
      mensagem: 'Status atualizado com sucesso.',
      candidato: data
    });
  } catch (erro) {
    console.error('Erro ao alterar status:', erro);

    return res.status(500).json({
      erro: 'Erro inesperado ao alterar o status.'
    });
  }
}

module.exports = {
  listarCandidatos,
  alterarStatus
};