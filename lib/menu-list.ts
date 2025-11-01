import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon
} from "lucide-react";

interface BaseMenu {
  href: string;
  label: string;
  active?: boolean;

}

type Submenu = BaseMenu;

interface Menu extends BaseMenu {
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/discover",
          label: "Discover",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },
        {
          href: "/categories",
          label: "Categories",
          icon: Bookmark
        },
        {
          href: "/tags",
          label: "Tags",
          icon: Tag
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}


export function getAllMenus(): BaseMenu[] {
  const groups = getMenuList("")
  const allMenus = groups.flatMap((value) => value.menus)
  const allSubMenus = allMenus.flatMap((value) => value?.submenus || [])
  return [...allMenus, ...allSubMenus]
}

export function getMenuByPathName(pathname: string): BaseMenu | undefined {
  const groups = getMenuList("")
  for (const group of groups) {
    for (const menu of group.menus) {
      if (menu.href === pathname) {
        return menu
      }
      if (menu?.submenus) {
        for (const subMenu of menu.submenus) {
          if (subMenu.href === pathname) {
            return subMenu
          }
        }
      }
    }
  }
}