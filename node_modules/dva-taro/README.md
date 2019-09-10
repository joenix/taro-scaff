# dva-taro
在taro中使用dva

## 使用
```
import Taro, { Component } from '@tarojs/taro';
import createStore from 'dva-taro';
import models from './models';

const store = createStore({
  initialState: {},
  models: models,
  onError(err) {
    err.preventDefault();
    console.error(err.message);
  },
});

class App extends Component {

  ...

  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
```
## LICENSE

MIT
