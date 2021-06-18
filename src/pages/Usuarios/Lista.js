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
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    (async () => {
      const retorno = await fetch('usuarios')      
    //   if (error) {
    //     return Alert.alert('Mensagem de Erro', message)
    //   }

      setUsuarios(retorno.data)
    })()

  }, []);

  const renderItemUsuario = ({item}) => {
    return (<View style={style.itemLista}>
        <Text style={style.itemListaText}>{item.foto}</Text>
        <Text style={{...style.itemListaText, flex: 1}}>{item.nome}</Text>
        <TouchableOpacity 
            style={style.btnEditar}
            onPress={{}}
        >
            <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={style.btnExcluir}
            onPress={{}}
        >
            <Text>Excluir</Text>
        </TouchableOpacity>
    </View>)
  }

  const handleClickNovo = () => {
    props.navigation.navigate('Cadastro')
  }
  return (<ScrollView contentContainerStyle={style.container}>
    <FlatList 
        style={{width: '100%'}}
        data={usuarios}
        renderItem={renderItemUsuario}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
    />

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
    },
    btnEditar: {
        backgroundColor: 'lightgreen',
        width: 50,
        height: 30,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnExcluir: {
        backgroundColor: 'lightgray',
        width: 50,
        height: 30,
        marginHorizontal: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemLista: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#999',
    },
    itemListaText: {
        color: '#333',
    }
})

export default Lista
 