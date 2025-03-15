import express, { json, Request, Response } from 'express';
import { createGroup, deleteGroup, addToGroup, removeFromGroup, editGroup, getGroup, getAllGroups } from './types/groups';
import { createBucket, deleteBucket, getBucket, getAllBuckets, getBucketItems } from './types/buckets'
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import YAML from 'yaml';
import sui from 'swagger-ui-express';
import fs, { write } from 'fs';
import path from 'path';
import process from 'process';
import { clear, readData, writeData } from './types/dataStore'
import { getAllUsers, login, register } from './types/auth';
import { createItem, editItem, removeItem, toggleActiveItem, upvoteItem } from './types/items';
import { decodeJWT } from './utilis';
import { google } from "googleapis";
import { getCal } from './calendar/script';
import { OAuth2Client } from 'google-auth-library';
import { Token } from './interface';
// import open from "open";
// import { DateTime, Interval } from "luxon"; // Import Luxon for timezone handling

// Google Cal API
// const calendar = google.calendar("v3");

const SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];
const TOKEN_PATH = "token.json";

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

// ====================================================================
//  =============================== AUTH ==============================
// ====================================================================

app.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const newToken = await register(req, res);
    res.status(201).json(newToken);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData();
  }
})

app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    // Check if the token is still valid:
    const existingToken = localStorage.getItem("token");
    decodeJWT(existingToken)
    const { token } = await login(req, res) as any;

  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData();
  }
})

app.post('/auth/logout', async (req: Request, res: Response) => {
  try {
    
  } catch (error) {
    res.status(400).json({ error: error.message });
  } finally {
    writeData()
  }
})

// ====================================================================
//  ================= GROUP ===================
// ====================================================================

app.post('/group/create', (req: Request, res: Response) => {
	const { groupName, memberIds }: { groupName: string, memberIds: string[] } = req.body;
	const token = req.header('Authorization').split(" ")[1];
  const id = decodeJWT(token);
  try {
    const groupId = createGroup(groupName, [...memberIds, id]);
    res.status(201).json({ message: 'Group created', groupId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    writeData()
  }
});

app.delete('/group/:groupId', (req: Request, res: Response) => {
  try {
    const groupId = req.params.groupId as string;
    const updatedGroups = deleteGroup(groupId);
    res.status(200).json({ message: 'Group deleted', updatedGroups });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData()
  }
});

app.post('/group/:groupId/members', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { memberIds }: { memberIds: string[] } = req.body;
  try {
    const updatedMembers = addToGroup(groupId, memberIds);
    res.status(200).json({ message: 'Members added', updatedMembers });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData()
  }
});

app.delete('/group/:groupId/members', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { memberIds }: { memberIds: string[] } = req.body;
  try {
    const updatedMembers = removeFromGroup(groupId, memberIds);
    res.status(200).json({ message: 'Members removed', updatedMembers });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData()
  }
});

// edit group name so far - not sure what else we can edit
app.put('/group/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { updatedGroupName }: { updatedGroupName: string } = req.body;
  try {
    const updatedGroupNameResponse = editGroup(groupId, updatedGroupName);
    res.status(200).json({ message: 'Group name updated', updatedGroupNameResponse });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData();
  }
});

// get one group
app.get('/group/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
    const group = getGroup(groupId);
    res.status(200).json(group);
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData();
  }
});

// get groups that user is a part of 
app.get('/users/groups', (req: Request, res: Response) => {
  const existingToken = localStorage.getItem("token");
  const id = decodeJWT(existingToken)

  const groups = getAllGroups(id);
  res.status(200).json(groups);
});

app.get('/users/all', (req: Request, res: Response) => {
  const users = getAllUsers();
  res.status(200).json(users);
});

// get the user id
app.get('/users/me', (req: Request, res: Response) => {
  const token = req.header('Authorization').split(" ")[1];
  const id = decodeJWT(token);

  res.status(200).json(id);
});


// ====================================================================
//  ================= BUCKETS ===================
// ====================================================================

app.post('/buckets', (req: Request, res: Response) => {
  const { bucketName, groupId }: { bucketName: string, groupId: string } = req.body;
  try {
      const bucketId = createBucket(bucketName, groupId);
      res.status(201).json({ message: 'Bucket created', bucketId });
  } catch (error) {
      res.status(500).json({ error: error.message });
  } finally {
    writeData();
  }
});

app.delete('/buckets/:bucketId', (req: Request, res: Response) => {
  const { bucketId } = req.params;
  try {
    const updatedBuckets = deleteBucket(bucketId);
    res.status(200).json({ message: 'Bucket removed', updatedBuckets });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData();
  }
});

app.get('/buckets/:bucketId', (req: Request, res: Response) => {
  const { bucketId } = req.params;
  const bucket = getBucket(bucketId);
  res.status(200).json(bucket);
});

app.get('/buckets/:bucketId/items', (req: Request, res: Response) => {
  const { bucketId } = req.params;
  try {
    const allItems = getBucketItems(bucketId);
    res.status(200).json({ items: allItems });
  } catch (error) {
    res.status(404).json({ error: error.message });
  } finally {
    writeData();
  }
});

// all buckets for a specific group
app.get('/groups/:groupId/buckets', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const buckets = getAllBuckets(groupId);
  res.status(200).json(buckets);
});


// ====================================================================
//  ================= ITEMS ===================
// ====================================================================

app.post('/item/add', (req: Request, res: Response) => {
  try {
    const existingToken = localStorage.getItem("token");
    const id = decodeJWT(existingToken)
    const params = req.body;
    params.addedBy = id;

    const result = createItem(params)
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData();
  }
});

app.post('/item/remove', (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const result = removeItem(itemId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({error: error.message })
  } finally {
    writeData()
  }
});

app.put('/item/edit', (req: Request, res: Response) => {
  try {
    const params = req.body;
    const result = editItem(params);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData()
  }
});

app.put('/item/toggleLike', (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const result = upvoteItem(itemId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData()
  }
});

app.put('/item/toggleActive', (req: Request, res: Response) => {
  try {
    const { itemId } = req.body;
    const result = toggleActiveItem(itemId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message })
  } finally {
    writeData()
  }
});

app.get('/user/cal', (req: Request, res: Response) => {
  const credentials = JSON.parse(fs.readFileSync(path.join(process.cwd(), "/src/calendar/credentials.json"), "utf8"));
  const { client_id, client_secret, redirect_uris } = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  
  getCal(oAuth2Client)
});

export function getNewToken(oAuth2Client: OAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPES,
    });

    console.log("Authorize this app by visiting this URL:", authUrl);
    open(authUrl);

    app.get("/", async (req: Request, res: Response) => {
        const code = req.query.code;
        try {
            const { tokens } : Token = oAuth2Client.getToken(code as string);
            oAuth2Client.setCredentials(tokens);
            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
            res.send("Authentication successful! You can close this tab.");
            getFreeTime(oAuth2Client);
        } catch (error) {
            console.error("Error retrieving access token", error);
            res.send("Authentication failed. Check console for details.");
        }
    });
}


app.delete('/clear', (req: Request, res: Response) => {
  try {
    const result = clear();
    return res.status(200).json(result);
  } finally {
    writeData()
  }
});


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
  readData();

  console.log(`⚡️ Server started on port ${PORT} at ${HOST}`);
});

// For coverage, handle Ctrl+C gracefully
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Shutting down server gracefully.');
    process.exit();
  });
});
function getFreeTime(oAuth2Client: OAuth2Client) {
  throw new Error('Function not implemented.');
}

