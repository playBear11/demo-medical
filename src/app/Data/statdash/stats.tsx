
  // data/dashboard/stats.ts
  export const stats = [
    {
      title: "New Patients",
      value: 532,
      change: "+12%",
      description: "Compared to last month",
      icon: "FaUsers",
      iconColor: "text-red-600",
    },
    {
      title: "Appointments Today",
      value: 74,
      change: "-5%",
      description: "Compared to yesterday",
      icon: "FaCalendar",
      iconColor: "text-violet-600",
    },
    {
      title: "Total Revenue",
      value: "$23,540",
      change: "+8%",
      description: "This month's revenue",
      icon: "FaMoneyBill",
      iconColor: "text-pink-600",
    },
    {
      title: "pending schedule",
      value: 15,
      change: "-3%",
      description: "Currently pending appointments",
      icon: "FaCheckCircle",
      iconColor: "text-sky-600",
    },
    {
      title: "Total Surgeries",
      value: 120,
      total: 150,
      description: "Total number of surgeries performed",
      icon: "FaHospital",
      iconColor: "text-blue-600",
    },
    {
      title: "Beds Occupancy Rate",
      value: {
        Available: 50,
        Total: 120,
      },
      description: "Current bed availability in the hospital",
      icon: "FaBed",
      iconColor: "text-orange-600",
    },
    {
      title: "Medical Staff on Duty",
      value: {
        Doctors: 150,
        Nurses: 200,
      },
      description: "Available medical staff on shift",
      icon: "FaHeartbeat",
      iconColor: "text-green-600",
    },
    {
      title: "Patient Feedback",
      value: 4.5,
      description: "Based on recent patient surveys",
      icon: "FaStar",
      iconColor: "text-yellow-600",
    },
  ]