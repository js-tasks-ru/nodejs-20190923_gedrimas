const LocalStrategy = require('passport-local').Strategy;
const User = require('../../models/User');

module.exports = new LocalStrategy(
    {session: false,  usernameField: 'email'}, 
    async function(email, password, done) {

      const user = await User.findOne({email})
      if(!user) return done(null, false, 'Нет такого пользователя')

      const isValidPassword = await user.checkPassword(password)
      if(!isValidPassword) return done(null, false, 'Неверный пароль')

      if(user || isValidPassword) return done(null, user)

      //done(null, false, 'Стратегия подключена, но еще не настроена');
    }
);
