/* eslint-disable semi */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Image, Alert } from 'react-native';
import { RNCamera } from 'react-native-camera';
import api from '../../api';

const Cadastro = ({}) => {
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState(null)
    const [codigo, setCodigo] = useState(null)
    const [nascimento, setNascimento] = useState(null)

    const handleClickSalvar = async () => {
        const validacao = validarDados()
        if(!validacao) return

        const formData = new FormData()
        formData.append('codigo', codigo)
        formData.append('nome', nome)
        formData.append('nascimento', nascimento)
        formData.append('foto', {
            uri: foto.uri,
            type: 'image/jpeg',
            name: `${codigo}.jpg`,
        })

        const { dados, error, message } = api.post('/usuarios', formData)

        let titulo
        if(error)
            titulo = 'Erro ao salvar'
        else
            titulo = 'Sucesso'

        Alert.alert(titulo, message)
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

    return (<View style={style.container}>
        <View style={style.foto}>
            <View>
                <RNCamera
                    ref={dadosFoto => {
                        setFoto(dadosFoto);
                    }}
                    style={{ flex: 1 }}
                    type={RNCamera.Constants.Type.back}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={RNCamera.Constants.FlashMode.off}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                    "We need your permission to use your camera phone"
                    }
                />
            </View>
            <TouchableOpacity style={style.btnCaptura}>
                <Text>Capturar Foto</Text>
            </TouchableOpacity>
        </View>
        <View style={style.dados}>
            <View style={{...style.row, width: '50%'}}>
                <Text style={style.label}>Código:</Text>
                <TextInput style={style.inputText} placeholder="Digite o código" placeholderTextColor='#999' value={codigo} onChangeText={setCodigo}/>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Nome Completo:</Text>
                <TextInput style={style.inputText} placeholder="Digite o nome" placeholderTextColor='#999' value={nome} onChangeText={setNome}/>
            </View>
            <View style={style.row}>
                <Text style={style.label}>Data de Nascimento:</Text>
                <TextInput placeholder="" value={nascimento} onChangeText={setNascimento}/>
            </View>

            <View style={style.btnGrupo}>
                <TouchableOpacity 
                    style={{...style.btn, ...style.btnPrimary}}
                    onPress={handleClickSalvar}
                >
                    <Text>Salvar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...style.btn, ...style.btnDanger}}>
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
    foto: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 40,
    },
    imagem: {
        flex: 2,

    },
    dados:{
        flex: 3,
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
    },
});

export default Cadastro
