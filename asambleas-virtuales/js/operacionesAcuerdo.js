function registrarAcuerdo(){

    
    event.preventDefault();
    showView("view_RegistrodeAcuerdo");
    cargarPersonasdeAcuerdo();
  


}

function cargarPersonasdeAcuerdo() {
    const url =
      "http://localhost:8080/personas";
    const http = new XMLHttpRequest();
    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var resultado = JSON.parse(this.responseText);
          var personas = resultado._embedded;
          var integrantes = JSON.parse(this.responseText)._embedded
          //alert("integrantes: " + JSON.stringify(integrantes));
          var listado = document.getElementById("tbody_acuerdoListadodeIntegrantes"); 
          //alert("Aqui, Listado: " + listado);
          //alert("Integrantes: " + integrantes);
          //console.log("Integrantes: " + JSON.stringify(integrantes));
          //alert("Integrantes.persona.length: " + integrantes.persona.length);
          var html ="";
          for(var i = 0; i < integrantes.persona.length; i++){
            var integ = integrantes.persona[i];
            //alert("int: " + JSON.stringify( integ))
            if(integ.status == "APROBADO" && !(integ.bloquedo)){
              var posicion = ("" + integ._links.self.href).indexOf("/personas/");
              var idPersona = parseInt(("" + integ._links.self.href).substring(posicion + 10));
              html += "\n<tr idPersona = \"" + idPersona + "\" excluido = \"false\" razondeExclusion = \"NINGUNA\">\n<td id = \"celdaIntegrante" + idPersona + "\"  style = \"cursor:pointer; font-weight:bolder; color: #00ff00;\">"
              html += "<input id = \"checkboxIntegrante" + idPersona + "\" idPersona = \"" + idPersona + "\" type = \"checkbox\"  checked onchange = \"excluirIntegrantedeVotacion()\">&nbsp;" + integ.nombre + " " + integ.apellidoPaterno + " " + integ.apellidoMaterno  + "";
              html += "</td>\n</tr>";
            }
          }
          //console.log(html);
          listado.innerHTML = html;
        } 
        
      };
    }
    http.send();
}
function seleccionaRazondeExclusion(){
  //alert("Seleccionando razón de exclusión" + event.target);
  var elemento = event.target;
  var renglon = elemento;
  //alert(renglon)
  while(renglon.tagName.toLowerCase() != "tr"){
    //alert(renglon)
    renglon = renglon.parentElement;
    if(renglon == null){
      break;
    }
  }
  //alert("select.value: " + elemento.value);
  if(renglon != null){
    renglon.setAttribute("razondeExclusion",elemento.value)
   
  }
  
}
function excluirIntegrantedeVotacion(){
  var checador = event.target;
  var celda = event.target.parentElement;
  var renglon = celda.parentElement;
  if(checador.checked){
    celda.style.color = "#00ff00";
    checador.checked = true;
    var idPersona = celda.getAttribute("idPersona");
    var select = document.getElementById("selectIntegrante" + idPersona)
    if(select != null){
      select.parentElement.removeChild(select);
    }
    renglon.setAttribute("excluido", "false");
  }else{
    celda.style.color = "#ff0000";
    var idPersona = celda.getAttribute("idPersona");
    checador.checked = false;
    var elemento = document.createElement("select");
    elemento.onchange = seleccionaRazondeExclusion;
    elemento.setAttribute("id", "selectIntegrante" + idPersona);
    var textoHtml = "\n\t<option value = \"NINGUNA\" selected>Seleccione la razon de exclusion.</option>" 
    textoHtml += "\n\t<option value = \"CONFLICTO_DE_INTERES\">Conflicto de interes.</option>";
    textoHtml += "\n\t<option value = \"MIEMBRO_DE_CONSEJO_NO_VALIDO_PARA_VOTAR\">Miembro de Consejo no valido para votar.</option>";
    elemento.innerHTML = textoHtml;
    celda.appendChild(document.createElement("tr"));
    celda.appendChild(elemento);
    renglon.setAttribute("excluido", "true");
    //celda.innerHTML = celda.innerHTML + textoHtml;
  }
  
  
}
function registrarNuevoAcuerdo(){
  //alert("registrando nuevo acuerdo");
  var datos = obtenDatosdeAcuerdo();

  if(datos.mensajes != ""){
    alert(datos.acuerdomensajes);
  }else{
    enviarDatosdeRegistrodeAcuerdo(datos.acuerdo);
  }
}
  function obtenDatosdeAcuerdo(){
    var datos = {};
    var acuerdo = {}
    acuerdo.titulo = "";
    acuerdo.descripcion = "";
    acuerdo.numero = "";
    acuerdo.numerodeVecesaVotar = "";
    acuerdo.fechaLimitedeVotacion = "";
    acuerdo.idConvocatoria = "";
    acuerdo.rondadeVotacionVigente = 1;
    //alert("top.convocatoriaVigente._links.self.href: " + top.convocatoriaVigente._links.self.href);
    var idConvocatoria = top.convocatoriaVigente._links.self.href
    var posicion = idConvocatoria.indexOf("/convocatorias/");
    var mensajes = "";
    if(posicion >=0){
      idConvocatoria = idConvocatoria.substring(posicion + 15);
      acuerdo.idConvocatoria = idConvocatoria;
      //alert("formulario: + " + document.getElementById("datosdeUsuario"));
      if(document.getElementById("registro_acuerdoTitulo").value != ""){
        acuerdo.titulo = document.getElementById("registro_acuerdoTitulo").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado el título del acuerdo.";
        }else{
          mensajes += "\n-No se ha indicado el título del acuerdo."
        }
      }
      if(document.getElementById("registro_acuerdoTipo").value != ""){
        acuerdo.tipo = document.getElementById("registro_acuerdoTipo").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado el tipo del acuerdo.";
        }else{
          mensajes += "\n-No se ha indicado el tipo del acuerdo."
        }
      }
      if(document.getElementById("registro_acuerdoDescripcionAcuerdo").value != ""){
        acuerdo.descripcion = document.getElementById("registro_acuerdoDescripcionAcuerdo").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado la descripción del acuerdo.";
        }else{
          mensajes += "\n-No se ha indicado la descripción del acuerdo."
        }
      }
      if(document.getElementById("registro_acuerdoNumero").value != ""){
        acuerdo.numerodeVecesaVotar = document.getElementById("registro_acuerdoNumero").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado el número de veces que se puede votar el acuerdo.";
        }else{
          mensajes += "\n-No se ha indicado el número de veces que se puede votar el acuerdo."
        }
      }
      if(document.getElementById("registro_acuerdoInicioDeliberacion").value != ""){
        acuerdo.fechaInicioDeliberacion = document.getElementById("registro_acuerdoFechaLimite").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado la fecha de inicio de deliberación.";
        }else{
          mensajes += "\n-No se ha indicado la fecha de inicio de deliberación."
        }
      }
      if(document.getElementById("registro_acuerdoFinDeliberacion").value != ""){
        acuerdo.fechaFinDeliberacion = document.getElementById("registro_acuerdoFinDeliberacion").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado la fecha del fin de deliberacion.";
        }else{
          mensajes += "\n-No se ha indicado la fecha del fin de deliberacion."
        }
      }
      if(document.getElementById("registro_acuerdoFechaLimite").value != ""){
        acuerdo.fechaLimitedeVotacion = document.getElementById("registro_acuerdoFechaLimite").value;
      }else{
        if(mensajes == ""){
          mensajes = "-No se ha indicado la fecha limite de la ronda número 1 de la votación.";
        }else{
          mensajes += "\n-No se ha indicado la fecha limite de la ronda número 1 de la votación."
        }
      }
      
    
  
  }else{
    mensajes += "-No se pudo obtener el identicador de la convocatoria.";
  }
  if(mensajes != ""){
    datos.mensajes = mensajes;
    datos.acuerdo = {}
  }else{
    datos.mensajes = "";
    datos.acuerdo = acuerdo;
  }
  return datos;

}

