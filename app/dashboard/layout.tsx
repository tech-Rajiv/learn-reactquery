import { PropsWithChildren } from "react";
import TQueryProvider from "./TQueryProvider";

function layout({ children }: PropsWithChildren) {
  return <TQueryProvider>{children}</TQueryProvider>;
}

export default layout;
