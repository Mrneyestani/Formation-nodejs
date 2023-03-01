import fastify from "fastify";
import fastifyPlugin from "fastify-plugin";
import calculatriceRoute from "./routes/calculatrice";

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
console.log(`TZ = ${process.env.TZ}`);
console.log(`HOST = ${process.env.HOST}`);
console.log(`PORT = ${process.env.PORT}`);

const app = fastify();

app.get("/", () => {
  return "Bienvenue sur mon serveur!";
});

app.get("/hello", () => {
  return "Bonjour tout le monde!";
});

app.get("/eleves", (request, response) => {
  // Ajouter un entête http
  response.header("Developed-With", "fastify");
  return [
    {
      id: 1,
      nom: "john",
      prenom: "john",
      age: 32,
    },
    {
      id: 2,
      nom: "john",
      prenom: "rose",
      age: 36,
    },
    {
      id: 3,
      nom: "john",
      prenom: "jane",
      age: 40,
    },
    {
      id: 4,
      nom: "john",
      prenom: "jean",
      age: 38,
    },
  ];
});

// enregistremet de mon premier plugin
app.register(fastifyPlugin(calculatriceRoute));

// On écoute une porte de notre ordinateur
app.listen({ port: process.env.PORT as any, host: process.env.HOST }, () => {
  // Petit fonction qui se déclenche lorsque notre serveur se met à écouter la porte
  console.log(
    `Le serveur http est prêt sur l'address : http://${process.env.HOST}:${process.env.PORT}"`
  );
});
