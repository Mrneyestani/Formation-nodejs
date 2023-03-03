import fastify from "fastify";
import fastifyMongo from "@fastify/mongodb";
import fastifyPlugin from "fastify-plugin";
import calculatriceRoute from "./routes/calculatrice";
import testouilleRoutes from "./routes/testouills";
import pizzeriaRoutes from "./routes/pazzeria";

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
console.log(`TZ = ${process.env.TZ}`);
console.log(`HOST = ${process.env.HOST}`);
console.log(`PORT = ${process.env.PORT}`);

const app = fastify({ logger: true });

app.get("/", () => {
  return "Bienvenue sur mon serveur!";
});

// Route testant mongodb
app.get("/testmongo", async () => {
  await app.mongo.db?.collection("tests").insertOne({
    message: "coucou les amis",
  });

  return "Mongodb à un nouveau document !";
});

app.register(fastifyMongo, {
  // Nous devons spécifier l'url de connnection à la base de données

  url: process.env.MONGO_URL,

  // Nous devons aussi spécifier la base de données :

  database: process.env.MONGO_DATABASE,
});

// enregistremet de mon premier plugin
app.register(fastifyPlugin(testouilleRoutes));

// enregistremet de mon premier plugin
app.register(fastifyPlugin(calculatriceRoute));

// Enregistrement du plugin pizzeria
app.register(fastifyPlugin(pizzeriaRoutes));

// On écoute une porte de notre ordinateur
app.listen(
  { port: process.env.PORT as any, host: process.env.HOST },
  (error) => {
    console.error(error);
    // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
    console.log(
      `Le serveur http est prêt sur l'address : http://${process.env.HOST}:${process.env.PORT}"`
    );
  }
);
