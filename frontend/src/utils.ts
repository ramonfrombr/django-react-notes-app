import React from "react";

const renderHTML = (rawHTML: string) =>
  React.createElement("span", {
    dangerouslySetInnerHTML: { __html: rawHTML },
  });

export { renderHTML };
