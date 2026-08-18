import React, { useCallback } from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { toggleFavorite } from "../redux/imagesSlice";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Favorites() {
    const dispatch = useDispatch();
    const router = useRouter();

    const { favorites = [] } = useSelector((state) => state.images || {});

    const renderItem = useCallback(
        ({ item }) => {
            return (
                <View style={styles.card}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.download_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={[styles.favoriteButton, styles.favoriteActive]}
                            onPress={() => dispatch(toggleFavorite(item))}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.heartIcon}>❤️</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <Text style={styles.creatorTag}>PHOTO ID • #{item.id}</Text>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.author}
                        </Text>
                        <Text style={styles.dimensions}>
                            Dimensions: {item.width} x {item.height}
                        </Text>

                        <TouchableOpacity
                            style={styles.actionButton}
                            activeOpacity={0.85}
                            onPress={() => console.log(`Selected item ${item.id}`)}
                        >
                            <Text style={styles.actionButtonText}>View Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        },
        [dispatch]
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#0F172A" />
                </TouchableOpacity>
                <Text style={styles.heading}>Your Favorites</Text>
            </View>

            {favorites.length === 0 ? (
                <View style={styles.emptyState}>
                    <Ionicons name="heart-dislike-outline" size={64} color="#CBD5E1" />
                    <Text style={styles.emptyTitle}>No Favorites Yet</Text>
                    <Text style={styles.emptyText}>
                        Images you heart in the gallery will appear here!
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#E2E8F0",
        backgroundColor: "#FFFFFF",
    },
    backButton: {
        padding: 8,
        marginRight: 8,
    },
    heading: {
        fontSize: 22,
        fontWeight: "700",
        color: "#0F172A",
    },
    emptyState: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 24,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: "700",
        color: "#334155",
        marginTop: 16,
        marginBottom: 8,
    },
    emptyText: {
        fontSize: 15,
        color: "#64748B",
        textAlign: "center",
        lineHeight: 22,
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 24,
    },
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        marginBottom: 20,
        shadowColor: "#0F172A",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 4,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#F1F5F9",
    },
    imageContainer: {
        position: "relative",
        width: "100%",
        height: width * 0.6,
        backgroundColor: "#E2E8F0",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    favoriteButton: {
        position: "absolute",
        top: 14,
        right: 14,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 24,
        width: 38,
        height: 38,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    favoriteActive: {
        backgroundColor: "#FFFFFF",
    },
    heartIcon: {
        fontSize: 16,
    },
    content: {
        padding: 16,
    },
    creatorTag: {
        fontSize: 11,
        fontWeight: "700",
        color: "#6366F1",
        letterSpacing: 0.5,
        marginBottom: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
        marginBottom: 4,
    },
    dimensions: {
        fontSize: 13,
        color: "#64748B",
        marginBottom: 14,
        fontWeight: "500",
    },
    actionButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
    },
    actionButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});
