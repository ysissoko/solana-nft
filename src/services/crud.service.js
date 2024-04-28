module.exports = (Collection) => {
    const create = (newEntry) => Collection.create(newEntry) 
    const read = (id) => Collection.findById(id)
    const readAll = (query) => Collection.find(query)
    const update = (id, updateEntry) => Collection.update({ _id: id }, { $set: updateEntry });
    const remove = (id) => Collection.deleteOne({ _id: id });

    return { readAll, read, create, update, remove }
};
