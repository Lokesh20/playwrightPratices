"use strict";
let check = "Lokesh leaning typescript";
let check1 = 2;
let check2 = true;
let check3 = [1, 2, 4, 5];
let check4 = "Any value can be added";
//----------------------------------------------------
function add(a, b) {
    return a + b;
}
;
add(3, 4);
//----------------------------------------------------------
//object
let user = { name: "Lokesh", age: 32, location: "Mumbai" };
user.location = "pune";
console.log(user.location);
//if needed to add location in js we add directly as location:"Mumbai", but in typescript needto addd above 
//and if need to change than add first and assign one value and than change it
