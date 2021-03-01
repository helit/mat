import { NextApiRequest, NextApiResponse } from 'next';

export default function getIngredientById(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  res.json({byId: req.query.id, message: 'getIngredientById'});
}