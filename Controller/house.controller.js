const CourseModel = require('../Model/house.model');

class HouseController {
    constructor() { }

    addHouse(obj) {
        return new Promise((resolve, reject) => {
            let newCourse = new CourseModel(obj);
            newCourse.save((err, savedHouse) => {
                if (err) {
                    reject(err);
                }
                resolve(savedHouse);
            });
        });
    }

    getAllHouse() {
        return new Promise((resolve, reject) => {
            CourseModel.find((err, allHouse) => {
                if (err) {
                    reject(err)
                }
                resolve(allHouse);
            });
        });
    }

    getOneHouse(id) {
        return new Promise((resolve, reject) => {
            CourseModel.findById(id, (err, singleHouse) => {
                if (err) {
                    reject(err)
                }
                resolve(singleHouse);
            });
        });
    }

    
}

module.exports = new HouseController();
