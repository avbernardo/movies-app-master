import React, { Component } from 'react'
import ReactTable from 'react-table'
import api from '../api'
import { Checkbox } from "react-advanced-form-addons";
import {FcCheckmark} from 'react-icons/fc'
import {VscError} from 'react-icons/vsc'
import {GiDogBowl} from 'react-icons/gi'
import {ImDroplet} from 'react-icons/im'
import Blink from 'react-blink-text'
import intl from 'react-intl-universal'
import { getUserLocale } from 'get-user-locale';

import styled from 'styled-components'

import 'react-table/react-table.css'
import { createPropsObserver } from 'react-advanced-form';

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

const Label = styled.label`
    margin: 5px;
`

const Button = styled.button.attrs({
    className: `btn btn-primary`,
})`
    margin: 15px 15px 15px 5px;
`

class UpdateMovie extends Component {
    updateUser = event => {
        event.preventDefault()

        window.location.href = `/movies/update/${this.props.id}`
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
                `Do tou want to delete the movie ${this.props.id} permanently?`,
            )
        ) {
            api.deleteMovieById(this.props.id)
            window.location.reload()
        }
    }

    render() {
        return <Delete onClick={this.deleteUser}>Delete</Delete>
    }
}

class Monitor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            configuracoes: [],
            columns: [],
            isLoading: false,
            sinais : [],
            count : ''
        }
    }

    intervalID;

    componentDidMount = async () => {
        
        this.setState({ isLoading: true })

        

        this.getData()

        
        
    }

    componentWillUnmount() {
       
        clearTimeout(this.intervalID);
      }

    handleSinalRacao = async event => {
        await api.updateSinalRacao()
    }

    handleSinalAgua = async event => {
        await api.updateSinalAgua()
    }

    getData = async () =>{

        await api.getConfiguracaoAtiva(localStorage.getItem('@remote-feeder/id')).then(configuracoes => {
            this.setState({
                configuracoes: [...configuracoes.data.data],
            })
            //this.intervalID = setTimeout(this.getData.bind(this), 5000);
        })

        await api.getSinais().then(sinais => {
            this.setState({
                sinais : [...sinais.data.data],
                isLoading: false
            })
            this.intervalID = setTimeout(this.getData.bind(this), 5000);
        })
    }

    

    
    render() {
        const { configuracoes, isLoading , sinais } = this.state
        let horario
        let quantidade
        let peso_racao
        let peso_agua
        let reabastecer_agua
        let reabastecer_racao
        let alimentado
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
            noconfig : intl.get('noconfig'),
            ativarconfig : intl.get('ativarconfig')
        }

        console.log(texto.reabastecer_agua)
    
        if(sinais[0]){
            peso_racao = sinais[0].peso_racao
            peso_agua = sinais[0].peso_agua
            alimentado = sinais[0].alimentado 
            if(getUserLocale()=='en-US'){
                peso_racao = peso_racao/28.3494
                peso_agua = peso_agua/28.3494
              }
              if(peso_racao % 1 !== 0){
                peso_racao = peso_racao.toFixed(2)
              }
              if(peso_agua % 1 !== 0){
                peso_agua = peso_agua.toFixed(2)
              }
        }

        if(sinais[0]){
        if(sinais[0].reabastecer_racao){
            
            reabastecer_racao = sinais[0].reabastecer_racao
        }

        if(sinais[0].reabastecer_agua){
            
            reabastecer_agua = sinais[0].reabastecer_agua
        }

        if(sinais[0].alimentado){
            
            alimentado = sinais[0].alimentado
        }}

        if (configuracoes[0]){
        horario = (configuracoes[0].horario_quantidade_alimentacao.map(qtal => qtal.horario_alimentacao))
        quantidade = (configuracoes[0].horario_quantidade_alimentacao.map(qtal => qtal.quantidade_alimentacao))
        }
        if (horario)
            horario.sort()

        const columns = [
            
            {
                Header: texto.nome,
                width : 150,
                accessor: 'nome_configuracao',
                Cell : row => <div style={{ textAlign: "center" }}>{row.value}</div>
            },
            {
                Header: texto.horários,
                accessor: 'alimentado',
                Cell: props => <div style = {{textAlign : "center"}}><span>{horario.join(' - ') }</span></div> 
                //Cell : row => <div style={{ textAlign: "center" }}>{row.value}</div>
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
        ]
        const columns1 = [
            
            {
                
                width : 150,
            },
            {

                accessor: 'alimentado',
                Cell: function(props){
                        return(
                          
                               <div style = {{textAlign : "center"  , margin : "10px"}}>
                                   {configuracoes[0].alimentado.map(al => al  ? 
                               <FcCheckmark size = {20}/>
                                   : 
                               <VscError size = {20} style = {{color : "red"}}/>
                               )}
                               
                               </div>
                           
                        )
                },
            },
            {
                
            },
            {
                width : 150,
               
            },  
        ]

        const columns2 = [
            
            {
                Header: texto.qtd_racao,
                accessor: 'nome_configuracao',
                Cell : row => <div style={{ textAlign: "center" }}>{peso_racao}</div>
                
            },
            {
                Header: texto.qtd_agua,
                accessor: 'nome_configuracao',
            Cell : row => <div style={{ textAlign: "center" }}>{peso_agua}</div>
               
            },
            
             
        ]

        const columns3 = [

 
            {
                
                Cell: function(props){
                    if(reabastecer_racao === true){
                        return(
                        <div style = {{textAlign : 'center'}}>
                            <Blink color = "red" text = {texto.reabastecer_racao} fontSize = '20px'></Blink>
                         </div> 
                        )
                    }else{
                        return(
                            <div></div> 
                        )
                    }
                    
                },
               
            },
            {
                
                acessor: 'movimento_agua',
               
                Cell: function(props){
                    if(reabastecer_agua === true){
                        return(
                        <div style = {{textAlign : 'center'}}>
                            <Blink color = "red" text = {texto.reabastecer_agua} fontSize = '20px'></Blink>
                         </div> 
                        )
                    }else{
                        return(
                            <div></div> 
                        )
                    }
                    
                },
               
            },

        ]

        let showTable = true
        if (!configuracoes.length) {
            showTable = false
        }
        if(localStorage.getItem('@remote-feeder/id')){
            if(configuracoes.length){
        return (
            
            <Wrapper>
                {showTable && (
                    <div style = {{margin : "0% 19.1% 0% 19.1%"}}>
                    <ReactTable
                        data={configuracoes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                    />
                    </div>
                )}
          
                {showTable && (
                    <div style = {{margin : "0% 19.1% 5% 19.1%"}}>
                    <ReactTable
                        data={configuracoes}
                        columns={columns1}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                        showHeaders = {false}
                    />
                    </div>
                )}
                
                
                {showTable && (
                    <div style = {{margin : "0% 19.1% 0% 19.1%"}}>
                    <ReactTable
                        data={configuracoes}
                        columns={columns2}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                        showHeaders = {false}
                    />
                    </div>
                )}

                {showTable && (
                    <div style = {{margin : "0% 19.1% 5% 19.1%"}}>
                    <ReactTable
                        data={configuracoes}
                        columns={columns3}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                        showHeaders = {false}
                    />
                    </div>
                )}
                
                <div style = {{textAlign : "center"}}>
                <button style = {{borderRadius : "10px", background : "#e0e0e0" , border : "none" , padding : "1% 1%"}} onClick = {() => this.handleSinalRacao()} >{texto.despejar_racao}<GiDogBowl style = {{color : "#c6a700"}} size = {50} /></button>
                <button style = {{borderRadius : "10px", background : "#e0e0e0" , border : "none" , padding : "1% 1%" , marginLeft : "1%"}} onClick = {() => this.handleSinalAgua()}>{texto.despejar_agua}<ImDroplet style = {{color : "#0069c0"}} size = {50}/></button>
                </div>
          
                
              
        
            </Wrapper>
            
        )}
    else{
        return(
        <div style = {{textAlign : 'center'}}>
                            <Label style = {{fontSize : "30px"}}>{texto.noconfig}</Label>
                            <div>
        <Button onClick={() => window.location.href = '/configuracoes/list'}>{texto.ativarconfig}</Button>
                            </div>
                         </div> )
    }}else{
            
            window.location.href = '/'
        }
    }
}

export default Monitor
