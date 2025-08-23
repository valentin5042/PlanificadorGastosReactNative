import React, { useState } from 'react'
import { View, Text, TextInput, Pressable, StyleSheet, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

const NuevoPresupuesto = ({ presupuesto, setPresupuesto, handleNuevoPresupuesto }) => {
  const [presupuestoLocal, setPresupuestoLocal] = useState('')

  return (
    <View style={styles.contenedor}>
      {/* Header minimalista */}
      <View style={styles.header}>
        <Text style={styles.subtitulo}>Establece tu límite de gastos mensual</Text>
      </View>

      {/* Input ultra moderno */}
      <View style={styles.inputContainer}>
        <LinearGradient
          colors={['#f0f9ff', '#e0f2fe', '#bae6fd']}
          style={styles.inputWrapper}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.currencySymbol}>$</Text>
          <TextInput 
            keyboardType='numeric'
            placeholder='Ingresa tu presupuesto'
            placeholderTextColor='#94a3b8'
            style={styles.input}
            value={presupuestoLocal}
            onChangeText={setPresupuestoLocal}
          />
        </LinearGradient>
      </View>

      {/* Botón ultra moderno */}
      <Pressable 
        style={({ pressed }) => [
          styles.boton,
          pressed && styles.botonPressed
        ]}
        onPress={() => handleNuevoPresupuesto(presupuestoLocal)}
      >
        <LinearGradient
          colors={['#3b82f6', '#1d4ed8']}
          style={styles.botonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.botonTexto}>Continuar</Text>
        </LinearGradient>
      </Pressable>

      {/* Información adicional */}
      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoIcon}>📈</Text>
          <Text style={styles.infoTitle}>Consejo de Inversión</Text>
          <Text style={styles.infoText}>Establece un presupuesto realista y considera destinar el 20% a ahorros e inversiones</Text>
        </View>
        
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
        marginHorizontal: 20,
        borderRadius: 24,
        paddingVertical: 50,
        paddingHorizontal: 40,
        marginTop: 40,
        shadowColor: "#60a5fa",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        elevation: 15,
        // Efecto neon con múltiples sombras
        borderWidth: 1,
        borderColor: '#60a5fa',
        // Sombra interna para efecto glow
        shadowColor: "#60a5fa",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.8,
        shadowRadius: 20,
        // Sombra externa adicional para más profundidad
        shadowColor: "#3b82f6",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 30,
    },
    header: {
        alignItems: 'center',
        marginBottom: 50
    },
    subtitulo: {
        fontSize: 18,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 26,
        fontWeight: '400'
    },
    inputContainer: {
        marginBottom: 50
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 24,
        paddingVertical: 20,
        borderWidth: 2,
        borderColor: '#60a5fa',
        marginBottom: 16,
        shadowColor: "#60a5fa",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.6,
        shadowRadius: 15,
        elevation: 10,
    },
    currencySymbol: {
        fontSize: 28,
        fontWeight: '600',
        color: '#3b82f6',
        marginRight: 12
    },
    input: {
        flex: 1,
        fontSize: 20,
        fontWeight: '600',
        color: '#1e293b',
        textAlign: 'center'
    },
    inputHint: {
        fontSize: 14,
        color: '#94a3b8',
        textAlign: 'center',
        fontWeight: '400'
    },
    boton: {
        borderRadius: 20,
        overflow: 'hidden',
        marginBottom: 20
    },
    botonPressed: {
        transform: [{ scale: 0.96 }]
    },
    botonGradient: {
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center'
    },
    botonTexto: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5
    },
    infoSection: {
        marginTop: 40,
        paddingTop: 30,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    infoCard: {
        backgroundColor: '#f9f9f9',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
    },
    infoIcon: {
        fontSize: 30,
        marginBottom: 10,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    infoText: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    statItem: {
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#3b82f6',
    },
    statLabel: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 5,
    },
})

export default NuevoPresupuesto