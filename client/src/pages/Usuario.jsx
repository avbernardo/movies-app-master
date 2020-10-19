import React, { Component } from 'react'
import api from '../api'
import intl from 'react-intl-universal'


import styled from 'styled-components'

const Title = styled.h1.attrs({
    className: 'h1',
})``

const Wrapper = styled.div.attrs({
    className: 'form-group',
})`
    margin: 0 30px;
`

const Label = styled.label`
    margin: 5px;
`

const InputText = styled.input.attrs({
    className: 'form-control',
})`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class Usuario extends Component {
    constructor(props) {
        super(props)

        this.state = {
            usuario: '',
            senha: '',
        }
    }

    handleChangeInputLogin = async event => {
        const usuario = event.target.value
        this.setState({ usuario })
    }

    handleChangeInputSenha = async event => {
        const senha = event.target.value
        this.setState({ senha })
    }

    handleIncludeUsuario = async () => {
        const { usuario, senha } = this.state

        const payload = { usuario , senha }
        console.log(payload)
        await api.insertUsuario(payload).then(res => {
            window.alert(`Usuário inserido com sucesso`)
            this.setState({
                usuario: '',
                senha: '',
            })
        })
    }

    render() {
        const { usuario , senha } = this.state
        let texto
        texto = {
            criarUsuario : intl.get('criarUsuario'),
            senha : intl.get('senha'),
            adicionarUsuario : intl.get('adicionarUsuario')
          
        }
        if(localStorage.getItem('@remote-feeder/id')){
        return (
            
            <Wrapper>
                <div style = {{margin : "0% 19.1% 5% 19.1%"}}>
                <Title>{texto.criarUsuario}</Title>

                <Label>Login: </Label>
                <InputText
                    type="text"
                    value={usuario}
                    onChange={this.handleChangeInputLogin}
                />

                <Label>{texto.senha}:</Label>
                <InputText
                    type="password"
                    // step="0.1"
                    // lang="en-US"
                    // min="0"
                    // max="10"
                    // pattern="[0-9]+([,\.][0-9]+)?"
                    value={senha}
                    onChange={this.handleChangeInputSenha}
                />

            <Button onClick={this.handleIncludeUsuario}>{texto.adicionarUsuario}</Button>
                </div>
            </Wrapper>
        )}else{
            window.location.href = '/'
          }
    }
}

export default Usuario