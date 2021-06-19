/* eslint-disable jsx-quotes */
/* eslint-disable curly */
/* eslint-disable keyword-spacing */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import DocumentPicker from 'react-native-document-picker'
import { api, url } from '../../api'
import { dataFormatadaBanco, dataFormatadaUsuario } from '../../utils'

const Cadastro = (props) => {
    const [exibeDataPicker, setExibeDataPicker] = useState(false)
    const [idUsuario, setIdUsuario] = useState(null)
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState(null)
    const [codigo, setCodigo] = useState(null)
    const [nascimento, setNascimento] = useState(null)

    useEffect(() => {
        handleSelecionarUsuario()
    }, [])

    const handleSelecionarUsuario = async () => {
        const id = props.route.params?.id
        if(!id)
            return

        setIdUsuario(id)
        const { data } = await api.get(`usuarios/${id}`)

        if(data?.error) {
            Alert.alert('Erro', data.message)
            props.navigation.navigate('Lista')
        }

        const {dados} = data

        setNome(dados.nome)
        setFoto({uri: `${url}uploads/${dados.foto}`})
        setCodigo(dados.codigo.toString())
        setNascimento(new Date(dados.nascimento))

    }
    const limparDados  = () => {
        setIdUsuario(null)
        setNome('')
        setFoto(null)
        setCodigo(null)
        setNascimento(null)
    }
    const selecionarFoto = async () => {
        try {
           (async () =>{
                const fotoSelecionada = await DocumentPicker.pick({
                    type: [DocumentPicker.types.images],
                })
                setFoto(fotoSelecionada)
           })()

        } catch(e) {
            setFoto(null)
            Alert.alert('Erro', e.message)
        }
      }

    const handleClickSalvar = async () => {
        try {
            const validacao = validarDados()
            if(!validacao) return

            const formData = new FormData()
            formData.append('codigo', codigo)
            formData.append('nome', nome)
            formData.append('nascimento', dataFormatadaBanco(new Date(nascimento)))

            if(foto?.uri) {
                formData.append('foto', {
                    uri: foto.uri,
                    type: 'image/jpeg',
                    name: `${codigo}.jpg`,
                })
            }

            let retorno
            if(idUsuario)
                retorno = await api.put(`/usuarios/${idUsuario}`, formData)
            else
                retorno = await api.post('/usuarios', formData)

            const { error, message } = retorno.data

            let titulo
            if(error)
                titulo = 'Erro ao salvar'
            else
                titulo = 'Sucesso'

            Alert.alert(titulo, message)
            limparDados()
        } catch(e) {
            Alert.alert('Erro', e.message)
        }
    }

    const validarDados = () => {

        const titulo = 'Campo Obrigatório'
        if(!nome) {
            Alert.alert(titulo, `Favor preencher o campo Nome.`)
            return false
        }
        if(!codigo) {
            Alert.alert(titulo, `Favor preencher o campo Código.`)
            return false
        }
        if(!nascimento) {
            Alert.alert(titulo, `Favor preencher o campo Nascimento.`)
            return false
        }
        return true
    }

    const handleCancelaData = () => {
        setExibeDataPicker(false)
        setNascimento(new Date())
    }
    const handleChangeData = (e, data) => {
        setExibeDataPicker(false)
        setNascimento(data)
    }
    const handleExibeDataPicker = () => {
        setNascimento(new Date())
        setExibeDataPicker(true)
    }

    return (<View style={style.container}>
        <View style={style.campoFoto}>
            <View style={style.viewImagem}>
                {foto?.uri ?
                    <Image source={{uri: foto.uri}} style={style.imagem}/>
                    :
                    <Text>Nenhuma imagem selecionada</Text>
                }
            </View>

            <TouchableOpacity
                style={style.btnCaptura}
                onPress={selecionarFoto}
            >
                <Text>Capturar Foto</Text>
            </TouchableOpacity>
        </View>
        <View style={style.dados}>
            <View style={{...style.row, width: '50%'}}>
                <Text style={style.label}>Código:</Text>
                <TextInput
                    style={style.inputText}
                    placeholder="Digite o código"
                    placeholderTextColor='#999'
                    value={codigo}
                    onChangeText={setCodigo}
                    keyboardType='number-pad'
                    maxLength={6}
                />
            </View>
            <View style={style.row}>
                <Text style={style.label}>Nome Completo:</Text>
                <TextInput style={style.inputText} placeholder="Digite o nome" placeholderTextColor='#999' value={nome} onChangeText={setNome}/>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Data de Nascimento:</Text>
                <Text style={style.label}>{nascimento ? dataFormatadaUsuario(new Date(nascimento)) : 'DD/MM/AAAA'}</Text>
                {exibeDataPicker && <DateTimePicker
                    testID="dateTimePicker"
                    value={nascimento}
                    display='default'
                    mode='date'
                    is24Hour={true}
                    onChange={handleChangeData}
                    // style={{backgroundColor: CORES.primeira}}
                    onTouchCancel={handleCancelaData}

                />}

                <TouchableOpacity
                    style={{...style.btn, ...style.btnCaptura}}
                    onPress={handleExibeDataPicker}
                >
                    <Text>Data</Text>
                </TouchableOpacity>
            </View>

            <View style={style.btnGrupo}>
                <TouchableOpacity
                    style={{...style.btn, ...style.btnPrimary}}
                    onPress={handleClickSalvar}
                >
                    <Text>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{...style.btn, ...style.btnDanger}}
                    onPress={limparDados}
                >
                    <Text>Limpar</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>);
}


const style = StyleSheet.create({
    container: {
        flex: 1,
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    row: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginVertical: 5,
    },
    campoFoto: {
        flex: 3,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
    },
    viewImagem: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagem: {
        height: '100%',
        width: '50%',
    },
    dados:{
        flex: 4,
        paddingTop: 50,
        marginHorizontal: '5%',
    },
    label: {
        color: '#444',
        fontSize: 16,
    },
    inputText: {
        // flex: 2,
        width: '90%',
        color: '#555',
        borderWidth: 1,
        borderColor: '#CCC',
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: '#EEE',
    },
    btnGrupo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 10,
    },
    btn: {
        paddingHorizontal: 40,
        paddingVertical: 12,
        margin: 2,
        borderWidth: 1,
        borderColor: '#EEE',
    },
    btnPrimary: {
        backgroundColor: 'lightgreen',
    },
    btnDanger: {
        backgroundColor: 'lightgray',
    },
    btnCaptura: {
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: 'lightgray',
        marginVertical: 5,
    },
});

export default Cadastro
