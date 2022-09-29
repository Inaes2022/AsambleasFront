top.usuario = {};
top.persona = {};
//************************************************************************ */
function login() {
  //alert("Ingresando");
  var idUsuario = document.getElementById("idUsuario").value;
  var pass = document.getElementById("password").value;

  var mensaje = "";
  if (idUsuario == "") {
    mensaje +=
      "-No se ha indicado el Identificador o Correo Electrónico del Usuario.";
  }
  if (pass == "") {
    if (mensaje == "") {
      mensaje += "-No se ha indicado la Contraseña del Usuario.";
    } else {
      mensaje += "\n-No se ha indicado la Contraseña del Usuario.";
    }
  }
  if (mensaje == "") {
    const url =
      "http://localhost:8080/personas/search/findByIdUsuario?idUsuario=" +
      idUsuario;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //alert("res: " + this.responseText);
          var resultado = JSON.parse(this.responseText);
          var persona = resultado._embedded.persona[0];
          if (resultado._embedded.persona.length > 0) {
            if (resultado._embedded.persona[0].password == pass) {
              top.persona = persona;
              top.usuario.tipodeUsuario = getTipodeUsuario(persona);
            } else {
              alert("-La contraseña del usuario es incorrecta.");
            }
            //document.location = index.html;
          } else {
            loginxEmail(idUsuario, pass);
          }
        } 
      }
    };
    http.send();
  } else {
    alert(mensaje);
  }
}
//************************************************************************ */

//************************************************************************ */
function loginxEmail(idUsuario, pass) {
  const url =
    "http://localhost:8080/personas/search/findByCorreoElectronico?correoElectronico=" +
    idUsuario;
  const http = new XMLHttpRequest();

  http.open("GET", url);
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {

        var resultado = JSON.parse(this.responseText);
        if (resultado._embedded.persona.length > 0) {
          var persona = resultado._embedded.persona[0];
          if (persona.password == pass) {
            top.persona = persona;
            top.usuario.tipodeUsuario = getTipodeUsuario(persona);
          } else {
            alert("-La contraseña del usuario no es valida");
          }
          //document.location = index.html;
        } else {
          alert(
            "No fue posible encontrar ningun usuario con los datos indicados"
          );
        }
      } 
    }
  };
  http.send();
}
//************************************************************************ */
function getTipodeUsuario(persona) {
  var href = persona._links.self.href;
  var iddePersona = href.substring(href.lastIndexOf("/") + 1);
  const url =
  "http://localhost:8080/secretarios/search/findByIdPersona?idPersona=" +
  iddePersona;
  const http = new XMLHttpRequest();

  http.open("GET", url);
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var resultado = JSON.parse(this.responseText);
        if (resultado._embedded.secretario.length > 0) {
          top.usuario.tipodeUsuario = "Secretario"
          despliegaSeleccionSecretario();
        } else {
          top.usuario.tipodeUsuario = "Integrante"
          despliegaSeleccionUsuario();
        }
      } 
    }
  };
  http.send();
}
//************************************************************************ */
function cargarMenu(){
  const url =
  "http://localhost:8080/personas/search/findByCorreoElectronico?correoElectronico=" +
  idUsuario;
const http = new XMLHttpRequest();

http.open("GET", url);
http.onreadystatechange = function () {
  if (this.readyState == 4) {
    if (this.status == 200) {

      var resultado = JSON.parse(this.responseText);
      if (resultado._embedded.persona.length > 0) {
        var persona = resultado._embedded.persona[0];
        if (persona.password == pass) {
          top.usuario.tipodeUsuario = getTipodeUsuario(persona);
        } else {
          alert("-La contraseña del usuario no es valida");
        }
        //document.location = index.html;
      } else {
        alert(
          "No fue posible encontrar ningun usuario con los datos indicados"
        );
      }
    } 
  }
};
http.send();
}
//************************************************************************ */
function showView(_view){
  var elemento_views = document.getElementById("views");
  var views = elemento_views.childNodes;
  for(var i = 0; i < views.length; i++){
    var view = views[i];
    try{
      if(view.getAttribute("id") == _view){
        view.style.display = "inline";
      }else{
        view.style.display = "none";
      }
    }catch(error){

    }
  }

}
//************************************************************************ */

