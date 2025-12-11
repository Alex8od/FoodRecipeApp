import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const MyRecipeScreen = () => {
  const navigation = useNavigation();
  const [recipes, setrecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchrecipes = async () => {
     try {
        const stored = await AsyncStorage.getItem("customrecipes");
        if (stored) {
          setrecipes(JSON.parse(stored));
        }
      } catch (err) {
        console.log("Error loading recipes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchrecipes();
  }, []);

  const refreshFromStorage = async () => {
    const stored = await AsyncStorage.getItem("customrecipes");
    setrecipes(stored ? JSON.parse(stored) : []);
  };

  const handlerecipeClick = (recipe) => {
    navigation.navigate("CustomRecipesScreen", { recipe });
  };

  const handleAddrecipe = () => {
    navigation.navigate("RecipesFormScreen", {
      onrecipeEdited: refreshFromStorage,
    });
  };

  const deleterecipe = async (index) => {
    try {
      const updatedrecipes = [...recipes];
      updatedrecipes.splice(index, 1);

      await AsyncStorage.setItem(
        "customrecipes",
        JSON.stringify(updatedrecipes)
      );

      setrecipes(updatedrecipes);
    } catch (err) {
      console.log("Error deleting recipe:", err);
    }
  };

  const editrecipe = (recipe, index) => {
    navigation.navigate("RecipesFormScreen", {
      recipeToEdit: recipe,
      recipeIndex: index,
      onrecipeEdited: refreshFromStorage,
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#fbbf24" />
        <Text style={{ marginTop: hp("1%") }}>Loading recipes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>My Food</Text>

      {/* Add New Recipe */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddrecipe}>
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      {recipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No recipes yet. Add one!</Text>
        </View>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.card}
              testID="handlerecipeBtn"
              onPress={() => handlerecipeClick(item)}
            >
              {item.image ? (
                <Image
                  source={{ uri: item.image }}
                  style={styles.recipeImage}
                />
              ) : null}

              <View style={styles.cardText}>
                <Text style={styles.recipeTitle}>{item.title}</Text>
                <Text style={styles.recipeDescp} testID="recipeDescp">
                  {item.description
                    ? item.description.length > 50
                      ? item.description.slice(0, 50) + "..."
                      : item.description
                    : ""}
                </Text>
              </View>

              <View
                style={styles.editDeleteButtons}
                testID="editDeleteButtons"
              >
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => editrecipe(item, index)}
                >
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleterecipe(index)}
                >
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: hp("5%"),
    backgroundColor: "#f9fafb",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    marginHorizontal: wp("5%"),
    paddingVertical: hp("1%"),
    backgroundColor: "#4b5563",
    borderRadius: 8,
    alignItems: "center",
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  heading: {
    marginTop: hp("2%"),
    marginLeft: wp("5%"),
    fontSize: hp("2.6%"),
    fontWeight: "700",
  },
  addButton: {
    marginTop: hp("2%"),
    marginHorizontal: wp("5%"),
    backgroundColor: "#fbbf24",
    paddingVertical: hp("1.5%"),
    borderRadius: 12,
    alignItems: "center",
  },
  addButtonText: {
    fontWeight: "600",
    fontSize: hp("2%"),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
    fontSize: hp("2%"),
  },
  listContent: {
    paddingHorizontal: wp("5%"),
    paddingTop: hp("2%"),
    paddingBottom: hp("3%"),
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: wp("3%"),
    marginBottom: hp("1.5%"),
    elevation: 2,
  },
  recipeImage: {
    width: "100%",
    height: hp("20%"),
    borderRadius: 12,
    marginBottom: hp("1%"),
  },
  cardText: {
    marginBottom: hp("1%"),
  },
  recipeTitle: {
    fontSize: hp("2.1%"),
    fontWeight: "700",
  },
  recipeDescp: {
    marginTop: hp("0.5%"),
    color: "#6b7280",
    fontSize: hp("1.7%"),
  },
  editDeleteButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: hp("0.5%"),
  },
  editButton: {
    marginRight: wp("3%"),
  },
  deleteButton: {},
  editText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  deleteText: {
    color: "#dc2626",
    fontWeight: "600",
  },
});

export default MyRecipeScreen;
