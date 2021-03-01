// Watching API tutorial at https://www.youtube.com/watch?v=PxiQDo0CmDE

import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getRecipeById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  })

  const recipe = await db.get  ('SELECT * FROM recipes WHERE id = ?', [req.query.id]);

  res.json(recipe);
}