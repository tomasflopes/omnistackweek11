import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, Image, TouchableOpacity, Text } from 'react-native';
import * as MailComposer from 'expo-mail-composer';
import * as Sms from 'expo-sms';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  const formattedValue = Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR'
  }).format(incident.value);

  const message = `Hello, ${incident.name}, I'm reaching you because I really want do contribute to solve this incident - "${incident.title}", by donating you ${formattedValue}`;

  function navigateBack() {
    navigation.goBack();
  }

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero of the case: ${incident.title}`,
      recipients: [incident.email],
      body: message,
    })
  }

  function sendSms() {
    Sms.sendSMSAsync(
      [incident.phone],
      message,
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e82041"></Feather>
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
        <Text style={styles.incidentValue}>{incident.name}, from {incident.city}</Text>

        <Text style={styles.incidentProperty}>INCIDENT:</Text>
        <Text style={styles.incidentValue}>{incident.title}</Text>

        <Text style={styles.incidentProperty}>VALUE:</Text>
        <Text style={styles.incidentValue}>{incident.value}</Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>Save the day!</Text>
        <Text style={styles.heroTitle}>Be the hero of this incident.</Text>

        <Text style={styles.heroDescription}>Contacts</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.action} onPress={sendSms}>
            <Text style={styles.actionText}>Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.action} onPress={sendMail}>
            <Text style={styles.actionText}>Email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
