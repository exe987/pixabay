import React, {useState} from 'react';
import Error from './Error';
const Formulario = ({saveBusqueda}) => {

    const[termino, saveTermino] = useState('');
    const [error, saveError] = useState(false);

    const buscarImagenes = e =>{
        e.preventDefault();
        if(termino.trim()===''){
            saveError(true);
            return;
        };
        saveError(false);    
        //GUARDAR EN STATE DE BUSQUEDA LO INGRESADO POR USUARIO
        saveBusqueda(termino);
    }

    return ( 
        <form 
        onSubmit={buscarImagenes}
        >
            <div className='row'>
                <div className='form-group col-md-8'>
                    <input
                    type='text'
                    className='form-control form-control-lg'
                    placeholder='Buscar imagen, ej: fútbol'
                    onChange={ e => saveTermino(e.target.value)}
                    />
                </div>
                <div className='form-group col-md-4'>
                    <input
                    type='submit'
                    className='btn btn-lg btn-danger btn-block'
                    value='BUSCAR'
                    />
                </div>
            </div>
            {error? <Error mensaje='Agrega un término de busqueda'/> :null}
        </form>
     );
}
 
export default Formulario;