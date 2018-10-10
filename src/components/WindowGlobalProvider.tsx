import * as React from 'react';

import { Provider } from '../WindowGlobalContext';

interface WindowGlobal {
  src: string;
  name: string;
}

interface Props {
  windowGlobals: { [name: string]: WindowGlobal };
  children: React.ReactNode;
}

interface State {
  [name: string]: any;
}

export class WindowGlobalProvider extends React.PureComponent<Props, State> {
  state = {};

  onWindowGlobalLoaded = (stateName: string, name: string) => () => {
    this.setState({ [stateName]: window[name] });
  };

  loadWindowGlobal = (stateName: string, { src, name }: WindowGlobal) => {
    if (!this.state[name]) {
      const el = document.createElement('script');
      el.async = true;
      el.defer = true;
      el.type = 'text/javascript';
      el.src = src;
      el.onload = this.onWindowGlobalLoaded(stateName, name);
      document.getElementsByTagName('body')[0].appendChild(el);
    }
  };

  componentDidMount() {
    const { windowGlobals } = this.props;
    for (const stateName in windowGlobals) {
      this.loadWindowGlobal(stateName, windowGlobals[stateName]);
    }
  }

  render() {
    return (
      <Provider value={this.state}>
        {React.Children.only(this.props.children)}
      </Provider>
    );
  }
}
