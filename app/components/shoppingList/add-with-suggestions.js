import React, { PropTypes } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import ItemCloud from 'components/shoppingList/item-cloud';

import { Colors } from 'constants/colors';

export default class AddWithSuggestions extends React.Component {
  static propTypes = {
    handleAddItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.addCloudItem = this.addCloudItem.bind(this);

    this.state = {
      newItemText: '',
      showCloud: false,
      moduleHeight: 50,
      placeholderText: 'Click here to add to your list',
    };
  }

  componentWillMount() {
    Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
    Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
  }

  keyboardWillShow() {
    this.setState({
      showCloud: true,
      moduleHeight: 180,
      placeholderText: 'Type an item',
    });
  }

  keyboardWillHide() {
    this.setState({
      showCloud: false,
      moduleHeight: 50,
      placeholderText: 'Click here to add to your list',
    });
  }

  addNewItem() {
    const { newItemText } = this.state;
    this.props.handleAddItem(newItemText);
    this.setState({ newItemText: '' });
  }

  addCloudItem(item) {
    this.props.handleAddItem(item);
    this.setState({ newItemText: '' });
  }

  render() {
    return (
      <View
        style={{ height: this.state.moduleHeight, alignSelf: 'stretch', backgroundColor: '#eee' }}
      >
        <View style={styles.inputAndButtonRow}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => {
              this.setState({ newItemText: text });
            }}
            placeholder={this.state.placeholderText}
            value={this.state.newItemText}
          />
          {this.state.showCloud &&
            <Text
              style={styles.addButton}
              onPress={() => this.addNewItem()}
            >ADD</Text>
          }
        </View>

        {this.state.showCloud &&
          <ItemCloud
            items={this.props.items}
            handleItemClick={this.addCloudItem}
            filterKey={this.state.newItemText}
          />
        }

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputAndButtonRow: {
    alignItems: 'stretch',
    height: 50,
    flex: 0,
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 4,
    height: 50,
    padding: 15,
  },
  addButton: {
    flex: 1,
    height: 50,
    backgroundColor: Colors.primaryButtonBGColor,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 12,
  },
});
