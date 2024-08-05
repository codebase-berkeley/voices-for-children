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
GRANT ALL PRIVILEGES ON DATABASE vfc TO root;


CREATE TABLE inkindDonations
(
  key SERIAL PRIMARY KEY,
  donor VARCHAR(80),
  item_donated VARCHAR(100),
  item_type VARCHAR(80),
  amount INTEGER,
  date VARCHAR(80),
  thanked VARCHAR(200),
  stock VARCHAR(80)

);

INSERT INTO inkindDonations(donor, item_donated, item_type, amount, date, thanked, stock) VALUES ('sasha', 'teddy', 'toys', 10, '2015-12-23', 'yes', 'yes');

CREATE TABLE communityPartnerships (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(255),
    location VARCHAR(255),
    citystate VARCHAR(255),
    gifttype VARCHAR(255),
    date VARCHAR(255),
    email VARCHAR(255),
    poc VARCHAR(255),
    phone VARCHAR(255),
    link VARCHAR(255),
    image VARCHAR(255)
);

ALTER TABlE communityPartnerships
ALTER COLUMN image TYPE BYTEA USING image::bytea;

INSERT INTO communityPartnerships(name, location, citystate, gifttype, date, email, poc, phone, link, image) VALUES ('Codebase', 'San Leandro', 'California', 'tickets', '2003-01-17', 'dom@gmail.com', 'Dom', '5103164766', 'https://google.com', '/assets/aqua.jpg');
INSERT INTO communityPartnerships(name, location, citystate, gifttype, date, email, poc, phone, link, image) VALUES ('Codebase', '4321 addresss', 'Riverside, CA', 'toys', '2024-05-01', 'dom@gmail.com', 'Dom', '5103164766', 'https://google.com', '/assets/aqua.jpg');


INSERT INTO inkindDonations(donor, itemsDonated, itemType, amount, dateDonated, thanked) VALUES ('sasha', 'legos', 'toys', 10, DATE '2015-12-23', 'thanked sasha by giving her flowers - sunflowers');
-- INSERT INTO inkindDonations(donor, itemsDonated, itemType, amount, dateDonated, thanked) VALUES ('ant', 'hot wheels', 'toys', DATE '2015-12-23', 'thanked ant by giving him nothing');