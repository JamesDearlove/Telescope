import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Text,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "react-query";

import {
  TodoistItem,
  relativeDateTime,
  getTasks,
  getProjects,
  TodoistProject,
  closeTask,
} from "../services/todoist";
import { todoistApiKey } from "../settingNames";

const TodoItem = (item: TodoistItem) => {
  const queryClient = useQueryClient();
  const projectQuery = useQuery("projects", getProjects);
  const completeMutation = useMutation((id: Number) => closeTask(id), {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
    },
  });
  const [open, setOpen] = useState(false);

  const getProject = (projectId: number): TodoistProject | undefined => {
    return projectQuery.data?.find((item) => item.id === projectId);
  };

  const openTodoist = () => {
    window.location.href = item.url;
  };

  const selectedBackground = useColorModeValue("gray.200", "gray.600");

  return projectQuery.isLoading ? (
    <></>
  ) : (
    <Box
      w="100%"
      paddingX={4}
      paddingY={2}
      background={open ? selectedBackground : undefined}
      onClick={() => setOpen(!open)}
      _hover={{ background: selectedBackground }}
    >
      <Flex>
        <Box>
          <Text fontSize="md" paddingRight={1}>
            {item.content}
          </Text>
          <Text fontSize="md">{getProject(item.project_id)?.name}</Text>
        </Box>
        <Spacer />
        {item.due && <Text fontSize="md">{relativeDateTime(item.due)}</Text>}
      </Flex>
      {open && (
        <Flex marginTop={2}>
          <Button size="sm" onClick={() => completeMutation.mutate(item.id)}>
            Complete
          </Button>
          {/* <span>Tomorrow</span> */}
          <Spacer />
          <Button size="sm" onClick={openTodoist}>
            Open in Todoist
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export const TodoItems = () => {
  const taskQuery = useQuery("tasks", getTasks);
  const projectQuery = useQuery("projects", getProjects);

  const background = useColorModeValue("gray.100", "gray.700");
  const border = useColorModeValue("gray.300", "gray.800");

  const [todoistEnabled, setTodoistEnabled] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem(todoistApiKey);
    setTodoistEnabled(key !== null && key !== "");
  }, []);

  return (
    <Center>
      {todoistEnabled && (
        <Box
          bg={background}
          w={96}
          h={96}
          borderColor={border}
          borderWidth="1px"
          borderRadius="md"
          overflow="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: 4,
            },
            "&::-webkit-scrollbar-thumb": {
              borderColor: "transparent",
              borderRadius: 8,
              borderWidth: 4,
              borderStyle: "solid",
              backgroundClip: "content-box",
              backgroundColor: border,
            },
          }}
        >
          <Flex>
            <Text paddingTop={4} paddingLeft={4} marginBottom={2} fontSize="xl">
              Today's Tasks
            </Text>
            <Spacer />
            {(taskQuery.isFetching || projectQuery.isFetching) && (
              <Center paddingRight={4}>
                <Spinner />
              </Center>
            )}
          </Flex>
          <Box>
            {taskQuery.isLoading || projectQuery.isLoading ? (
              <></>
            ) : taskQuery.data?.length === 0 ? (
              <Text fontSize="md" padding={4}>
                You're done for the day!
              </Text>
            ) : (
              <Stack direction="column" spacing={0}>
                {taskQuery.data?.map((item) => (
                  <TodoItem key={item.id} {...item} />
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      )}
    </Center>
  );
};
