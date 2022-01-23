import React from "react";
import RefreshIcon from "@material-ui/icons/Refresh";
import { Button } from "@material-ui/core";

const Refresh = (props) => {
  return (
    <Button
      variant="contained"
      className="refreshIcon"
      onClick={props.handleRefresh}
      color="primary"
    >
      <RefreshIcon />
    </Button>
  );
};

export default Refresh;