function enviarDatosdeRegistrodeAcuerdo(acuerdo){
  var data = new FormData();
  
  var request = new XMLHttpRequest();
  var url = "http://localhost:8080/acuerdos";
  //alert("url: " + url);
  request.open('POST', url, false);  // `false` makes the request synchronous
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send(JSON.stringify(acuerdo));
  //alert("request.status: " + request.status);
  if(request.status === 200 || request.status === 201){
    //alert("res: " + request.responseText);
    //alert("-Los datos del nuevo acuerdo fueron registrados de manera exitosa.");
    var objAcuerdo = JSON.parse(request.responseText);
    //console.log(request.responseText);


    var idUrl = objAcuerdo._links.self.href;
    var indice = idUrl.indexOf("/acuerdos/");
    var idAcuerdo = idUrl.substring(indice + 10);

    
    registrarOpcionesdeVotacion(idAcuerdo)
    registrarConvocados(idAcuerdo);
    //registrarConvocados();
  }
  
}
function registrarOpcionesdeVotacion(idAcuerdo){
  var tbodyOpcionesdeVotacion = document.getElementById("tbody_acuerdoOpcionesdeVotacion");
  var elementosOpcion = tbodyOpcionesdeVotacion.childNodes;
  for(var i = 0; i < elementosOpcion.length; i++){
    var elementoOpcion = elementosOpcion[i];
    try{
      if(elementoOpcion.tagName){
        if(("" + elementoOpcion.tagName).toLowerCase().trim()  == "tr"){
          if(elementoOpcion.getAttribute("id") == "mensajedeNoOpcionesdeVotacion"){
            alert("-Error: No se ha indicado ninguna opción de votación");
          }else{
            //alert(elementoOpcion.outerHTML);
            var opciondeVotacion = new Object();
            opciondeVotacion.idAcuerdo = idAcuerdo;
            opciondeVotacion.titulo = elementoOpcion.getAttribute("titulo");
            //alert("opcion a enviar: " + JSON.stringify( opciondeVotacion))
           registrarOpciondeVotacion(opciondeVotacion);
          }
        }
      }
    }catch(err){ 
    }

  } 

}
function registrarOpciondeVotacion(opciondeVotacion){
  //alert("Registrando opción de votación " + JSON.stringify(opciondeVotacion));
  var request = new XMLHttpRequest();
    const url = "http://localhost:8080/opcionesdeVotacion";
    request.open("POST", url, false);
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(JSON.stringify(opciondeVotacion));
    if(request.status === 200 || request.status === 201){
     //   alert("Opción de Votación registrada");
          var resultado = JSON.parse(request.responseText);
          var opcionesdeVotacion = resultado._embedded;
          
     }else{
      //alert("Opción de Votación no registrada");
      
     }
}


