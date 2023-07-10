module.exports = app => {
    const personController = require('../controllers/person.controller')

    app.route('/schedule')
        //.post(personController.create)
        .get(personController.read)

    app.route('/person/:id')
        //.put(personController.update)
        //.delete(personController.delete)
        //.get(personController.readById)
}