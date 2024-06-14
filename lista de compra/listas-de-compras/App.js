import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [items, setItems] = useState([]);
  const [nomeMercadoria, setNomeMercadoria] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    // Carrega os itens salvos ao iniciar o aplicativo
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const itemsFromStorage = await AsyncStorage.getItem('listaCompras');
      if (itemsFromStorage !== null) {
        setItems(JSON.parse(itemsFromStorage));
      }
    } catch (error) {
      console.error('Erro ao carregar lista de compras:', error);
    }
  };

  const saveItems = async (updatedItems) => {
    try {
      await AsyncStorage.setItem('listaCompras', JSON.stringify(updatedItems));
    } catch (error) {
      console.error('Erro ao salvar lista de compras:', error);
    }
  };

  const addItem = async () => {
    if (nomeMercadoria && quantidade) {
      const newItem = { nome: nomeMercadoria, quantidade: quantidade };
      const updatedItems = [...items, newItem];
      setItems(updatedItems);
      await saveItems(updatedItems);
      setNomeMercadoria('');
      setQuantidade('');
      Keyboard.dismiss();
      alert('Item adicionado à lista!');
    } else {
      alert('Por favor, preencha o nome da mercadoria e a quantidade.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nome da Mercadoria"
          value={nomeMercadoria}
          onChangeText={(text) => setNomeMercadoria(text)}
        />
        <TextInput
          style={[styles.input, { marginLeft: 10 }]}
          placeholder="Quantidade"
          value={quantidade}
          onChangeText={(text) => setQuantidade(text)}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.addButton} onPress={addItem}>
          <Ionicons name="add" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.listaContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.item}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={styles.itemText}>{item.quantidade}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    width: 160,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
  },
  listaContainer: {
    flex: 1,
    width: '80%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 18,
  },
});
