import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
}

export default function Button({ 
  text, 
  onPress, 
  style, 
  textStyle, 
  variant = 'primary',
  disabled = false 
}: ButtonProps) {
  console.log('Button rendered:', text, 'variant:', variant, 'disabled:', disabled);
  
  const getButtonStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      case 'danger':
        return styles.dangerButton;
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'outline':
        return styles.outlineButtonText;
      default:
        return styles.buttonText;
    }
  };

  return (
    <TouchableOpacity 
      style={[
        styles.baseButton, 
        getButtonStyle(), 
        disabled && styles.disabledButton,
        style
      ]} 
      onPress={disabled ? undefined : onPress} 
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[
        getTextStyle(), 
        disabled && styles.disabledText,
        textStyle
      ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  baseButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
    width: '100%',
    marginVertical: 8,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    elevation: 3,
  },
  primaryButton: {
    backgroundColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.accent,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: colors.primary,
  },
  dangerButton: {
    backgroundColor: colors.error,
  },
  disabledButton: {
    backgroundColor: colors.grey,
    boxShadow: 'none',
    elevation: 0,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  outlineButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  disabledText: {
    color: colors.textSecondary,
  },
});