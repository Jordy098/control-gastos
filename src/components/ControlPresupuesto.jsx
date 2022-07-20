import {useState,useEffect} from 'react'
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    filtro,
    gastosFiltrados,
    setIsValidPresupuesto,
}) => {

    const [porcentaje, setPorcentaje]=useState(0)
    const [disponible, setDisponible]=useState(0)
    const [gastado, setGastado]=useState(0)

    useEffect(()=>{
        const nuevo_gastos=filtro?gastosFiltrados:gastos
        const totalGastos=nuevo_gastos.reduce((total, gasto)=>gasto.cantidad+total,0)
        const totalDisponible = presupuesto- totalGastos;
        const nuevoPorcentaje = (((presupuesto-totalDisponible)/presupuesto)*100).toFixed(2)

        setDisponible(totalDisponible)
        setGastado(totalGastos)
        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
    },[gastos,gastosFiltrados])

    const formatearCantidad=(cantidad)=>{
        return cantidad.toLocaleString('en-US',{
            style: 'currency',
            currency: 'CLP'
        }).replace('CLP','$')
    }

    const handleResetApp = () => {
        const resultado = confirm('¿Deseas reiniciar presupuesto y gastos?');
        if(resultado){
            console.log("Gastos")
            console.log("Presupuesto")
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }else{
            console.log("Reseteando la App")
        }
    }

    return (
        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje>100?'#DC2626':'#3B82F6',
                        trailColor:'#F5F5F5',
                        textColor: porcentaje>100?'#DC2626':'#3B82F6'
                    })}
                    value={porcentaje}
                    text={`${porcentaje}% Gastado`}
                />
            </div>

            <div className='contenido-presupuesto'>
                <button 
                    className='reset-app'
                    type='button'
                    onClick={handleResetApp}
                >
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
                </p>

                <p className={`${disponible<0?'negativo':''}`}>
                    <span>Disponible: </span> {formatearCantidad(disponible)}
                </p>

                <p>
                    <span>Gastado: </span> {formatearCantidad(gastado)}
                </p>
            </div>
        </div>
    )
};

export default ControlPresupuesto;
