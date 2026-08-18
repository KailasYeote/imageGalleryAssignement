import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
    Alert,
    ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, clearError } from "../redux/userSlice"; // Add clearError action if available
import { useRouter } from "expo-router";
import { Picker } from "@react-native-picker/picker";

export default function Register() {
    const router = useRouter();
    const dispatch = useDispatch();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("male");
    const [mobileNumber, setMobileNumber] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { loading } = useSelector((state) => state.users || {});

    // Reset errors when component loads
    useEffect(() => {
        if (clearError) {
            dispatch(clearError());
        }
    }, [dispatch]);

    const handleRegister = async () => {
        const trimmedFullName = fullName.trim();
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        const trimmedConfirmPassword = confirmPassword.trim();

        if (!trimmedFullName || !trimmedEmail || !trimmedPassword) {
            Alert.alert("Validation Error", "Please fill in all required fields.");
            return;
        }

        if (trimmedPassword !== trimmedConfirmPassword) {
            Alert.alert("Validation Error", "Passwords do not match.");
            return;
        }

        const userData = {
            fullName: trimmedFullName,
            email: trimmedEmail,
            gender,
            mobileNumber: mobileNumber.trim(),
            address: address.trim(),
            city: city.trim(),
            password: trimmedPassword,
            confirmPassword: trimmedConfirmPassword,
        };
        try {
            await dispatch(userRegister(userData)).unwrap();

            Alert.alert("Success", "Account created successfully!", [
                {
                    text: "OK",
                    onPress: () => router.replace("/component/Home"),
                },
            ]);
        } catch (err) {
            const errorMessage =
                typeof err === "string"
                    ? err
                    : err?.message || "Registration failed. Please try again.";
            Alert.alert("Registration Error", errorMessage);
            console.error("Registration error:", err);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.form}>
                <Text style={styles.title}>Create Account</Text>

                <Text style={styles.label}>Full Name</Text>
                <TextInput
                    placeholder="Enter full name"
                    style={styles.input}
                    value={fullName}
                    onChangeText={setFullName}
                />

                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Enter email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Gender</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Other" value="other" />
                    </Picker>
                </View>

                <Text style={styles.label}>Mobile Number</Text>
                <TextInput
                    placeholder="Enter mobile number"
                    style={styles.input}
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    keyboardType="phone-pad"
                />

                <Text style={styles.label}>Address</Text>
                <TextInput
                    placeholder="Enter address"
                    style={[styles.input, styles.textArea]}
                    value={address}
                    onChangeText={setAddress}
                    multiline
                />

                <Text style={styles.label}>City</Text>
                <TextInput
                    placeholder="Enter city"
                    style={styles.input}
                    value={city}
                    onChangeText={setCity}
                />

                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter password"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    placeholder="Confirm password"
                    style={styles.input}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />

                <TouchableOpacity
                    style={[styles.button, loading && styles.buttonDisabled]}
                    onPress={handleRegister}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.buttonText}>Register</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    form: {
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 25,
        color: "#222",
    },
    label: {
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 6,
        color: "#333",
    },
    input: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 14,
        marginBottom: 15,
        fontSize: 16,
    },
    pickerContainer: {
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        marginBottom: 15,
        justifyContent: "center",
    },
    textArea: {
        height: 90,
        paddingTop: 12,
        textAlignVertical: "top",
    },
    button: {
        height: 50,
        backgroundColor: "#222",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 30,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },
});