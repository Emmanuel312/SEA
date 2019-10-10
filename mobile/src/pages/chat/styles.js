import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
`

export const Header = styled.View`
    flex: 2;
    background-color: #D83636;
`

export const SeaView = styled.View`
    flex: 7;
    justify-content: flex-end;
    align-items: center;
`
export const SeaText = styled.Text`
    font-size: 24px;
    color: #fff;
    margin-bottom: 15px;
`


export const Footer = styled.View`
   flex: 3;
   background-color: #fff;
   border-top-left-radius: 55px;
   border-top-right-radius: 55px;
`

export const Body = styled.View`
    flex: 9;
    background-color: #fff;
`

export const ScrollMessage = styled.FlatList`
    flex: 8;
    background-color: #fff;
`

export const TypeMessage = styled.View`
    flex: 1;
    background-color: #fff;
    padding: 10px;
    justify-content: center;
    align-items: center;
`

export const InputWrapper = styled.View`
    width: 100%;
    background-color: #FFF5E2;
    border-radius: 30px;
    padding: 0 20px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    position: absolute;
`

export const Input = styled.TextInput.attrs({placeholder:'Type your message...',placeholderTextColor: '#707070'})
`
`

export const RecordView = styled.TouchableOpacity`
`
