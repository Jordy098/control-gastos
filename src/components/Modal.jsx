import { useState,useEffect } from 'react'
import CerrarBtn from './../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal,
    animarModal,
    setAnimarModal,
    guardarGasto,
    gastoEditar,
    setGastoEditar,
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('')

    useEffect(()=>{
        if(Object.keys(gastoEditar).length>0){
            setNombre(gastoEditar.nombre)
            setCantidad(Number(gastoEditar.cantidad))
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }
    },[gastoEditar])

    const OcultarModal=()=>{
        setNombre('')
        setCantidad(0)
        setCategoria('')
        setAnimarModal(false)

        setTimeout(()=>{
            setModal(false)
            setGastoEditar({})
        },500)
    }

    const handleSubmit = e =>{
        e.preventDefault();

        if([nombre, categoria].includes('') || cantidad==0){
            setMensaje('Fallo la validación')

            setTimeout(()=>{
                setMensaje('')
            },3000)

            return;
        }

        guardarGasto({nombre,cantidad,categoria,id,fecha})
        setNombre('')
        setCantidad(0)
        setCategoria('')
        OcultarModal()
    }

    return (
    <div className="modal">
        <div className="cerrar-modal">
            <img
                src={CerrarBtn}
                alt="cerrar modal"
                onClick={OcultarModal}
            />
        </div>

        <form 
            onSubmit={handleSubmit} 
            className={`formulario ${animarModal?"animar":'cerrar'}`}>
            <legend>{gastoEditar.nombre?"Editar Gasto":"Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error">
                            {mensaje}
                        </Mensaje>}
            <div className='campo'>
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                    id="nombre"
                    type={"text"}
                    placeholder='Añade el Nombre del Gasto'
                    value={nombre}
                    onChange={e=>setNombre(e.target.value)}
                />
            </div>
            <div className='campo'>
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    id="cantidad"
                    type={"number"}
                    value={cantidad}
                    placeholder='Añade La cantidad del gasto: ej. 300'
                    onChange={e=>setCantidad(Number(e.target.value))}
                />
            </div>
            <div className='campo'>
                <label htmlFor="categoria">Categoria</label>

                <select
                    id="categoria"
                    value={categoria}
                    onChange={e=>setCategoria(e.target.value)}
                >
                    <option value={""}>-- Seleccione --</option>
                    <option value={"ahorro"}>Ahorro</option>
                    <option value={"comida"}>Comida</option>
                    <option value={"casa"}>Casa</option>
                    <option value={"gastos"}>Gastos Varios</option>
                    <option value={"ocio"}>Ocio</option>
                    <option value={"salud"}>Salud</option>
                    <option value={"suscripciones"}>Suscripciones</option>
                </select>
            </div>

            <input 
                type={"submit"}
                value={gastoEditar.nombre?"Editar Gasto":"Añadir Gasto"}
            />

        </form>
    </div>
    )
}

export default Modal
