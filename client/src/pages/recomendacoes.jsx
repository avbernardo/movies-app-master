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

import styled from 'styled-components'

import 'react-table/react-table.css'
import { createPropsObserver } from 'react-advanced-form';

const Title = styled.h1.attrs({
    className: 'h1',
})``
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

class RecomendacoesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            configuracoes: [{"peso_animal" : "500g",
                                "quantidade" : "250g"},
                                {"peso_animal" : "600",
                                "quantidade" : "100g"}
                            ],
            columns: [],
            isLoading: false,
        }
    }

    

    render() {
        
        const { configuracoes, isLoading } = this.state
        let texto
        texto = {
            textoCachorro : intl.get('textoCachorro'),
            textoGato : intl.get('textoGato'),
            cao : intl.get('cao'),
            gato : intl.get('gato'),
            recomendacoespet : intl.get('recomendacoespet'),
            quantidadeRacao : intl.get('quantidadeRacao'),
            pesoAnimal : intl.get('pesoAnimal'),
            pesoCao1 : intl.get('pesoCao1'),
            pesoCao2 : intl.get('pesoCao2'),
            pesoCao3 : intl.get('pesoCao3'),
            pesoCao4 : intl.get('pesoCao4'),
            pesoCao5 : intl.get('pesoCao5'),
            quantidadeRacao : intl.get('quantidadeRacao'),
            quantidadeRacao1 : intl.get('quantidadeRacao1'),
            quantidadeRacao2 : intl.get('quantidadeRacao2'),
            quantidadeRacao3 : intl.get('quantidadeRacao3'),
            quantidadeRacao4 : intl.get('quantidadeRacao4'),
            quantidadeRacao5 : intl.get('quantidadeRacao5'),
            textoFilhote : intl.get('textoFilhote'),
            pesoFilhote80 : intl.get('pesoFilhote80'),
            pesoFilhote180 : intl.get('pesoFilhote180'),
            quantidadeFilhote1ano : intl.get('quantidadeFilhote1ano'),
            pesoFilhote1 : intl.get('pesoFilhote1'),
            pesoFilhote2 : intl.get('pesoFilhote2'),
            pesoFilhote3 : intl.get('pesoFilhote3'),
            pesoFilhote4 : intl.get('pesoFilhote4'),
            pesoFilhote5 : intl.get('pesoFilhote5'),
            quantidade801 : intl.get('quantidade801'),
            quantidade802 : intl.get('quantidade802'),
            quantidade803 : intl.get('quantidade803'),
            quantidade804 : intl.get('quantidade804'),
            quantidade805 : intl.get('quantidade805'),
            quantidadeano1 : intl.get('quantidadeano1'),
            quantidadeano2 : intl.get('quantidadeano2'),
            quantidadeano3 : intl.get('quantidadeano3'),
            quantidadeano4 : intl.get('quantidadeano4'),
            quantidadeano5 : intl.get('quantidadeano5'),
            quantidade1801 : intl.get('quantidade1801'),
            quantidade1802 : intl.get('quantidade1802'),
            quantidade1803 : intl.get('quantidade1803'),
            quantidade1804 : intl.get('quantidade1804'),
            quantidade1805 : intl.get('quantidade1805'),
            pesoGato1 : intl.get('pesoGato1'),
            pesoGato2 : intl.get('pesoGato2'),
            pesoGato3 : intl.get('pesoGato3'),
            pesoGato4 : intl.get('pesoGato4'),
            idadeG1 : intl.get('idadeG1'),
            idadeG2 : intl.get('idadeG2'),
            idadeG3 : intl.get('idadeG3'),
            quantidadeRacaoG1 : intl.get('quantidadeRacaoG1'),
            quantidadeRacaoG2 : intl.get('quantidadeRacaoG2'),
            quantidadeRacaoG3 : intl.get('quantidadeRacaoG3'),
            quantidadeRacaoG4 : intl.get('quantidadeRacaoG4'),
            idadeG : intl.get('idadeG'),
            quantidadeFilhoteG1 : intl.get('quantidadeFilhoteG1'),
            quantidadeFilhoteG2 : intl.get('quantidadeFilhoteG2'),
            quantidadeFilhoteG3 : intl.get('quantidadeFilhoteG3')

            

        }

        let showTable = true
        if (!configuracoes.length) {
            showTable = false
        }
        if(localStorage.getItem('@remote-feeder/id')){
        return (
            <Wrapper style = {{marginRight : "20%" , marginLeft : "20%"}}>
                <Title>{texto.recomendacoespet}</Title>
                    <h3>{texto.cao}</h3>
                <Label>{texto.textoCachorro}   
                </Label>

                {/* {showTable && (
                    <ReactTable
                        data={configuracoes}
                        columns={columns}
                        loading={isLoading}
                        defaultPageSize={1}
                        showPageSizeOptions={false}
                        minRows={0}
                        showPagination={false}
                    />
                )} */}
        <div className="listaAdulto" style = {{ display : "flex" , width : "100%" , justifyContent : "center" , marginTop : "20px"}}>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2>{texto.pesoAnimal}</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoCao1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoCao2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoCao3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoCao4}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoCao5}</h3></li>
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >{texto.quantidadeRacao}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacao1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacao2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacao3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacao4}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacao5}</h3></li>
          
                    </div>
                </ul>
            </div>

        </div>
        <Label>{texto.textoFilhote}
        </Label>
        <div className="listaFilhote" style = {{ display : "flex" , width : "100%" , justifyContent : "center" , marginTop : "20px"}}>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"  , width:"300px" , height : "175px"}}><h2>{texto.pesoAnimal}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.pesoFilhote1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoFilhote2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoFilhote3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoFilhote4}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoFilhote5}</h3></li>
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 30px" , height : "175px" , width:"300px"}}><h2>{texto.pesoFilhote80}</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade801}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade802}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade803}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade804}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade805}</h3></li>
          
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 30px" , height : "175px" , width:"300px"}}><h2 >{texto.pesoFilhote180}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.quantidade1801}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade1802}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade1803}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade1804}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidade1805}</h3></li>
          
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 40px" , height : "175px" , width:"300px"}}><h2>{texto.quantidadeFilhote1ano}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeano1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeano2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeano3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeano4}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeano5}</h3></li>
          
                    </div>
                </ul>
            </div>

            

        </div>
            <h3 style = {{paddingTop : "3%"}}>{texto.gato}</h3>
        <Label>{texto.textoGato}   
                </Label>
                <div className="listaAdulto" style = {{ display : "flex" , width : "100%" , justifyContent : "center" , marginTop : "20px"}}>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2>{texto.pesoAnimal}</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoGato1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoGato2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoGato3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.pesoGato4}</h3></li>
                 
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >{texto.quantidadeRacao}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacaoG1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacaoG2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacaoG3}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeRacaoG4}</h3></li>
                    
          
                    </div>
                </ul>
            </div>

        </div>
        <Label>{texto.textoFilhote}
        </Label>
        <div className="listaAdulto" style = {{ display : "flex" , width : "100%" , justifyContent : "center" , marginTop : "20px"}}>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2>{texto.idadeG}</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>{texto.idadeG1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.idadeG2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.idadeG3}</h3></li>
                
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
            <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >{texto.quantidadeRacao}</h2></li>
                    <div style = {{textAlign : "center"}}>
            <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeFilhoteG1}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeFilhoteG2}</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>{texto.quantidadeFilhoteG3}</h3></li>
                 
                    </div>
                </ul>
            </div>

        </div>
        

            </Wrapper>
            
        )}else{
            window.location.href = '/'
          }
    }
}

export default RecomendacoesList
