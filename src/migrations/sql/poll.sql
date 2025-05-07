CREATE TABLE
  IF NOT EXISTS polls (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() NOT NULL,
    question VARCHAR(250) NOT NULL,
    options TEXT[],
    expiresAt TIMESTAMP,

    UNIQUE(uuid)
  );

CREATE INDEX IF NOT EXISTS polls_question ON polls (question);

INSERT INTO
  polls (question, options, expiresAt)
VALUES
  ('question 1', '{"op1", "op2"}','2025-05-08 23:59:59')