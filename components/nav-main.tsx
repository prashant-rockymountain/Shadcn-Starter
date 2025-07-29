"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronRight } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import Icon from "@/components/tabler-icon";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useAbility } from "@/hooks/use-ability";

interface SingleNav {
  title: string;
  path: string;
  icon: string;
  subject: string;
  action: string;
  children?:
    | undefined
    | {
        title: string;
        path: string;
        icon: string;
        subject: string;
        action: string;
      }[];
}

interface Navitems {
  items: SingleNav[];
}

export function NavMain({ items }: Navitems) {
  const router = useRouter();
  const pathname = usePathname();
  const { ability } = useAbility();

  const [openCollapsible, setOpenCollapsible] = useState<string | null>(null);

  const handleClick = (item: SingleNav, parentPath: string | null) => {
    router.push(item.path);
    if (!item?.path.includes(parentPath as string)) {
      setOpenCollapsible(null);
    }
  };

  const HasNoChild = (item: SingleNav) => {
    if (ability?.can(item.action, item.subject)) {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton
            style={{ cursor: "pointer" }}
            onClick={() => handleClick(item, null)}
            tooltip={item.title}
            isActive={!!(item.path === pathname)}
          >
            <Icon icon={item.icon} />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  };

  const HaveChild = (item: SingleNav) => {
    if (ability?.can(item.action, item.subject)) {
      const isOpen = openCollapsible === item.title;
      return (
        <Collapsible
          style={{ cursor: "pointer" }}
          key={item.title}
          asChild
          open={isOpen}
          onOpenChange={(open: boolean) =>
            setOpenCollapsible(open ? item.title : null)
          }
          className="group/collapsible"
        >
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton
                tooltip={item.title}
                style={{ cursor: "pointer" }}
                isActive={pathname.includes(item.path)}
              >
                <Icon icon={item.icon} />
                <span>{item.title}</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
              <SidebarMenuSub className="ml-4 border-l border-sidebar-border pl-4 py-1">
                {item?.children?.map((subItem) => (
                  <SidebarMenuSubItem
                    key={subItem.title}
                    onClick={() => handleClick(subItem, item.path)}
                  >
                    <SidebarMenuSubButton
                      isActive={!!(subItem.path === pathname)}
                      className="w-full justify-start gap-3 px-2 py-1.5 h-auto text-sm hover:bg-sidebar-accent rounded-md transition-colors"
                    >
                      <Icon icon={subItem.icon} />
                      <span className="truncate">{subItem.title}</span>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>
      );
    }
  };

  return (
    <>
      <SidebarGroup>
        <SidebarGroupContent className="flex flex-col gap-2">
          <SidebarMenu>
            {items.map((item) => (
              <Fragment key={item?.title}>
                {!!item.children?.length ? HaveChild(item) : HasNoChild(item)}
              </Fragment>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  );
}
