import React from 'react';
import { TabNavigator } from 'react-navigation';

import Recipes from 'containers/Recipes';
import ShoppingList from 'containers/ShoppingList';

const Navigation = TabNavigator({
  Recipes: {
    screen: Recipes,
    path: 'recipe/:id',
  },
  ShoppingList: {
    screen: ShoppingList,
    path: 'shopping-list/:id',
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
