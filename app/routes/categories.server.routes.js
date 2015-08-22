'use strict';

module.exports = function(app) {
    var categoryController = require('../../app/controllers/categories.server.controller');

	// Routing logic
	// ...
    app.route('/categories')
        .get(categoryController.list)
        .post(categoryController.create);

    app.route('/categories/:categoryId')
        //.all(categoryController.categoryById)
        .get(categoryController.read)
        .put(categoryController.update)
        .delete(categoryController.delete);

    app.param('categoryId', categoryController.categoryById);
};
