import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useState, useEffect } from 'react';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from '../components/Icon';
import EventCard from '../components/EventCard';
import { Event } from '../types/Event';

// Mock data for events
const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Concert de Jazz',
    description: 'Une soirée exceptionnelle avec les meilleurs musiciens de jazz de la région.',
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
    description: 'Représentation du célèbre "Hamlet" par la troupe nationale.',
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
    description: 'Découvrez les saveurs du monde avec nos chefs renommés.',
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

export default function HomeScreen() {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    // This would normally check AsyncStorage or authentication state
    console.log('Checking authentication status...');
  }, []);

  const handleEventPress = (eventId: string) => {
    console.log('Event pressed:', eventId);
    router.push(`/event/${eventId}`);
  };

  const handleLoginPress = () => {
    console.log('Login pressed');
    router.push('/auth/login');
  };

  const handleProfilePress = () => {
    console.log('Profile pressed');
    router.push('/profile');
  };

  const handleAdminPress = () => {
    console.log('Admin pressed');
    router.push('/admin');
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <Text style={commonStyles.headerTitle}>BilletApp</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <TouchableOpacity onPress={handleAdminPress}>
            <Icon name="settings-outline" size={24} />
          </TouchableOpacity>
          <TouchableOpacity onPress={isLoggedIn ? handleProfilePress : handleLoginPress}>
            <Icon name={isLoggedIn ? "person-outline" : "log-in-outline"} size={24} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={commonStyles.scrollContent}>
        <Text style={commonStyles.title}>Événements à venir</Text>
        <Text style={commonStyles.textSecondary}>
          Découvrez les meilleurs événements près de chez vous
        </Text>

        {/* Events List */}
        <View style={{ marginTop: 20 }}>
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEventPress(event.id)}
            />
          ))}
        </View>

        {events.length === 0 && (
          <View style={[commonStyles.card, { alignItems: 'center', marginTop: 40 }]}>
            <Icon name="calendar-outline" size={48} style={{ tintColor: colors.textSecondary }} />
            <Text style={[commonStyles.text, { textAlign: 'center', marginTop: 16 }]}>
              Aucun événement disponible pour le moment
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}