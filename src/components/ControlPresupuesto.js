import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, Pressable, Platform, Image } from 'react-native'
import CircularProgress from 'react-native-circular-progress-indicator'
import { LinearGradient } from 'expo-linear-gradient'

import globalStyles from '../styles'
import { formatearCantidad } from '../helpers'

const ControlPresupuesto = ({ presupuesto, gastos, resetearApp }) => {

  const [ disponible, setDisponible ] = useState(0)
  const [ gastado, setGastado ] = useState(0)
  const [ porcentaje, setPorcentaje ] = useState(0)

  useEffect(() => {
    const totalGastado = gastos.reduce((total, gasto) => Number(gasto.cantidad) + total, 0 )
    const totalDisponible = presupuesto - totalGastado
    const nuevoPorcentaje = (
      ((presupuesto - totalDisponible) / presupuesto) * 100
    )
  
    setTimeout(() => {
      setPorcentaje(nuevoPorcentaje)
    }, 1000)

    setDisponible(totalDisponible)
    setGastado(totalGastado)
  }, [gastos])

  return (
    <View style={styles.contenedor}>
      {/* Gráfico circular moderno */}
      <View style={styles.graficaContainer}>
        <CircularProgress 
          value={porcentaje}
          duration={1000}
          radius={120}
          valueSuffix={'%'}
          title='Gastado'
          inActiveStrokeColor='#f1f5f9'
          inActiveStrokeWidth={16}
          activeStrokeColor='#1e40af'
          activeStrokeWidth={16}
          titleStyle={styles.tituloGrafica}
          titleColor='#64748b'
        />
      </View>



      {/* Cards de información */}
      <View style={styles.cardsContainer}>
        {/* Card Presupuesto */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../assets/presupuesto.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.cardTitle}>Presupuesto</Text>
          </View>
          <Text style={styles.cardAmount}>{formatearCantidad(presupuesto)}</Text>
        </View>

        {/* Card Disponible */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../assets/disponible.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.cardTitle}>Disponible</Text>
          </View>
          <Text style={[styles.cardAmount, { color: disponible >= 0 ? '#059669' : '#dc2626' }]}>
            {formatearCantidad(disponible)}
          </Text>
        </View>

        {/* Card Gastado */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.iconContainer}>
              <Image 
                source={require('../../assets/gastado.png')}
                style={styles.iconImage}
              />
            </View>
            <Text style={styles.cardTitle}>Gastado</Text>
          </View>
          <Text style={[styles.cardAmount, { color: '#dc2626' }]}>{formatearCantidad(gastado)}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    ...globalStyles.contenedor,
    paddingHorizontal: 20,
    paddingVertical: 30
  },
  graficaContainer: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 5,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    // Sombras optimizadas para Android
    ...Platform.select({
      android: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      }
    })
  },
  tituloGrafica: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#64748b'
  },

  cardsContainer: {
    gap: 16
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    // Sombra sutil para Android
    ...Platform.select({
      android: {
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }
    })
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain'
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'capitalize'
  },
  cardAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center'
  }
})

export default ControlPresupuesto