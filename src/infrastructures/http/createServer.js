const Hapi = require('@hapi/hapi');
const DomainErrorTranslator = require('../../commons/exceptions/DomainErrorTranslator');
const ClientError = require('../../commons/exceptions/ClientError');
const users = require('../../interfaces/http/api/users');

const createServer = async (container) => {
  const server = Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
  });

  await server.register([
    {
      plugin: users,
      options: { container },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    // mendapatkan kontek response dari request
    const { response } = request;

    if (response instanceof Error) {
      // bila response terjadi error, tangani seauai kebutuhan
      const translatedError = DomainErrorTranslator.translate(response);

      // penanganan client secara internal
      if (translatedError instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: translatedError.message,
        });

        newResponse.code(translatedError.statusCode);
        return newResponse;
      }

      if (!translatedError.isServer) {
        return h.continue;
      }

      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami',
      });
      newResponse.code(500);
      return newResponse;
    }

    // jika bukan error, lanjutkan dengan response sebelumnya (tanpa interverensi)
    return h.continue;
  });

  return server;
};

module.exports = createServer;
