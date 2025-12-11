import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const FavoriteScreen = () => {
  const navigation = useNavigation();

  const favoriteRecipesList = useSelector(
    (state) => state.favorites.favoriterecipes || []
  );

  if (!favoriteRecipesList.length) {
    return (
      <View style={styles.emptyContainer} testID="favoriteRecipes">
        <Text style={styles.emptyText}>No favorite recipes yet!</Text>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container} testID="favoriteRecipes">
      <TouchableOpacity
        style={styles.backButtonTop}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Favorite Recipes</Text>

      <FlatList
        data={favoriteRecipesList}
        keyExtractor={(item, index) =>
          item.idC?.toString() ||
          item.idFood?.toString() ||
          index.toString()
        }
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("RecipeDetail", item)}
          >
            <Image
              source={{ uri: item.recipeImage }}
              style={styles.image}
            />
            <View style={styles.textContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {item.recipeName}
              </Text>
              <Text style={styles.category} numberOfLines={1}>
                {item.category}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: wp("5%"),
  },
  emptyText: {
    fontSize: hp("2%"),
    marginBottom: hp("2%"),
  },
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: "#f9fafb",
  },
  backButtonTop: {
    marginHorizontal: wp("5%"),
    paddingVertical: hp("1%"),
    backgroundColor: "#4b5563",
    borderRadius: 8,
    alignItems: "center",
  },
  backButton: {
    marginTop: hp("1%"),
    paddingHorizontal: wp("4%"),
    paddingVertical: hp("1%"),
    backgroundColor: "#4b5563",
    borderRadius: 8,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  heading: {
    marginTop: hp("3%"),
    marginLeft: wp("5%"),
    fontSize: hp("2.5%"),
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("3%"),
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: wp("2%"),
    marginBottom: hp("1.5%"),
    elevation: 2,
  },
  image: {
    width: wp("18%"),
    height: wp("18%"),
    borderRadius: 12,
  },
  textContainer: {
    flex: 1,
    marginLeft: wp("3%"),
    justifyContent: "center",
  },
  title: {
    fontSize: hp("2%"),
    fontWeight: "600",
  },
  category: {
    marginTop: 2,
    color: "#6b7280",
  },
});

export default FavoriteScreen;
