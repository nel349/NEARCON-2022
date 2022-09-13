import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import SelectDropdown from 'react-native-select-dropdown'
const width = Dimensions.get('window').width;
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CredentialSectionComponent } from '../ExploreProfiles/CredentialSectionComponent';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ConnectScreen = () => {
    const networks = [
        'NEAR Testnet',
        'NEAR Mainnet',
        'Aurora Mainnet',
        'Aurora Testnet',
        'Ethereum Mainnet',
        'Ethereum Goerli',
        'Polygon Mainnet',
        'Polygon Mumbai',
    ];

    const renderHeader = () => {
        return (
            <>
                <View style={[styles.header, styles.shadow]}>
                    <Text style={styles.headerTitle}>{'Network Options'}</Text>
                </View>
            </>

        );
    };

    return (
        <SafeAreaView style={styles.saveAreaViewContainer}>
            <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
            <View style={styles.viewContainer}>
                {renderHeader()}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                    contentContainerStyle={styles.scrollViewContainer}>
                    <SelectDropdown
                        data={networks}
                        // defaultValueByIndex={1}
                        defaultValue={'Aurora Testnet'}
                        onSelect={async (selectedItem, index) => {
                            console.log(selectedItem, index);
                            await AsyncStorage.setItem('currentChain', JSON.stringify({chain:selectedItem}))
                        }}
                        defaultButtonText={'Select network'}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        buttonStyle={styles.dropdown2BtnStyle}
                        buttonTextStyle={styles.dropdown2BtnTxtStyle}
                        renderDropdownIcon={isOpened => {
                            return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#FFF'} size={18} />;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown2DropdownStyle}
                        rowStyle={styles.dropdown2RowStyle}
                        rowTextStyle={styles.dropdown2RowTxtStyle}
                    />
                </ScrollView>
            </View>

            <CredentialSectionComponent/>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },
    header: {
        flexDirection: 'row',
        width,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F6F6F6',
    },
    headerTitle: { color: '#000', fontWeight: 'bold', fontSize: 16 },
    saveAreaViewContainer: { flex: 1, backgroundColor: '#FFF' },
    viewContainer: { flex: 1, width, backgroundColor: '#FFF' },
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: '10%',
        paddingBottom: '20%',
    },

    dropdown1BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown1DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left' },

    dropdown2BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#444',
        borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#444',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
    },
    dropdown2RowStyle: { backgroundColor: '#444', borderBottomColor: '#C5C5C5' },
    dropdown2RowTxtStyle: {
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },

    dropdown3BtnStyle: {
        width: '80%',
        height: 50,
        backgroundColor: '#FFF',
        paddingHorizontal: 0,
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#444',
    },
    dropdown3BtnChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdown3BtnImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3BtnTxt: {
        color: '#444',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 12,
    },
    dropdown3DropdownStyle: { backgroundColor: 'slategray' },
    dropdown3RowStyle: {
        backgroundColor: 'slategray',
        borderBottomColor: '#444',
        height: 50,
    },
    dropdown3RowChildStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 18,
    },
    dropdownRowImage: { width: 45, height: 45, resizeMode: 'cover' },
    dropdown3RowTxt: {
        color: '#F1F1F1',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 24,
        marginHorizontal: 12,
    },

    dropdown4BtnStyle: {
        width: '50%',
        height: 50,
        backgroundColor: '#FFF',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#444',
    },
    dropdown4BtnTxtStyle: { color: '#444', textAlign: 'left' },
    dropdown4DropdownStyle: { backgroundColor: '#EFEFEF' },
    dropdown4RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    dropdown4RowTxtStyle: { color: '#444', textAlign: 'left' },
});


