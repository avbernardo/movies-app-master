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
            textoCachorro : intl.get('textoCachorro')
        }
        const columns = [
            
            {
                Header: 'Peso do cão(Kg)',
                acessor : 'peso_animal',
                Cell : row => <div style={{ textAlign: "center" }}>{row.peso_animal}</div>
                
            },
            {
                Header: 'Quantidade diária(g)',
                Cell : row => <div style={{ textAlign: "center" }}>500g</div>
                //Cell : row => <div style={{ textAlign: "center" }}>{row.value}</div>
            }
            
        ]

        
        const columns1 = [
            
            {
                
                
            },
            {

                accessor: 'alimentado',
                Cell: function(props){
                        return(
                           <div >
                               <div>
                               <FcCheckmark size = {20} style = {{marginLeft : "130px"}}/>
                               <VscError size = {20} style = {{marginLeft : "30px" , color : "red"}}/>
                               <VscError size = {20} style = {{marginLeft : "30px" , color : "red"}}/>
                               <VscError size = {20} style = {{marginLeft : "30px" , color : "red"}}/>
                               </div>
                            </div> 
                        )
                },
            },
            {
                
            },
            {
                
               
            },  
        ]


        let showTable = true
        if (!configuracoes.length) {
            showTable = false
        }
        if(localStorage.getItem('@remote-feeder/id')){
        return (
            <Wrapper style = {{marginRight : "20%" , marginLeft : "20%"}}>
                <Title>Recomendações para o seu PET</Title>
                <h3>Cães</h3>
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
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2>Peso Animal (Kg)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>3.5 a 7</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>7 a 13.5</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>13.5 a 22</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>22 a 38</h3></li>

                    <li style = {{border : "2px solid black"}}><h3>38 a 48.5</h3></li>
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >Quantidade ração (g)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>78 a 131</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>131 a 214</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>214 a 309</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>309 a 465</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>465 a 559</h3></li>
          
                    </div>
                </ul>
            </div>

        </div>
        <Label>Caso o seu animal ainda seja um filhote saiba que ele come de 3 a 4 vezes ao dia e com o passar do tempo as suas refeições irão
            diminuir até chegar a 2 refeições ao dia.
        </Label>
        <div className="listaFilhote" style = {{ display : "flex" , width : "100%" , justifyContent : "center" , marginTop : "20px"}}>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px" , height : "173px"}}><h2>Peso Animal (Kg)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>2.2 a 4.3</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>4.3 a 6.7</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>6.7 a 12.5</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>12.5 a 23</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>23 a 29.3</h3></li>
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >Quantidade ração até 80 dias de vida(g)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>83 a 138</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>138 a 192</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>192 a 306</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>306 a 484</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>484 a 580</h3></li>
          
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 30px"}}><h2 >Quantidade ração de 80 a 180 dias de vida(g)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>73 a 120</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>120 a 168</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>168 a 268</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>268 a 423</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>423 a 507</h3></li>
          
                    </div>
                </ul>
            </div>
            <div>
                <ul style = {{listStyle : "none"}}>
                    <li style = {{border : "2px solid black" , padding : "5px 28px"}}><h2 >Quantidade ração de 180 dias a 1 ano de vida(g)</h2></li>
                    <div style = {{textAlign : "center"}}>
                    <li style = {{border : "2px solid black"}}><h3>62 a 103</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>103 a 144</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>144 a 230</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>230 a 363</h3></li>
                    <li style = {{border : "2px solid black"}}><h3>363 a 435</h3></li>
          
                    </div>
                </ul>
            </div>

            

        </div>
        <h3 style = {{paddingTop : "3%"}}>Gatos</h3>
        <Label>Caso o seu animal de estimação tenha mais de 1 ano de idade é importante que ele coma 2 vezes ao dia
                      variando a quantidade de ração em gramas por dia de acordo com o seu peso, confira a tabela a seguir:   
                </Label>

            </Wrapper>
            
        )}else{
            window.location.href = '/'
          }
    }
}

export default RecomendacoesList
