const Message = require('../model/messageModel');

module.exports.addMessage = (req, res, next) => {
  const { from, to, message } = req.body;
  
  return Message.create({
    message: { text: message },
    users: [from, to],
    sender: from
  })
  .then(data => {
    if (data)
      return res.json({ msg: 'Mensagem adicionada com sucesso' });
    return res.json({ msg: 'Falha ao adicionar mensagem' });
  })
  .catch(err => next(err));
};

module.exports.getAllMessages = (req, res, next) => {
  const {from, to} = req.body;

  return Message.find({ users: { $all: [from, to] } }).sort()
  .then(messages => {
    const projectMessages = messages.map(msg => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text
      }
    });
    return res.json(projectMessages);
  })
  .catch(err => next(err));
};
