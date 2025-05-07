CREATE TABLE
  IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    uuid UUID DEFAULT gen_random_uuid() NOT NULL,
    device_id VARCHAR(250) NOT NULL,
    poll_id INT NOT NULL,

    UNIQUE (device_id, poll_id),
    CONSTRAINT poll_vote_fk FOREIGN KEY (poll_id) REFERENCES polls (id) ON DELETE CASCADE ON UPDATE CASCADE
  );