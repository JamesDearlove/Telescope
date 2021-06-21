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

export const TodoItems = () => {
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<TodoistItem[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [filter, setFilter] = useState("");
  const [textColour, setTextColour] = useState("");

  useEffect(() => {
    setApiKey(localStorage.getItem("TodoistKey") || "");
    setTextColour(localStorage.getItem("TextColour") || "");
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
    <div
      className={`color-black mx-auto w-72`}
      style={{ color: textColour !== "" ? `${textColour}` : "" }}
    >
      <h1 className="text-4xl mb-4">Today's Tasks</h1>
      {loading ? (
        <p>...</p>
      ) : items.length === 0 ? (
        <p>You're done for the day!</p>
      ) : (
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a href={item.url}>
                {item.content} - {item.due.string}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
