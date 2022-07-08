function tituloMayuscula(n: any) {
  const titulo = n.titulo
    .split(" ")
    .map((str: string) => str.charAt(0).toUpperCase() + str.slice(1))
    .join(" ");

  return titulo;
}

function minutosTranscurridos(n: any) {
  const ahora = new Date();
  return Math.floor(
    (ahora.getTime() - n.fecha.getTime()) / 60000
  )
};

export { minutosTranscurridos, tituloMayuscula };