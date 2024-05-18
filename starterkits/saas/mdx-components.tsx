import type { MDXComponents } from "mdx/types";
import defaultComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";

export function useMDXComponents(components?: MDXComponents): MDXComponents {
    return {
        Step,
        Steps,
        Tab,
        Tabs,
        TypeTable,
        Accordion,
        Accordions,
        ...defaultComponents,
        ...components,
    };
}
