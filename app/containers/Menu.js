import React, { PropTypes } from 'react';
import { Icon } from 'react-native-elements';

import Menu from 'components/menu';

import firebaseApp from 'app/lib/firebase';

import { recipeImages } from 'app/lib/utils';


export default class MenuContainer extends React.Component {
  static navigationOptions = {
    title: 'Menu',
    tabBarIcon: ({ tintColor }) => (
      <Icon name="restaurant-menu" color={tintColor} />
    ),
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(...args) {
    super(...args);

    this.recipesRef = firebaseApp.database().ref('recipes');
    this.menu = firebaseApp.database().ref('menu');

    this.state = {
      recipes: [],
      menu: [],
    };
  }

  componentDidMount() {
    this.listenForRecipes(this.recipesRef);
    this.listenForMenu(this.menu);
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
    });
  }


  listenForMenu(itemsRef) {
    itemsRef.on('value', (snap) => {
      const menu = [];
      snap.forEach((child) => {
        if (child.val().recipeKey) {
          menu.push({
            key: child.key,
            ...child.val(),
          });
        }
      });
      this.setState({
        menu,
      });
    });
  }

  toggleMarkAsMade(recipe) {
    firebaseApp.database().ref(`recipes/${recipe.key}`).set({
      ...recipe,
      markAsMade: !recipe.markAsMade,
    });
  }

  getRecipesOnMenu() {
    const { menu, recipes } = this.state;
    const recipesOnMenu = [];
    menu.forEach((menuItem) => {
      const recipe = recipes[menuItem.recipeKey];
      recipesOnMenu.push(recipe);
    });

    return recipesOnMenu;
  }

  render() {
    const filteredRecipes = this.getRecipesOnMenu();
    return (
      <Menu
        navigation={this.props.navigation}
        recipes={filteredRecipes}
        recipeImages={recipeImages}
        toggleMarkAsMade={this.toggleMarkAsMade}
      />
    );
  }
}
