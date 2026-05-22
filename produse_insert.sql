INSERT INTO produse (
    nume, cod_ean, descriere, imagine, categorie, tip_alimentare, 
    pret, perioada_garantie, culoare, material, functii_incluse, este_profesional
) VALUES 

-- ==========================================
-- 1. CATEGORIA: TERMICE (10 Produse)
-- ==========================================
('Friteuza profesionala electrica de banc, 6litri', '5940000000001', 'Friteuză ideală pentru fast-food, capacitate 6 litri, cu termostat.', 'friteuza_6l.jpg', 'termice', 'Curent Monofazic', 618.35, 12, 'Argintiu', 'Inox', 'termostat siguranta, vas detasabil', true),
('Gratar-Grill profesional de banc-neted-GAZ-80x70cm', '5940000000002', 'Grătar profesional cu placă netedă, alimentare pe gaz, 14kW.', 'gratar_neted_gaz.jpg', 'termice', 'Gaz Natural', 6831.69, 24, 'Argintiu', 'Inox 2mm', 'aprindere piezo, sertar grasimi', true),
('Plita profesionala cu inductie pentru Wok', '5940000000003', 'Plită pe inducție special concepută pentru tigăi tip Wok, încălzire rapidă.', 'plita_inductie_wok.jpg', 'termice', 'Curent Monofazic', 1529.74, 12, 'Negru/Argintiu', 'Sticla/Inox', 'timer, senzor vas', true),
('Masina de gatit pe gaz-4 arzatoare si cuptor', '5940000000004', 'Mașină de gătit combinată, arzătoare pe gaz și cuptor electric.', 'masina_gatit_mixta.jpg', 'termice', 'Gaz/Electric', 9853.59, 24, 'Argintiu', 'Inox', 'flacara veghe, cuptor ventilat', true),
('Aparat fiert paste, pasta cooker automat', '5940000000005', 'Fierbător de paste cu ridicare automată a coșurilor.', 'fiert_paste_automat.jpg', 'termice', 'Curent Trifazic', 8500.00, 24, 'Argintiu', 'Inox', 'lift automat, programabil', true),
('Gratar-Grill profesional de banc-striat-GAZ', '5940000000006', 'Grătar cu suprafață striată pentru carne, dimensiune compactă.', 'gratar_striat_gaz.jpg', 'termice', 'Gaz Natural', 4444.30, 12, 'Argintiu', 'Otel', 'suprafata striata, scurgere', true),
('Gratar-Grill profesional de banc-neted-striat', '5940000000007', 'Fry-top electric cu jumătate placă netedă și jumătate striată.', 'gratar_mixt_electric.jpg', 'termice', 'Curent Trifazic', 6070.26, 12, 'Argintiu', 'Inox', 'zone independente, control termic', true),
('Plita profesionala cu inductie, analog, 3.5kW', '5940000000008', 'Plită portabilă pe inducție cu reglaj analogic de putere.', 'plita_inductie_35kw.jpg', 'termice', 'Curent Monofazic', 873.50, 12, 'Negru', 'Inox/Sticla', 'reglaj putere rotativ, filtru aer', true),
('Cuptor patiserie electric cu convectie 4 tavi', '5940000000009', 'Cuptor ventilat pentru patiserie și brutărie.', 'cuptor_patiserie_4tavi.jpg', 'termice', 'Curent Trifazic', 5400.00, 24, 'Argintiu', 'Inox', 'convectie, timer mecanic', true),
('Cuptor pizza profesional electric, 1 camera', '5940000000010', 'Cuptor de pizza compact, capacitate 4 pizza de 32cm.', 'cuptor_pizza_1cam.jpg', 'termice', 'Curent Trifazic', 3200.00, 12, 'Argintiu/Rosu', 'Otel/Samota', 'termostat independent, iluminare', true),

