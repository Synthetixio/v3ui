#!/usr/bin/env yarn ts-node

import { doAllPriceUpdates } from '../cypress/tasks/doAllPriceUpdates';
const [privateKey] = process.argv.slice(2);
doAllPriceUpdates({ privateKey }).then((data) => console.log(JSON.stringify(data, null, 2)));
