// Importation des modules nécessaires
// http-errors : Utilisé pour créer des objets d'erreur HTTP facilement manipulables.
// express : Le framework web principal pour construire l'application.
// path : Un module intégré de Node.js pour travailler avec les chemins de fichiers.
// cookie-parser : Middleware pour parser les cookies des requêtes HTTP.
// morgan : Middleware pour logger les requêtes HTTP dans la console, utile pour le développement et le débogage.

var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var mysql = require('mysql');
var bcrypt = require('bcrypt');
var session = require('express-session');

let indexRouter = require('./routes/index');
let loginRouter = require('./routes/login');
let logoutRouter = require('./routes/logout');
// const router = require('./routes/login');



 const connection = require('./database')



// Importation des routeurs
// indexRouter et usersRouter : 
// Ces variables représentent les modules de routage que tu as définis dans le dossier ./routes. 
// Ils sont utilisés pour gérer les routes de ton application. Par exemple, 
// toutes les requêtes à la racine (/) utiliseront indexRouter, et toutes les requêtes à /users utiliseront usersRouter.


// var usersRouter = require('./routes/users');
// var acceuilRouter = require('./routes/accueil');



// Initialisation de l'application Express
// var app = express(); crée une instance de l'application Express.

var app = express();


// Configuration du moteur de vue
// app.set('views', path.join(__dirname, 'views')); définit le dossier où sont stockées les vues de l'application. 
// Les vues sont des fichiers template utilisés pour générer des réponses HTML.
// app.set('view engine', 'ejs'); spécifie ejs comme moteur de template pour l'application, 
// ce qui permet d'utiliser des fichiers .ejs pour les vues.
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Utilisation de middlewares
// app.use(logger('dev')); active le logging des requêtes HTTP.
// app.use(express.json()); et app.use(express.urlencoded({ extended: false })); 
// sont des middlewares pour parser le corps des requêtes HTTP en JSON et en données de formulaire URL-encodées.
// app.use(cookieParser()); active le parsing des cookies des requêtes HTTP.
// app.use(express.static(path.join(__dirname, 'public'))); 
// sert les fichiers statiques (comme les images, les fichiers CSS, et les scripts JavaScript) depuis le dossier public.

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'myScretKey',
    resave: false,
    saveUninitialized: true
}));

// Définition des routes
// app.use('/', indexRouter); et app.use('/users', usersRouter); 
// utilisent les routeurs importés pour les chemins spécifiés. 
// Cela signifie que toutes les routes définies dans indexRouter répondront aux requêtes à la racine (/), 
// et toutes celles dans usersRouter répondront aux requêtes à /users.

app.use('/', indexRouter);
// app.use('/users', usersRouter);

app.use('/login', loginRouter);
app.use('/logout', logoutRouter);

// Gestion des erreurs
// app.use(function(req, res, next) { next(createError(404)); }); 
// est un middleware qui capture toutes les requêtes non gérées par les routes précédentes 
// et crée une erreur 404 (Page Non Trouvée).
// Le dernier app.use est un gestionnaire d'erreurs qui définit comment les erreurs 
// (y compris les erreurs 404 créées juste avant) sont traitées et présentées à l'utilisateur. 
// Il définit des messages d'erreur et décide de les rendre visibles ou non 
// en fonction de l'environnement de l'application (développement vs production) avant de rendre une page d'erreur.

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


// Exportation de l'application
// module.exports = app; rend l'instance de l'application Express disponible pour être utilisée par d'autres fichiers, 
// notamment le fichier qui démarrera le serveur web.
// Ce code constitue la structure de base d'une application Express.js, 
// prête à être étendue avec des fonctionnalités spécifiques à tes besoins.

module.exports = app;