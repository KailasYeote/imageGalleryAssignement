import React, { useEffect, useCallback, useState } from "react";
import {
    Text,
    View,
    Image,
    FlatList,
    StyleSheet,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getImagesAsync, toggleFavorite } from "../redux/imagesSlice";

const { width } = Dimensions.get("window");

export default function Images() {
    const dispatch = useDispatch();

    const { images = [], loading = false, loadingMore = false, hasMore = true, page = 1, error = null, searchQuery = "", favorites = [] } = useSelector(
        (state) => state.images || {}
    );

    const fetchImages = useCallback((pageNum = 1) => {
        dispatch(getImagesAsync({ page: pageNum, limit: 8 }));
    }, [dispatch]);

    useEffect(() => {
        fetchImages(1);
    }, [fetchImages]);

    const handleNextPage = () => {
        if (hasMore && !loadingMore && !loading) {
            fetchImages(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1 && !loadingMore && !loading) {
            fetchImages(page - 1);
        }
    };

    const filteredImages = images.filter((img) =>
        img.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = useCallback(
        ({ item }) => {
            const isFav = favorites.some((fav) => fav.id === item.id);

            return (
                <View style={styles.card}>
                    {/* Image & Floating Favorite Button */}
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.download_url }}
                            style={styles.image}
                            resizeMode="cover"
                        />
                        <TouchableOpacity
                            style={[styles.favoriteButton, isFav && styles.favoriteActive]}
                            onPress={() => dispatch(toggleFavorite(item))}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.heartIcon}>{isFav ? "❤️" : "🤍"}</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Card Details */}
                    <View style={styles.content}>
                        <Text style={styles.creatorTag}>PHOTO ID • #{item.id}</Text>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.author}
                        </Text>
                        <Text style={styles.dimensions}>
                            Dimensions: {item.width} x {item.height}
                        </Text>

                        {/* Action Button */}
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
        [favorites]
    );

    if (loading && images.length === 0) {
        return (
            <SafeAreaView style={styles.centered}>
                <ActivityIndicator size="large" color="#2563EB" />
                <Text style={styles.stateText}>Loading collection...</Text>
            </SafeAreaView>
        );
    }

    if (error && images.length === 0) {
        return (
            <SafeAreaView style={styles.centered}>
                <Text style={styles.errorTitle}>Could not load store</Text>
                <Text style={styles.stateText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={() => fetchImages(1)}>
                    <Text style={styles.retryText}>Try Again</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredImages}
                keyExtractor={(item) => String(item.id)}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                ListFooterComponent={
                    <View style={styles.paginationContainer}>
                        <TouchableOpacity
                            style={[styles.pageButton, page === 1 && styles.pageButtonDisabled]}
                            onPress={handlePrevPage}
                            disabled={page === 1 || loadingMore}
                        >
                            <Text style={styles.pageButtonText}>Previous</Text>
                        </TouchableOpacity>

                        <Text style={styles.pageText}>Page {page}</Text>

                        <TouchableOpacity
                            style={[styles.pageButton, !hasMore && styles.pageButtonDisabled]}
                            onPress={handleNextPage}
                            disabled={!hasMore || loadingMore}
                        >
                            <Text style={styles.pageButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                }
                refreshControl={
                    <RefreshControl
                        refreshing={loading}
                        onRefresh={() => fetchImages(page)}
                        tintColor="#2563EB"
                        colors={["#2563EB"]}
                    />
                }
                initialNumToRender={8}
                maxToRenderPerBatch={8}
                windowSize={5}
                removeClippedSubviews={true}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8FAFC",
    },
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F8FAFC",
        padding: 20,
    },
    header: {
        marginBottom: 18,
        marginTop: 8,
    },
    heading: {
        fontSize: 28,
        fontWeight: "800",
        color: "#0F172A",
        letterSpacing: -0.5,
    },
    subheading: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 4,
    },
    list: {
        paddingHorizontal: 16,
        paddingTop: 10,
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
    stateText: {
        fontSize: 14,
        color: "#64748B",
        marginTop: 8,
        textAlign: "center",
    },
    errorTitle: {
        fontSize: 18,
        fontWeight: "700",
        color: "#0F172A",
    },
    retryButton: {
        marginTop: 16,
        backgroundColor: "#2563EB",
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderRadius: 10,
    },
    retryText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
    paginationContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        borderTopWidth: 1,
        borderTopColor: "#E2E8F0",
        marginTop: 10,
    },
    pageButton: {
        backgroundColor: "#2563EB",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    pageButtonDisabled: {
        backgroundColor: "#94A3B8",
    },
    pageButtonText: {
        color: "#FFFFFF",
        fontWeight: "600",
        fontSize: 14,
    },
    pageText: {
        fontSize: 16,
        fontWeight: "700",
        color: "#1E293B",
    },
});