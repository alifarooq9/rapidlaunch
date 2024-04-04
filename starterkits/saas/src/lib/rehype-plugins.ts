import { slug } from "github-slugger";
import { visit } from "unist-util-visit";

type Node = {
    type: string;
    tagName: string;
    properties: {
        id: string;
    };
    children: {
        value: string;
    }[];
};

export const AutoIdsToHeading = () => (tree: Node) => {
    visit(tree, (node) => {
        if (
            node.type === "element" &&
            (node?.tagName === "h1" ||
                node?.tagName === "h2" ||
                node?.tagName === "h3" ||
                node?.tagName === "h4" ||
                node?.tagName === "h5" ||
                node?.tagName === "h6")
        ) {
            const id = slug(node?.children[0]?.value ?? "");
            node.properties.id = id;
        }
    });
};
