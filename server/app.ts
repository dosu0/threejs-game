import chalk from 'chalk';
import express from 'express';
import { bundle } from './funcs';
import pkg from '../package.json';

const app = express();
const port = 3000;
app.set('view engine', 'pug');

app.use(express.static('static'));

app.get('/', (_, res) => {
    res.status(200);
    res.render('index', { version: pkg.version });
});


app.listen(port, () => {
    bundle();
    console.log(
        chalk.bold(
            `Game ${chalk.blue(`v${pkg.version}`)
            } listening at ${chalk.green(`http://localhost:${port}`)
            }`),
    );
});
