import React from "react";

interface ItemProps {
  name: string;
  url: string;
}

const BookmarkItem = (props: ItemProps) => {
  return (
    <div className="m-2 p-2 h-20 w-24 rounded-lg shadow border dark:border-black bg-white dark:bg-gray-800 flex flex-col  hover:bg-gray-100 dark:hover:bg-gray-900">
      <a href={props.url}>
        <div className="flex-grow flex justify-center content-center">
          <img
            className="mt-2 h-4 w-4"
            alt={`${props.name} icon`}
            src={`http://www.google.com/s2/favicons?domain=${props.url}`}
          />
        </div>
        <p className="mt-3 text-center text-xs">{props.name}</p>
      </a>
    </div>
  );
};

export const Bookmarks = () => {
  return (
    <div className="content-self-start mb-32 w-10/12 md:w-8/12 max-w-screen-md ">
      <div className="flex flex-wrap justify-center">
        <BookmarkItem name="Twitter" url="https://twitter.com" />
        <BookmarkItem name="Reddit" url="https://reddit.com" />
        <BookmarkItem name="YouTube" url="https://youtube.com" />
        <BookmarkItem name="ABC News" url="https://abc.net.au/news" />
        <BookmarkItem name="Learn.UQ" url="https://learn.uq.edu.au" />
        <BookmarkItem name="OzBargain" url="https://ozbargain.com.au" />
        <BookmarkItem name="Netflix" url="https://netflix.com" />
        <BookmarkItem name="Disney+" url="https://disneyplus.com" />
      </div>
    </div>
  );
};
