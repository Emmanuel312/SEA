import React from 'react'
import { Container,Logo,WelcomeText,InfoText,StartButton,StartButtonText } from './styles'

export default function start(props) {

    function handleStart()
    {
        console.log('foi')
        props.navigation.navigate('Chat')
    }

    return (
        <Container>
            <Logo> 
                <WelcomeText>Welcome to S.E.A.</WelcomeText>
                <InfoText>Sua assistente pessoal que envia email</InfoText> 
                
            </Logo>

            <StartButton onPress={handleStart}>
                <StartButtonText>Start</StartButtonText>
            </StartButton>   
        </Container>
    )
}
