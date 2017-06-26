import React, { PropTypes } from 'react';
import {
  SectionList,
  Text,
} from 'react-native';

import { Aisles, AisleDesignations } from 'constants/aisles';

export default class ShoppingList extends React.Component {
  static propTypes = {
    handleRemoveItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      sortedList: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.items !== this.props.items) {
      this.setState({ sortedList: this.sortShoppingList(nextProps.items) });
    }
  }

  sortShoppingList(list) {
    const ingredientKeys = Object.keys(AisleDesignations);
    const sortedShoppingList = Aisles.map(a => ({ name: a, key: a, data: [] }));
    // add list items to appropriate section in shopping list
    list.forEach((listItem) => {
      const item = listItem.title.toLowerCase();
      let matchingAisle = 'other';
      for (const key of ingredientKeys) {
        if (item.indexOf(key) !== -1) {
          matchingAisle = AisleDesignations[key];
          break;
        }
      }
      sortedShoppingList.find(i => i.name === matchingAisle).data.push(listItem);
    });

    // remove sections that don't have any items
    const sortedAndFilteredShoppingList = sortedShoppingList.filter(section =>
      section.data.length > 0);

    return sortedAndFilteredShoppingList;
  }

  renderShoppingListItem(item) {
    return (
      <Text
        style={{ fontSize: 18 }}
        onPress={() => this.props.handleRemoveItem(item)}
      >{item.title}</Text>
    );
  }

  renderShoppingListHeader(section) {
    return (
      <Text
        style={{ fontSize: 16, fontWeight: 'bold', paddingTop: 10 }}
      >{section.name}</Text>
    );
  }

  render() {
    return (
      <SectionList
        style={{ flex: 1, alignSelf: 'stretch', paddingHorizontal: 15 }}
        renderItem={({ item }) => this.renderShoppingListItem(item)}
        renderSectionHeader={({ section }) => this.renderShoppingListHeader(section)}
        sections={this.state.sortedList}
        removeClippedSubviews={false}
      />
    );
  }
}
