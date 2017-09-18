import React, { PropTypes } from 'react';
import { Icon } from 'react-native-elements';

import Recipes from 'components/recipes';
import Recipe from 'components/recipe';

import firebaseApp from 'app/lib/firebase';

import { assignPopularity, sortRecipes, recipeImages } from 'app/lib/utils';


export default class RecipesContainer extends React.Component {
  static navigationOptions = {
    title: 'Meals',
    tabBarIcon: ({ tintColor }) => (
      <Icon
        name="hamburger"
        color={tintColor}
        type="material-community"
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.recipesRef = firebaseApp.database().ref('recipes');
    this.shoppingListRef = firebaseApp.database().ref('shoppingList');
    this.menuHistoryRef = firebaseApp.database().ref('menuHistory');

    this.updateSortMethod = this.updateSortMethod.bind(this);
    this.toggleOnShoppingList = this.toggleOnShoppingList.bind(this);

    this.state = {
      recipes: [],
      shoppingList: [],
      sortMethod: 'Alphabetical',
    };
  }

  componentDidMount() {
    this.listenForRecipes(this.recipesRef);
    this.listenForShoppingList(this.shoppingListRef);
    this.listenForMenuHistory(this.menuHistoryRef);
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

  listenForShoppingList(itemsRef) {
    itemsRef.on('value', (snap) => {
      const shoppingList = [];
      snap.forEach((child) => {
        if (child.val().recipeKey) {
          shoppingList.push({
            key: child.key,
            ...child.val(),
          });
        }
      });
      this.setState({
        shoppingList,
      });
    });
  }

  listenForMenuHistory(itemsRef) {
    itemsRef.on('value', (snap) => {
      const menuHistory = [];
      snap.forEach((child) => {
        menuHistory.push(child.val());
      });
      this.setState({
        menuHistory,
      }, () => {
        this.setState({
          recipes: assignPopularity(this.state.recipes, menuHistory),
        });
      });
    });
  }

  updateSortMethod(method) {
    this.setState({ sortMethod: method });
  }

  toggleOnShoppingList(recipe) {
    if (recipe.onShoppingList) {
      this.removeRecipeFromShoppingList(recipe);
    } else {
      this.addRecipeToShoppingList(recipe);
    }
  }

  addRecipeToShoppingList(recipe) {
    this.shoppingListRef.push({ recipeKey: recipe.key });

    firebaseApp.database().ref(`recipes/${recipe.key}`).set({
      ...recipe,
      onShoppingList: true,
    });
  }

  removeRecipeFromShoppingList(recipe) {
    const keyToRemove = this.state.shoppingList.find(i => i.recipeKey === recipe.key);
    this.shoppingListRef.child(keyToRemove.key).remove();

    firebaseApp.database().ref(`recipes/${recipe.key}`).set({
      ...recipe,
      onShoppingList: false,
    });
  }

  render() {
    const { state } = this.props.navigation;
    const id = state.params ? state.params.id : null;

    let renderPage;
    if (id) {
      renderPage = (
        <Recipe
          style={{ flex: 1 }}
          navigation={this.props.navigation}
          recipe={this.state.recipes.find(recipe => recipe.key === id)}
          recipeImages={recipeImages}
          toggleOnShoppingList={this.toggleOnShoppingList}
        />
      );
    } else {
      const sortedRecipes = sortRecipes(this.state.recipes, this.state.sortMethod);

      renderPage = (
        <Recipes
          handleUpdateSortMethod={this.updateSortMethod}
          navigation={this.props.navigation}
          recipes={sortedRecipes}
          sortMethod={this.state.sortMethod}
          recipeImages={recipeImages}
          toggleOnShoppingList={this.toggleOnShoppingList}
        />
      );
    }
    return renderPage;
  }
}
