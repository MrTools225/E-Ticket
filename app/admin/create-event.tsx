import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';

const categories = ['Musique', 'Théâtre', 'Sport', 'Gastronomie', 'Art', 'Conférence', 'Festival', 'Autre'];

export default function CreateEventScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [totalTickets, setTotalTickets] = useState('');
  const [category, setCategory] = useState('Musique');
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateEvent = async () => {
    if (!title || !description || !date || !time || !location || !price || !totalTickets) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }

    const priceNum = parseFloat(price);
    const ticketsNum = parseInt(totalTickets);

    if (isNaN(priceNum) || priceNum <= 0) {
      Alert.alert('Erreur', 'Le prix doit être un nombre positif');
      return;
    }

    if (isNaN(ticketsNum) || ticketsNum <= 0) {
      Alert.alert('Erreur', 'Le nombre de billets doit être un nombre entier positif');
      return;
    }

    setIsLoading(true);
    console.log('Creating event:', {
      title,
      description,
      date,
      time,
      location,
      price: priceNum,
      totalTickets: ticketsNum,
      category,
      imageUrl
    });

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Succès', 'Événement créé avec succès !', [
        { text: 'OK', onPress: () => router.back() }
      ]);
    }, 1000);
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Créer un événement</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={commonStyles.scrollContent}>
        <Text style={[commonStyles.title, { marginBottom: 30 }]}>
          Nouvel événement
        </Text>

        <TextInput
          style={commonStyles.input}
          placeholder="Titre de l'événement *"
          placeholderTextColor={colors.textSecondary}
          value={title}
          onChangeText={setTitle}
        />

        <TextInput
          style={commonStyles.textArea}
          placeholder="Description *"
          placeholderTextColor={colors.textSecondary}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <TextInput
            style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Date (YYYY-MM-DD) *"
            placeholderTextColor={colors.textSecondary}
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Heure (HH:MM) *"
            placeholderTextColor={colors.textSecondary}
            value={time}
            onChangeText={setTime}
          />
        </View>

        <TextInput
          style={commonStyles.input}
          placeholder="Lieu *"
          placeholderTextColor={colors.textSecondary}
          value={location}
          onChangeText={setLocation}
        />

        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
          <TextInput
            style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Prix (€) *"
            placeholderTextColor={colors.textSecondary}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          <TextInput
            style={[commonStyles.input, { flex: 1, marginBottom: 0 }]}
            placeholder="Nombre de billets *"
            placeholderTextColor={colors.textSecondary}
            value={totalTickets}
            onChangeText={setTotalTickets}
            keyboardType="numeric"
          />
        </View>

        <TextInput
          style={commonStyles.input}
          placeholder="URL de l'image (optionnel)"
          placeholderTextColor={colors.textSecondary}
          value={imageUrl}
          onChangeText={setImageUrl}
          autoCapitalize="none"
        />

        {/* Category Selector */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 12 }]}>Catégorie</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 8,
                  borderRadius: 20,
                  backgroundColor: category === cat ? colors.primary : colors.backgroundAlt,
                  borderWidth: 1,
                  borderColor: category === cat ? colors.primary : colors.border,
                }}
                onPress={() => setCategory(cat)}
              >
                <Text
                  style={{
                    color: category === cat ? 'white' : colors.text,
                    fontSize: 14,
                    fontWeight: category === cat ? '600' : '400',
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button
          text={isLoading ? "Création..." : "Créer l'événement"}
          onPress={handleCreateEvent}
          style={buttonStyles.primary}
        />

        <View style={{ marginTop: 20, padding: 16, backgroundColor: colors.backgroundAlt, borderRadius: 8 }}>
          <Text style={[commonStyles.textSecondary, { fontSize: 12, textAlign: 'center' }]}>
            * Champs obligatoires
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}