exports.dbConnection = function () {
    var sqlConfig = {
        user: 'usuário',
        password: 'senhaDeAcesso',
        database: 'bancoDeDados',
        server: 'servidor',
        pool: {
          max: 10,
          min: 0,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: false,
          trustServerCertificate: true 
        }
    };
        return sqlConfig;
};