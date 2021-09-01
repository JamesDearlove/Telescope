import React from "react";
import { Button } from "./common/Button";

interface ItemProps {
  name: string;
  url: string;
}

const BookmarkItem = (props: ItemProps) => {
  const url = new URL(props.url);

  return (
    <a className="m-2" href={props.url}>
      <Button addClasses="p-2 h-20 w-24 flex flex-col">
        <div className="flex-grow flex justify-center content-center">
          <img
            className="mt-2 h-5 w-5"
            alt={`${props.name} icon`}
            src={`http://icons.duckduckgo.com/ip2/${url.host}.ico`}
          />
        </div>
        <p className="mb-2 text-center text-xs">{props.name}</p>
      </Button>
    </a>
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
    <div className="content-self-start w-10/12 md:w-8/12 max-w-screen-md mx-auto">
      <div className="flex flex-wrap justify-center">
        {items.map((item) => (
          <BookmarkItem key={item.name} {...item} />
        ))}
      </div>
    </div>
  );
};
