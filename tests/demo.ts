let check: string = "Lokesh leaning typescript";

let check1: number = 2;

let check2: boolean = true;

let check3: number[] = [1, 2, 4, 5];

let check4: any = "Any value can be added";
//----------------------------------------------------

function add(a: number, b: number) {
    return a + b
};

add(3, 4);
//----------------------------------------------------------
//object
let user:{name:string,age:number,location:string}={name:"Lokesh",age:32,location:"Mumbai"};
user.location="pune";
console.log(user.location);

//if needed to add location in js we add directly as location:"Mumbai", but in typescript needto addd above 
//and if need to change than add first and assign one value and than change it
