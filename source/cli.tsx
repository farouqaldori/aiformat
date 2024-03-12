#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import App from './app.js';
// import meow from 'meow';

// This code is commented out in case we want to use it later to pass arguments to the CLI
// const cli = meow(
//     `
// 	Usage
// 	  $ aiformat

// 	Options
// 		--name  Your name

// 	Examples
// 	  $ aiformat --name=Jane
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
