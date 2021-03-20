import { Ingredient } from './Ingredient';

export interface RecipeIngredient {
  ingredient: Ingredient,
  amount: number | string,
  unit: string,
}