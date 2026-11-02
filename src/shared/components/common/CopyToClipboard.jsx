import { useState } from "react";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/esm/ContentCopy";

const CopyText = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);

    // Hide tooltip after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <Tooltip title="Copied" open={copied}>
      <IconButton onClick={handleCopy}>
        <ContentCopyIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  )
};

export default CopyText;
