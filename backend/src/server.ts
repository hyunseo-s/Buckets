import express, { json, Request, Response } from 'express';
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import YAML from 'yaml';
import sui from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import process from 'process';
import { createItem, removeItem } from './items'
import { readData, writeData } from './dataStore'
import { login, register } from './auth';


// Set up web app
const app = express();
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware that allows for access from other domains
app.use(cors());
// for logging errors (print to terminal)
app.use(morgan('dev'));
// for producing the docs that define the API
const file = fs.readFileSync(path.join(process.cwd(), 'swagger.yaml'), 'utf8');
app.get('/', (req: Request, res: Response) => res.redirect('/docs'));
app.use('/docs', sui.serve, sui.setup(YAML.parse(file),
  { swaggerOptions: { docExpansion: config.expandDocs ? 'full' : 'list' } }));

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || '127.0.0.1';

// ====================================================================
//  ================= WORK IS DONE BELOW THIS LINE ===================
// ====================================================================

readData();
writeData();

app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    await register(req, res);
  } catch (error) {
    return res.status(400).json(error)
  }
})

app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { token } = await login(req, res) as any;
    localStorage.setItem("jwtToken", token);
  } catch (error) {
    return res.status(400).json(error)
  }
})

app.post('/auth/logout', async (req: Request, res: Response) => {
  try {
    localStorage.removeItem("jwtToken");
  } catch (error) {
    res.status(400).json(error);
  }
})

app.post('/item/add', (req: Request, res: Response) => {
  try {
    // GETE ID

    const { name, desc, uri, image, bucketId } = req.body;
    const result = createItem(id, name, desc, uri, image, bucketId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({error: error.message })
  }
});

app.post('/item/remove', (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const result = removeItem(itemId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({error: error.message })
  }
});

writeData();

// ====================================================================
//  ================= WORK IS DONE ABOVE THIS LINE ===================
// ====================================================================

app.use((req: Request, res: Response) => {
  const error = `
    Route not found - This could be because:
      0. You have defined routes below (not above) this middleware in server.ts
      1. You have not implemented the route ${req.method} ${req.path}
      2. There is a typo in either your test or server, e.g. /posts/list in one
         and, incorrectly, /post/list in the other
      3. You are using ts-node (instead of ts-node-dev) to start your server and
         have forgotten to manually restart to load the new changes
      4. You've forgotten a leading slash (/), e.g. you have posts/list instead
         of /posts/list in your server.ts or test file
  `;
  res.status(404).json({ error });
});

// start server
const server = app.listen(PORT, HOST, () => {
  // DO NOT CHANGE THIS LINE
  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
function jwtDecode(arg0: string) {
  throw new Error('Function not implemented.');
}

