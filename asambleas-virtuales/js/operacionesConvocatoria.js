function crearConvocatoria(){
    event.preventDefault();
    showView("view_RegistrodeNuevaConvocatoria");
  
  }
  function modificarConvocatoria(){
    event.preventDefault();
    showView("view_modificaciondeNuevaConvocatoria");
    const url =  "http://localhost:8080/convocatorias/search/findByVigente?vigente=" +  true;
  const http = new XMLHttpRequest();

  http.open("GET", url);
  http.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        var resultado = JSON.parse(this.responseText);
        //alert("resultado: " + JSON.stringify(resultado));
        //console.log("resultado: " + JSON.stringify(resultado));
        top.convocatoriaModificar = resultado._embedded.convocatoria[0];
        convocatoria = top.convocatoriaModificar;
        //console.log("convocatoria: " + JSON.stringify(convocatoria));
        modificarCampo("modificacion_convocatoria_nombre", convocatoria.nombre);
        modificarCampo("modificacion_convocatoria_numero", convocatoria.numero);
        modificarCampo("modificacion_convocatoria_tipo", convocatoria.tipo);
        modificarCampo("modificacion_convocatoria_anio", convocatoria.anio);
        modificarCampo("modificacion_convocatoria_fecha_inicio", convocatoria.inicioAsamblea);
        modificarCampo("modificacion_convocatoria_fecha_final", convocatoria.finAsamblea);
      } 
    }
  };
  http.send();
  
  event.cancelBubble = true;
  return false;


}
  function registrarNuevaConvocatoria(){
    //alert("registrando nueva convocatoria");
    var convocatoria = {}
    convocatoria.nombre = "";
    convocatoria.tipo = "";
    convocatoria.inicioAsamblea = "";
    convocatoria.finAsamblea = "";
    convocatoria.anio = "INTERNO";
    convocatoria.numero = false;
    convocatoria.vigente = true;
    //alert("formulario: + " + document.getElementById("datosdeUsuario"));
    var mensajes = "";
    if(document.getElementById("registro_convocatoria_nombre").value != ""){
      convocatoria.nombre = document.getElementById("registro_convocatoria_nombre").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el nombre de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el nombre de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_tipo").value != ""){
      convocatoria.tipo = document.getElementById("registro_convocatoria_tipo").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el tipo de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el tipo de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_anio").value != ""){
      convocatoria.anio = document.getElementById("registro_convocatoria_anio").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el año de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el año de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_numero").value != ""){
      convocatoria.numero = document.getElementById("registro_convocatoria_numero").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el número de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el número de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_fecha_inicio").value != ""){
      convocatoria.inicioAsamblea = document.getElementById("registro_convocatoria_fecha_inicio").value;
      convocatoria.inicioAsamblea = new Date(convocatoria.inicioAsamblea);
    //  alert("fecha: " + convocatoria.inicioAsamblea);
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado la fecha de inicio de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado la fecha de inicio de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_fecha_final").value != ""){
      convocatoria.finAsamblea = document.getElementById("registro_convocatoria_fecha_final").value;
      convocatoria.finAsamblea = new Date(convocatoria.finAsamblea);
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado la fecha final de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado la fecha final de la asamblea."
      }
    }
    
   
  
    if(mensajes != ""){
      alert(mensajes);
    }else{
      enviarDatosdeRegistrodeConvocatoria(convocatoria);
    }
  }
  function modificarNuevaConvocatoria(){
    //alert("modificando nueva convocatoria");
    var convocatoria = {}
    convocatoria.nombre = "";
    convocatoria.tipo = "";
    convocatoria.inicioAsamblea = "";
    convocatoria.finAsamblea = "";
    convocatoria.anio = "INTERNO";
    convocatoria.numero = false;
    convocatoria.vigente = true;
    //alert("formulario: + " + document.getElementById("datosdeUsuario"));
    var mensajes = "";
    if(document.getElementById("registro_convocatoria_nombre").value != ""){
      convocatoria.nombre = document.getElementById("registro_convocatoria_nombre").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el nombre de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el nombre de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_tipo").value != ""){
      convocatoria.tipo = document.getElementById("registro_convocatoria_tipo").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el tipo de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el tipo de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_anio").value != ""){
      convocatoria.anio = document.getElementById("registro_convocatoria_anio").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el año de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el año de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_numero").value != ""){
      convocatoria.numero = document.getElementById("registro_convocatoria_numero").value;
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado el número de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado el número de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_fecha_inicio").value != ""){
      convocatoria.inicioAsamblea = document.getElementById("registro_convocatoria_fecha_inicio").value;
      convocatoria.inicioAsamblea = new Date(convocatoria.inicioAsamblea);
    //  alert("fecha: " + convocatoria.inicioAsamblea);
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado la fecha de inicio de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado la fecha de inicio de la asamblea."
      }
    }
    if(document.getElementById("registro_convocatoria_fecha_final").value != ""){
      convocatoria.finAsamblea = document.getElementById("registro_convocatoria_fecha_final").value;
      convocatoria.finAsamblea = new Date(convocatoria.finAsamblea);
    }else{
      if(mensajes = ""){
        mensajes = "-No se ha indicado la fecha final de la asamblea.";
      }else{
        mensajes += "\n-No se ha indicado la fecha final de la asamblea."
      }
    }
    
   
  
    if(mensajes != ""){
      alert(mensajes);
    }else{
      enviarDatosdeModificaciondeConvocatoria(convocatoria);
    }
  }
  
  function despliegaMenuConvocatoria(){
    event.preventDefault();
    showView("view_menuConvocatorias");
    const url =  "http://localhost:8080/convocatorias/search/findByVigente?vigente=" +  true;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var resultado = JSON.parse(this.responseText);
          //alert("resultado: " + JSON.stringify(resultado));
          //console.log("resultado consulta convocatoria: " + JSON.stringify(resultado));
          top.convocatoriaVigente = resultado._embedded.convocatoria[0];
          if(resultado._embedded.convocatoria.length > 0){
            var idConvocatoria = "" + top.convocatoriaVigente._links.self.href;
            var index = idConvocatoria.indexOf("convocatorias/");
            idConvocatoria = idConvocatoria.substring(index + 14);
            top.convocatoriaVigente.idConvocatoria = idConvocatoria;
            top.convocatoriaVigente.enDB = true;
            document.getElementById("opcion_registro_Nueva_Convocatoria").style.display = "none";
            document.getElementById("opcion_modificacion_Nueva_Convocatoria").style.display = "block";
            document.getElementById("opcion_listado_ordendelDia").style.display = "block";
            document.getElementById("agregar_acuerdos").style.display = "block";
            leerAcuerdos(idConvocatoria);
            leerOpcionesdeVotacion(idConvocatoria);
        //    leerConvocados(idConvocatoria);

          }else{
           //alert("No encontro convocatoria");
            document.getElementById("opcion_registro_Nueva_Convocatoria").style.display = "block";
            document.getElementById("opcion_modificacion_Nueva_Convocatoria").style.display = "none";
            document.getElementById("opcion_listado_ordendelDia").style.display = "none";
            document.getElementById("agregar_acuerdos").style.display = "none";
            top.convocatoriaVigente.idConvocatoria = -1;
            top.convocatoriaVigente.enDB = false;
            }
        
        } 
      }
    }
    http.send();
  //event.cancelBubble();
    return false;
  }
  function leerAcuerdos(idConvocatoria){
    event.preventDefault();
    showView("view_menuConvocatorias");
    const url =  "http://localhost:8080/acuerdos/search/findByIdConvocatoria?idConvocatoria=" +  idConvocatoria;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var resultado = JSON.parse(this.responseText);
          //alert("resultado: " + JSON.stringify(resultado));
          //console.log("resultado consulta de acuerdos de convocatoria: " + JSON.stringify(resultado));
          top.acuerdosVigentes = resultado._embedded.acuerdo[0];
          if(resultado._embedded.acuerdo.length > 0){
            top.acuerdosVigentes = resultado._embedded.acuerdo;

          }else{
          }
        } 
      }
    }
    http.send();
  //event.cancelBubble();
    return false;
  }
  function leerOpcionesdeVotacion(idConvocatoria){
    event.preventDefault();
    showView("view_menuConvocatorias");
    const url =  "http://localhost:8080/opcionesdeVotacion/search/findByIdConvocatoria?idConvocatoria=" +  idConvocatoria;
    const http = new XMLHttpRequest();

    http.open("GET", url);
    http.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          var resultado = JSON.parse(this.responseText);
          //alert("resultado: " + JSON.stringify(resultado));
          //console.log("resultado opciones de votación de convocatoria: " + JSON.stringify(resultado));
          top.opcionesdeVotacion = resultado._embedded.opciondeVotacion[0];
          if(resultado._embedded.opciondeVotacion.length > 0){
            top.opcionesdeVotacion = resultado._embedded.opciondeVotacion;

          }else{
          }
        } 
      }
    }
    http.send();
  //event.cancelBubble();
    return false;
  }
  /*function leerConvocados(idConvocatoria){

  }*/


