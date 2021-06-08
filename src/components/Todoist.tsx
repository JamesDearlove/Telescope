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
  const [items, setItems] = useState<TodoistItem[]>([]);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const key = localStorage.getItem("TodoistKey");
    if (key) {
      setApiKey(key);
    }
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
    <div>
      <h1>Today's Tasks</h1>
      {items.map((item) => (
        <p key={item.id}>
          {item.content} - {item.due.string}
        </p>
      ))}
    </div>
  );
};
