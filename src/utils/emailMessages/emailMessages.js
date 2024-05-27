export const message = (name, url, company) => `<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invitación a Oferta</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #f4f4f9;
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .container {
            background-color: #fff;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            text-align: center;
        }
        .container h1 {
            color: #333;
        }
        .container p {
            font-size: 16px;
            color: #666;
            margin: 20px 0;
        }
        .btn {
            display: inline-block;
            padding: 10px 20px;
            font-size: 16px;
            color: #333;
            background-color: #007bff;
            border: none;
            border-radius: 5px;
            text-decoration: none;
            transition: background-color 1s ease-in-out;
        }
        .btn a {
          color: #fff
        }
        .btn:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>¡Has sido invitado a una oferta!</h1>
        <p>${name}, Has sido invitado a participar en una oferta de parte de la organización ${company}.</p>
        <p>Dale click en el siguiente enlace para acceder y participar:</p>
        <a href=${url} class="btn">Acceder a la Oferta</a>
    </div>
</body>
</html>`