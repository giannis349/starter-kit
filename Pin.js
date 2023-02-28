import React, {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

const PizzaTranslator = () => {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter lesson number"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: 'center',
  },
  input: {
    width: 250,
    borderColor: 'grey',
    borderWidth: 4,
    borderRadius: 15,
  },
});

export default PizzaTranslator;
