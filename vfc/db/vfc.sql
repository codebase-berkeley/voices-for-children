DROP DATABASE IF EXISTS vfc;

CREATE DATABASE vfc;

CREATE USER root
WITH ENCRYPTED PASSWORD 'password';

\c vfc;
CREATE TABLE players
(
  name VARCHAR(254) PRIMARY KEY,
  score INTEGER
);

INSERT INTO players(name, score) VALUES ('player 1', 0);

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;
-- push
GRANT ALL PRIVILEGES ON DATABASE portal TO root;