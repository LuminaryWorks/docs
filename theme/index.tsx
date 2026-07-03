import type { ComponentProps } from "react";
import Theme, { HomeLayout as BasicHomeLayout } from "@rspress/theme-default";
import { HomeSections } from "./HomeSections";

type HomeLayoutProps = ComponentProps<typeof BasicHomeLayout>;

function HomeLayout(props: HomeLayoutProps) {
  return (
    <BasicHomeLayout {...props} afterFeatures={<HomeSections />} />
  );
}

export default {
  ...Theme,
  HomeLayout,
};

export * from "@rspress/theme-default";
