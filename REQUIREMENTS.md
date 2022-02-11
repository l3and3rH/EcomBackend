# API Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

## API Endpoints

#### Products

- Index -> GET '/products
- Show -> GET '/products/:id'
- Create [token required] -> POST '/products'

#### Users

- Index [token required] -> GET'/user'
- Show [token required] -> GET'/user/:id'
- Create -> POST'/user'
- Authenticate -> POST'/user/login'

#### Orders

- Current Order by user (args: user id)[token required] -> GET /orders/:id

## Data Shapes

#### Product

- id - SERIAL PRIMARY KEY
- name - VARCHAR(200)
- price - INTEGER
- category - VARCHAR(100)

#### User

- id - SERIAL PRIMARY KEY
- firstName - VARCHAR(50)
- lastName - VARCHAR(100)
- password - VARCHAR(100)

#### Orders

- id - SERIAL PRIMARY KEY
- user_id - bigint REFERENCES user(id)
- order_status - VARCHAR(30)

#### Order_Products

- id - SERIAL PRIMARY KEY
- order_id - bigint REFERENCES order(id)
- product_id - bigint REFERENCES product(id)
- quantity - INTEGER
