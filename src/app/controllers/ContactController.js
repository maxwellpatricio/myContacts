const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  async index(request, response) {
    // lista todos os registros
    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  async show(request, response) {
    // obter um unico registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not Found!' })
    }

    response.json(contact);
  }

  store() {
    // criar um novo registro
  }

  update() {
    // editar um registro
  }

  async delete(request, response) {
    // excluir um registro
    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not Found!' })
    }

    await ContactRepository.delete(id);
    response.sendStatus(204);
  }
}

module.exports = new ContactController();
