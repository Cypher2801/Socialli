import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarBody, SidebarLink } from '../components/ui/sidebar';
import { 
  Home,
  ChartArea,
  Sun,
  Moon
} from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const MainLayout = () => {
  const [open, setOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('isDark');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <Home className="h-5 w-5 flex-shrink-0" />
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <ChartArea className="h-5 w-5 flex-shrink-0" />
    },
  ];

  const handleDarkModeToggle = () => {
    setIsDark(!isDark);
    localStorage.setItem('isDark', JSON.stringify(!isDark));
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {/* Logo Section */}
            <div className="flex items-center justify-center h-16">
              <div className="h-8 w-8 bg-blue-600 rounded-lg" />
            </div>
            
            {/* Navigation Links */}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <div className="mt-auto pt-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleDarkModeToggle}
                className="w-full flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                {isDark ? (
                  <>
                    <Sun className="h-4 w-4" />
                    {open && <span>Light Mode</span>}
                  </>
                ) : (
                  <>
                    <Moon className="h-4 w-4" />
                    {open && <span>Dark Mode</span>}
                  </>
                )}
              </Button>
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 overflow-auto">
        <div className="mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;