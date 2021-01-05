import browserify from 'browserify';
import fs from 'fs';
import path from 'path';

/**
 * @brief Bundle the typescript inside the 'game' directory into one file.
 */
export function bundle(): void {
    const srcDir = fs.readdirSync(path.join('game', 'src'));

    const srcs = new Array<string>();

    srcDir.forEach((fileName) => {
        if (fileName.includes('.ts')) {
            srcs.push(path.join('game', 'src', fileName));
        }
    });

    browserify()
        .add(srcs)
        .plugin('tsify', { project: 'game' })
        .bundle()
        .on('error', (err: Error) => console.error(err.toString()))
        .pipe(fs.createWriteStream(path.join('static', 'js', 'game.js')));
}