-- ==========================================
-- 2. CATEGORIA: DINAMICE (10 Produse)
-- ==========================================
('Malaxor-mixer spirala aluat, cap rabatabil 17kg', '5940000000011', 'Malaxor pentru aluat greu, capacitate 17kg, cu cap rabatabil.', 'malaxor_rabatabil_17kg.jpg', 'dinamice', 'Curent Monofazic', 9553.63, 12, 'Alb', 'Otel vopsit', 'cap rabatabil, bol extractibil', true),
('Mixer planetar BlackBolt 7L-negru', '5940000000012', 'Mixer planetar elegant și puternic pentru creme și sosuri.', 'mixer_blackbolt_7l.jpg', 'dinamice', 'Curent Monofazic', 2215.40, 12, 'Negru', 'Metal', '3 viteze, accesorii incluse', true),
('Mixer planetar profesional-10L', '5940000000013', 'Mixer robust de 10 litri pentru patiserii mici.', 'mixer_planetar_10l.jpg', 'dinamice', 'Curent Monofazic', 3054.20, 12, 'Gri', 'Fonta', 'transmisie roti dintate, grila protectie', true),
('Mixer planetar profesional-20L', '5940000000014', 'Mixer industrial de 20 litri, ideal pentru cofetării.', 'mixer_planetar_20l.jpg', 'dinamice', 'Curent Monofazic', 3609.24, 24, 'Argintiu', 'Inox/Fonta', 'cuva rabatabila, 3 trepte putere', true),
('Malaxor-mixer spirala aluat 36kg', '5940000000015', 'Cel mai mare malaxor pentru brutării, aluat până la 36kg.', 'malaxor_36kg.jpg', 'dinamice', 'Curent Trifazic', 12768.72, 24, 'Alb', 'Otel vopsit', 'temporizator, spirala fortificata', true),
('Cutter profesional vertical cu 2 viteze-20 litri', '5940000000016', 'Robot omogenizare și tocare fină (hummus, paste), 20L.', 'cutter_vertical_20l.jpg', 'dinamice', 'Curent Trifazic', 17058.06, 24, 'Argintiu', 'Inox AISI420', '2 viteze, functie omogenizare', true),
('Cutter profesional cu viteza variabila-10 litri', '5940000000017', 'Cutter de masă cu turație variabilă pentru precizie maximă.', 'cutter_10l.jpg', 'dinamice', 'Curent Monofazic', 8626.85, 12, 'Argintiu', 'Inox', 'viteza variabila, cutite duble', true),
('Aparat procesat legume Robot Coupe CL 50', '5940000000018', 'Cel mai faimos robot pentru feliat și răzuit legume în HoReCa.', 'robot_coupe_cl50.jpg', 'dinamice', 'Curent Monofazic', 9766.50, 24, 'Argintiu/Negru', 'Inox/Policarbonat', 'gura alimentare dubla, ejector', true),
('Feliator mezeluri, 22cm', '5940000000019', 'Feliator compact cu ascuțitor integrat pentru mezeluri și brânzeturi.', 'feliator_mezeluri_22cm.jpg', 'dinamice', 'Curent Monofazic', 1904.60, 12, 'Argintiu', 'Aluminiu Anodizat', 'ascutitor integrat, inel protectie', true),
('Masina curatat si spalat cartofi 10 kg', '5940000000020', 'Curățător rapid pentru cartofi și rădăcinoase.', 'masina_curatat_cartofi.jpg', 'dinamice', 'Curent Trifazic', 10057.17, 12, 'Argintiu', 'Inox', 'disc abraziv, conectare la apa', true),

-- ==========================================
-- 3. CATEGORIA: FRIGORIFICE (10 Produse)
-- ==========================================
('Dulap frigorific patiserie cu usa de sticla', '5940000000021', 'Dulap vertical pentru păstrarea la rece a prăjiturilor.', 'dulap_patiserie_sticla.jpg', 'frigorifice', 'Curent Monofazic', 11667.07, 24, 'Argintiu', 'Inox', 'racire ventilata, iluminare LED', true),
('Masa frigorifica tip suport-4 sertare', '5940000000022', 'Masă rece cu sertare adânci Gastronorm.', 'masa_frigorifica_4sertare.jpg', 'frigorifice', 'Curent Monofazic', 7825.95, 24, 'Argintiu', 'Inox', 'degivrare automata, blat lucru', true),
('Racitor vinuri, wine cooler, profesional', '5940000000023', 'Vitrină elegantă pentru depozitarea vinurilor la temperaturi optime.', 'racitor_vin_prof.jpg', 'frigorifice', 'Curent Monofazic', 7220.88, 24, 'Negru', 'Sticla/Metal', 'rafturi lemn, protectie UV', true),
('Vitrina rece expunere cofetarie-patiserie', '5940000000024', 'Vitrină orizontală de prezentare pentru prăjituri.', 'vitrina_cofetarie_138.jpg', 'frigorifice', 'Curent Monofazic', 13043.25, 24, 'Gri/Argintiu', 'Sticla curbata', 'evaporator, polite reglabile', true),
('Vitrina frigorifica profesionala servire 947L', '5940000000025', 'Vitrină uriașă de supermarket pentru produse perisabile.', 'vitrina_servire_947l.jpg', 'frigorifice', 'Curent Trifazic', 39796.80, 36, 'Alb/Argintiu', 'Inox/Sticla', 'perdea noapte, spatiu depozitare', true),
('Vitrina frigorifica profesionala servire 627L', '5940000000026', 'Vitrină de servire medie, ideală pentru mezeluri și lactate.', 'vitrina_servire_627l.jpg', 'frigorifice', 'Curent Monofazic', 26764.80, 24, 'Alb', 'Inox/Sticla', 'iluminat interior, expunere larga', true),
('Vitrina frigorifica profesionala servire 311L', '5940000000027', 'Vitrină mică de servire pentru magazine de proximitate.', 'vitrina_servire_311l.jpg', 'frigorifice', 'Curent Monofazic', 23414.40, 12, 'Alb', 'Sticla', 'dimensiuni compacte, eficienta clasa A', true),
('Vitrina frigorifica back-bar-3 usi batante', '5940000000028', 'Răcitor pentru băuturi, conceput pentru a fi plasat sub bar.', 'vitrina_backbar_3usi.jpg', 'frigorifice', 'Curent Monofazic', 5400.00, 24, 'Negru', 'Inox/Sticla', 'usi cu sticla, iluminare LED', true),
('Dulap congelare profesional din inox, 700L', '5940000000029', 'Congelator vertical din oțel inoxidabil, -22°C.', 'congelator_700l.jpg', 'frigorifice', 'Curent Monofazic', 6500.00, 24, 'Argintiu', 'Inox AISI304', 'afisaj digital, racire ventilata', true),
('Lada frigorifica profesionala cu capac plin', '5940000000030', 'Ladă frigorifică de capacitate mare pentru depozitarea cărnii.', 'lada_frigorifica_capac.jpg', 'frigorifice', 'Curent Monofazic', 2400.00, 24, 'Alb', 'Aluminiu/Plastic', 'cosuri interne, incuietoare', true),