function cargarVista(url){

  //alert("cargando: " + url);
  const request = new XMLHttpRequest();

  request.open('GET', url, false);  // `false` makes the request synchronous
  request.send(null);
  if (request.status === 200) {
    var views = document.getElementById("views");
    views.innerHTML = views.innerHTML + "\n" + request.responseText;
    //alert(request.responseText);
  }

}
//************************************************************************ */
function cargarOpciones(){
  const request = new XMLHttpRequest();
  var url = "http://localhost:8080/opciones"
  request.open('GET', url, false);  // `false` makes the request synchronous
  request.send(null);
  if (request.status === 200) {
    /*var views = document.getElementById("views");
    views.innerHTML = views.innerHTML + "\n" + request.responseText;*/
  }

}

//************************************************************************ */
 function despliegaSeleccionUsuario(){
  showView("view_SeleccionUsuario");
  var persona = top.persona;
  if(persona.status && !persona.bloqueado){
    document.getElementById("selecciondeUsuario_chat").style.display = "inline";
  }
 }
//************************************************************************ */
function despliegaDatosPersonales(){
  showView("view_Datos");
  var persona = top.persona;
  //alert("persona: " + JSON.stringify(persona));
  document.getElementById("edicion_idUsuario11").value = persona.idUsuario;
  document.getElementById("edicion_email").value = persona.correoElectronico;
  document.getElementById("edicion_nombre").value = persona.nombre;
  document.getElementById("edicion_apellidoPaterno").value = persona.apellidoPaterno;
  document.getElementById("edicion_apellidoMaterno").value = persona.apellidoMaterno;
  document.getElementById("edicion_curp1").value = "" + persona.curp;
  document.getElementById("edicion_password11").value = persona.password;
  document.getElementById("edicion_password12").value = persona.password1;
  document.getElementById("edicion_telefono1").value = "" + persona.telefono;
  document.getElementById("edicion_whatsapp").value = "" + persona.whatsapp;
  modificarCampo("edicion_nacionalidad", persona.nacionalidad);
  modificarCampo("edicion_sexo", persona.sexo);
  modificarCampo("edicion_fechaNacimiento", persona.fechaNacimiento);
       
}
//************************************************************************ */
function despliegaAdministración(){
  showView("view_Administracion");
 }
//************************************************************************ */
function despliegaChat(){
  showView("view_Chat");
 }
//************************************************************************ */
function registrarDatosdeUsuario(){
  //alert("registrando datos de usuario" + event.target)
  var boton = event.target;
  //alert("formulario: + " + document.getElementById("datosdeUsuario"));
  var mensajes = "";
  var persona = top.persona;
  //alert("document.getElementById(\"edicion_idUsuario11\"): " + document.getElementById("edicion_idUsuario11"));
  if(document.getElementById("edicion_idUsuario11").value != ""){
    persona.idUsuario = document.getElementById("edicion_idUsuario11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un identificador de usuario.";
    }else{
      mensajes += "\n-No se ha indicado un identificador de usuario."
    }
  }
  if(document.getElementById("edicion_email").value != ""){
    persona.correoElectronico = document.getElementById("edicion_email").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un Correo Electrónico de contacto.";
    }else{
      mensajes += "\n-No se ha indicado un Correo Electrónico de contacto."
    }
  }
  if(document.getElementById("edicion_nombre").value != ""){
    persona.nombre = document.getElementById("edicion_nombre").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el nombre del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el nombre del usuario."
    }
  }
  if(document.getElementById("edicion_apellidoPaterno").value != ""){
    persona.apellidoPaterno = document.getElementById("edicion_apellidoPaterno").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el apellido paterno del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el apellido paterno del usuario."
    }
  }
  if(document.getElementById("edicion_apellidoMaterno").value != ""){
    persona.apellidoMaterno = document.getElementById("edicion_apellidoMaterno").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el apellido materno del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el apellido materno del usuario."
    }
  }
  if(document.getElementById("edicion_curp1").value != ""){
    persona.curp = document.getElementById("edicion_curp1").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el CURP del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el CURP del usuario."
    }
  }
  if(document.getElementById("edicion_password11").value != ""){
    persona.password1 = document.getElementById("edicion_password11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado la contraseña del usuario.";
    }else{
      mensajes += "\n-No se ha indicado la contraseña del usuario."
    }
  }
  if(document.getElementById("edicion_password12").value != ""){
    persona.password2 = document.getElementById("edicion_password12").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha confirmado la contraseña del usuario.";
    }else{
      mensajes += "\n-No se ha confirmado la contraseña del usuario."
    }
  }
  if(document.getElementById("edicion_telefono1").value != ""){
    persona.telefono = document.getElementById("edicion_telefono1").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el teléfono del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el teléfono del usuario."
    }
  }
  if(document.getElementById("edicion_whatsapp").value != ""){
    persona.whatsapp = document.getElementById("edicion_whatsapp").value;
  }
  if(mensajes != ""){
    alert(mensajes);
  }else{
    enviarDatos(persona);

  }
}

