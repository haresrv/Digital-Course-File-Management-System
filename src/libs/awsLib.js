import { Storage } from "aws-amplify";
import config from '../config';

export async function s3privateUpload(file) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });

  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type
  });

  console.log(stored)
  
  return stored.key;
}

export async function s3publicUpload(file) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });

  const filename = `${Date.now()}-${file.name}`;

  const stored2 = await Storage.put(filename, file, {
    contentType: file.type
  });
  console.log(stored2)

  return stored2.key;
}


export async function s3getUpload(attachment) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });
  
  var key=Storage.get(attachment)
    .then(function(result) {return (result)})
    .catch(err => console.log(err));
   return (key)

}


export async function s3pgetUpload(attachment) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });
  
  var key=Storage.get(attachment,{level:'private'})
    .then(function(result) {return (result)})
    .catch(err => console.log(err));
   return (key)

}

// 1578665703460-Plan.txt