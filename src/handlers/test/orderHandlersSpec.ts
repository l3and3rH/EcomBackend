import request from 'supertest'
import {app} from '../../index'


describe('Test Order Endpoints', function () {

    let token: string;
    let order_id: string;

    beforeAll(async () => {
        const response = await request(app)
          .post("/User")
          .send({
            first_name: "Leander",
            last_name: "Haidacher",
            password: 'Alina<3',
          })
          .set("Accept", "application/json");
        token = "Bearer " + response.body;}, 
        )

    it("create new order", async () => {
      const response = await request(app)
        .post("/orders")
        .send({
            user_id: "1",
            order_status: 'active',
        })
        .set("Accept", "application/json")
        .set("Authorization", token);    
        order_id = response.body.id;
      expect(response.status).toEqual(200);
    });

    it("add product to order", async () => {
        const response = await request(app)
          .post("/orders/1/products")
          .send({
            order_id: '1',
            product_id: '1',
            quantity: 1
          })
          .set("Accept", "application/json")
          .set("Authorization", token);    

        expect(response.status).toEqual(200);
      });

      it("GET specific order by user", async () => {
  
        const response = await request(app)
          .get("/orders/1")
          .set("Accept", "application/json")
          .set("Authorization", token);    
        expect(response.status).toEqual(200);
      });  

      it("GET all orders", async () => {
  
        const response = await request(app)
          .get("/orders")
          .set("Accept", "application/json")
          .set("Authorization", token);    
        expect(response.status).toEqual(200);
      }); 


})