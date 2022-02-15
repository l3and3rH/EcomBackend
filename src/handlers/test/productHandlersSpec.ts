import request from 'supertest'
import {app} from '../../index'


describe('Test Product Endpoints', function () {

    let token: string;

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

    it("create new product", async () => {
      const response = await request(app)
        .post("/products")
        .send({
            name: "New Product",
            price: 100,
            category: "Test"
        })
        .set("Accept", "application/json")
        .set("Authorization", token);    
      
      expect(response.status).toEqual(200);
    });

    it("GET List of Products", async () => {
        const response = await request(app)
          .get("/products")
          .set("Accept", "application/json")
          .set("Authorization", token);    

        expect(response.status).toEqual(200);
      });

      it("GET specific Product", async () => {
        const pre = await request(app)
        .post("/products")
        .send({
            name: "New Product",
            price: 100,
            category: "Test"
        })
        .set("Accept", "application/json")
        .set("Authorization", token);   

        const response = await request(app)
          .get("/Products/1")
          .set("Accept", "application/json")
          .set("Authorization", token);    
        expect(response.status).toEqual(200);
      });  


})