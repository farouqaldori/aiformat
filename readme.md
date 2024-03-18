# aiformat

https://github.com/farouqaldori/aiformat/assets/16778033/381c5736-e9a1-4dc0-afeb-31e06c7d8bb8

aiformat is a simple tool you can use from the command line. It helps you select files and folders and change them into a format that AI assistants like Claude can understand. 

This way, you can share code snippets and project structures faster and easier directly from the console, without having to copy and paste them manually.

This cli tool is built using [Ink](https://github.com/vadimdemedes/ink).

## Updates
### **Mar 18 2024 (v0.0.3):**  Folder navigation support
* Added searching inside deeply nested files.
* Added the ability to expand/collapse folders with the `Tab` key.
* Added emojis to differentiate between folders (🗂️) and files (📄).
* Full code re-write, including ID based navigation.

## Features

- Interactively select files and folders from the current directory
- Filter files and folders using a search query
- Navigate through the list using arrow keys
- Select/deselect items using left/right arrow keys
- Convert selected files and folders into a format compatible with Claude
- Automatically copy the formatted output to the clipboard


## Install

To install aiformat, make sure you have Node.js installed on your system. Then, run the following command:


```bash
$ npm install --global aiformat
```

## Usage

To use aiformat, navigate to the directory containing the files and folders you want to share with Claude. Then, run the following command:

```bash
aiformat
```

The CLI will display a list of files and folders in the current directory. You can navigate through the list using the up and down arrow keys. To select or deselect an item, use the left or right arrow keys.

You can also filter the list by typing a search query. The list will update in real-time as you type.

Once you have selected the desired files and folders, press Enter. The CLI will format the selected items into a structure that Claude can understand and automatically copy the output to your clipboard.

## Example

```bash
$ cd /path/to/your/project
$ aiformat
```

![aiformat example](https://i.imgur.com/Vx1EYLn.png)

Navigate through the list, select the desired files and folders, and press Enter. The formatted output will be copied to your clipboard, ready to be pasted into your conversation with your AI assistant.

The output is optimized for usage with Claude, by wrapping files with XML tags. 

Example prompt:

```
<file name="package.json">
{
	"name": "aiformat",
	"version": "0.0.1",
	"license": "MIT",
  ...
}
</file>

<directory name="source">
<file name="source/app.tsx">
import React, { FC, useState, useEffect } from 'react';
const App: FC = () => {
	return (
    ...
	);
};

export default App;
</file>

<file name="source/cli.tsx">
#!/usr/bin/env node
import React from 'react';
import App from './app.js';

render(<App />);
</file>
</directory>

// Add this part manually
<task>
Modify the files above and update the version from 0.0.1 to 0.0.2
</task>
```

## Local Development

To start developing aiformat locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/farouqaldori/aiformat.git
   ```

2. Change to the project directory:
   ```bash
   cd aiformat
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Build the project:
   ```bash
   npm run build
   ```

5. Link the package globally:
   ```bash
   npm link
   ```

6. Now you can use the `aiformat` command globally to test your local changes.


## Contributing

If you find any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the [GitHub repository](https://github.com/farouqaldori/aiformat).

## License

This project is licensed under the [MIT License](LICENSE).
