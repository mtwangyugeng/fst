export function isSpecie(imp){
    const temp = isNumeric(imp, 'Specie')
    if (!temp.isInteger() || temp < 0)
        throw 'Specie must be a non-negative integer'
}

export function isSize(imp){
    const temp = isNumeric(imp, 'Size')
    if (temp <= 0)
        throw 'Size must be a positive value'
}

export function isLat(imp){
    const temp = isNumeric(imp, 'Lat')
    if (temp<-90 || temp>90)
        throw 'Latitude should be in range of [-90,90]'
}

export function isLng(imp){
    const temp = isNumeric(imp, 'Lng')
    if (temp<-180 || temp>180)
        throw 'longitude should be in range of [-180,180]'
}

export function isNumeric(str, t) {
    if (typeof str != "string") throw t + ': This function only process strings.'  
    if (!isNaN(str)){
        const temp = parseFloat(str)
        if(!isNaN(temp))
            return temp
        else
            throw t + ': User input is just white spaces.'
    }
    throw t + ': User input is not a number.'
  }