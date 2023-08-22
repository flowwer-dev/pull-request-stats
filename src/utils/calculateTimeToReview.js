
const median = require('./median')
const average = require('./average')

module.exports = (list, type) => {
    switch(type) {
        case "average":
            return average(list)
        case "median":
        default:
            return median(list)
            break;
    }
}
