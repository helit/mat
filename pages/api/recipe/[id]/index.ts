import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../../../utils/db';

export default async function getRecipeById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const recipe = await db.collection('recipes').doc(req.query.id as string)
      .get();
    res.status(200).json(recipe);
  } catch (e) {
    res.status(400).end();
  }
}