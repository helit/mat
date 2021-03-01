-- UP
CREATE TABLE recipes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  url TEXT
);

CREATE TABLE ingredients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  item TEXT,
  type TEXT
);

CREATE TABLE recipe_ingredient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  recipeId INTEGER REFERENCES recipes(id),
  ingredientId INTEGER REFERENCES ingredients(id),
  amount INTEGER,
  unit TEXT
);

INSERT INTO recipes (name, url) values ('Lasagne', 'https://www.lasagne.se');
INSERT INTO recipes (name, url) values ('Pannkakor', 'https://www.pannkakor.se');
INSERT INTO recipes (name, url) values ('Linsgryta', 'https://www.linsgryta.se');

INSERT INTO ingredients (item, type) values ('Lasagneplattor', 'Pasta');
INSERT INTO ingredients (item, type) values ('Krossade Tomater', 'Konserver');
INSERT INTO ingredients (item, type) values ('Mjölk', 'Mejeri');
INSERT INTO ingredients (item, type) values ('Mjöl', 'Torrvaror');
INSERT INTO ingredients (item, type) values ('Krossade Tomater', 'Konserver');
INSERT INTO ingredients (item, type) values ('Linser', 'Torrvaror');

INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (1, 1, 10, 'st');
INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (1, 2, 400, 'gram');
INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (2, 3, 6, 'dl');
INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (2, 4, 4, 'dl');
INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (3, 5, 400, 'gram');
INSERT INTO recipe_ingredient (recipeId, ingredientId, amount, unit) values (3, 6, 3, 'dl');

-- DOWN
DROP TABLE recipes;
DROP TABLE ingredients;
DROP TABLE recipe_ingredient;