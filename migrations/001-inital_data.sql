-- UP
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  url TEXT,
  comment TEXT
);

CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  category TEXT,
  subCategory TEXT,
  brand TEXT,
  comment TEXT
);

CREATE TABLE recipe_ingredient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipeId INTEGER REFERENCES recipes(id),
  ingredientId INTEGER REFERENCES ingredients(id),
  amount INTEGER,
  unit TEXT
);

-- INSERT INTO recipes (name, url, comment) values (
--   'Tomatpasta med rostade kikärtor',
--   'https://undertian.com/recept/snabb-tomatpasta-med-rostade-kikartor/',
--   'En kommentar'
-- );
-- INSERT INTO recipes (name, url, comment) values (
--   'Poké bowl',
--   'https://www.javligtgott.se/vegansk-poke-bowl/',
--   'En kommentar'
-- );
-- INSERT INTO recipes (name, url, comment) values (
--   'Korv & Bröd med pålägg',
--   'https://www.javligtgott.se/tre-ruggigt-goda-toppings-till-korv-med-brod/',
--   'En kommentar'
-- );
-- INSERT INTO recipes (name, url, comment) values (
--   'Pizza',
--   'https://www.koket.se/leilas-blogg/leila-lindholm/leilas-pizzadeg/',
--   'En kommentar'
-- );

-- INSERT INTO ingredients (name, category, subCategory, brand, comment) values ('Lasagneplattor', 'Pasta', 'Torr', 'ICA', 'En kommentar');
-- INSERT INTO ingredients (name, category, subCategory, brand, comment) values ('Krossade Tomater', 'Konserver', 'Torr', 'Änglamark', 'En kommentar');
-- INSERT INTO ingredients (name, category, subCategory, brand, comment) values ('Ärtmjölk', 'Mejeri', 'Mjölkfri', 'Sproud', 'En kommentar');
-- INSERT INTO ingredients (name, category, subCategory, brand, comment) values ('Mjöl', 'Torrvaror', 'Bak', 'Kärnå', 'En kommentar');
-- INSERT INTO ingredients (name, category, subCategory, brand, comment) values ('Linser', 'Torrvaror', 'Gryner', 'Kung markatta', 'En kommentar');

-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (1, 1, 10, 'st');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (1, 2, 400, 'gram');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (2, 3, 6, 'dl');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (2, 4, 4, 'dl');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (3, 2, 400, 'gram');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (3, 5, 3, 'dl');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (4, 4, 7, 'dl');
-- INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (4, 2, 400, 'gram');

-- DOWN
DROP TABLE recipes;
DROP TABLE ingredients;
DROP TABLE recipe_ingredient;