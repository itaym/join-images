const uniqueNumsInRange = (amount, lowRange, highRange) => {
    if (amount > highRange - lowRange) throw new Error('Have you gone nuts')

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
module.exports = uniqueNumsInRange