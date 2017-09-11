import React from 'react';
import { TabNavigator } from 'react-navigation';

import Drinks from 'containers/Drinks';
import Menu from 'containers/Menu';
import Recipes from 'containers/Recipes';
import ShoppingList from 'containers/ShoppingList';

import { Colors } from 'constants/colors';

const Navigation = TabNavigator({
  Recipes: {
    screen: Recipes,
    path: 'recipes',
  },
  Drinks: {
    screen: Drinks,
    path: 'drinks',
  },
  ShoppingList: {
    screen: ShoppingList,
    path: 'shopping-list',
  },
  Menu: {
    screen: Menu,
    path: 'menu',
  },
  // Menu: { screen: Menu },
}, {
  initialRouteName: 'Recipes',
  tabBarOptions: {
    activeTintColor: Colors.text.primary,
  },
});

/* eslint react/prefer-stateless-function: "off" */
export default class App extends React.Component {
  render() {
    return (
      <Navigation screenProps={this.props} />
    );
  }
}
