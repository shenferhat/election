import React, { Component } from "react";
import { Button, List, Segment } from "semantic-ui-react";
import Layout from "../components/Layout";

class Rules extends Component {
  static async getInitialProps() {
    return {};
  }
  render() {
    return (
      <Layout>
        <h3>Yarışma Kuralları?</h3>
        <List>
          <List.Item>
            <Segment>
              <h4>
                - Kullanıcılar 0.01 eth ile herhangi bir aday için tahminde
                bulunabilir.
              </h4>
              <h4>
                - Kullanıcı istediği adaya sınırsız sayıda tahminde bulunabilir.
              </h4>
              <h4>
                - Her aday için biriken ethereum o aday için doğru tahminde
                bulunan kullanıcılar arasında dağıtılacaktır.
              </h4>
              <h4>
                - Yarışmayı kazanmak için yüzdelik dilimde virgülden sonra 1
                basamağa kadar doğru tahmin yapmak gerekiyor.
              </h4>
              <h4>
                - Bir adayın oy yüzdesi 40.1% ise sadeceo aday için 40.1% seçimi
                yapan kullanıcılar kazanır. 40% ve 40.2% tercihi yapanlar
                herhangi bir şey kazanamaz.
              </h4>
              <h4>
                - Eğer kimse doğru sonucu tahmin edemediyse en yakın tahmini yapanlar ödül kazanır.
              </h4>
              <h4>
                - Sonuçlar YSK resmi sonuçları açıkladıktan sonra sisteme
                girilecektir. Açıklanan sonuç virgülden sonra 1 basamaklı olacak
                şekilde yuvarlanarak sisteme girilecektir. Bir adayın oy oranı
                40.10% - 40.15% ise kazananlar 40.1% tahmini yapanlar olacaktır.
                Eğer adayın oyu 40.16% - 40.20 aralığında ise 40.2% tahmini
                yapan kullanıcılar kazanacaktır.
              </h4>
              <h4>
                - Biriken ödül havuzundan 5% komisyon düşüldükten sonra kalan
                ethereum doğru tahmini yapan kullanıcılara eşit olarak
                dağıtılacaktır.
              </h4>
            </Segment>
            <Segment>
              <h4>
                Aynı yüzdelik dilim için birden fazla tahminde bulunarak daha
                fazla ödül kazanma şansı yakalayabilirsiniz.<br/><br/>
                <p>Örneğin;</p>
                <p>Ödül Havuzu: 105 eth</p>
                <p>Adayın Seçim Sonucu: 40.1%</p>
                <p>
                  40.1% tahminini siz ve bir başkası 1'er kere tahmin etmişseniz
                  100/2=50 kişi başı 50 eth kazanmış olursunuz.
                </p>
                <p>
                  Eğer siz 40.1%'i toplam 3 kere tahmin etmişseniz 100/4=25 ve
                  25*3=75. Bu durumda siz toplamda 75 eth diğer kişi ise 25 eth
                  kazanmış olur.
                </p>
              </h4>
            </Segment>
          </List.Item>
        </List>
      </Layout>
    );
  }
}

export default Rules;
