

export const formatData = (data) => {
    let finalData = {
        labels: [],
        dataset: [{
            label: [],
            data: [],
            backgroundColor:'rgb(255,99,12,0.8)',
            borderColor: "rgb(255,99,132,0.2)",
            fill:false
        }]
    }
    let dates = data.map(val => {
        const ts = val[0]
        let date = new Date(ts * 1000)
        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()
        let final = `${month}-${day}-${year}`
        return final
    })
    let priceArray = data.map(val => { return val[4] })
    priceArray.reverse()
    dates.reverse()
    finalData.dataset[0].data = priceArray
    // finalData.labels = dates
    console.log("formated", finalData)
    return finalData
 }