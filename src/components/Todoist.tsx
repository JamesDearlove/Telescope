import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { base, hover, selected, combineStyles } from "../styles";

import {
  TodoistItem,
  relativeDateTime,
  getTasks,
  getProjects,
  TodoistProject,
  closeTask,
} from "../todoist";
import { TextLink } from "./common/TextLink";

const TodoItem = (item: TodoistItem) => {
  const queryClient = useQueryClient();
  const projectQuery = useQuery("projects", getProjects);
  const completeMutation = useMutation((id: Number) => closeTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
  const [open, setOpen] = useState(false);

  const backgroundColour = open ? selected : hover;

  const getProject = (projectId: number): TodoistProject | undefined => {
    return projectQuery.data?.find((item) => item.id === projectId);
  };

  return projectQuery.isLoading ? (
    <></>
  ) : (
    <li className={backgroundColour}>
      <div
        className="px-4 py-2 w-100 flex justify-between cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        <div className="flex flex-col">
          <span className="text-base">{item.content}</span>
          <span className="text-sm">{getProject(item.project_id)?.name}</span>
        </div>
        <div className="">
          <span className="text-base">{relativeDateTime(item.due)}</span>
        </div>
      </div>
      <div className={open ? "flex justify-between px-4 pb-3 " : "hidden"}>
        <TextLink onClick={() => completeMutation.mutate(item.id)}>
          Complete
        </TextLink>
        {/* <span>Tomorrow</span> */}
        <TextLink href={item.url}>Open in Todoist</TextLink>
      </div>
    </li>
  );
};

export const TodoItems = () => {
  const taskQuery = useQuery("tasks", getTasks);
  const projectQuery = useQuery("projects", getProjects);

  return (
    <div className={combineStyles([base, "mx-auto w-96 h-full overflow-auto"])}>
      <h1 className="text-xl p-4">Today's Tasks</h1>
      <div>
        {taskQuery.isLoading || projectQuery.isLoading ? (
          <p className="p-4">...</p>
        ) : taskQuery.data?.length === 0 ? (
          <p className="p-4">You're done for the day!</p>
        ) : (
          <ul>
            {taskQuery.data?.map((item) => (
              <TodoItem key={item.id} {...item} />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};
