CREATE TYPE categorie_produs AS ENUM ('termice', 'frigorifice', 'dinamice', 'igiena', 'ustensile');

CREATE TABLE produse (

    id SERIAL PRIMARY KEY,
    nume VARCHAR(255) NOT NULL,
	cod_ean VARCHAR(20) NOT NULL,
    descriere TEXT NOT NULL,
    imagine VARCHAR(255) NOT NULL,
    categorie categorie_produs NOT NULL,
    tip_alimentare VARCHAR(50) NOT NULL, 
    pret NUMERIC(8,2) NOT NULL,
    perioada_garantie NUMERIC(6,0) NOT NULL,
    data_adaugare DATE DEFAULT CURRENT_DATE,
	culoare VARCHAR(50) NOT NULL,
    material VARCHAR(50) NOT NULL,
    functii_incluse VARCHAR(255) NOT NULL,
    este_profesional BOOLEAN DEFAULT false
);


GRANT ALL PRIVILEGES ON TABLE produse TO ciprian;
GRANT USAGE, SELECT ON SEQUENCE produse_id_seq TO ciprian; -- drept pentru autoincrementare ID

