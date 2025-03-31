"use client";

import React, { useEffect, useState } from 'react';
import Header from '@/components/admincomp/Header';
import Footer from '@/components/admincomp/Footer';
import '@/styles/dashboard.module.css'; // Ensure the correct path


const DashboardPage = () => {
  const [hereglegchCount, setHereglegchCount] = useState(0);
  const [tusulCount, setTusulCount] = useState(0);
  const [setgegdelCount, setSetgegdelCount] = useState(0);
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/dash');
        if (res.ok) {
          const data = await res.json();
          setHereglegchCount(data.hereglegchCount);
          setTusulCount(data.tusulCount);
          setSetgegdelCount(data.setgegdelCount);

          // Example: Fetch recent activities
          const activities = [
            "New user registered",
            "Project A updated",
            "Report generated for Project B",
          ];
          setRecentActivities(activities);
        } else {
          console.error("Failed to fetch data:", res.statusText);
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="styles.dashboard">
      <Header />
      <h1>Welcome to the Admin Dashboard</h1>
      <div className="styles.stats">
      <div className={styles['stat-card']}>Hereglegch: {hereglegchCount}</div>
      <div className={styles['stat-card']}>Hereglegch: {hereglegchCount}</div>
      <div className={styles['stat-card']}>Hereglegch: {hereglegchCount}</div>
      </div>
      <div className="recent-activities">
        <h2>Recent Activities</h2>
        <ul>
          {recentActivities.map((activity, index) => (
            <li key={index}>{activity}</li>
          ))}
        </ul>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardPage;
