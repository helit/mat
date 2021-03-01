import { NextApiRequest, NextApiResponse } from 'next';

export default function getAllRecipes(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json({message: 'Only accepts GET requests.'})
  }

  res.json({name: 'linsgryta', method: req.method});
}