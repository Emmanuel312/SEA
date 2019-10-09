import React from 'react'
import { Container,Message,TimeView,TimeText,ContentText,ContentView } from './styles'

export default function({ time,content,owner })
{
    
    return (
        <Container owner={owner} >
            <Message owner={owner}>
                <TimeView>
                    <TimeText>{time}</TimeText>
                </TimeView>

                <ContentView>
                    <ContentText>{content}</ContentText>
                </ContentView>
            </Message>
        </Container>
    )
}