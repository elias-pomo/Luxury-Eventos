// Fotos reales de eventos en el salón (Galería y candy bar).
// `position` es el punto de enfoque del recorte (CSS object-position). Muchas
// son verticales de celular con mucho piso abajo: el foco se sube para que el
// recorte muestre la decoración y no las baldosas.
const photo = (file, alt, position = 'center') => ({ src: `/images/${file}`, alt, position })

export const photos = {
  // 15 años
  quinceMesa: photo('15a1.webp', 'Mesa dulce de 15 en lila y plateado con arco de globos y cubos con el nombre', 'center 32%'),
  quinceSalon: photo('15a3.webp', 'Salón preparado para la cena de 15 con mesas vestidas de blanco y sillas negras', 'center 45%'),

  // 18 años
  dieciochoMesa: photo('18a2.webp', 'Mesa dulce de 18 en negro y dorado con globos y el número 18', 'center 42%'),
  dieciochoTorta: photo('18a1.webp', 'Torta negra de dos pisos con el número 18 en dorado', 'center 40%'),
  dieciochoSalon: photo('18a3.webp', 'Invitados en el salón con mesas redondas y telas en el techo', 'center 30%'),
  dieciochoFiesta: photo('18a5.webp', 'El salón de noche con luces de colores durante la fiesta', 'center 35%'),
  dieciochoLunch: photo('18a4.webp', 'Mesa de lunch con pan, salsas y carne para los invitados', 'center 45%'),

  // Casamientos
  bodaNovios: photo('boda4.webp', 'Los novios cortando la torta junto al arco de flores y el neón "Nuestra Boda"', 'center 55%'),
  bodaMesaDulce: photo('boda2.webp', 'Mesa dulce dorada con arco de tul, luces de corazón y neón "Nuestra Boda"', 'center 40%'),
  bodaMesa: photo('boda1.webp', 'Torta de casamiento y columnas doradas con tartas sobre alfombra blanca', 'center 40%'),
  bodaAbrazo: photo('boda3.webp', 'Los novios abrazados frente a la mesa principal', 'center 40%'),
  bodaRamo: photo('boda5.webp', 'La novia por tirar el ramo en el salón iluminado', 'center 50%'),

  // Infantiles
  infantilMonsters: photo('infantiles5.webp', 'Ambientación de Monsters Inc. con arco de globos verde, azul y lila', 'center 35%'),
  infantilPocoyo: photo('infantiles8.webp', 'Ambientación de Pocoyó con arco de globos de colores, neón "Happy Birthday" y sillón blanco', 'center 50%'),
  infantilPocoyoChicos: photo('infantiles9.webp', 'Los chicos frente al arco de Pocoyó con globos naranja, azul, amarillo y verde', 'center 45%'),
  infantilPintacaritas: photo('infantiles10.webp', 'Pintacaritas para los chicos en el cumpleaños de Pocoyó', 'center 40%'),
  infantilSouvenirs: photo('infantiles7.webp', 'Biblioteca en arco con souvenirs de Spider-Man y K-pop y vasos personalizados', 'center 40%'),
  infantilPooh: photo('infantiles2.webp', 'Mesa dulce de Winnie Pooh con troncos y cubos con el nombre', 'center 45%'),
  infantilFrutillita: photo('infantiles4.webp', 'Ambientación de Frutillitas en rosa, rojo y verde', 'center 45%'),
  infantilVampirina: photo('revelacion2.webp', 'Ambientación de Vampirina con globos negros, lila y rosa', 'center 28%'),
  infantilLol: photo('baby5.webp', 'Mesa de cumpleaños de muñecas LOL en rosa y verde', 'center 35%'),
  infantilMariposa: photo('infantiles1.webp', 'Detalle de mariposa rosa y golosinas personalizadas', 'center 60%'),
  infantilCentro: photo('infantiles3.webp', 'Centro de mesa de Winnie Pooh tejido con golosinas', 'center 55%'),

  // Baby shower
  babySafari: photo('baby4.webp', 'Baby shower safari con jeep, jirafa, leones de peluche y puente de madera', 'center 55%'),
  babyBosque: photo('bautismo6.webp', 'Baby shower "Oh Baby" con troncos, animalitos del bosque y globos verde oliva', 'center 40%'),
  babyPanda: photo('baby1.webp', 'Baby shower de osito panda con globos azules y blancos', 'center 40%'),
  babyVelita: photo('bautismo5.webp', 'Souvenir de velita con forma de leoncito', 'center 55%'),
  babyConejitaPapas: photo('baby10.webp', 'Los futuros papás frente al arco "Oh Baby!" del bosque, con la torta y los regalos', 'center 45%'),
  babyConejitaTorta: photo('baby9.webp', 'Los futuros papás cortando la torta sobre un hongo gigante', 'center 55%'),
  babyConejitaMesa: photo('baby8.webp', 'Mesa dulce sobre hongos rojos junto al arco del bosque y los regalos', 'center 40%'),
  babyConejitaRincon: photo('baby11.webp', 'Hongo gigante con conejita bailarina, casita del bosque y mantel a cuadros', 'center 50%'),
  babyConejitaNombre: photo('baby7.webp', 'Conejita y letras con el nombre de la bebé entre tartitas y profiteroles', 'center 55%'),
  babySouvenirs: photo('baby3.webp', 'Souvenirs en cajitas y bolsitas con moños de colores en un estante en arco', 'center 40%'),
  babyMasitas: photo('catering2.webp', 'Bandejas con tartitas, lemon pie, brownies y alfajores de maicena', 'center 50%'),
  babyProfiteroles: photo('catering1.webp', 'Profiteroles en bandeja de flor y tartitas de frutos rojos', 'center 45%'),

  // Revelación
  revelacionMesa: photo('revelacion1.webp', 'Mesa dulce en azul con cortinas, luces y tortas decoradas', 'center 40%'),

  // Bautismos
  bautismoBeige: photo('bautismo1.webp', 'Arco de globos beige y dorado con el cartel "Mi Bautizo"', 'center 45%'),
  bautismoElefante: photo('bautismo2.webp', 'Bautismo en rosa y blanco con elefantito y cubos con el nombre', 'center 45%'),
  bautismoCeleste: photo('bautismo4.webp', 'Bautismo en celeste, blanco y dorado con mesas doradas', 'center 45%'),

  // Comuniones
  comunionCaliz: photo('comunion1.webp', 'Comunión en dorado y blanco con cáliz, sillón blanco y mesas de madera', 'center 40%'),
  comunionAmarilla: photo('comunion2.webp', 'Comunión en amarillo y blanco con luces y cubos con el nombre', 'center 45%'),
  comunionDorada: photo('comunion5.webp', 'Comunión con columnas doradas, flores y sillón blanco', 'center 50%'),
  comunionVerdeFamilia: photo('comunion3.webp', 'Familia junto a la mesa de comunión con globos verde, dorado y crema y el neón "Mi primera comunión"', 'center 50%'),
  comunionVerde: photo('comunion4.webp', 'El nene de la comunión junto a la torta con cruz y mesas doradas', 'center 40%'),
  comunionVerdeAbrazo: photo('comunion6.webp', 'Abrazo frente a la mesa de comunión con lámpara de plumas y candelabros de cristal', 'center 40%'),
  comunionVerdeHermanos: photo('comunion7.webp', 'Los hermanos y su abuela frente a la torta de comunión', 'center 45%'),
  comunionVerdeInvitados: photo('comunion8.webp', 'Invitados alrededor de la mesa de comunión sobre alfombra blanca', 'center 45%'),
  comunionVerdeMesa: photo('comunion9.webp', 'Mesa de comunión con globos verde, dorado y crema, cáliz, columnas doradas y sillón blanco', 'center 50%'),
  comunionVerdeSillon: photo('comunion10.webp', 'Sillón capitoné blanco bajo el neón "Mi primera comunión" y el arco con hiedra', 'center 55%'),
  comunionVerdeLampara: photo('comunion11.webp', 'Lámpara de plumas y bandeja de tres pisos sobre cilindros dorados', 'center 45%'),
  comunionVerdeBienvenida: photo('comunion12.webp', 'Cartel de bienvenida en atril con liliums y farol sobre alfombra de yute', 'center 40%'),
  // Comunión en rosa viejo, blanco y dorado
  comunionRosaMesa: photo('comunion13.webp', 'Comunión en rosa viejo, blanco y dorado con tul, neón "Mi primera comunión", cilindros dorados y sillón blanco', 'center 50%'),
  comunionRosaArco: photo('comunion14.webp', 'Arco de globos rosa viejo, blanco y dorado con tul durazno y camino de flores blancas', 'center 45%'),
  comunionRosaDetalle: photo('comunion15.webp', 'Mesas de mármol y dorado con candelabro de cristal frente al fondo del cáliz', 'center 50%'),
  comunionRosaMesas: photo('comunion16.webp', 'Mesas redondas con mantel negro, sillas enfundadas y bajoplatos dorados', 'center 55%'),
  comunionRosaSalon: photo('comunion17.webp', 'El salón vestido de negro y rosa viejo con la mesa de comunión al fondo', 'center 45%'),
  comunionRosaSouvenirs: photo('comunion18.webp', 'Souvenirs en frasquitos sobre camino de raso rosa viejo', 'center 30%'),
  comunionRosaBienvenida: photo('comunion19.webp', 'Cartel de bienvenida con tul durazno, flores y hiedra en un atril', 'center 40%'),
  comunionSouvenir: photo('baby6.webp', 'Souvenirs de frascos con angelitos de porcelana fría', 'center 40%'),

  // Cumpleaños y fiestas de adultos
  adultosMesa: photo('mayores.webp', 'Mesa dulce de cumpleaños ochentoso con bola de boliche, discos de vinilo, globos plateados y neón "Happy Birthday"', 'center 50%'),
  adultosCumpleanero: photo('mayores4.webp', 'El cumpleañero con los pulgares arriba frente a la mesa dulce de los 80', 'center 45%'),
  adultosTorta: photo('mayores3.webp', 'Torta "Mis 50 Alejandro" con bolitas espejadas y la silueta de un bailarín de fondo', 'center 60%'),
  adultosDetalle: photo('mayores2.webp', 'Torta sobre mantel de lentejuelas plateadas con bola de boliche y masas finas', 'center 40%'),
  adultosLunch: photo('mayores5.webp', 'Mesa de lunch con pan, salsas y carne asada', 'center 55%'),
  adultosLiving: photo('soltero1.webp', 'Living de puff blancos con luces violetas y verdes', 'center 55%'),

  // Corporativos (fiesta de fin de año con sorteos)
  corporativoPremios: photo('corporativo1.webp', 'Mesa de premios para el sorteo con electrodomésticos bajo un arco de globos plateados y violetas', 'center 55%'),
  corporativoFiesta: photo('corporativo2.webp', 'Compañeros festejando en el salón con luces verdes', 'center 40%'),
  corporativoGrupo: photo('corporativo3.webp', 'Foto grupal de los compañeros en el salón', 'center 55%'),
  corporativoPista: photo('corporativo4.webp', 'La pista con luces rosas y los invitados bailando', 'center 40%'),
  corporativoArco: photo('corporativo5.webp', 'Invitados posando frente al arco de globos plateados y violetas', 'center 40%'),
  // Corporativos (jornada de empresa con coffee break)
  corporativoReunion: photo('corporativo6.webp', 'Jornada de empresa con mesas redondas vestidas de blanco y una pantalla al fondo', 'center 50%'),
  corporativoCoffee: photo('corporativo7.webp', 'Coffee break con platos de medialunas, masitas y alfajores sobre mantel negro', 'center 45%'),
  corporativoRecepcion: photo('corporativo8.webp', 'Los asistentes llegando a la jornada entre las mesas redondas', 'center 50%'),
  corporativoMesa: photo('corporativo9.webp', 'Mesa redonda con mantel blanco, cartel de mesa y copas lista para la jornada', 'center 45%'),
  corporativoJornada: photo('corporativo10.webp', 'Asistentes reunidos en las mesas durante la jornada', 'center 35%'),

  // Candy bar
  candySafariMesa: photo('candy2.webp', 'Mesa dulce safari con alfajores, trufas y tarta', 'center 50%'),
  candyLilaDulces: photo('candy4.webp', 'Bandeja de alfajores y donas en tonos lila', 'center 55%'),
  candyMonsters: photo('candy5.webp', 'Candy bar de Monsters Inc. con algodones de azúcar', 'center 50%'),
  // K-pop (cumpleaños)
  candyKpop: photo('candy1.webp', 'Candy bar de K-pop en violeta y plateado con neón "Happy Birthday", personajes y la cumpleañera', 'center 45%'),
  candyKpopPaneles: photo('candy14.webp', 'Candy bar de K-pop con panel de lentejuelas, arco con neón, biblioteca y alfombra violeta', 'center 55%'),
  candyKpopBiblioteca: photo('candy15.webp', 'Biblioteca blanca en arco con souvenirs personalizados y una de las cantantes', 'center 40%'),
  candyKpopPersonaje: photo('candy3.webp', 'Personaje de K-pop recortado junto a tartas y cake pops', 'center 45%'),
  // Conejita del bosque (primer añito)
  candyConejita: photo('candy11.webp', 'Candy bar de conejita del bosque con arco de globos, mariposas de neón y hongos gigantes', 'center 50%'),
  candyConejitaArco: photo('candy13.webp', 'Arco del bosque con neón "Happy Birthday", conejita bailarina y el número 1 de neón', 'center 50%'),
  candyConejitaLuces: photo('candy12.webp', 'La conejita sobre una base en forma de nube con luces violetas y cerquito de madera', 'center 50%'),
  candyConejitaCerco: photo('candy6.webp', 'Cerquito de madera con flores delante del arco de la conejita', 'center 35%'),
  // Oh Baby! (baby shower)
  candyOhBaby: photo('candy7.webp', 'Arco "Oh Baby!" con fondo de bosque, casita, tronco y conejita sobre mantel a cuadros', 'center 45%'),
  candyOhBabyHongo: photo('candy8.webp', 'Hongo gigante con conejita sobre base de nube junto al arco "Oh Baby!"', 'center 50%'),
  candyOhBabyTronco: photo('candy10.webp', 'Tronco, macetas y hongos rojos frente a la casita del bosque', 'center 50%'),
  candyOhBabyTorta: photo('candy9.webp', 'Torta con conejita sobre el hongo gigante y souvenirs tejidos', 'center 40%'),

  // TODO: fotos de muestra (ilustraciones) hasta tener fotos reales para estos lugares.
  muestraQuince1: photo('muestra/quince-1.svg', 'Foto de muestra: mesa principal de 15 años'),
  muestraQuince2: photo('muestra/quince-2.svg', 'Foto de muestra: el vals de 15 años'),
}
