import React, { useState } from 'react'
import {View, Text, StyleSheet, Button, TextInput, Image} from 'react-native'
import api from './src/services/api'


export default function App(){
  const [dev, setDev] = useState()
  const [dados, setDados] = useState([])


  const consultaDev = async (dev) => {
    const response = await api.get(dev);
    setDados(response.data)
  }


    return(
      <View style={styles.container}>

        <Text style={styles.titulo}>Perfil dos Devs</Text>

         <Image style={styles.foto} source={{ uri: dados.avatar_url }} />
        
        <TextInput
        style={styles.dev}
        value={dev}
        onChangeText={(texto) => setDev(texto)}
        
        />

        <Button title="✔" color='blue' onPress={() => consultaDev(dev)} />
        
        <Text style={styles.dados}>id: {dados.id}</Text>
        <Text style={styles.dados}>nome: {dados.name}</Text>
        <Text style={styles.dados}>repositórios: {dados.public_repos}</Text>
        <Text style={styles.dados}>criado em: {dados.created_at}</Text>
        <Text style={styles.dados}>seguidores: {dados.followers}</Text>
        <Text style={styles.dados}>seguindo: {dados.following}</Text>

      </View>    
    )
  }


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  dados:{
    marginTop: 6,
    fontSize: 20,
    textAlign: 'center',
  },
  dev:{
    width: 280,
    height: 28,
    borderRadius: 20,
    borderWidth: 1,
    padding: 10,
    marginBottom: 3
  },
  titulo:{
        fontSize: 40,
        color: 'blue',
        textAlign: 'center',
        marginBottom: 3
    },
  foto:{
    margin: 12,
    width: 200,
    height: 200,
    borderColor: 'blue',
    borderWidth: 1
  }
});
