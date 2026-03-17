"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, X, Check, AlertCircle, Info, ShoppingCart, Package, Star } from "lucide-react";
import { cn, formatDate } from "@/lib/utils";

export interface Notification {
  id: string;
  type: "success" | "error" | "warning" | "info" | "order" | "review";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  icon?: React.ReactNode;
}

interface NotificationSystemProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onDeleteNotification: (id: string) => void;
  className?: string;
}

const notificationIcons = {
  success: <Check className="w-5 h-5" />,
  error: <AlertCircle className="w-5 h-5" />,
  warning: <AlertCircle className="w-5 h-5" />,
  info: <Info className="w-5 h-5" />,
  order: <ShoppingCart className="w-5 h-5" />,
  review: <Star className="w-5 h-5" />,
};

const notificationColors = {
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  info: "bg-blue-50 border-blue-200 text-blue-800",
  order: "bg-purple-50 border-purple-200 text-purple-800",
  review: "bg-orange-50 border-orange-200 text-orange-800",
};

const iconColors = {
  success: "text-green-600",
  error: "text-red-600",
  warning: "text-yellow-600",
  info: "text-blue-600",
  order: "text-purple-600",
  review: "text-orange-600",
};

export default function NotificationSystem({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  className
}: NotificationSystemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = notifications.filter(n => 
    filter === "all" || (filter === "unread" && !n.read)
  );

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
    
    if (notification.actionUrl) {
      window.location.href = notification.actionUrl;
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.span>
        )}
      </button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute left-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">الإشعارات</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter("all")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full transition-colors",
                      filter === "all"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    الكل ({notifications.length})
                  </button>
                  <button
                    onClick={() => setFilter("unread")}
                    className={cn(
                      "px-3 py-1 text-sm rounded-full transition-colors",
                      filter === "unread"
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    غير مقروءة ({unreadCount})
                  </button>
                </div>

                {/* Actions */}
                {unreadCount > 0 && (
                  <button
                    onClick={onMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 mt-2"
                  >
                    تعيين الكل كمقروء
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>لا توجد إشعارات</p>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={cn(
                          "p-4 hover:bg-gray-50 cursor-pointer transition-colors relative",
                          !notification.read && "bg-blue-50/50"
                        )}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        {/* Unread Indicator */}
                        {!notification.read && (
                          <div className="absolute right-2 top-4 w-2 h-2 bg-blue-500 rounded-full" />
                        )}

                        <div className="flex gap-3 pr-4">
                          {/* Icon */}
                          <div className={cn(
                            "flex-shrink-0 p-2 rounded-lg",
                            notificationColors[notification.type]
                          )}>
                            <div className={iconColors[notification.type]}>
                              {notification.icon || notificationIcons[notification.type]}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <h4 className={cn(
                              "font-medium text-sm mb-1",
                              !notification.read ? "text-gray-900" : "text-gray-700"
                            )}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatDate(notification.timestamp)}
                              </span>
                              {notification.actionText && (
                                <span className="text-xs text-blue-600 font-medium">
                                  {notification.actionText}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onDeleteNotification(notification.id);
                            }}
                            className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {filteredNotifications.length > 0 && (
                <div className="p-3 border-t border-gray-100 bg-gray-50">
                  <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
                    عرض جميع الإشعارات
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

// Toast Notification Component
interface ToastNotificationProps {
  notification: Notification;
  onClose: () => void;
}

export function ToastNotification({ notification, onClose }: ToastNotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={cn(
        "max-w-sm w-full bg-white shadow-lg rounded-lg border-r-4 overflow-hidden",
        {
          "border-r-green-500": notification.type === "success",
          "border-r-red-500": notification.type === "error",
          "border-r-yellow-500": notification.type === "warning",
          "border-r-blue-500": notification.type === "info",
          "border-r-purple-500": notification.type === "order",
          "border-r-orange-500": notification.type === "review",
        }
      )}
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className={cn("flex-shrink-0", iconColors[notification.type])}>
            {notification.icon || notificationIcons[notification.type]}
          </div>
          <div className="mr-3 w-0 flex-1 pt-0.5">
            <p className="text-sm font-medium text-gray-900">
              {notification.title}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {notification.message}
            </p>
            {notification.actionText && notification.actionUrl && (
              <div className="mt-3">
                <a
                  href={notification.actionUrl}
                  className="text-sm bg-white border border-gray-300 rounded-md px-3 py-2 hover:bg-gray-50 transition-colors"
                >
                  {notification.actionText}
                </a>
              </div>
            )}
          </div>
          <div className="mr-4 flex-shrink-0 flex">
            <button
              onClick={onClose}
              className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Toast Container
interface ToastContainerProps {
  toasts: (Notification & { id: string })[];
  onRemoveToast: (id: string) => void;
}

export function ToastContainer({ toasts, onRemoveToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 left-4 z-50 space-y-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastNotification
            key={toast.id}
            notification={toast}
            onClose={() => onRemoveToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
