CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  email VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(150) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW (),
  updated_at TIMESTAMP
);

CREATE INDEX IF NOT EXISTS users_name ON users (name);

INSERT INTO
  users (name, email, password)
VALUES
  (
    'sami',
    'sami@herogram.dev',
    '$2a$14$YP96UVdRK/oyVYQqcd6aGOGSWTaQaSN0wo3MVqpG99RnivBzzPtOq' -- password: password
  ) ON CONFLICT (email) DO NOTHING;

-- This function will update the updated_at column to the current timestamp
-- whenever a row is updated.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();