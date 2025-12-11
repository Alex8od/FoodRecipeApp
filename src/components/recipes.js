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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

function Recipe({ foods }) {
  const navigation = useNavigation();

  const ArticleCard = ({ item, index }) => {
    return (
      <View style={styles.cardWrapper} testID="articleDisplay">
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("RecipeDetail", item)}
        >
          <Image
            source={{ uri: item.recipeImage }}
            style={[
              styles.image,
              { height: index % 3 === 0 ? hp("25%") : hp("35%") },
            ]}
          />
          <View style={styles.cardTextContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {item.recipeName}
            </Text>
            <Text style={styles.desc} numberOfLines={2}>
              {item.recipeInstructions}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container} testID="recipesDisplay">
      <FlatList
        data={foods}
        numColumns={2}
        keyExtractor={(item) => item.idFood?.toString() || item.recipeName}
        renderItem={({ item, index }) => (
          <ArticleCard item={item} index={index} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: hp("2%"),
    paddingHorizontal: wp("4%"),
  },
  listContent: {
    paddingBottom: hp("10%"),
  },
  cardWrapper: {
    flex: 1,
    padding: wp("1.5%"),
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
  },
  cardTextContainer: {
    paddingHorizontal: wp("3%"),
    paddingVertical: hp("1%"),
  },
  title: {
    fontSize: hp("2%"),
    fontWeight: "600",
    marginBottom: hp("0.5%"),
  },
  desc: {
    fontSize: hp("1.6%"),
    color: "#6b7280",
  },
});

export default Recipe;
