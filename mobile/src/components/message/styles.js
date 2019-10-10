import styled from 'styled-components/native'

export const Container = styled.View`
    margin-top: 20px;
    align-items: ${props => props.owner === 'SEA'? 'flex-start' : 'flex-end' };
`

export const Message = styled.View`
    width: 275px;
    background-color: ${props => props.owner === 'SEA'? '#FFE7E6' : '#FFF5E2'};
    padding: 15px;
    borderBottomLeftRadius: ${props => props.owner === 'SEA'? 0: 30};
    borderBottomRightRadius: ${props => props.owner === 'SEA'? 30: 0};
    borderTopLeftRadius: ${props => props.owner === 'SEA'? 0: 30};
    borderTopRightRadius: ${props => props.owner === 'SEA'? 30: 0};
`


export const TimeView = styled.View`
    padding: 5px;
`



export const TimeText = styled.Text`
   color: #707070;
   font-size: 14px;
`



export const ContentView = styled.View`
   padding: 5px;
`

export const ContentText = styled.Text`
    color: #151515;
    font-size: 14px;
`

