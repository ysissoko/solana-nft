const asyncHandler = require('express-async-handler')
const express = require('express');

const createCrudRouter = (modelName) => {
    const router = express.Router();

    const model = require(`src/models/${modelName}.model`);
    const ctrl = require("src/controllers/crud.controller")(require("src/services/crud.service")(model));

    router.post('/', asyncHandler(ctrl.create));
    router.get('/', asyncHandler(ctrl.readAll));
    router.get('/:id', asyncHandler(ctrl.read));
    router.put('/:id', asyncHandler(ctrl.update));
    router.delete('/:id', asyncHandler(ctrl.remove));

    return router;
}

module.exports = (modelName) => createCrudRouter(modelName)
