import React, {
    useEffect,
    useState
} from 'react'
import { View, SafeAreaView, FlatList, Image, Text, Modal, Alert, Pressable } from 'react-native'
import { styles } from '../Profile/style';
import Posts from '../Profile/Posts';
import contactData from '../../mocks/contact.json'
import { modalStyles } from './styles'
import QRCode from 'react-native-qrcode-svg';


export default function SuggestedProfileScreen(props: any) {
    let logoFromFile = require('../../assets/images/auroraLogo.png');

    const [userProfile, setUserProfile] = useState<any>();
    const [modalVisible, setModalVisible] = useState(false);

    const { posts } = contactData
    const { profile } = props.route.params

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
                        <Text
                            style={{ color: 'blue' }}
                            onPress={() => setModalVisible(true)}
                        >{getHandle() ?? ""}</Text>
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
            // console.log('current profile = ', JSON.stringify(profile))
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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <QRCode
                            size={200}
                            value={profile.handle}
                            logo={logoFromFile}
                            logoBackgroundColor={"#308219"}
                        />


                        <Pressable
                            style={[modalStyles.button, modalStyles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={modalStyles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}


