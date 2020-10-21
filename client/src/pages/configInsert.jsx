import React, { Component } from 'react'
import api from '../api'
import Switch from 'react-switch'
import {FaMinusSquare} from 'react-icons/fa'
import TimePicker from 'react-time-picker'
import styled from 'styled-components'
import TimeInput from 'react-time-input'
import intl from 'react-intl-universal'
import moment from 'moment';
import { getUserLocale } from 'get-user-locale';

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



const handleChange = (event) => {
    this.setState({ ...this.state, [event.target.name]: event.target.checked });
  };
const CancelButton = styled.a.attrs({
    className: `btn btn-danger`,
})`
    margin: 15px 15px 15px 5px;
`

class configInsert extends Component {
    constructor(props) {
        super(props)

        this.state = {
            nome: '',
            movimento_agua:false,
            horario_alimentacao: [''],
            quantidade_alimentacao: [''],
            shareholders: [{ horario_alimentacao: '' , quantidade_alimentacao : ''}],
            shareholders1 : [{name : ""}]
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChangeInputNome = async event => {
        const nome = event.target.value
        this.setState({ nome })
    }

    handleChange(movimento_agua) {
      this.setState({ movimento_agua });
    }
    
    handleChangeInputHorario = async event => {
        const horario_alimentacao = event.target.value
        this.setState({ horario_alimentacao })
    }

    handleChangeInputQuantidade = async event => {
        const quantidade_alimentacao = event.target.value
        this.setState({ quantidade_alimentacao })
    }

    

    handleIncludeConfig = async () => {
        const { nome, movimento_agua, horario_alimentacao, quantidade_alimentacao , shareholders } = this.state
        //const arrayHorario = shareholders.split('/')
        //const arrayQuantidade = quantidade_alimentacao.split('/')
        var quantidade = shareholders.map(function (quantidade){
            var aux = parseFloat(quantidade.quantidade_alimentacao)
            if(getUserLocale()=='en-US'){
              aux = aux*28.3494
            }
          return aux
        })
        

        shareholders.forEach((item,i) => shareholders[i].quantidade_alimentacao = quantidade[i])

        const payload = { nome_configuracao : nome, movimento_agua, horario_quantidade_alimentacao : shareholders , ativo : false , usuario_id : window.localStorage.getItem('@remote-feeder/id') }
        await api.insertConfiguracao(payload).then(res => {
          
            window.alert(`Configuração inserida com sucesso`)
            this.setState({
                nome: '',
                movimento_agua: false,
                horario_alimentacao: [''],
                quantidade_alimentao:[''],  
                shareholders: [{ horario_alimentacao: '' , quantidade_alimentacao : ''}] 
            })
           window.location.href = '/configuracoes/list'
        })
    }

      handleShareholderHorarioChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, horario_alimentacao: evt.target.value };

        });
    
        this.setState({ shareholders: newShareholders });
      };
      handleShareholderQuantidadeChange = idx => evt => {
        const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
          if (idx !== sidx) return shareholder;
          return { ...shareholder, quantidade_alimentacao: evt.target.value };
        });
    
        this.setState({ shareholders: newShareholders });
      };
    
      handleSubmit = evt => {
        const { name, shareholders } = this.state;
        alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
        console.log(shareholders)
      };
    
      handleAddShareholder = () => {
        this.setState({
          shareholders: this.state.shareholders.concat([{ horario_alimentacao: "" , quantidade_alimentacao : ""}])
        });
      };
    
      handleRemoveShareholder = idx => () => {
        this.setState({
          shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
        });
      };

    render() {
        const { nome, quantidade_alimentacao, horario_alimentacao, movimento_agua } = this.state
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
            ativarconfig : intl.get('ativarconfig'),
            horario : intl.get('horario'),
            criarConfiguracao : intl.get('criarConfiguracao'),
            adicionarHorario : intl.get('adicionarHorario'),
            salvar : intl.get('salvar'),
            cancelar : intl.get('cancelar')
        }
        if(localStorage.getItem('@remote-feeder/id')){
        return (
            <Wrapper style = {{marginLeft : "20%" , marginRight : "20%"}}>
                <Title>{texto.criarConfiguracao}</Title>
                <Label>{texto.nome}: </Label>
               <InputText
                type="text"
                value={nome}
                onChange={this.handleChangeInputNome}
                
                />

        

        <Label>{texto.horario}: </Label>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
              <div style = {{width : "40%" , float : "left"}}>
            <InputText
            placeholder = {texto.horario}
              type="time"
              value={shareholder.horario_alimentacao}
              onChange={this.handleShareholderHorarioChange(idx)}
            />
            </div>
            <div style = {{width : "40%" , float : "right"}}>
            <InputText
            placeholder = {texto.quantidade}
              type="number"
              value = {shareholder.quantidade_alimentacao}
              onChange={this.handleShareholderQuantidadeChange(idx)}
            />
            </div>
            <div style = {{width : "10%" , float : "center" , marginLeft : "96%"}}>
            <Button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              style = {{backgroundColor : "white" , border : "none"}}
            >
              <FaMinusSquare style = {{color : "red"}} size = {30}/>
            </Button>

            </div>
            
          </div>
        ))}
        <Button
          type="button"
          onClick={this.handleAddShareholder}
          className="small"
        >
          {texto.adicionarHorario}
        </Button>
        
        
        <br></br>

        <Label>{texto.movimento_agua}</Label>
     
        <Switch
        checked={this.state.movimento_agua}
        color="primary"
        name="checkedB"
        inputProps={{ 'aria-label': 'primary checkbox' }}
        onChange ={this.handleChange}
        />
        <br></br>

        <Button onClick={this.handleIncludeConfig}>{texto.salvar}</Button>
        <CancelButton href={'/configuracoes/list'}>{texto.cancelar}</CancelButton>
        
            </Wrapper>
        )}else{
          window.location.href = '/'
        }
    }
}

export default configInsert
