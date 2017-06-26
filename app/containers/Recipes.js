import React, { PropTypes } from 'react';

import Recipes from 'components/recipes';
import Recipe from 'components/recipe';

import firebaseApp from 'app/lib/firebase';

import { sortRecipes, recipeImages } from 'app/lib/utils';


export default class RecipesContainer extends React.Component {
  static navigationOptions = {
    title: 'Recipes',
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.recipesRef = firebaseApp.database().ref('recipes');

    this.updateSortMethod = this.updateSortMethod.bind(this);

    this.state = {
      recipes: [],
      sortMethod: 'Alphabetical',
    };
  }

  componentDidMount() {
    this.listenForRecipes(this.recipesRef);
  }

  listenForRecipes(recipesRef) {
    recipesRef.on('value', (snap) => {
      const recipes = [];
      snap.forEach((child) => {
        recipes.push({
          key: child.key,
          ...child.val(),
        });
      });
      this.setState({
        recipes,
      });
      // // REMOVE THIS LATER!!!!!
      // this.props.navigation.navigate('Recipes', { id: '39' });
    });
  }

  addToShoppingList(recipe) {
    console.log('add', recipe.title, 'to shopping list');
  }

  removeFromShoppingList(recipe) {
    console.log('remove', recipe.title, 'from shopping list');
  }

  updateSortMethod(method) {
    this.setState({ sortMethod: method });
  }

  getRecipe(id) {
    return this.state.recipes.find(recipe => recipe.key === id);
  }

  render() {
    const { state } = this.props.navigation;
    const id = state.params ? state.params.id : null;

    let renderPage;
    if (id) {
      renderPage = (
        <Recipe
          style={{ flex: 1 }}
          handleAddToShoppingList={this.addToShoppingList}
          handleRemoveFromShoppingList={this.removeFromShoppingList}
          navigation={this.props.navigation}
          recipe={this.getRecipe(id)}
          recipeImages={recipeImages}
        />
      );
    } else {
      const sortedRecipes = sortRecipes(this.state.recipes, this.state.sortMethod);
      renderPage = (
        <Recipes
          handleAddToShoppingList={this.addToShoppingList}
          handleRemoveFromShoppingList={this.removeFromShoppingList}
          handleUpdateSortMethod={this.updateSortMethod}
          navigation={this.props.navigation}
          recipes={sortedRecipes}
          sortMethod={this.state.sortMethod}
          recipeImages={recipeImages}
        />
      );
    }
    return renderPage;
  }
}
