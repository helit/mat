import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../utils/db';

export default async function getIngredientById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const ingredient = await db.collection('ingredients').doc(req.query.id as string)
      .get();
    res.status(200).json(ingredient);
  } catch (e) {
    res.status(400).end();
  }
}