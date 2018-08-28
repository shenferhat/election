import React, { Component } from "react";
import {
  Card,
  Button,
  Segment,
  Icon,
  Image,
  Input,
  Message,
  Modal,
  List
} from "semantic-ui-react";
import Layout from "../components/Layout";
import { Link } from "../routes";
import Election from "../ethereum/election";
import web3 from "../ethereum/web3";
import Web3Tmp from "web3"; // to check if metamask installed.

class ElectionIndex extends Component {
  state = {
    guess0: 0.0,
    guess1: 0.0,
    guess2: 0.0,
    guess3: 0.0,
    errorMessage: "",
    loading: false,
    isModalOpen: false,
    votes: [],
    isModalErrorOpen: false,
    errorMessageModal: ""
  };

  static async getInitialProps() {
    let contracts = new Array();
    contracts.push(
      await ElectionIndex.getContract(
        "0x0db346b8410E52Cc10d291d602fa644E4584E2c8"
      ),
      await ElectionIndex.getContract(
        "0x33869238745f82f818af05ac7989cf0fc238abb7"
      ),
      await ElectionIndex.getContract(
        "0xfc507be1417b5d5eadc9ceaaf276d2ff5b302dab"
      ),
      await ElectionIndex.getContract(
        "0xe3cB567A4332B0Ee70d2138d64DEAbfC6fe69864"
      )
    );
    //console.log(contracts);

    return { contracts };
  }

  static async getContract(addr) {
    const election = Election(addr);
    const summary = await election.methods.getSummary().call();
    let avgVote = 0;
    if (summary[1] != 0) avgVote = summary[0] / summary[1] / 10;
    return {
      address: addr,
      totalVotes: summary[0],
      totalUsers: summary[1],
      balance: summary[2],
      avgVote
    };
  }

  checkMetamask = async () => {
    if (typeof window.web3 == "undefined") {
      this.setState({
        errorMessageModal: this.metamaskNotInstalled(),
        isModalErrorOpen: true
      });
      return;
    }
    // We are in browser and metamask is running
    let web3Tmp = new Web3Tmp(window.web3.currentProvider);
    const accounts = await web3Tmp.eth.getAccounts();
    if (accounts.length == 0) {
      this.setState({
        errorMessageModal: this.metamaskNotActive(),
        isModalErrorOpen: true
      });
      return;
    }
    this.setState({ errorMessageModal: "", isModalErrorOpen: false });
  };

  metamaskNotInstalled = () => {
    return (
      <div>
        <p>Katılmak için Metamask eklentisini kurmanız gerekiyor.</p>
        <p>
          Detaylı anlatım için{" "}
          <a
            href="https://bitcoinlerim.com/adim-adim-metamask-kullanimi-kurulumu/"
            target="_blank"
          >
            buraya
          </a>{" "}
          tıklayın.
        </p>
      </div>
    );
  };

  metamaskNotActive = () => {
    return (
      <div>
        <p>Metamask eklentisi üzerinden hesabınıza giriş yapmanız gerekiyor!</p>
      </div>
    );
  };

  voteRequest = async (addr, guess) => {
    try {
      this.checkMetamask();
      const accounts = await web3.eth.getAccounts();

      if (accounts.length == 0) {
        return;
      }

      const election = Election(addr);
      if (guess <= 0 || guess > 100) {
        this.setState({
          errorMessage: "Sadece 0-100 aralığında tahmin yapabilirsiniz!"
        });
        return;
      }

      guess = guess * 10;
      if (guess % 1 != 0) {
        this.setState({
          errorMessage:
            "Geçerli bir tahmin yapın. Geçerli:40.1 - Geçersiz: 40.12"
        });
        return;
      }

      this.setState({
        loading: true,
        errorMessage:
          "Metamask üzerinden işlemi onaylayın ve bekleyin. Kayıt işlemi bir kaç dakika sürebilir."
      });
      await election.methods.voteRequest(guess).send({
        from: accounts[0],
        value: web3.utils.toWei("0.01", "ether")
      });
      this.setState({ errorMessage: "Tebrikler! Kayıt Alındı." });
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }

    this.setState({ loading: false });
  };

