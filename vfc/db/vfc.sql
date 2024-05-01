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
  donor VARCHAR(80),
  item_donated VARCHAR(100),
  item_type VARCHAR(80),
  amount INTEGER,
  date DATE,
  thanked VARCHAR(200),
  stock VARCHAR(80)

);

INSERT INTO inkinddonations(donor, item_donated, item_type, amount, date, thanked, stock) VALUES ('sasha', 'teddy', 'toys', 10, DATE '2015-12-23', 'yes', 'yes');


CREATE TABLE communityPartnerships(
  poc VARCHAR(100),
  email VARCHAR(320),
  phone INTEGER,
  dateJoined DATE,
  giftType VARCHAR(80),
  companyAddress VARCHAR(500),
  cityState VARCHAR(250),
  loglink VARCHAR(2048)
);


-- <div className="poc"><b>Point of Contact :</b> {props.poc}</div>
--     <div className="email"><b>Email :</b> {props.email}</div>
--     <div className="phone-number"><b>Phone Number :</b> {props.phone}</div>
--     <div className="date-joined"><b>Date Joined :</b> {props.date}</div>
--     <div className="gifts"><b>Gifts :</b> {props.giftType}</div>
--   </div>
--   <div className="halfDivider">
--     <div className="modalAddress"><b>Address :</b> {props.location}</div>
--     <div className="cityState"><b>City/State :</b> {props.cityState}</div>
--     <div className="Ticket Log Link"><b>Ticket Log Link :</b> <a id="logLink" href={"http://" + props.link} target="_blank" rel="noopener noreferrer">{props.link}</a></div>
--   </div>