export const formatearCantidad = cantidad => {



    return Number(cantidad).toLocaleString('es-MX', {
        style: 'currency',
        currency: 'MXN'
    })
}

export const formatearFecha = fecha => {
    const fechaNueva = new Date(fecha)
    const opciones = {
        year: 'numeric',
        month: 'short',
        day: '2-digit'
    }
    return fechaNueva.toLocaleDateString('es-ES', opciones)
}

export const generarId = () => {
    const random = Math.random().toString(36).substring(2, 11)
    const fecha = Date.now().toString(36)

    return random + fecha
}