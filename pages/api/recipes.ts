// Watching API tutorial at https://www.youtube.com/watch?v=PxiQDo0CmDE

import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../utils/db';

export default async function recipesApi(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      getRecipes(req, res);
      break;
    case 'POST':
      postRecipe(req, res);
      break;

    default:
      break;
  }
}

const getRecipes = async (req, res) => {
  try {
    const recipes = await db.collection('recipes').orderBy('created').get();
    const recipesData = recipes.docs.map(recipe => ({
      id: recipe.id,
      ...recipe.data()
    }));
    res.status(200).json({ recipesData });
  } catch (e) {
    res.status(400).end();
  }
}

const postRecipe = async (req, res) => {
  try {
    const {
      name,
      url,
      comment
    } = req.body;
    const recipes = await db.collection('recipes').get();
    const recipesData = recipes.docs.map(recipe => recipe.data());

    if (recipesData.some(recipe => recipe.name === name)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('recipes').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}