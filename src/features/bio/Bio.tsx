import { useState } from 'react';
import { NombresSimpsons, INFO_SIMPSONS } from './constants';
import {
  BioContenedor,
  ContenedorBotones,
  BioImagen,
  ContenedorImagen,
  BioNombre,
  BioDescripcion,
  ContenedorDescripcion,
  ContenedorInfo,
  Boton
} from './styled';

function Bio() {
  const [bioActiva, setBioActiva] = useState(INFO_SIMPSONS[NombresSimpsons.BART]);

  const onClick: (nombre: NombresSimpsons) => void = (nombre) =>
    setBioActiva(INFO_SIMPSONS[nombre]);

  const crearBotones = () =>
    Object.keys(INFO_SIMPSONS).map((nombre: string) => (
      <Boton
        key={nombre as string}
        type="button"
        onClick={() => onClick(nombre as NombresSimpsons)}
        activo={bioActiva.id === nombre}>
        {nombre}
      </Boton>
    ));

  return (
    <BioContenedor>
      <ContenedorBotones>{crearBotones()}</ContenedorBotones>
      <ContenedorInfo>
        <ContenedorImagen>
          <BioImagen src={bioActiva.image} alt={bioActiva.nombre} />
        </ContenedorImagen>
        <ContenedorDescripcion>
          <BioNombre>{bioActiva.nombre}</BioNombre>
          <BioDescripcion>{bioActiva.descripcion}</BioDescripcion>
        </ContenedorDescripcion>
      </ContenedorInfo>
    </BioContenedor>
  );
}

export default Bio;
