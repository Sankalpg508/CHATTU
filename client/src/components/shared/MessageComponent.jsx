import { Box, Typography } from "@mui/material";
import React, { memo } from "react";
import { lightblue } from "../../constants/color";
import moment from "moment";
import { fileFormat } from "../../lib/features";
import RenderAttachment from "./RenderAttachment";

const MessageComponent = ({ message, user }) => {
  const { sender, content, attachment = [], createdAt } = message;
  const sameSender = sender?._id === user?._id;
  const timeAgo = moment(createdAt).format("MMMM Do YYYY, h:mm A");

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        backgroundColor: sameSender ? "#d4f8c6" : "#ffffff",
        padding: "10px",
        borderRadius: "5px",
        margin: "1px 0",
        maxWidth: "60%",
      }}
    >
      {!sameSender && (
        <Typography
          color={lightblue}
          fontWeight={"600"}
          variant="caption"
          fontSize={"0.9rem"}
          marginBottom={"1px"}
          lineHeight={"1"}
        >
          {sender.name}
        </Typography>
      )}

      <p style={{
        margin: "0",
      }}>{content}</p>

      {attachment.length > 0 &&
        attachment.map((data, index) => {
          const url = data.url;
          const file = fileFormat(url);
          return (
            <Box key={index} mt={1}>
              <a href={url} target="_blank" rel="noopener noreferrer" download>
                <RenderAttachment file={file} url={url} />
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color="text.secondary">
        {timeAgo}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
