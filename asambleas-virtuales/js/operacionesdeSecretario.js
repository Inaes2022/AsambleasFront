function despliegaRegistrodeIntegrantes(){
   
    //alert("desplegando registro de nuevos integrantes");
    showView("view_RegistrodeNuevoIntegrante");
    document.getElementById("registrodeDatosdeUsuario").reset();
}
function generarContrasenia(){
    var cont = "";
    
    for(var i = 0; i < 8; i++)
    {
        cont += String.fromCharCode(34 + Math.random() * 90); 
    }
    alert("Contraseña generada: " + cont)
    alert(document.getElementById("registro_password11"));
    document.getElementById("registro_password11").value = cont; 
    return cont;

}
function registrarNuevoIntegrante(){
  alert("Registrando nuevo integrante");
  var integrante = {}
  integrante.nombre = "";
  integrante.apellidoMaterno = "";
  integrante.apellidoPaterno = "";
  integrante.correoElectronico = "";
  integrante.curp = "";
  integrante.telefono = "";
  integrante.whatsapp = "";
  integrante.tipo = "INTERNO";
  integrante.mesaDirectiva = false;
  integrante.sexo = "";
  integrante.nacionalidad = "";
  integrante.fechaNacimiento = "";
  integrante.status = "PREAPROBADO";
  integrante.voz = true;
  integrante.voto = true;
  integrante.password = "";
  integrante.idUsuario = "";
  integrante.bloqueado = false;
  //alert("formulario: + " + document.getElementById("datosdeUsuario"));
  var mensajes = "";
  if(document.getElementById("registro_idUsuario11").value != ""){
    integrante.idUsuario = document.getElementById("registro_idUsuario11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un identificador de usuario.";
    }else{
      mensajes += "\n-No se ha indicado un identificador de usuario."
    }
  }
  if(document.getElementById("registro_email").value != ""){
    integrante.correoElectronico = document.getElementById("registro_email").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un Correo Electrónico de contacto.";
    }else{
      mensajes += "\n-No se ha indicado un Correo Electrónico de contacto."
    }
  }
  if(document.getElementById("registro_nombre").value != ""){
    integrante.nombre = document.getElementById("registro_nombre").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el nombre del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el nombre del usuario."
    }
  }
  if(document.getElementById("registro_apellidoPaterno").value != ""){
    integrante.apellidoPaterno = document.getElementById("registro_apellidoPaterno").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el apellido paterno del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el apellido paterno del usuario."
    }
  }
   if(document.getElementById("registro_password11").value != ""){
    integrante.password = document.getElementById("registro_password11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado la contraseña del usuario.";
    }else{
      mensajes += "\n-No se ha indicado la contraseña del usuario."
    }
  }

  if(document.getElementById("registro_apellidoMaterno").value != ""){
    integrante.apellidoMaterno = document.getElementById("registro_apellidoMaterno").value;
  }
  if(document.getElementById("registro_curp1").value != ""){
    integrante.curp = document.getElementById("registro_curp1").value;
  }
  if(document.getElementById("registro_telefono1").value != ""){
    integrante.telefono = document.getElementById("registro_telefono1").value;
  } 
  if(document.getElementById("registro_whatsapp").value != ""){
    integrante.whatsapp = document.getElementById("registro_whatsapp").value;
  }
  if(document.getElementById("registro_fechaNacimiento").value != ""){
    integrante.fechaNacimiento = document.getElementById("registro_fechaNacimiento").value;
  }
  if(document.getElementById("registro_sexo").value != ""){
    integrante.sexo = document.getElementById("registro_sexo").value;
  }
  if(document.getElementById("registro_nacionalidad").value != ""){
    integrante.nacionalidad = document.getElementById("registro_nacionalidad").value;
  }
  if(document.getElementById("registro_voz").checked){
    integrante.voz = 1;
  }else{
    integrante.voz = 0;
  }
  if(document.getElementById("registro_voto").checked){
    integrante.voto = 1;
  }else{
    integrante.voto = 0;
  }
  if(document.getElementById("registro_mesaDirectiva").checked){
    integrante.mesaDirectiva = 1;
  }else{
    integrante.mesaDirectiva = 0;
  }
  if(document.getElementById("registro_bloqueado").checked){
    integrante.bloqueado = 1;
  }else{
    integrante.bloqueado = 0;
  }
  alert("Status: " + document.getElementById("registro_status").value);
  alert("Tipo: " + document.getElementById("registro_tipo").value);
  integrante.status = document.getElementById("registro_status").value;
  integrante.tipo = document.getElementById("registro_tipo").value;
  if(mensajes != ""){
    alert(mensajes);
  }else{
    enviarDatosdeRegistrodePersona(integrante);
  }
}
function actualizarIntegrante(){
  alert("Actualizando integrante");
  var integrante = {}
  integrante.nombre = "";
  integrante.apellidoMaterno = "";
  integrante.apellidoPaterno = "";
  integrante.correoElectronico = "";
  integrante.curp = "";
  integrante.telefono = "";
  integrante.whatsapp = "";
  integrante.tipo = "INTERNO";
  integrante.mesaDirectiva = false;
  integrante.sexo = "";
  integrante.nacionalidad = "";
  integrante.fechaNacimiento = "";
  integrante.status = "PREAPROBADO";
  integrante.voz = true;
  integrante.voto = true;
  integrante.password = "";
  integrante.idUsuario = "";
  integrante.bloqueado = false;
  //alert("formulario: + " + document.getElementById("datosdeUsuario"));
  var mensajes = "";
  if(document.getElementById("modificacion_idUsuario11").value != ""){
    integrante.idUsuario = document.getElementById("modificacion_idUsuario11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un identificador de usuario.";
    }else{
      mensajes += "\n-No se ha indicado un identificador de usuario."
    }
  }
  if(document.getElementById("modificacion_email").value != ""){
    integrante.correoElectronico = document.getElementById("modificacion_email").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado un Correo Electrónico de contacto.";
    }else{
      mensajes += "\n-No se ha indicado un Correo Electrónico de contacto."
    }
  }
  if(document.getElementById("modificacion_nombre").value != ""){
    integrante.nombre = document.getElementById("modificacion_nombre").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el nombre del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el nombre del usuario."
    }
  }
  if(document.getElementById("modificacion_apellidoPaterno").value != ""){
    integrante.apellidoPaterno = document.getElementById("modificacion_apellidoPaterno").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado el apellido paterno del usuario.";
    }else{
      mensajes += "\n-No se ha indicado el apellido paterno del usuario."
    }
  }
   if(document.getElementById("modificacion_password11").value != ""){
    integrante.password = document.getElementById("modificacion_password11").value;
  }else{
    if(mensajes = ""){
      mensajes = "-No se ha indicado la contraseña del usuario.";
    }else{
      mensajes += "\n-No se ha indicado la contraseña del usuario."
    }
  }

  if(document.getElementById("modificacion_apellidoMaterno").value != ""){
    integrante.apellidoMaterno = document.getElementById("modificacion_apellidoMaterno").value;
  }
  if(document.getElementById("modificacion_curp1").value != ""){
    integrante.curp = document.getElementById("modificacion_curp1").value;
  }
  if(document.getElementById("modificacion_telefono1").value != ""){
    integrante.telefono = document.getElementById("modificacion_telefono1").value;
  } 
  if(document.getElementById("modificacion_whatsapp").value != ""){
    integrante.whatsapp = document.getElementById("modificacion_whatsapp").value;
  }
  if(document.getElementById("modificacion_fechaNacimiento").value != ""){
    integrante.fechaNacimiento = document.getElementById("modificacion_fechaNacimiento").value;
  }
  if(document.getElementById("modificacion_sexo").value != ""){
    integrante.sexo = document.getElementById("modificacion_sexo").value;
  }
  if(document.getElementById("modificacion_nacionalidad").value != ""){
    integrante.nacionalidad = document.getElementById("modificacion_nacionalidad").value;
  }
  if(document.getElementById("modificacion_voz").checked){
    integrante.voz = 1;
  }else{
    integrante.voz = 0;
  }
  if(document.getElementById("modificacion_voto").checked){
    integrante.voto = 1;
  }else{
    integrante.voto = 0;
  }
  if(document.getElementById("modificacion_mesaDirectiva").checked){
    integrante.mesaDirectiva = 1;
  }else{
    integrante.mesaDirectiva = 0;
  }
  if(document.getElementById("modificacion_bloqueado").checked){
    integrante.bloqueado = 1;
  }else{
    integrante.bloqueado = 0;
  }
  integrante.status = document.getElementById("modificacion_status").value;
  integrante.tipo = document.getElementById("modificacion_tipo").value;
  alert("href: " + top.integranteaModificar._links.self.href);
  if(mensajes != ""){
    alert(mensajes);
  }else{
    modificarDatosdeRegistrodePersona(integrante);
  }
}

