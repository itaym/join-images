const { compareTwoArrays:isRowsTheSame } = require('./compareTwoArrays.js')

const createCandidates = (img1, img2, noisyRows) => {

    const candidates = []

    const indicesGap = noisyRows[1].index - noisyRows[0].index
    const startFrom = img1.length - indicesGap

    for (let index = startFrom; index >= 0; index--) {
        if (isRowsTheSame(img1[index], noisyRows[0].data)) {
            if (isRowsTheSame(img1[index + indicesGap], noisyRows[1].data)) {
                candidates.push(index- noisyRows[0].index)
            }
        }
    }
    return candidates
}

const checkCandidate = (candidate, img1, img2) => {

    for (let index = candidate; index < img1.length; index++) {
        if (!isRowsTheSame(img1[index], img2[index - candidate])) {
            return false
        }
    }
    return true
}


module.exports = {
    checkCandidate,
    createCandidates,
};