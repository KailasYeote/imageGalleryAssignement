import { Text, TouchableOpacity, View, ScrollView, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../redux/userSlice'
import { useEffect } from 'react'
import { logout } from '../redux/userSlice'
import { useRouter } from 'expo-router'

export default function Profile() {
    const user = useSelector((state) => state.users.user)
    const dispatch = useDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logout())
        router.push('/screens/login')
    }

    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    if (!user) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Profile...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{user.fullName ? user.fullName[0].toUpperCase() : 'U'}</Text>
                </View>
                <Text style={styles.name}>{user.fullName}</Text>
                <Text style={styles.email}>{user.email}</Text>
            </View>

            <View style={styles.body}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    
                    <View style={styles.row}>
                        <Text style={styles.label}>Phone:</Text>
                        <Text style={styles.value}>{user.mobileNumber}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Gender:</Text>
                        <Text style={[styles.value, { textTransform: 'capitalize' }]}>{user.gender}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>City:</Text>
                        <Text style={styles.value}>{user.city}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Address:</Text>
                        <Text style={styles.value}>{user.address}</Text>
                    </View>
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F3F4F6'
    },
    loadingText: {
        fontSize: 18,
        color: '#6B7280'
    },
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6'
    },
    header: {
        backgroundColor: '#2563EB',
        paddingVertical: 40,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    avatarText: {
        fontSize: 40,
        color: '#2563EB',
        fontWeight: 'bold'
    },
    name: {
        color: '#fff',
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 5
    },
    email: {
        color: '#BFDBFE',
        fontSize: 16
    },
    body: {
        padding: 20
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
        elevation: 3,
        marginBottom: 20
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 10
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12
    },
    label: {
        fontSize: 16,
        color: '#6B7280',
        flex: 1
    },
    value: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
        flex: 2,
        textAlign: 'right'
    },
    logoutButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        shadowColor: '#EF4444',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 3
    },
    logoutText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold'
    }
});