-- ==========================================
-- 4. CATEGORIA: IGIENA (10 Produse)
-- ==========================================
('Masina de spalat vase cu capota', '5940000000031', 'Mașină industrială pentru spălare intensivă a vaselor.', 'masina_vase_capota.jpg', 'igiena', 'Curent Trifazic', 12500.00, 24, 'Argintiu', 'Inox', 'pornire automata la inchidere, dozator detergent', true),
('Masina de spalat vase frontala', '5940000000032', 'Ideală pentru baruri și restaurante medii, coș 50x50.', 'masina_vase_frontala.jpg', 'igiena', 'Curent Monofazic', 6800.00, 24, 'Argintiu', 'Inox', 'pompa evacuare, cicluri scurte', true),
('Spalator cu 3 cuve si polita inferioara', '5940000000033', 'Mobilier inox: Spălător industrial generos cu 3 cuve.', 'spalator_3cuve.jpg', 'igiena', 'N/A', 2100.00, 12, 'Argintiu', 'Inox alimentar', 'picioare reglabile, anti-stropi', true),
('Dedurizator manual cu rasina-16 litri', '5940000000034', 'Protejează mașinile de spălat vase de depunerile de calcar.', 'dedurizator_16l.jpg', 'igiena', 'N/A', 644.60, 12, 'Argintiu', 'Inox', 'regenerare manuala, rasina inclusa', true),
('Spalator inox o cuva si picurator', '5940000000035', 'Chiuvetă profesională pentru bucătării mici.', 'spalator_1cuva_picurator.jpg', 'igiena', 'N/A', 1450.00, 12, 'Argintiu', 'Inox AISI304', 'blat intarit, sifon inclus', true),
('Baterie dus profesionala cu robinet si arc', '5940000000036', 'Baterie tip duș pentru prespălarea vaselor grele.', 'baterie_dus_arc.jpg', 'igiena', 'N/A', 890.00, 12, 'Crom', 'Alama/Inox', 'furtun flexibil, suport perete', true),
('Sterilizator cutite profesional UV', '5940000000037', 'Cabinet de perete pentru sterilizarea a minim 10 cuțite.', 'sterilizator_cutite.jpg', 'igiena', 'Curent Monofazic', 750.00, 12, 'Argintiu', 'Inox/Sticla', 'lampa UV-C, temporizator 120min', true),
('Cos de gunoi profesional din inox, 50 litri', '5940000000038', 'Coș de gunoi cu pedală, robust, pentru bucătării comerciale.', 'cos_gunoi_50l.jpg', 'igiena', 'N/A', 450.00, 12, 'Argintiu', 'Inox', 'pedala actionare, galeata interioara', false),
('Uscator de maini profesional cu senzor', '5940000000039', 'Uscător de mâini rapid și igienic pentru toalete.', 'uscator_maini_senzor.jpg', 'igiena', 'Curent Monofazic', 650.00, 24, 'Alb', 'ABS rezistent', 'senzor miscare, jet de mare putere', false),
('Dispenser sapun lichid profesional din inox', '5940000000040', 'Dozator elegant din inox pentru săpun lichid, cu vizor.', 'dispenser_sapun_inox.jpg', 'igiena', 'N/A', 120.00, 12, 'Argintiu', 'Inox', 'sistem anti-furt, actionare cu cotul', false),

