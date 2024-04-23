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

CREATE TABLE inkindDonations
(
  donor VARCHAR(80),
  itemsDonated VARCHAR(100),
  itemType VARCHAR(80),
  amount INTEGER,
  dateDonated DATE,
  thanked VARCHAR(200)
);

INSERT INTO players(name, score) VALUES ('player 1', 0);
INSERT INTO inkindDonations(donor, itemsDonated, itemType, amount, dateDonated, thanked) VALUES ('sasha', 'legos', 'toys', 10, DATE '2015-12-23', 'thanked sasha by giving her flowers - sunflowers');
-- INSERT INTO inkindDonations(donor, itemsDonated, itemType, amount, dateDonated, thanked) VALUES ('ant', 'hot wheels', 'toys', DATE '2015-12-23', 'thanked ant by giving him nothing');

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO root;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO root;
GRANT ALL PRIVILEGES ON DATABASE portal TO root;