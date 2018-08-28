import React, { Component } from "react";
import { Button, List, Segment, Image } from "semantic-ui-react";
import Layout from "../components/Layout";

class HowTo extends Component {
  static async getInitialProps() {
    return {};
  }
  render() {
    return (
      <Layout>
        <h3>Nasıl Katılırım?</h3>
        <List>
          <List.Item>
            <Segment>
              <h4>
                Yarışmaya katılmak için Metamask eklentisini yüklemeniz
                gerekiyor.<br /> Detaylı anlatım için{" "}
                <a
                  href="https://bitcoinlerim.com/adim-adim-metamask-kullanimi-kurulumu/"
                  target="_blank"
                >
                  buraya
                </a>{" "}
                tıklayınız.
              </h4>
              <h4 />
              <p>
                <a href="https://metamask.io/" target="_blank">
                  <Button color="orange">Yükle</Button>
                </a>
              </p>
            </Segment>
          </List.Item>
          <List.Item>
            <Segment>
              <h4>
                Metamask üzerinden ethereum cüzdanı oluşturduktan sonra bu
                cüzdana ethereum gönderebilirsiniz.
              </h4>
              <h4>
                <a href="https://www.btcturk.com" target="_blank">
                  BtcTurk
                </a> üzerinden ethereum satın alıp Metamask cüzdanınıza
                gönderebilirsiniz.
              </h4>
            </Segment>
          </List.Item>
          <List.Item>
            <Segment>
              <h4>
                Daha sonra Ana Sayfa'dan tahmininizi yazıp 'Tahmin Yap' butonuna
                tıklayabilirsiniz. Metamask ekranında çıkan 'ONAYLA' veya
                'SUBMIT' butonuna basın ve bekleyin, katılım işlemi bir kaç
                dakika sürebilir.<br /> Katılım ücreti 0.01 eth<br/><br/>
                Örnek:<br/>
                <Image src="/static/ornek.jpg" />
              </h4>
            </Segment>
          </List.Item>
        </List>
      </Layout>
    );
  }
}

export default HowTo;
