

let isMenuVisiable = false;
function showAndHideMenu(){
    let menuDiv = document.querySelector("#menuDiv")

    if(!isMenuVisiable){

        menuDiv.style.bottom = "0"
        menuDiv.style.left = "0"
        menuDiv.style.rotate = "0deg"
        menuDiv.style.zIndex = "999"
        
        
    }else{
        
        menuDiv.style.left = "-100%"
        menuDiv.style.bottom = "100%"
        menuDiv.style.rotate = "90deg"
        menuDiv.style.zIndex = "-999"

    }

    isMenuVisiable = !isMenuVisiable
}




// // // Dark mode logic ---->
let isBalck = false;
function changeMode(mode = isBalck) {

    if (!mode) {
        // // // Dark Mode ---->

        document.querySelector("html").style.backgroundColor = "#252222"
        document.querySelector("body").style.backgroundColor = "#252222"
        document.querySelector("#mode").innerHTML = "Light"
        document.querySelector("#mode").style.backgroundColor = "white"
        document.querySelector("#mode").style.color = "black"
        document.querySelector("#calculator").style.borderColor = "yellowgreen"
        document.querySelector("#calculator").style.backgroundColor = "#FFB000"

        document.querySelector(":root").style.setProperty("--theme", "#141102")
        document.querySelector(":root").style.setProperty("--text", "#FFF")
        
        localStorage.setItem("darkMode", JSON.stringify(true))
    } else {
        // // // Light Mode ---->
        
        document.querySelector("html").style.backgroundColor = "#ccc"
        document.querySelector("body").style.backgroundColor = "#ccc"
        document.querySelector("#mode").innerHTML = "Dark"
        document.querySelector("#mode").style.backgroundColor = "black"
        document.querySelector("#mode").style.color = "white"
        document.querySelector("#calculator").style.borderColor = "darkmagenta"
        document.querySelector("#calculator").style.backgroundColor = "#00ffbf"
        
        document.querySelector(":root").style.setProperty("--theme", "#D2E9E9")
        document.querySelector(":root").style.setProperty("--text", "#000")

        localStorage.removeItem("darkMode")
    }

    isBalck = !isBalck   // // // Toggle value of isBack for dark btn.
}

let darkModeValue = localStorage.getItem("darkMode")
if (darkModeValue) {
    // console.log(darkModeValue)
    // isBalck = 
    changeMode(false)
}





// // // Calculator logic and code here ---->

class React {

    constructor(history = [{ symbol: "sy", firstNum: "0", secondNum: "0", curShow: "0000", result: "0" }]) {

        this.isSymboleClicked = false,
            this.historyData = history,
            this.state = history[history.length - 1]
    }


    check() {
        // // // Just checking here html works with class based programming or not ?
        alert("Checking Done")
    }


    updateUI(obj = this.state) {
        // let preExpressions = document.getElementById("previous_out")
        // // Expressions depends upon the symbol cliced btn -->
        document.getElementById("previous_out").innerHTML = `${obj.firstNum} ${this.isSymboleClicked ? obj.symbol : "sy"} ${obj.secondNum} = ${obj.result}`

        // // // Show the current things -->
        document.getElementById("current_out").innerHTML = `${obj.curShow}`

        // // // Scroll curentShow div to left --->
        let currentShowDiv = document.getElementById("current_out")
        currentShowDiv.scrollLeft = currentShowDiv.scrollWidth
    }

    updateTotalCalculations() {

        let total_cal = localStorage.getItem("total_calculation")

        // console.log(total_cal)

        if (total_cal) {
            total_cal = JSON.parse(total_cal)
            document.getElementById("total_cal").innerHTML = `Total Calculatios are : <span>${total_cal}</span>`
        }
    }

    updateSymbol(sym) {
        this.state.symbol = sym

        this.isSymboleClicked = true

        // console.log(this.state)
        this.updateUI()
    }