  getVotes = async addr => {
    this.checkMetamask();
    const accounts = await web3.eth.getAccounts();
    if (accounts.length == 0) {
      return;
    }

    const el = Election(addr);
    const votes = await el.methods.getUserVotes().call({ from: accounts[0] });

    this.setState({ votes: votes });
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  closeModalError = () => {
    this.setState({ isModalErrorOpen: false });
  };

  renderRows = () => {
    if (this.state.votes.length == 0) {
      return "Henüz kayıt yok!";
    }

    return this.state.votes.map((vote, index) => {
      return (
        <List.Item>
          {index + 1}- {parseInt(vote / 10)}.{vote % 10}%
        </List.Item>
      );
    });
  };

  render() {
    return (
      <Layout>
        <h3>
          Ethereum Smart Contracts ile Güvenebileceğiniz Seçim Tahmin
          Yarışması
        </h3>
        <div>
          <p>
            Katılmak için Metamask eklentisini kurmanız gerekiyor. Detaylı
            anlatım için{" "}
            <a
              href="https://bitcoinlerim.com/adim-adim-metamask-kullanimi-kurulumu/"
              target="_blank"
            >
              buraya
            </a>{" "}
            tıklayın.
          </p>
        </div>
        <Segment>
          <Message
            className={this.state.errorMessage == "" ? "hidden" : "visible"}
            content={this.state.errorMessage}
          />
          <Card.Group itemsPerRow="4">
            <Card>
              <Image src="/static/meral-aksener.jpg" />
              <Card.Content>
                <Card.Header>Meral Akşener</Card.Header>
                <Card.Description>
                  Ortalama Oy Oranı:{" "}
                  {this.props.contracts[0].avgVote.toFixed(1)}%
                </Card.Description>
                <Card.Description>
                  Katılımcı Sayısı: {this.props.contracts[0].totalUsers}
                </Card.Description>
                <Card.Description>
                  Ödül Havuzu:{" "}
                  {web3.utils.fromWei(this.props.contracts[0].balance, "ether")}
                  <Icon name="ethereum" />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <label>Tahminini Gir:</label>
                <br />
                <Input
                  label="%"
                  labelPosition="right"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={this.state.guess0}
                  onChange={event =>
                    this.setState({ guess0: event.target.value })
                  }
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={() =>
                    this.voteRequest(
                      this.props.contracts[0].address,
                      this.state.guess0
                    )
                  }
                >
                  Tahmin Yap: 0.01
                  <Icon name="ethereum" />
                </Button>
              </Card.Content>

              <Card.Content extra>
                {/* <Link route={`/tahminlerim/${this.props.contracts[0].address}`}>
                  <a >Yaptığım Tahminler</a>
                </Link> */}
                <Button
                  onClick={() => this.getVotes(this.props.contracts[0].address)}
                >
                  Tahminlerim
                </Button>
              </Card.Content>
              <Card.Content extra>
                <a
                  href={`https://etherscan.io/address/${
                    this.props.contracts[0].address
                  }`}
                  target="_blank"
                >
                  Smart Contract
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src="/static/muharrem-ince.jpg" />
              <Card.Content>
                <Card.Header>Muharrem İnce</Card.Header>
                <Card.Description>
                  Ortalama Oy Oranı:{" "}
                  {this.props.contracts[1].avgVote.toFixed(1)}%
                </Card.Description>
                <Card.Description>
                  Katılımcı Sayısı: {this.props.contracts[1].totalUsers}
                </Card.Description>
                <Card.Description>
                  Ödül Havuzu:{" "}
                  {web3.utils.fromWei(this.props.contracts[1].balance, "ether")}
                  <Icon name="ethereum" />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <label>Tahminini Gir:</label>
                <br />
                <Input
                  label="%"
                  labelPosition="right"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={this.state.guess1}
                  onChange={event =>
                    this.setState({ guess1: event.target.value })
                  }
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={() =>
                    this.voteRequest(
                      this.props.contracts[1].address,
                      this.state.guess1
                    )
                  }
                >
                  Tahmin Yap: 0.01
                  <Icon name="ethereum" />
                </Button>
              </Card.Content>

              <Card.Content extra>
                {/* <Link route={`/tahminlerim/${this.props.contracts[0].address}`}>
                  <a >Yaptığım Tahminler</a>
                </Link> */}
                <Button
                  onClick={() => this.getVotes(this.props.contracts[1].address)}
                >
                  Tahminlerim
                </Button>
              </Card.Content>

              <Card.Content extra>
                <a
                  href={`https://etherscan.io/address/${
                    this.props.contracts[1].address
                  }`}
                  target="_blank"
                >
                  Smart Contract
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src="/static/recep-tayyip-erdogan.jpg" />
              <Card.Content>
                <Card.Header>Recep Tayyip Erdoğan</Card.Header>
                <Card.Description>
                  Ortalama Oy Oranı:{" "}
                  {this.props.contracts[2].avgVote.toFixed(1)}%
                </Card.Description>
                <Card.Description>
                  Katılımcı Sayısı: {this.props.contracts[2].totalUsers}
                </Card.Description>
                <Card.Description>
                  Ödül Havuzu:{" "}
                  {web3.utils.fromWei(this.props.contracts[2].balance, "ether")}
                  <Icon name="ethereum" />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <label>Tahminini Gir:</label>
                <br />
                <Input
                  label="%"
                  labelPosition="right"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={this.state.guess2}
                  onChange={event =>
                    this.setState({ guess2: event.target.value })
                  }
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={() =>
                    this.voteRequest(
                      this.props.contracts[2].address,
                      this.state.guess2
                    )
                  }
                >
                  Tahmin Yap: 0.01
                  <Icon name="ethereum" />
                </Button>
              </Card.Content>

              <Card.Content extra>
                {/* <Link route={`/tahminlerim/${this.props.contracts[0].address}`}>
                  <a >Yaptığım Tahminler</a>
                </Link> */}
                <Button
                  onClick={() => this.getVotes(this.props.contracts[2].address)}
                >
                  Tahminlerim
                </Button>
              </Card.Content>
              <Card.Content extra>
                <a
                  href={`https://etherscan.io/address/${
                    this.props.contracts[2].address
                  }`}
                  target="_blank"
                >
                  Smart Contract
                </a>
              </Card.Content>
            </Card>
            <Card>
              <Image src="/static/selahattin-demirtas.jpg" />
              <Card.Content>
                <Card.Header>Selahattin Demirtaş</Card.Header>
                <Card.Description>
                  Ortalama Oy Oranı:{" "}
                  {this.props.contracts[3].avgVote.toFixed(1)}%
                </Card.Description>
                <Card.Description>
                  Katılımcı Sayısı: {this.props.contracts[3].totalUsers}
                </Card.Description>
                <Card.Description>
                  Ödül Havuzu:{" "}
                  {web3.utils.fromWei(this.props.contracts[3].balance, "ether")}
                  <Icon name="ethereum" />
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                <label>Tahminini Gir:</label>
                <br />
                <Input
                  label="%"
                  labelPosition="right"
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={this.state.guess3}
                  onChange={event =>
                    this.setState({ guess3: event.target.value })
                  }
                />
              </Card.Content>
              <Card.Content extra>
                <Button
                  primary
                  loading={this.state.loading}
                  onClick={() =>
                    this.voteRequest(
                      this.props.contracts[3].address,
                      this.state.guess3
                    )
                  }
                >
                  Tahmin Yap: 0.01
                  <Icon name="ethereum" />
                </Button>
              </Card.Content>

              <Card.Content extra>
                {/* <Link route={`/tahminlerim/${this.props.contracts[0].address}`}>
                  <a >Yaptığım Tahminler</a>
                </Link> */}
                <Button
                  onClick={() => this.getVotes(this.props.contracts[3].address)}
                >
                  Tahminlerim
                </Button>
              </Card.Content>
              <Card.Content extra>
                <a
                  href={`https://etherscan.io/address/${
                    this.props.contracts[3].address
                  }`}
                  target="_blank"
                >
                  Smart Contract
                </a>
              </Card.Content>
            </Card>
          </Card.Group>
        </Segment>
        <Modal
          open={this.state.isModalOpen}
          onClose={this.closeModal}
          closeIcon
        >
          <Modal.Header>Tahminlerim</Modal.Header>
          <Modal.Content>
            {" "}
            <List>{this.renderRows()}</List>
          </Modal.Content>
        </Modal>
        <Modal
          open={this.state.isModalErrorOpen}
          onClose={this.closeModalError}
          closeIcon
        >
          <Modal.Header>Uyarı!</Modal.Header>
          <Modal.Content>{this.state.errorMessageModal}</Modal.Content>
        </Modal>
      </Layout>
    );
  }
}

export default ElectionIndex;
