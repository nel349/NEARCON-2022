import React, { useState } from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data'

export default function MintNFTScreen() {
    const [image, setImage] = useState<string>();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    const mint_nft = async () => {

        const api = 'https://api.nft.storage/store';
        const tokenAPI =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFlNzZjQUQwYWRlZkZkMjcwNkY0NTI2NDNDNDYzMDk0YTRkZjMxOUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDQ3MTMxNTgyNCwibmFtZSI6ImV0aEJvZ290YTIwMjIifQ.-sMKEDPb7d13EUZ-9NEQLrTn1S8eRhVlCCFgV0V6CSA'

        // const metaName = `${image}${Date.now().toString()}`;

        const lastWord = image?.split('/') ?? [];
        const length = lastWord?.length ?? 0;
        let name = lastWord[length - 1] ?? 'noName';

        const reg = /.(jpg|jpeg)/g;
        name = name.replace(reg, '');
        name = `${name}-${Date.now().toString()}`
        console.log("Metaname: " + name);

        const meta = {
            "name": name,
            "image": "https://ipfs.io/ipfs/bafkreidivzimqfqtoqxkrpge6bjyhlvxqs3rhe73owtmdulaxr5do5in7u",
            "properties": {
                "videoClip": null
            }
        };

        let data = new FormData();
        data.append('meta', JSON.stringify(meta));

        let response;

        try { 
            response = await axios.post(api, data, {
                headers: {
                    "Authorization": `Bearer ${tokenAPI}`,
                    'Content-Type': "multipart/form-data",
                    'Accept': 'application/json'
                }
            });

            console.log("response: " + JSON.stringify(response));
        } catch (e) {
            console.log('error: ' + e)
        }
    };


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {image && <Button title="Mint NFT" onPress={mint_nft} />}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        </View>
    );
}