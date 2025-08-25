import React from 'react'
import { Text, SafeAreaView, StyleSheet, Platform, StatusBar, Pressable, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

const Header = ({ resetearApp, mostrarBoton = false }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {mostrarBoton ? (
        // Mostrar botón de reiniciar cuando hay presupuesto
        <View style={styles.botonContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.boton,
              pressed && styles.botonPressed
            ]}
            onPress={resetearApp}
          >
            <LinearGradient
              colors={['#dc2626', '#b91c1c', '#991b1b']}
              style={styles.botonGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Text style={styles.textoBoton}>Reiniciar App</Text>
            </LinearGradient>
          </Pressable>
        </View>
      ) : (
        // Mostrar título cuando no hay presupuesto
        <View style={styles.tituloContainer}>
          <Text style={styles.titulo}>PLANIFICADOR DE GASTOS</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#000A2C',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  tituloContainer: {
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 20,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 1
  },
  botonContainer: {
    paddingTop: Platform.OS === 'android' ? 20 : 10,
    paddingBottom: 2,
    paddingHorizontal: 20,
  },
  boton: {
    borderRadius: 16,
    overflow: 'hidden',
    // Sombra para Android
    ...Platform.select({
      android: {
        elevation: 6,
      },
      ios: {
        shadowColor: '#dc2626',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 6,
      }
    })
  },
  botonPressed: {
    transform: [{ scale: 0.98 }]
  },
  botonGradient: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBoton: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  }
})

export default Header