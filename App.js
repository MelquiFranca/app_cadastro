import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Cadastro from './src/pages/Usuarios/Cadastro';
import Lista from './src/pages/Usuarios/Lista';

const Stack = createStackNavigator();

const App = (props) => {
  return (<NavigationContainer>
 		<Stack.Navigator>
 			<Stack.Screen {...props} name="Lista de Usuários" component={Lista}/>
 			<Stack.Screen {...props}  name="Cadastro" component={Cadastro}/>
 		</Stack.Navigator>
  	</NavigationContainer>)
}


export default App;
