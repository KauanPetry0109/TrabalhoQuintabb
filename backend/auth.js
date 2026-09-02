const database = require('./config/database');

async function auth(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        erro: 'Acesso não autorizado.'
      });
    }

    const token = authorization.substring(7);

    const {
      data: { user },
      error
    } = await database.auth.getUser(token);

    if (error || !user) {
      return res.status(401).json({
        erro: 'Sessão inválida ou expirada.'
      });
    }

    req.user = user;

    next();
  } catch (erro) {
    console.error('Erro de autenticação:', erro);

    return res.status(401).json({
      erro: 'Não foi possível validar a autenticação.'
    });
  }
}

module.exports = auth;