/*function despliegaModificaciondeConvocatoria(){
    alert("Por generar la modificacion de convocatorias");
    //showView("view_modificaciondeConvocatoria");
    return false;
  }
  function despliegaConsultadeConvocatoria(){
    alert("Por generar la consulta de convocatorias");
    //showView("view_modificaciondeConvocatoria");
    return false;
  }*/
  function enviarDatosdeRegistrodeConvocatoria(convocatoria){
    var data = new FormData();
    
    const request = new XMLHttpRequest();
    var url = "http://localhost:8080/convocatorias";
    //alert("url: " + url);
    request.open('POST', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(JSON.stringify(convocatoria));
    //alert("request.status: " + request.status);
    if(request.status === 200 || request.status === 201){
      alert("-Los datos de la nueva convocatoria fueron registrados de manera exitosa.");
      modificarConvocatoria();
    }
    
  }
  function enviarDatosdeModificaciondeConvocatoria(convocatoria){
    var data = new FormData();
    
    const request = new XMLHttpRequest();
    var url = "http://localhost:8080/convocatorias";
    //alert("url: " + url);
    request.open('PUT', url, false);  // `false` makes the request synchronous
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    request.send(JSON.stringify(convocatoria));
    //alert("request.status: " + request.status);
    if(request.status === 200 || request.status === 201){
      alert("-Los datos de la nueva convocatoria fueron registrados de manera exitosa.");
      despliegaSeleccionSecretario();
    }
    
  }
  function modificarOrdendelDia(){
    //alert("modificando orden del dia");
    showView("view_listadodeAcuerdos");
    alert("acuerdos " + JSON.stringify(top.acuerdosVigentes));
    CargarConvocatoria();
    cargarAcuerdos();

  }
  function CargarConvocatoria(){
    var convocatoria = top.convocatoriaVigente;
    alert("convocatoria: " + JSON.stringify(convocatoria));
    alert(document.getElementById("titulo_convocatoria"));
    document.getElementById("titulo_convocatoria").innerHTML = convocatoria.nombre;
    document.getElementById("tipo_convocatoria").innerHTML = convocatoria.tipo;
    var fechas = "del <b>" + convocatoria.inicioAsamblea + "</b> al <b>" + convocatoria.finAsamblea +"</b>.";
    document.getElementById("fecha_convocatoria").innetHTML = fechas;

  }
  function cargarAcuerdos() {
    //alert("cargando acuerdos");

    var listado = document.getElementById("tbody_listadodeAcuerdos"); 
    alert("Marca 1");
    //alert("Aqui, Listado: " + listado);
    //alert("Integrantes: " + integrantes);
    //console.log("Integrantes: " + JSON.stringify(integrantes));
    //alert("Integrantes.persona.length: " + integrantes.persona.length);
    var html ="";
    var acuerdos = top.acuerdosVigentes;
    for(var i = 0; i < acuerdos.length; i++){
      var acuerdo = acuerdos[i];
      //alert("int: " + JSON.stringify( integ))
      html += "\n<tr>\n<td style = \"cursor:pointer; font-weight:bolder;\" onclick = \"editarAcuerdo('" + acuerdo.titulo + "')\"><button type=\"button\" class=\"btn btn-primary btn-sm\" onclick = \"editarAcuerdo('" + acuerdo.idAcuerdo + "')\"><i class=\"fa fa-edit\"></i></button>&nbsp;" + acuerdo.titulo ;
      html += "</td>\n</tr>";
      
    }
    console.log(html);
    listado.innerHTML = html;
  } 

  