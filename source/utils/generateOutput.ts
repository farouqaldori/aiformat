import fs from 'fs';

interface FileOrFolder {
    id: string;
    name: string;
    isDirectory: boolean;
    children: FileOrFolder[];
    path: string;
    isExpanded: boolean;
    level: number;
}

const cleanupFileTree = (fileTree: FileOrFolder[]): FileOrFolder[] => {
    const idSet = new Set<string>();

    function traverse(node: FileOrFolder) {
        if (idSet.has(node.id)) {
            return null;
        }
        idSet.add(node.id);

        if (node.isDirectory) {
            node.children = node.children.map(traverse).filter(Boolean) as FileOrFolder[];
        }

        return node;
    }

    return fileTree.map(traverse).filter(Boolean) as FileOrFolder[];
};

export const outputXml = (fileTree: FileOrFolder[]): {
    content: string;
    fileCount: number;
} => {
    const cleanedFileTree = cleanupFileTree(fileTree);

    function generateXml(node: FileOrFolder, parentPath: string = ''): string {
        const currentPath = parentPath ? `${parentPath}/${node.name}` : node.name;

        if (node.isDirectory) {
            const childXml = node.children.map(child => generateXml(child, currentPath)).join('\n');
            return `<folder name="${currentPath}">\n${childXml}\n</folder>`;
        } else {
            const fileContent = fs.readFileSync(node.path, 'utf8');
            return `<file name="${currentPath}">\n${fileContent}\n</file>`;
        }
    }

    return {
        content: cleanedFileTree.map(node => generateXml(node)).join('\n\n'),
        fileCount: cleanedFileTree.filter(node => !node.isDirectory).length,
    };
};