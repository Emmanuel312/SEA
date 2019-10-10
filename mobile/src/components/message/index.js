import React from 'react'
import { Container,Message,TimeView,TimeText,ContentText,ContentView } from './styles'

export default function({ time,content,owner })
{
    const timeAjusted = `${time.split(':')[0]}:${time.split(':')[1]}`

    return (
        <Container owner={owner} >
            <Message owner={owner}>
                <TimeView>
                    <TimeText>{timeAjusted}</TimeText>
                </TimeView>

                <ContentView>
                    <ContentText>{content}</ContentText>
                </ContentView>
            </Message>
        </Container>
    )
}