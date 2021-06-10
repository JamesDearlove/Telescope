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
  const [textColour, setTextColour] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("TodoistKey");
    setTextColour(localStorage.getItem("TextColour") || "");

    if (key) {
      setApiKey(key);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const syncTodoist = async () => {
      const result = await axiosInstance.get("tasks", {
        params: { filter: "today | overdue" },
        headers: { Authorization: `Bearer ${apiKey}` },
      });

      setItems(result.data);
    };

    if (apiKey !== "") {
      syncTodoist();
    }
  }, [apiKey]);

  return (
    <div className={`mt-32 ${textColour}`}>
      <h1 className="text-4xl mb-4">Today's Tasks</h1>
      {loading ? (
        <></>
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