    isNumber(n) {
        // // // isFinite will check number is infinity or not.
        // // This function return true if number is valid and false if number is invalid.
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    updateFirstNum(firstTime = false, num = 0) {

        // console.log(firstTime , num)

        let outAfterAdd;
        if (firstTime) {

            // // // if first time point Clicked
            if (num === ".") {
                outAfterAdd = `0${num}`
            } else {
                outAfterAdd = `${num}`
            }
        } else {
            outAfterAdd = `${this.state.firstNum}${num}`
        }

        // outAfterAdd = Number(outAfterAdd)

        if (!this.isNumber(outAfterAdd)) return console.log("Not a valid number");

        this.state.firstNum = outAfterAdd
        this.state.curShow = `${this.state.firstNum}`

        // console.log(this.state, this.isSymboleClicked)
        this.updateUI()
    }

    updateSecondNum(firstTime = false, num = 0) {

        let outAfterAdd;

        if (firstTime) {

            // // // if first time point Clicked
            if (num === ".") {
                outAfterAdd = `0${num}`
            } else {
                outAfterAdd = `${num}`
            }
        } else {
            outAfterAdd = `${this.state.secondNum}${num}`
        }

        if (!this.isNumber(outAfterAdd)) return console.log("Not a valid number");

        this.state.secondNum = outAfterAdd
        this.state.curShow = `${this.state.secondNum}`

        // console.log(this.state, this.isSymboleClicked)
        this.updateUI()
    }

    allClear() {


        // // if any previous data is present then only ask with user or not --->

        let checkHistoryIsPresent = localStorage.getItem("calculatorByAk")
        if (checkHistoryIsPresent) {

            // // // ask to user delete or not ----------->
            let ask = confirm("Do you want to remove history of calculations ??")
            // alert(ask)
            if (!ask) return console.log("User don't want to remove history.")
        }


        // // // This fn will clear all data --->
        this.state = {
            symbol: "+",
            firstNum: "0",
            secondNum: "0",
            curShow: "0000",
            result: "0"
        }

        this.isSymboleClicked = false
        this.updateUI()

        // // // Delete localhost data
        localStorage.removeItem("calculatorByAk")

        // // // Back btn hide -->
        document.getElementById("back_btn").style.display = "none"

        // alert("All Data Removed ☑️")  // // // Not using now
    }

    singleClear() {

        // // // By using .toString() fn i can create string then slice the value. (But not using this now.)
        // this.state.curShow = this.state.curShow.toString().slice(0, this.state.curShow.toString().length - 1)

        // // // Means set the curShow by reducing one digit in secondNum. 
        this.state.curShow = this.state.secondNum.slice(0, this.state.secondNum.length - 1)

        if (!this.isSymboleClicked) {
            this.state.firstNum = this.state.firstNum.slice(0, this.state.firstNum.length - 1)
        } else {
            this.state.secondNum = this.state.secondNum.slice(0, this.state.secondNum.length - 1)
        }
        this.updateUI()
    }

    setState(key = "symbol", value = 0) {
        if (key === "symbol") {
            this.updateSymbol(value)
        }

        else if (key === "anyNum") {
            // console.log(this.isSymboleClicked)

            if (!this.isSymboleClicked) {
                if (this.state.firstNum === "0") {
                    this.updateFirstNum(true, value)
                } else if (this.state.firstNum !== "0") {
                    this.updateFirstNum(false, value)
                }
            } else {
                if (this.state.secondNum === "0") {
                    this.updateSecondNum(true, value)
                } else if (this.state.secondNum !== "0") {
                    this.updateSecondNum(false, value)
                }
            }
        }
    }

    calculateThis(sym = "+", firstNum = 0, secondNum = 0) {

        let result

        // // // // if condition as warning if value is 0 (any one) --->
        // // console.log(firstNum , secondNum)

        // if( parseFloat(firstNum) === 0 || parseFloat(secondNum) === 0 ){
        //     alert("[400] : Don't calculate anything with 0 , this calculation may give you 0 all time or same result.")
        // }

        switch (sym) {
            case "+":
                // console.log(firstNum , cSym , cN2)
                // console.log("+")
                result = parseFloat(firstNum) + parseFloat(secondNum)
                break
            case "-":
                // console.log("-")
                result = parseFloat(firstNum) - parseFloat(secondNum)
                break

            case "*":
                result = parseFloat(firstNum) * parseFloat(secondNum)
                break

            case "/":
                result = parseFloat(firstNum) / parseFloat(secondNum)
                break

            case "%":
                // // // not using mod now ---->
                // result = parseFloat(firstNum) % parseFloat(secondNum)
                // if (isNaN(result)) alert("If we Mod a number with 0 then we get NaN in JS , By default. Wrong Input. Clear Calculations plz.")

                // // // Code for percent hete --->
                result = ( parseFloat(firstNum) * parseFloat(secondNum)) / 100
                break
            case "**":
                result = parseFloat(firstNum) ** parseFloat(secondNum)
                break
            default:
                result = parseFloat(firstNum) + parseFloat(secondNum)
                break
        }

        // // // Some logic (I. if result is not have some value in point then leave as it is , II. if have some value as point then show only two characters after point.)--->
        let isDecimal = result % 1
        if (isDecimal > 0) {
            result = parseFloat(result).toFixed(2)
        }

        return result

    }

    setResult() {
        let { symbol, firstNum, secondNum, result, curShow } = this.state

        if (!this.isSymboleClicked) {
            return alert("[400] : All 3 things should given (first num , symbol , second num) for valid calculation.")
        } else {
            let obj = this.state
            this.historyData.push({ ...obj })
            // console.log(this.historyData)

            // // // // Store history in localhost of browser -->
            localStorage.setItem("calculatorByAk", JSON.stringify(this.historyData))
        }

        // // // // Now set history ---->
        // if (this.isSymboleClicked) {

        //     let obj = this.state
        //     this.historyData.push({ ...obj })
        //     // console.log(this.historyData)

        //     // // // // Store history in localhost of browser -->
        //     localStorage.setItem("calculatorByAk", JSON.stringify(this.historyData))
        // }


        // // // if condition as warning if value is 0 (any one) (This if condition only when user click equal to not in back calculation now.) --->
        // console.log(firstNum , secondNum)
        if( parseFloat(firstNum) === 0 || parseFloat(secondNum) === 0 ){
            alert("[400] : Don't calculate anything with 0 , this calculation may give you 0 all time or same result.")
        }


        result = this.calculateThis(symbol, firstNum, secondNum)


        // // // If calculation done then set some values for next calculation --->
        this.state.result = result
        this.state.curShow = result
        this.state.firstNum = result
        this.state.secondNum = "0"



        // console.log(this.state)
        this.updateUI()

        // // // Make btn visiable
        document.getElementById("back_btn").style.display = "block"


        // // // set total calclation --->
        let getTotalCal = localStorage.getItem("total_calculation")

        if (getTotalCal) {
            getTotalCal = JSON.parse(getTotalCal)
            getTotalCal++
            localStorage.setItem("total_calculation", JSON.stringify(getTotalCal))
        } else {
            localStorage.setItem("total_calculation", JSON.stringify(1))
        }

        this.updateTotalCalculations()

    }

    clickBack() {

        let history = this.historyData

        // console.log(history)

        // let sendHistoryObj = { result: history[history.length - 1].result }

        let lastHistoryObj = history[history.length - 1]

        if (history.length > 1) {

            // // // If history array left only one data (Hide btn , user not able to see back from last calculation)
            if (history.length <= 2) {
                document.getElementById("back_btn").style.display = "none"
            }

            // this.state = history[history.length - 1]     // // // Update the state with history of last.

            let calculateCurrent = this.calculateThis(lastHistoryObj.symbol , lastHistoryObj.firstNum , lastHistoryObj.secondNum) 

            let sendHistoryObj = {
                // // // Two thing from last history -->
                result: calculateCurrent , 
                curShow: calculateCurrent,    // // // .result becoz i want to show result big not second number.

                // // // Next 3 things from second last history -->
                firstNum: lastHistoryObj.firstNum,
                secondNum: lastHistoryObj.secondNum,
                symbol: lastHistoryObj.symbol,
            }


            this.state = sendHistoryObj

            // console.log(this.state)


            // sendHistoryObj.firstNum = history[history.length - 2].firstNum
            // sendHistoryObj.secondNum = history[history.length - 2].secondNum
            // // sendHistoryObj.curShow = history[history.length - 2].curShow
            // sendHistoryObj.curShow = history[history.length - 1].result
            // sendHistoryObj.symbol = history[history.length - 2].symbol

            this.historyData.length--       // // // Reduce this size of history.(Remove last data ---> u can do pop() also.)

            this.updateUI(sendHistoryObj)
        } else {

            alert("Calculate something or You are on last calculation.")
        }

        // console.log(this.historyData)
        // console.log(this.state)
        // console.log("Back")


        // console.log(sendHistoryObj)

        // this.updateUI(sendHistoryObj)

    }

}



let getHistoryFromLoaclHost = localStorage.getItem("calculatorByAk")
// console.log(JSON.parse(getHistoryFromLoaclHost))

let setHistoy;
if (getHistoryFromLoaclHost) {
    setHistoy = JSON.parse(getHistoryFromLoaclHost)
    // console.log(JSON.parse(getHistoryFromLoaclHost))
} else {
    document.getElementById("back_btn").style.display = "none"
}


// // // Calling main Class ---->
let react = new React(setHistoy)

// // // If getting data in localhost then set some improant variable values like symbole true etc. ---->
if (getHistoryFromLoaclHost) {
    react.isSymboleClicked = true
    react.updateSymbol(setHistoy[setHistoy.length - 1].symbol)

    react.clickBack()
} else {
    react.updateUI()   // // // Upadte ui if getting data --->
}

react.updateTotalCalculations()  // // // Update calculations




// combine two keys logic --->

let enteredKeyAre = []


// // // All Key Event and corresponding result happend
window.addEventListener("keydown", (e) => {

    // console.log(e)
    // if(e.key === "7"){
    //     react.setState("anyNum" , 7)
    // }

    // // // MainTain a array of all keyDown --> 
    enteredKeyAre.push(e.key)



    // // // // Clean the arr if it have more then 4 items (first 2 items cleaned everytimes ) --->
    // if(enteredKeyAre.length > 4){
    //     // console.log(enteredKeyAre.length-3)
    //     // console.log(enteredKeyAre.length-1)
    //     enteredKeyAre = enteredKeyAre.slice( enteredKeyAre.length-3 , enteredKeyAre.length-1 )
    // }
    

    // let secondLast = enteredKeyAre[enteredKeyAre.length-2]
    // if(secondLast === "Control"  && firstLast === "Backspace"){
    //     react.clickBack()
    //     return
    // }
        
        
    // // // Improve above logic (Now if user press hold control key and then when ever press backspace key it will call clickBack() fn , currently not checking with last two keys) ------->
    
    // // // Best way to back by two combination of keys -->

    let firstLast = enteredKeyAre[enteredKeyAre.length-1]

    // // // Clear history ------->
    // if( enteredKeyAre.includes("Control") &&( firstLast === "Delete" || firstLast === "C" )){
    //     react.allClear()
    //     return
    // }

    if(firstLast === "Delete" ){
        react.allClear()
        return
    }

    // // // Go to back calculation 

    if( enteredKeyAre.includes("Control") && ( firstLast === "z" || firstLast === "Z" ) ){
        react.clickBack()
        return
    }


    


    switch (e.key) {
        case "7":
            react.setState("anyNum", 7)
            break
        case "8":
            react.setState("anyNum", 8)
            break
        case "9":
            react.setState("anyNum", 9)
            break
        case "4":
            react.setState("anyNum", 4)
            break
        case "5":
            react.setState("anyNum", 5)
            break
        case "6":
            react.setState("anyNum", 6)
            break
        case "1":
            react.setState("anyNum", 1)
            break
        case "2":
            react.setState("anyNum", 2)
            break
        case "3":
            react.setState("anyNum", 3)
            break
        case "0":
            react.setState("anyNum", 0)
            break
        case ".":
            react.setState("anyNum", ".")
            break
        case "+":
            react.setState("symbol", "+")
            break
        case "-":
            react.setState("symbol", "-")
            break
        case "*":
            react.setState("symbol", "*")
            break
        case "/":
            react.setState("symbol", "/")
            break
        case "%":
            react.setState("symbol", "%")
            break
        case "Enter":
            react.setResult()
            break
        case "Backspace":
            react.singleClear()
            break
        default:
            return
    }


})






// // Service Worker (Checking and registation ) ------->


if("serviceWorker" in navigator){
    // console.log(navigator)

    navigator.serviceWorker.register("./sw.js").then( (res)=>{
        // console.log(res)  // // Here see all data of sericeWorker.
        console.log("Service worked get registred")
    } ).catch( (e)=>{
        console.error(e)
    })
    
}else{
    console.error("ServiceWorker in not supported in your browser.")
}








