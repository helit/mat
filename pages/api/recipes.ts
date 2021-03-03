// Watching API tutorial at https://www.youtube.com/watch?v=PxiQDo0CmDE

import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getRecipes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  });

  // Insert
  if (req.method === 'POST') {
    const statement = await db.prepare(
      'INSERT INTO recipes (name, url, comment) VALUES (?, ?, ?)'
    );

    await statement.run(
      req.body.name,
      req.body.url,
      req.body.comment
    );
  }

  // Get
  const recipes = await db.all('SELECT * FROM recipes');

  res.json(recipes);
}