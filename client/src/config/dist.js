'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dist',
  authServer: 'http://localhost:3000',
  // apiEndpoint: 'https://3rr1yij7g0.execute-api.us-east-1.amazonaws.com/staging/',
  // apiEndpoint: 'https://3rr1yij7g0.execute-api.us-east-1.amazonaws.com/dev/',
  // apiEndpoint: 'https://lu49rv1wa8.execute-api.us-west-2.amazonaws.com/shortcutdev/',
  // apiEndpointBackup: 'https://wanz89yyu8.execute-api.us-east-1.amazonaws.com/shortcutdev/',
  apiEndpoint: 'http://localhost:3000',
  //dataBucket: 'https://d1bojkr1jokyfh.cloudfront.net/'
  dataBucket: 'http://localhost/explainjojo-assets/',
  s3region: 'us-west-2',
  s3bucket: 'shortcut-getting-started',
  analyticsPropertyId: '' // your gAnalytics ID
};

export default Object.freeze(Object.assign({}, baseConfig, config));
