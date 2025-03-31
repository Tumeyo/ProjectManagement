import { AdminStore } from "@/context/AdminStore";

export default function Layout({ children }) {
  return (
    <AdminStore>
        {children}
    </AdminStore>
  );
} 
import React from 'react';
