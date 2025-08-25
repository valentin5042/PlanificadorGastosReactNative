import React, { useState, useEffect } from 'react'
import { Text, SafeAreaView, View, TextInput, StyleSheet, Pressable, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { LinearGradient } from 'expo-linear-gradient'

import globalStyles from '../styles'

const FormularioGasto = ({ setModal, handleGasto, gasto, setGasto, eliminarGasto }) => {

    const [ nombre, setNombre ] = useState('')
    const [ cantidad, setCantidad ] = useState('')
    const [ categoria, setCategoria ] = useState('')
    const [ id, setId ] = useState('')
    const [ fecha, setFecha ] = useState('')

    useEffect(() => {
        if (gasto?.nombre) {
            setNombre(gasto.nombre)
            setCantidad(gasto.cantidad)
            setCategoria(gasto.categoria)
            setId(gasto.id)
            setFecha(gasto.fecha)
        }
    }, [gasto])


  return (
    <SafeAreaView style={styles.contenedor}>
        {/* Header con botones */}
        <View style={styles.header}>
            <Text style={styles.titulo}>{gasto?.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</Text>
            
            <View style={styles.contenedorBotones}>
                <Pressable 
                    onPress={() => {
                        setModal(false)
                        setGasto({})
                    }}
                    style={({ pressed }) => [
                        styles.btn,
                        styles.btnCancelar,
                        pressed && styles.btnPressed
                    ]}>
                    <Text style={styles.btnTexto}>Cancelar</Text>
                </Pressable>

                { !!id && (
                    <Pressable 
                        style={({ pressed }) => [
                            styles.btn,
                            styles.btnEliminar,
                            pressed && styles.btnPressed
                        ]}
                        onPress={() => eliminarGasto(id)}
                    >
                        <Text style={styles.btnTexto}>Eliminar</Text>
                    </Pressable>
                ) }
            </View>
        </View>

        {/* Formulario principal */}
        <View style={styles.formulario}>
            <View style={styles.campo}>
                <Text style={styles.label}>Nombre del Gasto</Text>
                <View style={styles.inputContainer}>
                    <TextInput 
                        style={styles.input}
                        placeholder='Ej. Comida, Transporte, Entretenimiento'
                        placeholderTextColor='#94a3b8'
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Cantidad</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.currencySymbol}>$</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder='0.00'
                        placeholderTextColor='#94a3b8'
                        keyboardType='numeric'
                        value={cantidad}
                        onChangeText={setCantidad}
                    />
                </View>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Categoría</Text>
                <View style={styles.pickerContainer}>
                    <Picker
                        selectedValue={categoria}
                        onValueChange={(valor) => {
                            setCategoria(valor)
                        }}
                        style={styles.picker}
                        itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label='-- Seleccione una categoría --' value="" />
                        <Picker.Item label='Ahorro' value="ahorro" />
                        <Picker.Item label='Comida' value="comida" />
                        <Picker.Item label='Casa' value="casa" />
                        <Picker.Item label='Gastos Varios' value="gastos" />
                        <Picker.Item label='Salud' value="salud" />
                        <Picker.Item label='Suscripciones' value="suscripciones" />
                    </Picker>
                </View>
            </View>

            {/* Botón principal */}
            <Pressable 
                style={({ pressed }) => [
                    styles.submitBtn,
                    pressed && styles.submitBtnPressed
                ]}
                onPress={() => handleGasto({ nombre, cantidad, categoria, id, fecha })}
            >
                <LinearGradient
                    colors={['#1e40af', '#1e3a8a', '#1e3a8a']}
                    style={styles.submitBtnGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Text style={styles.submitBtnTexto}>
                        {gasto?.nombre ? 'Guardar Cambios' : 'Agregar Gasto'}
                    </Text>
                </LinearGradient>
            </Pressable>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#000A2C',
        flex: 1
    },
    header: {
        paddingTop: Platform.OS === 'android' ? 40 : 30,
        paddingHorizontal: 20,
        paddingBottom: 20
    },
    titulo: {
        textAlign: 'center',
        fontSize: 28,
        marginBottom: 30,
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: 1
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12
    },
    btn: {
        flex: 1,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 12,
        alignItems: 'center',
        // Sombra para Android
        ...Platform.select({
            android: {
                elevation: 4,
            },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.3,
                shadowRadius: 4,
            }
        })
    },
    btnPressed: {
        transform: [{ scale: 0.98 }]
    },
    btnCancelar: {
        backgroundColor: '#6b7280',
    },
    btnEliminar: {
        backgroundColor: '#dc2626',
    },
    btnTexto: {
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '600',
        color: '#ffffff',
        fontSize: 14,
        letterSpacing: 0.5
    },
    formulario: {
        backgroundColor: '#ffffff',
        borderRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 25,
        paddingBottom: 25,
        marginHorizontal: 20,
        marginTop: 30
    },
    campo: {
        marginBottom: 16
    },
    label: {
        color: '#1e293b',
        textTransform: 'uppercase',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 0.5
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderWidth: 2,
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
    currencySymbol: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1e40af',
        marginRight: 12
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
        fontWeight: '500'
    },
    pickerContainer: {
        backgroundColor: '#f8fafc',
        borderRadius: 16,
        borderWidth: 2,
        borderColor: '#e2e8f0',
        overflow: 'hidden',
        paddingVertical: 8,
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
    picker: {
        backgroundColor: 'transparent',
        color: '#1e293b'
    },
    pickerItem: {
        fontSize: 16,
        color: '#1e293b'
    },
    submitBtn: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: 20,
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
    submitBtnPressed: {
        transform: [{ scale: 0.98 }]
    },
    submitBtnGradient: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        alignItems: 'center'
    },
    submitBtnTexto: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5
    }
})

export default FormularioGasto