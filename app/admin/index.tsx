import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors } from '../../styles/commonStyles';
import Icon from '../../components/Icon';
import EventCard from '../../components/EventCard';
import { Event } from '../../types/Event';

// Mock admin events data
const mockAdminEvents: Event[] = [
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
  }
];

export default function AdminDashboard() {
  const [events, setEvents] = useState<Event[]>(mockAdminEvents);

  const handleCreateEvent = () => {
    console.log('Create new event');
    router.push('/admin/create-event');
  };

  const handleEditEvent = (eventId: string) => {
    console.log('Edit event:', eventId);
    router.push(`/admin/edit-event/${eventId}`);
  };

  const handleViewStats = () => {
    console.log('View statistics');
    router.push('/admin/stats');
  };

  const getTotalRevenue = () => {
    return events.reduce((total, event) => {
      const soldTickets = event.totalTickets - event.availableTickets;
      return total + (soldTickets * event.price);
    }, 0);
  };

  const getTotalTicketsSold = () => {
    return events.reduce((total, event) => {
      return total + (event.totalTickets - event.availableTickets);
    }, 0);
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Administration</Text>
        <TouchableOpacity onPress={handleViewStats}>
          <Icon name="analytics-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={commonStyles.scrollContent}>
        {/* Stats Cards */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center' }]}>
            <Icon name="ticket-outline" size={24} style={{ marginBottom: 8 }} />
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.primary }]}>
              {getTotalTicketsSold()}
            </Text>
            <Text style={commonStyles.textSecondary}>Billets vendus</Text>
          </View>
          
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center' }]}>
            <Icon name="cash-outline" size={24} style={{ marginBottom: 8 }} />
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.success }]}>
              {getTotalRevenue()}€
            </Text>
            <Text style={commonStyles.textSecondary}>Revenus</Text>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={[commonStyles.card, { marginBottom: 20 }]}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Actions rapides</Text>
          
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
            }}
            onPress={handleCreateEvent}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Icon name="add-outline" size={20} style={{ tintColor: 'white' }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>Créer un événement</Text>
              <Text style={commonStyles.textSecondary}>Ajouter un nouvel événement</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} />
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 12,
            }}
            onPress={handleViewStats}
          >
            <View
              style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: colors.accent,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Icon name="analytics-outline" size={20} style={{ tintColor: 'white' }} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={commonStyles.text}>Voir les statistiques</Text>
              <Text style={commonStyles.textSecondary}>Analyser les performances</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} />
          </TouchableOpacity>
        </View>

        {/* Events Management */}
        <View style={{ marginBottom: 20 }}>
          <View style={[commonStyles.row, { marginBottom: 16 }]}>
            <Text style={commonStyles.subtitle}>Mes événements</Text>
            <TouchableOpacity onPress={handleCreateEvent}>
              <Icon name="add-circle-outline" size={24} />
            </TouchableOpacity>
          </View>

          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onPress={() => handleEditEvent(event.id)}
            />
          ))}

          {events.length === 0 && (
            <View style={[commonStyles.card, { alignItems: 'center', paddingVertical: 40 }]}>
              <Icon name="calendar-outline" size={48} style={{ tintColor: colors.textSecondary, marginBottom: 16 }} />
              <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 8 }]}>
                Aucun événement créé
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                Commencez par créer votre premier événement
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}