"use client";
import { AbilityProvider, defaultACLObj } from "@/config/contexts/acl-context";
import { AuthProvider } from "@/config/contexts/auth-context";
import BlankLayout from "@/components/blank-layout";
import UserLayout from "@/components/user-layout";
import { routeConfig } from "@/navigation/navigation";
import { ACLObj, Actions } from "@/types/types";
import { usePathname } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import RouteProgress from "./route-progress";
import { Toaster } from "../ui/sonner";

export default function ClientLayoutSwitcher({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const allroute: any = routeConfig.flatMap((item:Record<string,string|[]>) => [
    item.path,
    ...((item.children as [])?.map((inner:Record<string,string>) => inner.path) || []),
  ]);
  const config: any = allroute.filter((route: string) =>
    route.includes(pathname)
  );

  //acl will not work
  const abjObj: ACLObj = config
    ? { action: config?.action as Actions, subject: config?.subject }
    : defaultACLObj;
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 10,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AbilityProvider aclAbilities={abjObj}>
          <RouteProgress />
          {!!config ? (
            <UserLayout>{children}</UserLayout>
          ) : (
            <BlankLayout>{children}</BlankLayout>
          )}
          <Toaster closeButton position="top-right" richColors />
        </AbilityProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
