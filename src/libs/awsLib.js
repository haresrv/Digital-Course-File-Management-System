import { Storage } from "aws-amplify";
import config from '../config';


export async function publicUpload(file,prefix) {
const customPrefix = {
    public: prefix
};

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });

  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.put(filename, file, {
    contentType: file.type,
    customPrefix: customPrefix,
  });

  console.log(stored)
  
  return stored.key;
}



export async function privateUpload(file,prefix) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    }
  });

    const customPrefix = {
        private: prefix
    };

  const filename = `${Date.now()}-${file.name}`;
  const stored = await Storage.vault.put(filename, file, {
    contentType: file.type,
    customPrefix: customPrefix,
  });

  console.log(stored)
  
  return stored.key;
}

export async function s3getUpload(attachment,prefix) {
  
  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    },
     customPrefix:{public:prefix}
  });
  
    const customPrefix = {
        public: prefix
    };

  var key=Storage.get(attachment)
    .then(function(result) {return (result)})
    .catch(err => console.log(err));
   return (key)

}


export async function s3pgetUpload(attachment,prefix) {

  Storage.configure({
    AWSS3: {
        bucket: config.s3.BUCKET,//Your bucket name;
        region: config.s3.REGION,//Specify the region your bucket was created in;
    },
     customPrefix:{private:prefix}
  });
  
    const customPrefix = {
        private: prefix
    };


  var key=Storage.get(attachment,{level:'private'})
    .then(function(result) {return (result)})
    .catch(err => console.log(err));
   return (key)
}

// 1578665703460-Plan.txt