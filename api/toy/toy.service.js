const { ObjectId } = require('mongodb')

const utilService = require('../../services/util.service')
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    addToyMsg,
    removeToyMsg,
}

async function query(sortAndFilter) {
    try {
        const criteria = _buildCriteria(sortAndFilter.filterBy)
        const sortBy =  sortAndFilter.sortBy
        const collection = await dbService.getCollection('toy')

        var toys = await collection.find(criteria).sort({ [sortBy.type]: + sortBy.desc}).toArray()
        // console.log('criteria' , criteria)
        return toys
    } catch (err) {
        logger.error('cannot find toys', err)
        throw err
    }
}


function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.title) {
        criteria.title = { $regex: filterBy.title, $options: 'i' }
    }

    if (filterBy.inStock === 'inStock') criteria.inStock = true
    else if (filterBy.inStock === 'notInStock') criteria.inStock = false

    if (filterBy.labels) {
        criteria.labels = filterBy.labels
    }
    if (filterBy.maxPrice){
        criteria.price = { $lte: +filterBy.maxPrice }
    }
    // console.log( 'from _buildCriteria ' , criteria)
    return criteria
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = collection.findOne({ _id: ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ _id: ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toy)
        return toy
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function update(toy) {
    // console.log(toy)
    try {
        const toyToSave = {
            title: toy.title,
            price: toy.price,
            labels: toy.labels,
            inStock: toy.inStock,
            image: toy.image
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ _id: ObjectId(toy._id) }, { $set: toyToSave })
        return toy
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function addToyMsg(toyId, msg) {
    try {
        msg.id = utilService.makeId()
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $push: { msgs: msg } }
        )
        return msg
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}

async function removeToyMsg(toyId, msgId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.updateOne(
            { _id: ObjectId(toyId) },
            { $pull: { msgs: { id: msgId } } }
        )
        return msgId
    } catch (err) {
        logger.error(`cannot add toy msg ${toy._id}`, err)
        throw err
    }
}


