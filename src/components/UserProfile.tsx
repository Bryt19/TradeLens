import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import SettingsModal from "./SettingsModal";
import ConfirmModal from "./ConfirmModal";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverDescription,
  PopoverBody,
} from "./ui/popover";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";

const UserProfile: React.FC = () => {
  const { authState, signOut } = useAuth();
  const navigate = useNavigate();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  const handleSignOutClick = () => {
    setIsConfirmModalOpen(true);
  };

  const handleSignOutConfirm = async () => {
    setIsConfirmModalOpen(false);
    await signOut();
    navigate("/");
  };

  const handleSettingsClick = () => {
    setIsSettingsOpen(true);
  };

  if (!authState.user) return null;

  const user = authState.user;
  const displayName = user.user_metadata?.full_name || user.email.split("@")[0];
  const avatarUrl = user.user_metadata?.avatar_url;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            className="h-auto w-auto rounded-full p-0 hover:bg-transparent"
          >
            <div className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Avatar className="h-8 w-8">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:block font-medium">{displayName}</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <PopoverHeader>
            <div className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={avatarUrl} alt={displayName} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <PopoverTitle>{displayName}</PopoverTitle>
                <PopoverDescription className="text-xs">
                  {user.email}
                </PopoverDescription>
              </div>
            </div>
          </PopoverHeader>
          <PopoverBody className="space-y-1 px-2 py-1">
            <Button
              variant="ghost"
              className="w-full justify-start"
              size="sm"
              onClick={handleSettingsClick}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
              size="sm"
              onClick={handleSignOutClick}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        onConfirm={handleSignOutConfirm}
        title="Sign Out"
        message="Are you sure you want to sign out? You'll need to sign in again to access your account."
        confirmText="Sign Out"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default UserProfile;
