class APIUtile{

    constructor(apirequest,loginPayload)
    {
        this.apirequest=apirequest;
        this.loginPayload=loginPayload;
    }

    async getToken()
    { 
        
        const loginResponse = await  this.apirequest.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayload
        });
    
        const loginResponseJson = await loginResponse.json();
    
        console.log(await loginResponseJson);
    
        const token =  loginResponseJson.token;
    
        console.log(await loginResponseJson.token);

        return token;

    }

    async createOrder(orderPayload)
    {
        let response={};
        response.token= await this.getToken() 
        const order=await this.apirequest.post("https://rahulshettyacademy.com/api/ecom/order/create-order",{
        data:orderPayload,
        headers:{
            authorization:response.token
        }
        
            })
            const orderJson=await order.json();
            console.log(orderJson);
            console.log(orderJson.orders[0]);
            const orderID=orderJson.orders[0];
            response.orderNumber=orderID;
            return response;
    }

}
module.exports={APIUtile}