export const getChargeWeight = (length, width, height, weight) => {
    let rawChargeWeight = ((height*width)*length)/5000 > weight ? ((height*width)*length)/5000 : weight
    console.log(rawChargeWeight)
    if (rawChargeWeight >= 21) {
        return Math.ceil(rawChargeWeight)
    } else {
        // let belowNumber = Math.floor(rawChargeWeight)
        let different = rawChargeWeight - Math.floor(rawChargeWeight)
        console.log(different)
        return different == 0 ? rawChargeWeight : (different <= 0.5 ? Math.floor(rawChargeWeight)+0.5 : Math.floor(rawChargeWeight) + 1)
    }
}