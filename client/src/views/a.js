let n = 49237428947 //random number

const sumInt = (n) => { //this is the function we just called
    let str = n.toString() //now we converting a number 49237428947 to a text "49237428947"
    let arr = str.split("") //now we are seperating each text character "4" "9" "2" "3" "7" "4" "2" "8" "9" "4" "7" 
    let sum = 0 //this is sum that is initially 0, will add those above seperated text characters in it later
    arr.forEach(value => { //this is loop, so one by one we will add those seperated text in sum
        sum += parseInt(value) //adding them into sum, parseInt is converting those text character back to number, 
                               // so we can add them mathematically
    })
    if(sum >= 10) { //after adding the result will be 4+9+2+3+7+4+2+8+9+4+7 = 59 and since 59 is not single digit 
                    // it will go to next step
        sumInt(sum) // 59 >= 10 is true so here we calling the same function once again, 
                    // will go to step 3 again and will do all steps again but with 59 not 49237428947 this time, 
                    // the sum will be 5 + 9 - 14, again step 3, now since the sum is 1 + 4 = 5
    } else { //above sum >= 10 will be 5 >= 10 that is not true so else statement will run
        return sum // here we just returning our final answer as result 5
    }
}

const result = sumInt(n) //Here the program starts, we calling the function "sumInt" and passing that random number in it

console.log(result) // will be 5