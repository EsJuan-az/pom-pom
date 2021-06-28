export const writingEffect = (element, timeInt) => {
    const textVal = element.innerText
    element.innerText = ''
    let counter = 0
    const interval = setInterval(() => {
        if(counter >= textVal.length){
            clearInterval(interval)
        }else{
            element.innerHTML += textVal[counter] == " " ? "&nbsp;" : textVal[counter]
            counter ++
        }
    }, timeInt)
}
