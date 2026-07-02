CREATE TABLE comments(
    id SERIAL PRIMARY KEY,
    recipe_id INTEGER REFERENCES recipes(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id),
    body TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
