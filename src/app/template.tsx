import { ViewTransition } from "react";
import { PageMotion } from "@/components/motion/MotionProvider";

/** Re-mounts on every navigation, so the page sheet animates in and the old one falls away. */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div>
        {children}
        <PageMotion />
      </div>
    </ViewTransition>
  );
}
