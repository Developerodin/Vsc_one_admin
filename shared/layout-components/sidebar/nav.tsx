import React from "react";

const DashboardIcon = <i className="bx bx-home side-menu__icon"></i>;

const PagesIcon = <i className="bx bx-file-blank side-menu__icon"></i>;

const TaskIcon = <i className="bx bx-task side-menu__icon"></i>;

const AuthenticationIcon = (
  <i className="bx bx-fingerprint side-menu__icon"></i>
);

const ErrorIcon = <i className="bx bx-error side-menu__icon"></i>;

const UiElementsIcon = <i className="bx bx-box side-menu__icon"></i>;

const Utilities = <i className="bx bx-medal side-menu__icon"></i>;

const FormsIcon = <i className="bx bx-file  side-menu__icon"></i>;

const AdvancedUiIcon = <i className="bx bx-party side-menu__icon"></i>;

const WidgetsIcon = <i className="bx bx-gift side-menu__icon"></i>;

const AppsIcon = <i className="bx bx-grid-alt side-menu__icon"></i>;

const NestedmenuIcon = <i className="bx bx-layer side-menu__icon"></i>;

const TablesIcon = <i className="bx bx-table side-menu__icon"></i>;

const ChartsIcon = <i className="bx bx-bar-chart-square side-menu__icon"></i>;

const MapsIcon = <i className="bx bx-map side-menu__icon"></i>;

const Icons = <i className="bx bx-store-alt side-menu__icon"></i>;

const CategoryIcon = <i className="bx bx-category side-menu__icon"></i>;

const ProductIcon = <i className="bx bx-package side-menu__icon"></i>;

const TransactionIcon = <i className="bx bx-transfer-alt side-menu__icon"></i>;

const LeadIcon = <i className="bx bx-user-plus side-menu__icon"></i>;

const UserIcon = <i className="bx bx-user side-menu__icon"></i>;

const ShieldIcon = <i className="bx bx-shield side-menu__icon"></i>;

const badge = (
  <span className="badge !bg-warning/10 !text-warning !py-[0.25rem] !px-[0.45rem] !text-[0.75em] ms-1">
    12
  </span>
);
const badge1 = (
  <span className="text-secondary text-[0.75em] rounded-sm !py-[0.25rem] !px-[0.45rem] badge !bg-secondary/10 ms-1">
    New
  </span>
);
const badge2 = (
  <span className="text-danger text-[0.75em] rounded-sm badge !py-[0.25rem] !px-[0.45rem] !bg-danger/10 ms-1">
    Hot
  </span>
);
const badge4 = (
  <span className="text-success text-[0.75em] badge !py-[0.25rem] !px-[0.45rem] rounded-sm bg-success/10 ms-1">
    3
  </span>
);

export const MenuItems: any = [
  {
    menutitle: "MAIN",
  },

  {
    icon: DashboardIcon,
    title: "Dashboards",
    type: "link",
    path: "/dashboards/analytics",
    active: false,
    selected: false,
    dirchange: false
  },

  {
    menutitle: "GENERAL",
  },


  {
    icon: CategoryIcon,
    title: "Category",
    type: "link",
    path: "/category/category",
    active: false,
    selected: false,
    dirchange: false
  },

  {
    icon: ProductIcon,
    title: "Products",
    type: "link",
    path: "/products/products",
    active: false,
    selected: false,
    dirchange: false
  },


  {
    icon: ShieldIcon,
    title: "Roles",
    type: "link",
    path: "/roles/roles",
    active: false,
    selected: false,
    dirchange: false
  },


  {
    menutitle: "APP DATA",
  },

  {
    icon: UserIcon,
    title: "Users",
    type: "link",
    path: "/users/users",
    active: false,
    selected: false,
    dirchange: false
  },

  {
    icon: TransactionIcon,
    title: "Transactions",
    type: "link",
    path: "/transactions/transactions",
    active: false,
    selected: false,
    dirchange: false
  },

  {
    icon: LeadIcon,
    title: "Leads",
    type: "link",
    path: "/leads/leads",
    active: false,
    selected: false,
    dirchange: false
  },


 
];
