import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setIsLoading(true);
    console.log('Attempting login with:', { email, password: '***' });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Mock authentication
      if (email === 'admin@test.com' && password === 'admin') {
        Alert.alert('Succès', 'Connexion réussie en tant qu\'administrateur', [
          { text: 'OK', onPress: () => router.replace('/admin') }
        ]);
      } else if (email.includes('@') && password.length >= 4) {
        Alert.alert('Succès', 'Connexion réussie', [
          { text: 'OK', onPress: () => router.replace('/') }
        ]);
      } else {
        Alert.alert('Erreur', 'Email ou mot de passe incorrect');
      }
    }, 1000);
  };

  const handleSignUp = () => {
    console.log('Navigate to sign up');
    router.push('/auth/signup');
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Connexion</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={commonStyles.content}>
        <View style={{ width: '100%', maxWidth: 400 }}>
          <Text style={[commonStyles.title, { marginBottom: 30 }]}>
            Bienvenue !
          </Text>
          
          <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginBottom: 30 }]}>
            Connectez-vous pour accéder à vos billets
          </Text>

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

          <Button
            text={isLoading ? "Connexion..." : "Se connecter"}
            onPress={handleLogin}
            style={[buttonStyles.primary, { marginBottom: 16 }]}
          />

          <TouchableOpacity onPress={handleSignUp}>
            <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
              Pas encore de compte ? <Text style={{ color: colors.primary, fontWeight: '600' }}>S'inscrire</Text>
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 30, padding: 16, backgroundColor: colors.backgroundAlt, borderRadius: 8 }}>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center', marginBottom: 8 }]}>
              Comptes de test :
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center' }]}>
              Admin: admin@test.com / admin
            </Text>
            <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center' }]}>
              User: user@test.com / user
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}