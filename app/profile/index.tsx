import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { router } from 'expo-router';
import { commonStyles, colors, buttonStyles } from '../../styles/commonStyles';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import { Ticket } from '../../types/Event';

// Mock user tickets data
const mockTickets: Ticket[] = [
  {
    id: '1',
    eventId: '1',
    userId: 'user1',
    purchaseDate: '2024-01-15',
    quantity: 2,
    totalPrice: 90,
    status: 'active',
  },
  {
    id: '2',
    eventId: '2',
    userId: 'user1',
    purchaseDate: '2024-01-10',
    quantity: 1,
    totalPrice: 35,
    status: 'used',
  }
];

export default function ProfileScreen() {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [user] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com'
  });

  const handleLogout = () => {
    Alert.alert(
      'Déconnexion',
      'Êtes-vous sûr de vouloir vous déconnecter ?',
      [
        { text: 'Annuler', style: 'cancel' },
        { 
          text: 'Déconnexion', 
          style: 'destructive',
          onPress: () => {
            console.log('User logged out');
            router.replace('/');
          }
        }
      ]
    );
  };

  const handleTicketPress = (ticketId: string) => {
    console.log('View ticket:', ticketId);
    router.push(`/ticket/${ticketId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return colors.success;
      case 'used': return colors.textSecondary;
      case 'cancelled': return colors.error;
      default: return colors.textSecondary;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Actif';
      case 'used': return 'Utilisé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <View style={commonStyles.container}>
      {/* Header */}
      <View style={commonStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Icon name="arrow-back-outline" size={24} />
        </TouchableOpacity>
        <Text style={commonStyles.headerTitle}>Profil</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={commonStyles.scrollContent}>
        {/* User Info */}
        <View style={[commonStyles.card, { alignItems: 'center', marginBottom: 20 }]}>
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.primary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Text style={{ color: 'white', fontSize: 32, fontWeight: '600' }}>
              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
            </Text>
          </View>
          <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>
            {user.firstName} {user.lastName}
          </Text>
          <Text style={commonStyles.textSecondary}>{user.email}</Text>
        </View>

        {/* Stats */}
        <View style={{ flexDirection: 'row', gap: 12, marginBottom: 20 }}>
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center' }]}>
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.primary }]}>
              {tickets.length}
            </Text>
            <Text style={commonStyles.textSecondary}>Billets</Text>
          </View>
          
          <View style={[commonStyles.card, { flex: 1, alignItems: 'center' }]}>
            <Text style={[commonStyles.text, { fontSize: 20, fontWeight: '700', color: colors.success }]}>
              {tickets.reduce((sum, ticket) => sum + ticket.totalPrice, 0)}€
            </Text>
            <Text style={commonStyles.textSecondary}>Dépensé</Text>
          </View>
        </View>

        {/* My Tickets */}
        <View style={{ marginBottom: 20 }}>
          <Text style={[commonStyles.subtitle, { marginBottom: 16 }]}>Mes billets</Text>

          {tickets.map((ticket) => (
            <TouchableOpacity
              key={ticket.id}
              style={commonStyles.card}
              onPress={() => handleTicketPress(ticket.id)}
            >
              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={[commonStyles.text, { fontWeight: '600' }]}>
                  Billet #{ticket.id}
                </Text>
                <View
                  style={[
                    commonStyles.badge,
                    { backgroundColor: getStatusColor(ticket.status) }
                  ]}
                >
                  <Text style={commonStyles.badgeText}>
                    {getStatusText(ticket.status)}
                  </Text>
                </View>
              </View>

              <View style={[commonStyles.row, { marginBottom: 4 }]}>
                <Text style={commonStyles.textSecondary}>Quantité</Text>
                <Text style={commonStyles.text}>{ticket.quantity}</Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 4 }]}>
                <Text style={commonStyles.textSecondary}>Total payé</Text>
                <Text style={[commonStyles.text, { fontWeight: '600', color: colors.primary }]}>
                  {ticket.totalPrice}€
                </Text>
              </View>

              <View style={[commonStyles.row, { marginBottom: 8 }]}>
                <Text style={commonStyles.textSecondary}>Date d'achat</Text>
                <Text style={commonStyles.textSecondary}>
                  {new Date(ticket.purchaseDate).toLocaleDateString('fr-FR')}
                </Text>
              </View>

              <View style={[commonStyles.row, { alignItems: 'center' }]}>
                <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
                  Voir les détails
                </Text>
                <Icon name="chevron-forward-outline" size={16} />
              </View>
            </TouchableOpacity>
          ))}

          {tickets.length === 0 && (
            <View style={[commonStyles.card, { alignItems: 'center', paddingVertical: 40 }]}>
              <Icon name="ticket-outline" size={48} style={{ tintColor: colors.textSecondary, marginBottom: 16 }} />
              <Text style={[commonStyles.text, { textAlign: 'center', marginBottom: 8 }]}>
                Aucun billet
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center' }]}>
                Vous n'avez pas encore acheté de billets
              </Text>
            </View>
          )}
        </View>

        {/* Actions */}
        <View style={{ marginBottom: 40 }}>
          <Button
            text="Déconnexion"
            onPress={handleLogout}
            style={buttonStyles.outline}
          />
        </View>
      </ScrollView>
    </View>
  );
}