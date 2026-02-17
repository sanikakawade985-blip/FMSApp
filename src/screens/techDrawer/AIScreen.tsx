// import { View, StyleSheet, Dimensions } from 'react-native';
// import { COLORS } from '../../theme/colors';

// const { height } = Dimensions.get('window');

// export default function AIScreen() {
//   return (
//     <View style={styles.root}>
//       <View style={styles.redBg} />
//       <View style={styles.whiteSheet} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   root: {
//     flex: 1,
//     backgroundColor: COLORS.primary,
//   },
//   redBg: {
//     top: 0,
//     height: height * 0.12,
//     backgroundColor: COLORS.primary,
//   },
//   whiteSheet: {
//     flex: 1,
//     backgroundColor: '#fff',
//     borderTopLeftRadius: 28,
//     borderTopRightRadius: 28,
//     padding: 10,
//   },
// });

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../theme/colors';

const { height } = Dimensions.get('window');

export default function AIScreen() {
  const renderQuestion = (text: string) => (
    <Pressable style={({ pressed }) => [
      styles.questionPill,
      pressed && { opacity: 0.7 }
    ]}>
      <Text style={styles.questionText}>{text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <View style={styles.redBg} />

      <View style={styles.whiteSheet}>
        <ScrollView contentContainerStyle={styles.content}>

          {/* AI Intro Banner */}
          <View style={styles.chatRow}>
            <Image source={require('../../../assets/images/favicon.png')} style={{ width: 50, height: 50 }} />
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>
                How can I help you today?
              </Text>
            </View>
          </View>

          <Text style={styles.sampleTitle}>
            Some sample questions you can ask ...
          </Text>

          {renderQuestion('How to change capacitor in motor ?')}
          {renderQuestion('How to change gas in AC ?')}
          {renderQuestion('How to change phone setting in android ?')}
          {renderQuestion('How to change NAND card in lift ?')}

        </ScrollView>

        {/* Bottom Input Bar */}
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Ask your question..."
              placeholderTextColor="#333"
              style={styles.input}
              cursorColor={COLORS.primary}
            />
            <Pressable style={styles.sendButton}>
              <Ionicons name="paper-plane-outline" size={28} color={COLORS.primary} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  redBg: {
    height: height * 0.12,
    backgroundColor: COLORS.primary,
  },
  whiteSheet: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 16,
  },
  content: {
    paddingTop: 10,
    paddingBottom: 90,
    paddingHorizontal: 20,
  },

  /* AI Intro */
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    marginLeft: -25,
  },
  bubble: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },

  bubbleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },

  /* Sample Title */
  sampleTitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },

  /* Question Pills */
  questionPill: {
    backgroundColor: '#5a5a5a',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 15,
    height: 30,
  },
  questionText: {
    color: '#fff',
    fontSize: 16,
  },

  /* Bottom Input */
  inputContainer: {
    position: 'absolute',
    bottom: 30,
    flexDirection: 'row',
    backgroundColor: '#f1f1f1',
    borderRadius: 30,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 18,
  },
  sendButton: {
    padding: 8,
  },
});
