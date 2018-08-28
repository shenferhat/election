import React from "react";
import {Segment} from "semantic-ui-react";

export default () => {
  // MenuItem and Link Item style conflict
  return (
    <Segment>
        İletişim: <a href="https://twitter.com/orangutmayan" target="_blank">Şen Ferhat</a>
    </Segment>
  );
};
