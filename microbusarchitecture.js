const fs = require('fs');
const readline = require('readline');
const readStream = fs.createReadStream('inputfile');
const rl = readline.createInterface(readStream)
let state = 0;
let register = [];
let index;
let multiplyDone = false;

rl.on('line', (line) => {
    let code = '';
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '#') break;
      if (line[i] === '0' || line [i] === '1') {
        code += line[i];
      }
    }
    switch(state) {
      case 0:  // read
        switch(code) {
          case '00000001':  // initialize
            register = [];
            state = 0;
            break;
          case '00000010': // set
            state = 'SET';
            break;
          case '00000100':  // save
            state = 'SAVE';
            break;
          case '00000101': // multiply
            state = 'MUL';
            break;
          case '00000110': // print
            console.log(register[index]);
            break;
        }
        break;
      case 'SET':
        index = parseInt(Number(code), 2);
        state = 0;
        break;
      case 'SAVE':
        register[index] = parseInt(Number(code), 2);
        state = 0;
        break;
      case 'MUL':
        if (!multiplyDone) {
          register[index] = register[parseInt(Number(code), 2)];
          multiplyDone = true;
        } else {
          register[index] *= register[parseInt(Number(code), 2)];
          multiplyDone = false;
          state = 0;
        }
        break;
    }
});
