/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Alert, FlatList, View, ScrollView, Text, StyleSheet } from 'react-native'
import api from '../../api'

const Lista = (props) => {
  const [usuarios, setUsuarios] = useState([])

  useEffect(async () => {
    async function loadUsuarios() {
      const {data, error, message} = await api.get('/usuarios')
      if (error) {
        return Alert.alert('Mensagem de Erro', message)
      }

      setUsuarios(data)
    }

    await loadUsuarios()
  }, []);

  const renderItemUsuario = (item) => {
    return (<View>
        <Text>{item.nome}</Text>
    </View>)
  }

  const handleClickNovo = () => {
    props.navigation.navigate('Cadastro')
  }
  return (<ScrollView contentContainerStyle={style.container}>
    {/* <FlatList 
        data={usuarios}
        renderItem={renderItemUsuario}
    /> */}

    <TouchableOpacity 
        style={style.btnNovo}
        onPress={handleClickNovo}
    >
        <Text style={style.btnNovoText}>+</Text>
    </TouchableOpacity>
  </ScrollView>)
};

const style = StyleSheet.create({
    container: {    
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    btnNovo: {
        borderRadius: 100,
        height: 70,
        width: 70,
        backgroundColor: 'lightblue',
        bottom: 10,   
        justifyContent: 'center',
        alignItems: 'center',
  },
    btnNovoText: {
        fontSize: 30,
        color: '#FFF'
    }
})

export default Lista
 