-- ==========================================
-- 5. CATEGORIA: USTENSILE (Aici am modificat în loc de accesorii_servire)
-- ==========================================
('Paleta-lopata mica pizza inox, BlueLine', '5940000000041', 'Paletă ultra-ușoară pentru verificarea și întoarcerea pizzei.', 'lopata_pizza_blueline.jpg', 'ustensile', 'N/A', 424.89, 6, 'Albastru/Argintiu', 'Aluminiu Anodizat', 'maner perforat, protectie termica', true),
('Set ustensile profesionale pizza', '5940000000042', 'Kit complet cu palete, perie și rolă pentru tăiere.', 'set_ustensile_pizza.jpg', 'ustensile', 'N/A', 950.00, 12, 'Diverse', 'Inox/Lemn', 'kit complet, suport perete', true),
('Carucior servire 3 polite din inox', '5940000000043', 'Cărucior robust pentru debarasare și servire în restaurante.', 'carucior_servire_3polite.jpg', 'ustensile', 'N/A', 650.00, 12, 'Argintiu', 'Inox', 'roti pivotante, frana, silentios', true),
('Carucior pentru transport hrana izoterm', '5940000000044', 'Sistem izoterm pentru păstrarea temperaturii alimentelor în tranzit.', 'carucior_izoterm.jpg', 'ustensile', 'N/A', 4500.00, 24, 'Gri/Rosu', 'Plastic alimentar', 'izolatie poliuretan, inchidere etansa', true),
('Chafing Dish profesional din inox', '5940000000045', 'Vas încălzitor pentru bufet suedez, cu capac roll-top.', 'chafing_dish_gn.jpg', 'ustensile', 'N/A', 420.00, 12, 'Argintiu', 'Inox', 'suport arzator, capac roll-top', true),
('Marmita profesionala transport hrana', '5940000000046', 'Recipient izolat termic de 20 litri pentru transport supe.', 'marmita_hrana_20l.jpg', 'ustensile', 'N/A', 550.00, 12, 'Argintiu', 'Inox', 'capac ermetic, cleme fixare', true),
('Tava autoservire compartimentata inox', '5940000000047', 'Tavă pentru cantine cu 5 compartimente pentru meniu complet.', 'tava_autoservire.jpg', 'ustensile', 'N/A', 85.00, 12, 'Argintiu', 'Inox', 'stivuibila, curatare usoara', false),
('Set tacamuri profesionale inox 24 piese', '5940000000048', 'Set complet pentru 6 persoane, polisat oglindă.', 'set_tacamuri_24.jpg', 'ustensile', 'N/A', 350.00, 60, 'Argintiu', 'Inox 18/10', 'rezistente masina vase, design modern', true),
('Platou servire ardezie naturala', '5940000000049', 'Platou elegant din piatră pentru prezentare brânzeturi și antreuri.', 'platou_ardezie.jpg', 'ustensile', 'N/A', 45.00, 0, 'Negru', 'Ardezie', 'margini brute, picioruse silicon', false),
('Carafa sticla servire apa/vin 1L', '5940000000050', 'Carafă din sticlă clară, ideală pentru mese de restaurant.', 'carafa_sticla_1l.jpg', 'ustensile', 'N/A', 35.00, 0, 'Transparent', 'Sticla grosiera', 'gat larg, toarnare usoara', false);

-- Actualizare descrieri pentru CATEGORIA TERMICE (Lungimi variate)
UPDATE produse 
SET descriere = 'Friteuză electrică profesională de banc, capacitate 6 litri. Construită integral din oțel inoxidabil AISI 304, rezistent la coroziune și uzură intensă. Dotată cu termostat de siguranță pentru prevenirea supraîncălzirii uleiului, coș din plasă deasă cu mâner atermic și sistem de ridicare a rezistențelor pentru o curățare facilă a cuvei. Ideală pentru unități de tip fast-food, food truck sau restaurante cu volum mediu de prăjire.' 
WHERE cod_ean = '5940000000001';

