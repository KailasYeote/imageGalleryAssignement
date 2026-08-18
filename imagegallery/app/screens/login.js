import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from '../redux/userSlice'
import { useRouter } from "expo-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogin = async () => {
        const loginData = {
            email,
            password,
        };

        const resultAction = await dispatch(userLogin(loginData));
        if (userLogin.fulfilled.match(resultAction)) {
            router.replace('/component/Home');
        }
    };
    const { error, loading } = useSelector((state) => state.users || {})
    useEffect(() => {
        console.log("error occured during the login", error)
        console.log("loading status", loading)

    }, [dispatch, userLogin])

    const handleRegister = () => {
        router.push('/screens/register')
    };

    return (
        <View style={styles.container}>

            <View style={styles.form}>

                <Text style={styles.title}>
                    Welcome Back
                </Text>

                <Text style={styles.subtitle}>
                    Login to your account
                </Text>

                {error ? (
                    <Text style={styles.errorText}>
                        {typeof error === 'string' ? error : 'An error occurred during login'}
                    </Text>
                ) : null}

                <Text style={styles.label}>
                    Email
                </Text>

                <TextInput
                    placeholder="Enter your email"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                <Text style={styles.label}>
                    Password
                </Text>

                <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#999"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={handleLogin}
                >
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </TouchableOpacity>

                <View style={styles.registerContainer}>

                    <Text style={styles.registerText}>
                        Don't have an account?
                    </Text>

                    <TouchableOpacity onPress={handleRegister}>
                        <Text style={styles.registerButton}>
                            Register
                        </Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },

    form: {
        padding: 20,
    },

    title: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#222",
    },

    subtitle: {
        fontSize: 16,
        color: "#777",
        textAlign: "center",
        marginTop: 8,
        marginBottom: 20,
    },

    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 15,
        fontSize: 14,
    },

    label: {
        fontSize: 15,
        fontWeight: "600",
        color: "#333",
        marginBottom: 6,
    },

    input: {
        height: 50,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        paddingHorizontal: 14,
        fontSize: 16,
        marginBottom: 18,
    },

    button: {
        height: 50,
        backgroundColor: "#222",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
    },

    buttonText: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold",
    },

    registerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },

    registerText: {
        fontSize: 15,
        color: "#666",
    },

    registerButton: {
        fontSize: 15,
        color: "#222",
        fontWeight: "bold",
        marginLeft: 5,
    },
});