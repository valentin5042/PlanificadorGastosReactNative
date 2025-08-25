import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions, Platform } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, handleNuevoPresupuesto }) => {
  const [presupuestoLocal, setPresupuestoLocal] = useState('')

  return (
    <View style={styles.contenedor}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>PLANIFICADOR DE GASTOS</Text>
        <Text style={styles.subtitulo}>Establece tu límite de gastos mensual</Text>
      </View>

      {/* Input principal */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput 
            keyboardType='numeric'
            placeholder='Ingresa tu presupuesto'
            placeholderTextColor='#94a3b8'
            style={styles.input}
            value={presupuestoLocal}
            onChangeText={setPresupuestoLocal}
          />
        </View>
      </View>

      {/* Botón continuar */}
      <Pressable 
        style={({ pressed }) => [
          styles.boton,
          presupuestoLocal.trim() === '' ? styles.botonDesactivado : null,
          pressed && presupuestoLocal.trim() !== '' && styles.botonPressed
        ]}
        onPress={() => {
          if (presupuestoLocal.trim() !== '') {
            handleNuevoPresupuesto(presupuestoLocal)
          }
        }}
        disabled={presupuestoLocal.trim() === ''}
      >
        <LinearGradient
          colors={presupuestoLocal.trim() === '' 
            ? ['#6b7280', '#4b5563', '#374151'] 
            : ['#1e40af', '#1e3a8a', '#1e3a8a']
          }
          style={styles.botonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={[
            styles.botonTexto,
            presupuestoLocal.trim() === '' && styles.botonTextoDesactivado
          ]}>
            Continuar
          </Text>
        </LinearGradient>
      </Pressable>

      {/* Consejo de inversión */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <View style={styles.infoHeader}>
            <Text style={styles.infoIcon}>📈</Text>
            <Text style={styles.infoTitle}>Consejo de Inversión</Text>
          </View>
          <Text style={styles.infoText}>
            Establece un presupuesto realista y considera destinar el 20% a ahorros e inversiones
          </Text>
        </View>
        
        {/* Estadísticas de presupuesto */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>50%</Text>
            <Text style={styles.statLabel}>Gastos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>30%</Text>
            <Text style={styles.statLabel}>Deseos</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20%</Text>
            <Text style={styles.statLabel}>Ahorro</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#dbeafe',
    // Sombras optimizadas para Android con efecto glow azul
    ...Platform.select({
      android: {
        elevation: 8,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
      },
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
      }
    })
  },
  header: {
    alignItems: 'center',
    marginBottom: 32
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1
  },
  subtitulo: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '400'
  },
  inputContainer: {
    marginBottom: 32
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#dbeafe',
    // Sombra sutil para Android con efecto glow azul
    ...Platform.select({
      android: {
        elevation: 3,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      ios: {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
      }
    })
  },
  currencySymbol: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e40af',
    marginRight: 12
  },
  input: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#1e293b',
    textAlign: 'center'
  },
  boton: {
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    // Sombra para Android
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#1e40af',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      }
    })
  },
  botonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  botonDesactivado: {
    opacity: 0.6,
  },
  botonPressed: {
    transform: [{ scale: 0.98 }]
  },
  botonTextoDesactivado: {
    color: '#ffffff',
  },
  botonTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5
  },
  infoSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  infoCard: {
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    // Sombra sutil para Android
    ...Platform.select({
      android: {
        elevation: 2,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      }
    })
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  infoIcon: {
    fontSize: 24,
    marginRight: 12
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1
  },
  infoText: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#f1f5f9',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16
  },
  statItem: {
    alignItems: 'center',
    flex: 1
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 4
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
    textAlign: 'center'
  }
})

export default NuevoPresupuesto