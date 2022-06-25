# Laravel Whatsapp Clone

Whatsapp clone es una app basada en Whtsapp Web que cuenta con las opciones:
- Login/Registro de usuarios.
- Agregar amigos.
- Chatear con los amigos agregados.
- Administración de la app mediante Backpack.
- Desktop App usando Electron.
- Encriptación PGP de mensajes.

## Install
1) En la terminal:

``` bash
composer install
npm install
npm run dev
```

2) Ejecutar las migraciones:
```bash
php artisan migrate
```

3) Ejecutamos el proyecto:
```bash
php artisan serv
```
## Node initialization
1) Abrimos nueva terminal dentro de la carpeta 'node' de raiz del proyecto

2) En la terminal:
``` bash
node server.js
```
## Encriptación PGP
Para poder activar encriptación PGP de mensajes tenemos que tener desplegado nuestro proyecto en una máquina Linux y hacer la configuración del Apache.<br/> 
El manual de configuración se encuentra en la raíz de proyecto GNUPG.pdf<br/>
Activación de PGP en proyecto: Tenemos que dirigirnos a .env y habilitar la encriptación modificando la variable PGP_ENCRYPTION

``` bash
PGP_ENCRYPTION=false
```
``` bash
PGP_ENCRYPTION=true
```

## Electron Install
1) Abrimos nueva terminal dentro de la carpeta 'electron' de raiz del proyecto

2) En la terminal:
``` bash
npm install
```

3) Para ejecutar el electron escribimos:
``` bash
npm start
```

## License

Backpack is free for non-commercial use and 49 EUR/project for commercial use. Please see [License File](LICENSE.md) and [backpackforlaravel.com](https://backpackforlaravel.com/#pricing) for more information.

## Status
En desarrollo
