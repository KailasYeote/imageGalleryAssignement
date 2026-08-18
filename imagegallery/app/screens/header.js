import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../redux/imagesSlice";

export default function Header() {
    const router = useRouter();
    const dispatch = useDispatch();
    const searchQuery = useSelector((state) => state.images?.searchQuery || "");
    return (
        <View style={styles.container}>
            <StatusBar style="dark" />


            <View style={styles.header}>
                <Text style={styles.title}>
                    Art Gallery
                </Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPressOut={() => router.push('/screens/favorites')} style={{ marginRight: 15 }}>
                        <Ionicons
                            name="heart-outline"
                            size={32}
                            color="#333"
                        />
                    </TouchableOpacity>

                    <TouchableOpacity onPressOut={() => router.push('/screens/profile')}>
                        <Ionicons
                            name="person-circle-outline"
                            size={38}
                            color="#333"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons
                    name="search-outline"
                    size={22}
                    color="#777"
                />

                <TextInput
                    placeholder="Search by author..."
                    placeholderTextColor="#999"
                    style={styles.search}
                    value={searchQuery}
                    onChangeText={(text) => dispatch(setSearchQuery(text))}
                />
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
        elevation: 4,
        paddingBottom: 8,
    },

    header: {
        paddingTop: 7,
        height: 65,
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 18,
    },

    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#222",
    },

    searchContainer: {
        height: 45,
        marginHorizontal: 18,
        borderRadius: 10,
        backgroundColor: "#f2f2f2",

        flexDirection: "row",
        alignItems: "center",

        paddingHorizontal: 12,
    },

    search: {
        flex: 1,
        height: "100%",
        marginLeft: 8,
        fontSize: 16,
        color: "#222",
    },
});