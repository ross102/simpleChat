import React, {useEffect, useState} from 'react';
import {TextInput, StyleSheet, View, Text} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import io from 'socket.io-client';

const App = props => {
  const [chat, setChat] = useState('');
  const [messages, setMessages] = useState([]);

  const socketRequest = () => {
    const socket = io('http://192.168.43.145:5000');
    socket.on('chat message', msg => {
      setMessages([...messages, msg]);
    });
    return socket;
  };

  useEffect(() => {
    socketRequest();
  }, []);

  const submitChat = () => {
    socketRequest().emit('chat message', chat);
    setChat('');
  };

  const chats = messages.map(chat => (
    <Text numberOfLines={5} style={{fontSize: 25}} key={chat}>
      {chat}
    </Text>
  ));

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Chat App</Text>
      <TextInput
        onSubmitEditing={submitChat}
        value={chat}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        onChangeText={setChat}
      />
      {chats}
    </View>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  input: {
    height: 40,
    fontSize: 18,
    borderWidth: 2,
  },
  body: {
    backgroundColor: Colors.blue,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
