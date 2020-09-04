# Servicio de consulta de datos

Este servicio consulta a https://www.indecon.online/ para obtener datos
y formatearlos. Fue construido sobre Node JS y framework Express.

Puerto: `9000`

# Instalación y pruebas

Instalación: `npm install`
Ejecución:   `npm start`
Tests:       `npm run unit-test`
Coverage:    `npm run coverage`
Coverage report:    `npm run coverage-report`


# Endpoints

- POST `/last`: entrega los últimos valores de distintos indicadores económicos
- POST `/values`: entrega los valores en el tiempo del indicador que se requiera:
    request: json
    body: `{
      param: "<indicador>"     dominio: cobre|dolar|euro|ipc|ivp|oro|plata|uf|utm|yen
    }`
    response: string
- POST `/dates`: entrega el valor de un indicador en una fecha determinada
    request: json
    body: `{
      param: "<indicador>"     dominio: cobre|dolar|euro|ipc|ivp|oro|plata|uf|utm|yen
      dates: "<fecha>"         formato: dd-mm-yyyy
    }`

Adicionalmente, agregando la variable de ambiente NODE_ENV=dev, se habilitan endpoints para
encriptar y desencriptar requests, con el objetivo de proporcionar una herramienta que genere
request encriptados si se aplica la encriptación.