import fastify from "fastify";

console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
console.log(`TZ = ${process.env.TZ}`);
console.log(`HOST = ${process.env.HOST}`);
console.log(`PORT = ${process.env.PORT}`);

const app = fastify();

app.listen({ port: process.env.PORT as any, host: process.env.HOST }, () => {
  console.log(
    `Le serveur http est prêt sur l'address : http://${process.env.HOST}:${process.env.PORT}"`
  );
});

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
      id: "1",
      nom: "john",
      prenom: "john",
      age: "32",
    },
    {
      id: "2",
      nom: "john",
      prenom: "rose",
      age: "36",
    },
    {
      id: "3",
      nom: "john",
      prenom: "jane",
      age: "40",
    },
    {
      id: "4",
      nom: "john",
      prenom: "jean",
      age: "38",
    },
  ];
});
