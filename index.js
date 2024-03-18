const  { checkCandidate, createCandidates } = require('./candidates.js')
const  { selectTwoNoisyRows } = require('./noise.js')
const  { image1, image2, resultImage } = require('./mock.js')
const  { compareTwoArrays } = require('./compareTwoArrays.js')

;((img1, img2) => {

    const candidates = createCandidates(img1, img2, selectTwoNoisyRows(img2))

    let foundAt = img1.length

    for (let candidate of candidates) {
        if (checkCandidate(candidate, img1, img2)) {
            foundAt = candidate
            break
        }
    }
    img1.splice(foundAt, Infinity)
    const theResult = [img1, img2].flat()

    console.assert(theResult.length === resultImage.length, 'Result length is wrong')

    for (let x = 0; x < theResult.length; x++) {
        console.assert(compareTwoArrays(theResult[x], resultImage[x]), `Error in RESULT at row ${x}!`)
    }
})(image1, image2)

console.log('DONE!!!')


