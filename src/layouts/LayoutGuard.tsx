import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

const privateRoute = ["/profile", "/contact", "/manage-teams"];

export const LayoutGuard = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    const currentUrl = router.asPath;
    const isPrivate = privateRoute.some((url) => currentUrl.includes(url));
    if (isPrivate && !localStorage.getItem("accessToken")) {
      router.push(`/login?url=${currentUrl}`, "/login");
    }
  }, [router]);
  return <>{children}</>;
};
