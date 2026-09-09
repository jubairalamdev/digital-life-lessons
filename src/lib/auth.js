import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const mongoUri = process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(mongoUri);
const db = client.db("digital-life-lessons");

export const auth = betterAuth({
  user: {
       additionalFields: {
          role: {
            defaultValue: "user",
            input: false,
            },
          plan: {
            defaultValue:"free",
            input: false,
          }
        }
    },
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
  socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, 
        }, 
    },

});