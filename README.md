Spotify Challenge
Por: Jesús Sánchez
Como solución al reto propuesto para ser parte del equipo de Desarrolladores Web en Indigo, presento la siguiente aplicación web, desarrollada en React.js y desplegada en Vercel.
Click Aquí
Recursos Utilizados
*React Router Dom:
Para el redireccionamiento de componentes, permitiendo renderizar únicamente el componente correspondiente a la página solicitada.
**Distribución de enlaces:
Todos los enlaces son redirigidos por la barra de navegación, de la siguiente manera:
Logo Spotify -> /Home
Input de artistas -> /Artists
Input de canciones -> /Songs
Pasará mediante props los valores recibidos instantáneamente en cada uno de los inputs.
-/Home:
Se muestra el componente “New Releases”, que despliega en una distribución de 2x6, las primeras 12 canciones más nuevas. Permitiendo, con las flechas de control, solicitar las 12 siguientes o anteriores canciones, definidas por un offset, parámetro para el request de la API.
El componente renderizará únicamente la búsqueda que no exista en su historial, así mejorando la experiencia del usuario.
https://api.spotify.com/v1/browse/newreleases?offset=' + offset + '&limit=12

Se hace uso de useEffect para condicionar el renderizado, permitiendo que ocurra únicamente cuando se presionen las flechas de control.
Al hacer click al nombre de algún artista, redirigirá, mediante componente Link, de React Router, al artista con el ID respectivo.

-/Artists:
Tras hacer click en el input de artistas, al inicialmente no contar con un texto como entrada, aparecerá un componente con el texto “No related artists ☹”.
Una vez se comience a escribir, el componente renderizará y realizará el request cada vez que se presione una tecla, encontrando resultados, que serán dispuestos en una distribución 2x6, con la foto y el nombre del artista. Se pueden buscar los siguientes o anteriores 12 artistas al utilizar las flechas de control.
https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=12&offset=' + offset

--artistName: string en el que se reemplazan los espacios escritos en la búsqueda, con los caracteres %20. 
El componente renderizará únicamente la búsqueda que no exista en su historial.
Se hace uso de useEffect para condicionar el renderizado, permitiendo que ocurra únicamente cuando se reciban valores en el input y/o se presionen las flechas de control.
Al hacer click a algún artista, redirigirá, mediante componente Link, de React Router, al artista con el ID respectivo.




-/Songs:
Ocurre igual que en /Artists, con la diferencia que el mensaje inicial es “No related songs ☹”, y se mostrará la foto del álbum al cual pertenece la canción, su nombre y el nombre de su artista.
https://api.spotify.com/v1/search?q=' + artistName + '&type=artist&limit=12&offset=' + offset

--artistName: string en el que se reemplazan los espacios escritos en la búsqueda, con los caracteres %20. 
El componente renderizará únicamente la búsqueda que no exista en su historial.
Se hace uso de useEffect para condicionar el renderizado, permitiendo que ocurra únicamente cuando se reciban valores en el input y/o se presionen las flechas de control.
Al hacer click al nombre de algún artista, redirigirá, mediante componente Link, de React Router, al artista con el ID respectivo.

-/Artistst/****
Se realizan 4 solicitudes a la API de artistas de Spotify:
-Información del Artista:
'https://api.spotify.com/v1/artists/' + props.artistID

-Artistas relacionados:
'https://api.spotify.com/v1/artists/' + props.artistID + '/related-artists'

-Albums del artista:
'https://api.spotify.com/v1/artists/' + props.artistID + '/albums?limit=6&offset=' + offset


-Top tracks del artists:
'https://api.spotify.com/v1/artists/' + props.artistID + '/top-tracks?market=CO'

Dónde: 
--props.artistID: id del artista pasado mediante props por el componente en el que fue clickeado el respectivo nombre.
--offset: valor inicializado en 0 y puede sumarse o restarse de 6 en 6 para solicitar dicha cantidad de álbumes anteriores o siguientes.
Para Top Tracks, se debió incluir el request market=CO, necesario para obtener una respuesta satisfactioria de la API (CO = Colombia).

*Spotify Authentication API:
Para que Spotify permita realizar requests desde sus APIs, es necesario obtener un token, que tiene duración de vencimiento, por lo tanto, se solicita un token en cada acción que se realiza. 
Para esto, fue necesario hacer registro en la plataforma de desarrolladores de Spotify y registrando la APP, con lo que se obtiene un ID de Cliente y un Secret Key, valores necesarios para solicitar los tokens mencionados.

*Spotify API:
Utilizar la API de Spotify se vuelve una tarea sencilla una vez se haya entendido la solicitud de tokens. Con cada uno de los enlaces anteriormente mencionados, se visualizaban las respuestas, para entender la estructura de la información y así poder acceder a los parámetros que serán mostrados.
