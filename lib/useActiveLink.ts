import { useRouter } from "next/router";

export function useActiveLink() {
  const router = useRouter();

  const isActive = (pathname: string) => {
    if (pathname === "/") {
      return router.pathname === "/";
    }
    return router.pathname.startsWith(pathname);
  };

  return { isActive };
}
