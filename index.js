// const fs = import('fs');

// const inquirerPromise = import('inquirer');
// const SVG = require('svg.js');

// (async () => {
//   const inquirerModule = await inquirerPromise;
//   const inquirer = inquirerModule.default;

//   async function getUserInput() {
//     const answers = await inquirer.prompt([
//       {
//         type: 'input',
//         name: 'text',
//         message: 'Enter up to three characters:',
//         validate: (input) => input.length <= 3,
//       },
//       {
//         type: 'input',
//         name: 'textColor',
//         message: 'Enter text color (keyword or hexadecimal):',
//       },
//       {
//         type: 'list',
//         name: 'shape',
//         message: 'Choose a shape:',
//         choices: ['circle', 'triangle', 'square'],
//       },
//       {
//         type: 'input',
//         name: 'shapeColor',
//         message: 'Enter shape color (keyword or hexadecimal):',
//       },
//     ]);

//     return answers;
//   }

//   function createSVG(text, textColor, shape, shapeColor) {
//     const draw = SVG().size(300, 200);

//     // Set up text element
//     const textElement = draw.text(text).fill(textColor).move(10, 30);

//     // Set up shape element
//     let shapeElement;
//     switch (shape) {
//       case 'circle':
//         shapeElement = draw.circle(100).fill(shapeColor).move(50, 50);
//         break;
//       case 'triangle':
//         shapeElement = draw.polygon('100,0 50,100 0,0').fill(shapeColor);
//         break;
//       case 'square':
//         shapeElement = draw.rect(100, 100).fill(shapeColor).move(50, 50);
//         break;
//       default:
//         throw new Error('Invalid shape');
//     }

//     // Save the SVG file
//     fs.writeFileSync('logo.svg', draw.svg());
//   }

//   async function main() {
//     const userInput = await getUserInput();
//     const { text, textColor, shape, shapeColor } = userInput;

//     createSVG(text, textColor, shape, shapeColor);

//     // Print output message
//     console.log('Generated logo.svg');
//   }

//   await main(); // Make sure to await the main function
// })();
const fs = require('fs');
const inquirer = require('inquirer');

class Shape {
  constructor(color) {
    this.color = color;
  }

  setColor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }

  render() {
    throw new Error('Method "render()" must be implemented.');
  }
}

class Circle extends Shape {
  render() {
    return `<circle cx="100" cy="100" r="50" fill="${this.color}" />`;
  }
}

class Triangle extends Shape {
  render() {
    return `<polygon points="150,50 100,150 200,150" fill="${this.color}" />`;
  }
}

class Square extends Shape {
  render() {
    return `<rect width="100" height="100" fill="${this.color}" x="100" y="50"/>`;
  }
}

async function getUserInput() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'text',
      message: 'Enter up to three characters:',
      validate: (input) => input.length <= 3,
    },
    {
      type: 'input',
      name: 'textColor',
      message: 'Enter text color (keyword or hexadecimal):',
    },
    {
      type: 'list',
      name: 'shape',
      message: 'Choose a shape:',
      choices: ['circle', 'triangle', 'square'],
    },
    {
      type: 'input',
      name: 'shapeColor',
      message: 'Enter shape color (keyword or hexadecimal):',
    },
  ]);

  return answers;
}

function createSVG(text, textColor, shapeType, shapeColor) {
  let shape;
  switch (shapeType) {
    case 'circle':
      shape = new Circle(shapeColor);
      break;
    case 'triangle':
      shape = new Triangle(shapeColor);
      break;
    case 'square':
      shape = new Square(shapeColor);
      break;
    default:
      throw new Error('Invalid shape');
  }

  const svgContent = `
    <svg width="300px" height="200px" xmlns="http://www.w3.org/2000/svg">
      ${shape.render()}
      <text x="100px" y="200px" fill="${textColor}">${text}</text>
    </svg>
  `;

  fs.writeFileSync('logo.svg', svgContent);
}

async function main() {
  const { text, textColor, shape, shapeColor } = await getUserInput();
  createSVG(text, textColor, shape, shapeColor);
  console.log('Generated logo.svg');
}

main();
