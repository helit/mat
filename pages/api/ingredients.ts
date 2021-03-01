import { NextApiRequest, NextApiResponse } from 'next';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export default async function getIngredients(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  const db = await open({
    filename: './matslumparn_db.sqlite',
    driver: sqlite3.Database
  })

  const ingredients = await db.all('SELECT * FROM ingredients');

  res.json(ingredients);
}