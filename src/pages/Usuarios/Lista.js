/* eslint-disable eslint-comments/no-unused-disable */
/* eslint-disable comma-dangle */
/* eslint-disable no-trailing-spaces */
/* eslint-disable semi */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react'
import {TouchableOpacity, Alert, FlatList, View, Image, Text, StyleSheet } from 'react-native'
// import Icon from 'react-native-vector-icons/dist/FontAwesome';
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
    return (<View style={style.itemLista}>
        {/* <Text style={style.itemListaText}>{item.foto}</Text> */}
        <Image 
            source={{uri: `${url}uploads/${item.foto}`}}
            style={style.foto}
        />
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
            onPress={handleClickNovo}
        >
            <Text style={style.btnNovoText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity 
            style={style.btnReload}
            onPress={handleClickAtualizar}
        >
            <Text style={style.btnReloadText}>
                <Icon name="search"/>
            </Text>
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
        borderRadius: 100,
        height: 70,
        width: 70,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnReload: {
        borderRadius: 100,
        backgroundColor: 'lightgreen',
        justifyContent: 'center',
        alignItems: 'center',
        height: 70,
        width: 70,
    },
    btnReloadText: {
        fontSize: 30,
        color: '#FFF'
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
        height: 70,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
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
