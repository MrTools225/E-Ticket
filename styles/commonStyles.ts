import { StyleSheet, ViewStyle, TextStyle } from 'react-native';

export const colors = {
  primary: '#2563eb',      // Blue
  secondary: '#1d4ed8',    // Darker Blue
  accent: '#10b981',       // Green
  background: '#ffffff',   // White
  backgroundAlt: '#f8fafc', // Light Gray
  text: '#1f2937',         // Dark Gray
  textSecondary: '#6b7280', // Medium Gray
  grey: '#e5e7eb',         // Light Gray
  card: '#ffffff',         // White
  border: '#d1d5db',       // Border Gray
  success: '#10b981',      // Green
  warning: '#f59e0b',      // Orange
  error: '#ef4444',        // Red
};

export const buttonStyles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  secondary: {
    backgroundColor: colors.accent,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  danger: {
    backgroundColor: colors.error,
    alignSelf: 'center',
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
});

export const commonStyles = StyleSheet.create({
  wrapper: {
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: colors.text,
    marginBottom: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.text,
    marginBottom: 8,
    lineHeight: 24,
  },
  textSecondary: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textSecondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  section: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    elevation: 3,
  },
  eventCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    width: '100%',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.text,
    width: '100%',
    marginBottom: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: colors.background,
    color: colors.text,
    width: '100%',
    marginBottom: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.text,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingVertical: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
  },
  tabItemActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 2,
    borderTopColor: colors.primary,
  },
  tabText: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  tabTextActive: {
    fontSize: 12,
    color: colors.primary,
    marginTop: 4,
    fontWeight: '600',
  },
  badge: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 24,
    alignItems: 'center',
  },
  badgeText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  centerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: colors.primary,
  },
  // Nouveaux styles pour améliorer la visibilité
  pressable: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  pressablePressed: {
    opacity: 0.7,
  },
  shadow: {
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  shadowPressed: {
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.1)',
    elevation: 1,
  },
});