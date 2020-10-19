import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import { Link } from 'react-router-dom'
import {FcCheckmark} from 'react-icons/fc'
import {VscError} from 'react-icons/vsc'
import styled from 'styled-components'
import intl from 'react-intl-universal'
import { getUserLocale } from 'get-user-locale';

import 'react-table/react-table.css'

const Wrapper = styled.div`
    padding: 0 40px 40px 40px;
`

const Update = styled.div`
    color: #ef9b0f;
    cursor: pointer;
`

const Delete = styled.div`
    color: #ff0000;
    cursor: pointer;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/configuracoes/update/${this.props.id}`
    }

    render() {
        return <Update onClick={this.updateUser}>Update</Update>
    }
}

class DeleteMovie extends Component {
    deleteUser = event => {
        event.preventDefault()

        if (
            window.confirm(
                `Você quer deletar a configuração ${this.props.id} permanemtemente?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        let texto
        texto = {
            deletar : intl.get('deletar')
        }
    return <Delete onClick={this.deleteUser}>{texto.deletar}</Delete>
    }
}

class AtivaConfig extends Component {
    ativaConfig = event => {
        event.preventDefault()
        
            api.ativaConfig(this.props.id,this.props.user)
            window.location.reload()
    }

    render() {
        let texto
        texto = {
            ativar : intl.get('ativar')
        }
    return <Update onClick={this.ativaConfig}>{texto.ativar}</Update>
    }
}

class ConfiguracoesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            configuracoes: [],
            columns: [],
            isLoading: false,
        }
    }

    componentDidMount = async () => {
        this.setState({ isLoading: true })

        await api.getAllConfiguracoes(window.localStorage.getItem('@remote-feeder/id')).then(configuracoes => {
            console.log(configuracoes)
            this.setState({
                configuracoes: configuracoes.data.data,
                isLoading: false,
            })
        })
    }

   

    render() {
        const { configuracoes, isLoading } = this.state
        let texto
        texto = {
            qtd_racao : intl.get('qtd_racao'),
            qtd_agua : intl.get('qtd_agua'),
            despejar_agua : intl.get('despejar_agua'),
            despejar_racao : intl.get('despejar_racao'),
            reabastecer_agua : intl.get('reabastecer_agua'),
            reabastecer_racao : intl.get('reabastecer_racao'),
            nome : intl.get('nome'),
            horários : intl.get('horários'),
            quantidade : intl.get('quantidade'),
            movimento_agua : intl.get('movimento_agua'),
            ativo : intl.get('ativo'),
            novaconfig : intl.get('novaconfig')
        }
    

        const columns = [
            {
                Header: texto.nome,
                width : 150,
                accessor: 'nome_configuracao',
                Cell : row => <div style={{ textAlign: "center" }}>{row.value}</div>,
            
            },
            {
                Header: texto.horários,
                accessor: 'alimentacao',
                
                Cell: row => <div style = {{textAlign : "center"}}><span>{(configuracoes[row.index].horario_quantidade_alimentacao.map(qtal => qtal.horario_alimentacao)).join(' - ')}</span></div>, 
            },
            {
                Header: texto.quantidade,
                accessor: 'alimentacao',
                
                Cell: row => <div style = {{textAlign : "center"}}><span>{(configuracoes[row.index].horario_quantidade_alimentacao.map(function(qtal){var aux =(qtal.quantidade_alimentacao)
                    if(getUserLocale()=='en-US'){
                      aux = aux/28.3494
                    }
                    if(aux % 1 !== 0){
                        aux = aux.toFixed(2)
                    }
                  return aux})).join(' - ')}</span></div>, 
            },
            {
                Header: texto.movimento_agua,
                acessor: 'movimento_agua',
                width : 150,
                Cell: function(props){
                    if(props.original.movimento_agua === true){
                        return(
                            <div style = {{textAlign : "center"}}><FcCheckmark size = {20}/></div> 
                        )
                    }else{
                        return(
                            <div style = {{textAlign : "center"}}><VscError size = {20} style =  {{color : "red"}}/></div> 
                        )
                    }
                    
                },
               
            },

            {
                Header: texto.ativo,
                accessor: 'ativo',
                width : 60,
                Cell: function(props){
                    if(props.original.ativo === true){
                        return(
                            <div style = {{textAlign : "center"}}> <FcCheckmark size = {20}/></div> 
                        )
                    }else{
                        return(
                            <div style = {{textAlign : "center"}}><VscError size = {20} style =  {{color : "red"}}/></div> 
                        )
                    }
                    
                },
            },  
           
                              
                               
            {
                Header: '',
                accessor: '',
                width : 70,
                Cell: function(props) {
                    return (
                        <div style = {{textAlign : "center"}}>
                        <span>
                            <DeleteMovie id={props.original._id} />
                        </span>
                        </div>
                    )
                },
            },
            {
                Header: '',
                accessor: '',
                width : 70,
                Cell: function(props) {
                    return (
                        <div style = {{textAlign : "center"}}>
                        <span>
                            <AtivaConfig id={props.original._id} user = {localStorage.getItem('@remote-feeder/id')} nome = {props.original.nome_configuracao} />
                        </span>
                        </div>
                    )
                },
            },
        ]

        let showTable = true
        if (!configuracoes.length) {
            showTable = false
        }
        if(localStorage.getItem('@remote-feeder/id')){
        return (
            <Wrapper>
                {showTable && (
                    <div style = {{margin : "0% 19.1% 5% 19.1%"}}>
                    <ReactTable
                        data={configuracoes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={20}
                        showPageSizeOptions={true}
                        minRows={0}
                        showPagination={false}
                        showHeaders = {false}
                    />
                    </div>
                )}
                <div style = {{textAlign : "center"}}>
            <Link to="/configuracoes/create">
                <Button renderAs="button">
                <span>{texto.novaconfig}</span>
                </Button>
            </Link>
            </div>

            </Wrapper>
           
        )}else{
            window.location.href = '/'
        }
    }
}

export default ConfiguracoesList