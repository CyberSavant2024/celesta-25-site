"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthUserContext";
import { useRouter } from "next/navigation";
import { useToggleMenu } from "@/hooks";
import { FloatingButton, DropdownMenu, MenuItem } from "@/components/ui";

export default function FloatingNav() {
  const router = useRouter();
  const { authUser, signOutUser } = useAuth();
  const { isOpen, toggle, close, ref } = useToggleMenu();

  const handleLogout = async () => {
    await signOutUser();
    router.push("/register");
    close();
  };

  return (
    <div ref={ref} className="fixed top-24 right-4 sm:right-8 z-[60] group">
      <FloatingButton
        onClick={toggle}
        ariaLabel="Toggle navigation menu"
      >
        <Image
          src="/images/celesta-icon.svg"
          alt="Celesta Menu"
          width={45}
          height={45}
          className={`transition-transform duration-500 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </FloatingButton>

      <DropdownMenu isOpen={isOpen}>
        <nav className="flex flex-col space-y-1">
          {authUser && (
            <MenuItem href="/profile" onClick={close}>
              Profile
            </MenuItem>
          )}
          <MenuItem href="/contact" onClick={close}>
            Contact Us
          </MenuItem>
          {authUser && (
            <MenuItem onClick={handleLogout}>
              Log Out
            </MenuItem>
          )}
        </nav>
      </DropdownMenu>
    </div>
  );
}

