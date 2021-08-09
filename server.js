require('./connections/connection.mongo')();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const HouseController = require('../naphimis/Controller/house.controller');


const server = express();
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

var fs = require('fs');
const upload = multer({ dest: 'uploads/' })


server.post('/house', upload.array('image', 4), async (req, res, next) => {
    try {
        const files = req.files;
        if (files.length == 0) {
            const fileErr = 'Please Upload a file';
            console.log(fileErr);
            res.status(500).json({ status: 'failed', payload: null, message: fileErr });
        } else {
            files.forEach(file => {
                console.log("Received file " + file.originalname);
                var src = fs.createReadStream(file.path);
                var dest = fs.createWriteStream('uploads/' + file.originalname);
                src.pipe(dest);
                src.on('end', function () {
                    fs.unlinkSync(file.path);
                });
                src.on('error', function (err) { res.json('Something went wrong!', err); });
            });

            const addHouse = await HouseController.addHouse(req.body);
            console.log(addHouse);
            res.status(200).json({ status: 'success', addHouse, message: 'House captured successfully!' });

        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: 'failed', payload: null, message: err });
    }

});



server.listen(3000, () => {
    console.log('Server listening on port 3000');
});


