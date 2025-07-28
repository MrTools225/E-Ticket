import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function SignUpScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erreur', 'Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setIsLoading(true);
    console.log('Creating account for:', { firstName, lastName, email });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Succès', 'Compte créé avec succès !', [
        { text: 'OK', onPress: () => router.replace('/') }
      ]);
    }, 1000);
  };

  const handleLogin = () => {
    console.log('Navigate to login');
    router.back();
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Inscription</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={commonStyles.content}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Text style={[commonStyles.title, { marginBottom: 20 }]}>
            Créer un compte
          </Text>
          
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 30 }]}>
            Rejoignez-nous pour découvrir les meilleurs événements
          </Text>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
            <TextInput
              style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Prénom"
              placeholderTextColor={colors.textSecondary}
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="words"
            />
            <TextInput
              style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
              placeholder="Nom"
              placeholderTextColor={colors.textSecondary}
              value={lastName}
              onChangeText={setLastName}
              autoCapitalize="words"
            />
          </View>

          <TextInput
            style={commonStyles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TextInput
            style={commonStyles.input}
            placeholder="Mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <TextInput
            style={commonStyles.input}
            placeholder="Confirmer le mot de passe"
            placeholderTextColor={colors.textSecondary}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCapitalize="none"
          />

          <Button
            text={isLoading ? "Création..." : "Créer le compte"}
            onPress={handleSignUp}
            style={[buttonStyles.primary, { marginBottom: 16 }]}
          />

          <TouchableOpacity onPress={handleLogin}>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Déjà un compte ? <Text style={{ color: colors.primary, fontWeight: '600' }}>Se connecter</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}