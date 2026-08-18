import { View } from 'react-native'
import Header from '../screens/header'
import Images from '../screens/images'

export default function Home() {
    return (
        <View style={{ flex: 1 }}>
            <Header />
            <Images />
        </View>
    )
}
