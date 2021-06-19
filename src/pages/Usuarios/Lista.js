/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Alert, FlatList, View, Image, Text, StyleSheet } from 'react-native'
import { api, url } from '../../api'

const Lista = (props) => {
  const [usuarios, setUsuarios] = useState([])
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    handleClickAtualizar()
  }, []);

  const handleClickAtualizar = async () => {   
        const {data} = await api.get('usuarios')  
        if (data.error) {
            return Alert.alert('Mensagem de Erro', data.message)
        }

        setUsuarios(data.dados)
  }
  const renderItemUsuario = ({item}) => {
    console.log(item.foto)
    return (<View style={style.itemLista}>
        
        <Image 
            source={{uri: `${url}uploads/${item.foto}`}}
            style={style.foto}
        />
        <Text style={{...style.itemListaText, flex: 1}}>{item.nome}</Text>
        <TouchableOpacity 
            style={style.btnEditar}
            onPress={() => handleClickNovoEditar(item.id)}
        >
            <Text>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity 
            style={style.btnExcluir}
            onPress={() => handleClickExcluir(item.id)}
        >
            <Text>Excluir</Text>
        </TouchableOpacity>
    </View>)
  }

    const handleClickNovoEditar = (id=null) => {
        props.navigation.navigate('Cadastro', {id})
    }
    
    const handleClickExcluir = async(id) => {
        const { data } = await api.delete(`usuarios/${id}`)        
        if(data?.error)
            Alert.alert('Erro', data.message)
            
        Alert.alert('Sucesso', data.message)
        handleClickAtualizar()
    }
  return (<View style={style.container}>
    <FlatList 
        style={{width: '100%'}}
        data={usuarios}
        renderItem={renderItemUsuario}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
    />

    <View style={style.containerBotao}>
        <TouchableOpacity 
            style={style.btnNovo}
            onPress={_=>handleClickNovoEditar(null)}
        >
            <Text style={style.btnNovoText}>Novo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={style.btnReload}
            onPress={handleClickAtualizar}
        >
            <Text style={style.btnReloadText}>Atualizar</Text>
        </TouchableOpacity>
    </View>
  </View>)
};

const style = StyleSheet.create({
    container: {    
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    containerBotao: {
        flexDirection: 'row',
        width: '100%',
        height: 80,
        alignItems: 'center', 
        justifyContent: 'space-evenly',
    },
    btnNovo: {                
        paddingHorizontal: 35,
        paddingVertical: 10,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnReload: {        
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    btnReloadText: {
        fontSize: 20,
        color: '#FFF'
    },
    btnNovoText: {
        fontSize: 20,
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
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderColor: '#999',
    },
    itemListaText: {
        color: '#333',
    },
    foto: {
        width: 60,
        height: 60,
        borderRadius: 4,
        marginRight: 5,
    },
})

export default Lista
