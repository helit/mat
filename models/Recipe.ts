import { RecipeIngredient } from './RecipeIngredient';

export interface Recipe {
  title: string,
  slug: string,
  url: string,
  comment: string,
  ingredients: RecipeIngredient[]
}