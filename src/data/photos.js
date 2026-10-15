// Fotos reales de eventos en el salón (Galería y candy bar).
// `position` es el punto de enfoque del recorte (CSS object-position). Muchas
// son verticales de celular con mucho piso abajo: el foco se sube para que el
// recorte muestre la decoración y no las baldosas.
const photo = (file, alt, position = 'center') => ({ src: `/images/${file}`, alt, position })

export const photos = {
  // 15 años
  quinceMesa: photo('15a1.jpg', 'Mesa dulce de 15 en lila y plateado con arco de globos y cubos con el nombre', 'center 32%'),
  quinceSalon: photo('15a3.jpg', 'Salón preparado para la cena de 15 con mesas vestidas de blanco y sillas negras', 'center 45%'),

  // 18 años
  dieciochoMesa: photo('18a2.jpg', 'Mesa dulce de 18 en negro y dorado con globos y el número 18', 'center 42%'),
  dieciochoTorta: photo('18a1.jpg', 'Torta negra de dos pisos con el número 18 en dorado', 'center 40%'),
  dieciochoSalon: photo('18a3.jpg', 'Invitados en el salón con mesas redondas y telas en el techo', 'center 30%'),
  dieciochoFiesta: photo('18a5.jpg', 'El salón de noche con luces de colores durante la fiesta', 'center 35%'),
  dieciochoLunch: photo('18a4.jpg', 'Mesa de lunch con pan, salsas y carne para los invitados', 'center 45%'),

  // Casamientos
  bodaNovios: photo('boda4.jpg', 'Los novios cortando la torta junto al arco de flores y el neón "Nuestra Boda"', 'center 55%'),
  bodaMesaDulce: photo('boda2.jpg', 'Mesa dulce dorada con arco de tul, luces de corazón y neón "Nuestra Boda"', 'center 40%'),
  bodaMesa: photo('boda1.jpg', 'Torta de casamiento y columnas doradas con tartas sobre alfombra blanca', 'center 40%'),
  bodaAbrazo: photo('boda3.jpg', 'Los novios abrazados frente a la mesa principal', 'center 40%'),
  bodaRamo: photo('boda5.jpg', 'La novia por tirar el ramo en el salón iluminado', 'center 50%'),

  // Infantiles
  infantilMonsters: photo('infantiles5.jpg', 'Ambientación de Monsters Inc. con arco de globos verde, azul y lila', 'center 35%'),
  infantilPocoyo: photo('infantiles7.jpg', 'Ambientación de Pocoyó con arco de globos de colores', 'center 40%'),
  infantilPooh: photo('infantiles2.jpg', 'Mesa dulce de Winnie Pooh con troncos y cubos con el nombre', 'center 45%'),
  infantilFrutillita: photo('infantiles4.jpg', 'Ambientación de Frutillitas en rosa, rojo y verde', 'center 45%'),
  infantilVampirina: photo('revelacion2.jpg', 'Ambientación de Vampirina con globos negros, lila y rosa', 'center 28%'),
  infantilLol: photo('baby5.jpg', 'Mesa de cumpleaños de muñecas LOL en rosa y verde', 'center 35%'),
  infantilMariposa: photo('infantiles1.jpg', 'Detalle de mariposa rosa y golosinas personalizadas', 'center 60%'),
  infantilCentro: photo('infantiles3.jpg', 'Centro de mesa de Winnie Pooh tejido con golosinas', 'center 55%'),

  // Baby shower
  babySafari: photo('baby4.jpg', 'Baby shower safari con jeep, jirafa, leones de peluche y puente de madera', 'center 55%'),
  babyBosque: photo('bautismo6.jpg', 'Baby shower "Oh Baby" con troncos, animalitos del bosque y globos verde oliva', 'center 40%'),
  babyPanda: photo('baby1.jpg', 'Baby shower de osito panda con globos azules y blancos', 'center 40%'),
  babyVelita: photo('bautismo5.jpg', 'Souvenir de velita con forma de leoncito', 'center 55%'),

  // Revelación
  revelacionMesa: photo('revelacion1.jpg', 'Mesa dulce en azul con cortinas, luces y tortas decoradas', 'center 40%'),

  // Bautismos
  bautismoBeige: photo('bautismo1.jpg', 'Arco de globos beige y dorado con el cartel "Mi Bautizo"', 'center 45%'),
  bautismoElefante: photo('bautismo2.jpg', 'Bautismo en rosa y blanco con elefantito y cubos con el nombre', 'center 45%'),
  bautismoCeleste: photo('bautismo4.jpg', 'Bautismo en celeste, blanco y dorado con mesas doradas', 'center 45%'),

  // Comuniones
  comunionCaliz: photo('comunion1.jpg', 'Comunión en dorado y blanco con cáliz, sillón blanco y mesas de madera', 'center 40%'),
  comunionAmarilla: photo('comunion2.jpg', 'Comunión en amarillo y blanco con luces y cubos con el nombre', 'center 45%'),
  comunionRosa: photo('comunion3.jpg', 'Comunión en rosa y dorado con sillón blanco sobre alfombra', 'center 55%'),
  comunionAngel: photo('comunion4.jpg', 'Comunión en celeste con angelito y cubos con el nombre', 'center 30%'),
  comunionDorada: photo('comunion5.jpg', 'Comunión con columnas doradas, flores y sillón blanco', 'center 50%'),
  comunionArco: photo('baby3.jpg', 'Arco de globos rosa, blanco y plateado con el cartel "Mi Primera Comunión"', 'center 45%'),
  comunionSouvenir: photo('baby6.jpg', 'Souvenirs de frascos con angelitos de porcelana fría', 'center 40%'),

  // Despedidas
  despedidaLiving: photo('soltero1.jpg', 'Living de puff blancos con luces violetas y verdes', 'center 55%'),

  // Candy bar
  candySafari: photo('candy1.jpg', 'Candy bar safari con troncos, jirafa y jeep', 'center 55%'),
  candySafariMesa: photo('candy2.jpg', 'Mesa dulce safari con alfajores, trufas y tarta', 'center 50%'),
  candyPatrulla: photo('candy3.jpg', 'Candy bar de Paw Patrol con arco de neón y sillón blanco', 'center 40%'),
  candyPatrullaDulces: photo('candy4.jpg', 'Bandeja de alfajores y donas en tonos lila', 'center 55%'),
  candyMonsters: photo('candy5.jpg', 'Candy bar de Monsters Inc. con algodones de azúcar', 'center 50%'),
  candyAlgodones: photo('candy6.jpg', 'Exhibidor con algodones de azúcar, manzanas acarameladas y pochoclos', 'center 40%'),

  // TODO: fotos de muestra (ilustraciones) hasta tener fotos reales para estos lugares.
  muestraQuince1: photo('muestra/quince-1.svg', 'Foto de muestra: mesa principal de 15 años'),
  muestraQuince2: photo('muestra/quince-2.svg', 'Foto de muestra: el vals de 15 años'),
  muestraInfantiles: photo('muestra/infantiles-1.svg', 'Foto de muestra: rincón de juegos infantil'),
  muestraComuniones: photo('muestra/comuniones-1.svg', 'Foto de muestra: salón ambientado para una comunión'),
  muestraDespedidas1: photo('muestra/despedidas-1.svg', 'Foto de muestra: la pista en una despedida'),
  muestraDespedidas2: photo('muestra/despedidas-2.svg', 'Foto de muestra: el brindis en una despedida'),
  muestraDespedidas3: photo('muestra/despedidas-3.svg', 'Foto de muestra: living con luces en una despedida'),
}
