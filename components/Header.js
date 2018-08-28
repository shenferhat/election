import React from "react";
import { Menu, Segment, Input } from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
  // MenuItem and Link Item style conflict
  return (
    <Segment>
      <Menu secondary>
          <a className="item" href="/">Ana Sayfa</a>
        <Link route="/nasil-katilirim">
          <a className="item">Nasıl Katılırım?</a>
        </Link>
        <Link route="/yarisma-kurallari">
          <a className="item">Yarışma Kuralları</a>
        </Link>
        <Menu.Menu position="right">
          <Menu.Item>
            <h3>24 Haziran 2018 Seçim Tahmin Yarışması</h3>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Segment>
  );
};
