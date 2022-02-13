CREATE TABLE order_products (
id SERIAL PRIMARY KEY,
or_id bigint REFERENCES orders(id),
prt_id bigint REFERENCES products(id),
quantity INTEGER
);