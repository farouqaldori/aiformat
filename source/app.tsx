import React, { FC, useState, useEffect } from 'react';
import { Box, Text, useInput } from 'ink';
import fs from 'fs';
import path from 'path';
import clipboard from 'clipboardy';
import chalk from 'chalk';
import figures from 'figures';

const App: FC = () => {
	const [items, setItems] = useState<string[]>([]);
	const [globalInput, setGlobalInput] = useState<string>("");
	const [selectedItems, setSelectedItems] = useState<number[]>([]);
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [excludedFolders] = useState<string[]>(['node_modules', '.git']);

	useEffect(() => {
		const currentDir = process.cwd();
		const allItems = fs.readdirSync(currentDir);
		const sortedItems = allItems.sort((a, b) => {
			const aIsDir = fs.statSync(path.join(currentDir, a)).isDirectory();
			const bIsDir = fs.statSync(path.join(currentDir, b)).isDirectory();
			if (aIsDir && !bIsDir) return -1;
			if (!aIsDir && bIsDir) return 1;
			return a.localeCompare(b);
		});
		setItems(sortedItems.filter((item) => !excludedFolders.includes(item)).filter((item) => item.includes(globalInput)))
	}, [globalInput]);

	useInput((input, key) => {
		if (key.delete || key.backspace) {
			setGlobalInput((prevInput) => prevInput.slice(0, -1));
		} else {
			if (input.length < 50 && !key.return && !key.upArrow && !key.downArrow && !key.leftArrow && !key.rightArrow) {
				setGlobalInput((prevInput) => prevInput + input);
			}
		}

		if (key.return) {
			const output = getFilesAndFolders(selectedItems);
			clipboard.writeSync(output);
			process.exit();
		}
		if (key.upArrow) {
			setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : items.length - 1));
		}
		if (key.downArrow) {
			setCurrentIndex((prevIndex) => (prevIndex < items.length - 1 ? prevIndex + 1 : 0));
		}
		if (key.leftArrow || key.rightArrow) {
			toggleSelection(currentIndex);
		}
	});

	const toggleSelection = (index: number) => {
		const selectedIndex = selectedItems.indexOf(index);
		if (selectedIndex > -1) {
			setSelectedItems(selectedItems.filter((i) => i !== index));
		} else {
			setSelectedItems([...selectedItems, index]);
		}
	};

	const getFilesAndFolders = (selectedItems: number[]) => {
		const outputItems: string[] = [];
		for (const index of selectedItems) {
			const item = items[index];
			if (item) {
				const itemPath = path.join(process.cwd(), item);
				if (fs.statSync(itemPath).isDirectory()) {
					outputItems.push(`<directory name="${item}">\n`);
					const files = getFilesInDirectory(itemPath);
					outputItems.push(...files);
					outputItems.push(`</directory>\n`);
				} else {
					const content = fs.readFileSync(itemPath, 'utf8');
					outputItems.push(`<file name="${item}">\n${content}\n</file>\n`);
				}
			}
		}
		return outputItems.join('\n');
	};

	const getFilesInDirectory = (dirPath: string) => {
		const files: string[] = [];
		const dirItems = fs.readdirSync(dirPath);
		for (const item of dirItems) {
			const itemPath = path.join(dirPath, item);
			if (fs.statSync(itemPath).isDirectory()) {
				const nestedFiles = getFilesInDirectory(itemPath);
				files.push(...nestedFiles);
			} else {
				const content = fs.readFileSync(itemPath, 'utf8');
				files.push(`<file name="${itemPath}">\n${content}\n</file>\n`);
			}
		}
		return files;
	};

	return (
		<Box flexDirection="column" marginTop={2} marginBottom={2}>
			<Box flexDirection="column" marginBottom={1}>
				<Text>Select files and folders to include.</Text>
				<Text>Search query: {globalInput ? <Text color="cyan">{globalInput}</Text> : <Text color="gray" italic>None</Text>}</Text>
			</Box>
			<Box marginBottom={1} flexDirection="column">
				{items.map((item, index) => (
					<Text key={item} color={index === currentIndex ? 'cyan' : undefined}>
						{selectedItems.includes(index) ? chalk.cyan(`[${figures.tick}]`) : `[ ]`} {item}
					</Text>
				))}
				{items.length === 0 && <Text color="gray" italic>No directories/files matching search.</Text>}
			</Box>
			<Box>
				<Text>Use arrow keys to navigate, left/right to select, and Enter to proceed</Text>
			</Box>
		</Box>
	);
};

export default App;