// import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

class App extends Component {
  eventSource;
  state = {
      data: []
  };

  componentDidMount() {
      this.eventSource = new EventSource(`https://stream.wikimedia.org/v2/stream/page-create`);
      this.eventSource.onmessage = e => {
      const result = JSON.parse(e.data);
      this.setState({
                    data: [result, ...this.state.data]
                });
    };
  }

  componentWillUnmount() {
    if(this.eventSource)
    this.eventSource.close();
  }

  render() {
      const { data } = this.state;
      const result = data.map((entry, index) => {
          return <li key={index}><a href={entry.meta.uri} target="_blank">{entry.page_title}</a></li>;
      });
      return <div className="container"><ul>{result}</ul></div>;
  }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
//}

export default App;
