import express, { json, Request, Response } from 'express';
import { createGroup, deleteGroup, addToGroup, removeFromGroup, editGroup, getGroup, getAllGroups } from './groups';
import { createBucket, deleteBucket, getBucket, getAllBuckets } from './buckets'
import { User } from './interface'
import morgan from 'morgan';
import config from './config.json';
import cors from 'cors';
import YAML from 'yaml';
import sui from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import process from 'process';

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

app.post('/group/create', (req: Request, res: Response) => {
  const { groupName, memberIds }: { groupName: string, memberIds: [User] } = req.body;
  try {
      const groupId = createGroup(groupName, memberIds);
      res.status(201).json({ message: 'Group created', groupId });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.delete('/groups/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
      const updatedGroups = deleteGroup(groupId);
      res.status(200).json({ message: 'Group deleted', updatedGroups });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

app.post('/groups/:groupId/members', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { memberIds }: { memberIds: [User] } = req.body;
  try {
      const updatedMembers = addToGroup(groupId, memberIds);
      res.status(200).json({ message: 'Members added', updatedMembers });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

app.delete('/groups/:groupId/members', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { memberIds }: { memberIds: [User] } = req.body;
  try {
      const updatedMembers = removeFromGroup(groupId, memberIds);
      res.status(200).json({ message: 'Members removed', updatedMembers });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

// edit group name so far - not sure what else we can edit
app.put('/groups/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const { updatedGroupName }: { updatedGroupName: string } = req.body;
  try {
      const updatedGroupNameResponse = editGroup(groupId, updatedGroupName);
      res.status(200).json({ message: 'Group name updated', updatedGroupNameResponse });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

// get one group
app.get('/groups/:groupId', (req: Request, res: Response) => {
  const { groupId } = req.params;
  try {
      const group = getGroup(groupId);
      res.status(200).json(group);
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

// get groups that user is a part of 
app.get('/users/:userId/groups', (req: Request, res: Response) => {
  const { userId } = req.params;
  const groups = getAllGroups(userId);
  res.status(200).json(groups);
});

app.post('/buckets', (req: Request, res: Response) => {
  const { bucketName, groupId }: { bucketName: string, groupId: string } = req.body;
  try {
      const bucketId = createBucket(bucketName, groupId);
      res.status(201).json({ message: 'Bucket created', bucketId });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

app.delete('/buckets/:bucketId', (req: Request, res: Response) => {
  const { bucketId } = req.params;
  try {
      const updatedBuckets = deleteBucket(bucketId);
      res.status(200).json({ message: 'Bucket removed', updatedBuckets });
  } catch (error) {
      res.status(404).json({ error: error.message });
  }
});

app.get('/buckets/:bucketId', (req: Request, res: Response) => {
  const { bucketId } = req.params;
  const bucket = getBucket(bucketId);
  res.status(200).json(bucket);
});

// all buckets for a specific group
app.get('/groups/:groupId/buckets', (req: Request, res: Response) => {
  const { groupId } = req.params;
  const buckets = getAllBuckets(groupId);
  res.status(200).json(buckets);
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
