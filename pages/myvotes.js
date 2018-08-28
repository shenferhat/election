import React, { Component } from "react";
import { Button, List, Segment } from "semantic-ui-react";
import Election from "../ethereum/election";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";

class MyVotes extends Component {
  state = {
    addr: ""
  };
  static async getInitialProps(props) {
    const { address } = props.query;
    return { address };
  }

  async componentDidMount() {
    this.setState({ addr: this.props.address });
    console.log(this.props.address);
    window.addEventListener("load", this.handleLoad);
  }

  handleLoad = async () => {
    const election = Election(this.state.addr);
    const votes = await election.methods.getUserVotes().call();
    console.log(votes);
  }

  renderRows() {
    return <h3>test</h3>;
    // return votes.map((vote, index) => {
    //   return (
    //     <List.Item>
    //       {parseInt(vote / 10)}.{vote % 10}%
    //     </List.Item>
    //   );
    // });
  }

  render() {
    return (
      <Layout>
        <h3>Yaptığın Tahminler:</h3>
        <Segment>
          <List>{this.renderRows()}</List>
        </Segment>
      </Layout>
    );
  }
}

export default MyVotes;
