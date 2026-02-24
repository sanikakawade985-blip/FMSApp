import { StyleSheet } from 'react-native';
import { COLORS } from '../theme/colors';

export const GlobalStyles = StyleSheet.create({
  /* ===== Layout ===== */
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 30,
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* ===== Text ===== */
  title: {
    fontSize: 30,
    fontWeight: '400',
    color: COLORS.textPrimary,
    textAlign: 'center',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 20,
    color: COLORS.textTertiary,
    textAlign: 'center',
    marginBottom: 28,
  },

  label: {
    fontSize: 14,
    marginBottom: 6,
    color: COLORS.textTertiary,
  },

  footerText: { 
    marginTop: 22, 
    textAlign: 'center', 
    color: COLORS.textTertiary,
    fontSize: 18, 
},

  link: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 18,
  },

  errorText: {
    color: COLORS.primary,
    fontSize: 12,
    marginTop: -12,
    marginBottom: 16,
  },

  /* ===== Inputs ===== */
  input: {
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 26,
    paddingHorizontal: 16,
    width: '100%',
    height: 40,
    marginBottom: 16,
    fontSize: 17,
  },

  inputError: {
    borderColor: COLORS.primary,
  },

  /* ===== Dropdown / Selector ===== */
  dropdownWrapper: {
    borderWidth: 1,
    borderColor: '#505050',
    borderRadius: 26,
    height: 40,
    justifyContent: 'center',
    paddingHorizontal: 16,
    width: '100%',
    marginBottom: 20,
  },

  dropdownText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  /* ===== Modal ===== */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: '#FFFFFF',
    width: '80%',
    borderRadius: 12,
    paddingVertical: 8,
  },

  modalItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  modalItemText: {
    fontSize: 16,
    color: COLORS.textPrimary,
  },

  /* ===== OTP ===== */
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  otpInput: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    backgroundColor: '#FFFFFF',
  },

  header: {
    alignItems: 'center',
    marginBottom: 24,
  },

  logo: {
    width: 250,
    height: 180,
  },

  helpText: { 
    marginTop: 16, 
    textAlign: 'center', 
    color: COLORS.textPrimary, 
    fontSize: 18, 
    paddingVertical: 10,
}, 

helpButtonsRow: { 
    flexDirection: 'row', 
    justifyContent: 'center', 
    gap: 12, 
    marginTop: 25, 
}, 
helpButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderRadius: 24, 
}, 
whatsappButton: { 
    backgroundColor: '#25D366', 
}, 
videoButton: { 
    backgroundColor: '#111111', 
}, 
helpButtonText: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '600', 
    marginLeft: 6, 
}, 
languageRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginTop: 16, 
    paddingVertical: 10,
}, 
languageText: { 
    marginLeft: 6, 
    fontSize: 17, 
    fontWeight: 'bold', 
    color: COLORS.textPrimary, 
}, 
greeting: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
  username: {
    fontSize: 20,
    fontWeight: '600',
    color: COLORS.textPrimary,
  },
  primaryCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  primaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  primarySubtitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 6,
    opacity: 0.9,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionCard: {
    backgroundColor: '#fff',
    width: '30%',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    elevation: 2,
  },
  actionText: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.textPrimary,
  },
  section: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: COLORS.textPrimary,
  },
  recentCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    elevation: 1,
  },
  recentText: {
    fontSize: 14,
    color: COLORS.textMuted,
  },
},
);
