const db = require('../models')
const Game = db.game;

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Campos obrigatórios não podem ser vazios!" });
        return;
    }

    // Create a Game instance
    const game = new Game({
        type: req.body.type,
        title: req.body.title,
        summary: req.body.summary,
        developer: req.body.developer,
        genre: req.body.genre
    });

    // Save Game in the database
    game
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu ao salvar o jogo."
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Game
        .findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({
                    message: "Não foi encontrado um jogo com o ID " + id
                });
            else 
                res.send(data);
        })
        .catch(() => {
            res.status(500).send({
                message: "Erro ao buscar um jogo com o ID " + id
            });
        });
};

exports.findAll = (req, res) => {
    const type = req.query.type;
    let condition = type ? { type: type } : {};

    Game
        .find(condition)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu ao buscar os jogos."
            });
        });
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Body da requisição não pode ser vazio."
        });
        return;
    }

    const id = req.params.id;
    
    Game
        .findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível encontrar um jogo com o ID ${id}. Talvez o jogo não exista!`
                });
            } else {
                res.send({
                    message: "Jogo atualizado com sucesso."
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Algum erro aconteceu ao tentar o jogo com o ID " + id
            });
        });
};

exports.delete = async (req, res) => {
    const id = req.params.id;

    Game
        .findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Não foi possível excluir o jogo de ID ${id}. Talvez o jogo não exista!`
                });
            } else {
                res.send({
                    message: "Jogo deletado com sucesso!"
                });
            }
        })
        .catch(() => {
            res.status(500).send({
                message: "Erro ao excluir o jogo com o ID" + id
            });
        });
};