function cargarPersonas() {
  //alert("cargando personas");
  const url =
    "http://localhost:8080/personas";
  const http = new XMLHttpRequest();
  http.open("GET", url);
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      //alert("status: " + this.status);
      if (this.status == 200) {
        //alert("res: " + this.responseText);
        var resultado = JSON.parse(this.responseText);
        var personas = resultado._embedded;
        var integrantes = JSON.parse(this.responseText)._embedded
        //alert("integrantes: " + JSON.stringify(integrantes));
        showView("view_listadodeIntegrantes");
        var listado = document.getElementById("tbody_listadodeIntegrantes"); 
        //alert("Aqui, Listado: " + listado);
        //alert("Integrantes: " + integrantes);
        console.log("Integrantes: " + JSON.stringify(integrantes));
        //alert("Integrantes.persona.length: " + integrantes.persona.length);
        var html ="";
        for(var i = 0; i < integrantes.persona.length; i++){
          var integ = integrantes.persona[i];
          //alert("int: " + JSON.stringify( integ))
          html += "\n<tr>\n<td style = \"cursor:pointer; font-weight:bolder;\" onclick = \"editarIntegrante('" + integ.idUsuario + "')\"><button type=\"button\" class=\"btn btn-primary btn-sm\" onclick = \"editarIntegrante('" + integ.idUsuario + "')\"><i class=\"fa fa-edit\"></i></button>&nbsp;" + integ.nombre + " " + integ.apellidoPaterno + " " + integ.apellidoMaterno  + "(";
          if(integ.status == "APROBADO"){
            html += "<b style = \"color:#00ff00;\">" + integ.status + "</b>)</td>\n</tr>";
          }else{
            html += "<b style = \"color:#ff0000;\">" + integ.status + "</b>)</td>\n</tr>";
          }
        }
        console.log(html);
        listado.innerHTML = html;
      } 
      
    };
  }
  
  http.send();
}
function editarIntegrante(integrante){
  showView("view_ModificaciondeIntegrante");
  const url =  "http://localhost:8080/personas/search/findByIdUsuario?idUsuario=" +  integrante;
  const http = new XMLHttpRequest();

  http.open("GET", url);
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var resultado = JSON.parse(this.responseText);
        console.log("resultado: " + JSON.stringify(resultado));
        top.integranteaModificar = resultado._embedded.persona[0];
        integrante = top.integranteaModificar;
        console.log("integrante: " + JSON.stringify(integrante));
        modificarCampo("modificacion_email", integrante.correoElectronico);
        modificarCampo("modificacion_idUsuario11", integrante.idUsuario);
        modificarCampo("modificacion_password11", integrante.password);
        modificarCampo("modificacion_curp1", integrante.curp);
        modificarCampo("modificacion_nombre", integrante.nombre);
        modificarCampo("modificacion_apellidoPaterno", integrante.apellidoPaterno);
        modificarCampo("modificacion_apellidoMaterno", integrante.apellidoMaterno);
        modificarCampo("modificacion_nacionalidad", integrante.nacionalidad);
        modificarCampo("modificacion_sexo", integrante.sexo);
        modificarCampo("modificacion_fechaNacimiento", integrante.fechaNacimiento);
        modificarCampo("modificacion_telefono1", integrante.telefono);
        modificarCampo("modificacion_whatsapp", integrante.whatsapp);
        modificarCampo("modificacion_tipo", integrante.tipo);
        modificarCampo("modificacion_status", integrante.status);
        modificarCampoSelect("modificacion_voz", integrante.voz);
        modificarCampoSelect("modificacion_voto", integrante.voto);
        modificarCampoSelect("modificacion_mesaDirectiva", integrante.mesaDirectiva);
        modificarCampoSelect("modificacion_bloqueado", integrante.bloqueado);
      } 
    }
  };
  http.send();
  
  event.cancelBubble = true;
  return false;


}
//************************************************************************ */
function modificarCampo(campo, valor){
  try{
    document.getElementById(campo).value = "" + valor;
  }catch(error){

  }
}
//************************************************************************ */
function modificarCampoSelect(campo, valor){
  try{
    document.getElementById(campo).checked = (("" + valor) == "true");
  }catch(error){

  }
}
//************************************************************************ */
function despliegaSeleccionSecretario(){
  showView("view_SeleccionSecretario");

  var persona = top.persona;
  if(persona.status && !persona.bloqueado){
    document.getElementById("selecciondeSecretario_chat").style.display = "inline";
  }
 
  
  
}
//************************************************************************ */
function despliegalistadodeIntegrantes(){
  cargarPersonas();
 
}

function enviarDatosdeRegistrodePersona(persona){
  alert("Registrar Nuevo integrante")
  var data = new FormData();
  
  const request = new XMLHttpRequest();
  var url = "http://localhost:8080/personas";
  alert("url: " + url);
  request.open('POST', url, false);  // `false` makes the request synchronous
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send(JSON.stringify(persona));
  alert("request.status: " + request.status);
  if(request.status === 200 || request.status === 201){
    alert("-Los datos de nuevo integrante fueron registrados de manera exitosa.");
    despliegaSeleccionSecretario();
  }
  
}
function modificarDatosdeRegistrodePersona(persona){
  var data = new FormData();
  
  const request = new XMLHttpRequest();
  var url = top.integranteaModificar._links.self.href;
  alert("url: " + url);
  request.open('PUT', url, false);  // `false` makes the request synchronous
  request.setRequestHeader("Content-type", "application/json; charset=utf-8");
  request.send(JSON.stringify(persona));
  alert("request.status: " + request.status);
  if(request.status === 200 || request.status === 201){
    alert("-Los datos de nuevo integrante fueron modificados de manera exitosa.");
    despliegaSeleccionSecretario();
  }
  
}