function registrarConvocados(idAcuerdo){
 var areaConvocados = document.getElementById("tbody_acuerdoListadodeIntegrantes");
 var renglones = areaConvocados.childNodes;
 for(var i = 0; i < renglones.length; i++){
  if(renglones[i].tagName){
    if(renglones[i].tagName.toLowerCase() == "tr"){
      //alert("convocado " + i + ": " + renglones[i].innerHTML);
      registrarIntegranteConvocado(renglones[i], idAcuerdo);
    }
  }

 } 
}
function registrarIntegranteConvocado(renglon, idAcuerdo){
  if(renglon != null){
    if(renglon.getAttribute("idPersona")!= null){
      var convocadoAcuerdo = {};
      convocadoAcuerdo.idPersona = renglon.getAttribute("idPersona");
      convocadoAcuerdo.idAcuerdo = idAcuerdo;
      convocadoAcuerdo.idConvocatoria = top.convocatoriaVigente.idConvocatoria;
      convocadoAcuerdo.excluido = (("" + renglon.getAttribute("excluido")) == "true");
      convocadoAcuerdo.razondeExclusion = "" + renglon.getAttribute("razondeExclusion");
      //alert("Registrando convocado acuerdo " + JSON.stringify(convocadoAcuerdo));
      var request = new XMLHttpRequest();
      const url = "http://localhost:8080/convocadosAcuerdo";
      request.open("POST", url, false);
      request.setRequestHeader("Content-type", "application/json; charset=utf-8");
      request.send(JSON.stringify(convocadoAcuerdo));
      if(request.status === 200 || request.status === 201){
          //alert("Integrante convocado registrado " + request.responseText);
            var resultado = JSON.parse(request.responseText);
            var integranteConvocado = resultado._embedded;
            
      }else{
        //alert("Integrante convocado no registrado" );
        
      }


    }
  }

}
function agregarOpciondeVotacion(){
  //alert("agregando opcion de votacion");
  var textOpcion = document.getElementById("opciondeVotacion");
  if(textOpcion != null){
    textOpcion = textOpcion.value;
    var tbodyOpcionesdeVotacion = document.getElementById("tbody_acuerdoOpcionesdeVotacion");
    if(tbodyOpcionesdeVotacion != null){
      var mensajedeNoOpcionesdeVotacion = document.getElementById("mensajedeNoOpcionesdeVotacion");
      if(mensajedeNoOpcionesdeVotacion){
        top.opcionesdeVotacion = new Array();
        top.opcionesdeVotacion.push(textOpcion);
        tbodyOpcionesdeVotacion.removeChild(mensajedeNoOpcionesdeVotacion);
        var textoHtml = "<tr id = \"renglonOpciondeVotacion1\" titulo = \"" + textOpcion +"\"><td>";
        textoHtml += "<button type=\"button\" style = \"background-color: #ff0000; border-color: #ff0000;\" title = \"Eliminar opción de votación.\" ";
        textoHtml += "class=\"btn btn-primary btn-sm\" onclick = \"eliminarOpciondeVotacion('1')\"><i class=\"fa fa-close\"></i></button>&nbsp;"
        textoHtml += "" + textOpcion + "</td></tr>";
        tbodyOpcionesdeVotacion.innerHTML = textoHtml;
      }else{
        top.opcionesdeVotacion.push(textOpcion);
        var textoHtml = tbodyOpcionesdeVotacion.innerHTML + "\n<tr id = \"renglonOpciondeVotacion" + top.opcionesdeVotacion.length + "\" titulo = \"" + textOpcion +"\"><td>";
        textoHtml += "<button type=\"button\" style = \"background-color: #ff0000; border-color: #ff0000;\" title = \"Eliminar opción de votación.\" ";
        textoHtml += "class=\"btn btn-primary btn-sm\" onclick = \"eliminarOpciondeVotacion('" + top.opcionesdeVotacion.length + "')\"><i class=\"fa fa-close\"></i></button>&nbsp;"
        textoHtml += "" + textOpcion + "</td></tr>";
        tbodyOpcionesdeVotacion.innerHTML = textoHtml;
      }
    }
  }
  var botonCerrarVentanaOpciones = document.getElementById("cerrarVentanaAgregarOpcion");
  if(botonCerrarVentanaOpciones != null){
    botonCerrarVentanaOpciones.click();
  }
  
}

function eliminarOpciondeVotacion(idOpcion){
  var elementoOpciondeVotacion = document.getElementById("renglonOpciondeVotacion" + idOpcion);
  if(elementoOpciondeVotacion != null){
    elementoOpciondeVotacion.parentElement.removeChild(elementoOpciondeVotacion);
  }
}
