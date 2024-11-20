"use client"

import React, { useState, useEffect } from 'react';
import { FiEdit2, FiCopy, FiCheck } from 'react-icons/fi';
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useToast } from '@/hooks/useToast';

interface UserProfile {
  username: string;
  walletAddress: string;
  joinDate: string;
  activeSince: string;
}

const UserHeader: React.FC = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [copied, setCopied] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile data
  const fetchProfile = async () => {
    try {
      const response = await fetch('/api/user/profile');
      if (!response.ok) throw new Error('Failed to fetch profile');
      
      const data = await response.json();
      setProfile(data);
    } catch (error) {
      toast.error("Failed to load profile data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleUsernameUpdate = async () => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUsername })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setProfile(prev => prev ? { ...prev, username: data.username } : null);
      setIsEditing(false);
      toast.success("Username updated successfully");
    } catch (error) {
      toast.error("Failed to update username");
    }
  };

  const handleCopyAddress = () => {
    if (!profile?.walletAddress) return;
    navigator.clipboard.writeText(profile.walletAddress);
    setCopied(true);
    toast.success("Wallet address copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (isLoading) {
    return <div className="animate-pulse">Loading...</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-[#00BCD4]/20 flex items-center justify-center
          shadow-[0_0_20px_rgba(0,188,212,0.2)]">
          <span className="text-2xl text-[#00BCD4] font-bold">
            {profile.username[0].toUpperCase()}
          </span>
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-white">{profile.username}</h1>
            <button 
              onClick={() => setIsEditing(true)}
              className="p-1.5 hover:bg-[#00BCD4]/10 rounded-lg transition-colors"
            >
              <FiEdit2 className="w-4 h-4 text-[#00BCD4]" />
            </button>
          </div>
          <div className="flex items-center space-x-2 mt-1">
            <p className="text-gray-400">Member since {profile.joinDate}</p>
            <button
              onClick={handleCopyAddress}
              className="flex items-center space-x-1 text-sm text-[#00BCD4] hover:text-[#00BCD4]/80
                transition-colors"
            >
              {copied ? (
                <FiCheck className="w-3 h-3" />
              ) : (
                <FiCopy className="w-3 h-3" />
              )}
              <span>{copied ? 'Copied!' : 'Copy Address'}</span>
            </button>
          </div>
        </div>
      </div>

      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="bg-[#37474F] border-[#00BCD4] text-white">
          <DialogTitle>Edit Username</DialogTitle>
          <div className="space-y-4 p-4">
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              placeholder="Enter new username"
              className="w-full p-2 rounded bg-[#2C393F] border border-[#00BCD4]/30 
              focus:border-[#00BCD4] text-white"
            />
            <div className="flex space-x-3">
              <button
                onClick={handleUsernameUpdate}
                className="flex-1 p-2 bg-[#00BCD4] rounded-lg hover:bg-[#00BCD4]/80 
                transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserHeader;