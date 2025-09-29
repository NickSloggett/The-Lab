/**
 * Design System - Shadows
 * 
 * Shadow styles for elevation and depth.
 * Platform-specific implementations for iOS and Android.
 * 
 * @example
 * import { shadows } from '@/design-system'
 * 
 * <View style={[styles.card, shadows.md]}>
 *   {/* Content */}
 * </View>
 */

import { Platform, ViewStyle } from 'react-native'

type ShadowStyle = Pick<
  ViewStyle,
  'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius' | 'elevation'
>

// iOS shadows use shadowColor, shadowOffset, shadowOpacity, shadowRadius
// Android uses elevation (Material Design)

const createShadow = (
  elevation: number,
  shadowOpacity: number = 0.1
): ShadowStyle => {
  if (Platform.OS === 'android') {
    return {
      elevation,
    }
  }

  // iOS shadow calculation
  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: elevation / 2,
    },
    shadowOpacity,
    shadowRadius: elevation,
  }
}

export const shadows = {
  /** No shadow */
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  } as ShadowStyle,

  /** Extra small shadow - subtle depth */
  xs: createShadow(1, 0.05),

  /** Small shadow - cards on background */
  sm: createShadow(2, 0.1),

  /** Medium shadow - raised cards */
  md: createShadow(4, 0.12),

  /** Large shadow - floating elements */
  lg: createShadow(8, 0.15),

  /** Extra large shadow - modals and sheets */
  xl: createShadow(12, 0.18),

  /** Maximum shadow - important dialogs */
  '2xl': createShadow(16, 0.2),
}

// Inset shadows (only for iOS, Android doesn't support)
export const innerShadows = Platform.select({
  ios: {
    xs: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 1,
    } as ShadowStyle,
    
    sm: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    } as ShadowStyle,
  },
  default: {
    xs: {},
    sm: {},
  },
})

// Colored shadows (for special emphasis)
export const coloredShadows = {
  primary: {
    ...createShadow(8, 0.3),
    shadowColor: '#8B5CF6',
  } as ShadowStyle,
  
  success: {
    ...createShadow(8, 0.3),
    shadowColor: '#10B981',
  } as ShadowStyle,
  
  error: {
    ...createShadow(8, 0.3),
    shadowColor: '#EF4444',
  } as ShadowStyle,
}
