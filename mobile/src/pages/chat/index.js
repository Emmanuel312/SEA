import React, { Component } from 'react'
import { Container,Header,SeaText,InputWrapper,SeaView,Footer,Body,ScrollMessage,TypeMessage,Input,RecordView } from './styles'
import Message from '../../components/message'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'
import { Player, Recorder, MediaStates } from '@react-native-community/audio-toolkit'
import { PermissionsAndroid } from 'react-native'
export default class Chat extends Component
{
    state =
    {
        messages: [],
        input: '',
        token: '',
        config: null,
        startRecord: false,
    }

    async componentDidMount()
    {
        await this.helloSEA()
    }

    helloSEA = async () =>
    {
        const token = await AsyncStorage.getItem('@token')
        this.setState({ token })

        const body = { msg: 'ola' }
        const config =
        {
            headers: 
            {
                authorization: `Bearer ${token}`
            }
        }

        this.setState({ config })
        const { data } = await api.post('conversation', body, config)
        this.setState({ messages: [...this.state.messages,data] })
    }

    

    renderItem = ({ item }) =>
    {
        return (
            <Message time={item.time} owner={item.owner} content={item.text} />
        )
    }
    
    sendEmail = async () =>
    {
        console.log('entrou')
        try
        {
            await api.post('sendEmail', this.state.messages[this.state.messages.length - 1].context, this.state.config)

        }
        catch(err)
        {
            console.log(err)
        }


        this.setState({ messages: [] })
        this.props.navigation.navigate('Start')
    }
    
    handleSubmit = async () =>
    {
        const { input } = this.state
        if(input)
        {
            const message = this.makeMsg(input)
            this.setState({ messages: [...this.state.messages,message], input: '' })
          
            const body =
            {
                msg: message.text
            }
            
            const { data } = await api.post('conversation', body , this.state.config)
            this.setState({ messages: [...this.state.messages,data] })
            
            const intents = data.intents.map(item  => item.intent).filter(intent => (intent === 'enviar_email' && data.text === 'E-mail enviado!'))
            if(intents.length)  await this.sendEmail()
        }
    }

   

    makeMsg = (msg) =>
    {
        const message = 
        {
            text: msg,
            time: String(new Date()).split(' ')[4],
            owner: 'ME'
        }
        
        return message
    }
    
    handleRecord = async () =>
    {
        this.setState({ startRecord: !this.state.startRecord })
        await this.checkPermission()
        
        if(this.state.startRecord)
        {
            this.record =  new Recorder("filename.mp3", { quality: 'max' }).record()
            
        }
        
        else
        {
            this.record.stop(async (err) => 
            {
                if(err) console.log(err)
                else
                {
                    const record = new Player("filename.mp3").play().on('ended', (data) => 
                    {
                        console.log(data)
                    })

                    const formData = new FormData()

                    formData.append('file',
                    {
                        uri: this.record._fsPath,
                        name: 'filename.mp3',
                        type: 'audio/mp3',
                    })

                    // try
                    // {
                    //     const config = 
                    //     { 
                    //         headers: 
                    //         {
                    //             'Content-Type': 'multipart/form-data'
                    //         }
                    //     }

                    //     const { data } = await api.post('conversationAudio', formData, config)
                    //     console.log(data)
                    // }
                    // catch(err)
                    // {
                    //     alert(err)
                    // }
                            
                }          
            })         
        }
    }

                
        
        
    

    async checkPermission() {
        if (Platform.OS !== 'android')
        {
            return Promise.resolve(true)
        }

        let result

        try
        {
            result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, { title:'Microphone Permission', message:'Enter the Gunbook needs access to your microphone so you can search with voice.' });
        }
        catch(error)
        {
            console.error('failed getting permission, result:', result);
        }
        console.log('permission result:', result)

        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED)
    }

    render()
    {
        return (
            <Container>

                <Header>
                    <SeaView>
                        <SeaText>SEA</SeaText>
                    </SeaView>
                    <Footer />
                </Header>
    
                <Body>
                    <ScrollMessage ref={(ref) => { this.flatListRef = ref }} onContentSizeChange={() => this.flatListRef.scrollToEnd({ animated: true })} extraData={this.state} data={this.state.messages} renderItem={this.renderItem} keyExtractor={(item,index) => String(index) } />
    
                    <TypeMessage>
                        <InputWrapper>
                            <Input value={this.state.input} onChangeText={input => this.setState({ input })} onSubmitEditing={this.handleSubmit} />
                            
                            <RecordView onPress={this.handleRecord}>
                                <Icon name="microphone" size={20} color="#151515"/>
                            </RecordView>

                        </InputWrapper>
                    </TypeMessage>
                </Body>

            </Container>
        )
    }
}

