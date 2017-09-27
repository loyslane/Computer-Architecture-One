const fs = require('fs');
const readline = require('readline');
const readStream = fs.createReadStream('inputfile');
const rl = readline.createInterface(readStream)
let state;
let register = [];
let index;
let temp;
// const codeLines = [];

rl.on('line', (line) => {
  let code = '';
  // let program_counter = 0;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '#') break;
    if (line[i] === '0' || line [i] === '1') {
      code += line[i];
    }
  }
  if (!state && code === '00000001') {
    register = [];
    state = 0;
  }
  switch(state) {
    case 0:  // read
      switch(code) {
        case '00000010': // set
          state = code;
          break;
        case '00000100':  // save
          state = code;
          break;
        case '00000101': // multiply
          state = code;
          break;
        case '00000110': // print
          state = code;
          console.log(register[index]);
          state = 0;
          break;
      }
      break;
    case '00000010':  // set
      index = parseInt(Number(code), 2);
      state = 0;
      break;
    case '00000100': // save
      register[index] = parseInt(Number(code), 2);
      state = 0;
      break;
    case '00000101': // multiply
      if (!temp) {
        temp = register[parseInt(Number(code), 2)];
      } else {
        temp *= register[parseInt(Number(code), 2)];
        register[index] = temp;
        temp = undefined;
        state = 0;
      }
      break;
    case '00000110': // print
      console.log(register[index]);
      state = 0;
      break;
  }
  // program_counter++;
  // codeLines.push(code);
  // console.log(codeLines);
});

// console.log(codeLines);

// create an interval with `setInterval`; you choose the interval
// call function executeCore
// Read data from your file that is pointed to by PC
// # PC 0 = line 0
// Implement a delay timeout with interrupt from MAR/DMA to notify CPU when memory is ready
// Copy the data pointed to by the PC into the IR
// IR commands:
//   - Initialize: set all four registers to 0
//   - SET: prepare to specify which register
//   - register 0 is set
//   - SAVE
//   - ...