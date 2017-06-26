export function sortRecipes(recipes, sortMethod) {
  // current methods: alphabetical, reverse alpha, recent, least recent, popular, least popular

  let sortedRecipes = recipes;

  if (sortMethod === 'Alphabetical') {
    sortedRecipes = recipes.sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  } else if (sortMethod === 'Reverse Alpha') {
    sortedRecipes = recipes.sort((a, b) => {
      const nameA = a.title.toUpperCase(); // ignore upper and lowercase
      const nameB = b.title.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return 1;
      }
      if (nameA > nameB) {
        return -1;
      }
      return 0;
    });
  }

  return sortedRecipes;
}

/* eslint global-require: "off" */
/* eslint quote-props: "off" */
export const recipeImages = {
  'asparagus-salad': require('images/recipes/asparagus-salad.jpg'),
  'avocado-caprese-chicken-salad': require('images/recipes/avocado-caprese-chicken-salad.jpg'),
  'baked-chicken-salad': require('images/recipes/baked-chicken-salad.jpg'),
  'bbq': require('images/recipes/bbq.jpg'),
  'best-rolled-sugar-cookie': require('images/recipes/best-rolled-sugar-cookie.jpg'),
  'blt-salad': require('images/recipes/blt-salad.jpg'),
  'braised-chicken': require('images/recipes/braised-chicken.jpg'),
  'chicken-asparagus-stir-fry': require('images/recipes/chicken-asparagus-stir-fry.jpg'),
  'chicken-avacado-burritos': require('images/recipes/chicken-avacado-burritos.jpg'),
  'chicken-bacon-garlic-pasta': require('images/recipes/chicken-bacon-garlic-pasta.jpg'),
  'chicken-caesar': require('images/recipes/chicken-caesar.jpg'),
  'chicken-casserole': require('images/recipes/chicken-casserole.jpg'),
  'chicken-guac-sliders': require('images/recipes/chicken-guac-sliders.jpg'),
  'chicken-noodle': require('images/recipes/chicken-noodle.jpg'),
  'chicken-tacos': require('images/recipes/chicken-tacos.jpg'),
  'chicken-wraps': require('images/recipes/chicken-wraps.jpg'),
  'crispy-sw-chicken-wrap': require('images/recipes/crispy-sw-chicken-wrap.jpg'),
  'fish-taco-bowl': require('images/recipes/fish-taco-bowl.jpg'),
  'grilled-cheese-avocado': require('images/recipes/grilled-cheese-avocado.jpg'),
  'grilled-steaks': require('images/recipes/grilled-steaks.jpg'),
  'honey-mustard-chicken': require('images/recipes/honey-mustard-chicken.jpg'),
  'honey-salmon': require('images/recipes/honey-salmon.jpg'),
  'korean-beef': require('images/recipes/korean-beef.jpg'),
  'one-pot-mac': require('images/recipes/one-pot-mac.jpg'),
  'orzo-soup': require('images/recipes/orzo-soup.jpg'),
  'pulled-pork': require('images/recipes/pulled-pork.jpg'),
  'ramen': require('images/recipes/ramen.jpg'),
  'rigatoni': require('images/recipes/rigatoni.jpg'),
  'santa-fe-chicken': require('images/recipes/santa-fe-chicken.jpg'),
  'sausage-kale-soup': require('images/recipes/sausage-kale-soup.jpg'),
  'single-serve-chocolate-chip': require('images/recipes/single-serve-chocolate-chip.jpg'),
  'slow-cooker-french-dip': require('images/recipes/slow-cooker-french-dip.jpg'),
  'slow-cooker-garlic-chicken': require('images/recipes/slow-cooker-garlic-chicken.jpg'),
  'souvlaki-kabobs': require('images/recipes/souvlaki-kabobs.jpg'),
  'spinach-artichoke-pasta': require('images/recipes/spinach-artichoke-pasta.jpg'),
  'steak-fajitas': require('images/recipes/steak-fajitas.jpg'),
  'steak-salad': require('images/recipes/steak-salad.jpg'),
  'sweet-potato-salad': require('images/recipes/sweet-potato-salad.jpg'),
  'tenderloin-sandwich': require('images/recipes/tenderloin-sandwich.jpg'),
  'turkey-burger': require('images/recipes/turkey-burger.jpg'),
  'turkey-panini': require('images/recipes/turkey-panini.jpg'),
  'white-chicken-chili': require('images/recipes/white-chicken-chili.jpg'),
  'white-pizza': require('images/recipes/white-pizza.jpg'),
  'yakisoba': require('images/recipes/yakisoba.jpg'),
};
