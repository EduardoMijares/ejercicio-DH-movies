const http = require('http');
const fs = require('fs');

let movies = require('./movies')
let faqs = require('./faqs')
let theaters = require('./theaters')

// Servidor
http.createServer((req, res) => {
	res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
	
	// Route System
	switch (req.url) {
		// Home
		case '/':

            movies = movies.sort(function (a, b) {
                if (a.title > b.title) return 1
                if (a.title < b.title) return -1
                return 0;          
            })

            
            let listado = `<ul>`

            for (var i = 0; i<movies.length; i++) {
                listado += `<li>${movies[i].title} </li>`
            }

            listado += `</ul>`

            let pieDePagina = "Recorda que podes visitar las siguientes secciones:  i.	 En Cartelera   ii.	  Mas votadas   iii.   Sucursales  iv.	Contacto v. Preguntas frecuentes";
           
            let content = `Bienvenidos a DH Movies el mejor sitio para encontrar las mejores  películas, incluso mucho mejor que Netflix, Cuevana y PopCorn. 
            <hr/>
            <br/>
            Total de peliculas ${movies.length}.<br/>
            
            ${listado}
            <br/>
            <br/>
            <br/>
            ${pieDePagina}      

            `            
			res.end(content);
			break;
		// En cartelera
		case '/en-cartelera':

        let enCartelera = "<br><br>En cartelera<br/><br/>";
        enCartelera += "Total de peliculas: " + movies.length
        enCartelera += "<br><br>Listado de peliculas:<br/><br/>"
            
        movies.forEach(function(titulo){
            enCartelera += titulo.original_title + '<br><br>'
            enCartelera += titulo.overview + "<br/><br/>"
            });

			res.end(enCartelera);
			break;
		case '/mas-votadas':

            let masVotadas = "Mas votadas <br><br>"
            masVotadas += "Listado de Peliculas mas votadas: <br/><br/>" 
            let moviesMasVotadas = movies.filter(function(puntaje){
                return puntaje.vote_average >= 7.5;
            });
            
            masVotadas += "Total de peliculas mas votadas: " + moviesMasVotadas.length + "<br><br>";
            moviesMasVotadas.forEach(function(titulo){
                masVotadas += titulo.title +"  " ;
                masVotadas += titulo.vote_average +" <br>" ;
                masVotadas += titulo.overview+"<br><br>" ;
            });

			res.end(masVotadas);
			break;
		case '/sucursales':

        let sucursales = "Nuestras Salas <br><br>" + "Total de salas: " + theaters.length + "<br><br>" + "Listado de Salas: <br><br>";
        theaters.forEach(function(titulo){
            sucursales += titulo.name +"<br>" ;
            sucursales += titulo.address +"<br>" ;
            sucursales += titulo.description +"<br><br>" ;
            });

			res.end(sucursales);
			break;
		case '/contacto':
            let contacto = "Contáctanos. <br><br>" + "Contenido: <br><br>¿Tenés algo para contarnos? Nos encanta escuchar a nuestros clientes. Si deseas contactarnos podés escribirnos al siguiente email: dhmovies@digitalhouse.com o en las redes sociales. Envianos tu consulta, sugerencia o reclamo y será respondido a la brevedad posible. Recordá que también podes consultar la sección de Preguntas Frecuentes para obtener respuestas inmediatas a los problemas más comunes."
			res.end(contacto);
			break;
		case '/preguntas-frecuentes':
            let preguntasFrecuentes = "Preguntas Frecuentes <br><br>" + "Total de preguntas: " + faqs.length + "<br><br>" + "Listado de preguntas: <br/><br/>" 
            faqs.forEach(function(titulo){
                preguntasFrecuentes += titulo.faq_title +"<br>" ;
                preguntasFrecuentes += titulo.faq_answer +"<br><br>" ;
            });
			res.end(preguntasFrecuentes);
			break;
		default:
			res.end('404 not found')
	}
}).listen(3030, 'localhost', () => console.log('Server running in 3030 port'));