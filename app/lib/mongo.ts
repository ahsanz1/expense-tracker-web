import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MONGODB_URI || "";

export async function withDatabaseOperation(
  operation: (client: MongoClient) => Promise<any>
): Promise<void> {
  let client = null;
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    await client.connect();
    const result = await operation(client);
    return result;
  } catch (error: any) {
    console.error("Database Error: ", error);
  } finally {
    if (client) await client.close();
  }
}
