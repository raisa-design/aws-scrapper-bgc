import {ScanCommand} from "@aws-sdk/client-dynamodb";
import {client} from "./services/connection";

const TABLE_NAME = process.env.DYNAMODB_TABLE;

const handler = async (event) => {

    try {
        const params = {
            TableName: TABLE_NAME
        };

        const command = new ScanCommand(params);
        const dbResponse = await client.send(command);  

        if(dbResponse.Items){
            const response = dbResponse.Items.reverse().map(item => {
                return {
                    id: item.id.N,
                    title: item.title.S,
                    price: item.price_format.S,
                    createdAt: item.created_at.S
                }                
            });

            return {
                statusCode: 200,
                body: JSON.stringify(
                    [...response]
                ),
            }
        }
        
        return {
            statusCode: 404,
            body: JSON.stringify({                
                message: 'Empty bestsellers data'
            }),
        }
    }catch(err){
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: err.message
            }),
        }
    }
}

export {handler};