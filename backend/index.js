console.log('Loading the file');

exports.handler = async (event, context, callback) => {
    console.log('Received event:', JSON.stringify(event, null, 2));
    if (event.fileExt === undefined) {
        callback("400 Invalid Input");
    }
    
    let returnData = "";
    const S3 = require('aws-sdk/clients/s3');
    const s3 = new S3();
    const readXlsxFile = require('read-excel-file/node');

    switch(event.fileExt)
    {
        case "plain":
        case "txt":
            // Extract text
            const params = {Bucket: 'filestation', Key: 'MyTXT.'+event.fileExt};
            
            try {
                await s3.getObject(params, function(err, data) {
                  if (err) console.log(err, err.stack); // an error occurred
                  else{           // successful response
                      returnData = data.Body.toString('utf-8');
                      context.done(null, returnData);
                  }
                }).promise();
        
            } catch (error) {
                console.log(error);
                return;
            }  
           
            break;
        case "xls":
        case "xlsx":
            returnData = "Excel";
            // Extract text
            break;
        case "docx":
            returnData = "Word doc";
            // Extract text
            break;
        default:
            callback("400 Invalid Operator");
            break;
    }
    callback(null, returnData);
};