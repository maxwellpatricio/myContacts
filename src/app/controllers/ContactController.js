const ContactRepository = require('../repositories/ContactRepository');

class ContactController {
  // lista todos os registros
  async index(request, response) {

    const contacts = await ContactRepository.findAll();

    response.json(contacts);
  }

  // obter um unico registro
  async show(request, response) {

    const { id } = request.params;

    const contact = await ContactRepository.findById(id);

    if (!contact) {
      return response.status(404).json({ error: 'User not Found!' })
    }

    response.json(contact);
  }

  // criar um novo registro
  async store(request, response) {

    const { name, email, phone, category_id } = request.body;

    if (!name) {
      return response.status(400).json({ error: ' Name is required! ' });
    }

    const contactExist = await ContactRepository.findByEmail(email);

    if (contactExist) {
      return response.status(400).json({ error: ' Email is already being used! ' });
    }

    const contact = await ContactRepository.create({
      name, email, phone, category_id
    })

    response.send(contact);

  }

  // editar um registro
  async update(request, response) {
    const { id } = request.params;
    const { name, email, phone, category_id } = request.body;

    const contactExist = await ContactRepository.findById(id);

    if (!contactExist) {
      return response.status(404).json({ error: 'User not Found!' })
    }

    if (!name) {
      return response.status(400).json({ error: 'Name is required!' });
    }

    const emailExist = await ContactRepository.findByEmail(email);

    if (emailExist && emailExist.id !== id) {
      return response.status(400).json({ error: ' Email is already being used! ' });
    }

    const contact = await ContactRepository.update(id, {
      name, email, phone, category_id
    })

    response.json(contact);
  }

  // excluir um registro
  async delete(request, response) {

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
