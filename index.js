const  { checkCandidate, createCandidates } = require('./candidates.js')
const  { selectTwoNoisyRows } = require('./noise.js')
const  { image1, image2, resultImage } = require('./mock.js')
const  { compareTwoArrays } = require('./compareTwoArrays.js')

const img1 = image1
const img2 = image2

const candidates = createCandidates(img1, img2, selectTwoNoisyRows(img2))

let foundAt = img1.length

for (let candidate of candidates) {
    if (checkCandidate(candidate, img1, img2)) {
        foundAt = candidate
        break
    }
}
img1.splice(foundAt, Infinity )
const theResult = [img1, img2].flat()

try {
    if (theResult.length !== resultImage.length)
        (() => throw new Error('Result length is wrong'))()

    for (let x = 0; x < theResult.length; x++) {
        if (!compareTwoArrays(theResult[x], resultImage[x])) {
            (() => throw new Error(`Error in RESULT at row ${x}!`))()
        }
    }
    console.log('All went fine')
}
catch (e) {
    console.error(e.message)
}

