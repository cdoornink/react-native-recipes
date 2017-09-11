import React from 'react';
import { TabNavigator } from 'react-navigation';

import Menu from 'containers/Menu';
import Recipes from 'containers/Recipes';
import ShoppingList from 'containers/ShoppingList';

const Navigation = TabNavigator({
  Recipes: {
    screen: Recipes,
    path: 'recipes',
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
}, {
  tabBarOptions: {
    activeTintColor: '#e91e63',
  },
});

export default class App extends React.Component {
  render() {
    return (
      <Navigation screenProps={this.props} />
    );
  }
}
