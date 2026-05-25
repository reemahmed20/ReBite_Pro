const mockAdmin = {
  totalDonations: 250,
  activeUsers: 1245,
  pendingRequests: 32,
  foodWasteSaved: 3620,

  donationsOverTime: [
    { date: "May 12", donations: 18 },
    { date: "May 13", donations: 25 },
    { date: "May 14", donations: 20 },
    { date: "May 15", donations: 32 },
    { date: "May 16", donations: 28 },
    { date: "May 17", donations: 35 },
    { date: "May 18", donations: 40 },
  ],

  foodWasteData: [
    { name: "Donated", value: 2120, color: "#2d5016" },
    { name: "Redistributed", value: 1100, color: "#52b788" },
    { name: "Wasted", value: 400, color: "#e74c3c" },
  ],

  recentUsers: [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Donor", status: "active", joined: "May 18, 2025" },
    { id: 2, name: "Mary Smith", email: "mary@example.com", role: "Charity", status: "active", joined: "May 17, 2025" },
    { id: 3, name: "Ahmed Khan", email: "ahmed@example.com", role: "Donor", status: "inactive", joined: "May 16, 2025" },
    { id: 4, name: "Sara Ali", email: "sara@example.com", role: "Charity", status: "active", joined: "May 15, 2025" },
    { id: 5, name: "Usman Raza", email: "usman@example.com", role: "Donor", status: "active", joined: "May 14, 2025" },
  ],

  pendingRequestsList: [
    { id: 1, name: "Green Shelter", type: "Charity", email: "greenshelter@example.com", submitted: "May 16, 2025" },
    { id: 2, name: "Helping Hands", type: "NGO", email: "helpinghands@example.com", submitted: "May 15, 2025" },
    { id: 3, name: "Care Foundation", type: "Charity", email: "carefoundation@example.com", submitted: "May 14, 2025" },
  ],
};

export default mockAdmin;