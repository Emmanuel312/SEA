import React, { useState } from 'react'
import { Container,Logo,WelcomeText,InfoText,StartButton,StartButtonText,Loading } from './styles'
import AsyncStorage from '@react-native-community/async-storage'
import api from '../../services/api'

export default function start(props) {

    const [ loading,setLoading ] = useState(false)     

    async function handleStart()
    {
        try
        {
            setLoading(true)
            const { data } = await api.get('start')
            setLoading(false)
            await AsyncStorage.setItem('@token', data.token)
            props.navigation.navigate('Chat')

        }
        catch(err)
        {
            console.log(err.request)
            setLoading(false)
        }
    }

    return (
        <Container>
            <Logo> 
                <WelcomeText>Welcome to SEA</WelcomeText>
                <InfoText>Sua assistente pessoal que envia email</InfoText> 
            </Logo>
            {loading? 
                <Loading /> : 
                <StartButton onPress={handleStart}>
                    <StartButtonText>Start</StartButtonText>
                </StartButton> }

        </Container>
    )
}
