import 'core-js/stable';
import 'regenerator-runtime/runtime';

import ReactDOM from 'react-dom';

import {
  APP_INIT_ERROR, APP_READY,
  ErrorPage,
  initialize, mergeConfig, subscribe,
} from '@openedx/frontend-base';

import configuration from './config';
import messages from './i18n';
import MainApp from './MainApp';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <MainApp />,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  handlers: {
    config: () => {
      mergeConfig(configuration);
    },
  },
  messages,
});
