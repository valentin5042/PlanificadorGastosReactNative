import React, { useState, useEffect } from 'react';
import { StyleSheet,ScrollView, View, Alert, Pressable, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from './src/components/Header'
import NuevoPresupuesto from './src/components/NuevoPresupuesto'
import ControlPresupuesto from './src/components/ControlPresupuesto';
import FormularioGasto from './src/components/FormularioGasto';
import ListadoGastos from './src/components/ListadoGastos';
import Filtro from './src/components/Filtro';
import { generarId } from './src/helpers/index'

const App = () => {

  const [ isValidPresupuesto, setIsValidPresupuesto ] = useState(false)
  const [ presupuesto, setPresupuesto ] = useState(0)
  const [ gastos, setGastos ] = useState([])
  const [ modal, setModal ] = useState(false)
  const [ gasto, setGasto ] = useState({})
  const [ filtro, setFiltro ] = useState('')
  const [ gastosFiltrados, setGastosFiltrados ] = useState({})

  useEffect(() => {
    const obtenerPresupuestoStorage = async () => {
      try {
        const presupuestoStorage = await AsyncStorage.getItem('planificador_presupuesto') ?? 0

        if ( presupuestoStorage > 0 ) {
          setPresupuesto(presupuestoStorage)
          setIsValidPresupuesto(true)
        }

      } catch (error) {
        
      }
    }
    obtenerPresupuestoStorage()
  }, [])


useEffect(() => {
  if (isValidPresupuesto && presupuesto > 0) {
    const guardarPresupuestoStorage = async () => {
      try {
        await AsyncStorage.setItem('planificador_presupuesto', presupuesto.toString())
      } catch (error) {
        console.log(error)
      }
    }
    guardarPresupuestoStorage()
  }
}, [ presupuesto, isValidPresupuesto ])


useEffect(() => {
  const obtenerGastosStorage = async () => {
    try {
      const gastosStorage = await AsyncStorage.getItem('planificador_gastos') ?? []
      
      setGastos( gastosStorage ? JSON.parse(gastosStorage) : [] )
    } catch (error) {
      console.log(error)
    }
  }
  obtenerGastosStorage()
}, [])



useEffect(() => {
  const guardarGastosStorage = async () => {
    try {
      await AsyncStorage.setItem('planificador_gastos', JSON.stringify(gastos))
    } catch (error) {
      console.log(error)
    }
  }
  guardarGastosStorage()
}, [gastos])

  const handleNuevoPresupuesto = (presupuesto) => {
    const presupuestoNumero = Number(presupuesto)
    
    if (presupuestoNumero > 0) {
      setPresupuesto(presupuestoNumero)
      setIsValidPresupuesto(true)
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor', 'ok')
    }
  }

  const handleGasto = gasto => {

    if ([ gasto.nombre, gasto.categoria, gasto.cantidad ].includes('')) {
      Alert.alert(
        "Error",
        "Todos los campos son obligatorios"
      )

      return
    }

    if (gasto.id) {
      const gastosActualizados = gastos.map( gastoState => gastoState.id === gasto.id ? gasto : gastoState )

      setGastos(gastosActualizados)
      
    } else {
      //añadir el nuevo gasto al state
        gasto.id = generarId()
        gasto.fecha = Date.now()

    setGastos([...gastos, gasto])
    }


    setModal(!modal)
  }


  const eliminarGasto = id =>  {
    Alert.alert(
      '¿Deseas eliminar este gasto',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, eliminar', onPress: () => {

          const gastosActualizados = gastos.filter( gastoState => gastoState.id !== id)
          
          setGastos(gastosActualizados)
          setModal(!modal)
          setGasto({})
        }}
      ]

    )
  }


  const resetearApp = () => {
    Alert.alert(
      'Deseas resetear la app',
      'Esto eliminará el prsupuesto y los gastos',
      [
        {text: 'No', style: 'cancel'},
        {text: 'Si, eliminar', onPress: async () => {
          try {
            await AsyncStorage.clear()

            setIsValidPresupuesto(false)
            setPresupuesto(0)
            setGastos([])

          } catch (error) {
            console.log(error)
          }
        } }
      ]
    )
  }


  return (
    <View style={styles.contenedor}>
      {isValidPresupuesto ? (
        <ScrollView>
          <View style={styles.header}>
            <Header/>
            <ControlPresupuesto 
              presupuesto={presupuesto}
              gastos={gastos}
              resetearApp={resetearApp}
            />
          </View>

          <Filtro 
            filtro={filtro}
            setFiltro={setFiltro}
            gastos={gastos}
            setGastosFiltrados={setGastosFiltrados}
          />
          <ListadoGastos 
            gastos={gastos}
            setModal={setModal}
            setGasto={setGasto}
            filtro={filtro}
            gastosFiltrados={gastosFiltrados}
          />
        </ScrollView>
      ) : (
        <View style={styles.header}>
          <Header/>
          <NuevoPresupuesto
            presupuesto={presupuesto}
            setPresupuesto={setPresupuesto}
            handleNuevoPresupuesto={handleNuevoPresupuesto}
          />
        </View>
      )}

      {modal && (
        <Modal
        animationType='slide'
          visible={modal}
          onRequestClose={() => {
            setModal(!modal)
          }}
        >
          <FormularioGasto 
            setModal={setModal}
            handleGasto={handleGasto}
            gasto={gasto}
            setGasto={setGasto}
            eliminarGasto={eliminarGasto}
          />
        </Modal>
      )}

      {isValidPresupuesto && (
        <Pressable
          style={styles.pressable}
          onPress={() => setModal(!modal)}
        >
          <Image
          style={styles.imagen}
            source={require('./src/img/nuevo-gasto.png')}
            
          />
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
    contenedor: {
      backgroundColor: '#1e40af',
      flex: 1
    },
    header: {
      flex: 1,
      justifyContent: 'center'
    },
    pressable: {
      width: 60,
      height: 60,
      position: 'absolute',
      bottom: 40,
      right: 30
    },
    imagen: {
      width: 60,
      height: 60,

    }
});

export default App;