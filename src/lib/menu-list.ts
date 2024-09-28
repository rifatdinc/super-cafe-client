import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  LucideIcon,
  User2,
	ShoppingBag,
  User2Icon
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon
  submenus: Submenu[];
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
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
		{
			groupLabel: "",
			menus:[
				{
					href: "/shop",
					label: "Shop",
					icon: ShoppingBag,
					active: pathname === "/shop",
					submenus: [],
				},
			]
		},
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "",
          label: "Posts",
          active: pathname.includes("/posts"),
          icon: SquarePen,
          submenus: [
            {
              href: "/posts",
              label: "All Posts",
              active: pathname === "/posts"
            },
            {
              href: "/posts/new",
              label: "New Post",
              active: pathname === "/posts/new"
            }
          ]
        },
        {
          href: "/customer",
          label: "Kullanıcılar",
          active: pathname.includes("/customer"),
          icon: User2Icon,
          submenus: []
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: []
        },
        {
          href: "/settings",
          label: "Settings",
          active: pathname.includes("/settings"),
          icon: Settings,
          submenus: []
        }
      ]
    }
  ];
}

export function getMenuListSettings(pathname: string) {
	return [
		{
			groupLabel: "General Settings",
			menus: [
				{
					href: "/general/display",
					label: "Display Settings",
					active: pathname.includes("/general/display"),
					icon: LayoutGrid,
					submenus: []
				},
				{
					href: "/general/network",
					label: "Network Settings",
					active: pathname.includes("/general/network"),
					icon: LayoutGrid,
					submenus: []
				},
				{
					href: "/general/shutdown",
					label: "Shutdown Settings",
					active: pathname.includes("/general/shutdown"),
					icon: LayoutGrid,
					submenus: []
				},
				{
					href: "/general/startup",
					label: "Startup Announcement",
					active: pathname.includes("/general/startup"),
					icon: LayoutGrid,
					submenus: []
				},
				{
					href: "/general/backup",
					label: "Backup IP & LOG",
					active: pathname.includes("/general/backup"),
					icon: LayoutGrid,
					submenus: []
				}
			]
		},
		{
			groupLabel: "Tariffs and Pricing",
			menus: [
				{
					href: "/tariffs/hourly",
					label: "Hourly Rates",
					active: pathname.includes("/tariffs/hourly"),
					icon: ShoppingBag,
					submenus: []
				},
				{
					href: "/tariffs/packages",
					label: "Package Deals",
					active: pathname.includes("/tariffs/packages"),
					icon: ShoppingBag,
					submenus: []
				},
				{
					href: "/tariffs/promotions",
					label: "Special Promotions",
					active: pathname.includes("/tariffs/promotions"),
					icon: ShoppingBag,
					submenus: []
				}
			]
		},
		{
			groupLabel: "User Management",
			menus: [
				{
					href: "/users/accounts",
					label: "User Accounts",
					active: pathname.includes("/users/accounts"),
					icon: User2Icon,
					submenus: []
				},
				{
					href: "/users/access",
					label: "Access Control",
					active: pathname.includes("/users/access"),
					icon: User2Icon,
					submenus: []
				},
				{
					href: "/users/history",
					label: "Usage History",
					active: pathname.includes("/users/history"),
					icon: User2Icon,
					submenus: []
				}
			]
		},
		{
			groupLabel: "System Maintenance",
			menus: [
				{
					href: "/maintenance/updates",
					label: "Software Updates",
					active: pathname.includes("/maintenance/updates"),
					icon: Settings,
					submenus: []
				},
				{
					href: "/maintenance/diagnostics",
					label: "Hardware Diagnostics",
					active: pathname.includes("/maintenance/diagnostics"),
					icon: Settings,
					submenus: []
				},
				{
					href: "/maintenance/logs",
					label: "Error Logs",
					active: pathname.includes("/maintenance/logs"),
					icon: Settings,
					submenus: []
				}
			]
		}
	];
}
