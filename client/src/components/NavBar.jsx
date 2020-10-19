import React, { Component } from 'react'
import styled from 'styled-components'

import Logo from './Logo'
import Links from './Links'

const Container = styled.div.attrs({
    className: 'container',
})`
    height: 200%;
    width : 100%;
    margin : 0.5%;
    backgroud-color : black;
 

`

const Nav = styled.nav.attrs({
    className: 'navbar navbar-expand-lg navbar-light',
})`
    margin-bottom: 2%;
    background-color : white !important;
    width : 100%;
    text-color : black; 
    border : solid 1px;
`

class NavBar extends Component {
    render() {
        return (
            <Container>
                <Nav>
                    <Logo />
                    <Links />
                </Nav>
            </Container>
        )
    }
}

export default NavBar
