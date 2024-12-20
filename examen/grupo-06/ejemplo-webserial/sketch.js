// This example is also available online in the p5.js web editor:
// https://editor.p5js.org/gohai/sketches/X0XD9xvIR

let puerto;
let botonConexion;
let botonGirarMotorUno;
let botonGirarMotorDos;

function setup() {
  createCanvas(400, 400);
  background(220);

  puerto = createSerial();

  // in setup, we can open ports we have used previously
  // without user interaction

  let puertosUsados = usedSerialPorts();
  if (puertosUsados.length > 0) {
    puerto.open(puertosUsados[0], 9600);
  }

  botonConexion = document.getElementById('botonConexion');
  botonConexion.addEventListener('click', conectarClick);

  botonGirarMotorUno = document.getElementById('botonGirarMotorUno');
  botonGirarMotorUno.addEventListener('click', girarMotorUno);

  botonGirarMotorDos = document.getElementById('botonGirarMotorDos');
  botonGirarMotorDos.addEventListener('click', girarMotorDos);
}

function draw() {
  // this makes received text scroll up
  copy(0, 0, width, height, 0, -1, width, height);

  // reads in complete lines and prints them at the
  // bottom of the canvas
  let str = puerto.readUntil('\n');
  if (str.length > 0) {
    text(str, 10, height - 20);
  }

  // changes button label based on connection status
  if (!puerto.opened()) {
    botonConexion.innerHTML = 'Conectar';
  } else {
    botonConexion.innerHTML = 'Desconectar';
  }
}

function conectarClick() {
  if (!puerto.opened()) {
    puerto.open('Arduino', 9600);
  } else {
    puerto.close();
  }
}

function girarMotorUno() {
  console.log('girarMotorUno');
  puerto.write('u\n');
}

function girarMotorDos() {
  console.log('girarMotorDos');
  puerto.write('d\n');
}
