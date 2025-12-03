import { PropsWithChildren } from "react";
import TQueryProvider from "./TQueryProvider";

function layout({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

export default layout;
