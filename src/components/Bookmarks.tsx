import React from "react";
import { Box, Button, Image } from "@chakra-ui/react";

interface ItemProps {
  name: string;
  url: string;
}

const BookmarkItem = (props: ItemProps) => {
  const url = new URL(props.url);

  const buttonClick = () => {
    window.location.href = url.toString();
  };

  return (
    <Button onClick={buttonClick}>
      <Image
        boxSize={4}
        src={`http://icons.duckduckgo.com/ip2/${url.host}.ico`}
        alt={`${props.name} icon`}
      />
      {props.name}
    </Button>
  );
};

export const Bookmarks = () => {
  const items = [
    { name: "Twitter", url: "https://twitter.com" },
    { name: "Reddit", url: "https://reddit.com" },
    { name: "YouTube", url: "https://youtube.com" },
    { name: "ABC News", url: "https://abc.net.au/news" },
    { name: "Learn.UQ", url: "https://learn.uq.edu.au" },
    { name: "OzBargain", url: "https://ozbargain.com.au" },
    { name: "Netflix", url: "https://netflix.com" },
    { name: "Disney+", url: "https://disneyplus.com" },
  ];

  return (
    <Box>
      {items.map((item) => (
        <BookmarkItem key={item.name} {...item} />
      ))}
    </Box>
  );
};
