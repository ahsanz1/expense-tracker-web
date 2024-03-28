import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function withDatabaseOperation(
  operation: (client: MongoClient) => Promise<any>
): Promise<void> {
  try {
    await client.connect();
    const result = await operation(client);
    return result;
  } catch (error: any) {
    console.error("Database Error: ", error);
  } finally {
    await client.close();
  }
}
