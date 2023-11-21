
-- Table to store users
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    is_admin BOOLEAN DEFAULT false
);

-- Table to store shortened URLs
CREATE TABLE urls (
    url_id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL,
    short_url_key VARCHAR(10) UNIQUE NOT NULL,
    user_id INT REFERENCES users(user_id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    clicks INT DEFAULT 0
);

-- Table to store shortened URL's analytics
CREATE TABLE analytics (
    analytics_id SERIAL PRIMARY KEY,
    url_id INT REFERENCES urls(url_id),
    request_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    device_type VARCHAR(50),
    os_type VARCHAR(50),
    country VARCHAR(100),
    city VARCHAR(100),
    browser_type VARCHAR(50)
);
