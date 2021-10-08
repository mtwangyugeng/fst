export function isSpecie(imp){
    const temp = isNumeric(imp, 'Specie')
    if (!Number.isInteger(temp) || temp < 0)
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
            throw t + ': No input is or the input is just white spaces.'
    }
    throw t + ': User input is not a number.'
  }

export function isInt(str, t) {
    const temp = isNumeric(str, t)
    if(!Number.isInteger(temp))
        throw t + ': the input is not a integer.'
    else
        return temp
}

const dm = [1,3,5,7,8,10,12]
export function isHours(imp) { 
    const temp = isInt(imp, 'Hour(hh)')
    if (temp < 0 || temp > 23)
        throw 'Hour must be between 0 to 23'
}
export function isMonthDayYear(imp_mm, imp_dd, imp_yy) { 
    const temp_mm = isInt(imp_mm, 'Month(mm)')
    
    const temp_dd = isInt(imp_dd, 'Day(dd)')
    const temp_yy = isInt(imp_yy, 'year(yy)')
    if (temp_mm < 1 || temp_mm > 12)
        throw 'Month must be between 1 to 12'

    var ld = 30
    if(temp_dd === 2){
        if(temp_yy%4 === 0)
            ld = 29
        else
            ld = 28
    } else if(dm.includes(temp_dd)){
        ld = 31
    }
    if (temp_dd < 1 || temp_dd > ld)
        throw `Month not in range[1, ${ld}]`
}