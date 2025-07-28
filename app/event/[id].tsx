import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { Event } from '../../types/Event';

// Mock data - same as in index.tsx
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Concert de Jazz',
    description: 'Une soirée exceptionnelle avec les meilleurs musiciens de jazz de la région. Venez découvrir des mélodies envoûtantes dans une ambiance intimiste et chaleureuse.',
    date: '2024-02-15',
    time: '20:00',
    location: 'Salle de Concert Paris',
    price: 45,
    availableTickets: 150,
    totalTickets: 200,
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    category: 'Musique'
  },
  {
    id: '2',
    title: 'Théâtre Classique',
    description: 'Représentation du célèbre "Hamlet" par la troupe nationale. Une interprétation moderne de ce chef-d\'œuvre intemporel.',
    date: '2024-02-20',
    time: '19:30',
    location: 'Théâtre National',
    price: 35,
    availableTickets: 80,
    totalTickets: 120,
    imageUrl: 'https://images.unsplash.com/photo-1507924538820-ede94a04019d?w=400',
    category: 'Théâtre'
  },
  {
    id: '3',
    title: 'Festival Gastronomique',
    description: 'Découvrez les saveurs du monde avec nos chefs renommés. Une expérience culinaire unique vous attend.',
    date: '2024-02-25',
    time: '12:00',
    location: 'Parc des Expositions',
    price: 25,
    availableTickets: 300,
    totalTickets: 500,
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
    category: 'Gastronomie'
  }
];

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    console.log('Loading event with ID:', id);
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent || null);
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= Math.min(10, event?.availableTickets || 0)) {
      setQuantity(newQuantity);
    }
  };

  const handlePurchase = () => {
    if (!event) return;
    
    console.log('Purchasing tickets:', { eventId: event.id, quantity, totalPrice: event.price * quantity });
    
    Alert.alert(
      'Confirmer l\'achat',
      `Voulez-vous acheter ${quantity} billet(s) pour ${event.title} ?\n\nTotal: ${event.price * quantity}€`,
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Confirmer', 
          onPress: () => {
            // Here you would normally process the payment
            Alert.alert('Succès', 'Vos billets ont été achetés avec succès !', [
              { text: 'OK', onPress: () => router.back() }
            ]);
          }
        }
      ]
    );
  };

  if (!event) {
    return (
      <View style={commonStyles.container}>
        <View style={commonStyles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Icon name="arrow-back-outline" size={24} />
          </TouchableOpacity>
          <Text style={commonStyles.headerTitle}>Événement</Text>
          <View style={{ width: 24 }} />
        </View>
        <View style={commonStyles.content}>
          <Text style={commonStyles.text}>Événement non trouvé</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Détails</Text>
        <TouchableOpacity>
          <Icon name="heart-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={commonStyles.scrollContent}>
        {/* Event Image */}
        {event.imageUrl && (
          <Image
            source={{ uri: event.imageUrl }}
            style={{
              width: '100%',
              height: 250,
              borderRadius: 12,
              marginBottom: 20,
            }}
            resizeMode="cover"
          />
        )}

        {/* Event Info */}
        <View style={[commonStyles.badge, { alignSelf: 'flex-start', marginBottom: 12 }]}>
          <Text style={commonStyles.badgeText}>{event.category}</Text>
        </View>

        <Text style={commonStyles.title}>{event.title}</Text>
        <Text style={[commonStyles.text, { marginBottom: 20 }]}>{event.description}</Text>

        {/* Event Details */}
        <View style={commonStyles.card}>
          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="calendar-outline" size={20} style={{ marginRight: 12 }} />
              <View>
                <Text style={commonStyles.text}>{formatDate(event.date)}</Text>
                <Text style={commonStyles.textSecondary}>{event.time}</Text>
              </View>
            </View>
          </View>

          <View style={[commonStyles.row, { marginBottom: 12 }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="location-outline" size={20} style={{ marginRight: 12 }} />
              <Text style={commonStyles.text}>{event.location}</Text>
            </View>
          </View>

          <View style={commonStyles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="ticket-outline" size={20} style={{ marginRight: 12 }} />
              <Text style={commonStyles.text}>
                {event.availableTickets} / {event.totalTickets} places disponibles
              </Text>
            </View>
          </View>
        </View>

        {/* Quantity Selector */}
        <View style={[commonStyles.card, { marginTop: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Nombre de billets</Text>
          
          <View style={commonStyles.row}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.backgroundAlt,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 16,
                }}
                onPress={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                <Icon name="remove-outline" size={20} />
              </TouchableOpacity>
              
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '600', minWidth: 30, textAlign: 'center' }]}>
                {quantity}
              </Text>
              
              <TouchableOpacity
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: colors.backgroundAlt,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 16,
                }}
                onPress={() => handleQuantityChange(1)}
                disabled={quantity >= Math.min(10, event.availableTickets)}
              >
                <Icon name="add-outline" size={20} />
              </TouchableOpacity>
            </View>
            
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={[commonStyles.text, { fontSize: 12, color: colors.textSecondary }]}>
                Prix unitaire
              </Text>
              <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700', color: colors.primary }]}>
                {event.price}€
              </Text>
            </View>
          </View>
        </View>

        {/* Purchase Section */}
        <View style={[commonStyles.card, { marginTop: 20 }]}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Text style={commonStyles.subtitle}>Total</Text>
            <Text style={[commonStyles.title, { color: colors.primary, marginBottom: 0 }]}>
              {event.price * quantity}€
            </Text>
          </View>
          
          <Button
            text={`Acheter ${quantity} billet${quantity > 1 ? 's' : ''}`}
            onPress={handlePurchase}
            style={buttonStyles.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
}