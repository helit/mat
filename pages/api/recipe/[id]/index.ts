// Watching API tutorial at https://www.youtube.com/watch?v=PxiQDo0CmDE

import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getRecipeById(req: NextApiRequest, res: NextApiResponse) {
  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  })

  // Update
  if (req.method === 'PUT') {
    const statement = await db.prepare(
      'UPDATE recipes SET name = ?, url = ?, comment = ? WHERE id = ?'
    );

    await statement.run(
      req.body.name,
      req.body.url,
      req.body.comment,
      req.query.id
    );
  }

  // Get
  const recipe = await db.get  ('SELECT * FROM recipes WHERE id = ?', [req.query.id]);

  console.log(recipe);

  res.json(recipe);
}