
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({ region: "us-east-1", credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID as string,
    secretAccessKey: process.env.SECRET_ACCESS_KEY  as string
}});

export {client}