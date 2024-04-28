
function upload(req, res) {
    const { file } = req;
    res.send({ file });
}

module.exports = { upload }
