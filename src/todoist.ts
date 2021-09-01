import axios from "axios";
import { formatRelative, parse } from "date-fns";

export interface TodoistItem {
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

export interface TodoistDue {
  string: string;
  date: string;
  recurring: boolean;
  datetime?: string;
  timezone?: string;
}

export interface TodoistProject {
  id: number;
  name: string;
  color: number;
  parent_id: number;
  order: number;
  comment_count: number;
  shared: boolean;
  favourite: boolean;
  inbox_project: boolean;
  team_inbox: boolean;
  sync_id: number;
  url: string;
}

/**
 * Send a GET request to the Todoist REST API.
 * @param endpoint Endpoint to send request to.
 * @param params (Optional) Any params for the request.
 * @returns The data if the request was successful.
 */
const getData = async (endpoint: string, params?: any) => {
  const apiKey = localStorage.getItem("TodoistKey");
  if (!apiKey) {
    throw new Error("No Todoist API key.");
  }

  const response = await axios.get(endpoint, {
    baseURL: "https://api.todoist.com/rest/v1/",
    params: params,
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (response.status === 200) {
    return await response.data;
  } else if (response.status === 204) {
    // No data to return.
    return {};
  } else {
    throw new Error(response.statusText);
  }
};

/**
 * Get all the tasks based on the user's current filter.
 * @returns Array of TodoistItems.
 */
export const getTasks = async (): Promise<TodoistItem[] | undefined> => {
  const filter =
    localStorage.getItem("TodoistFilter") ||
    "(today | overdue) & !assigned to: others";

  return getData("tasks", { filter: filter });
};

/**
 * Get all the user's projects.
 * @returns Array of TodoistProjects.
 */
export const getProjects = async (): Promise<TodoistProject[] | undefined> => {
  return getData("projects");
};

/**
 * Converts the TodoistDue to a friendly date.
 * @param due The TodoistDue object.
 * @returns A friendly date if set, otherwise an empty string.
 */
export const relativeDateTime = (due: TodoistDue) => {
  const dueDateTime = due.datetime
    ? parse(due.datetime, "yyyy-MM-dd'T'HH:mm:ssXXX", new Date())
    : undefined;

  if (dueDateTime) {
    return formatRelative(dueDateTime, new Date());
  } else {
    const dueDate = due.date
      ? parse(due.date, "yyyy-MM-dd", new Date())
      : undefined;

    if (dueDate) {
      return formatRelative(dueDate, new Date()).split(" at")[0];
    } else {
      return "";
    }
  }
};