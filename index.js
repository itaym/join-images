/**
 *
 * @typedef {number[]} RowDef
 */

/**
 *
 * @typedef {RowDef[]} ImageDef
 */

/**
 *
 * @typedef NoisyRow
 * @property {RowDef} data
 * @property {number} index
 */

/**
 *
 * @type {ImageDef}
 */
const img1 = []
/**
 *
 * @type {ImageDef}
 */
const img2 = []

/**
 *
 * @param {number} amount
 * @param {number} lowRange
 * @param {number} highRange
 * @return {number[]}
 */
const uniqueNumsInRange = (amount, lowRange, highRange) => {
    if (amount < highRange - lowRange) throw new Error('Have you gone nuts')

    const uniqueNums = []
    const range = highRange - lowRange

    while (uniqueNums.length < amount) {
        let random = lowRange + Math.round(Math.random() * range)
        if (!uniqueNums.includes(random)) {
            uniqueNums.push(random)
        }
    }
    return uniqueNums
}

/**
 * @desc let assume for now that noisy means higher total value
 * @param {RowDef} row
 * @return {number}
 */
const getNoiseLevel = (row) => row.reduce((a, b) => a + b)
/**
 *
 * @param {ImageDef} img
 * @return {NoisyRow[]}
 */
const selectTwoNoisyRows = (img) => {
    const uniqueIndices = uniqueNumsInRange(4, 0, img.length - 1)
    const noisy = uniqueIndices.map(index => ({ noise: getNoiseLevel(img[index]), index }))
    //sort desc
    noisy.sort((a, b) => b.noise - a.noise)
    
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

/**
 *
 * @param {ImageDef} img1
 * @param {ImageDef} img2
 * @param {NoisyRow[]} noisyRows
 * @return {number[]}
 */
const createCandidates = (img1, img2, noisyRows) => {

    const candidates = []

    const buffer = img2.length - noisyRows[1].index
    const indicesGap = noisyRows[1].index - noisyRows[0].index

    for (let index = img1.length - buffer; index >= 0; index--) {
        if (isRowsTheSame(img1[index], noisyRows[0].data)) {
            if (isRowsTheSame(img1[index + indicesGap], noisyRows[1].data)) {
                candidates.push(index- noisyRows[0].index)
            }
        }
    }
    return candidates
}

/**
 *
 * @param {RowDef} row1
 * @param {RowDef} row2
 * @return {boolean}
 */
const isRowsTheSame = (row1, row2) => {
    for (let index = 0; index < row1.length; index++) {
        if (row1[index] !== row2[index]) {
            return false
        }
    }
    return true
}
/**
 *
 * @param {number} candidate
 * @param {ImageDef} img1
 * @param {ImageDef} img2
 * @return {boolean}
 */
const checkCandidate = (candidate, img1, img2) => {
    for (let index = 0; index < img2.length; index++) {
        let candidateIndex = index + candidate
        if (candidateIndex > img1.length) {
            return false
        }
        if (!isRowsTheSame(img1[candidateIndex], img2[index])) {
            return false
        }
    }
    return true
}

const candidates = createCandidates(img1, img2, selectTwoNoisyRows(img2))
let foundAt = img1.length
for (let candidate of candidates) {
    if (checkCandidate(candidate, img1, img2)) {
        foundAt = candidate
        break
    }
}

const img3 = [img1.splice(foundAt), img2].flat()
