import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db';

export default async function ingredientsApi(req: NextApiRequest, res: NextApiResponse) {

  switch (req.method) {
    case 'GET':
      getIngredients(req, res);
      break;
    case 'POST':
      postIngredients(req, res);
      break;
    default:
      break;
  }
}

const getIngredients = async (req, res) => {
  try {
    const ingredients = await db.collection('ingredients').orderBy('created').get();
    const ingredientsData = ingredients.docs.map(ingredient => ({
      id: ingredient.id,
      ...ingredient.data()
    }));
    res.status(200).json({ ingredientsData });
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
}

const postIngredients = async (req, res) => {
  try {
    const {
      name,
      category,
      subCategory,
      brand,
      comment
    } = req.body;
    const ingredients = await db.collection('ingredients').get();
    const ingredientsData = ingredients.docs.map(ingredient => ingredient.data());

    if (ingredientsData.some(ingredient => ingredient.name === name)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('ingredients').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}