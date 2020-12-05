const db = require("../models");
const app = require("../app");
const User = db.User;
const Op = db.Sequelize.Op;

/* Routes */

exports.showRegister = (req, res) => {
    res.render('user/register');
};

exports.showLogin = (req, res) => {
    res.render('user/login');
};

exports.showProfile = async (req, res) => {
    const account = req.user;
    res.render('user/profile', { account });
}

exports.showEditProfile = async (req, res) => {
    const account = req.user;
    res.render('user/edit', { account });
}

exports.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated())
        return next();
    res.redirect('/');
}

/* Database */

exports.findAccountById = async (id) => {
    return await User.findOne({ where: 
        { id : id } 
    });
}

exports.findAccountByNick = async (nickname) => {
    return await User.findOne({ where: 
        { nickname : nickname } 
    });
}

exports.createAccount = async (values) => {
    return newUser = await User.create({ 
        name: values.name,
        surname: values.surname,
        nickname: values.nickname,
        password: values.password,
        email: values.email,
        description: values.description
    });
}

exports.existAccount = async (account) => {
    return await User.findOne({
        limit: 1,
        where: { 
            [Op.or]: [
                { nickname: account.nickname },
                { email: account.email }
            ]
        }
    });
};

exports.editProfile = async (req, res) => {
    const account = req.user;
    const newValues = req.body;
    
    if(!newValues.name)
        newValues.name = account.name;

    if(!newValues.surname)
        newValues.surname = account.surname;
    
    if(!newValues.description)
        newValues.description = account.description;

    if(!newValues.avatar)
        newValues.avatar = account.avatar;
    
    await User.update({ 
        name: newValues.name,
        surname: newValues.surname,
        description: newValues.description,
        avatar: newValues.avatar
    },{
        where: {id: account.id}
    });
    
    res.sendStatus(200);
};
