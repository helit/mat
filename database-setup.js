const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function setup() {
  const db = await sqlite.open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  });

  await db.migrate({force: 'last'});

  // const recipes = await db.all('SELECT * FROM recipe');
  // console.log('ALL RECIPES', JSON.stringify(recipes, null, 2));

  // const ingredients = await db.all('SELECT * FROM ingredient');
  // console.log('ALL INGREDIENTS', JSON.stringify(ingredients, null, 2));
}

setup();