function enviarDatos(persona){
  //alert("enviando datos: " + JSON.stringify(persona));
  guardarDatos(persona);

}


//************************************************************************ */
function guardarDatos(persona){
  //alert("guardando datos " + JSON.stringify(persona));

  var data = new FormData();
  for(var i in persona){
    data.append("" + i, "" + persona[i])
  }
  const request = new XMLHttpRequest();
  var url = persona._links.self.href;
  //alert("url: " + url);
  request.open('PUT', url, false);  // `false` makes the request synchronous
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send(JSON.stringify(persona));
  //alert("request.status: " + request.status);
  if(request.status === 200){
    alert("-Sus datos de usuario fueron registrados de manera exitosa.");
    despliegaMenu();
  }
  
}

function obtenerDatosdeUsuario(){
  //alert("Obteniendo datos de usuario");
  //alert("document.getElementById(registro_curp1): " + document.getElementById("registro_curp1"));
  var cadenaCurp = document.getElementById("registro_curp1").value;
  //alert("curp: " + cadenaCurp)
  top.curpaConsultar = cadenaCurp;
  const url =
      "https://sia.inaes.gob.mx/ServiciosWeb/ConsultaCurp?curp=" +
      cadenaCurp;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          //alert("res: " + this.responseText);
          console.log("res: " + this.responseText);
          var parser = new DOMParser();
          var doc = parser.parseFromString(this.responseText, "text/html");
          //alert("doc: " + doc);
         
          //alert("doc: " + doc.getElementsByTagName("html")[0].innerHTML);
          //alert("doc: " + doc.getElementById("estatusOperacion").innerHTML);
          if("EXITOSO" === ("" + doc.getElementById("estatusOperacion").innerHTML).trim()){
            obtenDatosdePersona(doc);

          }else{
            alert("-No fue posible encontrar a la persona con CURP " + top.curpaConsultar);
          }
         
        } 
      }
    }
    http.send();
}
function obtenDatosdePersona(doc){
  var nombre = ("" + doc.getElementById("nombres").innerHTML).trim();
  var apellidoPaterno = ("" + doc.getElementById("apellido1").innerHTML).trim();
  var apellidoMaterno = ("" + doc.getElementById("apellido2").innerHTML).trim();
  var fechaNacimiento = ("" + doc.getElementById("fechNac").innerHTML).trim();
  var sexo = ("" + doc.getElementById("sexo").innerHTML).trim();
  var nacionalidad = ("" + doc.getElementById("nacionalidad").innerHTML).trim();
  document.getElementById("registro_nombre").value = nombre;
  document.getElementById("registro_apellidoPaterno").value = apellidoPaterno;
  document.getElementById("registro_apellidoMaterno").value = apellidoMaterno;
  document.getElementById("registro_fechaNacimiento").value = fechaNacimiento;
  document.getElementById("registro_sexo").value = sexo;
  document.getElementById("registro_nacionalidad").value = nacionalidad;
}
function despliegaChat(){
  showView("view_chat");
}
function despliegaMenu(){
  var persona = top.persona;
  if(top.usuario.tipodeUsuario == "Secretario"){
    despliegaSeleccionSecretario();
  } 
  if(top.usuario.tipodeUsuario == "Integrante") {
    despliegaSeleccionUsuario();
  }
}
$(document).ready(function() {
  showView("view_login");

});

