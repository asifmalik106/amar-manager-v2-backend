const AWS = require('aws-sdk');

class DB {
    constructor() {
        // Initialize the dynamoDB DocumentClient
        this.dynamoDB = new AWS.DynamoDB.DocumentClient();
    }

    // Get all data from a table
    async getAllDatabaseData(tableName) {
        const params = {
            TableName: tableName
        };

        try {
            const data = await this.dynamoDB.scan(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Get all data from a specific table (alias for getAllDatabaseData)
    async getAllData(tableName) {
        return await this.getAllDatabaseData(tableName);
    }

    // Get data by ID
    async getDataById(dataId, tableName) {
        const params = {
            TableName: tableName,
            IndexName: 'id-index', // Ensure the table has a GSI on 'id'
            KeyConditionExpression: "#id = :id",
            ExpressionAttributeNames: {
                "#id": "id"
            },
            ExpressionAttributeValues: {
                ":id": dataId
            }
        };

        try {
            const data = await this.dynamoDB.query(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Get data by type
    async getDataByType(dataType, tableName) {
        const params = {
            TableName: tableName,
            IndexName: 'type-index', // Ensure the table has a GSI on 'type'
            KeyConditionExpression: "#type = :type",
            ExpressionAttributeNames: {
                "#type": "type"
            },
            ExpressionAttributeValues: {
                ":type": dataType
            }
        };

        try {
            const data = await this.dynamoDB.query(params).promise();
            return data.Items;
        } catch (error) {
            throw error;
        }
    }

    // Create new data entry
    async create(data, TableName) {
        const params = {
            TableName: TableName,
            Item: data,
            ConditionExpression: 'attribute_not_exists(#attrName)', // Reference a placeholder
            ExpressionAttributeNames: {
                '#attrName': 'categoryName' // Map placeholder to the attribute name
            }
        };

        try {
           let result = await this.dynamoDB.put(params).promise();
           return result;
        } catch (error) {
            throw TableName+" "+error;
        }
    }

    async count(data, tableName, indexName){

        // Query the GSI to check for uniqueness
        const checkParams = {
            TableName: tableName,
            IndexName: indexName, // GSI name
            KeyConditionExpression: '#attr = :data',
            ExpressionAttributeNames: {
              '#attr': data.attribute // Map the attribute name
            },
            ExpressionAttributeValues: {
              ':data': data.value // Map the value
            }
          };
        try {
            let result = await this.dynamoDB.query(checkParams).promise();
            return result.Count;
         } catch (error) {
             throw error;
        }
    }


    // Get All Entities
    async getAllEntities(tableName, entityName) {
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'primary_key = :entityName',
            ExpressionAttributeValues: {
                ':entityName': entityName
            }
        };
    
        try {
        const result = await this.dynamoDB.query(params).promise();
        return result
        }catch (error){
            throw error
        }
    }

    // Get Single Entity By ID
    async getEntityByID(tableName, entityName, entityID) {
        const params = {
            TableName: tableName,
            KeyConditionExpression: 'primary_key = :entityName and sort_key = :entityID',
            ExpressionAttributeValues: {
                ':entityName': entityName,
                ':entityID': entityID
            }
        };
    
        try {
            const result = await this.dynamoDB.query(params).promise();
            return result
        }catch (error){
            throw error
        }
    }

    // Update data by ID
    /*
        updateData = {
            "primary_key": PRIMARY_KEY,
            "sort_key": SORT_KEY,
            "data":[
                {
                    "name": ATTRIBUTE_NAME,
                    "value": ATTRIBUTE_VALUE
                },
                {
                    "name": ATTRIBUTE_NAME,
                    "value": ATTRIBUTE_VALUE
                },
            ]
        }
    */
    async updateEntity(tableName, updateData) {
        let updateExpression = 'SET ';
        let eav;
        updateData.data.forEach(element => {
            updateExpression+= element.name + ' = :'+element.name+', '
            eav[`:${element.name}`] = element.value
        });
        console.log("##########################################################################################################");
        console.log(updateExpression)
        console.log("----------------------------------------------------------------------------------------------------------")
        console.log(eav)
        console.log("##########################################################################################################");
        const params = {
            TableName: tableName,
            Key: {
                primary_key: updateData.primary_key, // Partition Key
                sort_key: updateData.sort_key         // Sort Key (e.g., 'Category#001')
            },
            UpdateExpression: updateExpression,
            ExpressionAttributeValues: eav,
            ReturnValues: 'UPDATED_NEW' // Returns the updated attributes
        };
    
        try {
            const result = await dynamodb.update(params).promise();
            console.log(`Category updated successfully:`, result.Attributes);
            return result.Attributes; // Return updated attributes
        } catch (error) {
            console.error('Error updating category:', error);
            throw error;
        }
    }

    // Update data by date
    async updateDataByDate(tableName, date, newData) {
        if (!date) {
            throw new Error('Data date is required');
        }

        const params = {
            TableName: tableName,
            IndexName: 'date-index', // Ensure the table has a GSI on 'date'
            KeyConditionExpression: "#date = :date",
            ExpressionAttributeNames: {
                "#date": "date"
            },
            ExpressionAttributeValues: {
                ":date": date
            }
        };

        try {
            const data = await this.dynamoDB.query(params).promise();
            if (data.Items.length === 0) {
                throw new Error('Data not found');
            }
            const key = data.Items[0].id; // assuming 'id' is a primary key
            return await this.update(key, newData, tableName);
        } catch (error) {
            throw error;
        }
    }

    // Delete data by ID
    async deleteById(dataId, tableName) {
        if (!dataId) {
            throw new Error('Data ID is required');
        }

        const params = {
            TableName: tableName,
            Key: { id: dataId }  // Assuming 'id' is the primary key
        };

        try {
            await this.dynamoDB.delete(params).promise();
        } catch (error) {
            throw error;
        }
    }

    async countAndIncrement(itemName, tableName) {
        const params = {
          TableName: tableName,
          Key: {
            primary_key: 'metadata',
            sort_key: itemName
          },
          UpdateExpression: 'SET #count = if_not_exists(#count, :start) + :inc',
          ExpressionAttributeNames: {
            '#count': 'count'
          },
          ExpressionAttributeValues: {
            ':start': 0,
            ':inc': 1
          },
          ReturnValues: 'UPDATED_NEW'
        };
      
        try {
          const result = await this.dynamoDB.update(params).promise();
          console.log(`Updated customer count: ${result.Attributes.count}`);
          return result.Attributes.count;
        } catch (error) {
          console.error('Error incrementing customer count:', error);
          throw error;
        }
      }
}

module.exports = DB;
