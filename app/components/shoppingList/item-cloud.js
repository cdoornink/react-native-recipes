import React, { PropTypes } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';


export default class TextCloud extends React.Component {
  static propTypes = {
    filterKey: PropTypes.string,
    handleItemClick: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  static defaultProps = {
    filterKey: null,
  };

  render() {
    let displayItems = this.props.items;

    if (this.props.filterKey) {
      displayItems = [];

      this.props.items.forEach((item) => {
        if (item.title.toLowerCase().indexOf(this.props.filterKey.toLowerCase()) !== -1) {
          displayItems.push(item);
        }
      });
    }

    const display = displayItems.map(item =>
      (<View key={item.key} style={styles.listItem}>
        <Text
          style={styles.listItemText}
          onPress={() => this.props.handleItemClick(item.title)}
        >
          + {item.title}
        </Text>
      </View>),
    );

    return (
      <ScrollView
        style={styles.scrollViewContainer}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="always"
      >
        <Text style={styles.suggestionHeader}>Suggestions:</Text>
        {display}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  suggestionHeader: {
    backgroundColor: '#444',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  listItem: {
    height: 36,
  },
  listItemText: {
    fontSize: 16,
    lineHeight: 30,
    margin: 6,
  },
});
