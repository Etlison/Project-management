"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import { useGetProjectsQuery } from "@/state/api";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  Lock,
  LucideIcon,
  Menu,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-16" : "w-72"}
  `;

  return (
    <div className={sidebarClassNames}>
      <div className="flex h-[100%] w-full flex-col justify-start">
        {/* TOP LOGO */}
        <div className="z-50 flex min-h-[56px] w-full items-center justify-between bg-white px-4 pt-3 dark:bg-black">
          {!isSidebarCollapsed && (
            <div className="text-xl font-bold text-gray-800 dark:text-white">
              LN DASHBOARD
            </div>
          )}

          {isSidebarCollapsed ? (
            <>
              <button
                onClick={() =>
                  dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
                }
              >
                <Menu className="h-8 w-8 dark:text-white" />
              </button>
            </>
          ) : (
            <>
              <button
                className="p-2"
                onClick={() => {
                  dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                }}
              >
                <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
              </button>
            </>
          )}
        </div>
        {/* TEAM */}
        <div className="flex items-center gap-4 border-y-[1.5px] border-gray-200 px-4 py-4 dark:border-gray-700">
          <Image src="/logo.png" alt="Logo" width={40} height={40} />
          {!isSidebarCollapsed && (
            <div>
              <h3 className="text-md font-bold tracking-wide dark:text-gray-200">
                LOVETTE TEAM
              </h3>
              <div className="mt-1 flex items-start gap-2">
                <Lock className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                <p className="text-xs text-gray-500">Private</p>
              </div>
            </div>
          )}
        </div>
        {/* NAVBAR LINKS */}
        <nav className="z-10 w-full">
          <SidebarLink
            icon={Home}
            label="Home"
            href="/"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            icon={Briefcase}
            label="Timeline"
            href="/timeline"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            icon={Search}
            label="Search"
            href="/search"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            icon={Settings}
            label="Settings"
            href="/settings"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            icon={User}
            label="Users"
            href="/users"
            isCollapsed={isSidebarCollapsed}
          />
          <SidebarLink
            icon={Users}
            label="Teams"
            href="/teams"
            isCollapsed={isSidebarCollapsed}
          />
        </nav>
        <hr className="my-2" />

        {/* PROJECTS LINKS */}
        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className={`flex w-full items-center justify-between px-4 py-3 text-gray-500 ${isSidebarCollapsed ? "justify-center" : ""}`}
        >
          {!isSidebarCollapsed && <span>Projects</span>}
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* PROJECTS LIST */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              icon={Briefcase}
              label={project.name}
              href={`/projects/${project.id}`}
              isCollapsed={isSidebarCollapsed}
            />
          ))}

        <hr className="my-2" />

        {/* PRIORITIES LINKS */}
        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className={`flex w-full items-center justify-between px-4 py-3 text-gray-500 ${isSidebarCollapsed ? "justify-center" : ""}`}
        >
          {!isSidebarCollapsed && <span>Priority</span>}
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {showPriority && (
          <>
            <SidebarLink
              icon={AlertCircle}
              label="Urgent"
              href="/priority/urgent"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={ShieldAlert}
              label="High"
              href="/priority/high"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={AlertTriangle}
              label="Medium"
              href="/priority/medium"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={AlertOctagon}
              label="Low"
              href="/priority/low"
              isCollapsed={isSidebarCollapsed}
            />
            <SidebarLink
              icon={Layers3}
              label="Backlog"
              href="/priority/backlog"
              isCollapsed={isSidebarCollapsed}
            />
          </>
        )}
      </div>
    </div>
  );
};

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href} className="w-full">
      <div
        className={`relative flex cursor-pointer items-center gap-3 rounded-xl transition-colors hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 ${
          isActive ? "bg-gray-100 text-white dark:bg-gray-600" : ""
        } justify-start px-4 py-3 ${isCollapsed ? "justify-center" : ""}`}
      >
        {isActive && !isCollapsed && (
          <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )}

        <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100" />
        {!isCollapsed && (
          <span className={`font-medium text-gray-800 dark:text-gray-100`}>
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default Sidebar;
