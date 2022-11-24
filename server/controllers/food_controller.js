'use strict';

const csv = require('csv-parser');
const { createReadStream } = require('fs');
const { dirname } =  require('path');

const inputFilePath = `${dirname(require.main.filename)}/assets/data/ciqual_2020.csv`
let data = loadData(inputFilePath)

const findData = (req, res) => {
    Promise.resolve(data.filter(item => item.name.indexOf(req.query.input) !== -1))
    .then((data) => {
      res.status(200).json(data)
    })
    .catch((err) => {
      console.error(err)
      res.status(500).json(err)
    })
};


module.exports = {
    findData,
  };


  function loadData (inputFilePath) {
    const result = []
    createReadStream(inputFilePath)
      .pipe(csv())
      .on('data', (data) => result.push(new Food(data.alim_code, data.alim_nom_fr, data.Glucides)))
      .on('end', () => {
        console.log('Parsed ' + result.length + ' lines.')
      })
    return result
  }

class Food {
    constructor (code, name, carbo) {
        this.code = code
        this.name = name
        this.carbo = carbo
    }
}