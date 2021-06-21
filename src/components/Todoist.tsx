import React, { useEffect, useState } from "react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.todoist.com/rest/v1/",
});

interface TodoistItem {
  id: number;
  project_id: number;
  section_id: number;
  content: string;
  description: string;
  completed: boolean;
  label_ids: number[];
  parent_id: number;
  order: number;
  priority: 1 | 2 | 3 | 4 | undefined;
  due: TodoistDue;
  url: string;
  comment_count: number;
  assignee: number;
  assigner: number;
}

interface TodoistDue {
  string: string;
  date: string;
  recurring: boolean;
  datetime?: string;
  timezone?: string;
}

const TodoItem = (item: TodoistItem) => {
  const [open, setOpen] = useState(false);

  const backgroundColour = open
    ? "bg-black bg-opacity-50"
    : "hover:bg-black hover:bg-opacity-50";

  return (
    <li className={backgroundColour}>
      <div
        className="px-4 py-2 w-100 rounded-lg flex justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <span className="text-base">{item.content}</span>
          <span className="text-sm">{item.project_id}</span>
        </div>
        <div className="">
          <span className="text-base">{item.due.string}</span>
        </div>
      </div>
      <div className={open ? "flex justify-between px-4 pb-3 " : "hidden"}>
        <span>Complete</span>
        <span>Tomorrow</span>
        <a href={item.url}>Open in Todoist</a>
      </div>
    </li>
  );
};

export const TodoItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<TodoistItem[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem("TodoistKey") || "");
    setFilter(
      localStorage.getItem("TodoistFilter") ||
        "(today | overdue) & !assigned to: others"
    );
  }, []);

  useEffect(() => {
    const syncTodoist = async () => {
      const result = await axiosInstance.get("tasks", {
        params: { filter: filter },
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      setItems(result.data);
      setLoading(false);
    };

    if (apiKey !== "") {
      syncTodoist();
    }
  }, [apiKey, filter]);

  return (
    <div className="mx-auto w-96 h-full overflow-auto rounded-lg w-72 bg-black bg-opacity-70">
      <h1 className="text-xl p-4">Today's Tasks</h1>
      <div className="">
        {loading ? (
          <p className="p-4">...</p>
        ) : items.length === 0 ? (
          <p className="p-4">You're done for the day!</p>
        ) : (
          <ul className="">
            {items.map((item) => (
              <TodoItem key={item.id} {...item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
