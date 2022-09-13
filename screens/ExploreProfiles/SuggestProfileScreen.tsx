import React, {
    useEffect,
    useState
} from 'react'
import { View, SafeAreaView, FlatList, Image, Text } from 'react-native'
import { fetchDefaultProfile } from '../../lens_protocol/aurora/profiles';
import { styles } from '../Profile/style';
import Posts from '../Profile/Posts';
import contactData from '../../mocks/contact.json'


export default function SuggestedProfileScreen(props:any) {

    const [userProfile, setUserProfile] = useState<any>();

    const {posts}  = contactData
    const {profile} = props.route.params

    const renderContactHeader = () => {

        

        console.log('Profile: ' + JSON.stringify(profile))

        return (
            <View style={styles.headerContainer}>
                <View style={styles.userRow}>
                    <Image
                        style={styles.userImage}
                        source={{ uri: getCoverPicture() ?? "" }}
                    />
                    <View style={styles.userNameRow}>
                        <Text style={styles.userNameText}>{getName() ?? ""}</Text>
                    </View>
                    <View style={styles.userNameRow}>
                        <Text style={styles.userBioRow}>{getHandle() ?? ""}</Text>
                    </View>
                    <View style={styles.userBioRow}>
                        <Text style={styles.userBioText}>{"id: " + getId()}</Text>
                    </View>
                </View>
            </View>
        )
    }

    const getId = () => {
        if (profile !== undefined && profile.id !== undefined) {
            return profile.id + ""
        }
        return ""
    }
    const getCoverPicture = () => {
        return profile?.picture?.original?.url ?? 'empty'
    }

    const getHandle = () => {
        if (profile !== undefined) {
            return profile.handle
        }
        return ""
    }

    const getName = () => {
        if (profile !== undefined) {
            return profile.name
        }
        return ""
    }

    useEffect(async () => {
        // try {
        //     const profile = await fetchDefaultProfile();
        //     // console.log('current profile = ', JSON.stringify(profile))
        //     setUserProfile(profile)
        // }
        // catch (err) {

        // }

    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={[]}
                ListHeaderComponent={renderContactHeader}
                ListFooterComponent={<Posts containerStyle={styles.sceneContainer} posts={posts} />}
                renderItem={item => <View></View>}
            />
        </SafeAreaView>
    )
}


