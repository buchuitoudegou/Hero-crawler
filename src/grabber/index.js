import requestOptions from './RequestConfig.js';
import http from 'http';

export async function getSource(src) {
  const chunks = [];
  requestOptions.path = src;
  return new Promise((resolve, reject) => {
    try {
      http.get(requestOptions, function(res) {
        res.on('data', function(chunk) {
          chunks.push(chunk);
        });
        res.on('end', function() {
          resolve(chunks);
        });
      });
    } catch (error) {
      console.log(error);
      reject();
    }
  });
}


export function foo () {
  eval('var i = 0;');
  console.log(i);
}