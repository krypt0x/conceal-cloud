import React from 'react';


class Height extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      blockchainHeight: 0,
      updateInterval: 10,  // in seconds
    };

    this.fetchHeight = this.fetchHeight.bind(this);
  }

  componentWillMount() {
    this.fetchHeight();
  }

  componentDidMount() {
    this.fetchHeightInterval = setInterval(this.fetchHeight, this.state.updateInterval * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.fetchHeightInterval);
  }

  fetchHeight() {
    fetch('https://explorer.conceal.network/q/height/')
      .then(r => r.text())
      .then(blockchainHeight => this.setState({ blockchainHeight }))
      .catch(err => console.error(err));
  }

  render() {
    const { blockchainHeight } = this.state;

    return (
      <div className="dash-content">
        <label className="tx-primary">CURRENT HEIGHT</label>
        <h2>{blockchainHeight.toLocaleString()}</h2>
      </div>
    );
  }
}

export default Height;
