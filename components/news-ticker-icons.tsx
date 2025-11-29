import React from 'react';
import { AlertCircle, Clock, Zap, Info, ExternalLink, Lock, User, Settings, FileCode } from "lucide-react";

// Define prop types for the component
type IconType = "alert" | "clock" | "zap" | "lock" | "user" | "settings" | "code" | null;

interface NewsTickerIconsProps {
  type: IconType;
}

// Export as a proper React component
export function NewsTickerIcon({ type }: NewsTickerIconsProps) {
  switch (type) {
    case "alert": return <AlertCircle className="h-3 w-3 mr-1.5" />;
    case "clock": return <Clock className="h-3 w-3 mr-1.5" />;
    case "zap": return <Zap className="h-3 w-3 mr-1.5" />;
    case "lock": return <Lock className="h-3 w-3 mr-1.5" />;
    case "user": return <User className="h-3 w-3 mr-1.5" />;
    case "settings": return <Settings className="h-3 w-3 mr-1.5" />;
    case "code": return <FileCode className="h-3 w-3 mr-1.5" />;
    default: return null;
  }
}

const NewsTickerIcons = {
  AlertCircle,
  Clock,
  Zap,
  Info,
  ExternalLink,
  Lock,
  User,
  Settings,
  FileCode
};

export default NewsTickerIcons; 