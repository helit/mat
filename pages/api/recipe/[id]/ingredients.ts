import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getIngredientsByRecipeId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  })

  const allIngredients = await db.all(
    `SELECT
      i.id,
      i.item,
      i.type,
      ri.amount,
      ri.unit
    FROM
      recipes r
      JOIN recipe_ingredient ri ON (r.id = ri.recipeId)
      JOIN ingredients i ON (ri.ingredientId = i.id)
    WHERE
      r.id = ?`,
    [req.query.id]
  );

  res.json(allIngredients);
}