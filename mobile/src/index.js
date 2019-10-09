import { StatusBar } from 'react-native'
import React from 'react'
import Routes from './routes'
export default function index()
{
    return (
        <>
            <StatusBar backgroundColor='#D83636' barStyle="light-content" />
            <Routes />
        </>
    )
}