import request from 'supertest'
import {app} from '../../index'


describe('Test User Endpoints', function () {

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
        token = "Bearer " + response.body;})

    it("create new user", async () => {
      const response = await request(app)
        .post("/User")
        .send({
          first_name: "Leander",
          last_name: "Haidacher",
          password: 'Alina<3',
        })
        .set("Accept", "application/json");
      token = "Bearer " + response.body;
      expect(response.status).toEqual(200);
    });

    it("GET List of Users", async () => {
        const response = await request(app)
          .get("/User")
          .set("Accept", "application/json")
          .set("Authorization", token);    

        expect(response.status).toEqual(200);
      });

      it("GET specific of Users", async () => {
        const response = await request(app)
          .get("/User/1")
          .set("Accept", "application/json")
          .set("Authorization", token);    
        expect(response.status).toEqual(200);
      });  

      it("GET List of Users", async () => {
        const response = await request(app)
          .post("/User/Login")
          .send({
            first_name: "Leander",
            last_name: "Haidacher",
            password: 'Alina<3',
          })
          .set("Accept", "application/json")  
        expect(response.status).toEqual(200);
      });  
})