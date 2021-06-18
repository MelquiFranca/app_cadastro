/* eslint-disable semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const Cadastro = ({}) => {
    const [nome, setNome] = useState('')
    const [foto, setFoto] = useState(null)
    const [codigo, setCodigo] = useState(null)
    const [nascimento, setNascimento] = useState(null)

    return (<View>
        <View>
            <TouchableOpacity>
                <Text>Capturar Foto</Text>
            </TouchableOpacity>
        </View>
        <View style={style.row}>
            <Text>Código:</Text>
            <TextInput placeholder="Digite o código" value={codigo} onChangeText={setCodigo}/>
        </View>
        <View style={style.row}>
            <Text>Nome Completo:</Text>
            <TextInput placeholder="Digite o nome" value={nome} onChangeText={setNome}/>
        </View>
        <View>
            <Text>Data de Nascimento:</Text>
            <TextInput placeholder="" value={nascimento} onChangeText={setNascimento}/>
        </View>

        <View>
            <TouchableOpacity>
                <Text>Salvar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                <Text>Limpar</Text>
            </TouchableOpacity>
        </View>
    </View>);
}


const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

});

export default Cadastro;