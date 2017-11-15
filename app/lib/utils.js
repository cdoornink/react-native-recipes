function sortAlphabetical(recipes) {
  return recipes.sort((a, b) => {
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
}

function sortReverseAlphabetical(recipes) {
  return recipes.sort((a, b) => {
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

function sortPopular(recipes) {
  const alphabeticalRecipes = sortAlphabetical(recipes);
  return alphabeticalRecipes.sort((a, b) => {
    if (a.popularity < b.popularity) {
      return 1;
    }
    if (a.popularity > b.popularity) {
      return -1;
    }
    return 0;
  });
}

function sortLeastPopular(recipes) {
  const alphabeticalRecipes = sortAlphabetical(recipes);
  return alphabeticalRecipes.sort((a, b) => {
    if (a.popularity < b.popularity) {
      return -1;
    }
    if (a.popularity > b.popularity) {
      return 1;
    }
    return 0;
  });
}

function sortRecent(recipes) {
  const alphabeticalRecipes = sortAlphabetical(recipes);
  return alphabeticalRecipes.sort((a, b) => {
    if (a.recency < b.recency) {
      return 1;
    }
    if (a.recency > b.recency) {
      return -1;
    }
    return 0;
  });
}

function sortLeastRecent(recipes) {
  const alphabeticalRecipes = sortAlphabetical(recipes);
  return alphabeticalRecipes.sort((a, b) => {
    if (a.recency < b.recency) {
      return -1;
    }
    if (a.recency > b.recency) {
      return 1;
    }
    return 0;
  });
}

/* eslint no-param-reassign: ["error", { "props": false }]*/
export function assignPopularityAndRecency(recipes, history) {
  recipes.forEach((recipe) => {
    recipe.popularity = history.reduce((n, val) => n + (val === recipe.key), 0);
  });

  history.forEach((e, i) => {
    const recipe = recipes.find(r => r.key === e);
    recipe.recency = i;
  });

  return recipes;
}

export function sortRecipes(recipes, sortMethod) {
  // current methods: alphabetical, reverse alpha, recent, least recent, popular, least popular

  let sortedRecipes = recipes;

  if (sortMethod === 'Alphabetical') {
    sortedRecipes = sortAlphabetical(recipes);
  } else if (sortMethod === 'Reverse Alpha') {
    sortedRecipes = sortReverseAlphabetical(recipes);
  } else if (sortMethod === 'Popular') {
    sortedRecipes = sortPopular(recipes);
  } else if (sortMethod === 'Least Popular') {
    sortedRecipes = sortLeastPopular(recipes);
  } else if (sortMethod === 'Recent') {
    sortedRecipes = sortRecent(recipes);
  } else if (sortMethod === 'Least Recent') {
    sortedRecipes = sortLeastRecent(recipes);
  }

  return sortedRecipes;
}

/* eslint global-require: "off" */
/* eslint quote-props: "off" */
export const recipeImages = {
  'asparagus-salad': require('images/recipes/asparagus-salad.jpg'),
  'avocado-caprese-chicken-salad': require('images/recipes/avocado-caprese-chicken-salad.jpg'),
  'avocado-salmon': require('images/recipes/avocado-salmon.jpg'),
  'baked-chicken-salad': require('images/recipes/baked-chicken-salad.jpg'),
  'bbq': require('images/recipes/bbq.jpg'),
  'best-rolled-sugar-cookie': require('images/recipes/best-rolled-sugar-cookie.jpg'),
  'blt-salad': require('images/recipes/blt-salad.jpg'),
  'braised-chicken': require('images/recipes/braised-chicken.jpg'),
  'brazilian-punch': require('images/recipes/brazilian-punch.jpg'),
  'brussel-sprout-salad': require('images/recipes/brussel-sprout-salad.jpg'),
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
  'grass-cloud': require('images/recipes/grass-cloud.jpg'),
  'grilled-cheese-avocado': require('images/recipes/grilled-cheese-avocado.jpg'),
  'grilled-steaks': require('images/recipes/grilled-steaks.jpg'),
  'golden-coconut-lentil-soup': require('images/recipes/golden-coconut-lentil-soup.jpg'),
  'honey-mustard-chicken': require('images/recipes/honey-mustard-chicken.jpg'),
  'honey-salmon': require('images/recipes/honey-salmon.jpg'),
  'korean-beef': require('images/recipes/korean-beef.jpg'),
  'mojito': require('images/recipes/mojito.jpg'),
  'one-pan-chicken-thighs': require('images/recipes/one-pan-chicken-thighs.jpg'),
  'one-pot-mac': require('images/recipes/one-pot-mac.jpg'),
  'orzo-soup': require('images/recipes/orzo-soup.jpg'),
  'pulled-pork': require('images/recipes/pulled-pork.jpg'),
  'quinoa-tabbouleh-with-chickpeas': require('images/recipes/quinoa-tabbouleh-with-chickpeas.jpg'),
  'ramen': require('images/recipes/ramen.jpg'),
  'rigatoni': require('images/recipes/rigatoni.jpg'),
  'roasted-sweet-potato-wild-rice-arugula-salad': require('images/recipes/roasted-sweet-potato-wild-rice-arugula-salad.jpg'),
  'salmon-sliders': require('images/recipes/salmon-sliders.jpg'),
  'santa-fe-chicken': require('images/recipes/santa-fe-chicken.jpg'),
  'sausage-kale-soup': require('images/recipes/sausage-kale-soup.jpg'),
  'sheet-pan-lemon-rosemary-chicken': require('images/recipes/sheet-pan-lemon-rosemary-chicken.jpg'),
  'single-serve-chocolate-chip': require('images/recipes/single-serve-chocolate-chip.jpg'),
  'slow-cooker-french-dip': require('images/recipes/slow-cooker-french-dip.jpg'),
  'slow-cooker-garlic-chicken': require('images/recipes/slow-cooker-garlic-chicken.jpg'),
  'smoky-tempeh-vegetable-rice-bowl': require('images/recipes/smoky-tempeh-vegetable-rice-bowl.jpg'),
  'souvlaki-kabobs': require('images/recipes/souvlaki-kabobs.jpg'),
  'spinach-artichoke-pasta': require('images/recipes/spinach-artichoke-pasta.jpg'),
  'steak-fajitas': require('images/recipes/steak-fajitas.jpg'),
  'steak-salad': require('images/recipes/steak-salad.jpg'),
  'sweet-potato-salad': require('images/recipes/sweet-potato-salad.jpg'),
  'tandoori-chicken-burgers': require('images/recipes/tandoori-chicken-burgers.jpg'),
  'tenderloin-sandwich': require('images/recipes/tenderloin-sandwich.jpg'),
  'turkey-burger': require('images/recipes/turkey-burger.jpg'),
  'turkey-panini': require('images/recipes/turkey-panini.jpg'),
  'turkey-taco-burrito-bowls': require('images/recipes/turkey-taco-burrito-bowls.jpg'),
  'white-chicken-chili': require('images/recipes/white-chicken-chili.jpg'),
  'white-pizza': require('images/recipes/white-pizza.jpg'),
  'yakisoba': require('images/recipes/yakisoba.jpg'),
};
