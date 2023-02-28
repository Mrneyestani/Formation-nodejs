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
  return "Bienvenue sur mon serveur";
});

app.get("/hello", () => {
  return "Bonjour tout le monde";
});
