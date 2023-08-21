const mongoose = require('mongoose')
const dbconnect = (app) => {
    mongoose.connect(`mongodb+srv://eacarrilloiparraguirre:${process.env.MONGO_DB_PASS}@clusterliebre.prqvln9.mongodb.net/laliebre?retryWrites=true&w=majority`)
        .then((reuslt) => {
            const PORT = process.env.PORT || 4000
            app.listen(PORT, () => {
                console.log(`Servidor ${PORT}`)
            })
            console.log("Conexión exitosa a la base de datos")
        }
        )
        .catch((err) => console.log(err))
}
module.exports = dbconnect