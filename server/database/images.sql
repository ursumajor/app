CREATE TABLE images(
    id SERIAL PRIMARY KEY,
    fname VARCHAR(255),
    upload_date DATE DEFAULT CURRENT_DATE,
    user_id INTEGER references users(id)
);