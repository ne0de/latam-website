const db = require("../models");
const Review = db.Review;
const Games = db.Games;
const UserReview = db.UserReview;

exports.showCreate = async (req, res) => {
    const games = await Games.findAll();
    res.render('review/create', { games } );
}

exports.newReview = async (req, res) => {
    const account = req.user;
    const values = req.body;
    if(values.review == 0)
        res.sendStatus(403);
    else{
        console.log(values);
        const { dataValues } = await Review.create({ description: values.review });
        await UserReview.create({
            userId: account.id,
            reviewId: dataValues.id
        })
        //console.log(newReview);
        console.log(dataValues);
        res.sendStatus(200);
    }
}

exports.findAll = async (req, res) => { 
    const reviews = await Review.findAll();
    console.log(reviews);
    if(reviews == 0)
        res.render('review/all', { error: "No hay reseñas registradas" });
    else
        res.send(reviews);
};