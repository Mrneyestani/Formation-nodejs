import { FastifyInstance } from "fastify";

export default async function calculatriceRoute(app: FastifyInstance) {
  // Création d'un type pour notre route
  type CalcRoute = {
    Params: {
      x: string;
      y: string;
    };
  };

  // Création d'une route permettant d'additionner 2 nombre
  app.get<CalcRoute>("/calc/add/:x/:y", (request) => {
    // Récupérer les paramètres
    const x = parseFloat(request.params.x);
    const y = parseFloat(request.params.y);

    // On retourne l'objet de résultat
    return {
      result: x + y,
      x: x,
      y: y,
      operation: "add(x+y)",
    };
  });

  // Création d'une route permettant de soustraire 2 nombres
  app.get<CalcRoute>("/calc/sub/:x/:y", (request) => {
    const x = parseFloat(request.params.x);
    const y = parseFloat(request.params.y);
    return {
      result: x - y,
      x: x,
      y: y,
      operation: "sub(x-y)",
    };
  });
  // Création d'une route permettant de multiplier 2 nombres
  app.get<CalcRoute>("/calc/mul/:x/:y", (request) => {
    const x = parseFloat(request.params.x);
    const y = parseFloat(request.params.y);
    return {
      result: x * y,
      x: x,
      y: y,
      operation: "mul(x*y)",
    };
  });

  // Création d'une route permettant de diviser 2 nombres
  app.get<CalcRoute>("/calc/div/:x/:y", (request, response) => {
    const x = parseFloat(request.params.x);
    const y = parseFloat(request.params.y);
    if (y === 0) {
      response.code(400);
      return {
        error: "divistion pae zero!!!",
        message: "Attention! la division par zero est impossible!",
      };
    }

    return {
      result: x / y,
      x: x,
      y: y,
      operation: "div (x/y)",
    };
  });

  type CalculateRoute = {
    Headers: {
      operation: string;
    };
    Body: {
      x: number;
      y: number;
    };
  };

  app.post<CalculateRoute>("/calculate", (request, response) => {
    // Récupére l'opération
    const operation = request.headers.operation;
    // ON récupére x et y
    const x = request.body.x;
    const y = request.body.y;

    if (operation === "add") {
      return {
        result: x + y,
        x: x,
        y: y,
        operation: operation,
      };
    }

    if (operation === "sub") {
      return {
        result: x - y,
        x: x,
        y: y,
        operation: operation,
      };
    }

    if (operation === "mul") {
      return {
        result: x * y,
        x: x,
        y: y,
        operation: operation,
      };
    }

    if (operation === "div") {
      if (y === 0) {
        response.code(400);

        return {
          error: "division par 0",
          message: "Il est impossible de diviser par 0",
        };
      }

      return {
        result: x / y,
        x: x,
        y: y,
        operation: operation,
      };
    }

    response.code(400);

    return {
      error: "invalide operation",
      message: `Je ne connais l'opération ${operation} :/`,
    };
  });
}
