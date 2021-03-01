import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllIngredientsByRecipeId(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  res.json({name: 'smör', method: req.method});
}