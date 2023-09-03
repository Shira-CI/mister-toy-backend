// let labels = require('../data/label.json') // make collection?

const labels = [
    "On wheels",
    "Box game",
    "Art",
    "Baby",
    "Doll",
    "Puzzle",
    "Outdoor",
    "Battery Powered"
]

function query() {
    return Promise.resolve(labels)
}

module.exports = {
    query
}