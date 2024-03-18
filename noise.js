const uniqueNumsInRange = require('./uniqueNumsInRange.js')
const MINIMUM_OVERLAP = 3

//define a noise level may be tricky, so assume it's just the sum.
const getNoiseLevel = (row) => row.reduce((a, b) => a + b)

const selectTwoNoisyRows = (img) => {
    const uniqueIndices = uniqueNumsInRange(3, 0, MINIMUM_OVERLAP)
    const noisy = uniqueIndices.map(index => ({ noise: getNoiseLevel(img[index]), index }))
    // Take the noisiest two rows ordered by their index
    noisy.sort((a, b) => b.noise - a.noise).splice(2)
    noisy.sort((a, b) => a.index - b.index)

    return [
        {
            data: img[noisy[0].index],
            index: noisy[0].index
        },
        {
            data: img[noisy[1].index],
            index: noisy[1].index
        }
    ]
}


module.exports = {
    getNoiseLevel,
    selectTwoNoisyRows,
};