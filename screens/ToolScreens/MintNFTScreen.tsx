import React, { useState } from 'react';
import { Button, Image, Platform, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import FormData from 'form-data'
import { Buffer } from "buffer";

const tokenAPI =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFlNzZjQUQwYWRlZkZkMjcwNkY0NTI2NDNDNDYzMDk0YTRkZjMxOUIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NDQ3MTMxNTgyNCwibmFtZSI6ImV0aEJvZ290YTIwMjIifQ.-sMKEDPb7d13EUZ-9NEQLrTn1S8eRhVlCCFgV0V6CSA'


export default function MintNFTScreen() {
    const [image, setImage] = useState<string>();
    const [imageBase64, setImageBase64] = useState<string>();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            base64: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
            setImageBase64(result.base64)
        }
    };

    const uploadImage = async () => {
        
        const filename = getName();

        const buffer = Buffer.from(imageBase64 ?? '', "base64");
        // const blob = new Blob([buffer], { type: 'image/jpg' }) // we can do blobs too.
        const type = 'image/jpg'

        const imageUri = image ?? '';

        const file = {
            uri: Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri,             // e.g. 'file:///path/to/file/image123.jpg'
            name: `${filename}.jpg`,            // e.g. 'image123.jpg',
            type             // e.g. 'image/jpg'
          }

        let data = new FormData();
        data.append('file', file, {
            header: {
                'Content-Disposition': `form-data; name="file"; filename=${filename}.jpg`,
                'Content-Type': 'image/jpg'
            }
        });

        console.log("the name: " + filename);

        try { 
            const resp = await axios.post("https://api.nft.storage/upload", data, {
                headers: {
                    'Accept': 'application/json',
                    // 'Accept': 'application/octet-stream',
                    "Authorization": `Bearer ${tokenAPI}`,
                    'Content-Type': 'multipart/form-data',
                    // "Content-Disposition:": `form-data; name="file"; filename=${filename}`
                }
            });

            console.log("response: " + JSON.stringify(resp))
        }
        catch (e) {
            console.log('error:uploadImage: '+ e);
        }

    }

    const storeMetadataNFT = async () => {

        const api = 'https://api.nft.storage/store';
        const name = getName();

        const meta = {
            "name": name,
            "image": image,
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
            {image && <Button title="Store Metadata" onPress={storeMetadataNFT} />}
            {image && <Button title="Upload image" onPress={uploadImage} />}
            {image && <Button title="Mint NFT" onPress={()=>{}} />}
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        </View>
    );

    function getName() { 
        const lastWord = image?.split('/') ?? [];
        const length = lastWord?.length ?? 0;
        console.log("File: " + image);

        let name = lastWord[length - 1] ?? 'noName';

        const reg = /.(jpg|jpeg)/g;
        name = name.replace(reg, '');
        name = `${name}-${Date.now().toString()}`
        console.log("Metaname: " + name);
        return name;
    }
}