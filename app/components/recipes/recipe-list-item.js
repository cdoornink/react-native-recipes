import React, { PropTypes } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


export default class RecipeListItem extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    recipe: PropTypes.object.isRequired,
    imageSource: PropTypes.number,
    onlyShowRemoveButton: PropTypes.bool,
    onMenu: PropTypes.bool,
    onShoppingList: PropTypes.bool,
    stylesheet: PropTypes.string,
    handleActionButtonClick: PropTypes.func.isRequired,
    navReferer: PropTypes.string,
  }

  static defaultProps = {
    imageSource: null,
    onlyShowRemoveButton: false,
    onMenu: false,
    onShoppingList: false,
    stylesheet: 'full',
    navReferer: 'Recipes',
  }

  handleActionButtonClick() {
    this.props.handleActionButtonClick(this.props.recipe);
  }

  render() {
    let actionButton = 'Add to List';

    if (this.props.onlyShowRemoveButton || this.props.onShoppingList) {
      actionButton = 'Remove From List';
    }
    if (this.props.onMenu) {
      if (this.props.recipe.markAsMade) {
        actionButton = 'Mark as Unmade';
      } else {
        actionButton = 'Mark as Made';
      }
    }

    const styles = this.props.stylesheet === 'full' ? fullSize : smallSize;

    const navParams = {
      id: this.props.recipe.key,
      referer: this.props.navReferer,
    };

    return (
      <View style={styles.recipeListItemContainer}>
        <View style={styles.recipeListItemTopRow}>
          <TouchableHighlight
            onPress={() => this.props.navigation.navigate('Recipes', navParams)}
          >
            <Image
              source={this.props.imageSource}
              style={styles.sideImage}
              resizeMode="cover"
            />
          </TouchableHighlight>
          <Text
            onPress={() => this.props.navigation.navigate('Recipes', navParams)}
            style={styles.recipeTitle}
          >
            {this.props.recipe.title}
          </Text>
          <TouchableHighlight
            onPress={() => this.handleActionButtonClick()}
            style={styles.recipeAddToListButton}
          >
            <Text style={{ textAlign: 'center' }}>
              {actionButton}
            </Text>
          </TouchableHighlight>
        </View>
        <TouchableHighlight
          onPress={() => this.props.navigation.navigate('Recipes', navParams)}
        >
          <Image
            source={this.props.imageSource}
            style={styles.mainImage}
            resizeMode="cover"
          />
        </TouchableHighlight>
      </View>
    );
  }
}

const deviceWidth = Dimensions.get('window').width;

const fullSize = StyleSheet.create({
  recipeListItemContainer: {
    flex: 1,
    padding: 8,
    marginBottom: 8,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#ccc',
    shadowOpacity: 1,
    shadowRadius: 6,
  },
  recipeListItemTopRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
  },
  recipeTitle: {
    flex: 4,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 1,
    paddingBottom: 8,
    color: '#333',
  },
  recipeAddToListButton: {
    flex: 1,
    paddingLeft: 5,
    paddingBottom: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainImage: {
    width: deviceWidth - 35.5,
    height: 100,
    position: 'relative',
  },
  sideImage: {
    display: 'none',
  },
});

const smallSize = StyleSheet.create({
  recipeListItemContainer: {
    flex: 1,
    padding: 0,

  },
  recipeListItemTopRow: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'space-between',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  recipeTitle: {
    flex: 4,
    fontSize: 14,
    fontWeight: '600',
    paddingTop: 3,
    paddingBottom: 3,
    color: '#333',
  },
  recipeAddToListButton: {
    flex: 1,
    paddingLeft: 5,
    paddingBottom: 3,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  mainImage: {
    display: 'none',
  },
  sideImage: {
    width: 60,
    height: 40,
    marginRight: 10,
  },
});
