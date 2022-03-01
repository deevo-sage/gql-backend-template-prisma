import { Request, Response } from 'express';
import admin from 'firebase-admin';
// firebase admin json
const serviceAccount: any = require('../admin.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
async function GetCurrentUser(req: Request, res: Response) {
  const header = req.headers?.authorization;
  if (
    header !== 'Bearer null' &&
    req.headers?.authorization?.startsWith('Bearer ')
  ) {
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
      return await admin.auth().verifyIdToken(idToken);
    } catch (err) {
      console.log(err);
      return;
    }
  }
}
export default GetCurrentUser;
