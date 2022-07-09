import { useEffect, useState } from 'react';
import { SuscribeImage } from '../../assets';
import { obtenerNoticias } from './fakeRest';
import Modal from './Modal';
import {
  TarjetaNoticia,
  FechaTarjetaNoticia,
  DescripcionTarjetaNoticia,
  ImagenTarjetaNoticia,
  TituloTarjetaNoticia,
  ContenedorNoticias,
  ListaNoticias,
  TituloNoticias,
  BotonLectura,
  BotonSuscribir,
} from './styled';
import { minutosTranscurridos, tituloMayuscula } from './utils';

export interface INoticiasNormalizadas {
  id: number;
  titulo: string;
  descripcion: string;
  fecha: number | string;
  esPremium: boolean;
  imagen: string;
  descripcionCorta?: string;
}

function Noticias() {
  const [noticias, setNoticias] = useState<INoticiasNormalizadas[]>([]);
  const [modal, setModal] = useState<INoticiasNormalizadas | null>(null);

  useEffect(() => {
    const obtenerInformacion = async () => {
      const respuesta = await obtenerNoticias();

      const data = respuesta.map((n) => ({
        id: n.id,
        titulo: tituloMayuscula(n),
        descripcion: n.descripcion,
        fecha: `Hace ${minutosTranscurridos(n)} minutos`,
        esPremium: n.esPremium,
        imagen: n.imagen,
        descripcionCorta: n.descripcion.substring(0, 100),
      }));
      setNoticias(data);
    };

    obtenerInformacion();
  }, []);

  return (
    <ContenedorNoticias>
      <TituloNoticias>Noticias de los Simpsons</TituloNoticias>
      <ListaNoticias>
        {noticias.map((n) => (
          <TarjetaNoticia>
            <ImagenTarjetaNoticia src={n.imagen} />
            <TituloTarjetaNoticia>{n.titulo}</TituloTarjetaNoticia>
            <FechaTarjetaNoticia>{n.fecha}</FechaTarjetaNoticia>
            <DescripcionTarjetaNoticia>{n.descripcionCorta}</DescripcionTarjetaNoticia>
            <BotonLectura onClick={() => setModal(n)}>Ver más</BotonLectura>
          </TarjetaNoticia>
        ))}
        {modal && (
          <Modal
            imagen={modal.esPremium ? SuscribeImage : modal.imagen}
            titulo={modal.esPremium ? 'Suscríbete a nuestro Newsletter' : modal.titulo}
            descripcion={
              modal.esPremium
                ? 'Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.'
                : modal.descripcion
            }
            altImagen="mr-burns-excelent"
            setModal={setModal}>
            {modal.esPremium && (
              <BotonSuscribir
                onClick={() =>
                  setTimeout(() => {
                    alert('Suscripto!');
                    setModal(null);
                  }, 1000)
                }>
                Suscríbete
              </BotonSuscribir>
            )}
          </Modal>
        )}
      </ListaNoticias>
    </ContenedorNoticias>
  );
}

export default Noticias;
