import React, { Component } from 'react'
import { Container,Header,SeaText,InputWrapper,SeaView,Footer,Body,ScrollMessage,TypeMessage,Input } from './styles'
import Message from '../../components/message'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

export default class Chat extends Component
{
    state =
    {
        messages: [],
        input: '',
        token: '',
        config: null,
        
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
                            <Icon name="md-send" size={20} color="#151515"/>
                        </InputWrapper>
                    </TypeMessage>
                </Body>

            </Container>
        )
    }
}

