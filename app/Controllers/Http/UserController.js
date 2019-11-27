'use strict'

const User = use('App/Models/User');

class UserController {

  async create({
    request,
    response
  }) {
    try {
      const {
        email,
        password,
        name
      } = request.all();

      if (email === undefined || password === undefined || name === undefined) {
        return response
          .status(400)
          .send({
            message: {
              error: 'nome, email e/ou senha são campos obrigatórios!'
            }
          })
      }

      const userExists = await User.findBy('email', email);

      // if user exists don't save
      if (userExists) {
        return response
          .status(400)
          .send({
            message: {
              error: 'Usuário já cadastrado'
            }
          })
      }

      const user = await User.create({
        email,
        password,
        username: email,
        name,
      });

      return user;
    } catch (err) {
      return response
        .status(err.status)
        .send(err);
    }
  }
}

module.exports = UserController
