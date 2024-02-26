import fs from 'node:fs'
import path from 'node:path'

/**
 * Renames the specified extension to a new file extension
 * @param {string} dir directory to walk
 * @param {string} oldExt Old file extension
 * @param {string} newExt New file extension
 */
export function renameTargetExtenstion(dir, oldExt, newExt){
    walkDir(dir, oldExt, newExt);
}

/**
 * Function to recursively walk through directory
 * @param {string} dir directory to walk
 * @param {string} oldExt Old file extension
 * @param {string} newExt New file extension
 */
function walkDir(dir, oldExt, newExt){
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${dir}: ${err}`);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);

            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(`Error stating file ${filePath}: ${err}`);
                    return;
                }

                if (stats.isDirectory()) {
                    walkDir(filePath, oldExt, newExt); // Recurse into subdirectory
                } else if (path.extname(filePath) === oldExt) {
                    const newFilePath = path.join(dir, file.replace(oldExt, newExt)); // Change the extension here
                    
                    fs.rename(filePath, newFilePath, err => {
                        if (err) {
                            console.error(`Error renaming file ${filePath}: ${err}`);
                        } else {
                            console.log(`Renamed ${filePath} to ${newFilePath}`);
                        }
                    });
                }
            });
        });
    });
}
