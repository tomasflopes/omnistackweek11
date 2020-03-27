const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
  async index(request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  async store(request, response) {
    const { name, email, phone, city } = request.body;

    const id = crypto.randomBytes(4).toString('HEX'); //? Generate random Id

    await connection('ongs').insert({
      id,
      name,
      email,
      phone,
      city
    });

    return response.json({ id });
  },
}
