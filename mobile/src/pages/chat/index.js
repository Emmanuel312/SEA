import React, { useEffect,useState } from 'react'
import { Container,Header,SeaText,InputWrapper,SeaView,Footer,Body,ScrollMessage,TypeMessage,Input } from './styles'
import Message from '../../components/message'
import Icon from 'react-native-vector-icons/Ionicons'

export default function chat()
{
    //const [ messages,setmessages ] = useState([])
    const [ input,setInput ] = useState('')

    const messages = 
    [
        
        {
            time: '12:30',
            text: 'Minha mensagem 1 adas das ds ad asd as as d asd as da da das d a  das d  asdasd asd as das da',
            owner: 'SEA'
        },
        
        {
            time: '12:31',
            text: 'Mensagem do SEA 1',
            owner: 'ME'
        },
        {
            time: '12:30',
            text: 'Minha mensagem 1 adas das ds ad asd as as d asd as da da das d a  das d  asdasd asd as das da',
            owner: 'SEA'
        },
        
        {
            time: '12:31',
            text: 'Mensagem do SEA 1',
            owner: 'ME'
        },
       
        
    ]

    function renderItem({ item })
    {
        return (
            <Message time={item.time} owner={item.owner} content={item.text} />
        )
    }
    function handleSubmit()
    {
        setInput('')
    }

    return (
        <Container>
            <Header>
                <SeaView>
                    <SeaText>S.E.A.</SeaText>
                </SeaView>

                <Footer />

               
            </Header>

            <Body>
                <ScrollMessage data={messages} renderItem={renderItem} keyExtractor={(item,index) => String(index) } />

                

                <TypeMessage>
                    <InputWrapper>
                        <Input value={input} onChangeText={setInput} onSubmitEditing={handleSubmit} />
                        <Icon name="md-send" size={20} color="#151515"/>
                    </InputWrapper>
                </TypeMessage>
            </Body>
        </Container>
    )
}
