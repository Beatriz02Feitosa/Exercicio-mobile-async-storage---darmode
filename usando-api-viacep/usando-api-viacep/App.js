import React, { useState } from 'react'
import {View, Text, StyleSheet, Button, TextInput} from 'react-native'
import api from './src/services/api'


export default function App(){
  const [cep, setCep] = useState()
  const [endereco, setEndereco] = useState([])


  const consultaCep = async (cep) => {
    const response = await api.get('/' + cep + '/json/');
    setEndereco(response.data)
  }


    return(
      <View style={styles.container}>

        <Text style={styles.titulo}>CEP x Endereço</Text>
        
        <TextInput
        style={styles.cep}
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        underlineColorAndroid="transparent"
        keyboardType='numeric'
        />

        <Button title="✔" color='pink' onPress={() => consultaCep(cep)} />

        <Text style={styles.endereco}>{endereco.cep}</Text>
        <Text style={styles.endereco}>{endereco.logradouro}</Text>
        <Text style={styles.endereco}>{endereco.bairro}</Text>
        <Text style={styles.endereco}>{endereco.localidade}</Text>
        <Text style={styles.endereco}>{endereco.uf}</Text>

      </View>    
    )
  }


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
  },
  endereco:{
    marginTop: 6,
    fontSize: 20,
    textAlign: 'center',
  },
  cep:{
    width: 280,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 3
  },
  titulo:{
        fontSize: 40,
        color: 'pink',
        textAlign: 'center',
        marginBottom: 10
    }
});
