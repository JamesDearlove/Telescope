import { Button, Link, Stack, Text } from "@chakra-ui/react";

export const AboutPage = () => {
  const onClickNavigate = (site: string) => {
    window.location.href = site;
  };

  return (
    <>
      <Text fontSize="3xl">Telescope</Text>
      <Text fontSize="md">Written by James Dearlove</Text>
      <Text fontSize="md">
        A new tab page focused on all the information you need right now.
      </Text>

      <Text fontSize="md" marginTop={4}>
        Telescope is licensed under the{" "}
        <Link href="https://raw.githubusercontent.com/JamesDearlove/Telescope/main/LICENSE">
          MIT License
        </Link>
        .
      </Text>
      <Stack marginTop={4} direction="row" spacing={2}>
        <Button
          size="sm"
          onClick={() =>
            onClickNavigate("https://go.jimmyd.dev/telescope-privacy")
          }
        >
          Privacy Policy
        </Button>
        <Button
          size="sm"
          onClick={() =>
            onClickNavigate("https://github.com/JamesDearlove/Telescope")
          }
        >
          GitHub
        </Button>
      </Stack>
      <Stack marginTop={4} direction="row" spacing={2}>
        <Button
          size="sm"
          onClick={() => onClickNavigate("https://twitter.com/ItsJimmyD")}
        >
          Twitter
        </Button>
        <Button size="sm" onClick={() => onClickNavigate("https://jimmyd.dev")}>
          My Other Projects
        </Button>
      </Stack>
    </>
  );
};
