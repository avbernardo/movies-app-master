import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
})

export const insertUsuario = payload => api.post(`/usuario`, payload)
export const insertConfiguracao = payload => api.post(`/configuracao`, payload)
export const getAllConfiguracoes = id => api.get(`/configuracoes/${id}`)
export const getConfiguracaoAtiva = id => api.get(`/configuracao_ativa/${id}`)
export const updateMovieById = (id, payload) => api.put(`/configuracao/${id}`, payload)
export const deleteMovieById = id => api.delete(`/configuracao/${id}`)
export const getMovieById = id => api.get(`/configuracao/${id}`)
export const login = payload => api.post('/login',payload)
export const getUsuarioById = id => api.get(`/usuario/${id}`)
export const ativaConfig = (id,usuario) => api.post(`/ativa_configuracao/${id}/${usuario}`)
export const updateSinalRacao = id => api.post(`/sinal_racao`)
export const updateSinalAgua = id => api.post(`/sinal_agua`)
export const getSinais = id => api.get(`/sinais`)

const apis = {
    insertUsuario,
    insertConfiguracao,
    getAllConfiguracoes,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    login,
    getConfiguracaoAtiva,
    getUsuarioById,
    ativaConfig,
    updateSinalRacao,
    updateSinalAgua,
    getSinais
}

export default apis
