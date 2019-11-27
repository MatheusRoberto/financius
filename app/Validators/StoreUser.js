'use strict'

class StoreUser {
  get rules() {
    return {
      get rules() {
        return {
          email: 'required|email|unique:users',
          password: 'required'
        }
      }
    }
  }

  get messages() {
    return {
      'email.required': 'Email é um campo obrigátorio.',
      'email.email': 'Digite um email válido.',
      'email.unique': 'Este email já está registrado.',
      'password.required': 'Senha é um campo obrigátorio'
    }
  }
}

module.exports = StoreUser
