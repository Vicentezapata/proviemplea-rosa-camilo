/* eslint-disable no-unused-vars */
const Service = require('./Service');

/**
* Verifica el estado de la API
*
* returns MensajeRespuesta
* */
const getHealth = () => new Promise(
  async (resolve, reject) => {
    try {
      resolve(Service.successResponse({
      }));
    } catch (e) {
      reject(Service.rejectResponse(
        e.message || 'Invalid input',
        e.status || 405,
      ));
    }
  },
);

module.exports = {
  getHealth,
};
