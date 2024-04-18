import express from 'express' 
import routerUser from './router/user.router'

const PORT = process.env.PORT || 3333
const app = express()

app.use(express.json())
app.use(routerUser)

//inicializacion de servidor
app.listen(PORT, () => console.log(`Servidor Express corriendo en http://localhost:${PORT}`))