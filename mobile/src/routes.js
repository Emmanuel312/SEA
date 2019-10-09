import { createAppContainer,createSwitchNavigator } from 'react-navigation'
import Start from './pages/start'
import Chat from './pages/chat'

const root = createSwitchNavigator(
{
    Chat,
    Start,
})

export default createAppContainer(root)