import React, { useEffect, useState } from "react";
import {
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Switch,
  Text,
} from "@chakra-ui/react";
import { todoistApiKey, todoistFilter } from "../../settingNames";

export const TodoistPage = () => {
  const [enabled, setEnabled] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [filter, setFilter] = useState<string>("");

  const storeSettings = () => {
    localStorage.setItem(todoistApiKey, apiKey);
    localStorage.setItem(todoistFilter, filter);
  };

  const onChangeEnabled = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnabled(event.target.checked);
    if (!event.target.checked) {
      localStorage.removeItem(todoistApiKey);
      localStorage.removeItem(todoistFilter);
    } else {
      storeSettings();
    }
  };

  const onChangeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  useEffect(() => {
    const todoistKey = localStorage.getItem(todoistApiKey);

    setApiKey(todoistKey || "");
    setFilter(localStorage.getItem(todoistFilter) || "");
    setEnabled(todoistKey !== null);
  }, []);

  return (
    <>
      <Text fontSize="md">The Todoist integration fetches tasks from your Todoist.</Text>
      <FormControl id="enabled" display="flex" alignItems="center" marginY="2">
        <Switch
          id="enabled-switch"
          size="lg"
          isChecked={enabled}
          onChange={onChangeEnabled}
        />
        <FormLabel htmlFor="enabled-switch" mb="0" ml="3">
          Enable Todoist
        </FormLabel>
      </FormControl>
      <Divider marginBottom="2" />

      <FormControl id="api-key" isDisabled={!enabled}>
        <FormLabel>API token</FormLabel>
        <Input
          value={apiKey || ""}
          onChange={onChangeKey}
          onBlur={storeSettings}
        />
        <FormHelperText>
          Get your API token from your{" "}
          <Link
            color="blue.300"
            href="https://todoist.com/app/settings/integrations"
            target="_blank"
          >
            Todoist Integration Settings
          </Link>
          .
        </FormHelperText>
      </FormControl>
      <FormControl id="task-filter" mt="2" isDisabled={!enabled}>
        <FormLabel>Task filter</FormLabel>
        <Input
          value={filter || ""}
          onChange={onChangeFilter}
          placeholder="(today | overdue) &amp; !assigned to: others"
          onBlur={storeSettings}
        />
        <FormHelperText>
          The default filter fetches tasks that are assigned to you and are
          overdue or due today.
          <br />
          Check out{" "}
          <Link
            color="blue.300"
            href="https://todoist.com/app/settings/integrations"
            target="_blank"
          >
            Todoist's Introduction to Filters
          </Link>{" "}
          for availble filters.
        </FormHelperText>
      </FormControl>
    </>
  );
};