UPDATE produse 
SET descriere = 'Grătar profesional cu placă netedă din oțel special, alimentare pe gaz. Putere totală de 14kW, asigurând o încălzire rapidă și uniformă a suprafeței de lucru. Dispune de sistem de aprindere piezo-electrică, valvă de siguranță cu termocuplu și sertar generos pentru colectarea grăsimilor rezultate în urma gătirii.' 
WHERE cod_ean = '5940000000002';

UPDATE produse 
SET descriere = 'Plită pe inducție special concepută pentru tigăi tip Wok. Încălzire instantanee și senzor de recunoaștere a vasului.' 
WHERE cod_ean = '5940000000003';

UPDATE produse 
SET descriere = 'Mașină de gătit combinată, dotată cu 4 arzătoare pe gaz de mare putere (flacără deschisă din fontă emailată) și cuptor electric ventilat GN 1/1 la bază. Structura este robustă, din inox, cu panouri laterale ranforsate. Arzătoarele dispun de flacără de veghe și termocuplu de siguranță. Cuptorul electric permite reglajul temperaturii între 50°C și 270°C, fiind perfect pentru prepararea simultană a garniturilor sau produselor de panificație. Picioare reglabile pe înălțime.' 
WHERE cod_ean = '5940000000004';

-- Actualizare descrieri pentru CATEGORIA DINAMICE (Lungimi variate)
UPDATE produse 
SET descriere = 'Malaxor profesional cu capacitate de 17kg aluat, ideal pentru pizzerii și brutării artizanale. Modelul beneficiază de cap rabatabil și bol extractibil din inox, ceea ce facilitează extrem de mult descărcarea aluatului și igienizarea zilnică. Spirala forjată asigură o frământare omogenă, fără a încălzi excesiv aluatul, respectând timpii de dospire.' 
WHERE cod_ean = '5940000000011';

UPDATE produse 
SET descriere = 'Mixer planetar compact de 7 litri, perfect pentru creme, sosuri și aluaturi moi. Design modern, finisaj negru.' 
WHERE cod_ean = '5940000000012';

UPDATE produse 
SET descriere = 'Aparatul suprem pentru procesarea legumelor în bucătăriile comerciale, Robot Coupe CL 50. Construcție durabilă, motor asincron puternic pentru utilizare intensivă. Dispune de o gură de alimentare mare (suprafață 104 cm2) pentru legume voluminoase (varză, țelină) și o gură cilindrică (Ø 58 mm) pentru legume lungi sau fragile (castraveți, ciuperci). Ejectorul lateral permite evacuarea directă a produsului tăiat în cuve Gastronorm. Opțional, acceptă peste 50 de discuri diferite pentru feliere, răzuire, tăiere julienne sau cuburi.' 
WHERE cod_ean = '5940000000018';

-- Actualizare descrieri pentru CATEGORIA FRIGORIFICE (Lungimi variate)
UPDATE produse 
SET descriere = 'Dulap frigorific vertical pentru patiserie, prevăzut cu ușă din sticlă tratată anti-condens. Sistem de răcire ventilată care garantează o temperatură uniformă (între +2°C și +8°C) pe toate polițele, protejând prăjiturile de uscare. Iluminare interioară LED pe ambele laturi pentru o expunere excelentă a produselor.' 
WHERE cod_ean = '5940000000021';

UPDATE produse 
SET descriere = 'Vitrină uriașă de supermarket pentru produse perisabile. Volum de 947L, perdea de noapte inclusă, degivrare automată și spațiu de depozitare generos în partea inferioară. Clasa climatică 4, concepută să reziste în medii cu temperaturi ridicate.' 
WHERE cod_ean = '5940000000025';

-- Actualizare descrieri pentru CATEGORIA IGIENĂ & USTENSILE
UPDATE produse 
SET descriere = 'Mașină industrială pentru spălarea vaselor, model cu capotă (pass-through). Asigură igienizarea a până la 900 de farfurii pe oră. Dispune de dozator de detergent lichid integrat, brațe de spălare rotative din inox și funcție de pornire automată la coborârea capotei. Izolație fonică și termică superioară.' 
WHERE cod_ean = '5940000000031';

UPDATE produse 
SET descriere = 'Uscător de mâini rapid și igienic pentru toalete comerciale. Senzor infraroșu pentru pornire fără atingere.' 
WHERE cod_ean = '5940000000039';

UPDATE produse 
SET descriere = 'Cărucior izoterm profesional pentru menținerea temperaturii alimentelor în tranzit. Capacitate pentru tăvi GN 1/1, izolație din poliuretan injectat de înaltă densitate care garantează pierderi minime de căldură (maxim 1.5°C per oră). Prevăzut cu închidere etanșă, supapă de decompresie și roți pivotante cu frână, rezistente la șocuri.' 
WHERE cod_ean = '5940000000044';