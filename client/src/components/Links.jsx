import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import intl from 'react-intl-universal'


const Collapse = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

const List = styled.div.attrs({
    className: 'navbar-nav mr-auto',
})``

const Item = styled.div.attrs({
    className: 'collpase navbar-collapse',
})``

function limpa(){
    window.localStorage.clear()
    recarrega()
}

function recarrega(){
    window.location.reload()
}



class Links extends Component {
    render() {

    let texto
    texto = {
    monitor : intl.get('monitor'),
    configuracao : intl.get('configuracao'),
    recomendacoes : intl.get('recomendacoes'),
    usuario : intl.get('usuario'),
    sair : intl.get('sair'),
    ola : intl.get('ola')
    }   
        return (
            <React.Fragment>
                <Link className="navbar-brand">
                    Remote Feeder
                </Link>
                <Collapse>
                    <List>
                        <Item>
                            <Link to="/monitor" className="nav-link">
                                {texto.monitor}
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/configuracoes/list" className="nav-link">
                                {texto.configuracao}
                            </Link>
                        </Item>
                        <Item>
                            <Link to="/recomendacoes" className="nav-link">
                                {texto.recomendacoes}
                            </Link>
                        </Item>
                        <Item>
                        <Link to="/usuario" className="nav-link">
                                {texto.usuario}
                            </Link>
                        </Item>
                        <Item>
                        <Link to="/" className="nav-link" onClick = {limpa}>
                                {texto.sair}
                            </Link>
                        </Item>
            
                        
                        <Item style = {{position : "absolute" , marginLeft : "65%" , marginTop : "1%"}}> 
                            {texto.ola}{window.localStorage.getItem('@remote-feeder/usuario')}
                        </Item>
   
           
                    </List>
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Links
