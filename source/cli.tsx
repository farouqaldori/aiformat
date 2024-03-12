#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';
// import meow from 'meow';

// This code is commented out in case we want to use it later to pass arguments to the CLI
// const cli = meow(
//     `
// 	Usage
// 	  $ wizcli

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ wizcli --name=Jane
// 	  Hello, Jane
// `,
//     {
//         importMeta: import.meta,
//         flags: {
//             name: {
//                 type: 'string',
//             },
//         },
//     },
// );

render(<App />);
