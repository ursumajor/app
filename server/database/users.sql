CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    auth0_id VARCHAR(255) UNIQUE,
    username VARCHAR(255) UNIQUE,
    pfp_url VARCHAR(2048)
);