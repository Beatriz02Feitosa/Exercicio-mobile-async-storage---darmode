import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';


function Card({data, funcCarregarTarefas}){
  const [id, setId] = useState(data?.id)
  const [title, setTitle] = useState(data?.title)
  const [description, setDescription] = useState(data?.description)


  const excluirTarefa = async () => {
    const response = await api.delete(`/tasks/${id}`);
    await funcCarregarTarefas();
  }


  const navigation = useNavigation();
 
  async function irFormulario(){
      navigation.navigate('Formulario', { id: id, title: title, description: description, atualizarLista: funcCarregarTarefas});
  }




  return(
    <View>
     
      <View style={styles.card}>
        
       
        

       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
     <Text style={styles.titulo}>{title}</Text> 
     <Text style={styles.descricao}>{description}</Text>
     <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity style={styles.buttonEditar} onPress={irFormulario}>
          <Text>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonExcluir} onPress={excluirTarefa}>
          <Text>Excluir</Text>
        </TouchableOpacity>
        </View>
    </View>

      </View>


    </View>
  );
}
 
const styles = StyleSheet.create({
  card:{
    backgroundColor: '#fefefa',
    margin: 15,  
    borderRadius: 5,
    elevation: 3,
  },
  titulo:{
    fontSize: 26,
    marginBottom: 4,
    color: '#191970',
    
  },
  descricao:{
    fontSize: 16,
    margin: 4,
  },
  buttonEditar: {
    borderRadius: 5,
    alignSelf: 'flex-start',
    backgroundColor: '#ADD8E6',
    paddingHorizontal: 8,
    paddingVertical: 6,
    margin: 12,
    marginHorizontal: 5
  },
  buttonExcluir: {
    borderRadius: 5,
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 10,
    margin: 12,
    backgroundColor: "tomato",
  },
});
 
export default Card;