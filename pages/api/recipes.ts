// Watching API tutorial at https://www.youtube.com/watch?v=PxiQDo0CmDE

import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function recipesApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  });

  switch (req.method) {
    case 'GET':
      getRecipes(req, res, db);
      break;
    case 'POST':
      postRecipe(req, res, db);
      break;

    default:
      break;
  }
}

const getRecipes = async (req, res, db) => {
  const recipes = await db.all('SELECT * FROM recipes');

  res.json(recipes);
}

const postRecipe = async (req, res, db) => {
  // Update recipes table
  const statement = await db.prepare(
    'INSERT INTO recipes (name, url, comment) VALUES (?, ?, ?)'
  );

  const result = await statement.run(
    req.body.name,
    req.body.url,
    req.body.comment
  );

  const newRecipe =
    await db.get('SELECT * FROM recipes WHERE id = ?', [result.lastID]);

  // Update recipe<->ingredient relational table
  const ingredientList = req.body.ingredientList;
  let values = [];
  ingredientList.map((ingredient) => {
    values.push(
      "("+newRecipe.id+","
      +ingredient.ingredientId+","
      +ingredient.amount+",'"
      +ingredient.unit+"')"
    );
  });

  let sql = `INSERT INTO recipe_ingredient
    (recipeId, ingredientId, amount, unit) VALUES `;
  sql += values.join(',');

  const statement2 = await db.prepare(sql);
  await statement2.run();

  res.json(newRecipe);
}