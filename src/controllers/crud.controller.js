module.exports = (service) => {
    const create = async (req, res) => res.status(201).send(await service.create(req.body))
    const read = async (req, res) => res.status(200).send(await service.read(req.params.id))
    const readAll = async (req, res) => res.status(200).send(await service.readAll(req.locals?.query || {}))
    const update = async (req, res) =>  res.status(201).send(await service.update(req.params.id, updateEntry))
    const remove = async (req, res) => res.status(204).send(await service.remove(req.params.id))

    return { create, read, readAll, update, remove }
}
