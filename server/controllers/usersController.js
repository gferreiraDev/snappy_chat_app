const User = require('../model/userModel');
const bcrypt = require('bcrypt');

module.exports.register = (req, res, next) => {
  const { username, email, password } = req.body;

  return User.findOne({ username })
  .then(usernameCheck => {
    if (usernameCheck)
      return res.json({ msg: 'Usuário já cadastrado', status: false });

    return User.findOne({ email })
    .then(emailCheck => {
      if (emailCheck)
        return res.json({ msg: 'E-mail já cadastrado', status: false });
      
      return bcrypt.hash(password, 10)
      .then(hash => {
        return User.create({
          username, email, password: hash
        })
      })
      .then(user => {
        user.password = undefined;
        return res.json({ user, status: true });
      })
    })
    .catch(err => next(err))
  })
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  
  return User.findOne({ email })
  .then(user => {
    if (!user)
    return res.json({ msg: 'Usuário ou senha inválidos', status: false });
    
    return bcrypt.compare(password, user.password)
    .then(passwordCheck => {
      if (!passwordCheck)
        return res.json({ msg: 'Usuário ou senha inválidos', status: false });
      
      user.password = undefined;
      return res.json({ user, status: true });
    })
  })
  .catch(err => next(err));
};

module.exports.setAvatar = async (req, res, next) => {
  const { id } = req.params;
  const avatarImage = req.body.image;

  return User.findByIdAndUpdate(id, {
    isAvatarImageSet: true,
    avatarImage: avatarImage
  }, { new: true })
  .then(userData => {
    if (!userData)
      return res.json({ msg: 'Erro ao tentar salvar avatar', isSet: false });
    return res.json({ 
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage
    });
  })
  .catch(err => next(err));
};

module.exports.getAllUsers = (req, res, next) => {
  const { id } = req.params;
  
  return User.find({ _id: { $ne: id } }).select('username email avatarImage _id')
  .then(users => {
    return res.json(users);
  })
  .catch(err => next(err));
};