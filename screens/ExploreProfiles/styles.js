import { Dimensions, StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        justifyContent: 'space-between',
        marginBottom: 5,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        padding: 0,
    },
    date: {
        color: 'gray',
        fontSize: 12.5,
    },
    postRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        width: Dimensions.get('window').width * 1,
    },
    postImage: {
        backgroundColor: 'rgba(0, 0, 0, 0.075)',
        height: 200,
    },
    userImage: {
        marginRight: 12,
    },
    wordRow: {
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    wordText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 22,
    },
})


export const RecommendedProfileStyles = StyleSheet.create({
    container: {
        borderWidth: 0,
        justifyContent: 'space-between',
        marginBottom: 5,
        marginLeft: 12,
        marginRight: 12,
        marginTop: 10,
        padding: 0,
    },
    date: {
        color: 'gray',
        fontSize: 12.5,
    },
    postRow: {
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: 6,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
        width: Dimensions.get('window').width * 1,
    },
    postImage: {
        backgroundColor: 'rgba(0, 0, 0, 0.075)',
        height: 200,
    },
    userImage: {
        marginRight: 12,
    },
    wordRow: {
        marginBottom: 10,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 6,
    },
    wordText: {
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 22,
    },
})

export const flatListStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#192338",
        paddingVertical: 50,
        position: "relative"
    },
    title: {
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        marginBottom: 10
    },
    loader: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff"
    },
    list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        backgroundColor: "#192338",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1
    },
    lightText: {
        color: "#f7f7f7",
        width: 200,
        paddingLeft: 15,
        fontSize: 12
    },
    line: {
        height: 0.5,
        width: "100%",
        backgroundColor: "rgba(1,1,255,1)"
        // color: "rgba(1,1,255,1)"
    },
    icon: {
        position: "absolute",
        bottom: 20,
        width: "100%",
        left: 290,
        zIndex: 1
    },
    numberBox: {
        position: "absolute",
        bottom: 75,
        width: 30,
        height: 30,
        borderRadius: 15,
        left: 330,
        zIndex: 3,
        backgroundColor: "#e3e3e3",
        justifyContent: "center",
        alignItems: "center"
    },
    number: { fontSize: 14, color: "#000" },
    selected: { backgroundColor: "#FA7B5F" },
});