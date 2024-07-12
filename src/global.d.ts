declare module "react-blockies" {
  import { ComponentType } from "react";

  type BlockiesProps = {
    seed?: string;
    size?: number;
    scale?: number;
    color?: string;
    bgColor?: string;
    spotColor?: string;
    className?: string;
  };

  const Blockies: ComponentType<BlockiesProps>;

  export default Blockies;
}

declare module "react-router-bootstrap" {
  import { ComponentType, HTMLProps, AnchorHTMLAttributes } from "react";
  import { LinkProps } from "react-router-dom";

  export interface LinkContainerProps
    extends LinkProps,
      HTMLProps<HTMLAnchorElement> {
    to: string;
    replace?: boolean;
    innerRef?: (node: HTMLAnchorElement) => void;
    exact?: boolean;
    isActive?: (match: any, location: any) => boolean;
  }

  export const LinkContainer: ComponentType<LinkContainerProps>;
}


