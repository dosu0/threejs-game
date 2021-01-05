/** The Server ****************************************************************
 * @brief A simple server made with [ExpressJS](https://expressjs.com) using
 * the [Pug](https://pugjs.org) view engine.
 * @author Phoenix
 *****************************************************************************/

/** Imports ******************************************************************/
import chalk from 'chalk';
import express from 'express';
import { bundle } from './funcs';
import pkg from '../package.json';

const app = express();
const port = 3000;
const examples = ['three-cubes', 'primitives'];

app.set('view engine', 'pug');

app.use(express.static('static'));

app.get(['/', '/index'], (_, res) => {
    res.status(200);
    res.render('index', { version: pkg.version, examples: examples });
});

examples.forEach((example, i) => {
    app.get([`/example/${i}`, `/example/${example}`], (_, res) => {
        res.status(200);
        res.render(example, { version: pkg.version });
    });
});

// Error handling
app.use((req, res) => {
    res.status(404);
    res.format({
        html: () => {
            res.render('404', { url: req.url, examples });
        },
        json: () => {
            res.json({ error: 'Not found' });
        },
        default: () => {
            res.type('txt').send('Not found');
        }
    });
});

app.listen(port, () => {
    bundle();
    console.log(
        chalk.bold(
            'Serving',
            chalk.blue(`Game v${pkg.version}`),
            '@', chalk.green(`http://localhost:${port}`)
        )
    );
});
