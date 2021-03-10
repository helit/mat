import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function ingredientsApi(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  })

  switch (req.method) {
    case 'GET':
      getIngredients(req, res, db);
      break;
    case 'POST':
      postIngredients(req, res, db);
      break;
    default:
      break;
  }
}

const getIngredients = async (req, res, db) => {
  const ingredients = await db.all('SELECT * FROM ingredients');

  res.json(ingredients);
}

const postIngredients = async (req, res, db) => {
  const statement = await db.prepare(
    'INSERT INTO ingredients (name, category, subCategory, brand, comment) VALUES (?, ?, ?, ?, ?)'
  );

  const result = await statement.run(
    req.body.name,
    req.body.category,
    req.body.subCategory,
    req.body.brand,
    req.body.comment
  );

  res.json(result);
}