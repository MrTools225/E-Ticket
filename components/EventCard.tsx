import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import Icon from './Icon';
import { Event } from '../types/Event';

interface EventCardProps {
  event: Event;
  onPress: () => void;
}

export default function EventCard({ event, onPress }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getAvailabilityColor = () => {
    const percentage = (event.availableTickets / event.totalTickets) * 100;
    if (percentage > 50) return colors.success;
    if (percentage > 20) return colors.warning;
    return colors.error;
  };

  return (
    <TouchableOpacity style={commonStyles.eventCard} onPress={onPress}>
      {event.imageUrl && (
        <Image
          source={{ uri: event.imageUrl }}
          style={{
            width: '100%',
            height: 150,
            borderRadius: 8,
            marginBottom: 12,
          }}
          resizeMode="cover"
        />
      )}
      
      <View style={{ marginBottom: 8 }}>
        <View style={[commonStyles.badge, { alignSelf: 'flex-start', marginBottom: 8 }]}>
          <Text style={commonStyles.badgeText}>{event.category}</Text>
        </View>
        <Text style={[commonStyles.subtitle, { marginBottom: 4 }]}>{event.title}</Text>
        <Text style={commonStyles.textSecondary} numberOfLines={2}>
          {event.description}
        </Text>
      </View>

      <View style={{ marginBottom: 12 }}>
        <View style={[commonStyles.row, { marginBottom: 4 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="calendar-outline" size={16} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>{formatDate(event.date)}</Text>
          </View>
          <Text style={[commonStyles.text, { fontWeight: '600' }]}>{event.time}</Text>
        </View>
        
        <View style={[commonStyles.row, { marginBottom: 8 }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="location-outline" size={16} style={{ marginRight: 8 }} />
            <Text style={commonStyles.textSecondary}>{event.location}</Text>
          </View>
        </View>
      </View>

      <View style={commonStyles.row}>
        <View>
          <Text style={[commonStyles.text, { fontSize: 18, fontWeight: '700', color: colors.primary }]}>
            {event.price}€
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: getAvailabilityColor(),
                marginRight: 6,
              }}
            />
            <Text style={[commonStyles.textSecondary, { fontSize: 12 }]}>
              {event.availableTickets} places disponibles
            </Text>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={[commonStyles.textSecondary, { marginRight: 4 }]}>Voir détails</Text>
          <Icon name="chevron-forward-outline" size={16} />
        </View>
      </View>
    </TouchableOpacity>
  );
}